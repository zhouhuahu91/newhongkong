// Runtime caching rules for the next-pwa service worker.
//
// We start from next-pwa's defaults but drop the catch-all rules. Those routed
// every Firestore / Firebase Auth / Stripe request (and our own /api routes and
// page HTML) through the service worker with a NetworkFirst cache, which made
// auth take ~4s instead of ~1s on page load. Requests that match no rule are
// not touched by the service worker, the browser handles them directly.
const defaultCache = require("next-pwa/cache");

const removedCaches = [
  "cross-origin", // every request to another domain (Firestore, Auth, Stripe, Maps)
  "apis", // same-origin /api/* (fetchdate etc. must never come from a cache)
  "others", // all other same-origin requests, including page HTML
];

module.exports = defaultCache.filter(
  (rule) => !removedCaches.includes(rule.options && rule.options.cacheName),
);
