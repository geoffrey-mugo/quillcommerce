# Pass 4 — Performance, loading & storefront efficiency — 2026-09-16

Measured on the live dev theme (desktop + 375px emulation) before and
after changes. Builds on the earlier perf pass (quick-view intent
prefetch + session memoisation, facets in-place swap, dead-code sweep).

## Baseline measurements

- JS: 13 modules, ~66 KB unminified total (CDN minifies), every one
  `type="module"` (deferred), section-scoped or settings-gated; zero
  third-party libraries. CSS: critical 1 KB + foundation 20 KB +
  compiled section styles 42 KB.
- DOM: 664 nodes (home), 1,325 (24-card collection), 594 (product).
- CLS 0.0000 on home and product; TTFB ~91 ms; LCP ~1.0 s warm.
- Fonts: 3 woff2 files (primary n4 + n7, display n4); italic faces
  declared but never downloaded unless used; base preloaded;
  font-display swap.
- Variants JSON 2.6 KB on the richest product. HTML 119–126 KB
  decoded / ~32 KB wire.

## Optimization performed: responsive `sizes`

The one systemic gap: every image shipped a srcset but no `sizes`
attribute, so browsers assumed 100vw and picked oversized candidates
— worst on the mobile 2-col grid (144 px cards × DPR 2 needs 287 px;
the 600w candidate was fetched where 352w suffices — ~65% of card
image bytes wasted, ×24 cards per page).

- `image` snippet now accepts and forwards a `sizes` param (verified
  live that `image_tag` omits nil attributes — no empty-attr fallout).
- Accurate `sizes` set at 16 call sites: product cards + hover
  (`300px / 33vw / 50vw`), gallery slides (`55vw / 100vw`), gallery
  thumbs (`60px`), lightbox (`100vw`), quick-view strip
  (`320px / 85vw`), cart lines (`96px`), featured product,
  image-with-text, compare table (`150px`), catalog-navigator tiles,
  promo tiles, hotspots stage, blog cards, article lead.
- Verified live: mobile grid now selects the 352w candidate; hero
  keeps its explicit `100vw` + eager + fetchpriority=high.

## Audited clean (no change warranted)

- **JS loading**: no unused scripts on any page (layout carries only
  cart, quick view, back-to-top + compare behind its setting; header
  and sections load their own); duplicate `qc-facets.js` tags on
  collection pages resolve to one request (same-URL module dedupe);
  no synchronous scripts; no library dependencies.
- **Lazy behavior already in place**: recommendations and
  recently-viewed self-fetch after load and remove themselves when
  empty; quick view renders on intent with session cache; drawer line
  images are `loading="lazy"` inside the closed dialog so they don't
  load until first open; slideshow autoplay stops while the tab is
  hidden; below-fold media lazy by default with eager LCP exceptions.
- **CSS**: section styles compile into one styles.css by platform
  design; 63 KB total CSS is modest; no expensive selectors beyond
  two scoped `:has()` uses in the header; no page-specific CSS worth
  splitting at this size.
- **Fonts**: nothing unused downloads; no external font origins
  beyond fonts.shopifycdn.com (preconnected).
- **Liquid/DOM**: loops bounded and paginated (24/8/10), no repeated
  traversals, one markup tree per breakpoint (responsive CSS, no
  duplicated desktop/mobile DOM).
- **Third-party**: none in the theme; remaining requests are
  Shopify's own platform scripts (analytics, Shop Pay), which the
  theme cannot and should not remove.

## Regression sweep after the change

Card hover swap, quick view (open + images), product gallery
(slides/thumbs/lightbox markup), cart drawer (6 line images), facets
alive, mobile grid — all verified on the pushed theme. No schema or
JS changes; Theme Editor unaffected. Gates: theme check 94 files /
0 offenses, provenance clean.
