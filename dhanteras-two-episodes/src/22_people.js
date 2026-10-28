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

/* ===== Front-facing people for the closing: same face language as the deities, simple festive clothes ===== */
const FPOSE={namaste:{la:-5,lb:120,ra:5,rb:-120},diya:{la:-30,lb:99,ra:30,rb:-99},idle:{la:-10,lb:12,ra:10,rb:-12}};
class FrontPerson{constructor(kind,parent,o){o=o||{};this.kind=kind;this.Q=PEOPLE[kind];this.x=0;this.y=0;this.s=1;this.pose=o.pose||'namaste';
    this.cur=Object.assign({},FPOSE[this.pose]);this.tgt=Object.assign({},this.cur);this.ph=Math.random()*TAU;this.build(parent,o)}
  build(parent,o){const Q=this.Q,sk=Q.sk;const fem=!!(Q.sari||Q.hair==='plait'||Q.hair==='bun'||Q.hair==='greybun');const hairCol=Q.hair==='greybun'?P.ivory:K;
    const g=this.g=grp(parent);const body=this.body=grp(g);
    /* long hair or plaits falling behind the shoulders */
    if(Q.hair==='plait'){for(const sd of[-1,1]){ln(body,`M${sd*30} -300Q${sd*44} -250 ${sd*40} -196`,K,12);circ(body,sd*40,-194,5,P.verm,1.6)}}
    else if(fem)shp(body,'M-40 -318Q-50 -276 -42 -246L42 -246Q50 -276 40 -318Z',hairCol,Q.hair==='greybun'?2.6:0);
    const arm=(sx,sy)=>{const up=grp(body);const fo=grp(up);limb(up,'M0 0V52',sk,17);if(fem)ln(up,'M-9 12H9',Q.top,7);limb(fo,'M0 0V48',sk,15);
      if(fem)ln(fo,'M-8 34H8M-8 40H8',P.turmeric,3.2);circ(fo,0,50,10,sk,3);return{up,fo,sx,sy}};
    this.lArm=arm(-38,-240);this.rArm=arm(38,-240);
    ell(body,-16,-6,15,7,sk,3);ell(body,16,-6,15,7,sk,3);
    if(fem){/* sari or long skirt, with a patterned border */shp(body,'M-36 -178L36 -178L56 -14Q0 -4 -56 -14Z',Pat.u(Q.sari?'petals':'vlines',Q.bord,Q.low,.6),4.4);
      shp(body,'M-54 -34L54 -34L56 -14Q0 -4 -56 -14Z',Q.bord,3);ln(body,'M-48 -24Q0 -16 48 -24',P.ivory,3.6,{'stroke-dasharray':'.1 9'});
      shp(body,'M-38 -238Q0 -252 38 -238L33 -174L-33 -174Z',Q.top,4.2);if(Q.sari){shp(body,'M-38 -238L-20 -246L36 -176L16 -176Z',Pat.u('petals',P.turmeric,Q.low,.5),3)}}
    else{/* kurta over pajama */limb(body,'M-13 -100L-15 -12',Q.low,20);limb(body,'M13 -100L15 -12',Q.low,20);
      shp(body,'M-38 -240Q0 -252 38 -240L46 -90L-46 -90Z',Pat.u('dots',Q.bord,Q.top,.7),4.4);ln(body,'M0 -244V-190',K,2.4);ln(body,'M-44 -100H44',Q.bord,6)}
    limb(body,'M0 -240V-262',sk,20);if(fem){ln(body,'M-22 -244Q0 -224 22 -244',K,7);ln(body,'M-22 -244Q0 -224 22 -244',P.turmeric,4)}
    const head=this.head=grp(body);if(Q.hair==='bun'||Q.hair==='greybun')circ(head,0,-346,16,hairCol,Q.hair==='greybun'?2.6:0);
    frontFace(head,{sk,eyes:'open',tilak:fem?'dot':null});
    shp(head,fem?'M-38 -296C-40 -332 -20 -347 0 -347C20 -347 40 -332 38 -296C32 -320 14 -330 0 -324C-14 -330 -32 -320 -38 -296Z'
      :'M-38 -300C-40 -334 -20 -349 0 -349C20 -349 40 -334 38 -300C30 -322 10 -330 -6 -326C-20 -326 -32 -318 -38 -300Z',hairCol,Q.hair==='greybun'?2.6:0);
    if(Q.hair==='bun')marigold(head,8,P.turmeric).setAttribute('transform','translate(14 -350)');
    if(fem)for(const sd of[-1,1])circ(head,sd*38,-288,5.5,P.turmeric,2.2);
    /* joined palms for namaste; a lit diya held in both hands */
    this.jp=grp(body);shp(this.jp,'M0 -236C-9 -226 -12 -208 -7 -196H7C12 -208 9 -226 0 -236Z',sk,3);ln(this.jp,'M0 -232V-198',K,2);
    this.dg=grp(body);const d=diya(this.dg,{lit:o.lit||0});d.s=.78;d.x=0;d.y=-166;d.glow.style.visibility='hidden';this.d=d}
  set(p){if(FPOSE[p]){this.pose=p;Object.assign(this.tgt,FPOSE[p])}}
  update(dt,t){const k=1-Math.exp(-(dt||.016)*6);for(const q in this.tgt)this.cur[q]+=(this.tgt[q]-this.cur[q])*k;const c=this.cur;
    tf(this.g,this.x,this.y,this.s);tf(this.body,0,Math.sin(t*1.4+this.ph)*1.2*MV(),1);
    tf(this.lArm.up,this.lArm.sx,this.lArm.sy,1,-c.la);tf(this.lArm.fo,0,52,1,-c.lb);tf(this.rArm.up,this.rArm.sx,this.rArm.sy,1,-c.ra);tf(this.rArm.fo,0,52,1,-c.rb);
    show(this.jp,this.pose==='namaste');show(this.dg,this.pose==='diya');if(this.pose==='diya')this.d.update(t)}}
