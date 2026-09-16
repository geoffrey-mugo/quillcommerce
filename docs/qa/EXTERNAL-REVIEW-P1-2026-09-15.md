# External reviewer P1 remediation — 2026-09-15

Seven mandatory items from the external submission review, all resolved.

| # | Item | Resolution |
|---|---|---|
| 1 | Skeleton license notice missing from packaged ZIP (`shopify theme package` excludes root LICENSE.md) | Full Skeleton notice ships as a `{% comment %}` block at the top of `layout/theme.liquid`; verified present in the packaged ZIP. Root LICENSE.md retained for the source repo. |
| 2 | Product elements hardcoded, no Custom Liquid, no featured product | `sections/product.liquid` info column rebuilt as a blocks loop: `title`, `price`, `sku_stock`, `variant_picker`, `selling_plans`, `quantity`, `buy_buttons`, `pickup`, `description`, `custom_liquid`, plus existing `trust`, `disclosure`, `@app` (limit 1 on core blocks, `max_blocks` 20). Inputs outside the purchase form associate via `form="{{ product_form_id }}"`; hidden `id` input renders when the product has only the default variant or no variant-picker block is present. `templates/product.json` ships the default block order. New `sections/qc-custom-liquid.liquid` (addable on all sectioned templates) and `sections/qc-featured-product.liquid` (product picker, media, blocks incl. `@app` and custom_liquid, working add-to-cart with dynamic checkout). |
| 3 | Cart accelerated checkout missing | `sections/cart.liquid` renders `{{ content_for_additional_checkout_buttons }}` after the checkout button when `additional_checkout_buttons` is true; branded button markup/colors untouched. (Renders nothing on the dev store — no additional payment providers configured there; PDP dynamic checkout verified working.) |
| 4 | No Follow on Shop | `sections/footer.liquid` outputs `{{ shop | login_button: action: 'follow' }}` in the brand column (captured, emitted only when non-blank so ineligible stores get no empty wrapper). Branded colors unmodified. |
| 5 | Quick view featured-image only | `sections/qc-quick-view.liquid` renders a scroll-snap strip of up to 8 `product.media` entries — images via `image` snippet (first eager, rest lazy), video/external_video/model via `media_tag`. |
| 6 | Preset structure | Preset `Headwater` renamed `QuillCommerce` in `config/settings_data.json`. `listings/quillcommerce|driftwood|slate/templates/index.json` created with differentiated home content; verified included in the packaged ZIP. Per-preset demo stores remain a Partner-dashboard task. |
| 7 | Support URL was an agency contact form | Dedicated theme-support form (store URL, theme + version, issue description, file upload) built as a saasquill.com drop-in; `theme_support_url` → `https://saasquill.com/support`. Backend wiring (`/api/support`) is site-side. |

## Verification (theme #149206040653, saasquill-app-dev)
- Gates: `shopify theme check` 96 files / 0 offenses; provenance scan clean; locale parity 252 keys × 5 locales.
- Packaged ZIP: 129 files; license notice at top of `layout/theme.liquid`; `listings/` for all three presets included.
- Live: blockified PDP renders identically (title/price/stock/pills/qty/buy/payment button/pickup/description/disclosures); `form=` association carries `id`, `quantity`, `selling_plan` in FormData; variant pill sync + `?variant=` deep link; selling-plan selection sticks, price shows allocation ($21.21/$24.95 compare), `?selling_plan=` deep link; add-to-cart round trip (drawer opened, line added, then removed — merchant cart untouched); pre-order label on parka M/Slate; Sale + Limited badges; quick-view media strip; newsletter Subscribe text `rgb(255,255,255)` on accent; `qc-featured-product` and `qc-custom-liquid` render via Section Rendering API.

## Deferred / user-side
- Deploy `quillcommerce-support.html` at saasquill.com/support and wire `/api/support`; redeploy updated docs page.
- Per-preset demo stores for Driftwood and Slate (Partner dashboard).
- Reviewer's suggestion to confirm the comment-based license method with Shopify/counsel.
- Final Lighthouse benchmark on a non-password preview for the reviewer's records.
