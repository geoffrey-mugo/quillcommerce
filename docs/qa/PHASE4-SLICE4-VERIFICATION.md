# Phase 4 · Slice 4 verification — SPEC-014 pickup availability & disclosures

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev

## Results (live on the dev storefront)

| Check | Result |
|---|---|
| Disclosure blocks | PASS — two template blocks ("Shipping & returns", "Care") render as native details rows below the description; open/close via summary click; content visible when open; chevron rotates; hairline separators |
| Disclosure a11y | PASS (by construction + click test) — native details/summary, 44px summaries, `aria-hidden` chevrons, `shopify_attributes` on each block |
| Pickup endpoint | PASS — `?section_id=qc-pickup-availability&variant=` returns 200 with the section wrapper on any product URL |
| Pickup re-fetch | PASS — variant change fires the fetch (network log: one request per change, correct variant id), response applied without console errors; empty store response leaves the container empty |
| No-pickup store | PASS — snippet renders nothing (no stray markup) since the store has no pickup-enabled locations |
| Pickup content | STRUCTURAL — `store_availabilities` is empty on this store (local pickup not enabled on Shop location — store shipping setting, not changed without approval); status line, pick_up_time, and multi-location details list unobserved live |
| No regression | PASS — variant sync (price $135 on M), pill striking, plans/lightbox untouched; Theme Check now 50 files / 0 offenses |

## Gates
Theme Check: 50 files, 0 offenses. Provenance scan: clean. `node --check`:
OK. Pushed to #149206040653 (including templates/product.json with the
two fixture disclosure blocks).

## Known gaps
- Live pickup rendering needs Local Pickup enabled on the dev store's
  Shop location (Settings → Shipping and delivery) — pending user
  approval; everything up to the platform data is exercised.
- Editor add/reorder of disclosure blocks rides on the carried Theme
  Editor walkthrough.
