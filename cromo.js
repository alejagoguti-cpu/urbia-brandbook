// urbia · motor de cromo del brand book
// Mismo lenguaje que el logo del inicio de urbia-javeriana: metal iridiscente con clearcoat,
// iluminado por paneles de luz de marca (marfil, lima, lavanda, coral).
// - Portada: logo urbia extruido en 3D girando con anillo cromado.
// - Íconos, doodles y símbolos: cada trazo SVG se convierte en tubos de metal con uniones redondas.
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const LOGO = 'M120.41 215.87L120.41 215.87Q109.31 215.87 102.10 212.17Q94.88 208.47 90.63 202.73Q86.37 197.00 84.34 190.52Q82.30 184.05 81.70 178.27Q81.10 172.49 81.10 168.88L81.10 168.88L81.10 113.10L103.67 113.10L103.67 161.20Q103.67 165.82 104.32 171.61Q104.97 177.39 107.32 182.71Q109.68 188.03 114.35 191.45Q119.03 194.87 126.98 194.87L126.98 194.87Q131.24 194.87 135.40 193.48Q139.56 192.09 142.94 188.72Q146.31 185.34 148.35 179.42Q150.38 173.50 150.38 164.44L150.38 164.44L150.38 113.10L172.77 113.10L172.77 213L153.06 213L153.06 201.90Q149.27 206.43 144.09 209.67L144.09 209.67Q134.47 215.87 120.41 215.87ZM209.05 213L186.67 213L186.67 113.10L206.37 113.10L206.37 129.10Q207.48 127.07 208.96 125.13L208.96 125.13Q212.01 121.06 216.36 118.37L216.36 118.37Q220.06 115.88 224.55 114.44Q229.03 113.01 233.75 112.68Q238.47 112.36 242.91 113.10L242.91 113.10L242.91 133.91Q238.47 132.62 232.69 133.08Q226.91 133.54 222.28 136.32L222.28 136.32Q217.66 138.81 214.74 142.70Q211.83 146.58 210.44 151.53Q209.05 156.48 209.05 162.22L209.05 162.22L209.05 213ZM296.49 215.78L296.49 215.78Q281.88 215.78 271.98 208.84L271.98 208.84Q269.85 207.36 268 205.69L268 205.69L268 213L248.30 213L248.30 79.80L270.77 79.80L270.77 117.91Q271.24 117.54 271.79 117.17L271.79 117.17Q281.41 110.33 295.66 110.33L295.66 110.33Q309.81 110.33 320.22 117.22Q330.62 124.11 336.36 135.99Q342.09 147.88 342.09 163.05L342.09 163.05Q342.09 178.03 336.45 189.97Q330.81 201.90 320.54 208.84Q310.27 215.78 296.49 215.78ZM293.07 195.80L293.07 195.80Q301.76 195.80 307.40 191.45Q313.05 187.10 315.78 179.65Q318.50 172.21 318.50 163.05L318.50 163.05Q318.50 153.99 315.73 146.54Q312.95 139.09 307.13 134.70Q301.30 130.31 292.33 130.31L292.33 130.31Q283.82 130.31 278.45 134.42Q273.09 138.54 270.54 145.89Q268 153.25 268 163.05L268 163.05Q268 172.76 270.54 180.16Q273.09 187.56 278.59 191.68Q284.10 195.80 293.07 195.80ZM374.59 97.93L352.29 97.93L352.29 77.49L374.59 77.49L374.59 97.93ZM374.59 213L352.29 213L352.29 113.10L374.59 113.10L374.59 213ZM418.27 215.78L418.27 215.78Q407.45 215.78 399.95 211.66Q392.46 207.54 388.62 200.70Q384.78 193.85 384.78 185.62L384.78 185.62Q384.78 178.41 387.19 172.62Q389.59 166.84 394.59 162.63Q399.58 158.43 407.54 155.74L407.54 155.74Q413.55 153.80 421.65 152.23Q429.74 150.66 439.27 149.27L439.27 149.27Q444.91 148.53 451.01 147.60L451.01 147.60Q450.37 139.74 446.48 135.67L446.48 135.67Q441.76 130.77 430.57 130.77L430.57 130.77Q423.82 130.77 417.53 133.91Q411.24 137.06 408.74 144.74L408.74 144.74L388.39 138.35Q392.09 125.68 402.50 118.00Q412.90 110.33 430.57 110.33L430.57 110.33Q443.89 110.33 454.02 114.67Q464.15 119.02 469.05 128.92L469.05 128.92Q471.74 134.19 472.29 139.69Q472.84 145.20 472.84 151.67L472.84 151.67L472.84 213L453.33 213L453.33 199.59Q447.69 206.90 440.84 210.69L440.84 210.69Q431.77 215.78 418.27 215.78ZM422.71 198.01L422.71 198.01Q430.29 198.01 435.66 195.33Q441.02 192.65 444.22 188.76Q447.41 184.88 448.52 181.46L448.52 181.46Q450.27 177.20 450.55 171.65L450.55 171.65Q450.64 168.41 450.74 165.92L450.74 165.92Q444.91 166.84 440.28 167.58L440.28 167.58Q433.07 168.78 427.89 169.85Q422.71 170.91 418.73 172.21L418.73 172.21Q414.85 173.59 412.16 175.44Q409.48 177.30 408.05 179.70Q406.62 182.10 406.62 185.34L406.62 185.34Q406.62 189.04 408.46 191.86Q410.31 194.69 413.88 196.35Q417.44 198.01 422.71 198.01Z';
const ESQ = { x: 476, y: 82, w: 57, h: 57, trazo: 17 };
const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;

function entorno(r) {
  const s = new THREE.Scene();
  s.background = new THREE.Color('#08090C');
  const panel = (c, k, pos, rot, esc) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: new THREE.Color(c).multiplyScalar(k), side: THREE.DoubleSide }));
    m.position.set(...pos); m.rotation.set(...rot); m.scale.set(esc[0], esc[1], 1); s.add(m);
  };
  panel('#F5F3EB', 6, [0, 6, -9], [0, 0, 0], [12, 2]);
  panel('#F5F3EB', 3, [0, 9, 0], [Math.PI / 2, 0, 0], [10, 10]);
  panel('#A99BCB', 2.4, [-8, 1, 3], [0, Math.PI / 2, 0], [10, 3]);
  panel('#C7FF27', 1.8, [8, -2, 2], [0, -Math.PI / 2, 0], [8, 1.5]);
  panel('#F5F3EB', 2.6, [0, 0, 10], [0, Math.PI, 0], [20, 1]);
  panel('#E36C4B', 1.2, [0, -6, 6], [Math.PI / 2, 0, 0], [5, 5]);
  const pm = new THREE.PMREMGenerator(r);
  const t = pm.fromScene(s, 0.02).texture; pm.dispose(); return t;
}
function cromo(color = '#e2e4ea') {
  return new THREE.MeshPhysicalMaterial({ color, metalness: 1, roughness: 0.12, iridescence: 0.55, iridescenceIOR: 1.4, iridescenceThicknessRange: [180, 520], clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 2 });
}
function cromoLima() { const m = cromo('#C7FF27'); m.metalness = 0.75; m.emissive = new THREE.Color('#C7FF27'); m.emissiveIntensity = 0.25; return m; }

/* ---------------------------------------------------------------- logo 3D */
function portada() {
  const hero = document.querySelector('.hero'); if (!hero) return;
  const cv = document.createElement('canvas'); cv.className = 'logo3d'; cv.setAttribute('aria-hidden', 'true');
  hero.appendChild(cv);
  const r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
  r.setPixelRatio(Math.min(2, devicePixelRatio)); r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.15;
  const esc = new THREE.Scene(); esc.environment = entorno(r);
  const luz = new THREE.DirectionalLight('#F5F3EB', 1.4); luz.position.set(60, 120, 40); esc.add(luz);
  const cam = new THREE.PerspectiveCamera(36, 1, 0.5, 500); cam.position.set(0, 2, 44);
  const opt = { depth: 34, bevelEnabled: true, bevelThickness: 3, bevelSize: 2.2, bevelSegments: 4, curveSegments: 10 };
  const shapes = []; new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${LOGO}"/></svg>`).paths.forEach((p) => shapes.push(...SVGLoader.createShapes(p)));
  const texto = new THREE.ExtrudeGeometry(shapes, opt);
  const { x, y, w, h, trazo } = ESQ, t = trazo / 2, s = new THREE.Shape();
  s.moveTo(x, y - t); s.lineTo(x + w + t, y - t); s.lineTo(x + w + t, y + h); s.lineTo(x + w - t, y + h); s.lineTo(x + w - t, y + t); s.lineTo(x, y + t); s.closePath();
  const esquina = new THREE.ExtrudeGeometry(s, opt);
  const caja = new THREE.Box3().setFromBufferAttribute(mergeGeometries([texto.clone().toNonIndexed(), esquina.clone().toNonIndexed()].map((g) => { g.deleteAttribute('uv'); return g; })).attributes.position);
  const c = new THREE.Vector3(); caja.getCenter(c);
  const g = new THREE.Group();
  const mat = cromo('#d8dbe4');
  for (const [geo, m] of [[texto, mat], [esquina, cromoLima()]]) {
    geo.translate(-c.x, -c.y, -c.z);
    const mesh = new THREE.Mesh(geo, m); mesh.rotation.x = Math.PI; // SVG: y hacia abajo (rotar conserva las normales)
    g.add(mesh);
  }
  g.scale.setScalar(0.05); esc.add(g);
  const anillo = new THREE.Mesh(new THREE.TorusGeometry(17, 0.22, 24, 240), mat); anillo.position.z = -4; esc.add(anillo);
  const pts = []; for (let i = 0; i <= 60; i++) { const a = (i / 60) * Math.PI * 2; pts.push(new THREE.Vector3(Math.sin(a) * 19, Math.sin(2 * a) * 9 - 13, Math.cos(a) * 7 - 4)); }
  esc.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), 240, 0.1, 10, true), new THREE.MeshPhysicalMaterial({ color: '#C9C0E4', metalness: 0.2, roughness: 0.05, transmission: 0.6, thickness: 1, iridescence: 1, transparent: true, opacity: 0.85 })));
  let mx = 0, my = 0, vis = true;
  addEventListener('pointermove', (e) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; });
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; }).observe(hero);
  const tam = () => { const b = cv.getBoundingClientRect(); r.setSize(b.width, b.height, false); cam.aspect = b.width / b.height; cam.updateProjectionMatrix(); };
  addEventListener('resize', tam); tam();
  const reloj = new THREE.Clock(); let ap = 0;
  r.setAnimationLoop(() => {
    if (!vis) return;
    const dt = Math.min(0.05, reloj.getDelta()), T = reloj.elapsedTime;
    ap = Math.min(1, ap + dt * 0.5); const a = 1 - Math.pow(1 - ap, 3);
    g.rotation.y += dt * (reducido ? 0.08 : 0.45);
    g.rotation.x += (-my * 0.35 - g.rotation.x) * 0.06;
    g.position.y = Math.sin(T * 0.8) * 0.6 + (1 - a) * -6;
    g.scale.setScalar(0.05 * (0.55 + 0.45 * a));
    anillo.rotation.z += dt * 0.15; anillo.rotation.x = Math.PI / 2 + Math.sin(T * 0.3) * 0.25 + my * 0.2; anillo.rotation.y = mx * 0.3;
    anillo.scale.setScalar(a);
    cam.position.x += (mx * 6 - cam.position.x) * 0.04; cam.lookAt(0, 0, 0);
    r.render(esc, cam);
  });
}

/* ---------------------------------------------------------- íconos cromados */
const RES = 384;
let M = null;
function motor() {
  if (M) return M;
  const c = document.createElement('canvas'); c.width = c.height = RES;
  const r = new THREE.WebGLRenderer({ canvas: c, alpha: true, antialias: true, preserveDrawingBuffer: true });
  r.setPixelRatio(1); r.setSize(RES, RES, false); r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.35;
  const esc = new THREE.Scene(); esc.environment = entorno(r);
  const luz = new THREE.DirectionalLight('#F5F3EB', 1.2); luz.position.set(3, 5, 6); esc.add(luz);
  const cam = new THREE.PerspectiveCamera(28, 1, 0.1, 100); cam.position.set(0, 0, 4.1);
  const malla = new THREE.Mesh(new THREE.BufferGeometry(), cromo()); esc.add(malla);
  M = { r, esc, cam, malla, plata: malla.material, lima: cromoLima() };
  return M;
}

const cacheGeo = new Map();
/** svg (marcado) → tubos de metal. vb = tamaño del viewBox; grosor = trazo original */
function geometria(svg, clave) {
  if (cacheGeo.has(clave)) return cacheGeo.get(clave);
  const vb = (svg.match(/viewBox="[\d.\s-]+?([\d.]+)"/) || [0, 24])[1] * 1;
  const sw = parseFloat((svg.match(/stroke-width="([\d.]+)"/) || [0, vb / 12])[1]);
  const k = 1.66 / vb, R = Math.max(sw * 1.05, vb * 0.068) * k;
  const data = new SVGLoader().parse(svg);
  const partes = [];
  const v3 = (p) => new THREE.Vector3((p.x - vb / 2) * k, -(p.y - vb / 2) * k, 0);
  data.paths.forEach((path) => path.subPaths.forEach((sp) => {
    const pts = sp.getPoints(12).map(v3), lim = [];
    pts.forEach((p) => { if (!lim.length || lim[lim.length - 1].distanceTo(p) > 1e-4) lim.push(p); });
    if (sp.autoClose && lim.length > 2 && lim[0].distanceTo(lim[lim.length - 1]) > 1e-4) lim.push(lim[0].clone());
    if (lim.length < 2) { if (lim.length === 1) { const e = new THREE.SphereGeometry(R * 1.2, 16, 12); e.translate(lim[0].x, lim[0].y, 0); partes.push(e); } return; }
    const cp = new THREE.CurvePath();
    for (let i = 0; i < lim.length - 1; i++) cp.add(new THREE.LineCurve3(lim[i], lim[i + 1]));
    partes.push(new THREE.TubeGeometry(cp, Math.max(8, (lim.length - 1) * 5), R, 12, false));
    lim.forEach((p) => { const e = new THREE.SphereGeometry(R, 14, 10); e.translate(p.x, p.y, 0); partes.push(e); });
  }));
  const g = partes.length ? mergeGeometries(partes.map((p) => { const q = p.index ? p.toNonIndexed() : p; q.deleteAttribute('uv'); return q; })) : new THREE.BufferGeometry();
  g.computeVertexNormals(); cacheGeo.set(clave, g);
  return g;
}

const items = new Set();
function pintar(it, T) {
  const m = motor();
  m.malla.geometry = it.geo; m.malla.material = it.lima ? m.lima : m.plata;
  const osc = reducido ? 0.35 : Math.sin(T * 1.1 + it.fase) * 0.42;
  m.malla.rotation.set(-0.28 + (reducido ? 0 : Math.cos(T * 0.9 + it.fase) * 0.12), osc + it.giro, 0);
  m.malla.scale.setScalar(it.hover ? 1.08 : 1);
  m.r.render(m.esc, m.cam);
  it.ctx.clearRect(0, 0, it.cv.width, it.cv.height);
  it.ctx.drawImage(m.r.domElement, 0, 0, it.cv.width, it.cv.height);
}
const io = new IntersectionObserver((es) => es.forEach((e) => { const it = e.target.__cromo; if (it) it.vis = e.isIntersecting; }), { rootMargin: '80px' });

/** reemplaza un <svg> por su versión cromada (el svg queda oculto para las descargas SVG) */
function cromar(svgEl, { lima = false, clave, tam } = {}) {
  if (!svgEl || svgEl.__cromado) return;
  svgEl.__cromado = true;
  const marcado = svgEl.outerHTML.replace(/currentColor/g, '#000');
  const cv = document.createElement('canvas'); cv.className = 'cromo'; cv.setAttribute('aria-hidden', 'true');
  const b = svgEl.getBoundingClientRect();
  const lado = tam || Math.max(b.width, b.height) || 48;
  cv.style.width = cv.style.height = lado + 'px';
  cv.width = cv.height = Math.round(lado * Math.min(2, devicePixelRatio || 1));
  svgEl.style.display = 'none';
  svgEl.after(cv);
  const it = { cv, ctx: cv.getContext('2d'), geo: geometria(marcado, clave || marcado), lima, fase: Math.random() * 6, giro: 0, hover: false, vis: true };
  cv.__cromo = it; items.add(it); io.observe(cv);
  const host = cv.closest('[data-urbia-icon], .tile, .logo-stage, div') || cv;
  host.addEventListener('pointerenter', () => { it.hover = true; });
  host.addEventListener('pointerleave', () => { it.hover = false; });
  pintar(it, performance.now() / 1000);
  return it;
}

let ult = 0;
function bucle(t) {
  requestAnimationFrame(bucle);
  if (t - ult < 40 || document.hidden) return;
  const dt = Math.min(0.1, (t - ult) / 1000); ult = t;
  items.forEach((it) => {
    if (!it.cv.isConnected) { items.delete(it); io.unobserve(it.cv); return; }
    if (!it.vis) return;
    if (it.hover) it.giro += dt * 7;
    else if (it.giro) { const r = it.giro % (Math.PI * 2); it.giro = r > 0.05 && r < Math.PI * 2 - 0.05 ? it.giro + dt * 6 : 0; }
    pintar(it, t / 1000);
  });
}

/** PNG cromado en alta: 1024 px con fondo transparente */
function pngCromado(svg, nombre, lima) {
  const m = motor();
  const geo = geometria(svg, svg);
  const big = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
  big.setSize(1024, 1024, false); big.toneMapping = THREE.ACESFilmicToneMapping; big.toneMappingExposure = 1.35;
  const esc = new THREE.Scene(); esc.environment = entorno(big);
  const luz = new THREE.DirectionalLight('#F5F3EB', 1.2); luz.position.set(3, 5, 6); esc.add(luz);
  const mesh = new THREE.Mesh(geo, lima ? m.lima : m.plata); mesh.rotation.set(-0.22, 0.35, 0); esc.add(mesh);
  big.render(esc, m.cam);
  big.domElement.toBlob((b) => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nombre + '.png'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); big.dispose(); }, 'image/png');
}

function iniciar() {
  try { portada(); } catch (e) { console.warn('logo 3D', e); }
  const limaSel = () => document.getElementById('urbia-color')?.value === '#C7FF27';
  const procesarIconos = () => document.querySelectorAll('#urbia-icons [data-urbia-icon]').forEach((d) => {
    const svg = d.querySelector('svg'); if (!svg) return;
    cromar(svg, { lima: limaSel(), clave: d.dataset.urbiaIcon + (limaSel() ? ':l' : ''), tam: 78 });
    const png = d.querySelector('.png-btn');
    if (png && !png.__cromo) { png.__cromo = true; png.textContent = 'PNG 3D'; png.onclick = () => { const s = window.getIconSVG ? getIconSVG(d.dataset.urbiaIcon) : svg.outerHTML; pngCromado(s, 'urbia-cromo-' + d.dataset.urbiaIcon, limaSel()); }; }
  });
  const grid = document.getElementById('urbia-icons');
  if (grid) { new MutationObserver(() => requestAnimationFrame(procesarIconos)).observe(grid, { childList: true, subtree: true }); procesarIconos(); }
  document.querySelectorAll('#urbia-doodles > div').forEach((d, i) => {
    const svg = d.querySelector('svg'); const s = svg && svg.outerHTML;
    cromar(svg, { clave: 'doodle' + i, tam: 190 });
    const png = d.querySelector('.png-btn'); if (png && s) { png.textContent = 'PNG 3D'; png.onclick = () => pngCromado(s, 'urbia-doodle-cromo-' + i); }
  });
  document.querySelectorAll('svg[data-cromo]').forEach((svg, i) => cromar(svg, { lima: svg.dataset.cromo === 'lima', clave: 'demo' + i, tam: +svg.getAttribute('width') || 90 }));
  document.querySelectorAll('#simbolo svg').forEach((svg, i) => cromar(svg, { lima: i > 0, clave: 'simbolo' + i, tam: i ? 120 : 260 }));
  requestAnimationFrame(bucle);
}
if (document.readyState === 'complete') iniciar(); else addEventListener('load', iniciar);
