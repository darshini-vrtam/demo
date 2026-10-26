// ───────────────────────── Speech bubbles ─────────────────────────
function rrPath(g, x, y, w, h, r) { r = Math.min(r, h / 2, w / 2); g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function rrPoint(x, y, w, h, r, d) { // point at distance d along a rounded rect perimeter (clockwise from top-left straight)
  const sw = w - 2 * r, sh = h - 2 * r, q = Math.PI * r / 2, per = 2 * sw + 2 * sh + 4 * q; d = ((d % per) + per) % per;
  const seg = [[sw, (t) => [x + r + t, y]], [q, (t) => { const a = -Math.PI / 2 + t / r; return [x + w - r + Math.cos(a) * r, y + r + Math.sin(a) * r]; }], [sh, (t) => [x + w, y + r + t]], [q, (t) => { const a = t / r; return [x + w - r + Math.cos(a) * r, y + h - r + Math.sin(a) * r]; }],
  [sw, (t) => [x + w - r - t, y + h]], [q, (t) => { const a = Math.PI / 2 + t / r; return [x + r + Math.cos(a) * r, y + h - r + Math.sin(a) * r]; }], [sh, (t) => [x, y + h - r - t]], [q, (t) => { const a = Math.PI + t / r; return [x + r + Math.cos(a) * r, y + r + Math.sin(a) * r]; }]];
  for (const [L, f] of seg) { if (d <= L) return f(d); d -= L; }
  return [x + r, y];
}
const BUB_MARGIN = 62;
function placeBubble(b) {
  const a = ANCH[b.who] && ANCH[b.who].f >= FRAME - 2 ? ANCH[b.who] : { hx: V.W / 2, hy: V.H * 0.7, mx: V.W / 2, my: V.H * 0.72, r: 40 };
  const m = BUB_MARGIN, W = V.W, H = V.H, gap = 46;
  let bx = a.hx - b.bw / 2, by = a.hy - gap - b.bh, side = 'top';
  if (by < m) {
    const right = a.mx + a.r + gap + 20, left = a.mx - a.r - gap - 20 - b.bw;
    if (right + b.bw <= W - m) { bx = right; side = 'right'; } else if (left >= m) { bx = left; side = 'left'; } else { bx = a.hx - b.bw / 2; side = 'top'; }
    by = side === 'top' ? m : a.my - b.bh * 0.8;
  }
  bx = clamp(bx, m, W - m - b.bw); by = clamp(by, m, H - m - b.bh);
  return { bx, by, side, a };
}
function drawBubble(g, b) {
  const age = CLK.t - b.showAt; if (age < 0) return;
  const out = clamp((CLK.t - b.hideAt) / 0.25); if (out >= 1) return;
  const { bx, by, a } = b.pos || (b.pos = placeBubble(b));
  // ease bubble position (anchors move a little with bobbing)
  const np = placeBubble(b); b.pos = { bx: lerp(b.pos.bx, np.bx, 0.2), by: lerp(b.pos.by, np.by, 0.2), a: np.a, side: np.side };
  const k = backOut(clamp(age / 0.24)) * (1 - out * 0.3), x = b.pos.bx, y = b.pos.by, w = b.bw, h = b.bh, r = b.think ? h / 2 : 42;
  const cx = x + w / 2, cy = y + h / 2;
  g.save(); g.globalAlpha = 1 - out; g.translate(cx, cy); g.scale(k, k); g.translate(-cx, -cy);
  // tail: points at the top of the head (bubble above) or at the side of the face; never covers it
  const side = b.pos.side;
  const tipX = side === 'top' ? a.hx : a.mx + (side === 'right' ? 1 : -1) * a.r * 1.25, tipY = side === 'top' ? a.hy - 10 : a.my - a.r * 0.4;
  const baseX = side === 'top' ? clamp(tipX, x + 60, x + w - 60) : side === 'right' ? x + 4 : x + w - 4, baseY = side === 'top' ? y + h - 4 : clamp(tipY, y + 34, y + h - 34);
  const tdx = tipX - baseX, tdy = tipY - baseY, tl = Math.hypot(tdx, tdy);
  if (b.think) {
    for (let i = 0; i < 3; i++) { const f = 0.25 + i * 0.3, rr = 16 - i * 4; if (tl > 30) circle(g, baseX + tdx * f, baseY + tdy * f, rr, PAL.wall, PAL.char, 5); }
  } else if (tl > 14) {
    const nx = -tdy / tl, ny = tdx / tl, hw = 24;
    g.beginPath(); g.moveTo(baseX + nx * hw, baseY + ny * hw); g.quadraticCurveTo(baseX + tdx * 0.55 + nx * 8, baseY + tdy * 0.55 + ny * 8, tipX, tipY); g.quadraticCurveTo(baseX + tdx * 0.5 - nx * 4, baseY + tdy * 0.5 - ny * 4, baseX - nx * hw, baseY - ny * hw); g.closePath();
    g.fillStyle = PAL.wall; g.fill(); g.lineWidth = 7; g.strokeStyle = PAL.char; g.stroke();
  }
  rrPath(g, x, y, w, h, r); g.fillStyle = PAL.wall; g.fill(); g.lineWidth = 7; g.strokeStyle = PAL.char; g.stroke();
  // red & yellow dot border
  const ins = 15, iw = w - ins * 2, ih = h - ins * 2, ir = Math.max(6, r - ins), per = 2 * (iw + ih) - (8 - 2 * Math.PI) * ir, n = Math.floor(per / 24);
  for (let i = 0; i < n; i++) { const [px, py] = rrPoint(x + ins, y + ins, iw, ih, ir, i * per / n); g.fillStyle = i % 2 ? PAL.yellow : PAL.red; g.beginPath(); g.arc(px, py, 4.6, 0, TAU); g.fill(); }
  // words, revealed as spoken
  g.font = `700 ${b.fs}px ${FONT}`; g.textBaseline = 'alphabetic';
  const lh = b.fs * 1.08, top = y + (h - b.lines.length * lh) / 2 + b.fs * 0.86;
  const live = SP.cur && SP.cur.bub === b;
  b.lines.forEach((L, li) => {
    const lx = x + (w - L.w) / 2, ly = top + li * lh;
    L.items.forEach(it => {
      if (it.i > b.idx) return;
      const cur = live && it.i === b.idx;
      const pop = clamp((CLK.t - (cur ? b.wordT : 0)) / 0.12);
      if (cur) { g.fillStyle = PAL.yellow; g.fillRect(lx + it.x - 2, ly + 8, it.w + 4, 7); }
      g.fillStyle = cur ? PAL.red : PAL.char;
      if (cur && pop < 1) { g.save(); g.translate(lx + it.x + it.w / 2, ly); g.scale(0.9 + 0.1 * pop, 0.9 + 0.1 * pop); g.fillText(b.words[it.i], -it.w / 2, 0); g.restore(); }
      else g.fillText(b.words[it.i], lx + it.x, ly);
    });
  });
  g.restore();
}
function drawBubbles(g) {
  for (let i = BUBS.length - 1; i >= 0; i--) if (CLK.t - BUBS[i].hideAt > 0.3) BUBS.splice(i, 1);
  // a newer bubble retires the older ones
  for (let i = 0; i < BUBS.length - 1; i++) BUBS[i].hideAt = Math.min(BUBS[i].hideAt, BUBS[BUBS.length - 1].showAt);
  BUBS.forEach(b => drawBubble(g, b));
}

// ───────────────────────── Decision: two big picture buttons ─────────────────────────
const CH = { on: false, opts: [], rects: [], t0: 0, hot: -1, read: -1, picked: -1, res: null };
function choiceRects() {
  if (!V.p) { const w = Math.min(620, (V.W - 260) / 2), h = 500, gap = 70, y = V.H * 0.53 - h / 2; return [[V.W / 2 - gap / 2 - w, y, w, h], [V.W / 2 + gap / 2, y, w, h]]; }
  const w = V.W - 160, h = Math.min(560, V.H * 0.28), gap = 60, y0 = V.H * 0.5 - h - gap / 2; return [[80, y0, w, h], [80, y0 + h + gap, w, h]];
}
function drawChoice(g) {
  if (!CH.on && CH.picked < 0) return;
  const age = CLK.t - CH.t0, rs = CH.rects = choiceRects();
  const fadeOut = CH.picked >= 0 ? clamp((CLK.t - CH.pickT) / 0.45) : 0;
  g.save(); g.globalAlpha = (1 - fadeOut) * clamp(age / 0.3) * 0.55; g.fillStyle = PAL.char; g.fillRect(0, 0, V.W, V.H); g.restore();
  CH.opts.forEach((o, i) => {
    const [x, y, w, h] = rs[i], app = backOut(clamp((age - i * 0.12) / 0.35));
    if (app <= 0) return;
    const sel = CH.picked === i, other = CH.picked >= 0 && !sel;
    const hl = CH.read === i || CH.hot === i ? 1 : 0, pulse = hl ? 1 + 0.025 * Math.sin(CLK.t * 6) : 1;
    const sc = app * pulse * (sel ? 1 + 0.06 * Math.sin(clamp((CLK.t - CH.pickT) / 0.45) * Math.PI) : 1);
    g.save(); g.globalAlpha = 1 - (other ? fadeOut : fadeOut * 0.6);
    g.translate(x + w / 2, y + h / 2); g.scale(sc, sc); g.translate(-(x + w / 2), -(y + h / 2));
    if (hl || sel) { g.save(); g.shadowColor = PAL.glow; g.shadowBlur = 50; rrPath(g, x, y, w, h, 46); g.fillStyle = PAL.glow; g.fill(); g.restore(); }
    rrPath(g, x, y, w, h, 46); g.fillStyle = PAL.wall; g.fill(); g.lineWidth = 9; g.strokeStyle = PAL.char; g.stroke();
    const ins = 18, per = 2 * (w + h - 4 * ins), n = Math.floor(per / 30);
    for (let k = 0; k < n; k++) { const [px, py] = rrPoint(x + ins, y + ins, w - 2 * ins, h - 2 * ins, 30, k * per / n); g.fillStyle = [PAL.red, PAL.yellow, PAL.green, PAL.indigo][k % 4]; g.beginPath(); g.arc(px, py, 5.5, 0, TAU); g.fill(); }
    // picture
    const labelH = V.p ? 120 : 130, ph = h - labelH - 40;
    g.save(); rrPath(g, x + 40, y + 40, w - 80, ph, 26); g.clip(); g.fillStyle = mixc(PAL.wall, PAL.ochre, 0.35); g.fillRect(x + 40, y + 40, w - 80, ph);
    try { o.pic(g, x + w / 2, y + 40 + ph * 0.5, Math.min(w - 80, ph * 1.6), ph, CLK.t); } catch (e) { }
    g.restore();
    rrPath(g, x + 40, y + 40, w - 80, ph, 26); g.lineWidth = 5; g.strokeStyle = PAL.char; g.stroke();
    // label
    const fs = V.p ? 56 : 52; const lines = wrapWords(o.label.split(' '), fs, w - 90);
    g.font = `800 ${fs}px ${FONT}`; g.fillStyle = PAL.char; g.textAlign = 'center';
    const ly = y + h - labelH / 2 - 14 - (lines.length - 1) * fs * 0.5 + fs * 0.34;
    lines.forEach((L, li) => g.fillText(L.items.map(it => o.label.split(' ')[it.i]).join(' '), x + w / 2, ly + li * fs * 1.0));
    g.textAlign = 'left';
    g.restore();
  });
}
function choiceHit(x, y) { if (!CH.on) return -1; return CH.rects.findIndex(([rx, ry, w, h]) => x >= rx && x <= rx + w && y >= ry && y <= ry + h); }

// ───────────────────────── Small UI helpers drawn in the painting ─────────────────────────
function pulseRing(g, x, y, r, t, col = PAL.glow) {
  for (let k = 0; k < 2; k++) {
    const f = ((t * 0.9 + k * 0.5) % 1), rr = r * (0.8 + f * 0.7);
    g.save(); g.globalAlpha = 1 - f;
    for (let i = 0; i < 18; i++) { const a = i / 18 * TAU + t; g.fillStyle = i % 2 ? col : PAL.red; g.beginPath(); g.arc(x + Math.cos(a) * rr, y + Math.sin(a) * rr, 7, 0, TAU); g.fill(); }
    g.restore();
  }
}
function pill(g, x, y, text, fs, fill, fg = PAL.char) {
  g.font = `800 ${fs}px ${FONT}`; const w = g.measureText(text).width + fs * 1.3, h = fs * 1.45;
  rrPath(g, x - w / 2, y - h / 2, w, h, h / 2); g.fillStyle = fill; g.fill(); g.lineWidth = 6; g.strokeStyle = PAL.char; g.stroke();
  g.fillStyle = fg; g.textAlign = 'center'; g.fillText(text, x, y + fs * 0.34); g.textAlign = 'left';
  return w;
}
function fitText(g, text, maxW, fs, weight = 800) { g.font = `${weight} ${fs}px ${FONT}`; let w = g.measureText(text).width; if (w > maxW) { fs = Math.floor(fs * maxW / w); g.font = `${weight} ${fs}px ${FONT}`; } return fs; }
function titleText(g, text, x, y, fs, maxW, p, col = PAL.char, weight = 800) {
  if (p <= 0) return;
  fs = fitText(g, text, maxW, fs, weight);
  g.save(); g.globalAlpha = clamp(p * 1.5); g.translate(x, y); const k = 0.9 + 0.1 * easeOut(clamp(p)); g.scale(k, k);
  g.textAlign = 'center'; g.lineJoin = 'round'; g.lineWidth = fs * 0.22; g.strokeStyle = PAL.wall; g.strokeText(text, 0, 0); g.fillStyle = col; g.fillText(text, 0, 0);
  g.restore(); g.textAlign = 'left';
}
// Ring of small painted horses circling a turning sun or lamp
function horseRing(g, cx, cy, R, t, p, center = 'sun') {
  const n = 12;
  for (let i = 0; i < n; i++) {
    const a = t * 0.16 + i / n * TAU, hx = cx + Math.cos(a) * R, hy = cy + Math.sin(a) * R * 0.92;
    const cols = ['bijli', 'terra', 'yellow', 'pink', 'green', 'white'];
    g.save(); g.translate(hx, hy); g.rotate(a + Math.PI / 2);
    rowHorse(g, 0, 40, 0.3, cols[i % cols.length], partP(p, i, n, 3));
    g.restore();
  }
  if (center === 'sun') sun(g, cx, cy, R * 0.42, t, p);
  else { g.save(); g.translate(cx, cy); g.rotate(Math.sin(t * 0.5) * 0.05); dotRing(g, 0, 0, R * 0.55, 30, 8, [PAL.red, PAL.yellow, PAL.green, PAL.indigo], p); diya(g, -R * 0.06, R * 0.14, R * 0.0072, t, 1, { p, lit: p >= 1, fs: 1.1 }); g.restore(); }
}
