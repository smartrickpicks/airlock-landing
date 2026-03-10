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
            className="flex items-center justify-center gap-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--chamber-ship)]/10 border border-[var(--chamber-ship)]/20">
              <Check className="w-5 h-5 text-[var(--chamber-ship)]" />
            </div>
            <div className="text-left">
              <span className="text-lg font-semibold text-[var(--text-primary)] block">
                {"You're on the list!"}
              </span>
              <span className="text-sm text-[var(--text-muted)]">
                {"We'll be in touch soon."}
              </span>
            </div>
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
              className="bg-[var(--bg-raised)] border border-[var(--border-primary)] rounded-xl h-12 px-4 text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:ring-2 focus:ring-[var(--accent-primary)]/30 focus:border-[var(--accent-primary)]/50 w-full sm:w-80 outline-none transition-all"
              aria-label="Email address"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white font-semibold rounded-xl h-12 px-7 hover:brightness-110 transition-all flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-70 btn-shimmer shadow-lg shadow-[var(--accent-primary)]/20"
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Get Early Access
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
