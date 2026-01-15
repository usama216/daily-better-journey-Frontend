'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaSeedling, FaStar, FaLeaf } from 'react-icons/fa6'
import { IoSparkles } from 'react-icons/io5'

const AboutMission = () => {
  return (
    <section className="relative bg-white py-6 lg:py-24 overflow-hidden">
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
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-4">
              <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Get To Know Us</span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold text-charcoal-900 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-golden-600 to-forest-600">
                Your Partner In

              </span>
              <br />
              Everyday Progress
            </h2>

            <p className="text-md text-charcoal-700">
              Daily Better Journey grew from a simple idea. Life feels a lot better when you have a place that helps you slow down, reset, and try again with a little more clarity.  </p>

            <p className="text-md text-charcoal-700">
              We wanted to create a space where growth feels doable, where you can learn at your own pace, and where small changes feel worth celebrating.  </p>
            <div role="region" aria-label="Four habit prompts">
              <ul className="list-disc pl-6 space-y-2 text-gray-800">
                <li>Habits That Stick</li>
                <li>Mindset That Supports</li>
                <li>Focus That Lasts</li>
                <li>Motivation That Feels Real</li>
              </ul>
            </div>
        
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Daily Habits', Icon: FaSeedling, color: 'from-forest-400 to-forest-600' },
                { title: 'Growth Mindset', Icon: FaStar, color: 'from-golden-400 to-golden-600' },
                { title: 'Self-Awareness', Icon: FaLeaf, color: 'from-golden-400 to-forest-500' },
                { title: 'Better You', Icon: IoSparkles, color: 'from-forest-400 to-golden-500' },
              ].map((item, i) => {
                const IconComponent = item.Icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gradient-to-br flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg border border-white/20"
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, backgroundImage: `linear-gradient(135deg, ${item.color === 'from-forest-400 to-forest-600' ? '#4ade80, #16a34a' : item.color === 'from-golden-400 to-golden-600' ? '#facc15, #eab308' : '#facc15, #22c55e'})` }}
                  >
                    <IconComponent className="w-12 h-12 mb-3 text-white" />
                    <span className="text-white font-semibold text-center">{item.title}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMission

