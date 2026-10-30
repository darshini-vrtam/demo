/* ===== Scene kit: a background in stage units, a composition in reference units, a veil, a top layer and the frame ===== */
function mkScene(id,o){o=o||{};const root=grp(null);const camG=grp(root);const bg=grp(camG);const compWrap=grp(camG);
  const s={id,root,cast:{},parts:[],tasks:[],t0:T.sec,cam:{z:1,fx:0,fy:0},
    bg,camG,compWrap,comp:grp(compWrap),veil:grp(root),topWrap:null,top:null,frm:null,
    relayout(){const f=L.fit;this.paintBg&&this.paintBg();tf(this.compWrap,f.x,f.y,f.s);tf(this.topWrap,f.x,f.y,f.s);this.frm.innerHTML='';border(this.frm,L.W,L.Ha,this.frameKind);this.onLayout&&this.onLayout()},
    update(dt,t){const c=this.cam;if(c.z!==1){const [fx,fy]=toStage(c.fx,c.fy);this.camG.setAttribute('transform',`translate(${f1(fx)} ${f1(fy)}) scale(${f3(c.z)}) translate(${f1(-fx)} ${f1(-fy)})`)}else this.camG.removeAttribute('transform');
      for(const p of this.parts)p.update&&p.update(dt,t);this.tick&&this.tick(dt,t)},
    hot(){return this.hots?this.hots():[]},dispose(){}};
  s.topWrap=grp(root);s.top=grp(s.topWrap);s.frm=grp(root);
  s.frameKind=o.frame||'ep';s.P=()=>L.portrait;return s}
/* choose a value for landscape or portrait */
const LP=(l,p)=>L.portrait?p:l;

/* ===== Ocean backdrop used by most scenes (sky, golden horizon, bands of waves) ===== */
function oceanBg(s,o){o=o||{};if(s.seaK==null)s.seaK=1;if(s.swell==null)s.swell=0;s.paintBg=function(){this.bg.innerHTML='';const W=L.W,H=L.Ha;const hy=toStage(0,o.horizon?o.horizon():LP(250,430))[1];
    this.sky=sky(this.bg,W,hy,{seed:o.seed||4,n:o.stars==null?12:o.stars,bg:o.skyBg,clouds:o.clouds||[[.2,.3,LP(220,180)],[.78,.22,LP(260,200)],[.52,.5,LP(160,130)]]});
    horizonBand(this.bg,W,hy,o.hcol);this.sea=ocean(this.bg,W,hy,H,{mood:o.mood||'wonder',n:o.n||5,dens:o.dens||1});if(this.sea2){}
    if(o.after)o.after.call(this,W,H,hy)};
  s.parts.push({update:(dt,t)=>{s.sky&&s.sky.update(t);s.sea&&(s.sea.k=s.seaK==null?1:s.seaK,s.sea.swell=s.swell||0,s.sea.update(t,dt))}})}
