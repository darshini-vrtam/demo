"""Concatenate src/ into one self-contained page.
dhanteras-gift-of-life.html is a complete standalone document; the artifact copy (written only when a path is given) omits the
outer <!doctype>/<html>/<body> wrapper because the artifact host adds its own."""
import glob, os, sys
d = os.path.dirname(os.path.abspath(__file__))
head = open(os.path.join(d, 'src/head.html')).read()
js = '\n'.join(open(f).read() for f in sorted(glob.glob(os.path.join(d, 'src/*.js'))))
script = '\n<script>\n' + js + '\n</script>\n'
body = head + script
cut = head.index('<div id="app">')
full = ('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        + head[:cut] + '</head>\n<body>\n' + head[cut:] + script + '</body>\n</html>\n')
open(os.path.join(d, 'dhanteras-gift-of-life.html'), 'w').write(full)
if len(sys.argv) > 1:
    open(sys.argv[1], 'w').write(body)
print(len(full))
