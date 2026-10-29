/* ===== EPISODE 1: THE JOURNEY OF COURAGE, scenes 1.1 to 1.4 ===== */

/* ---------- Scene 1.1: The Golden City of Ayodhya ---------- */
function scAyodhya(){const s=mkScene('1.1',{frame:'lotus'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp);
  skyBg(s,{kind:'day',horizon:[470,760],sun:[[1180,200],[700,300]],sunR:118,ground:['flower',P.marigold,P.ivory,.9],clouds:[[.14,.22,250],[.84,.18,300],[.42,.3,170]]});s.sunRise=260;
  const rama=cast(s,'rama',CAST.rama,mid),sita=cast(s,'sita',CAST.sita,mid),lak=cast(s,'lak',CAST.lak,mid);
  const folk=[];for(let i=0;i<6;i++)folk.push(cast(s,'folk',personCfg(40+i,{child:i===1||i===4}),mid,{s:.7}));
  mid.insertBefore(grp(mid),mid.firstChild);folk.forEach(f=>mid.insertBefore(f.g,rama.g));
  s.pos=()=>LP({sita:[700,742,1,1],rama:[860,742,1,-1],lak:[1010,746,1,-1],folk:[[420,610,.5,1],[480,616,.42,1],[540,606,.5,1],[1240,606,.5,-1],[1300,616,.42,-1],[1360,610,.5,-1]]},
    {sita:[330,1232,1.05,1],rama:[520,1232,1.05,-1],lak:[700,1240,1,-1],folk:[[130,968,.55,1],[200,978,.45,1],[270,964,.55,1],[730,964,.55,-1],[800,978,.45,-1],[870,968,.55,-1]]});
  onOrient(s,[back,fore],P_=>{const pal=palace(back,{w:1000,h:220});tf(pal.g,LP(889,500),LP(470,760),LP(.62,.5));s.pk=pal.pk;
    (LP([[120,500,.55,0],[300,520,.62,1],[1480,520,.62,2],[1660,500,.55,3]],[[90,790,.5,0],[910,790,.5,2]])).forEach(([x,y,k,v])=>{const h=house(back,{w:220,h:190,v});tf(h.g,x,y,k)});
    /* garlands strung across the courtyard */
    LP([[120,346,300,346],[1480,346,1660,346]],[[90,650,250,656],[750,656,910,650]]).forEach(([a,b,c,d])=>garland(back,a,b,c,d,12));
    const pd=keepArt(s,pond(fore,LP(320,260),LP(80,76)));tf(pd.g,LP(270,180),LP(730,1410),1);
    /* the road that leads out of the city */
    pathBand(back,LP([[960,800],[1180,760],[1420,720],[1800,700]],[[620,1500],[760,1400],[900,1330],[1040,1300]]),LP(70,80),P.marigold);
    frameFlora(fore,LP([[60,806,170],[1720,806,180],[1590,812,130],[520,816,110,P.verm]],[[60,1496,170],[950,1496,170],[400,1505,120]]));
    const p=s.pos();put(rama,p.rama);put(sita,p.sita);put(lak,p.lak);folk.forEach((f,i)=>put(f,p.folk[i]))});
  s.tick=(dt,t)=>{(s.pk||[]).forEach((pk,i)=>pk.set(.3+.35*(.5+.5*Math.sin(t*1.3+i*1.7))*MV()))};
  drift(s,16,LP([0,0,1778,810],[0,0,1000,1500]));folk.forEach((f,i)=>f.set(i%2?'wait':'idle',0));return s}
async function shot1_1(){mood('warm');Music.mood('day');Amb.set('city');const s=D.setScene(scAyodhya(),900);const {rama,sita,lak}=s.cast;const folk=[].concat(s.cast.folk);
  s.cam.z=LP(1.7,1.5);s.cam.fx=LP(300,200);s.cam.fy=LP(470,780);D.go(s,{sunRise:0},9000,'out');D.go(s.cam,{z:1,fx:889*LP(1,0)+LP(0,500),fy:LP(405,750)},9000,'io');
  await titleCard(1,'The Journey of Courage');
  await say("Long ago, in the beautiful kingdom of Ayodhya, lived Prince Rama, his wife Sita, and his devoted brother Lakshmana.",[["Prince Rama",()=>rama.nod()],["his wife Sita",()=>sita.set('smile',500)],["devoted brother",()=>lak.set('smile',500)]]);
  await say("Rama was known for his courage, kindness and truthfulness. But one day, his life took an unexpected turn.",[["courage",()=>rama.set('bless',700)],["But one day",()=>{rama.set('idle',600);sita.set('concerned',700);lak.set('concerned',700)}]]);
  await say("Rama was asked to leave the palace and spend fourteen years in the forest.",[["leave the palace",()=>rama.set('lookdown',900)],["forest",()=>folk.forEach(f=>f.set('sad',900))]]);
  await say("Though the decision was difficult, Rama accepted it calmly. Sita chose to accompany him, and Lakshmana joined them too.",[["accepted it calmly",()=>{rama.set('determined',700);rama.nod()}],["Sita chose",()=>sita.set('stepToward',700)],["Lakshmana joined",()=>lak.set('namaste',700)]]);
  const say5=say("And so, their extraordinary journey began.",[["journey",()=>{folk.forEach(f=>f.set('wave',600))}]]);
  await D.wait(600);rama.set('idle',300);await rama.turn(1);await D.wait(300);sita.set('idle',300);lak.turn(1);await say5;
  goWalk(rama,rama.x+LP(260,160),rama.y,3600);await D.wait(400);goWalk(sita,sita.x+LP(260,160),sita.y,3600);await D.wait(300);goWalk(lak,lak.x+LP(240,140),lak.y,3600);
  await hold(2600);await D.late();
  await Trans.run('vines',()=>shot1_2pre(),{ms:1300})}

/* ---------- the forest, reused by 1.2, 1.3 and 1.4 ---------- */
function forestArt(s,back,fore,o){o=o||{};const P_=L.portrait;
  /* distant patterned hills */
  const hills=grp(back);(P_?[[200,760,420],[700,760,520]]:[[260,430,520],[900,430,700],[1520,430,560]]).forEach(([x,y,w],i)=>shp(hills,`M${x-w/2} ${y}Q${x} ${y-w*.55} ${x+w/2} ${y}Z`,Pat.u('hatch',K,i%2?P.forest:P.leaf,.9),4));
  /* a row of patterned trees behind the clearing */
  const trees=[];(P_?[[60,820,560],[300,800,500],[560,830,560],[820,810,520],[980,820,560]]:[[40,480,520],[230,470,460],[470,480,520],[1240,470,480],[1480,480,540],[1720,470,500]]).forEach(([x,y,h],i)=>{
    if(o.skip&&o.skip.includes(i))return;const T_=keepArt(s,tree(back,{h,seed:i*3+1,flowers:i%3===1?P.verm:null,leaf:i%2?[P.leaf,P.forest]:[P.forest,P.leaf]}));tf(T_.g,x,y,1);trees.push(T_)});
  /* the stream: rhythmic curved lines with fish */
  if(o.stream!==false){const sd=P_?smooth([[-20,900],[300,880],[600,930],[1020,900]],false):smooth([[-20,560],[400,540],[900,580],[1400,550],[1800,570]],false);ln(back,sd,K,64);ln(back,sd,P.peacock,56);
    const sw=ln(back,sd,P.ivory,4,{'stroke-dasharray':'14 18'});keepArt(s,{update:t=>sw.setAttribute('stroke-dashoffset',f1(-t*30*MV()))});
    for(let i=0;i<3;i++){const f=fish(back,P.marigold,P.verm);const [x,y]=P_?[200+i*300,900]:[300+i*520,555];tf(f.g,x,y,.5,0,i%2?-1:1)}}
  /* birds on the branches and a deer peeking from the leaves */
  const birds=[];(P_?[[300,520],[820,530]]:[[230,250],[1480,220],[470,240]]).forEach(([x,y],i)=>{const b=bird(back,i%2?P.peacock:P.indigo);birds.push({b,x,y,ph:i*2})});
  keepArt(s,{update:t=>birds.forEach(B=>{const hop=Math.max(0,Math.sin(t*1.7+B.ph));tf(B.b.g,B.x+Math.sin(t*.3+B.ph)*10,B.y-hop*hop*14*MV(),.9,0,Math.sin(t*.2+B.ph)>0?1:-1);tf(B.b.w,0,0,1,-hop*30)})});
  if(o.deer!==false){const dg=grp(back);const dr=deer(dg);const [dx,dy]=P_?[860,1010]:[260,600];const bsh=grp(back);bush(bsh,140,P.leaf,P.marigold);tf(bsh,dx,dy+10,1);
    keepArt(s,{update:t=>{const k=Math.max(0,Math.sin(t*.45));tf(dg,dx+8,dy-10-k*44,1)}})}
  return{trees}}
function shadeLayer(g){const sh=grp(g);rect(sh,-400,-200,2600,1900,Pat.u('hatch2',P.indigo,'none',1.3),0);op(sh,0);return sh}

/* ---------- Scene 1.2: A New Life in the Forest (three keyframes) ---------- */
function scForest(kf){const s=mkScene('1.2'+kf,{frame:'forest'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp),top=grp(s.comp);
  skyBg(s,{kind:kf==='c'?'shadow':'forest',kind2:'shadow',horizon:[450,780],ground:['leafy',P.leaf,P.forest,.9],clouds:[[.2,.2,240],[.7,.14,300]]});s.skyMix=0;
  const rama=cast(s,'rama',CAST.rama,mid),lak=cast(s,'lak',CAST.lak,mid);const sita=kf==='a'?cast(s,'sita',CAST.sita,mid):null;
  s.pos=()=>LP({rama:[640,740,.92,1],sita:[500,744,.92,1],lak:[360,746,.9,1],hut:[1330,560],vig:[1530,170,104],cloud:[-300,140]},{rama:[520,1290,1,1],sita:[330,1300,1,1],lak:[160,1310,.95,1],hut:[760,880],vig:[750,250,120],cloud:[-300,300]});
  onOrient(s,[back,fore,top],P_=>{const p=s.pos();forestArt(s,back,fore,{deer:kf!=='c'});const h=hut(back,LP(220,200));tf(h,p.hut[0],p.hut[1],1);
    pathBand(back,P_?[[-40,1480],[260,1360],[520,1300],[720,1180],[780,960]]:[[-40,800],[300,760],[700,730],[1100,650],[1300,600]],LP(66,76),P.marigold);
    if(kf==='c'){/* the empty space where Sita had been: her seat stone and a basket of flowers */const st=grp(back);const [x,y]=P_?[860,1010]:[1150,640];shp(st,'M-50 0Q-44 -34 0 -38Q44 -34 50 0Z',Pat.u('grid',P.terra,P.ivory,.8),4);
      const bk=grp(st,{transform:'translate(66 -4)'});drawProp(bk,'basket',{});tf(st,x,y,1)}
    frameFlora(fore,P_?[[50,1496,170],[950,1496,170,P.verm],[500,1505,110]]:[[50,806,170],[1730,806,180,P.verm],[1000,812,120]]);
    s.shade=shadeLayer(top);op(s.shade,s.shadeK||0);
    s.vig=vignette(top,p.vig[2],(g,r)=>{rect(g,-r,-r,r*2,r*2,Pat.u('stars',P.gold,P.maroon,.7),0);const sk=lankaSkyline(g,r*1.6,r*1.1,{n:5,ps:.6});tf(sk,0,r*.55,1);const o_=ocean(g,r*2,r*.5,r*1.2,{n:2,scale:.5,life:0});tf(o_.g,-r,0,1)});
    tf(s.vig,p.vig[0],p.vig[1],1);op(s.vig,s.vigK||0);
    s.dark=grp(top);const dc=cloud(s.dark,LP(520,420),P.indigo,P.peacock);s.darkC=dc;op(s.dark,s.darkK||0);
    put(rama,p.rama);put(lak,p.lak);if(sita)put(sita,p.sita)});
  s.tick=()=>{op(s.shade,s.shadeK||0);op(s.vig,s.vigK||0);if(s.vig)tf(s.vig,s.pos().vig[0],s.pos().vig[1],.6+.4*(s.vigK||0));op(s.dark,s.darkK||0);if(s.dark)tf(s.dark,s.darkX||-300,LP(150,300),1)};
  return s}
/* keyframe B: Ravana approaches Sita, respectfully and without weapons; then a distant chariot crosses to Lanka */
function scDeparture(){const s=mkScene('1.2b',{frame:'forest'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp);
  skyBg(s,{kind:'shadow',horizon:[450,780],ground:['leafy',P.leaf,P.forest,.9],clouds:[[.2,.2,240],[.72,.14,280]]});
  const sita=cast(s,'sita',CAST.sita,mid);const rav=part(s,new Ravana(mid));
  s.pos=()=>LP({sita:[620,740,.95,1],rav:[1240,744,.62],rav0:[1700,744]},{sita:[300,1300,1,1],rav:[700,1290,.62],rav0:[1100,1290]});
  onOrient(s,[back,fore],P_=>{const p=s.pos();forestArt(s,back,fore,{deer:false,skip:P_?[3]:[4]});const h=hut(back,LP(200,190));tf(h,LP(340,160),LP(600,900),1);
    frameFlora(fore,P_?[[50,1496,170],[950,1496,170,P.verm]]:[[50,806,170],[1730,806,180,P.verm]]);put(sita,p.sita);if(!s.moved){rav.x=p.rav0[0];rav.y=p.rav0[1];rav.s=p.rav[2]}});
  sita.set('concerned',0);rav.set('stand',0);return s}
function scChariotSky(){const s=mkScene('1.2s',{frame:'lanka'});artPart(s);const back=grp(s.comp),mid=grp(s.comp);
  skyBg(s,{kind:'shadow',horizon:[560,900],sea:'night',seaN:4,life:.6,clouds:[[.15,.3,260],[.55,.2,320],[.85,.34,220]]});
  onOrient(s,[back,mid],P_=>{const ls=lankaSkyline(back,LP(420,380),LP(170,170),{n:6});tf(ls,LP(1440,760),LP(560,900),1);s.ch=farChariot(mid);tf(s.ch,-200,200,1)});
  s.k=0;s.tick=()=>{if(!s.ch)return;const a=LP([180,230],[120,420]),b=LP([1440,470],[760,780]);const k=s.k;tf(s.ch,lerp(a[0],b[0],k),lerp(a[1],b[1],k)-Math.sin(k*Math.PI)*60,LP(1.1,1)*(1-k*.6))};return s}
async function shot1_2pre(){D.setScene(scForest('a'),0)}
async function shot1_2(){mood('warm');Amb.set('forest');let s=D.scene;if(!s||s.id!=='1.2a')s=D.setScene(scForest('a'),900);const {rama,lak,sita}=s.cast;
  const p=s.pos();rama.x-=LP(700,500);lak.x-=LP(700,500);sita.x-=LP(700,500);
  goWalk(lak,p.lak[0],p.lak[1],6200);goWalk(sita,p.sita[0],p.sita[1],6200);goWalk(rama,p.rama[0],p.rama[1],6200);
  await say("The forest was filled with tall trees, flowing streams and the songs of birds. Rama, Sita and Lakshmana made a peaceful home among nature.",[["peaceful home",()=>{sita.set('smile',600);rama.set('smile',600)}]]);
  await hold(600);mood('suspense');
  await say("But far away, in the kingdom of Lanka, lived Ravana, a powerful king.",[["far away",()=>{D.go(s,{vigK:1},1400);rama.set('concerned',800)}],["powerful king",()=>{s.darkX=-400;D.go(s,{darkK:1,shadeK:.55,skyMix:.6},2400);D.go(s,{darkX:LP(1900,1100)},9000,'lin')}]]);
  await hold(1400);
  /* keyframe B: the departure, through a patterned wipe */
  let b;await Trans.run('wipe',()=>{b=D.setScene(scDeparture(),0)},{pat:'flower',a:P.gold,b:P.indigo,ms:900});const rav=b.parts.find(x=>x instanceof Ravana);const bp=b.pos();
  b.moved=true;tw(rav,{x:bp.rav[0]},3200,'io');
  await say("One day, Ravana took Sita away to Lanka.");await hold(2400);b.cast.sita.set('determined',600);await hold(1200);
  let c;await Trans.run('wipe',()=>{c=D.setScene(scChariotSky(),0)},{pat:'chevron',a:P.gold,b:P.maroon,ms:800});await D.tw(c,{k:1},5200,'io');await hold(400);
  /* keyframe C: Rama's discovery */
  let d;await Trans.run('wipe',()=>{d=D.setScene(scForest('c'),0);d.shadeK=.35},{pat:'leafy',a:P.leaf,b:P.forest,ms:900});const R=d.cast.rama,Lk=d.cast.lak;const dp=d.pos();
  put(R,LP([1000,700,.95,1],[620,1200,1,1]));put(Lk,LP([760,720,.92,1],[300,1260,.95,1]));R.set('concerned',0);Lk.set('concerned',0);mood('serious');
  await say("When Rama discovered that Sita was missing, he was heartbroken.",[["missing",()=>R.set('lookdown',900)]]);
  await hold(500);mood('warm');
  await say("But he did not give up.",[["did not give up",()=>{R.set('determined',700);R.nod()}]]);
  await say("With Lakshmana beside him, Rama began searching for her.",[["Lakshmana beside",()=>Lk.set('pointAhead',700)],["searching",()=>{R.turn(-1);Lk.turn(-1);goWalk(R,R.x-LP(300,180),R.y,3600);goWalk(Lk,Lk.x-LP(300,180),Lk.y,3600)}]]);
  await hold(1800);await D.late()}

/* ---------- Activity 1.3: Follow the Forest Clues ---------- */
function scClues(){const s=mkScene('1.3',{frame:'forest'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp),fx=grp(s.comp);
  skyBg(s,{kind:'forest',horizon:[420,700],ground:['leafy',P.leaf,P.forest,.9],clouds:[[.3,.2,220],[.8,.24,200]]});
  const rama=cast(s,'rama',CAST.rama,mid),lak=cast(s,'lak',CAST.lak,mid);
  s.pos=()=>LP({rama:[300,740,.92,1],lak:[150,748,.9,1],clue:[[470,730,90],[1000,690,110],[1380,520,110]],wrong:[[690,470,100]],
      fork:[[889,830],[889,640],[860,560]],good:[[889,640],[1000,690],[1160,640],[1300,560],[1380,500]],bad:[[860,580],[760,500],[680,450]]},
    {rama:[200,1420,1,1],lak:[840,1430,1,-1],clue:[[430,1300,90],[650,1030,110],[720,700,110]],wrong:[[250,800,110]],
      good:[[500,1180],[650,1030],[700,880],[720,700],[730,600]],bad:[[500,1180],[380,960],[250,800]]});
  const C={found:[false,false,false],objs:[],tg:[],pulse:0};s.C=C;
  onOrient(s,[back,fore,fx],P_=>{const p=s.pos();forestArt(s,back,fore,{deer:false,stream:true,skip:P_?[3]:[3,4]});
    /* the fork: the overgrown side (left) and the clear path (right) between two patterned trees */
    pathBand(back,P_?[[500,1520],[500,1300],[500,1180]]:[[889,830],[889,700],[889,640]],LP(90,96),P.marigold);
    pathBand(back,p.bad,LP(70,80),P.terra);pathBand(back,p.good,LP(80,86),P.marigold);
    const ov=grp(back);p.bad.slice(1).forEach(([x,y],i)=>{const b=grp(ov,{transform:`translate(${x} ${y})`});bush(b,LP(130,140),P.forest)});
    const tr=P_?[[600,760,380],[860,740,400]]:[[1260,520,380],[1520,520,420]];tr.forEach(([x,y,h],i)=>{const T_=keepArt(s,tree(back,{h,seed:40+i,leaf:[P.leaf,P.forest],flowers:P.marigold,nf:6}));tf(T_.g,x,y,1)});
    /* the three clues, each in its own area */
    C.objs=[];const fl=clueFlower(back);tf(fl,p.clue[0][0],p.clue[0][1],1.2);const fp=cluePrints(back);tf(fp,p.clue[1][0],p.clue[1][1],1.15,LP(-14,-50));
    const pg=grp(back);const pd=smooth(P_?[[-60,60],[-20,0],[10,-50],[40,-90]]:[[-80,40],[-30,0],[20,-30],[70,-50]],false);ln(pg,pd,K,40);ln(pg,pd,P.marigold,32);dots(pg,pd,P.verm,6,14);tf(pg,p.clue[2][0],p.clue[2][1],1);
    [fl,fp,pg].forEach((g,i)=>{const glow=grp(fx);rings(glow,p.clue[i][2]*.8,{n:2,step:.18,w:5,c1:P.turmeric,c2:P.ivory,dots:16});tf(glow,p.clue[i][0],p.clue[i][1],1);op(glow,C.found[i]?1:0);C.objs[i]={g,glow}});
    C.route=grp(fx);const rt=footTrail(C.route,p.good,LP(9,9));op(C.route,C.joined?1:0);
    C.tg=p.clue.map(c=>{const t_=target(fx,c[2]);t_.x=c[0];t_.y=c[1];return t_});
    frameFlora(fore,P_?[[40,1496,150],[960,1496,150,P.verm]]:[[40,806,150],[1740,806,160,P.verm]]);put(rama,p.rama);put(lak,p.lak)});
  s.F=fxLayer(s);s.hand=demoHand(s);
  s.tick=(dt,t)=>{const open=C.found.map((f,i)=>f?-1:i).filter(i=>i>=0);C.tg.forEach((t_,i)=>{const on=C.active&&!C.found[i]&&open.length&&open[Math.floor(t/1.6)%open.length]===i;t_.on=lerp(t_.on,on||C.hint===i?1:C.active&&!C.found[i]?.25:0,.12);t_.update(t)});
    C.objs.forEach((o,i)=>{if(C.found[i])tf(o.glow,s.pos().clue[i][0],s.pos().clue[i][1],1+.05*Math.sin(t*2)*MV())});if(C.route)op(C.route,C.joinK||0)};
  s.hots=()=>C.active?s.pos().clue.map((c,i)=>C.found[i]?null:{id:'clue'+i,x:c[0],y:c[1],r:c[2],label:['A fallen flower','Footprints','A path between two trees'][i],on:()=>s.tapClue(i)}).filter(Boolean):[];
  s.tapClue=i=>{if(!C.active||C.found[i])return;C.found[i]=true;const p=s.pos();AU.sfx('chime');s.F.burst(p.clue[i][0],p.clue[i][1]-30,8,'spark',3);op(C.objs[i].glow,1);
    C.hint=-1;const next=C.found.findIndex(f=>!f);if(next>=0)s.F.trail([p.clue[i][0],p.clue[i][1]],[p.clue[next][0],p.clue[next][1]],P.turmeric);
    rama.set(i===0?'lookdown':'gestureClue',500);lak.set(i===2?'pointAhead':'smile',500);Hot.dirty=true;D.counter(`${C.found.filter(Boolean).length} of 3 clues`);if(C.found.every(Boolean))C.done&&C.done()};
  s.down=pt=>{if(!C.active)return;const p=s.pos();let best=-1,bd=1e9;p.clue.forEach((c,i)=>{const d=Math.hypot(pt.x-c[0],pt.y-c[1]);if(d<c[2]*1.15&&d<bd&&!C.found[i]){bd=d;best=i}});
    if(best>=0){s.tapClue(best);return}if(p.clue.some((c,i)=>C.found[i]&&Math.hypot(pt.x-c[0],pt.y-c[1])<c[2]))return;
    const w=p.wrong[0];const tangled=Math.hypot(pt.x-w[0],pt.y-w[1])<w[2]*1.6;const now=T.now;if(now-(C.lastNudge||-1e9)<2600)return;C.lastNudge=now;AU.sfx('soft');
    const nx=C.found.findIndex(f=>!f);C.hint=nx;Timers.add(2600,()=>{if(C.hint===nx)C.hint=-1});lak.set('gestureClue',400);
    D.say([['lak',tangled?"That side is all tangled up. Let's look for another clue!":"Look closely, a clue is waiting nearby. Let's try again!"]]).catch(()=>{})};
  return s}
async function shot1_3(){mood('inviting');Amb.set('forest');const s=D.setScene(scClues(),900);const {rama,lak}=s.cast;const C=s.C;rama.set('lookdown',0);lak.set('gestureClue',0);
  await hold(800);
  await say("Oh, young explorers! Can you help Rama and Lakshmana discover which way Sita went? Look carefully. Which clues can help us follow the path?");
  D.instr('Tap the three clues: a flower, footprints and the path','0 of 3 clues','tap');C.active=true;Hot.dirty=true;
  await D.task({hint:"Can you spot the fallen flower, the footprints and the path between the trees?",hintWho:'lak',
    start(t){C.done=()=>t.finish()},demo(){const i=C.found.findIndex(f=>!f);if(i>=0){C.hint=i;const c=s.pos().clue[i];s.hand.tap(c[0],c[1],2)}},
    assist(t){const step=()=>{if(t.done)return;const i=C.found.findIndex(f=>!f);if(i<0)return;s.tapClue(i);Timers.add(2400,step)};step()}});
  C.active=false;D.clearAct();Hot.dirty=true;await hold(600);
  /* the footprints and the path join into one glowing route */
  C.joined=true;AU.sfx('success');await D.tw(C,{joinK:1},1400);rama.set('idle',400);rama.nod();lak.set('pointAhead',600);await hold(700);
  await say("You found the clues! Every little discovery brings Rama one step closer to finding Sita. Let’s keep going!",[["closer",()=>{rama.set('determined',500)}]]);
  rama.turn(1);goWalk(rama,LP(1300,700),LP(560,880),5200);await D.wait(500);goWalk(lak,LP(1160,620),LP(620,980),5200);await hold(2600);await D.late()}

/* ---------- Scene 1.4: A Brave Friend Appears (meeting, the leap, the Ashoka grove) ---------- */
function scMeet(){const s=mkScene('1.4a',{frame:'forest'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp);
  skyBg(s,{kind:'forest',horizon:[440,760],ground:['leafy',P.leaf,P.forest,.9],clouds:[[.2,.2,240],[.7,.15,300]]});
  const rama=cast(s,'rama',CAST.rama,mid),lak=cast(s,'lak',CAST.lak,mid),han=cast(s,'hanuman',CAST.hanuman,mid);
  s.pos=()=>LP({rama:[640,744,1,1],lak:[460,748,.96,1],han:[1060,744,1,-1],han0:[1900,200]},{rama:[360,1290,1.05,1],lak:[160,1310,1,1],han:[720,1290,1.05,-1],han0:[1200,500]});
  onOrient(s,[back,fore],P_=>{const p=s.pos();forestArt(s,back,fore,{deer:false,skip:P_?[2,3]:[3]});frameFlora(fore,P_?[[50,1496,160],[950,1496,160,P.verm]]:[[50,806,160],[1730,806,170,P.verm]]);
    put(rama,p.rama);put(lak,p.lak);put(han,p.han);if(!s.landed){han.x=p.han0[0];han.y=p.han0[1]}});
  s.F=fxLayer(s);
  /* leaves that spiral around Hanuman and settle */
  s.leaves=[];const lg=grp(s.top);for(let i=0;i<10;i++){const e=grp(lg);shp(e,leafD(28,9),i%2?P.leaf:P.forest,2.2);s.leaves.push({e,a:i/10*TAU,r:90+i%3*20})}s.leafK=0;
  s.tick=(dt,t)=>{const k=s.leafK;s.leaves.forEach((l,i)=>{op(l.e,k>0?Math.min(1,k*3):0);if(k<=0)return;const a=l.a+t*2.2;const r=l.r*(.4+.6*k);tf(l.e,han.x+Math.cos(a)*r,han.y-150*han.s+Math.sin(a)*r*.6+(1-k)*120,1,a/DEG)})};
  return s}
function scLeapSea(){const s=mkScene('1.4s',{frame:'fish'});artPart(s);const back=grp(s.comp),mid=grp(s.comp);
  skyBg(s,{kind:'ocean',horizon:[520,860],sea:'day',seaN:5,clouds:[[.12,.24,260],[.5,.16,320],[.86,.3,240]]});
  const han=cast(s,'hanuman',CAST.hanuman,mid);
  onOrient(s,[back],P_=>{const ls=lankaSkyline(back,LP(360,300),LP(150,150),{n:5});tf(ls,LP(1500,520),LP(780,860),1)});
  s.k=0;s.tick=()=>{const a=LP([120,520],[120,900]),b=LP([1480,440],[780,760]);const k=s.k;han.x=lerp(a[0],b[0],k);han.y=lerp(a[1],b[1],k)-Math.sin(k*Math.PI)*LP(360,420);han.s=LP(.7,.7)};
  han.set('leap',0);return s}
function scGrove(o){o=o||{};const s=mkScene(o.id||'1.4g',{frame:'lotus'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp),top=grp(s.comp);
  skyBg(s,{kind:'lanka',horizon:[450,780],ground:['flower',P.leaf,P.forest,1],clouds:[[.2,.24,240],[.78,.16,260]],stars:6});
  const sita=cast(s,'sita',CAST.sita,mid),han=cast(s,'hanuman',CAST.hanuman,mid);
  s.pos=o.pos||(()=>LP({sita:[1040,742,1.05,-1],han:[760,744,1,1],han0:[-120,744],tree:[1130,760,640],lotus:[1230,760],ring:[0,0]},{sita:[640,1290,1.1,-1],han:[330,1300,1.05,1],han0:[-150,1300],tree:[700,1300,820],lotus:[860,1320]}));
  onOrient(s,[back,fore,top],P_=>{const p=s.pos();/* hints of golden Lanka behind the grove */const ls=lankaSkyline(back,LP(1700,1000),LP(300,340),{n:LP(9,6),flat:true,ps:.9});tf(ls,LP(889,500),LP(500,780),1);
    const wall=palaceWall(back,LP(1900,1100),LP(70,80),P.gold,P.maroon);tf(wall,-60,LP(470,790),1);
    (P_?[[90,880,480],[930,860,440]]:[[90,520,460],[330,500,420],[1650,520,480]]).forEach(([x,y,h],i)=>{const T_=keepArt(s,tree(back,{h,seed:60+i,flowers:P.marigold,leaf:[P.leaf,P.forest]}));tf(T_.g,x,y,1)});
    const at=keepArt(s,ashoka(back,p.tree[2]));tf(at.g,p.tree[0],p.tree[1],1);
    s.lot=lotus(fore,{r:LP(46,52),n:7,open:s.lotK||0});tf(s.lot.g,p.lotus[0],p.lotus[1],1);
    frameFlora(fore,P_?[[40,1496,150,P.verm],[960,1496,150]]:[[40,806,150,P.verm],[1740,806,160]]);
    s.warm=grp(top);const wr=rings(s.warm,LP(260,300),{n:3,step:.16,w:5,c1:P.turmeric,c2:P.marigold,dots:22});tf(s.warm,p.warm?p.warm[0]:(p.sita[0]+p.han[0])/2,p.warm?p.warm[1]:p.sita[1]-LP(140,150),1);op(s.warm,s.warmK||0);
    put(sita,p.sita);put(han,p.han);if(!s.arrived){han.x=p.han0[0]}});
  s.F=fxLayer(s);s.tick=(dt,t)=>{if(s.lot)s.lot.set(s.lotK||0);if(s.warm){op(s.warm,s.warmK||0);s.warm.firstChild&&tf(s.warm.firstChild,0,0,1,t*4*MV())}};
  sita.set('seatedSad',0);han.set('walk',0);return s}
async function shot1_4(){mood('energetic');Amb.set('forest');const s=D.setScene(scMeet(),900);const {rama,lak,hanuman:han}=s.cast;rama.set('idle',0);lak.set('idle',0);
  await hold(500);
  /* the leap into frame: anticipation, a whoosh, leaves spiralling, a gentle landing */
  const p=s.pos();han.set('leap',0);AU.sfx('whoosh');const o={k:0};const a=p.han0,b=p.han;s.leafK=1;
  const iv=setInterval(()=>{han.x=lerp(a[0],b[0],o.k);han.y=lerp(a[1],b[1],o.k)-Math.sin(o.k*Math.PI)*LP(160,220)*(1-o.k)},16);
  await D.tw(o,{k:1},1500,'io');clearInterval(iv);s.landed=true;han.x=b[0];han.y=b[1];han.set('land',200);AU.sfx('land');D.go(s,{leafK:0},1600);rama.set('stepToward',500);lak.set('smile',500);await hold(700);han.set('bowResp',700);
  await say("During his search, Rama met Hanuman, a brave and devoted helper.",[["Rama met",()=>rama.set('namaste',700)],["devoted",()=>han.set('namaste',600)]]);
  await say("Hanuman promised to help find Sita.",[["promised",()=>{han.set('speakGently',600);rama.set('bless',700)}]]);
  /* Rama gives Hanuman his ring */
  han.hold('f','ring',{r:13});han.set('standRing',600);rama.set('idle',600);AU.sfx('sparkle');await hold(900);
  await say("With courage in his heart, he leapt across the mighty ocean towards Lanka.",[["courage",()=>{han.turn(1);han.set('prepLeap',700)}],["leapt",()=>{han.set('leap',300);AU.sfx('whoosh');D.go(han,{x:LP(1950,1250),y:LP(150,300)},1300,'in')}]]);
  let sea;await Trans.run('iris',()=>{sea=D.setScene(scLeapSea(),0);sea.cast.hanuman.hold('f','ring',{r:13})},{at:LP([1300,300],[700,600]),pat:'wave',a:P.ivory,b:P.peacock,ms:800});
  AU.sfx('whoosh');await D.tw(sea,{k:1},4200,'io');await hold(300);
  /* the Ashoka grove */
  let g;await Trans.run('wipe',()=>{g=D.setScene(scGrove(),0)},{pat:'flower',a:P.gold,b:P.maroon,ms:900});const {sita,hanuman:H}=g.cast;H.hold('f','ring',{r:13});mood('gentle');Amb.set('grove');
  await say("There, he discovered Sita sitting beneath a tree in the Ashoka grove.");
  const gp=g.pos();g.arrived=true;
  await say("Hanuman approached her gently and gave her Rama’s ring.",[["approached",()=>{H.set('walk',200);tw(H,{x:gp.han[0]},2600,'io').then(()=>H.set('kneelPresent',900))}]]);
  await hold(1600);H.hold('f','ring',{r:LP(24,26)});AU.sfx('sparkle');const hp=H.hand('f');g.F.burst(hp[0],hp[1]-40,7,'spark',2.6);sita.set('seatedHope',1200);await hold(1800);
  await say([['hanuman',"‘Sita, Rama has not forgotten you,’"],['narr','he reassured her.'],['hanuman',"‘He is coming to bring you home.’"]],[["coming",()=>H.set('kneelPresent',400)]]);
  await hold(800);Music.swell();
  await say("For the first time in a long while, Sita felt hope.",[["Sita felt hope",()=>{sita.set('receiveRing',1400);D.go(g,{lotK:1,warmK:1},3200);AU.sfx('bloom');g.bloom(1)}]]);
  /* stillness for the emotional beat */
  await hold(2600);sita.set('seatedJoy',1200);await hold(2400);await D.late();
  const rp=H.hand('f');await Trans.run('iris',()=>shot1_5pre(),{at:[rp[0],rp[1]-30],pat:'wave',a:P.ivory,b:P.ocean,ms:1100})}
