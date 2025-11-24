import { baseApi } from './baseApi'

export interface ContactSubmission {
  name: string
  email: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
  data?: {
    id: string
    name: string
    email: string
    message: string
    status: string
    created_at: string
  }
}

export interface ContactSubmissionData {
  id: string
  name: string
  email: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  created_at: string
  updated_at: string
}

export interface ContactsResponse {
  success: boolean
  data: ContactSubmissionData[]
  pagination?: {
    total: number
    limit: number
    offset: number
  }
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Submit contact form
    submitContact: builder.mutation<ContactResponse, ContactSubmission>({
      query: (data) => ({
        url: '/contact',
        method: 'POST',
        body: data,
      }),
    }),

    // Get all contact submissions (Admin)
    getContacts: builder.query<ContactsResponse, { status?: string; limit?: number; offset?: number }>({
      query: (params = {}) => {
        const searchParams = new URLSearchParams()
        if (params.status) searchParams.append('status', params.status)
        if (params.limit) searchParams.append('limit', params.limit.toString())
        if (params.offset) searchParams.append('offset', params.offset.toString())
        
        return {
          url: `/admin/contacts${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
          method: 'GET',
        }
      },
      providesTags: ['Contact'],
    }),

    // Get single contact submission (Admin)
    getContact: builder.query<{ success: boolean; data: ContactSubmissionData }, string>({
      query: (id) => ({
        url: `/admin/contacts/${id}`,
        method: 'GET',
      }),
      providesTags: ['Contact'],
    }),

    // Update contact status (Admin)
    updateContactStatus: builder.mutation<
      { success: boolean; message: string; data: ContactSubmissionData },
      { id: string; status: 'new' | 'read' | 'replied' | 'archived' }
    >({
      query: ({ id, status }) => ({
        url: `/admin/contacts/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Contact'],
    }),

    // Delete contact submission (Admin)
    deleteContact: builder.mutation<{ success: boolean; message: string }, string>({
      query: (id) => ({
        url: `/admin/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
})

export const {
  useSubmitContactMutation,
  useGetContactsQuery,
  useGetContactQuery,
  useUpdateContactStatusMutation,
  useDeleteContactMutation,
} = contactApi

