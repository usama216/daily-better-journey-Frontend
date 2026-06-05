import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import JsonLd from '@/components/JsonLd'
import { absoluteUrl, getSiteUrl } from '@/lib/site'
import { getFeaturedPosts } from '@/lib/posts'

const FeaturedArticles = dynamic(() => import('@/components/FeaturedArticles'))
const AboutMission = dynamic(() => import('@/components/AboutMission'))
const DailyQuote = dynamic(() => import('@/components/DailyQuote'))
const Newsletter = dynamic(() => import('@/components/Newsletter'))
const Footer = dynamic(() => import('@/components/Footer'))

const site = getSiteUrl()

export const metadata: Metadata = {
  title: 'Daily Better Journey | Your Space For Real Growth',
  description:
    'Find guidance, reflections, and practical steps that support steady self-improvement. Empower your mindset, strengthen your habits, and create lasting change.',
  keywords:
    'personal growth, self improvement, daily habits, emotional intelligence, mindfulness, self awareness, productivity, discipline, Daily Better Journey',
  authors: [{ name: 'R. Khan', url: site }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Daily Better Journey | Your Space For Real Growth',
    description:
      'Find guidance, reflections, and practical steps that support steady self-improvement. Empower your mindset, strengthen your habits, and create lasting change.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Daily Better Journey',
    url: '/',
    images: [{ url: '/logo-new.png', width: 1200, height: 630, alt: 'Daily Better Journey' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Better Journey | Your Space For Real Growth',
    description:
      'Find guidance, reflections, and practical steps that support steady self-improvement. Empower your mindset, strengthen your habits, and create lasting change.',
    images: ['/logo-new.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function Home() {
  const featuredPosts = await getFeaturedPosts()

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/#webpage`,
    url: site,
    name: 'Daily Better Journey | Your Space For Real Growth',
    isPartOf: { '@type': 'WebSite', name: 'Daily Better Journey', url: site },
    about: {
      '@type': 'Thing',
      name: 'Personal growth and self-improvement',
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl('/logo-new.png'),
    },
  }

  return (
    <>
      <JsonLd data={webPageJsonLd} />

      <div className="bg-white">
        <Header />

        <Hero />

        <FeaturedArticles initialPosts={featuredPosts} />

        <AboutMission />

        <DailyQuote />

        <Newsletter />

        <Footer />
      </div>
    </>
  )
}
