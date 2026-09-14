# SPEC-008 · Predictive search

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 3, slice 2
Provenance: Original QuillCommerce design; Shopify Predictive Search API
(/search/suggest.json) documentation; native dialog semantics.

## Merchant outcome
Shoppers find products, pages, and articles from anywhere in the store in a
couple of keystrokes; no configuration, no app.

## Shopper outcome
Activate search in the header → a dialog opens with the cursor in a labeled
search field. Typing shows grouped suggestions (Products with image+price,
Pages, Articles) plus a "See all results" link. Enter always runs the full
search. Escape returns to the page. Without JavaScript the header icon goes
to the search page — nothing is lost.

## Behavioral requirements
1. The header search control remains a link to `routes.search_url`
   (no-JS baseline); `<qc-search>` upgrades it to open a search dialog.
2. Dialog: native `<dialog scroll-lock>`, server-rendered in the header
   section (strings from locale, form posting GET `q` to the search route —
   Enter submits the full search even before/without suggestions). Close
   button; Escape/backdrop close; focus returns to the header control.
3. Suggestions: on input (debounced ~200ms, in-flight requests aborted),
   fetch `/search/suggest.json` with
   `resources[type]=product,page,article`, limit 4 per type, and render:
   - Products group: linked rows with thumbnail (or placeholder), title,
     price (`money` amounts come from the API's `price` string).
   - Pages and Articles groups: linked title rows.
   - A "See all results for “q”" link to the search page.
   Groups render only when they have results; group headings come from
   locale keys.
4. States: idle hint; loading; results (count announced once via
   `qc:announce` with pluralized string); empty ("No suggestions"); network
   error (quiet fallback message + the see-all link still works).
5. Queries shorter than 2 characters clear results back to the idle hint.
6. Keyboard: field labeled; suggestions are ordinary links reachable with
   Tab; Escape anywhere closes the dialog. (Deliberate design decision: a
   plain link list after the field instead of an aria-activedescendant
   combobox — simpler, fully accessible, and honest to implement well.)
7. Component follows the established pattern: guarded define,
   AbortController cleanup, debounce timer cleared on disconnect; safe in
   the Theme Editor.

## Settings (merchant-facing)
None this slice (a disable toggle can ride the Phase 3 settings pass).

## States & edge cases
Rapid typing (only the last response renders); query cleared; results with
media-less products; very long titles; slow network (loading state persists;
Enter still submits); RTL.

## Accessibility acceptance
Dialog labelled ("Search"); input focused on open; result count announced;
each suggestion is a single link with product title (+ visually ordinary
price text); Escape close returns focus to the header search control.

## Out of scope
Search-page filters (slice 3), query suggestions/spelling corrections,
recent-searches storage.
