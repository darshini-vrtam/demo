/* ================= EPISODE 3: LET THE GREAT CHURNING BEGIN! ================= */
/* continuous churning: the groups pull in turn, the rope slides back and forth, the mountain turns */
function churnMotor(s){const C=s.C;const m={speed:0,ph:0,base:C.flow,rbase:C.rot,amp:1,update(dt,t){if(this.speed<=0.001)return;this.ph+=dt*this.speed;const side=Math.floor(this.ph)%2?1:-1;
    const w=Math.sin(this.ph*Math.PI);C.flow=this.base+w*130*this.amp;C.rot=this.rbase+w*70*this.amp+this.ph*14;C.ringSpin+=dt*this.speed*.8;
    for(const f of C.devas)if(f.vis&&f.state==='pull'){f.tgt.lean=side<0?15:6}for(const f of C.asuras)if(f.vis&&f.state==='pull'){f.tgt.lean=side>0?15:6}
    if(this._side!==side){this._side=side;if(!AU.muted&&Math.random()<.6)AU.sfx(this.speed>1.2?'drum':'creak')}}};s.parts.push(m);s.motor=m;return m}
/* the frame's border patterns vibrate a little instead of the camera shaking */
function vibrate(s){s.parts.push({update:(dt,t)=>{const v=s.vib||0;if(v>0)s.frm.setAttribute('transform',`translate(${f1(Math.sin(t*5)*1.6*v)} ${f1(Math.cos(t*4.3)*1.2*v)})`);else s.frm.removeAttribute('transform')}})}
/* fish darting through the churning water */
function dartFish(s){const g=grp(s.C.fxL);const list=[0,1,2,3].map(i=>({...fish(g,i+1),u:i*.27,y:i}));const o={k:0,sp:.12};
  s.parts.push({update:(dt,t)=>{op(g,o.k);if(o.k<=0)return;const W=L.portrait?1000:1778;list.forEach((f,i)=>{f.u+=dt*o.sp*(i%2?1.2:1);const x=-200+((f.u%1)*(W+400));const dir=i%2?-1:1;
    const y=(L.portrait?[1000,1080,1160,1240]:[600,640,690,740])[i]+Math.sin(t*3+i)*10;tf(f.g,dir>0?x:W-x,y,L.portrait?.8:.85,0,dir,1);f.tail.setAttribute('transform',`rotate(${f1(Math.sin(t*9+i)*14)} -22 0)`)})}});return o}

async function shot3_1(){await titleCard(3,'Let the Great Churning Begin!');D.chip('Episode 3 · The Churning Begins');Music.mood('energy');D.setMood({rate:1.04,pitch:1.03});
  const s=churnScene({mood:'energy',frame:'gold'});const C=s.C;C.ringK=1;D.setScene(s,1200);churnMotor(s);vibrate(s);const fishO=dartFish(s);groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
  await D.wait(700);
  await D.say('The moment had arrived.');
  await D.say('The devas pulled.',{cues:[['pulled',()=>churnPull(C,-1).catch(()=>{})]]});
  await D.say('The asuras pulled.',{cues:[['pulled',()=>churnPull(C,1).catch(()=>{})]]});
  await D.say('Vasuki stretched around Mount Mandara.',{cues:[['stretched',()=>D.go(C,{flow:C.flow+200},1600)]]});
  const M=s.motor;M.base=C.flow;M.rbase=C.rot;
  await D.say('The mountain began to turn.',{cues:[['turn',()=>D.go(M,{speed:.55},1200)]]});
  await D.say('Round and round it went!',{cues:[['Round',()=>{D.go(M,{speed:1.1},1500);D.go(C,{glim:.7},1500)}]]});
  await D.say('The ocean stirred.',{cues:[['stirred',()=>D.go(s,{swell:.35},1200)]]});
  await D.say('The waves grew taller.',{cues:[['taller',()=>D.go(s,{swell:.8},1400)]]});
  await D.say('Bubbles rose to the surface.',{cues:[['Bubbles',()=>{const A=C.A;for(let i=0;i<4;i++)Timers.add(i*350,()=>s.fx.burst(A.mx+(i-1.5)*LP(260,170),A.water+LP(60,90),6,'bubble',1.2));AU.sfx('bubble')}]]});
  await D.say('Fish darted between the swirling waves, and the whole universe seemed to tremble with excitement.',{cues:[['Fish',()=>D.go(fishO,{k:1},600)],['tremble',()=>{s.vib=1;D.go(M,{speed:1.4},800)}]]});
  s.vib=0;D.go(fishO,{k:0},1200);
  await D.say('But the nectar did not appear.',{cues:[['did not',()=>{D.go(M,{speed:.35},1600);D.go(C,{glim:.15},1600);D.go(s,{swell:.2},1600)}]]});
  await D.say('The devas pulled harder.',{cues:[['harder',()=>{D.go(M,{speed:1},900);churnPull(C,-1,1.4).catch(()=>{})}]]});
  await D.say('The asuras pulled harder.',{cues:[['harder',()=>{D.go(M,{speed:1.3},900);churnPull(C,1,1.4).catch(()=>{})}]]});
  await D.say('Still, nothing.',{cues:[['nothing',()=>D.go(M,{speed:.2},1400)]]});
  groupSet(C.devas,'worried');
  await D.say([['devas','“What should we do?”'],['narr','wondered the devas.']]);
  groupSet(C.asuras,'worried');
  await D.say([['asuras','“Should we give up?”'],['narr','asked the asuras.']]);
  await D.say('But they had come too far to stop now.',{cues:[['too far',()=>{groupSet(C.devas,'pull');groupSet(C.asuras,'pull')}]]});
  M.speed=0;M.base=C.flow;M.rbase=C.rot;
  const pulse=()=>{AU.sfx('drum');D.go(C,{rot:C.rot+120,ringSpin:C.ringSpin+1.4,flow:C.flow+160},900,'out');churnPull(C,Math.random()<.5?-1:1).catch(()=>{})};
  await D.say('So they tried again.',{cues:[['again',pulse]]});
  await D.say('And again.',{cues:[['again',pulse]]});
  await D.say('And again!',{cues:[['again',pulse]]});await D.late()}

/* the central progress motif: twelve petals, one for each pull or churn */
function progressMotif(s){const g=grp(s.top);const pet=[];circ(g,0,0,64,P.indigo,4);
  for(let i=0;i<12;i++){const a=i*30;const pg=grp(g,{transform:`rotate(${a})`});const p=shp(pg,'M0 -26C-10 -38 -9 -54 0 -62C9 -54 10 -38 0 -26Z',P.ivory,3);pet.push(p)}
  const cen=grp(g);circ(cen,0,0,22,P.turmeric,3);circ(cen,0,0,12,'none',2.4,{stroke:K});circ(cen,0,0,4,P.verm,0);
  const o={n:0,on:0,set(n){this.n=n;pet.forEach((p,i)=>p.setAttribute('fill',i<n?(i%2?P.turmeric:P.verm):P.ivory))}};
  s.parts.push({update:t=>{const p=s.C.A.prog;tf(g,p[0],p[1],(L.portrait?1.25:1)*(.9+.1*o.on),o.n*2);op(g,o.on);cen.setAttribute('transform',`scale(${f3(1+.1*Math.sin(t*2)*(o.n>=12?1:0))})`)}});return o}

async function shot3_2(){D.chip('Episode 3 · The Churning Challenge');let s=D.scene;if(!s||s.id!=='churn'){s=churnScene({mood:'energy',frame:'gold'});s.C.ringK=1;D.setScene(s);churnMotor(s);vibrate(s)}const C=s.C;const tok=D.token;
  groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
  await D.say('Ocean Explorers, the churning needs your energy!');
  await D.say('Can you help the devas and asuras?');
  const pm=progressMotif(s);D.go(pm,{on:1},700);let count=0;const step=()=>{count++;pm.set(count);AU.sfx('tap')};
  /* rope handles near each group, and the mountain */
  const A=()=>C.A;const ropeAt=side=>{const f=(side<0?C.devas:C.asuras).filter(x=>x.vis);const g=side<0?f[f.length-1]:f[0];const h=g.hand('f');return[h[0]+side*-LP(70,40),h[1]-6]};
  const tL=target(s.top,LP(52,46)),tR=target(s.top,LP(52,46)),tM=target(s.top,LP(150,170));const st={want:-1,rope:0,mtn:0};
  s.parts.push({update:t=>{const a=ropeAt(-1),b=ropeAt(1);tL.x=a[0];tL.y=a[1];tR.x=b[0];tR.y=b[1];tL.on=st.rope*(st.want<0?1:.35);tR.on=st.rope*(st.want>0?1:.35);tL.update(t);tR.update(t);
    tM.x=A().mx;tM.y=C.base()-MANDARA.H*A().ms*.38;tM.on=st.mtn;tM.update(t)}});
  s.hots=()=>{const h=[];if(st.rope>.5){const a=ropeAt(-1),b=ropeAt(1);h.push({id:'ropeL',label:'Rope on the devas’ side: press to pull',x:a[0],y:a[1],r:60,on:()=>s.onRope&&s.onRope(-1)},{id:'ropeR',label:'Rope on the asuras’ side: press to pull',x:b[0],y:b[1],r:60,on:()=>s.onRope&&s.onRope(1)})}
    if(st.mtn>.5)h.push({id:'mtn',label:'Mount Mandara: press to churn',x:A().mx,y:C.base()-MANDARA.H*A().ms*.38,r:120,on:()=>s.onMtn&&s.onMtn()});return h};
  const pullSet=async()=>{let n=0;st.rope=1;Hot.dirty=true;D.instr('Pull the rope: tap the devas’ side, then the asuras’ side.','0 of 3 pulls','tap');
    const pull=side=>{if(n>=3)return;n++;st.want=side*-1;churnPull(C,side).catch(()=>{});step();D.counter(`${n} of 3 pulls`);if(n>=3&&s._t)s._t.finish()};
    let drag=null;s.down=p=>{const a=ropeAt(-1),b=ropeAt(1);if(Math.hypot(p.x-a[0],p.y-a[1])<110){drag={side:-1,x:p.x};pull(-1)}else if(Math.hypot(p.x-b[0],p.y-b[1])<110){drag={side:1,x:p.x};pull(1)}else{s.fx.ripple(p.x,p.y,60,P.foam,700)}};
    s.move=null;s.up=()=>{drag=null};s.onRope=pull;
    s.camHand=(h)=>{if(Cam.pinch){const side=h.p.x<A().mx?-1:1;if(s._camSide!==side){s._camSide=side;pull(side)}}};
    await D.task({hint:'Tap the rope on each side!',start(t){s._t=t},demo(){const p=ropeAt(st.want);s.demo.tap(p[0],p[1],2)},
      async assist(t){while(n<3){pull(st.want);await D.wait(700)}t.finish()}});
    s._t=null;s.down=s.up=s.onRope=s.camHand=null;st.rope=0;D.clearAct()};
  const churnSet=async()=>{let n=0,acc=0,last=null;st.mtn=1;Hot.dirty=true;D.instr('Churn: tap the mountain, or draw a circle around it.','0 of 3 turns','circle');
    const turn=()=>{if(n>=3)return;n++;AU.sfx('drum');D.go(C,{rot:C.rot+140,ringSpin:C.ringSpin+1.6,flow:C.flow+120},900,'out');s.fx.ripple(A().mx,A().water,LP(520,380),P.foam,1300,.22);step();D.counter(`${n} of 3 turns`);if(n>=3&&s._t)s._t.finish()};
    s.down=p=>{last=p;acc=0;const c=[A().mx,C.base()-MANDARA.H*A().ms*.4];if(Math.hypot(p.x-c[0],p.y-c[1])<LP(260,300))turn();else s.fx.ripple(p.x,p.y,60,P.foam,700)};
    s.move=p=>{if(!last)return;const c=[A().mx,C.base()-MANDARA.H*A().ms*.4];const a0=Math.atan2(last.y-c[1],last.x-c[0]),a1=Math.atan2(p.y-c[1],p.x-c[0]);let d=a1-a0;if(d>Math.PI)d-=TAU;if(d<-Math.PI)d+=TAU;acc+=Math.abs(d);last=p;if(acc>TAU*.66){acc=0;turn()}};
    s.up=()=>{last=null};s.onMtn=turn;
    let ca=0,lp=null;s.camHand=h=>{const c=[A().mx,C.base()-MANDARA.H*A().ms*.4];if(lp){let d=Math.atan2(h.p.y-c[1],h.p.x-c[0])-Math.atan2(lp.y-c[1],lp.x-c[0]);if(d>Math.PI)d-=TAU;if(d<-Math.PI)d+=TAU;ca+=Math.abs(d);if(ca>TAU*.8){ca=0;turn()}}lp=h.p};
    await D.task({hint:'Tap the mountain to turn it!',start(t){s._t=t},demo(){const c=[A().mx,C.base()-MANDARA.H*A().ms*.4];s.demo.tap(c[0],c[1],3)},
      async assist(t){while(n<3){turn();await D.wait(700)}t.finish()}});
    s._t=null;s.down=s.move=s.up=s.onMtn=s.camHand=null;st.mtn=0;D.clearAct()};
  await D.say('Everyone, hold your imaginary rope!');
  await D.say('Pull! Pull! Pull!');await pullSet();
  await D.say('Now, let us turn the great mountain.');
  await D.say('Churn! Churn! Churn!');await churnSet();
  await D.say('Once more, with all your energy!');
  await D.say('Pull! Pull! Pull!');await pullSet();
  await D.say('Churn! Churn! Churn!');await churnSet();
  D.guard(tok);
  await D.say('And now, everyone together, call out:');
  await D.chant('Ocean, reveal your magic!',{narr:true,who:'Everyone together'});
  /* outcome: the motif completes, the water rings glow gold, golden bubbles rise */
  pm.set(12);AU.sfx('success');Music.setLevel(.75,2);const M=s.motor;M.base=C.flow;M.rbase=C.rot;D.go(M,{speed:.8},1200);
  C.devas.concat(C.asuras).forEach(f=>f.heave=.4);
  const ringsGold=()=>s.comp.querySelectorAll('ellipse').forEach(e=>{if(e.getAttribute('stroke')===P.turq||e.getAttribute('stroke')===P.foam)e.setAttribute('stroke',P.turmeric)});
  await D.say('Look at the ocean!',{cues:[['Look',ringsGold]]});Badge.gain(2);
  await D.say('Something is happening beneath the waves.',{cues:[['beneath',()=>D.go(C,{glim:1,energy:1},1500)]]});
  await D.say('The water is glowing.');
  await D.say('Tiny golden bubbles are rising to the surface.',{cues:[['bubbles',()=>{const A_=A();for(let i=0;i<6;i++)Timers.add(i*300,()=>s.fx.burst(A_.mx+(i-2.5)*LP(200,130),A_.water+LP(80,110),5,'spark',1))}]]});
  await D.say('Something is coming!');
  D.go(pm,{on:0},800);
  await D.say('But wait...',{cues:[['wait',()=>{D.go(M,{speed:2.4},1500)}]]});
  await D.say('The first thing to emerge is not a treasure.');
  await D.say('It is something dangerous.',{cues:[['dangerous',()=>{M.speed=0;D.go(s,{seaK:0,swell:0},400);D.go(C,{glim:0},400);AU.sfx('hush');Music.setLevel(.12,1)}]]});
  C.devas.concat(C.asuras).forEach(f=>f.heave=0);groupSet(C.devas,'alarmed');groupSet(C.asuras,'alarmed');
  await D.wait(1200);await D.late()}
