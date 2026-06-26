'use client'

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SectionHead } from '@/components/SectionHead'
import { Reveal } from '@/components/ui/Reveal'

const LOOP_D = 'M 400 160 C 400 80, 310 56, 230 88 C 132 127, 132 193, 230 232 C 310 264, 400 240, 400 160 C 400 80, 490 56, 570 88 C 668 127, 668 193, 570 232 C 490 264, 400 240, 400 160'
const PATH_LEN = 1314.74
const CYCLE_MS = 8000

const LABEL_POS = [
  { x: 230, y: 66  },
  { x: 106, y: 166 },
  { x: 230, y: 262 },
  { x: 338, y: 292 },
  { x: 462, y: 44  },
  { x: 570, y: 66  },
  { x: 694, y: 166 },
  { x: 570, y: 262 },
]

function findClosestDist(ghost: SVGPathElement, tx: number, ty: number): number {
  let best = 0, bestD = Infinity
  for (let i = 0; i <= 500; i++) {
    const d = (i / 500) * PATH_LEN
    const p = ghost.getPointAtLength(d)
    const dist = Math.hypot(p.x - tx, p.y - ty)
    if (dist < bestD) { bestD = dist; best = d }
  }
  return best
}

const STEPS = [
  { n: 'Planificar', d: 'Modelado de amenazas desde el diseño' },
  { n: 'Codificar',  d: 'Revisión de código y prácticas seguras' },
  { n: 'Construir',  d: 'Escaneo de dependencias en cada build' },
  { n: 'Probar',     d: 'SAST/DAST + pentesting interno' },
  { n: 'Lanzar',     d: 'Gates de seguridad antes de cada release' },
  { n: 'Desplegar',  d: 'Infraestructura endurecida (hardening)' },
  { n: 'Operar',     d: 'Gestión de accesos y secretos' },
  { n: 'Monitorear', d: 'Alertas, logs y respuesta a incidentes' },
]

function StepCard({ st, i }: { st: typeof STEPS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (document.body.classList.contains('motion-min')) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <motion.div
      ref={ref}
      className="step rv"
      style={{ transitionDelay: `${i * 60}ms` }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
    >
      <span className="n">{String(i + 1).padStart(2, '0')}</span>
      <h4>{st.n}</h4>
      <p>{st.d}</p>
    </motion.div>
  )
}

interface Props { motionLevel?: string }

export function Process({ motionLevel = 'max' }: Props) {
  const rafRef = useRef<number>(0)
  const trailRef = useRef<SVGPathElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const ghostRef = useRef<SVGPathElement>(null)
  const labelRefs = useRef<(SVGTextElement | null)[]>([])
  const labelDists = useRef<number[]>([])

  useEffect(() => {
    if (motionLevel === 'min') return
    const ghost = ghostRef.current, trail = trailRef.current, dot = dotRef.current
    if (!ghost || !trail || !dot) return
    labelDists.current = LABEL_POS.map(pos => findClosestDist(ghost, pos.x, pos.y))
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = (ts - start) % (CYCLE_MS * 2)
      const inErase = elapsed >= CYCLE_MS
      const phase = (elapsed % CYCLE_MS) / CYCLE_MS
      const dotDist = phase * PATH_LEN
      const p = ghost.getPointAtLength(dotDist)
      dot.setAttribute('cx', String(p.x))
      dot.setAttribute('cy', String(p.y))
      let dashStart: number, dashLen: number
      if (!inErase) { dashStart = 0; dashLen = dotDist }
      else { dashStart = dotDist; dashLen = PATH_LEN - dotDist }
      trail.setAttribute('stroke-dasharray', `0 ${dashStart} ${Math.max(0, dashLen)} ${PATH_LEN}`)
      labelDists.current.forEach((labelDist, i) => {
        const el = labelRefs.current[i]
        if (!el) return
        el.style.opacity = (!inErase ? dotDist >= labelDist : dotDist < labelDist) ? '1' : '0'
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [motionLevel])

  return (
    <section className="block" id="proceso" data-screen-label="Proceso DevSecOps">
      <div className="container">
        <SectionHead label="03 — DevSecOps" title="Seguridad en cada vuelta."
          sub={<>Para proyectos de misión crítica, ofrecemos un ciclo de desarrollo donde la auditoría ofensiva ocurre en paralelo a la construcción. <span style={{ color: 'var(--accent)' }}>Tu software nace auditado.</span></>} />
        <Reveal className="loop-wrap">
          <svg className="loop-svg" viewBox="0 0 800 320" aria-hidden="true">
            <path ref={ghostRef} d={LOOP_D} fill="none" stroke="none" />
            <path className="rail" d={LOOP_D} fill="none" strokeWidth="2" />
            {motionLevel !== 'min' ? (
              <path ref={trailRef} d={LOOP_D} fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0" />
            ) : (
              <path className="draw" d={LOOP_D} fill="none" strokeWidth="2.5" />
            )}
            <text style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', fill: 'var(--text)', letterSpacing: '.08em' }} x="262" y="167" textAnchor="middle">DEV</text>
            <circle className="node" cx="400" cy="160" r="38" strokeWidth="1.5" />
            <text className="sec-core" x="400" y="170" textAnchor="middle">SEC</text>
            <text style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '22px', fill: 'var(--text)', letterSpacing: '.08em' }} x="538" y="167" textAnchor="middle">OPS</text>
            {LABEL_POS.map((pos, i) => (
              <text key={i} ref={el => { labelRefs.current[i] = el }} x={pos.x} y={pos.y} textAnchor="middle" className="loop-label">
                {STEPS[i].n}
              </text>
            ))}
            {motionLevel !== 'min' && <circle ref={dotRef} r="5" cx="400" cy="160" fill="var(--accent)" />}
          </svg>
        </Reveal>
        <div className="steps-grid">
          {STEPS.map((st, i) => <StepCard key={st.n} st={st} i={i} />)}
        </div>
      </div>
    </section>
  )
}
