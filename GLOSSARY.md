# Glossary

Domain terms used in the code. Keep names in code and conversation consistent with these.

**Ledger**: the module in `functions/ledger/` that holds every money rule for orders and tables: which ones count, totals, VAT split and payment split. Pages fetch their own data and pass it in; the Ledger never touches Firebase or React.

**Countable order**: an order that counts towards revenue, tips and every report: not canceled and paid (`isCountableOrder`).

**Countable table**: a restaurant table that counts towards revenue: paid (`isCountableTable`).

**Open order**: an order that belongs in the dashboard's live queue and header count: not canceled, not completed, and not an online order whose payment is still pending (`isOpenOrder`).

**Order day**: the day an order or table belongs to in reports, taken from its `date` field (`dd-mm-yyyy`). Moving an order on the dashboard changes this field. Not `createdAt`.

**Op rekening**: pay on account. Staff mark an unpaid order this way from the order modal. In Firestore it is stored as `paymentMethod: "online"` + `paymentMethodType: "op rekening"`, but it is its own payment bucket and pays no transaction fee.

**Payment bucket**: how a paid order or table was paid, as used by every report (`paymentBucket`): `cash`, `card` (pin in the store), `online` (Stripe: iDEAL, cards, Apple Pay, …) or `op_rekening`.

**Take-away / Restaurant**: the two channels in reports. Take-away = `orders` (pick-up and delivery); Restaurant = `tables` (dine-in POS).

**Delivery tips**: tips on countable delivery orders, shown on the dashboard for the driver.

**Print Queue**: the `printer` collection, and the only code that writes to it (`hooks/usePrintQueue.js`). The external print service picks up a job and deletes it when done. The printer handles one job at a time, so `queuePrintJob` refuses a new job while any job is still waiting. `usePrintQueue()` gives the live `jobs` / `busy` state for buttons and spinners.

**Print job**: one doc in `printer`: `{ type, printContent }`, with the doc id set to the order, table or date it is for. Types: `order` (kitchen ticket for a take-away order; `printContent` is the raw order and the print service formats it), `customerReceipt`, `tableReceipt` (table bill), `tableOrder` (kitchen ticket for a table; also carries `table`) and `dailyReport`.

**Receipt builder**: a pure function in `functions/receipts/` that turns an order, table or report summary into receiptline markup (`customerReceipt`, `tableReceipt`, `kitchenTicket`, `dailyReport`). `toPrintContent(markup)` turns markup into a print job's `printContent`; `renderReceipt(markup)` gives the SVG for on-screen previews.

**Kitchen ticket**: the Chinese ticket (餐楼) for the dishes of a table that are not printed yet, with sides on the dish line and options on their own lines, counts multiplied by the dish quantity.
