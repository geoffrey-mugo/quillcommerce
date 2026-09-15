# SPEC-023 verification — canonical card v2 (boxed)

Date: 2026-09-14 · Theme: #149206040653 (now the store's LIVE theme —
push approved by the user with --allow-live)

| Check | Result |
|---|---|
| Bounding box | PASS — every card a 1px-bordered padded container; grid renders 24/24 on /collections/all |
| Order | PASS — compare toggle, media, price, title, actions (matches both merchant reference screenshots) |
| Sold-out treatment | PASS — ink "Sold out" label flush to the image's bottom-left corner; grey disabled "Sold out" button in the actions row; price badge removed |
| Sale price | PASS — enlarged price with strike compare ($189.00 $219.00) |
| Actions | PASS — ink Quick view + accent Add to cart side by side; multi-variant Add to cart opens the quick-view options dialog (verified on Gift Card: dialog with denomination picker); single-variant keeps direct quick-add |
| Accessibility | PASS — media link tabindex=-1 aria-hidden (title is the accessible link); product-name SR suffixes on both buttons; disabled button announces the state |
| Shared contexts | Card is the single snippet — collection verified live; search verified live; recommendations/recently-viewed render the same snippet |

Gates: Theme Check 75 files / 0 offenses; provenance clean.
