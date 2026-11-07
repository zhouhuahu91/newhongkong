import calculateVat from "@/functions/calculateVat";
import calculateTableVat from "@/functions/calculateTableVat";
import calculateTableTotal from "@/functions/calculateTableTotal";

// Same filters and payment rules as components/dashboard/DailyReportModal.js.
export const isValidOrder = (order) =>
  order.canceled === false && order.paid === true;
export const isValidTable = (table) => table.paid === true;

const emptyBucket = () => ({
  takeaway: 0,
  restaurant: 0,
  total: 0,
  online: 0,
  card: 0,
  cash: 0,
  orders: 0,
  tables: 0,
  delivery: 0,
});

const addOrder = (bucket, order) => {
  const total = order.total || 0;
  bucket.takeaway += total;
  bucket.total += total;
  bucket.orders += 1;
  if (order.delivery) bucket.delivery += 1;
  if (order.paymentMethod === "online") bucket.online += total;
  else if (order.paymentMethodType === "card") bucket.card += total;
  else if (order.paymentMethodType === "cash") bucket.cash += total;
};

const addTable = (bucket, table) => {
  const total = table.total;
  bucket.restaurant += total;
  bucket.total += total;
  bucket.tables += 1;
  if (table.paymentMethodType === "card") bucket.card += total;
  else if (table.paymentMethodType === "cash") bucket.cash += total;
};

// calculateVat needs storeFees; very old orders may not have them.
const safeOrderVat = (order) => {
  try {
    return calculateVat({
      ...order,
      storeFees: order.storeFees || {
        deliveryFee: 0,
        plasticBagFee: 0,
        transactionFee: 0,
      },
      tip: order.tip || 0,
    });
  } catch (e) {
    return { low: order.total || 0, high: 0, zero: 0 };
  }
};

// orders / tables are raw firestore docs (already fetched for the period).
// days is the list from getPeriodRange, used to fill in days without revenue.
const summarizeRevenue = (rawOrders, rawTables, days = []) => {
  const orders = rawOrders.filter(isValidOrder);
  const tables = rawTables
    .filter(isValidTable)
    .map((table) => ({ ...table, total: calculateTableTotal(table) }));

  const totals = emptyBucket();
  const perDayMap = {};
  days.forEach((day) => {
    perDayMap[day.date] = { ...day, ...emptyBucket() };
  });
  const bucketFor = (date) => {
    if (!perDayMap[date]) perDayMap[date] = { date, ...emptyBucket() };
    return perDayMap[date];
  };

  const vatBase = { low: 0, high: 0, zero: 0 };

  orders.forEach((order) => {
    addOrder(totals, order);
    addOrder(bucketFor(order.date), order);
    const v = safeOrderVat(order);
    vatBase.low += v.low;
    vatBase.high += v.high;
    vatBase.zero += v.zero;
  });

  tables.forEach((table) => {
    addTable(totals, table);
    addTable(bucketFor(table.date), table);
    const v = calculateTableVat(table);
    vatBase.low += v.low;
    vatBase.high += v.high;
    vatBase.zero += v.zero;
  });

  const vat = {
    low: { gross: vatBase.low, tax: Math.round((vatBase.low / 109) * 9) },
    high: { gross: vatBase.high, tax: Math.round((vatBase.high / 121) * 21) },
    zero: { gross: vatBase.zero, tax: 0 },
  };

  // Keep the order of the period's days; append any stray dates at the end.
  const known = new Set(days.map((d) => d.date));
  const perDay = [
    ...days.map((d) => perDayMap[d.date]),
    ...Object.values(perDayMap).filter((d) => !known.has(d.date)),
  ];

  return {
    totals,
    avgOrder: totals.orders ? Math.round(totals.takeaway / totals.orders) : 0,
    avgTable: totals.tables ? Math.round(totals.restaurant / totals.tables) : 0,
    vat,
    perDay,
  };
};

export default summarizeRevenue;
