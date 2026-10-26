/* ===== Boot: frame loop, start card, replay ===== */
let lastT=performance.now();
function frame(now){const dt=Math.min(50,now-lastT);lastT=now;const sdt=dt*Dir.speed;Clock.now+=sdt;
  Tw.update();Timers.update();Act.tick();AU.tick();
  if(Dir.sc&&Dir.R){Dir.S.t=Clock.now;try{Dir.apply(sdt)}catch(e){console.error(e)}}
  requestAnimationFrame(frame)}
function veilArt(){const g=$('veilArt');for(let i=0;i<8;i++){const p=el('path',{d:petalD(52,.42),fill:i%2?PAL.pink:PAL.gold,stroke:PAL.ink,'stroke-width':2.5,transform:`rotate(${i*45})`},g)}
  dot(g,0,0,14,PAL.verm,{stroke:PAL.ink,w:2.5});dot(g,0,0,5,PAL.ivory)}
function begin(from,keep){$('startCard').hidden=true;$('endBar').hidden=true;$('bSkip').hidden=false;$('bNext').hidden=false;AU.init();AU.resume();Narr.init();
  if(!keep)Store.setTreasures([]);Dir.go(from||0)}
$('bBegin').addEventListener('click',()=>begin(0,false));
$('bResume').addEventListener('click',()=>begin(Store.data.reached,true));
$('bReplay').addEventListener('click',()=>begin(0,false));
$('bExplore').addEventListener('click',()=>begin(0,true));
Store.load();Stage.init();HUD.init();veilArt();bindInput();Narr.init();
Dir.preview(0);Object.assign(Dir.S,{osp:1,fish:1,dev:1,vish:1,asu:1,worry:0});
if(Store.data.reached>0){const b=$('bResume');b.hidden=false;b.textContent=`Continue from Scene ${Store.data.reached+1}`}
window.addEventListener('resize',()=>Dir.relayout());
if(window.ResizeObserver)new ResizeObserver(()=>Dir.relayout()).observe($('app'));
document.addEventListener('visibilitychange',()=>{if(document.hidden&&Narr.ok)try{speechSynthesis.pause()}catch(e){}else if(Narr.ok)try{speechSynthesis.resume()}catch(e){}});
requestAnimationFrame(frame);
/* Test hook (only with #qa in the address): jump to a scene, speed up the clock, tap targets */
if(/qa/.test(location.hash))window.__qa={go(i,speed){Dir.speed=speed||1;$('startCard').hidden=true;AU.muted=true;Dir.go(i)},
  state:()=>({clock:Math.round(Clock.now),i:Dir.i,act:Act.cur?Act.cur.spec.keys:null,cap:$('cap').hidden?null:$('capText').textContent,end:!$('endBar').hidden,instr:$('instr').hidden?null:$('instrText').textContent}),
  hit:k=>Act.hit(k),speed:s=>{Dir.speed=s}};
