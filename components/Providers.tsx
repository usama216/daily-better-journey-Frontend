'use client'

import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import RouteTopLoader from '@/components/RouteTopLoader'

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <RouteTopLoader />
      {children}
    </Provider>
  )
}

