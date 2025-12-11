'use client'

import { motion } from 'framer-motion'

const DailyQuote = () => {
  const quote = "What lies behind us and what lies before us are tiny matters compared to what lies within us."

  return (
    <section className="relative z-10 bg-gradient-to-br from-forest-50 via-white to-forest-100 py-10 lg:py-32 overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-forest-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-forest-300 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-forest-100 border border-forest-300 rounded-full mb-4"
          >
            <span className="text-forest-700 text-sm font-semibold uppercase tracking-wide">A Gentle Reminder</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-charcoal-900"
          >
        Trust Your Becoming
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group bg-white rounded-3xl p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl border-2 border-transparent hover:border-forest-200 transition-all duration-500"
        >
          {/* Enhanced Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-50 via-white to-forest-50 opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-forest-100/50 via-transparent to-forest-100/50 group-hover:opacity-100 transition-opacity duration-500"></div>
        
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-forest-400 to-transparent opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-forest-400 to-transparent opacity-10"></div>
        
          {/* Quote Icon - Enhanced */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-4 left-4 text-9xl text-forest-200 font-serif leading-none select-none opacity-60"
          >
            &ldquo;
          </motion.div>

          {/* Quote Text */}
          <div className="relative z-10 max-w-4xl mx-auto">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-charcoal-800 leading-relaxed italic text-center px-4">
              {quote}
            </p>
            
            {/* Author attribution */}
            <div className="mt-8 text-center">
              <p className="text-sm font-semibold text-forest-600 uppercase tracking-wider">Ralph Waldo Emerson</p>
            </div>
          </div>

          {/* Bottom quote mark - Enhanced */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="absolute bottom-4 right-6 text-9xl text-forest-200 font-serif leading-none select-none opacity-60"
          >
            &rdquo;
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DailyQuote

