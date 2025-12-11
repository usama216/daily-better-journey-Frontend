'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MdOutlineEmail, MdOutlineLocationOn } from 'react-icons/md'
import { FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa6'
import { useSubmitContactMutation } from '@/lib/api/contactApi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  const [submitContact, { isLoading: isSubmitting }] = useSubmitContactMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitStatus('idle')
    setErrorMessage('')
    
    try {
      await submitContact(formData).unwrap()
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (error: any) {
      setSubmitStatus('error')
      setErrorMessage(error?.data?.message || 'Failed to send message. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-golden-50 via-white to-forest-50 py-24 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-golden-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-6"
            >
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Let’s Talk</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal-900 mb-6"
            >
             Your Voice Matters Here
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            >
             If you landed here, something in you is already shifting. Do not ignore it. Reach out, ask what you need to ask, share what you want to share. Sometimes the simplest message is the first real step toward clarity. Tell us what you are facing, and we will guide you with honest, personalized support, completely free.
            </motion.p>
          </header>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Email Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-charcoal-100 hover:border-golden-200 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-golden-400 to-golden-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MdOutlineEmail className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">Email</h3>
              <a href="mailto:hello@dailybetterjourney.com" className="text-charcoal-600 hover:text-golden-600 transition-colors">
                hello@dailybetterjourney.com
              </a>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-charcoal-100 hover:border-forest-200 transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-forest-400 to-forest-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MdOutlineLocationOn className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">Location</h3>
              <p className="text-charcoal-600">Remote • Worldwide Reach</p>
            </motion.div>

            {/* Social Links Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-charcoal-100 group"
            >
              <h3 className="text-xl font-bold text-charcoal-900 mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-12 h-12 bg-charcoal-100 hover:bg-golden-200 rounded-xl flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-5 h-5 text-charcoal-600" />
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-12 h-12 bg-charcoal-100 hover:bg-forest-200 rounded-xl flex items-center justify-center transition-all"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5 text-charcoal-600" />
                </motion.a>
                <motion.a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-12 h-12 bg-charcoal-100 hover:bg-golden-200 rounded-xl flex items-center justify-center transition-all"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-5 h-5 text-charcoal-600" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-xl border border-charcoal-100 space-y-6"
            aria-label="Contact form"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-charcoal-900 mb-3">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 border-2 border-charcoal-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-200 transition-all text-charcoal-900 placeholder-charcoal-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-charcoal-900 mb-3">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 border-2 border-charcoal-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-200 transition-all text-charcoal-900 placeholder-charcoal-400"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-charcoal-900 mb-3">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 border-2 border-charcoal-200 rounded-xl focus:outline-none focus:border-golden-500 focus:ring-2 focus:ring-golden-200 transition-all text-charcoal-900 placeholder-charcoal-400 resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border-2 border-green-200 text-green-800 rounded-xl font-semibold"
                role="alert"
              >
                ✓ Message sent successfully! We&apos;ll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border-2 border-red-200 text-red-800 rounded-xl font-semibold"
                role="alert"
              >
                ✗ {errorMessage || 'Failed to send message. Please try again.'}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="group w-full bg-gradient-to-r from-charcoal-900 to-charcoal-800 hover:from-golden-600 hover:to-forest-600 text-white px-8 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
