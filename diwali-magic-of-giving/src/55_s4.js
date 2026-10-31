/* ================= EP03_SC04_MANTRA: OUR FINAL PRAYER ================= */
const SEAT41={gran:[[1290,792,.9,1],[820,1180,.8,1]],girl:[[600,800,.9,1],[300,1420,.85,1]],boy:[[1180,800,.9,1],[700,1420,.85,1]],little:[[440,806,.9,1],[130,1420,.8,1]],
  mother:[[270,792,.85,1],[160,1160,.7,1]],father:[[1470,792,.85,1],[620,1170,.7,1]]};
async function shot4_1(){Store.save();mood('reverent');Music.mood('prayer');Music.setLevel(.35,2);const s=pujaStage({red:true});D.setScene(s,1500);seat(s.F,SEAT41);const F=s.F,light=s.light;const a=s.A();
  light.vis=true;light.x=a.diya[0]+LP(190,150);light.y=a.diya[1]-LP(60,60);light.set('still');
  await D.wait(700);for(const k in F){if(F[k].vis){F[k].set('namaste');await D.wait(D.fast?5:150)}}
  s.cam.fx=a.diya[0];s.cam.fy=a.diya[1]-LP(60,60);D.go(s.cam,{z:1.08},9000,'io');
  await sayShot('4.1',{cues:[['glows beside the diya',()=>{D.go(s,{diyaK:1.22},1600);light.pulse()}]]});await D.late();await D.wait(800)}
async function shot4_2(){mood('reverent');Music.mood('tanpura');Music.setLevel(.5,2);const s=mkScene('mantra');const tok=D.token;
  /* a simple background framed by lotus motifs, deep red and yellow border */
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:P.ivory},this.bg);
    shp(this.bg,`M0 0H${W}V${H}H0Z M${W*.05} ${H*.06}V${H*.94}H${W*.95}V${H*.06}Z`,Pat.u('petals',P.turmeric,P.verm,1),0,{'fill-rule':'evenodd'});
    const n=Math.max(4,Math.round(W/260));for(let i=0;i<n;i++){for(const y of[H*.03,H*.97]){const l=lotus(this.bg,{r:26,n:5,open:.85,pad:false});tf(l.g,(i+.5)/n*W,y+16,1)}}};
  D.setScene(s,1300);const light=s.light=mkLight(grp(s.comp));const dy=diya(s.comp,{col:P.terra});dy.lit=1;
  s.parts.push({update:(dt,t)=>{const c=LP([889,700],[500,1290]);dy.x=c[0]-LP(130,120);dy.y=c[1]+40;dy.s=LP(.8,.75);dy.update(t);light.update(dt,t)}});
  const c=LP([889,700],[500,1290]);light.vis=true;light.x=c[0]+LP(120,110);light.y=c[1];light.set('still');
  const m=$('mantra');m.hidden=false;$('mBadge').hidden=canSpeak('chant');
  await D.wait(900);
  await sayShot('4.2');
  /* the children chant on their own: the text stays still, the Light pulses gently as the cue */
  let res;const p=new Promise(r=>res=r);D.controls([{id:'bCont',cls:'lotusbtn',html:ICON.lotus+'Continue',on:()=>res()}]);$('act').hidden=false;
  const pulse=setInterval(()=>light.pulse(),1600);const auto=D.wait(D.fast?20:10000).then(()=>res()).catch(()=>{});
  try{await p}finally{clearInterval(pulse)}D.guard(tok);D.clearAct();await D.late();m.hidden=true;await D.wait(400)}
async function shot4_3(){mood('reverent');Music.mood('prayer');const s=pujaStage({red:true});D.setScene(s,1300);seat(s.F,SEAT41);for(const k in s.F)if(s.F[k].vis)s.F[k].set('namaste');
  const light=s.light,a=s.A();light.vis=true;light.x=a.diya[0]+LP(130,110);light.y=a.diya[1]-LP(80,80);
  /* four blessings appear round Goddess Lakshmi, never over her */
  const pos=()=>LP([[470,200],[1308,200],[470,470],[1308,470]],[[160,230],[840,230],[160,640],[840,640]]);
  const art=[g=>{sprigG(g)},g=>blessArt(g,'family'),g=>{const l=lotus(g,{r:44,n:7,open:.9});tf(l.g,0,20,1);ln(g,'M-80 46Q-40 30 0 46T80 46',P.turq,4);ln(g,'M-80 58Q-40 42 0 58T80 58',P.turq,3)},
    g=>{const k=kalash(g);tf(k,-34,44,.6);const c=blessArt(g,'coins');c.setAttribute('transform','translate(34 10) scale(.55)')}];
  function sprigG(g){[-40,0,40].forEach((x,i)=>{const sp=sprig(g,.7,P.leaf);sp.setAttribute('transform',`translate(${x} 50) scale(.7) rotate(${(i-1)*14})`)});[[-30,-30],[20,-40],[46,-10]].forEach(([x,y],i)=>{const f=tinyFlower(g,12,i%2?P.pink:P.turmeric);tf(f,x,y,1)})}
  const meds=art.map((fn,i)=>{const g=grp(s.motL);circ(g,0,0,96,Pat.u('vine',P.leaf,P.ivory,.5),4);circ(g,0,0,84,P.ivory,4);const cl=clipIn(g,ellD(0,0,80,80));fn(grp(grp(g,{'clip-path':cl}),{transform:'scale(.8)'}));return{g,k:0}});
  const links=flowerRing(s,s.motL,20,LP(420,330),LP(150,230));
  s.parts.push({update:(dt,t)=>{const P_=pos();meds.forEach((m,i)=>{tf(m.g,P_[i][0],P_[i][1],Math.max(.001,m.k)*LP(1,.85));op(m.g,m.k>0?1:0)});links.x=LP(889,500);links.y=LP(335,435)}});
  await D.wait(600);
  await sayShot('4.3',{to:1,cues:[['health',()=>{D.go(meds[0],{k:1},700,'back');AU.sfx('chime')}],['happiness',()=>{D.go(meds[1],{k:1},700,'back');AU.sfx('chime')}],['peace',()=>{D.go(meds[2],{k:1},700,'back');AU.sfx('chime')}],
    ['prosperity',()=>{D.go(meds[3],{k:1},700,'back');AU.sfx('chime');D.go(links,{k:1},1400)}]]});
  light.travel([[a.diya[0]+LP(150,120),a.diya[1]-LP(240,220)]],2400).catch(()=>{});D.go(s.glow,{k:1},1);
  await sayShot('4.3',{from:1});await D.late();
  /* the Light rises above the altar and moves toward the decorated home */
  await light.travel([[a.arch[0],LP(70,150)],[LP(1700,980),LP(60,140)]],2600,'io')}
