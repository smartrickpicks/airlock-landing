import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Otto & MAGS — Behavioral Intelligence for Deal Teams | Orbit',
  description:
    'Meet Otto. Not an assistant. A behavioral counterweight. 17 personas, 4 chambers, 9 enrichment arcs, and human-in-the-loop gates. The AI teammate built on 60 years of behavioral research.',
  openGraph: {
    title: 'Otto & MAGS — Behavioral Intelligence | Orbit',
    description:
      'The AI teammate that maps your cognitive drives and fills your team gaps. 17 personas. 4 chambers. Human-in-the-loop.',
    url: 'https://doyoulikedags.xyz/otto',
    siteName: 'Orbit',
    type: 'website',
    images: [
      {
        url: '/brand/social/og-otto.png',
        width: 1200,
        height: 627,
        alt: 'Otto — Behavioral Constellation Agent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Otto & MAGS — Behavioral Intelligence | Orbit',
    description:
      'The AI teammate that maps your cognitive drives and fills your team gaps.',
    images: ['/brand/social/og-otto.png'],
  },
}

export default function OttoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
