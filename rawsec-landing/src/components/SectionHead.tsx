'use client'

import { Reveal } from '@/components/ui/Reveal'

import { type ReactNode } from 'react'

interface Props { label: string; title: string; sub?: ReactNode }

export function SectionHead({ label, title, sub }: Props) {
  return (
    <div className="sec-head">
      <Reveal><div className="sec-label">{label}</div></Reveal>
      <Reveal delay={80}><h2 className="sec-title">{title}</h2></Reveal>
      {sub && <Reveal delay={160}><p className="sec-sub">{sub}</p></Reveal>}
    </div>
  )
}
