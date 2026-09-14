# SPEC-009 · Faceted filtering & sorting

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 3, slice 3
Provenance: Original QuillCommerce design; Shopify Storefront Filtering
(collection.filters / search.filters) and sorting docs.

## Merchant outcome
Filters configured in Shopify Search & Discovery appear automatically on
collection and search pages; sorting works everywhere with no setup.

## Shopper outcome
Narrow a catalog by availability, price, type, vendor, options, or
metafields; sort results; share the URL and get the same view back; use
the browser Back button and land exactly where they were — with or without
JavaScript.

## Behavioral requirements
1. **Architecture: URL-first.** All facet and sort state lives in the URL
   via one GET form using Shopify's own `param_name`s. Applying filters is
   a normal navigation — shareable links and history restoration are
   platform-guaranteed, not scripted. (An Ajax section-rendering
   enhancement may come later; it must not change this contract.)
2. One reusable snippet `qc-facets.liquid` renders, for a given `results`
   object (collection or search):
   - **Sort** select from `results.sort_options`, current value selected.
   - Each filter as a native `details` group (open when it has active
     values): `list`/`boolean` filters as labeled checkboxes with counts
     (disabled at zero results); `price_range` as labeled min/max numeric
     inputs with the collection's range as placeholders.
   - **Active-filter chips**: one removal link per active value
     (`url_to_remove`) plus "Clear all" (`results.url`); chips appear above
     results on all viewports.
   - Apply button (JS auto-submits on change; button remains for no-JS and
     as an explicit affordance).
3. Search page reuses the same snippet and preserves the query (`q` as a
   hidden input).
4. Layout: filters render in a `details` disclosure ("Filters") on small
   screens and as an open sidebar column ≥990px; result count shown above
   the grid (pluralized locale string).
5. Empty filtered results show the no-results state with a "Clear all"
   action.
6. When a store has no configured filters, only Sort renders — no empty
   chrome.
7. JS (`qc-facets.js`): submit-on-change only (form.requestSubmit on
   `change`), guarded define, listener cleanup; nothing else.
8. All strings via locale keys.

## Settings (merchant-facing)
None this slice (grid density and filter layout options ride a later pass).

## States & edge cases
No filters configured; one filter; filters + search query; zero-result
combinations; price inputs partially filled; values with zero count;
Back/Forward through several filter states; RTL.

## Accessibility acceptance
Each group is a native disclosure with visible state; every checkbox and
price input labeled; chips are links named "Remove filter: <label>";
result count in a status region; sort select labeled; keyboard-only apply
via the button.

## Out of scope
Ajax/partial-update filtering, swatch visual filters, grid density,
breadcrumbs.
