'use client'

import { type ReactNode } from 'react'
import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'
import { ExpandToggle } from '@/components/ui/ExpandToggle'

const ICON_OFFENSIVE: ReactNode = (
  <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="icon">
    <path d="M22 6 L36 11 V21 C36 30 30 36 22 39 C14 36 8 30 8 21 V11 Z" />
    <path d="M19 16 L15 22 L19 28" /><path d="M25 16 L29 22 L25 28" />
  </svg>
)

const SERVICE = {
  title: 'Software con mentalidad ofensiva',
  desc1: 'Construimos software con mentalidad ofensiva: desarrollamos cada línea de código sabiendo exactamente cómo la intentarían romper.',
  desc2: 'Desarrollo y seguridad no son etapas separadas. Diseñamos, escribimos y desplegamos pensando como el atacante que intentará vulnerarlo, para entregar plataformas que ya nacen preparadas para resistir.',
  li: [
    'Plataformas web, SaaS, LMS y e-commerce',
    'Integraciones, IA y automatización',
    'Pentesting web, API e infraestructura',
    'Auditorías cloud (AWS), hardening y cumplimiento',
  ],
}

export function Services() {
  return (
    <section className="block" id="servicios" data-screen-label="Servicios">
      <div className="container">
        <SectionHead label="04 — Servicios" title="Un solo equipo. Mentalidad ofensiva."
          sub={<>No solo construimos: <span style={{ color: 'var(--accent)' }}>desarrollamos sabiendo cómo se rompe</span>. Cada línea de código nace pensando como el atacante que intentará vulnerarla.</>} />
        <div className="svc-grid svc-grid--single">
          <Reveal as="article" className="svc svc--single">
            <span className="idx">/01</span>
            {ICON_OFFENSIVE}
            <h3>{SERVICE.title}</h3>
            <p>{SERVICE.desc1}</p>
            <ExpandToggle>
              <div className="contenido-desplegable">
                <p>{SERVICE.desc2}</p>
                <ul>{SERVICE.li.map(l => <li key={l}>{l}</li>)}</ul>
              </div>
            </ExpandToggle>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
