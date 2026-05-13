import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Daily Better Journey',
  description: 'Terms & Conditions for Daily Better Journey. Read our terms of service and usage policies.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms & Conditions | Daily Better Journey',
    description: 'Terms of service and usage policies.',
    type: 'website',
    url: '/terms',
    siteName: 'Daily Better Journey',
    images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: 'Terms & Conditions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms & Conditions | Daily Better Journey',
    images: ['/logo-new.png'],
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
