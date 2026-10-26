/* ===== Characters: parameterised drawing + pose state machines ===== */
function drawFace(ctx,f){const lx=f.lookX||0,ly=f.lookY||0,ox=lx*f.sh,oy=ly*f.sh*.5,ln=f.line||C.charcoal,sc=f.sc||1;
  const ex=f.ex*sc,ey=f.ey,ew=f.ew*sc,eh=f.eh*sc;const eyes=f.blink?'closed':f.eyes||'open';
  for(const sd of[-1,1]){const x=sd*ex+ox,y=ey+oy;
    if(eyes==='happy'||eyes==='closed'||(eyes==='wink'&&sd>0)){ctx.beginPath();if(eyes==='closed'||eyes==='wink'){ctx.moveTo(x-ew*.5,y);ctx.quadraticCurveTo(x,y+eh*.35,x+ew*.5,y)}else{ctx.moveTo(x-ew*.5,y+eh*.15);ctx.quadraticCurveTo(x,y-eh*.55,x+ew*.5,y+eh*.15)}
      ctx.strokeStyle=ln;ctx.lineWidth=3*sc;ctx.lineCap='round';ctx.stroke();continue}
    const k=eyes==='wide'?1.18:1;ctx.beginPath();ctx.ellipse(x,y,ew*.5*k,eh*.5*k,0,0,TAU);ctx.fillStyle=C.ivory;ctx.fill();ctx.lineWidth=2.4*sc;ctx.strokeStyle=ln;ctx.stroke();
    const pr=Math.min(ew,eh)*(f.pupil||.36);dot(ctx,x+lx*ew*.2,y+ly*eh*.18,pr,C.charcoal);dot(ctx,x+lx*ew*.2-pr*.35,y+ly*eh*.18-pr*.4,pr*.3,C.ivory);
    if(f.lids){ctx.beginPath();ctx.ellipse(x,y,ew*.52,eh*.52,0,Math.PI*1.08,Math.PI*1.92);ctx.strokeStyle=ln;ctx.lineWidth=3*sc;ctx.stroke()}}
  const by=ey-eh*.95+oy,bw=ew*.62,bt=f.brow||'n',bth=(f.browW||3)*sc;
  for(const sd of[-1,1]){const x=sd*ex+ox;let a=[x-bw,by],b=[x+bw,by];
    if(bt==='up'){a[1]-=eh*.35;b[1]-=eh*.35}
    if(bt==='worry'){if(sd<0)b[1]-=eh*.32;else a[1]-=eh*.32}
    if(bt==='det'){if(sd<0)b[1]+=eh*.22;else a[1]+=eh*.22}
    if(bt==='soft'){a[1]+=eh*.08;b[1]+=eh*.08}
    strokeL(ctx,[a,[x,(a[1]+b[1])/2-(bt==='up'?eh*.12:eh*.05)],b],ln,bth)}
  if(f.cheek)for(const sd of[-1,1])dot(ctx,sd*(ex+ew*.45)+ox,ey+eh*.95+oy,ew*.28,ca(C.verm,.45));
  const mx=ox*.8,my=f.my+oy,mw=f.mw*sc;const m=f.mouth||'smile';ctx.lineCap='round';ctx.strokeStyle=ln;ctx.lineWidth=2.8*sc;ctx.beginPath();
  if(m==='smile'){ctx.moveTo(mx-mw*.5,my);ctx.quadraticCurveTo(mx,my+mw*.42,mx+mw*.5,my);ctx.stroke()}
  else if(m==='big'||m==='talk'){const hh=m==='big'?mw*.5:mw*.32;ctx.moveTo(mx-mw*.5,my-1);ctx.quadraticCurveTo(mx,my+hh*1.4,mx+mw*.5,my-1);ctx.closePath();ctx.fillStyle=C.verm;ctx.fill();ctx.stroke()}
  else if(m==='o'||m==='O'){const r=m==='O'?mw*.3:mw*.2;ctx.ellipse(mx,my+r*.4,r*.8,r,0,0,TAU);ctx.fillStyle=C.charcoal;ctx.fill()}
  else if(m==='flat'||m==='firm'){ctx.moveTo(mx-mw*(m==='firm'?.32:.4),my+2);ctx.lineTo(mx+mw*(m==='firm'?.32:.4),my+2);ctx.stroke()}
  else if(m==='worry'){ctx.moveTo(mx-mw*.42,my+mw*.16);ctx.quadraticCurveTo(mx,my-mw*.14,mx+mw*.42,my+mw*.16);ctx.stroke()}
  else if(m==='tongue'){ctx.moveTo(mx-mw*.5,my);ctx.quadraticCurveTo(mx,my+mw*.4,mx+mw*.5,my);ctx.stroke();ctx.beginPath();ctx.ellipse(mx+mw*.12,my+mw*.26,mw*.16,mw*.2,0,0,TAU);ctx.fillStyle=C.verm;ctx.fill();ctx.lineWidth=2*sc;ctx.stroke()}
  else if(m==='soft'){ctx.moveTo(mx-mw*.36,my+1);ctx.quadraticCurveTo(mx,my+mw*.2,mx+mw*.36,my+1);ctx.stroke()}}

/* two-segment limb; a1 measured from straight down, + toward facing side */
function limbS(ctx,sx,sy,a1,a2,l1,l2,w,col,slvCol,slvLen,hand,cuff){ctx.save();ctx.translate(sx,sy);ctx.rotate(-a1);
  R.rect(ctx,-w/2,-2,w,l1+4,col,{sw:2.6});if(slvCol)R.rect(ctx,-w/2-2,-5,w+4,slvLen,slvCol,{sw:2.6});
  ctx.translate(0,l1);ctx.rotate(-a2);R.rect(ctx,-w*.45,-2,w*.9,l2+2,col,{sw:2.6});if(cuff)for(let i=0;i<2;i++)R.rect(ctx,-w*.6,l2-12-i*7,w*1.2,4.5,cuff,{sw:1.4});
  R.circ(ctx,0,l2+4,w*1.15,hand||col,{sw:2.4});ctx.restore()}
function limbEnd(sx,sy,a1,a2,l1,l2){const ex=sx+Math.sin(a1)*l1,ey=sy+Math.cos(a1)*l1,t=a1+a2;return[ex+Math.sin(t)*(l2+4),ey+Math.cos(t)*(l2+4)]}

const POSES={
 chiku:{idle:{aB:-.12,bB:.15,aF:.12,bF:-.15,tilt:0,lean:0,lookX:0,lookY:0,brow:'n',mouth:'smile',eyes:'open'},
  listen:{aB:.35,bB:.9,aF:-.35,bF:-.9,tilt:.08,lookX:.3,lookY:0,brow:'n',mouth:'soft',eyes:'open'},
  lookup:{aB:-.22,bB:.2,aF:.22,bF:-.2,tilt:-.1,lookY:-1,lookX:.2,brow:'up',mouth:'o',eyes:'wide'},
  walk:{aB:0,bB:.2,aF:0,bF:-.2,tilt:0,brow:'n',mouth:'smile',eyes:'open'},
  reach:{aB:-.1,bB:.2,aF:1.25,bF:.15,tilt:.05,lookX:.6,brow:'n',mouth:'soft',eyes:'open',lean:.06},
  carry:{aB:-.15,bB:.2,aF:.25,bF:.3,tilt:0,brow:'n',mouth:'smile',eyes:'open'},
  surprise:{aB:-.9,bB:-.5,aF:.9,bF:.5,tilt:-.06,lean:-.07,brow:'up',mouth:'O',eyes:'wide'},
  worry:{aB:.25,bB:1.5,aF:-.25,bF:-1.5,tilt:.06,lookY:.2,brow:'worry',mouth:'worry',eyes:'open'},
  think:{aB:-.5,bB:1.7,aF:.15,bF:2.45,tilt:.1,lookX:.5,lookY:-.6,brow:'n',mouth:'flat',eyes:'open'},
  protect:{aB:.9,bB:.5,aF:.6,bF:.9,tilt:.04,lookX:.4,lookY:.5,brow:'det',mouth:'firm',eyes:'open',lean:.08},
  determined:{aB:-.3,bB:.4,aF:.3,bF:-.4,tilt:0,brow:'det',mouth:'firm',eyes:'open'},
  smile:{aB:-.35,bB:.2,aF:.35,bF:-.2,tilt:.05,brow:'n',mouth:'big',eyes:'happy'},
  nod:{aB:-.12,bB:.15,aF:.12,bF:-.15,tilt:.12,lookY:.4,brow:'n',mouth:'smile',eyes:'open'}},
 kesar:{idle:{aB:-.1,bB:.15,aF:.1,bF:-.15,tilt:0,lean:0,lookX:0,lookY:0,brow:'n',mouth:'soft',eyes:'open'},
  listen:{aB:.3,bB:1,aF:-.3,bF:-1,tilt:.07,lookX:-.3,brow:'n',mouth:'soft',eyes:'open'},
  think:{aB:-.5,bB:1.7,aF:.12,bF:2.55,tilt:.08,lookX:-.4,lookY:-.5,brow:'n',mouth:'flat',eyes:'open'},
  hold:{aB:.6,bB:.8,aF:.2,bF:1.2,tilt:.05,lookX:.4,lookY:.4,brow:'n',mouth:'soft',eyes:'open'},
  explain:{aB:-.1,bB:.15,aF:.9,bF:.5,tilt:-.04,lookX:-.2,brow:'n',mouth:'soft',eyes:'open'},
  welcome:{aB:-.7,bB:-.3,aF:.7,bF:.3,tilt:.05,lookX:.3,brow:'n',mouth:'smile',eyes:'open'},
  smile:{aB:-.1,bB:.15,aF:.1,bF:-.15,tilt:.06,brow:'n',mouth:'smile',eyes:'happy'},
  walk:{aB:0,bB:.2,aF:0,bF:-.2,tilt:0,brow:'n',mouth:'soft',eyes:'open'}},
 yama:{stand:{aB:-.3,bB:.3,aF:.12,bF:.1,tilt:0,lean:0,lookX:0,lookY:0,soft:0,surp:0,drop:0},
  walk:{aB:-.3,bB:.3,aF:.12,bF:.1,tilt:0},
  speak:{aB:-.3,bB:.3,aF:.8,bF:.5,tilt:-.03},
  listen:{aB:-.3,bB:.3,aF:-.3,bF:-1.2,tilt:.06},
  relax:{aB:-.25,bB:.25,aF:.05,bF:.05,tilt:.08,drop:8},
  bow:{aB:-.3,bB:.3,aF:-.2,bF:-1.6,tilt:.25,lean:.32,lookY:.6}},
 bijli:{idle:{head:0,htilt:0,earL:0,earR:0,tail:0,legF:0,legB:0,lookX:0,lookY:0,mouth:'smile',eyes:'open',brow:'n'},
  surprise:{head:-.08,earL:-.2,earR:-.2,mouth:'O',eyes:'wide',brow:'up'},
  worry:{head:.18,earL:.55,earR:.5,tail:.3,mouth:'worry',eyes:'open',brow:'worry'},
  smile:{head:-.05,earL:-.1,earR:-.1,mouth:'big',eyes:'happy',brow:'n'},
  tilt:{htilt:.32,head:0,mouth:'smile',eyes:'open'},
  point:{head:-.15,legF:-.75,mouth:'smile',eyes:'open',lookX:.8},
  lean:{head:.25,htilt:.12,mouth:'smile',eyes:'open'},
  impatient:{head:-.1,htilt:-.1,earL:-.25,earR:-.1,mouth:'flat',eyes:'open',brow:'det'},
  determined:{head:-.06,earL:-.3,earR:-.3,mouth:'firm',eyes:'open',brow:'det'}},
 merchant:{idle:{aB:-.1,bB:.2,aF:.1,bF:-.2,tilt:0,lean:0,lookX:0,lookY:0,brow:'det',mouth:'flat',eyes:'open'},
  refuse:{aB:-.1,bB:.2,aF:-.4,bF:-1.3,tilt:-.08,brow:'det',mouth:'firm',eyes:'open'},
  puzzled:{aB:-.5,bB:1.7,aF:.15,bF:2.45,tilt:.12,brow:'up',mouth:'o',eyes:'open',lookY:-.5},
  smile:{aB:-.1,bB:.2,aF:.9,bF:.5,tilt:.05,brow:'n',mouth:'big',eyes:'happy'},
  give:{aB:-.1,bB:.2,aF:1.1,bF:.3,tilt:.05,brow:'n',mouth:'smile',eyes:'open'}}};

class Actor{constructor(kind,x,y,s,f,pose){this.kind=kind;this.x=x;this.y=y;this.s=s||1;this.f=f||1;this.sx=1;this.sy=1;this.alpha=1;this.rot=0;
  this.p=Object.assign({},POSES[kind][Object.keys(POSES[kind])[0]]);this.tp=Object.assign({},this.p);this.pose='';this.walking=false;this.wph=0;
  this.blinkAt=T.sec+2+Math.random()*3;this.blink=false;this.talking=false;this.vis=true;this.bob=0;this.extra={};this.set(pose||Object.keys(POSES[kind])[0])}
  set(pose,extra){const P=POSES[this.kind];const base=P[pose]||{};this.pose=pose;
    const d=P[Object.keys(P)[0]];for(const k in d){const v=k in base?base[k]:d[k];if(typeof v==='number')this.tp[k]=v;else this.p[k]=this.tp[k]=v}
    if(extra)for(const k in extra){if(typeof extra[k]==='number')this.tp[k]=extra[k];else this.p[k]=this.tp[k]=extra[k]}return this}
  update(dt){const k=1-Math.pow(.0009,dt);for(const key in this.tp){const v=this.tp[key];if(typeof v==='number')this.p[key]=lerp(this.p[key]??v,v,k)}
    if(this.walking)this.wph+=dt*9;else this.wph=lerp(this.wph,Math.round(this.wph/Math.PI)*Math.PI,k);
    if(T.sec>this.blinkAt){this.blink=true;if(T.sec>this.blinkAt+.13){this.blink=false;this.blinkAt=T.sec+2.5+Math.random()*3}}}
  mouth(){const m=this.p.mouth;if(!this.talking)return m;return(Math.floor(T.sec*7.5)%2)?'talk':(m==='O'||m==='o'?m:'smile')}
  draw(ctx){if(!this.vis||this.alpha<=0.01)return;ctx.save();ctx.globalAlpha*=this.alpha;ctx.translate(this.x,this.y);if(this.rot)ctx.rotate(this.rot);
    ctx.scale(this.s*this.f*this.sx,this.s*this.sy);DRAW[this.kind](ctx,this);ctx.restore()}
  /* face position in world space, used for layout checks */
  head(){const h={chiku:258,kesar:300,yama:385,bijli:130,merchant:250}[this.kind]||250;return[this.x,this.y-h*this.s]}}

const DRAW={
 chiku(ctx,a){const p=a.p,sw=Math.sin(a.wph),walk=a.walking||Math.abs(sw)>.05;const breathe=Math.sin(T.sec*2.2)*1.2;
  ctx.save();ctx.translate(0,-a.bob);const seat=a.extra.seated;if(seat)ctx.translate(0,80);
  /* legs */
  if(!seat)for(const sd of[-1,1]){ctx.save();ctx.translate(sd*13,-70);ctx.rotate(walk?sd*sw*.35:0);R.rect(ctx,-7,0,14,64,C.terra,{sw:2.6});R.ell(ctx,6,66,26,11,C.terra,{sw:2.2});ctx.restore()}
  ctx.save();ctx.translate(0,-100);ctx.rotate(p.lean||0);ctx.translate(0,100+breathe*.3);
  const sB=walk?-sw*.4:0,sF=walk?sw*.4:0;
  limbS(ctx,-31,-204,p.aB+sB,p.bB,44,40,14,C.terra,C.mustard,20);
  if(seat){R.ell(ctx,0,-112,170,66,C.indigo,{sw:3});R.ell(ctx,-62,-96,26,12,C.terra,{sw:2});R.ell(ctx,62,-96,26,12,C.terra,{sw:2});for(let i=0;i<6;i++)dot(ctx,-45+i*18,-104,2.6,C.mustard)}
  else{R.poly(ctx,[[-30,-152],[30,-152],[52,-62],[-52,-62]],C.indigo,{sw:3});
  R.poly(ctx,[[-52,-62],[52,-62],[48,-78],[-48,-78]],C.mustard,{sw:2.4});for(let i=0;i<7;i++)dot(ctx,-39+i*13,-70,2.6,C.verm);
  for(let i=0;i<3;i++)dot(ctx,-14+i*14,-118,3,C.ivory)}
  R.poly(ctx,[[-30,-214],[30,-214],[35,-150],[-35,-150]],C.mustard,{sw:3});
  R.poly(ctx,[[-35,-150],[35,-150],[34,-162],[-34,-162]],C.terra,{sw:2});
  R.poly(ctx,[[-12,-214],[12,-214],[0,-196]],C.terra,{sw:2});
  R.poly(ctx,[[-30,-206],[-20,-214],[36,-160],[24,-152]],C.verm,{sw:2.4});R.poly(ctx,[[26,-158],[38,-160],[42,-128],[32,-130]],C.verm,{sw:2.2});
  limbS(ctx,31,-204,p.aF+sF,p.bF,44,40,14,C.terra,C.mustard,20);
  if(a.extra.basket){const bt=a.extra.basketTilt||0;ctx.save();ctx.translate(66,-122);ctx.rotate(bt);drawBasket(ctx,a.extra.basketLamps??3,bt);ctx.restore()}
  if(a.extra.hold)a.extra.hold(ctx);
  /* head */
  ctx.save();ctx.translate(0,-222);ctx.rotate(p.tilt||0);ctx.translate(0,222);
  R.rect(ctx,-8,-228,16,18,C.terra,{sw:2.2});
  for(const sd of[-1,1]){for(let i=0;i<3;i++)R.ell(ctx,sd*(36+i*1.5),-250+i*15,15,17,C.charcoal,{sw:2});
    ctx.save();ctx.translate(sd*39,-205);poly(ctx,[[0,0],[-11,-8],[-11,8]],C.verm);poly(ctx,[[0,0],[11,-8],[11,8]],C.verm);dot(ctx,0,0,3.5,C.verm);ctx.restore()}
  R.circ(ctx,0,-258,78,C.terra,{sw:3});
  R.path(ctx,'M-40 -256 C -42 -306 42 -306 40 -256 C 34 -278 14 -286 1 -276 C -12 -286 -34 -278 -40 -256 Z',C.charcoal,{sw:2});
  drawFace(ctx,{ex:15,ey:-254,ew:18,eh:16,sh:7,lookX:p.lookX,lookY:p.lookY,brow:p.brow,mouth:a.mouth(),eyes:p.eyes,blink:a.blink,my:-232,mw:18,cheek:true,pupil:.4});
  ctx.restore();ctx.restore();ctx.restore()},
 kesar(ctx,a){const p=a.p,sw=Math.sin(a.wph),walk=a.walking;const breathe=Math.sin(T.sec*1.8)*1;
  const seat=a.extra.seated;ctx.save();if(seat)ctx.translate(0,122);ctx.translate(0,-100);ctx.rotate(p.lean||0);ctx.translate(0,100+breathe*.3);
  ctx.save();ctx.translate(0,-262);ctx.rotate(p.tilt||0);ctx.translate(0,262);for(let i=0;i<7;i++)R.ell(ctx,-26-i*1.2,-292+i*20,17,22,C.charcoal,{sw:2});dot(ctx,-34,-150,7,C.mustard);ctx.restore();
  limbS(ctx,-31,-246,p.aB+(walk?-sw*.3:0),p.bB,50,46,14,C.terra,C.mustard,22,C.terra,C.gold);
  if(seat){R.ell(ctx,0,-160,200,80,C.verm,{sw:3});R.ell(ctx,0,-136,190,30,C.mustard,{sw:2.4});for(let i=0;i<7;i++)motifStarDot(ctx,-60+i*20,-168,4)}
  else{R.ell(ctx,-12,-4,30,12,C.terra,{sw:2});R.ell(ctx,14,-4,30,12,C.terra,{sw:2});
  R.poly(ctx,[[-34,-192],[34,-192],[72,-8],[-72,-8]],C.verm,{sw:3});
  R.poly(ctx,[[-72,-8],[72,-8],[67,-36],[-67,-36]],C.mustard,{sw:2.4});zigzag(ctx,-64,-32,128,18,C.verm,9);
  R.poly(ctx,[[-50,-110],[50,-110],[49,-118],[-49,-118]],C.mustard,{sw:1.8});
  for(let r=0;r<2;r++)for(let i=0;i<5;i++)motifStarDot(ctx,-36+i*18+r*9,-150+r*60+(i%2)*6,4)}
  R.poly(ctx,[[-30,-254],[30,-254],[34,-190],[-34,-190]],C.mustard,{sw:3});
  R.poly(ctx,[[-34,-190],[34,-190],[33,-200],[-33,-200]],C.verm,{sw:2});
  R.poly(ctx,[[-30,-250],[-18,-256],[36,-196],[24,-188]],C.verm,{sw:2.4});
  for(let i=0;i<6;i++)dot(ctx,-20+i*9.5,-243+i*9.4,2.2,C.gold);
  limbS(ctx,31,-246,p.aF+(walk?sw*.3:0),p.bF,50,46,14,C.terra,C.mustard,22,C.terra,C.gold);
  if(a.extra.hold)a.extra.hold(ctx);
  ctx.save();ctx.translate(0,-262);ctx.rotate(p.tilt||0);ctx.translate(0,262);
  R.rect(ctx,-8,-272,16,20,C.terra,{sw:2.2});for(let i=0;i<7;i++)dot(ctx,-12+i*4,-256+Math.sin(i/6*Math.PI)*6,2.6,C.gold);
  R.circ(ctx,-32,-312,30,C.charcoal,{sw:2});dot(ctx,-32,-312,4,C.gold);
  R.circ(ctx,0,-300,74,C.terra,{sw:3});
  R.path(ctx,'M-38 -296 C -40 -346 40 -346 38 -296 C 30 -320 12 -326 1 -318 C -10 -326 -30 -320 -38 -296 Z',C.charcoal,{sw:2});
  R.poly(ctx,[[-24,-330],[-17,-348],[-8,-336],[0,-356],[8,-336],[17,-348],[24,-330]],C.gold,{sw:2.2});dot(ctx,0,-338,4,C.verm);
  for(const sd of[-1,1]){ring(ctx,sd*37,-280,5,C.gold,3)}
  dot(ctx,0,-316,3.2,C.verm);
  drawFace(ctx,{ex:14,ey:-298,ew:17,eh:13,sh:6,lookX:p.lookX,lookY:p.lookY,brow:p.brow,mouth:a.mouth(),eyes:p.eyes,blink:a.blink,my:-276,mw:16,lids:true,cheek:true,pupil:.42});
  ctx.restore();ctx.restore()},
 yama(ctx,a){const p=a.p,sw=Math.sin(a.wph),walk=a.walking,dr=p.drop||0,O={sw:3,stroke:C.charcoal};
  const seat=a.extra.seated;ctx.save();if(seat)ctx.translate(0,135);ctx.translate(0,-200);ctx.rotate(p.lean||0);ctx.translate(0,200);
  if(a.extra.staff!==false&&!seat){const[hx,hy]=limbEnd(-52,-328+dr,p.aB,p.bB,62,56);R.rect(ctx,hx-5,hy-300,10,330,C.brown,{sw:2.4,stroke:C.charcoal});
    R.circ(ctx,hx,hy-312,40,C.mustard,{sw:2.6,stroke:C.charcoal});for(let i=0;i<8;i++){const an=i/8*TAU;dot(ctx,hx+Math.cos(an)*26,hy-312+Math.sin(an)*26,4,C.mustard)}dot(ctx,hx,hy-312,7,C.verm)}
  ctx.save();ctx.translate(0,-372);ctx.rotate(p.tilt||0);ctx.translate(0,372);R.poly(ctx,[[-46,-404],[46,-404],[52,-350],[-52,-350]],C.charcoal,O);ctx.restore();
  limbS(ctx,-52,-328+dr,p.aB+(walk?-sw*.2:0),p.bB,62,56,20,C.brown,C.indigo,30,C.brown,C.mustard);
  if(seat){R.ell(ctx,0,-180,250,92,C.indigo,O);R.ell(ctx,0,-152,240,30,C.verm,O);zigzag(ctx,-90,-160,180,14,C.mustard,10);R.poly(ctx,[[-58,-330+dr],[58,-330+dr],[66,-190],[-66,-190]],C.indigo,O);
    R.poly(ctx,[[-16,-300],[16,-300],[18,-190],[-18,-190]],C.verm,O)}
  else{for(const sd of[-1,1]){ctx.save();ctx.translate(sd*24,-40);ctx.rotate(walk?sd*sw*.2:0);R.ell(ctx,sd*4,38,40,14,C.brown,O);ctx.restore()}
  R.poly(ctx,[[-58,-330+dr],[58,-330+dr],[90,-10],[-90,-10]],C.indigo,O);
  R.poly(ctx,[[-16,-300],[16,-300],[22,-10],[-22,-10]],C.verm,O);diamonds(ctx,-10,-260,20,230,C.mustard,1);
  for(let i=0;i<6;i++)poly(ctx,[[-12,-270+i*42],[0,-256+i*42],[12,-270+i*42]],C.mustard);
  R.poly(ctx,[[-90,-10],[90,-10],[86,-42],[-86,-42]],C.verm,O);zigzag(ctx,-82,-38,164,22,C.mustard,10)}
  R.poly(ctx,[[-62,-196],[62,-196],[60,-174],[-60,-174]],C.verm,O);dotRow(ctx,-52,-185,104,13,3,C.gold);
  R.path(ctx,`M-62 ${-328+dr} Q 0 ${-268+dr} 62 ${-328+dr} L 50 ${-344+dr} Q 0 ${-300+dr} -50 ${-344+dr} Z`,C.mustard,O);
  for(let i=0;i<7;i++)dot(ctx,-42+i*14,-322+Math.sin(i/6*Math.PI)*16+dr,3.4,C.verm);
  limbS(ctx,52,-328+dr,p.aF+(walk?sw*.2:0),p.bF,62,56,20,C.brown,C.indigo,30,C.brown,C.mustard);
  ctx.save();ctx.translate(0,-350);ctx.rotate(p.tilt||0);ctx.translate(0,350);
  R.rect(ctx,-12,-356,24,24,C.brown,O);
  R.circ(ctx,0,-386,88,C.brown,O);
  R.path(ctx,'M-44 -386 C -46 -420 46 -420 44 -386 C 30 -404 -30 -404 -44 -386 Z',C.charcoal,O);
  R.poly(ctx,[[-40,-404],[40,-404],[36,-424],[-36,-424]],C.mustard,O);
  R.poly(ctx,[[-34,-424],[-26,-462],[-12,-436],[0,-482],[12,-436],[26,-462],[34,-424]],C.gold,O);
  dot(ctx,0,-446,6,C.verm);dot(ctx,-22,-432,4,C.verm);dot(ctx,22,-432,4,C.verm);dotRow(ctx,-32,-414,64,10,2.4,C.verm);
  for(const sd of[-1,1]){ring(ctx,sd*45,-366,8,C.gold,3.4)}
  const soft=p.soft||0,surp=p.surp||0;
  drawFace(ctx,{ex:17,ey:-388,ew:20,eh:13+surp*5,sh:6,lookX:p.lookX,lookY:p.lookY,brow:surp>.5?'up':(soft>.5?'soft':'n'),browW:5,mouth:a.talking?a.mouth():(soft>.6?'soft':(surp>.5?'o':'flat')),eyes:'open',blink:a.blink,my:-358,mw:20,line:C.charcoal,lids:soft>.4,pupil:.4});
  strokeL(ctx,[[-16,-366],[-4,-370],[0,-367],[4,-370],[16,-366]],C.charcoal,4);
  ctx.restore();ctx.restore()},
 bijli(ctx,a){drawBijliBody(ctx,a.p,a,false)},
 merchant(ctx,a){const p=a.p;R.ell(ctx,-14,-4,28,11,C.terra,{sw:2});R.ell(ctx,14,-4,28,11,C.terra,{sw:2});
  R.rect(ctx,-24,-80,48,76,C.ivory,{sw:2.6});
  limbS(ctx,-38,-200,p.aB,p.bB,44,40,15,C.terra,C.ivory,22);
  R.ell(ctx,0,-140,96,120,C.ivory,{sw:3});R.poly(ctx,[[-40,-200],[40,-200],[46,-110],[-46,-110]],C.leaf,{sw:3});
  for(let i=0;i<4;i++)dot(ctx,0,-190+i*20,3.4,C.gold);R.rect(ctx,-48,-112,96,12,C.mustard,{sw:2});
  R.ell(ctx,30,-100,26,30,C.brown,{sw:2.2});dot(ctx,30,-104,4,C.gold);
  limbS(ctx,38,-200,p.aF,p.bF,44,40,15,C.terra,C.ivory,22);
  if(a.extra.hold)a.extra.hold(ctx);
  ctx.save();ctx.translate(0,-214);ctx.rotate(p.tilt||0);ctx.translate(0,214);
  R.rect(ctx,-8,-222,16,16,C.terra,{sw:2});R.circ(ctx,0,-250,74,C.terra,{sw:3});
  R.path(ctx,'M-40 -262 C -44 -310 44 -310 40 -262 C 20 -272 -20 -272 -40 -262 Z',C.mustard,{sw:2.6});
  R.path(ctx,'M-36 -270 C -10 -280 14 -300 30 -286',null,{stroke:C.verm,sw:4});dot(ctx,26,-292,6,C.verm);
  drawFace(ctx,{ex:14,ey:-252,ew:15,eh:13,sh:5,lookX:p.lookX,lookY:p.lookY,brow:p.brow,mouth:a.mouth(),eyes:p.eyes,blink:a.blink,my:-222,mw:18,pupil:.42});
  strokeL(ctx,[[-20,-232],[-8,-238],[0,-234],[8,-238],[20,-232]],C.charcoal,4);ctx.restore()}};
function motifStarDot(ctx,x,y,r){poly(ctx,[[x,y-r],[x+r*.35,y],[x,y+r],[x-r*.35,y]],C.gold);dot(ctx,x,y,r*.35,C.mustard)}
function drawBasket(ctx,n,tilt){for(let i=0;i<n;i++){const lx=-28+i*26;drawDiya(ctx,lx,-26-(i===1?6:0),.5,{lit:0,rot:i===n-1?tilt*1.6:0})}
  R.path(ctx,'M-50 -26 L 50 -26 L 40 12 L -40 12 Z',C.mustard,{sw:3});for(let i=0;i<5;i++)strokeL(ctx,[[-44+i*22,-24],[-36+i*18,10]],C.brown,2);strokeL(ctx,[[-46,-8],[46,-8]],C.brown,2);
  R.path(ctx,'M-42 -26 C -40 -70 40 -70 42 -26',null,{stroke:C.brown,sw:4})}

/* Bijli: separate movable layers for tail, legs, body, neck/head and ears */
function drawBijliBody(ctx,p,a,painted){const sw=a&&a.walking?Math.sin(a.wph):0,br=painted?0:Math.sin(T.sec*3)*1.2;const O={sw:2.8};
  const legs=(xs,ang)=>xs.forEach((lx,i)=>{ctx.save();ctx.translate(lx,-58);ctx.rotate(ang*(i?1:-1)*(a&&a.walking?1:0)+(i===1?-ang*.0:0));
    R.poly(ctx,[[-7,0],[7,0],[6,46],[-6,46]],C.ivory,O);R.rect(ctx,-8,44,16,10,C.charcoal,{sw:2});strokeL(ctx,[[-6,18],[6,18]],C.terra,3);strokeL(ctx,[[-6,28],[6,28]],C.indigo,3);ctx.restore()});
  ctx.save();ctx.translate(-60,-92+br*.3);ctx.rotate((p.tail||0)+(painted?0:Math.sin(T.sec*2)*.05));
  R.path(ctx,'M0 0 C -22 -6 -36 8 -38 28 C -39 44 -30 54 -22 56 C -26 38 -20 18 -2 10 Z',C.terra,O);
  strokeL(ctx,[[-28,14],[-20,22]],C.ivory,3);strokeL(ctx,[[-34,30],[-24,34]],C.ivory,3);strokeL(ctx,[[-30,46],[-22,46]],C.indigo,3);ctx.restore();
  legs([-40,-24],sw*.45);
  ctx.save();ctx.translate(0,br*.4);
  R.ell(ctx,0,-80,132,66,C.ivory,{sw:3});
  zigzag(ctx,-48,-108,96,12,C.indigo,8);strokeL(ctx,[[-50,-80],[-38,-72],[-26,-80],[-14,-72],[-2,-80],[10,-72],[22,-80],[34,-72],[46,-80]],C.terra,3.2);
  for(let i=0;i<6;i++)dot(ctx,-36+i*14,-62,3,C.indigo);
  ring(ctx,-36,-82,11,C.terra,3);dot(ctx,-36,-82,4,C.indigo);
  R.rect(ctx,-14,-112,30,16,C.verm,{sw:2});for(let i=0;i<3;i++)dot(ctx,-8+i*9,-98,2.4,C.gold);
  ctx.restore();
  ctx.save();ctx.translate(30,-58);ctx.rotate(p.legF||0);ctx.translate(-30,58);legs([24,40],-sw*.45);ctx.restore();
  /* neck and head */
  ctx.save();ctx.translate(44,-98+br*.5);ctx.rotate(p.head||0);
  R.poly(ctx,[[-10,6],[12,-40],[34,-30],[20,16]],C.ivory,O);
  for(let i=0;i<5;i++){const t=i/4;dot(ctx,lerp(-6,10,t),lerp(-2,-40,t),6.5,i%2?C.indigo:C.verm)}
  R.rect(ctx,8,-14,26,8,C.mustard,{sw:2});dot(ctx,24,-2,5,C.gold);ring(ctx,24,-2,5,C.brown,1.6);
  ctx.save();ctx.translate(26,-48);ctx.rotate(p.htilt||0);
  for(const[ex,key]of[[-8,'earL'],[4,'earR']]){ctx.save();ctx.translate(ex,-16);ctx.rotate((p[key]||0)-.15);R.path(ctx,'M-6 0 C -8 -18 -2 -30 2 -32 C 6 -24 8 -12 6 0 Z',C.ivory,{sw:2.4});poly(ctx,[[-2,-4],[0,-22],[3,-4]],C.terra);ctx.restore()}
  ctx.save();ctx.rotate(.42);R.ell(ctx,10,0,72,38,C.ivory,{sw:2.8});ctx.restore();
  R.rect(ctx,18,-4,8,22,C.mustard,{sw:1.8});
  poly(ctx,[[-10,-18],[-4,-30],[2,-18]],C.indigo);poly(ctx,[[-2,-18],[4,-28],[8,-17]],C.verm);
  dot(ctx,36,12,3,C.charcoal);
  drawFace(ctx,{ex:0,ey:-6,ew:20,eh:22,sh:3,lookX:p.lookX,lookY:p.lookY,brow:p.brow,browW:2.6,mouth:a&&a.mouth?a.mouth():p.mouth,eyes:p.eyes,blink:a&&a.blink,my:20,mw:14,pupil:.42,single:true},true);
  ctx.restore();ctx.restore()}
/* Bijli's face is in profile: one big eye and a small mouth near the snout */
const _drawFace=drawFace;
drawFace=function(ctx,f,single){if(!single)return _drawFace(ctx,f);const lx=f.lookX||0,ly=f.lookY||0,x=6,y=-8;const eyes=f.blink?'closed':f.eyes;
  if(eyes==='happy'||eyes==='closed'){ctx.beginPath();if(eyes==='closed'){ctx.moveTo(x-9,y);ctx.quadraticCurveTo(x,y+7,x+9,y)}else{ctx.moveTo(x-9,y+3);ctx.quadraticCurveTo(x,y-9,x+9,y+3)}ctx.strokeStyle=C.charcoal;ctx.lineWidth=3;ctx.lineCap='round';ctx.stroke()}
  else{const k=eyes==='wide'?1.15:1;ctx.beginPath();ctx.ellipse(x,y,10*k,11*k,0,0,TAU);ctx.fillStyle=C.ivory;ctx.fill();ctx.strokeStyle=C.charcoal;ctx.lineWidth=2.4;ctx.stroke();
    dot(ctx,x+lx*4,y+ly*4,5.2,C.charcoal);dot(ctx,x+lx*4-1.8,y+ly*4-2,1.7,C.ivory)}
  const bt=f.brow;if(bt&&bt!=='n'){const a=[x-8,y-15],b=[x+8,y-15];if(bt==='up'){a[1]-=4;b[1]-=4}if(bt==='worry')a[1]-=5;if(bt==='det')a[1]+=4;strokeL(ctx,[a,b],C.charcoal,2.6)}
  const m=f.mouth,mx=30,my=22;ctx.beginPath();ctx.strokeStyle=C.charcoal;ctx.lineWidth=2.6;
  if(m==='big'||m==='talk'){ctx.moveTo(mx-9,my);ctx.quadraticCurveTo(mx,my+(m==='big'?11:8),mx+7,my-1);ctx.closePath();ctx.fillStyle=C.verm;ctx.fill();ctx.stroke()}
  else if(m==='O'||m==='o'){ctx.ellipse(mx,my+2,4,5,0,0,TAU);ctx.fillStyle=C.charcoal;ctx.fill()}
  else if(m==='worry'){ctx.moveTo(mx-8,my+4);ctx.quadraticCurveTo(mx,my-2,mx+7,my+3);ctx.stroke()}
  else if(m==='flat'||m==='firm'){ctx.moveTo(mx-8,my+1);ctx.lineTo(mx+6,my+1);ctx.stroke()}
  else{ctx.moveTo(mx-9,my);ctx.quadraticCurveTo(mx-1,my+7,mx+7,my-1);ctx.stroke()}};
const BIJLI_STILL={head:0,htilt:0,earL:0,earR:0,tail:0,legF:0,legB:0,lookX:0,lookY:0,mouth:'smile',eyes:'open',brow:'n'};
function drawBijliPainted(ctx,x,y,s,dir){withT(ctx,x,y,s,dir,c=>drawBijliBody(c,BIJLI_STILL,null,true))}
/* empty painted silhouette left behind on the wall */
function drawBijliGhost(ctx,x,y,s,a){withT(ctx,x,y,s,1,c=>{c.save();c.globalAlpha*=a;c.setLineDash([7,7]);c.lineWidth=3;c.strokeStyle=C.ivory;
  c.beginPath();c.ellipse(0,-80,66,33,0,0,TAU);c.stroke();c.beginPath();c.moveTo(34,-104);c.lineTo(58,-150);c.lineTo(96,-128);c.lineTo(72,-100);c.stroke();
  for(const lx of[-40,-24,24,40]){c.beginPath();c.moveTo(lx,-50);c.lineTo(lx,0);c.stroke()}c.beginPath();c.moveTo(-60,-92);c.quadraticCurveTo(-96,-60,-80,-36);c.stroke();c.restore()})}

/* Background townspeople: simple and secondary */
function drawFolk(ctx,x,y,s,o){o=o||{};withT(ctx,x,y,s,o.f||1,c=>{const sk=o.skin||C.terra,top=o.top||C.leaf,low=o.low||C.indigo,O={sw:2.6};
  const child=o.child;const k=child?.72:1;c.scale(k,k);
  R.poly(c,[[-26,-130],[26,-130],[40,-4],[-40,-4]],low,O);
  R.poly(c,[[-26,-196],[26,-196],[30,-126],[-30,-126]],top,O);for(let i=0;i<3;i++)dot(c,0,-184+i*20,3,C.ivory);
  const arm=o.arm||0;limbS(c,-28,-190,-.15,.2,36,34,12,sk);limbS(c,28,-190,.15+arm,-.2+arm*.4,36,34,12,sk);
  if(o.hold)o.hold(c);
  R.rect(c,-7,-210,14,16,sk,{sw:2});R.circ(c,0,-234,60,sk,{sw:2.8});
  if(o.hair==='turban')R.path(c,'M-32 -242 C -36 -282 36 -282 32 -242 C 16 -252 -16 -252 -32 -242 Z',o.hat||C.mustard,{sw:2.4});
  else if(o.hair==='bun'){R.circ(c,0,-270,26,C.charcoal,{sw:2});R.path(c,'M-31 -236 C -32 -274 32 -274 31 -236 C 18 -254 -18 -254 -31 -236 Z',C.charcoal,{sw:2})}
  else R.path(c,'M-31 -236 C -32 -274 32 -274 31 -236 C 18 -254 -18 -254 -31 -236 Z',C.charcoal,{sw:2});
  const m=o.mood||'smile';dot(c,-10,-234,3,C.charcoal);dot(c,10,-234,3,C.charcoal);
  c.beginPath();c.strokeStyle=C.charcoal;c.lineWidth=2.6;if(m==='smile'){c.moveTo(-9,-220);c.quadraticCurveTo(0,-212,9,-220)}else{c.moveTo(-7,-218);c.lineTo(7,-218)}c.stroke();
  dot(c,0,-252,2.6,C.verm)})}

/* Diya-Dadi: the storyteller grandmother */
POSES.dadi={idle:{aB:-.1,bB:.2,aF:.35,bF:1.2,tilt:.05,lean:0,lookX:0,lookY:0,brow:'soft',mouth:'smile',eyes:'open'},wave:{aB:-.1,bB:.2,aF:1.9,bF:.5,tilt:.08,brow:'soft',mouth:'big',eyes:'happy'}};
DRAW.dadi=function(ctx,a){const p=a.p;R.ell(ctx,-12,-4,28,11,C.terra,{sw:2});R.ell(ctx,14,-4,28,11,C.terra,{sw:2});
  limbS(ctx,-30,-226,p.aB,p.bB,44,40,14,C.terra,C.mustard,18);
  R.poly(ctx,[[-36,-230],[36,-230],[66,-8],[-66,-8]],C.ivory,{sw:3});R.poly(ctx,[[-66,-8],[66,-8],[62,-34],[-62,-34]],C.terra,{sw:2.4});dotRow(ctx,-54,-21,108,14,3,C.mustard);
  R.poly(ctx,[[-36,-230],[-20,-236],[48,-40],[30,-34]],C.verm,{sw:2.4});
  limbS(ctx,30,-226,p.aF,p.bF,44,40,14,C.terra,C.mustard,18,C.terra,C.gold);
  if(a.pose!=='wave'){const[hx,hy]=limbEnd(30,-226,p.aF,p.bF,44,40);drawDiya(ctx,hx+6,hy-6,.7,{lit:1,glow:true,t:T.sec})}
  ctx.save();ctx.translate(0,-240);ctx.rotate(p.tilt||0);ctx.translate(0,240);
  R.rect(ctx,-8,-248,16,16,C.terra,{sw:2});R.circ(ctx,-30,-292,30,C.ivory,{sw:2.4});R.circ(ctx,0,-276,74,C.terra,{sw:3});
  R.path(ctx,'M-38 -272 C -40 -322 40 -322 38 -272 C 26 -296 -26 -296 -38 -272 Z',C.ivory,{sw:2.4});
  R.path(ctx,'M-44 -270 C -46 -330 46 -330 44 -270 L 50 -240 C 40 -280 -40 -280 -50 -240 Z',C.terra,{sw:2.4});
  drawFace(ctx,{ex:14,ey:-276,ew:16,eh:12,sh:5,lookX:p.lookX,lookY:p.lookY,brow:p.brow,mouth:a.mouth(),eyes:p.eyes,blink:a.blink,my:-254,mw:16,cheek:true,pupil:.42});
  ring(ctx,-14,-276,12,C.brown,2.6);ring(ctx,14,-276,12,C.brown,2.6);strokeL(ctx,[[-2,-278],[2,-278]],C.brown,2.4);dot(ctx,0,-294,3,C.verm);ctx.restore()};
/* story-within-the-story protagonists */
const EXPR={surprised:{mouth:'O',eyes:'wide',brow:'up'},silly:{mouth:'tongue',eyes:'wink',brow:'n'},happy:{mouth:'big',eyes:'happy',brow:'n'},brave:{mouth:'firm',eyes:'open',brow:'det'},calm:{mouth:'smile',eyes:'open',brow:'n'}};
function drawMonkey(ctx,x,y,s,ex,t,k,hold){const e=EXPR[ex]||EXPR.calm;withT(ctx,x,y,s,1,c=>{const O={sw:3};
  let dy=0,rot=0,arm=0,puff=1;if(ex==='surprised'){dy=-Math.max(0,Math.sin(Math.min(1,k)*Math.PI))*50;arm=1.4}else if(ex==='silly')rot=Math.sin(t*6)*.15;else if(ex==='happy')dy=-Math.abs(Math.sin(t*7))*26;else if(ex==='brave'){puff=1.08;arm=.5}
  c.translate(0,dy);c.rotate(rot);
  R.path(c,'M-40 -50 C -110 -40 -120 -150 -70 -160 C -40 -166 -40 -130 -64 -128',null,{stroke:C.brown,sw:12});
  for(const sd of[-1,1])R.rect(c,sd*22-8,-60,16,58,C.brown,O);
  c.save();c.scale(puff,puff);R.ell(c,0,-110,110,120,C.brown,O);R.ell(c,0,-100,64,74,C.terra,O);c.restore();
  for(const sd of[-1,1]){c.save();c.translate(sd*48,-150);c.rotate(sd*(.3+arm));R.rect(c,-8,0,16,62,C.brown,O);R.circ(c,0,66,22,C.terra,{sw:2.4});c.restore()}
  if(hold)hold(c);
  for(const sd of[-1,1])R.circ(c,sd*58,-212,40,C.brown,O),R.circ(c,sd*58,-212,20,C.terra,{sw:2});
  R.circ(c,0,-212,120,C.brown,O);R.path(c,'M0 -180 C -60 -170 -64 -240 -30 -246 C -14 -248 -6 -236 0 -232 C 6 -236 14 -248 30 -246 C 64 -240 60 -170 0 -180 Z',C.terra,{sw:2.4});
  drawFace(c,{ex:20,ey:-222,ew:24,eh:22,sh:6,lookX:0,lookY:0,brow:e.brow,mouth:e.mouth,eyes:e.eyes,my:-196,mw:28,pupil:.42,cheek:ex==='happy'||ex==='silly'})})}
function drawTara(ctx,x,y,s,ex,t,k){const e=EXPR[ex]||EXPR.calm;withT(ctx,x,y,s,1,c=>{let dy=0,rot=0,sc=1;if(ex==='surprised')dy=-Math.max(0,Math.sin(Math.min(1,k)*Math.PI))*50;else if(ex==='silly')rot=Math.sin(t*6)*.25;else if(ex==='happy'){dy=-Math.abs(Math.sin(t*7))*24;rot=Math.sin(t*3)*.08}else if(ex==='brave')sc=1.1;
  c.translate(0,-120+dy);c.rotate(rot);c.scale(sc,sc);for(let i=0;i<10;i++){const a=i/10*TAU+t*.4;sparkle(c,Math.cos(a)*150,Math.sin(a)*150,8,C.gold,.6)}
  R.poly(c,starPts(120,58),C.gold,{sw:3.4});R.poly(c,starPts(84,40),C.mustard,{sw:2});
  drawFace(c,{ex:18,ey:-6,ew:22,eh:20,sh:5,lookX:0,lookY:0,brow:e.brow,mouth:e.mouth,eyes:e.eyes,my:22,mw:24,pupil:.42,cheek:true})})}
