'use client'

import { motion } from 'framer-motion'
import {
  FileText,
  Scan,
  AlertTriangle,
  Workflow,
  FileBarChart,
  Activity,
} from 'lucide-react'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const features = [
  {
    icon: FileText,
    title: 'Contract Generator',
    description:
      'Two-pane guided builder: select from 24 contract types across 5 verticals, pick clauses from the 188-clause library, and watch the live preview update as you build.',
    stats: ['188 clauses', '24 types', '5 verticals'],
    color: 'var(--chamber-discover)',
  },
  {
    icon: Scan,
    title: 'Extraction Engine',
    description:
      '9 extractor types \u2014 date, text, currency, percentage, number, boolean, pattern, picklist, and split \u2014 pull structured data from unstructured PDFs and documents automatically.',
    stats: ['442 fields', '9 extractors', '79 CUAD labels'],
    color: 'var(--accent-primary)',
  },
  {
    icon: AlertTriangle,
    title: 'Clause Risk Scoring',
    description:
      'Every clause is classified by risk level: Standard, Elevated, Critical, or High. Amber and red indicators flag terms that need review before the contract advances.',
    stats: ['107 standard', '59 elevated', '22 critical+'],
    color: 'var(--chamber-build)',
  },
  {
    icon: Workflow,
    title: 'Playbook Engine',
    description:
      'DAG-based workflow automation. Trigger a playbook, and Otto walks your team through extraction, risk scoring, routing, and approval \u2014 with human gates at every critical node.',
    stats: ['DAG workflows', 'Auto-routing', 'Gate enforcement'],
    color: 'var(--accent-secondary)',
  },
  {
    icon: FileBarChart,
    title: 'Brief System',
    description:
      'Otto-authored intelligence briefs for every context: Vault Briefs summarize deal state, Play Briefs track playbook progress, Team Briefs surface roster gaps, Gate Briefs explain why you were stopped.',
    stats: ['Vault Brief', 'Play Brief', 'Gate Brief'],
    color: 'var(--chamber-review)',
  },
  {
    icon: Activity,
    title: 'Pulse Health Scoring',
    description:
      'Continuous 0\u2013100 health scores across deals, contracts, and team workload. Pulse aggregates extraction confidence, clause risk, deadline proximity, and gate throughput into one number.',
    stats: ['0\u2013100 score', 'Real-time', 'Multi-signal'],
    color: 'var(--chamber-ship)',
  },
]

export default function FeatureShowcase() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(99,102,241,0.04), transparent 70%)',
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
            Deep Dive
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Built for contract intelligence.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            From clause libraries to extraction engines — every feature designed
            for teams who manage contracts at scale.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-7 relative overflow-hidden glow-card card-3d group"
              >
                {/* Top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: feature.color }}
                />

                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${feature.color} 10%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${feature.color} 20%, transparent)`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: feature.color }} />
                </div>

                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-2">
                  {feature.stats.map((stat) => (
                    <span
                      key={stat}
                      className="text-[10px] font-mono px-2 py-1 rounded-md"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${feature.color} 8%, transparent)`,
                        color: feature.color,
                      }}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="section-divider max-w-[800px] mx-auto mt-24" />
    </section>
  )
}
