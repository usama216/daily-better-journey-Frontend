'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const AboutMission = () => {
  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-4">
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Our Mission</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-600 to-forest-600">
                Small Steps.
              </span>
              <br />
              Big Change.
            </h2>
            
            <p className="text-lg text-charcoal-700 leading-relaxed">
              At Daily Better Journey, we believe <span className="font-semibold text-forest-700">true transformation happens in small steps.</span> Each sunrise presents us with another opportunity to grow, reflect, and realign with our purpose.
            </p>
            
            <p className="text-lg text-charcoal-700 leading-relaxed">
              Whether you're building better habits, mastering your emotions, or finding focus, this is your home for becoming just a little bit better each day.
            </p>
            
            <div className="flex gap-4">
              {['Growth', 'Habits', 'Mindfulness'].map((tag, i) => (
                <div key={i} className="px-4 py-2 bg-charcoal-100 rounded-lg text-charcoal-700 font-medium">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Daily Habits', icon: '🌱', color: 'from-forest-400 to-forest-600' },
                { title: 'Growth Mindset', icon: '🌟', color: 'from-golden-400 to-golden-600' },
                { title: 'Self-Awareness', icon: '🧘', color: 'from-golden-400 to-forest-500' },
                { title: 'Better You', icon: '✨', color: 'from-forest-400 to-golden-500' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square bg-gradient-to-br flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg border border-white/20"
                  style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, backgroundImage: `linear-gradient(135deg, ${item.color === 'from-forest-400 to-forest-600' ? '#4ade80, #16a34a' : item.color === 'from-golden-400 to-golden-600' ? '#facc15, #eab308' : '#facc15, #22c55e'})` }}
                >
                  <span className="text-4xl mb-2">{item.icon}</span>
                  <span className="text-white font-semibold text-center">{item.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMission

