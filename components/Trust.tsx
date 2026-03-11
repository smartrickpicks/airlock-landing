'use client'

import { motion } from 'framer-motion'
import { Lock, Building2, ScrollText, Key, Shield, Zap } from 'lucide-react'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const trustItems = [
  {
    icon: Lock,
    label: 'Token Encryption',
    sub: 'Fernet (AES-128-CBC + HMAC-SHA256) for all sensitive tokens at rest',
  },
  {
    icon: Building2,
    label: 'Row-Level Security',
    sub: 'PostgreSQL-enforced tenant isolation on every table',
  },
  {
    icon: ScrollText,
    label: 'Soft Deletes + Audit Trail',
    sub: 'Append-only event log — every action recorded, nothing hard-deleted',
  },
  {
    icon: Key,
    label: 'Role-Based Access',
    sub: 'Builder \u00b7 Gatekeeper \u00b7 Owner \u00b7 Designer \u00b7 Viewer',
  },
  {
    icon: Shield,
    label: 'Stateless Architecture',
    sub: 'Containerized services — rebuild from backups + key material',
  },
  {
    icon: Zap,
    label: 'Human-in-the-Loop AI',
    sub: 'AI proposes, humans approve — no autonomous actions, ever',
  },
]

export default function Trust() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            Security
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Enterprise security by default.
          </h2>
          <p className="text-[var(--text-secondary)] text-lg mt-4 max-w-xl mx-auto">
            Security is architectural, not bolted on. Sensitive tokens are encrypted at rest, tenants are isolated at the database level, and AI never acts without human approval.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl p-6 text-center glow-card group"
              >
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)]/5 border border-[var(--accent-primary)]/10 flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110">
                  <Icon className="w-5 h-5 text-[var(--accent-primary)]" />
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)] mb-1">
                  {item.label}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{item.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
