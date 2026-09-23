#!/usr/bin/env python3
"""Build both single-file pages. Run: python3 build.py

index.html   ← rough.src.html   (the hand-drawn Rough.js edition; vendor/rough.js is inlined at __ROUGH_JS__)
painted.html ← painted.src.html (the earlier painted-art edition; __ART:file.webp__ → base64 data URIs from assets/)
"""
import base64, pathlib, re, sys

root = pathlib.Path(__file__).parent
mime = {'.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg'}

def inline(m):
    f = root / 'assets' / m.group(1)
    if not f.exists():
        sys.exit(f'missing asset: {f}')
    return f'data:{mime[f.suffix]};base64,' + base64.b64encode(f.read_bytes()).decode()

def write(name, text):
    (root / name).write_text(text, encoding='utf-8')
    print(f'{name}: {len(text.encode()) / 1024:.0f} KB')

rough_js = (root / 'vendor' / 'rough.js').read_text(encoding='utf-8')
write('index.html', (root / 'rough.src.html').read_text(encoding='utf-8').replace('__ROUGH_JS__', rough_js, 1))
write('painted.html', re.sub(r'__ART:([\w.-]+)__', inline, (root / 'painted.src.html').read_text(encoding='utf-8')))
