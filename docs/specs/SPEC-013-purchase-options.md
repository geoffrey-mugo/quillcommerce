# SPEC-013 · Product page: purchase options (selling plans, unit & volume pricing, installments)

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE4-SLICE3-VERIFICATION.md)
Phase: 4, slice 3
Provenance: Original QuillCommerce design; Shopify selling-plan, unit-price,
quantity-rule/price-break, and payment-terms Liquid objects and form
conventions.

## Merchant outcome
Products configured with subscriptions/pre-orders (selling plan apps),
unit-price measurements, B2B quantity rules and volume pricing, or Shop
Pay Installments surface all of it with zero theme configuration.

## Shopper outcome
Choose between one-time purchase and offered plans with honest per-plan
prices; see price-per-unit where the law or merchant requires it; see
volume discounts and have quantity constraints enforced by the input
itself; see installment messaging; share a URL that lands on the same
variant *and* plan — all keyboard-only and with a native-form no-JS path.

## Behavioral requirements
1. **Selling plan picker**: when `product.selling_plan_groups` is
   non-empty, a labeled fieldset ("Purchase options") of radios named
   `selling_plan` renders after the variant picker: "One-time purchase"
   (value empty; omitted when `product.requires_selling_plan`) followed by
   each group's plans (group name as a small heading when more than one
   group; plan name as the label, description when present). Server
   preselects from `product.selected_selling_plan`; otherwise one-time
   (or the first offered plan when required). Radios are native form
   inputs — the no-JS baseline posts `selling_plan` with the form.
2. **Per-variant plan availability**: a plan applies to a variant only if
   that variant carries an allocation for it. Plans without an allocation
   for the current variant are marked unavailable (struck + SR note,
   disabled). On variant change, a selected plan that no longer applies
   falls back to one-time (or the first applicable plan when plans are
   required) and the change is announced.
3. **Plan-aware pricing**: with a plan selected, the price block renders
   the allocation's price (compare-at from the allocation when higher,
   with the SR sale label). Switching back to one-time restores variant
   pricing. Initial Liquid render honors
   `selected_selling_plan_allocation` the same way.
4. **URL**: `?selling_plan=` is added/removed via the same
   `history.replaceState` update as `?variant=`; deep links restore both.
5. **Unit price**: when `unit_price_measurement` is present on the shown
   variant, a quiet line renders `<unit price> / <reference>` (reference
   value omitted when 1); hidden otherwise; synced on variant change.
   With a plan selected, the allocation's unit price is used when exposed.
6. **Quantity rules**: the quantity input takes `min`, `step`
   (increment), `value` (min) and `max` (when set) from the variant's
   `quantity_rule`, re-synced on variant change; a quiet note states the
   rule when it is non-trivial (min > 1, increment > 1, or max).
7. **Volume pricing**: when the variant has `quantity_price_breaks`, a
   small labeled list renders "<qty>+ for <price> each" rows, re-rendered
   on variant change; absent otherwise.
8. **Installments**: `{{ form | payment_terms }}` renders inside the
   product form (Shop Pay Installments banner where eligible; empty
   otherwise).
9. Buy-button, stock, SKU, gallery, and unavailable-pill behavior from
   SPEC-011 are unchanged; plan changes never alter the variant.
10. All strings via locale keys; tokens-only styling; guarded/cleaned-up
    JS; variant JSON extended with plan allocations, unit price,
    quantity rule, and breaks.

## Settings (merchant-facing)
None — everything is driven by product configuration.

## States & edge cases
Products with no plan groups (nothing renders); requires_selling_plan
(no one-time option); plan applying to only some variants (fixture:
Ski Wax — subscription+prepaid on variant 1 only, preorder on variant 2
only, try-before-you-buy on variant 3 only); allocation without
compare-at (no sale render); no unit/break/rule fixtures on the dev
store (structural verification); combined deep link variant+plan.

## Accessibility acceptance
Plan radios in a labeled fieldset with real labels; unavailable plans
carry an SR note and disabled state; plan and fallback changes announced
via the live region; rule note and volume list are text, associated with
the quantity field by proximity and heading.

## Out of scope
Pickup availability, pre-order badging beyond plan names, gift
recipient, sticky buy bar, complementary/related (later slices).
