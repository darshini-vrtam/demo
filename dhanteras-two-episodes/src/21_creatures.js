/* ===== Mount Mandara: rock, leaf and geometric bands; the bands slide sideways to read as rotation ===== */
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

/* ===== Kurma: the divine tortoise. Origin at the base of his shell; the mountain rests at (0,-112) ===== */
function kurma(parent){const g=grp(parent);const glow=grp(g);const gr=[];for(let i=0;i<3;i++){const r=grp(glow);el('ellipse',{cx:0,cy:-40,rx:260+i*60,ry:70+i*22,fill:'none',stroke:K,'stroke-width':9},r);
    el('ellipse',{cx:0,cy:-40,rx:260+i*60,ry:70+i*22,fill:'none',stroke:i%2?P.ivory:P.turmeric,'stroke-width':5,'stroke-dasharray':i%2?'.1 14':'26 10','stroke-linecap':'round'},r);gr.push(r)}
  const body=grp(g);const sk=Pat.u('dots',P.ivory,P.leaf,.8);
  shp(body,'M-140 6C-170 30 -210 38 -228 26C-206 10 -176 2 -150 -2Z',sk,3.6);shp(body,'M-176 -14L-214 -6L-178 4Z',sk,3);
  const head=grp(body);shp(head,'M166 -24C196 -58 250 -48 264 -22C270 -2 244 12 204 8C186 6 172 -6 166 -24Z',sk,4);
  circ(head,236,-28,9,P.ivory,2.6);circ(head,239,-28,4.4,K,0);circ(head,237.5,-30,1.3,P.foam,0);ln(head,'M246 -6Q256 -8 262 -16',K,2.6);circ(head,258,-26,1.6,K,0);
  shp(body,'M140 6C170 32 214 42 236 30C214 12 182 2 150 -2Z',sk,3.6);
  const dome='M-182 0C-172 -82 -100 -114 0 -114C100 -114 172 -82 182 0Z';const cl=clipIn(body,dome);
  shp(body,dome,P.gold,5.5);const pl=grp(body,{'clip-path':cl});
  for(let r=0;r<4;r++)for(let c=-5;c<=5;c++){const x=c*46+(r%2?23:0),y=-18-r*34;const h=`M${x-20} ${y}L${x-10} ${y-16}L${x+10} ${y-16}L${x+20} ${y}L${x+10} ${y+16}L${x-10} ${y+16}Z`;
    shp(pl,h,(r+c)%3===0?P.ochre:P.turmeric,2.6);circ(pl,x,y,3,K,0)}
  ln(body,'M-150 -56Q0 -100 150 -56',K,2);
  circ(body,0,-62,24,P.sea,3.4);circ(body,0,-62,15,'none',4,{stroke:P.gold});circ(body,0,-62,5,P.turmeric,2);
  shp(body,'M-194 0H194Q190 16 172 20H-172Q-190 16 -194 0Z',P.terra,3.6);ln(body,'M-176 10H176',P.ivory,4,{'stroke-dasharray':'.1 12'});
  return{g,glow,gr,body,head,ring:0,breath:0,update(t){tf(this.body,0,0,1,0,1,1+.012*Math.sin(t*1.4)*MV());this.head.setAttribute('transform',`rotate(${f1(Math.sin(t*.7)*2*MV())} 180 -20)`);
    op(this.glow,this.ring);if(this.ring>0)gr.forEach((r,i)=>tf(r,0,0,.9+.1*this.ring+.03*Math.sin(t*1.2-i)*MV()))}}}

/* ===== Vasuki: one continuous patterned rope. Points carry depth (z<0 is behind the mountain) ===== */
function vasuki(back,front,headLayer){const pools={b:[],f:[]};
  const mk=(parent)=>{const g=grp(parent);const a={g,k:ln(g,'',K,36),b:ln(g,'',P.leaf,27),r:ln(g,'',K,27,{'stroke-dasharray':'3 21','stroke-linecap':'butt'}),
    d:ln(g,'',P.turmeric,8,{'stroke-dasharray':'.1 24'}),e:ln(g,'',P.ivory,3,{'stroke-dasharray':'.1 12'})};return a};
  const head=grp(headLayer);const hd=grp(head);
  const hood='M-16 0C-44 -18 -60 -70 -44 -104C-28 -130 28 -130 44 -104C60 -70 44 -18 16 0Z';
  shp(hd,hood,Pat.u('fish',P.turmeric,P.leaf,.75),4.6);ln(hd,'M-30 -24C-46 -60 -40 -96 -22 -112M30 -24C46 -60 40 -96 22 -112',P.turmeric,3);
  circ(hd,0,-80,17,P.turmeric,3);circ(hd,0,-80,9,P.verm,2.4);circ(hd,0,-80,3,P.ivory,0);
  shp(hd,'M-14 -118L-8 -138L0 -124L8 -138L14 -118Z',P.turmeric,2.6);circ(hd,0,-128,2.6,P.verm,0);
  shp(hd,'M-20 -30C-22 -58 22 -58 20 -30C20 -12 -20 -12 -20 -30Z',P.leaf,3.6);
  for(const sd of[-1,1]){circ(hd,sd*9,-40,6.5,P.ivory,2.4);circ(hd,sd*9,-39,3.4,K,0);circ(hd,sd*9-1,-40.5,1,P.foam,0)}
  ln(hd,'M-7 -24Q0 -19 7 -24',K,2.4);circ(hd,-4,-30,1.2,K,0);circ(hd,4,-30,1.2,K,0);
  const tip=shp(front,'M0 -12L-30 0L0 12Z',P.leaf,3.4);
  return{head,hd,flow:0,
    draw(list,o){o=o||{};/* list of [x,y,z]; arc-length window [w0,w1] */const n=list.length;const S=[0];for(let i=1;i<n;i++)S.push(S[i-1]+Math.hypot(list[i][0]-list[i-1][0],list[i][1]-list[i-1][1]));
      const tot=S[n-1];const w0=o.w0||0,w1=o.w1==null?tot:o.w1;const runs=[];let cur=null;
      for(let i=0;i<n;i++){if(S[i]<w0||S[i]>w1){cur=null;continue}const fr=list[i][2]>=0;if(!cur||cur.fr!==fr){const prev=cur;cur={fr,p:[],s0:S[i]};if(prev){cur.p.push(prev.p[prev.p.length-1]);cur.s0=prev.sEnd}runs.push(cur)}
        cur.p.push([list[i][0],list[i][1]]);cur.sEnd=S[i]}
      const used={b:0,f:0};for(const r of runs){if(r.p.length<2)continue;const key=r.fr?'f':'b';let a=pools[key][used[key]];if(!a){a=mk(r.fr?front:back);pools[key].push(a)}used[key]++;
        const d=pts(r.p,false);for(const k of['k','b','r','d','e'])if(a[k]._d!==d){a[k]._d=d;a[k].setAttribute('d',d)}
        const off=f1(this.flow-r.s0);a.r.setAttribute('stroke-dashoffset',off);a.d.setAttribute('stroke-dashoffset',f1(this.flow-r.s0+12));a.e.setAttribute('stroke-dashoffset',f1(this.flow-r.s0+6));show(a.g,true)}
      for(const key of['b','f'])for(let i=used[key];i<pools[key].length;i++)show(pools[key][i].g,false);
      /* tail tip at the window start, head at the window end */
      const at=(s)=>{let i=1;while(i<n-1&&S[i]<s)i++;const t=(s-S[i-1])/((S[i]-S[i-1])||1);return[lerp(list[i-1][0],list[i][0],t),lerp(list[i-1][1],list[i][1],t),Math.atan2(list[i][1]-list[i-1][1],list[i][0]-list[i-1][0])]};
      const a=at(Math.max(w0,0)+.01);tip.setAttribute('transform',`translate(${f1(a[0])} ${f1(a[1])}) rotate(${f1(a[2]/DEG)})`);show(tip,w1-w0>20);
      const e=at(Math.min(w1,tot)-.01);const ang=o.headUp&&w1>=tot-1?(o.sway||0):(e[2]/DEG+90);head.setAttribute('transform',`translate(${f1(e[0])} ${f1(e[1])}) rotate(${f1(ang)}) scale(${f3(o.hs||1)})`);
      show(head,w1>S[1]);return tot}}}

/* ===== Halahala: a contained, ornamental swirl of violet, indigo and muted purple ===== */
function halahala(parent){const g=grp(parent);let edge='';const n=14;for(let i=0;i<=n;i++){const a=i/n*TAU;const r=100;const x=Math.cos(a)*r,y=Math.sin(a)*r;
    if(i===0)edge=`M${f1(x)} ${f1(y)}`;else{const pa=(i-.5)/n*TAU;edge+=`Q${f1(Math.cos(pa)*r*1.16)} ${f1(Math.sin(pa)*r*1.16)} ${f1(x)} ${f1(y)}`}}
  shp(g,edge+'Z',P.violet,5);const spin=grp(g,{'clip-path':clipIn(g,ellD(0,0,96,96))});
  const sp=(cx,cy,r,col,w,turns)=>{const p=[];for(let i=0;i<=60;i++){const t=i/60,a=t*TAU*(turns||2);p.push([cx+Math.cos(a)*r*t,cy+Math.sin(a)*r*t])}ln(spin,smooth(p,false),col,w)};
  sp(0,0,80,P.mauve,7,2.6);sp(-44,-30,34,P.indigo,5,1.8);sp(40,34,30,P.indigo,5,1.8);sp(46,-40,24,P.mauve,4,1.6);sp(-40,40,26,P.mauve,4,1.6);
  let sc='';for(let i=0;i<10;i++){const a=i/10*TAU;sc+=`M${f1(Math.cos(a)*78)} ${f1(Math.sin(a)*78)}A10 10 0 0 1 ${f1(Math.cos(a+.25)*78)} ${f1(Math.sin(a+.25)*78)}`}ln(spin,sc,P.ivory,3);
  circ(g,0,0,100,'none',3,{stroke:P.mauve,'stroke-dasharray':'2 12'});
  return{g,spin,x:0,y:0,s:1,update(t){tf(this.g,this.x,this.y,this.s);tf(this.spin,0,0,1,t*14*MV())}}}

/* ===== The Amrit Kalash (and, in Episode 7, the magical treasure pot with tiny carved lotus flowers) ===== */
function kalash(parent,o){o=o||{};const g=grp(parent);const halo_=grp(g);const hr=[];for(let i=0;i<3;i++){const r=grp(halo_);circ(r,0,-40,96+i*30,'none',3,{stroke:i%2?P.ivory:P.turmeric,'stroke-dasharray':i%2?'.1 12':'18 10','stroke-width':i%2?6:4,'stroke-linecap':'round'});hr.push(r)}
  rays(halo_,70,92,16,P.turmeric,4).setAttribute('transform','translate(0 -40)');
  const body='M-18 -58L-20 -46C-62 -34 -66 30 -30 46L-24 56L24 56L30 46C66 30 62 -34 20 -46L18 -58Z';
  dbl(g,body,P.gold,0,0,.9,5);const cl=clipIn(g,body);const band=grp(g,{'clip-path':cl});
  el('rect',{x:-70,y:-6,width:140,height:24,fill:Pat.u('petals',P.turmeric,P.verm,.75)},band);ln(band,'M-70 -6H70M-70 18H70',K,2.6);
  ln(band,'M-60 -24H60',P.turmeric,4,{'stroke-dasharray':'.1 9'});ln(band,'M-60 32H60',P.ivory,3.6,{'stroke-dasharray':'.1 9'});
  for(let i=0;i<4;i++)ln(band,`M-18 ${-54+i*3.4}H18`,K,1.4);
  if(o.lotus){[-34,-12,12,34].forEach((x,i)=>{const l=grp(band,{transform:`translate(${x} ${i%2?46:44}) scale(.36)`});
    shp(l,'M0 0C-14 -10 -10 -30 0 -36C10 -30 14 -10 0 0Z',P.turmeric,4);shp(l,'M0 0C-24 -2 -30 -18 -26 -26C-14 -22 -4 -12 0 0Z',P.turmeric,4);shp(l,'M0 0C24 -2 30 -18 26 -26C14 -22 4 -12 0 0Z',P.turmeric,4)});
    [-46,46].forEach(x=>{const l=grp(band,{transform:`translate(${x} -24) scale(.3)`});shp(l,'M0 0C-14 -10 -10 -30 0 -36C10 -30 14 -10 0 0Z',P.turmeric,4);shp(l,'M0 0C-24 -2 -30 -18 -26 -26C-14 -22 -4 -12 0 0Z',P.turmeric,4);shp(l,'M0 0C24 -2 30 -18 26 -26C14 -22 4 -12 0 0Z',P.turmeric,4)})}
  ell(g,0,-58,25,7,P.turmeric,3.4);const nec=grp(g);ell(nec,0,-60,17,4.6,P.ivory,2.2);ell(nec,0,-60,11,3,P.turmeric,1.8);ell(nec,0,-60,5,1.6,P.ivory,1.4);
  return{g,halo:halo_,hr,nec,glow:o.glow||0,x:0,y:0,s:1,update(t){tf(this.g,this.x,this.y,this.s);op(this.halo,clamp(this.glow,0,1));
    if(this.glow>0){const m=MV();hr.forEach((r,i)=>tf(r,0,-40*(1-(.9+.1*this.glow)),.9+.1*clamp(this.glow,0,1.6)+.04*Math.sin(t*1.1-i*.9)*m))}
    tf(this.nec,0,-60*(1-(1+.05*Math.sin(t*1.6)*MV())),1+.05*Math.sin(t*1.6)*MV())}}}

/* ===== Treasures ===== */
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
function horse(parent){const g=grp(parent);const iv=P.ivory;
  ln(g,'M-80 -84Q-108 -66 -100 -30',K,10);ln(g,'M-80 -84Q-108 -66 -100 -30',P.turmeric,6);ln(g,'M-84 -76Q-100 -60 -96 -36',P.verm,2.4);
  limb(g,'M-62 -40L-70 -6',iv,12);limb(g,'M-42 -40L-40 -6',iv,12);limb(g,'M44 -44L50 -6',iv,12);limb(g,'M60 -46L86 -62L94 -44',iv,12);
  [[-72,-4],[-42,-4],[50,-4]].forEach(([x,y])=>shp(g,`M${x-8} ${y-4}H${x+10}L${x+9} ${y+4}H${x-7}Z`,P.gold,2.4));
  const body='M-86 -70C-86 -104 50 -108 70 -78C78 -60 68 -40 50 -38L-62 -38C-84 -40 -88 -54 -86 -70Z';dbl(g,body,iv,-8,-70,.9,4.6);
  shp(g,'M-44 -100C-30 -110 10 -110 24 -98L30 -54C0 -46 -32 -46 -50 -54Z',Pat.u('petals',P.turmeric,P.gold,.55),3.2);ln(g,'M-50 -54Q-12 -44 30 -54',P.verm,4);
  shp(g,'M52 -90C60 -130 84 -150 104 -146C122 -142 128 -126 116 -116L92 -106L76 -76Z',iv,4.2);
  let m='M58 -92';for(let i=0;i<6;i++){const t=i/5;const x=lerp(58,96,t),y=lerp(-92,-146,t);m+=`Q${f1(x-22)} ${f1(y+2)} ${f1(x-8)} ${f1(y-10)}`}m+='L102 -146L64 -84Z';shp(g,m,P.turmeric,3);
  ln(g,'M50 -100Q58 -120 74 -134',P.verm,3);circ(g,106,-132,3.4,K,0);ln(g,'M100 -140Q106 -144 112 -140',K,2.2);shp(g,'M92 -152L98 -168L104 -152Z',iv,2.6);
  ln(g,'M88 -112L112 -120',P.verm,3.4);return{g,update(){}}}
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
function jewels(parent){const g=grp(parent);
  [[-40,-12],[-22,-8],[-4,-14],[14,-8]].forEach(([x,y],i)=>{ell(g,x,y,16,6,P.turmeric,2.8);ell(g,x,y-5,16,6,P.gold,2.8)});
  let pearls='';for(let i=0;i<13;i++){const t=i/12;const x=lerp(-60,60,t),y=-50+Math.sin(t*Math.PI)*34;pearls+=`M${f1(x)} ${f1(y)}h.1`}ln(g,pearls,K,13);ln(g,pearls,P.foam,9);
  const j1=jewel(g,P.verm);tf(j1,-8,-70,1.2);const j2=jewel(g,P.turq);tf(j2,34,-56,.9);const j3=jewel(g,P.pink);tf(j3,-44,-54,.85);
  for(const [x,y] of[[18,-92],[-30,-96],[48,-84]])star4(g,x,y,8,P.turmeric);return{g,update(){}}}

/* ===== Episode 7 symbols (designs proposed) ===== */
function symbol(parent,key){const g=grp(parent);
  if(key==='health'){sprig(g,1);g.lastChild.setAttribute('transform','translate(0 46)');circ(g,0,46,4,P.leaf,1.6)}
  else if(key==='family'){ln(g,'M-34 20Q0 40 34 20Q22 -16 0 -30Q-22 -16 -34 20',K,6);ln(g,'M-34 20Q0 40 34 20Q22 -16 0 -30Q-22 -16 -34 20',P.leaf,3);
    [[-34,20,.5,P.pink],[34,20,.5,P.coral],[0,-30,.56,P.pink]].forEach(([x,y,s,c])=>{const l=lotus(g,{r:44,n:5,open:.95,pad:false,col:c});l.g.setAttribute('transform',`translate(${x} ${y+12}) scale(${s})`)})}
  else if(key==='kind'){shp(g,'M-44 40C-50 20 -40 6 -24 4L22 4C36 4 40 14 30 18L-2 18L34 18C46 16 50 8 46 0L54 -6C62 4 58 24 40 32L6 40Z',P.ochre,3.4);ln(g,'M-20 18H8',K,2);
    ln(g,'M10 0V-30',K,6);ln(g,'M10 0V-30',P.leaf,3);leaf(g,18,6,P.leaf,-150,10,-12);const f=marigold(g,16,P.pink);f.setAttribute('transform','translate(10 -42)')}
  else if(key==='wisdom'){for(let i=0;i<4;i++){shp(g,`M-56 ${-24+i*14}Q-58 ${-30+i*14} -50 ${-30+i*14}H50Q58 ${-30+i*14} 56 ${-24+i*14}Q58 ${-18+i*14} 50 ${-18+i*14}H-50Q-58 ${-18+i*14} -56 ${-24+i*14}Z`,i%2?P.ochre:P.ivory,2.6);
      ln(g,`M-40 ${-24+i*14}H-10M4 ${-24+i*14}H40`,K,1.4)}ln(g,'M0 -38V40',K,6);ln(g,'M0 -38V40',P.verm,3);circ(g,0,40,6,P.turmeric,2.4);shp(g,'M0 -38L-14 -50L-10 -36Z',P.verm,2);shp(g,'M0 -38L14 -50L10 -36Z',P.verm,2)}
  else if(key==='gold'){[[-24,30],[-24,22],[-24,14],[14,30],[14,22],[-4,6]].forEach(([x,y])=>{ell(g,x,y,20,7,P.turmeric,2.8)});circ(g,-24,-10,16,P.turmeric,3);circ(g,-24,-10,9,'none',2,{stroke:P.gold});
    const j=jewel(g,P.verm);tf(j,24,-16,1.1)}
  return g}
const SYMS=[{key:'health',label:'GOOD HEALTH',desc:'Taking care of our bodies and minds.'},{key:'family',label:'LOVE AND FAMILY',desc:'Caring for the people around us.'},
  {key:'kind',label:'KINDNESS',desc:'Helping others and showing compassion.'},{key:'wisdom',label:'WISDOM',desc:'Learning how to live well and make good choices.'},
  {key:'gold',label:'GOLD AND JEWELS',desc:'Material treasures that can bring comfort and joy.'}];

/* ===== Little silhouettes for the kindness pause: family, friends, a bird and animals ===== */
function person(g,x,y,s,col){const p=grp(g,{transform:`translate(${x} ${y}) scale(${s})`});circ(p,0,-74,13,col,3);shp(p,'M-14 -58Q0 -64 14 -58L20 0H-20Z',col,3);return p}
function silhouette(parent,kind){const g=grp(parent);circ(g,0,-40,74,P.indigo,4);circ(g,0,-40,64,'none',2.4,{stroke:P.turmeric,'stroke-dasharray':'.1 10','stroke-width':5,'stroke-linecap':'round'});
  if(kind==='family'){person(g,-30,0,.9,P.coral);person(g,30,0,.9,P.ochre);person(g,0,4,.6,P.turmeric)}
  else if(kind==='friends'){person(g,-22,0,.75,P.pink);person(g,22,0,.75,P.leaf);ln(g,'M-10 -26Q0 -18 10 -26',K,6);ln(g,'M-10 -26Q0 -18 10 -26',P.ochre,3)}
  else{const b=grp(g,{transform:'translate(-6 -80) scale(.8)'});shp(b,'M-20 0Q0 -16 22 -2L34 -6L26 4Q0 16 -20 0Z',P.verm,3);shp(b,'M-4 -4Q4 -20 16 -14Q10 -6 -4 -4Z',P.turmeric,2.4);circ(b,16,-4,2,K,0);
    const c=grp(g,{transform:'translate(0 -6) scale(.36)'});kamadhenu(c)}
  return g}
/* a lotus with a heart at its centre, for the breathing pause */
function heartLotus(parent){const g=grp(parent);const l=lotus(g,{r:90,n:7,open:.9});shp(g,'M0 -24C-14 -44 -40 -34 -34 -12C-30 2 -12 10 0 22C12 10 30 2 34 -12C40 -34 14 -44 0 -24Z',P.verm,3.4);
  tf(g.lastChild,0,-34,1);return{g,l}}
/* a small orb of shared light */
function orb(parent){const g=grp(parent);rays(g,26,40,12,P.turmeric,3.4);circ(g,0,0,22,P.turmeric,3.4);circ(g,0,0,12,P.ivory,2.4);circ(g,0,0,4,P.turmeric,0);return g}
