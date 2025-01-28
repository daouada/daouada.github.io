import Link from 'next/link'
import ArrowRight from '@/components/Svg/ArrowRight'

export default function LinkWithArrow({
  href,
  target = '_self',
  children,
  className,
}: {
  href: string
  target?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <Link
      href={href}
      target={target}
      className={`flex items-center gap-x-2 hover:gap-x-3 text-blue-500 hover:text-blue-700 transition-all duration-300 ${className}`}
    >
      {children}
      <ArrowRight className="size-4" />
    </Link>
  )
}
