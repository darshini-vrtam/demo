/* ===== EPISODE 1, scenes 1.5 to 1.8 ===== */

/* ---------- the shore and the ocean, shared by 1.6 and 1.7 ---------- */
const VN=n=>{const a=[];for(let i=0;i<n;i++)a.push(vanaraCfg(i));return a};
function scOcean(){const s=mkScene('1.6',{frame:'fish'});artPart(s);const back=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp),top=grp(s.comp);
  skyBg(s,{kind:'ocean',horizon:[300,560],sea:'day',seaN:6,clouds:[[.1,.4,260],[.45,.3,320],[.8,.46,240]]});
  const rama=cast(s,'rama',CAST.rama,mid),lak=cast(s,'lak',CAST.lak,mid),han=cast(s,'hanuman',CAST.hanuman,mid);
  const vans=VN(5).map((c,i)=>cast(s,'vanaras',c,mid));
  s.pos=()=>LP({rama:[560,756,.95,1],lak:[420,760,.9,1],han:[720,752,.95,1],han0:[1900,300],van:[[920,766,1,-1],[1060,772,1,-1],[1200,766,1,-1],[1340,772,1,-1],[1480,766,1,-1]],lanka:[1450,300],
      lines:[[[700,620],[1450,300]],[[760,640],[1470,302]],[[820,660],[1490,304]]]},
    {rama:[330,1336,.95,1],lak:[170,1350,.9,1],han:[500,1326,.95,1],han0:[1200,500],van:[[660,1350,1,-1],[800,1370,1,-1],[920,1340,1,-1],[740,1470,1,-1],[880,1480,1,-1]],lanka:[720,560],
      lines:[[[520,1150],[720,560]],[[580,1160],[740,562]],[[640,1170],[760,564]]]});
  onOrient(s,[back,fore,top],P_=>{const p=s.pos();const ls=lankaSkyline(back,LP(400,320),LP(170,170),{n:6});tf(ls,p.lanka[0],p.lanka[1],1);
    /* the shore: a patterned sand band with stones and branches ready to use */
    const sh=grp(back);shp(sh,P_?'M-40 1160Q300 1120 600 1150Q860 1170 1040 1140V1540H-40Z':'M-40 650Q400 610 900 640Q1400 670 1820 630V840H-40Z',Pat.u('dots',P.terra,P.marigold,1),4);
    ln(sh,P_?'M-40 1170Q300 1130 600 1160Q860 1180 1040 1150':'M-40 660Q400 620 900 650Q1400 680 1820 640',P.ivory,4,{'stroke-dasharray':'.1 14'});
    s.lines=p.lines.map(([a,b])=>{const d=`M${a[0]} ${a[1]}Q${(a[0]+b[0])/2} ${Math.min(a[1],b[1])+LP(40,0)} ${b[0]} ${b[1]}`;const e=ln(top,d,P.turmeric,5,{'stroke-dasharray':'.1 16'});let len=1500;try{len=e.getTotalLength()}catch(_){}
      const m=el('mask',{id:uid('m')},top);const mp=ln(m,d,'#fff',14,{'stroke-dasharray':`${len} ${len}`,'stroke-dashoffset':len});e.setAttribute('mask',`url(#${m.id})`);return{mp,len}});
    const piles=P_?[[90,1470],[960,1250]]:[[230,800],[1680,800]];piles.forEach(([x,y],j)=>{for(let i=0;i<4;i++){const st=stone(fore,i+j,LP(86,80),LP(56,52));tf(st.g,x+(i%2?44:-36)+(i>1?10:0),y-(i>1?40:0),1)}
      const br=grp(fore,{transform:`translate(${x+LP(90,-90)} ${y-6}) rotate(${LP(-70,70)})`});drawProp(br,'branch',{})});
    put(rama,p.rama);put(lak,p.lak);put(han,p.han);vans.forEach((v,i)=>put(v,p.van[i]))});
  s.lineK=0;s.tick=()=>{(s.lines||[]).forEach(l=>l.mp.setAttribute('stroke-dashoffset',f1(l.len*(1-(s.lineK||0)))))};
  vans.forEach((v,i)=>v.set('wait',0));return s}
async function shot1_6(){mood('energetic');Amb.set('ocean');let s=D.scene;if(!s||s.id!=='1.6')s=D.setScene(scOcean(),900);const {rama,lak,hanuman:han}=s.cast;const vans=[].concat(s.cast.vanaras);const p=s.pos();
  s.cam.z=2;s.cam.fx=p.rama[0];s.cam.fy=p.rama[1]-150;D.go(s.cam,{z:1,fx:LP(889,500),fy:LP(405,750)},3200,'io');
  han.x=p.han0[0];han.y=p.han0[1];han.f=-1;vans.forEach(v=>{v.x+=LP(600,500)});rama.set('idle',0);
  const land=(async()=>{han.set('leap',0);const o={k:0};const a=p.han0,b=p.han;const iv=setInterval(()=>{han.x=lerp(a[0],b[0],o.k);han.y=lerp(a[1],b[1],o.k)-Math.sin(o.k*Math.PI)*100},16);AU.sfx('whoosh');
    await D.tw(o,{k:1},1500,'io');clearInterval(iv);han.x=b[0];han.y=b[1];han.set('land',200);AU.sfx('land');await D.wait(300);han.set('speakGently',600)})();
  await say("Hanuman returned with news of Sita.");await land;
  await say("Rama now knew where she was.",[["knew",()=>{rama.nod();rama.set('determined',600)}]]);
  han.turn(1);han.set('pointAhead',700);await hold(500);
  /* the camera sweeps across the ocean towards Lanka and back */
  const sweep=D.tw(s.cam,{z:1.5,fx:p.lanka[0],fy:p.lanka[1]+LP(120,200)},3000,'io');
  await say("But there was one enormous challenge. How could the army cross the ocean and reach Lanka?",[["challenge",()=>{rama.set('concerned',700);lak.set('concerned',700)}]]);
  await sweep;await D.tw(s.cam,{z:1,fx:LP(889,500),fy:LP(405,750)},2400,'io');han.set('idle',500);
  vans.forEach((v,i)=>{v.f=-1;goWalk(v,p.van[i][0],p.van[i][1],2600+i*200)});
  await say("The vanaras came together with a plan. They would build a bridge using stones and rocks.",[["a plan",()=>{rama.set('idle',600);lak.set('idle',600)}],["build a bridge",()=>{D.go(s,{lineK:1},4200,'io');vans[2].set('pointAhead',600)}]]);
  await say("Every helper had a part to play. Some carried stones, some moved branches, and others helped arrange the path.",[["carried stones",()=>{vans[0].hold('f','stone',{v:0});vans[0].set('carryStone',600);vans[3].hold('f','stone',{v:3});vans[3].set('carryStone',600)}],
    ["moved branches",()=>{vans[1].hold('f','branch');vans[1].set('carryBranch',600)}],["arrange the path",()=>{vans[4].set('pointAhead',600);vans[2].set('wait',600)}]]);
  vans.forEach((v,i)=>{if(v.props.f){v.turn(1);goWalk(v,v.x+LP(80,40),v.y,2400)}});
  await say("One by one, the pieces came together.",[["came together",()=>{rama.nod();han.set('rejoice',600)}]]);
  await hold(1400);await D.late();
  /* a patterned stone moves forward and becomes the first interactive stone */
  const st=stone(s.top,1,120,80);const o={x:LP(300,200),y:LP(780,1460),k:.6};const iv=setInterval(()=>tf(st.g,o.x,o.y,o.k),16);
  await D.tw(o,{x:LP(889,500),y:LP(500,800),k:4},1500,'io');clearInterval(iv)}

/* ---------- Activity 1.7: Build the Bridge to Lanka (six gaps) ---------- */
const BRIDGE_N=11,BRIDGE_GAPS=[2,3,5,6,8,9];
function scBridge(){const s=mkScene('1.7',{frame:'fish'});artPart(s);const back=grp(s.comp),brG=grp(s.comp),mid=grp(s.comp),trayG=grp(s.comp),fx=grp(s.comp);
  skyBg(s,{kind:'ocean',horizon:[250,480],sea:'day',seaN:6,clouds:[[.12,.4,240],[.5,.3,300]]});
  const B={placed:{},active:false,sel:-1,drag:-1,lastNudge:-1e9,stones:[],slots:[]};s.B=B;
  const rama=cast(s,'rama',CAST.rama,mid),han=cast(s,'hanuman',CAST.hanuman,mid);const vans=VN(3).map(c=>cast(s,'vanaras',c,mid));
  s.pos=()=>LP({a:[300,650],b:[1560,380],w0:150,w1:104,tray:[[430,748],[620,748],[810,748],[1000,748],[1190,748],[1380,748]],tw:132,rama:[100,640,.6,1],han:[200,646,.6,1],
      van:[[1650,780,.78,-1],[430,612,.5,1],[810,532,.44,1]],lanka:[1560,250],shore:'M-40 600Q120 560 330 620Q300 700 -40 720Z'},
    {a:[220,1170],b:[800,520],w0:140,w1:96,tray:[[300,1340],[520,1340],[740,1340],[300,1450],[520,1450],[740,1450]],tw:128,rama:[70,1290,.56,1],han:[170,1300,.56,1],
      van:[[920,1300,.62,-1],[288,1100,.48,1],[484,894,.44,1]],lanka:[820,480],shore:'M-40 1100Q140 1080 300 1150Q260 1260 -40 1290Z'});
  const at=i=>{const p=s.pos();const u=i/(BRIDGE_N-1);return{x:lerp(p.a[0],p.b[0],u),y:lerp(p.a[1],p.b[1],u),w:lerp(p.w0,p.w1,u)}};s.at=at;
  onOrient(s,[back,brG,trayG,fx],P_=>{const p=s.pos();const ls=lankaSkyline(back,LP(420,320),LP(190,180),{n:6});tf(ls,p.lanka[0],p.lanka[1],1);shp(back,p.shore,Pat.u('dots',P.terra,P.marigold,1),4);
    /* the bridge: fixed stones and six clearly visible empty slots */
    B.flow=null;B.slots=[];const fixed=grp(brG);const slotG=grp(brG);const placedG=grp(brG);B.placedG=placedG;
    for(let i=0;i<BRIDGE_N;i++){const q=at(i);if(BRIDGE_GAPS.includes(i)){const g=grp(slotG,{transform:`translate(${f1(q.x)} ${f1(q.y)})`});const d=stoneD(q.w,q.w*.64,i);
        shp(g,d,Pat.u('wave',P.peacock,P.indigo,.5),4,{'stroke-dasharray':'10 8'});ln(g,d,P.turmeric,3,{'stroke-dasharray':'.1 12'});B.slots.push({i,x:q.x,y:q.y,w:q.w,g})}
      else{const st=stone(fixed,i,q.w,q.w*.64,true);tf(st.g,q.x,q.y,1)}}
    const fd=`M${p.a[0]} ${p.a[1]}L${p.b[0]} ${p.b[1]}`;B.flow=ln(brG,fd,P.turmeric,6,{'stroke-dasharray':'.1 18'});op(B.flow,0);
    Object.keys(B.placed).forEach(k=>{const sl=B.slots.find(x=>x.i===+k);if(sl)s.placeVisual(sl,B.placed[k],true)});
    /* the movable stones, apart from the bridge */
    B.stones=p.tray.map((q,i)=>{const prev=B.stones[i];const g=grp(trayG);const st=stone(g,i,p.tw,p.tw*.64,true);const sel=circ(g,0,0,p.tw*.62,'none',6,{stroke:P.turmeric,'stroke-dasharray':'.1 14'});op(sel,0);
      return{i,g,sel,home:q,x:q[0],y:q[1],k:1,used:prev?prev.used:false}});B.stones.forEach(o=>{op(o.g,o.used?0:1)});
    B.tg=target(fx,70);put(rama,p.rama);put(han,p.han);vans.forEach((v,i)=>put(v,p.van[i]))});
  s.placeVisual=(sl,v,instant)=>{const g=grp(B.placedG,{transform:`translate(${f1(sl.x)} ${f1(sl.y)})`});const st=stone(g,v,sl.w,sl.w*.64,true);sl.g.style.display='none';
    const o={k:instant?1:1.25};const iv=setInterval(()=>tf(st.g,0,0,o.k),16);tw(o,{k:1},instant?1:520,'back').then(()=>clearInterval(iv));
    /* decorative lines connect it to its neighbours */
    const lk=ln(g,`M${-sl.w*.62} 0H${sl.w*.62}`,P.turmeric,5,{'stroke-dasharray':'.1 12'});g.insertBefore(lk,g.firstChild)};
  s.F=fxLayer(s);s.hand=demoHand(s);
  s.tick=(dt,t)=>{B.stones.forEach(o=>{if(o.used)return;const lift=o===B.stones[B.drag]||o.i===B.sel;tf(o.g,o.x,o.y-(lift?10:0)+Math.sin(t*1.4+o.i)*3*MV(),o.k*(lift?1.08:1));op(o.sel,lift||(B.active&&B.pulse===o.i)?1:B.active?.35:0)});
    if(B.flow){op(B.flow,B.flowK||0);B.flow.setAttribute('stroke-dashoffset',f1(-t*40*MV()))}
    const free=B.slots.filter(sl=>!B.placed[sl.i]);if(B.tg){const sl=free[Math.floor(t/1.8)%Math.max(1,free.length)];if(B.active&&sl){B.tg.x=sl.x;B.tg.y=sl.y;B.tg.on=lerp(B.tg.on,B.sel>=0||B.drag>=0?1:.6,.1)}else B.tg.on=lerp(B.tg.on,0,.2);B.tg.update(t)}
    B.pulse=Math.floor(t/1.4)%6};
  s.freeStone=()=>B.stones.find(o=>!o.used);
  s.place=async(stoneIdx,slot)=>{const o=B.stones[stoneIdx];if(!o||o.used||B.placed[slot.i]!=null)return;B.placed[slot.i]=-1;const k={x:o.x,y:o.y,s:1};
    await tw(o,{x:slot.x,y:slot.y,k:slot.w/s.pos().tw},420,'io');o.used=true;op(o.g,0);B.placed[slot.i]=o.i;s.placeVisual(slot,o.i,false);AU.sfx('settle');
    s.F.burst(slot.x,slot.y-20,5,'spark',2.6);B.sel=-1;const n=Object.values(B.placed).filter(v=>v>=0).length;D.counter(`${n} of 6 stones`);vans[1].set(n%2?'pointAhead':'rejoice',400);
    Hot.dirty=true;if(n===6)B.done&&B.done()};
  s.back=o=>{AU.sfx('float');tw(o,{x:o.home[0],y:o.home[1],k:1},700,'io');if(T.now-B.lastNudge>3200){B.lastNudge=T.now;vans[0].set('speakGently',300);Timers.add(1500,()=>vans[0].set('carryStone',400));
      D.say([['narr',"Almost! Try one of the empty spaces in the bridge."]]).catch(()=>{})}};
  const near=(pt,x,y,r)=>Math.hypot(pt.x-x,pt.y-y)<r;
  s.down=pt=>{if(!B.active)return;const p=s.pos();const hit=B.stones.find(o=>!o.used&&near(pt,o.x,o.y,p.tw*.62));if(hit){B.drag=hit.i;B.d0=[pt.x,pt.y];B.moved=false;AU.sfx('click');return}
    const sl=B.slots.find(x=>B.placed[x.i]==null&&near(pt,x.x,x.y,x.w*.7));if(sl){const o=B.sel>=0?B.stones[B.sel]:s.freeStone();if(o)s.place(o.i,sl).catch(()=>{});return}};
  s.move=pt=>{if(B.drag<0)return;const o=B.stones[B.drag];if(Math.hypot(pt.x-B.d0[0],pt.y-B.d0[1])>14)B.moved=true;if(B.moved){o.x=pt.x;o.y=pt.y}};
  s.up=pt=>{if(B.drag<0)return;const o=B.stones[B.drag];B.drag=-1;if(!B.moved){B.sel=B.sel===o.i?-1:o.i;return}
    const sl=B.slots.filter(x=>B.placed[x.i]==null).sort((a,b)=>Math.hypot(a.x-o.x,a.y-o.y)-Math.hypot(b.x-o.x,b.y-o.y))[0];
    if(sl&&Math.hypot(sl.x-o.x,sl.y-o.y)<sl.w*.85)s.place(o.i,sl).catch(()=>{});else s.back(o)};
  s.hots=()=>{if(!B.active)return[];const out=B.stones.filter(o=>!o.used).map(o=>({id:'st'+o.i,x:o.home[0],y:o.home[1],r:s.pos().tw*.55,label:'Patterned stone '+(o.i+1),on:()=>{B.sel=o.i}}));
    B.slots.filter(sl=>B.placed[sl.i]==null).forEach(sl=>out.push({id:'sl'+sl.i,x:sl.x,y:sl.y,r:sl.w*.5,label:'Empty space in the bridge',on:()=>{const o=B.sel>=0?B.stones[B.sel]:s.freeStone();if(o)s.place(o.i,sl).catch(()=>{})}}));return out};
  rama.set('idle',0);han.set('idle',0);vans[0].hold('f','stone',{v:4});vans[0].set('carryStone',0);vans[1].set('pointAhead',0);vans[2].set('wait',0);return s}
async function shot1_7(){mood('inviting');Amb.set('bridge');const s=D.setScene(scBridge(),700);const B=s.B;const {rama,hanuman:han}=s.cast;const vans=[].concat(s.cast.vanaras);
  await hold(500);
  await say("The bridge is almost ready! Can you help the vanaras place the stones in the empty spaces?",[["help the vanaras",()=>{rama.set('bless',600);han.set('speakGently',600)}]]);
  D.instr('Drag a stone into an empty space, or tap a stone and then a space','0 of 6 stones','drag');B.active=true;Hot.dirty=true;
  await D.task({hint:"Pick up a patterned stone and drop it into a gap in the bridge.",
    start(t){B.done=()=>t.finish()},demo(){const o=s.freeStone();const sl=B.slots.find(x=>B.placed[x.i]==null);if(o&&sl)s.hand.drag([[o.x,o.y],[sl.x,sl.y]],1300)},
    assist(t){const step=()=>{if(t.done)return;const o=s.freeStone();const sl=B.slots.find(x=>B.placed[x.i]==null);if(o&&sl)s.place(o.i,sl).then(()=>Timers.add(800,step)).catch(()=>{})};step()}});
  B.active=false;D.clearAct();Hot.dirty=true;
  /* the bridge is continuous: patterns travel along it and everyone celebrates */
  AU.sfx('success');D.go(B,{flowK:1},1200);await hold(600);vans.forEach((v,i)=>Timers.add(i*150,()=>v.set('rejoice',500)));rama.set('rejoice',600);han.set('rejoice',600);AU.sfx('celebrate');await hold(1200);
  await say("Look at what you have helped create! Every stone mattered, and every helper made a difference.");
  await hold(1600);await D.late();
  /* the camera follows the bridge towards Lanka's gates */
  const p=s.pos();await D.tw(s.cam,{z:2.2,fx:p.b[0],fy:p.b[1]},2200,'io')}

/* ---------- Scene 1.8: The Journey to Lanka (cliffhanger) ---------- */
function scMarch(){const s=mkScene('1.8',{frame:'lanka'});artPart(s);const back=grp(s.comp),bridgeG=grp(s.comp),mid=grp(s.comp),fore=grp(s.comp);
  skyBg(s,{kind:'lanka',horizon:[470,700],sea:'night',seaN:5,life:.7,clouds:[[.15,.3,240],[.5,.18,300]],stars:10});
  const rama=cast(s,'rama',CAST.rama,mid),lak=cast(s,'lak',CAST.lak,mid),han=cast(s,'hanuman',CAST.hanuman,mid);const vans=VN(5).map(c=>cast(s,'vanaras',c,mid));
  /* marching order: Rama leads, further along the bridge; the followers are nearer and overlap the leaders */
  const order=[rama,lak,han,vans[0],vans[1],vans[2],vans[3],vans[4]];order.forEach(f=>mid.appendChild(f.g));
  s.pos=()=>LP({path:[[-120,790],[300,730],[700,650],[1000,580],[1240,520]],gate:[1420,500,.95],stop:.8,s0:1.05,s1:.62},
    {path:[[-60,1540],[200,1380],[380,1200],[460,1020],[500,880]],gate:[500,760,.8],stop:.8,s0:1.05,s1:.55});
  const M={u:0,gap:[0,.05,.085,.13,.17,.21,.25,.29]};s.M=M;
  onOrient(s,[back,bridgeG,fore],P_=>{const p=s.pos();const ls=lankaSkyline(back,LP(900,700),LP(380,420),{n:LP(7,5)});tf(ls,p.gate[0],p.gate[1]-LP(40,60),1);
    s.gate=lankaGate(back,260,280);tf(s.gate.g,p.gate[0],p.gate[1],p.gate[2]);s.gate.set(s.gateK||0);
    /* the completed bridge of patterned stones; patterns travel along it */
    const n=16;for(let i=0;i<n;i++){const u=(i+.5)/n;const q=polyAt(p.path,u);const w=lerp(LP(220,200),LP(110,100),u);const st=stone(bridgeG,i,w,w*.5,true);tf(st.g,q[0],q[1]+w*.12,1)}
    s.flow=ln(bridgeG,smooth(p.path,false),P.turmeric,6,{'stroke-dasharray':'.1 20'})});
  s.tick=(dt,t)=>{const p=s.pos();if(s.flow)s.flow.setAttribute('stroke-dashoffset',f1(-t*50*MV()));if(s.gate)s.gate.set(s.gateK||0);
    order.forEach((f,i)=>{const u=clamp(M.u-M.gap[i],0,1);const q=polyAt(p.path,u);f.x=q[0];f.y=q[1]+(i===1?LP(14,10):0);f.s=lerp(p.s0,p.s1,u)*(f.Q.scale||1)})};
  return s}
async function shot1_8(){mood('cliff');Amb.set('ocean');Music.mood('lanka');const s=D.setScene(scMarch(),900);const M=s.M;const {rama,lak,hanuman:han}=s.cast;const vans=[].concat(s.cast.vanaras);
  [rama,lak,han].concat(vans).forEach(f=>f.set('march',0));rama.hold('b','bow');lak.hold('b','bow');vans[0].hold('f','branch');vans[2].hold('f','stone',{v:2});
  M.u=.12;const march=D.tw(M,{u:.5},10000,'lin');
  await say("Across the bridge marched Rama, Lakshmana, Hanuman and their brave companions.");await march;
  const m2=D.tw(M,{u:s.pos().stop},7000,'io');
  await say("At last, they reached Lanka.");await m2;[rama,lak,han].concat(vans).forEach(f=>f.set('idle',600));
  rama.set('determined',700);
  await say("Beyond its grand gates, Sita waited. Ahead lay a great challenge, but Rama was not alone. His friends stood beside him, united by courage, loyalty and hope.",
    [["not alone",()=>{han.set('speakGently',600);lak.set('smile',600)}],["united",()=>{vans.forEach((v,i)=>Timers.add(i*120,()=>v.set('smile',500)))}]]);
  await say("Would they be able to defeat Ravana and bring Sita home?",[["defeat",()=>{rama.set('bowRaised',800)}]]);
  await hold(600);AU.sfx('bell');
  const op_=D.tw(s,{gateK:1},6000,'io');await say("The gates of Lanka opened.");await op_;
  rama.set('determined',800);han.set('idle',800);
  await say("The final part of their journey was about to begin…");
  /* a held composition: Rama and Hanuman look towards the open gates */
  await hold(1800);await D.late();await endCard(1)}
