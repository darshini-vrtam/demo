// =====================================================================
//  GROUP 2 — beats 5–8: he did not stop, Brahma appears, the boon, pride. Eras: stop, brahma, boon, pride.
//  Brahma is ink only (no colour). Red marker: the BOON stamp (beat 7) is the scene's one red.
// =====================================================================
const G2 = { halo: [540, 652, 172], palm: [757, 760], bx: 540, by: 1290, H: 150 };

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
// a raised open palm (fingers up), centred near (x, y), local scale k
function palmPts(x, y, k = 1) {
  const P = [[x - 26 * k, y + 50 * k], [x - 30 * k, y], [x - 30 * k, y - 34 * k], [x - 20 * k, y - 36 * k], [x - 18 * k, y - 8 * k], [x - 14 * k, y - 50 * k], [x - 4 * k, y - 52 * k], [x - 2 * k, y - 10 * k],
    [x + 2 * k, y - 56 * k], [x + 12 * k, y - 56 * k], [x + 13 * k, y - 10 * k], [x + 18 * k, y - 48 * k], [x + 28 * k, y - 46 * k], [x + 27 * k, y - 4 * k], [x + 44 * k, y - 22 * k], [x + 50 * k, y - 14 * k], [x + 28 * k, y + 22 * k], [x + 22 * k, y + 50 * k]];
  return P;
}
// ---- era: Brahma appears (beat 6). Ink only; the rays are written on one at a time from "Brahma".
SCENES.brahma = function () {
  const cu = CUES, t0 = ERA_T[ERA.brahma]; PEN = null;
  sketchPage({ grid: 'dots' });
  const [hx, hy, hr] = G2.halo;
  rayRing(hx, hy, hr + 28, hr + 110, 20, ev(cu.brahma - 0.2, 20 * E16), { key: 'bray', w: 3.6 });
  brahma(G2.bx, G2.by, G2.H, { u: ev(t0 + 0.1, 2.6), key: 'br6' });
  if (TT > cu.appeared + 0.6) for (let i = 0; i < 3; i++) sparkle(130 + i * 410, 420 + (i % 2) * 560, 26, ((TT - cu.appeared) * 0.8 + i * 0.37) % 1, 'bsp' + i);
  penDraw(0.9);
  cap(['at last, Brahma'], [0, 'Brahma'], cu.brahma - 0.4, cu.brahma + 0.15);
};
BRIDGE_IN.brahma = () => ({ P: ellipsePts(G2.halo[0], G2.halo[1], G2.halo[2], G2.halo[2], 0, 64), c: NV.graph });
BRIDGE_OUT.brahma = () => ({ P: palmPts(G2.palm[0], G2.palm[1], 1.15), c: NV.graph });
CAMS.brahma = (t) => push(t, VL('b06_brahma').t1 - 0.2, ERA_T[ERA.boon] - 0.3, { z: 2.0, p: G2.palm, to: [580, 800] });
BOARD.brahma = [{ t: VL('b06_brahma').t1 - 0.4, title: 'Brahma appears, ink only; rays written on', sound: 'pad thickens; a soft chime per ray group', next: 'his raised palm' }];

// ---- eras still to draw (storyboard stage)
// ---- era: he did not stop (beat 5). The face close-up, eyes shut; pencil scribbles gather round his head and close into a halo.
const G2F = { x: 540, y: 640, h: 350, ring: [540, 590, 440] };
SCENES.stop = function () {
  const cu = CUES, t0 = ERA_T[ERA.stop], t1 = ERA_T[ERA.brahma]; PEN = null;
  sketchPage({ grid: 'dots' });
  mahishaHead(G2F.x, G2F.y, G2F.h, { eyes: 'closed', u: ev(t0 + 0.05, 0.9), key: 'mh5' });
  // scribbles: tangles orbit in toward the head on the beat, more of them as "stop" lands
  const g = seg(TT, t0 + 0.3, t1 - 0.4), n = Math.round(4 + 10 * g);
  for (let i = 0; i < n; i++) { const a = i / 14 * TAU + 0.4 + 0.15 * Math.sin(TT * 1.5 + i), r = lerp(560, 480, g) + 30 * ((i * 7) % 3); graphiteScribble(G2F.ring[0] + Math.cos(a) * r, G2F.ring[1] + Math.sin(a) * r * 0.95, 90, 70, 'st' + i, { a: 0.7, part: ev(t0 + 0.3 + i * E8, 0.4) }); }
  // the halo: the scribbles close into one pencil ring (the bridge into Brahma's halo)
  gpencil(loopPts(G2F.ring[0], G2F.ring[1], G2F.ring[2], G2F.ring[2], 0.06), { key: 'ring5', part: ev(t1 - 0.9, 0.5), w: 3.2, a: 0.9 });
  cap(['he did not stop'], [0, 'stop'], cu.stop - 0.5, cu.stop + 0.1);
};
CAMS.stop = (t) => camOf({ z: 1 + 0.12 * EZ.io(seg(t, ERA_T[ERA.stop], ERA_T[ERA.brahma] - 0.9)), p: [540, 700], to: [540, 700] });
BRIDGE_IN.stop = () => ({ P: sketchBox(150, 320, 780, 900, 30, 0), c: NV.graph });
BRIDGE_OUT.stop = () => ({ P: ellipsePts(G2F.ring[0], G2F.ring[1], G2F.ring[2], G2F.ring[2], 0, 64), c: NV.graph });
BOARD.stop = [{ t: CUES.stop + 0.3, title: 'extreme close-up: he did not stop; scribbles gather', sound: 'pad thins; scratch on 16ths', next: 'the scribble halo becomes Brahma\'s halo' }];
// ---- era: the boon (beat 7). Brahma's raised palm in ink, Mahishasura kneeling; a card "no man / no deva"; the red BOON stamp.
const G2B = { palm: [835, 560], stamp: [770, 1060, 104], card: [700, 860] };
function roundStamp(x, y, r, u, key) {   // a round red rubber stamp, worn; pops in on its beat (the scene's one red)
  if (u <= 0) return;
  const k = u < 1 ? EZ.back(u) : 1;
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.16); ctx.scale(k, k);
  gline(loopPts(0, 0, r, r, 0.04), { w: 9, col: NV.red, key: key + 'o', second: false });
  gline(loopPts(0, 0, r * 0.82, r * 0.82, 0.04), { w: 3, col: NV.red, key: key + 'i', second: false });
  handLetter('BOON', 0, r * 0.22, r * 0.62, { face: 'marker', col: NV.red, key: key + 't', jit: 0.5 });
  ctx.fillStyle = NV.paper; const S = RNG('rstk', key); for (let i = 0; i < 180; i++) { ctx.globalAlpha = 0.5; const a = S.r(0, TAU), rr = S.f() * r; ctx.fillRect(Math.cos(a) * rr, Math.sin(a) * rr, 2 + S.f() * 3, 2 + S.f() * 3); }
  ctx.restore();
}
SCENES.boon = function () {
  const cu = CUES, t0 = ERA_T[ERA.boon]; PEN = null;
  sketchPage({ grid: 'dots' });
  // Brahma's raised palm from the top right, in ink, with ray lines (it opened out of the last beat's palm)
  FIG.mode = 'ink';
  const fore = limb([[1120, 760], [1000, 700], [G2B.palm[0] + 6, G2B.palm[1] + 70]], [[0, 52], [0.6, 40], [1, 30]]);
  drawLimb(fore, 1, 'bfore', { hatch: true });
  bandOn(fore, 0.85, 1, 'bbang', { w: 0.05 }); bandOn(fore, 0.92, 1, 'bbang2', { w: 0.04 });
  hand(G2B.palm[0] + 6, G2B.palm[1] + 70, -Math.PI / 2 - 0.08, 220, 'open', -1, 'bpalm', 1);
  rayRing(G2B.palm[0], G2B.palm[1] - 30, 170, 230, 16, ev(t0 + 0.2, 1.2), { key: 'pray', w: 3 });
  // Mahishasura kneels, facing the palm
  mahishasura(300, 1290, 104, { pose: 'kneel', u: ev(t0 + 0.2, 2.0), key: 'mh7' });
  // the card: taped to the page, written on as the voice says it
  const [cx, cy] = G2B.card, cardP = sketchBox(-170, -120, 340, 240, 10, 0);
  if (TT > cu.granted - 0.6) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.05);
    gfill(cardP, SK.sheet, { off: [6, 6], key: 'card7f' }); gline(sketchBox(-170, -120, 340, 240, 10), { w: 3.6, key: 'card7' });
    tapeStrip(0, -122, 120, 0.04, 'card7t', 34);
    handLetter('no man', -130, -20, 64, { align: 'left', reveal: ev(cu.man - 0.15, 0.5), key: 'nm7' });
    handLetter('no deva', -130, 70, 64, { align: 'left', reveal: ev(cu.deva - 0.15, 0.5), key: 'nd7' });
    ctx.restore();
  }
  roundStamp(G2B.stamp[0], G2B.stamp[1], G2B.stamp[2], ev(cu.stamp, 0.25), 'boon7');
  penDraw(0.9);
  cap(['no man or deva'], [0, 'deva'], cu.man - 0.5, cu.deva + 0.1);
};
CAMS.boon = (t) => push(t, ERA_T[ERA.pride] - 1.0, ERA_T[ERA.pride] - 0.4, { z: 1.6, p: G2B.stamp.slice(0, 2), to: [600, 900] });
BRIDGE_IN.boon = () => ({ P: palmPts(G2B.palm[0], G2B.palm[1], 2.2), c: NV.graph });
BRIDGE_OUT.boon = () => ({ P: ellipsePts(G2B.stamp[0], G2B.stamp[1], G2B.stamp[2], G2B.stamp[2], 0, 64), c: NV.red });
BOARD.boon = [{ t: CUES.stamp + 0.5, title: 'the boon: he kneels; "no man / no deva"; the red BOON stamp', sound: 'a stamp thud on the beat', next: 'the stamp circle becomes his eye' }];
// ---- era: pride (beat 8). His face, eyes open, a sure smile; the small crown is rubbed out and drawn back bigger;
//      graphite smudges creep in from the edges as his pride grows.
const G2P = { x: 540, y: 660, h: 340 };
SCENES.pride = function () {
  const cu = CUES, t0 = ERA_T[ERA.pride], t1 = ERA_T[ERA.army], { x, y, h } = G2P; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.55 * seg(TT, cu.pride - 0.6, t1 - 0.3), 'messA');
  mahishaHead(x, y, h, { eyes: 'open', smile: ev(t0 + 0.4, 1.0), look: 0.4, noCrown: true, u: 1, key: 'mh8' });
  // the crown: the small one is rubbed out from left to right, crumbs fly, then the big one is drawn in
  const te = cu.invincible - 0.1, er = ev(te, 0.9), small = [x, y - 0.4 * h, 0.92 * h, 0.66 * h], bigK = 1.45;
  if (er < 1) {
    crown(small[0], small[1], small[2], small[3], 'cr8s', { u: 1 });
    if (er > 0) { const ex = small[0] - small[2] * 0.6 + er * small[2] * 1.2;
      ctx.save(); ctx.beginPath(); ctx.rect(small[0] - small[2] * 0.75, small[1] - small[3] * 1.25, ex - (small[0] - small[2] * 0.75), small[3] * 1.5); ctx.clip(); sketchPage({ grid: 'dots' }); ctx.restore();
      navEraser(ex, small[1] - small[3] * 0.4 + 18 * Math.sin(B * 2.2), -0.3, 1.1); crumbs(ex - 40, small[1] + 30, 8, 'cr8c' + (B % 3)); }
  }
  crown(x, y - 0.4 * h, 0.92 * h * bigK, 0.66 * h * bigK, 'cr8b', { u: ev(te + 1.0, 1.1) });
  penDraw(0.9);
  cap(['now invincible'], [0, 'invincible'], cu.invincible - 0.5, cu.invincible + 0.2);
};
CAMS.pride = (t) => camMix(camOf({ z: 3.4, p: [G2P.x - 0.22 * 0.8 * G2P.h, G2P.y - 0.06 * G2P.h], to: [540, 760] }), CAM0, EZ.io(seg(t, ERA_T[ERA.pride] + 0.05, ERA_T[ERA.pride] + 1.0)));
BRIDGE_IN.pride = () => ({ P: ellipsePts(G2P.x - 0.22 * 0.8 * G2P.h, G2P.y - 0.06 * G2P.h, 34, 16, 0, 64), c: NV.ink });
BRIDGE_OUT.pride = () => ({ P: crownPts(G2P.x, G2P.y - 0.4 * G2P.h, 0.92 * G2P.h * 1.45, 0.66 * G2P.h * 1.45), c: NV.graph });
BOARD.pride = [{ t: CUES.grew + 0.4, title: 'pride: the crown erased and redrawn bigger; smudges creep in', sound: 'pad thickens, scratch on 16ths', next: 'the crown becomes the fortress' }];
