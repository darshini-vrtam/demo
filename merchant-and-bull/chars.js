/* ══════════ Characters ══════════
   Storybook style: round friendly shapes, big eyes with highlights, no seams or joints.
   Every limb is one tapered shape whose rounded top sinks into the body in the body's own colour,
   heads sit on a neck, hands, paws, tails, horns and crowns all grow out of the figure they belong to.
   Each builder keeps the scene API: .parts.head / .parts.mouth / .parts.brows / armL / armR / tail / ears,
   mood via MOUTH.x / BROW.x strings, and pose classes (pray, worry, raise, droop, eat, tilt, duck…). */
const MOUTH = { smile: 'M-8,-15 q8,7 16,0', sad: 'M-8,-10 q8,-6 16,0', o: 'M-4,-13 a4,5 0 1,0 8,0 a4,5 0 1,0 -8,0', flat: 'M-7,-13 L7,-13', worry: 'M-8,-11 q4,-4 8,-1 q4,3 8,-1', grin: 'M-10,-16 q10,11 20,0' };
const BROW = { normal: 'M-17,-44 Q-11,-49 -4,-45 M4,-45 Q11,-49 17,-44', worry: 'M-17,-43 L-5,-48 M5,-48 L17,-43', stern: 'M-17,-47 L-4,-43 M4,-43 L17,-47' };
const MOOD_OF = new Map([[MOUTH.smile, 'smile'], [MOUTH.grin, 'smile'], [MOUTH.sad, 'sad'], [MOUTH.o, 'o'], [MOUTH.flat, 'flat'], [MOUTH.worry, 'worry']]);
const BROW_OF = new Map([[BROW.normal, ''], [BROW.worry, 'worry'], [BROW.stern, 'stern']]);
function setMood(el, m) { ['m-sad', 'm-o', 'm-flat', 'm-worry'].forEach(c => el.classList.remove(c)); if (m && m !== 'smile') el.classList.add('m-' + m); }
function setBrow(el, b) { el.classList.remove('b-worry', 'b-stern'); if (b) el.classList.add('b-' + b); }
// Scenes swap mouths/brows by assigning v6 path strings; these proxies turn that into a mood change.
const mouthProxy = (root, dflt = 'o') => ({ setAttribute(k, v) { if (k === 'd') setMood(root, MOOD_OF.get(v) || dflt); }, getAttribute() { return ''; }, style: {} });
const browProxy = root => ({ setAttribute(k, v) { if (k === 'd') setBrow(root, BROW_OF.get(v) ?? ''); }, getAttribute() { return ''; }, style: {} });
const GEM_R = '#B3122F', GEM_G = '#1E8A5A';
const dkc = (c, k = .2) => mix(c, '#1E140C', k), ltc = (c, k = .2) => mix(c, '#FFF8E2', k);
const n1 = v => (+v).toFixed(1);

/* Round every hard corner: each flat-filled shape gets a same-colour stroke with round joins,
   which softens points and seals hairline seams between touching parts. */
function roundify(root, w = 2.6) {
  for (const el of root.querySelectorAll('path,rect,ellipse,circle,polygon')) {
    if (el.hasAttribute('stroke') || el.classList.contains('lid')) continue;
    const f = el.getAttribute('fill');
    if (!f || !HEX.test(f)) continue;
    el.setAttribute('stroke', f); el.setAttribute('stroke-width', w); el.setAttribute('stroke-linejoin', 'round');
  }
  root.querySelectorAll('.lid').forEach(l => { l.style.animationDelay = (-Math.random() * 5).toFixed(2) + 's'; });
  return root;
}
function build(cls, scale, markup, o = {}) {
  const root = G({ class: cls }), art = G({ transform: o.flip ? `scale(${-scale} ${scale})` : `scale(${scale})` });
  art.innerHTML = markup; root.append(art); roundify(art); root.art = art; return root;
}

/* ══════════ walking rigs ══════════
   One driver moves every leg, foot, arm swing, body bob, head nod and wheel. The gait advances with
   how far the figure actually travels (or with .moving / .walking / .hop when walking on the spot),
   and the swing fades in and out with speed, so starts, stops and speed changes all blend smoothly. */
const RIGS = new Set();
function regRig(root, art, o) {
  const grab = sel => [...art.querySelectorAll(sel)].map(e => ({ e, ph: (+e.dataset.ph || 0) * Math.PI * 2 }));
  RIGS.add({ root, art, o, legs: grab('.leg'), feet: grab('.foot'), arms: grab('.aswing'), bodies: [...art.querySelectorAll('.bodyb')], nod: art.querySelector('.nod'), wheels: [...art.querySelectorAll('.wheel')], phase: Math.random() * 6.283, amp: 0, v: 0, lx: null });
}
function stepRigs(dt) {
  if (!(dt > 0)) return;
  let wi; try { wi = world.getCTM().inverse(); } catch (e) { return; }
  for (const r of RIGS) {
    const par = r.root.parentNode;
    if (!r.root.isConnected || !par || !par.getCTM) { r.lx = null; continue; }
    let m, ms; try { m = wi.multiply(par.getCTM()); ms = wi.multiply(r.art.getCTM()); } catch (e) { continue; }
    const sc = Math.hypot(ms.a, ms.b) || 1, x = m.e;
    let meas = r.lx == null ? 0 : Math.abs(x - r.lx) / dt / sc; r.lx = x;
    if (meas < 12 || meas > 5000) meas = 0;
    const mov = r.root.closest('.moving,.walking,.hop'), run = mov && r.root.closest('.running');
    const target = Math.max(meas, mov ? r.o.nominal * (run ? 2.2 : 1) : 0);
    r.v += (target - r.v) * Math.min(1, dt * 4);
    const fast = Math.min(1, Math.max(0, r.v / r.o.nominal - 1));
    r.phase += r.v / (r.o.stride * (1 + .6 * fast)) * dt * Math.PI * 2;
    r.amp += (Math.min(1, r.v / r.o.nominal) - r.amp) * Math.min(1, dt * 3);
    const A = r.amp, P = r.phase, sw = r.o.swing ?? 12;
    for (const l of r.legs) l.e.setAttribute('transform', `rotate(${(A * sw * (1 + .3 * fast) * Math.cos(P + l.ph)).toFixed(2)})`);
    for (const f of r.feet) f.e.setAttribute('transform', `translate(${(-A * 18 * (1 + .5 * fast) * Math.cos(P + f.ph)).toFixed(2)} ${(-A * (7 + 5 * fast) * Math.max(0, Math.sin(P + f.ph))).toFixed(2)})`);
    for (const a of r.arms) a.e.setAttribute('transform', `rotate(${(A * 14 * (1 + .8 * fast) * Math.cos(P + a.ph)).toFixed(2)})`);
    if (r.bodies.length) { const tb = `translate(0 ${(-A * (r.o.bob ?? 3) * (1 + fast) * (1 - Math.cos(2 * P)) / 2).toFixed(2)})`; for (const b of r.bodies) b.setAttribute('transform', tb); }
    if (r.nod) r.nod.setAttribute('transform', `rotate(${(A * (r.o.nod || 0) * Math.sin(P)).toFixed(2)})`);
    for (const w of r.wheels) { w._a = ((w._a || 0) + r.v * dt / (r.o.wheelR || 66) * 57.2958) % 360; w.setAttribute('transform', `rotate(${w._a.toFixed(1)})`); }
  }
}

/* eyes: white, big pupil, two highlights, and a lid in the face colour */
function eyeM(x, y, rx, ry, lid, o = {}) {
  const pr = o.pr || rx * .62, dx = o.dx ?? rx * .22;
  return `<g class="eye"><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#FFFFFF"/><circle cx="${n1(x + dx)}" cy="${n1(y + 1.5)}" r="${n1(pr)}" fill="#1E1714"/><circle cx="${n1(x + dx + pr * .38)}" cy="${n1(y - pr * .3)}" r="${n1(pr * .36)}" fill="#FFFFFF"/><circle cx="${n1(x + dx - pr * .35)}" cy="${n1(y + pr * .45)}" r="${n1(pr * .16)}" fill="#FFFFFF"/><ellipse class="lid" cx="${x}" cy="${y}" rx="${n1(rx + 1.5)}" ry="${n1(ry + 1.5)}" fill="${lid}"/></g>`;
}
function humanMouths(y) {
  return `<path class="mS" d="M-6,${y} Q6,${y + 17} 18,${y} Q6,${y + 5} -6,${y}Z" fill="#8E2F22"/>
  <path class="mSad" d="M-4,${y + 9} Q6,${y + 1} 16,${y + 9}" stroke="#6E2A1E" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse class="mO" cx="6" cy="${y + 7}" rx="6" ry="8" fill="#8E2F22"/>
  <path class="mFlat" d="M-2,${y + 5} Q6,${y + 6} 14,${y + 5}" stroke="#6E2A1E" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path class="mWorry" d="M-5,${y + 7} q5,-5 11,-1 q5,4 11,-1" stroke="#6E2A1E" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
}

/* ── human head (pivot at the neck; head centre (2,-52), radius 50) ── */
function headM(o) {
  const sk = o.skin || '#E8A577', skD = dkc(sk, .16), hair = o.hair || '#33200F';
  const bc = o.browColor || hair, kid = !!o.kid, er = kid ? 12 : 10, ery = kid ? 14 : 12;
  let m = '';
  if (o.longHair) m += `<path d="M-50,-70 C-62,-30 -58,8 -46,30 Q-37,37 -30,26 C-38,0 -38,-30 -34,-60Z M54,-70 C66,-30 62,8 50,30 Q41,37 34,26 C42,0 42,-30 38,-60Z" fill="${o.longHair}"/>`;
  if (o.topknot) {
    m += `<circle cx="2" cy="-112" r="22" fill="${o.topknot}"/><path d="M-12,-120 C-4,-128 8,-128 16,-120" stroke="${dkc(o.topknot, .12)}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    for (let i = 0; i < 7; i++) { const a = Math.PI * (.08 + i * .14); m += `<circle cx="${n1(2 - Math.cos(a) * 24)}" cy="${n1(-98 - Math.sin(a) * 6)}" r="4.6" fill="#7A3E1E"/>`; }
  }
  if (o.bun) m += `<circle cx="-30" cy="-100" r="22" fill="${hair}"/><path d="M-46,-108 Q-30,-96 -14,-110" stroke="#F2C14E" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  m += `<circle cx="-46" cy="-50" r="11" fill="${sk}"/><circle cx="50" cy="-50" r="11" fill="${sk}"/><circle cx="-46" cy="-50" r="5" fill="${skD}"/><circle cx="50" cy="-50" r="5" fill="${skD}"/>`;
  if (o.earring) m += `<circle cx="-47" cy="-36" r="5" fill="#F2C14E"/><circle cx="51" cy="-36" r="5" fill="#F2C14E"/>`;
  m += `<circle cx="2" cy="-52" r="50" fill="${sk}"/>`;
  if (o.hairStyle === 'kid') m += `<path d="M-48,-58 C-56,-104 -20,-118 4,-110 C30,-118 60,-100 52,-58 C46,-80 34,-88 24,-84 C22,-90 18,-94 12,-96 C10,-90 8,-86 6,-82 C2,-88 -2,-92 -6,-94 C-8,-88 -10,-84 -12,-80 C-24,-88 -40,-80 -48,-58Z" fill="${hair}"/>`;
  else if (!o.turban && !o.headcloth) m += `<path d="M-50,-60 C-56,-104 -20,-114 4,-112 C30,-114 62,-102 54,-60 C38,-84 -34,-84 -50,-60Z" fill="${hair}"/>`;
  if (o.turban || o.headcloth) m += `<path d="M-50,-74 C-54,-54 -48,-34 -40,-26 C-36,-40 -34,-52 -34,-62Z M54,-74 C58,-54 52,-34 44,-26 C40,-40 38,-52 38,-62Z" fill="${hair}"/>`;
  m += `<circle cx="-24" cy="-30" r="${kid ? 10 : 9}" fill="#F0846E" opacity=".45"/><circle cx="34" cy="-30" r="${kid ? 10 : 9}" fill="#F0846E" opacity=".45"/>`;
  m += eyeM(-12, -58, er, ery, sk) + eyeM(20, -58, er, ery, sk);
  m += `<path class="bN" d="M-23,-76 Q-12,-82 -2,-77 M11,-77 Q22,-82 32,-76" stroke="${bc}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path class="bW" d="M-23,-73 Q-12,-76 -3,-81 M11,-81 Q20,-76 31,-73" stroke="${bc}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path class="bSt" d="M-23,-80 Q-12,-76 -3,-73 M11,-73 Q20,-76 31,-80" stroke="${bc}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
  m += `<ellipse cx="7" cy="-40" rx="7" ry="6" fill="${skD}"/>`;
  if (o.beard) {
    const bd = dkc(o.beard, .1);
    m += o.longBeard
      ? `<path d="M-44,-46 C-48,0 -26,42 2,66 C30,42 52,0 48,-46 C40,-26 24,-14 2,-14 C-20,-14 -36,-26 -44,-46Z" fill="${o.beard}"/><path d="M-20,0 C-14,20 -6,36 2,50 M24,0 C18,20 10,36 4,48" stroke="${bd}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
      : `<path d="M-44,-46 C-46,-12 -24,10 2,12 C28,10 50,-12 48,-46 C40,-26 24,-16 2,-16 C-20,-16 -36,-26 -44,-46Z" fill="${o.beard}"/>`;
  }
  m += humanMouths(o.mustache ? -16 : -22);
  const mc = o.mustacheColor || o.beard || hair;
  if (o.mustache === 'big' || (o.mustache && o.plump)) m += `<path d="M6,-34 C-2,-42 -18,-42 -27,-32 C-33,-24 -43,-26 -43,-36 C-49,-22 -37,-13 -23,-19 C-12,-23 -2,-25 6,-25 C14,-25 25,-23 35,-19 C49,-13 61,-22 55,-36 C55,-26 45,-24 39,-32 C30,-42 14,-42 6,-34Z" fill="${mc}"/>`;
  else if (o.mustache) m += `<path d="M6,-32 C-4,-38 -18,-36 -22,-26 C-10,-29 0,-28 6,-26 C12,-28 22,-29 34,-26 C30,-36 16,-38 6,-32Z" fill="${mc}"/>`;
  if (o.bun) m += `<path d="M4,-104 Q2,-92 4,-84" stroke="${dkc(hair, .3)}" stroke-width="2.5" fill="none"/>`;
  if (o.bindi) m += `<circle cx="4" cy="-78" r="4" fill="#D6302A"/>`;
  if (o.tilak) m += `<path d="M-6,-98 Q2,-80 10,-98" stroke="#F4EEE2" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M2,-96 L2,-86" stroke="#D6302A" stroke-width="4" stroke-linecap="round"/>`;
  if (o.headband) m += `<path d="M-48,-86 C-20,-102 26,-102 52,-86 L53,-77 C26,-92 -20,-92 -49,-77Z" fill="${o.headband}"/><circle cx="2" cy="-92" r="4.5" fill="#F2C14E"/>`;
  if (o.headcloth) m += `<path d="M-54,-62 C-60,-114 64,-114 58,-62 C34,-76 -30,-76 -54,-62Z" fill="${o.headcloth}"/><path d="M50,-70 C62,-64 66,-48 62,-38 C56,-46 52,-54 46,-60Z" fill="${o.headcloth}"/>`;
  if (o.turban) {
    const st = o.stripe || ltc(o.turban, .45), st2 = o.stripe2 || dkc(o.turban, .18), clip = uid('tb');
    m += `<defs><clipPath id="${clip}"><path d="M-54,-66 C-62,-112 -30,-138 4,-138 C42,-138 68,-112 58,-66 C30,-80 -24,-82 -54,-66Z"/></clipPath></defs>
    <path d="M-54,-66 C-62,-112 -30,-138 4,-138 C42,-138 68,-112 58,-66 C30,-80 -24,-82 -54,-66Z" fill="${o.turban}"/>
    <g clip-path="url(#${clip})" fill="none" stroke-linecap="round"><path d="M-60,-84 C-20,-104 30,-108 64,-90" stroke="${st}" stroke-width="10"/><path d="M-56,-108 C-16,-126 34,-126 60,-110" stroke="${st2}" stroke-width="8"/><path d="M-30,-136 C0,-140 30,-136 50,-128" stroke="${st}" stroke-width="7"/></g>
    <ellipse cx="40" cy="-128" rx="16" ry="12" fill="${o.turban}"/><path d="M34,-136 C42,-140 52,-134 54,-126" stroke="${st}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    if (o.jewel) m += `<circle cx="2" cy="-100" r="8" fill="#F2C14E"/><circle cx="2" cy="-100" r="3.6" fill="${GEM_R}"/><path d="M2,-108 C-2,-118 6,-124 4,-132" stroke="#F2C14E" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }
  if (o.crown) m += `<path d="M-40,-92 C-44,-108 -46,-122 -46,-136 C-38,-128 -30,-120 -22,-114 C-16,-128 -8,-142 2,-156 C12,-142 20,-128 26,-114 C34,-120 42,-128 50,-136 C50,-122 48,-108 44,-92 Q2,-84 -40,-92Z" fill="#F5C33B"/><path d="M-40,-98 Q2,-90 44,-98 L44,-90 Q2,-82 -40,-90Z" fill="#E0A82A"/><circle cx="2" cy="-112" r="7" fill="${GEM_G}"/><circle cx="-20" cy="-104" r="4.5" fill="${GEM_R}"/><circle cx="24" cy="-104" r="4.5" fill="${GEM_R}"/><circle cx="2" cy="-158" r="5" fill="${GEM_R}"/><circle cx="-46" cy="-138" r="4.5" fill="#F5C33B"/><circle cx="50" cy="-138" r="4.5" fill="#F5C33B"/>`;
  return m;
}
/* Face only, in the classic face frame (centre (0,-31), radius ≈30) — used in the book pictures. */
function face(o = {}) {
  const g = G({ class: 'face', 'data-who': o.who || null }), art = G({ transform: 'scale(.6)' });
  art.innerHTML = headM(o); g.append(art); roundify(art);
  if (o.mood) setMood(g, o.mood === 'worry' ? 'worry' : o.mood); if (o.brows) setBrow(g, o.brows === 'normal' ? '' : o.brows);
  g.parts = { mouth: mouthProxy(g), brows: browProxy(g) }; return g;
}

/* ── people: 3/4 front, kurta / bare chest / drape, dhoti, juttis or sandals ── */
function personM(o) {
  const kid = !!o.kid, by = kid ? .74 : 1, hs = kid ? 1.2 : 1;
  const sk = o.skin || '#E8A577', skD = dkc(sk, .16), bare = !!o.bare;
  const top = o.robe || (bare ? sk : (o.cloth || '#F3E9D2')), topD = dkc(top, .1);
  const dh = o.robe || o.sari || o.lower || '#F5EAD2', dhD = dkc(dh, .14), p = o.plump ? 8 : 0;
  const shoe = o.shoes || (kid ? sk : '#7A4424');
  const drape = o.drape || o.sari;
  const armColL = drape || (bare ? sk : topD), armColR = bare || (drape && !o.sari) ? sk : top;
  // seated: 'chair' (on a throne, swing or horse) or 'cross' (cross-legged on a mat); the upper body sits lower
  const S = (o.seated === 'cross' ? 92 : o.seated === 'chair' ? 46 : 0) * by;
  const foot = (x, ph, c) => o.sandals
    ? `<g transform="translate(${x} 0)"><g class="foot" data-ph="${ph}"><path d="M-20,-3 C-21,-12 -10,-16 4,-15 C16,-14 24,-10 25,-5 C25,-1 20,0 14,0 L-16,0 C-19,0 -20,-1 -20,-3Z" fill="${sk}"/><path d="M-22,0 L26,0 Q27,4 22,5 L-20,5 Q-24,4 -22,0Z" fill="#6E4024"/><path d="M-4,-12 Q2,-4 10,-12" stroke="#6E4024" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>`
    : `<g transform="translate(${x} 0)"><g class="foot" data-ph="${ph}"><path d="M-22,-4 C-24,-15 -12,-20 2,-18 C12,-17 20,-14 24,-9 C28,-13 31,-17 35,-18 C36,-7 28,0 16,0 L-16,0 C-20,0 -22,-2 -22,-4Z" fill="${c}"/></g></g>`;
  const flare = kid ? 13 : 7;
  const arm = (cls, x, col, ph, extra = '', after = '') => `<g transform="translate(${x} -240) rotate(${x < 0 ? flare : -flare})"><g class="aswing" data-ph="${ph}"><g class="pose ${cls}">${extra}
    <circle cx="0" cy="4" r="16" fill="${col}"/>
    <path d="M-15,2 C-17,34 -16,64 -12,90 Q0,96 12,90 C16,64 17,34 15,2 Q0,-10 -15,2Z" fill="${col}"/>
    ${col !== sk ? `<path d="M-13,84 Q0,92 13,84 L13,92 Q0,99 -13,92Z" fill="${dkc(col, .12)}"/>` : ''}
    ${o.armband ? `<path d="M-15,28 Q0,35 15,28" stroke="#F2C14E" stroke-width="6" fill="none" stroke-linecap="round"/>` : ''}
    <circle cx="0" cy="103" r="15" fill="${sk}"/>
    ${o.bangles || o.robe || o.sari ? `<path d="M-12,89 Q0,96 12,89" stroke="#F2C14E" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}${after}
  </g></g></g>`;
  let held = '';
  if (o.staff) held = `<path d="M0,-150 C2,-40 0,100 0,236" stroke="#7A4B2A" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M-1,-70 q7,-3 9,3 M-1,60 q7,-3 9,3" stroke="#5A351C" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
  if (o.spear) held = `<path d="M0,-190 L0,236" stroke="#8A5A2A" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M-11,-186 C-8,-200 -4,-212 0,-226 C4,-212 8,-200 11,-186 Q0,-180 -11,-186Z" fill="#C9CED6"/><path d="M-10,-182 Q0,-176 10,-182" stroke="#F2C14E" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  let carry = '';
  if (o.carry === 'pot') carry = `<path d="M-20,104 C-30,118 -26,140 -10,146 L14,146 C30,140 32,118 22,104 C16,98 -14,98 -20,104Z" fill="#C46A3A"/><path d="M-12,98 Q2,92 16,98" stroke="#A4532A" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M-22,122 Q2,128 26,122" stroke="#F2C14E" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  if (o.carry === 'basket') carry = `<path d="M-30,106 C-28,128 -18,140 2,140 C22,140 32,128 34,106Z" fill="#B88A4A"/><circle cx="-14" cy="104" r="9" fill="#E8492C"/><circle cx="2" cy="100" r="9" fill="#F2B23A"/><circle cx="18" cy="104" r="9" fill="#7DBB3C"/><path d="M-28,116 Q2,122 32,116" stroke="#8E6430" stroke-width="3" fill="none"/>`;
  if (o.carry === 'garland') carry = `<path d="M0,110 C-26,140 -22,186 0,196 C22,186 26,140 0,110" stroke="#F39A1E" stroke-width="12" fill="none" stroke-dasharray="1 10" stroke-linecap="round"/>`;
  if (o.carry === 'scroll') carry = `<rect x="-26" y="96" width="52" height="16" rx="8" fill="#F3E3B8"/><circle cx="-26" cy="104" r="8" fill="#C9A46A"/><circle cx="26" cy="104" r="8" fill="#C9A46A"/>`;
  let lower;
  if (o.seated === 'cross') lower = `<path d="M-60,${-66} C-94,-62 -122,-42 -116,-16 C-112,2 -62,8 0,8 C62,8 112,2 116,-16 C122,-42 94,-62 60,${-66}Z" fill="${dh}"/><path d="M-80,-30 Q-40,-12 0,-22 Q40,-12 80,-30" stroke="${dhD}" stroke-width="4" fill="none" stroke-linecap="round"/><ellipse cx="-58" cy="-4" rx="17" ry="9" fill="${sk}"/><ellipse cx="58" cy="-4" rx="17" ry="9" fill="${sk}"/>`;
  else if (o.seated === 'chair') lower = `<path d="M-52,${-152 + S} C-76,${-128 + S} -88,-78 -82,-56 C-78,-34 -72,-16 -64,-6 Q0,4 64,-6 C72,-16 78,-34 82,-56 C88,-78 76,${-128 + S} 52,${-152 + S}Z" fill="${dh}"/><path d="M-40,-70 Q-20,-58 -4,-66 M6,-66 Q22,-58 42,-70" stroke="${dhD}" stroke-width="4" fill="none" stroke-linecap="round"/>${o.robe ? `<path d="M-64,-8 Q0,2 64,-8" stroke="#F2C14E" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}`;
  else if (o.longLower || o.robe || o.sari) lower = `<path d="M-52,-152 C-62,-100 -66,-40 -60,-12 Q0,-2 60,-12 C66,-40 62,-100 52,-152Z" fill="${dh}"/><path d="M-30,-120 C-34,-80 -34,-40 -30,-16 M26,-120 C30,-80 30,-40 28,-16" stroke="${dhD}" stroke-width="4" fill="none" stroke-linecap="round"/>${o.robe || o.hem || o.sari ? `<path d="M-60,-16 Q0,-6 60,-16" stroke="${o.hem || '#F2C14E'}" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}`;
  else lower = `<path d="M-46,-152 C-62,-110 -60,-50 -46,-18 C-38,-10 -20,-10 -12,-18 C-8,-40 -4,-64 -2,-80 C0,-64 4,-40 8,-18 C16,-10 34,-10 42,-18 C56,-50 62,-110 46,-152Z" fill="${dh}"/><path d="M-30,-120 C-34,-90 -32,-50 -26,-24 M28,-120 C30,-90 30,-60 26,-24" stroke="${dhD}" stroke-width="4" fill="none" stroke-linecap="round"/>${o.hem ? `<path d="M-44,-24 Q-28,-16 -14,-22 M10,-22 Q26,-16 42,-24" stroke="${o.hem}" stroke-width="4" fill="none" stroke-linecap="round"/>` : ''}`;
  let torso = `<path d="M-44,-252 C${-56 - p},-220 ${-62 - p},-160 ${-64 - p},-112 Q0,-98 ${64 + p},-112 C${62 + p},-160 ${56 + p},-220 44,-252 Q0,-262 -44,-252Z" fill="${top}"/>
    <path d="M30,-250 C${44 + p},-220 ${52 + p},-160 ${54 + p},-106 Q${62 + p},-110 ${64 + p},-112 C${62 + p},-160 ${56 + p},-220 44,-252Z" fill="${topD}" opacity=".7"/>`;
  if (bare) torso += `<path d="M-24,-214 Q-12,-206 -2,-212 M8,-212 Q18,-206 30,-214" stroke="${skD}" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>${p ? `<ellipse cx="2" cy="-150" rx="${50 + p}" ry="40" fill="${sk}"/>` : ''}<circle cx="2" cy="-150" r="3" fill="${skD}"/>`;
  else if (o.robe) torso += `<path d="M2,-250 L2,-120" stroke="#F2C14E" stroke-width="5" stroke-linecap="round"/><path d="M-44,-252 Q2,-232 48,-252" stroke="#F2C14E" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  else if (!o.sari) torso += `<path d="M-10,-250 Q2,-232 14,-250" stroke="${topD}" stroke-width="3.5" fill="none" stroke-linecap="round"/>${[0, 1, 2].map(k => `<circle cx="2" cy="${-226 + k * 22}" r="3" fill="#F2C14E"/>`).join('')}`;
  if (o.vest) torso += `<path d="M-44,-252 C${-54 - p},-220 ${-58 - p},-170 ${-56 - p},-140 Q-36,-136 -16,-140 C-14,-180 -12,-220 -9,-250 Q-26,-255 -44,-252Z M44,-252 C${54 + p},-220 ${58 + p},-170 ${56 + p},-140 Q36,-136 16,-140 C14,-180 12,-220 9,-250 Q26,-255 44,-252Z" fill="${o.vest}"/><path d="M-16,-142 C-14,-180 -12,-220 -9,-248 M16,-142 C14,-180 12,-220 9,-248" stroke="${dkc(o.vest, .28)}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (drape) torso += `<path d="M-46,-256 C-26,-264 -6,-258 6,-250 C26,-216 46,-176 ${58 + p},-130 L${62 + p},-112 Q0,-98 ${-64 - p},-112 C${-62 - p},-160 ${-58 - p},-222 -46,-256Z" fill="${drape}"/><path d="M-30,-238 C-10,-200 12,-166 44,-128 M-40,-200 C-24,-170 -6,-146 16,-120" stroke="${dkc(drape, .2)}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".8"/>${o.sari ? `<path d="M6,-250 C26,-216 46,-176 ${58 + p},-130" stroke="#F2C14E" stroke-width="5" fill="none" stroke-linecap="round"/>` : ''}`;
  if (o.waist) torso += `<path d="M${-60 - p},-150 C-20,-140 20,-140 ${60 + p},-150 C${63 + p},-142 ${63 + p},-134 ${62 + p},-127 C20,-117 -20,-117 ${-62 - p},-127 C${-63 - p},-134 ${-63 - p},-142 ${-60 - p},-150Z" fill="${o.waist}"/><path d="M30,-130 C34,-110 30,-92 36,-74 Q42,-72 48,-78 C42,-96 44,-114 44,-132Z" fill="${dkc(o.waist, .1)}"/>`;
  if (o.sash) torso += `<path d="M-40,-250 C-30,-256 -20,-254 -14,-248 C10,-210 34,-170 ${52 + p},-140 C${46 + p},-132 ${40 + p},-130 ${34 + p},-134 C18,-166 -6,-206 -40,-250Z" fill="${o.sash}"/>${o.sashTail ? `<path d="M-8,-130 C-8,-110 -10,-90 -8,-70 Q2,-64 12,-70 C12,-90 10,-110 10,-130Z" fill="${o.sash}"/><path d="M-8,-80 Q2,-74 12,-80" stroke="#C8452C" stroke-width="4" fill="none" stroke-linecap="round"/>` : ''}`;
  if (o.necklace) torso += `<path d="M-20,-250 Q2,-220 24,-250" stroke="#F2C14E" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="2" cy="-230" r="6" fill="#F2C14E"/><circle cx="2" cy="-230" r="2.6" fill="${GEM_R}"/>${o.robe ? `<path d="M-26,-250 Q2,-196 30,-250" stroke="#F2C14E" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="2" cy="-208" r="7" fill="#F2C14E"/><circle cx="2" cy="-208" r="3.4" fill="${GEM_G}"/>` : ''}`;
  if (o.mala) { const pts = []; for (let i = 0; i <= 14; i++) { const t = i / 14, x = -22 + 46 * t, y = -250 + 60 * Math.sin(Math.PI * t) + (t > .5 ? 6 : 0); pts.push(`<circle cx="${n1(x)}" cy="${n1(y)}" r="4.2" fill="#7A3E1E"/>`); } torso += pts.join(''); }
  if (o.bag) torso += `<path d="M36,-252 C10,-210 -22,-172 -48,-144" stroke="#7A4626" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M${-78 - p},-150 C${-80 - p},-120 ${-76 - p},-96 ${-60 - p},-90 L-30,-90 C-16,-98 -14,-124 -18,-150Z" fill="#9A5B32"/><path d="M${-80 - p},-152 L-16,-152 C-18,-130 -32,-124 -48,-124 C-64,-124 ${-76 - p},-132 ${-80 - p},-152Z" fill="#7E4626"/>`;
  const feet = o.seated === 'cross' ? '' : o.seated === 'chair'
    ? `<path d="M-40,-4 C-42,-12 -32,-16 -20,-14 C-10,-13 -4,-9 -4,-4 Q-4,0 -10,0 L-36,0 Q-40,0 -40,-4Z" fill="${dkc(shoe, .1)}"/><path d="M40,-4 C42,-12 32,-16 20,-14 C10,-13 4,-9 4,-4 Q4,0 10,0 L36,0 Q40,0 40,-4Z" fill="${shoe}"/>`
    : `${foot(-16, .5, dkc(shoe, .15))}${foot(16, 0, shoe)}`;
  return `<ellipse cx="0" cy="2" rx="${(o.seated === 'cross' ? 110 : 62) + p}" ry="10" fill="#000" opacity=".16"/>
  ${o.seated ? `<g transform="scale(1 ${by})">${lower}</g>` : ''}
  ${feet}
  <g class="bodyb"><g class="pbody"><g transform="translate(0 ${S})">
    <g transform="scale(1 ${by})">
      ${arm('armL', -44 - p * .6, armColL, 0)}
      ${o.seated ? '' : lower}${torso}
      <path d="M-13,-282 C-12,-266 -14,-254 -16,-246 Q2,-238 18,-246 C16,-254 14,-266 15,-282Z" fill="${skD}"/>
    </g>
    <g transform="translate(4 ${-256 * by})"><g class="pose hp"><g class="face idle" data-who="${o.who || ''}"><g transform="scale(${hs})">${headM({ ...o, kid })}</g></g></g></g>
    <g transform="scale(1 ${by})">${arm('armR', 44 + p * .6, armColR, .5, held, carry)}</g>
  </g></g></g>`;
}
function person(o = {}) {
  const kid = !!o.kid;
  const root = build('char' + (o.staff || o.spear ? ' holder' : ''), kid ? .62 : .64, personM(o));
  const face = root.querySelector('.face');
  if (!o.who) face.removeAttribute('data-who');
  if (o.mood) setMood(root, o.mood); if (o.brows) setBrow(root, o.brows === 'normal' ? '' : o.brows);
  root.parts = { head: root.querySelector('.hp'), armL: root.querySelector('.armL'), armR: root.querySelector('.armR'), mouth: mouthProxy(root), brows: browProxy(root) };
  if (!o.seated) regRig(root, root.art, { stride: kid ? 58 : 72, nominal: kid ? 90 : 110, bob: 4 });
  return root;
}
const KING = { who: 'king', skin: '#D9966A', crown: true, beard: '#2A1A10', mustache: true, longHair: '#2A1A10', hair: '#2A1A10', earring: true, robe: '#C0262E', waist: '#2E8B4E', necklace: true, shoes: '#8A5A2A' };
const SAGE = { who: 'vishnu', skin: '#E8A577', beard: '#F4F0E8', longBeard: true, topknot: '#EFEBE3', hair: '#EFEBE3', browColor: '#CFC8BA', mustacheColor: '#F4F0E8', mustache: true, tilak: true, staff: true, drape: '#EE9A2E', lower: '#F4B740', longLower: true, mala: true, sandals: true };
const PRINCES = [
  { who: 'princes', kid: true, bare: true, skin: '#E3A274', hairStyle: 'kid', hair: '#2A1A10', headband: '#6A3E8E', lower: '#7B4FA6', waist: '#F2B23A', necklace: true, armband: true },
  { who: 'princes', kid: true, bare: true, skin: '#DE9C6C', hairStyle: 'kid', hair: '#24160C', lower: '#2E8A70', waist: '#F2B23A', necklace: true, armband: true },
  { who: 'princes', kid: true, bare: true, plump: true, skin: '#E8A877', hairStyle: 'kid', hair: '#2A1A10', lower: '#E8642B', waist: '#F6D16A', necklace: true, bangles: true }
];
// Vardhamanaka as in v6: bare-chested and plump, saffron sash, red waistband, gold jewellery, big mustache.
const MERCHANT = { who: 'merchant', plump: true, bare: true, skin: '#D9955F', turban: '#E0562A', stripe: '#F6B83E', stripe2: '#B8401C', jewel: true, mustache: 'big', tilak: true, earring: true, necklace: true, sash: '#F0B830', sashTail: true, waist: '#D23A2A', lower: '#F7F2E8', hem: '#F2C14E', armband: true, bangles: true, shoes: '#6B3F1E' };
const SERVANTS = [
  { who: 'servant', skin: '#E3A274', turban: '#2E8A70', stripe: '#9ED08A', stripe2: '#1E6E57', cloth: '#F0E2C2', waist: '#D8892B', lower: '#E9DCC0', shoes: '#6E4024', mustache: true },
  { who: 'servant', skin: '#D9966A', headcloth: '#8C6B4A', cloth: '#E7EFE0', vest: '#3E8A5A', waist: '#C9471F', lower: '#EFE4CC', shoes: '#6E4024' }
];

/* Vardhamanaka seated at the front of the wagon, facing the bulls, reins in hand.
   Origin at his seat; his rein hand rests at about (80,-28). */
function seatedMerchant() {
  const o = MERCHANT, sk = o.skin, skD = dkc(sk, .16), dh = o.lower, p = 8;
  const t = 130; // torso lift: waist sits on the seat
  const m = `
  <path d="M-46,-24 C-30,-38 60,-36 92,-22 C110,-14 108,10 92,14 L-44,16 C-58,6 -58,-14 -46,-24Z" fill="${dh}"/>
  <path d="M70,0 C74,30 78,60 78,84 Q92,90 104,84 C104,60 102,30 100,0Z" fill="${dh}"/><path d="M76,80 Q90,86 104,80" stroke="#F2C14E" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M70,92 C70,82 82,78 96,80 C106,81 114,84 118,88 C122,84 125,80 129,79 C130,90 122,97 110,97 L74,97 C71,97 70,95 70,92Z" fill="${o.shoes}"/>
  <g transform="translate(0 ${t})">
    <g transform="translate(-44 -240)"><g class="pose armL2"><circle cx="0" cy="4" r="16" fill="${sk}"/><path d="M-15,2 C-17,34 -16,64 -12,90 Q0,96 12,90 C16,64 17,34 15,2 Q0,-10 -15,2Z" fill="${sk}"/><path d="M-15,28 Q0,35 15,28" stroke="#F2C14E" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="0" cy="103" r="15" fill="${sk}"/></g></g>
    <path d="M-44,-252 C${-56 - p},-220 ${-62 - p},-160 ${-64 - p},-112 Q0,-98 ${64 + p},-112 C${62 + p},-160 ${56 + p},-220 44,-252 Q0,-262 -44,-252Z" fill="${sk}"/>
    <ellipse cx="2" cy="-150" rx="${50 + p}" ry="40" fill="${sk}"/><circle cx="2" cy="-150" r="3" fill="${skD}"/>
    <path d="M-40,-250 C-30,-256 -20,-254 -14,-248 C10,-210 34,-170 ${52 + p},-140 C${46 + p},-132 ${40 + p},-130 ${34 + p},-134 C18,-166 -6,-206 -40,-250Z" fill="${o.sash}"/>
    <path d="M${-60 - p},-150 C-20,-140 20,-140 ${60 + p},-150 C${63 + p},-142 ${63 + p},-134 ${62 + p},-127 C20,-117 -20,-117 ${-62 - p},-127 C${-63 - p},-134 ${-63 - p},-142 ${-60 - p},-150Z" fill="${o.waist}"/>
    <path d="M-20,-250 Q2,-220 24,-250" stroke="#F2C14E" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="2" cy="-230" r="6" fill="#F2C14E"/><circle cx="2" cy="-230" r="2.6" fill="${GEM_R}"/>
    <path d="M-13,-282 C-12,-266 -14,-254 -16,-246 Q2,-238 18,-246 C16,-254 14,-266 15,-282Z" fill="${skD}"/>
    <g transform="translate(4 -256)"><g class="pose hp"><g class="face idle" data-who="merchant">${headM(o)}</g></g></g>
    <g transform="translate(46 -240)"><g class="pose armS"><circle cx="0" cy="4" r="16" fill="${sk}"/><path d="M-15,2 C-17,34 -16,64 -12,90 Q0,96 12,90 C16,64 17,34 15,2 Q0,-10 -15,2Z" fill="${sk}"/><path d="M-15,28 Q0,35 15,28" stroke="#F2C14E" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="0" cy="103" r="15" fill="${sk}"/><path d="M-12,89 Q0,96 12,89" stroke="#F2C14E" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>
  </g>`;
  const root = build('char', .64, m);
  root.parts = { head: root.querySelector('.hp'), armR: root.querySelector('.armS'), mouth: mouthProxy(root), brows: browProxy(root) };
  return root;
}

/* ── bulls: humped Indian bull, floppy ears, cream horns, belled collar, dark tail tuft ── */
function bullM(o) {
  const b = o.body, bd = dkc(b, .2), bl = ltc(b, .2), hoof = o.hoof || '#34313C', band = o.band || ltc(b, .4), horn = o.horn || '#EFDDB0';
  const leg = (x, ph, col, thigh = 34) => `<g transform="translate(${x} -150)"><g class="leg" data-ph="${ph}"><path d="M${-thigh},-44 C${-thigh - 4},-6 -26,34 -21,72 C-19,96 -18,110 -18,122 Q0,128 18,122 C18,110 19,96 21,72 C26,34 ${thigh + 4},-6 ${thigh},-44 C${thigh * .5},-62 ${-thigh * .5},-62 ${-thigh},-44Z" fill="${col}"/><path d="M-18,112 Q0,118 18,112 L18,126 Q0,131 -18,126Z" fill="${band}"/><path d="M-19,124 Q0,130 19,124 C21,136 21,146 15,150 L-15,150 C-21,146 -21,136 -19,124Z" fill="${hoof}"/></g></g>`;
  const jhool = o.jhool ? `<path d="M-128,-268 C-60,-288 40,-298 112,-296 C120,-262 124,-226 126,-190 Q110,-176 92,-190 Q74,-176 56,-190 Q38,-176 20,-190 Q2,-176 -16,-190 Q-34,-176 -52,-190 Q-70,-176 -88,-190 Q-106,-176 -124,-190 C-130,-216 -132,-244 -128,-268Z" fill="${o.jhool}"/><path d="M-122,-204 L118,-204" stroke="#F2C14E" stroke-width="6" stroke-dasharray="1 14" stroke-linecap="round" fill="none"/><path d="M-120,-256 C-50,-276 40,-284 108,-282" stroke="#F2C14E" stroke-width="4" fill="none" stroke-linecap="round"/>` : '';
  return `<ellipse cx="0" cy="2" rx="190" ry="16" fill="#000" opacity=".18"/>
  <g class="tucked" style="opacity:0"><ellipse cx="-104" cy="-14" rx="58" ry="20" fill="${bd}"/><ellipse cx="114" cy="-12" rx="54" ry="18" fill="${b}"/><ellipse cx="160" cy="-10" rx="16" ry="11" fill="${hoof}"/><ellipse cx="-56" cy="-10" rx="16" ry="11" fill="${hoof}"/></g>
  <g class="rise">
    <g class="legs">${leg(-92, .5, bd)}${leg(108, 0, bd, 30)}</g>
    <g class="bodyb">
      <g transform="translate(-166 -236)"><g class="tl"><path d="M0,0 C-26,30 -30,80 -26,128" stroke="${b}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M-26,120 C-42,140 -40,172 -25,180 C-10,172 -10,140 -26,120Z" fill="${o.tuft || '#2E2A33'}"/></g></g>
      <path d="M-160,-160 C-178,-236 -120,-280 -40,-284 C20,-288 52,-302 102,-306 C152,-306 186,-262 182,-200 C178,-140 150,-112 105,-108 L-110,-108 C-150,-110 -155,-130 -160,-160Z" fill="${b}"/>
      <path d="M-124,-252 C-60,-272 30,-280 104,-288" stroke="${bl}" stroke-width="14" fill="none" stroke-linecap="round" opacity=".55"/>
      <path d="M-122,-150 C-50,-166 70,-166 142,-150 C132,-120 116,-110 100,-108 L-104,-108 C-122,-112 -128,-130 -122,-150Z" fill="${o.belly}"/>
      ${jhool}
    </g>
    <g class="legs">${leg(-128, 0, b, 40)}${leg(74, .5, b)}</g>
    <g class="bodyb">
      <path d="M128,-298 C150,-266 160,-236 162,-200" stroke="${o.collar || '#C8452C'}" stroke-width="15" fill="none" stroke-linecap="round"/>
      <path d="M132,-294 C152,-264 160,-236 162,-204" stroke="${o.bell || '#F2C14E'}" stroke-width="3" fill="none" stroke-dasharray="6 8" stroke-linecap="round"/>
      <path d="M156,-196 C152,-188 152,-180 154,-174 Q164,-168 174,-174 C176,-180 176,-188 172,-196Z" fill="${o.bell || '#F2C14E'}"/><circle cx="164" cy="-170" r="4" fill="${o.bellD || '#9A6A1A'}"/>
      <g transform="translate(150 -222)"><g class="nod"><g class="pose head hp"><g class="pv hidle"><g transform="scale(1.15)">
        <g transform="translate(-6 -16) rotate(-22)"><path d="M0,0 C-30,-16 -64,-8 -74,10 C-52,24 -20,20 0,10Z" fill="${b}"/><path d="M-8,4 C-28,-4 -52,0 -61,9 C-44,16 -22,14 -8,8Z" fill="${o.ear}"/></g>
        <g transform="translate(86 -16) rotate(22) scale(-1 1)"><path d="M0,0 C-30,-16 -64,-8 -74,10 C-52,24 -20,20 0,10Z" fill="${b}"/><path d="M-8,4 C-28,-4 -52,0 -61,9 C-44,16 -22,14 -8,8Z" fill="${o.ear}"/></g>
        <path d="M8,-42 C-2,-62 -6,-88 8,-112 C14,-88 24,-68 34,-50Z" fill="${horn}"/><path d="M72,-42 C82,-62 86,-88 72,-112 C66,-88 56,-68 46,-50Z" fill="${horn}"/>
        <path d="M-10,-20 C-14,-60 18,-74 40,-74 C62,-74 94,-60 90,-20 C88,10 82,30 80,40 L0,40 C-2,30 -8,10 -10,-20Z" fill="${b}"/>
        <path d="M26,-74 C34,-62 46,-62 54,-74Z" fill="${bd}" opacity=".5"/>
        <ellipse cx="40" cy="44" rx="50" ry="36" fill="${o.muzzle}"/>
        <ellipse cx="22" cy="40" rx="7" ry="9" fill="${o.nostril || '#5A4A4A'}"/><ellipse cx="58" cy="40" rx="7" ry="9" fill="${o.nostril || '#5A4A4A'}"/>
        <path d="M22,62 Q40,74 58,62" stroke="${o.nostril || '#5A4A4A'}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        ${eyeM(18, -12, 13, 15, b)}${eyeM(62, -12, 13, 15, b)}
        <path d="M5,-34 Q16,-40 28,-34 M52,-34 Q64,-40 75,-34" stroke="${dkc(b, .45)}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      </g></g></g></g></g>
    </g>
  </g>`;
}
/* 0 = standing, 1 = lying down (legs fold under, body lowers to the ground) */
function setLying(art, k) {
  art.querySelector('.rise').setAttribute('transform', `translate(0 ${n1(104 * k)})`);
  const legOp = Math.max(0, 1 - k * 2.2).toFixed(2);
  art.querySelectorAll('.legs').forEach(l => l.style.opacity = legOp);
  art.querySelector('.tucked').style.opacity = Math.min(1, Math.max(0, (k - .45) * 2.2)).toFixed(2);
}
function bull(o = {}) {
  let c = { ...SANJ, ...o };
  if (o.silhouette) { const k = o.body || '#0C0A14'; c = { body: k, belly: k, muzzle: k, ear: k, horn: k, hoof: k, band: k, tuft: k, collar: k, bell: k, bellD: k, nostril: k }; }
  const root = build('char bullc', .8, bullM(c));
  if (o.silhouette) root.querySelectorAll('[fill]').forEach(e => { if (e.getAttribute('fill') !== 'none') { e.setAttribute('fill', c.body); if (e.getAttribute('stroke') && e.getAttribute('stroke') !== 'none') e.setAttribute('stroke', c.body); } });
  root.parts = { head: root.querySelector('.hp'), mouth: mouthProxy(root), tail: root.querySelector('.tl') };
  root.lie = k => setLying(root.art, k);
  if (o.lying) root.lie(1);
  regRig(root, root.art, { stride: 140, nominal: 100, swing: 12, bob: 3, nod: 2.5 });
  return root;
}
const SANJ = { body: '#6F7A93', belly: '#C3C0BC', muzzle: '#D5CCC4', ear: '#EFA3A0' };
const NANDAKA = { body: '#D7B486', belly: '#F2E3C6', muzzle: '#F3DDC8', ear: '#EFA3A0' };

/* ══════════ Pingalaka, the lion king ══════════
   Golden body, chunky layered mane, small crown, gold collar with a red gem.
   Faces left by default; stands about 320 units tall at scale 1, feet at (0,0). */
function lionHeadM() {
  const g = '#F2A93B', cr = '#F9DCA2', mane = '#8C4A1F', maneL = '#A95C26', maneD = '#6B3416';
  const lobe = (R, r, n, col, off) => { let m = ''; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + off; m += `<circle cx="${n1(34 + Math.cos(a) * R)}" cy="${n1(-34 + Math.sin(a) * R * .95)}" r="${r}" fill="${col}"/>`; } return m; };
  return `${lobe(98, 44, 14, maneD, .1)}${lobe(86, 42, 13, mane, .3)}${lobe(68, 34, 11, maneL, .5)}
    <g class="ears"><g class="ear"><circle cx="-12" cy="-86" r="22" fill="${g}"/><circle cx="-12" cy="-84" r="12" fill="#F6B58A"/></g><g class="ear"><circle cx="82" cy="-86" r="22" fill="${g}"/><circle cx="82" cy="-84" r="12" fill="#F6B58A"/></g></g>
    <circle cx="34" cy="-30" r="62" fill="${g}"/>
    <path d="M-12,-56 C10,-74 58,-74 80,-56" stroke="${ltc(g, .25)}" stroke-width="8" fill="none" opacity=".6" stroke-linecap="round"/>
    <ellipse cx="22" cy="2" rx="26" ry="22" fill="${cr}"/><ellipse cx="48" cy="2" rx="26" ry="22" fill="${cr}"/><ellipse cx="35" cy="20" rx="16" ry="12" fill="${cr}"/>
    <circle cx="16" cy="0" r="2.4" fill="${dkc(cr, .45)}"/><circle cx="24" cy="6" r="2.4" fill="${dkc(cr, .45)}"/><circle cx="46" cy="6" r="2.4" fill="${dkc(cr, .45)}"/><circle cx="54" cy="0" r="2.4" fill="${dkc(cr, .45)}"/>
    <path d="M20,-22 Q35,-30 50,-22 Q48,-8 35,-4 Q22,-8 20,-22Z" fill="#6B3A1F"/><ellipse cx="30" cy="-21" rx="5" ry="2.5" fill="#A0603A"/>
    <path class="mS" d="M18,12 Q35,34 52,12 Q35,20 18,12Z" fill="#7A2A1E"/>
    <ellipse class="mO" cx="35" cy="20" rx="9" ry="11" fill="#7A2A1E"/>
    <path class="mWorry" d="M20,20 Q35,10 50,20" stroke="#6B3A1F" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${eyeM(10, -42, 13, 16, g)}${eyeM(60, -42, 13, 16, g)}
    <path class="bN" d="M-2,-66 Q10,-73 22,-66 M48,-66 Q60,-73 72,-66" stroke="#6B3A1F" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path class="bW" d="M-2,-64 Q10,-68 20,-74 M50,-74 Q60,-68 72,-64" stroke="#6B3A1F" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M-10,54 C10,70 60,70 80,54" stroke="#F2C14E" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M35,64 C26,64 22,72 22,78 C22,86 28,92 35,92 C42,92 48,86 48,78 C48,72 44,64 35,64Z" fill="#F2C14E"/><circle cx="35" cy="78" r="8" fill="#D6302A"/><circle cx="32" cy="75" r="2.6" fill="#FFB0A0"/>
    <g class="crown"><path d="M0,-112 C-2,-126 -4,-140 -4,-150 C2,-144 8,-138 14,-132 C17,-142 20,-154 22,-164 C27,-154 31,-144 35,-136 C39,-144 43,-154 48,-164 C50,-154 53,-142 56,-132 C62,-138 68,-144 74,-150 C74,-140 72,-126 70,-112Z" fill="#F5C33B"/><path d="M0,-118 Q35,-112 70,-118 L70,-108 Q35,-102 0,-108Z" fill="#E0A82A"/>
      <circle cx="-4" cy="-152" r="5" fill="#F5C33B"/><circle cx="22" cy="-166" r="5" fill="#F5C33B"/><circle cx="48" cy="-166" r="5" fill="#F5C33B"/><circle cx="74" cy="-152" r="5" fill="#F5C33B"/>
      <circle cx="35" cy="-126" r="7" fill="#D6302A"/><circle cx="14" cy="-122" r="4" fill="#D6302A"/><circle cx="56" cy="-122" r="4" fill="#D6302A"/></g>`;
}
function lionM() {
  const g = '#F2A93B', gd = dkc(g, .14), cr = '#F9DCA2', mane = '#8C4A1F';
  const leg = (x, col, thigh = 36, cls = '') => `<g transform="translate(${x} -150)"><g class="${cls}"><path d="M${-thigh},-46 C${-thigh - 4},-6 -30,34 -25,72 C-24,92 -23,106 -22,116 Q0,122 22,116 C23,106 24,92 25,72 C30,34 ${thigh + 4},-6 ${thigh},-46 C${thigh * .5},-64 ${-thigh * .5},-64 ${-thigh},-46Z" fill="${col}"/><ellipse cx="4" cy="134" rx="32" ry="17" fill="${cr}"/><path d="M-8,126 Q-9,133 -8,140 M6,126 Q5,134 6,141 M20,127 Q20,133 19,140" stroke="${dkc(cr, .3)}" stroke-width="3" stroke-linecap="round" fill="none"/></g></g>`;
  return `<ellipse cx="0" cy="2" rx="190" ry="16" fill="#000" opacity=".18"/>
  ${leg(-96, gd)}${leg(96, gd, 30)}
  <g transform="translate(-146 -196)"><g class="tl"><path d="M0,0 C-54,-14 -76,-84 -46,-150" stroke="${g}" stroke-width="15" fill="none" stroke-linecap="round"/><path d="M-46,-146 C-74,-160 -70,-206 -40,-214 C-30,-196 -22,-166 -46,-146Z" fill="${mane}"/></g></g>
  <g class="bodyb">
    <path d="M-152,-170 C-166,-240 -92,-266 0,-262 C80,-258 140,-246 150,-196 C158,-146 136,-112 100,-110 L-112,-110 C-152,-112 -148,-140 -152,-170Z" fill="${g}"/>
    <path d="M-120,-150 C-40,-162 60,-162 128,-150 C126,-124 112,-112 98,-110 L-104,-110 C-120,-114 -124,-130 -120,-150Z" fill="${cr}"/>
    <path d="M-126,-238 C-60,-258 40,-258 120,-240" stroke="${ltc(g, .25)}" stroke-width="12" fill="none" stroke-linecap="round" opacity=".5"/>
  </g>
  ${leg(-126, g, 46)}
  ${leg(70, g, 36, 'pv paw')}
  <g transform="translate(118 -238)"><g class="pose head hp" data-who="pingalaka"><g class="pv hidle">${lionHeadM()}</g></g></g>`;
}
function lion() {
  const root = build('char lion', .8, lionM(), { flip: true });
  root.parts = { head: root.querySelector('.hp'), ears: root.querySelector('.ears'), tail: root.querySelector('.tl'), arm: root.querySelector('.paw'), mouth: mouthProxy(root), brows: browProxy(root) };
  return root;
}
// Just the head, centred on (0,0) — for thought bubbles and book pictures.
function lionHead() {
  const g = G({ class: 'lion' }), art = G({ transform: 'translate(22 20) scale(-.64 .64)', 'data-who': 'pingalaka' });
  art.innerHTML = lionHeadM(); roundify(art); g.append(art);
  g.parts = { ears: art.querySelector('.ears'), mouth: mouthProxy(g), brows: browProxy(g) }; return g;
}
// Calm: smiling, paw lifted now and then. Scared / worried: brows up, mouth changes, paw stays down.
function lionMood(l, m) {
  l.classList.remove('lm-scared', 'lm-worried'); if (m && m !== 'calm') l.classList.add('lm-' + m);
  if (l.parts && l.parts.arm) l.parts.arm.classList.toggle('still', m !== 'calm');
}

/* ── jackals: Damanaka the rust fox, Karataka the grey elder with a shawl ── */
function jackalM(o) {
  const f = o.fur, fd = o.furD || dkc(f, .14), cr = o.cream, sock = o.sock || dkc(f, .55);
  const leg = (x, ph, col) => `<g transform="translate(${x} -100)"><g class="leg" data-ph="${ph}"><path d="M-16,-26 C-18,4 -12,40 -10,70 C-9,80 -8,88 -8,92 Q0,96 8,92 C8,88 9,80 10,70 C12,40 18,4 16,-26 C8,-36 -8,-36 -16,-26Z" fill="${col}"/><path d="M-10,56 Q0,52 10,56 L8,92 Q0,96 -8,92Z" fill="${sock}"/><ellipse cx="3" cy="96" rx="13" ry="7" fill="${sock}"/></g></g>`;
  const shawl = o.shawl ? `<path d="M30,-180 C50,-184 76,-172 90,-150 C96,-136 92,-122 84,-114 C70,-128 50,-140 26,-146 C14,-150 12,-170 30,-180Z" fill="${o.shawl}"/><path d="M58,-136 C62,-118 60,-100 52,-86 Q60,-82 68,-88 C72,-102 72,-120 68,-134Z" fill="${dkc(o.shawl, .12)}"/><path d="M36,-170 C54,-166 72,-156 84,-138" stroke="#F2C14E" stroke-width="3" fill="none" stroke-dasharray="2 7" stroke-linecap="round"/>` : '';
  const brows = o.frown
    ? `<path class="bN" d="M-2,-84 L20,-78 M34,-78 L56,-86" stroke="${dkc(f, .6)}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : `<path class="bN" d="M-2,-80 Q10,-86 20,-80 M34,-82 Q46,-90 56,-82" stroke="${dkc(f, .6)}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  return `<ellipse cx="0" cy="2" rx="96" ry="10" fill="#000" opacity=".18"/>
  ${leg(-50, .5, fd)}${leg(52, 0, fd)}
  <g transform="translate(-70 -128)"><g class="tl"><path d="M0,0 C-40,14 -96,-6 -108,-58 C-112,-94 -84,-118 -60,-106 C-74,-74 -52,-32 4,-20Z" fill="${f}"/><path d="M-108,-58 C-112,-94 -84,-118 -60,-106 C-66,-92 -70,-80 -72,-66 C-84,-58 -98,-54 -108,-58Z" fill="${cr}"/></g></g>
  <g class="bodyb">
    <path d="M-84,-140 C-92,-172 -40,-180 10,-176 C52,-172 84,-160 88,-130 C92,-104 72,-96 52,-96 L-62,-96 C-82,-98 -86,-116 -84,-140Z" fill="${f}"/>
    <path d="M-60,-112 C-20,-120 30,-120 66,-110 C62,-100 56,-96 52,-96 L-56,-96 C-60,-100 -62,-106 -60,-112Z" fill="${cr}"/>
    <path d="M46,-170 C80,-160 92,-120 72,-100 C60,-120 50,-140 38,-164Z" fill="${cr}"/>
  </g>
  ${leg(-70, 0, f)}${leg(34, .5, f)}
  <g class="bodyb">${shawl}
  <g transform="translate(58 -168)"><g class="nod"><g class="pose head hp" data-who="${o.who || ''}"><g class="pv hidle">
    <g class="ear"><path d="M-22,-74 C-28,-96 -32,-120 -29,-138 C-14,-124 0,-108 12,-92Z" fill="${f}"/><path d="M-17,-82 C-21,-98 -23,-112 -22,-124 C-12,-114 -4,-104 2,-94Z" fill="${cr}"/><path d="M-29,-138 C-30,-128 -28,-118 -26,-112 C-22,-116 -18,-120 -16,-122Z" fill="${sock}"/>
    <path d="M26,-94 C34,-114 44,-134 52,-150 C60,-130 64,-110 64,-88Z" fill="${f}"/><path d="M32,-94 C38,-108 44,-122 50,-134 C55,-120 57,-106 58,-92Z" fill="${cr}"/><path d="M52,-150 C49,-140 48,-130 48,-124 C52,-125 55,-127 58,-128Z" fill="${sock}"/></g>
    <path d="M-34,-40 C-36,-82 -2,-102 24,-102 C54,-102 78,-84 76,-52 C92,-44 108,-36 112,-28 C104,-12 72,-8 50,-10 C18,-6 -28,-12 -34,-40Z" fill="${f}"/>
    <path d="M6,-30 C30,-42 74,-42 112,-28 C104,-12 72,-6 48,-8 C28,-6 12,-14 6,-30Z" fill="${cr}"/>
    <path d="M-34,-40 C-30,-20 -10,-12 6,-14 C0,-24 -14,-30 -34,-40Z" fill="${cr}"/>
    <ellipse cx="111" cy="-31" rx="8" ry="6.5" fill="#2A1A14"/>
    <path class="mS" d="M60,-18 Q74,-8 88,-20" stroke="#5A2A14" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path class="mFlat" d="M62,-15 Q74,-14 86,-16" stroke="#5A2A14" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path class="mSad" d="M62,-12 Q74,-20 86,-12" stroke="#5A2A14" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path class="mWorry" d="M62,-13 q6,-4 12,0 q6,4 12,0" stroke="#5A2A14" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <ellipse class="mO" cx="74" cy="-14" rx="6" ry="7" fill="#5A1E1E"/>
    ${eyeM(10, -60, 11, 14, f, { dx: 4 })}${eyeM(44, -62, 11, 14, f, { dx: 4 })}
    ${brows}
  </g></g></g></g></g>`;
}
function jackal(o = {}) {
  const root = build('char', .68, jackalM(o));
  if (o.frown) setMood(root, 'flat');
  root.parts = { head: root.querySelector('.hp'), tail: root.querySelector('.tl'), mouth: mouthProxy(root, 'smile'), brow: browProxy(root) };
  regRig(root, root.art, { stride: 90, nominal: 120, swing: 16, bob: 4, nod: 3 });
  return root;
}
const KARATAKA = { who: 'karataka', fur: '#8E919C', furD: '#767985', cream: '#E9E5DA', sock: '#4E505A', shawl: '#A8322E', frown: true };
const DAMANAKA = { who: 'damanaka', fur: '#D9692B', furD: '#BB5A24', cream: '#F8E3C0', sock: '#6B3A1F', grin: true };

/* ── the monkey who pulled the wedge ── */
function monkey() {
  const f = '#8C5A33', fd = dkc(f, .15), l = '#EBC49A';
  const m = `<ellipse cx="0" cy="2" rx="46" ry="8" fill="#000" opacity=".18"/>
  <path d="M-22,-46 C-68,-42 -86,-92 -60,-108 C-42,-118 -30,-98 -42,-88" stroke="${f}" stroke-width="10" fill="none" stroke-linecap="round"/>
  <ellipse cx="-20" cy="-24" rx="20" ry="24" fill="${fd}"/><ellipse cx="20" cy="-24" rx="20" ry="24" fill="${f}"/>
  <ellipse cx="-24" cy="-5" rx="17" ry="8" fill="${l}"/><ellipse cx="24" cy="-5" rx="17" ry="8" fill="${l}"/>
  <path d="M-24,-94 C-42,-78 -46,-56 -38,-46 C-32,-40 -24,-44 -26,-54 C-28,-66 -22,-80 -14,-90Z" fill="${fd}"/><circle cx="-36" cy="-44" r="9" fill="${l}"/>
  <path d="M-32,-40 C-38,-82 -26,-108 0,-110 C26,-108 38,-82 32,-40 C22,-22 -22,-22 -32,-40Z" fill="${f}"/>
  <ellipse cx="2" cy="-62" rx="19" ry="27" fill="${l}"/>
  <g transform="translate(0 -104)"><g class="pose head hp"><g class="pv hidle">
    <circle cx="-36" cy="-28" r="14" fill="${f}"/><circle cx="-36" cy="-28" r="8" fill="${l}"/><circle cx="38" cy="-28" r="14" fill="${f}"/><circle cx="38" cy="-28" r="8" fill="${l}"/>
    <circle cx="1" cy="-30" r="34" fill="${f}"/>
    <path d="M1,-44 C-9,-62 -31,-52 -25,-30 C-23,-8 -11,4 1,4 C13,4 25,-8 27,-30 C33,-52 11,-62 1,-44Z" fill="${l}"/>
    ${eyeM(-10, -36, 6.5, 7.5, l)}${eyeM(12, -36, 6.5, 7.5, l)}
    <circle cx="-2" cy="-20" r="2" fill="${fd}"/><circle cx="5" cy="-20" r="2" fill="${fd}"/>
    <path class="mS" d="M-8,-10 Q1,-1 10,-10 Q1,-6 -8,-10Z" fill="#7A2A1E"/>
    <ellipse class="mO" cx="1" cy="-8" rx="6" ry="7" fill="#7A2A1E"/>
  </g></g></g>
  <g transform="translate(22 -90)"><g class="pose arm"><circle cx="0" cy="0" r="11" fill="${f}"/><path d="M-9,-4 C-2,14 14,30 32,38 C38,34 40,28 36,24 C22,16 10,2 9,-8Z" fill="${f}"/><circle cx="38" cy="32" r="9" fill="${l}"/></g></g>`;
  const root = build('char', 1, m);
  root.parts = { head: root.querySelector('.hp'), arm: root.querySelector('.arm'), mouth: mouthProxy(root, 'o') };
  return root;
}
/* ── ministers and forest friends ── */
function deer() {
  const f = '#C99A62', fd = dkc(f, .14), cr = '#F5E6C8', hoof = '#4A3528';
  const leg = (x, col) => `<path d="M${x - 12},-112 C${x - 13},-74 ${x - 7},-36 ${x - 6},-8 Q${x},-4 ${x + 6},-8 C${x + 7},-36 ${x + 13},-74 ${x + 12},-112 C${x + 6},-120 ${x - 6},-120 ${x - 12},-112Z" fill="${col}"/><path d="M${x - 7},-10 Q${x},-6 ${x + 7},-10 L${x + 7},-1 Q${x},2 ${x - 7},-1Z" fill="${hoof}"/>`;
  const m = `<ellipse cx="0" cy="2" rx="70" ry="8" fill="#000" opacity=".18"/>
  ${leg(-30, fd)}${leg(34, fd)}
  <path d="M-56,-120 C-72,-128 -78,-112 -66,-104 C-62,-108 -60,-112 -56,-120Z" fill="#FFFFFF"/>
  <path d="M-62,-110 C-66,-138 -30,-146 10,-142 C44,-140 66,-130 64,-104 C62,-82 40,-74 10,-76 L-40,-78 C-58,-80 -60,-94 -62,-110Z" fill="${f}"/>
  <path d="M-46,-84 C-10,-90 30,-90 52,-86 C44,-78 30,-74 10,-76 L-40,-78 C-44,-80 -46,-82 -46,-84Z" fill="${cr}"/>
  ${[[-30, -124, 5], [-12, -130, 4.5], [8, -126, 5], [-20, -112, 4], [24, -120, 4]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${cr}"/>`).join('')}
  ${leg(-44, f)}${leg(48, f)}
  <path d="M30,-132 C38,-158 48,-178 58,-196 C64,-200 76,-198 80,-190 C74,-170 66,-146 62,-118Z" fill="${f}"/>
  <g transform="translate(70 -192)"><g class="pose head hp"><g class="pv hidle">
    <path d="M-6,-14 C-10,-30 -16,-42 -12,-58 M-11,-34 C-20,-38 -26,-44 -28,-52 M8,-16 C12,-32 18,-42 16,-58 M14,-34 C24,-36 30,-42 32,-50" stroke="#8A6A48" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M-6,-8 C-26,-20 -36,-10 -32,-2 C-24,2 -14,0 -6,-2Z" fill="${f}"/><path d="M-10,-6 C-22,-12 -28,-8 -26,-4 C-20,-2 -14,-3 -10,-4Z" fill="#E8A098"/>
    <path d="M-14,-10 C-6,-26 22,-24 36,-8 C46,2 42,14 30,14 C14,16 -10,10 -14,-10Z" fill="${f}"/>
    <ellipse cx="34" cy="4" rx="11" ry="8" fill="${cr}"/><ellipse cx="42" cy="1" rx="4.5" ry="3.6" fill="#2A1A14"/>
    ${eyeM(12, -6, 6, 7, f)}
    <path class="mS" d="M28,10 Q34,14 40,9" stroke="#5A2A14" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g></g></g>`;
  const root = build('char', 1, m);
  root.parts = { head: root.querySelector('.hp'), mouth: mouthProxy(root) };
  return root;
}
function bear() {
  const f = '#7A5034', l = '#C49A6C', fd = dkc(f, .12);
  const m = `<ellipse cx="0" cy="2" rx="66" ry="9" fill="#000" opacity=".18"/>
  <path d="M-56,-30 C-66,-92 -46,-142 0,-144 C46,-142 66,-92 56,-30 C42,-4 -42,-4 -56,-30Z" fill="${f}"/>
  <ellipse cx="0" cy="-64" rx="32" ry="40" fill="${l}"/>
  <ellipse cx="-34" cy="-12" rx="25" ry="14" fill="${fd}"/><ellipse cx="34" cy="-12" rx="25" ry="14" fill="${fd}"/>
  <ellipse cx="-36" cy="-12" rx="12" ry="7" fill="${l}"/><ellipse cx="36" cy="-12" rx="12" ry="7" fill="${l}"/>
  <path d="M-46,-120 C-64,-98 -60,-70 -40,-62 C-30,-60 -26,-70 -32,-80 C-38,-92 -36,-106 -30,-120Z" fill="${f}"/>
  <path d="M46,-120 C64,-98 60,-70 40,-62 C30,-60 26,-70 32,-80 C38,-92 36,-106 30,-120Z" fill="${f}"/>
  <g transform="translate(0 -136)"><g class="pose head hp"><g class="pv hidle">
    <circle cx="-34" cy="-46" r="16" fill="${f}"/><circle cx="-34" cy="-46" r="8" fill="${l}"/><circle cx="34" cy="-46" r="16" fill="${f}"/><circle cx="34" cy="-46" r="8" fill="${l}"/>
    <circle cx="0" cy="-14" r="44" fill="${f}"/>
    <ellipse cx="0" cy="6" rx="20" ry="15" fill="${l}"/><ellipse cx="0" cy="-2" rx="8" ry="6" fill="#2A1A10"/>
    <path class="mS" d="M-8,10 Q0,18 8,10" stroke="#2A1A10" stroke-width="3" fill="none" stroke-linecap="round"/>
    ${eyeM(-16, -22, 6.5, 7.5, f)}${eyeM(16, -22, 6.5, 7.5, f)}
  </g></g></g>`;
  const root = build('char', 1, m);
  root.parts = { head: root.querySelector('.hp'), mouth: mouthProxy(root) };
  return root;
}
function rabbit() {
  const f = '#EFEAE0', fd = dkc(f, .08), pk = '#F2A8A0';
  const m = `<ellipse cx="0" cy="2" rx="44" ry="7" fill="#000" opacity=".16"/>
  <circle cx="-36" cy="-26" r="10" fill="#FFFFFF"/>
  <ellipse cx="-14" cy="-26" rx="30" ry="26" fill="${f}"/>
  <path d="M-30,-12 C-36,-44 -10,-62 12,-60 C30,-58 34,-36 28,-12 Q0,-2 -30,-12Z" fill="${f}"/>
  <ellipse cx="-8" cy="-4" rx="18" ry="6" fill="${fd}"/><ellipse cx="20" cy="-6" rx="10" ry="6" fill="${f}"/>
  <g transform="translate(16 -58)"><g class="pose head hp"><g class="pv hidle">
    <path d="M-2,-18 C-10,-54 0,-74 9,-70 C16,-64 13,-40 8,-20Z" fill="${f}"/><path d="M1,-26 C-4,-50 2,-64 7,-62 C11,-56 9,-40 6,-28Z" fill="${pk}"/>
    <path d="M10,-20 C14,-56 30,-70 36,-64 C40,-56 30,-36 20,-18Z" fill="${fd}"/>
    <circle cx="10" cy="-8" r="20" fill="${f}"/>
    ${eyeM(16, -12, 4.5, 5.5, f)}
    <circle cx="29" cy="-5" r="3" fill="${pk}"/><path d="M24,2 Q27,5 30,2" stroke="#8A5A50" stroke-width="2" fill="none" stroke-linecap="round"/>
  </g></g></g>`;
  const root = build('char', 1, m);
  root.parts = { head: root.querySelector('.hp') };
  return root;
}
