'use client'

import { useEffect, useRef } from 'react'
import { signalParticlesReady } from '@/lib/motion'

interface Props { density?: number; motionLevel?: string }

export function ParticleField({ density = 60, motionLevel = 'max' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas?.parentElement) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number, w: number, h: number, dpr: number
    let nodes: Array<{ x: number; y: number; vx: number; vy: number; bvx: number; bvy: number; r: number }> = []
    let running = true
    const mouse = { x: -9999, y: -9999 }
    const speed = motionLevel === 'max' ? 1 : motionLevel === 'elegant' ? 0.4 : 0
    const accent = () => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#2dd4bf'

    function resize() {
      if (!canvas?.parentElement) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const r = canvas.parentElement.getBoundingClientRect()
      w = r.width; h = r.height
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px'
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(240, Math.round((w * h) / 13000 * (density / 60)))
      nodes = Array.from({ length: Math.max(14, count) }, () => {
        const bvx = (Math.random() - 0.5) * 0.5, bvy = (Math.random() - 0.5) * 0.5
        return { x: Math.random() * w, y: Math.random() * h, vx: bvx, vy: bvy, bvx, bvy, r: Math.random() * 1.6 + 0.7 }
      })
    }

    let firstFrame = true
    function frame() {
      if (!running || !ctx) return
      ctx.clearRect(0, 0, w, h)
      const col = accent()
      const LINK = 130
      for (const n of nodes) {
        if (speed > 0) {
          n.x += n.vx * speed; n.y += n.vy * speed
          const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy
          if (d2 < 25600) { const d = Math.sqrt(d2 + 1); n.vx += (dx / d) * 0.35; n.vy += (dy / d) * 0.35 }
          n.vx += (n.bvx - n.vx) * 0.02; n.vy += (n.bvy - n.vy) * 0.02
          const spd = Math.hypot(n.vx, n.vy)
          if (spd > 3.5) { n.vx = (n.vx / spd) * 3.5; n.vy = (n.vy / spd) * 3.5 }
          if (n.x < -20) n.x = w + 20; if (n.x > w + 20) n.x = -20
          if (n.y < -20) n.y = h + 20; if (n.y > h + 20) n.y = -20
        }
      }
      ctx.lineWidth = 1
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy)
          if (d < LINK) { ctx.globalAlpha = (1 - d / LINK) * 0.22; ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke() }
        }
      }
      ctx.globalAlpha = 0.8; ctx.fillStyle = col
      for (const n of nodes) { ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill() }
      ctx.globalAlpha = 1
      if (firstFrame) { firstFrame = false; signalParticlesReady() }
      if (speed > 0) raf = requestAnimationFrame(frame)
    }

    function onMouse(e: PointerEvent) {
      if (!canvas) return
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }

    resize(); frame()
    window.addEventListener('resize', resize)
    canvas.parentElement.addEventListener('pointermove', onMouse as EventListener)
    return () => {
      running = false; cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas?.parentElement?.removeEventListener('pointermove', onMouse as EventListener)
    }
  }, [density, motionLevel])

  return <canvas ref={canvasRef} className="pfield" aria-hidden="true" />
}
