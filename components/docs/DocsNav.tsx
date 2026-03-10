'use client'

import Link from 'next/link'

interface DocsNavProps {
  onMenuToggle?: () => void
  onSearchOpen?: () => void
}

export default function DocsNav({ onMenuToggle, onSearchOpen }: DocsNavProps) {
  return (
    <header className="sticky top-0 z-50 h-14 flex items-center justify-between px-4 lg:px-6 border-b border-[var(--border-primary)] bg-[var(--bg-base)]/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)]"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
            <span className="text-white text-xs font-bold">A</span>
          </div>
          <span className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
            Airlock
          </span>
        </Link>

        <span className="text-[var(--text-muted)] text-sm">/</span>
        <span className="text-sm text-[var(--text-secondary)]">Docs</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-raised)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-subtle)] transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="hidden sm:inline">Search docs...</span>
          <kbd className="hidden sm:inline text-xs px-1.5 py-0.5 rounded bg-[var(--bg-overlay)] text-[var(--text-muted)]">
            /
          </kbd>
        </button>

        {/* GitHub */}
        <a
          href="https://github.com/smartrickpicks"
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>

        {/* Back to site */}
        <Link
          href="/"
          className="hidden sm:flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Site
        </Link>
      </div>
    </header>
  )
}
