# Submission-blocker remediation — 2026-09-15

Owner review identified four Theme Store submission blockers. Three were
code-side and are fixed and live-verified on theme #149206040653
("QuillCommerce DEV — skeleton 1.0.0-beta.1"); the fourth requires
infrastructure the repository cannot provide.

## 1. Locale-unsafe cart/search endpoints — FIXED

Hardcoded root-relative Ajax endpoints broke on stores with URL-prefixed
locales (`/fr/…`).

- `layout/theme.liquid` now emits `Shopify.routes.root` (Shopify's
  documented pattern) plus a `window.qcRoutes` map built entirely from
  Liquid `routes` (`cart_url`, `cart_add_url`, `cart_change_url`,
  `cart_update_url`, `search_url`, `predictive_search_url`).
- `assets/qc-cart.js`: `/cart.js`, `/cart/change.js`, `/cart/update.js`
  → `qcRoute(name, fallback) + '.js'`.
- `assets/qc-search.js`: `/search/suggest.json` → localized
  `predictive_search_url + '.json'`; `/search` fallback now goes through
  `qcRoutes.search`.
- Already locale-safe (unchanged): quick-add posts to `form.action`
  (Liquid `routes.cart_add_url`); compare / recently-viewed / header
  search consume `data-search-url="{{ routes.search_url }}"`; quick view
  and pickup use document-relative URLs; recommendations use the
  Liquid-provided `product.url`-based endpoint.

Verified live: `window.qcRoutes` present; cart read, line change
(no-op quantity), note update, and predictive suggest all 200 through
the new builders; cart contents restored byte-identical.

## 2. Developer marketing in shipped defaults — FIXED

- `config/settings_data.json`: removed default
  instagram.com/quillcommerce and youtube.com/quillcommerce social URLs
  (all six social settings now ship blank; footer renders no icons until
  the merchant sets them).
- `sections/footer-group.json`: default blurb no longer contains
  "Built by Saas Quill".
- Sweep: no "Saas Quill"/"saasquill"/"quillcommerce" strings remain in
  shipping files except theme code comments naming the theme itself and
  the `theme_info` block (developer name/docs/support — where Shopify
  requires it).

## 3. Merchant color settings — EXPANDED (3 → 7)

The three-input derived palette (Background / Text / Accent →
`color-mix` OKLab token system, SPEC-002) is retained as the default
behavior. Four optional override colors were added, blank by default so
derivation still governs until a merchant opts in:

| setting | overrides token | used for |
| --- | --- | --- |
| Button text | `--qc-accent-ink` | text on accent buttons |
| Cards and panels | `--qc-surface-raised` | card/panel backgrounds |
| Borders and lines | `--qc-line` | hairlines, input borders |
| Errors and alerts | `--qc-danger` | form errors, danger badges |

Implementation: schema group `t:general.colors` (+ paragraph note),
labels in `locales/en.default.schema.json`, conditional emission in
`snippets/css-variables.liquid` (`{% if setting != blank %}`) after the
derived block. Verified live: with all four unset the rendered `:root`
contains exactly one definition per token and no empty declarations —
zero visual change to the default palette.

## 4. Docs/support domain does not resolve — OWNER ACTION REQUIRED

`theme_info` points at `https://saasquill.com/docs/quillcommerce` and
`https://saasquill.com/support`; the domain has no DNS. The theme cannot
fix this: either stand up saasquill.com (docs content already exists at
`docs/MERCHANT-GUIDE.md`, ready to publish) or supply alternate
resolving URLs and update `config/settings_schema.json` `theme_info`.

## Gates

Theme Check 75 files / 0 offenses · `node --check` passes on all
modules · provenance scan clean · full push to #149206040653 ·
screenshots re-shot (footer no longer shows default social icons).
