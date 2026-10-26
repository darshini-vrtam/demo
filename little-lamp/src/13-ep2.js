// ═════════════════════════ EPISODE 2: Can We Light Up the Whole Palace? ═════════════════════════

// ── Scene 4: A plan bigger than nine lamps ──────────────────────────────────
function s4Market(g, L, t, S) {
  const p = ap('shot:market', 2.4);
  skyReg(g, L, t, p, 'sunset');
  // stalls with striped awnings and mountains of lamps
  const nS = L.p ? 2 : 3;
  for (let i = 0; i < nS; i++) {
    const x = L.W * (i + 0.5) / nS + (L.p ? 0 : 40), y = L.floor, w = L.p ? 440 : 470;
    const pp = partP(p, i, nS);
    drawShape(g, SH('stall' + w + i, () => ({ pts: rectP(x - w / 2, y - 170, w, 170), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'ticks'), lw: 5, step: 6 })), pp);
    for (let k = 0; k < 6; k++) drawShape(g, SH('awn' + w + i + k, () => ({ pts: [[x - w / 2 - 20 + k * (w + 40) / 6, y - 400], [x - w / 2 - 20 + (k + 1) * (w + 40) / 6, y - 400], [x - w / 2 - 20 + (k + 0.5) * (w + 40) / 6, y - 330]], fill: k % 2 ? PAL.red : PAL.wall, pat: null, lw: 4, step: 4 })), pp);
    drawShape(g, SH('awnbar' + w + i, () => ({ pts: rectP(x - w / 2 - 20, y - 420, w + 40, 26), fill: PAL.yellow, pat: PT(PAL.red, PAL.wall, 'zig'), lw: 4, step: 6 })), pp);
    [[-w / 2 + 10], [w / 2 - 22]].forEach(([dx]) => drawShape(g, SH('pole' + w + i + dx, () => ({ pts: rectP(x + dx, y - 400, 12, 230), fill: PAL.terra, lw: 3.5, step: 6 })), pp));
    // lamp mountain
    if (pp >= 1) for (let r = 0; r < 4; r++) for (let c = 0; c <= 3 - r; c++) diya(g, x - (3 - r) * 46 + c * 92 - 20, y - 176 - r * 40, 0.55, t, r * 5 + c, { kind: 'shiny' });
  }
  floorLine(g, L, p);
  bottomReg(g, L, t, p, L.p ? ['p:red', 'd', 'p:green', 'd', 'p:indigo'] : ['p:red', 'd', 'p:green', 'e:ochre', 'p:pink', 'd', 'p:turq', 'h:yellow', 'd']);
  const mx = L.p ? 360 : L.cx - 80;
  const said = has('give') ? 'give' : has('think') ? 'think' : has('merchant') ? 'crossed' : 'down';
  merchant(g, mx, L.floor, L.p ? 0.95 : 1.0, t, { p: ap('merchant', 1.4), arm: said, expr: said === 'crossed' ? 'worry' : said === 'think' ? 'think' : 'smile' });
  chiku(g, L.p ? 690 : L.cx + 330, L.floor, L.p ? 0.95 : 1.0, t, { arm: has('give') ? 'up' : 'hold', expr: has('give') ? 'cheer' : 'calm', look: -1 });
  bijli(g, L.p ? 870 : L.cx + 640, L.floor, L.p ? 0.6 : 0.85, t, { flip: true });
  if (has('baskets')) [0, 1].forEach(i => basket(g, mx + (L.p ? 150 : 170) + i * (L.p ? 0 : 160), L.floor - (L.p ? i * 90 : 0), 0.65, t, ap(i ? 'baskets' : 'give', 1.2), 3, ['shiny']));
}
function s4Court(g, L, t, S) {
  const p = ap('shot:court', 2.4);
  skyReg(g, L, t, p, 'sunset');
  // a courtyard with a neem tree and families
  tree(g, L.p ? 160 : 200, L.floor, L.p ? 1.2 : 1.35, partP(p, 0, 2), 1); tree(g, L.p ? 920 : L.W - 200, L.floor, L.p ? 1.1 : 1.25, partP(p, 1, 2), 2);
  floorLine(g, L, p);
  const fam = L.p ? [[260, 'red', 0], [420, 'green', 1], [660, 'indigo', 2], [820, 'pink', 3]] : [[L.cx - 560, 'red', 0], [L.cx - 420, 'green', 1], [L.cx - 300, 'indigo', 2], [L.cx + 330, 'pink', 3], [L.cx + 460, 'turq', 4], [L.cx + 590, 'orange', 5]];
  fam.forEach(([x, c, i]) => person(g, x, L.floor - (i % 2) * 6, L.p ? 1.3 : 1.4, PAL[c], ap('families', 1.4, i * 0.15), i, i % 2 === 0));
  // the pile of gifts grows in the middle
  const cx = L.cx, y = L.floor;
  if (has('chipped')) diya(g, cx - 120, y - 20, 0.9, t, 1, { p: ap('chipped', 1), kind: 'chipped' });
  if (has('chipped')) diya(g, cx - 10, y - 20, 0.8, t, 2, { p: ap('chipped', 1, 0.3), kind: 'chipped' });
  if (has('wicks')) { const pp = ap('wicks', 1); g.save(); g.globalAlpha = pp; g.strokeStyle = PAL.wall; g.lineWidth = 7; for (let i = 0; i < 6; i++) { g.beginPath(); g.moveTo(cx + 70 + i * 9, y - 6); g.quadraticCurveTo(cx + 90 + i * 9, y - 50, cx + 80 + i * 9, y - 80); g.stroke(); } g.restore(); }
  if (has('oil')) { const pp = ap('oil', 1); g.save(); g.translate(cx + 190, y); drawShape(g, SH('oilpot', () => ({ pts: cr([[-34, 0], [34, 0], [44, -50], [22, -90], [26, -110], [-26, -110], [-22, -90], [-44, -50]], true, 6), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'rows'), lw: 5 })), pp); g.restore(); }
  if (has('flowers')) for (let i = 0; i < 7; i++) marigold(g, cx - 220 + i * 70, y - 120 - (i % 2) * 20, 20, ap('flowers', 1, i * 0.1), i % 2 ? PAL.yellow : PAL.orange);
  chiku(g, L.p ? 540 : L.cx, L.floor - (L.p ? 0 : 0), L.p ? 0.9 : 0.95, t, { arm: 'up', expr: 'smile', p: 1 });
  bottomReg(g, L, t, p, L.p ? ['m', 'pl:red', 'm', 'pl:green', 'm'] : ['m', 'pl:red', 'm', 'pl:green', 'm', 'pl:indigo', 'm', 'pl:pink', 'm']);
  if (!L.p) bijli(g, L.cx + 170, L.floor, 0.7, t, { flip: false, head: -0.05 });
}
function s4Together(g, L, t, S) {
  const p = ap('shot:together', 2);
  skyReg(g, L, t, p, 'sunset');
  palace(g, L.cx, L.floor, L.p ? 860 : 1000, L.p ? Math.round(L.H * 0.3) : 420, t, p, ap('people', 4), { rows: L.p ? 2 : 1 });
  door(g, L.cx, L.floor, L.p ? 0.85 : 0.9, t, p, 0);
  floorLine(g, L, p);
  // a long row of tiny townsfolk painted along the bottom register, each with a lamp
  const n = L.p ? 7 : 13, pp = ap('people', 3.2);
  for (let r = 0; r < (L.p ? 2 : 1); r++) {
    const y = L.rows[r];
    for (let i = 0; i < n; i++) person(g, 80 + (L.W - 160) * (i + 0.5) / n, y, L.p ? 0.85 : 0.62, [PAL.red, PAL.green, PAL.indigo, PAL.pink, PAL.turq, PAL.orange][(i + r) % 6], partP(pp, i + r * n, n * (L.p ? 2 : 1), 3), i + r, true);
    regBand(g, 40, L.W - 40, y + 14, pp, 0);
  }
  chiku(g, L.p ? 250 : L.cx - 420, L.floor, L.p ? 0.85 : 0.9, t, { arm: 'up', expr: 'cheer' });
  bijli(g, L.p ? 840 : L.cx + 460, L.floor, L.p ? 0.6 : 0.82, t, { flip: true });
}
const S4 = {
  id: 's4', ep: 2, mood: 'worry', firstShot: 'palace',
  async run(D, S) {
    await D.line('s4a', { shot: { name: 'palace', cam: () => ({ x: V.W / 2, y: LY().floor - 120, z: V.p ? 1.5 : 1.7 }) } });
    D.cue('nine');
    await D.line('s4b', { shot: { name: 'palace', cam: null } });
    await D.line(C('c1') === 'a' ? 's4cbA' : 's4cbB', { shot: { name: 'palace', cam: () => { const L = LY(); return { x: V.p ? 760 : L.cx + 420, y: L.floor - 240, z: V.p ? 1.6 : 2.0 }; } } });
    await D.line('s4c', { shot: { name: 'palace', cam: () => { const L = LY(); return { x: V.p ? 330 : L.cx - 470, y: L.floor - 240, z: V.p ? 1.6 : 2.0 }; } } });
    await D.line('s4ask', { shot: { name: 'palace', cam: null } });
    const c = await D.choose('c3',
      { label: 'Go to the market', pic: (g, x, y, w, h, t) => withAnchorsSaved(() => { merchant(g, x - w * 0.18, y + h * 0.46, h / 520, t, { arm: 'crossed' }); for (let r = 0; r < 3; r++) for (let k = 0; k <= 2 - r; k++) diya(g, x + w * 0.12 + k * h * 0.14 - r * -h * 0.07, y + h * 0.3 - r * h * 0.1, h / 520, t, k, { kind: 'shiny' }); }) },
      { label: 'Go to the children’s courtyard', pic: (g, x, y, w, h, t) => withAnchorsSaved(() => { tree(g, x - w * 0.3, y + h * 0.46, h / 380, 1, 1); for (let i = 0; i < 4; i++) person(g, x - w * 0.08 + i * w * 0.12, y + h * 0.44, h / 260, [PAL.red, PAL.green, PAL.indigo, PAL.pink][i], 1, i, i % 2 === 0); }) });
    if (c === 'a') {
      await D.line('s4A1', { shot: { name: 'market', cam: null } });
      await D.line('s4A2', { shot: { name: 'market', cam: () => { const L = LY(); return { x: V.p ? 640 : L.cx + 330, y: L.floor - 260, z: V.p ? 1.6 : 1.9 }; } } });
      await D.line('s4A3', { shot: { name: 'market', cam: () => { const L = LY(); return { x: V.p ? 380 : L.cx - 80, y: L.floor - 260, z: V.p ? 1.6 : 2.0 }; } } });
      await D.line('s4A4', { shot: { name: 'market', cam: () => { const L = LY(); return { x: V.p ? 800 : L.cx + 600, y: L.floor - 250, z: V.p ? 1.6 : 1.9 }; } } });
      D.cue('think');
      await D.line('s4A5', { shot: { name: 'market', cam: () => { const L = LY(); return { x: V.p ? 380 : L.cx - 80, y: L.floor - 280, z: V.p ? 1.8 : 2.2 }; } } });
      await D.line('s4A6', { shot: { name: 'market', cam: () => { const L = LY(); return { x: V.p ? 640 : L.cx + 330, y: L.floor - 260, z: V.p ? 1.6 : 1.9 }; } } });
      D.cue('give'); music.swell(5);
      await D.line('s4A7', { shot: { name: 'market', cam: () => ({ x: V.W * 0.5, y: LY().floor - 220, z: 1.3 }) } });
      await D.line('s4A8', { shot: { name: 'market', cam: null } });
    } else {
      await D.line('s4B1', { shot: { name: 'court', cam: null } });
      await D.line('s4B2', { shot: { name: 'court', cam: () => ({ x: V.W / 2, y: LY().floor - 240, z: V.p ? 1.6 : 1.9 }) } });
      await D.line('s4B3', { shot: { name: 'court', cam: () => ({ x: V.W / 2, y: LY().floor - 160, z: 1.3 }) } });
      await D.line('s4B4', { shot: { name: 'court', cam: () => ({ x: V.W / 2, y: LY().floor - 160, z: 1.15 }) } });
      music.swell(5);
      await D.line('s4B5', { shot: { name: 'court', cam: () => ({ x: V.W / 2, y: LY().floor - 230, z: V.p ? 1.7 : 2.0 }) } });
    }
    D.mood('shared', 1.4);
    await D.line('s4d', { shot: { name: 'together', cam: null } });
    music.swell(7);
    await D.line('s4e', { shot: { name: 'together', cam: () => ({ x: V.W / 2, y: V.H * 0.62, z: 1.12 }) } });
    await D.wait(1.6);
  },
  draw(g, st, S) {
    const L = LY(), t = CLK.t;
    if (S.shot === 'market') return s4Market(g, L, t, S);
    if (S.shot === 'court') return s4Court(g, L, t, S);
    if (S.shot === 'together') return s4Together(g, L, t, S);
    const p = ap('shot:palace', 2.4);
    skyReg(g, L, t, p, 'sunset');
    palace(g, L.cx, L.floor, L.p ? 940 : 1300, L.p ? Math.round(L.H * 0.4) : 520, t, p, 0, { rows: 2 });
    door(g, L.cx, L.floor, L.p ? 0.9 : 1.0, t, p, 0);
    floorLine(g, L, p);
    bottomReg(g, L, t, p, L.p ? ['h:terra', 'm', 'e:ochre', 'm', 'h:yellow'] : ['h:terra', 'm', 'e:ochre', 'h:yellow', 'm', 'e:indigo', 'h:pink', 'm', 'h:green']);
    // nine small lamps at the palace foot, counted one by one
    const k = clamp(since('shot:palace') / 3.6) * 9;
    for (let i = 0; i < 9; i++) { const lit = has('nine') || i < k; diya(g, L.cx + (i - 4) * (L.p ? 64 : 72) - 20, L.floor - 6, L.p ? 0.45 : 0.5, t, i, { lit, bright: lit ? 0.7 : 0 }); }
    longShadow(g, L.p ? 760 : L.cx + 420, L.floor, 80, 380, 0.35, 1);
    chiku(g, L.p ? 760 : L.cx + 420, L.floor, L.p ? 0.9 : 1.0, t, { arm: has('nine') ? 'point' : 'down', expr: 'worry', look: -1, flip: true });
    longShadow(g, L.p ? 330 : L.cx - 470, L.floor, 140, 420, 0.35, 1);
    bijli(g, L.p ? 330 : L.cx - 470, L.floor, L.p ? 0.62 : 0.9, t, { head: -0.1 });
  },
};

// ── Scene 5: Build the Circle of Light ──────────────────────────────────────
function ringLay() {
  const L = LY(), p = L.p;
  const c = p ? { x: L.cx, y: Math.round(L.H * 0.4), rx: 400, ry: 380 } : { x: L.cx, y: 520, rx: 410, ry: 296 };
  const slots = []; for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + i * TAU / 12; slots.push({ i, a, x: c.x + Math.cos(a) * c.rx, y: c.y + Math.sin(a) * c.ry }); }
  const baskets = p ? [{ x: 270, y: Math.round(L.H * 0.7) }, { x: 810, y: Math.round(L.H * 0.7) }] : [{ x: L.cx - 650, y: 900 }, { x: L.cx + 650, y: 900 }];
  const doorS = p ? 0.95 : 0.78, doorY = c.y + (p ? 200 : 160);
  return { L, c, slots, baskets, doorS, doorY, ks: p ? { x: 190, y: L.H - 90, s: 0.86 } : { x: 160, y: 1012, s: 0.7 }, cks: p ? { x: 900, y: L.H - 90, s: 0.96 } : { x: L.W - 150, y: 1012, s: 0.78 }, ls: p ? 0.95 : 0.82 };
}
function ringBase(g, R, t, p, night) {
  // rangoli ring: a dotted double circle with petals
  const { c } = R;
  g.save(); g.lineWidth = 7; g.strokeStyle = night ? PAL.wall : PAL.char; g.setLineDash([2, 18]);
  g.beginPath(); g.ellipse(c.x, c.y, c.rx + 60, c.ry + 60, 0, -Math.PI / 2, -Math.PI / 2 + TAU * clamp(p)); g.stroke();
  g.beginPath(); g.ellipse(c.x, c.y, c.rx - 60, c.ry - 60, 0, -Math.PI / 2, -Math.PI / 2 + TAU * clamp(p)); g.stroke(); g.setLineDash([]);
  for (let i = 0; i < 24 * p; i++) { const a = -Math.PI / 2 + i * TAU / 24; marigold(g, c.x + Math.cos(a) * (c.rx + 60), c.y + Math.sin(a) * (c.ry + 60), 13, 1, i % 2 ? PAL.yellow : PAL.orange); }
  g.restore();
}
function ringSection(g, R, k, p) { // section k (3 slots) lights up and fills with dots
  const { c } = R, a0 = -Math.PI / 2 + (k * 3 - 0.5) * TAU / 12, a1 = a0 + TAU / 4, pts = [];
  for (let i = 0; i <= 18; i++) { const a = lerp(a0, a1, i / 18); pts.push([c.x + Math.cos(a) * (c.rx + 34), c.y + Math.sin(a) * (c.ry + 34)]); }
  for (let i = 18; i >= 0; i--) { const a = lerp(a0, a1, i / 18); pts.push([c.x + Math.cos(a) * (c.rx - 34), c.y + Math.sin(a) * (c.ry - 34)]); }
  const sh = SH('ringsec' + k + V.gen, () => ({ pts, fill: [PAL.yellow, PAL.orange, PAL.pink, PAL.turq][k], pat: PT(PAL.red, PAL.wall, 'dots'), lw: 5 }));
  drawShape(g, sh, p, 0.95);
}
function makeRingLamps(R) {
  const kinds = []; for (let i = 0; i < 12; i++) kinds.push(i < 9 ? 'plain' : (C('c3') === 'a' ? 'shiny' : 'chipped'));
  return kinds.map((kind, i) => { const b = R.baskets[i % 2], j = Math.floor(i / 2); return { i, kind, home: { b: i % 2, dx: ((j % 3) - 1) * 62 - 18, dy: -100 - Math.floor(j / 3) * 46 }, st: 'home', slot: -1 }; });
}
const S5 = {
  id: 's5', ep: 2, mood: 'white', firstShot: 'ring',
  async run(D, S) {
    const R0 = ringLay();
    await D.line('s5a', { shot: { name: 'ring', cam: () => { const R = ringLay(); return { x: R.c.x, y: R.c.y + 40, z: 1.25 }; } } });
    await D.line('s5b', { shot: { name: 'ring', cam: () => { const R = ringLay(); return { x: V.p ? 330 : R.ks.x + 200, y: R.ks.y - 260, z: V.p ? 1.6 : 1.8 }; } } });
    const lamps = makeRingLamps(R0), filled = new Array(12).fill(-1), secT = [-1, -1, -1, -1];
    const A = S.v.A = {
      lamps, filled, secT, done: false, drag: null,
      homePos(l) { const R = ringLay(), b = R.baskets[l.home.b]; return [b.x + l.home.dx * (V.p ? 1.1 : 1), b.y + l.home.dy * (V.p ? 1.1 : 1)]; },
      pos(l) {
        const R = ringLay();
        if (l.st === 'home') return A.homePos(l).concat(R.ls * 0.8);
        if (l.st === 'drag') return [l.x, l.y, R.ls * 1.1];
        const s = R.slots[l.slot];
        if (l.st === 'fly') { const k = ease(clamp((CLK.t - l.t) / 0.6)); return [lerp(l.from[0], s.x - 20, k), lerp(l.from[1], s.y + 16, k) - Math.sin(k * Math.PI) * 120, R.ls]; }
        if (l.st === 'back') { const k = ease(clamp((CLK.t - l.t) / 0.4)), h = A.homePos(l); return [lerp(l.from[0], h[0], k), lerp(l.from[1], h[1], k), R.ls]; }
        return [s.x - 20, s.y + 16, R.ls];
      },
      place(l, si) { const [x, y] = A.pos(l); l.from = [x, y]; l.st = 'fly'; l.t = CLK.t; l.slot = si; filled[si] = l.i; },
      nearestEmpty(x, y) { const R = ringLay(); let best = -1, bd = 1e9; R.slots.forEach((s, i) => { if (filled[i] >= 0) return; const d = Math.hypot(s.x - x, s.y - y); if (d < bd) { bd = d; best = i; } }); return [best, bd]; },
      down(x, y) {
        const R = ringLay();
        const l = lamps.find(l => { if (l.st !== 'home') return false; const [lx, ly, s] = A.pos(l); return Math.abs(x - (lx + 10 * s)) < 70 * s && y > ly - 80 * s && y < ly + 40 * s; });
        if (l) { const [lx, ly] = A.pos(l); A.drag = { l, ox: lx - x, oy: ly - y, x0: x, y0: y, moved: 0 }; l.st = 'drag'; l.x = lx; l.y = ly; sfx('tap'); return; }
        // tap an empty glowing spot: the nearest lamp hops there
        const [si, d] = A.nearestEmpty(x, y);
        if (si >= 0 && d < 90) { const free = lamps.filter(l => l.st === 'home'); if (free.length) { const s = R.slots[si]; free.sort((a, b) => Math.hypot(...A.pos(a).slice(0, 2).map((v, k) => v - [s.x, s.y][k])) - Math.hypot(...A.pos(b).slice(0, 2).map((v, k) => v - [s.x, s.y][k]))); A.place(free[0], si); } }
      },
      move(x, y) { const d = A.drag; if (!d) return; d.l.x = x + d.ox; d.l.y = y + d.oy; d.moved = Math.max(d.moved, Math.hypot(x - d.x0, y - d.y0)); },
      up(x, y) {
        const d = A.drag; if (!d) return; A.drag = null; const l = d.l;
        const [si, dist] = A.nearestEmpty(d.moved < 16 ? A.homePos(l)[0] : l.x + 20, d.moved < 16 ? A.homePos(l)[1] : l.y - 16);
        if (si >= 0 && (d.moved < 16 || dist < 130)) A.place(l, si);
        else { l.from = [l.x, l.y]; l.st = 'back'; l.t = CLK.t; }
      },
      hint() { actSay('s5hint', 0); },
      assist() { const l = lamps.find(l => l.st === 'home'); if (!l) return; const [x, y] = A.homePos(l), [si] = A.nearestEmpty(x, y); if (si >= 0) A.place(l, si); },
      assistGap: 2.4,
      update() {
        lamps.forEach(l => { if (l.st === 'fly' && CLK.t - l.t > 0.6) { l.st = 'set'; sfx('place'); setTimeout(() => sfx('relight'), 0); } if (l.st === 'back' && CLK.t - l.t > 0.4) l.st = 'home'; });
        for (let k = 0; k < 4; k++) if (secT[k] < 0 && [0, 1, 2].every(j => { const li = filled[k * 3 + j]; return li >= 0 && lamps[li].st === 'set'; })) {
          secT[k] = CLK.t; sfx('chime'); const n = secT.filter(v => v >= 0).length; if (n < 4) actSay('s5sec' + n, 2);
        }
        if (secT.every(v => v >= 0) && CLK.t - Math.max(...secT) > 1.2) A.done = true;
      },
      drawWorld(g) {
        const R = ringLay(), t = CLK.t;
        R.slots.forEach((s, i) => { if (filled[i] < 0) { pulseRing(g, s.x, s.y, 34, t + i * 0.2, PAL.glow); circle(g, s.x, s.y, 16, rgba(PAL.glow, 0.85), PAL.char, 4); } });
        if (A.hinted) { const l = lamps.find(l => l.st === 'home'); if (l) { const [x, y, s] = A.pos(l); pulseRing(g, x + 10 * s, y - 20 * s, 80 * s, t); } }
        lamps.slice().sort((a, b) => (a.st === 'drag') - (b.st === 'drag')).forEach(l => { const [x, y, s] = A.pos(l); diya(g, x, y, s, t, l.i, { kind: l.kind, lit: l.st === 'set' }); });
      },
    };
    D.shot({ name: 'ring', cam: null });
    await D.line('s5go');
    await D.activity(A);
    D.mood('shared', 1.2); music.swell(7); D.cue('allLit');
    await D.line('s5end', { shot: { name: 'ring', cam: V.p ? null : () => { const R = ringLay(); return { x: R.c.x, y: R.c.y + 60, z: 1.15 }; } } });
    await D.wait(1.4);
  },
  draw(g, st, S) {
    const R = ringLay(), L = R.L, t = CLK.t, A = S.v.A;
    const p = ap('shot:ring', 2.2);
    skyReg(g, L, t, p, 'sunset');
    palace(g, L.cx, L.floor, L.p ? 960 : 1200, L.p ? Math.round(L.H * 0.38) : 470, t, p, 0, { rows: 0 });
    door(g, R.c.x, R.doorY, R.doorS, t, p, 0);
    floorLine(g, L, p);
    ringBase(g, R, t, ap('door', 2.4) || (has('shot:ring') && since('shot:ring') > 4 ? 1 : 0), false);
    const lit = A ? A.lamps.filter(l => l.st === 'set').length : (has('allLit') ? 12 : 0);
    ambientGlow(g, L, R.c.x, R.c.y, R.c.rx * 1.8, lit / 12);
    if (A) A.secT.forEach((v, k) => { if (v >= 0) ringSection(g, R, k, clamp((CLK.t - v) / 1.4)); });
    R.baskets.forEach((b, i) => basket(g, b.x, b.y, V.p ? 1.0 : 0.9, t, p, 0));
    if (A && !ACT) A.drawWorld(g);
    kesar(g, R.ks.x, R.ks.y, R.ks.s, t, { arm: has('allLit') ? 'welcome' : 'tell', armL: 'down', expr: 'smile' });
    chiku(g, R.cks.x, R.cks.y, R.cks.s, t, { arm: has('allLit') ? 'up' : 'hold', expr: has('allLit') ? 'cheer' : 'smile', look: -1 });
  },
};

// ── Scene 6: The wind interrupts / Protect the Flame ──────────────────────────
const GUSTS = [-180, -45, -135, 0, -90, -160].map(d => d * Math.PI / 180);
function angDiff(a, b) { let d = a - b; while (d > Math.PI) d -= TAU; while (d < -Math.PI) d += TAU; return Math.abs(d); }
function nightRing(g, R, t, S, windAmt, windDir, outs) {
  const L = R.L;
  palace(g, L.cx, L.floor, L.p ? 960 : 1200, L.p ? Math.round(L.H * 0.38) : 470, t, 1, 0.6, { rows: 0 });
  door(g, R.c.x, R.doorY, R.doorS, t, 1, 0);
  floorLine(g, L, 1);
  ringBase(g, R, t, 1, true);
  for (let k = 0; k < 4; k++) ringSection(g, R, k, 1);
  const litN = 12 - (outs ? outs.filter(Boolean).length : 0);
  ambientGlow(g, L, R.c.x, R.c.y, R.c.rx * 1.9, litN / 12);
  const kinds = makeRingLamps(R).map(l => l.kind);
  R.slots.forEach((s, i) => {
    const o = outs && outs[i];
    diya(g, s.x - 20, s.y + 16, R.ls, t, i, { kind: kinds[i], lit: !o, out: o ? 1 : 0, outT: o ? CLK.t - o : 0, wind: windAmt * windDir * (0.8 + 0.2 * Math.sin(i)) });
  });
}
const S6 = {
  id: 's6', ep: 2, mood: 'courage', firstShot: 'night',
  async run(D, S) {
    music.mood('night');
    await D.line('s6a', { shot: { name: 'night', cam: () => ({ x: V.W / 2, y: V.H * 0.4, z: 1.2 }) } });
    S.v.wind = { t: -1 };
    sfx('wind', 3, 0.4);
    await D.line('s6b', { shot: { name: 'night', cam: null } });
    await D.line(C('c3') === 'a' ? 's6cbA' : 's6cbB', { shot: { name: 'night', cam: () => { const R = ringLay(); return { x: R.c.x - (V.p ? 0 : 200), y: R.c.y, z: 1.5 }; } } });
    D.cue('bijliIn');
    await D.line('s6c', { shot: { name: 'night', cam: () => { const R = ringLay(); return { x: V.p ? 300 : R.c.x - R.c.rx - 120, y: LY().floor - 230, z: V.p ? 1.5 : 1.8 }; } } });
    sfx('wind', 3.4, 0.5);
    await D.line('s6d', { shot: { name: 'night', cam: () => { const R = ringLay(); return { x: V.p ? 380 : R.c.x - R.c.rx, y: LY().floor - 230, z: V.p ? 1.3 : 1.45 }; } } });
    await D.line('s6e', { shot: { name: 'night', cam: () => { const R = ringLay(); return { x: V.p ? 420 : R.c.x - R.c.rx + 160, y: LY().floor - 260, z: V.p ? 1.8 : 2.2 }; } } });
    await D.line('s6f', { shot: { name: 'night', cam: () => { const R = ringLay(); return { x: R.cks.x - (V.p ? 120 : 140), y: R.cks.y - 220, z: V.p ? 1.6 : 1.9 }; } } });
    D.cue('shield');
    D.shot({ name: 'night', cam: null });
    await D.line('s6go');
    // Activity: Protect the Flame
    const outs = new Array(12).fill(0);
    const A = S.v.A = {
      outs, done: false, shield: -Math.PI / 2, gi: 0, phase: 'warn', pt: CLK.t + 0.5, blocked: null, outLine: false, steer: null,
      setAngle(x, y) { const R = ringLay(); let a = Math.atan2((y - R.c.y) / R.c.ry, (x - R.c.x) / R.c.rx); if (a > 0) a = a < Math.PI / 2 ? 0 : -Math.PI; A.shield = a; },
      down(x, y) {
        const R = ringLay();
        const i = R.slots.findIndex((s, k) => outs[k] && Math.hypot(s.x - x, s.y - y) < 80);
        if (i >= 0) { outs[i] = 0; sfx('relight'); return; }
        A.setAngle(x, y); A.steer = CLK.t;
      },
      move(x, y, down, id) { if (down || id === 'hand') { A.setAngle(x, y); A.steer = CLK.t; } },
      hint() { actSay('s6hint', 0); },
      assist() { outs.forEach((o, i) => { if (o) { outs[i] = 0; sfx('relight'); } }); A.auto = true; },
      assistGap: 2,
      update(dt) {
        const g = GUSTS[A.gi];
        if (TILT.t > CLK.t - 0.5 && (A.steer == null || CLK.t - A.steer > 2)) A.shield = lerp(A.shield, -Math.PI + clamp((TILT.g + 40) / 80) * Math.PI, 0.2);
        if (A.auto && g !== undefined) A.shield = lerp(A.shield, g, 0.08);
        if (A.phase === 'warn' && CLK.t > A.pt + 1.9) { A.phase = 'gust'; A.pt = CLK.t; A.blocked = null; sfx('wind', 1.6, 0.45); if (A.gi === 3) actSay('s6g4', 2); }
        else if (A.phase === 'gust') {
          if (A.blocked === null && CLK.t > A.pt + 0.35) {
            A.blocked = angDiff(A.shield, g) < 0.9;
            if (!A.blocked) {
              const R = ringLay();
              const cand = R.slots.map((s, i) => [i, Math.cos(s.a - g)]).filter(([i]) => !outs[i]).sort((a, b) => b[1] - a[1]).slice(0, 2);
              cand.forEach(([i]) => outs[i] = CLK.t); sfx('out');
              if (!A.outLine) { A.outLine = true; actSay('s6relight', 2); }
            } else sfx('tap');
          }
          if (CLK.t > A.pt + 1.5) { A.phase = 'rest'; A.pt = CLK.t; const L2 = { 0: 's6g2', 1: 's6g3', 4: 's6g5' }[A.gi]; if (L2) actSay(L2, 1); }
        } else if (A.phase === 'rest' && CLK.t > A.pt + 1.6) {
          A.gi++;
          if (A.gi >= GUSTS.length) { A.phase = 'end'; outs.forEach((o, i) => { if (o) { outs[i] = 0; } }); sfx('relight'); A.done = true; }
          else { A.phase = 'warn'; A.pt = CLK.t; if (A.gi === 0) actSay('s6g1', 1); }
        }
      },
      windNow() { const g = GUSTS[Math.min(A.gi, GUSTS.length - 1)]; if (A.phase !== 'gust') return [0, g]; const k = Math.sin(clamp((CLK.t - A.pt) / 1.5) * Math.PI); return [k * (A.blocked ? 0.3 : 1), g]; },
      drawWorld(g) {
        const R = ringLay(), t = CLK.t, gu = GUSTS[Math.min(A.gi, GUSTS.length - 1)];
        // swirl indicator shows where the next gust comes from
        if (A.phase === 'warn' || A.phase === 'gust') { const k = A.phase === 'warn' ? clamp((CLK.t - A.pt) / 0.6) : 1 - clamp((CLK.t - A.pt) / 1.2); const sx = R.c.x + Math.cos(gu) * (R.c.rx + (V.p ? 120 : 280)), sy = R.c.y + Math.sin(gu) * (R.c.ry + (V.p ? 210 : 150)); swirl(g, clamp(sx, 150, V.W - 150), clamp(sy, 150, V.H - 150), 70, t, k); }
        // the clay shield
        const a = A.shield, rx = R.c.rx + 130, ry = R.c.ry + 120, sx = R.c.x + Math.cos(a) * rx, sy = R.c.y + Math.sin(a) * ry;
        g.save(); g.translate(sx, sy); g.rotate(a + Math.PI / 2);
        drawShape(g, SH('shield', () => ({ pts: band([[-130, 30], [-60, -6], [0, -16], [60, -6], [130, 30]], 46, 46, 6, false), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'zig'), lw: 6 })), 1);
        g.restore();
        if (A.hinted) pulseRing(g, sx, sy, 110, t);
        R.slots.forEach((s, i) => { if (outs[i]) pulseRing(g, s.x, s.y - 10, 46, t, PAL.glow); });
      },
    };
    await D.activity(A);
    music.swell(6);
    await D.line('s6end', { shot: { name: 'night', cam: V.p ? null : () => ({ x: V.W / 2, y: V.H * 0.45, z: 1.15 }) } });
    await D.wait(1);
  },
  draw(g, st, S) {
    const R = ringLay(), L = R.L, t = CLK.t, A = S.v.A;
    skyReg(g, L, t, Math.max(ap('stars', 2), ap('shot:night', 3) * 0.5), 'night');
    let wind = 0, dir = -Math.PI;
    if (A && ACT === A) [wind, dir] = A.windNow();
    else if (has('wind') && !(A && A.done)) { wind = 0.55 + 0.35 * Math.sin(t * 1.7); dir = -Math.PI; }
    const dx = Math.cos(dir), wsign = dx > 0.3 ? -1 : dx < -0.3 ? 1 : 0;
    nightRing(g, R, t, S, wind, wsign || 0.3, A ? A.outs : null);
    if (wind > 0.05) windLines(g, L, t, wind * 1.4, wsign >= 0 ? 1 : -1, R.c.y - R.c.ry - 100, R.c.y + R.c.ry, 7, wsign === 0 ? 0.6 : 0);
    // Bijli braces against the wind and gets pushed back
    const bx0 = V.p ? 300 : R.c.x - R.c.rx - 190, push = ease(ap('push', 2.4)) * (V.p ? 140 : 180);
    if (has('bijliIn')) bijli(g, bx0 + push, L.floor - (V.p ? 0 : 0), V.p ? 0.72 : 0.92, t, { flip: true, legsF: -0.25 * (1 - ap('push', 2.4)) + Math.sin(t * 9) * 0.1 * ap('push', 1), legsR: 0.3, head: 0.15, wiggle: wind > 0.3 ? 1 : 0 });
    kesar(g, R.ks.x, R.ks.y, R.ks.s, t, { arm: 'namaste', expr: wind > 0.4 ? 'worry' : 'calm' });
    chiku(g, R.cks.x, R.cks.y, R.cks.s, t, { arm: has('shield') ? 'hold' : 'cup', expr: wind > 0.4 ? 'worry' : 'calm', look: -1 });
  },
};

// ── Scene 7: Someone is at the door ──────────────────────────────────────────
const S7 = {
  id: 's7', ep: 2, mood: 'courage', firstShot: 'still',
  async run(D, S) {
    music.silence(16);
    await D.line('s7a', { shot: { name: 'still', cam: () => ({ x: V.W / 2, y: V.H * 0.5, z: 1.1 }) } });
    await D.wait(2.6); // the silent midnight beat
    await D.line('s7b', { shot: { name: 'still', cam: () => { const R = ringLay(); return { x: R.c.x, y: R.doorY - 40, z: V.p ? 1.5 : 1.8 }; } } });
    await D.line('s7c', { shot: { name: 'still', cam: () => { const R = ringLay(); return { x: R.cks.x - (V.p ? 140 : 160), y: R.cks.y - 230, z: V.p ? 1.7 : 2.1 }; } }, think: true });
    await D.line('s7d', { shot: { name: 'still', cam: () => ({ x: V.W / 2, y: V.H * 0.48, z: 1.0 }) } });
    D.mood('danger', 0.01);
    D.shot({ name: 'open', cam: () => { const R = ringLay(); return { x: R.c.x, y: R.doorY - 160, z: V.p ? 1.45 : 1.6 }; } });
    await D.wait(0.25);
    sfx('creak');
    await D.line('s7e');
    await D.wait(3.2);
  },
  draw(g, st, S) {
    const R = ringLay(), L = R.L, t = CLK.t;
    skyReg(g, L, t, 1, 'night');
    if (S.shot === 'open') {
      const op = ease(ap('open', 3.2)) * 0.32;
      palace(g, L.cx, L.floor, L.p ? 960 : 1200, L.p ? Math.round(L.H * 0.38) : 470, t, 1, 0.3, { rows: 0 });
      door(g, R.c.x, R.doorY, R.doorS, t, 1, op, PAL.glow);
      floorLine(g, L, 1);
      if (op > 0) { g.save(); g.globalCompositeOperation = 'lighter'; const w = op * 130 * R.doorS; const gr = g.createLinearGradient(R.c.x, R.doorY, R.c.x, R.doorY + 260); gr.addColorStop(0, rgba(PAL.glow, 0.5)); gr.addColorStop(1, rgba(PAL.glow, 0)); g.fillStyle = gr; g.beginPath(); g.moveTo(R.c.x - w, R.doorY); g.lineTo(R.c.x + w, R.doorY); g.lineTo(R.c.x + w * 3, R.doorY + 260); g.lineTo(R.c.x - w * 3, R.doorY + 260); g.fill(); g.restore(); }
      return;
    }
    nightRing(g, R, t, S, 0, 0, null);
    const k = ease(ap('shadow', 4));
    if (k > 0) { g.save(); g.fillStyle = rgba(PAL.char, 0.8); const w = 122 * R.doorS, len = lerp(10, 300, k); g.beginPath(); g.moveTo(R.c.x - w, R.doorY); g.quadraticCurveTo(R.c.x - w * 0.6, R.doorY + len * 0.5, R.c.x + w * 0.2, R.doorY + len * 0.55); g.quadraticCurveTo(R.c.x + w * 0.8, R.doorY + len * 0.3, R.c.x + w, R.doorY); g.closePath(); g.fill(); g.restore(); }
    kesar(g, R.ks.x, R.ks.y, R.ks.s, t, { arm: 'namaste', expr: 'calm' });
    chiku(g, R.cks.x, R.cks.y, R.cks.s, t, { arm: 'cup', expr: has('shadow') ? 'worry' : 'calm', look: -1 });
    bijli(g, V.p ? 560 : R.c.x + R.c.rx + 180, L.floor, V.p ? 0.55 : 0.78, t, { flip: true, head: 0.05 });
  },
};

SEQ.push(cardScene('t2', 2, 'Can We Light Up the Whole Palace?', ['ep2'], 'prev2', 'lamp'), S4, S5, S6, S7);
