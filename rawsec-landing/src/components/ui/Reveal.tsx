'use client'

import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  as?: ElementType
  className?: string
  [key: string]: any
}

export function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (document.body.classList.contains('motion-min')) { el.classList.add('in'); return }

    let done = false
    const show = () => {
      if (done) return
      done = true
      el.classList.add('in')
      io?.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }

    let io: IntersectionObserver | null = null
    try {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) show() }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
      io.observe(el)
    } catch {}

    let raf: number
    const inView = () => { const r = el.getBoundingClientRect(); return r.top < window.innerHeight * 0.92 && r.bottom > 0 }
    const check = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { if (inView()) show() }) }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()

    return () => { done = true; io?.disconnect(); cancelAnimationFrame(raf); window.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
  }, [])

  return (
    <Tag ref={ref as any} className={`rv ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}
