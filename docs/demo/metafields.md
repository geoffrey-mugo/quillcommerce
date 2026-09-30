# Metafields

The theme card reads the "kind" line in this order:
`custom.material` → `custom.use` → `product.type`. All three consumers are
defined below (the earlier pack referenced `custom.material` without defining it —
fixed). No computed or invented performance scores; factual attributes only.

## Definitions (Settings → Custom data → Products)
| Namespace.key | Name | Type | Purpose |
|---|---|---|---|
| custom.material | Material | Single line text | Apparel fabric; shown as the card kind line when set. Blank on non-apparel. |
| custom.use | Primary use | Single line text | A factual use, shown when more useful than Type and when material is blank. |
| custom.spec | Spec line | Single line text | Short factual spec shown on the PDP. Optional. |

Precedence means: apparel shows its **material**; fly gear shows a factual **use**
(or falls back to **Type**); a product with none shows its **Type**.

## Per-product values
| Product | custom.material | custom.use | custom.spec |
|---|---|---|---|
| Riffle Fly Rod | — | All-around | 9ft · 4-piece · graphite |
| Tailout Fly Rod | — | All-water | 9ft · 4-piece · medium-fast |
| Headwaters Signature Fly Rod | — | All-around | 9ft · 4-piece · nickel-silver |
| Riffle Fly Reel | — | — | Sealed drag · large arbor |
| Headwaters Fly Reel | — | — | Sealed carbon drag |
| Tapered Leader 3-Pack | — | — | 9ft · knotless |
| Dry Fly Assortment | — | Dry flies | 12 flies · #14–18 · barbless |
| Nymph Assortment | — | Nymphs | 12 flies · #12–16 |
| Streamer Selection | — | Streamers | 6 flies · #2–6 |
| Local Favorites Fly Box | — | — | — |
| Guide Landing Net | — | — | Walnut · rubber bag |
| Waterproof Fly Box | — | — | Gasketed · floats |
| Fly Tying Starter Kit | — | — | Vise + materials |
| Rotary Tying Vise | — | — | True rotary · #20–2/0 |
| Storm Wading Jacket | Recycled 3-layer nylon | — | Taped seams · waterproof zips |
| River Hoodie | Grid fleece | — | Midweight |
| Field Tee | Heavyweight cotton blend | — | — |
| Guide Cap | — | — | 6-panel · adjustable |
| Tailwater Gift Card (manual) | — | — | — |

**Local Favorites Fly Box** is deliberately left with no metafields — the
"product without optional metadata" state (kind line falls back to `Flies`).
