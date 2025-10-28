import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedArticles from '@/components/FeaturedArticles'
import DailyQuote from '@/components/DailyQuote'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Ad Banner after Hero */}
      <AdBanner position="after-hero" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeaturedArticles />
      </div>
      
      {/* Ad Banner between sections */}
      <AdBanner position="between-sections" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <DailyQuote />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Newsletter />
      </div>
      
      {/* Ad Banner before footer */}
      <AdBanner position="before-footer" />
      
      <Footer />
    </main>
  )
}

