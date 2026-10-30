/* ===== Main loop, shot list, start screen ===== */
/* 14 shots and 4 activities in story order; the number is the scene each belongs to (resume starts at the first entry of the last scene reached) */
const SHOTS=[['1.1',1,shot1_1],['1.2',1,shot1_2],['1.3',1,shot1_3],['INT-01',1,act1],['INT-02',1,act2],['2.1',2,shot2_1],['2.2',2,shot2_2],
  ['3.1',3,shot3_1],['3.2',3,shot3_2],['3.3',3,shot3_3],['4.1',4,shot4_1],['4.2',4,shot4_2],['INT-04',4,act4],['4.3',4,shot4_3],['5.1',5,shot5_1],['5.2',5,shot5_2],['5.3',5,shot5_3]];
const sceneStart=n=>Math.max(0,SHOTS.findIndex(s=>s[1]===n));
let lastT=performance.now(),hotT=0;
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt*Math.min(D.speed,4);T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const t=T.sec;try{if(D.old){D.old.update(dt,t);if(D.old._fade)op(D.old.root,D.old._fade.a)}if(D.scene)D.scene.update(dt,t)}catch(e){console.error(e)}
  if(now-hotT>250||Hot.dirty){hotT=now;Hot.dirty=false;Hot.sync()}
  requestAnimationFrame(frame)}
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();$('rest').hidden=true;$('endCard').hidden=true;$('tray').hidden=true;$('tray').innerHTML='';
  SK.reset();D.hideCap();D.clearAct();
  try{for(let i=from;i<SHOTS.length;i++){const id=SHOTS[i][0];if(D.qa)D.qa.cur=id;await SHOTS[i][2]();D.guard(tok);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===id){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function begin(fromScene){$('start').hidden=true;AU.init();AU.resume();Speech.init();
  const n=fromScene||1;if(n===1){Store.data.done=false;Store.save()}play(sceneStart(n))}
$('begin').addEventListener('click',()=>begin(1));
$('bResume').addEventListener('click',()=>begin(Store.data.scene));
$('bAgain').addEventListener('click',()=>{$('rest').hidden=true;begin(1)});
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>{D.poke();D.skip()});
$('bCam').addEventListener('click',()=>Cam.toggle());
$('bCC').addEventListener('click',()=>{D.cc=!D.cc;$('bCC').setAttribute('aria-pressed',String(D.cc));$('cap').classList.toggle('off',!D.cc)});
/* boot */
Pat.init();layers.scenes=grp(svg);{const c=el('clipPath',{id:'stageClip'},Pat.defs);layers.clip=el('rect',{x:0,y:0,width:1778,height:810},c);layers.scenes.setAttribute('clip-path','url(#stageClip)')}Store.load();relayout();
window.addEventListener('resize',()=>relayout());if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
(function cover(){const s=oceanStage();s.mode='row';['K','A','V'].forEach(k=>s.T[k].rise=1);s.st.tort=0;D.setScene(s,0);
  const n=Store.data.scene;if(n>1&&!Store.data.done){const b=$('bResume');b.hidden=false;b.setAttribute('aria-label','Continue from scene '+n)}})();
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{Hot.dirty=true;if(D.scene&&D.scene.onLayout)D.scene.onLayout()});
/* QA hook (#qa): window.__qa.go('2.1','end'|'late'|'act') fast-forwards to a point in a shot */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,o){o=o||{};D.fast=!o.live;D.speed=D.fast?40:1;D.qa={at,stop:stop||'end',paused:false,cur:null};$('start').hidden=true;AU.init();
  const i=Math.max(0,SHOTS.findIndex(s=>s[0]===at));play(o.from?i:0);return true},
  paused:()=>D.qa&&D.qa.paused,slow(){D.speed=1;D.fast=false},fast(){D.speed=40;D.fast=true},shots:()=>SHOTS.map(s=>s[0])}}
