/* ===== The Golden Light: the recurring guide (reusable; Episode 2 builds it the same way) =====
   A small golden orb with a flower-shaped outline, fine black lines inside, six petal rays and a friendly face.
   It keeps the same shape, colours and size (about 7% of the canvas width) in every shot.
   States: float (gentle bob), pulse (expand slightly, then return), spin (brief, when excited),
   travel (leaves a short trail of tiny golden flowers), still (during chants).
   o.variant: 'flower' (Episode 1: flower-shaped orb with six petal rays, the default) or 'flame' (Episode 2's storyboard:
   a pointed diya-flame silhouette with decorative golden dots). Both share the face, glow rings, trail, tilt and every state. */
function goldenLightSize(){const R=L.portrait?REF.p:REF.l;return Math.max(R.w*.07,R.h*.05)/120}
function flowerD(r,n,depth){let d='';for(let i=0;i<=n*4;i++){const a=i/(n*4)*TAU-Math.PI/2;const rr=r*(1-depth*.5+depth*.5*Math.cos(a*n));d+=(i?'L':'M')+f1(Math.cos(a)*rr)+' '+f1(Math.sin(a)*rr)}return d+'Z'}
function tinyFlower(parent,r,col){const g=grp(parent);for(let k=0;k<5;k++){const p=grp(g,{transform:`rotate(${k*72})`});shp(p,`M0 0Q${r*.45} ${-r*.55} 0 ${-r}Q${-r*.45} ${-r*.55} 0 0Z`,col||P.turmeric,1.6)}circ(g,0,0,r*.28,P.verm,1.2);return g}
function goldenLight(parent,o){o=o||{};const g=grp(parent);const trailL=grp(g);const me=grp(g);
  /* flat glow rings behind it; their size grows as the episode goes on */
  const glow=grp(me);rings(glow,74,{n:2,step:.2,w:4,c1:P.turmeric,c2:P.ivory});circ(glow,0,0,90,'none',3,{stroke:P.turmeric,'stroke-dasharray':'.1 13','stroke-width':6,'stroke-linecap':'round'});
  /* the floral pattern it can unfold into (Shot 3.3, Shot 4.3) */
  const bloom=grp(me);const bl=[];for(let ring=0;ring<3;ring++){const rg=grp(bloom);const n=8+ring*4,R=120+ring*62;
    for(let i=0;i<n;i++){const a=(i+(ring%2)*.5)/n*360;const p=grp(rg,{transform:`rotate(${f1(a)}) translate(0 ${-R})`});shp(p,'M0 22C-16 8 -14 -14 0 -26C14 -14 16 8 0 22Z',ring%2?P.gold:P.turmeric,2.8);ln(p,'M0 14V-16',K,1.4)}
    circ(rg,0,0,R-34,'none',3,{stroke:P.turmeric,'stroke-dasharray':'.1 12','stroke-width':6,'stroke-linecap':'round'});bl.push(rg)}
  const flame=o.variant==='flame';const spinG=grp(me);const dotsG=grp(me);
  if(flame){/* a ring of small flame motifs as the glow, decorative dots, then the pointed flame body */
    for(let i=0;i<10;i++){const p=grp(glow,{transform:`rotate(${i*36}) translate(0 -104)`});shp(p,'M0 -14C-7 -4 -7 4 0 8C7 4 7 -4 0 -14Z',P.turmeric,2.2)}
    for(let i=0;i<8;i++){const a=i/8*TAU;circ(dotsG,Math.cos(a)*74,Math.sin(a)*74+4,4.2,P.turmeric,1.6)}
    shp(spinG,'M0 -96C-20 -66 -54 -36 -54 6C-54 38 -30 56 0 56C30 56 54 38 54 6C54 -36 20 -66 0 -96Z',P.turmeric,4.4);
    shp(spinG,'M0 -70C-12 -50 -36 -28 -36 6C-36 28 -20 42 0 42C20 42 36 28 36 6C36 -28 12 -50 0 -70Z','none',2.2,{stroke:P.gold})}
  else for(let i=0;i<6;i++){const p=grp(spinG,{transform:`rotate(${i*60})`});shp(p,'M0 -48C-13 -58 -12 -76 0 -88C12 -76 13 -58 0 -48Z',P.turmeric,3.4);ln(p,'M0 -56V-80',P.gold,2.6)}
  if(!flame)shp(spinG,flowerD(54,12,.16),P.turmeric,4);
  const inner=grp(me);if(!flame){circ(inner,0,0,40,P.turmeric,2.4,{stroke:P.gold});
  ln(inner,(()=>{let d='';for(let i=0;i<24;i++){const a=i/24*TAU;d+=`M${f1(Math.cos(a)*42)} ${f1(Math.sin(a)*42)}L${f1(Math.cos(a)*48)} ${f1(Math.sin(a)*48)}`}return d})(),K,1.4);
  ln(inner,'M-26 -22Q-30 -6 -24 8M26 -22Q30 -6 24 8',K,1.3)}
  const face=grp(me);const eyes=grp(face);circ(eyes,-12,-6,4.6,K,0);circ(eyes,12,-6,4.6,K,0);circ(eyes,-13.4,-7.6,1.4,P.foam,0);circ(eyes,10.6,-7.6,1.4,P.foam,0);
  ln(face,'M-11 9Q0 18 11 9',K,3.2);circ(face,-21,6,4,P.coral,0);circ(face,21,6,4,P.coral,0);
  const sparks=grp(me);const spk=[];for(let i=0;i<8;i++){const q=grp(sparks);star4(q,0,0,12,i%2?P.turmeric:P.ivory);spk.push(q)}
  const pool=[];
  const G={g,me,x:o.x||0,y:o.y||0,s:1,size:1,state:'float',glowK:o.glow==null?.5:o.glow,bloomK:0,look:0,vis:true,
    pk:0,spinA:0,lastPulse:-9,tilt:0,variant:flame?'flame':'flower',_lx:null,_ly:null,lastDrop:0,
    set(st){this.state=st},
    /* two-stage pulse: expand slightly, then return. Never more often than once a second */
    pulse(){if(T.sec-this.lastPulse<1.05)return;this.lastPulse=T.sec;const o2=this;tw(o2,{pk:1},380,'out').then(()=>tw(o2,{pk:0},520,'io')).catch(()=>{})},
    spin(){if(flame){this.sparkle();return}AU.sfx('sparkle');const a0=this.spinA;tw(this,{spinA:a0+360},1300,'io').catch(()=>{})},
    /* sparkling with excitement: tiny flat stars burst outward and a little hop */
    sparkle(){AU.sfx('sparkle');this.spark=1;tw(this,{spark:0},900,'out').catch(()=>{});this.pulse()},spark:0,
    /* travel along a list of points, leaving tiny flowers behind */
    async travel(pts_,ms,ease){const was=this.state;this.state='travel';try{for(const p of pts_)await D.tw(this,{x:p[0],y:p[1]},(ms||1800)/pts_.length,ease||'io')}finally{this.state=was==='travel'?'float':was}},
    drop(x,y){let f=pool.find(q=>!q.live);if(!f){const fg=grp(trailL);tinyFlower(fg,12,pool.length%2?P.turmeric:P.gold);f={g:fg,live:false};pool.push(f)}
      f.live=true;f.x=x;f.y=y;f.t0=T.sec;f.rot=Math.random()*90},
    update(dt,t){const m=MV();const sz=goldenLightSize()*this.size;const bob=this.state==='float'||this.state==='travel'?Math.sin(t*TAU/3)*7*m:0;
      tf(g,0,0,1);tf(me,this.x,this.y+bob,sz*this.s*(1+.12*this.pk),this.tilt);show(g,this.vis);
      if(flame){tf(spinG,0,0,1,Math.sin(t*.9)*2*m*(this.state==='still'?0:1));tf(dotsG,0,0,1,t*10*m);tf(sparks,0,0,1);op(sparks,this.spark>0?1:0);if(this.spark>0)spk.forEach((q,i)=>tf(q,Math.cos(i/8*TAU)*(70+90*(1-this.spark)),Math.sin(i/8*TAU)*(70+90*(1-this.spark)),this.spark))}
      else tf(spinG,0,0,1,this.spinA+(this.state==='still'?0:Math.sin(t*.6)*4*m));
      tf(glow,0,0,.7+.5*this.glowK+.03*Math.sin(t*TAU/3)*m);op(glow,clamp(this.glowK*1.4,0,1));
      op(bloom,this.bloomK>0.01?1:0);if(this.bloomK>0.01){bl.forEach((r,i)=>tf(r,0,0,clamp(this.bloomK*1.6-i*.3,0,1),(i%2?-1:1)*t*4*m))}
      tf(eyes,this.look*5,0,1);
      if(this._lx!=null){const v=Math.hypot(this.x-this._lx,this.y-this._ly)/Math.max(dt,.001);if(this.vis&&v>40&&t-this.lastDrop>.11){this.lastDrop=t;this.drop(this._lx,this._ly+bob)}}
      this._lx=this.x;this._ly=this.y;
      for(const f of pool){if(!f.live){show(f.g,false);continue}const k=(t-f.t0)/1.3;if(k>=1){f.live=false;show(f.g,false);continue}show(f.g,true);tf(f.g,f.x,f.y+k*16,sz*.9*(1-k),f.rot+k*60)}}};
  return G}
