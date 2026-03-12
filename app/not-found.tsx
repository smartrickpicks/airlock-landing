import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="font-mono text-6xl font-bold text-[var(--accent-primary)] mb-4">404</p>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-2">
          Page not found
        </h1>
        <p className="text-[var(--text-muted)] mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--accent-primary)] text-[var(--bg-base)] font-semibold rounded-lg px-5 py-2.5 text-sm hover:brightness-110 transition-all"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
