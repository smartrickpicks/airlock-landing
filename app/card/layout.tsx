import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Developer Card — What kind of developer are you? | Airlock',
  description:
    'Connect your GitHub. We analyze your commits, PRs, and branches to reveal your behavioral profile across 17 developer types. 2 minutes, read-only, no data stored.',
  openGraph: {
    title: 'What kind of developer are you?',
    description:
      'Connect your GitHub and discover your behavioral profile. Based on real code, not a quiz.',
    url: 'https://airlocklabs.io/card',
    siteName: 'Airlock',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What kind of developer are you?',
    description:
      'I just discovered my developer profile. Based on my actual GitHub activity.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
