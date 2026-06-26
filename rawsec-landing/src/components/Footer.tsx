'use client'

import { Logo } from '@/components/Logo'
import { RAWSEC_EMAIL, RAWSEC_GITHUB, RAWSEC_INSTAGRAM } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Logo />
          <p className="meta" style={{ marginTop: 10 }}>
            Desarrollo seguro desde Santiago, Chile.<br />© 2026 RawSec Solutions
          </p>
        </div>
        <div className="footer-links">
          <a href={RAWSEC_GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={RAWSEC_INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={`mailto:${RAWSEC_EMAIL}`}>{RAWSEC_EMAIL}</a>
        </div>
      </div>
    </footer>
  )
}
