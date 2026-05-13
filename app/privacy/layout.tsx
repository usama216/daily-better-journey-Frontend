import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Daily Better Journey',
  description:
    'Privacy Policy for Daily Better Journey. Learn how we collect, use, protect, and disclose your information.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | Daily Better Journey',
    description: 'How we collect, use, and protect your information.',
    type: 'website',
    url: '/privacy',
    siteName: 'Daily Better Journey',
    images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: 'Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Daily Better Journey',
    images: ['/logo-new.png'],
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
