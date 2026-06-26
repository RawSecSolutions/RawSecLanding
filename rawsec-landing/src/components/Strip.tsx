'use client'

import { useState } from 'react'

const ITEMS = [
  'Desarrollo full-stack', 'Pentesting certificado', 'Ley 21.719 · Chile',
  'Arquitectura cloud', 'Hardening de redes', 'Automatización',
  'Machine Learning', 'Agentes RAG', 'LLMs', 'Visión computacional',
  'Red Team', 'Forense digital', 'CCNA · Redes', 'AWS Security',
  'Sistemas ISP', 'Pasarelas de pago', 'Dashboards financieros',
  'Arquitectura de software', 'Diseño de bases de datos', 'Diagramas UML',
  'Modelado relacional', 'Microservicios', 'Hardening de servidores',
  'Seguridad AWS', 'Firewall & ACLs', 'Segmentación de redes', 'IAM & VPC',
]

export function Strip() {
  const [paused, setPaused] = useState(false)
  const doubled = [...ITEMS, ...ITEMS]
  return (
    <div className="strip" aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className={`strip-track${paused ? ' paused' : ''}`}>
        {doubled.map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  )
}
