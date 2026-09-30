# Collections

Honest architecture: **Tailwater is a fly shop with a small apparel capsule.**
Six shoppable collections, consolidated so grids are not sparse. The invented
"Conditions" taxonomy is removed. All handles must exist before any menu links to
them (navigation.md).

| Handle | Title | Rule | Members | Count |
|---|---|---|---|---|
| rods | Rods | Type = Rods | Riffle, Tailout, Headwaters Signature | 3 |
| reels | Reels | Type = Reels | Riffle Reel, Headwaters Reel | 2 |
| flies | Flies | Type = Flies | Dry, Nymph, Streamer, Local Favorites | 4 |
| tackle | Tackle | Tag = leader/net/accessory/tools *(or manual)* | Tapered Leader, Guide Net, Waterproof Box, Tying Kit, Rotary Vise | 5 |
| apparel | Apparel | Tag = apparel | Storm Jacket, River Hoodie, Field Tee, Guide Cap | 4 |
| new-arrivals | New arrivals | Manual — a coherent ~6 (e.g. Storm Jacket, Tailout Rod, Riffle Reel, Streamer Selection, River Hoodie, Guide Net) | ~6 |

## Honest notes (not padded to hit numbers)
- **Reels has 2 models.** A small fly shop legitimately carries a couple of reel
  lines; this is real, not a gap disguised as architecture. If a 2-item grid
  reads thin at review, fold Reels under Rods as "Rods & Reels" (5) at build time.
- **Tackle** deliberately groups leaders, nets, boxes and tying tools so the
  category is dense (5) rather than four one-item sub-collections.
- **Apparel is one capsule collection**, not four sub-collections of one item —
  and it does NOT get co-equal primary-nav prominence with the fly gear.

## Build rules
- The homepage "field kit" section points at `apparel` (a coherent 4-piece set).
- Set each collection's featured image to its lead product's primary shot
  (photography.md); collection cards must look like one set.
- Verify no collection is empty before wiring navigation.
- The gift card is created manually in Admin (Shopify cannot create gift-card
  products via CSV); it is not a collection member.
