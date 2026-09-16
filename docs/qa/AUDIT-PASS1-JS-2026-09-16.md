# Pass 1 — JavaScript architecture & reliability — 2026-09-16

Scope: the 13 JS modules only (2,001 lines). Every file read in full;
every finding verified against live behavior on the dev theme before
and after the fix. No Liquid/CSS changes.

## Architecture verdict (unchanged by design)

- All scripts load `type="module"` — per-file scope, so same-named
  top-level consts (`STORE_KEY` in compare and recently-viewed) never
  collide.
- Cross-module contract stays two document events (`qc:cart-updated`,
  `qc:announce`) + `window.qcRoutes`. No new coupling introduced.
- Every component keeps `disconnectedCallback` + AbortController
  signal cleanup; init is guarded by `customElements.get`.

## Defects found and fixed

1. **qc-cart.js — rapid stepper clicks dropped** (`changeLine` busy
   flag returned early, so taps past the first were lost and the next
   refresh snapped the input back). Now queued per line, latest wins,
   replayed when the in-flight request settles; the `qc:cart-updated`
   refresh is held while a replay is queued so only the final state
   renders. Verified: 4 same-tick `+` clicks → server qty 5 in 2
   requests; 4 `−` clicks → back to 1.
2. **qc-slideshow.js — autoplay dead after editor reorder.**
   `disconnectedCallback` cleared the interval without nulling
   `this.timer`, so `this.timer ??=` never restarted it on reconnect.
3. **qc-countdown.js — duplicated D/H/M/S cells after reconnect**
   (connect appended a second row of unit cells). Units container is
   now rebuilt with `replaceChildren()`.
4. **qc-cart.js — qc-live-region piled up duplicate live-region nodes
   across reconnects.** Existing `[aria-live]` child is reused.
5. **qc-cart.js — raw JSON parse errors shown to shoppers.** A
   non-JSON error body (rate-limit/gateway page) in `qc-product-form`
   or `changeLine` surfaced `SyntaxError: Unexpected token…`. Both
   now parse with a fallback and show the localized error label.
6. **qc-compare.js — MutationObserver ran a full toggle re-query on
   every body mutation** (each toast, each cart re-render). Coalesced
   to one pass per animation frame; rAF cancelled on disconnect.

## Verified clean (no action)

qc-search (inflight abort, superseded-response guard, debounce
cleanup), qc-facets (swap abort, popstate guard, refocus), qc-header,
qc-quick-view (session memoisation, `qcFor` supersession, singleton
dialog), qc-product (pickup fetch abort, guarded variants JSON,
`replaceState` try/catch, deferred sticky-bar setup), qc-gallery,
qc-gift-recipient, qc-back-to-top, qc-recently-viewed and
qc-recommendations (abort + self-removal safe), qc-age-gate.

## Live behavior matrix (browser, dev theme)

- Rapid cart steppers: final quantity lands both directions, no
  snap-back, latest-wins collapses requests.
- Drawer open/close ×3: opens each time, lines stay in sync (6/6).
- Rapid variant switching (2 full rounds): checked pills, `id` field,
  URL `?variant`, price, and Pre-order label all agree at rest.
- Quick view ×3 + supersession (open A then B same tick): one dialog
  node, B's content wins.
- Facets: two same-tick sort changes → first fetch aborted, final URL
  and price order correct, re-rendered `qc-facets` alive, aria-busy
  cleared.
- Card quick-add: toast with product name, badge 6→7, cart restored.
- Predictive search: 9 rapid keystrokes → exactly one
  `suggest.json` request, results for the final query.
- Mobile menu drawer ×3 at 375px: opens/dismisses each cycle.
- Console: zero JS exceptions across all flows; only Shopify's own
  `login_with_shop` 401s on the password-protected dev store. All
  theme endpoints (cart.js, change.js, add, suggest.json, section
  renders) returned 200.

Gates: `node --check` ×13 pass, theme check 96 files / 0 offenses,
provenance scan clean.
