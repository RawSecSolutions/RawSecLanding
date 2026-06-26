'use client'

import { useState, useEffect } from 'react'
import { waitForParticles, waitForAppReady } from '@/lib/motion'

type Phase = number

export function LoadScreen() {
  const [phase, setPhase] = useState<Phase>(0)
  const [out, setOut] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const t0 = Date.now()
    const MIN_PER = 300
    let lastT = t0

    const SIGNALS: Promise<unknown>[] = [
      document.fonts.ready,
      waitForParticles(),
      waitForAppReady(),
    ]
    const FINAL = SIGNALS.length + 1

    const advance = (p: Phase) => new Promise<void>(r => {
      const wait = Math.max(0, MIN_PER - (Date.now() - lastT))
      setTimeout(() => { lastT = Date.now(); setPhase(p); r() }, wait)
    })

    const hide = () => {
      const wait = Math.max(700, 2200 - (Date.now() - t0))
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
        setOut(true)
        setTimeout(() => setHidden(true), 650)
      }, wait)
    }

    const guard = setTimeout(() => {
      setPhase(FINAL)
      setTimeout(() => { setOut(true); setTimeout(() => setHidden(true), 650) }, 900)
    }, 5000)

    ;(async () => {
      try {
        for (let i = 0; i < SIGNALS.length; i++) {
          await SIGNALS[i].catch(() => {})
          await advance(i + 1)
        }
        clearTimeout(guard)
        await advance(FINAL)
        hide()
      } catch {
        clearTimeout(guard)
        setPhase(FINAL)
        hide()
      }
    })()

    return () => clearTimeout(guard)
  }, [])

  if (hidden) return null

  const N_SIGNALS = 3
  const FINAL_PHASE = N_SIGNALS + 1
  const progress = phase === 0 ? 12 : Math.round((phase / FINAL_PHASE) * 100)
  const wordmarkVisible = phase >= FINAL_PHASE

  return (
    <div className={`load-screen${out ? ' load-screen--out' : ''}`} aria-hidden="true">
      <div className="load-content load-content--in">
        <div className="load-lockup">
          <svg className="load-sym" width="66" height="82" viewBox="0 0 120 150" fill="none">
            <path d="M60 6 L108 40 L108 110 L60 144 L12 110 L12 40 Z" stroke="var(--accent)" strokeWidth="7" strokeLinejoin="miter" />
            <g stroke="var(--accent)" strokeWidth="13" strokeLinecap="butt" strokeLinejoin="miter">
              <path d="M46 50 L46 104" /><path d="M46 50 L72 50 L80 58 L80 70 L72 78 L46 78" /><path d="M58 78 L80 104" />
            </g>
          </svg>
          <div className="load-divider" />
          <div className="load-right load-right--in">
            <div className="load-logo-row">
              <div className={`load-logo${wordmarkVisible ? ' load-logo--in' : ''}`}>RAW<span>SEC</span></div>
              <span className="load-cursor" />
            </div>
            <div className={`load-sub${wordmarkVisible ? ' load-sub--in' : ''}`}>SOLUTIONS · SpA</div>
          </div>
        </div>
        <p className="load-label">INITIALIZING SECURE ENVIRONMENT</p>
        <div className="load-bar">
          <div className="load-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
