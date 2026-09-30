# Homepage merchandising map

Each home section points at real, populated content. The invented "Conditions"
axis is gone; the home shows real categories and one coherent apparel set. Home
section internals are revisited during the theme unfreeze (SPEC-029).

| Section | Content source | Notes |
|---|---|---|
| Hero | Editorial image `river-hero` | Copy references only what we sell (rods, reels, flies, apparel). Replace the fictional coordinate eyebrow with a factual structural label (e.g. "Bend, Oregon — fly shop"). CTA 1 → `/collections/apparel`, CTA 2 → `/collections/rods`. |
| Shop by category | Real collections | Rods → `/collections/rods` · Flies → `/collections/flies` · Tackle → `/collections/tackle` · Apparel → `/collections/apparel`. Tile image = each collection's featured shot. (Replaces the old "Shop by condition".) |
| Field kit (editorial + cards) | Collection `apparel` | Lead image `apparel-editorial`; cards = Storm Jacket, River Hoodie, Field Tee, Guide Cap — one coherent 4-piece capsule. |
| Material note | Image `material-closeup` | Statement about the Storm Jacket's recycled 3-layer shell; three facts from its spec/material metafields. |
| Field report | Article "Three cold mornings on the Deschutes" | Place/date/excerpt from field-reports.md Article 1; link → the article. |
| Service proof | Pages | Repairs/Returns → `/pages/returns-repairs`, Shipping → `/pages/shipping`. Factual, from pages.md. |

## Coherence rules
- Apparel appears as a coherent capsule; fly gear reaches through categories and
  nav — the two are both present without being mixed inside one grid.
- Every home image comes from the one editorial/product series (photography.md).
- No section links to an empty collection or an unpublished article.
