export default function Button({
  children,
  href,
  target = '_self',
  variant = 'solid',
}: {
  children: React.ReactNode
  href: string
  target?: string
  variant?: 'solid' | 'outline'
}) {
  const baseStyles = 'px-6 py-[12px] rounded-lg text-sm font-semibold inline-block'
  const solidStyles = 'bg-blue-600 text-white hover:bg-blue-700'
  const outlineStyles = 'border border-blue-600 text-blue-600 hover:bg-blue-100'

  const styles = variant === 'solid' ? solidStyles : outlineStyles

  return (
    <a href={href} target={target} className={`${baseStyles} ${styles}`}>
      {children}
    </a>
  )
}
