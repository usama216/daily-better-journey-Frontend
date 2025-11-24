import { baseApi } from './baseApi'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data?: {
    token: string
    user: {
      id: string
      email: string
      name: string
    }
  }
}

export interface VerifyResponse {
  success: boolean
  message: string
  data?: {
    user: {
      id: string
      email: string
      name: string
    }
  }
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Admin login
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Verify token
    verifyToken: builder.query<VerifyResponse, void>({
      query: () => ({
        url: '/admin/verify',
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useVerifyTokenQuery,
} = authApi

