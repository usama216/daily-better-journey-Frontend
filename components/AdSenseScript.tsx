'use client'

import { useEffect } from 'react'

const DEFAULT_CLIENT = 'ca-pub-7003431121839753'

/**
 * Loads AdSense after the page is interactive to avoid blocking LCP/TBT.
 */
export default function AdSenseScript() {
  useEffect(() => {
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || DEFAULT_CLIENT
    const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`
    let cancelled = false

    const loadAdSense = () => {
      if (cancelled) return

      const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
      if (existing) return

      const script = document.createElement('script')
      script.async = true
      script.crossOrigin = 'anonymous'
      script.src = src
      document.head.appendChild(script)
    }

    let idleId: number | undefined
    let timer: ReturnType<typeof setTimeout> | undefined

    if (typeof requestIdleCallback === 'function') {
      idleId = requestIdleCallback(loadAdSense, { timeout: 4000 })
    } else {
      timer = setTimeout(loadAdSense, 3000)
    }

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof cancelIdleCallback === 'function') {
        cancelIdleCallback(idleId)
      }
      if (timer !== undefined) {
        clearTimeout(timer)
      }
    }
  }, [])

  return null
}
