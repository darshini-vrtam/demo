/* ================= EPISODE 2: CAN WE LIGHT UP THE WHOLE PALACE? ================= */
async function previously(n){if(!D.resumed||D.resumedAt!==n)return;D.resumed=false;
  const t={2:'Previously… Chiku, Bijli and Princess Kesar prepared nine lamps, and the sun began to set over the palace.',
    3:'Previously… the whole town helped light a circle of lamps around the palace door, and at midnight, a visitor arrived.'}[n];
  await D.say('dadi',t)}
/* ---------- 2.1 overlook of palace and town ---------- */
function overGeo(){const W=L.W,H=L.H,P=L.portrait;const pal=P?palaceGeo(W*.1,H*.5,W*.8,H*.2):palaceGeo(W*.05,H*.34,W*.44,H*.34);
  const court=P?{x:W*.04,y:H*.7,w:W*.92,h:H*.12}:{x:W*.03,y:H*.68,w:W*.94,h:H*.2};
  const houses=[];const r=rng(31);const tx=P?W*.06:W*.5,tw2=P?W*.88:W*.46,ty=P?H*.16:H*.2,th=P?H*.24:H*.42;
  for(let row=0;row<4;row++)for(let i=0;i<(P?5:6);i++){const w=(P?80:70)+r()*30,h=w*(.7+r()*.5);const x=tx+(i+(row%2)*.5)*tw2/(P?5.2:6.2),y=ty+row*th/4+th*.1;houses.push({x,y,w,h,roof:r()<.5,c:[C.ivory,C.mustard,C.terra][Math.floor(r()*3)]})}
  const wins=[];houses.forEach((h,i)=>{wins.push({x:h.x+h.w*.2,y:h.y+h.h*.35,w:h.w*.22,h:h.h*.3});if(h.w>85)wins.push({x:h.x+h.w*.58,y:h.y+h.h*.35,w:h.w*.22,h:h.h*.3})});
  const order=wins.map((w,i)=>i).sort((a,b)=>hash('w'+a)%97-hash('w'+b)%97);
  const lamps=[];for(let i=0;i<9;i++)lamps.push({x:court.x+court.w*(P?.1+i*.1:.06+i*.05),y:court.y+court.h*.3});
  return{pal,court,houses,wins,order,lamps,c:{x:P?W*.3:W*.5,y:court.y+court.h*.8,s:L.cs*.72,f:1},k:{x:P?W*.5:W*.6,y:court.y+court.h*.8,s:L.cs*.74,f:-1}}}
function paintOver(g,W,H,A){paintSky(g,0,0,W,H*.7,'dusk');paintHills(g,0,H*.3,W,H*.3,[C.leaf,ca(C.indigo,.8),C.terra],8);
  paintGround(g,0,H*.6,W,H*.4,true);
  A.houses.forEach(h=>{R.rect(g,h.x,h.y,h.w,h.h,h.c,{sw:2.4});if(h.roof)R.poly(g,[[h.x-6,h.y],[h.x+h.w/2,h.y-h.h*.5],[h.x+h.w+6,h.y]],C.verm,{sw:2.4});else R.rect(g,h.x-4,h.y-10,h.w+8,10,C.brown,{sw:2})});
  paintPalace(g,A.pal,{night:true});const c=A.court;R.rect(g,c.x,c.y,c.w,c.h,C.mustard,{sw:3});for(let i=0;i<8;i++)strokeL(g,[[c.x+c.w*i/8,c.y],[c.x+c.w*i/8,c.y+c.h]],ca(C.brown,.4),2);diamonds(g,c.x,c.y+c.h*.55,c.w,c.h*.3,C.terra,10)}
function overScene(){const s=mk({id:'over',litN:0,layout(){return overGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;ctx.save();camT(ctx,this.cam);Bake.draw(ctx,'over',0,0,W,H,(g,w,h)=>paintOver(g,w,h,A),1.3);
    A.wins.forEach((w,i)=>{const on=A.order.indexOf(i)<this.litN;ctx.fillStyle=on?C.gold:C.indigo;ctx.fillRect(w.x,w.y,w.w,w.h);ctx.strokeStyle=C.brown;ctx.lineWidth=2;ctx.strokeRect(w.x,w.y,w.w,w.h);if(on)dot(ctx,w.x+w.w/2,w.y+w.h/2,w.w*.9,ca(C.gold,.18))});
    A.lamps.forEach((p,i)=>drawDiya(ctx,p.x,p.y,L.cs*.42,{lit:1,glow:true,t:T.sec,seed:i}));this.drawActors(ctx);ctx.restore();drawBorder(ctx,true)}});return s}
async function shot2_1(){await titleCard(2,'Can We Light Up the Whole Palace?',true);D.chip('Episode 2 · Can We Light Up the Whole Palace?');await previously(2);Music.mood('night');
  const s=overScene();D.setScene(s,'wipe');const A=s.anch();const c=s.add('chiku',new Actor('chiku',0,0,1,1,'idle'),'c');const k=s.add('kesar',new Actor('kesar',0,0,1,-1,'idle'),'k');
  s.cam.fx=L.portrait?L.W/2:L.W*.74;s.cam.fy=L.portrait?L.H*.28:L.H*.4;
  c.set('think',{lookX:1,lookY:-.5});
  await D.say('dadi',['When Chiku counted the lamps again, she counted nine. Then she looked at the enormous palace: its long corridors, its great doors, and its wide courtyard.']);
  c.set('worry');await D.say('dadi',[['chiku',"'Nine lamps cannot light all of this,'"],' she whispered.']);
  k.set('idle',{lookX:1});D.tw(s.cam,{z:1.18},16000,'io').catch(()=>{});
  const lightTown=(async()=>{for(let i=0;i<A.wins.length;i++){s.litN=i+1;if(i%3===0)AU.sfx('tap');await D.wait(420)}})().catch(()=>{});
  await D.say('dadi','Princess Kesar looked outside. Down in the city, homes were preparing for Dhanteras. Some families had brass lamps. Some had only small clay diyas. Some had oil, and others had spare wicks.');
  D.tw(s.cam,{z:1},2500).catch(()=>{});k.set('explain',{lookX:-.3});c.set('listen',{lookX:.6});
  await D.say('dadi',[['kesar',"'Chiku,'"],' Kesar said, ',['kesar',"'what if we don't do this alone?'"]]);c.set('determined')}
/* ---------- 2.2 decision ---------- */
function drawStall(g,x,y,w,h,c1,c2){R.rect(g,x,y,w,h,C.brown,{sw:2.4});const n=6;for(let i=0;i<n;i++)R.poly(g,[[x+i*w/n,y],[x+(i+1)*w/n,y],[x+(i+1)*w/n,y+h*.25],[x+(i+.5)*w/n,y+h*.32],[x+i*w/n,y+h*.25]],i%2?c1:c2,{sw:2});
  R.rect(g,x+w*.04,y+h*.62,w*.92,h*.38,C.mustard,{sw:2.4});for(let i=0;i<4;i++)R.path(g,`M${x+w*(.12+i*.22)} ${y+h*.62} C ${x+w*(.06+i*.22)} ${y+h*.36} ${x+w*(.24+i*.22)} ${y+h*.36} ${x+w*(.18+i*.22)} ${y+h*.62} Z`,i%2?C.terra:C.ivory,{sw:2})}
async function shot2_2(){ensure('over',()=>{const s=overScene();s.litN=999;s.add('chiku',new Actor('chiku',0,0,1,1,'determined'),'c');s.add('kesar',new Actor('kesar',0,0,1,-1,'explain'),'k');return s});
  await D.say('dadi','What would you do if you needed help from a whole town?');
  return D.choice('e2d1',[{key:'A',title:'The market',label:'The market: Ask the merchants for oil and lamps.',draw(g){paintSky(g,0,0,400,250,'dusk');drawStall(g,40,60,180,150,C.verm,C.ivory);drawStall(g,230,80,140,130,C.indigo,C.mustard);cardChar(g,'merchant',300,236,.5,-1,'idle')}},
    {key:'B',title:"The children's courtyard",label:"The children's courtyard: Ask other children and families to contribute whatever they can.",draw(g){paintSky(g,0,0,400,250,'dusk');motifTree(g,200,200,.9,1);drawFolk(g,90,232,.6,{child:true,top:C.mustard});drawFolk(g,310,232,.6,{child:true,top:C.leaf,hair:'bun'});drawFolk(g,150,236,.5,{top:C.verm,hair:'turban'});drawDiya(g,250,226,.6,{lit:1,glow:true})}}])}
/* ---------- 2.3 light grows when shared ---------- */
function drawItem(ctx,k,x,y,s){withT(ctx,x,y,s,1,c=>{if(k==='oil'){R.path(c,'M-24 0 C -30 -40 30 -40 24 0 Z',C.mustard,{sw:2.6});R.rect(c,-9,-46,18,14,C.mustard,{sw:2});dotRow(c,-14,-16,28,9,2.6,C.verm)}
  else if(k==='lamp')drawDiya(c,0,0,.7,{lit:0});else if(k==='brass')drawDiya(c,0,0,.7,{lit:0,body:C.mustard});
  else if(k==='chipped'){drawDiya(c,0,0,.7,{lit:0});poly(c,[[-24,-10],[-14,-10],[-20,-2]],C.ivory);strokeL(c,[[-14,-10],[-8,2]],C.brown,2)}
  else if(k==='wicks'){for(let i=0;i<6;i++)strokeL(c,[[-14+i*5,0],[-10+i*5,-40]],C.ivory,4);R.rect(c,-18,-24,36,8,C.verm,{sw:2})}
  else if(k==='flowers'){for(let i=0;i<5;i++)motifMarigold(c,-24+i*12,-12+Math.sin(i)*6,7)}})}
function shareGeo(kind){const W=L.W,H=L.H,P=L.portrait;const fy=H*(P?.76:.84);
  return{fy,c:{x:P?W*.24:W*.2,y:fy,s:L.cs,f:1},b:{x:P?W*.46:W*.36,y:fy,s:L.cs*.9,f:1},m:{x:P?W*.74:W*.68,y:fy,s:L.cs*1.05,f:-1},basket:{x:P?W*.36:W*.3,y:fy+(P?60:40)},
    count:{x:W/2,y:Math.max(borderSize()+56,(P?95:70)/L.U)},folk:[.52,.62,.72,.82,.9].map((u,i)=>({x:W*(P?u-.08:u-.02),y:fy-(P?120:60)+Math.abs(i-2)*(P?40:20)}))}}
function paintMarket(g,W,H,A){paintSky(g,0,0,W,H*.5,'dusk');g.fillStyle=C.terra;g.fillRect(0,H*.4,W,A.fy-H*.4);const n=L.portrait?2:4;for(let i=0;i<n;i++){const w=W/n*.86;drawStall(g,W*(i+.07)/n,H*.32,w,H*.34,[C.verm,C.indigo,C.leaf,C.verm][i],C.ivory)}
  paintGround(g,0,A.fy-10,W,H-A.fy+10,false);R.rect(g,A.m.x-150,A.fy-150,140,150,C.mustard,{sw:3});for(let i=0;i<4;i++){dot(g,A.m.x-130+i*20,A.fy-158,9,C.gold);ring(g,A.m.x-130+i*20,A.fy-158,9,C.brown,2)}
  for(let i=0;i<3;i++)drawDiya(g,A.m.x-120+i*42,A.fy-100,.6,{lit:0,body:C.mustard})}
function paintCourt(g,W,H,A){paintSky(g,0,0,W,H*.55,'dusk');g.fillStyle=C.ivory;g.fillRect(0,H*.45,W,A.fy-H*.45);R.rect(g,0,H*.45,W,24,C.terra,{sw:2.4});
  for(let i=0;i<5;i++)R.poly(g,archPts(W*(.04+i*.2),H*.5,W*.12,A.fy-H*.5),ca(C.terra,.6),{sw:2.4});motifTree(g,L.portrait?W*.5:W*.62,A.fy-60,L.portrait?1.6:1.5,1);paintGround(g,0,A.fy-10,W,H-A.fy+10,false)}
function shareScene(kind){const s=mk({id:'share'+kind,items:[],count:0,layout(){return shareGeo(kind)},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;Bake.draw(ctx,'share'+kind,0,0,W,H,(g,w,h)=>(kind==='A'?paintMarket:paintCourt)(g,w,h,A));
    if(kind==='B')A.folk.forEach((f,i)=>drawFolk(ctx,f.x,f.y,L.cs*.8,{child:i%2===0,top:[C.mustard,C.leaf,C.verm,C.indigo,C.terra][i],low:[C.indigo,C.brown,C.mustard,C.leaf,C.indigo][i],hair:i===1?'turban':i===3?'bun':null,arm:this.give===i?1.2:0,f:-1}));
    this.drawActors(ctx);withT(ctx,A.basket.x,A.basket.y,L.cs*1.15,1,c=>drawBasket(c,0,0));
    for(const it of this.items)if(it.k>0&&it.k<1){drawItem(ctx,it.kind,lerp(it.x0,A.basket.x,it.k),lerp(it.y0,A.basket.y-30,it.k)-Math.sin(it.k*Math.PI)*160,L.cs*1.1)}
    for(const it of this.items)if(it.k>=1)drawItem(ctx,it.kind,A.basket.x+it.ox,A.basket.y-38+it.oy,L.cs*.8);
    const n=this.count;if(n>0){const w=n*56+30;R.rect(ctx,A.count.x-w/2,A.count.y-34,w,68,C.ivory,{sw:2.6});for(let i=0;i<n;i++)drawFlame(ctx,A.count.x-w/2+42+i*56,A.count.y+20,.9,0,T.sec,i)}
    drawBorder(ctx,true)}});return s}
async function giveItem(s,kind,x0,y0,i){const it={kind,x0,y0,k:0,ox:(i%3-1)*30*L.cs,oy:-Math.floor(i/3)*16};s.items.push(it);AU.sfx('swish');await D.tw(it,{k:1},850,'io');AU.sfx('drop');s.count++;AU.sfx('coin')}
async function shot2_3(k){k=k||Store.choice('e2d1')||'A';const s=shareScene(k);D.setScene(s,'wipe',1300);
  const c=s.add('chiku',new Actor('chiku',0,0,1,1,'idle'),'c');const b=s.add('bijli',new Actor('bijli',0,0,1,1,'idle'),'b');
  if(k==='A'){const m=s.add('merchant',new Actor('merchant',0,0,1,-1,'idle'),'m');
    m.set('refuse');await D.say('merchant','My coins are for counting, not for giving away.');
    c.set('think',{lookX:1});await D.say('chiku','Then let us make a deal. What grows when you share it?');
    m.set('puzzled');await D.say('merchant','Coins?');
    b.set('smile');b.p.htilt=.2;await D.say('bijli','If coins grew when you shared them, I would be a very rich horse.');
    c.set('explain'in POSES.chiku?'explain':'reach',{lookX:1});await D.say('chiku','Light! When you share a flame, another lamp can shine without yours growing any smaller.');
    m.set('smile');await D.wait(500);Music.swell();m.set('give');
    const gives=(async()=>{const A=s.anch();const hx=m.x+80*m.s*m.f,hy=m.y-170*m.s;for(const[i,kd]of['oil','brass','brass','lamp','wicks'].entries()){await giveItem(s,kd,hx,hy,i);await D.wait(150)}})().catch(()=>{});
    await D.say('dadi','The merchant understands and donates supplies.');await gives;c.set('smile')}
  else{c.set('listen',{lookX:1});const A=s.anch();
    await D.say('dadi','Families bring whatever they have.');
    const list=[['chipped','A chipped lamp.'],['wicks','A handful of wicks.'],['oil','A small pot of oil.'],['flowers','A handful of flowers.']];
    for(const[i,[kd,line]]of list.entries()){s.give=i+1;const f=A.folk[i+1]||A.folk[0];const p=giveItem(s,kd,f.x-40,f.y-180*L.cs*.8,i).catch(()=>{});await D.say('dadi',line);await p;s.give=-1}
    c.set('smile');b.set('smile');Music.swell()}
  await D.say('dadi','The palace can be lit when people work together.')}
/* ---------- 2.4 - 2.7 the circle of light ---------- */
function circGeo(){const W=L.W,H=L.H,P=L.portrait;const gy=H*(P?.62:.76);const pw=P?W*.86:Math.min(W*.5,H*1.1),ph=P?pw*.62:H*.5;const pal=palaceGeo(W/2-pw/2,gy-ph,pw,ph);
  const d=pal.door,cx=d.x+d.w/2,cy=d.y+d.h*.55,r=Math.min(d.h*.68,P?W*.3:H*.24);const pos=[];for(let i=0;i<12;i++){const a=-Math.PI/2+i/12*TAU;pos.push({x:cx+Math.cos(a)*r,y:cy+Math.sin(a)*r,a})}
  const fy=P?H*.8:H*.86;
  return{gy,pal,cx,cy,r,pos,c:{x:P?W*.18:W*.15,y:fy,s:L.cs,f:1},k:{x:P?W*.84:W*.86,y:fy,s:L.cs,f:-1},b:{x:P?W*.52:W*.31,y:P?fy-40:fy,s:L.cs*.9,f:1},basket:{x:P?W*.33:W*.22,y:fy+(P?20:24)},
    bBlock:{x:cx-r-(P?40:70),y:Math.min(fy,cy+r*.2),s:L.cs*.9,f:-1},bBack:{x:cx-r-(P?150:220),y:fy,s:L.cs*.9,f:-1}}}
function paintCirc(g,W,H,A){paintSky(g,0,0,W,A.gy,'night');motifTree(g,W*.08,A.gy,1.1,0);motifTree(g,W*.93,A.gy,1.1,1);paintGround(g,0,A.gy,W,H-A.gy,true);paintPalace(g,A.pal,{night:true});
  g.setLineDash([10,12]);ring(g,A.cx,A.cy,A.r,ca(C.gold,.5),3);g.setLineDash([])}
function circScene(){const s=mk({id:'circ',L:[],halo:0,wind:0,windDir:1,shield:null,swirl:null,gust:null,drag:null,layout(){return circGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H;Bake.draw(ctx,'circ',0,0,W,H,(g,w,h)=>paintCirc(g,w,h,A));
    if(this.open>0){const d=A.pal.door;ctx.fillStyle=C.gold;ctx.fillRect(d.x+d.w/2-this.open/2,d.y+d.w*.3,this.open,d.h-d.w*.3)}
    glow(ctx,A.cx,A.cy,A.r*1.45,this.halo*.55,T.sec);
    A.pos.forEach((p,i)=>{const l=this.L[i];if(!l){ctx.setLineDash([5,6]);ring(ctx,p.x,p.y-8,26,ca(C.ivory,.8),2.4);ctx.setLineDash([]);if(this.hintI===i)ring(ctx,p.x,p.y-8,34+4*Math.sin(T.sec*5),C.gold,4)}});
    this.drawActors(ctx);withT(ctx,A.basket.x,A.basket.y,L.cs*1.1,1,c=>drawBasket(c,this.supply>0?3:0,0));
    if(this.swirl)swirl(ctx,this.swirl.x,this.swirl.y,60,T.sec,this.swirl.a);
    if(this.gust){const g=this.gust;ctx.save();ctx.translate(A.cx,A.cy);ctx.rotate(g.a+Math.PI);const len=this.blocked?A.r*.55:A.r*1.6;ctx.translate(-A.r-210,0);windLines(ctx,0,-90,len+120,180,1,g.k,T.sec,9);ctx.restore()}
    A.pos.forEach((p,i)=>{const l=this.L[i];if(l){l.x=p.x;l.y=p.y;drawLamp(ctx,l)}});
    if(this.shield){const sh=this.shield,rr=A.r+(L.portrait?80:70);ctx.save();ctx.translate(A.cx,A.cy);ctx.rotate(sh.a);
      R.arc(ctx,0,0,rr*2,rr*2,-.48,.48,false,null,{stroke:C.brown,sw:34,roughness:.4});R.arc(ctx,0,0,rr*2,rr*2,-.46,.46,false,null,{stroke:C.terra,sw:26,roughness:.4});
      for(let i=-3;i<=3;i++){const a=i*.13;dot(ctx,Math.cos(a)*rr,Math.sin(a)*rr,4,C.ivory)}dot(ctx,rr+30,0,16,C.mustard);ring(ctx,rr+30,0,16,C.brown,3);ctx.restore()}
    if(this.drag)drawDiya(ctx,this.drag.x,this.drag.y,L.cs*1.05,{lit:0});
    drawBorder(ctx,true)}});return s}
function circSetup(full){const s=circScene();s.add('chiku',new Actor('chiku',0,0,1,1,'idle'),'c');s.add('kesar',new Actor('kesar',0,0,1,-1,'idle'),'k');s.add('bijli',new Actor('bijli',0,0,1,1,'idle'),'b');
  if(full){s.anch();s.L=s.A.pos.map((p,i)=>lamp(p.x,p.y,L.cs*.9,{lit:1,seed:i}));s.halo=1}return s}
async function shot2_4(){const s=circSetup(false);D.setScene(s,'wipe');const A=s.anch(),c=s.cast.chiku,k=s.cast.kesar,b=s.cast.bijli;s.supply=12;
  const prev=Store.choice('e2d1');
  await D.say('dadi',prev==='B'?'Even the chipped lamp from the courtyard had a place.':"The merchant's oil filled every lamp.");
  await D.say('dadi','The lamps have arrived, but they need to be arranged. Kesar wants the palace entrance to shine like a circle of stars. Can you help Chiku create it?');
  let n=0,resolve;const done=new Promise(r=>resolve=r);const sec=i=>Math.floor(i/3);
  const place=async i=>{if(s.L[i])return;s.L[i]=lamp(A.pos[i].x,A.pos[i].y,L.cs*.9,{lit:0,seed:i});AU.sfx('place');n++;s.hintI=-1;
    const g=sec(i);if([0,1,2].every(j=>s.L[g*3+j])){for(let j=0;j<3;j++){await lightLamp(s.L[g*3+j],400).catch(()=>{});await D.wait(120).catch(()=>{})}c.set('smile');AU.sfx('find')}
    if(s.L.filter(Boolean).length===12&&n===12)resolve()};
  const nextI=()=>{for(let g=0;g<4;g++){const f=[0,1,2].map(j=>g*3+j).filter(i=>!s.L[i]);if(f.length&&f.length<3)return f[0]}return A.pos.findIndex((p,i)=>!s.L[i])};
  s.down=p=>{if(near(p,A.basket.x,A.basket.y-30,110*L.cs)||near(p,c.x,c.y-150*c.s,90*c.s)){s.drag={x:p.x,y:p.y};c.set('reach');AU.sfx('tap')}};
  s.move=p=>{if(s.drag){s.drag.x=p.x;s.drag.y=p.y}};
  s.up=p=>{if(!s.drag)return;const d=s.drag;s.drag=null;c.set('idle');let best=-1,bd=1e9;A.pos.forEach((q,i)=>{if(s.L[i])return;const dd=Math.hypot(q.x-d.x,q.y-d.y);if(dd<bd){bd=dd;best=i}});if(best>=0&&bd<110)place(best)};
  await D.activity({start:()=>done,hint(){s.hintI=nextI();c.set('reach');D.say('dadi','Take a lamp from the basket and set it in an empty place on the circle.').catch(()=>{})},assist(){const i=nextI();if(i>=0)place(i)}});
  s.supply=0;s.down=s.move=s.up=null;await D.wait(500);Music.swell();AU.sfx('chime');await D.tw(s,{halo:1},1800);
  k.set('explain');await D.say('kesar','Look, Chiku! One lamp is lovely. Nine lamps are brighter. And when the whole circle shines, everyone can find the door.');k.set('smile');c.set('smile');b.set('smile')}
async function shot2_5(){ensure('circ',()=>circSetup(true));const s=D.scene,c=s.cast.chiku,b=s.cast.bijli,k=s.cast.kesar,A=s.anch();
  Music.mood('night');await D.say('dadi','The night grows darker. Wind sweeps across the courtyard.');
  s.gust={a:Math.PI,k:0};AU.sfx('wind',{dur:5,pan:-.7});D.tw(s.gust,{k:1},700).catch(()=>{});s.L.forEach(l=>D.tw(l,{lean:.7},600).catch(()=>{}));
  c.set('worry');await D.say('chiku','Oh no! The flames are bending!');
  b.set('determined');await D.say('bijli','I can stand in front of them!');
  await walk(s,b,'bBlock',900);b.f=-1;AU.sfx('wind',{dur:2,pan:-.7});await D.tw(b,{sx:.85,sy:1.12},250);
  b.set('surprise');AU.sfx('oops');await Promise.all([D.tw(b,{x:A.bBack.x,y:A.bBack.y},700,'out'),D.tw(b,{sx:1.2,sy:.8},350).then(()=>D.tw(b,{sx:1,sy:1},450,'back'))]);b.mark='bBack';
  c.set('listen',{lookX:-.6});await D.say('chiku',"You're too small to block all that wind.");
  b.set('worry');await D.say('bijli','I was hoping nobody would notice.');
  k.set('explain');await D.say('kesar',"We don't need to be big. We need to be ready.");
  await D.tw(s.gust,{k:0},800);s.gust=null;s.L.forEach(l=>D.tw(l,{lean:0},700).catch(()=>{}));await walk(s,b,'b',1400);b.f=1;b.set('determined')}
const angD=(a,b)=>{let d=(a-b)%TAU;if(d>Math.PI)d-=TAU;if(d<-Math.PI)d+=TAU;return d};
async function shot2_6(){ensure('circ',()=>circSetup(true));const s=D.scene,c=s.cast.chiku,b=s.cast.bijli,k=s.cast.kesar,A=s.anch();
  await D.say('dadi','Watch for a swirl that signals where the wind is coming from. Move the shield towards the approaching gust.');
  s.shield={a:Math.PI/2};const sh=s.shield;let target=sh.a;
  s.down=p=>{const out=s.L.findIndex((l,i)=>l&&l.out&&near(p,A.pos[i].x,A.pos[i].y-20,70));if(out>=0){relight(out);return}
    if(Math.hypot(p.x-A.cx,p.y-A.cy)>A.r*.35){target=Math.atan2(p.y-A.cy,p.x-A.cx);s.dragging=true}};
  s.move=p=>{if(s.dragging&&Math.hypot(p.x-A.cx,p.y-A.cy)>A.r*.35)target=Math.atan2(p.y-A.cy,p.x-A.cx)};s.up=()=>{s.dragging=false};
  s.key=key=>{if(key==='ArrowLeft'){target-=.4;return true}if(key==='ArrowRight'){target+=.4;return true}return false};
  const iv=setInterval(()=>{sh.a+=angD(target,sh.a)*.25;if(s.gust){s.blocked=Math.abs(angD(sh.a,s.gust.a))<.6;const lean=-Math.cos(s.gust.a)*.9*s.gust.k;
    s.L.forEach((l,i)=>{if(!l||l.out)return;const exp=!s.blocked&&Math.abs(angD(A.pos[i].a,s.gust.a))<1.1;l.lean=s.blocked?lean*.15:lean;l.lit=exp?.65+.2*Math.sin(T.sec*20+i):1})}
    else s.L.forEach(l=>{if(l&&!l.out){l.lean*=.85;l.lit=lerp(l.lit,1,.2)}})},40);
  const outs=()=>s.L.filter(l=>l&&l.out).length;
  const relight=async i=>{const l=s.L[i];if(!l||!l.out||l.relighting)return;l.relighting=true;D.lastInput=performance.now();c.set('reach');await lightLamp(l,600).catch(()=>{});l.out=false;l.relighting=false;c.set('determined')};
  const goOut=i=>{const l=s.L[i];if(!l||l.out)return;l.out=true;AU.sfx('oops');D.tw(l,{lit:0},500).catch(()=>{})};
  const nearest=a=>{let bi=0,bd=9;A.pos.forEach((p,i)=>{const d=Math.abs(angD(p.a,a));if(d<bd){bd=d;bi=i}});return bi};
  const waitClear=async()=>{while(outs()>0)await D.wait(200)};
  const gusts=[{a:Math.PI,line:'The wind came from the left. Chiku moved the shield.',pan:-.8},{a:0,pre:'The wind changed direction. Bijli ran to warn her.',pan:.8},
    {a:-Math.PI/4,stray:true,line:'One lamp flickered, but Chiku relit it.',pan:.5},{a:Math.PI*.8,pan:-.6}];
  const run=async()=>{for(const g of gusts){await D.wait(900);const sx=A.cx+Math.cos(g.a)*(A.r+190),sy=A.cy+Math.sin(g.a)*(A.r+150);
      if(g.pre){const bx=A.cx+Math.cos(g.a)*(A.r+120);b.free=true;b.walking=true;b.f=bx>b.x?1:-1;D.say('dadi',g.pre).catch(()=>{});await D.tw(b,{x:clamp(bx,borderSize()+120,L.W-borderSize()-120)},1100,'io');b.walking=false;b.set('point');AU.sfx('step')}
      s.swirl={x:sx,y:sy,a:0};await D.tw(s.swirl,{a:1},500);c.set('idle',{lookX:Math.cos(g.a)>0?1:-1});await D.wait(2200);
      s.gust={a:g.a,k:0};AU.sfx('wind',{dur:3,pan:g.pan});await D.tw(s.gust,{k:1},500);await D.wait(2200);
      if(!s.blocked)goOut(nearest(g.a));if(g.stray)goOut(nearest(g.a+Math.PI));
      await D.tw(s.gust,{k:0},500);s.gust=null;s.swirl=null;
      if(g.stray){await waitClear();await D.say('dadi',g.line)}else{await waitClear();if(g.line)await D.say('dadi',g.line)}
      b.set('determined')}};
  try{await D.activity({start:run,hint(){const o=s.L.findIndex(l=>l&&l.out);b.set('point');if(o>=0){D.say('dadi','Tap the lamp that went out to light it again.').catch(()=>{})}else if(s.swirl)D.say('dadi','Move the shield towards the swirl.').catch(()=>{})},
    assist(){const o=s.L.findIndex(l=>l&&l.out);if(o>=0)relight(o);else if(s.swirl||s.gust){const g=s.gust||{a:Math.atan2(s.swirl.y-A.cy,s.swirl.x-A.cx)};target=g.a}}})}
  finally{clearInterval(iv);s.down=s.move=s.up=s.key=null}
  s.shield=null;b.free=false;await walk(s,b,'b',1200).catch(()=>{});b.f=1;Music.swell();c.set('smile');k.set('smile');b.set('smile');
  await D.say('dadi','The circle of light grew steady again.')}
/* ---------- 2.7 someone is at the door (cliffhanger) ---------- */
function doorGeo(){const W=L.W,H=L.H,P=L.portrait;const fy=H*(P?.74:.86);const dw=P?W*.5:W*.26,dh=P?H*.44:H*.66;const d={x:W/2-dw/2,y:fy-dh,w:dw,h:dh};
  const lamps=[];const n=P?6:10;for(let i=0;i<n;i++){const t=i/(n-1);const x=lerp(W*.08,W*.92,t);if(Math.abs(x-W/2)<dw*.55)continue;lamps.push({x,y:fy+(P?36:26)})}
  return{fy,d,lamps,c:{x:P?W*.2:W*.16,y:P?H*.82:fy+10,s:L.cs,f:1},k:{x:P?W*.8:W*.84,y:P?H*.82:fy+10,s:L.cs,f:-1},b:{x:P?W*.42:W*.28,y:P?H*.83:fy+10,s:L.cs*.9,f:1},
    y:{x:W/2,y:fy+4,s:L.cs*(P?1.02:1.04),f:1},yIn:{x:W/2,y:fy+4,s:L.cs*1.04,f:1}}}
function paintDoorWall(g,W,H,A){g.fillStyle=C.indigo;g.fillRect(0,0,W,H);R.rect(g,0,H*.05,W,A.fy-H*.05,C.terra,{sw:3});
  for(let i=0;i<Math.round(W/170);i++)motifHorse(g,W*(i+.5)/Math.round(W/170),H*.16,.6,C.ivory,C.indigo,i%2?1:-1);zigzag(g,0,H*.2,W,24,C.mustard,Math.round(W/30));
  paintDoorFrame(g,A.d);g.fillStyle=C.brown;g.fillRect(0,A.fy,W,H-A.fy);R.rect(g,0,A.fy,W,18,C.mustard,{sw:2.4});diamonds(g,0,A.fy+36,W,28,ca(C.gold,.6),Math.round(W/60))}
function doorScene(){const s=mk({id:'door',open:0,shadow:0,still:0,sky:null,skyK:0,rays:0,birds:0,layout(){return doorGeo()},
  draw(ctx){const A=this.anch(),W=L.W,H=L.H,d=A.d;Bake.draw(ctx,'doorW',0,0,W,H,(g,w,h)=>paintDoorWall(g,w,h,A));
    ctx.save();camT(ctx,this.cam);
    const inner=archPts(d.x,d.y,d.w,d.h);ctx.save();ctx.beginPath();inner.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();ctx.clip();
    if(this.open>0){if(this.sky){Bake.draw(ctx,'dsky'+this.sky[0],d.x,d.y,d.w,d.h,(g,w,h)=>paintSky(g,0,0,w,h,this.sky[0]));if(this.skyK>0){ctx.globalAlpha=this.skyK;Bake.draw(ctx,'dsky'+this.sky[1],d.x,d.y,d.w,d.h,(g,w,h)=>paintSky(g,0,0,w,h,this.sky[1]));ctx.globalAlpha=1}
        if(this.rays>0){ctx.globalAlpha=this.rays;for(let i=0;i<9;i++){const a=Math.PI+(i+.5)/9*Math.PI;strokeL(ctx,[[d.x+d.w/2+Math.cos(a)*d.w*.3,d.y+d.h+Math.sin(a)*d.w*.3],[d.x+d.w/2+Math.cos(a)*d.w*1.2,d.y+d.h+Math.sin(a)*d.w*1.2]],C.gold,8)}ctx.globalAlpha=1}
        if(this.birds>0){for(let i=0;i<4;i++){const bx=d.x+d.w*((.2+i*.2+T.sec*.02)%1),by=d.y+d.h*(.25+.06*Math.sin(i*2+T.sec));ctx.globalAlpha=this.birds;strokeL(ctx,[[bx-12,by-4],[bx,by+2],[bx+12,by-4]],C.charcoal,3);ctx.globalAlpha=1}}}
      else{ctx.fillStyle=C.gold;ctx.fillRect(d.x,d.y,d.w,d.h);for(let i=0;i<14;i++){const a=i/14*TAU;strokeL(ctx,[[d.x+d.w/2+Math.cos(a)*d.w*.2,d.y+d.h*.55+Math.sin(a)*d.w*.2],[d.x+d.w/2+Math.cos(a)*d.w*.9,d.y+d.h*.55+Math.sin(a)*d.w*.9]],C.mustard,6)}}}
    const lw=d.w/2*(1-this.open);if(lw>1){ctx.save();ctx.translate(d.x,d.y);ctx.scale(Math.max(.001,lw/(d.w/2)),1);paintDoorHalf(ctx,d,0);ctx.restore();
      ctx.save();ctx.translate(d.x+d.w,d.y);ctx.scale(-Math.max(.001,lw/(d.w/2)),1);paintDoorHalf(ctx,d,1);ctx.restore()}
    ctx.restore();
    if(this.shadow>0&&this.open<.05){const y0=A.fy+2,len=this.shadow*d.w*.9;poly(ctx,[[d.x+d.w*.35,y0],[d.x+d.w*.65,y0],[d.x+d.w*.55,y0+30+len*.15],[d.x+d.w*.45,y0+30+len*.15]],ca(C.indigo,.9));for(let i=0;i<4;i++)dot(ctx,d.x+d.w*.5,y0+10+i*len*.04,3,ca(C.charcoal,.5))}
    this.drawActors(ctx,a=>a.kind==='yama');
    A.lamps.forEach((p,i)=>drawDiya(ctx,p.x,p.y,L.cs*.8,{lit:1,glow:true,t:T.sec*(1-this.still*.85),seed:i,lean:this.lean||0}));
    this.drawActors(ctx,a=>a.kind!=='yama');ctx.restore();drawBorder(ctx,true)}});return s}
function paintDoorHalf(ctx,d,side){R.rect(ctx,0,0,d.w/2,d.h,C.indigo,{sw:3,seed:7+side});for(let r=0;r<6;r++)for(let c2=0;c2<2;c2++){const sx=d.w/2*(.3+c2*.4),sy=d.w*.6+r*(d.h-d.w*.7)/6;dot(ctx,sx,sy,5,C.mustard);ring(ctx,sx,sy,5,C.brown,1.4)}
  diamonds(ctx,d.w*.06,d.h*.5,d.w*.4,d.h*.05,C.terra,3);R.rect(ctx,d.w*.04,d.w*.12,d.w*.42,d.w*.3,C.verm,{sw:2,seed:9+side})}
async function shot2_7(){const s=doorScene();D.setScene(s,'wipe');const c=s.add('chiku',new Actor('chiku',0,0,1,1,'idle'),'c'),k=s.add('kesar',new Actor('kesar',0,0,1,-1,'idle'),'k'),b=s.add('bijli',new Actor('bijli',0,0,1,1,'idle'),'b');
  s.cam.fx=L.W/2;s.cam.fy=s.anch().fy;
  await D.say('dadi','Midnight arrives. The lamps glow warmly, and the wind suddenly becomes still.');
  Music.silence();await D.tw(s,{still:1},1500);await D.wait(2600);
  c.set('worry',{lookX:.6});await D.say('chiku','Why has everything gone quiet?');
  await D.tw(s,{shadow:1},2400);b.set('worry',{lookX:1});b.p.earL=.4;
  await D.say('bijli','The visitor has arrived.',{vol:.75});
  k.set('welcome',{lookX:-.4});await D.say('kesar','Then we shall open the door and welcome him.');
  await D.say('dadi','Chiku had spent the whole day preparing for a visitor she had never met. But what would happen when the door opened? Would the stories and lamps be enough?');
  AU.sfx('creak');await D.tw(s,{open:.035},1600);await D.wait(1300);await D.tw(D,{black:1},450);await D.wait(1600)}
