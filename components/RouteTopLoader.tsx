'use client'

import dynamic from 'next/dynamic'

const NextTopLoader = dynamic(
  () => import('nextjs-toploader').then((mod) => mod.default),
  { ssr: false }
)

export default function RouteTopLoader() {
  return (
    <NextTopLoader
      color="#16a34a"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px rgba(22, 163, 74, 0.35)"
      zIndex={99999}
    />
  )
}
