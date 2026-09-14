# SPEC-005 · Cart event coordinator & standard quick add

Status: Implemented (verified 2026-09-14 on saasquill-app-dev)
Phase: 2, slice 1
Provenance: Original QuillCommerce architecture; Shopify Ajax Cart API docs.
First JavaScript in the theme — sets the component pattern (custom elements,
lifecycle cleanup, abortable fetches, documented events) for everything after.

## Merchant outcome
Shoppers can add single-variant products straight from any product card, and
the header cart count stays correct everywhere — with zero configuration and
no behavior loss when JavaScript is unavailable.

## Shopper outcome
Press "Add to cart" on a card or product page; see a busy state, then
confirmation; hear the result via screen reader; watch the cart count update
without a page reload. Without JavaScript, the same controls still work via
normal form posts.

## Behavioral requirements
1. **Event contract** (documented, versioned by name): after any successful
   cart mutation, `document` receives `qc:cart-updated` with
   `detail: { cart }` (the `/cart.js` payload). Components never poll.
2. **`<qc-cart-count>`**: renders `cart.item_count`; subscribes on
   `connectedCallback`, unsubscribes on `disconnectedCallback`; hidden when
   count is 0; count changes are not individually announced (the action
   announcement covers it).
3. **`<qc-product-form>`**: wraps any Liquid form posting to the cart-add
   route (card quick add and PDP form). Enhancement on submit:
   - prevent default; guard against double submission while in flight;
   - set the submit button `aria-busy` and swap label to the "Adding…"
     string; restore after;
   - POST `routes.cart_add_url` (JSON), then GET `/cart.js`, dispatch
     `qc:cart-updated`;
   - success: announce "<product> added to cart"; PDP/card stay in place
     (no redirect);
   - failure (HTTP error or Shopify error payload): render the message in
     an inline `.qc-field__error` within the component and announce it;
     never lose the shopper's quantity input;
   - in-flight requests use AbortController; a superseding submit aborts
     the previous one; listeners are removed on `disconnectedCallback`.
4. **`<qc-live-region>`**: single visually-hidden `aria-live="polite"`
   region in the layout; receives text via `qc:announce` events; clears and
   re-sets content so repeated messages are re-announced.
5. **Card quick add**: single-variant, available products render a quick-add
   form (hidden id + submit button) in the card footer; multi-variant
   products render a quiet "Choose options" link to the product page
   (the quick-view dialog replaces this in slice 2); unavailable products
   keep the Sold-out badge only.
6. **No-JS baseline**: the quick-add form posts normally (Shopify redirects
   to /cart); the PDP form behaves as in Phase 1.
7. **Theme Editor lifecycle**: all elements define guarded
   (`customElements.get` check); re-inserted sections re-initialize via
   `connectedCallback` alone; no document-level listeners except the
   coordinator's own event plumbing.
8. All strings via locale keys; no third-party calls; no storage.

## Settings (merchant-facing)
None (quick add display options arrive with Phase 3 grid settings).

## States & edge cases
Double-click on add; two cards submitted in quick succession (both resolve,
count reflects final state); network failure (error message + restored
button); sold-out race (Shopify 422 message shown); JS disabled.

## Accessibility acceptance
Busy state conveyed by `aria-busy` + label change; result announced once in
the live region; error text tied to the form via `role="alert"`; buttons
remain ≥44px; focus stays on the triggering button throughout.

## Out of scope
Quick view dialog (slice 2), cart-page Ajax line editing (Phase 5), cart
drawer (Phase 5).
