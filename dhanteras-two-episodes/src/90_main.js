/* ===== Main loop, shot list, start screen ===== */
const SHOTS=[['1.1','shot1_1'],['1.2','shot1_2'],['1.3','shot1_3'],['1.4','shot1_4'],['1.5','shot1_5'],['1.6','shot1_6'],['1.7','shot1_7'],['1.8','shot1_8'],['1.9','shot1_9'],['1.10','shot1_10'],
  ['2.1','shot2_1'],['2.2','shot2_2'],['2.3','shot2_3'],['2.4','shot2_4'],['2.5','shot2_5'],['2.6','shot2_6']].filter(s=>typeof window[s[1]]==='function');
/* production targets in seconds (Episode 1 7:30, Episode 2 7:30); title cards count inside the first shot of each episode */
const TARGETS=[['1.1','Ocean of Secrets (with title)',70],['1.2','Wake Up the Ocean',40],['1.3','Mountain That Sank',35],['1.4','Save the Sinking Mountain',40],['1.5','Kurma Supports',45],
  ['1.6','Great Churning',75],['1.7','Poison Spreads',30],['1.8','Who Can Save?',40],['1.9','Shiva Saves',50],['1.10','Golden Light Beneath',25],
  ['2.1','Treasures (with title)',60],['2.2','Discover the Treasures',30],['2.3','Dhanvantari Arrives',90],['2.4','Shloka',90],['2.5','True Wealth',75],['2.6','A Little Light',105]];
const epStart=ep=>Math.max(0,SHOTS.findIndex(s=>s[0].startsWith(String(ep)+'.')));
let lastT=performance.now(),hotT=0;
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt*Math.min(D.speed,4);T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const t=T.sec;try{if(D.old){D.old.update(dt,t);if(D.old._fade)op(D.old.root,D.old._fade.a)}if(D.scene)D.scene.update(dt,t)}catch(e){console.error(e)}
  const ins=D.insetRect();const tr=ins.s<1?`translate(${f1(ins.x)} ${f1(ins.y)}) scale(${f3(ins.s)})`:'';if(layers.scenes._tr!==tr){layers.scenes._tr=tr;tr?layers.scenes.setAttribute('transform',tr):layers.scenes.removeAttribute('transform')}
  if(now-hotT>250||Hot.dirty){hotT=now;Hot.dirty=false;Hot.sync()}
  requestAnimationFrame(frame)}
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();$('end').hidden=true;$('tray').hidden=true;$('tcard').hidden=true;$('shloka').hidden=true;D.inset=0;D.hideCap();D.clearAct();$('chant').hidden=true;
  try{for(let i=from;i<SHOTS.length;i++){const id=SHOTS[i][0];if(D.qa)D.qa.cur=id;Timing.start(id);await window[SHOTS[i][1]]();D.guard(tok);Timing.end(id);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===id){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function begin(fromEp){$('start').hidden=true;AU.init();AU.resume();Speech.init();
  if(fromEp>1){D.resumed=true;D.resumedAt=fromEp;D.replay=false}else{D.replay=!!Store.data.done||Store.data.ep>1;D.resumed=false;Store.data.choices={};Store.data.ep=1;Store.save()}
  play(epStart(fromEp||1))}
$('begin').addEventListener('click',()=>begin(1));
$('bResume').addEventListener('click',()=>begin(Store.data.ep));
$('bAgain').addEventListener('click',()=>{$('end').hidden=true;begin(1)});
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>{D.poke();D.skip()});
$('bCam').addEventListener('click',()=>Cam.toggle());
$('bCC').addEventListener('click',()=>{D.cc=!D.cc;$('bCC').setAttribute('aria-pressed',String(D.cc));$('cap').classList.toggle('off',!D.cc)});
/* boot */
Pat.init();layers.scenes=grp(svg);{const c=el('clipPath',{id:'stageClip'},Pat.defs);layers.clip=el('rect',{x:0,y:0,width:1778,height:810},c);layers.scenes.setAttribute('clip-path','url(#stageClip)')}Store.load();relayout();
window.addEventListener('resize',()=>relayout());if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
(function cover(){D.setScene(titleScene(1),0);const ep=Store.data.ep;if(ep>1&&!Store.data.done){const b=$('bResume');b.hidden=false;b.textContent='Continue: Episode '+ep}
  if(Store.data.done||ep>1)$('begin').textContent='Begin the adventure again'})();
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>Hot.dirty=true);
/* QA hook (#qa): window.__qa.go('1.4','act'|'late'|'end'|'all', {from, live, choices}) fast-forwards to a point in a shot */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,o){o=o||{};D.fast=!o.live;D.speed=D.fast?40:1;D.qa={at,stop:stop||'end',paused:false,cur:null,acts:!!o.acts,pick:o.pick};$('start').hidden=true;AU.init();
  if(o.choices)Store.data.choices=o.choices;const i=Math.max(0,SHOTS.findIndex(s=>s[0]===at));play(o.from?i:0);return true},
  paused:()=>D.qa&&D.qa.paused,slow(){D.speed=1;D.fast=false},fast(){D.speed=40;D.fast=true},resume(){D.qa.resume&&D.qa.resume()},shots:()=>SHOTS.map(s=>s[0])}}
