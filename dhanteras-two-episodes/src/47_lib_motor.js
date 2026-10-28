/* ================= EPISODE 3: LET THE GREAT CHURNING BEGIN! ================= */
/* continuous churning: the groups pull in turn, the rope slides back and forth, the mountain turns */
function churnMotor(s){const C=s.C;const m={speed:0,ph:0,base:C.flow,rbase:C.rot,amp:1,update(dt,t){if(this.speed<=0.001)return;this.ph+=dt*this.speed;const side=Math.floor(this.ph)%2?1:-1;
    const w=Math.sin(this.ph*Math.PI);C.flow=this.base+w*130*this.amp;C.rot=this.rbase+w*70*this.amp+this.ph*14;C.ringSpin+=dt*this.speed*.8;
    for(const f of C.devas)if(f.vis&&f.state==='pull'){f.tgt.lean=side<0?15:6}for(const f of C.asuras)if(f.vis&&f.state==='pull'){f.tgt.lean=side>0?15:6}
    if(this._side!==side){this._side=side;if(!AU.muted&&Math.random()<.6)AU.sfx(this.speed>1.2?'drum':'creak')}}};s.parts.push(m);s.motor=m;return m}
/* the frame's border patterns vibrate a little instead of the camera shaking */
function vibrate(s){s.parts.push({update:(dt,t)=>{const v=s.vib||0;if(v>0)s.frm.setAttribute('transform',`translate(${f1(Math.sin(t*5)*1.6*v)} ${f1(Math.cos(t*4.3)*1.2*v)})`);else s.frm.removeAttribute('transform')}})}
/* fish darting through the churning water */
function dartFish(s){const g=grp(s.C.fxL);const list=[0,1,2,3].map(i=>({...fish(g,i+1),u:i*.27,y:i}));const o={k:0,sp:.12};
  s.parts.push({update:(dt,t)=>{op(g,o.k);if(o.k<=0)return;const W=L.portrait?1000:1778;list.forEach((f,i)=>{f.u+=dt*o.sp*(i%2?1.2:1);const x=-200+((f.u%1)*(W+400));const dir=i%2?-1:1;
    const y=(L.portrait?[1000,1080,1160,1240]:[600,640,690,740])[i]+Math.sin(t*3+i)*10;tf(f.g,dir>0?x:W-x,y,L.portrait?.8:.85,0,dir,1);f.tail.setAttribute('transform',`rotate(${f1(Math.sin(t*9+i)*14)} -22 0)`)})}});return o}



/* the central progress motif: twelve petals, one for each pull or churn */
function progressMotif(s){const g=grp(s.top);const pet=[];circ(g,0,0,64,P.indigo,4);
  for(let i=0;i<12;i++){const a=i*30;const pg=grp(g,{transform:`rotate(${a})`});const p=shp(pg,'M0 -26C-10 -38 -9 -54 0 -62C9 -54 10 -38 0 -26Z',P.ivory,3);pet.push(p)}
  const cen=grp(g);circ(cen,0,0,22,P.turmeric,3);circ(cen,0,0,12,'none',2.4,{stroke:K});circ(cen,0,0,4,P.verm,0);
  const o={n:0,on:0,set(n){this.n=n;pet.forEach((p,i)=>p.setAttribute('fill',i<n?(i%2?P.turmeric:P.verm):P.ivory))}};
  s.parts.push({update:t=>{const p=s.C.A.prog;tf(g,p[0],p[1],(L.portrait?1.25:1)*(.9+.1*o.on),o.n*2);op(g,o.on);cen.setAttribute('transform',`scale(${f3(1+.1*Math.sin(t*2)*(o.n>=12?1:0))})`)}});return o}


