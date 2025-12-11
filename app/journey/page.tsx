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
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Behind The Name</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-charcoal-900 mb-6"
            >
              A Journey That Belongs To You

            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed"
            >
             This space exists to help you return to yourself and keep moving forward with intention. </motion.p>
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
            { label: 'Stories To Guide You', value: '50+', icon: FaBook, color: 'from-golden-400 to-golden-600' },
            { label: 'Lives Moving Forward', value: '500+', icon: FaHeart, color: 'from-forest-400 to-forest-600' },
            { label: 'Journeys To Choose From', value: '5+', icon: FaLightbulb, color: 'from-golden-400 to-forest-500' },
            { label: 'Growth Rising Each Week', value: '80%', icon: FaChartLine, color: 'from-forest-400 to-golden-500' },
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
            <h2 className="text-3xl font-bold text-charcoal-900 mb-6">Why I Started Daily Better Journey</h2>
            <p className="text-charcoal-700 leading-relaxed mb-6 text-lg">
            Daily Better Journey began during a time when I felt stuck in my own life. I kept waiting for motivation to magically show up, until one day I realized nothing would change unless I changed something first.  </p>
            <p className="text-charcoal-700 leading-relaxed mb-6 text-lg">
            So I started small. Tiny habits, honest check ins, small choices that actually felt doable. Those small shifts helped me feel like myself again, and I wanted a place to share what worked in a simple, real way. 
            </p>
            <p className="text-charcoal-700 leading-relaxed text-lg">
            This space is my way of passing that forward. If you are looking for steady, honest growth without the pressure to be perfect, you are in the right place. </p>
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
          <h2 className="text-4xl font-bold text-charcoal-900 mb-12 text-center">What Awaits You Here</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                title: 'Ideas That Make Sense', 
                desc: 'Finest insights pulled from psychology and lived experience, explained in a way that helps you actually use them in the middle of real life.',
                Icon: FaFlask,
                gradient: 'from-golden-400 to-golden-600'
              },
              { 
                title: 'Habits That Feel Possible', 
                desc: 'Small, doable practices that meet you where you are. No giant overhauls, just steps that quietly shift your days in the right direction.',                Icon: FaDumbbell,
                gradient: 'from-forest-400 to-forest-600'
              },
              { 
                title: 'Understanding Yourself Better', 
                desc: 'Stories and reflections that help you see your patterns, handle your emotions with more kindness, and respond instead of react.',
                Icon: FaBrain,
                gradient: 'from-golden-400 to-forest-500'
              },
              { 
                title: 'Space To Think Clearly', 
                desc: 'Prompts and exercises that slow down the noise. A place to sort your thoughts, find your focus, and map out where you want to go next.',
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
              The biggest shift in my life happened when I stopped chasing the perfect version of myself and started showing up for the real one.    </blockquote>
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
