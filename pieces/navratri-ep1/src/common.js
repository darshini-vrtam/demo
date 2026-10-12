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
  const size = o.size ?? 78, lh = size * 1.08, y0 = lines.length === 1 ? 1392 : 1352;
  lines.forEach((line, li) => {
    const y = y0 + li * lh, font = skFont(size, 'hand'), xs = glyphX(line, font), x0 = CX - xs[xs.length - 1] / 2;
    if (hi && hi[0] === li) { const k = line.indexOf(hi[1]); if (k >= 0) highlight(x0 + xs[k], x0 + xs[k + hi[1].length], y - size * 0.28, size * 0.55, ev(tHi ?? tw + 0.5, 0.25), { key: 'caph' + li + line }); }
    handLetter(line, CX, y, size, { reveal: ev(tw + li * 0.25, 0.45), key: 'cap' + li + line });
  });
}
const cap = (lines, hi, tw, tHi, o) => { const f = () => capDraw(lines, hi, tw, tHi, o); if (DEFER) DEFER.push(f); else f(); };

// =====================================================================
//  MAHISHASURA — one shared figure so he reads the same in every beat. Local coords: hip centre at (0,0),
//  standing height ~640 at s = 1 (head top -420, feet +300). Pencil -> ink -> hatching on the shadow side.
//  o: pose 'stand' | 'stride' | 'sit' | 'kneel', u (draw-on 0..1), crown (1 = normal, >1 bigger), key,
//     eyes 'open' | 'closed', hatch (0..1), step (stride phase -1..1), look (-1 left .. 1 right, head turn)
// =====================================================================
function crownPts(cx, cy, w, h) {   // a tall mukuta: a band and five points, the middle highest
  const P = [[cx - w / 2, cy]], pts = 5;
  for (let i = 0; i < pts; i++) {
    const x0 = cx - w / 2 + (i / pts) * w, x1 = cx - w / 2 + ((i + 1) / pts) * w, mid = (x0 + x1) / 2;
    const hh = h * (i === 2 ? 1 : i === 1 || i === 3 ? 0.72 : 0.5);
    P.push([x0 + (x1 - x0) * 0.15, cy - h * 0.22], [mid, cy - hh], [x1 - (x1 - x0) * 0.15, cy - h * 0.22]);
  }
  P.push([cx + w / 2, cy]);
  return P;
}
function mahishaFace(x, y, r, o = {}) {   // a head of radius r at (x, y): stern, simple, respectful
  const key = o.key ?? 'mf', u = o.u ?? 1;
  const head = loopPts(x, y, r * 0.86, r, 0.04, -2.2);
  dr(head, stag(u, 0, 6), key + 'h');
  const ey = y - r * 0.08, ex = r * 0.34;
  for (const s of [-1, 1]) {
    if (o.eyes === 'closed') dr(arcPts(x + s * ex, ey - r * 0.02, r * 0.16, Math.PI * 0.15, Math.PI * 0.85, 8), stag(u, 1, 6), key + 'e' + s, { w: 3.6, second: false });
    else {
      dr([[x + s * ex - r * 0.17, ey], [x + s * ex, ey - r * 0.07], [x + s * ex + r * 0.17, ey], [x + s * ex, ey + r * 0.06], [x + s * ex - r * 0.17, ey]], stag(u, 1, 6), key + 'e' + s, { w: 3.2, second: false });
      if (u > 0.5) { ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(x + s * ex + (o.look ?? 0) * r * 0.05, ey, r * 0.05, 0, TAU); ctx.fill(); }
    }
    dr([[x + s * r * 0.14, ey - r * 0.2], [x + s * r * 0.36, ey - r * 0.3], [x + s * r * 0.56, ey - r * 0.22]], stag(u, 2, 6), key + 'b' + s, { w: 5, second: false });
  }
  dr([[x + r * 0.02, ey + r * 0.04], [x - r * 0.06, y + r * 0.34], [x + r * 0.08, y + r * 0.38]], stag(u, 3, 6), key + 'n', { w: 3, second: false });
  const sm = o.smile ?? 0;   // pride: a thin, sure smile
  dr([[x - r * 0.24, y + r * 0.56 - sm * r * 0.06], [x, y + r * 0.6], [x + r * 0.26, y + r * 0.52 - sm * r * 0.14]], stag(u, 4, 6), key + 'm', { w: 3.4, second: false });
  dr([[x - r * 0.3, y + r * 0.42], [x - r * 0.42, y + r * 0.62]], stag(u, 4, 6), key + 'mo1', { w: 2.4, second: false, col: NV.graph });   // moustache ends
  dr([[x + r * 0.3, y + r * 0.42], [x + r * 0.42, y + r * 0.62]], stag(u, 4, 6), key + 'mo2', { w: 2.4, second: false, col: NV.graph });
  dr([[x - r * 0.05, ey - r * 0.36], [x, ey - r * 0.5], [x + r * 0.05, ey - r * 0.36]], stag(u, 5, 6), key + 'tl', { w: 3, second: false });   // tilak (ink)
  // hair falling behind the shoulders, in graphite strands
  for (let i = 0; i < 6; i++) { const s = i < 3 ? -1 : 1, k = i % 3; gpencil([[x + s * r * (0.7 + k * 0.08), y - r * 0.3], [x + s * r * (0.95 + k * 0.1), y + r * 0.6], [x + s * r * (1.0 + k * 0.12), y + r * 1.5]], { key: key + 'hr' + i, part: stag(u, 5, 6), w: 2.4, a: 0.7 }); }
  const ck = o.crown ?? 1, cw = r * 1.7 * ck, chh = r * 1.25 * ck;
  const CP = crownPts(x, y - r * 0.82, cw, chh);
  if (u > 0.5) gfill(CP, NV.paper, { off: [0, 0], key: key + 'cf' });
  dr(CP, stag(u, 5, 6), key + 'cr', { w: 4.5 });
  if (u >= 1) { ctx.save(); gclip(CP); ghatch(x - cw / 2, y - r * 0.82 - chh, x + cw / 2, y - r * 0.82, { ang: -0.8, gap: 9, col: NV.graph, w: 2, a: 0.4, key: key + 'ch' }); ctx.restore(); }
  for (let i = 0; i < 3; i++) dr(loopPts(x + (i - 1) * cw * 0.28, y - r * 0.82 - chh * 0.12, r * 0.06, r * 0.06, 0.1), stag(u, 5, 6), key + 'gem' + i, { w: 2.6, second: false });
  return CP;
}
function mahisha(x, y, s, o = {}) {
  const key = o.key ?? 'mh', u = o.u ?? 1, pose = o.pose ?? 'stand', N = 7;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const parts = [];
  // torso (shoulders wide, waist narrow), collar arc, necklace, armlets
  const torso = [[-100, -262], [-86, -150], [-58, -58], [58, -58], [86, -150], [100, -262], [40, -280], [-40, -280]];
  if (pose !== 'kneel') {
    // legs + dhoti first (they sit behind the arms)
    let L;
    if (pose === 'sit') L = [
      [[-62, -60], [-170, 20], [-230, 70], [-60, 92], [60, 92], [230, 70], [170, 20], [62, -60]],   // crossed legs as one shape
      [[-150, 52], [-40, 30], [40, 70]], [[150, 52], [40, 30], [-40, 70]]];
    else {
      const st = pose === 'stride' ? (o.step ?? 1) : 0;
      L = [
        [[-62, -60], [-82, 60], [-78 - 40 * st, 140], [-50 - 70 * st, 292]],
        [[62, -60], [82, 60], [78 + 30 * st, 140], [52 + 60 * st, 292]],
        [[-62, -60], [-92, 120], [-20, 150], [20, 150], [92, 120], [62, -60]],
        [[-50 - 70 * st, 292], [-96 - 70 * st, 300]], [[52 + 60 * st, 292], [98 + 60 * st, 300]],
        [[-20, -40], [-10, 140]], [[18, -40], [30, 120]],
      ];
    }
    L.forEach((P, i) => dr(P, stag(u, 3, N), key + 'l' + i, { closed: pose === 'sit' && i === 0 }));
  } else {
    // kneeling: one knee down, the other foot forward
    [[[-58, -58], [-90, 60], [-150, 110], [-260, 110]], [[58, -58], [90, 30], [120, 160], [110, 300]], [[-150, 110], [-90, 140], [20, 120], [90, 40]], [[110, 300], [160, 304]]]
      .forEach((P, i) => dr(P, stag(u, 3, N), key + 'k' + i));
  }
  gfill(torso, NV.paper, { off: [0, 0], key: key + 'tf', a: clamp(u * 3) });
  dr(torso, stag(u, 1, N), key + 't', { closed: true, w: 5 });
  // shading: hatch the right (shadow) side of the torso once inked
  const hk = (o.hatch ?? 1) * seg(u, 0.75, 1);
  if (hk > 0) { ctx.save(); gclip(torso); gclip([[20, -300], [140, -300], [140, -40], [10, -40]]); ghatch(10, -300, 140, -40, { ang: -0.9, gap: 9, col: NV.graph, w: 2.2, a: 0.5 * hk, key: key + 'th' }); ctx.restore(); }
  dr([[-48, -270], [0, -215], [48, -270]], stag(u, 2, N), key + 'nk', { w: 3.4, second: false });
  dr([[-60, -268], [0, -196], [60, -268]], stag(u, 2, N), key + 'nk2', { w: 2.6, second: false, col: NV.graph });
  dr([[-58, -72], [58, -72]], stag(u, 2, N), key + 'belt', { w: 4 });
  dr([[-60, -56], [60, -56]], stag(u, 2, N), key + 'belt2', { w: 2.4, second: false });
  // arms by pose
  const A = {
    stand: [[[-100, -255], [-128, -150], [-120, -50]], [[100, -255], [128, -150], [120, -50]]],
    stride: [[[-100, -255], [-150, -170], [-170, -80]], [[100, -255], [140, -180], [120, -110]]],
    sit: [[[-100, -255], [-130, -150], [-110, -50], [-40, -30]], [[100, -255], [130, -150], [110, -50], [40, -30]]],
    kneel: [[[-100, -255], [-70, -170], [-8, -200]], [[100, -255], [70, -170], [8, -200]]],
  }[pose];
  A.forEach((P, i) => {
    const off = P.map(([px, py]) => [px * 0.8, py]);
    dr(P, stag(u, 4, N), key + 'a' + i, { w: 4.5 });
    dr(off.slice(0, -1).concat([P[P.length - 1]]).map(([px, py], j) => [px + (i ? -1 : 1) * 26 * (j === 0 ? 0 : 1), py]), stag(u, 4, N), key + 'ai' + i, { w: 3.2, second: false });
    dr(loopPts(P[1][0], P[1][1] - 10, 20, 10, 0.1), stag(u, 5, N), key + 'arm' + i, { w: 2.6, second: false });   // armlet
  });
  if (pose === 'kneel') dr([[-8, -200], [0, -240], [8, -200]], stag(u, 5, N), key + 'pal', { w: 3, second: false });   // joined palms
  // the head
  ctx.restore();
  const hx = x + (o.headDx ?? 0) * s, hy = y - 345 * s;
  const CP = mahishaFace(hx, hy, 58 * s, { key: key + 'fc', u: stag(u, 0, N, 0.45), crown: o.crown ?? 1, eyes: o.eyes, smile: o.smile, look: o.look });
  dr([[hx - 16 * s, hy + 56 * s], [x - 18 * s, y - 280 * s]], stag(u, 1, N), key + 'nl', { w: 4 * s, second: false });
  dr([[hx + 16 * s, hy + 56 * s], [x + 18 * s, y - 280 * s]], stag(u, 1, N), key + 'nr', { w: 4 * s, second: false });
  return { crown: CP, head: [hx, hy, 58 * s] };
}
// a generic pencil figure (the devas, the soldiers): simple, standing or seated, with one attribute.
// o: pose 'stand' | 'sit', attr 'trident' | 'chakra' | 'lotus' | 'vajra' | 'conch' | 'spear' | 'banner' | null, u, ink (true = inked)
function figure(x, y, s, o = {}) {
  const key = o.key ?? 'fg', u = o.u ?? 1, pencilOnly = !o.ink, w = o.w ?? 3.6;
  const D = (P, k, kk, ex = {}) => dr(P, stag(u, k, 5), key + kk, { pencilOnly, w, pw: o.pw ?? 2.6, pa: o.pa ?? 0.85, second: false, ...ex });
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  D(loopPts(0, -170, 26, 30, 0.05), 0, 'h', { closed: false });
  if (o.crown !== false) D(crownPts(0, -196, 40, 34 * (o.crownH ?? 1)), 0, 'c');
  D([[-48, -132], [-36, -40], [-30, 30], [30, 30], [36, -40], [48, -132], [0, -142], [-48, -132]], 1, 't');
  if (o.pose === 'sit') D([[-30, 30], [-100, 60], [-60, 80], [60, 80], [100, 60], [30, 30]], 2, 'lg');
  else D([[-30, 30], [-44, 150], [-20, 150], [0, 60], [20, 150], [44, 150], [30, 30]], 2, 'lg');
  D([[-48, -128], [-70, -60], [-56, 0]], 3, 'al');
  D([[48, -128], [76, -100], [88, -150]], 3, 'ar');   // the right hand raised (blessing / holding the attribute)
  const ax = 92, ay = -160;
  if (o.attr === 'trident') { D([[ax, ay + 160], [ax, ay - 120]], 4, 'tr0'); D([[ax - 34, ay - 90], [ax - 30, ay - 60], [ax + 30, ay - 60], [ax + 34, ay - 90]], 4, 'tr1'); D([[ax, ay - 60], [ax, ay - 140]], 4, 'tr2'); }
  else if (o.attr === 'chakra') { D(loopPts(ax, ay - 30, 34, 34, 0.08), 4, 'ck0'); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; D([[ax, ay - 30], [ax + Math.cos(a) * 30, ay - 30 + Math.sin(a) * 30]], 4, 'ck' + (i + 1)); } }
  else if (o.attr === 'lotus') { for (let i = -2; i <= 2; i++) D([[ax, ay], [ax + i * 14 - 8, ay - 34 + Math.abs(i) * 8], [ax + i * 16, ay - 56 + Math.abs(i) * 12], [ax + i * 14 + 8, ay - 34 + Math.abs(i) * 8], [ax, ay]], 4, 'lt' + i); }
  else if (o.attr === 'vajra') { D([[ax, ay + 40], [ax, ay - 60]], 4, 'vj0'); D(loopPts(ax, ay - 70, 16, 22, 0.05), 4, 'vj1'); D(loopPts(ax, ay + 50, 16, 22, 0.05), 4, 'vj2'); }
  else if (o.attr === 'conch') D([[ax - 20, ay], [ax, ay - 50], [ax + 26, ay - 20], [ax + 10, ay + 14], [ax - 20, ay]], 4, 'cn');
  else if (o.attr === 'spear') { D([[ax, ay + 170], [ax, ay - 110]], 4, 'sp0'); D([[ax - 12, ay - 100], [ax, ay - 140], [ax + 12, ay - 100], [ax - 12, ay - 100]], 4, 'sp1'); }
  else if (o.attr === 'banner') { D([[ax, ay + 170], [ax, ay - 150]], 4, 'bn0'); D([[ax, ay - 150], [ax + 80, ay - 130 + 8 * Math.sin(B * 0.9)], [ax, ay - 100]], 4, 'bn1'); }
  ctx.restore();
}
