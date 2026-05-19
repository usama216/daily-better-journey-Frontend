export interface PostAuthorBylineProps {
  name?: string | null
  bio?: string | null
  imageUrl?: string | null
  /** compact = one line under title; full = card with heading */
  variant?: 'compact' | 'full'
  className?: string
}

export function getPostAuthorFields(post: {
  byline_author_name?: string | null
  byline_author_bio?: string | null
  byline_author_image_url?: string | null
}) {
  return {
    name: (post.byline_author_name || '').trim(),
    bio: (post.byline_author_bio || '').trim(),
    imageUrl: (post.byline_author_image_url || '').trim(),
  }
}

export function hasPostAuthor(post: {
  byline_author_name?: string | null
  byline_author_bio?: string | null
  byline_author_image_url?: string | null
}) {
  const { name, bio, imageUrl } = getPostAuthorFields(post)
  return Boolean(name || bio || imageUrl)
}

export default function PostAuthorByline({
  name = '',
  bio = '',
  imageUrl = '',
  variant = 'full',
  className = '',
}: PostAuthorBylineProps) {
  const displayName = (name || '').trim()
  const displayBio = (bio || '').trim()
  const displayImage = (imageUrl || '').trim()

  if (!displayName && !displayBio && !displayImage) {
    return null
  }

  if (variant === 'compact') {
    if (!displayName) return null
    return (
      <p className={`text-sm md:text-base text-charcoal-600 ${className}`}>
        Written by <span className="font-semibold text-charcoal-800">{displayName}</span>
      </p>
    )
  }

  const avatar =
    displayImage ? (
      <img
        src={displayImage}
        alt={displayName ? `${displayName}, author` : 'Author'}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0"
        width={80}
        height={80}
      />
    ) : displayName ? (
      <AuthorAvatarInitial initial={displayName.charAt(0).toUpperCase()} />
    ) : null

  return (
    <aside
      className={`flex flex-col sm:flex-row gap-4 sm:items-start p-5 md:p-6 rounded-xl border border-forest-200 bg-gradient-to-br from-forest-50/90 to-white ${className}`}
      aria-label="Article author"
    >
      {avatar}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-700 mb-1">About the author</p>
        {displayName ? <p className="font-bold text-charcoal-900 text-lg md:text-xl">{displayName}</p> : null}
        {displayBio ? (
          <p className="text-sm md:text-base text-charcoal-600 mt-2 leading-relaxed">{displayBio}</p>
        ) : null}
      </div>
    </aside>
  )
}

function AuthorAvatarInitial({ initial }: { initial: string }) {
  return (
    <div
      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-forest-600 text-white flex items-center justify-center text-xl sm:text-2xl font-bold flex-shrink-0 shadow-md"
      aria-hidden
    >
      {initial}
    </div>
  )
}
