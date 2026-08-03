'use client'

import { useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: ReactNode
  label?: string
  labelClose?: string
}

export function ExpandToggle({ children, label = 'Ver más', labelClose = 'Ver menos' }: Props) {
  const [open, setOpen] = useState(false)
  return (
    <div className="expand-toggle">
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="expand-body">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="expand-btn" aria-expanded={open} onClick={() => setOpen(o => !o)}>
        {open ? labelClose : label}
      </button>
    </div>
  )
}
