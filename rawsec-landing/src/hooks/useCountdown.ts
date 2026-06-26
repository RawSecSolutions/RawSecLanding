'use client'

import { useState, useEffect } from 'react'

export function useCountdown(targetIso: string) {
  const calc = () => {
    const diff = Math.max(0, new Date(targetIso).getTime() - Date.now())
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor(diff / 3600000) % 24,
      mins: Math.floor(diff / 60000) % 60,
    }
  }
  const [v, setV] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setV(calc()), 30000)
    return () => clearInterval(id)
  }, [targetIso])
  return v
}
