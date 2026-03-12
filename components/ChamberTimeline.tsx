'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const chambers = [
  {
    name: 'Discover',
    role: 'Builder',
    iconSrc: '/brand/icons/chamber-discover.png',
    description:
      'Initial intake and extraction. AI pulls structured data from unstructured documents — 9 extractor types running in parallel.',
    color: 'var(--chamber-discover)',
    number: '01',
  },
  {
    name: 'Build',
    role: 'Builder',
    iconSrc: '/brand/icons/chamber-build.png',
    description:
      'Refinement and preparation. Correct errors, fill gaps, generate contracts from the 188-clause library. Data shaped into final form.',
    color: 'var(--chamber-build)',
    number: '02',
  },
  {
    name: 'Review',
    role: 'Gatekeeper',
    iconSrc: '/brand/icons/chamber-review.png',
    description:
      'Quality gates with preflight validation. Risk scoring, required field checks, confidence thresholds — all enforced before advancing.',
    color: 'var(--chamber-review)',
    number: '03',
  },
  {
    name: 'Ship',
    role: 'Owner',
    iconSrc: '/brand/icons/chamber-ship.png',
    description:
      'Published and locked. No further changes without a new patch. Full audit trail, version history, and export to PDF or DOCX.',
    color: 'var(--chamber-ship)',
    number: '04',
  },
]

export default function ChamberTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section id="how-it-works" ref={sectionRef} className="py-24 px-6 md:py-32 md:px-8 relative">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(99,102,241,0.03), transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[var(--accent-secondary)] uppercase tracking-widest mb-4">
            Workflow
          </p>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            How work flows through Airlock
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            Every vault moves through four chambers — each with quality gates that enforce standards
            before advancing. One universal lifecycle for contracts, CRM, tasks, and more.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative"
        >
          {/* Connecting beam (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] pointer-events-none">
            <div
              className="h-[2px] beam-line relative overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, var(--chamber-discover), var(--chamber-build), var(--chamber-review), var(--chamber-ship))',
              }}
            />
          </div>

          {chambers.map((chamber, i) => {
            return (
              <motion.div
                key={chamber.name}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 relative overflow-hidden glow-card card-3d group"
              >
                {/* Top accent bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: chamber.color }}
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                />

                {/* Number + Icon */}
                <div className="flex items-center justify-between mb-5">
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${chamber.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${chamber.color} 20%, transparent)`,
                    }}
                    whileHover={{
                      boxShadow: `0 0 20px color-mix(in srgb, ${chamber.color} 20%, transparent)`,
                    }}
                  >
                    <Image src={chamber.iconSrc} alt={chamber.name} width={24} height={24} className="w-6 h-6" />
                  </motion.div>
                  <span className="text-2xl font-bold text-[var(--border-primary)] font-mono">
                    {chamber.number}
                  </span>
                </div>

                {/* Chamber name */}
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {chamber.name}
                </h3>

                {/* Role badge */}
                <span
                  className="inline-block text-[10px] font-mono px-2 py-0.5 rounded-md mb-3 uppercase tracking-wider"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${chamber.color} 8%, transparent)`,
                    color: chamber.color,
                  }}
                >
                  {chamber.role}
                </span>

                {/* Description */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {chamber.description}
                </p>

                {/* Step connector dot (desktop) */}
                <div className="hidden lg:block absolute -top-[5px] left-1/2 -translate-x-1/2">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full border-2"
                    style={{
                      borderColor: chamber.color,
                      backgroundColor: 'var(--bg-base)',
                    }}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.15, type: 'spring' }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
