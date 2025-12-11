'use client'

import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { FaSave, FaEye, FaImage } from 'react-icons/fa'
import { useCreatePostMutation, useGetCategoriesQuery } from '@/lib/api/blogApi'
import { getAuthHeadersForFetch } from '@/lib/auth'
import { usePopup } from '@/hooks/usePopup'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function NewPostPage() {
  const router = useRouter()
  const [createPost, { isLoading }] = useCreatePostMutation()
  const { showError, PopupComponent } = usePopup()
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    is_featured: false,
    status: 'draft' as 'draft' | 'published',
    category_id: '',
    meta_description: '',
    meta_keywords: ''
  })
  const { data: categoriesData } = useGetCategoriesQuery(undefined)
  const categories = (categoriesData?.data || categoriesData || [])

  const hasUserEditedSlug = useRef(false)
  const hasUserEditedExcerpt = useRef(false)

  // Function to strip HTML and generate excerpt
  const stripHTML = (html: string) => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
  }

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: function(this: any) {
          const quill = this.quill
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.onchange = async () => {
            const file = (input.files && input.files[0]) || null
            if (!file) return
            
            // Save current cursor position
            const range = quill.getSelection(true)
            const index = range ? range.index : quill.getLength()
            
            try {
              const form = new FormData()
              form.append('file', file)
              
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.dailybetterjourney.com/api'}/upload`, {
                method: 'POST',
                headers: getAuthHeadersForFetch(),
                body: form,
              })
              
              if (!res.ok) {
                throw new Error('Upload failed')
              }
              
              const json = await res.json()
              
              if (json?.url) {
                // Insert image at saved position
                quill.insertEmbed(index, 'image', json.url)
                quill.setSelection(index + 1)
              } else {
                showError('Upload Failed', 'Failed to upload image. Please try again.')
              }
            } catch (e: any) {
              console.error('Image upload error:', e)
              showError('Upload Failed', 'Image upload failed: ' + (e.message || 'Unknown error'))
            }
          }
          input.click()
        }
      }
    }
  }), [showError])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Auto-generate slug from title until user edits slug manually
    if (name === 'title' && !hasUserEditedSlug.current) {
      const generatedSlug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
    if (name === 'slug') {
      hasUserEditedSlug.current = true
    }
    if (name === 'excerpt') {
      hasUserEditedExcerpt.current = true
    }
  }

  const handleSaveDraft = async () => {
    try {
      await createPost({ ...formData, status: 'draft' }).unwrap()
      router.push('/admin')
    } catch (error) {
      showError('Save Failed', 'Failed to save draft. Please try again.')
    }
  }

  const handlePublish = async () => {
    try {
      await createPost({ ...formData, status: 'published' }).unwrap()
      router.push('/admin')
    } catch (error) {
      showError('Publish Failed', 'Failed to publish post. Please try again.')
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100">
      <header className="bg-white shadow-sm border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal-900">New Post</h1>
              <p className="text-sm text-charcoal-600 mt-1">Create a new blog post</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-charcoal-600 hover:bg-charcoal-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-charcoal-600 text-white rounded-lg font-semibold hover:bg-charcoal-700 transition-colors disabled:opacity-50"
              >
                <FaSave /> Save Draft
              </button>
              <button
                onClick={handlePublish}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-forest-600 to-forest-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                <FaEye /> Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={(e) => e.preventDefault()} className="bg-white rounded-xl shadow-md border border-charcoal-200 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Post Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-lg font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  URL Slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-charcoal-500">/blog/</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="url-slug"
                    className="flex-1 px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Content *
                </label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(html) => {
                      setFormData(prev => {
                        const newData = { ...prev, content: html }
                        // Auto-generate excerpt from content if excerpt is empty
                        if (!hasUserEditedExcerpt.current && !prev.excerpt && html) {
                          const textPreview = stripHTML(html)
                          newData.excerpt = textPreview.substring(0, 200)
                        }
                        return newData
                      })
                    }}
                    modules={quillModules}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-4 border border-charcoal-200 flex items-center justify-between">
                <div>
                  <label className="block text-sm font-semibold text-charcoal-700">Featured</label>
                  <p className="text-xs text-charcoal-500">Show in featured sections</p>
                </div>
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="w-5 h-5"
                />
              </div>
              <div className="bg-charcoal-50 rounded-lg p-4">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Category</label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                >
                  <option value="">Select category</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="bg-white rounded-lg p-4 border border-charcoal-200 flex items-center justify-between">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  <FaImage className="inline mr-2" />
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const form = new FormData()
                      form.append('file', file)
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://api.dailybetterjourney.com/api'}/upload`, {
                        method: 'POST',
                        headers: getAuthHeadersForFetch(),
                        body: form,
                      })
                      const json = await res.json()
                      if (json?.url) {
                        setFormData(prev => ({ ...prev, featured_image: json.url }))
                      }
                    } catch (e) {
                      showError('Upload Failed', 'Image upload failed. Please try again.')
                    }
                  }}
                  className="w-full text-sm"
                />
                {formData.featured_image && (
                  <div className="mt-4 relative">
                    <img
                      src={formData.featured_image}
                      alt="Featured"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none'
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Short description of the post... (Auto-generated from content if left empty)"
                  rows={4}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-sm"
                />
                <p className="text-xs text-charcoal-500 mt-1">
                  Brief summary (used in previews). {!hasUserEditedExcerpt.current ? 'Auto-generating from content...' : 'Edit manually if needed.'}
                </p>
              </div>

              <div className="bg-golden-50 rounded-lg p-4 border border-golden-200">
                <h3 className="text-sm font-semibold text-charcoal-700 mb-3">
                  SEO Settings
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleInputChange}
                      placeholder="SEO description..."
                      rows={3}
                      className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-xs"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-charcoal-600 mb-1">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      name="meta_keywords"
                      value={formData.meta_keywords}
                      onChange={handleInputChange}
                      placeholder="keyword1, keyword2, keyword3"
                      className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500 text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    <PopupComponent />
    </>
  )
}