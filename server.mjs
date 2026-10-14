// Servidor estático mínimo para desarrollo local: npm run dev
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

// ROOT=dist sirve el paquete de publicación (npm run preview)
const root = process.env.ROOT ? join(fileURLToPath(new URL('.', import.meta.url)), process.env.ROOT, sep) : fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT) || 5173;
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};
const blocked = /^(tests|_research|node_modules|\.impeccable|\.git)(\/|\\|$)/;

createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let rel = normalize(path === '/' ? 'index.html' : path.slice(1));
    // Direcciones limpias, como en Vercel: /vb1l -> vb1l.html
    if (!extname(rel)) {
      const html = `${rel.replace(/[\\/]+$/, '')}.html`;
      try { if ((await stat(join(root, html))).isFile()) rel = html; } catch { /* se resuelve abajo */ }
    }
    const file = join(root, rel);
    if (!file.startsWith(root) || rel.startsWith('..') || blocked.test(rel) || rel.split(sep).some((p) => p.startsWith('.'))) throw 0;
    if (!types[extname(file)] || !(await stat(file)).isFile()) throw 0;
    const type = types[extname(file)];
    let body = await readFile(file);
    const headers = {
      'Content-Type': type,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // En dist/ los CSS/JS llevan huella en el nombre: caché inmutable, como en producción
      'Cache-Control': process.env.ROOT && /\.[0-9a-f]{10}\.(css|js)$|\.woff2$/.test(file) ? 'public, max-age=31536000, immutable' : (process.env.ROOT && /\.(webp|jpg|png|svg|ico)$/.test(file) ? 'public, max-age=604800' : 'no-cache'),
    };
    // Compresión de texto, como hacen Netlify, Vercel o Cloudflare
    if (/text|json|javascript|xml|svg/.test(type)) {
      const accept = String(req.headers['accept-encoding'] || '');
      if (accept.includes('br')) { body = brotliCompressSync(body); headers['Content-Encoding'] = 'br'; }
      else if (accept.includes('gzip')) { body = gzipSync(body); headers['Content-Encoding'] = 'gzip'; }
      headers.Vary = 'Accept-Encoding';
    }
    res.writeHead(200, headers);
    res.end(body);
  } catch {
    // La misma página 404 que se publica
    const page = await readFile(join(root, '404.html')).catch(() => 'No encontrado');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page);
  }
}).listen(port, '127.0.0.1', () => console.log(`Abonos El Buen Sembrador → http://localhost:${port}`));
