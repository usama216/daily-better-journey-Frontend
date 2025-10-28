'use client'

import { motion } from 'framer-motion'

const Header = () => {
  const navItems = ['Home', 'Blog', 'Journey', 'Tools', 'Shop', 'Contact']

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="relative w-12 h-12">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle cx="24" cy="24" r="20" stroke="#334e68" strokeWidth="2" />
                <circle cx="24" cy="24" r="12" fill="#334e68" />
                <path
                  d="M24 4 L24 8 M24 40 L24 44 M4 24 L8 24 M40 24 L44 24"
                  stroke="#334e68"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary-900">
                DAILY BETTER
              </span>
              <span className="text-xl font-bold text-primary-900 -mt-1">
                JOURNEY
              </span>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href="#"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-gray-700 hover:text-primary-700 font-medium transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}

export default Header

