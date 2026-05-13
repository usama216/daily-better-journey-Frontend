/** Server-safe JSON-LD for Google Rich Results / structured data. */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  )
}
