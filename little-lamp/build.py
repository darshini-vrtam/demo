#!/usr/bin/env python3
"""Concatenate src/*.js into src/page.html → index.html (artifact body) and preview.html (standalone).

Run: python3 build.py
"""
import pathlib

root = pathlib.Path(__file__).parent
src = root / 'src'
js = '\n'.join((f.read_text(encoding='utf-8')) for f in sorted(src.glob('*.js')))
page = (src / 'page.html').read_text(encoding='utf-8').replace('/*__JS__*/', js)
(root / 'index.html').write_text(page, encoding='utf-8')
preview = ('<!doctype html><html lang="en"><head><meta charset="utf-8">'
           '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
           '</head><body>' + page + '</body></html>')
(root / 'preview.html').write_text(preview, encoding='utf-8')
print(f'index.html: {len(page.encode()) / 1024:.0f} KB')
