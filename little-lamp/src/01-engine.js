'use strict';
// ───────────────────────── Palette tokens (read from CSS so there is one source) ─────────────────────────
const CSSV = getComputedStyle(document.documentElement);
const tok = (n, f) => (CSSV.getPropertyValue(n).trim() || f);
const PAL = {
  wall: tok('--wall-white', '#f4ead2'), ochre: tok('--mud-ochre', '#d9a566'), char: tok('--charcoal', '#1f1712'),
  orange: tok('--marigold', '#f08a24'), terra: tok('--terracotta', '#b5532e'), yellow: tok('--turmeric', '#f2b41c'),
  red: tok('--pithora-red', '#c8321e'), green: tok('--leaf-green', '#3f8a3a'), turq: tok('--turquoise', '#2fa3a0'),
  indigo: tok('--indigo', '#22408f'), pink: tok('--pink', '#e2587f'), glow: tok('--lamp-glow', '#ffd75e'),
};
const FONT = tok('--font-story', '"Baloo 2", "Trebuchet MS", system-ui, sans-serif');
// Mood = wall colour
const MOOD = { white: PAL.wall, worry: PAL.orange, courage: PAL.indigo, danger: PAL.red, shared: PAL.yellow };

// ───────────────────────── Maths & noise ─────────────────────────
const clamp = (v, a = 0, b = 1) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const backOut = t => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const TAU = Math.PI * 2;
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function noise(x) { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return lerp(hash(i), hash(i + 1), u) * 2 - 1; }
function rng(seed) { let s = (seed * 9301 + 49297) % 233280 || 1; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
function hex2rgb(h) { const n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
function mixc(a, b, t) { const A = hex2rgb(a), B = hex2rgb(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(t))).toString(16).padStart(2, '0')).join(''); }
function rgba(h, a) { const [r, g, b] = hex2rgb(h); return `rgba(${r},${g},${b},${a})`; }
function lum(h) { const [r, g, b] = hex2rgb(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; }

// ───────────────────────── Canvas, layout and view ─────────────────────────
const cv = document.getElementById('wall');
const ctx = cv.getContext('2d');
const V = { W: 1920, H: 1080, p: false, k: 1, s: 1, ox: 0, oy: 0, dpr: 1, cssW: 0, cssH: 0, gen: 0 };
function resize() {
  const r = cv.getBoundingClientRect();
  const vw = Math.max(200, r.width), vh = Math.max(200, r.height);
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (vw * vh * dpr * dpr > 4.6e6) dpr = Math.sqrt(4.6e6 / (vw * vh));
  const ar = vw / vh;
  V.p = ar < 0.95;
  if (!V.p) { V.H = 1080; V.W = Math.round(clamp(1080 * ar, 1440, 2400)); }
  else { V.W = 1080; V.H = Math.round(clamp(1080 / ar, 1350, 2400)); }
  V.s = Math.min(vw / V.W, vh / V.H);
  V.ox = (vw - V.W * V.s) / 2; V.oy = (vh - V.H * V.s) / 2;
  V.dpr = dpr; V.k = V.s * dpr; V.cssW = vw; V.cssH = vh;
  cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr);
  V.gen++;
  SPR.clear(); WALLC.grain = null; WALLC.fill = null;
}
const toLogical = (cx, cy) => { const r = cv.getBoundingClientRect(); return [(cx - r.left - V.ox) / V.s, (cy - r.top - V.oy) / V.s]; };
// Composition helper: landscape value or portrait value
const PL = (land, port) => V.p ? port : land;

// ───────────────────────── Point-list shapes ─────────────────────────
// Catmull-Rom through control points → dense polyline
function cr(c, closed = true, seg = 8) {
  const n = c.length, out = [], N = closed ? n : n - 1;
  for (let i = 0; i < N; i++) {
    const p0 = closed ? c[(i - 1 + n) % n] : c[Math.max(0, i - 1)], p1 = c[i], p2 = c[(i + 1) % n], p3 = closed ? c[(i + 2) % n] : c[Math.min(n - 1, i + 2)];
    for (let k = 0; k < seg; k++) {
      const t = k / seg, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
        0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]);
    }
  }
  if (!closed) out.push(c[n - 1].slice());
  return out;
}
// Thick tapered band along an open curve (legs, tails, arms, serpents) → closed polygon
function band(ctrl, w0, w1, seg = 8, cap = true) {
  const c = ctrl.length > 2 ? cr(ctrl, false, seg) : ctrl;
  const L = [], R = [], m = c.length;
  for (let i = 0; i < m; i++) {
    const a = c[Math.max(0, i - 1)], b = c[Math.min(m - 1, i + 1)];
    let dx = b[0] - a[0], dy = b[1] - a[1]; const d = Math.hypot(dx, dy) || 1; dx /= d; dy /= d;
    const w = lerp(w0, w1, i / (m - 1)) / 2;
    L.push([c[i][0] - dy * w, c[i][1] + dx * w]); R.push([c[i][0] + dy * w, c[i][1] - dx * w]);
  }
  const out = L.slice();
  if (cap) { // round end cap
    const e = c[m - 1], w = w1 / 2, a0 = Math.atan2(L[m - 1][1] - e[1], L[m - 1][0] - e[0]);
    for (let k = 1; k < 6; k++) { const a = a0 - Math.PI * k / 6; out.push([e[0] + Math.cos(a) * w, e[1] + Math.sin(a) * w]); }
  }
  for (let i = m - 1; i >= 0; i--) out.push(R[i]);
  return out;
}
const ell = (cx, cy, rx, ry, n = 28, a0 = 0) => { const o = []; for (let i = 0; i < n; i++) { const a = a0 + i / n * TAU; o.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]); } return o; };
const rectP = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
function resample(pts, closed, step) {
  const src = closed ? pts.concat([pts[0]]) : pts, out = [src[0].slice()]; let carry = 0;
  for (let i = 1; i < src.length; i++) {
    const a = src[i - 1], b = src[i], d = Math.hypot(b[0] - a[0], b[1] - a[1]); let t = step - carry;
    while (t <= d) { out.push([lerp(a[0], b[0], t / d), lerp(a[1], b[1], t / d)]); t += step; }
    carry = d - (t - step);
  }
  if (closed && out.length > 2) out.pop(); else if (!closed) out.push(src[src.length - 1].slice());
  return out;
}
function wobble(pts, seed, amp) {
  const n = pts.length;
  return pts.map((p, i) => {
    const a = pts[(i - 1 + n) % n], b = pts[(i + 1) % n];
    let nx = -(b[1] - a[1]), ny = b[0] - a[0]; const d = Math.hypot(nx, ny) || 1;
    const w = noise(i * 0.19 + seed * 17.3) * amp + noise(i * 0.05 + seed * 3.1) * amp * 0.8;
    return [p[0] + nx / d * w, p[1] + ny / d * w];
  });
}
function finalize(o, seed = 1) {
  let pts = o.pts;
  if (o.step !== 0) pts = resample(pts, true, o.step || 5);
  if ((o.wob ?? 1.3) > 0 && pts.length > 8) pts = wobble(pts, seed, o.wob ?? 1.3);
  const path = new Path2D(); path.moveTo(pts[0][0], pts[0][1]);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; const cum = [0];
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i]; if (i) path.lineTo(p[0], p[1]);
    if (p[0] < x0) x0 = p[0]; if (p[0] > x1) x1 = p[0]; if (p[1] < y0) y0 = p[1]; if (p[1] > y1) y1 = p[1];
    if (i) cum.push(cum[i - 1] + Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]));
  }
  path.closePath();
  const len = cum[cum.length - 1] + Math.hypot(pts[0][0] - pts[pts.length - 1][0], pts[0][1] - pts[pts.length - 1][1]);
  return { pts, path, cum, len, bb: { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }, fill: o.fill, pat: o.pat, lw: o.lw ?? 4, line: o.line };
}
const SHC = new Map();
function SH(key, make) { let s = SHC.get(key); if (!s) { s = finalize(make(), key.length * 7.13 + key.charCodeAt(0)); SHC.set(key, s); } return s; }
const dyn = (pts, fill, pat, lw = 4, wob = 0) => Object.assign(finalize({ pts, fill, pat, lw, step: 0, wob }), { dyn: true });

// ───────────────────────── Dot-pattern fills ─────────────────────────
const PATC = new Map();
function pattern(key) {
  let p = PATC.get(key); if (p) return p;
  const [kind, a, b] = key.split('|');
  const R = 3, tw = kind === 'grid' ? 22 : 34, th = kind === 'grid' ? 22 : 30;
  const c = document.createElement('canvas'); c.width = tw * R; c.height = th * R;
  const x = c.getContext('2d'); x.scale(R, R); x.lineCap = 'round';
  const dot = (cx, cy, r, col) => { x.fillStyle = col; x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.fill(); };
  if (kind === 'rows') {
    for (let i = 0; i < 3; i++) dot(5 + i * 11.3, 5, 2.5, a);
    x.strokeStyle = b; x.lineWidth = 2.2; for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(1 + i * 11.3, 15); x.lineTo(7 + i * 11.3, 15); x.stroke(); }
    x.strokeStyle = a; x.lineWidth = 1.8; for (let i = 0; i < 3; i++) { const q = 5.5 + i * 11.3; x.beginPath(); x.moveTo(q - 3, 23); x.lineTo(q, 27); x.lineTo(q + 3, 23); x.stroke(); }
  } else if (kind === 'dots') {
    for (let r = 0; r < 2; r++) for (let i = 0; i < 2; i++) dot(8.5 + i * 17 + (r ? 8.5 : 0), 7.5 + r * 15, 2.8, r ? b : a);
  } else if (kind === 'grid') {
    dot(5.5, 5.5, 2.2, a); dot(16.5, 16.5, 2.2, b);
  } else if (kind === 'ticks') {
    x.strokeStyle = a; x.lineWidth = 2; for (let i = 0; i < 3; i++) { x.beginPath(); x.moveTo(4 + i * 11.3, 4); x.lineTo(7 + i * 11.3, 10); x.stroke(); }
    for (let i = 0; i < 3; i++) dot(10 + i * 11.3, 20, 2.2, b);
  } else if (kind === 'zig') {
    x.strokeStyle = a; x.lineWidth = 2.2; x.beginPath(); for (let i = 0; i <= 6; i++) x.lineTo(i * 34 / 6, i % 2 ? 4 : 11); x.stroke();
    for (let i = 0; i < 3; i++) dot(5.5 + i * 11.3, 21, 2.4, b);
  }
  p = ctx.createPattern(c, 'repeat');
  try { p.setTransform(new DOMMatrix().scale(1 / R)); } catch (e) { }
  PATC.set(key, p); return p;
}

// ───────────────────────── Draw-on renderer ─────────────────────────
// 0–55%: outline traces itself · then colour fades in · then the dot pattern sweeps left→right
// Fully drawn shapes are cached as bitmaps at the current (quantized) scale: one drawImage per frame.
let BM_PIXELS = 0;
function drawShapeCached(g, sh, alpha) {
  const m = g.getTransform(), sc = Math.hypot(m.a, m.b);
  if (sc < 0.02) return true;
  const q = Math.pow(2, Math.ceil(Math.log2(sc) * 4) / 4), pad = sh.lw + 2, bb = sh.bb;
  const w = Math.ceil((bb.w + pad * 2) * q), h = Math.ceil((bb.h + pad * 2) * q);
  if (w * h > 6e6) return false;
  sh._bm = sh._bm || new Map();
  let c = sh._bm.get(q);
  if (!c || c._gen !== V.gen) {
    c = document.createElement('canvas'); c.width = w; c.height = h; c._gen = V.gen;
    const g2 = c.getContext('2d'); g2.scale(q, q); g2.translate(pad - bb.x, pad - bb.y); g2.lineJoin = 'round'; g2.lineCap = 'round';
    drawShapeLive(g2, sh, 1, 1);
    if (sh._bm.size > 3) sh._bm.delete(sh._bm.keys().next().value);
    sh._bm.set(q, c); BM_PIXELS += w * h;
  }
  const ga = g.globalAlpha; g.globalAlpha = ga * alpha;
  g.drawImage(c, bb.x - pad, bb.y - pad, c.width / q, c.height / q);
  g.globalAlpha = ga;
  return true;
}
function drawShape(g, sh, p = 1, alpha = 1) {
  if (p <= 0) return;
  if (p >= 1 && !sh.dyn && drawShapeCached(g, sh, alpha)) return;
  drawShapeLive(g, sh, p, alpha);
}
function drawShapeLive(g, sh, p, alpha) {
  const a = clamp(p / 0.55), b = clamp((p - 0.5) / 0.25), c = clamp((p - 0.64) / 0.36);
  const ga = g.globalAlpha;
  if (b > 0 && sh.fill) { g.globalAlpha = ga * b * alpha; g.fillStyle = sh.fill; g.fill(sh.path); }
  if (c > 0 && sh.pat) {
    g.save(); g.globalAlpha = ga * alpha; g.clip(sh.path);
    const bb = sh.bb;
    if (c < 1) { g.beginPath(); g.rect(bb.x - 4, bb.y - 4, (bb.w + 8) * c, bb.h + 8); g.clip(); }
    g.fillStyle = pattern(sh.pat); g.fillRect(bb.x - 4, bb.y - 4, bb.w + 8, bb.h + 8);
    // a plain margin inside the outline keeps edges readable
    g.lineWidth = sh.lw * 2.6; g.strokeStyle = sh.fill; g.stroke(sh.path);
    g.restore();
  }
  g.globalAlpha = ga * alpha;
  if (sh.lw > 0) {
    g.strokeStyle = sh.line || PAL.char; g.lineWidth = sh.lw; g.lineJoin = 'round'; g.lineCap = 'round';
    if (a >= 1) g.stroke(sh.path);
    else {
      const target = a * sh.len, P = sh.pts; g.beginPath(); g.moveTo(P[0][0], P[0][1]);
      for (let i = 1; i < P.length; i++) {
        if (sh.cum[i] > target) { const s0 = sh.cum[i - 1], f = (target - s0) / (sh.cum[i] - s0 || 1); g.lineTo(lerp(P[i - 1][0], P[i][0], f), lerp(P[i - 1][1], P[i][1], f)); break; }
        g.lineTo(P[i][0], P[i][1]);
      }
      g.stroke();
    }
  }
  g.globalAlpha = ga;
}
// Sequential parts: part i of n gets its own slice of the progress
function partP(p, i, n, overlap = 1.6) { const span = overlap / (n + overlap - 1); const st = i * (1 - span) / Math.max(1, n - 1); return clamp((p - st) / span); }

// ───────────────────────── Sprite cache (fully drawn static motifs) ─────────────────────────
const SPR = new Map();
function sprite(key, s, box, draw) {
  const sq = Math.max(0.05, Math.round(s * 20) / 20);
  const R = Math.min(4, V.k * sq * 1.35);
  const kk = key + '@' + R.toFixed(2);
  let sp = SPR.get(kk);
  if (!sp) {
    const [bx, by, bw, bh] = box, c = document.createElement('canvas');
    c.width = Math.max(1, Math.ceil(bw * R)); c.height = Math.max(1, Math.ceil(bh * R));
    const g = c.getContext('2d'); g.scale(R, R); g.translate(-bx, -by); g.lineJoin = 'round'; g.lineCap = 'round';
    draw(g);
    sp = { c, bx, by, bw, bh }; SPR.set(kk, sp);
    if (SPR.size > 900) SPR.delete(SPR.keys().next().value);
  }
  return sp;
}
function blit(g, sp, x, y, s) { g.drawImage(sp.c, x + sp.bx * s, y + sp.by * s, sp.bw * s, sp.bh * s); }

// ───────────────────────── Wall: colour, plaster grain, gap-filling motifs ─────────────────────────
const WALLC = { grain: null, fill: null };
function makeGrain() {
  const w = cv.width, h = cv.height, c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d'), id = g.createImageData(w, h), d = id.data, r = rng(7);
  for (let i = 0; i < d.length; i += 4) {
    const v = r();
    if (v < 0.5) { d[i] = d[i + 1] = d[i + 2] = 255; d[i + 3] = (v * 26) | 0; } else { d[i] = 40; d[i + 1] = 26; d[i + 2] = 14; d[i + 3] = ((v - 0.5) * 34) | 0; }
  }
  g.putImageData(id, 0, 0);
  // brush grain: long soft horizontal strokes
  const S = w / V.cssW * V.s; g.lineCap = 'round';
  for (let i = 0; i < 260; i++) {
    const y = r() * h, x = r() * w, L = (120 + r() * 420) * S;
    g.strokeStyle = r() < .5 ? 'rgba(255,255,255,0.05)' : 'rgba(60,35,15,0.045)'; g.lineWidth = (4 + r() * 16) * S;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + L / 2, y + (r() - .5) * 18 * S, x + L, y + (r() - .5) * 10 * S); g.stroke();
  }
  // plaster blotches
  for (let i = 0; i < 90; i++) { const x = r() * w, y = r() * h, R = (30 + r() * 140) * S; const gr = g.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, r() < .5 ? 'rgba(255,250,235,0.06)' : 'rgba(70,40,20,0.05)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(x - R, y - R, 2 * R, 2 * R); }
  return c;
}
const FILL_COLS = () => [PAL.red, PAL.yellow, PAL.green, PAL.turq, PAL.pink, PAL.char, PAL.terra, PAL.wall, PAL.indigo];
function fillerMotif(g, kind, x, y, s, col, col2, rot) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = col; g.strokeStyle = col; g.lineWidth = 2.4; g.lineCap = 'round';
  const dot = (a, b, r) => { g.beginPath(); g.arc(a, b, r, 0, TAU); g.fill(); };
  switch (kind) {
    case 0: dot(-7, 0, 2.6); dot(0, -6, 2.6); dot(7, 0, 2.6); break; // dot cluster
    case 1: g.beginPath(); g.moveTo(-8, 0); g.lineTo(8, 0); g.stroke(); break; // dash
    case 2: g.beginPath(); g.moveTo(-12, 3); g.lineTo(-6, -4); g.lineTo(0, 3); g.lineTo(6, -4); g.lineTo(12, 3); g.stroke(); break; // zig-zag
    case 3: for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; dot(Math.cos(a) * 6, Math.sin(a) * 6, 3.2); } g.fillStyle = col2; dot(0, 0, 2.6); break; // flower
    case 4: g.beginPath(); g.moveTo(-9, 0); g.quadraticCurveTo(0, -8, 9, 0); g.quadraticCurveTo(0, 8, -9, 0); g.fill(); break; // leaf
    case 5: g.beginPath(); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU, R = i % 2 ? 3 : 9; g.lineTo(Math.cos(a) * R, Math.sin(a) * R); } g.closePath(); g.fill(); break; // star
    case 6: for (let i = -1; i <= 1; i++) { g.beginPath(); g.moveTo(i * 6, -5); g.lineTo(i * 6 + 2, 5); g.stroke(); } break; // ticks
  }
  g.restore();
}
function makeFiller() {
  const f = V.k, c = document.createElement('canvas');
  c.width = Math.ceil(V.W * f); c.height = Math.ceil(V.H * f);
  const g = c.getContext('2d'); g.scale(f, f);
  const r = rng(V.p ? 31 : 13), cols = FILL_COLS(), cell = 58;
  for (let y = cell / 2; y < V.H; y += cell) for (let x = cell / 2; x < V.W; x += cell) {
    if (r() < 0.12) continue;
    const kind = (r() * 7) | 0, col = cols[(r() * cols.length) | 0], col2 = cols[(r() * cols.length) | 0];
    g.globalAlpha = 0.34 + r() * 0.16;
    fillerMotif(g, kind, x + (r() - .5) * cell * .7, y + (r() - .5) * cell * .7, 0.75 + r() * 0.5, col, col2, r() * TAU);
  }
  return c;
}

// ───────────────────────── Camera ─────────────────────────
// A camera framing is {x, y, z}: the world point at screen centre and the zoom (≥1).
const CAM = { x: 960, y: 540, z: 1 };
function applyCam(g, c) { g.translate(V.W / 2, V.H / 2); g.scale(c.z, c.z); g.translate(-c.x, -c.y); }
function clampCam(c) {
  const z = Math.max(1, c.z), hw = V.W / 2 / z, hh = V.H / 2 / z;
  return { x: clamp(c.x, hw, V.W - hw), y: clamp(c.y, hh, V.H - hh), z };
}
const toScreen = (x, y) => [(x - CAM.x) * CAM.z + V.W / 2, (y - CAM.y) * CAM.z + V.H / 2];

// ───────────────────────── Border: a dotted band that grows clockwise at each cut ─────────────────────────
function drawBorder(g, prog, t) {
  const m = 20, bw = 30, W = V.W, H = V.H;
  const x0 = m, y0 = m, x1 = W - m, y1 = H - m, per = 2 * ((x1 - x0) + (y1 - y0));
  const along = d => { // clockwise from top-left
    if (d < x1 - x0) return [x0 + d, y0, 0];
    d -= x1 - x0; if (d < y1 - y0) return [x1, y0 + d, 1];
    d -= y1 - y0; if (d < x1 - x0) return [x1 - d, y1, 2];
    d -= x1 - x0; return [x0, y1 - d, 3];
  };
  const cols = [PAL.red, PAL.yellow, PAL.green, PAL.indigo], step = 26, n = Math.floor(per / step), shown = Math.floor(n * prog);
  // band ground (charcoal rails)
  g.save(); g.lineWidth = 5; g.strokeStyle = PAL.char; g.lineCap = 'round';
  const railTo = (inset) => {
    g.beginPath(); const L = prog * per; let d = 0; const st = 18;
    while (d <= L) { const [x, y, side] = along(d); const ix = side === 1 ? -inset : side === 3 ? inset : 0, iy = side === 0 ? inset : side === 2 ? -inset : 0; if (d === 0) g.moveTo(x + ix, y + iy); else g.lineTo(x + ix, y + iy); d += st; }
    g.stroke();
  };
  // filled band behind
  g.lineWidth = bw; g.strokeStyle = PAL.wall; g.globalAlpha = 0.92; railTo(bw / 2); g.globalAlpha = 1;
  g.lineWidth = 5; g.strokeStyle = PAL.char; railTo(0); railTo(bw);
  for (let i = 0; i < shown; i++) {
    const [x, y, side] = along(i * step + step / 2), ix = side === 1 ? -bw / 2 : side === 3 ? bw / 2 : 0, iy = side === 0 ? bw / 2 : side === 2 ? -bw / 2 : 0;
    const col = cols[i % 4], px = x + ix, py = y + iy;
    const pop = clamp((n * prog - i) / 3);
    if (i % 2 === 0) { g.fillStyle = col; g.beginPath(); g.arc(px, py, 7.5 * backOut(pop), 0, TAU); g.fill(); }
    else { g.strokeStyle = col; g.lineWidth = 5; g.beginPath(); const hor = side === 0 || side === 2; const L = 7 * pop; if (hor) { g.moveTo(px - L, py); g.lineTo(px + L, py); } else { g.moveTo(px, py - L); g.lineTo(px, py + L); } g.stroke(); }
  }
  g.restore();
}

// ───────────────────────── Register bands (ground lines of the tiered wall) ─────────────────────────
function regBand(g, x0, x1, y, p = 1, k = 0) {
  if (p <= 0) return;
  const xe = lerp(x0, x1, clamp(p));
  g.save(); g.lineCap = 'round';
  g.fillStyle = [PAL.terra, PAL.ochre, PAL.terra][k % 3]; g.globalAlpha = 0.9; g.fillRect(x0, y - 9, xe - x0, 18); g.globalAlpha = 1;
  g.strokeStyle = PAL.char; g.lineWidth = 4;
  g.beginPath(); g.moveTo(x0, y - 9); g.lineTo(xe, y - 9); g.moveTo(x0, y + 9); g.lineTo(xe, y + 9); g.stroke();
  const cols = [PAL.yellow, PAL.wall, PAL.yellow, PAL.green];
  g.lineWidth = 3;
  for (let x = x0 + 12, i = 0; x < xe - 6; x += 24, i++) {
    if (k % 2) { g.strokeStyle = cols[i % 4]; g.beginPath(); g.moveTo(x - 7, y + 4); g.lineTo(x, y - 4); g.lineTo(x + 7, y + 4); g.stroke(); }
    else { g.fillStyle = cols[i % 4]; g.beginPath(); g.arc(x, y, 4, 0, TAU); g.fill(); }
  }
  g.restore();
}
