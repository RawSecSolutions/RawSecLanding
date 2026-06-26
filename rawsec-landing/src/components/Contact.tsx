'use client'

import { useState } from 'react'
import { Reveal } from '@/components/ui/Reveal'
import { RAWSEC_EMAIL, MAIL_SUBJECT } from '@/lib/constants'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(RAWSEC_EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <section className="block" id="contacto" data-screen-label="Contacto">
      <div className="container">
        <Reveal className="contact-box">
          <div className="sec-label" style={{ justifyContent: 'center' }}>07 — Contacto</div>
          <h2>¿Conversamos?</h2>
          <p className="sec-sub">Cuéntanos qué necesitas construir o qué necesitas proteger. Respondemos dentro de 24 horas.</p>
          <div className="contact-ctas">
            <a className="btn btn-primary" href={`mailto:${RAWSEC_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`}>
              Agendar reunión <span className="arrow">→</span>
            </a>
            <button className="btn btn-ghost email-mono" onClick={copy}>
              {copied ? '✓ copiado' : RAWSEC_EMAIL}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
