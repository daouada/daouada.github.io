'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const getLinkClass = (href: string) => {
    const isActive = pathname === href
    return `text-gray-700 pt-[20px] pb-[17px] border-b-[3px] px-[4px] ${
      isActive ? 'border-gray-700' : 'border-white hover:border-gray-700 hover:text-gray-900'
    }`
  }

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-extrabold text-gray-800">
              Prof. Djamila Aouada
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8">
            <Link href="/" className={getLinkClass('/')}>
              Home
            </Link>
            <Link href="/research" className={getLinkClass('/research')}>
              Research
            </Link>
            <Link href="/teaching" className={getLinkClass('/teaching')}>
              Teaching
            </Link>
            <Link href="/publications" className={getLinkClass('/publications')}>
              Publications
            </Link>
            <Link href="/team" className={getLinkClass('/team')}>
              Team
            </Link>
            <Link href="/contact" className={getLinkClass('/contact')}>
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="block lg:hidden focus:outline-none h-[64px]" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-[65px] bottom-0 left-0 right-0 z-30 bg-white shadow-md">
          <div className="container m-auto flex flex-col px-4 pt-10 pb-3 space-y-8">
            <Link
              href="/"
              className={
                pathname === '/'
                  ? 'text-gray-900 border-b-[3px] border-gray-700'
                  : 'text-gray-700 border-b hover:text-gray-900 hover:border-gray-900'
              }
            >
              Home
            </Link>
            <Link
              href="/research"
              className={
                pathname === '/research'
                  ? 'text-gray-900 border-b-[3px] border-gray-700'
                  : 'text-gray-700 border-b hover:text-gray-900 hover:border-gray-900'
              }
            >
              Research
            </Link>
            <Link
              href="/teaching"
              className={
                pathname === '/teaching'
                  ? 'text-gray-900 border-b-[3px] border-gray-700'
                  : 'text-gray-700 border-b hover:text-gray-900 hover:border-gray-900'
              }
            >
              Teaching
            </Link>
            <Link
              href="/publications"
              className={
                pathname === '/publications'
                  ? 'text-gray-900 border-b-[3px] border-gray-700'
                  : 'text-gray-700 border-b hover:text-gray-900 hover:border-gray-900'
              }
            >
              Publications
            </Link>
            <Link
              href="/team"
              className={
                pathname === '/team'
                  ? 'text-gray-900 border-b-[3px] border-gray-700'
                  : 'text-gray-700 border-b hover:text-gray-900 hover:border-gray-900'
              }
            >
              Team
            </Link>
            <Link
              href="/contact"
              className={
                pathname === '/contact'
                  ? 'text-gray-900 border-b-[3px] border-gray-700'
                  : 'text-gray-700 border-b hover:text-gray-900 hover:border-gray-900'
              }
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
