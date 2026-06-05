'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About us', href: '/journey' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          <Link href="/" aria-label="Daily Better Journey - Home">
            <div className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform">
              <Image
                src="/logo-new.png"
                alt="Daily Better Journey Logo"
                width={48}
                height={48}
                sizes="48px"
                quality={75}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-charcoal-800 hover:text-golden-600 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-gray-700 relative z-50 active:scale-95 transition-transform"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4 border-t border-charcoal-200">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-charcoal-800 hover:text-golden-600 font-medium transition-colors px-2 py-2"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
