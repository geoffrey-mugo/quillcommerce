# Phase 3 slice 3 — facets & sorting verification (2026-09-14)

Store: saasquill-app-dev, theme #149206040653. Search & Discovery installed
this session (default Availability + Price filters).

| Check | Result |
|---|---|
| Filters render from collection.filters | ✅ Availability, Price groups with value counts |
| Availability filter (auto-submit on change) | ✅ URL gains filter.v.availability=1; 34 → 10 products; grid + count update |
| Active chip with remove link | ✅ "Availability: In stock" |
| Sort composes with filters | ✅ price-ascending order verified ($9.95→$699.95), filter param retained |
| **Back button restores prior state** | ✅ URL, product count, and checked checkbox all restored |
| Price range filter | ✅ ≤$100 + in-stock → exactly 1 product (Ski Wax $9.95); singular "1 product" string |
| Chips for price + Clear all | ✅ clear returns to 34, chips removed |
| Desktop ≥990px sidebar (panel held open, summary inert) | ✅ screenshot |
| Mobile disclosure layout | ✅ (earlier mobile-width checks) |
| Search-page facets | wired (same snippet, q preserved); search filters render only for product-filterable queries — spot check pending |
| No-JS baseline | Apply button performs identical GET navigation (structural; JS is submit-on-change only) |

