'use client'

import { motion } from 'framer-motion'
import { FileText, Users, CheckSquare, Calendar, FileEdit } from 'lucide-react'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const modules = [
  { icon: FileText, name: 'Contracts', desc: '188 clauses, 24 types, 5 verticals', sub: 'Generate, extract, and manage contracts with a pre-approved clause library and AI-powered extraction engine.', color: 'var(--chamber-discover)' },
  { icon: Users, name: 'CRM', desc: 'Vault-native pipeline', sub: 'CRM is a lens over your vault hierarchy — accounts, subsidiaries, contacts, and deals in one data model.', color: 'var(--chamber-build)' },
  { icon: CheckSquare, name: 'Triage', desc: 'Issue resolution hub', sub: 'Your analyst command center. Severity-based queues, batch progress tracking, and one-click resolution.', color: 'var(--accent-primary)' },
  { icon: Calendar, name: 'Calendar', desc: 'Cross-module date intelligence', sub: 'Auto-surfaces contract deadlines, renewal dates, and SLA alerts. No manual event creation needed.', color: 'var(--chamber-review)' },
  { icon: FileEdit, name: 'Documents', desc: 'TipTap editor + PDF viewer', sub: 'Rich text editing with live variable binding, clause blocks, version diffing, and annotation overlays.', color: 'var(--chamber-ship)' },
]

export default function Modules() {
  return (
    <section id="modules" className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            Platform
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Five modules. One workspace.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            Contracts, CRM, triage, calendar, and documents — deeply integrated, not bolted together. Every module shares the same vault architecture.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto"
        >
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <motion.div
                key={mod.name}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 text-center glow-card group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${mod.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${mod.color} 20%, transparent)`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: mod.color }} />
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {mod.name}
                </p>
                <p className="text-xs text-[var(--accent-primary)]/70 font-mono mb-2">{mod.desc}</p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed hidden lg:block">{mod.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
