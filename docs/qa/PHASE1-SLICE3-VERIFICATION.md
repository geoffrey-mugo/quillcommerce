# Phase 1 slice 3 — core templates verification (2026-09-14)

Store: saasquill-app-dev, theme #149206040653.

| Check | Result |
|---|---|
| Collection /collections/all | ✅ card grid, prices, Sold out badge on gift card; list bullets bug found & fixed |
| Canonical product card | ✅ bordered square media, 2-line title clamp, price, badge; single tab stop |
| Search ?q=snowboard | ✅ labeled field + icon button, "13 results" status, 13 cards, no bullets |
| 404 | ✅ heading, message, primary Back-to-shopping button |
| Blog (empty "News" blog) | ✅ renders gracefully with zero articles |
| Pagination styling | delivered (.qc-pagination); ≤24 items per page on dev store so not exercised |
| Article page, comments, comment form | implemented per SPEC-004; no article content on dev store — pending content fixture |
| Password page | implemented + foundation CSS added to password layout; visually unverified (session already holds gate cookie) |
| Page template | implemented; no non-empty test page on dev store |

Fixture gaps to close later: create a test article (with comments enabled), a
content page, and >24 products for pagination.
