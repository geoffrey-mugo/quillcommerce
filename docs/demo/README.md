# Tailwater demo foundation pack

Offline, reviewable content for building the Tailwater Supply Co. demo store
(SPEC-030). Nothing here touches the live store; it is reviewed and approved,
then imported by the owner in admin. No Admin API token is used.

## Contents
- `products.csv` — Shopify product import (18 products, 45 variant rows),
  generated from structured data and cross-validated (Shopify column contract,
  unique handles + SKUs, drafted/unpublished, title↔variant truth, collection
  and nav references, state coverage). The **gift card is not here** — Shopify
  cannot create gift-card products by CSV; it is created manually in Admin.
- `metafields.md` — metafield definitions + per-product values.
- `collections.md` — collection definitions and membership rules.
- `navigation.md` — primary + footer menu trees with destination handles.
- `pages.md` — page and policy copy (About, Shipping, Returns & repairs, Size
  guide, Contact, FAQ).
- `field-reports.md` — two complete field reports + one guide (blog "Journal").
- `merchandising.md` — homepage merchandising map.
- `photography.md` — visual system, shot list, and the production-method decision.
- `image-generation-brief.md` — chosen method: art-directed generated set; style contract + per-asset prompts + provenance rules.
- `provenance-ledger.md` — asset provenance ledger (fill as assets are chosen).
- `admin-setup-runbook.md` — step-by-step admin build (click paths, preview checks, stop conditions, rollback).
- `verification-checklist.md` — post-import storefront audit.

## Execution order (SPEC-030 §8, owner-run)
1. Review and approve this pack.
2. **Choose the product-imagery production method** (photography.md §Sourcing) and
   produce one consistent set; log every asset in `provenance-ledger.md`.
3. Import `products.csv` (Admin → Products → Import). Products arrive as **drafts**
   — keep them unpublished until images and metafields are assigned.
4. **Create the gift card manually** (Products → Add → Gift card), then create
   collections, pages, articles, and menus per the specs.
5. Populate metafields and assign imagery per product; publish when complete.
6. Run `verification-checklist.md` — every nav link resolves, every state renders.
7. Only then unfreeze theme code and resume shell design against real data.

## Regenerating the CSV
`gen_csv.py` holds the structured source. Edit it and re-run to
regenerate `products.csv`; it validates state coverage on every run.
