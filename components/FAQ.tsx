'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const faqs = [
  {
    question: 'How is Otto different from ChatGPT or Copilot?',
    answer:
      'ChatGPT asks "How can I help?" and agrees with everything. Otto maps your team\'s behavioral drives, detects gaps, and fills them. If your team is all fast-moving Mavericks with no one checking details, Otto becomes the Guardian. It has 50/50 decision authority and can halt workflows when it detects safety or quality issues. It\'s a teammate, not a tool.',
  },
  {
    question: 'How much does an AI council cost?',
    answer:
      'We benchmarked 15 models across 450 council runs. A four-persona AI council costs $0.0036 on our standard tier (Gemini Flash) with 92% of premium quality. Even the deepest analysis tier (Opus) is $0.17 per council. The free tier is mathematically hard-capped at 21 cents per user per month.',
  },
  {
    question: 'What\'s a Vault? What are Chambers and Gates?',
    answer:
      'A Vault is a living workflow container — not a folder. It holds the work, the conversation about the work, and the complete audit trail. Every Vault moves through four Chambers: Discover, Build, Review, Ship. Gates between chambers are enforced checkpoints — the system physically prevents advancement until criteria are met and a Gatekeeper approves. No more "trust me, I checked it."',
  },
  {
    question: 'How is my data secured?',
    answer:
      'AES-128 encryption for sensitive tokens at rest, PostgreSQL row-level security for tenant isolation, and five-level role-based access control. Self-approval is impossible — there is no API path to approve your own work. PII is redacted before reaching any external AI provider. The entire system is stateless and rehydratable from encrypted backups.',
  },
  {
    question: 'What\'s the difference between the free plugin and the platform?',
    answer:
      'The free Claude Code plugin gives you Otto\'s intelligence — 17 personas, constellation council command, skill invocation — at 96.8% of platform quality. The platform adds everything else: vault lifecycle enforcement, chamber gates, separation of duties, append-only audit trails, team behavioral mapping, six integrated modules, and real-time collaboration. Same brain, different body.',
  },
  {
    question: 'Can I bring my own API keys?',
    answer:
      'Yes. The Constellation Max tier ($99/month) lets you connect your own OpenRouter API key and access all 342 models in the catalog. We tested 15 and branded the best ones, but you can route through any model. Your keys, your models, our orchestration.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[var(--border-subtle)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed pb-5">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section className="py-24 px-6 md:py-32 md:px-8">
      <div className="max-w-[700px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-mono text-[var(--accent-primary)] uppercase tracking-widest mb-4">
            FAQ
          </p>
          <h2
            className="font-bold text-[var(--text-primary)]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Common questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-2xl px-6"
        >
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
