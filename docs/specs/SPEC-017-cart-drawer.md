# SPEC-017 · Cart drawer & unified Ajax cart editing

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE5-SLICE1-VERIFICATION.md)
Phase: 5, slice 1
Provenance: Original QuillCommerce design; Shopify Ajax Cart API
(`/cart/change.js`, `/cart/update.js`), Section Rendering API, native
`<dialog>`; builds on the SPEC-005 `qc:cart-updated` / `qc:announce`
event contract.

## Merchant outcome
A slide-in cart keeps shoppers in flow after every add, with a theme
setting to prefer the classic cart-page-only behavior. No configuration
beyond that choice.

## Shopper outcome
Adding any product opens a cart panel showing exactly what the cart page
shows — same lines, discounts, plan names, unit prices; quantities and
removals apply instantly (both in the drawer and on the cart page)
without losing your place; checkout or the full cart is one tap away.
Keyboard and screen-reader flows work throughout; without JavaScript the
existing page-based cart flow is untouched.

## Behavioral requirements
1. **Setting**: `cart_type` (select `drawer` | `page`, default drawer)
   in a new Cart group of theme settings. `page` renders no drawer
   markup and leaves today's behavior exactly as is.
2. **Drawer section** (`sections/qc-cart-drawer.liquid`, statically
   rendered from the layout, not addable): a native `<dialog
   scroll-lock>` side panel (right, full height, ≤26rem) labeled from
   the cart title, containing a heading with live item count, a close
   button, the shared `qc-cart-line` list (drawer-prefixed input ids so
   the cart page's ids never collide), cart-level discounts, subtotal,
   taxes note, a checkout form (`POST /cart`, `name="checkout"`), a
   "View cart" link, and the empty state with "Continue shopping".
3. **Opening**: the header cart link gets `data-qc-cart-open`; with the
   drawer present its click opens the drawer instead of navigating
   (no-JS keeps the link). A successful product add (`qc:cart-updated`
   with `source: 'add'`, emitted by qc-product-form) opens it too. Close
   via the button, Escape (native), or backdrop click; focus restore is
   native dialog behavior.
4. **Unified line editing** (`<qc-cart-lines>` wrapping the line list in
   BOTH the drawer and the cart page): a quantity input change posts
   `/cart/change.js` for that line's key; the remove link is intercepted
   to quantity 0 (its href stays the no-JS path). Mutations are
   serialized (a busy flag ignores overlapping edits), errors are
   announced and the surface re-synced to server truth.
5. **Refresh contract**: every `qc:cart-updated` makes each
   `qc-cart-lines` re-fetch its own section
   (`location.pathname?section_id=<its section id>`) and swap its inner
   content — so drawer and cart page stay consistent with each other and
   with quick-add from any surface. Focus on a control inside the
   swapped region is restored by element id after the swap. The count
   badge continues to update via the existing qc-cart-count.
6. **Cart page Ajax**: with JS, the Update button hides
   (`data-qc-cart-update`); the note textarea (when shown) saves via
   `/cart/update.js` on change with an announced confirmation. No-JS
   keeps the update/checkout/note POST flow untouched.
7. **Announcements**: line edits announce the localized "Cart updated"
   message; add announcements are unchanged.
8. All strings via locale keys; tokens-only styling; guarded custom
   elements with AbortController cleanup; no new dependencies.

## Settings (merchant-facing)
| Setting | Type | Default |
|---|---|---|
| Cart type | select drawer / page | drawer |

## States & edge cases
Empty cart (drawer empty state; opening from header still works);
mutation while one is in flight (ignored); item made unavailable
between renders (server truth wins on refresh); discounts and selling
plans on lines (shared snippet renders both); duplicate input ids
across drawer + cart page (prefix); drawer on the cart page itself
(both surfaces refresh from one edit); JS off (no drawer, page flow).

## Accessibility acceptance
Dialog labeled; close button first-focusable and 44px; item count in
the heading; announcements on every mutation; focus preserved across
content swaps; remove links keep their product-name SR suffix; scroll
locked while open.

## Out of scope
Compare and recently-viewed (later Phase 5 slices), free-shipping
meter, cart upsells.
