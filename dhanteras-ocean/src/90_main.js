/* ===== Main loop, start and end screens, controls ===== */
D.inset=0;
/* while picture cards are up, the painting shrinks into the space above them so no face is covered */
function insetRect(){if(D.inset<=.001)return{x:0,y:0,s:1};const tray=$('tray');let px=L.ph*.42;try{if(!tray.hidden){const r=tray.getBoundingClientRect(),a=app.getBoundingClientRect();px=a.bottom-r.top+12}}catch(e){}
  const st=clamp((L.ph-px-8)/L.ph,.3,1);const s=lerp(1,st,D.inset);return{x:(L.W-L.W*s)/2,y:lerp(0,6/L.U,D.inset),s}}
Input.toLogical=function(x,y){const r=cv.getBoundingClientRect();const lx=(x-r.left)/L.U,ly=(y-r.top)/L.U;const ins=insetRect();return{x:(lx-ins.x)/ins.s,y:(ly-ins.y)/ins.s}};

let lastT=performance.now();
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt;T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const s=D.scene;cx.setTransform(1,0,0,1,0,0);cx.fillStyle=getComputedStyle(app).backgroundColor||C.cream;cx.fillRect(0,0,cv.width,cv.height);
  World.update(dt);if(s===Celebration&&s.dhan)[s.dhan,s.lak,s.kub].forEach(f=>f.update(dt));
  if(s){const k=L.U*L.dpr,ins=insetRect();cx.setTransform(k*ins.s,0,0,k*ins.s,k*ins.x,k*ins.y);cx.lineCap='round';cx.lineJoin='round';
    if(ins.s<1){cx.save();cx.beginPath();cx.rect(0,0,L.W,L.H);cx.clip()}
    try{s.draw(cx);if(s!==World)FX.draw(cx)}catch(e){console.error(e)}
    if(ins.s<1)cx.restore();
    if(ins.s<1){const p=new Path2D();p.rect(-4,-4,L.W+8,L.H+8);dbl(cx,p,3/ins.s)}}
  const tr=D.trans;if(tr){const k=clamp((T.now-tr.t0)/tr.ms,0,1);cx.setTransform(1,0,0,1,0,0);cx.globalAlpha=1-ease(k);cx.drawImage(tr.snap,0,0);cx.globalAlpha=1;if(k>=1)D.trans=null}
  requestAnimationFrame(frame)}

/* start overlay: LET'S BEGIN unlocks audio and speech in the same tap */
const Start={res:null,wait(){if(D.fast||D.qa)return Promise.resolve();UI.cap('story',TXT.open);$('start').hidden=false;return new Promise(r=>this.res=r)},
  unlock(){AU.init();AU.resume();Speech.init();try{if(Speech.ok){const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}}catch(e){}}};
$('bBegin').addEventListener('click',()=>{Start.unlock();$('start').hidden=true;Store.reset();UI.stripOn=false;UI.strip();if(Start.res){const r=Start.res;Start.res=null;r()}else play(0,true)});
$('bResume').addEventListener('click',()=>{Start.unlock();$('start').hidden=true;resume(SAVED_CH)});

async function resume(ch){D.resumed=true;await play(CHAPTERS[ch].shot,true,RECAP[ch])}
/* play from a shot index; chapter starts reset the world so replays and resumes look right */
async function play(from,skipStart,recap){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();D.act=null;D.skipFn=null;D.inset=0;
  $('end').hidden=true;Cards.hide();UI.plaque(null);UI.cap(null);FX.petals=[];Hunt.onFind=null;
  if(!skipStart)$('start').hidden=true;
  const ch=CHAPTERS.reduce((a,c,i)=>c.shot<=from?i:a,0);
  if(ch>=1&&from===CHAPTERS[ch].shot){preset(ch);D.setScene(World,'fade',700)}
  UI.stripOn=Store.data.treasures.length>0||Store.data.gifts.length>0;UI.strip();
  try{if(recap){D.title(CHAPTERS[ch].t);UI.progress(SHOT_IDS[from]);await D.wait(600);await say(recap)}
    for(let i=from;i<SHOTS.length;i++){D.shot=SHOT_IDS[i];if(D.qa)D.qa.cur=i;await SHOTS[i]();D.guard(tok);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===i){D.qa.paused=true;D.fast=false;D.speed=1;if(D.qa.cap)UI.cap(D.qa.capWho||'story',D.qa.cap);await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}

const End={show(){const el=$('endIcons');el.innerHTML='';const d=Store.data;const add=(k)=>{const c=document.createElement('canvas');c.width=c.height=112;const g=c.getContext('2d');g.scale(112/120,112/120);g.translate(60,60);drawIcon(g,k,.8);c.title=k;el.append(c)};
    const l1=document.createElement('span');l1.className='lbl';l1.textContent='Treasures you found';el.append(l1);(d.treasures.length?d.treasures:['lotus','jewel','conch']).forEach(add);
    const l2=document.createElement('span');l2.className='lbl';l2.textContent='Gifts you carry home';el.append(l2);['leaf','heart','diya'].forEach(add);
    $('end').hidden=false;UI.cap(null);
    const t=d.treasures.length===3?`You found ${TREASURE_NAME[d.treasures[0]]} first, then ${TREASURE_NAME[d.treasures[1]]}, then ${TREASURE_NAME[d.treasures[2]]}. And you collected three gifts: health, kindness and gratitude.`:null;
    if(t)say(t).catch(()=>{})}};
$('bAgain').addEventListener('click',()=>{Start.unlock();Store.reset();UI.stripOn=false;UI.strip();play(1,false,null)});
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>D.skip());
$('bReplay').addEventListener('click',()=>{if(!$('start').hidden&&D.chapter===0)return;Start.unlock();const ch=D.chapter;if(ch===0){play(0,false);return}play(CHAPTERS[ch].shot,false,null)});
$('bCam').addEventListener('click',()=>Cam.toggle());

/* boot */
(function(){const p=$('prog');SHOT_IDS.forEach((id,i)=>{const e=document.createElement('i');if(CHAPTERS.some(c=>c.shot===i)&&i>0)e.classList.add('gap');p.append(e)})})();
const _prog=UI.progress;UI.progress=function(s){_prog.call(UI,s);const i=SHOT_IDS.indexOf(s);document.querySelectorAll('#prog i').forEach((e,j)=>{const g=e.classList.contains('gap');e.className=(j<i?'done':j===i?'now':'')+(g?' gap':'')})};
Store.load();relayout();window.addEventListener('resize',()=>relayout());if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
World.make();D.scene=World;const SAVED_CH=Store.data.done.length?Store.data.chapter:0;
if(Store.data.chapter>0&&Store.data.done.length){const b=$('bResume');b.hidden=false;b.textContent='Continue: '+CHAPTERS[Store.data.chapter].t.split(' · ')[0]}
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>Spr.clear());
/* QA hook (#qa): window.__qa.go(shotIndex,'end'|'act',{cap,portrait}) fast-forwards from that chapter's start */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,o){o=o||{};D.fast=stop!=='run';D.speed=stop==='run'?(o.speed||8):40;D.qa=Object.assign({at,stop:stop||'end',paused:false,cur:null},o);$('start').hidden=true;
    const ch=CHAPTERS.reduce((a,c,i)=>c.shot<=at?i:a,0);if(o.treasures)Store.data.treasures=o.treasures;play(CHAPTERS[ch].shot,true);return true},paused:()=>D.qa&&D.qa.paused}}
else play(0,true);
