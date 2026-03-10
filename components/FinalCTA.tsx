'use client'

import { motion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'
import EmailCapture from './EmailCapture'

export default function FinalCTA() {
  return (
    <section id="waitlist" className="py-32 text-center relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,209,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="font-bold text-[var(--text-primary)]"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Ready to meet your workspace?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--text-secondary)] text-lg mt-4 mb-10"
        >
          {"We're building something different. Be first to experience it."}
        </motion.p>

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
