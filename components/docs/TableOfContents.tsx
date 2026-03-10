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

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] px-2">
        On this page
      </p>
      <nav className="space-y-0.5">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`block py-1 text-[13px] transition-colors ${
              item.level === 3 ? 'pl-6' : item.level === 4 ? 'pl-10' : 'pl-2'
            } ${
              activeId === item.id
                ? 'text-[var(--accent-primary)] border-l-2 border-[var(--accent-primary)] -ml-px'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {item.text}
          </a>
        ))}
      </nav>
    </div>
  )
}
