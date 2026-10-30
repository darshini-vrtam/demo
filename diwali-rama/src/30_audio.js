/* ===== Sound: recorded ElevenLabs music, ambience and effects (sfx/*.mp3), with synthesised stand-ins, behind one master gain that respects mute ===== */
const AU={ctx:null,master:null,vol:.4,/* music and sound effects play at 40%; narration clips play separately at full volume */sfxG:null,muted:false,noiseBuf:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();
    this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:this.vol;this.master.connect(this.ctx.destination);
    this.sfxG=this.ctx.createGain();this.sfxG.gain.value=.7;this.sfxG.connect(this.master);
    const len=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noiseBuf=b;
    Music.init();Amb.init();Snd.load()}catch(e){this.ctx=null}},
  resume(){try{this.ctx&&this.ctx.state==='suspended'&&this.ctx.resume()}catch(e){}},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:this.vol,this.ctx.currentTime,.05)},
  t(){return this.ctx.currentTime},
  osc(type,f,t0,dur,g,dest,f2){const c=this.ctx,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.04,dur*.2));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);o.connect(e);e.connect(dest||this.sfxG);o.start(t0);o.stop(t0+dur+.05);return o},
  noise(t0,dur,g,type,f,q,f2,dest){const c=this.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuf;s.loop=true;fl.type=type||'bandpass';
    fl.frequency.setValueAtTime(f||1000,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);fl.Q.value=q||1;
    e.gain.setValueAtTime(0.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.25,dur*.3));e.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
    s.connect(fl);fl.connect(e);e.connect(dest||this.sfxG);s.start(t0);s.stop(t0+dur+.05)},
  sfx(name){if(!this.ctx||this.muted)return;if(Snd.play(name))return;const t=this.t();try{switch(name){
    case'chime':[880,1320,1760,2217].forEach((f,i)=>this.osc('sine',f,t+i*.09,2.2-i*.3,.12-i*.02));break;
    case'success':[523,659,784,1047].forEach((f,i)=>this.osc('triangle',f,t+i*.1,.6,.12));break;
    case'sparkle':for(let i=0;i<7;i++)this.osc('sine',1175+i*196,t+i*.07,.55,.05);break;
    case'whoosh':this.noise(t,.9,.22,'bandpass',300,1.2,2400);break;
    case'land':this.osc('sine',180,t,.25,.16,null,90);this.noise(t,.3,.08,'lowpass',500,.7);break;
    case'rustle':this.noise(t,.7,.1,'highpass',2600,.8);break;
    case'click':this.osc('triangle',740,t,.08,.14);this.osc('sine',300,t+.03,.18,.12,null,200);break;
    case'settle':this.osc('sine',220,t,.3,.18,null,160);this.noise(t,.18,.06,'lowpass',700,.7);this.osc('sine',880,t+.12,.4,.05);break;
    case'float':this.osc('sine',520,t,.5,.08,null,330);break;
    case'bow':this.osc('triangle',200,t,.35,.1,null,140);this.noise(t,.5,.08,'bandpass',900,2,2400);break;
    case'shield':[392,523].forEach((f,i)=>this.osc('sine',f,t+i*.05,1.4,.06));break;
    case'dust':this.noise(t,1.6,.08,'lowpass',400,.6,180);break;
    case'flicker':this.noise(t,.35,.05,'bandpass',1800,3);break;
    case'diya':this.osc('sine',1568,t,.6,.09);this.osc('sine',2093,t+.08,.7,.06);this.noise(t,.3,.04,'bandpass',1800,3);break;
    case'bell':[660,1320,1980].forEach((f,i)=>this.osc('sine',f,t,2.6-i*.6,.12/(i+1)));break;
    case'celebrate':[523,659,784].forEach((f,i)=>this.osc('triangle',f,t+i*.12,.5,.08));this.osc('sine',110,t,.3,.18,null,70);this.osc('sine',110,t+.45,.3,.14,null,70);[880,1320].forEach((f,i)=>this.osc('sine',f,t+.3+i*.2,1.8,.05));break;
    case'swell':[262,330,392,523].forEach((f,i)=>this.osc('sine',f,t+i*.25,3.2,.06));break;
    case'pop':this.osc('sine',620,t,.09,.16,null,1300);break;
    case'tap':this.osc('triangle',660,t,.1,.12);break;
    case'soft':this.osc('sine',520,t,.25,.1,null,440);break;
    case'bloom':[587,740,880].forEach((f,i)=>this.osc('sine',f,t+i*.14,1.4,.06));break;
    case'hop':this.osc('sine',400,t,.16,.1,null,620);break;
    case'fire':this.noise(t,1.4,.2,'bandpass',600,.8,2400);this.noise(t+.1,1,.08,'highpass',3000,.8);break;
    case'gate':this.osc('sawtooth',70,t,2.2,.05,null,55);this.noise(t,2.4,.06,'lowpass',380,.7);break;
    case'flowers':for(let i=0;i<5;i++)this.osc('sine',1320+i*220,t+i*.18,.9,.03);break}}catch(e){}}};

/* ambience beds: forest (stream and birdsong), ocean (slow swells), city (soft bells), night; crossfaded by name */
const Amb={g:null,want:'none',nodes:{},next:0,
  init(){const c=AU.ctx;this.g=c.createGain();this.g.gain.value=.5;this.g.connect(AU.master);this.rg=c.createGain();this.rg.gain.value=.5;/* ambience sits at half the music level */this.rg.connect(AU.master);
    const bed=(type,f,q,gain)=>{const s=c.createBufferSource();s.buffer=AU.noiseBuf;s.loop=true;const fl=c.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;const e=c.createGain();e.gain.value=0;
      const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=type==='lowpass'?.13:.4;lg.gain.value=gain*.5;lfo.connect(lg);lg.connect(e.gain);lfo.start();s.connect(fl);fl.connect(e);e.connect(this.g);s.start();return{e,gain,lg}};
    this.nodes={stream:bed('bandpass',1500,.8,.05),ocean:bed('lowpass',420,.6,.16),hum:bed('lowpass',220,.5,.04)};this.set(this.want)},
  /* recorded loops per place; while one is playing the noise beds and the scattered birdsong stay silent */
  REC:{forest:['amb_forest',1],grove:['amb_forest',.7],ocean:['amb_ocean',1],bridge:['amb_ocean',.8],city:['amb_city',1],night:['amb_night',1],lanka:['amb_night',.6]},loop:null,
  playRec(){if(!AU.ctx||!this.g)return;const r=this.REC[this.want],id=r&&Snd.buf[r[0]]?r[0]:null,t=AU.t();
    if(this.loop&&(this.loop.id!==id||!id)){const o=this.loop;o.e.gain.setTargetAtTime(0,t,.8);setTimeout(()=>{try{o.s.stop()}catch(e){}},4000);this.loop=null}
    if(id&&!this.loop){const s=AU.ctx.createBufferSource();s.buffer=Snd.buf[id];s.loop=true;const e=AU.ctx.createGain();e.gain.value=0;s.connect(e);e.connect(this.rg);s.start();this.loop={id,s,e}}
    if(this.loop)this.loop.e.gain.setTargetAtTime(r[1],t,.8);return !!this.loop},
  set(name){this.want=name;if(!AU.ctx)return;const t=AU.t();const rec=this.playRec();const lv={forest:{stream:1},grove:{stream:.5},ocean:{ocean:1},bridge:{ocean:.8},city:{hum:1},night:{hum:.6},lanka:{hum:.5},none:{}}[name]||{};
    for(const k in this.nodes){const n=this.nodes[k];const v=rec?0:(lv[k]||0)*n.gain;n.e.gain.setTargetAtTime(v,t,1.2);n.lg.gain.setTargetAtTime(v*.5,t,1.2)}},
  /* birdsong and soft festival bells, scattered in time */
  tick(){if(!AU.ctx||AU.muted||this.loop)return;const t=AU.t();if(t<this.next)return;const w=this.want;
    if(w==='forest'||w==='grove'){const f=1800+Math.random()*1400;for(let i=0;i<3;i++)AU.osc('sine',f+i*120,t+i*.11,.12,.025,this.g,f*1.3+i*120);if(Math.random()<.3)AU.noise(t+.4,.6,.03,'highpass',2600,.8,null,this.g);this.next=t+2+Math.random()*4}
    else if(w==='city'){AU.osc('sine',[1320,1568,1760][Math.floor(Math.random()*3)],t,1.8,.02,this.g);this.next=t+4+Math.random()*5}
    else if(w==='night'){AU.osc('sine',4200,t,.05,.008,this.g);AU.osc('sine',4200,t+.09,.05,.008,this.g);this.next=t+1.2+Math.random()*2}
    else this.next=t+2}};

/* music: a recorded bed per mood (sfx/bg_*.mp3) at a steady 40%, crossfaded; without the files, a low drone and slow pentatonic plucks whose level follows the mood */
const BED_BY_MOOD={warm:'bg_ayodhya',welcome:'bg_festive',inviting:'bg_adventure',energetic:'bg_adventure',suspense:'bg_tense',cliff:'bg_tense',serious:'bg_tense',heartfelt:'bg_tender',gentle:'bg_tender',respectful:'bg_divine'};
const BED_BY_SHOT={'2.5':'bg_divine','2.7':'bg_divine','2.6':'bg_festive','2.10':'bg_festive'};
const Music={nodes:null,level:.45,next:0,ducked:false,quiet:false,want:null,bed:null,
  /* pick the bed for a story mood (a shot can pin its own); called from mood() */
  auto(k){this.bedTo(BED_BY_SHOT[D.shot]||BED_BY_MOOD[k]||this.want)},
  bedTo(id){if(!id)return;this.want=id;if(!this.nodes)return;const b=Snd.buf[id];if(this.bed&&this.bed.id===id)return;const c=AU.ctx,t=c.currentTime;
    if(!b)return;if(this.bed){const o=this.bed;o.e.gain.setTargetAtTime(0,t,.9);setTimeout(()=>{try{o.s.stop()}catch(e){}},5000)}
    const s=c.createBufferSource();s.buffer=b;s.loop=true;const e=c.createGain();e.gain.value=0;s.connect(e);e.connect(this.nodes.bedG);s.start();e.gain.setTargetAtTime(1,t,.9);
    this.bed={id,s,e};this.nodes.g.gain.setTargetAtTime(0,t,.5);this.setLevel(this.level,1)},
  init(){const c=AU.ctx;const g=c.createGain();g.gain.value=0;g.connect(AU.master);const bedG=c.createGain();bedG.gain.value=0;bedG.connect(AU.master);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=560;lp.connect(g);
    const dr=[146.83,220].map(f=>{const o=c.createOscillator();o.type='sawtooth';o.frequency.value=f;const og=c.createGain();og.gain.value=.022;o.connect(og);og.connect(lp);o.start();return o});
    const pl=c.createGain();pl.gain.value=1;pl.connect(g);this.nodes={g,lp,pl,dr,bedG};this.setLevel(this.level,3);if(this.want)this.bedTo(this.want)},
  setLevel(v,sec){this.level=v;if(!this.nodes)return;const t=AU.t(),tc=(sec||2)/3;
    /* a recorded bed holds its level (the master sets it at 40%); only the shloka hush lowers it */
    if(this.bed){this.nodes.bedG.gain.setTargetAtTime(this.quiet?.25:1,t,tc);this.nodes.g.gain.setTargetAtTime(0,t,tc);return}
    this.nodes.g.gain.setTargetAtTime(v*(this.ducked?.5:.7),t,tc)},
  duck(on){this.ducked=on;this.setLevel(this.level,.6)},
  swell(){AU.sfx('swell');this.setLevel(1,2);setTimeout(()=>{if(this.level===1)this.setLevel(.5,4)},9000)},
  hush(on){this.quiet=on;this.setLevel(on?.03:.45,2);if(on){this._amb=Amb.want;Amb.set('none')}else if(this._amb){Amb.set(this._amb);this._amb=null}},
  mood(m){if(!this.nodes)return;this.nodes.lp.frequency.setTargetAtTime(m==='lanka'?380:m==='light'?820:600,AU.t(),1.5)},
  tick(){if(!this.nodes||this.bed||AU.muted||this.level<.08)return;const c=AU.ctx,t=c.currentTime;if(t<this.next)return;
    const sc=[293.66,329.63,369.99,440,493.88,587.33,659.25];const f=sc[Math.floor(Math.random()*sc.length)]*(Math.random()<.3?.5:1);
    const o=c.createOscillator(),e=c.createGain();o.type='triangle';o.frequency.value=f;e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.04*this.level+.006,t+.02);
    e.gain.exponentialRampToValueAtTime(.0001,t+1.6);o.connect(e);e.connect(this.nodes.pl);o.start(t);o.stop(t+1.7);this.next=t+(this.level>.8?.8:1.8)+Math.random()*1.8}};

/* recorded effects, ambience loops and music beds (ElevenLabs), decoded once; each falls back to its synthesised version until it loads or if it is missing */
const Snd={ids:typeof SND_IDS!=='undefined'?SND_IDS:[],buf:{},
  load(){this.ids.forEach(id=>{fetch('sfx/'+id+'.mp3').then(r=>r.ok?r.arrayBuffer():Promise.reject(r.status)).then(b=>AU.ctx.decodeAudioData(b))
    .then(d=>{this.buf[id]=d;if(id.startsWith('bg_')&&id===Music.want)Music.bedTo(id);if(id.startsWith('amb_'))Amb.set(Amb.want)}).catch(()=>{})})},
  play(name){const b=this.buf[name];if(!b||name.startsWith('bg_')||name.startsWith('amb_'))return false;const c=AU.ctx,s=c.createBufferSource();s.buffer=b;s.connect(AU.master);s.start();return true}};

/* ===== Speech: a warm unhurried Narrator; Rama calm, Sita gentle, Lakshmana young, Hanuman warm, Ravana low and proud ===== */
const VOICE={narr:{name:'Narrator',col:P.turmeric,pitch:.98,rate:.86},rama:{name:'Rama',col:SKIN.rama,pitch:.78,rate:.84},sita:{name:'Sita',col:P.verm,pitch:1.22,rate:.88},
  lak:{name:'Lakshmana',col:P.leaf,pitch:1.14,rate:.98},hanuman:{name:'Hanuman',col:P.marigold,pitch:.96,rate:1},ravana:{name:'Ravana',col:P.maroon,pitch:.6,rate:.82},
  shloka:{name:'Narrator',col:P.turmeric,pitch:.96,rate:.66}};
const Speech={ok:false,voices:[],pick:{},
  init(){try{if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return;this.ok=true;const load=()=>{this.voices=speechSynthesis.getVoices()||[];this.assign()};load();
    speechSynthesis.onvoiceschanged=load}catch(e){this.ok=false}},
  assign(){const en=this.voices.filter(v=>/^en/i.test(v.lang));this.hindi=this.voices.find(v=>/^hi[-_]?IN/i.test(v.lang))||this.voices.find(v=>/^hi/i.test(v.lang))||null;
    this.enIN=en.find(v=>/en[-_]IN/i.test(v.lang))||null;if(!en.length){this.pick={shloka:this.hindi};return}
    const score=v=>(/en[-_]IN/i.test(v.lang)?4:0)+(/natural|neural|enhanced|premium/i.test(v.name)?2:0)+(/en[-_]GB/i.test(v.lang)?1:0)+(v.localService?.5:0);const by=en.slice().sort((a,b)=>score(b)-score(a));
    const fem=by.filter(v=>/female|woman|veena|heera|neerja|kalpana|samantha|karen|moira|tessa|zira|susan|serena|fiona|aria|jenny|sonia|libby|natasha/i.test(v.name));
    const male=by.filter(v=>/male|man\b|rishi|ravi|prabhat|daniel|david|george|alex|guy|ryan|thomas|fred|mark|james/i.test(v.name)&&!/female/i.test(v.name));
    const n=fem[0]||by[0],m=male[0]||by[0];this.pick={narr:n,rama:m,sita:fem[1]||n,lak:male[1]||m,hanuman:male[2]||male[0]||m,ravana:m,shloka:this.hindi||this.enIN||n}},
  available(){return this.ok&&this.voices.length>0},
  /* report for the build notes */
  report(){return{api:this.ok,voices:this.voices.length,hindi:this.hindi?this.hindi.name:null,enIN:this.enIN?this.enIN.name:null,narr:this.pick.narr?this.pick.narr.name:null}},
  speak(who,text,mood,onWord){return new Promise(res=>{if(!this.available()||AU.muted){res(false);return}
    let done=false;const fin=()=>{if(!done){done=true;res(true)}};
    try{const u=new SpeechSynthesisUtterance(text.replace(/[“”"*]/g,'').replace(/[‘’]/g,"'").replace(/[—…]/g,', '));const V=VOICE[who]||VOICE.narr;const md=mood||{};
      u.pitch=clamp(V.pitch*(who==='narr'?(md.pitch||1):1),.1,2);u.rate=clamp(V.rate*(who==='narr'?(md.rate||1):1),.5,1.5);u.volume=who==='narr'?(md.vol||1):1;
      const v=this.pick[who];if(v)u.voice=v;u.lang=v?v.lang:(who==='shloka'?'hi-IN':'en-IN');u.onend=fin;u.onerror=fin;if(onWord)u.onboundary=e=>{if(e.name==='word'||e.name==null)onWord(e.charIndex)};
      this.cur=fin;speechSynthesis.speak(u);setTimeout(fin,Math.max(4000,text.length*95/u.rate+3000))}catch(e){fin()}})},
  stop(){Clips.stop();try{if(this.ok)speechSynthesis.cancel()}catch(e){}if(this.cur){const f=this.cur;this.cur=null;f()}}};
/* Clips: pre-recorded ElevenLabs narration (audio/<id>.mp3, id = FNV-1a of "voice|text"); preferred over the browser voice, which stays the fallback */
const Clips={rate:1,shlokaRate:1,ids:new Set(typeof CLIP_IDS!=='undefined'?CLIP_IDS:[]),cur:null,
  id(v,t){const s=v+'|'+t;let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0).toString(36)},
  has(v,t){return this.ids.has(this.id(v,t))},
  play(v,t,onWord){return new Promise(res=>{let done=false;const a=new Audio('audio/'+this.id(v,t)+'.mp3');a.preservesPitch=true;a.playbackRate=v==='shloka'?this.shlokaRate:this.rate;
    const fin=ok=>{if(done)return;done=true;clearInterval(iv);clearTimeout(to);if(this.cur&&this.cur.a===a)this.cur=null;res(ok)};
    const iv=setInterval(()=>{if(a.duration&&onWord)onWord(Math.floor(a.currentTime/a.duration*t.length))},80);const to=setTimeout(()=>fin(true),Math.max(9000,t.length*220));
    a.onended=()=>fin(true);a.onerror=()=>fin(false);this.cur={a,fin};const pr=a.play();if(pr&&pr.catch)pr.catch(()=>fin(false))})},
  stop(){if(this.cur){try{this.cur.a.pause()}catch(e){}this.cur.fin(true)}}};
function canSpeak(v,t){return !AU.muted&&((v&&Clips.has(v,t))||Speech.available())}
function speakAny(v,t,mood,onWord){if(AU.muted)return Promise.resolve(false);
  if(Clips.has(v,t))return Clips.play(v,t,onWord).then(ok=>ok||(Speech.available()?Speech.speak(v,t,mood,onWord):false));
  return Speech.available()?Speech.speak(v,t,mood,onWord):Promise.resolve(false)}
