// =====================================================================
//  GROUP 4 — beats 13–16: the lights merge (silence), THE ONE HARD CUT to Devi Durga on her lion (loudest hit),
//  nine rings, the first light to the mountains, the cliffhanger and the title. Eras: merge, durga, light, who.
//  Terracotta is Shakti: the goddess, her rays, the comet. Red marker: the SHAILAPUTRI underline only.
// =====================================================================
const G4 = { centre: [540, 800], ringR: 430 };

// the lion, side view facing right; mane scribbled terracotta, body inked with hatching
function lion(u, key = 'lion') {
  const N = 6, D = (P, k, kk, o = {}) => dr(P, stag(u, k, N), key + kk, { w: 4.6, ...o });
  const body = [[330, 1000], [420, 960], [560, 955], [700, 965], [770, 990], [790, 1060], [760, 1110], [640, 1130], [480, 1132], [360, 1120], [310, 1070]];
  if (u > 0.2) gfill(body, NV.paper, { off: [0, 0], key: key + 'bf' });
  D(body, 0, 'body', { closed: true });
  if (u >= 1) { ctx.save(); gclip(body); ghatch(300, 1060, 800, 1140, { ang: -0.9, gap: 9, col: NV.graph, w: 2, a: 0.45, key: key + 'bh' }); ctx.restore(); }
  // legs (calm, standing)
  [[[360, 1100], [350, 1180], [356, 1232], [392, 1234]], [[420, 1110], [430, 1180], [426, 1232], [462, 1234]], [[700, 1110], [704, 1180], [698, 1232], [734, 1234]], [[752, 1090], [770, 1170], [766, 1232], [802, 1234]]]
    .forEach((P, i) => { D(P, 1, 'leg' + i); D(P.map(([x, y]) => [x + 30, y]).slice(0, 3), 1, 'legb' + i, { w: 3, second: false }); });
  // tail curling up behind, with a tuft
  D([[320, 1010], [260, 990], [230, 930], [252, 880], [290, 870]], 2, 'tail', { w: 4 });
  D([[290, 870], [312, 852], [300, 880], [322, 876]], 2, 'tuft', { w: 3.2, second: false });
  // the mane: a scribbled terracotta ring, then ink strands; the head and muzzle on top
  const mane = loopPts(830, 930, 118, 126, 0.02, -2.2, 40);
  if (u > 0.5) scribbleFill(mane, NV.terra, { key: key + 'mn', gap: 13, w: 3.6, base: 0.18, part: seg(u, 0.5, 0.9) });
  for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; D([[830 + Math.cos(a) * 80, 930 + Math.sin(a) * 86], [830 + Math.cos(a + 0.12) * 120, 930 + Math.sin(a + 0.12) * 128]], 3, 'ms' + i, { w: 2.8, second: false }); }
  const head = [[790, 880], [850, 868], [900, 900], [924, 940], [916, 980], [880, 1000], [830, 996], [790, 970]];
  gfill(head, NV.paper, { off: [0, 0], key: key + 'hf', a: clamp(u * 3) });
  D(head, 4, 'head', { closed: true });
  D([[886, 946], [904, 956]], 5, 'nose', { w: 4, second: false });
  D(arcPts(850, 920, 9, Math.PI * 0.1, Math.PI * 0.9, 6), 5, 'eye', { w: 3, second: false });   // calm eye
  D([[880, 978], [900, 974]], 5, 'mouth', { w: 2.6, second: false });
  D(arcPts(812, 872, 18, Math.PI, TAU, 8), 5, 'ear', { w: 3, second: false });
}
// a tapered limb outline along a centreline P: width w0 at the start, w1 at the end
function limbPts(P, w0, w1) {
  const Q = resample(P, false, 10), L = [], R = [];
  Q.forEach((p, i) => { const a = Q[Math.max(0, i - 1)], b = Q[Math.min(Q.length - 1, i + 1)], n = [a[1] - b[1], b[0] - a[0]], l = Math.hypot(...n) || 1, w = lerp(w0, w1, i / (Q.length - 1));
    L.push([p[0] + n[0] / l * w, p[1] + n[1] / l * w]); R.push([p[0] - n[0] / l * w, p[1] - n[1] / l * w]); });
  return [...L, ...R.reverse()];
}
// Devi Durga, eight arms, seated on the lion's back. Centre (540, ~760). Ink, terracotta scribble on the sari.
function durga(u, key = 'dg') {
  const N = 8, D = (P, k, kk, o = {}) => dr(P, stag(u, k, N), key + kk, { w: 4.4, ...o });
  const cx = 540, sh = 660;
  // the sari over the lap, one leg hanging down the lion's flank, the other folded
  const skirt = [[456, 820], [430, 900], [420, 960], [470, 1000], [560, 990], [640, 960], [650, 900], [624, 820]];
  const hang = [[446, 960], [438, 1050], [446, 1110], [486, 1112], [490, 1060], [500, 980]];
  gfill(skirt, NV.paper, { off: [0, 0], key: key + 'skf', a: clamp(u * 3) }); gfill(hang, NV.paper, { off: [0, 0], key: key + 'hgf', a: clamp(u * 3) });
  scribbleFill(skirt, NV.terra, { key: key + 'sks', gap: 12, w: 3.6, base: 0.28, part: seg(u, 0.55, 0.95) });
  scribbleFill(hang, NV.terra, { key: key + 'hgs', gap: 12, w: 3.6, base: 0.28, part: seg(u, 0.6, 1) });
  D(skirt, 2, 'skirt', { closed: true }); D(hang, 2, 'hang');
  for (let i = 0; i < 4; i++) D([[480 + i * 36, 840], [470 + i * 40, 980]], 3, 'pleat' + i, { w: 2.4, second: false });
  D([[446, 1112], [430, 1130], [480, 1130]], 3, 'foot', { w: 3, second: false });
  // torso, blouse (terracotta), the end of the sari over the shoulder
  const torso = [[cx - 92, sh], [cx - 80, 740], [cx - 64, 822], [cx + 64, 822], [cx + 80, 740], [cx + 92, sh], [cx + 36, sh - 20], [cx - 36, sh - 20]];
  gfill(torso, NV.paper, { off: [0, 0], key: key + 'tf', a: clamp(u * 3) });
  const blouse = [[cx - 90, sh + 4], [cx - 82, 720], [cx + 82, 720], [cx + 90, sh + 4], [cx + 36, sh - 16], [cx - 36, sh - 16]];
  scribbleFill(blouse, NV.terra, { key: key + 'bls', gap: 11, w: 3.2, base: 0.3, part: seg(u, 0.5, 0.9) });
  D(torso, 1, 'torso', { closed: true });
  D([[cx - 90, sh + 6], [cx + 40, 780], [cx + 70, 822]], 3, 'pallu', { w: 3.2 });
  D([[cx - 50, sh - 14], [cx, sh + 54], [cx + 50, sh - 14]], 3, 'neck1', { w: 3, second: false });
  D([[cx - 62, sh - 10], [cx, sh + 76], [cx + 62, sh - 10]], 3, 'neck2', { w: 2.4, second: false });
  // eight arms fanning out (tapered two-line limbs, paper inside so they overlap cleanly), each holding one thing
  const arms = [[-1, 66, 'trident'], [-1, 38, 'bow'], [-1, 10, 'conch'], [-1, -22, 'lotus'], [1, 66, 'chakra'], [1, 38, 'sword'], [1, 10, 'mace'], [1, -22, 'palm']];
  arms.forEach(([s, deg, what], i) => {
    const a = deg * DEG, x0 = cx + s * 80, y0 = sh + 22 + (deg < 20 ? 26 : 0), L = 172 + (deg > 30 ? 14 : 0);
    const el = [x0 + s * Math.cos(a * 0.55 - 0.25) * L * 0.5, y0 - Math.sin(a * 0.55 - 0.25) * L * 0.5], hd = [x0 + s * Math.cos(a) * L, y0 - Math.sin(a) * L];
    const P = limbPts([[x0, y0], el, hd], 15, 8);
    gfill(P, NV.paper, { off: [0, 0], key: key + 'af' + i, a: clamp(u * 3) });
    D(P, 4, 'arm' + i, { w: 3.2, closed: true, second: false });
    const bx = lerp(el[0], hd[0], 0.72), by = lerp(el[1], hd[1], 0.72), na = Math.atan2(hd[1] - el[1], hd[0] - el[0]) + Math.PI / 2;
    D([[bx + Math.cos(na) * 10, by + Math.sin(na) * 10], [bx - Math.cos(na) * 10, by - Math.sin(na) * 10]], 5, 'bang' + i, { w: 3, second: false });   // a bangle
    const [hx, hy] = hd;
    if (what !== 'palm') D(loopPts(hx, hy, 11, 9, 0.08), 5, 'hand' + i, { w: 2.6, second: false });   // a closed hand
    if (what === 'trident') { D([[hx, hy + 120], [hx, hy - 150]], 6, 'tri0'); D([[hx - 36, hy - 112], [hx - 32, hy - 80], [hx + 32, hy - 80], [hx + 36, hy - 112]], 6, 'tri1'); D([[hx, hy - 80], [hx, hy - 172], [hx - 8, hy - 150], [hx + 8, hy - 150], [hx, hy - 172]], 6, 'tri2'); }
    else if (what === 'bow') { D(arcPts(hx + 40, hy, 90, Math.PI * 0.62, Math.PI * 1.38, 14), 6, 'bow0'); D([[hx - 30, hy - 56], [hx - 30, hy + 56]], 6, 'bow1', { w: 2, second: false }); }
    else if (what === 'conch') D([[hx - 40, hy - 6], [hx - 14, hy - 36], [hx + 2, hy - 30], [hx - 8, hy + 6], [hx - 40, hy - 6]], 6, 'cnc');
    else if (what === 'lotus') { for (let j = -2; j <= 2; j++) D([[hx, hy - 6], [hx + j * 12 - 8, hy - 30 + Math.abs(j) * 6], [hx + j * 14, hy - 50 + Math.abs(j) * 10], [hx + j * 12 + 8, hy - 30 + Math.abs(j) * 6], [hx, hy - 6]], 6, 'lot' + j, { w: 2.8, second: false }); }
    else if (what === 'chakra') { D(loopPts(hx, hy - 40, 36, 36, 0.08), 6, 'chk'); for (let j = 0; j < 8; j++) { const b = j / 8 * TAU + TT * 0.6; D([[hx, hy - 40], [hx + Math.cos(b) * 32, hy - 40 + Math.sin(b) * 32]], 6, 'chs' + j, { w: 2.2, second: false }); } }
    else if (what === 'sword') { D([[hx, hy - 6], [hx + 36, hy - 150], [hx + 48, hy - 146], [hx + 14, hy - 4]], 6, 'swd'); D([[hx - 18, hy - 12], [hx + 30, hy + 4]], 6, 'swh', { w: 3.4, second: false }); }
    else if (what === 'mace') { D([[hx, hy], [hx + 90, hy - 30]], 6, 'mc0'); D(loopPts(hx + 108, hy - 36, 24, 24, 0.08), 6, 'mc1'); }
    else if (what === 'palm') D(palmPts(hx + 4, hy - 26, 0.75), 5, 'plm', { closed: true, w: 3 });
  });
  // hair behind, the face, the crown; the bindi is a terracotta dot
  for (let i = 0; i < 8; i++) { const s = i < 4 ? -1 : 1, j = i % 4; gpencil([[cx + s * (40 + j * 6), sh - 120], [cx + s * (66 + j * 10), sh - 30], [cx + s * (70 + j * 14), sh + 60]], { key: key + 'hr' + i, part: stag(u, 7, N), w: 2.4, a: 0.75 }); }
  const hy = 540, face = loopPts(cx, hy, 50, 60, 0.04, -2.2);
  gfill(face, NV.paper, { off: [0, 0], key: key + 'ff', a: clamp(u * 4) });
  D(face, 0, 'face');
  for (const s of [-1, 1]) {
    const ex = cx + s * 20, ey = hy - 4;
    D([[ex - 13, ey], [ex, ey - 7], [ex + 13, ey], [ex, ey + 5], [ex - 13, ey]], 7, 'eye' + s, { w: 2.8, second: false });
    if (u > 0.9) { ctx.fillStyle = NV.ink; ctx.beginPath(); ctx.arc(ex, ey - 1, 3.6, 0, TAU); ctx.fill(); }
    D([[ex - 14, ey - 16], [ex, ey - 22], [ex + 14, ey - 17]], 7, 'brow' + s, { w: 2.6, second: false });
  }
  D([[cx, hy], [cx - 5, hy + 24], [cx + 5, hy + 26]], 7, 'nose', { w: 2.4, second: false });
  D([[cx - 13, hy + 38], [cx, hy + 42], [cx + 13, hy + 38]], 7, 'mouth', { w: 2.8, second: false });
  if (u > 0.9) { ctx.fillStyle = NV.terra; ctx.beginPath(); ctx.arc(cx, hy - 28, 6, 0, TAU); ctx.fill(); }
  const CP = crownPts(cx, hy - 50, 118, 112);
  gfill(CP, NV.paper, { off: [0, 0], key: key + 'cf', a: clamp(u * 3) });
  D(CP, 1, 'crown');
  for (const s of [-1, 1]) D(loopPts(cx + s * 52, hy + 18, 7, 11, 0.1), 7, 'ear' + s, { w: 2.4, second: false });
}
// ---- era: Durga (the cut lands on a finished frame), then nine rings, one per beat, with tally ticks
SCENES.durga = function () {
  const cu = CUES; PEN = null;
  sketchPage({ grid: 'dots' });
  const [ox, oy] = G4.centre;
  // terracotta rays all round, boiling (glow is lines); a halo ring behind her head
  rayRing(ox, oy, 392, 452, 40, 1, { col: NV.terra, w: 4, key: 'dray', boil: 0.07 });
  rayRing(540, 540, 104, 150, 20, 1, { col: NV.terra, w: 3.2, key: 'dhr', rot: -Math.PI / 2 + 0.15 });
  dr(loopPts(540, 540, 96, 96, 0.06), 1, 'dhalo', { w: 4, col: NV.terraD });
  lion(1);
  durga(1);
  // the nine rings: drawn on the circle around her, one per beat, with a tally in the margin
  cu.rings.forEach((t, i) => {
    const k = ev(t, 0.3); if (k <= 0) return;
    const a = -Math.PI / 2 - Math.PI * 0.8 + i * (Math.PI * 1.6 / 8), x = ox + Math.cos(a) * G4.ringR * 1.04, y = oy + Math.sin(a) * G4.ringR * 1.04;
    gfill(loopPts(x, y, 30, 30, 0), NV.terra, { a: 0.25 * k, off: [3, 3], key: 'rgf' + i });
    gline(loopPts(x, y, 30, 30, 0.08), { w: 4.4, col: NV.terra, key: 'rg' + i, part: k });
    rayRing(x, y, 38, 52, 8, ev(t + 0.2, 0.3), { col: NV.terra, w: 2.4, key: 'rgr' + i });
    // tally: four strokes and a cross-stroke, then four more
    const g = Math.floor(i / 5), j = i % 5, tx = 410 + g * 150 + j * 22;
    if (j < 4) gline([[tx, 1258], [tx + 4, 1300]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
    else gline([[tx - 96, 1294], [tx - 6, 1262]], { w: 4, key: 'tal' + i, part: ev(t, 0.15), second: false });
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

// ---- eras still to draw (storyboard stage)
SCENES.merge = function () { sketchPage({ grid: 'dots' }); cap(['brighter'], [0, 'brighter'], ERA_T[ERA.merge] + 0.3); };
SCENES.light = function () { sketchPage({ grid: 'dots' }); cap(['toward the mountains'], [0, 'mountains'], ERA_T[ERA.light] + 0.3); };
SCENES.who = function () { sketchPage({ grid: 'dots' }); cap(['who was waiting?'], [0, 'waiting'], ERA_T[ERA.who] + 0.3); };
