/* ===== Folk-art motifs, borders, skies and settings (all drawn from shapes) ===== */
function motifHorse(g,x,y,s,col,mk,dir){withT(g,x,y,s,dir,c=>{const o={sw:2.6/s};
  [[-30,-6],[-17,5],[18,-4],[31,6]].forEach(([lx,dx])=>R.poly(c,[[lx-4,-46],[lx+4,-46],[lx+dx+3,0],[lx+dx-3,0]],col,o));
  R.curve(c,[[-44,-66],[-62,-58],[-64,-36],[-55,-22]],{stroke:col,sw:6/s});
  R.ell(c,0,-62,94,46,col,o);
  R.poly(c,[[26,-76],[46,-114],[60,-108],[44,-58]],col,o);
  R.poly(c,[[44,-116],[60,-122],[84,-101],[77,-92],[55,-101]],col,o);
  R.poly(c,[[47,-117],[49,-132],[57,-118]],col,o);
  for(let i=0;i<4;i++)poly(c,[[30+i*5,-80-i*9],[24+i*5,-88-i*9],[34+i*5,-86-i*9]],mk);
  for(let r=0;r<2;r++)for(let i=0;i<6;i++)dot(c,-30+i*12+r*6,-70+r*14,2.6,mk);
  strokeL(c,[[-36,-56],[-26,-50],[-16,-56],[-6,-50],[4,-56],[14,-50],[24,-56]],mk,2.4);
  dot(c,67,-109,2.8,C.charcoal)})}
function motifElephant(g,x,y,s,col,mk,dir){withT(g,x,y,s,dir,c=>{const o={sw:2.6/s};
  [[-34],[-16],[14],[32]].forEach(([lx])=>R.rect(c,lx-7,-44,14,44,col,o));
  R.ell(c,0,-62,118,72,col,o);
  R.path(c,'M58 -74 C 82 -70 86 -40 78 -18 C 76 -12 68 -12 70 -20 C 74 -38 70 -54 52 -56 Z',col,o);
  R.circ(c,50,-76,52,col,o);
  R.ell(c,40,-70,26,36,mk,o);
  R.rect(c,-30,-96,50,30,C.verm,o);
  for(let i=0;i<5;i++)poly(c,[[-28+i*10,-66],[-23+i*10,-58],[-18+i*10,-66]],C.mustard);
  dot(c,62,-82,3,C.charcoal);
  R.path(c,'M66 -60 Q 78 -58 80 -50',null,{stroke:C.ivory,sw:4/s})})}
function motifFlower(g,x,y,r,col,ctr){for(let i=0;i<6;i++){const a=i/6*TAU;
    withT(g,x+Math.cos(a)*r*.55,y+Math.sin(a)*r*.55,1,1,c=>R.ell(c,0,0,r*.95,r*.5,col,{sw:2}),a)}
  R.circ(g,x,y,r*.6,ctr||C.mustard,{sw:2})}
function motifMarigold(g,x,y,r){R.circ(g,x,y,r*2,C.mustard,{sw:2});for(let i=0;i<10;i++){const a=i/10*TAU;dot(g,x+Math.cos(a)*r*.68,y+Math.sin(a)*r*.68,r*.2,C.terra)}dot(g,x,y,r*.3,C.verm)}
function motifTree(g,x,y,s,kind){withT(g,x,y,s,1,c=>{const o={sw:2.6/s};
  R.rect(c,-8,-70,16,70,C.brown,o);
  if(kind===1){R.circ(c,0,-120,120,C.leaf,o);for(let i=0;i<12;i++){const a=i/12*TAU;poly(c,[[Math.cos(a)*30,-120+Math.sin(a)*30],[Math.cos(a+.2)*52,-120+Math.sin(a+.2)*52],[Math.cos(a-.2)*52,-120+Math.sin(a-.2)*52]],C.mustard)}dot(c,0,-120,10,C.verm)}
  else{for(let k=0;k<3;k++){const yy=-60-k*42,w=78-k*18;R.poly(c,[[-w,yy],[w,yy],[0,yy-64]],C.leaf,o);for(let i=-2;i<=2;i++)dot(c,i*w/3.2,yy-12,3,C.ivory)}}})}
function motifSun(g,x,y,r,col){for(let i=0;i<12;i++){const a=i/12*TAU;poly(g,[[x+Math.cos(a-.12)*r*1.05,y+Math.sin(a-.12)*r*1.05],[x+Math.cos(a)*r*1.55,y+Math.sin(a)*r*1.55],[x+Math.cos(a+.12)*r*1.05,y+Math.sin(a+.12)*r*1.05]],col||C.mustard)}
  R.circ(g,x,y,r*2,col||C.mustard,{sw:2.5});ring(g,x,y,r*.6,C.terra,3)}
function motifBird(g,x,y,s,col,dir){withT(g,x,y,s,dir,c=>{R.ell(c,0,-20,44,24,col,{sw:2.4/s});R.circ(c,22,-34,18,col,{sw:2.4/s});poly(c,[[30,-36],[40,-33],[30,-30]],C.mustard);
  R.poly(c,[[-20,-24],[-44,-36],[-40,-14]],col,{sw:2.4/s});dot(c,25,-37,2,C.charcoal);strokeL(c,[[-4,-8],[-4,0]],C.brown,2);strokeL(c,[[6,-8],[6,0]],C.brown,2)})}
function motifPerson(g,x,y,s,col,mk){withT(g,x,y,s,1,c=>{R.poly(c,[[-14,-50],[14,-50],[20,0],[-20,0]],col,{sw:2.4/s});R.circ(c,0,-62,22,C.terra,{sw:2.4/s});dot(c,-4,-63,1.8,C.charcoal);dot(c,4,-63,1.8,C.charcoal);for(let i=0;i<3;i++)dot(c,0,-40+i*12,2.4,mk)})}
function garland(g,x1,y1,x2,y2,sag,r){const n=Math.max(4,Math.round(Math.hypot(x2-x1,y2-y1)/(r*2.1)));
  for(let i=0;i<=n;i++){const t=i/n,x=lerp(x1,x2,t),y=lerp(y1,y2,t)+Math.sin(t*Math.PI)*sag;
    dot(g,x,y,r,i%2?C.terra:C.mustard);ring(g,x,y,r,C.brown,1.6);dot(g,x,y,r*.32,i%2?C.mustard:C.verm)}}
function zigzag(g,x,y,w,h,col,n){const st=w/n;for(let i=0;i<n;i++)poly(g,[[x+i*st,y+h],[x+(i+.5)*st,y],[x+(i+1)*st,y+h]],col)}
function dotRow(g,x,y,w,step,r,col){for(let t=0;t<=w;t+=step)dot(g,x+t,y,r,col)}
function diamonds(g,x,y,w,h,col,n){const st=w/n;for(let i=0;i<n;i++){const cx2=x+(i+.5)*st;poly(g,[[cx2,y],[cx2+st*.35,y+h/2],[cx2,y+h],[cx2-st*.35,y+h/2]],col)}}

/* Decorative frame that surrounds every scene */
function borderSize(){return Math.min(L.W,L.H)*.04}
function paintBorder(g,W,H,night){const b=borderSize(),band=night?C.indigo:C.terra,acc=night?C.gold:C.mustard;
  g.fillStyle=band;g.fillRect(0,0,W,b);g.fillRect(0,H-b,W,b);g.fillRect(0,0,b,H);g.fillRect(W-b,0,b,H);
  g.fillStyle=acc;g.fillRect(b-6,b-6,W-2*b+12,5);g.fillRect(b-6,H-b+1,W-2*b+12,5);g.fillRect(b-6,b-6,5,H-2*b+12);g.fillRect(W-b+1,b-6,5,H-2*b+12);
  R.rect(g,b,b,W-2*b,H-2*b,null,{sw:3.2,stroke:C.brown});R.rect(g,4,4,W-8,H-8,null,{sw:3,stroke:C.brown});
  const seq=['m','t','h','t','m','t','e','t'];
  const edge=(len,place)=>{const st=b*1.55,n=Math.floor((len-2*b)/st);const off=(len-2*b-n*st)/2+b;
    for(let i=0;i<n;i++)place(off+(i+.5)*st,seq[i%seq.length])};
  const put=(x,y,k,rot)=>{withT(g,x,y,1,1,c=>{const r=b*.24;
    if(k==='m')motifMarigold(c,0,0,r);
    else if(k==='t'){poly(c,[[-r,r],[0,-r],[r,r]],acc);dot(c,0,r*.25,r*.25,night?C.ivory:C.verm)}
    else if(k==='h')motifHorse(c,-b*.12,b*.33,b*.0068,C.ivory,C.indigo,1);
    else if(k==='e')motifElephant(c,-b*.1,b*.31,b*.0058,C.ivory,C.terra,1);
    else poly(c,[[0,-r],[r*.7,0],[0,r],[-r*.7,0]],acc)},rot)};
  edge(W,(p,k)=>{put(p,b/2,k,0);put(p,H-b/2,k,0)});
  edge(H,(p,k)=>{put(b/2,p,k==='h'||k==='e'?'d':k,0);put(W-b/2,p,k==='h'||k==='e'?'d':k,0)});
  [[b/2,b/2],[W-b/2,b/2],[b/2,H-b/2],[W-b/2,H-b/2]].forEach(([x,y])=>{dot(g,x,y,b*.42,acc);ring(g,x,y,b*.42,C.brown,2.5);motifFlower(g,x,y,b*.2,C.verm,C.ivory)})}
function drawBorder(ctx,night){Bake.draw(ctx,'border'+(night?'N':'D'),0,0,L.W,L.H,(g,W,H)=>paintBorder(g,W,H,night))}

/* Skies as flat painted bands, never gradients */
function wavyBand(g,x,y,w,h,col,amp,seed){const r=rng(seed||7);g.beginPath();g.moveTo(x,y+h);g.lineTo(x,y);const n=Math.ceil(w/40);
  for(let i=0;i<=n;i++)g.lineTo(x+i*w/n,y+Math.sin(i*.9+seed)*amp+(r()-.5)*amp*.5);g.lineTo(x+w,y+h);g.closePath();g.fillStyle=col;g.fill()}
const SKY={
  morning:[C.ivory,ca(C.mustard,.18),ca(C.mustard,.32),ca(C.mustard,.5)],
  afternoon:[ca(C.mustard,.55),ca(C.mustard,.75),ca(C.terra,.45),ca(C.terra,.6)],
  sunset:[C.terra,C.verm,ca(C.verm,.85),C.mustard],
  dusk:[C.indigo,ca(C.indigo,.8),C.terra,C.mustard],
  night:[C.indigo,C.indigo,C.indigo,C.indigo],
  predawn:[C.indigo,ca(C.indigo,.75),ca(C.indigo,.55),ca(C.terra,.6)],
  sunrise:[ca(C.indigo,.7),ca(C.indigo,.35),C.terra,C.mustard]};
function paintSky(g,x,y,w,h,mood){g.fillStyle=mood==='morning'?C.ivory:(mood==='afternoon'?C.ivory:C.indigo);g.fillRect(x,y,w,h);
  const bands=SKY[mood];bands.forEach((col,i)=>wavyBand(g,x,y+h*(i/bands.length)*.9+(i?h*.08:0),w,h,col,i?8:0,i*3+1));
  if(mood==='night'||mood==='dusk'||mood==='predawn'){const r=rng(11);const n=mood==='night'?70:30;
    for(let i=0;i<n;i++){const sx=x+r()*w,sy=y+r()*h*(mood==='night'?.75:.4),sr=1.5+r()*2.5;dot(g,sx,sy,sr,C.gold);
      if(r()<.25){strokeL(g,[[sx-sr*3,sy],[sx+sr*3,sy]],ca(C.gold,.8),1.4);strokeL(g,[[sx,sy-sr*3],[sx,sy+sr*3]],ca(C.gold,.8),1.4)}}}
  if(mood==='morning')motifSun(g,x+w*.82,y+h*.28,Math.min(w,h)*.06,C.mustard);
  if(mood==='afternoon')motifSun(g,x+w*.75,y+h*.45,Math.min(w,h)*.06,C.gold);
  if(mood==='sunset'){R.arc(g,x+w*.5,y+h*.98,h*.5,h*.5,Math.PI,TAU,true,C.gold,{sw:2.5});}
  if(mood==='sunrise'){R.arc(g,x+w*.5,y+h*1.02,h*.42,h*.42,Math.PI,TAU,true,C.gold,{sw:2.5});
    for(let i=0;i<9;i++){const a=Math.PI+(i+.5)/9*Math.PI;strokeL(g,[[x+w*.5+Math.cos(a)*h*.3,y+h+Math.sin(a)*h*.3],[x+w*.5+Math.cos(a)*h*.55,y+h+Math.sin(a)*h*.55]],C.gold,6)}}}
function paintHills(g,x,y,w,h,cols,seed){const r=rng(seed||3);let px=x-w*.05;let k=0;while(px<x+w){const hw=w*(.14+r()*.12),hh=h*(.5+r()*.5),col=cols[k++%cols.length];
    R.path(g,`M${px} ${y+h} Q ${px+hw/2} ${y+h-hh*2} ${px+hw} ${y+h} Z`,col,{sw:2.5});
    for(let i=1;i<4;i++)dot(g,px+hw*i/4,y+h-hh*.45,3,C.ivory);px+=hw*.72}}
function paintGround(g,x,y,w,h,night){g.fillStyle=night?C.indigo:ca(C.mustard,.55);g.fillRect(x,y,w,h);
  g.fillStyle=night?ca(C.charcoal,.35):ca(C.terra,.25);g.fillRect(x,y,w,8);
  const rows=Math.max(2,Math.floor(h/70));for(let i=1;i<=rows;i++){const yy=y+i*h/(rows+1);strokeL(g,[[x,yy],[x+w,yy]],night?ca(C.gold,.25):ca(C.brown,.25),2);
    for(let t=x+(i%2)*40;t<x+w;t+=80)dot(g,t,yy-h/(rows+1)/2,3,night?ca(C.gold,.35):ca(C.terra,.5))}}

/* Flat-fronted palace with geometric windows and a patterned doorway */
function palaceGeo(x,y,w,h){const dw=w*.2,dh=h*.6;return{x,y,w,h,door:{x:x+w/2-dw/2,y:y+h-dh,w:dw,h:dh},horsePanel:{x:x+w*.06,y:y+h*.52,w:w*.22,h:h*.3}}}
function archPts(x,y,w,h){return[[x,y+h],[x,y+w*.45],[x+w*.12,y+w*.18],[x+w/2,y],[x+w*.88,y+w*.18],[x+w,y+w*.45],[x+w,y+h]]}
function paintWindow(g,x,y,w,h,lit){R.poly(g,archPts(x-6,y-6,w+12,h+12),C.mustard,{sw:2.5});R.poly(g,archPts(x,y,w,h),lit?C.gold:C.indigo,{sw:2.5});
  for(let i=1;i<3;i++)strokeL(g,[[x+w*i/3,y+w*.3],[x+w*i/3,y+h]],lit?C.terra:ca(C.ivory,.7),2);strokeL(g,[[x,y+h*.6],[x+w,y+h*.6]],lit?C.terra:ca(C.ivory,.7),2)}
function paintDoorFrame(g,d,open){const f=d.w*.14;R.poly(g,archPts(d.x-f,d.y-f,d.w+2*f,d.h+f),C.verm,{sw:3});
  R.poly(g,archPts(d.x-f*.45,d.y-f*.45,d.w+f*.9,d.h+f*.45),C.mustard,{sw:2.5});
  const pts=archPts(d.x-f*.72,d.y-f*.72,d.w+f*1.44,d.h+f*.72);for(let i=0;i<pts.length-1;i++){const [a,b]=[pts[i],pts[i+1]];for(let t=0;t<1;t+=.18)dot(g,lerp(a[0],b[0],t),lerp(a[1],b[1],t),2.6,C.ivory)}}
function paintDoorLeaves(g,d,night){R.poly(g,archPts(d.x,d.y,d.w,d.h),C.indigo,{sw:3});strokeL(g,[[d.x+d.w/2,d.y+d.w*.02],[d.x+d.w/2,d.y+d.h]],C.brown,3);
  for(let r=0;r<5;r++)for(let c2=0;c2<4;c2++){const sx=d.x+d.w*(.14+c2*.24),sy=d.y+d.w*.55+r*(d.h-d.w*.6)/5;dot(g,sx,sy,4,C.mustard);ring(g,sx,sy,4,C.brown,1.4)}
  diamonds(g,d.x+d.w*.08,d.y+d.h*.48,d.w*.84,d.h*.06,night?ca(C.gold,.8):C.terra,6)}
function paintPalace(g,P,opts){opts=opts||{};const{x,y,w,h}=P,night=opts.night;
  [[.16],[.84]].forEach(([fx])=>{const cxp=x+w*fx,cw=w*.14,top=y-h*.22;R.rect(g,cxp-cw/2,top+h*.08,cw,h*.16,C.ivory,{sw:2.5});
    R.arc(g,cxp,top+h*.085,cw*1.05,h*.2,Math.PI,TAU,true,C.mustard,{sw:2.5});strokeL(g,[[cxp,top-h*.02],[cxp,top-h*.06]],C.brown,3);dot(g,cxp,top-h*.07,5,C.verm);
    for(let i=0;i<3;i++)R.rect(g,cxp-cw/2+cw*(.1+i*.33),top+h*.1,cw*.12,h*.14,C.terra,{sw:2})});
  R.arc(g,x+w/2,y+h*.02,w*.24,h*.34,Math.PI,TAU,true,C.mustard,{sw:3});dot(g,x+w/2,y-h*.17,7,C.verm);
  R.rect(g,x,y,w,h,C.terra,{sw:3.2});
  g.fillStyle=C.ivory;g.fillRect(x+3,y+3,w-6,h*.07);zigzag(g,x+3,y+h*.012,w-6,h*.05,C.indigo,Math.round(w/26));
  for(let i=0;i<Math.round(w/40);i++)R.rect(g,x+i*w/Math.round(w/40)+4,y-h*.05,w/Math.round(w/40)*.55,h*.05,C.terra,{sw:2});
  g.fillStyle=C.mustard;g.fillRect(x+3,y+h*.92,w-6,h*.08-3);zigzag(g,x+3,y+h*.93,w-6,h*.06,C.verm,Math.round(w/30));
  const wy=y+h*.14,ww=w*.075,wh=h*.24;[.08,.2,.72,.84].forEach(fx=>paintWindow(g,x+w*fx,wy,ww,wh,opts.lit));
  [.08,.84].forEach(fx=>paintWindow(g,x+w*fx,y+h*.5,ww,wh,opts.lit));
  const pd=P.horsePanel;R.rect(g,pd.x,pd.y,pd.w,pd.h,C.ivory,{sw:2.5});R.rect(g,x+w*.72,pd.y,pd.w,pd.h,C.ivory,{sw:2.5});
  motifElephant(g,x+w*.83,pd.y+pd.h*.9,pd.h*.0065,C.terra,C.indigo,-1);
  paintDoorFrame(g,P.door);if(!opts.noDoor)paintDoorLeaves(g,P.door,night);
  for(let i=0;i<3;i++){const gx=x+w*(.33+i*.17)-w*.085;garland(g,gx,y+h*.08,gx+w*.17,y+h*.08,h*.05,h*.012+3)}
  garland(g,P.door.x-P.door.w*.2,P.door.y-P.door.w*.15,P.door.x+P.door.w*1.2,P.door.y-P.door.w*.15,P.door.h*.12,h*.012+3)}
/* painted horses on the palace panel: drawn live so the ripple can pass through them */
function drawHorsePanel(ctx,pd,t,ripple){const n=3;for(let i=0;i<n;i++){const hx=pd.x+pd.w*(.2+i*.3),hy=pd.y+pd.h*.88,wob=ripple?Math.sin(t*6-i*1.4)*ripple*4:0;
    if(i===1)drawBijliPainted(ctx,hx+wob,hy,pd.h*.0062,1);else motifHorse(ctx,hx+wob,hy,pd.h*.0062,C.terra,C.indigo,1)}
  if(ripple>0){for(let k=0;k<3;k++){const rr=((t*120+k*60)%180)*ripple;ring(ctx,pd.x+pd.w/2,pd.y+pd.h/2,rr,ca(C.gold,.55*(1-rr/180)),3)}}}

/* Interior wall with a mural panel */
function paintInteriorWall(g,x,y,w,h,opts){opts=opts||{};g.fillStyle=opts.night?ca(C.indigo,1):C.ivory;g.fillRect(x,y,w,h);
  g.fillStyle=opts.night?ca(C.terra,.55):ca(C.mustard,.35);g.fillRect(x,y,w,h*.08);zigzag(g,x,y+h*.08,w,h*.03,opts.night?C.gold:C.terra,Math.round(w/30));
  const fy=y+h*.8;g.fillStyle=opts.night?C.indigo:C.terra;g.fillRect(x,fy,w,h-h*.8);diamonds(g,x,fy+h*.03,w,h*.05,opts.night?ca(C.gold,.6):C.mustard,Math.round(w/40));
  g.fillStyle=opts.night?ca(C.charcoal,.4):ca(C.brown,.25);g.fillRect(x,fy,w,6)}
function paintPillar(g,x,y,w,h,night){R.rect(g,x,y,w,h,night?C.terra:C.verm,{sw:3});R.rect(g,x-w*.2,y,w*1.4,h*.06,C.mustard,{sw:2.5});R.rect(g,x-w*.2,y+h*.94,w*1.4,h*.06,C.mustard,{sw:2.5});
  for(let i=0;i<6;i++)poly(g,[[x+w/2,y+h*(.12+i*.13)],[x+w*.8,y+h*(.17+i*.13)],[x+w/2,y+h*(.22+i*.13)],[x+w*.2,y+h*(.17+i*.13)]],C.mustard)}
function paintMuralPanel(g,m,horses){R.rect(g,m.x-14,m.y-14,m.w+28,m.h+28,C.mustard,{sw:3});R.rect(g,m.x,m.y,m.w,m.h,C.terra,{sw:3});
  dotRow(g,m.x-7,m.y-7,m.w+14,16,3,C.verm);dotRow(g,m.x-7,m.y+m.h+7,m.w+14,16,3,C.verm);
  const r=rng(5);for(let i=0;i<14;i++)motifFlower(g,m.x+m.w*(.05+r()*.9),m.y+m.h*(.08+r()*.18),8+r()*5,C.ivory,C.mustard);
  zigzag(g,m.x,m.y+m.h*.9,m.w,m.h*.06,C.mustard,Math.round(m.w/22));
  (horses||[]).forEach(hh=>motifHorse(g,hh.x,hh.y,hh.s,hh.c||C.ivory,hh.m||C.indigo,hh.d||1))}

/* Clay lamp (diya). o: lit 0..1, lean, oil, wick 0/1/2, glow, t, hl */
const LAMP_BODY='M-34 -14 C -32 6 -10 12 6 10 C 24 8 36 -2 44 -18 L 30 -14 C 10 -10 -14 -10 -34 -14 Z';
function drawDiya(ctx,x,y,s,o){o=o||{};ctx.save();ctx.translate(x,y);ctx.scale(s,s);if(o.rot)ctx.rotate(o.rot);
  if(o.glow&&o.lit>0.05){const k=o.lit;dot(ctx,8,-40,62*k,ca(C.gold,.13));dot(ctx,8,-40,40*k,ca(C.gold,.18));
    for(let i=0;i<10;i++){const a=i/10*TAU+(o.t||0)*.15;strokeL(ctx,[[8+Math.cos(a)*48*k,-40+Math.sin(a)*48*k],[8+Math.cos(a)*66*k,-40+Math.sin(a)*66*k]],ca(C.gold,.55),3)}}
  if(o.hl){ring(ctx,4,-6,58,ca(C.gold,.9),5);ring(ctx,4,-6,66,ca(C.verm,.6),2.5)}
  R.ell(ctx,0,10,34,10,C.brown,{sw:2.2});
  R.path(ctx,LAMP_BODY,o.body||C.terra,{sw:3});
  for(let i=0;i<5;i++)dot(ctx,-22+i*11,-2+Math.sin(i)*1.5,2.3,C.ivory);
  if(o.oil!==false){R.ell(ctx,-2,-13,52,7,C.mustard,{sw:1.8})}else{R.ell(ctx,-2,-13,52,7,C.brown,{sw:1.8})}
  const wk=o.wick==null?2:o.wick;
  if(wk===2)strokeL(ctx,[[32,-14],[34,-24]],C.ivory,4);
  else if(wk===1){strokeL(ctx,[[32,-14],[38,-30]],C.ivory,3);strokeL(ctx,[[32,-14],[28,-30]],C.ivory,3);strokeL(ctx,[[32,-14],[33,-34]],C.ivory,3)}
  if(o.lit>0.02)drawFlame(ctx,34,-24,o.lit,o.lean||0,o.t||0,o.seed||0);
  ctx.restore()}
function drawFlame(ctx,x,y,k,lean,t,seed){const fl=1+Math.sin(t*9+seed)*.07+Math.sin(t*23+seed*2)*.04;const h=40*k*fl,w=15*k;
  ctx.save();ctx.translate(x,y);ctx.rotate(clamp(lean,-1.3,1.3)+Math.sin(t*5+seed)*.05);
  ctx.beginPath();ctx.moveTo(0,-h);ctx.bezierCurveTo(w*.9,-h*.5,w,-h*.05,0,0);ctx.bezierCurveTo(-w,-h*.05,-w*.9,-h*.5,0,-h);ctx.closePath();
  ctx.fillStyle=C.gold;ctx.fill();ctx.lineWidth=2.4;ctx.strokeStyle=C.brown;ctx.stroke();
  ctx.beginPath();ctx.moveTo(0,-h*.55);ctx.bezierCurveTo(w*.4,-h*.3,w*.42,-h*.05,0,-1);ctx.bezierCurveTo(-w*.42,-h*.05,-w*.4,-h*.3,0,-h*.55);ctx.fillStyle=C.verm;ctx.fill();
  ctx.restore()}
/* small geometric sparkle used for magic */
function sparkle(ctx,x,y,r,col,a){ctx.save();ctx.globalAlpha*=a==null?1:a;poly(ctx,[[x,y-r],[x+r*.25,y-r*.25],[x+r,y],[x+r*.25,y+r*.25],[x,y+r],[x-r*.25,y+r*.25],[x-r,y],[x-r*.25,y-r*.25]],col||C.gold);ctx.restore()}
function burst(ctx,x,y,k,col){if(k<=0||k>=1)return;const r=30+k*90;ctx.save();ctx.globalAlpha=1-k;for(let i=0;i<10;i++){const a=i/10*TAU;sparkle(ctx,x+Math.cos(a)*r,y+Math.sin(a)*r,10*(1-k)+4,col||C.gold)}ring(ctx,x,y,r*.7,col||C.gold,4);ctx.restore()}
