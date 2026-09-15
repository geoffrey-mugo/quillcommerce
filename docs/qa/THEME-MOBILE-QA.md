# Whole-theme mobile QA sweep

Date: 2026-09-14 · Theme: #149206040653 (live) · 375×812 touch profile
(Android UA). Complements the card-v2 and sticky-header mobile sweeps
(same day); together these cover the full storefront on the current
build. Cart verified restored after every mutation.

## Page-by-page

| Surface | Result |
|---|---|
| Home | PASS — hero image loaded with contained text + 2 CTAs, newsletter row fits (44px input), no horizontal scroll; only sub-40px inputs are compare checkboxes inside 44px labels (the labels are the targets) |
| Collection + facets | PASS — Availability filter: details opens, checkbox + Apply → URL-first `filter.v.availability=1`, 12 results all buyable; Back/Forward both restore states; no wide elements |
| PDP (ski wax) | PASS — thumb tap switches slides (64px thumbs); lightbox opens at the tapped media, fits viewport (post UA-max-width fix), 44px nav, counter advances, closes; plans + pills fit; no h-scroll |
| Cart page | PASS — line fits, 44px qty input, Ajax 1→2→1 with correct subtotals, cart verified restored via /cart.js |
| Search + predictive | PASS — 13 results grid clean; header search dialog fits, typing "parka" returns a formatted-price product suggestion; close unlocks |
| Blog / article | PASS — comment form present and fitting, prose within viewport |
| Content statuses | PASS — /blogs/news, /pages/about-the-outfitter, /collections all 200 with correct h1; unknown route renders the 404 template |
| Footer | PASS — fits, 44px social links, 3 menu links, payment icons within viewport |
| Back to top | PASS — 44px, returns to top |

## Covered by the companion same-day sweeps
Card layout on all 24 collection cards, quick view, quick add → drawer
(full-width after the UA dialog fix), compare tray/dialog, PDP
recommendation strips (CARD-V2-MOBILE-QA.md); sticky header tuck/reveal,
nav-drawer guard, search-dialog interplay, PDP dual-sticky
(STICKY-HEADER-MOBILE-QA.md).

## Defects this sweep
None new — the two earlier sweeps' fixes (UA dialog width, header
disclosure guard) held across every page here.

## Standing environment caveats
Synthetic Escape and programmatic focus are refused by the browser;
real-keyboard spot check remains the one manual item.
