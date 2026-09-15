# QuillCommerce

Copyright © 2026 SaaSQuill. Original work proprietary; Skeleton
portions © Shopify Inc. — see `LICENSE.md`.

An original Shopify Online Store 2.0 theme by SaaSQuill. Built
clean-room on the [Shopify Skeleton theme](https://github.com/Shopify/skeleton-theme)
foundation (Shopify's theme license — see `THIRD_PARTY_NOTICES.md`) with an original design
system, components, and merchandising toolkit.

- **Design system**: three merchant colors expand into a full derived
  palette (`--qc-*` tokens, `color-mix` in OKLab), fluid type scale,
  corner-style presets, motion tokens that collapse under reduced
  motion.
- **Progressive enhancement everywhere**: every flow — purchase, facets,
  cart, search, accounts — works without JavaScript; custom elements
  layer on drawers, dialogs, live updates, and history-integrated URLs.
- **Feature set**: variant-synced product page (gallery, zoom, plans,
  unit/volume pricing, pickup, sticky bar, gift recipient,
  disclosures), cart drawer with unified Ajax editing, recommendations
  (related + Search & Discovery complementary), recently viewed,
  compare, and a merchandising section library.

## Development

```bash
shopify theme dev --store <your-dev-store>
```

Gates before any push (see `CLAUDE.md` for the full workflow):

```bash
shopify theme check
```

Provenance scan (must return nothing):

```bash
rg -il "empire|pixel union|pxs-|pxu-|ssqll|@saasquill" --glob '!docs/**' --glob '!*.md' .
```

## Repository layout

- `docs/specs/` — one behavioral spec per vertical slice (SPEC-001…)
- `docs/qa/` — per-slice live verification records
- `docs/provenance/` — decision ledger, dependency records
- `docs/MERCHANT-GUIDE.md` — Theme Editor documentation for merchants

## Lineage

This is the `skeleton` branch — the Theme Store line, an orphan history
containing no code from any prior theme. See
`README-CLEANROOM-EMPIRE-PARITY.md` (governance) and
`docs/provenance/DECISIONS.md` (D-001 dual-track decision).
