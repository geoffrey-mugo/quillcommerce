# Phase 4 · Slice 3 verification — SPEC-013 purchase options

Date: 2026-09-14 · Theme: #149206040653 (skeleton) on saasquill-app-dev
Fixture: **Selling Plans Ski Wax** — 4 plan groups (Preorder /
Subscription / Prepaid / Try Before You Buy) with disjoint per-variant
allocations: variant 1 carries subscription ($21.21 vs $24.95) + prepaid,
variant 2 only preorder ($39.96 vs $49.95), variant 3 only
try-before-you-buy.

## Results (live on the dev storefront)

| Check | Result |
|---|---|
| Picker render | PASS — labeled "Purchase options" fieldset, one-time first, group headings, plan names as radio labels |
| Per-variant availability | PASS — on load (variant 1) preorder + try-before-you-buy disabled/struck with SR note; subscription + prepaid enabled |
| Plan-aware pricing | PASS — subscription selected → "Sale price $21.21 $24.95" (SR label present); one-time restores $24.95 |
| Variant switch fallback | PASS — switching to variant 2 with subscription selected falls back to one-time (announced), re-marks plans (only preorder enabled), price $49.95, `selling_plan` dropped from URL |
| URL sync | PASS — `?variant=&selling_plan=` set on plan pick, `selling_plan` removed on one-time |
| Deep link | PASS — `?variant=…&selling_plan=19454361677` → radio server-checked, Liquid renders the allocation sale price + SR label |
| End-to-end add | PASS — form posts `selling_plan`; `/cart/add.js` line at plan price 2121 with plan name "Ski wax subscription, billed and delivered weekly"; test line removed, user's cart restored (2 items) |
| Installments | PASS (empty render) — `payment_terms` emits nothing on this non-eligible store; no layout impact |
| Unit price | STRUCTURAL — no `unit_price_measurement` fixtures; line renders hidden, JS path re-renders/hides per variant |
| Quantity rules | STRUCTURAL — all fixtures min 1 / inc 1 / no max; input takes min/step/max from the rule, note renders only when non-trivial |
| Volume pricing | STRUCTURAL — no `quantity_price_breaks` fixtures; list hidden, JS re-render path in place |
| No-JS baseline | STRUCTURAL — plan radios are native `selling_plan` form inputs; server preselection via `selected_selling_plan` proven by the deep-link render |

## Gates
Theme Check: 48 files, 0 offenses. Provenance scan: clean. `node --check`
on qc-product.js: OK. Pushed to #149206040653.

## Known gaps
- Unit pricing, quantity rules, and volume pricing lack dev-store
  fixtures (B2B/markets features) — structural only.
- Installments banner unobservable on this store (not eligible).
- `requires_selling_plan` products: default-plan preselection implemented
  in Liquid; no fixture to observe live.
