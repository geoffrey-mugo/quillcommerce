# QuillCommerce Theme Store baseline — 2026-09-28

## Scope and release target

- Release target: Shopify Theme Store. This is confirmed by the owner's
  submission and the design-quality pre-review rejection, and is consistent
  with D-001.
- Active roadmap phase: Phase 0 reopened after the pre-review rejection.
- Vertical slice: current-state eligibility, provenance, dependency, and
  design-quality baseline only. No storefront feature or styling changes are
  part of this slice.
- Repository inspected: `quillcommerce-theme`, branch `skeleton`, HEAD
  `436fb91`.
- The prohibited legacy repository was not used as an implementation or audit
  source for this baseline.

## Executive verdict

The codebase has a credible Theme Store foundation, but the release is not
submission-ready. Skeleton lineage, Theme Check, JSON structure, JavaScript
syntax, core commerce coverage, and the shipping-directory provenance scan are
clean. The blocking failure is the product itself: Shopify rejected the demo at
the pre-review design-quality gate, and the current storefront does not meet the
published requirements for a distinctive, industry-specific art direction and
an inspiring, coherent demo experience.

The old `submission-ready` conclusions in the 2026-09-14 through 2026-09-16 QA
records are superseded by the real review result. They remain useful historical
test evidence, not current release approval.

## Foundation and eligibility

| Area | Status | Evidence / consequence |
|---|---|---|
| Approved foundation | Pass | `skeleton` has root commit `1b6f103` (Shopify Skeleton import recorded at `a4f32d3`); the prototype tag is not an ancestor of HEAD. |
| Theme Store route | Pass | D-001 designates the Skeleton line as the only Theme Store line. |
| Theme structure | Pass | Required shipping directories and required JSON/Liquid templates are present. Header and footer use section groups. |
| Theme Check | Pass | 92 files inspected, 0 offenses on 2026-09-28. |
| Shipping provenance scan | Pass | No prohibited identifiers in `assets`, `blocks`, `config`, `layout`, `locales`, `sections`, `snippets`, or `templates`. |
| Third-party code | Pass with documentation caveat | Skeleton is the only recorded code dependency. No package manager, framework, minified bundle, source map, or bundled third-party font was found. |
| Design uniqueness | **Fail / release blocker** | Shopify pre-review rejected the theme as insufficiently distinctive or sophisticated. The audited demo scored 4.0/10 on a scale where Dawn is 5. |
| Demo-store quality | **Fail / release blocker** | The live demo mixes generic presentation, QA-like content, weak hierarchy, and unresolved overlay/sticky collisions. It does not currently present one convincing merchant or catalog story. |
| Install/demo parity | **Fail / release blocker** | `templates/index.json` contains `shopify://shop_images/*` references and demo collection handles (`automated-collection`, `hydrogen`, `frontpage`). Those resources do not reliably exist on install. |
| Documentation accuracy | **Fail / release blocker** | `docs/MERCHANT-GUIDE.md` and `docs/LISTING.md` still promise three styles after `settings_data.json` and recent commits reduced the release to one preset. Payload-size claims are also stale. |

## Existing capability matrix

| Capability | Current state | Baseline assessment |
|---|---|---|
| Foundation and shell | Tokens, responsive grid, typography settings, focus system, icons, responsive image helper, section groups | Functionally present; visual system needs replacement rather than cosmetic tuning. |
| Catalog discovery | Multi-level navigation, dropdown/mega menu, predictive search, collection/search facets and sorting, catalog navigator | Present. Interaction and composition require redesign; mobile and overlay QA must be rerun. |
| Canonical product card | Shared card across collection, search, recommendations, recently viewed, and merchandising contexts; variants, quantity, quick view, compare, swatches | Functionally rich but visually overfilled. It is a primary design blocker and must be re-authored around image-first browsing and progressive disclosure. |
| Product page | Media, rich media, variants, selling plans, pricing states, unit/volume pricing, pickup, gift recipient, accelerated checkout, sticky purchase bar, app and Custom Liquid blocks | Broad feature coverage is present. The desktop composition, information hierarchy, and mobile sticky/compare coexistence fail the premium bar. |
| Cart | Page and drawer, quantity/removal, notes, discounts, taxes messaging, selling plans, checkout and accelerated checkout | Present. Drawer composition and empty/low-line-count states need visual redesign. |
| Search / quick view / compare | Predictive search dialog, product quick view, bounded compare state and dialog | Present. The systems are visually inconsistent in scale and collide on mobile; they need one shared overlay grammar. |
| Merchandising | Hero, slideshow, featured collection/product, editorial/content sections, promo sections, FAQ, hotspots, quick order, recommendations | Extensive section count is present, but quantity has not produced a distinctive authored storefront. Homepage composition is a design blocker. |
| Localization and accounts | Five storefront locales, country/language selectors, classic account templates, `<shopify-account>`, Follow on Shop | Present based on static inspection and prior QA; current cross-browser/live verification is stale. |
| SEO and social | Canonical/title/description, Open Graph/Twitter tags, `page_image`, product structured data, social icons | Present. |
| Progressive enhancement | Native forms/fallback links with custom-element enhancement | Present by architecture and prior QA; must be preserved during redesign. |

## Shopify-required gaps and unverified gates

### Confirmed blockers

1. **Unique and intentional design:** failed in Shopify's actual pre-review.
   The current generic white/green system, conventional section stack, boxed
   control-heavy cards, and weak page-level composition do not establish a
   defensible theme identity.
2. **Professional, coherent demo experience:** failed. Product imagery,
   merchandising voice, layout behavior, and content do not read as one
   believable premium technical-outdoor merchant.
3. **Intentional layouts under real content:** failed in the audited demo.
   Examples include large dead areas, clipped search controls, underscaled
   desktop quick view, and compare/sticky-purchase collisions on mobile.
4. **Portable defaults:** failed. Demo-specific image and collection resources
   are committed in `templates/index.json`.
5. **Documentation consistency:** failed. The merchant guide and listing do not
   match the one-preset install state.

### Present in code but requiring fresh verification

- Populated home, collection, and product Lighthouse averages on mobile and
  desktop. Historical scores predate the final card/preset changes and the
  rejected demo state.
- Safari, Firefox, Edge, Samsung Internet, and Instagram/Facebook/Pinterest
  webview coverage. Historical records explicitly leave parts of this matrix
  open.
- Full Theme Store benchmark fixture checklist, including gift-card recipient
  output data, subscriptions, unit pricing, volume pricing, rich media,
  partially unavailable variants, and inventory failures.
- Theme Editor install state after removing all demo-store-specific resources.
- Public documentation and support endpoints, including content parity with the
  current theme settings.

No additional mandatory commerce feature was proven absent by this static
baseline. The next technical qualification pass must use Shopify's current
review fixtures rather than treating older bespoke QA as equivalent.

## Automated checks run on 2026-09-28

| Check | Exact result |
|---|---|
| `shopify theme check` | Pass — 92 files inspected, 0 offenses. |
| JSON parse, ignoring Shopify-generated leading block comments | Pass — 23 files parsed. |
| Raw guide `jq empty` command | Fail — 11 Shopify-generated JSON files contain leading block comments. This is a limitation of the raw command, not malformed Shopify JSON; Theme Check passes them. |
| JavaScript syntax (`node --check assets/*.js`) | Pass — all modules. |
| Shipping-directory prohibited-string scan | Pass — no matches. |
| Source-map scan | Pass — no `sourceMappingURL` or `webpack://` references. |
| Sass/minified asset scan | Pass — no `.scss`, `.scss.liquid`, `.min.css`, or `.min.js`. |
| First-party asset byte count | 109,944 bytes unminified across tracked files in `assets/`; older 73 KB / 87 KB documentation claims are stale. |
| Working tree preservation | Existing user change left untouched: `.DS_Store`. |

## Provenance and asset-license gaps

- `docs/provenance/DEPENDENCIES.md` says there are no external assets, while
  `THIRD_PARTY_NOTICES.md` and `docs/DEMO-IMAGE-CREDITS.txt` identify Pexels
  demo photography. The code-package and demo-store scopes need to be stated
  separately.
- The Pexels ledger records photo IDs but not the photographer/rights holder,
  direct canonical photo URL, acquisition date, local/store filename status,
  or an explicit depicted-trademark/model review for every retained image.
- The Pexels license permits commercial website/template use, but depicted
  people, trademarks, and brands can carry separate rights. The prior retired
  asset list proves this risk is real, so every image in the new Tailwater set
  needs an individual visual-rights check.
- The approved Tailwater reference set and the public Shopify requirements used
  for the redesign are not yet logged in `REFERENCE-LOG.md`.
- No new third-party code or distributed binary assets were introduced by this
  audit.

## Recommended recovery plan

The repository does not need another foundation migration; it is already on the
eligible Skeleton line. It needs a design-system and demo-store recovery built
on that foundation:

1. Reconcile Phase 0 records: this baseline, current Theme Store requirements,
   reference log, demo-asset ledger, one-preset documentation, and portable
   install defaults.
2. Write a neutral Tailwater art-direction specification before storefront
   code: technical/outdoor merchant, field-system composition, type roles,
   palette, photography rules, product-card disclosure model, and unified
   overlay behavior.
3. Prototype and validate one fully art-directed home page plus the canonical
   product card at desktop and mobile widths.
4. Rebuild the product page and the shared overlay/cart language from the same
   system; explicitly resolve fixed-UI stacking and safe-area behavior.
5. Roll the system through collection/search/supporting templates, replace the
   demo catalog and imagery, then rerun the complete Theme Store fixture,
   browser, accessibility, performance, editor, and provenance gates.

## Smallest Phase 0 change proposed for approval

Make one documentation-only commit before storefront work:

- add this baseline;
- add the 2026-09-28 Shopify requirements and approved Tailwater references to
  `docs/provenance/REFERENCE-LOG.md`;
- record the design-quality rejection and the Tailwater recovery decision in
  `docs/provenance/DECISIONS.md`;
- reconcile Pexels/demo-store assets in `docs/provenance/DEPENDENCIES.md` and
  `docs/DEMO-IMAGE-CREDITS.txt`;
- correct one-preset and payload claims in `docs/MERCHANT-GUIDE.md` and
  `docs/LISTING.md`;
- add the neutral Tailwater art-direction specification as the contract for the
  first implementation slice.

After that commit, the first storefront slice is the home page composition and
canonical product card, validated together at 390, 768, 1280, and 1440 CSS
pixels before any whole-theme rollout.
