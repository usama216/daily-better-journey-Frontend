'use client'

import { motion } from 'framer-motion'

const DailyQuote = () => {
  const quote = "Improvement is not about being the best — it's about being better than yesterday."

  return (
    <section>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-8"
      >
        Daily Quote
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-100 rounded-lg p-8 md:p-12 relative overflow-hidden"
      >
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-200 opacity-20 rounded-full blur-3xl" />
        
        {/* Quote Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute top-6 left-6 text-8xl text-primary-300 font-serif leading-none select-none"
        >
          &ldquo;
        </motion.div>

        {/* Quote Text */}
        <div className="relative z-10 max-w-3xl">
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-800 leading-relaxed italic">
            {quote}
          </p>
        </div>

        {/* Bottom quote mark */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, type: "spring" }}
          className="absolute bottom-6 right-8 text-8xl text-primary-300 font-serif leading-none select-none"
        >
          &rdquo;
        </motion.div>
      </motion.div>
    </section>
  )
}

export default DailyQuote

