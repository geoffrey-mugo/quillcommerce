# Tailwater demo foundation pack

Offline, reviewable content for building the Tailwater Supply Co. demo store
(SPEC-030). Nothing here touches the live store; it is reviewed and approved,
then imported by the owner in admin. No Admin API token is used.

## Contents
- `products.csv` — Shopify product import (19 products, 49 variant rows), generated
  from structured data and mechanically validated (unique handles; sale, sold-out,
  price-range, long-title, and single/multi-variant states all present).
- `metafields.md` — metafield definitions + per-product values.
- `collections.md` — collection definitions and membership rules.
- `navigation.md` — primary + footer menu trees with destination handles.
- `pages.md` — page and policy copy (About, Shipping, Returns & repairs, Size
  guide, Contact, FAQ).
- `field-reports.md` — two complete field reports + one guide (blog "Journal").
- `merchandising.md` — homepage merchandising map.
- `photography.md` — shot/sourcing list mapped to every product and editorial slot.
- `provenance-ledger.md` — asset provenance ledger (fill as assets are chosen).
- `verification-checklist.md` — post-import storefront audit.

## Execution order (SPEC-030 §8, owner-run)
1. Review and approve this pack.
2. Source and approve the coherent photography set (`photography.md`), logging
   each asset in `provenance-ledger.md`.
3. Import `products.csv` (Admin → Products → Import). Do not publish sales channels
   until images and metafields are set.
4. Create collections, pages, articles, and menus in Admin per the specs.
5. Populate metafields and assign imagery per product.
6. Run `verification-checklist.md` — every nav link resolves, every state renders.
7. Only then unfreeze theme code and resume shell design against real data.

## Regenerating the CSV
`gen_csv.py` holds the structured source. Edit it and re-run to
regenerate `products.csv`; it validates state coverage on every run.
