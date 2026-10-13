// Servidor estático mínimo para desarrollo local: npm run dev
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
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
};
const blocked = /^(tests|_research|node_modules|\.impeccable|\.git)(\/|\\|$)/;

createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const rel = normalize(path === '/' ? 'index.html' : path.slice(1));
    const file = join(root, rel);
    if (!file.startsWith(root) || rel.startsWith('..') || blocked.test(rel) || rel.split(sep).some((p) => p.startsWith('.'))) throw 0;
    if (!types[extname(file)] || !(await stat(file)).isFile()) throw 0;
    res.writeHead(200, {
      'Content-Type': types[extname(file)],
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': 'no-cache',
    });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('No encontrado');
  }
}).listen(port, '127.0.0.1', () => console.log(`Abonos El Buen Sembrador → http://localhost:${port}`));
