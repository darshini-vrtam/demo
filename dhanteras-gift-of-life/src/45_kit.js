/* ===== Scene kit: backdrop, banks, fish, bubbles, ripples, sparks ===== */
function backdrop(p,W,H,o){const B={};const hz=o.hz;
  el('rect',{x:-500,y:-500,width:W+1000,height:hz+520,fill:TINT.sky},p);
  el('rect',{x:-500,y:-500,width:W+1000,height:hz+520,fill:Pat.get('dots2',mix(TINT.sky,PAL.gold,.4),null,30)},p);
  B.skyTint=el('rect',{x:-500,y:-500,width:W+1000,height:hz+520,fill:TINT.violet,opacity:0},p);
  if(o.sun){B.sun=sun(grp(p),o.sun[2]);tf(B.sun.g,o.sun[0],o.sun[1])}
  B.clouds=(o.clouds||[]).map(([x,y,w],i)=>{const g=cloud(p,w,i+3);tf(g,x,y);return{g,x,y,v:.6+i*.25,ph:i*2}});
  B.behind=grp(p);
  B.ocean=ocean(p,W,H,hz,o.ocean);
  B.update=(t,dt,S)=>{if(B.sun)tf(B.sun.rays,0,0,1,RM?0:t*.004);B.clouds.forEach(c=>tf(c.g,c.x+(RM?0:Math.sin(t*.00008*c.v+c.ph)*40),c.y));
    B.ocean.update(t,dt,S.osp==null?1:S.osp,RM?1:3);op(B.ocean.dark,(S.dark||0)*.55);op(B.skyTint,(S.dark||0)*.35);op(B.ocean.gold,(S.gold||0)*.5)};
  return B}
function bank(p,x0,x1,y){const g=grp(p);const m=(x0+x1)/2,w=x1-x0;
  shape(g,`M${x0} ${y+120}L${x0} ${y+10}Q${x0+w*.12} ${y-16} ${m} ${y-18}Q${x1-w*.12} ${y-16} ${x1} ${y+10}L${x1} ${y+120}Z`,PAL.terra,{w:5,pat:Pat.get('dots2',mix(PAL.terra,PAL.ink,.28),null,16)});
  shape(g,`M${x0} ${y+10}Q${x0+w*.12} ${y-16} ${m} ${y-18}Q${x1-w*.12} ${y-16} ${x1} ${y+10}L${x1} ${y+26}Q${x1-w*.12} ${y+2} ${m} ${y}Q${x0+w*.12} ${y+2} ${x0} ${y+26}Z`,PAL.leaf,{w:4,pat:Pat.get('vstripe',mix(PAL.leaf,PAL.ink,.25),null,8)});
  for(let x=x0+30;x<x1-20;x+=56)shape(g,`M${x-8} ${y-12}L${x} ${y-34}L${x+8} ${y-12}Z`,PAL.leaf,{w:2.6,dbl:false});
  return g}
/* fish swimming along gentle curves; turn() makes them all change direction */
function school(p,W,specs){const list=specs.map(([y,len,c1,c2,v,x],i)=>{const g=grp(p);fish(g,len,c1,c2,i);return{g,y,len,v,x,ph:i*1.7}});
  return{list,turn(){list.forEach(f=>f.v=-f.v)},
    update(t,dt,sp,alpha){list.forEach(f=>{f.x+=f.v*dt*.05*sp;if(f.x>W+120)f.x=-120;if(f.x<-120)f.x=W+120;
      tf(f.g,f.x,f.y+Math.sin(t*.0016+f.ph)*10,1,Math.cos(t*.0016+f.ph)*8*Math.sign(f.v),f.v<0?-1:1);op(f.g,alpha)})}}}
function bubbles(p,n,cx,cy,spread,rise,seed){const r=rng(seed||9);const list=[];for(let i=0;i<n;i++){const g=bubble(p,4+r()*8);list.push({g,dx:(r()-.5)*spread,ph:r(),v:.5+r()*.6})}
  return{update(t,k){list.forEach(b=>{const u=(t*.00025*b.v+b.ph)%1;tf(b.g,cx+b.dx+Math.sin(t*.003+b.ph*9)*8,cy-u*rise,1);op(b.g,k*Math.sin(u*Math.PI)*1.2)})}}}
/* concentric decorative ripples (k 0..1 expands, fades) */
function ripples(p,cx,cy,rx,ry,c){const g=grp(p,{transform:`translate(${cx} ${cy})`});const rs=[0,1,2].map(i=>{const e=grp(g);el('ellipse',{rx,ry,fill:'none',stroke:PAL.ink,'stroke-width':5},e);
    el('ellipse',{rx,ry,fill:'none',stroke:c||PAL.turq,'stroke-width':2.5,'stroke-dasharray':'12 10'},e);return e});
  return{g,set(k){rs.forEach((e,i)=>{const u=clamp(k*1.6-i*.3,0,1);tf(e,0,0,Math.max(.001,.2+u*1.6));op(e,u>0&&u<1?Math.sin(u*Math.PI):0)})}}}
/* little gold-and-ivory motifs flying outward (k 0..1) */
function sparks(p,cx,cy,n,dist,o){o=o||{};const g=grp(p,{transform:`translate(${cx} ${cy})`});const list=[];
  for(let i=0;i<n;i++){const s=grp(g);const a=i/n*TAU+(o.rot||0);
    if(i%3===0){for(let k=0;k<5;k++)el('path',{d:petalD(12,.5),fill:PAL.ivory,stroke:PAL.ink,'stroke-width':1.6,transform:`rotate(${k*72})`},s);dot(s,0,0,3,PAL.gold)}
    else if(i%3===1)el('path',{d:'M0 -11L4 -4L11 0L4 4L0 11L-4 4L-11 0L-4 -4Z',fill:PAL.gold,stroke:PAL.ink,'stroke-width':1.8},s);
    else dot(s,0,0,6,o.c||PAL.ivory,{stroke:PAL.ink,w:2});
    list.push({s,a,d:dist*(.75+((i*37)%10)/40)})}
  return{g,set(k){list.forEach(L=>{const u=Ease.out(clamp(k,0,1));tf(L.s,Math.cos(L.a)*L.d*u,Math.sin(L.a)*L.d*u+(o.lift||0)*u,Math.max(.001,Math.sin(clamp(k,0,1)*Math.PI)*1.1),k*180);op(L.s,k>0&&k<1?1:0)})}}}
/* name plaque under a treasure or symbol, so nothing relies on colour alone */
function plaque(p,x,y,text,size){const g=grp(p,{transform:`translate(${x} ${y})`});size=size||24;const w=text.length*size*.52+34;
  el('rect',{x:-w/2,y:-size*.95,width:w,height:size*1.6,rx:size*.8,fill:PAL.ivory,stroke:PAL.ink,'stroke-width':3.5},g);
  el('rect',{x:-w/2+5,y:-size*.95+5,width:w-10,height:size*1.6-10,rx:size*.6,fill:'none',stroke:PAL.gold,'stroke-width':2},g);
  txt(g,0,size*.32,text,{size,weight:700});return g}
