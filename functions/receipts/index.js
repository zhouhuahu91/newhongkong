// Receipts: every receipt the app prints, built as receiptline markup.
//
// These are pure functions: they take an order, table or report summary and
// return markup text. They never touch Firebase or React. Sending a receipt to
// the printer goes through the Print Queue in @/hooks/usePrintQueue.
//
// NOTE: whitespace inside the template strings is part of the printed layout.
// Keep it exactly as it is (including trailing spaces) when editing.

import receiptline from "receiptline";
import euro from "@/functions/euro";
import getDigitalTime from "@/functions/getDigitalTime";
import getCurrentTimeInSeconds from "@/functions/getCurrentTimeInSeconds";
import createStoreLogo from "@/functions/createStoreLogo";
import { vatByRate, vatRows, tableTotal } from "@/functions/ledger";

// ─── Rendering ───────────────────────────────────────────────────────────────

const RECEIPTLINE_OPTIONS = {
  cpl: 46,
  encoding: "cp936",
  spacing: true,
};

// Markup → SVG string (also used for on-screen previews).
export const renderReceipt = (markup) =>
  receiptline.transform(markup, RECEIPTLINE_OPTIONS);

// Rendered SVG → the `printContent` the print service expects: the SVG as base64.
export const svgToPrintContent = (svg) => Buffer.from(svg).toString("base64");

// Markup → `printContent` in one step.
export const toPrintContent = (markup) =>
  svgToPrintContent(renderReceipt(markup));

// ─── Shared blocks ───────────────────────────────────────────────────────────

// Shop name, logo and address, ending with the separator line before the
// date line. Used by the customer receipt and the table bill.
export const receiptHeader = () => `
    "^^^^New Hong Kong


    ${createStoreLogo()}

    Havenstraat 13
    2211EE Noordwijkerhout
    0252 37 29 02
    info@newhongkong.nl

    -
    `;

// "Totaal is inclusief BTW" plus one line per VAT rate. Works for an order
// and for a table (see vatByRate in the Ledger).
export const vatBlock = (doc) => {
  const vat = vatRows(vatByRate(doc));
  const vatLow = vat.low.tax;
  const vatHigh = vat.high.tax;
  // VAT for rates other than 9% and 21% (usually none).
  const vatOther = vat.other.reduce((x, r) => x + r.tax, 0);

  let markup = `{w:*,10}
    |Totaal is inclusief BTW: | ${euro(vatLow + vatHigh + vatOther)}
    `;

  markup += `BTW 9% | ${euro(vatLow)}
    `;
  markup += `BTW 21% | ${euro(vatHigh)}
    `;
  vat.other.forEach((r) => {
    markup += `BTW ${r.rate}% | ${euro(r.tax)}
    `;
  });

  markup += `{w:auto}`;
  return markup;
};

const FOOTER = `


    "^^^BEDANKT EN TOT ZIENS!`;

// ─── Customer receipt (take-away / delivery order) ───────────────────────────

export const customerReceipt = (order) => {
  let markup = `${receiptHeader()}^^${order.date} | ^^${getDigitalTime(
    getCurrentTimeInSeconds(new Date(order.createdAt)),
  )}

    -
`;

  order.cart.forEach((item) => {
    markup += `{w:*,10}
      ^^${item.qwt} ${item.name["nl"]} | ^^${euro(item.price)}
      `;

    if (item.description["nl"].length) {
      markup += `|${item.description["nl"]}
        `;
    }
  });

  // Subtotal of all the items in the cart.
  markup += `{w:auto}

    -
    ^^Subtotaal ${euro(order.cart.reduce((x, y) => x + y.price, 0))}|`;

  if (order.delivery) {
    markup += `
      ^^Bezorgkosten ${euro(order.storeFees.deliveryFee)}|`;
  }

  if (order.paymentMethod === "online") {
    markup += `
      ^^Transactiekosten ${euro(order.storeFees.transactionFee)}|`;
  }

  // The bag fee is included in the delivery fee for delivery orders.
  if (!order.delivery && order.bag) {
    markup += `
      ^^Tasje ${euro(order.storeFees.plasticBagFee)}|`;
  }

  if (order.tip > 0) {
    markup += `
      ^^Fooi ${euro(order.tip)}|`;
  }

  markup += `

    -
    ^^^Totaal ${euro(order.total)}|


`;

  markup += vatBlock(order);
  markup += FOOTER;
  return markup;
};

// ─── Table bill (restaurant) ─────────────────────────────────────────────────

export const tableReceipt = (table) => {
  let markup = `${receiptHeader()}^^${table.date} | ^^tafel ${table.number}

    -
`;

  table.food.forEach((item) => {
    markup += `{w:*,10}
      ^^${item.qwt} ${item.name?.nl} | ^^${euro(item.price)}
      `;

    if (item.description) {
      markup += `|${item.description}
        `;
    }
  });

  table.beverages.forEach((item) => {
    markup += `{w:*,10}
      ^^${item.qwt} ${item.name} | ^^${euro(item.price)}
      `;

    if (item.description) {
      markup += `|${item.description}
        `;
    }
  });

  markup += `{w:auto}`;

  markup += `

    -
    ^^^Totaal ${euro(tableTotal(table))}|


    `;

  markup += vatBlock(table);
  markup += FOOTER;
  return markup;
};

// ─── Kitchen ticket (restaurant) ─────────────────────────────────────────────

// Counts how often each Chinese name occurs, e.g. { 饭: 2, 面: 1 }.
const countByChineseName = (list) => {
  const count = {};
  list.forEach((entry) => {
    count[entry.name.zh] = (count[entry.name.zh] || 0) + 1;
  });
  return count;
};

// The ticket the kitchen gets for a table: the dishes that are not printed yet,
// in Chinese, with sides on the same line and options on their own lines.
// Side and option counts are multiplied by the dish quantity.
export const kitchenTicket = (table, items) => {
  let markup = `
    ^^^^^餐楼

    -
    ^^^^TAFEL ${table.number}

    -
    `;

  items.forEach((item) => {
    markup += `

      |^^^^${item.qwt} ${item.name?.zh}`;

    // Sides go after the dish name, e.g. "2 炒面, 饭".
    if (item.selectedSides?.length > 0) {
      const sidesCount = countByChineseName(item.selectedSides);
      markup += ",";
      for (const side in sidesCount) {
        const sideQwt = sidesCount[side] * item.qwt;
        // A single side doesn't need its count.
        if (sideQwt > 1) {
          markup += ` ${sideQwt}`;
        }
        markup += ` ${side}`;
      }
    }

    // Options go on their own line, unless the option is the dish itself.
    if (item.selectedOptions?.length > 0 && !item.optionIsMain) {
      const optionsCount = countByChineseName(item.selectedOptions);
      for (const option in optionsCount) {
        markup += `
        |^^^^${optionsCount[option] * item.qwt} (${option})`;
      }
    }
  });

  return markup;
};

// ─── Daily report ────────────────────────────────────────────────────────────

// The end-of-day report. `summary` is the result of summarize() from the Ledger.
export const dailyReport = (summary, date) => {
  const revenue = summary.totals.takeaway;
  const revenueTables = summary.totals.restaurant;
  const onlinePayments = summary.onlineByType;
  const cardPayments = summary.payments.takeaway.card;
  const cashPayments = summary.payments.takeaway.cash;
  const opRekeningPayments = summary.payments.takeaway.op_rekening;
  const cardPaymentsTables = summary.payments.restaurant.card;
  const cashPaymentsTables = summary.payments.restaurant.cash;
  const vat = summary.vatTakeaway;
  const tablesVat = summary.vatRestaurant;
  const otherVatRows = (rows) =>
    rows.other
      .map(
        (r) => `
    ${r.rate}%       | ${euro(r.gross)}|   ${euro(r.tax)}`,
      )
      .join("");
  const otherTax = (rows) => rows.other.reduce((x, r) => x + r.tax, 0);

  let markup = `
    "^^^^New Hong Kong

    Havenstraat 13  
    2211EE Noordwijkerhout
    0252 37 29 02
    info@newhongkong.nl

    -
    dagrapport | ${date}
    -

    "afhaal     | "omzet|             "btw  
    laag 9%     | ${euro(vat.low.gross)}|   ${euro(vat.low.tax)}  
    hoog 21%    | ${euro(vat.high.gross)}|  ${euro(vat.high.tax)}
    geen 0%     | ${euro(vat.zero.gross)}|  ${euro(0)}   ${otherVatRows(vat)}
    ------------------------------------------------
    "           | "${euro(revenue)}|  "${euro(
      vat.low.tax + vat.high.tax + otherTax(vat),
    )}

    "restaurant | "omzet|                    "btw  
    laag 9%     | ${euro(tablesVat.low.gross)}|    ${euro(tablesVat.low.tax)}         
    hoog 21%    | ${euro(tablesVat.high.gross)}|   ${euro(tablesVat.high.tax)}           
    geen 0%     | ${euro(tablesVat.zero.gross)}|   ${euro(0)}   ${otherVatRows(tablesVat)}
    ------------------------------------------------
    "           | "${euro(revenueTables)}|   "${euro(
      tablesVat.low.tax + tablesVat.high.tax + otherTax(tablesVat),
    )}|

    
                    ^^totaal afhaal ${euro(revenue)}|
                    ^^totaal restaurant ${euro(revenueTables)}|
    -------------------------------------------------
                    ^^"totale omzet ${euro(revenue + revenueTables)}| 



    |"betaalwijze | "afhaal|                "restaurant
    |cash         | ${euro(cashPayments)}|  ${euro(cashPaymentsTables)}|
    |pinnen       | ${euro(cardPayments)}|  ${euro(cardPaymentsTables)}|
`;

  if (opRekeningPayments > 0) {
    markup += `|op rekening | ${euro(opRekeningPayments)}| ${euro(0)}
      `;
  }

  for (const type in onlinePayments) {
    markup += `|${type.replace("_", " ")} | ${euro(
      onlinePayments[type],
    )}| ${euro(0)}
      `;
  }
  return markup;
};
