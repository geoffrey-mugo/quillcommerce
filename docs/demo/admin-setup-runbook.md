# Admin setup runbook

Operational build steps for the Tailwater demo. Do them in order — later steps
depend on earlier ones. Each step has a ☐ check, an **Expected** result, and a
**STOP** condition. UI labels may differ slightly by Shopify version; the path is
the intent. Data values live in the pack files, not duplicated here.

---
## 0. Target store (decide first)
- ☐ Use a **clean, dedicated Shopify development store** for this submission demo.
- **Why:** `saasquill-app-dev` already has products (snowboards, old rods/reels)
  and is shared with the FindSmith demo. Importing there causes handle collisions
  (e.g. `guide-cap`, `river-hoodie`, `streamer-selection`, `waterproof-fly-box`)
  and can disrupt FindSmith.
- If you must reuse `saasquill-app-dev`: first **export a full products backup**
  (Products → Export → All products), then remove old products (Step 12 rollback
  method) — and confirm FindSmith's demo does not depend on them.
- **Expected:** a store with **0 products** (or a known-clean catalog) before import.
- **STOP** if the target store still contains snowboards/dev products or unbacked-up
  data — do not import until the store is clean and backed up.

---
## 1. Metafield definitions (before values)
Path: **Settings → Custom data → Products → Add definition**. Create three
(namespace.key · name · type), per `metafields.md`:
- ☐ `custom.material` · Material · Single line text
- ☐ `custom.use` · Primary use · Single line text
- ☐ `custom.spec` · Spec line · Single line text
- **Expected:** three definitions listed under Products, "Storefronts" access on.
- **STOP** if the type is not "Single line text" or the key differs from above —
  the theme reads these exact keys.

---
## 2. Import products (drafts)
Path: **Products → Import → Add file →** select `docs/demo/products.csv` **→ Upload
and continue**.
- ☐ In the preview: **leave "Overwrite products with the same handle" UNCHECKED.**
- ☐ Do **not** check any "publish to all channels" option.
- ☐ Preview checks before confirming:
  - 18 products / 45 variants shown; columns mapped (Title, Variant Price, Option1…).
  - A multi-variant sample (e.g. Riffle Fly Rod) shows 3 weights at $129.
  - Sale sample: Streamer Selection shows Compare-at $54 / price $44.
  - Sold-out sample: Headwaters Fly Reel inventory 0.
- ☐ Click **Import products**.
- **Expected:** 18 products added, all **Status = Draft**, Vendor "Tailwater Supply
  Co.", no existing product overwritten.
- **STOP** if the count ≠ 18, any product imports **Active**, or an existing
  product changed — undo via Step 12 and re-check the file/target store.

---
## 3. Gift card (manual — cannot be imported)
Path: **Products → Gift cards → Add gift card product** (or Products → Add product
→ set as Gift card).
- ☐ Title: `Tailwater Gift Card`; handle `tailwater-gift-card`.
- ☐ Denominations: $25, $50, $100, $200. Status: **Active**.
- **Expected:** a gift-card product at `/products/tailwater-gift-card`.
- **STOP** if it saves as a normal product (no denominations) — recreate via the
  Gift cards area.

---
## 4. Collections
Path: **Products → Collections → Create collection**. For each, set Title, then the
rule, then fix the handle under **Search engine listing → Edit → URL and handle**.
Per `collections.md`:
- ☐ `rods` — Automated · Product **type = Rods**
- ☐ `reels` — Automated · Product **type = Reels**
- ☐ `flies` — Automated · Product **type = Flies**
- ☐ `tackle` — Automated · Product **tag is** `leader` OR `net` OR `accessory` OR
  `tools` (add all four conditions, match **any**)
- ☐ `apparel` — Automated · Product **tag = apparel**
- ☐ `new-arrivals` — Manual · add ~6 coherent (Storm Jacket, Tailout Rod, Riffle
  Reel, Streamer Selection, River Hoodie, Guide Net)
- **Expected:** rods 3, reels 2, flies 4, tackle 5, apparel 4, new-arrivals ~6;
  **no empty collection.**
- **STOP** if any collection is empty or a product lands in the wrong one — fix the
  product's Type/Tags (Step 2 data) before continuing.

---
## 5. Pages
Path: **Online Store → Pages → Add page**. Set handle under Search engine listing.
Copy from `pages.md`:
- ☐ `about` ☐ `shipping` ☐ `returns-repairs` ☐ `size-guide` ☐ `contact` ☐ `faq`
- ☐ For **contact**: in the theme customizer later, assign this page the Contact
  template (renders the form).
- **Expected:** six published pages resolving at `/pages/<handle>`.
- **STOP** if a handle differs from the list — navigation (Step 7) targets these.

---
## 6. Blog + articles
Path: **Online Store → Blog posts → Manage blogs → Add blog** →
- ☐ Blog: Title `Field Notes`, handle `journal`.
- ☐ Add 3 articles from `field-reports.md`: set Blog = Field Notes, paste content,
  set **tags** (`field-report` ×2, `guide` ×1), set the **published date to the
  past date given**, add a lead image (Step 8), Visibility = Visible.
- **Expected:** `/blogs/journal` lists 3 posts; `/blogs/journal/tagged/guide`
  resolves to 1.
- **STOP** if any article date is in the future or a post is hidden.

---
## 7. Menus
Path: **Online Store → Navigation**. Per `navigation.md`:
- ☐ Edit **`main-menu`**: items Rods, Reels, Flies, Tackle, Apparel →
  `/collections/<handle>`; Field Notes → `/blogs/journal`. Remove old items
  (Home/Catalog/Contact/snowboard links).
- ☐ Create **`footer-shop`**: Rods, Reels, Flies, Tackle, Apparel, New arrivals,
  Gift card (→ `/products/tailwater-gift-card`).
- ☐ Create **`footer-support`**: Contact, Shipping, Returns & repairs, Size guide, FAQ.
- ☐ Create **`footer-field-notes`**: Journal, About.
- **Expected:** every link opens a populated destination; **no 404, no empty page.**
- **STOP** if any link 404s — create the missing destination first.

---
## 8. Imagery + alt text
For each product: **Product → Media → Add** the generated file `tw-<handle>-01.jpg`
(image-generation-brief.md); drag the primary shot to **first**; set **alt text**.
- ☐ All 18 products have a primary image (+ optional alt/hover).
- ☐ Gift card image set.
- ☐ Each **collection**: set a **featured image** = its lead product's shot
  (Collection → Edit → Image).
- ☐ Editorial images uploaded to **Content → Files** for the theme (hero, article
  leads, material closeup).
- ☐ Alt text written for every image (describe the item/scene; no brand names).
- **Expected:** coherent imagery from one set; cards look like one shoot.
- **STOP** if any product has no image or images look inconsistent — regenerate
  outliers (brief §Post-generation QA) before publishing.

---
## 9. Metafield values
Per product: **Product → Metafields** → fill `custom.material` / `custom.use` /
`custom.spec` from `metafields.md`.
- ☐ Apparel has `custom.material`; fly gear has `custom.use` where listed.
- ☐ **Local Favorites Fly Box** left with **no** metafields (intended no-metadata card).
- **Expected:** PDP/cards show the right kind line; Local Favorites falls back to "Flies".
- **STOP** if a value is guessed — use only the table values.

---
## 10. Search & Discovery
Path: **Apps → Search & Discovery** (install the free Shopify app if absent) →
- ☐ **Recommendations:** enable Related products (and Complementary on 3–4 hero
  products, e.g. rods → leaders/flies).
- ☐ **Filters:** add filters for collection pages (Availability, Price, Product
  type; and Options — Line Weight, Size, Tippet).
- **Expected:** PDPs show recommendations; collection pages show working filters.
- **STOP** if the app is not installed — recommendations/filters will be empty.

---
## 11. Test payments (for demo checkout)
Path: **Settings → Payments**.
- ☐ On a dev store, enable a test method: choose a provider → search
  **"(for testing) Bogus Gateway"**, or turn on **Shopify Payments test mode**.
- ☐ Verify one test checkout completes (Bogus Gateway card `1`s, any future expiry).
- **Expected:** checkout completes end-to-end in test mode.
- **STOP** if checkout errors — a reviewer must be able to complete a test order.

---
## 12. Publish + rollback
- ☐ **Publish products:** Products → select all Tailwater products → **Set as
  active**; confirm they are on the Online Store sales channel.
- **Rollback (bad import):** Products → filter **Vendor = Tailwater Supply Co.**
  (or the import's date) → select all → **Bulk actions → Delete products** →
  confirm. Then re-import a corrected `products.csv`. (If you overwrote existing
  products by mistake, restore from the Step 0 export.)
- **Expected:** clean catalog, only intended products active.
- **STOP** and roll back if duplicates, wrong prices, or collisions appear.

---
## 13. Final verification
Run **`verification-checklist.md`** end-to-end on the preview theme.
- **Expected results:** wordmark reads Tailwater everywhere; no SaaSQuill/snowboard
  residue; sale/sold-out/price-range/long-title/no-metadata all render; every nav
  link resolves to a populated page; Journal has 3 dated posts; a test order
  completes.
- **STOP / do not unfreeze theme code** until every checklist box passes.

When all boxes pass, tell Claude — theme code unfreezes and Phase 2 begins.
