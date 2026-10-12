// =====================================================================
//  GROUP 3 — beats 9–12: the army (PEAK, busiest frame), the devas retreat, the devas gather (FIRST terracotta
//  dot), divine energies. Eras: army, retreat, gather, energy.
// =====================================================================
const G3 = { gate: [540, 600], centre: [540, 820] };

// ---- small group-3 helpers
// a graphite "v" bird (the kit's doodleBird is ink; background life stays graphite)
function g3Bird(x, y, s, flap, key) {
  const k = 0.35 + 0.65 * flap;
  gpencil([[x - 26 * s, y - 14 * s * k], [x - 12 * s, y - 16 * s * k], [x, y], [x + 12 * s, y - 16 * s * k], [x + 26 * s, y - 14 * s * k]], { key, w: 2.6 * s, a: 0.8, amp: 0.6, passes: 1 });
}
// a pencil wisp rising from (x, y): smoke or dust, boiling on 2s
function g3Wisp(x, y, h, key, a = 0.5) {
  const P = []; for (let k = 0; k <= 7; k++) P.push([x + Math.sin(k * 0.9 - TT * 3 + x * 0.01) * 8 + k * 2, y - k * h / 7]);
  gpencil(P, { key, w: 2.2, a });
}
// a tiny inked soldier: head, body, legs that step on 8ths, a spear or a banner (kind 1)
function g3Soldier(x, y, s, key, ph, kind = 0) {
  const st = ph % 2 ? 1 : -1;
  ctx.save(); ctx.translate(x, y - (ph % 2 ? 3 : 0) * s); ctx.scale(s, s);
  ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(0, -64, 8, 0, TAU); ctx.fill();
  gline([[-4, -76], [0, -88], [4, -76]], { w: 2.4, key: key + 'h', amp: 0.4, second: false, step: 5 });   // helmet spike
  gline([[0, -56], [0, -24]], { w: 3.4, key: key + 'b', amp: 0.5, second: false, step: 6 });
  gline([[0, -24], [-8 * st, 0]], { w: 3, key: key + 'l1', amp: 0.4, second: false, step: 6 });
  gline([[0, -24], [8 * st, 0]], { w: 3, key: key + 'l2', amp: 0.4, second: false, step: 6 });
  gline([[0, -48], [12, -36]], { w: 2.6, key: key + 'a', amp: 0.4, second: false, step: 6 });
  if (kind === 1) {
    const fy = -110 + (ph % 2 ? 6 : -2);
    gline([[12, -30], [12, -120]], { w: 2.2, key: key + 'pole', amp: 0.5, second: false, step: 8 });
    const F = [[12, -120], [44, fy], [30, -104 + (ph % 2 ? 4 : 0)], [12, -98]];
    gfill(F, NV.graph, { a: 0.55, off: [0, 0], key: key + 'flf' }); gline(F, { w: 2.2, key: key + 'fl', amp: 0.5, second: false, step: 6 });
  } else gline([[12, -20], [12, -104]], { w: 2, key: key + 'sp', amp: 0.4, second: false, step: 8 });
  ctx.restore();
}
// a banner on a pole, written on bottom to top (dr: pencil then ink, the pencil prop follows); the cloth flaps on 2s
function g3Banner(x, y, h, u, key, s = 1) {
  if (u <= 0) return;
  dr([[x, y], [x, y - h]], seg(u, 0, 0.6), key + 'p', { w: 3 * s, second: false });
  const k = seg(u, 0.5, 1); if (k <= 0) return;
  const fl = B % 2 ? 1 : -1, F = [[x, y - h], [x + 46 * s, y - h + (8 + 5 * fl) * s], [x + 30 * s, y - h + 20 * s], [x + 44 * s, y - h + (32 - 4 * fl) * s], [x, y - h + 30 * s]];
  if (k >= 1) gfill(F, NV.graph, { a: 0.55, off: [0, 0], key: key + 'ff' });
  dr(F, k, key + 'f', { w: 2.6 * s, second: false });
}
// a deva at (x, y) with a walk on 2s: a bob, a small lean, a stride offset; ph = step index
function g3Walker(x, y, H, o, ph) {
  ctx.save(); ctx.translate(x, y - (ph % 2 ? 0.05 * H : 0)); ctx.rotate((o.dir ?? 1) * (ph % 2 ? 0.05 : 0.02));
  deva(0, 0, H, o);
  ctx.restore();
}
// a deva breathing (held shots): a slow, tiny rise of the chest on 2s, anchored at the feet
function g3Breath(x, y, H, o, i) {
  const k = 1 + 0.008 * Math.sin(TT * 1.7 + i * 1.3);
  ctx.save(); ctx.translate(x, y); ctx.scale(1, k); ctx.translate(-x, -y);
  if (o.kind === 'brahma') brahma(x, y, H, o); else deva(x, y, H, o);
  ctx.restore();
}

// ---- era: the army (busiest frame; the camera pulls back to show it all, then leans in on the gate)
SCENES.army = function () {
  const cu = CUES, t0 = ERA_T[ERA.army], t1 = ERA_T[ERA.retreat]; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.75, 'messA');
  // smoke from the towers in graphite
  for (let i = 0; i < 3; i++) g3Wisp(300 + i * 240, 310, 130, 'asmk' + i, 0.55);
  // crows circling the towers (graphite, small)
  for (let i = 0; i < 3; i++) { const a = TT * (0.9 + 0.2 * i) + i * 2.1; g3Bird(540 + Math.cos(a) * (250 + 40 * i), 330 + Math.sin(a) * 50 + i * 30, 0.7, (B + i) % 2, 'acrow' + i); }
  // the fortress behind, already there (it is what the crown became)
  fortress(540, 640, 1.05, 1, 'fortB');
  // his banners go up along the wall, one after another, the pencil writing them on
  const pn = [-372, 372, -268, 268, -157, 157];
  pn.forEach((dx, i) => g3Banner(540 + dx, 556, 74, ev(cu.army - 0.6 + i * E8, 0.55), 'awb' + i, 0.8));
  // the rows: each row marches in on an 8th, stepping on 8ths; banners every few soldiers
  const rows = 7, beat8 = Math.floor((TT - t0) / E8);
  for (let r = 0; r < rows; r++) {
    const y = 760 + r * 82, sc = 0.62 + r * 0.09, n = 9 + Math.round(r * 0.6), tr = t0 + 0.15 + r * E8;
    if (TT < tr) continue;
    const inU = Math.min(1, Math.floor(ev(tr, 0.75) * 6) / 6 + 0.17);            // the row comes on in strides (8ths)
    const slide = (1 - EZ.o3(inU)) * (r % 2 ? 160 : -160);
    for (let i = 0; i < n; i++) {
      const x = 100 + (i + 0.5 * (r % 2)) * (830 / (n - 0.5)) + slide;
      if (Math.abs(x - 540) < 120 + r * 12) continue;   // a lane for him through every row
      g3Soldier(x, y, sc, 'sd' + r + '_' + i, beat8 + i + r, (i + r) % 4 === 1 ? 1 : 0);
    }
  }
  // Mahishasura in the lane, striding; on "attacking" he marches up the lane toward the gate (stepping on 8ths)
  const adv = EZ.io(ev(cu.attacking - 0.1, t1 - 0.4 - cu.attacking)), stepN = Math.floor((TT - t0) / E8);
  const my = lerp(1250, 965, adv) - (adv > 0 && adv < 1 && stepN % 2 ? 8 : 0), mH = lerp(54, 41, adv);
  mahishasura(540, my, mH, { pose: 'walk', crownK: 1.5, smile: 1, key: 'mhA' });
  // dust kicked up at his heels, on 8ths
  for (let i = 0; i < 3; i++) gpencil([[500 - i * 26, my + 4 - 6 * ((stepN + i) % 2)], [470 - i * 30, my - 6 - 10 * ((stepN + i) % 2)]], { key: 'mdu' + i, w: 2.2, a: 0.55 });
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
  return camMix(pulled, camOf({ z: 1.8, p: [540, 600], to: [540, 640] }), g);
};
BRIDGE_IN.army = () => ({ P: crownPts(540, 640, 735, 400), c: NV.graph });   // the crown's five points = the fortress's towers
BRIDGE_OUT.army = () => ({ P: [[540 - 48, 640], ...arcPts(540, 640 - 74, 48, Math.PI, TAU, 12), [540 + 48, 640]], c: NV.ink });
BOARD.army = [{ t: CUES.attacking + 0.6, title: 'the army; the camera pulls back (busiest frame)', sound: 'PEAK: low drone, steps on 8ths', next: 'fortress gate becomes heaven\'s gate' }];

// ---- era: the devas retreat (beat 10). Three boxes: pushed out (the eraser takes the palaces), walking away, the gate closing.
const G3R = { boxes: [[130, 290], [130, 640], [130, 990]], w: 820, h: 300 };
const archPts = (cx, by, w, h) => [[cx - w / 2, by], ...arcPts(cx, by - h + w / 2, w / 2, Math.PI, TAU, 14), [cx + w / 2, by], [cx, by + 4]];
const g3HillY = (bx, gy, x) => {   // the box-2 hill line, piecewise linear (matches the spline's knots)
  const K = [[0, -60], [200, -120], [420, -80], [640, -140], [820, -90]], dx = clamp(x - bx, 0, 820);
  for (let i = 1; i < K.length; i++) if (dx <= K[i][0]) return gy + lerp(K[i - 1][1], K[i][1], (dx - K[i - 1][0]) / (K[i][0] - K[i - 1][0]));
  return gy - 90;
};
function retreatBox(i, u, key) {
  const [bx, by] = G3R.boxes[i], { w, h } = G3R, P = sketchBox(bx, by, w, h, 6), cu = CUES;
  if (u <= 0) return;
  gfill(P, NV.paper, { off: [0, 0], key: key + 'f', a: clamp(u * 3) });
  ctx.save(); gclip(P);
  const k = clamp((u - 0.25) / 0.75), gy = by + h - 40, st = Math.floor(TT / E8);
  dr([[bx, gy], [bx + w, gy]], k, key + 'gl', { w: 2.6, second: false });
  if (i === 0) {
    // heaven's palace with its arched gate. His soldiers march in from the left; on "pushed" the eraser rubs the
    // palaces out behind them, and the devas are driven out to the right, one by one.
    if (TT < cu.pushed + 1.6) g3Bird(bx + 560 + 60 * (TT - ERA_T[ERA.retreat]), by + 60, 0.6, B % 2, key + 'bird');
    cloudBank(bx + 40, bx + w - 40, gy - 6, 30, k, key + 'cl');
    temple(bx + 200, gy - 20, 0.7, k, key + 'tA'); temple(bx + 620, gy - 20, 0.7, k, key + 'tB');
    const A = archPts(bx + w / 2, gy - 20, 120, 200); paperFill(A, key + 'af', k); dr(A, k, key + 'arch', { w: 4 });
    const er = ev(cu.pushed + 0.4, 2.4), ex = bx + er * (w + 60);
    if (er > 0) {
      ctx.save(); ctx.beginPath(); ctx.rect(bx, by, ex - bx, gy - by - 4); ctx.clip(); sketchPage({ grid: 'dots' }); ctx.restore();
      // ghosts of the erased palaces stay as faint graphite, and crumbs settle on the ground
      ctx.save(); ctx.beginPath(); ctx.rect(bx, by, ex - bx, gy - by); ctx.clip();
      gpencil(archPts(bx + w / 2, gy - 20, 120, 200), { key: key + 'ghA', w: 2, a: 0.16 });
      for (const tx of [200, 620]) gpencil([[bx + tx - 36, gy - 20], [bx + tx - 30, gy - 110], [bx + tx, gy - 140], [bx + tx + 30, gy - 110], [bx + tx + 36, gy - 20]], { key: key + 'gh' + tx, w: 2, a: 0.16 });
      ctx.restore();
      for (let c = 0; c < 9; c++) { const cx = bx + 50 + c * 95; if (cx < ex - 60) crumbs(cx, gy - 16, 2, key + 'cs' + c, 50); }
      for (let c = 0; c < 3; c++) { const cx = bx + 120 + c * 260; if (cx < ex - 120 && TT < cu.pushed + 3.6) g3Wisp(cx, gy - 20, 70, key + 'wsp' + c, 0.4); }
    }
    // his soldiers: in from the left edge, then right behind the eraser
    const sIn = ev(ERA_T[ERA.retreat] + 1.2, 1.6), lead = Math.max(bx - 80 + 220 * EZ.o3(sIn), ex - 110);
    for (let s = 0; s < 4; s++) g3Soldier(lead - s * 62, gy + 2, 0.95, key + 'so' + s, st + s, s === 1 ? 1 : 0);
    // the devas: they turn to look at the soldiers, then the eraser pushes them out of the box
    for (let j = 0; j < 4; j++) {
      const x0 = bx + 180 + j * 150, push = Math.max(0, ex + 120 - x0), x = x0 + push;
      if (x > bx + w + 60) continue;
      const walking = push > 0;
      (walking ? g3Walker : (xx, yy, HH, o) => deva(xx, yy, HH, o))(x, gy + 30, 22, { kind: 'deva', key: key + 'd' + j, u: k, turn: TT > ERA_T[ERA.retreat] + 1.6 ? -0.6 : 0.6, eyes: TT > ERA_T[ERA.retreat] + 1.6 ? 'open' : 'down' }, st + j);
    }
    if (er > 0 && er < 1) { navEraser(ex, by + 120 + 24 * Math.sin(B * 2.1), -0.3 + 0.08 * (B % 2), 0.9); crumbs(ex - 40, by + 200, 7, key + 'cr' + (B % 3)); }
  } else if (i === 1) {
    // the devas walking away to the right, step on 2s; his banners rising on the hills behind them, one per beat
    dr(spl([[bx, gy - 60], [bx + 200, gy - 120], [bx + 420, gy - 80], [bx + 640, gy - 140], [bx + w, gy - 90]]), k, key + 'hill', { w: 2.6, second: false });
    if (TT > cu.spread) g3Bird(bx + w - 80 - 50 * (TT - cu.spread), by + 50 + 6 * Math.sin(TT * 2), 0.55, B % 2, key + 'bird');
    [90, 250, 420, 590, 740].forEach((dx, j) => g3Banner(bx + dx, g3HillY(bx, gy, bx + dx) + 6, 92, ev(cu.spread + 0.4 + j * BEAT, 0.45), key + 'bn' + j, 0.9));
    const ws = Math.floor(TT * FPS / 2);   // a step every 2 frames' boil: the stride alternates on 2s
    for (let j = 0; j < 5; j++) {
      const fx = bx + 70 + j * 120 + 32 * Math.max(0, TT - cu.spread + 0.3);
      g3Walker(fx, gy + 30, 20, { kind: 'deva', key: key + 'w' + j, u: k, turn: 0.8, eyes: 'down' }, ws + j);
      if (k >= 1) gpencil([[fx - 30, gy + 32 - 4 * ((ws + j) % 2)], [fx - 46, gy + 26]], { key: key + 'wd' + j, w: 2, a: 0.5 });   // a scuff of dust
    }
  } else {
    // heaven's gate: the devas try to hold it; on "could not" it closes on them and the bar drops
    const cx = bx + w / 2, A = archPts(cx, gy, 180, 240);
    // his banner rises over the far wall once the gate is lost
    g3Banner(bx + 700, gy - 10, 150, ev(cu.couldNot + 0.5, 0.6), key + 'hb', 1);
    paperFill(A, key + 'af', k); dr(A, k, key + 'arch', { w: 4.4 });
    const shut = EZ.io(ev(cu.couldNot - 0.3, 0.8));
    for (const sd of [-1, 1]) { const dw = 88 * shut, D = [[cx + sd * 90, gy], [cx + sd * 90, gy - 150], [cx + sd * (90 - dw), gy - 150], [cx + sd * (90 - dw), gy]]; if (shut > 0) { gfill(D, NV.graph, { a: 0.35, off: [0, 0], key: key + 'df' + sd }); gline(closeP(D), { w: 3, key: key + 'd' + sd, second: false }); } }
    const bar = ev(cu.couldNot + 0.5, 0.25);
    if (bar > 0) { gline([[cx - 110, gy - 78 - 30 * (1 - bar)], [cx + 110, gy - 78 - 30 * (1 - bar)]], { w: 7, key: key + 'bar', second: true }); sparkle(cx - 118, gy - 78, 26, ev(cu.couldNot + 0.75, 0.4), key + 'spL'); sparkle(cx + 118, gy - 78, 26, ev(cu.couldNot + 0.75, 0.4), key + 'spR'); }
    const go = EZ.io(ev(cu.tried + 0.2, 1.4)), back = ev(cu.couldNot + 0.5, 0.35), hop = Math.sin(Math.PI * back) * 14;
    for (let j = 0; j < 3; j++) {
      const x = bx + 60 + j * 70 + 110 * go - 46 * back, moving = go > 0 && go < 1;
      (moving ? g3Walker : (xx, yy, HH, o) => deva(xx, yy, HH, o))(x, gy + 30 - hop, 20, { kind: 'deva', key: key + 'o' + j, u: k, turn: 0.5, eyes: back > 0 ? 'down' : 'open' }, st + j);
    }
  }
  ctx.restore();
  dr(P, u, key + 'box', { w: 3.6 });
}
SCENES.retreat = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.9, 'messA');
  retreatBox(0, ev(ERA_T[ERA.retreat] - 0.1, 0.4), 'rb0');
  // the next two frames are pencilled in early (empty), waiting for their part of the story
  for (const j of [1, 2]) { const [bx, by] = G3R.boxes[j], ink = j === 1 ? ev(cu.spread - 0.3, 0.5) : ev(cu.tried - 0.3, 0.5); if (ink <= 0) dr(sketchBox(bx, by, G3R.w, G3R.h, 6), ev(ERA_T[ERA.retreat] + 0.9 + (j - 1) * 0.6, 0.6), 'rbp' + j, { pencilOnly: true, pa: 0.5, pw: 2 }); }
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
  { kind: 'shiva', x: 210, y: 1060, H: 56, turn: 0.5, cue: 'shiva' }, { kind: 'brahma', x: 840, y: 1090, H: 40, cue: 'brahma2' },
  { kind: 'deva', x: 180, y: 1270, H: 58, turn: 0.6, cue: 'others' }, { kind: 'deva', x: 890, y: 1270, H: 58, turn: -0.6, cue: 'others' },
];
const G3_ORDER = [5, 3, 1, 0, 2, 4, 6];   // the energies sweep round the ring: bottom-left .. bottom-right
const G3_CHEST = (f) => (f.kind === 'brahma' ? [f.x, f.y - 3.0 * f.H] : [f.x, f.y - 5.2 * f.H]);
const g3FigU = (f, i) => (f.cue === 'others' ? ev(CUES.others - 1.0 + [0, 0.3, 0, 0, 0, 0.6, 0.9][i] * 0.75, 0.85) : ev(CUES[f.cue] - 0.2, 0.9));   // the others are drawn on as the list runs on
function gatherRing(always) {
  G3_RING.forEach((f, i) => {
    const u = always ? 1 : g3FigU(f, i);
    if (u <= 0) return;
    const o = f.kind === 'brahma' ? { kind: 'brahma', u, key: 'gb' + i, halo: false } : { kind: f.kind, turn: f.turn, u, key: 'gd' + i };
    if (u >= 1) g3Breath(f.x, f.y, f.H, o, i);
    else if (f.kind === 'brahma') brahma(f.x, f.y, f.H, o); else deva(f.x, f.y, f.H, o);
  });
}
// the gesture: before they are named, the pencil finds each place in the ring (a head, a spine, a ground tick)
function g3Gesture(f, i, u) {
  if (u <= 0) return;
  const hh = f.kind === 'brahma' ? 3.6 : 6.85, top = f.y - hh * f.H, r = 0.36 * f.H;
  dr(loopPts(f.x, top, r, r * 1.15, 0.1), seg(u, 0, 0.45), 'gg' + i + 'h', { pencilOnly: true, pa: 0.5, pw: 2 });
  dr(spl([[f.x, top + r * 1.2], [f.x + 4, (top + f.y) / 2], [f.x, f.y - 6]]), seg(u, 0.35, 0.8), 'gg' + i + 's', { pencilOnly: true, pa: 0.45, pw: 2 });
  dr([[f.x - 0.8 * f.H, f.y], [f.x + 0.8 * f.H, f.y]], seg(u, 0.75, 1), 'gg' + i + 'g', { pencilOnly: true, pa: 0.45, pw: 2 });
}
SCENES.gather = function () {
  const cu = CUES, t0 = ERA_T[ERA.gather], t1 = ERA_T[ERA.energy]; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.9 - 0.1 * seg(TT, t0, cu.together) - 0.4 * seg(TT, cu.together, t1), 'messA');   // the smudges recede
  // gentle background life: one boiling margin star, a single bird crossing slowly
  doodleStar(150, 330, 16 + (B % 2), 'gstar', { a: 0.6 });
  g3Bird(980 - 34 * (TT - t0), 420 + 10 * Math.sin(TT * 1.4), 0.6, Math.floor(B / 2) % 2, 'gbird');
  gpencil(ellipsePts(G3G.c[0], G3G.c[1] + 40, 330, 90, 0, 64), { key: 'gfloor', w: 2.2, a: 0.8, closed: true });   // the arch became this ring
  // the pencil finds the places, one after another, before the names come
  G3_RING.forEach((f, i) => { if (g3FigU(f, i) < 1) g3Gesture(f, i, ev(t0 + 0.9 + G3_ORDER.indexOf(i) * 0.42, 0.45)); });
  gatherRing(false);
  // the first terracotta in the piece: one dot, on "together"; at the end it grows (the bridge)
  const d = ev(cu.together, 0.25), g = ev(t1 - 1.0, 0.6), r = 15 + 55 * EZ.io(g) + (g <= 0 ? (B % 4 < 2 ? 0 : 1) : 0);
  if (d > 0) { const P = loopPts(G3G.c[0], G3G.c[1], r * EZ.back(d), r * EZ.back(d), 0.04); gfill(P, NV.terra, { off: [0, 0], key: 'dot11', a: 0.9 }); if (g > 0) scribbleFill(P, NV.terraD, { key: 'dot11s', gap: 9, w: 3, base: 0 }); }
  penDraw(0.8);
  cap(['they came together'], [0, 'together'], cu.together - 0.6, cu.together + 0.1);
};
CAMS.gather = (t) => push(t, ERA_T[ERA.energy] - 1.0, ERA_T[ERA.energy] - 0.4, { z: 1.8, p: G3G.c, to: [540, 900] });
BRIDGE_IN.gather = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1] + 40, 330, 90, 0, 64), c: NV.graph });
BRIDGE_OUT.gather = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1], 70, 70, 0, 64), c: NV.terra });
BOARD.gather = [{ t: ERA_T[ERA.energy] - 1.1, title: 'the devas gather; the FIRST terracotta dot', sound: 'near silence: a single soft tone on the dot', next: 'the dot grows' }];

// one energy line per deva, in a sweep round the ring, on a 3-16th grid (7 lines fit between the bridges)
const g3LineT = (k) => q8(ERA_T[ERA.energy] + 1.0) + k * E16 * 3;
SCENES.energy = function () {
  const cu = CUES, t0 = ERA_T[ERA.energy], t1 = ERA_T[ERA.merge]; PEN = null;
  sketchPage({ grid: 'dots' });
  navMess(0.35 - 0.15 * seg(TT, t0, t1), 'messA');
  doodleStar(150, 330, 16 + (B % 2), 'gstar', { a: 0.6 });
  gpencil(ellipsePts(G3G.c[0], G3G.c[1] + 40, 330, 90, 0, 64), { key: 'gfloor', w: 2.2, a: 0.8, closed: true });
  gatherRing(true);
  // one terracotta line per deva, from the chest to the centre; the pencil rides each one; the centre grows on each arrival
  let arrived = 0, lastHit = -1;
  G3_ORDER.forEach((i, k) => {
    const f = G3_RING[i], [hx, hy] = G3_CHEST(f), ts = g3LineT(k), t = ev(ts, 0.3);
    if (t <= 0) return;
    const L = [[hx, hy], [lerp(hx, G3G.c[0], 0.5) + 10 * Math.sin(i), lerp(hy, G3G.c[1], 0.5)], G3G.c];
    gline(L, { w: 4.4, col: NV.terra, key: 'en' + i, part: t, amp: 1.2 });
    if (t < 1) { const e = writeEnd(L, t); PEN = toScreen(e[0], e[1]); }
    else { arrived++; lastHit = ts + 0.3; }
    // a small chest glow (ray ticks) as each one gives
    if (t > 0 && t < 1) rayRing(hx, hy, 14, 30, 6, 1, { col: NV.terra, w: 2.4, key: 'cg' + i });
  });
  const pop = lastHit > 0 ? 1 + 0.12 * Math.sin(Math.PI * clamp((TT - lastHit) / 0.25)) : 1;
  const r = (70 + 48 * arrived / G3_RING.length) * pop, P = loopPts(G3G.c[0], G3G.c[1], r, r, 0.04);
  gfill(P, NV.terra, { off: [0, 0], key: 'core12', a: 0.85 }); scribbleFill(P, NV.terraD, { key: 'core12s', gap: 9, w: 3, base: 0 });
  rayRing(G3G.c[0], G3G.c[1], r + 14, r + 40, 16, ev(g3LineT(4), 0.9), { col: NV.terra, w: 3, key: "cr12" });
  penDraw(0.8);
  cap(['each gave light'], [0, 'light'], cu.released - 0.3, cu.energy);
};
CAMS.energy = (t) => camMix(camOf({ z: 1.8, p: G3G.c, to: [540, 900] }), CAM0, EZ.io(seg(t, ERA_T[ERA.energy] + 0.05, ERA_T[ERA.energy] + 0.9)));
BRIDGE_IN.energy = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1], 70, 70, 0, 64), c: NV.terra });
BRIDGE_OUT.energy = () => ({ P: ellipsePts(G3G.c[0], G3G.c[1], 118, 118, 0, 64), c: NV.terra });
BOARD.energy = [{ t: ERA_T[ERA.merge] - 0.8, title: 'each gave light: terracotta lines to the centre, one per beat', sound: 'silence act: soft ticks only', next: 'push into the centre' }];
