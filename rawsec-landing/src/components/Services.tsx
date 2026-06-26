'use client'

import { type ReactNode } from 'react'
import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ExpandToggle } from '@/components/ui/ExpandToggle'

const ICONS: Record<string, ReactNode> = {
  code: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M16 14 L8 22 L16 30" /><path d="M28 14 L36 22 L28 30" /><path d="M24 10 L20 34" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
      <path d="M22 6 L36 11 V21 C36 30 30 36 22 39 C14 36 8 30 8 21 V11 Z" /><path d="M16 21 L20.5 25.5 L29 17" />
    </svg>
  ),
}

const SERVICES = [
  {
    icon: 'code',
    title: 'Desarrollo de software a medida',
    desc1: 'Construimos tu plataforma de cero',
    desc2: 'Apps web / móvil, Sistemas de gestión de aprendizaje, e-commerce, portafolios, integraciones con APIs externas, dashboards y analítica de datos. Desde el diseño hasta el despliegue en producción.',
    li: ['Plataformas web y SaaS', 'LMS, e-commerce y pasarelas de pago', 'Integraciones, IA y automatización'],
  },
  {
    icon: 'shield',
    title: 'Ciberseguridad certificada',
    desc1: 'Pentesting y auditorías con metodología certificada.',
    desc2: 'Encontramos las vulnerabilidades antes que un atacante y entregamos el reporte para cerrarlas.',
    li: ['Pentesting web, API e infraestructura', 'Auditorías de red y cloud (AWS)', 'Hardening y cumplimiento normativo'],
  },
]

export function Services() {
  return (
    <section className="block" id="servicios" data-screen-label="Servicios">
      <div className="container">
        <SectionHead label="04 — Servicios" title="Dos especialidades. Un equipo."
          sub={<>Un perfil construye la plataforma. El otro la ataca y la asegura. <span style={{ color: 'var(--accent)' }}>Desarrollo y seguridad en paralelo</span>, no como etapas separadas.</>} />
        <div className="svc-grid">
          {SERVICES.map((it, i) => (
            <Reveal key={it.title} as="article" className="svc" delay={i * 120}>
              <span className="idx">/0{i + 1}</span>
              {ICONS[it.icon]}
              <h3>{it.title}</h3>
              <p>{it.desc1}</p>
              <ExpandToggle>
                <div className="contenido-desplegable">
                  <p>{it.desc2}</p>
                  <ul>{it.li.map(l => <li key={l}>{l}</li>)}</ul>
                </div>
              </ExpandToggle>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
