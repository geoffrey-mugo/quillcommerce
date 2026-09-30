# SPEC-028 — Guided Loadout (configurable use-case / system-role merchandising)

Status: Approved direction; MVP implementation starting
Phase: Design-quality recovery (follows the 6.1/10 pre-review audit of the
SPEC-027 home concept)
Depends on: SPEC-027 (art direction), SPEC-005 (cart/quick-add contracts),
SPEC-009 (native facets), SPEC-011 (PDP)
Provenance: Original QuillCommerce mechanic. No reference source, markup, asset,
copy, or composition may be copied.

## 1. Problem

The SPEC-027 home is a convincing skin over standard Shopify section grammar
(split hero, collection cards, image-with-text, reassurance strip). The audit
scored it 6.1/10 and would fail Shopify pre-review because nothing about how
*merchandising works* is proprietary. Craft and photography lift the score to
about 7 at most; only a proprietary commerce mechanic reaches the ≥8 that §8 of
SPEC-027 requires before rollout.

## 2. The mechanic (and what it is not)

The proprietary mechanic is a **guided loadout**: the shopper picks a **use
case**, and the store composes a small, ordered set of products — one per
**system role** — that work together, with a single coherent action to add the
whole set to cart.

- The value is the guided-composition mechanic, **not** the fishing vocabulary.
- It is **not** a bundle discount app, a generic "shop the look," or a
  four-tile collection grid with numbers drawn on it.
- It is **not** a wall of invented performance scores. No "condition rating."
  Only explicit, factual attributes a merchant can defend (waterproof mm,
  insulation weight, stated intended conditions).

## 3. Configurability (hard requirement)

A $300 commercial theme must not force any merchant to think in "cold water" or
"shell." Both taxonomies are merchant-defined:

- **Use case** — the selector axis. Label is a setting (default "Condition").
  Demo values: Cold water, Wet weather, High sun, Base camp.
- **System role** — the ordered positions in a loadout. Labels are settings.
  Demo values: Base, Mid, Shell, Pack, Accessory.

Population is configurable and layered, simplest first:

1. **Merchant-selected products** per role, per use case (section blocks). This
   is the MVP source and requires no product data model.
2. Later: **metafield / tag mapping** so a role/use-case can populate
   dynamically from the catalog. Only added after the composition is proven.

A merchant who sells lighting could relabel use case = "Room", roles = "Ambient
/ Task / Accent" and get the same guided loadout with zero fishing residue.

## 4. MVP scope (prove the composition before any data model)

Build exactly this, end to end, and judge it at 1440 / 768 / 390 before
expanding:

1. **One use-case selector** that swaps a four-position loadout in place.
2. **Four numbered role positions**, each showing a merchant-selected product
   (image, role marker, title, price).
3. **One "Add loadout" action** with **per-item variant resolution**: any
   multi-variant item exposes a native variant `select`; the action adds every
   resolved item in a single cart request through the existing QuillCommerce
   cart-updated event + toast + drawer contract (SPEC-005). Single-variant items
   need no selector.
4. **Product cards** gain at most **one** restrained role marker (mono, in the
   info stack) — never a second dashboard of ratings. In loadout context the
   role is positional, so no product data is required for the MVP.
5. **PDP** shows the product's role and the adjacent compatible products in the
   same loadout (later slice; needs role data).
6. **Collection filtering** uses **Shopify's native filter system**
   (`filter.*` URL params / `collection.filters`). No bespoke filtering engine.

### 4.1 Progressive enhancement

- No-JS: render the first (or every) use case; each role item is a real link to
  its product; the multi-add "Add loadout" button is hidden or degrades to a
  link. Nothing depends on script to browse.
- The selector is keyboard operable (tablist semantics), respects reduced
  motion, and never traps focus.
- Errors, confirmations, and the cart drawer reuse existing primitives; no new
  cart contract is introduced.

## 5. Data contract (MVP = none; documented for the later phase)

MVP reads only section settings/blocks. When dynamic population is added:

- Namespace `custom` (or a documented setting) → `role` (single-line) and
  `use_case` (list). Tag fallback `role:*`, `use:*`. A product with neither
  simply never auto-populates a loadout; merchant selection always wins.
- No computed scores are stored or displayed. Factual attributes only, surfaced
  where they are true of a specific product/variant.

## 6. Acceptance

- The loadout reads as a mechanic that could only belong to this theme, at all
  three widths, with real (merchant-selected, coherent) products — no snowboards
  or unrelated inventory in the composition.
- Relabeling use case and roles produces a coherent loadout with no fishing
  residue (verify by renaming in the editor).
- "Add loadout" adds all resolved items in one action; multi-variant items are
  resolved explicitly; the cart/toast/drawer behave exactly as elsewhere.
- No invented ratings. No bespoke collection-filter engine. No product data
  model shipped before the composition is accepted.
- Re-audit target: the home concept clears ≥8/10 before store-wide rollout.

## 7. Sequence

1. `qc-loadout` section + `qc-loadout.js` (selector + numbered roles + Add
   loadout with per-item variant resolution), merchant-selected products.
2. Replace the generic "featured field kit" centerpiece with the loadout;
   re-audit the home at three widths.
3. Card role marker (single, restrained) once role data exists.
4. PDP role + compatible products.
5. Native collection filtering mapped to use case; dynamic metafield/tag
   population.
6. Coherent photography series; header/footer to the Tailwater system; craft
   debts from the audit (corner discipline, mobile length, tablet layout, Blaze
   use).
