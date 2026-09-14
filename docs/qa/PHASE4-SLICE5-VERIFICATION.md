# Phase 4 · Slice 5 verification — SPEC-015 sticky purchase bar & gift recipient

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev
Fixtures: QC Test Parka (sticky bar), Gift Card $10/$25/$50/$100
(recipient; $10 denomination stocked at Shop location for the live add).

## Sticky purchase bar

| Check | Result |
|---|---|
| Hidden baseline | PASS — ships `hidden`; no-JS never shows it |
| Show on scroll-past | PASS — appears only once the buy button is above the viewport (tested at 375×480 emulation where the page is long enough); never while the button is below the fold |
| Hide on return | PASS — instant scroll to top hides it again |
| Content & form binding | PASS — truncated title, price, submit button bound to the main form via `form` attribute (id verified present) |
| State sync | PASS — variant change updates price ($120→$135) and label; dead combination → "Sold out" disabled |
| Back-to-top lift | PASS — `--qc-sticky-offset` 61px while shown (back-to-top at 85px), cleared on hide |
| Reduced motion | By construction — no animation |

**Two defects found & fixed during verification:**
1. IntersectionObserver never re-fired after instant scroll jumps — the
   buy button teleports from above-viewport to below-viewport with no
   intersecting state in between, so no crossing is ever reported (IO
   cannot distinguish which side a non-intersecting target is on).
   Replaced with an rAF-throttled passive scroll/resize listener doing a
   direct `getBoundingClientRect().bottom < 0` check.
2. Setup made deferred + re-entrant (`setTimeout(0)`, teardown-first) so
   load-time element churn can't strand dead listeners.

**Preview-only caveat**: Shopify's draft-theme preview banner (bottom
iframe overlay) covers the bar on preview links; published storefronts
have no banner. Functionally verified via geometry/state.

## Gift-card recipient

| Check | Result |
|---|---|
| Scoped render | PASS — markup only on the gift-card product |
| Progressive enhancement | PASS — fields collapsed+disabled with JS until "Send as a gift" checked; email `required` only while active; offset filled ("240") |
| Reserved properties | PASS — `__shopify_send_gift_card_to_recipient`, `Recipient email/name`, `Message` (200 max + note), `Send on` (min today, max +90d), `__shopify_offset` |
| End-to-end add | PASS — `/cart/add.js` line "Gift Card - $10" at 1000¢ with all recipient properties attached; test line removed, user's cart restored (2 items) |
| Denomination price sync | PASS — $10→$25 pill updates price (price-varying options) |
| No-JS baseline | STRUCTURAL — native checkbox+fields post the same properties without JS |

**Defect found & fixed:** the no-JS fallback `<select name="id">`
disabled sold-out options; a select whose selected option is disabled
submits no `id` at all (silently empty adds). Options are now label-only
("(Sold out)" suffix) per SPEC-011's original wording; the buy button
remains the availability gate.

## Pickup availability — SPEC-014 carried item CLOSED (now live)
Local pickup enabled on both locations (user-approved); root cause of
empty `store_availabilities` was the **missing street address** on Shop
location (added: 600 Congress Ave, Austin TX 78701 — after which data
propagated). Live results on QC Test Parka:
- "Pickup available at Shop location · Usually ready in 24 hours"
  (state=available, check icon) for stocked variants;
- variant switch re-fetches (network-verified, one request per change);
- M/Slate (qty 0) → "Pickup currently unavailable at Shop location"
  (state=unavailable) — per-variant end-to-end proven.
Multi-location details list still structural (only stocking locations
are returned by the platform; parka stocks only Shop location).

## Gates
Theme Check: 50 files, 0 offenses. Provenance scan: clean. `node
--check`: OK. Pushed to #149206040653.

## Known gaps
- Sticky-bar visual under the preview banner (preview-only, above).
- Real gift-card email delivery not tested (needs an order).
- CDN can serve a stale asset for ~a minute after push — caused one
  false test failure; cache-busted reloads used for verification.
