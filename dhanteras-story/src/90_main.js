/* ===== Main loop, shot list, start screen ===== */
const SHOTS=[['1.1','shot1_1'],['1.2','shot1_2'],['1.3','shot1_3'],['2.1','shot2_1'],['2.2','shot2_2'],['2.3','shot2_3'],['2.4','shot2_4'],
  ['3.1','shot3_1'],['3.2','shot3_2'],['4.1','shot4_1'],['4.2','shot4_2'],['4.3','shot4_3'],['5.1','shot5_1'],['5.2','shot5_2'],
  ['6.1','shot6_1'],['6.2','shot6_2'],['7.1','shot7_1'],['7.2','shot7_2'],['C.1','shotC_1']].filter(s=>typeof window[s[1]]==='function');
const epStart=ep=>Math.max(0,SHOTS.findIndex(s=>s[0].startsWith(ep>7?'C':String(ep)+'.')));
let lastT=performance.now(),hotT=0;
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt*Math.min(D.speed,4);T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const t=T.sec;try{if(D.old){D.old.update(dt,t);if(D.old._fade)op(D.old.root,D.old._fade.a)}if(D.scene)D.scene.update(dt,t)}catch(e){console.error(e)}
  const ins=D.insetRect();const tr=ins.s<1?`translate(${f1(ins.x)} ${f1(ins.y)}) scale(${f3(ins.s)})`:'';if(layers.scenes._tr!==tr){layers.scenes._tr=tr;tr?layers.scenes.setAttribute('transform',tr):layers.scenes.removeAttribute('transform')}
  if(now-hotT>250||Hot.dirty){hotT=now;Hot.dirty=false;Hot.sync()}
  requestAnimationFrame(frame)}
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();$('end').hidden=true;$('tray').hidden=true;$('tcard').hidden=true;D.inset=0;D.hideCap();D.clearAct();$('chant').hidden=true;
  try{for(let i=from;i<SHOTS.length;i++){if(D.qa)D.qa.cur=SHOTS[i][0];await window[SHOTS[i][1]]();D.guard(tok);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===SHOTS[i][0]){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function begin(fromEp){$('start').hidden=true;AU.init();AU.resume();Speech.init();$('badge').hidden=fromEp<=1;
  if(fromEp>1){D.resumed=true;D.resumedAt=fromEp;D.replay=false}else{D.replay=!!Store.data.done||Store.data.ep>1;D.resumed=false;Store.data.petals=[0,0,0,0,0,0,0];Store.data.choices=null;Store.data.ep=1;Store.save();Badge.bloomK=0;Badge.render()}
  play(epStart(fromEp||1))}
$('begin').addEventListener('click',()=>begin(1));
$('bResume').addEventListener('click',()=>begin(Store.data.ep));
$('bAgain').addEventListener('click',()=>{$('end').hidden=true;begin(1)});
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>{D.poke();D.skip()});
$('bCam').addEventListener('click',()=>Cam.toggle());
$('bCC').addEventListener('click',()=>{D.cc=!D.cc;$('bCC').setAttribute('aria-pressed',String(D.cc));$('cap').classList.toggle('off',!D.cc)});
/* boot */
Pat.init();layers.scenes=grp(svg);{const c=el('clipPath',{id:'stageClip'},Pat.defs);layers.clip=el('rect',{x:0,y:0,width:1778,height:810},c);layers.scenes.setAttribute('clip-path','url(#stageClip)')}Store.load();Badge.build();$('badge').hidden=true;relayout();
window.addEventListener('resize',()=>relayout());if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
(function cover(){D.setScene(titleScene(1),0);const ep=Store.data.ep;if(ep>1&&!Store.data.done){const b=$('bResume');b.hidden=false;b.textContent=ep>7?'Continue: the Closing':'Continue: Episode '+ep}
  if(Store.data.done||ep>1)$('begin').textContent='Begin the adventure again'})();
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>Hot.dirty=true);
/* QA hook (#qa): window.__qa.go('2.4','act'|'late'|'end') fast-forwards to a point in a shot */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,o){o=o||{};D.fast=!o.live;D.speed=D.fast?40:1;D.qa={at,stop:stop||'end',paused:false,cur:null,acts:!!o.acts};$('start').hidden=true;AU.init();$('badge').hidden=false;
  if(o.choices)Store.data.choices=o.choices;const i=Math.max(0,SHOTS.findIndex(s=>s[0]===at));play(o.from?i:0);return true},
  paused:()=>D.qa&&D.qa.paused,slow(){D.speed=1;D.fast=false},fast(){D.speed=40;D.fast=true},resume(){D.qa.resume&&D.qa.resume()},shots:()=>SHOTS.map(s=>s[0])}}
