import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Importaciones activadas apuntando a los módulos que creamos
import { Reveal, useCountdown, goToSection, ScrambleText } from './fx';
import { RAWSEC_EMAIL } from './data';

// --- Interfaces ---
interface LProps {
  L: any;
}

interface NavProps extends LProps {
  lang: string;
  setLang: (lang: string) => void;
}

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
    <a className="logo" href="#top" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { 
      e.preventDefault(); 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }}>
      <span>RAW</span><span className="accent">SEC</span>
      <span className="cursor-block"></span>
      <small>solutions</small>
    </a>
  );
}

/* ---------- nav ---------- */
export function Nav({ L, lang, setLang }: NavProps) {
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
            <div className="lang-toggle" role="group" aria-label="Idioma">
              <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
              <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
            </div>
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
  const items = [...L.strip, ...L.strip];
  return (
    <div className="strip" aria-hidden="true">
      <div className="strip-track">
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
const SVC_ICONS: Record<string, JSX.Element> = {
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
};

export function Services({ L }: LProps) {
  const s = L.services;
  return (
    <section className="block" id="servicios" data-screen-label="Servicios">
      <div className="container">
        <SectionHead label={s.label} title={s.title} sub={s.sub} />
        <div className="svc-grid">
          {s.items.map((it: any, i: number) => (
            <Reveal as="article" key={it.title} className="svc" delay={i * 110}>
              <span className="idx">/0{i + 1}</span>
              {SVC_ICONS[it.icon]}
              <h3>{it.title}</h3>
              <p>{it.desc}</p>
              <ul>{it.li.map((x: string) => <li key={x}>{x}</li>)}</ul>
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

    const TRIGGER_RADIUS = PATH_LEN / 8 * 0.35; // ventana de activacion ~35% del espacio entre labels

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
            <Reveal key={st.n} className="step" delay={i * 60}>
              <span className="n">{String(i + 1).padStart(2, '0')}</span>
              <h4>{st.n}</h4>
              <p>{st.d}</p>
            </Reveal>
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
    <section className="block" id="proyecto" data-screen-label="Proyecto I+D">
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

/* ---------- quotes ---------- */
export function Quotes({ L }: LProps) {
  const s = L.quotes;
  return (
    <section className="block" id="clientes" data-screen-label="Clientes">
      <div className="container">
        <SectionHead label={s.label} title={s.title} />
        <div className="quotes-grid">
          {s.items.map((q: any, i: number) => (
            <Reveal as="blockquote" key={i} className="quote" delay={i * 110}>
              <span className="qmark">"</span>
              <p><ScrambleText text={q.q} /></p>
              <footer><b>{q.who}</b>{q.org}</footer>
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