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
