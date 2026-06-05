export function getTextPreview(html: string, maxLength = 140) {
  if (!html) return ''
  const text = html.replace(/<[^>]*>/g, '')
  const decoded = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
  const trimmed = decoded.trim()
  return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed
}
