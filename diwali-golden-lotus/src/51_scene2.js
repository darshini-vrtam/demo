/* ================= SCENE 2: THE ARRIVAL OF GODDESS LAKSHMI ================= */
/* a ring of small floral motifs that appears around the halo */
function haloFlowers(parent,n,R){const g=grp(parent);const list=[];for(let i=0;i<n;i++){const f=tinyFlower(g,18,i%2?P.turmeric:P.pink);list.push({f,a:i/n*TAU})}
  return{g,k:0,update(t,x,y,s){op(g,this.k);if(this.k<=0)return;list.forEach((o,i)=>{const kk=clamp(this.k*1.6-(i%4)*.15,0,1);tf(o.f,x+Math.cos(o.a+t*.04)*R*s,y+Math.sin(o.a+t*.04)*R*s,kk*s*1.4,t*15)})}}}
async function shot2_1(){Store.set('scene',2);mood('reverent');Music.mood('warm');let s=D.scene;
  if(!s||s.id!=='ocean'){s=oceanStage();D.setScene(s,0);s.mode='act2';Object.assign(s.st,{glow:1,under:1,floats:.6,spread:1});s.lotus.openO=1;s.lotus.openI=1;s.lotus.glowK=1}
  const tok=D.token;const lak=s.lak,light=s.light;s.setSea('divine',2000);s.mode='lak';D.go(s.st,{floats:.8,under:.6,glow:.6,spread:.6},1800);
  lak.haloK=0;lak.bless=0;const hf=haloFlowers(s.top,12,250);s.parts.push({update:(dt,t)=>hf.update(t,lak.x,lak.y-160*lak.s,lak.s)});
  s.devas.forEach(f=>f.set('namaste'));
  await D.wait(1400);
  await D.say('Seated upon the beautiful lotus was Goddess Lakshmi!',{cues:[['Seated',()=>{AU.sfx('chime');D.go(s.st,{lakK:1},1800);D.go(s.lotus,{glowK:0},1600)}],['Goddess Lakshmi',()=>{D.go(lak,{haloK:1},1600)}]]});
  await D.say('She shone like the morning sun, surrounded by a gentle golden glow.',{cues:[['morning sun',()=>{D.go(hf,{k:1},1400);AU.sfx('sparkle')}]]});
  /* the Golden Light is already here, quietly floating near the lotus: it is introduced in Scene 3 */
  const lp=s.lay().light;light.x=lp[0]+LP(120,80);light.y=lp[1]-LP(80,90);light.glowK=.3;light.vis=true;light.s=.001;D.go(light,{s:1},900,'out');D.go(light,{x:lp[0],y:lp[1]},2400,'io');
  await D.say('The Devas bowed before Her with devotion.',{cues:[['Devas',()=>D.go(s.st,{devK:1},1200)],['bowed',()=>{s.devas.forEach((f,i)=>Timers.add(i*180,()=>f.set('bow')));Timers.add(1000,()=>D.go(lak,{bless:1},800))}]]});
  D.go(light,{x:lp[0]-LP(60,40),y:lp[1]+LP(30,20)},2200,'io');
  await D.late();await D.wait(1300);
  /* the halo's circles expand outward as the scene changes */
  D.go(lak,{expand:.6},1800,'out');D.go(s.cam,{z:1.05},1600,'io');s.cam.fx=lak.x;s.cam.fy=lak.y-246*lak.s;await D.wait(700)}

/* ===== cream stage: Shots 2.2, 3.2 and 3.3 ===== */
const CREAM={l:{lotus:[370,720,1.1],lak:[370,686,.86],sym:[[900,250],[1180,250],[1460,250],[900,555],[1180,555],[1460,555]],sr:112,light:[690,140],front:[690,680],
    top:[889,104],ring:{c:[889,446],rx:560,ry:262},med:[889,128],medR:92},
  p:{lotus:[500,566,.78],lak:[500,543,.6],sym:[[280,810],[720,810],[280,1070],[720,1070],[280,1330],[720,1330]],sr:110,light:[860,230],front:[500,1420],
    top:[500,236],ring:{c:[500,860],rx:310,ry:470},med:[500,250],medR:96}};
function creamStage(id){const s=mkScene(id||'cream');
  s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('flora',P.gold,P.ivory,1.1)},this.bg)};
  const comp=s.comp;const lakL=grp(comp),medL=grp(comp),symL=grp(comp),cardL=grp(comp),lightL=grp(comp);
  s.A=()=>L.portrait?CREAM.p:CREAM.l;
  s.st={lakK:0,medK:0};
  const lotus=bigLotus(lakL,{r:170});lotus.openO=1;lotus.openI=1;lotus.glowK=0;const lak=new Lakshmi(lakL);lakL.appendChild(lotus.front);s.lotus=lotus;s.lak=lak;
  const med=medallion(medL,100,{bg:P.indigo});const mlak=new Lakshmi(med.pic);mlak.s=.36;mlak.x=0;mlak.y=98;s.med=med;
  /* Shot 2.2 symbols, each in a circular frame; they pop in when named */
  s.syms=[];
  s.addSym=(key,i,jewel)=>{const g=grp(symL);const halo_=grp(g);rings(halo_,128,{n:2,step:.12,w:4});const m=blessMedal(g,key,{r:104,jewel});const o={g,halo:halo_,k:0,i,key,glow:0};s.syms.push(o);return o};
  const light=goldenLight(lightL,{glow:.45});s.light=light;D.light=light;
  s.fx=fxLayer(s);
  s.tick=function(dt,t){const A=s.A();const m=MV();
    tf(lakL,0,0,1);op(lakL,s.st.lakK);if(s.st.lakK>0){lotus.x=A.lotus[0];lotus.y=A.lotus[1];lotus.s=A.lotus[2];lotus.update(t);lak.x=A.lak[0];lak.y=A.lak[1];lak.s=A.lak[2];lak.update(dt,t)}
    op(medL,s.st.medK);if(s.st.medK>0){tf(med.g,A.med[0],A.med[1],A.medR/100);mlak.update(dt,t)}
    s.syms.forEach(o=>{const p=A.sym[o.i];const sc=A.sr/104*Ease.back(clamp(o.k,0,1));tf(o.g,p[0],p[1],Math.max(.001,sc));op(o.halo,o.glow);if(o.glow>0)tf(o.halo,0,0,1,t*10*m)});
    light.update(dt,t)};
  return s}
/* the Golden Light traces a small floral loop around a point */
async function lightLoop(light,x,y,r){const pts_=[];for(let i=0;i<=8;i++){const a=-Math.PI/2+i/8*TAU;pts_.push([x+Math.cos(a)*r,y+Math.sin(a)*r])}await light.travel(pts_,1700,'lin')}
async function shot2_2(){mood('warm');Music.mood('cream');const s=creamStage('prosperity');s.st.lakK=1;D.setScene(s,1300);const A=s.A,light=s.light;
  light.x=A().light[0];light.y=A().light[1];light.vis=true;light.glowK=.45;
  let chain=Promise.resolve();const show_=(key,i,jewel)=>{const o=s.addSym(key,i,jewel);AU.sfx('pop');D.go(o,{k:1},700,'out');
    chain=chain.then(async()=>{const p=s.A().sym[i];await lightLoop(light,p[0],p[1],s.A().sr+44);D.go(o,{glow:1},400);Timers.add(1500,()=>D.go(o,{glow:0},800))}).catch(()=>{})};
  const rest=()=>{chain=chain.then(()=>light.travel([s.A().light],900)).catch(()=>{})};
  await D.wait(1000);
  await D.say('Goddess Lakshmi is known as the Goddess of prosperity, fortune and well-being.');
  await D.say('But children, what does prosperity really mean?',{cues:[['really mean',()=>light.pulse()]]});
  await D.say('Is it only gold, jewels and money?',{cues:[['gold',()=>show_('coins',0,true)]]});
  await D.say('Not at all!');
  await D.say('Good health is a blessing.',{cues:[['health',()=>show_('play',1)]]});
  await D.say('A loving family is a blessing.',{cues:[['family',()=>show_('family',2)]]});
  await D.say('Friends, food, knowledge and happiness are blessings too!',{cues:[['Friends',()=>show_('friends',3)],['food',()=>show_('food',4)],['knowledge',()=>show_('book',5)],
    ['happiness',()=>{chain=chain.then(()=>light.spin()).catch(()=>{})}]]});
  rest();
  await D.say('Goddess Lakshmi reminds us to value all the wonderful things in our lives.');
  await chain;await D.late();
  /* the Golden Light moves toward the foreground, inviting the child in */
  const f=s.A().front;D.go(light,{s:1.25},1600,'io');await light.travel([[lerp(light.x,f[0],.5),lerp(light.y,f[1],.4)],f],1800);await D.wait(400)}
