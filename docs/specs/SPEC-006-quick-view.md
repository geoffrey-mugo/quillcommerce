# SPEC-006 · Quick-view dialog (multi-variant quick buying)

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 2, slice 2
Provenance: Original QuillCommerce design; Shopify Section Rendering API
docs; native <dialog> platform semantics.

## Merchant outcome
Shoppers can buy multi-variant products from any card without leaving the
page, raising conversion on dense grids with zero merchant configuration.

## Shopper outcome
Activate "Choose options" on a card → a dialog opens with the product's
image, title, price, variant chooser, quantity, and Add to cart. Choose,
add, hear confirmation, keep browsing — or Escape/close back to exactly
where they were. Without JavaScript the same control navigates to the
product page.

## Behavioral requirements
1. The card's multi-variant control remains an `<a>` to the product URL
   (no-JS baseline); `<qc-quick-view>` upgrades it to open the dialog.
2. One lazily created, shared native `<dialog scroll-lock>` per page;
   `showModal()` provides focus containment and Escape; page scroll locks
   via Skeleton's `dialog[scroll-lock][open]` rule; closing returns focus
   to the triggering control.
3. Content is fetched from the product URL with
   `?section_id=qc-quick-view` (Section Rendering API). The
   `qc-quick-view` section renders: media (or placeholder), title (labels
   the dialog), price primitive, variant select (unavailable options
   disabled + suffixed), quantity field, Add to cart inside
   `<qc-product-form>` (SPEC-005 behavior applies unchanged: busy state,
   errors, `qc:cart-updated`, announcement), and a "View full details"
   link to the product page. The section has no presets (not addable in
   the editor).
4. States: loading (dialog opens immediately with an announced loading
   message), error (message + "View full details" fallback link), loaded.
   Fetches are abortable; reopening supersedes any in-flight fetch.
5. A visible close button (accessible name from locale) is the first
   focusable element; heading receives `id` for `aria-labelledby`.
6. Successful add keeps the dialog open (shopper may add more); the live
   count and announcement provide feedback.
7. Guarded element definition; all listeners bound in `connectedCallback`
   with an AbortController and removed on `disconnectedCallback`; safe
   across Theme Editor section reloads.
8. All strings via locale keys. Dialog styles live in the foundation
   stylesheet (shared component).

## Settings (merchant-facing)
None.

## States & edge cases
Product becomes unavailable between render and open (section renders
sold-out state); slow network (loading state persists, Escape always
works); double activation (single dialog, superseding fetch); deep product
URLs with locale prefixes (uses the card's own product URL verbatim).

## Accessibility acceptance
Focus moves into the dialog on open and back to the opener on close;
Escape closes; dialog labelled by product title (loading label meanwhile);
variant select and quantity labeled; add feedback announced via the
SPEC-005 live region; backdrop click closes (platform behavior with
explicit close handler).

## Out of scope
Variant-media sync, selling-plan pickers, full gallery (Phase 4 quick-view
upgrades); cart drawer (Phase 5).
