'use client'

import { motion } from 'framer-motion'

const DailyQuote = () => {
  const quote = "Improvement is not about being the best — it's about being better than yesterday."

  return (
    <section className="relative z-10 bg-gradient-to-br from-golden-50 via-white to-forest-50 py-24">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-golden-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-forest-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-golden-100 border border-golden-300 rounded-full mb-4"
          >
            <span className="text-golden-700 text-sm font-semibold uppercase tracking-wide">Inspiration</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-charcoal-900"
          >
            Daily Quote
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl border border-golden-200"
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-golden-50 to-forest-50 opacity-50"></div>
        
          {/* Quote Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute top-6 left-6 text-8xl text-golden-300 font-serif leading-none select-none"
          >
            &ldquo;
          </motion.div>

          {/* Quote Text */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-charcoal-800 leading-relaxed italic text-center">
              {quote}
            </p>
          </div>

          {/* Bottom quote mark */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            className="absolute bottom-6 right-8 text-8xl text-golden-300 font-serif leading-none select-none"
          >
            &rdquo;
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DailyQuote

