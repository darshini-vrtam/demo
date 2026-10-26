/* ===== Character bible: reusable parameterised drawings. Clothing, ornaments and hair never change between scenes. ===== */
/* Devas: cream skin, turmeric/vermilion garments with vertical stripes, tall pointed crowns.
   Asuras: cream skin, leaf/peacock garments with diamond pattern, rounded crowns with three leaf points, small curled moustache. */
const KIN={deva:[{g:C.turmeric,g2:C.verm},{g:C.verm,g2:C.turmeric},{g:C.turmeric,g2:C.leaf}],
  asura:[{g:C.leaf,g2:C.peacock},{g:C.peacock,g2:C.verm},{g:C.leaf,g2:C.turmeric}]};
const ARMS={hold:{b:[[8,-214],[40,-186],[62,-172]],f:[[14,-212],[50,-190],[74,-176]]},
  pull:{b:[[8,-214],[42,-190],[64,-176]],f:[[14,-212],[52,-192],[76,-178]]},
  wonder:{b:[[2,-214],[14,-176],[30,-150]],f:[[16,-212],[46,-190],[62,-206]]},
  respect:{b:[[6,-214],[18,-184],[34,-196]],f:[[16,-212],[30,-180],[38,-198]]}};
function person(kind,v,o){return Object.assign({kind,v,x:0,y:0,s:1,f:1,pose:'hold',lean:0,mouth:'smile',brow:0,blink:Math.random()*5},o)}
/* map a local point of a figure to world space (same transform as drawPerson) */
function pLocal(p,lx,ly){const c=Math.cos(-p.lean),s=Math.sin(-p.lean);const rx=lx*c-ly*s,ry=lx*s+ly*c;return[p.x+rx*p.s*p.f,p.y+ry*p.s]}
function handOf(p){const a=ARMS[p.pose]||ARMS.hold;const h=a.f[2],h2=a.b[2];return pLocal(p,(h[0]+h2[0])/2,(h[1]+h2[1])/2)}
function drawPerson(ctx,p){const K=KIN[p.kind][p.v%3],lw=OL/p.s;ctx.save();ctx.translate(p.x,p.y);ctx.scale(p.s*p.f,p.s);ctx.rotate(-p.lean);
  const A=ARMS[p.pose]||ARMS.hold;const sk=C.cream;
  /* back arm */
  limb(ctx,A.b,sk,13,lw);ctx.save();ctx.translate(A.b[2][0],A.b[2][1]);sil(ctx,c=>{c.beginPath();c.arc(0,0,9,0,TAU)},sk,lw);ctx.restore();
  /* legs and feet */
  limb(ctx,[[-12,-30],[-14,-6]],sk,13,lw);limb(ctx,[[12,-30],[14,-6]],sk,13,lw);
  sil(ctx,c=>{c.beginPath();c.ellipse(-6,-4,15,7,0,0,TAU);c.ellipse(22,-4,15,7,0,0,TAU)},sk,lw);
  /* lower garment */
  shape(ctx,c=>pth(c,[[-32,-152],[34,-152],[44,-28],[-40,-28]]),K.g,c=>{if(p.kind==='deva')patLines(c,-44,-152,46,-28,11,0,K.g2,3.2);else patDiamonds(c,-44,-140,46,-30,20,K.g2,2.6,C.cream);
    c.fillStyle=K.g2;c.fillRect(-46,-46,96,18);patDots(c,-44,-37,46,-37,12,2.6,C.cream)},lw);
  /* torso */
  shape(ctx,c=>{c.beginPath();c.moveTo(-28,-150);c.lineTo(-34,-214);c.quadraticCurveTo(0,-232,34,-214);c.lineTo(28,-150);c.closePath()},sk,c=>{
    c.save();c.beginPath();c.moveTo(-34,-214);c.lineTo(-18,-222);c.lineTo(34,-152);c.lineTo(18,-150);c.closePath();c.fillStyle=K.g2;c.fill();c.restore();
    for(let i=0;i<5;i++)dot(c,-26+i*13+3,-210+i*14,2.6,C.cream)},lw);
  shape(ctx,c=>{c.beginPath();c.rect(-26,-160,54,14)},K.g2,c=>patDots(c,-26,-153,28,-153,10,2.4,C.cream),lw);
  /* neck, necklace */
  limb(ctx,[[4,-226],[6,-238]],sk,16,lw);ctx.beginPath();ctx.arc(4,-226,18,.3,Math.PI-.3);ctx.strokeStyle=C.ink;ctx.lineWidth=7;ctx.stroke();ctx.strokeStyle=C.turmeric;ctx.lineWidth=4;ctx.stroke();
  drawProfileHead(ctx,p,lw);
  /* front arm with armlet and bangle */
  limb(ctx,A.f,sk,13,lw);line(ctx,[[A.f[0][0]+(A.f[1][0]-A.f[0][0])*.45-5,A.f[0][1]+(A.f[1][1]-A.f[0][1])*.45-3],[A.f[0][0]+(A.f[1][0]-A.f[0][0])*.45+5,A.f[0][1]+(A.f[1][1]-A.f[0][1])*.45+5]],C.turmeric,4);
  ctx.restore()}
/* the front fist is drawn again after the rope so the hands grip it */
function drawFists(ctx,p){const A=ARMS[p.pose]||ARMS.hold,lw=OL/p.s;ctx.save();ctx.translate(p.x,p.y);ctx.scale(p.s*p.f,p.s);ctx.rotate(-p.lean);
  [A.b[2],A.f[2]].forEach(h=>{ctx.save();ctx.translate(h[0],h[1]);sil(ctx,c=>{c.beginPath();c.ellipse(0,0,10,9,0,0,TAU)},C.cream,lw);line(ctx,[[-9,-4],[-9,5]],C.turmeric,3.4);ctx.restore()});ctx.restore()}
function drawProfileHead(ctx,p,lw){const hy=-262;
  /* hair bun behind */
  sil(ctx,c=>{c.beginPath();c.arc(-26,hy+2,13,0,TAU)},C.ink,lw*.5);
  sil(ctx,c=>{c.beginPath();c.ellipse(2,hy,28,31,0,0,TAU);c.moveTo(24,hy-14);c.lineTo(38,hy+4);c.lineTo(25,hy+8);c.closePath();c.moveTo(20,hy+16);c.quadraticCurveTo(30,hy+22,20,hy+30);c.closePath()},C.cream,lw);
  ctx.save();ctx.beginPath();ctx.ellipse(2,hy,28,31,0,0,TAU);ctx.clip();ctx.beginPath();ctx.ellipse(-22,hy-16,24,24,.5,0,TAU);ctx.moveTo(-30,hy+30);ctx.lineTo(-30,hy-30);ctx.lineTo(10,hy-40);ctx.lineTo(16,hy-28);ctx.quadraticCurveTo(-4,hy-24,-14,hy-8);ctx.lineTo(-18,hy+30);ctx.closePath();ctx.fillStyle=C.ink;ctx.fill();ctx.restore();
  /* ear and earring */
  ctx.beginPath();ctx.ellipse(-6,hy+2,6,8,0,0,TAU);ctx.fillStyle=C.cream;ctx.fill();ctx.lineWidth=2.4;ctx.strokeStyle=C.ink;ctx.stroke();dot(ctx,-6,hy+14,4,C.turmeric);ring(ctx,-6,hy+14,4,C.ink,1.6);
  /* fish-shaped eye */
  const blink=((T.sec+p.blink)%5)<.12&&MV();ctx.beginPath();ctx.moveTo(6,hy-6);ctx.quadraticCurveTo(15,blink?hy-5:hy-15,25,hy-6);ctx.quadraticCurveTo(15,hy+1,6,hy-6);ctx.closePath();
  ctx.fillStyle=C.cream;ctx.fill();ctx.lineWidth=2.6;ctx.strokeStyle=C.ink;ctx.stroke();if(!blink)dot(ctx,17,hy-7,3.6,C.ink);
  line(ctx,[[5,hy-17-p.brow*5],[16,hy-22-p.brow*6],[26,hy-17-p.brow*4]],C.ink,2.6);
  if(p.mouth==='o'){ring(ctx,25,hy+19,3.4,C.ink,2.4)}else{ctx.beginPath();ctx.arc(22,hy+15,6,.25,1.4);ctx.strokeStyle=C.ink;ctx.lineWidth=2.6;ctx.stroke()}
  if(p.kind==='asura'){ctx.beginPath();ctx.moveTo(30,hy+10);ctx.quadraticCurveTo(22,hy+14,16,hy+10);ctx.quadraticCurveTo(12,hy+6,15,hy+3);ctx.strokeStyle=C.ink;ctx.lineWidth=3;ctx.stroke()}
  /* crowns */
  if(p.kind==='deva'){shape(ctx,c=>pth(c,[[-22,hy-22],[28,hy-22],[22,hy-40],[12,hy-50],[4,hy-80],[-6,hy-50],[-16,hy-40]]),C.turmeric,c=>{c.fillStyle=C.verm;c.fillRect(-30,hy-32,64,10);
      patDots(c,-26,hy-27,30,hy-27,9,2.2,C.cream);dot(c,4,hy-52,4,C.verm);line(c,[[-10,hy-42],[18,hy-42]],C.ink,1.8)},lw)}
  else{shape(ctx,c=>{c.beginPath();c.moveTo(-26,hy-20);c.quadraticCurveTo(2,hy-62,30,hy-20);c.closePath()},C.verm,c=>{c.fillStyle=C.turmeric;c.fillRect(-30,hy-30,64,10);patDots(c,-26,hy-25,30,hy-25,9,2.2,C.ink)},lw);
    [[-10,-.5],[4,0],[18,.5]].forEach(([x,a])=>{leafPath(ctx,x,hy-42,22,7,-Math.PI/2+a);ctx.fillStyle=C.leaf;ctx.fill();ctx.lineWidth=lw*.7;ctx.strokeStyle=C.ink;ctx.stroke()})}}

/* ===== Amrit Kalash: distinct outline, repeating design; gold dots and parallel lines fill in with k ===== */
function kalashBody(c){c.beginPath();c.moveTo(-18,-58);c.lineTo(-20,-46);c.bezierCurveTo(-62,-34,-66,30,-30,46);c.lineTo(-24,56);c.lineTo(24,56);c.lineTo(30,46);c.bezierCurveTo(66,30,62,-34,20,-46);c.lineTo(18,-58);c.closePath()}
function drawKalash(ctx,x,y,s,o){o=o||{};const fk=o.fill==null?1:o.fill,lw=OL/s;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  /* mango leaves and coconut-like top */
  [[-26,-.5],[-12,-.2],[12,.2],[26,.5]].forEach(([dx,a])=>leaf(ctx,dx*.4,-60,28,8,-Math.PI/2+a*1.6,C.leaf,lw*.7));
  shape(ctx,c=>{c.beginPath();c.ellipse(0,-74,15,18,0,0,TAU)},C.verm,c=>patLines(c,-16,-92,16,-56,6,.5,C.turmeric,2),lw);
  shape(ctx,kalashBody,fk>.02?C.turmeric:C.cream,c=>{
    if(fk>.02){c.save();c.globalAlpha=clamp(fk*1.6,0,1);c.fillStyle=C.verm;c.fillRect(-70,-6,140,22);c.restore()}
    const dots=[];for(let r=0;r<3;r++)for(let i=0;i<13;i++)dots.push([-48+i*8,[-22,-1,34][r]]);
    dots.forEach((d,i)=>{const k=clamp(fk*dots.length*1.2-i,0,1);if(k>0)dot(c,d[0],d[1]+(i%2?0:0),3*k,d[1]===-1?C.cream:C.verm)});
    const nl=9;for(let i=0;i<nl;i++){const k=clamp((fk-.3)*nl*1.6-i,0,1);if(k>0)line(c,[[-40+i*10,20],[-40+i*10,20+12*k]],C.ink,2)}
    if(fk>.5){for(let i=0;i<4;i++){const k=clamp((fk-.5)*4-i*.5,0,1);if(k>0)line(c,[[-16,-54+i*3.2],[-16+32*k,-54+i*3.2]],C.ink,1.6)}}},lw);
  shape(ctx,c=>{c.beginPath();c.ellipse(0,-58,24,6,0,0,TAU)},fk>.02?C.turmeric:C.cream,null,lw);
  ctx.restore()}
/* a gentle patterned glow: dotted rings and short lines, flat, slow */
function drawKalashGlow(ctx,x,y,r,k,t){if(k<=0)return;ctx.save();ctx.globalAlpha*=clamp(k,0,1);
  for(let j=0;j<2;j++){const rr=r*(1+j*.22),n=Math.round(rr/7);for(let i=0;i<n;i++){const a=i/n*TAU+t*.15*(j?-1:1)*MV();dot(ctx,x+Math.cos(a)*rr,y+Math.sin(a)*rr,j?2.6:3.6,j?C.cream:C.turmeric)}}
  for(let i=0;i<12;i++){const a=i/12*TAU+t*.08*MV();line(ctx,[[x+Math.cos(a)*r*1.38,y+Math.sin(a)*r*1.38],[x+Math.cos(a)*r*1.58,y+Math.sin(a)*r*1.58]],C.turmeric,4)}ctx.restore()}

/* ===== Lord Dhanvantari: calm, upright, welcoming. Front view. States: hidden, rising, standing, gesturing ===== */
function dhan(o){return Object.assign({x:0,y:0,s:1,pose:'hold',kal:1,fill:1,glow:0,blink:2},o)}
function dhanKalashPos(d){return d.pose==='gesture'?[d.x-62*d.s,d.y-368*d.s]:[d.x,d.y-340*d.s]}
function drawDhan(ctx,d){const lw=OL/d.s,sk=C.peacock;ctx.save();ctx.translate(d.x,d.y);ctx.scale(d.s,d.s);
  /* flat cream halo with dotted ring (subtle, not glowing) */
  shape(ctx,c=>{c.beginPath();c.arc(0,-505,98,0,TAU)},C.cream,c=>{for(let i=0;i<28;i++){const a=i/28*TAU;dot(c,Math.cos(a)*86,-505+Math.sin(a)*86,3.4,C.turmeric)}},lw);
  /* long hair behind the shoulders */
  sil(ctx,c=>{c.beginPath();c.moveTo(-46,-540);c.quadraticCurveTo(-82,-500,-74,-430);c.quadraticCurveTo(-60,-412,-44,-430);c.lineTo(44,-430);c.quadraticCurveTo(60,-412,74,-430);c.quadraticCurveTo(82,-500,46,-540);c.closePath()},C.ink,lw*.5);
  /* feet */
  sil(ctx,c=>{c.beginPath();c.ellipse(-30,-8,22,10,0,0,TAU);c.ellipse(30,-8,22,10,0,0,TAU)},sk,lw);
  /* dhoti */
  shape(ctx,c=>pth(c,[[-70,-330],[70,-330],[96,-22],[-96,-22]]),C.turmeric,c=>{patLines(c,-100,-330,100,-22,13,0,C.verm,2.6);
    c.fillStyle=C.verm;c.fillRect(-100,-58,200,36);patDots(c,-96,-40,96,-40,13,3,C.cream);
    c.beginPath();c.moveTo(-14,-330);c.lineTo(14,-330);c.lineTo(20,-58);c.lineTo(-20,-58);c.closePath();c.fillStyle=C.verm;c.fill();c.lineWidth=2.4;c.strokeStyle=C.ink;c.stroke();patDots(c,-14,-320,14,-64,14,2.6,C.turmeric)},lw);
  /* uttariya (shawl) falling at both sides */
  [-1,1].forEach(sd=>shape(ctx,c=>{c.beginPath();c.moveTo(sd*78,-440);c.quadraticCurveTo(sd*128,-360,sd*118,-180);c.lineTo(sd*94,-176);c.quadraticCurveTo(sd*100,-330,sd*60,-400);c.closePath()},C.verm,c=>patDots(c,sd>0?60:-130,-440,sd>0?130:-60,-170,14,2.6,C.turmeric),lw));
  /* torso */
  shape(ctx,c=>{c.beginPath();c.moveTo(-58,-330);c.lineTo(-90,-440);c.quadraticCurveTo(0,-470,90,-440);c.lineTo(58,-330);c.closePath()},sk,c=>{line(c,[[-60,-440],[40,-330]],C.cream,4)},lw);
  shape(ctx,c=>{c.beginPath();c.rect(-66,-342,132,22)},C.verm,c=>patDots(c,-66,-331,66,-331,12,3,C.turmeric),lw);
  /* garland of leaves and necklaces */
  ctx.beginPath();ctx.arc(0,-452,40,.35,Math.PI-.35);ctx.strokeStyle=C.ink;ctx.lineWidth=9;ctx.stroke();ctx.strokeStyle=C.turmeric;ctx.lineWidth=5;ctx.stroke();
  for(let i=0;i<=10;i++){const a=.55+i/10*(Math.PI-1.1);const gx=Math.cos(a)*70,gy=-470+Math.sin(a)*96;leaf(ctx,gx,gy,16,6,a+Math.PI/2,i%2?C.leaf:C.cream,1.8,false)}
  /* neck and head */
  limb(ctx,[[0,-456],[0,-470]],sk,30,lw);
  shape(ctx,c=>{c.beginPath();c.ellipse(-46,-498,8,13,0,0,TAU);c.ellipse(46,-498,8,13,0,0,TAU)},sk,null,lw*.7);
  [-1,1].forEach(sd=>{ctx.save();ctx.translate(sd*50,-474);ctx.rotate(sd*.3);drawFish(ctx,0,0,.17,sd,0);ctx.restore()});
  shape(ctx,c=>{c.beginPath();c.ellipse(0,-500,42,52,0,0,TAU)},sk,null,lw);
  ctx.save();ctx.beginPath();ctx.ellipse(0,-500,42,52,0,0,TAU);ctx.clip();ctx.beginPath();ctx.moveTo(-44,-520);ctx.quadraticCurveTo(0,-560,44,-520);ctx.lineTo(44,-560);ctx.lineTo(-44,-560);ctx.closePath();ctx.fillStyle=C.ink;ctx.fill();ctx.restore();
  const blink=((T.sec+d.blink)%6)<.12&&MV();
  [-1,1].forEach(sd=>{const ex=sd*17,ey=-500;ctx.beginPath();ctx.moveTo(ex-11,ey);ctx.quadraticCurveTo(ex,blink?ey-1:ey-9,ex+11,ey);ctx.quadraticCurveTo(ex,ey+6,ex-11,ey);ctx.closePath();
    ctx.fillStyle=C.cream;ctx.fill();ctx.lineWidth=2.4;ctx.strokeStyle=C.ink;ctx.stroke();if(!blink)dot(ctx,ex,ey-1.5,3.6,C.ink);
    ctx.beginPath();ctx.moveTo(ex-13,ey-14);ctx.quadraticCurveTo(ex,ey-21,ex+13,ey-14);ctx.lineWidth=2.6;ctx.stroke()});
  line(ctx,[[0,-512],[-2,-484],[4,-482]],C.ink,2.4);
  ctx.beginPath();ctx.moveTo(-9,-468);ctx.quadraticCurveTo(0,-462,9,-468);ctx.strokeStyle=C.verm;ctx.lineWidth=3.4;ctx.stroke();
  ctx.beginPath();ctx.moveTo(-6,-538);ctx.quadraticCurveTo(0,-520,6,-538);ctx.strokeStyle=C.verm;ctx.lineWidth=3;ctx.stroke();dot(ctx,0,-526,2.4,C.verm);
  /* kirita crown */
  shape(ctx,c=>pth(c,[[-42,-538],[42,-538],[36,-576],[24,-600],[16,-632],[0,-664],[-16,-632],[-24,-600],[-36,-576]]),C.turmeric,c=>{
    c.fillStyle=C.verm;c.fillRect(-50,-556,100,16);patDots(c,-46,-548,46,-548,10,2.6,C.cream);line(c,[[-30,-582],[30,-582]],C.ink,2);line(c,[[-20,-608],[20,-608]],C.ink,2);
    patDots(c,-30,-596,30,-596,10,2.2,C.verm)},lw);
  shape(ctx,c=>{c.beginPath();c.ellipse(0,-580,8,11,0,0,TAU)},C.leaf,null,lw*.7);dot(ctx,0,-664,5,C.verm);
  /* arms, kalash and hands */
  const kp=d.pose==='gesture'?[-62,-368]:[0,-340];
  if(d.pose==='gesture'){limb(ctx,[[-84,-436],[-104,-372],[-82,-332]],sk,24,lw);limb(ctx,[[84,-436],[132,-386],[196,-410]],sk,24,lw);
    line(ctx,[[-104,-380],[-92,-372]],C.turmeric,5);line(ctx,[[136,-392],[126,-380]],C.turmeric,5)}
  else{limb(ctx,[[-84,-436],[-104,-360],[-56,-300]],sk,24,lw);limb(ctx,[[84,-436],[104,-360],[56,-300]],sk,24,lw);
    line(ctx,[[-104,-378],[-92,-370]],C.turmeric,5);line(ctx,[[104,-378],[92,-370]],C.turmeric,5)}
  ctx.restore();
  /* kalash in world space so glow and transitions can find it */
  const kx=d.x+kp[0]*d.s,ky=d.y+kp[1]*d.s;
  if(d.glow>0)drawKalashGlow(ctx,kx,ky,72*d.s,d.glow,T.sec);
  if(d.kal>0){ctx.save();ctx.globalAlpha*=clamp(d.kal,0,1);drawKalash(ctx,kx,ky,d.s*.95,{fill:d.fill});ctx.restore()}
  ctx.save();ctx.translate(d.x,d.y);ctx.scale(d.s,d.s);
  const hands=d.pose==='gesture'?[[-60,-326],[-96,-380]]:[[-54,-296],[54,-296]];
  hands.forEach(h=>sil(ctx,c=>{c.beginPath();c.ellipse(h[0],h[1],15,12,0,0,TAU)},sk,lw));
  if(d.pose==='gesture'){sil(ctx,c=>{c.beginPath();c.ellipse(204,-414,22,11,-.35,0,TAU);c.ellipse(222,-428,10,6,-.9,0,TAU)},sk,lw)}
  ctx.restore()}

/* ===== Picture symbols for cards and frames (drawn in a 200x200 box centred on 0,0) ===== */
function drawSymbol(ctx,key,x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const lw=OL/s*1.0;
  switch(key){
  case'water':shape(ctx,c=>pth(c,[[-40,-50],[40,-50],[30,58],[-30,58]]),C.peacock,c=>{c.fillStyle=C.cream;c.fillRect(-50,-30,100,8);for(let k=0;k<4;k++){c.beginPath();for(let xx=-44;xx<=44;xx+=4)c[xx>-44?'lineTo':'moveTo'](xx,-6+k*16+Math.sin(xx/7)*4);c.strokeStyle=C.cream;c.lineWidth=2.6;c.stroke()}},lw);
    shape(ctx,c=>{c.beginPath();c.ellipse(0,-50,40,8,0,0,TAU)},C.cream,null,lw);
    [[-62,-30],[62,-10],[-58,30]].forEach(([dx,dy])=>shape(ctx,c=>{c.beginPath();c.moveTo(dx,dy-16);c.quadraticCurveTo(dx+11,dy+2,dx,dy+8);c.quadraticCurveTo(dx-11,dy+2,dx,dy-16);c.closePath()},C.peacock,null,lw*.8));break;
  case'food':shape(ctx,c=>{c.beginPath();c.ellipse(0,18,82,40,0,0,TAU)},C.turmeric,c=>{for(let i=0;i<18;i++){const a=i/18*TAU;dot(c,Math.cos(a)*74,18+Math.sin(a)*34,2.6,C.verm)}},lw);
    leaf(ctx,-70,6,80,22,-.15,C.leaf,lw*.7);
    shape(ctx,c=>{c.beginPath();c.ellipse(-12,10,34,20,0,Math.PI,TAU);c.closePath()},C.cream,c=>patDots(c,-46,-12,24,10,8,1.8,C.turmeric),lw);
    [[34,4,C.verm],[22,30,C.leaf],[-30,32,C.verm]].forEach(([bx,by,col])=>shape(ctx,c=>{c.beginPath();c.ellipse(bx,by,18,11,0,0,TAU)},col,c=>patDots(c,bx-18,by-8,bx+18,by+8,7,1.6,C.cream),lw*.8));
    shape(ctx,c=>{c.beginPath();c.arc(46,-34,16,0,TAU)},C.verm,null,lw*.8);leaf(ctx,46,-50,18,6,-1.2,C.leaf,lw*.6,false);break;
  case'rest':shape(ctx,c=>{c.beginPath();c.moveTo(-74,10);c.quadraticCurveTo(-86,-22,-60,-22);c.quadraticCurveTo(0,-34,60,-22);c.quadraticCurveTo(86,-22,74,10);c.quadraticCurveTo(86,52,60,48);c.quadraticCurveTo(0,58,-60,48);c.quadraticCurveTo(-86,52,-74,10);c.closePath()},C.cream,c=>{patDots(c,-70,-16,70,44,14,2.4,C.peacock);c.fillStyle=C.verm;c.fillRect(-90,6,180,8)},lw);
    shape(ctx,c=>{c.beginPath();c.arc(30,-62,26,0,TAU);c.arc(42,-70,22,0,TAU,true)},C.turmeric,null,lw*.8);
    [[-40,-66],[-12,-82],[66,-80]].forEach(([sx,sy])=>{line(ctx,[[sx-7,sy],[sx+7,sy]],C.ink,2.4);line(ctx,[[sx,sy-7],[sx,sy+7]],C.ink,2.4);dot(ctx,sx,sy,2.4,C.turmeric)});break;
  case'learn':shape(ctx,c=>{c.beginPath();c.moveTo(0,-30);c.quadraticCurveTo(-40,-46,-84,-34);c.lineTo(-84,46);c.quadraticCurveTo(-40,34,0,50);c.quadraticCurveTo(40,34,84,46);c.lineTo(84,-34);c.quadraticCurveTo(40,-46,0,-30);c.closePath()},C.verm,null,lw);
    [-1,1].forEach(sd=>shape(ctx,c=>{c.beginPath();c.moveTo(0,-38);c.quadraticCurveTo(sd*40,-54,sd*76,-42);c.lineTo(sd*76,36);c.quadraticCurveTo(sd*40,26,0,42);c.closePath()},C.cream,c=>{for(let k=0;k<5;k++)line(c,[[sd*14,-26+k*13],[sd*64,-30+k*13]],C.peacock,2.4)},lw));
    line(ctx,[[0,-38],[0,44]],C.ink,lw);leaf(ctx,4,40,34,9,1.3,C.leaf,lw*.6,false);break;
  case'help':sil(ctx,c=>{c.beginPath();c.moveTo(-50,60);c.lineTo(-46,4);c.quadraticCurveTo(-66,-20,-56,-30);c.quadraticCurveTo(-46,-36,-34,-8);c.lineTo(-30,-58);c.quadraticCurveTo(-20,-70,-12,-58);c.lineTo(-10,-14);
      c.lineTo(-4,-66);c.quadraticCurveTo(6,-78,14,-66);c.lineTo(12,-14);c.lineTo(22,-60);c.quadraticCurveTo(32,-70,38,-56);c.lineTo(30,-6);c.lineTo(46,-40);c.quadraticCurveTo(58,-44,56,-30);c.lineTo(36,30);c.lineTo(34,60);c.closePath()},C.cream,lw);
    ctx.fillStyle=C.verm;ctx.fillRect(-52,44,88,14);ctx.lineWidth=lw*.7;ctx.strokeStyle=C.ink;ctx.strokeRect(-52,44,88,14);patDots(ctx,-48,51,32,51,10,2,C.turmeric);
    drawHeart(ctx,-2,8,.42,lw*.8);break;
  case'health':drawHeart(ctx,0,4,1,lw);leaf(ctx,-46,-48,44,13,-2.2,C.leaf,lw*.7);leaf(ctx,46,-48,44,13,-.94,C.leaf,lw*.7);
    [[-70,10],[70,10],[0,-78]].forEach(([sx,sy])=>{line(ctx,[[sx-8,sy],[sx+8,sy]],C.ink,2.6);line(ctx,[[sx,sy-8],[sx,sy+8]],C.ink,2.6);dot(ctx,sx,sy,3,C.turmeric)});break;
  case'crown':shape(ctx,c=>pth(c,[[-72,40],[72,40],[82,-36],[44,0],[20,-58],[0,-8],[-20,-58],[-44,0],[-82,-36]]),C.turmeric,c=>{c.fillStyle=C.verm;c.fillRect(-90,18,180,22);patDots(c,-80,29,80,29,14,3,C.cream);patDots(c,-60,-10,60,10,16,2.6,C.verm)},lw);
    [[-82,-36],[82,-36],[-20,-58],[20,-58]].forEach(([px,py])=>{dot(ctx,px,py,7,C.verm);ring(ctx,px,py,7,C.ink,lw*.6)});break;
  case'toys':shape(ctx,c=>{c.beginPath();c.rect(-78,6,58,52)},C.verm,c=>patLines(c,-80,6,-20,58,10,.8,C.turmeric,3),lw);
    shape(ctx,c=>{c.beginPath();c.ellipse(36,30,40,30,0,0,TAU)},C.peacock,c=>{line(c,[[0,30],[76,30]],C.cream,4);patDots(c,0,8,76,52,12,2.4,C.turmeric)},lw);
    shape(ctx,c=>{c.beginPath();c.arc(-16,-24,30,0,TAU)},C.turmeric,c=>{line(c,[[-46,-24],[14,-24]],C.verm,6);line(c,[[-16,-54],[-16,6]],C.verm,6)},lw);
    shape(ctx,c=>pth(c,[[34,-6],[64,-6],[49,-62]]),C.leaf,c=>patLines(c,30,-62,68,-6,8,0,C.cream,2.4),lw);
    shape(ctx,c=>pth(c,[[-60,6],[-34,6],[-47,-34]]),C.cream,null,lw*.8);break;
  case'moon':drawMoon(ctx,8,0,62);[[-56,-40],[54,46],[-50,52]].forEach(([sx,sy])=>{line(ctx,[[sx-8,sy],[sx+8,sy]],C.cream,3);line(ctx,[[sx,sy-8],[sx,sy+8]],C.cream,3)});break;
  case'horse':drawHorse(ctx,0,10,1);break;
  case'jewel':shape(ctx,c=>pth(c,[[-44,-22],[-24,-50],[24,-50],[44,-22],[0,56]]),C.verm,c=>{line(c,[[-44,-22],[44,-22]],C.ink,2.6);line(c,[[-24,-50],[-12,-22],[0,56]],C.ink,2.2);line(c,[[24,-50],[12,-22],[0,56]],C.ink,2.2);
      line(c,[[-12,-22],[0,-50],[12,-22]],C.ink,2.2);patDots(c,-30,-40,30,-28,12,2.2,C.cream)},lw);
    ctx.beginPath();ctx.arc(0,-6,70,Math.PI*.15,Math.PI*.85);ctx.strokeStyle=C.ink;ctx.lineWidth=12;ctx.stroke();ctx.strokeStyle=C.turmeric;ctx.lineWidth=6;ctx.stroke();break}
  ctx.restore()}
function drawHeart(ctx,x,y,s,lw){ctx.save();ctx.translate(x,y);ctx.scale(s,s);shape(ctx,c=>{c.beginPath();c.moveTo(0,58);c.bezierCurveTo(-86,4,-64,-62,0,-30);c.bezierCurveTo(64,-62,86,4,0,58);c.closePath()},C.verm,c=>{patDots(c,-70,-50,70,50,14,3,C.turmeric);
  c.beginPath();c.moveTo(0,40);c.bezierCurveTo(-56,4,-44,-40,0,-16);c.bezierCurveTo(44,-40,56,4,0,40);c.strokeStyle=C.cream;c.lineWidth=3;c.stroke()},lw/s);ctx.restore()}
function drawHorse(ctx,x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const legs=[[-38,22],[-22,22],[24,22],[40,22]];
  sil(ctx,c=>{c.beginPath();c.ellipse(0,0,56,28,0,0,TAU);legs.forEach(([lx,ly])=>{c.rect(lx-6,ly-8,12,46)});
    c.moveTo(34,-14);c.quadraticCurveTo(46,-58,62,-70);c.lineTo(84,-52);c.lineTo(76,-42);c.lineTo(62,-48);c.quadraticCurveTo(58,-20,50,4);c.closePath();
    c.moveTo(-52,-8);c.quadraticCurveTo(-82,-4,-78,40);c.quadraticCurveTo(-66,14,-50,8);c.closePath()},C.cream,OL);
  shape(ctx,c=>{c.beginPath();c.moveTo(-26,-26);c.lineTo(26,-26);c.lineTo(22,14);c.lineTo(-22,14);c.closePath()},C.verm,c=>patDots(c,-26,-22,26,12,10,2.4,C.turmeric),3.2);
  for(let i=0;i<5;i++)line(ctx,[[44+i*4,-48+i*8],[36+i*4,-44+i*8]],C.ink,2.6);
  dot(ctx,68,-58,3.2,C.ink);legs.forEach(([lx,ly])=>{ctx.fillStyle=C.ink;ctx.fillRect(lx-6,ly+32,12,6)});ctx.restore()}
