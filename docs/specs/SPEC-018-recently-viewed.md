# SPEC-018 · Recently viewed products

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE5-SLICE2-VERIFICATION.md)
Phase: 5, slice 2
Provenance: Original QuillCommerce design; Shopify storefront search
field queries (`id:` OR chains) + Section Rendering API; browser
localStorage.

## Merchant outcome
A zero-configuration "Recently viewed" strip that merchants can place on
the product template (shipped there by default) or any other template,
with heading and count settings. No apps, no server state.

## Shopper outcome
Products you opened recently follow you as ordinary product cards
(quick add included), newest first, never including the product you are
currently on. Private per browser; nothing renders until you have a
history, and nothing renders without JavaScript.

## Behavioral requirements
1. **Recording**: every product page view stores `{id, handle}` at the
   head of a localStorage list (`qc:recently-viewed`), deduplicated,
   capped at 12. All storage access is try/catch-guarded (private
   windows, blocked storage) and failure is silent.
2. **Section** (`sections/qc-recently-viewed.liquid`, presets, any
   template): on a normal request renders only a `<qc-recently-viewed>`
   placeholder (search-url, section id, limit, current product id to
   exclude). The element reads the stored list, drops the excluded id,
   truncates to the limit, and — if anything remains — fetches
   `search_url?section_id=<id>&type=product&q=id:A OR id:B…`. The same
   section rendered in that search context (`search.performed`) emits
   the real markup: labeled section, heading, `qc-product-grid` of
   canonical `qc-product-card`s (products only).
3. **Order**: search relevance order is replaced client-side — cards are
   reordered to the stored most-recent-first order by handle before the
   swap.
4. **Emptiness**: no history, storage unavailable, all entries excluded,
   fetch failure, or an empty result → the placeholder removes itself;
   no markup, no error. Products deleted since viewing simply drop out
   (search returns what exists).
5. **Consistency**: cards are the shared snippet; quick add / sold-out
   badging behave as everywhere (custom elements upgrade after
   insertion). The `.qc-recs` presentation styles move to the global
   stylesheet so recommendations and recently-viewed share them on any
   template (same scoped-CSS lesson as SPEC-017).
6. All strings via settings/locale keys; tokens-only styling; guarded
   element with silent failure paths.

## Settings (merchant-facing)
| Setting | Type | Default |
|---|---|---|
| Heading | text | Recently viewed |
| Maximum products | range 2–8 | 4 |

## States & edge cases
First-ever visit (nothing); visiting the only product in history (all
excluded → nothing); deleted/unpublished products (dropped by search);
storage cleared mid-session; duplicate visits (deduped to head);
non-product search results (filtered by `object_type`); JS off
(nothing).

## Accessibility acceptance
Rendered block is a labeled `<section>`; cards keep their accessible
structure; injected content steals no focus and announces nothing
(supplementary, appears during load).

## Out of scope
Compare (next slice), cross-device history, personalization beyond the
local list.
