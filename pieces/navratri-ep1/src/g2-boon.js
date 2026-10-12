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
SCENES.boon = function () { sketchPage({ grid: 'dots' }); cap(['no man or deva'], [0, 'deva'], ERA_T[ERA.boon] + 0.3); };
SCENES.pride = function () { sketchPage({ grid: 'dots' }); cap(['now invincible'], [0, 'invincible'], ERA_T[ERA.pride] + 0.3); };
