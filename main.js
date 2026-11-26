import * as THREE from 'three';

// ================= data =================
const G = [
  { name: 'NEW RELEASES', hue: 355, pool: [0, 1, 2, 3], P: ['NEON', 'LAST', 'BLOOD', 'GLASS', 'FINAL', 'HOLLOW', 'SILVER', 'WILD', 'BURNING', 'MIDNIGHT'], N: ['HORIZON', 'PROTOCOL', 'DYNASTY', 'SIGNAL', 'RECKONING', 'CIRCUIT', 'EMPIRE', 'FREQUENCY', 'HEIST', 'VERDICT'], S: ['A crew of strangers gets one night to pull off the job nobody believes in.', 'The sequel everyone argued about. Louder, faster, and somehow sadder.', 'When the lights go out downtown, one courier knows the way through.'] },
  { name: 'STAFF FAVORITES', hue: 215, pool: [3, 1, 0, 2], P: ['GOLDEN', 'CULT', 'HIDDEN', 'LOST', 'ONCE', 'SECRET', 'BRIGHT', 'FORGOTTEN', 'ELECTRIC', 'PAPER'], N: ['ENCOUNTERS', 'HIGHWAY', 'GAMBLE', 'SUMMER', 'MIRAGE', 'LEGEND', 'KINGDOM', 'COMEBACK', 'FRIENDSHIP', 'WEEKEND'], S: ['The one we keep recommending to every customer who asks.', 'Nobody saw it in theaters. Everybody here has seen it ten times.', 'Rewatched so often the tape wore thin. A staff favorite for a reason.'] },
  { name: 'COMEDY', hue: 48, pool: [2], P: ['BIG', 'MY', 'UNCLE', 'DOUBLE', 'PRETTY', 'LUCKY', 'WEDDING', 'SUMMER', 'CRAZY', 'LOST'], N: ['TROUBLE', 'BUSINESS', 'ROAD TRIP', 'MIX-UP', 'PARTY', 'VACATION', 'ROOMMATES', 'BUDDY', 'BLIND DATE', 'MESS'], S: ['Two roommates swap lives for a weekend and nothing goes to plan.', 'A small-town wedding turns into the loudest family reunion ever filmed.', 'He only wanted a quiet vacation. The hotel had other ideas.'] },
  { name: 'ACTION', hue: 12, pool: [0], P: ['IRON', 'DEADLY', 'RED', 'LAST', 'STEEL', 'SHATTERED', 'RAPID', 'BROKEN', 'HARD', 'SAVAGE'], N: ['FIST', 'STRIKE', 'PURSUIT', 'FURY', 'TARGET', 'THUNDER', 'ESCAPE', 'COMMAND', 'RUSH', 'VENGEANCE'], S: ['One cop, one clock, and a city that will not stop shooting.', 'Betrayed by his own unit, he has until sunrise to clear his name.', 'The getaway driver wants out. The crew does not.'] },
  { name: 'SCI-FI', hue: 200, pool: [1], P: ['STAR', 'QUANTUM', 'ORBITAL', 'DEEP', 'CHROME', 'ALIEN', 'LUNAR', 'ZERO', 'COSMIC', 'PLANET'], N: ['DRIFT', 'GATE', 'COLONY', 'ECHO', 'ARCHIVE', 'EVENT', 'MACHINE', 'TRANSIT', 'INVASION', 'DAWN'], S: ['A signal from beyond Neptune says the crew should turn back. They do not.', 'The station AI has started dreaming. Nobody told the engineers.', 'Colonists wake to find the ship ten years off course.'] },
  { name: 'HORROR', hue: 285, pool: [1], P: ['CURSED', 'DEAD', 'SILENT', 'BLACK', 'PALE', 'WICKED', 'BURIED', 'HAUNTED', 'NIGHT', 'CRIMSON'], N: ['HOUSE', 'WOODS', 'HOLLOW', 'WHISPER', 'MOTEL', 'HARVEST', 'SLEEPOVER', 'BASEMENT', 'LULLABY', 'FOG'], S: ['They said the cabin had been empty for years. The lights said otherwise.', 'Every night at 3:07 the phone rings. Tonight someone answers.', 'The new neighbors never leave their house. The dog will not stop barking.'] },
  { name: 'DRAMA', hue: 28, pool: [3], P: ['QUIET', 'GOLDEN', 'LONG', 'WINTER', 'BROKEN', 'PAPER', 'SECOND', 'HONEST', 'DISTANT', 'EMPTY'], N: ['HOUSE', 'SEASON', 'LETTERS', 'HARBOR', 'PROMISE', 'MEMORY', 'RIVER', 'WALTZ', 'CROSSING', 'SUMMER'], S: ['Three generations under one roof, one secret nobody will say out loud.', 'A retired pianist returns to the town that forgot him.', 'Letters found in an attic change how a family remembers the war.'] },
  { name: 'FAMILY', hue: 130, pool: [2], P: ['LITTLE', 'MAGIC', 'SUPER', 'BRAVE', 'SECRET', 'FLYING', 'TINY', 'HAPPY', 'GIANT', 'SPARKLE'], N: ['ADVENTURE', 'DRAGON', 'TREEHOUSE', 'ROBOT', 'PUPPIES', 'CASTLE', 'EXPEDITION', 'CLUB', 'BALLOON', 'SUMMER CAMP'], S: ['A shy kid finds a map in the library and the whole town follows.', 'The backyard robot just wants to learn how to play.', 'Four cousins, one rainy week, and a treehouse with a mind of its own.'] },
];
const FIRST = ['Marcus', 'Elena', 'Tony', 'Sofia', 'Jack', 'Dana', 'Rico', 'Nina', 'Omar', 'Lena', 'Victor', 'Mia', 'Hank', 'Zara', 'Leo', 'Ivy'];
const LAST = ['Stone', 'Rivera', 'Kane', 'Voss', 'Moreno', 'Hale', 'Cruz', 'Park', 'Doyle', 'Fox', 'Reyes', 'Quinn', 'Blake', 'Nash', 'Ortiz', 'Wells'];
const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const NG = G.length, PER = 31, NCOVER = NG * PER;
function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const genreOf = (c) => Math.min(NG - 1, Math.floor(c / PER));
const infoCache = {};
function info(id) {
  if (infoCache[id]) return infoCache[id];
  const g = G[genreOf(id)], r = mulberry(id * 977 + 5), pick = (a) => a[Math.floor(r() * a.length)];
  const p = pick(g.P), n = pick(g.N), f = r();
  const title = f < 0.45 ? `${p} ${n}` : f < 0.75 ? `THE ${p} ${n}` : f < 0.9 ? `${n} OF THE ${pick(g.P)}` : `${p} ${n} ${pick(['II', 'III', 'RETURNS', '2'])}`;
  const nm = () => `${pick(FIRST)} ${pick(LAST)}`; const mins = 82 + Math.floor(r() * 62);
  return infoCache[id] = { id, title, genre: g.name, year: 1979 + Math.floor(r() * 27), run: `${Math.floor(mins / 60)}:${String(mins % 60).padStart(2, '0')}`, rating: pick(['G', 'PG', 'PG', 'PG-13', 'PG-13', 'R']), director: nm(), cast: [nm(), nm(), nm()], syn: pick(g.S), code: `${'FPXRKT'[id % 6]}${1 + id % 9}-${'CTMLSQ'[(id >> 2) % 6]}${1 + (id * 7) % 9}${'ABCDEFG'[id % 7]}`, rented: `${String(1 + id % 28).padStart(2, '0')} ${MON[(id * 5) % 12]} 20${19 + id % 3}`, tag: pick(['THE WILDEST RIDE OF THE YEAR', 'YOU WILL NOT FORGET IT', 'BE KIND, REWIND', 'TWO THUMBS UP', 'NOBODY SAW IT COMING', 'A STAFF FAVORITE']) };
}

// ================= poster art + covers =================
let ART = null; const ART_COLS = 8, ART_ROWS = 8; // 4 sheets (2x2) of 4x4 posters
function artCell(c) { const g = G[genreOf(c)], r = mulberry(c * 131 + 7); const sheet = g.pool[Math.floor(r() * g.pool.length)]; const cell = Math.floor(r() * 16); const sx = (sheet % 2) * 4 + (cell % 4), sy = Math.floor(sheet / 2) * 4 + Math.floor(cell / 4); return { sx, sy, flip: r() < 0.3, zoom: 1 + r() * 0.18, ox: r(), oy: r(), hueShift: r() }; }
function wrap(ctx, text, maxW) { const ws = text.split(' '), out = []; let cur = ''; for (const w of ws) { const t = cur ? cur + ' ' + w : w; if (ctx.measureText(t).width > maxW && cur) { out.push(cur); cur = w; } else cur = t; } out.push(cur); return out; }
function paintArt(ctx, c, W, H, blurFill) {
  const g = G[genreOf(c)], a = artCell(c), hue = g.hue + (a.hueShift * 40 - 20);
  if (ART) {
    const cw = ART.width / ART_COLS, ch = ART.height / ART_ROWS, inset = 0.035, sw = cw * (1 - 2 * inset) / a.zoom, sh = ch * (1 - 2 * inset) / a.zoom;
    const sx = a.sx * cw + cw * inset + (cw * (1 - 2 * inset) - sw) * a.ox, sy = a.sy * ch + ch * inset + (ch * (1 - 2 * inset) - sh) * a.oy;
    ctx.save(); if (a.flip) { ctx.translate(W, 0); ctx.scale(-1, 1); } ctx.drawImage(ART, sx, sy, sw, sh, 0, 0, W, H); ctx.restore();
  } else {
    const gr = ctx.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, `hsl(${hue},75%,48%)`); gr.addColorStop(1, `hsl(${hue + 20},80%,14%)`); ctx.fillStyle = gr; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = `hsla(${hue + 40},90%,70%,.5)`; ctx.beginPath(); ctx.arc(W / 2, H * 0.5, W * 0.28, 0, 7); ctx.fill();
  }
  ctx.globalCompositeOperation = 'overlay'; ctx.fillStyle = `hsla(${hue},70%,50%,.22)`; ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over';
  return hue;
}
function drawCover(ctx, w, h, c) {
  const I = info(c), gi = genreOf(c); ctx.save(); ctx.scale(w / 200, h / 300);
  const hue = paintArt(ctx, c, 200, 300);
  let g = ctx.createLinearGradient(0, 0, 0, 90); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, 200, 90);
  g = ctx.createLinearGradient(0, 170, 0, 300); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.88)'); ctx.fillStyle = g; ctx.fillRect(0, 170, 200, 130);
  ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; let fs = 36, lines;
  for (; fs > 13; fs -= 1) { ctx.font = `900 ${fs}px Impact,"Arial Narrow Bold","Arial Black",sans-serif`; lines = wrap(ctx, I.title, 168); if (lines.length <= 2 && lines.every(l => ctx.measureText(l).width <= 170)) break; }
  const base = 238 - (lines.length - 1) * fs * 1.0;
  ctx.lineJoin = 'round'; ctx.shadowColor = `hsla(${hue},100%,60%,.9)`; ctx.shadowBlur = 8;
  lines.forEach((l, i) => { const y = base + i * fs * 1.0; ctx.lineWidth = 4; ctx.strokeStyle = '#140808'; ctx.strokeText(l, 100, y); const gg = ctx.createLinearGradient(0, y - fs, 0, y); gg.addColorStop(0, '#fff'); gg.addColorStop(0.55, '#ffe9a8'); gg.addColorStop(1, '#f0a53a'); ctx.fillStyle = gg; ctx.fillText(l, 100, y); });
  ctx.shadowBlur = 0; ctx.fillStyle = 'rgba(255,255,255,.9)'; ctx.font = 'italic bold 7.5px sans-serif'; ctx.fillText(I.tag, 100, 252);
  ctx.fillStyle = 'rgba(255,255,255,.5)'; for (let i = 0; i < 2; i++) { const bw = 140 - i * 30; ctx.fillRect(100 - bw / 2, 262 + i * 6, bw, 2.2); }
  ctx.fillStyle = '#fff'; ctx.fillRect(8, 8, 26, 13); ctx.fillStyle = '#111'; ctx.font = 'bold 9px sans-serif'; ctx.textBaseline = 'middle'; ctx.fillText(I.rating, 21, 15);
  if (gi === 1) { ctx.fillStyle = '#e8222e'; ctx.beginPath(); const hx = 164, hy = 34; ctx.moveTo(hx, hy + 16); ctx.bezierCurveTo(hx - 26, hy - 2, hx - 10, hy - 22, hx, hy - 8); ctx.bezierCurveTo(hx + 10, hy - 22, hx + 26, hy - 2, hx, hy + 16); ctx.fill(); ctx.fillStyle = '#fff'; ctx.font = 'bold 6px sans-serif'; ctx.fillText('STAFF', hx, hy - 2); ctx.fillText('FAVE', hx, hy + 5); }
  if (gi === 0) { ctx.fillStyle = '#ffd21f'; ctx.fillRect(130, 10, 62, 16); ctx.fillStyle = '#c4141c'; ctx.font = '900 11px Impact,sans-serif'; ctx.fillText('NEW RELEASE', 161, 18.5); }
  ctx.fillStyle = `hsl(${hue},60%,10%)`; ctx.fillRect(0, 288, 200, 12); ctx.fillStyle = `hsl(${hue},90%,60%)`; ctx.fillRect(0, 288, 200, 1.6);
  ctx.restore();
}
function drawBack(ctx, w, h, c) {
  const I = info(c); ctx.save(); ctx.scale(w / 200, h / 300);
  paintArt(ctx, c, 200, 300); ctx.fillStyle = 'rgba(8,8,12,.86)'; ctx.fillRect(0, 0, 200, 300);
  ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = '#fff'; ctx.font = '900 17px Impact,"Arial Black",sans-serif'; let y = 14; wrap(ctx, I.title, 176).forEach(l => { ctx.fillText(l, 12, y); y += 18; });
  ctx.font = '9.5px Georgia,serif'; ctx.fillStyle = '#d8d8e0'; y += 6; wrap(ctx, I.syn, 176).forEach(l => { ctx.fillText(l, 12, y); y += 12.5; });
  y += 8; ctx.font = 'bold 8px sans-serif'; ctx.fillStyle = '#fff'; ctx.fillText(`DIRECTED BY ${I.director.toUpperCase()}`, 12, y); y += 12; ctx.font = '7.5px sans-serif'; ctx.fillText(`STARRING ${I.cast.join(' / ').toUpperCase()}`, 12, y);
  ctx.fillStyle = '#fff'; ctx.fillRect(12, 236, 176, 1); ctx.font = 'bold 8px sans-serif'; ctx.fillText(`${I.run}   ${I.year}   ${I.rating}   STEREO`, 12, 242);
  const r = mulberry(c + 3); ctx.fillStyle = '#fff'; ctx.fillRect(112, 256, 76, 32); ctx.fillStyle = '#000'; for (let i = 0; i < 46; i++) ctx.fillRect(116 + i * 1.5, 259, 0.5 + r() * 0.9, 26);
  ctx.fillStyle = '#fff'; ctx.font = 'bold 9px sans-serif'; ctx.fillText('BE KIND, REWIND', 12, 272);
  ctx.restore();
}
function drawSpine(ctx, w, h, s) {
  const c = Math.floor(s / 3), v = s % 3, I = info(c), g = G[genreOf(c)], r = mulberry(s * 31 + 1);
  const hue = g.hue + (r() * 60 - 30), light = 20 + r() * 40;
  ctx.fillStyle = v === 1 ? `hsl(${hue},20%,${8 + r() * 10}%)` : `hsl(${hue},${55 + r() * 35}%,${light}%)`; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = `hsla(${hue + 30},90%,70%,.85)`; ctx.fillRect(0, 0, w, h * 0.055); ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(0, h * 0.9, w, h * 0.1);
  ctx.fillStyle = '#fff'; ctx.fillRect(w * 0.15, h * 0.915, w * 0.7, h * 0.05);
  ctx.save(); ctx.translate(w / 2, h * 0.08); ctx.rotate(Math.PI / 2); ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
  ctx.font = `900 ${Math.floor(w * 0.55)}px Impact,"Arial Narrow Bold","Arial Black",sans-serif`; ctx.fillStyle = v === 2 ? '#111' : '#fff'; ctx.lineWidth = 2; ctx.strokeStyle = v === 2 ? 'rgba(255,255,255,.5)' : 'rgba(0,0,0,.55)';
  let t = I.title; while (ctx.measureText(t).width > h * 0.78 && t.length > 4) t = t.slice(0, -1); ctx.strokeText(t, 0, 0); ctx.fillText(t, 0, 0); ctx.restore();
}

// ================= renderer / scene =================
const params = new URLSearchParams(location.search);
const canvas = document.getElementById('world');
const isTouch = matchMedia('(pointer:coarse)').matches || 'ontouchstart' in window;
if (isTouch) document.body.classList.add('touch');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
let pr = isTouch ? Math.min(devicePixelRatio || 1, 2) : Math.min(Math.max(devicePixelRatio || 1, 1.5), 2);
const scene = new THREE.Scene(); const FOG = 0x040406;
scene.background = new THREE.Color(FOG); scene.fog = new THREE.Fog(FOG, 4, 30);
const camera = new THREE.PerspectiveCamera(75, 1, 0.05, 60); camera.rotation.order = 'YXZ';
const maxAniso = Math.min(16, renderer.capabilities.getMaxAnisotropy());

const HALF = 1.1, DEPTH = 0.34, LEN = 20, CEIL = 3.4, BAND0 = 2.38, BAND1 = 3.2, NL = 5;
const YB = (l) => 0.22 + l * 0.42;
const pool = (z) => { const m = (((z - 2) % 4) + 4) % 4, d = m > 2 ? m - 4 : m; return Math.exp(-((d / 1.45) * (d / 1.45))); };
const L = (z) => 0.3 + 0.95 * pool(z);
class GB {
  constructor() { this.p = []; this.u = []; this.c = []; this.i = []; }
  v(x, y, z, u, v, s) { const l = L(z) * s; this.p.push(x, y, z); this.u.push(u, v); this.c.push(l, l, l); return this.p.length / 3 - 1; }
  quad(a, b, c, d) { this.i.push(a, b, c, a, c, d); }
  grid(o, du, dv, nu, nv, ru, rv, s = 1) { const base = this.p.length / 3; for (let j = 0; j <= nv; j++) for (let i = 0; i <= nu; i++) { const a = i / nu, b = j / nv; this.v(o[0] + du[0] * a + dv[0] * b, o[1] + du[1] * a + dv[1] * b, o[2] + du[2] * a + dv[2] * b, a * ru, b * rv, s); } for (let j = 0; j < nv; j++) for (let i = 0; i < nu; i++) { const k = base + j * (nu + 1) + i; this.quad(k, k + 1, k + nu + 2, k + nu + 1); } }
  box(x0, x1, y0, y1, z0, z1, s) { const f = (pts, sh) => { const k = pts.map(q => this.v(q[0], q[1], q[2], 0, 0, s * sh)); this.quad(k[0], k[1], k[2], k[3]); }; f([[x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1]], .8); f([[x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0]], .8); f([[x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0]], 1.1); f([[x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1]], .4); f([[x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1]], .9); f([[x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0]], .9); }
  geo() { const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(this.u, 2)); g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3)); g.setIndex(this.i); return g; }
}
function canvasTex(w, h, fn, clamp) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = clamp ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = maxAniso; return t; }
function noise(x, w, h, amt) { const id = x.getImageData(0, 0, w, h), r = mulberry(5); for (let i = 0; i < id.data.length; i += 4) { const n = (r() - .5) * amt; id.data[i] += n; id.data[i + 1] += n; id.data[i + 2] += n; } x.putImageData(id, 0, 0); }

const ZN = [['NEW RELEASES', 'STAFF FAVORITES', 'COMEDY', 'ACTION', 'SCI-FI', 'HORROR', 'DRAMA', 'FAMILY'], ['STAFF FAVORITES', 'NEW RELEASES', 'ACTION', 'COMEDY', 'HORROR', 'SCI-FI', 'FAMILY', 'DRAMA']];
const gIdx = (name) => G.findIndex(g => g.name === name);
const NZ = 8, ZLEN = (2 * LEN) / NZ;
const SIGN = { 'COMEDY': ['#f4c61b', '#c4141c', '#fff'], 'ACTION': ['#16110f', '#ff8a1e', '#ffd25a'], 'NEW RELEASES': ['#c4262e', '#fff', '#1c3b8f'], 'STAFF FAVORITES': ['#17306e', '#ffd21f', '#ffd21f'], 'SCI-FI': ['#0b2a3a', '#4fe3ff', '#4fe3ff'], 'HORROR': ['#110c14', '#7dff5a', '#7dff5a'], 'DRAMA': ['#5a1424', '#f3d27a', '#f3d27a'], 'FAMILY': ['#1f7a3a', '#fff', '#ffe36a'] };
function signTex(name) {
  const [bg, fg, ac] = SIGN[name]; return canvasTex(512, 160, (x, w, h) => {
    const rr = (px, py, pw, ph, r) => { x.beginPath(); x.moveTo(px + r, py); x.arcTo(px + pw, py, px + pw, py + ph, r); x.arcTo(px + pw, py + ph, px, py + ph, r); x.arcTo(px, py + ph, px, py, r); x.arcTo(px, py, px + pw, py, r); x.closePath(); };
    x.clearRect(0, 0, w, h); rr(3, 3, w - 6, h - 6, 14); const gr = x.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, bg); gr.addColorStop(1, 'rgba(0,0,0,.55)'); x.fillStyle = bg; x.fill(); x.fillStyle = gr; x.fill();
    x.lineWidth = 7; x.strokeStyle = ac; rr(10, 10, w - 20, h - 20, 10); x.stroke(); x.strokeStyle = 'rgba(255,255,255,.6)'; x.lineWidth = 2; rr(3, 3, w - 6, h - 6, 14); x.stroke();
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; let fs = 86; const txt = name.replace('STAFF FAVORITES', '★ STAFF FAVORITES ★'); x.font = `italic 900 ${fs}px Impact,"Arial Black",sans-serif`; while (x.measureText(txt).width > 440) { fs -= 3; x.font = `italic 900 ${fs}px Impact,"Arial Black",sans-serif`; }
    x.lineWidth = 9; x.strokeStyle = name === 'COMEDY' ? '#fff' : 'rgba(0,0,0,.6)'; x.strokeText(txt, w / 2, h / 2 + 2);
    if (name === 'ACTION') { const g2 = x.createLinearGradient(0, 30, 0, 130); g2.addColorStop(0, '#fff3b0'); g2.addColorStop(0.5, '#ff9a1e'); g2.addColorStop(1, '#e02a10'); x.fillStyle = g2; } else x.fillStyle = fg; x.fillText(txt, w / 2, h / 2 + 2);
  }, true);
}
function bandTex(side) {
  return canvasTex(3072, 384, (x, w, h) => {
    const red = side === 0; const gr = x.createLinearGradient(0, 0, 0, h); if (red) { gr.addColorStop(0, '#d12a32'); gr.addColorStop(1, '#8e1820'); } else { gr.addColorStop(0, '#2088a8'); gr.addColorStop(1, '#0e4a66'); } x.fillStyle = gr; x.fillRect(0, 0, w, h);
    const r = mulberry(side * 17 + 3); let px = 40;
    while (px < w - 200) { const kind = r(); if (kind < 0.78) { const pw = 150 + r() * 40, ph = pw * 1.45; const cid = Math.floor(r() * NCOVER); x.save(); x.shadowColor = 'rgba(0,0,0,.6)'; x.shadowBlur = 12; x.translate(px, 28 + r() * 40); x.save(); x.beginPath(); x.rect(0, 0, pw, ph); x.clip(); x.fillStyle = '#222'; x.fillRect(0, 0, pw, ph); x.scale(pw / 200, ph / 300); paintArt(x, cid, 200, 300); x.restore(); x.restore(); px += pw + 24 + r() * 40; }
      else if (kind < 0.9) { const bw = 330, bh = 70; x.save(); x.translate(px, 150); x.rotate(red ? -0.03 : 0.03); x.fillStyle = '#fff'; x.fillRect(0, 0, bw, bh); x.fillStyle = '#c4141c'; x.font = '900 40px Impact,Arial Black,sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NO FOOD OR DRINK', bw / 2, bh / 2 + 2); x.strokeStyle = '#c4141c'; x.lineWidth = 3; x.strokeRect(5, 5, bw - 10, bh - 10); x.restore(); px += bw + 60; }
      else { const bw = 380, bh = 150; x.save(); x.translate(px, 100); x.fillStyle = '#0a0a0e'; x.fillRect(0, 0, bw, bh); x.strokeStyle = red ? '#ff3a4a' : '#59e0ff'; x.lineWidth = 3; x.strokeRect(6, 6, bw - 12, bh - 12); x.fillStyle = red ? '#ff4455' : '#66e8ff'; x.shadowColor = x.fillStyle; x.shadowBlur = 22; x.font = 'italic 78px "Brush Script MT","Segoe Script",cursive'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(red ? 'New Releases' : 'Staff Picks', bw / 2, bh / 2); x.restore(); px += bw + 50; } }
    x.fillStyle = 'rgba(255,255,255,.85)'; x.fillRect(0, h - 10, w, 6);
  }, false);
}
const glowTex = canvasTex(128, 128, (x, w, h) => { const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,248,225,.55)'); g.addColorStop(1, 'rgba(255,240,210,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h); }, true);

function buildWorld() {
  const carpet = canvasTex(256, 256, (x, w, h) => { x.fillStyle = '#17171c'; x.fillRect(0, 0, w, h); const r = mulberry(4); for (let i = 0; i < 900; i++) { x.fillStyle = `rgba(${60 + r() * 60},${60 + r() * 60},${70 + r() * 70},${0.25 + r() * .4})`; x.fillRect(r() * w, r() * h, 2, 2); } noise(x, w, h, 18); });
  const peg = canvasTex(128, 256, (x, w, h) => { x.fillStyle = '#948d78'; x.fillRect(0, 0, w, h); noise(x, w, h, 14); for (let j = 0; j < 16; j++) for (let i = 0; i < 8; i++) { const cx = 8 + i * 16 + (j % 2 ? 8 : 0), cy = 8 + j * 16; x.fillStyle = 'rgba(40,36,26,.85)'; x.beginPath(); x.arc(cx % w, cy, 3.2, 0, 7); x.fill(); x.fillStyle = 'rgba(255,255,240,.25)'; x.beginPath(); x.arc(cx % w, cy - 3.8, 1.6, 0, 7); x.fill(); }
    const g = x.createLinearGradient(0, 0, 0, h * 0.3); g.addColorStop(0, 'rgba(0,0,0,.85)'); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, w, h * 0.3); });
  const tile = canvasTex(128, 128, (x, w, h) => { x.fillStyle = '#3b3b41'; x.fillRect(0, 0, w, h); noise(x, w, h, 22); x.strokeStyle = '#18181c'; x.lineWidth = 3; x.strokeRect(0, 0, w, h); });
  const mC = new THREE.MeshBasicMaterial({ map: carpet, vertexColors: true });
  const mPeg = new THREE.MeshBasicMaterial({ map: peg, vertexColors: true, side: THREE.DoubleSide });
  const mTile = new THREE.MeshBasicMaterial({ map: tile, vertexColors: true, side: THREE.DoubleSide });
  const mPlain = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const W = HALF + DEPTH, Z = LEN + 0.5;
  let b = new GB(); b.grid([-W, 0, Z], [2 * W, 0, 0], [0, 0, -2 * Z], 3, 80, 2 * W / 1.2, 2 * Z / 1.2); scene.add(new THREE.Mesh(b.geo(), mC));
  b = new GB(); b.grid([-W, CEIL, Z], [2 * W, 0, 0], [0, 0, -2 * Z], 3, 80, 2 * W / .6, 2 * Z / .6, 1); scene.add(new THREE.Mesh(b.geo(), mTile));
  b = new GB(); for (const sx of [-1, 1]) b.grid([sx * W, 0, Z], [0, 0, -2 * Z], [0, BAND0 + 0.1, 0], 80, 1, 2 * Z / 0.4, (BAND0 + 0.1 - 0.22) / 0.42 + 0.52, 0.95); scene.add(new THREE.Mesh(b.geo(), mPeg));
  b = new GB(); for (const z of [Z, -Z]) b.grid([-W, 0, z], [2 * W, 0, 0], [0, CEIL, 0], 1, 1, 1, 1, .15); scene.add(new THREE.Mesh(b.geo(), mPlain));
  // header bands
  for (const side of [0, 1]) {
    const sx = side ? 1 : -1, t = bandTex(side), g = new GB();
    const x0 = sx * (HALF + 0.02), x1 = sx * (HALF + 0.3);
    if (side === 0) g.grid([x0, BAND0, Z], [0, 0, -2 * Z], [x1 - x0, BAND1 - BAND0, 0], 80, 1, 2 * Z / 8, 1, 1.0); else g.grid([x0, BAND0, -Z], [0, 0, 2 * Z], [x1 - x0, BAND1 - BAND0, 0], 80, 1, 2 * Z / 8, 1, 1.0);
    scene.add(new THREE.Mesh(g.geo(), new THREE.MeshBasicMaterial({ map: t, vertexColors: true, side: THREE.DoubleSide })));
  }
  // shelf structure
  b = new GB();
  for (const sx of [-1, 1]) {
    const xi = sx * HALF, xo = sx * (HALF + DEPTH), xa = Math.min(xi, xo), xb = Math.max(xi, xo);
    for (let l = 0; l < NL; l++) for (let z = -LEN; z < LEN; z += 1) {
      b.box(xa, xb, YB(l) - 0.04, YB(l), z, z + 1, .1);
      b.box(sx > 0 ? xi : xi - 0.012, sx > 0 ? xi + 0.012 : xi, YB(l) - 0.05, YB(l) - 0.005, z, z + 1, .035);
      const rx0 = sx > 0 ? xi : xi - 0.008, rx1 = sx > 0 ? xi + 0.008 : xi; b.box(rx0, rx1, YB(l) + 0.05, YB(l) + 0.062, z, z + 1, 1.0);
    }
    for (let z = -LEN; z <= LEN; z += 1.2) b.box(sx > 0 ? xi : xi - 0.04, sx > 0 ? xi + 0.04 : xi, 0, BAND0, z - 0.02, z + 0.02, .06);
    for (let z = -LEN; z < LEN; z += 1) { b.box(xa, xb, 0, 0.19, z, z + 1, .12); b.box(xa, xb, BAND0 - 0.06, BAND0, z, z + 1, .1); }
  }
  scene.add(new THREE.Mesh(b.geo(), mPlain));
  // ceiling lights + glow sprites
  const lp = [], li = [], sprites = [];
  for (let z = 2 + 4 * Math.ceil((-LEN - 2) / 4); z <= LEN; z += 4) { const k = lp.length / 3, y = CEIL - 0.015; lp.push(-0.32, y, z + 0.6, 0.32, y, z + 0.6, 0.32, y, z - 0.6, -0.32, y, z - 0.6); li.push(k, k + 1, k + 2, k, k + 2, k + 3); sprites.push(z); }
  const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3)); lg.setIndex(li);
  scene.add(new THREE.Mesh(lg, new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, fog: false })));
  const sm = new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, fog: false, opacity: 0.85 });
  for (const z of sprites) { const s = new THREE.Sprite(sm); s.position.set(0, CEIL - 0.25, z); s.scale.set(3.1, 2.2, 1); scene.add(s); }
  // hanging signs
  for (let zi = 0; zi < NZ; zi++) for (const side of [0, 1]) {
    const name = ZN[side][zi], t = signTex(name), z = LEN - (zi + 0.5) * ZLEN + (side ? -0.35 : 0.35), x = side ? 0.5 : -0.5;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 0.275), new THREE.MeshBasicMaterial({ map: t, transparent: true, side: THREE.DoubleSide, color: 0xe0e0e0 })); m.position.set(x, 2.86, z); scene.add(m);
    const wm = new THREE.MeshBasicMaterial({ color: 0x15151a }); for (const dx of [-0.32, 0.32]) { const w2 = new THREE.Mesh(new THREE.BoxGeometry(0.008, CEIL - 2.99, 0.008), wm); w2.position.set(x + dx, (CEIL + 2.99) / 2 - 0.02, z); scene.add(w2); }
  }
  // far end
  const em = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.3), new THREE.MeshBasicMaterial({ map: signTex('ACTION'), transparent: true, fog: false })); em.position.set(0, 2.6, -Z + 0.02); em.scale.setScalar(0.5); scene.add(em);
}

// ================= shelf items =================
const IMG = {}; let cover = null, spine = null;
const arr = [[], []].map(() => Array.from({ length: NL }, () => []));
function buildItems() {
  const CC = 16, CR = 16, CWd = 128, CHt = 192, SC = 48, SR = 16, SW = 24, SH = 160;
  const ac = document.createElement('canvas'); ac.width = CC * CWd; ac.height = CR * CHt; const ax = ac.getContext('2d');
  const tmp = document.createElement('canvas'); tmp.width = CWd; tmp.height = CHt; const tx = tmp.getContext('2d');
  for (let c = 0; c < NCOVER; c++) { tx.clearRect(0, 0, CWd, CHt); drawCover(tx, CWd, CHt, c); ax.drawImage(tmp, (c % CC) * CWd, Math.floor(c / CC) * CHt); }
  ax.fillStyle = '#e9e9ee'; ax.fillRect(CWd * 15, CHt * 15, CWd, CHt); // last cell: plain case plastic
  cover = new THREE.CanvasTexture(ac); cover.colorSpace = THREE.SRGBColorSpace; cover.anisotropy = maxAniso;
  const sc = document.createElement('canvas'); sc.width = SC * SW; sc.height = SR * SH; const sx = sc.getContext('2d'); const st = document.createElement('canvas'); st.width = SW; st.height = SH; const stx = st.getContext('2d');
  for (let s = 0; s < NCOVER * 3; s++) { stx.clearRect(0, 0, SW, SH); drawSpine(stx, SW, SH, s); sx.drawImage(st, (s % SC) * SW, Math.floor(s / SC) * SH); }
  spine = new THREE.CanvasTexture(sc); spine.colorSpace = THREE.SRGBColorSpace; spine.anisotropy = maxAniso;
  const cg = { P: [], U: [], C: [], I: [] }, sg = { P: [], U: [], C: [], I: [] };
  const rr = mulberry(99), m4 = new THREE.Matrix4(), q = new THREE.Vector3(), eu = new THREE.Euler();
  const quadTo = (g, pts, uvs, sh, mat, lz) => { const k = g.P.length / 3; pts.forEach((p, i) => { q.set(p[0], p[1], p[2]).applyMatrix4(mat); g.P.push(q.x, q.y, q.z); g.U.push(uvs[i][0], uvs[i][1]); const lv = L(q.z) * sh; g.C.push(lv, lv, lv); }); g.I.push(k, k + 1, k + 2, k, k + 2, k + 3); };
  for (let side = 0; side < 2; side++) for (let l = 0; l < NL; l++) {
    let z = LEN - 0.04; const sgn = side ? 1 : -1, ry = side ? -Math.PI / 2 : Math.PI / 2, a = arr[side][l];
    while (z > -LEN + 0.3) {
      const zone = Math.min(NZ - 1, Math.floor((LEN - z) / ZLEN)), g = gIdx(ZN[side][zone]);
      const spineRun = rr() < (l < 2 ? 0.7 : l < 4 ? 0.45 : 0.3), n = spineRun ? 6 + Math.floor(rr() * 24) : 2 + Math.floor(rr() * 4);
      if (!spineRun && rr() < 0.25) { z -= 0.1 + rr() * 0.1; }
      for (let k = 0; k < n && z > -LEN + 0.3; k++) {
        const c = g * PER + Math.floor(rr() * PER);
        if (spineRun) {
          const t = 0.016 + rr() * 0.026, h = 0.19 + rr() * 0.085, sIdx = c * 3 + Math.floor(rr() * 3), dpt = 0.13, xx = HALF + 0.06 + (rr() * 0.02), shade = 0.75 + rr() * 0.4;
          const zc = z - t / 2, lean = (rr() < 0.04) ? (rr() - .5) * 0.25 : 0;
          eu.set(0, ry, lean, 'YXZ'); m4.makeRotationFromEuler(eu); m4.setPosition(sgn * xx, YB(l), zc);
          const u0 = (sIdx % SC) / SC, u1 = (sIdx % SC + 1) / SC, vt = 1 - Math.floor(sIdx / SC) / SR, vb = 1 - (Math.floor(sIdx / SC) + 1) / SR, hw = t / 2;
          quadTo(sg, [[-hw, 0, 0], [hw, 0, 0], [hw, h, 0], [-hw, h, 0]], [[u0, vb], [u1, vb], [u1, vt], [u0, vt]], shade, m4);
          quadTo(sg, [[-hw, h, 0], [hw, h, 0], [hw, h, -dpt], [-hw, h, -dpt]], [[u0, vt], [u1, vt], [u1, vt], [u0, vt]], shade * 0.5, m4);
          a.push({ id: c, z: zc, w: t, h, x: sgn * xx, kind: 0 }); z -= t + 0.002;
        } else {
          const w = 0.135 + rr() * 0.02, h = 0.19 + rr() * 0.03, d = 0.016, yaw = (rr() - 0.5) * 0.5 + sgn * 0.0, tilt = -0.16 - rr() * 0.05, xx = HALF + 0.11 + rr() * 0.04, shade = 0.85 + rr() * 0.3;
          const zc = z - w / 2 - 0.01; eu.set(tilt, ry + yaw, 0, 'YXZ'); m4.makeRotationFromEuler(eu); m4.setPosition(sgn * xx, YB(l), zc);
          const u0 = (c % CC) / CC, u1 = (c % CC + 1) / CC, vt = 1 - Math.floor(c / CC) / CR, vb = 1 - (Math.floor(c / CC) + 1) / CR, hw = w / 2, wu = (15 / 16 + 0.5 / 16), wv = (1 / 16) * 0.5;
          quadTo(cg, [[-hw, 0, d], [hw, 0, d], [hw, h, d], [-hw, h, d]], [[u0, vb], [u1, vb], [u1, vt], [u0, vt]], shade, m4);
          for (const pts of [[[-hw, h, d], [hw, h, d], [hw, h, -d], [-hw, h, -d]], [[hw, 0, d], [hw, 0, -d], [hw, h, -d], [hw, h, d]], [[-hw, 0, -d], [-hw, 0, d], [-hw, h, d], [-hw, h, -d]]]) quadTo(cg, pts, [[wu, wv], [wu, wv], [wu, wv], [wu, wv]], shade * 0.8, m4);
          a.push({ id: c, z: zc, w: w * Math.cos(yaw), h, x: sgn * xx, kind: 1 }); z -= w + 0.012;
        }
      }
      z -= rr() < 0.15 ? 0.05 + rr() * 0.2 : 0.004;
    }
  }
  const mk = (g, map) => { const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(g.P, 3)); geo.setAttribute('uv', new THREE.Float32BufferAttribute(g.U, 2)); geo.setAttribute('color', new THREE.Float32BufferAttribute(g.C, 3)); geo.setIndex(g.I); const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map, vertexColors: true, side: THREE.DoubleSide })); scene.add(m); };
  mk(cg, cover); mk(sg, spine);
}

// ================= picking =================
const ray = new THREE.Raycaster();
function pick(cx, cy) {
  ray.setFromCamera({ x: cx / innerWidth * 2 - 1, y: -(cy / innerHeight) * 2 + 1 }, camera);
  const o = ray.ray.origin, d = ray.ray.direction; if (Math.abs(d.x) < 1e-4) return null;
  const side = d.x > 0 ? 1 : 0, px = (side ? 1 : -1) * (HALF + 0.08), t = (px - o.x) / d.x; if (t <= 0 || t > 8) return null;
  const y = o.y + d.y * t, z = o.z + d.z * t, l = Math.floor((y - 0.22) / 0.42); if (l < 0 || l >= NL) return null;
  const a = arr[side][l]; let lo = 0, hi = a.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (a[m].z > z) lo = m + 1; else hi = m; }
  let best = null, bd = 1e9; for (let i = Math.max(0, lo - 3); i < Math.min(a.length, lo + 3); i++) { const it = a[i]; const dz = Math.abs(it.z - z) - it.w / 2; if (dz < bd && y - YB(l) > -0.02 && y - YB(l) < it.h + 0.02) { bd = dz; best = it; } }
  if (best && bd < 0.012) { best.side = side; best.l = l; best.y = YB(l) + best.h / 2; return best; } return null;
}
const hl = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.3), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthTest: false, fog: false }));
hl.visible = false; hl.renderOrder = 5; scene.add(hl);
const tagEl = document.getElementById('tag'); let hovered = null;
function setHover(it) {
  hovered = it;
  if (!it) { hl.visible = false; canvas.style.cursor = ''; tagEl.style.display = 'none'; return; }
  hl.visible = true; hl.scale.set(Math.max(it.w, 0.05) / 0.2 * 1.15, (it.h + 0.02) / 0.3, 1); hl.position.set(it.x + (it.side ? -0.05 : 0.05), it.y, it.z); hl.rotation.set(0, it.side ? -Math.PI / 2 : Math.PI / 2, 0); canvas.style.cursor = 'pointer';
}
const _v = new THREE.Vector3();
function placeTag() {
  if (!hovered) return; _v.set(hovered.x + (hovered.side ? -0.05 : 0.05), hovered.y + hovered.h / 2, hovered.z).project(camera);
  if (_v.z > 1) { tagEl.style.display = 'none'; return; } const I = info(hovered.id);
  tagEl.style.display = 'block'; tagEl.firstChild.textContent = I.title; tagEl.lastChild.textContent = `${I.director.toUpperCase()} · ${I.year}`; tagEl.style.left = (_v.x * 0.5 + 0.5) * innerWidth + 'px'; tagEl.style.top = (-_v.y * 0.5 + 0.5) * innerHeight + 'px';
}

// ================= input =================
let yaw = 0, pitch = 0; const pos = new THREE.Vector3(0, 1.55, LEN - 1.6);
const keys = {}, joy = { x: 0, y: 0 }; const vel = new THREE.Vector3(); let inspecting = false, bobT = 0;
addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && inspecting) { closeInspect(); return; }
  if (introActive) return;
  if (inspecting) { if (e.code === 'Space' || e.code === 'KeyF') { flip(); e.preventDefault(); } return; }
  keys[e.code] = true; if (e.code.startsWith('Arrow') || e.code === 'Space') e.preventDefault();
});
addEventListener('keyup', (e) => { keys[e.code] = false; }); addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
let look = null, hoverPt = null;
canvas.addEventListener('pointerdown', (e) => { if (inspecting || look) return; look = { id: e.pointerId, x: e.clientX, y: e.clientY, sx: e.clientX, sy: e.clientY, t: performance.now() }; canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', (e) => { if (look && e.pointerId === look.id) { const dx = e.clientX - look.x, dy = e.clientY - look.y; look.x = e.clientX; look.y = e.clientY; const k = e.pointerType === 'mouse' ? 0.0032 : 0.0042; yaw -= dx * k; pitch = Math.max(-1.2, Math.min(1.2, pitch - dy * k)); } else if (e.pointerType === 'mouse') hoverPt = [e.clientX, e.clientY]; });
function endLook(e) { if (!look || e.pointerId !== look.id) return; const tap = Math.hypot(e.clientX - look.sx, e.clientY - look.sy) < 10 && performance.now() - look.t < 450; look = null; if (tap && e.type === 'pointerup') { const it = pick(e.clientX, e.clientY); if (it) openInspect(it); } }
canvas.addEventListener('pointerup', endLook); canvas.addEventListener('pointercancel', endLook);
canvas.addEventListener('wheel', (e) => { if (!inspecting) { const f = -Math.sign(e.deltaY) * 0.35; pos.x += -Math.sin(yaw) * f; pos.z += -Math.cos(yaw) * f; } }, { passive: true });
canvas.addEventListener('contextmenu', (e) => e.preventDefault());
const joyEl = document.getElementById('joy'), knob = document.getElementById('knob'); let jid = null;
function joyMove(e) { const r = joyEl.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2; let dx = e.clientX - cx, dy = e.clientY - cy; const R = 48, m = Math.hypot(dx, dy); if (m > R) { dx *= R / m; dy *= R / m; } knob.style.transform = `translate(${dx}px,${dy}px)`; joy.x = dx / R; joy.y = dy / R; }
joyEl.addEventListener('pointerdown', (e) => { jid = e.pointerId; joyEl.setPointerCapture(jid); joyMove(e); e.preventDefault(); });
joyEl.addEventListener('pointermove', (e) => { if (e.pointerId === jid) joyMove(e); });
const joyEnd = (e) => { if (e.pointerId !== jid) return; jid = null; joy.x = joy.y = 0; knob.style.transform = ''; };
joyEl.addEventListener('pointerup', joyEnd); joyEl.addEventListener('pointercancel', joyEnd);

// ================= inspect =================
const icv = document.getElementById('inspect'), tapeEl = document.getElementById('tape');
let ir, iscene, icam, imesh, iMats = [], iState = null, glare;
function initInspect() {
  ir = new THREE.WebGLRenderer({ canvas: icv, alpha: true, antialias: true }); ir.setClearColor(0x000000, 0); iscene = new THREE.Scene(); icam = new THREE.PerspectiveCamera(32, 1, 0.1, 50); icam.position.set(0, 0, 7);
  glare = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, blending: THREE.AdditiveBlending, depthTest: false, depthWrite: false, transparent: true, opacity: 0 })); glare.renderOrder = 9; iscene.add(glare);
}
function texFrom(fn, w, h, id) { const c = document.createElement('canvas'); c.width = w; c.height = h; fn(c.getContext('2d'), w, h, id); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
function layoutInspect() {
  if (!ir || !iState) return; const w = innerWidth, h = innerHeight; ir.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); ir.setSize(w, h, false); icam.aspect = w / h; icam.updateProjectionMatrix();
  const visH = 2 * 7 * Math.tan(THREE.MathUtils.degToRad(16)), visW = visH * icam.aspect;
  if (w >= h) { iState.s = Math.min(visH * 0.74 / 3, visW * 0.34 / 2.1); iState.px = -visW * 0.2; iState.py = 0; } else { iState.s = Math.min(visH * 0.4 / 3, visW * 0.66 / 2.1); iState.px = 0; iState.py = visH * 0.2; }
}
function openInspect(it) {
  if (inspecting) return; if (!ir) initInspect();
  inspecting = true; for (const k in keys) keys[k] = false; look = null; setHover(null);
  const c = it.id, I = info(c);
  if (imesh) { iscene.remove(imesh); imesh.geometry.dispose(); iMats.forEach(m => { if (m.map) m.map.dispose(); m.dispose(); }); }
  const side = new THREE.MeshBasicMaterial({ color: 0xe6e6ec }); iMats = [side, side, side, side, new THREE.MeshBasicMaterial({ map: texFrom(drawCover, 640, 960, c) }), new THREE.MeshBasicMaterial({ map: texFrom(drawBack, 640, 960, c) })];
  imesh = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.34), iMats); iscene.add(imesh);
  iState = { yaw: -2.6, ty: 0, pitch: 0, tp: 0, t0: performance.now(), drag: null, s: 1, px: 0, py: 0, closing: 0 }; layoutInspect();
  { camera.updateMatrixWorld(); const wp = new THREE.Vector3(it.x, it.y !== undefined ? it.y : YB(it.l) + it.h / 2, it.z), dist = Math.max(0.4, wp.distanceTo(camera.position)); const nd = wp.clone().project(camera); const vH = 2 * 7 * Math.tan(THREE.MathUtils.degToRad(16)), vW = vH * icam.aspect; iState.sx = THREE.MathUtils.clamp(nd.x, -1.2, 1.2) * vW / 2; iState.sy = THREE.MathUtils.clamp(nd.y, -1.2, 1.2) * vH / 2; iState.s0 = Math.max(0.05, (it.h / (2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))) * vH / 3); iState.spin = -3.4 - Math.random() * 0.8; }
  tapeEl.querySelector('.code').textContent = `TAPE INFO · ${I.code}`; tapeEl.querySelector('h2').textContent = I.title; tapeEl.querySelector('.rent').textContent = `LAST RENTED ${I.rented}`;
  tapeEl.querySelector('dl').innerHTML = [['YEAR', `${I.year} · ${I.run}`], ['GENRE', I.genre.replace('NEW RELEASES', 'NEW').replace('STAFF FAVORITES', 'STAFF PICK')], ['DIR.', I.director.toUpperCase()], ['CAST', I.cast.join(', ').toUpperCase()]].map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
  tapeEl.classList.add('on'); icv.classList.add('on'); canvas.classList.add('dim'); document.getElementById('hint').style.opacity = 0; requestAnimationFrame(iLoop);
}
function closeInspect() { if (!inspecting || iState.closing) return; iState.closing = performance.now(); tapeEl.classList.remove('on'); canvas.classList.remove('dim'); setTimeout(() => { inspecting = false; icv.classList.remove('on'); }, 520); }
function flip() { if (iState) iState.ty += Math.PI; }
document.getElementById('b-close').addEventListener('click', closeInspect); document.getElementById('b-flip').addEventListener('click', flip);
icv.addEventListener('pointerdown', (e) => { if (!iState) return; iState.drag = { x: e.clientX, y: e.clientY, id: e.pointerId, moved: 0 }; icv.setPointerCapture(e.pointerId); icv.style.cursor = 'grabbing'; });
icv.addEventListener('pointermove', (e) => { const d = iState && iState.drag; if (!d || d.id !== e.pointerId) return; const dx = e.clientX - d.x, dy = e.clientY - d.y; d.x = e.clientX; d.y = e.clientY; d.moved += Math.abs(dx) + Math.abs(dy); iState.yaw += dx * 0.012; iState.ty = iState.yaw; iState.tp = Math.max(-0.7, Math.min(0.7, iState.tp + dy * 0.006)); });
const iUp = (e) => { const d = iState && iState.drag; if (!d || d.id !== e.pointerId) return; iState.drag = null; icv.style.cursor = ''; iState.ty = Math.round(iState.ty / Math.PI) * Math.PI; iState.tp = 0; if (d.moved < 6 && e.type === 'pointerup') flip(); };
icv.addEventListener('pointerup', iUp); icv.addEventListener('pointercancel', iUp);
const LDIR = new THREE.Vector3(-0.35, 0.45, 0.82).normalize(), _n = new THREE.Vector3();
function iLoop(now) {
  if (!inspecting) { ir.clear(); return; }
  const cl = iState.closing, k = cl ? 1 - Math.min(1, (now - cl) / 500) : Math.min(1, (now - iState.t0) / 950), e = 1 - Math.pow(1 - k, 3), lift = Math.sin(Math.min(1, k) * Math.PI);
  iState.yaw += (iState.ty - iState.yaw) * 0.12; iState.pitch += (iState.tp - iState.pitch) * 0.12;
  const spinOff = (1 - e) * iState.spin;
  imesh.rotation.set(iState.pitch + Math.sin(now / 1200) * 0.02 + (1 - e) * 0.5, iState.yaw + spinOff, Math.sin(now / 1700) * 0.015 + (1 - e) * 0.35); const s = iState.s0 + (iState.s - iState.s0) * e + lift * iState.s * 0.12; imesh.scale.setScalar(s);
  imesh.position.set(iState.sx + (iState.px - iState.sx) * e, iState.sy + (iState.py - iState.sy) * e, lift * 1.6);
  imesh.updateMatrixWorld(); _n.set(0, 0, 1).applyQuaternion(imesh.quaternion); const dF = Math.abs(_n.dot(LDIR)); const g = Math.max(0, 1 - Math.abs(dF - 0.55) * 2.6);
  glare.material.opacity = Math.min(1, g * 0.95 + lift * 0.45);
  glare.position.set(imesh.position.x - 0.5 * s * _n.x * 1.2 - 0.25 * s, imesh.position.y + 0.55 * s + 0.4 * s * _n.y, 0.7); glare.scale.setScalar(s * (2.2 + 1.8 * g));
  ir.render(iscene, icam); requestAnimationFrame(iLoop);
}

// ================= HUD / loop =================
const zoneEl = document.getElementById('nav'), spEl = document.getElementById('sp'), hintEl = document.getElementById('hint');
function resize() { const w = innerWidth, h = innerHeight; renderer.setPixelRatio(pr); renderer.setSize(w, h, false); camera.aspect = w / h; camera.fov = w / h < 1 ? 90 : 75; camera.updateProjectionMatrix(); layoutInspect(); }
addEventListener('resize', resize);
let last = performance.now(), acc = 0, nfr = 0, hoverT = 0, lastZone = '', t0 = performance.now(), lastSp = '';
let introActive = false;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(0.05, (now - last) / 1000); last = now; acc += dt; nfr++;
  if (nfr === 90) { const avg = acc / nfr; if (avg > 0.028 && pr > 1.05) { pr = Math.max(1, pr - 0.25); resize(); } acc = 0; nfr = 0; }
  const sec = Math.floor((now - t0) / 1000), sp = `SP ${Math.floor(sec / 3600)}:${String(Math.floor(sec / 60) % 60).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`; if (sp !== lastSp) { spEl.textContent = sp; lastSp = sp; }
  if (introActive) { camera.position.set(pos.x, pos.y, pos.z); camera.rotation.set(pitch, yaw, 0); renderer.render(scene, camera); return; }
  if (inspecting) { if (!iState || !iState.fl) { camera.position.set(pos.x, pos.y, pos.z); camera.rotation.set(pitch, yaw, 0); renderer.render(scene, camera); } return; }
  let fx = 0, fz = 0; if (keys.KeyW || keys.ArrowUp) fz += 1; if (keys.KeyS || keys.ArrowDown) fz -= 1; if (keys.KeyD) fx += 1; if (keys.KeyA) fx -= 1; if (keys.ArrowLeft) yaw += 1.8 * dt; if (keys.ArrowRight) yaw -= 1.8 * dt;
  fx += joy.x; fz -= joy.y; const mag = Math.hypot(fx, fz); if (mag > 1) { fx /= mag; fz /= mag; }
  const sp2 = 1.9 * (keys.ShiftLeft || keys.ShiftRight ? 1.9 : 1), tx = (Math.cos(yaw) * fx - Math.sin(yaw) * fz) * sp2, tz = (-Math.sin(yaw) * fx - Math.cos(yaw) * fz) * sp2;
  vel.x += (tx - vel.x) * Math.min(1, dt * 9); vel.z += (tz - vel.z) * Math.min(1, dt * 9);
  pos.x = Math.max(-0.85, Math.min(0.85, pos.x + vel.x * dt)); pos.z = Math.max(-LEN + 0.8, Math.min(LEN - 0.8, pos.z + vel.z * dt));
  const spd = Math.hypot(vel.x, vel.z); bobT += dt * spd * 3.4;
  camera.position.set(pos.x, pos.y + Math.sin(bobT) * 0.013 * Math.min(1, spd), pos.z); camera.rotation.set(pitch, yaw, 0);
  hoverT += dt; if (hoverT > 0.05 && !isTouch) { hoverT = 0; setHover(hoverPt && !look ? pick(hoverPt[0], hoverPt[1]) : null); }
  const zi = Math.max(0, Math.min(NZ - 1, Math.floor((LEN - pos.z) / ZLEN))), nm = ZN[0][zi] + '|' + ZN[1][zi];
  if (nm !== lastZone) { zoneEl.innerHTML = `◄ ${ZN[0][zi]} &nbsp; ${ZN[1][zi]} ►`; lastZone = nm; }
  renderer.render(scene, camera); placeTag();
}

// ================= start =================
function loadArt() { return new Promise((res) => { const im = new Image(); im.onload = () => { ART = im; res(); }; im.onerror = () => res(); im.src = './2-posters.jpg'; setTimeout(res, 15000); }); }
async function start() {
  resize(); hintEl.textContent = isTouch ? 'LEFT STICK: WALK  ·  DRAG: LOOK  ·  TAP A TAPE' : 'W A S D: WALK  ·  DRAG MOUSE: LOOK  ·  CLICK A TAPE  ·  SHIFT: RUN';
  setTimeout(() => { hintEl.style.opacity = 0; }, 9000);
  await loadArt(); await new Promise(r => setTimeout(r, 20));
  buildWorld(); buildItems();
  if (params.has('x')) pos.x = +params.get('x'); if (params.has('z')) pos.z = +params.get('z'); if (params.has('yaw')) yaw = +params.get('yaw'); if (params.has('pitch')) pitch = +params.get('pitch');
  renderer.compile(scene, camera); t0 = performance.now(); requestAnimationFrame(frame);
  await runIntro();
  document.getElementById('load').classList.add('off');
  if (params.has('open')) setTimeout(() => { const [s, l, z] = params.get('open').split(',').map(Number); const a = arr[s][l]; const it = a[Math.min(a.length - 1, z)]; it.side = s; it.l = l; it.y = YB(l) + it.h / 2; openInspect(it); if (params.has('flip')) iState.ty = iState.yaw = Math.PI; if (params.has('tilt')) { iState.yaw = +params.get('tilt'); iState.ty = iState.yaw; iState.t0 = -1e9; } }, 1500);
}
// ================= intro: real footage, then hand off to the live aisle =================
function runIntro() {
  return new Promise((resolve) => {
    const v = document.getElementById('intro'), body = document.body;
    if (params.has('skip') || params.has('open') || !v) { if (v) v.remove(); resolve(); return; }
    introActive = true; body.classList.add('intro');
    let done = false;
    const finish = () => {
      if (done) return; done = true; introActive = false;
      t0 = performance.now() - 17000; // the footage ends around SP 0:00:17, the live counter continues from there
      body.classList.remove('intro'); v.classList.add('out');
      setTimeout(() => v.remove(), 900); resolve();
    };
    v.addEventListener('ended', finish); v.addEventListener('error', finish);
    v.addEventListener('timeupdate', () => { if (v.duration && v.currentTime > v.duration - 0.05) finish(); });
    document.getElementById('load').classList.add('off');
    const go = () => { const p = v.play(); if (p && p.catch) p.catch(() => { finish(); }); };
    if (v.readyState >= 3) go(); else { v.addEventListener('canplay', go, { once: true }); v.load(); setTimeout(() => { if (v.readyState < 2) finish(); }, 12000); }
    v.addEventListener('click', finish); document.getElementById('skip').addEventListener('click', finish);
  });
}
start();
