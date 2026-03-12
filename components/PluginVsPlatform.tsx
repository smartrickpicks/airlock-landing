'use client'

import { motion } from 'framer-motion'
import { Check, Minus } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const features = [
  { name: 'Otto AI (17 personas)', plugin: true, platform: true },
  { name: 'Constellation council', plugin: true, platform: true },
  { name: 'Skill invocation', plugin: true, platform: true },
  { name: 'Local codebase context', plugin: true, platform: true },
  { name: 'Quality (vs platform)', plugin: '96.8%', platform: '100%' },
  { name: 'Vault lifecycle (4 chambers)', plugin: false, platform: true },
  { name: 'Chamber gates & enforcement', plugin: false, platform: true },
  { name: 'Separation of duties', plugin: false, platform: true },
  { name: 'Append-only audit trail', plugin: false, platform: true },
  { name: 'Team behavioral mapping', plugin: false, platform: true },
  { name: 'CRM, calendar, task modules', plugin: false, platform: true },
  { name: 'Real-time collaboration', plugin: false, platform: true },
  { name: 'Session memory & continuity', plugin: false, platform: true },
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
            Plugin vs Platform
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">
            The free Claude Code plugin gives you Otto&apos;s full intelligence.
            The platform adds governance, persistence, and institutional memory.
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
              <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Plugin</p>
              <p className="text-[10px] text-[var(--text-muted)]">Free forever</p>
            </div>
            <div className="text-center">
              <p className="text-xs font-mono text-[var(--accent-primary)] uppercase tracking-wider">Platform</p>
              <p className="text-[10px] text-[var(--text-muted)]">From $49.99/mo</p>
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
          The plugin is the top of the funnel — not competition.
          Statelessness self-selects users into the platform.
        </motion.p>
      </div>
    </section>
  )
}
