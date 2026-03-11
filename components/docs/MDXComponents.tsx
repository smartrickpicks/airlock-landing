import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import CopyButton from './CopyButton'

// ── Mintlify replacement components ──────────────────────────────────────────

function Card({
  title,
  icon,
  href,
  children,
}: {
  title: string
  icon?: string
  href?: string
  children?: React.ReactNode
}) {
  const content = (
    <div className="group/card relative p-5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-raised)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--bg-overlay)] transition-all overflow-hidden">
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none bg-gradient-to-br from-[var(--accent-primary)]/[0.03] to-transparent" />
      <div className="relative flex items-start gap-3">
        {icon && <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>}
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover/card:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          {children && (
            <div className="mt-1.5 text-sm text-[var(--text-secondary)] leading-relaxed">{children}</div>
          )}
        </div>
      </div>
      {href && (
        <div className="absolute bottom-3 right-4 opacity-0 group-hover/card:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </div>
  )

  if (href) {
    return href.startsWith('http') ? (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    ) : (
      <Link href={`/docs/${href}`}>{content}</Link>
    )
  }

  return content
}

function CardGroup({
  cols = 2,
  children,
}: {
  cols?: number
  children: React.ReactNode
}) {
  return (
    <div
      className="grid gap-3 my-6"
      style={{ gridTemplateColumns: `repeat(${Math.min(cols, 3)}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  )
}

function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex gap-3.5 p-4 rounded-xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/[0.04]">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent-primary)]/10 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  )
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex gap-3.5 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04]">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex gap-3.5 p-4 rounded-xl border border-green-500/20 bg-green-500/[0.04]">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center mt-0.5">
        <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">{children}</div>
    </div>
  )
}

// ── Helper: extract text from React children for copy button ─────────────────

function extractText(node: React.ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (!node) return ''
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (typeof node === 'object' && 'props' in node) {
    return extractText(node.props.children)
  }
  return ''
}

// ── MDX component map ────────────────────────────────────────────────────────

export const mdxComponents: MDXComponents = {
  // Mintlify components
  Card,
  CardGroup,
  Info,
  Warning,
  Tip,

  // HTML overrides
  h1: ({ children, id }) => (
    <h1 id={id} className="text-3xl font-bold text-[var(--text-primary)] mt-10 mb-4 scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="group text-2xl font-semibold text-[var(--text-primary)] mt-10 mb-4 pb-2.5 border-b border-[var(--border-primary)] scroll-mt-20">
      {children}
      <span className="ml-2 opacity-0 group-hover:opacity-40 transition-opacity text-[var(--accent-primary)] text-lg">#</span>
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="group text-xl font-semibold text-[var(--text-primary)] mt-8 mb-3 scroll-mt-20">
      {children}
      <span className="ml-2 opacity-0 group-hover:opacity-30 transition-opacity text-[var(--accent-primary)] text-base">#</span>
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4 id={id} className="text-lg font-medium text-[var(--text-primary)] mt-6 mb-2 scroll-mt-20">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-[var(--text-secondary)] leading-7 mb-4">{children}</p>
  ),
  a: ({ href, children }) => {
    const isExternal = href?.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] underline decoration-[var(--accent-primary)]/30 underline-offset-2 hover:decoration-[var(--accent-secondary)]/50 transition-colors"
        >
          {children}
          <svg className="inline-block w-3 h-3 ml-1 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )
    }
    return (
      <Link href={href || '#'} className="text-[var(--accent-primary)] hover:text-[var(--accent-secondary)] underline decoration-[var(--accent-primary)]/30 underline-offset-2 hover:decoration-[var(--accent-secondary)]/50 transition-colors">
        {children}
      </Link>
    )
  },
  ul: ({ children }) => (
    <ul className="list-none space-y-2 mb-5 text-[var(--text-secondary)] ml-1">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal space-y-2 mb-5 text-[var(--text-secondary)] ml-6 marker:text-[var(--text-muted)]">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-7 pl-1">
      <span className="text-[var(--accent-primary)]/60 mr-2 select-none">&#8227;</span>
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--accent-primary)]/40 pl-5 my-5 py-1 text-[var(--text-muted)] italic bg-[var(--accent-primary)]/[0.02] rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    // Inline code (no className means no language specified)
    if (!className) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-[var(--bg-overlay)] border border-[var(--border-subtle)] text-[var(--accent-primary)] text-[0.85em] font-mono">
          {children}
        </code>
      )
    }
    // Block code — rendered by rehype-pretty-code, just pass through
    return <code className={className}>{children}</code>
  },
  pre: ({ children }) => {
    const codeText = extractText(children)
    return (
      <div className="group relative my-5">
        <pre className="p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-sunken)] overflow-x-auto text-sm font-mono leading-6">
          {children}
        </pre>
        <CopyButton code={codeText} />
      </div>
    )
  },
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-[var(--border-primary)] bg-[var(--bg-raised)]">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--bg-overlay)] border-b border-[var(--border-primary)]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-[var(--text-muted)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-[var(--text-secondary)] border-b border-[var(--border-subtle)] last:[&:nth-child(1)]:font-medium last:[&:nth-child(1)]:text-[var(--text-primary)]">
      {children}
    </td>
  ),
  hr: () => (
    <div className="my-10 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ''} className="rounded-xl border border-[var(--border-primary)] my-6 max-w-full shadow-lg shadow-black/20" />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
  ),
}
