# Field Notes — article HTML (paste-ready)

Paste each HTML block into the Shopify article body via the **`< >` (Show HTML)**
editor. Set the metadata fields (handle, author, date, tags, excerpt) in the
article sidebar. The article title is the template's `h1`; content starts at `h2`.

Rich-text coverage across the set: **ordered + unordered lists** (Art. 2, Art. 3),
**blockquote** (Art. 1, Art. 3), **figure/figcaption** (Art. 1, Art. 2). Together
they exercise the theme's rich-text styling.

Author for all three: `Tailwater Supply Co.` (change to a staff name if preferred).
Blog: **Field Notes** (`journal`).

**Figures (verified in Shopify 2026-09-30):** a complete
`<figure><img src="…"><figcaption>…</figcaption></figure>` survives the save
intact, with the image kept *inside* the figure. So the reliable method is:
upload the image to **Content → Files**, copy its URL, then in the `< >` (Show
HTML) editor add the image as the figure's first child — e.g.
`<img src="YOUR_FILES_URL" alt="Morning three on the Deschutes, before the wind came up.">`
immediately before the `<figcaption>`. **Do not** use the visual image button — it
can place the image *outside* the figure. (The blocks below keep the figure as
`<figcaption>`-only so nothing pasted has a broken `src`; add the `<img>` line
after uploading.)

---
## Article 1 — field report
- **Title:** Three cold mornings on the Deschutes
- **Handle:** `three-cold-mornings-on-the-deschutes`
- **Author:** Tailwater Supply Co.
- **Published:** 2026-05-12
- **Tags:** field-report
- **Excerpt:** We took the Storm Wading Jacket through rain, wind, and one accidental swim — here is what held up and what we changed before it shipped.
- **Image to insert:** `tw-article-deschutes-01` into the figure below.

```html
<p>The Deschutes in a wet spring is not subtle. It rained the first morning, blew the second, and on the third one of us went in to the waist chasing a hooked fish downstream. Three days is not a lab, but it is honest.</p>
<h2>What we were testing</h2>
<p>The question was simple: does the Storm Wading Jacket keep a person dry and comfortable enough to keep fishing when the weather makes quitting the easier choice.</p>
<blockquote>
  <p>Dress for the third hour, not the first.</p>
</blockquote>
<h2>The shell</h2>
<p>It did its job. Fully-taped seams and waterproof zips kept the rain out through a six-hour sit, and the pockets cleared a wading belt without riding up.</p>
<p>The one weakness showed on the cast. Water tracked down a raised arm and found the cuff, so we lengthened the storm cuff before the jacket shipped. The production version has it.</p>
<figure>
  <figcaption>Morning three on the Deschutes, before the wind came up.</figcaption>
</figure>
<h2>What actually mattered</h2>
<p>Warmth, more than any single feature. A grid-fleece hoodie under the shell was the difference between fishing the third hour and packing up after the first. Good gear buys you time on the water; it does not fish for you.</p>
```

---
## Article 2 — field report
- **Title:** Reading a freestone creek in low water
- **Handle:** `reading-a-freestone-creek-in-low-water`
- **Author:** Tailwater Supply Co.
- **Published:** 2026-08-03
- **Tags:** field-report
- **Excerpt:** When the water drops and clears, the fish do not leave — they get harder. A short rod, a long leader, and a slow approach.
- **Image to insert:** `tw-article-lowwater-01` into the figure below.

```html
<p>Low water is a different sport. Our home creek drops through summer until the runs you waded in June are ankle-deep glass. The trout are still there; they are just spookier, tucked into the last foot of shade and broken surface.</p>
<h2>Three things that mattered</h2>
<ol>
  <li>A short, light rod. A four-weight loads at the close range these fish demand and lands a fly without a splash.</li>
  <li>A long, fine leader. Nine feet to 5X or 6X, because a small dry on heavy tippet in clear water is a warning, not an offer.</li>
  <li>Patience on the approach. Kneel, wait, and cast once well rather than three times in a hurry.</li>
</ol>
<figure>
  <figcaption>A low, clear run — the kind of water that rewards a slow approach.</figcaption>
</figure>
<h2>Fishing it</h2>
<p>We fished dries almost entirely, drifting a Parachute Adams drag-free into the head of each run. Every fish came on the first good drift or not at all.</p>
<p>Low water rewards the angler who slows down. There is no rushing a spooky trout in a foot of clear creek.</p>
```

---
## Article 3 — guide
- **Title:** Match your leader to the fly, not the rod
- **Handle:** `match-your-leader-to-the-fly-not-the-rod`
- **Author:** Tailwater Supply Co.
- **Published:** 2026-03-20
- **Tags:** guide
- **Excerpt:** Tippet size is set by the fly, not the rod. The simple rule that keeps you from spooking fish — or breaking off.
- **Image to insert:** none (text-only guide).

```html
<p>A common mistake is choosing a leader by rod weight. The turnover end is set by the fly size, and once you see that, the rest is easy.</p>
<h2>The rule</h2>
<p>Divide the hook size by three for a good starting X. A size 12 fly fishes well on 4X; a size 18 wants 6X.</p>
<blockquote>
  <p>Set the tippet by the fly, not the rod.</p>
</blockquote>
<h2>Starting points</h2>
<ul>
  <li>Dries and nymphs for trout: 4X to 6X.</li>
  <li>Streamers for trout: 2X to 4X.</li>
  <li>Bigger flies and bigger fish: heavier still.</li>
</ul>
<h3>Adjusting for conditions</h3>
<p>Go a size heavier in dirty or windy water and when fish are strong. Go finer when the water is clear and the fish are spooky. When in doubt, fish the middle of the range and watch how the fish respond.</p>
<h2>On the water</h2>
<p>Carry a range so you can change with the flies. Our Tapered Leader 3-Pack comes in 4X, 5X and 6X for exactly this reason — switch as your flies change through the day.</p>
```

---
## Validation
Run `validate_articles.py` (below) — it extracts each HTML block and checks: only
whitelisted tags, balanced/well-formed tags, no `style`/`class`/`id`/`script`
attributes, and no stray Markdown (`**`, `#`, `[..](..)`, backticks). Expected:
`ALL ARTICLES OK`.
