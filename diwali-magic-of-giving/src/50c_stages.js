/* ===== Stages for Episode 3 ===== */
/* the puja room: turquoise walls with floral motifs, a temple arch round the framed Lakshmi (Episode 2's illustration), an altar with kalash and thali,
   the main diya in front, petals and offering bowls; the family sits below, never in front of Lakshmi */
const PUJA={l:{arch:[889,312,1.35],altar:[889,500],diya:[889,640,1.15],light:[1250,470],glowR:210},p:{arch:[500,430,1.25],altar:[500,615],diya:[500,790,1.1],light:[790,520],glowR:190}};
function pujaStage(o){o=o||{};const s=mkScene(o.id||'puja');
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const fy=toStage(0,LP(560,720))[1];
    el('rect',{x:-4,y:-4,width:W+8,height:fy+8,fill:Pat.u('flora',P.turmeric,P.turq,1.1)},this.bg);shp(this.bg,`M-4 ${f1(fy-34)}H${W+4}V${f1(fy)}H-4Z`,Pat.u('grid',P.verm,P.turmeric,.9),3);
    shp(this.bg,`M-4 ${f1(fy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.turmeric,P.terra,1),4);
    if(o.red){shp(this.bg,`M0 0H${W}V${H}H0Z M${W*.06} ${H*.05}V${H*.95}H${W*.94}V${H*.05}Z`,Pat.u('petals',P.turmeric,P.verm,1),0,{'fill-rule':'evenodd'})}};
  const A=()=>L.portrait?PUJA.p:PUJA.l;s.A=A;const comp=s.comp;
  const archL=grp(comp),altarL=grp(comp),famL=grp(comp),frontL=grp(comp),motL=grp(comp),lightL=grp(comp),fxL=grp(comp);s.motL=motL;s.frontL=frontL;
  /* temple arch with lotus and paisley borders, the warm glow and the framed devotional image */
  const arch=grp(archL);const glow=warmGlow(arch,PUJA.l.glowR/1.35);
  shp(arch,'M-150 160V-90Q-150 -210 0 -236Q150 -210 150 -90V160H118V-84Q118 -180 0 -200Q-118 -180 -118 -84V160Z',Pat.u('petals',P.turmeric,P.verm,.6),4);
  for(const sd of[-1,1]){const l=lotus(arch,{r:26,n:5,open:.85,pad:false});tf(l.g,sd*134,170,1);const pz=grp(arch,{transform:`translate(${sd*134} -60) scale(${sd} 1)`});shp(pz,'M0 -20C18 -20 22 4 6 14C-4 20 -14 14 -12 4C-10 -6 0 -6 2 0',P.pink,2.6)}
  const top=lotus(arch,{r:30,n:7,open:.9,pad:false});tf(top.g,0,-226,1);
  const fr=lakshmiFrame(arch);s.frame=fr;fr.mk=1;
  /* altar */
  const alt=grp(altarL);shp(alt,'M-250 0H250V60H-250Z',Pat.u('vlines',P.gold,P.terra,.8),4);ln(alt,'M-250 0H250',K,5);
  const gar='M-250 6Q-125 40 0 6Q125 40 250 6';ln(alt,gar,K,7);ln(alt,gar,P.leaf,3.4);for(let i=0;i<11;i++){const u=i/10;const m=marigold(alt,9,i%2?P.gold:P.turmeric);tf(m,lerp(-250,250,u),6+Math.abs(Math.sin(u*2*Math.PI))*16,1)}
  const ka=kalash(alt);tf(ka,-190,0,.9);const th=thali(alt);tf(th,190,-6,.9);
  /* the main diya, petals and offering bowls */
  const md=diya(frontL,{col:P.terra});md.lit=1;s.mainDiya=md;
  const bowls=grp(frontL);[[-1,P.verm],[1,P.turmeric]].forEach(([sd,c])=>{const b=offeringBowl(bowls,c);tf(b,sd*170,0,1)});
  const pet=grp(frontL);const r=rng(5);for(let i=0;i<10;i++){const p=grp(pet,{transform:`translate(${f1((r()-.5)*440)} ${f1(r()*40)}) rotate(${f1(r()*360)})`});shp(p,'M0 0Q6 -8 0 -16Q-6 -8 0 0Z',[P.pink,P.turmeric,P.verm][i%3],1.8)}
  s.F=mkFamily(famL,o.cast||['gran','mother','father','girl','boy','little']);for(const k in s.F)s.F[k].vis=false;
  const light=s.light=mkLight(lightL);s.fx=fxLayer(s);s.demo=demoHand(s);
  s.tick=(dt,t)=>{const a=A();tf(arch,a.arch[0],a.arch[1],a.arch[2]);glow.update(t);fr.update(dt,t);tf(alt,a.altar[0],a.altar[1],LP(1,.86));th._d.update(t);
    md.x=a.diya[0];md.y=a.diya[1];md.s=a.diya[2]*(s.diyaK||1);md.update(t);tf(bowls,a.diya[0],a.diya[1]+LP(14,10),LP(1,.8));tf(pet,a.diya[0],a.diya[1]+LP(40,30),LP(1,.8));
    updFamily(s.F,dt,t);light.update(dt,t)};
  s.glow=glow;return s}
/* seat the family: positions are [x, y, scale, seated] in landscape and portrait */
function seat(F,map){for(const k in F)F[k].vis=false;for(const k in map){const p=F[k];if(!p)continue;p.vis=true;const pt=map[k][1].slice();pt[2]*=1.25;placeP(p,map[k][0],pt,true)}}
/* ---- two picture cards for a kind-action choice; never a wrong answer. Choosing A brings a gentle hint and card B pulses; B continues the story ---- */
function choiceSvg(draw){const sv=document.createElementNS(NS,'svg');sv.setAttribute('viewBox','-100 -60 200 120');sv.setAttribute('aria-hidden','true');el('rect',{x:-100,y:-60,width:200,height:120,fill:P.ivory},sv);draw(grp(sv));return sv}
async function kindChoice(key,cards,o){const tok=D.token;const box=$('choices');box.innerHTML='';box.hidden=false;
  const cardH=Math.max(60,Math.round(L.ph*(L.portrait?.11:.16)));box.style.setProperty('--cardH',cardH+'px');
  let first=null,res;const done=new Promise(r=>res=r);
  const btns=cards.map((c,i)=>{const b=document.createElement('button');b.type='button';b.className='card';b.setAttribute('aria-pressed','false');b.setAttribute('aria-label',c.label);
    b.append(choiceSvg(c.icon));const t=document.createElement('b');t.textContent=c.label;b.append(t);b.addEventListener('click',()=>{D.poke();AU.resume();pick(i,false)});box.append(b);return b});
  let busy=false;
  const pick=async(i,auto)=>{if(busy)return;if(i===1){if(!first)first='B';busy=true;Speech.stop();if(D.skipFn)D.skipFn();btns[1].setAttribute('aria-pressed','true');btns[0].classList.add('dim');AU.sfx('chime');res(auto);return}
    /* choice A: no penalty; the Golden Light gently points the way and card B pulses */
    if(!first)first='A';busy=true;btns[0].classList.add('dim');AU.sfx('soft');try{o.onA&&o.onA();await D.say(o.retry);}catch(e){}busy=false;
    btns[1].classList.remove('pulse');void btns[1].offsetWidth;btns[1].classList.add('pulse')};
  /* both cards are read aloud */
  for(const c of cards){if(first)break;await D.say(c.label,{noCap:true}).catch(()=>{})}
  await D.task({hint:o.retry,start(t){done.then(()=>t.finish())},demo(){btns[1].classList.remove('pulse');void btns[1].offsetWidth;btns[1].classList.add('pulse')},assist(){pick(1,true)}});
  const auto=await done;D.guard(tok);const rec={first:first||'B',auto:!!auto};MEM.kind[key]=rec;Store.choice(key,rec.first,rec.auto);
  await D.wait(D.fast?5:700);box.hidden=true;box.innerHTML='';return rec}
