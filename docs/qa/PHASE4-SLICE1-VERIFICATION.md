# Phase 4 · Slice 1 verification — SPEC-011 PDP gallery & variant sync

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev
Fixture: **QC Test Parka** (`qc-test-parka`, CSV import + admin inventory):
Size S/M × Color Spruce/Slate; S/Spruce $120 qty 25; S/Slate $120
compare-at $150 qty 3 (low stock); M/Spruce $135 qty 25; M/Slate $135
qty 0 deny (dead combination). Multi-media: Selling Plans Ski Wax (3 media).

Note: CSV inventory quantities do not land on this multi-location Plus
store — quantities were set on the admin Inventory page (Shop location)
and confirmed via `/products/qc-test-parka.js` (`available` flags correct).

## Results (all live on the dev storefront)

| Check | Result |
|---|---|
| JS upgrade | PASS — pill fieldsets revealed, fallback select hidden (`display:none` computed) |
| Default state (S/Spruce) | PASS — $120.00, SKU QCTP-S-SPR, "In stock", buy enabled, no pills struck |
| Select Slate → S/Slate | PASS — sale render `$120.00 <s>$150.00</s>` + SR "Sale price" label, SKU QCTP-S-SLA, "Low stock — 3 left" (state=low), form id + `?variant=` updated, live region "S / Slate — In stock" |
| markUnavailable | PASS — with Slate picked, M struck; with M picked, Slate struck; both selectable |
| Dead combination (M+Slate) | PASS — buy disabled "Sold out", stock state=out, `?variant=` updated, announced "M / Slate — Sold out" |
| Recovery (→ Spruce) | PASS — M/Spruce $135.00, "In stock", buy re-enabled |
| Deep link `?variant=` (S/Slate) | PASS — server preselects; pills checked S+Slate; Liquid sale render incl. SR label; low stock; M struck on load |
| Gallery multi-media | PASS — 3 thumbs "Media n of 3", click toggles single visible slide + `aria-current`; accent ring on active thumb |
| Gallery single-media | PASS — thumb strip absent (Complete Snowboard) |
| Variant→media sync | STRUCTURAL — no dev-store variant has a `featured_media`; code path guards `media_id` null (gallery untouched) |
| No-JS baseline | STRUCTURAL — fieldsets ship `hidden`, labeled `<select name="id">` ships visible (verified as the working picker in Phase 1) |

## Defects found & fixed this slice
1. **Fallback select visible after upgrade** — `.qc-field { display:flex }`
   overrode the UA `[hidden]` rule, so the hidden fallback picker still
   rendered. Fix: global `[hidden] { display:none !important }` reset in
   `qc-foundation.css`. Smoke-checked quick view / facets / cards after the
   change: no `[hidden]` element force-shown anywhere (0 violations).
2. **JS sale re-render dropped the SR "Sale price" label** (spec §3). Fix:
   `data-sale-label` on `<qc-product-page>` + visually-hidden span prepended
   in the sale branch of `sync()`.

Both fixes re-verified live after push.

## Carried re-check closed
Blog comments: root cause was **not** storefront cache — the admin radio
save had silently reverted (blogs list showed "Disabled"). Re-saved
"Allowed, pending moderation" (list now confirms, "Just now"); storefront
article now renders the comments section, form, and moderation note.

## Gates
Theme Check: 48 files, 0 offenses. Provenance scan: clean. Pushed to
#149206040653.

## Known gaps
- Variant featured-media sync and video/model media untested with real data
  (no such fixtures on the dev store); code paths structural only.
- Real-keyboard Escape, Theme Editor walkthrough, sibling-close nav
  fixtures still carried.
