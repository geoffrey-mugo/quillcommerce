# SPEC-014 · Product page: pickup availability & disclosures

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE4-SLICE4-VERIFICATION.md; pickup content structural pending store fixture)
Phase: 4, slice 4
Provenance: Original QuillCommerce design; Shopify `store_availability`
object, Section Rendering API, and section-block conventions.

## Merchant outcome
Stores with local pickup show live per-variant pickup status with zero
theme configuration; merchants add collapsible information rows
(shipping, care, sizing) to product pages from the editor, each fed by
rich text and/or an existing page.

## Shopper outcome
See at a glance whether the shown variant can be picked up, where, and
how soon, with a disclosure listing every location and its status —
updated when the variant changes. Read supplementary product information
in collapsible rows that work with keyboard, screen reader, and no JS.

## Behavioral requirements
1. **Pickup snippet** (`snippets/qc-pickup.liquid`, variant-scoped):
   renders from `variant.store_availabilities` filtered to
   pickup-enabled locations. Empty (no markup) when the store exposes
   none — the feature is invisible on stores without local pickup.
   - Summary line from the first pickup-enabled availability: available
     → "Pickup available at <location>" plus the platform's
     `pick_up_time`; not available → "Pickup currently unavailable at
     <location>". Status is icon + text, never color alone.
   - A native `<details>` ("Check other locations", locale key) lists
     every pickup-enabled location: name, street/city, and its
     availability for this variant.
2. **Re-fetch section** (`sections/qc-pickup-availability.liquid`): a
   presetless section (not addable in the editor) that renders the same
   snippet for `product.selected_or_first_available_variant` — the
   Section Rendering API endpoint. The product section renders the
   snippet inline (initial state) inside a `[data-qc-pickup]` container.
3. **Variant sync**: on variant change, `<qc-product-page>` fetches
   `<product url>?section_id=qc-pickup-availability&variant=<id>` and
   replaces the container's content (stale responses discarded via an
   aborted in-flight fetch; container untouched on fetch failure). No
   variant resolved → container emptied.
4. **Disclosures**: the product section accepts `disclosure` blocks
   (heading text + rich-text content + optional page whose content is
   appended). Each renders as a native `<details class="qc-disclosure">`
   with the heading in `<summary>` (44px min target, chevron indicator
   rotating when open) — below the description. Blocks carry
   `shopify_attributes` for editor support; no blocks → no wrapper
   markup. No JS involved.
5. All strings via locale keys; tokens-only styling; SPEC-011/012/013
   behaviors unchanged.

## Settings (merchant-facing)
Disclosure block: Heading (text), Content (richtext), Page (page).
No section-level settings added.

## States & edge cases
Store without local pickup (nothing renders — expected dev-store state
unless pickup is enabled on Shop location); variant unavailable at some
locations; variant switch to sold-out variant (availabilities still
render per platform data); fetch failure (previous content kept);
disclosure with only a page, only rich text, or both; empty heading
(block still renders summary from empty string — merchant task).

## Accessibility acceptance
Pickup status readable as text; locations list inside a labeled native
disclosure; disclosure rows are native details/summary (keyboard + SR
for free); chevrons are `aria-hidden`; no focus disruption on pickup
re-fetch (container never holds focus).

## Out of scope
Gift recipient, sticky buy bar, complementary/related, pickup-location
maps or inventory counts (later slices / not planned).
