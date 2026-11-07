// The Ledger: the one place for money rules on orders and tables.
//
// Every page that needs to know "does this order count?", "what is the total?",
// "how much VAT is in it?" or "was it paid cash, card or online?" asks the Ledger
// instead of doing its own math. Pages still fetch their own Firestore data and
// pass plain docs in; nothing here touches Firebase or React, so it also runs on
// the server (pages/api) and in tests (functions/ledger/ledger.test.js).
//
// Money is always integer cents. See GLOSSARY.md for the terms used here.

// VAT rate used when an item has no `btw` field (same as the old helpers).
const DEFAULT_RATE = 9;
const OP_REKENING = "op rekening";

// ─── Counting rules ──────────────────────────────────────────────────────────

// Countable order: counts towards revenue, tips and every report.
export const isCountableOrder = (order) =>
  order.canceled === false && order.paid === true;

// Countable table: a restaurant table counts once it has been paid.
export const isCountableTable = (table) => table.paid === true;

// Open order: belongs in the live queue / header count on the dashboard.
// An online order that is not paid yet means the customer is still paying
// (or gave up), so it is not open yet.
export const isOpenOrder = (order) =>
  order.canceled === false &&
  order.completed === false &&
  !(order.paymentMethod === "online" && !order.paid);

// ─── Totals ──────────────────────────────────────────────────────────────────

const NO_FEES = { deliveryFee: 0, plasticBagFee: 0, transactionFee: 0 };

const isOpRekening = (order) => order.paymentMethodType === OP_REKENING;

// The transaction fee applies to orders paid online through Stripe only.
// Op rekening is marked as "online" in Firestore but pays no transaction fee.
const paysTransactionFee = (order) =>
  order.paymentMethod === "online" && !isOpRekening(order);

// Delivery fee only when delivery is really chosen (the cart can be "undecided").
const paysDeliveryFee = (order) => order.delivery === true;

// Bag fee only for pick-up; the bag is included in the delivery fee.
const paysBagFee = (order) => Boolean(order.bag) && order.delivery === false;

const sumPrices = (items = []) => items.reduce((x, item) => x + item.price, 0);

// Total of a cart (before ordering) or a placed order, in cents.
// For a cart pass the store fees: orderTotal(cartState, storeFees).
// A placed order carries its own fees in order.storeFees.
export const orderTotal = (order, storeFees = order.storeFees) => {
  const fees = storeFees || NO_FEES;
  let total = sumPrices(order.cart);
  if (paysDeliveryFee(order)) total += fees.deliveryFee;
  if (paysTransactionFee(order)) total += fees.transactionFee;
  if (paysBagFee(order)) total += fees.plasticBagFee;
  total += order.tip || 0;
  return total;
};

// Total of a restaurant table in cents: food + beverages + tip.
export const tableTotal = (table) =>
  sumPrices(table.food) + sumPrices(table.beverages) + (table.tip || 0);

// ─── VAT ─────────────────────────────────────────────────────────────────────

const addTo = (map, rate, amount) => {
  if (!amount) return map;
  map[rate] = (map[rate] || 0) + amount;
  return map;
};

const rateOf = (item) => (item.btw === undefined ? DEFAULT_RATE : item.btw);

const addItems = (map, items = []) => {
  items.forEach((item) => addTo(map, rateOf(item), item.price));
  return map;
};

// Gross amount (incl. VAT) per VAT rate, e.g. { 9: 2350, 21: 120, 0: 200 }.
// Works for an order and for a table (a table has `food` and `beverages`).
// Fees: delivery 9%, bag 21%, transaction fee 21%, tip 0%.
// Items with any other rate are kept under their own rate, never dropped.
export const vatByRate = (doc) => {
  const map = {};
  if (Array.isArray(doc.food)) {
    addItems(map, doc.food);
    addItems(map, doc.beverages);
    addTo(map, 0, doc.tip || 0);
    return map;
  }
  const fees = doc.storeFees || NO_FEES;
  addItems(map, doc.cart);
  if (paysDeliveryFee(doc)) addTo(map, 9, fees.deliveryFee);
  if (paysBagFee(doc)) addTo(map, 21, fees.plasticBagFee);
  if (paysTransactionFee(doc)) addTo(map, 21, fees.transactionFee);
  addTo(map, 0, doc.tip || 0);
  return map;
};

// The VAT inside a gross amount: 9% of 109 → Math.round(gross / 109 * 9).
export const vatFromGross = (gross, rate) =>
  rate ? Math.round((gross / (100 + rate)) * rate) : 0;

// Turns a { rate: gross } map into the shape reports show:
// low (9%), high (21%), zero (0%) and `other` for any other rate.
export const vatRows = (map) => {
  const row = (rate) => ({
    gross: map[rate] || 0,
    tax: vatFromGross(map[rate] || 0, rate),
  });
  const other = Object.keys(map)
    .map(Number)
    .filter((rate) => ![0, 9, 21].includes(rate))
    .sort((a, b) => a - b)
    .map((rate) => ({ rate, ...row(rate) }));
  return { low: row(9), high: row(21), zero: row(0), other };
};

const mergeRates = (into, map) => {
  Object.keys(map).forEach((rate) => addTo(into, Number(rate), map[rate]));
  return into;
};

// ─── Payments ────────────────────────────────────────────────────────────────

// Payment bucket of a paid order or table:
// "cash" | "card" | "op_rekening" | "online", or null when unknown.
// Online orders are always "online" even when Stripe says "card".
export const paymentBucket = (doc) => {
  if (doc.paymentMethod === "online") {
    return isOpRekening(doc) ? "op_rekening" : "online";
  }
  if (doc.paymentMethodType === "cash") return "cash";
  if (doc.paymentMethodType === "card") return "card";
  return null;
};

// ─── Summary for reports ─────────────────────────────────────────────────────

const emptyBucket = () => ({
  takeaway: 0,
  restaurant: 0,
  total: 0,
  online: 0,
  card: 0,
  cash: 0,
  op_rekening: 0,
  orders: 0,
  tables: 0,
  delivery: 0,
  deliveryTips: 0,
});

const addOrder = (bucket, order) => {
  const total = order.total || 0;
  bucket.takeaway += total;
  bucket.total += total;
  bucket.orders += 1;
  if (order.delivery) {
    bucket.delivery += 1;
    bucket.deliveryTips += order.tip || 0;
  }
  const pay = paymentBucket(order);
  if (pay) bucket[pay] += total;
};

const addTable = (bucket, table, total) => {
  bucket.restaurant += total;
  bucket.total += total;
  bucket.tables += 1;
  const pay = paymentBucket(table);
  if (pay) bucket[pay] += total;
};

// "dd-mm-yyyy" → "yyyy-mm-dd" so days sort in calendar order.
const sortKey = (date = "") => date.split("-").reverse().join("-");

// Summary of a set of orders and tables (raw Firestore docs).
// Only countable orders and tables are included; callers don't filter.
// Days are grouped by the `date` field (the order day).
// `days` (optional, from getPeriodRange) fills in days without revenue.
//
// Returns:
//   totals        { takeaway, restaurant, total, online, card, cash,
//                   op_rekening, orders, tables, delivery, deliveryTips }
//   avgOrder, avgTable
//   vat           { low, high, zero, other[] } for takeaway + restaurant
//   vatTakeaway   same shape, take-away orders only
//   vatRestaurant same shape, tables only
//   payments      { takeaway: {cash, card, online, op_rekening},
//                   restaurant: {cash, card} }
//   onlineByType  { ideal: 1234, visa: 567, ... } take-away online only
//   perDay        [{ date, ...same keys as totals }]
export const summarize = (rawOrders = [], rawTables = [], days = []) => {
  const orders = rawOrders.filter(isCountableOrder);
  const tables = rawTables.filter(isCountableTable);

  const totals = emptyBucket();
  const takeaway = emptyBucket();
  const restaurant = emptyBucket();
  const perDayMap = {};
  days.forEach((day) => {
    perDayMap[day.date] = { ...day, ...emptyBucket() };
  });
  const bucketFor = (date) => {
    if (!perDayMap[date]) perDayMap[date] = { date, ...emptyBucket() };
    return perDayMap[date];
  };

  const vatTakeaway = {};
  const vatRestaurant = {};
  const onlineByType = {};

  orders.forEach((order) => {
    addOrder(totals, order);
    addOrder(takeaway, order);
    addOrder(bucketFor(order.date), order);
    mergeRates(vatTakeaway, vatByRate(order));
    if (paymentBucket(order) === "online") {
      const type = `${order.paymentMethodType}`;
      onlineByType[type] = (onlineByType[type] || 0) + (order.total || 0);
    }
  });

  tables.forEach((table) => {
    const total = tableTotal(table);
    addTable(totals, table, total);
    addTable(restaurant, table, total);
    addTable(bucketFor(table.date), table, total);
    mergeRates(vatRestaurant, vatByRate(table));
  });

  // With `days` keep their order and append stray dates; otherwise sort by date.
  const known = new Set(days.map((d) => d.date));
  const stray = Object.values(perDayMap)
    .filter((d) => !known.has(d.date))
    .sort((a, b) => sortKey(a.date).localeCompare(sortKey(b.date)));
  const perDay = [...days.map((d) => perDayMap[d.date]), ...stray];

  return {
    totals,
    avgOrder: totals.orders ? Math.round(totals.takeaway / totals.orders) : 0,
    avgTable: totals.tables ? Math.round(totals.restaurant / totals.tables) : 0,
    vat: vatRows(mergeRates({ ...vatTakeaway }, vatRestaurant)),
    vatTakeaway: vatRows(vatTakeaway),
    vatRestaurant: vatRows(vatRestaurant),
    payments: {
      takeaway: {
        cash: takeaway.cash,
        card: takeaway.card,
        online: takeaway.online,
        op_rekening: takeaway.op_rekening,
      },
      restaurant: { cash: restaurant.cash, card: restaurant.card },
    },
    onlineByType,
    perDay,
  };
};
