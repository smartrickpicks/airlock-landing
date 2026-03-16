'use client'

import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const features = [
  { name: 'Git conflict resolution', plugin: true, platform: true },
  { name: 'Pre-merge detection', plugin: true, platform: true },
  { name: 'Branch health monitoring', plugin: true, platform: true },
  { name: 'Otto AI (17 personas)', plugin: false, platform: true },
  { name: 'Constellation council', plugin: false, platform: true },
  { name: 'Persona succession (auto-rotation)', plugin: false, platform: true },
  { name: 'Ego shielding & field effects', plugin: false, platform: true },
  { name: 'Behavioral profile detection', plugin: false, platform: true },
  { name: 'Session memory & continuity', plugin: false, platform: true },
  { name: 'Glass box transparency score', plugin: false, platform: true },
  { name: 'Skill invocation (99 skills)', plugin: false, platform: true },
  { name: 'Team behavioral mapping', plugin: false, platform: true },
]

function FeatureCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') {
    return <span className="text-sm font-mono text-[var(--text-secondary)]">{value}</span>
  }
  if (value) {
    return (
      <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mx-auto">
        <Check className="w-3 h-3 text-[var(--accent-primary)]" />
      </div>
    )
  }
  return (
    <div className="w-5 h-5 rounded-full bg-[var(--bg-overlay)] flex items-center justify-center mx-auto">
      <Minus className="w-3 h-3 text-[var(--text-muted)]" />
    </div>
  )
}

export default function PluginVsPlatform() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            Same Brain, Different Body
          </p>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            NoConflict vs Forge
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            The free NoConflict CLI gives you Otto&apos;s conflict resolution.
            Forge adds behavioral intelligence, persona succession, and session memory.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 px-6 py-4 border-b border-[var(--border-subtle)]">
            <div />
            <div className="text-center">
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">NoConflict</p>
              <p className="text-[10px] text-[var(--text-muted)]">Free forever</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">Forge</p>
              <p className="text-[10px] text-[var(--text-muted)]">$29/mo · coming soon</p>
            </div>
          </div>

          {/* Rows */}
          {features.map((feature, i) => (
            <div
              key={feature.name}
              className={`grid grid-cols-3 gap-4 px-6 py-3 items-center ${
                i < features.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
              } ${!feature.plugin && feature.platform === true ? 'bg-[var(--accent-primary)]/[0.02]' : ''}`}
            >
              <span className="text-sm text-[var(--text-secondary)]">{feature.name}</span>
              <div className="text-center">
                <FeatureCell value={feature.plugin} />
              </div>
              <div className="text-center">
                <FeatureCell value={feature.platform} />
              </div>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs text-[var(--text-muted)] mt-4"
        >
          NoConflict is the door. Forge is where you stay.
          Same Otto — different depth.
        </motion.p>
      </div>
    </section>
  )
}
