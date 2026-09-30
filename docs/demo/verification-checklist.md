# Post-import verification checklist

Run every item on the storefront (preview theme) after the store is built and
before theme code unfreezes. Any failure blocks the unfreeze.

## Brand
- [ ] Wordmark reads "Tailwater Supply Co." in header, footer, and cart.
- [ ] Favicon, browser title, and SEO metadata read Tailwater.
- [ ] No "SaaSQuill", "QC", "snowboard", "ski wax", or "Default Title" visible anywhere.

## Catalog & states
- [ ] All 19 products imported; every product has a coherent image from the series.
- [ ] Multi-variant rods/reels/leader/apparel show working variant pickers.
- [ ] Sale renders: Streamer Selection, Storm Wading Jacket (subdued strike-through).
- [ ] Sold out renders: Headwaters Fly Reel (status shown, no purchase action).
- [ ] Price range renders: Tailwater Gift Card shows a from/range.
- [ ] Long title lays out cleanly: Headwaters Signature Fly Rod (card + PDP).
- [ ] No-metadata card is clean: Local Favorites Fly Box (kind line falls back to Type).
- [ ] Recommendations/related populate on a PDP (Search & Discovery configured).

## Collections
- [ ] Every collection in collections.md exists and is non-empty.
- [ ] Conditions collections are cross-department and coherent.
- [ ] Each collection has a featured image; collection cards look like one set.

## Navigation
- [ ] Primary menu shows Equipment / Apparel / Conditions / Field Notes with children.
- [ ] Every primary and footer link resolves to a real, populated destination.
- [ ] No link 404s or lands on an empty page.

## Editorial
- [ ] About, Shipping, Returns & repairs, Size guide, Contact, FAQ all published.
- [ ] Journal has both field reports + the guide, each with a lead image.
- [ ] Bracketed placeholders ([hours], [address], [$8]…) replaced with real values.

## Photography & provenance
- [ ] One coherent visual system across products and editorial.
- [ ] Consistent 4:5 product crop; consistent editorial grade.
- [ ] provenance-ledger.md complete and every used asset marked Approved.

## Commerce flow
- [ ] Add to cart, cart drawer, and checkout entry work from a card and a PDP.
- [ ] Quick view opens options for a multi-variant product.
- [ ] Search returns products and pages.

When all boxes are checked: unfreeze theme code, resume the shell against real
data (SPEC-029 §6.3), then produce the full breakpoint/interaction state matrix.
