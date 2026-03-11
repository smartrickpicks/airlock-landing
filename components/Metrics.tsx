'use client'

import { motion, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

/* ── Animated counter ─────────────────────────────────────────────────────── */

function AnimatedNumber({ value, duration = 2, suffix = '' }: { value: number; duration?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? displayValue : 0}{suffix}
    </span>
  )
}

const metrics = [
  { value: 188, suffix: '', label: 'Pre-approved clauses', sublabel: 'unified clause library v2', prefix: '' },
  { value: 24, suffix: '', label: 'Contract types', sublabel: 'across 5 entertainment verticals', prefix: '' },
  { value: 442, suffix: '', label: 'Field registry entries', sublabel: '9 extractor types', prefix: '' },
  { value: 2, suffix: 's', label: 'Context assembly', sublabel: '9 enrichment sources in parallel', prefix: '< ' },
]

export default function Metrics() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="py-24 px-6 md:py-32 md:px-8 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,209,255,0.04), transparent 70%)',
        }}
      />

      <div className="max-w-[1000px] mx-auto relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {metric.prefix}
                <AnimatedNumber value={metric.value} suffix={metric.suffix} duration={2 + i * 0.3} />
              </p>
              <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                {metric.label}
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                {metric.sublabel}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider max-w-[800px] mx-auto mt-24" />
    </section>
  )
}
