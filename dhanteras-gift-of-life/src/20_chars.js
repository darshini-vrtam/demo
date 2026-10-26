/* ===== Character bible: every recurring figure is built once here and reused by the scenes ===== */

/* Frontal face (origin = head centre). o: skin, mark ('namam'|'shiva'|'bindi'), smile 0..1 */
function faceF(p,o){const g=grp(p);const sk=o.skin;
  [-1,1].forEach(s=>shape(g,blob(s*30,2,7,11,4,.02,8),sk,{w:3.5,dbl:false}));
  shape(g,cr(mirror([[0,-37],[20,-33],[30,-16],[31,4],[24,24],[12,35],[0,38]]),true),sk,{w:4.5,inner:mix(sk,PAL.ivory,.5)});
  const eyes=grp(g);
  [-1,1].forEach(s=>{const x=s*12.5;el('path',{d:`M${x-s*11} -1Q${x-s*2} -10 ${x+s*11} -3Q${x+s*1} 6 ${x-s*11} -1Z`,fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2.4},eyes);
    dot(eyes,x+s*.5,-2.4,3.9,PAL.ink);dot(eyes,x+s*1.6,-3.6,1,PAL.ivory);
    line(g,`M${s*2} -12Q${s*12} -21 ${s*25} -12`,{w:2.8})});
  line(g,'M-2 -12Q-1 4 -5 9Q0 13 5 9',{w:2.4});
  const sm=o.smile==null?.6:o.smile;el('path',{d:`M-8 19Q0 ${f1(19+5*sm)} 8 19Q0 ${f1(23+3*sm)} -8 19Z`,fill:PAL.verm,stroke:PAL.ink,'stroke-width':1.8},g);
  if(o.mark==='namam'){el('path',{d:'M-6 -32L-4 -16L0 -12L4 -16L6 -32',fill:'none',stroke:PAL.ivory,'stroke-width':2.6},g);line(g,'M0 -31V-15',{w:2.4,c:PAL.verm})}
  else if(o.mark==='shiva'){[-25,-20].forEach(y=>line(g,`M-14 ${y}Q0 ${y-3} 14 ${y}`,{w:2.4,c:PAL.ivory}));el('path',{d:'M0 -33Q3 -29 0 -25Q-3 -29 0 -33Z',fill:PAL.verm,stroke:PAL.ink,'stroke-width':1.4},g)}
  else if(o.mark==='bindi')dot(g,0,-20,3.4,PAL.verm,{stroke:PAL.ink,w:1.2});
  [-1,1].forEach(s=>{dot(g,s*31,16,5.5,PAL.gold,{stroke:PAL.ink,w:2});dot(g,s*31,16,1.8,PAL.verm)});
  g.eyes=eyes;return g}

/* Tall kirita crown (origin = head centre) */
function crownTall(p,o){o=o||{};const g=grp(p);
  shape(g,cr(mirror([[0,-118],[8,-106],[16,-86],[26,-62],[34,-42],[36,-30],[0,-30]]),true,.6),PAL.gold,{w:4.5,pat:Pat.get('check',PAL.verm,null,10)});
  shape(g,'M-38 -42H38V-28H-38Z',PAL.verm,{w:3.5,pat:Pat.get('dots',PAL.gold,null,8)});
  [-1,1].forEach(s=>shape(g,`M${s*36} -34Q${s*52} -44 ${s*50} -62Q${s*42} -50 ${s*34} -50Z`,PAL.gold,{w:3,dbl:false}));
  shape(g,blob(0,-72,9,11,2,0,8),o.gem||PAL.turq,{w:3,dbl:false});dot(g,0,-120,6,PAL.gold,{stroke:PAL.ink,w:2.5});
  return g}

/* Arm with shoulder pivot: upper arm, forearm, hand. set(a1,a2) in degrees (0 = hanging straight down) */
function arm(p,sk,o){o=o||{};const g=grp(p);const up=grp(g);const U=o.u||60,F=o.f||54,w=o.w||21;
  shape(up,`M${-w/2} 0L${-w*.45} ${U}A${w*.45} ${w*.45} 0 0 0 ${w*.45} ${U}L${w/2} 0A${w/2} ${w/2} 0 0 0 ${-w/2} 0Z`,sk,{w:3.5,dbl:false});
  el('rect',{x:-w*.55,y:U*.28,width:w*1.1,height:6,rx:2,fill:PAL.gold,stroke:PAL.ink,'stroke-width':2},up);
  const fore=grp(up,{transform:`translate(0 ${U})`});
  shape(fore,`M${-w*.45} 0L${-w*.4} ${F}L${w*.4} ${F}L${w*.45} 0Z`,sk,{w:3.5,dbl:false});
  [F-14,F-7].forEach(y=>el('rect',{x:-w*.5,y,width:w,height:5,rx:2,fill:y<F-10?PAL.verm:PAL.gold,stroke:PAL.ink,'stroke-width':1.8},fore));
  const hand=grp(fore,{transform:`translate(0 ${F+10})`});
  shape(hand,'M-10 -8Q-12 8 -6 14Q0 17 6 14Q12 8 10 -8Z',sk,{w:3,dbl:false});dot(hand,0,2,2.6,PAL.verm);
  const A={g,up,fore,hand,U,a1:0,a2:0,set(a1,a2){this.a1=a1;this.a2=a2;tf(up,0,0,1,a1);tf(fore,0,U,1,a2)}};A.set(o.a1||0,o.a2||0);return A}

/* Frontal standing deity body (origin = between the feet, head centre at 0,-300). Returns refs for animation. */
function deityBody(p,o){const g=grp(p);const sk=o.skin;const B={g};
  B.backArms=grp(g);
  [-1,1].forEach(s=>shape(g,`M${s*6} -18Q${s*30} -22 ${s*36} -6Q${s*22} 2 ${s*4} -2Z`,sk,{w:3.5,dbl:false}));
  shape(g,cr(mirror([[0,-168],[50,-166],[58,-120],[66,-56],[70,-20],[20,-16],[0,-30]]),true,.7),o.lower,{w:5,pat:o.lowerPat});
  shape(g,'M-12 -160L12 -160L22 -20L0 -34L-22 -20Z',o.pleat||PAL.verm,{w:3.5,pat:Pat.get('hstripe',PAL.gold,null,9)});
  el('path',{d:'M-68 -26Q0 -12 68 -26L70 -16Q0 -2 -70 -16Z',fill:PAL.gold,stroke:PAL.ink,'stroke-width':3},g);
  shape(g,cr(mirror([[0,-268],[30,-266],[50,-256],[56,-232],[50,-204],[46,-170],[0,-166]]),true,.8),sk,{w:5,inner:mix(sk,PAL.ivory,.45)});
  dot(g,0,-186,2.6,PAL.ink);
  shape(g,'M-58 -176H58V-156H-58Z',o.sash||PAL.verm,{w:3.5,pat:Pat.get('dots',PAL.gold,null,9)});
  shape(g,'M-30 -158L-18 -158L-22 -96L-36 -98Z',o.sash||PAL.verm,{w:3,dbl:false});
  shape(g,'M-12 -300H12V-262H-12Z',sk,{w:3.5,dbl:false});
  B.neck=g.lastChild;
  el('path',{d:'M-34 -260Q0 -222 34 -260',fill:'none',stroke:PAL.ink,'stroke-width':7},g);el('path',{d:'M-34 -260Q0 -222 34 -260',fill:'none',stroke:PAL.gold,'stroke-width':4},g);
  el('path',{d:'M-30 -254Q0 -230 30 -254',fill:'none',stroke:PAL.verm,'stroke-width':3,'stroke-dasharray':'2 5','stroke-linecap':'round'},g);
  dot(g,0,-236,6,PAL.verm,{stroke:PAL.ink,w:2});
  B.chest=grp(g);B.front=grp(g);B.headG=grp(g,{transform:'translate(0 -312)'});B.over=grp(g);
  return B}

/* Lord Vishnu: blue skin, golden-yellow pitambara, kirita crown, four arms with chakra, shankha, abhaya hand and lotus */
function vishnu(p){const V={g:grp(p)};const B=deityBody(V.g,{skin:SK.vishnu,lower:PAL.gold,lowerPat:Pat.get('chev',mix(PAL.gold,PAL.verm,.6),null,14),pleat:PAL.verm,sash:PAL.verm});
  const garland=line(B.chest,'M-40 -258Q-56 -150 -30 -70Q0 -48 30 -70Q56 -150 40 -258',{w:9,c:PAL.ink});
  line(B.chest,'M-40 -258Q-56 -150 -30 -70Q0 -48 30 -70Q56 -150 40 -258',{w:6,c:PAL.leaf});
  line(B.chest,'M-40 -258Q-56 -150 -30 -70Q0 -48 30 -70Q56 -150 40 -258',{w:4,c:PAL.pink,dash:'2 10'});
  V.armBR=arm(B.backArms,SK.vishnu,{a1:-140,a2:-20});tf(V.armBR.g,46,-252);
  V.armBL=arm(B.backArms,SK.vishnu,{a1:140,a2:20});tf(V.armBL.g,-46,-252);
  V.chakra=grp(V.armBR.hand,{transform:'translate(0 -6)'});
  const ck=grp(V.chakra);shape(ck,blob(0,0,24,24,3,0,16),PAL.gold,{w:4});el('circle',{r:14,fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2.5},ck);
  for(let i=0;i<8;i++){const a=i/8*TAU;line(ck,`M0 0L${f1(Math.cos(a)*14)} ${f1(Math.sin(a)*14)}`,{w:2})}dot(ck,0,0,4,PAL.verm,{stroke:PAL.ink,w:1.6});V.chakraSpin=ck;
  const sh=grp(V.armBL.hand,{transform:'translate(0 -8) rotate(-30)'});
  shape(sh,'M-12 10C-18 -6 -6 -24 8 -22C18 -16 16 2 4 14Z',PAL.ivory,{w:3.5});line(sh,'M-6 4Q2 -6 8 -14M-2 10Q6 0 10 -8',{w:1.8,c:PAL.ocean});
  V.armR=arm(B.front,SK.vishnu,{a1:-24,a2:-140});tf(V.armR.g,50,-250);
  V.armL=arm(B.front,SK.vishnu,{a1:20,a2:26});tf(V.armL.g,-50,-250);
  const lt=grp(V.armL.hand,{transform:'translate(0 6) rotate(-46)'});line(lt,'M0 0V-58',{w:4,c:PAL.leaf});const lo=lotus(grp(lt,{transform:'translate(0 -58)'}),22,{t:.85,pad:false});
  const head=B.headG;const halo=grp(head);sun(halo,62);V.halo=halo;tf(halo,0,-24,1);
  V.face=faceF(head,{skin:SK.vishnu,mark:'namam',smile:.7});crownTall(head,{gem:PAL.turq});
  V.body=B;V.set=(t,adv)=>{tf(V.chakraSpin,0,0,1,t*.03);const a=adv||0;V.armR.set(-24-22*a,-140-18*a+Math.sin(t*.004)*4*a);V.armBR.set(-140,-20);V.armBL.set(140,20)};
  return V}

/* Lord Shiva (Neelkanth): matted hair with crescent moon, tiger-skin garment, rudraksha beads, trishul; throat turns blue */
function shiva(p){const S={g:grp(p)};
  const hairBack=grp(S.g,{transform:'translate(0 -12)'});
  const B=deityBody(S.g,{skin:SK.light,lower:PAL.gold,lowerPat:Pat.get('tiger',PAL.ink,null,24),pleat:mix(PAL.gold,PAL.terra,.5),sash:PAL.terra});
  [-1,1].forEach(s=>shape(hairBack,`M${s*26} -318Q${s*58} -290 ${s*56} -240Q${s*48} -226 ${s*40} -238Q${s*42} -270 ${s*26} -290Z`,PAL.ink,{w:3,dbl:false}));
  const beads=grp(B.chest);for(let i=0;i<13;i++){const a=lerp(.15,.85,i/12)*Math.PI;dot(beads,Math.cos(a)*36,-256+Math.sin(a)*40,4.6,mix(PAL.terra,PAL.ink,.45),{stroke:PAL.ink,w:1.6})}
  S.throat=el('ellipse',{cx:0,cy:-267,rx:12,ry:7,fill:SK.light,stroke:'none'},B.over);
  S.throatRing=el('ellipse',{cx:0,cy:-267,rx:13.5,ry:8.5,fill:'none',stroke:PAL.ink,'stroke-width':2.4,opacity:0},B.over);
  S.armR=arm(B.front,SK.light,{a1:-34,a2:-132});tf(S.armR.g,50,-250);
  S.armL=arm(B.front,SK.light,{a1:24,a2:-18});tf(S.armL.g,-50,-250);
  const tri=grp(S.armL.hand,{transform:'rotate(-6)'});
  el('rect',{x:-4,y:-260,width:8,height:330,fill:mix(PAL.terra,PAL.ink,.3),stroke:PAL.ink,'stroke-width':2.4},tri);
  shape(tri,'M0 -300L7 -262L-7 -262Z M-26 -292Q-28 -262 -6 -258L-6 -266Q-20 -270 -26 -292Z M26 -292Q28 -262 6 -258L6 -266Q20 -270 26 -292Z',PAL.ivory,{w:3,dbl:false});
  el('rect',{x:-16,y:-262,width:32,height:8,fill:PAL.gold,stroke:PAL.ink,'stroke-width':2},tri);
  const head=B.headG;
  S.face=faceF(head,{skin:SK.light,mark:'shiva',smile:.55});
  shape(head,'M-30 -24Q-34 -60 -20 -78Q-30 -100 -10 -116Q8 -126 22 -110Q36 -96 28 -76Q38 -58 30 -24Q14 -40 0 -36Q-14 -40 -30 -24Z',PAL.ink,{w:3,dbl:false});
  for(let i=0;i<4;i++)line(head,`M${-16+i*10} -40Q${-20+i*10} -70 ${-6+i*6} -104`,{w:1.8,c:PAL.indigo});
  el('rect',{x:-24,y:-60,width:48,height:8,rx:3,fill:mix(PAL.terra,PAL.ink,.45),stroke:PAL.ink,'stroke-width':1.6},head);
  shape(head,'M-26 -96A20 20 0 1 0 -6 -116A15 15 0 1 1 -26 -96Z',PAL.ivory,{w:3,dbl:false});
  S.body=B;S.setBlue=k=>{setA(S.throat,'fill',mix(SK.light,SK.neel,clamp(k,0,1)));op(S.throatRing,clamp(k*1.5,0,1))};
  return S}

/* Lord Dhanvantari: crown, golden garments, herb garland, both hands cradling the Amrit Kalash */
function dhanvantari(p,o){o=o||{};const D={g:grp(p)};
  const B=deityBody(D.g,{skin:SK.warm,lower:PAL.gold,lowerPat:Pat.get('flower',PAL.verm,null,18),pleat:PAL.verm,sash:PAL.pink});
  line(B.chest,'M-40 -258Q-60 -170 -44 -110',{w:10,c:PAL.ink});line(B.chest,'M40 -258Q60 -170 44 -110',{w:10,c:PAL.ink});
  line(B.chest,'M-40 -258Q-60 -170 -44 -110',{w:7,c:PAL.leaf});line(B.chest,'M40 -258Q60 -170 44 -110',{w:7,c:PAL.leaf});
  [-1,1].forEach(s=>{for(let i=0;i<5;i++){const y=-240+i*28;shape(B.chest,`M${s*(48+Math.sin(i)*4)} ${y}c${s*10} -8 ${s*20} -6 ${s*24} 2c${s*-8} 8 ${s*-18} 8 ${s*-24} -2Z`,PAL.leaf,{w:2.4,dbl:false})}});
  shape(B.chest,'M-48 -252Q0 -200 48 -252L52 -238Q0 -184 -52 -238Z',PAL.pink,{w:3.5,pat:Pat.get('dots',PAL.verm,null,9)});
  if(o.offer){D.armR=arm(B.front,SK.warm,{a1:-34,a2:-128});tf(D.armR.g,50,-250);D.armL=arm(B.front,SK.warm,{a1:68,a2:24});tf(D.armL.g,-50,-250)}
  else{D.kalash=kalash(grp(B.front,{transform:'translate(0 -158)'}),1);
    D.armR=arm(B.front,SK.warm,{a1:-30,a2:40});tf(D.armR.g,50,-250);D.armL=arm(B.front,SK.warm,{a1:30,a2:-40});tf(D.armL.g,-50,-250)}
  const head=B.headG;D.face=faceF(head,{skin:SK.warm,mark:'namam',smile:.75});crownTall(head,{gem:PAL.leaf});
  D.body=B;return D}

/* Goddess Lakshmi seated on a pink lotus (origin = lotus base), holding lotuses, pink sari */
function lakshmi(p){const L={g:grp(p)};const g=L.g;
  L.seat=lotus(grp(g,{transform:'translate(0 0)'}),78,{t:1,c1:PAL.pink,c2:TINT.blush});
  const body=grp(g,{transform:'translate(0 -58)'});L.body=body;
  shape(body,'M-70 0Q-74 -40 -36 -50L36 -50Q74 -40 70 0Q0 16 -70 0Z',PAL.pink,{w:5,pat:Pat.get('flower',PAL.verm,null,16)});
  el('path',{d:'M-68 -4Q0 10 68 -4',fill:'none',stroke:PAL.gold,'stroke-width':6},body);el('path',{d:'M-68 -4Q0 10 68 -4',fill:'none',stroke:PAL.ink,'stroke-width':1.6,'stroke-dasharray':'3 6'},body);
  shape(body,cr(mirror([[0,-150],[26,-148],[40,-134],[38,-96],[34,-52],[0,-48]]),true,.8),SK.light,{w:4.5});
  shape(body,'M-38 -132Q-10 -100 40 -60L34 -48Q-10 -84 -40 -116Z',PAL.verm,{w:3.5,pat:Pat.get('dots',PAL.gold,null,8)});
  el('path',{d:'M-26 -142Q0 -112 26 -142',fill:'none',stroke:PAL.ink,'stroke-width':6},body);el('path',{d:'M-26 -142Q0 -112 26 -142',fill:'none',stroke:PAL.gold,'stroke-width':3.5},body);
  L.armR=arm(body,SK.light,{a1:-40,a2:-120,u:46,f:44,w:17});tf(L.armR.g,36,-136);
  L.armL=arm(body,SK.light,{a1:40,a2:120,u:46,f:44,w:17});tf(L.armL.g,-36,-136);
  [L.armR,L.armL].forEach(A=>{const lt=grp(A.hand,{transform:'translate(0 -4) rotate(180)'});line(lt,'M0 0V34',{w:3.5,c:PAL.leaf});lotus(grp(lt,{transform:'translate(0 40) rotate(180)'}),18,{t:.9,pad:false})});
  const head=grp(body,{transform:'translate(0 -180) scale(.8)'});
  shape(head,'M-34 -10Q-40 -50 0 -50Q40 -50 34 -10Q40 30 26 44L-26 44Q-40 30 -34 -10Z',PAL.ink,{w:2,dbl:false});
  L.face=faceF(head,{skin:SK.light,mark:'bindi',smile:.8});
  shape(head,'M-30 -30L-20 -62L-10 -48L0 -72L10 -48L20 -62L30 -30Z',PAL.gold,{w:3.5,pat:Pat.get('dots',PAL.verm,null,7)});
  [-1,1].forEach(s=>{dot(head,s*31,30,4,PAL.gold,{stroke:PAL.ink,w:1.6})});
  L.coins=grp(body);return L}

/* Profile figure for the devas and asuras (origin = feet, faces right; flip the parent to face left).
   Poses: stand, pull, worry, cheer, namaste. */
const POSES={stand:[-12,-22,-6,-16,0],pull:[-78,-8,-70,-14,-12],worry:[-22,-150,-8,-20,4],cheer:[-130,-20,-118,-26,-3],namaste:[-40,-100,-36,-104,0],point:[-95,-5,-15,-20,0]};
function profileHead(p,o){const g=grp(p);const sk=o.skin;
  shape(g,'M-22 -6C-30 -14 -26 -30 -10 -30L-6 -12Z',PAL.ink,{w:2.5,dbl:false});
  shape(g,cr([[-20,-18],[-4,-27],[14,-21],[20,-9],[23,-1],[31,8],[22,11],[23,16],[19,20],[20,25],[10,28],[-6,24],[-20,10],[-24,-4]],true),sk,{w:4,dbl:false});
  el('path',{d:'M3 1Q10 -6 19 0Q11 6 3 1Z',fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2},g);dot(g,13,.4,2.9,PAL.ink);
  line(g,'M2 -7Q12 -12 22 -4',{w:2.4});
  el('path',{d:'M17 16Q21 18 24 16',fill:'none',stroke:PAL.verm,'stroke-width':2.6,'stroke-linecap':'round'},g);
  if(o.moustache)shape(g,'M14 13Q22 11 28 14Q32 10 34 14Q30 20 22 16Q18 18 14 13Z',PAL.ink,{w:1.2,dbl:false});
  dot(g,-6,12,4.2,PAL.gold,{stroke:PAL.ink,w:1.6});
  if(o.kind==='asura'){shape(g,'M-22 -18L-24 -40L-12 -30L-4 -50L6 -32L16 -46L18 -18Z',PAL.verm,{w:3.5,pat:Pat.get('dots',PAL.gold,null,7)});
    shape(g,'M-24 -22Q-36 -34 -30 -48Q-22 -36 -14 -30Z',PAL.gold,{w:2.6,dbl:false})}
  else{shape(g,'M-18 -20L-14 -36L-6 -58L2 -66L10 -56L16 -36L18 -20Z',PAL.gold,{w:3.5,pat:Pat.get('check',PAL.verm,null,7)});dot(g,2,-68,4,PAL.gold,{stroke:PAL.ink,w:2})}
  el('rect',{x:-21,y:-24,width:40,height:7,rx:2,fill:o.kind==='asura'?PAL.gold:PAL.verm,stroke:PAL.ink,'stroke-width':2},g);
  return g}
function figure(p,o){const F={g:grp(p),o};const sk=o.skin;const g=F.g;F.lean=grp(g);const L=F.lean;const wide=o.kind==='asura'?1.14:1;
  F.armF=arm(L,mix(sk,PAL.ink,.15),{u:50,f:46,w:16});tf(F.armF.g,-2,-186);
  shape(L,'M-24 -118L22 -118L30 -60L36 -10L8 -6L4 -40L-4 -40L-12 -6L-36 -10L-30 -60Z',o.cloth,{w:4,pat:Pat.get(o.kind==='asura'?'chev':'stripe',o.cloth2,null,11)});
  el('path',{d:'M-36 -14L-12 -10M8 -10L36 -14',stroke:o.cloth2,'stroke-width':5,fill:'none'},L);
  shape(L,'M-12 -6L-12 2L8 2Q4 -4 -2 -6Z M8 -6L8 2L30 2Q26 -4 18 -6Z',sk,{w:2.6,dbl:false});
  const torso=grp(L,{transform:`scale(${wide} 1)`});
  shape(torso,'M-22 -196L14 -198L26 -176L24 -150L20 -118L-24 -118L-28 -160Z',sk,{w:4,dbl:false});
  shape(torso,'M-20 -194L-8 -194L22 -128L10 -122Z',o.sash,{w:2.6,dbl:false});
  el('path',{d:'M-6 -194Q8 -172 20 -190',fill:'none',stroke:PAL.gold,'stroke-width':4},torso);
  el('rect',{x:-26,y:-126,width:50,height:10,fill:o.sash,stroke:PAL.ink,'stroke-width':2.4},L);
  shape(L,'M-6 -214L10 -214L10 -194L-6 -194Z',sk,{w:2.6,dbl:false});
  F.head=grp(L,{transform:'translate(4 -230)'});profileHead(F.head,o);
  F.armN=arm(L,sk,{u:52,f:48,w:17});tf(F.armN.g,6,-186);
  F.pose=(name,k,wob)=>{const a=POSES[name]||POSES.stand;wob=wob||0;F.armN.set(a[0]+wob,a[1]);F.armF.set(a[2]+wob,a[3]);tf(L,0,0,1,a[4]*(k==null?1:k))};
  F.pose('stand');return F}
const DEVA_LOOKS=[{cloth:PAL.gold,cloth2:PAL.verm,sash:PAL.turq},{cloth:PAL.ocean,cloth2:PAL.gold,sash:PAL.verm},{cloth:PAL.ivory,cloth2:PAL.ocean,sash:PAL.gold},{cloth:PAL.turq,cloth2:PAL.indigo,sash:PAL.pink}];
const ASURA_LOOKS=[{cloth:PAL.verm,cloth2:PAL.gold,sash:PAL.indigo},{cloth:PAL.indigo,cloth2:PAL.terra,sash:PAL.gold},{cloth:PAL.terra,cloth2:PAL.ink,sash:PAL.turq},{cloth:mix(PAL.verm,PAL.terra,.5),cloth2:PAL.indigo,sash:PAL.gold}];
/* A group of devas or asuras standing in a row. face: 1 = right, -1 = left */
function crowd(p,kind,n,face,gap,s){const g=grp(p);const figs=[];
  for(let i=0;i<n;i++){const look=(kind==='asura'?ASURA_LOOKS:DEVA_LOOKS)[i%4];const fg=grp(g);
    const F=figure(fg,Object.assign({kind,skin:kind==='asura'?(i%2?mix(PAL.terra,PAL.indigo,.25):SK.asura):(i%2?SK.deva:SK.light),moustache:kind==='asura'},look));
    F.x=(i-(n-1)/2)*gap;F.s=s*(1+((i*37)%7-3)*.02);F.face=face;tf(fg,F.x,0,F.s,0,face);F.wrap=fg;figs.push(F)}
  const C={g,figs,pose(name,k,t){figs.forEach((F,i)=>F.pose(name,k,t==null?0:Math.sin(t*.006+i*1.3)*4))},
    hop(t,amp){figs.forEach((F,i)=>tf(F.wrap,F.x,-Math.abs(Math.sin(t*.008+i*1.1))*amp,F.s,0,F.face))}};return C}

/* Kurma: Lord Vishnu's tortoise form, side view facing right (origin = bottom centre of the shell rim) */
function kurma(p){const K={g:grp(p)};const g=K.g;
  [[-130,8,-20],[110,8,20]].forEach(([x,y,a])=>shape(grp(g,{transform:`translate(${x} ${y}) rotate(${a})`}),'M-30 -6Q-36 26 -10 36Q24 34 26 -4Z',TINT.shell,{w:4,pat:Pat.get('hstripe',PAL.leaf,null,9)}));
  shape(g,'M-200 -12Q-236 -8 -246 10Q-222 8 -200 6Z',TINT.shell,{w:3.5,dbl:false});
  K.headG=grp(g,{transform:'translate(190 -36)'});
  shape(K.headG,'M-20 -14Q20 -40 50 -40L54 -6Q20 10 -14 22Z',TINT.shell,{w:4,pat:Pat.get('scale',PAL.leaf,null,10)});
  shape(K.headG,cr([[40,-62],[78,-66],[104,-50],[110,-30],[98,-12],[66,-6],[42,-16],[34,-40]],true),TINT.shell,{w:4.5});
  el('path',{d:'M58 -44Q70 -54 84 -44Q72 -36 58 -44Z',fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2.4},K.headG);dot(K.headG,73,-44.5,4,PAL.ink);
  line(K.headG,'M84 -24Q96 -20 104 -28',{w:3,c:PAL.verm});dot(K.headG,104,-44,2,PAL.ink);
  K.shell=shape(g,'M-210 0C-206 -112 -112 -178 0 -178C112 -178 206 -112 210 0Z',PAL.leaf,{w:6,pat:Pat.get('scale',mix(PAL.leaf,PAL.ink,.35),null,22)});
  shape(g,'M-150 -4C-146 -84 -80 -132 0 -132C80 -132 146 -84 150 -4Z',PAL.terra,{w:4,pat:Pat.get('dots2',PAL.gold,null,16)});
  shape(g,'M-96 -6C-92 -58 -50 -88 0 -88C50 -88 92 -58 96 -6Z',PAL.gold,{w:4,pat:Pat.get('check',PAL.terra,null,12)});
  for(let i=0;i<7;i++){const a=Math.PI+i/6*Math.PI;line(g,`M${f1(Math.cos(a)*150)} ${f1(Math.sin(a)*130-4)}L${f1(Math.cos(a)*210)} ${f1(Math.sin(a)*176)}`,{w:3.5})}
  shape(g,'M-214 -2H214L208 18H-208Z',PAL.gold,{w:4.5,pat:Pat.get('tri',PAL.verm,null,12)});
  K.motifs=[[-118,-58],[0,-114],[118,-58]].map(([x,y],i)=>{const mg=grp(g,{transform:`translate(${x} ${y})`});
    const glow=mandala(mg,40,{t:0,pal:[PAL.gold,PAL.verm,PAL.pink,PAL.turq]});
    const core=grp(mg);for(let j=0;j<8;j++)el('path',{d:petalD(20,.45),fill:i===1?PAL.pink:PAL.ivory,stroke:PAL.ink,'stroke-width':2.2,transform:`rotate(${j*45})`},core);dot(core,0,0,6,PAL.verm,{stroke:PAL.ink,w:2});
    return{g:mg,glow,core}});
  K.light=(i,k)=>{const M=K.motifs[i];M.glow.set(k);tf(M.core,0,0,1+.25*k,k*45)};
  return K}

/* Mount Mandara: banded mountain whose patterns slide sideways to show the churning (origin = base centre) */
let MANDARA_N=0;
function mandara(p){const M={g:grp(p)};const g=M.g;const id='mclip'+(MANDARA_N++);
  const pts=[[0,-525],[30,-512],[86,-430],[136,-300],[160,-150],[150,-40],[110,0],[0,4]];const d=cr(mirror(pts),true,.8);
  const cp=el('clipPath',{id},Pat.defs);el('path',{d},cp);
  shape(g,d,PAL.terra,{w:0});
  const bands=grp(g,{'clip-path':`url(#${id})`});M.bands=[];
  const spec=[[-540,-430,PAL.leaf,'leafy',mix(PAL.leaf,PAL.ink,.3),18],[-430,-360,PAL.gold,'tri',PAL.terra,18],[-360,-280,PAL.terra,'chev',PAL.gold,22],[-280,-220,PAL.indigo,'dots2',PAL.turq,18],
    [-220,-150,PAL.leaf,'check',PAL.gold,20],[-150,-90,PAL.terra,'hstripe',mix(PAL.terra,PAL.ink,.35),12],[-90,10,PAL.gold,'chev',PAL.verm,24]];
  spec.forEach(([y0,y1,bg,k,fg,s],i)=>{const key='mandara-band-'+i;Pat.get(k,fg,bg,s,key);const pe=Pat.el(key);
    el('rect',{x:-200,y:y0,width:400,height:y1-y0,fill:`url(#${pe.id})`},bands);line(bands,`M-200 ${y1}H200`,{w:3.5});M.bands.push({pe,s,i})});
  el('path',{d,fill:'none',stroke:PAL.ink,'stroke-width':6,'stroke-linejoin':'round'},g);el('path',{d,fill:'none',stroke:PAL.ivory,'stroke-width':2,'stroke-linejoin':'round'},g);
  [[-30,-500,40],[8,-520,52],[44,-486,38],[-70,-440,34],[76,-430,34]].forEach(([x,y,s])=>{const t=tree(g,s,PAL.leaf);tf(t,x,y+12)});
  M.turn=off=>{M.bands.forEach(b=>{const v=(b.i%2?-1:1)*off*(1-b.i*.06);b.pe.setAttribute('patternTransform',`translate(${f1(v)} 0)`)})};
  return M}

/* Vasuki's hood (origin = neck joint, faces up) */
function vasukiHead(p){const g=grp(p);
  shape(g,'M0 10C-34 -6 -46 -54 -26 -86C-14 -104 14 -104 26 -86C46 -54 34 -6 0 10Z',PAL.turq,{w:5,pat:Pat.get('scale',PAL.indigo,null,12)});
  shape(g,'M0 -6C-16 -16 -20 -44 -10 -62L10 -62C20 -44 16 -16 0 -6Z',PAL.gold,{w:3,pat:Pat.get('hstripe',PAL.verm,null,8)});
  shape(g,'M-16 -90C-18 -120 18 -120 16 -90C10 -82 -10 -82 -16 -90Z',PAL.turq,{w:4});
  [-1,1].forEach(s=>{el('path',{d:`M${s*3} -102Q${s*9} -108 ${s*14} -100Q${s*8} -96 ${s*3} -102Z`,fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2},g);dot(g,s*9,-101.5,2.6,PAL.ink)});
  line(g,'M-5 -88Q0 -85 5 -88',{w:2.4,c:PAL.verm});dot(g,0,-74,5,PAL.verm,{stroke:PAL.ink,w:2});
  return g}

/* Kamadhenu: the wish-fulfilling cow, ivory with floral patterns (origin = feet centre, faces right) */
function kamadhenu(p){const g=grp(p);const K={g};
  [[-62,0],[-40,0],[44,0],[64,0]].forEach(([x],i)=>{shape(g,`M${x-8} -64L${x-7} -10L${x+7} -10L${x+8} -64Z`,i%2?PAL.ivory:TINT.milk,{w:3.5,dbl:false});shape(g,`M${x-9} -12H${x+9}L${x+8} 0H${x-8}Z`,PAL.ink,{w:2,dbl:false});
    el('rect',{x:x-9,y:-22,width:18,height:5,fill:PAL.gold,stroke:PAL.ink,'stroke-width':1.6},g)});
  shape(g,'M-92 -100Q-100 -60 -90 -40Q-96 -20 -104 -6',PAL.ivory,{w:0});line(g,'M-92 -96Q-112 -60 -100 -14',{w:4});shape(g,blob(-100,-10,7,12,2,.1,8),PAL.ink,{w:1,dbl:false});
  shape(g,cr([[-92,-120],[-40,-128],[20,-130],[64,-124],[92,-108],[96,-76],[80,-58],[30,-54],[-30,-54],[-80,-58],[-98,-80]],true),PAL.ivory,{w:5,pat:Pat.get('flower',PAL.pink,null,20)});
  shape(g,'M-60 -126Q0 -150 60 -128L58 -100Q0 -84 -58 -98Z',PAL.verm,{w:3.5,pat:Pat.get('dots2',PAL.gold,null,12)});
  el('path',{d:'M-58 -98Q0 -84 58 -100',fill:'none',stroke:PAL.gold,'stroke-width':5},g);
  K.head=grp(g,{transform:'translate(88 -118)'});
  shape(K.head,'M-6 10Q10 -30 34 -40Q60 -46 68 -26Q72 -8 60 6Q40 22 6 26Z',PAL.ivory,{w:4.5,pat:Pat.get('dots',TINT.blush,null,10)});
  [[24,-40,-1],[38,-44,1]].forEach(([x,y,s])=>{const d=`M${x} ${y}Q${x+s*10} ${y-16} ${x+s*6} ${y-24}`;line(K.head,d,{w:8,c:PAL.ink});line(K.head,d,{w:4.5,c:PAL.gold})});
  shape(K.head,'M18 -30Q2 -40 -6 -28Q4 -22 18 -24Z',PAL.pink,{w:2.6,dbl:false});
  el('path',{d:'M38 -22Q46 -30 56 -22Q46 -16 38 -22Z',fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2},K.head);dot(K.head,47,-22.5,2.8,PAL.ink);
  dot(K.head,64,-4,2.4,PAL.ink);line(K.head,'M52 8Q58 10 62 6',{w:2.2,c:PAL.verm});
  for(let i=0;i<7;i++)dot(K.head,lerp(-4,22,i/6),lerp(18,30,i/6)+Math.sin(i)*2,4,i%2?PAL.gold:PAL.verm,{stroke:PAL.ink,w:1.4});
  K.flowers=grp(g);return K}

/* Airavata: majestic white elephant with turquoise caparison (origin = feet centre, faces right); trunk lifts */
function airavata(p){const g=grp(p);const A={g};
  [[-74],[-44],[40],[70]].forEach(([x],i)=>{shape(g,`M${x-15} -70L${x-15} 0L${x+15} 0L${x+15} -70Z`,i%2?PAL.ivory:TINT.milk,{w:4,dbl:false});el('rect',{x:x-16,y:-20,width:32,height:7,fill:PAL.gold,stroke:PAL.ink,'stroke-width':1.8},g);
    [-8,0,8].forEach(d=>dot(g,x+d,-3,3,PAL.ivory,{stroke:PAL.ink,w:1.4}))});
  line(g,'M-104 -120Q-122 -96 -116 -60',{w:4});
  shape(g,cr([[-104,-150],[-50,-176],[30,-178],[86,-160],[104,-120],[96,-70],[40,-60],[-40,-60],[-96,-70],[-112,-112]],true),PAL.ivory,{w:5,pat:Pat.get('grain',TINT.milk2,null,14)});
  shape(g,'M-70 -170Q0 -190 64 -170L70 -88Q0 -74 -70 -88Z',PAL.turq,{w:4,pat:Pat.get('check',PAL.indigo,null,16)});
  shape(g,'M-70 -96Q0 -80 70 -96L72 -80Q0 -64 -72 -80Z',PAL.verm,{w:3,pat:Pat.get('dots',PAL.gold,null,8)});
  for(let i=0;i<7;i++){const x=lerp(-64,64,i/6);shape(g,`M${x-6} -76L${x} -60L${x+6} -76Z`,PAL.gold,{w:2,dbl:false})}
  A.head=grp(g,{transform:'translate(96 -150)'});
  shape(A.head,cr([[-10,-30],[30,-50],[66,-36],[78,0],[70,36],[44,52],[10,44],[-8,10]],true),PAL.ivory,{w:5});
  shape(A.head,'M-6 -26Q-46 -10 -40 30Q-20 50 6 36Q-10 4 -6 -26Z',TINT.blush,{w:4,pat:Pat.get('dots2',PAL.pink,null,10)});
  shape(A.head,'M10 -44Q40 -64 66 -40L60 -28Q38 -44 14 -32Z',PAL.gold,{w:3.5,pat:Pat.get('dots',PAL.verm,null,8)});
  el('path',{d:'M38 -10Q48 -18 58 -10Q48 -4 38 -10Z',fill:PAL.ivory,stroke:PAL.ink,'stroke-width':2},A.head);dot(A.head,48,-10.5,3,PAL.ink);
  A.trunk=grp(A.head,{transform:'translate(64 34)'});
  shape(A.trunk,'M-14 -8Q-4 50 8 96Q12 112 24 108Q30 100 22 96Q14 50 14 -10Z',PAL.ivory,{w:4.5,pat:Pat.get('hstripe',TINT.milk2,null,9)});
  shape(A.head,'M46 40Q74 54 92 44Q78 64 50 56Z',PAL.ivory,{w:3.5});
  return A}

/* Kalpavriksha: the wish-fulfilling tree (origin = base of trunk). grow(k) 0..1, bloom(k) 0..1 */
function kalpavriksha(p){const g=grp(p);const T={g};
  T.trunk=grp(g);shape(T.trunk,'M-20 0Q-14 -80 -12 -150L12 -150Q14 -80 20 0Z',PAL.terra,{w:5,pat:Pat.get('chev',mix(PAL.terra,PAL.ink,.35),null,12)});
  [[-1,-110,-50],[1,-130,40],[-1,-170,-35],[1,-190,30]].forEach(([s,y,a])=>line(T.trunk,`M0 ${y}Q${s*40} ${y-30} ${s*90} ${y-60}`,{w:10,c:PAL.ink}));
  [[-1,-110],[1,-130],[-1,-170],[1,-190]].forEach(([s,y])=>line(T.trunk,`M0 ${y}Q${s*40} ${y-30} ${s*90} ${y-60}`,{w:6,c:PAL.terra}));
  T.clusters=[];[[0,-250,62],[-92,-190,48],[92,-200,48],[-80,-120,40],[84,-140,40],[-40,-300,40],[44,-296,40]].forEach(([x,y,r],i)=>{const cg=grp(g,{transform:`translate(${x} ${y})`});
    shape(cg,blob(0,0,r,r*.85,i+2,.08,12),PAL.leaf,{w:4.5,pat:Pat.get('leafy',mix(PAL.leaf,PAL.ivory,.3),null,14)});
    const fl=grp(cg);[[-.4,-.2],[.35,.1],[0,.4],[.1,-.45]].forEach(([u,v],j)=>{const fg=grp(fl,{transform:`translate(${f1(u*r)} ${f1(v*r)})`});
      if(j%2){dot(fg,0,0,8,PAL.gold,{stroke:PAL.ink,w:2.4});dot(fg,0,0,2.6,PAL.verm)}else{for(let k=0;k<5;k++)el('path',{d:petalD(10,.5),fill:PAL.pink,stroke:PAL.ink,'stroke-width':1.6,transform:`rotate(${k*72})`},fg);dot(fg,0,0,3,PAL.gold)}});
    T.clusters.push({g:cg,fl,x,y})});
  T.grow=(k,b)=>{tf(T.trunk,0,0,1);T.trunk.setAttribute('transform',`scale(1 ${f1(Math.max(.01,ss(k*1.4))*1000)/1000})`);
    T.clusters.forEach((c,i)=>{const kk=Ease.back(clamp(k*1.6-.4-i*.07,0,1));tf(c.g,c.x,c.y,Math.max(.001,kk));tf(c.fl,0,0,Math.max(.001,clamp(b*1.4-i*.06,0,1)))})};
  T.grow(1,1);return T}

/* Halahala: a stylised violet cloud of curls (origin = base). set(k) grows it. */
function halahala(p){const g=grp(p);const H={g,puffs:[]};
  [[0,-70,90],[-80,-130,70],[80,-140,74],[0,-210,96],[-110,-240,60],[110,-250,64],[-40,-320,70],[50,-330,66],[0,-400,58]].forEach(([x,y,r],i)=>{const pg=grp(g);
    shape(pg,blob(0,0,r,r*.8,i*3+1,.1,12),i%2?TINT.violet:TINT.plum,{w:4.5,pat:Pat.get('curl',TINT.lilac,null,26),inner:TINT.lilac});
    line(pg,`M${-r*.4} ${r*.1}A${r*.3} ${r*.3} 0 1 1 ${r*.1} ${r*.35}`,{w:3,c:TINT.lilac});
    H.puffs.push({g:pg,x,y,i})});
  H.set=(k,t,shrink)=>{H.puffs.forEach(P=>{const kk=Ease.out(clamp(k*1.5-P.i*.06,0,1));const wob=Math.sin(t*.002+P.i)*6;tf(P.g,P.x*(1-shrink*.6)+wob,P.y*kk,Math.max(.001,kk*(1-shrink)),Math.sin(t*.001+P.i)*8)})};
  return H}
