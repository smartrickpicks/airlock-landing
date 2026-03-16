import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Airlock — The AI teammate that adapts to how you work',
  description:
    'Behavioral intelligence for developers. NoConflict resolves git conflicts before they happen. Forge adds 17 AI personas tuned to your style.',
  icons: {
    icon: '/brand/airlock-256.png',
    apple: '/brand/airlock-512.png',
  },
  openGraph: {
    title: 'Airlock — Behavioral Intelligence for Dev Teams',
    description:
      'The AI teammate that adapts to how you work. NoConflict + Forge.',
    url: 'https://doyoulikedags.xyz',
    siteName: 'Airlock',
    type: 'website',
    images: [
      {
        url: '/brand/social/og-airlock.png',
        width: 1200,
        height: 627,
        alt: 'Airlock — Behavioral Intelligence for Dev Teams',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Airlock — Behavioral Intelligence for Dev Teams',
    description:
      'The AI teammate that adapts to how you work. NoConflict + Forge.',
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
