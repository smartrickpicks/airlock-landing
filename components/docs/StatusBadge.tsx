const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  brainstorm: {
    bg: 'bg-yellow-500/10 border-yellow-500/20',
    text: 'text-yellow-400',
    dot: 'bg-yellow-400',
  },
  specced: {
    bg: 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/20',
    text: 'text-[var(--accent-primary)]',
    dot: 'bg-[var(--accent-primary)]',
  },
  locked: {
    bg: 'bg-[var(--chamber-ship)]/10 border-[var(--chamber-ship)]/20',
    text: 'text-[var(--chamber-ship)]',
    dot: 'bg-[var(--chamber-ship)]',
  },
  draft: {
    bg: 'bg-[var(--text-muted)]/10 border-[var(--text-muted)]/20',
    text: 'text-[var(--text-muted)]',
    dot: 'bg-[var(--text-muted)]',
  },
  deprecated: {
    bg: 'bg-red-500/10 border-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-400',
  },
}

export default function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase().replace(/[^a-z]/g, '')
  const style = statusStyles[key] || statusStyles.draft

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium uppercase tracking-wider border ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
      {status}
    </span>
  )
}
