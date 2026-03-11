'use client'

import { motion } from 'framer-motion'
import { FileText, Users, CheckSquare, Calendar, FolderOpen, Home, Workflow, Settings } from 'lucide-react'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const coreModules = [
  { icon: FileText, name: 'Contracts', desc: '188 clauses \u00b7 24 types \u00b7 5 verticals', sub: 'Generate, extract, and manage contracts with a pre-approved clause library and AI-powered extraction engine.', color: 'var(--chamber-discover)' },
  { icon: Users, name: 'CRM', desc: 'Vault-native pipeline \u00b7 Radar \u00b7 Ghost', sub: 'CRM is a lens over your vault hierarchy \u2014 accounts, subsidiaries, contacts, and deals in one data model.', color: 'var(--chamber-build)' },
  { icon: CheckSquare, name: 'Tasks', desc: 'Cross-module task views \u00b7 Gate-linked', sub: 'Task views that span modules. Linked to playbook gates so nothing falls through the cracks.', color: 'var(--accent-primary)' },
  { icon: Calendar, name: 'Calendar', desc: 'Auto-surfaced deadlines \u00b7 SLA alerts', sub: 'Auto-surfaces contract deadlines, renewal dates, and SLA alerts. No manual event creation needed.', color: 'var(--chamber-review)' },
  { icon: FolderOpen, name: 'Documents', desc: 'TipTap editor \u00b7 Variable binding \u00b7 Diffs', sub: 'Rich text editing with live variable binding, clause blocks, version diffing, and annotation overlays.', color: 'var(--chamber-ship)' },
  { icon: Settings, name: 'Overlay', desc: 'Admin \u00b7 Lanes \u00b7 Extraction rules \u00b7 Roles', sub: 'Workspace configuration. RBAC roles, extraction rule sets, lane management, and audit settings.', color: 'var(--text-muted)' },
]

const workspaceTools = [
  { icon: Home, name: 'Dispatch', desc: 'Signal-dominant Triptych homepage', sub: 'Your command center. Signal feed, orchestration panel, and control view in one split-screen layout.', color: 'var(--accent-secondary)' },
  { icon: Workflow, name: 'Forge', desc: 'DAG canvas \u00b7 Playbook builder \u00b7 Wires', sub: 'Visual workflow builder. Drag nodes, wire connections, set gates, configure triggers and automations.', color: 'var(--accent-tertiary)' },
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
            Eight modules. One workspace.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-2xl mx-auto">
            Contracts, CRM, tasks, calendar, documents, and automations — deeply integrated, not bolted together.
          </p>
        </motion.div>

        {/* Core modules — 3x2 grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-4"
        >
          {coreModules.map((mod) => {
            const Icon = mod.icon
            const isMuted = mod.color === 'var(--text-muted)'
            return (
              <motion.div
                key={mod.name}
                variants={staggerItem}
                className={`bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 glow-card group ${isMuted ? 'opacity-70' : ''}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${mod.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${mod.color} 20%, transparent)`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{mod.name}</p>
                    <p className="text-[10px] text-[var(--accent-primary)]/70 font-mono">{mod.desc}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{mod.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Workspace tools — 2 wider cards */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto"
        >
          {workspaceTools.map((mod) => {
            const Icon = mod.icon
            return (
              <motion.div
                key={mod.name}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 glow-card group relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 w-full h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, ${mod.color}, transparent)`,
                  }}
                />
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${mod.color} 10%, transparent)`,
                      border: `1px solid color-mix(in srgb, ${mod.color} 20%, transparent)`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: mod.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{mod.name}</p>
                    <p className="text-[10px] font-mono" style={{ color: mod.color }}>{mod.desc}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{mod.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
