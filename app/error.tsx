'use client'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-6xl font-bold text-red-400 mb-4">500</p>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
          Something went wrong
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          An unexpected error occurred. Try again or head back to the homepage.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold rounded-lg px-5 py-2.5 text-sm hover:brightness-110 transition-all"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold rounded-lg px-5 py-2.5 text-sm hover:bg-[var(--bg-overlay)] transition-all"
          >
            Back to home
          </a>
        </div>
      </div>
    </div>
  )
}
