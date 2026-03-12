'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 1.5,
  decimals = 0,
}: {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return

    const start = performance.now()
    const end = start + duration * 1000

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / (duration * 1000), 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * target

      if (decimals > 0) {
        setDisplay(current.toFixed(decimals))
      } else {
        setDisplay(Math.round(current).toLocaleString())
      }

      if (now < end) {
        requestAnimationFrame(tick)
      } else {
        // Final value
        if (decimals > 0) {
          setDisplay(target.toFixed(decimals))
        } else {
          setDisplay(target.toLocaleString())
        }
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, target, duration, decimals])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{display}{suffix}
    </span>
  )
}
