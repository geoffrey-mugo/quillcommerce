# SPEC-003 · Cart page & line-item primitive

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 1 (foundation), slice 2
Provenance: Original QuillCommerce design; Shopify cart template/Ajax docs.
The line-item component is designed for reuse by the Phase 5 cart drawer.

## Merchant outcome
A cart page that presents lines, quantities, discounts, selling-plan names,
notes, and totals correctly for any catalog, works with no JavaScript, and
matches the theme's design system without configuration.

## Shopper outcome
Review the cart, change quantities, remove lines, add an order note, see
correct totals (including line and cart discounts), and proceed to checkout —
by keyboard, touch, or pointer, with or without JavaScript.

## Behavioral requirements
1. One reusable line-item snippet `qc-cart-line.liquid` renders: linked image
   (or placeholder treatment), product title (link), variant title when not
   default, selling-plan allocation name, per-line discounts (name + amount),
   unit price when present, line price via the price presentation rules
   (original + discounted shown together when they differ), a labeled
   quantity input (`updates[]`, min 0), and a remove control.
2. **No-JS baseline**: quantity inputs post through the cart form's Update
   action; remove is a plain link (`url_to_remove`); checkout submits the
   form with `name="checkout"`. All three work with JavaScript disabled.
3. Quantity input is numeric (`type="number"`, `inputmode="numeric"`,
   `min="0"`), labeled per line ("Quantity for <product>", visually hidden).
4. Remove control is a link named "Remove <product title>" for assistive tech.
5. **Totals block**: item count, cart-level discounts (name + amount),
   subtotal, and the taxes/shipping-at-checkout note from Shopify's
   `cart.taxes_included`/duties context via locale strings.
6. **Order note**: optional `cart[note]` textarea inside the form, shown when
   the merchant setting enables it (default on), persisted by cart POST.
7. **Empty cart**: distinct state — message + primary link to the catalog
   (`routes.all_products_collection_url`); focus/heading structure intact.
8. Layout: single-column list on small screens; a two-region layout
   (lines + summary aside) from 900px; no tables — semantic list markup.
9. All strings via locale keys; money via `money` filters; no hardcoded
   routes.
10. This slice is intentionally JS-free; Ajax updating arrives with the
    Phase 2 cart coordinator and must not require markup changes beyond
    data hooks (`data-qc-cart-line`, `data-qc-cart-total`).

## Settings (merchant-facing)
| Setting | Type | Default | Notes |
|---|---|---|---|
| Show order note | checkbox | true | cart page note field |

## States & edge cases
Empty cart; 1 line; many lines; same product in multiple variants; line with
selling plan; line/cart discounts; unit-priced line; sold-out-while-in-cart
(quantity error message region rendered when `cart.items` carry errors is
deferred to Phase 5 — page reload keeps totals honest meanwhile); long titles;
missing image.

## Accessibility acceptance
Lines are list items; each control individually named; totals region is a
labeled landmark (`aria-labelledby` summary heading); update/checkout
buttons ≥44px; keyboard-only pass: edit quantity → Update → remove line →
checkout.

## Out of scope
Cart drawer, Ajax quantity updates, shipping progress, recommendations
(Phases 2/5).
