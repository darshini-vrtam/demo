/* ===== The golden lotus: dark lotus-pink outer petals, lighter coral inner petals, fine black lines on each =====
   States: rising (closed), closed with a golden glow pulsing between the petals, opening (outer petals first,
   then the inner petals in sequence), open (a seat for Lakshmi). Origin at the base of the petals. */
function petalD(len,w){return`M0 0C${f1(-w)} ${f1(-len*.3)} ${f1(-w*.8)} ${f1(-len*.82)} 0 ${f1(-len)}C${f1(w*.8)} ${f1(-len*.82)} ${f1(w)} ${f1(-len*.3)} 0 0Z`}
function petalArt(g,len,w,col,line){shp(g,petalD(len,w),col,3.6);ln(g,`M0 ${f1(-len*.08)}V${f1(-len*.86)}`,K,1.8);
  ln(g,`M${f1(-w*.38)} ${f1(-len*.18)}Q${f1(-w*.5)} ${f1(-len*.55)} 0 ${f1(-len*.84)}M${f1(w*.38)} ${f1(-len*.18)}Q${f1(w*.5)} ${f1(-len*.55)} 0 ${f1(-len*.84)}`,line,2.2);
  const d=[];for(let i=1;i<5;i++)d.push(`M${f1(-w*.16)} ${f1(-len*(.2+i*.13))}h.1M${f1(w*.16)} ${f1(-len*(.2+i*.13))}h.1`);ln(g,d.join(''),K,3.4)}
function bigLotus(parent,o){o=o||{};const r=o.r||180;const g=grp(parent);const pad=grp(g),glowG=grp(g),outerL=grp(g),innerL=grp(g),seam=grp(g),pod=grp(g);const front=grp(null);
  shp(pad,`M${-r*1.45} ${r*.1}Q0 ${r*.5} ${r*1.45} ${r*.1}Q${r*.6} ${-r*.2} 0 ${-r*.06}Q${-r*.6} ${-r*.2} ${-r*1.45} ${r*.1}Z`,Pat.u('hatch',K,P.leaf,.9),4);
  ln(pad,`M0 ${r*.04}L${-r*1.2} ${r*.1}M0 ${r*.04}L${r*1.2} ${r*.1}M0 ${r*.04}L${-r*.6} ${r*.3}M0 ${r*.04}L${r*.6} ${r*.3}`,P.turq,3);
  /* flat golden glow: rings and straight rays, behind the flower */
  const gl=grp(glowG);rings(gl,r*.95,{n:3,step:.2,w:6,c1:P.turmeric,c2:P.ivory,dots:20});rays(gl,r*1.0,r*1.3,28,P.turmeric,5);
  const mk=(layer,n,len,w,spread,col,line)=>{const list=[];const order=[];for(let i=0;i<n;i++)order.push(i);const c=(n-1)/2;order.sort((a,b)=>Math.abs(b-c)-Math.abs(a-c));
    order.forEach(i=>{const pg=grp(layer);petalArt(pg,len,w,col,line);list.push({g:pg,u:(i-c)/c,ord:Math.abs(i-c)/c})});return{list,spread}};
  const outer=mk(outerL,8,r,r*.4,84,P.pink,P.coral),inner=mk(innerL,7,r*.86,r*.34,50,P.coral,P.pink);
  /* golden seams between the closed petals */
  for(const x of[-.16,0,.16]){shp(seam,`M${f1(x*r)} ${f1(-r*.1)}C${f1(x*r-6)} ${f1(-r*.4)} ${f1(x*r-4)} ${f1(-r*.8)} ${f1(x*r)} ${f1(-r*.98)}C${f1(x*r+4)} ${f1(-r*.8)} ${f1(x*r+6)} ${f1(-r*.4)} ${f1(x*r)} ${f1(-r*.1)}Z`,P.turmeric,2)}
  rays(seam,r*.02,r*.26,10,P.turmeric,4).setAttribute('transform',`translate(0 ${f1(-r*1.06)})`);
  /* the seed pod that becomes the seat */
  ell(pod,0,-r*.2,r*.5,r*.16,P.turmeric,4);ell(pod,0,-r*.24,r*.36,r*.1,P.gold,2.6);const pd=[];for(let i=-3;i<=3;i++)pd.push(`M${f1(i*r*.09)} ${f1(-r*.24)}h.1`);ln(pod,pd.join(''),K,5);
  /* front petals: drawn over Lakshmi's lap so she sits inside the flower */
  const fr=[];[[-46,.28],[0,.32],[46,.28]].forEach(([a,k])=>{const pg=grp(front);petalArt(pg,r*k,r*.2,a?P.pink:P.coral,a?P.coral:P.pink);fr.push({g:pg,a})});
  const Lt={g,front,r,x:0,y:0,s:1,openO:0,openI:0,glowK:0,pulse:0,sway:1,
    update(t){const m=MV();tf(g,this.x,this.y,this.s);tf(front,this.x,this.y,this.s);const sw=Math.sin(t*.9)*2*m*this.sway*(1-this.openO);
      const place=(L_,k,lift)=>L_.list.forEach(p=>{const kk=clamp(k*1.3-(1-p.ord)*.3,0,1);const e=Ease.io(kk);const a=p.u*lerp(16,L_.spread,e)+sw*(p.u);const sx=lerp(.92,1,e);
        p.g.setAttribute('transform',`rotate(${f1(a)}) scale(${f3(sx)} ${f3(lerp(1,.92+.08*(1-p.ord),e))})`)});
      place(outer,this.openO);place(inner,this.openI);op(innerL,clamp(this.openO*2.4-.4,0,1));
      op(seam,clamp((1-this.openO)*this.glowK*(.65+.35*this.pulse),0,1));
      const gk=clamp(this.glowK,0,1);op(glowG,gk);if(gk>0)glowG.firstChild.setAttribute('transform',`translate(0 ${f1(-r*.5)}) scale(${f3(.7+.3*gk+.04*this.pulse)}) rotate(${f1(t*4*m)})`);
      const pk=Ease.out(clamp(this.openI,0,1));op(pod,pk);tf(pod,0,0,1,0,.6+.4*pk,pk);
      fr.forEach(f=>{f.g.setAttribute('transform',`translate(0 ${f1(-r*.02)}) rotate(${f1(f.a)}) scale(${f3(pk)})`)});op(front,pk>0.02?1:0)}};
  return Lt}
