'use client'

import { useState, useEffect } from 'react'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { Strip } from '@/components/Strip'
import { Nosotros } from '@/components/Nosotros'
import { Quotes } from '@/components/Quotes'
import { ClientsStrip } from '@/components/ClientsStrip'
import { Process } from '@/components/Process'
import { Services } from '@/components/Services'
import { FeaturedProject } from '@/components/FeaturedProject'
import { Ecosystem } from '@/components/Ecosystem'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { LoadScreen } from '@/components/ui/LoadScreen'
import { FloatingCtas } from '@/components/FloatingCtas'
import { signalAppReady } from '@/lib/motion'

export default function App() {
  const [motionLevel, setMotionLevel] = useState<'min' | 'max'>('max')

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) setMotionLevel('min')
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--font-heading', 'var(--font-display)')
    document.body.classList.toggle('bg-grid', true)
    document.body.classList.toggle('motion-min', motionLevel === 'min')
    document.documentElement.lang = 'es'
  }, [motionLevel])

  useEffect(() => {
    requestAnimationFrame(() => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => signalAppReady(), { timeout: 2500 })
      } else {
        requestAnimationFrame(() => requestAnimationFrame(() => signalAppReady()))
      }
    })
  }, [])

  return (
    <>
      <LoadScreen />
      <Nav />
      <Hero motionLevel={motionLevel} />
      <Strip />
      <main>
        <Nosotros />
        <Services />
        <Process motionLevel={motionLevel} />
        <ClientsStrip />
        <Quotes />
        <FeaturedProject />
        <Ecosystem />
        <Contact />
      </main>
      <Footer />
      <FloatingCtas />
    </>
  )
}
