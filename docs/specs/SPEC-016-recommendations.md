# SPEC-016 · Product page: related & complementary products

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE4-SLICE6-VERIFICATION.md; complementary render structural pending an S&D pairing fixture)
Phase: 4, slice 6 (final)
Provenance: Original QuillCommerce design; Shopify Product
Recommendations API (`routes.product_recommendations_url`, `intent`
parameter, `recommendations` Liquid object), Search & Discovery
complementary pairings.

## Merchant outcome
Product pages surface algorithmic "You may also like" products with zero
configuration, and Search & Discovery "Pairs well with" pairings where
the merchant has set them — as ordinary sections they can reorder,
retitle, relimit, or remove per template.

## Shopper outcome
Discover related items and curated pairings below the product, presented
as the same product cards used everywhere (quick add included), without
layout shift from empty placeholders.

## Behavioral requirements
1. **Section** `sections/qc-recommendations.liquid`, addable only on the
   product template, instantiable multiple times (one per intent).
   Settings: heading (text), intent (`related` | `complementary`),
   limit (range 2–8, default 4).
2. **Two-phase render**: on the normal page request
   (`recommendations.performed` false) the section emits only a
   `<qc-recommendations>` placeholder carrying the fetch URL
   (`product_recommendations_url` + `section_id` + `product_id` +
   `limit` + `intent`); the element fetches it and replaces itself with
   the returned content. The same section rendered by that request
   (`performed` true) emits the real markup: labeled `<section>` with
   the heading and a `qc-product-grid` of the canonical
   `qc-product-card` snippet — or nothing at all when the API returns
   no products. No JS → placeholder renders nothing (supplementary
   content; documented baseline).
3. **Consistency**: cards are the shared snippet, so quick add /
   quick view / sold-out badging behave exactly as on collection pages
   (custom elements upgrade after insertion).
4. **Resilience**: fetch failure or empty response leaves nothing behind
   (placeholder removed, no error surface); in-flight fetch aborted on
   disconnect.
5. **Template defaults**: product template ships a `complementary`
   instance ("Pairs well with") above a `related` instance
   ("You may also like"), after the main section.
6. All strings via settings/locale keys; tokens-only styling.

## Settings (merchant-facing)
| Setting | Type | Default |
|---|---|---|
| Heading | text | You may also like |
| Recommendation type | select related / complementary | related |
| Maximum products | range 2–8 | 4 |

## States & edge cases
No recommendations available (nothing renders — related on a tiny
catalog may still return same-collection items); complementary without
S&D pairings for the product (empty → nothing); JS off (nothing);
editor preview on a product template (renders via section rendering
with product context); non-product context (placeholder suppressed —
`enabled_on` restricts to the product template anyway).

## Accessibility acceptance
Each rendered block is a `<section>` labeled by its heading; cards keep
their existing accessible structure; injected content is inert markup
(no focus stealing, no announcement — supplementary content appearing
during load).

## Out of scope
Recently-viewed / compare (Phase 5 roadmap), cart cross-sells, S&D
pairing administration (merchant task; a dev-store pairing is created
only as a test fixture).
