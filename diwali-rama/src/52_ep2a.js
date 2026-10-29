/* ===== EPISODE 2: THE RETURN OF LIGHT, scenes 2.1 to 2.5 ===== */

/* ---------- opening recap: the gates of Lanka open ---------- */
function scRecap(){const s=mkScene('2.0',{frame:'lanka'});artPart(s);const back=grp(s.comp),mid=grp(s.comp);
  skyBg(s,{kind:'lanka',horizon:[640,1060],ground:['scale',P.maroon,P.gold,1],stars:10});
  const rama=cast(s,'rama',CAST.rama,mid),han=cast(s,'hanuman',CAST.hanuman,mid);
  s.pos=()=>LP({gate:[889,640,1.25],rama:[330,760,.9,1],han:[190,770,.9,1]},{gate:[500,1060,1],rama:[330,1440,.8,1],han:[160,1450,.8,1]});
  onOrient(s,[back],P_=>{const p=s.pos();const ls=lankaSkyline(back,LP(1500,950),LP(470,560),{n:LP(9,6)});tf(ls,p.gate[0],p.gate[1]-20,1);
    s.gate=lankaGate(back,260,280);tf(s.gate.g,p.gate[0],p.gate[1],p.gate[2]);s.gate.set(s.gk||0);put(rama,p.rama);put(han,p.han)});
  s.gk=0;s.tick=()=>s.gate&&s.gate.set(s.gk);rama.hold('b','bow');rama.set('determined',0);return s}

/* ---------- Scene 2.1: The Battle for Hope ---------- */
function scBattle(){const s=mkScene('2.1',{frame:'lanka'});artPart(s);const back=grp(s.comp),air=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp);
  skyBg(s,{kind:'lanka',kind2:'gold',horizon:[430,880],ground:['grid',P.gold,P.maroon,1.1],clouds:[[.15,.3,220],[.82,.26,240]],stars:8});s.skyMix=0;
  const rama=cast(s,'rama',CAST.rama,mid),lak=cast(s,'lak',CAST.lak,mid),han=cast(s,'hanuman',CAST.hanuman,mid);const rav=part(s,new Ravana(mid));s.rav=rav;
  s.pos=()=>LP({rama:[460,744,1.05,1],lak:[250,750,.82,1],han:[110,752,.84,1],rav:[1320,760,1.15],sky:[200,1500,90,300]},
    {rama:[300,1380,1.2,1],lak:[110,1250,.88,1],han:[130,1460,.92,1],rav:[690,1080,1.15],sky:[80,920,240,700]});
  const B={arrows:[],shields:[],dust:[],swirls:[],calm:0};s.B=B;
  onOrient(s,[back,air,fore],P_=>{const p=s.pos();/* the grand courtyard: a palace wall, patterned columns, symmetrical floral border */
    const ls=lankaSkyline(back,LP(1800,1100),LP(300,320),{n:LP(11,7),flat:true});tf(ls,LP(889,500),LP(430,880),1);
    const wl=palaceWall(back,LP(1900,1100),LP(60,70),P.maroon,P.verm);tf(wl,-60,LP(430,880),1);
    (P_?[[40,1500],[960,1500]]:[[50,820],[1728,820]]).forEach(([x,y])=>{const c=grp(back,{transform:`translate(${x} ${y})`});rect(c,-34,-LP(680,960),68,LP(680,960),Pat.u('hlines',K,P.gold,.9),4);
      for(let k=1;k<6;k++)dots(c,`M-30 ${-k*LP(120,170)}H30`,P.verm,6,12);shp(c,`M-50 ${-LP(680,960)}H50L36 ${-LP(700,980)}H-36Z`,P.verm,3)});
    B.swirls=(P_?[[200,240,70],[800,300,80],[500,520,60]]:[[300,150,80],[889,110,70],[1480,150,80],[640,300,50],[1140,300,50]]).map(([x,y,r],i)=>{const g=grp(air,{transform:`translate(${x} ${y})`});const w=swirl(g,r,i%2?P.gold:P.terra);return{g:w,i}});
    B.arrows=[];for(let i=0;i<6;i++){const g=grp(air);arrowLine(g,LP(110,90),i%2?P.ivory:P.turmeric);op(g,0);B.arrows.push({g,k:0,dir:i%2?-1:1,lane:i})}
    B.shields=[];for(let i=0;i<3;i++){const g=grp(air);shieldFlash(g,LP(46,40));op(g,0);B.shields.push({g,k:0})}
    B.dust=[];(P_?[[300,1380],[700,1080],[180,1460]]:[[460,760],[1330,770],[900,780],[640,790],[1120,790]]).forEach(([x,y],i)=>{const g=grp(fore,{transform:`translate(${x} ${y})`});const d=dustCurl(g,LP(120,100),i%2?P.gold:P.terra);B.dust.push({g:d,i,x,y})});
    B.final=grp(air);B.fire=fireArrow(B.final,LP(200,170));op(B.final,0);
    put(rama,p.rama);put(lak,p.lak);put(han,p.han);rav.x=p.rav[0];rav.y=p.rav[1];rav.s=p.rav[2]});
  s.tick=(dt,t)=>{const p=s.pos();const m=MV()*(1-B.calm);const ax=p.sky[0],bx=p.sky[1],y0=p.sky[2],y1=p.sky[3];
    B.swirls.forEach(w=>tf(w.g,0,0,1,(t*14*(w.i%2?1:-1))*m));
    B.arrows.forEach(a=>{if(!B.fight){op(a.g,lerp(+a.g.getAttribute('opacity')||0,0,.1));return}const ph=((t*.42+a.lane*.17)%1);const x=a.dir>0?lerp(ax,bx,ph):lerp(bx,ax,ph);const y=lerp(y0,y1,(a.lane%3)/3)+Math.sin(ph*Math.PI)*-40;
      tf(a.g,x,y,1,0,a.dir);op(a.g,Math.sin(ph*Math.PI)*.95)});
    B.shields.forEach((sh,i)=>{const ph=(t*.3+i*.33)%1;const on=B.fight?Math.max(0,Math.sin(ph*TAU))*.9:0;op(sh.g,on);tf(sh.g,lerp(ax+200,bx-200,(i+.5)/3),lerp(y0,y1,.5)+(i-1)*30,.8+.2*on)});
    B.dust.forEach(d=>{const r=B.dustK==null?.4:B.dustK;tf(d.g,0,-((t*12+d.i*20)%40)*r*m,.8+.4*r);op(d.g,.3+.7*r)})};
  rama.hold('b','bow');lak.hold('b','bow');rama.set('determined',0);lak.set('determined',0);han.set('determined',0);rav.set('raise',0);return s}
async function shot2_1(){Music.mood('lanka');Amb.set('lanka');mood('cliff');
  /* a short visual recap of the gates opening, through the symmetrical gate patterns */
  let r;await Trans.run('gate',()=>{r=D.setScene(scRecap(),0)},{ms:900});const rt=D.tw(r,{gk:1},5200,'io');
  await titleCard(2,'The Return of Light');await rt;await hold(400);
  let s;await Trans.run('gate',()=>{s=D.setScene(scBattle(),0)},{ms:900});const B=s.B;const rav=s.rav;const {rama,lak,hanuman:han}=s.cast;mood('serious');
  await say("Rama and his companions had reached Lanka, but Ravana would not let Sita go easily.",[["would not",()=>rav.set('proud',800)]]);
  await say("A great battle began. The sounds of bows and clashing weapons echoed through the kingdom.",[["battle began",()=>{rav.set('raise',800);rama.set('bowRaised',700);B.fight=true;AU.sfx('bow')}],
    ["clashing",()=>{AU.sfx('shield');D.go(B,{dustK:1},1500)}],["echoed",()=>AU.sfx('bow')]]);
  await hold(1200);AU.sfx('shield');
  await say("Rama stood firm. He remembered why he had come: not for fame or anger, but to rescue Sita and restore what was right.",[["stood firm",()=>{rama.set('determined',700)}],["rescue Sita",()=>{rama.nod()}]]);
  /* the decisive keyframe: the final arrow reaches Ravana's defensive space; his weapons lower and the energy subsides */
  B.fight=false;
  await say("At last, Rama faced Ravana with courage and determination.",[["faced Ravana",()=>rama.set('bowRaised',800)]]);
  /* Rama's final arrow is a fire arrow: it flies in an arc and strikes Ravana with a burst of flat flame shapes (no injury is shown) */
  const fin=(async()=>{const a=rama.hand('f');const b=[rav.x-10*rav.s,rav.y-232*rav.s];const o={k:0};op(B.final,1);AU.sfx('bow');AU.sfx('whoosh');
    const at=k=>[lerp(a[0],b[0],k),lerp(a[1],b[1],k)-Math.sin(k*Math.PI)*LP(90,120)];
    const iv=setInterval(()=>{const p=at(o.k),q=at(Math.min(1,o.k+.02));const ang=Math.atan2(q[1]-p[1],q[0]-p[0])/DEG;tf(B.final,p[0]-Math.cos(ang*DEG)*B.fire.len,p[1]-Math.sin(ang*DEG)*B.fire.len,1,ang);
      B.fire.tongues.forEach((t,i)=>t.firstChild.setAttribute('transform',`scale(${f3(1+.18*Math.sin(T.sec*18+i*2))} ${f3(1+.12*Math.sin(T.sec*14+i))})`))},16);
    await D.tw(o,{k:1},1500,'io');clearInterval(iv);op(B.final,0);
    AU.sfx('flicker');AU.sfx('shield');s.F=s.F||fxLayer(s);s.F.burst(b[0],b[1],14,'flame',TAU);s.F.burst(b[0],b[1],8,'spark',TAU);s.F.ripple(b[0],b[1],LP(200,170),P.marigold,1400);rav.set('lower',1200)})();
  await say("Rama’s final arrow struck its mark, and Ravana was defeated.",[["defeated",()=>{rav.set('defeated',2400);D.go(B,{calm:1,dustK:0},3000);D.go(s,{skyMix:1},5000)}]]);
  await fin;await hold(1000);AU.sfx('dust');rama.set('idle',900);lak.set('idle',900);han.set('idle',900);
  /* Ravana sinks back and fades into settling golden dust */
  D.go(rav,{gone:1},3600,'io');s.F.burst(rav.x,rav.y-120*rav.s,10,'spark',TAU);
  await say("The battle was over.");await hold(1200);mood('heartfelt');
  await say("The story reminds us that power alone does not make someone right. Courage, responsibility and the choice to do what is right matter far more.",[["Courage",()=>{rama.nod();s.bloom(.6)}]]);
  await hold(1400);await D.late();
  await Trans.run('dust',()=>shot2_2pre(),{ms:1200})}

/* ---------- Scene 2.2: Sita and Rama Reunite ---------- */
function scReunion(){const s=mkScene('2.2',{frame:'lotus'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp),top=grp(s.comp);
  skyBg(s,{kind:'warm',horizon:[450,880],ground:['flower',P.gold,P.terra,1],clouds:[[.18,.3,220],[.8,.3,240]]});
  const rama=cast(s,'rama',CAST.rama,mid),sita=cast(s,'sita',CAST.sita,mid),lak=cast(s,'lak',CAST.lak,mid),han=cast(s,'hanuman',CAST.hanuman,mid);const vans=VN(2).map(c=>cast(s,'vanaras',c,mid));
  vans.forEach(v=>mid.insertBefore(v.g,mid.firstChild));
  s.pos=()=>LP({rama:[720,744,1,1],sita:[1060,744,1,-1],rama2:[800,744],sita2:[980,744],lak:[480,750,.95,1],han:[1300,750,.95,-1],van:[[300,640,.6,1],[1480,640,.6,-1]],vig:[889,150,96]},
    {rama:[320,1270,1.15,1],sita:[690,1270,1.15,-1],rama2:[400,1270],sita2:[610,1270],lak:[130,1360,.98,1],han:[880,1365,.98,-1],van:[[150,1000,.6,1],[850,1000,.6,-1]],vig:[500,260,110]});
  onOrient(s,[back,fore,top],P_=>{const p=s.pos();/* Lanka stays visible but secondary */const ls=lankaSkyline(back,LP(1400,900),LP(200,220),{n:LP(9,6),flat:true,ps:.8});tf(ls,LP(889,450),LP(500,880),1);
    /* patterned pillars with flowering vines */
    (P_?[[60,1500,960],[940,1500,960]]:[[120,820,700],[1658,820,700],[560,450,180],[1218,450,180]]).forEach(([x,y,h],i)=>{const c=grp(back,{transform:`translate(${x} ${y})`});
      rect(c,-30,-h,60,h,Pat.u(i%2?'chevron':'hlines',i%2?P.terra:K,i%2?P.gold:P.terra,.9),4);const v=vineStrand(c,h*.9,P.leaf);tf(v.g,0,0,1,-90);shp(c,'M-46 0H46V14H-46Z',P.leaf,3);shp(c,`M-46 ${-h}H46L34 ${-h-18}H-34Z`,P.gold,3)});
    frameFlora(fore,P_?[[50,1496,150,P.verm],[950,1496,150]]:[[50,806,150,P.verm],[1730,806,160]]);
    s.vig=vignette(top,p.vig[2],(g,r)=>{rect(g,-r,-r,r*2,r*2,Pat.u('fdots',P.turmeric,P.ivory,.7),0);const pl=palace(g,{w:900,h:220});tf(pl.g,0,r*.7,.17)});tf(s.vig,p.vig[0],p.vig[1],1);op(s.vig,s.vigK||0);
    put(rama,p.rama);put(sita,p.sita);put(lak,p.lak);put(han,p.han);vans.forEach((v,i)=>put(v,p.van[i]));if(s.met){rama.x=p.rama2[0];sita.x=p.sita2[0]}});
  s.tick=()=>{if(s.vig){op(s.vig,s.vigK||0);tf(s.vig,s.pos().vig[0],s.pos().vig[1],.6+.4*(s.vigK||0))}};
  s.petals=drift(s,18,LP([0,0,1778,810],[0,0,1000,1500]));rama.hold('b','bow');return s}
async function shot2_2pre(){D.setScene(scReunion(),0)}
async function shot2_2(){mood('heartfelt');Amb.set('city');Music.mood('day');let s=D.scene;if(!s||s.id!=='2.2')s=D.setScene(scReunion(),900);const {rama,sita,lak,hanuman:han}=s.cast;const vans=[].concat(s.cast.vanaras);
  rama.set('idle',0);sita.set('concerned',0);lak.set('idle',0);han.set('idle',0);vans.forEach(v=>v.set('wait',0));await hold(900);
  /* they recognise each other, then take a small step together */
  rama.set('concerned',500);await hold(700);rama.set('smile',800);sita.set('smile',800);await hold(900);
  const p=s.pos();
  await say("After the battle, Rama and Sita were reunited.",[["reunited",()=>{rama.set('stepToward',600);sita.set('stepToward',600);D.go(rama,{x:p.rama2[0]},1600);D.go(sita,{x:p.sita2[0]},1600);s.met=true;Music.swell();D.go(s,{bloomK:1},3000);s.bloom(1)}]]);
  await hold(1800);rama.set('smile',800);sita.set('smile',800);
  await say("Hanuman and their companions rejoiced.",[["rejoiced",()=>{han.set('rejoice',600);vans.forEach(v=>v.set('rejoice',600));lak.set('smile',600);AU.sfx('celebrate')}]]);
  await hold(600);han.set('bowResp',900);
  await say("Their long journey had been filled with hardship, but their courage and friendship had carried them through.",[["friendship",()=>{vans.forEach(v=>v.set('wait',800))}]]);
  await say("Now there was one more journey to make.",[["one more",()=>{rama.set('idle',600);sita.set('idle',600);han.set('idle',600)}]]);
  await say("They would return to Ayodhya, where their story had begun.",[["Ayodhya",()=>{D.go(s,{vigK:1},1600);rama.set('bless',700);sita.set('smile',700)}]]);
  await hold(1600);await D.late();
  await Trans.run('petals',()=>shot2_3pre(),{ms:1200})}

/* ---------- Scene 2.3: The Journey Home ---------- */
function scJourney(){const s=mkScene('2.3',{frame:'peacock'});artPart(s);const land=grp(s.comp),mid=grp(s.comp),top=grp(s.comp);
  skyBg(s,{kind:'blue',horizon:[430,640],clouds:[[.1,.2,220],[.6,.12,260]]});
  const V={travel:0};s.V=V;let vm=null;const riders={};
  s.pos=()=>LP({vim:[800,260,.9],land:430,W:1778,H:810,ay:[1560,470]},{vim:[500,400,.85],land:640,W:1000,H:1500,ay:[760,690]});
  onOrient(s,[land,mid,top],P_=>{const p=s.pos();const W=p.W,H=p.H,y0=p.land;const r=rng(17);
    /* flat overlapping bands: hills, forests, fields with a winding river, villages; each band is three screens wide and scrolls */
    V.bands=[];const band=(y,h,sp,draw)=>{const g=grp(land);draw(g,y,h);V.bands.push({g,sp});return g};
    band(y0,(H-y0)*.22,.15,(g,y,h)=>{for(let x=-100;x<W*3;x+=260){const w=300+r()*120;shp(g,`M${x} ${y+h}Q${x+w/2} ${y-h*1.2} ${x+w} ${y+h}Z`,Pat.u('hatch',K,r()<.5?P.leaf:P.forest,.9),4)}});
    band(y0+(H-y0)*.16,(H-y0)*.2,.3,(g,y,h)=>{rect(g,-50,y+h*.4,W*3+100,h*1.4,Pat.u('leafy',P.leaf,P.forest,.9),3);for(let x=0;x<W*3;x+=110){const T_=tree(g,{h:h*1.6,cw:h*1.3,seed:x,leaf:[P.leaf,P.forest]});tf(T_.g,x,y+h*.9,1)}});
    band(y0+(H-y0)*.36,(H-y0)*.64,.6,(g,y,h)=>{const cols=[[P.turmeric,P.leaf],[P.leaf,P.marigold],[P.gold,P.forest],[P.marigold,P.leaf]];for(let x=-50,i=0;x<W*3;x+=340,i++){const c=cols[i%4];
        shp(g,`M${x} ${y}H${x+340}V${y+h+50}H${x}Z`,Pat.u(i%2?'vlines':'chevron',c[1],c[0],.9),3)}
      const rv=[];for(let x=-60;x<=W*3+60;x+=180)rv.push([x,y+h*.45+Math.sin(x/260)*h*.28]);const d=smooth(rv,false);ln(g,d,K,58);ln(g,d,P.peacock,48);const rw=ln(g,d,P.ivory,4,{'stroke-dasharray':'14 18'});V.river=rw;
      for(let x=200;x<W*3;x+=520){const vg=grp(g,{transform:`translate(${x} ${y+h*.2})`});for(let k=0;k<3;k++){const hh=house(vg,{w:110,h:90,v:k+x/520|0});tf(hh.g,k*96-96,0,.6)}}});
    /* the fields turn from green to gold as Ayodhya nears */
    V.gold=grp(land);rect(V.gold,-50,y0+(H-y0)*.36,W+100,(H-y0)*.7,Pat.u('fdots',P.gold,'none',1.4),0);
    V.ay=grp(land);const pl=palace(V.ay,{w:900,h:220});tf(pl.g,0,0,.5);
    /* the Pushpaka Vimana with Rama, Sita and Lakshmana inside */
    vm=vimana(mid);V.vm=vm;['rama','sita','lak'].forEach((k,i)=>{const f=new Fig(CAST[k],vm.riders);f.set('seated',0);f.s=.8;f.x=vm.seats[i][0];f.y=vm.seats[i][1]+8;f.f=1;riders[k]=f});
    riders.sita.set('seated',0);riders.sita.face.mouth='smile';riders.rama.face.mouth='smile';riders.rama.applyFace();
    V.clouds=[];for(let i=0;i<5;i++){const c=cloud(top,LP(200,160)+i*20,P.ivory,P.peacock);V.clouds.push({c,x:r()*W,y:(.1+r()*.3)*y0*1.4,sp:30+r()*30})}});
  s.cast=riders;
  s.tick=(dt,t)=>{const p=s.pos();const m=MV();const tr=V.travel;(V.bands||[]).forEach(b=>tf(b.g,-tr*p.W*2*b.sp,0,1));if(V.river)V.river.setAttribute('stroke-dashoffset',f1(-t*30*m));
    op(V.gold,clamp(tr*1.4-.3,0,1));if(V.ay){const k=sm(clamp((tr-.35)/.65,0,1));tf(V.ay,p.ay[0],p.ay[1],.25+.75*k);op(V.ay,k)}
    if(V.vm){tf(V.vm.g,p.vim[0]+Math.sin(t*.3)*30*m,p.vim[1]+Math.sin(t*.9)*10*m,p.vim[2]);V.vm.pk.set(.5+.3*Math.sin(t*1.2));Object.values(riders).forEach(f=>f.update(dt,t))}
    (V.clouds||[]).forEach(c=>{c.x-=dt*c.sp*m*(1+tr);if(c.x<-300)c.x=p.W+300;tf(c.c,c.x,c.y,1)})};
  return s}
async function shot2_3pre(){D.setScene(scJourney(),0)}
async function shot2_3(){mood('warm');Amb.set('none');Music.mood('light');let s=D.scene;if(!s||s.id!=='2.3')s=D.setScene(scJourney(),900);const V=s.V;const {rama,sita,lak}=s.cast;
  D.go(V,{travel:1},38000,'lin');
  await say("Rama, Sita and Lakshmana began their journey home.",[["journey home",()=>{sita.face.mouth='big';sita.face.eye='happy';sita.applyFace()}]]);
  await say("From above, they saw rivers winding through the land, forests stretching to the horizon and villages surrounded by fields.",[["rivers",()=>{lak.set('seatedPoint',700)}],["villages",()=>{lak.set('seated',700)}]]);
  await say("At last, Ayodhya appeared in the distance.",[["Ayodhya",()=>{if(V.travel<.6)D.go(V,{travel:.75},3000,'io')}]]);
  rama.face.eye='happy';rama.face.mouth='big';rama.applyFace();
  await say("The people had waited a long time for Rama’s return. Soon, the city would be filled with joy.");
  await hold(1600);await D.late();
  /* the palace silhouette becomes the focal point */
  const p=s.pos();await D.tw(s.cam,{z:2.4,fx:p.ay[0],fy:p.ay[1]-60},1800,'io')}

/* ---------- the city of Ayodhya at street level, reused by 2.4, 2.5 and 2.6 ---------- */
function cityLayout(){return LP({palace:[889,470,.6],houses:[[230,560,.8,0],[520,580,.7,1],[1250,580,.7,2],[1540,560,.8,4]],street:[[889,840],[889,700],[889,560],[889,480]]},
  {palace:[500,700,.5],houses:[[160,880,.7,0],[840,880,.7,2]],street:[[500,1540],[500,1200],[500,900],[500,720]]})}
function cityArt(s,back,o){o=o||{};const c=cityLayout();const P_=L.portrait;
  const pal=palace(back,{w:1000,h:220,col:o.wall||P.ivory,dome:o.dome||P.turmeric});tf(pal.g,c.palace[0],c.palace[1],c.palace[2]);s.pk=pal.pk;
  pathBand(back,c.street,LP(170,190),P.marigold,P.verm);
  const hs=c.houses.map(([x,y,k,v])=>{const h=house(back,{w:220,h:190,v});tf(h.g,x,y,k);return{h,x,y,k}});
  if(o.garlands!==false)hs.forEach(({h,x,y,k})=>{garland(back,x-110*k,y-190*k,x+110*k,y-190*k,10,7)});
  return{pal,hs,c}}

/* ---------- Scene 2.4: Ayodhya Gets Ready ---------- */
function scReady(){const s=mkScene('2.4',{frame:'gold'});artPart(s);const back=grp(s.comp),deco=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp);
  skyBg(s,{kind:'gold',kind2:'dusk',horizon:[560,900],sun:[[1500,180],[820,260]],sunR:90,ground:['brick',P.terra,P.marigold,1],clouds:[[.2,.3,220],[.6,.2,240]]});s.skyMix=0;s.sunRise=0;
  const R={rang:0,gar:0,diyas:0};s.R=R;
  const ppl={sweep:personCfg(101,{child:false,fem:true}),rangoli:personCfg(102,{child:true,fem:true}),
    sweets:personCfg(105,{child:false,fem:true}),kid2:personCfg(106,{child:true,fem:true}),diya:personCfg(107,{child:false,fem:false}),kid3:personCfg(108,{child:true,fem:false})};
  const F={};for(const k in ppl)F[k]=cast(s,'folk',ppl[k],mid);s.F_=F;
  s.pos=()=>LP({sweep:[190,740,.9,1],rangoli:[420,748,.9,1],rang:[560,770,70],sweets:[1090,738,.9,1],kid2:[1190,750,.9,-1],diya:[1420,740,.9,1],kid3:[1640,748,.9,-1],
      lamps:[[1250,580],[520,580],[1540,560],[230,560],[1484,466],[286,466],[520,385],[1250,385]]},
    {sweep:[130,1110,.9,1],rangoli:[360,1120,.9,1],rang:[480,1140,64],sweets:[150,1400,.9,1],kid2:[280,1415,.9,-1],diya:[600,1395,.9,1],kid3:[860,1410,.9,-1],
      lamps:[[160,880],[840,880],[111,797],[889,797],[160,683],[840,683]]});
  onOrient(s,[back,deco,fore],P_=>{const p=s.pos();const C=cityArt(s,back,{garlands:false});s.C=C;
    /* garlands that get strung across the doorways */
    s.gars=C.hs.map(({x,y,k})=>{const g=garland(deco,x-110*k,y-190*k,x+110*k,y-190*k,10,7);return g.g});
    s.rang=rangoli(deco,p.rang[2],3,.5);tf(s.rang.g,p.rang[0],p.rang[1],1);
    /* unlit clay lamps, placed along doorways, windows and rooftops */
    s.lamps=p.lamps.map(([x,y])=>{const d=keepArt(s,diya(deco,{lit:0,decor:.6}));d.x=x;d.y=y;d.s=.5;return d});
    frameFlora(fore,P_?[[40,1500,140,P.verm],[960,1500,140]]:[[40,808,140,P.verm],[1740,808,150]]);
    for(const k in F)put(F[k],p[k])});
  s.tick=(dt,t)=>{if(s.rang)s.rang.set(R.rang);(s.gars||[]).forEach((g,i)=>op(g,clamp(R.gar*s.gars.length-i,0,1)));(s.lamps||[]).forEach((d,i)=>{op(d.g,clamp(R.diyas*s.lamps.length-i,0,1))});
    (s.pk||[]).forEach((pk,i)=>pk.set(.3+.3*Math.sin(t*1.2+i)))};
  F.sweep.hold('f','broom');F.sweets.hold('f','plate');F.diya.hold('f','diya',{lit:0});F.rangoli.hold('f','petal');
  for(const k in F)F[k].set('wait',0);return s}
async function shot2_4(){mood('welcome');Amb.set('city');Music.mood('day');let s=D.scene;if(!s||s.id!=='2.4')s=D.setScene(scReady(),900);const F=s.F_;const R=s.R;
  s.cam.z=1;await hold(400);
  await say("When the people of Ayodhya heard that Rama was returning, excitement spread through the city.",[["excitement",()=>{Object.values(F).forEach((f,i)=>Timers.add(i*120,()=>f.set('wave',500)));AU.sfx('celebrate')}]]);
  F.sweep.set('sweep',600);F.kid2.set('smile',600);F.kid3.set('wave',600);
  await say("Families decorated their homes with flowers.",[["decorated",()=>{D.go(R,{gar:1},4200,'lin')}]]);
  await say("Children made colourful rangoli patterns.",[["rangoli",()=>{F.rangoli.set('rangoli',600);R.rang=0;D.go(R,{rang:1},5200,'lin')}]]);
  await say("Sweet treats were prepared, and little clay lamps were placed along doorways, windows and rooftops.",[["Sweet",()=>{F.sweets.set('sweets',600);F.kid2.set('share',600)}],
    ["clay lamps",()=>{F.diya.set('placeDiya',700);D.go(R,{diyas:1},5200,'lin')}]]);
  await hold(800);
  await say("As the sun began to set, the city waited in joyful anticipation.",[["sun began",()=>{D.go(s,{skyMix:1,sunRise:LP(520,600)},7000,'io')}],["waited",()=>{Object.values(F).forEach(f=>{if(f!==F.sweep)f.set('wait',800)});F.sweep.set('idle',800)}]]);
  await say("Soon, the first lamps would shine.");
  await hold(1400);await D.late();
  /* the camera moves to a row of unlit diyas */
  const l=s.pos().lamps[0];await D.tw(s.cam,{z:2.2,fx:l[0],fy:l[1]},1800,'io')}

/* ---------- Activity 2.5: Light Up Ayodhya (twelve diyas; the last one at the palace entrance) ---------- */
function scLight(){const s=mkScene('2.5',{frame:'night'});artPart(s);const back=grp(s.comp),glowL=grp(s.comp),lampL=grp(s.comp),mid=grp(s.comp),fx=grp(s.comp);
  skyBg(s,{kind:'dusk',kind2:'night',horizon:[560,900],ground:['brick',P.maroon,P.terra,1],clouds:[[.2,.3,220],[.7,.24,240]],stars:12,stars2:16});s.skyMix=0;
  const A={lit:[],active:false,warm:0,lastNudge:-1e9};s.A=A;
  const folk=[personCfg(201,{child:false}),personCfg(202,{child:true}),personCfg(203,{child:false}),personCfg(204,{child:true})].map(c=>cast(s,'folk',c,mid));
  s.pos=()=>LP({diyas:[[300,770],[640,748],[1140,748],[1480,770],[520,585],[1250,585],[286,468],[1484,468],[1596,468],[520,388],[1250,388],[889,476]],
      folk:[[430,768,.78,1],[790,760,.7,1],[1000,760,.78,-1],[1340,768,.7,-1]]},
    {diyas:[[200,1430],[800,1430],[330,1230],[680,1230],[160,884],[840,884],[209,800],[791,800],[500,1060],[160,688],[840,688],[500,706]],
      folk:[[90,1340,.74,1],[910,1340,.74,-1],[200,1100,.64,1],[800,1100,.64,-1]]});
  onOrient(s,[back,glowL,lampL,fx],P_=>{const p=s.pos();const C=cityArt(s,back,{wall:P.ivory});s.C=C;
    /* window and arch glows that warm the whole city at the end */
    s.warmG=grp(back);C.hs.forEach(({h,x,y,k})=>h.win.forEach(([wx,wy])=>{const g=grp(s.warmG,{transform:`translate(${x+wx*k} ${y+wy*k})`});shp(g,`M${-22*k} 0V${-36*k}Q0 ${-56*k} ${22*k} ${-36*k}V0Z`,P.turmeric,3)}));
    const pa=C.c.palace;const ag=grp(s.warmG,{transform:`translate(${pa[0]} ${pa[1]}) scale(${pa[2]})`});shp(ag,'M-68 0V-124Q-68 -215 0 -215Q68 -215 68 -124V0Z',P.turmeric,4);rays(ag,30,120,14,P.marigold,4).setAttribute('transform','translate(0 -110)');op(s.warmG,A.warm);
    /* each diya has its own patch of patterns that light up around it */
    A.d=p.diyas.map(([x,y],i)=>{const patch=grp(glowL,{transform:`translate(${x} ${y-20})`});const r=LP(120,110);
      circ(patch,0,0,r,Pat.u('flower',P.gold,'none',1),0);circ(patch,0,0,r,'none',3,{stroke:P.turmeric,'stroke-dasharray':'.1 12','stroke-width':6,'stroke-linecap':'round'});
      const D_=keepArt(s,diya(lampL,{lit:0,light:0,decor:.7}));D_.x=x;D_.y=y;D_.s=LP(.78,.72);const tg=target(fx,LP(64,60));tg.x=x;tg.y=y-24;
      const o={i,x,y,D:D_,patch,tg,k:A.lit[i]?1:0};op(patch,o.k);if(A.lit[i]){D_.lit=1;D_.light=1}return o});
    folk.forEach((f,i)=>put(f,p.folk[i]))});
  s.F=fxLayer(s);s.hand=demoHand(s);
  const last=11;s.ready=i=>i!==last||A.lit.filter(Boolean).length>=11;
  s.tick=(dt,t)=>{op(s.warmG,A.warm);(A.d||[]).forEach(o=>{op(o.patch,o.k);if(o.k>0)tf(o.patch,o.x,o.y-20,(.5+.5*o.k)*(1+.04*Math.sin(t*1.3+o.i)*MV()));
    const want=A.active&&!A.lit[o.i]&&s.ready(o.i);o.tg.on=lerp(o.tg.on,want?(A.nudge===o.i?1:.35+.25*Math.sin(t*2+o.i)):0,.12);o.tg.update(t)})};
  s.light=i=>{if(A.lit[i]||!A.active)return;if(!s.ready(i)){s.nudge(i);return}A.lit[i]=true;const o=A.d[i];AU.sfx('diya');Timers.add(200,()=>AU.sfx('flicker'));D.go(o.D,{lit:1,light:1},700,'back');D.go(o,{k:1},1400,'out');
    /* the glow spreads to neighbouring motifs */
    A.d.forEach(n=>{if(n!==o&&!A.lit[n.i]&&Math.hypot(n.x-o.x,n.y-o.y)<LP(330,300))D.go(n,{k:Math.max(n.k,.35)},1600)});
    s.F.burst(o.x,o.y-50,6,'spark',2.4);const n=A.lit.filter(Boolean).length;D.counter(`${n} of 12 lamps`);D.go(s,{skyMix:n/12},1200);folk.forEach((f,j)=>{if(Math.hypot(f.x-o.x,f.y-o.y)<LP(380,360))f.set('smile',400)});
    Hot.dirty=true;if(n===12)A.done&&A.done()};
  s.nudge=(i)=>{const p=s.pos();const open=A.d.filter(o=>!A.lit[o.i]&&s.ready(o.i));if(!open.length)return;const near=open.sort((a,b)=>Math.hypot(a.x-p.diyas[i][0],a.y-p.diyas[i][1])-Math.hypot(b.x-p.diyas[i][0],b.y-p.diyas[i][1]))[0];
    A.nudge=near.i;Timers.add(2400,()=>{if(A.nudge===near.i)A.nudge=-1});AU.sfx('soft')};
  s.down=pt=>{if(!A.active)return;const hit=(A.d||[]).filter(o=>!A.lit[o.i]).sort((a,b)=>Math.hypot(a.x-pt.x,a.y-24-pt.y)-Math.hypot(b.x-pt.x,b.y-24-pt.y))[0];
    if(hit&&Math.hypot(hit.x-pt.x,hit.y-24-pt.y)<LP(80,76)){s.light(hit.i);return}
    if((A.d||[]).some(o=>A.lit[o.i]&&Math.hypot(o.x-pt.x,o.y-24-pt.y)<LP(70,66)))return;
    /* a tap on something else: the nearest unlit diya pulses gently */
    const d=(A.d||[]).map(o=>[o,Math.hypot(o.x-pt.x,o.y-pt.y)]).filter(([o])=>!A.lit[o.i]&&s.ready(o.i)).sort((a,b)=>a[1]-b[1])[0];if(d){A.nudge=d[0].i;Timers.add(2400,()=>{if(A.nudge===d[0].i)A.nudge=-1});AU.sfx('soft')}};
  s.hots=()=>A.active?(A.d||[]).filter(o=>!A.lit[o.i]&&s.ready(o.i)).map(o=>({id:'d'+o.i,x:o.x,y:o.y-24,r:LP(64,60),label:o.i===last?'The diya at the palace entrance':'Unlit diya '+(o.i+1),on:()=>s.light(o.i)})):[];
  folk.forEach((f,i)=>f.set(i%2?'wave':'wait',0));return s}
async function shot2_5(){mood('inviting');Amb.set('night');Music.mood('light');const s=D.setScene(scLight(),900);const A=s.A;
  await hold(600);
  await say("Rama is coming home! But Ayodhya is still waiting for its lights. Can you help the people welcome him? Tap the diyas to light them one by one!");
  D.instr('Tap each diya to light it','0 of 12 lamps','tap');A.active=true;Hot.dirty=true;
  await D.task({hint:"Tap a little clay lamp to light its flame.",
    start(t){A.done=()=>t.finish()},demo(){const o=A.d.find(o=>!A.lit[o.i]&&s.ready(o.i));if(o){A.nudge=o.i;s.hand.tap(o.x,o.y-24,2)}},
    assist(t){const step=()=>{if(t.done)return;const o=A.d.find(o=>!A.lit[o.i]&&s.ready(o.i));if(o){s.light(o.i);Timers.add(900,step)}};step()}});
  A.active=false;D.clearAct();Hot.dirty=true;
  /* the last lamp lights the palace entrance and the whole city warms */
  AU.sfx('success');await D.tw(A,{warm:1},1800);s.bloom(1);AU.sfx('bell');Music.swell();s.cast.folk.forEach(f=>f.set('wave',500));await hold(800);
  await say("Beautiful! Look how the light spreads from one little lamp to the next. Together, the people of Ayodhya have made the whole city shine!");
  await hold(1600);await D.late();
  /* the glowing entrance opens */
  const pa=cityLayout().palace;await D.tw(s.cam,{z:2.4,fx:pa[0],fy:pa[1]-60*pa[2]},1800,'io')}
