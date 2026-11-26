import * as THREE from 'three';

// ---------- data ----------
const G = [
  { name: 'NEW RELEASES', hue: 350, sign: '#e0343c', P: ['NEON', 'LAST', 'BLOOD', 'GLASS', 'FINAL', 'HOLLOW', 'SILVER', 'WILD', 'BURNING', 'MIDNIGHT'], N: ['HORIZON', 'PROTOCOL', 'DYNASTY', 'SIGNAL', 'RECKONING', 'CIRCUIT', 'EMPIRE', 'FREQUENCY', 'HEIST', 'VERDICT'], S: ['A crew of strangers gets one night to pull off the job nobody believes in.', 'The sequel everyone argued about. Louder, faster, and somehow sadder.', 'When the lights go out downtown, one courier knows the way through.'] },
  { name: 'COMEDY', hue: 48, sign: '#f2c21b', P: ['BIG', 'MY', 'UNCLE', 'DOUBLE', 'PRETTY', 'LUCKY', 'WEDDING', 'SUMMER', 'CRAZY', 'LOST'], N: ['TROUBLE', 'BUSINESS', 'ROAD TRIP', 'MIX-UP', 'PARTY', 'VACATION', 'ROOMMATES', 'BUDDY', 'BLIND DATE', 'MESS'], S: ['Two roommates swap lives for a weekend and nothing goes to plan.', 'A small-town wedding turns into the loudest family reunion ever filmed.', 'He only wanted a quiet vacation. The hotel had other ideas.'] },
  { name: 'ACTION', hue: 8, sign: '#d8281e', P: ['IRON', 'DEADLY', 'RED', 'LAST', 'STEEL', 'SHATTERED', 'RAPID', 'BROKEN', 'HARD', 'SAVAGE'], N: ['FIST', 'STRIKE', 'PURSUIT', 'FURY', 'TARGET', 'THUNDER', 'ESCAPE', 'COMMAND', 'RUSH', 'VENGEANCE'], S: ['One cop, one clock, and a city that will not stop shooting.', 'Betrayed by his own unit, he has until sunrise to clear his name.', 'The getaway driver wants out. The crew does not.'] },
  { name: 'SCI-FI', hue: 200, sign: '#28c4e8', P: ['STAR', 'QUANTUM', 'ORBITAL', 'DEEP', 'CHROME', 'ALIEN', 'LUNAR', 'ZERO', 'COSMIC', 'PLANET'], N: ['DRIFT', 'GATE', 'COLONY', 'ECHO', 'ARCHIVE', 'EVENT', 'MACHINE', 'TRANSIT', 'INVASION', 'DAWN'], S: ['A signal from beyond Neptune says the crew should turn back. They do not.', 'The station AI has started dreaming. Nobody told the engineers.', 'Colonists wake to find the ship ten years off course.'] },
  { name: 'DRAMA', hue: 28, sign: '#e8872a', P: ['QUIET', 'GOLDEN', 'LONG', 'WINTER', 'BROKEN', 'PAPER', 'SECOND', 'HONEST', 'DISTANT', 'EMPTY'], N: ['HOUSE', 'SEASON', 'LETTERS', 'HARBOR', 'PROMISE', 'MEMORY', 'RIVER', 'WALTZ', 'CROSSING', 'SUMMER'], S: ['Three generations under one roof, one secret nobody will say out loud.', 'A retired pianist returns to the town that forgot him.', 'Letters found in an attic change how a family remembers the war.'] },
  { name: 'HORROR', hue: 285, sign: '#9a3fe0', P: ['CURSED', 'DEAD', 'SILENT', 'BLACK', 'PALE', 'WICKED', 'BURIED', 'HAUNTED', 'NIGHT', 'CRIMSON'], N: ['HOUSE', 'WOODS', 'HOLLOW', 'WHISPER', 'MOTEL', 'HARVEST', 'SLEEPOVER', 'BASEMENT', 'LULLABY', 'FOG'], S: ['They said the cabin had been empty for years. The lights said otherwise.', 'Every night at 3:07 the phone rings. Tonight someone answers.', 'The new neighbors never leave their house. The dog will not stop barking.'] },
  { name: 'FAMILY', hue: 130, sign: '#3cc25a', P: ['LITTLE', 'MAGIC', 'SUPER', 'BRAVE', 'SECRET', 'FLYING', 'TINY', 'HAPPY', 'GIANT', 'SPARKLE'], N: ['ADVENTURE', 'DRAGON', 'TREEHOUSE', 'ROBOT', 'PUPPIES', 'CASTLE', 'EXPEDITION', 'CLUB', 'BALLOON', 'SUMMER CAMP'], S: ['A shy kid finds a map in the library and the whole town follows.', 'The backyard robot just wants to learn how to play.', 'Four cousins, one rainy week, and a treehouse with a mind of its own.'] },
];
const FIRST = ['Marcus', 'Elena', 'Tony', 'Sofia', 'Jack', 'Dana', 'Rico', 'Nina', 'Omar', 'Lena', 'Victor', 'Mia', 'Hank', 'Zara', 'Leo', 'Ivy'];
const LAST = ['Stone', 'Rivera', 'Kane', 'Voss', 'Moreno', 'Hale', 'Cruz', 'Park', 'Doyle', 'Fox', 'Reyes', 'Quinn', 'Blake', 'Nash', 'Ortiz', 'Wells'];
const RATINGS = ['G', 'PG', 'PG', 'PG-13', 'PG-13', 'R'];

const PER = 57, GENRES = G.length;
const COLS = 20, ROWS = 20, CW = 96, CH = 144;
const genreOf = (id) => Math.min(GENRES - 1, Math.floor(id / PER));
function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function info(id) {
  const g = G[genreOf(id)], r = mulberry(id * 977 + 5);
  const pick = (a) => a[Math.floor(r() * a.length)];
  const p = pick(g.P), n = pick(g.N), form = r();
  const title = form < 0.45 ? `${p} ${n}` : form < 0.75 ? `THE ${p} ${n}` : form < 0.9 ? `${n} OF THE ${pick(g.P)}` : `${p} ${n} ${pick(['II', 'III', 'RETURNS', '2'])}`;
  const nm = () => `${pick(FIRST)} ${pick(LAST)}`;
  return { id, title, genre: g.name, year: 1982 + Math.floor(r() * 24), mins: 82 + Math.floor(r() * 62), rating: pick(RATINGS), director: nm(), cast: [nm(), nm(), nm()], syn: pick(g.S), tag: pick(['COMING TO A SHELF NEAR YOU', 'THE WILDEST RIDE OF THE YEAR', 'YOU WILL NOT FORGET IT', 'BE KIND, REWIND', 'TWO THUMBS UP', 'NOBODY SAW IT COMING']) };
}

// ---------- covers ----------
function wrap(ctx, text, maxW) {
  const words = text.split(' '); const lines = []; let cur = '';
  for (const w of words) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; }
  lines.push(cur); return lines;
}
function drawCover(ctx, w, h, id) {
  const g = G[genreOf(id)], r = mulberry(id * 7919 + 13), I = info(id);
  ctx.save(); ctx.scale(w / 200, h / 300);
  const hue = g.hue + (r() * 50 - 25);
  const gr = ctx.createLinearGradient(0, 0, 0, 300);
  gr.addColorStop(0, `hsl(${hue},78%,${48 + r() * 12}%)`); gr.addColorStop(1, `hsl(${hue + r() * 50 - 25},85%,16%)`);
  ctx.fillStyle = gr; ctx.fillRect(0, 0, 200, 300);
  const st = Math.floor(r() * 6);
  if (st === 0) {
    const sg = ctx.createLinearGradient(0, 95, 0, 205); sg.addColorStop(0, '#ffe46b'); sg.addColorStop(1, '#ff3d8a');
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(100, 150, 56, 0, 7); ctx.fill();
    ctx.fillStyle = `hsl(${hue},60%,8%)`; ctx.fillRect(0, 190, 200, 110);
    ctx.strokeStyle = 'rgba(255,120,220,.7)'; ctx.lineWidth = 1;
    for (let i = -8; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(100 + i * 6, 190); ctx.lineTo(100 + i * 32, 300); ctx.stroke(); }
    for (let j = 0; j < 6; j++) { const y = 190 + j * j * 3.2 + 4; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(200, y); ctx.stroke(); }
  } else if (st === 1) {
    ctx.save(); ctx.translate(100, 150); ctx.rotate(-0.55);
    for (let i = -12; i < 12; i++) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.16)' : 'rgba(0,0,0,.18)'; ctx.fillRect(-300, i * 22, 600, 22); }
    ctx.restore();
  } else if (st === 2) {
    for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283, b = (i + 0.5) / 16 * 6.283; ctx.fillStyle = 'rgba(255,255,255,.2)'; ctx.beginPath(); ctx.moveTo(100, 165); ctx.lineTo(100 + Math.cos(a) * 320, 165 + Math.sin(a) * 320); ctx.lineTo(100 + Math.cos(b) * 320, 165 + Math.sin(b) * 320); ctx.fill(); }
  } else if (st === 3) {
    const rg = ctx.createRadialGradient(100, 170, 4, 100, 170, 110); rg.addColorStop(0, 'rgba(255,255,255,.75)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rg; ctx.fillRect(0, 60, 200, 240);
    ctx.fillStyle = '#0a0a12'; ctx.beginPath(); ctx.arc(100, 150, 17, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.moveTo(64, 262); ctx.lineTo(76, 178); ctx.quadraticCurveTo(100, 166, 124, 178); ctx.lineTo(136, 262); ctx.fill();
  } else if (st === 4) {
    ctx.fillStyle = 'rgba(0,0,0,.28)'; ctx.fillRect(100, 0, 100, 300);
    const face = (x, y, rr, s) => { ctx.fillStyle = `hsl(${20 + s * 8},55%,${58 - s * 6}%)`; ctx.beginPath(); ctx.arc(x, y, rr, 0, 7); ctx.fill(); ctx.fillStyle = '#10101a'; ctx.beginPath(); ctx.arc(x - rr * .35, y - rr * .1, rr * .1, 0, 7); ctx.arc(x + rr * .35, y - rr * .1, rr * .1, 0, 7); ctx.fill(); ctx.fillRect(x - rr * .3, y + rr * .35, rr * .6, rr * .08); ctx.beginPath(); ctx.moveTo(x - rr * .8, y + rr * 1.1); ctx.lineTo(x + rr * .8, y + rr * 1.1); ctx.lineTo(x + rr * 1.2, y + rr * 2.6); ctx.lineTo(x - rr * 1.2, y + rr * 2.6); ctx.fill(); };
    face(62, 150, 34, 0); face(142, 164, 30, 2);
  } else {
    for (let i = 7; i >= 1; i--) { ctx.fillStyle = i % 2 ? 'rgba(255,255,255,.22)' : 'rgba(0,0,0,.22)'; ctx.beginPath(); ctx.arc(100, 170, i * 15, 0, 7); ctx.fill(); }
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(100, 170, 8, 0, 7); ctx.fill();
  }
  const vg = ctx.createLinearGradient(0, 200, 0, 300); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.72)'); ctx.fillStyle = vg; ctx.fillRect(0, 200, 200, 100);
  const vt = ctx.createLinearGradient(0, 0, 0, 100); vt.addColorStop(0, 'rgba(0,0,0,.4)'); vt.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = vt; ctx.fillRect(0, 0, 200, 100);
  // title
  let fs = 38; ctx.textAlign = 'center'; ctx.textBaseline = 'top'; let lines;
  for (; fs > 14; fs -= 2) { ctx.font = `900 ${fs}px Impact,"Arial Narrow Bold","Arial Black",sans-serif`; lines = wrap(ctx, I.title, 176); if (lines.length <= 3 && lines.every(l => ctx.measureText(l).width <= 178)) break; }
  ctx.lineJoin = 'round'; ctx.lineWidth = 5; ctx.strokeStyle = '#120a14';
  lines.forEach((l, i) => { const y = 30 + i * fs * 1.02; ctx.strokeText(l, 100, y); ctx.fillStyle = i === 0 ? '#fff' : '#ffe86b'; ctx.fillText(l, 100, y); });
  // rating
  ctx.fillStyle = '#fff'; ctx.fillRect(8, 8, 26, 13); ctx.fillStyle = '#111'; ctx.font = 'bold 9px sans-serif'; ctx.textBaseline = 'middle'; ctx.fillText(I.rating, 21, 15);
  // tagline + billing
  ctx.fillStyle = '#fff'; ctx.font = 'italic bold 8px sans-serif'; ctx.fillText(I.tag, 100, 246);
  ctx.fillStyle = 'rgba(255,255,255,.55)';
  for (let i = 0; i < 3; i++) { const bw = 120 - i * 18; ctx.fillRect(100 - bw / 2, 258 + i * 6, bw, 2.2); }
  ctx.fillStyle = `hsl(${hue},55%,12%)`; ctx.fillRect(0, 284, 200, 16);
  ctx.fillStyle = `hsl(${hue},90%,62%)`; ctx.fillRect(0, 284, 200, 2);
  ctx.restore();
}
function drawBack(ctx, w, h, id) {
  const I = info(id), g = G[genreOf(id)];
  ctx.save(); ctx.scale(w / 200, h / 300);
  ctx.fillStyle = '#ece3cb'; ctx.fillRect(0, 0, 200, 300);
  ctx.fillStyle = g.sign; ctx.fillRect(0, 0, 200, 22);
  ctx.fillStyle = '#111'; ctx.font = '900 12px Impact,"Arial Black",sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(I.genre, 10, 11);
  ctx.textAlign = 'right'; ctx.font = 'bold 10px sans-serif'; ctx.fillText(I.rating, 190, 11);
  ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = '#1a1410';
  ctx.font = '900 17px Impact,"Arial Black",sans-serif'; let y = 32; wrap(ctx, I.title, 180).forEach(l => { ctx.fillText(l, 10, y); y += 18; });
  ctx.font = '9.5px Georgia,serif'; y += 4; wrap(ctx, I.syn, 180).forEach(l => { ctx.fillText(l, 10, y); y += 12; });
  y += 8; ctx.font = 'bold 8px sans-serif'; ctx.fillText(`DIRECTED BY ${I.director.toUpperCase()}`, 10, y); y += 12;
  ctx.font = '8px sans-serif'; ctx.fillText(`STARRING ${I.cast.join(' / ').toUpperCase()}`, 10, y);
  ctx.fillStyle = '#1a1410'; ctx.fillRect(10, 232, 180, 1.5);
  ctx.font = 'bold 8px sans-serif'; ctx.fillText(`${I.mins} MIN   ${I.year}   STEREO`, 10, 238);
  const r = mulberry(id + 3); for (let i = 0; i < 46; i++) { ctx.fillRect(112 + i * 1.6, 252, 0.6 + r() * 0.9, 28); }
  ctx.font = 'bold 9px sans-serif'; ctx.fillText('BE KIND, REWIND', 10, 268);
  ctx.restore();
}

// ---------- renderer / scene ----------
const params = new URLSearchParams(location.search);
const canvas = document.getElementById('world');
const isTouch = matchMedia('(pointer:coarse)').matches || 'ontouchstart' in window;
if (isTouch) document.body.classList.add('touch');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isTouch, powerPreference: 'high-performance' });
let pr = Math.min(devicePixelRatio || 1, isTouch ? 2 : 2);
renderer.setPixelRatio(pr);
const scene = new THREE.Scene();
const FOG = 0x0a0910;
scene.background = new THREE.Color(FOG); scene.fog = new THREE.Fog(FOG, 6, 40);
const camera = new THREE.PerspectiveCamera(72, 1, 0.05, 80);
camera.rotation.order = 'YXZ';
const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());

const HALF = 1.4, DEPTH = 0.4, LEN = 24, CEIL = 3.2;
const pool = (z) => { const m = (((z - 3) % 6) + 6) % 6, d = m > 3 ? m - 6 : m; return Math.exp(-((d / 2.3) * (d / 2.3))); };
const L = (z) => 0.5 + 0.62 * pool(z);

class GB {
  constructor() { this.p = []; this.u = []; this.c = []; this.i = []; }
  v(x, y, z, u, v, s) { const l = L(z) * s; this.p.push(x, y, z); this.u.push(u, v); this.c.push(l, l, l); return this.p.length / 3 - 1; }
  quad(a, b, c, d) { this.i.push(a, b, c, a, c, d); }
  grid(o, du, dv, nu, nv, ru, rv, s = 1) {
    const base = this.p.length / 3;
    for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) {
      const a = i / nu, b = j / nv;
      this.v(o[0] + du[0] * a + dv[0] * b, o[1] + du[1] * a + dv[1] * b, o[2] + du[2] * a + dv[2] * b, a * ru, b * rv, s);
    }
    for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) { const k = base + j * (nu + 1) + i; this.quad(k, k + 1, k + nu + 2, k + nu + 1); }
  }
  box(x0, x1, y0, y1, z0, z1, s) {
    const f = (pts, sh) => { const k = pts.map(q => this.v(q[0], q[1], q[2], 0, 0, s * sh)); this.quad(k[0], k[1], k[2], k[3]); };
    f([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], .8); f([[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], .8);
    f([[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], 1.1); f([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], .5);
    f([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], .9); f([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], .9);
  }
  geo() { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2)); g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3)); g.setIndex(this.i); return g; }
}
function canvasTex(w, h, fn, rx = 1, ry = 1) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; return t; }

function buildWorld() {
  // textures
  const carpet = canvasTex(256, 256, (x, w, h) => {
    x.fillStyle = '#1c1a2c'; x.fillRect(0, 0, w, h); const r = mulberry(4); const cols = ['#2b7f8e', '#a23a78', '#d28a2c', '#4a4aa8', '#38a36a'];
    for (let i = 0; i < 260; i++) { x.save(); x.translate(r() * w, r() * h); x.rotate(r() * 6); x.fillStyle = cols[i % 5]; x.globalAlpha = .75; if (i % 3 === 0) { x.beginPath(); x.arc(0, 0, 2 + r() * 2.5, 0, 7); x.fill(); } else x.fillRect(-1.5, -5 - r() * 5, 3, 10 + r() * 6); x.restore(); }
    const id = x.getImageData(0, 0, w, h); for (let i = 0; i < id.data.length; i += 4) { const n = (Math.random() - .5) * 26; id.data[i] += n; id.data[i + 1] += n; id.data[i + 2] += n; } x.putImageData(id, 0, 0);
  });
  const peg = canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#6a6a5e'; x.fillRect(0, 0, w, h); x.fillStyle = '#2a2a24'; for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) { x.beginPath(); x.arc(8 + i * 16, 8 + j * 16, 2.2, 0, 7); x.fill(); } });
  const tile = canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#c9c4b6'; x.fillRect(0, 0, w, h); x.strokeStyle = '#8a8578'; x.lineWidth = 3; x.strokeRect(0, 0, w, h); const r = mulberry(9); for (let i = 0; i < 160; i++) { x.fillStyle = `rgba(90,85,70,${r() * .25})`; x.fillRect(r() * w, r() * h, 2, 2); } });
  const mCarpet = new THREE.MeshBasicMaterial({ map: carpet, vertexColors: true });
  const mPeg = new THREE.MeshBasicMaterial({ map: peg, vertexColors: true, side: THREE.DoubleSide });
  const mTile = new THREE.MeshBasicMaterial({ map: tile, vertexColors: true, side: THREE.DoubleSide });
  const mPlain = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const W = HALF + DEPTH, Z = 25;
  let b = new GB(); b.grid([-W, 0, Z], [2 * W, 0, 0], [0, 0, -2 * Z], 3, 100, 2 * W / 1.1, 2 * Z / 1.1); scene.add(new THREE.Mesh(b.geo(), mCarpet));
  b = new GB(); b.grid([-W, CEIL, Z], [2 * W, 0, 0], [0, 0, -2 * Z], 3, 100, 2 * W / .6, 2 * Z / .6, .9); scene.add(new THREE.Mesh(b.geo(), mTile));
  b = new GB(); for (const sx of [-1, 1]) b.grid([sx * W, 0, Z], [0, 0, -2 * Z], [0, CEIL, 0], 100, 1, 2 * Z / 1.6, CEIL / 1.6, .85);
  scene.add(new THREE.Mesh(b.geo(), mPeg));
  // end walls
  b = new GB(); for (const z of [Z, -Z]) b.grid([-W, 0, z], [2 * W, 0, 0], [0, CEIL, 0], 1, 1, 6, 2, z > 0 ? .5 : .75); scene.add(new THREE.Mesh(b.geo(), mPeg));
  // structure
  b = new GB();
  const yb = (l) => 0.12 + l * 0.46;
  for (const sx of [-1, 1]) {
    const xi = sx * HALF, xo = sx * W; const xa = Math.min(xi, xo), xb = Math.max(xi, xo);
    for (let l = 0; l < 6; l++) for (let z = -Z; z < Z; z += 1) {
      b.box(xa, xb, yb(l), yb(l) + 0.03, z, z + 1, .2);
      const lx0 = sx > 0 ? xi - 0.0 : xi - 0.03, lx1 = sx > 0 ? xi + 0.03 : xi;
      b.box(lx0, lx1, yb(l), yb(l) + 0.07, z, z + 1, .28);
    }
    for (let z = -Z; z <= Z; z += 2) b.box(xa, xb, 0, CEIL, z - 0.02, z + 0.02, .2);
    b.box(xa, xb, 2.78, CEIL, -Z, Z, .18); // top valance
    for (let z = -Z; z < Z; z += 1) b.box(Math.min(xi, xi + sx * 0.02), Math.max(xi, xi + sx * 0.02), 0, 0.12, z, z + 1, .4);
  }
  scene.add(new THREE.Mesh(b.geo(), mPlain));
  // ceiling light strips
  const lp = [], li = [];
  for (let z = -21; z <= 21; z += 6) for (const x of [-0.55, 0.55]) { const k = lp.length / 3; lp.push(x - .12, CEIL - .02, z + 1.1, x + .12, CEIL - .02, z + 1.1, x + .12, CEIL - .02, z - 1.1, x - .12, CEIL - .02, z - 1.1); li.push(k, k + 1, k + 2, k, k + 2, k + 3); }
  const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3)); lg.setIndex(li);
  scene.add(new THREE.Mesh(lg, new THREE.MeshBasicMaterial({ color: 0xfff6e0, side: THREE.DoubleSide, fog: false })));
  // hanging signs
  const zl = 48 / 6 * 0 + 8;
  for (let side = 0; side < 2; side++) for (let zi = 0; zi < 6; zi++) {
    const g = G[ORDER[side][zi]];
    const t = canvasTex(512, 160, (x, w, h) => { x.fillStyle = g.sign; x.fillRect(0, 0, w, h); x.fillStyle = 'rgba(0,0,0,.25)'; x.fillRect(0, h - 22, w, 22); x.fillStyle = '#fff'; x.strokeStyle = 'rgba(0,0,0,.5)'; x.lineWidth = 8; x.lineJoin = 'round'; x.textAlign = 'center'; x.textBaseline = 'middle'; let fs = 92; x.font = `900 ${fs}px Impact,"Arial Black",sans-serif`; while (x.measureText(g.name).width > 470) { fs -= 4; x.font = `900 ${fs}px Impact,"Arial Black",sans-serif`; } x.strokeText(g.name, w / 2, h / 2 - 8); x.fillText(g.name, w / 2, h / 2 - 8); x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 5; x.strokeRect(6, 6, w - 12, h - 12); });
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.25, 0.39), new THREE.MeshBasicMaterial({ map: t, side: THREE.DoubleSide }));
    m.position.set((side ? 1 : -1) * 0.78, 2.97, LEN - (zi + 0.5) * 8); scene.add(m);
    const wire = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.2, 0.01), new THREE.MeshBasicMaterial({ color: 0x222222 }));
    for (const dx of [-0.5, 0.5]) { const w2 = wire.clone(); w2.position.set(m.position.x + dx, 3.1, m.position.z); scene.add(w2); }
  }
  // far end sign
  const ex = canvasTex(256, 96, (x, w, h) => { x.fillStyle = '#0a2b14'; x.fillRect(0, 0, w, h); x.fillStyle = '#58ff8a'; x.font = '900 60px Arial Black,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('EXIT', w / 2, h / 2 + 3); });
  ex.wrapS = ex.wrapT = THREE.ClampToEdgeWrapping;
  const em = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.26), new THREE.MeshBasicMaterial({ map: ex, fog: false })); em.position.set(0, 2.7, -Z + 0.02); scene.add(em);
  const ew = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.1), new THREE.MeshBasicMaterial({ color: 0x1a1d26 })); ew.position.set(0, 1.05, -Z + 0.015); scene.add(ew);
  const ep = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.9), new THREE.MeshBasicMaterial({ color: 0x3a4660 })); ep.position.set(0, 1.0, -Z + 0.02); scene.add(ep);
}
const ORDER = [[1, 2, 3, 4, 5, 6], [0, 5, 1, 2, 6, 3]];

// ---------- shelf items ----------
const PITCH = 0.205, NCOL = Math.floor(48 / PITCH), ZCOLS = Math.ceil(NCOL / 6);
const YB = (l) => 0.12 + l * 0.46 + 0.03;
const IW = 0.2, IH = 0.3, ID = 0.04, IX = HALF + 0.16;
const items = []; // index = side*6*NCOL + l*NCOL + c
let atlasTex;
function buildItems() {
  const ac = document.createElement('canvas'); ac.width = COLS * CW; ac.height = ROWS * CH;
  const ax = ac.getContext('2d');
  const tmp = document.createElement('canvas'); tmp.width = CW; tmp.height = CH; const tx = tmp.getContext('2d');
  for (let id = 0; id < PER * GENRES; id++) { tx.clearRect(0, 0, CW, CH); drawCover(tx, CW, CH, id); ax.drawImage(tmp, (id % COLS) * CW, Math.floor(id / COLS) * CH); }
  atlasTex = new THREE.CanvasTexture(ac); atlasTex.colorSpace = THREE.SRGBColorSpace; atlasTex.anisotropy = maxAniso; atlasTex.generateMipmaps = true; atlasTex.minFilter = THREE.LinearMipmapLinearFilter;
  const P = [], U = [], C = [], I = [];
  const rr = mulberry(77), m4 = new THREE.Matrix4(), q = new THREE.Vector3();
  const hw = IW / 2, ht = IH, dz = ID / 2;
  for (let side = 0; side < 2; side++) for (let l = 0; l < 6; l++) for (let c = 0; c < NCOL; c++) {
    const zi = Math.min(5, Math.floor(c / ZCOLS)), gi = ORDER[side][zi];
    let it = null;
    if (rr() > 0.03) {
      const id = gi * PER + Math.floor(rr() * PER);
      it = { id, side, l, c, z: LEN - (c + 0.5) * PITCH, y: YB(l) + IH / 2, x: (side ? 1 : -1) * IX };
    }
    items.push(it); if (!it) continue;
    const tilt = -0.1 - rr() * 0.07, lean = (rr() - .5) * 0.03, jz = (rr() - .5) * 0.012;
    const ry = side ? -Math.PI / 2 : Math.PI / 2;
    m4.makeRotationFromEuler(new THREE.Euler(tilt, ry, lean, 'YXZ')); m4.setPosition(it.x, YB(l), it.z + jz);
    const cx = id => id % COLS, cy = id => Math.floor(id / COLS);
    const u0 = cx(it.id) / COLS, u1 = (cx(it.id) + 1) / COLS, vt = 1 - cy(it.id) / ROWS, vb = 1 - (cy(it.id) + 1) / ROWS;
    const sv = vb + (vt - vb) * 0.03, su = (u0 + u1) / 2;
    const base = P.length / 3;
    const shade = (0.82 + l * 0.04) * (0.92 + rr() * 0.16);
    const faces = [ // pts, uv(4) , shade
      [[[-hw, 0, dz], [hw, 0, dz], [hw, ht, dz], [-hw, ht, dz]], [[u0, vb], [u1, vb], [u1, vt], [u0, vt]], 1],
      [[[-hw, ht, dz], [hw, ht, dz], [hw, ht, -dz], [-hw, ht, -dz]], null, .75],
      [[[hw, 0, dz], [hw, 0, -dz], [hw, ht, -dz], [hw, ht, dz]], null, .6],
      [[[-hw, 0, -dz], [-hw, 0, dz], [-hw, ht, dz], [-hw, ht, -dz]], null, .6],
    ];
    for (const [pts, uvs, sh] of faces) {
      const k = P.length / 3;
      pts.forEach((p, i) => { q.set(p[0], p[1], p[2]).applyMatrix4(m4); P.push(q.x, q.y, q.z); const uv = uvs ? uvs[i] : [su, sv]; U.push(uv[0], uv[1]); const lv = L(q.z) * shade * sh * (uvs ? 1 : 1); C.push(lv, lv, lv); });
      I.push(k, k + 1, k + 2, k, k + 2, k + 3);
    }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(U, 2)); g.setAttribute('color', new THREE.Float32BufferAttribute(C, 3)); g.setIndex(I);
  scene.add(new THREE.Mesh(g, new THREE.MeshBasicMaterial({ map: atlasTex, vertexColors: true, side: THREE.DoubleSide })));
}

// ---------- picking ----------
const ray = new THREE.Raycaster();
function pick(cx, cy) {
  const nx = cx / innerWidth * 2 - 1, ny = -(cy / innerHeight) * 2 + 1;
  ray.setFromCamera({ x: nx, y: ny }, camera);
  const o = ray.ray.origin, d = ray.ray.direction;
  if (Math.abs(d.x) < 1e-4) return null;
  const side = d.x > 0 ? 1 : 0, px = (side ? 1 : -1) * (IX - 0.02);
  const t = (px - o.x) / d.x; if (t <= 0 || t > 9) return null;
  const y = o.y + d.y * t, z = o.z + d.z * t;
  const c = Math.floor((LEN - z) / PITCH); if (c < 0 || c >= NCOL) return null;
  const l = Math.floor((y - 0.12) / 0.46); if (l < 0 || l > 5) return null;
  const dy = y - YB(l); if (dy < -0.03 || dy > IH + 0.04) return null;
  return items[side * 6 * NCOL + l * NCOL + c] || null;
}
const hl = new THREE.Mesh(new THREE.PlaneGeometry(IW + 0.03, IH + 0.03), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending, depthTest: false, fog: false }));
hl.visible = false; hl.renderOrder = 5; scene.add(hl);
function setHover(it) {
  if (!it) { hl.visible = false; canvas.style.cursor = ''; return; }
  hl.visible = true; hl.position.set(it.x + (it.side ? -0.06 : 0.06), it.y - 0.01, it.z); hl.rotation.set(0, it.side ? -Math.PI / 2 : Math.PI / 2, 0); canvas.style.cursor = 'pointer';
}

// ---------- input / movement ----------
let yaw = 0, pitch = 0; const pos = new THREE.Vector3(0, 1.6, 22.2);
const keys = {}; const joy = { x: 0, y: 0 }; let vel = new THREE.Vector3(); let inspecting = false; let bobT = 0;
addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && inspecting) { closeInspect(); return; }
  if (inspecting) { if (e.code === 'Space' || e.code === 'KeyF') { flip(); e.preventDefault(); } return; }
  keys[e.code] = true; if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.code] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
let look = null, hoverPt = null;
canvas.addEventListener('pointerdown', (e) => {
  if (inspecting) return; if (e.target !== canvas) return;
  if (look) return;
  look = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now(), moved: 0 };
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
  if (look && e.pointerId === look.id) {
    const dx = e.clientX - look.x, dy = e.clientY - look.y; look.x = e.clientX; look.y = e.clientY; look.moved += Math.abs(dx) + Math.abs(dy);
    const k = e.pointerType === 'mouse' ? 0.0032 : 0.0042; yaw -= dx * k; pitch = Math.max(-1.2, Math.min(1.2, pitch - dy * k));
  } else if (e.pointerType === 'mouse') { hoverPt = [e.clientX, e.clientY]; }
});
function endLook(e) {
  if (!look || e.pointerId !== look.id) return;
  const tap = Math.hypot(e.clientX - look.sx, e.clientY - look.sy) < 10 && performance.now() - look.t < 450;
  look = null;
  if (tap && e.type === 'pointerup') { const it = pick(e.clientX, e.clientY); if (it) openInspect(it); }
}
canvas.addEventListener('pointerup', endLook); canvas.addEventListener('pointercancel', endLook);
canvas.addEventListener('wheel', (e) => { if (!inspecting) { const f = -Math.sign(e.deltaY) * 0.35; pos.x += -Math.sin(yaw) * f; pos.z += -Math.cos(yaw) * f; } }, { passive: true });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
// joystick
const joyEl = document.getElementById('joy'), knob = document.getElementById('knob'); let jid = null;
function joyMove(e) { const r = joyEl.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2; let dx = e.clientX - cx, dy = e.clientY - cy; const R = 48, m = Math.hypot(dx, dy); if (m > R) { dx *= R / m; dy *= R / m; } knob.style.transform = `translate(${dx}px,${dy}px)`; joy.x = dx / R; joy.y = dy / R; }
joyEl.addEventListener('pointerdown', (e) => { jid = e.pointerId; joyEl.setPointerCapture(jid); joyMove(e); e.preventDefault(); });
joyEl.addEventListener('pointermove', (e) => { if (e.pointerId === jid) joyMove(e); });
const joyEnd = (e) => { if (e.pointerId !== jid) return; jid = null; joy.x = joy.y = 0; knob.style.transform = ''; };
joyEl.addEventListener('pointerup', joyEnd); joyEl.addEventListener('pointercancel', joyEnd);

// ---------- inspect ----------
const icv = document.getElementById('inspect');
let ir, iscene, icam, imesh, iMats = [], iState = null;
const infoEl = document.getElementById('info');
function initInspect() {
  ir = new THREE.WebGLRenderer({ canvas: icv, alpha: true, antialias: true });
  ir.setClearColor(0x000000, 0); iscene = new THREE.Scene(); icam = new THREE.PerspectiveCamera(34, 1, 0.1, 50); icam.position.set(0, 0, 7);
}
function texFrom(fn, w, h, id) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h, id); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
function layoutInspect() {
  if (!ir) return; const w = innerWidth, h = innerHeight; ir.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); ir.setSize(w, h, false); icam.aspect = w / h; icam.updateProjectionMatrix();
  const visH = 2 * 7 * Math.tan(THREE.MathUtils.degToRad(17)), visW = visH * icam.aspect;
  if (w >= h) { iState.s = Math.min(visH * 0.72 / 3, visW * 0.38 / 2); iState.px = -visW * 0.2; iState.py = 0; }
  else { iState.s = Math.min(visH * 0.42 / 3, visW * 0.7 / 2); iState.px = 0; iState.py = visH * 0.2; }
}
function openInspect(it) {
  if (inspecting) return; if (!ir) initInspect();
  inspecting = true; for (const k in keys) keys[k] = false; look = null; setHover(null);
  const I = info(it.id);
  if (imesh) { iscene.remove(imesh); imesh.geometry.dispose(); iMats.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); }); }
  const g = G[genreOf(it.id)], side = new THREE.MeshBasicMaterial({ color: new THREE.Color(`hsl(${g.hue},45%,20%)`) });
  iMats = [side, side, side, side, new THREE.MeshBasicMaterial({ map: texFrom(drawCover, 512, 768, it.id) }), new THREE.MeshBasicMaterial({ map: texFrom(drawBack, 512, 768, it.id) })];
  imesh = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.22), iMats); iscene.add(imesh);
  iState = { yaw: -2.4, ty: 0, pitch: 0, tp: 0, t0: performance.now(), drag: null, s: 1, px: 0, py: 0 };
  layoutInspect();
  document.getElementById('i-title').textContent = I.title;
  document.getElementById('i-meta').innerHTML = [['GENRE', I.genre], ['YEAR', I.year], ['RUNTIME', I.mins + ' MIN'], ['RATED', I.rating], ['DIRECTOR', I.director], ['CAST', I.cast.join(', ')], ['SHELF', `${'AB'[it.side]}-${String(it.c + 1).padStart(3, '0')}-${it.l + 1}`], ['STOCK', (1 + (it.id % 4)) + (it.id % 4 ? ' COPIES IN' : ' COPY IN')]].map(([k, v]) => `<div><span class="k">${k}</span> &nbsp;${v}</div>`).join('');
  document.getElementById('i-syn').textContent = I.syn;
  infoEl.classList.add('on'); icv.classList.add('on'); canvas.classList.add('dim');
  document.getElementById('hint').style.opacity = 0;
  requestAnimationFrame(iLoop);
}
function closeInspect() { if (!inspecting) return; inspecting = false; infoEl.classList.remove('on'); icv.classList.remove('on'); canvas.classList.remove('dim'); }
function flip() { if (iState) iState.ty += Math.PI; }
document.getElementById('b-close').addEventListener('click', closeInspect);
document.getElementById('b-flip').addEventListener('click', flip);
icv.addEventListener('pointerdown', (e) => { if (!iState) return; iState.drag = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: 0 }; icv.setPointerCapture(e.pointerId); icv.style.cursor = 'grabbing'; });
icv.addEventListener('pointermove', (e) => { const d = iState && iState.drag; if (!d || d.id !== e.pointerId) return; const dx = e.clientX - d.x, dy = e.clientY - d.y; d.x = e.clientX; d.y = e.clientY; d.moved += Math.abs(dx) + Math.abs(dy); iState.ty += dx * 0.011; iState.yaw += dx * 0.011; iState.tp = Math.max(-0.6, Math.min(0.6, iState.tp + dy * 0.006)); });
const iUp = (e) => { const d = iState && iState.drag; if (!d || d.id !== e.pointerId) return; iState.drag = null; icv.style.cursor = ''; iState.ty = Math.round(iState.ty / Math.PI) * Math.PI; iState.tp = 0; if (d.moved < 6 && e.type === 'pointerup') flip(); };
icv.addEventListener('pointerup', iUp); icv.addEventListener('pointercancel', iUp);
const ease = (t) => 1 - Math.pow(1 - t, 3);
function iLoop(now) {
  if (!inspecting) { ir.clear(); return; }
  const k = Math.min(1, (now - iState.t0) / 520), e = ease(k), s = iState.s * (0.3 + 0.7 * e);
  iState.yaw += (iState.ty - iState.yaw) * 0.14; iState.pitch += (iState.tp - iState.pitch) * 0.14;
  imesh.rotation.set(iState.pitch + Math.sin(now / 1100) * 0.015, iState.yaw, 0); imesh.scale.setScalar(s);
  imesh.position.set(iState.px * e, iState.py * e - (1 - e) * 0.6, (1 - e) * 1.5);
  ir.render(iscene, icam); requestAnimationFrame(iLoop);
}

// ---------- main loop ----------
function resize() { const w = innerWidth, h = innerHeight; renderer.setPixelRatio(pr); renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1 ? 82 : 72; camera.updateProjectionMatrix(); layoutInspect(); }
addEventListener('resize', resize);
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let last = performance.now(), acc = 0, nfr = 0, lastZone = '', hoverT = 0;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now;
  acc += dt; nfr++;
  if (nfr === 90) { const avg = acc / nfr; if (avg > 0.024 && pr > 0.85) { pr = Math.max(0.8, pr - 0.3); resize(); } acc = 0; nfr = 0; }
  if (inspecting) return;
  let fx = 0, fz = 0;
  if (keys.KeyW || keys.ArrowUp) fz += 1; if (keys.KeyS || keys.ArrowDown) fz -= 1; if (keys.KeyD) fx += 1; if (keys.KeyA) fx -= 1;
  if (keys.ArrowLeft) yaw += 1.8 * dt; if (keys.ArrowRight) yaw -= 1.8 * dt;
  fx += joy.x; fz -= joy.y;
  const mag = Math.hypot(fx, fz); if (mag > 1) { fx /= mag; fz /= mag; }
  const run = keys.ShiftLeft || keys.ShiftRight ? 1.9 : 1, sp = 2.1 * run;
  const tx = (Math.cos(yaw) * fx - Math.sin(yaw) * fz) * sp, tz = (-Math.sin(yaw) * fx - Math.cos(yaw) * fz) * sp;
  vel.x += (tx - vel.x) * Math.min(1, dt * 10); vel.z += (tz - vel.z) * Math.min(1, dt * 10);
  pos.x = Math.max(-1.2, Math.min(1.2, pos.x + vel.x * dt)); pos.z = Math.max(-23.4, Math.min(23.4, pos.z + vel.z * dt));
  const spd = Math.hypot(vel.x, vel.z); bobT += dt * spd * 3.2;
  camera.position.set(pos.x, pos.y + Math.sin(bobT) * 0.014 * Math.min(1, spd), pos.z);
  camera.rotation.set(pitch, yaw, 0);
  hoverT += dt; if (hoverT > 0.06 && !isTouch) { hoverT = 0; setHover(hoverPt && !look ? pick(hoverPt[0], hoverPt[1]) : null); }
  const zi = Math.max(0, Math.min(5, Math.floor((LEN - pos.z) / 8))); const side = pos.x > 0 ? 1 : 0; const nm = 'NOW BROWSING  ' + G[ORDER[side][zi]].name;
  if (nm !== lastZone) { zoneEl.textContent = nm; lastZone = nm; }
  renderer.render(scene, camera);
}

// ---------- start ----------
async function start() {
  resize();
  hintEl.textContent = isTouch ? 'LEFT STICK: WALK   ·   DRAG: LOOK   ·   TAP A BOX' : 'W A S D: WALK   ·   DRAG MOUSE: LOOK   ·   CLICK A BOX   ·   SHIFT: RUN';
  setTimeout(() => { hintEl.style.opacity = 0; }, 9000);
  await new Promise(r => setTimeout(r, 30));
  buildWorld(); buildItems();
  if (params.has('x')) pos.x = +params.get('x'); if (params.has('z')) pos.z = +params.get('z');
  if (params.has('yaw')) yaw = +params.get('yaw'); if (params.has('pitch')) pitch = +params.get('pitch');
  renderer.compile(scene, camera);
  document.getElementById('load').classList.add('off');
  requestAnimationFrame(frame);
  if (params.has('open')) { const [s, l, c] = params.get('open').split(',').map(Number); openInspect(items[s * 6 * NCOL + l * NCOL + c]); if (params.has('flip')) iState.ty = iState.yaw = Math.PI; }
}
start();
window.__dbg = { pos, items, NCOL, pick, openInspect };
