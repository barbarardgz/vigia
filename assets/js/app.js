/* ============================================================
   VIGÍA SHM — Interacción general de la página
   ============================================================ */

(function () {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = (s, raiz) => Array.from((raiz || document).querySelectorAll(s));

  /* ---------- Navegación ---------- */
  const nav = $('.nav');
  const menu = $('.nav__menu');
  const toggle = $('.nav__toggle');
  const progreso = $('.progreso');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const abierto = menu.classList.toggle('abierto');
      toggle.setAttribute('aria-expanded', abierto);
    });
    menu.addEventListener('click', e => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('abierto');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const enlaces = $$('.nav__menu a[href^="#"]');
  const secciones = enlaces.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  let pendiente = false;
  function alDesplazar() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('compacta', y > 40);

    const alto = document.documentElement.scrollHeight - window.innerHeight;
    if (progreso) progreso.style.width = (alto > 0 ? (y / alto) * 100 : 0) + '%';

    let activa = null;
    secciones.forEach(s => { if (s.offsetTop - 110 <= y) activa = s.id; });
    enlaces.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + activa));
    pendiente = false;
  }
  window.addEventListener('scroll', () => {
    if (!pendiente) { pendiente = true; requestAnimationFrame(alDesplazar); }
  }, { passive: true });
  alDesplazar();

  /* ---------- Revelado progresivo ---------- */
  const obs = new IntersectionObserver((entradas, o) => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('dentro');
      o.unobserve(e.target);
      $$('.medidor i b', e.target).forEach(b => { b.style.width = b.dataset.v + '%'; });
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  $$('.rev').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    obs.observe(el);
  });

  // Los medidores dentro de paneles ocultos se llenan al mostrarse
  function llenarMedidores(raiz) {
    (raiz || document).querySelectorAll('.medidor i b').forEach(b => { b.style.width = b.dataset.v + '%'; });
  }

  /* ---------- Contadores de portada ---------- */
  const contadores = $$('[data-contar]');
  const obsNum = new IntersectionObserver((es, o) => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      o.unobserve(e.target);
      const fin = parseFloat(e.target.dataset.contar);
      const dec = (e.target.dataset.dec | 0);
      const suf = e.target.dataset.suf || '';
      const pre = e.target.dataset.pre || '';
      const ini = performance.now(), dur = 1400;
      (function paso(t) {
        const p = Math.min(1, (t - ini) / dur);
        const v = fin * (1 - Math.pow(1 - p, 3));
        e.target.textContent = pre + v.toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(paso);
      })(ini);
    });
  }, { threshold: 0.5 });
  contadores.forEach(c => obsNum.observe(c));

  /* ---------- Pestañas de prototipo ---------- */
  $$('.pestana').forEach(p => {
    p.addEventListener('click', () => {
      const grupo = p.closest('.pestanas');
      grupo.querySelectorAll('.pestana').forEach(o => o.setAttribute('aria-selected', 'false'));
      p.setAttribute('aria-selected', 'true');
      $$('.panel').forEach(pa => pa.classList.remove('visible'));
      const destino = document.getElementById(p.getAttribute('aria-controls'));
      destino.classList.add('visible');
      llenarMedidores(destino);
    });
  });

  /* ---------- Línea de tiempo de fases ---------- */
  $$('.fase__btn').forEach(b => {
    b.addEventListener('click', () => {
      const fase = b.closest('.fase');
      const det = fase.querySelector('.fase__det');
      const abierta = fase.classList.contains('abierta');
      $$('.fase').forEach(f => {
        f.classList.remove('abierta');
        f.querySelector('.fase__det').style.maxHeight = null;
        f.querySelector('.fase__btn').setAttribute('aria-expanded', 'false');
      });
      if (!abierta) {
        fase.classList.add('abierta');
        det.style.maxHeight = det.scrollHeight + 'px';
        b.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Año del pie ---------- */
  const y = $('#anio');
  if (y) y.textContent = new Date().getFullYear();
})();
