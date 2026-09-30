# Metafields

Keep the model minimal and truthful. One product metafield drives the card's
"kind" line; the rest is optional spec text shown on the PDP. No computed or
invented performance scores.

## Definitions (Settings → Custom data → Products)
| Namespace.key | Name | Type | Purpose |
|---|---|---|---|
| custom.use | Primary use | Single line text | The card's kind line when more useful than the product Type. Blank → theme falls back to `product.type`. |
| custom.spec | Spec line | Single line text | Short factual spec shown on the PDP (length, weight, material). Optional. |

The theme card reads `custom.material` → `custom.use` → `product.type` (in that
order). We populate `custom.use` where it adds signal and leave it blank
elsewhere so the fallback to Type is demonstrated (e.g. Local Favorites Fly Box).

## Per-product values
| Product | custom.use | custom.spec |
|---|---|---|
| Riffle Fly Rod | All-around | 9' · 4-piece · graphite |
| Tailout Fly Rod | All-around | 9' · 4-piece · medium-fast |
| Headwaters Signature Fly Rod | All-around | 9' · 4-piece · nickel-silver |
| Riffle Fly Reel | *(blank → Reels)* | Sealed drag · large arbor |
| Headwaters Fly Reel | *(blank → Reels)* | Sealed carbon drag |
| Tapered Leader 3-Pack | *(blank → Lines & Leaders)* | 9' · knotless |
| Dry Fly Assortment | Dry flies | 12 flies · #14–18 · barbless |
| Nymph Assortment | Nymphs | 12 flies · #12–16 |
| Streamer Selection | Streamers | 6 flies · #2–6 |
| Local Favorites Fly Box | *(blank → Flies)* | Seasonal mix |
| Guide Landing Net | *(blank → Packs & Nets)* | Walnut · rubber bag |
| Waterproof Fly Box | *(blank → Packs & Nets)* | Gasketed · floats |
| Fly Tying Starter Kit | *(blank → Tools)* | Vise + materials |
| Rotary Tying Vise | *(blank → Tools)* | True rotary · #20–2/0 |
| Storm Wading Jacket | Wet weather | 3-layer · taped · waterproof zips |
| River Hoodie | Cold water | Grid fleece · midweight |
| Field Tee | High sun | Heavyweight cotton blend |
| Guide Cap | High sun | 6-panel · adjustable |
| Tailwater Gift Card | *(blank)* | *(none)* |

Local Favorites Fly Box is deliberately left with **no** `custom.use` and no
`custom.spec` — the "product without optional metadata" state.
