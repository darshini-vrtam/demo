// =====================================================================
//  GROUP 1 — beats 1–4: the three worlds, he enters, tapasya, time passes. Eras: worlds, power, tapasya, time.
//  World coords 1080x1920 (the page). Graphite + ink only (no terracotta before beat 11).
// =====================================================================
const G1 = { fig: [540, 1218] };   // the tiny figure on the ridge (feet)

// a standing silhouette (for morphs): head, crown, shoulders, legs as one closed outline. h = height, feet at (x, y)
function standSil(x, y, h) {
  const k = h / 720;
  const P = [[-30, 0], [-62, -300], [-100, -420], [-100, -560], [-60, -590], [-56, -650], [-70, -700], [-30, -745], [0, -790], [30, -745], [70, -700], [56, -650], [60, -590], [100, -560], [100, -420], [62, -300], [30, 0]];
  return P.map(([px, py]) => [x + px * k, y + py * k]);
}
// a temple: a shikhara (a curved tower) on a plinth, an amalaka disc and a pot on top, a flag
function temple(x, y, s, u, key) {
  const N = 5, D = (P, k, kk, o = {}) => dr(P, stag(u, k, N), key + kk, { w: 4, ...o });
  const pl = [[x - 70 * s, y], [x - 70 * s, y - 22 * s], [x + 70 * s, y - 22 * s], [x + 70 * s, y]];
  const tw = [[x - 52 * s, y - 22 * s], [x - 50 * s, y - 90 * s], [x - 38 * s, y - 150 * s], [x - 14 * s, y - 188 * s], [x + 14 * s, y - 188 * s], [x + 38 * s, y - 150 * s], [x + 50 * s, y - 90 * s], [x + 52 * s, y - 22 * s]];
  if (u > 0.3) gfill([...tw, ...pl.slice().reverse()], NV.paper, { off: [0, 0], key: key + 'f' });
  D(pl, 0, 'pl'); D(tw, 1, 'tw');
  for (let i = 1; i <= 3; i++) D([[x - (52 - i * 4) * s, y - (22 + i * 38) * s], [x + (52 - i * 4) * s, y - (22 + i * 38) * s]], 2, 'band' + i, { w: 2.6, second: false });
  D([[x - 14 * s, y - 22 * s], [x - 14 * s, y - 62 * s], [x, y - 76 * s], [x + 14 * s, y - 62 * s], [x + 14 * s, y - 22 * s]], 2, 'door', { w: 3 });
  D(loopPts(x, y - 198 * s, 24 * s, 10 * s, 0.08), 3, 'am', { w: 3 });
  D([[x - 8 * s, y - 208 * s], [x - 10 * s, y - 226 * s], [x, y - 236 * s], [x + 10 * s, y - 226 * s], [x + 8 * s, y - 208 * s]], 3, 'pot', { w: 3, second: false });
  D([[x, y - 236 * s], [x, y - 290 * s]], 4, 'pole', { w: 2.6, second: false });
  D([[x, y - 290 * s], [x + 44 * s, y - 278 * s + 6 * s * Math.sin(B * 0.8)], [x, y - 266 * s]], 4, 'flag', { w: 2.6, second: false });
  if (u >= 1) { ctx.save(); gclip(tw); ghatch(x + 10 * s, y - 190 * s, x + 60 * s, y - 22 * s, { ang: -1.1, gap: 8, col: NV.graph, w: 1.8, a: 0.4, key: key + 'h' }); ctx.restore(); }
}
// a cloud bank: a run of scallops along y
function cloudBank(x0, x1, y, r, u, key) {
  const P = []; let x = x0, i = 0;
  while (x < x1) { const rr = r * (0.75 + 0.35 * ((i * 7) % 3) / 2); P.push(...arcPts(x + rr, y, rr, Math.PI, TAU, 8)); x += rr * 1.7; i++; }
  dr(P, u, key, { w: 3.4, second: false });
  return P;
}
// a spiky fortress: towers with spear tops, a crenellated wall, a gate; heavy graphite cross-hatching
function fortress(cx, y, s, u, key, o = {}) {
  const N = 6, D = (P, k, kk, oo = {}) => dr(P, stag(u, k, N), key + kk, { w: 4.5, ...oo });
  const towers = o.towers ?? [[-300, 150, 60], [-200, 230, 70], [-90, 300, 80], [90, 300, 80], [200, 230, 70], [300, 150, 60]];
  const outline = [];
  towers.forEach(([tx, th, tw], i) => {
    const P = [[cx + (tx - tw / 2) * s, y], [cx + (tx - tw / 2) * s, y - th * s], [cx + (tx - tw / 2 - 8) * s, y - (th + 10) * s], [cx + tx * s, y - (th + 80) * s], [cx + (tx + tw / 2 + 8) * s, y - (th + 10) * s], [cx + (tx + tw / 2) * s, y - th * s], [cx + (tx + tw / 2) * s, y]];
    if (u > 0.2) gfill(P, NV.paper, { off: [0, 0], key: key + 'tf' + i });
    D(P, 1 + (i % 3), 'tw' + i);
    D([[cx + tx * s, y - (th + 80) * s], [cx + tx * s, y - (th + 120) * s]], 4, 'sp' + i, { w: 3, second: false });   // spear tip
    if (u >= 0.7) { ctx.save(); gclip(P); ghatch(cx + (tx - tw) * s, y - (th + 90) * s, cx + (tx + tw) * s, y, { ang: -0.9, gap: 7, col: NV.graph, w: 2, a: 0.55 * seg(u, 0.7, 0.9), key: key + 'h1' + i }); ghatch(cx + (tx - tw) * s, y - (th + 90) * s, cx + (tx + tw) * s, y, { ang: 0.7, gap: 9, col: NV.graph, w: 1.8, a: 0.4 * seg(u, 0.8, 1), key: key + 'h2' + i }); ctx.restore(); }
    for (let w = 0; w < 2; w++) D([[cx + (tx - 8) * s, y - (th * (0.45 + w * 0.25)) * s], [cx + (tx - 8) * s, y - (th * (0.45 + w * 0.25) + 24) * s], [cx + (tx + 8) * s, y - (th * (0.45 + w * 0.25) + 24) * s], [cx + (tx + 8) * s, y - (th * (0.45 + w * 0.25)) * s]], 5, 'win' + i + w, { w: 2.6, second: false });
    outline.push(...P);
  });
  // the wall with crenellations and the gate arch
  const WW = o.wall ?? 350, wall = []; for (let i = 0; i <= Math.round(WW / 25); i++) { const x = cx + (-WW + i * 50) * s; wall.push([x, y - (i % 2 ? 70 : 92) * s], [x + 50 * s, y - (i % 2 ? 70 : 92) * s]); }
  const wallP = [[cx - WW * s, y], ...wall.filter(([x]) => x <= cx + WW * s), [cx + WW * s, y]];
  if (u > 0.1) gfill(wallP, NV.paper, { off: [0, 0], key: key + 'wf' });
  D(wallP, 0, 'wall');
  if (u >= 0.6) { ctx.save(); gclip(wallP); ghatch(cx - WW * s, y - 100 * s, cx + WW * s, y, { ang: -0.9, gap: 8, col: NV.graph, w: 2, a: 0.45 * seg(u, 0.6, 0.8), key: key + 'wh' }); ctx.restore(); }
  const gate = [[cx - 46 * s, y], ...arcPts(cx, y - 70 * s, 46 * s, Math.PI, TAU, 12), [cx + 46 * s, y]];
  gfill(gate, NV.ink, { off: [0, 0], key: key + 'gf', a: 0.85 * seg(u, 0.5, 0.8) });
  D(gate, 2, 'gate');
  return { gate, outline };
}
// ---- era: the three worlds
function worldsPage(done, rv = 1) {
  const cu = CUES, E = done ? () => 1 : ev, R = done ? () => rv : ev;   // rv: the top and bottom bands' write-on in the ending if (!done) PEN = null;
  sketchPage({ grid: 'dots' });
  // three faint pencil bands ruled across the page first (the "three worlds" are three rows of one page)
  const rule = E(0.4, 0.9);
  gpencil([[90, 650], [990, 646]], { key: 'band1', part: rule, a: 0.5, w: 2 });
  gpencil([[90, 975], [990, 979]], { key: 'band2', part: seg(rule, 0.3, 1), a: 0.5, w: 2 });
  // margin labels in pencil, written as the voice names them
  const lab = (s, y, t) => handLetter(s, 96, y, 46, { align: 'left', col: NV.graph, reveal: E(t, 0.4), key: 'lab' + s, jit: 0.8 });
  if (!done || rv > 0) { lab('devas', 300, VW('b01_worlds', 'devas')); lab('humans', 712, VW('b01_worlds', 'humans')); lab('asuras', 1036, cu.asuras); }
  // svarga: temples on clouds
  const uD = R(VW('b01_worlds', 'devas') - 0.2, 2.0);
  cloudBank(150, 950, 600, 46, uD, 'cl1');
  cloudBank(260, 820, 625, 30, seg(uD, 0.2, 1), 'cl2');
  temple(330, 590, 0.95, seg(uD, 0.2, 0.75), 'tA'); temple(560, 580, 1.25, seg(uD, 0.3, 0.9), 'tB'); temple(780, 592, 0.9, seg(uD, 0.4, 1), 'tC');
  for (let i = 0; i < 3; i++) doodleStar(190 + i * 330 + 40 * Math.sin(i * 2), 360 + 30 * (i % 2), 16 + 5 * ((B + i) % 3 === 0), 'sv' + i, { part: uD });
  // bhuloka: hills, a river, little houses, trees
  const uH = E(VW('b01_worlds', 'humans') - 0.2, 2.0);
  dr([[90, 900], [260, 820], [420, 860], [600, 790], [780, 850], [990, 810]], stag(uH, 0, 4), 'hill1', { w: 4 });
  dr([[90, 950], [300, 930], [520, 945], [760, 925], [990, 940]], stag(uH, 1, 4), 'hill2', { w: 3, second: false });
  ctx.save(); ctx.setLineDash([16, 12]); gpencil([[200, 960], [380, 905], [520, 900], [700, 880], [900, 905]], { key: 'river', part: stag(uH, 1, 4), w: 2.6, a: 0.7 }); ctx.restore();
  [[330, 868], [470, 872], [650, 846]].forEach(([hx, hy], i) => {
    const P = [[hx - 26, hy], [hx - 26, hy - 34], [hx, hy - 58], [hx + 26, hy - 34], [hx + 26, hy]];
    if (uH > 0.4) gfill(P, NV.paper, { off: [0, 0], key: 'hsf' + i });
    dr(P, stag(uH, 2 + (i % 2), 4), 'hs' + i, { w: 3.2, second: false });
    if (uH >= 1) gpencil([[hx + 12, hy - 52], [hx + 16 + 6 * Math.sin(TT * 3 + i), hy - 80], [hx + 10 + 8 * Math.sin(TT * 3 + i + 1), hy - 104]], { key: 'smk' + i, w: 2, a: 0.5 });
  });
  [[220, 838], [820, 840], [900, 822]].forEach(([tx, ty], i) => { dr([[tx, ty + 20], [tx, ty - 10]], stag(uH, 3, 4), 'tt' + i, { w: 3, second: false }); dr(loopPts(tx, ty - 34, 24, 28, 0.08), stag(uH, 3, 4), 'tc' + i, { w: 3, second: false }); });
  // patala: the spiky fortress, heavy with graphite
  const uA = R(cu.asuras - 0.1, 2.4);
  fortress(540, 1196, 0.55, uA, 'fortA', { wall: 640, towers: [[-560, 110, 80], [-380, 170, 90], [-190, 240, 100], [190, 240, 100], [380, 170, 90], [560, 110, 80]] });
  dr([[90, 1236], [300, 1214], [460, 1222], [540, 1218], [700, 1226], [990, 1210]], stag(uA, 0, 3), 'ridge', { w: 5 });
  if (uA >= 0.6) { ctx.save(); gclip([[90, 1236], [990, 1210], [990, 1290], [90, 1290]]); ghatch(90, 1210, 990, 1290, { ang: -0.9, gap: 10, col: NV.graph, w: 2, a: 0.35, key: 'ridgeh' }); ctx.restore(); }
  // the tiny figure on the ridge (Mahishasura), inked when he is named
  const uF = R(cu.named - 0.1, 0.9);
  if (uF > 0) { const P = standSil(G1.fig[0], G1.fig[1], 92); if (uF > 0.5) gfill(P, NV.ink, { off: [0, 0], key: 'figf', a: seg(uF, 0.5, 1) }); dr(P, uF, 'fig', { closed: true, w: 3 }); }
  // background life: two birds over the hills
  for (let i = 0; i < 2; i++) doodleBird(860 - 60 * (TT % 9) + i * 50, 720 + i * 26, 1, (B + i) % 2, 'b1bird' + i);
  if (!done) { penDraw(0.9); cap(['three worlds'], [0, 'worlds'], cu.worlds - 0.25, cu.worlds + 0.3); }
}
SCENES.worlds = () => worldsPage(false);
CAMS.worlds = (t) => push(t, VL('b01_worlds').t1 - 0.6, ERA_T[ERA.power] - 0.25, { z: 2.6, p: [G1.fig[0], G1.fig[1] - 46], to: [540, 820] });
BRIDGE_OUT.worlds = () => ({ P: standSil(G1.fig[0], G1.fig[1], 92), c: NV.graph });
BOARD.worlds = [{ t: VL('b01_worlds').t1 - 0.8, title: 'three worlds; the tiny figure on the ridge', sound: 'thin pad, pencil scratch on 16ths', next: 'the figure grows into Mahishasura' }];

// ---- eras still to draw (storyboard stage)
// ---- era: he enters (beat 2). The forest in tree outlines, Mahishasura striding in, his name lettered and underlined in red.
const G1P = { x: 600, y: 1290, H: 125 };
const G1P_CROWN = () => [G1P.x + 0.16 * G1P.H, G1P.y - 7.27 * G1P.H - 0.3 * G1P.H];
// a forest tree: two trunk lines with a fork, a crown of looping outline; far trees stay pencil, near trees are inked
function forestTree(x, y, h, w, u, key, near) {
  const D = (P, k, kk, o = {}) => (near ? dr(P, stag(u, k, 3), key + kk, { w: 3.6, ...o }) : gpencil(P, { key: key + kk, part: stag(u, k, 3), w: 2.4, a: 0.7 }));
  D([[x - w * 0.12, y], [x - w * 0.1, y - h * 0.5], [x - w * 0.16, y - h * 0.78]], 0, 't1'); D([[x + w * 0.12, y], [x + w * 0.1, y - h * 0.5], [x + w * 0.2, y - h * 0.8]], 0, 't2');
  D([[x - w * 0.1, y - h * 0.62], [x - w * 0.4, y - h * 0.82]], 1, 'b1'); D([[x + w * 0.1, y - h * 0.58], [x + w * 0.45, y - h * 0.8]], 1, 'b2');
  const C = []; for (let i = 0; i <= 9; i++) { const a = Math.PI * (0.95 + 1.1 * i / 9), r = w * (0.7 + 0.12 * Math.sin(i * 2.3)); C.push([x + Math.cos(a) * r, y - h * 0.86 + Math.sin(a) * r * 0.6]); }
  D(spl(C), 2, 'cr');
  if (near && u >= 1) { ctx.save(); gclip([[x + w * 0.02, y], [x + w * 0.12, y - h * 0.5], [x + w * 0.2, y - h * 0.8], [x + w * 0.1, y - h * 0.8], [x + w * 0.02, y - h * 0.5]]); ghatch(x - w * 0.2, y - h, x + w * 0.3, y, { gap: 6, a: 0.5, key: key + 'h' }); ctx.restore(); }
}
SCENES.power = function () {
  const cu = CUES, t0 = ERA_T[ERA.power]; PEN = null;
  sketchPage({ grid: 'dots' });
  // far trees in pencil, near trees inked (they frame him; none in the top-left where his name goes)
  [[150, 1250, 760, 110, 0], [900, 1240, 820, 130, 0.1], [760, 1260, 600, 90, 0.2]].forEach(([x, y, h, w, d], i) => forestTree(x, y, h, w, ev(t0 + d, 1.2), 'ft' + i, false));
  [[70, 1300, 700, 120, 0.4], [330, 1300, 820, 110, 0.3]].forEach(([x, y, h, w, d], i) => forestTree(x, y, h, w, ev(t0 + d, 1.2), 'fn' + i, true));
  dr([[60, 1296], [300, 1290], [620, 1294], [1000, 1288]], ev(t0, 0.8), 'ground', { w: 4 });
  for (let i = 0; i < 3; i++) gpencil([[300 + i * 170, 1296], [330 + i * 170 + 8 * ((B + i) % 2), 1288]], { key: 'gr' + i, w: 2.2, a: 0.6 });   // grass ticks
  // he strides in: drawn pencil-first then inked as the line begins
  mahishasura(G1P.x, G1P.y, G1P.H, { pose: 'walk', u: ev(t0 + 0.15, 2.4), key: 'mhP' });
  // his name, lettered as it is spoken, the scene's one red: the underline
  const [n0, n1] = handLetter('Mahishasura', 92, 318, 66, { align: 'left', reveal: ev(cu.name2 - 0.1, 0.7), key: 'name2', face: 'marker' });
  underline(n0, n1, 340, { col: NV.red, w: 6, key: 'nameU', part: ev(cu.name2 + 0.7, 0.3) });
  for (let i = 0; i < 2; i++) doodleBird(820 + 60 * Math.sin(TT * 0.7 + i), 330 + i * 28, 1.1, (B + i) % 2, 'pb' + i);
  penDraw(0.9);
  cap(['he wanted power'], [0, 'power'], cu.power - 0.6, cu.power + 0.05);
};
CAMS.power = (t) => push(t, VL('b02_power').t1 - 0.1, ERA_T[ERA.tapasya] - 0.3, { z: 2.4, p: G1P_CROWN(), to: [540, 760] });
BRIDGE_IN.power = () => ({ P: standSil(G1P.x + 0.1 * G1P.H, G1P.y, 8.1 * G1P.H), c: NV.graph });
BRIDGE_OUT.power = () => { const [cx, cy] = G1P_CROWN(); return { P: crownPts(cx, cy + 0.3 * G1P.H, 0.78 * G1P.H, 0.66 * G1P.H), c: NV.graph }; };
BOARD.power = [{ t: VL('b02_power').t1 - 0.3, title: 'he strides in; his name, red underline', sound: 'pad + pencil scratch on 16ths', next: 'his crown becomes the tree trunk' }];
// ---- era: tapasya (beat 3). A huge tree, he sits cross-legged beneath it; breath ticks, falling leaves; a sun through the branches.
const G1T = { x: 540, y: 1276, H: 84, trunk: [540, 700], sun: [835, 345, 62] };
function bigTree(u, key) {
  const D = (P, k, kk, o = {}) => dr(P, stag(u, k, 4), key + kk, { w: 4.4, ...o });
  // the trunk with roots, flaring at the base; branches; the canopy as a loose looping outline
  const L = [[230, 1292], [330, 1250], [350, 1100], [372, 900], [350, 720], [300, 600], [220, 520]], R = [[850, 1292], [750, 1250], [730, 1100], [708, 900], [730, 720], [780, 600], [860, 520]];
  const trunk = spl([...L, ...R.slice().reverse()], true);
  paperFill(trunk, key + 'tf', clamp(u * 3)); D(spl(L), 0, 'tL'); D(spl(R), 0, 'tR', { w: 5.4 });
  if (u >= 1) { shade(spl([[660, 1290], [740, 1240], [722, 1000], [704, 800], [730, 680], [660, 680], [640, 900], [650, 1200]], true), key + 'tsh', { a: 0.55, gap: 6 }); for (let i = 0; i < 8; i++) gpencil([[390 + i * 40, 1180 - (i % 4) * 90], [398 + i * 38, 1080 - (i % 4) * 90]], { key: key + 'bark' + i, w: 2, a: 0.6 }); }
  [[[360, 760], [240, 640], [140, 600]], [[720, 740], [840, 640], [940, 600]], [[540, 700], [540, 470]], [[300, 600], [220, 470]], [[780, 600], [880, 470]]].forEach((P, i) => D(spl(P), 1, 'br' + i, { w: 4 }));
  const C = []; for (let i = 0; i <= 16; i++) { const a = Math.PI * (0.92 + 1.16 * i / 16), r = 470 + 40 * Math.sin(i * 2.1); C.push([540 + Math.cos(a) * r, 640 + Math.sin(a) * r * 0.62]); }
  D(spl(C), 2, 'canopy', { w: 4 });
  for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + 0.9 * i / 8), r = 360; gpencil(arcPts(540 + Math.cos(a) * r, 640 + Math.sin(a) * r * 0.55, 48, Math.PI, TAU, 8), { key: key + 'lf' + i, part: stag(u, 3, 4), w: 2.2, a: 0.6 }); }
  [[[230, 1292], [160, 1302]], [[850, 1292], [930, 1302]], [[330, 1260], [290, 1302]], [[750, 1260], [790, 1302]]].forEach((P, i) => D(spl(P), 1, 'root' + i, { w: 3.4 }));
}
SCENES.tapasya = function () {
  const cu = CUES, t0 = ERA_T[ERA.tapasya]; PEN = null;
  sketchPage({ grid: 'dots' });
  // the sun, low in the branches (it carries the next bridge): an ink disc with ray lines
  const [sx, sy, sr] = G1T.sun;
  dr(loopPts(sx, sy, sr, sr, 0.06), ev(t0 + 0.6, 0.6), 'sun3', { w: 4 });
  rayRing(sx, sy, sr + 16, sr + 50, 12, ev(t0 + 1.0, 1.2), { key: 'sr3', w: 3 });
  bigTree(ev(t0 + 0.05, 1.6), 'tree3');
  dr([[60, 1292], [1020, 1290]], ev(t0, 0.6), 'gr3', { w: 3.6 });
  mahishasura(G1T.x, G1T.y, G1T.H, { pose: 'sit', eyes: 'closed', u: ev(cu.forest - 0.3, 2.2), key: 'mh3' });
  // breath: three pencil ticks beside his face, swelling every two beats
  const br = 0.5 + 0.5 * Math.sin(TT * Math.PI / 2);
  if (TT > cu.tapasya - 0.5) for (let i = 0; i < 3; i++) gpencil(arcPts(G1T.x + 120 + i * 18, G1T.y - 3.62 * G1T.H, 26 + i * 16 * br, -0.6, 0.6, 6), { key: 'brt' + i, w: 2.2, a: 0.7 });
  // falling leaves (seeded paths, stepping on 2s)
  for (let i = 0; i < 6; i++) { const R = RNG('leaf3', i), x0 = R.r(200, 900), ph = R.f(), f = ((TT - t0) * 0.16 + ph) % 1, x = x0 + 60 * Math.sin(f * 9 + i), y = 560 + f * 700, a = Math.sin(f * 7 + i);
    gline([[x - 12 * Math.cos(a), y - 6 * Math.sin(a)], [x, y - 8], [x + 12 * Math.cos(a), y + 6 * Math.sin(a)], [x, y + 6], [x - 12 * Math.cos(a), y - 6 * Math.sin(a)]], { w: 2.4, key: 'lv' + i, second: false, amp: 0.6, step: 5 }); }
  penDraw(0.9);
  cap(['a long tapasya'], [0, 'tapasya'], cu.tapasya - 0.7, cu.tapasya + 0.2);
};
CAMS.tapasya = (t) => push(t, VL('b03_tapasya').t1 - 0.1, ERA_T[ERA.time] - 0.2, { z: 2.6, p: G1T.sun.slice(0, 2), to: [540, 760] });
BRIDGE_IN.tapasya = () => ({ P: spl([[350, 1100], [372, 900], [350, 720], [420, 700], [660, 700], [730, 720], [708, 900], [730, 1100]], true), c: NV.graph });
BRIDGE_OUT.tapasya = () => ({ P: ellipsePts(G1T.sun[0], G1T.sun[1], G1T.sun[2], G1T.sun[2], 0, 64), c: NV.graph });
BOARD.tapasya = [{ t: CUES.tapasya + 0.6, title: 'tapasya under the great tree; breath ticks, falling leaves', sound: 'pad, soft leaf ticks', next: 'the sun disc' }];
// ---- era: time passes (beat 4). Six sketched boxes, two per word: sun, dusk, moon, rain, snow, blossom; the same small figure in each.
const G1B = [[110, 300], [590, 300], [110, 640], [590, 640], [110, 980], [590, 980]], G1BW = 380, G1BH = 300;
function seasonBox(i, u, key) {
  const [bx, by] = G1B[i], cx = bx + G1BW / 2, gy = by + G1BH - 50;
  if (u <= 0) return;
  ctx.save(); const P = sketchBox(bx, by, G1BW, G1BH, 6); gfill(P, NV.paper, { off: [0, 0], key: key + 'bf', a: clamp(u * 3) });
  gclip(P);
  const k = clamp((u - 0.3) / 0.7);
  if (i === 0) { dr(loopPts(bx + 110, by + 90, 40, 40, 0.06), k, key + 'sun', { w: 3.4 }); rayRing(bx + 110, by + 90, 52, 74, 10, k, { key: key + 'sr', w: 2.6 }); }
  if (i === 1) { dr(arcPts(cx + 70, gy - 70, 56, Math.PI, TAU, 14), k, key + 'dusk', { w: 3.4 }); if (k >= 1) ghatch(bx, by, bx + G1BW, gy - 70, { ang: 0.05, gap: 9, a: 0.4, key: key + 'dh' }); }
  if (i === 2) { const M = spl([[bx + 300, by + 40], [bx + 270, by + 80], [bx + 285, by + 128], [bx + 330, by + 140], [bx + 300, by + 110], [bx + 296, by + 70]], true); dr(M, k, key + 'moon', { w: 3.2, closed: true }); if (k >= 1) shade(M, key + 'msh', { a: 0.5 }); for (let j = 0; j < 4; j++) doodleStar(bx + 60 + j * 60, by + 50 + (j % 2) * 40, 10 + 3 * ((B + j) % 3 === 0), key + 'st' + j, { part: k }); ghatch(bx, by, bx + G1BW, by + 150, { ang: 0.0, gap: 14, a: 0.25 * k, key: key + 'nh' }); }
  if (i === 3) { for (let j = 0; j < 14; j++) { const x = bx + 20 + j * 27, y0 = by + 20 + ((j * 37 + B * 9) % 60); gpencil([[x, y0], [x - 14, y0 + 44]], { key: key + 'rn' + j, part: k, w: 2.2, a: 0.75 }); } }
  if (i === 4) { for (let j = 0; j < 9; j++) { const R = RNG('snow', j), x = bx + R.r(30, G1BW - 30), y = by + 30 + ((R.r(0, 180) + (TT * 30)) % 180); for (let a = 0; a < 3; a++) gpencil([[x - 9 * Math.cos(a), y - 9 * Math.sin(a * 1.05)], [x + 9 * Math.cos(a), y + 9 * Math.sin(a * 1.05)]], { key: key + 'sn' + j + a, part: k, w: 1.8, a: 0.8, passes: 1 }); } dr([[bx, gy - 4], [cx, gy - 18], [bx + G1BW, gy - 6]], k, key + 'drift', { w: 3, second: false }); }
  if (i === 5) { dr(spl([[bx + 20, by + 70], [bx + 120, by + 100], [bx + 220, by + 90], [bx + 330, by + 60]]), k, key + 'branch', { w: 3.4, second: false }); for (let j = 0; j < 6; j++) { const fx = bx + 50 + j * 50, fy = by + 85 + 12 * Math.sin(j * 1.7); for (let q = 0; q < 5; q++) { const a = q / 5 * TAU; gpencil(loopPts(fx + Math.cos(a) * 9, fy + Math.sin(a) * 9, 6, 6, 0.1), { key: key + 'bl' + j + q, part: k, w: 1.8, a: 0.85, passes: 1 }); } } }
  dr([[bx, gy], [bx + G1BW, gy]], k, key + 'gl', { w: 2.6, second: false });
  mahishasura(cx, gy, 24, { pose: 'sit', eyes: 'closed', u: k, key: key + 'mh' });
  ctx.restore();
  dr(P, u, key + 'box', { w: 3.6 });
}
SCENES.time = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  cu.boxes.forEach((t, i) => seasonBox(i, ev(t - 0.05, 0.45), 'sb' + i));
  // a tally of passing time in the margin: one tick per box
  penDraw(0.8);
  cap(['years'], [0, 'years'], cu.years - 0.3, cu.years + 0.15);
};
CAMS.time = (t) => {
  const t0 = ERA_T[ERA.time], t1 = ERA_T[ERA.stop];
  const sun = camOf({ z: 3.0, p: [G1B[0][0] + 110, G1B[0][1] + 90], to: [540, 760] }), last = camOf({ z: 1.9, p: [G1B[5][0] + G1BW / 2, G1B[5][1] + G1BH / 2], to: [540, 760] });
  return camMix(camMix(sun, CAM0, EZ.io(seg(t, t0 + 0.1, t0 + 0.8))), last, EZ.io(seg(t, t1 - 0.9, t1 - 0.3)));
};
BRIDGE_IN.time = () => ({ P: ellipsePts(G1B[0][0] + 110, G1B[0][1] + 90, 40, 40, 0, 64), c: NV.graph });
BRIDGE_OUT.time = () => ({ P: sketchBox(G1B[5][0], G1B[5][1], G1BW, G1BH, 6, 0), c: NV.graph });
BOARD.time = [{ t: CUES.years + 0.9, title: 'six boxes: days, months, years', sound: 'a tick per box', next: 'the last box fills the page (d 0.4)' }];
