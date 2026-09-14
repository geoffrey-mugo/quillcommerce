# Phase 1 slice 2 — cart verification (2026-09-14)

Store: saasquill-app-dev, theme #149206040653. All no-JavaScript.

| Check | Result |
|---|---|
| Cart line renders (image, title link, variant, qty input, remove, line price) | ✅ |
| Quantity 1→3 via Update button | ✅ subtotal $2,099.85 (=3×$699.95) |
| Pluralized subtotal string | ✅ "(3 items)" / "(1 item)" via one/other keys (bug found in review, fixed) |
| Order note persistence through cart POST | ✅ "Leave at the boathouse" round-tripped |
| Remove link (url_to_remove) | ✅ line removed |
| Empty-cart state | ✅ message + Continue shopping primary button |
| Checkout submit (name="checkout") | ✅ landed on /checkouts/… |
| Cleanup | cart restored to prior state (1× Complete Snowboard, empty note) |

Phase 1 definition of done demonstrated: browse → variant → add → edit cart
→ checkout, JS-free. Untested pending fixtures/slices: line discounts,
selling-plan line display, unit-priced line (no such lines craftable via
storefront alone), sold-out-while-in-cart error region (Phase 5).
