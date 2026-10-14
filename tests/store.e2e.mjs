// Flujo de compra de punta a punta: npm run test:e2e
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium, devices } = require('playwright-core');
const PORT = 5198;
const B = `http://localhost:${PORT}`;
const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
let server;
let browser;
before(async () => {
  server = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: String(PORT) }, stdio: 'ignore' });
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(B)).ok) break; } catch { /* arrancando */ }
    await new Promise((r) => setTimeout(r, 100));
  }
  browser = await chromium.launch(exe ? { executablePath: exe } : {});
});
after(async () => { await browser?.close(); server?.kill(); });

test('compra completa: agregar, cantidades, pago y confirmación con mensaje de WhatsApp', async () => {
  const ctx = await browser.newContext({ ...devices['iPhone 15'] });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.addInitScript(() => { window.__opened = []; window.open = (u) => { window.__opened.push(u); return null; }; });

  // Ficha: 2 unidades de Vinobiol abren el panel con el subtotal correcto
  await page.goto(`${B}/vb1l`);
  await page.locator('.pdp [data-qty-select]').selectOption('2');
  await page.locator('.pdp__buy [data-add]:not([data-buy-now])').tap();
  await page.waitForTimeout(500);
  assert.equal(await page.locator('#carrito').evaluate((d) => d.open), true, 'el panel debe abrirse');
  assert.equal((await page.locator('#carrito [data-cart-subtotal]').textContent()).replace(/\s/g, ''), '$90.000');

  // Otra página: el carrito persiste y suma el Compostado
  await page.goto(`${B}/tienda`);
  assert.equal(await page.locator('[data-cart-count]').first().textContent(), '2');
  await page.locator('.pcard', { hasText: 'Compostado' }).locator('[data-add]').tap();
  await page.waitForTimeout(400);
  assert.equal(await page.locator('[data-cart-count]').first().textContent(), '3');

  // Carrito: más, menos y eliminar
  await page.goto(`${B}/carrito`);
  await page.locator('.cart-page [data-qty-step="1"][data-id="abono-organico-compostado"]').tap();
  await page.waitForTimeout(150);
  assert.equal((await page.locator('.cart-page [data-cart-subtotal]').textContent()).replace(/\s/g, ''), '$134.000');
  await page.locator('.cart-page [data-remove="vinobiol-1l"]').tap();
  await page.waitForTimeout(150);
  assert.equal((await page.locator('.cart-page [data-cart-subtotal]').textContent()).replace(/\s/g, ''), '$44.000');

  // Pago: valida y luego confirma
  await page.goto(`${B}/checkout`);
  await page.locator('[data-checkout] [type="submit"]').tap();
  assert.ok((await page.locator('.field__error:not([hidden])').count()) >= 5, 'deben marcarse los obligatorios');
  await page.locator('#c-nombre').fill('Ana Gómez');
  await page.locator('#c-celular').fill('300 123 4567');
  await page.locator('#c-departamento').selectOption('Antioquia');
  await page.locator('#c-municipio').fill('La Ceja');
  await page.locator('#c-direccion').fill('Vereda San José, finca El Roble');
  await Promise.all([page.waitForURL(`${B}/pedido`), page.locator('[data-checkout] [type="submit"]').tap()]);
  // El enlace que muestra la confirmación es el mismo que se abrió al confirmar
  const sent = decodeURIComponent(await page.locator('[data-order-whatsapp]').getAttribute('href'));
  for (const s of ['wa.me/573137671300', 'EBS-', '2 x Abono Orgánico-Compostado', '$ 44.000', 'Ana Gómez', '3001234567', 'La Ceja, Antioquia']) {
    assert.ok(sent.includes(s), `el mensaje no incluye: ${s}`);
  }
  assert.match(await page.locator('[data-order-number]').textContent(), /^EBS-\d{6}-[A-Z2-9]{3}$/);
  assert.equal(await page.locator('[data-cart-count]').first().isHidden(), true, 'el carrito se vacía tras el pedido');
  assert.equal(await page.evaluate(() => innerWidth === screen.width), true);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('direcciones de la tienda anterior funcionan', async () => {
  for (const [path, text] of [['/om40', 'Abono Orgánico-Mineral'], ['/categories/abono', 'Abonos orgánicos'], ['/line_items', 'Su carrito']]) {
    const res = await fetch(B + path);
    assert.equal(res.status, 200, path);
    assert.ok((await res.text()).includes(text), path);
  }
});
