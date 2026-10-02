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


# 12. onboarding (name → camera → begin), the movable camera window, hand & face tracking, music, living backgrounds
camjs = (root / 'camera.js').read_text(encoding='utf-8')
CSS2 = r"""
/* ─── namaste & whisper poses: the swinging arms are swapped for posed arms ─── */
.char .aswing{transition:opacity .3s}
.nam,.wsp{opacity:0;transition:opacity .3s;pointer-events:none}
.namaste .nam{opacity:1}.namaste .aswing{opacity:0}
.whisper .wsp{opacity:1}.whisper .aswing.ar{opacity:0}
.namaste .pose.armL,.namaste .pose.armR,.whisper .pose.armR{animation:none !important;transform:none !important}
.breath2{transform-box:fill-box;transform-origin:50% 100%;animation:breath2 2.8s ease-in-out infinite}
@keyframes breath2{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.06)}}
/* ─── every background breathes a little ─── */
.gwave{transform-box:fill-box;transform-origin:50% 100%;animation:gwave 4.6s ease-in-out infinite alternate}
.cdrift{animation:cdrift 38s ease-in-out infinite alternate}
.sunpulse{transform-box:fill-box;transform-origin:50% 50%;animation:sunpulse 5s ease-in-out infinite alternate}
.sunrays{transform-box:fill-box;transform-origin:50% 50%;animation:spin 60s linear infinite}
.lampsw{transform-box:fill-box;transform-origin:50% 0;animation:hang 4s ease-in-out infinite alternate}
@keyframes gwave{from{transform:skewX(-3deg)}to{transform:skewX(3deg)}}
@keyframes cdrift{from{transform:translateX(-70px)}to{transform:translateX(70px)}}
@keyframes sunpulse{from{transform:scale(.9);opacity:.8}to{transform:scale(1.1);opacity:1}}
@media (prefers-reduced-motion:reduce){.gwave,.cdrift,.sunpulse,.sunrays,.lampsw,.breath2{animation:none !important}}
#scene{filter:saturate(1.12) contrast(1.02)}
#warm{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 30%,rgba(255,200,120,.10),rgba(255,140,60,.08) 70%,rgba(200,80,30,.10));mix-blend-mode:soft-light}
/* ─── onboarding ─── */
#title{background:radial-gradient(ellipse at 50% 40%,rgba(40,20,40,.35),rgba(20,12,30,.82))}
.onb{display:flex;flex-direction:column;align-items:center;gap:14px;max-width:min(640px,100%)}
.onb .arj{width:clamp(110px,18vw,170px);height:auto;filter:drop-shadow(0 6px 0 rgba(59,36,20,.5));animation:arjbob 3s ease-in-out infinite alternate}
@keyframes arjbob{from{transform:translateY(0)}to{transform:translateY(-6px)}}
.bubble{position:relative;background:var(--paper);color:var(--ink);border:3px solid var(--ink);border-radius:22px;box-shadow:0 5px 0 var(--ink);padding:14px 22px 10px;font:700 clamp(18px,2.6vw,26px)/1.3 var(--body);text-wrap:balance}
.bubble::before{content:"";position:absolute;left:50%;top:-14px;width:22px;height:22px;background:var(--paper);border-left:3px solid var(--ink);border-top:3px solid var(--ink);transform:translateX(-50%) rotate(45deg);border-radius:4px 0 0 0}
#title .bubble p{margin:0;max-width:none;font:inherit;color:var(--ink)}
#nameform{align-items:center}
#kidname{font:700 22px/1.2 var(--body);color:var(--ink);background:#FFFDF6;border:3px solid var(--ink);border-radius:999px;padding:10px 18px 8px;width:min(260px,70vw);box-shadow:inset 0 2px 0 rgba(0,0,0,.08);text-align:center}
#kidname:focus{outline:3px solid var(--gold);outline-offset:2px}
#bmic{width:52px;height:52px;background:var(--leaf);color:var(--cream)}
#bmic svg{width:26px;height:26px}
#bmic.busy{animation:pulse 1s infinite;background:var(--kumkum)}
.onb .note{margin:0;min-height:1.3em;font:600 15px/1.35 var(--body);color:var(--paper)}
.onb .eyebrow{font:400 clamp(14px,1.8vw,18px)/1 var(--display);color:var(--gold);letter-spacing:.14em;text-transform:uppercase}
.onb h1{margin:0;font:400 clamp(34px,6vw,72px)/.95 var(--display);color:var(--cream);text-shadow:0 4px 0 var(--ink),0 10px 30px rgba(0,0,0,.5);text-wrap:balance}
.onb h1 span{color:var(--turmeric)}
.pill:disabled{opacity:.6;cursor:default}
/* ─── camera window ─── */
#camwin{position:absolute;left:16px;bottom:calc(env(safe-area-inset-bottom,0px) + 16px);width:clamp(120px,15vw,176px);aspect-ratio:4/3;z-index:43;border:3px solid var(--ink);border-radius:16px;box-shadow:0 4px 0 var(--ink),0 10px 24px rgba(0,0,0,.35);background:#1C1830;cursor:grab;touch-action:none}
#camwin.drag{cursor:grabbing}
#camwin.live{border-color:var(--gold)}
#camv{width:100%;height:100%;object-fit:cover;transform:scaleX(-1);border-radius:13px;display:block;pointer-events:none}
#camx{position:absolute;top:-12px;right:-12px;width:30px;height:30px;border-radius:50%;border:2px solid var(--ink);background:var(--paper);color:var(--ink);font:800 18px/1 var(--body);cursor:pointer;box-shadow:0 2px 0 var(--ink);padding:0}
#camwin .camlbl{position:absolute;left:8px;bottom:6px;font:700 11px/1 var(--body);color:#fff;background:rgba(0,0,0,.45);border-radius:99px;padding:3px 7px 2px}
#camtip{position:absolute;left:0;bottom:calc(100% + 10px);width:max-content;max-width:min(300px,80vw);display:flex;gap:8px;align-items:center;background:var(--turmeric);color:var(--ink);border:2px solid var(--ink);border-radius:14px;box-shadow:0 3px 0 var(--ink);padding:8px 12px 6px;font:700 14px/1.3 var(--body);animation:popin-html .45s cubic-bezier(.3,1.6,.5,1)}
#camtip b{font-size:24px;line-height:1}
#munchhud{position:absolute;left:50%;top:calc(env(safe-area-inset-top,0px) + 120px);transform:translateX(-50%);z-index:16;font:400 clamp(22px,3vw,32px)/1 var(--display);color:var(--ink);background:var(--gold);border:3px solid var(--ink);border-radius:999px;box-shadow:0 4px 0 var(--ink);padding:10px 22px 6px}
"""
style_end = src.index('</style>\n\n<div id="app">')
src = src[:style_end] + CSS2 + src[style_end:]

ARJ = """<svg class="arj" viewBox="0 0 200 220" aria-hidden="true">
        <circle cx="100" cy="92" r="88" fill="#5E8C3F" stroke="#3B2414" stroke-width="5"/>
        <path d="M40,220 C40,170 70,150 100,150 C130,150 160,170 160,220Z" fill="#E9A23B" stroke="#3B2414" stroke-width="5"/>
        <circle cx="100" cy="100" r="46" fill="#C98A5E" stroke="#3B2414" stroke-width="4"/>
        <path d="M54,92 C54,52 146,52 146,92 C132,78 118,72 100,74 C82,72 68,78 54,92Z" fill="#2E1D12" stroke="#3B2414" stroke-width="4"/>
        <path d="M56,82 C66,46 134,46 144,82 C126,64 74,64 56,82Z" fill="#E9A23B" stroke="#3B2414" stroke-width="4"/>
        <circle cx="84" cy="102" r="5.5" fill="#3B2414"/><circle cx="116" cy="102" r="5.5" fill="#3B2414"/>
        <circle cx="86" cy="100" r="1.8" fill="#fff"/><circle cx="118" cy="100" r="1.8" fill="#fff"/>
        <path d="M84,120 Q100,134 116,120" fill="none" stroke="#3B2414" stroke-width="4" stroke-linecap="round"/>
        <circle cx="72" cy="116" r="6" fill="#E58B7A" opacity=".6"/><circle cx="128" cy="116" r="6" fill="#E58B7A" opacity=".6"/>
        <path d="M68,220 C66,200 74,184 88,180 L112,180 C126,184 134,200 132,220Z" fill="#2E7DD8" stroke="#3B2414" stroke-width="4" stroke-linejoin="round"/>
        <g transform="translate(100 184) scale(.48)"><g transform="translate(27 0) scale(-1 1)"><path d="M-33.5,-20 L-33.5,-59.5 A6.5,6.5 0 0,1 -20.5,-59.5 L-20.5,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-19.0,-20 L-19.0,-89.0 A7.0,7.0 0 0,1 -5.0,-89.0 L-5.0,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-3.0,-20 L-3.0,-97.0 A7.0,7.0 0 0,1 11.0,-97.0 L11.0,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M13.0,-20 L13.0,-86.0 A6.0,6.0 0 0,1 25.0,-86.0 L25.0,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-34,-36 C-36,0 -34,40 -26,62 L27,62 L27,-40 C10,-46 -18,-46 -34,-36Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-31,-31 L25,-31" stroke="#D99A6C" stroke-width="9"/><path d="M27,8 C10,-6 -2,-26 2,-40 C8,-48 16,-40 20,-30 C24,-18 27,-8 27,-2Z" fill="#C98A5E" stroke="#3B2414" stroke-width="4" stroke-linejoin="round"/></g><g transform="translate(-27 0) scale(1 1)"><path d="M-33.5,-20 L-33.5,-59.5 A6.5,6.5 0 0,1 -20.5,-59.5 L-20.5,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-19.0,-20 L-19.0,-89.0 A7.0,7.0 0 0,1 -5.0,-89.0 L-5.0,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-3.0,-20 L-3.0,-97.0 A7.0,7.0 0 0,1 11.0,-97.0 L11.0,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M13.0,-20 L13.0,-86.0 A6.0,6.0 0 0,1 25.0,-86.0 L25.0,-20Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-34,-36 C-36,0 -34,40 -26,62 L27,62 L27,-40 C10,-46 -18,-46 -34,-36Z" fill="#D99A6C" stroke="#3B2414" stroke-width="5" stroke-linejoin="round"/><path d="M-31,-31 L25,-31" stroke="#D99A6C" stroke-width="9"/><path d="M27,8 C10,-6 -2,-26 2,-40 C8,-48 16,-40 20,-30 C24,-18 27,-8 27,-2Z" fill="#C98A5E" stroke="#3B2414" stroke-width="4" stroke-linejoin="round"/></g></g>
      </svg>"""
MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>'
a = src.index('  <div id="title" class="overlay">'); b = src.index('  <div id="menu" class="overlay" hidden>')
src = src[:a] + f"""  <div id="title" class="overlay">
    <div class="onb" id="onb1">
      {ARJ}
      <div class="eyebrow">Panchatantra · Story Two</div>
      <h1>The Merchant <span>&amp;</span> the Bull</h1>
      <div class="bubble"><p>Hello, my little friend! May I know your name?</p></div>
      <form id="nameform" class="row" autocomplete="off">
        <input id="kidname" type="text" maxlength="24" placeholder="Type your name" aria-label="Your name" enterkeyhint="next">
        <button class="cbtn" id="bmic" type="button" aria-label="Say your name" title="Say your name">{MIC}</button>
        <button class="pill big" type="submit">Next →</button>
      </form>
      <p class="note" id="micnote">Type your name, or tap the microphone and say it.</p>
    </div>
    <div class="onb" id="onb2" hidden>
      {ARJ}
      <div class="bubble"><p><span id="camhi">Nice to meet you!</span> May I use your camera? Then you can help the story with your hands and face!</p></div>
      <div class="row">
        <button class="pill big" id="camyes" type="button">Yes, use my camera 📷</button>
        <button class="pill alt" id="camno" type="button">Not now</button>
      </div>
      <p class="note" id="camres">The picture stays on this device. You can turn it off any time.</p>
    </div>
    <div class="onb" id="onb3" hidden>
      {ARJ}
      <div class="bubble"><p>Let’s begin with today’s story!</p></div>
      <div class="row">
        <button class="pill big" id="begin" type="button">Begin Story</button>
        <button class="pill alt" id="pick" type="button">Choose a scene</button>
      </div>
      <label class="vpick"><span class="vh">Narrator voice</span><select id="voicesel" aria-label="Narrator voice"><option value="">Narrator voice: best Indian voice available</option></select></label>
      <div class="rotate">Turn your phone sideways for a bigger picture.</div>
    </div>
  </div>

""" + src[b:]
src = sub1(src, '  <video id="cam" muted playsinline hidden></video>\n',
           '  <div id="camwin" hidden><video id="camv" muted playsinline></video><span class="camlbl">You</span><button id="camx" type="button" aria-label="Turn the camera off" title="Turn the camera off">×</button><div id="camtip" hidden></div></div>\n  <div id="munchhud" hidden></div>\n', 'camwin html')
src = sub1(src, '    <div id="vignette"></div>\n', '    <div id="vignette"></div>\n    <div id="warm"></div>\n', 'warm overlay')

# the old hand-camera block is replaced by camera.js
a = src.index("const MP = 'https://cdn.jsdelivr.net"); b = src.index('let toastT = null;')
src = src[:a] + src[b:]

# activities show camera instructions and switch on hand / face tracking while they run
src = sub1(src, """function interaction(hintText, spoken, setup) {
  return A(new Promise(res => {
    const offs = []; let fin = false;
    const ctx = {
      on(h) { Input.hs.add(h); offs.push(() => Input.hs.delete(h)); },
      done(v) { if (fin) return; fin = true; offs.forEach(f => f()); clearTimeout(hintT); stopSpeech(); hideHint(); res(v); },
      get fin() { return fin; }
    };
    cleanups.push(() => { offs.forEach(f => f()); hideHint(); });""",
"""function interaction(hintText, spoken, setup) {
  const tip = tipFor(hintText), cam = tip && Cam.allowed && !Vision.failed;
  if (cam) {
    spoken = CAMTIP[tip].say; camTip(tip);
    (tip === 'face' ? Face : Hands).start().then(ok => { if (!ok && Cam.allowed) { camTip(null); toast(tip === 'face' ? "Face tracking couldn't load here, so just tap to munch!" : "Hand tracking couldn't load here, so drag with your finger or mouse instead."); } });
  }
  const camOff = () => { if (!cam) return; camTip(null); (tip === 'face' ? Face : Hands).stop(); };
  return A(new Promise(res => {
    const offs = []; let fin = false;
    const ctx = {
      on(h) { Input.hs.add(h); offs.push(() => Input.hs.delete(h)); },
      done(v) { if (fin) return; fin = true; offs.forEach(f => f()); clearTimeout(hintT); stopSpeech(); hideHint(); camOff(); res(v); },
      get fin() { return fin; }
    };
    cleanups.push(() => { offs.forEach(f => f()); hideHint(); camOff(); });""", 'interaction')

# music dips under speech
src = sub1(src, "    const fin = () => { if (done) return; done = true; clearTimeout(t); if (curFin === fin) curFin = null; res(); };\n    curFin = fin;",
           "    const fin = () => { if (done) return; done = true; clearTimeout(t); if (curFin === fin) curFin = null; Music.talk(-1); res(); };\n    curFin = fin; Music.talk(1);", 'speak duck')
# every scene gets its own music and ambient life
src = sub1(src, "    if (my !== runId) return;\n    ambience(null);\n", "    if (my !== runId) return;\n    ambience(null); bgLife(null); Music.set(MUSIC[SCENES[i].id] || 'calm');\n", 'play music')
src = sub1(src, "async function playGame(key) {\n  cleanups.push(() => { if (Game.active) Game.active.finish('scene-change'); });\n  await A(Game.start(key));\n}",
           "async function playGame(key) {\n  cleanups.push(() => { if (Game.active) Game.active.finish('scene-change'); });\n  const m = Music.mood; Music.set(null);\n  try { await A(Game.start(key)); } finally { Music.set(m); }\n}", 'game music')

# Moo Munch is played in the page with face tracking (or taps)
src = sub1(src, "  await gameCard('Moo Munch', 'GAME ONE');\n  await playGame('moo');", "  await gameCard('Moo Munch', 'GAME ONE');\n  await mooMunch();", 'g1 moo')
assert src.count("jhool: '#C0392B'") == 2
src = src.replace("jhool: '#C0392B'", "jhool: '#2E7DD8'")

# namaste hands look like the 🙏 emoji, and follow the child's real hands
src = sub1(src, "  const palm = dir => G(CH, S('path', { d: 'M-30,80 L-32,-30 C-34,-62 -24,-80 -14,-80 L14,-80 C24,-80 34,-62 32,-30 L30,80Z', fill: '#D99A6C' }), S('path', { d: 'M-15,-78 L-15,-32 M0,-80 L0,-30 M15,-78 L15,-32', fill: 'none', stroke: '#A56B43', 'stroke-width': 3 }), S('path', { d: `M${dir * 30},12 C${dir * 58},0 ${dir * 62},-28 ${dir * 44},-36 C${dir * 36},-22 ${dir * 32},-10 ${dir * 30},-6`, fill: '#D99A6C' }), S('rect', { x: -32, y: 60, width: 64, height: 22, rx: 6, fill: TURM }));",
           """  const palm = dir => mk(`<g transform="scale(${dir} 1)"><ellipse cx="0" cy="100" rx="44" ry="8" fill="#000" opacity=".12"/>
    ${[[-27, -66, 13], [-12, -96, 14], [4, -104, 14], [19, -92, 12]].map(([x, top, w]) => `<path d="M${x - w / 2},-20 L${x - w / 2},${top + w / 2} A${w / 2},${w / 2} 0 0,1 ${x + w / 2},${top + w / 2} L${x + w / 2},-20Z" fill="#E8A877" stroke="#B8744A" stroke-width="3" stroke-linejoin="round"/>`).join('')}
    <path d="M-34,-36 C-36,0 -34,40 -26,62 L27,62 L27,-40 C10,-46 -18,-46 -34,-36Z" fill="#E8A877" stroke="#B8744A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-34,-30 L27,-30" stroke="#E8A877" stroke-width="8"/>
    <path d="M27,8 C10,-6 -2,-26 2,-40 C8,-48 16,-40 20,-30 C24,-18 27,-8 27,-2Z" fill="#DD9A6A" stroke="#B8744A" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-18,-74 L-18,-66 M-3,-96 L-3,-88 M12,-90 L12,-82" stroke="#C98258" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M-30,58 L28,58 L28,92 L-26,92 C-34,92 -36,62 -30,58Z" fill="#2E7DD8"/><path d="M-31,64 L28,64" stroke="#F2C14E" stroke-width="5" stroke-linecap="round"/></g>`);""", 'namaste palms')
src = sub1(src, "      ctx.on(t => { if (t === 'namaste') meet(); });",
           "      ctx.on((t, gap) => {\n        if (t === 'namaste') meet();\n        else if (t === 'hands2' && !met) { const off = Math.max(36, Math.min(280, 36 + (gap - 1.2) * 70)); L._t.x += (800 - off - L._t.x) * .35; R._t.x += (800 + off - R._t.x) * .35; L._t.y = R._t.y = 450; applyT(L); applyT(R); if (off <= 60) meet(); }\n      });", 'namaste hands2')

# living backgrounds: grass sways, clouds drift across light skies, the sun's glow breathes
src = sub1(src, "  const R = rng(seed), g = G({ 'pointer-events': 'none' }), ok = HEX.test(color);",
           "  const R = rng(seed), g = G({ 'pointer-events': 'none', class: 'gwave' }), ok = HEX.test(color);\n  g.style.animationDelay = (-R() * 4).toFixed(2) + 's';", 'tufts wave')
src = sub1(src, "function sky(r, stops) {", "function sky(r, stops, o = {}) {", 'sky sig')
src = sub1(src, "  r.append(rect); return rect;\n}", "  r.append(rect);\n  if (o.clouds !== false && HEX.test(stops[0][1]) && lum(stops[0][1]) > .55) clouds(r, o.seed || 5);\n  return rect;\n}\nfunction clouds(r, seed = 5) {\n  const R = rng(seed), g = G({ 'pointer-events': 'none', 'data-noshade': '' });\n  for (let i = 0; i < 5; i++) {\n    const x = -100 + i * 380 + R() * 160, y = 70 + R() * 170, s = .6 + R() * .6, c = G({ class: 'cdrift', opacity: (.55 + R() * .3).toFixed(2) });\n    c.style.animationDuration = (30 + R() * 30).toFixed(0) + 's'; c.style.animationDelay = (-R() * 30).toFixed(1) + 's';\n    c.append(place(mk(`<ellipse cx=\"0\" cy=\"0\" rx=\"90\" ry=\"26\" fill=\"#FFFDF4\"/><circle cx=\"-34\" cy=\"-14\" r=\"32\" fill=\"#FFFDF4\"/><circle cx=\"14\" cy=\"-26\" r=\"40\" fill=\"#FFFDF4\"/><circle cx=\"52\" cy=\"-8\" r=\"26\" fill=\"#FFFDF4\"/><ellipse cx=\"0\" cy=\"10\" rx=\"84\" ry=\"12\" fill=\"#F4E2C8\" opacity=\".6\"/>`), x, y, s));\n    g.append(c);\n  }\n  r.append(pwrap(g, 1.3)); return g;\n}", 'sky clouds')
src = sub1(src, "  g.append(S('circle', { cx: x, cy: y, r: rad * 2.2, fill: color, opacity: .25, filter: 'url(#blur)' }));",
           "  g.append(S('circle', { cx: x, cy: y, r: rad * 2.2, fill: color, opacity: .25, filter: 'url(#blur)', class: 'sunpulse' }));", 'sun pulse')

src = sub1(src, "  [/\\bArjun\\b/g, 'Arjun'],", "  [/\\bArjun\\b/g, 'Arjun'], [/Bahushakti/g, 'Bahu-shakti'], [/Ugrashakti/g, 'Ugra-shakti'], [/Anantashakti/g, 'Anant-shakti'],", 'say-as princes')
src = sub1(src, "\nconst SCENES = [", "\n" + camjs + "\nconst SCENES = [", 'camera inject')

out = root / 'the-merchant-and-the-bull.html' 
out.write_text(src, encoding='utf-8')
print(f'{out.name}: {len(src.encode()) / 1024:.0f} KB')
