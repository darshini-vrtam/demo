/* ===== The great churning (ported from the Dhanteras build): Mandara on Kurma, Vasuki in one spiral, devas left, asuras right =====
   Shown in Shot 1.1 while the Narrator recalls the earlier adventure. */
/* ===== Kurma: the divine tortoise. Origin at the base of his shell; the mountain rests at (0,-112) ===== */
function kurma(parent){const g=grp(parent);const glow=grp(g);const gr=[];for(let i=0;i<3;i++){const r=grp(glow);el('ellipse',{cx:0,cy:-40,rx:260+i*60,ry:70+i*22,fill:'none',stroke:K,'stroke-width':9},r);
    el('ellipse',{cx:0,cy:-40,rx:260+i*60,ry:70+i*22,fill:'none',stroke:i%2?P.ivory:P.turmeric,'stroke-width':5,'stroke-dasharray':i%2?'.1 14':'26 10','stroke-linecap':'round'},r);gr.push(r)}
  const body=grp(g);const sk=Pat.u('dots',P.ivory,P.leaf,.8);
  shp(body,'M-140 6C-170 30 -210 38 -228 26C-206 10 -176 2 -150 -2Z',sk,3.6);shp(body,'M-176 -14L-214 -6L-178 4Z',sk,3);
  const head=grp(body);shp(head,'M166 -24C196 -58 250 -48 264 -22C270 -2 244 12 204 8C186 6 172 -6 166 -24Z',sk,4);
  circ(head,236,-28,9,P.ivory,2.6);circ(head,239,-28,4.4,K,0);circ(head,237.5,-30,1.3,P.foam,0);ln(head,'M246 -6Q256 -8 262 -16',K,2.6);circ(head,258,-26,1.6,K,0);
  shp(body,'M140 6C170 32 214 42 236 30C214 12 182 2 150 -2Z',sk,3.6);
  const dome='M-182 0C-172 -82 -100 -114 0 -114C100 -114 172 -82 182 0Z';const cl=clipIn(body,dome);
  shp(body,dome,P.gold,5.5);const pl=grp(body,{'clip-path':cl});
  for(let r=0;r<4;r++)for(let c=-5;c<=5;c++){const x=c*46+(r%2?23:0),y=-18-r*34;const h=`M${x-20} ${y}L${x-10} ${y-16}L${x+10} ${y-16}L${x+20} ${y}L${x+10} ${y+16}L${x-10} ${y+16}Z`;
    shp(pl,h,(r+c)%3===0?P.ochre:P.turmeric,2.6);circ(pl,x,y,3,K,0)}
  ln(body,'M-150 -56Q0 -100 150 -56',K,2);
  circ(body,0,-62,24,P.sea,3.4);circ(body,0,-62,15,'none',4,{stroke:P.gold});circ(body,0,-62,5,P.turmeric,2);
  shp(body,'M-194 0H194Q190 16 172 20H-172Q-190 16 -194 0Z',P.terra,3.6);ln(body,'M-176 10H176',P.ivory,4,{'stroke-dasharray':'.1 12'});
  return{g,glow,gr,body,head,ring:0,breath:0,update(t){tf(this.body,0,0,1,0,1,1+.012*Math.sin(t*1.4)*MV());this.head.setAttribute('transform',`rotate(${f1(Math.sin(t*.7)*2*MV())} 180 -20)`);
    op(this.glow,this.ring);if(this.ring>0)gr.forEach((r,i)=>tf(r,0,0,.9+.1*this.ring+.03*Math.sin(t*1.2-i)*MV()))}}}

/* ===== Vasuki: one continuous patterned rope. Points carry depth (z<0 is behind the mountain) ===== */
function vasuki(back,front,headLayer){const pools={b:[],f:[]};
  const mk=(parent)=>{const g=grp(parent);const a={g,k:ln(g,'',K,36),b:ln(g,'',P.leaf,27),r:ln(g,'',K,27,{'stroke-dasharray':'3 21','stroke-linecap':'butt'}),
    d:ln(g,'',P.turmeric,8,{'stroke-dasharray':'.1 24'}),e:ln(g,'',P.ivory,3,{'stroke-dasharray':'.1 12'})};return a};
  const head=grp(headLayer);const hd=grp(head);
  const hood='M-16 0C-44 -18 -60 -70 -44 -104C-28 -130 28 -130 44 -104C60 -70 44 -18 16 0Z';
  shp(hd,hood,Pat.u('fish',P.turmeric,P.leaf,.75),4.6);ln(hd,'M-30 -24C-46 -60 -40 -96 -22 -112M30 -24C46 -60 40 -96 22 -112',P.turmeric,3);
  circ(hd,0,-80,17,P.turmeric,3);circ(hd,0,-80,9,P.verm,2.4);circ(hd,0,-80,3,P.ivory,0);
  shp(hd,'M-14 -118L-8 -138L0 -124L8 -138L14 -118Z',P.turmeric,2.6);circ(hd,0,-128,2.6,P.verm,0);
  shp(hd,'M-20 -30C-22 -58 22 -58 20 -30C20 -12 -20 -12 -20 -30Z',P.leaf,3.6);
  for(const sd of[-1,1]){circ(hd,sd*9,-40,6.5,P.ivory,2.4);circ(hd,sd*9,-39,3.4,K,0);circ(hd,sd*9-1,-40.5,1,P.foam,0)}
  ln(hd,'M-7 -24Q0 -19 7 -24',K,2.4);circ(hd,-4,-30,1.2,K,0);circ(hd,4,-30,1.2,K,0);
  const tip=shp(front,'M0 -12L-30 0L0 12Z',P.leaf,3.4);
  return{head,hd,flow:0,
    draw(list,o){o=o||{};/* list of [x,y,z]; arc-length window [w0,w1] */const n=list.length;const S=[0];for(let i=1;i<n;i++)S.push(S[i-1]+Math.hypot(list[i][0]-list[i-1][0],list[i][1]-list[i-1][1]));
      const tot=S[n-1];const w0=o.w0||0,w1=o.w1==null?tot:o.w1;const runs=[];let cur=null;
      for(let i=0;i<n;i++){if(S[i]<w0||S[i]>w1){cur=null;continue}const fr=list[i][2]>=0;if(!cur||cur.fr!==fr){const prev=cur;cur={fr,p:[],s0:S[i]};if(prev){cur.p.push(prev.p[prev.p.length-1]);cur.s0=prev.sEnd}runs.push(cur)}
        cur.p.push([list[i][0],list[i][1]]);cur.sEnd=S[i]}
      const used={b:0,f:0};for(const r of runs){if(r.p.length<2)continue;const key=r.fr?'f':'b';let a=pools[key][used[key]];if(!a){a=mk(r.fr?front:back);pools[key].push(a)}used[key]++;
        const d=pts(r.p,false);for(const k of['k','b','r','d','e'])if(a[k]._d!==d){a[k]._d=d;a[k].setAttribute('d',d)}
        const off=f1(this.flow-r.s0);a.r.setAttribute('stroke-dashoffset',off);a.d.setAttribute('stroke-dashoffset',f1(this.flow-r.s0+12));a.e.setAttribute('stroke-dashoffset',f1(this.flow-r.s0+6));show(a.g,true)}
      for(const key of['b','f'])for(let i=used[key];i<pools[key].length;i++)show(pools[key][i].g,false);
      /* tail tip at the window start, head at the window end */
      const at=(s)=>{let i=1;while(i<n-1&&S[i]<s)i++;const t=(s-S[i-1])/((S[i]-S[i-1])||1);return[lerp(list[i-1][0],list[i][0],t),lerp(list[i-1][1],list[i][1],t),Math.atan2(list[i][1]-list[i-1][1],list[i][0]-list[i-1][0])]};
      const a=at(Math.max(w0,0)+.01);tip.setAttribute('transform',`translate(${f1(a[0])} ${f1(a[1])}) rotate(${f1(a[2]/DEG)})`);show(tip,w1-w0>20);
      const e=at(Math.min(w1,tot)-.01);const ang=o.headUp&&w1>=tot-1?(o.sway||0):(e[2]/DEG+90);head.setAttribute('transform',`translate(${f1(e[0])} ${f1(e[1])}) rotate(${f1(ang)}) scale(${f3(o.hs||1)})`);
      show(head,w1>S[1]);return tot}}}

function churnLayout(){return L.portrait?{mx:500,my:930,ms:1,kx:500,ky:1018,ks:.8,horizon:430,
    devas:[[84,1310],[166,1310],[248,1310],[330,1310]],asuras:[[670,1310],[752,1310],[834,1310],[916,1310]],fs:.56,head:[950,1080],tail:[30,1222],hs:.62,
    v0:.16,v1:.66,turns:2,ringY:930,prog:[500,250],med:[190,250],medR:118,water:980}
  :{mx:889,my:566,ms:.86,kx:889,ky:650,ks:.75,horizon:250,
    devas:[[130,716],[230,716],[330,716],[430,716],[530,716]],asuras:[[1238,716],[1338,716],[1438,716],[1538,716],[1638,716]],fs:.72,head:[1712,440],tail:[40,600],hs:.92,
    v0:.14,v1:.62,turns:2,ringY:566,prog:[889,70],med:[210,150],medR:118,water:604}}
function ledge(parent,x0,x1,y,h){const w=x1-x0;let d=`M${x0} ${y+h}Q${x0+w*.04} ${y-8} ${x0+w*.16} ${y}L${x1-w*.16} ${y}Q${x1-w*.04} ${y-8} ${x1} ${y+h}`;
  for(let x=x1;x>x0+1;x-=26)d+=`A13 13 0 0 1 ${f1(Math.max(x0,x-26))} ${y+h}`;d+='Z';const g=grp(parent);shp(g,d,Pat.u('hatch',K,P.leaf,.9),4);ln(g,`M${x0+w*.12} ${y+4}H${x1-w*.12}`,P.ivory,3.4);
  ln(g,`M${x0+w*.1} ${y+h*.55}H${x1-w*.1}`,P.turmeric,4,{'stroke-dasharray':'.1 16'});return g}
function churnComp(s,o){o=o||{};const C={sink:0,rot:0,flow:0,vis:1,wrap:1,hold:{d:1,a:1},kurma:o.kurma==null?1:o.kurma,ringK:0,ringSpin:0,sag:0,sway:0,glim:0,energy:0,
    mIn:1,dK:1,aK:1,crestK:0,ledgeK:1};
  const comp=s.comp;const ringsG=grp(comp);const ledL=grp(comp);const kG=grp(comp);const mWrap=grp(comp);const backL=grp(mWrap);const mG=grp(mWrap);const frontL=grp(mWrap);const crestG=grp(comp);
  const devL=grp(comp),asL=grp(comp);const ropeL=grp(comp);const gripL=gripLayer(comp);const headL=grp(comp);const fxL=grp(comp);
  /* water rings around the mountain */
  const wr=[];for(let i=0;i<4;i++){const r=grp(ringsG);el('ellipse',{rx:240+i*95,ry:46+i*20,fill:'none',stroke:K,'stroke-width':7.5},r);
    const e2=el('ellipse',{rx:240+i*95,ry:46+i*20,fill:'none',stroke:i%2?P.turq:P.foam,'stroke-width':5,'stroke-dasharray':i%2?'40 16':'.1 16','stroke-linecap':'round'},r);wr.push({g:r,e2,i})}
  const K_=kurma(kG);const M=mandara(mG);const V=vasuki(backL,frontL,headL);
  /* the waterline: while the mountain sinks, the part under water is hidden behind a foam crest */
  const clipP=el('path',{d:''},el('clipPath',{id:uid('wl')},comp));const clipU=`url(#${clipP.parentNode.id})`;mWrap.setAttribute('clip-path',clipU);
  const cr=crest(crestG,600,P.foam,7);
  const devas=[],asuras=[];for(let i=0;i<5;i++){devas.push(new Fig('deva',i,devL));asuras.push(new Fig('asura',i,asL))}
  s.cast.devas=devas;s.cast.asuras=asuras;
  const gl=[];for(let i=0;i<9;i++){const g=grp(fxL);star4(g,0,0,10,i%3?P.turmeric:P.ivory);gl.push({g,ph:i*.7,u:(i*.137)%1})}
  Object.assign(C,{devas,asuras,M,K:K_,V,fxL,headL,ropeL,gripL,mG,kG,devL,asL});
  C.layout=function(){this.A=churnLayout();const A=this.A;const n=L.portrait?4:5;
    devas.forEach((f,i)=>{f.vis=i<n;if(i<n){f.x=A.devas[i][0];f.y=A.devas[i][1];f.s=A.fs;f.f=1}});asuras.forEach((f,i)=>{f.vis=i<n;if(i<n){f.x=A.asuras[i][0];f.y=A.asuras[i][1];f.s=A.fs;f.f=-1}});
    ledL.innerHTML='';const d0=A.devas[0][0]-70*A.fs/.72,d1=A.devas[n-1][0]+70*A.fs/.72,a0=A.asuras[0][0]-70*A.fs/.72,a1=A.asuras[n-1][0]+70*A.fs/.72;
    ledge(ledL,d0,d1,A.devas[0][1]-6,L.portrait?60:70);ledge(ledL,a0,a1,A.asuras[0][1]-6,L.portrait?60:70);
    const hw=MANDARA.hw(0)*A.ms+40;clipP.setAttribute('d',`M-4000 -4000H6000V${A.water}H-4000Z M-4000 ${A.water}H${A.mx-hw}V4000H-4000Z M${A.mx+hw} ${A.water}H6000V4000H${A.mx+hw}Z`);tf(cr,A.mx,A.water+4,A.ms*.95)};
  C.layout();
  C.base=function(){const A=this.A;return A.my+this.sink*MANDARA.H*A.ms*.5-(1-this.mIn)*1100};
  C.helix=function(){const A=this.A,ms=A.ms,H=MANDARA.H*ms,base=this.base();const out=[];const N=150;
    for(let i=0;i<=N;i++){const u=i/N;const v=lerp(A.v0,A.v1,u);const th=-Math.PI/2+u*(A.turns+.5)*TAU;const R=MANDARA.hw(v)*ms+18*ms;
      out.push([A.mx+R*Math.sin(th),base-v*H+Math.cos(th)*16*ms,Math.cos(th)])}return out};
  /* rope: tail -> devas' hands -> spiral -> asuras' hands -> head */
  const sp=(a)=>{const o=[];for(let i=0;i<a.length-1;i++){const p0=a[i-1]||a[i],p1=a[i],p2=a[i+1],p3=a[i+2]||p2;for(let j=0;j<8;j++){const t=j/8,t2=t*t,t3=t2*t;
      o.push([.5*((2*p1[0])+(-p0[0]+p2[0])*t+(2*p0[0]-5*p1[0]+4*p2[0]-p3[0])*t2+(-p0[0]+3*p1[0]-3*p2[0]+p3[0])*t3),.5*((2*p1[1])+(-p0[1]+p2[1])*t+(2*p0[1]-5*p1[1]+4*p2[1]-p3[1])*t2+(-p0[1]+3*p1[1]-3*p2[1]+p3[1])*t3),1])}}o.push([a[a.length-1][0],a[a.length-1][1],1]);return o};
  C.path=function(){const A=this.A;const hx=this.helix();const pre=[],post=[];const fs=A.fs;
    const dv=devas.filter(f=>f.vis),as=asuras.filter(f=>f.vis);
    const hold=(f,k)=>{const h=f.hand('f');const rest=[f.x+f.f*34*fs,f.y-46*fs];return[lerp(rest[0],h[0],k),lerp(rest[1],h[1],k)]};
    pre.push([A.tail[0],A.tail[1]+this.sag*30]);dv.forEach(f=>pre.push(hold(f,this.hold.d)));
    const s0=hx[0];const lp=pre[pre.length-1];pre.push([lerp(lp[0],s0[0],.55),lerp(lp[1],s0[1],.6)+this.sag*40]);
    const e0=hx[hx.length-1];as.slice().reverse().forEach(f=>post.push(hold(f,this.hold.a)));
    const mid=[lerp(e0[0],post[0][0],.45),lerp(e0[1],post[0][1],.35)+this.sag*40];
    const hd=[A.head[0],A.head[1]+this.sag*60];const te=post[post.length-1];
    const lead=[[A.tail[0]-1400,A.tail[1]+60],[A.tail[0]-700,A.tail[1]+30]];
    const A1=sp(lead.concat(pre).concat([[s0[0],s0[1]]]));const A2=sp([[e0[0],e0[1]],mid].concat(post).concat([[te[0]+(hd[0]-te[0])*.6,te[1]+10],[hd[0],hd[1]+70*A.hs],hd]));
    let lead_=0;for(let i=1;i<A1.length;i++){lead_+=Math.hypot(A1[i][0]-A1[i-1][0],A1[i][1]-A1[i-1][1]);if(A1[i][0]>=A.tail[0]-1)break}
    return{list:A1.slice(0,-1).concat(hx).concat(A2.slice(1)),lead:lead_}};
  C.update=function(dt,t){const A=this.A;const base=this.base();
    tf(mG,A.mx,base,A.ms);M.rot=this.rot;M.update();op(crestG,this.crestK);
    tf(kG,A.kx,A.ky+(1-this.kurma)*300,A.ks);op(kG,clamp(this.kurma*1.6,0,1));K_.update(t);
    tf(ringsG,A.mx,A.ringY,1);op(ringsG,this.ringK);wr.forEach(r=>{r.e2.setAttribute('stroke-dashoffset',f1(-this.ringSpin*(1+r.i*.3)*60));tf(r.g,0,0,1+.02*Math.sin(t*.8+r.i)*MV())});
    for(const f of devas)f.update(dt,t);for(const f of asuras)f.update(dt,t);
    op(devL,this.dK);op(asL,this.aK);op(ledL,this.ledgeK);
    if(this.vis>0&&this.wrap>0){const P_=this.path();V.flow=this.flow;const n=P_.list.length;const S=[0];for(let i=1;i<n;i++)S.push(S[i-1]+Math.hypot(P_.list[i][0]-P_.list[i-1][0],P_.list[i][1]-P_.list[i-1][1]));
      const len=S[n-1]-P_.lead;const w1=P_.lead+len*this.wrap;const w0=Math.max(0,w1-len);
      V.draw(P_.list,{w0,w1,headUp:true,sway:Math.sin(t*.9)*6*MV()+this.sway,hs:A.hs});
      const gr=[];if(this.wrap>=.999){for(const f of devas.concat(asuras)){const hk=f.kind==='deva'?this.hold.d*this.dK:this.hold.a*this.aK;if(f.vis&&hk>.9){const h=f.hand('f');gr.push([h[0],h[1],A.fs,f.K.sk]);const b=f.hand('b');gr.push([b[0],b[1],A.fs,f.K.sk])}}}
      gripL.draw(gr)}else{V.draw([[-5000,0,1],[-4999,0,1]],{w0:0,w1:0});gripL.draw([])}
    const vk=this.vis*(this.wrap>0?1:0);op(backL,vk);op(frontL,vk);op(headL,vk);
    gl.forEach((g,i)=>{const k=this.glim;op(g.g,k);if(k>0){const x=lerp(A.mx-(L.portrait?380:620),A.mx+(L.portrait?380:620),g.u),y=A.ringY+(L.portrait?70:40)+((i*53)%5)*(L.portrait?40:28);
      tf(g.g,x,y-((t*18+i*40)%60)*this.energy,.6+.4*Math.abs(Math.sin(t*.8+g.ph))*MV())}})};
  s.parts.push(C);return C}
/* set every member of a group to a state */
function groupSet(list,state){list.forEach((f,i)=>{if(f.vis)Timers.add(i*90,()=>f.set(state))})}

function churnScene(o){o=o||{};const s=mkScene(o.id||'churn',{frame:o.frame||'ep'});
  oceanBg(s,{mood:o.mood||'team',seed:11,clouds:o.clouds||[[.12,.62,LP(200,150)],[.88,.5,LP(240,170)],[.5,.2,LP(170,120)]],stars:o.stars});
  const C=churnComp(s,o);s.C=C;s.medL=grp(s.comp);s.fx=fxLayer(s);s.demo=demoHand(s);
  s.onLayout=()=>{C.layout();s.onLayout2&&s.onLayout2()};return s}
/* one churning pull: one group leans back, the rope slides, the mountain turns a little */
async function churnPull(C,side,k){k=k||1;const g=side<0?C.devas:C.asuras;g.forEach(f=>f.vis&&(f.tgt.lean=16,f.tgt.fa=f.tgt.fa+6));AU.sfx('creak');
  D.go(C,{flow:C.flow+side*140*k,rot:C.rot+side*70*k},700,'out');await D.wait(560);g.forEach(f=>f.vis&&f.set('pull'))}
function churnMotor(s){const C=s.C;const m={speed:0,ph:0,base:C.flow,rbase:C.rot,amp:1,update(dt,t){if(this.speed<=0.001)return;this.ph+=dt*this.speed;const side=Math.floor(this.ph)%2?1:-1;
    const w=Math.sin(this.ph*Math.PI);C.flow=this.base+w*130*this.amp;C.rot=this.rbase+w*70*this.amp+this.ph*14;C.ringSpin+=dt*this.speed*.8;
    for(const f of C.devas)if(f.vis&&f.state==='pull'){f.tgt.lean=side<0?15:6}for(const f of C.asuras)if(f.vis&&f.state==='pull'){f.tgt.lean=side>0?15:6}
    if(this._side!==side){this._side=side;if(!AU.muted&&Math.random()<.6)AU.sfx(this.speed>1.2?'drum':'creak')}}};s.parts.push(m);s.motor=m;return m}
