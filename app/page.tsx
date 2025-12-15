import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import AboutMission from '@/components/AboutMission'
import FeaturedArticles from '@/components/FeaturedArticles'
import DailyQuote from '@/components/DailyQuote'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'

export const metadata: Metadata = {
  title: 'Daily Better Journey | Your Space For Real Growth',
  description: "Find guidance, reflections, and practical steps that support steady self-improvement. Empower your mindset, strengthen your habits, and create lasting change.",
  keywords: 'personal growth, self improvement, daily habits, emotional intelligence, mindfulness, self awareness, productivity, discipline, Daily Better Journey',
  authors: [{ name: 'R. Khan', url: 'https://dailybetterjourney.com' }],
  openGraph: {
    title: 'Daily Better Journey | Your Space For Real Growth',
    description: "Find guidance, reflections, and practical steps that support steady self-improvement. Empower your mindset, strengthen your habits, and create lasting change.",
    type: 'website',
    locale: 'en_US',
    siteName: 'Daily Better Journey',
    url: 'https://dailybetterjourney.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Better Journey | Your Space For Real Growth',
    description: "Find guidance, reflections, and practical steps that support steady self-improvement. Empower your mindset, strengthen your habits, and create lasting change.",
    images: ['https://dailybetterjourney.com/logo-new.png'],
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
  alternates: {
    canonical: 'https://dailybetterjourney.com',
  },
}

export default function Home() {
  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Daily Better Journey',
    url: 'https://dailybetterjourney.com',
    description: 'A personal growth and self-improvement blog focused on daily habits, emotional intelligence, and mindful living.',
    publisher: {
      '@type': 'Person',
      name: 'R. Khan',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://dailybetterjourney.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Daily Better Journey',
    url: 'https://dailybetterjourney.com',
    logo: 'https://dailybetterjourney.com/logo-new.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+447411504773',
      email: 'support@dailybetterjourney.com',
      contactType: 'Customer Service',
    },
    sameAs: [
      'https://instagram.com/dailybetterjourney',
      'https://linkedin.com/company/dailybetterjourney',
      'https://youtube.com/@dailybetterjourney',
    ],
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-white">
        <Header />
        
        <Hero />
        
        {/* Ad Banner after Hero */}
        <AdBanner position="after-hero" />
        
   
        
        {/* Featured Articles */}
        <FeaturedArticles />
        
        {/* About the Mission */}
        <AboutMission />
        
        {/* Ad Banner between sections - Leaderboard 728×90 */}
        <AdBanner position="between-sections" />
        
        {/* In-Article Ad - 300×250 Rectangle */}
        <div className="py-6">
          <AdBanner position="in-article" />
        </div>
        
        {/* Daily Quote */}
        <DailyQuote />
        
        {/* Square Ad - 250×250 */}
        <div className="py-6">
          <AdBanner position="square" />
        </div>
        
        {/* Newsletter */}
        <Newsletter />
        
        {/* Ad Banner before footer - Large Leaderboard 970×90 */}
        <AdBanner position="before-footer" />
        
        <Footer />
      </div>
    </>
  )
}
