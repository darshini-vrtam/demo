/* ===== Main loop, shot list, start screen ===== */
const SHOTS=[['1.1',shot1_1],['1.2',shot1_2],['1.3',shot1_3],['1.4',shot1_4],['1.5',shot1_5],['1.6',shot1_6],['1.7',shot1_7],['1.8',shot1_8],['1.9',shot1_9],['1.10',shot1_10],
  ['2.1',shot2_1],['2.2',shot2_2],['2.3',()=>shot2_3()],['2.4',shot2_4],['2.5',shot2_5],['2.6',shot2_6],['2.7',shot2_7],
  ['3.1',shot3_1],['3.2',shot3_2],['3.3',()=>shot3_3()],['3.4',shot3_4],['3.5',shot3_5],['3.6',shot3_6],['3.7',shot3_7]];
let lastT=performance.now();
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt;T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const s=D.scene;cx.setTransform(1,0,0,1,0,0);cx.fillStyle=getComputedStyle(document.body).backgroundColor||C.ivory;cx.fillRect(0,0,cv.width,cv.height);
  if(s){s.anch&&s.anch();for(const a of s.actors||[])a.update(dt*Math.min(D.speed,8));
    const k=L.U*L.dpr,ins=D.insetRect();cx.setTransform(k*ins.s,0,0,k*ins.s,k*ins.x,k*ins.y);cx.lineCap='round';cx.lineJoin='round';
    try{s.draw(cx)}catch(e){console.error(e)}
    if(ins.s<1){cx.setTransform(k*ins.s,0,0,k*ins.s,k*ins.x,k*ins.y);R.rect(cx,-6,-6,L.W+12,L.H+12,null,{sw:6/ins.s,stroke:C.brown})}
    if(Cam.hand){cx.setTransform(k*ins.s,0,0,k*ins.s,k*ins.x,k*ins.y);ring(cx,Cam.hand.x,Cam.hand.y,Cam.pinch?20:30,C.gold,6);dot(cx,Cam.hand.x,Cam.hand.y,6,C.verm)}}
  const tr=D.trans;if(tr){const k=clamp((T.now-tr.t0)/tr.ms,0,1);cx.setTransform(1,0,0,1,0,0);
    if(tr.how==='wipe'){const e=Ease.io(k),x=e*(cv.width+120);cx.save();cx.beginPath();cx.moveTo(x,0);for(let y=0;y<=cv.height;y+=40)cx.lineTo(x+((y/40)%2?28:0),y);cx.lineTo(cv.width+200,cv.height);cx.lineTo(cv.width+200,0);cx.closePath();cx.clip();cx.drawImage(tr.snap,0,0);cx.restore();
      cx.beginPath();for(let y=0;y<=cv.height;y+=40)cx.lineTo(x+((y/40)%2?28:0),y);cx.strokeStyle=C.mustard;cx.lineWidth=18*L.dpr;cx.stroke();cx.strokeStyle=C.brown;cx.lineWidth=4*L.dpr;cx.stroke()}
    else{cx.globalAlpha=1-k;cx.drawImage(tr.snap,0,0);cx.globalAlpha=1}if(k>=1)D.trans=null}
  if(D.black>0){cx.setTransform(1,0,0,1,0,0);cx.fillStyle=ca(C.charcoal,D.black);cx.fillRect(0,0,cv.width,cv.height)}
  requestAnimationFrame(frame)}
const _setScene=D.setScene.bind(D);D.setScene=function(s,how,ms){const r=_setScene(s,how||'fade',ms);if(this.black>0&&how!=='cut'){this.black=0}return r};
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();D.black=0;$('end').hidden=true;$('tray').hidden=true;$('faces').hidden=true;D.inset=0;D.hideCap();
  try{for(let i=from;i<SHOTS.length;i++){if(D.qa)D.qa.cur=SHOTS[i][0];await SHOTS[i][1]();D.guard(tok);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===SHOTS[i][0]){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function resumeEp(){const c=Store.data.choices;if(c.e3d1||c.e3d2)return 3;if(c.e2d1)return 2;if(c.e1d2)return 2;return 0}
const epStart={1:0,2:10,3:17};
function begin(fromEp){$('start').hidden=true;AU.init();AU.resume();Speech.init();
  if(fromEp>1){D.resumed=true;D.resumedAt=fromEp}else{Store.clearChoices();D.resumed=false}play(epStart[fromEp||1])}
$('bBegin').addEventListener('click',()=>begin(1));
$('bResume').addEventListener('click',()=>begin(resumeEp()));
$('bAgain').addEventListener('click',()=>{$('end').hidden=true;begin(1)});
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>D.skip());
$('bCam').addEventListener('click',()=>Cam.toggle());
/* boot */
Store.load();relayout();window.addEventListener('resize',()=>relayout());
if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
(function cover(){const s=shelfScene();s.lit=Store.data.shelf.slice();D.scene=s;const re=resumeEp();if(re>1){const b=$('bResume');b.hidden=false;b.textContent='Continue: Episode '+re}
  if(Store.data.shelf[0])$('bBegin').textContent='Play again from the start'})();
Speech.init();
requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>Bake.clear());
/* QA hook: #qa fast-forwards; window.__qa.go('1.5','end'|'choice', 'A'|'B') */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,pick,wait){if(pick)['e1d1','e1d2','e2d1','e3d1','e3d2'].forEach(k=>Store.data.choices[k]=pick);D.fast=stop!=='live';D.speed=D.fast?40:1;D.qa={at,stop:stop||'end',pick,wait,paused:false,cur:null};$('start').hidden=true;
  play(Math.max(0,SHOTS.findIndex(s=>s[0]===at)));return true},
  paused:()=>D.qa&&D.qa.paused,slow(){D.speed=1;D.fast=false}}}
