// ═════════════════════════ EPISODE 3: The Night of Stories ═════════════════════════

// ── Story figures ──────────────────────────────────────────────────────────
function faceOn(g, x, y, r, expr, talkAmt = 0) {
  const E = EXPR[expr] || EXPR.calm, s = r / 44;
  g.save(); g.translate(x, y); g.scale(s, s);
  eyes(g, 0, -4, 16, 0, E.eye > 1 ? 1 : E.eye, E.eye > 1 ? E.eye : 1);
  brows(g, 0, -4, 16, E.brow);
  mouthAt(g, 0, 20, Math.max(E.mouth, talkAmt), E.smile, 12);
  g.restore();
}
function monkey(g, x, y, s, t, expr = 'calm', o = {}) {
  g.save(); g.translate(x, y); g.scale(o.flip ? -s : s, s); if (o.rot) g.rotate(o.rot);
  const bob = o.bounce ? -Math.abs(Math.sin(t * 8)) * 16 * o.bounce : 0; g.translate(0, bob);
  drawShape(g, SH('mk:tail', () => ({ pts: band([[-30, -40], [-80, -60], [-96, -120], [-60, -150], [-40, -120]], 16, 9), fill: PAL.ochre, pat: null, lw: 4 })), 1);
  drawShape(g, SH('mk:body', () => ({ pts: cr([[-34, -110], [30, -110], [44, -60], [30, -20], [-30, -20], [-44, -60]], true, 6), fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'ticks'), lw: 4.5 })), 1);
  const armUp = o.arms === 'up', armMouth = o.arms === 'mouth';
  const ar = armUp ? [[50, -130], [62, -176]] : armMouth ? [[44, -110], [14, -150]] : [[48, -80], [52, -46]];
  arm(g, -26, -100, -ar[0][0], ar[0][1], -ar[1][0], ar[1][1], PAL.terra, PAL.ochre, 1, 4, 14);
  arm(g, 26, -100, ar[0][0], ar[0][1], ar[1][0], ar[1][1], PAL.terra, PAL.ochre, 1, 4, 14);
  for (const sx of [-1, 1]) drawShape(g, SH('mk:leg' + sx, () => ({ pts: band([[sx * 18, -24], [sx * 26, -2]], 15, 13, 3), fill: PAL.ochre, lw: 4 })), 1);
  g.translate(0, -150);
  for (const sx of [-1, 1]) circle(g, sx * 42, -4, 15, PAL.terra, PAL.char, 4);
  drawShape(g, SH('mk:head', () => ({ pts: ell(0, 0, 42, 40, 26), fill: PAL.ochre, lw: 4.5 })), 1);
  drawShape(g, SH('mk:face', () => ({ pts: cr([[-28, -12], [0, -22], [28, -12], [30, 18], [0, 32], [-30, 18]], true, 5), fill: PAL.wall, lw: 3.5 })), 1);
  faceOn(g, 0, 2, 30, expr);
  g.restore();
  return [x + (o.flip ? -1 : 1) * ar[1][0] * s, y + ar[1][1] * s + bob * s];
}
function starKid(g, x, y, r, t, expr = 'calm', o = {}) {
  g.save(); g.translate(x, y); g.rotate((o.spin || 0) + Math.sin(t * 2) * 0.06);
  const bob = o.bounce ? -Math.abs(Math.sin(t * 8)) * 10 * o.bounce : 0; g.translate(0, bob);
  if (o.glow) { g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(0, 0, 0, 0, 0, r * 4 * o.glow); gr.addColorStop(0, rgba(PAL.glow, 0.55)); gr.addColorStop(1, rgba(PAL.glow, 0)); g.fillStyle = gr; g.fillRect(-r * 4, -r * 4, r * 8, r * 8); g.restore(); }
  g.scale(r / 60, r / 60);
  drawShape(g, SH('starkid', () => { const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i / 10 * TAU, R = i % 2 ? 30 : 64; pts.push([Math.cos(a) * R, Math.sin(a) * R]); } return { pts: cr(pts, true, 3), fill: PAL.glow, pat: PT(PAL.orange, PAL.wall, 'dots'), lw: 5 }; }), 1);
  circle(g, 0, 4, 30, PAL.glow, PAL.char, 0);
  faceOn(g, 0, 2, 24, expr);
  g.restore();
}
function firefly(g, x, y, s, t, hic = 0) {
  g.save(); g.translate(x, y + Math.sin(t * 3) * 8 - hic * Math.abs(Math.sin(t * 10)) * 10); g.scale(s, s);
  const flap = Math.sin(t * 22) * 0.4;
  for (const sx of [-1, 1]) { g.save(); g.rotate(sx * (0.5 + flap)); drawShape(g, SH('ff:w', () => ({ pts: ell(0, -40, 18, 40, 18), fill: rgba(PAL.wall, 0.85), lw: 3.5, step: 0, wob: 0 })), 1); g.restore(); }
  drawShape(g, SH('ff:b', () => ({ pts: ell(0, 0, 26, 44, 22), fill: PAL.indigo, pat: PT(PAL.yellow, PAL.wall, 'dots'), lw: 4 })), 1);
  g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(0, 30, 0, 0, 30, 90); gr.addColorStop(0, rgba(PAL.glow, 0.9)); gr.addColorStop(1, rgba(PAL.glow, 0)); g.fillStyle = gr; g.fillRect(-90, -60, 180, 180); g.restore();
  circle(g, 0, 30, 20, PAL.glow, PAL.char, 3.5);
  circle(g, 0, -50, 18, PAL.indigo, PAL.char, 4); circle(g, -7, -54, 4, PAL.wall, PAL.char, 1.5); circle(g, 7, -54, 4, PAL.wall, PAL.char, 1.5);
  if (hic) for (let i = 0; i < 3; i++) circle(g, 30 + i * 16, -70 - i * 18 - ((t * 40) % 20), 5 + i * 2, PAL.wall, PAL.char, 2.5);
  g.restore();
}
function banana(g, x, y, s, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); drawShape(g, SH('banana', () => ({ pts: band([[-30, 0], [0, 14], [30, 0]], 16, 10, 6), fill: PAL.yellow, lw: 3.5 })), 1); g.restore(); }
function hut(g, x, y, s, lit = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  drawShape(g, SH('hut:w', () => ({ pts: rectP(-70, -110, 140, 110), fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'grid'), lw: 4.5, step: 5 })), 1);
  drawShape(g, SH('hut:r', () => ({ pts: [[-92, -104], [0, -180], [92, -104]], fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'ticks'), lw: 4.5, step: 5 })), 1);
  g.fillStyle = lit ? PAL.glow : PAL.char; g.strokeStyle = PAL.char; g.lineWidth = 3.5; g.beginPath(); g.rect(-22, -76, 44, 40); g.fill(); g.stroke();
  if (lit) { g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(0, -56, 0, 0, -56, 90); gr.addColorStop(0, rgba(PAL.glow, 0.5 * lit)); gr.addColorStop(1, rgba(PAL.glow, 0)); g.fillStyle = gr; g.fillRect(-90, -146, 180, 180); g.restore(); }
  g.restore();
}
// The story panel: a painting inside the painting. k = story moment (-1 = opening), ex = chosen expressions
function storyPanel(g, rect, branch, k, ex, t, p = 1, heroA = 1) {
  if (p <= 0) return;
  const { x, y, w, h } = rect;
  g.save(); g.globalAlpha = clamp(p * 1.6);
  rrPath(g, x - 12, y - 12, w + 24, h + 24, 26); g.fillStyle = PAL.yellow; g.fill(); g.lineWidth = 8; g.strokeStyle = PAL.char; g.stroke();
  const per = 2 * (w + h), n = Math.floor(per / 26);
  for (let i = 0; i < n; i++) { const [px, py] = rrPoint(x, y - 0, w, h, 14, i * per / n); g.fillStyle = [PAL.red, PAL.green, PAL.indigo, PAL.wall][i % 4]; g.beginPath(); g.arc(px, py, 5, 0, TAU); g.fill(); }
  rrPath(g, x + 14, y + 14, w - 28, h - 28, 16); g.fillStyle = PAL.indigo; g.fill(); g.lineWidth = 5; g.stroke(); g.clip();
  const sc = Math.min((w - 28) / 840, (h - 28) / 470); g.translate(x + w / 2 - 420 * sc, y + h / 2 - 235 * sc); g.scale(sc, sc);
  for (let i = 0; i < 14; i++) star(g, 40 + (i * 97) % 780, 30 + (i * 53) % 150, 8 + (i % 3) * 3, 1, i % 2 ? PAL.wall : PAL.yellow, t * 0.1 + i);
  g.fillStyle = PAL.green; g.fillRect(0, 420, 840, 60); g.strokeStyle = PAL.char; g.lineWidth = 4; g.beginPath(); g.moveTo(0, 420); g.lineTo(840, 420); g.stroke();
  const live = faceKind(), mirror = live ? (live.kind === 'open' ? 'wow' : live.kind === 'smile' ? 'smile' : live.kind === 'think' ? 'think' : null) : null;
  const E = (i, def) => (k === i && mirror) ? mirror : (ex[i] ? ex[i].e : def);
  const B = i => ex[i] ? clamp(1 - (CLK.t - ex[i].t) / 1.4) : 0;
  if (branch === 'a') {
    drawShape(g, SH('sp:house', () => ({ pts: rectP(520, 110, 300, 310), fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'grid'), lw: 5, step: 6 })), 1);
    const winGlow = k >= 4 ? 1.2 : 0.8;
    g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(670, 270, 0, 670, 270, 200 * winGlow); gr.addColorStop(0, rgba(PAL.glow, 0.5)); gr.addColorStop(1, rgba(PAL.glow, 0)); g.fillStyle = gr; g.fillRect(470, 70, 400, 400); g.restore();
    drawShape(g, SH('sp:win', () => { const pts = [[610, 340], [610, 230]]; for (let i = 0; i <= 12; i++) { const a = Math.PI + i / 12 * Math.PI; pts.push([670 + Math.cos(a) * 60, 230 + Math.sin(a) * 60]); } pts.push([730, 340]); return { pts, fill: PAL.char, lw: 4.5 }; }), 1);
    tree(g, 130, 420, 1.15, 1, 0);
    drawShape(g, SH('sp:branch', () => ({ pts: band([[150, 240], [260, 220], [380, 226]], 26, 12), fill: PAL.terra, lw: 4 })), 1);
    if (k !== 1) diya(g, 650, 330, 0.7, t, 1, { lit: true });
    if (k <= 0) { g.globalAlpha = k < 0 ? heroA : 1; monkey(g, 330, 228, 0.85, t, E(0, 'calm'), { flip: false, bounce: B(0) }); if (k === 0) for (let i = 0; i < 4; i++) star(g, 440 + i * 26, 160 - (i % 2) * 20, 9, 1, PAL.glow, t * 3 + i); g.globalAlpha = 1; }
    else if (k === 1) { const [hx, hy] = monkey(g, 560, 420, 0.9, t, E(1, 'oops'), { arms: 'mouth', bounce: 0.6 + B(1) }); diya(g, hx - 30, hy + 4, 0.55, t, 1, { lit: true }); g.strokeStyle = PAL.red; g.lineWidth = 5; for (let i = 0; i < 3; i++) { g.beginPath(); const yy = 220 - i * 22 - (t * 30 % 20); g.moveTo(480, yy); g.lineTo(492, yy - 10); g.lineTo(504, yy); g.lineTo(516, yy - 10); g.stroke(); } }
    else if (k === 2) { person(g, 670, 340, 0.9, PAL.pink, 1, 1, false); banana(g, 600, 300, 1.2, -0.4); monkey(g, 520, 420, 0.85, t, E(2, 'smile'), { arms: 'up', bounce: B(2) }); }
    else if (k === 3) { windLines(g, { W: 840, H: 470 }, t, 0.9, 1, 120, 380, 4); monkey(g, 560, 420, 0.85, t, E(3, 'think'), { bounce: B(3) }); g.strokeStyle = PAL.ochre; g.lineWidth = 16; g.beginPath(); g.arc(640, 330, 46, Math.PI * 0.9, Math.PI * 2.1); g.stroke(); }
    else { person(g, 670, 340, 0.9, PAL.pink, 1, 1, false); monkey(g, 500, 420, 0.85, t, E(4, 'cheer'), { arms: 'up', bounce: 0.5 + B(4) }); banana(g, 420, 410, 1, 0.3); }
  } else {
    hut(g, 150, 420, 1.1, k >= 4 ? 1 : 0); hut(g, 690, 420, 1.2, k >= 3 ? 1 : 0);
    if (k < 0) { g.globalAlpha = heroA; const f = clamp((CLK.t % 4) / 2.2), sx = lerp(80, 420, f), sy = lerp(40, 360, f * f); for (let i = 0; i < 10; i++) circle(g, sx - i * 22, sy - i * 22 * (sy / (sx + 1)) * 0.6, 6 - i * 0.5, PAL.glow, PAL.char, 0); starKid(g, sx, sy, 34, t, 'wow', { spin: t * 3 }); g.globalAlpha = 1; }
    else if (k === 0) { starKid(g, 420, 380, 40, t, E(0, 'wow'), { bounce: B(0), glow: 0.6 }); for (let i = 0; i < 4; i++) { const a = t * 3 + i * TAU / 4; star(g, 420 + Math.cos(a) * 70, 320 + Math.sin(a) * 18, 10, 1, PAL.wall, a); } }
    else if (k === 1) { firefly(g, 420, 230, 1.2, t, 1); starKid(g, 300, 360, 30, t, E(1, 'oops'), { bounce: 0.4 + B(1) }); }
    else if (k === 2) { diya(g, 470, 400, 1.3, t, 2, { lit: false }); faceOn(g, 450, 392, 16, 'smile'); starKid(g, 330, 280, 34, t, E(2, 'smile'), { bounce: B(2), glow: 0.5 }); }
    else if (k === 3) { diya(g, 420, 400, 1.3, t, 2, {}); starKid(g, 496, 340, 30, t, E(3, 'think'), { glow: 1.2, bounce: B(3) }); for (let i = 0; i < 3; i++) person(g, 120 + i * 70 + (t * 12 % 60), 420, 0.55, [PAL.red, PAL.turq, PAL.orange][i], 1, i, false); }
    else { diya(g, 400, 400, 1.3, t, 2, {}); starKid(g, 476, 340, 32, t, E(4, 'cheer'), { glow: 1.4, bounce: 0.4 + B(4) }); }
  }
  g.restore();
}

// ── Scene 8: A guest nobody expected ─────────────────────────────────────────
function taleLay() {
  const L = LY(), p = L.p;
  return p ? { L, panel: { x: 60, y: Math.round(L.H * 0.12), w: L.W - 120, h: Math.round(L.H * 0.27) }, ks: { x: 210, y: Math.round(L.H * 0.9), s: 0.86 }, ym: { x: 830, y: Math.round(L.H * 0.9), s: 0.76 }, ck: { x: 540, y: Math.round(L.H * 0.9), s: 0.72 }, btn: [[70, Math.round(L.H * 0.43), 450, 400], [560, Math.round(L.H * 0.43), 450, 400]] }
    : { L, panel: { x: L.cx - 430, y: 150, w: 860, h: 480 }, ks: { x: L.cx - 650, y: L.floor + 40, s: 0.96 }, ym: { x: L.cx + 660, y: L.floor + 40, s: 0.86 }, ck: { x: L.cx - 450, y: L.floor + 40, s: 0.72 }, btn: [[L.cx - 340, 690, 310, 300], [L.cx + 30, 690, 310, 300]] };
}
const S8 = {
  id: 's8', ep: 3, mood: 'courage', firstShot: 'door',
  async run(D, S) {
    music.mood('night');
    await D.line('s8a', { shot: { name: 'door', cam: () => { const L = LY(); return { x: L.cx, y: L.floor - 300, z: V.p ? 1.3 : 1.35 }; } } });
    await D.line('s8b', { shot: { name: 'door', cam: () => { const L = LY(); return { x: L.cx, y: L.floor - (V.p ? 480 : 500), z: V.p ? 1.7 : 2.0 }; } } });
    D.cue('hold');
    await D.line('s8c', { shot: { name: 'door', cam: null } });
    await D.line('s8d', { shot: { name: 'door', cam: () => { const L = LY(); return { x: V.p ? 290 : L.cx - 470, y: L.floor - 300, z: V.p ? 1.6 : 1.9 }; } } });
    await D.line('s8e', { shot: { name: 'door', cam: () => { const L = LY(); return { x: V.p ? 330 : L.cx - 400, y: L.floor - 330, z: V.p ? 1.9 : 2.3 }; } } });
    await D.line('s8f', { shot: { name: 'door', cam: () => { const L = LY(); return { x: L.cx, y: L.floor - (V.p ? 470 : 480), z: V.p ? 1.7 : 2.0 }; } } });
    await D.line('s8ask', { shot: { name: 'door', cam: null } });
    const c = await D.choose('c4',
      { label: 'A funny monkey story', pic: (g, x, y, w, h, t) => { monkey(g, x - w * 0.12, y + h * 0.42, h / 290, t, 'giggle', { arms: 'up' }); diya(g, x + w * 0.2, y + h * 0.3, h / 300, t, 1, { lit: true }); } },
      { label: 'A magical star story', pic: (g, x, y, w, h, t) => { hut(g, x + w * 0.24, y + h * 0.46, h / 300, 1); starKid(g, x - w * 0.12, y - h * 0.02, h * 0.2, t, 'smile', { glow: 1 }); } });
    S.v.branch = c;
    if (c === 'a') { await D.line('s8A1', { shot: { name: 'tale', cam: null } }); await D.line('s8A2', { shot: { name: 'tale', cam: () => { const T = taleLay(); return { x: T.panel.x + T.panel.w / 2, y: T.panel.y + T.panel.h / 2 + 40, z: 1.4 }; } } }); }
    else { await D.line('s8B1', { shot: { name: 'tale', cam: null } }); await D.line('s8B2', { shot: { name: 'tale', cam: () => { const T = taleLay(); return { x: T.panel.x + T.panel.w / 2, y: T.panel.y + T.panel.h / 2 + 40, z: 1.4 }; } } }); }
    await D.wait(0.6);
  },
  draw(g, st, S) {
    const L = LY(), t = CLK.t;
    if (S.shot === 'tale') { const br = S.v.branch || C('c4'); return taleDraw(g, L, t, S, br, -1, {}, 1, ap(br === 'a' ? 'monkey' : 'star', 0.9)); }
    skyReg(g, L, t, 1, 'night');
    palace(g, L.cx, L.floor, L.p ? 960 : 1200, L.p ? Math.round(L.H * 0.38) : 470, t, 1, 0.5, { rows: 0 });
    const ds = L.p ? 1.25 : 1.3;
    door(g, L.cx, L.floor, ds, t, 1, 0.78, PAL.glow);
    floorLine(g, L, 1);
    bottomReg(g, L, t, 1, L.p ? ['d:1', 'm', 'd:1', 'm', 'd:1'] : ['d:1', 'm', 'd:1', 'm', 'd:1', 'm', 'd:1', 'm', 'd:1']);
    ambientGlow(g, L, L.cx, L.floor - 300, 520, 0.9);
    yama(g, L.cx, L.floor, L.p ? 0.95 : 0.98, t, { p: ap('yama', 2.8), stern: 1 });
    const ksX = L.p ? 200 : L.cx - 470;
    kesar(g, ksX, L.floor, L.p ? 0.9 : 1.0, t, { arm: has('hold') ? 'welcome' : 'namaste', armL: has('hold') ? 'down' : 'namaste', expr: has('hold') ? 'smile' : 'calm' });
    chiku(g, L.p ? 900 : L.cx + 470, L.floor, L.p ? 0.85 : 0.95, t, { arm: has('hold') ? 'point' : 'cup', flip: true, expr: has('yama') ? 'wow' : 'worry', look: -1 });
    bijli(g, L.p ? 880 : L.cx + 720, L.floor, L.p ? 0.5 : 0.78, t, { flip: true, head: 0.12 });
  },
};
function taleDraw(g, L, t, S, branch, k, ex, stern, heroA = 1) {
  const T = taleLay();
  skyReg(g, L, t, 1, 'night');
  floorLine(g, L, 1);
  if (!L.p) bottomReg(g, L, t, 1, ['d:1', 'm', 'd:1', 'm', 'd:1', 'm', 'd:1', 'm', 'd:1']);
  storyPanel(g, T.panel, branch, k, ex, t, ap('shot:tale', 1.2), heroA);
  kesar(g, T.ks.x, T.ks.y, T.ks.s, t, { arm: 'tell', armL: 'down', expr: 'smile' });
  chiku(g, T.ck.x, T.ck.y, T.ck.s, t, { arm: 'hold', expr: 'smile', look: 1 });
  yama(g, T.ym.x, T.ym.y, T.ym.s, t, { stern });
  if (!L.p) bijli(g, L.cx + 470, T.ck.y, 0.45, t, { flip: true });
}

// ── Scene 9: Tell the Tale ───────────────────────────────────────────────────
const TALE_OPTS = [
  [{ e: 'wow', label: 'Gasp!', kind: 'open' }, { e: 'smile', label: 'Ooh, pretty!', kind: 'smile' }],
  [{ e: 'oops', label: 'Oops!', kind: 'open' }, { e: 'giggle', label: 'Giggle!', kind: 'smile' }],
  [{ e: 'smile', label: 'Big smile', kind: 'smile' }, { e: 'wow', label: 'A friend!', kind: 'open' }],
  [{ e: 'think', label: 'Hmm…', kind: 'think' }, { e: 'wow', label: 'Aha!', kind: 'open' }],
  [{ e: 'cheer', label: 'Hooray!', kind: 'open' }, { e: 'smile', label: 'So happy', kind: 'smile' }],
];
const S9 = {
  id: 's9', ep: 3, mood: 'courage', firstShot: 'tale',
  async run(D, S) {
    const branch = C('c4'); S.v.branch = branch; S.v.ex = {}; S.v.k = -1; S.v.stern = 1;
    await D.line('s9a', { shot: { name: 'tale', cam: () => { const T = taleLay(); return { x: T.ks.x + (V.p ? 100 : 160), y: T.ks.y - 300, z: V.p ? 1.6 : 1.8 }; } } });
    D.shot({ name: 'tale', cam: null });
    await D.line('s9go');
    for (let k = 0; k < 5; k++) {
      S.v.k = k; S.v.btnT = -1;
      await D.line(`s9m${branch.toUpperCase()}${k}`, { shot: { name: 'tale', cam: null } });
      const opts = TALE_OPTS[k];
      S.v.btnT = CLK.t; S.v.pick = -1;
      let picked = -1;
      const A = {
        done: false,
        down(x, y) { const T = taleLay(); const i = T.btn.findIndex(([bx, by, bw, bh]) => x >= bx && x <= bx + bw && y >= by && y <= by + bh); if (i >= 0) { picked = i; A.done = true; } },
        hint() { actSay('s9hint', 0); },
        assist() { picked = QA.pick || 0; A.done = true; },
        update() { const f = faceKind(); if (f && CLK.t - f.since > 0.9) { const i = opts.findIndex(o => o.kind === f.kind); if (i >= 0) { picked = i; A.done = true; } } },
      };
      say('dadi', `${opts[0].label} Or, ${opts[1].label}`);
      await D.activity(A);
      speechReset();
      S.v.pick = picked; S.v.ex[k] = { e: opts[picked].e, t: CLK.t }; sfx(opts[picked].kind === 'smile' ? 'giggle' : 'sparkle');
      S.v.sternFrom = S.v.stern; S.v.sternT = CLK.t; S.v.stern = 1 - (k + 1) / 5;
      await D.wait(1.2);
      S.v.btnT = -1;
      if (k === 1) await D.line('s9y1'); if (k === 3) await D.line('s9y3');
    }
    music.swell(6);
    await D.line('s9end', { shot: { name: 'tale', cam: () => { const T = taleLay(); return { x: T.ym.x - (V.p ? 120 : 100), y: T.ym.y - (V.p ? 460 : 480), z: V.p ? 1.6 : 2.0 }; } } });
    await D.wait(0.8);
  },
  draw(g, st, S) {
    const L = LY(), t = CLK.t, T = taleLay();
    const stern = S.v.sternT ? lerp(S.v.sternFrom, S.v.stern, ease(clamp((CLK.t - S.v.sternT) / 1.5))) : (S.v.stern ?? 1);
    taleDraw(g, L, t, S, S.v.branch || C('c4'), S.v.k ?? -1, S.v.ex || {}, stern);
    if (S.v.btnT > 0) { // expression picture buttons
      const opts = TALE_OPTS[S.v.k] || TALE_OPTS[0], age = CLK.t - S.v.btnT, live = faceKind();
      T.btn.forEach(([x, y, w, h], i) => {
        const o = opts[i], sel = S.v.pick === i, app = backOut(clamp((age - i * 0.1) / 0.35)), match = live && live.kind === o.kind;
        g.save(); g.translate(x + w / 2, y + h / 2); g.scale(app * (sel ? 1.06 : 1), app * (sel ? 1.06 : 1)); g.translate(-(x + w / 2), -(y + h / 2));
        if (sel || match) { g.save(); g.shadowColor = PAL.glow; g.shadowBlur = 40; rrPath(g, x, y, w, h, 36); g.fillStyle = PAL.glow; g.fill(); g.restore(); }
        rrPath(g, x, y, w, h, 36); g.fillStyle = PAL.wall; g.fill(); g.lineWidth = 8; g.strokeStyle = PAL.char; g.stroke();
        const per = 2 * (w + h - 60), n = Math.floor(per / 28); for (let k = 0; k < n; k++) { const [px, py] = rrPoint(x + 15, y + 15, w - 30, h - 30, 24, k * per / n); g.fillStyle = k % 2 ? PAL.yellow : PAL.red; g.beginPath(); g.arc(px, py, 5, 0, TAU); g.fill(); }
        const fr = Math.min(w, h) * 0.26, fy = y + h * 0.4;
        circle(g, x + w / 2, fy, fr, PAL.ochre, PAL.char, 6);
        g.fillStyle = PAL.char; g.beginPath(); g.arc(x + w / 2, fy - fr * 0.1, fr, Math.PI * 1.05, Math.PI * 1.95); g.fill();
        faceOn(g, x + w / 2, fy + fr * 0.08, fr * 0.78, o.e);
        const fs = V.p ? 54 : 46; g.font = `800 ${fs}px ${FONT}`; g.fillStyle = PAL.char; g.textAlign = 'center'; g.fillText(o.label, x + w / 2, y + h - fs * 0.6); g.textAlign = 'left';
        g.restore();
      });
      if (ACT && ACT.hinted) pulseRing(g, T.btn[0][0] + T.btn[0][2] / 2, T.btn[0][1] + T.btn[0][3] / 2, T.btn[0][2] * 0.5, t);
    }
  },
};

// ── Scene 10: The last lamp ──────────────────────────────────────────────────
function lastLay() {
  const L = LY(), p = L.p;
  return p ? { L, lamp: { x: 470, y: Math.round(L.H * 0.5), s: 2.2 }, start: { x: 300, y: Math.round(L.H * 0.5) }, niche: { x: 760, y: Math.round(L.H * 0.66), w: 300, h: 380 }, ck: { x: 190, y: L.floor, s: 0.85 }, meterR: 210 }
    : { L, lamp: { x: L.cx - 60, y: 660, s: 2.4 }, start: { x: L.cx - 460, y: 680 }, niche: { x: L.cx + 470, y: 780, w: 300, h: 380 }, ck: { x: 200, y: L.floor + 150, s: 0.8 }, meterR: 220 };
}
function nicheArch(g, n, p = 1) {
  const sh = SH('niche' + n.w + 'x' + n.h, () => { const pts = [[-n.w / 2, 0], [-n.w / 2, -n.h + n.w / 2]]; for (let j = 0; j <= 16; j++) { const a = Math.PI + j / 16 * Math.PI; pts.push([Math.cos(a) * n.w / 2, -n.h + n.w / 2 + Math.sin(a) * n.w / 2]); } pts.push([n.w / 2, 0]); return { pts, fill: PAL.char, lw: 6 }; });
  const fr = SH('nicheF' + n.w + 'x' + n.h, () => { const W2 = n.w / 2 + 34, pts = [[-W2, 30], [-W2, -n.h + n.w / 2]]; for (let j = 0; j <= 16; j++) { const a = Math.PI + j / 16 * Math.PI; pts.push([Math.cos(a) * W2, -n.h + n.w / 2 + Math.sin(a) * W2]); } pts.push([W2, 30]); return { pts, fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'zig'), lw: 6 }; });
  g.save(); g.translate(n.x, n.y); drawShape(g, fr, p); drawShape(g, sh, p); g.restore();
}
const S10 = {
  id: 's10', ep: 3, mood: 'courage', firstShot: 'last',
  async run(D, S) {
    S.v.lampAt = null;
    await D.line('s10a', { shot: { name: 'last', cam: () => { const Q = lastLay(); return { x: Q.lamp.x + 60, y: Q.lamp.y - 80, z: 1.5 }; } } });
    await D.line('s10b', { shot: { name: 'last', cam: () => { const Q = lastLay(); return { x: Q.ck.x + (V.p ? 100 : 160), y: Q.ck.y - 260, z: V.p ? 1.7 : 2.0 }; } }, think: true });
    await D.line('s10ask', { shot: { name: 'last', cam: null } });
    const c = await D.choose('c5',
      { label: 'Cup your hands around it', pic: (g, x, y, w, h, t) => { diya(g, x - h * 0.12, y + h * 0.22, h / 260, t, 1, { lit: true }); hand(g, x - w * 0.22, y + h * 0.3, h / 420, 1); hand(g, x + w * 0.2, y + h * 0.3, h / 420, -1); } },
      { label: 'Move it somewhere sheltered', pic: (g, x, y, w, h, t) => { nicheArch(g, { x: x + w * 0.18, y: y + h * 0.42, w: h * 0.5, h: h * 0.7 }); diya(g, x - w * 0.24, y + h * 0.26, h / 300, t, 1, { lit: true, wind: 0.5 }); g.strokeStyle = PAL.char; g.lineWidth = 6; g.setLineDash([4, 12]); g.beginPath(); g.moveTo(x - w * 0.1, y + h * 0.1); g.quadraticCurveTo(x, y - h * 0.15, x + w * 0.1, y + h * 0.1); g.stroke(); g.setLineDash([]); } });
    S.v.mode = c;
    const Q = lastLay();
    const A = S.v.A = {
      done: false, mode: c, meter: 0, hold: false, cup: 0, out: 0, outT: 0, gustT: CLK.t + 2.2, gust: 0, gdir: 1, warnT: 0,
      x: c === 'a' ? Q.lamp.x : Q.start.x, y: c === 'a' ? Q.lamp.y : Q.start.y, drag: null, inNiche: false, vx: 0, auto: 0, walk: null, fastT: 0,
      down(x, y) {
        if (A.out && A.outT && CLK.t - A.outT > 0.3) { A.relight(); return; }
        if (A.mode === 'a') { A.hold = true; return; }
        if (A.inNiche) return;
        if (Math.hypot(x - (A.x + 40), y - (A.y - 30)) < 170) { A.drag = { ox: A.x - x, oy: A.y - y, x0: x, y0: y, moved: 0, lx: x, lt: CLK.t }; }
      },
      move(x, y, down) {
        const d = A.drag; if (!d) return;
        const nx = x + d.ox, ny = y + d.oy, dt = Math.max(0.008, CLK.t - d.lt), sp = Math.hypot(nx - A.x, ny - A.y) / dt;
        A.vx = lerp(A.vx, clamp((nx - A.x) / dt / 1500, -1, 1), 0.3);
        if (sp > 1700 && !A.out) { A.fastT += dt; if (A.fastT > 0.12) { A.goOut(); actSay('s10slow', 1); } } else A.fastT = Math.max(0, A.fastT - dt);
        A.x = clamp(nx, 140, V.W - 140); A.y = clamp(ny, V.H * 0.25, V.H - 160); d.lt = CLK.t; d.moved = Math.max(d.moved, Math.hypot(x - d.x0, y - d.y0));
      },
      up() { A.hold = false; const d = A.drag; A.drag = null; if (d && d.moved < 14 && A.mode === 'b') A.walk = CLK.t; },
      goOut() { if (A.out) return; A.out = 1; A.outT = CLK.t; sfx('out'); },
      relight() { if (!A.out) return; A.out = 0; A.outT = 0; sfx('relight'); },
      hint() { actSay(A.mode === 'a' ? 's10hintA' : 's10hintB', 0); },
      assist() { if (A.mode === 'a') A.auto = CLK.t + 3; else A.walk = A.walk || CLK.t; },
      assistGap: 3,
      update(dt) {
        const Q = lastLay();
        // gusts (cup mode: they test the hands; shelter mode: they bend the flame until it is safe)
        if (CLK.t > A.gustT && !A.gust) { A.gust = 1; A.gstart = CLK.t; A.gdir = Math.random() < 0.5 ? -1 : 1; sfx('wind', 1.4, 0.35); }
        if (A.gust && CLK.t - A.gstart > 1.4) { A.gust = 0; A.gustT = CLK.t + 2.6; }
        const g = A.gust ? Math.sin(clamp((CLK.t - A.gstart) / 1.4) * Math.PI) : 0;
        if (A.mode === 'a') {
          const want = A.hold || CLK.t < A.auto ? 1 : 0; A.cup = lerp(A.cup, want, 0.18);
          if (g > 0.6 && A.cup < 0.7 && !A.out) A.goOut();
          if (!A.out && A.cup > 0.7) A.meter = clamp(A.meter + dt / 9);
        } else {
          if (A.walk && !A.inNiche) { const tx = Q.niche.x - 40, ty = Q.niche.y - 40; A.x = lerp(A.x, tx, 0.025); A.y = lerp(A.y, ty, 0.025); }
          if (!A.inNiche && Math.hypot(A.x - (Q.niche.x - 40), A.y - (Q.niche.y - 40)) < 90) { A.inNiche = true; A.drag = null; A.x = Q.niche.x - 40; A.y = Q.niche.y - 40; sfx('place'); }
          if (A.inNiche && !A.out) A.meter = clamp(A.meter + dt / 5);
          A.vx = lerp(A.vx, 0, 0.08);
        }
        if (A.out && CLK.t - A.outT > 1.3) { actSay('s10out', 1); A.relight(); } // Chiku calmly relights it
        A.windNow = A.mode === 'a' ? g * A.gdir * (1 - A.cup * 0.85) : (A.inNiche ? 0.05 * g : g * A.gdir * 0.6) - A.vx * 0.8;
        if (A.meter >= 1 && !A.doneT) A.doneT = CLK.t;
        if (A.doneT && CLK.t - A.doneT > 0.6) A.done = true;
      },
      drawWorld(g) {
        const Q = lastLay(), t = CLK.t, s = Q.lamp.s;
        if (A.gust) windLines(g, Q.L, t, 1.2, A.gdir, Q.lamp.y - 300, Q.lamp.y + 60, 5);
        if (A.mode === 'b') nicheArch(g, Q.niche, 1);
        else drawShape(g, SH('ledge' + V.gen, () => ({ pts: rectP(Q.lamp.x - 240, Q.lamp.y + 30, 480, 40), fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'grid'), lw: 5, step: 6 })), 1);
        const ls = A.mode === 'b' ? (A.inNiche ? 1.5 : 1.7) : s;
        diya(g, A.x, A.y, ls, t, 7, { lit: !A.out, out: A.out, outT: A.out ? CLK.t - A.outT : 0, wind: A.windNow || 0, bright: 1.3 });
        if (A.mode === 'a') { const gap = lerp(330, 120, A.cup); hand(g, A.x + 60 * s - gap, A.y + 10, 1.25, 1); hand(g, A.x + 60 * s + gap, A.y + 10, 1.25, -1); }
        // steadiness meter: a ring of dots that fills clockwise
        const mx = A.mode === 'a' ? A.x + 60 * s : (A.inNiche ? Q.niche.x : A.x + 60 * ls), my = A.mode === 'a' ? A.y - 70 * s : (A.inNiche ? Q.niche.y - Q.niche.h * 0.5 : A.y - 70 * ls), R = Q.meterR;
        for (let i = 0; i < 28; i++) { const a = -Math.PI / 2 + i / 28 * TAU, on = i < A.meter * 28; circle(g, mx + Math.cos(a) * R, my + Math.sin(a) * R * 0.95, on ? 10 : 7, on ? PAL.glow : rgba(PAL.wall, 0.45), on ? PAL.char : null, on ? 3 : 0); }
        if (A.hinted) pulseRing(g, mx, my, 120, t);
        if (A.out) pulseRing(g, A.x + 60 * ls, A.y - 30 * ls, 60, t);
      },
    };
    D.shot({ name: 'last', cam: null });
    if (c === 'a') { await D.line('s10A1'); await D.line('s10Ago'); } else { await D.line('s10B1'); await D.line('s10Bgo'); }
    await D.activity(A);
    S.v.keep = A;
    D.mood(mixc(PAL.indigo, PAL.orange, 0.55), 7); music.swell(8);
    await D.line('s10c', { shot: { name: 'last', cam: () => { const Q = lastLay(); return { x: A.x + 60, y: A.y - 100, z: 1.45 }; } } });
    await D.wait(1.4);
  },
  draw(g, st, S) {
    const Q = lastLay(), L = Q.L, t = CLK.t;
    skyReg(g, L, t, 1, S.v.keep ? 'dawn' : 'night');
    // the rest of the circle glows softly along the floor
    floorLine(g, L, 1);
    bottomReg(g, L, t, 1, L.p ? ['d:1', 'd:1', 'd:1', 'd:1', 'd:1'] : ['d:1', 'd:1', 'd:1', 'm', 'd:1', 'd:1', 'm', 'd:1', 'd:1', 'd:1']);
    const A = S.v.A;
    if (!A || (!ACT && !S.v.keep)) { // before the choice: the last lamp flickering on its ledge
      drawShape(g, SH('ledge' + V.gen, () => ({ pts: rectP(Q.lamp.x - 240, Q.lamp.y + 30, 480, 40), fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'grid'), lw: 5, step: 6 })), 1);
      diya(g, Q.lamp.x, Q.lamp.y, Q.lamp.s, t, 7, { lit: true, wind: Math.sin(t * 2.7) * 0.5 * ap('last', 1), bright: 1.2 });
    } else if (!ACT) A.drawWorld(g);
    chiku(g, Q.ck.x, Q.ck.y, Q.ck.s, t, { arm: S.v.mode === 'a' ? 'cup' : 'point', expr: S.v.keep ? 'smile' : 'worry', look: 1 });
  },
};

// ── Scene 11: Morning arrives ───────────────────────────────────────────────
const S11 = {
  id: 's11', ep: 3, mood: 'shared', firstShot: 'morning',
  async run(D, S) {
    S.mood = { from: mixc(PAL.indigo, PAL.orange, 0.55), to: PAL.yellow, t: 0, dur: 2.5 };
    music.mood('day'); music.swell(10);
    D.shot({ name: 'morning', cam: null }); await D.wait(0.3);
    sfx('rooster'); D.cue('crow');
    await D.line('s11a');
    await D.line('s11b', { shot: { name: 'morning', cam: () => { const L = LY(); return { x: L.cx + (V.p ? 0 : 150), y: L.floor - 470, z: V.p ? 1.6 : 1.8 }; } } });
    await D.line('s11c', { shot: { name: 'morning', cam: () => ({ x: V.W / 2, y: V.H * 0.55, z: 1.1 }) } });
    await D.line(C('c4') === 'a' ? 's11cbA' : 's11cbB', { shot: { name: 'morning', cam: () => { const L = LY(); return { x: L.cx + (V.p ? 0 : 150), y: L.floor - 470, z: V.p ? 1.7 : 2.0 }; } } });
    await D.line('s11d', { shot: { name: 'morning', cam: () => ({ x: V.W / 2, y: V.H * 0.56, z: 1.25 }) } });
    await D.line('s11e', { shot: { name: 'morning', cam: () => ({ x: V.W * 0.46, y: V.H * 0.58, z: 1.15 }) } });
    await D.wait(0.6);
    await D.line('s11f', { shot: { name: 'morning', cam: () => { const L = LY(); return { x: L.cx + (V.p ? 0 : 150), y: L.floor - 470, z: V.p ? 1.6 : 1.8 }; } } });
    await D.line('s11g', { shot: { name: 'morning', cam: () => { const L = LY(); return { x: V.p ? 260 : L.cx - 420, y: L.floor - 330, z: V.p ? 1.6 : 1.9 }; } } });
    await D.line(C('c5') === 'a' ? 's11cbC' : 's11cbD', { shot: { name: 'morning', cam: () => { const L = LY(); return { x: V.p ? 860 : L.cx + 480, y: L.floor - 260, z: V.p ? 1.6 : 1.9 }; } } });
    await D.line('s11h', { shot: { name: 'morning', cam: null } });
    await D.line('s11i', { shot: { name: 'morning', cam: () => ({ x: V.W / 2, y: V.H * 0.3, z: 1.3 }) } });
    await D.line('s11j', { shot: { name: 'morning', cam: () => ({ x: V.W / 2, y: V.H * 0.5, z: 1.05 }) } });
    // the persistent Panch Deep shelf: the first lamp lights
    G.shelf[0] = true; saveStore();
    D.shot({ name: 'shelf', cam: null }); await D.wait(1.2);
    music.swell(8);
    await D.line('s11k');
    await D.wait(1.6);
  },
  draw(g, st, S) {
    const L = LY(), t = CLK.t;
    if (S.shot === 'shelf') {
      const p = ap('shot:shelf', 1.6);
      skyReg(g, L, t, p, 'day');
      const w = L.p ? 900 : 1100, y = L.p ? L.H * 0.62 : 760;
      const lit = G.shelf.slice(); lit[0] = has('shelfLit');
      shelf(g, L.cx, y, w, t, lit, p, 0, since('shelfLit'));
      if (has('shelfLit')) { ambientGlow(g, L, L.cx - w / 2 + w / 10, y - 120, 360, clamp(since('shelfLit') / 1.2)); for (let i = 0; i < 8; i++) { const a = i / 8 * TAU + t, r = 120 + 30 * Math.sin(t * 2 + i); star(g, L.cx - w / 2 + w / 10 + Math.cos(a) * r, y - 120 + Math.sin(a) * r * 0.7, 14, clamp(since('shelfLit') / 0.8), PAL.glow, a); } }
      chiku(g, L.p ? 830 : L.cx + w / 2 + 140, L.p ? L.H * 0.9 : L.floor + 150, L.p ? 0.9 : 0.8, t, { arm: 'up', expr: 'cheer', look: -1 });
      return;
    }
    // big dotted sun in the top register
    regBand(g, 40, L.W - 40, L.sky, 1, 1);
    sun(g, L.cx, L.sky / 2 + 14, L.p ? 120 : 92, t, ap('sun', 2) || ap('shot:morning', 2.2));
    for (let i = 0; i < (L.p ? 4 : 8); i++) { const x = L.cx + (i < (L.p ? 2 : 4) ? -1 : 1) * (220 + (i % (L.p ? 2 : 4)) * (L.p ? 150 : 180)); bird(g, x, L.sky / 2 + 40, 0.5, [PAL.indigo, PAL.red, PAL.green][i % 3], ap('shot:morning', 2, 0.5), x > L.cx); }
    palace(g, L.cx, L.floor, L.p ? 960 : 1200, L.p ? Math.round(L.H * 0.38) : 470, t, 1, 0.2, { rows: 1 });
    door(g, L.cx, L.floor, L.p ? 1.1 : 1.15, t, 1, 0.55, PAL.glow);
    const crow = has('crow') ? clamp(1 - Math.abs(since('crow') - 0.6) / 0.8) : 0;
    rooster(g, L.cx - (L.p ? 360 : 520), L.floor - (L.p ? Math.round(L.H * 0.38) : 470) - 30, L.p ? 1.0 : 0.9, t, Math.max(ap('rooster', 1.2), has('crow') && since('crow') > 3 ? 1 : 0), crow);
    floorLine(g, L, 1);
    bottomReg(g, L, t, 1, L.p ? ['pl:red', 'h:bijli', 'pl:green', 'e:pink', 'pl:indigo'] : ['pl:red', 'h:terra', 'pl:green', 'e:pink', 'pl:indigo', 'h:yellow', 'pl:orange', 'e:ochre', 'pl:turq', 'h:green']);
    const bow = ease(ap('bow', 1.2)) * (since('bow') < 4 ? 1 : clamp(1 - (since('bow') - 4) / 1.2));
    yama(g, L.cx + (L.p ? 0 : 150), L.floor, L.p ? 0.92 : 0.95, t, { stern: 0, bow: -bow, flip: !L.p });
    kesar(g, L.p ? 230 : L.cx - 420, L.floor, L.p ? 0.95 : 1.0, t, { arm: 'namaste', expr: 'smile' });
    chiku(g, L.p ? 860 : L.cx + 480, L.floor, L.p ? 0.85 : 0.95, t, { arm: C('c5') === 'a' ? 'cup' : 'up', expr: 'cheer', look: -1, flip: true });
    bijli(g, L.p ? 900 : L.cx + 730, L.floor, L.p ? 0.46 : 0.78, t, { flip: true });
  },
};

// ── End card ────────────────────────────────────────────────────────────────
const SEND = {
  id: 'end', mood: 'shared', firstShot: 'card', noPush: true,
  async run(D, S) { D.cue('card'); music.swell(10); sfx('chime'); await D.wait(0.8); await D.line('end1'); await D.wait(4); },
  draw(g, st, S) {
    const L = LY(), p = ap('card', 3), cx = L.cx, cy = L.p ? L.H * 0.3 : 330, R = L.p ? 300 : 210;
    horseRing(g, cx, cy, R, CLK.t, p, 'sun');
    titleText(g, 'Event 1 of Panch Deep complete.', cx, L.p ? L.H * 0.54 : 640, L.p ? 70 : 72, L.W - 160, ap('card', 1, 0.8), PAL.char);
    shelf(g, cx, L.p ? L.H * 0.84 : 940, L.p ? 840 : 900, CLK.t, G.shelf, ap('card', 2, 1.2));
  },
};

SEQ.push(cardScene('t3', 3, 'The Night of Stories', ['ep3'], 'prev3', 'sun'), S8, S9, S10, S11, SEND);
