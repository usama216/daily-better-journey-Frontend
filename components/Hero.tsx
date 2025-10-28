'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa6'
import { HiOutlineHeart } from 'react-icons/hi2'
import { IoSparkles } from 'react-icons/io5'

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-golden-50/30 via-white to-forest-50/30"></div>
      
      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-golden-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-forest-300 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-golden-100 to-forest-100 border-2 border-golden-300 rounded-full shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-golden-500"></span>
              </span>
              <span className="text-charcoal-800 text-sm font-bold">Weekly Insights Available Now</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight"
            >
              <span className="block text-charcoal-900 mb-2">Become Better,</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-golden-600 via-forest-600 to-golden-600 animate-gradient">
                Every Single Day
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg sm:text-xl text-charcoal-700 leading-relaxed max-w-lg"
            >
              Join a journey of growth, habits, and self-awareness that leads to the{' '}
              <span className="font-bold text-forest-700">best version of you.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.95 }}
                className="group relative bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Join the Journey
                  <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-golden-600 to-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-3 border-charcoal-800 text-charcoal-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-charcoal-50 transition-all shadow-xl"
                >
                  Read Articles
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators - Enhanced Design */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="flex flex-wrap items-center gap-8 pt-8 border-t border-charcoal-200"
            >
              <div className="flex items-center gap-4 group cursor-pointer">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-14 h-14 bg-gradient-to-br from-golden-400 to-golden-600 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <span className="text-xl font-black text-white">500+</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                </motion.div>
                <div>
                  <p className="font-bold text-lg text-charcoal-900 group-hover:text-golden-600 transition-colors">Readers</p>
                  <p className="text-sm text-charcoal-600">Growing daily</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  className="relative w-14 h-14 bg-gradient-to-br from-forest-400 to-forest-600 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <span className="text-xl font-black text-white">50+</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                </motion.div>
                <div>
                  <p className="font-bold text-lg text-charcoal-900 group-hover:text-forest-600 transition-colors">Articles</p>
                  <p className="text-sm text-charcoal-600">Expert insights</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative w-14 h-14 bg-gradient-to-br from-golden-400 to-forest-500 rounded-2xl flex items-center justify-center shadow-xl"
                >
                  <FaStar className="w-6 h-6 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                </motion.div>
                <div>
                  <p className="font-bold text-lg text-charcoal-900 group-hover:text-golden-600 transition-colors">Weekly</p>
                  <p className="text-sm text-charcoal-600">New content</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Side - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main Image */}
              <div className="relative w-full h-full bg-gradient-to-br from-golden-100 to-forest-100 rounded-3xl shadow-2xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=800&fit=crop"
                  alt="Daily Better Journey - Growth and Self Improvement"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-golden-600/20 to-forest-600/20"></div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-golden-500 to-forest-600 text-white p-6 rounded-2xl shadow-2xl"
              >
                <IoSparkles className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-bold mt-1">Small Steps</p>
                <p className="text-xs opacity-90">Big Change</p>
              </motion.div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, type: "spring" }}
                className="absolute bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border-2 border-forest-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-forest-400 to-forest-600 rounded-xl flex items-center justify-center">
                    <HiOutlineHeart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-charcoal-900">Daily Growth</p>
                    <p className="text-xs text-charcoal-600">Track your progress</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
