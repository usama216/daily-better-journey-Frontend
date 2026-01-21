import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-charcoal-900 mb-4">Post Not Found</h1>
          <p className="text-charcoal-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-golden-700 hover:text-golden-800 font-semibold underline"
          >
            Back to Blog
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}
