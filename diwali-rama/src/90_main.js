/* ===== Title cards, end cards, mood tags ===== */
/* Episode title cards are typeset page text laid over the opening picture; they are shown, not spoken */
async function titleCard(n,title){D.chip('');D.clearAct();Store.data.ep=Math.max(Store.data.ep||1,n);Store.save();
  const prev=(D.resumed&&n===D.resumedAt)||(D.replay&&n===2);D.resumed=false;
  $('tEye').textContent=`Diwali Stories of India · Episode ${n}`;$('tTitle').textContent=title;$('tSub').hidden=true;$('tcard').hidden=false;
  await D.wait(D.fast?5:3200);$('tcard').hidden=true;await D.wait(D.fast?5:300);
  if(prev&&PREV[n]){mood('warm');await D.say(PREV[n])}}
/* "Previously..." lines, used only when a replay or resume is detected (builder additions, flagged in the build notes) */
const PREV={2:'Previously, Rama, Lakshmana, Hanuman and the vanaras built a bridge across the ocean and reached the gates of Lanka.'};
/* the script's mood tags set the Narrator's pace, pitch and volume; they are never spoken */
const MOOD={warm:{rate:.9,pitch:1},inviting:{rate:.98,pitch:1.04},suspense:{rate:.88,pitch:.96},energetic:{rate:1.02,pitch:1.02},serious:{rate:.85,pitch:.94,vol:.92},
  gentle:{rate:.84,pitch:.98,vol:.95},cliff:{rate:.9,pitch:1.02},welcome:{rate:.98,pitch:1.05},respectful:{rate:.8,pitch:.97,vol:.95},heartfelt:{rate:.85,pitch:1}};
function mood(k){D.moodKey=k;D.setMood(MOOD[k]||{})}
/* end cards: typeset text over the final held picture */
async function endCard(n){D.clearAct();const e=$('end');$('endEye').textContent=n===1?'End of Episode 1':'Diwali Stories of India';
  if(n===1){$('endTitle').textContent='Continue the adventure in Episode 2.';$('endLine').textContent='';$('endLine').hidden=true;$('bNext').hidden=false;Store.set('ep',2)}
  else{$('endTitle').textContent='DIWALI STORIES OF INDIA';$('endLine').textContent='The light lives on in you.';$('endLine').hidden=false;$('bNext').hidden=true;Store.data.done=true;Store.data.ep=1;Store.save()}
  e.style.placeItems='center';e.hidden=false;
  /* Episode 1 flows on into Episode 2 after a pause, through the symmetrical gate patterns; the button goes straight there */
  if(n===1){const tok=D.token;await new Promise(r=>{D.nextEp=r;Timers.add(D.fast?10:14000,r)});if(tok!==D.token)throw ABORT;D.nextEp=null;e.hidden=true}
  else await new Promise(()=>{})}

/* ===== Main loop, shot list, start screen ===== */
const SHOTS=[['1.1','shot1_1'],['1.2','shot1_2'],['1.3','shot1_3'],['1.4','shot1_4'],['1.5','shot1_5'],['1.6','shot1_6'],['1.7','shot1_7'],['1.8','shot1_8'],
  ['2.1','shot2_1'],['2.2','shot2_2'],['2.3','shot2_3'],['2.4','shot2_4'],['2.5','shot2_5'],['2.6','shot2_6'],['2.7','shot2_7'],['2.8','shot2_8'],['2.9','shot2_9'],['2.10','shot2_10']].filter(s=>typeof window[s[1]]==='function');
/* production targets in seconds from the story document (Episode 1 9:00, Episode 2 11:00); title cards count inside the first shot of each episode */
const TARGETS=[['1.1','Golden City of Ayodhya',45],['1.2','A New Life in the Forest',45],['1.4','A Brave Friend Appears',60],
  ['1.6','The Ocean Challenge',60],['1.7','Build the Bridge',60],['1.8','The Journey to Lanka',135],
  ['2.1','The Battle for Hope',75],['2.2','Sita and Rama Reunite',45],['2.3','The Journey Home',45],['2.4','Ayodhya Gets Ready',45],['2.5','Light Up Ayodhya',75],
  ['2.6','Rama Returns',60],['2.7','What Does a Diya Teach Us?',45],['2.8','The Sacred Shloka',75],['2.9','Diya of Kindness',75],['2.10','Carry the Light',120]];
const epStart=ep=>Math.max(0,SHOTS.findIndex(s=>s[0].startsWith(String(ep)+'.')));
let lastT=performance.now(),hotT=0;
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt*Math.min(D.speed,4);T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx){Music.tick();Amb.tick()}
  const t=T.sec;try{if(D.old){D.old.update(dt,t);if(D.old._fade)op(D.old.root,D.old._fade.a)}if(D.scene)D.scene.update(dt,t)}catch(e){console.error(e)}
  if(now-hotT>250||Hot.dirty){hotT=now;Hot.dirty=false;Hot.sync()}
  requestAnimationFrame(frame)}
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();$('end').hidden=true;$('tcard').hidden=true;$('shloka').hidden=true;$('deed').hidden=true;Overlay.clear();
  Music.hush&&AU.ctx&&Music.quiet&&Music.hush(false);D.hideCap();D.clearAct();
  try{for(let i=from;i<SHOTS.length;i++){const id=SHOTS[i][0];if(D.qa)D.qa.cur=id;Timing.start(id);await window[SHOTS[i][1]]();D.guard(tok);Timing.end(id);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===id){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function begin(fromEp){$('start').hidden=true;AU.init();AU.resume();Speech.init();
  if(fromEp>1){D.resumed=true;D.resumedAt=fromEp;D.replay=false}else{D.replay=!!Store.data.done||Store.data.ep>1;D.resumed=false;Store.data.ep=1;Store.save()}
  play(epStart(fromEp||1))}
$('begin').addEventListener('click',()=>begin(1));
$('bResume').addEventListener('click',()=>begin(Store.data.ep));
$('bAgain').addEventListener('click',()=>{$('end').hidden=true;begin(1)});
$('bNext').addEventListener('click',()=>{D.poke();if(D.nextEp)D.nextEp()});
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>{D.poke();D.skip()});
$('bCam').addEventListener('click',()=>Cam.toggle());
$('bCC').addEventListener('click',()=>{D.cc=!D.cc;$('bCC').setAttribute('aria-pressed',String(D.cc));$('cap').classList.toggle('off',!D.cc)});
/* the cover picture behind the start card */
function coverScene(){const s=mkScene('cover',{frame:'gold'});artPart(s);const back=grp(s.comp);skyBg(s,{kind:'night',horizon:[560,1000],ground:['flower',P.gold,P.maroon,1],stars:14});
  onOrient(s,[back],P_=>{const c=grp(back,{transform:`translate(${LP(889,500)} ${LP(380,620)})`});const r=LP(250,300);halo(c,r+40,{bw:30});petalRing(c,r,24,P.verm,P.marigold,46);circ(c,0,0,r-10,Pat.u('stars',P.ivory,P.indigo,1),4);
    const d=keepArt(s,diya(c,{lit:1,light:1,decor:1}));d.s=LP(2,2.3);d.y=LP(90,100)});return s}
/* boot */
Pat.init();layers.scenes=grp(svg);Trans.init();{const c=el('clipPath',{id:'stageClip'},Pat.defs);layers.clip=el('rect',{x:0,y:0,width:1778,height:810},c);layers.scenes.setAttribute('clip-path','url(#stageClip)')}Store.load();relayout();
window.addEventListener('resize',()=>relayout());if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
(function cover(){D.setScene(coverScene(),0);const ep=Store.data.ep;if(ep>1&&!Store.data.done){const b=$('bResume');b.hidden=false;b.textContent='Continue: Episode '+ep}
  if(Store.data.done||ep>1)$('begin').textContent='Begin the story again'})();
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>Hot.dirty=true);
/* QA hook (#qa): window.__qa.go('1.4','act'|'late'|'end'|'all', {from, live, deed}) fast-forwards to a point in a shot */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,o){o=o||{};D.fast=!o.live;D.speed=D.fast?40:1;D.qa={at,stop:stop||'end',paused:false,cur:null,acts:!!o.acts};$('start').hidden=true;AU.init();
  if(o.deed!==undefined){Store.data.deed=o.deed}const i=Math.max(0,SHOTS.findIndex(s=>s[0]===at));play(o.from?i:0);return true},
  paused:()=>D.qa&&D.qa.paused,slow(){D.speed=1;D.fast=false},fast(){D.speed=40;D.fast=true},resume(){D.qa.resume&&D.qa.resume()},shots:()=>SHOTS.map(s=>s[0]),
  speech:()=>Speech.report(),cam:()=>Cam.state,fonts:()=>document.fonts?[...document.fonts].filter(f=>/Devanagari/.test(f.family)).map(f=>f.family+':'+f.status):[]}}
