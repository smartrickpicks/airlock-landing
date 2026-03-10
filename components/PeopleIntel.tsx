'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  Brain,
  Sparkles,
  Zap,
  Shield,
  GitBranch,
  Database,
  MessageSquare,
  Eye,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

/* ── MAGS Architecture Diagram ────────────────────────────────────────────── */

const enrichmentSources = [
  { label: 'Gate State', icon: Shield, color: 'var(--chamber-review)' },
  { label: 'Field Summary', icon: Database, color: 'var(--accent-primary)' },
  { label: 'Contract Health', icon: Eye, color: 'var(--chamber-build)' },
  { label: 'Domain Rules', icon: GitBranch, color: 'var(--accent-secondary)' },
  { label: 'Corpus Search', icon: Layers, color: 'var(--accent-tertiary)' },
  { label: 'Extraction Meta', icon: Zap, color: 'var(--chamber-discover)' },
  { label: 'Patch History', icon: GitBranch, color: 'var(--chamber-ship)' },
  { label: 'Deal Fields', icon: Database, color: 'var(--accent-primary)' },
  { label: 'Vault Context', icon: MessageSquare, color: 'var(--accent-secondary)' },
]

function MAGSFlowDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeSource, setActiveSource] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => setActiveSource((p) => (p + 1) % enrichmentSources.length), 800)
    return () => clearInterval(timer)
  }, [isInView])

  return (
    <div ref={ref} className="relative max-w-4xl mx-auto">
      {/* Background glow */}
      <div
        className="absolute inset-0 -m-8 rounded-3xl"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(168,85,247,0.06), transparent 70%)',
        }}
      />

      <div className="relative bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 md:p-8 overflow-hidden">
        {/* Gradient top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-tertiary), var(--accent-secondary))' }}
        />

        {/* Architecture flow */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 md:gap-2 items-center">
          {/* Sources column */}
          <div>
            <p className="text-[10px] font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-3 text-center">
              9 Enrichment Sources
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {enrichmentSources.map((src, i) => {
                const Icon = src.icon
                const isActive = activeSource === i
                return (
                  <motion.div
                    key={src.label}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border transition-all"
                    animate={{
                      borderColor: isActive ? src.color : 'rgba(26,31,46,0.6)',
                      backgroundColor: isActive ? `color-mix(in srgb, ${src.color} 5%, transparent)` : 'transparent',
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: isActive ? src.color : 'var(--text-muted)' }} />
                    <span className="text-[8px] font-mono text-[var(--text-muted)] text-center leading-tight">
                      {src.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center gap-1">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 text-[var(--accent-primary)]/40" />
            </motion.div>
            <span className="text-[8px] font-mono text-[var(--text-muted)]">&lt; 2s</span>
          </div>

          {/* OTTO Core */}
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-mono text-[var(--accent-tertiary)] uppercase tracking-widest mb-3">
              OTTO Engine
            </p>
            <motion.div
              className="relative w-32 h-32 rounded-2xl border-2 flex items-center justify-center"
              animate={{
                borderColor: [
                  'rgba(168,85,247,0.3)',
                  'rgba(0,209,255,0.3)',
                  'rgba(99,102,241,0.3)',
                  'rgba(168,85,247,0.3)',
                ],
                boxShadow: [
                  '0 0 20px rgba(168,85,247,0.1)',
                  '0 0 30px rgba(0,209,255,0.15)',
                  '0 0 20px rgba(99,102,241,0.1)',
                  '0 0 20px rgba(168,85,247,0.1)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundColor: 'rgba(168,85,247,0.03)' }}
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Brain className="w-8 h-8 text-[var(--accent-tertiary)] mx-auto mb-1" />
                </motion.div>
                <span className="text-xs font-bold text-[var(--text-primary)]">MAGS</span>
                <span className="block text-[8px] text-[var(--text-muted)]">Multi-Arc</span>
              </div>
              {/* Orbiting dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full bg-[var(--accent-primary)]"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-4px',
                  marginLeft: '-4px',
                  transformOrigin: '4px -56px',
                }}
              />
            </motion.div>

            {/* Typed tools */}
            <div className="flex flex-wrap justify-center gap-1 mt-3 max-w-[200px]">
              {['Suggest', 'Extract', 'Validate', 'Draft', 'Score', 'Route', 'Enrich', 'Alert'].map((tool) => (
                <span
                  key={tool}
                  className="text-[7px] font-mono px-1.5 py-0.5 rounded bg-[var(--accent-tertiary)]/8 text-[var(--accent-tertiary)]/70 border border-[var(--accent-tertiary)]/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center gap-1">
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              <ArrowRight className="w-5 h-5 text-[var(--accent-primary)]/40" />
            </motion.div>
            <span className="text-[8px] font-mono text-[var(--text-muted)]">SSE</span>
          </div>

          {/* Output */}
          <div>
            <p className="text-[10px] font-mono text-[var(--chamber-ship)] uppercase tracking-widest mb-3 text-center">
              Human-in-the-Loop
            </p>
            <div className="space-y-2">
              {[
                { label: 'Clause Risk Alert', desc: '3 elevated clauses in Section 4', color: 'var(--chamber-build)' },
                { label: 'Extraction Complete', desc: '42 fields extracted, 98% confidence', color: 'var(--accent-primary)' },
                { label: 'Gate Ready', desc: 'All preflight checks passed', color: 'var(--chamber-ship)' },
              ].map((output, i) => (
                <motion.div
                  key={output.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                  className="bg-[var(--bg-overlay)] border border-[var(--border-subtle)] rounded-lg p-2.5"
                >
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: output.color }} />
                    <span className="text-[10px] font-semibold text-[var(--text-primary)]">{output.label}</span>
                  </div>
                  <p className="text-[9px] text-[var(--text-muted)] pl-3.5">{output.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Capability Cards ─────────────────────────────────────────────────────── */

const capabilities = [
  {
    icon: Brain,
    title: 'Predictive Intelligence (PI)',
    description:
      'OTTO uses Predictive Index behavioral profiles to route the right cognitive mode for every task. 17 personas, 4 chambers, contextually activated.',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'rgba(168, 85, 247, 0.2)',
    tag: 'MAGS Core',
  },
  {
    icon: Zap,
    title: 'Provider-Agnostic AI',
    description:
      'Pluggable model backend via LiteLLM proxy. Route to Claude, GPT, Grok, or Ollama. Automatic fallback chains. Your data, your model, your rules.',
    gradient: 'from-cyan-500/20 to-blue-500/20',
    borderColor: 'rgba(0, 209, 255, 0.2)',
    tag: 'Infrastructure',
  },
  {
    icon: Shield,
    title: 'Human-in-the-Loop Always',
    description:
      'OTTO proposes, humans approve. Configurable agent roles with custom skills and prompts per team. No autonomous actions — ever.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderColor: 'rgba(34, 197, 94, 0.2)',
    tag: 'Trust',
  },
  {
    icon: Sparkles,
    title: '393 Skills Library',
    description:
      'Pre-built skills spanning security review, content creation, market research, TDD, deployment, and more. Install from the marketplace or build your own.',
    gradient: 'from-indigo-500/20 to-violet-500/20',
    borderColor: 'rgba(99, 102, 241, 0.2)',
    tag: 'Ecosystem',
  },
]

/* ── Main Section ─────────────────────────────────────────────────────────── */

export default function PeopleIntel() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 100% 60% at 50% 30%, rgba(168,85,247,0.06), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 20% 70%, rgba(0,209,255,0.03), transparent 60%)',
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
          <div className="inline-flex items-center gap-2 bg-[var(--accent-tertiary)]/5 border border-[var(--accent-tertiary)]/20 rounded-full px-5 py-2 text-sm mb-6 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-tertiary)]" />
            <span className="text-[var(--accent-tertiary)] font-medium">AI-Native Architecture</span>
          </div>
          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            {'Meet '}
            <span className="gradient-text">MAGS + OTTO</span>
            {' — your AI operations layer.'}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-3xl mx-auto leading-relaxed">
            The Multi-Arc Governance System (MAGS) assembles vault context from 9 enrichment sources
            in under 2 seconds. OTTO is the persona engine that routes the right cognitive mode
            for every task — powered by Predictive Index behavioral science.
          </p>
        </motion.div>

        {/* MAGS Flow Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <MAGSFlowDiagram />
        </motion.div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((cap, i) => {
            const Icon = cap.icon
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 relative overflow-hidden glow-card card-3d group"
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b ${cap.gradient} to-transparent opacity-40`}
                />
                <div className="relative">
                  {/* Tag */}
                  <span className="text-[8px] font-mono uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
                    {cap.tag}
                  </span>
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                    style={{
                      border: `1px solid ${cap.borderColor}`,
                      background: `linear-gradient(135deg, ${cap.borderColor}, transparent)`,
                    }}
                  >
                    <Icon className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                    {cap.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Tech strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <span className="inline-block font-mono text-sm text-[var(--text-muted)] bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-full px-6 py-3 backdrop-blur-sm">
            PydanticAI &middot; Streaming SSE &middot; 8 Typed Tools &middot; LiteLLM &middot; Circuit Breaker &middot; 17 Personas
          </span>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="section-divider max-w-[800px] mx-auto mt-24" />
    </section>
  )
}
