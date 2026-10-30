/* ================= SCENE 5: WHERE WILL THE LIGHT GO NEXT? ================= */
const HOMEL={l:{home:[889,640,.8],trees:[[300,640,.95],[1478,640,.95]],enter:[90,70],look:[620,250],outside:[889,560],ground:640,lotus:[1290,760,.34],endLight:[1440,640]},
  p:{home:[500,1010,.86],trees:[[70,1010,.8],[930,1010,.8]],enter:[80,170],look:[330,420],outside:[500,940],ground:1010,lotus:[690,1360,.32],endLight:[840,1260]}};
function homeStage(){const s=mkScene('home');const A=()=>L.portrait?HOMEL.p:HOMEL.l;s.A=A;
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const gy=toStage(0,A().ground)[1];
    /* patterned evening sky in flat bands, decorative stars and small floral motifs */
    el('rect',{x:-4,y:-4,width:W+8,height:gy+8,fill:Pat.u('stars',P.ivory,P.midnight,1)},this.bg);
    el('rect',{x:-4,y:gy*.45,width:W+8,height:gy*.55+8,fill:Pat.u('stars',P.turmeric,P.indigo,1.2)},this.bg);ln(this.bg,`M-4 ${f1(gy*.45)}H${W+4}`,P.gold,4,{'stroke-dasharray':'.1 14'});
    const r=rng(11);for(let i=0;i<14;i++){const f=tinyFlower(this.bg,10+r()*6,i%2?P.turmeric:P.pink);tf(f,BORDER+40+r()*(W-2*BORDER-80),BORDER+40+r()*(gy*.7),1,r()*60)}
    for(let i=0;i<10;i++){const sg=grp(this.bg);star4(sg,0,0,8+r()*6,i%3?P.ivory:P.turmeric);tf(sg,r()*W,r()*gy*.8,1)}
    /* the courtyard floor */
    shp(this.bg,`M-4 ${f1(gy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.gold,P.terra,1),4);ln(this.bg,`M-4 ${f1(gy+12)}H${W+4}`,P.ivory,4,{'stroke-dasharray':'.1 14'})};
  const comp=s.comp;const treeL=grp(comp),homeL=grp(comp),endL=grp(comp),lightL=grp(comp);
  const trees=[homeTree(treeL,false),homeTree(treeL,true)];
  const H=diwaliHome(homeL,{lit:0,doorOpen:1,rangoli:.25});s.H=H;
  const lot=lotus(endL,{r:120,n:7,open:.95});s.endLotus=lot;s.st={end:0};
  const light=goldenLight(lightL,{glow:.8});s.light=light;D.light=light;s.fx=fxLayer(s);
  s.tick=function(dt,t){const a=A();tf(homeL,a.home[0],a.home[1],a.home[2]);H.update(t);
    trees.forEach((tr,i)=>{const p=a.trees[i];tr.g.setAttribute('transform',`translate(${p[0]} ${p[1]}) scale(${p[2]*(i?-1:1)} ${p[2]})`);tr.can.setAttribute('transform',`rotate(${f1(Math.sin(t*.6+i)*1.2*MV())} 0 -150)`)});
    op(endL,s.st.end);if(s.st.end>0)tf(lot.g,a.lotus[0],a.lotus[1],a.lotus[2]);light.update(dt,t)};
  /* stage position of the doorway centre (reference units) */
  s.door=()=>{const a=A();return[a.home[0],a.home[1]+H.door.y*a.home[2]]};
  return s}
async function shot5_1(){Store.set('scene',5);mood('curious');Music.mood('home');Music.setLevel(.5,2);$('shloka').hidden=true;
  const s=homeStage();D.setScene(s,1600);const light=s.light,H=s.H;const a=s.A();light.x=a.enter[0];light.y=a.enter[1];light.vis=true;light.glowK=.8;light.look=.6;
  const d=s.door();s.cam.fx=d[0];s.cam.fy=d[1];D.go(s.cam,{z:1.07},26000,'io');
  await D.wait(900);
  const down=light.travel([a.look],3200,'io').catch(()=>{});
  await D.say('The little golden light looks down from the sky.');
  await down;light.look=0;
  await D.say('Below, it spots a beautiful home getting ready for Diwali.',{cues:[['home',()=>light.travel([[lerp(a.look[0],a.outside[0],.5),lerp(a.look[1],a.outside[1],.45)]],2600).catch(()=>{})]]});
  await D.say('There are flowers at the doorway, a colourful rangoli on the floor and little diyas waiting to shine.',{cues:[['colourful rangoli',()=>{AU.sfx('chime');D.go(H,{rangoli:1},2600)}],['diyas',()=>AU.sfx('sparkle')]]});
  await D.late()}
async function shot5_2(){mood('curious');let s=D.scene;if(!s||s.id!=='home'){s=homeStage();D.setScene(s,0);const a=s.A();s.light.x=a.outside[0];s.light.y=a.outside[1]-100;s.light.vis=true;s.H.rangoli=1}
  const light=s.light,H=s.H,a=s.A();const tok=D.token;
  await light.travel([a.outside],1400);
  await D.say('The golden light twinkles excitedly.',{cues:[['twinkles',()=>{light.pulse();Timers.add(1100,()=>light.spin())}]]});
  await D.say([['light','“I wonder how this family will welcome Goddess Lakshmi!”']]);
  await D.say('And with a little sparkle, it floats towards the home.',{cues:[['sparkle',()=>AU.sfx('sparkle')],['floats',async()=>{try{const d=s.door();await light.travel([d],2200,'io');
      await D.tw(light,{s:.25},700,'in');light.vis=false;AU.sfx('bell');await D.tw(H,{glowK:1},800,'out');await D.wait(900);await D.tw(H,{glowK:0},1200)}catch(e){}}]]});
  await D.say('But will decorations alone make the home truly special?');
  await D.say('Let\'s find out in our next adventure!');
  await D.wait(D.fast?5:1600);D.guard(tok);await D.late()}
async function shot5_3(){let s=D.scene;if(!s||s.id!=='home'){s=homeStage();D.setScene(s,0);s.H.rangoli=1}
  const light=s.light,a=s.A();mood('warm');Music.swell();
  light.x=a.endLight[0];light.y=a.endLight[1];light.s=1;light.vis=true;light.look=-.6;D.go(s.st,{end:1},1200);
  const card=$('endCard'),t=$('endT');t.style.opacity='0';card.hidden=false;await D.wait(80);t.style.opacity='1';
  /* a few floral motifs appear around the title */
  const fl=[];for(let i=0;i<8;i++){const f=tinyFlower(s.top,16,i%2?P.turmeric:P.pink);fl.push(f);op(f,0)}
  const tp=L.portrait?[500,240]:[889,110];fl.forEach((f,i)=>{const u=i/7;const x=tp[0]+(u-.5)*LP(1100,820),y=tp[1]+LP(150,170)+Math.sin(u*Math.PI)*-LP(30,40);tf(f,x,y,1.4,i*20);Timers.add(300+i*160,()=>op(f,1))});
  for(let i=0;i<3;i++)Timers.add(800+i*1500,()=>light.pulse());
  await D.wait(D.fast?20:5200);
  /* the artwork fades to a calm resting screen that keeps the title */
  t.style.opacity='0';await D.wait(D.fast?5:900);card.hidden=true;
  Store.set('done',true);Store.set('scene',1);D.setScene(restStage(),1600);await D.wait(D.fast?5:1400);$('rest').hidden=false}
function restStage(){const s=mkScene('rest');s.paintBg=function(){this.bg.innerHTML='';el('rect',{x:-4,y:-4,width:L.W+8,height:L.Ha+8,fill:Pat.u('stars',P.turmeric,P.midnight,1.2)},this.bg)};
  const g=grp(s.comp);const l=lotus(g,{r:90,n:7,open:.95});const light=goldenLight(s.comp,{glow:.5});s.light=light;
  s.tick=(dt,t)=>{const c=L.portrait?[500,1150]:[889,640];tf(l.g,c[0],c[1]+70,1);light.x=c[0]+LP(150,140);light.y=c[1]-LP(20,30);light.update(dt,t)};return s}
