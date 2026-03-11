import Link from 'next/link'
import type { PrevNext } from '@/lib/docs'

export default function PrevNextNav({ prev, next }: PrevNext) {
  if (!prev && !next) return null

  return (
    <div className="mt-12 pt-8 border-t border-[var(--border-primary)] grid grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={`/docs/${prev.slug}`}
          className="group flex items-center gap-3 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-raised)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--bg-overlay)] transition-all"
        >
          <svg
            className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:-translate-x-0.5 transition-all flex-shrink-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <div className="min-w-0">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
              Previous
            </span>
            <span className="block text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] truncate transition-colors">
              {prev.title}
            </span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/docs/${next.slug}`}
          className="group flex items-center justify-end gap-3 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-raised)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--bg-overlay)] transition-all text-right"
        >
          <div className="min-w-0">
            <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-0.5">
              Next
            </span>
            <span className="block text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)] truncate transition-colors">
              {next.title}
            </span>
          </div>
          <svg
            className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent-primary)] group-hover:translate-x-0.5 transition-all flex-shrink-0"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}
