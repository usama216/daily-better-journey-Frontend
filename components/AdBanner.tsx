'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface AdBannerProps {
  position: 
    | 'after-hero'           // Leaderboard 728×90
    | 'between-sections'     // Leaderboard 728×90
    | 'before-footer'        // Large Leaderboard 970×90
    | 'left-rail'            // Wide Skyscraper 160×600
    | 'right-rail'           // Medium Rectangle 300×250
    | 'sidebar-rectangle'    // Large Rectangle 336×280
    | 'half-page'            // Half Page 300×600
    | 'in-article'           // In-Article Rectangle 300×250
    | 'mobile-anchor'        // Mobile Anchor 320×100
    | 'square'               // Square 250×250
}

const AdBanner = ({ position }: AdBannerProps) => {
  // AdSense Standard Sizes (Width x Height) - ALL FORMATS
  const adConfigs = {
    'after-hero': {
      // Leaderboard 728x90 (Desktop) / 320x100 (Mobile)
      desktop: { width: '728px', height: '90px', format: 'Leaderboard 728×90' },
      mobile: { width: '320px', height: '100px', format: 'Mobile Banner 320×100' },
      containerClass: 'max-w-[728px] mx-auto'
    },
    'between-sections': {
      // Leaderboard 728x90 (Desktop) / 320x50 (Mobile)
      desktop: { width: '728px', height: '90px', format: 'Leaderboard 728×90' },
      mobile: { width: '320px', height: '50px', format: 'Mobile Banner 320×50' },
      containerClass: 'max-w-[728px] mx-auto'
    },
    'before-footer': {
      // Large Leaderboard 970x90 (Desktop) / 320x100 (Mobile)
      desktop: { width: '970px', height: '90px', format: 'Large Leaderboard 970×90' },
      mobile: { width: '320px', height: '100px', format: 'Mobile Banner 320×100' },
      containerClass: 'max-w-[970px] mx-auto'
    },
    'left-rail': {
      // Wide Skyscraper 160x600
      desktop: { width: '160px', height: '600px', format: 'Wide Skyscraper 160×600' },
      mobile: { width: '160px', height: '600px', format: 'Wide Skyscraper 160×600' },
      containerClass: 'w-[160px]'
    },
    'right-rail': {
      // Medium Rectangle 300x250 (Most popular & best performing)
      desktop: { width: '300px', height: '250px', format: 'Medium Rectangle 300×250' },
      mobile: { width: '300px', height: '250px', format: 'Medium Rectangle 300×250' },
      containerClass: 'w-[300px]'
    },
    'sidebar-rectangle': {
      // Large Rectangle 336x280 (High visibility)
      desktop: { width: '336px', height: '280px', format: 'Large Rectangle 336×280' },
      mobile: { width: '300px', height: '250px', format: 'Medium Rectangle 300×250' },
      containerClass: 'w-[336px]'
    },
    'half-page': {
      // Half Page 300x600 (High revenue potential)
      desktop: { width: '300px', height: '600px', format: 'Half Page 300×600' },
      mobile: { width: '300px', height: '250px', format: 'Medium Rectangle 300×250' },
      containerClass: 'w-[300px]'
    },
    'in-article': {
      // In-Article Rectangle 300x250 (Native feel)
      desktop: { width: '300px', height: '250px', format: 'In-Article 300×250' },
      mobile: { width: '300px', height: '250px', format: 'In-Article 300×250' },
      containerClass: 'max-w-[300px] mx-auto'
    },
    'mobile-anchor': {
      // Mobile Anchor Ad 320x100
      desktop: { width: '728px', height: '90px', format: 'Leaderboard 728×90' },
      mobile: { width: '320px', height: '100px', format: 'Mobile Anchor 320×100' },
      containerClass: 'max-w-[728px] mx-auto'
    },
    'square': {
      // Square 250x250
      desktop: { width: '250px', height: '250px', format: 'Square 250×250' },
      mobile: { width: '250px', height: '250px', format: 'Square 250×250' },
      containerClass: 'w-[250px] mx-auto'
    }
  }

  const config = adConfigs[position]
  const containerRef = useRef<HTMLElement | null>(null)

  // Initialize AdSense only for unprocessed ad slots within this banner
  useEffect(() => {
    if (typeof window === 'undefined') return

    const adSlots = containerRef.current?.querySelectorAll('ins.adsbygoogle') || []
    if (!adSlots.length) return

    // @ts-ignore
    const adsQueue = window.adsbygoogle
    if (!adsQueue || typeof adsQueue.push !== 'function') return

    adSlots.forEach((slot) => {
      const processed = slot.getAttribute('data-ad-status') === 'done'
      if (processed) return
      try {
        // @ts-ignore
        adsQueue.push({})
      } catch (err) {
        console.log('AdSense error:', err)
      }
    })
  }, [])

  return (
    <aside
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`${config.containerClass} my-8`}
      role="complementary"
      aria-label="Advertisement"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-2">
          Advertisement
        </div>
        
        {/* Desktop Ad */}
        <div className="hidden md:block">
          <div 
            className="flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded"
            style={{ 
              width: config.desktop.width, 
              height: config.desktop.height 
            }}
          >
            {/* 
              TODO: Add your Ad Slot ID from Google AdSense
              
              <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7003431121839753"
                data-ad-slot="XXXXXXXXXX"
                data-ad-format="auto"
                data-full-width-responsive="true"
              ></ins>
            */}
            <div className="text-center text-gray-400 text-sm">
              <div className="font-semibold">{config.desktop.format}</div>
              <div className="text-xs mt-1">AdSense Ready</div>
            </div>
          </div>
        </div>

        {/* Mobile Ad */}
        <div className="block md:hidden">
          <div 
            className="flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded"
            style={{ 
              width: config.mobile.width, 
              height: config.mobile.height 
            }}
          >
            {/* 
              TODO: Add your Ad Slot ID from Google AdSense
              
              <ins
                className="adsbygoogle"
                style={{ display: 'inline-block', width: '320px', height: '100px' }}
                data-ad-client="ca-pub-7003431121839753"
                data-ad-slot="XXXXXXXXXX"
              ></ins>
            */}
            <div className="text-center text-gray-400 text-xs">
              <div className="font-semibold">{config.mobile.format}</div>
              <div className="text-[10px] mt-1">AdSense Ready</div>
            </div>
          </div>
        </div>
      </motion.div>
    </aside>
  )
}

export default AdBanner

