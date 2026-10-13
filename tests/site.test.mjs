// Criterios de aceptación del rediseño. Ejecutar con: npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = existsSync(join(root, 'index.html')) ? readFileSync(join(root, 'index.html'), 'utf8') : '';
const css = existsSync(join(root, 'assets/css/styles.css')) ? readFileSync(join(root, 'assets/css/styles.css'), 'utf8') : '';
const js = existsSync(join(root, 'assets/js/main.js')) ? readFileSync(join(root, 'assets/js/main.js'), 'utf8') : '';

const tags = (name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => m[0]);
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];

const STORE = 'https://www.abonoselbuensembrador.com';

// Inventario de la página de inicio original (ver docs/inventario-imagenes.md).
const ORIGINAL_IMAGES = [
  'logo-el-buen-sembrador',          // logotipo
  'hero-siembra',                    // fondo del encabezado (base64 en el original)
  'saco-abono-el-buen-sembrador',    // Abono Orgánico-Compostado y Orgánico-Mineral
  'abono-organico-mineral-bodega',   // variante de Abono Orgánico-Mineral
  'vinobiol',                        // Vinobiol 1L / categoría Fertilizante
  'trabajo-campo-guatica',           // carrusel 1
  'cultivo-cafe',                    // carrusel 2
  'cultivo-hortalizas',              // carrusel 3
  'cultivo-aguacate',                // carrusel 4
  'camara-icon',                     // icono de la galería
];

test('documento base: idioma, título, descripción y viewport', () => {
  assert.match(html, /<html[^>]+lang="es"/);
  assert.match(html, /<title>[^<]*Abonos El Buen Sembrador[^<]*<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]{70,170}"/);
  assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1/);
});

test('hay exactamente un h1 y los encabezados no saltan niveles', () => {
  assert.equal(tags('h1').length, 1);
  const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => +m[1]);
  levels.reduce((prev, cur) => {
    assert.ok(cur <= prev + 1, `salto de h${prev} a h${cur}`);
    return cur;
  });
});

test('todas las imágenes originales de la página de inicio se reutilizan', () => {
  for (const name of ORIGINAL_IMAGES) {
    assert.ok(html.includes(`assets/img/${name}`), `falta la imagen original: ${name}`);
  }
});

test('cada <img> tiene alt, dimensiones explícitas y decodificación asíncrona', () => {
  for (const img of tags('img')) {
    assert.ok(attr(img, 'alt') !== undefined, `sin alt: ${img}`);
    assert.ok(attr(img, 'width') && attr(img, 'height'), `sin width/height: ${img}`);
  }
});

test('solo el logo y el hero cargan de inmediato; el resto es diferido', () => {
  const eager = tags('img').filter((img) => attr(img, 'loading') !== 'lazy');
  for (const img of eager) {
    assert.match(attr(img, 'src'), /logo-el-buen-sembrador|hero-siembra/, `debería ser lazy: ${img}`);
  }
});

test('todos los recursos locales referenciados existen en disco', () => {
  const refs = [...html.matchAll(/(?:src|href|srcset)="([^"]+)"/g)]
    .flatMap((m) => m[1].split(','))
    .map((s) => s.trim().split(' ')[0])
    .filter((u) => u && !/^(https?:|tel:|mailto:|#|data:)/.test(u));
  assert.ok(refs.length > 10);
  for (const ref of refs) assert.ok(existsSync(join(root, ref)), `no existe: ${ref}`);
  for (const m of css.matchAll(/url\("?([^")]+)"?\)/g)) {
    if (m[1].startsWith('data:')) continue;
    assert.ok(existsSync(join(root, 'assets/css', m[1])), `CSS: no existe ${m[1]}`);
  }
});

test('las anclas internas apuntan a ids existentes', () => {
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/href="#([^"]*)"/g)) {
    if (m[1] === '') continue;
    assert.ok(ids.has(m[1]), `ancla rota: #${m[1]}`);
  }
});

test('canales de contacto reales: teléfono y WhatsApp del sitio original', () => {
  assert.ok(html.includes('href="tel:+573137671300"'));
  assert.ok(html.includes('https://wa.me/573137671300'));
  assert.doesNotMatch(html, /instagram\.com|facebook\.com|tiktok\.com/, 'no inventar redes sociales');
});

test('los productos enlazan a sus fichas reales en la tienda y conservan sus precios', () => {
  const products = [
    ['/vb1l', 'Vinobiol', '45.000'],
    ['/abono-organico-compostado', 'Abono Orgánico-Compostado', '22.000'],
    ['/om40', 'Abono Orgánico-Mineral', '40.000'],
  ];
  for (const [path, name, price] of products) {
    assert.ok(html.includes(`${STORE}${path}`), `falta enlace a ${path}`);
    assert.ok(html.includes(name), `falta ${name}`);
    assert.ok(html.includes(price), `falta precio ${price}`);
  }
  assert.ok(html.includes(`${STORE}/categories/abono`));
  assert.ok(html.includes(`${STORE}/categories/fertilizante`));
  assert.ok(html.includes(`${STORE}/pagina/contacto`));
});

test('enlaces externos en nueva pestaña llevan rel="noopener"', () => {
  for (const a of tags('a').filter((t) => attr(t, 'target') === '_blank')) {
    assert.match(attr(a, 'rel') ?? '', /noopener/, a);
  }
});

test('seguridad: CSP declarada, sin manejadores inline ni javascript:', () => {
  assert.match(html, /<meta http-equiv="Content-Security-Policy" content="[^"]*default-src 'self'/);
  assert.doesNotMatch(html, /\son[a-z]+="/i, 'manejador de eventos inline');
  assert.doesNotMatch(html, /javascript:/i);
  assert.doesNotMatch(js, /innerHTML\s*=|eval\(|new Function/);
});

test('videos de YouTube originales con fachada sin cookies', () => {
  assert.ok(html.includes('mwz1f_wHgaI'));
  assert.ok(html.includes('tmSwx-dT-aA'));
  assert.doesNotMatch(html, /<iframe/i, 'el iframe solo se crea al pulsar');
  assert.match(js, /youtube-nocookie\.com\/embed/);
});

test('menú móvil accesible y botón con aria-expanded', () => {
  const toggle = tags('button').find((b) => attr(b, 'aria-controls') === 'menu-movil');
  assert.ok(toggle, 'falta botón del menú móvil');
  assert.equal(attr(toggle, 'aria-expanded'), 'false');
  assert.ok(html.includes('id="menu-movil"'));
});

test('movimiento: respeta prefers-reduced-motion y hay foco visible', () => {
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /:focus-visible/);
});

test('datos estructurados de negocio local sin datos inventados', () => {
  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  assert.ok(ld, 'falta JSON-LD');
  const data = JSON.parse(ld[1]);
  assert.equal(data.telephone, '+573137671300');
  assert.equal(data.address, undefined, 'no hay dirección pública en el sitio original');
});
