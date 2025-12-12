import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Base API configuration using RTK Query
export const baseApi = createApi({
  reducerPath: 'api',
  // https://api.dailybetterjourney.com
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json')
      
      // Add auth token if available
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('admin_token')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      }
      
      return headers
    },
  }),
  tagTypes: ['Newsletter', 'Post', 'Contact'],
  endpoints: () => ({}),
})

