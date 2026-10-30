/* ===== The script, verbatim from the story document, in story order =====
   Each entry is [voice, text]. Lines marked PENDING are known only by their first and last words in the build brief;
   they are skipped (never improvised) until the story document's exact wording is pasted in here.
   Voices: narr (the Narrator), gran (Grandmother), light (the Golden Light). */
const PENDING=null;
const SCRIPT={
  '1.1':[['narr','Welcome back, children!'],['narr',PENDING,'Shot 1.1: the rest of the welcome, ending "...in our last adventure."']],
  '1.2':[['narr','Today is Diwali!'],['narr',PENDING,'Shot 1.2: the lines naming the girl, the boy, Mother, Father and Grandmother, ending "...getting the puja space ready."']],
  '1.3':[['narr','The little golden light floats around the room.'],['narr',PENDING,'Shot 1.3: the lines between "The little golden light floats around the room." and the question (including its attribution)'],
    ['light','“Is a beautiful home made only of flowers, colours and lights?”'],['narr',PENDING,'Shot 1.3: any lines between the question and "What do you think, children?"'],
    ['narr','What do you think, children?'],['narr','Let\'s help the family get ready!']],
  '2.5':[['narr','Beautiful!']],
  '2.6':[['narr','The home is ready, the rangoli is complete and the diyas are glowing.'],['narr',PENDING,'Shot 2.6: the lines ending "...one more important lesson to share!"']],
  '3.1':[['narr','Grandmother gathers the children around her.'],['narr',PENDING,'Shot 3.1: the attribution before Grandmother\'s question'],
    ['gran','“Do you know what makes a home truly beautiful?”'],['narr','The children shake their heads.']],
  '3.2':[['narr','Grandmother says:'],['gran',PENDING,'Shot 3.2: Grandmother\'s lines before the first secret'],['gran','“When we care for others, we spread happiness.”']],
  '3.3':[['narr',PENDING,'Shot 3.3: any narration before the second secret'],['gran','“When we share what we have, we spread kindness.”']],
  '3.4':[['narr',PENDING,'Shot 3.4: any narration before the third secret'],['gran','“And when we are grateful for our blessings, we fill our hearts with joy.”']],
  '3.5':[['narr','The children smile.'],['narr',PENDING,'Shot 3.5: the lines before the Golden Light speaks'],['light','“These are wonderful blessings!”'],
    ['narr',PENDING,'Shot 3.5: the lines ending "...time for a prayer."']],
  '4.1':[['narr','The family gathers around the puja space.'],['narr',PENDING,'Shot 4.1: the attribution before Grandmother\'s line'],
    ['gran','“Let us learn a beautiful verse from the Mahalakshmi Ashtakam, a prayer in praise of Goddess Mahalakshmi.”'],['narr',PENDING,'Shot 4.1: any lines before "Listen carefully, children!"'],
    ['narr','Listen carefully, children!']],
  '4.2meaning':[['narr','“O Goddess Mahalakshmi, the great Divine Goddess, worshipped by the Devas, who holds the conch, discus and mace in Your hands — I bow to You with respect.”']],
  '4.2vocab':[['narr','Let\'s learn some special words!'],['narr','Shankha means conch.'],['narr','Chakra means discus.'],['narr','Gada means mace.'],
    ['narr','These are traditional symbols associated with Goddess Mahalakshmi in this prayer.']],
  '4.4':[['narr','Now, let\'s chant the shloka together!']],
  '4.5':[['narr','Wonderful, children!'],['narr',PENDING,'Shot 4.5: the lines ending "What could it be?"'],['narr','What could it be?']]};
/* on-screen instructions (shown as a caption and read aloud) and the builder's idle hints */
const INS={prepare:'Help the family prepare for Lakshmi Puja!',flowers:'Drag the flowers to decorate the doorway!',diyas:'Place the diyas around the rangoli!',
  rangoli:'Add the final colours to the rangoli!',symbols:'Tap each symbol to discover its name!',learn:'Let\'s learn the shloka together!',repeat:'Your turn! Repeat after me.',try:'Now you try!'};
const HINT={flowers:'Drag a flower to the glowing spot!',diyas:'Drag a diya next to the rangoli!',rangoli:'Drag a colour into an empty space!',symbols:'Tap a glowing symbol!',shloka:'Press Continue when you\'re ready!'};
const SHLOKA=['नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते ।','शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते ॥'];
/* say a shot's lines in order; cues are [word, fn]. A cue whose line is still pending fires after the lines that exist, so the staging still plays */
const PENDING_SEEN=new Set();
async function sayShot(id,o){o=o||{};const lines=SCRIPT[id]||[];const cues=(o.cues||[]).map(c=>({w:c[0],fn:c[1],used:false}));const from=o.from||0,to=o.to==null?lines.length:o.to;
  for(let i=from;i<to;i++){const [v,t,note]=lines[i];if(t==null){PENDING_SEEN.add(note);const due=cues.filter(c=>!c.used&&o.pendingCue&&o.pendingCue[c.w]===i);for(const c of due){c.used=true;try{c.fn()}catch(e){}await D.wait(D.fast?5:1600)}continue}
    const my=cues.filter(c=>!c.used&&t.includes(c.w));my.forEach(c=>c.used=true);await D.say([[v,t]],{cues:my.map(c=>[c.w,c.fn])})}
  if(o.flush!==false)for(const c of cues)if(!c.used){c.used=true;try{c.fn()}catch(e){}await D.wait(D.fast?5:(o.gap||1200))}}
