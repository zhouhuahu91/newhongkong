import { describe, it, expect, vi } from "vitest";
import {
  receiptHeader,
  vatBlock,
  customerReceipt,
  tableReceipt,
  kitchenTicket,
  dailyReport,
  renderReceipt,
  toPrintContent,
  svgToPrintContent,
} from "./index";
import { summarize } from "@/functions/ledger";
import euro from "@/functions/euro";

// The real logo is a 70 KB base64 image; a placeholder keeps snapshots readable.
vi.mock("@/functions/createStoreLogo", () => ({ default: () => "{LOGO}" }));

const storeFees = { deliveryFee: 250, plasticBagFee: 25, transactionFee: 30 };

// A placed order shaped like the docs createorder writes.
const order = (overrides = {}) => ({
  id: "order1",
  date: "07-11-2026",
  // 07-11-2026 17:30 local time
  createdAt: new Date(2026, 10, 7, 17, 30).getTime(),
  cart: [
    {
      id: "101",
      qwt: 2,
      name: { nl: "Babi pangang" },
      description: { nl: "" },
      price: 2600,
      btw: 9,
    },
    {
      id: "900",
      qwt: 1,
      name: { nl: "Cola" },
      description: { nl: "zonder ijs" },
      price: 300,
      btw: 21,
    },
  ],
  storeFees,
  delivery: false,
  bag: false,
  tip: 0,
  paid: true,
  canceled: false,
  paymentMethod: "in_person",
  paymentMethodType: "cash",
  total: 2900,
  ...overrides,
});

// A restaurant table shaped like the docs in `tables`.
const table = (overrides = {}) => ({
  id: "table1",
  date: "07-11-2026",
  number: 12,
  paid: true,
  paymentMethodType: "card",
  tip: 0,
  food: [
    {
      id: "201",
      qwt: 2,
      name: { nl: "Tjap tjoy", zh: "炒菜" },
      description: "",
      price: 3000,
      btw: 9,
      printed: false,
    },
  ],
  beverages: [{ id: "b1", qwt: 3, name: "Thee", price: 750, btw: 9 }],
  ...overrides,
});

const dish = (overrides = {}) => ({
  id: "301",
  qwt: 1,
  name: { nl: "Foe yong hai", zh: "芙蓉蛋" },
  price: 1500,
  btw: 9,
  printed: false,
  ...overrides,
});

describe("receiptHeader", () => {
  it("has the shop name, logo and address", () => {
    const header = receiptHeader();
    expect(header).toContain("New Hong Kong");
    expect(header).toContain("{LOGO}");
    expect(header).toContain("Havenstraat 13");
  });
});

describe("vatBlock", () => {
  it("shows 9% and 21% lines and the total VAT", () => {
    // 2600 @ 9% → 215, 300 @ 21% → 52
    const block = vatBlock(order());
    expect(block).toContain(`BTW 9% | ${euro(215)}`);
    expect(block).toContain(`BTW 21% | ${euro(52)}`);
    expect(block).toContain(`Totaal is inclusief BTW: | ${euro(267)}`);
  });

  it("lists other VAT rates instead of dropping them", () => {
    const o = order({
      cart: [{ ...order().cart[0], price: 1060, btw: 6 }],
    });
    // 1060 @ 6% → 60
    expect(vatBlock(o)).toContain(`BTW 6% | ${euro(60)}`);
  });
});

describe("customerReceipt", () => {
  it("pick-up, paid in person", () => {
    expect(customerReceipt(order())).toMatchSnapshot();
  });

  it("delivery, paid online, with tip", () => {
    const o = order({
      delivery: true,
      paymentMethod: "online",
      paymentMethodType: "ideal",
      tip: 200,
      total: 3380,
    });
    const markup = customerReceipt(o);
    expect(markup).toContain("Bezorgkosten");
    expect(markup).toContain("Transactiekosten");
    expect(markup).toContain("Fooi");
    expect(markup).not.toContain("Tasje"); // the bag is included in delivery
    expect(markup).toMatchSnapshot();
  });

  it("pick-up with a bag", () => {
    const markup = customerReceipt(order({ bag: true, total: 2925 }));
    expect(markup).toContain("Tasje");
    expect(markup).not.toContain("Bezorgkosten");
    expect(markup).toMatchSnapshot();
  });

  it("shows the order date and time", () => {
    expect(customerReceipt(order())).toContain("^^07-11-2026 | ^^17:30");
  });
});

describe("tableReceipt", () => {
  it("food, beverages, total and VAT", () => {
    const markup = tableReceipt(table({ tip: 100 }));
    // 2 × tjap tjoy 3000 + thee 750 + tip 100
    expect(markup).toContain(`^^^Totaal ${euro(3850)}|`);
    expect(markup).toContain("^^tafel 12");
    expect(markup).toMatchSnapshot();
  });
});

describe("kitchenTicket", () => {
  it("multiplies side counts by the dish quantity", () => {
    const item = dish({
      qwt: 2,
      selectedSides: [{ name: { zh: "饭" } }, { name: { zh: "面" } }, { name: { zh: "饭" } }],
    });
    // 饭 twice × 2 = 4; 面 once × 2 = 2
    expect(kitchenTicket(table(), [item])).toContain("|^^^^2 芙蓉蛋, 4 饭 2 面");
  });

  it("leaves out the count of a single side", () => {
    const item = dish({ selectedSides: [{ name: { zh: "饭" } }] });
    expect(kitchenTicket(table(), [item])).toContain("|^^^^1 芙蓉蛋, 饭");
  });

  it("puts options on their own line, multiplied by the quantity", () => {
    const item = dish({
      qwt: 3,
      selectedOptions: [{ name: { zh: "辣" } }],
    });
    expect(kitchenTicket(table(), [item])).toContain("|^^^^3 (辣)");
  });

  it("skips options when the option is the dish itself", () => {
    const item = dish({
      selectedOptions: [{ name: { zh: "辣" } }],
      optionIsMain: true,
    });
    expect(kitchenTicket(table(), [item])).not.toContain("(辣)");
  });

  it("full ticket", () => {
    const items = [
      dish({ qwt: 2, selectedSides: [{ name: { zh: "饭" } }] }),
      dish({
        id: "302",
        name: { nl: "Kip kerrie", zh: "咖喱鸡" },
        selectedOptions: [{ name: { zh: "辣" } }, { name: { zh: "辣" } }],
      }),
    ];
    const markup = kitchenTicket(table(), items);
    expect(markup).toContain("^^^^TAFEL 12");
    expect(markup).toMatchSnapshot();
  });
});

describe("dailyReport", () => {
  it("revenue, VAT and payment split for one day", () => {
    const orders = [
      order(),
      order({ id: "o2", paymentMethodType: "card" }),
      order({ id: "o3", paymentMethod: "online", paymentMethodType: "ideal" }),
      order({
        id: "o4",
        paymentMethod: "online",
        paymentMethodType: "op rekening",
      }),
      order({ id: "o5", canceled: true }), // not counted
    ];
    const tables = [table(), table({ id: "t2", paymentMethodType: "cash" })];
    const markup = dailyReport(summarize(orders, tables), "07-11-2026");
    expect(markup).toContain("dagrapport | 07-11-2026");
    expect(markup).toContain("|op rekening |");
    expect(markup).toContain("|ideal |");
    expect(markup).toMatchSnapshot();
  });

  it("leaves out op rekening when there is none", () => {
    const markup = dailyReport(summarize([order()], []), "07-11-2026");
    expect(markup).not.toContain("op rekening");
  });
});

describe("rendering", () => {
  it("renderReceipt returns an SVG", () => {
    expect(renderReceipt(customerReceipt(order()))).toMatch(/^<svg/);
  });

  it("toPrintContent is the rendered SVG as base64", () => {
    const markup = tableReceipt(table());
    const decoded = Buffer.from(toPrintContent(markup), "base64").toString();
    expect(decoded).toBe(renderReceipt(markup));
  });

  it("svgToPrintContent of an already rendered receipt equals toPrintContent", () => {
    const markup = dailyReport(summarize([order()], [table()]), "07-11-2026");
    expect(svgToPrintContent(renderReceipt(markup))).toBe(toPrintContent(markup));
  });
});
