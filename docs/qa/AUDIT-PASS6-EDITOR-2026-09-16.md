# Pass 6 — Theme Editor & merchant configuration — 2026-09-16

Two layers: exhaustive static validation of everything the editor
renders from (schemas, presets, templates, locales), plus behavioral
verification of every operation the editor performs on the preview
DOM, run against the shipped code on the dev theme. The editor itself
was opened in the admin (its preview loaded the theme with zero theme
console errors — the only message was Shopify's own cross-origin
iframe-sync warning), but its UI could not be driven interactively:
the desktop Chrome window was not visible, and the editor renders
inside a cross-origin iframe reachable only via screen interaction.

## Static validation (scripted, all clean)

- `settings_data.json`: zero orphan keys after the Pass 2 setting
  removal.
- Every JSON template, template group, and listing copy: all section
  types exist, every pinned setting id is in its section's schema,
  every block type and block setting valid.
- Every `t:` key in every schema resolves in
  `en.default.schema.json` (206 keys, no orphans, no raw keys that
  would render literally in the picker).
- Availability rules complete (Pass 2): API-only sections have no
  presets (never addable), template sections bound via JSON, all 18
  content sections carry `disabled_on`, utility bar `enabled_on`
  header, recommendations `enabled_on` product.

## Editor-operation behavior (live, shipped code)

Simulated exactly what the editor does to the preview DOM:

- **Setting change (section re-render)**: replaced the header section
  with a fresh Section Rendering API render + `shopify:section:load`
  — cart icon still opens the drawer (delegated document listener),
  search dialog works (new custom element self-connects).
- **Section reorder (disconnect + reconnect)**: moving the header,
  the live region, and the whole product section leaves everything
  working — drawer opens, exactly one aria-live node (no duplicate
  regions), variant pills still drive full sync (price/SKU).
- **Slideshow**: autoplay running after connect, still running after
  a reorder move (the Pass 1 timer-null fix — previously it died),
  `shopify:block:select` on a slide stops autoplay and shows that
  slide, deselect restarts it.
- **Countdown**: exactly 4 unit cells before and after a reorder
  (previously duplicated to 8), still ticking.
- **Age gate**: with `Shopify.designMode` the gate never opens (no
  merchant trap); on the storefront it opens, confirm closes it and
  persists per browser.
- Design-mode empty-state hints (catalog navigator, quick order)
  confirmed present in source; they render only under
  `request.design_mode`.

No code changes were needed this pass — all editor-resilience fixes
from Passes 1–2 held under direct behavioral test. Gates: theme check
94 files / 0 offenses, provenance clean.
