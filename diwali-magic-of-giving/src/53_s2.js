/* ================= EP03_SC02_KINDNESS: CHOOSE A KIND ACTION ================= */
const KINDS=['colours','help','thanks'];
/* small Madhubani panels, one per situation, each with a little golden light icon that lights when the situation is done */
function kindArt(g,k){if(k==='colours'){folk(g,{x:-40,y:50,s:.7,sk:P.ochre,cl:P.pink,cl2:P.turmeric,hair:'plait',skirt:1,sit:1,la:20,ra:60});folk(g,{x:40,y:50,s:.6,sk:P.ochre,cl:P.verm,cl2:P.turmeric,hair:'short',skirt:1,sit:1,la:60,ra:20});
    const b=colourBowls(g,true);b.setAttribute('transform','translate(0 40) scale(.6)')}
  else if(k==='help'){folk(g,{x:-30,y:52,s:.85,sk:P.ochre,cl:P.verm,cl2:P.turmeric,hair:'bun',skirt:1,la:20,ra:60});folk(g,{x:34,y:52,s:.62,sk:P.ochre,cl:P.teal,cl2:P.ivory,hair:'short',la:60,ra:20});
    const m=marigold(g,10,P.turmeric);tf(m,2,-10,1)}
  else{folk(g,{x:-38,y:52,s:.82,sk:P.ochre,cl:P.teal,cl2:P.turmeric,hair:'bun',skirt:1,la:20,ra:58});folk(g,{x:38,y:52,s:.6,sk:P.ochre,cl:P.verm,cl2:P.turmeric,hair:'short',skirt:1,la:4,ra:4});
    const gb=giftBox(g);gb.setAttribute('transform','translate(0 -6) scale(.3)')}return g}
function kindStrip(s,parent){const g=grp(parent);const list=KINDS.map((k,i)=>{const p=grp(g);el('rect',{x:-80,y:-56,width:160,height:112,rx:14,fill:Pat.u('vine',P.leaf,P.ivory,.45),stroke:K,'stroke-width':4},p);
    el('rect',{x:-68,y:-44,width:136,height:88,rx:10,fill:P.ivory,stroke:K,'stroke-width':3},p);const c=clipIn(p,'M-66 -42H66V42H-66Z');const pic=grp(p,{'clip-path':c});kindArt(grp(pic,{transform:'scale(.62) translate(0 -10)'}),k);
    const ic=grp(p,{transform:'translate(0 -84)'});const off=grp(ic);circ(off,0,0,18,P.ivory,3);shp(off,'M0 -14C-6 -6 -10 0 -10 4C-10 10 -6 14 0 14C6 14 10 10 10 4C10 0 6 -6 0 -14Z','none',2.4,{stroke:K});
    const on=grp(ic);circ(on,0,0,22,P.turmeric,0);shp(on,'M0 -18C-8 -8 -13 0 -13 5C-13 13 -7 17 0 17C7 17 13 13 13 5C13 0 8 -8 0 -18Z',P.turmeric,3);circ(on,-4,4,1.8,K,0);circ(on,4,4,1.8,K,0);
    return{g:p,on,k:0,done:MEM.kind[k]?1:0}});
  const S={g,list,show:1,big:0,update(dt,t){op(g,this.show);const big=this.big;list.forEach((q,i)=>{const sc=lerp(LP(.62,.55),LP(1.6,1.45),big);
    const p=big?LP([lerp(889,520+i*369,big),lerp(150,420,big)],[lerp(500,500,big),lerp(230,420+i*330,big)]):LP([700+i*178,215],[260+i*240,300]);
    tf(q.g,p[0],p[1],sc);op(q.on,q.done);if(q.done)tf(q.on,0,0,1+.06*Math.sin(t*TAU/2)*MV())})}};s.parts.push(S);return S}
/* Scene 2 backgrounds: leaf green, turquoise and pink for kindness */
function kindBg(s){s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha,fy=toStage(0,LP(560,960))[1];el('rect',{x:-4,y:-4,width:W+8,height:fy+8,fill:Pat.u('flora',P.pink,P.ivory,1.1)},this.bg);
  shp(this.bg,`M-4 ${f1(fy-30)}H${W+4}V${f1(fy)}H-4Z`,Pat.u('grid',P.leaf,P.ivory,.9),3);shp(this.bg,`M-4 ${f1(fy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.leaf,P.turq,1),4)}}
async function shot2_1(){mood('excited');Music.mood('festive');const s=mkScene('kind');kindBg(s);D.setScene(s,1200);const light=s.light=mkLight(s.comp);s.fx=fxLayer(s);
  const strip=kindStrip(s,s.comp);strip.big=1;strip.list.forEach(q=>{q.g.style.display='none'});
  light.vis=true;light.x=LP(889,500);light.y=LP(170,200);s.parts.push(light);
  for(let i=0;i<3;i++){strip.list[i].g.style.display='';AU.sfx('pop');await D.wait(D.fast?5:350)}
  light.sparkle();await D.ask(INS.kind,null,'tap');light.travel([LP([889,130],[500,140])],900).catch(()=>{});await D.late();
  D.go(strip,{big:0},1200,'io');await D.wait(1300);D.clearAct()}
/* one decision scene: the situation, two cards, gentle retry, the happy outcome */
async function decision(key,setup){const K_=KIND[key];const s=mkScene('k_'+key);kindBg(s);const comp=s.comp;s.backL=grp(comp);s.famL=grp(comp);s.motL=grp(comp);
  const F=s.F=mkFamily(s.famL,['gran','girl','boy','little','neighbour']);for(const k in F)F[k].vis=false;const light=s.light=mkLight(grp(comp));s.fx=fxLayer(s);
  const strip=kindStrip(s,comp);s.parts.push({update:(dt,t)=>{updFamily(F,dt,t);light.update(dt,t)}});
  const st=setup(s);D.setScene(s,1200);light.vis=true;
  await D.wait(900);
  /* the situation is shown at the top and read aloud */
  D.instr(K_.situation,null,'leaf');await D.say(K_.situation,{noCap:true});
  const rec=await kindChoice(key,[{label:K_.A,icon:st.iconA},{label:K_.B,icon:st.iconB}],{retry:K_.retry,onA:st.onA});
  D.clearAct();await st.good();light.sparkle();await D.say(K_.good);
  strip.list[KINDS.indexOf(key)].done=1;AU.sfx('done');await D.late();await D.wait(900);return rec}
const KPOS={colours:{rg:[[889,500],[500,900]],girl:[[660,560,1.5,1],[280,940,1.3,1]],little:[[1140,566,1.6],[740,950,1.35]],bowlsFull:[[520,560],[150,960]],bowlsEmpty:[[1270,566],[860,960]]}};
async function shot2_2(){await decision('colours',s=>{const F=s.F;const light=s.light;const P_=KPOS.colours;
  const rg=grp(s.backL);const R=rangoli2(rg);R.dots=1;for(const k of RSEC)R.sec[k].k=k==='petal'?1:0;
  const full=grp(s.motL);colourBowls(full,true);const empty=grp(s.motL);colourBowls(empty,false);const shareB=grp(s.motL);colourBowls(shareB,true);const sb={k:0};
  const ring=flowerRing(s,s.motL,14,LP(330,240),LP(110,90));
  F.girl.vis=true;F.little.vis=true;placeP(F.girl,P_.girl[0],P_.girl[1],true);placeP(F.little,P_.little[0],P_.little[1],true);F.girl.set('reach');F.little.smile=0;F.little.set('idle');F.little.tiltH=-8;
  s.parts.push({update:()=>{const c=LP(P_.rg[0],P_.rg[1]);rg.setAttribute('transform',`translate(${c[0]} ${c[1]}) scale(${LP(.75,.62)} ${LP(.27,.24)})`);R.update();ring.x=c[0];ring.y=c[1];
    const f=LP(P_.bowlsFull[0],P_.bowlsFull[1]),e=LP(P_.bowlsEmpty[0],P_.bowlsEmpty[1]);tf(full,f[0],f[1],LP(1,.9));tf(empty,e[0],e[1],LP(1,.9));tf(shareB,lerp(f[0],e[0]-LP(60,50),sb.k),lerp(f[1],e[1],sb.k),LP(.8,.7));op(shareB,sb.k>0?1:0)}});
  light.x=LP(889,500);light.y=LP(360,560);
  return{iconA:g=>{folk(g,{x:-20,y:52,s:.8,sk:P.ochre,cl:P.pink,cl2:P.turmeric,hair:'plait',skirt:1,la:-10,ra:-10});const b=colourBowls(g,true);b.setAttribute('transform','translate(-20 22) scale(.55)');
      folk(g,{x:60,y:52,s:.62,sk:P.ochre,cl:P.verm,cl2:P.turmeric,hair:'short',skirt:1})},
    iconB:g=>kindArt(g,'colours'),
    onA:()=>{const p=LP(P_.bowlsEmpty[0],P_.bowlsEmpty[1]);light.travel([[p[0]-LP(40,30),p[1]-LP(130,120)]],900).catch(()=>{});D.go(light,{tilt:-16},500);Timers.add(2600,()=>D.go(light,{tilt:0},500))},
    good:async()=>{const p=LP(P_.little[0],P_.little[1]);placeP(F.little,[p[0]-LP(80,80),p[1],p[2],1],[p[0]-60,p[1],p[2],1]);F.little.smile=2;F.little.tiltH=0;D.go(sb,{k:1},1400,'io');
      await D.wait(1200);F.little.set('reach');for(const k of['diamond','leaf','circle']){tw(R.sec[k],{k:1},700).catch(()=>{});AU.sfx('fill');await D.wait(D.fast?5:600)}F.girl.smile=2;D.go(ring,{k:1},1200,'out');await D.wait(900)}}})}
async function shot2_3(){await decision('help',s=>{const F=s.F,light=s.light;
  /* Grandmother arranging flowers and puja items at a low table; one child notices, the other is busy with diyas */
  const tb=grp(s.backL);shp(tb,'M-150 0H150V60H-150Z',Pat.u('vlines',P.gold,P.terra,.8),4);ln(tb,'M-150 0H150',K,5);const vase=grp(tb);shp(vase,'M-22 0Q-30 -30 -14 -44H14Q30 -30 22 0Z',P.turq,3.4);
  const arr=[];[[-20,-58],[0,-70],[20,-58],[-34,-46],[34,-46],[-10,-84],[10,-84]].forEach(([x,y],i)=>{const m=marigold(tb,12,i%2?P.pink:P.turmeric);tf(m,x,y,1);m._k=0;arr.push(m)});
  const pile=grp(s.backL);for(let i=0;i<6;i++){const m=marigold(pile,12,i%2?P.pink:P.turmeric);tf(m,(i%3-1)*22,Math.floor(i/3)*-18,1)}const th=thali(s.backL);
  const ring=flowerRing(s,s.motL,16,LP(380,300),LP(150,120));const dys=[0,1,2].map(i=>{const d=diya(s.backL,{col:P.terra});d.lit=1;d.s=.42;return d});
  F.gran.vis=true;F.boy.vis=true;F.girl.vis=true;placeP(F.gran,[1080,580,1.0],[620,950,.95],true);placeP(F.boy,[1460,586,1.0],[860,960,.9],true);placeP(F.girl,[360,590,1.0,1],[170,960,.95,1],true);
  F.gran.set('basket');F.boy.tiltH=-10;F.girl.set('reach');
  s.parts.push({update:(dt,t)=>{const tp=LP([1100,560],[560,930]);tf(tb,tp[0]-LP(260,200),tp[1],LP(1,.85));tf(pile,tp[0]-LP(140,120),tp[1]-LP(10,10),1);tf(th,tp[0]-LP(380,300),tp[1]-LP(8,8),LP(.8,.7));
    arr.forEach(m=>{op(m,m._k)});dys.forEach((d,i)=>{d.x=LP(220,90)+i*LP(70,50);d.y=LP(600,975);d.update(t)});ring.x=LP(1260,700);ring.y=LP(440,820)}});
  light.x=LP(820,450);light.y=LP(240,560);
  return{iconA:g=>{folk(g,{x:-40,y:52,s:.82,sk:P.ochre,cl:P.verm,cl2:P.turmeric,hair:'bun',skirt:1,la:40,ra:40});folk(g,{x:50,y:52,s:.6,sk:P.ochre,cl:P.teal,cl2:P.ivory,hair:'short',la:4,ra:4});ln(g,'M76 -10H92M76 0H96M76 10H90',K,2.4)},
    iconB:g=>kindArt(g,'help'),
    onA:()=>{light.travel([LP([1100,330],[620,640])],900).catch(()=>{});D.go(light,{tilt:-14},500);Timers.add(2600,()=>D.go(light,{tilt:0},500))},
    good:async()=>{placeP(F.boy,[1250,586,1.0],[760,960,.9],true);F.boy.tiltH=0;await D.wait(900);F.boy.set('offer');
      for(const m of arr){tw(m,{_k:1},400).catch(()=>{});AU.sfx('pat');await D.wait(D.fast?5:250)}F.gran.smile=2;F.boy.smile=2;F.gran.set('gestureL');D.go(ring,{k:1},1200,'out');await D.wait(900)}}})}
async function shot2_4(){await decision('thanks',s=>{const F=s.F,light=s.light;
  /* at the decorated doorway: the neighbour offers a wrapped gift; the child stands with both hands visible */
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha,fy=toStage(0,LP(600,1000))[1];el('rect',{x:-4,y:-4,width:W+8,height:fy+8,fill:Pat.u('flora',P.turmeric,P.turq,1.1)},this.bg);
    shp(this.bg,`M-4 ${f1(fy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.leaf,P.turq,1),4)};
  const dh=grp(s.backL);const H=familyHome(dh,HOME3);homeLights(H,true);s.parts.push({update:(dt,t)=>{const v=LP([889,600,.8],[500,1000,.86]);tf(dh,v[0],v[1],v[2]);H.update(t,dt)}});
  const gift=grp(s.motL);giftBox(gift);const gk={k:0};const heart=motifPart(s,s.motL,'heart',0,0,LP(1.1,1));const ring=flowerRing(s,s.motL,10,LP(80,70),LP(80,70));
  F.neighbour.vis=true;F.little.vis=true;placeP(F.neighbour,[889,610,1.0],[500,1000,.95],true);placeP(F.little,[1220,626,1.6],[800,1010,1.4],true);F.neighbour.set('hold');F.neighbour.smile=1;F.little.set('hold');F.neighbour.f=1;
  s.parts.push({update:()=>{const a=F.neighbour.world(-10,-186),b=F.little.world(-10,-186);tf(gift,lerp(a[0]-LP(40,30),b[0]+LP(10,10),gk.k),lerp(a[1],b[1],gk.k),LP(.75,.65));
    heart.x=ring.x=(F.neighbour.x+F.little.x)/2;heart.y=ring.y=LP(260,640)}});
  light.x=LP(889,500);light.y=LP(150,470);
  return{iconA:g=>{folk(g,{x:-40,y:52,s:.82,sk:P.ochre,cl:P.teal,cl2:P.turmeric,hair:'bun',skirt:1,la:58,ra:20});folk(g,{x:56,y:52,s:.6,sk:P.ochre,cl:P.verm,cl2:P.turmeric,hair:'short',skirt:1,ll:30,rl:-20,rot:10});
      ln(g,'M24 0H8M26 12H6M24 24H10',K,2.4);const gb=giftBox(g);gb.setAttribute('transform','translate(-6 -2) scale(.26)')},
    iconB:g=>kindArt(g,'thanks'),
    onA:()=>{light.travel([[F.little.x+LP(90,80),F.little.y-LP(300,280)]],900).catch(()=>{});light.pulse()},
    good:async()=>{D.go(gk,{k:1},1000,'io');await D.wait(900);F.little.smile=2;F.little.set('namaste');F.neighbour.smile=2;F.neighbour.set('idle');AU.sfx('chime');D.go(heart,{s:1},800,'back');D.go(ring,{k:1},900);await D.wait(900)}}})}
async function shot2_5(){mood('excited');const s=mkScene('unity');kindBg(s);D.setScene(s,1200);const comp=s.comp;const chain=grp(comp),medL=grp(comp),lotL=grp(comp);const light=s.light=mkLight(grp(comp));s.fx=fxLayer(s);
  const pos=()=>LP([[889,210],[470,560],[1308,560]],[[500,330],[220,880],[780,880]]);const c=()=>LP([889,450],[500,700]);
  const meds=KINDS.map((k,i)=>{const g=grp(medL);const halo_=grp(g);rings(halo_,128,{n:2,step:.12,w:5});circ(g,0,0,112,Pat.u('vine',P.leaf,P.ivory,.5),4);circ(g,0,0,100,P.ivory,4);
    const cl=clipIn(g,ellD(0,0,96,96));kindArt(grp(grp(g,{'clip-path':cl}),{transform:'scale(.95)'}),k);return{g,halo:halo_,k:0,lit:0,m:0}});
  const big=bigLotus(lotL,{r:170});big.openO=0;big.openI=0;const lk={s:0};
  const fl=[];for(let i=0;i<18;i++){const f=tinyFlower(chain,12,[P.pink,P.turmeric,P.leaf][i%3]);fl.push(f)}
  s.parts.push({update:(dt,t)=>{const P_=pos(),C=c();meds.forEach((m,i)=>{const x=lerp(P_[i][0],C[0],m.m),y=lerp(P_[i][1],C[1],m.m);tf(m.g,x,y,LP(1,.9)*Math.max(.001,m.k*(1-m.m*.85)));op(m.halo,m.lit);if(m.lit)tf(m.halo,0,0,1,t*10)});
    fl.forEach((f,i)=>{const a=Math.floor(i/6),b=(a+1)%3,u=(i%6+1)/7;const k=meds[a].k*meds[b].k*(1-meds[0].m);tf(f,lerp(P_[a][0],P_[b][0],u),lerp(P_[a][1],P_[b][1],u),k);op(f,k>0?1:0)});
    big.x=C[0];big.y=C[1]+LP(110,110);big.s=Math.max(.001,lk.s);big.update(t);light.update(dt,t)}});
  light.vis=true;light.x=c()[0];light.y=c()[1];
  for(const m of meds){AU.sfx('pop');D.go(m,{k:1},700,'back');await D.wait(D.fast?5:500)}
  await sayShot('2.5',{to:3,cues:[['Wonderful',()=>meds.forEach((m,i)=>Timers.add(i*400,()=>{D.go(m,{lit:1},500);AU.sfx('chime')}))],['dances',async()=>{light.sparkle();await light.travel(LP([[989,450],[889,350],[789,450],[889,450]],[[580,700],[500,620],[420,700],[500,700]]),2400).catch(()=>{});light.sparkle()}]]});
  await sayShot('2.5',{from:3});await D.late();
  /* the three flower motifs merge into one large lotus, which opens */
  meds.forEach(m=>D.go(m,{m:1},1200,'in'));await D.wait(1000);meds.forEach(m=>D.go(m,{k:0},400));D.go(lk,{s:LP(1.2,1)},900,'out');D.go(big,{openO:1},1400);Timers.add(700,()=>D.go(big,{openI:1},1400));
  D.go(light,{y:c()[1]-LP(200,200)},1400);await D.wait(2400)}
