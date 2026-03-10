'use client'

import { motion } from 'framer-motion'
import { X, Check, ArrowRight } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const beforeItems = [
  'Contracts scattered across email, Drive, and Dropbox — no single source of truth',
  'Approvals lost in Slack threads with no audit trail or accountability',
  'Deal status tracked in spreadsheets that are outdated the moment they are saved',
  'Manual extraction from PDFs — copy-pasting clause data into yet another tool',
  'Context switching between 5+ apps to process a single deal',
]

const afterItems = [
  'One Vault per deal — contracts, events, approvals, and documents in a single record',
  'Gates enforce quality at every stage with preflight validation and role-based access',
  'AI-powered extraction pulls structured data from contracts — 9 extractor types, zero copy-paste',
  '188-clause library generates contracts across 24 types and 5 entertainment verticals',
  'Full audit trail — every action logged, every approval traced, every patch versioned',
]

export default function ProblemSolution() {
  return (
    <section id="features" className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            The Problem
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            The Fragmentation Tax
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            Your team uses an average of 8 tools to manage a single deal lifecycle.
            That costs more than you think.
          </p>
        </motion.div>

        {/* Industry Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          {[
            { value: '9.2%', label: 'Revenue lost', sub: 'to poor contract mgmt' },
            { value: '25x', label: 'App switches', sub: 'per day per worker' },
            { value: '30%', label: 'CRM data decay', sub: 'per year without maintenance' },
            { value: '130+', label: 'SaaS apps', sub: 'average enterprise stack' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-red-400 mb-1">{stat.value}</p>
              <p className="text-xs font-medium text-[var(--text-primary)]">{stat.label}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{stat.sub}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Before Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6 }}
            className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-8 relative overflow-hidden glow-card"
          >
            {/* Red accent glow */}
            <div
              className="absolute top-0 left-0 w-full h-[2px]"
              style={{ background: 'linear-gradient(90deg, #EF4444, transparent)' }}
            />
            <p className="text-red-400/80 text-xs font-mono uppercase tracking-wider mb-6">
              Before Airlock
            </p>
            <div className="space-y-4">
              {beforeItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow (desktop) */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          </div>

          {/* After Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-8 relative overflow-hidden glow-card"
          >
            {/* Cyan accent glow */}
            <div
              className="absolute top-0 left-0 w-full h-[2px]"
              style={{ background: 'linear-gradient(90deg, var(--accent-primary), transparent)' }}
            />
            <p className="text-[var(--accent-primary)]/80 text-xs font-mono uppercase tracking-wider mb-6">
              With Airlock
            </p>
            <div className="space-y-4">
              {afterItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[var(--accent-primary)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
