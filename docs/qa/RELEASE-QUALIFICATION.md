# Release qualification — QuillCommerce (skeleton line) 1.0.0-beta.1

Date: 2026-09-14 · Theme: #149206040653 on saasquill-app-dev
Scope: Theme Store submission-readiness sweep across everything built in
Phases 0–7.

## Template completeness
| Requirement | Status |
|---|---|
| index, product, collection, list-collections, search, cart, blog, article, page, 404, password | PASS — all JSON templates present and rendering (status sweep: every route 200, 404 template on missing routes) |
| gift_card.liquid | PASS — rebuilt this phase on qc tokens: balance, expiry states, code, QR (Shopify-hosted qrcode.js vendor asset), continue-shopping + print actions, Apple Wallet pass; dead `settings.logo` reference removed |
| customers/* (7 templates) | PASS (render-verified) — functional pass impossible on this store (legacy accounts unavailable; see PHASE7-SLICE1) |

## Editor experience (carried Phase 2 exit item — CLOSED)
Theme Editor walkthrough on the dev theme: all sections listed under
correct schema-locale names (header group, template, footer group, cart
drawer); **Add section** picker shows exactly the preset sections with
live preview thumbnails; adding Multi-column inserted it with its three
preset blocks rendering live; the Heading setting updated the preview
keystroke-by-keystroke; **Remove section** restored the composition.
No saves were made (net no-op discarded).

## Localization (carried item — CLOSED)
Country switch US → Canada in an isolated session: utility-bar selector
posts the localization form, server prices re-render in CAD ($120.00 →
$161.00), and the JS variant-sync price path also renders session
currency ($181.00 CAD for the $135 variant) since variant JSON and
money format are session-scoped. Switched back to US and verified.

## Performance
- First-party payload: **73 KB unminified total** across all 10 JS
  modules + 2 stylesheets (each page loads a subset; largest single
  file 18.7 KB).
- Zero external dependencies, zero frameworks, no font downloads by
  default (system stack), Shopify-hosted assets only (payment icons,
  qrcode vendor on gift card).
- All theme asset requests 200; console errors on swept pages are
  Shopify platform beacons only (password-page 401/404s), none from
  theme code.

## Translations
Automated audit: every `t:` schema key and every `| t` storefront key
resolves in en.default(.schema).json — 0 missing either direction.

## Fixes made during qualification
- gift_card.liquid rebuild (above).
- Hero "Our story" CTA pointed at /pages/about (404); fixed to the real
  fixture handle /pages/about-the-outfitter.

## Accessibility & robustness (as verified per-slice)
No-JS baselines on every flow; native dialogs with scroll-lock and
focus restore; live-region announcements; labeled forms with error
alerts; 44px targets; reduced-motion collapse; struck-state semantics
never color-alone. Per-slice records in docs/qa/.

## Open items (documented, not blocking submission)
1. Functional customer-account flows — platform constraint on this
   store (Theme Store review environments exercise them).
2. Real-keyboard Escape on dialogs — synthetic Escape cannot close
   native dialogs; a 10-second human check (open cart drawer / quick
   view, press Esc) is the only remaining confirmation.
3. Hero/image-with-text contrast with real photography (no store
   imagery yet); overlay control exists.
4. Platform-data gaps without fixtures: unit price, quantity rules,
   volume pricing, installments eligibility, variant featured media,
   video/model media.
5. Newsletter/customer forms pass through store-level captcha
   (verified end-to-end with a human).

## Verdict
The skeleton line is submission-ready pending Theme Store listing
assets (screenshots, demo store content with real imagery) and the
open items above. Tagged `skeleton/1.0.0-beta.1`.
