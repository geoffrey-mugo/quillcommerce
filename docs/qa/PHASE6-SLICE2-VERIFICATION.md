# Phase 6 · Slice 2 verification — SPEC-021 newsletter, multi-column, footer

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev

## Results (live, home template + footer group)

| Check | Result |
|---|---|
| Multi-column | PASS — "Why shop with us" with three value-prop columns (auto-fill grid, block fixtures) |
| Newsletter render | PASS — heading/subheading centered; `{% form 'customer' %}` posts to /contact with section anchor, `contact[tags]=newsletter`, labeled required email (`autocomplete`, placeholder), Subscribe submit |
| Newsletter submit | ENVIRONMENT-LIMITED — a real button-click POST redirected back without `customer_posted` and created no customer; Shopify's invisible bot protection silently drops automated customer-form posts (a fetch replay returned 400). Theme mechanics are the platform-standard customer form; success (`role="status"`) and error (`role="alert"`, `aria-invalid`, `aria-describedby`) render paths verified structurally. Human end-to-end submit recommended once |
| Footer rebuild | PASS — shop name, blurb richtext, main-menu nav (Home/Catalog/Contact) in a labeled nav landmark, 6 payment icons (decorative list + SR caption), copyright with year + shop link; Skeleton `--color-*` variables gone |
| Social links | PASS — Instagram + YouTube fixture URLs render 44px icon links with platform-name accessible labels, `target="_blank" rel="noopener"`; unset platforms render nothing |
| Social glyphs | Original simplified stroke drawings added to qc-icon (instagram, facebook, x-social, youtube, tiktok, pinterest) |
| No-JS | By construction — every part of this slice is plain Liquid + form posts |

## Fixtures
Home template: `values` (3-column) and `signup` (newsletter) sections;
footer group: main-menu + blurb; settings_data: two social URLs.
(One template-authoring error caught before push: the signup section was
inserted at the JSON top level instead of inside `sections` — repaired
and asserted order/sections consistency.)

## Gates
Theme Check: 59 files, 0 offenses. Provenance scan: clean. Pushed to
#149206040653.

## Known gaps
- Human newsletter submit (above) — expected to pass; the same
  mechanism as Dawn's newsletter.
- Real social profiles are merchant content; fixtures point at
  placeholder handles.
