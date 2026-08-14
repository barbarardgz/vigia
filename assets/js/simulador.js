/* ============================================================
   VIGÍA SHM — Simulador de gemelo digital
   ------------------------------------------------------------
   Reproduce, de forma didáctica, el ciclo descrito en el dossier:
     estructura física → sensor → modelo → calibración → diagnóstico

   MODELO DIRECTO (sensibilidad modal de primer orden)

     f_i = f_i0 · √( 1 − Σ_j  S_ij · (1 − α_j) )

   α_j es el factor de rigidez remanente del elemento j (1.00 = sano,
   0.00 = elemento perdido) y S_ij es la fracción de energía de
   deformación del modo i almacenada en ese elemento. Como cada modo
   reparte su energía de forma distinta a lo largo del claro, el vector
   de corrimientos de frecuencia constituye una FIRMA que permite
   LOCALIZAR el daño y no solo detectarlo.

   PROBLEMA INVERSO (localización)

   Se resuelve por comparación de firmas con refinamiento de magnitudes
   —el «plan B» de la fase 7 del dossier, que resultó bastante más
   robusto frente al ruido que el ajuste por mínimos cuadrados
   amortiguados que se probó primero—:

     1. y_i = 1 − (f_i/f_i0)²  es la evidencia medida.
     2. Se elige el elemento cuya firma tiene mayor coseno con y.
     3. Se ajusta la magnitud por mínimos cuadrados sobre los elementos
        ya elegidos, y se repite sobre el residuo (máximo dos elementos).
     4. El coseno de la primera firma es la confianza de localización.

   Antes de diagnosticar se promedian varias ventanas de medición, igual
   que un sistema real: es lo que da persistencia al criterio y evita
   disparar alertas por una sola ventana ruidosa.

   AVISO: es una simulación con fines de demostración. No sustituye un
   análisis modal por elemento finito ni datos de un sensor real.
   ============================================================ */

(function () {
  'use strict';

  const svg = document.getElementById('armadura');
  if (!svg) return;

  const NS = 'http://www.w3.org/2000/svg';

  /* ---------- 1. Geometría de la armadura (tipo Warren, 8 paneles) ---------- */
  const PANELES = 8;
  const CLARO = 640;          // px de dibujo (equivale a ~100 cm de maqueta)
  const ALTO = 92;
  const X0 = 40, Y_INF = 178, Y_SUP = Y_INF - ALTO;
  const PASO = CLARO / PANELES;

  const nInf = [], nSup = [];
  for (let i = 0; i <= PANELES; i++) nInf.push({ x: X0 + i * PASO, y: Y_INF });
  for (let i = 0; i <= PANELES; i++) nSup.push({ x: X0 + i * PASO, y: Y_SUP });

  /* Las diagonales alternan sentido: es lo que define la tipología Warren.
     D1 y D8 quedan junto a los apoyos; D4 y D5 en el centro del claro. */
  const DIAGS = [];
  for (let i = 0; i < PANELES; i++) {
    const sube = i % 2 === 0;
    DIAGS.push({
      id: 'D' + (i + 1),
      a: sube ? nInf[i] : nSup[i],
      b: sube ? nSup[i + 1] : nInf[i + 1],
      centro: (i + 0.5) / PANELES        // posición relativa dentro del claro
    });
  }

  /* ---------- 2. Matriz de sensibilidad modal S_ij ----------
     Base: la energía de deformación de la diagonal j en el modo i escala
     con sen²(i·π·x_j), la forma modal de una viga simplemente apoyada.

     Sobre esa base van dos correcciones sin las cuales la matriz sería
     perfectamente simétrica respecto del centro del claro y los elementos
     espejo (D2 y D7, D1 y D8) resultarían indistinguibles:

       GAMMA — el apoyo fijo de un extremo y el móvil del otro hacen que
               cada modo se «recargue» de distinta forma a lo largo del claro.
       FIRMA — cada barra tiene su propio par de apriete y su propia masa
               de instrumentación. Un modelo ideal no lo sabe; un gemelo
               calibrado contra la maqueta real, sí. Es justamente lo que
               determina la calibración de la fase 2.                        */
  const MODOS = 4;
  const F0 = [42.7, 118.4, 226.9, 361.5];   // Hz — frecuencias de la maqueta sana
  const GAMMA = [0.10, -0.22, 0.17, -0.12];
  const FIRMA = [
    [1.06, 0.94, 1.09, 0.97, 1.03, 0.91, 1.08, 0.95],
    [0.93, 1.11, 0.96, 1.07, 0.90, 1.09, 0.95, 1.05],
    [1.08, 0.92, 1.05, 1.10, 0.94, 1.06, 0.91, 1.09],
    [0.95, 1.07, 0.91, 0.96, 1.11, 0.93, 1.10, 0.92]
  ];

  const S = [];                             // S[modo][diagonal]
  for (let i = 1; i <= MODOS; i++) {
    const fila = DIAGS.map((d, j) => Math.max(0.02,
      (Math.pow(Math.sin(i * Math.PI * d.centro), 2) + 0.06 + GAMMA[i - 1] * (d.centro - 0.5)) * FIRMA[i - 1][j]
    ));
    // Cada modo pone ~46 % de su energía de deformación en las diagonales
    const suma = fila.reduce((a, b) => a + b, 0);
    S.push(fila.map(v => (v / suma) * 0.46));
  }

  const COL = DIAGS.map((_, j) => S.map(f => f[j]));        // firma de cada elemento
  const NRM = COL.map(c => Math.hypot.apply(null, c));

  const BETA = 0.0009;      // corrimiento térmico: −0.09 % por °C
  const T_REF = 22;         // temperatura de referencia de la línea base
  const RUIDO = 0.0010;     // ruido de medición relativo por ventana (σ ≈ 0.10 %)
  const SUAVE = 0.18;       // constante del promedio móvil entre ventanas
  const PISO = 1.4 * RUIDO * Math.sqrt(MODOS);   // umbral de evidencia sobre ‖y‖

  /* ---------- 3. Estado ---------- */
  const est = {
    alfa: DIAGS.map(() => 1),
    temp: 22,
    compensar: true,
    linea: null,          // { f:[], sigma:[] }
    suave: null,          // frecuencias promediadas entre ventanas
    hist: [],             // serie de tiempo del modo 1
    sel: null,
    corriendo: true
  };

  /* ---------- 4. Física simulada ---------- */
  const gauss = () => {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };

  /** Frecuencias que "mide" el nodo en una ventana: daño + temperatura + ruido. */
  function medir() {
    return F0.map((f0, i) => {
      let perdida = 0;
      for (let j = 0; j < DIAGS.length; j++) perdida += S[i][j] * (1 - est.alfa[j]);
      const fDano = f0 * Math.sqrt(Math.max(0.02, 1 - perdida));
      const fTemp = fDano * (1 - BETA * (est.temp - T_REF));
      return fTemp * (1 + gauss() * RUIDO);
    });
  }

  /** Compensación térmica: lleva la frecuencia a condiciones de referencia. */
  const compensar = (f) => est.compensar ? f / (1 - BETA * (est.temp - T_REF)) : f;

  /* ---------- 5. Problema inverso: localización del daño ---------- */

  /** Mínimos cuadrados de las magnitudes sobre los elementos ya seleccionados. */
  function magnitudes(y, sel) {
    const n = sel.length;
    const A = sel.map(r => sel.map(c => COL[r].reduce((s, v, i) => s + v * COL[c][i], 0)));
    const b = sel.map(c => y.reduce((s, v, i) => s + v * COL[c][i], 0));
    for (let c = 0; c < n; c++) {
      let piv = c;
      for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[piv][c])) piv = r;
      const tf = A[c]; A[c] = A[piv]; A[piv] = tf;
      const tb = b[c]; b[c] = b[piv]; b[piv] = tb;
      if (Math.abs(A[c][c]) < 1e-12) continue;
      for (let r = 0; r < n; r++) {
        if (r === c) continue;
        const k = A[r][c] / A[c][c];
        for (let q = c; q < n; q++) A[r][q] -= k * A[c][q];
        b[r] -= k * b[c];
      }
    }
    return b.map((v, i) => Math.abs(A[i][i]) < 1e-12 ? 0 : Math.min(0.98, Math.max(0, v / A[i][i])));
  }

  /** Devuelve la rigidez estimada por elemento y los hallazgos ordenados. */
  function diagnosticar(fComp) {
    const y0 = fComp.map((f, i) => 1 - Math.pow(f / F0[i], 2));
    let y = y0.slice();
    const sel = [], alfa = DIAGS.map(() => 1), hallazgos = [];
    let cos1 = 0;

    for (let paso = 0; paso < 2; paso++) {
      const norma = Math.hypot.apply(null, y);
      if (norma < (paso === 0 ? PISO : 3 * PISO)) break;

      let mejor = -1, mejorCos = -1;
      for (let j = 0; j < DIAGS.length; j++) {
        if (sel.indexOf(j) >= 0) continue;
        const c = y.reduce((s, v, i) => s + v * COL[j][i], 0) / (norma * NRM[j]);
        if (c > mejorCos) { mejorCos = c; mejor = j; }
      }
      if (mejorCos < (paso === 0 ? 0.55 : 0.72)) break;

      sel.push(mejor);
      const d = magnitudes(y0, sel);
      if (d[sel.length - 1] < (paso === 0 ? 0.03 : 0.10)) { sel.pop(); break; }

      if (paso === 0) cos1 = mejorCos;
      y = y0.map((v, i) => v - sel.reduce((s, c, k) => s + d[k] * COL[c][i], 0));

      hallazgos.length = 0;
      sel.forEach((c, k) => { alfa[c] = 1 - d[k]; });
      sel.map((c, k) => ({ id: DIAGS[c].id, j: c, alfa: 1 - d[k] }))
         .sort((p, q) => p.alfa - q.alfa)
         .forEach(h => hallazgos.push(h));
    }
    return { alfa, hallazgos, cos: cos1 };
  }

  /* ---------- 6. Dibujo de la armadura ---------- */
  const gEstr = document.createElementNS(NS, 'g');
  const gDiag = document.createElementNS(NS, 'g');
  const gEtq = document.createElementNS(NS, 'g');
  const gSens = document.createElementNS(NS, 'g');
  svg.appendChild(gEstr); svg.appendChild(gDiag); svg.appendChild(gEtq); svg.appendChild(gSens);

  const linea = (a, b, clase, padre) => {
    const l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', a.x); l.setAttribute('y1', a.y);
    l.setAttribute('x2', b.x); l.setAttribute('y2', b.y);
    l.setAttribute('class', clase);
    padre.appendChild(l);
    return l;
  };

  // Cuerdas y montantes
  for (let i = 0; i < PANELES; i++) {
    linea(nInf[i], nInf[i + 1], 'barra-est', gEstr);
    linea(nSup[i], nSup[i + 1], 'barra-est', gEstr);
  }
  for (let i = 0; i <= PANELES; i += 2) linea(nInf[i], nSup[i], 'barra-est', gEstr);

  // Tablero
  const tablero = document.createElementNS(NS, 'rect');
  tablero.setAttribute('x', X0 - 12); tablero.setAttribute('y', Y_INF + 4);
  tablero.setAttribute('width', CLARO + 24); tablero.setAttribute('height', 7);
  tablero.setAttribute('rx', 3); tablero.setAttribute('fill', '#1c3049');
  gEstr.appendChild(tablero);

  // Apoyos: uno fijo y uno móvil. Esa asimetría es la que recoge GAMMA.
  const apoyo = (x, movil) => {
    const t = document.createElementNS(NS, 'path');
    t.setAttribute('d', 'M' + x + ' ' + (Y_INF + 11) + ' L' + (x - 13) + ' ' + (Y_INF + 32) +
                        ' L' + (x + 13) + ' ' + (Y_INF + 32) + ' Z');
    t.setAttribute('fill', 'none'); t.setAttribute('stroke', '#3a6fb0'); t.setAttribute('stroke-width', '2');
    gEstr.appendChild(t);
    if (movil) {
      [-7, 7].forEach(dx => {
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('cx', x + dx); c.setAttribute('cy', Y_INF + 37); c.setAttribute('r', 4);
        c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#3a6fb0'); c.setAttribute('stroke-width', '1.6');
        gEstr.appendChild(c);
      });
    } else {
      const h = document.createElementNS(NS, 'line');
      h.setAttribute('x1', x - 18); h.setAttribute('y1', Y_INF + 33);
      h.setAttribute('x2', x + 18); h.setAttribute('y2', Y_INF + 33);
      h.setAttribute('stroke', '#3a6fb0'); h.setAttribute('stroke-width', '2.4');
      gEstr.appendChild(h);
    }
  };
  apoyo(X0, false);
  apoyo(X0 + CLARO, true);

  // Diagonales interactivas
  const elDiag = DIAGS.map((d, j) => {
    const l = linea(d.a, d.b, 'barra-est barra-diag', gDiag);
    l.setAttribute('tabindex', '0');
    l.setAttribute('role', 'button');
    l.setAttribute('aria-label', 'Diagonal ' + d.id);
    const activar = () => seleccionar(j);
    l.addEventListener('click', activar);
    l.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activar(); }
    });

    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', (d.a.x + d.b.x) / 2 + (j % 2 ? 10 : -10));
    t.setAttribute('y', (d.a.y + d.b.y) / 2 + 3);
    t.setAttribute('text-anchor', 'middle');
    t.setAttribute('class', 'etq-barra');
    t.textContent = d.id;
    gEtq.appendChild(t);
    return { linea: l, etq: t };
  });

  // Sensores: acelerómetro principal al centro, secundario a un cuarto, temperatura
  [
    { x: nSup[4].x, y: nSup[4].y, n: 'ACC-1', dy: -15 },
    { x: nSup[2].x, y: nSup[2].y, n: 'ACC-2', dy: -15 },
    { x: nInf[6].x, y: nInf[6].y, n: 'TMP', dy: 21 }
  ].forEach(s => {
    const halo = document.createElementNS(NS, 'circle');
    halo.setAttribute('cx', s.x); halo.setAttribute('cy', s.y); halo.setAttribute('r', 9);
    halo.setAttribute('class', 'sensor-halo');
    const p = document.createElementNS(NS, 'circle');
    p.setAttribute('cx', s.x); p.setAttribute('cy', s.y); p.setAttribute('r', 4.2);
    p.setAttribute('class', 'sensor');
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', s.x); t.setAttribute('y', s.y + s.dy);
    t.setAttribute('text-anchor', 'middle'); t.setAttribute('class', 'etq-barra');
    t.textContent = s.n;
    gSens.appendChild(halo); gSens.appendChild(p); gSens.appendChild(t);
  });

  /** Color de cada barra según la rigidez ESTIMADA por el modelo calibrado. */
  function colorRigidez(a) {
    if (a > 0.955) return '#7f96ae';
    if (a > 0.82) return '#e0a530';
    if (a > 0.60) return '#d97a3a';
    return '#e0553f';
  }

  /* ---------- 7. Interfaz ---------- */
  const $ = id => document.getElementById(id);
  const elTemp = $('ctrl-temp');
  const elComp = $('ctrl-comp');
  const elDiagnostico = $('diagnostico');
  const elEstado = $('estado-sim');
  const cvEspectro = $('cv-espectro');
  const cvSerie = $('cv-serie');

  // Deslizadores de rigidez, uno por diagonal
  const cont = $('ctrl-diagonales');
  const sliders = DIAGS.map((d, j) => {
    const w = document.createElement('div');
    w.className = 'control';
    w.innerHTML = '<label for="sl-' + d.id + '">' + d.id + ' <b id="vl-' + d.id + '">100 %</b></label>' +
      '<input type="range" id="sl-' + d.id + '" min="0" max="100" value="100" step="1"' +
      ' aria-label="Rigidez remanente de la diagonal ' + d.id + '">';
    cont.appendChild(w);
    const inp = w.querySelector('input');
    inp.addEventListener('input', () => {
      est.alfa[j] = inp.value / 100;
      $('vl-' + d.id).textContent = inp.value + ' %';
      seleccionar(j, true);
      marcarPreset(null);
    });
    return inp;
  });

  function fijarAlfa(vals, preset) {
    vals.forEach((v, j) => {
      est.alfa[j] = v;
      sliders[j].value = Math.round(v * 100);
      $('vl-' + DIAGS[j].id).textContent = Math.round(v * 100) + ' %';
    });
    marcarPreset(preset);
  }

  function seleccionar(j, soloResaltar) {
    est.sel = j;
    elDiag.forEach((e, k) => {
      e.linea.classList.toggle('sel', k === j);
      e.etq.classList.toggle('on', k === j);
    });
    if (!soloResaltar) sliders[j].focus({ preventScroll: true });
  }

  /* Escenarios de daño inducido del protocolo 9.4 del dossier */
  const PRESETS = {
    sana:  DIAGS.map(() => 1),
    n1:    DIAGS.map((_, j) => j === 3 ? 0.87 : 1),                 // D4, ¼ de vuelta
    n2:    DIAGS.map((_, j) => j === 3 ? 0.62 : 1),                 // D4, una vuelta
    n3:    DIAGS.map((_, j) => j === 3 ? 0.05 : 1),                 // D4 retirada
    n4:    DIAGS.map((_, j) => j === 1 ? 0.05 : 1),                 // D2 retirada
    doble: DIAGS.map((_, j) => (j === 2 || j === 5) ? 0.45 : 1)     // daño repartido
  };

  document.querySelectorAll('[data-preset]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PRESETS[btn.dataset.preset];
      if (!p) return;
      fijarAlfa(p, btn.dataset.preset);
      if (btn.dataset.preset === 'sana') est.hist = [];
    });
  });

  function marcarPreset(clave) {
    document.querySelectorAll('[data-preset]').forEach(b =>
      b.classList.toggle('activo', b.dataset.preset === clave));
  }

  elTemp.addEventListener('input', () => {
    est.temp = +elTemp.value;
    $('vl-temp').textContent = est.temp + ' °C';
  });
  elComp.addEventListener('change', () => { est.compensar = elComp.checked; });

  $('btn-linea-base').addEventListener('click', tomarLineaBase);
  $('btn-reset').addEventListener('click', () => {
    fijarAlfa(PRESETS.sana, 'sana');
    elTemp.value = 22; est.temp = 22; $('vl-temp').textContent = '22 °C';
    elComp.checked = true; est.compensar = true;
    est.hist = []; est.suave = null;
    tomarLineaBase();
  });

  /* ---------- 8. Línea base ---------- */
  function tomarLineaBase() {
    // Se captura sobre estructura sana y a temperatura de referencia: la
    // dispersión resultante es el ruido propio del instrumento, y es lo que
    // define la resolución real del sistema (prueba 9.2 del protocolo).
    const guardaAlfa = est.alfa.slice(), guardaT = est.temp;
    est.alfa = DIAGS.map(() => 1);
    est.temp = T_REF;
    const lotes = [];
    for (let k = 0; k < 120; k++) lotes.push(medir());
    est.alfa = guardaAlfa; est.temp = guardaT;

    const f = [], sigma = [];
    for (let i = 0; i < MODOS; i++) {
      const serie = lotes.map(l => l[i]);
      const m = serie.reduce((a, b) => a + b, 0) / serie.length;
      const sd = Math.sqrt(serie.reduce((a, b) => a + Math.pow(b - m, 2), 0) / serie.length);
      f.push(F0[i]); sigma.push(Math.max(sd, F0[i] * RUIDO * 0.8));
    }
    est.linea = { f, sigma };

    const av = $('aviso-base');
    if (av) {
      av.textContent = 'Línea base capturada · 120 ventanas · σ₁ = ' + sigma[0].toFixed(3) + ' Hz';
      av.style.color = 'var(--verde)';
      setTimeout(() => { av.style.color = ''; }, 2400);
    }
  }

  /* ---------- 9. Gráficas ---------- */
  function ajustarLienzo(cv) {
    const r = window.devicePixelRatio || 1;
    const w = cv.clientWidth, h = cv.clientHeight;
    if (cv.width !== Math.round(w * r) || cv.height !== Math.round(h * r)) {
      cv.width = Math.round(w * r); cv.height = Math.round(h * r);
    }
    const ctx = cv.getContext('2d');
    ctx.setTransform(r, 0, 0, r, 0, 0);
    return { ctx, w, h };
  }

  /** Espectro: picos lorentzianos en las frecuencias medidas, sobre ruido de fondo. */
  function pintarEspectro(fMed) {
    const lienzo = ajustarLienzo(cvEspectro);
    const ctx = lienzo.ctx, w = lienzo.w, h = lienzo.h;
    ctx.clearRect(0, 0, w, h);
    const F_MAX = 420;
    const xDe = f => (f / F_MAX) * w;

    ctx.strokeStyle = 'rgba(40,82,140,.22)'; ctx.lineWidth = 1;
    for (let f = 100; f < F_MAX; f += 100) {
      ctx.beginPath(); ctx.moveTo(xDe(f), 0); ctx.lineTo(xDe(f), h); ctx.stroke();
      ctx.fillStyle = 'rgba(111,132,155,.75)'; ctx.font = '9px monospace';
      ctx.fillText(f + ' Hz', xDe(f) + 4, h - 5);
    }

    // Dónde estaban los picos con la estructura sana
    if (est.linea) {
      ctx.strokeStyle = 'rgba(111,132,155,.45)';
      ctx.setLineDash([3, 4]);
      est.linea.f.forEach(f => {
        ctx.beginPath(); ctx.moveTo(xDe(f), h * .1); ctx.lineTo(xDe(f), h); ctx.stroke();
      });
      ctx.setLineDash([]);
    }

    const amp = [1, .62, .38, .24];
    const ancho = [2.6, 3.4, 4.6, 5.8];
    ctx.beginPath();
    for (let px = 0; px <= w; px++) {
      const f = (px / w) * F_MAX;
      let y = 0.035 + Math.random() * 0.012;
      fMed.forEach((fc, i) => { y += amp[i] / (1 + Math.pow((f - fc) / ancho[i], 2)); });
      const py = h - 8 - Math.min(1, y) * (h - 22);
      px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, 'rgba(58,111,176,.55)');
    grad.addColorStop(1, 'rgba(58,111,176,0)');
    ctx.fillStyle = grad; ctx.fill();
    ctx.strokeStyle = '#5b93d4'; ctx.lineWidth = 1.5; ctx.stroke();
  }

  /** Serie de tiempo del primer modo, con bandas 2σ y 3σ. */
  let escalaSerie = 0;
  function pintarSerie() {
    const lienzo = ajustarLienzo(cvSerie);
    const ctx = lienzo.ctx, w = lienzo.w, h = lienzo.h;
    ctx.clearRect(0, 0, w, h);
    if (!est.linea || est.hist.length < 2) return;

    const base = est.linea.f[0], sg = est.linea.sigma[0];
    // Escala adaptativa: con la estructura sana se ven el ruido y las bandas;
    // ante daño grande el eje se abre solo para no salirse del lienzo.
    const objetivo = est.hist.reduce((m, f) => Math.max(m, Math.abs(f - base)), sg * 3.6) * 2.5;
    escalaSerie = escalaSerie ? escalaSerie + (objetivo - escalaSerie) * 0.1 : objetivo;
    const yDe = f => h / 2 - ((f - base) / escalaSerie) * h;

    const banda = (k, color) => {
      ctx.fillStyle = color;
      ctx.fillRect(0, yDe(base + k * sg), w, yDe(base - k * sg) - yDe(base + k * sg));
    };
    banda(3, 'rgba(224,165,48,.08)');
    banda(2, 'rgba(47,179,122,.10)');

    [[2, 'rgba(224,165,48,.5)'], [3, 'rgba(224,85,63,.5)']].forEach(par => {
      ctx.strokeStyle = par[1]; ctx.setLineDash([4, 4]); ctx.lineWidth = 1;
      [base + par[0] * sg, base - par[0] * sg].forEach(v => {
        ctx.beginPath(); ctx.moveTo(0, yDe(v)); ctx.lineTo(w, yDe(v)); ctx.stroke();
      });
    });
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(111,132,155,.5)';
    ctx.beginPath(); ctx.moveTo(0, yDe(base)); ctx.lineTo(w, yDe(base)); ctx.stroke();

    ctx.beginPath();
    est.hist.forEach((f, i) => {
      const x = (i / (est.hist.length - 1)) * w;
      const y = Math.max(2, Math.min(h - 2, yDe(f)));
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = '#5b93d4'; ctx.lineWidth = 1.7; ctx.stroke();

    const ult = est.hist[est.hist.length - 1];
    ctx.beginPath();
    ctx.arc(w - 2, Math.max(2, Math.min(h - 2, yDe(ult))), 3.2, 0, 7);
    ctx.fillStyle = '#fff'; ctx.fill();

    ctx.fillStyle = 'rgba(111,132,155,.8)'; ctx.font = '9px monospace';
    ctx.fillText('+3σ', 4, yDe(base + 3 * sg) - 3);
    ctx.fillText('−3σ', 4, yDe(base - 3 * sg) + 10);
  }

  /* ---------- 10. Estado y diagnóstico ---------- */
  let sostenidoRojo = 0;

  function evaluar(f1c) {
    const desv = Math.abs(f1c - est.linea.f[0]) / est.linea.sigma[0];

    if (desv > 3) sostenidoRojo++; else sostenidoRojo = Math.max(0, sostenidoRojo - 1);

    // El rojo exige persistencia en varias ventanas: es lo que reduce las
    // falsas alarmas, y poder explicar ese criterio con números es
    // exactamente lo que un jurado técnico espera escuchar.
    let nivel = 'verde', texto = 'Comportamiento normal';
    if (desv > 3 && sostenidoRojo >= 4) { nivel = 'rojo'; texto = 'Cambio estructural probable'; }
    else if (desv > 2) { nivel = 'ambar'; texto = 'Anomalía a vigilar'; }

    elEstado.dataset.nivel = nivel;
    elEstado.querySelector('.estado__txt').textContent = texto;
    return { desv, nivel };
  }

  function pintarDiagnostico(diag, ev, f1c) {
    let html = '<h4>Diagnóstico del gemelo digital</h4>';

    if (!diag.hallazgos.length) {
      html += '<p class="veredicto">El modelo calibrado reproduce la medición sin necesidad de reducir ' +
              'la rigidez de ningún elemento. Desviación de <strong>' + ev.desv.toFixed(1) + 'σ</strong> ' +
              'respecto de la línea base compensada: dentro del ruido propio del instrumento.</p>';
    } else {
      const conf = diag.hallazgos.length > 1
        ? (diag.cos > 0.97 ? 'media' : 'baja')
        : (diag.cos > 0.985 ? 'alta' : diag.cos > 0.93 ? 'media' : 'baja');

      html += '<ul>';
      diag.hallazgos.forEach(h => {
        html += '<li>Rigidez de la diagonal <strong>' + h.id + '</strong> estimada en <strong>' +
                Math.round(h.alfa * 100) + ' %</strong> del valor de referencia</li>';
      });
      html += '</ul><p class="veredicto" style="margin-top:.55rem">Corrimiento del primer modo: <strong>' +
              ((f1c - est.linea.f[0]) / est.linea.f[0] * 100).toFixed(2) + ' %</strong> (' +
              ev.desv.toFixed(1) + 'σ). Confianza de localización: <strong>' + conf + '</strong>.';
      if (conf !== 'alta') {
        html += ' Con cuatro modos y ocho elementos la solución inversa no es única: el reparto entre ' +
                'elementos compatibles es una estimación probable, no una certeza. Más nodos la reducirían.';
      }
      html += '</p>';
    }

    if (!est.compensar && Math.abs(est.temp - T_REF) > 3) {
      html += '<p class="veredicto" style="color:var(--ambar);margin-top:.5rem">⚠ Compensación térmica ' +
              'desactivada: parte de este corrimiento es temperatura, no daño.</p>';
    }
    elDiagnostico.innerHTML = html;

    // Las barras se colorean por la rigidez ESTIMADA, no por la real: el
    // tablero solo puede mostrar lo que el modelo dedujo de la medición.
    elDiag.forEach((e, j) => { e.linea.style.stroke = colorRigidez(diag.alfa[j]); });
  }

  /* ---------- 11. Bucle ---------- */
  tomarLineaBase();
  fijarAlfa(PRESETS.sana, 'sana');

  let ultimo = 0;
  function bucle(t) {
    requestAnimationFrame(bucle);
    if (!est.corriendo || t - ultimo < 420) return;
    ultimo = t;

    const fMed = medir();                                    // ventana cruda
    est.suave = est.suave
      ? est.suave.map((v, i) => v + (fMed[i] - v) * SUAVE)    // promedio entre ventanas
      : fMed.slice();

    const fComp = est.suave.map(compensar);
    const f1c = fComp[0];

    const ev = evaluar(f1c);
    const diag = diagnosticar(fComp);

    est.hist.push(compensar(fMed[0]));       // la serie muestra la ventana cruda
    if (est.hist.length > 150) est.hist.shift();

    $('lec-f1').innerHTML = f1c.toFixed(2) + '<small>Hz</small>';
    $('lec-delta').innerHTML = ((f1c - est.linea.f[0]) / est.linea.f[0] * 100).toFixed(2) + '<small>%</small>';
    $('lec-sigma').innerHTML = ev.desv.toFixed(1) + '<small>σ</small>';
    $('lec-temp').innerHTML = est.temp.toFixed(0) + '<small>°C</small>';

    pintarEspectro(fMed);
    pintarSerie();
    pintarDiagnostico(diag, ev, f1c);
  }

  // El simulador solo consume ciclos mientras está a la vista
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(en => { est.corriendo = en[0].isIntersecting; }, { threshold: 0.02 })
      .observe(document.getElementById('simulador'));
  }
  requestAnimationFrame(bucle);
})();
