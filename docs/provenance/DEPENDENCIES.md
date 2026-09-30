# QuillCommerce — Dependency & Asset Ledger (branch: skeleton)

| Item | Version/commit | Source | Owner | License | Why | Files | Modified | Notices |
|---|---|---|---|---|---|---|---|---|
| Skeleton Theme | commit a4f32d393b9eadf6c4403318ca39116832e5d1df (cloned 2026-09-14, shallow) | https://github.com/Shopify/skeleton-theme | Shopify Inc. | LICENSE.md (Shopify-storefront/Theme Store scoped) | Shopify's sole approved starting codebase for new Theme Store development | Initial import: assets/ blocks/ config/ layout/ locales/ sections/ snippets/ templates/ LICENSE.md README.md | Will be extended; theme_info re-identified to QuillCommerce | LICENSE.md retained |
| Pexels demo photography (provisional demo-store ledger) | Photo IDs listed in `docs/DEMO-IMAGE-CREDITS.txt` | https://www.pexels.com/license/ and the individual photo pages | Individual Pexels contributors; names still to be recorded | Pexels license | Populate the private demonstration store; not required by theme runtime | Shopify demo-store Files/products only; no photo binaries in the shipping theme repository | Shopify delivery/cropping only; individual edit history not yet recorded | `THIRD_PARTY_NOTICES.md` and `docs/DEMO-IMAGE-CREDITS.txt` |

No other code dependencies. No npm packages, third-party JavaScript, bundled
fonts, or external runtime calls are distributed with the theme. Demo-store
content is tracked separately because it is part of Theme Store review even
when it is not packaged in the theme ZIP.

The Pexels row is not release-complete until every retained image includes its
contributor, direct photo URL, acquisition date, store filename, and depicted
brand/personality-rights review. Every future addition must be recorded here
before merge.
