# Collections

All handles must exist before any menu links to them (navigation.md). Type-based
collections use automated conditions; Conditions and New arrivals are noted.

## Department: Equipment (by product Type)
| Handle | Title | Rule | Members (from products.csv) |
|---|---|---|---|
| rods | Rods | Type = Rods | Riffle, Tailout, Headwaters Signature |
| reels | Reels | Type = Reels | Riffle Reel, Headwaters Reel |
| lines-leaders | Lines & Leaders | Type = Lines & Leaders | Tapered Leader 3-Pack |
| flies | Flies | Type = Flies | Dry, Nymph, Streamer, Local Favorites |
| tools | Tools | Type = Tools | Fly Tying Starter Kit, Rotary Tying Vise |
| packs-nets | Packs & Nets | Type = Packs & Nets | Guide Landing Net, Waterproof Fly Box |
| equipment | Equipment | Tag = Equipment | all of the above |

## Department: Apparel (by product Type)
| Handle | Title | Rule | Members |
|---|---|---|---|
| outerwear | Outerwear | Type = Outerwear | Storm Wading Jacket |
| layers | Layers | Type = Layers | River Hoodie |
| base-layers | Base layers | Type = Base layers | Field Tee |
| headwear | Headwear | Type = Headwear | Guide Cap |
| apparel | Apparel | Tag = Apparel | all of the above |

## Conditions (cross-cutting use axis — tag `condition:*`)
| Handle | Title | Rule | Members |
|---|---|---|---|
| cold-water | Cold water | Tag = condition:cold-water | River Hoodie, Headwaters Signature Rod |
| wet-weather | Wet weather | Tag = condition:wet-weather | Storm Wading Jacket, Streamer Selection, Tailout Rod |
| high-sun | High sun | Tag = condition:high-sun | Field Tee, Guide Cap, Riffle Rod |
| base-camp | Base camp | Tag = condition:base-camp | Fly Tying Starter Kit, Guide Landing Net |

Each Conditions collection is intentionally cross-department (apparel + equipment)
so the use axis reads as a real merchandising idea, not a duplicate of Type.

## New arrivals
| Handle | Title | Rule |
|---|---|---|
| new-arrivals | New arrivals | Manual — newest ~8, coherent (mix a few apparel + equipment that photograph as one set) |

## Homepage editorial-kit collection
The home "field kit" section points at **apparel** (coherent Layers/Outerwear),
never a mixed automated collection. See merchandising.md.

## Notes
- Set each collection's **featured image** to the lead product's primary shot
  (photography.md) so collection cards are coherent.
- Verify no collection is empty before wiring navigation.
