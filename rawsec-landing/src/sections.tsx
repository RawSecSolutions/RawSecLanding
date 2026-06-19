import React, { useState, useRef, useEffect } from 'react';
import { animate, hover, press } from 'framer-motion';

// Importaciones activadas apuntando a los módulos que creamos
import { Reveal, useCountdown, goToSection } from './fx';
import { RAWSEC_EMAIL } from './data';

// --- Interfaces ---
interface LProps {
  L: any;
}

type NavProps = LProps;

interface SectionHeadProps {
  label: string;
  title: string;
  sub?: string;
}

interface ProcessProps extends LProps {
  motionLevel?: string;
}

/* ---------- logo ---------- */
export function Logo() {
  return (
    <a
      className="logo"
      href="#top"
      aria-label="RawSec Solutions — inicio"
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    >
      {/* Lockup horizontal — cristal-R + RAWSEC SOLUTIONS */}
      <svg width="170" height="36" viewBox="0 0 430 90" fill="none">
        <g transform="translate(8,9) scale(0.48)">
          <path d="M60 6 L108 40 L108 110 L60 144 L12 110 L12 40 Z"
                stroke="var(--accent)" strokeWidth="7" strokeLinejoin="miter"/>
          <g stroke="var(--accent)" strokeWidth="13" strokeLinecap="butt" strokeLinejoin="miter">
            <path d="M46 50 L46 104"/>
            <path d="M46 50 L72 50 L80 58 L80 70 L72 78 L46 78"/>
            <path d="M58 78 L80 104"/>
          </g>
        </g>
        <line x1="74" y1="12" x2="74" y2="78" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
        <text x="88" y="57"
              fontFamily="'Space Grotesk',system-ui,sans-serif"
              fontWeight="700" fontSize="48" letterSpacing="-1.5">
          <tspan fill="var(--text)">RAW</tspan><tspan fill="var(--accent)">SEC</tspan>
        </text>
        <text x="90" y="77"
              fontFamily="'JetBrains Mono',monospace"
              fontWeight="500" fontSize="12" letterSpacing="3.5"
              fill="var(--accent)">SOLUTIONS · SpA</text>
      </svg>
    </a>
  );
}

/* ---------- nav ---------- */
export function Nav({ L }: NavProps) {
  const [open, setOpen] = useState<boolean>(false);
  
  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    goToSection(id);
  };

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            {L.nav.links.map((l: any) => <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>)}
          </div>
          <div className="nav-right">
            <a className="btn btn-primary nav-cta" href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(L.contact.mailSubject)}`}>{L.nav.cta}</a>
            <button className="burger" aria-label="Menú" onClick={() => setOpen(!open)}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                {open ? <path d="M2 2 L16 12 M16 2 L2 12"></path> : <path d="M1 2 H17 M1 7 H17 M1 12 H17"></path>}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {L.nav.links.map((l: any, i: number) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} style={{ transitionDelay: `${80 + i * 60}ms` }}>
            {l.label} <span className="idx">0{i + 1}</span>
          </a>
        ))}
        <a href={`mailto:${RAWSEC_EMAIL}`} style={{ transitionDelay: '440ms' }}>
          {L.nav.cta} <span className="idx">→</span>
        </a>
      </div>
    </>
  );
}

/* ---------- marquee strip ---------- */
export function Strip({ L }: LProps) {
  const [paused, setPaused] = useState(false);
  const items = [...L.strip, ...L.strip];
  return (
    <div
      className="strip"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`strip-track${paused ? ' paused' : ''}`}>
        {items.map((s: string, i: number) => <span key={i}>{s}</span>)}
      </div>
    </div>
  );
}

/* ---------- section head ---------- */
export function SectionHead({ label, title, sub }: SectionHeadProps) {
  return (
    <div className="sec-head">
      <Reveal><div className="sec-label">{label}</div></Reveal>
      <Reveal delay={80}><h2 className="sec-title">{title}</h2></Reveal>
      {sub ? <Reveal delay={160}><p className="sec-sub">{sub}</p></Reveal> : null}
    </div>
  );
}

/* ---------- services ---------- */
const SVC_ICONS: Record<string, React.ReactNode> = {
  code: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M16 14 L8 22 L16 30"></path>
      <path d="M28 14 L36 22 L28 30"></path>
      <path d="M24 10 L20 34"></path>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M22 6 L36 11 V21 C36 30 30 36 22 39 C14 36 8 30 8 21 V11 Z"></path>
      <path d="M16 21 L20.5 25.5 L29 17"></path>
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M10 12 H34"></path>
      <path d="M22 8 V36 M14 36 H30"></path>
      <path d="M10 12 L5 23 A6 5 0 0 0 15 23 Z"></path>
      <path d="M34 12 L29 23 A6 5 0 0 0 39 23 Z"></path>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <circle cx="22" cy="22" r="3.5"></circle>
      <circle cx="11" cy="13" r="2.5"></circle>
      <circle cx="33" cy="13" r="2.5"></circle>
      <circle cx="11" cy="31" r="2.5"></circle>
      <circle cx="33" cy="31" r="2.5"></circle>
      <circle cx="22" cy="7" r="2.5"></circle>
      <circle cx="22" cy="37" r="2.5"></circle>
      <path d="M22 18.5 L22 9.5 M19.2 20.2 L13 15.5 M24.8 20.2 L31 15.5 M19.2 23.8 L13 28.5 M24.8 23.8 L31 28.5 M22 25.5 L22 34.5"></path>
    </svg>
  ),
  card: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <rect x="5" y="11" width="34" height="22" rx="4"></rect>
      <path d="M5 18 H39"></path>
      <path d="M11 27 H20"></path>
      <rect x="28" y="24" width="6" height="5" rx="1"></rect>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M22 6 L38 14 L22 22 L6 14 Z"></path>
      <path d="M6 22 L22 30 L38 22"></path>
      <path d="M6 30 L22 38 L38 30"></path>
    </svg>
  ),
  arch: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <rect x="15" y="6" width="14" height="8" rx="1.5"></rect>
      <rect x="4" y="30" width="13" height="8" rx="1.5"></rect>
      <rect x="27" y="30" width="13" height="8" rx="1.5"></rect>
      <path d="M22 14 L10.5 30"></path>
      <path d="M22 14 L33.5 30"></path>
      <path d="M17 30 H27"></path>
    </svg>
  ),
  database: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <ellipse cx="22" cy="11" rx="13" ry="4"></ellipse>
      <path d="M9 11 V33"></path>
      <path d="M35 11 V33"></path>
      <ellipse cx="22" cy="33" rx="13" ry="4"></ellipse>
      <path d="M9 19 C9 22.5 35 22.5 35 19"></path>
      <path d="M9 26 C9 29.5 35 29.5 35 26"></path>
    </svg>
  ),
  network: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <rect x="7" y="17" width="30" height="11" rx="2"></rect>
      <path d="M14 17 V10 M22 17 V10 M30 17 V10"></path>
      <path d="M13 28 V35 M31 28 V35"></path>
      <circle cx="14" cy="22.5" r="1.5" fill="currentColor" stroke="none"></circle>
      <circle cx="22" cy="22.5" r="1.5" fill="currentColor" stroke="none"></circle>
      <circle cx="30" cy="22.5" r="1.5" fill="currentColor" stroke="none"></circle>
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M13 33 C8 33 5 29.5 5 25.5 C5 21 8.5 18 13 19 C14 14 18 11 23 11 C29 11 33.5 15.5 33.5 21 C37 21 40 23.5 40 27 C40 30 37.5 33 34 33 Z"></path>
      <rect x="17" y="27" width="10" height="7" rx="1.5"></rect>
      <path d="M19.5 27 V24.5 A2.5 2.5 0 0 1 24.5 24.5 V27"></path>
      <circle cx="22" cy="30.5" r="1.2" fill="currentColor" stroke="none"></circle>
    </svg>
  ),
};

export function Services({ L }: LProps) {
  const s = L.services;
  return (
    <section className="block" id="servicios" data-screen-label="Servicios">
      <div className="container">
        <SectionHead label={s.label} title={s.title} sub={s.sub} />
        <div className="svc-grid">
          {s.items.map((it: any, i: number) => (
            <Reveal key={it.title} as="article" className="svc" delay={i * 120}>
              <span className="idx">/0{i + 1}</span>
              {SVC_ICONS[it.icon]}
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <ul>{it.li.map((l: string) => <li key={l}>{l}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- process / devsecops loop ---------- */
const LOOP_D = 'M 400 160 C 400 80, 310 56, 230 88 C 132 127, 132 193, 230 232 C 310 264, 400 240, 400 160 C 400 80, 490 56, 570 88 C 668 127, 668 193, 570 232 C 490 264, 400 240, 400 160';

const PATH_LEN = 1314.74;
const CYCLE_MS = 8000;

// Posicion XY de cada label en el viewBox — para calcular distancia al punto
const LABEL_POS = [
  { x: 230, y: 66  },
  { x: 106, y: 166 },
  { x: 230, y: 262 },
  { x: 338, y: 292 },
  { x: 462, y: 44  },
  { x: 570, y: 66  },
  { x: 694, y: 166 },
  { x: 570, y: 262 },
];

// Encuentra la distancia en el path mas cercana a un punto XY
function findClosestDist(ghost: SVGPathElement, tx: number, ty: number): number {
  const steps = 500;
  let best = 0, bestD = Infinity;
  for (let i = 0; i <= steps; i++) {
    const d = (i / steps) * PATH_LEN;
    const p = ghost.getPointAtLength(d);
    const dist = Math.hypot(p.x - tx, p.y - ty);
    if (dist < bestD) { bestD = dist; best = d; }
  }
  return best;
}

/* ---------- step card with motion gesture ---------- */
function StepCard({ st, i }: { st: any; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // reveal (same logic as Reveal component)
    if (document.body.classList.contains('motion-min')) {
      el.classList.add('in');
    } else {
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      io.observe(el);
    }

    // gesture
    const state = { isHovered: false, isPressed: false };
    const t = { type: 'spring' as const, stiffness: 500, damping: 25 };
    const upd = () => animate(el, { scale: state.isPressed ? 0.88 : state.isHovered ? 1.06 : 1 }, t);
    const sh = hover(el, () => { state.isHovered = true; upd(); return () => { state.isHovered = false; upd(); }; });
    const sp = press(el, () => { state.isPressed = true; upd(); return () => { state.isPressed = false; upd(); }; });
    return () => { sh(); sp(); };
  }, []);

  return (
    <div ref={ref} className="step rv" style={{ transitionDelay: `${i * 60}ms` }}>
      <span className="n">{String(i + 1).padStart(2, '0')}</span>
      <h4>{st.n}</h4>
      <p>{st.d}</p>
    </div>
  );
}

export function Process({ L, motionLevel }: ProcessProps) {
  const s = L.process;
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const trailRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);
  const ghostRef = useRef<SVGPathElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);
  // Distancias cacheadas en el path para cada label
  const labelDists = useRef<number[]>([]);

  useEffect(() => {
    if (motionLevel === 'min') return;

    const ghost = ghostRef.current;
    const trail = trailRef.current;
    const dot = dotRef.current;
    if (!ghost || !trail || !dot) return;

    // Calcular distancia en el path de cada label una sola vez al montar
    labelDists.current = LABEL_POS.map(pos => findClosestDist(ghost, pos.x, pos.y));



    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = (ts - start) % (CYCLE_MS * 2);
      const inErase = elapsed >= CYCLE_MS;
      const phase = (elapsed % CYCLE_MS) / CYCLE_MS;
      const dotDist = phase * PATH_LEN;

      // Mover punto
      const p = ghost.getPointAtLength(dotDist);
      dot.setAttribute('cx', String(p.x));
      dot.setAttribute('cy', String(p.y));

      // Estela
      let dashStart: number, dashLen: number;
      if (!inErase) {
        dashStart = 0;
        dashLen = dotDist;
      } else {
        dashStart = dotDist;
        dashLen = PATH_LEN - dotDist;
      }
      trail.setAttribute('stroke-dasharray', `0 ${dashStart} ${Math.max(0, dashLen)} ${PATH_LEN}`);

      // Labels: visible si la linea ya paso por su posicion (fase draw)
      // o si aun no la borro (fase erase)
      labelDists.current.forEach((labelDist, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        let visible: boolean;
        if (!inErase) {
          // draw: visible si dotDist ya supero la posicion del label
          visible = dotDist >= labelDist;
        } else {
          // erase: visible mientras dotDist aun no llego a la posicion del label
          visible = dotDist < labelDist;
        }
        el.style.opacity = visible ? '1' : '0';
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [motionLevel]);

  return (
    <section className="block" id="proceso" ref={sectionRef} data-screen-label="Proceso DevSecOps">
      <div className="container">
        <SectionHead label={s.label} title={s.title} sub={s.sub} />
        <Reveal className="loop-wrap">
          <svg className="loop-svg" viewBox="0 0 800 320" aria-hidden="true">

            {/* Path invisible — solo para getPointAtLength */}
            <path ref={ghostRef} d={LOOP_D} fill="none" stroke="none" />

            {/* Riel base */}
            <path className="rail" d={LOOP_D} fill="none" strokeWidth="2" />

            {/* Estela controlada por rAF */}
            {motionLevel !== 'min' ? (
              <path
                ref={trailRef}
                d={LOOP_D}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="0"
              />
            ) : (
              <path className="draw" d={LOOP_D} fill="none" strokeWidth="2.5" />
            )}

            {/* Nodo izquierdo DEV — solo texto, sin círculo */}
            <text style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', fill: 'var(--text)', letterSpacing: '.08em' }} x="262" y="167" textAnchor="middle">DEV</text>

            {/* Nodo central */}
            <circle className="node" cx="400" cy="160" r="38" strokeWidth="1.5" />
            <text className="sec-core" x="400" y="170" textAnchor="middle">SEC</text>

            {/* Nodo derecho OPS — solo texto, sin círculo */}
            <text style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', fill: 'var(--text)', letterSpacing: '.08em' }} x="538" y="167" textAnchor="middle">OPS</text>

            {/* Etiquetas — opacity controlada por rAF via clase loop-label */}
            {[
              { x: 230, y: 66  },
              { x: 106, y: 166 },
              { x: 230, y: 262 },
              { x: 338, y: 292 },
              { x: 462, y: 44  },
              { x: 570, y: 66  },
              { x: 694, y: 166 },
              { x: 570, y: 262 },
            ].map((pos, i) => (
              <text
                key={i}
                ref={el => { labelRefs.current[i] = el; }}
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                className="loop-label"
              >
                {s.steps[i].n}
              </text>
            ))}

            {/* Punto controlado por rAF */}
            {motionLevel !== 'min' ? (
              <circle ref={dotRef} r="5" cx="400" cy="160" fill="var(--accent)" />
            ) : null}

          </svg>
        </Reveal>
        <div className="steps-grid">
          {s.steps.map((st: any, i: number) => (
            <StepCard key={st.n} st={st} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- featured project ---------- */
export function FeaturedProject({ L }: LProps) {
  const s = L.project;
  const cd = useCountdown('2026-12-01T00:00:00-03:00');
  
  return (
    <section className="block" id="herramientas" data-screen-label="Herramientas I+D">
      <div className="container">
        <SectionHead label={s.label} title="" />
        <Reveal as="article" className="proj">
          <div className="proj-main">
            <span className="proj-tag">{s.tag}</span>
            <h3>{s.title}</h3>
            <p className="proj-desc">{s.desc}</p>
            <ul className="proj-points">
              {s.points.map((p: string) => <li key={p}>{p}</li>)}
            </ul>
            <a className="btn btn-ghost" href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(s.cta + ' — Ley 21.719')}`}>
              {s.cta} <span className="arrow">→</span>
            </a>
          </div>
          <div className="proj-side">
            <div className="countdown">
              <div className="cd-cell"><b>{cd.days}</b><span>{s.cdUnits[0]}</span></div>
              <div className="cd-cell"><b>{cd.hours}</b><span>{s.cdUnits[1]}</span></div>
              <div className="cd-cell"><b>{cd.mins}</b><span>{s.cdUnits[2]}</span></div>
            </div>
            <p className="cd-label">{s.cdLabel} <b>· {s.cdDate}</b></p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- team ---------- */
export function Team({ L }: LProps) {
  const s = L.team;
  return (
    <section className="block" id="equipo" data-screen-label="Equipo">
      <div className="container">
        <SectionHead label={s.label} title={s.title} sub={s.sub} />
        <div className="team-grid">
          {s.members.map((m: any, i: number) => (
            <Reveal as="article" key={m.name} className="member" delay={i * 120}>
              <div className="member-top">
                <div className="avatar">{m.ini}</div>
                <div>
                  <h3>{m.name}</h3>
                  <span className="role">{m.role}</span>
                </div>
              </div>
              <p>{m.bio}</p>
              <div className="chip-row">
                {m.certs.map((c: string) => <span className="chip cert" key={c}>{c}</span>)}
                {m.chips.map((c: string) => <span className="chip" key={c}>{c}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- clients marquee strip (reverse) ---------- */
export function ClientsStrip({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];
  return (
    <div
      className="strip clients-strip"
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`strip-track reverse${paused ? ' paused' : ''}`}>
        {doubled.map((s: string, i: number) => <span key={i}>{s}</span>)}
      </div>
    </div>
  );
}

/* ---------- quotes / experiencias ---------- */
export function Quotes({ L }: LProps) {
  const s = L.quotes;
  return (
    <section className="block" id="proyectos" data-screen-label="Proyectos">
      <div className="container">
        <SectionHead label={s.label} title={s.title} sub={s.sub} />
        <div className="cases-grid">
          {s.cases.map((c: any, i: number) => (
            <Reveal key={i} className="case" delay={i * 80}>
              <div className="case-top">
                <span className="case-type">{c.type}</span>
                <span className="case-client">{c.client}</span>
                <span className="case-org">{c.org}</span>
              </div>
              <p className="case-what">{c.what}</p>
              {c.link && (
                c.link.external
                  ? <a className="case-cta" href={c.link.href} target="_blank" rel="noopener noreferrer">{c.link.label} →</a>
                  : <button className="case-cta" onClick={() => goToSection('contacto')} type="button">{c.link.label} →</button>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- contact ---------- */
export function Contact({ L }: LProps) {
  const s = L.contact;
  const [copied, setCopied] = useState<boolean>(false);
  
  const copy = () => {
    navigator.clipboard && navigator.clipboard.writeText(RAWSEC_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="block" id="contacto" data-screen-label="Contacto">
      <div className="container">
        <Reveal className="contact-box">
          <div className="sec-label" style={{ justifyContent: 'center' }}>{s.label}</div>
          <h2>{s.title}</h2>
          <p className="sec-sub">{s.sub}</p>
          <div className="contact-ctas">
            <a className="btn btn-primary" href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(s.mailSubject)}`}>
              {s.cta1} <span className="arrow">→</span>
            </a>
            <button className="btn btn-ghost email-mono" onClick={copy}>
              {copied ? s.copied : RAWSEC_EMAIL}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- ecosystem ---------- */
export function Ecosystem({ L }: LProps) {
  const s = L.ecosystem;
  return (
    <section className="block" id="ecosistema" data-screen-label="Ecosistema RawSec">
      <div className="container">
        <SectionHead label={s.label} title={s.title} />
        <div className="eco-grid">
          {s.items.map((item: any, i: number) => (
            <Reveal key={i} className="eco-card" delay={i * 120}>
              <div className="eco-tag">{item.tag}</div>
              <h4 className="eco-name">{item.name}</h4>
              <p className="eco-desc">{item.desc}</p>
              {item.href
                ? <a className="eco-cta" href={item.href} onClick={!item.external && item.href ? (e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); goToSection(item.href.slice(1)); } : undefined}>{item.cta} →</a>
                : <span className="eco-cta eco-soon">{item.cta}</span>
              }
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */
export function Footer({ L }: LProps) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Logo />
          <p className="meta" style={{ marginTop: 10 }}>{L.footer.tagline}<br />{L.footer.rights}</p>
        </div>
        <div className="footer-links">
          {L.footer.links.map((l: any) => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}