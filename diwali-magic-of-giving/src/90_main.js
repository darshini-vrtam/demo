/* ===== Main loop, shot list, title card ===== */
/* 22 shots in story order with their scene IDs (the three choices are Shots 2.2 to 2.4; the gratitude diya activity is Shot 3.3) */
const SHOTS=[['1.1','EP03_SC01_HOME',shot1_1],['1.2','EP03_SC01_HOME',shot1_2],['1.3','EP03_SC01_HOME',shot1_3],['1.4','EP03_SC01_HOME',shot1_4],
  ['2.1','EP03_SC02_KINDNESS',shot2_1],['2.2','EP03_SC02_KINDNESS',shot2_2],['2.3','EP03_SC02_KINDNESS',shot2_3],['2.4','EP03_SC02_KINDNESS',shot2_4],['2.5','EP03_SC02_KINDNESS',shot2_5],
  ['3.1','EP03_SC03_GRATITUDE',shot3_1],['3.2','EP03_SC03_GRATITUDE',shot3_2],['3.3','EP03_SC03_GRATITUDE',shot3_3],['3.4','EP03_SC03_GRATITUDE',shot3_4],
  ['4.1','EP03_SC04_MANTRA',shot4_1],['4.2','EP03_SC04_MANTRA',shot4_2],['4.3','EP03_SC04_MANTRA',shot4_3],
  ['5.1','EP03_SC05_FINALE',shot5_1],['5.2','EP03_SC05_FINALE',shot5_2],['5.3','EP03_SC05_FINALE',shot5_3],['5.4','EP03_SC05_FINALE',shot5_4],['5.5','EP03_SC05_FINALE',shot5_5],['5.6','EP03_SC05_FINALE',shot5_6]];
let lastT=performance.now(),hotT=0;
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt*Math.min(D.speed,4);T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const t=T.sec;try{if(D.old){D.old.update(dt,t);if(D.old._fade)op(D.old.root,D.old._fade.a)}if(D.scene)D.scene.update(dt,t)}catch(e){console.error(e)}
  if(now-hotT>250||Hot.dirty){hotT=now;Hot.dirty=false;Hot.sync()}
  requestAnimationFrame(frame)}
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();$('rest').hidden=true;$('endCard').hidden=true;$('endRow').hidden=true;$('choices').hidden=true;$('mantra').hidden=true;
  D.hideCap();D.clearAct();if(from===0){MEM.kind={};MEM.gratitude=[]}
  try{for(let i=from;i<SHOTS.length;i++){const id=SHOTS[i][0];if(D.qa)D.qa.cur=id;await SHOTS[i][2]();D.guard(tok);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===id){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function begin(){$('start').hidden=true;AU.init();AU.resume();Speech.init();play(0)}
$('begin').addEventListener('click',begin);
$('bAgain2').addEventListener('click',()=>{$('endCard').hidden=true;begin()});
$('bAgain').addEventListener('click',()=>{$('rest').hidden=true;begin()});
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>{D.poke();D.skip()});
$('bCam').addEventListener('click',()=>Cam.toggle());
$('bCC').addEventListener('click',()=>{D.cc=!D.cc;$('bCC').setAttribute('aria-pressed',String(D.cc));$('cap').classList.toggle('off',!D.cc)});
/* boot: the title card shows over the title scene (the Light floats in, lotus and diya motifs frame the text) */
Pat.init();layers.scenes=grp(svg);{const c=el('clipPath',{id:'stageClip'},Pat.defs);layers.clip=el('rect',{x:0,y:0,width:1778,height:810},c);layers.scenes.setAttribute('clip-path','url(#stageClip)')}Store.load();relayout();
MEM.kind=Object.assign({},Store.data.kind);MEM.gratitude=Store.data.gratitude.slice();
window.addEventListener('resize',()=>relayout());if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
D.setScene(titleStage(),0);
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{Hot.dirty=true;if(D.scene&&D.scene.onLayout)D.scene.onLayout()});
/* QA hook (#qa): window.__qa.go('2.2','end'|'late'|'act') fast-forwards to a point in a shot; __qa.pending() lists script lines still to fill */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,o){o=o||{};D.fast=!o.live;D.speed=D.fast?40:1;D.qa={at,stop:stop||'end',paused:false,cur:null};$('start').hidden=true;AU.init();
  const i=Math.max(0,SHOTS.findIndex(s=>s[0]===at));play(o.from?i:0);return true},
  paused:()=>D.qa&&D.qa.paused,slow(){D.speed=1;D.fast=false},fast(){D.speed=40;D.fast=true},shots:()=>SHOTS.map(s=>s[0]),pending:()=>[...PENDING_SEEN],mem:()=>MEM}}
