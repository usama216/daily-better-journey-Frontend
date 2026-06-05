import type { Metadata } from 'next'
import Providers from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Contact Us - Daily Better Journey | Get in Touch',
  description:
    "Get in touch with Daily Better Journey. Share your story, pitch an idea, or explore a partnership. We'd love to hear from you.",
  keywords: 'contact, get in touch, collaboration, partnership, Daily Better Journey',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Us - Daily Better Journey',
    description:
      "Get in touch with Daily Better Journey. Share your story, pitch an idea, or explore a partnership.",
    type: 'website',
    url: '/contact',
    siteName: 'Daily Better Journey',
    locale: 'en_US',
    images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: 'Contact Daily Better Journey' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Daily Better Journey',
    description:
      "Get in touch with Daily Better Journey. Share your story, pitch an idea, or explore a partnership.",
    images: ['/logo-new.png'],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>
}
