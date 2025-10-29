import { baseApi } from './baseApi'

export interface CreatePostRequest {
  title: string
  slug?: string
  excerpt?: string
  content: string
  featured_image?: string
  is_featured?: boolean
  status?: 'draft' | 'published'
  category_id?: string
  tags?: string[]
  meta_description?: string
  meta_keywords?: string
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {
  id: string
}

export interface UpdateStatusRequest {
  id: string
  status: 'draft' | 'published'
}

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/categories',
      providesTags: ['Post'],
    }),
    createCategory: builder.mutation({
      query: (data: { name: string; slug?: string; description?: string }) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...data }: { id: string; name?: string; slug?: string; description?: string }) => ({
        url: `/categories/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPostsByCategorySlug: builder.query({
      query: (slug: string) => `/categories/${slug}/posts`,
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (id: string) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    createPost: builder.mutation({
      query: (data: CreatePostRequest) => ({
        url: '/posts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...data }: UpdatePostRequest) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }, 'Post'],
    }),
    deletePost: builder.mutation({
      query: (id: string) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
    updatePostStatus: builder.mutation({
      query: ({ id, status }: UpdateStatusRequest) => ({
        url: `/posts/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }, 'Post'],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useUpdatePostStatusMutation,
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetPostsByCategorySlugQuery,
} = blogApi

