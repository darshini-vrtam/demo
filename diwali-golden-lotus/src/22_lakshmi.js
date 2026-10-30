/* ===== Goddess Lakshmi (front view): serene, seated cross-legged on the lotus, four arms drawn apart so none crosses the face =====
   Built once; states only move the head (blessing bow) and the halo glow. Face, crown, sari, jewellery and arms never change. */
/* a calm front face (reused from the Dhanteras build) */
function frontFace(parent,o){const g=grp(parent);const sk=o.sk;
  const face=smooth([[0,-344],[24,-338],[36,-318],[35,-294],[24,-270],[0,-260],[-24,-270],[-35,-294],[-36,-318],[-24,-338]],true);
  if(o.hairBack)shp(g,o.hairBack,K,0);
  ell(g,-37,-302,6,10,sk,2.6);ell(g,37,-302,6,10,sk,2.6);
  dbl(g,face,sk,0,-302,.88,4.4);
  if(o.hairFront)shp(g,o.hairFront,K,0);
  const eyes=grp(g);const half=o.eyes==='half';
  for(const sd of[-1,1]){const x=sd*16;shp(eyes,`M${x-13} -306Q${x} ${half?-313:-319} ${x+13} -306Q${x} -297 ${x-13} -306Z`,P.ivory,3);
    circ(eyes,x+sd*.5,-306.5,half?3.8:5,K,0);if(!half)circ(eyes,x+sd*.5-1.4,-308.4,1.4,P.foam,0);if(half)ln(eyes,`M${x-13} -306Q${x} -313 ${x+13} -306`,K,3.6);ln(eyes,`M${x+sd*13} -306L${x+sd*20} -310`,K,3)}
  ln(g,'M-30 -320Q-16 -329 -3 -319M3 -319Q16 -329 30 -320',K,3.4);ln(g,'M-1 -314Q-6 -296 -1 -289Q2 -287 5 -290',K,2.4);
  ln(g,'M-9 -278Q0 -271 9 -278',K,2.6);shp(g,'M-6 -277Q0 -273 6 -277Q0 -275 -6 -277Z',P.verm,1.4);
  if(o.tilak==='u'){ln(g,'M-5 -336V-322Q0 -317 5 -322V-336',P.ivory,3);ln(g,'M0 -334V-320',P.verm,2.4)}
  else if(o.tilak==='tri'){ln(g,'M-14 -334H14M-15 -329H15M-14 -324H14',P.ivory,2.4);ln(g,'M0 -333V-325',P.verm,2.6)}
  else if(o.tilak==='dot')circ(g,0,-324,3.4,P.verm,0);
  const mouthTalk=ell(g,0,-277,4.6,2.4,K,0);show(mouthTalk,false);
  return{g,mouthTalk}}
/* the halo: concentric circles, a petal ring and fine radial lines (flat, never a glow effect) */
function lakshmiHalo(parent,r){const g=grp(parent);const outer=grp(g);
  rays(outer,r*1.02,r*1.2,40,P.turmeric,3.4);
  const pr=grp(outer);const n=24;for(let i=0;i<n;i++){const a=i/n*360;const p=grp(pr,{transform:`rotate(${a})`});shp(p,`M0 ${-r*.9}C${-r*.09} ${-r*.96} ${-r*.08} ${-r*1.06} 0 ${-r*1.1}C${r*.08} ${-r*1.06} ${r*.09} ${-r*.96} 0 ${-r*.9}Z`,i%2?P.gold:P.turmeric,2.6)}
  circ(g,0,0,r*.93,P.gold,4);circ(g,0,0,r*.84,Pat.u('dots',P.verm,P.turmeric,.8),3.4);
  circ(g,0,0,r*.72,P.turmeric,3.4);circ(g,0,0,r*.66,'none',3,{stroke:P.ivory,'stroke-dasharray':'.1 11','stroke-width':6,'stroke-linecap':'round'});
  ln(g,(()=>{let d='';for(let i=0;i<32;i++){const a=i/32*TAU;d+=`M${f1(Math.cos(a)*r*.36)} ${f1(Math.sin(a)*r*.36)}L${f1(Math.cos(a)*r*.6)} ${f1(Math.sin(a)*r*.6)}`}return d})(),P.gold,2.6);
  circ(g,0,0,r*.36,'none',3,{stroke:P.gold});return{g,outer,petals:pr}}
/* a closed lotus bud on a short green stem, held in an upper hand */
function lotusBud(parent){const g=grp(parent);ln(g,'M0 4V30',K,7);ln(g,'M0 4V30',P.leaf,3.4);
  shp(g,'M0 4C-18 -6 -17 -30 0 -48C17 -30 18 -6 0 4Z',P.pink,3);shp(g,'M0 2C-8 -8 -8 -24 0 -36C8 -24 8 -8 0 2Z',P.coral,2.2);ln(g,'M0 -4V-32',K,1.4);
  shp(g,'M-6 6Q-20 2 -22 -10Q-10 -6 -2 2Z',P.leaf,2);shp(g,'M6 6Q20 2 22 -10Q10 -6 2 2Z',P.leaf,2);return g}
/* an open palm, fingers up, with a small vermilion alta mark; flip it for the downward palm */
function palm(parent,sk){const g=grp(parent);shp(g,'M-13 4L-14 -22Q-14 -40 -6 -42Q-3 -46 0 -42Q4 -46 8 -41Q13 -40 13 -30L14 -22L14 4Q0 10 -13 4Z',sk,3);
  ln(g,'M-7 -24V-38M0 -24V-41M7 -24V-37',K,1.6);shp(g,'M-13 -6Q-24 -12 -22 -22Q-14 -20 -12 -14Z',sk,2.4);circ(g,0,-10,5,P.verm,1.6);circ(g,0,-10,8.5,'none',1.4,{stroke:P.verm});
  ln(g,'M-13 0H14M-13 6H14',P.gold,3.4);return g}
class Lakshmi{constructor(parent){this.x=0;this.y=0;this.s=1;this.vis=true;this.haloK=1;this.haloSpin=0;this.expand=0;this.bless=0;this.ph=Math.random()*TAU;this.build(parent)}
  build(parent){const sk=P.ochre;const g=this.g=grp(parent);this.haloAll=grp(g);
    /* large ornamental circles behind the whole figure, then the head halo */
    const big=this.big=grp(this.haloAll);rings(big,250,{n:3,step:.13,w:5,c1:P.turmeric,c2:P.ivory,dots:20});tf(big,0,-160,1);
    const hl=this.halo=lakshmiHalo(this.haloAll,128);tf(hl.g,0,-246,1);
    const body=this.body=grp(g);
    /* upper pair of arms, behind the body, raised outward with lotus buds */
    const upArm=(sd)=>{const a=grp(body);const sh=[sd*40,-170],el_=[sd*108,-218],wr=[sd*116,-270];
      limb(a,`M${sh[0]} ${sh[1]}L${el_[0]} ${el_[1]}`,sk,17);limb(a,`M${el_[0]} ${el_[1]}L${wr[0]} ${wr[1]}`,sk,15);
      ln(a,`M${sd*70-8} ${-200+sd*0}L${sd*76+8*sd} ${-192}`,P.gold,5);/* armlet */
      ln(a,`M${wr[0]-9} ${wr[1]+14}H${wr[0]+9}M${wr[0]-9} ${wr[1]+20}H${wr[0]+9}`,P.gold,3.6);
      const bud=lotusBud(a);tf(bud,wr[0],wr[1]-14,1.05,sd*8);circ(a,wr[0],wr[1]-4,12,sk,3);ln(a,`M${wr[0]-8} ${wr[1]-8}Q${wr[0]} ${wr[1]-12} ${wr[0]+8} ${wr[1]-8}`,K,1.4);return a};
    upArm(-1);upArm(1);
    /* hair falling behind the shoulders */
    shp(body,'M-44 -268Q-62 -200 -50 -136L50 -136Q62 -200 44 -268Z',K,0);
    /* crossed legs wrapped in the sari, with a pleated fan and a mustard border */
    const lap='M-40 -96C-92 -96 -130 -64 -126 -26C-124 -4 -102 4 -72 4L72 4C102 4 124 -4 126 -26C130 -64 92 -96 40 -96Z';
    dbl(body,lap,Pat.u('petals',P.gold,P.verm,.62),0,-46,.92,4.8);
    shp(body,'M-124 -24C-122 -4 -102 4 -72 4L72 4C102 4 122 -4 124 -24C110 -14 90 -12 72 -12L-72 -12C-90 -12 -110 -14 -124 -24Z',P.gold,3);
    ln(body,'M-110 -10Q0 0 110 -10',P.verm,3,{'stroke-dasharray':'.1 10'});
    shp(body,'M-22 -94L22 -94L36 2L-36 2Z',Pat.u('vlines',P.gold,P.verm,.75),3.4);
    /* feet resting on the lap, soles marked with alta */
    for(const [x,y,r] of[[-46,-40,-14],[50,-30,12]]){const f=grp(body,{transform:`translate(${x} ${y}) rotate(${r})`});shp(f,'M-26 0Q-24 -14 0 -14Q22 -14 26 -2Q22 10 0 10Q-24 10 -26 0Z',sk,3);
      ln(f,'M-22 2Q0 8 22 0',P.verm,3);[-16,-8,0,8].forEach(xx=>circ(f,xx+12,-12,2.6,sk,1.4))}
    /* torso, blouse, pallu across the shoulder, waistband */
    dbl(body,'M-46 -182Q0 -196 46 -182L38 -88L-38 -88Z',sk,0,-136,.86,4.6);
    shp(body,'M-45 -178Q0 -190 45 -178L43 -138Q0 -128 -43 -138Z',Pat.u('dots',P.verm,P.gold,.6),3.2);
    shp(body,'M14 -190L46 -182L-24 -88L-46 -96Z',Pat.u('petals',P.gold,P.verm,.5),3.4);ln(body,'M18 -188L-42 -94',P.gold,4);ln(body,'M44 -180L-20 -90',P.gold,3);
    shp(body,'M-40 -100H40V-86H-40Z',P.gold,3);ln(body,'M-34 -93H34',P.verm,3,{'stroke-dasharray':'.1 8'});
    /* neck and necklaces */
    limb(body,'M0 -184V-204',sk,22);
    ln(body,'M-26 -186Q0 -164 26 -186',K,7);ln(body,'M-26 -186Q0 -164 26 -186',P.turmeric,4);circ(body,0,-170,6,P.verm,2.2);
    ln(body,'M-34 -184Q0 -136 34 -184',K,6);ln(body,'M-34 -184Q0 -136 34 -184',P.gold,3);for(let i=0;i<7;i++){const u=i/6,x=lerp(-28,28,u),y=-184+Math.sin(u*Math.PI)*40;circ(body,x,y,3.6,i%2?P.verm:P.turmeric,1.4)}
    /* lower pair of arms in front: her right palm raised in blessing, her left palm resting open on the knee */
    const blessA=grp(body);limb(blessA,'M-44 -170L-88 -110',sk,17);limb(blessA,'M-88 -110L-88 -144',sk,15);ln(blessA,'M-74 -138L-60 -148',P.gold,5);
    const pa=palm(blessA,sk);tf(pa,-88,-146,1);
    const restA=grp(body);limb(restA,'M44 -170L84 -112',sk,17);limb(restA,'M84 -112L102 -70',sk,15);ln(restA,'M60 -150L70 -138',P.gold,5);
    const pb=palm(restA,sk);pb.setAttribute('transform','translate(104 -66) rotate(160)');
    /* head with crown, earrings and maang tikka; it bows gently in the blessing state */
    const head=this.head=grp(body);const hin=grp(head,{transform:'translate(0 60)'});
    frontFace(hin,{sk,eyes:'open',tilak:'dot'});
    for(const sd of[-1,1]){circ(hin,sd*38,-286,7.5,P.turmeric,2.6);circ(hin,sd*38,-286,2.8,P.verm,0);circ(hin,sd*38,-274,4,P.turmeric,1.6)}
    shp(hin,'M-34 -332Q0 -352 34 -332Q24 -340 0 -342Q-24 -340 -34 -332Z',K,0);ln(hin,'M0 -342V-330',P.gold,2.6);circ(hin,0,-328,3.4,P.verm,1.4);
    const cr=grp(hin);shp(cr,'M-36 -334L-44 -372L-26 -364L-18 -396L0 -380L18 -396L26 -364L44 -372L36 -334Z',P.turmeric,3.6);
    shp(cr,'M-38 -346H38V-332H-38Z',P.gold,3);ln(cr,'M-32 -339H32',P.ivory,3,{'stroke-dasharray':'.1 7'});
    [[-22,-360],[0,-366],[22,-360]].forEach(([x,y],i)=>{const fl=grp(cr,{transform:`translate(${x} ${y})`});for(let k=0;k<6;k++){const p=grp(fl,{transform:`rotate(${k*60})`});shp(p,'M0 0Q3 -4 0 -8Q-3 -4 0 0Z',i===1?P.verm:P.pink,1.2)}circ(fl,0,0,2.4,P.gold,1)});
    circ(cr,-40,-372,3.6,P.verm,1.4);circ(cr,40,-372,3.6,P.verm,1.4);circ(cr,0,-384,4,P.verm,1.6)}
  update(dt,t){tf(this.g,this.x,this.y,this.s);const m=MV();tf(this.body,0,Math.sin(t*1.2+this.ph)*1.4*m,1);
    this.head.setAttribute('transform',`translate(0 ${f1(this.bless*5)}) rotate(0)`);
    op(this.haloAll,this.haloK);if(this.haloK>0){tf(this.halo.outer,0,0,1,t*3*m+this.haloSpin);tf(this.big,0,-160,(.97+.03*Math.sin(t*TAU/4)*m)*(1+this.expand))}
    show(this.g,this.vis)}}
