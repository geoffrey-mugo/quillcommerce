#!/usr/bin/env python3
"""Generate a Shopify-valid product-import CSV for the Tailwater demo from
structured data, and cross-validate against Shopify's contract, the collection
membership, and the navigation targets.

Honest architecture (per review): Tailwater is a FLY SHOP with a small apparel
capsule. Products import as DRAFTS. The gift card is NOT here (Shopify cannot
create gift-card products by CSV — it is created manually in Admin).
"""
import csv, re, sys

VENDOR = "Tailwater Supply Co."
OUT = "/Users/geoffreymugo/Downloads/Claude-Software-Development/quillcommerce-theme/docs/demo/products.csv"

# ---- collection + nav model (for cross-file validation) ----
# collection handle -> membership (product handles). Menus must only target these.
COLLECTIONS = {
    "rods": [], "reels": [], "flies": [], "tackle": [], "apparel": [],
    # new-arrivals is manual; validated as existing, membership not enforced here
    "new-arrivals": None,
}
NAV_COLLECTION_TARGETS = ["rods","reels","flies","tackle","apparel","new-arrivals"]
SOFT_MIN = 3   # warn if a shoppable collection has fewer than this

# ---- products ----
P = []

def variants_opt(handle, option, values, price, qtys, sku_prefix, compare=None):
    return [dict(opt=v, price=price, compare=compare, qty=qtys.get(v, 15),
                 sku=f"{sku_prefix}-{re.sub(r'[^A-Z0-9]','',v.upper())}") for v in values]

# Rods (3)
P.append(dict(handle="riffle-fly-rod", title="Riffle Fly Rod", type="Rods", collection="rods",
  body="A fast-recovering graphite all-rounder for everyday trout water. Balanced for tight loops on small streams with enough backbone for a windy afternoon. 9 feet, 4-piece, with an aluminium tube.",
  tags=["rod"], option="Line Weight",
  variants=variants_opt("riffle-fly-rod","Line Weight",["4WT","5WT","6WT"],"129.00",{},"RIFFLE-ROD"),
  seo_t="Riffle Fly Rod — 9ft 4-piece graphite"))
P.append(dict(handle="tailout-fly-rod", title="Tailout Fly Rod", type="Rods", collection="rods",
  body="A medium-fast all-water rod offered from 3- to 8-weight — choose the line weight for the water you fish. 9 feet, 4-piece, matte-finished blank.",
  tags=["rod"], option="Line Weight",
  variants=variants_opt("tailout-fly-rod","Line Weight",["3WT","5WT","6WT","8WT"],"249.00",{},"TAILOUT-ROD"),
  seo_t="Tailout Fly Rod — medium-fast 4-piece"))
P.append(dict(handle="headwaters-signature-fly-rod", title="Headwaters Signature Fly Rod — small-batch graphite", type="Rods", collection="rods",
  body="Our reference build: a high-modulus blank, nickel-silver hardware, and a full-wells cork grip. Made in small batches and meant to be fished for decades. 9 feet, 4-piece.",
  tags=["rod"], option="Line Weight",
  variants=variants_opt("headwaters-signature-fly-rod","Line Weight",["4WT","5WT","6WT"],"549.00",{},"HW-ROD"),
  seo_t="Headwaters Signature Fly Rod"))

# Reels (2)
P.append(dict(handle="riffle-fly-reel", title="Riffle Fly Reel", type="Reels", collection="reels",
  body="A sealed-drag machined reel that punches above its price. Large arbor for quick line pickup and a smooth start-up under a running fish. Sized to balance 4- to 8-weight rods.",
  tags=["reel"], option="Size",
  variants=variants_opt("riffle-fly-reel","Size",["4/5","5/6","7/8"],"79.00",{"4/5":20,"5/6":20,"7/8":14},"RIFFLE-REEL"),
  seo_t="Riffle Fly Reel — sealed drag, large arbor"))
P.append(dict(handle="headwaters-fly-reel", title="Headwaters Fly Reel", type="Reels", collection="reels",
  body="A fully-sealed carbon drag in a cold-forged frame — set it once and forget it, from spring creeks to salt. Currently between production runs.",
  tags=["reel"], option="Size",
  variants=variants_opt("headwaters-fly-reel","Size",["5/6","7/8"],"429.00",{"5/6":0,"7/8":0},"HW-REEL"),
  seo_t="Headwaters Fly Reel — sealed carbon drag"))

def single(handle,title,body,ptype,collection,price,tags,seo_t,qty=25,compare=None):
    return dict(handle=handle,title=title,body=body,type=ptype,collection=collection,tags=tags,option=None,
        variants=[dict(opt="Default Title",price=price,compare=compare,qty=qty,sku=handle.upper()[:40])],seo_t=seo_t)

# Flies (4)
P.append(single("dry-fly-assortment","Dry Fly Assortment",
  "A dozen proven dries in sizes 14–18: Adams, Elk Hair Caddis, Blue-Winged Olive and a Parachute Hopper, tied barbless and boxed.",
  "Flies","flies","34.00",["flies","best-seller"],"Dry Fly Assortment — 12 flies, #14–18"))
P.append(single("nymph-assortment","Nymph Assortment",
  "Twelve subsurface workhorses in sizes 12–16: Pheasant Tail, Hare's Ear, Prince and a tungsten Perdigon.",
  "Flies","flies","39.00",["flies"],"Nymph Assortment — 12 flies, #12–16"))
P.append(single("streamer-selection","Streamer Selection",
  "Six articulated and classic streamers for moving water and bigger fish: Woolly Buggers, a Sculpin and a Clouser, sizes 2–6.",
  "Flies","flies","44.00",["flies"],"Streamer Selection — 6 streamers, #2–6",compare="54.00"))
P.append(single("local-favorites-fly-box","Local Favorites Fly Box",
  "A shop-picked mixed box that changes with the season — whatever is working on our home water right now.",
  "Flies","flies","29.00",["flies"],"Local Favorites Fly Box"))

# Tackle (5): leaders, net, box, tools
P.append(dict(handle="tapered-leader-3-pack",title="Tapered Leader 3-Pack",type="Lines & Leaders",collection="tackle",
  body="Knotless tapered leaders, 9 feet, in a resealable wallet — turns over cleanly and lands soft. Choose the tippet size to match your flies.",
  tags=["leader"],option="Tippet",
  variants=variants_opt("tapered-leader-3-pack","Tippet",["4X","5X","6X"],"14.00",{"4X":40,"5X":40,"6X":40},"LEADER"),
  seo_t="Tapered Leader 3-Pack — 9ft knotless"))
P.append(single("guide-landing-net","Guide Landing Net",
  "A hand-shaped walnut and ash net with a clear rubber bag that is easy on fish and hooks, a magnetic release, and a floating frame.",
  "Packs & Nets","tackle","89.00",["net"],"Guide Landing Net — walnut, rubber bag"))
P.append(single("waterproof-fly-box","Waterproof Fly Box",
  "A gasket-sealed slim box with silicone slit foam. It floats, and it keeps a day of flies dry through a fall in the river.",
  "Packs & Nets","tackle","22.00",["accessory"],"Waterproof Fly Box — gasketed, floats"))
P.append(single("fly-tying-starter-kit","Fly Tying Starter Kit",
  "Everything to tie your first two dozen flies: vise, bobbin, scissors, thread and a curated material pack with a printed pattern card.",
  "Tools","tackle","119.00",["tools"],"Fly Tying Starter Kit"))
P.append(single("rotary-tying-vise","Rotary Tying Vise",
  "A true-rotary vise with a hardened steel jaw that holds sizes 20 to 2/0. Smooth rotation, adjustable tension, and a solid pedestal base.",
  "Tools","tackle","159.00",["tools"],"Rotary Tying Vise — true rotary"))

# Apparel capsule (4)
P.append(dict(handle="storm-wading-jacket",title="Storm Wading Jacket",type="Outerwear",collection="apparel",
  body="A 3-layer taped shell cut for casting, with fully waterproof zips and pockets that clear a wading belt. Recycled face fabric.",
  tags=["apparel"],option="Size",
  variants=[dict(opt=s,price="180.00",compare="220.00",qty=q,sku=f"JACKET-{s}") for s,q in
            [("XS",6),("S",10),("M",12),("L",12),("XL",8),("XXL",5)]],
  seo_t="Storm Wading Jacket — 3-layer taped shell"))
P.append(dict(handle="river-hoodie",title="River Hoodie",type="Layers",collection="apparel",
  body="A midweight grid-fleece hoodie that layers under a shell or stands alone on a cool morning — quiet, quick-drying, cut long in the back.",
  tags=["apparel"],option="Size",
  variants=[dict(opt=s,price="64.00",qty=q,sku=f"HOODIE-{s}") for s,q in
            [("XS",8),("S",14),("M",16),("L",14),("XL",10),("XXL",6)]],
  seo_t="River Hoodie — grid-fleece midlayer"))
P.append(dict(handle="field-tee",title="Field Tee",type="Base layers",collection="apparel",
  body="A heavyweight cotton-blend tee with a left-chest Tailwater mark — broken-in from the first wear and built to outlast the season.",
  tags=["apparel"],option="Size",
  variants=[dict(opt=s,price="28.00",qty=q,sku=f"TEE-{s}") for s,q in
            [("XS",10),("S",18),("M",20),("L",18),("XL",12),("XXL",8)]],
  seo_t="Field Tee — heavyweight cotton blend"))
P.append(single("guide-cap","Guide Cap",
  "A structured 6-panel cap with a sweat-wicking band and a low, non-glare brim. One size, adjustable, in field olive.",
  "Headwear","apparel","26.00",["apparel"],"Guide Cap — 6-panel, adjustable"))

# fill collection membership
for p in P:
    COLLECTIONS[p["collection"]].append(p["handle"])

# ---- emit CSV ----
COLS = ["Handle","Title","Body (HTML)","Vendor","Type","Tags","Published",
  "Option1 Name","Option1 Value","Variant SKU","Variant Inventory Tracker",
  "Variant Inventory Qty","Variant Inventory Policy","Variant Fulfillment Service",
  "Variant Price","Variant Compare At Price","Variant Requires Shipping","Variant Taxable",
  "Image Src","Image Position","Image Alt Text","Gift Card","SEO Title","SEO Description","Status"]

rows=[]
for p in P:
    single_opt = p["option"] is None
    for i,v in enumerate(p["variants"]):
        first=(i==0); row={c:"" for c in COLS}
        row["Handle"]=p["handle"]
        if first:
            row["Title"]=p["title"]; row["Body (HTML)"]=f"<p>{p['body']}</p>"
            row["Vendor"]=VENDOR; row["Type"]=p["type"]; row["Tags"]=", ".join(p["tags"])
            row["Published"]="FALSE"; row["Gift Card"]="FALSE"
            row["SEO Title"]=p["seo_t"]; row["SEO Description"]=(p["body"][:157]+"…") if len(p["body"])>158 else p["body"]
            row["Status"]="draft"
        row["Option1 Name"]=("Title" if single_opt else p["option"]) if first else ""
        row["Option1 Value"]=v["opt"]; row["Variant SKU"]=v.get("sku","")
        row["Variant Inventory Tracker"]="shopify"; row["Variant Inventory Qty"]=str(v.get("qty",0))
        row["Variant Inventory Policy"]="deny"; row["Variant Fulfillment Service"]="manual"
        row["Variant Price"]=v["price"]; row["Variant Compare At Price"]=v.get("compare") or ""
        row["Variant Requires Shipping"]="TRUE"; row["Variant Taxable"]="TRUE"
        rows.append(row)

with open(OUT,"w",newline="") as f:
    w=csv.DictWriter(f,fieldnames=COLS); w.writeheader(); w.writerows(rows)

# ---- validate (Shopify contract + cross-file) ----
errs=[]; warns=[]
handles=[p["handle"] for p in P]
if len(handles)!=len(set(handles)): errs.append("duplicate product handles")
skus=[v["sku"] for p in P for v in p["variants"] if v.get("sku")]
if len(skus)!=len(set(skus)): errs.append(f"duplicate SKUs: {[s for s in skus if skus.count(s)>1]}")
# gift card must not be in create-import
if any("gift" in p["type"].lower() for p in P): errs.append("gift-card product present in create CSV (not allowed)")
# draft state
if any(r["Status"]=="active" or r["Published"]=="TRUE" for r in rows): errs.append("products not drafted/unpublished")
# title vs variant weight contradiction: a title stating 'N-weight' whose variants don't all include N
for p in P:
    m=re.search(r'(\d+)\s*-?\s*weight', p["title"], re.I)
    if m and p["option"]=="Line Weight":
        w=m.group(1)+"WT"
        if not all(v["opt"]==w for v in p["variants"]):
            errs.append(f"title/variant contradiction: {p['handle']} title says {w}")
# SEO limits
for p in P:
    if len(p["seo_t"])>70: warns.append(f"SEO title >70: {p['handle']} ({len(p['seo_t'])})")
# collections defined + membership + soft-min
for h,members in COLLECTIONS.items():
    if members is None: continue
    if len(members)==0: errs.append(f"empty collection: {h}")
    elif len(members)<SOFT_MIN: warns.append(f"sparse collection <{SOFT_MIN}: {h} ({len(members)})")
# nav targets exist
for t in NAV_COLLECTION_TARGETS:
    if t not in COLLECTIONS: errs.append(f"nav targets undefined collection: {t}")
# state coverage
sale=[p["handle"] for p in P if any(v.get("compare") for v in p["variants"])]
soldout=[p["handle"] for p in P if all(v.get("qty",0)==0 for v in p["variants"])]
multi=[p["handle"] for p in P if p["option"]]; singl=[p["handle"] for p in P if not p["option"]]
longt=[p["handle"] for p in P if len(p["title"])>45]
for name,val in [("sale",sale),("sold-out",soldout),("multi",multi),("single",singl),("long-title",longt)]:
    if not val: errs.append(f"state coverage missing: {name}")

print(f"PRODUCTS {len(P)}  VARIANT ROWS {len(rows)}  (gift card created manually, not in CSV)")
print("collections:", {h:(len(m) if m is not None else 'manual') for h,m in COLLECTIONS.items()})
print("sale:",sale,"| sold-out:",soldout,"| long-title:",longt)
print("multi:",len(multi),"single:",len(singl))
print("WARN:", warns or "none")
print("ERRORS:", errs or "none")
sys.exit(1 if errs else 0)
