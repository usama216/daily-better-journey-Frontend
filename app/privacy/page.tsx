'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
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
              Privacy Policy
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
              Welcome to Daily Better Journey ("we," "our," or "us"). Your privacy is important to us, and this Privacy Policy explains how we collect, use, protect, and disclose information when you visit or interact with our website, content, and services.
            </p>
            
            <p className="text-charcoal-700 leading-relaxed mb-8">
              By using this website, you agree to the practices described in this Privacy Policy.
            </p>

            <div className="space-y-8">
              {/* Section 1 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">1. Information We Collect</h2>
                <p className="text-charcoal-700 leading-relaxed mb-4">
                  We may collect the following types of information:
                </p>
                
                <div className="ml-4 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-2">a. Personal Information</h3>
                    <p className="text-charcoal-700 leading-relaxed mb-2">
                      You may voluntarily provide personal information, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside text-charcoal-700 space-y-1 ml-4">
                      <li>Name</li>
                      <li>Email address</li>
                      <li>Contact information</li>
                      <li>Any information you submit through forms, subscriptions, or comments</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-2">b. Non-Personal Information</h3>
                    <p className="text-charcoal-700 leading-relaxed mb-2">
                      We automatically collect certain non-identifying information, such as:
                    </p>
                    <ul className="list-disc list-inside text-charcoal-700 space-y-1 ml-4">
                      <li>Browser type and version</li>
                      <li>Device type</li>
                      <li>IP address</li>
                      <li>Pages visited and time spent on the site</li>
                      <li>Referring website or source</li>
                    </ul>
                    <p className="text-charcoal-700 leading-relaxed mt-2">
                      This data helps us understand how visitors use our website and improve the user experience.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-charcoal-700 leading-relaxed mb-2">
                  We use the collected information to:
                </p>
                <ul className="list-disc list-inside text-charcoal-700 space-y-1 ml-4">
                  <li>Provide and improve our content and services</li>
                  <li>Respond to inquiries or messages</li>
                  <li>Send newsletters or updates (only if you opt in)</li>
                  <li>Analyze website traffic and user behavior</li>
                  <li>Maintain website security and performance</li>
                </ul>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  We do not sell, trade, or rent your personal information to third parties.
                </p>
              </section>

              {/* Section 3 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">3. Cookies and Tracking Technologies</h2>
                <p className="text-charcoal-700 leading-relaxed mb-2">
                  Daily Better Journey may use cookies and similar technologies to:
                </p>
                <ul className="list-disc list-inside text-charcoal-700 space-y-1 ml-4">
                  <li>Enhance website functionality</li>
                  <li>Remember user preferences</li>
                  <li>Analyze traffic and engagement</li>
                </ul>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  You can choose to disable cookies through your browser settings. Please note that some features of the website may not function properly if cookies are disabled.
                </p>
              </section>

              {/* Section 4 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">4. Third-Party Services</h2>
                <p className="text-charcoal-700 leading-relaxed mb-2">
                  We may use trusted third-party services such as:
                </p>
                <ul className="list-disc list-inside text-charcoal-700 space-y-1 ml-4">
                  <li>Analytics tools (e.g., Google Analytics)</li>
                  <li>Email marketing platforms</li>
                  <li>Hosting and security providers</li>
                </ul>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  These third parties have their own privacy policies and are only given access to information necessary to perform their services.
                </p>
              </section>

              {/* Section 5 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">5. Data Security</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  We take reasonable technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              {/* Section 6 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">6. Your Privacy Rights (GDPR, UK GDPR, CCPA)</h2>
                <p className="text-charcoal-700 leading-relaxed mb-4">
                  Depending on your location, you have certain rights regarding your personal data.
                </p>
                
                <div className="ml-4 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-2">For EU & UK Residents (GDPR / UK GDPR)</h3>
                    <p className="text-charcoal-700 leading-relaxed mb-2">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-charcoal-700 space-y-1 ml-4">
                      <li>Access your personal data</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your data ("right to be forgotten")</li>
                      <li>Restrict or object to processing</li>
                      <li>Request data portability</li>
                      <li>Withdraw consent at any time</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal-900 mb-2">For US Residents (CCPA/CPRA – California)</h3>
                    <p className="text-charcoal-700 leading-relaxed mb-2">
                      You have the right to:
                    </p>
                    <ul className="list-disc list-inside text-charcoal-700 space-y-1 ml-4">
                      <li>Know what personal data is collected</li>
                      <li>Request deletion of personal data</li>
                      <li>Opt out of the sale or sharing of personal data</li>
                      <li>Not be discriminated against for exercising your rights</li>
                    </ul>
                    <p className="text-charcoal-700 leading-relaxed mt-2">
                      We do not sell personal data.
                    </p>
                  </div>
                </div>
                
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  To exercise any of these rights, contact us at the email listed below.
                </p>
              </section>

              {/* Section 7 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">7. Children's Information</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  Daily Better Journey does not knowingly collect personal information from children under the age of 13. If you believe that a child has provided personal data on our website, please contact us and we will promptly remove it.
                </p>
              </section>

              {/* Section 8 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">8. External Links</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  Our website may contain links to external websites. We are not responsible for the privacy practices or content of those third-party sites. We encourage you to review their privacy policies separately.
                </p>
              </section>

              {/* Section 9 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">9. Changes to This Privacy Policy</h2>
                <p className="text-charcoal-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the website after changes are posted constitutes acceptance of those changes.
                </p>
              </section>

              {/* Section 10 */}
              <section>
                <h2 className="text-2xl font-bold text-charcoal-900 mb-4">10. Contact Us</h2>
                <p className="text-charcoal-700 leading-relaxed mb-4">
                  If you have any questions or concerns regarding this Privacy Policy, you may contact us at:
                </p>
                <div className="text-charcoal-700 leading-relaxed space-y-2">
                  <p>
                    Email: <a href="mailto:support@dailybetterjourney.com" className="text-golden-600 hover:text-golden-700 underline transition-colors">support@dailybetterjourney.com</a>
                  </p>
                  <p>
                    Website: <a href="https://dailybetterjourney.com" className="text-golden-600 hover:text-golden-700 underline transition-colors">DailyBetterJourney.com</a>
                  </p>
                </div>
                <p className="text-charcoal-700 leading-relaxed mt-4">
                  Thank you for trusting Daily Better Journey. Your privacy matters to us.
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

