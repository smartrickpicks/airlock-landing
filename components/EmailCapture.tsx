'use client'

import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

interface EmailCaptureProps {
  variant?: 'hero' | 'footer'
}

export default function EmailCapture({ variant = 'hero' }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setStatus('error')
      return
    }
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 1000)
  }

  return (
    <div className={variant === 'hero' ? 'mt-10' : ''}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 text-[var(--accent-primary)]"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--accent-primary)]/10">
              <Check className="w-5 h-5" />
            </div>
            <span className="text-lg font-medium text-[var(--text-primary)]">
              {"You're on the list!"}
            </span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status === 'error') setStatus('idle')
              }}
              className="bg-[var(--bg-sunken)] border border-[var(--border-primary)] rounded-lg h-12 px-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary)] w-full sm:w-72 outline-none transition-all"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold rounded-lg h-12 px-6 hover:brightness-110 transition-all flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-70"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-[var(--bg-base)]/30 border-t-[var(--bg-base)] rounded-full animate-spin" />
              ) : (
                <>
                  Join Waitlist
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
      {status === 'error' && (
        <p className="text-red-400 text-sm mt-2 text-center">
          Please enter a valid email address.
        </p>
      )}
    </div>
  )
}
