// ───────────────────────── Painted motifs (all point lists) ─────────────────────────
const PT = (a, b, k = 'rows') => `${k}|${a}|${b}`;
// draw fn(g, p) at (x,y) scale s; fully drawn static motifs come from the sprite cache
function fig(g, key, x, y, s, p, box, fn, flip = false, rot = 0) {
  if (p <= 0) return;
  g.save(); g.translate(x, y); if (rot) g.rotate(rot); g.scale(flip ? -s : s, s);
  if (p >= 1 && box) { const sp = sprite(key, s, box, g2 => fn(g2, 1)); g.drawImage(sp.c, sp.bx, sp.by, sp.bw, sp.bh); }
  else fn(g, p);
  g.restore();
}
function circle(g, x, y, r, fill, line = PAL.char, lw = 3) { g.beginPath(); g.arc(x, y, r, 0, TAU); if (fill) { g.fillStyle = fill; g.fill(); } if (lw) { g.lineWidth = lw; g.strokeStyle = line; g.stroke(); } }
function dotRing(g, x, y, r, n, rr, cols, p = 1) { for (let i = 0; i < n * p; i++) { const a = i / n * TAU - Math.PI / 2; g.fillStyle = cols[i % cols.length]; g.beginPath(); g.arc(x + Math.cos(a) * r, y + Math.sin(a) * r, rr, 0, TAU); g.fill(); } }

// ── Flame: the hero element. Flicker, brightness and bending under wind are pure functions of t.
function flame(g, x, y, s, t, seed = 0, o = {}) {
  const wind = o.wind || 0, bright = o.bright ?? 1, out = o.out || 0;
  if (out >= 1) { smoke(g, x, y, s, t, seed, o.outT ?? 0); return; }
  const fl = 1 + 0.09 * noise(t * 7 + seed * 13) + 0.05 * Math.sin(t * 17 + seed);
  const h = s * 54 * fl * (1 - out) * (o.grow ?? 1), w = s * 15 * (1 - out * .5);
  const sway = (Math.sin(t * 2.3 + seed * 4) * 0.12 + noise(t * 3.1 + seed * 7) * 0.12) * h + wind * h * 0.95;
  const lean = wind * 0.35;
  // glow
  if (bright > 0) {
    g.save(); g.globalCompositeOperation = 'lighter';
    const R = s * (70 + 24 * bright) * (0.92 + 0.08 * fl);
    const gr = g.createRadialGradient(x + sway * 0.4, y - h * 0.4, 0, x + sway * 0.4, y - h * 0.4, R);
    gr.addColorStop(0, rgba(PAL.glow, 0.42 * bright)); gr.addColorStop(0.45, rgba(PAL.glow, 0.13 * bright)); gr.addColorStop(1, rgba(PAL.glow, 0));
    g.fillStyle = gr; g.fillRect(x - R + sway * .4, y - h * .4 - R, R * 2, R * 2); g.restore();
  }
  const layer = (sc, col, lw) => {
    const hh = h * sc, ww = w * sc, tipx = x + sway * sc, tipy = y - hh;
    g.beginPath(); g.moveTo(x - ww, y - ww * 0.2);
    g.bezierCurveTo(x - ww * 1.25, y - hh * 0.45, tipx - ww * (0.5 + lean), tipy + hh * 0.25, tipx, tipy);
    g.bezierCurveTo(tipx + ww * (0.5 - lean), tipy + hh * 0.25, x + ww * 1.25, y - hh * 0.45, x + ww, y - ww * 0.2);
    g.quadraticCurveTo(x, y + ww * 0.9, x - ww, y - ww * 0.2); g.closePath();
    g.fillStyle = col; g.fill(); if (lw) { g.lineWidth = lw; g.strokeStyle = PAL.char; g.stroke(); }
  };
  layer(1, PAL.orange, 3 * s); layer(0.68, PAL.yellow, 0); layer(0.36, PAL.wall, 0);
}
function smoke(g, x, y, s, t, seed, outT) {
  const a = clamp(1 - outT / 1.8); if (a <= 0) return;
  g.save(); g.globalAlpha = a * 0.7; g.fillStyle = PAL.char;
  for (let i = 0; i < 6; i++) { const k = i / 6, yy = y - 10 * s - k * 70 * s - outT * 20 * s; g.beginPath(); g.arc(x + Math.sin(k * 6 + t * 2 + seed) * 10 * s, yy, (3.2 - k * 1.6) * s, 0, TAU); g.fill(); }
  g.restore();
}
// ── Clay lamp (diya). o: lit, oil (0..1), wick ('good'|'burnt'), kind ('plain'|'shiny'|'chipped'), wind, out, p
function diya(g, x, y, s, t, seed = 0, o = {}) {
  const p = o.p ?? 1; if (p <= 0) return;
  const kind = o.kind || 'plain';
  const bodyCol = kind === 'shiny' ? PAL.orange : kind === 'chipped' ? PAL.ochre : PAL.terra;
  const patK = kind === 'shiny' ? PT(PAL.yellow, PAL.wall, 'dots') : kind === 'chipped' ? PT(PAL.terra, PAL.wall, 'ticks') : PT(PAL.wall, PAL.yellow, 'rows');
  g.save(); g.translate(x, y); g.scale(s, s);
  const bowl = SH('diya:' + kind, () => ({ pts: cr(kind === 'chipped' ? [[-52, -20], [-30, -21], [-24, -12], [-14, -21], [40, -21], [70, -30], [44, 4], [0, 16], [-40, 6]] : [[-52, -20], [40, -21], [70, -30], [44, 4], [0, 16], [-40, 6]], true, 7), fill: bodyCol, pat: patK, lw: 4 }));
  // oil surface
  const oil = o.oil ?? 1;
  const pb = clamp(p * 1.4);
  drawShape(g, bowl, pb);
  if (pb > 0.6) {
    g.globalAlpha = clamp((pb - .6) / .4);
    g.beginPath(); g.ellipse(-4, -20, 46, 7, 0, 0, TAU); g.fillStyle = oil > 0.3 ? PAL.glow : mixc(PAL.terra, PAL.char, 0.45); g.fill(); g.lineWidth = 3; g.strokeStyle = PAL.char; g.stroke();
    if (oil > 0.3) { g.fillStyle = rgba(PAL.wall, 0.8); g.beginPath(); g.ellipse(-18, -21, 12, 2.4, 0, 0, TAU); g.fill(); }
    else { g.strokeStyle = PAL.char; g.lineWidth = 2; g.beginPath(); g.moveTo(-30, -22); g.lineTo(-18, -18); g.lineTo(-6, -23); g.moveTo(8, -19); g.lineTo(20, -23); g.stroke(); }
    // wick
    const burnt = o.wick === 'burnt';
    g.lineWidth = 6; g.lineCap = 'round'; g.strokeStyle = burnt ? PAL.char : PAL.wall;
    g.beginPath(); g.moveTo(40, -20); g.quadraticCurveTo(52, -26, burnt ? 56 : 60, burnt ? -26 : -32); g.stroke();
    g.lineWidth = 2; g.strokeStyle = PAL.char; g.beginPath(); g.moveTo(40, -17); g.quadraticCurveTo(52, -22, burnt ? 56 : 60, -28); g.stroke();
    if (burnt) { g.fillStyle = PAL.char; g.beginPath(); g.arc(57, -28, 4.5, 0, TAU); g.fill(); }
    g.globalAlpha = 1;
  }
  g.restore();
  if (o.lit && p >= 1) flame(g, x + 60 * s, y - 32 * s, s * (o.fs || 1), t, seed, o);
  else if (o.out >= 1 && p >= 1) smoke(g, x + 60 * s, y - 32 * s, s, t, seed, o.outT || 0);
}

// ── Sun, moon, stars
function sun(g, x, y, r, t, p = 1, face = true) {
  if (p <= 0) return;
  g.save(); g.translate(x, y);
  const n = 16, rot = t * 0.12;
  for (let i = 0; i < n * clamp(p * 1.6); i++) {
    const a = rot + i / n * TAU, c = i % 2 ? PAL.red : PAL.orange;
    g.beginPath(); g.moveTo(Math.cos(a - 0.12) * r * 1.05, Math.sin(a - 0.12) * r * 1.05); g.lineTo(Math.cos(a) * r * (i % 2 ? 1.42 : 1.6), Math.sin(a) * r * (i % 2 ? 1.42 : 1.6)); g.lineTo(Math.cos(a + 0.12) * r * 1.05, Math.sin(a + 0.12) * r * 1.05);
    g.closePath(); g.fillStyle = c; g.fill(); g.lineWidth = 3; g.strokeStyle = PAL.char; g.stroke();
  }
  g.scale(r / 100, r / 100);
  const disc = SH('sun', () => ({ pts: ell(0, 0, 100, 100, 40), fill: PAL.yellow, pat: PT(PAL.red, PAL.orange, 'dots'), lw: 5 }));
  drawShape(g, disc, p);
  if (face && p > 0.7) {
    g.globalAlpha = clamp((p - .7) / .3);
    circle(g, 0, 0, 62, PAL.yellow, PAL.char, 4);
    circle(g, -24, -12, 9, PAL.wall, PAL.char, 3); circle(g, 24, -12, 9, PAL.wall, PAL.char, 3);
    g.fillStyle = PAL.char; g.beginPath(); g.arc(-24, -12, 4, 0, TAU); g.arc(24, -12, 4, 0, TAU); g.fill();
    g.lineWidth = 5; g.strokeStyle = PAL.char; g.beginPath(); g.arc(0, 8, 24, 0.2, Math.PI - 0.2); g.stroke();
    g.fillStyle = PAL.red; g.beginPath(); g.arc(0, -36, 6, 0, TAU); g.fill();
    g.globalAlpha = 1;
  }
  g.restore();
}
function moon(g, x, y, r, phase = 0.6, p = 1, col = PAL.wall) {
  if (p <= 0) return;
  const key = 'moon' + phase.toFixed(2) + col;
  fig(g, key, x, y, r / 50, p, [-60, -60, 120, 120], (g2, pp) => {
    const sh = SH(key, () => {
      if (phase >= 1) return { pts: ell(0, 0, 50, 50, 36), fill: col, pat: PT(PAL.yellow, PAL.ochre, 'grid'), lw: 4 };
      const pts = []; for (let i = 0; i <= 24; i++) { const a = -Math.PI / 2 + i / 24 * Math.PI; pts.push([Math.cos(a) * 50, Math.sin(a) * 50]); }
      for (let i = 24; i >= 0; i--) { const a = -Math.PI / 2 + i / 24 * Math.PI; pts.push([Math.cos(a) * 50 * (1 - 2 * phase) , Math.sin(a) * 50]); }
      return { pts, fill: col, pat: PT(PAL.yellow, PAL.ochre, 'grid'), lw: 4 };
    });
    drawShape(g2, sh, pp);
  });
}
function star(g, x, y, r, p = 1, col = PAL.yellow, rot = 0) {
  if (p <= 0) return;
  fig(g, 'star' + col, x, y, r / 30, p, [-36, -36, 72, 72], (g2, pp) => {
    const sh = SH('star' + col, () => { const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i / 10 * TAU, R = i % 2 ? 13 : 30; pts.push([Math.cos(a) * R, Math.sin(a) * R]); } return { pts, fill: col, pat: null, lw: 3.5, step: 0, wob: 0 }; });
    drawShape(g2, sh, pp); if (pp >= 1) { g2.fillStyle = PAL.red; g2.beginPath(); g2.arc(0, 0, 5, 0, TAU); g2.fill(); }
  }, false, rot);
}

// ── Pithora horse (Bijli is one). Facing right, ground at y=0. Parts draw in order: tail, body, legs, neck & head, eye.
const HORSE_COLS = {
  bijli: { body: PAL.turq, bp: PT(PAL.yellow, PAL.wall), saddle: PAL.red, sp: PT(PAL.yellow, PAL.wall, 'dots'), mane: PAL.orange, mp: PT(PAL.red, PAL.wall, 'zig'), tail: PAL.pink, tp: PT(PAL.wall, PAL.yellow, 'ticks') },
  terra: { body: PAL.terra, bp: PT(PAL.wall, PAL.yellow), saddle: PAL.green, sp: PT(PAL.yellow, PAL.wall, 'dots'), mane: PAL.yellow, mp: PT(PAL.red, PAL.wall, 'zig'), tail: PAL.yellow, tp: PT(PAL.red, PAL.wall, 'ticks') },
  yellow: { body: PAL.yellow, bp: PT(PAL.red, PAL.green), saddle: PAL.indigo, sp: PT(PAL.wall, PAL.yellow, 'dots'), mane: PAL.red, mp: PT(PAL.yellow, PAL.wall, 'zig'), tail: PAL.red, tp: PT(PAL.yellow, PAL.wall, 'ticks') },
  white: { body: PAL.wall, bp: PT(PAL.red, PAL.green), saddle: PAL.orange, sp: PT(PAL.red, PAL.wall, 'dots'), mane: PAL.indigo, mp: PT(PAL.wall, PAL.yellow, 'zig'), tail: PAL.green, tp: PT(PAL.wall, PAL.yellow, 'ticks') },
  pink: { body: PAL.pink, bp: PT(PAL.wall, PAL.yellow), saddle: PAL.yellow, sp: PT(PAL.red, PAL.wall, 'dots'), mane: PAL.indigo, mp: PT(PAL.wall, PAL.yellow, 'zig'), tail: PAL.indigo, tp: PT(PAL.wall, PAL.yellow, 'ticks') },
  green: { body: PAL.green, bp: PT(PAL.yellow, PAL.wall), saddle: PAL.red, sp: PT(PAL.yellow, PAL.wall, 'dots'), mane: PAL.yellow, mp: PT(PAL.red, PAL.wall, 'zig'), tail: PAL.orange, tp: PT(PAL.wall, PAL.red, 'ticks') },
};
function horseShapes(cn) {
  const C = HORSE_COLS[cn], k = 'h:' + cn + ':';
  return {
    body: SH(k + 'body', () => ({ pts: cr([[-148, -168], [-176, -130], [-162, -92], [-120, -80], [-60, -90], [10, -88], [66, -86], [104, -100], [122, -138], [108, -172], [60, -180], [-10, -168], [-80, -186]], true, 8), fill: C.body, pat: C.bp, lw: 5 })),
    saddle: SH(k + 'saddle', () => ({ pts: cr([[-86, -183], [-30, -175], [32, -181], [38, -134], [0, -118], [-56, -117], [-90, -132]], true, 6), fill: C.saddle, pat: C.sp, lw: 4.5 })),
    leg: SH(k + 'leg', () => ({ pts: band([[0, -4], [3, 46], [-1, 90]], 17, 11), fill: C.body, pat: null, lw: 4.5 })),
    hoof: SH(k + 'hoof', () => ({ pts: ell(-1, 92, 9, 6, 14), fill: PAL.char, lw: 3, step: 0, wob: 0 })),
    neck: SH(k + 'neck', () => ({ pts: band([[0, 0], [22, -42], [44, -78], [66, -98]], 54, 36, 6, false), fill: C.body, pat: C.bp, lw: 5 })),
    mane: SH(k + 'mane', () => { const pts = []; const base = cr([[-22, -4], [-2, -50], [22, -88], [48, -114]], false, 6); base.forEach((q, i) => { pts.push([q[0] - (i % 2 ? 12 : 22), q[1] - (i % 2 ? 2 : 8)]); }); for (let i = base.length - 1; i >= 0; i--) pts.push([base[i][0] + 6, base[i][1] + 4]); return { pts, fill: C.mane, pat: null, lw: 4, step: 4 }; }),
    head: SH(k + 'head', () => ({ pts: cr([[-24, -20], [10, -32], [42, -16], [66, 14], [72, 38], [56, 48], [30, 34], [2, 18], [-24, 10]], true, 7), fill: C.body, pat: C.bp, lw: 5 })),
    ear: SH(k + 'ear', () => ({ pts: [[-9, 2], [-2, -42], [11, 0]], fill: C.body, pat: null, lw: 4, step: 3 })),
    tail: SH(k + 'tail', () => ({ pts: band([[0, 0], [-26, -40], [-38, -92], [-22, -134], [6, -140]], 24, 9), fill: C.tail, pat: C.tp, lw: 4.5 })),
  };
}
// o: {p, head (rad), ear (rad), legsF, legsR (rad), tail (rad), mouth 0..1, blink, eyeLook}
function horse(g, x, y, s, t, cn = 'bijli', o = {}, flip = false) {
  const p = o.p ?? 1; if (p <= 0) return;
  const H = horseShapes(cn), C = HORSE_COLS[cn];
  const gp = [0, 1, 2, 3, 4].map(i => partP(p, i, 5, 1.8));
  g.save(); g.translate(x, y); g.scale(flip ? -s : s, s); if (o.rot) g.rotate(o.rot);
  const leg = (hx, hy, a, pp, near) => { g.save(); g.translate(hx, hy); g.rotate(a); if (!near) g.globalAlpha *= 1; drawShape(g, H.leg, pp); drawShape(g, H.hoof, pp); g.restore(); };
  // tail
  g.save(); g.translate(-160, -150); g.rotate(o.tail || 0); drawShape(g, H.tail, gp[0]); g.restore();
  // far legs
  leg(-100, -90, o.legsR ? -o.legsR * 0.8 : 0, gp[2], false); leg(64, -92, o.legsF ? o.legsF * 0.8 : 0, gp[2], false);
  drawShape(g, H.body, gp[1]); drawShape(g, H.saddle, gp[1]);
  if (gp[1] > 0.9) { // saddle tassels
    g.globalAlpha = clamp((gp[1] - .9) * 10); for (let i = 0; i < 6; i++) circle(g, -76 + i * 22, -112, 5, i % 2 ? PAL.yellow : PAL.wall, PAL.char, 2); g.globalAlpha = 1;
  }
  leg(-132, -96, o.legsR || 0, gp[2], true); leg(92, -98, o.legsF || 0, gp[2], true);
  // neck + head group
  g.save(); g.translate(82, -150); g.rotate(o.head || 0);
  drawShape(g, H.mane, gp[3]); drawShape(g, H.neck, gp[3]);
  g.translate(66, -98);
  g.save(); g.translate(-4, -22); g.rotate(-0.2 + (o.ear || 0)); drawShape(g, H.ear, gp[3]); g.restore();
  drawShape(g, H.head, gp[3]);
  g.save(); g.translate(10, -24); g.rotate(0.15 + (o.ear || 0) * 0.6); drawShape(g, H.ear, gp[3]); g.restore();
  // mouth & nostril
  if (gp[3] >= 1) {
    const m = o.mouth || 0;
    g.lineWidth = 3.5; g.strokeStyle = PAL.char; g.lineCap = 'round';
    g.beginPath(); g.moveTo(42, 34); g.quadraticCurveTo(54, 40 + m * 10, 64, 40 + m * 4); g.stroke();
    if (m > 0.05) { g.fillStyle = PAL.red; g.beginPath(); g.moveTo(44, 35); g.quadraticCurveTo(54, 40 + m * 12, 63, 41 + m * 5); g.quadraticCurveTo(54, 38, 44, 35); g.fill(); }
    g.fillStyle = PAL.char; g.beginPath(); g.arc(60, 22, 3.5, 0, TAU); g.fill();
    // bridle dots
    for (let i = 0; i < 4; i++) circle(g, 6 + i * 13, 14 + i * 7, 3.6, i % 2 ? PAL.yellow : PAL.red, PAL.char, 1.5);
  }
  // eye
  if (gp[4] > 0) {
    g.globalAlpha = gp[4];
    const bl = o.blink ? 0.2 : 1;
    g.beginPath(); g.ellipse(14, -8, 13, 10 * bl, -0.2, 0, TAU); g.fillStyle = PAL.wall; g.fill(); g.lineWidth = 3.5; g.strokeStyle = PAL.char; g.stroke();
    if (bl > 0.5) { g.fillStyle = PAL.char; g.beginPath(); g.arc(16 + (o.eyeLook || 0) * 3, -8, 5.5, 0, TAU); g.fill(); g.fillStyle = PAL.wall; g.beginPath(); g.arc(18, -10, 1.8, 0, TAU); g.fill(); }
    g.globalAlpha = 1;
  }
  g.restore(); // neck group
  g.restore();
}
// small static horse for registers (sprite-cached)
function rowHorse(g, x, y, s, cn, p, flip = false) { fig(g, 'rh' + cn, x, y, s, p, [-230, -440, 470, 450], (g2, pp) => horse(g2, 0, 0, 1, 0, cn, { p: pp }), flip); }

// ── Elephant (facing right)
const ELE = {
  ochre: { body: PAL.ochre, bp: PT(PAL.red, PAL.wall), cloth: PAL.red, cp: PT(PAL.yellow, PAL.wall, 'dots') },
  indigo: { body: PAL.indigo, bp: PT(PAL.yellow, PAL.wall), cloth: PAL.orange, cp: PT(PAL.red, PAL.wall, 'dots') },
  terra: { body: PAL.terra, bp: PT(PAL.yellow, PAL.wall), cloth: PAL.green, cp: PT(PAL.yellow, PAL.wall, 'dots') },
  pink: { body: PAL.pink, bp: PT(PAL.wall, PAL.yellow), cloth: PAL.turq, cp: PT(PAL.yellow, PAL.wall, 'dots') },
};
function elephant(g, x, y, s, cn = 'ochre', p = 1, flip = false) {
  fig(g, 'el' + cn, x, y, s, p, [-180, -250, 400, 260], (g2, pp) => {
    const C = ELE[cn], k = 'e:' + cn + ':';
    const body = SH(k + 'b', () => ({ pts: cr([[-120, -200], [-152, -150], [-140, -95], [-90, -82], [40, -82], [100, -95], [120, -150], [92, -206], [0, -224]], true, 8), fill: C.body, pat: C.bp, lw: 5 }));
    const leg = SH(k + 'l', () => ({ pts: band([[0, -10], [0, 84]], 34, 30, 4), fill: C.body, pat: null, lw: 4.5 }));
    const head = SH(k + 'h', () => ({ pts: cr([[78, -214], [140, -226], [176, -186], [172, -140], [150, -118], [104, -122]], true, 7), fill: C.body, pat: C.bp, lw: 5 }));
    const trunk = SH(k + 't', () => ({ pts: band([[158, -144], [182, -96], [176, -46], [200, -26]], 36, 14), fill: C.body, pat: null, lw: 4.5 }));
    const ear = SH(k + 'e', () => ({ pts: cr([[92, -206], [128, -198], [134, -150], [104, -128], [84, -160]], true, 6), fill: C.cloth, pat: C.cp, lw: 4 }));
    const cloth = SH(k + 'c', () => ({ pts: cr([[-80, -214], [40, -216], [44, -130], [-10, -110], [-80, -128]], true, 6), fill: C.cloth, pat: C.cp, lw: 4 }));
    const tail = SH(k + 'tl', () => ({ pts: band([[-146, -150], [-168, -110], [-164, -78]], 9, 6), fill: C.body, lw: 3.5 }));
    const gp = [0, 1, 2, 3].map(i => partP(pp, i, 4));
    drawShape(g2, tail, gp[0]);
    [-112, 48].forEach(lx => { g2.save(); g2.translate(lx + 14, -84); drawShape(g2, leg, gp[1]); g2.restore(); });
    drawShape(g2, body, gp[0]); drawShape(g2, cloth, gp[1]);
    [-128, 66].forEach(lx => { g2.save(); g2.translate(lx, -84); drawShape(g2, leg, gp[1]); g2.restore(); });
    drawShape(g2, trunk, gp[2]); drawShape(g2, head, gp[2]); drawShape(g2, ear, gp[2]);
    if (gp[3] > 0) {
      g2.globalAlpha = gp[3];
      g2.fillStyle = PAL.wall; g2.strokeStyle = PAL.char; g2.lineWidth = 3; g2.beginPath(); g2.moveTo(156, -132); g2.quadraticCurveTo(186, -118, 196, -136); g2.quadraticCurveTo(180, -128, 160, -142); g2.closePath(); g2.fill(); g2.stroke();
      circle(g2, 146, -186, 7, PAL.wall, PAL.char, 3); g2.fillStyle = PAL.char; g2.beginPath(); g2.arc(147, -186, 3, 0, TAU); g2.fill();
      g2.globalAlpha = 1;
    }
  }, flip);
}
// ── Bird (peacock-ish), tree, little person, marigold
function bird(g, x, y, s, col = PAL.indigo, p = 1, flip = false) {
  fig(g, 'bd' + col, x, y, s, p, [-90, -110, 170, 120], (g2, pp) => {
    const body = SH('bd:b' + col, () => ({ pts: cr([[-30, -40], [10, -46], [36, -30], [30, -8], [-10, 0], [-40, -14]], true, 6), fill: col, pat: PT(PAL.yellow, PAL.wall, 'dots'), lw: 4 }));
    const neck = SH('bd:n' + col, () => ({ pts: band([[24, -36], [38, -66], [50, -82]], 14, 10, 5, true), fill: col, lw: 3.5 }));
    const tail = SH('bd:t' + col, () => ({ pts: cr([[-32, -32], [-80, -60], [-86, -30], [-40, -12]], true, 5), fill: PAL.green, pat: PT(PAL.yellow, PAL.wall, 'grid'), lw: 4 }));
    const gp = [0, 1, 2].map(i => partP(pp, i, 3));
    drawShape(g2, tail, gp[0]); drawShape(g2, body, gp[1]); drawShape(g2, neck, gp[2]);
    if (gp[2] >= 1) {
      g2.fillStyle = PAL.orange; g2.strokeStyle = PAL.char; g2.lineWidth = 2.5; g2.beginPath(); g2.moveTo(54, -86); g2.lineTo(70, -80); g2.lineTo(54, -76); g2.closePath(); g2.fill(); g2.stroke();
      circle(g2, 48, -84, 3.5, PAL.wall, PAL.char, 2);
      for (let i = 0; i < 3; i++) circle(g2, 42 + i * 6, -98 - i * 2, 3.2, PAL.red, PAL.char, 1.5);
      g2.strokeStyle = PAL.char; g2.lineWidth = 3; g2.beginPath(); g2.moveTo(-4, -2); g2.lineTo(-6, 10); g2.moveTo(10, -4); g2.lineTo(12, 10); g2.stroke();
    }
  }, flip);
}
function tree(g, x, y, s, p = 1, v = 0) {
  fig(g, 'tr' + v, x, y, s, p, [-110, -300, 220, 305], (g2, pp) => {
    const trunk = SH('tr:t' + v, () => ({ pts: band([[0, 0], [-4, -80], [4, -160], [0, -190]], 28, 14), fill: PAL.terra, pat: PT(PAL.wall, PAL.yellow, 'ticks'), lw: 4 }));
    const blobs = [[0, -230, 56, 48], [-56, -186, 44, 38], [56, -186, 44, 38], [-36, -130, 34, 28], [38, -128, 34, 28]];
    const gp0 = partP(pp, 0, 2), gp1 = partP(pp, 1, 2);
    drawShape(g2, trunk, gp0);
    blobs.forEach((b, i) => drawShape(g2, SH('tr:l' + v + i, () => ({ pts: ell(b[0], b[1], b[2], b[3], 22), fill: [PAL.green, PAL.green, PAL.turq][(i + v) % 3], pat: PT(PAL.yellow, PAL.wall, i % 2 ? 'dots' : 'rows'), lw: 4.5 })), partP(gp1, i, 5)));
  });
}
const SKIN = [PAL.terra, PAL.ochre, '#8a4a2a'];
function person(g, x, y, s, col = PAL.red, p = 1, v = 0, lamp = false) {
  fig(g, 'ps' + col + v + lamp, x, y, s, p, [-70, -190, 140, 195], (g2, pp) => {
    const body = SH('ps:b' + col + v, () => ({ pts: v % 2 ? cr([[-10, -118], [10, -118], [38, -20], [-38, -20]], true, 3) : [[-12, -118], [12, -118], [34, -28], [-34, -28]], fill: col, pat: PT(PAL.wall, PAL.yellow, 'dots'), lw: 4, step: 4 }));
    const head = SH('ps:h' + v, () => ({ pts: ell(0, -142, 20, 21, 20), fill: SKIN[v % 3], lw: 4 }));
    const gp0 = partP(pp, 0, 2), gp1 = partP(pp, 1, 2);
    g2.strokeStyle = PAL.char; g2.lineWidth = 5; g2.lineCap = 'round';
    if (gp0 > 0.3) { g2.beginPath(); g2.moveTo(-12, -28); g2.lineTo(-14, 0); g2.moveTo(12, -28); g2.lineTo(14, 0); g2.stroke(); }
    drawShape(g2, body, gp0); drawShape(g2, head, gp1);
    if (gp1 >= 1) {
      g2.fillStyle = PAL.char; g2.beginPath(); g2.arc(0, -150, 20, Math.PI, TAU); g2.fill();
      g2.beginPath(); g2.arc(-7, -140, 2.6, 0, TAU); g2.arc(7, -140, 2.6, 0, TAU); g2.fill();
      g2.lineWidth = 4.5; g2.beginPath(); g2.moveTo(-10, -104); g2.lineTo(-34, lamp ? -112 : -70); g2.moveTo(10, -104); g2.lineTo(34, lamp ? -112 : -70); g2.stroke();
      if (lamp) { g2.save(); g2.translate(-6, -118); g2.scale(0.42, 0.42); diya(g2, -20, 0, 1, 0, 0, {}); g2.restore(); circle(g2, 14, -146, 7, PAL.glow, PAL.char, 2); }
    }
  });
}
function marigold(g, x, y, r, p = 1, c = PAL.orange) {
  if (p <= 0) return;
  fig(g, 'mg' + c, x, y, r / 20, p, [-26, -26, 52, 52], (g2, pp) => {
    const sh = SH('mg' + c, () => { const pts = []; for (let i = 0; i < 40; i++) { const a = i / 40 * TAU; pts.push([Math.cos(a) * (19 + 3 * Math.cos(a * 8)), Math.sin(a) * (19 + 3 * Math.cos(a * 8))]); } return { pts, fill: c, pat: null, lw: 3, step: 0, wob: 0 }; });
    drawShape(g2, sh, pp); if (pp >= 1) { circle(g2, 0, 0, 7, c === PAL.orange ? PAL.yellow : PAL.red, PAL.char, 2); }
  });
}
// garland swag between two points; p = how much of it is strung
function garland(g, x0, y0, x1, y1, sag, r, p = 1) {
  const n = Math.max(4, Math.round(Math.hypot(x1 - x0, y1 - y0) / (r * 1.7)));
  g.strokeStyle = PAL.char; g.lineWidth = 3;
  g.beginPath(); for (let i = 0; i <= n * p; i++) { const k = i / n, x = lerp(x0, x1, k), y = lerp(y0, y1, k) + Math.sin(k * Math.PI) * sag; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  for (let i = 0; i <= n * p; i++) { const k = i / n, x = lerp(x0, x1, k), y = lerp(y0, y1, k) + Math.sin(k * Math.PI) * sag; marigold(g, x, y, r, 1, i % 2 ? PAL.yellow : PAL.orange); }
  if (p >= 1) for (const [x, y] of [[x0, y0], [x1, y1]]) { // hanging tassel
    g.fillStyle = PAL.green; g.beginPath(); g.moveTo(x - 10, y + 6); g.quadraticCurveTo(x, y + 46, x + 10, y + 6); g.fill(); g.stroke();
  }
}
// ── Serpent: a dotted wavy band with a head
function serpent(g, x, y, s, t, p = 1, col = PAL.green, wig = 0) {
  if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s);
  const ph = wig * t;
  const ctrl = []; for (let i = 0; i <= 8; i++) ctrl.push([-150 + i * 34, Math.sin(i * 1.1 + ph) * 22]);
  const sh = wig ? dyn(band(ctrl, 10, 30, 6, false), col, PT(PAL.yellow, PAL.wall, 'zig'), 4) : SH('serp' + col, () => ({ pts: band(ctrl, 10, 30, 6, false), fill: col, pat: PT(PAL.yellow, PAL.wall, 'zig'), lw: 4 }));
  drawShape(g, sh, partP(p, 0, 2));
  const hp = partP(p, 1, 2);
  if (hp > 0) {
    const hx = 128, hy = Math.sin(8 * 1.1 + ph) * 22;
    const head = SH('serph' + col, () => ({ pts: cr([[-12, -18], [24, -16], [40, 0], [24, 16], [-12, 16]], true, 6), fill: col, pat: null, lw: 4 }));
    g.save(); g.translate(hx, hy); drawShape(g, head, hp);
    if (hp >= 1) { circle(g, 18, -5, 5, PAL.wall, PAL.char, 2.5); g.fillStyle = PAL.char; g.beginPath(); g.arc(19, -5, 2.4, 0, TAU); g.fill(); g.strokeStyle = PAL.red; g.lineWidth = 3; g.beginPath(); g.moveTo(40, 0); g.lineTo(54, -2); g.lineTo(60, -8); g.moveTo(54, -2); g.lineTo(60, 4); g.stroke(); }
    g.restore();
  }
  g.restore();
}
// ── Cradle hanging from a beam
function cradle(g, x, y, s, t, p = 1, swing = 0) {
  if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s);
  const gp = [0, 1, 2].map(i => partP(p, i, 3));
  drawShape(g, SH('cr:beam', () => ({ pts: rectP(-80, -110, 160, 14), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'ticks'), lw: 4, step: 4 })), gp[0]);
  g.rotate(Math.sin(t * 1.5) * 0.06 * swing);
  if (gp[1] > 0) { g.globalAlpha = gp[1]; g.strokeStyle = PAL.char; g.lineWidth = 3.5; g.beginPath(); g.moveTo(-60, -96); g.lineTo(-56, -26); g.moveTo(60, -96); g.lineTo(56, -26); g.stroke(); g.globalAlpha = 1; }
  drawShape(g, SH('cr:boat', () => ({ pts: cr([[-76, -28], [76, -28], [56, 10], [0, 22], [-56, 10]], true, 7), fill: PAL.red, pat: PT(PAL.yellow, PAL.wall, 'rows'), lw: 4.5 })), gp[1]);
  if (gp[2] > 0) { g.globalAlpha = gp[2]; circle(g, -14, -40, 17, PAL.ochre, PAL.char, 3.5); g.fillStyle = PAL.char; g.beginPath(); g.arc(-14, -46, 17, Math.PI, TAU); g.fill(); g.strokeStyle = PAL.char; g.lineWidth = 2.5; g.beginPath(); g.arc(-20, -38, 3, 0, Math.PI); g.arc(-8, -38, 3, 0, Math.PI); g.stroke(); g.globalAlpha = 1; }
  g.restore();
}
// ── Door (arched, studded). open 0..1 parts the leaves to show light
function door(g, x, y, s, t, p = 1, open = 0, glowCol = PAL.glow) {
  if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s);
  const gp = [0, 1, 2].map(i => partP(p, i, 3));
  const frame = SH('door:frame', () => { const pts = [[-150, 0], [-150, -300]]; for (let i = 0; i <= 20; i++) { const a = Math.PI + i / 20 * Math.PI; pts.push([Math.cos(a) * 150, -300 + Math.sin(a) * 110]); } pts.push([150, 0]); return { pts, fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'zig'), lw: 6 }; });
  drawShape(g, frame, gp[0]);
  // opening: light in the gap
  const arch = (w) => { const pts = [[-w, 0], [-w, -290]]; for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI; pts.push([Math.cos(a) * w, -290 + Math.sin(a) * 92]); } pts.push([w, 0]); return pts; };
  const inner = SH('door:inner', () => ({ pts: arch(122), fill: PAL.char, lw: 4 }));
  drawShape(g, inner, gp[1]);
  if (open > 0) {
    g.save(); g.clip(inner.path);
    const gw = open * 122;
    const gr = g.createLinearGradient(-gw, 0, gw, 0); gr.addColorStop(0, rgba(glowCol, 0.6)); gr.addColorStop(0.5, rgba(PAL.wall, 0.98)); gr.addColorStop(1, rgba(glowCol, 0.6));
    g.fillStyle = gr; g.fillRect(-gw, -400, gw * 2, 400); g.restore();
  }
  // leaves (hinged at the jambs; open folds them back)
  const leaf = SH('door:leaf', () => { const pts = [[-122, 0], [-122, -290]]; for (let i = 1; i <= 10; i++) { const a = Math.PI + i / 10 * Math.PI / 2; pts.push([Math.cos(a) * 122, -290 + Math.sin(a) * 92]); } pts.push([0, -2]); return { pts, fill: PAL.ochre, pat: PT(PAL.terra, PAL.red, 'grid'), lw: 4.5 }; });
  for (const side of [-1, 1]) {
    g.save(); g.clip(inner.path); g.scale(side * -1, 1);
    g.translate(-122, 0); g.scale(1 - open * 0.82, 1); g.translate(122, 0);
    drawShape(g, leaf, gp[2]);
    if (gp[2] >= 1) { circle(g, -18, -150, 10, null, PAL.char, 4); for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) circle(g, -40 - c * 44, -50 - r * 66, 5.5, PAL.yellow, PAL.char, 2); }
    g.restore();
  }
  g.restore();
}
// ── Palace facade: domes, arches, windows — a flat painted wall building
function palace(g, cx, base, w, h, t, p = 1, lit = 0, o = {}) {
  if (p <= 0) return;
  const k = 'pal' + Math.round(w) + 'x' + Math.round(h);
  const gp = [0, 1, 2, 3].map(i => partP(p, i, 4));
  const wall = SH(k + 'w', () => ({ pts: rectP(cx - w / 2, base - h, w, h), fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'grid'), lw: 6, step: 8 }));
  drawShape(g, wall, gp[0]);
  // parapet with zig-zag
  const par = SH(k + 'p', () => ({ pts: rectP(cx - w / 2 - 20, base - h - 34, w + 40, 36), fill: PAL.red, pat: PT(PAL.yellow, PAL.wall, 'zig'), lw: 5, step: 8 }));
  drawShape(g, par, gp[1]);
  // domes (chhatris)
  const nd = 3, dw = Math.min(170, w / 4);
  for (let i = 0; i < nd; i++) {
    const dx = cx + (i - 1) * w * 0.36, big = i === 1, r = big ? dw * 0.75 : dw * 0.5;
    const dome = SH(k + 'd' + i, () => { const pts = []; for (let j = 0; j <= 20; j++) { const a = Math.PI + j / 20 * Math.PI; pts.push([dx + Math.cos(a) * r, base - h - 34 + Math.sin(a) * r * 1.15]); } pts.push([dx + r, base - h - 34]); return { pts, fill: big ? PAL.yellow : PAL.turq, pat: PT(PAL.red, PAL.wall, 'dots'), lw: 5 }; });
    drawShape(g, dome, partP(gp[1], i, 3));
    if (gp[1] >= 1) { g.strokeStyle = PAL.char; g.lineWidth = 4; g.beginPath(); g.moveTo(dx, base - h - 34 - r * 1.15); g.lineTo(dx, base - h - 34 - r * 1.15 - 30); g.stroke(); circle(g, dx, base - h - 34 - r * 1.15 - 34, 7, PAL.red, PAL.char, 3); }
  }
  // windows: two rows of small arches with glowing lamps when lit
  const rows = o.rows ?? (h > 420 ? 2 : 1), cols = Math.max(4, Math.floor(w / 130));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const wx = cx - w / 2 + (c + 0.5) * w / cols; if (Math.abs(wx - cx) < 170) continue;
    const wy = base - h + 70 + r * 170, ww = 46, wh = 80;
    const win = SH(k + 'win', () => { const pts = [[-ww / 2, 0], [-ww / 2, -wh + ww / 2]]; for (let j = 0; j <= 10; j++) { const a = Math.PI + j / 10 * Math.PI; pts.push([Math.cos(a) * ww / 2, -wh + ww / 2 + Math.sin(a) * ww / 2]); } pts.push([ww / 2, 0]); return { pts, fill: PAL.char, lw: 4 }; });
    g.save(); g.translate(wx, wy + wh); drawShape(g, win, partP(gp[2], c + r * cols, rows * cols));
    const on = lit > (c * 7 + r * 3) % 10 / 10;
    if (gp[2] >= 1 && on) { g.save(); g.globalCompositeOperation = 'lighter'; const gr = g.createRadialGradient(0, -30, 0, 0, -30, 60); gr.addColorStop(0, rgba(PAL.glow, .55)); gr.addColorStop(1, rgba(PAL.glow, 0)); g.fillStyle = gr; g.fillRect(-60, -90, 120, 120); g.restore(); circle(g, 0, -26, 9, PAL.glow, PAL.char, 2); }
    g.restore();
  }
  // pillars
  for (const sx of [-1, 1]) {
    const pil = SH(k + 'pil' + sx, () => ({ pts: rectP(cx + sx * 180 - 22, base - h + 10, 44, h - 10), fill: PAL.wall, pat: PT(PAL.red, PAL.green, 'rows'), lw: 5, step: 8 }));
    drawShape(g, pil, gp[3]);
  }
}
// ── Basket of lamps
function basket(g, x, y, s, t, p = 1, n = 3, kinds = ['plain']) {
  if (p <= 0) return;
  for (let i = 0; i < n && p > 0.6; i++) diya(g, x + (i - (n - 1) / 2) * 52 * s, y - 72 * s - (i % 2) * 8 * s, s * 0.55, t, i, { p: clamp((p - .6) / .4), kind: kinds[i % kinds.length] });
  g.save(); g.translate(x, y); g.scale(s, s);
  drawShape(g, SH('basket', () => ({ pts: [[-90, -80], [90, -80], [70, 0], [-70, 0]], fill: PAL.ochre, pat: PT(PAL.terra, PAL.char, 'zig'), lw: 5, step: 5 })), p);
  drawShape(g, SH('basket:rim', () => ({ pts: rectP(-98, -92, 196, 18), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'grid'), lw: 4.5, step: 5 })), p);
  g.restore();
}
// ── Rooster
function rooster(g, x, y, s, t, p = 1, crow = 0) {
  if (p <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s);
  const gp = [0, 1, 2].map(i => partP(p, i, 3));
  const tailC = [PAL.green, PAL.indigo, PAL.red];
  tailC.forEach((c, i) => drawShape(g, SH('roo:t' + i, () => ({ pts: band([[-30, -70], [-70, -120 + i * 18], [-90, -60 + i * 16]], 26, 8), fill: c, pat: PT(PAL.yellow, PAL.wall, 'ticks'), lw: 4 })), gp[0]));
  drawShape(g, SH('roo:b', () => ({ pts: cr([[-40, -80], [10, -90], [40, -120], [52, -96], [40, -50], [0, -30], [-36, -44]], true, 6), fill: PAL.wall, pat: PT(PAL.red, PAL.green, 'dots'), lw: 4.5 })), gp[1]);
  if (gp[2] > 0) {
    g.globalAlpha = gp[2];
    g.save(); g.translate(46, -118); g.rotate(-crow * 0.4);
    g.fillStyle = PAL.red; g.strokeStyle = PAL.char; g.lineWidth = 3; g.beginPath(); g.moveTo(-6, -10); g.lineTo(0, -26); g.lineTo(6, -14); g.lineTo(12, -26); g.lineTo(16, -8); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = PAL.yellow; g.beginPath(); g.moveTo(10, -4); g.lineTo(26 + crow * 4, -2 - crow * 6); g.lineTo(10, 4); g.fill(); g.stroke();
    if (crow > 0.2) { g.beginPath(); g.moveTo(10, 2); g.lineTo(24, 10); g.lineTo(10, 6); g.fill(); g.stroke(); }
    circle(g, 4, -4, 4, PAL.wall, PAL.char, 2);
    g.restore();
    g.strokeStyle = PAL.char; g.lineWidth = 4; g.beginPath(); g.moveTo(-6, -34); g.lineTo(-8, 0); g.moveTo(10, -34); g.lineTo(12, 0); g.stroke();
    g.globalAlpha = 1;
  }
  g.restore();
}
// ── A painted hand (for cupping the flame). side -1 left, 1 right; palm faces inward
function hand(g, x, y, s, side, p = 1) {
  g.save(); g.translate(x, y); g.scale(side * s, s);
  const sh = SH('hand', () => ({ pts: cr([[-60, 90], [-40, -10], [-30, -60], [-12, -120], [2, -118], [0, -70], [14, -126], [30, -122], [22, -64], [40, -110], [54, -102], [40, -50], [62, -82], [76, -74], [50, 0], [30, 90]], true, 5), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'dots'), lw: 5 }));
  drawShape(g, sh, p);
  if (p >= 1) { g.strokeStyle = PAL.char; g.lineWidth = 4; for (let i = 0; i < 3; i++) { g.fillStyle = [PAL.red, PAL.yellow, PAL.green][i]; g.beginPath(); g.rect(-60 + i * 2, 54 + i * 12, 92, 10); g.fill(); g.stroke(); } }
  g.restore();
}
// ── The Panch Deep shelf: five niches, lit lamps persist
function shelf(g, cx, y, w, t, lit, p = 1, newLit = -1, newT = 0) {
  if (p <= 0) return;
  const nw = w / 5;
  g.save();
  drawShape(g, SH('shelf:' + Math.round(w), () => ({ pts: rectP(cx - w / 2 - 20, y - 230, w + 40, 230), fill: PAL.terra, pat: PT(PAL.yellow, PAL.wall, 'zig'), lw: 6, step: 8 })), p);
  for (let i = 0; i < 5; i++) {
    const nx = cx - w / 2 + (i + .5) * nw;
    const niche = SH('shelf:n' + Math.round(nw), () => { const r = nw * 0.36, pts = [[-r, -20], [-r, -150]]; for (let j = 0; j <= 14; j++) { const a = Math.PI + j / 14 * Math.PI; pts.push([Math.cos(a) * r, -150 + Math.sin(a) * r]); } pts.push([r, -20]); return { pts, fill: PAL.char, lw: 4 }; });
    g.save(); g.translate(nx, y); drawShape(g, niche, partP(p, i, 5)); g.restore();
    const on = lit[i], growing = i === newLit ? clamp(newT / 1.2) : 1;
    diya(g, nx - 12, y - 30, 0.62, t, i * 3, { p: partP(p, i, 5), lit: on, grow: growing, bright: on ? growing : 0 });
  }
  drawShape(g, SH('shelf:ledge' + Math.round(w), () => ({ pts: rectP(cx - w / 2 - 40, y - 22, w + 80, 26), fill: PAL.ochre, pat: PT(PAL.terra, PAL.wall, 'grid'), lw: 5, step: 8 })), p);
  g.restore();
}
