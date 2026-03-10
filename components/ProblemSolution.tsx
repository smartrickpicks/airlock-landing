'use client'

import { motion } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const beforeItems = [
  'Contracts buried in email threads',
  'Approvals lost in Slack DMs',
  'Status tracked in spreadsheets nobody updates',
  'No audit trail when things go wrong',
]

const afterItems = [
  'One Vault per deal — every document, event, and decision',
  'Gates enforce accountability at every stage',
  'Dispatch shows your entire operation at a glance',
  'Every action logged, every approval traced',
]

export default function ProblemSolution() {
  return (
    <section id="features" className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="font-bold text-[var(--text-primary)] text-center mb-16"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Sound familiar?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-8 border-l-2 border-l-red-500/30"
          >
            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-6">
              Before Airlock
            </p>
            <div className="space-y-4">
              {beforeItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-500/70 shrink-0 mt-0.5" />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-8 border-l-2 border-l-[var(--accent-primary)]/30"
          >
            <p className="text-[var(--text-muted)] text-sm uppercase tracking-wider mb-6">
              With Airlock
            </p>
            <div className="space-y-4">
              {afterItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
