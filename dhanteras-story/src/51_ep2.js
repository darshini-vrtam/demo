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

async function shot2_1(){await titleCard(2,'The Mountain, the Serpent, and the Great Plan');D.chip('Episode 2 · The Great Plan');Music.mood('team');
  const s=churnScene();const C=s.C;Object.assign(C,{mIn:0,wrap:0,dK:0,aK:0,kurma:0,ledgeK:0});D.setScene(s,1200);
  const vm=figMed(s.medL,'vishnu',118);s.parts.push(vm);s.onLayout2=()=>{const m=C.A.med;vm.x=m[0];vm.y=m[1]};s.onLayout2();s.cast.vishnu=vm.figs[0];D.cast=s.cast;
  C.devas.concat(C.asuras).forEach(f=>f.set('pull'));
  await D.wait(700);
  await D.say('Lord Vishnu now explained what they would need.',{cues:[['Vishnu',()=>{AU.sfx('chime');D.go(vm,{s:1},900,'back')}]]});
  await D.say([['vishnu','“To churn an ocean this vast,”'],['narr','He said,'],['vishnu','“we will need a strong mountain, a mighty rope, and a firm foundation.”']]);
  await D.say('First came Mount Mandara, a magnificent mountain that would act as the churning stick.',{cues:[['Mount Mandara',()=>{AU.sfx('rumble');D.go(C,{mIn:1},2400,'out')}]]});
  await D.say('Next came Vasuki, the great serpent king, who would serve as the rope.',{cues:[['Vasuki',()=>{AU.sfx('swish');D.go(C,{wrap:1},4600,'io')}]]});
  D.go(vm,{s:0},800);
  await D.say('The devas would pull from one side.',{cues:[['devas',()=>{D.go(C,{dK:1,ledgeK:1},1000)}]]});
  await D.say('The asuras would pull from the other.',{cues:[['asuras',()=>{D.go(C,{aK:1},1000)}]]});
  const demo=(async()=>{await churnPull(C,-1);await churnPull(C,1);await churnPull(C,-1)})().catch(()=>{});
  await D.say('By pulling first one way and then the other, they would turn the mountain and churn the ocean.');await demo;
  /* three small folk icons appear in a row, a pause, then they fade */
  const ic=grp(s.medL);const icons=[0,1,2].map(k=>heavyIcon(ic,k));const io={k:0};s.parts.push({update:()=>{const y=LP(150,270),xs=LP([620,889,1158],[230,500,770]);icons.forEach((g,i)=>tf(g,xs[i],y,.2+.8*clamp(io.k*3-i,0,1)*(L.portrait?1.05:1)));op(ic,io.k>0?1:0)}});
  await D.say('But tell me, children, have you ever tried to move something very heavy all by yourself?',{cues:[['very heavy',()=>{D.go(io,{k:1},1500,'out')}]]});
  await D.wait(2000);
  await D.say('Perhaps a big box, a table, or a pile of toys?');
  D.go(io,{k:0},900);
  await D.say('Sometimes, when something is too difficult for one person, working together makes it possible.');
  groupSet(C.devas,'relieved');groupSet(C.asuras,'relieved');
  await D.say('That was exactly what the devas and asuras needed to do.');
  groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
  await D.say('They gathered around the great mountain.');
  await D.say('Vasuki curled his enormous body around Mount Mandara, forming a living rope.',{cues:[['curled',()=>{D.go(C,{flow:C.flow+260},2400)}]]});
  await D.say('The devas took one side.',{cues:[['devas',()=>C.devas.forEach(f=>f.heave=.6)]]});
  await D.say('The asuras took the other.',{cues:[['asuras',()=>C.asuras.forEach(f=>f.heave=.6)]]});
  await D.say('Everyone was ready.');await D.late()}

async function shot2_2(){D.chip('Episode 2 · The Mountain Sinks');let s=D.scene;if(!s||s.id!=='churn'){s=churnScene();s.C.kurma=0;D.setScene(s)}const C=s.C;C.kurma=0;
  const wl=()=>[C.A.mx,C.A.water];const rip=()=>{const p=wl();s.fx.ripple(p[0],p[1],L.portrait?380:520,P.foam,1800,.22);s.fx.ripple(p[0],p[1],L.portrait?260:360,P.turq,1500,.22)};
  await D.say('Almost everyone, that is.');
  await D.say('There was just one tiny problem.');
  await D.say('Mount Mandara was enormously heavy!',{cues:[['heavy',()=>{AU.sfx('rumble');D.go(C,{sink:.06},900)}]]});
  D.go(C,{crestK:1},800);
  const ch=(async()=>{await churnPull(C,-1);await churnPull(C,1)})().catch(()=>{});
  await D.say('As the churning began, the mountain started sinking into the ocean.',{cues:[['sinking',()=>{D.go(C,{sink:.18},1600);rip()}]]});await ch;
  C.devas.concat(C.asuras).forEach(f=>f.heave=0);
  await D.say('Down it went.');
  for(const [w,k] of[['Lower.',.42],['Lower.',.7],['Lower!',1]]){AU.sfx('rumble');rip();D.go(C,{sink:k},1100,'io');await D.say(w,{after:500})}
  groupSet(C.devas,'alarmed');
  await D.say([['devas','“Oh no!”'],['narr','cried the devas.'],['devas','“Our mountain is sinking! How will we churn the ocean now?”']]);
  groupSet(C.asuras,'alarmed');
  await D.say('The asuras watched in alarm.');
  groupSet(C.devas,'worried');
  await D.say('Their great plan was about to fail before it had even begun.');await D.late()}

/* Kurma rises under the sunken mountain, and Vishnu's medallion dissolves into his shell */
async function kurmaRescue(s,vm){const C=s.C;const A=C.A;const H=MANDARA.H*A.ms;
  const meet=1-((C.sink*H*.5+A.my)-(A.ky-112*A.ks))/300;AU.sfx('shell');D.go(C,{kurma:clamp(meet,0,1)},2000,'out');
  if(vm){const tx=A.kx,ty=A.ky-62*A.ks;D.go(vm,{x:tx,y:ty,s:(24*A.ks)/118},2600,'io');Timers.add(2300,()=>D.go(vm,{fade:1},700))}
  await D.wait(2000);D.go(C.K,{ring:1},1200);await D.wait(900)}
async function kurmaLift(s){const C=s.C;AU.sfx('shell');D.go(C,{crestK:0},1200);await D.tw(C,{sink:0,kurma:1},2600,'io');s.fx.ripple(C.A.mx,C.A.water,L.portrait?420:600,P.turmeric,1800,.22)}

async function shot2_3(){D.chip('Episode 2 · Kurma Arrives');let s=D.scene;if(!s||s.id!=='churn'){s=churnScene();Object.assign(s.C,{kurma:0,sink:1,crestK:1});D.setScene(s);groupSet(s.C.devas,'worried');groupSet(s.C.asuras,'alarmed')}const C=s.C;
  const vm=figMed(s.medL,'vishnu',118);vm.fade=0;const m0=C.A.med;vm.x=m0[0];vm.y=m0[1];s.parts.push(vm,{update:()=>op(vm.m.g,vm.s>.02?1-vm.fade:0)});s.cast.vishnu=vm.figs[0];
  await D.say('Just when everyone thought there was no way forward, Lord Vishnu came to their rescue.',{cues:[['Lord Vishnu',()=>{AU.sfx('chime');D.go(vm,{s:1},1000,'back')}]]});
  let res;await D.say('He took the form of Kurma, the divine tortoise.',{cues:[['He took the form',()=>{res=kurmaRescue(s,vm)}]]});await res;
  let lift;await D.say('Kurma dived beneath the ocean and supported Mount Mandara on His mighty back.',{cues:[['supported',()=>{lift=kurmaLift(s)}]]});await lift;
  groupSet(C.devas,'relieved');groupSet(C.asuras,'relieved');
  await D.say('The mountain was steady once more.');
  groupSet(C.devas,'cheer');Timers.add(400,()=>groupSet(C.asuras,'cheer'));AU.sfx('success');
  await D.say('The great churning could begin!');await D.wait(800);await D.late()}

/* a soft wave swirl that rewinds the scene for a "let's do it together" replay */
async function swirl(s,mid){const g=grp(s.top);const c=LP([889,420],[500,800]);const sp=[];for(let i=0;i<=80;i++){const t=i/80,a=t*TAU*3;sp.push([Math.cos(a)*t*700,Math.sin(a)*t*700])}
  ln(g,smooth(sp,false),K,30);ln(g,smooth(sp,false),P.turq,22);ln(g,smooth(sp,false),P.foam,6,{'stroke-dasharray':'.1 18'});const o={k:0};
  s.parts.push({update:()=>{tf(g,c[0],c[1],.05+Math.sin(o.k*Math.PI)*1.6,-o.k*400);op(g,o.k>0&&o.k<1?1:0)}});AU.sfx('swish');
  await D.tw(o,{k:.5},900,'in');mid&&mid();await D.tw(o,{k:1},900,'out');g.remove()}

async function shot2_4(){D.chip('Episode 2 · Help Kurma Hold the Mountain');let s=D.scene;if(!s||s.id!=='churn'){s=churnScene();D.setScene(s)}const C=s.C;const tok=D.token;
  await swirl(s,()=>{Object.assign(C,{kurma:0,sink:0});C.K.ring=0;groupSet(C.devas,'pull');groupSet(C.asuras,'pull')});
  const A=()=>C.A,H=()=>MANDARA.H*A().ms;const handlePos=()=>[A().mx,C.base()-H()*.32];
  const hT=target(s.top,58);const knob=grp(s.top);circ(knob,0,0,30,P.turmeric,4);ln(knob,'M0 -14V14M-10 -4L0 -14L10 -4M-10 4L0 14L10 4',K,3.4);
  const holdArc=el('circle',{r:44,fill:'none',stroke:P.verm,'stroke-width':9,'stroke-dasharray':'0 999',transform:'rotate(-90)'},knob);
  const st={on:0,hold:0};s.parts.push({update:t=>{const p=handlePos();hT.x=p[0];hT.y=p[1];hT.on=st.on;hT.update(t);tf(knob,p[0],p[1],1);op(knob,st.on);
    holdArc.setAttribute('stroke-dasharray',`${f1(st.hold*276)} 999`)}});
  s.hots=()=>st.on>.5?[{id:'handle',label:st.dir>0?'Mountain handle: press to lower the mountain':'Mountain handle: press to lift the mountain',x:handlePos()[0],y:handlePos()[1],r:70,on:()=>s.keyStep&&s.keyStep()}]:
    st.shell?[{id:'shellL',label:'Shell pieces: press to bring them together',x:A().mx,y:A().ky-60*A().ks,r:90,on:()=>s.keyStep&&s.keyStep()}]:[];
  await D.say('Oh, Ocean Explorers! The mountain is sinking!');
  await D.say('Can you help us?');
  await D.say('Slowly crouch down as the mountain sinks.');
  /* ---- stage A: lower, lower, lower ---- */
  {let drag=null;st.dir=1;D.go(st,{on:1},500);D.go(C,{crestK:1},600);Hot.dirty=true;D.instr('Drag the glowing handle slowly down.','','down');
    const setSink=v=>{const k=clamp(v,0,1);if(k>C.sink+.002){C.sink=lerp(C.sink,k,.5);if(Math.random()<.08)AU.sfx('rumble')}};
    s.down=p=>{const h=handlePos();if(Math.hypot(p.x-h[0],p.y-h[1])<120)drag={y0:p.y,s0:C.sink};else s.fx.ripple(p.x,p.y,60,P.foam,700)};
    s.move=p=>{if(drag)setSink(drag.s0+(p.y-drag.y0)/(H()*.5))};s.up=()=>{drag=null};
    s.keyStep=()=>setSink(C.sink+.34);s.camHand=h=>{const top=LP(250,500),bot=LP(760,1350);setSink((h.p.y-top)/(bot-top))};
    const steps=D.say('Lower... lower... lower!',{cues:[['Lower',()=>D.go(C,{sink:Math.max(C.sink,.34)},1200)],['lower...',()=>D.go(C,{sink:Math.max(C.sink,.67)},1200)],['lower!',()=>D.go(C,{sink:Math.max(C.sink,1)},1200)]]});
    await D.task({hint:'Slide the mountain gently down.',start(t){const iv=setInterval(()=>{if(C.sink>=.97){clearInterval(iv);t.finish()}},120);},
      demo(){const h=handlePos();s.demo.drag([h,[h[0],h[1]+H()*.4]],1400)},async assist(t){await D.tw(C,{sink:1},1600);t.finish()}});
    await steps;await D.tw(C,{sink:1},500);s.down=s.move=s.up=s.camHand=null;D.go(st,{on:0},400);D.clearAct()}
  groupSet(C.devas,'alarmed');groupSet(C.asuras,'alarmed');
  await D.say('But wait!');
  await D.say('Someone is coming to help!');
  /* ---- stage B: two shell halves come together ---- */
  const sh=grp(s.top);const half=sd=>{const g=grp(sh);const d=sd<0?'M0 0L-182 0C-172 -82 -100 -114 0 -114Z':'M0 0L182 0C172 -82 100 -114 0 -114Z';
    shp(g,d,Pat.u('rock',P.turmeric,P.gold,.8),5);ln(g,sd<0?'M-176 8H0':'M0 8H176',P.terra,10);circ(g,0,-62,sd<0?0:0,'none',0);return g};const hl=half(-1),hr=half(1);
  const ho={sep:1,on:0};const hT2=target(s.top,70);
  s.parts.push({update:t=>{const a=A(),far=LP(330,250);const y=a.ky-20*a.ks;tf(hl,a.mx-far*ho.sep-4*(1-ho.sep),y,a.ks);tf(hr,a.mx+far*ho.sep+4*(1-ho.sep),y,a.ks);op(sh,ho.on);
    hT2.x=a.mx-far*ho.sep-90*a.ks;hT2.y=y-50*a.ks;hT2.on=ho.on*(ho.sep>.05?1:0)*(st.shell?1:0);hT2.update(t)}});
  await D.say('Kurma has arrived!',{cues:[['Kurma',()=>{AU.sfx('shell');D.go(ho,{on:1},700)}]]});
  await D.say('Bring your hands together like a tortoise shell.');
  {let drag=null,done=false;st.shell=1;Hot.dirty=true;D.instr('Drag the two shell pieces together.','','join');
    const snap=async()=>{if(done)return;done=true;AU.sfx('shell');await D.tw(ho,{sep:0},500,'out');s.fx.ripple(A().mx,A().ky-60*A().ks,260,P.turmeric,1200);
      const H_=MANDARA.H*A().ms;const meet=1-((C.sink*H_*.5+A().my)-(A().ky-112*A().ks))/300;C.kurma=clamp(meet,0,1);D.go(ho,{on:0},500);D.go(C.K,{ring:1},1000);s._t&&s._t.finish()};
    const far=()=>LP(330,250);
    s.down=p=>{const a=A();if(Math.abs(p.y-(a.ky-60*a.ks))<170&&Math.abs(Math.abs(p.x-a.mx)-far()*ho.sep)<220)drag={x0:p.x,s0:ho.sep,side:Math.sign(p.x-a.mx)||1};else s.fx.ripple(p.x,p.y,60,P.foam,700)};
    s.move=p=>{if(!drag||done)return;const dx=(p.x-drag.x0)*-drag.side;ho.sep=clamp(drag.s0-dx/far(),0,1);if(ho.sep<.2)snap()};
    s.up=()=>{if(drag&&!done&&ho.sep<.75)D.go(ho,{sep:Math.max(0,ho.sep-.3)},400);drag=null;if(ho.sep<.2)snap()};
    s.keyStep=()=>{ho.sep=Math.max(0,ho.sep-.34);if(ho.sep<.2)snap()};s.camClap=snap;
    await D.task({hint:'Push the two shell pieces together.',start(t){s._t=t},demo(){const a=A(),y=a.ky-60*a.ks;s.demo.drag([[a.mx-far()*ho.sep-80,y],[a.mx-40,y]],1400)},
      async assist(t){await snap();t.finish()}});
    s._t=null;st.shell=0;s.down=s.move=s.up=s.camClap=null;D.clearAct();sh.remove()}
  groupSet(C.devas,'gaze');groupSet(C.asuras,'gaze');
  await D.say('Now, let us help Kurma lift the mountain!');
  await D.say('Slowly stand up and stretch your hands towards the sky.');
  /* ---- stage C: higher, higher, and hold ---- */
  {let drag=null,held=0,done=false;st.dir=-1;D.go(st,{on:1},500);Hot.dirty=true;D.instr('Drag the handle up, then hold it at the top.','','up');
    const H_=()=>MANDARA.H*A().ms;const meet=()=>1-((C.sink*H_()*.5+A().my)-(A().ky-112*A().ks))/300;
    const setLift=v=>{const k=clamp(v,0,1);C.sink=k;C.kurma=Math.max(C.kurma,clamp(meet(),0,1))};
    s.down=p=>{const h=handlePos();if(Math.hypot(p.x-h[0],p.y-h[1])<130)drag={y0:p.y,s0:C.sink};else s.fx.ripple(p.x,p.y,60,P.foam,700)};
    s.move=p=>{if(drag)setLift(drag.s0+(p.y-drag.y0)/(H_()*.5))};
    s.up=()=>{if(drag&&C.sink<.95){drag=null;/* gentle: ease to the top; Kurma holds it */D.tw(C,{sink:0},900).then(()=>{C.kurma=1}).catch(()=>{});held=Math.max(held,.6)}drag=null};
    s.keyStep=()=>{setLift(C.sink-.34);if(C.sink<=.02)held=Math.max(held,.9)};
    s.camHand=h=>{const top=LP(250,500),bot=LP(760,1350);if(h.open)setLift((h.p.y-top)/(bot-top))};
    const sayP=D.say('Higher... higher... and hold!');
    await D.task({hint:'Slide the mountain up, then hold!',start(t){const iv=setInterval(()=>{if(done)return;C.kurma=Math.max(C.kurma,clamp(meet(),0,1));
        if(C.sink<=.04){held+=.12/2;AU.sfx&&0}else held=Math.max(0,held-.03);st.hold=clamp(held,0,1);if(held>=1){done=true;clearInterval(iv);t.finish()}},120)},
      demo(){const h=handlePos();s.demo.drag([h,[h[0],h[1]-H_()*.45]],1400)},async assist(t){await D.tw(C,{sink:0,kurma:1},1600);held=1;st.hold=1;done=true;t.finish()}});
    await sayP;s.down=s.move=s.up=s.camHand=null;st.hold=0;D.go(st,{on:0},400);D.clearAct();C.kurma=1;C.sink=0}
  D.guard(tok);AU.sfx('success');D.go(C,{crestK:0},600);D.go(C.K,{ring:1},600);s.fx.ripple(A().mx,A().water,LP(600,420),P.turmeric,1800,.22);
  groupSet(C.devas,'cheer');C.asuras.forEach(f=>f.set('nod'));
  await D.say('Amazing! The mountain is steady.');Badge.gain(1);
  await D.say('Kurma is supporting Mount Mandara, and the great churning can finally begin.');
  groupSet(C.devas,'pull');await D.say('Devas on one side!');
  groupSet(C.asuras,'pull');await D.say('Asuras on the other!');
  C.devas.concat(C.asuras).forEach(f=>f.heave=.5);
  await D.say('Hold the rope tightly.');
  await D.say('The Ocean of Milk is waiting to reveal its treasures.');await D.late()}
