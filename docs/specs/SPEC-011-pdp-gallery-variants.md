# SPEC-011 · Product page: media gallery & variant synchronization

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE4-SLICE1-VERIFICATION.md)
Phase: 4, slice 1
Provenance: Original QuillCommerce design; Shopify product/media/variant
Liquid objects and URL conventions.

## Merchant outcome
Product pages present every media type, and variant selection behaves
correctly for any option structure — including partially unavailable
combinations — with zero configuration.

## Shopper outcome
Browse all product media via thumbnails; pick options as labeled pill
groups; watch price, availability, SKU, stock status, media, and the URL
stay in sync; share the URL and land on the same variant; buy — all with
keyboard alone, and with a working fallback when JavaScript is off.

## Behavioral requirements
1. **Gallery** `<qc-gallery>`: main viewport + thumbnail buttons (one per
   media item, ≥44px, labeled "Media n of N"). Supports image, video,
   external_video, and model media via Shopify's media rendering; only the
   active media is shown; mixed aspect ratios are contained (no layout
   shift). Thumbnails are keyboard buttons; the strip scrolls, never crops
   focus. Hidden entirely for single-media products (main image only).
2. **Variant picker**: one `fieldset` per product option
   (`options_with_values`), `legend` = option name, values as radio pills
   showing selected state. A variant-data JSON script (id, options,
   available, price, compare_at_price, sku, inventory qty/managed,
   featured_media id) feeds the component.
3. **Synchronization** on option change (`<qc-product-page>`):
   - resolve the matching variant; update the form's variant id;
   - price block re-renders (money format from settings; sale state keeps
     its SR labels);
   - buy button text/disabled reflects availability ("Add to cart" /
     "Sold out" / "Unavailable" for nonexistent combinations);
   - SKU line updates (hidden when empty);
   - stock status updates: In stock / Low stock (≤ threshold setting,
     default 10, shown with count) / Sold out — icon + text, never color
     alone;
   - the variant's featured media becomes active in the gallery without
     removing access to other media;
   - URL updates via `history.replaceState` (`?variant=`), so sharing and
     refresh land on the same variant (server honors it via
     `selected_or_first_available_variant`).
4. **Unavailable options**: pill labels for values that lead to no
   available variant given the other current selections are marked
   (struck style + visually-hidden "unavailable"); still selectable
   (selection shows the honest Sold out / Unavailable state).
5. **No-JS baseline**: the Phase 1 labeled `<select name="id">` (variant —
   price, sold-out suffix) remains and is the only picker without JS; the
   pill fieldsets are `hidden` until the component upgrades them and hides
   the select (label retained for AT via the fieldsets).
6. Quantity, payment button, and qc-product-form behavior are unchanged.
7. All strings via locale keys; low-stock threshold is a section setting.

## Settings (merchant-facing)
| Setting | Type | Default |
|---|---|---|
| Low-stock threshold | range 0–20 (0 = never show low stock) | 10 |

## States & edge cases
1-option and multi-option products; combination with no variant; sold-out
variant preselected via deep link; media-less product; video/model media
(structural — no such media on dev store); price-varying variants (gift
card denominations); reduced motion (no scroll animations).

## Accessibility acceptance
Pills are real radios in labeled fieldsets; state changes announced via
the existing live region ("<variant title> — <availability>"); gallery
thumbs labeled and focus-visible; URL updates never steal focus.

## Out of scope
Zoom/lightbox (slice 2), selling plans/pickup/pre-order/sticky bar (later
slices), quick-view upgrade.
