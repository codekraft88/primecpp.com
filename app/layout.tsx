import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ToastProvider } from '@/components/toast-provider'
import { RoleSwitcher } from '@/components/role-switcher'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'prime CPP GmbH – Content | Production | Publishing',
  description: 'prime CPP entwickelt digitale Inhalte, Websites, Kommunikationslösungen und Marketingstrukturen für Unternehmen, die sich professionell präsentieren und nachhaltig wachsen wollen.',
  keywords: ['Webdesign', 'SEO', 'Content Marketing', 'Web Development', 'Schweiz', 'Hergiswil'],
  authors: [{ name: 'prime CPP GmbH' }],
  creator: 'prime CPP GmbH',
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    siteName: 'prime CPP GmbH',
    title: 'prime CPP GmbH – Content | Production | Publishing',
    description: 'Digitale Inhalte, Websites und Marketingstrukturen für professionelles Wachstum.',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2380ee',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className="bg-background" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased scroll-smooth`}>
        <ToastProvider>
          {children}
          <RoleSwitcher />
        </ToastProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
