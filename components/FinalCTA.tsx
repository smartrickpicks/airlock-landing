'use client'

import { motion } from 'framer-motion'
import { viewportConfig } from '@/lib/animations'
import EmailCapture from './EmailCapture'

export default function FinalCTA() {
  return (
    <section id="waitlist" className="py-32 text-center relative overflow-hidden">
      {/* Multi-layered background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,209,255,0.08), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 30% 60%, rgba(99,102,241,0.06), transparent 50%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 50% at 70% 40%, rgba(168,85,247,0.05), transparent 50%)',
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-64 h-64 rounded-full top-10 -left-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,209,255,0.06), transparent 70%)' }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bottom-10 -right-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.06), transparent 70%)' }}
        animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-bold"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            <span className="gradient-text">Your contracts deserve better.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[var(--text-secondary)] text-lg mt-4 mb-10 max-w-lg mx-auto"
        >
          {'One vault per deal. AI that assists without acting alone. Enterprise security from day one. Join the teams building the future of contract operations.'}
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

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { label: 'AES-256 Encrypted', mono: true },
            { label: 'SOC 2 Compliant', mono: true },
            { label: 'RBAC + RLS', mono: true },
            { label: '99.9% Uptime SLA', mono: true },
          ].map((badge) => (
            <span
              key={badge.label}
              className="text-xs font-mono text-[var(--text-muted)]/60 border border-[var(--border-subtle)] rounded-full px-3 py-1"
            >
              {badge.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
