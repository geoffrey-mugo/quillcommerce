# QuillCommerce — Merchant Guide (Skeleton line, 1.0.0-alpha)

QuillCommerce is an original Shopify Online Store 2.0 theme. Everything
below is configurable from the Theme Editor — no code required.

## Theme settings

| Group | What it controls |
|---|---|
| Typography | Primary and display fonts (system fonts by default — fastest) |
| Layout | Page width and margins |
| Colors | Background, foreground, one accent color, input corner radius, corner style (sharp / soft / round). All other colors are derived automatically with accessible contrast. |
| Cart | Cart type: **Drawer** (slide-in panel after every add — default) or **Page only** |
| Catalog | **Enable product compare** (card checkboxes + side-by-side table, up to 4 products) |
| Social media | Six profile URL fields; filled ones appear as footer icons |

## Sections you can add

- **Hero banner** — cover image with contrast overlay, heading, two
  buttons, small/medium/large height. Turn on "Use as page heading
  (H1)" on exactly one section per page (the home template ships this
  way).
- **Rich text**, **Image with text**, **Multi-column** — editorial
  blocks with alignment / image-position / per-column controls.
- **Featured collection** — product card strip from any collection with
  an optional View all link.
- **Catalog navigator** — collection tiles or a compact link list.
- **Newsletter signup** — email capture into your Shopify customers
  (tagged `newsletter`). Submissions may pass through Shopify's
  spam-protection captcha; that is a store setting, not a theme one.
- **Product recommendations** — "related" is automatic; "complementary"
  uses your Search & Discovery pairings.
- **Recently viewed** — each shopper's own history; private to their
  browser.
- **Utility bar** — announcement text plus country/currency and
  language selectors when your store has more than one.

## Product page

Everything reacts to the shopper's variant choice with no setup:
gallery with thumbnails and full-size zoom, price/SKU/stock (with a
configurable low-stock threshold), selling-plan options with per-plan
prices, unit prices and quantity rules where configured, pickup
availability per location (enable Local Pickup in Settings → Shipping,
and give the location a street address), sticky purchase bar (setting),
gift-card recipient fields on gift cards, and collapsible rows you add
as blocks (Shipping & returns, Care, …) fed by text or an existing
page.

## Cart

The drawer mirrors the cart page exactly — quantities, removals, and
the order note apply instantly on both. Switch to "Page only" in
Theme settings → Cart to disable the drawer.

## Customer accounts

Classic-accounts templates (login, registration, recovery, activation,
reset, account, orders, addresses) are included and styled. Stores on
Shopify's new customer accounts use Shopify-hosted pages instead —
both work; nothing to configure.

## Accessibility & performance notes

Every interactive flow works with keyboard alone and without
JavaScript (forms post natively; drawers and overlays are
progressive enhancements). Status changes are announced to screen
readers. The theme ships no JavaScript frameworks and no external
dependencies.
