'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Journey', href: '/journey' },
    { name: 'Contact', href: '/contact' }
  ]

  const socialLinks = [
    { name: 'Instagram', href: '#', Icon: FaInstagram },
    { name: 'LinkedIn', href: '#', Icon: FaLinkedin },
    { name: 'YouTube', href: '#', Icon: FaYoutube }
  ]

  return (
    <footer className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white mt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo.png" 
                  alt="Daily Better Journey Logo" 
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">DAILY BETTER</span>
                <span className="text-white font-bold text-lg -mt-1">JOURNEY</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              Join us on a journey of growth, habits, and self-awareness. Small steps lead to big changes.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.Icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-white/10 hover:bg-golden-500 rounded-full flex items-center justify-center text-xl transition-colors backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-white/70 hover:text-golden-400 transition-colors cursor-pointer inline-block"
                    >
                      {link.name}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">
              Get weekly insights and growth tips delivered to your inbox.
            </p>
            <Link href="/#newsletter">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-golden-500 to-forest-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Subscribe Now
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Quote and Copyright */}
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xl text-white/90 italic font-light max-w-2xl mx-auto"
          >
            "Progress, not perfection, that's the Daily Better Journey."
          </motion.p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Copyright © 2025 Daily Better Journey. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-golden-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-golden-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
