/* ===== Scene kit: a background in stage units, a composition in reference units, a top layer and the frame ===== */
function mkScene(id,o){o=o||{};const root=grp(null);const camG=grp(root);const bg=grp(camG);const compWrap=grp(camG);
  const s={id,root,cast:{},parts:[],t0:T.sec,cam:{z:1,fx:0,fy:0,dx:0,dy:0},
    bg,camG,compWrap,comp:grp(compWrap),topWrap:null,top:null,frm:null,frame:null,
    relayout(){const f=L.fit;this.paintBg&&this.paintBg();this.layout&&this.layout();tf(this.compWrap,f.x,f.y,f.s);tf(this.topWrap,f.x,f.y,f.s);this.frm.innerHTML='';
      this.frame=border(this.frm,L.W,L.Ha,this.frameKind);this.frame.bloom(this.bloomK||0);this.onLayout&&this.onLayout()},
    update(dt,t){const c=this.cam;if(c.z!==1||c.dx||c.dy){const [fx,fy]=toStage(c.fx,c.fy);const [dx,dy]=[c.dx*L.fit.s,c.dy*L.fit.s];
        this.camG.setAttribute('transform',`translate(${f1(fx+dx)} ${f1(fy+dy)}) scale(${f3(c.z)}) translate(${f1(-fx)} ${f1(-fy)})`)}else this.camG.removeAttribute('transform');
      for(const p of this.parts)p.update&&p.update(dt,t);this.tick&&this.tick(dt,t)},
    bloom(k){this.bloomK=k;this.frame&&this.frame.bloom(k)},
    hot(){return this.hots?this.hots():[]},dispose(){}};
  s.topWrap=grp(root);s.top=grp(s.topWrap);s.frm=grp(root);
  s.frameKind=o.frame||'lotus';return s}
/* choose a value for landscape or portrait */
const LP=(l,p)=>L.portrait?p:l;
/* add an updatable thing to a scene and return it */
function part(s,o){s.parts.push(o);return o}
/* a figure placed in a scene: registered as a part so it animates */
function castFront(s,cfg,layer){return part(s,new FrontFig(cfg,layer||s.comp))}
function cast(s,key,cfg,layer,o){const f=new Fig(cfg,layer||s.comp,o);part(s,f);if(key){if(s.cast[key]){s.cast[key]=[].concat(s.cast[key],f)}else s.cast[key]=f}return f}

/* ===== Small effects in the top layer: ripples, bursts (petals, sparkles, leaves), dotted trails ===== */
function fxLayer(s){const g=grp(s.top);const list=[];const F={g,list,
  ripple(x,y,r,col,ms){const e=circ(g,x,y,10,'none',6,{stroke:col||P.turmeric});const o={k:0};list.push({e,o,kind:'ripple',x,y,r:r||120});tw(o,{k:1},ms||1300,'out').then(()=>{e.remove();list.splice(list.findIndex(l=>l.e===e),1)})},
  burst(x,y,n,kind,spread){for(let i=0;i<(n||6);i++){const a=-Math.PI/2+(Math.random()-.5)*(spread||1.6);const d=60+Math.random()*90;const e=grp(g);
      if(kind==='petal'){shp(e,'M0 0Q6 -8 0 -16Q-6 -8 0 0Z',i%2?P.verm:P.marigold,2)}else if(kind==='flame'){shp(e,'M0 0C-10 -8 -8 -22 0 -34C8 -22 10 -8 0 0Z',[P.verm,P.marigold,P.turmeric][i%3],2.4)}else if(kind==='leaf'){shp(e,leafD(26,8),i%2?P.leaf:P.forest,2)}else{star4(e,0,0,10,i%2?P.turmeric:P.ivory)}
      const o={k:0};list.push({e,o,kind:'b',x,y,dx:Math.cos(a)*d,dy:Math.sin(a)*d,rot:Math.random()*360});tw(o,{k:1},900+Math.random()*500,'out').then(()=>{e.remove();list.splice(list.findIndex(l=>l.e===e),1)})}},
  /* a short trail of decorative dots drawn from a to b */
  trail(a,b,col,keep){const d=`M${f1(a[0])} ${f1(a[1])}Q${f1((a[0]+b[0])/2)} ${f1(Math.min(a[1],b[1])-60)} ${f1(b[0])} ${f1(b[1])}`;const e=grp(g);const p=ln(e,d,K,10,{'stroke-dasharray':'.1 22'});const q=ln(e,d,col||P.turmeric,6,{'stroke-dasharray':'.1 22'});
    let len=400;try{len=p.getTotalLength()||400}catch(_){}const m=el('mask',{id:uid('m')},e);const mp=ln(m,d,'#fff',16,{'stroke-dasharray':`${len} ${len}`,'stroke-dashoffset':len});
    p.setAttribute('mask',`url(#${m.id})`);q.setAttribute('mask',`url(#${m.id})`);const o={k:0};list.push({e,o,kind:'trail',mp,len});tw(o,{k:1},900,'io').then(()=>{if(!keep)Timers.add(2200,()=>{tw(o,{k:2},700).then(()=>{e.remove();list.splice(list.findIndex(l=>l.e===e),1)})})});return e},
  update(){for(const l of list){const k=l.o.k;if(l.kind==='ripple'){l.e.setAttribute('r',f1(10+l.r*k));l.e.setAttribute('stroke-width',f1(7*(1-k)+1));op(l.e,1-k*k)}
    else if(l.kind==='trail'){l.mp.setAttribute('stroke-dashoffset',f1(l.len*(1-Math.min(1,k))));op(l.e,k>1?2-k:1)}
    else{tf(l.e,l.x+l.dx*k,l.y+l.dy*k,1-.3*k,l.rot*k);op(l.e,1-k*k)}}}};s.parts.push(F);return F}
/* the demonstration hand shows the gesture (taps, drags) */
function demoHand(s){const h=handIcon(s.top);s.parts.push({update:()=>h.update()});const D_={h,busy:false,
  async tap(x,y,n){if(this.busy)return;this.busy=true;try{h.x=x+40;h.y=y+40;h.on=0;await D.tw(h,{on:1},300);for(let i=0;i<(n||2);i++){await D.tw(h,{x,y,press:1},350);await D.tw(h,{press:0},250)}await D.tw(h,{on:0},300)}catch(e){}finally{this.busy=false}},
  async drag(path,ms,rep){if(this.busy)return;this.busy=true;try{h.x=path[0][0];h.y=path[0][1];await D.tw(h,{on:1},300);for(let r=0;r<(rep||1);r++)for(let i=1;i<path.length;i++){h.press=1;await D.tw(h,{x:path[i][0],y:path[i][1]},(ms||900)/(path.length-1),'io')}
    h.press=0;await D.tw(h,{on:0},300)}catch(e){}finally{this.busy=false}}};return D_}
/* drifting petals (atmosphere layer): n petals falling slowly through a box */
function petalDrift(parent,n,box,o){o=o||{};const g=grp(parent);const r=rng(o.seed||21);const ps=[];for(let i=0;i<n;i++){const e=grp(g);
    if(o.kind==='leaf')shp(e,leafD(22,7),i%2?P.leaf:P.forest,2);else if(o.kind==='flower'){if(i%3===2)marigold(e,10,P.marigold);else flower(e,9,[P.verm,P.ivory,P.marigold][i%3],P.turmeric)}else shp(e,'M0 0Q7 -9 0 -18Q-7 -9 0 0Z',[P.verm,P.marigold,P.turmeric,P.ivory][i%4],2);ps.push({e,x:r(),y:r(),sp:.04+r()*.05,ph:r()*TAU})}
  return{g,ps,k:1,update(t,dt){op(g,this.k);if(this.k<=0)return;const m=MV();ps.forEach(p=>{p.y=(p.y+dt*p.sp*m*(o.rise?-1:1)+1)%1;const x=box[0]+(p.x+Math.sin(t*.4+p.ph)*.03)*box[2],y=box[1]+p.y*box[3];tf(p.e,x,y,1,Math.sin(t*.7+p.ph)*60+t*20*(o.spin||0))})},
    _u:null}}
function drift(s,n,box,o){const d=petalDrift(s.top,n,box,o);s.parts.push({update:(dt,t)=>d.update(t,dt)});return d}

/* ===== Transitions: patterned covers drawn above the scenes in stage units. cover() resolves when the frame is covered ===== */
const Trans={g:null,
  init(){this.g=grp(svg)},
  async run(kind,swap,o){o=o||{};const tok=D.token;const g=grp(this.g);const W=L.W,H=L.Ha;const k={v:0};let upd;
    if(D.fast){g.remove();if(swap)await swap();return}
    if(kind==='vines'){const n=8;const strands=[];for(let i=0;i<n;i++){const vs=vineStrand(g,W*.62,i%2?P.leaf:P.forest);const left=i%2===0;const y=(i+.5)/n*H;strands.push({vs,left,y})}
      const fill=rect(g,0,0,W,H,Pat.u('leafy',P.leaf,P.forest,1.6),0);g.insertBefore(fill,g.firstChild);
      upd=()=>{const v=k.v;op(fill,clamp(v*1.5-.5,0,1));strands.forEach(st=>{const x=st.left?-W*.62+W*.9*v:W*1.62-W*.9*v-W*.62;tf(st.vs.g,st.left?x:x+W*.62,st.y,1,0,st.left?1:-1)})}}
    else if(kind==='iris'){const [cx,cy]=o.at?toStage(o.at[0],o.at[1]):[W/2,H/2];const R=Math.hypot(W,H);const c=grp(g);const disc=circ(c,0,0,1,Pat.u(o.pat||'wave',o.a||P.ivory,o.b||P.ocean,.8),0);
      const rim=grp(c);rings(rim,1,{n:1});const rr=circ(c,0,0,1,'none',14,{stroke:K});const rr2=circ(c,0,0,1,'none',7,{stroke:P.gold});
      upd=()=>{const r=Math.max(1,k.v*R);[disc,rr,rr2].forEach(e=>{e.setAttribute('cx',f1(cx));e.setAttribute('cy',f1(cy));e.setAttribute('r',f1(r))})}}
    else if(kind==='gate'){const pl=[-1,1].map(sx=>{const e=grp(g);rect(e,0,0,W/2+4,H,Pat.u('flower',P.gold,P.maroon,1.4),5);rect(e,18,18,W/2-32,H-36,'none',4,{stroke:P.gold});
        for(let j=0;j<4;j++)circ(e,W/4,H*(.2+j*.2),20,P.turmeric,3);return{e,sx}});
      upd=()=>{pl.forEach(p=>tf(p.e,p.sx<0?-W/2+W/2*k.v:W-W/2*k.v,0,1))}}
    else if(kind==='petals'||kind==='dust'){const n=90;const r=rng(5);const ps=[];for(let i=0;i<n;i++){const e=grp(g);if(kind==='dust')dustCurl(e,70,i%2?P.gold:P.turmeric);else{shp(e,'M0 0Q12 -16 0 -32Q-12 -16 0 0Z',[P.verm,P.marigold,P.turmeric,P.ivory][i%4],2.4)}
        ps.push({e,x:r()*W,y:r()*H,ph:r()*TAU})}const fill=rect(g,0,0,W,H,kind==='dust'?Pat.u('fdots',P.gold,P.turmeric,1.4):Pat.u('petals',P.verm,P.ivory,1.4),0);g.insertBefore(fill,g.firstChild);
      upd=()=>{op(fill,clamp(k.v*1.6-.6,0,1));ps.forEach(p=>{const d=(1-k.v)*H*(kind==='dust'?-1:1);tf(p.e,p.x+Math.sin(p.ph+k.v*3)*30,p.y-d*.8,1.2,p.ph*60+k.v*90);op(p.e,clamp(k.v*2,0,1))})}}
    else{const fill=grp(g);rect(fill,-60,0,W+120,H,Pat.u(o.pat||'flower',o.a||P.gold,o.b||P.indigo,1.3),0);ln(fill,`M-60 0V${H}M${W+60} 0V${H}`,K,10);
      upd=()=>tf(fill,k.phase?(W+120)*(1-k.v):-(W+120)*(1-k.v),0,1)}
    const loop=setInterval(()=>{try{upd()}catch(e){}},16);upd();
    try{await tw(k,{v:1},o.ms||1100,'io');if(swap)await swap();await new Promise(r=>setTimeout(r,90));k.phase=1;
      await tw(k,{v:0},o.ms||1100,'io')}finally{clearInterval(loop);g.remove()}}};
