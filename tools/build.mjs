// Paquete de publicación: npm run build  →  dist/
// Copia solo lo que se publica, minifica CSS y JS con huella en el nombre (caché
// inmutable), reescribe las referencias y genera las cabeceras de seguridad.
import { createHash } from 'node:crypto';
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { transform } from 'esbuild';

const OUT = 'dist';
// Se vacía dist/ pero se conserva .vercel (el enlace con el proyecto de Vercel)
mkdirSync(OUT, { recursive: true });
for (const entry of readdirSync(OUT)) if (entry !== '.vercel') rmSync(join(OUT, entry), { recursive: true, force: true });

// 1. Archivos estáticos tal cual
for (const f of ['favicon.ico', 'site.webmanifest', 'robots.txt', 'sitemap.xml']) cpSync(f, join(OUT, f));
cpSync('assets/img', join(OUT, 'assets/img'), { recursive: true });
cpSync('assets/fonts', join(OUT, 'assets/fonts'), { recursive: true });

// 2. CSS y JS minificados con huella
const hashed = {};
const assets = [
  ['assets/css/styles.css', 'css'],
  ['assets/js/boot.js', 'js'],
  ['assets/vendor/scrollcraft/scrollcraft.js', 'js'],
  ['assets/js/main.js', 'js'],
  ['assets/js/store.js', 'js'],
];
let before = 0;
let after = 0;
for (const [src, loader] of assets) {
  // El CSS del motor y el del sitio se publican como un solo archivo (un bloqueo menos)
  const code = src === 'assets/css/styles.css'
    ? readFileSync('assets/vendor/scrollcraft/scrollcraft.css', 'utf8') + '\n' + readFileSync(src, 'utf8')
    : readFileSync(src, 'utf8');
  const out = await transform(code, { loader, minify: true, target: loader === 'js' ? 'es2020' : 'chrome100', legalComments: 'none' });
  const hash = createHash('sha256').update(out.code).digest('hex').slice(0, 10);
  const name = src.replace(/\.(css|js)$/, `.${hash}.$1`);
  mkdirSync(join(OUT, dirname(name)), { recursive: true });
  writeFileSync(join(OUT, name), out.code);
  hashed[src] = name;
  before += code.length;
  after += out.code.length;
}

// 3. HTML con referencias reescritas (índice, 404 y páginas de la tienda)
const pages = ['index.html', '404.html', ...JSON.parse(readFileSync('data/pages.json', 'utf8'))];
for (const page of pages) {
  let html = readFileSync(page, 'utf8');
  html = html.replace(/\s*<link rel="stylesheet" href="\/?assets\/vendor\/scrollcraft\/scrollcraft\.css">/, '');
  mkdirSync(join(OUT, dirname(page)), { recursive: true });
  for (const [src, name] of Object.entries(hashed)) html = html.split(src).join(name);
  // Comentarios de autoría fuera; el contenido se publica intacto
  html = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');
  writeFileSync(join(OUT, page), html);
}

// 4. Cabeceras: la CSP también como cabecera (allí sí vale frame-ancestors)
const csp = readFileSync('index.html', 'utf8').match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1] + "; frame-ancestors 'none'; upgrade-insecure-requests";
const security = {
  'Content-Security-Policy': csp,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
};
const lines = (h) => Object.entries(h).map(([k, v]) => `  ${k}: ${v}`).join('\n');
writeFileSync(join(OUT, '_headers'), [
  '# Netlify y Cloudflare Pages',
  '/*', lines(security), '',
  '/*.html', '  Cache-Control: no-cache', '',
  '/', '  Cache-Control: no-cache', '',
  '/assets/css/*', '  Cache-Control: public, max-age=31536000, immutable', '',
  '/assets/js/*', '  Cache-Control: public, max-age=31536000, immutable', '',
  '/assets/vendor/*', '  Cache-Control: public, max-age=31536000, immutable', '',
  '/assets/fonts/*', '  Cache-Control: public, max-age=31536000, immutable', '',
  '/assets/img/*', '  Cache-Control: public, max-age=604800', '',
].join('\n'));
writeFileSync(join(OUT, 'vercel.json'), JSON.stringify({
  cleanUrls: true,
  redirects: [{ source: '/pagina/contacto', destination: '/#contacto', permanent: true }],
  headers: [
    { source: '/(.*)', headers: Object.entries(security).map(([key, value]) => ({ key, value })) },
    { source: '/assets/(css|js|vendor|fonts)/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    { source: '/assets/img/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
    // La copia en *.vercel.app no se indexa: no debe competir con el dominio real
    { source: '/(.*)', has: [{ type: 'host', value: '(?<sub>.*)\\.vercel\\.app' }], headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
  ],
}, null, 2));
// La tienda es propia y conserva las direcciones de la anterior (/vb1l, /om40,
// /abono-organico-compostado, /categories/*, /line_items). Solo el contacto cambia de lugar.
writeFileSync(join(OUT, '_redirects'), ['/pagina/contacto  /#contacto  301', ''].join('\n'));

if (!existsSync(join(OUT, 'index.html'))) throw new Error('build sin index.html');
console.log(`dist/ listo. CSS+JS: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
Object.entries(hashed).forEach(([s, n]) => console.log(`  ${s} → ${n}`));
