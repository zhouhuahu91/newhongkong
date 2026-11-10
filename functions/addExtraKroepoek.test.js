import { describe, it, expect } from "vitest";
import addExtraKroepoek, { ORIGINAL_ORDER_REMARK } from "./addExtraKroepoek";
import { isOpenOrder, isCountableOrder } from "./ledger";

const storeFees = { deliveryFee: 250, plasticBagFee: 25, transactionFee: 30 };

const original = {
  name: "Jansen",
  time: "18:30",
  date: "10-11-2026",
  remarks: "",
  storeFees,
  delivery: false,
  paymentMethod: "online",
  paid: true,
};

const udang = {
  id: "14",
  name: { nl: "kroepoek udang", en: "prawn crackers", de: "Krabbenchips" },
  price: 360,
  btw: 9,
};
const casava = { ...udang, id: "15", name: { nl: "kroepoek casava" } };

describe("addExtraKroepoek", () => {
  it("starts a quick order that skips the kitchen and stays in the queue", () => {
    const { order } = addExtraKroepoek({
      original,
      quickOrder: null,
      menuItem: udang,
      now: 1,
    });

    expect(order).toMatchObject({
      name: "Jansen",
      time: "18:30",
      date: "10-11-2026",
      remarks: "bij bestelling Jansen 18:30",
      paid: false,
      paymentMethod: "in_person",
      delivery: false,
      bag: false,
      printed: true,
      ready: true,
      completed: false,
      canceled: false,
      total: 360,
    });
    expect(order.cart).toEqual([
      expect.objectContaining({ id: "14", qwt: 1, price: 360, btw: 9 }),
    ]);
    expect(isOpenOrder(order)).toBe(true);
    // Counts in reports once staff mark it paid.
    expect(isCountableOrder({ ...order, paid: true })).toBe(true);
  });

  it("adds later taps to the same quick order, using the menu price", () => {
    const first = addExtraKroepoek({ original, quickOrder: null, menuItem: udang });
    const second = addExtraKroepoek({
      original,
      quickOrder: first.order,
      menuItem: udang,
    });
    const third = addExtraKroepoek({
      original,
      quickOrder: second.order,
      menuItem: { ...casava, price: 400 },
    });

    expect(third.order.cart.map(({ id, qwt, price }) => ({ id, qwt, price }))).toEqual([
      { id: "14", qwt: 2, price: 720 },
      { id: "15", qwt: 1, price: 400 },
    ]);
    expect(third.order.total).toBe(1120);
  });

  it("appends the remark to the original order once, keeping existing remarks", () => {
    const { originalRemarks } = addExtraKroepoek({
      original: { ...original, remarks: "extra saus" },
      quickOrder: null,
      menuItem: udang,
    });
    expect(originalRemarks).toBe(`extra saus\n${ORIGINAL_ORDER_REMARK}`);

    const again = addExtraKroepoek({
      original: { ...original, remarks: originalRemarks },
      quickOrder: null,
      menuItem: udang,
    });
    expect(again.originalRemarks).toBe(originalRemarks);

    const empty = addExtraKroepoek({ original, quickOrder: null, menuItem: udang });
    expect(empty.originalRemarks).toBe(ORIGINAL_ORDER_REMARK);
  });
});
