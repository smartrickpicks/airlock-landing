import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

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
    <div className="group p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-raised)] hover:border-[var(--accent-primary)]/30 hover:bg-[var(--bg-overlay)] transition-all">
      <div className="flex items-start gap-3">
        {icon && <span className="text-lg mt-0.5">{icon}</span>}
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
            {title}
          </h3>
          {children && (
            <div className="mt-1 text-sm text-[var(--text-secondary)]">{children}</div>
          )}
        </div>
      </div>
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
      className="grid gap-3 my-4"
      style={{ gridTemplateColumns: `repeat(${Math.min(cols, 3)}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  )
}

function Info({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 p-4 rounded-xl border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5">
      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-[var(--accent-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="text-sm text-[var(--text-secondary)]">{children}</div>
    </div>
  )
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div className="text-sm text-[var(--text-secondary)]">{children}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
      <svg className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
      <div className="text-sm text-[var(--text-secondary)]">{children}</div>
    </div>
  )
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
    <h1 id={id} className="text-3xl font-bold text-[var(--text-primary)] mt-8 mb-4 scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ children, id }) => (
    <h2 id={id} className="text-2xl font-semibold text-[var(--text-primary)] mt-8 mb-3 pb-2 border-b border-[var(--border-primary)] scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children, id }) => (
    <h3 id={id} className="text-xl font-semibold text-[var(--text-primary)] mt-6 mb-2 scroll-mt-20">
      {children}
    </h3>
  ),
  h4: ({ children, id }) => (
    <h4 id={id} className="text-lg font-medium text-[var(--text-primary)] mt-4 mb-2 scroll-mt-20">
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
          className="text-[var(--accent-primary)] hover:underline"
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href || '#'} className="text-[var(--accent-primary)] hover:underline">
        {children}
      </Link>
    )
  },
  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 mb-4 text-[var(--text-secondary)] ml-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 mb-4 text-[var(--text-secondary)] ml-2">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-[var(--accent-primary)] pl-4 my-4 text-[var(--text-muted)] italic">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => {
    // Inline code (no className means no language specified / inline)
    if (!className) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-[var(--bg-overlay)] text-[var(--accent-primary)] text-sm font-mono">
          {children}
        </code>
      )
    }
    // Block code — rendered by rehype-pretty-code, just pass through
    return <code className={className}>{children}</code>
  },
  pre: ({ children }) => (
    <pre className="my-4 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-sunken)] overflow-x-auto text-sm font-mono leading-6">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto rounded-xl border border-[var(--border-primary)]">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[var(--bg-overlay)]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2.5 text-left font-semibold text-[var(--text-primary)] border-b border-[var(--border-primary)]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2.5 text-[var(--text-secondary)] border-b border-[var(--border-subtle)]">
      {children}
    </td>
  ),
  hr: () => <hr className="my-8 border-[var(--border-primary)]" />,
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt || ''} className="rounded-xl border border-[var(--border-primary)] my-4 max-w-full" />
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
  ),
}
