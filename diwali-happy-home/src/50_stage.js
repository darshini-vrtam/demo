/* ===== Shared staging: the home stage (wide and puja views), the family, the Golden Light, task icons and the three motifs ===== */
const HOMEV={wide:{l:[889,600,.85],p:[500,700,.86]},puja:{l:[271,780,1.9],p:[-20,1150,1.6]}};
/* flat patterned sky in bands: late afternoon for Scenes 1 to 3, deeper evening for Scene 4 */
function homeBg(s,tod){s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const v=HOMEV[s.view||'wide'][L.portrait?'p':'l'];const gy=toStage(0,v[1])[1];
  const eve=tod==='evening';el('rect',{x:-4,y:-4,width:W+8,height:gy+8,fill:Pat.u('stars',eve?P.turmeric:P.ivory,eve?P.midnight:P.sea,1.2)},this.bg);
  el('rect',{x:-4,y:gy*.55,width:W+8,height:gy*.45+8,fill:Pat.u('dots',eve?P.indigo:P.turmeric,eve?P.indigo:P.coral,1)},this.bg);ln(this.bg,`M-4 ${f1(gy*.55)}H${W+4}`,P.gold,4,{'stroke-dasharray':'.1 14'});
  const sun=grp(this.bg);if(!eve){circ(sun,0,0,46,P.turmeric,4);rays(sun,54,74,14,P.turmeric,4);tf(sun,W*.16,gy*.3,1)}
  [[.3,.18],[.72,.12]].forEach(([u,v_])=>{const c=cloud(this.bg,LP(200,150),P.ivory);tf(c,W*u,gy*v_,1)});
  shp(this.bg,`M-4 ${f1(gy)}H${W+4}V${H+4}H-4Z`,Pat.u('petals',P.gold,P.terra,1),4);ln(this.bg,`M-4 ${f1(gy+12)}H${W+4}`,P.ivory,4,{'stroke-dasharray':'.1 14'})}}
function mkLight(parent){const l=goldenLight(parent,{variant:'flame',glow:.6});D.light=l;return l}
/* the family: each person walks smoothly to its target; place() sets landscape and portrait targets */
function mkFamily(parent,order){const F={};(order||['gran','mother','father','boy','girl']).forEach(k=>{const p=new Person(k,parent);p.tg=null;F[k]=p});return F}
function placeP(p,l,pt,snap){p.tgl=l;p.tgp=pt;if(snap){const t=LP(l,pt);p.x=t[0];p.y=t[1];p.s=t[2]}}
function updFamily(F,dt,t){for(const k in F){const p=F[k];if(p.tgl){const tg=LP(p.tgl,p.tgp);const kk=1-Math.exp(-dt*(D.fast?40:2.2));const dx=tg[0]-p.x;p.x+=dx*kk;p.y+=(tg[1]-p.y)*kk;p.s+=(tg[2]-p.s)*kk;
    p.walk=Math.abs(dx)>6&&!p.seat?1:0;if(tg[3]!=null&&p._seatSet!==tg[3]){p.seat=tg[3];p._seatSet=tg[3]}if(tg[4]!=null)p.f=tg[4]}p.update(dt,t)}}
function homeStage(o){o=o||{};const s=mkScene(o.id||'home');s.view=o.view||'wide';homeBg(s,o.tod);
  const comp=s.comp;const wingL=grp(comp),treeL=grp(comp),homeL=grp(comp),famL=grp(comp),propL=grp(comp),motL=grp(comp),lightL=grp(comp),iconL=grp(comp);
  const trees=[homeTree(treeL,false),homeTree(treeL,true)];
  const H=familyHome(homeL,o.state||{});s.H=H;const hc={v:null};
  /* in the puja view, the inside wall continues to the right of the puja area: cream with floral motifs, a frieze, garlands and symmetrical lotus motifs */
  const wing=grp(wingL);el('rect',{x:440,y:-410,width:700,height:376,fill:Pat.u('flora',P.gold,P.ivory,.6),stroke:K,'stroke-width':4},wing);shp(wing,'M440 -410H1140V-374H440Z',Pat.u('petals',P.gold,P.verm,.7),3);
  shp(wing,'M440 -110H1140V-34H440Z',Pat.u('grid',P.verm,P.ivory,1),3);
  for(const x of[560,1000]){const l=lotus(wing,{r:44,n:7,open:.9});tf(l.g,x,-210,1)}
  const gw='M450 -364Q620 -300 790 -364Q960 -300 1130 -364';ln(wing,gw,K,7);ln(wing,gw,P.leaf,3.4);for(let i=0;i<13;i++){const u=i/12;const x=lerp(450,1130,u);const y=-364+Math.abs(Math.sin(u*2*Math.PI))*48;const m=marigold(wing,10,i%2?P.gold:P.turmeric);tf(m,x,y+6,1)}
  s.famL=famL;s.matL=grp(null);comp.insertBefore(s.matL,famL);const F=s.F=mkFamily(famL);if(o.noFamily)for(const k in F)F[k].vis=false;
  const light=s.light=mkLight(lightL);s.fx=fxLayer(s);s.demo=demoHand(s);s.propL=propL;s.motL=motL;s.iconL=iconL;
  s.toHome=(lx,ly)=>{const v=hc.v||HOMEV[s.view][L.portrait?'p':'l'];return[v[0]+lx*v[2],v[1]+ly*v[2]]};
  s.setView=v=>{s.view=v;s.relayout()};
  s.tick=function(dt,t){const tg=HOMEV[s.view][L.portrait?'p':'l'];if(!hc.v||hc.o!==L.portrait)hc.v=tg.slice(),hc.o=L.portrait;const kk=1-Math.exp(-dt*(D.fast?40:2));for(let i=0;i<3;i++)hc.v[i]+=(tg[i]-hc.v[i])*kk;
    tf(homeL,hc.v[0],hc.v[1],hc.v[2]);tf(wingL,hc.v[0],hc.v[1],hc.v[2]);op(wingL,s.view==='puja'?1:0);op(H.ringG.parentNode,s.view==='puja'?0:1);H.update(t,dt);
    const tp=s.view==='wide'?LP([[300,600,.95],[1478,600,.95]],[[60,700,.8],[940,700,.8]]):LP([[-400,780,1.6],[2100,780,1.6]],[[-400,1150,1.3],[1400,1150,1.3]]);
    trees.forEach((tr,i)=>{const p=tp[i];tr.g.setAttribute('transform',`translate(${p[0]} ${p[1]}) scale(${p[2]*(i?-1:1)} ${p[2]})`)});
    updFamily(F,dt,t);light.update(dt,t)};
  return s}
/* three task icons across the top: flowers, diyas, rangoli; each inactive, active or done (with a tick) */
const TASKS=['flowers','diyas','rangoli'];
function taskIcons(parent){const g=grp(parent);const list=TASKS.map((k,i)=>{const ic=grp(g);const ring=target(ic,46);const bd=grp(ic);circ(bd,0,0,40,P.ivory,4);
    const art=grp(bd);if(k==='flowers')flowerCluster(art,0).setAttribute('transform','scale(.95)');else if(k==='diyas'){const d=diya(art,{col:P.terra});d.s=.5;d.lit=1;d.y=16;d.update(0)}
    else{circ(art,0,0,26,P.verm,2.6);circ(art,0,0,18,P.gold,2);circ(art,0,0,9,P.turq,2)}
    const tick=grp(ic);circ(tick,28,-28,15,P.leaf,3);ln(tick,'M21 -28L26 -22L35 -34',P.ivory,4);
    return{k,g:ic,ring,bd,tick,state:0,on:0,k1:0,pop:0}});
  const T={g,list,show:0,
    set(k,st){const i=list.find(q=>q.k===k);if(i){i.state=st;if(st===2){i.pop=1;tw(i,{pop:0},700,'out').catch(()=>{})}}},
    col:false,pos(i){return this.col?LP([130,200+i*120],[330+i*170,300]):LP([760+i*129,150],[330+i*170,300])},
    update(t){op(g,this.show);list.forEach((q,i)=>{const p=this.pos(i);tf(q.g,p[0],p[1],(L.portrait?1.25:1)*(1+.15*q.pop)*clamp(this.show*1.4-i*.2,0,1));
      q.ring.on=q.state===1?1:0;q.ring.update(t);op(q.bd,q.state===0?.55:1);op(q.tick,q.state===2?1:0)})}};
  return T}
/* the three secrets: heart (care), flower (sharing), sun (gratitude) */
function motif(parent,k){const g=grp(parent);
  if(k==='heart'){shp(g,'M0 34C-40 6 -44 -22 -24 -32C-12 -38 -2 -30 0 -20C2 -30 12 -38 24 -32C44 -22 40 6 0 34Z',P.verm,4);ln(g,'M-22 -18Q-26 -6 -16 6',P.ivory,3);circ(g,0,-2,4,P.turmeric,1.4)}
  else if(k==='flower')tinyFlower(g,36,P.pink);
  else if(k==='sun'){rays(g,34,52,12,P.turmeric,4);circ(g,0,0,30,P.turmeric,4);circ(g,0,0,18,'none',2.4,{stroke:P.gold});circ(g,-8,-4,3,K,0);circ(g,8,-4,3,K,0);ln(g,'M-8 8Q0 14 8 8',K,2.4)}
  else if(k==='bowl'){ell(g,0,6,40,12,P.gold,3.4);shp(g,'M-40 6Q-36 34 0 36Q36 34 40 6Z',Pat.u('vlines',P.ochre,P.terra,.6),3.4);[[-16,0],[0,-8],[16,0]].forEach(([x,y],i)=>circ(g,x,y,10,i===1?P.ivory:P.turmeric,2.2))}
  else if(k==='q'){shp(g,'M-26 -30C-26 -64 30 -66 30 -32C30 -10 6 -6 6 14L-8 14C-8 -12 14 -14 14 -32C14 -46 -12 -46 -12 -30Z',P.turmeric,4);circ(g,-1,34,9,P.turmeric,3.4);
    const d=[];for(let i=0;i<10;i++){const a=i/10*TAU;d.push(`M${f1(Math.cos(a)*66)} ${f1(Math.sin(a)*66)}h.1`)}ln(g,d.join(''),P.verm,8)}
  return g}
/* a motif that pops in at a point and can be moved or swapped */
function motifPart(s,parent,k,x,y,sc){const g=grp(parent);motif(g,k);const o={g,k,x,y,s:0,sc:sc||1,rot:0,update(t){tf(g,this.x,this.y+Math.sin(t*1.2)*3*MV(),Math.max(.001,this.s*this.sc),this.rot);op(g,this.s>.01?1:0)}};s.parts.push(o);return o}
