// Abonos El Buen Sembrador — interacciones y coreografía de la página
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const smallMQ = window.matchMedia('(max-width: 900px)');
  const clamp01 = (x) => Math.min(1, Math.max(0, x));

  /* Dirección de arte por dispositivo, antes de montar el motor:
     en móvil (o sin movimiento) los productos se leen en lista, no en carril. */
  const products = document.querySelector('[data-pan-desktop]');
  if (products && (smallMQ.matches || reduceMotion.matches)) {
    products.setAttribute('data-sc-act', 'flow');
    products.removeAttribute('data-sc-span');
  }
  if (smallMQ.matches) {
    const spans = { inicio: '1.6', proceso: '4.4', contacto: '1.35' };
    Object.entries(spans).forEach(([id, span]) => document.getElementById(id)?.setAttribute('data-sc-span', span));
  }
  // Cruzar el punto de quiebre cambia la estructura: se recompone la página.
  smallMQ.addEventListener('change', () => window.location.reload());

  if (window.ScrollCraft) window.ScrollCraft.mount(document);

  /* Progreso propio de un acto fijado (0..1), igual que el motor */
  const pinnedProgress = (el) => {
    const r = el.getBoundingClientRect();
    const travel = Math.max(r.height - window.innerHeight, 1);
    return clamp01(-r.top / travel);
  };

  const header = document.querySelector('[data-header]');
  const hero = document.getElementById('inicio');
  const process = document.querySelector('[data-strata]');
  const processStage = process?.querySelector('[data-sc-stage]');
  const core = process?.querySelector('.core');
  const contact = document.getElementById('contacto');
  const darkZones = [process, contact, document.querySelector('.site-footer')].filter(Boolean);

  /* Medidor de profundidad */
  const gauge = document.querySelector('[data-gauge]');
  const seed = gauge?.querySelector('[data-gauge-seed]');
  const gaugeLinks = gauge ? [...gauge.querySelectorAll('a[data-stratum]')] : [];
  const strata = gaugeLinks.map((a) => document.getElementById(a.dataset.stratum)).filter(Boolean);
  const siteNav = [...document.querySelectorAll('.site-nav a[href^="#"]')];

  const waFloat = document.querySelector('.wa-float');
  const menuToggle = document.querySelector('[data-menu-toggle]');

  let lastLayer = -1;
  let frame = 0;

  function update() {
    frame = 0;
    const vh = window.innerHeight;
    const probe = (header?.offsetHeight || 70) + 4;

    // Tono del header: transparente sobre la foto, oscuro sobre suelos oscuros
    if (header) {
      let tone = 'light';
      if (hero && hero.getBoundingClientRect().bottom > probe && pinnedProgress(hero) < 0.72) tone = 'clear';
      else if (darkZones.some((z) => { const r = z.getBoundingClientRect(); return r.top <= probe && r.bottom > probe; })) tone = 'dark';
      if (header.dataset.tone !== tone) header.dataset.tone = tone;
    }

    // Proceso: la capa activa y el llenado del núcleo
    if (processStage) {
      const p = pinnedProgress(process);
      const layer = p < 0.14 ? 0 : Math.min(4, 1 + Math.floor((p - 0.14) / 0.215));
      if (layer !== lastLayer) { processStage.dataset.layer = String(layer); lastLayer = layer; }
      // La capa activa deriva con el scroll mientras dura: el escenario nunca queda quieto
      if (layer > 0 && !reduceMotion.matches) {
        const local = clamp01((p - 0.14 - (layer - 1) * 0.215) / 0.215);
        const panel = processStage.querySelector(`[data-layer-panel="${layer}"]`);
        if (panel) panel.style.translate = `0 ${((0.5 - local) * 36).toFixed(1)}px`;
      }
      core?.style.setProperty('--core', clamp01((p - 0.14) / 0.86).toFixed(4));
    }

    // WhatsApp flotante: fuera de escena donde ya hay botones (hero y cierre)
    if (waFloat && menuToggle?.getAttribute('aria-expanded') !== 'true') {
      const onHero = hero && hero.getBoundingClientRect().bottom > vh * 0.6;
      const c = contact?.getBoundingClientRect();
      const onClose = c && c.top < vh * 0.8 && c.bottom > 0;
      waFloat.classList.toggle('is-hidden', Boolean(onHero || onClose));
    }

    // Estrato actual: el último cuya parte superior pasó la mitad de la pantalla
    let current = 0;
    strata.forEach((s, i) => { if (s.getBoundingClientRect().top <= vh * 0.5) current = i; });

    if (gauge && seed && strata.length) {
      // La semilla interpola entre la marca del estrato actual y la siguiente
      const a = strata[current];
      const b = strata[current + 1];
      const ra = a.getBoundingClientRect();
      const t = b ? clamp01((vh * 0.5 - ra.top) / Math.max(b.getBoundingClientRect().top - ra.top, 1)) : 0;
      const dot = (i) => gaugeLinks[i].offsetTop + gaugeLinks[i].offsetHeight / 2 - 5;
      const y = b ? dot(current) + (dot(current + 1) - dot(current)) * t : dot(current);
      seed.style.transform = `translateY(${y.toFixed(1)}px) rotate(${(y * 1.8).toFixed(1)}deg)`;

      gaugeLinks.forEach((l, i) => (i === current ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
      const id = strata[current].id;
      gauge.dataset.tone = id === 'inicio' || id === 'proceso' || id === 'contacto' ? 'dark' : 'light';
      gauge.classList.toggle('is-sown', id === 'contacto' && pinnedProgress(contact) > 0.05);
      // En el carril horizontal el medidor cruzaría el texto: se aparta
      gauge.classList.toggle('is-muted', id === 'productos');

      const navId = { usos: 'cultivos', trabajo: 'nosotros' }[id] || id;
      siteNav.forEach((l) => (l.getAttribute('href') === `#${navId}` ? l.setAttribute('aria-current', 'true') : l.removeAttribute('aria-current')));
    }
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

  /* Barridos de imagen: se disparan al entrar y se completan solos (nunca quedan a medias
     mientras se lee). Solo se arman los que aún no se ven al cargar. */
  const wipes = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    // Se observa el contenedor: el navegador cuenta el recorte del propio elemento,
    // y uno recortado al 100 % nunca "intersecta".
    const owner = new Map();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        owner.get(entry.target)?.classList.add('is-revealed');
        io.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -18% 0px' });
    wipes.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      el.classList.add('is-armed');
      owner.set(el.parentElement, el);
      io.observe(el.parentElement);
    });
  }

  /* Productos: cada uno se asienta al entrar al carril (cajón que se abre, no diapositiva) */
  const railItems = products?.getAttribute('data-sc-act') === 'pan' && !reduceMotion.matches
    ? [...products.querySelectorAll('.product')].map((p) => [p, p.querySelector('.product__media'), p.querySelector('.product__body')])
    : [];
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  function settleRail() {
    const vw = window.innerWidth;
    railItems.forEach(([item, media, body]) => {
      const left = item.getBoundingClientRect().left;
      // Fuera de pantalla queda en su estado final: solo se anima lo que asoma
      const t = left >= vw ? 1 : clamp01((vw - left) / (vw * 0.5));
      const m = ease(t);
      const b = ease(clamp01(t * 1.25 - 0.2));
      media.style.opacity = (0.55 + 0.45 * m).toFixed(3);
      media.style.translate = `0 ${((1 - m) * 32).toFixed(1)}px`;
      body.style.opacity = (0.55 + 0.45 * b).toFixed(3);
      body.style.translate = `0 ${((1 - b) * 22).toFixed(1)}px`;
    });
  }
  if (railItems.length) {
    settleRail();
    window.addEventListener('scroll', () => requestAnimationFrame(settleRail), { passive: true });
  }

  /* Hero: profundidad que sigue al puntero (solo ratón, sin movimiento reducido) */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (hero && fine.matches && !reduceMotion.matches) {
    const layers = [
      ['.hero__plate', -0.35],
      ['.hero__seeds--far', 0.3],
      ['.hero__subject', 1],
      ['.hero__seeds--mid', 1.5],
      ['.hero__seeds--near', 2.6],
    ].map(([sel, depth]) => [hero.querySelector(sel), depth]).filter(([el]) => el);
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;
    const step = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      layers.forEach(([el, d]) => { el.style.translate = `${(cur.x * 9 * d).toFixed(2)}px ${(cur.y * 6 * d).toFixed(2)}px`; });
      raf = Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.002 ? requestAnimationFrame(step) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(step); };
    hero.addEventListener('pointermove', (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      kick();
    });
    hero.addEventListener('pointerleave', () => { target.x = 0; target.y = 0; kick(); });
  }
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  /* Menú móvil: sale del header y vuelve por el mismo camino */
  const toggle = menuToggle;
  const menu = document.querySelector('[data-menu]');
  const toggleLabel = toggle?.querySelector('.visually-hidden');
  let closeTimer;

  function setMenu(open) {
    if (!toggle || !menu) return;
    clearTimeout(closeTimer);
    toggle.setAttribute('aria-expanded', String(open));
    if (toggleLabel) toggleLabel.textContent = open ? 'Cerrar menú' : 'Abrir menú';
    if (open) waFloat?.classList.add('is-hidden'); else schedule();
    if (open) {
      menu.hidden = false;
      void menu.offsetHeight; // fija el estado inicial para que la transición arranque
      menu.classList.add('is-open');
      menu.querySelector('a')?.focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
      closeTimer = setTimeout(() => { menu.hidden = true; }, reduceMotion.matches ? 150 : 300);
    }
  }

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      toggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (toggle?.getAttribute('aria-expanded') === 'true' && !event.target.closest('[data-header]')) setMenu(false);
  });
  window.matchMedia('(min-width: 1141px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* Su cultivo: pestañas accesibles; la elección viaja hasta el mensaje final */
  const WA_NUMBER = '573137671300';
  const WA_BASE = 'Hola, quiero información sobre sus abonos.';
  const carryLinks = [...document.querySelectorAll('[data-wa-carry]')];
  const echo = document.querySelector('[data-need-echo]');
  const summary = document.querySelector('[data-need-summary]');
  const summaryText = document.querySelector('[data-need-summary-text]');

  function carry(need, product) {
    const message = `${WA_BASE} Necesito: ${need}. Me interesa: ${product}.`;
    const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
    carryLinks.forEach((a) => { a.href = href; });
    if (echo) {
      echo.hidden = false;
      echo.querySelector('strong').textContent = need;
    }
    if (summary && summaryText) {
      summary.hidden = false;
      summaryText.textContent = `${need} · ${product}`;
    }
  }

  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const marker = group.querySelector('[data-tab-marker]');
    const placeMarker = (tab) => {
      marker?.style.setProperty('--marker-y', `${tab.offsetTop + tab.offsetHeight / 2 - 5}px`);
    };
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      placeMarker(tab);
      if (tab.dataset.need) carry(tab.dataset.need, tab.dataset.product);
      if (focus) tab.focus();
    };
    placeMarker(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0]);
    window.addEventListener('resize', () => placeMarker(tabs.find((t) => t.getAttribute('aria-selected') === 'true') || tabs[0]));
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', (event) => {
        const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
        if (event.key in keys) {
          event.preventDefault();
          select(tabs[(i + keys[event.key] + tabs.length) % tabs.length], true);
        } else if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          select(tabs[event.key === 'Home' ? 0 : tabs.length - 1], true);
        }
      });
    });
  });

  /* Videos de YouTube: el iframe solo se carga al pulsar (sin cookies) */
  const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
  document.querySelectorAll('[data-video]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = button.dataset.video;
      if (!VIDEO_ID.test(id)) return;
      const iframe = document.createElement('iframe');
      iframe.className = 'video-frame';
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = button.dataset.title || 'Video de YouTube';
      iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      button.replaceWith(iframe);
      iframe.focus();
    }, { once: true });
  });

  /* Medición de conversiones: funciona con Plausible o Google Tag Manager si se
     instalan (ver README); sin ellos no hace nada y no envía datos a nadie. */
  function track(name, props = {}) {
    try {
      if (typeof window.plausible === 'function') window.plausible(name, { props });
      if (Array.isArray(window.dataLayer)) window.dataLayer.push({ event: name, ...props });
    } catch { /* la medición nunca debe romper la página */ }
  }
  window.ebsTrack = track; // la tienda (store.js) registra sus eventos por aquí
  document.addEventListener('click', (event) => {
    const a = event.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href');
    const where = a.closest('section, header, footer, aside')?.id || a.closest('header, footer, aside')?.tagName.toLowerCase() || 'pagina';
    if (href.startsWith('https://wa.me/')) track('whatsapp_click', { seccion: where });
    else if (href.startsWith('tel:')) track('telefono_click', { seccion: where });
    else if (href.startsWith('https://www.abonoselbuensembrador.com/')) track('tienda_click', { destino: new URL(href).pathname, seccion: where });
  });
  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[role="tab"][data-need]');
    if (tab) track('necesidad_elegida', { necesidad: tab.dataset.need });
    const video = event.target.closest('[data-video]');
    if (video) track('video_play', { video: video.dataset.video });
  });

  /* Cotización por volumen: valida, arma el mensaje y lo entrega por WhatsApp */
  const form = document.querySelector('[data-quote]');
  if (form) {
    const submit = form.querySelector('[data-quote-submit]');
    const status = form.querySelector('[data-quote-status]');
    submit.disabled = false;
    const rules = [
      ['nombre', (f) => f.nombre.value.trim().length > 1, 'q-nombre'],
      ['municipio', (f) => f.municipio.value.trim().length > 1, 'q-municipio'],
      ['cultivo', (f) => f.cultivo.value !== '', 'q-cultivo'],
      ['productos', (f) => [...f.querySelectorAll('[name="productos"]:checked')].length > 0, 'q-productos'],
    ];
    const setError = (id, on) => {
      const err = document.getElementById(`${id}-err`);
      if (err) err.hidden = !on;
      const field = id === 'q-productos' ? form.querySelector('.field--choices') : document.getElementById(id);
      field?.setAttribute('aria-invalid', String(on));
    };
    form.addEventListener('input', (event) => {
      const id = event.target.closest('.field--choices') ? 'q-productos' : event.target.id;
      if (id) setError(id, false);
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let firstBad = null;
      rules.forEach(([, ok, id]) => {
        const bad = !ok(form);
        setError(id, bad);
        if (bad && !firstBad) firstBad = id === 'q-productos' ? form.querySelector('[name="productos"]') : document.getElementById(id);
      });
      if (firstBad) {
        status.textContent = 'Revise los campos marcados.';
        firstBad.focus();
        return;
      }
      const v = (name) => form[name].value.trim();
      const productos = [...form.querySelectorAll('[name="productos"]:checked')].map((c) => c.value);
      const lines = [
        'Hola, quiero una cotización por volumen.',
        `Nombre: ${v('nombre')}`,
        `Ubicación: ${v('municipio')}`,
        `Cultivo: ${v('cultivo')}`,
        v('area') && `Área: ${v('area')}`,
        `Productos: ${productos.join(', ')}`,
        v('cantidad') && `Cantidad aproximada: ${v('cantidad')}`,
        v('mensaje') && `Mensaje: ${v('mensaje')}`,
      ].filter(Boolean);
      const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
      track('cotizacion_enviada', { cultivo: v('cultivo'), productos: productos.join(' | ') });
      window.open(href, '_blank', 'noopener');
      // Respaldo por si el navegador bloquea la ventana nueva
      status.textContent = 'Abrimos WhatsApp con su mensaje listo para enviar. Si no se abrió, ';
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'ábralo aquí';
      status.append(link, '.');
    });
  }
})();
