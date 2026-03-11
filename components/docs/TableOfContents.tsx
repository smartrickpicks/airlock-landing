'use client'

import { useEffect, useState } from 'react'
import type { TOCItem } from '@/lib/docs'

interface TableOfContentsProps {
  items: TOCItem[]
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  const activeIndex = items.findIndex((item) => item.id === activeId)

  return (
    <div>
      {/* Header with counter */}
      <div className="flex items-center justify-between px-2 mb-3">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          On this page
        </p>
        {activeIndex >= 0 && (
          <span className="text-[10px] font-mono text-[var(--text-muted)]/60">
            {activeIndex + 1}/{items.length}
          </span>
        )}
      </div>

      {/* TOC items with left border track */}
      <nav className="space-y-0.5 border-l border-[var(--border-subtle)]">
        {items.map((item) => {
          const isActive = activeId === item.id
          const indent = item.level === 3 ? 'pl-5' : item.level === 4 ? 'pl-8' : 'pl-3'

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block py-1.5 text-[13px] leading-snug transition-all duration-150 -ml-px border-l-2 ${indent} ${
                isActive
                  ? 'border-[var(--accent-primary)] text-[var(--accent-primary)] bg-[var(--accent-primary)]/[0.04]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-primary)]'
              }`}
            >
              {item.text}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
