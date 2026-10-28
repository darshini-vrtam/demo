/* ================= EPISODE 4: THE TERRIBLE POISON ================= */
/* violet clouds for the poison sky (they fade when the danger passes) */
function poisonClouds(s,list){const g=grp(s.comp);const cl=list.map(([x,y,w])=>{const c=cloud(g,w,P.mauve);tf(c,x,y,1);return c});const o={k:1};s.parts.push({update:(dt,t)=>{op(g,o.k);cl.forEach((c,i)=>tf(c,list[i][0]+Math.sin(t*.05+i)*30*MV(),list[i][1],1))}});return o}



/* ---- Lord Shiva at the centre ---- */
function shivaScene(){const s=mkScene('shiva',{frame:'violet'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const hy=toStage(0,LP(300,520))[1];
    this.sky=sky(this.bg,W,hy,{seed:21,n:5,clouds:[]});horizonBand(this.bg,W,hy,P.gold);
    this.seaP=grp(this.bg);this.seaB=grp(this.bg);this.sea=ocean(this.seaB,W,hy,H,{mood:'wonder',n:5});this.seaV=ocean(this.seaP,W,hy,H,{mood:'poison',n:4,dens:1.35});
    this.seaB.parentNode.insertBefore(this.seaB,this.seaP)};
  s.parts.push({update:(dt,t)=>{s.sky&&s.sky.update(t);if(s.sea){s.sea.k=s.seaK==null?.3:s.seaK;s.sea.update(t,dt);s.seaV.k=s.sea.k;s.seaV.update(t,dt);op(s.seaP,s.poisonK==null?1:s.poisonK)}}});
  const comp=s.comp;const haloG=grp(comp);const pedG=grp(comp);const shG=grp(comp);const grpL=grp(comp);
  const h=halo(haloG,196,{col:P.turmeric});rings(haloG,170,{n:2,step:.18,w:4,c1:P.gold,c2:P.ivory});
  const ped=lotus(pedG,{r:120,n:9,open:1,col:P.mauve,col2:P.ivory});
  const sh=new Deity('shiva',shG,{pose:'shiva'});s.shiva=sh;s.cast.shiva=sh;
  const devas=[0,1,2].map(i=>new Fig('deva',i,grpL)),asuras=[0,1,2].map(i=>new Fig('asura',i+1,grpL));s.cast.devas=devas;s.cast.asuras=asuras;
  s.st={step:0,halo:0};
  s.onLayout=function(){const A=LP({x:889,y:760,s:1.12,dx:[200,320,440],ax:[1338,1458,1578],fy:760,fs:.72},{x:500,y:1200,s:1.3,dx:[90,180,270],ax:[730,820,910],fy:1460,fs:.56});s.A=A;
    devas.forEach((f,i)=>{f.x=A.dx[i];f.y=A.fy;f.s=A.fs;f.f=1});asuras.forEach((f,i)=>{f.x=A.ax[i];f.y=A.fy;f.s=A.fs;f.f=-1})};
  s.tick=function(dt,t){const A=s.A;const k=s.st.step;sh.x=A.x;sh.y=A.y-(1-k)*40;sh.s=A.s*(.86+.14*k);sh.update(dt,t);op(shG,clamp(k*1.5,0,1));
    tf(pedG,A.x,A.y+10,A.s*.95);op(pedG,clamp(k*1.5,0,1));tf(haloG,A.x,A.y-300*A.s,A.s*(.9+.1*s.st.halo));op(haloG,s.st.halo);
    devas.concat(asuras).forEach(f=>f.update(dt,t))};
  return s}


/* ---- 4.3 A little pause ---- */
function pauseScene(){const s=mkScene('pause',{frame:'violet'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const hy=toStage(0,LP(250,430))[1];
    this.sky=sky(this.bg,W,hy,{seed:31,n:10,clouds:[]});horizonBand(this.bg,W,hy,P.gold);
    this.seaB=grp(this.bg);this.seaP=grp(this.bg);this.sea=ocean(this.seaB,W,hy,H,{mood:'divine',n:5});this.seaV=ocean(this.seaP,W,hy,H,{mood:'poison',n:4,dens:1.35})};
  s.parts.push({update:(dt,t)=>{s.sky&&s.sky.update(t);if(s.sea){s.sea.k=s.seaK==null?.5:s.seaK;s.sea.update(t,dt);s.seaV.k=s.sea.k;s.seaV.update(t,dt);op(s.seaP,s.poisonK==null?1:s.poisonK)}}});
  const comp=s.comp;s.clouds=poisonClouds(s,LP([[300,120,240],[1480,110,260],[889,60,180]],[[250,250,220],[760,200,240]]));
  const hlG=grp(comp);const H_=heartLotus(hlG);const ring=grp(hlG);circ(ring,0,-60,120,'none',10,{stroke:K});circ(ring,0,-60,120,'none',5,{stroke:P.turmeric,'stroke-dasharray':'.1 16','stroke-linecap':'round'});
  const hT=target(hlG,150);hT.y=-50;
  const sil=['family','friends','animals'].map(k=>{const g=grp(comp);silhouette(g,k);return{g,k,on:0,lit:0}});
  const lamps=[0,1,2].map(i=>diya(comp,{lit:0}));const lT=lamps.map(()=>target(comp,70));
  const orbs=grp(comp);const lights=[];
  Object.assign(s,{H_,ring,hT,sil,lamps,lT,breath:0,hlOn:0,lampOn:[0,0,0],lights,orbs});
  s.onLayout=function(){s.A=LP({hl:[889,520],hs:1.55,sil:[[400,230],[889,190],[1378,230]],ss:1.15,lamp:[[600,750],[889,770],[1178,750]],ls:1.35},
    {hl:[500,860],hs:1.75,sil:[[190,330],[500,280],[810,330]],ss:1.1,lamp:[[200,1330],[500,1360],[800,1330]],ls:1.55})};
  s.tick=function(dt,t){const A=s.A;tf(hlG,A.hl[0],A.hl[1],A.hs);tf(ring,0,0,.4+.9*s.breath);op(ring,s.breath>.01?1:0);hT.on=s.hlOn;hT.update(t);
    sil.forEach((o,i)=>{tf(o.g,A.sil[i][0],A.sil[i][1]+40,A.ss*(.6+.4*o.on));op(o.g,o.on)});
    lamps.forEach((l,i)=>{l.x=A.lamp[i][0];l.y=A.lamp[i][1];l.s=A.ls;l.update(t);lT[i].x=l.x;lT[i].y=l.y-30*A.ls;lT[i].on=s.lampOn[i];lT[i].update(t)});
    lights.forEach(l=>{const a=l.from,b=l.to;const k=l.k;tf(l.g,lerp(a[0],b[0],k),lerp(a[1],b[1],k)-Math.sin(k*Math.PI)*90,.5+.3*Math.sin(k*Math.PI));op(l.g,k<1?1:0)})};
  s.fx=fxLayer(s);s.demo=demoHand(s);
  s.hots=function(){const h=[];const A=s.A;if(s.hlOn>.5)h.push({id:'heart',label:'Heart lotus: press and hold to breathe',x:A.hl[0],y:A.hl[1]-50*A.hs,r:120,on:()=>s.onHeart&&s.onHeart()});
    sil.forEach((o,i)=>{if(o.on>.5&&!o.lit)h.push({id:'sil'+i,label:['Family','Friends','Birds and animals'][i]+': tap to send kindness',x:A.sil[i][0],y:A.sil[i][1]-40,r:80,on:()=>s.onSil&&s.onSil(i)})});
    s.lampOn.forEach((on,i)=>{if(on>.5)h.push({id:'lamp'+i,label:'Wish lamp: tap to light',x:A.lamp[i][0],y:A.lamp[i][1]-30,r:70,on:()=>s.onLamp&&s.onLamp(i)})});return h};
  return s}

