/* ===== Episode 3 cast: the family from Episodes 1 and 2 on this episode's palette, a third child and a neighbour ===== */
/* every skin tone maps to Orange in the nine-token palette; clothes keep each person's Episode 2 colour where the palette allows */
Object.assign(FAMILY.gran,{sk:P.ochre});Object.assign(FAMILY.boy,{sk:P.ochre,name:'Child 2'});Object.assign(FAMILY.girl,{name:'Child 1'});
Object.assign(FAMILY.father,{sk:P.ochre,c1:P.turmeric,c2:P.ivory});
FAMILY.little={name:'Child 3',sk:P.ochre,hair:K,style:'bun',cloth:'lehenga',c1:P.verm,c2:P.turmeric,h:.58,head:1.24};
FAMILY.neighbour={name:'Neighbour',sk:P.ochre,hair:K,style:'bun',cloth:'sari',c1:P.teal,c2:P.turmeric,bindi:1,ear:1,bangle:1,h:.98,head:1};
/* a gently disappointed mouth (smile 0), used before a kind action */
{const _u=Person.prototype.update;Person.prototype.update=function(dt,t){_u.call(this,dt,t);if(!this.sadP){const hy=this.hy;this.sadP=ln(this.head,`M-6 ${hy+23}Q0 ${hy+18} 6 ${hy+23}`,K,2.4)}
  const sad=this.smile===0;show(this.sadP,sad);if(sad){show(this.mouth.smile,false);show(this.mouth.big,false)}}}
/* hand and prop positions account for each person's height (children are smaller) */
Person.prototype.world=function(lx,ly){const k=this.s*this.D.h,y0=this.seat?110:0;return[this.x+lx*k*this.f,this.y+(ly+y0)*k]};
function warmGlow(parent,r){const g=grp(parent);const a=circ(g,0,0,r,P.gold,0);const b=circ(g,0,0,r*.84,P.turmeric,0);const c=circ(g,0,0,r*.66,P.ivory,0);
  const d=[];for(let i=0;i<28;i++){const q=i/28*TAU;d.push(`M${f1(Math.cos(q)*r*1.04)} ${f1(Math.sin(q)*r*1.04)}L${f1(Math.cos(q)*r*1.18)} ${f1(Math.sin(q)*r*1.18)}`)}ln(g,d.join(''),P.turmeric,5);
  return{g,k:1,update(t){op(g,this.k);if(this.k>0)tf(g,0,0,1+.03*Math.sin(t*TAU/4)*MV()*this.k)}}}
/* ---- props ---- */
function kalash(parent){const g=grp(parent);[-1,0,1].forEach(i=>leaf(g,46,13,P.leaf,-90+i*34,i*8,-74));circ(g,0,-82,20,P.gold,3.4);ln(g,'M-12 -92Q0 -100 12 -92',P.verm,3);
  shp(g,'M-20 -70H20L24 -60Q52 -40 44 -10Q34 14 0 16Q-34 14 -44 -10Q-52 -40 -24 -60Z',Pat.u('vlines',P.gold,P.turmeric,.7),4);ln(g,'M-40 -30Q0 -16 40 -30',P.verm,4);
  circ(g,0,-24,8,P.verm,2.4);return g}
function thali(parent){const g=grp(parent);ell(g,0,0,80,24,P.gold,4);ell(g,0,-3,66,18,P.turmeric,3);const d=diya(g,{col:P.terra});d.s=.4;d.lit=1;d.y=-6;g._d=d;
  circ(g,-40,-6,9,P.verm,2.2);circ(g,40,-6,9,P.turmeric,2.2);[[-24,-12],[28,-14]].forEach(([x,y],i)=>{const m=marigold(g,9,i?P.pink:P.gold);tf(m,x,y,1)});return g}
function offeringBowl(parent,col){const g=grp(parent);shp(g,'M-26 0Q-22 22 0 24Q22 22 26 0Z',Pat.u('vlines',P.gold,P.terra,.6),3);ell(g,0,0,26,7,col||P.verm,2.6);return g}
function giftBox(parent){const g=grp(parent);shp(g,'M-44 -30H44V40H-44Z',Pat.u('flora',P.turmeric,P.pink,.6),4);shp(g,'M-50 -44H50V-28H-50Z',P.verm,3.4);ln(g,'M0 -44V40',P.turmeric,8);ln(g,'M0 -44V40',K,1.6);
  shp(g,'M0 -44C-30 -74 -40 -48 0 -44C40 -48 30 -74 0 -44Z',P.turmeric,3);return g}
function colourBowls(parent,full){const g=grp(parent);const cols=[P.pink,P.turmeric,P.leaf,P.teal,P.verm];cols.forEach((c,i)=>{const b=grp(g,{transform:`translate(${(i-2)*44} ${i%2*8})`});
  shp(b,'M-18 0Q-16 16 0 17Q16 16 18 0Z',P.ivory,2.6);ell(b,0,0,18,6,full?c:P.ivory,2.4);if(full)ell(b,0,-3,11,4,c,0)});return g}
function peacock(parent){const g=grp(parent);for(let i=0;i<7;i++){const a=-150+i*20;const f=grp(g,{transform:`rotate(${a}) translate(70 0)`});shp(f,'M-40 0Q0 -16 30 0Q0 16 -40 0Z',P.leaf,2.4);circ(f,16,0,8,P.teal,2);circ(f,16,0,3.4,P.verm,0)}
  shp(g,'M-22 10Q-30 -30 0 -32Q24 -30 22 10Q10 26 -6 24Q-20 22 -22 10Z',Pat.u('fish',P.turmeric,P.teal,.5),3.4);shp(g,'M10 -28Q14 -60 30 -66Q42 -64 38 -54Q30 -50 24 -40Q20 -30 18 -22Z',P.teal,3);
  circ(g,32,-60,2.6,K,0);shp(g,'M40 -60L50 -57L40 -54Z',P.turmeric,1.6);ln(g,'M30 -68L26 -80M34 -68L36 -80',K,2);circ(g,26,-81,3,P.turmeric,1.2);circ(g,36,-81,3,P.turmeric,1.2);ln(g,'M-4 24V40M8 24V40',K,3);return g}
/* sparkles: tiny flat stars that pop around a point */
function sparkleRing(s,parent,n){const g=grp(parent);const st=[];for(let i=0;i<n;i++){const q=grp(g);star4(q,0,0,12,i%2?P.turmeric:P.ivory);st.push(q)}
  const o={g,k:0,x:0,y:0,r:200,update(dt,t){op(g,this.k>0?1:0);if(this.k>0)st.forEach((q,i)=>{const a=i/n*TAU+t*.3;const rr=this.r*(.7+.3*Math.sin(t*2+i));tf(q,this.x+Math.cos(a)*rr,this.y+Math.sin(a)*rr*.6,this.k*(.7+.3*Math.sin(t*3+i)))})}};s.parts.push(o);return o}
/* a ring of small flowers that blooms round a point */
function flowerRing(s,parent,n,rx,ry){const g=grp(parent);const fl=[];for(let i=0;i<n;i++){const f=tinyFlower(g,16,[P.pink,P.turmeric,P.verm,P.ivory][i%4]);fl.push(f)}
  const o={g,k:0,x:0,y:0,rx,ry,update(dt,t){op(g,this.k>0?1:0);if(this.k>0)fl.forEach((f,i)=>{const a=i/n*TAU;tf(f,this.x+Math.cos(a)*this.rx,this.y+Math.sin(a)*this.ry,clamp(this.k*1.5-(i%3)*.2,0,1)*1.3,t*15)})}};s.parts.push(o);return o}
