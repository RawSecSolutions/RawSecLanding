'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ParticleField } from '@/components/ui/ParticleField'
import { useWordEntrance } from '@/hooks/useWordEntrance'
import { goToSection } from '@/lib/utils'
import { RAWSEC_EMAIL, MAIL_SUBJECT } from '@/lib/constants'

const HERO = {
  eyebrow: 'Empresa de software & ciberseguridad · Santiago, Chile',
  h1: ['Construido a medida.', 'Blindado por diseño.'],
  badges: ['eJPT', 'eWPTX', 'CCNA', 'AWS Cloud Practitioner'],
  coords: 'SANTIAGO, CHILE · 33.4489°S 70.6693°W',
}

interface Props { motionLevel: string }

export function Hero({ motionLevel }: Props) {
  const ref = useRef<HTMLElement>(null)
  useWordEntrance(ref, motionLevel)

  return (
    <header className="hero hero-bp" ref={ref} data-screen-label="Hero">
      <ParticleField density={130} motionLevel={motionLevel} />
      <div className="scanline-h" />
      <span className="coords" style={{ top: 84, left: 24 }}>{HERO.coords}</span>
      <span className="coords" style={{ bottom: 28, right: 24 }}>RAWSEC.SOLUTIONS · v1.0</span>
      <span className="corner" style={{ top: 78, right: 20, borderWidth: '1.5px 1.5px 0 0' }} />
      <span className="corner" style={{ bottom: 20, left: 20, borderWidth: '0 0 1.5px 1.5px' }} />
      <div className="container">
        <div className="eyebrow" data-hw=""><span className="dot" />{HERO.eyebrow}</div>
        <h1>
          <span data-hw="" style={{ display: 'block' }}>{HERO.h1[0]}</span>
          <span className="stroke" data-hw="">{HERO.h1[1]}</span>
        </h1>
        <p className="hero-sub" data-hw="">
          Desarrollamos <span style={{ color: 'var(--accent)' }}>plataformas a medida</span> con <span style={{ color: 'var(--accent)' }}>arquitectura segura</span>. Y si ya tienes un sistema, nuestro equipo de ciberseguridad lo somete a <span style={{ color: 'var(--accent)' }}>pentesting</span> y <span style={{ color: 'var(--accent)' }}>auditorías certificadas</span>. Dos especialidades, una sola agencia para cubrir todo tu ciclo digital.
        </p>
        <div data-hw="">
          <div className="cta-row">
            <a className="btn btn-primary" href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`}>
              Agendar reunión <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#proyectos"
              onClick={(e) => { e.preventDefault(); goToSection('proyectos') }}>
              Ver proyectos
            </a>
          </div>
        </div>
        <div data-hw="">
          <div className="badge-row">
            <span className="badge-label">Certificaciones activas:</span>
            {HERO.badges.map(b => (
              <motion.span key={b} className="badge"
                whileHover={{ scale: 1.2, color: '#34d399', borderColor: '#34d399' }}
                whileTap={{ scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}>
                {b}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
