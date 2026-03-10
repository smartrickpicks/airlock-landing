'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Clock,
  Repeat,
  Zap,
  Users,
  FileText,
} from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

/* ── Playbook step animation ──────────────────────────────────────────────── */

const playbookSteps = [
  {
    step: 1,
    title: 'Trigger Detected',
    desc: 'New contract uploaded to Vault',
    icon: Zap,
    color: 'var(--chamber-discover)',
    status: 'complete' as const,
  },
  {
    step: 2,
    title: 'Extract & Classify',
    desc: '9 extractors pull structured data',
    icon: FileText,
    color: 'var(--chamber-build)',
    status: 'complete' as const,
  },
  {
    step: 3,
    title: 'Risk Assessment',
    desc: 'Clause scoring: 3 elevated, 1 critical',
    icon: CheckCircle2,
    color: 'var(--chamber-review)',
    status: 'active' as const,
  },
  {
    step: 4,
    title: 'Route to Reviewer',
    desc: 'OTTO assigns based on PI profile',
    icon: Users,
    color: 'var(--accent-tertiary)',
    status: 'pending' as const,
  },
  {
    step: 5,
    title: 'Approval Gate',
    desc: 'Preflight checks + sign-off',
    icon: CheckCircle2,
    color: 'var(--chamber-ship)',
    status: 'pending' as const,
  },
]

function PlaybookVisualizer() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => setActiveStep((p) => (p + 1) % playbookSteps.length), 2500)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref} className="relative">
      <div className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 md:p-8 overflow-hidden">
        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--chamber-discover), var(--chamber-build), var(--chamber-review), var(--accent-tertiary), var(--chamber-ship))' }}
        />

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent-secondary)]/10 border border-[var(--accent-secondary)]/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[var(--accent-secondary)]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Contract Onboarding Playbook</p>
              <p className="text-[10px] text-[var(--text-muted)] font-mono">5 steps &middot; avg 4.2 min</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono"
              animate={{
                backgroundColor: ['rgba(0,209,255,0.05)', 'rgba(0,209,255,0.1)', 'rgba(0,209,255,0.05)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Repeat className="w-3 h-3 text-[var(--accent-primary)]" />
              <span className="text-[var(--accent-primary)]">Running</span>
            </motion.div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {playbookSteps.map((step, i) => {
            const Icon = step.icon
            const isCurrent = activeStep === i
            const isPast = i < activeStep
            const statusColor = isPast || isCurrent ? step.color : 'var(--text-muted)'

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connecting line */}
                {i < playbookSteps.length - 1 && (
                  <div
                    className="absolute left-[19px] top-[40px] w-[2px] h-[calc(100%-8px)]"
                    style={{
                      backgroundColor: isPast ? step.color : 'var(--border-primary)',
                      opacity: isPast ? 0.4 : 0.3,
                    }}
                  />
                )}

                <motion.div
                  className="flex items-start gap-4 p-3 rounded-xl border transition-all"
                  animate={{
                    borderColor: isCurrent ? step.color : 'rgba(26,31,46,0)',
                    backgroundColor: isCurrent ? `color-mix(in srgb, ${step.color} 3%, transparent)` : 'transparent',
                  }}
                >
                  {/* Step indicator */}
                  <motion.div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${statusColor} ${isCurrent ? '15' : '8'}%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${statusColor} ${isCurrent ? '30' : '15'}%, transparent)`,
                    }}
                    animate={isCurrent ? { scale: [1, 1.05, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5" style={{ color: step.color }} />
                    ) : (
                      <Icon className="w-5 h-5" style={{ color: statusColor }} />
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold" style={{ color: isPast || isCurrent ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {step.title}
                      </span>
                      {isCurrent && (
                        <motion.span
                          className="text-[8px] font-mono px-1.5 py-0.5 rounded-full"
                          style={{ backgroundColor: `color-mix(in srgb, ${step.color} 15%, transparent)`, color: step.color }}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ACTIVE
                        </motion.span>
                      )}
                      {isPast && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-[var(--chamber-ship)]/10 text-[var(--chamber-ship)]">
                          DONE
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{step.desc}</p>
                  </div>

                  {/* Duration */}
                  {(isPast || isCurrent) && (
                    <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] font-mono shrink-0">
                      <Clock className="w-3 h-3" />
                      {isPast ? `${((i + 1) * 0.8).toFixed(1)}s` : '...'}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ── Playbook types ───────────────────────────────────────────────────────── */

const playbookTypes = [
  {
    name: 'Contract Onboarding',
    desc: 'Upload to extraction to risk scoring in one flow',
    steps: 5,
    time: '4.2 min avg',
    color: 'var(--chamber-discover)',
  },
  {
    name: 'Deal Qualification',
    desc: 'CRM intake through enrichment to pipeline staging',
    steps: 4,
    time: '2.8 min avg',
    color: 'var(--chamber-build)',
  },
  {
    name: 'Renewal Pipeline',
    desc: 'Auto-detect expiring contracts, draft renewals, route for approval',
    steps: 6,
    time: '6.1 min avg',
    color: 'var(--chamber-review)',
  },
  {
    name: 'Compliance Audit',
    desc: 'Clause validation, risk flagging, evidence pack generation',
    steps: 7,
    time: '8.5 min avg',
    color: 'var(--accent-tertiary)',
  },
]

/* ── Main Section ─────────────────────────────────────────────────────────── */

export default function PlaybookEngine() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(99,102,241,0.05), transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[var(--accent-secondary)]/5 border border-[var(--accent-secondary)]/20 rounded-full px-5 py-2 text-sm mb-6 backdrop-blur-sm">
            <BookOpen className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
            <span className="text-[var(--accent-secondary)] font-medium">Workflow Automation</span>
          </div>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {'Playbooks that '}
            <span className="gradient-text">run themselves.</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            Define multi-step workflows that trigger automatically. Each playbook combines OTTO
            intelligence, chamber gates, and human checkpoints into repeatable, auditable processes.
          </p>
        </motion.div>

        {/* Two-column: Visualizer + Types */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          {/* Left: Live playbook visualizer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportConfig}
            transition={{ duration: 0.7 }}
          >
            <PlaybookVisualizer />
          </motion.div>

          {/* Right: Playbook catalog */}
          <div className="space-y-4">
            <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">
              Playbook Library
            </p>
            {playbookTypes.map((pb, i) => (
              <motion.div
                key={pb.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-5 glow-card card-3d group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: pb.color }}
                      />
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{pb.name}</h3>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{pb.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors shrink-0 mt-1" />
                </div>
                <div className="flex gap-3 mt-3">
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {pb.steps} steps
                  </span>
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">
                    {pb.time}
                  </span>
                </div>
              </motion.div>
            ))}

            {/* Custom playbook CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="border border-dashed border-[var(--border-primary)] rounded-xl p-4 text-center hover:border-[var(--accent-primary)]/30 transition-colors cursor-pointer group"
            >
              <p className="text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] transition-colors">
                + Build custom playbooks with the visual editor
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider max-w-[800px] mx-auto mt-24" />
    </section>
  )
}
