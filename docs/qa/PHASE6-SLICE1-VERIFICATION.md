# Phase 6 · Slice 1 verification — SPEC-020 merchandising sections I

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev

## Results (live, home template)

| Check | Result |
|---|---|
| Composition | PASS — home renders qc-hero → qc-rich-text → qc-featured-collection → qc-catalog-navigator → qc-iwt in template order; Skeleton demo sections (hello-world, custom-section) deleted from the theme and dev theme (push without --nodelete) |
| Hero | PASS — no-image surface fallback, heading + subheading + two CTAs with correct hrefs (/collections/all, /pages/about); image path (2400px cover, overlay var, inverted ink) structural — no store imagery |
| Heading hierarchy | PASS — hero renders the page's only h1 via the new "Use as page heading" setting; all other section headings are h2 |
| Rich text | PASS — centered variant, measure-width prose |
| Featured collection | PASS — "Featured gear" from the 11-product automated collection, 4 canonical cards (quick-add/compare toggles live), View all link with SR suffix; empty-collection case observed first-hand (frontpage, 0 products → heading with no cards) before the fixture switch; unset-collection editor hint structural |
| Image with text | PASS — image-end order on desktop grid, placeholder treatment, heading/prose/CTA |
| No-JS | By construction — all four sections are pure Liquid |

## Provenance
D-005 recorded: Skeleton demo sections retired; home now composed of
original QuillCommerce sections. Scan: clean.

## Gates
Theme Check: 56 files, 0 offenses. Pushed to #149206040653.

## Known gaps
- Hero/image-with-text with real imagery (store has no uploadable brand
  images) — structural; overlay contrast should be spot-checked when a
  real image lands.
- Editor add/reorder of the new presets rides on the carried Theme
  Editor walkthrough.
