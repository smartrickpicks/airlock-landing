'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { viewportConfig } from '@/lib/animations'

const faqs = [
  {
    question: 'What industries does Airlock support?',
    answer:
      'Airlock is entertainment-first — supporting music, film, TV, and cross-entertainment verticals with 24 contract types and 188 pre-approved clauses. The vault architecture is flexible enough for any contract-heavy industry.',
  },
  {
    question: 'How does the AI work? Does it act autonomously?',
    answer:
      'Never. Otto (our AI copilot) proposes actions, but humans approve at every gate. It assembles context from 9 enrichment sources in under 2 seconds, and routes through provider-agnostic models via LiteLLM — Claude, GPT, Grok, or local Ollama.',
  },
  {
    question: 'How is my data secured?',
    answer:
      'Fernet symmetric encryption (AES-128-CBC + HMAC-SHA256) for sensitive tokens at rest, PostgreSQL row-level security for tenant isolation, and role-based access control across five permission levels. All data is soft-deleted with full audit trails.',
  },
  {
    question: 'Can I self-host Airlock?',
    answer:
      'Yes. The entire stack is built on open-source foundations — Next.js 14, FastAPI, PostgreSQL 16, Redis 7. Stateless containers mean you can deploy anywhere: AWS, GCP, Azure, or on-premise. Rebuild from cold backups + key material.',
  },
  {
    question: 'How does Airlock replace my current tools?',
    answer:
      'Airlock unifies contract lifecycle, CRM, project management, calendar, and documents in a single workspace. Instead of syncing data between Salesforce + DocuSign + Jira + Slack + Google Sheets, everything lives in one vault with a shared context.',
  },
  {
    question: 'What does the migration process look like?',
    answer:
      'We provide extraction tools for importing from existing CLM platforms, CRMs, and document repositories. The 442-field registry maps to common data formats, and our extraction engine handles PDF, DOCX, and Markdown ingestion.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[var(--border-subtle)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
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
