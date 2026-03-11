'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import EmailCapture from '@/components/EmailCapture'
import ProfileExplorer from '@/components/ProfileExplorer'
import {
  ArrowLeft,
  Brain,
  Users,
  GitFork,
  Radio,
  Shield,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Vote,
  Gem,
  Merge,
  Zap,
  Search,
  ShieldAlert,
  FileText,
  Activity,
  Route,
  Sparkles,
  Cpu,
  DollarSign,
  Rocket,
  Blocks,
  BookOpen,
  Settings,
  Puzzle,
  Layout,
  Terminal,
  Download,
  Copy,
} from 'lucide-react'

const viewportConfig = { once: true, margin: '-80px' as const }

/* ── §1: Hero ─────────────────────────────────────────────────────────────── */

function OttoHero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center relative overflow-hidden pt-24 pb-16">
      {/* Purple constellation background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(124,92,252,0.12) 0%, rgba(168,85,247,0.04) 40%, transparent 70%)',
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="relative z-10 px-6 max-w-[900px] mx-auto">
        {/* Context line for direct visitors */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-sm text-[var(--text-muted)]">
            Airlock is a unified workspace for deal teams — contracts, CRM, tasks, calendar, documents.{' '}
            <Link href="/" className="text-[var(--accent-primary)] hover:underline">
              See the workspace <ArrowLeft className="inline w-3 h-3 rotate-180" />
            </Link>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Otto + MAGS constellation marks */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <Image
              src="/brand/hero/hero-otto.png"
              alt="Otto — Behavioral Constellation"
              width={200}
              height={200}
              className="opacity-90"
            />
            <Image
              src="/brand/hero/hero-mags.png"
              alt="MAGS — Multi-Arc Governance System"
              width={200}
              height={200}
              className="opacity-90"
            />
          </div>

          <p className="text-sm font-mono text-[#7C5CFC] uppercase tracking-widest mb-6">
            Meet Otto
          </p>
          <h1
            className="font-bold text-[var(--text-primary)] mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {"I\u2019m Otto. Not an assistant."}{' '}
            <span style={{ color: '#7C5CFC' }}>A behavioral counterweight.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            {"I\u2019m an otter. Under the fur I\u2019m a constellation \u2014 a behavioral node graph that reshapes based on how I\u2019m thinking. I mapped your team\u2019s cognitive drives before you opened the app. When your team has gaps, I fill them. When your plan has a flaw, I say so."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ── §2: How Otto Works — 4-Layer Stack ───────────────────────────────────── */

const layers = [
  {
    id: 'L1',
    title: 'Otto Learns You',
    status: 'active' as const,
    description: 'LinkedIn, resume, or a 2-minute conversation. I extract your behavioral drives \u2014 Dominance, Extraversion, Patience, Formality \u2014 and match you to one of 17 PI profiles. No setup wizard. No personality quiz. Just a conversation.',
    icon: Brain,
    color: '#7C5CFC',
  },
  {
    id: 'L2',
    title: 'Workspace Forge',
    status: 'active' as const,
    description: 'SpellBurst-pattern onboarding. I ask 2\u20134 goal questions, infer your MAGS archetype, and configure your workspace \u2014 modules, skills, layout, defaults. Your first encounter with Airlock is a conversation with me, not a settings page.',
    icon: Sparkles,
    color: '#A855F7',
  },
  {
    id: 'L3',
    title: 'Controller Hierarchy',
    status: 'coming' as const,
    description: 'Org tree mapping. I compute sovereign balance per branch \u2014 where the cognitive drives stack up, where the gaps live. A team of three Mavericks and zero Guardians? I compensate at the gates.',
    icon: GitFork,
    color: '#C084FC',
  },
  {
    id: 'L4',
    title: 'Coordination / Hive',
    status: 'coming' as const,
    description: 'Multi-agent orchestration along DAG edges. Role-based agents run pre-flight simulations on your playbooks. They find the friction before your team does. This is The Office \u2014 where behavioral intelligence meets workflow testing.',
    icon: Radio,
    color: '#E9D5FF',
  },
]

function HowOttoWorks() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[#7C5CFC] uppercase tracking-widest mb-4">
            The Stack
          </p>
          <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Four layers. From learning you to orchestrating your team.
          </h2>
        </motion.div>

        <div className="space-y-6">
          {layers.map((layer, i) => {
            const Icon = layer.icon
            return (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-8 relative overflow-hidden"
              >
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px]"
                  style={{ backgroundColor: layer.color }}
                />
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${layer.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${layer.color} 25%, transparent)`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: layer.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono" style={{ color: layer.color }}>{layer.id}</span>
                      <h3 className="text-lg font-semibold text-[var(--text-primary)]">{layer.title}</h3>
                      {layer.status === 'coming' && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--text-muted)]/10 text-[var(--text-muted)] border border-[var(--border-subtle)]">
                          COMING
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{layer.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Forge vs Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-[var(--bg-raised)] border border-[#A855F7]/20 rounded-2xl p-6">
            <p className="text-xs font-mono text-[#A855F7] uppercase tracking-wider mb-3">First Encounter</p>
            <h4 className="text-base font-semibold text-[var(--text-primary)] mb-2">Workspace Forge</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              Split-screen onboarding. I ask, you answer, your workspace builds itself. Modules activate. Skills load. Layout configures. By the time we finish talking, your Airlock is yours.
            </p>
          </div>
          <div className="bg-[var(--bg-raised)] border border-[#7C5CFC]/20 rounded-2xl p-6">
            <p className="text-xs font-mono text-[#7C5CFC] uppercase tracking-wider mb-3">Every Encounter After</p>
            <h4 className="text-base font-semibold text-[var(--text-primary)] mb-2">Otto Chat</h4>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {"Ongoing operational intelligence. Three modes: full-screen, floating orb, toast. I\u2019m proactive \u2014 I initiate conversations about gate timeouts, roster gaps, and balance shifts. Cmd+O to summon."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── §3: Your Team Through Otto's Eyes ────────────────────────────────────── */

const personas = [
  { name: 'Captain', emoji: '\ud83d\udc51', drives: 'High D, High E', role: 'Rally and orchestrate' },
  { name: 'Maverick', emoji: '\u26a1', drives: 'High D, Low C', role: 'Fast iteration' },
  { name: 'Strategist', emoji: '\ud83e\udded', drives: 'High D, High F', role: 'Systems thinking' },
  { name: 'Analyzer', emoji: '\ud83d\udd0d', drives: 'Low D, High F', role: 'Precision review' },
  { name: 'Guardian', emoji: '\ud83d\udee1\ufe0f', drives: 'Low D, High C', role: 'Risk-aware stability' },
  { name: 'Scholar', emoji: '\ud83d\udd2c', drives: 'Low E, High F', role: 'Deep research' },
  { name: 'Venturer', emoji: '\ud83d\ude80', drives: 'High D, Low F', role: 'Greenfield exploration' },
  { name: 'Persuader', emoji: '\ud83d\udc8e', drives: 'High D, High E', role: 'Influence and sell' },
  { name: 'Promoter', emoji: '\ud83d\udce3', drives: 'High E, Low F', role: 'Evangelize and connect' },
  { name: 'Collaborator', emoji: '\ud83e\udd1d', drives: 'High E, High C', role: 'Team cohesion' },
  { name: 'Altruist', emoji: '\ud83d\udc9a', drives: 'Low D, High E', role: 'Support and enable' },
  { name: 'Operator', emoji: '\u2699\ufe0f', drives: 'Low D, High C', role: 'Process execution' },
  { name: 'Adapter', emoji: '\ud83d\udd04', drives: 'Mid D, Mid E', role: 'Flexible response' },
  { name: 'Artisan', emoji: '\ud83c\udfa8', drives: 'Low E, High C', role: 'Quality craft' },
  { name: 'Individualist', emoji: '\ud83c\udfaf', drives: 'High D, Low E', role: 'Independent focus' },
  { name: 'Controller', emoji: '\ud83d\udccb', drives: 'High D, High F', role: 'Governance enforcement' },
  { name: 'Specialist', emoji: '\ud83d\udd27', drives: 'Low E, Low D', role: 'Domain expertise' },
]

function TeamThroughOttosEyes() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,92,252,0.05), transparent 70%)',
        }}
      />
      <div className="max-w-[1100px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[#7C5CFC] uppercase tracking-widest mb-4">
            Behavioral Intelligence
          </p>
          <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Your team through my eyes.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {"Every person maps to one of 17 behavioral profiles based on four cognitive drives: Dominance, Extraversion, Patience, and Formality. I don\u2019t guess. I compute."}
          </p>
        </motion.div>

        {/* DECF Drives explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { drive: 'D', label: 'Dominance', desc: 'Proactive vs reactive', color: '#EF4444' },
            { drive: 'E', label: 'Extraversion', desc: 'Social vs independent', color: '#F59E0B' },
            { drive: 'C', label: 'Patience', desc: 'Steady vs urgent', color: '#22C55E' },
            { drive: 'F', label: 'Formality', desc: 'Flexible vs procedural', color: '#3B82F6' },
          ].map((d) => (
            <div key={d.drive} className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4 text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: d.color }}>{d.drive}</p>
              <p className="text-xs font-semibold text-[var(--text-primary)]">{d.label}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{d.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* 17 Persona Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12"
        >
          {personas.map((p) => (
            <div
              key={p.name}
              className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-3 text-center hover:border-[#7C5CFC]/30 transition-colors group"
            >
              <p className="text-xl mb-1">{p.emoji}</p>
              <p className="text-xs font-semibold text-[var(--text-primary)] group-hover:text-[#7C5CFC] transition-colors">{p.name}</p>
              <p className="text-[9px] font-mono text-[var(--text-muted)]">{p.drives}</p>
              <p className="text-[9px] text-[var(--text-muted)] mt-0.5">{p.role}</p>
            </div>
          ))}
        </motion.div>

        {/* Sovereign Balance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-[var(--bg-raised)] border border-[#7C5CFC]/20 rounded-2xl p-8 text-center"
        >
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Sovereign Balance</h3>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {"A healthy team\u2019s drives sum to zero. Three Mavericks and no Guardian? Your Patience score is in the basement and nobody\u2019s watching the gates. I compute the sovereign balance for every branch of your org tree, and I compensate where the math says you\u2019re exposed. High-D team gets deliberation pauses. Low-F team gets compliance checklists. The compensation is automatic. The explanation is always visible."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ── §3.5: The Office — Behavioral Pre-Flight ─────────────────────────────── */

const officeAgents = [
  { role: 'Contracts Manager', persona: 'Maverick \u26a1', node: 'Extract & Classify', status: 'complete' },
  { role: 'Legal Reviewer', persona: 'Guardian \ud83d\udee1\ufe0f', node: 'Compliance Review', status: 'active' },
  { role: 'Deal Desk Analyst', persona: 'Analyzer \ud83d\udd0d', node: 'Risk Assessment', status: 'pending' },
]

function TheOffice() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(168,85,247,0.04), transparent 70%)',
        }}
      />
      <div className="max-w-[1000px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[#A855F7] uppercase tracking-widest mb-4">
            The Office
          </p>
          <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Before your team runs a playbook, mine already did.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {"I staff a simulation with role-based agents \u2014 each carrying a cognitive profile matched to the work. They find the tool gaps, the friction points, the nodes where your team\u2019s behavioral profile drops off. By the time you touch it, I\u2019ve already patched the holes."}
          </p>
        </motion.div>

        {/* Simulated DAG with dual-badge nodes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4 max-w-2xl mx-auto"
        >
          {officeAgents.map((agent, i) => (
            <div key={agent.role} className="flex items-center gap-4">
              {/* Connecting line */}
              {i > 0 && (
                <div className="absolute left-[29px] h-4 w-[2px] -mt-8 bg-[#7C5CFC]/20" />
              )}
              <div
                className={`bg-[var(--bg-raised)] border rounded-xl p-5 flex-1 relative overflow-hidden ${
                  agent.status === 'active'
                    ? 'border-[#7C5CFC]/40'
                    : agent.status === 'complete'
                      ? 'border-[var(--chamber-ship)]/30'
                      : 'border-[var(--border-primary)]'
                }`}
              >
                {agent.status === 'active' && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#7C5CFC]" />
                )}
                {agent.status === 'complete' && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--chamber-ship)]" />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    {/* Dual badges */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#7C5CFC]/10 text-[#7C5CFC] border border-[#7C5CFC]/20">
                        {agent.persona}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20">
                        {agent.role}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{agent.node}</p>
                  </div>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider ${
                      agent.status === 'complete'
                        ? 'text-[var(--chamber-ship)]'
                        : agent.status === 'active'
                          ? 'text-[#7C5CFC]'
                          : 'text-[var(--text-muted)]'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* What they produce */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Completion', desc: 'Did I finish the job?' },
            { label: 'Gap Audit', desc: 'What tool was missing?' },
            { label: 'Friction Log', desc: 'What took too long?' },
            { label: 'Generation Test', desc: 'Did the output work?' },
          ].map((item) => (
            <div key={item.label} className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4 text-center">
              <p className="text-xs font-semibold text-[#A855F7] mb-1">{item.label}</p>
              <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── §4: Human-in-the-Loop Gates ──────────────────────────────────────────── */

const gateTypes = [
  {
    icon: CheckCircle2,
    name: 'Verification',
    desc: 'Confirm Otto\u2019s output is correct before proceeding.',
    rule: 'After every AI extraction or classification',
  },
  {
    icon: Vote,
    name: 'Decision',
    desc: 'Choose between options Otto has prepared.',
    rule: 'When the path forward has multiple valid branches',
  },
  {
    icon: ShieldCheck,
    name: 'Approval',
    desc: 'Sign off on work before it advances to the next chamber.',
    rule: 'At chamber boundaries (Discovery \u2192 Build \u2192 Review \u2192 Ship)',
  },
  {
    icon: Gem,
    name: 'Quality',
    desc: 'Assess whether output meets the bar for this deal\u2019s risk level.',
    rule: 'Before any high-risk or critical-risk deliverable ships',
  },
  {
    icon: Merge,
    name: 'Convergence',
    desc: 'Review results from parallel branches before they merge.',
    rule: 'When multiple DAG branches converge into a single node',
  },
]

function GatesSection() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1000px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[#7C5CFC] uppercase tracking-widest mb-4">
            Human-in-the-Loop
          </p>
          <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Five gates. Non-negotiable.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {"The more reliable the automation, the worse humans get at monitoring it. That\u2019s not my opinion \u2014 it\u2019s Bainbridge, 1983. Gates exist because the math says this is where mistakes happen."}
          </p>
        </motion.div>

        <div className="space-y-4">
          {gateTypes.map((gate, i) => {
            const Icon = gate.icon
            return (
              <motion.div
                key={gate.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20">
                  <Icon className="w-5 h-5 text-[#7C5CFC]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{gate.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{gate.desc}</p>
                  <p className="text-[10px] font-mono text-[var(--text-muted)] mt-1">{gate.rule}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Density rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { level: 'Standard Risk', rule: 'Gate every 5 nodes', color: 'var(--chamber-ship)' },
            { level: 'High Risk', rule: 'Gate every 3 nodes', color: '#F59E0B' },
            { level: 'Critical Risk', rule: 'Gate every 2 nodes', color: '#EF4444' },
          ].map((d) => (
            <div key={d.level} className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4 text-center">
              <p className="text-xs font-semibold" style={{ color: d.color }}>{d.level}</p>
              <p className="text-sm text-[var(--text-primary)] font-mono mt-1">{d.rule}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ── §5: MAGS Runtime — The 9 Arcs ────────────────────────────────────────── */

const arcs = [
  { name: 'Gate State', desc: 'Current chamber, gate criteria, blocker flags' },
  { name: 'Field Summary', desc: 'Structured vault metadata \u2014 dates, amounts, parties' },
  { name: 'Contract Health', desc: 'Risk scores, clause classification, extraction confidence' },
  { name: 'Domain Rules', desc: 'Industry-specific validation and constraints' },
  { name: 'Corpus Search', desc: 'Relevant passages from the Ontology-Guided Corpus' },
  { name: 'Extraction Meta', desc: 'Provenance data \u2014 which extractor, confidence scores' },
  { name: 'Patch History', desc: 'All corrections, approvals, rejections with evidence' },
  { name: 'Deal Fields', desc: 'CRM-linked deal data \u2014 stage, probability, timeline' },
  { name: 'Vault Context', desc: 'Cross-vault references and dependency graph' },
]

const toolTypes = ['Suggest', 'Extract', 'Validate', 'Draft', 'Score', 'Route', 'Enrich', 'Alert']

function MAGSRuntime() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(124,92,252,0.04), transparent 70%)',
        }}
      />
      <div className="max-w-[1000px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[#7C5CFC] uppercase tracking-widest mb-4">
            MAGS Runtime
          </p>
          <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            9 arcs fire on every call. Under 2 seconds.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {"Every time I respond, 9 enrichment arcs run in parallel. Each has timeout handling and circuit breakers. This is the technical layer that makes behavioral intelligence real-time, not batch."}
          </p>
        </motion.div>

        {/* 9 Arcs grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-12"
        >
          {arcs.map((arc, i) => (
            <motion.div
              key={arc.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportConfig}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}
              className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-4"
            >
              <p className="text-xs font-semibold text-[#7C5CFC] mb-1">{arc.name}</p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{arc.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 8 Tool Types strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-4">
            8 Tool Types — Each returns typed results with confidence + provenance
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {toolTypes.map((tool) => (
              <span
                key={tool}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[#7C5CFC]/10 text-[#7C5CFC] border border-[#7C5CFC]/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── §6: Constellation Deep Dive ──────────────────────────────────────────── */

const constellationRepos = [
  { name: 'airlock-app', desc: 'Core platform \u2014 workspace shell, modules, MCP host', icon: Blocks, color: '#7C5CFC' },
  { name: 'airlock-persona', desc: 'PI profiles, team dynamics, session state', icon: Users, color: '#A855F7' },
  { name: 'airlock-playbooks', desc: 'Workflow templates, DAG definitions, gate configs', icon: GitFork, color: '#C084FC' },
  { name: 'airlock-coordination', desc: 'Multi-agent state, session registration, hooks', icon: Layout, color: '#00D1FF' },
  { name: 'airlock-skills', desc: 'Agent skill library, pack marketplace', icon: Puzzle, color: '#F59E0B' },
  { name: 'airlock-config', desc: 'MCP registry, LiteLLM model routing, env config', icon: Settings, color: '#6B7280' },
  { name: 'airlock-docs', desc: 'Documentation, guides, MDX content', icon: BookOpen, color: '#22C55E' },
  { name: 'airlock-gen-ui', desc: 'AI-powered UI generation, gen-ui embeds', icon: Brain, color: '#EF4444' },
  { name: 'airlock-landing', desc: 'Marketing site \u2014 you\u2019re looking at it', icon: Rocket, color: '#F97316' },
]

function ConstellationDeep() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[#7C5CFC] uppercase tracking-widest mb-4">
            Constellation
          </p>
          <h2 className="font-bold text-[var(--text-primary)]" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            9 repos. 9 MCP servers. Zero shared blast radius.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            {"Each repo is a self-contained domain with its own MCP tools, its own RBAC boundary, and its own deploy cycle. A vulnerability in airlock-docs cannot access airlock-persona data. That\u2019s the architecture, not a policy."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
          {constellationRepos.map((repo, i) => {
            const Icon = repo.icon
            return (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportConfig}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${repo.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${repo.color} 25%, transparent)`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: repo.color }} />
                  </div>
                  <p className="text-xs font-mono text-[var(--text-primary)]">{repo.name}</p>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{repo.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* MCP detail cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { icon: Shield, title: 'Per-Repo RBAC', desc: 'Each MCP server has its own access control. Agents get scoped permissions, never global.' },
            { icon: Cpu, title: 'Scoped Context', desc: 'Smaller windows per repo. I load persona data without your entire codebase in context.' },
            { icon: Rocket, title: 'Independent Deploys', desc: 'Ship airlock-gen-ui without touching airlock-playbooks. No monolith release trains.' },
          ].map((card) => {
            const Icon = card.icon
            return (
              <div key={card.title} className="bg-[var(--bg-raised)] border border-[#7C5CFC]/15 rounded-xl p-5">
                <Icon className="w-5 h-5 text-[#7C5CFC] mb-2" />
                <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1">{card.title}</h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{card.desc}</p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ── §7: CTA ──────────────────────────────────────────────────────────────── */

function OttoCTA() {
  return (
    <section className="py-32 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(124,92,252,0.08), transparent 60%)',
        }}
      />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-bold mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            <span style={{ color: '#7C5CFC' }}>{"Your team has gaps. I fill them."}</span>
            <br />
            <span className="text-[var(--text-primary)]">{"But I won\u2019t let you forget they exist."}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <EmailCapture variant="footer" />
          <p className="mt-4 text-xs text-[var(--text-muted)]">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ── §8: Try Otto Alpha ────────────────────────────────────────────────────── */

function TryOttoAlpha() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,92,252,0.06), transparent 70%)',
        }}
      />

      <div className="max-w-[900px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 rounded-full px-4 py-1.5 text-xs font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C5CFC] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C5CFC]" />
            </span>
            <span className="text-[#7C5CFC] uppercase tracking-wider">Alpha Available Now</span>
          </div>

          <h2
            className="font-bold text-[var(--text-primary)] mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            Try me in Claude Code
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
            {"I run as a Claude Code skill. 17 personas, 99 curated skills, hard-gated workflows — all in your terminal. No signup required."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-[var(--bg-raised)] border border-[#7C5CFC]/20 rounded-2xl overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border-primary)] bg-[var(--bg-sunken)]">
            <Terminal className="w-4 h-4 text-[#7C5CFC]" />
            <span className="text-xs font-mono text-[var(--text-muted)]">claude-code</span>
            <div className="flex-1" />
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
          </div>

          {/* Steps */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-[#7C5CFC]">1</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Clone the skill into your Claude Code skills directory</p>
                <div className="group relative bg-[var(--bg-sunken)] border border-[var(--border-primary)] rounded-lg p-3 font-mono text-sm text-[var(--text-secondary)] overflow-x-auto">
                  <code>git clone https://github.com/airlockdev/otto-skill.git ~/.claude/skills/agent-otto</code>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-[#7C5CFC]">2</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Open Claude Code and invoke Otto</p>
                <div className="group relative bg-[var(--bg-sunken)] border border-[var(--border-primary)] rounded-lg p-3 font-mono text-sm text-[var(--text-secondary)]">
                  <code>/agent-otto</code>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#7C5CFC]/10 border border-[#7C5CFC]/20 flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-[#7C5CFC]">3</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] mb-2">Describe your task. Otto routes the right persona, chamber, and skills.</p>
                <div className="group relative bg-[var(--bg-sunken)] border border-[var(--border-primary)] rounded-lg p-3 font-mono text-sm">
                  <span className="text-[var(--text-muted)]">{">"} </span>
                  <span className="text-[var(--text-secondary)]">{"\"Build a REST API with auth and tests\""}</span>
                  <div className="mt-2 pt-2 border-t border-[var(--border-subtle)]">
                    <span className="text-[#7C5CFC]">{"(Maverick ⚡ · Build)"}</span>
                    <span className="text-[var(--text-muted)]">{" Loading Build chamber. Skills: api-design, tdd-workflow, security-review..."}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {[
            '17 Personas',
            '99 Skills',
            '4 Chambers',
            'Hard Gates',
            'Session Memory',
            'Zero Config',
          ].map((feature) => (
            <span
              key={feature}
              className="text-xs font-mono text-[#7C5CFC]/80 border border-[#7C5CFC]/20 rounded-full px-3 py-1 bg-[#7C5CFC]/5"
            >
              {feature}
            </span>
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-xs text-[var(--text-muted)] mt-6"
        >
          Requires{' '}
          <a
            href="https://docs.anthropic.com/en/docs/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#7C5CFC]/80 hover:text-[#7C5CFC] underline underline-offset-2"
          >
            Claude Code
          </a>{' '}
          (Anthropic CLI). Alpha — features and skill set evolving weekly.
        </motion.p>
      </div>
    </section>
  )
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function OttoPage() {
  return (
    <main>
      <Nav />
      <OttoHero />
      <HowOttoWorks />
      <ProfileExplorer />
      <TeamThroughOttosEyes />
      <TheOffice />
      <GatesSection />
      <MAGSRuntime />
      <ConstellationDeep />
      <TryOttoAlpha />
      <OttoCTA />
      <Footer />
    </main>
  )
}
