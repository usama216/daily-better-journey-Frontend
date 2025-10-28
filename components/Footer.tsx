'use client'

import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 border-t border-gray-200 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © Daily Better Journey
          </p>
          
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="text-gray-600 hover:text-primary-700 font-medium transition-colors"
          >
            Sign up for our newsletter
          </motion.a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer

