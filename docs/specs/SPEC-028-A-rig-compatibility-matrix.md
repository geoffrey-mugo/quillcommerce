# SPEC-028-A — Rig compatibility matrix (catalog proof)

Status: **BLOCKED — not yet proof.** The v1 of this matrix was rejected in review
for four material defects (no fly line; leader/tippet conflated; indefensible
heavy tippet; over-coarse match rules). This v2 corrects the technical model and
converts the matrix into an **exact-combination spec** that states precisely what
the catalog must contain. It becomes proof only once the "must add" items exist
and the enumerated combinations are verified against live variants.

Source data: live dev catalog (saasquill-app-dev), audited 2026-09-30.
Domain rules grounded in Orvis guidance (tippet ≈ fly size ÷ 3; trout streamers
2X–4X; dries/nymphs 4X–6X): https://howtoflyfish.orvis.com/how-to-articles/tippet-chart/

## 1. Corrected technical model

A complete rig is **five** dependent components, not four:

`use case → rod (line weight) → fly line (weight + taper) → reel (size/capacity) → leader + tippet (X by fly size) → flies (size/type)`

Rules (the compatibility keys):

1. **Fly line weight = rod line weight**, always (a 5WT rod is cast with a 5WT
   line). **Taper** follows use case: Double Taper (DT) for delicate small-water
   presentation; Weight Forward (WF) for all-around; a bass/streamer taper for
   big flies. Fly line is the missing central dependency and must be added.
2. **Reel size holds that line + backing** and balances the rod: `4/5 ↔ 4–5WT`,
   `5/6 ↔ 5–6WT`, `7/8 ↔ 7–8WT`. A reel size is valid only for the weights it
   brackets — not an undifferentiated 6–8WT range.
3. **Leader ≠ tippet.** A tapered leader is the turnover section knotted to the
   fly line; tippet is replacement material added to its end. The store's
   "Tapered Leader 3-Pack" is a *tapered leader* — its option must read
   "Leader (X)", and a separate tippet-material SKU is needed for the streamer
   rig's heavier X.
4. **Tippet/leader X is set by FLY SIZE, not rod weight** (Orvis divide-by-3):
   `#16–20 dries → 5X–6X` · `#12–16 nymphs → 4X–5X` · `#2–8 streamers → 0X–3X`.
   So the rig's tippet is derived from the chosen flies, and the fly products
   must expose a size range.

## 2. Catalog audit: exists vs. must add

| Component | Status | Detail |
|---|---|---|
| Rods w/ Line Weight | EXISTS | Starter 4/5/6 · Explorer 3/5/6/8 · Signature 4/5/6 · Creek Pack (single) |
| Reels w/ Size | EXISTS | Starter 4/5·5/6·7/8 · Explorer 4/5·5/6·7/8 · Signature 5/6·7/8 |
| Tapered leader 4X/5X/6X | EXISTS (relabel) | "Tapered Leader 3-Pack"; option rename "Tippet"→"Leader (X)" |
| **Fly line (WF/DT, per weight)** | **MUST ADD** | central dependency; at least 4/5/8WT WF floating (+ DT for creek) |
| **Heavier leader/tippet 0X–3X** | **MUST ADD** | streamer/bass rig; 2X–3X minimum |
| **Fly size ranges on fly products** | **MUST ADD** | e.g. Dry #14–18, Nymph #12–16, Streamer #2–6, so tippet derives correctly |

Until the three "must add" rows exist, no truthful complete rig can be enumerated.

## 3. Narrowed rigs (three specific weights, exact combinations)

Each rig is one exact, verifiable configuration plus real alternatives. `(ADD)`
marks a component that does not yet exist in the catalog.

### A. 4WT — small-creek trout, dry flies
- Fly line: 4WT Double-Taper floating `(ADD)`
- Rod: Starter 4WT $129 · Signature 4WT $549 · Creek Pack (single) $189
- Reel: Starter 4/5 $79 · Explorer 4/5 $199
- Leader: Tapered Leader 5X $14  ·  tippet 5X `(ADD, optional)`
- Flies: Dry Fly Assortment `(ADD size #14–18)` $34 · Local Favorites $29
- Tippet 5X is correct for #16–18 dries (18 ÷ 3 = 6 → 5–6X). Defensible.

### B. 5WT — all-around river trout, nymphs
- Fly line: 5WT Weight-Forward floating `(ADD)`
- Rod: Starter 5WT $129 · Explorer 5WT $249 · Signature 5WT $549
- Reel: Starter 5/6 $79 · Explorer 5/6 $199 · Signature 5/6 $429
- Leader: Tapered Leader 4X $14
- Flies: Nymph Assortment `(ADD size #12–16)` $39 · Local Favorites $29
- Tippet 4X is correct for #12–14 nymphs (12 ÷ 3 = 4). Defensible.

### C. 8WT — bass & big trout, streamers
- Fly line: 8WT Weight-Forward / streamer taper floating `(ADD)`
- Rod: Explorer 8WT $249 (single 8WT rod in catalog)
- Reel: Starter 7/8 $79 · Explorer 7/8 $199 · Signature 7/8 $429
- Leader + tippet: 2X–3X leader/tippet `(ADD)` — 4X is too light for #2–6 streamers
- Flies: Streamer Selection `(ADD size #2–6)` $44
- Only Explorer offers 8WT, so rod choice is thin; either accept a single-rod
  heavy rig or add a second 8WT rod.

## 4. Reusable framework (unchanged intent, corrected keys)

Roles are ordered and merchant-labelled; one role is the **driver** (Rod →
`Line Weight`); dependent roles declare a **match axis** and a merchant-editable
map. The corrected model adds a **fly-line role bound 1:1 to the driver weight**,
and a **fly-size → tippet-X derivation** so tippet follows the flies, not the rod.
A non-fishing merchant supplies their own roles, driver, axes, and maps.

## 5. What "proof" now requires (before any interface)

1. Add fly line (4/5/8WT, correct tapers) with a real product image.
2. Add 2X–3X leader/tippet material for the streamer rig.
3. Add fly-size ranges to the fly products; relabel the leader option.
4. Verify each enumerated combination against live variant IDs and exact totals.
5. Re-review this matrix. Only then design the interface around the dependencies.
