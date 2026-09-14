# Phase 2 slice 1 — cart coordinator & quick add verification (2026-09-14)

Store: saasquill-app-dev, theme #149206040653.

## Fixtures created this session
- 21 owned demo products imported (store now 34 products → pagination live);
  imported items carry zero inventory at this store's locations, so they double
  as a large sold-out fixture set (badge shown, no buy control — per spec).
- Page "About the Outfitter" (page template content).
- Article "Field Notes: Reading Water in Early Season" in News blog;
  blog comments set to Allowed, pending moderation.

## Checks
| Check | Result |
|---|---|
| Card variants: quick-add form (single-variant available) / Choose-options link (multi-variant) / badge only (sold out) | ✅ all three present on /collections/all |
| Pagination to page 2 | ✅ |
| Quick add click: busy state (label "Adding…", aria-busy, disabled) | ✅ observed synchronously |
| Double-click guard | ✅ two rapid clicks → exactly one line added |
| qc:cart-updated → <qc-cart-count> live update | ✅ 1→2 (and →3 on retest) without reload |
| Live-region announcement | ✅ "The Collection Snowboard: Oxygen added to cart" — after fixing a real bug: rAF-based announce never fired in hidden/prerendered tabs; replaced with synchronous zero-width-suffix re-announce |
| Stayed on page after add | ✅ |
| Button restored after flight | ✅ |
| Cleanup | ✅ cart returned to prior state (1× Complete Snowboard) |

Untested (needs conditions we can't fabricate client-side): network-failure
error path, sold-out 422 race (inventory currently 0 items are excluded from
quick add by design). Theme Editor reorder re-init to be exercised in the
editor during slice 2.
