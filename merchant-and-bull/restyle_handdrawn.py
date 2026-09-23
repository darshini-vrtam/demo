#!/usr/bin/env python3
"""Turn the code-drawn build into the hand-drawn (ink + wash on paper) build.
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
    "/* One committed storybook world (dusk-lit paper + turmeric), so a single palette is used in every theme.\n   Hand-drawn pass: scene art goes through an ink-wobble + pencil-overdraw filter and sits under a watercolour-paper wash. */")

# ── Paper wash replaces the digital grain (texture is painted by script) ──
g0 = src.index('#grain{'); g1 = src.index('\n', g0)
src = src[:g0] + '#grain{position:absolute;inset:0;pointer-events:none;opacity:.5;mix-blend-mode:multiply;background-size:512px 512px}' + src[g1:]

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
.askcard .face,#endbook{filter:url(#handsm)}
"""
rep('/* ─── SVG motion vocabulary ─── */', css_extra + '\n/* ─── SVG motion vocabulary ─── */')

# ── Filters + hatch pattern, and an ink wrapper around the camera group ──
defs_extra = '''<filter id="hand" filterUnits="userSpaceOnUse" x="-2000" y="-2000" width="5600" height="5000" color-interpolation-filters="sRGB">
          <feImage id="nimgA" preserveAspectRatio="none" x="0" y="0" width="400" height="400" result="tA"/>
          <feTile in="tA" result="nA"/>
          <feImage id="nimgB" preserveAspectRatio="none" x="0" y="0" width="400" height="400" result="tB"/>
          <feTile in="tB" result="nB"/>
          <feDisplacementMap in="SourceGraphic" in2="nA" scale="7" xChannelSelector="R" yChannelSelector="G" result="d"/>
          <feColorMatrix in="d" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -3 -5.9 -1.1 0 2.6" result="dark"/>
          <feComposite in="dark" in2="d" operator="in" result="ink"/>
          <feDisplacementMap in="ink" in2="nB" scale="12" xChannelSelector="G" yChannelSelector="R" result="ink2"/>
          <feComponentTransfer in="ink2" result="ink3"><feFuncA type="linear" slope=".32"/></feComponentTransfer>
          <feMerge><feMergeNode in="d"/><feMergeNode in="ink3"/></feMerge>
        </filter>
        <filter id="handsm" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.5" xChannelSelector="R" yChannelSelector="G"/></filter>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="11" height="11" patternTransform="rotate(38)"><path d="M0,2 L11,2 M0,7.5 L11,7.3" stroke="#3B2414" stroke-width="1.7" stroke-linecap="round" fill="none"/></pattern>
        <g id="sdefs"></g>'''
rep('<g id="sdefs"></g>', defs_extra)
rep('<g id="world"></g>', '<g id="ink" filter="url(#hand)"><g id="world"></g></g>')

# ── Pencil hatching on ground and foliage ──
rep("""  const p = S('path', { d, fill: color });
  if (o.stroke) { p.setAttribute('stroke', INK); p.setAttribute('stroke-width', 4); }
  r.append(p); return p;""",
"""  const p = S('path', { d, fill: color });
  if (o.stroke) { p.setAttribute('stroke', INK); p.setAttribute('stroke-width', 4); }
  r.append(p);
  // pencil shading: hatch only a band under the ridge, the way an illustrator shades a slope
  const band = S('path', { d: d.replace(/,3000/g, ',' + (y + 150)), fill: 'url(#hatch)', opacity: .1, 'pointer-events': 'none' });
  p._hatch = band; r.append(band);
  return p;""")
rep("""  if (o.hi) g.append(G({ fill: o.hi, stroke: 'none', opacity: .6 }, circles.filter((c, i) => i % 2 === 0).map(([x, y, r]) => S('circle', { cx: x - r * .22, cy: y - r * .3, r: r * .5 }))));
  return g;""",
"""  if (o.hi) g.append(G({ fill: o.hi, stroke: 'none', opacity: .6 }, circles.filter((c, i) => i % 2 === 0).map(([x, y, r]) => S('circle', { cx: x - r * .22, cy: y - r * .3, r: r * .5 }))));
  if (o.hi) g.append(G({ fill: 'url(#hatch)', stroke: 'none', opacity: .2, 'pointer-events': 'none' }, circles.filter((c, i) => i % 2 === 1).map(([x, y, r]) => S('circle', { cx: x + r * .18, cy: y + r * .28, r: r * .62 }))));
  return g;""")

# ── Paint the noise tiles + paper, and let the linework "boil" ──
paint_js = r"""
/* ══════════ Hand-drawn look: noise tiles, watercolour paper, line boil ══════════ */
(function handDrawn() {
  // Tileable value noise → RG displacement map (128px tile stretched over 400 units).
  function noiseTile(seed, cellsA, cellsB) {
    const N = 128, c = document.createElement('canvas'); c.width = c.height = N;
    const x = c.getContext('2d'), img = x.createImageData(N, N), R = rng(seed);
    const lattice = n => { const a = []; for (let i = 0; i < n * n; i++) a.push(R()); return a; };
    const layers = [[cellsA, lattice(cellsA), lattice(cellsA), .7], [cellsB, lattice(cellsB), lattice(cellsB), .3]];
    const sm = t => t * t * (3 - 2 * t);
    const at = (L, n, u, v) => {
      const fx = u * n, fy = v * n, x0 = Math.floor(fx), y0 = Math.floor(fy), tx = sm(fx - x0), ty = sm(fy - y0);
      const g = (i, j) => L[((j % n + n) % n) * n + ((i % n + n) % n)];
      const a = g(x0, y0) + (g(x0 + 1, y0) - g(x0, y0)) * tx, b = g(x0, y0 + 1) + (g(x0 + 1, y0 + 1) - g(x0, y0 + 1)) * tx;
      return a + (b - a) * ty;
    };
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const u = i / N, v = j / N; let r = 0, gg = 0;
      for (const [n, LR, LG, w] of layers) { r += at(LR, n, u, v) * w; gg += at(LG, n, u, v) * w; }
      const k = (j * N + i) * 4;
      img.data[k] = Math.round(r * 255); img.data[k + 1] = Math.round(gg * 255); img.data[k + 2] = 128; img.data[k + 3] = 255;
    }
    x.putImageData(img, 0, 0); return c.toDataURL('image/png');
  }
  const setHref = (el, u) => { el.setAttribute('href', u); el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', u); };
  const nA = $('#nimgA'), nB = $('#nimgB');
  try { setHref(nA, noiseTile(11, 8, 22)); setHref(nB, noiseTile(29, 6, 16)); } catch (e) { $('#ink').removeAttribute('filter'); }

  // Watercolour paper: soft pigment blooms, fibres and tooth, painted once into a seamless tile.
  try {
    const N = 512, c = document.createElement('canvas'); c.width = c.height = N;
    const x = c.getContext('2d'), R = rng(5);
    x.fillStyle = '#FBF3E2'; x.fillRect(0, 0, N, N);
    const wrap = fn => { for (const dx of [-N, 0, N]) for (const dy of [-N, 0, N]) fn(dx, dy); };
    for (let i = 0; i < 26; i++) {
      const cx = R() * N, cy = R() * N, rad = 40 + R() * 130, a = .03 + R() * .05;
      wrap((dx, dy) => { const g = x.createRadialGradient(cx + dx, cy + dy, rad * .2, cx + dx, cy + dy, rad);
        g.addColorStop(0, `rgba(196,160,110,${a * .4})`); g.addColorStop(.82, `rgba(176,136,90,${a})`); g.addColorStop(1, 'rgba(176,136,90,0)');
        x.fillStyle = g; x.beginPath(); x.arc(cx + dx, cy + dy, rad, 0, Math.PI * 2); x.fill(); });
    }
    x.lineCap = 'round';
    for (let i = 0; i < 900; i++) {
      const px = R() * N, py = R() * N, l = 3 + R() * 14, an = R() * Math.PI;
      x.strokeStyle = R() < .5 ? `rgba(120,88,52,${.05 + R() * .08})` : `rgba(255,255,255,${.25 + R() * .3})`;
      x.lineWidth = .6 + R() * .8;
      wrap((dx, dy) => { x.beginPath(); x.moveTo(px + dx, py + dy); x.lineTo(px + dx + Math.cos(an) * l, py + dy + Math.sin(an) * l); x.stroke(); });
    }
    const img = x.getImageData(0, 0, N, N), d = img.data;
    for (let k = 0; k < d.length; k += 4) { const t = (R() - .5) * 22; d[k] += t; d[k + 1] += t; d[k + 2] += t; }
    x.putImageData(img, 0, 0);
    $('#grain').style.backgroundImage = `url(${c.toDataURL('image/jpeg', .86)})`;
  } catch (e) { }

  // Filter only what the screen shows (the scene is 1600×900, letterboxed with "meet").
  const hf = $('#hand');
  const fitFilter = () => {
    const w = innerWidth || 1600, h = innerHeight || 900, k = Math.min(w / W, h / H), vw = w / k, vh = h / k, m = 40;
    hf.setAttribute('x', ((W - vw) / 2 - m).toFixed(0)); hf.setAttribute('y', ((H - vh) / 2 - m).toFixed(0));
    hf.setAttribute('width', (vw + 2 * m).toFixed(0)); hf.setAttribute('height', (vh + 2 * m).toFixed(0));
  };
  fitFilter(); addEventListener('resize', fitFilter);

  // Quality guard: on a device that can't keep up, drop the pencil overdraw, then the wobble.
  // Paper, hatching and the hand-cut UI stay either way.
  let tier = 0, low = 0, frames = 0, t0 = performance.now();
  const extra = [...hf.children].slice(5);
  const tick = now => {
    frames++;
    if (now - t0 >= 2500) {
      const fps = frames * 1000 / (now - t0); frames = 0; t0 = now;
      const watching = !document.hidden && $('#title').hidden && $('#game').hidden;
      low = watching && fps < 22 ? low + 1 : 0;
      if (low >= 2 && tier < 2) {
        low = 0; tier++;
        if (tier === 1) extra.forEach(e => e.remove());
        else $('#ink').removeAttribute('filter');
        console.info('[hand-drawn] quality tier', tier, 'at', fps.toFixed(1), 'fps');
      }
    }
    if (tier < 2) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // Boil: shift the wobble field a few times a second, like redrawn animation frames.
  const still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still) {
    const offs = [[0, 0], [137, 61], [263, 191], [71, 311]]; let f = 0;
    setInterval(() => {
      if (document.hidden) return;
      f = (f + 1) % offs.length; const [ox, oy] = offs[f];
      nA.setAttribute('x', ox); nA.setAttribute('y', oy); nB.setAttribute('x', -oy); nB.setAttribute('y', ox);
    }, 170);
  }
})();
"""
rep("\nfunction newStage(bg) {", paint_js + "\nfunction newStage(bg) {")

if n_fail: sys.exit(f'{n_fail} replacements failed')
out_path.write_text(src, encoding='utf-8')
print('ok', len(src))
