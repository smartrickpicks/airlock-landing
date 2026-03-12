import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Airlock — The workspace that builds itself around your team',
  description:
    'Enterprise data operations platform. Contracts, teams, and intelligence in one workspace that learns who you are.',
  icons: {
    icon: '/brand/airlock-256.png',
    apple: '/brand/airlock-512.png',
  },
  openGraph: {
    title: 'Airlock — Enterprise Operations, Orchestrated',
    description:
      'The workspace that learns who you are and builds itself around your team.',
    url: 'https://doyoulikedags.xyz',
    siteName: 'Airlock',
    type: 'website',
    images: [
      {
        url: '/brand/social/og-airlock.png',
        width: 1200,
        height: 627,
        alt: 'Airlock — Enterprise Data Operations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airlock — Enterprise Operations, Orchestrated',
    description:
      'The workspace that learns who you are and builds itself around your team.',
    images: ['/brand/social/og-airlock.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-[var(--bg-base)] text-[var(--text-primary)] antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
