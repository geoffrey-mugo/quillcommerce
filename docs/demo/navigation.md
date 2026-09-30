# Navigation

Every destination must exist before the link is created (no empty targets).
Handles reference collections.md (collections), pages.md (pages), and
field-reports.md (blog + articles).

## Primary menu (handle: `main-menu`)
- **Equipment** → `/collections/equipment`
  - Rods → `/collections/rods`
  - Reels → `/collections/reels`
  - Lines & Leaders → `/collections/lines-leaders`
  - Flies → `/collections/flies`
  - Tools → `/collections/tools`
  - Packs & Nets → `/collections/packs-nets`
- **Apparel** → `/collections/apparel`
  - Outerwear → `/collections/outerwear`
  - Layers → `/collections/layers`
  - Base layers → `/collections/base-layers`
  - Headwear → `/collections/headwear`
- **Conditions** → `/collections/conditions` *(or first child)*
  - Cold water → `/collections/cold-water`
  - Wet weather → `/collections/wet-weather`
  - High sun → `/collections/high-sun`
  - Base camp → `/collections/base-camp`
- **Field Notes** → `/blogs/journal`
  - Journal → `/blogs/journal`
  - Guides → `/blogs/journal/tagged/guide`

Primary axes = Equipment, Apparel, Conditions, Field Notes (four real retail
axes). Home lives in the wordmark; Contact lives in the footer — neither occupies
primary navigation.

## Footer — Shop (handle: `footer-shop`)
- Rods → `/collections/rods`
- Reels → `/collections/reels`
- Apparel → `/collections/apparel`
- Flies → `/collections/flies`
- New arrivals → `/collections/new-arrivals`
- Gift cards → `/products/tailwater-gift-card`

## Footer — Support (handle: `footer-support`)
- Contact → `/pages/contact`
- Shipping → `/pages/shipping`
- Returns & repairs → `/pages/returns-repairs`
- Size guide → `/pages/size-guide`
- FAQ → `/pages/faq`

## Footer — Field Notes (handle: `footer-field-notes`)
- Journal → `/blogs/journal`
- About → `/pages/about`
- Our guides → `/pages/about#guides`

## Theme wiring (after menus exist, during unfreeze)
- Header section → primary menu = `main-menu`.
- Footer blocks → column 1 `footer-shop` (heading "Shop"), column 2
  `footer-support` (heading "Support"), column 3 `footer-field-notes`
  (heading "Field notes").
