'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa6'
import { HiOutlineHeart } from 'react-icons/hi2'
import { IoSparkles } from 'react-icons/io5'
import NewsletterSubscriptionPopup from './NewsletterSubscriptionPopup'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)

  const slides = [
    {
      badge: 'Boost Daily Productivity',
      title: 'Create Focus That',
      highlight: 'Carries You Forward',
      description: 'Try simple productivity methods that simplify your day, clear mental clutter, and guide your progress with calm.',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=800&fit=crop',
      stats: [
        { number: '500+', label: 'Readers', sublabel: 'Growing daily' },
        { number: '50+', label: 'Articles', sublabel: 'Expert insights' }
      ]
    },
    {
      badge: 'Build Better Habits',
      title: 'Shape Days That',
      highlight: ' Feel Truly Yours',
      description: 'Discover small, simple habits that turn everyday moments into tiny wins and gradually build real, lasting momentum in your life.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=800&fit=crop',
      stats: [
        { number: '100+', label: 'Tips', sublabel: 'Practical advice' },
        { number: '24/7', label: 'Access', sublabel: 'Anytime learning' }
      ]
    },
    {
      badge: 'Grow Your Mindset',
      title: 'Train Your Mind',
      highlight: 'To Support You',
      description: 'Learn gentle mindset tools that quiet fear, spark clarity, and help you show up with gradual confidence.',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=800&fit=crop',
      stats: [
        { number: '10K+', label: 'Members', sublabel: 'Community strong' },
        { number: '95%', label: 'Success', sublabel: 'Goal achievement' }
      ]
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-golden-50/30 via-white to-forest-50/30"></div>
      
      {/* Side Ad Slots - AdSense Wide Skyscraper 160×600 (visible on xl and above) */}
      <aside className="hidden xl:flex absolute left-4 top-6 z-20" style={{ width: '160px', height: '600px' }}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl shadow-sm">
          {/* 
            REPLACE WITH ADSENSE CODE:
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '160px', height: '600px' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
            ></ins>
          */}
          <div className="text-center text-gray-400 text-xs uppercase tracking-wider rotate-180 [writing-mode:vertical-rl]">
            160×600 AdSense
          </div>
        </div>
      </aside>
      <aside className="hidden xl:flex absolute right-4 top-6 z-20" style={{ width: '160px', height: '600px' }}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl shadow-sm">
          {/* 
            REPLACE WITH ADSENSE CODE:
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '160px', height: '600px' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
            ></ins>
          */}
          <div className="text-center text-gray-400 text-xs uppercase tracking-wider rotate-180 [writing-mode:vertical-rl]">
            160×600 AdSense
          </div>
        </div>
      </aside>

      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-golden-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-forest-300 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-32 py-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-golden-100 to-forest-100 border-2 border-golden-300 rounded-full shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-golden-500"></span>
                </span>
                <span className="text-charcoal-800 text-sm font-bold">{slides[currentSlide].badge}</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight"
              >
                <span className="block text-charcoal-900 mb-2">{slides[currentSlide].title}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-golden-600 via-forest-600 to-golden-600 animate-gradient">
                  {slides[currentSlide].highlight}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-md sm:text-lg text-charcoal-700 leading-relaxed max-w-lg"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex sm:flex-row items-start gap-4 pt-4"
              >
                <motion.button
                  onClick={() => setShowNewsletterPopup(true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Join the Journey
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-golden-600 to-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-8 pt-8 border-t border-charcoal-200"
              >
                {slides[currentSlide].stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5 }}
                      className={`relative w-14 h-14 bg-gradient-to-br ${idx % 2 === 0 ? 'from-golden-400 to-golden-600' : 'from-forest-400 to-forest-600'} rounded-2xl flex items-center justify-center shadow-xl`}
                    >
                      <span className="text-xl font-black text-white">{stat.number}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                    </motion.div>
                    <div>
                      <p className={`font-bold text-lg text-charcoal-900 group-hover:${idx % 2 === 0 ? 'text-golden-600' : 'text-forest-600'} transition-colors`}>{stat.label}</p>
                      <p className="text-sm text-charcoal-600">{stat.sublabel}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Right Side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative w-full h-full bg-gradient-to-br from-golden-100 to-forest-100 rounded-3xl shadow-2xl overflow-hidden">
                  <Image 
                    src={slides[currentSlide].image}
                    alt="Daily Better Journey - Growth and Self Improvement"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-golden-600/20 to-forest-600/20"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? 'w-8 h-3 bg-gradient-to-r from-golden-600 to-forest-600' 
                  : 'w-3 h-3 bg-charcoal-300 hover:bg-charcoal-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Newsletter Subscription Popup */}
      <NewsletterSubscriptionPopup 
        isOpen={showNewsletterPopup} 
        onClose={() => setShowNewsletterPopup(false)} 
      />
    </section>
  )
}

export default Hero
