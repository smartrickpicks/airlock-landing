'use client'

import { motion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'

const techStack = [
  { name: 'Next.js 14', category: 'Frontend' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'PostgreSQL 16', category: 'Database' },
  { name: 'PydanticAI', category: 'AI Runtime' },
  { name: 'TipTap', category: 'Editor' },
  { name: 'React Flow', category: 'Workflows' },
]

export default function LogoCloud() {
  return (
    <section className="py-16 px-6 relative">
      <div className="max-w-[1000px] mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center text-sm text-[var(--text-muted)] uppercase tracking-widest mb-10"
        >
          Built on open-source foundations
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6"
        >
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex flex-col items-center gap-1 group"
            >
              <span className="text-[var(--text-muted)]/60 font-semibold text-base tracking-wide group-hover:text-[var(--accent-primary)] transition-colors">
                {tech.name}
              </span>
              <span className="text-[10px] text-[var(--text-muted)]/30 font-mono uppercase tracking-wider">
                {tech.category}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="section-divider max-w-[800px] mx-auto mt-16" />
    </section>
  )
}
