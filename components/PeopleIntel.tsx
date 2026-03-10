'use client'

import { motion } from 'framer-motion'
import { Brain, Wrench, Bot } from 'lucide-react'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const features = [
  {
    icon: Brain,
    title: 'Learns You',
    description:
      'Understands your work style from how you speak and what you do. No personality quizzes required.',
  },
  {
    icon: Wrench,
    title: 'Builds Your Space',
    description:
      'Configures modules, layouts, skills, and workflows tailored to your role and cognitive style.',
  },
  {
    icon: Bot,
    title: 'Fills the Gaps',
    description:
      'AI agents cover what your team can\'t — but humans decide at every critical gate.',
  },
]

export default function PeopleIntel() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="font-bold text-[var(--text-primary)] text-center"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          {"Your workspace shouldn't need a manual."}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--text-secondary)] text-lg text-center max-w-2xl mx-auto mb-16 mt-4 leading-relaxed"
        >
          Otto — your AI copilot — infers who you are and configures your
          entire environment. No setup wizards. No configuration burden.
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl p-8 text-center hover:border-[var(--accent-primary)]/30 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-12 h-12 text-[var(--accent-primary)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Equation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <span className="inline-block font-mono text-sm text-[var(--text-muted)] bg-[var(--glass-surface)] border border-[var(--glass-border)] rounded-full px-6 py-3">
            Playbook Complexity − Human Coverage = AI Workload
          </span>
        </motion.div>
      </div>
    </section>
  )
}
