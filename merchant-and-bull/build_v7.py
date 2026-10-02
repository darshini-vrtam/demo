#!/usr/bin/env python3
"""Build the-merchant-and-the-bull.html from the v6 story + the new character library.

Everything except the people and animals comes from v6 (scenes, interactions, games, narration,
parallax, scenery). The character section is replaced by chars.js, the CSS gait loops are replaced
by a speed-driven walking rig, and a few scene lines are adapted to the new figures.

Run: python3 build_v7.py
"""
import pathlib, re, sys

root = pathlib.Path(__file__).parent
src = (root / 'v6-source.html').read_text(encoding='utf-8')
chars = (root / 'chars.js').read_text(encoding='utf-8')


def sub1(text, old, new, label):
    n = text.count(old)
    if n != 1:
        sys.exit(f'{label}: expected 1 match, found {n}')
    return text.replace(old, new)


# 1. strip the old publish skeleton (the artifact host adds its own)
src = src[src.index('<body>') + len('<body>'):]
src = src.replace('</body></html>', '').strip() + '\n'

# 2. CSS: drop the looping gait rules (the rig drives these now), soften shakes, smooth gestures
DROP = ('.legA,.legB{', '.moving .legA', '.moving .legB', '.shin{', '.bullc{', '.moving .bullc', '.cart{',
        '.moving .cart', '.wheel{', '.moving .wheel', '.hop{', '.footL,.footR{', '.walking .footL', '.walking .footR',
        '.char.walking', '.walking .pose.armL', '.walking .pose.armR', '.walking.running', '.char.walking.running')
lines = src.split('\n')
src = '\n'.join(l for l in lines if not l.startswith(DROP))
src = sub1(src, '.pose.armR{animation:gestR 2.6s ease-in-out infinite}', '.pose.armR{animation:gestR 1.6s ease-in-out infinite alternate}', 'gestR rule')
src = sub1(src, '.pose.armL{animation:gestL 3.1s ease-in-out infinite}', '.pose.armL{animation:gestL 1.9s ease-in-out infinite alternate}', 'gestL rule')
src = re.sub(r'@keyframes gestR\{[^\n]*\}\}', '@keyframes gestR{from{transform:rotate(-6deg)}to{transform:rotate(-38deg)}}', src)
src = re.sub(r'@keyframes gestL\{[^\n]*\}\}', '@keyframes gestL{from{transform:rotate(3deg)}to{transform:rotate(16deg)}}', src)
src = re.sub(r'@keyframes screenshake\{[^\n]*\}\}', '@keyframes screenshake{0%,100%{transform:translate(0,0)}25%{transform:translate(-4px,2px)}50%{transform:translate(4px,-2px)}75%{transform:translate(-3px,-1px)}}', src)
src = re.sub(r'@keyframes treeshake\{[^\n]*\}\}', '@keyframes treeshake{0%,100%{transform:rotate(-1.6deg)}50%{transform:rotate(1.6deg)}}', src)
src = src.replace('.shake-tree{animation:treeshake .16s linear 9 !important}', '.shake-tree{animation:treeshake .32s ease-in-out 4 !important}')

CSS = r"""
/* ─── storybook characters: pivots, moods, smooth idle motion ─── */
.pv{transform-box:view-box;transform-origin:0 0}
.hidle{animation:headidle 5.2s ease-in-out infinite}
.tl{transform-box:view-box;transform-origin:0 0;animation:tlswish 3.4s ease-in-out infinite alternate}
.paw{animation:pawlift 5.5s ease-in-out infinite}
.paw.still{animation:none;transform:none}
.mSad,.mO,.mFlat,.mWorry,.bW,.bSt{display:none}
.m-sad .mS,.m-o .mS,.m-flat .mS,.m-worry .mS,.lm-scared .mS,.lm-worried .mS{display:none}
.m-sad .mSad,.m-o .mO,.m-flat .mFlat,.m-worry .mWorry,.lm-scared .mO,.lm-worried .mWorry{display:inline}
.b-worry .bN,.b-stern .bN,.lm-scared .bN,.lm-worried .bN{display:none}
.b-worry .bW,.b-stern .bSt,.lm-scared .bW,.lm-worried .bW{display:inline}
.talking .mS,.talking .mO,.talking .mSad,.talking .mFlat,.talking .mWorry{transform-box:fill-box;transform-origin:50% 0;animation:talk2 .24s ease-in-out infinite alternate}
.wide .eye{transform:scale(1.3)}
.armS{transform:rotate(-50deg)}
.worry .armS{transform:rotate(-140deg)}
.char.holder .pose.armR{animation:none !important}
.char.holder.pray .pose.armR{transform:none}
.char.holder.pray .pose.armL{transform:rotate(-70deg)}
.open .pose.armL{animation:none !important;transform:rotate(64deg)}.open .pose.armR{animation:none !important;transform:rotate(-64deg)}
.hold .pose.armL{animation:none !important;transform:rotate(132deg)}.hold .pose.armR{animation:none !important;transform:rotate(-132deg)}
.reach .pose.armL{animation:none !important;transform:rotate(-40deg)}.reach .pose.armR{animation:none !important;transform:rotate(40deg)}
/* opening scenes: ambient life */
.flag{transform-box:fill-box;transform-origin:0 50%;animation:flag 1.8s ease-in-out infinite alternate}
.hang{transform-box:fill-box;transform-origin:50% 0;animation:hang 3.6s ease-in-out infinite alternate}
.swingp{transform-box:view-box;transform-origin:0 0;animation:pend 3.4s ease-in-out infinite alternate}
.rock{transform-box:fill-box;transform-origin:50% 100%;animation:rockk 2.2s ease-in-out infinite alternate}
.spintop{transform-box:fill-box;transform-origin:50% 100%;animation:wob 1.2s ease-in-out infinite alternate}
.zzz{animation:zz 2.6s ease-in-out infinite}
.flow{stroke-dasharray:18 14;animation:flowd 1s linear infinite}
.floaty{animation:floaty 3.4s ease-in-out infinite alternate}
.flap2{transform-box:fill-box;transform-origin:50% 100%;animation:flap2 .6s ease-in-out infinite alternate}
.peck{transform-box:view-box;transform-origin:0 0;animation:peck 3.2s ease-in-out infinite}
.ray{animation:ray 5s ease-in-out infinite alternate}
@keyframes flag{from{transform:skewY(-5deg) scaleX(.94)}to{transform:skewY(5deg) scaleX(1.02)}}
@keyframes hang{from{transform:rotate(-1.6deg)}to{transform:rotate(1.6deg)}}
@keyframes pend{from{transform:rotate(-13deg)}to{transform:rotate(13deg)}}
@keyframes rockk{from{transform:rotate(-6deg)}to{transform:rotate(6deg)}}
@keyframes wob{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}
@keyframes zz{0%{opacity:0;transform:translate(0,10px)}30%{opacity:1}100%{opacity:0;transform:translate(20px,-30px)}}
@keyframes flowd{to{stroke-dashoffset:-32}}
@keyframes floaty{from{transform:translateY(8px)}to{transform:translateY(-10px)}}
@keyframes flap2{from{transform:scaleY(1)}to{transform:scaleY(-.4)}}
@keyframes peck{0%,70%,100%{transform:rotate(0)}80%{transform:rotate(12deg)}}
@keyframes ray{from{opacity:.45}to{opacity:1}}
@media (prefers-reduced-motion:reduce){.flag,.hang,.swingp,.rock,.spintop,.zzz,.flow,.floaty,.flap2,.peck,.ray{animation:none !important}}
.crown{transform-box:fill-box;transform-origin:50% 100%}
@keyframes headidle{0%,100%{transform:rotate(-1.2deg)}50%{transform:rotate(1.4deg)}}
@keyframes tlswish{from{transform:rotate(-5deg)}to{transform:rotate(7deg)}}
@keyframes pawlift{0%,100%{transform:rotate(0)}40%,70%{transform:rotate(-24deg)}}
@keyframes talk2{from{transform:scaleY(.5)}to{transform:scaleY(1.08)}}
@media (prefers-reduced-motion:reduce){.hidle,.tl,.paw{animation:none !important}}
"""
style_end = src.index('</style>\n\n<div id="app">')
src = src[:style_end] + CSS + src[style_end:]

# 3. replace the character section
a = src.index('/* ══════════ Characters ══════════ */')
b = src.index('/* ══════════ Props ══════════ */')
src = src[:a] + chars.replace('const RIGS = new Set();', 'var RIGS = new Set();') + '\n' + src[b:]

# 4. shading keeps rounded same-colour strokes in step with the gradient fill
src = sub1(src,
    "    if (f && HEX.test(f)) { const L = lum(f); if (L > .05 && L < .96) el.setAttribute('fill', unified ? unifiedGrad(f, el, root, bb, cache) : gradFor(f)); }",
    "    if (f && HEX.test(f)) { const L = lum(f); if (L > .05 && L < .96) { const nf = unified ? unifiedGrad(f, el, root, bb, cache) : gradFor(f); el.setAttribute('fill', nf); if (st === f) el.setAttribute('stroke', nf); } }",
    'shade fill')

# 5. drive the walking rigs from the parallax frame loop
src = sub1(src, "const PLX = { list: [], cx: 0, cy: 0, tx: 0, ty: 0, t0: performance.now() };",
           "const PLX = { list: [], cx: 0, cy: 0, tx: 0, ty: 0, t0: performance.now(), last: performance.now() };", 'PLX')
src = sub1(src, "  for (const w of PLX.list) w.setAttribute('transform', `translate(${(-PLX.cx * w._m * K).toFixed(2)} ${(-PLX.cy * w._m * K * .45).toFixed(2)})`);\n  requestAnimationFrame(plxLoop);",
           "  for (const w of PLX.list) w.setAttribute('transform', `translate(${(-PLX.cx * w._m * K).toFixed(2)} ${(-PLX.cy * w._m * K * .45).toFixed(2)})`);\n  const dt = Math.min(.05, (now - PLX.last) / 1000); PLX.last = now;\n  if (RIGS) stepRigs(dt);\n  requestAnimationFrame(plxLoop);", 'plx loop')
src = sub1(src, "function newStage(bg) {\n  PLX.list = [];", "function newStage(bg) {\n  PLX.list = []; if (RIGS) RIGS.clear();", 'newStage')

# 6. wagon wheels turn with the wagon's real speed
src = sub1(src, "  wo.append(wh); g.append(wo);\n  g.parts = p; return g;",
           "  wo.append(wh); g.append(wo);\n  regRig(g, g, { stride: 9999, nominal: 100, wheelR: 66, swing: 0, bob: 0 });\n  g.parts = p; return g;", 'wagon')

# 7. reins run from the seated merchant's hand to the bull's muzzle
src = sub1(src, "const hx = 122 + 50 * .74, hy = -178 - 30 * .74, to = p.sanjivaka ? { x: 474, y: -128 } : { x: 522, y: -150 };",
           "const hx = 122 + 80 * .74, hy = -178 - 28 * .74, to = p.sanjivaka ? { x: 500, y: -150 } : { x: 548, y: -164 };", 'reins')

# 8. the injured bull lies down properly instead of sinking behind a mound
src = sub1(src, "  const b = actor(bull(SANJ), x, y + 68 * s, s, { r: -3 }); b.parts.head.classList.add('droop'); r.append(b);",
           "  const b = actor(bull({ ...SANJ, lying: true }), x, y + 4 * s, s, { r: -2 }); b.parts.head.classList.add('droop'); r.append(b);", 'lyingBull')

# 9. the shadow in the last scene is a true silhouette
src = sub1(src, "actor(bull({ body: '#0C0A14', shade: '#0C0A14', horn: '#0C0A14', tip: '#0C0A14', jhool: false }), 1420, 690, .55, { op: 0 })",
           "actor(bull({ silhouette: true, body: '#0C0A14' }), 1420, 690, .55, { op: 0 })", 'shadow bull')

# 10. the injured bull's leg sinks into the mud instead of the whole figure dropping out of the rig
src = sub1(src, "  tween(sj, { y: 56, r: -7 }, 500, ease.out); sj.parts.head.classList.add('droop');",
           "  tween(sj, { y: 30, r: -5 }, 700, ease.io); sj.parts.head.classList.add('droop');", 'mud sink')
src = sub1(src, "  tween(sj, { y: 40, r: -4 }, 800);", "  tween(sj, { y: 18, r: -3 }, 900, ease.io);", 'mud rise')

# 11. the opening: Mahilaropya, the king, the princes at play, Vishnu Sharma under the banyan (replaces the book)
intro = (root / 'intro.js').read_text(encoding='utf-8')
a = src.index('const INTRO = ['); b = src.index('async function namaste(r)')
src = src[:a] + src[b:]
a = src.index('async function s1() {'); b = src.index('async function tapOne(')
src = src[:a] + src[b:]
src = sub1(src, "const SCENES = [", intro + "\nconst SCENES = [", 'intro inject')
src = sub1(src, "  { id: 'intro', label: 'Intro', title: 'Last Time, in the Panchatantra', run: sIntro },",
           "  { id: 'intro', label: 'Intro 1', title: 'Mahilaropya', run: i1 },\n  { id: 'i2', label: 'Intro 2', title: 'The King', run: i2 },\n  { id: 'i3', label: 'Intro 3', title: 'The Three Princes', run: i3 },", 'scene list')
src = sub1(src, "  merchant: { label: 'Vardhamanaka', role: 'M2', pitch: 1.0, rate: .94 },",
           "  merchant: { label: 'Vardhamanaka', role: 'M2', pitch: 1.0, rate: .94 },\n  king: { label: 'King Amara Shakthi', role: 'M', pitch: .92, rate: .9 },", 'cast king')

out = root / 'the-merchant-and-the-bull.html' 
out.write_text(src, encoding='utf-8')
print(f'{out.name}: {len(src.encode()) / 1024:.0f} KB')
