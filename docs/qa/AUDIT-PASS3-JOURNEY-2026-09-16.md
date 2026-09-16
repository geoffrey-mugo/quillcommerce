# Pass 3 — Product, variant, cart & shopping journey — 2026-09-16

Functional QA on the live dev theme (desktop + 375px mobile), tracing
real customer flows rather than reading code. Test products covered
every variant scenario: 2-option matrix with price variance, sale
compare-at, distinct SKUs and a preorder variant (QC Test Parka);
selling plans across 3 variants (ski wax); 5-variant single option;
single-variant; fully sold out; untracked inventory; gift card
denominations with recipient form.

## Bugs found and fixed

1. **Stale cart after back/forward navigation.** History navigations
   served from the HTTP cache (`performance` navigation type
   `back_forward`, `pageshow.persisted` false) showed the cart badge
   and lines as rendered before the shopper's last add. Two causes,
   both fixed: the pageshow re-sync only handled bfcache restores
   (now also triggers on `back_forward` loads), and Shopify serves
   `/cart.js` and section renders with no cache-control header, so
   browsers heuristically cached the "fresh" reads themselves — cart
   reads and cart section refreshes now use `cache: 'no-store'`.
   Verified: add → navigate away → back now shows badge = server.
2. **Preorder variant claimed "In stock".** A continue-policy variant
   with 0 inventory showed the Pre-order button beside an "In stock"
   line. New `preorder` stock state ("Available to pre-order",
   translated ×5) on the product page (server render + JS sync) and
   quick view.
3. **Network failures announced browser prose.** A dropped connection
   during add or line change announced "Failed to fetch" verbatim;
   TypeErrors now fall back to the localized error label (server
   messages like "Cannot find variant" still pass through).
4. **Cart update failures said "Couldn't add to cart".** Line-change
   and note errors reused the add-error string; new `cart.update_error`
   key ("Couldn't update the cart. Please try again.", ×5) wired to
   the cart page and drawer.
5. **Drawer checkout button below the fold on mobile.** With 6+ lines
   the whole drawer body scrolled, hiding subtotal/checkout. Now only
   the line list scrolls; the footer stays pinned. Verified at 375px
   with a 6-line cart.

## Verified working (live)

- **Variant sync** (pills → everything): price, sale markup with SR
  labels, compare-at, SKU, low-stock count ("3 left"), URL ?variant,
  hidden id field, buy/sticky labels (Add to cart / Pre-order / Sold
  out), sticky-bar price. Unavailable-combination striking + disabled
  buy verified at component level (no such combo exists on the store).
- **Gallery**: thumb switching with aria-current, variant-media
  show() path, lightbox open/nav/counter ("Media 2 of 2").
- **Add to cart**: busy state (disabled + "Adding…" + aria-busy),
  double-click collapses to one submission, toast + polite live-region
  announcement, qty > 1, invalid variant → role=alert inline error,
  cart untouched. Dynamic checkout (payment button) renders.
  Forcing a submit for a sold-out 3p-fulfilled product is accepted by
  Shopify's own API (checkout enforces); the theme's disabled button
  is the correct guard and held.
- **Selling plans**: one-time default, per-variant plan allocation
  (plans not offered on a variant disable + fall back to one-time,
  announced), plan price + URL param sync, subscription line added to
  cart with allocation price.
- **Gift card**: denomination pills, recipient toggle enables/requires
  fields, timezone offset filled, fields disabled when off.
- **Cart page + drawer**: steppers (rapid-tap queue from Pass 1),
  direct entry, remove (page refreshes; closed drawer stale-flags and
  refreshes on open — verified 7→6), note save/clear with
  announcement, DOM subtotal = server total to the cent, badge sync
  across surfaces, drawer focus in/return, Escape/backdrop close,
  checkout + view-cart present.
- **Failure injection**: network reject → error announced, DOM
  re-synced to server truth; malformed (HTML) response → localized
  label, no raw SyntaxError leak.
- **Mobile (375px)**: 44px pills/steppers, full-width buy, no
  horizontal scroll, sticky bar appears past the buy button and hides
  back at top, card picker opens upward with Close state, drawer fits
  width.
- **Accessibility**: zero unlabeled controls on product page (audit),
  ArrowRight on variant radios moves + checks + full sync (real key
  events), quick-view and drawer both return focus to their trigger,
  errors are role=alert and mirrored to the qc:announce live region.

User's cart restored to its exact starting state (6 items ×1, no
note) after every test.

Gates: node --check ×13, theme check 94 files / 0 offenses, locale
parity 254 × 5, provenance clean.
