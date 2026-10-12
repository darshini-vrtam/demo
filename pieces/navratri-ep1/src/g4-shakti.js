// =====================================================================
//  GROUP 4 — beats 13–16: the lights merge (silence), THE ONE HARD CUT to Devi Durga on her lion (loudest hit),
//  nine rings, the first light to the mountains, the cliffhanger and the title. Eras: merge, durga, light, who.
//  Terracotta is Shakti: the goddess, her rays, the comet. Red marker: the SHAILAPUTRI underline only.
// =====================================================================
const G4 = { centre: [570, 770], ringR: 440, x: 600, y: 1290, H: 126 };

// ---- era: Durga (the cut lands on a finished frame), then nine rings, one per beat, with tally ticks
SCENES.durga = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  const [ox, oy] = G4.centre;
  // terracotta rays all round, boiling (glow is lines); a halo ring behind her head
  rayRing(ox, oy, 430, 488, 40, 1, { col: NV.terra, w: 4, key: 'dray', boil: 0.07 });
  const fx = G4.x + 0.15 * G4.H + 0.06 * G4.H, fy = G4.y - 6.8 * G4.H;
  rayRing(fx, fy, 128, 178, 20, 1, { col: NV.terra, w: 3.2, key: 'dhr', rot: -Math.PI / 2 + 0.15 });
  dr(loopPts(fx, fy, 118, 118, 0.06), 1, 'dhalo', { w: 4, col: NV.terraD });
  durgaOnLion(G4.x, G4.y, G4.H, { key: 'dl13' });
  // the nine rings: drawn on the circle around her, one per beat, with a tally in the margin
  cu.rings.forEach((t, i) => {
    const k = ev(t, 0.3); if (k <= 0) return;
    const a = -Math.PI / 2 - Math.PI * 0.8 + i * (Math.PI * 1.6 / 8), x = ox + Math.cos(a) * G4.ringR * 1.04, y = oy + Math.sin(a) * G4.ringR * 1.04;
    gfill(loopPts(x, y, 30, 30, 0), NV.terra, { a: 0.25 * k, off: [3, 3], key: 'rgf' + i });
    gline(loopPts(x, y, 30, 30, 0.08), { w: 4.4, col: NV.terra, key: 'rg' + i, part: k });
    rayRing(x, y, 38, 52, 8, ev(t + 0.2, 0.3), { col: NV.terra, w: 2.4, key: 'rgr' + i });
    // tally: four strokes and a cross-stroke, then four more
    const g = Math.floor(i / 5), j = i % 5, tx = 836 + g * 96 + j * 16;
    if (j < 4) gline([[tx, 1262], [tx + 4, 1300]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
    else gline([[tx - 70, 1294], [tx - 4, 1266]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
  });
  // after "Durga": her name lettered once, small, under the lion (ink)
  if (TT < cu.rings[0] - 0.5) cap(['Devi Durga'], [0, 'Durga'], cu.durga - 0.2, cu.durga + 0.25);
  else cap(['nine nights', 'of Shakti'], [1, 'Shakti'], cu.nine - 0.2, cu.shakti + 0.1);
};
CAMS.durga = (t) => {
  const cu = CUES;
  const pin = push(t, CUT, cu.goddess - 0.3, { z: 1.0, p: [540, 800], to: [540, 800] });
  const lean = EZ.io(seg(t, cu.lion, cu.face + 0.5)) * (1 - EZ.io(seg(t, cu.battle - 0.6, cu.nine - 0.1)));
  const c = camMix(CAM0, camOf({ z: 1.25, p: [560, 760], to: [540, 820] }), lean);
  void pin; return c;
};
BOARD.durga = [
  { t: CUT + 0.25, title: 'THE CUT: Devi Durga on her lion, terracotta rays', sound: 'LOUDEST hit in the pause, then a warm pad', next: 'nine rings, one per beat' },
  { t: CUES.rings[8] + 0.6, title: 'nine rings around her, tally ticks', sound: 'nine chimes, one per ring', next: 'one ring becomes a comet' },
];

// ring 0 of the nine (the bridge into the comet): where it sits around Durga
const G4_RING0 = () => { const a = -Math.PI / 2 - Math.PI * 0.8; return [G4.centre[0] + Math.cos(a) * G4.ringR * 1.04, G4.centre[1] + Math.sin(a) * G4.ringR * 1.04]; };
CAMS.durga = ((lean) => (t) => { const c = lean(t), e = ERA_T[ERA.light]; return camMix(c, camOf({ z: 2.6, p: G4_RING0(), to: [540, 760] }), EZ.io(seg(t, e - 0.9, e - 0.3))); })(CAMS.durga);
BRIDGE_OUT.durga = () => { const [x, y] = G4_RING0(); return { P: ellipsePts(x, y, 30, 30, 0, 64), c: NV.terra }; };

// ---- era: the lights merge (beat 13a). One terracotta circle grows brighter and brighter, then holds through the silence.
const G4M = { c: [540, 800] };
SCENES.merge = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  const [cx, cy] = G4M.c;
  const r = 118 + 90 * EZ.o2(ev(cu.bright1 - 0.1, 0.5)) + 100 * EZ.o2(ev(cu.bright2 - 0.1, 0.5)) + 90 * EZ.o2(ev(cu.radiant - 0.1, 0.8));
  const lv = 1 + (TT > cu.bright1) + (TT > cu.bright2) + (TT > cu.radiant);
  // glow is lines: more rings of rays with each "brighter"
  for (let k = 0; k < lv; k++) rayRing(cx, cy, r + 18 + k * 36, r + 46 + k * 40, 18 + k * 8, ev([ERA_T[ERA.merge], cu.bright1, cu.bright2, cu.radiant][k] - 0.1, 0.5), { col: NV.terra, w: 3.4 - k * 0.4, key: 'mr' + k, rot: -Math.PI / 2 + k * 0.13 });
  const P = loopPts(cx, cy, r, r, 0.04);
  gfill(P, NV.terra, { off: [0, 0], key: 'mcore', a: 0.85 }); scribbleFill(P, NV.terraD, { key: 'mcs', gap: 11, w: 3.4, base: 0 });
  gline(P, { w: 5, col: NV.terraD, key: 'mrim' });
  cap(['one radiant light'], [0, 'radiant'], cu.bright2 - 0.2, cu.radiant + 0.1);
};
BRIDGE_IN.merge = () => ({ P: ellipsePts(G4M.c[0], G4M.c[1], 118, 118, 0, 64), c: NV.terra });
BOARD.merge = [{ t: CUES.silence + 0.6, title: 'brighter, brighter: one radiant circle; then SILENCE', sound: 'the held silence (near -40 dB) before the cut', next: 'THE ONE HARD CUT to Durga' }];

// ---- era: the first light (beat 15). One terracotta comet on a dashed graphite trail toward pencilled mountains.
const G4L = { from: [170, 380], peak: [700, 930] };
const G4L_PATH = () => spl([[G4L.from[0], G4L.from[1]], [380, 470], [560, 640], [660, 800], [G4L.peak[0], G4L.peak[1] - 30]]);
function mountains(u, key) {
  const R = [[60, 1290], [160, 1120], [250, 1180], [380, 1040], [470, 1120], [560, 1060], [G4L.peak[0], G4L.peak[1]], [820, 1080], [900, 1030], [1020, 1160], [1040, 1290]];
  gpencil(spl(R), { key: key + 'r', part: u, w: 3, a: 0.85 });
  gpencil(spl([[100, 1290], [300, 1200], [520, 1240], [760, 1180], [1000, 1250]]), { key: key + 'r2', part: u, w: 2.4, a: 0.6 });
  if (u >= 1) for (let i = 0; i < 4; i++) gpencil([[G4L.peak[0] + 10 + i * 18, G4L.peak[1] + 30 + i * 40], [G4L.peak[0] + 40 + i * 22, G4L.peak[1] + 100 + i * 40]], { key: key + 'h' + i, w: 2, a: 0.5 });
}
SCENES.light = function () {
  const cu = CUES, t0 = ERA_T[ERA.light], t1 = ERA_T[ERA.who]; PEN = null;
  sketchPage({ grid: 'dots' });
  mountains(ev(t0 + 0.2, 1.2), 'mt15');
  for (let i = 0; i < 3; i++) doodleStar(120 + i * 380, 300 + (i % 2) * 80, 16 + 5 * ((B + i) % 3 === 0), 'ms15' + i);
  const path = G4L_PATH(), k = EZ.io(seg(TT, cu.firstLight - 0.2, cu.mountains + 0.6));
  // the trail ahead in dashed graphite, the comet head scribbled terracotta, the tail in terracotta lines behind it
  ctx.save(); ctx.setLineDash([14, 14]); gpencil(path, { key: 'trail15', part: ev(t0 + 0.3, 0.9), w: 2.6, a: 0.75, passes: 1 }); ctx.restore();
  const head = pointAt(resample(path, false, 6), Math.max(0.001, k)), back = pointAt(resample(path, false, 6), Math.max(0.001, k - 0.12));
  for (let i = 0; i < 5; i++) { const off = (i - 2) * 7; gline([[back[0] + off, back[1] - off * 0.6], [lerp(back[0], head[0], 0.5) + off * 0.6, lerp(back[1], head[1], 0.5) - off * 0.4], head], { w: 3.4 - Math.abs(i - 2) * 0.6, col: NV.terra, key: 'tail' + i, second: false, amp: 1 }); }
  const P = loopPts(head[0], head[1], 30, 30, 0.04); gfill(P, NV.terra, { off: [0, 0], key: 'comet' }); scribbleFill(P, NV.terraD, { key: 'comets', gap: 8, w: 2.6, base: 0 });
  rayRing(head[0], head[1], 40, 62, 10, 1, { col: NV.terra, w: 2.6, key: 'cray' });
  cap(['toward the mountains'], [0, 'mountains'], cu.mountains - 0.6, cu.mountains + 0.1);
};
CAMS.light = (t) => push(t, ERA_T[ERA.who] - 1.0, ERA_T[ERA.who] - 0.3, { z: 2.2, p: [G4L.peak[0], G4L.peak[1] - 30], to: [540, 820] });
BRIDGE_IN.light = () => ({ P: ellipsePts(G4L.from[0], G4L.from[1], 30, 30, 0, 64), c: NV.terra });
BRIDGE_OUT.light = () => ({ P: ellipsePts(G4L.peak[0], G4L.peak[1] - 30, 46, 46, 0, 64), c: NV.terra });
BOARD.light = [{ t: CUES.mountains + 0.3, title: 'the first light flies toward the mountains', sound: 'goodbye: warm pad decaying', next: 'the glow becomes the peak' }];

// ---- era: who was waiting? (beat 16). The peak in ink, a trident silhouette in pencil, a terracotta glow; then the camera
//      pulls back: it is the opening page, changed (one terracotta peak). Then the title card, and DING.
const G4W = { peak: [760, 960, 300] };   // base centre x, base y, height (in the opening page's middle band)
function shailaPeak(key) {
  const [px, by, h] = G4W.peak, top = [px, by - h];
  // the terracotta glow behind: rays only
  rayRing(top[0], top[1] + 20, 40, 120, 22, 1, { col: NV.terra, w: 1.6, key: key + 'gl', rot: -Math.PI, L: 0.2 });
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
}
SCENES.who = function () {
  const cu = CUES; PEN = null;
  worldsPage(true, ev(VL('b16b_first').t0, 1.6));
  shailaPeak('pk16');
  // the title card, taped over the bottom band
  const tc = ev(cu.title, 0.5);
  if (tc > 0) {
    ctx.save(); ctx.globalAlpha = clamp(tc * 2);
    const C = sketchBox(130, 990, 820, 300, 10, 0); gfill(C, SK.sheet, { off: [6, 6], key: 'card16' }); gline(sketchBox(130, 990, 820, 300, 10), { w: 3.6, key: 'card16o' });
    tapeStrip(260, 990, 130, -0.08, 'tp16a', 36); tapeStrip(820, 990, 130, 0.07, 'tp16b', 36);
    ctx.restore();
    handLetter('the first power of Shakti', 540, 1052, 38, { col: NV.graph, reveal: ev(cu.title + 0.1, 0.6), key: 'fp16' });
    const [x0, x1] = handLetter('SHAILAPUTRI', 540, 1148, 92, { face: 'marker', reveal: ev(cu.title + 0.4, 0.9), key: 'sh16' });
    underline(x0, x1, 1172, { col: NV.red, w: 6, key: 'sh16u', part: ev(cu.title + 1.3, 0.35) });
    // a pencilled bell, swinging on DING
    const sw = 0.25 * Math.sin((TT - cu.ding) * 9) * Math.exp(-Math.max(0, TT - cu.ding) * 2) * (TT > cu.ding);
    ctx.save(); ctx.translate(330, 1196); ctx.rotate(sw);
    const bell = spl([[-30, 62], [-26, 30], [-22, 8], [-12, -4], [0, -8], [12, -4], [22, 8], [26, 30], [30, 62]]);
    gpencil(bell, { key: 'bell', part: ev(cu.title + 0.8, 0.6), w: 2.8, a: 0.95 }); gpencil([[-34, 62], [34, 62]], { key: 'bellb', part: ev(cu.title + 1.2, 0.2), w: 2.8 });
    gpencil(loopPts(0, -14, 6, 6, 0.1), { key: 'bellt', part: ev(cu.title + 1.2, 0.3), w: 2.4 }); gpencil(loopPts(0, 70, 7, 7, 0.1), { key: 'bellc', part: ev(cu.title + 1.3, 0.3), w: 2.4 });
    ctx.restore();
    if (TT > cu.ding) for (let i = 0; i < 3; i++) gline([[392 + i * 4, 1218 - i * 18], [420 + i * 10, 1212 - i * 26]], { w: 3, key: 'dl' + i, part: ev(cu.ding, 0.15), second: false });
    handLetter('DING.', 470, 1262, 72, { face: 'marker', align: 'left', reveal: ev(cu.ding, 0.25), key: 'ding16' });
  }
  if (TT < cu.title) cap(['who was waiting?'], [0, 'waiting'], cu.who - 0.3, cu.waiting + 0.1);
  else cap(['next: Shailaputri'], [0, 'Shailaputri'], cu.title + 1.6, cu.title + 2.0);
};
CAMS.who = (t) => { const [px, by, h] = G4W.peak, close = camOf({ z: 3.0, p: [px, by - h * 0.62], to: [540, 820] }); return camMix(close, CAM0, EZ.io(seg(t, VL('b16b_first').t0 - 0.1, VL('b16b_first').t1 + 0.1))); };
BRIDGE_IN.who = () => { const [px, by, h] = G4W.peak; return { P: [[px - 190, by], [px - 40, by - h * 0.85], [px, by - h], [px + 50, by - h * 0.8], [px + 200, by], [px, by + 6]], c: NV.ink }; };
BOARD.who = [
  { t: CUES.waiting + 0.6, title: 'who was waiting? the peak, a trident silhouette, terracotta glow', sound: 'held hush', next: 'pull back: the opening page, changed' },
  { t: CUES.ding + 0.6, title: 'the three worlds with one terracotta peak; SHAILAPUTRI; DING.', sound: 'one soft bell on DING', next: 'end' },
];
