import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            The Journey to a Better You Starts Here
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every person is on a journey, not of competition, but of progress.
          </p>
        </header>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none mb-16">
          <p className="text-gray-700 leading-relaxed mb-6">
            Daily Better Journey was created to remind you that growth isn't an overnight event. It's a daily practice, made of small choices, quiet reflections, and steady habits.
          </p>
          <p className="text-gray-700 leading-relaxed mb-12">
            This platform exists to share stories, methods, and mindsets that help you evolve, one step at a time.
          </p>
        </div>

        {/* What You'll Find */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">What You'll Find Here:</h2>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-3" aria-hidden="true"></div>
              <p className="text-gray-700 text-lg">Science-backed self-improvement tips</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-3" aria-hidden="true"></div>
              <p className="text-gray-700 text-lg">Practical habit-building methods</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-3" aria-hidden="true"></div>
              <p className="text-gray-700 text-lg">Personal reflections on discipline and emotional intelligence</p>
            </li>
            <li className="flex items-start gap-4">
              <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-3" aria-hidden="true"></div>
              <p className="text-gray-700 text-lg">Guided journaling exercises for awareness and focus</p>
            </li>
          </ul>
        </section>

        {/* Founder's Note */}
        <section className="bg-gray-50 p-8 rounded-lg mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Founder's Note:</h2>
          <blockquote className="text-gray-700 italic leading-relaxed mb-4 border-l-4 border-primary-600 pl-4">
            "I started this blog to share what I've learned about growth, not from grand achievements, but from small, consistent changes. If even one article helps you move closer to your best self, then this journey is worth it."
          </blockquote>
          <p className="text-gray-900 font-semibold">— R. Khan</p>
        </section>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/blog"
            className="inline-block bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-900 transition-colors"
            aria-label="Start reading articles on our blog"
          >
            Start Reading →
          </a>
        </div>
      </article>

      <Footer />
    </main>
  )
}
