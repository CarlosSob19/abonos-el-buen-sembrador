// Pruebas de extremo a extremo en teléfonos emulados: npm run test:e2e
// Levantan su propio servidor y usan Edge/Chrome instalado (playwright-core).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright-core');
const PORT = 5199;
const URL = `http://localhost:${PORT}/`;
const PHONES = ['iPhone SE', 'Galaxy S8', 'iPhone 15'];
const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);

let server;
let browser;
before(async () => {
  server = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(URL)).ok) break; } catch { /* aún arrancando */ }
    await new Promise((r) => setTimeout(r, 100));
  }
  browser = await chromium.launch(exe ? { executablePath: exe } : {});
});
after(async () => { await browser?.close(); server?.kill(); });

async function open(name) {
  const ctx = await browser.newContext({ ...devices[name] });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(URL, { waitUntil: 'load' });
  return { ctx, page, errors };
}

for (const name of PHONES) {
  test(`${name}: el diseño mide exactamente el ancho de la pantalla en toda la página`, async () => {
    const { ctx, page, errors } = await open(name);
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 600) {
      await page.evaluate((yy) => scrollTo(0, yy), y);
      const w = await page.evaluate(() => ({ inner: innerWidth, screen: screen.width, scroll: document.documentElement.scrollWidth }));
      assert.equal(w.inner, w.screen, `diseño ensanchado en y=${y}`);
      assert.ok(w.scroll <= w.inner, `desborde horizontal en y=${y}`);
    }
    assert.deepEqual(errors, []);
    await ctx.close();
  });
}

test('menú móvil: abre, navega y cierra', async () => {
  const { ctx, page } = await open('iPhone 15');
  await page.locator('[data-menu-toggle]').tap();
  await page.waitForTimeout(400);
  assert.equal(await page.locator('[data-menu-toggle]').getAttribute('aria-expanded'), 'true');
  await page.locator('#menu-movil a[href="#cotizar"]').tap();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('#menu-movil').isHidden(), true);
  assert.equal(await page.evaluate(() => location.hash), '#cotizar');
  await ctx.close();
});

test('cotización: valida y entrega el mensaje completo a WhatsApp', async () => {
  const { ctx, page } = await open('iPhone 15');
  await page.evaluate(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }; });
  await page.locator('#cotizar').scrollIntoViewIfNeeded();
  await page.locator('[data-quote-submit]').tap();
  const errores = await page.locator('.field__error:not([hidden])').count();
  assert.equal(errores, 4, 'los cuatro campos obligatorios deben marcarse');
  assert.equal(await page.evaluate(() => window.__opened.length), 0);
  await page.locator('#q-nombre').fill('Ana Gómez');
  await page.locator('#q-municipio').fill('La Ceja, Antioquia');
  await page.locator('#q-cultivo').selectOption('Café');
  await page.locator('input[value="Abono Orgánico-Mineral"]').check();
  await page.locator('[data-quote-submit]').tap();
  const url = decodeURIComponent(await page.evaluate(() => window.__opened[0]));
  assert.ok(url.startsWith('https://wa.me/573137671300?text='));
  for (const s of ['Ana Gómez', 'La Ceja, Antioquia', 'Cultivo: Café', 'Abono Orgánico-Mineral']) assert.ok(url.includes(s), `falta ${s}`);
  await ctx.close();
});

test('su cultivo: la necesidad elegida llega al botón final', async () => {
  const { ctx, page } = await open('Galaxy S8');
  await page.locator('#tab-floracion').scrollIntoViewIfNeeded();
  await page.locator('#tab-floracion').tap();
  const href = decodeURIComponent(await page.locator('.contact [data-wa-carry]').getAttribute('href'));
  assert.ok(href.includes('Floración, fructificación y estrés') && href.includes('Vinobiol'));
  await ctx.close();
});
