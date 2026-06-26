'use client'

import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { useCountdown } from '@/hooks/useCountdown'
import { RAWSEC_EMAIL } from '@/lib/constants'

const PROJECT = {
  label: '05 — Herramientas I+D',
  tag: 'En desarrollo · acceso anticipado',
  title: 'Cumplimiento Ley 21.719, automatizado.',
  desc: 'Estamos construyendo un agente de cumplimiento que evalúa, documenta y monitorea la adecuación de tu empresa a la nueva ley chilena de protección de datos personales con tus datos siempre en tu infraestructura.',
  points: [
    'Datos 100% locales: nada sale de tu empresa',
    'Evidencia y reportes auditables',
    'Monitoreo continuo de brechas normativas',
  ],
  cta: 'Quiero acceso anticipado',
  cdLabel: 'para la entrada en vigencia de la ley',
  cdDate: '01 · DIC · 2026',
  cdTarget: '2026-12-01T00:00:00-03:00',
  cdUnits: ['días', 'horas', 'min'] as const,
}

export function FeaturedProject() {
  const cd = useCountdown(PROJECT.cdTarget)
  return (
    <section className="block" id="herramientas" data-screen-label="Herramientas I+D">
      <div className="container">
        <SectionHead label={PROJECT.label} title="" />
        <Reveal as="article" className="proj">
          <div className="proj-main">
            <span className="proj-tag">{PROJECT.tag}</span>
            <h3>{PROJECT.title}</h3>
            <p className="proj-desc">{PROJECT.desc}</p>
            <ul className="proj-points">
              {PROJECT.points.map(p => <li key={p}>{p}</li>)}
            </ul>
            <a className="btn btn-ghost"
              href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(PROJECT.cta + ' — Ley 21.719')}`}>
              {PROJECT.cta} <span className="arrow">→</span>
            </a>
          </div>
          <div className="proj-side">
            <div className="countdown">
              <div className="cd-cell"><b>{cd.days}</b><span>{PROJECT.cdUnits[0]}</span></div>
              <div className="cd-cell"><b>{cd.hours}</b><span>{PROJECT.cdUnits[1]}</span></div>
              <div className="cd-cell"><b>{cd.mins}</b><span>{PROJECT.cdUnits[2]}</span></div>
            </div>
            <p className="cd-label">{PROJECT.cdLabel} <b>· {PROJECT.cdDate}</b></p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
