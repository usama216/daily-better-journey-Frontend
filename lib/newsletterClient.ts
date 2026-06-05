const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'https://api.dailybetterjourney.com/api'

export async function subscribeToNewsletter(email: string) {
  const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data?.message || 'Failed to subscribe. Please try again.')
  }

  return data as { success: boolean; message: string }
}
