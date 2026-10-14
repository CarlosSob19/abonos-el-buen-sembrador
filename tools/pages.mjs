// Genera las páginas de la tienda desde data/catalog.json y el "cascarón" de index.html.
// Uso: npm run pages   (también lo ejecuta npm run build)
// Las páginas generadas llevan la marca GENERADO: no se editan a mano.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const SITE = 'https://www.abonoselbuensembrador.com';
const WA = '573137671300';
const catalog = JSON.parse(readFileSync('data/catalog.json', 'utf8'));
const { products, categories, maxQty } = catalog;
const byCat = (slug) => products.filter((p) => p.category === slug);
const catOf = (p) => categories.find((c) => c.slug === p.category);
const money = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n).replace(/ /g, ' ');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

let index = readFileSync('index.html', 'utf8');

/* ------------------------------------------------ bloque de tienda -- */
const storeBlock = `<!-- tienda:inicio -->
  <p class="visually-hidden" aria-live="polite" data-cart-live></p>
  <dialog class="cart-drawer" id="carrito" aria-labelledby="carrito-titulo">
    <div class="cart-drawer__panel">
      <header class="cart-drawer__head">
        <h2 id="carrito-titulo" class="cart-drawer__title">Su carrito</h2>
        <button class="cart-drawer__close" type="button" data-cart-close aria-label="Cerrar carrito"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </header>
      <div class="cart-drawer__body">
        <div class="cart-empty" data-cart-empty>
          <p class="cart-empty__title">Todavía no ha agregado productos.</p>
          <a class="btn btn--forest" href="/tienda">Ver la tienda</a>
        </div>
        <ul class="lines" data-cart-lines data-compact></ul>
      </div>
      <footer class="cart-drawer__foot" data-cart-full hidden>
        <p class="cart-total"><span>Subtotal</span><strong data-cart-subtotal>$ 0</strong></p>
        <p class="cart-note">El costo de envío se confirma por WhatsApp según su municipio.</p>
        <a class="btn btn--seed btn--lg cart-drawer__pay" href="/checkout">Continuar al pago</a>
        <a class="link-arrow" href="/carrito">Ver carrito completo</a>
      </footer>
    </div>
  </dialog>
  <script type="application/json" id="catalogo">${JSON.stringify({ maxQty, products: products.map(({ id, path, name, variant, price, image, imageW, imageH }) => ({ id, path, name, variant, price, image, imageW, imageH })) })}</script>
<!-- tienda:fin -->`;
index = index.replace(/<!-- tienda:inicio -->[\s\S]*?<!-- tienda:fin -->/, storeBlock);

/* -------------------------------- datos estructurados del índice -- */
const productLd = (p, url) => ({
  '@type': 'Product',
  name: p.variant ? `${p.name} (${p.variant})` : p.name,
  sku: p.id,
  category: catOf(p).name,
  description: p.summary,
  image: `${SITE}/assets/img/${p.image}.jpg`,
  brand: { '@type': 'Brand', name: 'El Buen Sembrador' },
  offers: { '@type': 'Offer', url, priceCurrency: 'COP', price: String(p.price), availability: 'https://schema.org/InStock', seller: { '@type': 'Organization', name: 'Abonos El Buen Sembrador' } },
});
index = index.replace(/<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@graph"[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@graph': products.map((p) => productLd(p, `${SITE}/${p.path}`)) }, null, 1)}\n  </script>`);
const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const qa = [...index.matchAll(/<summary>([\s\S]*?)<\/summary>\s*<div class="faq__answer">([\s\S]*?)<\/div>/g)].map((m) => ({ '@type': 'Question', name: strip(m[1]), acceptedAnswer: { '@type': 'Answer', text: strip(m[2]) } }));
index = index.replace(/<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "FAQPage"[\s\S]*?<\/script>/,
  `<script type="application/ld+json">\n${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: qa }, null, 1)}\n  </script>`);
writeFileSync('index.html', index);

/* --------------------------------------------------- cascarón -- */
const pick = (re) => { const m = index.match(re); if (!m) throw new Error('cascarón incompleto: ' + re); return m[0]; };
const absolutize = (html) => html
  .replace(/(src|href|srcset)="assets\//g, '$1="/assets/')
  .replace(/, assets\//g, ', /assets/')
  .replace(/href="#/g, 'href="/#')
  .replace(/href="\/#carrito"/g, 'href="#carrito"');
const header = absolutize(pick(/<header class="site-header"[\s\S]*?<\/header>/)).replace('data-tone="clear"', 'data-tone="light"');
const footer = absolutize(pick(/<footer class="site-footer">[\s\S]*?<\/footer>/));
const quick = absolutize(pick(/<aside class="quick-contact"[\s\S]*?<\/aside>/));
const csp = pick(/<meta http-equiv="Content-Security-Policy"[^>]*>/);

function page({ path, title, description, body, robots = 'index,follow', jsonLd, canonical = `${SITE}/${path}` }) {
  return `<!doctype html>
<!-- GENERADO por tools/pages.mjs desde data/catalog.json: no editar a mano -->
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  ${csp}
  <meta name="referrer" content="strict-origin-when-cross-origin">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="${robots}">
  <meta name="theme-color" content="#173F32">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CO">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}/assets/img/og-abonos.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="apple-touch-icon" href="/assets/img/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="preload" href="/assets/fonts/bricolage-grotesque-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/hanken-grotesk-latin-wght.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/vendor/scrollcraft/scrollcraft.css">
  <link rel="stylesheet" href="/assets/css/styles.css">
  <script src="/assets/js/boot.js"></script>
  <script src="/assets/js/main.js" defer></script>
  <script src="/assets/js/store.js" defer></script>${jsonLd ? `\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 1)}\n  </script>` : ''}
</head>
<body class="shop">
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  ${header}
  <main id="contenido" class="shop__main">
${body}
  </main>
  ${footer}
${storeBlock}
  ${quick}
</body>
</html>
`;
}

const picture = (img, w, h, alt, cls = '', sizes = '(max-width: 900px) 90vw, 40vw', eager = false) => `<picture${cls ? ` class="${cls}"` : ''}>
          <source srcset="/assets/img/${img}.webp" type="image/webp">
          <img src="/assets/img/${img}.jpg" alt="${esc(alt)}" width="${w}" height="${h}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">
        </picture>`;
const qtySelect = (p) => `<label class="qty-select"><span class="visually-hidden">Cantidad de ${esc(p.name)}</span>
            <select data-qty-select>${Array.from({ length: maxQty }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('')}</select>
          </label>`;
const card = (p) => `<article class="pcard" data-buy>
        <a class="pcard__media" href="/${p.path}" tabindex="-1" aria-hidden="true">
          ${picture(p.image, p.imageW, p.imageH, '', '', '(max-width: 900px) 80vw, 28vw')}
        </a>
        <div class="pcard__body">
          <p class="product__cat">${esc(p.kind)}</p>
          <h3 class="pcard__name"><a href="/${p.path}">${esc(p.name)}</a></h3>
          <p class="pcard__variant">${esc(p.variant)}</p>
          <p class="pcard__price">${money(p.price)}</p>
          <div class="pcard__actions">
            ${qtySelect(p)}
            <button class="btn btn--seed" type="button" data-add="${p.id}">Agregar</button>
          </div>
        </div>
      </article>`;
const crumbs = (items) => `<nav class="crumbs" aria-label="Ruta de navegación"><ol>${items.map(([label, href]) => href ? `<li><a href="${href}">${esc(label)}</a></li>` : `<li aria-current="page">${esc(label)}</li>`).join('')}</ol></nav>`;
const breadcrumbLd = (items) => ({ '@type': 'BreadcrumbList', itemListElement: items.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: href ? `${SITE}${href === '/' ? '/' : href}` : undefined })) });

const files = {};

/* ---------------------------------------------------- productos -- */
for (const p of products) {
  const cat = catOf(p);
  const trail = [['Inicio', '/'], ['Tienda', '/tienda'], [cat.title, `/categories/${cat.slug}`], [p.name]];
  const others = products.filter((o) => o.id !== p.id);
  files[`${p.path}.html`] = page({
    path: p.path,
    title: `${p.name} ${p.variant ? `(${p.variant}) ` : ''}| Abonos El Buen Sembrador`,
    description: `${p.summary} ${money(p.price)}. Compre en línea o por WhatsApp.`.slice(0, 160),
    jsonLd: { '@context': 'https://schema.org', '@graph': [productLd(p, `${SITE}/${p.path}`), breadcrumbLd(trail)] },
    body: `    <div class="shop__wrap">
      ${crumbs(trail)}
      <section class="pdp" aria-labelledby="pdp-title">
        <div class="pdp__media${p.photo ? ' pdp__media--pair' : ''}">
          ${picture(p.image, p.imageW, p.imageH, p.imageAlt, '', '(max-width: 900px) 90vw, 44vw', true)}${p.photo ? `
          ${picture(p.photo, 1280, 960, p.photoAlt, 'pdp__photo', '(max-width: 900px) 50vw, 22vw')}` : ''}
        </div>
        <div class="pdp__info" data-buy>
          <p class="product__cat">${esc(p.kind)}</p>
          <h1 id="pdp-title" class="pdp__title">${esc(p.name)}</h1>
          <p class="pdp__variant">${esc(p.variant)}</p>
          <p class="pdp__price">${money(p.price)}</p>
          <p class="pdp__summary">${esc(p.summary)}</p>
          <div class="pdp__buy">
            ${qtySelect(p)}
            <button class="btn btn--seed btn--lg" type="button" data-add="${p.id}">Agregar al carrito</button>
            <button class="btn btn--line-dark btn--lg" type="button" data-add="${p.id}" data-buy-now>Comprar ahora</button>
          </div>
          <ul class="pdp__assure">
            <li>El costo de envío se confirma por WhatsApp según su municipio.</li>
            <li>Aceptamos tarjetas. El medio de pago se coordina al confirmar el pedido.</li>
          </ul>
          <a class="link-arrow" href="${wa(p.askOther || `Hola, tengo una pregunta sobre ${p.name}.`)}" target="_blank" rel="noopener">${p.askOther ? 'Precio de 4 y 20 litros por WhatsApp' : 'Preguntar por WhatsApp'}</a>
        </div>
      </section>
      <div class="buybar" data-buy>
        <div class="buybar__info"><p class="buybar__name">${esc(p.name)}</p><p class="buybar__price">${money(p.price)}</p></div>
        <button class="btn btn--seed" type="button" data-add="${p.id}">Agregar al carrito</button>
      </div>
      <section class="pdp-details" aria-labelledby="pdp-ficha">
        <h2 id="pdp-ficha" class="pdp-details__title">Ficha del producto</h2>
        <dl class="pdp-details__list">
          <div><dt>Qué hace</dt><dd><ul class="product__specs">${p.specs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></dd></div>
          <div><dt>Usos</dt><dd>${esc(p.uses)}</dd></div>
          <div><dt>Presentación</dt><dd>${esc(p.presentation)}</dd></div>
        </dl>
      </section>
      <section class="related" aria-labelledby="rel-title">
        <h2 id="rel-title" class="related__title">También le puede servir</h2>
        <div class="pgrid">
      ${others.map(card).join('\n      ')}
        </div>
      </section>
    </div>`,
  });
}

/* --------------------------------------------- categorías y tienda -- */
for (const cat of categories) {
  const trail = [['Inicio', '/'], ['Tienda', '/tienda'], [cat.title]];
  files[`categories/${cat.slug}.html`] = page({
    path: `categories/${cat.slug}`,
    title: `${cat.title} | Abonos El Buen Sembrador`,
    description: cat.intro.slice(0, 160),
    jsonLd: { '@context': 'https://schema.org', '@graph': [breadcrumbLd(trail)] },
    body: `    <div class="shop__wrap">
      ${crumbs(trail)}
      <header class="shop__head">
        <h1 class="shop__title">${esc(cat.title)}</h1>
        <p class="shop__intro">${esc(cat.intro)}</p>
      </header>
      <div class="pgrid">
      ${byCat(cat.slug).map(card).join('\n      ')}
      </div>
      <p class="shop__more"><a class="link-arrow" href="/tienda">Ver toda la tienda</a></p>
    </div>`,
  });
}
files['tienda.html'] = page({
  path: 'tienda',
  title: 'Tienda | Abonos El Buen Sembrador',
  description: 'Compre en línea abonos orgánicos 100 % maduros y el fertilizante Vinobiol. Pedido confirmado por WhatsApp; aceptamos tarjetas.',
  jsonLd: { '@context': 'https://schema.org', '@graph': [breadcrumbLd([['Inicio', '/'], ['Tienda']])] },
  body: `    <div class="shop__wrap">
      ${crumbs([['Inicio', '/'], ['Tienda']])}
      <header class="shop__head">
        <h1 class="shop__title">Tienda</h1>
        <p class="shop__intro">Agregue los productos al carrito y confirme su pedido. Le llega a nuestro WhatsApp, donde coordinamos el envío y el pago.</p>
      </header>
      ${categories.map((cat) => `<section class="shop__cat" aria-labelledby="cat-${cat.slug}">
        <h2 id="cat-${cat.slug}" class="shop__cat-title"><a href="/categories/${cat.slug}">${esc(cat.title)}</a></h2>
        <div class="pgrid">
      ${byCat(cat.slug).map(card).join('\n      ')}
        </div>
      </section>`).join('\n      ')}
      <aside class="shop__volume">
        <p><strong>¿Compra por volumen?</strong> Pida una cotización para su finca.</p>
        <a class="btn btn--forest" href="/#cotizar">Cotizar por volumen</a>
      </aside>
    </div>`,
});

/* ------------------------------------------------------ carrito -- */
const cartBody = `    <div class="shop__wrap shop__wrap--narrow">
      ${crumbs([['Inicio', '/'], ['Tienda', '/tienda'], ['Carrito']])}
      <h1 class="shop__title">Su carrito</h1>
      <div class="cart-empty cart-empty--page" data-cart-empty>
        <p class="cart-empty__title">Su carrito está vacío.</p>
        <a class="btn btn--seed" href="/tienda">Ir a la tienda</a>
      </div>
      <div class="cart-page" data-cart-full hidden>
        <ul class="lines" data-cart-lines></ul>
        <aside class="summary" aria-label="Resumen">
          <p class="cart-total"><span>Subtotal</span><strong data-cart-subtotal>$ 0</strong></p>
          <p class="cart-note">El costo de envío se confirma por WhatsApp según su municipio.</p>
          <a class="btn btn--seed btn--lg" href="/checkout">Continuar al pago</a>
          <a class="link-arrow" href="/tienda">Seguir comprando</a>
        </aside>
      </div>
    </div>`;
files['carrito.html'] = page({ path: 'carrito', title: 'Carrito | Abonos El Buen Sembrador', description: 'Revise los productos de su pedido.', robots: 'noindex,follow', body: cartBody });
// Dirección de la tienda anterior: misma página, canónica en /carrito
files['line_items.html'] = page({ path: 'line_items', canonical: `${SITE}/carrito`, title: 'Carrito | Abonos El Buen Sembrador', description: 'Revise los productos de su pedido.', robots: 'noindex,follow', body: cartBody });

/* --------------------------------------------------------- pago -- */
const DEPARTAMENTOS = ['Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bogotá D.C.', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare', 'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'];
const field = (id, label, { type = 'text', required = true, auto = '', hint = '', err = '', attrs = '', half = false } = {}) => `<div class="field${half ? ' field--half' : ''}">
            <label for="${id}">${label}${required ? '' : ' <span class="field__opt">(opcional)</span>'}</label>
            <input id="${id}" name="${id}" type="${type}"${auto ? ` autocomplete="${auto}"` : ''}${required ? ' required' : ''}${err ? ` aria-describedby="${id}-err${hint ? ` ${id}-hint` : ''}"` : hint ? ` aria-describedby="${id}-hint"` : ''} ${attrs}>${hint ? `\n            <p class="field__hint" id="${id}-hint">${hint}</p>` : ''}${err ? `\n            <p class="field__error" id="${id}-err" hidden>${err}</p>` : ''}
          </div>`;
files['checkout.html'] = page({
  path: 'checkout', title: 'Pago | Abonos El Buen Sembrador', description: 'Datos de entrega y confirmación de su pedido.', robots: 'noindex,nofollow',
  body: `    <div class="shop__wrap">
      ${crumbs([['Inicio', '/'], ['Carrito', '/carrito'], ['Pago']])}
      <h1 class="shop__title">Confirmar pedido</h1>
      <div class="cart-empty cart-empty--page" data-cart-empty>
        <p class="cart-empty__title">Su carrito está vacío.</p>
        <a class="btn btn--seed" href="/tienda">Ir a la tienda</a>
      </div>
      <div class="checkout" data-cart-full hidden>
        <form class="checkout__form quote__form" data-checkout novalidate>
          <fieldset class="checkout__group">
            <legend>Sus datos</legend>
          ${field('c-nombre', 'Nombre completo', { auto: 'name', err: 'Escriba su nombre completo.', attrs: 'maxlength="80"' })}
          ${field('c-celular', 'Celular', { type: 'tel', auto: 'tel-national', half: true, err: 'Escriba un celular de 10 dígitos que empiece por 3.', attrs: 'inputmode="tel" maxlength="16" placeholder="300 123 4567"' })}
          ${field('c-correo', 'Correo', { type: 'email', required: false, auto: 'email', half: true, err: 'Revise el correo.', attrs: 'maxlength="120"' })}
          ${field('c-documento', 'Cédula o NIT', { required: false, hint: 'Solo si necesita factura a su nombre.', attrs: 'inputmode="numeric" maxlength="20"' })}
          </fieldset>
          <fieldset class="checkout__group">
            <legend>Entrega</legend>
            <div class="field field--half">
              <label for="c-departamento">Departamento</label>
              <select id="c-departamento" name="c-departamento" required aria-describedby="c-departamento-err" autocomplete="address-level1">
                <option value="">Elija uno</option>
                ${DEPARTAMENTOS.map((d) => `<option${d === 'Antioquia' ? '' : ''}>${d}</option>`).join('')}
              </select>
              <p class="field__error" id="c-departamento-err" hidden>Elija el departamento.</p>
            </div>
          ${field('c-municipio', 'Municipio', { auto: 'address-level2', half: true, err: 'Escriba el municipio.', attrs: 'maxlength="60"' })}
          ${field('c-direccion', 'Dirección o vereda', { auto: 'street-address', err: 'Escriba la dirección de entrega.', attrs: 'maxlength="140" placeholder="Ej.: Vereda La Esperanza, finca El Roble"' })}
            <div class="field">
              <label for="c-indicaciones">Indicaciones para la entrega <span class="field__opt">(opcional)</span></label>
              <textarea id="c-indicaciones" name="c-indicaciones" rows="2" maxlength="300"></textarea>
            </div>
          </fieldset>
          <p class="checkout__privacy">Sus datos se usan solo para gestionar este pedido: se envían por WhatsApp al ${WA.slice(2, 5)} ${WA.slice(5, 8)} ${WA.slice(8)} y no se guardan en este sitio.</p>
          <div class="quote__submit">
            <p class="cart-total checkout__total"><span>Subtotal</span><strong data-cart-subtotal>$ 0</strong></p>
            <button class="btn btn--seed btn--lg" type="submit" disabled>
              <svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><path d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8Z"/><path d="M9 9.5c.3 2.4 2.1 4.3 4.5 4.6"/></svg>
              Confirmar pedido por WhatsApp
            </button>
            <p class="quote__status" role="status" aria-live="polite" data-checkout-status></p>
            <noscript><p class="quote__status">Para confirmar el pedido active JavaScript, o escríbanos al WhatsApp <a href="https://wa.me/${WA}">313 767 1300</a>.</p></noscript>
          </div>
        </form>
        <aside class="summary checkout__summary" aria-labelledby="resumen-titulo">
          <h2 id="resumen-titulo" class="summary__title">Su pedido</h2>
          <ul class="lines" data-cart-lines data-compact></ul>
          <p class="cart-total"><span>Subtotal</span><strong data-cart-subtotal>$ 0</strong></p>
          <p class="cart-note">Envío: se confirma por WhatsApp según su municipio. Pago: aceptamos tarjetas; el medio se coordina al confirmar.</p>
        </aside>
      </div>
    </div>`,
});

/* ------------------------------------------------- confirmación -- */
files['pedido.html'] = page({
  path: 'pedido', title: 'Pedido enviado | Abonos El Buen Sembrador', description: 'Confirmación de su pedido.', robots: 'noindex,nofollow',
  body: `    <div class="shop__wrap shop__wrap--narrow" data-order>
      <div data-order-found hidden>
        <h1 class="shop__title">Gracias, su pedido está en camino a nuestro WhatsApp</h1>
        <p class="shop__intro">Pedido <strong data-order-number></strong>. Envíe el mensaje que se abrió en WhatsApp; allí le confirmamos el costo de envío, el pago y la fecha de entrega.</p>
        <ul class="order-lines" data-order-lines></ul>
        <p class="cart-total"><span>Subtotal</span><strong data-order-total></strong></p>
        <div class="order-actions">
          <a class="btn btn--seed btn--lg" data-order-whatsapp href="https://wa.me/${WA}" target="_blank" rel="noopener">Abrir WhatsApp con el pedido</a>
          <a class="link-arrow" href="/tienda">Volver a la tienda</a>
        </div>
      </div>
      <div data-order-missing>
        <h1 class="shop__title">No encontramos un pedido reciente</h1>
        <p class="shop__intro">Si ya lo envió por WhatsApp, le responderemos allí. Si no, puede volver a la tienda.</p>
        <a class="btn btn--seed" href="/tienda">Ir a la tienda</a>
      </div>
    </div>`,
});

/* ------------------------------------- dirección antigua de contacto -- */
files['pagina/contacto.html'] = `<!doctype html>
<!-- GENERADO por tools/pages.mjs: dirección antigua, lleva al contacto -->
<html lang="es"><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0; url=/#contacto"><link rel="canonical" href="${SITE}/#contacto"><title>Contacto | Abonos El Buen Sembrador</title></head>
<body><p><a href="/#contacto">Ir al contacto de Abonos El Buen Sembrador</a></p></body></html>
`;

for (const [file, html] of Object.entries(files)) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}
writeFileSync('data/pages.json', JSON.stringify(Object.keys(files), null, 1) + '\n');
console.log(`páginas generadas: ${Object.keys(files).length} (${Object.keys(files).join(', ')})`);
