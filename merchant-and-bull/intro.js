/* ══════════ Opening: Mahilaropya · the king · the princes at play · Vishnu Sharma under the banyan ══════════
   Painted-storybook sets in warm sandstone, saffron and garden greens, each with gentle ambient life:
   flags ripple, garlands and curtains sway, the fountain runs, people stroll, the camera drifts slowly. */
const SAND = '#F0BE80', SAND_D = '#CE8E52', SAND_L = '#FADFB4', GOLDC = '#F2C14E';
svg.querySelector('defs').insertAdjacentHTML('beforeend', `
  <filter id="spirit" x="-40%" y="-40%" width="180%" height="180%">
    <feColorMatrix type="matrix" values="0.45 0.45 0.15 0 0.38  0.35 0.4 0.12 0 0.27  0.08 0.12 0.05 0 0.04  0 0 0 0.92 0" result="g"/>
    <feGaussianBlur in="g" stdDeviation="9" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="g"/></feMerge>
  </filter>
  <radialGradient id="beam" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#FFF4C8" stop-opacity=".75"/><stop offset="1" stop-color="#FFF4C8" stop-opacity="0"/></radialGradient>
  <linearGradient id="rayg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF6D0" stop-opacity=".7"/><stop offset="1" stop-color="#FFF6D0" stop-opacity="0"/></linearGradient>`);

/* ── architecture ── */
function archD(x, y, w, h) { const r = w / 2; return `M${x - r},${y} L${x - r},${y - h + r} Q${x - r},${y - h} ${x},${y - h - r * .55} Q${x + r},${y - h} ${x + r},${y - h + r} L${x + r},${y}Z`; }
function domeM(x, y, r, col) {
  return `<rect x="${n1(x - r * 1.05)}" y="${n1(y - r * .34)}" width="${n1(r * 2.1)}" height="${n1(r * .36)}" rx="${n1(r * .12)}" fill="${dkc(col, .1)}"/>
  <path d="M${n1(x - r)},${n1(y - r * .3)} C${n1(x - r * 1.12)},${n1(y - r * 1.1)} ${n1(x - r * .35)},${n1(y - r * 1.45)} ${x},${n1(y - r * 1.92)} C${n1(x + r * .35)},${n1(y - r * 1.45)} ${n1(x + r * 1.12)},${n1(y - r * 1.1)} ${n1(x + r)},${n1(y - r * .3)}Z" fill="${col}"/>
  <path d="M${n1(x - r * .5)},${n1(y - r * .36)} C${n1(x - r * .56)},${n1(y - r * 1)} ${n1(x - r * .2)},${n1(y - r * 1.4)} ${x},${n1(y - r * 1.85)} M${x},${n1(y - r * .36)} L${x},${n1(y - r * 1.85)} M${n1(x + r * .5)},${n1(y - r * .36)} C${n1(x + r * .56)},${n1(y - r * 1)} ${n1(x + r * .2)},${n1(y - r * 1.4)} ${x},${n1(y - r * 1.85)}" stroke="${dkc(col, .13)}" stroke-width="${n1(r * .05)}" fill="none" stroke-linecap="round"/>
  <path d="M${n1(x - r * .7)},${n1(y - r * .6)} C${n1(x - r * .8)},${n1(y - r * 1.1)} ${n1(x - r * .4)},${n1(y - r * 1.4)} ${n1(x - r * .15)},${n1(y - r * 1.6)}" stroke="${ltc(col, .45)}" stroke-width="${n1(r * .12)}" fill="none" stroke-linecap="round" opacity=".7"/>
  <path d="M${x},${n1(y - r * 1.9)} L${x},${n1(y - r * 2.35)}" stroke="#D99A22" stroke-width="${n1(Math.max(2, r * .08))}" stroke-linecap="round"/><circle cx="${x}" cy="${n1(y - r * 2.08)}" r="${n1(r * .11)}" fill="${GOLDC}"/>`;
}
function chhatriM(x, y, w, col) {
  const h = w * .9, cd = dkc(col, .14);
  return `<rect x="${n1(x - w * .62)}" y="${n1(y - w * .14)}" width="${n1(w * 1.24)}" height="${n1(w * .14)}" rx="3" fill="${cd}"/>
  ${[-.45, -.15, .15, .45].map(k => `<rect x="${n1(x + k * w - w * .05)}" y="${n1(y - h)}" width="${n1(w * .1)}" height="${n1(h - w * .12)}" rx="2" fill="${col}"/>`).join('')}
  <path d="${archD(x - w * .3, y - w * .14, w * .26, h * .7)} ${archD(x, y - w * .14, w * .26, h * .7)} ${archD(x + w * .3, y - w * .14, w * .26, h * .7)}" fill="${dkc(col, .38)}" opacity=".55"/>
  <rect x="${n1(x - w * .62)}" y="${n1(y - h - w * .1)}" width="${n1(w * 1.24)}" height="${n1(w * .12)}" rx="3" fill="${ltc(col, .2)}"/>
  ${domeM(x, y - h - w * .1, w * .52, col)}`;
}
function flagM(x, y, h, col) {
  return `<path d="M${x},${y} L${x},${y - h}" stroke="#7A4B2A" stroke-width="3" stroke-linecap="round"/><g class="flag" style="animation-delay:${(-(x % 7) / 5).toFixed(2)}s"><path d="M${x},${y - h} C${x + 18},${y - h - 4} ${x + 34},${y - h + 2} ${x + 50},${y - h + 6} C${x + 36},${y - h + 12} ${x + 18},${y - h + 18} ${x},${y - h + 20}Z" fill="${col}"/></g>`;
}
function windowsRow(x0, x1, y, w, h, col, n) { let m = ''; for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + .5) / n; m += `<path d="${archD(x, y, w, h)}" fill="${col}"/><path d="M${n1(x - w / 2 - 3)},${y} L${n1(x + w / 2 + 3)},${y}" stroke="${SAND_L}" stroke-width="4" stroke-linecap="round"/>`; } return m; }
function crenel(x0, x1, y, col) { let m = ''; for (let x = x0; x < x1 - 8; x += 18) m += `<rect x="${x}" y="${y - 12}" width="11" height="13" rx="3" fill="${col}"/>`; return m; }
function palaceM() {
  const c = SAND, cd = SAND_D, cl = SAND_L, win = '#8A4E2A', cur = '#3E62C8';
  return `
  <rect x="-470" y="-250" width="200" height="250" fill="${c}"/><rect x="270" y="-250" width="200" height="250" fill="${c}"/>
  <rect x="-470" y="-258" width="200" height="12" rx="4" fill="${cl}"/><rect x="270" y="-258" width="200" height="12" rx="4" fill="${cl}"/>
  ${crenel(-470, -270, -258, cl)}${crenel(270, 470, -258, cl)}
  ${windowsRow(-460, -280, -150, 30, 56, win, 4)}${windowsRow(280, 460, -150, 30, 56, win, 4)}
  ${[-420, -330, 330, 420].map(x => `<path d="${archD(x, -4, 54, 92)}" fill="${cur}"/><path d="M${x - 27},-80 Q${x},-58 ${x + 27},-80" stroke="${ltc(cur, .3)}" stroke-width="6" fill="none"/>`).join('')}
  <rect x="-270" y="-340" width="540" height="340" fill="${c}"/><rect x="150" y="-340" width="120" height="340" fill="${cd}" opacity=".35"/>
  <rect x="-280" y="-350" width="560" height="14" rx="5" fill="${cl}"/>${crenel(-280, 280, -350, cl)}
  ${windowsRow(-260, 260, -230, 36, 64, win, 8)}
  <rect x="-262" y="-224" width="524" height="8" rx="3" fill="${cl}"/>
  <path d="M-92,0 L-92,-150 Q-92,-206 0,-232 Q92,-206 92,-150 L92,0Z" fill="${cl}"/>
  <path d="${archD(0, 0, 150, 190)}" fill="#7A4524"/><path d="${archD(0, 0, 110, 160)}" fill="#5A3018"/>
  <path d="M-55,-92 L55,-92" stroke="#7A4524" stroke-width="6"/>
  ${[-200, -150, 150, 200].map(x => `<path d="${archD(x, -4, 40, 80)}" fill="${cur}"/>`).join('')}
  <rect x="-170" y="-470" width="340" height="130" fill="${c}"/><rect x="90" y="-470" width="80" height="130" fill="${cd}" opacity=".35"/>
  <rect x="-180" y="-478" width="360" height="12" rx="4" fill="${cl}"/>${crenel(-180, 180, -478, cl)}
  ${windowsRow(-160, 160, -366, 40, 72, win, 5)}
  <path d="M-150,-366 Q0,-390 150,-366" stroke="${cl}" stroke-width="6" fill="none"/>
  ${domeM(0, -478, 108, c)}${domeM(-118, -478, 46, c)}${domeM(118, -478, 46, c)}
  <rect x="-372" y="-440" width="84" height="440" fill="${c}"/><rect x="288" y="-440" width="84" height="440" fill="${c}"/>
  <rect x="330" y="-440" width="42" height="440" fill="${cd}" opacity=".35"/><rect x="-330" y="-440" width="42" height="440" fill="${cd}" opacity=".2"/>
  ${[-300, -390].map(y => `<rect x="-382" y="${y}" width="104" height="12" rx="4" fill="${cl}"/><rect x="278" y="${y}" width="104" height="12" rx="4" fill="${cl}"/>`).join('')}
  <path d="${archD(-330, -330, 34, 60)}" fill="${win}"/><path d="${archD(330, -330, 34, 60)}" fill="${win}"/>
  ${chhatriM(-330, -440, 96, c)}${chhatriM(330, -440, 96, c)}
  ${chhatriM(-210, -350, 64, c)}${chhatriM(210, -350, 64, c)}
  ${flagM(0, -705, 60, '#3E62C8')}${flagM(-330, -632, 46, '#E8642B')}${flagM(330, -632, 46, '#E8642B')}${flagM(-118, -570, 40, '#F2B23A')}${flagM(118, -570, 40, '#F2B23A')}
  <path d="M-130,0 L-110,-24 L110,-24 L130,0Z" fill="${cl}"/>`;
}
function havelliM(w, h, col, o = {}) {
  const cd = dkc(col, .15), cl = ltc(col, .3);
  return `<rect x="0" y="${-h}" width="${w}" height="${h}" fill="${col}"/><rect x="${w * .72}" y="${-h}" width="${w * .28}" height="${h}" fill="${cd}" opacity=".35"/>
  <rect x="-6" y="${-h - 10}" width="${w + 12}" height="12" rx="4" fill="${cl}"/>${crenel(-6, w + 6, -h - 10, cl)}
  ${windowsRow(10, w - 10, -h + 80, 26, 46, '#8A4E2A', Math.max(1, Math.floor(w / 46)))}
  ${h > 180 ? windowsRow(10, w - 10, -h + 170, 26, 46, '#8A4E2A', Math.max(1, Math.floor(w / 46))) : ''}
  ${o.balcony ? `<path d="M${w * .25},${-h + 120} L${w * .75},${-h + 120} L${w * .7},${-h + 150} L${w * .3},${-h + 150}Z" fill="${cl}"/>` : ''}
  ${o.dome ? chhatriM(w / 2, -h - 10, Math.min(80, w * .4), col) : ''}`;
}
function cypressM(x, y, h, col) { return `<path d="M${x},${y - h} C${x + 26},${y - h * .7} ${x + 30},${y - 20} ${x + 18},${y} L${x - 18},${y} C${x - 30},${y - 20} ${x - 26},${y - h * .7} ${x},${y - h}Z" fill="${col}"/><path d="M${x},${y - h} C${x - 14},${y - h * .7} ${x - 18},${y - h * .35} ${x - 12},${y - 10}" stroke="${ltc(col, .3)}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".6"/>`; }
function flowerBed(x0, x1, y, seed, cols = ['#F25C78', '#F7A21B', '#FFFFFF', '#C04CC8', '#FF7A3D']) {
  const R = rng(seed); let m = '';
  for (let x = x0; x < x1; x += 46) { const yy = y + (R() - .5) * 10; m += `<ellipse cx="${n1(x)}" cy="${n1(yy)}" rx="34" ry="22" fill="${R() < .5 ? '#3E8F3A' : '#4FA544'}"/>`; for (let k = 0; k < 4; k++) m += `<circle cx="${n1(x + (R() - .5) * 48)}" cy="${n1(yy - 6 - R() * 16)}" r="${n1(4 + R() * 3)}" fill="${cols[Math.floor(R() * cols.length)]}"/>`; }
  return m;
}
/* market stall: posts, striped scalloped awning, a table of goods and swaying marigold garlands */
function stallM(w, cols, goods, o = {}) {
  const h = o.h || 210, n = 6, sw = (w + 40) / n;
  let aw = '', sc = '';
  for (let i = 0; i < n; i++) { const x = -w / 2 - 20 + i * sw, c = cols[i % 2]; aw += `<path d="M${n1(x + 16)},${-h - 50} L${n1(x + sw + 16)},${-h - 50} L${n1(x + sw)},${-h} L${n1(x)},${-h}Z" fill="${c}"/>`; sc += `<path d="M${n1(x)},${-h} Q${n1(x + sw / 2)},${-h + 22} ${n1(x + sw)},${-h}Z" fill="${c}"/>`; }
  let gar = '';
  if (o.garlands) for (let i = 0; i < 5; i++) { const x = -w / 2 + 12 + i * (w - 24) / 4; gar += `<g class="hang" style="animation-delay:${-i * .7}s"><path d="M${n1(x)},${-h + 6} L${n1(x)},${-h + 96}" stroke="${i % 2 ? '#F7A21B' : '#F06A1C'}" stroke-width="12" stroke-dasharray="1 11" stroke-linecap="round"/><circle cx="${n1(x)}" cy="${-h + 104}" r="6" fill="#D6302A"/></g>`; }
  return `<ellipse cx="0" cy="4" rx="${w * .62}" ry="12" fill="#000" opacity=".14"/>
  <rect x="${-w / 2 - 8}" y="${-h}" width="10" height="${h}" rx="5" fill="#7A4B2A"/><rect x="${w / 2 - 2}" y="${-h}" width="10" height="${h}" rx="5" fill="#7A4B2A"/>
  ${aw}${sc}${gar}
  <path d="M${-w / 2},-92 L${w / 2},-92 L${w / 2 - 6},0 L${-w / 2 + 6},0Z" fill="${o.cloth || '#3E62C8'}"/><path d="M${-w / 2},-92 L${w / 2},-92" stroke="${GOLDC}" stroke-width="6" stroke-linecap="round"/>
  <path d="M${-w / 2 + 10},-60 L${w / 2 - 10},-60 M${-w / 2 + 14},-30 L${w / 2 - 14},-30" stroke="${ltc(o.cloth || '#3E62C8', .25)}" stroke-width="3" stroke-dasharray="6 6"/>
  ${goods(w)}`;
}
const fruitPile = (x, y, cols, r = 12) => { let m = `<path d="M${x - 46},${y} C${x - 44},${y + 22} ${x + 44},${y + 22} ${x + 46},${y}Z" fill="#B88A4A"/>`; const pts = [[-28, 0], [-8, 0], [12, 0], [32, 0], [-18, -16], [2, -16], [22, -16], [-6, -30], [12, -30]]; pts.forEach(([dx, dy], i) => { m += `<circle cx="${x + dx}" cy="${y + dy - 4}" r="${r}" fill="${cols[i % cols.length]}"/><circle cx="${x + dx - 4}" cy="${y + dy - 8}" r="${r * .3}" fill="#FFFFFF" opacity=".45"/>`; }); return m; };
const potM = (x, y, s, col = '#C46A3A') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="30" ry="6" fill="#000" opacity=".15"/><path d="M-22,-70 C-40,-56 -44,-22 -28,-4 Q0,6 28,-4 C44,-22 40,-56 22,-70Z" fill="${col}"/><path d="M-16,-82 Q0,-88 16,-82 L22,-70 Q0,-62 -22,-70Z" fill="${dkc(col, .12)}"/><path d="M-34,-40 Q0,-30 34,-40" stroke="${GOLDC}" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/><path d="M-26,-54 C-30,-40 -28,-24 -20,-14" stroke="${ltc(col, .35)}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/></g>`;
const flowerPot = (x, y, s, fc = '#F25C78') => potM(x, y, s * .8, '#D07040') + `<g transform="translate(${x} ${y - 66 * s}) scale(${s})"><g class="sway">${[[-20, -10], [0, -24], [20, -10], [-8, -36], [12, -38]].map(([dx, dy], i) => `<path d="M0,10 L${dx},${dy}" stroke="#3E8F3A" stroke-width="4" stroke-linecap="round"/><circle cx="${dx}" cy="${dy}" r="11" fill="${i % 2 ? GOLDC : fc}"/><circle cx="${dx}" cy="${dy}" r="4" fill="#FFF3C0"/>`).join('')}</g></g>`;
function addArt(r, markup, depth, x = 0, y = 0, s = 1, o = {}) {
  const g = mk(markup); place(g, x, y, s); if (o.shade !== false) shade(g, !!o.unified);
  if (o.round !== false) roundify(g);
  if (depth == null) r.append(g); else r.append(pwrap(g, depth)); return g;
}

/* ── small animals ── */
function peacock() {
  const b = '#1E5FC4', t = '#2E9E6A';
  let eyes = ''; for (let i = 0; i < 6; i++) { const x = -60 - i * 26, y = -34 + i * 5; eyes += `<circle cx="${x}" cy="${y}" r="9" fill="#0E6B8A"/><circle cx="${x}" cy="${y}" r="5" fill="#F2C14E"/><circle cx="${x}" cy="${y}" r="2.4" fill="#1E3A8A"/>`; }
  const m = `<ellipse cx="-30" cy="2" rx="90" ry="7" fill="#000" opacity=".14"/>
  <path d="M-20,-46 C-80,-60 -170,-44 -220,-8 C-170,-2 -80,-6 -10,-18Z" fill="${t}"/>${eyes}
  <path d="M-10,-6 L-12,0 M10,-6 L12,0" stroke="#B88A4A" stroke-width="4" stroke-linecap="round"/>
  <ellipse cx="0" cy="-32" rx="30" ry="22" fill="${b}"/>
  <path d="M-30,-40 C-24,-56 -6,-60 6,-50 C-6,-44 -20,-38 -30,-40Z" fill="${ltc(t, .2)}"/>
  <g transform="translate(16 -46)"><g class="pose head hp"><g class="peck">
    <path d="M-6,4 C-4,-20 -2,-40 4,-60 L16,-58 C12,-38 10,-18 10,4Z" fill="${b}"/>
    <circle cx="10" cy="-62" r="11" fill="${b}"/><path d="M19,-64 L30,-60 L19,-57Z" fill="#E0A82A"/>
    <circle cx="13" cy="-64" r="3" fill="#FFFFFF"/><circle cx="14" cy="-64" r="1.6" fill="#111"/>
    ${[-8, 0, 8].map(dx => `<path d="M${8 + dx * .3},-72 L${8 + dx},-90" stroke="${b}" stroke-width="2" stroke-linecap="round"/><circle cx="${8 + dx}" cy="-91" r="3.5" fill="${b}"/>`).join('')}
  </g></g></g>`;
  return build('char', 1, m);
}
function squirrel() {
  const f = '#B8743A', l = '#F2D3A6';
  const m = `<ellipse cx="0" cy="2" rx="26" ry="5" fill="#000" opacity=".14"/>
  <path d="M-10,-14 C-40,-14 -50,-50 -34,-70 C-24,-82 -8,-74 -14,-60 C-22,-46 -10,-34 4,-30Z" fill="${f}"/><path d="M-30,-66 C-26,-74 -18,-74 -18,-66" stroke="${l}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="6" cy="-18" rx="16" ry="18" fill="${f}"/><ellipse cx="10" cy="-14" rx="8" ry="11" fill="${l}"/>
  <circle cx="16" cy="-38" r="12" fill="${f}"/><path d="M10,-48 L8,-58 L16,-50Z" fill="${f}"/>
  <circle cx="20" cy="-40" r="2.6" fill="#111"/><circle cx="27" cy="-36" r="2" fill="#5A2A14"/>
  <ellipse cx="14" cy="-2" rx="9" ry="4" fill="${f}"/>`;
  const root = build('char', 1, m); return root;
}
function birdSpirit() { return mk(`<g class="flap2"><path d="M0,0 C-30,-40 -70,-44 -90,-30 C-60,-22 -30,-10 0,0Z" fill="#F7E0A0"/><path d="M0,0 C30,-40 70,-44 90,-30 C60,-22 30,-10 0,0Z" fill="#F7E0A0"/></g><ellipse cx="0" cy="4" rx="26" ry="14" fill="#F7E0A0"/><circle cx="24" cy="-4" r="11" fill="#F7E0A0"/><path d="M33,-6 L44,-2 L33,1Z" fill="#E0A82A"/><circle cx="27" cy="-6" r="2.4" fill="#5A3A10"/><path d="M-24,4 L-44,-4 L-40,12Z" fill="#F7E0A0"/>`); }
function turtleSpirit() { return mk(`<ellipse cx="-36" cy="10" rx="14" ry="8" fill="#E9D58A"/><ellipse cx="34" cy="12" rx="14" ry="8" fill="#E9D58A"/><path d="M-50,8 C-50,-34 50,-34 50,8Z" fill="#D9B85A"/><path d="M-30,-6 L-10,-20 L10,-20 L30,-6 M-10,-20 L-14,6 M10,-20 L14,6" stroke="#B8943A" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="60" cy="-2" r="14" fill="#E9D58A"/><circle cx="64" cy="-5" r="2.6" fill="#5A3A10"/><path d="M60,4 Q66,8 70,4" stroke="#5A3A10" stroke-width="2" fill="none"/>`); }

/* background people in regional dress: red pagdi, Himachali cap, red dupatta */
const FOLK = {
  pagdi: { turban: '#D8262E', stripe: '#F2B23A', stripe2: '#A81A22', cloth: '#FFFFFF', lower: '#F4EBDD', skin: '#C98A5E', mustache: 'big', waist: '#F2B23A', sandals: true },
  cap: { cap: '#F4EFE4', cloth: '#EADCC2', vest: '#5A3E8E', lower: '#F4EBDD', skin: '#E3A274', mustache: true, sandals: true },
  dupatta: { dupatta: '#D8262E', sari: '#F2B23A', cloth: '#D8262E', skin: '#E8A877', hair: '#2A1A10', bindi: true, tikka: true, nosering: true, earring: true, bangles: true, sandals: true },
  dupatta2: { dupatta: '#C8182E', sari: '#2E9E6A', cloth: '#C8182E', skin: '#DE9C6C', hair: '#2A1A10', bindi: true, nosering: true, earring: true, bangles: true, sandals: true }
};
function nameTag(r, text, x, y, col) {
  const w = text.length * 19 + 56;
  const g = mk(`<g class="popin"><rect x="${-w / 2}" y="-32" width="${w}" height="60" rx="30" fill="${col}" stroke="#3B2414" stroke-width="5"/><text x="0" y="12" text-anchor="middle" font-family="'Yatra One',serif" font-size="32" fill="#FFF7E6">${text}</text></g>`);
  g.setAttribute('pointer-events', 'none'); place(g, x, y, 1); r.append(g); return g;
}
const focus = (x, y, s, ms = 1800) => anim(world, { x: 800 - s * x, y: 450 - s * y, s }, ms, ease.io);

/* ══════════ Opening 1: Mahilaropya ══════════ */
async function i1() {
  const r = newStage('#F7C98A');
  sky(r, [[0, '#FFC97E'], [.45, '#FFE2AE'], [.8, '#FFF0CF'], [1, '#FCE7C0']]);
  sun(r, 400, 200, 76, '#FFF2B8');
  const birds = [bird(220, 250, .8), bird(280, 280, .6), bird(1250, 230, .7), bird(1320, 260, .55)];
  birds.forEach(b => r.append(pwrap(b, 1.2)));
  birds.forEach((b, i) => tween(b, { x: b._t.x + (i < 2 ? 600 : -600), y: b._t.y - 60 }, 30000, ease.lin));
  addArt(r, hillMk(590, 26, 900, .4, '#B5D47A') + [80, 230, 1380, 1520].map((x, i) => cypressM(x, 620, 150 + i * 14, '#3E8F5A')).join(''), .18);
  [[120, 640, .55], [330, 650, .5], [1240, 645, .5], [1450, 640, .6]].forEach(([x, y, s]) => r.append(tree(x, y, s, { leaf: '#5FAE4A', hi: '#8ED062' })));
  addArt(r, havelliM(220, 210, '#EBB476', { dome: true }), .25, 40, 650);
  addArt(r, havelliM(170, 160, '#F2C48A'), .25, 1320, 650);
  addArt(r, palaceM(), .3, 800, 655, .78, { unified: true });
  addArt(r, flowerBed(380, 1220, 668, 7) + flowerBed(420, 1180, 690, 9), .35);
  hill(r, 700, '#F3CB92', { amp: 4, period: 1600 });
  r.append(S('path', { d: 'M-2000,712 C200,700 1400,700 3600,712 L3600,2000 L-2000,2000Z', fill: '#EFC58C' }));
  r.append(S('ellipse', { cx: 800, cy: 760, rx: 820, ry: 50, fill: '#F7D9A8', opacity: .55 }));
  // mid-ground stalls and an ox cart crossing the square
  addArt(r, stallM(150, ['#8E5BD6', '#B98AEE'], w => fruitPile(-34, -96, ['#F25C3C', '#F7A21B']) + fruitPile(34, -96, ['#7DBB3C', '#F2C14E']), { cloth: '#2E9E8A', garlands: true, h: 180 }), .7, 470, 720, .62);
  addArt(r, stallM(150, ['#F06A1C', '#F7C24A'], w => fruitPile(-30, -96, ['#E8492C', '#F7A21B']) + potM(36, -92, .5), { cloth: '#3E62C8', garlands: true, h: 180 }), .7, 1130, 720, .62);
  const cart = G({}); const wg = wagon(); cart.append(wg);
  const ox1 = actor(bull({ body: '#F1ECE4', belly: '#FFFFFF', muzzle: '#F5D9D0', ear: '#F2A8A0' }), 400, -10, .9); const ox2 = actor(bull({ body: '#E9E2D6', belly: '#FBF7F0', muzzle: '#F2D2C8', ear: '#F2A8A0' }), 360, 6, 1);
  cart.prepend(ox1); cart.append(ox2);
  wg.parts.load.append(place(ITEM.sack(), -80, -170, .7), place(ITEM.cloth(), 10, -170, .7), place(ITEM.whitesack(), 90, -170, .7));
  const cartA = actor(cart, -500, 745, .42); r.append(cartA);
  tween(cartA, { x: 2100 }, 52000, ease.lin);
  // townsfolk
  const folk = [
    [{ ...FOLK.dupatta, carry: 'basket' }, -160, 812, .8, 1500, 30000],
    [{ kid: true, cloth: '#E8492C', lower: '#F7F2E8', skin: '#DE9C6C', hairStyle: 'kid', hair: '#2A1A10', carry: 'pot' }, -260, 820, .78, 1420, 31000],
    [FOLK.pagdi, 1760, 790, .74, -200, 36000, true],
    [{ ...FOLK.dupatta2, carry: 'pot' }, 1900, 805, .76, -260, 40000, true],
    [FOLK.cap, 2100, 800, .72, -100, 42000, true]
  ];
  for (const [o, x, y, s, to, dur, flip] of folk) { const p = actor(person(o), x, y, s, { fx: flip ? -1 : 1 }); r.append(p); tween(p, { x: to }, dur, ease.lin); }
  // foreground: flower stall (left) and Vardhamanaka at his pottery stall (right)
  addArt(r, stallM(300, ['#C8452C', '#F7A21B'], w => fruitPile(-90, -96, ['#F7A21B', '#F06A1C'], 13) + `<path d="M-20,-150 C-10,-120 30,-120 40,-150" stroke="#F7A21B" stroke-width="14" stroke-dasharray="1 12" stroke-linecap="round" fill="none"/>` + fruitPile(80, -96, ['#F25C78', '#FFFFFF', '#C04CC8'], 12), { cloth: '#3E62C8', garlands: true, h: 250 }), 1, 190, 900, 1);
  r.append(actor(person({ turban: '#F7A21B', stripe: '#FFE08A', cloth: '#FFF3E0', lower: '#F4EBDD', skin: '#C98A5E', mustache: true, waist: '#C8452C', carry: 'garland' }), 300, 820, .92));
  addArt(r, flowerPot(40, 930, 1.1, '#C04CC8') + flowerPot(330, 950, .9, '#F25C78'), 1.1);
  addArt(r, stallM(330, ['#3E62C8', '#F2C14E'], w => potM(-110, -94, .8) + potM(-40, -94, .95, '#B85A30') + potM(30, -94, .8, '#D07A48') + potM(100, -94, .9), { cloth: '#7A4B2A', h: 260 }), 1, 1440, 900, 1);
  const mer = actor(person(MERCHANT), 1250, 860, 1); r.append(mer); mer.inner.classList.add('gesturing');
  addArt(r, potM(1560, 930, 1.1) + potM(1290, 950, .9, '#B85A30') + potM(1620, 960, .8, '#D07A48'), 1.1);
  r.append(tree(-40, 700, 2.3, { leaf: '#3E8F3A', hi: '#6FBF4A', trunk: '#8A5A34' }), tree(1650, 700, 2.3, { leaf: '#3E8F3A', hi: '#6FBF4A', trunk: '#8A5A34' }));
  motes(r, 24, '#FFE9A8', { seed: 301, y0: 120, y1: 700 });
  place(world, 800 - 1.12 * 640, 450 - 1.12 * 500, 1.12);
  await reveal(); ambience('day'); bgLife('market');
  tween(world, { x: 800 - 1.12 * 960, y: 450 - 1.12 * 500, s: 1.12 }, 16000, ease.io);
  await say('arjun', `Namaste, ${kidName()}! I'm Arjun. Come with me to a faraway land, long, long ago…`);
  await say('arjun', 'Once upon a time, in the kingdom of Mahilaropya, there lived a king named Amara Shakthi.');
  await say('arjun', 'Mahilaropya was a busy, happy city, full of markets, flowers and friendly faces.');
  await say('merchant', 'Pots! Beautiful pots! Fresh from the kiln!');
  hideCaption();
  await anim(world, { x: 800 - 1.9 * 800, y: 450 - 1.9 * 560, s: 1.9 }, 2600, ease.io);
}
function hillMk(y, amp, per, ph, col) { let d = `M-600,1300 L-600,${y}`; for (let x = -600; x <= 2200; x += 25) d += ` L${x},${n1(y - amp * Math.sin(2 * Math.PI * x / per + ph))}`; return `<path d="${d} L2200,1300Z" fill="${col}"/>`; }

/* ══════════ Opening 2: the king in his court ══════════ */
function pillarM(x, y0, y1, w, col) {
  const cd = dkc(col, .18), cl = ltc(col, .25);
  return `<rect x="${x - w / 2}" y="${y0}" width="${w}" height="${y1 - y0}" fill="${col}"/><rect x="${x + w * .18}" y="${y0}" width="${w * .32}" height="${y1 - y0}" fill="${cd}" opacity=".45"/><rect x="${x - w * .36}" y="${y0}" width="${w * .14}" height="${y1 - y0}" fill="${cl}" opacity=".6"/>
  ${[0.12, 0.45, 0.8].map(k => `<rect x="${x - w / 2 - 8}" y="${y0 + (y1 - y0) * k}" width="${w + 16}" height="18" rx="8" fill="${cl}"/>`).join('')}
  <path d="M${x - w / 2 - 22},${y0} L${x + w / 2 + 22},${y0} L${x + w / 2},${y0 + 34} L${x - w / 2},${y0 + 34}Z" fill="${cl}"/><rect x="${x - w / 2 - 16}" y="${y1 - 30}" width="${w + 32}" height="30" rx="6" fill="${cl}"/>`;
}
function curtainM(x0, x1, y0, y1, col, gather = 'left') {
  const w = x1 - x0, cd = dkc(col, .2); let folds = '';
  for (let i = 1; i < 5; i++) { const x = x0 + w * i / 5; folds += `<path d="M${x},${y0} C${x + 6},${y0 + (y1 - y0) * .5} ${x - 6},${y0 + (y1 - y0) * .8} ${x + (gather === 'left' ? -10 : 10)},${y1}" stroke="${cd}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".55"/>`; }
  return `<g class="hang" style="animation-duration:6s"><path d="M${x0},${y0} L${x1},${y0} C${x1 - w * .1},${y0 + (y1 - y0) * .6} ${x1 + w * .05},${y1 - 40} ${x1 - w * .15},${y1} L${x0},${y1}Z" fill="${col}"/>${folds}<path d="M${x0},${y0 + (y1 - y0) * .55} Q${x0 + w * .5},${y0 + (y1 - y0) * .6} ${x1 - w * .05},${y0 + (y1 - y0) * .5}" stroke="${GOLDC}" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
}
function bannerM(x, y, w, h, col) {
  return `<g class="hang" style="animation-duration:5s;animation-delay:${-(x % 5)}s"><rect x="${x - w / 2 - 6}" y="${y - 8}" width="${w + 12}" height="10" rx="5" fill="${GOLDC}"/><path d="M${x - w / 2},${y} L${x + w / 2},${y} L${x + w / 2},${y + h} L${x},${y + h + 26} L${x - w / 2},${y + h}Z" fill="${col}"/><path d="M${x - w / 2 + 8},${y + 8} L${x + w / 2 - 8},${y + 8} L${x + w / 2 - 8},${y + h - 4} L${x},${y + h + 18} L${x - w / 2 + 8},${y + h - 4}Z" fill="none" stroke="${GOLDC}" stroke-width="3"/>
  <g transform="translate(${x} ${y + h * .45})"><path d="M0,-30 C-10,-14 -10,4 0,14 C10,4 10,-14 0,-30Z M0,14 C-20,10 -30,-4 -30,-14 C-16,-12 -6,-4 0,14Z M0,14 C20,10 30,-4 30,-14 C16,-12 6,-4 0,14Z" fill="${GOLDC}"/></g></g>`;
}
function throneM() {
  const g = GOLDC, gd = '#D9A22A', red = '#B5182A';
  return `<ellipse cx="0" cy="4" rx="180" ry="16" fill="#000" opacity=".18"/>
  <path d="M-130,-150 L-130,-380 C-130,-470 -60,-520 0,-540 C60,-520 130,-470 130,-380 L130,-150Z" fill="${g}"/>
  <path d="M-104,-160 L-104,-370 C-104,-440 -50,-480 0,-498 C50,-480 104,-440 104,-370 L104,-160Z" fill="${red}"/>
  <path d="M-80,-380 C-80,-430 -40,-460 0,-470 C40,-460 80,-430 80,-380" stroke="${gd}" stroke-width="5" fill="none"/>
  <circle cx="0" cy="-540" r="16" fill="${g}"/><circle cx="0" cy="-540" r="8" fill="${GEM_G}"/>
  ${[-130, 130].map(x => `<circle cx="${x}" cy="-380" r="14" fill="${gd}"/>`).join('')}
  <path d="M-170,-150 C-180,-210 -150,-240 -120,-236 L-110,-120 L-160,-120Z M170,-150 C180,-210 150,-240 120,-236 L110,-120 L160,-120Z" fill="${g}"/>
  <circle cx="-158" cy="-232" r="20" fill="${gd}"/><circle cx="158" cy="-232" r="20" fill="${gd}"/>
  <path d="M-160,-130 L160,-130 L150,0 L-150,0Z" fill="${gd}"/><path d="M-140,-110 L140,-110 L132,-10 L-132,-10Z" fill="${g}"/>
  ${[-90, -30, 30, 90].map(x => `<circle cx="${x}" cy="-60" r="10" fill="${red}"/>`).join('')}`;
}
function dotCurtain(x0, x1, y0, y1, side) {
  // a tied-back curtain: full at the top, gathered to a gold tie, flaring to the floor
  const w = x1 - x0, inner = side === 'left' ? x1 : x0, outer = side === 'left' ? x0 : x1, k = side === 'left' ? 1 : -1, ty = y0 + (y1 - y0) * .5;
  const d = `M${outer},${y0} L${inner},${y0} C${inner - k * w * .2},${y0 + (y1 - y0) * .25} ${outer + k * w * .55},${ty - 40} ${outer + k * w * .32},${ty} C${outer + k * w * .5},${ty + 60} ${inner - k * w * .1},${y1 - 80} ${inner + k * w * .05},${y1} L${outer},${y1}Z`;
  const id = uid('cur'); let dots = '';
  for (let y = y0 + 20; y < y1; y += 34) for (let x = Math.min(x0, x1) + ((y / 34) & 1) * 15; x < Math.max(x0, x1); x += 30) dots += `<circle cx="${x}" cy="${y}" r="5.5" fill="#D8262E"/>`;
  return `<g class="hang" style="animation-duration:6.5s"><clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="#F7941D"/><g clip-path="url(#${id})">${dots}${[.3, .6].map(f => `<path d="M${outer + k * w * f},${y0} C${outer + k * w * f * .9},${ty - 60} ${outer + k * w * .3},${ty} ${outer + k * w * .3},${ty}" stroke="#D9761A" stroke-width="5" fill="none" opacity=".7"/>`).join('')}</g>
    <ellipse cx="${outer + k * w * .3}" cy="${ty}" rx="${w * .2}" ry="12" fill="${GOLDC}"/><path d="M${outer + k * w * .3},${ty + 8} L${outer + k * w * .3},${ty + 60}" stroke="${GOLDC}" stroke-width="7" stroke-linecap="round"/><circle cx="${outer + k * w * .3}" cy="${ty + 66}" r="10" fill="#E0962A"/></g>`;
}
function lampM(x, len) {
  return `<g class="lampsw" style="animation-delay:${-(x % 4)}s"><path d="M${x},-40 L${x},${len}" stroke="#B8843A" stroke-width="5"/><path d="M${x - 40},${len} L${x + 40},${len} L${x + 26},${len + 46} L${x - 26},${len + 46}Z" fill="${GOLDC}"/><path d="M${x - 30},${len + 46} Q${x},${len + 80} ${x + 30},${len + 46}Z" fill="#D9A22A"/>${[-24, 0, 24].map(dx => `<path d="M${x + dx},${len - 2} C${x + dx - 7},${len - 14} ${x + dx - 4},${len - 26} ${x + dx},${len - 34} C${x + dx + 4},${len - 26} ${x + dx + 7},${len - 14} ${x + dx},${len - 2}Z" fill="#FFB33A" class="flicker" filter="url(#glow)"/>`).join('')}</g>`;
}
async function i2() {
  const r = newStage('#F2B477');
  sky(r, [[0, '#F7C98E'], [1, '#EFA968']], { clouds: false });
  // through the arched window: open sky, a turning sun, drifting clouds and green hills (no buildings)
  addArt(r, `<rect x="480" y="40" width="680" height="720" fill="#8FD0F0"/><rect x="480" y="300" width="680" height="300" fill="#FFE2B0" opacity=".55"/>
    <g transform="translate(900 250)"><g class="sunrays">${Array.from({ length: 12 }, (_, i) => `<path d="M0,-58 L10,-110 L-10,-110Z" fill="#FFE27A" transform="rotate(${i * 30})"/>`).join('')}</g><circle r="52" fill="#FFE27A"/><circle r="40" fill="#FFF3B8"/></g>
    ${[[620, 170, 1, 34], [960, 130, .8, 46], [760, 330, .7, 40]].map(([x, y, sc, d]) => `<g class="cdrift" style="animation-duration:${d}s"><g transform="translate(${x} ${y}) scale(${sc})"><ellipse rx="80" ry="22" fill="#FFFFFF"/><circle cx="-30" cy="-12" r="28" fill="#FFFFFF"/><circle cx="14" cy="-22" r="34" fill="#FFFFFF"/><circle cx="46" cy="-6" r="22" fill="#FFFFFF"/></g></g>`).join('')}
    ${hillMk(520, 34, 420, .8, '#7FBF5A').replace('M-600,1300 L-600', 'M480,1300 L480')}<path d="M480,600 C620,560 760,580 900,560 C1000,548 1100,566 1160,580 L1160,800 L480,800Z" fill="#5EA84A"/>`, .1, 0, 0, 1, { shade: false, round: false });
  // the hall: warm walls, a green upper band with gold trim, arched niches and a carved window frame
  const WALL = '#F8C98C', WALLD = '#E9AE6E', GREEN = '#2E8B57';
  addArt(r, `<path d="M-300,-200 L1900,-200 L1900,800 L-300,800Z M600,700 L600,330 Q600,170 820,150 Q1040,170 1040,330 L1040,700Z" fill="${WALL}" fill-rule="evenodd"/>
    <rect x="-300" y="-200" width="2200" height="330" fill="${GREEN}"/><rect x="-300" y="120" width="2200" height="16" fill="${GOLDC}"/>
    <path d="M-300,136 ${Array.from({ length: 46 }, (_, i) => `Q${-300 + i * 48 + 24},176 ${-300 + (i + 1) * 48},136`).join(' ')}" fill="${GOLDC}"/>
    ${Array.from({ length: 23 }, (_, i) => `<g transform="translate(${-276 + i * 96} 60)"><path d="M0,-30 C-10,-14 -10,4 0,14 C10,4 10,-14 0,-30Z M0,14 C-20,10 -30,-4 -30,-14 C-16,-12 -6,-4 0,14Z M0,14 C20,10 30,-4 30,-14 C16,-12 6,-4 0,14Z" fill="${GOLDC}" opacity=".9"/></g>`).join('')}
    <rect x="-300" y="-200" width="2200" height="40" fill="#1E6E44"/>
    ${[90, 1450].map(x => `<path d="${archD(x, 640, 200, 380)}" fill="${WALLD}"/><path d="${archD(x, 620, 160, 340)}" fill="#E85A8A"/><path d="${archD(x, 620, 120, 300)}" fill="#F7A8C4"/><circle cx="${x}" cy="440" r="34" fill="${GOLDC}"/><circle cx="${x}" cy="440" r="18" fill="#E85A8A"/>`).join('')}
    <path d="M600,700 L600,330 Q600,170 820,150 Q1040,170 1040,330 L1040,700" stroke="${GOLDC}" stroke-width="20" fill="none"/>
    <path d="M600,700 L600,330 Q600,170 820,150 Q1040,170 1040,330 L1040,700" stroke="#D9A22A" stroke-width="6" fill="none" stroke-dasharray="3 16" stroke-linecap="round"/>
    <rect x="580" y="680" width="480" height="30" rx="10" fill="${GOLDC}"/>
    <rect x="-300" y="700" width="2200" height="60" fill="${WALLD}"/>`, .5);
  addArt(r, `<rect x="604" y="600" width="432" height="16" rx="6" fill="#D9A22A"/>${Array.from({ length: 9 }, (_, i) => `<path d="${archD(632 + i * 47, 690, 30, 70)}" fill="none" stroke="#D9A22A" stroke-width="8"/>`).join('')}`, .5);
  addArt(r, dotCurtain(520, 690, 120, 760, 'left') + dotCurtain(950, 1120, 120, 760, 'right') +
    `<path d="M500,118 L1140,118 L1140,150 C1060,210 980,210 900,160 C860,210 780,210 740,160 C660,210 580,210 500,150Z" fill="#F7941D"/>${[580, 740, 900, 1060].map(x => `<circle cx="${x}" cy="196" r="9" fill="${GOLDC}"/>`).join('')}<rect x="490" y="104" width="660" height="18" rx="9" fill="${GOLDC}"/>`, .6, 0, 0, 1, { shade: false });
  addArt(r, pillarM(400, 130, 790, 66, '#F2B65E') + pillarM(1240, 130, 790, 66, '#F2B65E'), .6);
  addArt(r, lampM(250, 150) + lampM(1380, 150), .75, 0, 0, 1, { shade: false });
  // floor: warm tiles and a red runner with gold borders
  addArt(r, `<rect x="-300" y="760" width="2200" height="400" fill="#F4CF9A"/>${Array.from({ length: 16 }, (_, i) => `<path d="M${800 + (i - 7.5) * 60},760 L${800 + (i - 7.5) * 200},1000" stroke="#E2B47A" stroke-width="3"/>`).join('')}${[790, 830, 880, 940].map(y => `<path d="M-300,${y} L1900,${y}" stroke="#E2B47A" stroke-width="3"/>`).join('')}
    <path d="M-300,800 L1900,800 L1900,900 L-300,900Z" fill="#C8202E"/><path d="M-300,812 L1900,812 M-300,888 L1900,888" stroke="${GOLDC}" stroke-width="6"/>
    ${Array.from({ length: 22 }, (_, i) => `<path d="M${-280 + i * 100},850 l14,-14 l14,14 l-14,14Z" fill="${GOLDC}"/>`).join('')}`, 1, 0, 0, 1, { round: false, shade: false });
  const beams = mk(`<g filter="url(#blur)" opacity=".7"><path class="ray" d="M640,200 L1000,200 L1180,1000 L560,1000Z" fill="url(#rayg)"/></g>`); beams.setAttribute('pointer-events', 'none'); r.append(pwrap(beams, .7));
  // the king on his golden throne (left), on a gold dais
  addArt(r, `<path d="M-200,0 L200,0 L184,-34 L-184,-34Z" fill="#D9A22A"/><path d="M-176,-34 L176,-34 L162,-62 L-162,-62Z" fill="${GOLDC}"/><path d="M-150,-14 L150,-14" stroke="#C8202E" stroke-width="6"/>`, 1, 330, 840, 1, { unified: true });
  addArt(r, throneM(), 1, 330, 780, .95, { unified: true });
  const king = actor(person({ ...KING, seated: 'chair' }), 330, 780, 1.22); r.append(king);
  const guard1 = actor(person({ ...FOLK.pagdi, cloth: '#C8452C', vest: '#7A8290', spear: true, waist: '#F2B23A' }), 110, 850, 1.02); r.append(guard1);
  // the court: a minister in green with a blue sash, a whispering pair, people in pagdi, cap and dupatta
  const minister = actor(person({ who: 'servant', skin: '#C98A5E', turban: '#F7F2E8', stripe: '#E9E0CC', robe: '#2E8B57', sash: '#2E7DD8', beard: '#2A1A10', mustache: true, carry: 'scroll', shoes: '#6B3F1E' }), 640, 860, 1, { fx: -1 });
  const wA = actor(person({ ...FOLK.cap }), 900, 846, .92);
  const wB = actor(person({ ...FOLK.pagdi, turban: '#F2861E', stripe: '#FFD86A', stripe2: '#C8641A', vest: '#2E7DD8' }), 1000, 846, .94, { fx: -1 });
  const lady = actor(person(FOLK.dupatta), 1130, 852, .9, { fx: -1 });
  const elder = actor(person({ skin: '#E3A274', beard: '#F4F0E8', mustache: true, mustacheColor: '#F4F0E8', hair: '#EFEBE3', turban: '#F7F2E8', stripe: '#E9E0CC', drape: '#E0A82A', cloth: '#F3EEE2', lower: '#F3EEE2', longLower: true, sandals: true, carry: 'scroll' }), 1270, 846, .96, { fx: -1 });
  const pag = actor(person(FOLK.pagdi), 1400, 856, .98, { fx: -1 });
  const lady2 = actor(person(FOLK.dupatta2), 1510, 850, .9, { fx: -1 });
  const guard2 = actor(person({ ...FOLK.pagdi, cloth: '#2E5FA8', vest: '#7A8290', spear: true, waist: '#C8452C' }), 1600, 866, 1.04, { fx: -1 });
  const court = [wA, wB, lady, elder, pag, lady2]; r.append(minister, ...court, guard2);
  // the whispering pair keep chatting in the background
  const chat = () => { if (!wB.isConnected) return; wB.inner.classList.toggle('whisper'); wA.parts.head.classList.toggle('tilt', wB.inner.classList.contains('whisper')); };
  for (let k = 0; k < 12; k++) later(chat, 2500 + k * 2600);
  addArt(r, `<ellipse cx="0" cy="4" rx="120" ry="12" fill="#000" opacity=".2"/><path d="M-110,0 L110,0 L110,-110 L-110,-110Z" fill="#8A5A2A"/><path d="M-110,-110 C-110,-180 110,-180 110,-110Z" fill="#A06A34"/>
    <path d="M-110,-56 L110,-56 M-60,-160 L-60,0 M60,-160 L60,0" stroke="${GOLDC}" stroke-width="10" stroke-linecap="round"/><rect x="-18" y="-80" width="36" height="40" rx="8" fill="${GOLDC}"/><circle cx="0" cy="-62" r="6" fill="#5A3A10"/>`, 1.15, 560, 990, .8, { unified: true });
  addArt(r, flowerPot(40, 990, 1.2, '#F25C78') + flowerPot(1560, 1000, 1.1, '#F7A21B'), 1.2);
  motes(r, 22, '#FFF2C0', { seed: 77, x0: 300, x1: 1300, y0: 150, y1: 800, depth: .8 });
  place(world, 800 - 1.02 * 800, 450 - 1.02 * 470, 1.02);
  await reveal(); ambience('glow'); bgLife('court'); SFX.fanfare();
  tween(world, { x: 800 - 1.1 * 760, y: 450 - 1.1 * 480, s: 1.1 }, 9000, ease.io);
  [minister, lady, pag].forEach((p, i) => later(() => p.inner.classList.add('namaste'), 600 + i * 500));
  king.inner.classList.add('gesturing');
  await say('arjun', 'King Amara Shakthi was kind and wise, and his people loved him.');
  king.inner.classList.remove('gesturing');
  [minister, lady, pag].forEach(p => p.inner.classList.remove('namaste'));
  await focus(390, 520, 1.6, 2000);
  await say('king', 'My kingdom is happy and strong. And yet… one thing troubles me.');
  setMood(king.inner, 'worry'); setBrow(king.inner, 'worry');
  [minister, ...court].forEach(p => p.parts.head.classList.add('tilt'));
  focus(800, 500, 1.08, 2200);
  await say('arjun', 'The king had three sons. And they were his biggest worry!');
  await sleep(600);
}

/* ══════════ Opening 3: the three princes at play ══════════ */
function mangoTree(r, x, y, s) {
  const t = tree(x, y, s, { leaf: '#3E9A3E', hi: '#7CCB52', trunk: '#8A5A34' });
  const R = rng(Math.round(x));
  for (let i = 0; i < 12; i++) { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * .8; t.canopy.append(mk(`<ellipse cx="${n1(Math.cos(a) * 120 * d)}" cy="${n1(-262 + Math.sin(a) * 90 * d + 20)}" rx="10" ry="14" fill="#F6C02A"/><ellipse cx="${n1(Math.cos(a) * 120 * d - 3)}" cy="${n1(-262 + Math.sin(a) * 90 * d + 15)}" rx="3" ry="5" fill="#FFF0A0"/>`)); }
  for (let i = 0; i < 8; i++) { const a = R() * Math.PI * 2, d = Math.sqrt(R()) * .85; t.canopy.append(mk(`<circle cx="${n1(Math.cos(a) * 120 * d)}" cy="${n1(-262 + Math.sin(a) * 90 * d)}" r="7" fill="#F49AC8"/>`)); }
  r.append(t); return t;
}
function rangoliM() {
  let m = '<ellipse cx="0" cy="0" rx="250" ry="70" fill="#F6E7C8"/>';
  const ring = (rx, ry, n, col, size) => { let s = ''; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; s += `<ellipse cx="${n1(Math.cos(a) * rx)}" cy="${n1(Math.sin(a) * ry)}" rx="${size}" ry="${n1(size * .45)}" fill="${col}" transform="rotate(${n1(a * 57.3 * .28)} ${n1(Math.cos(a) * rx)} ${n1(Math.sin(a) * ry)})"/>`; } return s; };
  m += ring(210, 56, 22, '#2E9E6A', 26) + ring(170, 44, 18, '#F06A1C', 24) + ring(126, 33, 14, '#8E5BD6', 22) + ring(82, 21, 10, '#F2C14E', 20) + `<ellipse cx="0" cy="0" rx="46" ry="12" fill="#E8418A"/><ellipse cx="0" cy="0" rx="20" ry="5" fill="#F2C14E"/>`;
  return m;
}
function rockingHorse() {
  return `<path d="M-120,0 C-60,26 60,26 120,0" stroke="#8A5A2A" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M-70,10 L-60,-70 M70,10 L60,-70" stroke="#A86A34" stroke-width="16" stroke-linecap="round"/>
  <path d="M-90,-60 C-96,-100 -50,-112 0,-110 C50,-112 92,-100 90,-64 C88,-46 60,-40 0,-42 C-60,-40 -86,-44 -90,-60Z" fill="#B8783A"/>
  <path d="M-96,-90 C-116,-90 -126,-70 -120,-56" stroke="#5A3418" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M60,-96 C70,-140 86,-170 112,-176 C134,-178 146,-160 140,-146 C132,-140 118,-138 108,-130 C100,-116 92,-100 86,-86Z" fill="#B8783A"/>
  <path d="M74,-150 C66,-160 66,-176 80,-182 C82,-170 84,-160 86,-150Z" fill="#B8783A"/><circle cx="118" cy="-160" r="5" fill="#2A1A10"/>
  <path d="M66,-130 C58,-150 64,-170 80,-180" stroke="#5A3418" stroke-width="10" fill="none" stroke-linecap="round"/>
  <path d="M-30,-110 C-20,-120 20,-120 30,-110 L26,-90 L-26,-90Z" fill="#C8452C"/><path d="M90,-140 L40,-100" stroke="#F2C14E" stroke-width="4"/>`;
}
async function i3() {
  const r = newStage('#E7B47E');
  sky(r, [[0, '#FFE6B4'], [1, '#FFD49A']]);
  // courtyard wall with an arcade, a jharokha balcony and soft curtains
  addArt(r, `<rect x="-200" y="80" width="2000" height="640" fill="${SAND}"/><rect x="-200" y="70" width="2000" height="22" rx="8" fill="${SAND_L}"/>${crenel(-200, 1800, 70, SAND_L)}
    ${[180, 420, 1180, 1420].map(x => `<path d="${archD(x, 660, 170, 330)}" fill="#C47E48"/><path d="${archD(x, 660, 130, 290)}" fill="#F6D9B0"/>`).join('')}
    <rect x="640" y="140" width="320" height="16" rx="6" fill="${SAND_L}"/>`, .2, 0, 0, 1, { unified: true });
  addArt(r, [180, 420, 1180, 1420].map((x, i) => `<path d="M${x - 64},400 C${x - 30},420 ${x - 40},560 ${x - 60},660 L${x - 64},660Z M${x + 64},400 C${x + 30},420 ${x + 40},560 ${x + 60},660 L${x + 64},660Z" fill="${['#F7EFE0', '#FFE8C0'][i % 2]}"/>`).join(''), .2, 0, 0, 1, { shade: false });
  addArt(r, `<path d="M640,380 L960,380 L930,430 L670,430Z" fill="${SAND_L}"/><rect x="660" y="250" width="280" height="130" fill="${SAND}"/>${windowsRow(670, 930, 370, 60, 100, '#C47E48', 3)}${domeM(800, 250, 74, SAND)}`.replace('domeM', 'domeM'), .2, 0, 0, 1, { unified: true });
  // fountain
  addArt(r, `<ellipse cx="800" cy="676" rx="150" ry="30" fill="#E9D3B0"/><ellipse cx="800" cy="668" rx="128" ry="22" fill="#7FC8E8"/><rect x="786" y="580" width="28" height="86" rx="10" fill="#F2E2C6"/><ellipse cx="800" cy="580" rx="56" ry="12" fill="#E9D3B0"/><ellipse cx="800" cy="576" rx="44" ry="8" fill="#9ED8F0"/>`, .45);
  const water = mk(`<g fill="none" stroke="#DDF4FF" stroke-linecap="round"><path class="flow" d="M800,570 C790,520 760,520 740,575" stroke-width="5"/><path class="flow" style="animation-delay:-.4s" d="M800,570 C810,520 840,520 860,575" stroke-width="5"/><path class="flow" style="animation-delay:-.2s" d="M800,572 C800,520 800,505 800,500" stroke-width="7"/></g>`); r.append(pwrap(water, .45));
  hill(r, 700, '#F2DDB8', { amp: 0, period: 1000 });
  addArt(r, `<rect x="-300" y="700" width="2200" height="400" fill="#F2DDB8"/>${Array.from({ length: 18 }, (_, i) => `<path d="M${800 + (i - 8.5) * 70},700 L${800 + (i - 8.5) * 210},1000" stroke="#E2C89E" stroke-width="3"/>`).join('')}${[730, 770, 830, 910].map(y => `<path d="M-300,${y} L1900,${y}" stroke="#E2C89E" stroke-width="3"/>`).join('')}`, 1, 0, 0, 1, { round: false, shade: false });
  mangoTree(r, 330, 700, 1.1); mangoTree(r, 1290, 700, 1.15);
  addArt(r, rangoliM(), 1, 800, 880, 1, { shade: false });
  // pillars wrapped in marigold garlands
  for (const x of [520, 1080]) {
    addArt(r, pillarM(x, 60, 900, 76, '#E8B880'), 1.25);
    addArt(r, `<g class="hang"><path d="M${x - 40},90 C${x - 60},170 ${x - 40},250 ${x - 36},330" stroke="#F7A21B" stroke-width="16" stroke-dasharray="1 13" stroke-linecap="round" fill="none"/><path d="M${x + 40},90 C${x + 60},170 ${x + 40},250 ${x + 36},330" stroke="#F06A1C" stroke-width="16" stroke-dasharray="1 13" stroke-linecap="round" fill="none"/><path d="M${x - 40},90 Q${x},150 ${x + 40},90" stroke="#F7A21B" stroke-width="16" stroke-dasharray="1 13" stroke-linecap="round" fill="none"/></g>`, 1.25, 0, 0, 1, { shade: false });
  }
  // peacocks and squirrels
  const pc1 = actor(peacock(), 980, 760, .8), pc2 = actor(peacock(), 1460, 800, .7, { fx: -1 }); r.append(pc1, pc2);
  const sq = [actor(squirrel(), 600, 840, 1), actor(squirrel(), 140, 960, 1.1, { fx: -1 })]; r.append(...sq);
  sq.forEach((s, i) => { const hop = () => { if (!s.isConnected) return; const x0 = s._t.x; tween(s, { y: s._t.y - 18 }, 220, ease.out).then(() => tween(s, { y: s._t.y + 18, x: x0 + (i ? -14 : 14) }, 260, ease.in)); }; for (let k = 0; k < 14; k++) later(hop, 1500 + k * 2600 + i * 900); });
  // Bahushakti on the swing
  const swingPivot = G({ transform: 'translate(300 -60)' }), swingArm = G({ class: 'swingp' });
  swingArm.append(mk(`<path d="M-62,0 L-62,600 M62,0 L62,600" stroke="#B8843A" stroke-width="7" stroke-linecap="round"/><path d="M-62,40 L-62,560 M62,40 L62,560" stroke="#F7A21B" stroke-width="10" stroke-dasharray="1 22" stroke-linecap="round"/><rect x="-84" y="596" width="168" height="20" rx="8" fill="#A86A34"/>`));
  const p1 = actor(person({ ...PRINCES[0], seated: 'chair', mood: 'smile' }), 0, 660, 1); p1.inner.classList.add('hold'); swingArm.append(p1);
  swingPivot.append(swingArm); r.append(swingPivot);
  // Ugrashakti on the rocking horse
  const rh = G({ class: 'rock' }); rh.append(mk(rockingHorse()));
  const p2 = actor(person({ ...PRINCES[1], seated: 'chair' }), 0, -40, .95); p2.inner.classList.add('reach'); rh.append(p2);
  const rhA = actor(rh, 690, 820, 1); r.append(rhA); shade(rh.firstChild, true);
  // spinning top
  addArt(r, `<g class="spintop"><path d="M0,0 L-24,-30 C-24,-50 24,-50 24,-30Z" fill="#C8452C"/><path d="M-22,-34 Q0,-26 22,-34" stroke="${GOLDC}" stroke-width="5" fill="none"/><rect x="-3" y="-60" width="6" height="18" rx="3" fill="#7A4B2A"/></g>`, 1, 1000, 900, 1, { shade: false });
  // Anantashakti asleep on his mat: on his back, legs apart, tucked under a quilt
  addArt(r, `<path d="M-270,0 L270,0 L248,-40 L-248,-40Z" fill="#E2B862"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${-240 + i * 44},-40 L${-262 + i * 48},0" stroke="#C99A44" stroke-width="3"/>`).join('')}`, 1, 1190, 900, 1);
  const p3s = actor(sleeper(PRINCES[2]), 1200, 892, 1); r.append(p3s);
  const p3 = actor(person({ ...PRINCES[2], seated: 'cross' }), 1180, 892, .92); p3.style.opacity = 0; p3.style.transition = 'opacity .7s'; p3s.style.transition = 'opacity .7s'; r.append(p3);
  const zz = mk(`<g class="zzz"><text x="0" y="0" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="40" fill="#6A3E9E" stroke="#FFF6DE" stroke-width="5" paint-order="stroke">z</text><text x="26" y="-30" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="30" fill="#6A3E9E" stroke="#FFF6DE" stroke-width="5" paint-order="stroke">z</text><text x="46" y="-56" font-family="'Baloo 2',sans-serif" font-weight="800" font-size="22" fill="#6A3E9E" stroke="#FFF6DE" stroke-width="4" paint-order="stroke">z</text></g>`);
  place(zz, 1010, 760, 1); zz.setAttribute('pointer-events', 'none'); r.append(zz);
  addArt(r, flowerPot(60, 860, 1.2, '#F25C78') + flowerPot(1560, 880, 1.1, '#C04CC8'), 1.3);
  addArt(r, curtainM(-30, 110, -40, 900, '#F3E2C2', 'left') + `<g transform="translate(1600 0) scale(-1 1)">${curtainM(-30, 110, -40, 900, '#F3E2C2', 'left')}</g>`, 1.4, 0, 0, 1, { shade: false });
  motes(r, 18, '#FFF2C0', { seed: 91, depth: .9 });
  const snoreT = setInterval(() => { if (p3s.isConnected && p3s.style.opacity !== '0') SFX.snore(); }, 3200); cleanups.push(() => clearInterval(snoreT));
  place(world, 800 - 1.06 * 800, 450 - 1.06 * 500, 1.06);
  await reveal(); ambience('day'); bgLife('garden');
  tween(world, { x: 800 - 1.1 * 800, y: 450 - 1.1 * 510, s: 1.1 }, 9000, ease.io);
  await say('arjun', 'He had three sons — clever, playful, curious boys… who loved everything except their lessons!');
  // zoom on each prince as he is introduced
  await focus(300, 450, 1.55);
  let tag = nameTag(r, 'Bahushakti', 300, 262, '#6A3E8E'); SFX.wheee();
  await say('arjun', 'This is Bahushakti. He loved his swing — higher and higher, all day long!');
  await say('princes', 'Wheee!');
  tag.remove(); await focus(690, 640, 1.6);
  tag = nameTag(r, 'Ugrashakti', 690, 450, '#2E8A70'); SFX.hoof(); later(() => SFX.creak(), 500);
  await say('arjun', 'This is Ugrashakti. Giddy-up! He galloped on his wooden horse, pretending to ride into battle.');
  tag.remove(); await focus(1200, 780, 1.6);
  tag = nameTag(r, 'Anantashakti', 1200, 680, '#E8642B'); SFX.snore();
  await say('arjun', 'And this is Anantashakti. He loved to sleep… and sleep… and sleep!');
  tag.remove();
  await interaction('Anantashakti is fast asleep! Tap him to wake him up.', null, ctx => {
    tappables(ctx, [p3s], it => { it._done = true; unkey(it); SFX.pop(); ctx.done(); });
  });
  zz.remove(); SFX.yawn();
  p3s.style.opacity = 0; p3.style.opacity = 1; p3.inner.classList.add('hold'); setMood(p3.inner, 'o');
  later(() => p3s.remove(), 800);
  await sleep(1200);
  p3.inner.classList.remove('hold'); setMood(p3.inner, 'smile'); SFX.chime(); sparkles(r, 1180, 640, 8, 90);
  await say('princes', 'Huh? Is it time to play?');
  focus(800, 480, 1.08, 2200);
  await say('arjun', 'But the princes ran from every book they saw.');
  await say('arjun', "The king worried. How would his sons ever learn to rule a kingdom if they wouldn't sit still with a book?");
  await ask(`The princes love to play! What is your favourite game${KID.name ? ', ' + KID.name : ''}?`);
}

/* ══════════ Scene 1: Vishnu Sharma under the banyan ══════════ */
async function s1() {
  const r = newStage('#9CC47A');
  sky(r, [[0, '#E9F3B8'], [.55, '#CFE6A0'], [1, '#B4D68A']]);
  const rays = mk(`<g filter="url(#blur)" opacity=".75"><path class="ray" d="M1500,-50 L1660,-50 L900,900 L620,900Z" fill="url(#rayg)"/><path class="ray" style="animation-delay:-2.5s" d="M1300,-50 L1400,-50 L560,900 L380,900Z" fill="url(#rayg)"/></g>`); rays.setAttribute('pointer-events', 'none');
  [[60, 600, .7], [300, 590, .6], [1290, 590, .65], [1530, 600, .75]].forEach(([x, y, s]) => r.append(tree(x, y, s, { leaf: '#7CBF5A', hi: '#A8DA78', trunk: '#8A6A44' })));
  hill(r, 640, '#8CC25A', { amp: 14, period: 1100 });
  r.append(banyan(800, 770, 1.12, { leaf: '#3E8F3A', hi: '#74C255', bark: '#8A5A34' }));
  r.append(pwrap(rays, .6));
  hill(r, 745, '#7DBB4C', { amp: 6, period: 1300 });
  tufts(r, 70, -100, 1700, 750, 900, '#5EA23E', 401);
  motes(r, 34, '#FFF2A0', { seed: 403 });
  // mat, books and scrolls
  addArt(r, `<ellipse cx="0" cy="0" rx="230" ry="44" fill="#D9B56A"/><ellipse cx="0" cy="0" rx="206" ry="34" fill="none" stroke="#B88A3A" stroke-width="4" stroke-dasharray="10 8"/>`, 1, 800, 812, 1);
  addArt(r, `<rect x="-60" y="-26" width="130" height="26" rx="6" fill="#8E4A2A"/><rect x="-56" y="-50" width="122" height="24" rx="6" fill="#3E7DA8"/><rect x="-64" y="-72" width="126" height="22" rx="6" fill="#2E8B4E"/><path d="M-60,-62 L60,-62 M-52,-38 L60,-38" stroke="${GOLDC}" stroke-width="3"/>
    <g transform="translate(120 -8)"><rect x="-40" y="-14" width="80" height="20" rx="10" fill="#F3E3B8"/><circle cx="-40" cy="-4" r="10" fill="#C9A46A"/><circle cx="40" cy="-4" r="10" fill="#C9A46A"/></g>`, 1.1, 260, 900, 1);
  const sage = actor(person({ ...SAGE, staff: false, seated: 'cross' }), 800, 820, 1.25); r.append(sage);
  const pr = [actor(person({ ...PRINCES[0], seated: 'cross' }), 430, 850, 1.02), actor(person({ ...PRINCES[1], seated: 'cross' }), 1130, 850, 1, { fx: -1 }), actor(person({ ...PRINCES[2], seated: 'cross' }), 1320, 870, 1.04, { fx: -1 })];
  r.append(...pr);
  addArt(r, `<g transform="translate(-40 0)">${['#3E9A3E', '#5EB04A', '#2E8B4E'].map((c, i) => `<path d="M${i * 30},0 C${-20 + i * 30},-60 ${10 + i * 30},-120 ${40 + i * 20},-150 C${30 + i * 30},-100 ${30 + i * 30},-50 ${20 + i * 30},0Z" fill="${c}"/>`).join('')}</g>`, 1.4, 1560, 920, 1.2);
  addArt(r, `<g>${['#3E9A3E', '#5EB04A', '#2E8B4E'].map((c, i) => `<path d="M${i * 30},0 C${-20 + i * 30},-60 ${10 + i * 30},-120 ${40 + i * 20},-150 C${30 + i * 30},-100 ${30 + i * 30},-50 ${20 + i * 30},0Z" fill="${c}"/>`).join('')}</g>`, 1.4, 20, 930, 1.1);
  place(world, 800 - 1.05 * 800, 450 - 1.05 * 520, 1.05);
  await reveal(); ambience('glow'); bgLife('garden');
  tween(world, { x: 800 - 1.1 * 800, y: 450 - 1.1 * 545, s: 1.1 }, 14000, ease.io);
  await say('arjun', 'So the king called for a wise scholar named Vishnu Sharma, and asked him to teach the princes.');
  sage.inner.classList.add('open');
  await say('vishnu', 'I will teach them everything they need to know — not in years… but in just six months!');
  await say('arjun', 'But how? The princes never sat still… So Vishnu Sharma had a clever idea.');
  SFX.chime(); sparkles(r, 800, 420, 10, 70);
  await say('vishnu', 'Instead of boring lessons… I will tell them stories! Stories full of clever animals, funny mistakes, and important lessons about life.');
  // glowing story animals rise from his hands
  const spirits = G({ filter: 'url(#spirit)', 'pointer-events': 'none' });
  const trails = mk(`<g fill="none" stroke="#FFF2B0" stroke-width="5" stroke-linecap="round" opacity=".7"><path class="flow" d="M720,600 C640,560 600,470 520,420"/><path class="flow" style="animation-delay:-.3s" d="M760,580 C740,500 700,360 690,300"/><path class="flow" style="animation-delay:-.6s" d="M840,580 C860,500 900,360 920,300"/><path class="flow" style="animation-delay:-.9s" d="M880,600 C960,560 1000,470 1080,420"/></g>`);
  spirits.append(trails);
  const sp = [[lion(), 520, 470, .34], [birdSpirit(), 690, 290, .9], [turtleSpirit(), 925, 300, .9], [jackal(DAMANAKA), 1080, 470, .42]].map(([el, x, y, s], i) => {
    const w = place(G({}), x, y, s), pop = G({ class: 'popin' }), f = G({ class: 'floaty' }); f.style.animationDelay = (-i * .9) + 's'; f.append(el); pop.append(f); w.append(pop); spirits.append(w); return w;
  });
  spirits.style.opacity = 0; spirits.style.transition = 'opacity 1.2s'; r.append(spirits); requestAnimationFrame(() => { spirits.style.opacity = 1; });
  SFX.sparkle();
  pr.forEach(p => setMood(p.inner, 'o'));
  await sleep(1400);
  pr.forEach(p => setMood(p.inner, 'smile'));
  await say('arjun', 'He called these stories the Panchatantra.');
  const title = mk(`<text x="800" y="170" text-anchor="middle" font-family="'Yatra One',serif" font-size="92" fill="#FFE08A" stroke="#8A4A10" stroke-width="10" paint-order="stroke" filter="url(#glow)">पञ्चतन्त्र</text>`); title.setAttribute('class', 'popin'); title.setAttribute('pointer-events', 'none'); r.append(title);
  SFX.chime();
  pr.forEach(p => p.inner.classList.add('namaste'));
  await say('arjun', "And the princes loved them so much, they couldn't wait to hear what happened next.");
  pr.forEach(p => p.inner.classList.remove('namaste'));
  spirits.style.opacity = 0; title.style.transition = 'opacity 1s'; title.style.opacity = 0;
  await say('arjun', 'Today, Vishnu Sharma is going to tell the princes — and us — our very first Panchatantra story! Let’s listen closely…');
  sage.inner.classList.remove('open');
  spirits.remove(); title.remove();
  sage.inner.classList.add('namaste'); pr.forEach(p => p.inner.classList.add('namaste'));
  await say('vishnu', `Namaste, ${kidName()}! Are you ready to hear a story?`);
  await namaste(r);
  SFX.chime(); sparkles(r, 800, 450, 16, 160);
  sage.parts.head.classList.add('hdown'); pr.forEach(p => p.parts.head.classList.add('hdown'));
  await say('princes', `Namaste, ${kidName()}!`);
  sage.parts.head.classList.remove('hdown'); sage.inner.classList.remove('namaste'); pr.forEach(p => { p.parts.head.classList.remove('hdown'); p.inner.classList.remove('namaste'); });
  await say('arjun', 'Vishnu Sharma took the three sons under his fold and said:');
  const tb = thought(r, 800, 205); place(tb, 800, 205, .05); await anim(tb, { s: 1 }, 600, ease.io);
  const lh = place(lionHead(), -60, 10, .72); tb.content.append(lh);
  await say('vishnu', 'Listen carefully. There was once a lion king named Pingalaka.');
  lh.classList.add('wide'); lh.parts.ears.classList.add('ears-up'); lionMood(lh, 'scared');
  await say('vishnu', 'One day, a strange sound filled the forest and frightened him.');
  const jk = place(shade(jackal(DAMANAKA), true), 76, 86, .6); tb.content.append(G({ class: 'popin' }, jk));
  await say('vishnu', 'A cunning jackal came forward and cleverly set out to discover the truth.');
  pr.forEach(p => p.parts.head.classList.add('tilt'));
  await say('princes', 'How?');
  await say('arjun', 'And Vishnu Sharma began…');
  await ask('Ooh, a story with a lion and a jackal! Do you like lions? What sound do you think a lion makes?');
  await anim(world, { x: 800 - 3 * 800, y: 450 - 3 * 205, s: 3 }, 1400, ease.io);
  flash();
}
