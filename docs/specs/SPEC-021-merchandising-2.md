# SPEC-021 · Merchandising sections II: newsletter, multi-column, footer

Status: Implemented (fully verified 2026-09-14 incl. human newsletter submit through the captcha challenge — see docs/qa/PHASE6-SLICE2-VERIFICATION.md)
Phase: 6, slice 2
Provenance: Original QuillCommerce design (including original simplified
social glyphs); Shopify customer form, link_list, payment type icons.

## Merchant outcome
Email capture anywhere on the storefront, a value-props/multi-column
builder block, social profile links managed once in theme settings, and
a real footer (menu, social, payment icons, copyright) on the design
system instead of the Skeleton stub.

## Shopper outcome
Sign up for email with clear success and error feedback (works without
JavaScript — it is a plain form post); find social profiles and store
links in a legible footer; read value-prop columns that collapse cleanly
on small screens.

## Behavioral requirements
1. **qc-newsletter** (presets, addable anywhere): heading, subheading,
   centered/start alignment. `{% form 'customer' %}` with
   `contact[tags]` = newsletter and a labeled email input
   (`autocomplete="email"`, `required`). On `form.posted_successfully?`
   a success message replaces the form area (role="status"); form
   errors render inline (`form.errors`) with `role="alert"` and the
   input marked `aria-invalid`. Pure server-side round trip — no JS.
2. **qc-multi-column** (presets): section heading; up to 6 `column`
   blocks (heading, richtext, optional link label+URL) laid out on the
   shared auto-fill grid (min 220px), stacking naturally on small
   screens. Blocks carry `shopify_attributes`.
3. **Social settings**: a "Social media" theme-settings group with URL
   fields for Instagram, Facebook, X, YouTube, TikTok, Pinterest.
   `snippets/qc-social.liquid` renders one 44px icon link per filled
   URL (original simplified glyphs added to qc-icon; accessible name =
   platform name; `rel="noopener"`, new tab).
4. **Footer rebuild** (`sections/footer.liquid`, same type/group):
   tokens-only styling; grid of: shop blurb (optional richtext
   setting), menu link_list column with heading, social row; bottom
   row: copyright (shop name link, current year) + payment icons
   (existing toggle). All Skeleton `--color-*` variables removed.
5. **Fixtures**: home template gains a 3-column qc-multi-column
   ("Why shop with us" value props) and a qc-newsletter before the
   footer; footer-group settings updated with the main menu.
6. All strings via locale keys; tokens-only styling; no new JS.

## Settings (merchant-facing)
Newsletter: heading, subheading, alignment. Multi-column: heading +
per-block heading/text/link. Social: six URL fields. Footer: blurb
richtext, menu, payment-icons toggle.

## States & edge cases
Newsletter double submission (server-side idempotent; button is a
plain submit); already-subscribed email (Shopify returns success);
invalid email (browser validation first, server errors rendered);
no social URLs (no social markup at all); footer without menu
(column omitted); multi-column with 1–6 blocks; JS off (everything
works — nothing here uses JS).

## Accessibility acceptance
Newsletter input labeled, error text programmatically associated
(`aria-describedby`), success announced via role="status"; social links
44px with platform-name accessible names; footer is a `<footer>`
landmark with a labeled nav for the menu; payment icons are decorative
(`aria-hidden` wrapper with a visually-hidden caption).

## Out of scope
Slideshow/video sections, email-provider integrations beyond Shopify
customers, footer newsletter duplication (merchants can add the section
to the footer group in the editor if desired).
