'use client'

import { motion } from 'framer-motion'

interface AdBannerProps {
  position: 'after-hero' | 'between-sections' | 'before-footer'
}

const AdBanner = ({ position }: AdBannerProps) => {
  const heights: Record<typeof position, string> = {
    'after-hero': 'h-32',
    'between-sections': 'h-20',
    'before-footer': 'h-24',
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`w-full ${heights[position]} flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 border-y border-gray-200 my-8`}
    >
      <div className="text-center space-y-2">
        <div className="text-xs text-gray-400 uppercase tracking-wider">
          Advertisement
        </div>
        {/* AdSense placeholder - Replace this with actual AdSense code */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded px-8 py-4 text-gray-400 text-sm">
          {/* AdSense Ad will go here */}
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Ad Space</span>
          </div>
        </div>
      </div>

      {/* Comment block for AdSense integration */}
      {/* 
      To integrate AdSense, replace the above div with:
      
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
      */}
    </motion.div>
  )
}

export default AdBanner

