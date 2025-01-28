import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Prof. Djamila Aouada',
  description: "Prof. Djamila Aouada's personal website.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="container flex-grow mx-auto pb-16 pt-16 px-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
