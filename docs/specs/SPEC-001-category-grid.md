# SPEC-001 · Category grid section

Status: Approved
Phase: 7 (merchandising) — listed early as the spec-format exemplar
Provenance: QuillCommerce prototype product decision (main branch, sections/qc-category-grid.liquid); no external theme referenced.

## Merchant outcome
Present 3–8 top-level categories on any page as an editable grid, with each
tile sourced either from a collection (image, title, and link auto-derived)
or fully manual (custom image, title, description, link). Usable without any
image assets on day one.

## Shopper outcome
Scan the store's category structure at a glance and reach a category in one
activation from the home page, by pointer, touch, or keyboard.

## Behavioral requirements
1. Section accepts 1–8 category blocks; merchant sets desktop column count (3–6);
   columns collapse responsively (≥2 on small screens) without horizontal scroll.
2. Each block: optional collection reference, optional image override, optional
   title/description/link-label overrides. Explicit values win over derived ones.
3. With no image available, the tile renders an original QuillCommerce
   placeholder treatment (no external artwork) that keeps text contrast ≥ WCAG AA.
4. The whole tile is one link (single tab stop); the link name is the category
   title, not the link-label decoration.
5. Blocks with neither collection nor manual link render as non-interactive
   tiles without dead links.
6. Section heading is optional; when present it uses the theme heading style
   settings and is announced as a heading.
7. Images are responsive (srcset/sizes), lazy below the fold, with fixed aspect
   ratio to prevent layout shift.
8. Theme Editor: adding/reordering/removing blocks re-renders correctly without
   page refresh or duplicate listeners (section has no JS requirement).

## Settings (merchant-facing)
| Setting | Type | Default | Notes |
|---|---|---|---|
| Heading | text | "Shop by category" | optional |
| Desktop columns | range 3–6 | 3 | |
| Color scheme | color_scheme | ground | |
| Block: Collection | collection | — | source for image/title/link |
| Block: Image | image_picker | — | overrides collection image |
| Block: Title / Description / Link label | text | — | overrides |
| Block: Link | url | — | overrides collection URL |

## States & edge cases
Zero blocks (editor placeholder prompt); 1 block (no stretched tile); 8 blocks;
missing images (placeholder treatment); long titles wrap without overflow;
translated labels up to ~2× length; RTL mirrors layout via logical properties.

## Accessibility acceptance
Tiles reachable in DOM order; visible focus ring on the tile; heading level
configurable/appropriate; placeholder tiles convey no false interactivity;
images carry the category title as alt text when meaningful, empty alt when
decorative duplicate of adjacent text.

## Out of scope
Nested taxonomies (see future qc-catalog-navigator spec), product counts, badges.
