// ───────────────────────── SCRIPT ─────────────────────────
// Every spoken line lives here: [speaker, text]. {cue} before a word makes a figure appear on that word.
// Lines marked BRIEF are verbatim from the production brief. All other lines are drafts written to fit
// the brief's beats: replace them with the story document's exact wording (keep any {cue} markers).
const LINES = {
  // Title card
  title1: ['dadi', 'Panch Deep. Event one: Dhanteras.'],
  title2: ['dadi', 'The Little Lamp That Could Not Go Out.'],
  ep1: ['dadi', 'Episode one. The Horse That Spoke.'],
  ep2: ['dadi', 'Episode two. Can We Light Up the Whole Palace?'],
  ep3: ['dadi', 'Episode three. The Night of Stories.'],
  prev2: ['dadi', 'Previously… a painted horse named Bijli hopped off the wall, Chiku and Princess Kesar made nine lamps ready, and a long shadow slid under the palace door.'],
  prev3: ['dadi', 'Previously… the whole town helped light a circle of lamps, Chiku shielded the flames from the wind, and at midnight, the palace door began to open.'],
  hintChoose: ['dadi', 'Tap the picture you like best. There is no wrong choice.'],

  // ── Scene 1: A very unusual morning
  s1a: ['dadi', 'Come and sit close, little one. Every story I know began as a {mural}picture on a wall.'],
  s1b: ['dadi', 'This one began on the great wall of the {palace}Kanakpur palace, painted with {garlands}marigold garlands, {horses}horses, {elephants}elephants, and {lamps}baskets of clay lamps.'],
  s1c: ['dadi', 'It was the morning of Dhanteras, and it was a very unusual morning.'],
  s1d: ['dadi', 'Little {chiku}Chiku was carrying lamps to the palace gate, as fast as small feet could go.'],
  s1psst: ['bijli', 'Psst!'],                                                     // BRIEF (SFX word)
  s1e: ['chiku', 'Who said that?'],
  s1f: ['bijli', 'Psst! Up here! On the wall!'],
  s1g: ['dadi', 'The painted horse {turn}turned his head. He {wiggle}wiggled his ears. And then… he {hop}hopped right out of the wall!'],
  s1h: ['bijli', 'Hello, Chiku! I am Bijli, the horse of this wall. And I need your help.'],
  s1ask: ['dadi', 'Imagine you are Chiku... what would you do?'],             // BRIEF
  s1A1: ['chiku', 'Bijli, what happened? Why did you hop off the wall?'],
  s1A2: ['bijli', 'Something is wrong, Chiku. I saw it in the old pictures, but my memory is all jumbled up.'],
  s1B1: ['chiku', 'Wait! Can anyone else see you? Is it only me?'],
  s1B2: ['bijli', 'Only children who look closely can see a painted horse move. And you look very closely.'],
  s1B3: ['bijli', 'But something is wrong, Chiku. I saw it in the old pictures, and my memory is all jumbled up.'],
  s1i: ['bijli', 'Will you help me remember?'],

  // ── Scene 2: Help Bijli Remember
  s2a: ['dadi', 'Bijli led Chiku to the oldest part of the wall, where the paint was faded and full of secrets.'],
  s2b: ['bijli', 'My memory is hiding in these pictures. Can you find five of them?'],
  s2go: ['dadi', 'Look for a cradle, the stars, four moons, a serpent, and a closed door. Tap each one when you find it.'],
  s2cradle: ['dadi', 'A cradle. Long ago, a baby prince was born in Kanakpur.'],
  s2stars: ['dadi', 'The stars. The star-readers looked up at the sky and made a prophecy.'],
  s2moons: ['dadi', 'Four moons. Something would happen on the fourth night after the prince’s wedding.'],
  s2serpent: ['dadi', 'A serpent. A visitor would come, as quiet as a snake in the grass.'],
  s2door: ['dadi', 'A closed door. The visitor would come to the palace door.'],
  s2wrong: ['chiku', 'Not that one. Let’s keep looking!'],
  s2hint: ['chiku', 'Look! Something is glowing over there.'],
  s2c: ['bijli', 'Now I remember! When the prince was born, the star-readers said this:'],
  s2d: ['bijli', 'On the fourth night after his wedding, a visitor will come to the closed door, to take the prince on a very long journey.'],
  s2e: ['chiku', 'The prince married Princess Kesar three nights ago…'],
  s2f: ['chiku', 'Tonight is the fourth night! The visitor comes tonight!'],
  s2ask: ['dadi', 'Would you keep this a secret, or tell someone who could help?'], // BRIEF
  s2A1: ['chiku', 'No secrets! Come on, Bijli. We must tell Princess Kesar right now!'],
  s2A2: ['dadi', 'And Chiku ran so fast that two lamps nearly bounced out of the basket.'],
  s2B1: ['chiku', 'Bijli, what should we do? You have watched this palace for a hundred years.'],
  s2B2: ['bijli', 'When a problem is too big for one small person, we share it with someone wise.'],
  s2B3: ['bijli', 'Let’s tell Princess Kesar.'],

  // ── Scene 3: A plan made of light
  s3a: ['dadi', 'Princess {kesar}Kesar listened to every word.'],
  s3cbA: ['kesar', 'You came straight to me, Chiku. That was the right thing to do.'],
  s3cbB: ['kesar', 'Bijli gave you good advice, Chiku. Thank you for telling me.'],
  s3b: ['dadi', 'She did not cry, and she did not shout. She picked up a {lamp}lamp and looked closely at its {wick}wick.'],
  s3c: ['kesar', 'A lamp can give light.'],                                     // BRIEF
  s3d: ['kesar', 'A lamp can welcome a guest.'],                               // BRIEF
  s3e: ['kesar', 'And a lamp can remind us not to give up.'],                  // BRIEF
  s3f: ['kesar', 'If a visitor comes tonight, we will meet him with light. Chiku, will you help me prepare the lamps?'],
  s3go: ['chiku', 'Let’s check every lamp. Does it have oil? Does it have a good wick? Drop it in Ready to Shine, or Needs Repair.'],
  s3okR: ['chiku', 'Plenty of oil and a good wick. Ready to shine!'],
  s3okR2: ['chiku', 'Another one ready!'],
  s3okW: ['chiku', 'This lamp already has oil and a good wick. It’s ready to shine!'],
  s3dryW: ['chiku', 'No oil in this one. A little pour… now it’s ready!'],
  s3dryR: ['chiku', 'Oops, this one is dry. It needs oil first. There! Now it’s ready.'],
  s3wickW: ['chiku', 'This wick is all burnt. A fresh new wick… ready!'],
  s3wickR: ['chiku', 'Look, the wick is burnt. Let me give it a fresh one. Now it’s ready.'],
  s3hint: ['chiku', 'Drag a lamp into a tray. Or just tap it, and I’ll help.'],
  s3done: ['dadi', 'Nine little lamps, all ready to shine.'],
  s3g: ['dadi', 'But while they worked, the sky turned orange, and the shadows grew long.'],
  s3h: ['bijli', 'Chiku… the sun is setting.'],                               // BRIEF
  s3i: ['dadi', 'And far away, at the bottom of the palace door, something moved.'],
  s3j: ['dadi', 'A long, long {shadow}shadow slid beneath the door.'],

  // ── Scene 4: A plan bigger than nine lamps
  s4a: ['dadi', 'Chiku counted the lamps. One, two, three… all the way to nine.'],
  s4b: ['chiku', 'Nine lamps. But look at the palace! It has a hundred windows and a thousand corners.'],
  s4cbA: ['chiku', 'This morning I asked you what happened, Bijli. Now I know, and nine lamps are not enough!'],
  s4cbB: ['chiku', 'This morning I checked if anyone else could see you, Bijli. Tonight I want the whole town to see our lamps!'],
  s4c: ['bijli', 'We cannot light it alone.'],
  s4ask: ['dadi', 'What would you do if you needed help from a whole town?'],      // BRIEF
  s4A1: ['dadi', 'Chiku and Bijli raced to the market, where the {merchant}lamp merchant sat beside a mountain of shiny new lamps.'],
  s4A2: ['chiku', 'Please, could you give some lamps for the palace? We must light it tonight.'],
  s4A3: ['merchant', 'Give away my lamps? On Dhanteras, the busiest day of the year? No, no, no.'],
  s4A4: ['bijli', 'Then answer one riddle. What grows when you share it?'],     // BRIEF (riddle)
  s4A5: ['merchant', 'Hmm. Not money. Not sweets. What grows when you share it?'],
  s4A6: ['chiku', 'Light! When one lamp lights another, there is more light, not less.'],
  s4A7: ['merchant', 'Ha! Clever child, clever horse. Take these lamps, and tell the princess the market is with her.'],
  s4A8: ['dadi', 'And the merchant packed one basket of lamps, and then {baskets}another.'],
  s4B1: ['dadi', 'Chiku and Bijli ran to the children’s courtyard, where {families}families sat in the evening light.'],
  s4B2: ['chiku', 'Everyone! The palace needs light tonight. Can you help?'],
  s4B3: ['dadi', 'A little girl ran home and came back with a {chipped}chipped lamp. A grandfather brought {wicks}cotton wicks.'],
  s4B4: ['dadi', 'A mother brought {oil}oil, and the children brought {flowers}marigold flowers.'],
  s4B5: ['chiku', 'A chipped lamp shines just as bright!'],
  s4d: ['dadi', 'That evening, Chiku learned something important.'],
  s4e: ['dadi', 'The palace can be lit when {people}people work together.'],        // BRIEF

  // ── Scene 5: Build the Circle of Light
  s5a: ['dadi', 'Back at the palace, Kesar painted a big circle of rangoli all around the {door}doorway.'],
  s5b: ['kesar', 'Let’s place the lamps around the circle. Every lamp has its own spot.'],
  s5go: ['chiku', 'Drag a lamp onto a glowing spot. Or tap a spot, and a lamp will hop there.'],
  s5sec1: ['dadi', 'One part of the circle is shining!'],
  s5sec2: ['dadi', 'Two parts!'],
  s5sec3: ['dadi', 'Three! Only one more!'],
  s5hint: ['dadi', 'There are still a few empty spots. Can you fill them?'],
  s5end: ['kesar', 'When the whole circle shines, everyone can find the door.'],     // BRIEF

  // ── Scene 6: The wind interrupts / Protect the Flame
  s6a: ['dadi', 'Night came, deep and blue, and the painted {stars}stars came out.'],
  s6b: ['dadi', 'Then, whoosh! A {wind}wind came sweeping through the courtyard.'],
  s6cbA: ['dadi', 'It tugged at the merchant’s shiny lamps, and the flames bent low.'],
  s6cbB: ['dadi', 'It tugged at the chipped lamps from the courtyard, and the flames bent low.'],
  s6c: ['bijli', 'Leave it to me!'],
  s6d: ['dadi', 'Bijli planted his hooves and shook out his painted mane to block the wind. But the wind {push}pushed him back, step by step.'],
  s6e: ['bijli', 'I was hoping nobody would notice.'],                          // BRIEF
  s6f: ['chiku', 'We need a shield! This clay shield will do.'],
  s6go: ['dadi', 'Watch the swirls. They show where the wind will come from. Move the shield to meet it.'],
  s6g1: ['chiku', 'Here comes the wind!'],
  s6g2: ['dadi', 'The wind huffed and puffed, but the little flames held on.'],
  s6g3: ['kesar', 'Steady, little flames. Steady.'],
  s6g4: ['bijli', 'Look at the swirls! The wind is changing sides!'],
  s6g5: ['dadi', 'Gust after gust, Chiku kept the shield up.'],
  s6relight: ['chiku', 'One went out. That’s alright. Tap it, and we’ll light it again.'],
  s6hint: ['chiku', 'Drag the shield toward the swirls!'],
  s6end: ['dadi', 'At last, the wind grew tired and lay down to rest.'],

  // ── Scene 7: Someone is at the door
  s7a: ['dadi', 'At midnight, everything went still. Not a leaf moved. Not a flame bent.'],
  s7b: ['dadi', 'Then, under the palace door, a long {shadow}shadow slid in. Slowly. Quietly.'],
  s7c: ['chiku', 'Is it the visitor?'],
  s7d: ['dadi', 'Would the stories and lamps be enough?'],                       // BRIEF
  s7e: ['dadi', 'And then… the {open}door began to open.'],

  // ── Scene 8: A guest nobody expected
  s8a: ['dadi', 'In the doorway stood a tall, quiet guest with a shining crown. It was {yama}Yama, the keeper of the long journey.'],
  s8b: ['yama', 'I have come for the prince, as the stars foretold.'],
  s8c: ['dadi', 'Chiku held on to Bijli’s mane. But Princess Kesar stepped forward, and she smiled.'],
  s8d: ['kesar', 'Welcome, honoured guest. You have travelled very far.'],
  s8e: ['kesar', 'Would you like to hear a story while you rest?'],              // BRIEF
  s8f: ['yama', 'A story? Hmm. It has been a long time since anyone told me a story.'],
  s8ask: ['dadi', 'If you wanted someone to stay and listen, what kind of story would you tell?'], // BRIEF
  s8A1: ['kesar', 'Once upon a time, a hungry little {monkey}monkey saw a lamp glowing in a window.'],
  s8A2: ['kesar', '“A golden fruit!” he cried. “The shiniest mango in the whole world!”'],
  s8B1: ['kesar', 'Once upon a time, a tiny {star}star tumbled out of the sky.'],
  s8B2: ['kesar', '“Where is my home?” she whispered. “Where do I belong?”'],

  // ── Scene 9: Tell the Tale
  s9a: ['kesar', 'Help me tell it, Chiku! Show us how they feel.'],
  s9go: ['dadi', 'For each part of the story, tap a face. If the camera is on, you can make the face yourself.'],
  s9mA0: ['kesar', 'The monkey’s eyes went wide. A fruit that glows!'],
  s9mA1: ['kesar', 'He tried to take a bite… hot, hot, hot! Lamps are not for eating!'],
  s9mA2: ['kesar', 'A kind girl came to the window and gave him a real banana.'],
  s9mA3: ['kesar', 'Then the monkey had an idea. He would guard her lamp from the wind every night.'],
  s9mA4: ['kesar', 'And from that day on, the window always glowed, and the monkey was never hungry again.'],
  s9mB0: ['kesar', 'The tiny star landed with a bump in a dark village. Where was she?'],
  s9mB1: ['kesar', 'She tried to live inside a firefly, but she was far too bright. The firefly hiccupped!'],
  s9mB2: ['kesar', 'Then a little clay lamp said, “Come, sit on my wick and rest.”'],
  s9mB3: ['kesar', 'Together they shone so warmly that lost travellers found their way home.'],
  s9mB4: ['kesar', 'And the tiny star knew her home was wherever she could give light.'],
  s9y1: ['yama', 'Ha!'],
  s9y3: ['yama', 'Clever.'],
  s9hint: ['dadi', 'Tap one of the faces to help tell the story.'],
  s9end: ['yama', 'A good story deserves to be heard.'],                         // BRIEF

  // ── Scene 10: The last lamp
  s10a: ['dadi', 'Yama listened, and the night grew old. But a little breeze crept back in, and the {last}last lamp began to flicker.'],
  s10b: ['chiku', 'Oh no, not the last lamp!'],
  s10ask: ['dadi', 'The wind is growing stronger... what will you do?'],         // BRIEF
  s10A1: ['chiku', 'I’ll make a little wall with my hands.'],
  s10Ago: ['dadi', 'Press and hold the lamp to cup your hands around it. Keep them there when the wind blows.'],
  s10B1: ['chiku', 'I’ll carry it to the little niche in the wall, where the wind can’t reach.'],
  s10Bgo: ['dadi', 'Drag the lamp slowly into the niche. Slowly, so the flame stays awake.'],
  s10out: ['chiku', 'It went out. That’s alright. We just light it again.'],
  s10slow: ['chiku', 'Slowly, slowly.'],
  s10hintA: ['chiku', 'Press and hold the lamp. My hands will keep it safe.'],
  s10hintB: ['chiku', 'Drag the lamp into the niche, nice and slow.'],
  s10c: ['dadi', 'The lamp flickered, wavered, then steadied. And outside, the sky began to change colour.'], // BRIEF (fragment)

  // ── Scene 11: Morning arrives
  s11a: ['dadi', 'Cock-a-doodle-doo! A {rooster}rooster crowed, and the golden {sun}sun reached the palace.'],
  s11b: ['yama', 'The night is over, and the prince is safe.'],
  s11c: ['yama', 'I came to this door at midnight, but I found a palace full of light, a town that worked together, and a story I did not want to end.'],
  s11cbA: ['yama', 'Who knew a monkey and a lamp could make me laugh?'],
  s11cbB: ['yama', 'That tiny star found her home. Perhaps she found a little place in me, too.'],
  s11d: ['yama', 'Princess Kesar, your courage shines brighter than any lamp.'],
  s11e: ['dadi', 'And Yama {bow}bowed to Kesar.'],
  s11f: ['yama', 'Light one lamp for me every year, on this night, and I will remember this house kindly.'],
  s11g: ['kesar', 'We will. Every year.'],
  s11cbC: ['dadi', 'Chiku looked down at two small hands that had kept a flame alive all night.'],
  s11cbD: ['dadi', 'Chiku looked at the little niche, where the last lamp was still glowing.'],
  s11h: ['dadi', 'And that, little one, is one traditional explanation associated with Yamadeepdan, the lamp lit for Yama on Dhanteras night.'], // BRIEF (disclaimer phrase)
  s11i: ['dadi', 'The story we told today is our own imagined journey, inspired by that folk tradition.'], // BRIEF (disclaimer phrase)
  s11j: ['dadi', 'So when you light your lamp this Dhanteras, remember: a little light, shared, can fill a whole palace.'],
  s11k: ['dadi', 'Look! Your {shelfLit}{sfx:chime}first lamp is lit.'],
  end1: ['dadi', 'Event 1 of Panch Deep complete.'],                              // BRIEF
};
