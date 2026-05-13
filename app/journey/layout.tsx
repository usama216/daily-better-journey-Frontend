import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Journey - Daily Better Journey | About Our Mission',
  description:
    "Learn about Daily Better Journey's mission to help you grow through small, consistent changes. Read the founder's story and discover practical self-improvement tips.",
  keywords:
    'personal growth, self improvement, daily habits, emotional intelligence, journaling, mindfulness, Daily Better Journey',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  alternates: { canonical: '/journey' },
  openGraph: {
    title: 'The Journey - Daily Better Journey',
    description:
      'Learn about our mission to help you become better every single day through small, consistent changes.',
    type: 'website',
    url: '/journey',
    siteName: 'Daily Better Journey',
    locale: 'en_US',
    images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: 'The Journey | Daily Better Journey' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Journey - Daily Better Journey',
    description:
      'Learn about our mission to help you become better every single day through small, consistent changes.',
    images: ['/logo-new.png'],
  },
}

export default function JourneyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
