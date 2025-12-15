'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
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
              Terms & Conditions
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
              Welcome to Daily Better Journey. By accessing or using this website, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the website.
            </p>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. Use of Website</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  The content provided on Daily Better Journey is for informational and educational purposes only. You agree to use this website lawfully and in a way that does not infringe on the rights of others.
                </p>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. Intellectual Property</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  All content on this website, including text, graphics, logos, and original material, is the intellectual property of Daily Better Journey unless otherwise stated. You may not copy, reproduce, or distribute content without prior written permission.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. User Contributions</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  If you submit comments, emails, or other content, you grant Daily Better Journey a non-exclusive right to use, display, and distribute that content. You are responsible for ensuring your submissions do not violate any laws or third-party rights.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. Email Subscriptions</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  By subscribing to our email list, you consent to receive emails from us. You may unsubscribe at any time using the link provided in our emails.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. Limitation of Liability</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  Daily Better Journey is not liable for any direct, indirect, or consequential loss arising from your use of the website or reliance on its content.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. External Links</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  Our website may include links to third-party websites. We are not responsible for their content, accuracy, or practices.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">7. Termination</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  We reserve the right to restrict or terminate access to the website at our discretion without notice.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">8. Governing Law</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  These Terms shall be governed by and interpreted in accordance with applicable international laws, without regard to conflict of law principles.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">9. Contact Information</h2>
                <p className="text-charcoal-700 leading-relaxed mb-4">
                  For questions regarding these Terms & Conditions, contact:
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

