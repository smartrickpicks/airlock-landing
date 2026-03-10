'use client'

import { motion } from 'framer-motion'
import { FileText, Users, CheckSquare, Calendar, FileEdit } from 'lucide-react'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const modules = [
  { icon: FileText, name: 'Contracts', desc: 'Lifecycle management' },
  { icon: Users, name: 'CRM', desc: 'Pipeline & leads' },
  { icon: CheckSquare, name: 'Triage', desc: 'Kanban & tasks' },
  { icon: Calendar, name: 'Calendar', desc: 'Schedule & events' },
  { icon: FileEdit, name: 'Documents', desc: 'Editor & PDF' },
]

export default function Modules() {
  return (
    <section id="modules" className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="font-bold text-[var(--text-primary)] text-center mb-16"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Everything in one workspace.
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto"
        >
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <motion.div
                key={mod.name}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-6 text-center hover:bg-[var(--bg-overlay)] hover:border-[var(--border-primary)] transition-all"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-8 h-8 text-[var(--accent-primary)]" />
                </div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {mod.name}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{mod.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
