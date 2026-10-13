// Abonos El Buen Sembrador — interacciones de la página de inicio
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Header compacto al desplazarse */
  const header = document.querySelector('[data-header]');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menú móvil */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const toggleLabel = toggle?.querySelector('.visually-hidden');
  const waFloat = document.querySelector('.wa-float');
  let closeTimer;

  function setMenu(open) {
    if (!toggle || !menu) return;
    clearTimeout(closeTimer);
    toggle.setAttribute('aria-expanded', String(open));
    if (toggleLabel) toggleLabel.textContent = open ? 'Cerrar menú' : 'Abrir menú';
    waFloat?.classList.toggle('is-hidden', open);
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
  window.matchMedia('(min-width: 1081px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* Selector de necesidades (pestañas accesibles) */
  document.querySelectorAll('[data-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        t.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    };
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
      iframe.allowFullscreen = true;
      button.replaceWith(iframe);
      iframe.focus();
    }, { once: true });
  });

  /* Revelado al hacer scroll: solo lo que aún no se ve */
  const reveals = [...document.querySelectorAll('[data-reveal]')];
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

    const fold = window.innerHeight;
    let stagger = 0;
    let lastTop = -1;
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < fold) return;
      // Escalonado suave entre hermanos que entran juntos
      stagger = Math.abs(top - lastTop) < 80 || el.previousElementSibling?.hasAttribute('data-reveal') ? stagger + 1 : 0;
      lastTop = top;
      el.style.transitionDelay = `${Math.min(stagger, 4) * 60}ms`;
      el.classList.add('is-pending');
      io.observe(el);
    });
  }

  /* Sección activa en la navegación */
  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          if (a.getAttribute('href') === `#${entry.target.id}`) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
  }

  /* WhatsApp flotante: se oculta sobre la sección de contacto */
  const contact = document.getElementById('contacto');
  if (waFloat && contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      if (toggle?.getAttribute('aria-expanded') === 'true') return;
      waFloat.classList.toggle('is-hidden', entry.isIntersecting);
    }).observe(contact);
  }
})();
