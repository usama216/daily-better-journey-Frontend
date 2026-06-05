'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { HERO_SLIDES, type HeroSlide } from '@/lib/heroSlides'

const NewsletterSubscriptionPopup = dynamic(
  () => import('./NewsletterSubscriptionPopup'),
  { ssr: false }
)

const SLIDE_TRANSITION_MS = 650

function SlideContent({
  slide,
  onJoinClick,
  isFirstSlide,
}: {
  slide: HeroSlide
  onJoinClick: () => void
  isFirstSlide: boolean
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-golden-100 to-forest-100 border-2 border-golden-300 rounded-full shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-golden-500" />
          </span>
          <span className="text-charcoal-800 text-sm font-bold">{slide.badge}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
          <span className="block text-charcoal-900 mb-2">{slide.title}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-golden-600 via-forest-600 to-golden-600 animate-gradient">
            {slide.highlight}
          </span>
        </h1>

        <p className="text-md sm:text-lg text-charcoal-700 leading-relaxed max-w-lg">
          {slide.description}
        </p>

        <div className="flex sm:flex-row items-start gap-4 pt-4">
          <button
            type="button"
            onClick={onJoinClick}
            className="group relative bg-gradient-to-r from-charcoal-900 to-charcoal-800 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-2xl overflow-hidden hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="relative z-10 flex items-center gap-3">
              Join the Journey
              <svg
                className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-golden-600 to-forest-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-charcoal-200">
          {slide.stats.map((stat, idx) => (
            <div key={stat.label} className="flex items-center gap-4 group cursor-pointer">
              <div
                className={`relative w-14 h-14 bg-gradient-to-br ${
                  idx % 2 === 0
                    ? 'from-golden-400 to-golden-600'
                    : 'from-forest-400 to-forest-600'
                } rounded-2xl flex items-center justify-center shadow-xl`}
              >
                <span className="text-xl font-black text-white">{stat.number}</span>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              </div>
              <div>
                <p className="font-bold text-lg text-charcoal-900">{stat.label}</p>
                <p className="text-sm text-charcoal-600">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden lg:block">
        <div className="relative aspect-square max-w-lg mx-auto">
          <div className="relative w-full h-full bg-gradient-to-br from-golden-100 to-forest-100 rounded-3xl shadow-2xl overflow-hidden">
            <Image
              src={slide.image}
              alt="Daily Better Journey - Growth and Self Improvement"
              fill
              sizes="(min-width: 1024px) 512px, 0px"
              className="object-cover"
              priority={isFirstSlide}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-golden-600/20 to-forest-600/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideDirection, setSlideDirection] = useState(1)
  const [showNewsletterPopup, setShowNewsletterPopup] = useState(false)
  const [popupMounted, setPopupMounted] = useState(false)

  const goToSlide = useCallback(
    (index: number) => {
      if (index === currentSlide) return
      setSlideDirection(index > currentSlide ? 1 : -1)
      setCurrentSlide(index)
    },
    [currentSlide]
  )

  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new window.Image()
      img.src = slide.image
    })
  }, [])

  useEffect(() => {
    let interval: number | undefined

    const startDelay = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setSlideDirection(1)
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
      }, 6000)
    }, 10000)

    return () => {
      window.clearTimeout(startDelay)
      if (interval) window.clearInterval(interval)
    }
  }, [])

  const openNewsletterPopup = () => {
    setPopupMounted(true)
    setShowNewsletterPopup(true)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-golden-50/30 via-white to-forest-50/30" />

      <div className="absolute top-20 left-10 w-64 h-64 bg-golden-300 rounded-full filter blur-3xl opacity-20 animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 bg-forest-300 rounded-full filter blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="relative min-h-[520px] sm:min-h-[500px] lg:min-h-[460px]">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide
            const offset = slideDirection > 0 ? 'translate-x-6' : '-translate-x-6'

            return (
              <div
                key={slide.badge}
                aria-hidden={!isActive}
                className={`absolute inset-0 w-full hero-slide ${
                  isActive
                    ? 'hero-slide-active opacity-100 translate-x-0 scale-100 z-10'
                    : `opacity-0 ${offset} scale-[0.985] z-0 pointer-events-none`
                }`}
                style={{ transitionDuration: `${SLIDE_TRANSITION_MS}ms` }}
              >
                <SlideContent
                  slide={slide}
                  onJoinClick={openNewsletterPopup}
                  isFirstSlide={index === 0}
                />
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : undefined}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-500 ease-out ${
                currentSlide === index
                  ? 'w-8 h-3 bg-gradient-to-r from-golden-600 to-forest-600'
                  : 'w-3 h-3 bg-charcoal-300 hover:bg-charcoal-400'
              }`}
            />
          ))}
        </div>
      </div>

      {popupMounted ? (
        <NewsletterSubscriptionPopup
          isOpen={showNewsletterPopup}
          onClose={() => setShowNewsletterPopup(false)}
        />
      ) : null}
    </section>
  )
}

export default Hero
