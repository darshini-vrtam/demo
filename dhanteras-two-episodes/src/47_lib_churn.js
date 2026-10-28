/* ================= EPISODE 2: THE MOUNTAIN, THE SERPENT, AND THE GREAT PLAN ================= */
function churnScene(o){o=o||{};const s=mkScene(o.id||'churn',{frame:o.frame||'vine'});
  oceanBg(s,{mood:o.mood||'team',seed:11,clouds:o.clouds||[[.12,.62,LP(200,150)],[.88,.5,LP(240,170)],[.5,.2,LP(170,120)]],stars:o.stars});
  const C=churnComp(s,o);s.C=C;s.medL=grp(s.comp);s.fx=fxLayer(s);s.demo=demoHand(s);
  s.onLayout=()=>{C.layout();s.onLayout2&&s.onLayout2()};return s}
/* one churning pull: one group leans back, the rope slides, the mountain turns a little */
async function churnPull(C,side,k){k=k||1;const g=side<0?C.devas:C.asuras;g.forEach(f=>f.vis&&(f.tgt.lean=16,f.tgt.fa=f.tgt.fa+6));AU.sfx('creak');
  D.go(C,{flow:C.flow+side*140*k,rot:C.rot+side*70*k},700,'out');await D.wait(560);g.forEach(f=>f.vis&&f.set('pull'))}
/* folk icons: a wooden chest, a low stool, a pile of clay toys */
function heavyIcon(parent,k){const g=grp(parent);circ(g,0,0,64,P.ivory,4);circ(g,0,0,54,'none',2.4,{stroke:P.gold,'stroke-dasharray':'.1 9','stroke-width':5,'stroke-linecap':'round'});
  if(k===0){shp(g,'M-36 -4H36V30H-36Z',Pat.u('vlines',P.ochre,P.terra,.7),3.2);shp(g,'M-38 -4Q0 -34 38 -4Z',P.ochre,3.2);ln(g,'M-36 10H36',P.turmeric,4);shp(g,'M-6 2H6V16H-6Z',P.turmeric,2.4)}
  else if(k===1){shp(g,'M-40 -8H40V4H-40Z',P.ochre,3.2);ln(g,'M-30 -2H30',P.verm,3,{'stroke-dasharray':'.1 8'});for(const x of[-32,-12,12,32])limb(g,`M${x} 4L${x+(x<0?-3:3)} 28`,P.terra,6)}
  else{shp(g,'M-34 26Q-40 4 -24 -4Q-8 4 -14 26Z',P.terra,3);circ(g,-24,-12,8,P.terra,3);shp(g,'M2 26L4 -2Q18 -12 28 -4L30 26Z',P.ochre,3);ln(g,'M8 8H26',P.ivory,3);
    shp(g,'M18 -8L22 -26L32 -20Z',P.terra,2.4);circ(g,34,18,10,P.verm,3);ln(g,'M26 18H42',P.turmeric,2.4)}
  return g}





/* Kurma rises under the sunken mountain, and Vishnu's medallion dissolves into his shell */
async function kurmaRescue(s,vm){const C=s.C;const A=C.A;const H=MANDARA.H*A.ms;
  const meet=1-((C.sink*H*.5+A.my)-(A.ky-112*A.ks))/300;AU.sfx('shell');D.go(C,{kurma:clamp(meet,0,1)},2000,'out');
  if(vm){const tx=A.kx,ty=A.ky-62*A.ks;D.go(vm,{x:tx,y:ty,s:(24*A.ks)/118},2600,'io');Timers.add(2300,()=>D.go(vm,{fade:1},700))}
  await D.wait(2000);D.go(C.K,{ring:1},1200);await D.wait(900)}
async function kurmaLift(s){const C=s.C;AU.sfx('shell');D.go(C,{crestK:0},1200);await D.tw(C,{sink:0,kurma:1},2600,'io');s.fx.ripple(C.A.mx,C.A.water,L.portrait?420:600,P.turmeric,1800,.22)}



/* a soft wave swirl that rewinds the scene for a "let's do it together" replay */
async function swirl(s,mid){const g=grp(s.top);const c=LP([889,420],[500,800]);const sp=[];for(let i=0;i<=80;i++){const t=i/80,a=t*TAU*3;sp.push([Math.cos(a)*t*700,Math.sin(a)*t*700])}
  ln(g,smooth(sp,false),K,30);ln(g,smooth(sp,false),P.turq,22);ln(g,smooth(sp,false),P.foam,6,{'stroke-dasharray':'.1 18'});const o={k:0};
  s.parts.push({update:()=>{tf(g,c[0],c[1],.05+Math.sin(o.k*Math.PI)*1.6,-o.k*400);op(g,o.k>0&&o.k<1?1:0)}});AU.sfx('swish');
  await D.tw(o,{k:.5},900,'in');mid&&mid();await D.tw(o,{k:1},900,'out');g.remove()}


