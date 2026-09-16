# Pass 7 — Cross-browser, responsive & visual consistency — 2026-09-16

Live responsive sweep at 320 / 375 / 768 / 900 / 990 / 1100 / 1200 /
1440 on the dev theme, a static engine-compatibility audit of all CSS
and JS, and visual screenshot review at mobile and desktop widths.

## Issues found and fixed

1. **Collection grid column cliff at 990px.** Column progression was
   2 → 3 → 4 (900px) → **2** (990px, when the 260px filter sidebar
   appears) → 3 — cards suddenly doubled in size as the screen grew.
   In the 990–1199 band the card minimum is now capped at 190px via
   `min(var(--qc-card-min), 190px)`, which preserves the merchant's
   dense setting (168px stays 168px). Verified: 990 → 3, 1100 → 3,
   1200 → 3, 1440 → 4 — monotonic.
2. **iOS focus zoom on the utility-bar selects.** The country and
   language selects were 13px; iOS Safari zooms the whole page when
   focusing any control under 16px. They are now 1rem below 650px
   (`.qc-input` was already 16px everywhere).
3. **`100dvh` without fallbacks** in the cart drawer, header drawer
   panel, and quick-view max-height — each now declares `100vh`
   first so engines without dynamic viewport units keep a sane size.
4. **iOS home-indicator overlap**: the product sticky buy bar and
   the cart-drawer footer now add `env(safe-area-inset-bottom)` to
   their bottom padding (no-op on devices without insets).

## Responsive matrix (all pass)

- No horizontal overflow at any tested width on home, collection,
  product, cart, search, contact, blog (checked down to 320px, zero
  protruding elements).
- Grid bands: <650 → 2 cols, 650–849 → 3, 850–989 → 4, sidebar
  layouts ≥990 → 3 growing to 4.
- Header switches drawer ↔ desktop nav exactly at 990px; filter
  sidebar appears at 990px; sticky bar, drawer, and dialogs verified
  at mobile widths in Passes 3–5.
- Visual review (screenshots at 375/desktop): hero, card grid
  (compare toggle / image / price / title / action row aligned),
  badges, breadcrumbs, product page consistent; the brief blank area
  seen mid-scroll was lazy-image decode, not a layout gap.

## Engine compatibility audit (static)

- `color-mix(in oklab)` — full literal-color fallback block under
  `@supports not` (server-computed with identical weights).
- `:has()` — used for scroll-lock, pill checked/focus states, login
  pane toggle, card hover-image focus; baseline in all evergreen
  engines since 2023. Without it: pills lose the highlight ring but
  radios stay functional; scroll-lock degrades to scrollable
  background. Acceptable for the Theme Store browser matrix.
- `<dialog>`, `::backdrop`, `requestSubmit`, `AbortController`
  listener signals, `?.`/`??=`, `replaceChildren`, logical
  properties, `overscroll-behavior` — all within Safari 16+/evergreen
  baseline; no polyfill-worthy gaps. JS has zero third-party deps and
  the no-JS baseline (native details, plain forms, Apply button)
  covers legacy engines entirely.
- `-webkit-details-marker` hidden alongside `list-style` on every
  summary.

**Not covered**: live Safari/Firefox sessions — no other engines are
installed on this machine and the iOS Simulator requires full Xcode
(only Command Line Tools present). The compatibility audit above is
static; a manual Safari + Firefox smoke pass (or BrowserStack run)
before Theme Store submission is still recommended.

Gates: theme check 94 files / 0 offenses, provenance clean.
