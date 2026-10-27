/* ===== Paths ===== */
function sp(pts,closed){const p=new Path2D(),n=pts.length;if(n<2)return p;
  if(!closed){p.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<n-1;i++){const a=pts[i],b=pts[i+1];p.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2)}p.lineTo(pts[n-1][0],pts[n-1][1]);return p}
  const l=pts[n-1],f=pts[0];p.moveTo((l[0]+f[0])/2,(l[1]+f[1])/2);for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n];p.quadraticCurveTo(a[0],a[1],(a[0]+b[0])/2,(a[1]+b[1])/2)}p.closePath();return p}
function pl(pts,closed){const p=new Path2D();p.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)p.lineTo(pts[i][0],pts[i][1]);if(closed)p.closePath();return p}
function ell(x,y,rx,ry,rot){const p=new Path2D();p.ellipse(x,y,rx,ry==null?rx:ry,rot||0,0,TAU);return p}
function rrect(x,y,w,h,r){const p=new Path2D();p.moveTo(x+r,y);p.arcTo(x+w,y,x+w,y+h,r);p.arcTo(x+w,y+h,x,y+h,r);p.arcTo(x,y+h,x,y,r);p.arcTo(x,y,x+w,y,r);p.closePath();return p}
/* pointed oval (petal / leaf) from a base point along an angle */
function petal(x,y,len,wid,ang){const p=new Path2D(),c=Math.cos(ang),s=Math.sin(ang),nx=-s,ny=c,tx=x+c*len,ty=y+s*len,mx=x+c*len*.5,my=y+s*len*.5;
  p.moveTo(x,y);p.quadraticCurveTo(mx+nx*wid,my+ny*wid,tx,ty);p.quadraticCurveTo(mx-nx*wid,my-ny*wid,x,y);p.closePath();return p}
function bb(x,y,w,h){return{x,y,w,h}}

/* ===== Outlines: Madhubani double line = thick ink stroke with a light gap stroked down its middle ===== */
function outline(g,p,w,mode,gap){if(mode==='none')return;g.strokeStyle=C.ink;
  if(mode==='single'){g.lineWidth=w;g.stroke(p);return}
  g.lineWidth=w*2.3;g.stroke(p);g.strokeStyle=gap||C.cream;g.lineWidth=w*.95;g.stroke(p)}
function shape(g,p,fill,pat,o){o=o||{};if(fill){g.fillStyle=fill;g.fill(p)}if(pat){g.save();g.clip(p);pat(g);g.restore()}outline(g,p,o.lw||2.6,o.line||'dbl',o.gap)}
function line(g,pts,col,lw,smooth){g.strokeStyle=col;g.lineWidth=lw;g.stroke(smooth?sp(pts):pl(pts))}
function dot(g,x,y,r,col){g.fillStyle=col;g.beginPath();g.arc(x,y,r,0,TAU);g.fill()}
function ring(g,x,y,r,col,lw,ry){if(!(r>0))return;g.strokeStyle=col;g.lineWidth=lw;g.beginPath();g.ellipse(x,y,r,Math.max(.1,ry==null?r:ry),0,0,TAU);g.stroke()}

/* ===== Pattern fills (drawn inside a clip) ===== */
const Pat={
  dots(g,b,col,st,r){st=st||12;r=r||1.8;g.fillStyle=col;g.beginPath();let row=0;for(let y=b.y+st/2;y<b.y+b.h+st;y+=st,row++)for(let x=b.x+(row%2?st/2:0);x<b.x+b.w+st;x+=st){g.moveTo(x+r,y);g.arc(x,y,r,0,TAU)}g.fill()},
  hatch(g,b,col,st,lw,dir){st=st||8;g.strokeStyle=col;g.lineWidth=lw||1.2;g.beginPath();for(let k=-b.h;k<b.w+b.h;k+=st){if(dir===-1){g.moveTo(b.x+k+b.h,b.y);g.lineTo(b.x+k,b.y+b.h)}else{g.moveTo(b.x+k,b.y);g.lineTo(b.x+k+b.h,b.y+b.h)}}g.stroke()},
  hlines(g,b,col,st,lw){st=st||8;g.strokeStyle=col;g.lineWidth=lw||1.2;g.beginPath();for(let y=b.y+st/2;y<b.y+b.h;y+=st){g.moveTo(b.x,y);g.lineTo(b.x+b.w,y)}g.stroke()},
  vlines(g,b,col,st,lw){st=st||8;g.strokeStyle=col;g.lineWidth=lw||1.2;g.beginPath();for(let x=b.x+st/2;x<b.x+b.w;x+=st){g.moveTo(x,b.y);g.lineTo(x,b.y+b.h)}g.stroke()},
  scales(g,b,col,r,lw){r=r||10;g.strokeStyle=col;g.lineWidth=lw||1.4;g.beginPath();let row=0;for(let y=b.y;y<b.y+b.h+r;y+=r*.85,row++)for(let x=b.x+(row%2?r:0)-r;x<b.x+b.w+r*2;x+=r*2){g.moveTo(x+r,y);g.arc(x,y,r,0,Math.PI)}g.stroke()},
  diamonds(g,b,col,st,fill){st=st||18;g.beginPath();let row=0;for(let y=b.y;y<b.y+b.h+st;y+=st*.7,row++)for(let x=b.x+(row%2?st/2:0);x<b.x+b.w+st;x+=st){const h=st*.32;g.moveTo(x,y-h);g.lineTo(x+h*.8,y);g.lineTo(x,y+h);g.lineTo(x-h*.8,y);g.closePath()}
    if(fill){g.fillStyle=col;g.fill()}else{g.strokeStyle=col;g.lineWidth=1.3;g.stroke()}},
  petals(g,b,col,st){st=st||24;g.fillStyle=col;let row=0;for(let y=b.y;y<b.y+b.h+st;y+=st*.8,row++)for(let x=b.x+(row%2?st/2:0);x<b.x+b.w+st;x+=st)g.fill(petal(x-st*.3,y,st*.6,st*.16,row%2?.5:-.5))},
  waves(g,b,col,st,lw){st=st||18;g.strokeStyle=col;g.lineWidth=lw||1.6;g.beginPath();let row=0;for(let y=b.y+st*.6;y<b.y+b.h+st;y+=st*.62,row++){const o=row%2?st/2:0;g.moveTo(b.x-st+o,y);for(let x=b.x-st+o;x<b.x+b.w+st;x+=st)g.quadraticCurveTo(x+st/2,y-st*.55,x+st,y)}g.stroke()},
  tri(g,b,col,st,down){st=st||14;g.fillStyle=col;g.beginPath();for(let x=b.x;x<b.x+b.w;x+=st){if(down){g.moveTo(x,b.y);g.lineTo(x+st/2,b.y+b.h);g.lineTo(x+st,b.y)}else{g.moveTo(x,b.y+b.h);g.lineTo(x+st/2,b.y);g.lineTo(x+st,b.y+b.h)}g.closePath()}g.fill()},
  flowers(g,b,col,st,mid){st=st||28;let row=0;for(let y=b.y+st/2;y<b.y+b.h+st;y+=st*.8,row++)for(let x=b.x+(row%2?st/2:0);x<b.x+b.w+st;x+=st){g.fillStyle=col;g.beginPath();for(let k=0;k<5;k++){const a=k*TAU/5;g.moveTo(x+Math.cos(a)*st*.17+st*.09,y+Math.sin(a)*st*.17);g.arc(x+Math.cos(a)*st*.17,y+Math.sin(a)*st*.17,st*.09,0,TAU)}g.fill();dot(g,x,y,st*.07,mid||C.ink)}},
  checks(g,b,col,st){st=st||16;g.fillStyle=col;let row=0;for(let y=b.y;y<b.y+b.h;y+=st,row++)for(let x=b.x+(row%2?st:0);x<b.x+b.w;x+=st*2)g.fillRect(x,y,st,st)},
  chevron(g,b,col,st,lw){st=st||16;g.strokeStyle=col;g.lineWidth=lw||1.5;g.beginPath();for(let y=b.y;y<b.y+b.h+st;y+=st*.6){g.moveTo(b.x,y);for(let x=b.x;x<b.x+b.w+st;x+=st){g.lineTo(x+st/2,y-st*.3);g.lineTo(x+st,y)}}g.stroke()},
  hex(g,b,col,r,lw){r=r||16;g.strokeStyle=col;g.lineWidth=lw||1.6;g.beginPath();const h=r*Math.sqrt(3);let row=0;for(let y=b.y;y<b.y+b.h+h;y+=h/2,row++)for(let x=b.x+(row%2?r*1.5:0);x<b.x+b.w+r*3;x+=r*3){for(let k=0;k<=6;k++){const a=k*TAU/6;const px=x+Math.cos(a)*r,py=y+Math.sin(a)*r;k?g.lineTo(px,py):g.moveTo(px,py)}}g.stroke()}};

/* ===== Motifs ===== */
/* side-view lotus: petals fan upward from the base point (x,y); open 0..1 */
function lotus(g,x,y,r,o){o=o||{};const col=o.col||C.pink,col2=o.col2||C.coral,open=o.open==null?1:o.open,lw=o.lw||Math.max(1.2,r*.035);
  const spread=lerp(.18,1,open);const back=[-1,-.5,0,.5,1],front=[-.62,0,.62];
  back.forEach(k=>{const a=-Math.PI/2+k*1.25*spread;shape(g,petal(x,y,r,r*.3,a),col,gg=>{gg.strokeStyle=C.ink;gg.lineWidth=lw*.6;gg.beginPath();gg.moveTo(x,y);gg.lineTo(x+Math.cos(a)*r*.8,y+Math.sin(a)*r*.8);gg.stroke()},{lw})});
  front.forEach(k=>{const a=-Math.PI/2+k*1.1*spread;shape(g,petal(x,y,r*.74,r*.26,a),col2,gg=>Pat.dots(gg,bb(x-r,y-r,r*2,r),C.cream,r*.18,r*.035),{lw})});
  shape(g,ell(x,y+r*.06,r*.5,r*.14),C.leaf,null,{lw,line:'single'})}
/* top-view flower used in borders, rangoli and mandalas */
function flowerTop(g,x,y,r,col,col2,n){n=n||8;for(let k=0;k<n;k++){const a=k*TAU/n;shape(g,petal(x,y,r,r*.34,a),col,null,{lw:Math.max(1,r*.06),line:'single'})}
  shape(g,ell(x,y,r*.32),col2||C.gold,null,{lw:Math.max(1,r*.06),line:'single'})}
function fish(g,x,y,s,col,dir,t){g.save();g.translate(x,y);g.scale(s*(dir<0?-1:1),s);const w=Math.sin((t||0)*6)*.12;
  const body=sp([[-30,0],[-8,-14],[18,-10],[30,0],[18,10],[-8,14]],true);
  shape(g,pl([[-26,0],[-44,-14+w*20],[-40,0],[-44,14+w*20]],true),C.gold,null,{lw:1.4,line:'single'});
  shape(g,body,col,gg=>{Pat.scales(gg,bb(-30,-14,52,28),C.ink,4.5,.9)},{lw:1.6});
  shape(g,ell(18,-3,4.5),C.cream,gg=>dot(gg,19,-3,2,C.ink),{lw:1,line:'single'});
  g.strokeStyle=C.ink;g.lineWidth=1.2;g.beginPath();g.moveTo(8,-12);g.lineTo(8,12);g.stroke();g.restore()}
function star(g,x,y,r,col,pts){pts=pts||4;const p=new Path2D();for(let k=0;k<pts*2;k++){const a=k*Math.PI/pts-Math.PI/2,rr=k%2?r*.38:r;k?p.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr):p.moveTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}p.closePath();
  g.fillStyle=col;g.fill(p);g.strokeStyle=C.ink;g.lineWidth=Math.max(.8,r*.12);g.stroke(p)}
/* ornamental cloud: scalloped top, flat base, spiral curls */
function cloud(g,x,y,s,col,lineCol){g.save();g.translate(x,y);g.scale(s,s);const p=new Path2D();p.moveTo(-90,10);
  p.arc(-62,0,28,Math.PI*.9,Math.PI*1.75);p.arc(-18,-16,34,Math.PI*1.1,Math.PI*1.9);p.arc(30,-8,30,Math.PI*1.15,Math.PI*1.95);p.arc(66,2,24,Math.PI*1.2,Math.PI*2.1);p.lineTo(90,10);p.closePath();
  shape(g,p,col||C.cream,null,{lw:2.2});g.strokeStyle=lineCol||C.ink;g.lineWidth=1.6;
  [[-62,2,10],[-18,-12,13],[30,-6,11]].forEach(([a,b,r])=>{g.beginPath();for(let k=0;k<26;k++){const t=k/25,ang=t*TAU*1.6,rr=r*t;k?g.lineTo(a+Math.cos(ang)*rr,b+Math.sin(ang)*rr):g.moveTo(a,b)}g.stroke()});
  g.beginPath();g.moveTo(-80,6);g.lineTo(80,6);g.stroke();g.restore()}
/* flat concentric rings (never blurred) */
function rings(g,x,y,r0,n,step,col,lw,alpha,ry){g.save();for(let k=0;k<n;k++){g.globalAlpha=(alpha==null?1:alpha)*(1-k/(n+1));ring(g,x,y,r0+k*step,col,lw,ry==null?null:(ry*(r0+k*step)/r0))}g.restore()}
/* petal rays */
function rays(g,x,y,r0,r1,n,col,rot,alpha){g.save();g.globalAlpha=alpha==null?1:alpha;for(let k=0;k<n;k++){const a=(rot||0)+k*TAU/n;shape(g,petal(x+Math.cos(a)*r0,y+Math.sin(a)*r0,r1-r0,(r1-r0)*.14,a),col,null,{lw:1.4,line:'single'})}g.restore()}
/* mandala: concentric bands of petals, dots and triangles; p = reveal progress 0..1 */
function mandala(g,x,y,r,o){o=o||{};const p=o.p==null?1:o.p,rot=o.rot||0,sy=o.sy||1,cols=o.cols||[C.gold,C.coral,C.cream,C.turq];g.save();g.translate(x,y);g.scale(1,sy);g.rotate(rot);
  const bands=[1,.82,.64,.46,.28];bands.forEach((f,i)=>{const k=clamp(p*bands.length-(bands.length-1-i),0,1);if(k<=0)return;const rr=r*f*Ease.out(k),n=8+i*0;
    if(i%2===0){const m=Math.round(12+f*16);for(let j=0;j<m;j++){const a=j*TAU/m;shape(g,petal(Math.cos(a)*rr*.72,Math.sin(a)*rr*.72,rr*.28,rr*.07,a),cols[i%cols.length],null,{lw:1.4/sy,line:'single'})}}
    else{g.fillStyle=cols[i%cols.length];g.beginPath();const m=Math.round(10+f*24);for(let j=0;j<m;j++){const a=j*TAU/m;g.moveTo(Math.cos(a)*rr*.86,Math.sin(a)*rr*.86);g.arc(Math.cos(a)*rr*.86,Math.sin(a)*rr*.86,Math.max(2,rr*.035),0,TAU)}g.fill()}
    ring(g,0,0,rr,C.ink,2/sy);ring(g,0,0,rr*.94,C.ink,1/sy);void n});
  if(p>.8)flowerTop(g,0,0,r*.14,C.pink,C.gold,8);g.restore()}
/* stylised teardrop flame: outer saffron, inner gold, double outline; gentle sway */
function flame(g,x,y,s,t){const sw=reduceMotion?0:Math.sin((t||0)*5.3)*2.2*s,h=26*s;
  const out=new Path2D();out.moveTo(x,y);out.quadraticCurveTo(x-11*s,y-h*.45,x+sw,y-h);out.quadraticCurveTo(x+11*s,y-h*.45,x,y);out.closePath();
  shape(g,out,C.saffron,null,{lw:1.3*s,gap:C.gold});const inn=new Path2D();inn.moveTo(x,y-2*s);inn.quadraticCurveTo(x-5*s,y-h*.4,x+sw*.6,y-h*.7);inn.quadraticCurveTo(x+5*s,y-h*.4,x,y-2*s);g.fillStyle=C.gold;g.fill(inn)}
/* PROP-02 diya: one brass lamp design */
function diya(g,x,y,s,t,lit,glow){g.save();g.translate(x,y);g.scale(s,s);
  if(lit&&glow)rings(g,22,-34,18,4,10,C.gold,3,glow);
  const bowl=new Path2D();bowl.moveTo(-34,-10);bowl.quadraticCurveTo(-30,8,0,9);bowl.quadraticCurveTo(26,8,34,-6);bowl.lineTo(44,-14);bowl.quadraticCurveTo(30,-12,24,-10);bowl.closePath();
  shape(g,bowl,C.agold,gg=>{Pat.tri(gg,bb(-36,-4,70,8),C.dgold,8,true);Pat.dots(gg,bb(-36,0,70,10),C.cream,7,1.4)},{lw:1.8});
  shape(g,ell(0,-10,34,5),C.dgold,null,{lw:1.4,line:'single'});
  shape(g,pl([[-14,9],[14,9],[10,15],[-10,15]],true),C.agold,null,{lw:1.4,line:'single'});
  if(lit)flame(g,38,-15,1,t);g.restore()}
/* PROP-01 the golden amrita vessel (kalasha): base at (x,y), about 130 tall at s=1 */
function kalasha(g,x,y,s,t,glow){g.save();g.translate(x,y);g.scale(s,s);
  if(glow){rings(g,0,-62,62,4,13,C.gold,3,glow);rays(g,0,-62,70,98,16,C.gold,(t||0)*.1,glow*.8)}
  shape(g,pl([[-20,0],[20,0],[15,-14],[-15,-14]],true),C.agold,gg=>Pat.vlines(gg,bb(-20,-14,40,14),C.dgold,5,1.2),{lw:1.8});
  const belly=sp([[-14,-12],[-44,-30],[-50,-58],[-36,-86],[-18,-94],[18,-94],[36,-86],[50,-58],[44,-30],[14,-12]],true);
  shape(g,belly,C.gold,gg=>{gg.fillStyle=C.agold;gg.fillRect(-52,-64,104,14);Pat.diamonds(gg,bb(-52,-62,104,10),C.verm,13,true);
    Pat.dots(gg,bb(-52,-48,104,14),C.dgold,8,1.6);for(let k=-3;k<=3;k++)gg.fill(petal(k*13,-20,26,6,-Math.PI/2));
    gg.fillStyle=C.coral;for(let k=-3;k<=3;k++)gg.fill(petal(k*13,-20,18,4,-Math.PI/2));gg.strokeStyle=C.dgold;gg.lineWidth=1.4;gg.beginPath();gg.moveTo(-50,-74);gg.lineTo(50,-74);gg.stroke()},{lw:2});
  shape(g,pl([[-16,-92],[16,-92],[14,-104],[-14,-104]],true),C.agold,gg=>Pat.hlines(gg,bb(-16,-104,32,12),C.dgold,4,1.2),{lw:1.8});
  shape(g,ell(0,-106,28,7),C.gold,null,{lw:1.8});shape(g,ell(0,-107,20,4),C.cream,null,{lw:1.2,line:'single'});
  const tt=t||0;for(let k=0;k<3;k++){const ph=(tt*.35+k/3)%1,yy=-112-ph*44,xx=(k-1)*15+Math.sin(tt*1.5+k)*4;g.globalAlpha=1-ph*.6;flowerTop(g,xx,yy,5.5-ph*1.5,C.gold,C.cream,6);g.globalAlpha=1}
  g.restore()}
/* repeated rows of the cosmic ocean (ENV-01); rows scroll gently */
function sea(g,y0,y1,o){const B=L.B,x0=B.x-30,x1=B.x+B.w+30,row=o.row||46,cols=o.cols,t=o.t||0,len=o.len||88,lc=o.line||C.pale;
  g.fillStyle=cols[0];g.fillRect(x0,y0+8,x1-x0,y1-y0);let i=0;
  for(let y=y0;y<y1;y+=row,i++){const c=cols[i%cols.length],sp_=(o.spd==null?12:o.spd)*(i%2?1:-1),off=((t*sp_)%len+len)%len-len;
    const crest=new Path2D();crest.moveTo(x0+off,y+10);for(let x=x0+off;x<x1+len;x+=len)crest.quadraticCurveTo(x+len/2,y-12,x+len,y+10);
    const body=new Path2D(crest);body.lineTo(x1+len,y1+4);body.lineTo(x0+off,y1+4);body.closePath();g.fillStyle=c;g.fill(body);
    g.strokeStyle=lc;g.lineWidth=2.4;g.stroke(crest);g.save();g.translate(0,7);g.lineWidth=1.2;g.stroke(crest);g.restore();
    if(o.dots!==false){g.fillStyle=lc;g.beginPath();for(let x=x0+off+len/2;x<x1+len;x+=len){g.moveTo(x+2.2,y+20);g.arc(x,y+20,2.2,0,TAU)}g.fill()}}
  (o.circles||[]).forEach(([cx_,cy_,r])=>{rings(g,cx_,cy_,r,3,r*.45,lc,1.6,.85,r*.42)})}
/* sky (ENV-02): flat ground, tiny stars and dots, deterministic */
function skyField(g,col,o){o=o||{};const B=L.B;g.fillStyle=col;g.fillRect(B.x-2,B.y-2,B.w+4,B.h+4);const r=rng(o.seed||7);const n=Math.round(B.w*B.h/(o.density||9000));
  for(let k=0;k<n;k++){const x=B.x+r()*B.w,y=B.y+r()*(o.maxY?Math.min(B.h,o.maxY-B.y):B.h),tw=r();if(tw<.18)star(g,x,y,5+r()*4,o.star||C.gold,4);else dot(g,x,y,1.4+r()*1.6,o.dot||C.cream)}}
/* peacock motif */
function peacock(g,x,y,s,dir,col){g.save();g.translate(x,y);g.scale(s*(dir<0?-1:1),s);col=col||C.deep;
  for(let k=0;k<5;k++){const a=Math.PI*.95+k*.13;shape(g,petal(-14,-6,70,10,a),C.leaf,gg=>{},{lw:1.2,line:'single'});const ex=-14+Math.cos(a)*62,ey=-6+Math.sin(a)*62;shape(g,ell(ex,ey,7,5,a),C.turq,gg=>dot(gg,ex,ey,2.5,C.deep),{lw:1,line:'single'})}
  shape(g,sp([[-24,0],[-10,-16],[12,-14],[22,0],[8,10],[-14,10]],true),col,gg=>Pat.scales(gg,bb(-24,-16,48,26),C.turq,4,1),{lw:1.6});
  shape(g,sp([[10,-12],[16,-30],[22,-44],[30,-46],[28,-38],[20,-28],[18,-10]],true),col,null,{lw:1.4});
  dot(g,27,-43,1.6,C.cream);[[24,-48],[27,-52],[30,-50]].forEach(([a,b])=>{line(g,[[25,-46],[a,b]],C.ink,1);dot(g,a,b,1.6,C.gold)});
  line(g,[[30,-44],[36,-42]],C.saffron,2.2);line(g,[[2,10],[0,22]],C.ink,1.6);line(g,[[10,10],[12,22]],C.ink,1.6);g.restore()}
/* hanging mango-leaf toran across (x0..x1) at y */
function toran(g,x0,x1,y,s){s=s||1;shape(g,pl([[x0,y-3],[x1,y-3],[x1,y+3],[x0,y+3]],true),C.dgold,null,{lw:1.4,line:'single'});
  for(let x=x0+12*s;x<x1-6;x+=22*s){shape(g,petal(x,y+2,30*s,7*s,Math.PI/2+Math.sin(x)*.12),C.leaf,gg=>{},{lw:1.3,line:'single'});line(g,[[x,y+4],[x,y+26*s]],C.ink,.8)}}
/* sagging marigold garland */
function garland(g,x0,y0,x1,y1,sag,s){s=s||1;const n=Math.max(6,Math.round(Math.hypot(x1-x0,y1-y0)/(13*s)));for(let k=0;k<=n;k++){const t=k/n,x=lerp(x0,x1,t),y=lerp(y0,y1,t)+Math.sin(t*Math.PI)*sag;
  shape(g,ell(x,y,7.5*s),k%3===2?C.gold:C.saffron,gg=>Pat.dots(gg,bb(x-8*s,y-8*s,16*s,16*s),C.verm,4*s,1*s),{lw:1.1,line:'single'})}}
/* rangoli: top-view mandala in festival colours */
function rangoli(g,x,y,r,sy,p){mandala(g,x,y,r,{sy:sy||.42,p:p==null?1:p,cols:[C.saffron,C.verm,C.gold,C.pink,C.leaf]})}

/* ===== Small icons (also rendered into buttons): drawn centred, radius about 50 ===== */
function drawIcon(g,k,s){g.save();g.scale(s||1,s||1);g.lineCap='round';g.lineJoin='round';
  switch(k){
    case'leaf':shape(g,petal(-30,30,84,22,-Math.PI/4),C.leaf,gg=>{gg.strokeStyle=C.cream;gg.lineWidth=2;gg.beginPath();gg.moveTo(-30,30);gg.lineTo(28,-28);for(let j=0;j<4;j++){const t=.2+j*.18;gg.moveTo(-30+58*t,30-58*t);gg.lineTo(-30+58*t-14,30-58*t-6);gg.moveTo(-30+58*t,30-58*t);gg.lineTo(-30+58*t+6,30-58*t+14)}gg.stroke()},{lw:2.2});line(g,[[-30,30],[-42,42]],C.ink,3);break;
    case'pot':shape(g,sp([[-16,-34],[-34,-10],[-36,16],[-20,36],[20,36],[36,16],[34,-10],[16,-34]],true),C.rust,gg=>{Pat.tri(gg,bb(-40,-6,80,12),C.cream,10,true);Pat.dots(gg,bb(-40,10,80,22),C.agold,9,1.8)},{lw:2.2});
      shape(g,ell(0,-36,20,6),C.rust,null,{lw:2});shape(g,ell(0,-37,13,3.5),C.turq,null,{lw:1.2,line:'single'});[[-6,-50],[6,-56]].forEach(([a,b])=>shape(g,ell(a,b,3.5,5),C.turq,null,{lw:1,line:'single'}));break;
    case'bowl':[[-16,-14,C.leaf],[0,-20,C.coral],[16,-14,C.gold],[-6,-8,C.cream],[9,-6,C.saffron]].forEach(([a,b,c])=>shape(g,ell(a,b,11),c,null,{lw:1.6,line:'single'}));
      shape(g,sp([[-44,-6],[-34,20],[0,30],[34,20],[44,-6]],false),C.agold,gg=>Pat.diamonds(gg,bb(-44,-6,88,36),C.dgold,12,true),{lw:2.2});shape(g,ell(0,-6,44,7),C.agold,null,{lw:1.6,line:'single'});break;
    case'hands':{const hand=dir=>{const p=sp([[0,36],[dir*4,-30],[dir*10,-44],[dir*20,-36],[dir*26,-4],[dir*30,30],[dir*18,40]],true);shape(g,p,C.agold,gg=>{gg.strokeStyle=C.ink;gg.lineWidth=1.2;gg.beginPath();for(let j=0;j<3;j++){gg.moveTo(dir*(8+j*5),-34+j*4);gg.lineTo(dir*(12+j*5),-12+j*3)}gg.stroke()},{lw:2})};
      hand(-1);hand(1);shape(g,rrect(-34,30,68,14,5),C.verm,gg=>Pat.dots(gg,bb(-34,30,68,14),C.gold,7,1.5),{lw:1.8});break}
    case'heart':{const p=new Path2D();p.moveTo(0,36);p.bezierCurveTo(-56,-4,-30,-48,0,-18);p.bezierCurveTo(30,-48,56,-4,0,36);p.closePath();shape(g,p,C.verm,gg=>Pat.dots(gg,bb(-50,-46,100,84),C.pink,10,2),{lw:2.2});break}
    case'book':{const pg=dir=>{const p=sp([[0,-26],[dir*20,-34],[dir*44,-30],[dir*44,26],[dir*20,22],[0,30]],true);shape(g,p,C.cream,gg=>Pat.hlines(gg,bb(dir>0?6:-40,-24,34,46),C.grey,7,1.2),{lw:2})};
      shape(g,pl([[-48,30],[0,36],[48,30],[48,36],[0,42],[-48,36]],true),C.verm,null,{lw:1.6,line:'single'});pg(-1);pg(1);break}
    case'friends':{const kid=(x,col,sc)=>{shape(g,pl([[x-14,40],[x-11,4],[x+11,4],[x+14,40]],true),col,gg=>Pat.dots(gg,bb(x-16,0,32,42),C.cream,7,1.4),{lw:1.8});shape(g,ell(x,-12,12,14),C.agold,null,{lw:1.8});shape(g,ell(x,-20,12,7),C.ink,null,{line:'none'});void sc};
      kid(-20,C.saffron);kid(20,C.pink);line(g,[[-9,14],[0,4],[9,14]],C.ink,7);line(g,[[-9,14],[0,4],[9,14]],C.agold,4);line(g,[[-31,10],[-38,-8]],C.ink,7);line(g,[[-31,10],[-38,-8]],C.agold,4);line(g,[[31,10],[38,-8]],C.ink,7);line(g,[[31,10],[38,-8]],C.agold,4);break}
    case'plant':shape(g,pl([[-24,10],[24,10],[18,40],[-18,40]],true),C.rust,gg=>Pat.tri(gg,bb(-26,12,52,10),C.cream,9,true),{lw:2});line(g,[[0,10],[0,-34]],C.leaf,4);
      [[-1,-8],[1,-18],[-1,-28],[1,-38]].forEach(([d,y])=>shape(g,petal(0,y+8,26,7,d<0?-Math.PI*.8:-Math.PI*.2),C.leaf,null,{lw:1.4,line:'single'}));break;
    case'water':shape(g,pl([[-20,-30],[20,-30],[14,36],[-14,36]],true),C.pale,gg=>{gg.fillStyle=C.turq;gg.fillRect(-24,-6,48,44);Pat.waves(gg,bb(-24,-8,48,44),C.pale,10,1.4)},{lw:2});
      shape(g,petal(28,-30,20,7,Math.PI/2),C.turq,null,{lw:1.4,line:'single'});break;
    case'read':drawIcon(g,'book',.62);g.translate(0,-38);shape(g,ell(-26,0,10,12),C.agold,null,{lw:1.6});shape(g,ell(26,4,8,10),C.agold,null,{lw:1.6});break;
    case'help':drawIcon(g,'hands',.8);break;
    case'lamp':diya(g,-6,26,1.25,0,true,0);break;
    case'lotus':lotus(g,0,30,56,{col:C.pink,col2:C.coral});break;
    case'health':drawIcon(g,'leaf',.95);break;
    case'friendship':drawIcon(g,'friends',1);break;
    case'knowledge':drawIcon(g,'book',1);break;
    case'kindness':drawIcon(g,'hands',.95);break;
    case'share':kalasha(g,0,44,.66,0,0);break;
    case'elephant':airavata(g,-14,46,.34);break;
    case'horse':celestialHorse(g,-20,50,.34,0);break;
    case'tree':kalpavriksha(g,0,50,.32,1,0);break;
    case'w-living':case'w-water':case'w-celestial':worldMedal(g,0,0,46,k.slice(2),false,0);break}
  g.restore()}
function iconCanvas(k,px){const c=document.createElement('canvas');px=px||72;const r=Math.min(2,window.devicePixelRatio||1);c.width=c.height=Math.round(px*r);c.className='ic';c.setAttribute('aria-hidden','true');
  const g=c.getContext('2d');g.scale(px*r/120,px*r/120);g.translate(60,60);try{drawIcon(g,k,1)}catch(e){}return c}

/* ===== Madhubani border frame around the whole stage (never over the interactive art) ===== */
function frame(g,cols){const B=L.B,w=clamp(Math.min(L.pw,L.ph)*.022,8,18)/L.s,x=B.x,y=B.y,W=B.w,H=B.h;cols=cols||[C.verm,C.gold];
  const band=new Path2D();band.rect(x,y,W,H);band.rect(x+w,y+w,W-2*w,H-2*w);g.save();g.fillStyle=cols[0];g.fill(band,'evenodd');g.clip(band,'evenodd');
  const st=w*1.4;g.fillStyle=cols[1];g.beginPath();for(let k=x;k<x+W;k+=st){g.moveTo(k,y+w);g.lineTo(k+st/2,y+w*.25);g.lineTo(k+st,y+w);g.moveTo(k,y+H-w);g.lineTo(k+st/2,y+H-w*.25);g.lineTo(k+st,y+H-w)}
  for(let k=y;k<y+H;k+=st){g.moveTo(x+w,k);g.lineTo(x+w*.25,k+st/2);g.lineTo(x+w,k+st);g.moveTo(x+W-w,k);g.lineTo(x+W-w*.25,k+st/2);g.lineTo(x+W-w,k+st)}g.fill();g.restore();
  g.strokeStyle=C.ink;g.lineWidth=w*.16;g.strokeRect(x+w*.08,y+w*.08,W-w*.16,H-w*.16);g.strokeRect(x+w,y+w,W-2*w,H-2*w);g.lineWidth=w*.08;g.strokeRect(x+w*1.25,y+w*1.25,W-2.5*w,H-2.5*w);
  [[x+w,y+w],[x+W-w,y+w],[x+w,y+H-w],[x+W-w,y+H-w]].forEach(([a,b])=>flowerTop(g,a,b,w*1.15,C.pink,C.gold,8))}
