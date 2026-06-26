'use client'

import { motion } from 'framer-motion'
import { RAWSEC_INSTAGRAM } from '@/lib/constants'
import { goToSection } from '@/lib/utils'

export function FloatingCtas() {
  return (
    <div className="float-ctas">
      {/* Instagram */}
      <motion.a
        className="float-btn float-ig"
        href={RAWSEC_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram RawSec Solutions"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4.5" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </motion.a>

      {/* Ir a contacto */}
      <motion.button
        className="float-btn float-contact"
        aria-label="Ir a contacto"
        onClick={() => goToSection('contacto')}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </motion.button>
    </div>
  )
}
