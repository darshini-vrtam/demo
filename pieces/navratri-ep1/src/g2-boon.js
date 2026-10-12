// =====================================================================
//  GROUP 2 — beats 5–8: he did not stop, Brahma appears, the boon, pride. Eras: stop, brahma, boon, pride.
//  Brahma is ink only (no colour). Red marker: the BOON stamp (beat 7) is the scene's one red.
// =====================================================================
const G2 = { halo: [540, 560, 118], palm: [742, 700] };

// Mahishasura from behind, seated (a small back view at the foot of the page)
function mahishaBack(x, y, s, u, key = 'mhb') {
  const N = 4, D = (P, k, kk, o = {}) => dr(P, stag(u, k, N), key + kk, { w: 4, ...o });
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const base = [[-200, 0], [-150, -60], [-90, -80], [90, -80], [150, -60], [200, 0], [0, 12]];
  const back = [[-90, -80], [-110, -250], [-70, -300], [70, -300], [110, -250], [90, -80]];
  if (u > 0.3) { gfill(base, NV.paper, { off: [0, 0], key: key + 'bf' }); gfill(back, NV.paper, { off: [0, 0], key: key + 'kf' }); }
  D(base, 0, 'base', { closed: true }); D(back, 1, 'back');
  D(loopPts(0, -350, 52, 58, 0.05), 2, 'head');
  const CP = crownPts(0, -400, 100, 80); if (u > 0.5) gfill(CP, NV.paper, { off: [0, 0], key: key + 'cf' }); D(CP, 3, 'crown');
  if (u >= 1) {
    ctx.save(); gclip(back); ghatch(-120, -310, 120, -80, { ang: -0.9, gap: 8, col: NV.graph, w: 2, a: 0.45, key: key + 'h' }); ctx.restore();
    for (let i = 0; i < 7; i++) gpencil([[-40 + i * 13, -330], [-46 + i * 15, -250], [-50 + i * 16, -190]], { key: key + 'hr' + i, w: 2.2, a: 0.7 });
  }
  ctx.restore();
}
// a lotus seat: a row of pointed petals, a second row behind
function lotusSeat(cx, y, w, u, key) {
  const n = 7, out = [];
  for (let r = 0; r < 2; r++) for (let i = 0; i < n - r; i++) {
    const x = cx - w / 2 + (i + 0.5 + r * 0.5) * (w / n), h = (r ? 70 : 92) * (1 - 0.25 * Math.abs(i - (n - 1) / 2) / n), yy = y - r * 26;
    const P = [[x - w / n * 0.55, yy], [x - w / n * 0.4, yy - h * 0.6], [x, yy - h], [x + w / n * 0.4, yy - h * 0.6], [x + w / n * 0.55, yy]];
    if (u > 0.3) gfill(P, NV.paper, { off: [0, 0], key: key + 'f' + r + i });
    dr(P, stag(u, r ? 0 : 1, 2), key + r + i, { w: 3.6 });
    if (u >= 1) gpencil([[x, yy - 8], [x, yy - h * 0.7]], { key: key + 'v' + r + i, w: 1.8, a: 0.5 });
    out.push(P);
  }
  dr([[cx - w * 0.56, y + 4], [cx + w * 0.56, y + 4]], u, key + 'base', { w: 4 });
}
// Brahma, four-faced (three shown), four arms, seated on a lotus. Ink only.
function brahma(cx, cy, s, u, key = 'br') {
  const N = 8, D = (P, k, kk, o = {}) => dr(P, stag(u, k, N), key + kk, { w: 4.2, ...o });
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
  // legs crossed, the dhoti
  const legs = [[-90, 250], [-210, 330], [-230, 380], [-60, 400], [60, 400], [230, 380], [210, 330], [90, 250]];
  if (u > 0.2) gfill(legs, NV.paper, { off: [0, 0], key: key + 'lf' });
  D(legs, 2, 'legs', { closed: true });
  D([[-160, 360], [-20, 340], [90, 384]], 3, 'fold1', { w: 2.8, second: false }); D([[160, 360], [30, 345], [-80, 388]], 3, 'fold2', { w: 2.8, second: false });
  // torso, sacred thread, necklace
  const torso = [[-112, 0], [-100, 120], [-88, 250], [88, 250], [100, 120], [112, 0], [40, -24], [-40, -24]];
  if (u > 0.1) gfill(torso, NV.paper, { off: [0, 0], key: key + 'tf' });
  D(torso, 1, 'torso', { closed: true });
  D([[-70, -10], [20, 120], [80, 250]], 3, 'thread', { w: 2.4, second: false });
  D([[-56, -18], [0, 50], [56, -18]], 3, 'neck', { w: 3, second: false });
  if (u >= 1) { ctx.save(); gclip(torso); ghatch(30, -30, 130, 260, { ang: -0.9, gap: 9, col: NV.graph, w: 2, a: 0.4, key: key + 'th' }); ctx.restore(); }
  // four arms: upper pair raised (rosary, palm-leaf book), lower right raised palm (blessing), lower left the water pot
  const arms = [
    [[-112, 10], [-200, -40], [-230, -150]], [[112, 10], [200, -40], [230, -150]],
    [[100, 40], [170, 140], [200, 60]], [[-100, 40], [-170, 150], [-150, 230]],
  ];
  arms.forEach((P, i) => { D(P, 4, 'arm' + i, { w: 4 }); D(P.map(([x, y], j) => [x + (j ? (P[2][0] > 0 ? -24 : 24) : 0), y + (j ? 16 : 0)]), 4, 'armi' + i, { w: 2.6, second: false }); });
  // rosary (a loop of beads) in the upper left hand
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; D(loopPts(-230 + Math.cos(a) * 34, -200 + Math.sin(a) * 44, 6, 6, 0.1), 5, 'bead' + i, { w: 2.4, second: false }); }
  // palm-leaf book in the upper right hand
  D(sketchBox(195, -230, 90, 54, 6), 5, 'book', { w: 3.4 }); D([[205, -212], [275, -212]], 5, 'bl1', { w: 2, second: false }); D([[205, -196], [262, -196]], 5, 'bl2', { w: 2, second: false });
  // the raised blessing palm (the bridge into the boon)
  D(palmPts(202, 30, 1), 5, 'palm', { closed: true, w: 3.6 });
  // the water pot (kamandalu) in the lower left hand
  D([[-180, 230], [-196, 280], [-150, 312], [-104, 280], [-120, 230], [-180, 230]], 5, 'pot', { w: 3.4 });
  D([[-104, 260], [-70, 240], [-60, 220]], 5, 'spout', { w: 2.6, second: false });
  // three faces (front + two in profile), beards, one tall crown
  for (const sx of [-1, 1]) {   // the side faces, in profile, looking outward from behind the front face
    const prof = [[sx * 30, -170], [sx * 82, -164], [sx * 100, -140], [sx * 104, -118], [sx * 122, -104], [sx * 104, -96], [sx * 108, -84], [sx * 98, -74], [sx * 102, -62], [sx * 84, -50]];
    D(prof, 0, 'side' + sx, { w: 3.4 });
    D([[sx * 76, -122], [sx * 90, -124]], 6, 'se' + sx, { w: 2.8, second: false });
    D([[sx * 84, -50], [sx * 92, -10], [sx * 76, 30], [sx * 56, 50]], 6, 'sb' + sx, { w: 2.8, second: false });
    for (let j = 0; j < 2; j++) D([[sx * (70 + j * 8), -56], [sx * (76 + j * 6), -4], [sx * (62 + j * 4), 30]], 7, 'sbs' + sx + j, { w: 2, second: false });
  }
  const face = loopPts(0, -110, 54, 64, 0.04, -2.2);
  gfill(face, NV.paper, { off: [0, 0], key: key + 'ff', a: clamp(u * 4) });
  D(face, 0, 'face');
  for (const sx of [-1, 1]) D(arcPts(sx * 22, -116, 13, Math.PI * 0.15, Math.PI * 0.85, 6), 6, 'eye' + sx, { w: 3, second: false });   // eyes lowered, calm
  D([[0, -110], [-6, -80], [6, -76]], 6, 'nose', { w: 2.6, second: false });
  // the beard: a long soft U with wavy strands
  const beard = [[-46, -84], [-50, -20], [-26, 40], [0, 58], [26, 40], [50, -20], [46, -84]];
  D(beard, 7, 'beard');
  for (let i = -2; i <= 2; i++) D([[i * 14, -48], [i * 16 + 6 * Math.sin(i), -10], [i * 12, 34]], 7, 'bs' + i, { w: 2.2, second: false });
  const CP = crownPts(0, -168, 150, 110); gfill(CP, NV.paper, { off: [0, 0], key: key + 'cf', a: clamp(u * 3) }); D(CP, 1, 'crown', { w: 4 });
  ctx.restore();
}
// a raised open palm (fingers up), centred near (x, y), local scale k
function palmPts(x, y, k = 1) {
  const P = [[x - 26 * k, y + 50 * k], [x - 30 * k, y], [x - 30 * k, y - 34 * k], [x - 20 * k, y - 36 * k], [x - 18 * k, y - 8 * k], [x - 14 * k, y - 50 * k], [x - 4 * k, y - 52 * k], [x - 2 * k, y - 10 * k],
    [x + 2 * k, y - 56 * k], [x + 12 * k, y - 56 * k], [x + 13 * k, y - 10 * k], [x + 18 * k, y - 48 * k], [x + 28 * k, y - 46 * k], [x + 27 * k, y - 4 * k], [x + 44 * k, y - 22 * k], [x + 50 * k, y - 14 * k], [x + 28 * k, y + 22 * k], [x + 22 * k, y + 50 * k]];
  return P;
}
// ---- era: Brahma appears (ink only; rays written on one at a time)
SCENES.brahma = function () {
  const cu = CUES, t0 = ERA_T[ERA.brahma]; PEN = null;
  sketchPage({ grid: 'dots' });
  const [hx, hy, hr] = G2.halo;
  // the halo ring is there from the morph; rays written on one per 16th from "Brahma"
  dr(loopPts(hx, hy, hr, hr, 0.06), 1, 'halo', { w: 4.5 });
  rayRing(hx, hy, hr + 22, hr + 96, 18, ev(cu.brahma - 0.2, 18 * E16), { key: 'bray', w: 3.6 });
  // a wide second ring of short rays around the whole figure, slower, in graphite-free ink
  rayRing(540, 820, 400, 448, 28, ev(cu.appeared, 28 * E16 * 0.5), { key: 'bray2', w: 2.6, rot: -Math.PI / 2 + 0.06 });
  brahma(540, 670, 1, ev(t0 + 0.15, 2.4));
  lotusSeat(540, 1088, 520, ev(t0 + 1.4, 1.2), 'lotus');
  mahishaBack(540, 1290, 0.42, ev(cu.appeared - 0.1, 0.9));
  if (TT > cu.appeared + 1) for (let i = 0; i < 3; i++) sparkle(170 + i * 360, 420 + (i % 2) * 520, 26, ((TT - cu.appeared) * 0.8 + i * 0.37) % 1, 'bsp' + i);
  penDraw(0.9);
  cap(['at last, Brahma'], [0, 'Brahma'], cu.brahma - 0.3, cu.brahma + 0.25);
};
BRIDGE_IN.brahma = () => ({ P: ellipsePts(G2.halo[0], G2.halo[1], G2.halo[2], G2.halo[2], 0, 64), c: NV.graph });
BRIDGE_OUT.brahma = () => ({ P: palmPts(G2.palm[0], G2.palm[1], 1), c: NV.graph });
CAMS.brahma = (t) => push(t, VL('b06_brahma').t1 - 0.2, ERA_T[ERA.boon] - 0.3, { z: 2.0, p: [742, 700], to: [600, 800] });
BOARD.brahma = [{ t: VL('b06_brahma').t1 - 0.4, title: 'Brahma appears, ink only; rays written on', sound: 'pad thickens; a soft chime per ray group', next: 'his raised palm' }];

// ---- eras still to draw (storyboard stage)
SCENES.stop = function () { sketchPage({ grid: 'dots' }); cap(['he did not stop'], [0, 'stop'], ERA_T[ERA.stop] + 0.2); };
SCENES.boon = function () { sketchPage({ grid: 'dots' }); cap(['no man or deva'], [0, 'deva'], ERA_T[ERA.boon] + 0.3); };
SCENES.pride = function () { sketchPage({ grid: 'dots' }); cap(['now invincible'], [0, 'invincible'], ERA_T[ERA.pride] + 0.3); };
