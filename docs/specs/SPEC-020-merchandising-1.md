# SPEC-020 · Merchandising sections I: hero, rich text, image-with-text, featured collection

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE6-SLICE1-VERIFICATION.md)
Phase: 6, slice 1
Provenance: Original QuillCommerce design; Shopify section/preset
conventions and image_url/image_tag rendering.

## Merchant outcome
The storefront-building basics: compose a home page (or any template)
from a hero banner, editorial rich text, alternating image-with-text
rows, and product strips from any collection — all pure sections with
presets, no code. The Skeleton demo sections (hello-world,
custom-section) are retired and the home template recomposed from the
new set.

## Shopper outcome
A fast, coherent landing experience: a legible hero with working CTAs,
readable editorial blocks, image/text stories, and shoppable product
strips using the same cards (quick add, compare) as everywhere else.
Everything renders server-side — no JavaScript involved.

## Behavioral requirements
1. **qc-hero**: optional background image (2000px, art-directed cover)
   or plain raised-surface fallback; settings: heading, subheading
   (textarea), up to two CTAs (label+link each; second rendered
   outline), content alignment (start/center), section height (small /
   medium / large via min-block-size), overlay strength (range 0–80%,
   only over an image) for text contrast — text over an image is always
   inverted ink on the overlay. The heading is an `<h2>` (pages keep a
   single h1); the image is decorative (`alt` empty, text carries the
   message).
2. **qc-rich-text**: settings: heading, richtext body, optional CTA
   (label+link), alignment (start/center); measure-width prose.
3. **qc-image-with-text**: image (or placeholder treatment), heading,
   richtext body, optional CTA, image position (start/end) — two-column
   ≥750px, stacked below; image aspect 4:3, covered.
4. **qc-featured-collection**: settings: heading (defaults to the
   collection title when blank), collection picker, products limit
   (range 2–12, default 4), "View all" toggle linking to the
   collection. Renders the canonical `qc-product-card` grid (shared
   `.qc-product-grid`); nothing at all when no collection is chosen
   except an editor-only hint.
5. **Composition**: index.json recomposed — hero, rich text, featured
   collection, catalog navigator (existing), image-with-text — with
   original fixture copy; `hello-world.liquid` and
   `custom-section.liquid` deleted (Skeleton demo content; recorded in
   the provenance ledger).
6. All four sections: presets (addable anywhere), `{{ section.settings }}`
   only (no blocks this slice), locale-keyed schema labels, tokens-only
   styling in their own `{% stylesheet %}` scopes, shared page-margin
   layout via the existing container conventions.

## Settings (merchant-facing)
Per section as listed above; defaults produce a sensible block with no
merchant input (placeholder treatments, fixture-free).

## States & edge cases
Hero without image (surface fallback, overlay ignored); hero with one
or zero CTAs; empty heading/body (element omitted, no empty tags);
featured collection unset (editor hint only) or with fewer products
than the limit; image-with-text without image (placeholder); blocks of
text with links inside richtext (inherit link styles).

## Accessibility acceptance
Section headings are h2; CTAs are real links ≥44px; hero text contrast
guaranteed by the overlay + inverted ink; decorative images carry empty
alt; no motion introduced.

## Out of scope
Newsletter, multi-column, footer enrichment (slice 2); video hero;
slideshow.
