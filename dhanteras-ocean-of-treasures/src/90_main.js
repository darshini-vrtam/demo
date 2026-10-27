/* ===== Main loop ===== */
let lastT=performance.now();
function loop(now){const dt=Math.min(.05,(now-lastT)/1000);lastT=now;T.sec+=dt;T.now+=dt*1000*D.speed;Tw.update();Timers.update();if(AU.ctx)Music.tick();
  const S=D.scene;cx.setTransform(1,0,0,1,0,0);cx.fillStyle=C.deep;cx.fillRect(0,0,cv.width,cv.height);
  if(S){if(S.update)S.update(dt);cx.setTransform(L.PX,0,0,L.PX,L.ox*L.dpr,L.oy*L.dpr);cx.lineCap='round';cx.lineJoin='round';
    try{S.draw(cx,T.now/1000);frameBorder(S)}catch(e){console.error(e)}}
  const tr=D.trans;if(tr){const k=clamp((T.now-tr.t0)/tr.ms,0,1);cx.setTransform(1,0,0,1,0,0);cx.globalAlpha=1-Ease.io(k);cx.drawImage(tr.snap,0,0);cx.globalAlpha=1;if(k>=1)D.trans=null}
  requestAnimationFrame(loop)}
function frameBorder(S){cx.save();frame(cx,S.border);cx.restore()}

/* ===== Controls ===== */
function setPaused(p){D.paused=p;$('bPlay').setAttribute('aria-pressed',String(p));$('bPlay').setAttribute('aria-label',p?'Play narration':'Pause narration');$('gPlay').setAttribute('d',p?'M7 5l12 7-12 7z':'M8 5v14M16 5v14');if(p){Speech.stop();Mantra.stop()}}
$('bPlay').addEventListener('click',()=>{AU.resume();setPaused(!D.paused)});
$('bReplay').addEventListener('click',()=>{AU.resume();setPaused(false);D.go(D.i,{noCard:true})});
$('bHelp').addEventListener('click',()=>{AU.resume();const t=[$('actHead').textContent,$('prompt').textContent].filter(Boolean).join('. ');if(!t)return;UI.pulse();if(!AU.muted&&Speech.available()){Speech.stop();Speech.speak(t)}else UI.status(t,true)});
$('bSubs').addEventListener('click',()=>{const on=$('bSubs').getAttribute('aria-pressed')!=='true';$('bSubs').setAttribute('aria-pressed',String(on));$('cap').classList.toggle('off',!on)});
$('bMute').addEventListener('click',()=>{AU.init();const m=!AU.muted;AU.setMute(m);if(m){Speech.stop();Mantra.stop()}$('bMute').setAttribute('aria-pressed',String(m));$('bMute').setAttribute('aria-label',m?'Unmute sound':'Mute all sound');$('gWave').style.display=m?'none':'';$('gX').style.display=m?'':'none'});
$('bSkip').addEventListener('click',()=>{AU.resume();D.skip()});
$('bCam').addEventListener('click',()=>{AU.resume();Cam.toggle()});
$('bPrev').addEventListener('click',()=>{AU.resume();setPaused(false);D.go(D.i-1,{noCard:false})});
$('bNext').addEventListener('click',()=>{AU.resume();setPaused(false);if(D.done[D.i])D.go(D.i+1)});
$('bOlderClose').addEventListener('click',()=>{$('older').hidden=true});
$('older').addEventListener('keydown',e=>{if(e.key==='Escape')$('older').hidden=true});
$('bBegin').addEventListener('click',()=>{AU.init();AU.resume();Speech.init();try{if(Speech.ok){const u=new SpeechSynthesisUtterance(' ');u.volume=0;speechSynthesis.speak(u)}}catch(e){}$('start').hidden=true;D.go(0)});

/* ===== Boot ===== */
Store.load();UI.init();relayout();window.addEventListener('resize',relayout);if(window.ResizeObserver)new ResizeObserver(relayout).observe(stage);
Speech.init();D.scene=S1;S1.enter();UI.header(S1);UI.nav();requestAnimationFrame(loop);
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>Spr.clear());
/* QA hook (#qa): __qa.go(i,'end'|'act'|'run') fast-forwards screen i to its late frame (end), its activity (act), or plays it */
if(/qa/.test(location.hash)){$('start').hidden=true;window.__qa={go(i,stop,o){o=o||{};D.qa=Object.assign({at:i,stop:stop||'end',paused:false},o);D.fast=stop!=='run';D.speed=stop==='run'?(o.speed||4):40;
    if(o.treasure)Store.data.treasure=o.treasure;D.go(i,{noCard:true});return true},paused:()=>!!(D.qa&&D.qa.paused),
  info:()=>({voice:Speech.describe(),hi:Speech.hiVoice?Speech.hiVoice.name:null,cam:Cam.status,screen:D.i,done:D.done.slice()})}}
