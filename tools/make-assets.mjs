// Genera la imagen para compartir y los íconos a partir de los recursos reales.
// Uso: npm run og  (requiere el servidor de desarrollo en marcha: npm run dev)
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');
const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const browser = await chromium.launch(existsSync(edge) ? { executablePath: edge } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173/tools/og.html', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'assets/img/og-abonos.jpg', type: 'jpeg', quality: 86 });
await browser.close();

// Íconos: el logo sobre papel, en lienzo cuadrado
const ff = (args) => execFileSync('ffmpeg', ['-v', 'error', '-y', ...args]);
const square = (size, pad) => `scale=${size - pad * 2}:${size - pad * 2}:force_original_aspect_ratio=decrease,pad=${size}:${size}:(ow-iw)/2:(oh-ih)/2:color=0xFAFAF6`;
ff(['-i', 'assets/img/logo-el-buen-sembrador.png', '-vf', square(180, 14), 'assets/img/apple-touch-icon.png']);
ff(['-i', 'assets/img/logo-el-buen-sembrador.png', '-vf', square(192, 14), 'assets/img/icon-192.png']);
ff(['-i', 'assets/img/logo-el-buen-sembrador.png', '-vf', square(512, 36), 'assets/img/icon-512.png']);
ff(['-i', 'assets/img/logo-el-buen-sembrador.png', '-vf', square(48, 2), 'favicon.ico']);
console.log('og-abonos.jpg, apple-touch-icon.png, icon-192.png, icon-512.png, favicon.ico');
