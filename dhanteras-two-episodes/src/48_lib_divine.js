/* ================= EPISODE 6: THE DIVINE ARRIVAL OF LORD DHANVANTARI ================= */
const DIV={L:{lot:[889,668],lr:1.3,dh:[889,604],ds:1.15,aura:[889,288],ar:1,dev:[[70,784],[160,784],[250,784]],as:[[1528,784],[1618,784],[1708,784]],fs:.5,
    flank:[[560,730],[1218,730]],orb:[[440,740],[1338,740]],fish:[[300,520],[1480,520]],star:[[560,250],[1218,250],[700,120],[1078,120]]},
  P:{lot:[500,1190],lr:1.3,dh:[500,1120],ds:1.25,aura:[500,772],ar:1.1,dev:[[60,1486],[140,1486],[220,1486]],as:[[780,1486],[860,1486],[940,1486]],fs:.42,
    flank:[[170,1290],[830,1290]],orb:[[150,1360],[850,1360]],fish:[[180,980],[820,980]],star:[[160,560],[840,560],[300,450],[700,450]]}};
function divineScene(){const s=mkScene('divine',{frame:'gold'});oceanBg(s,{mood:'divine',seed:51,clouds:[[.12,.35,LP(170,130)],[.9,.3,LP(180,130)]]});
  const comp=s.comp;const ripL=grp(comp),auraL=grp(comp),flankL=grp(comp),herbL=grp(comp),lotL=grp(comp),figL=grp(comp),fxL=grp(comp);
  /* golden rings spreading across the water */
  const rip=[0,1,2,3].map(i=>{const g=grp(ripL);el('ellipse',{rx:300,ry:60,fill:'none',stroke:K,'stroke-width':8},g);el('ellipse',{rx:300,ry:60,fill:'none',stroke:i%2?P.turmeric:P.ivory,'stroke-width':4,'stroke-dasharray':i%2?'30 12':'.1 14','stroke-linecap':'round'},g);return g});
  /* aura: concentric folk-art circles and patterned rays */
  const aura=grp(auraL);rays(aura,200,250,28,P.turmeric,6);halo(aura,190,{col:P.turmeric});rings(aura,165,{n:3,step:.18,w:5,c1:P.gold,c2:P.ivory,dots:16});circ(aura,0,0,104,P.turmeric,4);circ(aura,0,0,90,'none',3,{stroke:P.verm,'stroke-dasharray':'.1 10','stroke-width':6,'stroke-linecap':'round'});
  const flank=[0,1].map(i=>lotus(flankL,{r:62,n:7,open:.9,col:i?P.pink:P.coral}));
  const fishes=[0,1].map(i=>fish(fxL,i));const stars=[0,1,2,3].map(i=>{const g=grp(fxL);star4(g,0,0,12,i%2?P.ivory:P.turmeric);return g});
  /* the large lotus; Lord Dhanvantari stands inside it, between its back and front petals */
  const lot=lotus(lotL,{r:150,n:11,open:0});const inside=grp(lot.g);lot.g.insertBefore(inside,lot.g.children[2]);
  const clipR=el('rect',{x:-600,y:-1200,width:1200,height:1160},el('clipPath',{id:uid('dc')},lotL));inside.setAttribute('clip-path',`url(#${clipR.parentNode.id})`);
  const dWrap=grp(inside);const ghostG=grp(dWrap),fullG=grp(dWrap);
  INK.ghost=true;let ghost;try{ghost=new Deity('dhanv',ghostG,{pose:'kalash'})}finally{INK.ghost=false}
  const dh=new Deity('dhanv',fullG,{pose:'kalash'});const kal=kalash(fullG);const glint=grp(dWrap);star4(glint,0,0,16,P.turmeric);circ(glint,0,0,4,P.ivory,0);
  const meter=grp(lotL);circ(meter,0,0,118,'none',16,{stroke:K});const arc=el('circle',{cx:0,cy:0,r:118,fill:'none',stroke:P.turmeric,'stroke-width':10,'stroke-dasharray':'0 999',transform:'rotate(-90)'},meter);
  const cT=target(lotL,90);
  const devas=[0,1,2].map(i=>new Fig('deva',i,figL)),asuras=[0,1,2].map(i=>new Fig('asura',i,figL));s.cast.devas=devas;s.cast.asuras=asuras;s.cast.dhanv=dh;
  /* medicinal herbs, leaves and petals drifting slowly around the lotus during the health lesson */
  const herbs=[];for(let i=0;i<8;i++){const g=grp(herbL);if(i%3===0)sprig(g,.6);else if(i%3===1)leaf(g,40,12,P.leaf,-30);else{shp(g,'M0 0Q9 -12 0 -24Q-9 -12 0 0Z',i%2?P.pink:P.ivory,2.4)}herbs.push({g,a:i/8*TAU,r:.8+(i%3)*.12})}
  Object.assign(s,{lot,ghost,dh,kal,glint,arc,meter,cT,aura,herbs,st:{rise:0,ghost:0,glint:0,aura:0,rip:0,herb:0,warm:0,meter:0,turn:0,lit:0}});
  s.onLayout=function(){s.A=L.portrait?DIV.P:DIV.L;const A=s.A;devas.forEach((f,i)=>{f.x=A.dev[i][0];f.y=A.dev[i][1];f.s=A.fs;f.f=1});asuras.forEach((f,i)=>{f.x=A.as[i][0];f.y=A.as[i][1];f.s=A.fs;f.f=-1})};
  s.tick=function(dt,t){const A=s.A,st=s.st,m=MV();
    rip.forEach((g,i)=>{const k=((t*.12+i/4)%1);tf(g,A.lot[0],A.lot[1]+10,(.4+k*1.9)*st.rip);op(g,st.rip*(1-k))});
    tf(aura,A.aura[0],A.aura[1],A.ar*(.3+.7*st.aura),t*2*m);op(aura,st.aura);
    flank.forEach((l,i)=>tf(l.g,A.flank[i][0],A.flank[i][1],1,Math.sin(t*.7+i)*3*m));
    fishes.forEach((f,i)=>{const sd=i?-1:1;tf(f.g,A.fish[i][0]+Math.sin(t*.4+i)*40*m,A.fish[i][1]+Math.sin(t*1.3+i)*8,.8,0,sd,1);f.tail.setAttribute('transform',`rotate(${f1(Math.sin(t*4+i)*10)} -22 0)`)});
    stars.forEach((g,i)=>tf(g,A.star[i][0],A.star[i][1],.6+.4*Math.abs(Math.sin(t*.6+i*1.3))*m));
    tf(lot.g,A.lot[0],A.lot[1],A.lr*(L.portrait?1:.86));lot.set(s.lotOpen||0,true);
    const ls=A.lr*(L.portrait?1:.86);const lx=0,ly=0;/* Lord Dhanvantari in lotus coordinates */
    const dy=-30-(1-st.rise)*260;dh.x=0;dh.y=dy;dh.s=A.ds/ls;ghost.x=0;ghost.y=-30-(1-Math.max(st.ghost>0?.85:0,st.rise))*260+(st.ghost>0?0:0);ghost.s=A.ds/ls;
    dh.update(dt,t);ghost.update(dt,t);op(fullG,st.rise>0?1:0);op(ghostG,st.ghost*(1-st.rise));
    const hl=dh.handW(-1),hr=dh.handW(1);kal.x=(hl[0]+hr[0])/2;kal.y=(hl[1]+hr[1])/2-22*dh.s;kal.s=.5*dh.s;kal.glow=st.rise;kal.update(t);
    const gl=ghost.handW(-1),gr=ghost.handW(1);tf(glint,(gl[0]+gr[0])/2,(gl[1]+gr[1])/2-30*ghost.s,(.5+.5*Math.abs(Math.sin(t*.7)))*st.glint/ls);
    const lc=lotC(s);tf(meter,lc[0],lc[1],1);cT.x=lc[0];cT.y=lc[1];op(meter,st.meter);this.arc.setAttribute('stroke-dasharray',`${f1(st.warm*741)} 999`);cT.update(t);
    herbs.forEach((h,i)=>{h.a+=dt*.12*m;const R=LP(330,300)*h.r;tf(h.g,A.lot[0]+Math.cos(h.a)*R*1.25,A.lot[1]-150+Math.sin(h.a)*R*.55,1,Math.sin(t*.5+i)*20);op(h.g,st.herb)});
    devas.concat(asuras).forEach(f=>f.update(dt,t))};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}
/* the centre of the lotus in composition units */
function lotC(s){const A=s.A;const k=A.lr*(L.portrait?1:.86);return[A.lot[0],A.lot[1]-70*k]}




