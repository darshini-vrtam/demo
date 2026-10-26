/* ===== Shot 12: one richly detailed Madhubani ocean picture with three hidden treasures ===== */
const Hunt={id:'hunt',found:{},order:[],hint:null,nudge:null,flash:{},onFind:null,
  targets:{lotus:{u:.17,v:.66,label:'A lotus flower'},jewel:{u:.79,v:.34,label:'A sparkling jewel'},conch:{u:.56,v:.8,label:'A conch shell'}},
  reset(){this.found={};this.order=[];this.hint=null;this.nudge=null;this.flash={}},
  rect(){const top=L.top()+6,bot=L.H*(L.portrait?.71:.77);return{x:40,y:top,w:L.W-80,h:Math.max(200,bot-top)}},
  pos(k){const r=this.rect(),t=this.targets[k];return[r.x+t.u*r.w,r.y+t.v*r.h]},
  hitR(){return Math.max(70,40/L.U)},
  art(g,r){/* sky strip, then five wave bands filled with life */
    g.fillStyle=C.deep;g.fillRect(r.x,r.y,r.w,r.h);const sky=r.h*.16;g.fillStyle=C.indigo;g.fillRect(r.x,r.y,r.w,sky);
    const rr=rng(77);for(let i=0;i<14;i++)drawStar(g,r.x+rr()*r.w,r.y+12+rr()*(sky-24),.45,i%3?C.turmeric:C.cream);
    const cols=[[C.peacock,C.turq,C.turmeric],[C.deep,C.peacock,C.pink],[C.turq,C.cream,C.coral],[C.peacock,C.turq,C.turmeric],[C.deep,C.peacock,C.cream]];
    for(let i=0;i<5;i++){const y=r.y+sky+i*(r.h-sky)/5;g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();g.translate(r.x,0);
      waveBand(g,{y:y+10,amp:10+i*2,per:70+i*12,ph:i*31,fill:cols[i][0],lineCol:cols[i][1],acc:cols[i][2],W:r.w,bottom:r.y+r.h,rows:3});g.restore()}
    /* decoys: fish, turtles, leaves, scallop shells, round flowers, plain dots (never a lotus, jewel or conch) */
    const tg=Object.keys(this.targets).map(k=>this.posIn(k,r));const free=(x,y,d)=>tg.every(p=>Math.hypot(p[0]-x,p[1]-y)>d);
    const R=rng(4242);g.save();g.beginPath();g.rect(r.x,r.y,r.w,r.h);g.clip();
    for(let i=0;i<70;i++){const x=r.x+30+R()*(r.w-60),y=r.y+sky+20+R()*(r.h-sky-40);if(!free(x,y,120))continue;const k=i%6;
      if(k===0||k===3)drawFish(g,x,y,.5+R()*.35,R()<.5?1:-1,[C.coral,C.turmeric,C.saffron,C.pink][i%4],[C.turmeric,C.verm,C.indigo,C.peacock][i%4],0,i);
      else if(k===1)drawTurtle(g,x,y,.8,R()<.5?1:-1);
      else if(k===2){shape(g,sPath([[x-40,y],[x-10,y-14],[x+30,y-4],[x+40,y+6],[x,y+14]],true),C.leaf,c=>Pat.leaves(c,{x:x-42,y:y-16,w:84,h:32},14,C.emerald),{lw:2})}
      else if(k===4)drawShell(g,x,y,.6,C.cream,C.ochre);
      else{const p=sPath(ellPts(x,y,16,16,10),true);for(let j=0;j<8;j++){const a=j/8*TAU;shape(g,ellPath(x+Math.cos(a)*16,y+Math.sin(a)*16,9,9),j%2?C.turmeric:C.saffron,null,{line:'single',lw:1.4})}shape(g,p,C.verm,c=>dot(c,x,y,5,C.turmeric),{lw:1.6})}}
    g.restore();
    /* the three hidden treasures, clearly drawn on top so patterns never hide them */
    const [lx,ly]=this.posIn('lotus',r),[jx,jy]=this.posIn('jewel',r),[kx,ky]=this.posIn('conch',r);
    drawLotus(g,lx,ly+26,.62,1);drawJewel(g,jx,jy,.55,C.violet);drawConch(g,kx,ky,.58);
    const fr=new Path2D();fr.rect(r.x,r.y,r.w,r.h);dbl(g,fr,3)},
  posIn(k,r){const t=this.targets[k];return[r.x+t.u*r.w,r.y+t.v*r.h]},
  draw(ctx){const r=this.rect();ctx.fillStyle=C.deep;ctx.fillRect(0,0,L.W,L.H);
    Spr.draw(ctx,'huntArt'+Math.round(r.w)+'x'+Math.round(r.h),0,0,L.W,L.H,0,0,g=>this.art(g,r));
    for(const k in this.targets){const [x,y]=this.pos(k);
      if(k==='jewel'&&!this.found.jewel){const tw_=.5+.5*Math.sin(T.sec*3);ctx.save();ctx.globalAlpha*=.6+tw_*.4;drawStar(ctx,x+26,y-26,.35+tw_*.15,C.white);ctx.restore()}
      if(this.found[k]){halo(ctx,x,y,58,[C.turmeric,C.saffron,C.cream],T.sec,.55);if(k==='lotus')drawLotus(ctx,x,y+26,.62,1);else if(k==='jewel')drawJewel(ctx,x,y,.55,C.violet);else drawConch(ctx,x,y,.58);ring(ctx,x,y,62,C.turmeric,6);ring(ctx,x,y,70,C.line,2)}
      if(this.flash[k])burst(ctx,x,y,(T.now-this.flash[k])/900,110,C.turmeric)}
    if(this.hint){const [x,y]=this.pos(this.hint);const k=.5+.5*Math.sin(T.sec*4);ring(ctx,x,y,this.hitR()*(1+k*.15),C.turmeric,7);ring(ctx,x,y,this.hitR()*(1.12+k*.15),C.cream,3)}
    if(this.nudge&&T.now-this.nudge.t0<1400){const [x,y]=this.pos(this.nudge.k);const k=(T.now-this.nudge.t0)/1400;ctx.save();ctx.globalAlpha*=1-k;ring(ctx,x,y,this.hitR()*(1.6-k*.5),C.cream,5);ring(ctx,x,y,this.hitR()*(1.75-k*.5),C.turmeric,3);ctx.restore()}
    drawFrame(ctx,1,C.peacock,C.turmeric)},
  down(p){for(const k in this.targets){if(this.found[k])continue;const [x,y]=this.pos(k);if(Math.hypot(p.x-x,p.y-y)<=this.hitR()){this.find(k);return}}
    const left=Object.keys(this.targets).filter(k=>!this.found[k]);if(!left.length)return;
    left.sort((a,b)=>{const pa=this.pos(a),pb=this.pos(b);return Math.hypot(p.x-pa[0],p.y-pa[1])-Math.hypot(p.x-pb[0],p.y-pb[1])});this.nudge={k:left[0],t0:T.now}},
  key(k){if(k==='Enter'||k===' '){const left=Object.keys(this.targets).filter(t=>!this.found[t]);if(left.length){this.find(left[0]);return true}}return false},
  find(k){if(this.found[k])return;this.found[k]=true;this.order.push(k);this.flash[k]=T.now;if(this.hint===k)this.hint=null;AU.sfx('chime');Store.push('treasures',k);this.onFind&&this.onFind(k)},
  next(){return Object.keys(this.targets).find(k=>!this.found[k])}};

/* ===== Shot 15: from the cosmic ocean to our homes ===== */
const Celebration={id:'celebrate',lamps:[],floorK:0,houseK:0,edgeK:0,blessK:0,tableauK:0,moonK:1,onLit:null,
  reset(){this.floorK=0;this.houseK=0;this.edgeK=0;this.blessK=0;this.tableauK=0;this.lamps=[];this.firstK=0;
    this.lak=new Fig(SP_LAKSHMI);this.dhan=new Fig(SP_DHAN);this.kub=new Fig(SP_KUBERA);this.dhan.over=(ctx)=>drawPot(ctx,0,-190,1.05,0,T.sec)},
  lay(){const W=L.W,H=L.H,P=L.portrait,cx=W/2;const o={W,H,P,cx};
    if(!P){o.roof=H*.36;o.hb=H*.64;o.hw=Math.min(W*.4,780);o.floor=H*.64;o.rows=[[H*.69,.42,9],[H*.765,.56,7]];o.moon=[W*.1,H*.24];o.bless=[cx,L.top()+H*.115]}
    else{o.roof=H*.31;o.hb=H*.55;o.hw=W*.84;o.floor=H*.55;o.rows=[[H*.6,.45,5],[H*.665,.55,4],[H*.735,.66,3]];o.moon=[W*.16,H*.155];o.bless=[cx,L.top()+H*.08]}
    o.first=[cx,o.rows[o.rows.length-1][0]];return o},
  build(){const o=this.lay();const out=[];o.rows.forEach(([y,s,n],ri)=>{const span=o.W*(o.P?.86:.84);for(let i=0;i<n;i++){const x=o.cx-span/2+(i+.5)*span/n;out.push({x,y,s,lit:0,row:ri})}});
    const f=o.first;let best=0;out.forEach((l,i)=>{if(Math.hypot(l.x-f[0],l.y-f[1])<Math.hypot(out[best].x-f[0],out[best].y-f[1]))best=i});out[best].first=true;out[best].x=f[0];out[best].s*=1.25;
    this.lamps=out.sort((a,b)=>Math.hypot(a.x-f[0],a.y-f[1])-Math.hypot(b.x-f[0],b.y-f[1]));this._v=L.ver},
  draw(ctx){const o=this.lay();if(this._v!==L.ver&&this.lamps.length){const lit=this.lamps.map(l=>l.lit);this.build();this.lamps.forEach((l,i)=>l.lit=lit[i]||0)}const t=T.sec;
    /* L01 night sky: full moon, patterned stars */
    ctx.fillStyle=C.deep;ctx.fillRect(0,0,o.W,o.H);Spr.draw(ctx,'celSky',0,0,o.W,o.H,0,0,g=>{const r=rng(9);for(let i=0;i<40;i++){const x=r()*o.W,y=L.top()*.6+r()*(o.floor-L.top()*.6-40);if(Math.abs(x-o.cx)<o.hw*.56&&y>o.roof-30)continue;drawStar(g,x,y,.35+r()*.4,i%3?C.turmeric:C.cream)}});
    drawMoon(ctx,o.moon[0],o.moon[1],o.P?.8:.9);
    /* L02 floor: the ocean's wave bands turn into curved festive floor patterns */
    const fk=ease(clamp(this.floorK,0,1));ctx.save();ctx.globalAlpha*=1-fk;for(let i=0;i<3;i++)waveBand(ctx,{y:o.floor+i*(o.H-o.floor)/3,amp:12,per:110,ph:t*20*(i%2?-1:1),fill:[C.peacock,C.deep,C.turq][i],lineCol:C.turq,acc:C.turmeric,W:o.W+20,bottom:o.H+20});ctx.restore();
    ctx.save();ctx.globalAlpha*=fk;ctx.fillStyle=C.verm;ctx.fillRect(0,o.floor,o.W,o.H-o.floor);ctx.beginPath();ctx.rect(0,o.floor,o.W,o.H-o.floor);ctx.clip();
    for(let r=0;r<9;r++){const rad=60+r*70;ctx.beginPath();ctx.ellipse(o.cx,o.H+20,rad*1.8,rad,0,Math.PI,TAU);ctx.strokeStyle=r%2?C.cream:C.turmeric;ctx.lineWidth=r%3===0?8:4;ctx.stroke();
      for(let a=0;a<24;a++){const an=Math.PI+a/24*Math.PI;dot(ctx,o.cx+Math.cos(an)*rad*1.8,o.H+20+Math.sin(an)*rad,r%2?3.4:2.4,r%2?C.saffron:C.cream)}}
    ctx.restore();line(ctx,[[0,o.floor],[o.W,o.floor]],C.line,3);
    /* L02 home with an open doorway */
    if(this.houseK>0){ctx.save();ctx.globalAlpha*=clamp(this.houseK,0,1);this.house(ctx,o);ctx.restore()}
    /* L03 devotional tableau in the doorway: Dhanvantari, Lakshmi, Kubera, each with their own iconography */
    if(this.tableauK>0){ctx.save();ctx.globalAlpha*=this.tableauK;const d=this.door(o);const s=d.h/430;
      this.dhan.x=d.x-d.w*.3;this.dhan.y=d.y+d.h-6;this.dhan.s=s*1.05;this.lak.x=d.x;this.lak.y=d.y+d.h-28*s;this.lak.s=s*1.05;this.kub.x=d.x+d.w*.3;this.kub.y=d.y+d.h-8;this.kub.s=s;
      drawLotus(ctx,d.x,d.y+d.h-4,s*1.9,1);this.dhan.draw(ctx);this.lak.draw(ctx);this.kub.draw(ctx);ctx.restore()}
    /* L05 foreground: brass vessel, gold and silver motifs, lotus, rows of diyas */
    const fx=o.P?o.W*.12:o.cx-o.hw*.62,fy=o.floor+(o.P?30:22);this.vessel(ctx,fx,fy,o.P?.8:.9);
    [[fx+70,fy+30,C.gold],[fx+96,fy+38,C.white],[fx+122,fy+28,C.gold]].forEach(([x,y,c])=>{shape(ctx,ellPath(x,y,14,9),c,cc=>ring(cc,x,y,6,C.ochre,2),{line:'single',lw:2})});
    const gx=o.P?o.W*.86:o.cx+o.hw*.62;[[gx-30,fy+26,C.white],[gx,fy+34,C.gold],[gx+30,fy+24,C.white]].forEach(([x,y,c])=>{shape(ctx,polyPath([[x,y-14],[x+12,y],[x,y+12],[x-12,y]]),c,null,{line:'single',lw:2});dot(ctx,x,y,3,C.verm)});
    for(const l of this.lamps){if(!l.first&&this.firstK<1)continue;const s=l.s*(l.first?clamp(this.firstK,0,1):1);if(s<=.01)continue;drawDiya(ctx,l.x-8*s,l.y,s,{lit:l.lit,t,seed:l.x})}
    /* lotus and floral patterns fill the edges */
    if(this.edgeK>0){ctx.save();ctx.globalAlpha*=this.edgeK;const n=o.P?4:6;for(let i=0;i<n;i++){const y=L.top()+40+i*(o.floor-L.top()-60)/(n-1);drawLotus(ctx,58,y+20,.42,1,i%2?C.pink:C.coral);drawLotus(ctx,o.W-58,y+20,.42,1,i%2?C.coral:C.pink)}
      for(let x=120;x<o.W-120;x+=o.P?140:180){leafShape(ctx,x,L.H-60,26,-.4,C.leaf);leafShape(ctx,x+40,L.H-60,26,Math.PI+.4,C.leaf);dot(ctx,x+20,L.H-62,8,C.diya)}ctx.restore()}
    /* final blessing above the lamps */
    if(this.blessK>0){ctx.save();ctx.globalAlpha*=clamp(this.blessK,0,1);const b=o.bless;const w=Math.min(o.W-120,o.P?940:1000);const big=o.P?50:52;const ln=wrapLines(ctx,'The Greatest Treasures Are Within Us',w-90,big);const h=70+ln.length*big*1.12+44+56;plaque(ctx,b[0]-w/2,b[1]-h/2,w,h,C.cream);
      let y=b[1]-h/2+38+big*.56;ln.forEach(s=>{ctext(ctx,s,b[0],y,big,C.red);y+=big*1.12});y+=6;
      ctext(ctx,'Health · Kindness · Gratitude · Light',b[0],y,o.P?32:34,C.leaf,{body:true,weight:700});y+=50;ctext(ctx,'Shubh Dhanteras!',b[0],y,o.P?42:44,C.verm);ctx.restore()}
    drawFrame(ctx,1,C.verm,C.turmeric)},
  door(o){const w=o.hw*(o.P?.42:.36),h=(o.hb-o.roof)*.6;return{x:o.cx-w/2+w/2,w,h,y:o.hb-h,l:o.cx-w/2}},
  house(ctx,o){const top=o.roof,hb=o.hb,hw=o.hw,cx=o.cx;const wallTop=top+(hb-top)*.24;
    const wall=polyPath([[cx-hw*.46,wallTop],[cx+hw*.46,wallTop],[cx+hw*.46,hb],[cx-hw*.46,hb]]);shape(ctx,wall,C.cream,c=>{c.fillStyle=C.saffron;c.fillRect(cx-hw*.46,wallTop,hw*.92,22);Pat.dots(c,{x:cx-hw*.46,y:wallTop,w:hw*.92,h:22},14,3,C.verm);
      Pat.tri(c,{x:cx-hw*.46,y:hb-24,w:hw*.92,h:20},22,C.verm);for(const s of [-1,1]){const x=cx+s*hw*.32;const win=polyPath([[x-38,wallTop+60],[x+38,wallTop+60],[x+38,wallTop+140],[x-38,wallTop+140]]);shape(c,win,C.indigo,cc=>{dot(cc,x,wallTop+100,14,C.turmeric);Pat.stripes(cc,{x:x-38,y:wallTop+60,w:76,h:80},19,4,C.ochre,true)},{lw:2})}},{lw:3});
    const roof=polyPath([[cx-hw*.54,wallTop+4],[cx-hw*.3,top],[cx+hw*.3,top],[cx+hw*.54,wallTop+4]]);shape(ctx,roof,C.red,c=>{Pat.scallops(c,{x:cx-hw*.55,y:top,w:hw*1.1,h:wallTop-top},26,C.saffron,3)},{lw:3});
    const d=this.door(o);const door=new Path2D();door.moveTo(d.l,hb);door.lineTo(d.l,d.y+d.w*.3);door.quadraticCurveTo(cx,d.y-d.w*.2,d.l+d.w,d.y+d.w*.3);door.lineTo(d.l+d.w,hb);door.closePath();
    shape(ctx,door,C.turmeric,c=>{Pat.dots(c,{x:d.l,y:d.y-40,w:d.w,h:d.h+40},26,3,C.saffron)},{lw:3});
    /* toran: mango leaves and marigolds over the door */
    const ty=d.y-d.w*.1;line(ctx,[[d.l-30,ty],[d.l+d.w+30,ty]],C.line,3);for(let x=d.l-24;x<=d.l+d.w+24;x+=22){const lp=sPath([[x-8,ty],[x,ty+30],[x+8,ty]],true);shape(ctx,lp,C.leaf,null,{line:'single',lw:1.6});dot(ctx,x+11,ty+4,6,C.diya);ring(ctx,x+11,ty+4,6,C.line,1.4)}},
  vessel(ctx,x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const b=sPath([[-34,-40],[-50,-14],[-46,14],[-24,30],[24,30],[46,14],[50,-14],[34,-40]],true);shape(ctx,b,C.ochre,c=>{Pat.zig(c,{x:-52,y:-20,w:104,h:20},12,C.turmeric,3,20);Pat.dots(c,{x:-52,y:4,w:104,h:26},10,2.4,C.cream)},{lw:2.4});
    shape(ctx,ellPath(0,-42,30,8),C.gold,null,{lw:2});for(let i=-2;i<=2;i++)leafShape(ctx,i*10,-46,30,-Math.PI/2+i*.35,C.leaf);ctx.restore()},
  down(p){for(const l of this.lamps){if(l.lit>=1||(!l.first&&this.firstK<1))continue;if(Math.hypot(p.x-l.x-40*l.s,p.y-l.y+20)<Math.max(70,36/L.U)){this.light(l);return}}},
  light(l){if(l.lit>0)return;l.lit=.01;AU.sfx('lamp');tw(l,{lit:1},500,'out');this.onLit&&this.onLit(l)},
  key(k){if(k==='Enter'||k===' '){const l=this.lamps.find(l=>!l.lit);if(l){this.light(l);return true}}return false}};
