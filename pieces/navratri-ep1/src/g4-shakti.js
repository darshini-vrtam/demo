// =====================================================================
//  GROUP 4 — beats 13–16: the lights merge (silence), THE ONE HARD CUT to Devi Durga on her lion (loudest hit),
//  nine rings, the first light to the mountains, the cliffhanger and the title. Eras: merge, durga, light, who.
//  Terracotta is Shakti: the goddess, her rays, the comet. Red marker: the SHAILAPUTRI underline only.
// =====================================================================
const G4 = { centre: [555, 760], ringR: 368, x: 600, y: 1290, H: 126 };   // ring arc x 172-938, clear of the lion's eye

// ---- group helpers
// a camera through keyframes [[t, CAM], ...]: eased between neighbours, held before the first and after the last
function g4Keys(t, K) {
  if (t <= K[0][0]) return K[0][1];
  for (let i = 0; i < K.length - 1; i++) if (t < K[i + 1][0]) return camMix(K[i][1], K[i + 1][1], EZ.io(seg(t, K[i][0], K[i + 1][0])));
  return K[K.length - 1][1];
}
// a decaying swing that starts at each time in ts (0 before the first)
function g4Swing(ts, amp, f = 7, damp = 2.4) {
  let v = 0;
  for (const t0 of ts) { const d = TT - t0; if (d >= 0 && d < 2.5) v += amp * Math.sin(d * f) * Math.exp(-d * damp); }
  return v;
}
// a blink: true for one boil step (2 frames x2) starting at each time in ts
const g4Blink = (ts) => ts.some((t0) => TT >= t0 && TT < t0 + 0.17);
// pencil the polyline P over u and put the pencil prop on its end while it is being drawn
function g4Pencil(P, u, key, o = {}) {
  if (u <= 0) return;
  gpencil(P, { key, part: u, ...o });
  if (u < 1) { const e = writeEnd(P, u); PEN = toScreen(e[0], e[1]); }
}

// ---- Durga on her lion, alive: breathing, the lion's tail flicks, slow blinks (both). Drawn like durgaOnLion
//      (same keys); the lion is drawn in two passes so the tail region can swing about its root.
function g4DurgaOnLion(x, y, H, key, life = {}) {
  ctx.save();
  const br = 1 + 0.006 * Math.sin(TT * 2.2);                       // a slow breath, from the ground up
  ctx.translate(x, y); ctx.scale(1, br); ctx.translate(-x, -y);
  const R = [x + 0.72 * H, y - 2.2 * H, 1.2 * H, 1.32 * H];          // the tail's box (behind Durga's skirt; nothing else of the lion there)
  ctx.save(); ctx.beginPath(); ctx.rect(-4000, -4000, 9000, 9000); ctx.rect(...R); ctx.clip('evenodd');
  lion(x, y, H, { key: key + 'L' }); ctx.restore();
  const fl = life.flick ?? 0, pv = [x + 0.72 * H, y - 1.88 * H];
  ctx.save(); ctx.translate(pv[0], pv[1]); ctx.rotate(fl); ctx.translate(-pv[0], -pv[1]);
  ctx.beginPath(); ctx.rect(...R); ctx.clip(); lion(x, y, H, { key: key + 'L' }); ctx.restore();
  if (fl !== 0 && Math.abs(fl) > 0.05) {                             // two graphite swish ticks beside the tuft
    const tx = x + 1.62 * H, ty = y - 1.85 * H, s = Math.sign(fl);
    for (let i = 0; i < 2; i++) gpencil(arcPts(tx - 0.12 * H, ty + s * 0.05 * H, 0.3 * H + i * 12, -0.6, 0.3, 6), { key: key + 'sw' + i, w: 2, a: 0.55, amp: 1 });
  }
  if (life.lionBlink) {                                              // the lion's eye (head drawn 1.35x about its neck)
    const ex = x - 3.8405 * H, ey = y - 3.034 * H;
    gfill(loopPts(ex, ey, 16, 10, 0, 0, 24), NV.paper, { off: [0, 0], key: key + 'lbk', amp: 0.3 });
    gline([[ex - 13, ey - 2], [ex, ey + 3], [ex + 13, ey - 1]], { w: 2.8, key: key + 'lbl', second: false, amp: 0.4, step: 5 });
  }
  durga(x + 0.15 * H, y, H, { key: key + 'D' });
  if (life.blink) {                                                  // her slow blink: lids lowered, serene
    const h = 0.95 * H, w = 0.68 * h, cx = x + 0.21 * H, cy = y - 6.8 * H, ey = cy - 0.06 * h;
    for (const s of [-1, 1]) {
      const ex = cx + (s * 0.22 + 0.0192 * (1 - 0.264)) * w, ee = 0.2 * w * (s < 0 ? 0.958 : 1);
      gfill(loopPts(ex, ey - 0.006 * h, ee * 0.66, 0.05 * h, 0, 0, 20), NV.paper, { off: [0, 0], key: key + 'bk' + s, amp: 0.2 });
      gline([[ex - ee * 0.55, ey], [ex, ey + 0.026 * h], [ex + ee * 0.55, ey]], { w: h * 0.022, key: key + 'bl' + s, second: false, amp: 0.3, step: 4 });
    }
  }
  ctx.restore();
}

// ---- era: Durga (the cut lands on a finished frame), then nine rings, one per beat, with tally ticks
const G4_RING_A = (i) => -Math.PI / 2 - Math.PI * 0.8 + i * (Math.PI * 1.6 / 8);
SCENES.durga = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  const [ox, oy] = G4.centre, rot = 0.035 * (TT - CUT);
  // terracotta rays all round, turning slowly (glow is lines); a halo ring behind her head with its own slow turn
  rayRing(ox, oy, 430, 488, 40, 1, { col: NV.terra, w: 4, key: 'dray', boil: 0.07, rot: -Math.PI / 2 + rot });
  const fx = G4.x + 0.15 * G4.H + 0.06 * G4.H, fy = G4.y - 6.8 * G4.H;
  rayRing(fx, fy, 128, 178, 20, 1, { col: NV.terra, w: 3.2, key: 'dhr', rot: -Math.PI / 2 + 0.15 - rot * 1.5 });
  dr(loopPts(fx, fy, 118, 118, 0.06), 1, 'dhalo', { w: 4, col: NV.terraD });
  // before the rings: the pencil lays a faint guide arc where they will sit ("...not be won in a single day")
  const r9 = G4.ringR * 1.04, a0 = G4_RING_A(0);
  g4Pencil(arcPts(ox, oy, r9, a0, G4_RING_A(8), 64), ev(cu.battle + 0.3, Math.max(0.8, cu.nine - 0.25 - cu.battle - 0.3)), 'rguide', { w: 2, a: 0.5, amp: 1.6 });
  // idle life: a breath, blinks, the lion's tail flicks
  const lionBlinks = [96.3 - 94.75 + CUT, cu.fearless + 0.35, cu.face + 0.6, cu.begin + 0.2].map((t) => q8(t));
  const herBlinks = [cu.goddess + 0.6, cu.durga + 0.9, cu.battle - 0.4].map((t) => q8(t));
  const flicks = [CUT + 3.6, cu.lion + 0.1, cu.face - 1.2, cu.battle + 1.1, cu.shakti + 0.2];
  g4DurgaOnLion(G4.x, G4.y, G4.H, 'dl13', { flick: g4Swing(flicks, 0.16), lionBlink: g4Blink(lionBlinks), blink: g4Blink(herBlinks) });
  // the nine rings: drawn on the circle around her, one per beat, with a tally in the margin
  cu.rings.forEach((t, i) => {
    const k = ev(t, 0.3); if (k <= 0) return;
    const a = G4_RING_A(i), x = ox + Math.cos(a) * r9, y = oy + Math.sin(a) * r9;
    gfill(loopPts(x, y, 30, 30, 0), NV.terra, { a: 0.25 * k, off: [3, 3], key: 'rgf' + i });
    gline(loopPts(x, y, 30, 30, 0.08), { w: 4.4, col: NV.terra, key: 'rg' + i, part: k });
    if (k < 1) { const e = writeEnd(loopPts(x, y, 30, 30, 0.08), k); PEN = toScreen(e[0], e[1]); }
    rayRing(x, y, 38, 52, 8, ev(t + 0.2, 0.3), { col: NV.terra, w: 2.4, key: 'rgr' + i, rot: -Math.PI / 2 + rot * 2 });
    // tally: four strokes and a cross-stroke, then four more
    const g = Math.floor(i / 5), j = i % 5, tx = 836 + g * 96 + j * 16;
    if (j < 4) gline([[tx, 1262], [tx + 4, 1300]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
    else gline([[tx - 70, 1294], [tx - 4, 1266]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
  });
  penDraw(0.85);
  if (TT < cu.rings[0] - 0.5) cap(['Devi Durga'], [0, 'Durga'], cu.durga - 0.2, cu.durga + 0.25);
  else cap(['nine nights', 'of Shakti'], [1, 'Shakti'], cu.nine - 0.2, cu.shakti + 0.1);
};
// ring 0 of the nine (the bridge into the comet): where it sits around Durga
const G4_RING0 = () => { const a = G4_RING_A(0); return [G4.centre[0] + Math.cos(a) * G4.ringR * 1.04, G4.centre[1] + Math.sin(a) * G4.ringR * 1.04]; };
CAMS.durga = (t) => {
  const cu = CUES, e = ERA_T[ERA.light];
  const wide = CAM0, near = camOf({ z: 1.05, p: [570, 1290], to: [550, 1300] });
  const lion = camOf({ z: 1.14, p: [330, 1290], to: [400, 1300] });           // lean toward the lion: "a lion, calm and fearless"
  const her = camOf({ z: 1.12, p: [620, 1290], to: [570, 1300] });            // up to her face: "she was the one"
  const c = g4Keys(t, [[CUT, wide], [cu.goddess, near], [cu.lion - 0.3, near], [cu.fearless + 0.4, lion], [cu.fearless + 0.9, lion],
    [cu.face - 0.6, her], [cu.face + 0.6, her], [cu.battle - 0.1, wide]]);
  return camMix(c, camOf({ z: 2.6, p: G4_RING0(), to: [540, 760] }), EZ.io(seg(t, e - 0.9, e - 0.3)));
};
BRIDGE_OUT.durga = () => { const [x, y] = G4_RING0(); return { P: ellipsePts(x, y, 30, 30, 0, 64), c: NV.terra }; };
BOARD.durga = [
  { t: CUT + 0.25, title: 'THE CUT: Devi Durga on her lion, terracotta rays', sound: 'LOUDEST hit in the pause, then a warm pad', next: 'nine rings, one per beat' },
  { t: CUES.rings[8] + 0.6, title: 'nine rings around her, tally ticks', sound: 'nine chimes, one per ring', next: 'one ring becomes a comet' },
];

// ---- era: the lights merge (beat 13a). The lights fly in and are taken up; one terracotta circle grows brighter and
//      brighter, then holds through the silence: from CUES.silence to the cut nothing new happens, only the boil.
const G4M = { c: [540, 800] };
SCENES.merge = function () {
  const cu = CUES, t0 = ERA_T[ERA.merge], tStill = Math.min(TT, cu.silence); PEN = null;
  sketchPage({ grid: 'dots' });
  const [cx, cy] = G4M.c;
  const r = 118 + 90 * EZ.o2(ev(cu.bright1 - 0.1, 0.5)) + 100 * EZ.o2(ev(cu.bright2 - 0.1, 0.5)) + 90 * EZ.o2(ev(cu.radiant - 0.1, 0.8));
  const lv = 1 + (TT > cu.bright1) + (TT > cu.bright2) + (TT > cu.radiant);
  // "the different lights came together": short terracotta strands fly in from all round and are taken into the circle
  for (let i = 0; i < 7; i++) {
    const ts = t0 + 0.7 + i * ((cu.merge - t0 - 1.2) / 7), k = seg(TT, ts, ts + 1.1);
    if (k <= 0 || k >= 1) continue;
    const a = -Math.PI / 2 + i * 2.39, d0 = lerp(440, r + 6, EZ.i2(k)), d1 = d0 + 150 * (1 - k * 0.7);
    gline([[cx + Math.cos(a) * d1, cy + Math.sin(a) * d1], [cx + Math.cos(a) * d0, cy + Math.sin(a) * d0]], { w: 6, col: NV.terra, key: 'min' + i, second: true, amp: 0.8, step: 8 });
  }
  // glow is lines: more rings of rays with each "brighter", turning slowly until the silence, then only boiling
  for (let k = 0; k < lv; k++) rayRing(cx, cy, r + 18 + k * 36, r + 46 + k * 40, 18 + k * 8, ev([t0, cu.bright1, cu.bright2, cu.radiant][k] - 0.1, 0.5),
    { col: NV.terra, w: 3.4 - k * 0.4, key: 'mr' + k, rot: -Math.PI / 2 + k * 0.13 + (k % 2 ? -1 : 1) * 0.04 * (tStill - t0) });
  const P = loopPts(cx, cy, r, r, 0.04);
  gfill(P, NV.terra, { off: [0, 0], key: 'mcore', a: 0.85 }); scribbleFill(P, NV.terraD, { key: 'mcs', gap: 11, w: 3.4, base: 0 });
  gline(P, { w: 5, col: NV.terraD, key: 'mrim' });
  cap(['one radiant light'], [0, 'radiant'], cu.bright2 - 0.2, cu.radiant + 0.1);
};
// a slow lean into the light while it grows; still in the silence
CAMS.merge = (t) => push(t, ERA_T[ERA.merge] + 0.7, CUES.silence - 0.2, { z: 1.08, p: G4M.c, to: [540, 790] });
BRIDGE_IN.merge = () => ({ P: ellipsePts(G4M.c[0], G4M.c[1], 118, 118, 0, 64), c: NV.terra });
BOARD.merge = [{ t: CUES.silence + 0.6, title: 'brighter, brighter: one radiant circle; then SILENCE', sound: 'the held silence (near -40 dB) before the cut', next: 'THE ONE HARD CUT to Durga' }];

// ---- era: the first light (beat 15). The pencil sketches the mountains and the dashed trail; then the terracotta comet
//      flies it ("far away... toward the mountains"); birds cross, margin stars twinkle.
const G4L = { from: [170, 380], peak: [700, 930] };
const G4L_PATH = () => spl([[G4L.from[0], G4L.from[1]], [380, 470], [560, 640], [660, 800], [G4L.peak[0], G4L.peak[1] - 30]]);
const G4L_RIDGE = () => spl([[60, 1290], [160, 1120], [250, 1180], [380, 1040], [470, 1120], [560, 1060], [G4L.peak[0], G4L.peak[1]], [820, 1080], [900, 1030], [1020, 1160], [1040, 1290]]);
function mountains(u, key) {
  g4Pencil(G4L_RIDGE(), seg(u, 0, 0.7), key + 'r', { w: 3, a: 0.85 });
  g4Pencil(spl([[100, 1290], [300, 1200], [520, 1240], [760, 1180], [1000, 1250]]), seg(u, 0.65, 1), key + 'r2', { w: 2.4, a: 0.6 });
  if (u >= 1) for (let i = 0; i < 4; i++) gpencil([[G4L.peak[0] + 10 + i * 18, G4L.peak[1] + 30 + i * 40], [G4L.peak[0] + 40 + i * 22, G4L.peak[1] + 100 + i * 40]], { key: key + 'h' + i, w: 2, a: 0.5 });
}
SCENES.light = function () {
  const cu = CUES, t0 = ERA_T[ERA.light]; PEN = null;
  sketchPage({ grid: 'dots' });
  mountains(ev(t0 + 0.65, 2.4), 'mt15');
  const stars = [[120, 300], [500, 380], [880, 300], [760, 560]];
  stars.forEach(([x, y], i) => { doodleStar(x, y, 16 + 5 * ((B + i) % 3 === 0), 'ms15' + i, { part: ev(t0 + 0.7 + i * 0.25, 0.4) }); sparkle(x + 22, y - 18, 22, ev(t0 + 2.4 + i * 1.6, 0.6), 'msk' + i, NV.graph); });
  // two graphite birds cross the sky, right to left, while the light gathers itself
  for (let i = 0; i < 2; i++) { const k = seg(TT, t0 + 1.6 + i * 0.5, t0 + 6.8 + i * 0.5); if (k > 0 && k < 1) doodleBird(lerp(1000, 80, k), 560 + i * 34 - 60 * Math.sin(k * 3), 0.9, (B + i) % 2, 'lb15' + i); }
  const path = G4L_PATH(), k = EZ.io(seg(TT, cu.firstLight - 0.2, cu.mountains + 0.3));
  // the trail ahead in dashed graphite (pencilled after the mountains), the comet head scribbled terracotta, its tail in lines
  ctx.save(); ctx.setLineDash([14, 14]); g4Pencil(path, ev(t0 + 3.0, Math.max(0.8, cu.firstLight - 0.5 - t0 - 3.0)), 'trail15', { w: 2.6, a: 0.75, passes: 1 }); ctx.restore();
  const RP = resample(path, false, 6), head = pointAt(RP, Math.max(0.001, k)), back = pointAt(RP, Math.max(0.001, k - 0.12));
  if (k > 0.02) for (let i = 0; i < 5; i++) { const off = (i - 2) * 7; gline([[back[0] + off, back[1] - off * 0.6], [lerp(back[0], head[0], 0.5) + off * 0.6, lerp(back[1], head[1], 0.5) - off * 0.4], head], { w: 3.4 - Math.abs(i - 2) * 0.6, col: NV.terra, key: 'tail' + i, second: false, amp: 1 }); }
  const pr = 30 + 3 * (B % 4 === 0);   // the light breathes on the beat while it waits
  const P = loopPts(head[0], head[1], pr, pr, 0.04); gfill(P, NV.terra, { off: [0, 0], key: 'comet' }); scribbleFill(P, NV.terraD, { key: 'comets', gap: 8, w: 2.6, base: 0 });
  rayRing(head[0], head[1], 40, 62, 10, 1, { col: NV.terra, w: 2.6, key: 'cray', rot: -Math.PI / 2 + 0.3 * TT });
  penDraw(0.85);
  cap(['toward the mountains'], [0, 'mountains'], cu.mountains - 0.6, cu.mountains + 0.1);
};
CAMS.light = (t) => push(t, ERA_T[ERA.who] - 1.25, ERA_T[ERA.who] - 0.6, { z: 2.2, p: [G4L.peak[0], G4L.peak[1] - 30], to: [540, 820] });
BRIDGE_IN.light = () => ({ P: ellipsePts(G4L.from[0], G4L.from[1], 30, 30, 0, 64), c: NV.terra });
BRIDGE_OUT.light = () => ({ P: ellipsePts(G4L.peak[0], G4L.peak[1] - 30, 46, 46, 0, 64), c: NV.terra });
BOARD.light = [{ t: CUES.mountains + 0.3, title: 'the first light flies toward the mountains', sound: 'goodbye: warm pad decaying', next: 'the glow becomes the peak' }];

// ---- era: who was waiting? (beat 16). The peak in ink, a trident silhouette in pencil, a terracotta glow; then the camera
//      pulls back: it is the opening page, changed (one terracotta peak). Then the title card, and DING.
const G4W = { peak: [760, 960, 300] };   // base centre x, base y, height (in the opening page's middle band)
function shailaPeak(key) {
  const [px, by, h] = G4W.peak, top = [px, by - h];
  // the terracotta glow behind: rays only, turning slowly; a second, shorter ring answers "waiting"
  rayRing(top[0], top[1] + 20, 40, 120, 22, 1, { col: NV.terra, w: 1.6, key: key + 'gl', rot: -Math.PI + 0.02 * TT, L: 0.2 });
  rayRing(top[0], top[1] + 20, 34, 70, 22, ev(CUES.waiting + 0.2, 0.9), { col: NV.terra, w: 1.3, key: key + 'g2', rot: -Math.PI + Math.PI / 22 - 0.03 * TT, L: 0.2 });
  const M = spl([[px - 190, by], [px - 120, by - h * 0.45], [px - 40, by - h * 0.85], top, [px + 50, by - h * 0.8], [px + 130, by - h * 0.4], [px + 200, by]]);
  gfill([...M, [px + 200, by + 4], [px - 190, by + 4]], NV.paper, { off: [0, 0], key: key + 'pf' });
  gline(M, { w: 2.2, key: key + 'po', amp: 0.6 });
  ctx.save(); trace([...M, [px - 190, by]], false); ctx.clip(); ghatch(px, by - h, px + 200, by, { gap: 4, a: 0.5, w: 1, key: key + 'ph' }); ctx.restore();
  gpencil([[px - 40, by - h * 0.85], [px - 20, by - h * 0.6], [px - 60, by - h * 0.3]], { key: key + 'cr', w: 1.2, a: 0.7 });
  // the silhouette on the summit: a standing figure with a trident, pencil only
  const s = 0.11, fx = top[0] - 4, fy = top[1] + 2;
  const sil = spl([[fx - 3, fy], [fx - 4, fy - 20 * s * 10], [fx - 7, fy - 34 * s * 10], [fx - 5, fy - 44 * s * 10], [fx, fy - 50 * s * 10], [fx + 5, fy - 44 * s * 10], [fx + 7, fy - 34 * s * 10], [fx + 4, fy - 20 * s * 10], [fx + 3, fy]], true);
  gfill(sil, NV.graph, { off: [0, 0], key: key + 'sf', a: 0.55 }); gpencil(sil, { key: key + 'so', w: 1.1, a: 0.9 });
  gpencil([[fx + 9, fy + 2], [fx + 9, fy - 70]], { key: key + 'ts', w: 1.1, a: 0.95, passes: 1 });
  gpencil(spl([[fx + 3, fy - 62], [fx + 4, fy - 70], [fx + 9, fy - 64], [fx + 14, fy - 70], [fx + 15, fy - 62]]), { key: key + 'tt', w: 1.1, a: 0.95, passes: 1 });
  gpencil([[fx + 9, fy - 64], [fx + 9, fy - 76]], { key: key + 'tm', w: 1.1, a: 0.95, passes: 1 });
  for (let i = 0; i < 2; i++) doodleBird(top[0] - 70 + 30 * Math.sin(TT * 0.6 + i), top[1] - 40 + i * 10, 0.35, (B + i) % 2, key + 'b' + i);
  // wind on the summit: three short graphite strokes drifting past, on a loop
  for (let i = 0; i < 3; i++) { const k = ((TT * 0.35 + i / 3) % 1); const wx = top[0] + 70 - 170 * k, wy = top[1] - 24 + i * 22; gpencil(spl([[wx, wy], [wx - 14, wy - 3], [wx - 30, wy + 1]]), { key: key + 'w' + i, w: 1, a: 0.5 * Math.sin(Math.PI * k), passes: 1 }); }
  doodleStar(top[0] + 110, top[1] - 90, 7 + 2 * ((B % 3) === 0), key + 'st', { w: 1.2 });
}
SCENES.who = function () {
  const cu = CUES; PEN = null;
  worldsPage(true, ev(VL('b16b_first').t0, 1.6));
  shailaPeak('pk16');
  // the title card, taped over the bottom band: it drops onto the page, then the tape
  const tc = ev(cu.title, 0.5);
  if (tc > 0) {
    ctx.save(); ctx.globalAlpha = clamp(tc * 2); ctx.translate(0, -50 * (1 - EZ.o2(tc)));
    const C = sketchBox(130, 990, 820, 300, 10, 0); gfill(C, SK.sheet, { off: [6, 6], key: 'card16' }); gline(sketchBox(130, 990, 820, 300, 10), { w: 3.6, key: 'card16o' });
    ctx.restore();
    if (tc >= 1) { tapeStrip(260, 990, 130, -0.08, 'tp16a', 36); }
    if (ev(cu.title + 0.6, 0.1) >= 1) tapeStrip(820, 990, 130, 0.07, 'tp16b', 36);
    handLetter('the first power of Shakti', 540, 1052, 38, { col: NV.graph, reveal: ev(cu.title + 0.1, 0.6), key: 'fp16' });
    const [x0, x1] = handLetter('SHAILAPUTRI', 540, 1148, 92, { face: 'marker', reveal: ev(cu.title + 0.4, 0.9), key: 'sh16' });
    underline(x0, x1, 1172, { col: NV.red, w: 6, key: 'sh16u', part: ev(cu.title + 1.3, 0.35) });
    // a pencilled bell, swinging on DING
    const sw = 0.25 * Math.sin((TT - cu.ding) * 9) * Math.exp(-Math.max(0, TT - cu.ding) * 1.6) * (TT > cu.ding);
    ctx.save(); ctx.translate(330, 1196); ctx.rotate(sw);
    const bell = spl([[-30, 62], [-26, 30], [-22, 8], [-12, -4], [0, -8], [12, -4], [22, 8], [26, 30], [30, 62]]);
    g4Pencil(bell, ev(cu.title + 0.8, 0.6), 'bell', { w: 2.8, a: 0.95 }); g4Pencil([[-34, 62], [34, 62]], ev(cu.title + 1.4, 0.2), 'bellb', { w: 2.8 });
    g4Pencil(loopPts(0, -14, 6, 6, 0.1), ev(cu.title + 1.6, 0.3), 'bellt', { w: 2.4 }); g4Pencil(loopPts(0, 70, 7, 7, 0.1), ev(cu.title + 1.9, 0.3), 'bellc', { w: 2.4 });
    ctx.restore();
    if (TT > cu.ding) for (let i = 0; i < 3; i++) gline([[392 + i * 4, 1218 - i * 18], [420 + i * 10, 1212 - i * 26]], { w: 3, key: 'dl' + i, part: ev(cu.ding, 0.15), second: false });
    handLetter('DING.', 470, 1262, 72, { face: 'marker', align: 'left', reveal: ev(cu.ding, 0.25), key: 'ding16' });
    penDraw(0.7);
  }
  if (TT < cu.title) cap(['who was waiting?'], [0, 'waiting'], cu.who - 0.3, cu.waiting + 0.1);
  else cap(['next: Shailaputri'], [0, 'Shailaputri'], cu.title + 1.6, cu.title + 2.0);
};
CAMS.who = (t) => {
  const [px, by, h] = G4W.peak, L = VL('b16b_first');
  const creep = EZ.io(seg(t, CUES.waiting + 0.5, L.t0 - 0.1));            // a slow creep in on the summit while the question hangs
  const close = camOf({ z: 3.0 + 0.18 * creep, p: [px, by - h * (0.62 + 0.12 * creep)], to: [540, 820] });
  return camMix(close, CAM0, EZ.io(seg(t, L.t0 - 0.1, L.t1 + 0.1)));
};
BRIDGE_IN.who = () => { const [px, by, h] = G4W.peak; return { P: [[px - 190, by], [px - 40, by - h * 0.85], [px, by - h], [px + 50, by - h * 0.8], [px + 200, by], [px, by + 6]], c: NV.ink }; };
BOARD.who = [
  { t: CUES.waiting + 0.6, title: 'who was waiting? the peak, a trident silhouette, terracotta glow', sound: 'held hush', next: 'pull back: the opening page, changed' },
  { t: CUES.ding + 0.6, title: 'the three worlds with one terracotta peak; SHAILAPUTRI; DING.', sound: 'one soft bell on DING', next: 'end' },
];
