import React, { useState, useEffect, useRef } from 'react';
import type { ElementType, RefObject } from 'react';

// --- Interfaces ---
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  [key: string]: any; // Para permitir el paso de props extra (rest)
}

interface ParticleFieldProps {
  density?: number;
  motionLevel?: string;
}

interface TerminalLine {
  t: 'cmd' | 'ok' | 'out';
  s: string;
}

interface TerminalTyperProps {
  lines: TerminalLine[];
  motionLevel?: string;
}

/* ---------- Reveal: IntersectionObserver + CSS transition ---------- */
export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (document.body.classList.contains('motion-min')) { el.classList.add('in'); return; }
    
    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      el.classList.add('in');
      io && io.disconnect();
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };

    // Primary: IntersectionObserver
    let io: IntersectionObserver | null = null;
    try {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) show(); },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      io.observe(el);
    } catch (e) { /* fall through to scroll fallback */ }

    // Fallback: scroll/resize + rAF check
    let raf: number;
    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.92 && r.bottom > 0;
    };
    
    const check = () => { 
      cancelAnimationFrame(raf); 
      raf = requestAnimationFrame(() => { if (inView()) show(); }); 
    };

    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();

    return () => {
      done = true;
      io && io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return (
    <Tag ref={ref as any} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- Señales de carga (module-level, race-safe) ---------- */
function makeSignal(): [() => void, () => Promise<void>] {
  let ready = false;
  const resolvers: Array<() => void> = [];
  const signal = () => { if (ready) return; ready = true; resolvers.splice(0).forEach(r => r()); };
  const wait   = (): Promise<void> => ready ? Promise.resolve() : new Promise(r => resolvers.push(r));
  return [signal, wait];
}
const [signalParticlesReady, waitForParticles] = makeSignal();
export const [signalAppReady, waitForAppReady] = makeSignal();

/* ---------- ParticleField: network of drifting nodes ---------- */
export function ParticleField({ density = 60, motionLevel = 'max' }: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number, w: number, h: number, dpr: number;
    let nodes: Array<{ x: number, y: number, vx: number, vy: number, r: number }> = [];
    let running = true;
    
    const mouse = { x: -9999, y: -9999 };
    const speed = motionLevel === 'max' ? 1 : motionLevel === 'elegant' ? 0.4 : 0;
    const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2dd4bf';

    function resize() {
      if (!canvas || !canvas.parentElement) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      
      const count = Math.min(240, Math.round((w * h) / 13000 * (density / 60)));
      nodes = Array.from({ length: Math.max(14, count) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.6 + 0.7,
      }));
    }

    let firstFrame = true;
    function frame() {
      if (!running || !ctx) return;
      ctx.clearRect(0, 0, w, h);
      const col = accent();
      const LINK = 130;

      for (const n of nodes) {
        if (speed > 0) {
          n.x += n.vx * speed; n.y += n.vy * speed;
          const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 25600) { n.x += dx / Math.sqrt(d2 + 1) * 2.4; n.y += dy / Math.sqrt(d2 + 1) * 2.4; }
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20;
          if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.22;
            ctx.strokeStyle = col;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 0.8;
      ctx.fillStyle = col;
      for (const n of nodes) { 
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); 
      }
      ctx.globalAlpha = 1;
      
      if (firstFrame) { firstFrame = false; signalParticlesReady(); }
      if (speed > 0) raf = requestAnimationFrame(frame);
    }

    function onMouse(e: PointerEvent) {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }

    resize(); frame();
    window.addEventListener('resize', resize);
    canvas.parentElement.addEventListener('pointermove', onMouse as EventListener);
    
    return () => {
      running = false; cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (canvas && canvas.parentElement) {
        canvas.parentElement.removeEventListener('pointermove', onMouse as EventListener);
      }
    };
  }, [density, motionLevel]);

  return <canvas ref={canvasRef} className="pfield" aria-hidden="true"></canvas>;
}

/* ---------- TerminalTyper: types lines sequentially, loops ---------- */
export function TerminalTyper({ lines, motionLevel = 'max' }: TerminalTyperProps) {
  const [done, setDone] = useState<TerminalLine[]>([]);
  const [cur, setCur] = useState<string | null>('');
  const [li, setLi] = useState<number>(0);

  useEffect(() => {
    if (motionLevel === 'min') { setDone(lines); setCur(null); return; }
    
    let cancelled = false;
    let timer: number | ReturnType<typeof setTimeout>;
    
    function typeLine(idx: number) {
      if (cancelled) return;
      if (idx >= lines.length) {
        timer = setTimeout(() => { if (!cancelled) { setDone([]); setLi(0); typeLine(0); } }, 5200);
        return;
      }
      
      const line = lines[idx];
      const isCmd = line.t === 'cmd';
      let ci = 0;
      
      function tick() {
        if (cancelled) return;
        ci++;
        setCur(line.s.slice(0, ci));
        if (ci < line.s.length) {
          timer = setTimeout(tick, isCmd ? 34 : 8);
        } else {
          timer = setTimeout(() => {
            if (cancelled) return;
            setDone(d => [...d, line]); setCur(''); setLi(idx + 1); typeLine(idx + 1);
          }, isCmd ? 320 : 420);
        }
      }
      timer = setTimeout(tick, isCmd ? 500 : 150);
    }

    setDone([]); setCur(''); setLi(0);
    typeLine(0);
    
    return () => { cancelled = true; clearTimeout(timer as number); };
  }, [lines, motionLevel]);

  const renderLine = (l: TerminalLine, key: number | string, partial?: string | null) => {
    const text = partial != null ? partial : l.s;
    if (l.t === 'cmd') return <div key={key} className="ln-cmd"><span className="prompt">$</span>{text}</div>;
    if (l.t === 'ok') return <div key={key} className="ln-ok">{text}</div>;
    return <div key={key} className="ln-out">{text}</div>;
  };

  return (
    <div className="term-body" aria-hidden="true">
      {done.map((l, i) => renderLine(l, i))}
      {cur !== null && li < lines.length && renderLine(lines[li], 'cur', cur)}
      <span className="term-cursor"></span>
    </div>
  );
}

/* ---------- useCountdown: days/hours/min until a date ---------- */
export function useCountdown(targetIso: string) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      mins: Math.floor(diff / 60000) % 60,
    };
  };
  
  const [v, setV] = useState(calc);
  
  useEffect(() => {
    const id = setInterval(() => setV(calc()), 30000);
    return () => clearInterval(id);
  }, [targetIso]);
  
  return v;
}

/* ---------- useScrollDraw: stroke-draws an SVG path on scroll ---------- */
export function useScrollDraw(pathRef: RefObject<SVGPathElement | null>, sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const path = pathRef.current;
    const section = sectionRef.current;
    if (!path || !section) return;
    
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    if (document.body.classList.contains('motion-min')) { path.style.strokeDashoffset = '0'; return; }
    
    path.style.strokeDashoffset = `${len}`;
    let raf: number;
    
    function update() {
      const r = section!.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.9)));
      path!.style.strokeDashoffset = `${len * (1 - p)}`;
    }
    
    function onScroll() { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }
    
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathRef, sectionRef]);
}

/* ---------- staggered word entrance (uses Motion if available) ---------- */
export function useWordEntrance(rootRef: RefObject<HTMLElement | null>, motionLevel: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    
    const els = root.querySelectorAll('[data-hw]') as NodeListOf<HTMLElement>;
    
    // Asumimos que Motion podría ser inyectado globalmente, o deberías importarlo de 'framer-motion'
    const Motion = (window as any).Motion; 

    if (motionLevel === 'min' || !Motion) {
      els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }
    
    try {
      Motion.animate(els,
        { opacity: [0, 1], transform: ['translateY(34px)', 'translateY(0px)'] },
        { delay: Motion.stagger(0.09, { startDelay: 0.15 }), duration: 0.85, ease: [0.22, 1, 0.36, 1] }
      );
    } catch (e) {
      els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    }
  }, [motionLevel, rootRef]);
}

/* ---------- smooth anchor scroll (no scrollIntoView) ---------- */
export function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: document.body.classList.contains('motion-min') ? 'auto' : 'smooth' });
}

/* ---------- ScrambleText: decode animation on viewport entry ---------- */
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#@$%&|~·';

export function ScrambleText({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el || document.body.classList.contains('motion-min')) return;

    let rafId: number;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const duration = 820;
      const t0 = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - t0) / duration);
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' ';
            const resolved = (progress - (i / text.length) * 0.45) / 0.55;
            if (resolved >= 1) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }).join('')
        );
        if (progress < 1) rafId = requestAnimationFrame(tick);
        else setDisplay(text);
      };

      rafId = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) run(); }, { threshold: 0.25 });
    io.observe(el);

    return () => { io.disconnect(); cancelAnimationFrame(rafId); };
  }, [text]);

  return <span ref={spanRef} className={className}>{display}</span>;
}

/* ---------- LoadScreen: boot overlay ----------
   Fases:
   0          → R solo, barra 0 %
   1..N       → cada señal avanza la barra; cursor aparece en fase 1
   final(N+1) → barra 100 %, RAWSEC se expande empujando el cursor
   --------------------------------------------------------- */
type LoadPhase = number; // 0 = inicial, 1..N = intermedias, N+1 = final

export function LoadScreen() {
  const [phase,  setPhase]  = useState<LoadPhase>(0);
  const [out,    setOut]    = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t0 = Date.now();
    const MIN_PER = 300; // ms mínimos por fase para que sea visible
    let lastT = t0;

    // Señales ordenadas — cada una dispara una fase intermedia
    const SIGNALS: Promise<unknown>[] = [
      document.fonts.ready,  // fase 1: fuentes listas
      waitForParticles(),     // fase 2: canvas primer frame
      waitForAppReady(),      // fase 3: React montado + browser idle
    ];
    const FINAL = SIGNALS.length + 1; // fase final = N+1

    // Avanzar una fase con mínimo MIN_PER entre transiciones
    const advance = (p: LoadPhase) => new Promise<void>(r => {
      const wait = Math.max(0, MIN_PER - (Date.now() - lastT));
      setTimeout(() => { lastT = Date.now(); setPhase(p); r(); }, wait);
    });

    const hide = () => {
      const wait = Math.max(700, 2200 - (Date.now() - t0));
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
        setOut(true);
        setTimeout(() => setHidden(true), 650);
      }, wait);
    };

    // Guard: fuerza fase final si algo tarda demasiado
    const guard = window.setTimeout(() => {
      setPhase(FINAL);
      setTimeout(() => { setOut(true); setTimeout(() => setHidden(true), 650); }, 900);
    }, 5000);

    // Encadenar señales → fases
    (async () => {
      try {
        for (let i = 0; i < SIGNALS.length; i++) {
          await SIGNALS[i].catch(() => {});
          await advance(i + 1);
        }
        clearTimeout(guard);
        await advance(FINAL);
        hide();
      } catch {
        clearTimeout(guard);
        setPhase(FINAL);
        hide();
      }
    })();

    return () => clearTimeout(guard);
  }, []);

  if (hidden) return null;

  // Progreso proporcional: N señales + fase final = N+1 pasos
  const N_SIGNALS = 3;
  const FINAL_PHASE = N_SIGNALS + 1;
  const progress = phase === 0 ? 0 : Math.round((phase / FINAL_PHASE) * 100);
  const cursorVisible = phase >= 1;
  const wordmarkVisible = phase >= FINAL_PHASE;

  return (
    <div className={`load-screen${out ? ' load-screen--out' : ''}`} aria-hidden="true">
      <div className="load-content load-content--in">
        <div className="load-lockup">
          {/* Cristal-R — SVG puro, aparece inmediatamente */}
          <svg className="load-sym" width="66" height="82" viewBox="0 0 120 150" fill="none">
            <path d="M60 6 L108 40 L108 110 L60 144 L12 110 L12 40 Z"
                  stroke="var(--accent)" strokeWidth="7" strokeLinejoin="miter"/>
            <g stroke="var(--accent)" strokeWidth="13" strokeLinecap="butt" strokeLinejoin="miter">
              <path d="M46 50 L46 104"/>
              <path d="M46 50 L72 50 L80 58 L80 70 L72 78 L46 78"/>
              <path d="M58 78 L80 104"/>
            </g>
          </svg>
          <div className="load-divider"></div>
          {/* Panel derecho: cursor en fase 1+, RAWSEC en fase final */}
          <div className={`load-right${cursorVisible ? ' load-right--in' : ''}`}>
            <div className="load-logo-row">
              <div className={`load-logo${wordmarkVisible ? ' load-logo--in' : ''}`}>
                RAW<span>SEC</span>
              </div>
              <span className="load-cursor"></span>
            </div>
            <div className={`load-sub${wordmarkVisible ? ' load-sub--in' : ''}`}>
              SOLUTIONS · SpA
            </div>
          </div>
        </div>
        <p className="load-label">INITIALIZING SECURE ENVIRONMENT</p>
        <div className="load-bar">
          <div className="load-fill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}