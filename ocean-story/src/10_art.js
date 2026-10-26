/* ===== Drawing kit: flat fills, one ink outline weight, dot and line pattern fills ===== */
const OL=4.5;
function pth(ctx,pts,close){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));if(close!==false)ctx.closePath()}
function dot(ctx,x,y,r,col){ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fillStyle=col;ctx.fill()}
function line(ctx,pts,col,w){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function ring(ctx,x,y,r,col,w){ctx.beginPath();ctx.arc(x,y,Math.max(.1,r),0,TAU);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke()}
function ell(ctx,x,y,rx,ry,rot){ctx.beginPath();ctx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),rot||0,0,TAU)}
/* fill a shape, paint a pattern clipped inside it, then outline it in ink */
function shape(ctx,build,fill,pat,lw){build(ctx);if(fill){ctx.fillStyle=fill;ctx.fill()}
  if(pat){ctx.save();build(ctx);ctx.clip();pat(ctx);ctx.restore()}
  if(lw!==0){build(ctx);ctx.lineWidth=lw||OL;ctx.strokeStyle=C.ink;ctx.lineJoin='round';ctx.stroke()}}
/* silhouette: ink stroked under, fill on top, so overlapping parts read as one outlined shape */
function sil(ctx,build,fill,lw){build(ctx);ctx.lineWidth=(lw||OL)*2;ctx.strokeStyle=C.ink;ctx.lineJoin='round';ctx.stroke();build(ctx);ctx.fillStyle=fill;ctx.fill()}
/* thick limb: ink under, colour on top */
function limb(ctx,pts,col,w,lw){line(ctx,pts,C.ink,w+(lw||OL)*2);line(ctx,pts,col,w)}

/* ---- pattern fills (call inside a clip) ---- */
function patDots(ctx,x0,y0,x1,y1,step,r,col,off){off=off||0;let row=0;for(let y=y0;y<=y1+step;y+=step,row++){const sh=(row%2?step/2:0)+off;
  for(let x=x0-step+((sh%step)+step)%step;x<=x1+step;x+=step)dot(ctx,x,y,r,col)}}
function patLines(ctx,x0,y0,x1,y1,step,ang,col,w,off){ctx.save();const cx0=(x0+x1)/2,cy0=(y0+y1)/2,R=Math.hypot(x1-x0,y1-y0)/2+step;ctx.translate(cx0,cy0);ctx.rotate(ang||0);
  ctx.beginPath();const o=((off||0)%step+step)%step;for(let x=-R+o;x<=R;x+=step){ctx.moveTo(x,-R);ctx.lineTo(x,R)}ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke();ctx.restore()}
function patScales(ctx,x0,y0,x1,y1,r,col,w,fill,off){let row=0;for(let y=y0-r;y<=y1+r;y+=r*.9,row++){const sh=(row%2?r:0)+(off||0);
  for(let x=x0-2*r+((sh%(2*r))+2*r)%(2*r);x<=x1+2*r;x+=2*r){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI);if(fill){ctx.fillStyle=fill;ctx.fill()}ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke()}}}
function patDiamonds(ctx,x0,y0,x1,y1,sz,col,w,dotc,off){let row=0;for(let y=y0;y<=y1+sz;y+=sz,row++)for(let x=x0-sz*2+(((off||0)%(sz*2))+sz*2)%(sz*2)+(row%2?sz:0);x<=x1+sz*2;x+=sz*2){
  pth(ctx,[[x,y-sz*.5],[x+sz*.55,y],[x,y+sz*.5],[x-sz*.55,y]]);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke();if(dotc)dot(ctx,x,y,sz*.12,dotc)}}
function leafPath(ctx,x,y,len,wid,ang){const c=Math.cos(ang),s=Math.sin(ang);const P=(u,v)=>[x+c*u-s*v,y+s*u+c*v];
  const a=P(0,0),b=P(len,0),c1=P(len*.5,-wid),c2=P(len*.5,wid);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.quadraticCurveTo(c1[0],c1[1],b[0],b[1]);ctx.quadraticCurveTo(c2[0],c2[1],a[0],a[1]);ctx.closePath()}
function leaf(ctx,x,y,len,wid,ang,fill,lw,vein){leafPath(ctx,x,y,len,wid,ang);ctx.fillStyle=fill;ctx.fill();ctx.lineWidth=lw||2.5;ctx.strokeStyle=C.ink;ctx.stroke();
  if(vein!==false){const c=Math.cos(ang),s=Math.sin(ang);line(ctx,[[x+c*len*.12,y+s*len*.12],[x+c*len*.85,y+s*len*.85]],C.ink,Math.max(1,(lw||2.5)*.6))}}
function patLeafRow(ctx,x0,x1,y,len,col,off){for(let x=x0-len*2+(((off||0)%(len*1.6))+len*1.6)%(len*1.6);x<x1+len;x+=len*1.6){leaf(ctx,x,y,len*.8,len*.26,-.5,col,2);leaf(ctx,x+len*.1,y+len*.1,len*.8,len*.26,.5,col,2)}}
/* small drawn-line sparkle: short strokes radiating, no glow */
function sparkle(ctx,x,y,r,k,rot){if(k<=0)return;ctx.save();ctx.translate(x,y);ctx.rotate(rot||0);const n=8;
  for(let i=0;i<n;i++){const a=i/n*TAU,r0=r*(.35+.25*(1-k)),r1=r0+r*(i%2?.35:.6)*k;line(ctx,[[Math.cos(a)*r0,Math.sin(a)*r0],[Math.cos(a)*r1,Math.sin(a)*r1]],C.ink,5);
    line(ctx,[[Math.cos(a)*r0,Math.sin(a)*r0],[Math.cos(a)*r1,Math.sin(a)*r1]],i%2?C.cream:C.turmeric,2.4)}
  for(let i=0;i<4;i++){const a=i/4*TAU+.4,rr=r*(.9+.2*k);dot(ctx,Math.cos(a)*rr,Math.sin(a)*rr,3.2*k,C.turmeric)}ctx.restore()}
/* text on canvas (fallback stacks) */
const FD='"Yatra One", "Kohinoor Devanagari", "Palatino Linotype", Georgia, serif',FB='"Baloo 2", "Trebuchet MS", "Segoe UI", system-ui, sans-serif';
function text(ctx,str,x,y,size,col,o){o=o||{};ctx.save();ctx.font=`${o.weight||700} ${size}px ${o.display?FD:FB}`;ctx.textAlign=o.align||'center';ctx.textBaseline='middle';
  if(o.outline){ctx.lineWidth=o.outline;ctx.strokeStyle=o.ocol||C.ink;ctx.lineJoin='round';ctx.strokeText(str,x,y)}ctx.fillStyle=col;ctx.fillText(str,x,y);ctx.restore()}
function wrap(ctx,str,maxW,size,display){ctx.save();ctx.font=`700 ${size}px ${display?FD:FB}`;const words=str.split(' '),out=[];let cur='';
  for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){out.push(cur);cur=w}else cur=t}if(cur)out.push(cur);ctx.restore();return out}

/* ===== Sky: indigo with dots and short lines, sun, moon, cloud motifs ===== */
function drawSun(ctx,x,y,r){for(let i=0;i<12;i++){const a=i/12*TAU;pth(ctx,[[x+Math.cos(a-.16)*r*1.05,y+Math.sin(a-.16)*r*1.05],[x+Math.cos(a)*r*1.55,y+Math.sin(a)*r*1.55],[x+Math.cos(a+.16)*r*1.05,y+Math.sin(a+.16)*r*1.05]]);
    ctx.fillStyle=i%2?C.verm:C.turmeric;ctx.fill();ctx.lineWidth=3;ctx.strokeStyle=C.ink;ctx.stroke()}
  shape(ctx,c=>{c.beginPath();c.arc(x,y,r,0,TAU)},C.turmeric,c=>{for(let i=0;i<14;i++){const a=i/14*TAU;dot(c,x+Math.cos(a)*r*.78,y+Math.sin(a)*r*.78,r*.06,C.verm)}},OL);
  ring(ctx,x,y,r*.6,C.ink,2.5);dot(ctx,x,y,r*.18,C.verm);ring(ctx,x,y,r*.18,C.ink,2.5)}
function drawMoon(ctx,x,y,r){const b=c=>{c.beginPath();c.arc(x,y,r,0,TAU);c.arc(x+r*.42,y-r*.22,r*.84,0,TAU,true)};
  shape(ctx,b,C.cream,c=>{patDots(c,x-r,y-r,x+r,y+r,r*.32,r*.05,C.turmeric)},OL)}
function drawCloud(ctx,x,y,w){const h=w*.32;const b=c=>{c.beginPath();c.moveTo(x-w/2,y+h*.3);c.arc(x-w*.28,y+h*.1,h*.42,Math.PI,TAU*.75+.2);
    c.arc(x,y-h*.12,h*.58,Math.PI*1.05,TAU-.05);c.arc(x+w*.28,y+h*.1,h*.42,Math.PI*1.3,TAU);c.lineTo(x+w/2,y+h*.3);c.closePath()};
  shape(ctx,b,C.cream,c=>{for(let k=0;k<3;k++){c.beginPath();c.moveTo(x-w*.42,y+h*(.12-k*.2));c.quadraticCurveTo(x,y+h*(.32-k*.2),x+w*.42,y+h*(.12-k*.2));c.strokeStyle=C.peacock;c.lineWidth=2.4;c.stroke()}},OL*.8)}
function drawBird(ctx,x,y,s,flap,f){ctx.save();ctx.translate(x,y);ctx.scale(s*(f||1),s);
  sil(ctx,c=>{c.beginPath();c.ellipse(0,0,20,9,0,0,TAU);c.moveTo(18,-4);c.lineTo(32,-2);c.lineTo(18,3);c.closePath();c.moveTo(-18,0);c.lineTo(-34,-8);c.lineTo(-30,6);c.closePath()},C.verm,2.4);
  dot(ctx,10,-2,2.6,C.ink);const wy=-6-flap*12;pth(ctx,[[-6,-3],[4,-3],[-4,wy-10],[-14,wy-4]]);ctx.fillStyle=C.turmeric;ctx.fill();ctx.lineWidth=2.4;ctx.strokeStyle=C.ink;ctx.stroke();
  line(ctx,[[-24,-3],[-28,3]],C.ink,1.6);ctx.restore()}
function paintSky(g,W,h,o){o=o||{};g.fillStyle=C.indigo;g.fillRect(0,0,W,h);const r=rng(o.seed||5);
  for(let i=0;i<Math.round(W*h/9000);i++){const x=r()*W,y=r()*h;if(r()<.6)dot(g,x,y,2.2,r()<.5?C.cream:C.turmeric);else line(g,[[x,y],[x+10,y]],C.peacock,3)}
  if(o.sun!==false){const sr=Math.min(h*.2,62);drawSun(g,o.sunX||W*.17,o.sunY||h*.42,sr);drawMoon(g,o.moonX||W*.83,o.moonY||h*.42,sr*.95)}
  (o.clouds||[]).forEach(c=>drawCloud(g,c[0],c[1],c[2]))}

/* ===== Waves: rows of scallops outlined in ink, baked once per row style ===== */
function waveStrip(key,W,lam,rh,base,arc){return Bake.get(key,W+lam*2,rh+lam*.6,(g,w,h)=>{const r=lam/2,top=r*.55;
  g.fillStyle=base;g.beginPath();g.moveTo(0,h);for(let x=0;x<=w+lam;x+=lam){g.arc(x+r,top+r*.3,r,Math.PI,TAU)}g.lineTo(w,h);g.closePath();g.fill();
  for(let x=0;x<=w+lam;x+=lam){g.beginPath();g.arc(x+r,top+r*.3,r*.62,Math.PI*1.08,TAU-.08);g.strokeStyle=arc;g.lineWidth=3;g.stroke();
    g.beginPath();g.arc(x+r,top+r*.3,r*.3,Math.PI*1.15,TAU-.15);g.strokeStyle=C.cream;g.lineWidth=2.2;g.stroke();dot(g,x+r,top+r*.3,2.6,C.cream)}
  g.beginPath();for(let x=0;x<=w+lam;x+=lam){g.moveTo(x,top+r*.3);g.arc(x+r,top+r*.3,r,Math.PI,TAU)}g.strokeStyle=C.ink;g.lineWidth=3.4;g.stroke()})}
/* draw rows of waves from y0 to y1; rows drift slowly side to side */
function drawWaves(ctx,W,y0,y1,o){o=o||{};const lam=o.lam||(L.portrait?92:104),rh=o.rh||lam*.42;const n=Math.ceil((y1-y0)/rh);const sp=o.speed==null?1:o.speed;
  for(let i=0;i<n;i++){const y=y0+i*rh;const k=(o.row0||0)+i;const st=waveStrip('wv'+(k%2)+'_'+lam,W,lam,rh,k%2?C.peacock:C.indigo,k%2?C.indigo:C.peacock);
    const ox=Math.sin(T.sec*.32*sp+k*.9)*lam*.22*MV()+(k%2?lam*.5:0);ctx.drawImage(st,-lam+ox-lam*.5,y-lam*.25,W+lam*2,rh+lam*.6)}}

/* ===== Decorative border: one Madhubani-inspired band used on every scene ===== */
function paintBorder(g,W,H,o){o=o||{};const b=BORDER;g.save();g.beginPath();g.rect(0,0,W,H);g.rect(b,b,W-2*b,H-2*b);g.fillStyle=C.cream;g.fill('evenodd');
  g.lineWidth=3;g.strokeStyle=C.ink;g.strokeRect(2,2,W-4,H-4);g.strokeRect(b-2,b-2,W-2*b+4,H-2*b+4);g.strokeRect(6,6,W-12,H-12);
  const run=(x0,y0,x1,y1)=>{const len=Math.hypot(x1-x0,y1-y0),ang=Math.atan2(y1-y0,x1-x0);g.save();g.translate(x0,y0);g.rotate(ang);
    g.beginPath();for(let u=0;u<=len;u+=4)g[u?'lineTo':'moveTo'](u,b/2+Math.sin(u/22)*3.5);g.strokeStyle=C.leaf;g.lineWidth=2.6;g.stroke();
    for(let u=14,i=0;u<len-10;u+=22,i++){const side=i%2?1:-1;leaf(g,u,b/2,9.5,3.6,side*-.9,C.leaf,1.4,false);dot(g,u+11,b/2-side*7.5,2,C.verm)}g.restore()};
  run(b,0,W-b,0);run(W,b,W,H-b);run(W-b,H,b,H);run(0,H-b,0,b);
  [[0,0],[W-b,0],[W-b,H-b],[0,H-b]].forEach(([x,y])=>{g.fillStyle=C.turmeric;g.fillRect(x+3,y+3,b-6,b-6);g.lineWidth=2.4;g.strokeStyle=C.ink;g.strokeRect(x+3,y+3,b-6,b-6);
    dot(g,x+b/2,y+b/2,5,C.verm);ring(g,x+b/2,y+b/2,5,C.ink,1.6);[[0,-1],[1,0],[0,1],[-1,0]].forEach(([dx,dy])=>dot(g,x+b/2+dx*9,y+b/2+dy*9,2,C.ink))});
  g.restore()}
function drawBorder(ctx,W,H,o){Bake.draw(ctx,'border'+(o&&o.key||''),0,0,W,H,(g)=>{paintBorder(g,W,H,o);if(o&&o.motifs)borderMotifs(g,W,H)})}
/* final screen: fish, lotus and shell from Scene 1.1 sit in the border corners */
function borderMotifs(g,W,H){const r=L.portrait?44:40,m=BORDER+r*.4;
  const spots=[[m+r*.6,m+r*.55,'fish'],[W-m-r*.6,m+r*.55,'lotus'],[m+r*.6,H-m-r*.55,'shell'],[W-m-r*.6,H-m-r*.55,'fish']];
  spots.forEach(([x,y,k],i)=>{shape(g,c=>{c.beginPath();c.arc(x,y,r,0,TAU)},C.cream,c=>patDots(c,x-r,y-r,x+r,y+r,13,1.8,C.turmeric),3.2);
    if(k==='fish')drawFish(g,x,y,r/62,i===3?-1:1,0);else if(k==='lotus')drawLotus(g,x,y+r*.15,r/70,2);else drawShell(g,x,y+r*.08,r/62)})}

/* ===== Clue motifs from Scene 1.1 (reused in the final border) ===== */
function drawFish(ctx,x,y,s,f,wig){ctx.save();ctx.translate(x,y);ctx.scale(s*(f||1),s);ctx.rotate((wig||0)*.25);
  const tail=(wig||0)*.5;
  shape(ctx,c=>{c.beginPath();c.moveTo(-34,0);c.lineTo(-62,-24+tail*10);c.quadraticCurveTo(-54,0,-62,24+tail*10);c.closePath()},C.verm,c=>patLines(c,-66,-30,-30,30,7,0,C.turmeric,2.2),3.5);
  shape(ctx,c=>{c.beginPath();c.moveTo(50,0);c.quadraticCurveTo(12,-40,-38,0);c.quadraticCurveTo(12,40,50,0);c.closePath()},C.turmeric,c=>patScales(c,-40,-34,30,34,8,C.verm,2.2),3.8);
  shape(ctx,c=>{c.beginPath();c.moveTo(4,-22);c.quadraticCurveTo(-6,-40,-18,-30);c.lineTo(-10,-18);c.closePath()},C.verm,null,3);
  shape(ctx,c=>{c.beginPath();c.ellipse(28,-4,11,8,0,0,TAU)},C.cream,null,3);dot(ctx,30,-4,4.2,C.ink);
  line(ctx,[[14,-14],[16,10]],C.ink,2.6);ctx.restore()}
function drawLotus(ctx,x,y,s,open){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  shape(ctx,c=>{c.beginPath();c.ellipse(0,26,62,15,0,0,TAU)},C.leaf,c=>patLines(c,-62,10,62,42,9,.6,C.ink,1.3),3.4);
  const o=clamp(open||0,0,2);
  const pet=(ang,len,wid,col)=>{ctx.save();ctx.rotate(ang);shape(ctx,c=>{c.beginPath();c.moveTo(0,14);c.quadraticCurveTo(-wid,-len*.45,0,-len);c.quadraticCurveTo(wid,-len*.45,0,14);c.closePath()},col,c=>{line(c,[[0,8],[0,-len*.8]],C.ink,1.6);line(c,[[-wid*.35,0],[0,-len*.7]],col===C.cream?C.verm:C.cream,1.6)},3.2);ctx.restore()};
  if(o>.5){const sp=o>1.5?1:.55;pet(-1.1*sp,44,16,C.verm);pet(1.1*sp,44,16,C.verm);pet(-.55*sp,52,17,C.cream);pet(.55*sp,52,17,C.cream)}
  pet(0,o>1.5?58:o>.5?56:50,o>.5?18:20,C.verm);if(o>1.5){dot(ctx,0,-6,7,C.turmeric);ring(ctx,0,-6,7,C.ink,2.4);for(let i=-2;i<=2;i++)dot(ctx,i*5,-17,2,C.turmeric)}
  ctx.restore()}
function drawShell(ctx,x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  const fan=c=>{c.beginPath();c.moveTo(0,32);for(let i=0;i<=8;i++){const a=Math.PI+i/8*Math.PI,ax=Math.cos(a)*52,ay=Math.sin(a)*48+8;if(i===0)c.lineTo(ax,ay);else{const pa=Math.PI+(i-.5)/8*Math.PI;c.quadraticCurveTo(Math.cos(pa)*62,Math.sin(pa)*58+8,ax,ay)}}c.closePath()};
  shape(ctx,fan,C.cream,c=>{for(let i=1;i<8;i++){const a=Math.PI+i/8*Math.PI;line(c,[[0,32],[Math.cos(a)*58,Math.sin(a)*54+8]],C.peacock,2.6)}for(let i=0;i<8;i++){const a=Math.PI+(i+.5)/8*Math.PI;dot(c,Math.cos(a)*36,Math.sin(a)*32+8,2.6,C.verm)}},3.8);
  shape(ctx,c=>{c.beginPath();c.moveTo(-14,26);c.lineTo(14,26);c.lineTo(8,40);c.lineTo(-8,40);c.closePath()},C.turmeric,null,3.2);ctx.restore()}

/* ===== Mount Mandara: leaf, diamond and parallel-line bands; pattern offset reads as rotation ===== */
function drawMandara(ctx,x,base,h,w,rot,tilt){ctx.save();ctx.translate(x,base);ctx.rotate((tilt||0)*MV());
  const body=c=>{c.beginPath();c.moveTo(-w/2,0);c.quadraticCurveTo(-w*.42,-h*.6,-w*.1,-h*.95);c.quadraticCurveTo(0,-h*1.02,w*.1,-h*.95);c.quadraticCurveTo(w*.42,-h*.6,w/2,0);c.closePath()};
  const off=(rot||0)*w*.18;
  shape(ctx,body,C.leaf,c=>{const bands=[[.0,.16,C.turmeric,'dia'],[.16,.3,C.verm,'lines'],[.3,.46,C.leaf,'leaf'],[.46,.58,C.turmeric,'dots'],[.58,.72,C.peacock,'lines2'],[.72,.86,C.leaf,'dia'],[.86,1.05,C.turmeric,'dots']];
    for(const [a,b,col,k] of bands){const y0=-h*b,y1=-h*a;c.fillStyle=col;c.fillRect(-w,y0,w*2,y1-y0+1);
      c.save();c.beginPath();c.rect(-w,y0,w*2,y1-y0);c.clip();
      if(k==='dia')patDiamonds(c,-w,y0+(y1-y0)/2,w,y0+(y1-y0)/2,(y1-y0)*.8,C.ink,2.2,C.verm,off);
      else if(k==='lines')patLines(c,-w,y0,w,y1,14,.5,C.turmeric,4,off);
      else if(k==='lines2')patLines(c,-w,y0,w,y1,12,0,C.cream,2.6,off);
      else if(k==='leaf')patLeafRow(c,-w,w,(y0+y1)/2,(y1-y0)*.62,C.turmeric,off);
      else patDots(c,-w,y0+(y1-y0)*.3,w,y1,(y1-y0)*.4,3,C.verm,off);
      c.restore();c.beginPath();c.moveTo(-w,y1);c.quadraticCurveTo(0,y1+(b<.9?h*.03:0),w,y1);c.strokeStyle=C.ink;c.lineWidth=2.8;c.stroke()}},OL);
  /* small trees on the peak */
  [[-.07,-.96,-.7],[0,-1.0,0],[.07,-.96,.7]].forEach(([u,v,a])=>leaf(ctx,w*u,h*v,h*.09,h*.025,-Math.PI/2+a*.6,C.leaf,2.6));
  ctx.restore()}

/* ===== Vasuki: a patterned serpent rope along a polyline ===== */
function catmull(P,n){const out=[];for(let i=0;i<P.length-1;i++){const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2;
  for(let j=0;j<n;j++){const t=j/n,t2=t*t,t3=t2*t;out.push([.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),
    .5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3)])}}out.push(P[P.length-1]);return out}
function drawSerpent(ctx,pts,wid,phase,o){o=o||{};const n=pts.length;if(n<2)return;const Lt=[],R=[],N=[];let acc=0;const S=[0];
  for(let i=1;i<n;i++){acc+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);S.push(acc)}
  for(let i=0;i<n;i++){const a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const l=Math.hypot(dx,dy)||1;dx/=l;dy/=l;N.push([-dy,dx]);
    const u=S[i]/acc;const taper=o.tail===false?1:clamp(u/.12,.25,1);const hw=wid/2*taper;Lt.push([pts[i][0]-dy*hw,pts[i][1]+dx*hw]);R.push([pts[i][0]+dy*hw,pts[i][1]-dx*hw])}
  const body=c=>{c.beginPath();Lt.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));for(let i=n-1;i>=0;i--)c.lineTo(R[i][0],R[i][1]);c.closePath()};
  shape(ctx,body,C.turmeric,c=>{/* scales: arcs laid along the body, offset by phase so they slide when pulled */
    const step=wid*.42;let k=0;for(let d=((phase||0)%step+step)%step;d<acc;d+=step,k++){let i=1;while(i<n-1&&S[i]<d)i++;const t=(d-S[i-1])/((S[i]-S[i-1])||1);
      const px=lerp(pts[i-1][0],pts[i][0],t),py=lerp(pts[i-1][1],pts[i][1],t);const nx=N[i][0],ny=N[i][1];const ang=Math.atan2(ny,nx)+Math.PI/2;
      for(const off of [-.22,.22]){const sx=px+nx*off*wid,sy=py+ny*off*wid;c.beginPath();c.arc(sx+Math.cos(ang)*step*.2*(k%2?1:-1)*0,sy,wid*.2,ang-Math.PI/2+Math.PI,ang+Math.PI/2+Math.PI);c.strokeStyle=C.verm;c.lineWidth=2.6;c.stroke()}
      dot(c,px,py,wid*.07,C.leaf)}},OL);
  if(o.head){const h=pts[n-1],p=pts[n-2]||h;const ang=Math.atan2(h[1]-p[1],h[0]-p[0]);ctx.save();ctx.translate(h[0],h[1]);ctx.rotate(ang);const s=wid/30;ctx.scale(s,s);
    shape(ctx,c=>{c.beginPath();c.ellipse(18,0,34,25,0,0,TAU)},C.turmeric,c=>patScales(c,-10,-25,50,25,7,C.verm,2.2),OL/s);
    shape(ctx,c=>{c.beginPath();c.ellipse(24,-9,9,8,0,0,TAU)},C.cream,null,3/s*1.6);dot(ctx,26,-9,4.2,C.ink);
    ctx.beginPath();ctx.arc(34,6,10,.15,1.3);ctx.strokeStyle=C.ink;ctx.lineWidth=3;ctx.stroke();
    shape(ctx,c=>{c.beginPath();c.moveTo(2,-22);c.lineTo(8,-38);c.lineTo(16,-24);c.lineTo(24,-40);c.lineTo(30,-22);c.closePath()},C.verm,null,3);dot(ctx,16,-30,2.6,C.turmeric);ctx.restore()}}

/* ===== Island ledges on which the groups stand ===== */
function drawLedge(ctx,x0,x1,y,h,seed){const r=rng(seed||3);const b=c=>{c.beginPath();c.moveTo(x0,y+h);c.quadraticCurveTo(x0+(x1-x0)*.05,y-6,x0+(x1-x0)*.2,y);c.lineTo(x0+(x1-x0)*.8,y);c.quadraticCurveTo(x1-(x1-x0)*.05,y-6,x1,y+h);
    for(let x=x1;x>x0;x-=26)c.arc(x-13,y+h,13,0,Math.PI,false);c.closePath()};
  shape(ctx,b,C.leaf,c=>{patLines(c,x0,y,x1,y+h,11,-.6,C.ink,1.4);for(let i=0;i<(x1-x0)/40;i++)dot(c,x0+r()*(x1-x0),y+10+r()*(h-16),3,C.turmeric)},OL);
  line(ctx,[[x0+(x1-x0)*.12,y+3],[x1-(x1-x0)*.12,y+3]],C.cream,3)}

/* ===== Golden ripple: a flat expanding patterned ring ===== */
function drawRipple(ctx,x,y,r,band,k){if(r<=1||k<=0)return;ctx.save();ctx.globalAlpha*=clamp(k,0,1);const ri=Math.max(0,r-band);
  ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.arc(x,y,ri,0,TAU,true);ctx.fillStyle=C.turmeric;ctx.fill('evenodd');
  const n=Math.max(8,Math.round(r*TAU/(band*.9)));for(let i=0;i<n;i++){const a=i/n*TAU;dot(ctx,x+Math.cos(a)*(r-band/2),y+Math.sin(a)*(r-band/2),band*.12,i%2?C.verm:C.cream)}
  ring(ctx,x,y,r,C.ink,3.5);if(ri>1)ring(ctx,x,y,ri,C.ink,3.5);ctx.restore()}
/* a ring with a hole: used where the ripple settles into the hero frame */
function drawFrameRing(ctx,x,y,ro,ri,W,H){ctx.save();ctx.beginPath();ctx.arc(x,y,ro,0,TAU);if(ri>1)ctx.arc(x,y,ri,0,TAU,true);ctx.fillStyle=C.turmeric;ctx.fill('evenodd');
  const band=ro-ri;if(ri>1&&band<200){const mid=(ro+ri)/2,n=Math.round(mid*TAU/26);for(let i=0;i<n;i++){const a=i/n*TAU;dot(ctx,x+Math.cos(a)*mid,y+Math.sin(a)*mid,Math.min(5,band*.16),i%2?C.verm:C.cream)}
    for(let i=0;i<n;i++){const a=(i+.5)/n*TAU;line(ctx,[[x+Math.cos(a)*(ri+3),y+Math.sin(a)*(ri+3)],[x+Math.cos(a)*(ri+band*.28),y+Math.sin(a)*(ri+band*.28)]],C.ink,1.8)}}
  ring(ctx,x,y,ro,C.ink,4);if(ri>1)ring(ctx,x,y,ri,C.ink,4);ctx.restore()}

/* ===== The explorer: the child's patterned highlight and hand cursor ===== */
function drawHighlight(ctx,x,y,r,t,k){if(k<=0)return;ctx.save();ctx.globalAlpha*=clamp(k,0,1);const pr=r*(1+.06*Math.sin(t*4)*MV());
  ring(ctx,x,y,pr,C.ink,7);ring(ctx,x,y,pr,C.cream,3.4);const n=Math.max(10,Math.round(pr/6));for(let i=0;i<n;i++){const a=i/n*TAU+t*.4*MV();dot(ctx,x+Math.cos(a)*(pr+9),y+Math.sin(a)*(pr+9),3.4,C.turmeric)}ctx.restore()}
function drawExplorerHand(ctx,x,y,s,press){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.rotate(-.35);const p=press?4:0;
  sil(ctx,c=>{c.beginPath();c.roundRect?c.roundRect(-7,-2+p,14,40,7):c.rect(-7,-2+p,14,40);c.roundRect?c.roundRect(-20,24+p,40,40,12):c.rect(-20,24+p,40,40);
    c.ellipse(-14,34+p,6,11,-.2,0,TAU);c.ellipse(13,30+p,6,10,.1,0,TAU)},C.cream,2.6);
  ctx.fillStyle=C.verm;ctx.fillRect(-18,60+p,36,8);ctx.lineWidth=2.4;ctx.strokeStyle=C.ink;ctx.strokeRect(-18,60+p,36,8);for(let i=-12;i<=12;i+=8)dot(ctx,i,64+p,1.8,C.turmeric);ctx.restore()}
