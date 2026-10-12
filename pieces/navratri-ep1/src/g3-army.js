// =====================================================================
//  GROUP 3 — beats 9–12: the army (PEAK, busiest frame), the devas retreat, the devas gather (FIRST terracotta
//  dot), divine energies. Eras: army, retreat, gather, energy.
// =====================================================================
const G3 = { gate: [540, 600], centre: [540, 820] };

// a tiny inked soldier: head, body, legs that step on 8ths, a spear or a banner
function soldier(x, y, s, key, ph, kind = 0) {
  const st = ph % 2 ? 1 : -1;
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(0, -64, 8, 0, TAU); ctx.fill();
  gline([[-4, -76], [0, -88], [4, -76]], { w: 2.4, key: key + 'h', amp: 0.4, second: false, step: 5 });   // helmet spike
  gline([[0, -56], [0, -24]], { w: 3.4, key: key + 'b', amp: 0.5, second: false, step: 6 });
  gline([[0, -24], [-8 * st, 0]], { w: 3, key: key + 'l1', amp: 0.4, second: false, step: 6 });
  gline([[0, -24], [8 * st, 0]], { w: 3, key: key + 'l2', amp: 0.4, second: false, step: 6 });
  gline([[0, -48], [12, -36]], { w: 2.6, key: key + 'a', amp: 0.4, second: false, step: 6 });
  if (kind === 1) { gline([[12, -30], [12, -120]], { w: 2.2, key: key + 'pole', amp: 0.5, second: false, step: 8 }); gline([[12, -120], [44, -110 + 4 * Math.sin(B * 1.3 + x)], [12, -98]], { w: 2.2, key: key + 'fl', amp: 0.5, second: false, step: 6 }); gfill([[12, -120], [44, -110 + 4 * Math.sin(B * 1.3 + x)], [12, -98]], NV.graph, { a: 0.55, off: [0, 0], key: key + 'flf' }); }
  else gline([[12, -20], [12, -104]], { w: 2, key: key + 'sp', amp: 0.4, second: false, step: 8 });
  ctx.restore();
}
// ---- era: the army (busiest frame; the camera pulls back to show it all)
SCENES.army = function () {
  const cu = CUES, t0 = ERA_T[ERA.army]; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.75, 'messA');
  // the fortress behind, already there (it is what the crown became)
  const F = fortress(540, 640, 1.05, 1, 'fortB');
  // smoke from the towers in graphite
  for (let i = 0; i < 3; i++) { const x = 300 + i * 240, sm = []; for (let k = 0; k <= 9; k++) sm.push([x + Math.sin(k * 0.8 - TT * 3 + i) * 14 + k * 4, 300 - k * 14]); gpencil(sm, { key: 'asmk' + i, w: 2.4, a: 0.55 }); }
  // the rows: each row marches in on an 8th, stepping on 8ths; banners every few soldiers
  const rows = 7, beat8 = Math.floor((TT - t0) / E8);
  for (let r = 0; r < rows; r++) {
    const y = 760 + r * 82, sc = 0.62 + r * 0.09, n = 9 + Math.round(r * 0.6), tr = t0 + 0.15 + r * E8;
    if (TT < tr) continue;
    const slide = (1 - EZ.o3(ev(tr, 0.4))) * (r % 2 ? 120 : -120);
    for (let i = 0; i < n; i++) {
      const x = 90 + (i + 0.5 * (r % 2)) * (900 / (n - 0.5)) + slide;
      if (Math.abs(x - 540) < 120 + r * 12) continue;   // a lane for him through every row
      soldier(x, y, sc, 'sd' + r + '_' + i, beat8 + i + r, (i + r) % 4 === 1 ? 1 : 0);
    }
  }
  // Mahishasura at the front, striding, crown big now
  mahishasura(540, 1250, 54, { pose: 'walk', crownK: 1.5, smile: 1, key: 'mhA' });
  // dust ticks on the ground line, on 8ths
  for (let i = 0; i < 6; i++) gpencil([[140 + i * 160, 1290], [160 + i * 160 + 10 * ((B + i) % 2), 1282]], { key: 'dust' + i, w: 2.4, a: 0.6 });
  penDraw(0.9);
  cap(['an army'], [0, 'army'], cu.army - 0.2, cu.army + 0.3);
};
CAMS.army = (t) => {
  const t0 = ERA_T[ERA.army], cu = CUES;
  const u = EZ.io(seg(t, t0 + 0.2, cu.attacking + 0.4));            // pull back from him to the whole army
  const close = camOf({ z: 1.7, p: [540, 900], to: [540, 820] });
  const end = ERA_T[ERA.retreat], g = EZ.io(seg(t, end - 0.9, end - 0.3));   // then lean in on the gate (the bridge)
  const pulled = camMix(close, CAM0, u);
  return camMix(pulled, camOf({ z: 1.8, p: [540, 600], to: [540, 760] }), g);
};
BRIDGE_IN.army = () => ({ P: crownPts(540, 640, 735, 400), c: NV.graph });   // the crown's five points = the fortress's towers
BRIDGE_OUT.army = () => ({ P: [[540 - 48, 640], ...arcPts(540, 640 - 74, 48, Math.PI, TAU, 12), [540 + 48, 640]], c: NV.ink });
BOARD.army = [{ t: CUES.attacking + 0.6, title: 'the army; the camera pulls back (busiest frame)', sound: 'PEAK: low drone, steps on 8ths', next: 'fortress gate becomes heaven\'s gate' }];

// ---- era: the devas retreat (beat 10). Three boxes: pushed out (the eraser takes the palaces), walking away, the gate closing.
const G3R = { boxes: [[130, 290], [130, 640], [130, 990]], w: 820, h: 300 };
const archPts = (cx, by, w, h) => [[cx - w / 2, by], ...arcPts(cx, by - h + w / 2, w / 2, Math.PI, TAU, 14), [cx + w / 2, by], [cx, by + 4]];
function retreatBox(i, u, key) {
  const [bx, by] = G3R.boxes[i], { w, h } = G3R, P = sketchBox(bx, by, w, h, 6), cu = CUES;
  if (u <= 0) return;
  gfill(P, NV.paper, { off: [0, 0], key: key + 'f', a: clamp(u * 3) });
  ctx.save(); gclip(P);
  const k = clamp((u - 0.25) / 0.75), gy = by + h - 40;
  dr([[bx, gy], [bx + w, gy]], k, key + 'gl', { w: 2.6, second: false });
  if (i === 0) {
    // heaven's palace with its arched gate; the eraser rubs it out from the left
    cloudBank(bx + 40, bx + w - 40, gy - 6, 30, k, key + 'cl');
    temple(bx + 200, gy - 20, 0.7, k, key + 'tA'); temple(bx + 620, gy - 20, 0.7, k, key + 'tB');
    const A = archPts(bx + w / 2, gy - 20, 120, 200); paperFill(A, key + 'af', k); dr(A, k, key + 'arch', { w: 4 });
    for (let j = 0; j < 4; j++) deva(bx + 180 + j * 150, gy + 30, 22, { kind: 'deva', key: key + 'd' + j, u: k, turn: 0.6 });
    const er = ev(cu.pushed + 0.6, 2.2);
    if (er > 0) { const ex = bx + er * w; ctx.save(); ctx.beginPath(); ctx.rect(bx, by, ex - bx, gy - by - 30); ctx.clip(); sketchPage({ grid: 'dots' }); ctx.restore(); if (er < 1) { navEraser(ex, by + 120 + 30 * Math.sin(B * 2.1), -0.3, 0.9); crumbs(ex - 40, by + 200, 7, key + 'cr' + (B % 3)); } }
  } else if (i === 1) {
    // the devas walking away to the right; his banners rising on the hills behind them
    dr(spl([[bx, gy - 60], [bx + 200, gy - 120], [bx + 420, gy - 80], [bx + 640, gy - 140], [bx + w, gy - 90]]), k, key + 'hill', { w: 2.6, second: false });
    for (let j = 0; j < 5; j++) { const fx = bx + 140 + 26 * j * j / 2 + 70 * j + 40 * seg(TT, cu.spread, cu.spread + 3); deva(fx, gy + 30, 20, { kind: 'deva', key: key + 'w' + j, u: k, turn: 0.8 }); }
    for (let j = 0; j < 3; j++) { const t = ev(cu.spread + 0.4 + j * BEAT, 0.3), fx = bx + 90 + j * 120, fy = gy - 110 - j * 12; gline([[fx, fy + 40], [fx, fy - 60]], { w: 2.6, key: key + 'bp' + j, part: t, second: false }); if (t >= 1) { const F = [[fx, fy - 60], [fx + 50, fy - 48 + 5 * Math.sin(B * 1.2 + j)], [fx, fy - 32]]; gfill(F, NV.graph, { a: 0.6, off: [0, 0], key: key + 'bf' + j }); gline(closeP(F), { w: 2.4, key: key + 'bo' + j, second: false }); } }
  } else {
    // heaven's gate closes on them
    const cx = bx + w / 2, A = archPts(cx, gy, 180, 240);
    paperFill(A, key + 'af', k); dr(A, k, key + 'arch', { w: 4.4 });
    const shut = ev(cu.couldNot - 0.3, 0.8);
    for (const sd of [-1, 1]) { const dw = 88 * shut, D = [[cx + sd * 90, gy], [cx + sd * 90, gy - 150], [cx + sd * (90 - dw), gy - 150], [cx + sd * (90 - dw), gy]]; if (shut > 0) { gfill(D, NV.graph, { a: 0.35, off: [0, 0], key: key + 'df' + sd }); gline(closeP(D), { w: 3, key: key + 'd' + sd, second: false }); } }
    for (let j = 0; j < 3; j++) deva(bx + 120 + j * 70, gy + 30, 20, { kind: 'deva', key: key + 'o' + j, u: k, turn: 0.5 });
  }
  ctx.restore();
  dr(P, u, key + 'box', { w: 3.6 });
}
SCENES.retreat = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.9, 'messA');
  retreatBox(0, ev(ERA_T[ERA.retreat] - 0.1, 0.4), 'rb0');
  retreatBox(1, ev(cu.spread - 0.3, 0.5), 'rb1');
  retreatBox(2, ev(cu.tried - 0.3, 0.5), 'rb2');
  penDraw(0.8);
  cap(['the devas retreat'], [0, 'retreat'], cu.pushed - 0.2, cu.pushed + 0.5);
};
CAMS.retreat = (t) => {
  const t0 = ERA_T[ERA.retreat], t1 = ERA_T[ERA.gather], b0 = G3R.boxes[0], b2 = G3R.boxes[2];
  const inA = camOf({ z: 2.0, p: [b0[0] + G3R.w / 2, b0[1] + G3R.h - 160], to: [540, 760] }), outA = camOf({ z: 2.2, p: [b2[0] + G3R.w / 2, b2[1] + G3R.h - 160], to: [540, 760] });
  return camMix(camMix(inA, CAM0, EZ.io(seg(t, t0 + 0.1, t0 + 1.0))), outA, EZ.io(seg(t, t1 - 1.0, t1 - 0.3)));
};
BRIDGE_IN.retreat = () => ({ P: archPts(G3R.boxes[0][0] + G3R.w / 2, G3R.boxes[0][1] + G3R.h - 60, 120, 200), c: NV.ink });
BRIDGE_OUT.retreat = () => ({ P: archPts(G3R.boxes[2][0] + G3R.w / 2, G3R.boxes[2][1] + G3R.h - 40, 180, 240), c: NV.ink });
BOARD.retreat = [{ t: Math.min(CUES.couldNot + 0.4, ERA_T[ERA.gather] - 1.15), title: 'the devas retreat: the eraser takes the palaces; the gate closes', sound: 'peak thinning: drone, steps fade', next: 'the gate\'s arch becomes a ring' }];

// ---- eras: the devas gather (beat 11) and release their energies (beat 12). One ring of figures; the FIRST terracotta dot.
const G3G = { c: [540, 1060] };
const G3_RING = [
  { kind: 'vishnu', x: 540, y: 900, H: 54, turn: 0, cue: 'vishnu' }, { kind: 'deva', x: 360, y: 950, H: 48, turn: 0.4, cue: 'others' }, { kind: 'deva', x: 720, y: 950, H: 48, turn: -0.4, cue: 'others' },
  { kind: 'shiva', x: 210, y: 1060, H: 56, turn: 0.5, cue: 'shiva' }, { kind: 'brahma', x: 870, y: 1080, H: 40, cue: 'brahma2' },
  { kind: 'deva', x: 140, y: 1280, H: 60, turn: 0.6, cue: 'others' }, { kind: 'deva', x: 940, y: 1280, H: 60, turn: -0.6, cue: 'others' },
];
const G3_CHEST = (f) => (f.kind === 'brahma' ? [f.x, f.y - 3.0 * f.H] : [f.x, f.y - 5.2 * f.H]);
function gatherRing(always) {
  G3_RING.forEach((f, i) => {
    const u = always ? 1 : ev(CUES[f.cue] - 0.2 + (f.cue === 'others' ? (i % 3) * 0.25 : 0), 0.9);
    if (f.kind === 'brahma') brahma(f.x, f.y, f.H, { u, key: 'gb' + i, halo: false });
    else deva(f.x, f.y, f.H, { kind: f.kind, turn: f.turn, u, key: 'gd' + i });
  });
}
SCENES.gather = function () {
  const cu = CUES, t1 = ERA_T[ERA.energy]; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.8 - 0.4 * seg(TT, cu.together, t1), 'messA');
  dr(ellipsePts(G3G.c[0], G3G.c[1] + 40, 330, 90, 0, 64), ev(ERA_T[ERA.gather], 0.6), 'gfloor', { w: 2.2, second: false, col: NV.graph });
  gatherRing(false);
  // the first terracotta in the piece: one dot, on "together"; at the end it grows (the bridge)
  const d = ev(cu.together, 0.2), g = ev(t1 - 1.0, 0.6), r = 15 + 55 * EZ.io(g);
  if (d > 0) { const P = loopPts(G3G.c[0], G3G.c[1], r * EZ.back(d), r * EZ.back(d), 0.04); gfill(P, NV.terra, { off: [0, 0], key: 'dot11', a: 0.9 }); if (g > 0) scribbleFill(P, NV.terraD, { key: 'dot11s', gap: 9, w: 3, base: 0 }); }
  penDraw(0.8);
  cap(['they came together'], [0, 'together'], cu.together - 0.6, cu.together + 0.1);
};
CAMS.gather = (t) => push(t, ERA_T[ERA.energy] - 1.0, ERA_T[ERA.energy] - 0.4, { z: 1.8, p: G3G.c, to: [540, 900] });
BRIDGE_IN.gather = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1] + 40, 330, 90, 0, 64), c: NV.graph });
BRIDGE_OUT.gather = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1], 70, 70, 0, 64), c: NV.terra });
BOARD.gather = [{ t: ERA_T[ERA.energy] - 1.1, title: 'the devas gather; the FIRST terracotta dot', sound: 'near silence: a single soft tone on the dot', next: 'the dot grows' }];
SCENES.energy = function () {
  const cu = CUES, t0 = ERA_T[ERA.energy], t1 = ERA_T[ERA.merge]; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.35, 'messA');
  dr(ellipsePts(G3G.c[0], G3G.c[1] + 40, 330, 90, 0, 64), 1, 'gfloor', { w: 2.2, second: false, col: NV.graph });
  gatherRing(true);
  // one terracotta line per deva, on the beat, converging on the centre
  G3_RING.forEach((f, i) => { const [hx, hy] = G3_CHEST(f), t = ev(cu.released - 0.2 + i * BEAT * 0.5, 0.35); gline([[hx, hy], [lerp(hx, G3G.c[0], 0.5) + 10 * Math.sin(i), lerp(hy, G3G.c[1], 0.5)], G3G.c], { w: 4.4, col: NV.terra, key: 'en' + i, part: t, amp: 1.2 }); });
  const r = 70 + 50 * seg(TT, t0, t1 - 0.4), P = loopPts(G3G.c[0], G3G.c[1], r, r, 0.04);
  gfill(P, NV.terra, { off: [0, 0], key: 'core12', a: 0.85 }); scribbleFill(P, NV.terraD, { key: 'core12s', gap: 9, w: 3, base: 0 });
  rayRing(G3G.c[0], G3G.c[1], r + 14, r + 40, 16, ev(cu.energy, 0.6), { col: NV.terra, w: 3, key: 'cr12' });
  cap(['each gave light'], [0, 'light'], cu.released - 0.3, cu.energy);
};
CAMS.energy = (t) => camMix(camOf({ z: 1.8, p: G3G.c, to: [540, 900] }), CAM0, EZ.io(seg(t, ERA_T[ERA.energy] + 0.05, ERA_T[ERA.energy] + 0.9)));
BRIDGE_IN.energy = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1], 70, 70, 0, 64), c: NV.terra });
BRIDGE_OUT.energy = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1], 118, 118, 0, 64), c: NV.terra });
BOARD.energy = [{ t: ERA_T[ERA.merge] - 0.8, title: 'each gave light: terracotta lines to the centre, one per beat', sound: 'silence act: soft ticks only', next: 'push into the centre' }];
