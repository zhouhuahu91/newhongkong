# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Ordering site and in-house POS for the New Hong Kong restaurant (newhongkong.nl). It covers take-away and delivery ordering for customers, an order dashboard for staff, dine-in table management, and receipt printing. It is built with Next.js 12 (Pages Router), React 18, plain JavaScript (no TypeScript), Tailwind, Firebase (Auth and Firestore), and Stripe. It is deployed on Vercel.

## Commands

```bash
npm run dev     # next dev on http://localhost:3000 (PWA service worker disabled in dev)
npm run build   # production build
npm run lint    # next lint (extends next/babel + next/core-web-vitals)
```

There is no test suite.

## Architecture

### Global state: four nested context providers (`pages/_app.js`)
`AuthProvider` → `CartProvider` → `StoreInfoProvider` → `MenuProvider`. The order matters: `useStoreInfo` reads `useCart`, and `useMenu` reads `useAuth`. Each hook in `hooks/` exports both the provider and a `useX()` accessor.

- **useAuth**: Firebase Auth (email, Google, Facebook). It merges the `users/{uid}` Firestore doc with the token's custom claims. Roles are the custom claims `admin`, `employee` and `accountant`. Only an admin can set them, through `pages/api/customclaims.js`. Pages gate access on the client side (for example, `dashboard.js` requires `user.admin`, and `monthly_overview.js` requires admin or accountant).
- **useCart**: a `useReducer` with action types such as `ADD_ITEM`, `SET_DELIVERY` and `INCREMENT_TIP`, persisted to localStorage.
- **useStoreInfo**: subscribes to `general/settings` in Firestore. `openingHours[currentDay]` holds that day's open flag, opening and closing times, and delivery window. It derives `closed`, `openingSoon` and `closingSoon`. All times are **seconds since midnight**, for example `closingTime: 73800` is 20:30. The server date and day come from `/api/fetchdate`, so a wrong client clock doesn't matter. Delivery fees and minimum order amounts depend on the postal code (`functions/calculateDeliveryFees.js`).
- **useMenu**: holds the menu, search, favorites and popular items.

### Menu data is versioned and lives both in code and in Firestore
- The menu is defined statically in `data/category/*.js`. Restaurant-only drinks and desserts are in `data/restaurant/`. `data/data.js` lists the categories and exports `version`.
- Items have localized `name` and `description` objects (`nl`, `en`, `de`, `zh`). Prices are integer **cents**: `price` is the take-away price and `dineInPrice` is the dine-in price. `btw` is the VAT rate from `data/options/btw.js` (`laag: 9`, `hoog: 21`). Item `id`s are strings and are referenced elsewhere (for example the popular IDs in `useMenu`, the kroepoek IDs in `OrderCard`), so keep them stable.
- `useMenu` starts from the bundled data and subscribes to the `menu` collection. If `menu/config.version` differs from the bundled `version`, the Firestore copy wins.
- **Menu change workflow** (visible in git history, for example "changed maandmenu"):
  1. Edit the category file.
  2. Bump `version` in `data/data.js` and add a changelog comment line.
  3. Push to Firestore with `data/uploadData.js`. Its call is commented out in `pages/menu.js`. Temporarily uncomment it and load the page.

### Order and payment flow
1. Checkout POSTs to `/api/createorder`. It writes an `orders` doc through the Admin SDK with the flags `paid`, `canceled`, `printed`, `ready` and `completed`.
2. `paymentMethod === "in_person"`: the server sends the confirmation email (`functions/sendMail.js`, nodemailer) and calls `addTimeSlot`.
3. `paymentMethod === "online"`: the server creates a Stripe PaymentIntent with `metadata.id` set to the order ID. The Stripe webhook (`/api/paymentwebhook`; `/api/stripe` is an older duplicate) sets `paid: true`, then sends the email and adds the time slot.
4. `addTimeSlot` appends the order time to `timeSlotsPickUp/{date}` or `timeSlotsDelivery/{date}`. Orders over €80 take two slots. These slots limit availability in the time picker (`useTimePicker`).
5. The dashboard and reports exclude orders that are canceled or unpaid.

### Firebase client vs. admin
- `firebase/firebase.js` is the client SDK, used in components and hooks.
- `firebase/admin.js` is the Admin SDK and is **server-only**: use it in `pages/api/*` and in functions that only run there (`addTimeSlot`, `sendMail`). Importing it into client code breaks the build.

### Firestore collections
`orders`, `tables` (dine-in POS), `menu`, `general/settings`, `users`, `timeSlotsPickUp` / `timeSlotsDelivery`, `logItemToCart`, `printer`.

### Printing
The app does not talk to the printer directly. It writes a doc to the `printer` collection (`{ type, printContent }`), and an external print service picks it up (see `NEXT_PUBLIC_PRINTER_API`). Receipts are formatted with `receiptline`.

### Staff surfaces
- `pages/dashboard.js` + `components/dashboard/`: the live order queue, store settings (writes `general/settings`), daily reports, and role assignment.
- `components/tables/`: the dine-in table POS, VAT calculation (`calculateTableVat`) and receipts.
- `pages/monthly_overview.js`: the accountant view.

## Conventions
- Import through the `jsconfig.json` aliases: `@/components/*`, `@/hooks/*`, `@/functions/*`, `@/firebase/*`, `@/data/*`, `@/icons/*` (components/icons), `@/tables/*` (components/tables).
- Helpers live one per file in `functions/`, each a default export.
- i18n uses Next's built-in locales `nl` (default), `en` and `de`. UI strings come from `locales/*.js` through `useI18n()`, which returns the locale object.
- Money is always integer cents. Format it with `functions/euro.js`.
- `getURL()` hard-codes `https://newhongkong.nl` in production and `http://localhost:3000` in dev.
- Env vars (`.env.local`): the Firebase client config (`NEXT_PUBLIC_*`), `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY`, `EMAIL` / `EMAIL_PASSWORD`, the Stripe keys (the API routes use the `*_LIVE` variants), `NEXT_PUBLIC_GOOGLEMAPS_API` and `NEXT_PUBLIC_PRINTER_API`.

## Agent skills

### Issue tracker

Issues live in GitHub Issues (zhouhuahu91/newhongkong), managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.
