# QuillCommerce

Copyright © 2026 [SaaSQuill](https://saasquill.com). Original work
proprietary; Skeleton portions © Shopify Inc. — see `LICENSE.md`.

An original Shopify Online Store 2.0 theme by SaaSQuill, built on the
[Shopify Skeleton theme](https://github.com/Shopify/skeleton-theme)
foundation (see `THIRD_PARTY_NOTICES.md`) with an original design
system, components, and merchandising toolkit.

This repository is the **source release** of the theme — the exact
files that ship in the theme package.

- **Design system**: three merchant colors expand into a full derived
  palette (`--qc-*` tokens, `color-mix` in OKLab, with server-computed
  fallbacks for pre-2023 browsers), fluid type scale, corner-style
  presets, and motion tokens that collapse under reduced motion. Three
  ready-made styles: QuillCommerce, Driftwood, Slate.
- **Progressive enhancement everywhere**: every flow — purchase,
  facets, cart, search, accounts — works without JavaScript; custom
  elements layer on drawers, dialogs, live updates, and
  history-integrated URLs. Zero external dependencies.
- **Product page as blocks**: title, price, SKU & stock, variant
  picker (pills with taxonomy color swatches, or dropdown), purchase
  options, quantity (inventory-capped, quantity rules, volume
  pricing), buy buttons, pickup availability, description, trust
  badges, collapsible rows, Custom Liquid, and app blocks — all
  reorderable in the Theme Editor. Automatic pre-order labeling and
  deep-linkable variants and selling plans.
- **Merchandising library**: slideshow, hero, promo banner and tiles,
  testimonials, countdown, FAQ (with structured data), image
  hotspots, quick order list, featured product, quick view with rich
  media, product compare, recently viewed, and recommendations
  (related + Search & Discovery complementary pairings).
- **Five languages** bundled (en, fr, de, es, it); right-to-left
  locales supported. Lighthouse accessibility 100 on home, product,
  and collection templates.

## Documentation & support

- Merchant guide: https://saasquill.com/docs/quillcommerce
  (also in `docs/MERCHANT-GUIDE.md`)
- Theme support: https://saasquill.com/support

## Development

```bash
shopify theme dev --store <your-dev-store>
shopify theme check
```

Demo photography is rights-clean Pexels stock — see
`docs/DEMO-IMAGE-CREDITS.txt`.

## License

Built on Shopify's Skeleton theme; the Skeleton license (`LICENSE.md`)
permits use only for themes that integrate with Shopify. All original
QuillCommerce code, design, and assets are Copyright © 2026 SaaSQuill.
