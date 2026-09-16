# QuillCommerce — Merchant Guide (1.0.0-beta.1)

QuillCommerce is an original Shopify Online Store 2.0 theme. Everything
below is configurable from the Theme Editor — no code required.

## Theme settings

| Group | What it controls |
|---|---|
| Typography | Primary and display fonts (Work Sans / Assistant by default) |
| Layout | Favicon, page width, and margins |
| Colors | Background, text, and accent, plus four optional overrides (button text, cards and panels, borders, errors). Everything you leave unset derives automatically with accessible contrast. Corner style and input radius live here too. |
| Cart | Cart type: **Drawer** (slide-in panel after every add — default) or **Page only** |
| Catalog | **Enable product compare** (up to 4 products), **Show second image on hover**, and the automatic **Sale badge**. Add your own card badges with product tags like `badge:Limited` (up to two show). |
| Social media | Six profile URL fields; filled ones appear as footer icons |

## Theme styles

Three ready-made styles ship with the theme — **Headwater** (deep
green on white), **Driftwood** (serif display on warm paper with
copper), and **Slate** (condensed headings on cool grey with steel
blue). Pick one at install or from Theme settings; every style is just
the six brand settings above, so you can start from any of them and
keep tuning.

## Sections you can add

- **Quick order list** — a B2B-style table of every variant in a
  chosen collection with quantity inputs and per-row add-to-cart;
  works without JavaScript.
- **Image hotspots** — pin up to six product dots onto one image; each
  opens a mini product card.
- **Promo banner** — full-width conversion strip in accent, ink, or
  raised tones with one button.
- **Promo tiles** — up to six clickable image tiles for campaigns and
  shortcuts.
- **Testimonials** — quote cards with attribution.
- **Countdown timer** — a ticking deadline with an optional button;
  shows your expired message when it ends.
- **Slideshow** — up to five image slides with headings and buttons;
  swipeable without JavaScript, with arrows, dots, and optional
  auto-rotate (paused on hover, off for reduced-motion visitors).
- **FAQ** — question/answer accordions that also emit FAQ structured
  data for Google rich results.
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
- **Contact form** — name, email, and message posted to your store's
  contact email; used by the Contact page template and addable to any
  page.
- **Utility bar** — announcement text plus country/currency and
  language selectors when your store has more than one.

## Header

The desktop menu offers two styles: **Dropdowns** (default) or a
full-width **Mega menu** that lays second-level links out as columns —
pick one in the header's settings. The mobile drawer is unchanged.

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

## Age verifier

Turn it on in Theme settings → Age verifier: a modal gate with your
heading, message, confirm and decline labels, and a decline link.
Confirmation is remembered per browser. Visitors with JavaScript
disabled are not blocked.

## Languages

English, French, German, Spanish, and Italian storefront translations
ship with the theme — add the language in your Shopify admin and the
storefront follows.

## Accessibility & performance notes

Every interactive flow works with keyboard alone and without
JavaScript (forms post natively; drawers and overlays are
progressive enhancements). Status changes are announced to screen
readers. The theme ships no JavaScript frameworks and no external
dependencies.
