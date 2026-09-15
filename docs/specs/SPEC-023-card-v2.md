# SPEC-023 · Canonical product card v2 (boxed)

Status: Implemented (verified 2026-09-14 live on saasquill-app-dev)
Phase: post-qualification design revision (merchant direction)
Provenance: Original QuillCommerce implementation of a merchant-supplied
layout reference (screenshot of their existing store's card): everything
inside one bounding box.

## Direction
The merchant wants the card contained in a single bounded box, ordered:
compare toggle → image → price → title → a two-button action row
(Quick view + Add to cart). This revises SPEC-004's card v1 layout; all
behavior contracts (quick add, quick view, compare, sold-out badging,
shared usage across collection/search/recommendations/recently-viewed)
carry over unchanged.

## Requirements
1. **One bounding box**: the `<article>` carries border, surface
   background, radius, and inner padding; the media no longer draws its
   own box (image keeps its radius inside the card).
2. **Order**: compare toggle (when enabled) at the top; media (linked,
   `tabindex="-1" aria-hidden` — the title is the accessible link);
   price row (price enlarged to `--qc-text-l`); linked title; actions
   row.
3. **Sold-out treatment** (second merchant reference): a solid ink
   label reading "Sold out" overlaid on the image's bottom-left corner
   (inverted text — never color alone, the text is the meaning), plus
   the Add-to-cart slot rendered as a grey disabled "Sold out" button.
   The label is aria-hidden (the disabled button announces the state);
   no badge beside the price anymore.
4. **Actions row** (always present):
   - **Quick view** — an ink-filled button (`.qc-btn--ink`, new
     foundation modifier) opening the existing quick-view dialog;
     no-JS falls through to the product page.
   - **Add to cart** — accent button. Single-variant available
     products: the existing direct quick-add form. Multi-variant
     available products: opens the quick-view dialog to pick options
     (the merchant's originally requested behavior); no-JS falls
     through to the product page. Sold out: disabled button labeled
     Sold out.
   - Buttons share a responsive grid (side-by-side, wrapping to
     stacked when narrow); 44px targets.
5. Vendor line (optional) stays above the title. All strings locale-
   keyed; tokens-only styling; the card remains the single shared
   snippet everywhere.

## Accessibility
Title link is the card's accessible entry; media link hidden from the
tab order; both action buttons carry visually-hidden product-name
suffixes; disabled sold-out button is announced via its text.
