/* ===== Folk-art paint kit: clean double outlines, dense pattern fills, flat colour ===== */
/* hand-drawn wobble: deterministic jitter so a shape looks the same every frame */
function wob(pts,amp,seed){const r=rng(seed||7);return pts.map(p=>[p[0]+(r()-.5)*2*amp,p[1]+(r()-.5)*2*amp])}
/* smooth closed or open path through points (midpoint quadratic curves) */
function sPath(pts,closed){const p=new Path2D();const n=pts.length;if(n<2)return p;
  if(!closed){p.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<n-1;i++){const mx=(pts[i][0]+pts[i+1][0])/2,my=(pts[i][1]+pts[i+1][1])/2;p.quadraticCurveTo(pts[i][0],pts[i][1],mx,my)}p.lineTo(pts[n-1][0],pts[n-1][1]);return p}
  const m=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];let s=m(pts[n-1],pts[0]);p.moveTo(s[0],s[1]);
  for(let i=0;i<n;i++){const a=pts[i],b=pts[(i+1)%n],e=m(a,b);p.quadraticCurveTo(a[0],a[1],e[0],e[1])}p.closePath();return p}
function polyPath(pts){const p=new Path2D();pts.forEach((q,i)=>i?p.lineTo(q[0],q[1]):p.moveTo(q[0],q[1]));p.closePath();return p}
function ellPath(x,y,rx,ry,rot){const p=new Path2D();p.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),rot||0,0,TAU);return p}
function ellPts(x,y,rx,ry,n,a0){const o=[];for(let i=0;i<n;i++){const a=(a0||0)+i/n*TAU;o.push([x+Math.cos(a)*rx,y+Math.sin(a)*ry])}return o}

/* outlines: the double line is a thick brown stroke with a cream core */
function dbl(ctx,path,lw,gap){lw=lw||3;ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle=C.line;ctx.lineWidth=lw*2.7;ctx.stroke(path);ctx.strokeStyle=gap||C.cream;ctx.lineWidth=lw*.95;ctx.stroke(path)}
function sgl(ctx,path,lw,col){ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle=col||C.line;ctx.lineWidth=lw||3;ctx.stroke(path)}
function dot(ctx,x,y,r,col){ctx.beginPath();ctx.arc(x,y,Math.max(.1,r),0,TAU);ctx.fillStyle=col;ctx.fill()}
function line(ctx,pts,col,w){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.strokeStyle=col;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke()}
function ring(ctx,x,y,r,col,w){ctx.beginPath();ctx.arc(x,y,Math.max(.1,r),0,TAU);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke()}
function boundsOf(pts){let a=1e9,b=1e9,c=-1e9,d=-1e9;for(const p of pts){a=Math.min(a,p[0]);b=Math.min(b,p[1]);c=Math.max(c,p[0]);d=Math.max(d,p[1])}return{x:a,y:b,w:c-a,h:d-b}}

/* ---- pattern fills (drawn inside a clip) ---- */
const Pat={
  dots(ctx,bb,gap,r,col){for(let y=bb.y+gap/2,j=0;y<bb.y+bb.h+gap;y+=gap,j++)for(let x=bb.x+(j%2?gap/2:0);x<bb.x+bb.w+gap;x+=gap)dot(ctx,x,y,r,col)},
  stripes(ctx,bb,gap,w,col,vert){ctx.fillStyle=col;if(vert)for(let x=bb.x;x<bb.x+bb.w;x+=gap)ctx.fillRect(x,bb.y,w,bb.h);else for(let y=bb.y;y<bb.y+bb.h;y+=gap)ctx.fillRect(bb.x,y,bb.w,w)},
  diag(ctx,bb,gap,w,col){ctx.beginPath();for(let x=bb.x-bb.h;x<bb.x+bb.w;x+=gap){ctx.moveTo(x,bb.y+bb.h);ctx.lineTo(x+bb.h,bb.y)}ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke()},
  scallops(ctx,bb,sz,col,w){ctx.beginPath();for(let y=bb.y,j=0;y<bb.y+bb.h+sz;y+=sz*.8,j++)for(let x=bb.x-(j%2?sz/2:0);x<bb.x+bb.w+sz;x+=sz){ctx.moveTo(x,y);ctx.arc(x+sz/2,y,sz/2,Math.PI,0,false)}
    ctx.strokeStyle=col;ctx.lineWidth=w||2;ctx.stroke()},
  fishscale(ctx,bb,sz,col,w){ctx.beginPath();for(let y=bb.y,j=0;y<bb.y+bb.h+sz;y+=sz*.55,j++)for(let x=bb.x-(j%2?sz/2:0);x<bb.x+bb.w+sz;x+=sz){ctx.moveTo(x+sz,y);ctx.arc(x+sz/2,y,sz/2,0,Math.PI,false)}
    ctx.strokeStyle=col;ctx.lineWidth=w||2;ctx.stroke()},
  zig(ctx,bb,sz,col,w,gap){ctx.beginPath();for(let y=bb.y+sz;y<bb.y+bb.h+sz;y+=gap||sz*1.6){ctx.moveTo(bb.x,y);for(let x=bb.x,i=0;x<bb.x+bb.w+sz;x+=sz/2,i++)ctx.lineTo(x,y+(i%2?-sz/2:0))}
    ctx.strokeStyle=col;ctx.lineWidth=w||2;ctx.stroke()},
  chevron(ctx,bb,sz,col,w){ctx.beginPath();for(let y=bb.y;y<bb.y+bb.h+sz;y+=sz*.8)for(let x=bb.x;x<bb.x+bb.w+sz;x+=sz){ctx.moveTo(x,y+sz*.4);ctx.lineTo(x+sz/2,y);ctx.lineTo(x+sz,y+sz*.4)}
    ctx.strokeStyle=col;ctx.lineWidth=w||2;ctx.stroke()},
  tri(ctx,bb,sz,col){ctx.fillStyle=col;ctx.beginPath();for(let x=bb.x;x<bb.x+bb.w+sz;x+=sz){ctx.moveTo(x,bb.y+bb.h);ctx.lineTo(x+sz/2,bb.y);ctx.lineTo(x+sz,bb.y+bb.h)}ctx.fill()},
  leaves(ctx,bb,sz,col,stem){for(let y=bb.y+sz,j=0;y<bb.y+bb.h+sz;y+=sz*1.5,j++){line(ctx,[[bb.x,y],[bb.x+bb.w,y]],stem||col,2);
    for(let x=bb.x+(j%2?sz/2:0);x<bb.x+bb.w+sz;x+=sz){leafShape(ctx,x,y,sz*.45,-.8,col);leafShape(ctx,x+sz/2,y,sz*.45,.8+Math.PI,col)}}}};
function leafShape(ctx,x,y,s,a,col){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(s*.5,-s*.45,s,0);ctx.quadraticCurveTo(s*.5,s*.45,0,0);ctx.fillStyle=col;ctx.fill();ctx.restore()}

/* fill a path flat, pattern it inside a clip, then outline it */
function shape(ctx,path,fill,pat,o){o=o||{};if(fill){ctx.fillStyle=fill;ctx.fill(path)}
  if(pat){ctx.save();ctx.clip(path);pat(ctx);ctx.restore()}
  if(o.line!=='none'){if(o.line==='single')sgl(ctx,path,o.lw||3);else dbl(ctx,path,o.lw||2.6,o.gap)}}

/* sprite with a quantised scale so patterns stay crisp; box in unit coordinates */
function sprite(ctx,key,x,y,s,box,fn,flip){const sb=Math.max(.1,Math.round(s*10)/10);const c=Spr.get(key+'|'+sb,box.w*sb,box.h*sb,g=>{g.scale(sb,sb);g.translate(box.ox,box.oy);fn(g)});
  const k=s/sb;ctx.save();ctx.translate(x,y);if(flip)ctx.scale(-1,1);ctx.drawImage(c,-box.ox*s,-box.oy*s,box.w*s,box.h*s);ctx.restore();void k}

/* ===== Motifs ===== */
function fishArt(g,body,acc){const pts=wob([[-46,0],[-30,-20],[0,-27],[30,-18],[46,0],[30,18],[0,27],[-30,20]],1.2,hash(body+acc));const p=sPath(pts,true);
  const tail=sPath([[40,0],[66,-22],[60,0],[66,22]],true);shape(g,tail,acc,c=>Pat.stripes(c,{x:40,y:-24,w:30,h:48},7,2.5,C.cream,true),{lw:2});
  shape(g,p,body,c=>{Pat.fishscale(c,{x:-10,y:-30,w:52,h:62},12,acc,2);c.fillStyle=acc;c.fillRect(-26,-30,8,60)},{lw:2.2});
  line(g,[[-14,-25],[-14,25]],C.line,2);dot(g,-30,-4,9,C.cream);ring(g,-30,-4,9,C.line,2.2);dot(g,-29,-4,4,C.line);
  const fin=sPath([[0,-26],[14,-40],[22,-22]],true);shape(g,fin,acc,null,{line:'single',lw:2})}
function drawFish(ctx,x,y,s,dir,body,acc,t,ph){const sw=Math.sin(t*5+(ph||0))*.08;ctx.save();ctx.translate(x,y);ctx.rotate(sw*.5);
  sprite(ctx,'fish'+body+acc,0,0,s,{w:150,h:100,ox:60,oy:50},g=>fishArt(g,body,acc),dir>0);ctx.restore()}

/* lotus flower: open 0 (bud) .. 1 (fully open); petals open one at a time */
function lotusArt(g,open,pink,acc){const n=7;const petal=(a,len,wd,col)=>{g.save();g.rotate(a);const p=sPath([[0,4],[-wd,-len*.45],[0,-len],[wd,-len*.45]],true);
    shape(g,p,col,c=>{line(c,[[0,0],[0,-len*.85]],C.cream,2);for(let k=.3;k<.9;k+=.18)dot(c,0,-len*k,2,acc)},{lw:2});g.restore()};
  const pads=sPath([[-60,8],[-30,0],[0,4],[30,0],[60,8],[30,16],[0,14],[-30,16]],true);shape(g,pads,C.leaf,c=>Pat.leaves(c,{x:-62,y:0,w:124,h:18},14,C.emerald),{lw:2});
  for(let i=n-1;i>=0;i--){const k=clamp(open*n*1.15-i*.95,0,1);const side=i%2?1:-1,idx=Math.ceil(i/2);const a=side*idx*(.13+k*.37);if(i>2&&k<=0)continue;petal(a,62-idx*6+(1-k)*idx*4,16+k*4+(1-k)*4,i%2?pink:C.coral)}
  petal(0,66,15,pink)}
function drawLotus(ctx,x,y,s,open,pink,acc){const q=Math.round(clamp(open,0,1)*8)/8;sprite(ctx,'lotus'+q+(pink||C.pink)+(acc||C.turmeric),x,y,s,{w:150,h:110,ox:75,oy:88},g=>lotusArt(g,q,pink||C.pink,acc||C.turmeric))}

function shellArt(g,col,acc){const p=sPath([[0,10],[-34,-6],[-30,-30],[-14,-42],[0,-46],[14,-42],[30,-30],[34,-6]],true);
  shape(g,p,col,c=>{for(let i=-3;i<=3;i++)line(c,[[0,8],[i*10,-46]],acc,2.5);Pat.dots(c,{x:-34,y:-46,w:68,h:50},12,2,C.cream)},{lw:2.2});
  shape(g,sPath([[-10,4],[0,18],[10,4]],true),acc,null,{line:'single',lw:2})}
function drawShell(ctx,x,y,s,col,acc){sprite(ctx,'shell'+col+acc,x,y,s,{w:90,h:80,ox:45,oy:56},g=>shellArt(g,col||C.cream,acc||C.coral))}

/* PROP_CONCH: cream-and-red patterned spiral shell with a clear opening */
function conchArt(g){const body=sPath([[-52,6],[-30,-24],[4,-34],[34,-24],[54,-6],[40,10],[10,24],[-24,24]],true);
  shape(g,body,C.cream,c=>{for(let i=0;i<5;i++)line(c,[[-40+i*18,-30],[-30+i*18,26]],C.red,4);Pat.dots(c,{x:-52,y:-34,w:110,h:60},10,1.8,C.coral)},{lw:2.4});
  const tip=sPath([[34,-24],[62,-14],[70,-4],[54,-6]],true);shape(g,tip,C.cream,c=>line(c,[[44,-20],[58,-8]],C.red,3),{lw:2});
  const sp=[];for(let i=0;i<=30;i++){const a=i/30*TAU*1.6,r=4+i*.55;sp.push([-30+Math.cos(a)*r,-2+Math.sin(a)*r*.8])}line(g,sp,C.line,2.2);
  const lip=sPath([[-20,18],[10,30],[34,14],[10,14]],true);shape(g,lip,C.coral,null,{lw:2})}
function drawConch(ctx,x,y,s){sprite(ctx,'conch',x,y,s,{w:150,h:90,ox:75,oy:45},conchArt)}

/* PROP_JEWEL: faceted gemstone in a gold setting */
function jewelArt(g,col){const set=sPath(ellPts(0,0,46,46,16),true);shape(g,set,C.gold,c=>Pat.dots(c,{x:-46,y:-46,w:92,h:92},10,2.4,C.turmeric),{lw:2.2});
  const gem=polyPath([[0,-36],[30,-12],[22,26],[-22,26],[-30,-12]]);shape(g,gem,col,c=>{c.fillStyle=C.white;c.beginPath();c.moveTo(-12,-14);c.lineTo(0,-30);c.lineTo(6,-14);c.closePath();c.fill();
    line(c,[[-30,-12],[30,-12]],C.line,1.6);line(c,[[0,-36],[-10,-12],[0,26]],C.line,1.6);line(c,[[0,-36],[10,-12],[0,26]],C.line,1.6)},{lw:2})}
function drawJewel(ctx,x,y,s,col){sprite(ctx,'jewel'+(col||C.emerald),x,y,s,{w:110,h:110,ox:55,oy:55},g=>jewelArt(g,col||C.emerald))}

/* golden decorative treasure medallion */
function medalArt(g){for(let i=0;i<10;i++){g.save();g.rotate(i/10*TAU);const p=sPath([[0,-30],[-12,-54],[0,-66],[12,-54]],true);shape(g,p,i%2?C.turmeric:C.saffron,null,{lw:1.8});g.restore()}
  const d=sPath(ellPts(0,0,34,34,14),true);shape(g,d,C.gold,c=>{ring(c,0,0,22,C.verm,4);Pat.dots(c,{x:-34,y:-34,w:68,h:68},9,2,C.cream)},{lw:2.2});dot(g,0,0,9,C.verm)}
function drawMedal(ctx,x,y,s){sprite(ctx,'medal',x,y,s,{w:150,h:150,ox:75,oy:75},medalArt)}

/* 8-point patterned star */
function starArt(g,col){const pts=[];for(let i=0;i<16;i++){const r=i%2?9:22,a=i/16*TAU-Math.PI/2;pts.push([Math.cos(a)*r,Math.sin(a)*r])}shape(g,polyPath(pts),col,null,{lw:1.5});dot(g,0,0,4,C.verm)}
function drawStar(ctx,x,y,s,col){sprite(ctx,'star'+col,x,y,s,{w:56,h:56,ox:28,oy:28},g=>starArt(g,col))}

/* moon with a gentle sleeping face and dotted rings */
function moonArt(g){const p=sPath(ellPts(0,0,90,90,20),true);shape(g,p,C.cream,c=>{ring(c,0,0,78,C.turmeric,6);Pat.dots(c,{x:-90,y:-90,w:180,h:180},16,2.2,C.turmeric)},{lw:3});
  const face=sPath(ellPts(0,6,52,52,14),true);shape(g,face,C.cream,null,{line:'single',lw:2.5});
  [[-20,-2],[20,-2]].forEach(([x,y])=>{g.beginPath();g.arc(x,y,9,.15*Math.PI,.85*Math.PI);g.strokeStyle=C.line;g.lineWidth=3;g.stroke()});
  g.beginPath();g.arc(0,20,12,.2*Math.PI,.8*Math.PI);g.strokeStyle=C.verm;g.lineWidth=3.4;g.stroke();dot(g,-30,16,5,C.pink);dot(g,30,16,5,C.pink);dot(g,0,-24,4,C.verm)}
function drawMoon(ctx,x,y,s){sprite(ctx,'moon',x,y,s,{w:200,h:200,ox:100,oy:100},moonArt)}

/* small geometric cloud */
function cloudArt(g,col,acc){const p=new Path2D();p.moveTo(-70,20);p.arc(-44,8,26,Math.PI*.9,Math.PI*1.75);p.arc(-6,-6,32,Math.PI*1.1,Math.PI*1.9);p.arc(38,6,26,Math.PI*1.25,Math.PI*2.1);p.lineTo(70,20);p.closePath();
  shape(g,p,col,c=>{for(const [x,y,r] of [[-44,10,12],[-6,-2,15],[38,8,12]]){const sp=[];for(let i=0;i<=24;i++){const a=i/24*TAU*1.4;sp.push([x+Math.cos(a)*r*i/24,y+Math.sin(a)*r*i/24])}line(c,sp,acc,2.2)}
    line(c,[[-64,16],[64,16]],acc,2)},{lw:2})}
function drawCloud(ctx,x,y,s,col,acc){sprite(ctx,'cloud'+col+acc,x,y,s,{w:160,h:90,ox:80,oy:52},g=>cloudArt(g,col||C.cream,acc||C.turq))}

/* small turtle (background life) */
function turtleArt(g){const sh=sPath([[-30,4],[-24,-16],[0,-24],[24,-16],[30,4]],true);
  [[-24,8],[24,8]].forEach(([x,y])=>shape(g,ellPath(x,y,10,5,x<0?-.5:.5),C.leaf,null,{line:'single',lw:2}));shape(g,ellPath(38,-2,10,8),C.leaf,null,{line:'single',lw:2});dot(g,41,-4,2.4,C.line);
  shape(g,sh,C.emerald,c=>{Pat.fishscale(c,{x:-30,y:-24,w:60,h:30},12,C.turmeric,2)},{lw:2})}
function drawTurtle(ctx,x,y,s,dir){sprite(ctx,'turtle',x,y,s,{w:100,h:56,ox:50,oy:30},turtleArt,dir<0)}

/* patterned folk-art halo: rings of petals and dots, never a soft glow */
function halo(ctx,x,y,r,cols,t,k){if(k!=null&&k<=0)return;ctx.save();if(k!=null)ctx.globalAlpha*=clamp(k,0,1);ctx.translate(x,y);
  const [a,b,c]=cols;dot(ctx,0,0,r,a);ring(ctx,0,0,r,C.line,3);const n=Math.max(12,Math.round(r/7));ctx.save();ctx.rotate((t||0)*.08);
  for(let i=0;i<n;i++){ctx.save();ctx.rotate(i/n*TAU);ctx.beginPath();ctx.moveTo(-r*.09,-r*.72);ctx.quadraticCurveTo(0,-r*1.02,r*.09,-r*.72);ctx.closePath();ctx.fillStyle=b;ctx.fill();ctx.strokeStyle=C.line;ctx.lineWidth=1.6;ctx.stroke();ctx.restore()}ctx.restore();
  ring(ctx,0,0,r*.66,C.line,2.2);for(let i=0;i<n;i++){const an=i/n*TAU-(t||0)*.05;dot(ctx,Math.cos(an)*r*.58,Math.sin(an)*r*.58,Math.max(1.5,r*.035),c)}ctx.restore()}

/* short patterned flash for feedback: a ring of petals that grows and fades */
function burst(ctx,x,y,k,r,col){if(k<=0||k>=1)return;ctx.save();ctx.globalAlpha*=1-k;ctx.translate(x,y);const rr=r*(.4+k*.8);
  for(let i=0;i<12;i++){ctx.save();ctx.rotate(i/12*TAU+k);ctx.beginPath();ctx.ellipse(0,-rr,6,14,0,0,TAU);ctx.fillStyle=i%2?col:C.cream;ctx.fill();ctx.strokeStyle=C.line;ctx.lineWidth=1.6;ctx.stroke();ctx.restore()}
  ring(ctx,0,0,rr*.7,col,4);ctx.restore()}

/* ===== Diya with a separate gentle flame layer ===== */
function diyaArt(g,col){const bowl=new Path2D();bowl.moveTo(-50,-4);bowl.quadraticCurveTo(-46,26,0,30);bowl.quadraticCurveTo(46,26,58,-10);bowl.lineTo(40,-6);bowl.quadraticCurveTo(0,4,-50,-4);bowl.closePath();
  shape(g,bowl,col,c=>{Pat.tri(c,{x:-52,y:4,w:110,h:10},12,C.turmeric);Pat.dots(c,{x:-50,y:14,w:100,h:14},10,2.2,C.cream);line(c,[[-48,2],[50,2]],C.line,1.6)},{lw:2.2});
  shape(g,ellPath(-2,-4,46,7),C.ochre,c=>Pat.dots(c,{x:-48,y:-10,w:96,h:12},8,1.6,C.turmeric),{line:'single',lw:2});
  shape(g,sPath([[-30,30],[30,30],[22,40],[-22,40]],true),C.verm,null,{line:'single',lw:2})}
function flame(ctx,x,y,s,t,lit,seed){if(lit<=0)return;const f=reduceMotion?0:Math.sin(t*6+(seed||0))*.04+Math.sin(t*9.3+(seed||0)*2)*.025;ctx.save();ctx.translate(x,y);ctx.scale(s*lit,s*lit*(1+f));ctx.rotate(f*.6);
  const o=sPath([[0,-56],[16,-18],[12,0],[0,6],[-12,0],[-16,-18]],true);shape(ctx,o,C.diya,null,{line:'single',lw:2.2});
  shape(ctx,sPath([[0,-38],[9,-12],[0,2],[-9,-12]],true),C.turmeric,null,{line:'none'});shape(ctx,ellPath(0,-8,4,8),C.white,null,{line:'none'});ctx.restore()}
function drawDiya(ctx,x,y,s,o){o=o||{};const lit=o.lit||0;if(lit>0&&o.halo!==false)halo(ctx,x+52*s,y-34*s,58*s*lit,[C.turmeric,C.saffron,C.verm],o.t||0,lit*.9);
  sprite(ctx,'diya'+(o.col||C.verm),x,y,s,{w:130,h:80,ox:60,oy:30},g=>diyaArt(g,o.col||C.verm));
  line(ctx,[[x+44*s,y-6*s],[x+52*s,y-14*s]],C.line,3*s);flame(ctx,x+52*s,y-12*s,s,o.t||0,lit,o.seed)}

/* ===== The three gift motifs (ICON_HEALTH, ICON_KINDNESS, ICON_GRATITUDE); fill 0..1 rises from below ===== */
function giftPath(kind){if(kind==='leaf')return sPath([[0,70],[-40,30],[-52,-14],[-30,-56],[0,-78],[30,-56],[52,-14],[40,30]],true);
  if(kind==='heart'){const p=new Path2D();p.moveTo(0,70);p.bezierCurveTo(-30,44,-74,14,-70,-22);p.bezierCurveTo(-66,-58,-22,-70,0,-38);p.bezierCurveTo(22,-70,66,-58,70,-22);p.bezierCurveTo(74,14,30,44,0,70);p.closePath();return p}
  const p=new Path2D();p.moveTo(-70,0);p.quadraticCurveTo(-64,50,0,56);p.quadraticCurveTo(64,50,76,-6);p.lineTo(54,-2);p.quadraticCurveTo(0,12,-70,0);p.closePath();return p}
function giftPattern(c,kind){if(kind==='leaf'){line(c,[[0,70],[0,-70]],C.cream,4);for(let y=-50;y<50;y+=18){line(c,[[0,y+14],[-34,y-6]],C.cream,3);line(c,[[0,y+14],[34,y-6]],C.cream,3)}Pat.dots(c,{x:-52,y:-80,w:104,h:150},14,2.4,C.turmeric)}
  else if(kind==='heart'){Pat.scallops(c,{x:-74,y:-70,w:148,h:140},18,C.turmeric,2.4);dot(c,0,-6,16,C.turmeric);ring(c,0,-6,26,C.cream,4)}
  else{Pat.tri(c,{x:-72,y:10,w:150,h:14},16,C.turmeric);Pat.dots(c,{x:-70,y:26,w:140,h:28},12,2.6,C.cream)}}
function drawGift(ctx,kind,x,y,s,fill,t,hl){const col=kind==='leaf'?C.leaf:kind==='heart'?C.verm:C.saffron;ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  if(hl>0){const k=.5+.5*Math.sin(t*4);ctx.save();ctx.globalAlpha*=hl;ring(ctx,0,0,96+k*10,C.turmeric,6);ring(ctx,0,0,108+k*10,C.cream,3);ctx.restore()}
  const p=giftPath(kind);ctx.fillStyle=C.cream;ctx.fill(p);ctx.save();ctx.clip(p);ctx.save();ctx.globalAlpha*=.3;ctx.fillStyle=col;ctx.fill(p);giftPattern(ctx,kind);ctx.restore();
  if(fill>0){ctx.beginPath();ctx.rect(-90,80-170*fill,180,170*fill);ctx.clip();ctx.fillStyle=col;ctx.fill(p);giftPattern(ctx,kind)}ctx.restore();
  ctx.setLineDash(fill>=1?[]:[10,8]);dbl(ctx,p,2.6);ctx.setLineDash([]);
  if(kind==='diya'){line(ctx,[[60,-4],[70,-14]],C.line,3);flame(ctx,70,-12,1.2,t,fill>=1?1:fill*.4,3)}ctx.restore()}

/* ===== Scalloped wave band (ENV_COSMIC_OCEAN building block) ===== */
function waveBand(ctx,o){const {y,amp,per,ph,fill,lineCol,acc,W,bottom}=o;const x0=-per+((ph%per)+per)%per-per;const p=new Path2D();p.moveTo(x0,bottom);p.lineTo(x0,y);
  for(let x=x0;x<W+per;x+=per){p.quadraticCurveTo(x+per*.5,y-amp*2,x+per,y)}p.lineTo(W+per*2,bottom);p.closePath();ctx.fillStyle=fill;ctx.fill(p);
  ctx.save();ctx.clip(p);ctx.beginPath();const rows=o.rows||3;for(let r=1;r<=rows;r++){const yy=y+r*Math.max(14,amp*1.6+10),off=r%2?per/2:0;
      for(let x=x0-off;x<W+per;x+=per){ctx.moveTo(x,yy);ctx.quadraticCurveTo(x+per*.5,yy-amp*1.6,x+per,yy)}}
  ctx.strokeStyle=lineCol;ctx.lineWidth=2.4;ctx.stroke();if(acc){for(let x=x0;x<W+per;x+=per)dot(ctx,x+per*.5,y+amp*.2+8,3.2,acc)}ctx.restore();
  const top=new Path2D();top.moveTo(x0,y);for(let x=x0;x<W+per;x+=per)top.quadraticCurveTo(x+per*.5,y-amp*2,x+per,y);dbl(ctx,top,2.2,o.gap||C.cream)}

/* ===== Screen frame (L00): double line with a patterned band, drawn out from the corners ===== */
function frameArt(g,W,H,band,acc){const b=24,i=8;g.fillStyle=band;g.beginPath();g.rect(0,0,W,H);g.rect(i+b,i+b,W-2*(i+b),H-2*(i+b));g.fill('evenodd');
  g.save();g.beginPath();g.rect(0,0,W,H);g.rect(i+b,i+b,W-2*(i+b),H-2*(i+b));g.clip('evenodd');
  for(let x=0;x<W;x+=26){Pat.tri(g,{x,y:i+3,w:26,h:b-6},26,acc);Pat.tri(g,{x,y:H-i-b+3,w:26,h:b-6},26,acc)}
  for(let y=i+b;y<H-i-b;y+=26){dot(g,i+b/2,y,4,acc);dot(g,W-i-b/2,y,4,acc)}g.restore();
  const outer=new Path2D();outer.rect(i,i,W-2*i,H-2*i);dbl(g,outer,2.2);const inner=new Path2D();inner.rect(i+b,i+b,W-2*(i+b),H-2*(i+b));dbl(g,inner,2.2);
  [[i+b/2,i+b/2],[W-i-b/2,i+b/2],[i+b/2,H-i-b/2],[W-i-b/2,H-i-b/2]].forEach(([x,y])=>{shape(g,ellPath(x,y,20,20),C.pink,c=>{dot(c,x,y,8,C.turmeric)},{lw:2})})}
function drawFrame(ctx,k,band,acc){const W=L.W,H=L.H;band=band||C.peacock;acc=acc||C.turmeric;if(k<=0)return;
  const c=Spr.get('frame'+band+acc,W,H,g=>frameArt(g,W,H,band,acc));
  if(k>=1){ctx.drawImage(c,0,0,W,H);return}ctx.save();ctx.beginPath();const lx=W/2*k,ly=H/2*k,b=40;
  ctx.rect(0,0,lx,b);ctx.rect(0,0,b,ly);ctx.rect(W-lx,0,lx,b);ctx.rect(W-b,0,b,ly);ctx.rect(0,H-b,lx,b);ctx.rect(0,H-ly,b,ly);ctx.rect(W-lx,H-b,lx,b);ctx.rect(W-b,H-ly,b,ly);
  ctx.clip();ctx.drawImage(c,0,0,W,H);ctx.restore()}

/* text drawn on canvas (titles, refrains) */
function ctext(ctx,str,x,y,size,col,o){o=o||{};ctx.save();ctx.font=`${o.weight||400} ${size}px ${o.body?'"Baloo 2","Trebuchet MS",sans-serif':'"Yatra One","Palatino Linotype",Georgia,serif'}`;
  ctx.textAlign=o.align||'center';ctx.textBaseline='middle';if(o.outline){ctx.lineWidth=o.outline;ctx.strokeStyle=o.ocol||C.line;ctx.lineJoin='round';ctx.strokeText(str,x,y)}ctx.fillStyle=col;ctx.fillText(str,x,y);ctx.restore()}
function wrapLines(ctx,str,maxW,size,body){ctx.save();ctx.font=`400 ${size}px ${body?'"Baloo 2",sans-serif':'"Yatra One",Georgia,serif'}`;const words=str.split(' '),out=[];let cur='';
  for(const w of words){const t=cur?cur+' '+w:w;if(ctx.measureText(t).width>maxW&&cur){out.push(cur);cur=w}else cur=t}if(cur)out.push(cur);ctx.restore();return out}
/* double-bordered cream plaque on canvas (UI_DOUBLE_BORDER) */
function plaque(ctx,x,y,w,h,fill){const p=new Path2D();p.roundRect?p.roundRect(x,y,w,h,18):p.rect(x,y,w,h);ctx.fillStyle=fill||C.cream;ctx.fill(p);dbl(ctx,p,2.6);
  const q=new Path2D();q.roundRect?q.roundRect(x+12,y+12,w-24,h-24,10):q.rect(x+12,y+12,w-24,h-24);sgl(ctx,q,2,C.gold)}
