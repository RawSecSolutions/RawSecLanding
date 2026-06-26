'use client'

import { useState, useEffect } from 'react'

interface Line { t: 'cmd' | 'ok' | 'out'; s: string }
interface Props { lines: Line[]; motionLevel?: string }

export function TerminalTyper({ lines, motionLevel = 'max' }: Props) {
  const [done, setDone] = useState<Line[]>([])
  const [cur, setCur] = useState<string | null>('')
  const [li, setLi] = useState(0)

  useEffect(() => {
    if (motionLevel === 'min') { setDone(lines); setCur(null); return }
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>

    function typeLine(idx: number) {
      if (cancelled || idx >= lines.length) return
      const line = lines[idx]
      const isCmd = line.t === 'cmd'
      let ci = 0
      function tick() {
        if (cancelled) return
        ci++
        setCur(line.s.slice(0, ci))
        if (ci < line.s.length) {
          timer = setTimeout(tick, isCmd ? 34 : 8)
        } else {
          timer = setTimeout(() => {
            if (cancelled) return
            setDone(d => [...d, line]); setCur(''); setLi(idx + 1); typeLine(idx + 1)
          }, isCmd ? 320 : 420)
        }
      }
      timer = setTimeout(tick, isCmd ? 500 : 150)
    }

    setDone([]); setCur(''); setLi(0)
    typeLine(0)
    return () => { cancelled = true; clearTimeout(timer) }
  }, [lines, motionLevel])

  const renderLine = (l: Line, key: number | string, partial?: string | null) => {
    const text = partial != null ? partial : l.s
    if (l.t === 'cmd') return <div key={key} className="ln-cmd"><span className="prompt">$</span>{text}</div>
    if (l.t === 'ok') return <div key={key} className="ln-ok">{text}</div>
    return <div key={key} className="ln-out">{text}</div>
  }

  return (
    <div className="term-body" aria-hidden="true">
      {done.map((l, i) => renderLine(l, i))}
      {cur !== null && li < lines.length && renderLine(lines[li], 'cur', cur)}
      <span className="term-cursor" />
    </div>
  )
}
