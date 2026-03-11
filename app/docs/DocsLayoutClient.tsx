'use client'

import { useState, useEffect, useCallback } from 'react'
import DocsNav from '@/components/docs/DocsNav'
import Sidebar from '@/components/docs/Sidebar'
import SearchDialog from '@/components/docs/SearchDialog'
import type { DocsNavigation } from '@/lib/docs-nav'
import type { SearchDoc } from '@/lib/docs-nav'

interface DocsLayoutClientProps {
  children: React.ReactNode
  navigation: DocsNavigation
  allPages: Array<{ slug: string; title: string }>
  searchDocs: SearchDoc[]
}

export default function DocsLayoutClient({
  children,
  navigation,
  allPages,
  searchDocs,
}: DocsLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === '/' && !searchOpen && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
      e.preventDefault()
      setSearchOpen(true)
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setSearchOpen(true)
    }
  }, [searchOpen])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <DocsNav
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0 border-r border-[var(--border-primary)] h-[calc(100vh-3.5rem)] sticky top-14 overflow-y-auto">
          <Sidebar navigation={navigation.tabs} />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="absolute left-0 top-14 bottom-0 w-72 bg-[var(--bg-base)] border-r border-[var(--border-primary)] overflow-y-auto">
              <Sidebar
                navigation={navigation.tabs}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      <SearchDialog
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        pages={allPages}
        searchDocs={searchDocs}
      />
    </div>
  )
}
