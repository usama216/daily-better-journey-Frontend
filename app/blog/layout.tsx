import type { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { getSiteUrl } from '@/lib/site'

const site = getSiteUrl()

export const metadata: Metadata = {
  title: 'Blog - Daily Better Journey | Self-Improvement Articles',
  description:
    'Explore our blog on habits, discipline, mindset, emotional intelligence, productivity, and personal growth. Learn practical tips for becoming better every day.',
  keywords:
    'self improvement blog, personal growth, habits, discipline, emotional intelligence, productivity, mindset articles',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog - Daily Better Journey',
    description:
      'Explore self-improvement articles on habits, mindset, emotional intelligence, and more.',
    type: 'website',
    url: '/blog',
    siteName: 'Daily Better Journey',
    locale: 'en_US',
    images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: 'Daily Better Journey Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Daily Better Journey',
    description:
      'Explore self-improvement articles on habits, mindset, emotional intelligence, and more.',
    images: ['/logo-new.png'],
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Daily Better Journey Blog',
    url: `${site}/blog`,
    description:
      'Articles on personal growth, habits, mindset, emotional intelligence, productivity, and mindful living.',
    publisher: {
      '@type': 'Organization',
      name: 'Daily Better Journey',
      url: site,
    },
  }

  return (
    <>
      <JsonLd data={blogJsonLd} />
      {children}
    </>
  )
}
