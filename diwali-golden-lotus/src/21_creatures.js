/* ===== Ocean treasures and the distant Mount Mandara (reused from the Dhanteras build) ===== */
const MANDARA={H:520,hw(v){return 172*Math.pow(1-clamp(v,0,1),.72)*(1-.12*v)+14*v}};
function mandara(parent){const g=grp(parent);const H=MANDARA.H;const L_=[],R_=[];
  for(let i=0;i<=24;i++){const v=i/24;const w=MANDARA.hw(v);L_.push([-w,-v*H]);R_.unshift([w,-v*H])}
  const sil=smooth(L_.concat([[0,-H-10]]).concat(R_),false)+'Z';
  const clip=clipIn(g,sil);const inner=grp(g,{'clip-path':clip});
  const bands=[[0,.16,'rock',P.ochre,P.terra,.9],[.16,.28,'vine',P.leaf,P.ivory,.6],[.28,.46,'rock',P.turmeric,P.ochre,.75],[.46,.56,'petals',P.turmeric,P.terra,.6],
    [.56,.72,'rock',P.ochre,P.leaf,.62],[.72,.8,'dots',P.ivory,P.terra,.8],[.8,1.05,'vine',P.leaf,P.turmeric,.45]];
  const list=bands.map(([a,b,pat,c1,c2,s])=>{const bg=grp(inner);const per=(PATS[pat](c1,c2).w)*s;
    el('rect',{x:-260-per*2,y:f1(-b*H),width:520+per*4,height:f1((b-a)*H+1),fill:Pat.u(pat,c1,c2,s)},bg);
    ln(inner,`M-260 ${f1(-a*H)}H260`,K,3);return{g:bg,per,a}});
  shp(g,sil,'none',5.5);ln(g,smooth(L_.map(([x,y])=>[x*.9+3,y+(y>-H*.95?-4:0)]),false),K,1.8);
  /* little trees on the peak and slopes */
  const tr=(x,y,s,a)=>{const t=grp(g,{transform:`translate(${x} ${y}) rotate(${a}) scale(${s})`});ln(t,'M0 0V-30',K,6);ln(t,'M0 0V-30',P.terra,3);
    leaf(t,30,10,P.leaf,-90,0,-26);leaf(t,26,9,P.leaf,-140,0,-18);leaf(t,26,9,P.leaf,-40,0,-18)};
  tr(-8,-H+6,1.1,-6);tr(12,-H+4,.9,8);tr(-MANDARA.hw(.62)-2,-H*.62,.8,-30);tr(MANDARA.hw(.4)+2,-H*.4,.8,28);tr(-MANDARA.hw(.3)-2,-H*.3,.7,-34);
  return{g,bands:list,rot:0,update(){list.forEach(b=>{const o=((this.rot*(1+b.a*.2))%b.per+b.per)%b.per;tf(b.g,o-b.per,0,1)})}}}

function kamadhenu(parent){const g=grp(parent);const iv=P.ivory;
  ln(g,'M-84 -78Q-104 -60 -98 -30',K,6);ln(g,'M-84 -78Q-104 -60 -98 -30',iv,3);shp(g,'M-98 -32Q-106 -16 -94 -12Q-90 -24 -98 -32Z',P.ochre,2.4);
  for(const [x,y] of[[-60,-30],[-38,-30],[40,-30],[60,-30]]){limb(g,`M${x} ${y}L${x+(x>0?4:-2)} -8`,iv,13);shp(g,`M${x-9} -8H${x+11}L${x+9} 2H${x-7}Z`,P.ochre,2.4)}
  const body='M-86 -66C-86 -108 54 -112 74 -76C84 -54 72 -26 52 -24L-62 -24C-86 -26 -90 -46 -86 -66Z';dbl(g,body,iv,-6,-66,.9,4.6);
  shp(g,'M-40 -100C-30 -112 10 -112 20 -100L26 -54C0 -46 -30 -46 -46 -54Z',Pat.u('petals',P.turmeric,P.verm,.55),3.2);ln(g,'M-48 -54Q-12 -44 26 -54',P.turmeric,4);
  [[-70,-60],[-64,-40],[42,-60],[56,-44],[40,-40]].forEach(([x,y])=>{circ(g,x,y,6,'none',2.4,{stroke:P.terra});circ(g,x,y,2,P.terra,0)});
  shp(g,'M50 -96Q58 -110 70 -100Z',iv,3);
  const head=grp(g);const hd=grp(head);
  shp(hd,'M0 0C8 -22 40 -28 54 -10C62 4 54 22 38 24C20 24 6 14 0 0Z',iv,4.2);shp(hd,'M6 -8C-10 -20 -20 -10 -12 -2Z',iv,3);
  ln(hd,'M14 -18Q8 -38 22 -44',K,7);ln(hd,'M14 -18Q8 -38 22 -44',P.gold,3.6);ln(hd,'M30 -20Q30 -40 44 -42',K,7);ln(hd,'M30 -20Q30 -40 44 -42',P.gold,3.6);
  ln(hd,'M20 -6Q27 -10 33 -6',K,2.6);ln(hd,'M44 14Q50 16 54 12',K,2.4);circ(hd,52,4,2,K,0);circ(hd,24,-14,3,P.verm,0);
  ln(hd,'M2 6Q8 30 28 26',K,7);ln(hd,'M2 6Q8 30 28 26',P.turmeric,4,{'stroke-dasharray':'.1 7'});circ(hd,10,26,6,P.gold,2.4);
  tf(head,62,-90,1);return{g,head,hd,nod:0,update(t){this.hd.setAttribute('transform',`rotate(${f1(this.nod*14+Math.sin(t*.8)*1.5*MV())} 4 4)`)}}}
function airavata(parent){const g=grp(parent);const iv=P.foam;
  ln(g,'M-96 -96Q-110 -80 -104 -60',K,6);ln(g,'M-96 -96Q-110 -80 -104 -60',iv,3);
  for(const x of[-66,-34,30,58]){limb(g,`M${x} -46V-6`,iv,24);shp(g,`M${x-13} -8H${x+13}V2H${x-13}Z`,P.ivory,2.6)}
  const body='M-98 -64C-104 -140 60 -152 84 -92C94 -66 82 -40 66 -38L-80 -38C-98 -40 -100 -50 -98 -64Z';dbl(g,body,iv,-8,-90,.9,4.8);
  shp(g,'M-50 -134C-30 -142 20 -142 40 -132L46 -70C10 -60 -30 -60 -56 -70Z',Pat.u('petals',P.turmeric,P.verm,.6),3.2);ln(g,'M-56 -70Q-6 -56 46 -70',P.turmeric,4);
  ln(g,'M-46 -66V-48M-6 -60V-44M34 -66V-48',P.turmeric,3);[-46,-6,34].forEach(x=>circ(g,x,-44,4,P.verm,2));
  const ear=grp(g);shp(ear,'M66 -120C40 -124 30 -90 46 -70C58 -58 74 -70 76 -84Z',iv,4);shp(ear,'M62 -112C46 -112 42 -92 52 -80C60 -74 68 -82 68 -90Z',Pat.u('dots',P.verm,P.turmeric,.6),2.4);
  shp(g,'M70 -128C96 -136 116 -112 108 -84L84 -76Z',Pat.u('grid',P.verm,P.gold,.6),3.4);circ(g,92,-112,5,P.verm,2);
  ln(g,'M96 -92Q101 -96 106 -92',K,2.6);
  const trunk=grp(g);const segs=[];let par=trunk;for(let i=0;i<5;i++){const s=grp(par);const w=22-i*3;limb(s,'M0 0V24',iv,w);ln(s,`M${-w/2+2} 12H${w/2-2}`,P.ivory,1.6);if(i===0)ln(s,'M-6 4H6',P.verm,3);segs.push(s);par=grp(s,{transform:'translate(0 22)'})}
  shp(g,'M98 -70Q114 -70 118 -60Q110 -62 98 -64Z',P.ivory,2.4);
  return{g,trunk,segs,curl:0,update(t){tf(this.trunk,104,-80,1);const c=this.curl,sw=Math.sin(t*1.1)*3*MV();
    this.segs.forEach((s,i)=>s.setAttribute('transform',`rotate(${f1(lerp(6,-30-i*6,c)+sw)})`))}}}
function kalpavriksha(parent){const g=grp(parent);const trunk=grp(g);
  shp(trunk,'M-16 0C-10 -40 -14 -90 -8 -130L8 -130C14 -90 10 -40 16 0Z',Pat.u('xhatch',K,P.terra,.8),4);ln(trunk,'M-6 -110Q-30 -130 -46 -150M6 -100Q30 -124 48 -142M0 -126V-170',K,8);
  ln(trunk,'M-6 -110Q-30 -130 -46 -150M6 -100Q30 -124 48 -142M0 -126V-170',P.terra,4.5);
  const can=grp(g);const blos=grp(g);const r=rng(17);
  [[-50,-160,46],[48,-152,44],[0,-196,52],[-24,-130,34],[26,-122,34]].forEach(([x,y,R])=>{const c=grp(can);circ(c,x,y,R,P.leaf,4);
    for(let i=0;i<7;i++){const a=i/7*360+r()*20;leaf(c,R*.62,R*.2,i%2?P.leaf:P.turq,a,x,y)}});
  [[-62,-176,P.pink],[-30,-170,P.coral],[10,-220,P.turmeric],[40,-176,P.pink],[66,-150,P.coral],[-8,-150,P.turmeric],[24,-198,P.pink],[-44,-136,P.turmeric],[30,-130,P.pink]]
    .forEach(([x,y,c],i)=>{const b=grp(blos,{transform:`translate(${x} ${y})`});for(let k=0;k<5;k++){const p=grp(b,{transform:`rotate(${k*72})`});shp(p,'M0 0Q5 -7 0 -13Q-5 -7 0 0Z',c,1.8)}circ(b,0,0,3,P.gold,1.4)});
  return{g,trunk,can,blos,grow:1,update(){const k=this.grow;tf(this.trunk,0,0,1,0,clamp(k*1.5,.1,1),clamp(k*1.25,.05,1));
    this.can.setAttribute('transform',`translate(0 ${f1(-150*(1-clamp(k*1.3-.3,0,1)))}) scale(${f3(clamp(k*1.4-.4,0,1))})`);op(this.blos,clamp(k*4-3,0,1))}}}
