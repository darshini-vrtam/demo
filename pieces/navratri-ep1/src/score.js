  // =====================================================================
  //  SCORE BODY — Navratri ep. 1 (inside buildScore(); see kit/score-head.js). Composed under the voice (mixed at -12 dB,
  //  ducked while it speaks). D, a tanpura-like drone (D + A) as the floor. The arc, by TIMELINE.acts:
  //    build   (beats 1-8)   thin drone + pad, thickening by beat; pencil scratch on 16ths while lines are drawn
  //    peak    (beats 9-10)  the busiest: a low drone, bass and soldiers' steps on 8ths (busy, not the loudest)
  //    silence (beats 11-13a) near silence: one soft tone on the first terracotta dot, faint ticks, then a hard stop
  //    gift    (the cut)     THE LOUDEST HIT exactly on the cut, in the pause before "And from that light"; then a warm pad;
  //                          nine chimes for the nine rings
  //    goodbye (beats 15-16) the pad decays; a sweep for the comet; one soft bell on "DING."
  // =====================================================================
  const T = TIMELINE, cu = T.cues, E = (k) => ERA_T[ERA[k]], END = (k) => ERA_T[ERA[k] + 1];
  const scratch = (t0, dur, vel = 0.04) => { for (let t = t0; t < t0 + dur; t += E16) noiseHit(t, 0.06, 'bandpass', 3300 + ((t * 97) % 5) * 180, 2.2, vel * (0.75 + 0.25 * ((t * 13) % 1)), -0.25 + ((t * 31) % 1) * 0.5); };
  const motif = (t, notes, vel, pan = 0) => notes.forEach(([n, dt], i) => pluck(t + dt, nz(n), vel, pan + (i - 1) * 0.12, 0.7, 1800, 0.45));

  // ---- BUILD: beats 1-8
  to = 'm';
  drone(0.0, E('army') + 0.5, nz('D2'), 0.03, { att: 2.5, rel: 0.6 });
  drone(1.2, E('army') + 0.5, nz('A2'), 0.015, { att: 3.0, rel: 0.6 });
  pad(0.8, E('brahma'), ['D3', 'A3'], 0.012, { type: 'triangle', cut: 800, att: 2.0, rel: 0.6 });
  pad(E('brahma') - 0.4, E('pride'), ['D3', 'A3', 'F3', 'C4'], 0.012, { type: 'triangle', cut: 1000, att: 1.0, rel: 0.5, send: 0.5 });
  pad(E('pride') - 0.3, E('army') + 0.3, ['D3', 'A3', 'F3', 'C4', 'E4'], 0.014, { cut: 1100, att: 0.8, rel: 0.4 });
  // a short three-note phrase at the start of each beat (thin, low), rising a step as his pride grows
  [['worlds', 'D4'], ['power', 'E4'], ['tapasya', 'D4'], ['time', 'F4'], ['stop', 'E4'], ['brahma', 'A4'], ['boon', 'G4'], ['pride', 'A4']]
    .forEach(([k, n], i) => motif(E(k) + (k === 'worlds' ? 1.6 : 0.3), [[n, 0], ['A3', E8], ['D4', BEAT]], 0.05 + i * 0.006, -0.2 + (i % 3) * 0.2));
  // Brahma's rays: a soft high chime every four rays; the BOON stamp: a dry thud
  for (let i = 0; i < 5; i++) chime(cu.brahma - 0.2 + i * 4 * E16, [nz('A5'), nz('E6')], 0.02, -0.4 + i * 0.2);
  sub(cu.stamp, 0.07); noiseHit(cu.stamp, 0.1, 'lowpass', 900, 0.8, 0.06);
  to = 's';
  // pencil scratch on 16ths while lines are drawn (each beat's draw-on, and the named write-ons)
  [[1.6, 2.2], [VW('b01_worlds', 'devas') - 0.2, 1.6], [VW('b01_worlds', 'humans') - 0.2, 1.6], [cu.asuras - 0.1, 2.0], [E('power') + 0.15, 2.4], [cu.name2 - 0.1, 0.7],
   [E('tapasya') + 0.05, 1.6], [cu.forest - 0.3, 2.0], ...cu.boxes.map((t) => [t - 0.05, 0.45]), [E('stop') + 0.3, 2.0], [E('brahma') + 0.1, 2.6],
   [E('boon') + 0.2, 2.0], [cu.man - 0.15, 0.5], [cu.deva - 0.15, 0.5], [cu.invincible + 0.9, 1.1]].forEach(([t, d]) => scratch(t, d));
  // the eraser rubbing out the small crown (beat 8)
  for (let t = cu.invincible - 0.1; t < cu.invincible + 0.8; t += E16) noiseHit(t, 0.1, 'bandpass', 900 + ((t * 53) % 3) * 120, 1.2, 0.035, 0.1);

  // ---- PEAK: beats 9-10 (the army, the retreat): low drone, bass and steps on 8ths; it thins as the devas are pushed out
  to = 'm';
  const pk0 = E('army') - 0.3, pk1 = E('gather') - 0.6;
  drone(pk0, pk1, nz('D2'), 0.045, { att: 1.2, rel: 0.5 });
  pad(pk0, E('retreat') + 1.0, ['D2', 'A2', 'D3', 'F3', 'A3'], 0.02, { cut: 650, att: 1.0, rel: 0.8 });
  pad(E('retreat') + 0.5, pk1, ['D2', 'A2', 'F3'], 0.018, { cut: 500, att: 0.8, rel: 0.8 });
  for (let t = E('army'); t < pk1 - 0.3; t += E8) {
    const fade = t < E('retreat') ? 1 : 1 - seg(t, E('retreat'), pk1);
    if (fade <= 0.05) continue;
    if (((t - E('army')) / E8) % 2 < 1) bass(t, nz(((t - E('army')) / BEAT) % 4 < 2 ? 'D2' : 'C2'), 0.06 * fade);
  }
  to = 's';
  for (let t = E('army'); t < pk1 - 0.3; t += E8) { const fade = t < E('retreat') ? 1 : 1 - seg(t, E('retreat'), pk1); if (fade > 0.05) noiseHit(t, 0.07, 'lowpass', 520, 0.8, 0.05 * fade, ((t / E8) % 2 ? 0.2 : -0.2)); }
  scratch(E('retreat') - 0.1, 0.5); scratch(cu.spread - 0.3, 0.6); scratch(cu.tried - 0.3, 0.6);
  for (let t = cu.pushed + 0.6; t < cu.pushed + 2.8; t += E16) noiseHit(t, 0.1, 'bandpass', 950, 1.2, 0.03, -0.1);     // the eraser takes the palaces
  noiseHit(cu.couldNot + 0.3, 0.25, 'lowpass', 300, 0.7, 0.08);                                                        // the gate shuts

  // ---- SILENCE: beats 11-13a. Near silence; everything dry and ending before the held silence.
  to = 'm';
  chime(cu.together, [nz('D5')], 0.022, 0);                                                                             // the first terracotta dot
  for (let i = 0; i < 7; i++) blip(cu.released - 0.2 + i * BEAT * 0.5, 1400 + i * 60, 1300 + i * 60, 0.05, 0.008, -0.3 + i * 0.1);   // the lines, one per beat
  // brighter, brighter: a faint swell that cuts off dead at the end of the line (the hard stop before the silence)
  pad(cu.bright1 - 0.2, cu.silence - 0.05, ['D4', 'A4'], 0.006, { type: 'sine', cut: 2000, att: 1.2, rel: 0.12, send: 0 });

  // ---- GIFT: THE LOUDEST HIT, exactly on the cut (in the pause before "And from that light appeared..."), then a warm pad
  to = 'm';
  const hit = cu.cut;
  ['D2', 'D3', 'A3', 'D4', 'Fs4', 'A4'].forEach((n, i) => pluck(hit, nz(n), 0.6 - i * 0.05, -0.3 + i * 0.12, 0.45, 5200, 0.15));   // a short chord stab
  sub(hit, 1.0);
  noiseHit(hit, 0.35, 'lowpass', 2400, 0.7, 0.45, 0, 0.3, 300);
  pad(hit + 0.4, E('light') + 0.3, ['D3', 'A3', 'Fs3', 'E4'], 0.021, { type: 'triangle', cut: 900, att: 0.6, rel: 0.5, send: 0.5 });   // flat and warm after it
  drone(hit + 0.35, E('light') + 0.4, nz('D2'), 0.034, { att: 1.5, rel: 0.6 });
  drone(E('light'), END('who'), nz('D2'), 0.012, { att: 0.5, rel: 4.0 });
  // nine chimes for the nine rings, climbing the D major pentatonic
  const NINE = ['D5', 'E5', 'Fs5', 'A5', 'B5', 'D6', 'E6', 'Fs6', 'A6'];
  cu.rings.forEach((t, i) => chime(t, [nz(NINE[i]), nz(NINE[i]) * 1.5], 0.045, -0.5 + i * 0.12));

  // ---- GOODBYE: the comet, the peak, the title, the bell
  pad(E('light') + 0.2, END('who') - 0.2, ['D3', 'A3', 'E4'], 0.006, { type: 'triangle', cut: 800, att: 1.0, rel: 3.0, send: 0.5 });
  sweep(cu.firstLight - 0.2, cu.mountains + 0.6, 0.02, 2600, 600, 0.3);
  motif(cu.mountains + 0.4, [['A4', 0], ['Fs4', E8], ['D4', BEAT]], 0.05, 0.2);
  motif(cu.title + 0.4, [['D4', 0], ['A4', E8], ['D5', BEAT]], 0.05, -0.1);
  // DING: one soft bell (a fundamental, an inharmonic partial, a long ring)
  chime(cu.ding, [nz('D5'), nz('D5') * 2.76, nz('D5') * 5.4], 0.06, 0);
  to = 's';
  scratch(cu.title + 0.3, 1.8, 0.03);
