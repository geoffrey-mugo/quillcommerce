# SPEC-022 · Customer account templates

Status: Implemented (verified 2026-09-14 via section renders — functional pass pending a classic-accounts store; see docs/qa/PHASE7-SLICE1-VERIFICATION.md)
Phase: 7, slice 1
Provenance: Original QuillCommerce design; Shopify customer form types
(`customer_login`, `recover_customer_password`, `create_customer`,
`customer_address`, `activate_customer_password`,
`reset_customer_password`), customer/order Liquid objects, and account
routes.

## Merchant outcome
The complete classic-accounts surface required for Theme Store
submission: login, registration, recovery, activation, reset, account
overview with order history, order detail, and address management — on
the design system, with zero configuration. (Stores using new customer
accounts bypass these; they must still exist and work.)

## Shopper outcome
Sign in, register, recover and reset passwords, review orders and their
details, and manage addresses — every flow a plain, labeled, no-JS form
with inline errors; keyboard and screen-reader complete.

## Behavioral requirements
1. **Login** (`qc-login` / customers/login.json): `customer_login` form
   (email + password, errors); a "Forgot password?" link toggles to the
   `recover_customer_password` form via CSS `:target` (`#recover`) — no
   JS; recovery success notice via `recover_customer_password.success`;
   link to register; when `shop.checkout.guest_login` offers it, the
   guest-checkout form renders.
2. **Register** (`qc-register`): `create_customer` form (first, last,
   email, password) with per-field labels, `form.errors` summary, and a
   link back to login.
3. **Account** (`qc-account`): greeting with customer name, log-out
   link, order history table (number linked to order detail, date,
   payment/fulfillment status, total; `paginate customer.orders by 10`;
   empty state), link to addresses with count.
4. **Order** (`qc-order`): order name + date; cancelled notice when
   applicable; line table (item title/variant, sku, quantity, line
   price) with discounts; subtotal/shipping/tax/total rows; billing and
   shipping addresses via `format_address`; back link.
5. **Addresses** (`qc-addresses`): default address first and labeled;
   each address in `format_address` with Edit (a native `<details>`
   holding its `customer_address` form) and Delete (plain form POST
   with `_method=delete` — no confirm dialog dependency); "Add address"
   in its own `<details>`; country/province selects use Shopify's
   `all_country_option_tags` with the standard province data attributes
   (progressive enhancement for provinces ships later; the plain
   selects post correctly without JS).
6. **Activate / Reset** (`qc-activate-account`, `qc-reset-password`):
   password + confirmation fields, errors, submit (+ decline button on
   activate).
7. All forms: qc primitives, labeled inputs with `autocomplete`
   attributes, `form.errors` rendered as a `role="alert"` list at the
   top of the form; headings h1 per page; templates are one section
   each (JSON templates).
8. All strings under a new `customer.*` locale namespace; tokens-only
   styling; no JS anywhere in this slice.

## States & edge cases
Wrong credentials (errors render); recovery of unknown email (Shopify
reports success regardless — copy reflects that); no orders yet; order
with discounts/refunds (financial status shows); >10 orders
(pagination); no addresses; deleting the default address (platform
reassigns); new-customer-accounts stores (templates unused — noted).

## Accessibility acceptance
Every input labeled; error summaries `role="alert"` and linked to the
form; tables with proper headers and captions; details/summary for
progressive disclosure; 44px controls.

## Out of scope
Province auto-population JS, social login, new-customer-accounts
styling (hosted by Shopify), B2B company surfaces.
