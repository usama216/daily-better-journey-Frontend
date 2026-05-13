'use client'

import { useEffect, useRef } from 'react'

const DEFAULT_CLIENT = 'ca-pub-7003431121839753'

export type AdBannerPosition =
  | 'after-hero'
  | 'between-sections'
  | 'in-article'
  | 'square'
  | 'before-footer'
  | 'left-rail'
  | 'right-rail'
  | 'sidebar-rectangle'
  | 'half-page'
  | 'mobile-anchor'

const POSITION_CLASS: Record<AdBannerPosition, string> = {
  'after-hero': 'flex justify-center w-full max-w-[970px] mx-auto py-4',
  'between-sections': 'flex justify-center w-full py-6',
  'in-article': 'flex justify-center w-full max-w-[336px] mx-auto py-6',
  square: 'flex justify-center w-full max-w-[250px] mx-auto py-6',
  'before-footer': 'flex justify-center w-full max-w-[970px] mx-auto py-8',
  'left-rail': 'flex justify-center w-[160px] min-h-[600px]',
  'right-rail': 'flex justify-center w-[300px] min-h-[250px]',
  'sidebar-rectangle': 'flex justify-center w-[336px] min-h-[280px]',
  'half-page': 'flex justify-center w-[300px] min-h-[600px]',
  'mobile-anchor': 'flex justify-center w-full fixed bottom-0 left-0 right-0 z-40 p-2 bg-white/95 border-t border-charcoal-100 md:hidden',
}

interface AdBannerProps {
  position: AdBannerPosition
  /** Per-placement slot from AdSense; falls back to NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT */
  adSlot?: string
  className?: string
}

export default function AdBanner({ position, adSlot, className }: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || DEFAULT_CLIENT
  const slot = adSlot ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT_DEFAULT ?? ''

  useEffect(() => {
    if (!slot || !containerRef.current) return

    const unprocessed = containerRef.current.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status])')
    if (unprocessed.length === 0) return

    try {
      const w = window as Window & { adsbygoogle?: unknown[] }
      w.adsbygoogle = w.adsbygoogle || []
      unprocessed.forEach(() => {
        w.adsbygoogle!.push({})
      })
    } catch (err) {
      console.warn('AdSense:', err)
    }
  }, [slot])

  if (!slot) {
    return null
  }

  const wrap = `${POSITION_CLASS[position]} ${className ?? ''}`.trim()

  return (
    <div ref={containerRef} className={wrap}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
