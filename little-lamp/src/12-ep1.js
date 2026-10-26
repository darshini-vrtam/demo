// ═════════════════════════ EPISODE 1: The Horse That Spoke ═════════════════════════
function withAnchorsSaved(fn) { const keep = Object.assign({}, ANCH); try { fn(); } finally { Object.assign(ANCH, keep); } }

// ── Scene 1: A very unusual morning ──────────────────────────────────────────
function s1Pos() {
  const L = LY(), p = L.p;
  const pal = { cx: L.cx, base: L.floor, w: p ? 900 : 1120, h: p ? Math.round(L.H * 0.34) : 470 };
  const mural = { x: L.cx - (p ? 260 : 400), y: L.floor - (p ? 50 : 40), w: p ? 250 : 270, h: p ? 236 : 236 };
  const mural2 = { x: L.cx + (p ? 260 : 400), y: mural.y, w: mural.w, h: mural.h };
  return {
    L, pal, mural, mural2,
    bm: { x: mural.x - 6, y: mural.y - 16, s: 0.5 },
    bj: { x: p ? 250 : L.cx - 690, y: L.floor, s: p ? 0.86 : 1.05 },
    ck: { x: p ? 880 : L.cx + 640, y: L.floor, s: p ? 1.0 : 1.05 },
    baskets: [[L.cx - (p ? 205 : 222), L.floor, p ? 0.62 : 0.7], [L.cx + (p ? 205 : 222), L.floor, p ? 0.62 : 0.7]],
    gar: { x0: L.cx - pal.w * 0.42, x1: L.cx + pal.w * 0.42, y: L.floor - pal.h + 34, sag: p ? 90 : 70 },
  };
}
function muralPanel(g, m, p, t) {
  if (p <= 0) return;
  const sh = SH('mp' + m.w + 'x' + m.h, () => ({ pts: rectP(-m.w / 2, -m.h, m.w, m.h), fill: PAL.wall, pat: PT(PAL.ochre, PAL.yellow, 'grid'), lw: 5, step: 6 }));
  g.save(); g.translate(m.x, m.y); drawShape(g, sh, p);
  if (p >= 1) { g.strokeStyle = PAL.red; g.lineWidth = 3; g.setLineDash([2, 10]); g.strokeRect(-m.w / 2 + 10, -m.h + 10, m.w - 20, m.h - 20); g.setLineDash([]); }
  g.restore();
}
const S1 = {
  id: 's1', ep: 1, mood: 'white', firstShot: 'wall',
  async run(D, S) {
    const P = s1Pos();
    const camMural = () => { const P = s1Pos(); return { x: P.mural.x, y: P.mural.y - 120, z: V.p ? 2.2 : 2.4 }; };
    S.cam = camMural(); D.cue('mural0');
    await D.wait(0.6);
    await D.line('s1a', { shot: { name: 'wall', cam: camMural } });
    await D.line('s1b', { shot: { name: 'wall', cam: null } });
    await D.line('s1c', { shot: { name: 'wall', cam: () => ({ x: V.W / 2, y: V.H * 0.42, z: 1.25 }) } });
    await D.line('s1d', { shot: { name: 'wall', cam: () => { const P = s1Pos(); return { x: V.p ? V.W * 0.62 : P.ck.x - 260, y: P.L.floor - 260, z: V.p ? 1.45 : 1.5 }; } } });
    D.shot({ cam: camMural }); await D.wait(0.25); D.sfx('psst'); D.cue('psst');
    await D.line('s1psst');
    await D.line('s1e', { shot: { name: 'wall', cam: () => { const P = s1Pos(); return { x: P.ck.x - (V.p ? 120 : 60), y: P.L.floor - 300, z: V.p ? 1.9 : 2.0 }; } } });
    await D.line('s1f', { shot: { name: 'wall', cam: camMural } });
    await D.line('s1g', { shot: { name: 'wall', cam: () => ({ x: V.p ? V.W * 0.42 : V.W * 0.36, y: V.p ? V.H * 0.62 : V.H * 0.55, z: V.p ? 1.3 : 1.35 }) } });
    await D.wait(0.8);
    await D.line('s1h', { shot: { name: 'wall', cam: () => ({ x: V.W * 0.5, y: V.p ? V.H * 0.6 : V.H * 0.56, z: 1.15 }) } });
    await D.line('s1ask', { shot: { name: 'wall', cam: null } });
    const c = await D.choose('c1',
      { label: 'Ask Bijli what happened', pic: (g, x, y, w, h, t) => withAnchorsSaved(() => { bijli(g, x - w * 0.12, y + h * 0.42, h / 520, t, {}); chiku(g, x + w * 0.24, y + h * 0.44, h / 430, t, { arm: 'point' }); g.font = `800 ${h * 0.4}px ${FONT}`; g.fillStyle = PAL.red; g.fillText('?', x + w * 0.05, y - h * 0.05); }) },
      { label: 'Check if anyone else can see him', pic: (g, x, y, w, h, t) => withAnchorsSaved(() => { chiku(g, x - w * 0.16, y + h * 0.44, h / 430, t, { arm: 'shrug', look: Math.sin(t * 2) }); for (let i = 0; i < 3; i++) person(g, x + w * (0.1 + i * 0.12), y + h * 0.42, h / 330, [PAL.red, PAL.indigo, PAL.green][i], 1, i); eyes(g, x + w * 0.24, y - h * 0.26, 26, Math.sin(t * 2), 1, 2.2); }) });
    if (c === 'a') {
      await D.line('s1A1', { shot: { name: 'wall', cam: () => ({ x: V.p ? V.W * 0.6 : V.W * 0.62, y: V.p ? V.H * 0.62 : V.H * 0.58, z: 1.55 }), cue: 'askA' } });
      await D.line('s1A2', { shot: { name: 'wall', cam: () => { const P = s1Pos(); return { x: P.bj.x + 60, y: P.L.floor - 220, z: V.p ? 1.6 : 1.8 }; } } });
    } else {
      await D.line('s1B1', { shot: { name: 'wall', cam: () => ({ x: V.W / 2, y: V.p ? V.H * 0.66 : V.H * 0.6, z: 1.2 }), cue: 'passers' } });
      await D.line('s1B2', { shot: { name: 'wall', cam: () => { const P = s1Pos(); return { x: P.bj.x + 60, y: P.L.floor - 220, z: V.p ? 1.6 : 1.8 }; } } });
      await D.line('s1B3', { shot: { name: 'wall', cam: () => ({ x: V.W * 0.45, y: V.p ? V.H * 0.6 : V.H * 0.56, z: 1.3 }) } });
    }
    await D.line('s1i', { shot: { name: 'wall', cam: () => { const P = s1Pos(); return { x: (P.bj.x + P.ck.x) / 2, y: P.L.floor - 230, z: V.p ? 1.25 : 1.45 }; } } });
    await D.wait(0.8);
  },
  draw(g, st, S) {
    const P = s1Pos(), L = P.L, t = CLK.t;
    const pPal = ap('palace', 2.6), wallP = Math.max(ap('mural0', 1.5), pPal);
    skyReg(g, L, t, ap('palace', 2.5, 0.4), 'day');
    palace(g, P.pal.cx, P.pal.base, P.pal.w, P.pal.h, t, pPal, 0, { rows: 1 });
    // a wall painting even before the palace is named
    muralPanel(g, P.mural, wallP, t); muralPanel(g, P.mural2, Math.max(ap('elephants', 1.4), pPal), t);
    elephant(g, P.mural2.x - 6, P.mural2.y - 18, V.p ? 0.5 : 0.52, 'indigo', ap('elephants', 1.8), true);
    door(g, L.cx, L.floor, V.p ? 0.95 : 1.0, t, pPal, 0.22);
    garland(g, P.gar.x0, P.gar.y, L.cx - 160, P.gar.y + 16, P.gar.sag, V.p ? 20 : 17, ap('garlands', 1.6));
    garland(g, L.cx + 160, P.gar.y + 16, P.gar.x1, P.gar.y, P.gar.sag, V.p ? 20 : 17, ap('garlands', 1.6, 0.3));
    garland(g, L.cx - 150, L.floor - (V.p ? 380 : 410), L.cx + 150, L.floor - (V.p ? 380 : 410), 50, V.p ? 18 : 15, ap('garlands', 1.6, 0.6));
    floorLine(g, L, pPal);
    // bottom register: rows of painted horses and elephants
    const rowP = Math.max(ap('horses', 2.4), ap('elephants', 2.4) * 0.6);
    bottomReg(g, L, t, rowP, L.p ? ['h:terra', 'e:ochre', 'h:yellow', 'e:pink', 'h:green'] : ['h:terra', 'e:ochre', 'h:yellow', 't', 'h:pink', 'e:indigo', 'h:white', 'm', 'e:pink', 'h:green'], L.p ? ['m', 'e:indigo', 'h:white', 't', 'h:pink'] : null);
    // passers-by who don't notice a thing (choice B)
    if (has('passers')) { const k = since('passers'); for (let i = 0; i < 4; i++) { const x = ((k * 70 + i * L.W / 4) % (L.W + 200)) - 100; person(g, x, L.rows[0] - 8, 0.55, [PAL.red, PAL.indigo, PAL.green, PAL.pink][i], 1, i, i % 2 === 0); } }
    P.baskets.forEach(([x, y, s], i) => basket(g, x, y, s, t, ap('lamps', 1.4, i * 0.3), 3, ['plain']));
    // Bijli: on the wall, then hopping out and drawing himself part by part
    const hopT = since('hop');
    const turn = ease(ap('turn', 0.8)), wig = has('wiggle') && since('wiggle') < 1.8 ? 1 : 0;
    if (hopT < 0) bijli(g, P.bm.x, P.bm.y, P.bm.s, t, { p: wallP, head: -0.32 * turn, wiggle: wig, look: turn });
    else {
      g.save(); g.globalAlpha = 0.22; horse(g, P.bm.x, P.bm.y, P.bm.s, t, 'bijli', { p: 1 }); g.restore();
      const k = ease(clamp(hopT / 1.05)), arc = Math.sin(k * Math.PI);
      if (hopT < 0.05 && !S.v.hopS) { S.v.hopS = 1; sfx('hop'); }
      const x = lerp(P.bm.x, P.bj.x, k), y = lerp(P.bm.y, P.bj.y, k) - arc * (V.p ? 220 : 200), s = lerp(P.bm.s, P.bj.s, k);
      const lk = (has('askA') || has('passers')) ? 0.5 : 1;
      bijli(g, x, y, s, t, { p: clamp(hopT / 1.7), legsF: -0.7 * arc, legsR: 0.55 * arc, head: -0.08 * lk, look: 1, swish: arc });
    }
    // Chiku walks in carrying a basket of lamps
    if (has('chiku')) {
      const k = ease(clamp(since('chiku') / 2.4)), x = lerp(L.W + 140, P.ck.x, k), walking = k < 1;
      const look = has('psst') ? (has('passers') ? Math.sin(since('passers') * 2.2) : -1) : 0;
      const ex = has('psst') && !has('hop') ? 'wow' : has('askA') ? 'calm' : 'smile';
      chiku(g, x, P.ck.y - (walking ? Math.abs(Math.sin(t * 8)) * 10 : 0), P.ck.s, t, { p: ap('chiku', 1.2), carry: 'basket', arm: 'hold', look, expr: ex });
    }
  },
};

// ── Scene 2: Help Bijli Remember (find five pictures) ──────────────────────────
const S2_TARGETS = ['cradle', 'stars', 'moons', 'serpent', 'door'];
const S2_W = { h: 150, e: 210, t: 96, p: 90, b: 130, sun: 160, moon: 76, flower: 64, cradle: 170, stars: 190, moons: 270, serpent: 300, door: 116 };
let S2L = null;
function s2Layout() {
  if (S2L && S2L.gen === V.gen) return S2L;
  const L = LY(), p = L.p;
  const M = p ? { x: 50, y: 70, w: L.W - 100, h: Math.round(L.H * 0.58) } : { x: 60, y: 62, w: L.W - 120, h: 724 };
  const rh = M.h / 4, sc = p ? 1.22 : 1;
  const rowsL = [['sun', 'b:indigo', 'stars', 'flower', 'b:red', 'moons', 'flower', 'b:green', 'moon'], ['h:terra', 't', 'cradle', 'e:indigo', 'p:red', 'h:yellow', 't', 'b:green'], ['p:green', 'b:indigo', 't', 'serpent', 'e:pink', 'p:pink', 'h:white'], ['h:green', 'e:ochre', 'p:turq', 'door', 't', 'h:pink', 'p:orange']];
  const rowsP = [['sun', 'stars', 'moons'], ['h:terra', 'cradle', 'e:indigo', 't'], ['p:green', 'serpent', 't', 'b:indigo'], ['e:ochre', 'door', 'h:pink', 'p:orange']];
  const rows = p ? rowsP : rowsL, items = [], targets = {};
  rows.forEach((row, r) => {
    const base = M.y + rh * (r + 1) - 18, ws = row.map(k => S2_W[k.split(':')[0]] * sc), sum = ws.reduce((a, b) => a + b, 0), gap = (M.w - 60 - sum) / row.length;
    let x = M.x + 30 + gap / 2;
    row.forEach((k, i) => {
      const [type, col] = k.split(':'), cx = x + ws[i] / 2; x += ws[i] + gap;
      const it = { type, col, x: cx, y: base, w: ws[i], r, i, sc, h: (r === 0 ? rh * 0.62 : rh * 0.8) };
      if (r === 0) it.y = M.y + rh * 0.5;
      items.push(it); if (S2_TARGETS.includes(type)) targets[type] = it;
    });
  });
  const slotN = 5, slotW = p ? (L.W - 120 - 4 * 16) / 5 : 168, slotY = p ? M.y + M.h + 34 : 812, slotX0 = p ? 60 : L.W - 96 - 5 * slotW - 4 * 16;
  const slots = S2_TARGETS.map((_, i) => ({ x: slotX0 + i * (slotW + 16), y: slotY, w: slotW, h: p ? 176 : 176 }));
  const chars = p ? { bj: { x: 300, y: L.H - 96, s: 0.9 }, ck: { x: 790, y: L.H - 96, s: 1.0 } } : { bj: { x: 250, y: 1010, s: 0.62 }, ck: { x: 560, y: 1010, s: 0.66 } };
  S2L = { gen: V.gen, L, M, rh, items, targets, slots, chars };
  return S2L;
}
function s2Item(g, it, t, p) {
  const s = it.sc, x = it.x, y = it.y;
  switch (it.type) {
    case 'h': rowHorse(g, x, y, 0.32 * s, it.col, p, it.i % 2 === 1); break;
    case 'e': elephant(g, x, y, 0.5 * s, it.col, p, it.i % 2 === 1); break;
    case 't': tree(g, x, y, 0.45 * s, p, it.i % 3); break;
    case 'p': person(g, x, y, 0.66 * s, PAL[it.col] || PAL.red, p, it.i, it.i % 2 === 0); break;
    case 'b': bird(g, x, it.r === 0 ? y + 30 * s : y - 8, 0.78 * s, PAL[it.col] || PAL.indigo, p, it.i % 2 === 0); break;
    case 'sun': sun(g, x, y, 50 * s, t, p); break;
    case 'moon': moon(g, x, y, 32 * s, 0.6, p); break;
    case 'flower': marigold(g, x, y, 22 * s, p); break;
    case 'cradle': cradle(g, x, y - 26 * s, 1.0 * s, t, p, 1); break;
    case 'stars': [[-60, -12, 20], [-20, 22, 16], [16, -24, 24], [56, 10, 18], [78, -32, 13]].forEach(([dx, dy, r], i) => star(g, x + dx * s, y + dy * s, r * s, partP(p, i, 5), i % 2 ? PAL.wall : PAL.yellow, i)); break;
    case 'moons': [0.15, 0.4, 0.7, 1].forEach((ph, i) => moon(g, x + (i - 1.5) * 64 * s, y, 27 * s, ph, partP(p, i, 4), PAL.wall)); break;
    case 'serpent': serpent(g, x, y - 34 * s, 0.95 * s, t, p, PAL.green, 0); break;
    case 'door': door(g, x, y, 0.37 * s, t, p, 0); break;
  }
}
function s2Hit(it) { const top = it.r === 0 ? it.y - it.h / 2 : it.y - it.h; return [it.x - it.w / 2 - 22, top - 22, it.w + 44, it.h + 44]; }
function s2Thumb(g, id, slot, t, p) {
  if (p <= 0) return;
  const { x, y, w, h } = slot;
  g.save(); rrPath(g, x, y, w, h, 22); g.fillStyle = PAL.wall; g.fill(); g.lineWidth = 6; g.strokeStyle = PAL.char; g.stroke();
  for (let i = 0; i < 16; i++) { const [px, py] = rrPoint(x + 10, y + 10, w - 20, h - 20, 14, i * (2 * (w + h - 40) - 20) / 16); g.fillStyle = i % 2 ? PAL.yellow : PAL.red; g.beginPath(); g.arc(px, py, 3.6, 0, TAU); g.fill(); }
  rrPath(g, x + 14, y + 14, w - 28, h - 28, 14); g.clip();
  const it = { type: id, x: x + w / 2, y: id === 'stars' || id === 'moons' ? y + h / 2 : y + h - 22, sc: id === 'moons' ? w / 300 : id === 'serpent' ? w / 340 : w / 210, i: 0, r: id === 'stars' || id === 'moons' ? 0 : 1 };
  if (id === 'door') it.sc = h / 190;
  if (id === 'cradle') { it.sc = w / 200; it.y = y + h - 30; }
  s2Item(g, it, t, p);
  g.restore();
}
const S2 = {
  id: 's2', ep: 1, mood: 'white', firstShot: 'mural',
  async run(D, S) {
    const A = S.v.A = {
      found: {}, order: [], wob: {}, done: false, lastFind: -9,
      down(x, y) {
        const Lt = s2Layout();
        for (const id of S2_TARGETS) { if (A.found[id]) continue; const [rx, ry, rw, rh] = s2Hit(Lt.targets[id]); if (x >= rx && x <= rx + rw && y >= ry && y <= ry + rh) { A.find(id); return; } }
        for (const it of Lt.items) { const [rx, ry, rw, rh] = s2Hit(it); if (x >= rx && x <= rx + rw && y >= ry && y <= ry + rh) { A.wob[it.r + ':' + it.i] = CLK.t; sfx('tap'); if (Math.random() < 0.4) actSay('s2wrong', 0); return; } }
      },
      find(id) { if (A.found[id]) return; A.found[id] = CLK.t; A.order.push(id); A.lastFind = CLK.t; sfx('found'); A.hintId = null; say('dadi', LINES['s2' + id][1]); },
      hint() { A.hintId = S2_TARGETS.find(id => !A.found[id]); say('chiku', LINES.s2hint[1]); },
      assist() { const id = S2_TARGETS.find(i => !A.found[i]); if (id) A.find(id); },
      assistGap: 6,
      update() { if (A.order.length === 5 && CLK.t - A.lastFind > 1.2 && !SP.cur && SP.pending === 0) A.done = true; },
      drawWorld(g) {
        const Lt = s2Layout(), t = CLK.t;
        if (A.hintId && A.hinted) { const it = Lt.targets[A.hintId], [rx, ry, rw, rh] = s2Hit(it); pulseRing(g, rx + rw / 2, ry + rh / 2, Math.max(rw, rh) * 0.5, t); }
      },
    };
    S.cam = null;
    await D.line('s2a', { shot: { name: 'mural', cam: () => ({ x: V.W / 2, y: V.p ? V.H * 0.32 : V.H * 0.4, z: 1.3 }) } });
    await D.line('s2b', { shot: { name: 'mural', cam: () => { const Lt = s2Layout(); return { x: (Lt.chars.bj.x + Lt.chars.ck.x) / 2 + (V.p ? 0 : 200), y: Lt.chars.bj.y - 220, z: V.p ? 1.5 : 1.7 }; } } });
    D.shot({ name: 'mural', cam: null });
    await D.line('s2go');
    await D.activity(A);
    music.swell(5);
    await D.line('s2c', { shot: { name: 'prophecy', cam: null } });
    await D.line('s2d', { shot: { name: 'prophecy', cam: null }, });
    await D.line('s2e', { shot: { name: 'mural', cam: () => { const Lt = s2Layout(); return { x: Lt.chars.ck.x, y: Lt.chars.ck.y - 200, z: V.p ? 1.8 : 2.4 }; } } });
    D.cue('worry');
    await D.line('s2f', { shot: { name: 'mural', cam: () => { const Lt = s2Layout(); return { x: Lt.chars.ck.x - (V.p ? 100 : 60), y: Lt.chars.ck.y - 230, z: V.p ? 2.1 : 2.9 }; } } });
    await D.line('s2ask', { shot: { name: 'mural', cam: null } });
    const c = await D.choose('c2',
      { label: 'Tell Princess Kesar now', pic: (g, x, y, w, h, t) => withAnchorsSaved(() => { kesar(g, x + w * 0.2, y + h * 0.46, h / 600, t, { arm: 'welcome' }); chiku(g, x - w * 0.2 + Math.sin(t * 3) * 10, y + h * 0.46, h / 430, t, { arm: 'up', hop: true }); }) },
      { label: 'Ask Bijli for advice first', pic: (g, x, y, w, h, t) => withAnchorsSaved(() => { bijli(g, x + w * 0.12, y + h * 0.42, h / 520, t, { head: 0.15 }); chiku(g, x - w * 0.24, y + h * 0.44, h / 430, t, { arm: 'cup', expr: 'think' }); }) });
    if (c === 'a') {
      await D.line('s2A1', { shot: { name: 'run', cam: null } });
      await D.line('s2A2', { shot: { name: 'run', cam: () => ({ x: V.W * 0.5, y: V.H * 0.55, z: 1.35 }), cue: 'bounce' } });
    } else {
      await D.line('s2B1', { shot: { name: 'mural', cam: () => { const Lt = s2Layout(); return { x: (Lt.chars.bj.x + Lt.chars.ck.x) / 2, y: Lt.chars.bj.y - 220, z: V.p ? 1.4 : 2.0 }; } } });
      await D.line('s2B2', { shot: { name: 'mural', cam: () => { const Lt = s2Layout(); return { x: Lt.chars.bj.x + 40, y: Lt.chars.bj.y - 210, z: V.p ? 1.8 : 2.4 }; } } });
      await D.line('s2B3', { shot: { name: 'run', cam: null } });
    }
    await D.wait(0.6);
  },
  draw(g, st, S) {
    const Lt = s2Layout(), L = Lt.L, t = CLK.t, A = S.v.A || { found: {}, order: [], wob: {} };
    if (S.shot === 'prophecy') return s2Prophecy(g, L, t, S, A);
    if (S.shot === 'run') return s2Run(g, L, t, S);
    const P0 = ap('shot:mural', 3.6);
    // the mural: four registers packed with dotted figures
    for (let r = 0; r < 4; r++) regBand(g, Lt.M.x, Lt.M.x + Lt.M.w, Lt.M.y + Lt.rh * (r + 1) - 4, partP(P0, r, 4), r);
    Lt.items.forEach((it, k) => {
      const f = A.found[it.type] !== undefined && S2_TARGETS.includes(it.type);
      const wt = A.wob[it.r + ':' + it.i], wob = wt ? Math.sin((CLK.t - wt) * 30) * 0.08 * clamp(1 - (CLK.t - wt) / 0.5) : 0;
      if (f) { const [rx, ry, rw, rh] = s2Hit(it); ambientGlow(g, L, rx + rw / 2, ry + rh / 2, Math.max(rw, rh) * 0.9, 0.9 + 0.1 * Math.sin(t * 4)); dotRing(g, rx + rw / 2, ry + rh / 2, Math.max(rw, rh) * 0.52, 24, 6, [PAL.glow, PAL.red]); }
      g.save(); if (wob) { g.translate(it.x, it.y); g.rotate(wob); g.translate(-it.x, -it.y); }
      s2Item(g, it, t, partP(P0, it.r * 3 + (it.i % 3), 12, 3));
      g.restore();
    });
    // the strip of found illustrations
    Lt.slots.forEach((sl, i) => {
      const id = A.order[i];
      if (!id) { g.save(); g.globalAlpha = 0.5 * ap('shot:mural', 1, 1.5); rrPath(g, sl.x, sl.y, sl.w, sl.h, 22); g.setLineDash([4, 14]); g.lineWidth = 6; g.strokeStyle = PAL.char; g.stroke(); g.setLineDash([]); g.restore(); return; }
      const k = clamp((CLK.t - A.found[id]) / 0.9), it = Lt.targets[id], [rx, ry, rw, rh] = s2Hit(it);
      if (k < 1) { // fly from the mural to the strip
        const e = ease(k), fx = lerp(rx + rw / 2, sl.x + sl.w / 2, e), fy = lerp(ry + rh / 2, sl.y + sl.h / 2, e) - Math.sin(e * Math.PI) * 120;
        g.save(); g.globalAlpha = 0.9; circle(g, fx, fy, 30 + 20 * Math.sin(e * Math.PI), rgba(PAL.glow, 0.7), PAL.char, 4); g.restore();
      } else s2Thumb(g, id, sl, t, clamp((CLK.t - A.found[id] - 0.9) / 0.6));
    });
    const C2 = Lt.chars, worry = has('worry');
    bijli(g, C2.bj.x, C2.bj.y, C2.bj.s, t, { p: ap('shot:mural', 1, 0.3), head: -0.05 });
    chiku(g, C2.ck.x, C2.ck.y, C2.ck.s, t, { p: ap('shot:mural', 1, 0.5), arm: worry ? 'cup' : 'down', expr: worry ? 'worry' : 'smile', look: -0.6 });
  },
};
function s2Prophecy(g, L, t, S, A) { // the strip, large: the prophecy as a row of pictures
  const p = ap('shot:prophecy', 0.6), n = 5, gap = 22;
  skyReg(g, L, t, p, 'night');
  const w = L.p ? (L.W - 140) / 2.6 : Math.min(300, (L.W - 180 - gap * 4) / 5), h = L.p ? w : w;
  S2_TARGETS.forEach((id, i) => {
    let x, y;
    if (L.p) { const c = i < 3 ? i : i - 3, r = i < 3 ? 0 : 1, rowN = r ? 2 : 3; x = L.W / 2 + (c - (rowN - 1) / 2) * (w + gap) - w / 2; y = L.H * 0.3 + r * (h + gap); }
    else { x = L.W / 2 + (i - 2) * (w + gap) - w / 2; y = 262; }
    const rv = clamp(ap('shot:prophecy', 1, 0.15 + i * 0.25));
    g.save(); g.translate(x + w / 2, y + h / 2); g.scale(lerp(0.85, 1, easeOut(rv)), lerp(0.85, 1, easeOut(rv))); g.translate(-(x + w / 2), -(y + h / 2));
    s2Thumb(g, id, { x, y, w, h }, t, rv);
    g.restore();
    if (i < 4 && !L.p && rv > 0.5) { g.fillStyle = PAL.yellow; for (let k = 0; k < 3; k++) { g.beginPath(); g.arc(x + w + gap / 2, y + h / 2 - 14 + k * 14, 4, 0, TAU); g.fill(); } }
  });
  const by = L.p ? L.H - 96 : L.H - 70;
  bijli(g, L.p ? 280 : 260, by, L.p ? 0.9 : 0.62, t, { head: -0.22 });
  chiku(g, L.p ? 780 : L.W - 240, by, L.p ? 1.0 : 0.66, t, { arm: 'cup', expr: 'worry', look: -1 });
}
function s2Run(g, L, t, S) { // Chiku and Bijli dashing along the palace corridor
  skyReg(g, L, t, ap('shot:run', 1.4), 'day');
  const rp = ap('shot:run', 2);
  for (let i = 0; i < (L.p ? 3 : 5); i++) { const x = L.W * (i + 0.5) / (L.p ? 3 : 5); door(g, x, L.floor, L.p ? 0.62 : 0.72, t, partP(rp, i, 5), 0); garland(g, x - 110, L.floor - (L.p ? 300 : 340), x + 110, L.floor - (L.p ? 300 : 340), 40, 12, partP(rp, i, 5)); }
  floorLine(g, L, rp);
  bottomReg(g, L, t, rp, L.p ? ['m', 'h:terra', 'm', 'h:yellow', 'm'] : ['m', 'h:terra', 'm', 'h:yellow', 'm', 'h:pink', 'm', 'h:green', 'm']);
  const k = clamp(since('shot:run') / 4), x = lerp(L.W * 0.15, L.W * 0.85, k);
  const leg = Math.sin(t * 12);
  bijli(g, x - (L.p ? 260 : 300), L.floor - Math.abs(leg) * 16, L.p ? 0.8 : 0.95, t, { legsF: leg * 0.5, legsR: -leg * 0.5 });
  chiku(g, x, L.floor - Math.abs(Math.sin(t * 12 + 1)) * 22, L.p ? 0.95 : 1.0, t, { carry: 'basket', arm: 'hold', expr: 'wow' });
  if (has('bounce')) { const b = since('bounce'); for (let i = 0; i < 2; i++) { const bb = (b * 1.4 + i * 0.45) % 1.2; diya(g, x - 30 + i * 60, L.floor - (L.p ? 300 : 320) - Math.sin(bb / 1.2 * Math.PI) * 130, 0.5, t, i); } }
}

// ── Scene 3: A plan made of light ─────────────────────────────────────────────
function s3Room(g, L, t, p) { // Kesar's chamber: three arched niches, a low table
  skyReg(g, L, t, p, D.S.v.sunset ? 'sunset' : 'day');
  const nN = L.p ? 2 : 3;
  for (let i = 0; i < nN; i++) {
    const x = L.W * (i + 0.5) / nN, y = L.floor - (L.p ? 330 : 140), w = L.p ? 300 : 300, h = L.p ? 420 : 400;
    const sh = SH('s3arch' + w + 'x' + h, () => { const pts = [[-w / 2, 0], [-w / 2, -h + w / 2]]; for (let j = 0; j <= 16; j++) { const a = Math.PI + j / 16 * Math.PI; pts.push([Math.cos(a) * w / 2, -h + w / 2 + Math.sin(a) * w / 2]); } pts.push([w / 2, 0]); return { pts, fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'grid'), lw: 5 }; });
    g.save(); g.translate(x, y); drawShape(g, sh, partP(p, i, nN));
    if (partP(p, i, nN) >= 1) { tree(g, 0, -20, 0.6, 1, i); bird(g, -60, -h + 160, 0.6, PAL.indigo, 1); }
    g.restore();
  }
  floorLine(g, L, p);
  bottomReg(g, L, t, p, L.p ? ['d', 'm', 'd', 'm', 'd'] : ['d', 'm', 'pl:red', 'd', 'm', 'pl:green', 'd', 'm', 'pl:indigo', 'd'], L.p ? ['pl:red', 'd', 'pl:green', 'd', 'pl:indigo'] : null);
}
function s3Lay() {
  const L = LY(), p = L.p;
  const homes = [], cols = p ? 3 : 9;
  for (let i = 0; i < 9; i++) homes.push(p ? { x: L.cx + ((i % 3) - 1) * 290 - 34, y: L.H * 0.27 + Math.floor(i / 3) * 190 } : { x: L.cx + (i - 4) * 168 - 34, y: 430 });
  const ready = p ? { x: 60, y: L.H * 0.585, w: 470, h: 230 } : { x: L.cx - 620, y: 700, w: 590, h: 200 };
  const repair = p ? { x: 560, y: L.H * 0.585, w: 460, h: 230 } : { x: L.cx + 40, y: 700, w: 520, h: 200 };
  const slots = []; for (let i = 0; i < 9; i++) { const r = i < 5 ? 0 : 1, c = r ? i - 5 : i, n = r ? 4 : 5; slots.push({ x: ready.x + ready.w / 2 + (c - (n - 1) / 2) * (ready.w / 5.3) - 18, y: ready.y + (r ? ready.h - 26 : ready.h * 0.6) }); }
  const ks = p ? { x: 190, y: L.H - 96, s: 0.86 } : { x: 170, y: L.floor + 150, s: 0.8 }, cks = p ? { x: 880, y: L.H - 96, s: 0.98 } : { x: L.W - 150, y: L.floor + 150, s: 0.86 };
  return { L, homes, ready, repair, slots, ks, cks, ls: p ? 1.4 : 1.3 };
}
const S3_NEED = ['ok', 'ok', 'oil', 'ok', 'ok', 'wick', 'ok', 'oil', 'ok'];
const S3 = {
  id: 's3', ep: 1, mood: 'white', firstShot: 'room',
  async run(D, S) {
    const camK = (z = 1.9, dy = 330) => () => { const L = LY(), x = V.p ? 300 : L.cx - 320; return { x, y: L.floor - dy, z: V.p ? z * 0.9 : z }; };
    await D.line('s3a', { shot: { name: 'room', cam: () => ({ x: V.W * 0.42, y: V.H * 0.5, z: 1.1 }) } });
    await D.line(C('c2') === 'a' ? 's3cbA' : 's3cbB', { shot: { name: 'room', cam: camK(1.6, 300) } });
    await D.line('s3b', { shot: { name: 'room', cam: camK(2.2, 300) } });
    await D.line('s3c', { shot: { name: 'room', cam: camK(2.6, 330), cue: 'k1' } });
    await D.line('s3d', { shot: { name: 'room', cam: () => ({ x: V.W * 0.5, y: V.H * 0.55, z: 1.2 }), cue: 'k2' } });
    await D.line('s3e', { shot: { name: 'room', cam: camK(2.0, 360), cue: 'k3' } });
    await D.line('s3f', { shot: { name: 'room', cam: () => ({ x: V.W * 0.5, y: V.H * 0.52, z: 1.08 }) } });
    // Activity: Prepare the Lamps
    const lay = s3Lay();
    const lamps = S3_NEED.map((need, i) => ({ i, need, x: lay.homes[i].x, y: lay.homes[i].y, st: 'home', oil: need === 'oil' ? 0 : 1, wick: need === 'wick' ? 'burnt' : 'good', fixT: -1, slot: -1 }));
    let readyN = 0, okLine = 0;
    const inRect = (r, x, y) => x >= r.x - 30 && x <= r.x + r.w + 30 && y >= r.y - 60 && y <= r.y + r.h + 30;
    const A = S.v.A = {
      lamps, done: false, drag: null,
      sendReady(l) { l.st = 'fly'; l.from = [l.x, l.y]; l.slot = readyN++; l.flyT = CLK.t; l.to = 'ready'; },
      fixThen(l, line) { l.st = 'fix'; l.from = [l.x, l.y]; const r = s3Lay().repair; l.fixAt = [r.x + r.w / 2 - 20, r.y + r.h * 0.62]; l.fixT = CLK.t; actSay(line, 2); },
      drop(l, where) {
        if (where === 'ready') { if (l.need === 'ok') { actSay(okLine++ % 2 ? 's3okR2' : 's3okR', 1); A.sendReady(l); sfx('place'); } else A.fixThen(l, l.need === 'oil' ? 's3dryR' : 's3wickR'); }
        else { if (l.need === 'ok') { actSay('s3okW', 2); A.sendReady(l); sfx('place'); } else A.fixThen(l, l.need === 'oil' ? 's3dryW' : 's3wickW'); }
      },
      hitLamp(x, y) { const s = s3Lay().ls; return lamps.find(l => l.st === 'home' && Math.abs(x - (l.x + 10 * s)) < 85 * s && y > l.y - 90 * s && y < l.y + 40 * s); },
      down(x, y) { const l = A.hitLamp(x, y); if (!l) return; A.drag = { l, ox: l.x - x, oy: l.y - y, t: CLK.t, x0: x, y0: y, moved: 0 }; l.st = 'drag'; sfx('tap'); },
      move(x, y) { const d = A.drag; if (!d) return; d.l.x = x + d.ox; d.l.y = y + d.oy; d.moved = Math.max(d.moved, Math.hypot(x - d.x0, y - d.y0)); },
      up(x, y) {
        const d = A.drag; if (!d) return; A.drag = null; const l = d.l, lay = s3Lay();
        if (d.moved < 18) { l.x = lay.homes[l.i].x; l.y = lay.homes[l.i].y; A.drop(l, l.need === 'ok' ? 'ready' : 'repair'); return; }
        if (inRect(lay.ready, x, y)) A.drop(l, 'ready'); else if (inRect(lay.repair, x, y)) A.drop(l, 'repair');
        else { l.st = 'back'; l.from = [l.x, l.y]; l.flyT = CLK.t; }
      },
      hint() { A.hintL = lamps.find(l => l.st === 'home'); actSay('s3hint', 0); },
      assist() { const l = lamps.find(l => l.st === 'home'); if (l) A.drop(l, l.need === 'ok' ? 'ready' : 'repair'); },
      assistGap: 3,
      update() {
        const lay = s3Lay();
        lamps.forEach(l => {
          if (l.st === 'fix') { const k = (CLK.t - l.fixT); if (k > 0.1 && !l.pour) { l.pour = 1; sfx(l.need === 'oil' ? 'pour' : 'sparkle'); } if (l.need === 'oil') l.oil = clamp((k - 0.6) / 0.9); else if (k > 1.0) l.wick = 'good'; if (k > 1.9) { A.sendReady(l); sfx('place'); } }
          if (l.st === 'back' && CLK.t - l.flyT > 0.4) l.st = 'home';
          if (l.st === 'fly' && CLK.t - l.flyT > 0.7) l.st = 'ready';
        });
        if (lamps.every(l => l.st === 'ready') && !A.doneT) A.doneT = CLK.t;
        if (A.doneT && CLK.t - A.doneT > 0.6) A.done = true;
      },
      pos(l) {
        const lay = s3Lay();
        if (l.st === 'home') return [lay.homes[l.i].x, lay.homes[l.i].y, lay.ls];
        if (l.st === 'drag') return [l.x, l.y, lay.ls * 1.25];
        if (l.st === 'back') { const k = ease(clamp((CLK.t - l.flyT) / 0.4)); return [lerp(l.from[0], lay.homes[l.i].x, k), lerp(l.from[1], lay.homes[l.i].y, k), lay.ls]; }
        if (l.st === 'fix') { const k = ease(clamp((CLK.t - l.fixT) / 0.5)); return [lerp(l.from[0], l.fixAt[0], k), lerp(l.from[1], l.fixAt[1], k) - Math.sin(k * Math.PI) * 60, lerp(lay.ls, 0.95, k)]; }
        const sl = lay.slots[l.slot] || lay.slots[0];
        if (l.st === 'fly') { const k = ease(clamp((CLK.t - l.flyT) / 0.7)); const fx = l.from[0], fy = l.from[1]; return [lerp(fx, sl.x, k), lerp(fy, sl.y, k) - Math.sin(k * Math.PI) * 90, lerp(lay.ls, 0.62, k)]; }
        return [sl.x, sl.y, 0.62];
      },
      drawWorld(g) {
        const lay = s3Lay(), t = CLK.t, lit = D.S.v.lit;
        // trays with labels
        [[lay.ready, 'Ready to Shine', PAL.yellow], [lay.repair, 'Needs Repair', PAL.ochre]].forEach(([r, label, col], i) => {
          const sh = SH('tray' + i + V.gen, () => ({ pts: [[r.x, r.y + 30], [r.x + r.w, r.y + 30], [r.x + r.w - 24, r.y + r.h], [r.x + 24, r.y + r.h]], fill: col, pat: PT(PAL.red, PAL.wall, 'zig'), lw: 6 }));
          drawShape(g, sh, 1);
          pill(g, r.x + r.w / 2, r.y + 34, label, V.p ? 50 : 46, PAL.wall);
        });
        if (A.hinted && A.hintL && A.hintL.st === 'home') { const [x, y, s] = A.pos(A.hintL); pulseRing(g, x + 10 * s, y - 20 * s, 90 * s, t); }
        // lamps (dragged one last so it sits on top)
        const order = lamps.slice().sort((a, b) => (a.st === 'drag') - (b.st === 'drag'));
        order.forEach(l => {
          const [x, y, s] = A.pos(l);
          diya(g, x, y, s, t, l.i, { oil: l.oil, wick: l.wick, lit: lit && l.st === 'ready', bright: lit ? 1 : 0, wind: lit ? Math.sin(t * 1.3 + l.i) * 0.15 : 0 });
          if (l.st === 'fix') { const k = CLK.t - l.fixT; if (l.need === 'oil' && k > 0.5 && k < 1.6) { g.fillStyle = PAL.glow; for (let d = 0; d < 4; d++) { const yy = y - 120 * s + ((k * 300 + d * 30) % 100) * s; g.beginPath(); g.ellipse(x - 4, yy, 6, 9, 0, 0, TAU); g.fill(); g.strokeStyle = PAL.char; g.lineWidth = 2; g.stroke(); } } if (l.need === 'wick' && k > 0.9 && k < 1.7) star(g, x + 60 * s, y - 60 * s, 26 * (1 - Math.abs(k - 1.3) * 2), 1, PAL.glow, k * 4); }
        });
      },
    };
    D.shot({ name: 'lamps', cam: null });
    await D.line('s3go');
    await D.activity(A);
    music.swell(5);
    await D.line('s3done', { shot: { name: 'lamps', cam: () => { const lay = s3Lay(); return { x: lay.ready.x + lay.ready.w / 2, y: lay.ready.y + 60, z: V.p ? 1.6 : 1.7 }; } } });
    // sunset beat
    S.v.A.done = true; ACT = null; S.v.keep = A;
    D.mood('worry', 3.5); S.v.sunset = 1; D.cue('sunset');
    await D.line('s3g', { shot: { name: 'sunset', cam: null } });
    S.v.lit = 1; D.cue('lit'); sfx('relight');
    await D.wait(1.0);
    await D.line('s3h', { shot: { name: 'sunset', cam: () => { const L = LY(); return { x: V.p ? V.W * 0.6 : V.W * 0.62, y: L.floor - 200, z: 1.5 }; } } });
    // cliffhanger: Pithora Red, the long shadow
    music.silence(9);
    D.mood('danger', 0.01);
    await D.line('s3i', { shot: { name: 'door', cam: () => ({ x: V.W / 2, y: V.p ? V.H * 0.55 : V.H * 0.52, z: 1.25 }) } });
    await D.line('s3j', { shot: { name: 'door', cam: () => { const L = LY(); return { x: V.W / 2, y: L.floor - 80, z: 1.9 }; } } });
    await D.wait(3.2);
  },
  draw(g, st, S) {
    const L = LY(), t = CLK.t;
    if (S.shot === 'door') return s3Door(g, L, t, S);
    const rp = ap('shot:room', 2.6);
    s3Room(g, L, t, Math.max(rp, ap('shot:lamps', 1)));
    const lay = s3Lay();
    const actOn = S.shot === 'lamps' || S.shot === 'sunset';
    // sunset: long shadows and lit lamps
    const sh = ap('sunset', 3);
    if (!actOn) {
      // the low table with lamps
      const tx = L.p ? L.cx + 100 : L.cx + 40, ty = L.floor;
      drawShape(g, SH('s3table' + V.gen, () => ({ pts: rectP(tx - 200, ty - 90, 400, 34), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'ticks'), lw: 5, step: 6 })), rp);
      [-150, 150].forEach(dx => drawShape(g, SH('s3leg' + dx + V.gen, () => ({ pts: rectP(tx + dx - 12, ty - 58, 24, 58), fill: PAL.terra, lw: 4, step: 4 })), rp));
      for (let i = 0; i < 5; i++) diya(g, tx - 160 + i * 74, ty - 92, 0.6, t, i, { p: partP(rp, i, 5), oil: S3_NEED[i] === 'oil' ? 0 : 1, wick: S3_NEED[i] === 'wick' ? 'burnt' : 'good' });
      const ksX = L.p ? 300 : L.cx - 320, ckX = L.p ? 760 : L.cx + 330;
      const k1 = has('k1'), k2 = has('k2'), k3 = has('k3');
      kesar(g, ksX, L.floor, L.p ? 1.05 : 1.1, t, { p: ap('kesar', 1.4), arm: k3 ? 'tell' : k2 ? 'welcome' : 'hold', armL: k2 ? 'welcome' : 'down', lamp: has('lamp') && !k2, lampLit: k1, wick: 'good', expr: 'calm' });
      chiku(g, ckX, L.floor, L.p ? 1.0 : 1.05, t, { p: 1, arm: 'hold', carry: 'basket', expr: has('k3') ? 'smile' : 'calm', look: -1 });
      bijli(g, L.p ? 880 : L.cx + 690, L.floor, L.p ? 0.62 : 0.95, t, { flip: true, head: 0.05 });
      if (has('k1')) ambientGlow(g, L, ksX + 60, L.floor - 300, 240, ap('k1', 1));
      return;
    }
    kesar(g, lay.ks.x, lay.ks.y, lay.ks.s, t, { arm: S.v.lit ? 'namaste' : 'down', expr: sh > 0 ? 'worry' : 'smile' });
    chiku(g, lay.cks.x, lay.cks.y, lay.cks.s, t, { arm: 'point', flip: true, expr: sh > 0 ? 'worry' : 'smile' });
    if (S.shot === 'sunset') {
      longShadow(g, lay.ks.x, lay.ks.y, 110, 520, 0.45 * sh, 1); longShadow(g, lay.cks.x, lay.cks.y, 90, 420, 0.45 * sh, -1);
      bijli(g, V.p ? 700 : L.W - 420, lay.cks.y, V.p ? 0.62 : 0.72, t, { flip: true, head: -0.1 });
      ambientGlow(g, L, lay.ready.x + lay.ready.w / 2, lay.ready.y + 80, 420, ap('lit', 1.5));
    }
    const keep = S.v.keep; if (keep) keep.drawWorld(g);
  },
};
function s3Door(g, L, t, S) {
  const p = ap('shot:door', 1.8);
  // a ground row of tiny figures keeps the register language even in the danger beat
  skyReg(g, L, t, p, 'night');
  const ds = L.p ? 1.65 : 1.45;
  door(g, L.cx, L.floor, ds, t, p, 0);
  floorLine(g, L, p);
  bottomReg(g, L, t, p, L.p ? ['d', 'm', 'd', 'm', 'd'] : ['d', 'm', 'd', 'm', 'd', 'm', 'd', 'm', 'd']);
  const k = ease(ap('shadow', 4));
  if (k > 0) { // a long shadow slides from beneath the door
    g.save(); g.fillStyle = rgba(PAL.char, 0.85);
    const w = 150 * ds, len = lerp(10, L.p ? 420 : 760, k), y = L.floor + 2;
    g.beginPath(); g.moveTo(L.cx - w, y);
    for (let i = 0; i <= 20; i++) { const f = i / 20; g.lineTo(L.cx - w + f * len * 0.3 - f * f * 30, y + f * len * 0.22 + Math.sin(f * 7 + t * 2) * 6 * f); }
    g.lineTo(L.cx + w * 0.4, y + len * 0.22); g.lineTo(L.cx + w, y); g.closePath(); g.fill();
    g.restore();
  }
}

SEQ.push(cardScene('t1', 1, 'The Horse That Spoke', ['title1', 'title2', 'ep1'], null, 'sun'), S1, S2, S3);
