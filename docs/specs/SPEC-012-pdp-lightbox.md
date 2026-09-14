# SPEC-012 · Product page: image zoom lightbox

Status: Implemented (verified 2026-09-14 on saasquill-app-dev — see docs/qa/PHASE4-SLICE2-VERIFICATION.md)
Phase: 4, slice 2
Provenance: Original QuillCommerce design; Shopify media/image_url docs;
native `<dialog>` platform behavior.

## Merchant outcome
Shoppers can inspect product imagery at full resolution with zero
configuration; merchants can switch the feature off per section.

## Shopper outcome
Activate any gallery image (click or Enter) to open a full-size view;
move between images; close with the button, Escape, or a backdrop click;
land back where you were. Works from keyboard and screen reader; without
JavaScript the same activation opens the full-resolution image directly.

## Behavioral requirements
1. **Trigger**: each *image* slide in `<qc-gallery>` is wrapped in an
   anchor to the 2048px rendition (`data-qc-zoom`, labeled "View
   full-size image", zoom-in cursor). Video, external_video, and model
   media are never zoom targets. With JS, activation is intercepted and
   opens the lightbox at that image; without JS the anchor navigates to
   the full-resolution image — the no-JS baseline.
2. **Lightbox**: a native `<dialog>` (`data-qc-lightbox`, labeled from
   locale, `scroll-lock` attribute per the established pattern) rendered
   by Liquid with one slide per image media (2048px, lazy-loaded, alt
   preserved), a labeled close button, and — when more than one image —
   labeled previous/next buttons and a counter ("Media n of N", the
   existing key). Only the active slide is visible (`hidden` on the
   rest).
3. **Navigation**: previous/next wrap around; ArrowLeft/ArrowRight work
   while the dialog is open; each change updates the counter and
   announces it through the existing live region. Opening from a slide
   starts at that image.
4. **Dismissal**: close button, Escape (native), and backdrop click all
   close it; focus returns to the trigger (native dialog behavior).
   Page scroll is locked while open (existing `scroll-lock` CSS).
5. **Motion**: no transitions are introduced; nothing to reduce.
6. The main gallery's active slide is unchanged by lightbox navigation
   (the lightbox is an inspection layer, not a second picker).
7. All strings via locale keys; styling via tokens only.

## Settings (merchant-facing)
| Setting | Type | Default |
|---|---|---|
| Enable image zoom | checkbox | true |

## States & edge cases
Single image (no nav buttons, no counter); no image media (no lightbox
rendered, e.g. media-less or model/video-only products); mixed media
(video slides skipped by lightbox nav); setting off (plain images, no
anchors); very tall/wide images (contained, never cropped).

## Accessibility acceptance
Trigger is a real link with an accessible name; dialog labeled; nav and
close buttons ≥44px with accessible names; arrow-key nav; counter
changes announced; focus restored to the opener on close.

## Out of scope
Pinch/drag pan-zoom inside the lightbox; thumbnails inside the lightbox;
pickup/selling plans/pre-order/sticky bar (later slices).
