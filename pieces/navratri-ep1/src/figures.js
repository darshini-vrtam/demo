// =====================================================================
//  FIGURES — every character in the piece, drawn once here and reused by every beat (owned by the lead).
//  Construction: a pencil gesture line, proportion ticks, then smooth spline contours in pencil, then ink.
//  Adults ~7.5 heads tall. Limbs taper (shoulder/thigh -> wrist/ankle) with elbows and knees; hands are about
//  face-tall with a thumb and four fingers; every body contour is a Catmull-Rom spline through 12+ points.
//  Shading is hatching only (shadow side = right, light from the top left). Heavier line on the shadow side.
//  Units: each character takes (x, y, H): (x, y) = its ground point, H = one head height in px.
//  FIG.mode 'ink' = pencil then ink (Mahishasura, Brahma, Durga, lion); 'pencil' = pencil only (devas).
// =====================================================================
const FIG = { mode: 'ink', u: 1, gesture: 0.22 };

// ---- splines and strokes
function spl(P, closed = false, n = 8) {
  const N = P.length, out = [], get = (i) => (closed ? P[((i % N) + N) % N] : P[Math.max(0, Math.min(N - 1, i))]);
  const segs = closed ? N : N - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t, f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(closed ? out[0] : P[N - 1]);
  return out;
}
// a stroke in the figure's mode: pencil -> ink (FIG.mode 'ink') or pencil only. u = this stroke's draw-on.
function ln(P, u, key, o = {}) {
  if (u <= 0 || !P || P.length < 2) return;
  if (FIG.mode === 'pencil') dr(P, u, key, { pencilOnly: true, pw: (o.w ?? 3.6) * 0.85, pa: o.pa ?? 1, pamp: 1.4, closed: o.closed });
  else dr(P, u, key, { w: o.w ?? 3.6, col: o.col ?? NV.ink, second: o.second ?? false, amp: o.amp ?? 1.1, keepPencil: 0.35, pw: 2.2, pamp: 1.8, closed: o.closed });
}
const lnS = (P, u, key, o = {}) => ln(spl(P, !!o.closed), u, key, { ...o, closed: false });   // a spline stroke
function paperFill(P, key, a = 1) { if (a > 0) gfill(P, NV.paper, { off: [0, 0], key: key + 'pf', a, amp: 0.8 }); }
// hatching inside a closed outline P (ang, gap, a); on 2s the tremor boils, the structure stays
function shade(P, key, o = {}) {
  if ((o.u ?? 1) <= 0) return;
  const bb = bbox(P);
  ctx.save(); trace(P, false); ctx.closePath(); ctx.clip();
  ghatch(bb.x0, bb.y0, bb.x1, bb.y1, { ang: o.ang ?? -0.85, gap: o.gap ?? 6.5, col: o.col ?? NV.graph, w: o.w ?? 1.7, a: (o.a ?? 0.5) * (o.u ?? 1), key });
  if (o.cross) ghatch(bb.x0, bb.y0, bb.x1, bb.y1, { ang: (o.ang ?? -0.85) + 1.3, gap: (o.gap ?? 6.5) * 1.3, col: o.col ?? NV.graph, w: (o.w ?? 1.7) * 0.9, a: (o.a ?? 0.5) * 0.7 * (o.u ?? 1), key: key + 'x' });
  ctx.restore();
}
// a band of hatching along a curve C (a fold or a shadow edge), w px wide on the side `side` (+1 / -1)
function bandAlong(C, w, side = 1) {
  const Q = resample(spl(C), false, 6), L = [], R = [];
  Q.forEach((p, i) => { const a = Q[Math.max(0, i - 1)], b = Q[Math.min(Q.length - 1, i + 1)]; const nx = a[1] - b[1], ny = b[0] - a[0], l = Math.hypot(nx, ny) || 1, k = Math.sin(Math.PI * i / (Q.length - 1)); L.push(p); R.push([p[0] + side * nx / l * w * k, p[1] + side * ny / l * w * k]); });
  return [...L, ...R.reverse()];
}
const foldShade = (C, w, key, o = {}) => shade(bandAlong(C, w, o.side ?? 1), key, { gap: 5.5, a: 0.55, ...o });

// ---- limbs: a spline centreline through joints, radii keyed along its length (taper + muscle bulges)
// R = [[f, rLeft, rRight], ...] (f = 0..1 along the limb; rRight optional = rLeft). Returns { P, L, R, at(f) }.
function limb(J, R) {
  const Q = resample(spl(J, false, 10), false, 5), n = Q.length, len = [0];
  for (let i = 1; i < n; i++) len.push(len[i - 1] + dist(Q[i - 1], Q[i]));
  const tot = len[n - 1] || 1, rad = (f, side) => {
    let k = 0; while (k < R.length - 2 && f > R[k + 1][0]) k++;
    const [f0, a0, b0] = R[k], [f1, a1, b1] = R[k + 1], s = smooth(f0, f1, f);
    return side ? lerp(b0 ?? a0, b1 ?? a1, s) : lerp(a0, a1, s);
  };
  const L = [], RR = [], N = [];
  Q.forEach((p, i) => {
    const a = Q[Math.max(0, i - 1)], b = Q[Math.min(n - 1, i + 1)], nx = a[1] - b[1], ny = b[0] - a[0], l = Math.hypot(nx, ny) || 1, f = len[i] / tot;
    N.push([nx / l, ny / l]); L.push([p[0] + nx / l * rad(f, 0), p[1] + ny / l * rad(f, 0)]); RR.push([p[0] - nx / l * rad(f, 1), p[1] - ny / l * rad(f, 1)]);
  });
  const at = (f) => { const i = Math.round(clamp(f) * (n - 1)); return { p: Q[i], n: N[i], r: [rad(f, 0), rad(f, 1)] }; };
  return { P: [...L, ...RR.slice().reverse()], L, R: RR, at, Q };
}
// draw a limb: paper inside, the light side thin, the shadow side heavier; a crease at the joint; hatching on the shadow side
function drawLimb(lb, u, key, o = {}) {
  paperFill(lb.P, key, clamp(u * 3));
  const shadowR = o.shadow !== 'L';
  ln(lb.L, u, key + 'L', { w: (o.w ?? 3.4) * (shadowR ? 0.8 : 1.3) });
  ln(lb.R, u, key + 'R', { w: (o.w ?? 3.4) * (shadowR ? 1.3 : 0.8) });
  ln([lb.L[0], lb.R[0]], o.capStart ? u : 0, key + 'c0', { w: 2.4 });
  ln([lb.L[lb.L.length - 1], lb.R[lb.R.length - 1]], o.capEnd ? u : 0, key + 'c1', { w: 2.4 });
  if (o.hatch !== false && u >= 1) foldShade(shadowR ? lb.R : lb.L, (o.hw ?? 0.32) * Math.max(...lb.at(0.3).r), key + 'sh', { side: shadowR ? 1 : -1, a: o.ha ?? 0.45 });
  for (const f of o.creases ?? []) { const { p, n, r } = lb.at(f); ln(spl([[p[0] + n[0] * r[0] * 0.5, p[1] + n[1] * r[0] * 0.5], [p[0] + n[0] * r[0] * 0.05 + 3, p[1] + n[1] * r[0] * 0.05 + 4], [p[0] - n[0] * r[1] * 0.3, p[1] - n[1] * r[1] * 0.3]]), u, key + 'cr' + f, { w: 2 }); }
}
// a band around a limb at f (armlet, bangle, anklet): two cross lines, an optional ornament
function bandOn(lb, f, u, key, o = {}) {
  const w = o.w ?? 0.06;
  for (const d of [-w / 2, w / 2]) { const { p, n, r } = lb.at(f + d); ln(spl([[p[0] + n[0] * r[0], p[1] + n[1] * r[0]], [p[0] + n[0] * r[0] * 0.2 + 2, p[1] + 4], [p[0] - n[0] * r[1], p[1] - n[1] * r[1]]]), u, key + d, { w: 2.4 }); }
  if (o.gem) { const { p } = lb.at(f); ln(spl([[p[0], p[1] - 9], [p[0] + 7, p[1]], [p[0], p[1] + 9], [p[0] - 7, p[1]]], true), u, key + 'g', { w: 2.2 }); }
}
// ---- hands. (x, y) = the wrist, ang = wrist -> fingertips, s = hand length (about the face's height), side +1/-1 = thumb side
// pose: 'open' (fingers up, palm out: blessing), 'relax' (hanging, fingers curled a little), 'grip' (a fist around a shaft
// crossing at the palm), 'mudra' (jnana: thumb and index touch, three fingers out), 'cup' (holding a pot from below)
function hand(x, y, ang, s, pose, side, key, u = FIG.u) {
  const ca = Math.cos(ang), sa = Math.sin(ang), T = (a, b) => [x + ca * a * s - sa * b * s * side, y + sa * a * s + ca * b * s * side];
  const TP = (P) => P.map(([a, b]) => T(a, b));
  const palm = TP([[0, -0.2], [0.18, -0.24], [0.42, -0.22], [0.52, -0.12], [0.53, 0.04], [0.5, 0.18], [0.36, 0.25], [0.16, 0.24], [0, 0.2]]);
  const fingers = { open: [[-0.15, 0.98, 0.02], [-0.05, 1.04, 0.0], [0.05, 1.0, -0.02], [0.15, 0.86, -0.05]], relax: [[-0.15, 0.86, 0.05], [-0.05, 0.92, 0.03], [0.05, 0.88, 0.0], [0.15, 0.78, -0.03]], mudra: [[-0.15, 0.62, 0.32], [-0.05, 0.98, 0.03], [0.05, 0.94, -0.01], [0.15, 0.82, -0.05]] }[pose];
  const D = (P, k, kk, w = 2.6) => lnS(P, u, key + kk, { w, closed: true });
  if (pose === 'grip' || pose === 'cup') {
    // the fist: a rounded block, four finger strokes across it, the thumb wrapped over
    const fist = TP([[0, -0.2], [0.2, -0.26], [0.44, -0.27], [0.6, -0.2], [0.68, -0.04], [0.66, 0.14], [0.56, 0.26], [0.32, 0.27], [0.12, 0.25], [0, 0.2]]);
    paperFill(fist, key + 'fs', clamp(u * 3)); lnS(fist, u, key + 'fist', { closed: true, w: 3 });
    for (let i = 0; i < 4; i++) { const b = -0.18 + i * 0.12; lnS(TP([[0.58, b], [0.66, b + 0.05], [0.6, b + 0.1]]), u, key + 'fg' + i, { w: 2.2 }); lnS(TP([[0.42, b + 0.11], [0.52, b + 0.1]]), u, key + 'fk' + i, { w: 1.8 }); }
    lnS(TP([[0.1, 0.22], [0.3, 0.3], [0.5, 0.18], [0.58, 0.06]]), u, key + 'th', { w: 2.6 });
    return T(0.4, 0);
  }
  paperFill(palm, key + 'pl', clamp(u * 3));
  // the thumb: two segments out from the base of the palm on the thumb side
  const th = pose === 'mudra' ? [[0.1, 0.2], [0.3, 0.36], [0.5, 0.36], [0.62, 0.28]] : pose === 'open' ? [[0.1, 0.2], [0.24, 0.31], [0.38, 0.36], [0.5, 0.34]] : [[0.1, 0.2], [0.28, 0.34], [0.46, 0.38], [0.56, 0.32]];
  const thP = limb(TP(th), [[0, 0.075 * s], [0.6, 0.06 * s], [1, 0.045 * s]]).P;
  paperFill(thP, key + 'tf', clamp(u * 3)); D(thP, 0, 'th');
  // four fingers: tapered capsules from the knuckles, separate strokes, slightly spread
  fingers.forEach(([b, len, bend], i) => {
    const spr = pose === 'open' ? [1.0, 1.06, 1.12] : [1.4, 1.55, 1.7], fr = pose === 'open' ? 0.062 : 0.055;
    const P = TP([[0.48, b * spr[0]], [0.5 + (len - 0.5) * 0.55, b * spr[1] + bend * 0.5], [len, b * spr[2] + bend]]);
    const F = limb(P, [[0, fr * s], [0.6, fr * 0.88 * s], [1, fr * 0.68 * s]]).P;
    paperFill(F, key + 'ff' + i, clamp(u * 3)); D(F, 1, 'f' + i, 2.3);
    const m = P[1]; ln([[m[0] - sa * 0.03 * s, m[1] + ca * 0.03 * s], [m[0] + sa * 0.03 * s, m[1] - ca * 0.03 * s]], u, key + 'kn' + i, { w: 1.4 });
  });
  D(palm, 0, 'palm', 2.8);
  if (pose === 'open') lnS(TP([[0.2, 0.1], [0.32, 0.0], [0.38, -0.12]]), u, key + 'line', { w: 1.6 });
  if (pose === 'mudra') ln(loopPts(...T(0.6, 0.33), 0.05 * s, 0.05 * s, 0.1), u, key + 'ring', { w: 1.8 });
  return T(0.5, 0);
}
// two palms pressed together (anjali), seen in profile: (x, y) = the heel of the palms, ang = towards the fingertips
function anjali(x, y, ang, s, key, u = FIG.u) {
  const ca = Math.cos(ang), sa = Math.sin(ang), T = (a, b) => [x + ca * a * s - sa * b * s, y + sa * a * s + ca * b * s];
  // the far palm's fingertips show beyond the near one
  const far = [[0.45, -0.2], [0.8, -0.2], [1.06, -0.12], [1.1, -0.04], [0.8, -0.06], [0.5, -0.08]].map(([a, b]) => T(a, b));
  paperFill(spl(far, true), key + 'far', clamp(u * 3)); lnS(far, u, key + 'far', { w: 2.2, closed: true });
  const P = [[0, -0.14], [0.3, -0.16], [0.5, -0.14], [0.55, -0.06], [0.55, 0.12], [0.3, 0.16], [0, 0.14]].map(([a, b]) => T(a, b));
  paperFill(spl(P, true), key, clamp(u * 3)); lnS(P, u, key + 'o', { closed: true, w: 3 });
  [[0.95, -0.1], [1.04, -0.02], [1.0, 0.06], [0.86, 0.12]].forEach(([len, b], i) => {   // four fingers, separate strokes
    const F = limb([T(0.52, b), T(0.52 + (len - 0.52) * 0.5, b + 0.005), T(len, b + 0.01)], [[0, 0.042 * s], [0.6, 0.038 * s], [1, 0.028 * s]]).P;
    paperFill(F, key + 'f' + i, clamp(u * 3)); lnS(F, u, key + 'fg' + i, { w: 1.8, closed: true });
  });
  const th = limb([T(0.12, 0.12), T(0.32, 0.2), T(0.52, 0.2)], [[0, 0.06 * s], [1, 0.04 * s]]).P;
  paperFill(th, key + 'th', clamp(u * 3)); lnS(th, u, key + 'th', { w: 2.2, closed: true });
}
// ---- faces. (cx, cy) = the centre of the face, h = hairline to chin. o: kind 'mahisha' | 'durga' | 'brahma' | 'deva',
// eyes 'open' | 'closed' | 'down', turn -1..1 (three-quarter: features shift toward `turn`), smile 0..1, look -1..1
function face(cx, cy, h, o = {}) {
  const key = o.key ?? 'fc', u = o.u ?? FIG.u, kind = o.kind ?? 'deva', tn = o.turn ?? 0;
  const w = h * (kind === 'mahisha' ? 0.8 : kind === 'durga' ? 0.68 : 0.72), jaw = kind === 'mahisha' ? 0.65 : kind === 'durga' ? 0 : 0.4;
  const X = (fx) => cx + (fx + tn * 0.16 * (1 - Math.abs(fx) * 1.2)) * w, Y = (fy) => cy + fy * h;
  // the face outline (12+ points), far side pulled in when turned
  const sq = (s) => (tn * s < 0 ? 1 - Math.abs(tn) * 0.32 : 1);
  const O = [[0, -0.52], [0.3 * sq(1), -0.48], [0.47 * sq(1), -0.3], [0.5 * sq(1), -0.08], [0.48 * sq(1), 0.1], [(0.4 + 0.05 * jaw) * sq(1), 0.26 + 0.03 * jaw], [(0.24 + 0.05 * jaw) * sq(1), 0.42], [0.1 + 0.03 * jaw, 0.5], [0, 0.52],
    [-(0.1 + 0.03 * jaw), 0.5], [-(0.24 + 0.05 * jaw) * sq(-1), 0.42], [-(0.4 + 0.05 * jaw) * sq(-1), 0.26 + 0.03 * jaw], [-0.48 * sq(-1), 0.1], [-0.5 * sq(-1), -0.08], [-0.47 * sq(-1), -0.3], [-0.3 * sq(-1), -0.48]]
    .map(([a, b]) => [cx + a * w + tn * 0.05 * w, Y(b)]);
  const OP = spl(O, true);
  paperFill(OP, key + 'o', clamp(u * 3));
  // ears with earrings (a ring and a drop)
  for (const s of [-1, 1]) {
    if (tn * s < -0.5) continue;
    const ex = cx + s * 0.5 * w * sq(s) + tn * 0.05 * w, E = [[ex, Y(-0.08)], [ex + s * 0.1 * w, Y(-0.1)], [ex + s * 0.12 * w, Y(0.04)], [ex + s * 0.06 * w, Y(0.16)], [ex, Y(0.15)]];
    paperFill(spl(E, true), key + 'e' + s); lnS(E, u, key + 'ear' + s, { w: 2.6 });
    ln(loopPts(ex + s * 0.05 * w, Y(0.22), 0.05 * w, 0.05 * w, 0.1), u, key + 'er' + s, { w: 2.2 });
    lnS([[ex + s * 0.05 * w, Y(0.27)], [ex + s * 0.02 * w, Y(0.34)], [ex + s * 0.05 * w, Y(0.4)], [ex + s * 0.08 * w, Y(0.34)], [ex + s * 0.05 * w, Y(0.27)]], u, key + 'ed' + s, { w: 2 });
  }
  // the outline: the shadow (right) side heavier
  ln(spl(O.slice(0, 9)), u, key + 'oR', { w: h * 0.03 });
  ln(spl([...O.slice(8), O[0]]), u, key + 'oL', { w: h * 0.02 });
  // brows, eyes (almond, an upper-lid line; open eyes show the iris under the lid), nose, mouth
  const ey = Y(-0.06), ew = 0.2 * w, browY = Y(kind === 'mahisha' ? -0.19 : -0.2);
  for (const s of [-1, 1]) {
    const ex = X(s * 0.22), k = 1 - Math.max(0, -tn * s) * 0.35, ee = ew * k;
    const heavy = kind === 'mahisha';
    lnS([[ex - s * ee * 0.8, browY + (heavy ? 0.035 : 0.01) * h], [ex, browY - (heavy ? 0.005 : 0.025) * h], [ex + s * ee * 0.9, browY + (heavy ? -0.02 : 0.012) * h]], u, key + 'br' + s, { w: h * (heavy ? 0.045 : 0.022) });
    if (o.eyes === 'closed' || o.eyes === 'down') {
      lnS([[ex - ee * 0.55, ey], [ex, ey + 0.03 * h], [ex + ee * 0.55, ey]], u, key + 'lid' + s, { w: h * 0.022 });
      lnS([[ex - ee * 0.45, ey - 0.035 * h], [ex, ey - 0.045 * h], [ex + ee * 0.45, ey - 0.035 * h]], u, key + 'crs' + s, { w: h * 0.01 });
      if (o.eyes === 'down') lnS([[ex - ee * 0.4, ey + 0.035 * h], [ex, ey + 0.05 * h], [ex + ee * 0.4, ey + 0.035 * h]], u, key + 'lw' + s, { w: h * 0.01 });
    } else {
      const up = [[ex - ee * 0.55, ey + 0.005 * h], [ex - ee * 0.2, ey - 0.04 * h], [ex + ee * 0.25, ey - 0.042 * h], [ex + ee * 0.55, ey - 0.005 * h]];
      const lo = [[ex + ee * 0.55, ey - 0.005 * h], [ex + ee * 0.15, ey + 0.03 * h], [ex - ee * 0.3, ey + 0.028 * h], [ex - ee * 0.55, ey + 0.005 * h]];
      if (u > 0.85) { ctx.save(); trace(spl([...up, ...lo.slice(1)], true), false); ctx.clip(); ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(ex + (o.look ?? 0) * ee * 0.25, ey - 0.008 * h, 0.034 * h, 0, TAU); ctx.fill(); ctx.fillStyle = NV.paper; ctx.beginPath(); ctx.arc(ex + (o.look ?? 0) * ee * 0.25 - 0.01 * h, ey - 0.02 * h, 0.008 * h, 0, TAU); ctx.fill(); ctx.restore(); }
      lnS(up, u, key + 'up' + s, { w: h * 0.022 }); lnS(lo, u, key + 'lo' + s, { w: h * 0.009 });
      lnS([[ex - ee * 0.4, ey - 0.06 * h], [ex + ee * 0.1, ey - 0.07 * h], [ex + ee * 0.45, ey - 0.05 * h]], u, key + 'fold' + s, { w: h * 0.008 });
    }
  }
  const nx = X(0) + tn * 0.08 * w;
  lnS([[X(-0.04), Y(-0.1)], [nx + 0.01 * w, Y(0.06)], [nx + 0.05 * w, Y(0.15)]], u, key + 'nose', { w: h * 0.013 });
  lnS([[nx - 0.08 * w, Y(0.16)], [nx - 0.02 * w, Y(0.19)], [nx + 0.05 * w, Y(0.17)], [nx + 0.09 * w, Y(0.15)]], u, key + 'nost', { w: h * 0.016 });
  const my = Y(0.29), mw = (kind === 'mahisha' ? 0.18 : 0.14) * w, sm = o.smile ?? 0;
  lnS([[X(0) - mw, my - sm * 0.02 * h], [X(0) - mw * 0.3, my + 0.008 * h], [X(0), my - 0.004 * h], [X(0) + mw * 0.3, my + 0.008 * h], [X(0) + mw, my - sm * 0.05 * h]], u, key + 'lip', { w: h * 0.017 });
  lnS([[X(0) - mw * 0.45, my + 0.055 * h], [X(0), my + 0.065 * h], [X(0) + mw * 0.45, my + 0.055 * h]], u, key + 'lip2', { w: h * 0.01 });
  if (kind === 'mahisha') {   // moustache, curled at the ends; a strong jaw shadow; the heavy brow ridge
    for (const s of [-1, 1]) lnS([[X(0) + s * 0.02 * w, Y(0.22)], [X(0) + s * 0.14 * w, Y(0.215)], [X(0) + s * 0.26 * w, Y(0.25)], [X(0) + s * 0.31 * w, Y(0.2)], [X(0) + s * 0.27 * w, Y(0.17)]], u, key + 'mo' + s, { w: h * 0.022 });
    if (u >= 1) foldShade(O.slice(4, 9), 0.08 * w, key + 'jaw', { side: -1, a: 0.5 });
    lnS([[X(0.14), Y(0.36)], [X(0.22), Y(0.4)]], u, key + 'jl', { w: h * 0.008 });
  }
  if (kind === 'durga' && u > 0.9) { ctx.fillStyle = NV.terra; ctx.beginPath(); ctx.arc(X(0), Y(-0.22), 0.026 * h, 0, TAU); ctx.fill(); }
  else if (o.tilak !== false && kind !== 'durga') lnS([[X(0), Y(-0.16)], [X(0), Y(-0.28)]], u, key + 'tl', { w: h * 0.018 });
  // a light hatch on the shadow cheek
  if (u >= 1) foldShade([[X(0.32), Y(-0.02)], [X(0.4), Y(0.14)], [X(0.32), Y(0.3)]], 0.06 * w, key + 'chk', { side: 1, a: 0.35 });
  return { O: OP, chin: [cx + tn * 0.05 * w, Y(0.52)], w };
}
// a profile face looking toward dir (+1 right / -1 left). (cx, cy) = the centre of the head, h = hairline to chin.
function profileFace(cx, cy, h, dir, o = {}) {
  const key = o.key ?? 'pf', u = o.u ?? FIG.u, d = dir, P = (a, b) => [cx + d * a * h, cy + b * h];
  const front = [P(-0.05, -0.52), P(0.18, -0.46), P(0.28, -0.3), P(0.3, -0.16), P(0.27, -0.1), P(0.36, 0.08), P(0.37, 0.13), P(0.3, 0.15), P(0.32, 0.22), P(0.29, 0.27), P(0.31, 0.33), P(0.24, 0.43), P(0.12, 0.5), P(-0.02, 0.5)];
  const back = [P(-0.02, 0.5), P(-0.16, 0.42), P(-0.24, 0.24), P(-0.3, 0.05), P(-0.36, -0.2), P(-0.3, -0.42), P(-0.05, -0.52)];
  paperFill(spl([...front, ...back.slice(1, -1)], true), key, clamp(u * 3));
  lnS(front, u, key + 'fr', { w: h * 0.026 }); lnS(back.slice(0, 4), u, key + 'jw', { w: h * 0.02 });
  lnS([P(0.13, -0.08), P(0.19, -0.1), P(0.24, -0.075)], u, key + 'eye', { w: h * 0.02 });
  if (o.eyes !== 'closed' && u > 0.85) { ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(...P(0.205, -0.075), 0.026 * h, 0, TAU); ctx.fill(); }
  lnS([P(0.1, -0.2), P(0.2, -0.22), P(0.28, -0.19)], u, key + 'brow', { w: h * (o.kind === 'mahisha' ? 0.04 : 0.022) });
  lnS([P(0.3, 0.27), P(0.22, 0.27)], u, key + 'mouth', { w: h * 0.014 });
  // the ear and an earring
  const E = [P(-0.06, -0.06), P(-0.0, -0.08), P(0.02, 0.04), P(-0.02, 0.15), P(-0.08, 0.14)];
  lnS(E, u, key + 'ear', { w: h * 0.018 });
  ln(loopPts(...P(-0.04, 0.22), 0.04 * h, 0.04 * h, 0.1), u, key + 'er', { w: 2 });
  if (o.kind === 'mahisha') { lnS([P(0.3, 0.2), P(0.2, 0.22), P(0.12, 0.24), P(0.09, 0.18)], u, key + 'mo', { w: h * 0.024 }); if (u >= 1) foldShade(back.slice(0, 4), 0.07 * h, key + 'js', { side: d, a: 0.45 }); }
  if (o.beard) { const Bd = [P(0.28, 0.3), P(0.3, 0.6), P(0.2, 0.95), P(0.02, 1.15), P(-0.12, 0.9), P(-0.2, 0.45), P(-0.18, 0.2)]; paperFill(spl(Bd, true), key + 'bd'); lnS(Bd, u, key + 'bd', { w: h * 0.02 }); for (let i = 0; i < 5; i++) lnS([P(0.2 - i * 0.08, 0.35), P(0.2 - i * 0.08 + 0.03, 0.7), P(0.12 - i * 0.06, 1.0)], u, key + 'bs' + i, { w: 1.6 }); }
  return { chin: P(0.06, 0.5) };
}
// long wavy hair: a full mass from the top of the head, falling behind the shoulders to len (in face heights)
function longHair(cx, cy, h, len, key, o = {}) {
  const u = o.u ?? FIG.u, wd = o.w ?? 0.8, out = [];
  for (const s of [-1, 1]) {
    if (o.side && o.side !== s) continue;
    const C = [[cx, cy - 0.62 * h], [cx + s * 0.4 * h, cy - 0.56 * h], [cx + s * 0.58 * h, cy - 0.3 * h]];
    const n = 7; for (let i = 1; i <= n; i++) { const f = i / n, wv = Math.sin(i * 2.3) * 0.11; C.push([cx + s * (wd + 0.14 * f + wv) * h, cy + (-0.1 + f * (len + 0.1)) * h]); }
    const end = C[C.length - 1];
    const I = [[end[0] - s * 0.16 * h, end[1] + 0.06 * h], [end[0] - s * 0.3 * h, end[1] - 0.04 * h], [cx + s * (wd - 0.12) * h, cy + len * 0.6 * h], [cx + s * 0.44 * h, cy + 0.55 * h], [cx + s * 0.42 * h, cy + 0.1 * h]];
    const shape = spl([...C, ...I], true);
    paperFill(shape, key + 'hf' + s, clamp(u * 3));
    if (u >= 1) shade(shape, key + 'hs' + s, { ang: s * 0.6 + Math.PI / 2 * 0.9, gap: 9, a: 0.3 });
    ln(spl(C), u, key + 'hc' + s, { w: 3.4 }); ln(spl(I), u, key + 'hi' + s, { w: 2.4 });
    for (let i = 0; i < (o.n ?? 6); i++) { const f = (i + 1) / ((o.n ?? 6) + 1), x0 = cx + s * lerp(0.46, wd + 0.04, f) * h; lnS([[x0, cy - 0.25 * h], [x0 + s * 0.12 * h * Math.sin(i * 1.7 + 1), cy + len * 0.22 * h], [x0 - s * 0.06 * h, cy + len * 0.45 * h], [x0 + s * 0.1 * h, cy + len * 0.7 * h], [x0 + s * (0.06 + 0.06 * f) * h, cy + len * 0.9 * h]], u, key + 'hst' + s + i, { w: 1.7 }); }
    out.push(shape);
  }
  return out;
}
// ---- the crown: a mukuta (a beaded band, five rounded ogee petals with the centre one tallest, a bud finial, side fans)
function crown(cx, by, w, h, key, o = {}) {
  const u = o.u ?? FIG.u, X = (f) => cx + f * w, Y = (f) => by - f * h;
  const band = spl([[X(-0.5), Y(0.02)], [X(-0.3), Y(-0.04)], [X(0), Y(-0.06)], [X(0.3), Y(-0.04)], [X(0.5), Y(0.02)], [X(0.49), Y(0.2)], [X(0.25), Y(0.16)], [X(0), Y(0.15)], [X(-0.25), Y(0.16)], [X(-0.49), Y(0.2)]], true);
  // the petals: a run of rounded points along the band's top edge
  const tips = [[-0.38, 0.48], [-0.2, 0.7], [0, 0.95], [0.2, 0.7], [0.38, 0.48]], top = [[X(-0.49), Y(0.18)]];
  tips.forEach(([f, t], i) => { const hw = i === 2 ? 0.13 : 0.105; top.push([X(f - hw), Y(0.24 + t * 0.25)], [X(f - hw * 0.8), Y(t * 0.72)], [X(f - hw * 0.35), Y(t * 0.93)], [X(f), Y(t)], [X(f + hw * 0.35), Y(t * 0.93)], [X(f + hw * 0.8), Y(t * 0.72)], [X(f + hw), Y(0.24 + t * 0.25)]); if (i < 4) top.push([X(f + 0.105), Y(0.26)]); });
  top.push([X(0.49), Y(0.18)]);
  const petals = spl([...top, [X(0.25), Y(0.16)], [X(-0.25), Y(0.16)]], true);
  paperFill(petals, key + 'p', clamp(u * 3)); paperFill(band, key + 'b', clamp(u * 3));
  ln(spl(top), u, key + 'pet', { w: 3.2 });
  tips.forEach(([f, t], i) => {   // an inner line and a gem in each petal
    const hw = (i === 2 ? 0.11 : 0.09) * 0.55;
    lnS([[X(f - hw), Y(0.26 + t * 0.15)], [X(f - hw * 0.4), Y(t * 0.68)], [X(f), Y(t * 0.82)], [X(f + hw * 0.4), Y(t * 0.68)], [X(f + hw), Y(0.26 + t * 0.15)]], u, key + 'pin' + i, { w: 1.6 });
    ln(loopPts(X(f), Y(0.2 + t * 0.32), 0.022 * w, 0.03 * h, 0.1), u, key + 'gem' + i, { w: 2 });
  });
  ln(loopPts(X(0), Y(1.06), 0.03 * w, 0.05 * h, 0.1), u, key + 'bud', { w: 2.2 });
  ln(band, u, key + 'band', { w: 3.4 });
  lnS([[X(-0.47), Y(0.09)], [X(0), Y(0.03)], [X(0.47), Y(0.09)]], u, key + 'bl', { w: 1.4 });
  for (let i = 0; i < 11; i++) { const f = -0.44 + i * 0.088; if (u > 0.9) { ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(X(f), Y(0.12 - 0.02 * Math.abs(f)), 0.009 * w + 1.4, 0, TAU); ctx.fill(); } }
  for (const s of [-1, 1]) { const F = [[X(s * 0.48), Y(0.04)], [X(s * 0.56), Y(0.08)], [X(s * 0.58), Y(0.22)], [X(s * 0.52), Y(0.27)], [X(s * 0.47), Y(0.18)]]; paperFill(spl(F, true), key + 'fan' + s); lnS(F, u, key + 'fan' + s, { w: 2.6, closed: true }); lnS([[X(s * 0.5), Y(0.1)], [X(s * 0.58), Y(0.28)]], u, key + 'fl' + s, { w: 1.4 }); }
  if (u >= 1) shade(spl([[X(0.05), Y(0.9)], [X(0.12), Y(0.5)], [X(0.45), Y(0.42)], [X(0.49), Y(0.2)], [X(0.1), Y(0.2)]], true), key + 'csh', { ang: -1.0, gap: 6, a: 0.3 });
  return petals;
}
// a necklace: a curved band from shoulder to shoulder across the chest with a pendant; broad = a gold collar
function necklace(cx, y, w, drop, key, o = {}) {
  const u = o.u ?? FIG.u, C1 = [[cx - w / 2, y], [cx - w * 0.3, y + drop * 0.7], [cx, y + drop], [cx + w * 0.3, y + drop * 0.7], [cx + w / 2, y]];
  lnS(C1, u, key + 'a', { w: 2.8 });
  if (o.broad) {
    const C2 = C1.map(([x, yy], i) => [x + (i === 0 ? 4 : i === 4 ? -4 : 0), yy + (o.broad ?? 0.25) * drop]);
    paperFill(spl([...C1, ...C2.slice().reverse()], true), key + 'cf');
    lnS(C1, u, key + 'a2', { w: 2.8 }); lnS(C2, u, key + 'b', { w: 3.2 });
    for (let i = 1; i < 10; i++) { const f = i / 10, p = pointAt(spl(C1), f), q = pointAt(spl(C2), f); ln([p, q], u, key + 'seg' + i, { w: 1.6 }); }
    ln(loopPts(cx, y + drop * (1 + (o.broad ?? 0.25)) + 0.12 * w * 0.3, 0.06 * w, 0.07 * w, 0.1), u, key + 'pend', { w: 2.6 });
  } else {
    lnS(C1.map(([x, yy]) => [x, yy + drop * 0.18]), u, key + 'c', { w: 1.8 });
    lnS([[cx - 0.05 * w, y + drop * 1.1], [cx, y + drop * 1.3], [cx + 0.05 * w, y + drop * 1.1], [cx, y + drop * 0.98]], u, key + 'pd', { w: 2.4, closed: true });
  }
}

// =====================================================================
//  MAHISHASURA — bare chest, dhoti with a sash, armlets, a tiered crown, long wavy hair, a moustache.
//  mahishasura(x, y, H, { pose: 'walk' | 'sit' | 'kneel', u, crownK, eyes, smile, flip, key })
//  mahishaHead(x, y, h, o): the face close-up (beats 5 and 8), (x, y) = the face centre, h = hairline to chin.
// =====================================================================
const MH_ARM = [[0, 0.34], [0.22, 0.33, 0.37], [0.46, 0.2], [0.58, 0.26, 0.24], [0.92, 0.15], [1, 0.14]];
const MH_LEG = [[0, 0.46], [0.22, 0.42, 0.44], [0.48, 0.25], [0.62, 0.3, 0.27], [0.94, 0.14], [1, 0.13]];
function mhTorso(T, u, key, dy = 0) {
  const P = [[-0.4, -6.22], [-0.8, -6.08], [-1.1, -5.92], [-1.24, -5.6], [-1.2, -5.2], [-1.0, -5.0], [-0.9, -4.7], [-0.74, -4.4], [-0.68, -4.15], [-0.72, -3.95], [0, -3.88],
    [0.72, -3.95], [0.68, -4.15], [0.74, -4.4], [0.9, -4.7], [1.0, -5.0], [1.2, -5.2], [1.24, -5.6], [1.1, -5.92], [0.8, -6.08], [0.4, -6.22], [0, -6.12]].map(([a, b]) => T(a, b + dy));
  const S = spl(P, true);
  paperFill(S, key + 't', clamp(u * 3));
  const half = Math.floor(S.length / 2);
  ln(S.slice(0, half + 1), u, key + 'tL', { w: 3.0 }); ln(S.slice(half), u, key + 'tR', { w: 4.6 });
  const C = (pts) => pts.map(([a, b]) => T(a, b + dy));
  for (const s of [-1, 1]) {
    lnS(C([[s * 0.06, -5.72], [s * 0.3, -5.38], [s * 0.62, -5.35], [s * 0.92, -5.56]]), u, key + 'pec' + s, { w: 2.8 });
    lnS(C([[s * 0.1, -6.02], [s * 0.45, -6.07], [s * 0.85, -5.98]]), u, key + 'clv' + s, { w: 1.6 });
    lnS(C([[s * 1.02, -5.92], [s * 0.96, -5.6], [s * 1.06, -5.22]]), u, key + 'dlt' + s, { w: 2 });
    lnS(C([[s * 0.64, -5.02], [s * 0.52, -4.6], [s * 0.56, -4.25]]), u, key + 'obl' + s, { w: 1.8 });
    lnS(C([[s * 0.04, -5.1], [s * 0.2, -5.06], [s * 0.3, -5.1]]), u, key + 'ab1' + s, { w: 1.6 });
    lnS(C([[s * 0.04, -4.82], [s * 0.2, -4.78], [s * 0.28, -4.82]]), u, key + 'ab2' + s, { w: 1.6 });
  }
  lnS(C([[0, -5.6], [0.01, -5.0], [0, -4.5]]), u, key + 'line', { w: 1.6 });
  lnS(C([[-0.05, -4.42], [0, -4.38], [0.05, -4.42]]), u, key + 'nav', { w: 2 });
  if (u >= 1) {
    shade(spl(C([[0.62, -5.95], [1.2, -5.6], [1.15, -5.15], [0.92, -4.7], [0.72, -4.05], [0.5, -4.1], [0.55, -4.7], [0.8, -5.2], [0.9, -5.6]]), true), key + 'shR', { a: 0.5 });
    shade(bandAlong(C([[0.06, -5.7], [0.32, -5.36], [0.62, -5.33], [0.92, -5.54]]), 0.14 * Math.abs(T(1, 0)[0] - T(0, 0)[0]), 1), key + 'shP', { a: 0.45 });
    shade(bandAlong(C([[-0.92, -5.54], [-0.62, -5.33], [-0.32, -5.36], [-0.06, -5.7]]), 0.1 * Math.abs(T(1, 0)[0] - T(0, 0)[0]), 1), key + 'shP2', { a: 0.3 });
  }
  return S;
}
function mhNeck(T, u, key, dy = 0) {
  const N = spl([[-0.32, -6.52], [-0.35, -6.3], [-0.44, -6.1], [0, -6.06], [0.44, -6.1], [0.35, -6.3], [0.32, -6.52]].map(([a, b]) => T(a, b + dy)), true);
  paperFill(N, key + 'n', clamp(u * 3));
  lnS([T(-0.32, -6.52 + dy), T(-0.35, -6.3 + dy), T(-0.46, -6.1 + dy)], u, key + 'nL', { w: 3 });
  lnS([T(0.32, -6.52 + dy), T(0.35, -6.3 + dy), T(0.46, -6.1 + dy)], u, key + 'nR', { w: 4.2 });
  for (const s of [-1, 1]) lnS([T(s * 0.24, -6.46 + dy), T(s * 0.14, -6.25 + dy), T(s * 0.06, -6.08 + dy)], u, key + 'scm' + s, { w: 1.6 });
  if (u >= 1) shade(spl([T(0.1, -6.5 + dy), T(0.32, -6.5 + dy), T(0.42, -6.12 + dy), T(0.16, -6.1 + dy)], true), key + 'nsh', { a: 0.5 });
}
function mhSash(T, u, key, dy = 0, endK = 1) {
  const top = [T(-0.76, -4.3 + dy), T(-0.3, -4.2 + dy), T(0, -4.18 + dy), T(0.3, -4.2 + dy), T(0.76, -4.3 + dy)];
  const bot = top.map(([x, y]) => [x, y + (T(0, 0.17)[1] - T(0, 0)[1])]);
  paperFill(spl([...top, ...bot.slice().reverse()], true), key + 'sf', clamp(u * 3));
  lnS(top, u, key + 'st', { w: 3.4 }); lnS(bot, u, key + 'sb', { w: 3.4 });
  for (let i = 1; i < 8; i++) { const p = pointAt(spl(top), i / 8), q = pointAt(spl(bot), i / 8); ln([p, q], u, key + 'sk' + i, { w: 1.4 }); }
  ln(loopPts(...T(0, -4.1 + dy), Math.abs(T(0.11, 0)[0] - T(0, 0)[0]), Math.abs(T(0, 0.11)[1] - T(0, 0)[1]), 0.1), u, key + 'med', { w: 2.8 });
  // the knot at the left hip and two falling ends
  for (const [k, len, sx] of [[0, 1.2 * endK, -0.95], [1, 0.85 * endK, -0.7]]) {
    const E = [T(-0.62, -4.08 + dy), T(-0.72 + 0.1 * k, -3.7 + dy), T(sx, -4.08 + len + dy), T(sx + 0.16, -4.0 + len + dy), T(-0.56 + 0.1 * k, -3.72 + dy), T(-0.5, -4.08 + dy)];
    paperFill(spl(E, true), key + 'end' + k, clamp(u * 3)); lnS(E, u, key + 'end' + k, { w: 2.8, closed: true });
    if (u >= 1) foldShade([E[1], E[2]], 0.08 * Math.abs(T(1, 0)[0] - T(0, 0)[0]), key + 'endsh' + k, { side: 1 });
  }
  ln(loopPts(...T(-0.58, -4.08 + dy), Math.abs(T(0.1, 0)[0] - T(0, 0)[0]), Math.abs(T(0, 0.08)[1] - T(0, 0)[1]), 0.12), u, key + 'knot', { w: 3 });
}
function mahishasura(x, y, H, o = {}) {
  const key = o.key ?? 'mh', pose = o.pose ?? 'walk', fl = o.flip ? -1 : 1, prevU = FIG.u, prevM = FIG.mode;
  const u0 = o.u ?? 1; FIG.mode = 'ink'; FIG.u = u0;
  const T = (a, b) => [x + a * H * fl, y + b * H], TP = (P) => P.map(([a, b]) => T(a, b));
  const N = 9, U = (k) => stag(u0, k, N, 0.35);
  if (pose === 'walk' || pose === 'stand') {
    const st = pose === 'walk' ? 1 : 0;
    // 0 the gesture: head, spine, the weight leg, the trailing leg (kept faint under the ink)
    gpencil(spl(TP([[0.1, -7.0], [0.05, -6.2], [0.0, -5.0], [0.0, -3.9], [0.3 + 0.3 * st, -2.0], [0.55 + 0.1 * st, -0.2]])), { key: key + 'g1', part: U(0), a: FIG.gesture, w: 2 });
    gpencil(spl(TP([[0.0, -3.9], [-0.3 - 0.3 * st, -2.0], [-0.5 - 0.5 * st, -0.3]])), { key: key + 'g2', part: U(0), a: FIG.gesture, w: 2 });
    for (let i = 0; i <= 8; i++) gpencil([T(-1.5, -i), T(-1.35, -i)], { key: key + 'tick' + i, part: U(0), a: FIG.gesture, w: 1.6, passes: 1 });
    const hd = [0.12, -6.95];
    longHair(...T(hd[0], hd[1]), 0.82 * H, 1.9, key + 'hair', { u: U(1) });
    // far arm (behind), far (back) leg, near leg
    const lB = limb(TP([[-0.32, -3.9], [-0.4 - 0.25 * st, -2.0], [-0.5 - 0.95 * st, -0.5]]), MH_LEG.map(([f, a, b]) => [f, a * H, (b ?? a) * H]));
    const lN = limb(TP([[0.34, -3.9], [0.45 + 0.65 * st, -2.15], [0.5 + 0.75 * st, -0.33]]), MH_LEG.map(([f, a, b]) => [f, a * H, (b ?? a) * H]));
    drawLimb(lB, U(2), key + 'lB', { creases: [0.48] }); drawLimb(lN, U(2), key + 'lN', { creases: [0.48] });
    // feet: the back heel lifted mid-step, the front foot flat
    const fB = st ? TP([[-1.38, -0.58], [-1.6, -0.46], [-1.5, -0.26], [-1.22, -0.08], [-0.92, 0.0], [-0.94, -0.1], [-1.16, -0.34]]) : TP([[-0.62, -0.36], [-0.7, -0.08], [-0.5, 0.0], [-0.05, 0.0], [-0.1, -0.12], [-0.36, -0.3]]);
    const fN = TP([[0.44 + 0.75 * st, -0.38], [0.36 + 0.75 * st, -0.08], [0.5 + 0.75 * st, 0.0], [1.08 + 0.75 * st, 0.0], [1.22 + 0.75 * st, -0.06], [1.05 + 0.75 * st, -0.14], [0.7 + 0.75 * st, -0.26]]);
    for (const [F, k] of [[fB, 'fB'], [fN, 'fN']]) { const S = spl(F, true); paperFill(S, key + k, clamp(U(3) * 3)); ln(S, U(3), key + k, { w: 3.2 }); }
    for (let i = 0; i < 4; i++) lnS([T(0.98 + 0.75 * st - i * 0.07, -0.02), T(1.0 + 0.75 * st - i * 0.07, -0.1)], U(3), key + 'toe' + i, { w: 1.4 });
    ln(loopPts(...T(0.5 + 0.75 * st, -0.42), 0.16 * H, 0.05 * H, 0.1), U(8), key + 'ank', { w: 2 });
    // the dhoti over the hips and thighs, with folds that follow the legs
    const D = spl(TP([[-0.74, -4.24], [-0.98, -3.75], [-1.2 - 0.2 * st, -3.0], [-1.45 - 0.35 * st, -2.2], [-1.25 - 0.4 * st, -1.85], [-0.95 - 0.2 * st, -2.0], [-0.62 - 0.1 * st, -1.85], [-0.3, -2.4], [0.04, -2.8], [0.35, -2.4], [0.7 + 0.3 * st, -2.0], [1.05 + 0.25 * st, -1.86], [1.2 + 0.2 * st, -2.1], [1.05 + 0.1 * st, -2.9], [0.92, -3.5], [0.8, -3.95], [0.72, -4.24], [0, -4.3]]), true);
    paperFill(D, key + 'dh', clamp(U(5) * 3));
    const dh = Math.floor(D.length * 0.45);
    ln(D.slice(0, dh), U(5), key + 'dhL', { w: 3 }); ln(D.slice(dh), U(5), key + 'dhR', { w: 4.2 });
    const folds = [[[0.1, -4.12], [-0.1, -3.4], [-0.3, -2.6]], [[-0.35, -4.08], [-0.9, -3.2], [-1.4 - 0.3 * st, -2.2]], [[-0.15, -3.8], [-0.7, -2.9], [-1.1 - 0.3 * st, -2.0]], [[0.42, -4.08], [0.7, -3.2], [1.0 + 0.15 * st, -2.1]], [[0.2, -3.62], [0.62, -3.0], [1.05, -2.6]], [[-0.05, -3.2], [0.4, -2.7], [0.85 + 0.2 * st, -2.0]]];
    folds.forEach((C, i) => { lnS(TP(C), U(6), key + 'fd' + i, { w: 2 }); if (U(6) >= 1) foldShade(TP(C), 0.09 * H, key + 'fds' + i, { side: i % 2 ? -1 : 1 }); });
    // the front pleats hanging between the legs
    const pl = TP([[-0.12, -4.1], [-0.3, -3.3], [-0.6 - 0.2 * st, -2.5], [-0.48 - 0.2 * st, -2.32], [-0.36 - 0.2 * st, -2.45], [-0.22 - 0.15 * st, -2.36], [0.0, -3.2], [0.12, -4.1]]);
    paperFill(spl(pl, true), key + 'pl', clamp(U(6) * 3)); ln(spl(pl, true), U(6), key + 'pl', { w: 2.6 });
    for (const f of [-0.05, 0.06]) lnS(TP([[f, -4.05], [f - 0.2, -3.2], [f - 0.45 - 0.2 * st, -2.42]]), U(6), key + 'plf' + f, { w: 1.4 });
    const aF = limb(TP([[-0.86, -5.7], [-1.3 - 0.1 * st, -4.62], [-1.3 - 0.3 * st, -3.62]]), MH_ARM.map(([f, a, b]) => [f, a * H, (b ?? a) * H]));
    drawLimb(aF, U(5), key + 'aF', { creases: [0.47] });
    hand(...T(-1.3 - 0.3 * st, -3.62), Math.atan2(T(0, 1)[1] - T(0, 0)[1], -fl * 0.35 * st), 0.78 * H, 'relax', -fl, key + 'hF', U(7));
    const aN = limb(TP([[0.86, -5.7], [1.3 + 0.08 * st, -4.68], [1.4 + 0.35 * st, -3.88]]), MH_ARM.map(([f, a, b]) => [f, a * H, (b ?? a) * H]));
    drawLimb(aN, U(5), key + 'aN', { creases: [0.47] });
    hand(...T(1.4 + 0.35 * st, -3.88), Math.atan2(T(0, 1)[1] - T(0, 0)[1], fl * 0.5 * st), 0.78 * H, 'grip', fl, key + 'hN', U(7));
    mhNeck(T, U(5), key);
    mhTorso(T, U(5), key);
    mhSash(T, U(6), key);
    for (const [lb, k] of [[aF, 'F'], [aN, 'N']]) { bandOn(lb, 0.27, U(8), key + 'arm' + k, { gem: true, w: 0.07 }); bandOn(lb, 0.9, U(8), key + 'bg' + k, { w: 0.05 }); }
    necklace(...T(0, -6.12), 1.3 * H, 0.32 * H, key + 'nk', { broad: 0.35, u: U(8) });
    face(...T(hd[0], hd[1]), 0.82 * H, { kind: 'mahisha', turn: 0.5 * fl, eyes: o.eyes ?? 'open', smile: o.smile ?? 0, key: key + 'f', u: U(1) });
    crown(...T(hd[0] + 0.04, hd[1] - 0.32), 0.78 * H * (o.crownK ?? 1), 0.62 * H * (o.crownK ?? 1), key + 'cr', { u: U(8) });
  } else if (pose === 'sit') {
    const dy = 3.35, hd = [0, -6.95 + dy];
    gpencil(spl(TP([[0, hd[1]], [0, -2.8], [0, -0.55], [-1.0, -0.3], [-1.9, -0.25]])), { key: key + 'g1', part: U(0), a: FIG.gesture, w: 2 });
    gpencil(spl(TP([[0, -0.55], [1.0, -0.3], [1.9, -0.25]])), { key: key + 'g2', part: U(0), a: FIG.gesture, w: 2 });
    longHair(...T(hd[0], hd[1]), 0.82 * H, 2.1, key + 'hair', { u: U(1) });
    const armsS = [-1, 1].map((s) => limb(TP([[s * 0.86, -5.7 + dy], [s * 1.32, -1.38], [s * 1.62, -0.62]]), MH_ARM.map(([f, aa, b]) => [f, aa * H, (b ?? aa) * H])));
    armsS.forEach((a, i) => drawLimb(a, U(2), key + 'a' + i, { creases: [0.47], shadow: i ? 'R' : 'L' }));
    mhNeck(T, U(2), key, dy);
    mhTorso(T, U(2), key, dy);
    // the lap: the dhoti over crossed legs, knees out wide, folds fanning from the hips to the knees
    const D = spl(TP([[-0.74, -0.9], [-1.2, -0.72], [-1.75, -0.55], [-2.02, -0.38], [-2.05, -0.12], [-1.7, 0.02], [-0.8, 0.05], [0, 0.04], [0.8, 0.05], [1.7, 0.02], [2.05, -0.12], [2.02, -0.38], [1.75, -0.55], [1.2, -0.72], [0.74, -0.9], [0, -0.95]]), true);
    paperFill(D, key + 'dh', clamp(U(3) * 3));
    const dh = Math.floor(D.length / 2); ln(D.slice(0, dh + 1), U(3), key + 'dhL', { w: 3 }); ln(D.slice(dh), U(3), key + 'dhR', { w: 4.4 });
    for (const s of [-1, 1]) {
      lnS(TP([[s * 1.75, -0.55], [s * 1.95, -0.42], [s * 2.0, -0.25]]), U(4), key + 'knee' + s, { w: 3 });   // the knee's round
      [[[s * 0.4, -0.85], [s * 1.0, -0.55], [s * 1.6, -0.38]], [[s * 0.3, -0.7], [s * 0.9, -0.3], [s * 1.5, -0.12]], [[s * 0.6, -0.86], [s * 1.25, -0.62], [s * 1.8, -0.5]]]
        .forEach((C, i) => { lnS(TP(C), U(4), key + 'lf' + s + i, { w: 1.8 }); if (U(4) >= 1) foldShade(TP(C), 0.08 * H, key + 'lfs' + s + i, { side: s }); });
    }
    // the right shin crosses in front; both feet rest sole-up on the opposite thighs
    const shin = TP([[1.85, -0.3], [1.0, -0.32], [0.2, -0.42], [-0.5, -0.5]]);
    lnS(shin, U(4), key + 'shin', { w: 2.4 });
    const fR = TP([[-0.32, -0.38], [-0.5, -0.58], [-0.82, -0.72], [-1.12, -0.74], [-1.2, -0.64], [-1.0, -0.56], [-0.7, -0.44], [-0.45, -0.3]]);
    const fL = TP([[0.42, -0.2], [0.62, -0.38], [0.95, -0.46], [1.22, -0.44], [1.26, -0.34], [1.05, -0.24], [0.72, -0.12], [0.5, -0.06]]);
    for (const [F, k, s] of [[fR, 'fR', -1], [fL, 'fL', 1]]) {
      const S = spl(F, true); paperFill(S, key + k, clamp(U(5) * 3)); ln(S, U(5), key + k, { w: 3 });
      for (let i = 0; i < 4; i++) { const t0 = F[3], t1 = F[4]; const p = [lerp(t0[0], t1[0], i / 4), lerp(t0[1], t1[1], i / 4)]; ln([p, [p[0] - s * 0.06 * H * fl, p[1] + 0.04 * H]], U(5), key + k + 't' + i, { w: 1.4 }); }
      lnS([F[1], [lerp(F[1][0], F[3][0], 0.5), lerp(F[1][1], F[6][1], 0.5)], F[6]], U(5), key + k + 'sole', { w: 1.4 });
    }
    mhSash(T, U(5), key, dy, 0.45);
    // arms down to the knees, hands in jnana mudra, palms up
    for (const s of [-1, 1]) {
      const a = armsS[s > 0 ? 1 : 0];
      bandOn(a, 0.27, U(8), key + 'arm' + s, { gem: true, w: 0.07 }); bandOn(a, 0.9, U(8), key + 'bg' + s, { w: 0.05 });
      hand(...T(s * 1.62, -0.62), Math.atan2(0.5, s * fl * 0.5), 0.75 * H, 'mudra', s * fl, key + 'h' + s, U(7));
    }
    necklace(...T(0, -6.12 + dy), 1.3 * H, 0.32 * H, key + 'nk', { broad: 0.35, u: U(8) });
    face(...T(hd[0], hd[1]), 0.82 * H, { kind: 'mahisha', eyes: o.eyes ?? 'closed', key: key + 'f', u: U(1) });
    crown(...T(hd[0], hd[1] - 0.32), 0.78 * H, 0.62 * H, key + 'cr', { u: U(8) });
  } else if (pose === 'kneel') {
    // profile, facing +x: the back knee down, the front foot flat, hands in anjali
    const hd = [0.22, -5.42];
    gpencil(spl(TP([[hd[0], hd[1]], [0.05, -4.8], [-0.2, -3.5], [-0.25, -2.15], [-0.35, -0.3], [-1.75, -0.2]])), { key: key + 'g1', part: U(0), a: FIG.gesture, w: 2 });
    gpencil(spl(TP([[-0.1, -2.1], [1.55, -1.95], [1.42, -0.3]])), { key: key + 'g2', part: U(0), a: FIG.gesture, w: 2 });
    const lean = (fn, extra = 0, pv = T(-0.1, -2.2)) => { ctx.save(); ctx.translate(pv[0], pv[1]); ctx.rotate(fl * (0.34 + extra)); ctx.translate(-pv[0], -pv[1]); fn(); ctx.restore(); };
    const tilt = (fn) => lean(() => { const pv = T(0.12, -5.0); ctx.translate(pv[0], pv[1]); ctx.rotate(-fl * 0.42); ctx.translate(-pv[0], -pv[1]); fn(); });
    lean(() => longHair(...T(hd[0] - 0.1, hd[1]), 0.82 * H, 1.6, key + 'hair', { u: U(1), side: -fl, w: 0.5 }));
    // far arm's forearm peeks out beyond the near one; back leg (kneeling) and front leg
    const lB = limb(TP([[-0.2, -2.15], [-0.36, -0.3], [-1.72, -0.2]]), [[0, 0.46 * H], [0.25, 0.42 * H], [0.47, 0.26 * H], [0.6, 0.27 * H, 0.22 * H], [0.95, 0.13 * H], [1, 0.12 * H]]);
    drawLimb(lB, U(2), key + 'lB', { creases: [0.47] });
    const fB = spl(TP([[-1.62, -0.32], [-1.85, -0.3], [-2.0, -0.12], [-1.98, 0.0], [-1.7, -0.05], [-1.58, -0.12]]), true); paperFill(fB, key + 'fB', clamp(U(3) * 3)); ln(fB, U(3), key + 'fB', { w: 3 });
    const lN = limb(TP([[0.05, -2.1], [1.55, -1.98], [1.42, -0.32]]), [[0, 0.46 * H], [0.25, 0.4 * H, 0.42 * H], [0.5, 0.26 * H], [0.62, 0.3 * H, 0.26 * H], [0.95, 0.14 * H], [1, 0.13 * H]]);
    const torsoP = spl(TP([[-0.1, -4.9], [-0.45, -4.76], [-0.72, -4.42], [-0.76, -3.9], [-0.6, -3.2], [-0.7, -2.6], [-0.6, -2.2], [0.0, -2.05], [0.55, -2.35], [0.66, -2.9], [0.76, -3.5], [0.98, -3.86], [0.92, -4.3], [0.6, -4.66], [0.34, -4.86]]), true);
    lean(() => { paperFill(torsoP, key + 't', clamp(U(4) * 3));
    const th = Math.floor(torsoP.length * 0.5); ln(torsoP.slice(0, th), U(4), key + 'tB', { w: 4.4 }); ln(torsoP.slice(th), U(4), key + 'tF', { w: 3 });
    lnS(TP([[0.34, -4.2], [0.7, -4.08], [0.96, -3.86]]), U(5), key + 'pec', { w: 2.4 });
    if (U(4) >= 1) shade(spl(TP([[-0.1, -4.8], [-0.68, -4.4], [-0.72, -3.9], [-0.56, -3.2], [-0.64, -2.5], [-0.3, -2.4], [-0.25, -3.4], [-0.3, -4.3]]), true), key + 'tsh', { a: 0.5 });
    // the neck and the profile head
    const nk = spl(TP([[-0.08, -4.9], [-0.02, -5.1], [0.28, -5.06], [0.34, -4.8]]), true); paperFill(nk, key + 'nk'); ln(nk, U(4), key + 'nk', { w: 3 }); });
    drawLimb(lN, U(4), key + 'lN', { creases: [0.5] });
    const fN = spl(TP([[1.3, -0.36], [1.26, -0.08], [1.4, 0.0], [2.0, 0.0], [2.12, -0.08], [1.9, -0.16], [1.6, -0.3]]), true); paperFill(fN, key + 'fN', clamp(U(5) * 3)); ln(fN, U(5), key + 'fN', { w: 3 });
    // the dhoti over the hips and thighs, in profile
    const D = spl(TP([[-0.5, -2.78], [0.5, -2.8], [0.6, -2.45], [1.05, -2.36], [1.62, -2.36], [1.8, -2.02], [1.58, -1.64], [0.9, -1.6], [0.38, -1.22], [0.08, -0.4], [-0.34, -0.12], [-0.7, -0.42], [-0.68, -1.3], [-0.62, -2.2]]), true);
    paperFill(D, key + 'dh', clamp(U(5) * 3)); ln(D, U(5), key + 'dh', { w: 3.6 });
    [[[0.3, -2.7], [0.9, -2.2], [1.6, -2.1]], [[0.1, -2.6], [0.6, -1.9], [1.3, -1.72]], [[-0.3, -2.6], [-0.45, -1.6], [-0.4, -0.5]], [[0.0, -2.4], [0.1, -1.4], [-0.1, -0.4]]]
      .forEach((C, i) => { lnS(TP(C), U(6), key + 'fd' + i, { w: 1.9 }); if (U(6) >= 1) foldShade(TP(C), 0.09 * H, key + 'fds' + i, { side: 1 }); });
    lnS(TP([[-0.52, -2.78], [0, -2.72], [0.52, -2.8]]), U(6), key + 'belt', { w: 3.4 }); lnS(TP([[-0.54, -2.62], [0, -2.56], [0.56, -2.64]]), U(6), key + 'belt2', { w: 2.4 });
    // near arm: upper arm down, forearm up to the joined palms in front of the chest
    lean(() => {
      const aN = limb(TP([[0.12, -4.5], [0.62, -3.7], [0.9, -4.5]]), [[0, 0.33 * H], [0.25, 0.3 * H], [0.5, 0.2 * H], [0.65, 0.23 * H], [0.95, 0.14 * H], [1, 0.13 * H]]);
      drawLimb(aN, U(6), key + 'aN', { creases: [0.5] });
      bandOn(aN, 0.25, U(8), key + 'armN', { gem: true }); bandOn(aN, 0.92, U(8), key + 'bgN', { w: 0.05 });
      anjali(...T(0.9, -4.5), fl > 0 ? -1.75 : -Math.PI + 1.75, 0.88 * H, key + 'anj', U(7));
    });
    tilt(() => { profileFace(...T(hd[0], hd[1]), 0.82 * H, fl, { kind: 'mahisha', key: key + 'pf', u: U(1), eyes: o.eyes });
      crown(...T(hd[0] - 0.04, hd[1] - 0.32), 0.66 * H, 0.6 * H, key + 'cr', { u: U(8) }); });
  }
  FIG.u = prevU; FIG.mode = prevM;
}
// the face close-up: shoulders, a broad gold collar, the neck, long hair, the face, the crown. (x, y) = face centre.
function mahishaHead(x, y, h, o = {}) {
  const key = o.key ?? 'mhh', u = o.u ?? 1, prevU = FIG.u, prevM = FIG.mode; FIG.mode = 'ink'; FIG.u = u;
  const U = (k) => stag(u, k, 6, 0.4);
  longHair(x, y, h, 2.0, key + 'hair', { u: U(0), w: 0.7, n: 9 });
  // a thick neck, the trapezius sloping to round deltoids, the chest edge; a cloth over the left shoulder
  const S = spl([[x - 1.62, 2.5], [x - 1.6, 1.62], [x - 1.4, 1.26], [x - 1.0, 1.06], [x - 0.6, 0.94], [x - 0.42, 0.78]].map(([a, b], i) => [i ? a * 1 : a, 0]).map((_, i) => [[x - 1.62 * h, y + 3.4 * h], [x - 1.6 * h, y + 1.62 * h], [x - 1.4 * h, y + 1.26 * h], [x - 1.0 * h, y + 1.06 * h], [x - 0.62 * h, y + 0.94 * h], [x - 0.44 * h, y + 0.8 * h]][i]));
  const SR = S.map(([px, py]) => [2 * x - px, py]);
  paperFill([...S, ...SR.slice().reverse()], key + 'sh', clamp(U(1) * 3));
  ln(S, U(1), key + 'shl', { w: 3.6 }); ln(SR, U(1), key + 'shr', { w: 5.2 });
  for (const s2 of [-1, 1]) lnS([[x + s2 * 1.18 * h, y + 1.2 * h], [x + s2 * 1.12 * h, y + 1.6 * h], [x + s2 * 1.24 * h, y + 2.1 * h]], U(1), key + 'dl' + s2, { w: 2.2 });   // deltoid edge
  const Nk = spl([[x - 0.4 * h, y + 0.32 * h], [x - 0.46 * h, y + 0.62 * h], [x - 0.56 * h, y + 0.9 * h], [x + 0.56 * h, y + 0.9 * h], [x + 0.46 * h, y + 0.62 * h], [x + 0.4 * h, y + 0.32 * h]], true);
  paperFill(Nk, key + 'nk'); ln(spl([[x - 0.4 * h, y + 0.32 * h], [x - 0.46 * h, y + 0.62 * h], [x - 0.6 * h, y + 0.88 * h]]), U(1), key + 'nkL', { w: 3.4 }); ln(spl([[x + 0.4 * h, y + 0.32 * h], [x + 0.46 * h, y + 0.62 * h], [x + 0.6 * h, y + 0.88 * h]]), U(1), key + 'nkR', { w: 5 });
  for (const s2 of [-1, 1]) lnS([[x + s2 * 0.3 * h, y + 0.5 * h], [x + s2 * 0.18 * h, y + 0.72 * h], [x + s2 * 0.06 * h, y + 0.9 * h]], U(1), key + 'scm' + s2, { w: 1.8 });
  if (U(1) >= 1) { shade(spl([[x + 0.12 * h, y + 0.5 * h], [x + 0.42 * h, y + 0.42 * h], [x + 0.56 * h, y + 0.88 * h], [x + 0.14 * h, y + 0.92 * h]], true), key + 'nsh', { a: 0.55 }); shade(spl([[x + 0.7 * h, y + 1.02 * h], [x + 1.4 * h, y + 1.3 * h], [x + 1.6 * h, y + 2.4 * h], [x + 1.1 * h, y + 2.3 * h], [x + 1.0 * h, y + 1.5 * h]], true), key + 'ssh', { a: 0.4 }); }
  // the cloth (uttariya) over the left shoulder, falling in curved folds
  const CL = spl([[x - 1.62 * h, y + 1.5 * h], [x - 1.3 * h, y + 1.1 * h], [x - 0.9 * h, y + 1.0 * h], [x - 0.78 * h, y + 1.3 * h], [x - 0.86 * h, y + 1.9 * h], [x - 0.98 * h, y + 3.4 * h], [x - 1.62 * h, y + 3.4 * h]], true);
  paperFill(CL, key + 'cl', clamp(U(3) * 3)); ln(CL, U(3), key + 'cl', { w: 3.4 });
  for (let i = 0; i < 3; i++) { const C = [[x - (1.4 - i * 0.12) * h, y + (1.2 + i * 0.03) * h], [x - (1.25 - i * 0.1) * h, y + (1.7 + i * 0.05) * h], [x - (1.3 - i * 0.1) * h, y + 3.3 * h]]; lnS(C, U(3), key + 'clf' + i, { w: 1.8 }); if (U(3) >= 1) foldShade(C, 0.05 * h, key + 'clfs' + i, { side: 1 }); }
  necklace(x, y + 0.86 * h, 1.5 * h, 0.42 * h, key + 'col', { broad: 0.45, u: U(4) });
  face(x, y, h, { kind: 'mahisha', eyes: o.eyes ?? 'closed', smile: o.smile ?? 0, look: o.look, key: key + 'f', u: U(2) });
  if (!o.noCrown) crown(x, y - 0.4 * h, 0.92 * h * (o.crownK ?? 1), 0.66 * h * (o.crownK ?? 1), key + 'cr', { u: U(5) });
  FIG.u = prevU; FIG.mode = prevM;
}

// =====================================================================
//  SHARED PROPS: the lotus seat, a beard, a trident, a chakra, a conch, a mace, a bow, a sword, a lotus flower
// =====================================================================
function lotus(cx, y, w, key, o = {}) {   // two rows of curved petals; (cx, y) = the base line
  const u = o.u ?? FIG.u, n = 7;
  for (let r = 1; r >= 0; r--) for (let i = 0; i < n - r; i++) {
    const x = cx - w / 2 + (i + 0.5 + r * 0.5) * (w / n), hh = w * (r ? 0.13 : 0.17) * (1 - 0.3 * Math.abs(i - (n - 1 - r) / 2) / n), yy = y - r * w * 0.05, pw = w / n * 0.62;
    const P = spl([[x - pw, yy], [x - pw * 0.95, yy - hh * 0.45], [x - pw * 0.55, yy - hh * 0.85], [x, yy - hh], [x + pw * 0.55, yy - hh * 0.85], [x + pw * 0.95, yy - hh * 0.45], [x + pw, yy], [x, yy + hh * 0.08]], true);
    paperFill(P, key + 'f' + r + i, clamp(u * 3)); ln(P, stag(u, r ? 0 : 1, 2), key + r + i, { w: 3 });
    lnS([[x, yy - hh * 0.1], [x - pw * 0.08, yy - hh * 0.5], [x, yy - hh * 0.85]], u, key + 'v' + r + i, { w: 1.4 });
    if (u >= 1) foldShade([[x + pw * 0.1, yy - hh * 0.9], [x + pw * 0.75, yy - hh * 0.5], [x + pw * 0.95, yy]], pw * 0.3, key + 'sh' + r + i, { side: -1, a: 0.35 });
  }
  lnS([[cx - w * 0.56, y + 4], [cx, y + 10], [cx + w * 0.56, y + 4]], u, key + 'base', { w: 3.6 });
}
function beard(cx, cy, w, len, key, o = {}) {   // (cx, cy) = under the lower lip; a long soft beard with wavy strands, hatched
  const u = o.u ?? FIG.u, P = spl([[cx - w * 0.5, cy - w * 0.32], [cx - w * 0.56, cy + len * 0.15], [cx - w * 0.44, cy + len * 0.5], [cx - w * 0.22, cy + len * 0.82], [cx, cy + len], [cx + w * 0.22, cy + len * 0.82], [cx + w * 0.44, cy + len * 0.5], [cx + w * 0.56, cy + len * 0.15], [cx + w * 0.5, cy - w * 0.32], [cx, cy + w * 0.06]], true);
  paperFill(P, key + 'f', clamp(u * 3)); ln(P, u, key + 'o', { w: 2.8 });
  for (let i = 0; i < 7; i++) { const f = (i - 3) / 3.6; lnS([[cx + f * w * 0.42, cy + 0.04 * len], [cx + f * w * 0.48 + Math.sin(i * 2) * w * 0.05, cy + len * 0.4], [cx + f * w * 0.3, cy + len * 0.7], [cx + f * w * 0.1, cy + len * 0.92]], u, key + 's' + i, { w: 1.5 }); }
  if (u >= 1) shade(spl([[cx + w * 0.1, cy], [cx + w * 0.5, cy + len * 0.15], [cx + w * 0.42, cy + len * 0.5], [cx + w * 0.15, cy + len * 0.85], [cx + w * 0.1, cy + len * 0.4]], true), key + 'h', { ang: -1.2, gap: 6, a: 0.4 });
  for (const s of [-1, 1]) lnS([[cx + s * 0.02 * w, cy - 0.3 * w], [cx + s * 0.2 * w, cy - 0.32 * w], [cx + s * 0.36 * w, cy - 0.22 * w], [cx + s * 0.42 * w, cy - 0.08 * w]], u, key + 'mo' + s, { w: 2.4 });
}
const WP = {   // weapons and attributes, each drawn around a grip point (gx, gy) with a shaft angle a, size s (px)
  trident(gx, gy, a, s, key, u) { const d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]], P = (t, k) => [gx + d[0] * t * s + n[0] * k * s, gy + d[1] * t * s + n[1] * k * s];
    ln([P(-0.9, 0), P(1.25, 0)], u, key + 'sh', { w: 3.6 });
    ln(spl([P(1.0, -0.24), P(1.12, -0.22), P(1.2, -0.12), P(1.22, 0), P(1.2, 0.12), P(1.12, 0.22), P(1.0, 0.24)]), u, key + 'cr', { w: 3.4 });
    ln(spl([P(1.0, -0.24), P(1.08, -0.3), P(1.3, -0.26), P(1.45, -0.22)]), u, key + 'p1', { w: 3.2 }); ln(spl([P(1.0, 0.24), P(1.08, 0.3), P(1.3, 0.26), P(1.45, 0.22)]), u, key + 'p2', { w: 3.2 });
    ln(spl([P(1.22, -0.05), P(1.4, -0.06), P(1.58, 0), P(1.4, 0.06), P(1.22, 0.05)]), u, key + 'p0', { w: 3.2 }); },
  chakra(gx, gy, a, s, key, u) { const r = s * 0.3, c = [gx + Math.cos(a) * s * 0.42, gy + Math.sin(a) * s * 0.42];
    ln(loopPts(c[0], c[1], r, r, 0.06), u, key + 'o', { w: 3.4 }); ln(loopPts(c[0], c[1], r * 0.72, r * 0.72, 0.06), u, key + 'i', { w: 1.8 }); ln(loopPts(c[0], c[1], r * 0.18, r * 0.18, 0.1), u, key + 'h', { w: 2 });
    for (let j = 0; j < 12; j++) { const b = j / 12 * TAU + TT * 0.8; ln([[c[0] + Math.cos(b) * r * 0.2, c[1] + Math.sin(b) * r * 0.2], [c[0] + Math.cos(b) * r * 0.72, c[1] + Math.sin(b) * r * 0.72]], u, key + 's' + j, { w: 1.4 }); }
    for (let j = 0; j < 16; j++) { const b = j / 16 * TAU + TT * 0.8; ln([[c[0] + Math.cos(b) * r, c[1] + Math.sin(b) * r], [c[0] + Math.cos(b + 0.1) * r * 1.16, c[1] + Math.sin(b + 0.1) * r * 1.16]], u, key + 't' + j, { w: 1.8 }); } },
  conch(gx, gy, a, s, key, u) { const P = (t, k) => [gx + Math.cos(a) * t * s - Math.sin(a) * k * s, gy + Math.sin(a) * t * s + Math.cos(a) * k * s];
    const C = spl([P(-0.05, -0.12), P(0.15, -0.2), P(0.38, -0.16), P(0.52, -0.04), P(0.5, 0.1), P(0.3, 0.16), P(0.08, 0.14), P(-0.08, 0.06)], true);
    paperFill(C, key + 'f', clamp(u * 3)); ln(C, u, key + 'o', { w: 3 });
    for (let j = 0; j < 3; j++) lnS([P(0.12 + j * 0.12, -0.17 + j * 0.02), P(0.18 + j * 0.12, 0), P(0.12 + j * 0.12, 0.14)], u, key + 'r' + j, { w: 1.5 }); },
  mace(gx, gy, a, s, key, u) { const P = (t) => [gx + Math.cos(a) * t * s, gy + Math.sin(a) * t * s];
    ln([P(-0.35), P(0.95)], u, key + 'sh', { w: 4 }); const c = P(1.15), r = s * 0.2;
    paperFill(loopPts(c[0], c[1], r, r * 1.1, 0), key + 'hf'); ln(loopPts(c[0], c[1], r, r * 1.1, 0.06), u, key + 'h', { w: 3.6 });
    for (let j = -1; j <= 1; j++) lnS([[c[0] - r * 0.7, c[1] + j * r * 0.45], [c[0], c[1] + j * r * 0.55], [c[0] + r * 0.7, c[1] + j * r * 0.45]], u, key + 'r' + j, { w: 1.4 });
    if (u >= 1) shade(loopPts(c[0] + r * 0.2, c[1] + r * 0.2, r * 0.75, r * 0.85, 0), key + 'hs', { a: 0.45 }); },
  bow(gx, gy, a, s, key, u) { const d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]], P = (t, k) => [gx + d[0] * t * s + n[0] * k * s, gy + d[1] * t * s + n[1] * k * s];
    ln(spl([P(-1.0, 0.0), P(-0.7, -0.22), P(-0.2, -0.32), P(0, -0.3), P(0.2, -0.32), P(0.7, -0.22), P(1.0, 0.0)]), u, key + 'b', { w: 4 });
    ln([P(-1.0, 0.0), P(1.0, 0.0)], u, key + 's', { w: 1.6 }); },
  sword(gx, gy, a, s, key, u) { const d = [Math.cos(a), Math.sin(a)], n = [-d[1], d[0]], P = (t, k) => [gx + d[0] * t * s + n[0] * k * s, gy + d[1] * t * s + n[1] * k * s];
    const Bl = spl([P(0.18, -0.07), P(0.8, -0.08), P(1.3, -0.04), P(1.42, 0.06), P(1.25, 0.08), P(0.8, 0.07), P(0.18, 0.06)], true);
    paperFill(Bl, key + 'f'); ln(Bl, u, key + 'bl', { w: 3 }); ln([P(0.25, 0), P(1.25, 0.02)], u, key + 'fu', { w: 1.4 });
    ln(spl([P(0.16, -0.2), P(0.18, 0), P(0.16, 0.2)]), u, key + 'gd', { w: 4 }); ln([P(-0.18, 0), P(0.15, 0)], u, key + 'hl', { w: 4.4 }); },
  lotusFlower(gx, gy, a, s, key, u) { const c = [gx + Math.cos(a) * s * 0.55, gy + Math.sin(a) * s * 0.55];
    ln([[gx, gy], c], u, key + 'st', { w: 2.4 });
    for (let j = -2; j <= 2; j++) { const b = a + j * 0.36, L = s * (0.42 - Math.abs(j) * 0.06), P = spl([c, [c[0] + Math.cos(b - 0.2) * L * 0.6, c[1] + Math.sin(b - 0.2) * L * 0.6], [c[0] + Math.cos(b) * L, c[1] + Math.sin(b) * L], [c[0] + Math.cos(b + 0.2) * L * 0.6, c[1] + Math.sin(b + 0.2) * L * 0.6]], true); paperFill(P, key + 'pf' + j); ln(P, u, key + 'p' + j, { w: 2.2 }); } },
  rosary(gx, gy, a, s, key, u) { for (let j = 0; j < 16; j++) { const b = j / 16 * TAU; ln(loopPts(gx + Math.sin(b) * s * 0.18, gy + s * 0.36 - Math.cos(b) * s * 0.36, s * 0.035, s * 0.035, 0.1), u, key + j, { w: 1.8 }); } },
  book(gx, gy, a, s, key, u) { const P = spl([[gx - s * 0.4, gy - s * 0.32], [gx + s * 0.38, gy - s * 0.36], [gx + s * 0.4, gy + s * 0.02], [gx - s * 0.38, gy + s * 0.06]], true);
    paperFill(P, key + 'f'); ln(P, u, key + 'o', { w: 3 }); for (let j = 1; j <= 3; j++) ln([[gx - s * 0.34, gy - s * 0.32 + j * s * 0.09], [gx + s * 0.34, gy - s * 0.34 + j * s * 0.09]], u, key + 'l' + j, { w: 1.3 });
    ln([[gx, gy - s * 0.35], [gx, gy + s * 0.04]], u, key + 'sp', { w: 2 }); },
  pot(gx, gy, a, s, key, u) { const P = spl([[gx - s * 0.2, gy - s * 0.42], [gx - s * 0.16, gy - s * 0.3], [gx - s * 0.36, gy - s * 0.12], [gx - s * 0.38, gy + s * 0.1], [gx - s * 0.2, gy + s * 0.26], [gx + s * 0.2, gy + s * 0.26], [gx + s * 0.38, gy + s * 0.1], [gx + s * 0.36, gy - s * 0.12], [gx + s * 0.16, gy - s * 0.3], [gx + s * 0.2, gy - s * 0.42]], true);
    paperFill(P, key + 'f'); ln(P, u, key + 'o', { w: 3.2 }); lnS([[gx + s * 0.36, gy - s * 0.08], [gx + s * 0.56, gy - s * 0.2], [gx + s * 0.62, gy - s * 0.34]], u, key + 'sp', { w: 2.6 });
    if (u >= 1) shade(spl([[gx + s * 0.05, gy - s * 0.25], [gx + s * 0.34, gy - s * 0.1], [gx + s * 0.3, gy + s * 0.2], [gx + s * 0.05, gy + s * 0.22]], true), key + 'sh', { a: 0.45 }); },
};
// =====================================================================
//  BRAHMA — seated in padmasana on a lotus, four arms (rosary, Vedas, blessing, water pot), three faces (front and two
//  three-quarter), a long white beard, a tall crown, a halo; robes with folds. Ink only. (x, y) = the seat's base line.
// =====================================================================
function brahma(x, y, H, o = {}) {
  const key = o.key ?? 'br', u0 = o.u ?? 1, prevU = FIG.u, prevM = FIG.mode; FIG.mode = 'ink'; FIG.u = u0;
  const T = (a, b) => [x + a * H, y + b * H], TP = (P) => P.map(([a, b]) => T(a, b)), U = (k) => stag(u0, k, 9, 0.35);
  const sy = -0.95;   // the seat (top of the lotus) in heads above y
  const Y0 = (b) => b + sy;   // seated body coordinates: hips at 0, shoulders at -2.35, face centre at -3.12
  if (o.halo !== false) { ln(loopPts(...T(0, Y0(-3.3)), 1.15 * H, 1.15 * H, 0.05), U(0), key + 'halo', { w: 3.6 }); ln(loopPts(...T(0, Y0(-3.3)), 1.24 * H, 1.24 * H, 0.04), U(0), key + 'halo2', { w: 1.6 }); }
  lotus(...T(0, 0), 4.6 * H, key + 'lot', { u: U(0) });
  // arms behind the torso: upper pair raised out (rosary left, book right), lower right raised in blessing, lower left holds the pot on the knee
  const ARM = [[0, 0.27 * H], [0.25, 0.26 * H], [0.47, 0.17 * H], [0.6, 0.2 * H], [0.93, 0.12 * H], [1, 0.11 * H]];
  const arms = [
    { J: [[-0.66, -2.18], [-1.55, -2.45], [-1.72, -3.4]], h: 'grip', ang: -Math.PI / 2 - 0.2, side: -1, w: 'rosary' },
    { J: [[0.66, -2.18], [1.55, -2.45], [1.72, -3.4]], h: 'grip', ang: -Math.PI / 2 + 0.2, side: 1, w: 'book' },
    { J: [[0.72, -2.0], [1.5, -1.3], [1.42, -2.2]], h: 'open', ang: -Math.PI / 2 + 0.1, side: -1, w: null },
    { J: [[-0.76, -2.0], [-1.45, -1.15], [-1.75, -0.55]], h: 'cup', ang: Math.PI / 2 + 0.6, side: 1, w: 'pot' },
  ];
  const lbs = arms.map((A, i) => limb(TP(A.J.map(([a, b]) => [a, Y0(b)])), ARM));
  lbs.forEach((lb, i) => drawLimb(lb, U(1), key + 'arm' + i, { creases: [0.47] }));
  // the body: a gentle (not muscular) torso; the uttariya over the left shoulder; the sacred thread
  const torso = spl(TP([[-0.32, -2.42], [-0.66, -2.3], [-0.86, -2.1], [-0.84, -1.7], [-0.76, -1.2], [-0.74, -0.6], [-0.82, -0.2], [0, -0.1], [0.82, -0.2], [0.74, -0.6], [0.76, -1.2], [0.84, -1.7], [0.86, -2.1], [0.66, -2.3], [0.32, -2.42], [0, -2.35]].map(([a, b]) => [a, Y0(b)])), true);
  paperFill(torso, key + 't', clamp(U(2) * 3)); const th = Math.floor(torso.length / 2); ln(torso.slice(0, th + 1), U(2), key + 'tL', { w: 3 }); ln(torso.slice(th), U(2), key + 'tR', { w: 4.4 });
  if (U(2) >= 1) shade(spl(TP([[0.4, -2.3], [0.82, -2.05], [0.7, -1.2], [0.62, -0.3], [0.4, -0.3], [0.45, -1.2], [0.55, -2.0]].map(([a, b]) => [a, Y0(b)])), true), key + 'tsh', { a: 0.45 });
  const ut = spl(TP([[-0.84, -2.15], [-0.5, -2.4], [-0.2, -2.0], [0.3, -1.1], [0.66, -0.5], [0.7, -0.25], [0.4, -0.3], [0.0, -0.9], [-0.55, -1.6], [-0.86, -1.8]].map(([a, b]) => [a, Y0(b)])), true);
  paperFill(ut, key + 'ut', clamp(U(3) * 3)); ln(ut, U(3), key + 'ut', { w: 3.2 });
  for (let i = 0; i < 3; i++) { const C = TP([[-0.55 + i * 0.12, -2.2 + i * 0.05], [-0.05 + i * 0.12, -1.4 + i * 0.05], [0.42 + i * 0.06, -0.55]].map(([a, b]) => [a, Y0(b)])); lnS(C, U(3), key + 'utf' + i, { w: 1.6 }); if (U(3) >= 1) foldShade(C, 0.06 * H, key + 'utfs' + i, { side: 1 }); }
  // the lap: robes over crossed legs, knees out, both feet sole-up
  const D = spl(TP([[-0.8, -0.42], [-1.3, -0.3], [-1.8, -0.12], [-2.08, 0.1], [-2.06, 0.42], [-1.6, 0.6], [-0.8, 0.62], [0, 0.58], [0.8, 0.62], [1.6, 0.6], [2.06, 0.42], [2.08, 0.1], [1.8, -0.12], [1.3, -0.3], [0.8, -0.42], [0, -0.46]].map(([a, b]) => [a, Y0(b) + 0.1])), true);
  paperFill(D, key + 'lap', clamp(U(3) * 3)); const dh = Math.floor(D.length / 2); ln(D.slice(0, dh + 1), U(3), key + 'lapL', { w: 3 }); ln(D.slice(dh), U(3), key + 'lapR', { w: 4.4 });
  for (const s of [-1, 1]) [[[s * 0.3, -0.36], [s * 1.0, -0.02], [s * 1.8, 0.2]], [[s * 0.2, -0.15], [s * 0.95, 0.3], [s * 1.6, 0.5]], [[s * 0.6, -0.4], [s * 1.3, -0.2], [s * 1.95, 0.0]], [[s * 1.8, -0.1], [s * 2.0, 0.12], [s * 1.95, 0.38]]]
    .forEach((C, i) => { const Q = TP(C.map(([a, b]) => [a, Y0(b) + 0.1])); lnS(Q, U(4), key + 'lf' + s + i, { w: 1.6 }); if (U(4) >= 1) foldShade(Q, 0.07 * H, key + 'lfs' + s + i, { side: s }); });
  for (const [s, fx, fy] of [[-1, -0.6, 0.12], [1, 0.66, 0.22]]) {
    const F = TP([[fx, fy], [fx + s * 0.2, fy - 0.12], [fx + s * 0.5, fy - 0.18], [fx + s * 0.72, fy - 0.14], [fx + s * 0.74, fy - 0.04], [fx + s * 0.5, fy + 0.04], [fx + s * 0.2, fy + 0.08]].map(([a, b]) => [a, Y0(b) + 0.1]));
    const S = spl(F, true); paperFill(S, key + 'ft' + s); ln(S, U(4), key + 'ft' + s, { w: 2.8 });
    for (let i = 0; i < 4; i++) { const p = [lerp(F[3][0], F[4][0], i / 3), lerp(F[3][1], F[4][1], i / 3)]; ln([p, [p[0] + s * 0.05 * H, p[1] + 0.02 * H]], U(4), key + 'tt' + s + i, { w: 1.3 }); }
  }
  // the lower arms in front, the hands and what they hold
  lbs.forEach((lb, i) => { bandOn(lb, 0.26, U(8), key + 'kb' + i, { gem: true }); bandOn(lb, 0.9, U(8), key + 'bg' + i, { w: 0.05 }); });
  arms.forEach((A, i) => {
    const wr = TP([A.J[2]].map(([a, b]) => [a, Y0(b)]))[0], hs = 0.78 * H;
    if (A.w === 'pot') WP.pot(wr[0] - 0.05 * H, wr[1] + 0.55 * H, 0, 0.9 * H, key + 'pot', U(7));
    const c = hand(wr[0], wr[1], A.ang, hs, A.h, A.side, key + 'h' + i, U(6));
    if (A.w === 'rosary') WP.rosary(c[0], c[1], 0, 0.9 * H, key + 'ros', U(7));
    if (A.w === 'book') WP.book(c[0], c[1] - 0.25 * H, 0, 0.9 * H, key + 'book', U(7));
  });
  necklace(...T(0, Y0(-2.36)), 1.0 * H, 0.32 * H, key + 'nk', { u: U(8) });
  // three faces: the two side faces behind (three-quarter, turned out), then the front face; long beards; one tall crown
  const fh = 0.8 * H, fy = Y0(-3.12);
  for (const s of [-1, 1]) {
    const sx = s * 0.74;
    beard(...T(sx + s * 0.05, fy + 0.34), 0.42 * H, 0.45 * H, key + 'sbd' + s, { u: U(6) });
    face(...T(sx, fy - 0.04), fh * 0.88, { kind: 'brahma', turn: s * 0.75, eyes: 'down', key: key + 'sf' + s, u: U(6), tilak: false });
    beard(...T(sx + s * 0.05, fy + 0.34), 0.42 * H, 0.45 * H, key + 'sbd2' + s, { u: U(6) });
  }
  const neck = spl(TP([[-0.26, fy + 0.3], [-0.3, -2.3 + sy], [0.3, -2.3 + sy], [0.26, fy + 0.3]]), true); paperFill(neck, key + 'neck'); ln(neck, U(6), key + 'neck', { w: 2.6 });
  longHair(...T(0, fy), fh, 1.6, key + 'hair', { u: U(6), w: 0.6, n: 4 });
  face(...T(0, fy), fh, { kind: 'brahma', eyes: 'down', key: key + 'ff', u: U(6) });
  beard(...T(0, fy + 0.36), 0.62 * H, 1.1 * H, key + 'bd', { u: U(7) });
  crown(...T(0, fy - 0.36), 1.75 * H, 0.95 * H, key + 'cr', { u: U(8) });
  FIG.u = prevU; FIG.mode = prevM;
  return { palm: TP([[1.42, Y0(-2.2) - 0.4]])[0], halo: [...T(0, Y0(-3.3)), 1.15 * H] };
}

// =====================================================================
//  THE LION — side profile facing left: a barrel body with a deep chest, a defined shoulder and haunch, four legs with
//  paws, a flowing mane, a head with a muzzle and a calm eye, a curled tail with a tuft. Ink and graphite only.
//  (x, y) = the ground under its hind paws' front edge; H = Durga's head unit (so the two always match).
// =====================================================================
function lion(x, y, H, o = {}) {
  const key = o.key ?? 'ln', u0 = o.u ?? 1, prevU = FIG.u, prevM = FIG.mode; FIG.mode = 'ink'; FIG.u = u0;
  const T = (a, b) => [x + a * H, y + b * H], TP = (P) => P.map(([a, b]) => T(a, b)), U = (k) => stag(u0, k, 7, 0.35);
  const FL = [[0, 0.36 * H], [0.4, 0.25 * H], [0.75, 0.17 * H], [1, 0.16 * H]], HL = [[0, 0.52 * H], [0.35, 0.33 * H], [0.6, 0.2 * H], [0.85, 0.16 * H], [1, 0.15 * H]];
  const paw = (px, k, uu) => { const P = spl(TP([[px + 0.2, -0.22], [px + 0.16, -0.06], [px - 0.06, 0.0], [px - 0.32, -0.01], [px - 0.38, -0.1], [px - 0.24, -0.2]]), true); paperFill(P, key + 'pw' + k, clamp(uu * 3)); ln(P, uu, key + 'pw' + k, { w: 3 }); for (let i = 0; i < 3; i++) lnS(TP([[px - 0.26 + i * 0.1, -0.01], [px - 0.24 + i * 0.1, -0.08]]), uu, key + 'pt' + k + i, { w: 1.4 }); };
  // far legs first (behind the body), a little darker with hatching
  const lFF = limb(TP([[-2.15, -1.6], [-2.18, -0.85], [-2.2, -0.2]]), FL), lHF = limb(TP([[0.42, -1.55], [0.18, -0.95], [0.52, -0.5], [0.46, -0.2]]), HL);
  for (const [lb, k, px] of [[lFF, 'ff', -2.2], [lHF, 'hf', 0.46]]) { drawLimb(lb, U(1), key + k, { creases: [0.5], ha: 0.6 }); if (U(1) >= 1) shade(lb.P, key + k + 'dk', { a: 0.3, gap: 7 }); paw(px, k, U(2)); }
  // the tail: up from the rump, a curl, a tuft
  const tl = limb(TP([[0.45, -2.0], [0.95, -1.75], [1.18, -1.2], [1.42, -0.98], [1.6, -1.25], [1.56, -1.55]]), [[0, 0.09 * H], [0.5, 0.06 * H], [1, 0.05 * H]]);
  drawLimb(tl, U(2), key + 'tail', { hatch: false });
  const tf = spl(TP([[1.5, -1.5], [1.62, -1.62], [1.6, -1.85], [1.66, -2.0], [1.52, -1.92], [1.44, -1.72]]), true); paperFill(tf, key + 'tf'); ln(tf, U(2), key + 'tuft', { w: 2.6 }); if (U(2) >= 1) shade(tf, key + 'tfs', { a: 0.6, gap: 4 });
  // the body: withers, back, rump, haunch, belly, deep chest
  const body = spl(TP([[-2.45, -2.55], [-1.4, -2.42], [-0.6, -2.38], [0.1, -2.3], [0.45, -2.05], [0.6, -1.6], [0.4, -1.12], [-0.1, -1.05], [-0.7, -1.02], [-1.3, -1.0], [-1.9, -0.98], [-2.4, -0.96], [-2.9, -1.35], [-3.0, -1.9], [-2.75, -2.42]]), true);
  paperFill(body, key + 'b', clamp(U(3) * 3));
  const bh = Math.floor(body.length * 0.42); ln(body.slice(0, bh), U(3), key + 'bT', { w: 3.2 }); ln(body.slice(bh), U(3), key + 'bB', { w: 4.6 });
  lnS(TP([[0.15, -2.12], [0.05, -1.6], [0.2, -1.2]]), U(4), key + 'haunch', { w: 2.4 });   // the haunch
  lnS(TP([[-2.3, -2.2], [-2.1, -1.7], [-2.3, -1.2]]), U(4), key + 'shoulder', { w: 2.4 });   // the shoulder blade
  lnS(TP([[-1.6, -1.3], [-1.0, -1.18], [-0.4, -1.2]]), U(4), key + 'belly', { w: 1.4 });
  if (U(3) >= 1) { foldShade(TP([[-2.6, -1.0], [-1.4, -1.02], [0.2, -1.1]]), 0.28 * H, key + 'bsh', { side: -1, a: 0.5 }); shade(spl(TP([[0.15, -2.1], [0.55, -1.9], [0.58, -1.4], [0.3, -1.15], [0.12, -1.5]]), true), key + 'hsh', { a: 0.45 }); }
  // near legs over the body
  const lFN = limb(TP([[-2.5, -1.6], [-2.62, -0.85], [-2.7, -0.2]]), FL), lHN = limb(TP([[0.12, -1.6], [-0.15, -0.95], [0.2, -0.5], [0.12, -0.2]]), HL);
  for (const [lb, k, px] of [[lFN, 'fn', -2.7], [lHN, 'hn', 0.12]]) { drawLimb(lb, U(4), key + k, { creases: [0.5] }); paw(px, k, U(4)); }
  // the mane: a flowing mass around the head and neck, strokes falling back and down (head + mane scaled about the neck)
  const pv = T(-2.45, -1.9), hk = o.headK ?? 1.35; ctx.save(); ctx.translate(pv[0], pv[1]); ctx.scale(hk, hk); ctx.translate(-pv[0], -pv[1]);
  const mane = spl(TP([[-3.05, -3.38], [-2.55, -3.28], [-2.1, -2.85], [-1.95, -2.3], [-2.08, -1.8], [-2.45, -1.4], [-2.95, -1.42], [-3.35, -1.72], [-3.62, -2.1], [-3.66, -2.7], [-3.45, -3.2]]), true);
  paperFill(mane, key + 'mn', clamp(U(5) * 3)); ln(mane, U(5), key + 'mn', { w: 3.4 });
  for (let i = 0; i < 14; i++) { const a = -2.6 + i * 0.36, r0 = 0.45, r1 = 0.95 + 0.12 * Math.sin(i * 2.1); const c = [-2.95, -2.4]; lnS(TP([[c[0] + Math.cos(a) * r0, c[1] + Math.sin(a) * r0], [c[0] + Math.cos(a + 0.18) * (r0 + r1) / 2, c[1] + Math.sin(a + 0.18) * (r0 + r1) / 2], [c[0] + Math.cos(a + 0.32) * r1, c[1] + Math.sin(a + 0.32) * r1]]), U(5), key + 'ms' + i, { w: 1.8 }); }
  if (U(5) >= 1) shade(mane, key + 'mns', { ang: 0.9, gap: 8, a: 0.3 });
  // the head (facing left): brow, nose bridge, broad muzzle, chin, cheek; a calm eye, the nose pad, the mouth, an ear
  const head = spl(TP([[-3.0, -3.0], [-3.4, -2.98], [-3.62, -2.8], [-3.78, -2.58], [-3.9, -2.42], [-3.88, -2.26], [-3.76, -2.14], [-3.56, -2.0], [-3.3, -2.0], [-3.08, -2.15], [-2.95, -2.45]]), true);
  paperFill(head, key + 'h', clamp(U(6) * 3)); ln(head, U(6), key + 'head', { w: 3.6 });
  lnS(TP([[-3.5, -2.86], [-3.66, -2.62], [-3.82, -2.46]]), U(6), key + 'bridge', { w: 1.8 });
  const np = spl(TP([[-3.9, -2.45], [-3.8, -2.43], [-3.76, -2.36], [-3.86, -2.32], [-3.92, -2.38]]), true); ln(np, U(6), key + 'nose', { w: 2.6 }); if (U(6) >= 1) shade(np, key + 'nps', { a: 0.8, gap: 3 });
  lnS(TP([[-3.84, -2.28], [-3.8, -2.2], [-3.6, -2.17], [-3.42, -2.2]]), U(6), key + 'mouth', { w: 2.2 });
  lnS(TP([[-3.4, -2.74], [-3.47, -2.78], [-3.55, -2.74]]), U(6), key + 'eyeU', { w: 2.6 }); lnS(TP([[-3.55, -2.74], [-3.48, -2.71], [-3.4, -2.74]]), U(6), key + 'eyeL', { w: 1.4 });
  if (U(6) > 0.9) { ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(...T(-3.48, -2.74), 0.025 * H, 0, TAU); ctx.fill(); }
  for (let i = 0; i < 3; i++) if (U(6) > 0.9) { ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(...T(-3.68 + i * 0.06, -2.3 + i * 0.02), 2, 0, TAU); ctx.fill(); }
  const ear = spl(TP([[-3.08, -2.95], [-3.1, -3.18], [-2.92, -3.22], [-2.86, -3.02]]), true); paperFill(ear, key + 'ear'); ln(ear, U(6), key + 'ear', { w: 2.6 });
  if (U(6) >= 1) shade(spl(TP([[-3.3, -2.05], [-3.08, -2.15], [-2.98, -2.45], [-3.2, -2.4]]), true), key + 'chs', { a: 0.45 });
  ctx.restore();
  FIG.u = prevU; FIG.mode = prevM;
  return { back: T(-0.75, -2.4), head: T(-3.4, -2.55) };
}
// =====================================================================
//  DEVI DURGA — tribhanga, ONE foot on the lion's back; eight arms in two symmetrical fans from the shoulders, each a
//  tapered curve ending in a hand (trident, bow, conch, lotus | chakra, sword, mace, blessing); a crown, long hair,
//  a sari whose folds are scribbled in terracotta (the only colour). (x, y) = the ground under her standing foot.
// =====================================================================
function durga(x, y, H, o = {}) {
  const key = o.key ?? 'dg', u0 = o.u ?? 1, prevU = FIG.u, prevM = FIG.mode; FIG.mode = 'ink'; FIG.u = u0;
  const T = (a, b) => [x + a * H, y + b * H], TP = (P) => P.map(([a, b]) => T(a, b)), U = (k) => stag(u0, k, 9, 0.35);
  const hd = [0.06, -6.8], fh = 0.95 * H;
  longHair(...T(hd[0], hd[1]), fh, 2.7, key + 'hair', { u: U(0), w: 0.72, n: 6 });
  // eight arms: two fans from the shoulders, angles from straight down; upper arms behind, drawn first
  const ARM = [[0, 0.24 * H], [0.25, 0.22 * H], [0.47, 0.15 * H], [0.62, 0.17 * H], [0.93, 0.1 * H], [1, 0.095 * H]];
  const fan = [[-1, 128, 'trident'], [1, 128, 'chakra'], [-1, 100, 'bow'], [1, 100, 'sword'], [-1, 72, 'conch'], [1, 72, 'mace'], [-1, 42, 'lotus'], [1, 42, 'bless']];
  const dir = (s, deg) => [s * Math.sin(deg * DEG), Math.cos(deg * DEG)];
  fan.forEach(([s, deg, what], i) => {
    const sh = s < 0 ? [-0.66, -5.82] : [0.56, -5.92], d1 = dir(s, deg - 18), d2 = dir(s, deg + 14), L = 1.02;
    const el = [sh[0] + d1[0] * L, sh[1] + d1[1] * L], wr = [el[0] + d2[0] * L * 1.0, el[1] + d2[1] * L * 1.0];
    const lb = limb(TP([sh, [lerp(sh[0], el[0], 0.5) + s * 0.04, lerp(sh[1], el[1], 0.5)], el, wr]), ARM);
    const uu = U(1 + Math.floor(i / 2) * 0.5);
    drawLimb(lb, uu, key + 'arm' + i, { creases: [0.5], hw: 0.4 });
    bandOn(lb, 0.24, U(7), key + 'kb' + i, { gem: true }); bandOn(lb, 0.88, U(7), key + 'bg' + i, { w: 0.05 }); bandOn(lb, 0.94, U(7), key + 'bh' + i, { w: 0.03 });
    const W = T(...wr), ha = Math.atan2(d2[1], d2[0]), hs = 0.62 * H, grip = [W[0] + Math.cos(ha) * hs * 0.4, W[1] + Math.sin(ha) * hs * 0.4];
    if (what === 'trident') WP.trident(grip[0], grip[1], -Math.PI / 2 - 0.08, 0.82 * H, key + 'tri', U(6));
    if (what === 'chakra') WP.chakra(grip[0], grip[1], -Math.PI / 2 + 0.2, 0.95 * H, key + 'chk', U(6));
    if (what === 'bow') WP.bow(grip[0], grip[1], -Math.PI / 2, 1.0 * H, key + 'bow', U(6));
    if (what === 'sword') WP.sword(grip[0], grip[1], -Math.PI / 2 + 0.35, 1.0 * H, key + 'swd', U(6));
    if (what === 'mace') WP.mace(grip[0], grip[1], -Math.PI / 2 + 0.25, 0.9 * H, key + 'mace', U(6));
    if (what === 'lotus') WP.lotusFlower(grip[0], grip[1], -Math.PI / 2 - 0.3, 0.8 * H, key + 'lot', U(6));
    if (what === 'conch') WP.conch(grip[0] - 0.25 * H, grip[1] - 0.12 * H, -0.3, 0.75 * H, key + 'cnc', U(6));
    hand(W[0], W[1], what === 'bless' ? -Math.PI / 2 + 0.25 : ha, hs, what === 'bless' ? 'open' : 'grip', s, key + 'h' + i, U(6));
  });
  // the standing leg's foot under the hem; the raised leg comes later (over the skirt)
  const fS = spl(TP([[0.5, -0.3], [0.44, -0.06], [0.58, 0.0], [1.12, 0.0], [1.22, -0.06], [1.04, -0.15], [0.74, -0.28]]), true); paperFill(fS, key + 'fs'); ln(fS, U(2), key + 'fs', { w: 2.8 });
  ln(loopPts(...T(0.62, -0.3), 0.16 * H, 0.05 * H, 0.1), U(7), key + 'ank', { w: 2 });
  // the skirt (sari) from the waist: over the raised thigh, falling straight on the standing side, pleats between
  const sk = spl(TP([[-0.5, -4.38], [-0.72, -3.95], [-0.95, -3.4], [-1.08, -3.02], [-1.0, -2.72], [-0.78, -2.62], [-0.5, -2.75], [-0.3, -2.1], [-0.1, -1.1], [0.0, -0.22], [0.42, -0.14], [0.86, -0.16], [1.05, -0.24], [0.92, -1.2], [0.78, -2.5], [0.7, -3.6], [0.6, -4.38], [0.05, -4.44]]), true);
  paperFill(sk, key + 'sk', clamp(U(3) * 3));
  scribbleFill(sk, NV.terra, { key: key + 'sks', gap: 13, w: 3.4, base: 0.22, part: seg(U(8), 0, 1), ang: -1.2 });
  const sh2 = Math.floor(sk.length * 0.5); ln(sk.slice(0, sh2), U(3), key + 'skL', { w: 3 }); ln(sk.slice(sh2), U(3), key + 'skR', { w: 4.4 });
  [[[0.05, -4.3], [0.15, -2.6], [0.3, -0.2]], [[0.25, -4.3], [0.4, -2.5], [0.55, -0.16]], [[0.42, -4.25], [0.6, -2.4], [0.78, -0.18]], [[-0.2, -4.2], [-0.4, -3.4], [-0.85, -2.85]], [[-0.1, -3.8], [-0.2, -2.5], [-0.12, -0.6]], [[-0.45, -3.6], [-0.75, -3.1], [-0.95, -2.8]]]
    .forEach((C, i) => { lnS(TP(C), U(4), key + 'pf' + i, { w: 1.7 }); if (U(4) >= 1) foldShade(TP(C), 0.07 * H, key + 'pfs' + i, { side: 1, a: 0.45 }); });
  lnS(TP([[0.0, -0.22], [0.15, -0.3], [0.3, -0.18], [0.45, -0.3], [0.6, -0.16], [0.78, -0.28], [0.95, -0.2]]), U(4), key + 'hem', { w: 2 });
  // the raised leg: the foot rests on the lion's back below the hanging cloth
  const fR = spl(TP([[-0.52, -2.66], [-0.6, -2.5], [-0.82, -2.42], [-1.1, -2.4], [-1.16, -2.46], [-0.98, -2.56], [-0.72, -2.68]]), true); paperFill(fR, key + 'fr'); ln(fR, U(4), key + 'fr', { w: 2.8 });
  ln(loopPts(...T(-0.62, -2.66), 0.13 * H, 0.04 * H, 0.1), U(7), key + 'ank2', { w: 2 });
  // the torso: slim, shoulders ~1.5 heads, a narrow waist, the hips swung toward the standing leg
  const torso = spl(TP([[-0.32, -6.24], [-0.66, -6.04], [-0.8, -5.78], [-0.72, -5.38], [-0.6, -5.0], [-0.46, -4.62], [-0.5, -4.3], [-0.55, -4.05], [0, -3.98], [0.66, -4.08], [0.56, -4.34], [0.42, -4.64], [0.5, -5.02], [0.6, -5.4], [0.66, -5.82], [0.54, -6.08], [0.22, -6.24], [-0.05, -6.15]]), true);
  paperFill(torso, key + 't', clamp(U(4) * 3)); const tq = Math.floor(torso.length / 2); ln(torso.slice(0, tq + 1), U(4), key + 'tL', { w: 2.8 }); ln(torso.slice(tq), U(4), key + 'tR', { w: 4 });
  if (U(4) >= 1) shade(spl(TP([[0.3, -6.1], [0.62, -5.8], [0.52, -5.1], [0.44, -4.6], [0.25, -4.6], [0.35, -5.3]]), true), key + 'tsh', { a: 0.4 });
  const blouse = spl(TP([[-0.74, -5.6], [-0.62, -5.05], [-0.3, -4.92], [0, -5.0], [0.3, -4.92], [0.5, -5.05], [0.62, -5.6], [0.3, -5.85], [0, -5.75], [-0.35, -5.85]]), true);
  scribbleFill(blouse, NV.terra, { key: key + 'bls', gap: 11, w: 3, base: 0.25, part: seg(U(8), 0, 1) }); ln(blouse, U(5), key + 'bl', { w: 2.6 });
  for (const s of [-1, 1]) lnS(TP([[s * 0.04, -5.72], [s * 0.3, -5.06], [s * 0.55, -5.15]]), U(5), key + 'bust' + s, { w: 1.6 });
  lnS(TP([[-0.04, -4.42], [0, -4.38], [0.05, -4.42]]), U(5), key + 'nav', { w: 1.8 });
  // the pallu: from the left hip up across the chest over the right shoulder, falling behind
  const pl = spl(TP([[-0.55, -4.3], [-0.3, -4.45], [0.1, -5.0], [0.45, -5.65], [0.62, -6.05], [0.75, -5.9], [0.7, -5.4], [0.42, -4.8], [0.0, -4.2], [-0.5, -4.08]]), true);
  paperFill(pl, key + 'pl'); scribbleFill(pl, NV.terra, { key: key + 'pls', gap: 12, w: 3.2, base: 0.25, part: seg(U(8), 0, 1), ang: 0.9 }); ln(pl, U(5), key + 'pl', { w: 3 });
  for (let i = 0; i < 3; i++) lnS(TP([[-0.4 + i * 0.12, -4.25], [0.1 + i * 0.1, -4.9], [0.5 + i * 0.05, -5.7]]), U(5), key + 'plf' + i, { w: 1.5 });
  // a jewelled belt
  lnS(TP([[-0.5, -4.36], [0.05, -4.3], [0.6, -4.38]]), U(7), key + 'belt', { w: 3 }); ln(loopPts(...T(0.05, -4.28), 0.08 * H, 0.06 * H, 0.1), U(7), key + 'bm', { w: 2.2 });
  // the neck, a necklace, the face (serene, a bindi), the crown
  const nk = spl(TP([[-0.2, -6.4], [-0.22, -6.18], [0.26, -6.18], [0.24, -6.4]]), true); paperFill(nk, key + 'nk'); ln(nk, U(5), key + 'nk', { w: 2.4 });
  necklace(...T(-0.02, -6.16), 0.9 * H, 0.38 * H, key + 'nl', { u: U(7) });
  necklace(...T(-0.02, -6.14), 0.62 * H, 0.18 * H, key + 'nl2', { broad: 0.3, u: U(7) });
  face(...T(hd[0], hd[1]), fh, { kind: 'durga', turn: 0.12, key: key + 'f', u: U(5), look: 0 });
  crown(...T(hd[0], hd[1] - 0.4), 0.86 * H, 0.66 * H, key + 'cr', { u: U(7) });
  FIG.u = prevU; FIG.mode = prevM;
  return { face: T(hd[0], hd[1]), centre: T(0, -4.6) };
}
// Durga with her lion: the lion stands just behind her, her left foot on its back. (x, y) = ground, H = head unit.
function durgaOnLion(x, y, H, o = {}) {
  const L = lion(x + 0.0 * H, y, H, { key: (o.key ?? 'dl') + 'L', u: o.u });
  durga(x + 0.15 * H, y, H, { key: (o.key ?? 'dl') + 'D', u: o.u });
  return L;
}
// =====================================================================
//  THE DEVAS — pencil only (no colour before beat 11 and they never take it): slender, ~7.5 heads, 1.5 heads at the
//  shoulders. kind 'shiva' (matted hair with a crescent, a trident, a snake), 'vishnu' (tall crown, four arms: chakra,
//  conch, mace, blessing), 'deva' (a crown, hands in anjali). (x, y) = ground between the feet.
// =====================================================================
function deva(x, y, H, o = {}) {
  const key = o.key ?? 'dv' + (o.kind ?? 'deva'), kind = o.kind ?? 'deva', u0 = o.u ?? 1, prevU = FIG.u, prevM = FIG.mode;
  FIG.mode = o.ink ? 'ink' : 'pencil'; FIG.u = u0;
  const T = (a, b) => [x + a * H, y + b * H], TP = (P) => P.map(([a, b]) => T(a, b)), U = (k) => stag(u0, k, 7, 0.35);
  const hd = [0, -6.85], fh = 0.84 * H;
  if (kind !== 'shiva') longHair(...T(hd[0], hd[1]), fh, 1.6, key + 'hair', { u: U(0), w: 0.6, n: 4 });
  const ARM = [[0, 0.25 * H], [0.25, 0.23 * H], [0.47, 0.15 * H], [0.62, 0.17 * H], [0.93, 0.1 * H], [1, 0.095 * H]];
  const arms = kind === 'vishnu'
    ? [{ J: [[-0.62, -5.85], [-1.3, -5.6], [-1.42, -6.5]], h: 'grip', w: 'conch', s: -1 }, { J: [[0.62, -5.85], [1.3, -5.6], [1.42, -6.5]], h: 'grip', w: 'chakra', s: 1 },
       { J: [[-0.66, -5.75], [-0.95, -4.6], [-1.15, -3.7]], h: 'grip', w: 'mace', s: -1 }, { J: [[0.66, -5.75], [0.95, -4.65], [0.7, -5.3]], h: 'open', w: null, s: 1 }]
    : kind === 'shiva'
      ? [{ J: [[-0.66, -5.75], [-0.95, -4.65], [-0.7, -5.3]], h: 'open', w: null, s: -1 }, { J: [[0.66, -5.75], [1.0, -4.7], [1.12, -3.9]], h: 'grip', w: 'trident', s: 1 }]
      : [{ J: [[-0.66, -5.75], [-0.8, -4.6], [-0.1, -4.95]], h: 'anjali', s: -1 }, { J: [[0.66, -5.75], [0.8, -4.6], [0.1, -4.95]], h: null, s: 1 }];
  const lbs = arms.map((A) => limb(TP(A.J), ARM));
  // legs and feet under a long dhoti
  for (const s of [-1, 1]) { const F = spl(TP([[s * 0.3, -0.3], [s * 0.24, -0.06], [s * 0.36, 0.0], [s * 0.82, 0.0], [s * 0.9, -0.08], [s * 0.7, -0.2], [s * 0.5, -0.3]]), true); paperFill(F, key + 'ft' + s); ln(F, U(1), key + 'ft' + s, { w: 2.6 }); }
  const dh = spl(TP([[-0.6, -4.1], [-0.76, -3.4], [-0.74, -2.2], [-0.66, -0.9], [-0.62, -0.3], [-0.3, -0.24], [0, -0.3], [0.3, -0.24], [0.62, -0.3], [0.66, -0.9], [0.74, -2.2], [0.76, -3.4], [0.6, -4.1], [0, -4.16]]), true);
  paperFill(dh, key + 'dh', clamp(U(1) * 3)); ln(dh, U(1), key + 'dh', { w: 3 });
  [[[-0.1, -4.0], [-0.05, -2.2], [0, -0.6]], [[-0.4, -3.9], [-0.55, -2.4], [-0.5, -0.3]], [[0.4, -3.9], [0.55, -2.4], [0.5, -0.3]], [[0.1, -3.4], [0.45, -2.9], [0.75, -2.6]]]
    .forEach((C, i) => { lnS(TP(C), U(2), key + 'df' + i, { w: 1.6 }); if (U(2) >= 1) foldShade(TP(C), 0.06 * H, key + 'dfs' + i, { side: 1, a: 0.4 }); });
  lbs.forEach((lb, i) => { if (arms[i].J[2][1] < -6) drawLimb(lb, U(2), key + 'a' + i, { creases: [0.5] }); });   // raised arms behind
  const torso = spl(TP([[-0.3, -6.22], [-0.62, -6.05], [-0.76, -5.8], [-0.72, -5.4], [-0.6, -5.0], [-0.5, -4.6], [-0.56, -4.2], [-0.6, -4.05], [0, -4.0], [0.6, -4.05], [0.56, -4.2], [0.5, -4.6], [0.6, -5.0], [0.72, -5.4], [0.76, -5.8], [0.62, -6.05], [0.3, -6.22], [0, -6.14]]), true);
  paperFill(torso, key + 't', clamp(U(3) * 3)); ln(torso, U(3), key + 't', { w: 3 });
  if (U(3) >= 1) shade(spl(TP([[0.35, -6.1], [0.72, -5.8], [0.58, -5.0], [0.5, -4.2], [0.3, -4.3], [0.4, -5.3]]), true), key + 'tsh', { a: 0.4 });
  // the uttariya across the shoulders, the sacred thread, a sash
  lnS(TP([[-0.72, -5.7], [-0.2, -5.3], [0.3, -4.7], [0.58, -4.2]]), U(3), key + 'thr', { w: 1.4 });
  const ut = spl(TP([[-0.76, -5.85], [-0.4, -5.6], [0, -5.5], [0.4, -5.6], [0.76, -5.85], [0.8, -5.55], [0.4, -5.3], [0, -5.24], [-0.4, -5.3], [-0.8, -5.55]]), true); paperFill(ut, key + 'ut'); ln(ut, U(3), key + 'ut', { w: 2.4 });
  lnS(TP([[-0.58, -4.15], [0, -4.08], [0.58, -4.15]]), U(3), key + 'sash', { w: 3 });
  lbs.forEach((lb, i) => { if (arms[i].J[2][1] >= -6) drawLimb(lb, U(4), key + 'a' + i, { creases: [0.5] }); bandOn(lb, 0.25, U(6), key + 'kb' + i, { gem: true }); bandOn(lb, 0.9, U(6), key + 'bg' + i, { w: 0.05 }); });
  arms.forEach((A, i) => {
    const W = T(...A.J[2]), E = T(...A.J[1]), ha = Math.atan2(W[1] - E[1], W[0] - E[0]), hs = 0.64 * H, grip = [W[0] + Math.cos(ha) * hs * 0.4, W[1] + Math.sin(ha) * hs * 0.4];
    if (A.w === 'trident') WP.trident(grip[0], grip[1], -Math.PI / 2, 2.1 * H, key + 'tri', U(5));
    if (A.w === 'chakra') WP.chakra(grip[0], grip[1], -Math.PI / 2, 1.0 * H, key + 'chk', U(5));
    if (A.w === 'conch') WP.conch(grip[0] - 0.2 * H, grip[1] - 0.15 * H, -0.4, 0.7 * H, key + 'cnc', U(5));
    if (A.w === 'mace') WP.mace(grip[0], grip[1], Math.PI / 2 - 0.05, 1.6 * H, key + 'mace', U(5));
    if (A.h === 'anjali') anjali(...T(0, -4.95), -Math.PI / 2, 0.66 * H, key + 'anj', U(5));
    else if (A.h) hand(W[0], W[1], A.h === 'open' ? -Math.PI / 2 : ha, hs, A.h, A.s, key + 'h' + i, U(5));
  });
  const nk = spl(TP([[-0.2, -6.42], [-0.22, -6.16], [0.22, -6.16], [0.2, -6.42]]), true); paperFill(nk, key + 'nk'); ln(nk, U(4), key + 'nk', { w: 2.2 });
  necklace(...T(0, -6.14), 0.9 * H, 0.32 * H, key + 'nl', { u: U(6) });
  face(...T(hd[0], hd[1]), fh, { kind: 'deva', eyes: o.eyes ?? 'down', turn: o.turn ?? 0, key: key + 'f', u: U(4), tilak: kind !== 'shiva' });
  if (kind === 'shiva') {
    // matted hair piled high (jata), a crescent moon tucked in it, a third-eye mark, a snake around the neck
    const jt = spl(TP([[-0.44, -7.16], [-0.4, -7.42], [-0.2, -7.62], [-0.3, -7.86], [-0.14, -8.06], [0.14, -8.06], [0.3, -7.86], [0.2, -7.62], [0.4, -7.42], [0.44, -7.16], [0, -7.22]]), true);
    paperFill(jt, key + 'jt'); ln(jt, U(5), key + 'jt', { w: 3 });
    for (let i = 0; i < 4; i++) lnS(TP([[-0.3 + i * 0.2, -7.2], [-0.26 + i * 0.17, -7.45], [-0.16 + i * 0.1, -7.65], [-0.2 + i * 0.13, -8.0]]), U(5), key + 'jl' + i, { w: 1.5 });
    lnS(TP([[-0.22, -7.6], [0, -7.66], [0.22, -7.6]]), U(5), key + 'tie', { w: 2.6 });
    for (const s of [-1, 1]) lnS(TP([[s * 0.42, -7.1], [s * 0.62, -6.6], [s * 0.7, -5.9], [s * 0.8, -5.4]]), U(5), key + 'lock' + s, { w: 2 });
    lnS(TP([[0.3, -7.9], [0.54, -7.78], [0.6, -7.5], [0.46, -7.64], [0.32, -7.74]]), U(6), key + 'moon', { w: 2.6, closed: true });
    lnS(TP([[-0.04, -7.1], [0, -7.02], [0.04, -7.1], [0, -7.18]]), U(6), key + 'eye3', { w: 2, closed: true });
    lnS(TP([[-0.4, -6.2], [-0.1, -5.95], [0.25, -6.0], [0.42, -6.22], [0.3, -6.38], [0.42, -6.5], [0.52, -6.4]]), U(6), key + 'snake', { w: 2.6 });
  } else crown(...T(hd[0], hd[1] - 0.34), (kind === 'vishnu' ? 0.88 : 0.76) * H, (kind === 'vishnu' ? 0.95 : 0.6) * H, key + 'cr', { u: U(6) });
  FIG.u = prevU; FIG.mode = prevM;
}
