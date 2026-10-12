// the sheets: each character on a bare page, a light 10% grid in the margin for proportion checks
const ERA_BG = SHEET_KEYS.map(() => SK.paper), BRIDGES = [];
function sheetPage(title) {
  sketchPage({ grid: 'plain' });
  handLetter(title, 90, 220, 46, { align: 'left', col: NV.graph, key: 'st' + title });
}
SHEETS.walk = () => { sheetPage('Mahishasura, walking'); mahishasura(520, 1290, 128, { pose: 'walk', key: 'w' }); };
SHEETS.sit = () => { sheetPage('Mahishasura, tapasya'); mahishasura(540, 1180, 158, { pose: 'sit', key: 's' }); };
SHEETS.kneel = () => { sheetPage('Mahishasura, kneeling (profile)'); mahishasura(440, 1250, 168, { pose: 'kneel', key: 'k' }); };
SHEETS.face = () => { sheetPage('Mahishasura, face'); mahishaHead(540, 720, 400, { key: 'fh', eyes: 'closed' }); };
SHEETS.brahma = () => { sheetPage('Brahma'); brahma(540, 1290, 150, {}); };
SHEETS.durga = () => { sheetPage('Durga with the lion'); durgaOnLion(600, 1290, 126, {}); };
SHEETS.devas = () => { sheetPage('Shiva, Vishnu, a deva (pencil)'); deva(860, 1250, 98, { kind: 'deva', turn: -0.45 }); deva(250, 1270, 112, { kind: 'shiva', turn: 0.45 }); deva(560, 1240, 116, { kind: 'vishnu', turn: 0 }); };
