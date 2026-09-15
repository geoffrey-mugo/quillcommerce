# Phase 5 · Slice 1 verification — SPEC-017 cart drawer & unified Ajax editing

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev
State discipline: the user's cart (Inventory Not Tracked Snowboard ×1,
Complete Snowboard/Ice ×1, no note) was verified restored after every
mutation below.

## Results (live)

| Check | Result |
|---|---|
| Drawer render | PASS — native dialog side panel, scroll-lock, labeled, close button first-focusable; empty on load until opened |
| Open via header link | PASS — `data-qc-cart-open` intercepts, drawer shows both lines, "2 items", subtotal $1,649.90, scroll locked |
| Quantity edit in drawer | PASS — 1→2 posts /cart/change.js; count "3 items", header badge 3, subtotal $2,599.85, "Cart updated" announced; 2→1 restores |
| Quick add auto-open | PASS — card quick add (`source: 'add'`) opens the drawer with the new line first ("The Multi-location Snowboard", 3 items) |
| Remove in drawer | PASS — remove link intercepted to qty 0; drawer stays open, re-renders to 2 items |
| Backdrop / close | PASS — backdrop click closes and unlocks scroll (Escape = native dialog; synthetic-Escape artifact as documented) |
| Cart page Ajax | PASS — quantity change updates subtotal without reload (JS marker survives), Update button hidden (and stays hidden after refresh) |
| Note autosave | PASS — change posts /cart/update.js, "Note saved" announced, verified in /cart.js, restored |
| Cross-surface sync | PASS — a drawer edit on the cart page refreshes the page beneath to the identical subtotal; every `qc:cart-updated` refreshes all `qc-cart-lines` surfaces |
| Shared line snippet | PASS — drawer lines show variant titles, per-line prices via the same qc-cart-line (drawer-prefixed ids; no duplicate ids with the page) |
| No-JS baselines | STRUCTURAL — drawer absent (dialog inert without JS, header link navigates to /cart); page keeps updates[]/Update/remove-href/note POST flow |
| cart_type=page | STRUCTURAL — setting guard renders no drawer markup and skips the link interception |

## Defect found & fixed during gates
The drawer reused `.qc-cart__lines` / `.qc-cart-line*` /
`.qc-cart__summary-row` styles that lived in cart.liquid's page-scoped
`{% stylesheet %}` — unstyled everywhere except /cart (caught by Theme
Check's ValidScopedCSSClass). Shared cart primitives moved to
qc-foundation.css.

## Gates
Theme Check: 52 files, 0 offenses. Provenance scan: clean. `node
--check`: OK. Pushed to #149206040653.

## Known gaps
- Real-keyboard Escape and the cart_type editor toggle ride on the
  carried real-keyboard / Theme Editor items.
- Checkout button from the drawer navigates to checkout (not exercised —
  no test order).
