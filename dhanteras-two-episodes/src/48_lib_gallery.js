/* ================= EPISODE 5: THE OCEAN REVEALS ITS TREASURES ================= */
/* a lotus-shaped window: pointed top, rounded base, petal doors that part to reveal what is inside */
function panelD(w,h){return`M0 ${-h/2}C${w*.2} ${-h*.36} ${w/2} ${-h*.24} ${w/2} ${h*.1}C${w/2} ${h*.36} ${w*.3} ${h/2} 0 ${h/2}C${-w*.3} ${h/2} ${-w/2} ${h*.36} ${-w/2} ${h*.1}C${-w/2} ${-h*.24} ${-w*.2} ${-h*.36} 0 ${-h/2}Z`}
function lotusPanel(parent,o){const w=o.w||290,h=o.h||300;const g=grp(parent);const d=panelD(w,h);
  shp(g,d,o.bg||P.indigo,0);const cl=clipIn(g,d);const inner=grp(g,{'clip-path':cl});
  el('rect',{x:-w,y:-h,width:w*2,height:h*2,fill:Pat.u('stars',P.turmeric,o.bg||P.indigo,.8)},inner);
  const wave=grp(inner);shp(wave,`M${-w} ${h*.32}Q${-w*.75} ${h*.22} ${-w/2} ${h*.32}T0 ${h*.32}T${w/2} ${h*.32}T${w} ${h*.32}V${h}H${-w}Z`,Pat.u('wave',P.foam,P.turq,.6),3);
  const ghost=grp(inner),full=grp(inner);const doors=grp(inner);
  const door=sd=>{const dg=grp(doors);const dd=sd<0?`M0 ${-h/2}C${-w*.2} ${-h*.36} ${-w/2} ${-h*.24} ${-w/2} ${h*.1}C${-w/2} ${h*.36} ${-w*.3} ${h/2} 0 ${h/2}Z`:`M0 ${-h/2}C${w*.2} ${-h*.36} ${w/2} ${-h*.24} ${w/2} ${h*.1}C${w/2} ${h*.36} ${w*.3} ${h/2} 0 ${h/2}Z`;
    shp(dg,dd,Pat.u('petals',P.pink,P.coral,.9),3.4);ln(dg,sd<0?`M-4 ${-h*.44}C${-w*.2} ${-h*.2} ${-w*.26} ${h*.2} -4 ${h*.46}`:`M4 ${-h*.44}C${w*.2} ${-h*.2} ${w*.26} ${h*.2} 4 ${h*.46}`,P.ivory,3.4);return dg};
  const dl=door(-1),dr=door(1);
  shp(g,d,'none',14,{stroke:K});shp(g,d,'none',9,{stroke:P.gold});ln(g,d,P.turmeric,4,{'stroke-dasharray':'.1 13'});
  const tip=grp(g,{transform:`translate(0 ${-h/2-6})`});shp(tip,'M0 -22C-8 -14 -8 -4 0 0C8 -4 8 -14 0 -22Z',P.turmeric,2.6);
  const T_={g,ghost,full,inner,w,h,open:0,reveal:0,x:0,y:0,s:1,rise:0,update(){tf(this.g,this.x,this.y+(1-this.rise)*60,this.s*(.7+.3*this.rise));op(this.g,clamp(this.rise*1.4,0,1));
    const k=this.open;tf(dl,-k*w*.62,0,1,0,1-.25*k,1);tf(dr,k*w*.62,0,1,0,1-.25*k,1);op(this.ghost,1-this.reveal);op(this.full,this.reveal)}};return T_}
/* each treasure is drawn twice: as a pale golden outline (peeking) and in full colour */
function treasurePanel(parent,key,o){const p=lotusPanel(parent,o);let objF,objG;const mk=(par,ghost)=>{INK.ghost=ghost;let r;try{
    if(key==='cow'){r=kamadhenu(par);tf(r.g,-6,o.h*.24,1.05)}else if(key==='horse'){r=horse(par);tf(r.g,-8,o.h*.28,1.05)}
    else if(key==='elephant'){r=airavata(par);tf(r.g,-14,o.h*.3,.95)}else if(key==='jewels'){r=jewels(par);tf(r.g,0,o.h*.22,1.3)}
    else if(key==='tree'){r=kalpavriksha(par);tf(r.g,0,o.h*.42,1.05)}else if(key==='lakshmi'){const lt=lotus(par,{r:70,n:9,open:1});tf(lt.g,0,o.h*.4,1);r=new Deity('lakshmi',par,{pose:'lotus'});r.x=0;r.y=o.h*.38;r.s=.54;r.update(0,0)}
    }finally{INK.ghost=false}return r};
  objG=mk(p.ghost,true);objF=mk(p.full,false);p.obj=objF;p.objG=objG;p.key=key;
  const up=p.update.bind(p);p.update=(dt,t)=>{up();if(objF&&objF.update)objF.update(dt||0,t||0);if(objG&&objG.update&&key!=='lakshmi')objG.update(dt||0,t||0)};return p}

/* a small churning picture inside a round medallion: the mountain keeps turning gently */
function miniChurn(parent){const m=medallion(parent,110,{bg:P.sea});const g=grp(m.pic);
  shp(g,'M-120 30Q-100 22 -80 30T-40 30T0 30T40 30T80 30T120 30V120H-120Z',Pat.u('wave',P.foam,P.indigo,.5),3);
  const sc=grp(g,{transform:'scale(.24)'});const kg=grp(sc);const k=kurma(kg);tf(kg,0,233,1);const b=grp(sc);const mg=grp(sc);const M=mandara(mg);tf(mg,0,125,1);const f=grp(sc),h=grp(sc);const V=vasuki(b,f,h);op(h,0);
  const list=[];for(let i=0;i<=90;i++){const u=i/90,v=lerp(.15,.62,u),th=-Math.PI/2+u*2.5*TAU;const R=MANDARA.hw(v)+18;list.push([R*Math.sin(th),125-v*MANDARA.H+Math.cos(th)*16,Math.cos(th)])}
  return{g:m.g,x:0,y:0,s:1,rot:0,update(dt,t){tf(this.g,this.x,this.y,this.s);op(this.g,this.s>.02?1:0);this.rot+=(dt||0)*24;M.rot=this.rot;M.update();k.update(t||0);V.flow=this.rot*2;V.draw(list,{})}}}

const GAL={keys:['cow','horse','elephant','jewels','tree','lakshmi'],
  bg:{cow:P.sea,horse:P.indigo,elephant:P.turq,jewels:P.indigo,tree:P.ivory,lakshmi:P.indigo},
  L:{pos:[[250,292],[590,292],[1188,292],[1528,292],[520,622],[1258,622]],w:290,h:310,med:[889,150],lotus:[889,660],dev:[[70,790],[150,790],[230,790]],as:[[1548,790],[1628,790],[1708,790]],fs:.44},
  P:{pos:[[262,370],[738,370],[262,730],[738,730],[262,1090],[738,1090]],w:330,h:330,med:[500,120],lotus:[500,1340],dev:[[70,1490],[150,1490],[230,1490]],as:[[770,1490],[850,1490],[930,1490]],fs:.4}};
function galleryScene(){const s=mkScene('gallery',{frame:'gold'});oceanBg(s,{mood:'wonder',seed:41,horizon:()=>LP(150,230),clouds:[[.08,.4,LP(160,120)],[.93,.35,LP(170,120)]]});
  const comp=s.comp;const medL=grp(comp);const panL=grp(comp);const lotL=grp(comp);const figL=grp(comp);
  const mc=miniChurn(medL);s.parts.push(mc);s.mc=mc;
  s.panels={};GAL.keys.forEach(k=>{const p=treasurePanel(panL,k,{w:290,h:310,bg:GAL.bg[k]});s.panels[k]=p;s.parts.push(p)});
  const cen=lotus(lotL,{r:100,n:9,open:0});const cg=grp(lotL);rings(cg,140,{n:3,step:.2,w:5});lotL.insertBefore(cg,lotL.firstChild);s.cen=cen;s.cenG=cg;
  const devas=[0,1,2].map(i=>new Fig('deva',i,figL)),asuras=[0,1,2].map(i=>new Fig('asura',i+2,figL));s.cast.devas=devas;s.cast.asuras=asuras;
  s.st={glow:0,lot:1};
  s.onLayout=function(){const A=L.portrait?GAL.P:GAL.L;s.A=A;mc.x=A.med[0];mc.y=A.med[1];mc.s=L.portrait?.9:.92;
    GAL.keys.forEach((k,i)=>{const p=s.panels[k];p.x=A.pos[i][0];p.y=A.pos[i][1];p.s=A.w/290});
    devas.forEach((f,i)=>{f.x=A.dev[i][0];f.y=A.dev[i][1];f.s=A.fs;f.f=1});asuras.forEach((f,i)=>{f.x=A.as[i][0];f.y=A.as[i][1];f.s=A.fs;f.f=-1})};
  s.tick=function(dt,t){const A=s.A;tf(cen.g,A.lotus[0],A.lotus[1],(L.portrait?1.3:1.4)*s.st.lot);tf(cg,A.lotus[0],A.lotus[1]-30,.6+.4*s.st.glow+.03*Math.sin(t*1.2)*s.st.glow);op(cg,s.st.glow);
    devas.concat(asuras).forEach(f=>f.update(dt,t))};
  s.fx=fxLayer(s);s.demo=demoHand(s);return s}




