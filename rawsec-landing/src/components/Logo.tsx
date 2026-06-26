'use client'

import { goToSection } from '@/lib/utils'

export function Logo() {
  return (
    <a className="logo" href="#top" aria-label="RawSec Solutions — inicio"
      onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
      <svg width="170" height="36" viewBox="0 0 430 90" fill="none">
        <g transform="translate(8,9) scale(0.48)">
          <path d="M60 6 L108 40 L108 110 L60 144 L12 110 L12 40 Z" stroke="var(--accent)" strokeWidth="7" strokeLinejoin="miter" />
          <g stroke="var(--accent)" strokeWidth="13" strokeLinecap="butt" strokeLinejoin="miter">
            <path d="M46 50 L46 104" /><path d="M46 50 L72 50 L80 58 L80 70 L72 78 L46 78" /><path d="M58 78 L80 104" />
          </g>
        </g>
        <line x1="74" y1="12" x2="74" y2="78" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <text x="88" y="57" fontFamily="'Space Grotesk',system-ui,sans-serif" fontWeight="700" fontSize="48" letterSpacing="-1.5">
          <tspan fill="var(--text)">RAW</tspan><tspan fill="var(--accent)">SEC</tspan>
        </text>
        <text x="90" y="77" fontFamily="'JetBrains Mono',monospace" fontWeight="500" fontSize="12" letterSpacing="3.5" fill="var(--accent)">
          SOLUTIONS · SpA
        </text>
      </svg>
    </a>
  )
}

export { goToSection }
