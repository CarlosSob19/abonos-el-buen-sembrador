// Abonos El Buen Sembrador — tienda: carrito, panel lateral, pago y confirmación.
// El catálogo llega en <script type="application/json" id="catalogo"> (lo escribe
// tools/pages.mjs desde data/catalog.json). Los precios salen siempre de ahí.
(() => {
  'use strict';

  const node = document.getElementById('catalogo');
  if (!node) return;
  const CATALOG = JSON.parse(node.textContent);
  const PRODUCTS = new Map(CATALOG.products.map((p) => [p.id, p]));
  const MAX = CATALOG.maxQty || 10;
  const KEY = 'ebs-carrito-v1';
  const ORDER_KEY = 'ebs-ultimo-pedido';
  const WA_NUMBER = '573137671300';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fmt = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const money = (n) => fmt.format(n).replace(/ /g, ' ');
  const track = (name, props) => { try { window.ebsTrack?.(name, props); } catch { /* sin medición */ } };

  /* ---------------------------------------------------------- estado -- */
  // El carrito vive en este dispositivo. Si el almacenamiento falla (modo
  // privado), funciona en memoria durante la visita.
  let memory = [];
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
      return Array.isArray(raw) ? raw : [];
    } catch { return memory; }
  }
  function clean(lines) {
    // Solo productos que existen, cantidades enteras entre 1 y MAX, sin duplicados
    const out = new Map();
    for (const l of lines) {
      if (!PRODUCTS.has(l?.id)) continue;
      const q = Math.min(MAX, Math.max(1, Math.round(Number(l.qty) || 0)));
      out.set(l.id, Math.min(MAX, (out.get(l.id) || 0) + q));
    }
    return [...out].map(([id, qty]) => ({ id, qty }));
  }
  let cart = clean(read());
  function save() {
    memory = cart;
    try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch { /* en memoria */ }
    render();
  }
  const totals = () => {
    const items = cart.map((l) => ({ ...l, product: PRODUCTS.get(l.id), total: PRODUCTS.get(l.id).price * l.qty }));
    return { items, count: items.reduce((s, i) => s + i.qty, 0), subtotal: items.reduce((s, i) => s + i.total, 0) };
  };
  function setQty(id, qty) {
    if (qty <= 0) cart = cart.filter((l) => l.id !== id);
    else cart = clean(cart.map((l) => (l.id === id ? { id, qty } : l)));
    save();
  }
  function add(id, qty) {
    const current = cart.find((l) => l.id === id)?.qty || 0;
    const next = Math.min(MAX, current + qty);
    cart = clean([...cart.filter((l) => l.id !== id), { id, qty: next }]);
    save();
    return next - current;
  }
  // Otra pestaña cambió el carrito: se sincroniza
  window.addEventListener('storage', (e) => { if (e.key === KEY) { cart = clean(read()); render(); } });

  /* ------------------------------------------------------- utilidades -- */
  function el(tag, attrs = {}, ...children) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === false || v == null) continue;
      if (k === 'class') n.className = v;
      else if (k === 'text') n.textContent = v;
      else n.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) if (c != null) n.append(c);
    return n;
  }
  const announce = (msg) => {
    const live = document.querySelector('[data-cart-live]');
    if (live) { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); }
  };

  function lineView(item, { compact }) {
    const p = item.product;
    const pic = el('picture', { class: 'line__media' },
      el('source', { srcset: `/assets/img/${p.image}.webp`, type: 'image/webp' }),
      el('img', { src: `/assets/img/${p.image}.jpg`, alt: '', width: p.imageW, height: p.imageH, loading: 'lazy', decoding: 'async' }));
    const minus = el('button', { type: 'button', class: 'qty__btn', 'aria-label': `Quitar una unidad de ${p.name}`, 'data-qty-step': '-1', 'data-id': p.id }, '−');
    const plus = el('button', { type: 'button', class: 'qty__btn', 'aria-label': `Agregar una unidad de ${p.name}`, 'data-qty-step': '1', 'data-id': p.id, disabled: item.qty >= MAX }, '+');
    const qty = el('span', { class: 'qty__value', 'aria-live': 'polite', 'aria-label': `Cantidad: ${item.qty}` }, String(item.qty));
    return el('li', { class: `line${compact ? ' line--compact' : ''}` },
      pic,
      el('div', { class: 'line__info' },
        el('a', { class: 'line__name', href: `/${p.path}` }, p.name),
        el('p', { class: 'line__variant', text: `${p.variant} · ${money(p.price)} c/u` }),
        el('div', { class: 'line__row' },
          el('div', { class: 'qty', role: 'group', 'aria-label': `Cantidad de ${p.name}` }, minus, qty, plus),
          el('button', { type: 'button', class: 'line__remove', 'data-remove': p.id, 'aria-label': `Eliminar ${p.name} del carrito` }, 'Eliminar'))),
      el('p', { class: 'line__total', text: money(item.total) }));
  }

  /* ---------------------------------------------------------- render -- */
  function render() {
    const t = totals();
    document.querySelectorAll('[data-cart-count]').forEach((b) => {
      b.textContent = String(t.count);
      b.hidden = t.count === 0;
    });
    document.querySelectorAll('[data-cart-open]').forEach((b) => {
      b.setAttribute('aria-label', t.count ? `Carrito: ${t.count} ${t.count === 1 ? 'producto' : 'productos'}` : 'Carrito vacío');
    });
    document.querySelectorAll('[data-cart-lines]').forEach((list) => {
      list.replaceChildren(...t.items.map((i) => lineView(i, { compact: list.hasAttribute('data-compact') })));
    });
    document.querySelectorAll('[data-cart-subtotal]').forEach((n) => { n.textContent = money(t.subtotal); });
    document.querySelectorAll('[data-cart-empty]').forEach((n) => { n.hidden = t.count > 0; });
    document.querySelectorAll('[data-cart-full]').forEach((n) => { n.hidden = t.count === 0; });
  }

  /* -------------------------------------------- panel lateral (dialog) -- */
  const drawer = document.getElementById('carrito');
  let lastFocus = null;
  function openDrawer() {
    if (!drawer || drawer.open) return;
    lastFocus = document.activeElement;
    drawer.showModal();
    drawer.classList.remove('is-closing');
  }
  function closeDrawer() {
    if (!drawer?.open) return;
    // Sale por el mismo camino por el que entró
    drawer.classList.add('is-closing');
    const done = () => { drawer.classList.remove('is-closing'); drawer.close(); lastFocus?.focus?.(); };
    if (reduceMotion.matches) done(); else setTimeout(done, 260);
  }
  drawer?.addEventListener('cancel', (e) => { e.preventDefault(); closeDrawer(); });
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer || e.target.closest('[data-cart-close]')) closeDrawer();
  });

  /* ------------------------------------------------------ interacción -- */
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-cart-open]');
    if (opener) { e.preventDefault(); openDrawer(); return; }

    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      const id = addBtn.dataset.add;
      const p = PRODUCTS.get(id);
      if (!p) return;
      const scope = addBtn.closest('[data-buy]') || document;
      const qty = Math.max(1, Math.min(MAX, Number(scope.querySelector('[data-qty-select]')?.value) || 1));
      const added = add(id, qty);
      track('agregar_carrito', { producto: p.name, cantidad: qty });
      announce(added > 0 ? `Agregado al carrito: ${added} × ${p.name}` : `Ya tiene el máximo de ${MAX} unidades de ${p.name}`);
      if (addBtn.hasAttribute('data-buy-now')) { window.location.href = '/checkout'; return; }
      addBtn.classList.add('is-added');
      setTimeout(() => addBtn.classList.remove('is-added'), 1400);
      openDrawer();
      return;
    }

    const step = e.target.closest('[data-qty-step]');
    if (step) {
      const id = step.dataset.id;
      const line = cart.find((l) => l.id === id);
      if (line) setQty(id, line.qty + Number(step.dataset.qtyStep));
      // El foco vuelve al mismo control tras redibujar
      requestAnimationFrame(() => document.querySelector(`[data-qty-step="${step.dataset.qtyStep}"][data-id="${id}"]`)?.focus());
      return;
    }

    const rm = e.target.closest('[data-remove]');
    if (rm) {
      const p = PRODUCTS.get(rm.dataset.remove);
      setQty(rm.dataset.remove, 0);
      announce(`${p?.name || 'Producto'} eliminado del carrito`);
    }
  });

  /* ---------------------------------------------------------- pago -- */
  const form = document.querySelector('[data-checkout]');
  if (form) {
    const status = form.querySelector('[data-checkout-status]');
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = false;
    const required = [
      ['c-nombre', (v) => v.trim().length > 2],
      ['c-celular', (v) => /^3\d{9}$/.test(v.replace(/\D/g, '').replace(/^57(?=3\d{9}$)/, ''))],
      ['c-correo', (v) => v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())],
      ['c-departamento', (v) => v !== ''],
      ['c-municipio', (v) => v.trim().length > 1],
      ['c-direccion', (v) => v.trim().length > 4],
    ];
    const setError = (id, on) => {
      const input = document.getElementById(id);
      input.setAttribute('aria-invalid', String(on));
      const err = document.getElementById(`${id}-err`);
      if (err) err.hidden = !on;
    };
    form.addEventListener('input', (e) => { if (e.target.id) setError(e.target.id, false); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const t = totals();
      if (!t.count) { status.textContent = 'Su carrito está vacío.'; return; }
      let first = null;
      for (const [id, ok] of required) {
        const bad = !ok(document.getElementById(id).value);
        setError(id, bad);
        if (bad && !first) first = document.getElementById(id);
      }
      if (first) { status.textContent = 'Revise los campos marcados.'; first.focus(); return; }

      const v = (id) => document.getElementById(id).value.trim();
      const now = new Date();
      const stamp = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
      const rand = Array.from(crypto.getRandomValues(new Uint8Array(3)), (b) => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[b % 32]).join('');
      const number = `EBS-${stamp}-${rand}`;
      const celular = v('c-celular').replace(/\D/g, '').replace(/^57(?=3\d{9}$)/, '');
      const order = {
        number,
        date: now.toISOString(),
        items: t.items.map((i) => ({ id: i.id, name: i.product.name, variant: i.product.variant, qty: i.qty, price: i.product.price, total: i.total })),
        subtotal: t.subtotal,
        customer: {
          nombre: v('c-nombre'), celular, correo: v('c-correo'), documento: v('c-documento'),
          departamento: v('c-departamento'), municipio: v('c-municipio'), direccion: v('c-direccion'), indicaciones: v('c-indicaciones'),
        },
      };
      const c = order.customer;
      const lines = [
        `Hola, quiero hacer este pedido (${number}):`,
        ...order.items.map((i) => `- ${i.qty} x ${i.name} (${i.variant}): ${money(i.total)}`),
        `Subtotal: ${money(order.subtotal)} (envío por confirmar)`,
        '',
        `Nombre: ${c.nombre}`,
        `Celular: ${c.celular}`,
        c.correo && `Correo: ${c.correo}`,
        c.documento && `Cédula o NIT: ${c.documento}`,
        `Entrega: ${c.direccion}, ${c.municipio}, ${c.departamento}`,
        c.indicaciones && `Indicaciones: ${c.indicaciones}`,
      ].filter((l) => l !== '' ? Boolean(l) : true);
      order.whatsapp = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      try { sessionStorage.setItem(ORDER_KEY, JSON.stringify(order)); } catch { /* la confirmación usa la URL */ }
      track('pedido_enviado', { total: order.subtotal, productos: order.items.length });
      window.open(order.whatsapp, '_blank', 'noopener');
      cart = [];
      save();
      window.location.href = '/pedido';
    });
  }

  /* --------------------------------------------------- confirmación -- */
  const confirmation = document.querySelector('[data-order]');
  if (confirmation) {
    let order = null;
    try { order = JSON.parse(sessionStorage.getItem(ORDER_KEY) || 'null'); } catch { /* sin pedido */ }
    if (order) {
      confirmation.querySelector('[data-order-number]').textContent = order.number;
      confirmation.querySelector('[data-order-total]').textContent = money(order.subtotal);
      confirmation.querySelector('[data-order-lines]').replaceChildren(...order.items.map((i) =>
        el('li', {}, el('span', { text: `${i.qty} × ${i.name}` }), el('span', { text: money(i.total) }))));
      confirmation.querySelector('[data-order-whatsapp]').href = order.whatsapp;
      confirmation.querySelector('[data-order-found]').hidden = false;
      confirmation.querySelector('[data-order-missing]').hidden = true;
    }
  }

  render();
})();
