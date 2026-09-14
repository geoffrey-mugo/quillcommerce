# SPEC-002 · Design tokens & foundation primitives

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 1 (foundation), slice 1
Provenance: Original QuillCommerce design decisions (guide §5, §8). No external
theme referenced; values authored for this spec.

## Merchant outcome
Set the store's look (two fonts, background/foreground/accent colors, corner
style) from Theme settings and have every component — text, buttons, inputs,
badges, prices — follow coherently, with accessible contrast and focus states
they never have to think about.

## Shopper outcome
Read, navigate, and operate every control with a keyboard or touch on any
device: visible focus everywhere, ≥44px touch targets, prices whose sale state
is announced in words, and motion that respects reduced-motion preferences.

## Behavioral requirements
1. All tokens are CSS custom properties under the `--qc-` namespace, emitted
   once from theme settings in `snippets/css-variables.liquid`.
2. **Color roles**, not raw palette: `surface`, `surface-raised`, `ink`,
   `ink-soft`, `line`, `accent`, `accent-ink`, plus feedback roles `ok`,
   `warn`, `danger`. Derived roles (`ink-soft`, `line`, `surface-raised`,
   feedback tints) are computed with `color-mix()` from the three merchant
   colors so any merchant palette stays coherent.
3. **Spacing scale** `--qc-space-2xs…3xl` (4→88px, ~1.5 modular steps). No
   component invents its own spacing values.
4. **Type**: primary font (body/UI) and display font (headings) via Shopify
   font pickers; fluid clamped scale `--qc-text-s…3xl` readable at 200% zoom;
   headings use display font with authored capitalization preserved (§8.2).
5. **Corner style** merchant setting — Sharp / Soft / Rounded — maps to
   `--qc-radius-control` and `--qc-radius-surface`; `--qc-radius-pill` is
   constant.
6. **Focus**: a single global `:focus-visible` treatment — 2px `ink` outline,
   2px offset — visible on every background the token system can produce;
   components never remove it.
7. **Motion**: `--qc-dur-1/2` + `--qc-ease`; a global
   `prefers-reduced-motion` block collapses durations to 0.
8. **Buttons** `.qc-btn`: primary (accent), outline, and quiet variants;
   ≥44px block size; disabled and `aria-busy` states; icon+label composable.
9. **Fields** `.qc-field`: label above control, optional hint, error message
   rendered as icon + text (never color alone), programmatically associated.
10. **Badges** `.qc-badge`: neutral/ok/warn/danger tones as tinted surfaces;
    meaning always carried by the badge text.
11. **Price primitive** `snippets/qc-price.liquid`: renders regular, sale
    (with struck compare-at and visually-hidden "Regular price"/"Sale price"
    labels), and unit price from a product or variant; all labels via locale
    keys.
12. **Icon primitive** `snippets/qc-icon.liquid`: original 24×24 stroke icon
    set rendered inline, `aria-hidden` by default, optional accessible label.
13. **Shell**: `<main>` landmark with `id` + `tabindex="-1"`, and a skip link
    as the first focusable element; both styled by this system.
14. No hardcoded customer-facing strings; everything added goes through
    `locales/en.default.json` (+ schema locale for setting labels).

## Settings (merchant-facing)
| Setting | Type | Default | Notes |
|---|---|---|---|
| Primary font | font_picker | (Skeleton default) | body & UI |
| Display font | font_picker | same family | headings |
| Background / Foreground | color | existing Skeleton settings | surface / ink |
| Accent | color | #1E4A3C (deep pine) | buttons, links, highlights |
| Corner style | select sharp/soft/rounded | soft | control + surface radii |

## States & edge cases
Zoom 200%; 320px viewport; merchant sets identical fg/bg (derived roles keep
lines/tints visible via color-mix but contrast is merchant responsibility —
documented); RTL via logical properties throughout; reduced motion.

## Accessibility acceptance
Focus ring visible on surface, raised surface, accent, and badge tints in all
three corner styles; button/badge/field text ≥ AA at defaults; skip link
appears on first Tab; price sale state readable by screen reader without
seeing the strikethrough.

## Out of scope
Header/nav rebuild (Phase 3), cart primitives (Phase 1 slice 2+), section
components, presets.
