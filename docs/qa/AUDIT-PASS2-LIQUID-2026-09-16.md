# Pass 2 — Liquid, sections, blocks & theme architecture — 2026-09-16

Scope: templates, JSON templates, sections, snippets, schemas,
settings, localization, and OS 2.0 conventions. All 45 sections, 15
snippets, both layouts, both theme blocks, all schemas, and all
templates were traced before anything was changed.

## Bugs fixed (incorrect Liquid)

1. **search.liquid — broken "Clear all" on filtered search.**
   `routes.search_url | append: '?q=' | append: terms | url_encode`
   encoded the whole URL (`%2Fsearch%3Fq%3D…`). Terms are now encoded
   first, then appended. Verified live: href is `/search?q=snowboard`.
2. **qc-account.liquid — "Welcome back, !" for customers without a
   first name.** `t: name: x | default: y` applied the default to the
   translated sentence, never to the name. Assigned first.
3. **qc-order.liquid — cancelled-order date mangled.** `time_tag` was
   applied to the translated sentence instead of the date. Assigned
   first (article.liquid already used the correct pattern).

## Merchant experience / settings

4. **`input_corner_radius` did nothing** — Skeleton leftover in the
   Colors group; corners are driven by `corner_style`. Removed.
5. **Low-stock threshold unified.** The product section had a
   configurable threshold while quick view hardcoded `10`, so the two
   surfaces could disagree. Now one global setting
   (Theme settings → Catalog, default 10) drives the product page,
   the sticky/JS state, and quick view.
6. **Store-specific demo copy removed from footer defaults.**
   `footer-group.json` shipped the blurb "Original gear for people who
   use it." to every fresh store; blanked (the blurb hides when
   empty).

## Theme Editor

7. **Section availability completed.** 18 content sections with
   presets had no `disabled_on`, so a hero, FAQ, or slideshow could be
   added inside the header/footer groups and break layout. All now
   disable header+footer; qc-newsletter, qc-rich-text, and
   qc-multi-column disable header only (footer placement is a
   legitimate pattern). Matches the pre-existing rules on product,
   featured-product, custom-liquid, recommendations, utility-bar.
8. **qc-quick-view schema name translated** (`t:general.quick_view`;
   was a literal "Quick view").

## Dead code removed

9. **`blocks/group.liquid` + `blocks/text.liquid`** — Skeleton theme
   blocks no section accepts (`@theme` appears nowhere); their
   `{% stylesheet %}` CSS was shipping in the compiled styles.css.
   Deleted with 16 orphaned schema-locale keys.

## Localization

10. **Untranslated `<title>` fragments** ("tagged …", "Page N") in
    meta-tags.liquid now use `general.meta.tags` / `general.meta.page`,
    added to all 5 storefront locales (252 keys, parity verified).
    No other untranslated storefront strings found (full-body scan).

## Verified clean (no action)

- **Snippets:** all 15 in use, each single-responsibility, max nesting
  depth 2 (section → card → price/image/icon). No excessive splitting.
- **Duplication:** the product / featured-product / quick-view buy
  boxes intentionally differ (full sync vs. no-JS select); merging
  them would create hidden cross-section dependencies for ~30 shared
  lines. Cart page and drawer already share `qc-cart-line`.
- **Every schema setting is consumed** (scripted check, section +
  block level, dynamic keys accounted for); every section reachable
  (template-bound, preset, or API endpoint); no duplicate templates.
- **Routes:** all URLs via `routes.*` objects; only hardcoded host is
  the fonts.shopifycdn.com preconnect. No dev-store assumptions in
  shipping files.
- **Loops:** paginated at 24/8/10; quick-order's product×variant table
  is capped by its limit setting; card swatch scan bounded by 3
  options. No unbounded nested loops.
- **OS 2.0:** JSON templates everywhere (gift_card is Liquid by
  design), app blocks on product + featured product, sections/groups,
  presets, empty states with `request.design_mode` hints, dynamic
  sources available on resource settings.

## Render verification

All templates fetched on the dev theme after the push: home,
collection, list-collections, product, cart, search (plain +
filtered), blog, article path, page, 404, quick-view section render —
all 200 with zero Liquid/translation errors. Account templates
redirect to hosted login on this store (new customer accounts).

Gates: theme check 94 files / 0 offenses, all schemas + JSON valid,
provenance scan clean, locale parity 252 × 5.
