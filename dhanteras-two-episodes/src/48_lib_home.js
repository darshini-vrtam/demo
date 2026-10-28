/* ================= EPISODE 7: WHAT IS TRUE WEALTH? ================= */
const HOME={L:{man:[889,410],mr:1,ped:[889,600],kal:[889,452],ks:1.55,dh:[300,716],ds:.74,
    diya:[[140,770],[560,760],[1218,760],[1440,770],[1680,770],[700,792],[1078,792],[420,792]],ves:[1570,714],gold:[[700,660],[1078,660]],herb:[[620,720],[1158,720]],
    sym:[[560,262],[700,150],[889,104],[1078,150],[1218,262]],sr:58,floor:600,
    med:[[110,620],[110,400],[110,180],[470,100],[1308,100],[1668,180],[1668,400]],mr2:66},
  P:{man:[500,700],mr:1.18,ped:[500,930],kal:[500,770],ks:1.75,dh:[160,1260],ds:.72,
    diya:[[90,1440],[330,1440],[670,1440],[910,1440],[500,1460],[260,1330],[740,1330],[860,1210]],ves:[850,1250],gold:[[340,990],[660,990]],herb:[[270,1060],[730,1060]],
    sym:[[230,600],[330,420],[500,360],[670,420],[770,600]],sr:56,floor:1010,
    med:[[80,860],[80,640],[200,150],[500,130],[800,150],[920,640],[920,860]],mr2:66}};
function homeScene(o){o=o||{};const s=mkScene(o.id||'home',{frame:'gold'});
  s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const fy=toStage(0,(L.portrait?HOME.P:HOME.L).floor)[1];
    el('rect',{x:-4,y:-4,width:W+8,height:H+8,fill:Pat.u('stars',P.turmeric,P.indigo,1.2)},this.bg);
    if(o.sea){this.sea=ocean(this.bg,W,fy-LP(120,150),fy+20,{mood:'divine',n:2,scale:.8})}
    shp(this.bg,`M-4 ${fy}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.turmeric,P.terra,1),4);ln(this.bg,`M-4 ${fy+14}H${W+4}`,P.ivory,4,{'stroke-dasharray':'.1 14'});
    /* a toran of marigolds and mango leaves across the top */
    const tor=grp(this.bg);const n=Math.max(6,Math.round(W/170));let d='';for(let i=0;i<n;i++){const x0=BORDER+i*(W-2*BORDER)/n,x1=x0+(W-2*BORDER)/n;d+=`M${f1(x0)} ${BORDER+6}Q${f1((x0+x1)/2)} ${BORDER+60} ${f1(x1)} ${BORDER+6}`}
    ln(tor,d,K,7);ln(tor,d,P.leaf,3.4);for(let i=0;i<n;i++){const x0=BORDER+i*(W-2*BORDER)/n,x1=x0+(W-2*BORDER)/n;for(let j=1;j<5;j++){const u=j/5;const x=lerp(x0,x1,u),y=BORDER+6+Math.sin(u*Math.PI)*27;const m=marigold(tor,10,j%2?P.turmeric:P.ochre);tf(m,x,y,1)}
      leaf(tor,26,9,P.leaf,90,x0,BORDER+8)}};
  s.parts.push({update:(dt,t)=>{s.sea&&(s.sea.k=.6,s.sea.update(t,dt))}});
  const comp=s.comp;const manG=grp(comp),pedG=grp(comp),kalG=grp(comp),dhG=grp(comp),propL=grp(comp),symL=grp(comp),medL=grp(comp),fxL=grp(comp);
  const man=grp(manG);halo(man,250,{col:P.turmeric});rings(man,220,{n:3,step:.14,w:5,c1:P.gold,c2:P.ivory,dots:18});circ(man,0,0,150,P.indigo,4);
  circ(man,0,0,150,'none',3,{stroke:P.turmeric,'stroke-dasharray':'.1 12','stroke-width':7,'stroke-linecap':'round'});const rayG=grp(man);rays(rayG,262,330,32,P.turmeric,6);
  const ped=grp(pedG);shp(ped,'M-170 30H170L150 80H-150Z',Pat.u('petals',P.turmeric,P.verm,.8),4);const pl=lotus(ped,{r:120,n:9,open:1,col:P.pink,col2:P.ivory});tf(pl.g,0,24,1);
  const kal=kalash(kalG,{lotus:true});
  const dh=new Deity('dhanv',dhG,{pose:'open'});const dAura=grp(dhG);dhG.insertBefore(dAura,dhG.firstChild);rings(dAura,150,{n:3,step:.16,w:4,c1:P.turmeric,c2:P.ivory});
  const diyas=[];for(let i=0;i<8;i++)diyas.push(diya(propL,{col:i%2?P.terra:P.ochre}));
  const ves=grp(propL);shp(ves,'M-30 -40Q-56 -20 -46 10Q-36 36 0 38Q36 36 46 10Q56 -20 30 -40Z',Pat.u('vlines',P.ochre,P.terra,.7),4);shp(ves,'M-16 -40L-20 -58H20L16 -40Z',P.terra,3);ell(ves,0,-58,24,6,P.ochre,3);
  [-1,0,1].forEach(i=>leaf(ves,40,11,P.leaf,-90+i*35,i*6,-62));
  const golds=[0,1].map(()=>{const g=grp(propL);[[-20,6],[18,6],[0,-14],[-34,-8],[34,-8]].forEach(([x,y],j)=>{const m=marigold(g,16,j%2?P.ochre:P.turmeric);tf(m,x,y,1)});return g});
  const herbs=[0,1].map(i=>{const g=grp(propL);sprig(g,.75);return g});
  const syms=SYMS.map(sy=>{const g=grp(symL);const halo_=grp(g);rings(halo_,80,{n:2,step:.2,w:4});circ(g,0,0,58,P.ivory,4);circ(g,0,0,50,'none',2.4,{stroke:P.gold,'stroke-dasharray':'.1 9','stroke-width':5,'stroke-linecap':'round'});
    const ic=grp(g);symbol(ic,sy.key);ic.setAttribute('transform','scale(.62)');return{g,halo:halo_,k:0,glow:0,key:sy.key}});
  Object.assign(s,{kal,dh,diyas,syms,man,rayG,medL,fxL,st:{rays:o.rays||0,dh:1}});s.cast.dhanv=dh;
  s.onLayout=function(){s.A=L.portrait?HOME.P:HOME.L};
  s.tick=function(dt,t){const A=s.A,m=MV();tf(man,A.man[0],A.man[1],A.mr,t*1.5*m);op(rayG,s.st.rays);
    tf(ped,A.ped[0],A.ped[1],L.portrait?1.15:1);kal.x=A.kal[0];kal.y=A.kal[1];kal.s=A.ks;kal.update(t);
    dh.x=A.dh[0];dh.y=A.dh[1];dh.s=A.ds;dh.update(dt,t);tf(dAura,0,-300,1,0);op(dhG,s.st.dh);
    diyas.forEach((d,i)=>{d.x=A.diya[i][0];d.y=A.diya[i][1];d.s=L.portrait?1.05:.95;op(d.g,i<(s.nDiya||5)?1:0);d.update(t)});
    tf(ves,A.ves[0],A.ves[1],L.portrait?1.05:1);golds.forEach((g,i)=>tf(g,A.gold[i][0],A.gold[i][1],L.portrait?1.1:1));herbs.forEach((g,i)=>tf(g,A.herb[i][0],A.herb[i][1],1,i?14:-14,i?-1:1,1));
    syms.forEach((sy,i)=>{const p=A.sym[i];tf(sy.g,p[0],p[1],A.sr/58*(1+.12*sy.k));op(sy.halo,clamp(sy.k+sy.glow,0,1));if(sy.k+sy.glow>0)tf(sy.halo,0,0,.9+.25*sy.glow+.04*Math.sin(t*1.3+i)*m,t*8*m)})};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
async function glowOnce(sy){AU.sfx('sparkle');await D.tw(sy,{k:1},600,'out');await D.tw(sy,{k:0},900)}

/* ---- 7.2 Fill the Treasure Pot: the story's only choice, multi-select, no wrong answer ---- */
function cardSvg(key){const s=document.createElementNS(NS,'svg');s.setAttribute('viewBox','-100 -72 200 144');s.setAttribute('aria-hidden','true');
  el('rect',{x:-100,y:-72,width:200,height:144,fill:Pat.u('dots',P.turmeric,P.ivory,.8)},s);circ(s,0,0,62,P.ivory,3.4);const g=grp(s);symbol(g,key);g.setAttribute('transform','scale(.7)');return s}
/* ================= CLOSING: A LITTLE LIGHT FOR DHANTERAS ================= */
/* miniature versions of the story's own drawings, one per recap line */
function miniPic(parent,k){const g=grp(parent);
  if(k===0){shp(g,'M-80 6Q-60 -6 -40 6T0 6T40 6T80 6V80H-80Z',Pat.u('wave',P.foam,P.indigo,.45),3);const l=lotus(g,{r:30,n:7,open:.9});tf(l.g,0,8,1);star4(g,-30,-30,8,P.turmeric);star4(g,30,-36,6,P.ivory)}
  else if(k===1){shp(g,'M-80 -10Q-60 -22 -40 -10T0 -10T40 -10T80 -10V80H-80Z',Pat.u('wave',P.foam,P.turq,.45),3);const f=fish(g,0);tf(f.g,-12,16,.5,-12);const f2=fish(g,2);tf(f2.g,26,-30,.38,10,-1,1)}
  else if(k===2){const kg=grp(g);kurma(kg);tf(kg,0,42,.2);const mg=grp(g);mandara(mg);tf(mg,0,20,.15);shp(g,'M-80 34Q-60 26 -40 34T0 34T40 34T80 34V80H-80Z',Pat.u('wave',P.foam,P.indigo,.4),2)}
  else if(k===3){const sc=grp(g,{transform:'scale(.17)'});const mg=grp(sc);mandara(mg);tf(mg,0,240,1);const b=grp(sc),f=grp(sc),h=grp(sc);const V=vasuki(b,f,h);sc.insertBefore(b,mg);op(h,0);
    const list=[];for(let i=0;i<=90;i++){const u=i/90,v=lerp(.12,.66,u),th=-Math.PI/2+u*2.5*TAU;const R=MANDARA.hw(v)+18;list.push([R*Math.sin(th),240-v*MANDARA.H+Math.cos(th)*16,Math.cos(th)])}V.draw(list,{})}
  else if(k===4){const d=new Deity('shiva',g,{pose:'shiva'});d.throat=1;d.x=0;d.y=150;d.s=.38;d.update(0,0)}
  else if(k===5){const a=airavata(g);tf(a.g,-6,40,.42);a.update(0)}
  else{const d=new Deity('dhanv',g,{pose:'kalash'});d.x=0;d.y=150;d.s=.38;d.update(0,0);const kk=kalash(g);const hl=d.handW(-1),hr=d.handW(1);kk.x=(hl[0]+hr[0])/2;kk.y=(hl[1]+hr[1])/2-8;kk.s=.19;kk.update(0)}
  return g}