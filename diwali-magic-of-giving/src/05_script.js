/* ===== The script, verbatim from the story document, in story order =====
   Each entry is [voice, text]. Lines marked PENDING are given in the build brief only by their first and last words;
   they are skipped (never improvised) until the story document's exact wording is pasted in here.
   Voices: narr (narrator), gran (Grandmother), c1, c2, c3 (the children), light (the Little Golden Light), chant (the mantra), hi (narrator, Hindi). */
const PENDING=null;
const SCRIPT={
  '1.1':[['narr','Children, welcome to our final adventure!'],['narr','The little golden light has brought us back to the Diwali home.']],
  '1.2':[['narr','The family has decorated the house, prepared the puja space and learned a beautiful shloka to Goddess Lakshmi.'],['narr',PENDING,'Shot 1.2: the lines that follow, ending "...a diya is lit."']],
  '1.3':[['narr','The little golden light glows beside the puja space.'],['narr',PENDING,'Shot 1.3: the lines between the first line and the child\'s line'],['c1','“Let\'s share these with our neighbours!”']],
  '1.4':[['narr','Grandmother smiles.'],['gran','“What a wonderful idea! When we share our blessings, happiness grows.”'],['narr','The golden light sparkles brighter than ever.'],
    ['narr','But can you help the children discover more ways to spread happiness?']],
  '2.5':[['narr','Wonderful choices!'],['narr','You shared, helped and showed gratitude.'],['narr','The little golden light dances happily.'],['narr','It whispers:'],
    ['light','“When we make others happy, we bring more happiness into the world!”']],
  '3.1':[['narr','The family sits together beside the glowing diyas.'],['narr','Grandmother asks the children:'],['gran','“What are you grateful for this Diwali?”']],
  '3.2a':[['c1','“I am grateful for my family!”']],'3.2b':[['c2','“I am grateful for my friends!”']],'3.2c':[['c3','“I am grateful for everything I learn!”']],
  '3.2d':[['gran','“Every blessing, big or small, is worth appreciating.”']],
  '3.3':[['narr','Children, now it is your turn!'],['narr','What are you grateful for?']],
  '3.4':[['narr','Look at all those beautiful lights!'],['narr',PENDING,'Shot 3.4: the lines that follow, ending "...happiness spreads even further!"']],
  '4.1':[['narr','The family joins their hands before Goddess Lakshmi.'],['narr','The little golden light glows beside the diya.'],['narr','Let us chant a short mantra to Goddess Mahalakshmi.']],
  '4.2':[['chant','ॐ श्रीं महालक्ष्म्यै नमः ॥'],['narr','Om Shreem Mahalakshmyai Namah.'],['narr','It means:'],['narr','Salutations to Goddess Mahalakshmi.'],['narr','Let us chant it together!']],
  '4.3':[['narr','May Goddess Lakshmi bless every home with health, happiness, peace and prosperity.'],['narr','May we always remember to care for others, share what we have and be grateful for our blessings.']],
  '5.1':[['narr','Children, do you remember the three special words we learned?'],['narr','CARE. SHARE. BE GRATEFUL.'],['narr','That is the beautiful message of our Lakshmi Puja story.']],
  '5.2':[['narr','Goddess Lakshmi reminds us that prosperity is not only about gold and wealth.'],['narr','It is also about love, kindness, good health, happiness and the joy of giving.']],
  '5.3':[['narr','As you celebrate Diwali, remember to light a diya, share a smile, thank someone you love and spread kindness wherever you go.']],
  '5.4':[['narr','The little golden light rises into the sky, joining thousands of glowing diyas.'],['narr','The whole home shines with warmth and happiness.']],
  '5.5':[['narr','And now, children, may Goddess Lakshmi bless you and your family with happiness, health, peace and prosperity.'],['narr','Wishing you and your family a very Happy Diwali!'],
    ['narr','May your home shine with light, your heart glow with gratitude and your life be filled with love and happiness.']],
  '5.6':[['hi','शुभ दीपावली!'],['narr','Happy Diwali!']]};
/* on-screen instructions (shown large and read aloud) */
const INS={kind:'HELP THE CHILDREN CHOOSE A KIND ACTION!',diya:'LIGHT YOUR GRATITUDE DIYA!'};
/* the three kind-action choices: situation, cards, the storyboard's feedback line and the drafted gentle retry line (drafted, please review) */
const KIND={
  colours:{situation:'Your friend has no colours for their rangoli.',A:'Keep all your colours.',B:'Share your colours with your friend.',
    good:'Wonderful! Sharing makes the celebration more joyful!',retry:'Look at those empty bowls. What could we do?'},
  help:{situation:'Someone at home needs help.',A:'Ignore them.',B:'Offer to help.',good:'Lovely! Helping someone is a beautiful way to show care!',retry:'Grandmother looks like she could use a hand!'},
  thanks:{situation:'Someone gives you a gift.',A:'Walk away without saying anything.',B:'Say thank you with a smile.',good:'Wonderful! A simple thank you can make someone\'s day special!',
    retry:'Someone just gave you a gift. What can we say?'}};
const PENDING_SEEN=new Set();
async function sayShot(id,o){o=o||{};const lines=SCRIPT[id]||[];const cues=(o.cues||[]).map(c=>({w:c[0],fn:c[1],used:false}));const from=o.from||0,to=o.to==null?lines.length:o.to;
  for(let i=from;i<to;i++){const [v,t,note]=lines[i];if(t==null){PENDING_SEEN.add(note);continue}
    const my=cues.filter(c=>!c.used&&t.includes(c.w));my.forEach(c=>c.used=true);await D.say([[v,t]],{cues:my.map(c=>[c.w,c.fn])})}
  if(o.flush!==false)for(const c of cues)if(!c.used){c.used=true;try{c.fn()}catch(e){}await D.wait(D.fast?5:(o.gap||1200))}}
