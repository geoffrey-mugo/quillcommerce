# SPEC-010 · Phase 3 completion sweep

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 3, slice 4 (final)
Provenance: Original QuillCommerce design; Shopify docs (localization form,
filter value swatches, linklists, structured-data guidelines).

Covers six small capabilities that close Phase 3. Each is independently
testable; shared acceptance: locale-keyed strings, tokens-only styling,
no-JS baselines, guarded/cleaned-up JS.

## A. Breadcrumbs
- `snippets/qc-breadcrumbs.liquid` renders a labeled `<nav>` ordered list:
  Home → context → current (current is plain text with `aria-current`).
  Contexts: collection page (Home / title); product (Home / collection when
  the product is viewed in a collection context, else Home / Products);
  page (Home / title); article (Home / blog / title).
- Emits BreadcrumbList JSON-LD matching exactly the visible trail.
- Rendered at the top of collection, product, page, and article sections.

## B. Utility bar
- New `qc-utility-bar` section for the header group: optional message,
  optional link (text+URL), and Shopify localization selectors
  (country/currency and language) rendered from `localization` via
  `{% form 'localization' %}` selects — each shown only when more than one
  option exists. Submit button per form (no-JS); auto-submit on change via
  the shared `<qc-auto-form>` element.
- Quiet presentation: single slim row, ink-soft text, no wrap overflow.

## C. Catalog navigator
- New `qc-catalog-navigator` section (SPEC-001's concept delivered on
  Skeleton): blocks each reference a collection with optional title/image
  overrides; section settings: heading, layout (tiles | list), show product
  counts; tiles show image (or original placeholder treatment) + title
  (+ count); list mode is a compact multi-column link list. Zero-block
  state shows an editor hint (nothing on storefront). Presets so it's
  addable in the editor.

## D. Filter swatches
- In `qc-facets`, when a filter value exposes `value.swatch`
  (color or image), render a swatch chip before the label — label text
  always remains (never color alone); active state ring; disabled at zero
  count as before. Absent swatch data renders exactly as today.

## E. Grid density
- Collection section setting "Grid density": comfortable (min 220px) |
  dense (min 168px), driving `--qc-card-min` consumed by
  `.qc-product-grid`. Default comfortable.

## F. Back to top
- `<qc-back-to-top>` in the layout: hidden until scroll passes ~2
  viewports; button labeled from locale; activates `#qc-main` focus and
  scrolls to top (instant under reduced motion); does not overlap the
  sticky header's space; 44px target.

## Verification targets (dev store)
Breadcrumbs on /collections/all, a product via collection path, About page,
Field Notes article (+ JSON-LD present). Utility bar message renders;
selectors hidden (single-locale store) — behavior documented. Navigator on
the home template with the three existing collections in both layouts.
Density toggle via setting change (structural check). Back-to-top appears
after scroll and returns focus/top.
