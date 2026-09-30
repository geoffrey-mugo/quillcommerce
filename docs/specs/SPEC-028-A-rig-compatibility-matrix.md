# SPEC-028-A — Rig compatibility matrix (catalog proof)

Status: Proof artifact for sign-off. The guided-loadout interface (SPEC-028) is
redesigned around these dependencies **only after** this matrix is accepted.
Source data: live dev catalog (saasquill-app-dev), audited 2026-09-30 via the
storefront product JSON. Every weight, size, tippet, and price below is real.

## 1. Why this document exists

A guided builder is only credible if the catalog supports real choice and real
compatibility. This proves the store can form **at least two truthful complete
rigs** with defensible line-weight relationships across
`use case → rod → reel → line/leader → flies`. It does — three are shown.

## 2. Real attributes in the catalog

| Role | Product | Compatibility axis | Real values (price) |
|---|---|---|---|
| Rod | Starter Series Fly Rod | Line Weight | 4WT · 5WT · 6WT ($129) |
| Rod | Explorer Series Fly Rod | Line Weight | 3WT · 5WT · 6WT · 8WT ($249) |
| Rod | Signature Series Fly Rod | Line Weight | 4WT · 5WT · 6WT ($549) |
| Rod | Creek Pack Rod | — (single) | packable, small-water ($189) |
| Reel | Starter Series Fly Reel | Size | 4/5 · 5/6 · 7/8 ($79) |
| Reel | Explorer Series Fly Reel | Size | 4/5 · 5/6 · 7/8 ($199) |
| Reel | Signature Series Fly Reel | Size | 5/6 · 7/8 ($429) |
| Leader | Tapered Leader 3-Pack | Tippet | 4X · 5X · 6X ($14) |
| Flies | Dry Fly Assortment | — | rising trout ($34) |
| Flies | Nymph Assortment | — | subsurface, all-around ($39) |
| Flies | Streamer Selection | — | big fish, moving water ($44) |
| Flies | Local Favorites Fly Box | — | all-around ($29) |

## 3. Compatibility rules (the "keys")

Rod **line weight is the master key**. Everything downstream derives from it.

- **Reel size brackets the rod weight** (fly reels are sized to line-weight ranges):
  `4WT → 4/5` · `5WT → 5/6` (4/5 also valid) · `6WT → 5/6 or 7/8` · `8WT → 7/8`.
- **Tippet (leader X) scales with weight / fly size** — lighter rods fish smaller
  flies on finer tippet: `3–4WT → 6X/5X` · `5WT → 5X/4X` · `6WT → 4X` · `8WT → 4X`
  (4X is the coarsest tippet stocked; suitable through moderate streamers).
- **Flies follow the use case** (species / water), correlated with weight:
  small water → dries; all-around → nymphs / local favorites; big water → streamers.

Changing the rod weight therefore **re-derives** the valid reel size and suggested
tippet; a manually chosen mismatch (e.g. a 7/8 reel on a 4WT rod) is flagged, not
silently allowed.

## 4. The three proven rigs

Each use case sets a target weight, then offers real alternatives per stage. The
"Recommended" column is the default configuration and its exact total.

### A. Small-creek trout — 4-weight, delicate dries
- **Rod (4WT):** Starter 4WT $129 · Signature 4WT $549 · Creek Pack Rod $189 (travel)
- **Reel (4/5):** Starter 4/5 $79 · Explorer 4/5 $199
- **Leader:** Tapered Leader 5X $14 (6X alt)
- **Flies:** Dry Fly Assortment $34 · Local Favorites $29
- **Recommended:** Starter 4WT + Starter 4/5 + 5X + Dry Fly = **$256**
- Plain-language: "9', 4-weight for tight water · 4/5 reel balances it · 5X tippet
  for size 16–20 dries · dries for rising trout."

### B. All-around river trout — 5-weight, the do-everything
- **Rod (5WT):** Starter 5WT $129 · Explorer 5WT $249 · Signature 5WT $549
- **Reel (5/6):** Starter 5/6 $79 · Explorer 5/6 $199 · Signature 5/6 $429
- **Leader:** Tapered Leader 4X $14 (5X alt)
- **Flies:** Nymph Assortment $39 · Local Favorites $29
- **Recommended:** Explorer 5WT + Explorer 5/6 + 4X + Nymph = **$501**
- Plain-language: "The one rod that does most rivers · 5/6 reel, matched drag ·
  4X turns over weighted nymphs · everyday subsurface flies."

### C. Big water — bass & big trout, 8-weight streamers
- **Rod (6–8WT):** Explorer 8WT $249 · Signature 6WT $549 · Starter 6WT $129
- **Reel (7/8):** Starter 7/8 $79 · Explorer 7/8 $199 · Signature 7/8 $429
- **Leader:** Tapered Leader 4X $14 (heaviest stocked)
- **Flies:** Streamer Selection $44
- **Recommended:** Explorer 8WT + Explorer 7/8 + 4X + Streamer = **$506**
- Plain-language: "8-weight backbone throws big flies into wind · 7/8 reel with
  capacity for hard runs · heavier tippet · streamers for bass and big trout."

Range within a single use case is real: rig B runs **$251** (Starter rod +
Starter reel + 4X + Local Favorites) to **$1,031** (Signature rod + Signature
reel + 4X + Nymph) depending on the shopper's choices — genuine build-your-own
economics, not a fixed bundle.

## 5. Reusable framework (Tailwater-specific values, generic architecture)

The demo is deeply fly-fishing-specific; the theme is not. The section models:

- **Roles** — an ordered list. Each role has a merchant label ("Rod", "Reel", …)
  and a source (selected products or a collection).
- **A driver role** — one role whose variant option is the master compatibility
  key (here Rod → `Line Weight`).
- **Match config per dependent role** — the variant option it matches on
  (`Reel → Size`, `Leader → Tippet`) plus a merchant-editable map from each driver
  value to allowed values (`4WT → [4/5]`, `5WT → [5/6, 4/5]`, `8WT → [7/8]`; and a
  tippet map). Rows with no map entry are flagged incompatible.
- **Use cases** — named presets that pin a starting driver value and a curated
  option set (label examples: river size, species, condition).

A sunglasses merchant would set roles Frame/Lens, driver Frame → `Base Curve`,
match Lens → `Base Curve`, and their own map — same mechanic, no fishing residue.

## 6. Verdict

The catalog **supports a real builder**: three complete, truthful rigs; 2–3 genuine
alternatives at every stage; defensible weight → reel-size → tippet relationships;
exact configured totals; a single add. Cleared to design the interface around
these dependencies.

## 7. Open question for sign-off

One honest caveat to confirm: **4X is the coarsest tippet stocked**, so use case C
is pitched at bass / big trout rather than true steelhead/salmon (which want
heavier leader we do not carry). Either that framing is accepted, or a heavier
tippet/leader is added to the catalog before C ships.
