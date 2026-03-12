'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { viewportConfig } from '@/lib/animations'

const comparisonRows = [
  {
    chatbot: 'Asks "How can I help you today?"',
    otto: 'Already knows what your team needs before you type',
  },
  {
    chatbot: 'Agrees with everything you say',
    otto: 'Tells you your plan has zero quality control — and halts it',
  },
  {
    chatbot: 'One personality, forgets you instantly',
    otto: '17 personas that remember your behavioral drives across sessions',
  },
  {
    chatbot: 'Helps your fast movers move faster',
    otto: 'Detects your team lacks a Guardian — becomes one',
  },
]

export default function OttoTeaser() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(124,92,252,0.06), transparent 70%)',
        }}
      />

      <div className="max-w-[900px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[#7C5CFC] uppercase tracking-widest mb-4">
            The AI Teammate That Says No
          </p>

          {/* Otto constellation hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportConfig}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/brand/hero/hero-otto.png"
              alt="Otto — Behavioral Constellation"
              width={280}
              height={280}
              className="opacity-90"
            />
          </motion.div>

          {/* Narrative hook — from NotebookLM transcript */}
          <div className="max-w-2xl mx-auto space-y-4">
            <h2
              className="font-bold text-[var(--text-primary)]"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)' }}
            >
              Imagine hiring a senior director who looks you in the eye and says{' '}
              <span className="text-[#7C5CFC]">no.</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Your team is too impulsive. Your plan has zero quality control. I&apos;m halting
              this project until we fix it. Now imagine that demanding new hire is a 21-cent
              piece of software.
            </p>
            <p className="text-[var(--text-muted)] text-base leading-relaxed">
              Otto maps four behavioral drives — dominance, extraversion, patience, formality —
              across your entire team. If you&apos;re all fast-moving Mavericks with no one checking
              the details, Otto shifts to Guardian mode. The UI grays out. The workflow stops.
              A human has to explicitly override to proceed.
            </p>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {['17 Personas', '4 Chambers', 'Sovereign Balance', '50/50 Authority'].map(
              (stat) => (
                <span
                  key={stat}
                  className="text-xs font-mono text-[#7C5CFC]/80 border border-[#7C5CFC]/20 rounded-full px-3 py-1 bg-[#7C5CFC]/5"
                >
                  {stat}
                </span>
              )
            )}
          </div>
        </motion.div>

        {/* Not a Chatbot — compact 3-row table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl overflow-hidden mb-10"
        >
          {/* Header */}
          <div className="grid grid-cols-2 gap-0 border-b border-[var(--border-primary)]">
            <div className="p-4 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
              What chatbots do
            </div>
            <div className="p-4 text-xs font-mono text-[#7C5CFC] uppercase tracking-wider border-l border-[#7C5CFC]/20 bg-[#7C5CFC]/5">
              What Otto does
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-2 gap-0 ${
                i < comparisonRows.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
              }`}
            >
              <div className="p-4 text-sm text-[var(--text-muted)]">{row.chatbot}</div>
              <div className="p-4 text-sm text-[var(--text-primary)] border-l border-[#7C5CFC]/20 bg-[#7C5CFC]/[0.02]">
                {row.otto}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA link to /otto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/otto"
            className="inline-flex items-center gap-2 text-[#7C5CFC] hover:text-[#9B7FFF] transition-colors font-medium group"
          >
            See how I think
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
