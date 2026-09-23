#!/usr/bin/env python3
"""Inline the art in assets/ into story.src.html as base64 data URIs → index.html.

Placeholders look like __ART:filename.webp__. Run: python3 build.py
"""
import base64, pathlib, re, sys

root = pathlib.Path(__file__).parent
src = (root / 'story.src.html').read_text(encoding='utf-8')
mime = {'.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg'}

def inline(m):
    f = root / 'assets' / m.group(1)
    if not f.exists():
        sys.exit(f'missing asset: {f}')
    return f'data:{mime[f.suffix]};base64,' + base64.b64encode(f.read_bytes()).decode()

out = re.sub(r'__ART:([\w.-]+)__', inline, src)
(root / 'index.html').write_text(out, encoding='utf-8')
print(f'index.html: {len(out.encode()) / 1024:.0f} KB')
