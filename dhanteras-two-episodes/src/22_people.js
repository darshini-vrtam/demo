/* ===== Children and the Dhanteras family: original profile figures, same face language as the devas and asuras =====
   Built once; poses only change transforms, so clothing and colours never change between shots. */
const PEOPLE={
  girl:{sk:P.ochre,top:P.pink,low:P.turmeric,bord:P.verm,hair:'plait',h:.66},
  boy:{sk:P.terra,top:P.turq,low:P.ivory,bord:P.gold,hair:'short',h:.66},
  girl2:{sk:P.coral,top:P.leaf,low:P.pink,bord:P.turmeric,hair:'bun',h:.64},
  boy2:{sk:P.ochre,top:P.verm,low:P.ivory,bord:P.turmeric,hair:'short',h:.62},
  girl3:{sk:P.terra,top:P.turmeric,low:P.sea,bord:P.ivory,hair:'plait',h:.63},
  woman:{sk:P.coral,top:P.verm,low:P.verm,bord:P.turmeric,hair:'bun',h:1,sari:true},
  man:{sk:P.terra,top:P.turmeric,low:P.ivory,bord:P.verm,hair:'short',h:1.04},
  grandma:{sk:P.ochre,top:P.leaf,low:P.leaf,bord:P.turmeric,hair:'greybun',h:.94,sari:true}};
/* arm poses: back arm (ba,bb) and front arm (fa,fb), degrees from straight down, + towards the facing side */
const PPOSE={idle:{ba:-6,bb:14,fa:8,fb:18},namaste:{ba:24,bb:120,fa:32,fb:114},hold:{ba:30,bb:70,fa:44,fb:56},light:{ba:20,bb:60,fa:58,fb:28},offer:{ba:18,bb:40,fa:62,fb:-6}};
class Person{constructor(kind,parent,o){o=o||{};this.kind=kind;this.K=PEOPLE[kind];this.x=0;this.y=0;this.s=1;this.f=1;this.ph=Math.random()*TAU;
    this.cur=Object.assign({},PPOSE[o.pose||'idle']);this.tgt=Object.assign({},this.cur);this.build(parent,o)}
  build(parent,o){const Q=this.K,sk=Q.sk;const g=this.g=grp(parent);const body=this.body=grp(g);const child=Q.h<.8;
    const arm=(sx,sy)=>{const up=grp(body);const fo=grp(up);limb(up,'M0 0V44',sk,12);limb(fo,'M0 0V40',sk,11);ln(fo,'M-6 32H6',P.turmeric,3.4);circ(fo,0,44,7.5,sk,2.6);return{up,fo,sx,sy}};
    this.bArm=arm(4,-206);
    limb(body,'M-8 -30L-10 -8',sk,12);limb(body,'M10 -30L12 -8',sk,12);ell(body,-4,-5,13,6,sk,2.6);ell(body,18,-5,13,6,sk,2.6);
    if(Q.sari||Q.hair==='plait'||Q.hair==='bun'){/* long skirt or sari */shp(body,'M-30 -150L32 -150L48 -14Q8 -6 -40 -14Z',Pat.u(Q.sari?'petals':'vlines',Q.bord,Q.low,.6),4);
      shp(body,'M-44 -34L46 -34L48 -14Q8 -6 -40 -14Z',Q.bord,2.6);ln(body,'M-38 -24H44',P.ivory,3.2,{'stroke-dasharray':'.1 8'})}
    else{/* pajama legs and a long kurta */limb(body,'M-8 -100L-10 -16',Q.low,16);limb(body,'M10 -100L12 -16',Q.low,16);
      shp(body,'M-28 -152L30 -152L36 -84L-32 -84Z',Pat.u('dots',Q.bord,Q.top,.7),4);ln(body,'M-30 -92H34',Q.bord,5)}
    const torso='M-24 -150L-28 -210Q2 -224 28 -210L24 -150Z';dbl(body,torso,Pat.u('dots',Q.bord,Q.top,.6),0,-180,.86,4.2);
    if(Q.sari)shp(body,'M-28 -210L-14 -218L30 -150L14 -148Z',Pat.u('petals',P.turmeric,Q.low,.5),3);
    limb(body,'M3 -210L5 -232',sk,15);ln(body,'M-10 -218Q4 -200 18 -218',P.turmeric,3.6);
    /* head: same profile language as the devas and asuras, without crowns */
    const head=this.head=grp(body);const hy=-258;const hs=child?1.12:1;tf(head,0,0,1);head.setAttribute('transform',`translate(4 -232) scale(${hs}) translate(-4 232)`);
    const hairCol=Q.hair==='greybun'?P.ivory:K;
    if(Q.hair==='plait'){ln(head,'M-24 -250Q-36 -200 -30 -150',K,9);for(let i=0;i<5;i++)circ(head,-30+i*.6,-232+i*16,6,K,0);circ(head,-29,-150,4,P.verm,1.6)}
    if(Q.hair==='bun'||Q.hair==='greybun'){circ(head,-28,hy-2,14,hairCol,Q.hair==='greybun'?2.6:0);if(Q.hair==='bun'){marigold(head,7,P.turmeric).setAttribute('transform',`translate(-30 ${hy-16})`)}}
    shp(head,smooth([[-26,-280],[0,-291],[22,-283],[29,-270],[30,-259],[39,-247],[31,-243],[33,-236],[28,-227],[12,-222],[-10,-227],[-27,-246]],true),sk,4);
    const hairD=Q.hair==='short'?smooth([[-29,-246],[-28,-278],[-4,-294],[22,-286],[18,-279],[2,-276],[-6,-262],[-10,-244]],true):smooth([[-30,-246],[-29,-280],[-4,-295],[20,-288],[16,-280],[2,-276],[-6,-262],[-9,-242],[-22,-230]],true);
    shp(head,hairD,hairCol,Q.hair==='greybun'?2.6:0);if(Q.hair==='greybun')ln(head,'M-20 -274Q-6 -282 10 -284',P.gold,1.6);
    ell(head,-5,-257,5.5,8,sk,2.2);circ(head,-5,-245,3.6,P.turmeric,1.6);
    const eye=grp(head);shp(eye,'M5 -262Q16 -273 27 -262Q16 -254 5 -262Z',P.ivory,2.4);circ(eye,17,-263,3.6,K,0);circ(eye,16,-264.5,1,P.foam,0);
    ln(head,'M5 -273Q16 -280 28 -273',K,2.6);ln(head,'M23 -238Q29 -231 35 -236',K,2.4);
    if(Q.sari||Q.hair==='plait'||Q.hair==='bun')circ(head,24,-276,2.4,P.verm,0);
    if(Q.hair==='greybun'){ln(head,'M14 -248Q20 -246 24 -250',K,1.4)}
    this.fArm=arm(12,-204);
    /* something held in the front hand: a diya or a flower */
    this.prop=grp(this.fArm.fo);if(o.prop==='diya'){const d=diya(this.prop,{lit:o.lit||0});d.s=.32;d.x=4;d.y=58;d.update(0);this.diya=d}else if(o.prop==='flower'){const m=marigold(this.prop,9,P.turmeric);m.setAttribute('transform','translate(4 52)')}}
  set(p){if(PPOSE[p])Object.assign(this.tgt,PPOSE[p])}
  update(dt,t){const k=1-Math.exp(-(dt||.016)*6);for(const q in this.tgt)this.cur[q]+=(this.tgt[q]-this.cur[q])*k;const c=this.cur;
    tf(this.g,this.x,this.y,this.s,0,this.f,1);tf(this.body,0,Math.sin(t*1.5+this.ph)*1.2*MV(),1);
    tf(this.bArm.up,this.bArm.sx,this.bArm.sy,1,-c.ba);tf(this.fArm.up,this.fArm.sx,this.fArm.sy,1,-c.fa);tf(this.bArm.fo,0,44,1,-c.bb);tf(this.fArm.fo,0,44,1,-c.fb);
    if(this.diya){this.prop.setAttribute('transform',`rotate(${f1(c.fa+c.fb)} 0 44)`);this.diya.update(t)}}}
