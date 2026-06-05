import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Journey', href: '/journey' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { name: 'Instagram', href: '#', Icon: FaInstagram },
  { name: 'LinkedIn', href: '#', Icon: FaLinkedin },
  { name: 'YouTube', href: '#', Icon: FaYoutube },
]

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 text-white mt-20 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-golden-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-forest-400 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
          <div className="md:col-span-2 space-y-4">
            <Image
              src="/logo-new.png"
              alt="Daily Better Journey Logo"
              width={80}
              height={80}
              sizes="80px"
              quality={75}
              loading="lazy"
              className="object-contain"
            />
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              A space for real people who want steady growth, honest guidance, and a life built with
              intention.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const IconComponent = social.Icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-golden-500 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-golden-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li>
                <a
                  href="mailto:support@dailybetterjourney.com"
                  className="hover:text-golden-400 transition-colors"
                >
                  support@dailybetterjourney.com
                </a>
              </li>
              <li>
                <a href="tel:+447411504773" className="hover:text-golden-400 transition-colors">
                  +44 7411 504773
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">
              Get weekly insights and growth tips delivered to your inbox.
            </p>
            <Link
              href="/#newsletter"
              className="inline-block w-full text-center bg-gradient-to-r from-golden-500 to-forest-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Subscribe Now
            </Link>
          </div>
        </div>

        <div className="border-t border-white/10 my-8" />

        <div className="text-center space-y-4">
          <p className="text-xl text-white/90 italic font-light max-w-2xl mx-auto">
            &ldquo;Progress, not perfection, that&apos;s the Daily Better Journey.&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Copyright © {new Date().getFullYear()} Daily Better Journey. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-white/60 justify-center sm:justify-end">
              <Link href="/privacy" className="hover:text-golden-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-golden-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/disclaimer" className="hover:text-golden-400 transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
