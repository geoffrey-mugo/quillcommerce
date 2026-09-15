# SPEC-019 · Product compare

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE5-SLICE3-VERIFICATION.md)
Phase: 5, slice 3 (final)
Provenance: Original QuillCommerce design; Shopify storefront search
`id:` queries + Section Rendering API (SPEC-018 technique); browser
localStorage; native `<dialog>`.

## Merchant outcome
A switchable (on by default) compare feature with zero configuration:
shoppers mark products on any card surface and get a side-by-side
attribute table. No apps, no server state.

## Shopper outcome
Tick "Compare" on up to four product cards anywhere (collections,
search, recommendations, recently viewed); a small tray tracks the
count and survives navigation; one tap opens a side-by-side table —
image, title, price, availability, type, vendor, and options — scrolled
horizontally on small screens. Clear resets everything. Selections are
private to the browser; without JavaScript the feature is simply absent.

## Behavioral requirements
1. **Setting**: `enable_compare` (checkbox, default on) in a new
   Catalog group of theme settings; off renders no toggles, tray, or
   scripts.
2. **Card toggle**: the canonical card gains a labeled "Compare"
   checkbox carrying the product's id/handle/title, shipped `hidden`
   (no-JS shows nothing) and revealed by JS. State changes are handled
   by document-level delegation, so cards injected later
   (recommendations, recently viewed, facet re-renders) work without
   their own wiring; a MutationObserver reveals and syncs checkboxes on
   injected cards to the stored selection.
3. **Storage**: `qc:compare` — `[{id, handle}]`, capped at 4. Adding at
   the cap reverts the checkbox and announces the "full" message;
   add/remove announce themselves. Every change dispatches
   `qc:compare-updated`, updates all checkboxes, and re-renders the
   tray.
4. **Tray** (`<qc-compare-tray>`, layout-rendered): a fixed bottom
   inline-start bar, hidden when the selection is empty, with a
   "Compare (n)" button and a "Clear" button. It respects
   `--qc-sticky-offset` (never collides with the PDP sticky bar).
   Clear empties storage, unchecks every toggle, hides the tray, and
   announces.
5. **Compare view**: the tray button opens a native `<dialog
   scroll-lock>`; content is fetched fresh each open from
   `search_url?section_id=qc-compare&type=product&q=id:…`. The
   `sections/qc-compare.liquid` render (`search.performed`) emits an
   accessible `<table>`: column headers are the product cards' image +
   linked title; row headers are Price (range-aware), Availability,
   Type, Vendor, and Options (name: values). Empty cells render an em
   dash. The table sits in an `overflow-x` wrapper; column order is the
   API's (comparison is order-independent — documented). Close via
   button, Escape, backdrop; native focus restore.
6. **Resilience**: storage guarded by try/catch; fetch failure shows
   the dialog's localized error line; deleted products drop out of the
   search result (and remain harmlessly in storage until cleared).
7. All strings via locale keys; tokens-only styling; guarded elements
   with AbortController cleanup.

## Settings (merchant-facing)
| Setting | Type | Default |
|---|---|---|
| Enable product compare | checkbox | true |

## States & edge cases
Empty selection (no tray); one product (table with one column — still
useful, allowed); cap reached (revert + announce); products with no
type/vendor/options (dashes); selection surviving navigation; injected
cards reflecting existing selections; storage unavailable (feature
absent); JS off (nothing renders).

## Accessibility acceptance
Toggles are real labeled checkboxes; tray buttons ≥44px and labeled
with the live count; dialog labeled with scroll lock and native focus
handling; the table uses scope'd row/column headers; announcements on
add, remove, full, and clear.

## Out of scope
Cross-device selections, attribute customization, metafield rows,
per-variant comparison.
