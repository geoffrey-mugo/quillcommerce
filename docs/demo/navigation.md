# Navigation

Flat, honest fly-shop axes. Every destination must exist before the link is
created — no empty targets, no undefined collections, no fragile anchors.

## Primary menu (handle: `main-menu`)
- **Rods** → `/collections/rods`
- **Reels** → `/collections/reels`
- **Flies** → `/collections/flies`
- **Tackle** → `/collections/tackle`
- **Apparel** → `/collections/apparel`
- **Field Notes** → `/blogs/journal`

Home lives in the wordmark; Contact lives in the footer. Apparel is one axis, not
a four-child menu of one-item collections. "Conditions" is removed (it was
invented to serve the old homepage, with no real merchandising logic).

## Footer — Shop (handle: `footer-shop`)
- Rods → `/collections/rods`
- Reels → `/collections/reels`
- Flies → `/collections/flies`
- Tackle → `/collections/tackle`
- Apparel → `/collections/apparel`
- New arrivals → `/collections/new-arrivals`
- Gift card → `/products/tailwater-gift-card` *(exists only after the gift card is
  created manually in Admin — create it before adding this link)*

## Footer — Support (handle: `footer-support`)
- Contact → `/pages/contact`
- Shipping → `/pages/shipping`
- Returns & repairs → `/pages/returns-repairs`
- Size guide → `/pages/size-guide`
- FAQ → `/pages/faq`

## Footer — Field Notes (handle: `footer-field-notes`)
- Journal → `/blogs/journal`
- About → `/pages/about`

## Theme wiring (during the unfreeze, after menus exist)
- Header primary menu = `main-menu`.
- Footer blocks: col 1 `footer-shop` ("Shop"), col 2 `footer-support`
  ("Support"), col 3 `footer-field-notes` ("Field notes").
- The removed "Shop by condition" home section is reworked at unfreeze into a
  "Shop by category" index pointing at Rods / Flies / Apparel / Tackle (real
  collections), or dropped — decided against real content, not invented tags.
