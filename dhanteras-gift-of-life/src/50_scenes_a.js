/* ===== Narration: verbatim from the four-minute story document ===== */
const TEXT={
  s1:['Long, long ago, there was a magical ocean called the Ocean of Milk. Hidden deep within its waves were wonderful treasures—and a very special nectar called Amrit, believed to grant immortality.',
    'One day, the devas, the celestial beings, began losing their strength. They needed help!',
    'Lord Vishnu advised them, “Churn the Ocean of Milk. Its treasures may bring back your strength.”',
    'But churning such a vast ocean was no easy task. The devas joined hands with the asuras, their powerful rivals, to begin this incredible mission.',
    'And so, the great adventure began!'],
  s2:['The devas and asuras chose Mount Mandara as their giant churning stick and the mighty serpent Vasuki as their rope.',
    'They pulled from opposite sides.','“Pull! Pull! Pull!”',
    'Round and round went the mountain. The ocean bubbled, the waves danced, and the water sparkled.',
    'But suddenly, the mountain began sinking into the ocean!',
    'Just then, Lord Vishnu transformed into Kurma, the mighty tortoise. He supported the mountain on his broad shell, allowing the churning to continue.',
    'With teamwork and determination, the devas and asuras pulled harder than ever!'],
  s3:['Suddenly, something terrible emerged from the ocean—a deadly poison called Halahala!',
    'Its dangerous fumes threatened the entire universe. Everyone was frightened. Who could save them?',
    'Lord Shiva stepped forward.',
    'To protect all living beings, he took the poison and held it in his throat. Its power turned his throat blue, and he became known as Neelkanth, the blue-throated Lord.',
    'The universe was saved!','The churning continued, and the ocean slowly returned to peace.'],
  s4:['One by one, magnificent treasures emerged from the Ocean of Milk!',
    'The wish-fulfilling cow Kamadhenu appeared.','A magnificent celestial elephant named Airavata rose from the waves.','The magical Kalpavriksha, the wish-fulfilling tree, appeared too.',
    'Then came Goddess Lakshmi, radiant and beautiful, bringing blessings of prosperity and abundance.',
    'Everyone watched in wonder.','But one precious gift was still waiting to appear!'],
  s5:['Suddenly, the ocean grew calm. A beautiful golden light spread across the waves.',
    'From its shimmering depths emerged Lord Dhanvantari, the divine physician.',
    'In his hands, he carried a shining pot filled with Amrit, the divine nectar.',
    'His arrival brought a message of healing, well-being, and the precious gift of health.',
    'The devas rejoiced! After all their effort, another wonderful treasure had appeared.',
    'This is why Dhanteras is associated with Lord Dhanvantari and the importance of health and well-being.'],
  s6:['Now, little Ocean Explorers, imagine that Lord Dhanvantari has brought a magical treasure pot just for you!',
    'What would you fill it with?','Gold and jewels? A loving family? Good health? Kindness? Wisdom?',
    'Gold and silver are precious, but our health, the love we share, and the kindness we show others make life truly beautiful.',
    'As we celebrate Dhanteras, let us remember that taking care of ourselves and others is one of life\'s greatest treasures.'],
  s7:['And so, the great churning of the Ocean of Milk gave the world many wonderful treasures—and reminded everyone of the value of courage, teamwork, compassion, and health.',
    'This Dhanteras, may your homes shine with light, your families be blessed with good health, and your hearts overflow with kindness.',
    'Happy Dhanteras, little Ocean Explorers!']};
const FISH_A=[[0,96,PAL.verm,PAL.gold,1.2,100],[0,80,PAL.turq,PAL.indigo,-1,700],[0,90,PAL.pink,PAL.gold,.9,1200],[0,74,PAL.gold,PAL.verm,-1.3,400]];
const par=(...a)=>Promise.all(a);

/* ---------- SCENE 1: THE OCEAN OF WONDERS ---------- */
const SC1={id:'DHANTERAS_SC01',mood:'ocean',
  state(){return{osp:0,fish:0,lot:[0,0,0],rip:[0,0,0],gm:[0,0,0],dev:0,vish:0,adv:0,asu:0,circ:0,worry:1,face:0,cheer:0}},
  build(p,S,P,W,H){const R={};const L=P?{hz:700,sun:[700,250,58],clouds:[[210,230,200],[560,430,170]],dev:[190,1010,.78],vish:[560,660,.66],asu:[720,1010,.74],bankL:[0,380,1010],bankR:[540,900,1010],
        lot:[[190,1200],[450,1265],[710,1200]],fishY:[1080,1150,1300,1380],c:[450,1150]}
      :{hz:420,sun:[1330,150,62],clouds:[[250,120,220],[760,92,180],[1040,210,150]],dev:[250,575,.94],vish:[1110,545,.8],asu:[1380,575,.92],bankL:[-10,470,575],bankR:[1250,1610,575],
        lot:[[560,690],[800,712],[1040,690]],fishY:[500,560,640,720],c:[800,600]};R.L=L;
    R.bd=backdrop(p,W,H,{hz:L.hz,sun:L.sun,clouds:L.clouds});
    R.circ=[0,1,2,3].map(i=>{const e=el('ellipse',{cx:L.c[0],cy:L.c[1],rx:10,ry:4,fill:'none',stroke:PAL.ocean,'stroke-width':6,'stroke-dasharray':'22 12',opacity:0},p);return e});
    R.fish=school(grp(p),W,FISH_A.map((f,i)=>[L.fishY[i],f[1],f[2],f[3],f[4],f[5]*(W/1600)]));
    bank(p,L.bankL[0],L.bankL[1],L.bankL[2]);bank(p,L.bankR[0],L.bankR[1],L.bankR[2]);
    R.devG=grp(p);R.dev=crowd(R.devG,'deva',3,1,P?70:96,L.dev[2]);
    R.vishG=grp(p);const vl=lotus(R.vishG,P?62:74,{t:1});tf(vl.g,0,14,1);R.vish=vishnu(R.vishG);
    R.asuG=grp(p);R.asu=crowd(R.asuG,'asura',3,-1,P?72:96,L.asu[2]);
    R.lots=L.lot.map(([x,y],i)=>{const g=grp(p,{transform:`translate(${x} ${y})`});const gm=mandala(g,62,{t:0});const rp=ripples(g,0,10,70,22);const lt=lotus(g,P?62:60,{t:0,seed:i+2});
      hitArea(p,R,'lotus'+i,'Lotus '+(i+1)+': wake up the ocean',x,y-20,P?90:80);return{g,gm,rp,lt,x,y}});
    return R},
  update(R,S,t,dt){const L=R.L;R.bd.update(t,dt,S);R.fish.update(t,dt,S.osp,S.fish);
    R.circ.forEach((e,i)=>{const u=clamp(S.circ*1.4-i*.13,0,1);setA(e,'rx',f1(20+u*(Stage.P?380:560)));setA(e,'ry',f1(8+u*(Stage.P?110:120)));op(e,u>0?Math.min(1,u*4)*(1-u*.4):0)});
    R.lots.forEach((o,i)=>{o.lt.set(S.lot[i]);o.gm.set(S.gm[i]);o.gm.spin(t*.02);o.rp.set(S.rip[i]);tf(o.g,o.x,o.y+Math.sin(t*.002+i)*5)});
    tf(R.devG,L.dev[0],L.dev[1]+(1-S.dev)*30);op(R.devG,S.dev);
    R.dev.pose(S.cheer>.5?'cheer':S.worry>.5?'worry':'stand',1,t);
    tf(R.vishG,L.vish[0],L.vish[1]+(1-S.vish)*40+Math.sin(t*.0015)*4,L.vish[2]);op(R.vishG,S.vish);R.vish.set(t,S.adv);
    tf(R.asuG,L.asu[0]+(1-S.asu)*(Stage.P?300:420),L.asu[1]);op(R.asuG,clamp(S.asu*2,0,1));R.asu.pose(S.cheer>.5?'cheer':'stand',1,t);
    R.asu.hop(t,S.asu>0&&S.asu<1?8:0)},
  async run(x,S){
    x.tw({osp:1,fish:1},2600);
    await x.say(TEXT.s1[0]);
    await x.act({keys:['lotus0','lotus1','lotus2'],autoKey:'lotus1',prompt:'Can you wake up the Ocean of Wonders?',hint:'Tap a glowing lotus on the water!',
      onHit:async k=>{const i=+k.slice(-1);x.sfx('wave');x.sfx('chime');x.R().fish.turn();
        await par(Tw.to(S.lot,{[i]:1},1100,Ease.out),Tw.to(S.rip,{[i]:1},1600,Ease.lin),Tw.to(S.gm,{[i]:1},1300,Ease.out),x.tw({osp:2.2},500));
        x.tw({osp:1},1200);await x.wait(300)}});
    x.tw({cz:1.12,cx:Stage.W*(Stage.P?.4:.32),cy:Stage.H*(Stage.P?.6:.5)},2400);x.tw({dev:1},1400);
    await x.say(TEXT.s1[1]);
    x.tw({cz:1.06,cx:Stage.W*(Stage.P?.55:.56)},2200);x.tw({vish:1},1600);
    await x.wait(500);x.tw({adv:1},900);x.sfx('chime');
    await x.say(TEXT.s1[2]);
    x.tw({adv:0},800);x.tw({cz:1,cx:Stage.W/2,cy:Stage.H/2},2200);x.tw({worry:0},400);x.tw({asu:1},2600,Ease.out);
    await x.say(TEXT.s1[3]);
    x.tw({cheer:1},300);x.sfx('chime');
    await x.say(TEXT.s1[4]);
    x.sfx('wave');x.tw({osp:2.4},1200);await x.tw({circ:1},2400,Ease.io)}};

/* ---------- SCENE 2: THE GREAT CHURNING BEGINS ---------- */
function coilAt(m,i){/* loop i of Vasuki around Mandara: left point, right point (local mountain units) */
  const ly=[-330,-250,-170][i],hw=[124,142,157][i];return{ly,hw}}
const SC2={id:'DHANTERAS_SC02',mood:'churn',
  state(){return{osp:1.6,rise:0,wrap:0,pull:0,churn:0,sink:0,kurma:0,km:[0,0,0],bub:0,hop:0,shake:0}},
  build(p,S,P,W,H){const R={};const L=P?{hz:840,sun:[720,240,56],clouds:[[220,250,190],[600,420,150]],mx:450,base:1093,ms:.9,ks:.6,ky:1200,kHide:1700,feet:905,fs:.6,gap:62,devX:140,asuX:760,head:[836,690],tail:-40}
      :{hz:430,sun:[1330,140,58],clouds:[[260,110,200],[1100,90,170]],mx:800,base:655,ms:.8,ks:.6,ky:760,kHide:1080,feet:565,fs:.9,gap:100,devX:260,asuX:1300,head:[1500,372],tail:-40};R.L=L;
    R.bd=backdrop(p,W,H,{hz:L.hz,sun:L.sun,clouds:L.clouds});
    bank(p,-10,L.devX+(P?120:200),L.feet);bank(p,L.asuX-(P?120:200),W+10,L.feet);
    R.bubbles=bubbles(grp(p),16,L.mx,L.base,P?260:300,L.base-L.hz+30,4);
    R.kurmaG=grp(p);R.kurma=kurma(R.kurmaG);
    R.backRope=grp(p);
    R.mtnG=grp(p);R.mtn=mandara(R.mtnG);
    R.front=grp(p);
    const mk=(g,w,c,extra)=>el('path',Object.assign({fill:'none',stroke:c,'stroke-width':w,'stroke-linecap':'round','stroke-linejoin':'round'},extra||{}),g);
    const scl=Pat.get('scale',PAL.indigo,PAL.turq,14);
    R.ropes=[R.backRope,R.front].map(g=>({ink:mk(g,P?38:34,PAL.ink),pat:mk(g,P?29:26,scl),mid:mk(g,4,PAL.verm,{'stroke-dasharray':'3 14'})}));
    R.headG=grp(p);vasukiHead(R.headG);
    R.devG=grp(p,{transform:`translate(${L.devX} ${L.feet})`});R.dev=crowd(R.devG,'deva',3,1,L.gap,L.fs);
    R.asuG=grp(p,{transform:`translate(${L.asuX} ${L.feet})`});R.asu=crowd(R.asuG,'asura',3,-1,L.gap,L.fs);
    R.kHit=grp(p);hitArea(R.kHit,R,'kurma','Kurma’s shell: help Kurma hold the mountain',0,-90,170);
    return R},
  update(R,S,t,dt){const L=R.L;R.bd.update(t,dt,S);const P=Stage.P;
    const ph=t*.0042*(1+S.churn*.6);const pull=Math.sin(ph)*S.pull;
    const base=L.base+S.sink*58*(P?1.1:1)+(1-S.rise)*(P?700:520),tilt=S.sink*3*Math.sin(t*.01)+S.shake*Math.sin(t*.05)*1.5;
    tf(R.mtnG,L.mx,base,L.ms,tilt);R.mtn.turn(pull*34*S.churn+Math.sin(t*.0009)*4);
    const ky=lerp(L.kHide,L.ky,S.kurma<.5?Ease.out(S.kurma*2)*.83:lerp(.83,1,Ease.io((S.kurma-.5)*2)));tf(R.kurmaG,L.mx,ky,L.ks);tf(R.kHit,L.mx,ky,L.ks);
    S.km.forEach((k,i)=>R.kurma.light(i,k));
    R.bubbles.update(t,S.bub);
    /* Vasuki: coil arcs in front of the mountain, ropes out to both teams */
    const M=(lx,ly)=>[L.mx+lx*L.ms,base+ly*L.ms];const dx=pull*(P?8:14);
    const c=[0,1,2].map(i=>{const{ly,hw}=coilAt(R.mtn,i);return{a:M(-hw,ly),b:M(hw,ly+18),m:M(0,ly+46)}});
    const fy=L.feet,rh=fy-(P?118:172);
    const left=P?[[-60+dx,rh+30],[40+dx,rh+4],[150+dx,rh],[250,rh+10],c[0].a]:[[L.tail+dx,rh+34],[120+dx,rh+6],[300+dx,rh],[470+dx,rh+2],[600,rh+6],c[0].a];
    const right=P?[c[2].b,[c[2].b[0]+70,c[2].b[1]-50],[700+dx,rh],[800+dx,rh-4],[L.head[0]+dx*.5,L.head[1]+80],[L.head[0]+dx*.5,L.head[1]]]
      :[c[2].b,[c[2].b[0]+90,c[2].b[1]-50],[1160+dx,rh],[1300+dx,rh],[1420+dx,rh-4],[L.head[0]+dx*.6,L.head[1]]];
    let dBack='',dFront=cr(left,false)+cr(right,false);
    c.forEach(k=>{dFront+=`M${f1(k.a[0])} ${f1(k.a[1])}Q${f1(k.m[0])} ${f1(k.m[1])} ${f1(k.b[0])} ${f1(k.b[1])}`});
    for(let i=0;i<2;i++){const a=c[i].b,b=c[i+1].a;dBack+=`M${f1(a[0])} ${f1(a[1])}Q${f1(L.mx)} ${f1((a[1]+b[1])/2-30)} ${f1(b[0])} ${f1(b[1])}`}
    R.ropes.forEach((r,j)=>{const d=j?dFront:dBack;[r.ink,r.pat,r.mid].forEach(e=>setA(e,'d',d));setA(r.mid,'stroke-dashoffset',f1(-t*.03*S.churn))});
    op(R.backRope,S.wrap);op(R.front,S.wrap);
    tf(R.headG,L.head[0]+dx*(P?.5:.6),L.head[1]+Math.sin(t*.003)*6,P?.8:1,P?-8:12+Math.sin(t*.002)*4);op(R.headG,clamp(S.wrap*3-2,0,1));
    const k=.6+.6*Math.sin(ph);R.dev.pose(S.pull>.1?'pull':'stand',S.pull>.1?k:1,t);R.asu.pose(S.pull>.1?'pull':'stand',S.pull>.1?1.2-k:1,t);
    R.dev.hop(t,S.hop*10);R.asu.hop(t+500,S.hop*10)},
  async run(x,S){
    x.sfx('rumble');await x.tw({rise:1},2000,Ease.out);
    x.tw({wrap:1},2600,Ease.io);
    await x.say(TEXT.s2[0]);
    x.tw({pull:1,churn:.6},900);x.tw({bub:.6,osp:2},1200);
    await x.say(TEXT.s2[1]);
    x.tw({hop:1},300);
    await x.say(TEXT.s2[2]);
    x.tw({hop:0},400);x.tw({churn:1,bub:1,osp:3},1500);x.sfx('bubble');
    await x.say(TEXT.s2[3]);
    x.sfx('rumble');x.tw({shake:1},300);x.tw({pull:.15,churn:.15},800);await x.tw({sink:.55},1100,Ease.in);
    await x.say(TEXT.s2[4]);
    x.tw({sink:1},700,Ease.in);x.tw({osp:1.2,bub:.3},800);
    await x.tw({kurma:.5},1600,Ease.out);x.sfx('chime');
    for(let i=0;i<3;i++){await Tw.to(S.km,{[i]:.5},320);if(!x.live())return}
    await x.act({keys:['kurma'],prompt:'Quick! Help Kurma support the mountain!',hint:'Tap Kurma’s patterned shell!',
      onHit:async()=>{x.sfx('accent');for(let i=0;i<3;i++){Tw.to(S.km,{[i]:1},420);await x.wait(160)}
        await par(x.tw({kurma:1},1300,Ease.out),x.tw({sink:0,shake:0},1300,Ease.out));x.sfx('chime')}});
    x.tw({pull:1,churn:1,bub:1,osp:2.6},900);
    await x.say(TEXT.s2[5]);
    x.tw({churn:1.6,osp:3.4},800);x.tw({hop:.6},400);
    await x.say(TEXT.s2[6]);
    x.tw({hop:0},300);x.tw({dark:.5,churn:2,osp:4.2},1800);x.sfx('bubble');await x.wait(1400)}};

/* ---------- SCENE 3: THE POISON AND THE PROTECTOR ---------- */
const SC3={id:'DHANTERAS_SC03',mood:'poison',
  state(){return{osp:4,dark:.5,bub:1,poison:0,shrink:0,flow:0,react:0,shiva:0,blue:0,heart:1,hk:0,sp:0,calm:0,gw:-.2,cheer:0,ray:0}},
  build(p,S,P,W,H){const R={};const L=P?{hz:780,pz:[450,840,.55],sh:[450,1330,.78],ht:[150,1290],dev:[150,800,.45],asu:[750,800,.45],c:[450,800]}
      :{hz:470,pz:[520,560,.8],sh:[880,650,.92],ht:[620,720],dev:[175,560,.66],asu:[1410,560,.66],c:[520,540]};R.L=L;
    R.bd=backdrop(p,W,H,{hz:L.hz,sun:P?[720,230,54]:[1360,140,56],clouds:P?[[200,250,180],[560,430,150]]:[[260,120,200],[980,100,160]]});
    bank(p,-10,L.dev[0]+(P?110:170),L.dev[1]);bank(p,L.asu[0]-(P?110:170),W+10,L.asu[1]);
    R.devG=grp(p,{transform:`translate(${L.dev[0]} ${L.dev[1]})`});R.dev=crowd(R.devG,'deva',3,1,P?44:70,L.dev[2]);
    R.asuG=grp(p,{transform:`translate(${L.asu[0]} ${L.asu[1]})`});R.asu=crowd(R.asuG,'asura',3,-1,P?44:70,L.asu[2]);
    R.bub=bubbles(grp(p),14,L.c[0],L.c[1]+80,240,160,7);
    R.shG=grp(p);R.halo=mandala(R.shG,150,{t:0,pal:[PAL.gold,PAL.turq,PAL.ivory,PAL.ocean]});tf(R.halo.g,0,-300,1);R.shiva=shiva(R.shG);
    R.stream=el('path',{fill:'none',stroke:TINT.violet,'stroke-width':18,'stroke-linecap':'round',opacity:0},p);
    R.streamDots=el('path',{fill:'none',stroke:TINT.lilac,'stroke-width':6,'stroke-linecap':'round','stroke-dasharray':'2 16',opacity:0},p);
    R.pzG=grp(p);R.pz=halahala(R.pzG);
    R.gw=grp(p);shape(R.gw,'M-260 40Q-200 -40 -120 -30Q-60 -70 0 -40Q60 -80 120 -30Q200 -40 260 40Z',PAL.gold,{w:5,pat:Pat.get('wave',PAL.verm,null,22)});
    R.htG=grp(p,{transform:`translate(${L.ht[0]} ${L.ht[1]})`});R.heart=grp(R.htG);shape(R.heart,heartD(56),PAL.verm,{w:6,pat:Pat.get('dots',mix(PAL.verm,PAL.pink,.55),null,12)});
    shape(R.heart,heartD(34),PAL.pink,{w:3.5,pat:Pat.get('flower',PAL.verm,null,14)});
    R.hdots=[0,1,2].map(i=>{const a=-Math.PI/2+(i-1)*1.1;const d=dot(R.htG,Math.cos(a)*86,Math.sin(a)*86-6,11,PAL.gold,{stroke:PAL.ink,w:3});return d});
    R.hLotus=lotus(R.htG,58,{t:0,pad:false});R.sparks=sparks(R.htG,0,0,18,P?380:520,{lift:-60});
    hitArea(R.htG,R,'heart','Heart: send a wish of kindness to the world',0,0,P?100:90);
    return R},
  update(R,S,t,dt){const L=R.L;R.bd.update(t,dt,S);R.bub.update(t,S.bub);
    tf(R.pzG,L.pz[0],L.pz[1],L.pz[2]*(1+S.react*.04*Math.sin(t*.004)));R.pz.set(S.poison,t,S.shrink);op(R.pzG,clamp(1-S.flow*1.15,0,1));
    const sy=L.sh[1]+(1-S.shiva)*60,ss=L.sh[2]*lerp(.8,1,S.shiva);tf(R.shG,L.sh[0],sy,ss);op(R.shG,S.shiva);R.shiva.setBlue(S.blue);R.halo.set(S.ray);R.halo.spin(t*.01);
    const th=[L.sh[0],sy-267*ss];const pc=[L.pz[0],L.pz[1]-200*L.pz[2]];
    if(S.flow>0&&S.flow<1){const u=S.flow;const a=[lerp(pc[0],th[0],u*.9),lerp(pc[1],th[1],u*.9)];const d=`M${f1(a[0])} ${f1(a[1])}Q${f1((a[0]+th[0])/2)} ${f1(Math.min(a[1],th[1])-80)} ${f1(th[0])} ${f1(th[1])}`;
      setA(R.stream,'d',d);setA(R.streamDots,'d',d);op(R.stream,Math.sin(u*Math.PI));op(R.streamDots,Math.sin(u*Math.PI));setA(R.streamDots,'stroke-dashoffset',f1(-t*.08))}
    else{op(R.stream,0);op(R.streamDots,0)}
    const pose=S.cheer>.5?'cheer':S.react>.5?'worry':'stand';R.dev.pose(pose,1,t);R.asu.pose(pose,1,t);R.dev.hop(t,S.cheer*8);R.asu.hop(t+300,S.cheer*8);
    tf(R.heart,0,0,Math.max(.001,S.heart*(1+(S.hk?0:.04*Math.sin(t*.006)))));op(R.heart,S.heart);R.hdots.forEach(d=>op(d,S.heart));R.hLotus.set(S.hk);op(R.hLotus.g,clamp(S.hk*3,0,1)*(1-S.calm));R.sparks.set(S.sp);
    op(R.htG,S.shiva>.5?1:0);
    const gx=lerp(-300,Stage.W+300,S.gw);tf(R.gw,gx,R.L.hz+(Stage.P?60:70),1);op(R.gw,S.gw>-.1&&S.gw<1.1?1:0)},
  async run(x,S){
    x.sfx('poison');x.tw({bub:.4},1500);await x.tw({poison:.45},1600,Ease.out);
    x.tw({poison:1},3000,Ease.out);x.tw({dark:.8},2000);
    await x.say(TEXT.s3[0]);
    x.tw({react:1},500);x.tw({osp:1.4},1500);
    await x.say(TEXT.s3[1]);
    x.sfx('accent');x.tw({shiva:1},1800,Ease.out);x.tw({ray:1},2200,Ease.out);x.tw({osp:.8},1500);
    await x.say(TEXT.s3[2]);
    await x.act({keys:['heart'],prompt:'Send a wish of kindness to the world.',hint:'Tap the big heart!',
      onHit:async()=>{x.sfx('kind');await par(x.tw({heart:0},500,Ease.in),x.tw({hk:1},1300,Ease.out),x.tw({sp:1},1700,Ease.out),x.tw({shrink:.3,dark:.45},1600))}});
    x.tw({calm:1},800);x.tw({flow:1},3600,Ease.io);x.tw({shrink:1},3600,Ease.io);x.wait(1800).then(()=>x.tw({blue:1},1600));
    await x.say(TEXT.s3[3]);
    x.tw({dark:0,react:0},1600);x.tw({cheer:1},300);x.sfx('chime');
    await x.say(TEXT.s3[4]);
    x.tw({cheer:0},400);x.tw({osp:1,bub:0},2000);
    await x.say(TEXT.s3[5]);
    x.sfx('chime');await x.tw({gw:1.2},2600,Ease.io)}};
