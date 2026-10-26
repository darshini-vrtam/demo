/* ===== ENV_COSMIC_OCEAN: one persistent world so every shot keeps continuity ===== */
const MOODS={
  night:{moon:1,sky:C.indigo,sky2:C.deep,mot:C.turmeric,stars:1,clouds:0,bands:[[C.peacock,C.turq,C.turmeric],[C.indigo,C.peacock,C.pink],[C.turq,C.cream,C.pink],[C.deep,C.peacock,C.turmeric]],frame:[C.peacock,C.turmeric]},
  hidden:{moon:1,sky:C.deep,sky2:C.indigo,mot:C.gold,stars:1,clouds:0,bands:[[C.peacock,C.turq,C.gold],[C.deep,C.peacock,C.gold],[C.peacock,C.turq,C.gold],[C.deep,C.indigo,C.gold]],frame:[C.deep,C.gold]},
  bright:{moon:1,sky:C.indigo,sky2:C.peacock,mot:C.turmeric,stars:1,clouds:0,bands:[[C.turq,C.cream,C.turmeric],[C.peacock,C.turq,C.pink],[C.turq,C.cream,C.turmeric],[C.peacock,C.turq,C.turmeric]],frame:[C.peacock,C.turmeric]},
  day:{moon:0,sky:C.cream,sky2:C.turq,mot:C.cream,stars:0,clouds:1,bands:[[C.peacock,C.turq,C.turmeric],[C.deep,C.peacock,C.turmeric],[C.peacock,C.turq,C.coral],[C.deep,C.peacock,C.turmeric]],frame:[C.ochre,C.cream]},
  churn:{moon:1,sky:C.deep,sky2:C.indigo,mot:C.turmeric,stars:1,clouds:0,bands:[[C.peacock,C.turq,C.turmeric],[C.deep,C.verm,C.turmeric],[C.peacock,C.leaf,C.turmeric],[C.deep,C.turq,C.verm]],frame:[C.verm,C.turmeric]},
  dark:{moon:0,sky:C.charcoal,sky2:C.indigo,mot:C.violet,stars:0,clouds:0,bands:[[C.indigo,C.violet,C.charcoal],[C.charcoal,C.violet,C.indigo],[C.indigo,C.violet,C.cream],[C.charcoal,C.indigo,C.violet]],frame:[C.charcoal,C.violet]},
  treasure:{moon:0,sky:C.saffron,sky2:C.coral,mot:C.cream,stars:0,clouds:1,bands:[[C.turq,C.cream,C.coral],[C.emerald,C.turq,C.saffron],[C.turq,C.cream,C.coral],[C.peacock,C.emerald,C.saffron]],frame:[C.emerald,C.saffron]},
  gold:{moon:0,sky:C.cream,sky2:C.turmeric,mot:C.red,stars:0,clouds:1,bands:[[C.turq,C.white,C.gold],[C.peacock,C.turq,C.red],[C.turq,C.white,C.gold],[C.deep,C.turq,C.gold]],frame:[C.red,C.gold]},
  festive:{moon:0,sky:C.turmeric,sky2:C.saffron,mot:C.verm,stars:0,clouds:1,bands:[[C.turq,C.cream,C.diya],[C.leaf,C.turmeric,C.verm],[C.turq,C.cream,C.diya],[C.emerald,C.leaf,C.turmeric]],frame:[C.verm,C.turmeric]}};
const World={id:'world',mA:'night',mB:'night',mk:1,
  make(){const W=this;W.devas=SP_DEVAS.map(sp=>new Fig(sp,{f:1}));W.asuras=SP_ASURAS.map(sp=>new Fig(sp,{f:-1}));
    W.vishnu=new Fig(SP_VISHNU,{vis:0});W.shiva=new Fig(SP_SHIVA,{vis:0,throat:0});W.lakshmi=new Fig(SP_LAKSHMI,{vis:0,bob:3});W.dhan=new Fig(SP_DHAN,{vis:0});
    W.dhan.over=(ctx,f)=>{const p=W.potLocal;drawPot(ctx,p[0],p[1],1.05,W.potPulse,T.sec)};W.potLocal=[0,-190];
    const r=rng(5);W.fish=Array.from({length:9},(_,i)=>({u:r(),band:1+(i%3),ph:r()*9,sp:.25+r()*.25,rg:.04+r()*.05,s:.55+r()*.4,col:[[C.coral,C.turmeric],[C.turmeric,C.verm],[C.pink,C.peacock],[C.saffron,C.indigo]][i%4]}));
    W.lotus=Array.from({length:6},(_,i)=>({u:[.06,.22,.36,.64,.79,.94][i],band:i%2?2:1,ph:r()*9,s:.5+r()*.35}));
    W.stars=Array.from({length:34},()=>({u:r(),v:r(),s:.4+r()*.5,ph:r()*9}));W.cloudsP=Array.from({length:5},(_,i)=>({u:[.12,.32,.55,.74,.9][i],v:.25+r()*.35,s:.6+r()*.4}));
    W.peeks=[{u:.2},{u:.47},{u:.71},{u:.88}];W.lights=[];W.prev=[];W.bursts=[];this.reset()},
  reset(){Object.assign(this,{amp:1,spd:1,bob:1,part:0,pan:0,frameK:1,starsK:1,moonK:1,bandK:[1,1,1,1],
    mt:{vis:0,y:0,rot:0,outline:0,solid:1},kurma:{vis:0,y:0},vs:{vis:0,wrap:0,pull:0,d0:0,sway:0,rest:0},gIn:0,gOut:0,gVis:0,pull:0,lean:0,
    ripple:0,swirl:0,swirlA:0,peekK:0,glint:-1,fishEdge:0,fishLook:0,lotusOpen:1,hala:0,halaC:0,halaRise:0,halaX:0,halaY:0,storm:0,
    bud:{vis:0,open:0},shellK:0,conch:{y:1,vis:0},jewel:{y:1,vis:0},medal:{y:1,vis:0},lbud:{vis:0,open:0,y:1},floral:0,goldC:0,dhanRise:0,potPulse:0,
    gifts:{leaf:0,heart:0,diya:0},giftVis:0,giftHL:{leaf:0,heart:0,diya:0},festive:0,giftPos:null,refrain:0,petals:0,stormK:0,lifeK:1,arrows:null,waveOut:[],beingsK:0,autoChurn:0,shivaX:1,shivaZoom:0,vsFlow:0,storm:0,extra:null,giftScale:null,g4:null});
    this.lights=[];this.prev=[];this.bursts=[];this.vishnu.vis=0;this.shiva.vis=0;this.shiva.throat=0;this.lakshmi.vis=0;this.dhan.vis=0;
    [...this.devas,...this.asuras].forEach(f=>{f.pose('stand',true);f.expr='calm';f.lean=0})},
  mood(m,ms){const cur=this.mB;if(this.mk<1){this.mA=this.curMix()}else this.mA=cur;this.mB=m;this.mk=0;if(this.tween)this.tween.stop=true;
    const o={k:0};this.tween=o;if(D.fast||!ms){this.mk=1;this.mA=m;return Promise.resolve()}return tw(o,{k:1},ms||1600).then(()=>{if(this.tween===o)this.mk=1});},
  curMix(){return this.mB},
  col(path){const a=MOODS[this.mA],b=MOODS[this.mB],k=this.tween&&this.mk<1?this.tween.k:1;const get=(m)=>path.reduce((o,p)=>o[p],m);const va=get(a),vb=get(b);
    return typeof va==='number'?lerp(va,vb,k):mixHex(va,vb,k)},
  /* anchors, recomposed for landscape and portrait */
  lay(){const W=L.W,H=L.H,P=L.portrait;const cx=W/2;const o={cx,W,H,P};
    if(!P){o.hz=H*.4;o.mb=H*.66;o.mw=Math.min(W*.23,450);o.mh=H*.43;o.feet=H*.8;o.gs=1;o.gap=[155,270,385];o.moon=[W*.12,H*.24]}
    else{o.hz=H*.27;o.mb=H*.53;o.mw=W*.44;o.mh=Math.min(H*.3,W*.62);o.feet=o.mb+Math.min(H*.12,300);o.gs=.8;o.gap=[0,0,0];o.moon=[W*.8,H*.15]}
    o.ks=o.mw*(o.P?1.02:1.15)/340;o.kfront=o.P;o.rim=o.mb+88*o.ks;o.bands=[o.hz,lerp(o.hz,o.mb,.55),o.mb-14,o.feet-6];
    o.shiva={x:P?cx+170:cx+o.mw*.66,y:P?o.feet+190:o.feet+44,s:(P?1.05:1.18)*(1+this.shivaZoom*.22)};
    o.dhan={x:cx,y:P?o.mb+150:o.mb+150,s:P?1.35:1.4};
    o.lak={x:cx,y:P?o.mb+40:o.mb+30,s:P?.95:.95};
    o.vishnu={x:P?cx-W*.27:cx-o.mw*1.0,y:P?o.hz+40:o.hz+10,s:P?.62:.7};
    o.gifts=P?{leaf:[W*.17,o.mb-330],heart:[W*.83,o.mb-330],diya:[cx,o.mb+150-1.35*480]}:{leaf:[cx-o.mw*.9,o.hz+30],heart:[cx+o.mw*.9,o.hz+30],diya:[cx,Math.max(L.top()+70,o.mb+150-1.4*470)]};
    return o},
  /* place group members: devas left facing right, asuras right facing left */
  placeGroups(o){const step=(1-this.gIn)*(o.W*.45),out=this.gOut*(o.P?70:170);
    const px=o.P?[o.W*.3,o.W*.19,o.W*.08]:null;
    this.devas.forEach((f,i)=>{f.x=(o.P?px[i]:o.cx-o.mw*.5-o.gap[i]*o.gs)-step-out;f.y=o.feet+(i%2?-12:6)*o.gs;f.s=o.gs*(i===1?.97:1);f.vis=this.gVis});
    this.asuras.forEach((f,i)=>{f.x=(o.P?o.W-px[i]:o.cx+o.mw*.5+o.gap[i]*o.gs)+step+out;f.y=o.feet+(i%2?-12:6)*o.gs;f.s=o.gs*(i===1?.97:1);f.vis=this.gVis});
    const pl=this.pull;this.devas.forEach(f=>f.lean=this.lean*(-.05-Math.max(0,-pl)*.13));this.asuras.forEach(f=>f.lean=this.lean*(-.05-Math.max(0,pl)*.13))},
  /* Vasuki's spine: tail through the devas' hands, a zigzag coil round Mandara, out through the asuras' hands to the head */
  spine(o){const mtY=o.mb+this.mt.y,hw=y=>{const t=clamp((mtY-y)/o.mh,0,1);for(let i=0;i<8;i++){const a=MANDARA_PTS[i],b=MANDARA_PTS[i+1];if(-b[1]>=t){const k=(t+a[1])/((-b[1])-(-a[1])||1);return o.mw*Math.abs(lerp(a[0],b[0],clamp(k,0,1)))}}return 0};
    const sx=this.pull*14,P=o.P;const rs=ease(clamp(this.vs.rest,0,1)),rest=h=>[h[0],lerp(h[1],o.feet-(P?20:26),rs)];const dH=this.devas.map(f=>rest(f.hand(1))).reverse(),aH=this.asuras.map(f=>rest(f.hand(1)));
    /* three crossings: front (left to right), back (hidden), front; each bows like a rope wrapped round a cone */
    const dy=o.mh*.075,y0=mtY-o.mh*.05,sag=o.mh*.045,pts=[],flag=[];const add=(p,b)=>{pts.push(p);flag.push(b)};
    const tail0=[dH[0][0]-(P?40:70),dH[0][1]+(P?6:10)];add(tail0,false);dH.forEach(h=>add(h,false));
    for(let c=0;c<3;c++){const yA=y0-c*dy,yB=y0-(c+1)*dy,back=c===1;for(let k=0;k<=10;k++){const t=k/10,y=lerp(yA,yB,t)+(back?-1:1)*sag*Math.sin(Math.PI*t);const r=hw(y)+(o.P?10:14);
      const x=o.cx+sx+(back?Math.cos(Math.PI*t):-Math.cos(Math.PI*t))*r;add([x,y],back&&k>0)}}
    aH.forEach(h=>add(h,false));const ah=aH[aH.length-1];const head=[ah[0]+(P?34:70),ah[1]-(P?40:30)];add(head,false);
    /* uncoiled: a wide curve lying on the water in front of the mountain */
    const n=pts.length;const un=pts.map((_,i)=>{const t=i/(n-1);return[lerp(o.cx-o.mw*1.9,o.cx+o.mw*1.9,t),o.mb+30+Math.sin(t*Math.PI)*40+Math.sin(t*Math.PI*3)*24]});
    const w=ease(clamp(this.vs.wrap,0,1));const out=pts.map((p,i)=>[lerp(un[i][0],p[0],w),lerp(un[i][1],p[1],w)]);
    return{pts:out,flag:flag.map(f=>f&&w>.55),headAng:Math.atan2(head[1]-ah[1],head[0]-ah[0])}},
  /* fine resample a polyline for smooth drawing */
  resample(pts,step){const out=[pts[0]];for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i],d=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.max(1,Math.ceil(d/step));for(let k=1;k<=n;k++)out.push([lerp(a[0],b[0],k/n),lerp(a[1],b[1],k/n)])}return out},
  smooth(pts){let p=pts;for(let it=0;it<2;it++){const q=[p[0]];for(let i=0;i<p.length-1;i++){const a=p[i],b=p[i+1];q.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75])}q.push(p[p.length-1]);p=q}return p},
  drawVasuki(ctx,o,layer){if(this.vs.vis<=0)return;const S=this.spine(o);ctx.save();ctx.globalAlpha*=clamp(this.vs.vis,0,1);const wd=o.P?20:26;
    const pts=S.pts,fl=S.flag;/* tail: first span, tapered */
    if(layer==='front')vasukiTail(ctx,this.resample([pts[0],pts[1]],8));
    /* group the rest into runs that share a layer, so the body has no seams */
    let d=this.vs.d0+Math.hypot(pts[1][0]-pts[0][0],pts[1][1]-pts[0][1]);let run=[pts[1]],runBack=fl[2];
    const flush=()=>{if(run.length>1){const sm=this.resample(this.smooth(run),7);if((layer==='back')===runBack)drawVasukiPart(ctx,sm,wd,{d0:d});let len=0;for(let k=1;k<sm.length;k++)len+=Math.hypot(sm[k][0]-sm[k-1][0],sm[k][1]-sm[k-1][1]);d+=len}};
    for(let i=2;i<pts.length;i++){if(fl[i]!==runBack){const last=run[run.length-1];flush();run=[last];runBack=fl[i]}run.push(pts[i])}flush();
    if(layer==='front'){const h=pts[pts.length-1];vasukiHead(ctx,h[0],h[1],S.headAng+Math.sin(T.sec*1.3)*.06,o.P?.62:.8,this.vsBlink)}ctx.restore()},
  /* ---------- drawing, in the named layers L00..L07 (L07 is the HTML interface) ---------- */
  draw(ctx){const o=this.lay();this.placeGroups(o);const t=T.sec,W=o.W,H=o.H;
    /* L01 background: sky, patterned horizon, moon, stars or clouds */
    ctx.fillStyle=this.col(['sky']);ctx.fillRect(-10,-10,W+20,o.hz+20);
    const s2=this.col(['sky2']);const sb=new Path2D();const y2=o.hz*.62;sb.moveTo(-10,o.hz+5);sb.lineTo(-10,y2);for(let x=-10;x<W+80;x+=80)sb.quadraticCurveTo(x+40,y2-26,x+80,y2);sb.lineTo(W+80,o.hz+5);sb.closePath();
    ctx.fillStyle=s2;ctx.fill(sb);ctx.save();ctx.clip(sb);Pat.dots(ctx,{x:0,y:y2-20,w:W,h:o.hz-y2+20},34,2.4,this.col(['mot']));ctx.restore();sgl(ctx,sb,2.4);
    const pan=this.pan;const stK=this.col(['stars'])*this.starsK;if(stK>0){ctx.save();ctx.globalAlpha*=stK;for(const s of this.stars){const x=((s.u*W+pan*40)%W+W)%W,y=o.H*.13+s.v*(o.hz*.62-o.H*.13);if(Math.hypot(x-o.moon[0],y-o.moon[1])<130)continue;
      drawStar(ctx,x,y,s.s*(1+Math.sin(t*1.5+s.ph)*.08),s.ph>4.5?C.cream:C.turmeric)}ctx.restore()}
    const clK=this.col(['clouds']);if(clK>0){ctx.save();ctx.globalAlpha*=clK;for(const c of this.cloudsP){const x=((c.u*W+t*6+pan*30)%(W+200)+W+200)%(W+200)-100;drawCloud(ctx,x,o.H*.14+c.v*(o.hz*.5-o.H*.14),c.s*(o.P?.8:1),C.cream,C.turq)}ctx.restore()}
    const mk_=this.moonK*this.col(['moon']);if(mk_>0){ctx.save();ctx.globalAlpha*=mk_;drawMoon(ctx,o.moon[0]+pan*20,o.moon[1],o.P?.85:1);ctx.restore()}
    const hzs=new Path2D();hzs.rect(-10,o.hz-16,W+20,16);ctx.fillStyle=this.col(['sky2']);ctx.fill(hzs);ctx.save();ctx.clip(hzs);Pat.tri(ctx,{x:0,y:o.hz-14,w:W,h:12},20,this.col(['mot']));ctx.restore();
    if(this.prev.length)this.drawPreview(ctx,o,'sky');
    if(this.stormK>0){ctx.save();ctx.globalAlpha*=this.stormK;for(let i=0;i<5;i++){const x=(i+.5)/5*o.W+Math.sin(t*.5+i)*30;drawCloud(ctx,x,o.hz*.45+(i%2)*50,o.P?.9:1.2,C.violet,C.cream)}ctx.restore()}
    /* L02 environment: ocean bands, mountain, Kurma */
    ctx.fillStyle=this.col(['bands',3,0]);ctx.fillRect(-10,o.hz,W+20,H-o.hz+10);
    this.band(ctx,o,0);
    if(this.goldC>0)this.goldCircle(ctx,o);
    this.band(ctx,o,1);
    if(this.mt.vis>0&&this.mt.solid){this.drawVasuki(ctx,o,'back');ctx.save();ctx.globalAlpha*=this.mt.vis;drawMandara(ctx,o.cx,o.mb+this.mt.y,o.mw,o.mh,this.mt.rot);ctx.restore()}
    this.drawPeeks(ctx,o);this.drawRising(ctx,o);
    if(this.mt.outline>0)drawMandara(ctx,o.cx,o.mb+this.mt.y,o.mw,o.mh,0,{outline:this.mt.outline});
    this.band(ctx,o,2);
    if(this.kurma.vis>0){ctx.save();ctx.globalAlpha*=this.kurma.vis;drawKurma(ctx,o.cx,o.rim+this.kurma.y,o.ks,t,{blink:this.kBlink,front:o.kfront});
      /* water lines over Kurma: he stays visible beneath the surface */
      ctx.globalAlpha*=.75;for(let r=0;r<3;r++){const y=o.mb+16+r*34*o.ks+this.kurma.y,per=60;const p=new Path2D();for(let x=o.cx-190*o.ks;x<o.cx+190*o.ks;x+=per){p.moveTo(x,y);p.quadraticCurveTo(x+per/2,y-10,x+per,y)}sgl(ctx,p,3,this.col(['bands',2,1]))}ctx.restore()}
    this.drawRipples(ctx,o);
    this.band(ctx,o,3);
    this.drawLights(ctx,o);
    this.drawFishLotus(ctx,o);
    if(this.mt.vis>0&&this.mt.solid)this.drawVasuki(ctx,o,'front');
    /* L03 main characters: Lakshmi and Dhanvantari rise from behind the front waterline */
    if(this.lbud.vis>0||this.dhan.vis>0){ctx.save();ctx.beginPath();ctx.rect(-10,-10,W+20,o.bands[3]+12);ctx.clip();
      if(this.lbud.vis>0)this.drawLakshmiLotus(ctx,o);
      if(this.dhan.vis>0){const d=o.dhan;this.dhan.x=d.x;this.dhan.s=d.s;this.dhan.y=d.y+(1-ease(clamp(this.dhanRise,0,1)))*(H-d.y+d.s*380);this.dhan.draw(ctx)}ctx.restore()}
    /* L04 supporting characters */
    [...this.devas,...this.asuras].forEach(f=>{if(f.vis>0)f.draw(ctx)});
    if(this.vishnu.vis>0){const v=o.vishnu;this.vishnu.x=v.x;this.vishnu.y=v.y+Math.sin(t*1.1)*4;this.vishnu.s=v.s;ctx.save();halo(ctx,v.x,v.y-150*v.s,150*v.s,[C.cream,C.turmeric,C.peacock],t,this.vishnu.vis*.9);ctx.restore();this.vishnu.draw(ctx)}
    if(this.shiva.vis>0){const s=o.shiva;this.shiva.x=s.x+this.shivaX*(o.W*.4);this.shiva.y=s.y;this.shiva.s=s.s;this.shiva.draw(ctx)}
    /* L05 interactive elements and L06 effects */
    if(this.hala>0)this.drawHala(ctx,o);
    if(this.arrows)this.drawArrows(ctx,o);
    if(this.waveOut&&this.waveOut.length)this.drawWaveOut(ctx,o);
    if(this.beingsK>0)this.drawBeings(ctx,o);
    if(this.giftVis>0)this.drawGifts(ctx,o);
    FX.draw(ctx);
    if(this.prev.length)this.drawPreview(ctx,o,'front');
    if(this.festive>0)this.drawFestive(ctx,o);
    for(const b of this.bursts){burst(ctx,b.x,b.y,(T.now-b.t0)/900,b.r,b.col)}this.bursts=this.bursts.filter(b=>T.now-b.t0<900);
    if(this.extra)this.extra(ctx,o);
    /* L00 frame */
    drawFrame(ctx,this.frameK,this.col(['frame',0]),this.col(['frame',1]))},
  band(ctx,o,i){const bt=o.bands[i],a=[8,12,15,18][i]*this.amp*(1+this.storm*.8),per=[64,88,112,136][i]*(o.P?.8:1),sp=[14,-18,22,-26][i]*this.spd;
    const bob=Math.sin(T.sec*(.8+i*.2)+i)*[2,3,4,5][i]*this.bob*(1+this.storm)+(1-ease(clamp(this.bandK[i],0,1)))*(o.H-bt+60);const part=this.part*o.W*.2*(i+1)/4;const c=['bands',i];
    const args={y:bt+bob,amp:a,per,ph:T.sec*sp+this.pan*30*(i+1),fill:this.col([...c,0]),lineCol:this.col([...c,1]),acc:this.col([...c,2]),W:o.W+20,bottom:o.H+20,rows:i===3?Math.min(16,Math.ceil((o.H-bt)/(a*1.6+10))):3};
    if(part<=1){ctx.save();ctx.translate(-10,0);waveBand(ctx,args);ctx.restore();return}
    ctx.save();ctx.beginPath();ctx.rect(-10,0,o.cx+10,o.H+20);ctx.clip();ctx.translate(-part-10,0);waveBand(ctx,args);ctx.restore();
    ctx.save();ctx.beginPath();ctx.rect(o.cx,0,o.W,o.H+20);ctx.clip();ctx.translate(part-10,0);waveBand(ctx,args);ctx.restore();
  },
  goldCircle(ctx,o){const k=this.goldC;const y=o.P?o.mb+90:o.mb+80;ctx.save();ctx.globalAlpha*=clamp(k,0,1);halo(ctx,o.cx,y,(o.P?150:170)*clamp(k,0,1.2),[C.turmeric,C.gold,C.white],T.sec);ctx.restore()},
  drawPeeks(ctx,o){if(this.peekK<=0)return;const y=o.bands[1]+(o.bands[2]-o.bands[1])*.55;ctx.save();ctx.globalAlpha*=this.peekK;this.peeks.forEach((p,i)=>{const x=p.u*o.W,b=Math.sin(T.sec*1.2+i)*6;
      if(i%2)drawMedal(ctx,x,y+b+22,.4);else drawJewel(ctx,x,y+b+22,.36,i===0?C.emerald:C.coral)});ctx.restore();
    if(this.glint>=0){const p=this.peeks[1];const k=this.glint;burst(ctx,p.u*o.W,y+22,k,70,C.turmeric)}},
  drawRising(ctx,o){const base=o.bands[2]+30;const tr=[[this.conch,o.cx-o.mw*(o.P?.95:1.15),(g,x,y)=>drawConch(g,x,y,o.P?.85:1.05)],[this.jewel,o.cx+o.mw*(o.P?.95:1.15),(g,x,y)=>drawJewel(g,x,y,o.P?.85:1,C.emerald)],
      [this.medal,o.cx,(g,x,y)=>drawMedal(g,x,y,o.P?.8:.95)]];
    for(const [st,x,fn] of tr){if(st.vis<=0)continue;const top=st===this.medal?o.mb-o.mh*.62:o.hz+(o.P?40:20);const y=lerp(top,base+80,clamp(st.y,0,1))+Math.sin(T.sec*1.4)*5;
      ctx.save();ctx.globalAlpha*=st.vis;if(st.y<.2)halo(ctx,x,y,60,[C.turmeric,C.saffron,C.coral],T.sec,.7);fn(ctx,x,y);ctx.restore()}},
  drawLakshmiLotus(ctx,o){const l=o.lak,b=this.lbud;const y=l.y+clamp(b.y,0,1)*(o.P?260:220);ctx.save();ctx.globalAlpha*=b.vis;
    if(this.floral>0){for(let i=0;i<12;i++){const a=i/12*TAU+T.sec*.05,r=(o.P?230:250)*this.floral;drawLotus(ctx,l.x+Math.cos(a)*r*1.3,y-140+Math.sin(a)*r*.6,.38,1,i%2?C.pink:C.coral)}}
    /* the lotus seat: petals open one at a time, Lakshmi appears on top */
    if(this.lakshmi.vis>0){this.lakshmi.x=l.x;this.lakshmi.y=y-36*l.s;this.lakshmi.s=l.s;this.lakshmi.draw(ctx)}
    ctx.save();ctx.translate(l.x,y+30);drawLotus(ctx,0,0,(o.P?2.3:2.6)*l.s,b.open,C.pink,C.turmeric);ctx.restore();ctx.restore()},
  drawRipples(ctx,o){if(this.ripple<=0&&this.swirlA<=0)return;const y=o.mb+10;ctx.save();
    if(this.ripple>0){ctx.globalAlpha*=clamp(this.ripple,0,1);for(let i=0;i<3;i++){const k=((T.sec*.35+i/3)%1);const rx=o.mw*(.55+k*.9),ry=rx*.18;ctx.save();ctx.globalAlpha*=1-k;ctx.setLineDash([16,10]);
      ctx.beginPath();ctx.ellipse(o.cx,y,rx,ry,0,0,TAU);ctx.strokeStyle=C.cream;ctx.lineWidth=5;ctx.stroke();ctx.setLineDash([]);ctx.restore()}}
    ctx.restore();
    if(this.swirlA>0){ctx.save();ctx.globalAlpha*=this.swirlA;ctx.translate(o.cx,o.bands[3]-40);ctx.scale(1,.24);for(let arm=0;arm<6;arm++){const a0=arm/6*TAU+this.swirl;for(let j=0;j<9;j++){const a=a0+j*.22,r=o.mw*.62+j*o.mw*.12;
      dot(ctx,Math.cos(a)*r,Math.sin(a)*r,9-j*.4,j%2?C.turmeric:C.cream)}}ctx.restore()}},
  drawLights(ctx,o){for(const l of this.lights){const k=clamp((T.now-l.t0)/500,0,1);const y=o.bands[l.b]+6+Math.sin(T.sec*2+l.x)*3;ctx.save();ctx.globalAlpha*=k*(l.a==null?1:l.a);drawStar(ctx,l.u*o.W,y,.55+.1*Math.sin(T.sec*3+l.u*9),C.turmeric);ctx.restore()}},
  addLight(u,b){this.lights.push({u,b:b==null?3:b,t0:T.now,x:Math.random()*9});AU.sfx('pop')},
  drawFishLotus(ctx,o){const t=T.sec;if(this.lifeK<=0)return;ctx.save();ctx.globalAlpha*=clamp(this.lifeK,0,1);
    for(const f of this.fish){const by=o.bands[f.band],nb=o.bands[f.band+1]||o.H;let hx=f.u*o.W;const edge=f.u<.5?o.W*.06:o.W*.94;hx=lerp(hx,edge,this.fishEdge);
      const sw=Math.sin(t*f.sp*2+f.ph);const x=hx+sw*o.W*f.rg*(1-this.fishEdge*.7),y=lerp(by,nb,.45)+Math.cos(t*f.sp*2+f.ph)*10;
      let dir=Math.cos(t*f.sp*2+f.ph)>0?1:-1;if(this.fishLook>0){dir=x<o.W*.47?1:-1}
      if(Math.abs(x-o.cx)<o.mw*.6&&this.mt.vis>0&&f.band<2)continue;drawFish(ctx,x,y,f.s*(o.P?.8:1),dir,f.col[0],f.col[1],t,f.ph)}
    for(const l of this.lotus){const x=l.u*o.W;if(Math.abs(x-o.cx)<o.mw*.7&&(this.mt.vis>0||this.dhan.vis>0||this.lbud.vis>0))continue;const y=o.bands[l.band]+4+Math.sin(t*1.2+l.ph)*5*this.bob;
      drawLotus(ctx,x,y,l.s*(o.P?.8:1),this.lotusOpen,C.pink,C.turmeric)}ctx.restore()},
  drawHala(ctx,o){const k=this.hala;const sh=o.shiva;const sx=sh.x+this.shivaX*(o.W*.4);const tgt=[sx,sh.y-246*sh.s];const c=ease(clamp(this.halaC,0,1));const rise=ease(clamp(this.halaRise,0,1));
    const bx=o.cx,by=o.mb-rise*(o.P?180:150);ctx.save();ctx.globalAlpha*=clamp(k,0,1);
    const parts=[[0,0,.85,1],[-o.mw*.45,40,.6,2],[o.mw*.45,30,.62,3],[-o.mw*.2,-80,.55,4],[o.mw*.22,-100,.5,5]];
    for(const [dx,dy,s,seed] of parts){const x=lerp(bx+dx,tgt[0],c),y=lerp(by+dy,tgt[1],c),sc=lerp(s*(o.P?.8:1)*(.6+rise*.4),.08,c);drawHala(ctx,x,y,sc,seed,Math.sin(T.sec*.4+seed)*.06)}
    if(c>.7){const kk=(c-.7)/.3;ctx.globalAlpha*=kk;const p=sPath(ellPts(tgt[0],tgt[1],22,16,10),true);shape(ctx,p,C.indigo,cc=>Pat.dots(cc,{x:tgt[0]-24,y:tgt[1]-18,w:48,h:36},8,2,C.violet),{lw:1.6})}ctx.restore()},
  drawGifts(ctx,o){const G=o.gifts;ctx.save();ctx.globalAlpha*=this.giftVis;for(const k of ['leaf','heart','diya']){const p=this.giftPos&&this.giftPos[k]||G[k];drawGift(ctx,k,p[0],p[1],(o.P?.95:.9)*(this.giftScale&&this.giftScale[k]||1),this.gifts[k],T.sec,this.giftHL[k])}ctx.restore()},
  drawPreview(ctx,o,layer){for(const p of this.prev){const x=p.u*o.W;const y=lerp(o.bands[3]+40,o.hz+(o.P?120:70),ease(clamp(p.k,0,1)));if(layer==='sky'&&p.k<.98)continue;if(layer==='front'&&p.k>=.98)continue;
    ctx.save();halo(ctx,x,y,44,[C.turmeric,C.saffron,C.cream],T.sec,.8);if(p.kind==='conch')drawConch(ctx,x,y,.5);else if(p.kind==='jewel')drawJewel(ctx,x,y,.55,C.coral);else drawLotus(ctx,x,y+20,.55,1);ctx.restore()}},
  drawFestive(ctx,o){ctx.save();ctx.globalAlpha*=this.festive;const n=o.P?5:9;for(let i=0;i<n;i++){const x=(i+.5)/n*o.W;const y=o.bands[3]+40+((i%2)*40)+Math.sin(T.sec*1.4+i)*4;if(Math.abs(x-o.cx)<o.mw*.5)continue;drawDiya(ctx,x,y,o.P?.55:.6,{lit:1,t:T.sec,seed:i,halo:false})}
    /* marigold bunting along the top edge only */
    const y0=46;const p=new Path2D();p.moveTo(40,y0);for(let x=40;x<o.W-40;x+=120)p.quadraticCurveTo(x+60,y0+30,x+120,y0);sgl(ctx,p,3);for(let x=40;x<o.W-40;x+=24){const yy=y0+Math.sin(((x-40)%120)/120*Math.PI)*22;dot(ctx,x,yy,8,(x/24)%2<1?C.diya:C.turmeric);ring(ctx,x,yy,8,C.line,1.6)}
    ctx.restore()},
  drawArrows(ctx,o){const dir=this.arrows,y=o.feet-(o.P?190:230)*o.gs;const k=(T.sec*1.4)%1;for(let i=0;i<4;i++){const x=(dir<0?o.cx-o.mw*.62-i*o.gap[0]*.55*o.gs:o.cx+o.mw*.62+i*o.gap[0]*.55*o.gs)+dir*k*24;
      ctx.save();ctx.globalAlpha*=.4+.6*(1-Math.abs(k-.5));ctx.translate(x,y);ctx.scale(dir,1);const p=polyPath([[-16,-16],[6,0],[-16,16],[-8,0]]);shape(ctx,p,C.turmeric,null,{lw:1.8});ctx.restore()}},
  drawWaveOut(ctx,o){this.waveOut=this.waveOut.filter(w=>T.now-w.t0<1600);for(const w of this.waveOut){const k=(T.now-w.t0)/1600;ctx.save();ctx.globalAlpha*=1-k;
      for(let j=0;j<3;j++){const x=o.cx+w.side*(o.mw*.5+k*o.W*.32+j*46),y=o.bands[2]+30+j*36;ctx.beginPath();ctx.arc(x,y,40,w.side<0?Math.PI*.6:-Math.PI*.4,w.side<0?Math.PI*1.4:Math.PI*.4);ctx.strokeStyle=C.cream;ctx.lineWidth=6;ctx.stroke();ctx.strokeStyle=C.line;ctx.lineWidth=2;ctx.stroke()}ctx.restore()}},
  /* "wonderful beings": abstract golden decorative shapes only, no named beings */
  drawBeings(ctx,o){ctx.save();ctx.globalAlpha*=this.beingsK;const n=4;for(let i=0;i<n;i++){const x=o.cx+(i<2?-1:1)*o.mw*(.42+(i%2)*.32),y=o.mb-o.mh*(.25+(i%2)*.2)-this.beingsK*30+Math.sin(T.sec+i)*8;
      ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(T.sec*.6+i)*.2);const p=sPath([[0,-40],[14,-12],[40,-4],[16,10],[22,40],[0,22],[-22,40],[-16,10],[-40,-4],[-14,-12]],true);shape(ctx,p,C.gold,c=>{Pat.dots(c,{x:-40,y:-40,w:80,h:80},10,2.2,C.turmeric);dot(c,0,4,7,C.saffron)},{lw:2});ctx.restore()}ctx.restore()},
  down(p){this.tapH&&this.tapH(p)},move(p,d){this.moveH&&this.moveH(p,d)},up(p,d){this.dragH&&this.dragH(p,d)},
  key(k){if((k==='Enter'||k===' ')&&this.tapH){this.tapH({x:L.W/2+1,y:L.H/2,key:true});return true}if(k==='ArrowLeft'&&this.tapH){this.tapH({x:10,y:L.H/2,key:true});return true}if(k==='ArrowRight'&&this.tapH){this.tapH({x:L.W-10,y:L.H/2,key:true});return true}return false},
  update(dt){if(this.autoChurn>0){this.pull=Math.sin(T.sec*1.7)*this.autoChurn;this.lean=Math.max(this.lean,this.autoChurn>0?1:0);this.mt.rot+=dt*.12*this.autoChurn;this.vs.d0+=Math.cos(T.sec*1.7)*dt*40*this.autoChurn}
    [...this.devas,...this.asuras,this.vishnu,this.shiva,this.lakshmi,this.dhan].forEach(f=>f.update(dt));this.swirl+=dt*this.swirlA*1.4;
    this.vs.d0+=dt*(this.vsFlow||0);this.kb=(this.kb||3)-dt;if(this.kb<0){this.kBlink=1;if(this.kb<-.16){this.kBlink=0;this.kb=3+Math.random()*3}}
    this.vb=(this.vb||4)-dt;if(this.vb<0){this.vsBlink=1;if(this.vb<-.16){this.vsBlink=0;this.vb=3.5+Math.random()*3}}},
  /* hit tests in logical coordinates */
  sideOf(p){return p.x<L.W/2?-1:1},
  burstAt(x,y,col,r){this.bursts.push({x,y,col:col||C.turmeric,r:r||90,t0:T.now})}};
World.shivaX=1;
