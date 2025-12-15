'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
        <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-golden-50 via-white to-forest-50 py-16 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-golden-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal-900 mb-4">
              Disclaimer
            </h1>
          </motion.div>
        </div>
      </section>
      
      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl border border-charcoal-100"
        >
          <div className="prose prose-lg max-w-none">
        
            
            <p className="text-charcoal-700 leading-relaxed mb-8">
              The information provided by Daily Better Journey is for general informational and educational purposes only.
            </p>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. No Professional Advice</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  Content published on this website does not constitute professional, legal, financial, medical, or psychological advice. You should consult a qualified professional before making decisions based on the information provided.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. Personal Responsibility</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  By using this website, you acknowledge that you are responsible for your own actions, decisions, and results. Daily Better Journey does not guarantee specific outcomes.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. Accuracy of Information</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  While we strive to provide accurate and up-to-date content, we make no representations or warranties regarding completeness, reliability, or accuracy.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. Affiliate & External Links</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  Some links on this website may be affiliate links. This means we may earn a commission at no additional cost to you. We are not responsible for third-party websites or services.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. Testimonials & Results</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  Any testimonials or success stories shared are individual experiences and do not guarantee similar results for others.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. Contact</h2>
                <p className="text-charcoal-700 leading-relaxed mb-4">
                  If you have questions about this Disclaimer, contact us at:
                </p>
                <p className="text-charcoal-700 leading-relaxed">
                  Email: <a href="mailto:support@dailybetterjourney.com" className="text-golden-600 hover:text-golden-700 underline transition-colors">support@dailybetterjourney.com</a>
                </p>
              </section>
            </div>
          </div>
        </motion.div>
      </div>

        <Footer />
      </main>
  )
}

