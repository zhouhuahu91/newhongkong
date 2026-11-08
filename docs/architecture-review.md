# Architecture review: where to deepen the codebase

## Context
I ran the improve-codebase-architecture skill. The repo has no GLOSSARY.md and no ADRs. The hot spots in git history are:
- menu prices: about 40 "updated the prices" commits;
- "exclude canceled/unpaid orders" patches, applied one call site at a time;
- the tables POS (TableModal, TableModalMenu, ReceiptModal, Receipt);
- the dashboard (OrderCard, OrderModal);
- useStoreInfo.

The skill's HTML report could not be written because plan mode only allows edits to this file, so the candidates are listed here instead. No interfaces are proposed yet; the next step is a grilling session on whichever candidate you pick.

## Candidates

### 1. Order ledger module — DONE (commit 4d170f4): countable rule, totals, VAT, payment buckets (Strong)
**Files:** `functions/summarizeRevenue.js`, `components/dashboard/DailyReportModal.js`, `pages/monthly_overview.js`, `pages/dashboard.js`, `functions/calculateTotalCartPrice.js`, `functions/calculateTotalOrderPrice.js`, `functions/calculateVat.js`, `functions/calculateTableVat.js`, `CreateCustomerReceipt.js`, `tables/Checkout.js`

**Problem:** The rule for which orders count was never given a name, so five commits each patched one call site. The rule now differs between files:
- `dashboard.js:42` skips the paid check.
- `dashboard.js:60` totals tips across canceled orders too.
- `monthly_overview.js:196` counts unpaid tables.

The money math is repeated in many places:
- totals are computed twice;
- there are two VAT ladders, and both silently drop any btw value other than 9/21;
- the gross-to-VAT formula `x/109*9` appears 4 times;
- payment buckets appear 3 times, and each defines cash differently.

**Solution:** Deepen this into a single module with pure functions over plain order and table objects. Every report, the cart, the receipts and (later) the server would call it.

**Benefits:**
- Locality: a rule change becomes a one-line edit.
- Leverage: about 10 call sites share one module.
- Testability: it is the first logic in the repo that can be unit-tested without React or Firestore.

### 2. Receipt builders plus one print-job writer — DONE (`functions/receipts/`, `hooks/usePrintQueue.js`)
**Files:** `CreateCustomerReceipt.js` (141 lines), `tables/Checkout.js` (238), `tables/Receipt.js` (292), `OrderCard.js:82`, `DailyReportModal.js:234`

**Problem:** Five places write to `printer`. The customer receipt and the table receipt are near-copies (same header, VAT block, `transform` options and base64 conversion). The printer-busy subscription is written 3 times, and the busy check only exists in one place. `OrderCard.js:102` calls autoPrint during render.

**Solution:**
- Pure functions `order|table -> receiptline markup`.
- One adapter that queues print jobs.

**Benefits:** Snapshot tests for every receipt, and the layout is defined in one place. This depends on candidate 1 for the VAT numbers.

### 3. Confirm Order on the server (Strong; it covers correctness and security)
**Files:** `pages/api/createorder.js`, `paymentwebhook.js`, `stripe.js` (duplicate), `AdminCheckoutModal.js`, `functions/addTimeSlot.js`, `sendMail.js`, `cancelorder.js`

**Problem:**
- The server trusts the client's `total` (there is a TODO at line 31 that says so).
- `...data` is spread after the defaults, so a client can send `paid: true`.
- The steps "confirm, then send the mail, then add the time slot" are written in 2 places.
- The admin checkout skips the server entirely, so it adds no time slot.
- The webhook is not idempotent: it does not check `paid`, and it sends no response in its catch block, so a Stripe retry can add slots twice.
- Canceling an order never releases its time slot.

**Solution:** Use one server-side module for creating, confirming and canceling orders, and recompute the total through candidate 1. Delete `stripe.js` and `fetch_dates.js`.

### 4. Table repository (Worth exploring)
**Files:** `components/tables/TableModal.js` (12 writes, 332 lines), `Checkout.js`, `Receipt.js`, `ClosedTable.js`, and `hooks/useTableActions.js` (an empty stub)

**Problem:**
- Edits rewrite the whole dish array from props with no transaction, so two devices editing at once lose updates.
- Six handlers are passed down through 4 levels of props.
- The "table is occupied" query is duplicated.

**Solution:** Fill in `useTableActions` as a deep module: array transforms that can be tested, plus Firestore transactions behind the module's interface.

### 5. Schedule and Slot module (Worth exploring)
**Files:** `hooks/useStoreInfo.js`, `hooks/useTimePicker.js`, `addTimeSlot.js`, `/api/fetchdate`, `DeleteTimeSlotModal.js`

**Problem:**
- The open/closing-soon checks use the client clock.
- There are 3 date sources (Amsterdam time, UTC on the server, and the client).
- The "over €80 takes 2 slots" rule is written twice.
- I verified two latent bugs in `useTimePicker.js`:
  - `open` at line 84 resolves to `window.open`.
  - `const min` is reassigned at line 104.
- The admin's slot deletion reads the admin's own cart.

**Solution:** Pure functions `schedule(settings, now)` and `availableSlots(settings, now, taken, total)`.

### 6. One price source for online ordering and the POS (Worth exploring)
**Files:** `hooks/useMenu.js:218`, `data/data.js`, `data/uploadData.js`, `tables/items/Food.js`, `AllFood.js`

**Problem:**
- The override check is reversed: after a deploy, a stale Firestore copy wins over the newer bundled data.
- The POS imports the static data directly, so online ordering and the POS can show different prices.
- Prices are stored inline among the translated item literals, which is why they took 37 commits to update.
- The `dineInPrice` swap and the hard-coded ID lists are duplicated.

**Solution:** One module for resolving the menu and its prices, with the version comparison done by semantics instead of `!==`. Possibly a separate price table.

## Top recommendation
**Start with candidate 1, the order ledger.** It is where git history shows the most repeated hand patches, and the inconsistent rules already produce wrong report numbers. Candidates 2 and 3 both depend on it: receipts need its VAT split, and the server needs its total calculation. It is also pure and has no I/O, so it is the natural first test target in a repo that has no tests.

## Next step
Run a grilling session on the candidate you choose, keep GLOSSARY.md updated (I will create it lazily) as names settle, and then produce the implementation plan.

## Verification (for whichever candidate is implemented)
- `npm run lint` and `npm run build`.
- Add a minimal test runner (vitest) for the new pure module.
- Manually compare the daily and monthly report numbers before and after for a known date in `npm run dev`.
