'use client'

import { useEffect, type RefObject } from 'react'
import { animate, stagger } from 'framer-motion'

export function useWordEntrance(rootRef: RefObject<HTMLElement | null>, motionLevel: string) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll('[data-hw]')) as HTMLElement[]
    if (motionLevel === 'min') {
      els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none' })
      return
    }
    animate(
      els,
      { opacity: [0, 1], transform: ['translateY(34px)', 'translateY(0px)'] },
      { delay: stagger(0.09, { startDelay: 0.15 }), duration: 0.85, ease: [0.22, 1, 0.36, 1] }
    )
  }, [motionLevel, rootRef])
}
