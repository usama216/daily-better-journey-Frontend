import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Daily Better Journey',
  description: 'Disclaimer for Daily Better Journey. Important information about the use of our website and content.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/disclaimer' },
  openGraph: {
    title: 'Disclaimer | Daily Better Journey',
    description: 'Important information about the use of our website and content.',
    type: 'website',
    url: '/disclaimer',
    siteName: 'Daily Better Journey',
    images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: 'Disclaimer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer | Daily Better Journey',
    images: ['/logo-new.png'],
  },
}

export default function DisclaimerLayout({ children }: { children: React.ReactNode }) {
  return children
}
