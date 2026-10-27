/* ===== Verbatim narration (story document) and takeaway lines. Typographic apostrophes in visible text. ===== */
const TXT={
  s1:['Long ago, the devas had lost much of their strength. They sought Lord Vishnu’s guidance. Vishnu explained that the cosmic ocean could be churned to reveal precious gifts, including amrita, the nectar associated with immortality.','But churning the ocean would be an enormous task. The devas would need help.'],
  s2:['The devas and asuras agreed to churn the ocean. Mount Mandara would serve as the churning rod, and the serpent Vasuki would serve as the rope.','With Vishnu’s guidance and help, they began the mighty task.'],
  s3:['The ocean swirled and shimmered. Waves rose, patterns of foam spread across the water, and mysterious treasures began to emerge.','But the first great appearance was not a treasure. It was something dangerous.'],
  s4:['A terrible poison called Halahala emerged from the ocean. It threatened the worlds, and everyone feared what would happen if it spread.','The devas sought help. Lord Shiva stepped forward to protect creation.'],
  s5:['Lord Shiva took the Halahala poison and held it in his throat to prevent it from spreading. His throat turned blue, and he became known as Neelakantha, the blue-throated Lord.','His act protected creation from a terrible danger.'],
  s6:['With the danger contained, the churning continued. Many precious beings and objects appeared from the ocean in different traditional tellings of the story.','Among them was Goddess Lakshmi, radiant on a lotus. The ocean was revealing gifts that would change the world.'],
  s7:['At last, Lord Dhanvantari emerged from the cosmic ocean, traditionally depicted carrying a vessel of amrita.','Dhanvantari is honoured as a divine figure associated with Ayurveda and healing. His appearance reminds us that health and well-being are among life’s most precious gifts.'],
  s8:['During Dhanteras, many families pray for health, prosperity and a good life. Some buy precious metals or new household objects, while others honour Dhanvantari and the importance of well-being.','The story of the ocean reminds us that life’s greatest treasures include health, wisdom, generosity and care for one another.'],
  end:'May we value the gifts we receive, care for one another, and use our blessings wisely.'};
const REM=['Sometimes a big problem requires asking for help and finding a wise solution.',
  'Big tasks become possible when different groups work together toward a shared goal.',
  'Curiosity is valuable, but when something may be dangerous, we should pause and seek help.',
  'When danger threatens others, asking for help and acting responsibly are important first steps.',
  'Courage is not about being fearless. It is about caring enough to help protect others when they are in danger.',
  'A treasure can represent more than gold or jewels. Nature, beauty, prosperity and the well-being of living beings are precious gifts too.',
  'Health is not just a treasure to pray for. We can also care for our bodies, seek help when we are unwell, and show kindness to others.',
  'Prosperity includes material well-being, but it also includes health, knowledge, relationships, generosity and the ability to care for one another.'];
const MANTRA={head:'श्री धन्वन्तरि मन्त्रः',dev:'ॐ नमो भगवते धन्वन्तरये अमृतकलशहस्ताय सर्वामयविनाशनाय त्रिलोकनाथाय विष्णवे स्वाहा ॥',
  iast:'Oṃ namo bhagavate dhanvantaraye amṛtakalaśahastāya sarvāmayavināśanāya trailokyanāthāya viṣṇave svāhā.',
  meaning:'We offer our respectful salutations to Lord Dhanvantari, the divine healer, who holds the vessel of amrita, is honoured as the Lord of the three worlds, and is worshipped as a form of Lord Vishnu. We pray for well-being and freedom from illness.',
  cues:['Om','Na-mo','Bha-ga-va-te','Dhan-van-ta-ra-ye','A-mri-ta-ka-la-sha-has-taa-ya','Sar-vaa-ma-ya-vi-naa-sha-naa-ya','Trai-lok-ya-naa-thaa-ya','Vish-na-ve Svaa-haa'],
  dhyana:'शङ्खं चक्रं जलूकां दधदमृतघटं चापि चतुर्भिः कराब्जैः ।\nसूक्ष्मस्वच्छातिहृद्यांशुकपरिविलसन्मौलिमम्भोजनेत्रम् ।\nकालाम्भोदोज्ज्वलाङ्गं कटितटविलसच्चारुपीताम्बराढ्यम् ।\nवन्दे धन्वन्तरिं तं निखिलगदवनप्रौढदावाग्निलीलम् ॥',
  dhyanaMeaning:'I offer my salutations to Lord Dhanvantari, whose hands bear sacred emblems and the vessel of amrita, whose eyes are like lotuses, whose garments are beautiful, and whose radiant form resembles a rain-filled cloud. He is revered as the divine healer who overcomes illness.'};
const CHAPTERS=[{id:1,at:0,kick:'Chapter 1',title:'The Great Plan',sub:'The devas need help, and a mighty task begins.'},
  {id:2,at:3,kick:'Chapter 2',title:'The Blue-Throated Protector',sub:'A danger rises, and someone steps forward to protect creation.',prev:'Previously, the devas and asuras churned the ocean together, and something dangerous began to rise.'},
  {id:3,at:5,kick:'Chapter 3',title:'The Treasures',sub:'The ocean reveals its gifts.',prev:'Previously, Lord Shiva held the poison in his throat and protected creation.'}];

/* ===== shared helpers ===== */
function makeFish(n,y0,y1,seed){const r=rng(seed);const a=[];for(let k=0;k<n;k++)a.push({x:L.B.x+r()*L.B.w,y:lerp(y0,y1,r()),dir:r()<.5?-1:1,spd:18+r()*20,s:.55+r()*.4,col:[C.coral,C.saffron,C.gold,C.pink][k%4],ph:r()*6});return a}
function moveFish(arr,dt,flee){arr.forEach(f=>{let v=f.spd;if(flee){const d=f.x-flee.x;f.dir=d<0?-1:1;v=f.spd*5*Math.max(0,1-(T.now-flee.t)/2600)+f.spd}f.x+=f.dir*v*dt;const B=L.B;if(f.x<B.x-60)f.x=B.x+B.w+50;if(f.x>B.x+B.w+60)f.x=B.x-50})}
function drawFish(g,arr,t){arr.forEach(f=>fish(g,f.x,f.y,f.s,f.col,f.dir,t+f.ph))}
/* glowing lotus or ocean-shell icon marking an interactive object; it pulses by shape, and grows during a hint */
function hotIcon(g,x,y,r,t,kind){const hinting=T.now-D.hintAt<4500,k=reduceMotion?0:Math.sin(t*3)*.08;rings(g,x,y,r*(1.25+k),hinting?4:2,r*.35,C.gold,3,hinting?.95:.75);
  if(kind==='shell'){g.save();g.translate(x,y);const p=new Path2D();p.moveTo(0,r*.55);for(let j=0;j<=8;j++){const a=Math.PI*(1.1+j*.8/8);p.lineTo(Math.cos(a)*r*.9,Math.sin(a)*r*.9+r*.2)}p.closePath();
    shape(g,p,C.coral,gg=>{gg.strokeStyle=C.cream;gg.lineWidth=2;gg.beginPath();for(let j=1;j<8;j++){const a=Math.PI*(1.1+j*.8/8);gg.moveTo(0,r*.55);gg.lineTo(Math.cos(a)*r*.85,Math.sin(a)*r*.85+r*.2)}gg.stroke()},{lw:1.8});g.restore()}
  else lotus(g,x,y+r*.4,r,{col:C.pink,col2:C.coral})}
function tick(g,x,y,r){shape(g,ell(x,y,r),C.leaf,null,{lw:1.6});g.strokeStyle=C.pale;g.lineWidth=r*.28;g.beginPath();g.moveTo(x-r*.45,y);g.lineTo(x-r*.1,y+r*.35);g.lineTo(x+r*.5,y-r*.35);g.stroke()}
function island(g,x0,x1,y,h,col){const p=sp([[x0,y+6],[x0+24,y-12],[(x0+x1)/2,y-18],[x1-24,y-12],[x1,y+6],[x1-14,y+h],[x0+14,y+h]],true);shape(g,p,col||C.agold,gg=>{Pat.tri(gg,bb(x0,y-6,x1-x0,14),C.dgold,16);Pat.dots(gg,bb(x0,y+10,x1-x0,h),C.dgold,14,2)},{lw:2.2})}
function halo(g,x,y,r,t,cols){cols=cols||[C.gold,C.saffron];rays(g,x,y,r*.9,r*1.35,20,cols[0],(t||0)*.05);shape(g,ell(x,y,r),cols[1],gg=>Pat.dots(gg,bb(x-r,y-r,r*2,r*2),C.gold,12,2),{lw:2});ring(g,x,y,r*.82,C.ink,1.6)}
function smallVishnu(g,x,y,s,t){cloud(g,x,y+18*s/.36,s/.36*.55,C.cream,C.ink);halo(g,x,y-172*s,52*s,t);person(g,'vishnu','seated','serene',x,y,s)}

/* ===== The churning composition (Screens 2, 3, 6): one layout scaled around (cx, baseY) ===== */
function churnLayout(cx,baseY,S,spr){const fs=.82*S,fy=baseY+92*S;const offs=[600,490,380];
  return{fs,fy,dev:offs.map((o,k)=>({key:'deva'+k,x:cx-o*S*spr,y:fy})),asu:offs.map((o,k)=>({key:'asura'+k,x:cx+o*S*spr,y:fy}))}}
function churnScene(g,st,o){const{cx,baseY,S,spr}=o,t=o.t,lay=churnLayout(cx,baseY,S,spr),fs=lay.fs;
  const pL=st.pL||0,pR=st.pR||0,leanL=-(.06+.1*pL)*(o.lean==null?1:o.lean),leanR=(.06+.1*pR)*(o.lean==null?1:o.lean);
  const shake=side=>{const s0=st['sh'+side]||-1e9,e=T.now-s0;return e<700?Math.sin(e/30)*6*S*(1-e/700):0};
  const hand=(f,lean,dir,dx)=>{const hx=71*fs*dir,hy=-184*fs;return[f.x+dx+hx*Math.cos(lean)-hy*Math.sin(lean),f.y+hx*Math.sin(lean)+hy*Math.cos(lean)]};
  const dxL=-18*S*pL,dxR=18*S*pR;const slackL=o.slackL||0,slackR=o.slackR||0;
  const hL=lay.dev.map(f=>hand(f,leanL,1,dxL)),hR=lay.asu.map(f=>hand(f,leanR,-1,dxR));
  hL.forEach(p=>{p[1]+=slackL+shake('L')});hR.forEach(p=>{p[1]+=slackR+shake('R')});
  const hw=y=>mandaraHW(y)*S,yA=baseY-150*S,yB=baseY-190*S,yC=baseY-230*S,yD=baseY-270*S;
  const L1=[cx-hw(-150),yA],R1=[cx+hw(-190),yB],L2=[cx-hw(-230),yC],R2=[cx+hw(-270),yD];
  /* Vasuki's head rises clear of the last asura, never over a face */
  const tail=[hL[0][0]-80*fs,hL[0][1]+14*fs],head=[hR[0][0]+138*fs,hR[0][1]-118*fs];
  const leftSeg=[tail,...hL,[lerp(hL[2][0],L1[0],.55),lerp(hL[2][1],L1[1],.4)],L1];
  const rightSeg=[R2,[lerp(R2[0],hR[2][0],.45),lerp(R2[1],hR[2][1],.6)],...hR.slice().reverse(),[hR[0][0]+86*fs,hR[0][1]-10*fs],head];
  const wrap1=[L1,[cx,baseY-128*S],R1],wrap2=[L2,[cx,baseY-208*S],R2],back=[R1,[cx,baseY-232*S],L2];
  const w=26*S,ph=st.phase||0;
  serpentBody(g,sp(back),w,ph);
  kurma(g,cx,baseY+86*S,.95*S,t);
  sea(g,baseY+96*S,L.B.y+L.B.h+10,{cols:o.water,t,row:44*S+10,len:90,spd:6,dots:false,line:o.waterLine});
  const nr=st.rings||0;for(let k=0;k<nr;k++){const age=clamp((T.now-(st.ringT?st.ringT[k]:0))/900,0,1);ring(g,cx,baseY+82*S,(250+k*46)*S*Ease.out(age),C.gold,3.4,(30+k*7)*S*Ease.out(age));ring(g,cx,baseY+82*S,(240+k*46)*S*Ease.out(age),C.pale,1.4,(27+k*7)*S*Ease.out(age))}
  mandara(g,cx,baseY,S,st.rot||0);
  serpentBody(g,sp(wrap1),w,ph);serpentBody(g,sp(wrap2),w,ph);
  const minX=lay.dev[0].x-80*fs,maxX=lay.dev[2].x+70*fs;island(g,minX-30*S,maxX+20*S,lay.fy-4,70*S);island(g,cx+(cx-maxX)-20*S,cx+(cx-minX)+30*S,lay.fy-4,70*S);
  lay.dev.forEach(f=>person(g,f.key,o.devPose||'pull',o.devMood||'determined',f.x+dxL,f.y,fs,false,o.devPose==='pull'||!o.devPose?leanL:0));
  lay.asu.forEach(f=>person(g,f.key,o.asuPose||'pull',o.asuMood||'determined',f.x+dxR,f.y,fs,true,o.asuPose==='pull'||!o.asuPose?leanR:0));
  serpentBody(g,sp(leftSeg),w,ph);serpentBody(g,sp(rightSeg),w,ph);
  const ta=Math.atan2(tail[1]-hL[0][1],tail[0]-hL[0][0]);serpentTail(g,tail[0],tail[1],ta,w);
  serpentHead(g,head[0],head[1],-1.15,S*.82);
  return{lay,hL,hR,L1,R2}}

/* ===== SCREEN 1 · A World That Needed Help ===== */
const S1={label:'Screen 1 of 8',title:'A World That Needed Help',border:[C.indigo,C.agold],
  alt:'A celestial terrace. Worried devas with folded hands approach Lord Vishnu, who sits on the coils of the serpent Shesha. A deep-blue patterned ocean stretches across the horizon.',
  enter(){const P=L.portrait;this.st={devMood:'worried',line:0,tapped:false,ripple:-1e9,mand:0,out:0,armed:false,fish:makeFish(6,P?380:470,P?540:630,3)}},
  lay(){return L.portrait?{seaY:[330,560],hot:[300,455],vx:620,vy:1075,vs:.84,dev:[[85,1095],[190,1095],[295,1095]],ds:.7,clouds:[[160,120,.7],[520,80,.6],[780,170,.6]]}
    :{seaY:[425,655],hot:[760,545],vx:1230,vy:868,vs:1,dev:[[160,860],[300,860],[440,860]],ds:.95,clouds:[[200,120,1],[620,70,.8],[1050,135,.9],[1460,85,.8]]}},
  draw(g,t){const st=this.st,l=this.lay(),B=L.B;skyField(g,C.indigo,{seed:4,density:7000,maxY:l.seaY[0]});
    l.clouds.forEach(([x,y,s])=>cloud(g,x,y,s,C.agold,C.ink));[[380,250],[980,300],[1320,230]].forEach(([x,y])=>{if(!L.portrait||x<900)lotus(g,L.portrait?x*.6:x,y,22,{col:C.agold,col2:C.gold})});
    const[h0,h1]=l.seaY;sea(g,h0,h1,{cols:[C.deep,C.indigo],t,row:40,len:80,circles:L.portrait?[[120,500,26],[760,470,22]]:[[260,600,30],[1080,520,26],[1420,610,22]]});
    const[hx,hy]=l.hot;const fl=st.tapped?{x:hx,t:st.ripple}:null;drawFish(g,st.fish,t);
    if(st.tapped){const e=(T.now-st.ripple)/1000;if(e<3.4)for(let k=0;k<4;k++){const r=(e*120+k*46);if(r>0){g.globalAlpha=clamp(1-e/3.4,0,1);ring(g,hx,hy,r,C.pale,3,r*.36);ring(g,hx,hy,r-8,C.turq,1.6,(r-8)*.36);g.globalAlpha=1}}
      if(e>.4&&e<3)[[-90,-20],[70,-35],[-30,40],[110,25],[-140,30]].forEach(([dx,dy],i)=>{g.globalAlpha=clamp(Math.sin((e-.4)*2.4+i),0,1)*.9;i%2?star(g,hx+dx,hy+dy,10,C.gold,8):flowerTop(g,hx+dx,hy+dy,9,C.gold,C.cream,6);g.globalAlpha=1})}
    if(st.mand>0){const s=1+st.out*1.4;mandala(g,hx+(L.portrait?0:(800-hx))*st.out,hy+(L.portrait?160:90)*st.out,135*st.mand*s,{sy:.42,p:st.mand,rot:t*.08})}
    if(st.armed&&!st.tapped)hotIcon(g,hx,hy,26,t,'shell');
    g.globalAlpha=1-st.out*.85;
    const ty=L.portrait?560:650;shape(g,pl([[B.x-10,ty],[B.x+B.w+10,ty],[B.x+B.w+10,B.y+B.h+10],[B.x-10,B.y+B.h+10]],true),C.agold,gg=>{gg.fillStyle=C.dgold;gg.fillRect(B.x-10,ty,B.w+20,22);Pat.tri(gg,bb(B.x-10,ty+2,B.w+20,18),C.gold,20);
      Pat.diamonds(gg,bb(B.x,ty+30,B.w,400),C.dgold,34,false);Pat.dots(gg,bb(B.x,ty+30,B.w,400),C.cream,34,2)},{lw:2.4});
    if(st.line>0){const vx=l.vx-118*l.vs*1.08,vy=l.vy-(100+182-90)*l.vs;g.save();g.globalAlpha=st.line;g.setLineDash([3,16]);g.lineDashOffset=-t*30;g.strokeStyle=C.gold;g.lineWidth=7;g.lineCap='round';
      g.beginPath();g.moveTo(vx,vy);g.quadraticCurveTo((vx+hx)/2,Math.min(vy,hy)-80,hx+30,hy+10);g.stroke();g.restore()}
    l.dev.forEach(([x,y],k)=>person(g,'deva'+k,'fold',st.devMood,x,y,l.ds));
    shesha(g,l.vx,l.vy,l.vs);const sy=l.vy-112*l.vs;halo(g,l.vx,sy-172*l.vs*1.08,50*l.vs,t);person(g,'vishnu','seated','serene',l.vx,sy,1.08*l.vs);g.globalAlpha=1},
  hit(x,y){const st=this.st,l=this.lay();if(!st.armed||st.tapped)return null;if(y>l.seaY[0]-10&&y<l.seaY[1]&&x<l.vx-200*l.vs)return{tap:()=>this.tap()};return null},
  tap(b){const st=this.st;if(st.tapped)return;st.tapped=true;st.ripple=T.now;AU.sfx('ripple');const btn=b||document.querySelector('#act .ab');if(btn)UI.markDone(btn,'Explore the ocean, done');
    UI.status('The ocean is answering…');Timers.add(D.fast?5:2400,()=>{AU.sfx('chime');st.devMood='wonder';tw(st,{mand:1},D.fast?5:1100,'out').then(()=>{UI.status('A golden mandala was hidden beneath the water!');D.complete()})})},
  update(dt){const st=this.st;moveFish(st.fish,dt,st.tapped?{x:this.lay().hot[0],t:st.ripple}:null)},
  async run(){const st=this.st;Music.mood('calm');AU.amb(.025);await D.wait(700);await D.say(TXT.s1[0]);st.devMood='hope';D.tw(st,{line:1},1200).catch(()=>{});await D.say(TXT.s1[1]);
    st.armed=true;await D.activity({head:'What is hidden beneath the ocean?',prompt:'Tap the ocean to reveal its mystery.',hint:'Tap the glowing shell on the water.',
      build:el=>el.append(UI.btn('Explore the ocean',{main:true,icon:'lotus',aria:'Explore the ocean: tap to reveal what is hidden',on:b=>this.tap(b)})),assist:()=>this.tap()});
    st.devMood='happy';await D.wait(900);await D.remember(REM[0]);await D.beforeOutro();UI.remember(null);await D.tw(st,{out:1},1500,'io')}};

/* ===== SCREEN 2 · A Great Plan ===== */
const S2={label:'Screen 2 of 8',title:'A Great Plan',border:[C.deep,C.gold],
  alt:'Mount Mandara stands in the ocean on the back of Kurma the tortoise. The serpent Vasuki is wrapped around it; devas pull from the left and asuras from the right. A small Lord Vishnu watches from a cloud.',
  enter(){this.st={rot:0,phase:0,pL:0,pR:0,pulls:0,next:'L',rings:0,ringT:[],shimmer:-1e9,devMood:'determined',asuMood:'determined',armed:false,swirl:0,fish:makeFish(5,L.portrait?760:640,L.portrait?1100:860,8)}},
  geo(){return L.portrait?{cx:450,baseY:700,S:.72,spr:.6,sea:640,v:[700,200,.3]}:{cx:800,baseY:600,S:1,spr:1,sea:540,v:[1150,200,.36]}},
  draw(g,t){const st=this.st,o=this.geo();skyField(g,C.deep,{seed:12,density:8000,maxY:o.sea});
    (L.portrait?[[140,110,.6],[460,70,.5]]:[[200,110,.9],[560,70,.7],[1420,120,.8]]).forEach(([x,y,s])=>cloud(g,x,y,s,C.cream,C.ink));
    sea(g,o.sea,L.B.y+L.B.h,{cols:[C.turq,C.teal,C.deep,C.teal],t,row:46,len:96,circles:L.portrait?[]:[[230,820,26],[1380,830,24]]});drawFish(g,st.fish,t);
    if(st.swirl>0){const cx_=o.cx,cy_=o.baseY+90*o.S;for(let k=0;k<5;k++){const r=(160+k*70)*o.S*(1+st.swirl*.3);ring(g,cx_,cy_,r,C.pale,2.6,r*.16)}if(st.swirl>.4)mandala(g,cx_,cy_+10,120*o.S*st.swirl,{sy:.3,p:st.swirl,cols:[C.violet,C.plum,C.violet,C.plum],rot:t*.3})}
    churnScene(g,st,{cx:o.cx,baseY:o.baseY,S:o.S,spr:o.spr,t,water:[C.teal,C.turq],devMood:st.devMood,asuMood:st.asuMood});
    smallVishnu(g,o.v[0],o.v[1],o.v[2],t);
    const se=(T.now-st.shimmer)/1000;if(se>0&&se<3.2){const r=rng(5);for(let k=0;k<40;k++){const x=L.B.x+r()*L.B.w,y=lerp(o.sea+30,L.B.y+L.B.h,r());g.globalAlpha=clamp(Math.sin((se*2+r()*3))*1,0,1);star(g,x,y,7,C.gold,4);g.globalAlpha=1}}
    if(st.armed&&st.pulls<6){const lay=churnLayout(o.cx,o.baseY,o.S,o.spr);const yh=lay.fy-184*lay.fs-50*o.S;hotIcon(g,lay.dev[1].x+30*o.S,yh-40*o.S,22*o.S+8,t,'lotus');hotIcon(g,lay.asu[1].x-30*o.S,yh-40*o.S,22*o.S+8,t,'lotus');
      g.save();g.fillStyle=C.gold;g.strokeStyle=C.ink;g.lineWidth=2.5;[[lay.dev[0].x-70*o.S,-1,'L'],[lay.asu[0].x+70*o.S,1,'R']].forEach(([x,d,side])=>{const big=st.next===side?1.3:.9,y=yh-40*o.S,p=new Path2D();
        p.moveTo(x+d*28*big,y);p.lineTo(x,y-18*big);p.lineTo(x,y-8*big);p.lineTo(x-d*24*big,y-8*big);p.lineTo(x-d*24*big,y+8*big);p.lineTo(x,y+8*big);p.lineTo(x,y+18*big);p.closePath();g.fill(p);g.stroke(p)});g.restore()}},
  update(dt){moveFish(this.st.fish,dt)},
  hit(x,y){const st=this.st,o=this.geo();if(!st.armed||st.pulls>=6)return null;const lay=churnLayout(o.cx,o.baseY,o.S,o.spr);const top=lay.fy-330*lay.fs,bot=lay.fy+40*o.S;if(y<top||y>bot)return null;
    const side=x<o.cx-150*o.S?'L':x>o.cx+150*o.S?'R':null;if(!side)return null;let used=false;
    return{tap:()=>{if(!used)this.pull(side)},dragMove:(dx)=>{if(!used&&Math.abs(dx)>34){used=true;this.pull(dx<0?'L':'R')}},dragEnd:()=>used}},
  pull(side){const st=this.st;if(st.pulls>=6)return;const nm=s=>s==='L'?'left':'right';
    if(side!==st.next){st['sh'+side]=T.now;AU.sfx('nudge');UI.status('Next pull: '+nm(st.next)+'.',true);const b=document.getElementById(st.next==='L'?'pullL':'pullR');if(b){b.classList.remove('pulse');void b.offsetWidth;b.classList.add('pulse')}return}
    st.pulls++;st.next=side==='L'?'R':'L';AU.sfx('creak');const k='p'+side;tw(st,{[k]:1},D.fast?2:260,'out').then(()=>tw(st,{[k]:0},D.fast?2:520));
    tw(st,{rot:st.rot+.55},D.fast?2:900);tw(st,{phase:st.phase+(side==='L'?-70:70)},D.fast?2:800);st.ringT.push(T.now);st.rings=st.pulls;
    this.meter();if(st.pulls>=6){st.shimmer=T.now;AU.sfx('shimmer');st.devMood='happy';st.asuMood='happy';UI.status('The whole ocean shimmers!');['pullL','pullR'].forEach(id=>{const b=$(id);if(b){b.disabled=true;UI.markDone(b)}});D.complete()}
    else UI.status('Next pull: '+nm(st.next)+'.')},
  meter(){const m=$('meter');if(!m)return;const n=this.st.pulls;m.querySelector('b').textContent=n+'/6 pulls';m.querySelector('i').textContent='●'.repeat(n)+'○'.repeat(6-n);m.setAttribute('aria-label','Churning progress '+n+' of 6 pulls')},
  async run(){const st=this.st;Music.mood('calm');await D.wait(500);await D.say(TXT.s2[0]);await D.say(TXT.s2[1]);st.armed=true;
    await D.activity({head:'Help churn the ocean!',prompt:'Pull left, then right!',status:'Next pull: left.',hint:'Pull the rope on the left side first, then the right side.',
      build:el=>{const m=document.createElement('div');m.id='meter';m.className='reveal';m.setAttribute('role','status');m.innerHTML='Churning progress <b>0/6 pulls</b> <i aria-hidden="true">○○○○○○</i>';el.append(m);
        const bl=UI.btn('Pull left',{main:true,on:()=>this.pull('L')});bl.id='pullL';const br=UI.btn('Pull right',{main:true,on:()=>this.pull('R')});br.id='pullR';el.append(bl,br)},
      assist:()=>this.pull(st.next)});
    await D.wait(1200);await D.remember(REM[1]);await D.beforeOutro();UI.remember(null);AU.sfx('hush');await D.tw(st,{swirl:1},2200,'io')}};

/* ===== SCREEN 3 · The Ocean Begins to Change ===== */
const S3={label:'Screen 3 of 8',title:'The Ocean Begins to Change',border:[C.indigo,C.violet],
  alt:'The ocean fills most of the picture in three big patterned waves. Far behind, the devas and asuras pause at the churning mountain. A small violet spiral peeks out from the water.',
  enter(){this.st={dx:[0,0,0],done:[false,false,false],mist:0,pL:0,pR:0,rot:.8,phase:0,armed:false,fish:[]}},
  geo(){return L.portrait?{cx:450,baseY:285,S:.4,spr:.62,tops:[370,610,850],far:230}:{cx:800,baseY:300,S:.5,spr:1,tops:[400,555,705],far:250}},
  draw(g,t){const st=this.st,o=this.geo(),B=L.B;skyField(g,C.indigo,{seed:21,density:7000,maxY:o.tops[0]});
    (L.portrait?[[150,90,.55],[700,120,.5]]:[[180,100,.8],[1420,90,.8]]).forEach(([x,y,s])=>cloud(g,x,y,s,C.plum,C.ink));
    sea(g,o.far,o.tops[0]+40,{cols:[C.teal,C.deep],t,row:34,len:70,spd:8});
    churnScene(g,st,{cx:o.cx,baseY:o.baseY,S:o.S,spr:o.spr,t,water:[C.teal,C.deep],devPose:'pause',asuPose:'loosen',devMood:'curious',asuMood:'concern',slackR:16*o.S,lean:.3});
    /* the violet spiral, partly hidden by foam */
    const sx=o.cx,sy=o.tops[0]-4;g.save();g.strokeStyle=C.violet;g.lineWidth=7;g.beginPath();for(let k=0;k<60;k++){const a=k*.22+t*.6,r=4+k*.75;k?g.lineTo(sx+Math.cos(a)*r,sy+Math.sin(a)*r*.45):g.moveTo(sx,sy)}g.stroke();g.strokeStyle=C.plum;g.lineWidth=2;g.stroke();g.restore();
    /* hidden layers under the waves */
    const bot=B.y+B.h+10;g.fillStyle=C.deep;g.fillRect(B.x-10,o.tops[0]+10,B.w+20,bot-o.tops[0]);
    const b1=[o.tops[0]+40,o.tops[1]+20],b2=[o.tops[1]+40,o.tops[2]+20],b3=[o.tops[2]+40,bot];
    for(let k=0;k<6;k++){const x=lerp(B.x+80,B.x+B.w-80,(k+.5)/6)+Math.sin(t*.7+k)*20;fish(g,x,lerp(b1[0],b1[1],.5)+Math.sin(k*2)*14,.6,[C.coral,C.gold,C.pink][k%3],k%2?1:-1,t+k)}
    for(let k=0;k<14;k++){const x=lerp(B.x+40,B.x+B.w-40,k/13),y=b1[1]-((t*30+k*37)%(b1[1]-b1[0]));ring(g,x,y,4+(k%3)*2,C.pale,1.6)}
    for(let k=0;k<10;k++){const x=lerp(B.x+60,B.x+B.w-60,(k+.5)/10),y=lerp(b2[0],b2[1],.3+(k%3)*.2);g.globalAlpha=.6+.4*Math.sin(t*1.4+k);star(g,x,y,8,C.gold,8);g.globalAlpha=1}
    [[-.3,.6],[0,.4],[.32,.7]].forEach(([dx,dy])=>{const x=o.cx+dx*B.w*.9,y=lerp(b2[0],b2[1],dy);g.strokeStyle=C.violet;g.lineWidth=4;g.beginPath();for(let k=0;k<30;k++){const a=k*.3+t,r=k*.9;k?g.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r*.5):g.moveTo(x,y)}g.stroke()});
    const gy=lerp(b3[0],Math.min(b3[1],b3[0]+230),.45);rings(g,o.cx,gy,40+Math.sin(t*1.5)*4,6,26,C.violet,6,1,16);mandala(g,o.cx,gy,90,{sy:.4,cols:[C.violet,C.plum,C.violet,C.pink],rot:t*.2});
    /* the three wave bands (wave 3 on top) */
    [0,1,2].forEach(k=>{const top=o.tops[k],bt=k<2?o.tops[k+1]+46:bot,dx=st.dx[k];g.save();g.translate(dx,0);const p=this.band(top,bt,k,t);
      const cols=[[C.turq,C.teal],[C.teal,C.indigo],[C.cream,C.turq]][k];shape(g,p,cols[0],gg=>{Pat.waves(gg,bb(B.x-200,top-30,B.w+400,bt-top+30),cols[1],26,2);Pat.dots(gg,bb(B.x-200,top,B.w+400,bt-top),k===2?C.teal:C.pale,22,1.8)},{lw:2.6,gap:k===2?C.turq:C.pale});
      if(st.armed&&!st.done[k]){hotIcon(g,B.x+B.w*.5+(k-1)*B.w*.28,top+42,20,t+k,'shell')}
      if(st.done[k])tick(g,dx>0?B.x-140:B.x+B.w+140,top+48,17);g.restore()});
    if(st.mist>0){const s=st.mist;g.save();g.globalAlpha=Math.min(1,s*1.5);for(let k=0;k<6;k++){const a=k*1.1+t*.3,r=(40+k*30)*s;shape(g,ell(o.cx+Math.cos(a)*r*.7,o.tops[0]-60-s*240+Math.sin(a)*r*.4,(60+k*12)*s,(42+k*8)*s),k%2?C.violet:C.plum,null,{lw:2,gap:C.grey})}g.restore()}},
  /* one wave band: scalloped crest, rounded curling ends (they show once the band slides aside) */
  band(top,bot,k,t){const B=L.B,len=230,amp=28,p=new Path2D(),ph=(t*(k%2?.3:-.3))%TAU;const x0=B.x-200,x1=B.x+B.w+200,mid=(top+bot)/2;
    p.moveTo(x0,bot);p.quadraticCurveTo(x0-90,mid,x0,top);const n=Math.ceil((x1-x0)/len);const step=(x1-x0)/n;
    for(let i=0;i<n;i++){const x=x0+i*step,a=amp*(1+.25*Math.sin(ph+i));p.quadraticCurveTo(x+step*.3,top-a*1.4,x+step*.5,top);p.quadraticCurveTo(x+step*.7,top+a*.6,x+step,top)}
    p.quadraticCurveTo(x1+90,mid,x1,bot);p.closePath();return p},
  hit(x,y){const st=this.st,o=this.geo();if(!st.armed)return null;for(let k=2;k>=0;k--){const top=o.tops[k]-20,bt=k<2?o.tops[k+1]+20:L.B.y+L.B.h;if(y>top&&y<bt){let used=false;
      return{tap:()=>{if(!used)this.wave(k)},dragMove:dx=>{if(!used&&Math.abs(dx)>40){used=true;this.wave(k,dx>0?1:-1)}},dragEnd:()=>used}}}return null},
  wave(k,dir){const st=this.st,W=L.B.w;const open=st.dx[k]!==0;const d=dir||(k%2?1:-1);AU.sfx('slide');tw(st.dx,{[k]:open?0:d*(W*.78+200)},D.fast?2:900,'io');
    if(!st.done[k]){st.done[k]=true;const b=$('wave'+k);if(b)UI.markDone(b,'Wave '+(k+1)+', revealed');const msg=['Fish and bubbles swim beneath the first wave.','Gold glimmers… and the first traces of violet.','A bright violet glow is spreading beneath the ocean.'][k];UI.status(msg);
      if(k===2)AU.sfx('hush');else AU.sfx('ripple');if(st.done.every(Boolean))D.complete()}},
  async run(){const st=this.st;Music.mood('dark');AU.amb(.035);await D.wait(500);await D.say(TXT.s3[0]);await D.say(TXT.s3[1]);st.armed=true;
    await D.activity({head:'Move the waves',prompt:'Choose each wave to uncover what is happening beneath the ocean.',hint:'Tap a wave, or swipe it sideways, to see what is under it.',
      build:el=>[0,1,2].forEach(k=>{const b=UI.btn('Wave '+(k+1),{icon:'water',aria:'Wave '+(k+1)+': slide it aside',on:()=>this.wave(k)});b.id='wave'+k;el.append(b)}),
      assist:()=>{const k=st.done.indexOf(false);if(k>=0)this.wave(k)}});
    await D.wait(900);await D.remember(REM[2]);await D.beforeOutro();UI.remember(null);AU.sfx('hush');await D.tw(st,{mist:1},2200,'io')}};

/* ===== SCREEN 4 · The Halahala Poison ===== */
const WORLDS=[{k:'living',name:'Living world',sub:'A tree and a village'},{k:'water',name:'Water world',sub:'A river with fish'},{k:'celestial',name:'Celestial world',sub:'A palace among the stars'}];
function worldMedal(g,x,y,r,k,lit,t){if(lit)rings(g,x,y,r*1.1,3,r*.18,C.gold,3,.9);lotusFrame(g,x,y,r,{n:16,c1:lit?C.gold:C.agold,c2:lit?C.saffron:C.grey,bg:k==='celestial'?C.indigo:k==='water'?C.turq:C.cream});
  g.save();g.beginPath();g.ellipse(x,y,r-3,r-3,0,0,TAU);g.clip();const s=r/90;
  if(k==='living'){g.fillStyle=C.leaf;g.fillRect(x-r,y+20*s,r*2,r);Pat.dots(g,bb(x-r,y+20*s,r*2,r),C.cream,12*s,1.5*s);[[-42,0],[-16,-14]].forEach(([dx,dy])=>{shape(g,pl([[x+dx*s-4*s,y+24*s],[x+dx*s+4*s,y+24*s],[x+dx*s+3*s,y+dy*s],[x+dx*s-3*s,y+dy*s]],true),C.rust,null,{lw:1.2,line:'single'});shape(g,ell(x+dx*s,y+(dy-22)*s,22*s,26*s),C.leaf,gg=>Pat.petals(gg,bb(x+(dx-24)*s,y+(dy-50)*s,48*s,54*s),C.teal,12*s),{lw:1.6})});
    [[22,8],[50,12]].forEach(([dx,dy])=>{shape(g,pl([[x+(dx-16)*s,y+(dy+16)*s],[x+(dx+16)*s,y+(dy+16)*s],[x+(dx+16)*s,y+(dy-4)*s],[x+dx*s,y+(dy-20)*s],[x+(dx-16)*s,y+(dy-4)*s]],true),C.saffron,gg=>Pat.dots(gg,bb(x+(dx-16)*s,y+(dy-20)*s,32*s,36*s),C.verm,7*s,1.4*s),{lw:1.4});shape(g,rrect(x+(dx-4)*s,y+(dy+4)*s,8*s,12*s,2),C.ink,null,{line:'none'})})}
  else if(k==='water'){Pat.waves(g,bb(x-r,y-r,r*2,r*2),C.pale,22*s,2);[[-24,-10,1],[20,22,-1]].forEach(([dx,dy,d])=>fish(g,x+dx*s,y+dy*s,.6*s,C.coral,d,t))}
  else{Pat.dots(g,bb(x-r,y-r,r*2,r),C.cream,16*s,1.6*s);[[-40,-40],[38,-46],[0,-58]].forEach(([dx,dy])=>star(g,x+dx*s,y+dy*s,7*s,C.gold,4));
    shape(g,pl([[x-46*s,y+60*s],[x-46*s,y+4*s],[x-30*s,y-12*s],[x-14*s,y+4*s],[x-14*s,y-18*s],[x,y-40*s],[x+14*s,y-18*s],[x+14*s,y+4*s],[x+30*s,y-12*s],[x+46*s,y+4*s],[x+46*s,y+60*s]],true),C.gold,gg=>{Pat.diamonds(gg,bb(x-48*s,y-40*s,96*s,100*s),C.verm,14*s,true)},{lw:1.8});cloud(g,x,y+56*s,.5*s,C.cream,C.ink)}
  g.restore();if(lit)tick(g,x+r*.72,y+r*.72,r*.2)}
function kailasa(g,x,y,s,glow,t){g.save();g.translate(x,y);g.scale(s,s);if(glow>0){rings(g,0,-60,90,5,26,C.pale,5,glow);rings(g,0,-60,100,4,26,C.sblue,3,glow*.8)}
  [[-110,0,-40,-110,30,0],[-40,0,40,-170,120,0],[40,0,100,-100,160,0]].forEach(([a,b,c,d,e,f])=>shape(g,pl([[a,b],[c,d],[e,f]],true),C.pale,gg=>{gg.fillStyle=C.sblue;for(let k=0;k<5;k++){const yy=d+(b-d)*(.3+k*.15);gg.beginPath();for(let xx=-200;xx<200;xx+=14){gg.moveTo(xx,yy);gg.lineTo(xx+7,yy-8);gg.lineTo(xx+14,yy)}gg.fill()}},{lw:2.2,gap:C.sblue}));
  g.restore()}
function poisonCloud(g,x,y,h,w,t,s){s=s==null?1:s;if(s<=0)return;g.save();g.translate(x,y);g.scale(s,s);const br=reduceMotion?0:Math.sin(t*.9)*.02;g.scale(1+br,1-br);
  const curls=[[0,-h*.15,w*.42],[-w*.32,-h*.3,w*.26],[w*.32,-h*.32,w*.27],[-w*.18,-h*.55,w*.28],[w*.2,-h*.58,w*.27],[0,-h*.8,w*.28],[-w*.36,-h*.06,w*.2],[w*.36,-h*.05,w*.2]];
  curls.forEach(([a,b,r])=>{g.strokeStyle=C.grey;g.lineWidth=9;g.beginPath();g.ellipse(a,b,r,r*.8,0,0,TAU);g.stroke()});
  curls.forEach(([a,b,r],i)=>{shape(g,ell(a,b,r,r*.8),i%2?C.violet:C.plum,gg=>{Pat.diamonds(gg,bb(a-r,b-r,r*2,r*2),i%2?C.plum:C.violet,22,true);gg.strokeStyle=i%2?C.pink:C.violet;gg.lineWidth=3;gg.beginPath();for(let k=0;k<40;k++){const an=k*.28+t*.4*(i%2?1:-1),rr=k*r/48;k?gg.lineTo(a+Math.cos(an)*rr,b+Math.sin(an)*rr*.8):gg.moveTo(a,b)}gg.stroke()},{lw:2.4,gap:C.violet})});
  g.restore()}
const S4={label:'Screen 4 of 8',title:'The Halahala Poison',border:[C.plum,C.violet],
  alt:'A tall violet cloud of curling, patterned vapour rises from the ocean. The devas and asuras step back cautiously. Three round medallions show the living world, the water world and the celestial world. Far away stands Mount Kailasa.',
  enter(){this.st={lit:[false,false,false],ringP:[0,0,0],merge:0,armed:false,cloud:.6}},
  geo(){return L.portrait?{med:[[150,350,82],[450,330,82],[750,350,82]],kai:[450,190,.5],cl:[450,860,520,380],dev:[[70,1105],[160,1105]],asu:[[740,1105],[830,1105]],fs:.5,sea:870}
    :{med:[[250,300,94],[540,190,88],[1080,200,90]],kai:[1400,330,.85],cl:[800,690,500,460],dev:[[150,850],[280,850],[410,850]],asu:[[1190,850],[1320,850],[1450,850]],fs:.78,sea:650}},
  draw(g,t){const st=this.st,o=this.geo();skyField(g,C.indigo,{seed:31,density:7000,dot:C.grey,star:C.agold});
    (L.portrait?[[160,560,.5],[740,600,.5]]:[[760,90,.9],[260,540,.7],[1360,560,.7]]).forEach(([x,y,s])=>cloud(g,x,y,s,C.plum,C.ink));
    kailasa(g,o.kai[0],o.kai[1],o.kai[2],st.merge,t);
    sea(g,o.sea,L.B.y+L.B.h,{cols:[C.indigo,C.plum,C.deep],t,row:46,len:92,spd:8});
    poisonCloud(g,o.cl[0],o.cl[1],o.cl[3],o.cl[2],t,st.cloud);
    o.med.forEach(([x,y,r],k)=>{worldMedal(g,x,y,r,WORLDS[k].k,st.lit[k],t);if(st.armed&&!st.lit[k])hotIcon(g,x,y-r-18,16,t+k,'lotus')});
    const kx=o.kai[0],ky=o.kai[1]-60*o.kai[2];o.med.forEach(([x,y],k)=>{const p=st.ringP[k];if(p<=0)return;const e=Ease.io(Math.min(1,p)),mx=(x+kx)/2,my=Math.min(y,ky)-90;
      const bx=(1-e)*(1-e)*x+2*(1-e)*e*mx+e*e*kx,by=(1-e)*(1-e)*y+2*(1-e)*e*my+e*e*ky;if(st.merge<1){ring(g,bx,by,20,C.gold,5);ring(g,bx,by,13,C.cream,2)}});
    const bl=L.portrait?0:1;island(g,L.B.x-20,(o.dev[o.dev.length-1][0])+70,o.dev[0][1]-4,80);island(g,o.asu[0][0]-70,L.B.x+L.B.w+20,o.asu[0][1]-4,80);void bl;
    o.dev.forEach(([x,y],k)=>person(g,'deva'+k,'back','concern',x,y,o.fs,false,-.05));o.asu.forEach(([x,y],k)=>person(g,'asura'+(2-k),'back','concern',x,y,o.fs,true,.05))},
  hit(x,y){const st=this.st,o=this.geo();if(!st.armed)return null;for(let k=0;k<3;k++){const[mx,my,r]=o.med[k];if(inCirc(x,y,mx,my,r+14))return{tap:()=>this.call(k)}}return null},
  call(k){const st=this.st;if(st.lit[k])return;st.lit[k]=true;AU.sfx('call');const b=$('world'+k);if(b)UI.markDone(b,WORLDS[k].name+', has called for help');
    const n=st.lit.filter(Boolean).length;this.count(n);tw(st.ringP,{[k]:1},D.fast?2:1600,'io').then(()=>{if(st.lit.every(Boolean)&&st.ringP.every(v=>v>=1)&&st.merge<1){AU.sfx('warm');tw(st,{merge:1},D.fast?2:1200,'io').then(()=>D.complete())}})},
  count(n){const c=$('wcount');if(c)c.textContent=n+' of 3 worlds have called for help.'},
  async run(){const st=this.st;Music.mood('dark');AU.amb(.03);await D.wait(400);AU.sfx('hush');await D.say(TXT.s4[0]);await D.say(TXT.s4[1]);st.armed=true;
    await D.activity({head:'Protect the three worlds',prompt:'Tap each symbol to send a call for help.',hint:'Tap a round world picture to send a golden call for help.',
      build:el=>{const c=document.createElement('p');c.id='wcount';c.className='panelNote';c.setAttribute('role','status');c.textContent='0 of 3 worlds have called for help.';el.append(c);
        WORLDS.forEach((w,k)=>{const b=UI.btn(w.name,{sub:w.sub,icon:'w-'+w.k,on:()=>this.call(k)});b.id='world'+k;el.append(b)})},
      assist:()=>{const k=st.lit.indexOf(false);if(k>=0)this.call(k)}});
    await D.wait(700);await D.remember(REM[3]);await D.beforeOutro();UI.remember(null)}};

/* ===== SCREEN 5 · Shiva Protects Creation ===== */
function trident(g,x,y,h,s){g.save();g.translate(x,y);g.scale(s,s);shape(g,pl([[-4,0],[4,0],[4,-h],[-4,-h]],true),C.dgold,null,{lw:1.6,line:'single'});
  const p=new Path2D();p.moveTo(-36,-h+40);p.quadraticCurveTo(-36,-h-6,-28,-h-40);p.lineTo(-20,-h-6);p.quadraticCurveTo(-10,-h+14,0,-h+12);p.quadraticCurveTo(10,-h+14,20,-h-6);p.lineTo(28,-h-40);p.quadraticCurveTo(36,-h-6,36,-h+40);p.quadraticCurveTo(10,-h+28,0,-h+30);p.quadraticCurveTo(-10,-h+28,-36,-h+40);p.closePath();
  shape(g,p,C.pale,null,{lw:1.8,gap:C.sblue});shape(g,pl([[0,-h-70],[9,-h-20],[0,-h+10],[-9,-h-20]],true),C.pale,null,{lw:1.8,gap:C.sblue});
  shape(g,ell(0,-h+60,16,10),C.dgold,gg=>Pat.dots(gg,bb(-16,-h+50,32,20),C.cream,6,1.4),{lw:1.4});g.restore()}
const S5={label:'Screen 5 of 8',title:'Shiva Protects Creation',border:[C.sblue,C.pale],
  alt:'Lord Shiva sits calmly before the snowy peaks of Mount Kailasa, with Goddess Parvati beside him and his trident nearby. A small violet-blue glow is held safely at his throat, circled by a bright blue ring.',
  enter(){this.st={halo:0,revealed:false,armed:false,shrink:0,blue:0}},
  geo(){return L.portrait?{sx:450,sy:905,ss:1.48,px:742,py:935,ps:1.0,tx:150,ty:950,ts:.75,far:[170,170,.55]}:{sx:800,sy:812,ss:1.7,px:1130,py:822,ps:1.28,tx:520,ty:830,ts:1,far:[230,150,.8]}},
  draw(g,t){const st=this.st,o=this.geo(),B=L.B;skyField(g,C.pale,{seed:51,density:9000,dot:C.sblue,star:C.sblue});
    (L.portrait?[[640,90,.55]]:[[560,90,.8],[1100,80,.8]]).forEach(([x,y,s])=>cloud(g,x,y,s,C.pale,C.sblue));
    const base=L.portrait?720:640;[[o.sx-520,base,o.sx-260,base-300,o.sx,base],[o.sx-330,base,o.sx,base-560,o.sx+330,base],[o.sx,base,o.sx+280,base-330,o.sx+560,base]].forEach(([a,b,c,d,e,f],i)=>{
      shape(g,pl([[a,b],[c,d],[e,f]],true),i===1?C.pale:C.cream,gg=>{gg.fillStyle=C.sblue;for(let k=0;k<6;k++){const yy=d+(b-d)*(.22+k*.13);gg.beginPath();for(let xx=a;xx<e;xx+=18){gg.moveTo(xx,yy);gg.lineTo(xx+9,yy-10);gg.lineTo(xx+18,yy)}gg.fill()}},{lw:2.4,gap:C.sblue})});
    shape(g,pl([[B.x-10,base-6],[B.x+B.w+10,base-6],[B.x+B.w+10,B.y+B.h+10],[B.x-10,B.y+B.h+10]],true),C.pale,gg=>{Pat.flowers(gg,bb(B.x,base,B.w,500),C.sblue,46,C.gold);Pat.dots(gg,bb(B.x,base,B.w,500),C.cream,23,1.4)},{lw:2.4,gap:C.sblue});
    /* the distant worlds, safe inside a blue-white ring as the cloud shrinks */
    const[fx,fy,fs]=o.far;poisonCloud(g,fx,fy+10*fs,120*fs,140*fs,t,1-.75*st.shrink);[[-46,40],[-16,52],[16,52],[46,40]].forEach(([dx,dy],i)=>shape(g,ell(fx+dx*fs,fy+dy*fs,13*fs),[C.leaf,C.turq,C.saffron,C.gold][i],null,{lw:1.4,line:'single'}));
    if(st.shrink>0){g.globalAlpha=st.shrink;ring(g,fx,fy+44*fs,90*fs,C.pale,6,40*fs);ring(g,fx,fy+44*fs,98*fs,C.sblue,3,46*fs);g.globalAlpha=1}
    const hx=o.sx,hy=o.sy+(-262+DYS)*o.ss;if(st.halo>0){rays(g,hx,hy,150*o.ss*(.6+.4*st.halo),230*o.ss*(.6+.4*st.halo),24,C.gold,t*.04,Math.min(1,st.halo));rings(g,hx,hy,140*o.ss*st.halo,3,18,C.sblue,4,Math.min(1,st.halo))}
    trident(g,o.tx,o.ty,420,o.ts);
    halo(g,hx,hy-14*o.ss,64*o.ss,t,[C.pale,C.sblue]);
    shape(g,ell(o.sx,o.sy+6,150*o.ss,22*o.ss),C.saffron,gg=>lowPats.tiger()(gg,bb(o.sx-160*o.ss,o.sy-20*o.ss,320*o.ss,50*o.ss)),{lw:2});
    person(g,'parvati','seated','compassion',o.px,o.py,o.ps);person(g,'shiva','seated','serene',o.sx,o.sy,o.ss);
    /* Neelakantha: the contained glow at the throat, always unobstructed */
    const[tx,ty]=throatPos(o.sx,o.sy,o.ss),k=reduceMotion?0:Math.sin(t*2.2)*.08,r=9*o.ss;
    rings(g,tx,ty,r*(1.7+k),3,r*.55,C.sblue,3,.9);shape(g,ell(tx,ty,r*1.25),C.sblue,null,{lw:1.4,line:'single'});shape(g,ell(tx,ty,r*.8),C.violet,gg=>dot(gg,tx,ty,r*.3,C.pale),{lw:1.2,line:'single'});ring(g,tx,ty,r*1.25,C.pale,2);
    if(st.armed&&!st.revealed&&T.now-D.hintAt<4500)rings(g,tx,ty,r*2.4,3,r*.6,C.gold,3,.9)},
  hit(x,y){const st=this.st,o=this.geo();if(!st.armed||st.revealed)return null;const[tx,ty]=throatPos(o.sx,o.sy,o.ss);if(inCirc(x,y,tx,ty,64))return{tap:()=>this.reveal()};return null},
  reveal(){const st=this.st;if(st.revealed)return;st.revealed=true;AU.sfx('warm');Music.swell();const b=$('neel');if(b)UI.markDone(b,'Meaning revealed');
    tw(st,{halo:1},D.fast?2:1600,'out');const box=document.createElement('div');box.className='reveal';
    box.innerHTML='<b>Neelakantha: the blue-throated Lord</b>Shiva held the poison in his throat so it could not spread. He did it to protect all of creation.<details><summary>For older readers</summary>In the Śrīmad Bhāgavatam, Canto 8, Chapter 7, Shiva’s response to the spreading poison is connected with compassion for living beings and the duty to protect those in danger.</details>';
    $('act').append(box);UI.status('');Timers.add(D.fast?2:900,()=>D.complete())},
  async run(){const st=this.st;Music.mood('calm');AU.amb(.02);await D.wait(500);await D.say(TXT.s5[0]);tw(st,{shrink:1},2400,'io');await D.say(TXT.s5[1]);st.armed=true;
    await D.activity({head:'Discover Neelakantha',prompt:'Tap the blue glow on Shiva’s throat.',hint:'Look for the small blue glow at Shiva’s throat, and tap it.',
      build:el=>{const b=UI.btn('Reveal the meaning',{main:true,aria:'Reveal the meaning of Neelakantha',on:()=>this.reveal()});b.id='neel';el.append(b)},assist:()=>this.reveal()});
    await D.wait(1600);await D.remember(REM[4]);await D.beforeOutro();UI.remember(null);await D.tw(st,{halo:1.4},1200,'io')}};
