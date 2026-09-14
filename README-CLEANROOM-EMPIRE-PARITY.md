# QuillCommerce Clean-Room Capability-Parity Build Guide

> **Instructions for Claude:** Read this entire file before changing code. This is the controlling implementation guide for the QuillCommerce rebuild. Work from the first incomplete phase, preserve user changes, and never use the legacy Empire-derived theme as source material.

Last reviewed: 2026-09-14  
Target repository: `/Users/geoffreymugo/Downloads/Claude-Software-Development/quillcommerce-theme`

## 1. Mission

Build **QuillCommerce**, an original Shopify Online Store 2.0 theme for outdoor, specialty, and large-catalog retailers. It should offer the same broad merchant and shopping capabilities that make Empire useful—large-catalog navigation, powerful product discovery, quick buying, product comparison, rich product merchandising, and flexible promotional sections—while using QuillCommerce's own code, architecture, visual identity, copy, settings, markup, CSS, JavaScript, and assets.

The goal is **capability and outcome parity**, not imitation.

“Works like Empire” means that a merchant can solve comparable business problems and a shopper can complete comparable tasks. It does **not** mean pixel-identical pages, matching DOM structure, matching animations, copied section schemas, matching setting names, identical presets, or cloned demo content.

QuillCommerce must remain recognizably its own product even when configured by a merchant.

## 2. Non-negotiable clean-room rules

### 2.1 Forbidden source repository

Do not inspect, open, search, diff, hash, copy, translate, transform, or use files from this legacy directory:

```text
/Users/geoffreymugo/Downloads/Claude-Software-Development/Shopify Theme (forest)/quillcommerce
```

That directory has been identified as an Empire-derived codebase. It is not an implementation reference for this project.

Do not copy from any purchased, trial, leaked, decompiled, minified, mapped, or otherwise proprietary Shopify theme package.

### 2.2 Forbidden material

Never copy or mechanically rewrite:

- Empire or other commercial-theme Liquid, JavaScript, CSS, JSON schemas, source maps, snippets, icons, images, presets, translations, documentation, or demo data.
- Markup structure, CSS selectors, custom-element names, storage keys, event names, or file organization recovered from a commercial theme.
- Distinctive marketing text, product descriptions, preset names, screenshots, store names, or sample catalog content from another theme's demo.
- Copyright notices with the owner renamed.
- Third-party code without verifying the license and recording it in `THIRD_PARTY_NOTICES.md`.

Do not remove attribution from copied code to make it appear original. Replace the implementation instead.

### 2.3 Allowed references

Claude may use:

- Shopify's official Theme Store requirements and developer documentation.
- Shopify's official Skeleton Theme as the approved starting codebase for Theme Store submissions.
- Shopify APIs and documented Liquid objects, filters, tags, routes, section rendering, predictive search, and Ajax Cart behavior.
- Public feature descriptions and normal black-box interaction with public storefronts to understand customer outcomes. Do not inspect their source, stylesheets, scripts, source maps, or network-delivered implementation code.
- QuillCommerce product requirements and independently authored design decisions recorded in this repository.
- Third-party libraries only after confirming their license, necessity, version, and distribution obligations.

### 2.4 Clean-room workflow

For every parity feature:

1. Write a neutral behavioral specification in `docs/specs/` using customer and merchant outcomes.
2. Record the public documentation or black-box observation in `docs/provenance/REFERENCE-LOG.md`.
3. Stop referring to the external product.
4. Design a QuillCommerce-specific interaction and architecture.
5. Implement it using Shopify documentation and original code.
6. Test behavior, accessibility, performance, and Theme Editor lifecycle.
7. Record the implementation decision and tests.

If separate agents are available, the observer may create the neutral specification, but the implementation agent should receive only that specification and official Shopify documentation—not proprietary theme code.

## 3. Shopify Theme Store eligibility warning

The current repository identifies itself as a derivative of Dawn 16.0.0. Dawn's license permits specified Shopify-related use, but licensing and Theme Store submission eligibility are different questions.

As of 2026-09-14, Shopify states that Skeleton Theme is the only approved codebase for new Theme Store development and that new submissions derived from Dawn or Horizon are not eligible:

<https://shopify.dev/docs/storefronts/themes/store/requirements>

Approved Skeleton Theme:

<https://github.com/Shopify/skeleton-theme>

Therefore:

- **If this theme will be submitted to the Shopify Theme Store:** create a clean Skeleton-based implementation branch or repository. Do not ship the current Dawn-derived foundation. Reimplement QuillCommerce features on Skeleton using original code.
- **If this is strictly a private theme for stores with appropriate rights:** the existing Dawn-derived repository can remain a development reference, subject to Dawn's license, but it must still contain no Empire-derived material.
- Because the stated objective is an independently distributable theme with low copyright risk, this guide defaults to the **Skeleton-based Theme Store-safe path**.

Do not interpret the existing `LICENSE.md` as confirmation that Shopify will accept a Dawn-derived submission.

## 4. Current repository baseline

At the time of this guide, the `main` branch reports QuillCommerce `0.1.0` and contains:

- A Dawn 16.0.0 foundation.
- Original-looking `qc-*` additions:
  - `sections/qc-category-grid.liquid`
  - `sections/qc-series-cards.liquid`
  - `sections/qc-value-report.liquid`
  - `assets/section-qc-category-grid.css`
  - `assets/section-qc-series-cards.css`
  - `assets/section-qc-value-report.css`
  - `assets/quillcommerce-brand.css`
- Three existing style presets: Forest & Copper, Classic Light, and Coastal Dusk.
- Standard and bulk quick-add behavior.
- A `collection.fly-bar.json` template with vertical filtering and 36 products per page.
- Product defaults for SKU, inventory, shipping disclosure, and complementary products.
- Standard storefront foundations including cart drawer, predictive search, faceted filters, localization, media gallery, rich product media, and quick-order components.

A static scan found no literal `Empire`, `Pixel Union`, `Out of the Sandbox`, `Archetype Themes`, `pxs-`, `pxu-`, `ssqll`, or `@saasquill` strings in this target repository on 2026-09-14. Keep that gate passing.

The current code is useful as a record of product decisions, but for a Theme Store submission, do not copy Dawn implementation files into Skeleton. Rebuild behavior from written specifications.

## 5. Product identity and differentiation

QuillCommerce should be designed for merchants with deep catalogs and technical products—outdoor equipment, fishing and tackle, hardware, parts, sporting goods, hobby supplies, and specialty B2B/B2C retail.

Its distinctive product language should be:

- **Catalog intelligence:** make dense catalogs understandable through specifications, compatibility, availability, and category structure.
- **Fast repeat purchasing:** minimize steps for consumables, variants, bulk quantities, and previously viewed products.
- **Field-note storytelling:** combine product commerce with guides, reports, conditions, use cases, and expert content.
- **Quiet confidence:** strong information hierarchy, restrained motion, durable typography, and practical controls.
- **Original visual system:** do not reproduce Empire's marketplace-inspired layouts. Use a QuillCommerce-specific grid, spacing scale, card composition, navigation patterns, and media treatment.

The theme must not be configurable into a near-identical copy of Empire or another Theme Store product.

## 6. Architecture requirements

### 6.1 Naming

- Prefix original CSS components, custom elements, JavaScript events, storage keys, and section identifiers with `qc-` or `qc:`.
- Use descriptive names based on the QuillCommerce product model, not names copied from other themes.
- Never introduce these identifiers: `empire`, `pixelunion`, `pxu`, `pxs`, `oots`, `outofthesandbox`, `ssqll`, or proprietary vendor namespaces.

Suggested original naming examples:

```text
sections/qc-catalog-navigator.liquid
sections/qc-field-report.liquid
sections/qc-product-compare.liquid
snippets/qc-product-card.liquid
snippets/qc-price.liquid
assets/qc-catalog-navigator.css
assets/qc-product-compare.js
event: qc:cart-updated
storage: qc:compare:v1
```

### 6.2 Liquid

- Use semantic HTML before JavaScript enhancement.
- Keep rendering decisions in Liquid and interaction behavior in JavaScript.
- Use Shopify's `routes` object; do not hardcode storefront routes.
- Render `content_for_header` unchanged.
- Use JSON templates and section groups.
- Support `@app` and Custom Liquid blocks where merchants reasonably expect extensibility.
- Keep schemas merchant-friendly and avoid exposing implementation jargon.
- Use translation keys for storefront-facing text and schema text.
- Keep snippets focused and document non-obvious parameters using LiquidDoc.

### 6.3 CSS

- Define an original token system for color, spacing, typography, radii, borders, shadows, and motion.
- Prefer component and section stylesheets over a single monolithic bundle.
- Scope styles to the component; avoid selectors coupled to template position.
- Support logical properties and bidirectional layouts where feasible.
- Respect `prefers-reduced-motion`.
- Never copy another theme's selector vocabulary or compiled CSS.

### 6.4 JavaScript

- Use small ES modules or focused custom elements with no framework requirement.
- Guard `customElements.define` against duplicate registration when needed.
- Components must initialize correctly after Theme Editor section load/reorder/select events.
- Provide `connectedCallback`/`disconnectedCallback` cleanup for listeners and observers.
- Use AbortController for replaceable fetches.
- Use Shopify Section Rendering, Predictive Search, Product Recommendations, and Ajax Cart APIs instead of scraping storefront markup.
- Emit documented QuillCommerce events for cross-component updates.
- Do not add analytics, telemetry, fingerprinting, licensing beacons, or third-party calls without explicit approval and documentation.
- Do not ship source maps containing full source code in release packages unless deliberately required.

### 6.5 State and privacy

Recommended client-side keys:

```text
qc:compare:v1          product handles or IDs, maximum 4
qc:recently-viewed:v1  product handles or IDs, maximum 12
qc:age-gate:v1         pass timestamp and policy version only
```

Do not store customer names, email addresses, cart contents, access tokens, or other personal information in these keys. Handle malformed or unavailable storage gracefully.

## 7. Capability-parity backlog

The following matrix describes business capabilities, not another theme's implementation. “Present” means a related capability exists in the current Dawn-derived baseline; it does not mean that code can automatically be moved into a Skeleton-based submission.

### 7.1 Global shell and Theme Editor

| Capability | Baseline | QuillCommerce target and acceptance criteria |
|---|---|---|
| Online Store 2.0 | Present | Every applicable template is JSON-based; header and footer use section groups; sections can be added and reordered safely. |
| App integration | Present | `@app` blocks work in main product and featured product; Custom Liquid sections/blocks are available at logical extension points. |
| Design tokens | Partial | One original token system controls type, spacing, controls, surfaces, borders, focus, and motion across every component. |
| Presets | Present | Keep three genuinely distinct QuillCommerce presets. Each must alter more than color: composition, density, media treatment, and typography should form a coherent original identity. |
| Theme Editor lifecycle | Partial | All interactive sections survive load, unload, reorder, block select, and block deselect without duplicate listeners or page refresh. |
| Internationalization | Present | No hardcoded customer-facing strings; money, dates, routes, language, country, RTL, and long translated labels render correctly. |

### 7.2 Header, navigation, and search

| Capability | Baseline | QuillCommerce target and acceptance criteria |
|---|---|---|
| Announcement bar | Present | Multiple blocks, optional links, accessible rotation only when enabled, pause controls, reduced-motion behavior. |
| Utility bar | New | Optional contact text, service message, language/country selectors, and account access without duplicating mobile controls. |
| Sticky header | Present | Merchant-selectable always/on-scroll-up/disabled behavior; no layout jump; keyboard focus is never hidden. |
| Multi-level navigation | Present | At least three menu levels with correct keyboard, pointer, touch, Escape, focus return, and outside-click behavior. |
| Catalog mega navigation | Extend | Original QuillCommerce layout supporting link groups plus optional promotional blocks, collection imagery, and featured resources. It must not recreate another theme's mega-menu composition. |
| Mobile navigation | Present | Drill-down or accordion pattern designed independently; traps focus only while open; restores focus on close. |
| Predictive search | Present | Products, collections, pages, articles, and queries are clearly grouped; loading, empty, error, and keyboard states are handled. |
| Customer account | Present/verify | Shopify account component appears in desktop and mobile header as required by current Shopify rules. |
| Localization | Present | Language and country controls work with keyboard and screen readers and preserve the current route. |

### 7.3 Collection and product discovery

| Capability | Baseline | QuillCommerce target and acceptance criteria |
|---|---|---|
| Collection banner | Present | Original hierarchy for title, description, image, eyebrow, and optional merchandising note. |
| Category navigation | Partial | Build an original `qc-catalog-navigator` section supporting subcollections, image/text modes, and large taxonomies. |
| Faceted filtering | Present | Availability, price, type, vendor, options, and metafield filters work on collection and search pages; URLs remain shareable; browser Back restores state. |
| Sorting | Present | Sorting composes correctly with filters and pagination; controls retain focus after updates. |
| Product grid | Present | Responsive density controls, stable image ratios, long-title handling, vendor/rating/price/unit-price support, and merchant-selectable card information. |
| Swatch filters/cards | Partial | Accessible labeled swatches; unavailable values are distinguishable without color alone; selecting a swatch updates card media/URL where Shopify data allows. |
| Quick add | Present | Single-variant products add immediately; multi-variant products open an original options interface; loading/error/success feedback is announced. |
| Quick view | New | Original dialog using Section Rendering API; handles variants, media, quantity, selling plans, pickup, and add-to-cart; deep link remains available. |
| Bulk quick order | Present | Quantity steppers, validation, volume pricing, and batch add work for large lists; no accidental duplicate submissions. |
| Product comparison | New | Compare up to four products; remove/clear controls; consistent attribute rows; missing values rendered honestly; state stored under `qc:compare:v1`; comparison has its own accessible page or drawer. |
| Recently viewed | New | Store a bounded list under `qc:recently-viewed:v1`; render through Shopify endpoints; exclude the current product; allow clearing; no PII. |
| Breadcrumbs | New | Use semantic navigation and JSON-LD where appropriate; support localized routes and collection context without creating duplicate URLs. |
| Back to top | New | Appears only after meaningful scroll; accessible label; focus behavior and reduced motion are correct. |
| Empty/error states | Partial | Original, useful states for zero products, invalid filters, failed async requests, and missing images. |

### 7.4 Product page and featured product

| Capability | Baseline | QuillCommerce target and acceptance criteria |
|---|---|---|
| Product blocks | Present | Title, vendor, price, SKU, inventory, variant picker, quantity, buy buttons, description, custom Liquid, app blocks, share, and disclosures are reorderable blocks. |
| Media gallery | Present | All images and rich media remain viewable; options for thumbnails or original QuillCommerce grid; mixed aspect ratios do not break layout. |
| Zoom/lightbox | Partial | Keyboard-accessible dialog, focus return, touch gestures without scroll traps, and high-resolution responsive images. |
| Variant media | Present/verify | Selecting a variant reveals its associated image without hiding access to other product media. |
| Rich media | Present | Shopify-hosted video, YouTube/Vimeo, and 3D models work on product, featured product, and quick view. |
| Variant picker | Present | Pills, swatches, and dropdowns have labels, disabled/unavailable states, deep-link updates, and correct variant availability. |
| Price system | Present | Price, compare-at price, unit price, currency codes, tax-inclusive messaging, volume pricing, and selling-plan adjustments update together. |
| Inventory status | Present | In stock, low stock, out of stock, incoming transfer, and policy-based continued selling are represented without false urgency. |
| Pickup availability | Present | Updates on variant change; drawer is keyboard accessible and handles unavailable locations. |
| Selling plans | Present/verify | Subscription choices and allocations update price; selected plans appear correctly in cart. |
| Shop Pay installments | Present/verify | Render using Shopify's supported form and never restyle protected branded elements. |
| Pre-order | New | Merchant-controlled behavior based on tags/metafields or a documented setting; button and delivery language clearly distinguish pre-order from in-stock purchase. |
| Sticky purchase bar | New | Optional mobile/desktop bar with product/variant summary, price, quantity, and add action; synchronizes with the main product form. |
| Product disclosures | Present | Tabs/accordions support rich text, pages, dynamic sources, and app/custom Liquid content; keyboard behavior follows disclosure semantics. |
| Complementary products | Present | Uses Shopify Search & Discovery recommendations and supports quick add without nested focus problems. |
| Related products | Present | Product Recommendations API, responsive cards, and no duplicate current product. |
| Gift recipient | Present/verify | Gift-card recipient fields validate, preserve errors, and remain optional. |
| Share | Present | Native share with copy-link fallback and status announcement. |

### 7.5 Cart and checkout handoff

| Capability | Baseline | QuillCommerce target and acceptance criteria |
|---|---|---|
| Cart drawer and page | Present | Merchant-selectable destination; both use the same original cart line component and stay synchronized. |
| Quantity editing | Present | Optimistic or responsive updates with rollback/error messages; rapid changes cannot race into wrong totals. |
| Cart notes | Present | Debounced save with clear saved/error state. |
| Discounts | Present/verify | Line and cart discounts render with original and discounted amounts as required. |
| Selling plans | Present/verify | Allocation name and adjusted price are visible and correct. |
| Accelerated checkout | Present/verify | Product and cart accelerated checkout buttons use Shopify rendering and branded styles unchanged. |
| Shipping progress | New | Optional threshold setting with market-aware currency handling; never promise shipping eligibility that Shopify cannot confirm. |
| Cart recommendations | Optional/new | Original compact complementary-products block; disabled by default; must not delay cart interaction. |
| Empty cart | Present | Useful original copy, optional collection link, and focus placement. |
| Errors | Partial | Network, inventory, selling-plan, and quantity errors are visible and announced without destroying cart state. |

### 7.6 Merchandising and editorial sections

Build original QuillCommerce versions of the following. Similar business purposes are acceptable; layouts, schemas, interactions, names, and defaults must be independently designed.

| Section | Baseline | QuillCommerce direction |
|---|---|---|
| Image hero/slideshow | Present | Quiet editorial hero with accessible controls, optional split layout, focal points, and no forced autoplay. |
| Category grid | Present/custom | Keep the QuillCommerce card system; add density and taxonomy options without copying external tile layouts. |
| Series cards | Present/custom | Preserve the original tier/story concept and make card information resilient to missing media. |
| Values with panel / field report | Present/custom | Evolve into a signature commerce-plus-expertise section using dynamic sources. |
| Featured collection | Present | Add original density, editorial lead card, quick add, and responsive overflow options. |
| Featured product | Present | Match product behavior and app-block support without duplicating the PDP. |
| Promo grid | New | Flexible blocks with original asymmetrical templates; mobile reading order must match DOM order. |
| Promo mosaic | New | Distinct from promo grid through editorial hierarchy, not copied geometry. |
| Shoppable image | New | Accessible hotspot list paired with the image; hotspots usable by keyboard and as a non-overlay list on small screens. |
| Countdown | New | Date/time-zone behavior documented; expired state configurable; no false scarcity defaults. |
| Testimonials | New | Manual controls, semantic quotations, optional ratings, no unverifiable default claims. |
| FAQ | New | Native disclosure pattern, optional categories, FAQ structured data only when visible content meets search-engine rules. |
| Logo/press list | New | Responsive images with alt-text guidance; do not ship real company logos without permission. |
| Blog/articles | Present | Editorial cards, author/date options, and original outdoor guide presentation. |
| Newsletter | Present | Shopify customer form, consent copy setting, success/error feedback, and no external form dependency. |
| Rich text/custom Liquid | Present | App-compatible general content building blocks. |
| Video | Present | Deferred loading, poster image, captions guidance, pause controls, and reduced-motion safety. |
| Collection list | Present | Support images, counts, descriptions, and original compact/detailed modes. |
| Menu list / resource directory | New | Useful for brands, species, activities, parts, and buyer guides; accessible multi-column layout. |

### 7.7 Supporting templates and trust

Required or recommended templates and experiences:

- Home, product, collection, collection list, search, cart, page, contact, blog, article, 404, password, and gift card.
- Original About, Services, Locations, FAQ, comparison, and buyer-guide templates where useful.
- Contact information and policy links.
- Structured data for products, organizations, breadcrumbs, and articles without duplicate or misleading entities.
- Dynamic payment icons using Shopify's enabled payment types.
- Social sharing image support.
- Follow on Shop and the Shopify account component where required.
- Country/language selectors for Shopify Markets.
- Age verification only as an optional merchant feature with clear limitations; it must not claim legal compliance by itself.

## 8. Original design-system brief

Do not style QuillCommerce by tweaking another theme until it looks different. Establish the system first.

### 8.1 Layout

- Use an original responsive grid with documented content widths and gutters.
- Favor information-rich but calm layouts suited to large catalogs.
- Design dense and comfortable card modes from first principles.
- Keep mobile DOM order meaningful; avoid CSS-only reordering that harms keyboard and screen-reader flow.
- Test every section with short, long, missing, and multilingual content.

### 8.2 Typography

- Limit active font families and weights.
- Use Shopify font pickers with performant fallbacks.
- Establish a fluid, clamped type scale that remains readable at 200% zoom.
- Preserve authored capitalization unless a merchant deliberately enables a display treatment.

### 8.3 Color and controls

- Every preset must meet contrast requirements for text, links, controls, focus indicators, badges, and disabled states.
- Never communicate availability, sale status, or validation through color alone.
- Use a consistent minimum target size and visible focus style.
- Keep Shopify-branded payment and account elements within their allowed styling rules.

### 8.4 Motion

- Motion should explain state changes, not decorate every scroll.
- No essential content may depend on animation.
- Autoplay requires a pause control and sensible default; prefer disabled autoplay.
- Disable or simplify transitions when reduced motion is requested.

## 9. Implementation roadmap

Claude should complete these phases in order. Do not start several high-risk systems simultaneously.

### Phase 0 — Provenance and destination decision

- [ ] Confirm in writing whether the release target is Shopify Theme Store or private single-store use.
- [ ] If Theme Store: create a protected tag or branch preserving the current prototype, then establish a Skeleton-based implementation branch.
- [ ] Create `docs/provenance/REFERENCE-LOG.md`, `DEPENDENCIES.md`, and `DECISIONS.md`.
- [ ] Record the current prohibited-string scan.
- [ ] Inventory every non-Shopify dependency and asset license.
- [ ] Replace placeholder or externally sourced demo images with owned/licensed assets.

Definition of done: the project foundation and distribution route are unambiguous, and every source/dependency has an auditable origin.

### Phase 1 — QuillCommerce foundation

- [ ] Implement the theme shell, tokens, global typography, focus system, container/grid, buttons, inputs, badges, price primitive, icon primitive, and responsive image primitive.
- [ ] Add header/footer section groups, Custom Liquid, app insertion points, SEO metadata, localization, and core templates.
- [ ] Implement all storefront strings through locale keys.
- [ ] Confirm no-JavaScript navigation, product form, cart form, and search fallback.

Definition of done: a minimal original storefront can browse a product, choose a variant, add it to cart, edit cart, and reach checkout.

### Phase 2 — Product-card and asynchronous commerce primitives

- [ ] Build one canonical `qc-product-card` used by collection, search, recommendations, recently viewed, and promotional sections.
- [ ] Build QuillCommerce cart events and section-update coordinator.
- [ ] Implement standard quick add, multi-variant quick view, status announcements, and errors.
- [ ] Test concurrent requests and Theme Editor reinitialization.

Definition of done: all card contexts behave consistently without duplicated logic or stale cart state.

### Phase 3 — Header and catalog discovery

- [ ] Build original desktop/mobile navigation, utility bar, mega navigation, sticky modes, predictive search, localization, and account entry.
- [ ] Complete faceted collection/search filtering and sorting.
- [ ] Add catalog navigator/subcollections, breadcrumbs, swatches, grid density, and empty states.

Definition of done: a keyboard-only shopper can discover a product from a deep catalog and filters survive navigation history.

### Phase 4 — Product page

- [ ] Finish media gallery, zoom/lightbox, rich media, variant synchronization, and deep links.
- [ ] Finish price, inventory, pickup, selling plans, unit price, volume pricing, installments, and gift-recipient states.
- [ ] Add original pre-order and sticky purchase-bar features.
- [ ] Complete complementary and related products.

Definition of done: all product-state fixtures in section 11 pass on product and featured-product contexts.

### Phase 5 — Cart and repeat purchasing

- [ ] Unify drawer/page cart line rendering.
- [ ] Finish notes, discounts, selling plans, accelerated checkout, errors, and empty cart.
- [ ] Add optional honest shipping progress.
- [ ] Finish bulk quick order and large-quantity behavior.

Definition of done: cart totals and lines remain correct under rapid edits, locale/currency changes, selling plans, discounts, and stock errors.

### Phase 6 — Comparison and recently viewed

- [ ] Implement bounded, versioned local state.
- [ ] Create original compare selection controls, tray/drawer, and comparison presentation.
- [ ] Add recently viewed with clear/reset and current-product exclusion.
- [ ] Verify storage-disabled and corrupted-storage fallbacks.

Definition of done: both systems are optional, private, accessible, resilient, and do not create customer accounts or tracking profiles.

### Phase 7 — Merchandising sections

- [ ] Complete each section in section 7.6 one at a time.
- [ ] Add presets using original, realistic outdoor/specialty content.
- [ ] Test zero blocks, maximum blocks, missing images, long copy, and narrow screens.

Definition of done: each section is useful beyond the demo, editor-friendly, and visually part of QuillCommerce rather than an imitation.

### Phase 8 — Supporting templates and documentation

- [ ] Complete all required templates and special QuillCommerce templates.
- [ ] Write merchant documentation for every setting and feature.
- [ ] Produce original screenshots, catalog data, policies, articles, and demo copy.
- [ ] Update release notes and migration notes.

Definition of done: a merchant unfamiliar with the code can configure the full demo using documentation alone.

### Phase 9 — Release qualification

- [ ] Theme Check passes with no unexplained errors or suppressed high-severity checks.
- [ ] Lighthouse averages meet or exceed performance 60 and accessibility 90 on populated home, product, and collection pages, desktop and mobile. Set a project target of performance 80+ and accessibility 95+ to leave margin.
- [ ] Manual accessibility, browser, responsive, and Theme Editor tests pass.
- [ ] Provenance scan passes and the dependency/license ledger is complete.
- [ ] Release archive contains only permitted theme files and documentation.

Definition of done: evidence for every acceptance gate is attached to the release notes or QA report.

## 10. Claude's working protocol

At the start of every implementation session:

1. Read this guide, `README.md`, `docs/MERCHANT-GUIDE.md`, and the applicable specification.
2. Run `git status --short --branch` and preserve unrelated user changes.
3. State the single phase and vertical slice being implemented.
4. Inspect only the files needed for that slice.
5. Write or update the behavioral specification before implementation.

While implementing:

- Prefer small, reviewable changes.
- Reuse QuillCommerce primitives instead of duplicating behaviors.
- Never use global search-and-replace to disguise provenance.
- Never claim a feature is complete based only on rendered appearance.
- Add comments only where they explain non-obvious intent or constraints.
- Do not add a dependency to solve behavior that can reasonably be implemented with browser and Shopify APIs.
- Do not send data to external services.

At the end of every session, report:

- Files changed and why.
- Customer and merchant behaviors completed.
- Tests run and exact results.
- Accessibility and performance implications.
- New dependencies or external references.
- Remaining known gaps and the next recommended vertical slice.

Do not mark a phase complete unless its definition of done has been demonstrated.

## 11. Required test fixtures

Maintain products and scenarios covering at least:

### Products

- Single variant, available.
- Multiple options and variants.
- Partially unavailable option combinations.
- Fully sold out.
- Continue-selling/backorder product.
- Product with compare-at price.
- Unit-priced product.
- Volume-pricing product with quantity rules.
- Subscription/selling-plan product.
- Product available at multiple pickup locations.
- Gift card with recipient form.
- Product with incoming inventory transfer.
- Product with long title, long vendor, and long description.
- Product with no media, one image, mixed image ratios, video, external video, and 3D model.
- Product with complementary and related recommendations.

### Collections and search

- Empty collection.
- One-product collection.
- Collection with enough products for pagination.
- Large catalog with multiple filter types and long filter values.
- No-result and corrected-result searches.
- Search results containing products, pages, and articles.

### Cart

- Empty cart.
- Multiple lines and variants of one product.
- Discounts.
- Selling plans.
- Quantity rules and volume pricing.
- Inventory rejection.
- Network failure and retry.
- Tax-inclusive store messaging.
- Locale and currency changes.

### Content and editor

- Every section with zero, one, typical, and maximum blocks.
- Missing image, missing optional text, and very long text.
- Theme Editor add, remove, reorder, select, deselect, and setting changes.
- App blocks and app embeds.

## 12. Accessibility acceptance

Every interactive feature must pass:

- Keyboard-only operation with a logical focus order.
- Visible focus at all times, including sticky and overlay interfaces.
- Escape closes dialogs/drawers and returns focus to the opener.
- Dialog focus containment without trapping users after close.
- Screen-reader names, roles, states, status updates, and validation messages.
- No inaccessible hover-only content.
- 200% browser zoom and reflow at 320 CSS pixels without two-dimensional page scrolling except legitimate tables/media.
- Reduced-motion behavior.
- Contrast for all presets and interactive states.
- Touch target sizing and spacing.
- Meaningful headings, landmarks, lists, tables, and form labels.

Do not rely on Lighthouse alone; conduct manual keyboard and screen-reader-oriented review.

## 13. Performance acceptance

- Render meaningful HTML before JavaScript.
- Load component scripts/styles only where used.
- Lazy-load below-the-fold media and defer non-critical interactions.
- Always provide responsive image dimensions and appropriate `srcset`/`sizes`.
- Prevent layout shifts by reserving media and dynamic-content space.
- Avoid global observers when a component-local observer is enough.
- Avoid duplicate Shopify endpoint requests and cancel stale requests.
- Do not load third-party scripts in the default theme.
- Test populated pages, not empty templates.
- Record home/product/collection desktop and mobile Lighthouse results for releases.

## 14. Browser and responsive matrix

Test current stable versions of:

- Chrome on desktop and Android.
- Safari on macOS and iOS.
- Firefox on desktop.
- Edge on Windows.

Minimum viewport checks:

```text
320 × 568
360 × 800
390 × 844
768 × 1024
1024 × 768
1280 × 800
1440 × 900
```

Also test pointer, touch, keyboard, reduced motion, high zoom, slow network, and disabled local storage where applicable.

## 15. Automated checks

Run from the repository root:

```bash
shopify theme check
```

Validate JSON files:

```bash
find config templates sections -type f -name '*.json' -print0 \
  | xargs -0 -n1 jq empty
```

Run the provenance gate:

```bash
rg -n -i --hidden --glob '!.git/**' \
  'Empire|Pixel Union|Out of the Sandbox|outofthesandbox|Archetype Themes|pxs-|pxu-|ssqll|@saasquill|Everyday Celebrations|Deals of the Week|Seasonal Clearance Sale' .
```

Expected result: no matches outside provenance documentation that intentionally names prohibited sources. If provenance docs are included, scope the check to theme-deliverable directories:

```bash
rg -n -i \
  'Empire|Pixel Union|Out of the Sandbox|outofthesandbox|Archetype Themes|pxs-|pxu-|ssqll|@saasquill|Everyday Celebrations|Deals of the Week|Seasonal Clearance Sale' \
  assets blocks config layout locales sections snippets templates
```

Audit external URLs and calls:

```bash
rg -n --hidden --glob '!.git/**' \
  'https?://|sendBeacon|fetch\(|XMLHttpRequest|WebSocket' \
  assets blocks config layout locales sections snippets templates
```

Review every match. Shopify endpoints and documented media providers may be valid; telemetry and undocumented third-party requests are not.

Check for source-map references in release assets:

```bash
rg -n 'sourceMappingURL|webpack://' assets
```

Any dependency or permitted vendor code must be listed with its source, version, license, modifications, and notice obligations in `THIRD_PARTY_NOTICES.md`.

## 16. Release and provenance records

Maintain:

```text
docs/provenance/REFERENCE-LOG.md
docs/provenance/DEPENDENCIES.md
docs/provenance/DECISIONS.md
docs/specs/
docs/qa/
THIRD_PARTY_NOTICES.md
release-notes.md
```

Each dependency record should include:

- Package or asset name.
- Version or commit.
- Canonical source URL.
- Copyright owner.
- License identifier and link.
- Why it is needed.
- Files containing it.
- Whether it was modified.
- Required attribution or distribution text.

Each external-reference record should include the date, URL, what customer outcome was observed, and confirmation that no source code or proprietary asset was copied.

## 17. Definition of project completion

QuillCommerce is complete only when:

- The shipping foundation is Skeleton or fully original code if Theme Store submission is intended.
- No Empire-derived or other proprietary theme code, markup, styling, assets, text, metadata, identifiers, telemetry, or source maps are present.
- Comparable large-catalog commerce tasks can be completed through independently designed QuillCommerce workflows.
- QuillCommerce is visually and architecturally distinctive.
- All required Shopify features and templates work.
- Theme Editor operations do not break interactions or duplicate initialization.
- Required product, collection, search, cart, localization, and error states pass.
- Accessibility and performance gates pass on populated pages.
- Licenses, dependencies, references, decisions, tests, and release notes are documented.
- A merchant can configure the theme using the guide without editing code.
- The repository history supports a credible record of independent creation.

## 18. First task for Claude

Do not begin by implementing a new feature.

First:

1. Confirm whether the intended release is Theme Store or private single-store use.
2. Audit the current repository against this guide without opening the forbidden legacy directory.
3. Produce `docs/qa/BASELINE-2026-09.md` containing:
   - Current foundation and eligibility status.
   - Existing capability matrix.
   - Missing Shopify-required features.
   - Current Theme Check results.
   - Provenance scan results.
   - Dependency and asset-license gaps.
   - Recommended Skeleton migration plan.
4. Propose the smallest Phase 0 change for approval.

This sequencing prevents additional work from being built on an ineligible or poorly documented foundation.

---

This guide is an engineering and provenance-control document, not legal advice. When ownership or license scope is uncertain, stop distribution and obtain advice from the relevant rights holder or qualified counsel.
