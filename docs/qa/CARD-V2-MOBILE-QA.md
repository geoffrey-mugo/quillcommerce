# Card v2 mobile QA sweep + size consistency

Date: 2026-09-14 · Theme: #149206040653 (live) on saasquill-app-dev
Profile: 375×812 touch emulation (Android UA); desktop re-checks where
noted. Cart restored after every mutation.

## Card layout (mobile, /collections/all — all 24 cards audited)
| Check | Result |
|---|---|
| Two buttons, always one row | PASS — 24/24; no wrap, no overflow past the card border, no clipped labels |
| 44px touch targets | PASS — buttons and compare toggles all ≥44px |
| No page horizontal scroll | PASS — collection and PDP |
| Two-column tightest case (500px, 222px cards) | PASS — re-verified after the fixed 1fr/1fr row |

## Size consistency (desktop, merchant-reported)
Cards in a row previously ended at different heights (short titles →
higher buttons). Fixed: `.qc-product-grid > li` flexes and the card
fills it, so the auto-margin action row pins to a shared bottom edge.
Verified on the home featured strip: every row equal height, all
action rows on one baseline (screenshot + programmatic check).

## Interactive flows (mobile)
| Flow | Result |
|---|---|
| Quick view | PASS — opens, fits 375px, content loads, no internal h-scroll, ink View details, 44px close |
| Quick add → drawer | PASS — auto-opens, 44px checkout/qty controls; test line removed, cart restored |
| Compare | PASS — tray fits on screen, "Compare (2)", dialog fits viewport with the table scrolling inside its own wrapper (page never widens), clear works |
| PDP strips | PASS — Pairs well with + You may also like cards all clean |

## Defect found & fixed during the sweep
**UA dialog max-width clamp**: browsers give `<dialog>` a default
`max-width: calc(100% - 6px - 2em)`, so the cart drawer rendered 337px
on a 375px phone with a stray 38px backdrop sliver. `max-inline-size:
100%` added to the drawer, quick view, compare dialog, and lightbox;
drawer re-verified at exactly 375px full width.

## Gates
Theme Check: 75 files, 0 offenses. Pushed to the live dev theme
(standing --allow-live approval).
