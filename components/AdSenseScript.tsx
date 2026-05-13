'use client'

import { useEffect } from 'react'

const DEFAULT_CLIENT = 'ca-pub-7003431121839753'

/**
 * Loads the AdSense loader script once. Publisher ID can be overridden with
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID when you wire slots later.
 */
export default function AdSenseScript() {
  useEffect(() => {
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || DEFAULT_CLIENT
    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) return

    const script = document.createElement('script')
    script.async = true
    script.crossOrigin = 'anonymous'
    script.src = src
    document.head.appendChild(script)
  }, [])

  return null
}
