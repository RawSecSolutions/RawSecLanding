import React, { useRef } from 'react';
import { motion } from 'framer-motion';

// Importaciones totalmente activadas
import { useWordEntrance, goToSection, ParticleField, TerminalTyper } from './fx';
import { RAWSEC_EMAIL } from './data';

// --- Interfaces ---
interface LProps {
  L: any;
}

interface HeroProps extends LProps {
  motionLevel: string;
}

interface HeroNetworkProps extends HeroProps {
  particles: number;
}

export function HeroCtas({ L }: LProps) {
  return (
    <div className="cta-row">
      <a className="btn btn-primary" href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(L.contact.mailSubject)}`}>
        {L.hero.cta1} <span className="arrow">→</span>
      </a>
      <a className="btn btn-ghost" href="#clientes" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        goToSection('clientes');
      }}>
        {L.hero.cta2}
      </a>
    </div>
  );
}

export function HeroBadges({ L }: LProps) {
  return (
    <div className="badge-row">
      <span className="badge-label">Certificaciones activas:</span>
      {L.hero.badges.map((b: string) => (
        <motion.span
          key={b}
          className="badge"
          whileHover={{ scale: 1.2, color: '#34d399', borderColor: '#34d399' }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
        >
          {b}
        </motion.span>
      ))}
    </div>
  );
}

/* ---------- A · Terminal ---------- */
export function HeroTerminal({ L, motionLevel }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  useWordEntrance(ref, motionLevel);
  
  return (
    <header className="hero" ref={ref} data-screen-label="Hero — Terminal">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow" data-hw=""><span className="dot"></span>{L.hero.eyebrow}</div>
          <h1>
            <span data-hw="">{L.hero.h1a[0]}</span>{' '}
            <span className="accent" data-hw="">{L.hero.h1a[1]}</span>
          </h1>
          <p className="hero-sub" data-hw="">{L.hero.sub}</p>
          <div data-hw=""><HeroCtas L={L} /></div>
          <div data-hw=""><HeroBadges L={L} /></div>
        </div>
        <div data-hw="">
          <div className="term">
            <div className="term-bar"><i></i><i></i><i></i><span>rawsec — zsh</span></div>
            <TerminalTyper lines={L.hero.term} motionLevel={motionLevel} />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------- B · Network ---------- */
export function HeroNetwork({ L, motionLevel, particles }: HeroNetworkProps) {
  const ref = useRef<HTMLElement>(null);
  useWordEntrance(ref, motionLevel);
  const words = L.hero.h1b.split(' ');
  
  return (
    <header className="hero hero-net" ref={ref} data-screen-label="Hero — Red">
      <ParticleField density={particles} motionLevel={motionLevel} />
      <div className="net-fade"></div>
      <div className="container hero-center">
        <div className="eyebrow" data-hw=""><span className="dot"></span>{L.hero.eyebrow}</div>
        <h1>
          {words.map((w: string, i: number) => (
            <span key={i} className={`hw ${i >= words.length - 2 ? 'accent' : ''}`} data-hw="">{w}{i < words.length - 1 ? '\u00A0' : ''}</span>
          ))}
        </h1>
        <p className="hero-sub" data-hw="">{L.hero.sub}</p>
        <div data-hw=""><HeroCtas L={L} /></div>
        <div data-hw=""><HeroBadges L={L} /></div>
      </div>
    </header>
  );
}

/* ---------- C · Blueprint ---------- */
export function HeroBlueprint({ L, motionLevel }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  useWordEntrance(ref, motionLevel);
  
  return (
    <header className="hero hero-bp" ref={ref} data-screen-label="Hero — Blueprint">
      <ParticleField density={130} motionLevel={motionLevel} />
      <div className="scanline-h"></div>
      <span className="coords" style={{ top: 84, left: 24 }}>{L.hero.coords}</span>
      <span className="coords" style={{ bottom: 28, right: 24 }}>RAWSEC.SOLUTIONS · v1.0</span>
      <span className="corner" style={{ top: 78, right: 20, borderWidth: '1.5px 1.5px 0 0' }}></span>
      <span className="corner" style={{ bottom: 20, left: 20, borderWidth: '0 0 1.5px 1.5px' }}></span>
      <div className="container">
        <div className="eyebrow" data-hw=""><span className="dot"></span>{L.hero.eyebrow}</div>
        <h1>
          <span data-hw="" style={{ display: 'block' }}>{L.hero.h1c[0]}</span>
          <span className="stroke" data-hw="">{L.hero.h1c[1]}</span>
        </h1>
        <p className="hero-sub" data-hw="">{L.hero.sub}</p>
        <div data-hw=""><HeroCtas L={L} /></div>
        <div data-hw=""><HeroBadges L={L} /></div>
      </div>
    </header>
  );
}