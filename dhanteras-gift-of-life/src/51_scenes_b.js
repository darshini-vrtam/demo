/* ---------- SCENE 4: THE OCEAN REVEALS ITS TREASURES ---------- */
let CLIP_N=0;
function riseClip(p,w,h){/* a wrapper whose contents are hidden below its own baseline, so things can rise out of the water */
  const id='rc'+(CLIP_N++);const cp=el('clipPath',{id},Pat.defs);el('rect',{x:-w,y:-h,width:2*w,height:h+14},cp);return grp(p,{'clip-path':`url(#${id})`})}
function arch(p,r){const g=grp(p);shape(g,`M${-r} 0A${r} ${r} 0 0 1 ${r} 0Z`,TINT.paleGold,{w:4,pat:Pat.get('dots2',mix(PAL.gold,PAL.ivory,.2),null,18)});
  for(let i=0;i<=10;i++){const a=-180+i*18;const pg=grp(g,{transform:`rotate(${a+90}) translate(0 ${-r+6})`});shape(pg,petalD(r*.3,.42),i%2?PAL.pink:PAL.gold,{w:3})}return g}
const SC4={id:'DHANTERAS_SC04',mood:'treasure',
  state(){return{osp:.8,r:[0,0,0,0],fx:[0,0,0,0],bloom:.25,cl:0,cm:0,spread:0,dim:0,top:0,gold:.2}},
  build(p,S,P,W,H){const R={};const L=P?{hz:700,pos:[[230,900,.95],[662,910,.8],[230,1330,.85],[665,1345,.85]],cl:[450,1120,58],top:[450,780]}
      :{hz:400,pos:[[240,640,1.25],[612,650,1.05],[1012,640,1.15],[1372,660,1.1]],cl:[805,735,64],top:[800,470]};R.L=L;
    R.bd=backdrop(p,W,H,{hz:L.hz,sun:P?[720,230,54]:[1340,130,52],clouds:P?[[220,240,180]]:[[260,110,200],[760,90,170]]});
    R.topLotus=grp(p,{transform:`translate(${L.top[0]} ${L.top[1]})`});R.topL=lotus(R.topLotus,40,{t:0,pad:true});
    const H_=[200,230,360,320],names=['Kamadhenu','Airavata','Kalpavriksha','Goddess Lakshmi'],aria=['Kamadhenu, the wish-fulfilling cow','Airavata, the celestial elephant','Kalpavriksha, the wish-fulfilling tree','Goddess Lakshmi'];
    R.tr=L.pos.map(([x,y,s],i)=>{const outer=grp(p,{transform:`translate(${x} ${y})`});const frame=grp(outer);arch(frame,[150,170,190,170][i]);
      const clip=riseClip(outer,420,700);const inner=grp(clip);const art=grp(inner,{transform:`scale(${s})`});let ref;
      if(i===0)ref=kamadhenu(art);else if(i===1)ref=airavata(art);else if(i===2)ref=kalpavriksha(art);else ref=lakshmi(art);
      const halo=grp(inner);
      const pl=plaque(outer,0,P?46:44,names[i],P?26:24);
      hitArea(outer,R,'t'+i,aria[i]+': tap to discover its magic',0,-H_[i]*s*.55,Math.max(100,H_[i]*s*.6));
      const fs=[.85,.85,.85,.9][i]*s;tf(frame,0,0,fs);return{outer,frame,inner,art,ref,pl,x,y,s,fs}});
    /* per-treasure magic */
    const T=R.tr;
    R.cowFl=[];for(let i=0;i<7;i++){const a=Math.PI+i/6*Math.PI;const fg=grp(T[0].art);lotus(fg,22,{t:1,pad:false});R.cowFl.push({g:fg,x:Math.cos(a)*150,y:-90+Math.sin(a)*120})}
    R.eleRip=ripples(T[1].art,0,0,160,30,PAL.turq);
    R.lakH=mandala(T[3].art,150,{t:0});tf(R.lakH.g,0,-170,1);T[3].art.insertBefore(R.lakH.g,T[3].art.firstChild);
    R.clG=grp(p,{transform:`translate(${L.cl[0]} ${L.cl[1]})`});R.clM=mandala(R.clG,L.cl[2]*2.4,{t:0});R.clL=lotus(R.clG,L.cl[2],{t:0,c1:PAL.gold,c2:TINT.paleGold,vein:PAL.verm});
    return R},
  update(R,S,t,dt){const L=R.L;R.bd.update(t,dt,S);R.topL.set(S.top);op(R.topLotus,clamp(S.top*3,0,1)*(1-S.dim));
    R.tr.forEach((T,i)=>{const k=Ease.out(S.r[i]);const lift=(1-k)*(T.s*360+60);const out=(i<2?-1:1)*S.spread*(Stage.P?60:110);
      tf(T.inner,0,lift);tf(T.outer,T.x+out,T.y);op(T.frame,clamp(S.r[i]*2,0,1));tf(T.frame,0,0,T.fs*lerp(.6,1,k));
      op(T.pl,clamp(S.r[i]*2-1,0,1));op(T.outer,1-S.dim*.45)});
    const f=S.fx;R.cowFl.forEach((c,i)=>{const k=Ease.back(clamp(f[0]*1.4-i*.06,0,1));tf(c.g,c.x,c.y,Math.max(.001,k),t*.03)});
    tf(R.tr[1].ref.trunk,64,34,1,-f[1]*62+Math.sin(t*.003)*3);R.eleRip.set(f[1]>0&&f[1]<1?f[1]:0);
    R.tr[2].ref.grow(clamp(S.r[2]*1.1,0,1),Math.max(S.bloom,f[2]));
    R.lakH.set(Math.max(f[3],S.r[3]>.9?.25:0));R.lakH.spin(t*.01);tf(R.tr[3].ref.seat.g,0,0,1+f[3]*.12);
    R.clL.set(S.cl*.15);tf(R.clG,L.cl[0],L.cl[1]+(1-Ease.out(Math.min(1,S.cl*3)))*90,lerp(.6,1.5,S.cl));op(R.clG,clamp(S.cl*4,0,1));R.clM.set(S.cm);R.clM.spin(t*.01)},
  async run(x,S){
    x.tw({top:1},1600,Ease.out);x.sfx('chime');
    await x.say(TEXT.s4[0]);
    x.tw({top:0},600);
    const rise=i=>{x.sfx('chime');x.sfx('wave');return Tw.to(S.r,{[i]:1},1700,Ease.out)};
    rise(0);await x.say(TEXT.s4[1]);
    rise(1);await x.say(TEXT.s4[2]);
    rise(2);await x.say(TEXT.s4[3]);
    rise(3);x.sfx('accent');await x.say(TEXT.s4[4]);
    const fx=[1,1,1,1];
    await x.act({keys:['t0','t1','t2','t3'],multi:true,max:4,after:6500,autoKey:'t3',goLabel:'Continue',prompt:'Tap a treasure to discover its magic!',hint:'Tap the cow, the elephant, the tree or Goddess Lakshmi!',
      onHit:async k=>{const i=+k[1];x.sfx(i===3?'accent':'chime');S.fx[i]=0;await Tw.to(S.fx,{[i]:fx[i]},1400,Ease.out);await x.wait(900);if(i===1)await Tw.to(S.fx,{1:0},900)}});
    await x.say(TEXT.s4[5]);
    x.tw({dim:1},1200);x.tw({cl:.42},1600,Ease.out);x.sfx('chime');
    await x.say(TEXT.s4[6]);
    x.tw({spread:1},1800,Ease.io);x.tw({cm:1},2000,Ease.out);await x.tw({cl:1},2000,Ease.io)}};

/* ---------- SCENE 5: THE DIVINE ARRIVAL OF LORD DHANVANTARI ---------- */
const SC5={id:'DHANTERAS_SC05',mood:'divine',
  state(){return{osp:1,gold:0,rise:.3,ghost:.22,lk:0,mand:0,kd:0,joy:0,corner:0,parts:0,zoom:0,cheer:0}},
  build(p,S,P,W,H){const R={};const L=P?{hz:860,d:[450,1000,.95],clipY:912,lot:[450,920,92],m:[450,720,220],dev:[140,1150,.5],asu:[760,1150,.5],cor:[[110,1360],[790,1360]],bank:1150}
      :{hz:520,d:[800,700,1],clipY:632,lot:[800,640,104],m:[800,430,240],dev:[230,640,.78],asu:[1370,640,.78],cor:[[110,770],[1490,770]],bank:640};R.L=L;
    R.bd=backdrop(p,W,H,{hz:L.hz,sun:P?[720,230,50]:[1360,130,50],clouds:P?[[200,240,170]]:[[250,110,190],[1050,92,150]]});
    R.mG=grp(p,{transform:`translate(${L.m[0]} ${L.m[1]})`});R.m=mandala(R.mG,L.m[2],{t:0});
    R.rays=grp(R.mG);for(let i=0;i<24;i++){const pg=grp(R.rays,{transform:`rotate(${i*15})`});shape(pg,`M-10 ${-L.m[2]*1.02}L0 ${-L.m[2]*1.22}L10 ${-L.m[2]*1.02}Z`,i%2?PAL.gold:PAL.verm,{w:2.6,dbl:false})}
    bank(p,-10,L.dev[0]+(P?110:200),L.bank);bank(p,L.asu[0]-(P?110:200),W+10,L.bank);
    R.devG=grp(p,{transform:`translate(${L.dev[0]} ${L.bank})`});R.dev=crowd(R.devG,'deva',3,1,P?52:90,L.dev[2]);
    R.asuG=grp(p,{transform:`translate(${L.asu[0]} ${L.bank})`});R.asu=crowd(R.asuG,'asura',3,-1,P?52:90,L.asu[2]);
    const id='dclip'+(CLIP_N++);const cp=el('clipPath',{id},Pat.defs);el('rect',{x:-200,y:-200,width:W+400,height:L.clipY+200},cp);
    R.dWrap=grp(p,{'clip-path':`url(#${id})`});R.dG=grp(R.dWrap);R.dh=dhanvantari(R.dG);
    R.parts=[];const rr=rng(12);for(let i=0;i<14;i++){const g=grp(p);el('path',{d:'M0 -10L5 0L0 10L-5 0Z',fill:i%2?PAL.gold:PAL.ivory,stroke:PAL.ink,'stroke-width':1.8},g);R.parts.push({g,x:L.m[0]+(rr()-.5)*(P?700:1100),ph:rr()})}
    R.lot=grp(p,{transform:`translate(${L.lot[0]} ${L.lot[1]})`});R.lotus=lotus(R.lot,L.lot[2],{t:0,wide:true,noPod:true,c1:PAL.gold,c2:TINT.paleGold,vein:PAL.verm,pad:true});
    hitArea(p,R,'dlotus','The divine golden lotus: help it bloom',L.lot[0],L.lot[1]-L.lot[2]*.5,P?120:120);
    R.cor=L.cor.map(([x,y],i)=>{const g=grp(p,{transform:`translate(${x} ${y})`});return lotus(g,P?46:56,{t:0,seed:i+5})});
    return R},
  update(R,S,t,dt){const L=R.L;R.bd.update(t,dt,S);
    const fy=lerp(L.d[1]+(Stage.P?520:380),L.d[1],Ease.out(S.rise));tf(R.dG,L.d[0],fy,L.d[2]);op(R.dG,S.ghost);
    R.lotus.set(S.lk);R.m.set(S.mand*(1-S.zoom*.6));R.m.spin(RM?0:t*.008);tf(R.rays,0,0,Math.max(.001,S.mand),RM?0:-t*.005);op(R.rays,S.mand);
    R.dh.kalash.light(S.kd);op(R.dh.kalash.sparks,.5+.5*Math.sin(t*.006));
    R.cor.forEach(c=>c.set(S.corner));
    R.parts.forEach(P=>{const u=(t*.00018+P.ph)%1;const tx=lerp(P.x,L.m[0],u*.7),ty=lerp(L.clipY+40,L.m[1],u);tf(P.g,tx,ty,1,u*360);op(P.g,S.parts*Math.sin(u*Math.PI))});
    const pose=S.cheer>.5?'cheer':S.joy>.5?'namaste':'stand';R.dev.pose(pose,1,t);R.asu.pose(pose,1,t);R.dev.hop(t,S.cheer*9);R.asu.hop(t+400,S.cheer*9)},
  async run(x,S){
    await x.tw({osp:0},2200,Ease.out);x.tw({gold:1},2400);x.sfx('chime');
    await x.say(TEXT.s5[0]);
    await x.act({keys:['dlotus'],prompt:'Help the divine lotus bloom!',hint:'Tap the golden lotus in the middle!',
      onHit:async()=>{x.sfx('accent');x.tw({ghost:1},1400);x.tw({rise:1},2200,Ease.out);x.tw({parts:1},1200);x.tw({corner:1},2200);await par(x.tw({lk:1},1800,Ease.out),x.tw({mand:1},2200,Ease.out))}});
    x.tw({joy:1},400);
    await x.say(TEXT.s5[1]);
    x.sfx('chime');x.tw({kd:1},2600,Ease.lin);
    await x.say(TEXT.s5[2]);
    await x.say(TEXT.s5[3]);
    x.tw({cheer:1},300);x.sfx('chime');
    await x.say(TEXT.s5[4]);
    x.tw({cheer:0},500);
    await x.say(TEXT.s5[5]);
    const L=x.R().L;const ky=L.d[1]-158*L.d[2];
    x.tw({zoom:1,parts:0},1800);await x.tw({cz:Stage.P?2.6:3,cx:L.d[0],cy:ky},2200,Ease.io)}};

/* ---------- SCENE 6: WHAT IS TRUE WEALTH? ---------- */
const MOTIF_POS=[[-30,-6],[0,-12],[30,-6],[-15,10],[15,10]];
const SC6={id:'DHANTERAS_SC06',mood:'reflect',
  state(){const kept=Store.data.treasures.filter(k=>SYMBOL_ORDER.includes(k));const S={osp:.6,cz:1.7,picked:kept.slice(),fly:{},mot:{},ring:0,show:0,elab:0,dh:0};
    SYMBOL_ORDER.forEach(k=>{S.fly[k]=0;S.mot[k]=kept.includes(k)?1:0});S.elab=kept.length/5;return S},
  build(p,S,P,W,H){const R={};const L=P?{hz:1000,pot:[450,520,1.3],dh:[760,700,.55],sym:[[170,860],[450,880],[730,860],[300,1150],[600,1150]],fr:70}
      :{hz:640,pot:[720,330,1.45],dh:[1390,760,.74],sym:[[300,520],[500,640],[720,690],[940,640],[1140,520]],fr:70};R.L=L;
    if(!S._init){S._init=1;S.cx=L.pot[0];S.cy=L.pot[1]}
    R.bd=backdrop(p,W,H,{hz:L.hz,sun:null,clouds:P?[[200,250,170],[700,260,150]]:[[240,120,180],[1220,110,170]]});
    R.mG=grp(p,{transform:`translate(${L.pot[0]} ${L.pot[1]})`});R.m=mandala(R.mG,P?250:280,{t:1,bg:mix(PAL.ivory,PAL.gold,.25)});op(R.mG,.55);
    R.dG=grp(p,{transform:`translate(${L.dh[0]} ${L.dh[1]}) scale(${L.dh[2]})`});const dl=lotus(R.dG,80,{t:1});R.dh=dhanvantari(R.dG,{offer:true});
    R.potG=grp(p,{transform:`translate(${L.pot[0]} ${L.pot[1]})`});R.potRing=mandala(R.potG,120,{t:0,pal:[PAL.gold,PAL.verm,PAL.pink,PAL.turq]});tf(R.potRing.g,0,-10,1.45*L.pot[2]/1.45);
    R.pot=kalash(R.potG,L.pot[2]);
    R.mot={};SYMBOL_ORDER.forEach((k,i)=>{const g=grp(R.pot.motifs);SYMBOLS[k].motif(g);R.mot[k]=g});
    R.syms={};SYMBOL_ORDER.forEach((k,i)=>{const[x,y]=L.sym[i];const g=grp(p,{transform:`translate(${x} ${y})`});const fr=lotusFrame(g,L.fr,PAL.gold);
      const ic=grp(g,{transform:'scale(.82)'});SYMBOLS[k].draw(ic);const tick=grp(g,{transform:`translate(${L.fr*.72} ${-L.fr*.72})`});dot(tick,0,0,20,PAL.leaf,{stroke:PAL.ink,w:3});line(tick,'M-9 0L-2 7L10 -7',{w:4.5,c:PAL.ivory});
      const pl=plaque(g,0,L.fr+38,SYMBOLS[k].label,22);
      hitArea(g,R,'sym_'+k,SYMBOLS[k].label+': put it in your treasure pot',0,0,L.fr+16);
      const fl=grp(p);SYMBOLS[k].draw(grp(fl,{transform:'scale(.4)'}));op(fl,0);
      R.syms[k]={g,tick,fl,x,y,fr}});
    return R},
  update(R,S,t,dt){const L=R.L;R.bd.update(t,dt,S);R.m.spin(RM?0:t*.006);
    const[px,py,ps]=L.pot;R.pot.light(clamp(S.elab,0,1));R.potRing.set(clamp(S.elab*1.1,0,1)*.9+S.ring*.1);R.potRing.spin(t*.01);
    op(R.pot.sparks,.5+.5*Math.sin(t*.006));
    SYMBOL_ORDER.forEach((k,i)=>{const Y=R.syms[k];const on=S.picked.includes(k);op(Y.tick,on?1:0);
      const f=S.fly[k];if(f>0&&f<1){const wx=px,wy=py+32*ps;const u=Ease.io(f);tf(Y.fl,lerp(Y.x,wx,u),lerp(Y.y,wy,u)-Math.sin(u*Math.PI)*120,lerp(1.4,.5,u),u*360);op(Y.fl,1)}else op(Y.fl,0);
      const m=S.mot[k];const[mx,my]=MOTIF_POS[i];const ang=i/5*TAU-Math.PI/2+t*.0006*S.ring;const rx=lerp(mx,Math.cos(ang)*26,S.ring),ry=lerp(my,Math.sin(ang)*14,S.ring);
      tf(R.mot[k],rx,ry,Math.max(.001,Ease.back(clamp(m,0,1))),S.ring*t*.02);op(R.mot[k],m>0?1:0);
      tf(Y.g,Y.x,Y.y+Math.sin(t*.002+i)*3,1)})},
  async run(x,S){
    x.tw({cz:1,cx:Stage.W/2,cy:Stage.H/2},2400,Ease.io);
    await x.say(TEXT.s6[0]);
    await x.say(TEXT.s6[1]);
    await x.say(TEXT.s6[2]);
    const free=SYMBOL_ORDER.filter(k=>!S.picked.includes(k));
    if(free.length){let first=true;
      await x.act({keys:free.map(k=>'sym_'+k),multi:true,max:free.length,after:7000,autoKey:'sym_'+(free.includes('health')?'health':free[0]),goLabel:'Done',
        prompt:'What makes life truly precious? Choose your treasures!',hint:'Tap any treasure. Every one is a good choice!',
        onHit:async key=>{const k=key.slice(4);if(!S.picked.includes(k))S.picked.push(k);Store.setTreasures(S.picked);x.sfx('pop');
          if(first){first=false;$('instrText').textContent='Wonderful! Every treasure has its own value.'}
          await Tw.to(S.fly,{[k]:1},1100,Ease.lin);S.fly[k]=0;x.sfx('chime');Tw.to(S,{elab:S.picked.length/5},700);await Tw.to(S.mot,{[k]:1},700,Ease.out)}})}
    await x.say(TEXT.s6[3]);
    await x.say(TEXT.s6[4]);
    x.sfx('chime');await x.tw({ring:1},1800,Ease.io);await x.wait(500)}};

/* ---------- SCENE 7: THE GIFT OF LIFE ---------- */
const SC7={id:'DHANTERAS_SC07',mood:'festive',
  state(){return{osp:.8,cz:2.2,mand:0,corner:0,dl:[0,0,0],msg:0,gold:.25,cheer:0}},
  build(p,S,P,W,H){const R={};const L=P?{hz:820,m:[450,760,230],d:[450,1080,.78],sh:[180,1180,.58],vi:[720,1180,.58],dev:[130,860,.36],asu:[770,860,.36],dy:[[170,1390],[450,1430],[730,1390]],ds:.72,cor:[[90,1250],[810,1250]],box:[450,330,800,340]}
      :{hz:600,m:[800,410,250],d:[800,700,.88],sh:[470,705,.78],vi:[1130,705,.78],dev:[150,640,.5],asu:[1450,640,.5],dy:[[300,742],[800,768],[1300,742]],ds:.75,cor:[[640,760],[960,760]],box:[800,180,1180,200]};R.L=L;
    if(!S._init){S._init=1;S.cx=L.d[0];S.cy=L.d[1]-158*L.d[2]}
    R.bd=backdrop(p,W,H,{hz:L.hz,sun:null,clouds:P?[[200,560,160],[700,560,150]]:[[180,300,170],[1420,300,170]]});
    R.mG=grp(p,{transform:`translate(${L.m[0]} ${L.m[1]})`});R.m=mandala(R.mG,L.m[2],{t:0});
    bank(p,-10,L.dev[0]+(P?90:170),L.dev[1]);bank(p,L.asu[0]-(P?90:170),W+10,L.asu[1]);
    R.devG=grp(p,{transform:`translate(${L.dev[0]} ${L.dev[1]})`});R.dev=crowd(R.devG,'deva',3,1,P?40:62,L.dev[2]);
    R.asuG=grp(p,{transform:`translate(${L.asu[0]} ${L.asu[1]})`});R.asu=crowd(R.asuG,'asura',3,-1,P?40:62,L.asu[2]);
    const stand=(pos,fn,lr)=>{const g=grp(p,{transform:`translate(${pos[0]} ${pos[1]}) scale(${pos[2]})`});lotus(g,lr,{t:1});return fn(g)};
    R.sh=stand(L.sh,shiva,70);R.sh.setBlue(1);R.vi=stand(L.vi,vishnu,70);R.dh=stand(L.d,dhanvantari,84);
    R.cor=L.cor.map(([x,y],i)=>lotus(grp(p,{transform:`translate(${x} ${y})`}),P?40:46,{t:0,seed:i+9}));
    R.dy=L.dy.map(([x,y],i)=>{const g=grp(p,{transform:`translate(${x} ${y})`});const D=diya(g,L.ds);hitArea(p,R,'diya'+i,'Diya '+(i+1)+': light it to spread the light',x,y-30*L.ds,P?78:74);return D});
    /* closing message cartouche */
    const[bx,by,bw,bh]=L.box;R.msg=grp(p,{transform:`translate(${bx} ${by})`});
    shape(R.msg,`M${-bw/2+30} ${-bh/2}H${bw/2-30}Q${bw/2} ${-bh/2} ${bw/2} ${-bh/2+30}V${bh/2-30}Q${bw/2} ${bh/2} ${bw/2-30} ${bh/2}H${-bw/2+30}Q${-bw/2} ${bh/2} ${-bw/2} ${bh/2-30}V${-bh/2+30}Q${-bw/2} ${-bh/2} ${-bw/2+30} ${-bh/2}Z`,PAL.ivory,{w:6});
    el('rect',{x:-bw/2+12,y:-bh/2+12,width:bw-24,height:bh-24,rx:20,fill:'none',stroke:PAL.gold,'stroke-width':5,'stroke-dasharray':'2 12','stroke-linecap':'round'},R.msg);
    const lines=P?['May your home shine with light,','your family be blessed with health,','and your heart overflow with kindness.']:['May your home shine with light, your family be blessed with health,','and your heart overflow with kindness.'];
    const fs=P?36:30,gy=P?-bh/2+64:-bh/2+44;lines.forEach((s,i)=>txt(R.msg,0,gy+i*(fs*1.3),s,{size:fs,weight:600}));
    const gl=P?['HAPPY DHANTERAS,','LITTLE OCEAN EXPLORERS!']:['HAPPY DHANTERAS, LITTLE OCEAN EXPLORERS!'];const gs=P?50:42;
    gl.forEach((s,i)=>txt(R.msg,0,gy+lines.length*fs*1.3+gs*.95+i*gs*1.15,s,{size:gs,font:'"Yatra One",Georgia,serif',weight:400,fill:PAL.verm,ls:1}));
    R.msgAria=el('title',{},R.msg);R.msgAria.textContent='May your home shine with light, your family be blessed with health, and your heart overflow with kindness. Happy Dhanteras, little Ocean Explorers!';
    return R},
  update(R,S,t,dt){const L=R.L;R.bd.update(t,dt,S);R.m.set(S.mand);R.m.spin(RM?0:t*.006);R.cor.forEach(c=>c.set(S.corner));
    R.dy.forEach((D,i)=>D.set(Ease.out(clamp(S.dl[i],0,1)),t));
    if(R.dh.kalash){R.dh.kalash.light(1);op(R.dh.kalash.sparks,.5+.5*Math.sin(t*.006))}
    R.vi.set(t,0);const pose=S.cheer>.5?'cheer':'namaste';R.dev.pose(pose,1,t);R.asu.pose(pose,1,t);R.dev.hop(t,S.cheer*7);R.asu.hop(t+400,S.cheer*7);
    const k=Ease.back(clamp(S.msg,0,1));tf(R.msg,L.box[0],L.box[1]+(1-k)*-30,Math.max(.001,lerp(.85,1,k)));op(R.msg,clamp(S.msg*2,0,1))},
  async run(x,S){
    x.tw({cz:1,cx:Stage.W/2,cy:Stage.H/2},2600,Ease.io);x.tw({mand:1},2800,Ease.out);x.tw({corner:1},2600);
    await x.say(TEXT.s7[0]);
    const lightRest=async first=>{for(let i=0;i<3;i++){if(i===first||S.dl[i]>=1)continue;await x.wait(380);x.sfx('diya');Tw.to(S.dl,{[i]:1},900,Ease.out)}};
    await x.act({keys:['diya0','diya1','diya2'],autoKey:'diya1',prompt:'Tap a diya to spread the light!',hint:'Tap one of the little clay lamps!',
      onHit:async k=>{const i=+k.slice(-1);x.sfx('diya');await Tw.to(S.dl,{[i]:1},900,Ease.out);await lightRest(i);await x.wait(700)}});
    x.tw({cheer:1},300);x.tw({gold:.6},1500);
    await x.say(TEXT.s7[1]);
    x.sfx('accent');x.tw({msg:1},1400,Ease.out);x.tw({cheer:0},600);
    await x.say(TEXT.s7[2]);
    await x.wait(900)}};

const SCENES=[SC1,SC2,SC3,SC4,SC5,SC6,SC7];
