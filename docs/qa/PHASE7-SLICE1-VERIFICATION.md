# Phase 7 · Slice 1 verification — SPEC-022 customer templates + docs

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev

## Store constraint
The dev store uses **new customer accounts** — `/account/login`
redirects to Shopify-hosted auth, so classic account pages cannot be
exercised in place. Verification below is via Section Rendering API
(real server renders of each section) plus static gates. Full
functional passes (login errors, address CRUD, order history) require a
classic-accounts store — flagged for release qualification, and the
user can switch the dev store to legacy accounts if desired.

## Results (section renders)

| Section | Result |
|---|---|
| qc-login | PASS — `customer_login` + `recover_customer_password` forms with correct field names, 3 labeled inputs, `:target`-toggled recovery pane (no JS), register link, guest checkout guarded |
| qc-register | PASS — `create_customer` with first/last/email/password, all labeled, autocomplete attributes |
| qc-activate-account / qc-reset-password | PASS — password + confirmation forms (+ decline submit on activate) |
| qc-account / qc-addresses / qc-order | RENDER PASS — h1 and shells render without error in a customer-less context; orders table, address list + `customer_address` forms + `_method=delete` removal, and order detail (lines/discounts/shipping/tax/totals/addresses) are customer-scoped and render only in a real session (structural) |
| Error summaries | By construction — shared qc-form-errors snippet (`role="alert"`, translated field names) on every form |
| Templates | 7 JSON templates under templates/customers/, one section each |

## Docs
- docs/MERCHANT-GUIDE.md written for the skeleton line (settings groups,
  section catalog, product-page/cart/accounts behavior, a11y/perf
  notes).
- README.md replaced (was Skeleton's stock README) with QuillCommerce
  identity, lineage, gates, and repo layout.

## Gates
Theme Check: 75 files, 0 offenses (two documented template globals
suppressed with scoped theme-check-disable comments; one hardcoded
route fixed to `routes.account_addresses_url`). Provenance scan: clean
after neutralizing fixture social URLs that tripped the `@saasquill`
legacy pattern. Pushed to #149206040653.

## Known gaps
- Functional account flows on a classic-accounts store (above).
- Country select preselection on address edit without JS (documented
  spec limitation; province auto-population out of scope).
- gift_card.liquid remains Skeleton's — review at release
  qualification.
