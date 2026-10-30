/* ===== Blessing pictures: drawn once per use into any SVG group (Shot 2.2 symbols, Activity 3 cards, Shot 3.3 circle) =====
   Each picture fits inside x -96..96, y -62..62. Faces stay clean of pattern. */
const BLESS=[{key:'family',label:'A loving family'},{key:'friends',label:'Children helping a friend'},{key:'play',label:'A healthy child playing'},
  {key:'book',label:'A book for learning'},{key:'food',label:'A plate of food'},{key:'coins',label:'Gold coins'}];
/* a small front-view folk figure; origin at the feet, about 120 units tall at s=1 */
function folk(parent,o){const g=grp(parent,{transform:`translate(${f1(o.x||0)} ${f1(o.y||0)}) scale(${o.s||1})${o.rot?` rotate(${o.rot})`:''}`});const sk=o.sk||P.ochre,cl=o.cl||P.verm,cl2=o.cl2||P.gold;
  const la=o.la==null?14:o.la,ra=o.ra==null?14:o.ra,ll=o.ll==null?4:o.ll,rl=o.rl==null?4:o.rl;
  const arm=(sd,a)=>{const r=a*DEG;const x0=sd*15,y0=-80,x1=x0+sd*Math.sin(r)*34,y1=y0+Math.cos(r)*34;limb(g,`M${x0} ${y0}L${f1(x1)} ${f1(y1)}`,sk,6.5);circ(g,x1,y1,4.6,sk,2)};
  const leg=(sd,a)=>{const r=a*DEG;const x0=sd*7,y0=-32,x1=x0+sd*Math.sin(r)*30,y1=y0+Math.cos(r)*30;limb(g,`M${x0} ${y0}L${f1(x1)} ${f1(y1)}`,sk,7);ell(g,x1+sd*3,y1,6,3.4,sk,1.8)};
  if(o.sit){limb(g,'M-8 -34L-34 -30L-46 -6',sk,7);limb(g,'M8 -34L-20 -14L-30 4',sk,7)}else{leg(-1,ll);leg(1,rl)}
  arm(-1,la);arm(1,ra);
  shp(g,o.skirt?'M-14 -86Q0 -90 14 -86L24 -30H-24Z':'M-14 -86Q0 -90 14 -86L18 -30H-18Z',Pat.u('vlines',cl2,cl,.55),3);shp(g,'M-17 -40H17L18 -30H-18Z',cl2,2);
  limb(g,'M0 -86V-92',sk,8);
  if(o.hair==='bun')circ(g,0,-120,8,K,0);
  circ(g,0,-104,14,sk,3);shp(g,o.hair==='short'?'M-15 -104Q-16 -122 0 -121Q16 -122 15 -104Q12 -114 0 -114Q-12 -114 -15 -104Z':'M-15 -100Q-17 -122 0 -121Q17 -122 15 -100Q14 -112 0 -114Q-14 -112 -15 -100Z',K,0);
  if(o.hair==='plait')ln(g,'M13 -104Q20 -88 16 -74',K,4.4);
  circ(g,-5,-104,1.9,K,0);circ(g,5,-104,1.9,K,0);ln(g,'M-4.5 -98Q0 -94 4.5 -98',K,1.6);circ(g,0,-111,1.6,P.verm,0);return g}
function blessArt(parent,key,o){o=o||{};const g=grp(parent);
  const ground=(col)=>{shp(g,'M-96 40Q0 30 96 40V62H-96Z',Pat.u('hatch',K,col||P.leaf,.6),2.6)};
  if(key==='family'){circ(g,0,-10,64,P.turmeric,0);ground();
    folk(g,{x:-70,y:52,s:.62,sk:P.terra,cl:P.leaf,cl2:P.turmeric,hair:'short',la:20,ra:58});
    folk(g,{x:-30,y:54,s:.92,sk:P.ochre,cl:P.indigo,cl2:P.gold,hair:'short',la:58,ra:32});
    folk(g,{x:22,y:54,s:.88,sk:P.terra,cl:P.verm,cl2:P.gold,hair:'bun',skirt:1,la:32,ra:58});
    folk(g,{x:64,y:52,s:.6,sk:P.ochre,cl:P.pink,cl2:P.turmeric,hair:'plait',skirt:1,la:58,ra:20})}
  else if(key==='friends'){circ(g,-40,-30,26,P.turmeric,2.6);ground();
    folk(g,{x:-44,y:52,s:.72,sk:P.ochre,cl:P.sea,cl2:P.turmeric,hair:'short',sit:1,la:10,ra:150});
    folk(g,{x:30,y:52,s:.82,sk:P.terra,cl:P.coral,cl2:P.leaf,hair:'plait',skirt:1,la:118,ra:20,ll:10,rl:-4})}
  else if(key==='play'){circ(g,-58,-30,22,P.turmeric,2.6);rays(g,28,38,10,P.turmeric,3).setAttribute('transform','translate(-58 -30)');ground();
    folk(g,{x:-6,y:48,s:.86,sk:P.ochre,cl:P.leaf,cl2:P.turmeric,hair:'short',la:-50,ra:150,ll:34,rl:-30,rot:8});
    const b=grp(g,{transform:'translate(58 22)'});circ(b,0,0,16,P.verm,3);ln(b,'M-16 0H16M0 -16Q-10 0 0 16M0 -16Q10 0 0 16',P.turmeric,2.6);ln(g,'M66 46Q80 36 90 46',K,2.4)}
  else if(key==='book'){shp(g,'M-88 36L0 50L88 36L88 -40L0 -26L-88 -40Z',P.indigo,4);
    shp(g,'M-82 30L0 42V-30Q-40 -46 -82 -36Z',P.ivory,3.4);shp(g,'M82 30L0 42V-30Q40 -46 82 -36Z',P.ivory,3.4);
    for(let i=0;i<5;i++){const y=-22+i*11;ln(g,`M-70 ${y-i*.6}Q-36 ${y-6} -10 ${y+4}`,i%2?P.sea:K,2);ln(g,`M70 ${y-i*.6}Q36 ${y-6} 10 ${y+4}`,i%2?P.sea:K,2)}
    const fl=tinyFlower(g,10,P.pink);fl.setAttribute('transform','translate(-46 24)');const fl2=tinyFlower(g,10,P.gold);fl2.setAttribute('transform','translate(46 24)');
    shp(g,'M-4 -30L4 -30L6 56L0 50L-6 56Z',P.verm,2)}
  else if(key==='food'){circ(g,0,6,62,P.gold,4);circ(g,0,6,52,P.turmeric,3);circ(g,0,6,46,'none',2,{stroke:P.gold,'stroke-dasharray':'.1 9','stroke-width':4,'stroke-linecap':'round'});
    shp(g,'M-34 22Q-36 -6 -12 -8Q12 -6 10 22Z',P.ivory,3);for(let i=0;i<6;i++)ln(g,`M${-26+i*6} ${8+(i%2)*4}h3`,P.ochre,2);
    circ(g,26,-14,16,P.ivory,3);circ(g,26,-14,11,P.gold,2.4);circ(g,28,22,14,P.leaf,3);circ(g,22,18,3,P.turq,0);circ(g,32,26,3,P.turq,0);
    circ(g,-6,-30,13,P.ochre,3);ln(g,'M-14 -32Q-6 -26 2 -32',P.terra,2);circ(g,-30,34,7,P.coral,2.4);circ(g,4,40,6,P.verm,2.2)}
  else if(key==='coins'){const coin=(x,y,r)=>{ell(g,x,y+4,r,r*.42,P.gold,3);ell(g,x,y,r,r*.42,P.turmeric,3);ell(g,x,y,r*.6,r*.24,'none',2,{stroke:P.gold});circ(g,x,y,2.6,P.verm,0)};
    [[-46,40],[-14,42],[18,40],[50,42],[-30,26],[2,28],[34,26],[-14,12],[18,12],[2,-2]].forEach(([x,y])=>coin(x,y,26));
    if(o.jewel){const n=grp(g,{transform:'translate(0 -36)'});ln(n,'M-56 -14Q0 40 56 -14',K,6);ln(n,'M-56 -14Q0 40 56 -14',P.turmeric,3);for(let i=0;i<9;i++){const u=i/8,x=lerp(-50,50,u),y=-12+Math.sin(u*Math.PI)*24;circ(n,x,y,4,i%2?P.verm:P.leaf,1.6)}
      shp(n,'M0 12L10 22L0 34L-10 22Z',P.verm,2.4)}
    star4(g,-64,-30,8,P.ivory);star4(g,62,-22,7,P.ivory)}
  return g}
/* the decorative circular frame used for Shot 2.2 symbols and the Shot 3.3 circle */
function blessMedal(parent,key,o){o=o||{};const g=grp(parent);const r=o.r||104;circ(g,0,0,r+12,Pat.u('vine',P.leaf,P.ivory,.5),4);circ(g,0,0,r,P.ivory,4);
  const clip=clipIn(g,ellD(0,0,r-3,r-3));const pic=grp(g,{'clip-path':clip});blessArt(pic,key,o).setAttribute('transform',`scale(${f3(r/104)})`);circ(g,0,0,r,'none',4);return g}
/* the small floral confirmation symbol (cards, treasures, stages) */
function confirmFlower(parent){const g=grp(parent);circ(g,0,0,20,P.leaf,3);tinyFlower(g,15,P.ivory);return g}
function confirmFlowerSvg(){return'<svg class="flower" viewBox="-22 -22 44 44" aria-hidden="true"><circle r="20" fill="#3F9B49" stroke="#111111" stroke-width="3"/>'+
  [0,72,144,216,288].map(a=>`<path transform="rotate(${a})" d="M0 0Q6.8 -8.3 0 -15Q-6.8 -8.3 0 0Z" fill="#FFF4D9" stroke="#111111" stroke-width="1.6"/>`).join('')+'<circle r="4.2" fill="#E03C1F" stroke="#111111" stroke-width="1.2"/></svg>'}
