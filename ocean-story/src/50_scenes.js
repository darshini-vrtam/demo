/* ================= EPISODE 1: THE OCEAN OF WONDERS ================= */
function mk(o){const s=Object.assign({_v:-1,A:null,hot:()=>[]},o);s.anch=function(){if(this._v!==L.ver){this._v=L.ver;this.A=this.layout();this.onLayout&&this.onLayout(this.A)}return this.A};return s}
const LABEL={water:'Drink water',food:'Eat nourishing food',rest:'Get enough rest',learn:'Learn something new',help:'Help someone',health:'A. Good health',crown:'B. A bigger crown',toys:'C. A mountain of toys'};

/* ---------- shared sky (Scenes 1.1-1.3) ---------- */
function skyOpts(W,sky,P){return{seed:11,sunX:W*(P?.2:.2),sunY:sky*(P?.6:.6),moonX:W*(P?.8:.8),moonY:sky*(P?.6:.6),
  clouds:P?[[W*.4,sky*.74,150],[W*.66,sky*.2,120]]:[[W*.31,sky*.3,170],[W*.66,sky*.24,140],[W*.4,sky*.72,110],[W*.63,sky*.74,120]]}}
function drawBirds(ctx,W,sky){for(let i=0;i<3;i++){const u=((i*.29+T.sec*.004*MV())%1);const x=W*(.24+u*.52),y=sky*(.12+i*.07);drawBird(ctx,x,y,L.portrait?.9:1,(Math.sin(T.sec*3+i)*.5+.5)*MV(),1)}}

/* ---------- Scenes 1.1 and 1.2: the churning tableau ---------- */
function oceanGeo(){const W=L.W,Ha=L.Ha,P=W/Ha<1.3;const sky=Ha*(P?.3:.33);const lam=P?92:104,rh=lam*.42;
  const feetY=Ha*(P?.6:.74);const n1=Math.floor((feetY-30-sky)/rh);const mBase=sky+n1*rh+12;
  const cs=P?Math.min(.82,W/1220):Math.min(.9,Ha/900);const dx=P?[W*.14,W*.28]:[W*.12,W*.19,W*.26];
  const peak=Math.max(Ha*(P?.12:.1),P?L.hudB+40:0),mh=mBase-peak,mw=Math.min(mh*.62,W*(P?.26:.19));const ropeY=feetY-176*cs;
  const cr=P?84:62;const clues=P?[{k:'fish',x:W*.3,y:Ha*.72},{k:'lotus',x:W*.68,y:Ha*.8},{k:'shell',x:W*.38,y:Ha*.9}]
    :[{k:'fish',x:W*.36,y:Ha*.8},{k:'lotus',x:W*.5,y:Ha*.86},{k:'shell',x:W*.64,y:Ha*.79}];
  const sr=P?54:38,sy=Ha-(P?170:112),syms=[0,1,2].map(i=>({x:W/2+(i-1)*(P?170:140),y:sy,r:sr}));
  return{W,Ha,P,sky,lam,rh,feetY,n1,mBase,cs,dx,peak,mh,mw,ropeY,cr,clues,syms,handle:{x:W/2,y:ropeY+(P?96:88),w:P?250:280,h:P?78:72}}}
function oceanScene(){const s=mk({id:'ocean',mode:'1.1',vk:.82,pull:0,rot:0,phase:0,swirl:0,foam:0,cover:0,ui:0,clueA:1,handleDx:0,hintI:-1,hintSide:0,active:false,
  dev:[],asu:[],clues:[],syms:[{k:0},{k:0},{k:0}],
  layout(){return oceanGeo()},
  onLayout(A){const n=A.P?2:3;if(this.dev.length!==n){this.dev=[];this.asu=[];for(let i=0;i<n;i++){this.dev.push(person('deva',i));this.asu.push(person('asura',i))}}
    this.dev.forEach((p,i)=>Object.assign(p,{x:A.dx[i],y:A.feetY,s:A.cs,f:1}));this.asu.forEach((p,i)=>Object.assign(p,{x:A.W-A.dx[i],y:A.feetY,s:A.cs,f:-1}));
    if(!this.clues.length)this.clues=A.clues.map(c=>({k:c.k,found:false,wig:0,open:0,sp:0}));this.clues.forEach((c,i)=>{c.x=A.clues[i].x;c.y=A.clues[i].y})},
  setPose(pose,lean){[...this.dev,...this.asu].forEach(p=>{p.pose=pose;p.baseLean=lean||0})},
  hot(){const A=this.anch();if(!this.active)return[];
    if(this.mode==='1.1')return this.clues.filter(c=>!c.found).map((c,i)=>({id:'clue-'+c.k,label:{fish:'Fish clue',lotus:'Lotus clue',shell:'Shell clue'}[c.k],x:c.x,y:c.y,r:A.cr*1.15,on:()=>this.onClue&&this.onClue(c)}));
    const h=A.handle;return[{id:'handle',label:'Rope handle. Drag it left or right, or press the left and right arrow keys.',x:h.x+this.handleDx,y:h.y,w:h.w+40,h:h.h+50,drag:true,
      onDrag:dx=>this.onDrag&&this.onDrag(dx),onEnd:()=>this.onEnd&&this.onEnd(),key:k=>this.key&&this.key(k)}]},
  rope(A){const pl=this.pull*30;const dv=this.dev.slice().sort((a,b)=>a.x-b.x),as=this.asu.slice().sort((a,b)=>a.x-b.x),cs=A.cs,W=A.W;const P=[];
    const d0=dv[0];P.push([d0.x-92*cs,A.feetY-40*cs]);P.push([d0.x-56*cs,A.feetY-118*cs]);dv.forEach(p=>P.push(handOf(p)));
    P.push([W/2-A.mw*.5+pl,A.ropeY+10]);P.push([W/2+pl,A.ropeY+22]);P.push([W/2+A.mw*.5+pl,A.ropeY+10]);as.forEach(p=>P.push(handOf(p)));
    const a1=as[as.length-1];P.push([a1.x+50*cs,A.feetY-150*cs]);P.push([a1.x+82*cs,A.feetY-130*cs]);P.push([a1.x+100*cs,A.feetY-168*cs]);return catmull(P,8)},
  draw(ctx){const A=this.anch(),W=A.W,Ha=A.Ha;const t=T.sec,mv=MV();
    [...this.dev,...this.asu].forEach(p=>{const side=p.kind==='deva'?-1:1;p.lean=(p.baseLean||0)+Math.max(0,this.pull*side)*.14});
    Bake.draw(ctx,'sky',0,0,W,A.sky+4,(g,w,h)=>paintSky(g,w,h,skyOpts(w,A.sky,A.P)));drawBirds(ctx,W,A.sky);
    drawWaves(ctx,W,A.sky-6,A.sky-6+A.n1*A.rh,{lam:A.lam,rh:A.rh});
    const hw=y=>A.mw/2*(1-Math.pow(clamp((A.mBase-y)/A.mh,0,1),1.25)*.86);
    drawMandara(ctx,W/2,A.mBase+6,A.mh+6,A.mw,this.rot,this.pull*.03);
    const vw=(A.P?30:36)*this.vk,pl=this.pull*30;
    [[A.ropeY-70,A.ropeY-118],[A.ropeY-178,A.ropeY-222]].forEach(([y0,y1],i)=>drawSerpent(ctx,catmull([[W/2-hw(y0)+pl*.6,y0],[W/2+pl*.6,(y0+y1)/2+10],[W/2+hw(y1)+pl*.6,y1]],10),vw*(1-i*.12),this.phase,{tail:false}));
    drawWaves(ctx,W,A.sky-6+A.n1*A.rh,Ha+10,{lam:A.lam,rh:A.rh,row0:A.n1});
    const lx0=A.dx[0]-86*A.cs,lx1=A.dx[A.dx.length-1]+78*A.cs;drawLedge(ctx,lx0,lx1,A.feetY,Math.min(80,Ha-A.feetY-40),3);drawLedge(ctx,W-lx1,W-lx0,A.feetY,Math.min(80,Ha-A.feetY-40),7);
    if(this.mode==='1.1'||this.clueA<1)this.drawClues(ctx,A,t);
    [...this.dev,...this.asu].sort((a,b)=>Math.abs(b.x-W/2)-Math.abs(a.x-W/2)).forEach(p=>drawPerson(ctx,p));
    drawSerpent(ctx,this.rope(A),vw,this.phase,{head:true});
    [...this.dev,...this.asu].forEach(p=>drawFists(ctx,p));
    if(this.ui>0)this.drawChurnUI(ctx,A,t);
    if(this.foam>0||this.cover>0)drawFoam(ctx,A,this.foam,this.cover,t);
    if(this.swirl>0&&this.cover<.4)drawSwirl(ctx,W/2,A.mBase+A.rh*.7,A.mw*1.25,A.rh*1.6,this.swirl*(1-this.cover*2.5),t);
    drawBorder(ctx,W,Ha)},
  drawClues(ctx,A,t){ctx.save();ctx.globalAlpha*=this.clueA;this.clues.forEach((c,i)=>{const bob=Math.sin(t*1.4+i*2)*5*MV();const y=c.y+bob,sc=A.cr/62;
      if(c.found){ctx.save();ctx.setLineDash([3,9]);ring(ctx,c.x,y,A.cr*1.1,C.cream,4.5);ctx.restore()}
      if(c.k==='fish')drawFish(ctx,c.x,y,sc,1,Math.sin(t*18)*c.wig*MV());else if(c.k==='lotus')drawLotus(ctx,c.x,y+8*sc,sc,c.open);else drawShell(ctx,c.x,y,sc);
      if(c.sp>0)sparkle(ctx,c.x,y,A.cr*1.15,c.sp,t);
      if(this.mode==='1.1'&&!c.found&&(c.k==='fish'||this.hintI===i)&&this.active)tag(ctx,'Tap to discover',c.x,y-A.cr-(A.P?40:30),A.P?40:22)});ctx.restore()},
  drawChurnUI(ctx,A,t){ctx.save();ctx.globalAlpha*=this.ui;const h=A.handle,hx=h.x+this.handleDx+this.pull*30;[-1,1].forEach(sd=>{const p0=[A.W/2+this.pull*30+sd*h.w*.28,A.ropeY+22],p1=[hx+sd*h.w*.3,h.y-h.h*.4];line(ctx,[p0,p1],C.ink,11);line(ctx,[p0,p1],C.cream,5)});drawHandle(ctx,hx,h.y,h.w,h.h,this.hintSide,t);
    this.syms.forEach((m,i)=>{const g=A.syms[i];drawPullMark(ctx,g.x,g.y,g.r,m.k);text(ctx,'Pull '+(i+1),g.x,g.y+g.r+(A.P?28:20),A.P?38:22,C.cream,{outline:6})});ctx.restore()}});
  return s}
function tag(ctx,str,x,y,size){ctx.save();ctx.font=`700 ${size}px ${FB}`;const w=ctx.measureText(str).width+size*1.2,h=size*1.6;
  ctx.beginPath();ctx.roundRect?ctx.roundRect(x-w/2,y-h/2,w,h,h/2):ctx.rect(x-w/2,y-h/2,w,h);ctx.fillStyle=C.cream;ctx.fill();ctx.lineWidth=3;ctx.strokeStyle=C.ink;ctx.stroke();
  pth(ctx,[[x-8,y+h/2-1],[x+8,y+h/2-1],[x,y+h/2+9]]);ctx.fillStyle=C.cream;ctx.fill();ctx.stroke();ctx.restore();text(ctx,str,x,y+1,size,C.ink)}
function drawHandle(ctx,x,y,w,h,hint,t){const r=h/2;const b=c=>{c.beginPath();c.roundRect?c.roundRect(x-w/2,y-h/2,w,h,r):c.rect(x-w/2,y-h/2,w,h)};
  shape(ctx,b,C.cream,c=>{patLines(c,x-w/2,y-h/2,x+w/2,y+h/2,24,.7,C.verm,9);patDots(c,x-w/2,y-h*.3,x+w/2,y+h*.3,24,3,C.indigo,12)},OL+1.5);
  [-1,1].forEach(sd=>{const ex=x+sd*(w/2+4),pulse=hint===sd?(1+.12*Math.sin(t*6)*MV()):1;shape(ctx,c=>{c.beginPath();c.arc(ex,y,r*.95*pulse,0,TAU)},C.turmeric,null,OL);
    pth(ctx,[[ex+sd*r*.42,y],[ex-sd*r*.18,y-r*.42],[ex-sd*r*.18,y+r*.42]]);ctx.fillStyle=hint===sd?C.verm:C.ink;ctx.fill()})}
function drawPullMark(ctx,x,y,r,k){shape(ctx,c=>{c.beginPath();c.arc(x,y,r,0,TAU)},C.cream,c=>{patDots(c,x-r,y-r,x+r,y+r,11,1.8,C.peacock)},OL);
  if(k>0){const rr=r*k;for(let i=0;i<8;i++){const a=i/8*TAU;ctx.save();ctx.translate(x+Math.cos(a)*rr*.45,y+Math.sin(a)*rr*.45);ctx.rotate(a+Math.PI/2);
      shape(ctx,c=>{c.beginPath();c.ellipse(0,0,rr*.22,rr*.42,0,0,TAU)},i%2?C.verm:C.turmeric,null,2.4);ctx.restore()}
    dot(ctx,x,y,rr*.24,C.turmeric);ring(ctx,x,y,rr*.24,C.ink,2.4)}}
function drawSwirl(ctx,x,y,rx,ry,k,t){ctx.save();ctx.globalAlpha*=clamp(k,0,1);for(let j=0;j<3;j++){const f=.45+j*.3,a0=t*.6*MV()+j*2;
  ctx.beginPath();ctx.ellipse(x,y,rx*f,ry*f,0,a0,a0+4.2);ctx.strokeStyle=C.ink;ctx.lineWidth=9;ctx.stroke();ctx.strokeStyle=C.cream;ctx.lineWidth=4.5;ctx.stroke();
  for(let i=0;i<6;i++){const a=a0+i*.7;dot(ctx,x+Math.cos(a)*rx*f,y+Math.sin(a)*ry*f-12,3,C.turmeric)}}ctx.restore()}
function drawFoam(ctx,A,foam,cover,t){const W=A.W,Ha=A.Ha;const crest=x=>{const b=Math.exp(-Math.pow((x-W/2)/(W*.17),2));return(Ha-50)-b*((Ha-50)-(A.mBase+(Ha-A.mBase)*.42))};
  const top=x=>lerp(lerp(Ha+30,crest(x),clamp(foam,0,1)),-90,clamp(cover,0,1))+Math.sin(t*1.2+x/70)*6*MV();const step=A.lam/2;
  const b=c=>{c.beginPath();c.moveTo(-20,Ha+40);c.lineTo(-20,top(-20));for(let x=-20;x<=W+20;x+=step){const y0=top(x),y1=top(x+step);c.quadraticCurveTo(x+step/2,Math.min(y0,y1)-step*.5,x+step,y1)}c.lineTo(W+20,Ha+40);c.closePath()};
  shape(ctx,b,C.cream,c=>{let row=0;for(let y=Math.min(top(W/2),top(0))-20;y<Ha+40;y+=34,row++){c.beginPath();for(let x=-20+(row%2?17:0);x<W+40;x+=34){c.moveTo(x-12,y);c.arc(x,y,12,Math.PI,TAU)}c.strokeStyle=C.peacock;c.lineWidth=2.4;c.stroke();
      patDots(c,-20,y+8,W+20,y+8,34,2.4,C.turmeric,row%2?0:17)}},OL)}

/* ---------- Scene 1.3: three treasure panels ---------- */
function wondersGeo(){const W=L.W,Ha=L.Ha,P=W/Ha<.9;const sky=Ha*(P?.28:.33);const lam=P?92:104,rh=lam*.42;const gap=P?30:34;let panels;
  if(!P){const u=Math.min((W*.64-2*gap)/3.16,(Ha*.66)/1.5);const cy=Ha*.52;panels=[0,1,2].map(i=>{const m=i===1,w=u*(m?1.16:1),h=u*(m?1.5:1.3);return{w,h,x:W/2+(i-1)*(u*1.08+gap),y:cy}})}
  else{const top=sky+30,avail=Ha-top-60;const u=Math.min((avail-2*gap)/3.16,W*.62/1.7);let y=top;panels=[0,1,2].map(i=>{const m=i===1,h=u*(m?1.16:1),w=u*(m?1.95:1.7);const p={w,h,x:W/2,y:y+h/2};y+=h+gap;return p})}
  const fs=P?.4:.42,fy=P?sky-10:sky+rh*2.6;const lim=P?W*.5-60:panels[0].x-panels[0].w/2-60;const fx=P?[W*.14,W*.27]:[Math.max(W*.1,lim-110),lim-55,lim].map(v=>Math.max(W*.1,v));
  return{W,Ha,P,sky,lam,rh,panels,fs,fy,fx}}
function wondersScene(){const s=mk({id:'wonders',cover:0,rip:0,fill:0,hintI:-1,active:false,ps:[0,1,2].map(i=>({open:false,rise:0,k:0,sp:0,key:['moon','horse','jewel'][i],lab:['First wonder','Second wonder','Third wonder'][i]})),dev:[],asu:[],
  layout(){return wondersGeo()},
  onLayout(A){const n=A.P?2:3;this.dev=[];this.asu=[];for(let i=0;i<n;i++){this.dev.push(person('deva',i,{x:A.fx[i],y:A.fy,s:A.fs,f:1,pose:'wonder',mouth:'o',brow:1}));this.asu.push(person('asura',i,{x:A.W-A.fx[i],y:A.fy,s:A.fs,f:-1,pose:'wonder',mouth:'o',brow:1}))}},
  hot(){const A=this.anch();if(!this.active)return[];return this.ps.map((p,i)=>p.open?null:{id:'panel-'+i,label:p.lab+'. Tap to open.',x:A.panels[i].x,y:A.panels[i].y,w:A.panels[i].w,h:A.panels[i].h,on:()=>this.onPanel&&this.onPanel(i)}).filter(Boolean)},
  draw(ctx){const A=this.anch(),W=A.W,Ha=A.Ha,t=T.sec;
    Bake.draw(ctx,'sky13',0,0,W,A.sky+4,(g,w,h)=>paintSky(g,w,h,Object.assign(skyOpts(w,A.sky,A.P),{clouds:A.P?[[W*.5,A.sky*.24,130]]:[[W*.4,A.sky*.24,150],[W*.6,A.sky*.24,130]]})));drawBirds(ctx,W,A.sky*.7);
    drawWaves(ctx,W,A.sky-6,Ha+10,{lam:A.lam,rh:A.rh});
    const lx0=A.fx[0]-70*A.fs,lx1=A.fx[A.fx.length-1]+60*A.fs;drawLedge(ctx,lx0,lx1,A.fy,40,3);drawLedge(ctx,W-lx1,W-lx0,A.fy,40,7);
    [...this.dev,...this.asu].forEach(p=>drawPerson(ctx,p));
    this.ps.forEach((p,i)=>drawPanel(ctx,A.panels[i],p,t,this.hintI===i,A.P));
    const mid=A.panels[1];
    if(this.rip>0){const maxR=Math.min(W,Ha)*.62;if(RM)drawRipple(ctx,mid.x,mid.y,maxR*.7,30,this.rip);else for(let i=0;i<3;i++){const f=(t*.22+i/3)%1;drawRipple(ctx,mid.x,mid.y,40+f*maxR,28,this.rip*(1-f))}}
    if(this.fill>0){const R=Math.hypot(W,Ha)*this.fill;ctx.beginPath();ctx.arc(mid.x,mid.y,R,0,TAU);ctx.fillStyle=C.turmeric;ctx.fill();drawRipple(ctx,mid.x,mid.y,R,34,1)}
    if(this.cover>0)drawFoam(ctx,{W,Ha,lam:A.lam,mBase:Ha*.5},1,this.cover,t);
    drawBorder(ctx,W,Ha)}});return s}
function drawPanel(ctx,g,p,t,hint,P){const y=g.y-p.rise*24*MV(),x=g.x,w=g.w,h=g.h,r=26;const b=c=>{c.beginPath();c.roundRect?c.roundRect(x-w/2,y-h/2,w,h,r):c.rect(x-w/2,y-h/2,w,h)};
  const disc=Math.min(w,h)*(P?.27:.28),dy=y+(P?4:h*.02),lab=P?Math.min(42,h*.13):Math.max(22,Math.min(34,w*.08));
  if(p.k<1){shape(ctx,b,C.indigo,c=>{patLines(c,x-w/2,y-h/2,x+w/2,y+h/2,24,.8,C.peacock,5);patDots(c,x-w/2+20,y-h/2+20,x+w/2-20,y+h/2-20,48,3,C.cream)},OL+1);
    ctx.save();b(ctx);ctx.clip();ctx.lineWidth=3;ctx.strokeStyle=C.cream;ctx.strokeRect(x-w/2+14,y-h/2+14,w-28,h-28);ctx.restore();
    shape(ctx,c=>{c.beginPath();c.arc(x,dy,disc,0,TAU)},C.peacock,c=>{for(let k=0;k<4;k++){c.beginPath();for(let xx=x-disc;xx<=x+disc;xx+=disc/12)c[xx>x-disc?'lineTo':'moveTo'](xx,dy-disc*.5+k*disc*.34+Math.sin(xx/disc*7)*disc*.07);c.strokeStyle=C.cream;c.lineWidth=3;c.stroke()}},OL);
    text(ctx,p.lab,x,y-h/2+(P?lab*1.1:44),lab,C.cream,{outline:6});tag(ctx,'Tap to open',x,y+h/2-(P?lab*1.05:44),Math.max(20,lab*.8))}
  if(p.k>0){ctx.save();ctx.globalAlpha*=p.k;shape(ctx,b,C.cream,c=>{c.fillStyle=C.turmeric;c.fillRect(x-w/2,y-h/2,w,22);c.fillRect(x-w/2,y+h/2-22,w,22);patDots(c,x-w/2,y-h/2+11,x+w/2,y-h/2+11,20,3.2,C.verm);patDots(c,x-w/2,y+h/2-11,x+w/2,y+h/2-11,20,3.2,C.verm);
      patDots(c,x-w/2+20,y-h/2+40,x+w/2-20,y+h/2-40,40,2.4,C.turmeric)},OL+1);
    shape(ctx,c=>{c.beginPath();c.arc(x,dy,disc*1.25,0,TAU)},p.key==='moon'?C.indigo:C.peacock,c=>patDots(c,x-disc*1.3,dy-disc*1.3,x+disc*1.3,dy+disc*1.3,26,2.2,C.cream),OL);
    drawSymbol(ctx,p.key,x,dy,disc*1.25/100*.95);text(ctx,p.lab,x,y-h/2+(P?lab*1.1:46),lab,C.ink);ctx.restore()}
  if(p.sp>0)sparkle(ctx,x,dy,disc*1.6,p.sp,t);
  if(hint)drawHighlight(ctx,x,y,Math.max(w,h)*.56,t,1)}

/* ---------- Scene 1.4: hero reveal ---------- */
function heroGeo(){const W=L.W,Ha=L.Ha,P=W/Ha<.9;const yw=Ha*(P?.74:.8);const ds=P?Math.min(1.5,W/560,(Ha*.7)/700):Math.min(1.05,Ha/770);const feet=yw+170*ds;
  const fr=255*ds,fc={x:W/2,y:feet-455*ds};const k=P?1:Math.min(1,W/1500);
  const semi=P?[{dx:300,fy:Ha*.62,s:.6},{dx:385,fy:Ha*.7,s:.66}]:[{dx:330*k,fy:Ha*.6,s:.5},{dx:500*k,fy:Ha*.68,s:.58},{dx:660*k,fy:Ha*.76,s:.66}];
  return{W,Ha,P,yw,ds,feet,fr,fc,semi,lam:P?92:104}}
function heroScene(){const s=mk({id:'hero',settle:0,exp:0,people:[],dh:dhan({rise:1,kal:0,fill:0,glow:0,alpha:RM?0:1}),
  layout(){return heroGeo()},
  onLayout(A){this.people=[];A.semi.forEach((m,i)=>{this.people.push(person('deva',i,{x:A.W/2-m.dx,y:m.fy,s:m.s,f:1,pose:'respect',brow:.6}));this.people.push(person('asura',i,{x:A.W/2+m.dx,y:m.fy,s:m.s,f:-1,pose:'respect',brow:.6}))});
    Object.assign(this.dh,{x:A.W/2,s:A.ds})},
  draw(ctx){const A=this.anch(),W=A.W,Ha=A.Ha,t=T.sec;
    Bake.draw(ctx,'hsky',0,0,W,Ha,(g,w,h)=>{paintSky(g,w,h,{seed:21,sun:false});
      drawWaves(g,w,A.yw-A.lam*.42*Math.ceil((A.yw-Ha*.5)/(A.lam*.42)),A.yw+4,{lam:A.lam,speed:0});
      const cx0=A.fc.x,cy0=A.yw;for(let i=0;i<=12;i++){const a=Math.PI+i/12*Math.PI;g.save();g.translate(cx0,cy0);g.rotate(a+Math.PI/2);
        shape(g,c=>{c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-A.fr*.22,-A.fr*.8,0,-A.fr*1.45);c.quadraticCurveTo(A.fr*.22,-A.fr*.8,0,0);c.closePath()},i%2?C.verm:C.peacock,c=>{line(c,[[0,-20],[0,-A.fr*1.3]],i%2?C.turmeric:C.cream,3);patDots(c,-A.fr*.2,-A.fr*1.4,A.fr*.2,0,22,2.4,C.cream)},OL);g.restore()}
      drawFrameRing(g,A.fc.x,A.fc.y,A.fr+34,A.fr);g.beginPath();g.arc(A.fc.x,A.fc.y,A.fr,0,TAU);g.fillStyle=C.cream;g.fill();
      g.save();g.beginPath();g.arc(A.fc.x,A.fc.y,A.fr-4,0,TAU);g.clip();for(let j=1;j<4;j++){g.beginPath();g.arc(A.fc.x,A.fc.y,A.fr*(.3+j*.2),0,TAU);g.setLineDash([2,14]);g.strokeStyle=C.turmeric;g.lineWidth=4;g.stroke()}g.restore();ring(g,A.fc.x,A.fc.y,A.fr,C.ink,4)});
    this.people.forEach(p=>{shape(ctx,c=>{c.beginPath();c.ellipse(p.x,p.y+4,70*p.s+20,16,0,0,TAU)},C.leaf,c=>patLines(c,p.x-90,p.y-12,p.x+90,p.y+20,10,.6,C.ink,1.3),3)});
    this.people.slice().sort((a,b)=>a.y-b.y).forEach(p=>drawPerson(ctx,p));
    const d=this.dh;ctx.save();if(RM)ctx.globalAlpha*=d.alpha;const y0=A.feet+d.rise*620*A.ds*MV();d.y=y0;drawDhan(ctx,d);ctx.restore();
    drawWaves(ctx,W,A.yw,Ha+10,{lam:A.lam,row0:1});
    if(this.settle<1){const big=Math.hypot(W,Ha)*1.2;const e=this.settle;drawFrameRing(ctx,A.fc.x,A.fc.y,lerp(big,A.fr+34,e),lerp(0,A.fr,e))}
    if(this.exp>0){const kp=dhanKalashPos(d);const R=lerp(70*A.ds,Math.hypot(W,Ha)*1.1,this.exp);ctx.beginPath();ctx.arc(kp[0],kp[1],R,0,TAU);ctx.fillStyle=C.cream;ctx.fill();drawRipple(ctx,kp[0],kp[1],R,30,1)}
    drawBorder(ctx,W,Ha)}});return s}

/* ---------- Scene 1.5: the treasure of good health ---------- */
const CARE=['water','food','rest','learn','help'];
function healthGeo(){const W=L.W,Ha=L.Ha,P=W/Ha<1.1;let fc,fr,dx,feet,ds;
  if(!P){fr=Math.min(Ha*.33,W*.2);fc={x:W*.64,y:Ha*.48};feet=Ha-62;ds=Math.min(1,(Ha-130)/690);dx=W*.27}
  else{fr=Math.min(W*.31,Ha*.21);fc={x:W*.6,y:L.hudB+fr+70};feet=Ha-62;ds=Math.min(1.15,(Ha-(fc.y+fr+60)-62)/690,W/620);dx=W*.27}
  return{W,Ha,P,fc,fr,feet,ds,dx}}
function healthScene(){const s=mk({id:'health',open:1,vine:0,picks:[],pk:{},dh:dhan({pose:'gesture'}),
  layout(){return healthGeo()},onLayout(A){Object.assign(this.dh,{x:A.dx,y:A.feet,s:A.ds})},
  draw(ctx){const A=this.anch(),W=A.W,Ha=A.Ha,t=T.sec;
    Bake.draw(ctx,'cream',0,0,W,Ha,(g,w,h)=>{g.fillStyle=C.cream;g.fillRect(0,0,w,h);const r=rng(4);for(let i=0;i<w*h/5200;i++)dot(g,r()*w,r()*h,2,C.turmeric)});
    const fr=lerp(Math.hypot(W,Ha)*1.1,A.fr,this.open);drawFrameRing(ctx,A.fc.x,A.fc.y,fr+30,fr);
    ctx.save();ctx.globalAlpha*=clamp(this.open*1.4-.4,0,1);drawKalash(ctx,A.fc.x,A.fc.y+A.fr*.04,A.fr/300,{fill:1});
    CARE.forEach((k,i)=>{const a=-Math.PI/2+i/5*TAU,pr=A.fr*.64;const x=A.fc.x+Math.cos(a)*pr,y=A.fc.y+Math.sin(a)*pr;const on=this.picks.includes(k);const g=this.pk[k]||(this.pk[k]={k:0});
      const sc=A.fr/430*(1+g.k*.32);if(g.k>0){dot(ctx,x,y,A.fr*.27*(.8+g.k*.2),C.cream);drawHighlight(ctx,x,y,A.fr*.27*(.85+g.k*.2),t,g.k)}drawSymbol(ctx,k,x,y,sc)});ctx.restore();
    drawVine(ctx,A.fc.x,A.fc.y,A.fr+48,this.vine,this.picks.length,t);
    shape(ctx,c=>{c.beginPath();c.ellipse(A.dx,A.feet+2,120*A.ds,22*A.ds,0,0,TAU)},C.leaf,c=>patLines(c,A.dx-130,A.feet-20,A.dx+130,A.feet+30,10,.6,C.ink,1.3),OL);
    for(let i=0;i<5;i++){ctx.save();ctx.translate(A.dx,A.feet-6);ctx.rotate((i-2)*.42);shape(ctx,c=>{c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-18*A.ds,-30*A.ds,0,-58*A.ds);c.quadraticCurveTo(18*A.ds,-30*A.ds,0,0);c.closePath()},i%2?C.cream:C.verm,null,3);ctx.restore()}
    drawDhan(ctx,this.dh);drawBorder(ctx,W,Ha)}});return s}
/* the well-being vine: grows from the bottom around the frame; two big leaves fill as choices are made */
function drawVine(ctx,cx0,cy0,R,prog,count,t){const segs=60;
  [-1,1].forEach(sd=>{if(prog>0){const pts=[];const n=Math.max(2,Math.round(segs*prog));for(let i=0;i<=n;i++){const u=i/segs,a=Math.PI/2+sd*u*Math.PI,rr=R+Math.sin(u*30)*6;pts.push([cx0+Math.cos(a)*rr,cy0+Math.sin(a)*rr])}
      line(ctx,pts,C.ink,8);line(ctx,pts,C.leaf,4);
      for(let k=1;k<=14;k++){const u=k/15;if(u>prog)break;const a=Math.PI/2+sd*u*Math.PI,rr=R+Math.sin(u*30)*6;const x=cx0+Math.cos(a)*rr,y=cy0+Math.sin(a)*rr;const out=k%2?1:-1;
        if(k%3===0){for(let j=0;j<5;j++){const b=j/5*TAU;dot(ctx,x+Math.cos(b)*7,y+Math.sin(b)*7,4.4,C.verm)}dot(ctx,x,y,4,C.turmeric);ring(ctx,x,y,11,C.ink,1.6)}
        else leaf(ctx,x,y,30,9,a+out*.9+(sd<0?0:0),C.leaf,2.2)}}});
  [1,-1].forEach((sd,i)=>{const a=Math.PI/2+sd*.3,x=cx0+Math.cos(a)*(R+4),y=cy0+Math.sin(a)*(R+4);const on=count>i;
    leafPath(ctx,x,y,74,24,a+sd*.5);ctx.fillStyle=on?C.leaf:C.cream;ctx.fill();if(on){ctx.save();leafPath(ctx,x,y,74,24,a+sd*.5);ctx.clip();patDots(ctx,x-80,y-80,x+80,y+80,12,2.4,C.cream);ctx.restore()}
    leafPath(ctx,x,y,74,24,a+sd*.5);ctx.lineWidth=OL;ctx.strokeStyle=C.ink;ctx.stroke();if(!on){ctx.save();ctx.setLineDash([2,8]);leafPath(ctx,x,y,74,24,a+sd*.5);ctx.lineWidth=2;ctx.strokeStyle=C.leaf;ctx.stroke();ctx.restore()}
    const c=Math.cos(a+sd*.5),sn=Math.sin(a+sd*.5);line(ctx,[[x+c*8,y+sn*8],[x+c*62,y+sn*62]],C.ink,2.2)})}

/* ---------- Final screen ---------- */
function finalGeo(){const W=L.W,Ha=L.Ha,P=W/Ha<1.1;const fr=P?Math.min(W*.34,Ha*.26):Math.min(Ha*.27,W*.26);const fc={x:W/2,y:P?Math.max(Ha*.46,L.hudB+230+fr):Ha*.5};return{W,Ha,P,fr,fc}}
function finalScene(){const s=mk({id:'final',vine:0,dh:dhan({}),layout(){return finalGeo()},
  draw(ctx){const A=this.anch(),W=A.W,Ha=A.Ha,t=T.sec,fr=A.fr,fc=A.fc;
    Bake.draw(ctx,'cream',0,0,W,Ha,(g,w,h)=>{g.fillStyle=C.cream;g.fillRect(0,0,w,h);const r=rng(4);for(let i=0;i<w*h/5200;i++)dot(g,r()*w,r()*h,2,C.turmeric)});
    ctx.save();ctx.beginPath();ctx.arc(fc.x,fc.y,fr,0,TAU);ctx.clip();ctx.fillStyle=C.indigo;ctx.fillRect(fc.x-fr,fc.y-fr,fr*2,fr*2);patDots(ctx,fc.x-fr,fc.y-fr,fc.x+fr,fc.y+fr,36,2,C.cream);
    const ds=fr*1.5/680;dot(ctx,fc.x,fc.y-fr*.1,fr*.62,C.cream);ring(ctx,fc.x,fc.y-fr*.1,fr*.62,C.ink,4);Object.assign(this.dh,{x:fc.x,y:fc.y+fr*.86,s:ds});drawDhan(ctx,this.dh);
    drawWaves(ctx,W,fc.y+fr*.62,fc.y+fr+10,{lam:70});ctx.restore();drawFrameRing(ctx,fc.x,fc.y,fr+30,fr);
    drawVine(ctx,fc.x,fc.y,fr+52,this.vine,2,t);
    const ts=A.P?Math.min(86,W*.095):Math.min(84,Ha*.1);const tl=wrap(ctx,'The Ocean of Wonders',W*.8,ts,true);const ty=A.P?L.hudB+ts*.7:Math.max(BORDER+ts*.75,fc.y-fr-90-ts*.4);
    tl.forEach((ln,i)=>text(ctx,ln,W/2,ty+i*ts*1.12,ts,C.verm,{display:true,outline:0,weight:400}));
    const ms=A.P?Math.min(44,W*.05):Math.min(36,Ha*.045);const ml=wrap(ctx,'Health, knowledge, care and kindness are precious treasures.',W*(A.P?.82:.7),ms);const my=fc.y+fr+(A.P?130:96);
    ml.forEach((ln,i)=>text(ctx,ln,W/2,my+i*ms*1.25,ms,C.ink));
    drawBorder(ctx,W,Ha,{key:'final',motifs:true})}});return s}

/* ---------- Title card ---------- */
function titleScene(){return mk({id:'title',layout(){const W=L.W,Ha=L.Ha,P=W/Ha<1.1;return{W,Ha,P,pw:P?W*.84:Math.min(W*.7,1180),ph:P?Ha*.56:Math.min(Ha*.66,560)}},
  draw(ctx){const A=this.anch(),W=A.W,Ha=A.Ha,t=T.sec;
    Bake.draw(ctx,'tsky',0,0,W,Ha,(g,w,h)=>paintSky(g,w,h,{seed:31,sunX:W*.1,sunY:Ha*.26,moonX:W*.9,moonY:Ha*.26}));
    drawWaves(ctx,W,Ha*.7,Ha+10,{});
    const x0=W/2-A.pw/2,y0=Ha*.47-A.ph/2;shape(ctx,c=>{c.beginPath();c.roundRect?c.roundRect(x0,y0,A.pw,A.ph,28):c.rect(x0,y0,A.pw,A.ph)},C.cream,c=>{c.fillStyle=C.turmeric;c.fillRect(x0,y0,A.pw,26);c.fillRect(x0,y0+A.ph-26,A.pw,26);
      patDots(c,x0,y0+13,x0+A.pw,y0+13,22,3.4,C.verm);patDots(c,x0,y0+A.ph-13,x0+A.pw,y0+A.ph-13,22,3.4,C.verm)},OL+1);
    const ks=A.ph/560;drawKalash(ctx,W/2,y0+A.ph*.24,ks*1.1,{fill:1});
    const ts=A.P?Math.min(92,W*.1):Math.min(92,A.pw*.085);const tl=wrap(ctx,'The Ocean of Wonders',A.pw*.86,ts,true);const ty=y0+A.ph*(A.P?.5:.54);
    tl.forEach((ln,i)=>text(ctx,ln,W/2,ty+(i-(tl.length-1)/2)*ts*1.1,ts,C.verm,{display:true,weight:400}));
    const ss=A.P?Math.min(40,W*.045):Math.min(38,A.pw*.034);const sl=wrap(ctx,'Lord Dhanvantari and the Amrit Kalash',A.pw*.84,ss);const sy=ty+(tl.length-1)/2*ts*1.1+ts*.75;
    sl.forEach((ln,i)=>text(ctx,ln,W/2,sy+i*ss*1.2,ss,C.indigo));
    const ms=ks*.9;drawFish(ctx,x0+A.pw*.12,y0+A.ph*.24,ms,1,Math.sin(t*2)*.2*MV());drawLotus(ctx,x0+A.pw*.88,y0+A.ph*.27,ms,2);
    drawBorder(ctx,W,Ha)}})}

/* ================= SHOTS ================= */
async function shotTitle(){D.chip('');D.clearAct();if(!D.scene||D.scene.id!=='title')D.setScene(titleScene(),'fade',900);Music.setLevel(.5,2);await D.wait(3400)}

async function shot1_1(){D.chip('Scene 1.1 · A Treasure Hidden in the Cosmic Ocean');const s=oceanScene();s.setPose('hold',0);D.setScene(s,'fade',1100);await D.wait(900);
  await D.say('Long ago, the devas and asuras wished to find Amrita, the nectar of immortality. It lay hidden deep within the vast cosmic ocean.');
  await D.say('But how could they uncover a treasure hidden beneath such mighty waters?');
  await D.say('They needed to work together on a task greater than any one of them could do alone.');
  let found=0,resolve;const done=new Promise(r=>resolve=r);
  D.instr('Tap the three clues hidden in the ocean.','0 of 3 clues found');s.active=true;
  s.onClue=c=>{if(c.found)return;c.found=true;s.hintI=-1;found++;AU.sfx('sparkle');D.counter(`${found} of 3 clues found`);
    if(c.k==='fish'){c.wig=1;tw(c,{wig:0},1400,'lin')}else if(c.k==='lotus'){c.open=1;Timers.add(380,()=>{c.open=2})}else{c.sp=0;tw(c,{sp:1},500,'out').then(()=>tw(c,{sp:0},700))}
    if(found===3)resolve()};
  await D.activity({start:()=>done,hint(){s.hintI=s.clues.findIndex(c=>!c.found)},assist(){const c=s.clues.find(c=>!c.found);if(c)s.onClue(c)}});
  s.active=false;await D.wait(1200);D.clearAct();
  await D.late();
  /* Vasuki becomes more prominent, stretching across the ocean */
  AU.sfx('swish');tw(s,{clueA:0},1000);await D.tw(s,{vk:1},1500);s.mode='1.2'}

async function shot1_2(){D.chip('Scene 1.2 · Help Churn the Ocean');let s=D.scene;if(!s||s.id!=='ocean'){s=oceanScene();s.vk=1;s.clueA=0;D.setScene(s,'fade')}s.mode='1.2';s.setPose('hold',0);
  tw(s,{ui:1},700);
  await D.say('The devas and asuras decided to churn the cosmic ocean. They used Mount Mandara as the churning rod and Vasuki, the great serpent, as the rope.');
  await D.say('The devas held one side of the serpent, while the asuras held the other.');
  await D.say([['call','“Are you ready?”'],['nar','they called.']]);
  s.setPose('pull',.07);
  await D.say('Together, they began to pull.');
  let count=0,last=0,busy=false,resolve;const done=new Promise(r=>resolve=r);
  D.instr('Help churn the ocean!','0 of 3 pulls completed');
  const els=D.controls([{id:'pl',label:'← Pull left',aria:'Pull left',on:()=>pull(-1)},{id:'pr',label:'Pull right →',aria:'Pull right',on:()=>pull(1)}]);
  const clearPulse=()=>{s.hintSide=0;els.pl.classList.remove('pulse');els.pr.classList.remove('pulse')};
  const pull=async dir=>{if(busy||count>=3)return;busy=true;D.poke();clearPulse();AU.sfx('swish');const counts=dir!==last;
    tw(s,{rot:s.rot+dir*1.1,phase:s.phase+dir*70},900,'out');
    try{await D.tw(s,{pull:dir},420,'out');
      if(counts){last=dir;count++;tw(s.syms[count-1],{k:1},600,'back');AU.sfx('tap');D.counter(`${count} of 3 pulls completed`)}else D.hint('Try pulling from the other side too.',4500);
      await D.tw(s,{pull:0},560)}finally{busy=false}if(count>=3)resolve()};
  s.active=true;
  s.onDrag=dx=>{s.handleDx=clamp(dx,-150,150);if(!s.fired&&Math.abs(dx)>100){s.fired=true;pull(Math.sign(dx))}};
  s.onEnd=()=>{s.fired=false;tw(s,{handleDx:0},300,'out')};
  s.key=k=>{if(!s.active)return false;if(k==='ArrowLeft'){pull(-1);return true}if(k==='ArrowRight'){pull(1);return true}return false};
  await D.activity({start:()=>done,hint(){const side=last?-last:-1;s.hintSide=side;const b=side<0?els.pl:els.pr;b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse')},assist(){pull(last?-last:-1)}});
  s.active=false;s.key=null;await D.wait(700);D.clearAct();
  AU.sfx('chime');tw(s,{swirl:1},1600);tw(s,{ui:0},900);s.setPose('pull',.04);await D.tw(s,{foam:1},2200,'out');
  await D.say('Round and round the mountain turned. The ocean swirled, the waves grew higher, and patterns of foam danced across the water.');
  await D.late();
  /* the patterned foam expands across the screen */
  AU.sfx('swish');await D.tw(s,{cover:1},1700,'in')}

async function shot1_3(){D.chip('Scene 1.3 · Wonders Rise from the Water');const s=wondersScene();s.cover=1;D.setScene(s,'cut');
  await D.tw(s,{cover:0},1700,'out');
  await D.say('As the churning continued, wondrous treasures began to emerge from the depths. Everyone watched in amazement, wondering what the ocean would reveal next.');
  let n=0,resolve;const done=new Promise(r=>resolve=r);
  D.instr('Tap each panel to reveal the ocean’s wonders.','0 of 3 panels revealed');s.active=true;
  s.onPanel=i=>{const p=s.ps[i];if(p.open)return;p.open=true;s.hintI=-1;n++;AU.sfx('chime');D.counter(`${n} of 3 panels revealed`);
    tw(p,{rise:1},500,'out');tw(p,{k:1},900);Timers.add(500,()=>{tw(p,{sp:1},450,'out').then(()=>tw(p,{sp:0},800))});if(n===3)resolve()};
  await D.activity({start:()=>done,hint(){s.hintI=s.ps.findIndex(p=>!p.open)},assist(){const i=s.ps.findIndex(p=>!p.open);if(i>=0)s.onPanel(i)}});
  s.active=false;await D.wait(1400);D.clearAct();
  AU.sfx('sparkle');tw(s,{rip:1},1200);
  await D.say('The devas and asuras kept pulling. They were tired, but they did not give up. The great ocean continued to swirl until something extraordinary happened.');
  await D.late();
  /* the golden ripple expands until it fills the screen */
  await D.tw(s,{fill:1},1800,'in')}

async function shot1_4(){D.chip('Scene 1.4 · Lord Dhanvantari Appears');const s=heroScene();D.setScene(s,'cut');const d=s.dh;
  await D.tw(s,{settle:1},1900,'out');
  AU.sfx('swish');if(RM){d.rise=0;await D.tw(d,{alpha:1},900)}else await D.tw(d,{rise:0},2800,'out');
  AU.sfx('chime');await D.tw(d,{kal:1},900);
  await D.tw(d,{fill:1},2600,'lin');
  await D.say('A divine light appeared above the shining waters!');
  await D.say('From the cosmic ocean emerged Lord Dhanvantari, the divine physician. He appeared holding a beautiful pot associated with Amrita, the nectar of immortality.');
  await D.say('The devas looked upon him with wonder. The precious pot was a reminder of the extraordinary gifts that had emerged from the ocean.');
  await D.say('Lord Dhanvantari is honoured as the divine healer, and Dhanteras is associated with prayers and wishes for good health and well-being.');
  await question(s);
  await D.late();
  /* the circle of the Amrit Kalash expands into the next frame */
  AU.sfx('swish');await D.tw(s,{exp:1},1600,'in')}
async function question(s){const Q='What precious gift does Dhanvantari remind us to care for?';const tok=D.token;
  D.instr(Q,'');let sel=null,checked=false,resolve;const done=new Promise(r=>resolve=r);
  const cards=['health','crown','toys'].map(k=>({key:k,label:LABEL[k]}));
  const check=()=>{if(!sel)return;checked=true;Store.set('answer',sel);els.cont.hidden=false;
    if(sel==='health'){AU.sfx('chime');tw(s.dh,{glow:1},1400);D.hint('Yes! Good health is a precious gift.',9000)}
    else{AU.sfx('soft');D.hint('Think about what helps our bodies feel well.',8000)}};
  const els=D.controls([{id:'chk',label:'Check answer',disabled:true,on:check},{id:'cont',label:'Continue',cls:'alt',on:()=>resolve()}]);els.cont.hidden=true;
  const btns=await tray(cards,{on:(k,b)=>{sel=k;btns.forEach(x=>x.setAttribute('aria-pressed',String(x===b)));els.chk.disabled=false}});
  D.say([['nar',Q]],{silentCap:true}).catch(()=>{});
  await D.activity({start:()=>done,
    hint(){const b=btns[0];b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse');D.hint('Think about what helps our bodies feel well.',6000)},
    assist(){if(!checked){btns[0].click();check()}else resolve()}});
  D.guard(tok);Speech.stop();D.clearAct();await closeTray()}

async function shot1_5(){D.chip('Scene 1.5 · The Treasure of Good Health');const s=healthScene();s.open=0;D.setScene(s,'cut');
  await D.tw(s,{open:1},1500,'out');
  await D.say('But what does this ancient story mean for us today?');
  await D.say('The greatest treasures in life are not always gold, jewels or things we can buy. Good health, knowledge, kindness and the care we share with others are precious gifts too.');
  await D.say('We can care for our health by eating nourishing food, drinking water, getting enough rest and asking trusted adults for help when we feel unwell. We can also care for others through kindness, patience and helping hands.');
  const tok=D.token;let picks=[],resolve;const done=new Promise(r=>resolve=r);
  D.instr('Choose two ways to care for yourself.','0 of 2 choices selected');
  const els=D.controls([{id:'cont',label:'Continue',disabled:true,on:()=>{if(picks.length===2)resolve()}}]);
  let btns=[];const refresh=()=>{btns.forEach(b=>b.setAttribute('aria-pressed',String(picks.includes(b.dataset.key))));s.picks=picks.slice();
    CARE.forEach(k=>{const g=s.pk[k]||(s.pk[k]={k:0});tw(g,{k:picks.includes(k)?1:0},400,'out')});
    D.counter(`${picks.length} of 2 choices selected`);els.cont.disabled=picks.length<2;Store.set('picks',picks.slice());
    if(picks.length===2&&!s.grown){s.grown=true;AU.sfx('chime');tw(s,{vine:1},RM?300:2400,'io')}};
  const toggle=k=>{if(picks.includes(k))picks=picks.filter(p=>p!==k);else{picks.push(k);if(picks.length>2)picks.shift();AU.sfx('tap')}refresh()};
  btns=await tray(CARE.map(k=>({key:k,label:LABEL[k]})),{on:k=>toggle(k)});
  await D.activity({start:()=>done,
    hint(){btns.filter(b=>!picks.includes(b.dataset.key)).forEach(b=>{b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse')})},
    assist(){if(picks.length<2){const k=['water','rest','food','help','learn'].find(k=>!picks.includes(k));toggle(k)}else resolve()}});
  D.guard(tok);D.clearAct();await closeTray();if(!s.grown){s.grown=true;tw(s,{vine:1},1500)}
  await D.say('And so, the story of the cosmic ocean reminds us that great things can be achieved through cooperation and perseverance—and that good health is one of life’s most precious treasures.');
  await D.say('This Dhanteras, as we welcome prosperity and remember Lord Dhanvantari, let us also be grateful for the gifts that help us live well.');
  await D.say('May we be blessed with good health, wisdom, happiness and kindness.');await D.late()}

async function shotFinal(){D.chip('');const s=finalScene();D.setScene(s,'fade',1200);tw(s,{vine:1},RM?300:3200);await D.wait(1400);
  const p=Store.data.picks;const cap=p.length===2?`You chose: ${LABEL[p[0]]} and ${LABEL[p[1]]}`:'';
  Music.resolve();D.instr(cap,'');await D.wait(D.fast?20:3600);
  const els=D.controls([{id:'again',label:'Read Again',on:()=>readAgain()},{id:'fin',label:'Finish Story',cls:'alt',on:()=>finish()}]);try{els.again.focus({preventScroll:true})}catch(e){}}
function finish(){D.token++;Speech.stop();Music.setLevel(0,1.5);D.hideCap();D.instr('Thank you for reading The Ocean of Wonders.','');
  const els=D.controls([{id:'again',label:'Read Again',on:()=>readAgain()}]);try{els.again.focus({preventScroll:true})}catch(e){}}
function readAgain(){Store.set('plays',(Store.data.plays||0)+1);Music.setLevel(.5,2);play(0)}
