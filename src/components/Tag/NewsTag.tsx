export default function NewsTag({ t }: { t: string }) {
  const colors: Record<string, string> = {
    Appointment: 'bg-blue-100 text-blue-800',
    Award: 'bg-yellow-100 text-yellow-800',
    Event: 'bg-green-100 text-green-800',
    Project: 'bg-purple-100 text-purple-800',
  }

  const colorClass = colors[t] || 'bg-gray-100 text-gray-800'

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold ${colorClass}`}>{t}</span>
  )
}
