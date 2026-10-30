/* ===== Main loop, shot list, start screen ===== */
/* 20 shots in story order (Activities 1A to 1C are Shots 2.2 to 2.4, Activity 2 is Shot 4.3, Activity 3 is Shot 4.4); the number is the scene each belongs to */
const SHOTS=[['1.1',1,shot1_1],['1.2',1,shot1_2],['1.3',1,shot1_3],['2.1',2,shot2_1],['2.2',2,shot2_2],['2.3',2,shot2_3],['2.4',2,shot2_4],['2.5',2,shot2_5],['2.6',2,shot2_6],
  ['3.1',3,shot3_1],['3.2',3,shot3_2],['3.3',3,shot3_3],['3.4',3,shot3_4],['3.5',3,shot3_5],['4.1',4,shot4_1],['4.2',4,shot4_2],['4.3',4,shot4_3],['4.4',4,shot4_4],['4.5',4,shot4_5],['4.6',4,shot4_6]];
const sceneStart=n=>Math.max(0,SHOTS.findIndex(s=>s[1]===n));
let lastT=performance.now(),hotT=0;
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt*Math.min(D.speed,4);T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const t=T.sec;try{if(D.old){D.old.update(dt,t);if(D.old._fade)op(D.old.root,D.old._fade.a)}if(D.scene)D.scene.update(dt,t)}catch(e){console.error(e)}
  if(now-hotT>250||Hot.dirty){hotT=now;Hot.dirty=false;Hot.sync()}
  requestAnimationFrame(frame)}
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();$('rest').hidden=true;$('qpanel').hidden=true;$('tray').hidden=true;
  SK2.reset();D.hideCap();D.clearAct();
  /* resuming in a later scene restores the decorations the child already finished */
  if(from>=sceneStart(3)){TASKS.forEach(k=>TASKSTATE[k]=2)}else{TASKS.forEach(k=>TASKSTATE[k]=0)}
  try{for(let i=from;i<SHOTS.length;i++){const id=SHOTS[i][0];if(D.qa)D.qa.cur=id;await SHOTS[i][2]();D.guard(tok);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===id){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function begin(fromScene){$('start').hidden=true;AU.init();AU.resume();Speech.init();const n=fromScene||1;if(n===1){Store.data.done=false;Store.data.tasks={};Store.save()}play(sceneStart(n))}
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
(function cover(){const s=homeStage({state:DONE_STATE});s.H.lit=1;s.H.pujaLit=1;D.setScene(s,0);for(const k in s.F)s.F[k].vis=false;s.light.vis=true;s.light.x=LP(700,330);s.light.y=LP(300,520);
  const n=Store.data.scene;if(n>1&&!Store.data.done){const b=$('bResume');b.hidden=false;b.setAttribute('aria-label','Continue from scene '+n)}})();
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{Hot.dirty=true;if(D.scene&&D.scene.onLayout)D.scene.onLayout()});
/* QA hook (#qa): window.__qa.go('2.2','end'|'late'|'act') fast-forwards to a point in a shot; __qa.pending() lists script lines still to fill */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,o){o=o||{};D.fast=!o.live;D.speed=D.fast?40:1;D.qa={at,stop:stop||'end',paused:false,cur:null};$('start').hidden=true;AU.init();
  const i=Math.max(0,SHOTS.findIndex(s=>s[0]===at));play(o.from?i:0);return true},
  paused:()=>D.qa&&D.qa.paused,slow(){D.speed=1;D.fast=false},fast(){D.speed=40;D.fast=true},shots:()=>SHOTS.map(s=>s[0]),pending:()=>[...PENDING_SEEN]}}
