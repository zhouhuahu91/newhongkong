import { describe, it, expect } from "vitest";
import {
  isCountableOrder,
  isCountableTable,
  isOpenOrder,
  orderTotal,
  tableTotal,
  vatByRate,
  vatFromGross,
  vatRows,
  paymentBucket,
  summarize,
} from "./index";

const storeFees = { deliveryFee: 250, plasticBagFee: 25, transactionFee: 30 };

// A placed order shaped like the docs createorder writes.
const order = (overrides = {}) => ({
  cart: [
    { price: 1500, btw: 9 },
    { price: 300, btw: 21 },
  ],
  storeFees,
  delivery: false,
  bag: false,
  tip: 0,
  paid: true,
  canceled: false,
  completed: false,
  paymentMethod: "in_person",
  paymentMethodType: "cash",
  date: "05-11-2026",
  ...overrides,
});

const withTotal = (o) => ({ ...o, total: orderTotal(o) });

const table = (overrides = {}) => ({
  food: [{ price: 2000, btw: 9 }],
  beverages: [{ price: 400, btw: 21 }],
  tip: 100,
  paid: true,
  paymentMethodType: "card",
  date: "05-11-2026",
  ...overrides,
});

const sumRates = (map) => Object.values(map).reduce((x, y) => x + y, 0);

describe("counting rules", () => {
  it("counts only paid, not canceled orders", () => {
    expect(isCountableOrder(order())).toBe(true);
    expect(isCountableOrder(order({ paid: false }))).toBe(false);
    expect(isCountableOrder(order({ canceled: true }))).toBe(false);
  });

  it("counts only paid tables", () => {
    expect(isCountableTable(table())).toBe(true);
    expect(isCountableTable(table({ paid: false }))).toBe(false);
  });

  it("open orders are not canceled, not completed, and not stuck in online payment", () => {
    expect(isOpenOrder(order({ paid: false }))).toBe(true);
    expect(isOpenOrder(order({ completed: true }))).toBe(false);
    expect(isOpenOrder(order({ canceled: true }))).toBe(false);
    expect(
      isOpenOrder(order({ paymentMethod: "online", paid: false })),
    ).toBe(false);
    expect(isOpenOrder(order({ paymentMethod: "online", paid: true }))).toBe(
      true,
    );
  });
});

describe("orderTotal", () => {
  it("adds items and tip for a pick-up order paid in person", () => {
    expect(orderTotal(order({ tip: 50 }))).toBe(1850);
  });

  it("adds the bag fee only for pick-up", () => {
    expect(orderTotal(order({ bag: true }))).toBe(1825);
    expect(orderTotal(order({ bag: true, delivery: true }))).toBe(2050);
  });

  it("adds the delivery fee", () => {
    expect(orderTotal(order({ delivery: true }))).toBe(2050);
  });

  it("adds the transaction fee for online payments but not for op rekening", () => {
    expect(orderTotal(order({ paymentMethod: "online" }))).toBe(1830);
    expect(
      orderTotal(
        order({ paymentMethod: "online", paymentMethodType: "op rekening" }),
      ),
    ).toBe(1800);
  });

  it("works on cart state with separate store fees and undecided choices", () => {
    const cart = {
      cart: [{ price: 1000 }],
      delivery: "undecided",
      bag: true,
      paymentMethod: "undecided",
      tip: 0,
    };
    expect(orderTotal(cart, storeFees)).toBe(1000);
    expect(
      orderTotal(
        { ...cart, delivery: false, paymentMethod: "online" },
        storeFees,
      ),
    ).toBe(1055);
  });

  it("treats a missing storeFees as no fees", () => {
    expect(
      orderTotal(order({ storeFees: undefined, delivery: true, tip: 0 })),
    ).toBe(1800);
  });
});

describe("tableTotal", () => {
  it("adds food, beverages and tip", () => {
    expect(tableTotal(table())).toBe(2500);
  });
});

describe("vatByRate", () => {
  it("splits an order by rate, with fees in their brackets", () => {
    const o = order({
      delivery: true,
      tip: 100,
      paymentMethod: "online",
      paymentMethodType: "ideal",
    });
    expect(vatByRate(o)).toEqual({ 9: 1750, 21: 330, 0: 100 });
  });

  it("puts the bag fee in 21% for pick-up", () => {
    expect(vatByRate(order({ bag: true }))).toEqual({ 9: 1500, 21: 325 });
  });

  it("treats a missing btw as 9% and keeps other rates", () => {
    const o = order({ cart: [{ price: 500 }, { price: 200, btw: 0 }] });
    expect(vatByRate(o)).toEqual({ 9: 500, 0: 200 });
  });

  it("works on tables", () => {
    expect(vatByRate(table())).toEqual({ 9: 2000, 21: 400, 0: 100 });
  });

  it("sums to the order total for normal orders", () => {
    const cases = [
      order(),
      order({ bag: true, tip: 75 }),
      order({ delivery: true, paymentMethod: "online", paymentMethodType: "ideal" }),
      order({ paymentMethod: "online", paymentMethodType: "op rekening" }),
    ];
    cases.forEach((o) => expect(sumRates(vatByRate(o))).toBe(orderTotal(o)));
    expect(sumRates(vatByRate(table()))).toBe(tableTotal(table()));
  });
});

describe("vatFromGross and vatRows", () => {
  it("extracts VAT from a gross amount", () => {
    expect(vatFromGross(1090, 9)).toBe(90);
    expect(vatFromGross(1210, 21)).toBe(210);
    expect(vatFromGross(500, 0)).toBe(0);
  });

  it("returns low, high, zero and other rows", () => {
    expect(vatRows({ 9: 1090, 21: 1210, 0: 100, 13: 113 })).toEqual({
      low: { gross: 1090, tax: 90 },
      high: { gross: 1210, tax: 210 },
      zero: { gross: 100, tax: 0 },
      other: [{ rate: 13, gross: 113, tax: 13 }],
    });
  });
});

describe("paymentBucket", () => {
  it("buckets by payment type", () => {
    expect(paymentBucket(order())).toBe("cash");
    expect(paymentBucket(order({ paymentMethodType: "card" }))).toBe("card");
    expect(
      paymentBucket(order({ paymentMethod: "online", paymentMethodType: "ideal" })),
    ).toBe("online");
    expect(
      paymentBucket(order({ paymentMethod: "online", paymentMethodType: "card" })),
    ).toBe("online");
    expect(
      paymentBucket(
        order({ paymentMethod: "online", paymentMethodType: "op rekening" }),
      ),
    ).toBe("op_rekening");
    expect(paymentBucket(table({ paymentMethodType: "cash" }))).toBe("cash");
  });
});

describe("summarize", () => {
  const orders = [
    withTotal(order()), // 1800 cash
    withTotal(order({ paymentMethodType: "card", date: "04-11-2026" })), // 1800 card
    withTotal(
      order({
        paymentMethod: "online",
        paymentMethodType: "ideal",
        delivery: true,
        tip: 200,
      }),
    ), // 1800 + 250 + 30 + 200 = 2280 online
    withTotal(
      order({ paymentMethod: "online", paymentMethodType: "op rekening" }),
    ), // 1800 op rekening
    withTotal(order({ canceled: true })), // ignored
    withTotal(order({ paid: false })), // ignored
  ];
  const tables = [table(), table({ paid: false }), table({ paymentMethodType: "cash" })];

  const s = summarize(orders, tables);

  it("only counts countable orders and tables", () => {
    expect(s.totals.orders).toBe(4);
    expect(s.totals.tables).toBe(2);
    expect(s.totals.takeaway).toBe(1800 + 1800 + 2280 + 1800);
    expect(s.totals.restaurant).toBe(5000);
    expect(s.totals.total).toBe(7680 + 5000);
  });

  it("splits payments into buckets", () => {
    expect(s.payments.takeaway).toEqual({
      cash: 1800,
      card: 1800,
      online: 2280,
      op_rekening: 1800,
    });
    expect(s.payments.restaurant).toEqual({ cash: 2500, card: 2500 });
    expect(s.totals.cash).toBe(4300);
    expect(s.onlineByType).toEqual({ ideal: 2280 });
  });

  it("counts delivery tips from countable orders only", () => {
    expect(s.totals.delivery).toBe(1);
    expect(s.totals.deliveryTips).toBe(200);
  });

  it("splits VAT per channel and in total", () => {
    expect(s.vatTakeaway.zero.gross).toBe(200);
    expect(s.vatRestaurant.low.gross).toBe(4000);
    expect(s.vat.low.gross).toBe(s.vatTakeaway.low.gross + 4000);
    const grossSum = (v) =>
      v.low.gross + v.high.gross + v.zero.gross +
      v.other.reduce((x, r) => x + r.gross, 0);
    expect(grossSum(s.vat)).toBe(s.totals.total);
  });

  it("groups per day by the date field, sorted by calendar date", () => {
    expect(s.perDay.map((d) => d.date)).toEqual(["04-11-2026", "05-11-2026"]);
    expect(s.perDay[0].takeaway).toBe(1800);
  });

  it("keeps the order of given days and fills empty ones", () => {
    const days = [{ date: "06-11-2026" }, { date: "05-11-2026" }];
    const d = summarize(orders, tables, days).perDay.map((x) => x.date);
    expect(d).toEqual(["06-11-2026", "05-11-2026", "04-11-2026"]);
  });
});
