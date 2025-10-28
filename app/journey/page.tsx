'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FaBook, FaLightbulb, FaHeart, FaChartLine, FaFlask, FaDumbbell, FaBrain, FaPenNib } from 'react-icons/fa6'
import Image from 'next/image'

export default function JourneyPage() {
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
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Our Story</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal-900 mb-6"
            >
              The Journey to a Better You Starts Here
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            >
              Every person is on a journey, not of competition, but of progress.
            </motion.p>
          </header>
        </div>
      </section>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: 'Articles Published', value: '50+', icon: FaBook, color: 'from-golden-400 to-golden-600' },
            { label: 'Readers Growing', value: '500+', icon: FaHeart, color: 'from-forest-400 to-forest-600' },
            { label: 'Categories', value: '5', icon: FaLightbulb, color: 'from-golden-400 to-forest-500' },
            { label: 'Weekly Growth', value: '100%', icon: FaChartLine, color: 'from-forest-400 to-golden-500' },
          ].map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-charcoal-100 hover:border-golden-200 transition-all text-center"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-charcoal-900 mb-1">{stat.value}</div>
                <div className="text-sm text-charcoal-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Our Mission</h2>
            <p className="text-charcoal-700 leading-relaxed mb-6 text-lg">
              Daily Better Journey was created to remind you that growth isn't an overnight event. It's a daily practice, made of small choices, quiet reflections, and steady habits.
            </p>
            <p className="text-charcoal-700 leading-relaxed mb-6 text-lg">
              This platform exists to share stories, methods, and mindsets that help you evolve, one step at a time. We believe in progress over perfection, consistency over intensity.
            </p>
            <p className="text-charcoal-700 leading-relaxed text-lg">
              Whether you're starting your growth journey or looking to deepen existing practices, you'll find practical wisdom, personal stories, and actionable insights here.
            </p>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="sticky top-24">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=600&fit=crop"
                  alt="Journey of Growth"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-lg font-bold mb-1">Small Steps, Big Dreams</p>
                  <p className="text-sm opacity-90">Your journey matters</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* What You'll Find - Enhanced Cards */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-charcoal-900 mb-12 text-center">What You'll Find Here</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                title: 'Science-Backed Tips', 
                desc: 'Evidence-based self-improvement strategies backed by research and real-world application',
                Icon: FaFlask,
                gradient: 'from-golden-400 to-golden-600'
              },
              { 
                title: 'Habit Building', 
                desc: 'Practical methods to build lasting habits and create sustainable change in your daily life',
                Icon: FaDumbbell,
                gradient: 'from-forest-400 to-forest-600'
              },
              { 
                title: 'Emotional Intelligence', 
                desc: 'Personal reflections on discipline, emotional awareness, and mindful living',
                Icon: FaBrain,
                gradient: 'from-golden-400 to-forest-500'
              },
              { 
                title: 'Journaling & Focus', 
                desc: 'Guided exercises and prompts for self-awareness, clarity, and intentional growth',
                Icon: FaPenNib,
                gradient: 'from-forest-400 to-golden-500'
              }
            ].map((feature, index) => {
              const IconComponent = feature.Icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-xl border-2 border-charcoal-100 hover:border-golden-200 transition-all"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900 mb-3">{feature.title}</h3>
                  <p className="text-charcoal-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-golden-50 via-white to-forest-50 rounded-3xl p-12 md:p-16 border-2 border-golden-200 relative overflow-hidden">
            {/* Decorative quote marks */}
            <div className="absolute top-6 left-6 text-9xl text-golden-200 font-serif leading-none opacity-30">"</div>
            <div className="absolute bottom-6 right-8 text-9xl text-golden-200 font-serif leading-none opacity-30">"</div>
            
            <div className="relative z-10">
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light italic text-charcoal-800 leading-relaxed mb-8 text-center">
                I started this blog to share what I've learned about growth, not from grand achievements, but from small, consistent changes.
              </blockquote>
              <p className="text-center text-charcoal-900 font-bold text-lg">— R. Khan, Founder</p>
              <p className="text-center text-charcoal-600 mt-2">Daily Better Journey</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-charcoal-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-charcoal-600 text-lg mb-8">Explore our articles and begin your path to growth today</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="/blog"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
              aria-label="Start reading articles on our blog"
            >
              <span className="relative z-10">Explore Articles</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-golden-600 to-forest-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.a>

            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 border-2 border-charcoal-800 text-charcoal-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-charcoal-50 transition-all shadow-lg"
            >
              Get in Touch
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
