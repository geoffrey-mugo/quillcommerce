# SPEC-027 — Tailwater Field System art direction

Status: Approved design contract; implementation not started  
Phase: Design-quality recovery after Theme Store pre-review  
First implementation slice: home page composition + canonical product card  
Provenance: Original QuillCommerce system informed by public black-box outcome
references recorded in `docs/provenance/REFERENCE-LOG.md`. No reference source,
markup, asset, copy, or proprietary composition may be copied.

## 1. Problem to solve

QuillCommerce currently demonstrates feature breadth without a defensible visual
point of view. It reads as a general-purpose free theme with extra controls:
conventional section stacks, generic white cards, weak image authority, and
commerce features presented all at once. The redesign must make the theme
recognizable from a cropped home, collection, product, or overlay screenshot
without relying on its logo.

## 2. Demo merchant and promise

**Tailwater Supply Co.** is an original technical/outdoor-apparel outfitter for
river, trail, and camp conditions. It sells durable layers, shells, packs, and
field accessories. The brand voice is informed, terse, and practical. It never
uses fake scarcity, invented performance claims, or decorative wilderness copy.

The storefront promise is **field information without catalog noise**. Product
discovery should feel like reading a well-edited field guide: strong imagery,
clear conditions of use, decisive hierarchy, and technical detail available at
the moment it is useful.

## 3. Non-goals

- Do not create a generic fashion/lifestyle preset with outdoor photographs.
- Do not imitate a named reference's layout, component styling, copy, assets, or
  motion.
- Do not make topographic lines, labels, or monospaced type into constant visual
  decoration.
- Do not expose every purchase control on every product card.
- Do not add new commerce features during the first design slice.

## 4. Visual system

### 4.1 Type roles

- **Archivo**: display and navigational structure; compact, sturdy, and direct.
- **Newsreader**: editorial statements, field reports, and occasional product
  storytelling; never used for control labels or dense specifications.
- **IBM Plex Mono**: specifications, prices, coordinates, inventory facts, and
  compact metadata; used selectively rather than as a theme-wide novelty.
- Verify Shopify font-library availability before implementation. If a target
  family is unavailable, select a Shopify-hosted replacement with the same role;
  do not add a remote font dependency without a ledgered license decision.
- Default display/body line lengths: 10–14 words for hero display, 55–68
  characters for editorial body copy.

### 4.2 Palette

| Role | Working value | Use |
|---|---:|---|
| Field paper | `#F2EFE5` | Primary surface; warm enough to feel authored, quiet enough for product photography |
| Spruce ink | `#15241F` | Primary text, dark panels, strong controls |
| Spruce | `#2D5446` | Brand action and selected state |
| Blaze | `#F05A32` | Sparse high-attention accent: primary purchase, status, navigation cue |
| Sand rule | `#C9C1AE` | Dividers, technical grids, secondary borders |
| Mist | `#DCE2DD` | Cool secondary panel and inactive state |

Blaze must remain rare. A screen covered in blaze buttons has failed the system.
Color cannot carry availability or state by itself.

### 4.3 Grid and spacing

- Desktop: 12 columns, 64px outer gutter at 1280px and above, maximum authored
  width 1440px. Tablet: 8 columns. Mobile: 4 columns with 16–20px gutters.
- Sections use one of three deliberate rhythms: compact 48–64px, standard
  96–120px, or editorial 144–176px on desktop. Mobile collapses to 40–88px.
- Full-bleed media may break the content grid; text and controls may not drift
  into arbitrary widths.
- Use rules, alignment, and proportion to create structure. Avoid floating
  rounded cards as the default section container.

### 4.4 Signature language

The signature device is a restrained **field record**: section number, use
condition, material/spec datum, or coordinate-like reference aligned to a sand
rule. A secondary topographic contour texture may appear in no more than one
major surface per viewport. These devices must organize information, not merely
decorate empty space.

Photography leads. Use consistent technical-apparel images with subdued natural
light, material detail, useful scale, and believable river/trail/camp settings.
Avoid unrelated gear close-ups, visibly branded third-party products, synthetic
catalog cutouts mixed with lifestyle photography, and repeated hero crops.

## 5. Home page composition

The first concept must render as a complete story, not a sequence of independent
section presets:

1. **Field status / utility:** one short operational message plus localization;
   no carousel.
2. **Header:** wordmark, clear category axes, and restrained utility tools.
   Desktop navigation may expose one authored field-guide panel; mobile uses a
   purposeful full-height catalog drawer.
3. **Hero — Built for the waterline:** asymmetric image-led composition with a
   short display statement, one primary action, one quiet secondary action, and
   a field-record rail. No centered text floating over an arbitrary image.
4. **Shop by condition:** four high-signal entries such as Cold water, Wet
   weather, High sun, and Base camp. These are use cases, not generic collection
   tiles.
5. **Featured field kit:** one editorial lead occupying more visual area than
   the adjacent products, followed by the canonical product cards. The section
   proves that content and commerce share one grid.
6. **Material note:** close-up material image, short serif editorial statement,
   and three verifiable construction facts.
7. **Field report:** journal story with place/date metadata and one reading
   action; visually distinct from a product promotion.
8. **Service proof:** repairs, returns, shipping, or warranty facts expressed as
   calm operational content, not generic icon badges.
9. **Footer:** catalog, field notes, support, and brand statement with strong
   alignment and no dead lower-page void.

The initial concept must show complete desktop (1440px) and mobile (390px)
compositions. Tablet behavior is validated at 768px before implementation is
accepted.

## 6. Canonical product card

### 6.1 Default state

- Product image is the dominant element, using a consistent 4:5 apparel ratio.
- The visible information stack is: optional status badge, product type/condition
  metadata, product title, price, and optional color count or compact swatches.
- Title and price must not compete. Price may use the mono role; sale pricing
  remains legible without turning the card into a red promotion panel.
- Maximum two badges. Compare, quantity, variant dropdown, and line-total
  controls are absent from the default card.
- Cards align through consistent media and information zones, not forced giant
  white boxes or padded empty areas.

### 6.2 Purchase disclosure

- Desktop pointer: a compact purchase action may reveal over or immediately
  below the media on hover. The same action must reveal on keyboard focus and
  remain reachable without hover.
- Touch/mobile: an explicit action opens the shared product-options bottom sheet.
  Do not place miniature variant selectors and steppers inside a two-column card.
- Single-variant products may add directly after a clear action. Multi-variant
  products open the options surface. All errors and confirmations use the
  existing QuillCommerce event contracts.
- Quick view and purchase are one coherent entry, not two equal permanent
  buttons.

### 6.3 Compare

Compare is available only after the shopper enters an explicit compare mode or
selection flow. It must not occupy the default card or create a persistent tray
that competes with mobile purchase controls. Any active fixed surface must
coordinate with other fixed UI through one stacking/safe-area contract.

## 7. Shared overlay grammar

Quick view, product options, search, compare, and cart use one family:

- Desktop: appropriate sheet/dialog size based on task, with a consistent title
  row, close location, internal grid, and footer action zone.
- Mobile: bottom sheet or full-height sheet chosen by task depth; safe-area aware;
  one fixed action footer at most.
- Backdrop, elevation, radius, rules, body scroll, focus restoration, Escape,
  loading, empty, and error states are shared primitives.
- A quick view may not look like a shrunken desktop card; compare may not hide a
  column without a strong scroll cue; search controls may not clip; cart may not
  manufacture large empty zones around one line item.

Interaction and motion require a live review. Static screenshots can approve
composition only. Before the system is accepted, test hover reveal, keyboard
focus, sheet transitions, reduced motion, sticky-state changes, scroll locking,
focus restoration, and fixed-surface stacking.

## 8. Acceptance criteria for the first slice

- At 1440px and 390px, the home page is recognizable as Tailwater without its
  logo and cannot be recreated through a color/font swap on Dawn.
- Product imagery carries more visual weight than controls in every card state.
- Default cards show no quantity stepper, variant dropdown, compare checkbox, or
  pair of equal-weight buttons.
- The home page contains a deliberate editorial-to-commerce rhythm with no
  generic rich-text spacer section or dead composition.
- Type roles, palette, rules, and field-record devices remain consistent without
  becoming a costume.
- The layout survives short/long titles, missing secondary images, sale and
  sold-out states, one and many variants, and a two-column mobile grid.
- No existing purchase, localization, accessibility, or progressive-enhancement
  contract is removed to achieve the visual result.
- A design review must score the concept at least 8/10 against the project's
  Dawn=5 / top-paid-theme=9 scale before it is rolled across the theme.

## 9. Next implementation sequence

1. Art-directed static home concept using licensed/owned Tailwater imagery.
2. Canonical product card states inside that concept.
3. Desktop/mobile interaction prototype for purchase disclosure.
4. Theme implementation behind existing Liquid/JavaScript contracts.
5. Product page and shared overlay grammar.
6. Collection/search/supporting-template rollout and complete demo rebuild.
