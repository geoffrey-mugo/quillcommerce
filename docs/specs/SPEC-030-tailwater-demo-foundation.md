# SPEC-030 — Tailwater demo-store foundation

Status: Active. Theme code is **frozen** until this foundation exists in the
store. Route: freeze code → build this foundation → resume shell design against
real data → produce the state matrix → home composition (SPEC-029 §6).
Premise (accepted): a commercial theme is reviewed *on its demo store*. Demo
content is part of the product; an incoherent demo is an unfinished submission.

## 1. Brand architecture

**Tailwater Supply Co.** — a river outfitter for fly anglers. It sells two
departments *deliberately*, the way a real fly shop does (cf. Orvis): **fishing
Equipment** and **technical Apparel** for time on the water. Voice: informed,
terse, practical. No fake scarcity, invented performance claims, or decorative
wilderness filler.

- Wordmark "Tailwater Supply Co." (theme `brand_name` — shipped).
- Favicon, `shop.name`, SEO metadata, and email sender must all read Tailwater;
  **zero "SaaSQuill" / "QC" / snowboard / dev references** anywhere customer-visible.

## 2. Category strategy

Two primary departments + one cross-cutting use axis + New arrivals:

- **Equipment** → Rods · Reels · Lines & Leaders · Flies · Tools · Packs & Nets
- **Apparel** → Outerwear · Layers · Base layers · Headwear
- **Conditions** (use-case, cross-cutting) → Cold water · Wet weather · High sun · Base camp
- **New arrivals**

Apparel and Equipment coexist only because the brand is an outfitter that sells
both — this is the deliberate architecture the mix requires.

## 3. Catalog (clean existing, rename, remove, add)

Realistic names/descriptions/variants/prices. **Remove**: the three snowboards,
the dev "Selling Plans Ski Wax", and any "QC Test" naming.

| Product | Dept · Category | Variants (option) | Price | Demonstrates |
|---|---|---|---|---|
| Riffle Fly Rod | Equipment · Rods | Line Weight 4/5/6WT | $129 | multi-variant, best-seller |
| Tailout Fly Rod | Equipment · Rods | Line Weight 3/5/6/8WT | $249 | multi-variant |
| Headwaters Signature Fly Rod | Equipment · Rods | Line Weight 4/5/6WT | $549 | premium, long title |
| Creek Pack Rod (4-piece) | Equipment · Rods | — | $189 | single-variant, travel |
| Riffle Fly Reel | Equipment · Reels | Size 4/5·5/6·7/8 | $79 | multi-variant |
| Tailout Fly Reel | Equipment · Reels | Size 4/5·5/6·7/8 | $199 | multi-variant |
| Headwaters Fly Reel | Equipment · Reels | Size 5/6·7/8 | $429 | **sold out** (set 0 inv) |
| Tapered Leader 3-Pack | Equipment · Lines & Leaders | Tippet 4X/5X/6X | $14 | low price, multi-variant |
| Dry Fly Assortment | Equipment · Flies | — | $34 | single-variant, best-seller |
| Nymph Assortment | Equipment · Flies | — | $39 | single-variant |
| Streamer Selection | Equipment · Flies | — | $44 → ~~$49~~ | **sale** (compare-at) |
| Local Favorites Fly Box | Equipment · Flies | — | $29 | no optional metadata |
| Fly Tying Starter Kit | Equipment · Tools | — | $119 | single-variant |
| Rotary Tying Vise | Equipment · Tools | — | $159 | single-variant |
| Tying Thread Set | Equipment · Tools | — | $24 | single-variant |
| Natural Dubbing Dispenser | Equipment · Tools | — | $19 | single-variant |
| Magnetic Net Release | Equipment · Packs & Nets | — | $18 → ~~$21~~ | sale |
| Waterproof Fly Box | Equipment · Packs & Nets | — | $22 | single-variant |
| Guide Landing Net | Equipment · Packs & Nets | — | $89 | **add** — net imagery |
| Storm Wading Jacket | Apparel · Outerwear | Size XS–XXL × Color (2) | $180–$210 | **price range**, sale, multi-option |
| River Hoodie | Apparel · Layers | Size XS–XXL | $64 | multi-variant |
| Field Tee | Apparel · Base layers | Size XS–XXL | $28 | multi-variant, entry price |
| Guide Cap | Apparel · Headwear | — | $26 | single-variant |
| Gift Card | (gift card) | denominations | — | gift-card card |

Commerce-state coverage (SPEC-029 acceptance): single- & multi-variant ✓ · sale
✓ (Streamer, Net Release, Storm Jacket) · sold out ✓ (Headwaters Reel) · long
title ✓ (Signature Rod) · price range ✓ (Storm Jacket) · product without optional
metadata ✓ (Local Favorites). Recommendations/related: driven by Search &
Discovery once ≥ ~20 products exist (above list = 24).

## 4. Collections (each visually + conceptually coherent)

- **Rods, Reels, Lines & Leaders, Flies, Tools, Packs & Nets** — by `product.type`.
- **Outerwear, Layers, Base layers, Headwear** — apparel by type/tag.
- **Conditions**: Cold water / Wet weather / High sun / Base camp — curated
  (tag `condition:*`); each contains a coherent mix (e.g. Wet weather = Storm
  Jacket, Waterproof Fly Box, a taped layer).
- **New arrivals** — newest ~8, coherent.
- The homepage editorial-kit collection must contain products that belong
  together (Apparel · Layers, not rods beside snowboards).

## 5. Navigation (real destinations for every link)

- **Primary:** Equipment ▸ (Rods, Reels, Lines & Leaders, Flies, Tools, Packs &
  Nets) · Apparel ▸ (Outerwear, Layers, Base layers, Headwear) · Conditions ▸
  (Cold water, Wet weather, High sun, Base camp) · Field Notes ▸ (Journal, Guides)
- **Footer — Shop:** Rods, Reels, Apparel, Flies, New arrivals, Gift cards
- **Footer — Support:** Contact, Shipping, Returns & repairs, Size guide, FAQ
- **Footer — Field Notes:** Journal, About, Our guides
- No link may point at an empty page. Every destination in §6 must exist first.

## 6. Editorial content (real information, not filler)

Pages: **About** (the outfitter's story + where it fishes), **Shipping**
(carriers, timing, thresholds), **Returns & repairs** (window, process, the free
first-season repair), **Size guide** (apparel sizing chart + a rod line-weight /
reel-size reference), **Contact**, **FAQ**. Blog "Journal" with **≥2 field
reports** carrying place/date and genuine observations (e.g. "Three cold mornings
on the Deschutes", "Reading a freestone creek in low water") and ≥1 "Guide"
how-to. Copy contains actual, checkable information.

## 7. Photography system (one coherent visual language)

- **Product**: consistent 4:5 crop on the paper surface (#F2EFE5), even margins,
  soft daylight, no drop shadows — a single studio treatment across all products.
- **Lifestyle/editorial**: one coherent river/trail series (single source and
  grade), subdued natural light, believable settings; no scattered unrelated
  stock passed off as one campaign.
- **Provenance**: every asset logged in `docs/provenance/REFERENCE-LOG.md` with
  source, license, and usage. Sourced from a licensable set (e.g. one Pexels/
  Unsplash collection) or commissioned; consistent, attributed, ledgered.

## 8. Execution (this needs store admin — theme CLI auth cannot do it)

Building products, collections, menus, pages, articles, and images is
**store-data** work. Two paths:

1. **Owner-run:** Claude generates a Shopify **product-import CSV**, collection
   definitions, the menu tree, and all page/article copy; the owner imports the
   CSV and creates collections/menus/pages/images in admin. No credentials shared.
2. **Scripted:** the owner creates a custom app with `write_products`,
   `write_content`, `write_online_store_navigation` (etc.) and shares the Admin
   API token; Claude scripts the whole foundation reproducibly, with provenance.
   (Higher setup + token trust; far faster and repeatable.)

Photography must be sourced/curated either way. Decide the path, then build once.

## 9. Definition of done

Every §1–§7 item exists in the store, coherently; no dev/placeholder residue;
every nav link resolves; all commerce states are demonstrable on real products.
Only then does theme code unfreeze and shell design resume against real data.
