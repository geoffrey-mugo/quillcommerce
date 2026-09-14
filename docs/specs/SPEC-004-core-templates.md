# SPEC-004 · Core template presentation & canonical product card (v1)

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 1 (foundation), slice 3
Provenance: Original QuillCommerce design; Shopify template docs. Card
concept continues QuillCommerce prototype product decisions (no external
theme referenced).

## Merchant outcome
Every core template — collection, list-collections, search, blog, article,
page, 404, password — presents content in the QuillCommerce design system
with no configuration, so a bare store already looks like the product.

## Shopper outcome
Browse a collection of any size, search across products/pages/articles,
read blog content, and recover from a 404 — on any device, keyboard-only,
without JavaScript.

## Behavioral requirements
1. **Canonical product card** `snippets/qc-product-card.liquid` (v1) — the
   single card used by collection, search, and (later) recommendations and
   merchandising sections. Renders: linked square image with responsive
   sizes and an original placeholder treatment when media is missing;
   product title; price via `qc-price` (sale + unit states); a "Sold out"
   badge when unavailable. One link wrapping media+title (single tab stop);
   price/badge outside the link text. Carries `data-qc-product-card`
   (handle) for Phase 2 enhancement. Params: `product`, optional
   `show_vendor`.
2. **Collection**: title + optional description (measure-limited);
   responsive card grid (auto-fill, min 220px); empty-collection state with
   message; pagination via `default_pagination` wrapped in a styled,
   labeled `<nav>`.
3. **Search**: labeled search field + primary submit as a composed form
   row; result count/no-result messaging; product results use the canonical
   card; page/article results render as list rows with a type badge
   (Products/Pages/Articles strings from locale); pagination as in #2.
4. **Blog**: article cards (image when present, title link, date/author
   meta, excerpt) in a single-column reading list with measure; pagination.
5. **Article**: content constrained to `--qc-measure`; image treated as
   lead media; comments list and comment form rebuilt on `.qc-field` /
   `.qc-btn`; form errors shown above fields.
6. **Page**: prose container at measure width.
7. **404**: heading, message, primary button back to catalog.
8. **Password page**: centered card with shop name, message, labeled
   password field + primary submit, errors above field. (The password field
   is Shopify's storefront gate form rendered as-is; the theme only styles
   it.)
9. Pagination styling is one shared component class (`.qc-pagination`)
   in the foundation stylesheet, wrapping `default_pagination` output.
10. All new strings via locale keys; no hardcoded routes; every image via
    the responsive image snippet with dimensions.

## Settings (merchant-facing)
None new this slice (grid density and card options arrive with Phase 3).

## States & edge cases
Empty collection; 1 product; long titles (two-line clamp with full title as
accessible name); products without media; search with zero results; blog
with no image articles; article without comments; password store message
absent.

## Accessibility acceptance
Cards expose exactly one tab stop each with the product title as the
accessible name; pagination is a labeled nav; search input labeled; comment
form fields labeled with visible labels; 404/password focus order sane.

## Out of scope
Filters, sorting, grid density, quick add (Phases 2–3); blog/article
editorial options (Phase 7).
