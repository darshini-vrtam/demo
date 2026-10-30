/* ================= SCENE 1: THE DIWALI PREPARATIONS ================= */
/* the home before the activity: the rangoli is only partly made, no garland clusters, no diyas round the rangoli */
const START_STATE={garland:[0,0,0,0,0],rangoli:{dots:0,petal:0,diamond:0,leaf:0,circle:0},ring:[0,0,0,0,0,0],lit:0,puja:0};
/* the threshold diyas: Father adds four of them to the row in Shot 1.2 */
function rowDiyas(H,n){H.diyas.forEach((d,i)=>{d.shown=i<n?1:0;op(d.g,d.shown)});}
async function shot1_1(){Store.set('scene',1);mood('warm');Music.mood('evening');Music.setLevel(.45,3);
  const s=homeStage({state:START_STATE});const F=s.F,H=s.H,light=s.light;D.setScene(s,1200);rowDiyas(H,3);
  ['mother','father','gran'].forEach(k=>F[k].vis=false);
  placeP(F.girl,[1080,792,.95,1],[380,1320,.95,1],true);F.girl.set('reach');F.girl.hold('powder');
  placeP(F.boy,[1235,782,.95],[640,1310,.95],true);F.boy.set('hold');F.boy.hold('flowers');
  /* the home appears with a patterned reveal: the frame of the picture opens from the centre */
  s.cam.fx=LP(889,500);s.cam.fy=LP(500,800);s.cam.z=1.04;D.go(s.cam,{z:1},2400,'out');
  light.x=LP(-120,-90);light.y=LP(330,560);light.vis=true;
  await D.wait(900);
  const enter=light.travel(LP([[300,280],[560,340],[700,330]],[[150,480],[300,560],[340,520]]),4200,'io').catch(()=>{});
  const busy=(async()=>{for(let i=0;i<3;i++){F.girl.set(i%2?'reach':'offer');F.boy.set(i%2?'hold':'offer');await D.wait(1500)}F.girl.set('reach');F.boy.set('hold')})().catch(()=>{});
  await sayShot('1.1');
  await enter;await D.late();
  /* the camera moves closer to the family */
  s.cam.fx=LP(1000,500);s.cam.fy=LP(640,1100);D.go(s.cam,{z:1.05},1800,'io');await D.wait(1200)}
async function shot1_2(){mood('warm');let s=D.scene;if(!s||s.id!=='home'){s=homeStage({state:START_STATE});D.setScene(s,0);rowDiyas(s.H,3);placeP(s.F.girl,[1080,792,.95,1],[380,1320,.95,1],true);placeP(s.F.boy,[1235,782,.95],[640,1310,.95],true)}
  const F=s.F,H=s.H,light=s.light;D.go(s.cam,{z:1},1600,'io');
  /* everyone is busy: Mother at left, Father at right, Grandmother at the puja platform */
  F.mother.vis=true;F.father.vis=true;F.gran.vis=true;
  placeP(F.mother,[330,790,.95],[150,1040,.85],true);placeP(F.father,[1460,790,.95],[850,1040,.85],true);placeP(F.gran,[1110,572,.6],[740,671,.6],true);
  F.mother.set('basket');F.mother.hold('flowers');F.father.set('hold');F.father.hold('diya');F.gran.set('idle');H.flowerOn.style.display='none';
  const top=motifPart(s,s.propL,'heart',0,0,0);top.g.innerHTML='';const gar=grp(top.g);ln(gar,'M-120 0Q0 60 120 0',K,8);ln(gar,'M-120 0Q0 60 120 0',P.leaf,4);
  for(let i=0;i<9;i++){const u=i/8;const m=marigold(gar,13,i%2?P.gold:P.coral);tf(m,lerp(-120,120,u),Math.sin(u*Math.PI)*30,1)}
  const placeTop=()=>{const p=s.toHome(0,-452);top.x=p[0];top.y=p[1];top.sc=LP(.85,.86)};placeTop();s.parts.push({update:placeTop});
  const hov=()=>{const p=s.toHome(0,30);light.travel([[p[0],p[1]-LP(60,80)]],1600).catch(()=>{})};hov();
  const acts={
    girl:async()=>{F.girl.set('offer');await D.wait(500);D.go(H.R,{dots:1},1600);AU.sfx('fill');await D.wait(900);F.girl.set('reach')},
    boy:async()=>{F.boy.f=-1;F.boy.set('offer');const a=s.toHome(0,0);const p=motifPart(s,s.motL,'flower',F.boy.x-40,F.boy.y-180*F.boy.s,.6);D.go(p,{s:1},300);
      await D.tw(p,{x:F.mother.x+50,y:F.mother.y-200*F.mother.s},1400,'io');D.go(p,{s:0},400);F.boy.set('hold');F.boy.f=1},
    mother:async()=>{F.mother.hold('garland');placeP(F.mother,[700,790,.95],[330,1040,.85]);await D.wait(1300);F.mother.set('place');await D.wait(700);F.mother.hold(null);AU.sfx('pat');D.go(top,{s:1},900,'out');await D.wait(700);
      placeP(F.mother,[330,790,.95],[150,1040,.85]);F.mother.set('idle')},
    father:async()=>{F.father.set('reach');for(let n=4;n<=7;n++){rowDiyas(H,n);AU.sfx('tink');await D.wait(450)}F.father.set('hold')},
    gran:async()=>{F.gran.set('place');await D.wait(700);H.flowerOn.style.display='';AU.sfx('pat');await D.wait(500);F.gran.set('idle');F.gran.smile=2}};
  const run=k=>()=>acts[k]().catch(()=>{});
  await sayShot('1.2',{cues:[['rangoli',run('girl')],['flower',run('boy')],['Mother',run('mother')],['Father',run('father')],['Grandmother',run('gran')]],gap:2200});
  await D.late();
  /* the Light moves closer to the rangoli and pauses */
  const p=s.toHome(0,40);await light.travel([[p[0]-LP(160,90),p[1]-LP(20,40)]],1600)}
async function shot1_3(){mood('curious');let s=D.scene;if(!s||s.id!=='home'){s=homeStage({state:Object.assign({},START_STATE,{rangoli:{dots:1}})});D.setScene(s,0);for(const k in s.F)s.F[k].vis=true;
    placeP(s.F.mother,[330,790,.95],[150,1040,.85],true);placeP(s.F.father,[1460,790,.95],[850,1040,.85],true);placeP(s.F.gran,[1110,572,.6],[740,671,.6],true);placeP(s.F.girl,[1080,792,.95,1],[380,1320,.95,1],true);placeP(s.F.boy,[1235,782,.95],[640,1310,.95],true)}
  const F=s.F,light=s.light;
  /* a medium shot: the Light in front, a little left of centre, larger (about 9% of the width) */
  s.cam.fx=LP(889,500);s.cam.fy=LP(560,1000);D.go(s.cam,{z:1.06},1800,'io');D.go(light,{size:1.3},1400);
  F.girl.tiltH=-6;F.boy.tiltH=-8;F.girl.set('idle');F.boy.set('idle');
  const tour=light.travel(LP([[1040,380],[1300,460],[900,520],[640,470]],[[700,600],[800,900],[400,880],[330,760]]),5200,'io').catch(()=>{});
  await sayShot('1.3',{to:2});await tour;
  /* it stops, its eyes widen a little, it tilts as if thinking, a question mark appears */
  light.pulse();await D.wait(500);D.go(light,{tilt:-14},700,'out');
  const q=motifPart(s,s.motL,'q',light.x+LP(150,120),light.y-LP(90,90),LP(1.1,1));D.go(q,{s:1},700,'back');
  await D.wait(600);D.go(light,{tilt:0,look:0},700);
  $('qpanel').hidden=false;
  await sayShot('1.3',{from:2,to:5});
  await D.wait(D.fast?5:3000);
  await sayShot('1.3',{from:5});
  $('qpanel').hidden=true;await D.late();
  /* the question mark turns into three small icons that fly to the top: the task indicators */
  const icons=['flower','sun','heart'];D.go(q,{s:0},500);
  const fl=TASKS.map((k,i)=>{const o=motifPart(s,s.motL,i===0?'flower':i===1?'sun':'heart',q.x,q.y,.5);D.go(o,{s:1},300);return o});
  const ti=TASKS.map((k,i)=>LP([760+i*129,150],[330+i*170,300]));
  await Promise.all(fl.map((o,i)=>D.tw(o,{x:ti[i][0],y:ti[i][1]},1300,'io')));await D.wait(200)}
