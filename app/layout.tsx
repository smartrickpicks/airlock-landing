import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Airlock — The workspace that builds itself around your team',
  description:
    'Enterprise data operations platform. Contracts, teams, and intelligence in one workspace that learns who you are.',
  openGraph: {
    title: 'Airlock — Enterprise Operations, Orchestrated',
    description:
      'The workspace that learns who you are and builds itself around your team.',
    url: 'https://doyoulikedags.xyz',
    siteName: 'Airlock',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airlock — Enterprise Operations, Orchestrated',
    description:
      'The workspace that learns who you are and builds itself around your team.',
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
