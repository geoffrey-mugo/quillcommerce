# QuillCommerce — Decision Log

## D-001 · 2026-09-14 · Release target: dual-track
**Decision (confirmed in writing by Geoff):** QuillCommerce pursues both tracks.
1. The Dawn-derived `0.1.x` line (tag `prototype/dawn-ftv-0.1.0`, branch `main`)
   remains the live private theme for the Flying Ties VA store — permitted use
   under Dawn's license. Maintenance-only.
2. A Skeleton-based rebuild (branch `skeleton`) is the sole path toward Theme
   Store distribution, per Shopify's requirement that new submissions use
   Skeleton Theme. All new feature work happens on the Skeleton line.

## D-002 · 2026-09-14 · Clean-room governance adopted
`README-CLEANROOM-EMPIRE-PARITY.md` is the controlling guide. The legacy
Empire-derived directory is never accessed. Capability parity is achieved via
neutral behavioral specifications in `docs/specs/` and Shopify documentation.

## D-003 · 2026-09-14 · Prototype code transfer policy
Dawn-inherited files never move to the Skeleton branch. QuillCommerce-original
material (preset values, authored copy, settings concepts, `qc-*` design
intent, docs, owned demo assets) transfers as *specification and design
decisions*; original `qc-*` code may transfer only after review confirms no
Dawn coupling (current `qc-*` CSS/Liquid uses Dawn variables/classes and is
expected to be rewritten against the new token system).

## D-004 · 2026-09-14 · Demo asset hygiene
Demo CSVs referencing picsum/Unsplash-derived image URLs (v1, v2, image-fix)
deleted; `ftv-demo-products-v3.csv` (owned, PIL-generated gradient images,
authored in-repo) is the sole canonical demo catalog.
