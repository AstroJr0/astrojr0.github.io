/**
 * effects.js — Cosmic visual effects for uvz0's portfolio
 */

/*
  @AUTHER       : AstroJr0 (github.com/AstroJr0)
  Date Created  : 09-12-2025
  Last Modified : 10-03-2026
*/

(function () {
  'use strict';

  // ─────────────────────────────────────────────
  //  SHARED KEYFRAME STYLES
  // ─────────────────────────────────────────────
  const css = document.createElement('style');
  css.textContent = `
    @keyframes ce-ring {
      0%   { transform: translate(-50%,-50%) scale(0); opacity: 1; }
      65%  { opacity: 0.55; }
      100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
    }
    @keyframes ce-planet-in {
      0%   { opacity:0; transform: scale(0) rotate(0deg);   }
      60%  { opacity:1; transform: scale(1.15) rotate(240deg); }
      100% { opacity:1; transform: scale(1) rotate(360deg); }
    }
    @keyframes ce-planet-pulse {
      0%,100% { box-shadow: var(--ps); }
      50%     { box-shadow: var(--ps-hi); }
    }
    @keyframes ce-msg-in {
      from { opacity:0; transform: translateY(22px) scale(0.88); }
      to   { opacity:1; transform: translateY(0)    scale(1); }
    }
    @keyframes ce-sv-flash {
      0%   { opacity: 1; }
      100% { opacity: 0; }
    }
    @keyframes ce-sv-shimmer {
      0%   { background-position: 0% 50%; }
      100% { background-position: 200% 50%; }
    }
    @keyframes ce-asteroid-fall {
      0% { transform: translate(60vw, -60vh) rotate(0deg); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translate(var(--tx), var(--ty)) rotate(360deg); opacity: 1; }
    }

    /* ── asteroid ── */
    .ce-asteroid {
      position: fixed; width: 28px; height: 28px;
      background: radial-gradient(circle at 30% 30%, #fcd34d, #ea580c, #7c2d12);
      border-radius: 50%;
      box-shadow: 0 0 16px #ea580c, -6px -6px 20px rgba(239,68,68,0.7);
      z-index: 9999; pointer-events: none;
      top: 0; left: 0;
      margin-left: -14px; margin-top: -14px;
    }

    /* ── overlay shared ── */
    .ce-full-overlay {
      position: fixed; inset: 0;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      text-align: center; padding: 24px;
      pointer-events: none; z-index: 9985;
    }
    .ce-msg-title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(20px, 3vw, 40px);
      font-weight: 700; letter-spacing: -0.03em;
      background: linear-gradient(90deg, #fbbf24, #e879f9, #22d3ee, #fbbf24);
      background-size: 200% 100%;
      -webkit-background-clip: text; background-clip: text; color: transparent;
      filter: drop-shadow(0 0 24px rgba(251,191,36,0.55));
      animation: ce-msg-in 0.55s cubic-bezier(0.2,0.9,0.2,1) both,
                 ce-sv-shimmer 2.4s 0.6s linear infinite;
    }
    .ce-msg-sub {
      margin-top: 12px;
      font-family: 'Space Grotesk', sans-serif; font-size: 16px;
      color: rgba(232,232,255,0.6);
      animation: ce-msg-in 0.55s 0.18s cubic-bezier(0.2,0.9,0.2,1) both;
    }

    /* ── black hole canvas ── */
    .ce-bh-canvas {
      position: fixed; inset: 0;
      z-index: 9970; pointer-events: none;
      display: block;
    }

    /* ── planet ── */
    .ce-planet {
      position: fixed; border-radius: 50%;
      z-index: 8500; pointer-events: auto;
      cursor: pointer;
      animation: ce-planet-in 0.55s cubic-bezier(0.2,0.9,0.2,1) both,
                 ce-planet-pulse 3s 0.6s ease-in-out infinite;
      transition: transform 0.2s ease;
    }
    .ce-planet:hover { transform: scale(1.14); }
  `;
  document.head.appendChild(css);

  // ─────────────────────────────────────────────
  //  PARALLAX
  // ─────────────────────────────────────────────
  (function initParallax() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    canvas.style.cssText += `
      width: calc(100% + 60px) !important;
      height: calc(100% + 60px) !important;
      top: -30px !important;
      left: -30px !important;
    `;
    let pX = 0, pY = 0, tX = 0, tY = 0;
    const STRENGTH = 24;

    window.addEventListener('pointermove', e => {
      tX = (e.clientX / window.innerWidth  - 0.5) * -STRENGTH;
      tY = (e.clientY / window.innerHeight - 0.5) * -STRENGTH;
    }, { passive: true });

    function tick() {
      pX += (tX - pX) * 0.055;
      pY += (tY - pY) * 0.055;
      canvas.style.transform = `translate(${pX.toFixed(2)}px,${pY.toFixed(2)}px)`;
      requestAnimationFrame(tick);
    }
    tick();
  })();

  // ─────────────────────────────────────────────
  //  NEBULA CANVAS 
  // ─────────────────────────────────────────────
  (function initNebula() {
    const nc  = document.createElement('canvas');
    nc.style.cssText = 'position:fixed;inset:0;z-index:0;pointer-events:none;';
    const sf  = document.getElementById('starfield');
    sf ? document.body.insertBefore(nc, sf) : document.body.prepend(nc);

    let W, H, blobs = [];
    const ctx = nc.getContext('2d');

    function resize() {
      W = nc.width  = window.innerWidth;
      H = nc.height = window.innerHeight;
      blobs = Array.from({ length: 8 }, (_, i) => ({
        x:   Math.random() * W, y:   Math.random() * H,
        r:   180 + Math.random() * 340,
        hue: [260, 188, 270, 200, 188, 300, 260, 220][i],
        a:   0.011 + Math.random() * 0.017,
        dx:  (Math.random() - 0.5) * 0.1,
        dy:  (Math.random() - 0.5) * 0.1,
      }));
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const b of blobs) {
        b.x = (b.x + b.dx + W) % W;
        b.y = (b.y + b.dy + H) % H;
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        g.addColorStop(0,    `hsla(${b.hue},68%,54%,${b.a * 2.2})`);
        g.addColorStop(0.42, `hsla(${b.hue},55%,42%,${b.a})`);
        g.addColorStop(1,    'transparent');
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    draw();
  })();

  // ─────────────────────────────────────────────
  //  HELPERS
  // ─────────────────────────────────────────────
  function burstRings(cx, cy, colors, sizes, durBase) {
    sizes.forEach((sz, i) => {
      const d = document.createElement('div');
      d.style.cssText = `
        position:fixed; border-radius:50%; pointer-events:none; z-index:9990;
        left:${cx}px; top:${cy}px;
        width:${sz}px; height:${sz}px;
        border: 2px solid ${colors[i % colors.length]};
        box-shadow: 0 0 28px ${colors[i % colors.length]};
        animation: ce-ring ${(durBase || 0.88) + i * 0.1}s cubic-bezier(0.1,0.8,0.2,1) ${i * 95}ms forwards;
      `;
      document.body.appendChild(d);
      d.addEventListener('animationend', () => d.remove(), { once: true });
    });
  }

  function showMessage(title, sub, bgOpaque, cb, delay) {
    delay = delay ?? 3000;
    const el = document.createElement('div');
    el.className = 'ce-full-overlay';
    if (bgOpaque) el.style.background = 'rgba(8,8,26,0.94)';
    el.innerHTML = `<div class="ce-msg-title">${title}</div><div class="ce-msg-sub">${sub}</div>`;
    document.body.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s ease';
      el.style.opacity = '0';
      setTimeout(() => { el.remove(); cb?.(); }, 850);
    }, delay);
    return el;
  }

  function flash(color) {
    const f = document.createElement('div');
    f.style.cssText = `position:fixed;inset:0;z-index:9995;pointer-events:none;background:${color};animation:ce-sv-flash 0.5s ease forwards;`;
    document.body.appendChild(f);
    f.addEventListener('animationend', () => f.remove(), { once: true });
  }

  // ─────────────────────────────────────────────
  //  SUPERNOVA
  // ─────────────────────────────────────────────
  (function initSupernovaKeyword() {
    let buf = '';
    const KW = 'supernova';
    window.addEventListener('keydown', e => {
      const tag = (document.activeElement?.tagName ?? '');
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        buf = (buf + e.key.toLowerCase()).slice(-KW.length);
        if (buf === KW) { buf = ''; triggerSupernova(); }
      } else { buf = ''; }
    }, { passive: true });
  })();

  function triggerSupernova(cx, cy) {
    // Default to the exact center of the current viewport 
    cx = cx ?? window.innerWidth  * 0.5;
    cy = cy ?? window.innerHeight * 0.5;

    flash('rgba(255,252,200,0.9)');

    const colors = [
      'rgba(251,191,36,0.9)', 'rgba(239,68,68,0.8)',
      'rgba(232,121,249,0.75)', 'rgba(34,211,238,0.7)', 'rgba(139,92,246,0.65)',
    ];
    burstRings(cx, cy, colors, [100, 240, 440, 680, 1000], 0.82);

    // Darken and blur the background to pop the text
    const mainEl = document.getElementById('main');
    if (mainEl) {
      mainEl.style.transition = 'filter 0.5s ease';
      mainEl.style.filter = 'blur(10px) brightness(0.3) contrast(1.2)';
    }

    showMessage(
      'Congratulations.',
      'You have destabilized the universe.',
      false, 
      () => {
        if (mainEl) {
          mainEl.style.filter = '';
          setTimeout(() => mainEl.style.transition = '', 500);
        }
      }, 
      3600
    );
  }

  // ─────────────────────────────────────────────
  //  SPAWN PLANET
  // ─────────────────────────────────────────────
  function spawnPlanet() {
    const hue1 = Math.floor(Math.random() * 360);
    const hue2 = (hue1 + 55 + Math.floor(Math.random() * 90)) % 360;
    const sz   = 52 + Math.random() * 60;
    const left = 10 + Math.random() * 74;
    const top  = 14 + Math.random() * 62;
    const glow = `0 0 ${sz * 0.55}px hsl(${hue1},80%,62%), inset -8px -8px 20px rgba(0,0,0,0.68)`;
    const glowHi = `0 0 ${sz * 1.1}px hsl(${hue1},90%,70%), inset -8px -8px 20px rgba(0,0,0,0.68)`;

    const p = document.createElement('div');
    p.className = 'ce-planet';
    p.style.cssText = `
      left: ${left}vw; top: ${top}vh;
      width: ${sz}px; height: ${sz}px;
      background: radial-gradient(circle at 33% 33%, hsl(${hue1},76%,74%), hsl(${hue2},62%,26%));
      --ps:    ${glow};
      --ps-hi: ${glowHi};
      box-shadow: ${glow};
    `;
    p.title = 'click to trigger supernova';

    p.addEventListener('click', () => {
      const r  = p.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      p.style.transition = 'transform 0.28s ease, opacity 0.28s ease';
      p.style.transform  = 'scale(0.05)';
      p.style.opacity    = '0';
      setTimeout(() => { p.remove(); triggerSupernova(cx, cy); }, 260);
    });

    document.body.appendChild(p);
  }

  // ─────────────────────────────────────────────
  //  ASTEROIDS ENGINE (launch-chaos)
  // ─────────────────────────────────────────────
  function triggerAsteroids() {
    const els = Array.from(document.querySelectorAll(
      'header.topbar, .section, footer.footer, .card, .kicker, .h1, .h2, .lede, .ctas, .stats'
    )).filter(el => el.getBoundingClientRect().width > 10);

    let i = 0;
    function dropNext() {
      if (i >= els.length) {
        setTimeout(() => {
          showMessage('congrats, universe destroyed', 'loading backup...', true, () => {
            els.forEach(el => {
              el.style.opacity = '';
              el.style.transform = '';
              el.style.transition = '';
            });
          }, 3500);
        }, 800);
        return;
      }

      const el = els[i];
      const r = el.getBoundingClientRect();
      const tx = r.left + r.width / 2;
      const ty = r.top + r.height / 2;

      const ast = document.createElement('div');
      ast.className = 'ce-asteroid';
      ast.style.setProperty('--tx', `${tx}px`);
      ast.style.setProperty('--ty', `${ty}px`);
      ast.style.animation = 'ce-asteroid-fall 0.45s cubic-bezier(0.4, 0, 1, 1) forwards';
      document.body.appendChild(ast);

      ast.addEventListener('animationend', () => {
        ast.remove();
        burstRings(tx, ty, ['#ea580c', '#ef4444', '#b91c1c'], [40, 100, 160], 0.4);
        el.style.transition = 'transform 0.2s, opacity 0.2s';
        el.style.transform = 'scale(0.7)';
        el.style.opacity = '0';
        i++;
        setTimeout(dropNext, 180); 
      }, { once: true });
    }
    dropNext();
  }

  // ─────────────────────────────────────────────
  //  BLACK HOLE ENGINE
  // ─────────────────────────────────────────────
  let bhRunning  = false;
  let bhLockedAt = 0;          // timestamp when bhRunning was last set true
  const BH_TIMEOUT = 18000;   // force-unlock after 18 s no matter what

  function forceUnlockBH(canvas, elements) {
    if (canvas)   { try { canvas.remove(); } catch (_) {} }
    if (elements) elements.forEach(el => {
      el.style.transform  = '';
      el.style.opacity    = '';
      el.style.transition = '';
    });
    bhRunning = false;
  }

  function triggerBlackHole(opts) {
    opts = opts || {};
    // force:true lets show-rare-event always work even if a previous run crashed
    if (opts.force) {
      // Remove any orphaned BH canvas from a previous failed run
      document.querySelectorAll('.ce-bh-canvas').forEach(c => c.remove());
      bhRunning = false;
    }
    // Auto-clear a lock that's been stuck for too long (crashed animation)
    if (bhRunning && (performance.now() - bhLockedAt) > BH_TIMEOUT) {
      bhRunning = false;
    }
    if (bhRunning) return;
    bhRunning  = true;
    bhLockedAt = performance.now();

    // Immediate visible feedback — dark flash so the user knows it started
    flash('rgba(0,0,0,0.55)');

    const slowSingle = !!opts.slowSingle;
    const doWH       = opts.whitehole != null ? !!opts.whitehole : (Math.random() < 0.01);
    const spd        = 1.0;

    const CX = window.innerWidth  * 0.5;
    const CY = window.innerHeight * 0.5;
    const maxR = Math.min(window.innerWidth, window.innerHeight) * 0.18;

    const swallowedEls = Array.from(document.querySelectorAll(
      'header.topbar, .section, footer.footer, .card, .kicker, .h1, .h2, .lede, .ctas, .stats'
    )).filter(el => el.getBoundingClientRect().width > 10);

    // ── Timeline Adjustments ──
    const T = {
      swallowStart : 900,
      swallowDur   : slowSingle ? 2400 : 1400,
      elemDelay    : slowSingle ? 800 : 30,  // Single slow delay vs chaotic delay
      growDur      : 2200,
      collapseDur  : 900,
    };
    
    // Hold it open dynamically if consuming slowly
    T.holdDur = slowSingle ? (swallowedEls.length * T.elemDelay + 1000) : 1200;
    const totalBH = T.growDur + T.holdDur + T.collapseDur;

    // ── BH Canvas ──
    const bhc = document.createElement('canvas');
    bhc.className = 'ce-bh-canvas';
    bhc.width  = window.innerWidth;
    bhc.height = window.innerHeight;
    document.body.appendChild(bhc);
    const bx = bhc.getContext('2d');

    const disc = Array.from({ length: 170 }, () => ({
      angle : Math.random() * Math.PI * 2,
      r     : maxR * (1.6 + Math.random() * 2.2),
      speed : 0.007 + Math.random() * 0.018,
      alpha : 0.28 + Math.random() * 0.65,
      hue   : Math.random() < 0.55 ? 18 + Math.random() * 55 : 255 + Math.random() * 75,
      sz    : 0.8 + Math.random() * 2.6,
    }));

    const startTime = performance.now();

    function drawBH(now) {
      if (!bhRunning) return;
      try {
        const elapsed  = now - startTime;
        const growFrac = Math.min(1, elapsed / T.growDur);
        const holdEnd  = T.growDur + T.holdDur;
        const collFrac = elapsed > holdEnd ? Math.min(1, (elapsed - holdEnd) / T.collapseDur) : 0;
        const radius   = maxR * growFrac;

        bx.clearRect(0, 0, bhc.width, bhc.height);

        const vg = bx.createRadialGradient(CX, CY, 0, CX, CY, Math.hypot(bhc.width, bhc.height) * 0.7);
        vg.addColorStop(0,    `rgba(0,0,0,${Math.min(0.72, growFrac * 0.72)})`);
        vg.addColorStop(0.28, `rgba(4,4,18,${growFrac * 0.38})`);
        vg.addColorStop(1,    'rgba(0,0,0,0)');
        bx.fillStyle = vg;
        bx.fillRect(0, 0, bhc.width, bhc.height);

        // Guard: skip halo rings when radius is still effectively zero.
        // createRadialGradient throws a DOMException when both radii are 0,
        // which silently kills the rAF loop and permanently locks bhRunning.
        if (radius > 0.5) {
          for (let h = 3; h >= 1; h--) {
            const hr = radius * (h * 1.2 + 1.4);
            const ha = (0.065 - h * 0.018) * growFrac;
            const hg = bx.createRadialGradient(CX, CY, hr * 0.7, CX, CY, hr * 1.35);
            hg.addColorStop(0,   'rgba(34,211,238,0)');
            hg.addColorStop(0.5, `rgba(34,211,238,${ha})`);
            hg.addColorStop(1,   'rgba(34,211,238,0)');
            bx.beginPath(); bx.arc(CX, CY, hr * 1.35, 0, Math.PI * 2);
            bx.fillStyle = hg; bx.fill();
          }
        }

        const fade = Math.max(0, 1 - collFrac * 2.2);
        for (const p of disc) {
          if (collFrac > 0) {
            p.r     = Math.max(radius * 0.4, p.r - collFrac * 1.8);
            p.speed *= 1 + collFrac * 0.06;
          }
          p.angle += p.speed;
          const px = CX + Math.cos(p.angle) * p.r;
          const py = CY + Math.sin(p.angle) * p.r * 0.36;
          bx.beginPath(); bx.arc(px, py, p.sz, 0, Math.PI * 2);
          bx.fillStyle = `hsla(${p.hue},90%,80%,${p.alpha * growFrac * fade})`;
          bx.fill();
        }

        // Guard corona and event-horizon gradients against zero outer radius
        if (radius > 0.5) {
          const cor = bx.createRadialGradient(CX, CY, radius * 0.82, CX, CY, radius * 3.6);
          cor.addColorStop(0,    'transparent');
          cor.addColorStop(0.28, `rgba(139,92,246,${0.22 * growFrac})`);
          cor.addColorStop(0.65, `rgba(232,121,249,${0.09 * growFrac})`);
          cor.addColorStop(1,    'transparent');
          bx.beginPath(); bx.arc(CX, CY, radius * 3.6, 0, Math.PI * 2);
          bx.fillStyle = cor; bx.fill();

          const bhg = bx.createRadialGradient(CX, CY, 0, CX, CY, radius);
          bhg.addColorStop(0,    'rgba(0,0,0,1)');
          bhg.addColorStop(0.82, 'rgba(0,0,0,0.97)');
          bhg.addColorStop(0.95, 'rgba(8,0,22,0.35)');
          bhg.addColorStop(1,    'transparent');
          bx.beginPath(); bx.arc(CX, CY, radius, 0, Math.PI * 2);
          bx.fillStyle = bhg; bx.fill();
        }

        if (growFrac > 0.3 && radius > 0.5) {
          bx.beginPath(); bx.arc(CX, CY, radius, 0, Math.PI * 2);
          bx.strokeStyle = `rgba(232,121,249,${0.8 * growFrac * (1 - collFrac)})`;
          bx.lineWidth   = 2;
          bx.shadowColor = 'rgba(232,121,249,0.95)';
          bx.shadowBlur  = 22;
          bx.stroke();
          bx.shadowBlur = 0;
        }

        if (elapsed >= totalBH) {
          const fa = Math.min(1, (elapsed - totalBH) / 400);
          bx.fillStyle = `rgba(8,8,26,${fa})`;
          bx.fillRect(0, 0, bhc.width, bhc.height);
          if (fa >= 1) {
            onBHComplete(bhc, swallowedEls, doWH);
            return;
          }
        }

        requestAnimationFrame(drawBH);

      } catch (err) {
        // Any canvas error must not leave bhRunning stuck forever
        console.warn('[CE] drawBH error:', err);
        forceUnlockBH(bhc, swallowedEls);
      }
    }
    requestAnimationFrame(drawBH);

    setTimeout(() => {
      swallowedEls.forEach((el, i) => {
        const r   = el.getBoundingClientRect();
        const ecx = r.left + r.width  / 2;
        const ecy = r.top  + r.height / 2;
        const dx  = CX - ecx;
        const dy  = CY - ecy;
        const dur = T.swallowDur / 1000;
        const dly = i * T.elemDelay;

        el.style.transition = `transform ${dur}s ${dly}ms cubic-bezier(0.55,0,0.9,0.5), opacity ${dur}s ${dly}ms ease`;
        el.style.transformOrigin = `${ecx - r.left}px ${ecy - r.top}px`;
        el.style.transform = `translate(${dx * 0.10}px,${dy * 0.10}px) scale(0.94)`;

        setTimeout(() => {
          const rot = (Math.random() - 0.5) * 660;
          el.style.transform = `translate(${dx}px,${dy}px) scale(0.01) rotate(${rot}deg)`;
          el.style.opacity   = '0';
        }, dly + 60);
      });
    }, T.swallowStart);
  }

  function onBHComplete(canvas, elements, doWhitehole) {
    if (doWhitehole) {
      // Remove the black hole canvas immediately — reusing it causes the white
      // hole to paint onto a transparent surface that blends invisibly into the
      // dark page background (clearRect → transparent, not white).
      try { canvas.remove(); } catch (_) {}
      triggerWhiteHole(elements);
    } else {
      showMessage(
        'Congrats! You have destroyed the universe.',
        'restoring from backup…',
        true,
        () => resetUniverse(canvas, elements),
        2800
      );
    }
  }

  function resetUniverse(canvas, elements) {
    if(canvas) {
      canvas.style.transition = 'opacity 0.9s ease';
      canvas.style.opacity    = '0';
      setTimeout(() => canvas.remove(), 950);
    }

    elements.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition     = 'transform 0.75s cubic-bezier(0.2,0.9,0.2,1), opacity 0.65s ease';
        el.style.transform      = '';
        el.style.opacity        = '';
      }, i * 24);
    });

    const cleanupDelay = elements.length * 24 + 900;
    setTimeout(() => {
      elements.forEach(el => {
        el.style.cssText = el.style.cssText
          .replace(/transition:[^;]+;?/gi, '')
          .replace(/transform:[^;]+;?/gi, '')
          .replace(/opacity:[^;]+;?/gi, '')
          .replace(/transform-origin:[^;]+;?/gi, '');
      });
      bhRunning = false;
    }, cleanupDelay);
  }

  function triggerWhiteHole(elements) {
    // White hole gets its OWN canvas, starting from a solid white base so the
    // expanding burst is immediately visible against the dark page.
    // (Reusing bhCanvas was the bug: clearRect → transparent pixels, which
    //  are invisible over the dark #08081a page background.)

    const CX = window.innerWidth  / 2;
    const CY = window.innerHeight / 2;
    const W  = window.innerWidth;
    const H  = window.innerHeight;

    // Create a fresh canvas
    const whc = document.createElement('canvas');
    whc.className = 'ce-bh-canvas';   // same CSS: position:fixed; inset:0; z-index:9970
    whc.width  = W;
    whc.height = H;
    // Start fully opaque-dark so it blends seamlessly after the black-hole fade
    whc.style.background = '#08081a';
    document.body.appendChild(whc);
    const ctx = whc.getContext('2d');

    // Seed the canvas as opaque dark so first frame isn't a jarring flash
    ctx.fillStyle = '#08081a';
    ctx.fillRect(0, 0, W, H);

    const startTime = performance.now();
    const wDur = 2000;

    // Safety net — releases bhRunning if animation crashes silently
    const safetyTimer = setTimeout(() => forceUnlockBH(whc, elements), wDur + 5000);

    function cleanup() {
      clearTimeout(safetyTimer);
      whc.style.transition = 'opacity 1.1s ease';
      whc.style.opacity    = '0';
      setTimeout(() => {
        try { whc.remove(); } catch (_) {}
        elements.forEach(el => {
          el.style.cssText = el.style.cssText
            .replace(/transition:[^;]+;?/gi, '')
            .replace(/transform:[^;]+;?/gi, '')
            .replace(/opacity:[^;]+;?/gi, '')
            .replace(/transform-origin:[^;]+;?/gi, '');
        });
        bhRunning = false;
      }, 1200);
    }

    function drawWH(now) {
      try {
        const t  = Math.min(1, (now - startTime) / wDur);
        const t2 = t * t;  // ease-in curve

        // Fill: transition from dark → transparent as the white burst expands
        ctx.clearRect(0, 0, W, H);
        const bgAlpha = Math.max(0, 1 - t * 1.8);
        ctx.fillStyle = `rgba(8,8,26,${bgAlpha})`;
        ctx.fillRect(0, 0, W, H);

        // Expanding white-hole burst (starts tiny, expands past screen edges)
        const r = Math.max(W, H) * 2.2 * t2;
        if (r > 1) {
          // Outer soft purple halo
          const outerR = r * 1.3;
          if (outerR > 1) {
            const halo = ctx.createRadialGradient(CX, CY, r * 0.9, CX, CY, outerR);
            halo.addColorStop(0,   `rgba(139,92,246,${0.55 * (1 - t)})`);
            halo.addColorStop(0.5, `rgba(232,121,249,${0.3  * (1 - t)})`);
            halo.addColorStop(1,   'transparent');
            ctx.beginPath(); ctx.arc(CX, CY, outerR, 0, Math.PI * 2);
            ctx.fillStyle = halo; ctx.fill();
          }

          // Main white core burst
          const coreAlpha = Math.max(0, 1 - t * 0.75);
          const wg = ctx.createRadialGradient(CX, CY, 0, CX, CY, r);
          wg.addColorStop(0,    `rgba(255,255,255,${coreAlpha})`);
          wg.addColorStop(0.15, `rgba(220,240,255,${coreAlpha * 0.9})`);
          wg.addColorStop(0.4,  `rgba(180,200,255,${coreAlpha * 0.6})`);
          wg.addColorStop(0.7,  `rgba(139,92,246,${coreAlpha * 0.25})`);
          wg.addColorStop(1,    'transparent');
          ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI * 2);
          ctx.fillStyle = wg; ctx.fill();

          // Sharp bright ring at the wavefront
          const ringAlpha = Math.max(0, 0.9 - t * 0.9);
          if (ringAlpha > 0.01) {
            ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(200,230,255,${ringAlpha})`;
            ctx.lineWidth   = 3 + (1 - t) * 6;
            ctx.shadowColor = 'rgba(200,230,255,0.9)';
            ctx.shadowBlur  = 28;
            ctx.stroke();
            ctx.shadowBlur  = 0;
          }
        }

        if (t < 1) {
          requestAnimationFrame(drawWH);
        } else {
          // Burst rings for impact at completion
          burstRings(CX, CY,
            ['rgba(200,230,255,0.9)', 'rgba(139,92,246,0.7)', 'rgba(232,121,249,0.6)', 'rgba(34,211,238,0.5)'],
            [120, 280, 520, 900], 0.7
          );

          showMessage(
            'A new universe has been born.',
            'the void gives back what was taken.',
            false, null, 3200
          );

          // Restore swallowed elements
          elements.forEach((el, i) => {
            setTimeout(() => {
              el.style.transition = `transform 0.9s ${i * 28}ms cubic-bezier(0.2,0.9,0.2,1), opacity 0.7s ${i * 28}ms ease`;
              el.style.transform  = '';
              el.style.opacity    = '1';
            }, 80 + i * 10);
          });

          setTimeout(cleanup, 1600);
        }
      } catch (err) {
        console.warn('[CE] white hole draw error:', err);
        clearTimeout(safetyTimer);
        forceUnlockBH(whc, elements);
      }
    }

    // Slight delay so the dark canvas is visible for one frame before bursting,
    // giving a clear visual beat between black hole end and white hole start.
    flash('rgba(255,255,255,0.7)');
    setTimeout(() => requestAnimationFrame(drawWH), 80);
  }

  // ─────────────────────────────────────────────
  //  EXPOSE — window.CE for terminal integration
  // ─────────────────────────────────────────────
  window.CE = {
    triggerSupernova,
    triggerBlackHole,
    spawnPlanet,

    cmds: {
      'spawn-planet': () => {
        spawnPlanet();
        return [
          ['ts', '  ✦ planet materialising in sector unknown...'],
          ['to', '  <span class="th">click it</span> to watch it explode.'],
          ['to', ''],
        ];
      },
      'summon-blackhole': () => {
        triggerBlackHole({ slowSingle: true });
        return [
          ['tw', '  ⚠  initiating gravitational collapse...'],
          ['ts', '  consuming elements one by one. brace yourself.'],
          ['to', ''],
        ];
      },
      'launch-chaos': () => {
        triggerAsteroids();
        return [
          ['tw', '  ⚠  incoming asteroid shower detected...'],
          ['to', ''],
        ];
      },
      'show-rare-event': () => {
        triggerBlackHole({ whitehole: true, force: true });
        return [
          ['ts', '  ✦ triggering rare event: black hole → white hole'],
          ['tw', '  the void wakes. and then it gives back.'],
          ['to', ''],
        ];
      },
    },
  };

})();