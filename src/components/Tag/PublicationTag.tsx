export default function PublicationTag({ t }: { t: string }) {
  const colors: Record<string, string> = {
    Book: 'bg-yellow-100 text-yellow-800',
    Conference: 'bg-green-100 text-green-800',
    Journal: 'bg-blue-100 text-blue-800',
    Patent: 'bg-purple-100 text-purple-800',
  }

  const colorClass = colors[t] || 'bg-gray-100 text-gray-800'

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${colorClass}`}>{t}</span>
  )
}
