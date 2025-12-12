import { baseApi } from './baseApi'

export interface NewsletterSubscription {
  email: string
}

export interface NewsletterResponse {
  success: boolean
  message: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  subscribed_at: string
  unsubscribed_at?: string
  is_active: boolean
}

export interface NewsletterSubscribersResponse {
  success: boolean
  data: NewsletterSubscriber[]
  pagination?: {
    total: number
    limit: number
    offset: number
  }
}

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Subscribe to newsletter
    subscribeToNewsletter: builder.mutation<NewsletterResponse, NewsletterSubscription>({
      query: (data) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Unsubscribe from newsletter
    unsubscribeFromNewsletter: builder.mutation<NewsletterResponse, string>({
      query: (email) => ({
        url: '/newsletter/unsubscribe',
        method: 'POST',
        body: { email },
      }),
      invalidatesTags: ['Newsletter'],
    }),

    // Get all newsletter subscribers (Admin)
    getNewsletterSubscribers: builder.query<NewsletterSubscribersResponse, { is_active?: string; limit?: number; offset?: number }>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams()
        if (params.is_active !== undefined) searchParams.append('is_active', params.is_active)
        if (params.limit) searchParams.append('limit', params.limit.toString())
        if (params.offset) searchParams.append('offset', params.offset.toString())
        
        return {
          url: `/admin/newsletter/subscribers${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
          method: 'GET',
        }
      },
      providesTags: ['Newsletter'],
    }),

    // Delete newsletter subscriber (Admin)
    deleteNewsletterSubscriber: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/newsletter/subscribers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Newsletter'],
    }),
  }),
})

export const {
  useSubscribeToNewsletterMutation,
  useUnsubscribeFromNewsletterMutation,
  useGetNewsletterSubscribersQuery,
  useDeleteNewsletterSubscriberMutation,
} = newsletterApi

