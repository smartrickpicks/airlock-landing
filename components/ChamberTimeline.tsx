'use client'

import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const chambers = [
  {
    name: 'Discover',
    role: 'Builder',
    description:
      'Research and explore. Gather intelligence, identify opportunities, assess risk.',
    color: 'var(--chamber-discover)',
  },
  {
    name: 'Build',
    role: 'Builder',
    description:
      'Draft and assemble. Create documents, configure terms, build the deal.',
    color: 'var(--chamber-build)',
  },
  {
    name: 'Review',
    role: 'Gatekeeper',
    description:
      'Review and approve. Verify quality, align stakeholders, enforce standards.',
    color: 'var(--chamber-review)',
  },
  {
    name: 'Ship',
    role: 'Owner',
    description:
      'Promote and publish. Sign, execute, and deliver — with full audit trail.',
    color: 'var(--chamber-ship)',
  },
]

export default function ChamberTimeline() {
  return (
    <section id="how-it-works" className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="font-bold text-[var(--text-primary)] text-center mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          How work flows through Airlock
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--text-secondary)] text-center mb-16 text-lg"
        >
          Every vault moves through four chambers — from discovery to delivery.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto relative"
        >
          {/* Connecting lines (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none">
            <div className="mx-16 h-[2px] bg-[var(--border-primary)]" />
          </div>

          {chambers.map((chamber) => (
            <motion.div
              key={chamber.name}
              variants={staggerItem}
              className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-6 relative overflow-hidden"
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ backgroundColor: chamber.color }}
              />

              {/* Chamber dot */}
              <div
                className="w-[10px] h-[10px] rounded-full mb-4"
                style={{ backgroundColor: chamber.color }}
              />

              {/* Chamber name */}
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {chamber.name}
              </h3>

              {/* Role badge */}
              <span
                className="inline-block text-xs px-2 py-0.5 rounded-full mt-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${chamber.color} 10%, transparent)`,
                  color: chamber.color,
                }}
              >
                {chamber.role}
              </span>

              {/* Description */}
              <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                {chamber.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
