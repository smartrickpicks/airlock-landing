'use client'

import { motion } from 'framer-motion'
import { Lock, Building2, ScrollText, Key, Shield, Zap } from 'lucide-react'
import { staggerContainer, staggerItem, viewportConfig } from '@/lib/animations'

const trustItems = [
  {
    icon: Lock,
    label: 'End-to-end encryption',
    sub: 'AES-256 at rest',
  },
  {
    icon: Building2,
    label: 'Multi-tenant isolation',
    sub: 'Row-level security',
  },
  {
    icon: ScrollText,
    label: 'Full audit trail',
    sub: 'Every action logged',
  },
  {
    icon: Key,
    label: 'Role-based access',
    sub: 'Builder \u00b7 Gatekeeper \u00b7 Owner',
  },
  {
    icon: Shield,
    label: 'Enterprise SSO',
    sub: 'SAML & OAuth 2.0',
  },
  {
    icon: Zap,
    label: 'Real-time sync',
    sub: 'WebSocket-powered',
  },
]

export default function Trust() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="font-bold text-[var(--text-primary)] text-center mb-16"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          Built for enterprise.
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="text-center p-6"
              >
                <div className="flex justify-center mb-3">
                  <Icon className="w-7 h-7 text-[var(--accent-primary)]" />
                </div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {item.label}
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{item.sub}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
