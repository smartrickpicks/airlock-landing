'use client'

import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import MiniSearch from 'minisearch'

interface SearchEntry {
  slug: string
  title: string
}

interface SearchDoc {
  id: string
  slug: string
  title: string
  section: string
  content: string
}

interface SearchResult {
  slug: string
  title: string
  section: string
  score: number
}

interface SearchDialogProps {
  open: boolean
  onClose: () => void
  pages: SearchEntry[]
  searchDocs: SearchDoc[]
}

export default function SearchDialog({ open, onClose, pages, searchDocs }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Build MiniSearch index once
  const miniSearch = useMemo(() => {
    const ms = new MiniSearch<SearchDoc>({
      fields: ['title', 'content', 'section'],
      storeFields: ['slug', 'title', 'section'],
      searchOptions: {
        boost: { title: 3, section: 1.5 },
        fuzzy: 0.2,
        prefix: true,
      },
    })
    ms.addAll(searchDocs)
    return ms
  }, [searchDocs])

  const results: SearchResult[] = useMemo(() => {
    if (query.length < 2) return []
    const raw = miniSearch.search(query).slice(0, 15)
    return raw.map((r) => ({
      slug: r.slug as string,
      title: r.title as string,
      section: r.section as string,
      score: r.score,
    }))
  }, [query, miniSearch])

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/docs/${slug}`)
      onClose()
      setQuery('')
    },
    [router, onClose]
  )

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return

      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        navigate(results[selectedIndex].slug)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, results, selectedIndex, navigate, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Dialog */}
      <div className="relative mx-auto mt-[15vh] w-full max-w-lg px-4">
        <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-raised)] shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-[var(--border-primary)]">
            <svg className="w-5 h-5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all documentation..."
              className="flex-1 py-3.5 bg-transparent text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none text-sm"
            />
            <kbd className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-overlay)] text-[var(--text-muted)]">
              esc
            </kbd>
          </div>

          {/* Results */}
          {query.length >= 2 && (
            <div className="max-h-96 overflow-y-auto py-2">
              {results.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
                  No results for &ldquo;{query}&rdquo;
                </p>
              ) : (
                <>
                  <p className="px-4 py-1 text-xs text-[var(--text-muted)]">
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </p>
                  {results.map((result, i) => (
                    <button
                      key={result.slug}
                      onClick={() => navigate(result.slug)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        i === selectedIndex
                          ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)]'
                      }`}
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{result.title}</div>
                        <div className="text-xs text-[var(--text-muted)] truncate">{result.section}</div>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Idle state */}
          {query.length < 2 && (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                Search {pages.length} docs — type 2+ characters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
