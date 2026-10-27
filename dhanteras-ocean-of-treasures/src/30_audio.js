/* ===== Sound: everything synthesised with Web Audio behind one master gain; mute silences all of it ===== */
const AU={ctx:null,master:null,sfxG:null,ambG:null,muted:false,noiseBuf:null,
  init(){if(this.ctx)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();
    this.master=this.ctx.createGain();this.master.gain.value=this.muted?0:1;this.master.connect(this.ctx.destination);
    this.sfxG=this.ctx.createGain();this.sfxG.gain.value=.55;this.sfxG.connect(this.master);
    const len=this.ctx.sampleRate*2,b=this.ctx.createBuffer(1,len,this.ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;this.noiseBuf=b;
    this.ambience();Music.init()}catch(e){this.ctx=null}},
  resume(){try{this.ctx&&this.ctx.state==='suspended'&&this.ctx.resume()}catch(e){}},
  setMute(m){this.muted=m;if(this.master)this.master.gain.setTargetAtTime(m?0:1,this.ctx.currentTime,.05)},
  t(){return this.ctx.currentTime},
  /* soft water ambience throughout: slow-swelling filtered noise */
  ambience(){const c=this.ctx,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain(),l=c.createOscillator(),lg=c.createGain();s.buffer=this.noiseBuf;s.loop=true;f.type='lowpass';f.frequency.value=420;
    g.gain.value=.025;l.frequency.value=.11;lg.gain.value=.014;l.connect(lg);lg.connect(g.gain);s.connect(f);f.connect(g);g.connect(this.master);s.start();l.start();this.ambG=g},
  amb(level){if(this.ambG)this.ambG.gain.setTargetAtTime(level,this.t(),1.2)},
  osc(type,f,t0,dur,g,f2){const c=this.ctx,o=c.createOscillator(),e=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t0+dur);
    e.gain.setValueAtTime(.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.04,dur*.2));e.gain.exponentialRampToValueAtTime(.0001,t0+dur);o.connect(e);e.connect(this.sfxG);o.start(t0);o.stop(t0+dur+.05)},
  noise(t0,dur,g,type,f,q,f2){const c=this.ctx,s=c.createBufferSource(),fl=c.createBiquadFilter(),e=c.createGain();s.buffer=this.noiseBuf;s.loop=true;fl.type=type||'bandpass';
    fl.frequency.setValueAtTime(f||1000,t0);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t0+dur);fl.Q.value=q||1;e.gain.setValueAtTime(.0001,t0);e.gain.exponentialRampToValueAtTime(g,t0+Math.min(.3,dur*.3));
    e.gain.exponentialRampToValueAtTime(.0001,t0+dur);s.connect(fl);fl.connect(e);e.connect(this.sfxG);s.start(t0);s.stop(t0+dur+.05)},
  bell(f,t0,g,dur){this.osc('sine',f,t0,dur||1.8,g||.12);this.osc('sine',f*2.76,t0,(dur||1.8)*.5,(g||.12)*.3)},
  sfx(name){if(!this.ctx||this.muted)return;const t=this.t();try{switch(name){
    case'ripple':this.noise(t,1.6,.12,'lowpass',380,.7,900);[784,1175].forEach((f,i)=>this.bell(f,t+.05+i*.16,.07,1.4));break;
    case'chime':[784,988,1175,1568].forEach((f,i)=>this.bell(f,t+i*.08,.08,1.4));break;
    case'creak':this.osc('sawtooth',62,t,.5,.035,74);this.noise(t,.45,.07,'bandpass',300,6,520);this.noise(t+.25,1.1,.11,'lowpass',420,.8,240);break;
    case'nudge':this.osc('sine',330,t,.3,.07,294);break;
    case'shimmer':for(let k=0;k<7;k++)this.bell(1046*Math.pow(1.122,k%5),t+k*.11,.05,1.2);break;
    case'slide':this.noise(t,.8,.11,'bandpass',600,.9,1500);break;
    case'hush':this.noise(t,2.6,.07,'lowpass',700,.6,180);this.osc('sine',196,t,2.4,.03,147);break;
    case'call':this.bell(659,t,.07,1.3);this.bell(988,t+.18,.05,1.2);break;
    case'warm':[262,392,523,659].forEach((f,i)=>this.bell(f,t+i*.05,.07,3));break;
    case'sparkle':[1318,1568,1760,2093,2637].forEach((f,i)=>this.bell(f,t+i*.07,.05,1.1));break;
    case'glowbell':this.bell(523,t,.11,3.2);this.bell(784,t+.3,.07,3);break;
    case'crackle':for(let k=0;k<6;k++)this.noise(t+k*.09+Math.random()*.05,.05,.06,'highpass',2400,1);break;
    case'tap':this.osc('triangle',660,t,.12,.1);break;
    case'lock':this.osc('triangle',523,t,.14,.1);this.osc('triangle',784,t+.09,.2,.1);break;
    case'soft':this.osc('sine',392,t,.35,.08,330);break}}catch(e){}}};

/* soft ambient music: low drone and sparse sitar/flute-like pentatonic notes; swells at moments of relief */
const Music={nodes:null,level:.35,next:0,scale:[293.66,329.63,369.99,440,493.88,587.33],
  init(){const c=AU.ctx;const g=c.createGain();g.gain.value=0;g.connect(AU.master);const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=650;lp.connect(g);
    [146.83,220,293.66].forEach((f,i)=>{const o=c.createOscillator();o.type=i===2?'sine':'triangle';o.frequency.value=f;const og=c.createGain();og.gain.value=i===2?.012:.03;o.connect(og);og.connect(lp);
      const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.07+i*.03;lg.gain.value=.01;lfo.connect(lg);lg.connect(og.gain);lfo.start();o.start()});
    const pl=c.createGain();pl.gain.value=1;pl.connect(g);this.nodes={g,lp,pl};this.set(.35,3)},
  set(v,sec){this.level=v;if(this.nodes)this.nodes.g.gain.setTargetAtTime(v*.5,AU.t(),(sec||2)/3)},
  swell(){this.set(1,1.5);clearTimeout(this.sw);this.sw=setTimeout(()=>this.set(.4,4),9000)},
  mood(m){if(!this.nodes)return;const map={calm:[293.66,329.63,369.99,440,493.88,587.33],dark:[220,246.94,261.63,329.63,349.23],bright:[392,440,493.88,587.33,659.25,783.99]};
    this.scale=map[m]||map.calm;this.nodes.lp.frequency.setTargetAtTime(m==='dark'?380:m==='bright'?950:650,AU.t(),1.5)},
  tick(){if(!this.nodes||AU.muted||this.level<.05)return;const c=AU.ctx,t=c.currentTime;if(t<this.next)return;
    const f=this.scale[Math.floor(Math.random()*this.scale.length)]*(Math.random()<.3?.5:1);const o=c.createOscillator(),o2=c.createOscillator(),e=c.createGain();o.type='triangle';o2.type='sine';o.frequency.value=f;o2.frequency.value=f*2.01;
    e.gain.setValueAtTime(.0001,t);e.gain.exponentialRampToValueAtTime(.035*this.level+.006,t+.02);e.gain.exponentialRampToValueAtTime(.0001,t+1.9);o.connect(e);o2.connect(e);e.connect(this.nodes.pl);o.start(t);o2.start(t);o.stop(t+2);o2.stop(t+2);
    this.next=t+(this.level>.8?.55:1.5)+Math.random()*1.6}};

/* ===== Narrator: one warm Indian-English storyteller voice. Displayed text stays verbatim; speech uses a pronunciation map. ===== */
const SAY_MAP=[[/\bamrita\b/gi,'um-ree-ta'],[/\bHalahala\b/g,'Haa-la-haa-la'],[/\bNeelakantha\b/g,'Neela-kantha'],[/\bUchchaihshravas\b/g,'Ooch-chai-shra-vus'],
  [/\bKalpavriksha\b/g,'Kalpa-vrik-sha'],[/\bAiravata\b/g,'Ai-raa-vata'],[/\bDhanvantari\b/g,'Dhun-vun-turi'],[/\bVasuki\b/g,'Vaa-suki'],[/\bMandara\b/g,'Mun-dara'],
  [/\bKurma\b/g,'Koor-ma'],[/\bKailasa\b/g,'Kai-laa-sa'],[/\bAyurveda\b/g,'Aa-yur-vay-da'],[/\bdevas\b/gi,'day-vahs'],[/\bdeva\b/gi,'day-vah'],[/\basuras\b/gi,'uh-sur-ahs'],[/\basura\b/gi,'uh-sur-ah'],
  [/\bDhanteras\b/g,'Dhun-teh-ras'],[/\bParvati\b/g,'Paar-vati'],[/\bLakshmi\b/g,'Luksh-mee'],[/\bSamudra Manthan\b/g,'Sa-mudra Mun-thun']];
function sayable(t){let s=t.replace(/[‘’]/g,"'").replace(/[“”]/g,'').replace(/…/g,'...');SAY_MAP.forEach(([re,v])=>{s=s.replace(re,v)});return s}
const Speech={ok:false,voices:[],voice:null,hiVoice:null,cur:null,
  init(){try{if(!('speechSynthesis' in window)||!window.SpeechSynthesisUtterance)return;this.ok=true;const load=()=>{try{this.voices=speechSynthesis.getVoices()||[]}catch(e){this.voices=[]}this.pick()};load();
    if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',load);else speechSynthesis.onvoiceschanged=load}catch(e){this.ok=false}},
  pick(){const en=this.voices.filter(v=>/^en/i.test(v.lang));const score=v=>(/en[-_]IN/i.test(v.lang)?10:0)+(/en[-_]GB/i.test(v.lang)?2:0)+(/natural|neural|online/i.test(v.name)?1:0)+(v.localService?1:0);
    this.voice=en.slice().sort((a,b)=>score(b)-score(a))[0]||null;this.hiVoice=this.voices.find(v=>/^hi[-_]IN/i.test(v.lang))||this.voices.find(v=>/^(sa|mr|ne)/i.test(v.lang))||null},
  available(){return this.ok&&!!this.voice},
  describe(){if(!this.ok)return'no speech synthesis';if(!this.voice)return'speech synthesis present, no English voice';return this.voice.name+' ('+this.voice.lang+')'+(/en[-_]IN/i.test(this.voice.lang)?'':' (no Indian-English voice found)')},
  speak(text,o){o=o||{};return new Promise(res=>{const v=o.hindi?this.hiVoice:this.voice;if(!this.ok||!v||AU.muted){res('none');return}let done=false,to;const fin=r=>{if(!done){done=true;clearTimeout(to);this.cur=null;res(r)}};
    try{const u=new SpeechSynthesisUtterance(o.hindi?text:sayable(text));u.voice=v;u.lang=v.lang;u.rate=o.rate||.9;u.pitch=o.pitch||1;u.onend=()=>fin('end');u.onerror=()=>fin('error');
      this.cur=fin;speechSynthesis.speak(u);to=setTimeout(()=>fin('timeout'),Math.max(5000,text.length*110+4000))}catch(e){fin('error')}})},
  stop(){try{if(this.ok)speechSynthesis.cancel()}catch(e){}if(this.cur){const f=this.cur;this.cur=null;f('stopped')}}};

/* ===== Sanskrit audio: speech synthesis cannot be trusted for Sanskrit. Put a reviewed recording URL here to replace the placeholder. ===== */
const MANTRA_AUDIO_SRC='';
const Mantra={el:null,
  async play(onCue){if(MANTRA_AUDIO_SRC){try{if(!this.el)this.el=new Audio(MANTRA_AUDIO_SRC);this.el.currentTime=0;this.el.muted=AU.muted;await this.el.play();
      await new Promise(r=>{this.el.onended=r;this.el.onerror=r});return'recording'}catch(e){}}
    if(Speech.ok&&Speech.hiVoice&&!AU.muted){Music.set(.08,1);const r=await Speech.speak(MANTRA.dev.replace(/॥/g,''),{hindi:true,rate:.72});Music.set(.4,3);if(r==='end'||r==='timeout')return'placeholder-voice';return'stopped'}
    /* no Sanskrit-capable voice: a silent read-along that steps through the pronunciation cues */
    for(let i=0;i<MANTRA.cues.length;i++){if(onCue)onCue(i);await new Promise(r=>setTimeout(r,1300))}if(onCue)onCue(-1);return'read-along'},
  stop(){try{if(this.el)this.el.pause()}catch(e){}Speech.stop()}};
