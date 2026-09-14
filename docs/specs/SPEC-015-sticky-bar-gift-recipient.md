# SPEC-015 · Product page: sticky purchase bar & gift-card recipient

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE4-SLICE5-VERIFICATION.md)
Phase: 4, slice 5
Provenance: Original QuillCommerce design; Shopify gift-card recipient
form-property conventions; platform IntersectionObserver.

## Merchant outcome
Long product pages keep the buy action reachable without configuration
(and the bar can be switched off); gift-card products offer Shopify's
native send-to-recipient flow with no app.

## Shopper outcome
Scroll a long product page and keep a compact title/price/Add-to-cart
bar at hand that always reflects the chosen variant; buying a gift card,
optionally send it to someone directly — email, name, message, and send
date — including without JavaScript.

## Behavioral requirements
1. **Sticky bar** `<qc-sticky-bar>` (setting-gated, default on): a
   bottom-fixed bar with the product title (single line, truncated),
   the current price, and an "Add to cart" button that submits the main
   product form (`form` attribute — no duplicated form). Hidden until
   JavaScript reveals it, so no-JS pages simply never show it.
2. **Visibility**: an IntersectionObserver on the main buy button shows
   the bar only while that button is scrolled out of view *above* the
   viewport bottom (i.e. the shopper has scrolled past the purchase
   area); it hides again when the button returns. No entrance animation
   beyond tokenized fade (collapses under reduced motion).
3. **State sync**: `<qc-product-page>` updates the bar's price text and
   its button label/disabled state exactly in step with the main buy
   button (Add to cart / Sold out / Unavailable, sale price shown as
   current price only — the bar stays compact). The button submits the
   form with whatever variant/plan/quantity the form holds.
4. **Layout**: 44px+ controls; the bar never overlaps dialogs (below
   them in stacking); while visible it lifts `<qc-back-to-top>` above
   itself via a CSS custom property (`--qc-sticky-offset`) instead of
   covering it.
5. **Gift recipient** (`product.gift_card?` only): a fieldset inside the
   product form with a "Send as a gift" checkbox
   (`properties[__shopify_send_gift_card_to_recipient]`) and recipient
   fields using Shopify's reserved property names: email (required when
   sending), name, message (with max length note), send-on date
   (`min` today, `max` +90 days), plus the hidden
   `properties[__shopify_offset]` timezone field (set by JS).
   - No-JS baseline: checkbox and fields are all visible and enabled;
     checking + filling posts the native gift-recipient properties.
   - With JS (`<qc-gift-recipient>`): fields are collapsed until the
     checkbox is checked, disabled while collapsed (so nothing posts
     when not gifting), email `required` only while active, offset
     filled from the browser.
6. Form errors from cart add (e.g. invalid recipient email) surface via
   the existing qc-product-form error path — unchanged.
7. All strings via locale keys; tokens-only styling; guarded JS with
   AbortController cleanup; SPEC-011..014 behaviors unchanged.

## Settings (merchant-facing)
| Setting | Type | Default |
|---|---|---|
| Show sticky purchase bar | checkbox | true |

## States & edge cases
Short pages where the buy button never leaves view (bar never shows);
sold-out / nonexistent combination (bar button mirrors disabled state);
plan selected (form posts plan — bar unchanged); non-gift-card products
(no recipient markup at all); gift-card fixture = dev store "Gift Card"
product (denominations exercise price sync); date bounds; reduced
motion.

## Accessibility acceptance
Bar is a labeled region whose button is a real submit for the main form;
it never traps or steals focus and is inert (`hidden`) whenever not
shown. Recipient fields are labeled inputs in a labeled fieldset;
collapsed state uses `hidden` (not visual tricks); checkbox state is
announced natively.

## Out of scope
Complementary/related products (final Phase 4 slice); quantity in the
sticky bar; per-block reordering of the bar.
