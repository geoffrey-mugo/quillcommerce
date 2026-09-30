#!/usr/bin/env python3
"""Generate a Shopify-valid product-import CSV for the Tailwater demo, from
structured data, and mechanically validate it."""
import csv, sys

VENDOR = "Tailwater Supply Co."
OUT = "/Users/geoffreymugo/Downloads/Claude-Software-Development/quillcommerce-theme/docs/demo/products.csv"

# Each product: handle, title, body, type, tags(list), option_name(None=single),
# variants: list of dicts {opt, price, compare(optional), qty, sku}
# gift_card flag optional; seo optional.
P = []

def rod(handle, title, body, weights, price, tags, seo):
    return dict(handle=handle, title=title, body=body, type="Rods",
        tags=tags, option="Line Weight",
        variants=[dict(opt=w, price=price, qty=18, sku=f"{handle}-{w}".upper()) for w in weights],
        seo=seo)

P.append(rod("riffle-fly-rod","Riffle Fly Rod",
  "A fast-recovering graphite all-rounder for everyday trout water. Balanced for tight loops on small streams and enough backbone for a windy afternoon. 9', 4-piece, with an aluminium tube.",
  ["4WT","5WT","6WT"], "129.00", ["rod","Equipment","best-seller","condition:high-sun"],
  "Riffle Fly Rod — 9' 4-piece graphite"))
P.append(rod("tailout-fly-rod","Tailout Fly Rod",
  "One rod for the whole season — from a size 18 dry to a weighted streamer. Medium-fast action that loads close and reaches when you ask it to. 9', 4-piece.",
  ["3WT","5WT","6WT","8WT"], "249.00", ["rod","Equipment","condition:wet-weather"],
  "Tailout Fly Rod — medium-fast 4-piece"))
P.append(rod("headwaters-signature-fly-rod","Headwaters Signature Fly Rod — 9' 5-weight, 4-piece",
  "Our reference build: high-modulus blank, nickel-silver hardware, and a full-wells cork grip. Made in small batches and meant to be fished for decades, not seasons.",
  ["4WT","5WT","6WT"], "549.00", ["rod","Equipment","condition:cold-water"],
  "Headwaters Signature Fly Rod"))

def reel(handle,title,body,sizes,price,qty_map,tags,seo,compare=None):
    return dict(handle=handle,title=title,body=body,type="Reels",tags=tags,option="Size",
        variants=[dict(opt=s,price=price,compare=compare,qty=qty_map.get(s,12),sku=f"{handle}-{s}".replace('/','').upper()) for s in sizes],
        seo=seo)

P.append(reel("riffle-fly-reel","Riffle Fly Reel",
  "A sealed-drag machined reel that punches above its price. Large arbor for quick pickup, smooth start-up under a running fish. Sizes to balance 4- to 8-weight rods.",
  ["4/5","5/6","7/8"],"79.00",{"4/5":20,"5/6":20,"7/8":14},["reel","Equipment","best-seller"],
  "Riffle Fly Reel — sealed drag, large arbor"))
P.append(reel("headwaters-fly-reel","Headwaters Fly Reel",
  "A fully-sealed carbon drag in a cold-forged frame. The reel you set once and forget, from spring creeks to salt. Currently between production runs.",
  ["5/6","7/8"],"429.00",{"5/6":0,"7/8":0},["reel","Equipment"],
  "Headwaters Fly Reel — sealed carbon drag"))

# leader (multi-variant, low price)
P.append(dict(handle="tapered-leader-3-pack",title="Tapered Leader 3-Pack",
  body="Hand-tied knotless tapered leaders, 9', in a resealable wallet. Turns over cleanly and lands soft. Choose the tippet size to match your flies.",
  type="Lines & Leaders",tags=["leader","Equipment"],option="Tippet",
  variants=[dict(opt=x,price="14.00",qty=40,sku=f"LEADER-{x}") for x in ["4X","5X","6X"]],
  seo="Tapered Leader 3-Pack — 9' knotless"))

def single(handle,title,body,ptype,price,tags,seo,qty=25,compare=None,gift=False):
    return dict(handle=handle,title=title,body=body,type=ptype,tags=tags,option=None,
        variants=[dict(opt="Default Title",price=price,compare=compare,qty=qty,sku=handle.upper())],
        seo=seo,gift=gift)

P.append(single("dry-fly-assortment","Dry Fly Assortment",
  "A dozen proven dries in sizes 14–18: Adams, Elk Hair Caddis, Blue-Winged Olive and a Parachute Hopper. Tied on barbless hooks, boxed and ready.",
  "Flies","34.00",["flies","Equipment","best-seller"],"Dry Fly Assortment — 12 flies, #14–18"))
P.append(single("nymph-assortment","Nymph Assortment",
  "Twelve subsurface workhorses in sizes 12–16: Pheasant Tail, Hare's Ear, Prince and a tungsten Perdigon. The box you reach for when nothing is rising.",
  "Flies","39.00",["flies","Equipment"],"Nymph Assortment — 12 flies, #12–16"))
P.append(single("streamer-selection","Streamer Selection",
  "Six articulated and classic streamers for moving water and big fish. Woolly Buggers, a Sculpin, and a Clouser, sizes 2–6.",
  "Flies","44.00",["flies","Equipment","condition:wet-weather"],"Streamer Selection — 6 streamers, #2–6",compare="54.00"))
P.append(single("local-favorites-fly-box","Local Favorites Fly Box",
  "A shop-picked mixed box that changes with the season — whatever is working on our home water right now.",
  "Flies","29.00",["flies","Equipment"],"Local Favorites Fly Box"))

P.append(single("guide-landing-net","Guide Landing Net",
  "A hand-shaped walnut and ash net with a clear rubber bag that is easy on fish and hooks. Magnetic release and a floating frame.",
  "Packs & Nets","89.00",["net","Equipment","condition:base-camp"],"Guide Landing Net — walnut, rubber bag"))
P.append(single("waterproof-fly-box","Waterproof Fly Box",
  "A gasket-sealed slim box with silicone slit foam. Floats, and keeps a day of flies dry through a fall in the river.",
  "Packs & Nets","22.00",["accessory","Equipment"],"Waterproof Fly Box — gasketed, floats"))
P.append(single("fly-tying-starter-kit","Fly Tying Starter Kit",
  "Everything to tie your first two dozen flies: vise, bobbin, scissors, thread, and a curated material pack with a printed pattern card.",
  "Tools","119.00",["tools","Equipment","condition:base-camp"],"Fly Tying Starter Kit"))
P.append(single("rotary-tying-vise","Rotary Tying Vise",
  "A true-rotary vise with a hardened steel jaw that holds sizes 20 to 2/0. Smooth rotation, adjustable tension, and a solid pedestal base.",
  "Tools","159.00",["tools","Equipment"],"Rotary Tying Vise — true rotary"))

# apparel
P.append(dict(handle="storm-wading-jacket",title="Storm Wading Jacket",
  body="A 3-layer taped shell cut for casting, with fully waterproof zips and pockets that clear a wading belt. The jacket we hand to a guide on the worst day of the week.",
  type="Outerwear",tags=["apparel","Apparel","condition:wet-weather"],option="Size",
  variants=[dict(opt=s,price="180.00",compare="220.00",qty=q,sku=f"JACKET-{s}") for s,q in
            [("XS",6),("S",10),("M",12),("L",12),("XL",8),("XXL",5)]],
  seo="Storm Wading Jacket — 3-layer taped shell"))
P.append(dict(handle="river-hoodie",title="River Hoodie",
  body="A midweight grid-fleece hoodie that layers under a shell or stands alone on a cool morning. Quiet, quick-drying, and cut long in the back.",
  type="Layers",tags=["apparel","Apparel","condition:cold-water"],option="Size",
  variants=[dict(opt=s,price="64.00",qty=q,sku=f"HOODIE-{s}") for s,q in
            [("XS",8),("S",14),("M",16),("L",14),("XL",10),("XXL",6)]],
  seo="River Hoodie — grid-fleece midlayer"))
P.append(dict(handle="field-tee",title="Field Tee",
  body="A heavyweight cotton-blend tee with a left-chest Tailwater mark. Broken-in from the first wear, built to outlast the season.",
  type="Base layers",tags=["apparel","Apparel","condition:high-sun"],option="Size",
  variants=[dict(opt=s,price="28.00",qty=q,sku=f"TEE-{s}") for s,q in
            [("XS",10),("S",18),("M",20),("L",18),("XL",12),("XXL",8)]],
  seo="Field Tee — heavyweight cotton blend"))
P.append(single("guide-cap","Guide Cap",
  "A structured 6-panel cap with a sweat-wicking band and a low, non-glare brim. One size, adjustable, in field olive.",
  "Headwear","26.00",["apparel","Apparel","condition:high-sun"],"Guide Cap — 6-panel, adjustable"))

# gift card (price range via denominations)
P.append(dict(handle="tailwater-gift-card",title="Tailwater Gift Card",
  body="A digital gift card, delivered by email. Redeemable on anything in the shop and it never expires.",
  type="Gift Card",tags=["gift-card"],option="Denomination",
  variants=[dict(opt=d,price=p,qty=0,sku=f"GC-{d}",tracked=False) for d,p in
            [("$25","25.00"),("$50","50.00"),("$100","100.00"),("$200","200.00")]],
  seo="Tailwater Gift Card",gift=True))

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
        first = (i==0)
        tracked = v.get("tracked", True)
        row={c:"" for c in COLS}
        row["Handle"]=p["handle"]
        if first:
            row["Title"]=p["title"]; row["Body (HTML)"]=f"<p>{p['body']}</p>"
            row["Vendor"]=VENDOR; row["Type"]=p["type"]; row["Tags"]=", ".join(p["tags"])
            row["Published"]="TRUE"; row["Gift Card"]="TRUE" if p.get("gift") else "FALSE"
            row["SEO Title"]=p.get("seo",p["title"]); row["SEO Description"]=p["body"][:150]
            row["Status"]="active"
        row["Option1 Name"]= ("Title" if single_opt else p["option"]) if first else ""
        # subsequent rows still need Option1 Name blank per Shopify (only first defines)
        if not first:
            row["Option1 Name"]=""
        row["Option1 Value"]=v["opt"]
        row["Variant SKU"]=v.get("sku","")
        row["Variant Inventory Tracker"]="shopify" if tracked else ""
        row["Variant Inventory Qty"]=str(v.get("qty",0))
        row["Variant Inventory Policy"]="deny"
        row["Variant Fulfillment Service"]="manual"
        row["Variant Price"]=v["price"]
        row["Variant Compare At Price"]=v.get("compare","") or ""
        row["Variant Requires Shipping"]="FALSE" if p.get("gift") else "TRUE"
        row["Variant Taxable"]="FALSE" if p.get("gift") else "TRUE"
        rows.append(row)

with open(OUT,"w",newline="") as f:
    w=csv.DictWriter(f,fieldnames=COLS); w.writeheader(); w.writerows(rows)

# ---- validate ----
errs=[]; handles=[p["handle"] for p in P]
if len(handles)!=len(set(handles)): errs.append("duplicate handles")
sale=[p["handle"] for p in P if any(v.get("compare") for v in p["variants"])]
soldout=[p["handle"] for p in P if all(v.get("qty",0)==0 and v.get("tracked",True) for v in p["variants"])]
multi=[p["handle"] for p in P if p["option"]]
single_v=[p["handle"] for p in P if not p["option"]]
# price range = variants with differing prices
prange=[p["handle"] for p in P if len({v["price"] for v in p["variants"]})>1]
longtitle=[p["handle"] for p in P if len(p["title"])>45]
if not sale: errs.append("no sale product")
if not soldout: errs.append("no sold-out product")
if not prange: errs.append("no price-range product")
if not multi or not single_v: errs.append("missing variant coverage")
print("PRODUCTS:",len(P),"VARIANT ROWS:",len(rows))
print("sale:",sale)
print("sold-out:",soldout)
print("price-range:",prange)
print("long-title(>45):",longtitle)
print("multi-variant:",len(multi),"single:",len(single_v))
print("ERRORS:",errs or "none")
