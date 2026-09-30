# SPEC-029 — Tailwater design system (theme-wide)

Status: Governing plan. Supersedes the abandoned SPEC-028 guided-loadout detour.
Phase: Design-quality recovery after the 6.1/10 pre-review of the home concept.
Depends on / extends: SPEC-027 (art direction).

## 1. The corrected thesis

The SPEC-027 home was a convincing skin over standard Shopify section grammar.
The recovery attempt then chased a *bespoke feature* (a rig builder) as the
"proprietary commerce idea." That was the wrong reading of the requirement.

**A Theme Store theme does not pass design review by containing a novel
configurator. It passes by being a proprietary design *system*** — where every
template, component, transition, and merchandising pattern belongs to one
sophisticated, reusable identity (cf. Prestige, Impact). An impressive feature
inside an otherwise generic theme is still a generic theme.

Non-goals: bespoke expert configurators; features that serve one merchant
category; anything that adds buyer configuration burden or reads as an app;
"polish" that leaves the generic section grammar intact.

## 2. What "distinctive" means here

The theme must be recognizable as Tailwater from a cropped screenshot of **any**
surface — home, collection, product, cart, search, quick view, 404 — without the
logo, and impossible to recreate by swapping color/font on Dawn. Distinction
lives in the *composition rules and information architecture*, applied
everywhere, not in one hero section.

## 3. The system primitives (apply across every template)

- **Grid & composition:** deliberate asymmetry; a real 12-column system with
  authored spans, not centered stacks. Fewer floating rounded containers; use
  rules, alignment, and proportion to structure the page. Hard, square editorial
  crops as the default image treatment; radius reserved for genuine interactive
  controls.
- **The field-record language (SPEC-027 §4.4), disciplined:** section index
  numbers, use-condition labels, spec data on a sand rule — as *navigation and
  information structure*, never decoration. Contour texture at most one surface
  per viewport.
- **Type roles:** Archivo structural, Newsreader editorial-only, IBM Plex Mono
  for data — consistent everywhere, never a costume.
- **Rule system:** a single family of hairline/sand rules and dividers that do
  structural work (field indexes, spec rows, section seams) instead of boxes.
- **Motion & state:** one shared set of hover/focus/reveal/loading/empty/error
  behaviors, reduced-motion aware.

## 4. Shared information architecture (one grammar, all commerce surfaces)

Collection browsing, PDP purchase hierarchy, quick view, cart, and search must
share the same header/detail/action structure, the same rules, the same overlay
grammar (SPEC-027 §7). A shopper should feel one system move from grid → product
→ quick view → cart, not six section presets.

## 5. Configurability (so it is a product, not a demo)

Every section is a **merchant-configurable composition** that keeps the identity
after Tailwater's copy and imagery are removed. Multiple compositional variants
per section (e.g. hero, editorial index, feature) so a buyer builds distinctive
pages without touching code — the identity is in the rules, not the content.

## 6. Route (ordered)

1. Remove the rig-builder detour. **[done]**
2. Keep a truthful, simple editorial kit section — no compatibility claims. **[done]**
3. Redesign header, navigation, and footer as unmistakable Tailwater. **[next]**
4. Establish the proprietary composition rules (§3) and apply across the home.
5. Bring collection, PDP, quick view, cart, search onto the shared IA (§4).
6. Build the merchant-configurable section compositions (§5).
7. Replace the entire demo catalog and photographic system.
8. Review the COMPLETE theme (every template, 1440 / 768 / 390) against §2 —
   target ≥8/10 — before resubmission.

## 7. Acceptance

- Any cropped surface is recognizably Tailwater without the logo, and not a
  Dawn color/font swap.
- Header, footer, collection, PDP, cart, quick view, and search visibly share
  one system — not independent presets.
- Removing Tailwater's copy/imagery leaves a coherent, distinctive system a
  generic merchant can adopt.
- The complete theme (not one section) reviews at ≥8/10 (Dawn = 5, top-paid = 9).
