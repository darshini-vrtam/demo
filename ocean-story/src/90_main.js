/* ===== Main loop, shot list, start ===== */
const SHOTS=[['title',shotTitle],['1.1',shot1_1],['1.2',shot1_2],['1.3',shot1_3],['1.4',shot1_4],['1.5',shot1_5],['end',shotFinal]];
let lastT=performance.now();
function frame(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt*Math.min(D.speed,4);T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const s=D.scene;cx.setTransform(1,0,0,1,0,0);cx.fillStyle=C.cream;cx.fillRect(0,0,cv.width,cv.height);if(D.inset>0){cx.setTransform(L.U*L.dpr,0,0,L.U*L.dpr,0,0);patDots(cx,0,0,L.W,L.H,26,2.2,C.turmeric)}
  if(s){s.anch();const k=L.U*L.dpr,ins=D.insetRect();cx.setTransform(k*ins.s,0,0,k*ins.s,k*ins.x,k*ins.y);cx.lineCap='round';cx.lineJoin='round';
    cx.save();cx.beginPath();cx.rect(0,0,L.W,L.Ha);cx.clip();
    try{s.draw(cx)}catch(e){console.error(e)}
    let hs=[];try{hs=s.hot()||[]}catch(e){}Hot.sync(hs);
    const f=Hot.focused();if(f)drawHighlight(cx,f.x,f.y,(f.r||Math.max(f.w,f.h)/2)+6,T.sec,1);
    if(Cam.hand){drawExplorerHand(cx,Cam.hand.x,Cam.hand.y,L.portrait?1.3:1.1,Cam.pinch);drawHighlight(cx,Cam.hand.x,Cam.hand.y,26,T.sec,.8)}
    cx.restore()}
  const tr=D.trans;if(tr){const p=clamp((T.now-tr.t0)/tr.ms,0,1);cx.setTransform(1,0,0,1,0,0);cx.globalAlpha=1-p;cx.drawImage(tr.snap,0,0);cx.globalAlpha=1;if(p>=1)D.trans=null}
  requestAnimationFrame(frame)}
async function play(from){const tok=++D.token;Tw.kill();Timers.kill();Speech.stop();D.q=Promise.resolve();D.inset=0;D.hideCap();D.clearAct();$('tray').hidden=true;$('tray').innerHTML='';
  try{for(let i=from;i<SHOTS.length;i++){if(D.qa)D.qa.cur=SHOTS[i][0];await SHOTS[i][1]();D.guard(tok);
      if(D.qa&&D.qa.stop==='end'&&D.qa.at===SHOTS[i][0]){D.qa.paused=true;await new Promise(()=>{})}}}
  catch(e){if(e!==ABORT)console.error(e)}}
function begin(){AU.init();AU.resume();Speech.init();play(0)}
$('bMute').addEventListener('click',()=>{const m=!AU.muted;AU.setMute(m);if(m)Speech.stop();$('bMute').setAttribute('aria-pressed',String(m));$('bMute').setAttribute('aria-label',m?'Turn sound on':'Mute sound');$('mWave').style.display=m?'none':'';$('mX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>D.skip());
$('bCam').addEventListener('click',()=>{AU.resume();Cam.toggle()});
if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia)$('bCam').hidden=true;
/* boot: the title card waits behind a Begin button (sound can only start after a tap) */
Store.load();relayout();window.addEventListener('resize',()=>{relayout();D.chip(D.chipText)});
if(window.ResizeObserver)new ResizeObserver(()=>relayout()).observe(app);
D.scene=titleScene();
D.instr('A storyteller reads this story aloud. Tap, drag or use the keyboard when a picture asks for your help.','');
D.controls([{id:'begin',label:Store.data.plays>0?'Read again':'Begin the story',on:()=>begin()}]);
Speech.init();requestAnimationFrame(frame);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>Bake.clear());
/* QA hook (#qa): window.__qa.go('1.3','act'|'end') fast-forwards to a shot */
if(/qa/.test(location.hash)){window.__qa={go(at,stop,wait){D.fast=true;D.speed=40;D.qa={at,stop:stop||'end',wait,paused:false,cur:null};AU.init();
  const i=Math.max(0,SHOTS.findIndex(s=>s[0]===at));play(stop==='from'?i:0);return true},paused:()=>D.qa&&D.qa.paused,
  live(){D.fast=false;D.speed=1}}}
