// ───────────────────────── Characters: flat, frontal, dotted Pithora figures ─────────────────────────
// Each records an anchor (head top + mouth, in logical screen space) so speech bubbles can find them.
const ANCH = {};
function toLogicalFromCtx(g, x, y) { const m = g.getTransform(); const dx = m.a * x + m.c * y + m.e, dy = m.b * x + m.d * y + m.f; return [(dx / V.dpr - V.ox) / V.s, (dy / V.dpr - V.oy) / V.s]; }
function setAnchor(who, g, topX, topY, mX, mY, r) {
  const [hx, hy] = toLogicalFromCtx(g, topX, topY), [mx, my] = toLogicalFromCtx(g, mX, mY), [rx] = toLogicalFromCtx(g, mX + r, mY);
  ANCH[who] = { hx, hy, mx, my, r: Math.abs(rx - mx), f: FRAME };
}
let FRAME = 0;
function arm(g, sx, sy, ex, ey, hx, hy, skin, sleeve, p, lw = 4.5, w = 16) {
  if (p <= 0) return;
  const a = dyn(band([[sx, sy], [ex, ey], [hx, hy]], w, w * 0.8, 5), sleeve || skin, null, lw);
  drawShape(g, a, p);
  if (p > 0.6) { g.globalAlpha = clamp((p - .6) / .4); circle(g, hx, hy, w * 0.62, skin, PAL.char, lw * 0.8); g.globalAlpha = 1; }
}
function eyes(g, x, y, sp, look, open = 1, size = 1) {
  for (const sx of [-1, 1]) {
    g.beginPath(); g.ellipse(x + sx * sp, y, 11 * size, 8.5 * size * open, 0, 0, TAU); g.fillStyle = PAL.wall; g.fill(); g.lineWidth = 3; g.strokeStyle = PAL.char; g.stroke();
    if (open > 0.3) { g.fillStyle = PAL.char; g.beginPath(); g.arc(x + sx * sp + look * 4, y + 0.5, 4.8 * size, 0, TAU); g.fill(); }
  }
}
function brows(g, x, y, sp, worry) { g.strokeStyle = PAL.char; g.lineWidth = 4; g.lineCap = 'round'; for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(x + sx * (sp - 9), y - 15 - worry * 5); g.lineTo(x + sx * (sp + 10), y - 17 + worry * 3); g.stroke(); } }
function mouthAt(g, x, y, open, smile = 1, w = 12) {
  g.strokeStyle = PAL.char; g.lineWidth = 3.5; g.lineCap = 'round';
  if (open > 0.06) { g.fillStyle = PAL.red; g.beginPath(); g.ellipse(x, y + 2, w * 0.75, 2 + open * 9, 0, 0, TAU); g.fill(); g.stroke(); }
  else { g.beginPath(); g.moveTo(x - w, y - smile * 2); g.quadraticCurveTo(x, y + smile * 10 - 2, x + w, y - smile * 2); g.stroke(); }
}
// expression presets used by the face-picker in the story activity
const EXPR = {
  calm: { eye: 1, brow: 0, mouth: 0, smile: 0.6 }, smile: { eye: 0.85, brow: 0, mouth: 0, smile: 1.2 }, wow: { eye: 1.35, brow: -0.6, mouth: 0.8, smile: 0 },
  worry: { eye: 1, brow: 1, mouth: 0.2, smile: -0.4 }, oops: { eye: 1.2, brow: 0.8, mouth: 0.45, smile: -0.2 }, think: { eye: 0.7, brow: 0.5, mouth: 0, smile: 0 },
  cheer: { eye: 0.6, brow: -0.4, mouth: 0.9, smile: 1 }, giggle: { eye: 0.35, brow: -0.2, mouth: 0.5, smile: 1.2 },
};

// ── Chiku: a small palace child who carries the lamps
function chiku(g, x, y, s, t, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return;
  const gp = [0, 1, 2, 3].map(i => partP(p, i, 4));
  const bob = Math.sin(t * 2.2) * 2.5 + (o.hop ? -Math.abs(Math.sin(t * 7)) * 18 : 0);
  g.save(); g.translate(x, y); g.scale(o.flip ? -s : s, s);
  // legs
  g.strokeStyle = PAL.char;
  drawShape(g, SH('ch:l1', () => ({ pts: band([[-18, -84], [-20, -4]], 17, 15, 3), fill: PAL.terra, lw: 4 })), gp[0]);
  drawShape(g, SH('ch:l2', () => ({ pts: band([[18, -84], [20, -4]], 17, 15, 3), fill: PAL.terra, lw: 4 })), gp[0]);
  g.translate(0, bob);
  drawShape(g, SH('ch:dhoti', () => ({ pts: cr([[-40, -118], [40, -118], [46, -70], [0, -64], [-46, -70]], true, 5), fill: PAL.yellow, pat: PT(PAL.red, PAL.wall, 'ticks'), lw: 4.5 })), gp[0]);
  drawShape(g, SH('ch:tunic', () => ({ pts: cr([[-30, -200], [30, -200], [44, -150], [58, -104], [0, -96], [-58, -104], [-44, -150]], true, 6), fill: PAL.green, pat: PT(PAL.yellow, PAL.wall, 'rows'), lw: 5 })), gp[0]);
  // arms
  const P = { down: [[46, -150], [52, -108]], hold: [[50, -152], [24, -126]], up: [[64, -222], [80, -262]], cup: [[52, -160], [24, -156]], point: [[72, -196], [118, -204]], wave: [[66, -226], [84 + Math.sin(t * 9) * 10, -270]], shrug: [[62, -170], [78, -196]] };
  const L = P[o.armL || o.arm || 'down'], R = P[o.armR || o.arm || 'down'];
  arm(g, -30, -192, -L[0][0], L[0][1], -L[1][0], L[1][1], PAL.terra, PAL.green, gp[1]);
  arm(g, 30, -192, R[0][0], R[0][1], R[1][0], R[1][1], PAL.terra, PAL.green, gp[1]);
  // head
  const ht = o.tilt || 0;
  g.save(); g.translate(0, -236); g.rotate(ht);
  drawShape(g, SH('ch:head', () => ({ pts: ell(0, 0, 44, 46, 30), fill: PAL.terra, lw: 5 })), gp[2]);
  if (gp[2] >= 1) {
    g.fillStyle = PAL.char; g.beginPath(); g.arc(0, -6, 46, Math.PI * 1.02, Math.PI * 1.98); g.quadraticCurveTo(20, -26, 0, -22); g.quadraticCurveTo(-24, -20, -45, -10); g.fill();
    circle(g, 0, -58, 17, PAL.char, PAL.char, 2); g.fillStyle = PAL.red; g.fillRect(-14, -46, 28, 7);
  }
  if (gp[3] > 0) {
    g.globalAlpha = gp[3];
    const E = EXPR[o.expr || 'calm'] || EXPR.calm, m = Math.max(talk('chiku'), E.mouth * (o.exprAmt ?? 1));
    eyes(g, 0, -2, 16, o.look || 0, o.blink ? 0.15 : E.eye > 1 ? 1 : E.eye, E.eye > 1 ? E.eye : 1);
    brows(g, 0, -2, 16, E.brow);
    g.fillStyle = rgba(PAL.pink, 0.8); g.beginPath(); g.arc(-28, 14, 6, 0, TAU); g.arc(28, 14, 6, 0, TAU); g.fill();
    mouthAt(g, 0, 22, m, E.smile);
    g.globalAlpha = 1;
  }
  setAnchor('chiku', g, 0, -76, 0, 22, 44);
  g.restore();
  // carried things
  if (o.carry === 'basket') basket(g, 0, -96, 0.62, t, gp[1], 3);
  if (o.carry === 'lamp') diya(g, -2, -130, 0.62, t, 3, { p: gp[1], lit: o.lampLit, wind: o.wind || 0 });
  g.restore();
}

// ── Princess Kesar
function kesar(g, x, y, s, t, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return;
  const gp = [0, 1, 2, 3].map(i => partP(p, i, 4));
  const bob = Math.sin(t * 1.6) * 2;
  g.save(); g.translate(x, y); g.scale(o.flip ? -s : s, s); if (o.rot) g.rotate(o.rot);
  // odhni (veil) behind
  drawShape(g, SH('ks:veil', () => ({ pts: cr([[-30, -434], [36, -430], [70, -360], [86, -230], [120, -60], [60, -52], [40, -230], [-60, -260], [-96, -110], [-140, -70], [-112, -260], [-70, -380]], true, 6), fill: PAL.pink, pat: PT(PAL.wall, PAL.yellow, 'dots'), lw: 5 })), gp[0]);
  drawShape(g, SH('ks:skirt', () => ({ pts: cr([[-44, -262], [44, -262], [92, -130], [134, -6], [0, 6], [-134, -6], [-92, -130]], true, 6), fill: PAL.red, pat: PT(PAL.yellow, PAL.wall, 'rows'), lw: 5 })), gp[0]);
  drawShape(g, SH('ks:hem', () => ({ pts: cr([[-134, -30], [0, -22], [134, -30], [136, -4], [0, 8], [-136, -4]], true, 6), fill: PAL.yellow, pat: PT(PAL.red, PAL.green, 'zig'), lw: 4.5 })), gp[0]);
  g.translate(0, bob);
  drawShape(g, SH('ks:blouse', () => ({ pts: cr([[-36, -340], [36, -340], [48, -300], [44, -258], [0, -252], [-44, -258], [-48, -300]], true, 5), fill: PAL.yellow, pat: PT(PAL.red, PAL.wall, 'dots'), lw: 5 })), gp[0]);
  const P = { down: [[62, -290], [66, -232]], hold: [[64, -292], [26, -276]], welcome: [[78, -300], [118, -282]], tell: [[86, -330], [124, -372]], namaste: [[54, -300], [6, -318]], bow: [[56, -300], [10, -296]] };
  const L = P[o.armL || o.arm || 'down'], R = P[o.armR || o.arm || 'down'];
  arm(g, -38, -330, -L[0][0], L[0][1], -L[1][0], L[1][1], PAL.ochre, PAL.yellow, gp[1], 4.5, 17);
  arm(g, 38, -330, R[0][0], R[0][1], R[1][0], R[1][1], PAL.ochre, PAL.yellow, gp[1], 4.5, 17);
  g.save(); g.translate(0, -384); g.rotate(o.tilt || 0);
  drawShape(g, SH('ks:neck', () => ({ pts: rectP(-14, 30, 28, 34), fill: PAL.ochre, lw: 4, step: 4 })), gp[2]);
  drawShape(g, SH('ks:head', () => ({ pts: ell(0, 0, 40, 44, 30), fill: PAL.ochre, lw: 5 })), gp[2]);
  if (gp[2] >= 1) {
    g.fillStyle = PAL.char; g.beginPath(); g.arc(0, -4, 42, Math.PI * 1.0, Math.PI * 2.0); g.quadraticCurveTo(10, -20, -2, -18); g.quadraticCurveTo(-26, -16, -42, -2); g.fill();
    circle(g, -40, 6, 18, PAL.char, PAL.char, 2); // bun
    // tiara
    g.fillStyle = PAL.glow; g.strokeStyle = PAL.char; g.lineWidth = 3.5; g.beginPath(); g.moveTo(-30, -34); g.lineTo(-20, -60); g.lineTo(-8, -40); g.lineTo(0, -70); g.lineTo(8, -40); g.lineTo(20, -60); g.lineTo(30, -34); g.closePath(); g.fill(); g.stroke();
    circle(g, 0, -52, 5, PAL.red, PAL.char, 2);
    // necklace
    for (let i = 0; i < 7; i++) { const a = Math.PI * (0.2 + i * 0.1); circle(g, Math.cos(a) * 34, 50 + Math.sin(a) * 18, 4.5, i % 2 ? PAL.red : PAL.glow, PAL.char, 1.6); }
  }
  if (gp[3] > 0) {
    g.globalAlpha = gp[3];
    const E = EXPR[o.expr || 'calm'] || EXPR.calm, m = Math.max(talk('kesar'), E.mouth);
    eyes(g, 0, -2, 15, o.look || 0, E.eye > 1 ? 1 : E.eye, 0.95);
    brows(g, 0, -2, 15, E.brow * 0.7);
    circle(g, 0, -20, 4.5, PAL.red, PAL.red, 0);
    circle(g, 9, 12, 4, null, PAL.yellow, 2.5);
    mouthAt(g, 0, 22, m, E.smile, 11);
    g.globalAlpha = 1;
  }
  setAnchor('kesar', g, 0, -72, 0, 22, 42);
  g.restore();
  if (o.lamp) diya(g, R[1][0] - 10, R[1][1] - 10, 0.55, t, 5, { p: gp[1], lit: o.lampLit, wick: o.wick });
  g.restore();
}

// ── Yama: crowned, calm, dignified — never a monster
function yama(g, x, y, s, t, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return;
  const gp = [0, 1, 2, 3, 4].map(i => partP(p, i, 5));
  const stern = o.stern ?? 0.6;
  g.save(); g.translate(x, y); g.scale(o.flip ? -s : s, s);
  if (o.bow) { g.rotate(o.bow * 0.12); }
  // halo of dots behind the head
  if (gp[0] > 0) { g.save(); g.globalAlpha = gp[0]; g.globalCompositeOperation = 'source-over'; dotRing(g, 0, -500, 104, 28, 6, [PAL.glow, PAL.wall, PAL.yellow], gp[0]); dotRing(g, 0, -500, 84, 22, 4.5, [PAL.orange, PAL.glow], gp[0]); g.restore(); }
  drawShape(g, SH('ym:robe', () => ({ pts: cr([[-58, -372], [58, -372], [92, -200], [124, -6], [0, 6], [-124, -6], [-92, -200]], true, 6), fill: PAL.red, pat: PT(PAL.yellow, PAL.wall, 'rows'), lw: 5.5 })), gp[0]);
  drawShape(g, SH('ym:sash', () => ({ pts: band([[-52, -360], [0, -250], [70, -130]], 34, 30, 5, false), fill: PAL.wall, pat: PT(PAL.green, PAL.red, 'zig'), lw: 4.5 })), gp[1]);
  drawShape(g, SH('ym:vest', () => ({ pts: cr([[-62, -440], [62, -440], [78, -400], [60, -360], [0, -350], [-60, -360], [-78, -400]], true, 6), fill: PAL.yellow, pat: PT(PAL.red, PAL.green, 'dots'), lw: 5 })), gp[1]);
  // staff (right) — topped with a small sun disc
  drawShape(g, SH('ym:staff', () => ({ pts: rectP(104, -610, 14, 610), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'ticks'), lw: 4, step: 6 })), gp[1]);
  if (gp[1] >= 1) { circle(g, 111, -628, 24, PAL.glow, PAL.char, 4); dotRing(g, 111, -628, 34, 12, 4, [PAL.red, PAL.orange]); }
  arm(g, 56, -430, 100, -380, 108, -340, PAL.green, PAL.yellow, gp[2], 5, 20);
  const bless = o.bow ? [[70, -380], [20, -360]] : [[90, -400], [96, -350]];
  arm(g, -56, -430, -bless[0][0], bless[0][1], -bless[1][0], bless[1][1], PAL.green, PAL.yellow, gp[2], 5, 20);
  // head
  g.save(); g.translate(0, -500); g.rotate((o.tilt || 0) + (o.bow ? o.bow * 0.18 : 0));
  drawShape(g, SH('ym:head', () => ({ pts: ell(0, 0, 46, 50, 30), fill: PAL.green, lw: 5.5 })), gp[3]);
  // crown
  drawShape(g, SH('ym:crown', () => ({ pts: [[-46, -26], [-50, -70], [-30, -84], [-24, -120], [-8, -112], [0, -150], [8, -112], [24, -120], [30, -84], [50, -70], [46, -26]], fill: PAL.glow, pat: PT(PAL.red, PAL.green, 'dots'), lw: 5, step: 5 })), gp[3]);
  if (gp[3] >= 1) {
    circle(g, 0, -62, 9, PAL.red, PAL.char, 3); circle(g, 0, -150, 7, PAL.red, PAL.char, 3);
    for (const sx of [-1, 1]) circle(g, sx * 46, 14, 8, PAL.glow, PAL.char, 3); // earrings
  }
  if (gp[4] > 0) {
    g.globalAlpha = gp[4];
    const m = talk('yama');
    eyes(g, 0, 2, 17, o.look || 0, 0.8, 1);
    // brows: stern = slanted inward, soft = gently raised
    g.strokeStyle = PAL.char; g.lineWidth = 5; g.lineCap = 'round';
    for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(sx * 6, -12 + stern * 3 - (1 - stern) * 2); g.lineTo(sx * 30, -18 - stern * 2 - (1 - stern) * 4); g.stroke(); }
    // tilak
    g.strokeStyle = PAL.wall; g.lineWidth = 3; g.beginPath(); g.moveTo(-6, -20); g.lineTo(-6, -36); g.moveTo(6, -20); g.lineTo(6, -36); g.stroke(); circle(g, 0, -28, 3, PAL.red, PAL.red, 0);
    // moustache (gentle curls)
    g.strokeStyle = PAL.char; g.lineWidth = 5;
    for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(0, 24); g.quadraticCurveTo(sx * 18, 18, sx * 28, 26); g.quadraticCurveTo(sx * 34, 30, sx * 30, 20); g.stroke(); }
    mouthAt(g, 0, 34, m, lerp(1.3, -0.1, stern), 10);
    g.globalAlpha = 1;
  }
  setAnchor('yama', g, 0, -160, 0, 34, 46);
  g.restore();
  g.restore();
}

// ── The lamp merchant
function merchant(g, x, y, s, t, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return;
  const gp = [0, 1, 2, 3].map(i => partP(p, i, 4));
  g.save(); g.translate(x, y); g.scale(o.flip ? -s : s, s);
  drawShape(g, SH('mc:dhoti', () => ({ pts: cr([[-56, -120], [56, -120], [62, -4], [0, 4], [-62, -4]], true, 5), fill: PAL.wall, pat: PT(PAL.terra, PAL.green, 'ticks'), lw: 4.5 })), gp[0]);
  drawShape(g, SH('mc:kurta', () => ({ pts: cr([[-44, -290], [44, -290], [96, -210], [92, -120], [0, -104], [-92, -120], [-96, -210]], true, 6), fill: PAL.green, pat: PT(PAL.yellow, PAL.wall, 'rows'), lw: 5 })), gp[0]);
  const P = { crossed: [[80, -220], [-24, -200]], open: [[94, -230], [134, -260]], give: [[80, -220], [60, -196]], think: [[100, -250], [70, -292]], down: [[86, -200], [92, -150]] };
  const L = P[o.armL || o.arm || 'down'], R = P[o.armR || o.arm || 'down'];
  if (o.arm === 'crossed') {
    arm(g, -44, -280, -L[0][0], L[0][1], -L[1][0], L[1][1], PAL.ochre, PAL.green, gp[1], 4.5, 22);
    arm(g, 44, -280, R[0][0], R[0][1], R[1][0], R[1][1] + 18, PAL.ochre, PAL.green, gp[1], 4.5, 22);
  } else {
    arm(g, -44, -280, -L[0][0], L[0][1], -L[1][0], L[1][1], PAL.ochre, PAL.green, gp[1], 4.5, 22);
    arm(g, 44, -280, R[0][0], R[0][1], R[1][0], R[1][1], PAL.ochre, PAL.green, gp[1], 4.5, 22);
  }
  g.save(); g.translate(0, -334);
  drawShape(g, SH('mc:head', () => ({ pts: ell(0, 0, 42, 44, 30), fill: PAL.ochre, lw: 5 })), gp[2]);
  drawShape(g, SH('mc:turban', () => ({ pts: cr([[-48, -10], [-40, -50], [0, -64], [44, -52], [52, -10], [0, -24]], true, 6), fill: PAL.orange, pat: PT(PAL.red, PAL.yellow, 'zig'), lw: 5 })), gp[2]);
  if (gp[3] > 0) {
    g.globalAlpha = gp[3];
    const E = EXPR[o.expr || 'calm'] || EXPR.calm;
    eyes(g, 0, 2, 15, o.look || 0, E.eye > 1 ? 1 : E.eye * 0.9, 0.9);
    brows(g, 0, 2, 15, E.brow);
    g.strokeStyle = PAL.char; g.lineWidth = 6; for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(0, 20); g.quadraticCurveTo(sx * 20, 14, sx * 30, 24); g.stroke(); }
    mouthAt(g, 0, 30, Math.max(talk('merchant'), E.mouth), E.smile, 10);
    g.globalAlpha = 1;
  }
  setAnchor('merchant', g, 0, -66, 0, 30, 42);
  g.restore();
  if (o.arm === 'give') diya(g, 0, -190, 0.6, t, 9, { p: gp[1], kind: 'shiny' });
  g.restore();
}

// ── Bijli: the hero horse, with speech mouth and anchor
function bijli(g, x, y, s, t, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return;
  const m = talk('bijli');
  const blink = (t % 4.3) < 0.12;
  const earW = (o.wiggle || 0) * Math.sin(t * 16) * 0.35;
  const swish = Math.sin(t * 1.8) * 0.08 + (o.swish || 0) * Math.sin(t * 9) * 0.2;
  horse(g, x, y, s, t, 'bijli', { p, head: (o.head || 0) + Math.sin(t * 1.3) * 0.03 + m * 0.04, ear: earW, legsF: o.legsF || 0, legsR: o.legsR || 0, tail: swish, mouth: m, blink, eyeLook: o.look || 0, rot: o.rot }, o.flip);
  // anchor: head top/mouth in horse local coords → convert via a temporary transform
  g.save(); g.translate(x, y); g.scale(o.flip ? -s : s, s); if (o.rot) g.rotate(o.rot);
  g.translate(82, -150); g.rotate(o.head || 0); g.translate(66, -98);
  setAnchor('bijli', g, 4, -66, 56, 40, 40);
  g.restore();
}
