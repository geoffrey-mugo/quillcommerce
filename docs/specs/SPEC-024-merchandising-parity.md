# SPEC-024 — Merchandising parity slice (P1 from Empire comparison)

Status: Implemented & verified — 2026-09-15
Source: docs/qa/FULL-REVIEW-2026-09-15.md follow-up; Empire Theme Store
listing features + negative-review mining. Behavioral requirements only;
all code original.

## 1. Color swatches

- Variant picker (pills mode): when an option value carries Shopify's
  taxonomy `swatch` drop (color or image), the pill renders a swatch
  chip before the value text. No swatch data → unchanged text pill.
  Radio/input semantics identical to plain pills; qc-product.js needs
  no changes.
- Product card: when a product option has swatch values, the card shows
  up to 4 non-interactive swatch dots + "+N" overflow, linking with the
  card. Card layout and uniform-height rules unchanged.
- Merchant setup = product category Color metafield (documented in the
  merchant guide).

## 2. Slideshow section (qc-slideshow)

- Blocks: up to 5 slides — image, heading, subheading, CTA label+link,
  text alignment. Section: height (like hero), autoplay off/3-8s,
  heading level (H1 on exactly one home section, mirroring qc-hero).
- No-JS: CSS scroll-snap track — every slide reachable by swipe/scroll.
- JS enhancement (custom element, own asset): prev/next buttons, dot
  indicators, optional autoplay that pauses on hover/focus-within and
  never runs under prefers-reduced-motion; loops.
- A11y: region + accessible name, labeled controls, dots reflect
  current slide via aria-current.

## 3. Mega menu (header)

- Header setting `desktop_menu_style`: dropdown (default, current
  behavior) | mega. Mega: a top-level item with children opens a
  full-width panel; second-level links render as column headings with
  their third-level links beneath. Same disclosure semantics/JS
  (sibling-close, Escape, outside-click) as today; mobile drawer nav
  unchanged.

## 4. Card hover image

- Theme setting `enable_card_hover_image` (Catalog group, default on):
  cards with a second media show it on hover/focus-visible, fading with
  motion tokens; lazy-loaded; disabled under prefers-reduced-motion
  (no functional loss — decorative).

## 5. FAQ section (qc-faq)

- Heading + question blocks (question text, rich-text answer) rendered
  as native details/summary accordions in qc-disclosure styling.
- Emits FAQPage JSON-LD for rich results.
- Addable to any page; preset provided.

## Definition of done

Theme Check clean, provenance scan clean, pushed to #149206040653,
each feature live-verified (swatch fallback path at minimum, slideshow
keyboard/scroll behavior, mega menu open/close, hover image, FAQ
render + valid JSON-LD), merchant guide updated.
