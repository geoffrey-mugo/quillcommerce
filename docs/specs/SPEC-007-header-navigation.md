# SPEC-007 · Header & navigation

Status: Implemented (verified 2026-09-14 on saasquill-app-dev; multi-level fixture pending)
Phase: 3, slice 1
Provenance: Original QuillCommerce design; native details/dialog semantics;
Shopify menus (linklists), routes, and customer account component docs.

## Merchant outcome
Assign a menu, optional logo, and a sticky mode; get a header that presents
up to three menu levels on desktop and mobile, with search, account, and a
live cart count — no configuration beyond Navigation.

## Shopper outcome
Reach any menu destination by pointer, touch, or keyboard alone; open and
dismiss submenus predictably (Escape, outside click, Tab); on mobile, browse
the same menu in a drawer that traps focus only while open; never lose the
cart count or account entry.

## Behavioral requirements
1. **Composition** (one row, original layout): mobile menu button (mobile
   only) · logo (image setting w/ width, else shop name) linking home ·
   desktop nav · icon cluster: search link (predictive search upgrades it in
   a later slice), Shopify account component (when accounts enabled), cart
   link with `<qc-cart-count>`.
2. **Desktop nav**: top-level links; items with children render as native
   `details/summary` disclosures; children with their own children render as
   nested disclosures inside the panel (≥3 levels). Enhancement (JS):
   sibling disclosures close when one opens; Escape closes the open
   disclosure and returns focus to its summary; clicking outside closes all.
   Without JS, disclosures still open/close natively.
3. **Mobile drawer**: menu button (labeled, `aria-expanded` not needed —
   dialog semantics) opens a native `<dialog scroll-lock>` drawer containing
   the same menu as a nested-disclosure accordion plus the search link;
   close button first; Escape/backdrop close; focus returns to the menu
   button (shared dialog pattern from SPEC-006).
4. **Sticky modes** (setting): none · always (CSS `position: sticky`) ·
   on-scroll-up (JS: header translates out after scrolling down past its own
   height, returns on any upward scroll; transition obeys reduced motion;
   focus inside the header always reveals it).
5. Active top-level item (`link.current` / child_active) is visibly and
   programmatically indicated (`aria-current="page"` on current link).
6. All strings via locale keys; menu defaults to `main-menu`; empty menu
   renders header without a nav landmark error.
7. JS in `assets/qc-header.js`: guarded defines, AbortController listener
   cleanup, no timers, passive scroll listener; safe across editor reloads.

## Settings (merchant-facing)
| Setting | Type | Default | Notes |
|---|---|---|---|
| Logo | image_picker | — | falls back to shop name |
| Logo width | range 60–240px | 120 | |
| Menu | link_list | main-menu | |
| Sticky header | select none/always/scroll-up | scroll-up | |

## States & edge cases
Empty menu; 1-level menu; 3-level menu; very long labels; many top-level
items (nav wraps, never overflows horizontally); RTL; account disabled;
JS disabled (native disclosures + drawer link fallback: menu button hidden,
nav rendered in page flow? — no: without JS the mobile menu button is a
no-op <summary> alternative: drawer markup uses details at small sizes...).
Decision: mobile fallback uses a details-based disclosure containing the
accordion (no dialog) so no-JS mobile users still get the full menu; JS
upgrades it to the dialog drawer.

## Accessibility acceptance
Nav is a labeled `<nav>`; disclosure summaries announce expanded state
natively; keyboard-only traversal reaches every third-level link; sticky
reveal never hides focused controls; drawer close returns focus; touch
targets ≥44px.

## Out of scope
Utility bar, mega-nav promotional panels (later Phase 3 slices), predictive
search, localization selectors.
