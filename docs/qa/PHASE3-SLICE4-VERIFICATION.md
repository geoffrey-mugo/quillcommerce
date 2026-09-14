# Phase 3 slice 4 (sweep) — verification (2026-09-14)

Store: saasquill-app-dev, theme #149206040653.

| Feature | Result |
|---|---|
| Breadcrumbs — product via collection path | ✅ "Home / Automated Collection / The Complete Snowboard" + BreadcrumbList JSON-LD |
| Breadcrumbs — article | ✅ "Home / News / Field Notes…" |
| Breadcrumbs — collection/page renders | wired identically (spot-checked collection markup) |
| Utility bar | ✅ renders in header group; real country selector present (Plus store has multiple markets); auto-submit element attached; message/link settings empty by default |
| Country switch exercised | ✗ deliberately not clicked (would change session currency); form is Shopify's localization form |
| Catalog navigator (tiles) | ✅ 3 collections with counts; 2 image-less collections show display-font initial placeholders |
| Navigator list mode / editor add | structural; layout select in schema |
| Filter swatches | code path added (value.swatch color+image, label always text); no swatch data on store — renders unchanged (verified filters still fine) |
| Grid density setting | structural (drives --qc-card-min); default unchanged |
| Back to top | ✅ hidden on short pages, appears past 2 viewports on /collections/all (4437>1926), click → top + focus to #qc-main |
| Blog comments fixture | admin now saved "Allowed, pending moderation" (first save hadn't persisted); storefront still cached comments-off — re-verify next session |

