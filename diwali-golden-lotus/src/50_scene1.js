/* ================= SCENE 1: A MYSTERY IN THE OCEAN (and the ocean stage reused by Shots 2.1 and 3.1) ================= */
/* where everything sits, per staging mode, in reference units: [x, y, scale, facing]. Treasures are placed by the centre of their circular backdrop. */
const OCEAN={
  l:{est:{K:[380,1100,.8],A:[889,1100,.8],V:[1400,1100,.8],lotus:[889,1150,1]},
    row:{K:[380,470,1],A:[889,470,1],V:[1400,470,1],lotus:[889,1150,1]},
    mystery:{K:[250,300,.36],V:[1270,284,.3],A:[1530,300,.36,-1],lotus:[889,700,1.05]},
    act1:{K:[380,565,.86],A:[889,565,.86],V:[1400,565,.86],lotus:[889,330,.62]},
    act2:{K:[190,610,.5],V:[400,570,.42],A:[1590,610,.5,-1],lotus:[889,650,1.3]},
    lak:{K:[190,1100,.5],V:[400,1100,.42],A:[1590,1100,.5,-1],lotus:[889,770,1.25],lak:[889,732,.9],light:[1170,380],devas:[[250,792],[420,792],[1358,792],[1528,792]],ds:.62},
    bg3:{lotus:[889,560,.8],lak:[889,536,.58],light:[1010,250],devas:[[250,1100],[420,1100],[1358,1100],[1528,1100]],ds:.62}},
  p:{est:{K:[250,1700,.8],A:[500,1700,.9],V:[750,1700,.8],lotus:[500,1800,1]},
    row:{K:[250,760,.8],V:[750,760,.8],A:[500,1150,.95],lotus:[500,1800,1]},
    mystery:{K:[150,452,.26],V:[700,424,.22],A:[860,452,.26,-1],lotus:[500,1050,1.0]},
    act1:{K:[250,880,.78],V:[750,880,.78],A:[500,1235,.85],lotus:[500,570,.6]},
    act2:{K:[160,1310,.4],V:[340,1270,.34],A:[840,1310,.4,-1],lotus:[500,1000,1.2]},
    lak:{K:[160,1800,.4],V:[340,1800,.34],A:[840,1800,.4,-1],lotus:[500,1130,1.05],lak:[500,1098,.82],light:[800,600],devas:[[90,1410],[230,1410],[770,1410],[910,1410]],ds:.5},
    bg3:{lotus:[500,840,.78],lak:[500,817,.58],light:[620,560],devas:[[90,1800],[230,1800],[770,1800],[910,1800]],ds:.5}}};
const SKYMOOD={wonder:{sky:P.midnight,sea:'wonder'},bright:{sky:P.indigo,sea:'team'},suspense:{sky:P.midnight,sea:'sleep'},divine:{sky:P.midnight,sea:'divine'}};
const TNAME={K:'Kamadhenu',A:'Airavata',V:'Kalpavriksha'};
/* a faint, distant Mount Mandara with the serpent's spiral: a small callback, not a repeat of the churning */
function distantMandara(parent){const g=grp(parent);const H=200;
  shp(g,`M-80 0C-60 -60 -30 -160 0 -${H}C30 -160 60 -60 80 0Z`,Pat.u('hatch',P.sea,P.indigo,.8),3);
  for(let i=0;i<3;i++){const y=-30-i*50,w=70-i*18;ln(g,`M${-w} ${y}Q0 ${y+22} ${w} ${y}`,K,6);ln(g,`M${-w} ${y}Q0 ${y+22} ${w} ${y}`,P.turq,3)}
  shp(g,'M48 -138Q66 -150 70 -132Q60 -126 48 -130Z',P.turq,2.4);circ(g,62,-136,2,K,0);return g}
/* a small patterned tortoise silhouette in the water: the Kurma callback */
function tortoiseSil(parent){const g=grp(parent);const f=Pat.u('hatch',P.turq,P.indigo,.7);
  shp(g,'M-150 6C-176 26 -200 30 -210 22C-196 10 -176 2 -156 -2Z',f,3);shp(g,'M150 6C176 26 200 30 210 22C196 10 176 2 156 -2Z',f,3);
  shp(g,'M166 -18C190 -44 230 -38 240 -18C244 -2 224 8 196 6C182 4 172 -4 166 -18Z',f,3);circ(g,220,-22,4,P.turq,0);
  shp(g,'M-180 0C-170 -78 -100 -108 0 -108C100 -108 170 -78 180 0Z',Pat.u('grid',P.turq,P.indigo,1.2),3.4);ln(g,'M-150 -36H150M-110 -76H110',P.turq,2.6);return g}
/* an aquatic plant, symmetrical about its stem */
function waterPlant(parent,col){const g=grp(parent);ln(g,'M0 0C-6 -60 6 -120 0 -180',K,8);ln(g,'M0 0C-6 -60 6 -120 0 -180',col||P.leaf,4);
  for(let i=0;i<5;i++){const y=-24-i*34,len=56-i*7;leaf(g,len,len*.28,i%2?P.turq:col||P.leaf,-150+i*4,0,y);leaf(g,len,len*.28,i%2?P.turq:col||P.leaf,-30-i*4,0,y)}return g}
function lotusLeaf(parent,r){const g=grp(parent);shp(g,`M0 0L${-r} ${-r*.1}A${r} ${r*.42} 0 1 0 ${-r*.12} ${-r*.4}Z`,Pat.u('hatch',K,P.leaf,.8),3.6);ln(g,`M0 0L${-r*.6} ${r*.3}M0 0L${r*.5} ${r*.32}M0 0L${r*.8} ${-r*.1}`,P.turq,2.4);return g}
/* one ocean treasure inside its circular patterned backdrop; it rises from the waves and can be discovered */
function treasure(parent,kind){const w=grp(parent);const ring=grp(w);const R=150;
  /* the patterned golden outline shown once discovered */
  circ(ring,0,0,R+16,'none',14,{stroke:K});circ(ring,0,0,R+16,'none',8,{stroke:P.turmeric});circ(ring,0,0,R+16,'none',4,{stroke:P.verm,'stroke-dasharray':'.1 16','stroke-width':7,'stroke-linecap':'round'});
  const clip=clipIn(w,`M-260 -300H260V146H-260Z`);const cg=grp(w,{'clip-path':clip});const inner=grp(cg);
  const bd=grp(inner);
  if(kind==='K'){circ(bd,0,0,R,Pat.u('rings',P.turq,P.indigo,1),4);circ(bd,0,0,R*.82,'none',4,{stroke:P.ivory});circ(bd,0,0,R*.64,'none',3,{stroke:P.turmeric,'stroke-dasharray':'.1 12','stroke-width':6,'stroke-linecap':'round'})}
  else if(kind==='A'){circ(bd,0,0,R,P.sea,4);for(let i=0;i<22;i++){const p=grp(bd,{transform:`rotate(${f1(i/22*360)}) translate(0 ${-R*.9})`});shp(p,'M0 14C-12 4 -10 -10 0 -18C10 -10 12 4 0 14Z',i%2?P.pink:P.coral,2.4)}
    circ(bd,0,0,R*.76,Pat.u('dots',P.turq,P.sea,.9),3.4)}
  else{circ(bd,0,0,R,P.indigo,4);const d=[];for(let i=0;i<28;i++){const a=i/28*TAU;d.push(`M${f1(Math.cos(a)*R*.88)} ${f1(Math.sin(a)*R*.88)}h.1`)}ln(bd,d.join(''),P.turmeric,11);ln(bd,d.join(''),K,4);
    circ(bd,0,0,R*.76,Pat.u('flora',P.gold,P.ivory,.7),3.4)}
  const cr=grp(inner);let C;
  if(kind==='K'){C=kamadhenu(cr);cr.setAttribute('transform','translate(-10 62) scale(1.2)')}
  else if(kind==='A'){C=airavata(cr);cr.setAttribute('transform','translate(-6 86) scale(1.1)')}
  else{C=kalpavriksha(cr);cr.setAttribute('transform','translate(0 118) scale(.98)')}
  const crest_=crest(w,380,P.foam,4);tf(crest_,0,146,1);
  const tgt=target(w,R+26);
  const flo=confirmFlower(w);tf(flo,R*.8,-R*.8,1.4);
  const tag=grp(w);const nm=TNAME[kind];const tw_=nm.length*17+44;el('rect',{x:-tw_/2,y:166,width:tw_,height:50,rx:25,fill:P.ivory,stroke:K,'stroke-width':4},tag);
  const tx=el('text',{x:0,y:200,'text-anchor':'middle','font-family':'"Baloo 2","Trebuchet MS",sans-serif','font-weight':800,'font-size':30,fill:K},tag);tx.textContent=nm;
  const T_={kind,g:w,inner,C,cur:null,rise:0,found:false,outl:0,flowerK:0,tagK:0,glowAll:0,dim:0,act:0,
    update(dt,t,tg){const m=MV();if(!this.cur)this.cur=tg.slice();const k=1-Math.exp(-dt*(D.fast?40:2.4));for(let i=0;i<3;i++)this.cur[i]+=(tg[i]-this.cur[i])*k;
      const f=tg[3]||1;tf(w,this.cur[0],this.cur[1],this.cur[2],0,f,1);
      tf(inner,0,(1-Ease.out(this.rise))*320,1);tf(tx,0,0,1,0,f,1);
      op(ring,this.outl);if(this.outl>0)tf(ring,0,0,1+.04*this.glowAll);op(flo,this.flowerK);op(tag,this.tagK);tf(tag,0,LP(0,40),LP(1,1.7),0,f,1);
      /* each treasure's gentle animation */
      if(kind==='K'){C.nod=this.act*.9;C.update(t)}
      else if(kind==='A'){C.curl=this.act;C.update(t)}
      else{C.can.setAttribute('transform',`rotate(${f1(Math.sin(t*.8)*1.6*m+this.act*3*Math.sin(t*3))} 0 -120)`);const b=.82+.3*this.act;C.blos.setAttribute('transform',`translate(0 -170) scale(${f3(b)}) translate(0 170)`)}
      op(w,1-this.dim*.55);tgt.update(t)},
    tgt};
  return T_}
function oceanStage(){const s=mkScene('ocean');s.mode='est';s.seaMood='wonder';s.bgL=[];
  s.mkBg=function(mood,a){const W=L.W,H=L.Ha;const g=grp(this.bg);const hy=toStage(0,LP(250,430))[1];const M=SKYMOOD[mood];
    const sk=sky(g,W,hy,{seed:4,n:14,bg:M.sky,star:mood==='divine'?P.turmeric:P.ivory,clouds:[[.18,.32,LP(220,180)],[.8,.24,LP(260,200)],[.5,.52,LP(150,120)]]});
    horizonBand(g,W,hy);const sea=ocean(g,W,hy,H,{mood:M.sea,n:5});const o={g,sky:sk,sea,a:{k:a},mood};this.bgL.push(o);return o};
  s.paintBg=function(){this.bg.innerHTML='';this.bgL=[];this.mkBg(this.seaMood,1)};
  s.setSea=function(mood,ms){if(mood===this.seaMood)return;this.seaMood=mood;const nl=this.mkBg(mood,0);const old=this.bgL.slice(0,-1);tw(nl.a,{k:1},ms||1600).then(()=>{old.forEach(o=>{o.g.remove();const i=this.bgL.indexOf(o);if(i>=0)this.bgL.splice(i,1)})}).catch(()=>{})};
  s.seaK=1;s.parts.push({update:(dt,t)=>{s.bgL.forEach(o=>{op(o.g,o.a.k);o.sky.update(t);o.sea.k=s.seaK;o.sea.update(t,dt)})}});
  const comp=s.comp;const farL=grp(comp),tortL=grp(comp),fishL=grp(comp),glowL=grp(comp),treL=grp(comp),lotL=grp(comp),lakL=grp(comp),lfL=grp(comp),devL=grp(comp),plantL=grp(comp),floatL=grp(comp),lightL=grp(comp);
  const st=s.st={far:1,tort:1,glow:0,under:0,floats:0,spread:0,devK:0,lakK:0,fishK:1};
  const far=distantMandara(farL);const tort=tortoiseSil(tortL);
  const fishes=[0,1,2,3].map(i=>{const f=fish(fishL,i);return{f,ph:i*.31,sp:(i%2?-1:1)*(28+i*6)}});
  /* water glow: flat golden rings in the water, and the concentric circles beneath the lotus */
  const wg=grp(glowL);rings(wg,260,{n:4,step:.2,w:6,c1:P.turmeric,c2:P.ivory,dots:22});const under=grp(glowL);for(let i=0;i<4;i++){const e=grp(under);ell(e,0,0,140+i*70,34+i*16,'none',7,{stroke:K});ell(e,0,0,140+i*70,34+i*16,'none',4,{stroke:i%2?P.ivory:P.turmeric,'stroke-dasharray':i%2?'.1 14':'26 10','stroke-linecap':'round'})}
  /* golden floral patterns that spread over the water as the lotus opens */
  const spread=grp(glowL);const spr=[];for(let ring=0;ring<2;ring++){const n=10+ring*6;for(let i=0;i<n;i++){const f=tinyFlower(spread,16,ring?P.gold:P.turmeric);spr.push({f,a:(i+ring*.5)/n*TAU,ring})}}
  const T={K:treasure(treL,'K'),A:treasure(treL,'A'),V:treasure(treL,'V')};s.T=T;
  const lotus=bigLotus(lotL,{r:170});s.lotus=lotus;lotus.cur=null;lfL.appendChild(lotus.front);
  const lotTgt=target(lotL,150);s.lotTgt=lotTgt;
  const lak=new Lakshmi(lakL);s.lak=lak;
  const devas=[0,1,2,3].map(i=>{const f=new Fig('deva',i,devL);f.set('namaste');return f});s.devas=devas;
  /* foreground: symmetrical plants and lotus leaves at the corners, small golden flowers above the water */
  const plants=[waterPlant(plantL,P.leaf),waterPlant(plantL,P.leaf),lotusLeaf(plantL,150),lotusLeaf(plantL,150)];
  const floats=[];for(let i=0;i<9;i++){const f=tinyFlower(floatL,14,i%2?P.gold:P.turmeric);floats.push({f,u:(i+.5)/9,ph:i*1.3})}
  const light=goldenLight(lightL,{glow:.4});light.vis=false;s.light=light;D.light=light;
  s.fx=fxLayer(s);s.demo=demoHand(s);
  s.lay=()=>{const A=(L.portrait?OCEAN.p:OCEAN.l);return A[s.mode]||A.row};
  s.tick=function(dt,t){const A=L.portrait?OCEAN.p:OCEAN.l;const M=A[s.mode]||A.row;const m=MV();
    tf(farL,LP(330,170),LP(252,432),LP(.62,.5));op(farL,st.far);
    op(tortL,st.tort);tort.setAttribute('transform',`translate(${LP(560,560)} ${f1(LP(600,720)+Math.sin(t*.4)*6*m)}) scale(${LP(.5,.4)})`);
    const W=L.portrait?1000:1778;fishes.forEach((o,i)=>{const span=W+300;let x=((t*o.sp*m+o.ph*span)%span+span)%span-150;const y=LP(330,520)+i*LP(48,90);tf(o.f.g,x,y+Math.sin(t+i)*6*m,LP(.62,.55),0,o.sp>0?1:-1,1);tf(o.f.tail,0,0,1,Math.sin(t*4+i)*10*m)});
    op(fishL,st.fishK);
    for(const k of['K','A','V']){const tg=M[k]||A.row[k];T[k].update(dt,t,tg)}
    const lp=M.lotus||A.row.lotus;if(!lotus.cur)lotus.cur=lp.slice();const kf=1-Math.exp(-dt*(D.fast?40:(s.lotusRate||2)));for(let i=0;i<3;i++)lotus.cur[i]+=(lp[i]-lotus.cur[i])*kf;
    lotus.x=lotus.cur[0];lotus.y=lotus.cur[1];lotus.s=lotus.cur[2];lotus.pulse=.5+.5*Math.sin(t*TAU/2.4);lotus.update(t);
    tf(lotTgt.g,0,0,1);lotTgt.x=lotus.x;lotTgt.y=lotus.y-lotus.r*lotus.s*.55;lotTgt.a.setAttribute('transform',`scale(${f3(lotus.s)})`);lotTgt.update(t);
    tf(wg,lotus.x,LP(560,1000),1,0,1,.3);op(wg,st.glow);if(st.glow>0)wg.setAttribute('transform',`translate(${f1(lotus.x)} ${LP(560,1000)}) scale(${f3(.8+.25*st.glow)} ${f3((.8+.25*st.glow)*.3)}) rotate(0)`);
    under.setAttribute('transform',`translate(${f1(lotus.x)} ${f1(lotus.y+12*lotus.s)}) scale(${f3(lotus.s*(.9+.08*Math.sin(t*1.1)*m))})`);op(under,st.under);
    op(spread,st.spread>0?1:0);if(st.spread>0)spr.forEach(o=>{const R=(140+o.ring*130)*lotus.s*(.3+.7*st.spread);tf(o.f,lotus.x+Math.cos(o.a+t*.05*m)*R*1.6,lotus.y+20+Math.sin(o.a+t*.05*m)*R*.32,clamp(st.spread*1.4-o.ring*.4,0,1)*lotus.s,t*20*m)});
    if(M.lak){lak.x=M.lak[0];lak.y=M.lak[1];lak.s=M.lak[2]}op(lakL,st.lakK);if(st.lakK>0)lak.update(dt,t);
    if(M.devas){devas.forEach((f,i)=>{f.x=M.devas[i][0];f.y=M.devas[i][1];f.s=M.ds;f.f=i<2?1:-1});}op(devL,st.devK);if(st.devK>0)devas.forEach(f=>f.update(dt,t));
    const pl=L.portrait?[[90,1500,.9,1],[910,1500,.9,-1],[230,1510,.7,1],[770,1510,.7,-1]]:[[90,812,1,1],[1688,812,1,-1],[300,816,.8,1],[1478,816,.8,-1]];
    plants.forEach((p,i)=>tf(p,pl[i][0],pl[i][1],pl[i][2],(i<2?Math.sin(t*.7+i)*2*m:0),pl[i][3],1));
    op(floatL,st.floats);if(st.floats>0)floats.forEach(o=>tf(o.f,LP(260,90)+o.u*LP(1258,820),LP(690,1260)+Math.sin(t*.8+o.ph)*12*m-((o.u*7)%3)*LP(30,60),st.floats*1.1,t*12*m));
    light.update(dt,t)};
  return s}
/* Shot 1.1: the recap shows the great churning from the Dhanteras story, the devas and asuras pulling Vasuki round Mount Mandara on Kurma */
async function shot1_1(){Store.set('scene',1);mood('wonder');Music.mood('ocean');Music.setLevel(.5,3);
  const s=churnScene({mood:'wonder'});const C=s.C;D.setScene(s,900);const M=churnMotor(s);M.base=C.flow;M.rbase=C.rot;C.ringK=0;
  groupSet(C.devas,'pull');groupSet(C.asuras,'pull');
  s.cam.fx=LP(889,500);s.cam.fy=LP(470,860);D.go(s.cam,{z:1.06},42000,'io');
  await D.wait(700);
  await D.say('Children, something magical is about to happen!',{cues:[['magical',()=>AU.sfx('sparkle')]]});
  await D.say('Do you remember our adventure at the Ocean of Milk?',{cues:[['adventure',()=>{D.go(M,{speed:.6},1600);D.go(C,{ringK:1},1500)}]]});
  await D.say('We saw Lord Vishnu become Kurma, the giant tortoise, and Lord Shiva protect the universe from the deadly poison.',
    {cues:[['Kurma',()=>{AU.sfx('chime');D.go(C.K,{ring:1},1200);s.fx.ripple(C.A.kx,C.A.ky-40,LP(420,300),P.turmeric,1800,.25)}]]});
  await D.say('The danger had passed, but the great churning continued.',{cues:[['churning',()=>{D.go(M,{speed:1.2},1400);D.go(C,{glim:1,energy:1},1800);AU.sfx('drum')}]]});
  await D.late();await D.wait(900)}
async function shot1_2(){mood('wonder');let s=D.scene;if(!s||s.id!=='ocean'){s=oceanStage();s.mode='est';s.st.tort=0;s.st.glow=.6;D.setScene(s,1600)}
  D.go(s.cam,{z:1},1600);s.setSea('bright',1800);D.go(s.st,{glow:0,tort:0},1400);s.mode='row';const T=s.T;
  const rise=(k)=>{AU.sfx('ripple');D.go(T[k],{rise:1},1600,'out');const p=s.lay()[k];Timers.add(400,()=>s.fx.ripple(p[0],p[1]+150*p[2],LP(220,180),P.foam,1300,.3))};
  const pulse=async k=>{await D.tw(T[k],{act:1},700,'out');await D.tw(T[k],{act:0},900)};
  await D.say('And one by one, wonderful treasures emerged from the ocean!');
  await D.say('Kamadhenu, the divine cow.',{cues:[['Kamadhenu',()=>{rise('K');Timers.add(900,()=>pulse('K').catch(()=>{}))}]]});
  await D.say('Airavata, the magnificent white elephant.',{cues:[['Airavata',()=>{rise('A');Timers.add(900,()=>pulse('A').catch(()=>{}))}]]});
  await D.say('And Kalpavriksha, the magical wish-fulfilling tree.',{cues:[['Kalpavriksha',()=>{rise('V');Timers.add(900,()=>pulse('V').catch(()=>{}))}]]});
  await D.late();D.go(s.st,{glow:.6},1500);await D.wait(1200)}
async function shot1_3(){mood('suspense');Music.mood('mystery');let s=D.scene;if(!s||s.id!=='ocean'){s=oceanStage();D.setScene(s,0);['K','A','V'].forEach(k=>s.T[k].rise=1)}
  const lot=s.lotus;s.setSea('suspense',2200);s.mode='mystery';s.lotusRate=.25;lot.cur=s.lay().lotus.slice();lot.cur[1]+=LP(340,420);lot.glowK=.2;
  s.cam.fx=LP(889,500);s.cam.fy=LP(600,980);
  await D.say('But suddenly, the ocean began to glow!',{cues:[['glow',()=>{AU.sfx('chime');D.go(s.st,{glow:1},2000)}]]});
  await D.say('A beautiful golden light shimmered beneath the waves.',{cues:[['shimmered',()=>{D.go(s.st,{under:1},1800);D.go(lot,{glowK:.6},2000)}]]});
  await D.say('The water sparkled. A giant pink lotus slowly rose from the ocean.',{cues:[['sparkled',()=>{AU.sfx('sparkle');D.go(s.st,{floats:1},1500)}],['rose',()=>{AU.sfx('rise');D.go(s.cam,{z:1.06},9000,'io')}]]});
  await D.say('And guess what?');
  await D.say('Someone extraordinary was about to appear!',{cues:[['extraordinary',()=>D.go(lot,{glowK:1},1500)]]});
  await D.late();s.lotusRate=2}
/* ---- INT-01 Discover the Treasures ---- */
async function act1(){mood('excited');Music.mood('ocean');let s=D.scene;if(!s||s.id!=='ocean'){s=oceanStage();D.setScene(s,0);['K','A','V'].forEach(k=>s.T[k].rise=1);Object.assign(s.st,{glow:1,under:1,floats:1});s.lotus.glowK=1;s.setSea('suspense',0)}
  const tok=D.token;const T=s.T;D.go(s.cam,{z:1},1400);s.mode='act1';s.setSea('bright',1800);D.go(s.st,{under:.4,floats:.6,glow:.25},1200);
  const keys=['K','A','V'];let n=0;
  await D.wait(1200);
  D.instr('Tap the treasures to discover their names!','0 of 3 treasures','tap');keys.forEach(k=>D.go(T[k].tgt,{on:1},600));
  const R=150;
  const discover=k=>{const tr=T[k];if(tr.found){AU.sfx('sparkle');const c=tr.cur;s.fx.burst(c[0],c[1]-R*c[2]*.6,4,'spark');return}tr.found=true;n++;AU.sfx('found');
    D.go(tr.tgt,{on:0},400);D.go(tr,{outl:1,flowerK:1,tagK:1},600,'out');(async()=>{await D.tw(tr,{act:1},700,'out');await D.wait(500);await D.tw(tr,{act:0},900)})().catch(()=>{});
    const c=tr.cur;s.fx.burst(c[0],c[1]-R*c[2]*.4,7,'spark',2.6);D.counter(`${n} of 3 treasures`);D.say(TNAME[k],{noCap:true}).catch(()=>{});if(n>=3&&s._t)s._t.finish()};
  const hit=p=>{let best=null,bd=1e9;for(const k of keys){const c=T[k].cur;const d=Math.hypot(p.x-c[0],p.y-c[1]);if(d<R*c[2]*1.1&&d<bd){bd=d;best=k}}return best};
  s.down=p=>{const k=hit(p);if(k)discover(k);else{s.fx.ripple(p.x,p.y,60,P.foam,800);AU.sfx('ripple')}};
  s.hots=()=>keys.map(k=>({id:'tr'+k,label:(T[k].found?'Discovered: ':'Treasure: tap to discover its name. ')+(T[k].found?TNAME[k]:''),x:T[k].cur[0],y:T[k].cur[1],r:R*T[k].cur[2],on:()=>discover(k)}));
  await D.say('Tap the treasures to discover their names!',{noCap:true});
  await D.task({hint:'Tap a glowing treasure!',start(t){s._t=t;if(n>=3)t.finish()},
    demo(){const k=keys.find(k=>!T[k].found);if(k){const c=T[k].cur;s.demo.tap(c[0],c[1],2)}},
    async assist(t){for(const k of keys){if(!T[k].found){discover(k);await D.wait(1400)}}t.finish()}});
  s._t=null;s.down=null;s.hots=null;D.guard(tok);await D.wait(900);D.clearAct();
  /* all three glow together, then the narration resumes */
  AU.sfx('success');for(const k of keys){D.go(T[k],{glowAll:1},500);Timers.add(700,()=>D.go(T[k],{glowAll:0},800))}
  await D.say('Wonderful! You discovered the treasures!');
  await D.say('But look! The golden light is getting brighter!',{cues:[['brighter',()=>{D.go(s.st,{under:1,glow:1},1500);D.go(s.lotus,{glowK:1},1200)}]]});
  await D.say('What do you think is hiding inside that beautiful lotus?');
  await D.say('Tap the lotus to find out!')}
/* ---- INT-02 Reveal the Lotus ---- */
async function act2(){mood('excited');let s=D.scene;if(!s||s.id!=='ocean'){s=oceanStage();D.setScene(s,0);['K','A','V'].forEach(k=>{s.T[k].rise=1;s.T[k].found=true;s.T[k].outl=1;s.T[k].flowerK=1});Object.assign(s.st,{glow:1,under:1,floats:.6});s.lotus.glowK=1}
  const tok=D.token;const lot=s.lotus;s.mode='act2';s.setSea('suspense',1600);['K','A','V'].forEach(k=>{D.go(s.T[k],{dim:1,tagK:0},1200)});
  await D.wait(1300);
  let opened=false;let res;const doneP=new Promise(r=>res=r);
  const ring=s.lotTgt;
  const open=async()=>{if(opened)return;opened=true;Speech.stop();if(D.skipFn)D.skipFn();D.go(ring,{on:0},300);D.clearAct();
    await D.wait(D.fast?5:450);AU.sfx('rise');Music.setLevel(.8,2);
    D.go(lot,{openO:1},2400,'io');for(let i=0;i<3;i++)Timers.add(300+i*600,()=>AU.sfx('petal'));
    await D.wait(D.fast?5:1500);D.go(lot,{openI:1},2200,'io');D.go(s.st,{spread:1},2600,'out');for(let i=0;i<3;i++)Timers.add(200+i*550,()=>AU.sfx('petal'));
    await D.wait(D.fast?5:2300);Music.mood('warm');Music.swell();AU.sfx('bell');await D.wait(D.fast?5:900);res()};
  /* the lotus is the only prominent target; taps elsewhere make a ripple */
  const near=p=>Math.hypot(p.x-lot.x,p.y-(lot.y-lot.r*lot.s*.5))<lot.r*lot.s*.85;
  s.down=p=>{if(near(p))open().catch(()=>{});else{s.fx.ripple(p.x,p.y,60,P.foam,800);AU.sfx('ripple')}};
  s.hots=()=>opened?[]:[{id:'lotus',label:'The glowing lotus: tap to reveal the mystery',x:lot.x,y:lot.y-lot.r*lot.s*.5,r:lot.r*lot.s*.8,on:()=>open().catch(()=>{})}];
  D.go(ring,{on:1},600);
  await D.ask('Tap the lotus to reveal the mystery!',null,'tap');
  await D.task({hint:'Tap the glowing lotus!',start(t){doneP.then(()=>t.finish())},demo(){s.demo.tap(lot.x,lot.y-lot.r*lot.s*.5,2)},assist(){open().catch(()=>{})}});
  await doneP;D.guard(tok);s.down=null;s.hots=null;D.clearAct();await D.late()}
