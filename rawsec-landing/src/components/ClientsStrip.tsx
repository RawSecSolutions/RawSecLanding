'use client'

import { useState } from 'react'

const CLIENTS = [
  'KikiBrows · LMS & e-commerce',
  'Mar y Cielo · Inmobiliaria',
  'Consulta privada · La Serena',
  'Dominga Norte · Finanzas',
  'Minox · Control de accesos & dominio',
]

export function ClientsStrip() {
  const [paused, setPaused] = useState(false)
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <div className="strip clients-strip" aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className={`strip-track reverse${paused ? ' paused' : ''}`}>
        {doubled.map((s, i) => <span key={i}>{s}</span>)}
      </div>
    </div>
  )
}
