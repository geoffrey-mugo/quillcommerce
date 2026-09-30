#!/usr/bin/env python3
"""Validate the paste-ready article HTML in article-html.md:
whitelist tags, well-formed nesting, no attributes, no stray Markdown, no h1."""
import re, sys
from html.parser import HTMLParser

SRC = __file__.rsplit("/",1)[0] + "/article-html.md"
ALLOWED = {"p","h2","h3","ul","ol","li","blockquote","figure","figcaption"}
VOID = set()  # no void elements expected in article body

class V(HTMLParser):
    def __init__(self): super().__init__(); self.stack=[]; self.errs=[]
    def handle_starttag(self,t,attrs):
        if t not in ALLOWED: self.errs.append(f"disallowed tag <{t}>")
        if attrs: self.errs.append(f"attribute on <{t}>: {attrs}")
        self.stack.append(t)
    def handle_endtag(self,t):
        if not self.stack or self.stack[-1]!=t:
            self.errs.append(f"mismatched </{t}> (stack={self.stack[-3:]})")
        else: self.stack.pop()

def check(html, idx):
    errs=[]
    v=V(); v.feed(html); errs+=v.errs
    if v.stack: errs.append(f"unclosed tags: {v.stack}")
    # stray markdown / forbidden inline
    for pat,msg in [(r"\*\*","bold **"),(r"(^|\n)\s*#","heading #"),
                    (r"\[[^\]]*\]\([^)]*\)","md link []()"),(r"`","backtick"),
                    (r"<a\b","<a> link"),(r"<img\b","<img>"),
                    (r"<strong\b","<strong>"),(r"<em\b","<em>"),
                    (r'style=|class=|id=|<script',"style/class/script")]:
        if re.search(pat,html): errs.append(f"stray: {msg}")
    if re.search(r"<h1\b",html): errs.append("content contains <h1> (must start at h2)")
    # basic paragraph sanity: text present
    if "<p>" not in html: errs.append("no <p> content")
    return errs

md=open(SRC).read()
blocks=re.findall(r"```html\n(.*?)```", md, re.S)
if not blocks: print("no html blocks found"); sys.exit(1)
bad=0
for i,b in enumerate(blocks,1):
    e=check(b,i)
    print(f"Article block {i}: {'OK' if not e else 'FAIL'}")
    for x in e: print("   -",x);
    bad+=1 if e else 0
print("\n"+("ALL ARTICLES OK" if not bad else f"{bad} BLOCK(S) FAILED"))
sys.exit(1 if bad else 0)
