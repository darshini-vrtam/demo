#!/usr/bin/env python3
"""Turn the code-drawn build into the hand-drawn (crayon + coloured pencil, "how a kid draws") build.
Only the look changes: story, interactions, narration and SFX code are untouched."""
import pathlib, sys

src = pathlib.Path(sys.argv[1]).read_text(encoding='utf-8')
out_path = pathlib.Path(sys.argv[2])
n_fail = 0

def rep(old, new, count=1):
    global src, n_fail
    c = src.count(old)
    if c != count:
        print(f'!! expected {count} got {c}: {old[:70]!r}'); n_fail += 1; return
    src = src.replace(old, new)

# ── Fonts: hand-lettered body face (Kalam), brush display face kept ──
rep('family=Baloo+2:wght@500;600;700;800&family=Yatra+One',
    'family=Baloo+2:wght@500;600;700;800&family=Kalam:wght@400;700&family=Yatra+One')
rep("--body:'Baloo 2','Trebuchet MS',system-ui,sans-serif;",
    "--body:'Kalam','Baloo 2','Trebuchet MS',system-ui,sans-serif;\n  /* hand-cut corners: no two edges bend the same way */\n  --wob:18px 26px 14px 30px / 28px 14px 24px 16px;\n  --wob-pill:255px 22px 225px 18px / 18px 225px 22px 255px;")
rep("\"'Baloo 2',sans-serif\"", "\"'Kalam','Baloo 2',sans-serif\"", src.count("\"'Baloo 2',sans-serif\""))
rep("/* One committed storybook world (dusk-lit paper + turmeric), so a single palette is used in every theme. */",
    "/* One committed storybook world (dusk-lit paper + turmeric), so a single palette is used in every theme.\n   Hand-drawn pass: a neat child's crayon drawing. Scribble shading and crayon sky strokes in the art;\n   waxy colouring strokes and white paper tooth laid over it. Nothing moves the linework. */")

# ── Crayon wax layer replaces the digital grain (texture is painted by script) ──
g0 = src.index('#grain{'); g1 = src.index('\n', g0)
src = src[:g0] + '#grain{position:absolute;inset:0;pointer-events:none;opacity:.7;mix-blend-mode:multiply;background-size:512px 512px}' + src[g1:]

# ── Wobbly, hand-cut UI edges ──
css_extra = """
/* ─── Hand-drawn chrome ─── */
#chip,#hint,.pill,.gsmall,#gname,#who{border-radius:var(--wob-pill)}
#cap,.askcard,#gnote,#menulist button,#glogp{border-radius:var(--wob)}
.cbtn{border-radius:48% 52% 46% 54% / 54% 46% 52% 48%}
.askbar{border-radius:var(--wob-pill)}
#cap,.askcard,#gnote{box-shadow:3px 5px 0 var(--ink),-1px -1px 0 1px rgba(59,36,20,.35)}
.pill,#chip,.cbtn,#hint,#menulist button{box-shadow:2px 3px 0 var(--ink)}
#line{font-weight:700;letter-spacing:.005em}
#askq{font-weight:700}
"""
rep('/* ─── SVG motion vocabulary ─── */', css_extra + '\n/* ─── SVG motion vocabulary ─── */')

# ── Crayon scribble + sky-stroke patterns ──
defs_extra = '''<pattern id="hatch" patternUnits="userSpaceOnUse" width="130" height="44" patternTransform="rotate(-24)"><path d="M-4,8 L6,34 L12,10 L19,38 L27,6 L33,31 L41,12 L47,36 L56,9 L61,29 L70,7 L77,35 L84,13 L92,33 L99,8 L106,37 L114,11 L121,30 L134,8" stroke="#3B2414" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></pattern>
        <pattern id="skystroke" patternUnits="userSpaceOnUse" width="420" height="64" patternTransform="rotate(-6)"><path d="M6,14 C90,8 180,20 300,11 M140,40 C220,34 300,46 410,38 M-10,56 C40,52 80,58 120,54" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" fill="none"/></pattern>
        <g id="sdefs"></g>'''
rep('<g id="sdefs"></g>', defs_extra)

# ── Crayon scribble shading on ground and foliage, crayon strokes in the sky ──
rep("""  const p = S('path', { d, fill: color });
  if (o.stroke) { p.setAttribute('stroke', INK); p.setAttribute('stroke-width', 4); }
  r.append(p); return p;""",
"""  const p = S('path', { d, fill: color });
  if (o.stroke) { p.setAttribute('stroke', INK); p.setAttribute('stroke-width', 4); }
  r.append(p);
  // crayon scribble shading in a band under the ridge
  const band = S('path', { d: d.replace(/,3000/g, ',' + (y + 150)), fill: 'url(#hatch)', opacity: .13, 'pointer-events': 'none' });
  p._hatch = band; r.append(band);
  return p;""")
rep("""  if (o.hi) g.append(G({ fill: o.hi, stroke: 'none', opacity: .6 }, circles.filter((c, i) => i % 2 === 0).map(([x, y, r]) => S('circle', { cx: x - r * .22, cy: y - r * .3, r: r * .5 }))));
  return g;""",
"""  if (o.hi) g.append(G({ fill: o.hi, stroke: 'none', opacity: .6 }, circles.filter((c, i) => i % 2 === 0).map(([x, y, r]) => S('circle', { cx: x - r * .22, cy: y - r * .3, r: r * .5 }))));
  if (o.hi) g.append(G({ fill: 'url(#hatch)', stroke: 'none', opacity: .17, 'pointer-events': 'none' }, circles.filter((c, i) => i % 2 === 1).map(([x, y, r]) => S('circle', { cx: x + r * .18, cy: y + r * .28, r: r * .62 }))));
  return g;""")

rep("""  const rect = S('rect', { x: -2000, y: -2000, width: 5600, height: 5000, fill: `url(#${id})` });
  r.append(rect); return rect;""",
"""  const rect = S('rect', { x: -2000, y: -2000, width: 5600, height: 5000, fill: `url(#${id})` });
  r.append(rect);
  // long, loose crayon strokes across the sky, the paper showing between them
  r.append(S('rect', { x: -2000, y: -2000, width: 5600, height: 5000, fill: 'url(#skystroke)', opacity: .05, 'pointer-events': 'none' }));
  return rect;""")

# ── Crayon tooth layer (screen) sits above the multiply layer ──
rep('<div id="grain"></div>', '<div id="grain"></div>\n    <div id="tooth"></div>')
rep('/* ─── Hand-drawn chrome ─── */', '#tooth{position:absolute;inset:0;pointer-events:none;opacity:.13;mix-blend-mode:screen;background-size:384px 384px}\n/* ─── Hand-drawn chrome ─── */')

# ── Paint the crayon paper ──
paint_js = r"""
/* ══════════ Hand-drawn look: crayon on paper ══════════ */
(function handDrawn() {
  // Crayon on paper, painted once into seamless tiles:
  //  #grain (multiply): waxy colouring strokes all laid the same way, as a child colours in.
  //  #tooth (screen): flecks of white paper the wax skipped over.
  try {
    const tile = (N, seed, base, draw) => {
      const c = document.createElement('canvas'); c.width = c.height = N;
      const x = c.getContext('2d'), R = rng(seed);
      x.fillStyle = base; x.fillRect(0, 0, N, N); x.lineCap = 'round';
      const wrap = fn => { for (const dx of [-N, 0, N]) for (const dy of [-N, 0, N]) fn(dx, dy); };
      draw(x, R, N, wrap); return c;
    };
    const AN = -0.42; // colouring direction
    const wax = tile(512, 5, '#FFFBF2', (x, R, N, wrap) => {
      for (let i = 0; i < 2600; i++) {
        const px = R() * N, py = R() * N, l = 10 + R() * 34, an = AN + (R() - .5) * .25;
        x.strokeStyle = `rgba(110,74,40,${.035 + R() * .07})`; x.lineWidth = 1 + R() * 2.4;
        wrap((dx, dy) => { x.beginPath(); x.moveTo(px + dx, py + dy); x.lineTo(px + dx + Math.cos(an) * l, py + dy + Math.sin(an) * l); x.stroke(); });
      }
      for (let i = 0; i < 18; i++) {
        const cx = R() * N, cy = R() * N, rad = 50 + R() * 110, a = .025 + R() * .03;
        wrap((dx, dy) => { const g = x.createRadialGradient(cx + dx, cy + dy, 0, cx + dx, cy + dy, rad);
          g.addColorStop(0, `rgba(150,110,70,${a})`); g.addColorStop(1, 'rgba(150,110,70,0)');
          x.fillStyle = g; x.beginPath(); x.arc(cx + dx, cy + dy, rad, 0, Math.PI * 2); x.fill(); });
      }
    });
    $('#grain').style.backgroundImage = `url(${wax.toDataURL('image/jpeg', .86)})`;
    const tooth = tile(384, 17, '#000', (x, R, N, wrap) => {
      for (let i = 0; i < 3200; i++) {
        const px = R() * N, py = R() * N, l = 1 + R() * 6, an = AN + (R() - .5) * .35;
        x.strokeStyle = `rgba(255,252,240,${.2 + R() * .5})`; x.lineWidth = .6 + R() * 1.4;
        wrap((dx, dy) => { x.beginPath(); x.moveTo(px + dx, py + dy); x.lineTo(px + dx + Math.cos(an) * l, py + dy + Math.sin(an) * l); x.stroke(); });
      }
    });
    $('#tooth').style.backgroundImage = `url(${tooth.toDataURL('image/jpeg', .86)})`;
  } catch (e) { }

})();
"""
rep("\nfunction newStage(bg) {", paint_js + "\nfunction newStage(bg) {")

if n_fail: sys.exit(f'{n_fail} replacements failed')
out_path.write_text(src, encoding='utf-8')
print('ok', len(src))

