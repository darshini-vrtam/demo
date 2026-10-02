/* ══════════ Jungle dressing · Pingalaka Panic Run · the hiding scene ══════════ */

// Far layer: misty tree line and soft hills, drawn right after the sky.
function jungleFar(r, o = {}) {
  const night = !!o.night, c1 = night ? '#22382C' : (o.c1 || '#8DBE86'), c2 = night ? '#1C3026' : (o.c2 || '#74AA70');
  let d = 'M-600,1200 L-600,560';
  for (let x = -600; x <= 2200; x += 60) d += ` Q${x + 30},${n1(500 - 40 * Math.abs(Math.sin(x * .013)) - 30 * Math.abs(Math.sin(x * .031)))} ${x + 60},${n1(560 - 10 * Math.sin(x * .02))}`;
  d += ' L2200,1200Z';
  let d2 = 'M-600,1200 L-600,610';
  for (let x = -600; x <= 2200; x += 80) d2 += ` Q${x + 40},${n1(540 - 50 * Math.abs(Math.sin(x * .009 + 1)))} ${x + 80},${n1(610 - 12 * Math.cos(x * .017))}`;
  d2 += ' L2200,1200Z';
  addArt(r, `<path d="${d}" fill="${c1}" opacity=".7"/><path d="${d2}" fill="${c2}" opacity=".85"/>`, .12, 0, 0, 1, { shade: false, round: false });
}
// Near layer: hanging vines, big leaves in the corners, mossy rocks, mushrooms, flowers and butterflies.
function jungleNear(r, o = {}) {
  const night = !!o.night, lf = night ? '#1E3A2A' : '#3E9A3E', lf2 = night ? '#264634' : '#5EB04A', lfD = night ? '#14261C' : '#2E7A30';
  const vine = (x, len, k) => `<g class="hang" style="animation-duration:${4 + k}s;animation-delay:${-k}s"><path d="M${x},-60 C${x + 20},${len * .3} ${x - 24},${len * .6} ${x + 6},${len}" stroke="${lfD}" stroke-width="7" fill="none" stroke-linecap="round"/>
    ${Array.from({ length: Math.floor(len / 60) }, (_, i) => { const y = 10 + i * 60, xx = x + 14 * Math.sin(i * 1.7), s = i % 2 ? 1 : -1; return `<path d="M${n1(xx)},${y} C${n1(xx + s * 26)},${y - 18} ${n1(xx + s * 40)},${y} ${n1(xx + s * 34)},${y + 14} C${n1(xx + s * 20)},${y + 16} ${n1(xx + s * 8)},${y + 8} ${n1(xx)},${y}Z" fill="${i % 3 ? lf2 : lf}"/>`; }).join('')}</g>`;
  addArt(r, vine(40, 330, 0) + vine(190, 220, 1.2) + vine(1420, 260, .6) + vine(1570, 360, 1.8), 1.25, 0, 0, 1, { shade: false });
  const leaf = (x, y, a, s, c) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M0,0 C-40,-40 -50,-130 0,-200 C50,-130 40,-40 0,0Z" fill="${c}"/><path d="M0,-6 L0,-190" stroke="${lfD}" stroke-width="5" stroke-linecap="round"/>${[-150, -110, -70, -30].map(yy => `<path d="M0,${yy} L-24,${yy - 22} M0,${yy} L24,${yy - 22}" stroke="${lfD}" stroke-width="3" stroke-linecap="round" opacity=".6"/>`).join('')}</g>`;
  addArt(r, `<g class="hang" style="animation-duration:5s">${leaf(-30, 960, 40, 1.2, lf)}${leaf(10, 960, 12, 1.1, lf2)}${leaf(70, 970, -14, .9, lf)}</g><g class="hang" style="animation-duration:5.6s;animation-delay:-2s">${leaf(1630, 960, -40, 1.2, lf)}${leaf(1590, 960, -12, 1.1, lf2)}${leaf(1530, 970, 16, .9, lf)}</g>`, 1.35, 0, 0, 1, { shade: false });
  if (o.ground === false) return;
  const rock = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="2" rx="70" ry="10" fill="#000" opacity=".15"/><path d="M-66,0 C-70,-40 -40,-66 0,-66 C44,-66 70,-40 66,0Z" fill="${night ? '#4A5048' : '#9AA096'}"/><path d="M-40,-50 C-20,-66 30,-66 50,-44 C30,-54 -10,-56 -40,-50Z" fill="${night ? '#2E4A30' : '#5EA84A'}"/><path d="M-30,-20 Q-10,-14 6,-22" stroke="${night ? '#3A403A' : '#7E847A'}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
  const shroom = (x, y, s, c) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-6" y="-26" width="12" height="26" rx="5" fill="#F7EEDC"/><path d="M-22,-24 C-22,-44 22,-44 22,-24Z" fill="${c}"/><circle cx="-8" cy="-32" r="3.5" fill="#FFF"/><circle cx="7" cy="-35" r="3" fill="#FFF"/></g>`;
  const flowers = (x, y) => [0, 1, 2, 3].map(i => { const fx = x + i * 22 - 30, fy = y - 18 - (i % 2) * 12, c = ['#F25C78', '#F7C23A', '#FFFFFF', '#C04CC8'][i]; return `<path d="M${fx},${y} L${fx},${fy}" stroke="${lfD}" stroke-width="3"/>${[0, 1, 2, 3, 4].map(k => `<circle cx="${n1(fx + Math.cos(k * 1.2566) * 5)}" cy="${n1(fy + Math.sin(k * 1.2566) * 5)}" r="4.5" fill="${c}"/>`).join('')}<circle cx="${fx}" cy="${fy}" r="3" fill="#E9A23B"/>`; }).join('');
  addArt(r, rock(150, 820, .8) + rock(1470, 830, .95) + shroom(250, 830, 1, '#E8492C') + shroom(275, 836, .7, '#F06A1C') + shroom(1360, 840, .9, '#E8492C') + (night ? '' : flowers(380, 846) + flowers(1220, 850) + flowers(80, 870)), .95, 0, 0, 1, { shade: false });
  if (!night) {
    const bf = mk([[260, 420, '#F7A21B'], [1300, 380, '#8E5BD6'], [980, 300, '#2E9EE8']].map(([x, y, c], i) => `<g class="floaty" style="animation-duration:${3 + i}s"><g transform="translate(${x} ${y})"><g class="flap2" style="animation-duration:.3s"><path d="M0,0 C-20,-24 -34,-10 -24,4 C-16,12 -6,8 0,0Z M0,0 C20,-24 34,-10 24,4 C16,12 6,8 0,0Z" fill="${c}"/></g><ellipse cx="0" cy="2" rx="3" ry="9" fill="#3B2414"/></g></g>`).join(''));
    bf.setAttribute('pointer-events', 'none'); r.append(pwrap(bf, 1.1));
  }
}
const isNightSky = st => !!st && HEX.test(st[0][1]) && lum(st[0][1]) < .3;

/* ══════════ Game 2: Pingalaka Panic Run — a side-scrolling runner ══════════ */
function waveD(y, amp, per, x0, x1, ph = 0) { let d = `M${x0},1200 L${x0},${y}`; for (let x = x0; x <= x1; x += 25) d += ` L${x},${n1(y - amp * Math.sin(2 * Math.PI * x / per + ph))}`; return d + ` L${x1},1200Z`; }
const OBST = {
  rock: { w: 96, h: 64, m: () => `<ellipse cx="0" cy="2" rx="56" ry="9" fill="#000" opacity=".2"/><path d="M-50,0 C-54,-36 -30,-64 4,-64 C38,-62 54,-34 50,0Z" fill="#9AA096"/><path d="M-26,-50 C-10,-62 20,-62 36,-44 C20,-52 -4,-54 -26,-50Z" fill="#C8CCC2"/><path d="M-20,-18 Q-4,-12 10,-20" stroke="#7E847A" stroke-width="4" fill="none" stroke-linecap="round"/>` },
  log: { w: 170, h: 58, m: () => `<ellipse cx="0" cy="2" rx="90" ry="10" fill="#000" opacity=".2"/><rect x="-84" y="-58" width="168" height="58" rx="29" fill="#8A5A2A"/><path d="M-70,-40 L60,-40 M-60,-18 L70,-18" stroke="#6E4420" stroke-width="4" stroke-linecap="round"/><ellipse cx="72" cy="-29" rx="22" ry="29" fill="#D9A66A"/><ellipse cx="72" cy="-29" rx="12" ry="17" fill="none" stroke="#B07A40" stroke-width="3"/><path d="M-30,-58 C-34,-74 -24,-82 -16,-78" stroke="#4FA83A" stroke-width="6" fill="none" stroke-linecap="round"/>` },
  stump: { w: 80, h: 92, m: () => `<ellipse cx="0" cy="2" rx="50" ry="9" fill="#000" opacity=".2"/><path d="M-36,0 C-34,-30 -32,-60 -32,-84 L32,-84 C32,-60 34,-30 36,0Z" fill="#7A4B2A"/><ellipse cx="0" cy="-84" rx="32" ry="10" fill="#D9A66A"/><path d="M-16,-60 L-14,-10 M12,-70 L14,-20" stroke="#5A3418" stroke-width="4" stroke-linecap="round"/>` }
};
async function panicRun() {
  const r = await cut('#9FD0A0');
  sky(r, [[0, '#9ED8F2'], [.55, '#DFF0C8'], [1, '#BFD99A']], { clouds: false });
  sun(r, 1300, 140, 56);
  const layer = sp => { const g = G({}); g.sp = sp; r.append(g); return g; };
  const far = layer(.12), mid = layer(.35), near = layer(.7), ground = layer(1);
  far.append(mk(`<path d="${waveD(560, 40, 800, 0, 3200)}" fill="#9CC88A"/><path d="${waveD(600, 26, 533.33, 0, 3200, 1)}" fill="#86BA74"/>`));
  for (const k of [0, 1]) {
    const ox = k * 1600;
    [[120, 640, .6], [520, 630, .55], [880, 640, .65], [1260, 630, .6]].forEach(([x, y, s]) => mid.append(tree(ox + x, y, s, { leaf: '#6EA860', hi: '#8EC878' })));
    [[300, 720, 1.2], [1100, 730, 1.35]].forEach(([x, y, s]) => near.append(tree(ox + x, y, s, { leaf: '#3E8F3A', hi: '#6FBF4A', trunk: '#8A5A34' })));
    [[700, 740, 1.1], [1450, 745, 1]].forEach(([x, y, s]) => near.append(bush(ox + x, y, s, '#4F8F3A', '#74B050')));
  }
  ground.append(mk(`<path d="M0,760 L3200,760 L3200,1200 L0,1200Z" fill="#8CC25A"/><path d="M0,800 L3200,800 L3200,860 L0,860Z" fill="#C9A45E" opacity=".55"/>`));
  for (const k of [0, 1]) tufts(ground, 34, k * 1600, k * 1600 + 1600, 770, 900, '#5EA23E', 517);
  const obsL = G({}); r.append(obsL);
  const LX = 380, GY = 772;
  const pg = actor(lion(), LX, GY, .56, { fx: -1 }); r.append(pg);
  pg.inner.classList.add('moving'); lionMood(pg.inner, 'worried');
  const treeL = G({}); r.append(treeL);
  const fg = layer(1.3);
  for (const k of [0, 1]) [[200, 960], [1000, 975]].forEach(([x, y]) => fg.append(bush(k * 1600 + x, y, 1.5, '#3F7A30', '#5E9A44')));
  const hud = $('#munchhud'); hud.hidden = false; cleanups.push(() => { hud.hidden = true; });
  const D = 11500, NOBS = 11; let dist = 0, speed = 0, target = 360, spawned = 0, jy = 0, vy = 0, air = false, jumps = 0, bumps = 0, mooed = false, nextAt = 1400, slowT = 0, t = 0;
  const obs = []; let banyanG = null, arriving = false;
  const bar = () => { const n = Math.round(Math.min(1, dist / D) * 10); hud.textContent = `🦁 ${'●'.repeat(n)}${'○'.repeat(10 - n)} 🌳`; }; bar();
  place(world, 0, 0, 1);
  await reveal(); ambience('day');
  await say('arjun', 'Pingalaka was so scared, he ran and ran through the jungle!');
  const jump = () => { if (air || arriving) return; air = true; vy = -900; jumps++; SFX.whoosh(); };
  await interaction(Cam.allowed ? 'Raise your eyebrows to make Pingalaka jump over the rocks and logs! (Space or a tap works too.)' : 'Tap the screen (or press Space) to make Pingalaka jump over the rocks and logs!', Cam.allowed ? null : 'Tap the screen to help Pingalaka jump over the rocks and logs!', ctx => {
    ctx.on(type => { if (type === 'down' || type === 'namaste') jump(); });
    const key = e => { if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'Enter') { e.preventDefault(); jump(); } };
    document.addEventListener('keydown', key);
    let last = performance.now(), raf = 0, stopped = false, browUp = false;
    const stop = () => { stopped = true; cancelAnimationFrame(raf); document.removeEventListener('keydown', key); };
    cleanups.push(stop);
    const d0 = ctx.done; ctx.done = v => { stop(); d0(v); };
    const frame = now => {
      if (stopped || ctx.fin) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now; t += dt;
      // eyebrow raise = jump (rising edge, measured against the child's resting brows)
      if (Face.on) { const up = Face.raise > .2 || Face.brow > .6; if (up && !browUp) jump(); browUp = up && Face.raise > .08; }
      // speed: steady jog, a stumble slows him for a moment, the MOO makes him sprint
      if (!mooed && t > 11) {
        mooed = true; target = 470; SFX.moo(1.3, .9); boom(r, 'MOOOOO!', 1100, 380, { size: 84 }); shakeScreen();
        pg.inner.classList.add('running', 'wide'); lionMood(pg.inner, 'scared'); pg.parts.ears && pg.parts.ears.classList.add('ears-flat');
        showHint('MOOO! Pingalaka runs even faster — keep jumping!');
      }
      slowT = Math.max(0, slowT - dt);
      const want = arriving ? 0 : target * (slowT > 0 ? .55 : 1);
      speed += (want - speed) * Math.min(1, dt * (arriving ? 8 : 2));
      dist += speed * dt;
      for (const L of [far, mid, near, ground, fg]) L.setAttribute('transform', `translate(${n1(-((dist * L.sp) % 1600))} 0)`);
      // jumping
      if (air) { vy += 2000 * dt; jy += vy * dt; if (jy >= 0) { jy = 0; vy = 0; air = false; } }
      const tilt = air ? Math.max(-8, Math.min(8, vy * .008)) : 0; pg._t.r += (tilt - (pg._t.r || 0)) * Math.min(1, dt * 10);
      pg._t.y = GY + jy; applyT(pg);
      // obstacles
      if (!banyanG && spawned < NOBS && dist > nextAt && dist < D - 1600) {
        const kinds = Object.keys(OBST), k = kinds[Math.floor(Math.random() * kinds.length)], o = OBST[k];
        const g = mk(o.m()); shade(g, true); obsL.append(g);
        obs.push({ g, x: 1800, w: o.w, h: o.h, hit: false }); spawned++;
        nextAt = dist + 760 + Math.random() * 220;
      }
      for (const o of obs) {
        o.x -= speed * dt; o.g.setAttribute('transform', `translate(${n1(o.x)} ${GY})${o.hit ? ` rotate(${n1((o.spin = (o.spin || 0) + dt * 400))})` : ''}`);
        if (!o.hit && Math.abs(o.x - (LX + 10)) < o.w / 2 + 40 && -jy < o.h - 26) {
          o.hit = true; bumps++; slowT = .7; SFX.thud(); pg.inner.classList.add('wide'); later(() => { if (!mooed) pg.inner.classList.remove('wide'); }, 600);
          if (!air) { air = true; vy = -420; }
        }
      }
      while (obs.length && obs[0].x < -200) obs.shift().g.remove();
      // the banyan tree comes into view; Pingalaka dashes behind it
      if (!banyanG && dist > D - 1500) { banyanG = G({}); banyanG.bx = 1900; banyanG.append(banyan(0, GY + 8, .8, { leaf: '#3E8F3A', hi: '#74C255', bark: '#8A5A34' })); treeL.append(banyanG); }
      if (banyanG) {
        banyanG.bx -= speed * dt; banyanG.setAttribute('transform', `translate(${n1(banyanG.bx)} 0)`);
        if (!arriving && banyanG.bx <= 1060) {
          arriving = now; hideHint(); speed = Math.min(speed, 200);
        }
        if (arriving) {
          pg._t.x += ((banyanG.bx + 30) - pg._t.x) * Math.min(1, dt * 2.2); applyT(pg);
          if (now - arriving > 1700 && !pg.hidden2) {
            pg.hidden2 = true; pg.inner.classList.remove('moving', 'running'); pg.parts.head.classList.add('duck'); SFX.rustle(); later(() => ctx.done(), 700);
          }
        }
      }
      bar();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
  });
  hud.hidden = true;
  SFX.chime();
  await say('arjun', bumps === 0 ? 'What a run! Pingalaka cleared every rock and log!' : `Phew! ${jumps} big jumps! Pingalaka made it all the way to the banyan tree.`);
  await say('pingalaka', 'I’ll hide behind this big banyan tree. Whatever made that sound… must be terrifying!');
}

/* ══════════ Scene 9: Pingalaka behind the banyan, the animals behind the bushes ══════════ */
async function s9() {
  const r = newStage('#8FA86A');
  sky(r, [[0, '#A6D2A8'], [.6, '#D2E6BE'], [1, '#9FC07A']]);
  jungleFar(r);
  [[90, 650, .8], [360, 630, .6], [1260, 630, .65], [1520, 650, .85]].forEach(([x, y, s]) => r.append(tree(x, y, s, { leaf: '#5E9C52', hi: '#86B478' })));
  hill(r, 745, '#6E9F45', { amp: 6, period: 1400 });
  tufts(r, 40, -100, 1700, 745, 860, '#4F8F3A', 71);
  // Pingalaka hides behind the trunk, only his head peeking out between the roots
  const pg = actor(lion(), 815, 772, .88); r.append(pg);
  pg.parts.head.classList.add('tilt'); pg.inner.classList.add('wide'); lionMood(pg.inner, 'worried');
  r.append(banyan(830, 780, 1.05, { leaf: '#3E8F3A', hi: '#74C255', bark: '#8A5A34' }));
  // the other animals have gathered to watch
  const mk2 = (el, x, y, s, fx) => { const a = actor(el, x, y, s, { fx }); a.home = { x, y, s }; return a; };
  const animals = [mk2(monkey(), 250, 735, 1.15, 1), mk2(bear(), 470, 745, 1.15, 1), mk2(rabbit(), 1150, 750, 1.3, -1), mk2(deer(), 1390, 740, 1.1, -1)];
  r.append(...animals);
  const spots = [[250, 880, 1.8], [500, 895, 1.9], [1150, 895, 1.8], [1400, 880, 1.9]];
  const bushes = spots.map(([x, y, s], i) => bush(x, y, s, i % 2 ? '#3F7A30' : '#4F8F3A', '#6EAE4C'));
  r.append(...bushes);
  jungleNear(r, { ground: false });
  const qs = [[300, 520], [1300, 520], [520, 560]].map(([x, y]) => S('text', { x, y, 'text-anchor': 'middle', 'font-family': "'Yatra One',serif", 'font-size': 64, fill: '#FFF7E6', stroke: INK, 'stroke-width': 7, 'paint-order': 'stroke', class: 'popin' }, '?'));
  await reveal(); ambience('day');
  await say('arjun', 'Pingalaka hid behind the big banyan tree. The other animals gathered around. Everyone looked confused.', { onPart: i => { if (i === 2) r.append(...qs); } });
  qs.forEach(q => q.remove());
  pg.parts.head.classList.remove('tilt');
  await say('pingalaka', 'Did you hear that?! Do any of you know what made that terrible sound?');
  animals.forEach(a => a.parts.head && a.parts.head.classList.add('tilt'));
  hideCaption();
  SFX.moo(1.3, .9); shakeScreen(); boom(r, 'MOOOOO!', 1300, 300, { size: 76 });
  pg.inner.classList.add('shiver'); pg.parts.head.classList.add('duck'); lionMood(pg.inner, 'scared');
  // everyone dives behind the bushes in front
  animals.forEach((a, i) => { a.parts.head && a.parts.head.classList.remove('tilt'); later(() => { SFX.rustle(); tween(a, { x: spots[i][0], y: a.home.y + 210, s: a.home.s * .9 }, 650, ease.in); later(() => { const b = bushes[i]; b.inner && (b.inner.classList.remove('wiggle'), void b.getBoundingClientRect(), b.inner.classList.add('wiggle')); }, 600); }, 200 + i * 160); });
  await sleep(1800);
  await say('arjun', 'Whoosh! Pingalaka stayed behind the banyan tree… and everyone else hid behind the bushes!');
  pg.inner.classList.remove('shiver');
  await ask('Pingalaka is hiding because he’s scared. What do you do when you feel scared?');
}
