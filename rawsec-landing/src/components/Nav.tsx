'use client'

import { useState } from 'react'
import { Logo } from '@/components/Logo'
import { goToSection } from '@/lib/utils'
import { RAWSEC_EMAIL, MAIL_SUBJECT } from '@/lib/constants'

const LINKS = [
  { id: 'equipo',       label: 'Perfiles'    },
  { id: 'proyectos',    label: 'Proyectos'   },
  { id: 'proceso',      label: 'DevSecOps'   },
  { id: 'servicios',    label: 'Servicios'   },
  { id: 'herramientas', label: 'Herramientas'},
  { id: 'contacto',     label: 'Contacto'    },
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const go = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); setOpen(false); goToSection(id)
  }

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Logo />
          <div className="nav-links">
            {LINKS.map(l => <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>{l.label}</a>)}
          </div>
          <div className="nav-right">
            <a className="btn btn-primary nav-cta" href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`}>
              Agendar reunión
            </a>
            <button className="burger" aria-label="Menú" onClick={() => setOpen(!open)}>
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                {open ? <path d="M2 2 L16 12 M16 2 L2 12" /> : <path d="M1 2 H17 M1 7 H17 M1 12 H17" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {LINKS.map((l, i) => (
          <a key={l.id} href={`#${l.id}`} onClick={go(l.id)} style={{ transitionDelay: `${80 + i * 60}ms` }}>
            {l.label} <span className="idx">0{i + 1}</span>
          </a>
        ))}
        <a href={`mailto:${RAWSEC_EMAIL}`} style={{ transitionDelay: '440ms' }}>
          Agendar reunión <span className="idx">→</span>
        </a>
      </div>
    </>
  )
}
