// =====================================================================
//  COMMON — shared helpers for every scene file (owned by the lead; scene files read, never edit).
//  Colour law: graphite + ink = Mahishasura's world; NV.terra = Shakti (eras >= gather only); yellow = one
//  caption word (cap()); red = once per scene (a title underline or a stamp). No green, no blue, no gradients
//  for shading (hatch), glow = ray lines.
// =====================================================================
const NV = { terra: SK.terra, terraD: SK.terraD, ink: SK.ink, graph: SK.graph, graphL: SK.graphL, paper: SK.paper, red: SK.red,
  wood: '#e3c896', woodD: '#b8975e', rubber: '#ece6da', ferrule: '#8d8880' };
const CAMS = {};          // CAMS[eraKey] = (t) => CAM | null   (read by pieceCam in bridges.js)
const BRIDGE_IN = {};     // BRIDGE_IN[eraKey]  = () => ({ P, c })  the shape this era opens out of (world coords)
const BRIDGE_OUT = {};    // BRIDGE_OUT[eraKey] = () => ({ P, c })  the shape this era closes onto
const BOARD = {};         // BOARD[eraKey] = [{ t, title, sound, next }, ...]  storyboard key times
let PEN = null;           // where the pencil prop is this frame, in screen coords (set by dr(); scenes reset it, then call penDraw())

// ---- the draw-on: pencil first, then ink. u 0..1 for the whole stroke.
// o: w, col, closed, second, pencilOnly, keepPencil (alpha of the pencil under the ink), amp
function dr(P, u, key, o = {}) {
  if (u <= 0) return;
  const pu = o.pencilOnly ? u : seg(u, 0, 0.55), iu = o.pencilOnly ? 0 : seg(u, 0.4, 1);
  if (pu > 0) gpencil(P, { key: key + 'p', part: pu, w: o.pw ?? 2.4, a: (o.pa ?? 0.75) * (iu > 0 ? lerp(1, o.keepPencil ?? 0.45, iu) : 1), closed: o.closed, amp: o.pamp ?? 2.2 });
  if (iu > 0) gline(P, { key, part: iu, w: o.w ?? 4.5, closed: o.closed, col: o.col ?? NV.ink, second: o.second ?? true, amp: o.amp ?? 1.6 });
  const live = o.pencilOnly ? (pu < 1 ? pu : -1) : iu > 0 && iu < 1 ? iu : pu < 1 ? pu : -1;
  if (live >= 0) { const e = writeEnd(o.closed ? closeP(P) : P, live); PEN = toScreen(e[0], e[1]); }
}
// stagger N parts over u: part k's own 0..1
const stag = (u, k, n, L = 0.3) => seg(u, (k / n) * (1 - L), (k / n) * (1 - L) + L);
// the pencil prop: a bare cedar pencil (no paint: the only colour in this piece is terracotta), tip at (tx, ty)
function navPencil(tx, ty, ang = -0.75, s = 1) {
  ctx.save(); ctx.translate(tx, ty); ctx.rotate(ang); ctx.scale(s, s);
  gfill([[0, 0], [38, -13], [38, 13]], NV.wood, { off: [0, 0], key: 'np1', amp: 0.6 });
  gfill([[0, 0], [12, -4], [12, 4]], SK.lead, { off: [0, 0], key: 'np2', amp: 0.3 });
  const body = [[38, -13], [250, -13], [250, 13], [38, 13]];
  gfill(body, NV.wood, { off: [3, 2], key: 'np3', amp: 0.8 });
  ctx.save(); gclip(body); ghatch(38, -13, 250, 13, { ang: 0.02, gap: 8.5, col: NV.woodD, w: 2, a: 0.45, key: 'np4' }); ctx.restore();
  gfill([[250, -14], [278, -14], [278, 14], [250, 14]], NV.ferrule, { off: [0, 0], key: 'np5', amp: 0.6 });
  gfill([[278, -13], [300, -12], [302, 12], [278, 13]], NV.rubber, { off: [0, 0], key: 'np6', amp: 0.6 });
  gline([[0, 0], [38, -13], [300, -13], [302, 12], [38, 13], [0, 0]], { w: 3.2, key: 'np7', amp: 0.8, second: false });
  gline([[38, -13], [38, 13]], { w: 2, key: 'np8', amp: 0.6, second: false }); gline([[250, -14], [250, 14]], { w: 2, key: 'np9', amp: 0.6, second: false });
  ctx.restore();
}
// draw the pencil at PEN (the stroke being drawn this frame), with a little hand tremor on 2s
function penDraw(s = 1, ang = -0.75) { if (!PEN) return; ctx.save(); screen(); navPencil(PEN[0], PEN[1], ang + 0.07 * Math.sin(B * 1.7), s); ctx.restore(); }
// the eraser: a pale block in a paper sleeve (no blue band); crumbs curl off behind it
function navEraser(x, y, ang = -0.4, s = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(s, s);
  gfill(sketchBox(-80, -42, 160, 84, 18, 0), NV.rubber, { off: [4, 3], key: 'ne1' });
  gfill([[-5, -46], [86, -46], [86, 46], [-5, 46]], '#f7f2e6', { off: [2, 2], key: 'ne2', amp: 1 });
  ctx.save(); gclip([[-5, -46], [86, -46], [86, 46], [-5, 46]]); ghatch(-5, -46, 86, 46, { ang: 0.9, gap: 10, col: NV.graph, w: 1.6, a: 0.35, key: 'ne3' }); ctx.restore();
  gline(sketchBox(-80, -42, 160, 84, 18), { w: 4, key: 'ne4' });
  gline([[-5, -46], [86, -46], [86, 46], [-5, 46], [-5, -46]], { w: 3.5, key: 'ne5', second: false });
  ctx.restore();
}
function crumbs(x, y, n, key, spread = 90) {
  const S = RNG('crumb', key);
  for (let i = 0; i < n; i++) {
    const cx = x + S.n(spread * 0.5), cy = y + S.n(spread * 0.3) + 10, r = 4 + S.f() * 6, a0 = S.r(0, TAU);
    gline(arcPts(cx, cy, r, a0, a0 + 4.2, 6), { w: 2.2, col: NV.graph, key: key + i, amp: 0.4, second: false, step: 4 });
  }
}
// the page grows heavier with his pride: smudges and graphite tangles creeping in from the edges (level 0..1)
function navMess(level, key = 'mess') {
  if (level <= 0) return;
  const S = RNG('mess', key), L = clamp(level);
  const spots = [[60, 420, 0.1], [1020, 760, 0.25], [70, 1150, 0.4], [1010, 1450, 0.55], [80, 1700, 0.65], [980, 300, 0.75], [140, 820, 0.85], [950, 1080, 0.9]];
  for (const [x, y, th] of spots) if (L > th) smudge(x, y, 190 + 80 * S.f(), 90 + 40 * S.f(), 0.10 + 0.12 * seg(L, th, th + 0.25), S.r(-1, 1));
  const tangles = [[40, 560, 0.2], [1040, 980, 0.35], [50, 1320, 0.5], [1030, 560, 0.6], [60, 1560, 0.72], [1040, 1300, 0.82], [520, 1880, 0.9], [520, 150, 0.95]];
  for (const [x, y, th] of tangles) if (L > th) graphiteScribble(x, y, 150 + 90 * S.f(), 110 + 70 * S.f(), key + x + y, { a: 0.55 * seg(L, th, th + 0.2), w: 2.6, part: seg(L, th, th + 0.2) });
}
// rays: glow is ray lines, never a gradient. n rays written on one at a time over u; o: col, w, rot, jitter
function rayRing(cx, cy, r0, r1, n, u, o = {}) {
  for (let i = 0; i < n; i++) {
    const a = (o.rot ?? -Math.PI / 2) + i / n * TAU, k = stag(u, i, n, o.L ?? 0.25);
    if (k <= 0) continue;
    const rr = r1 * (1 + (o.boil ?? 0.06) * ((B + i) % 2));
    gline([[cx + Math.cos(a) * r0, cy + Math.sin(a) * r0], [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]], { w: o.w ?? 4, col: o.col ?? NV.ink, key: (o.key ?? 'ray') + i, part: k, second: false, amp: 0.8, step: 8 });
  }
}
// ---- captions: 1–2 hand-lettered lines at y 1330–1420, one word highlighted. Written on at tw, highlight at tHi.
function capDraw(lines, hi, tw, tHi, o = {}) {
  const ei = ERA_T.findIndex((t) => Math.abs(t - E0) < 1e-6), e1 = ei >= 0 ? ERA_T[ei + 1] : DURATION;   // finish writing before the beat leaves
  tw = Math.min(tw, e1 - 2.0); tHi = Math.min(tHi ?? tw + 0.5, e1 - 1.4);
  const size = o.size ?? 78, lh = size * 1.08, y0 = lines.length === 1 ? 1392 : 1352;
  lines.forEach((line, li) => {
    const y = y0 + li * lh, font = skFont(size, 'hand'), xs = glyphX(line, font), x0 = CX - xs[xs.length - 1] / 2;
    if (hi && hi[0] === li) { const k = line.indexOf(hi[1]); if (k >= 0) highlight(x0 + xs[k], x0 + xs[k + hi[1].length], y - size * 0.28, size * 0.55, ev(tHi ?? tw + 0.5, 0.25), { key: 'caph' + li + line }); }
    handLetter(line, CX, y, size, { reveal: ev(tw + li * 0.25, 0.45), key: 'cap' + li + line });
  });
}
const cap = (lines, hi, tw, tHi, o) => { const f = () => capDraw(lines, hi, tw, tHi, o); if (DEFER) DEFER.push(f); else f(); };
// (all characters live in src/figures.js)
function crownPts(cx, cy, w, h) {   // a crown outline for bridge shapes (morph targets only; the drawn crown is figures.js crown())
  const P = [[cx - w / 2, cy]], pts = 5;
  for (let i = 0; i < pts; i++) { const x0 = cx - w / 2 + (i / pts) * w, x1 = cx - w / 2 + ((i + 1) / pts) * w, mid = (x0 + x1) / 2, hh = h * (i === 2 ? 1 : i === 1 || i === 3 ? 0.72 : 0.5); P.push([x0 + (x1 - x0) * 0.15, cy - h * 0.22], [mid, cy - hh], [x1 - (x1 - x0) * 0.15, cy - h * 0.22]); }
  P.push([cx + w / 2, cy]); return P;
}
