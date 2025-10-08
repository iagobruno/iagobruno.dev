import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Inter, Caveat } from 'next/font/google'
import { MobileNav } from '@/components/Nav'
import TailwindBreakpoints from '@/components/TailwindBreakpoints '
import WhatsappButton from '@/components/WhatsappButton'
import { Providers } from './providers'
import ProgressBar from 'nextjs-toploader'
import './globals.css'

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-inter',
})

const caveatFont = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-caveat',
})

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="pt-BR"
      className={`${interFont.variable} ${caveatFont.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body>
        <Providers>
          <div className="blurred-background bg-bottom! absolute z-4 min-h-svh w-full top-0 left-0" />

          {children}

          <MobileNav />
          <ProgressBar />
        </Providers>

        <WhatsappButton />
        <TailwindBreakpoints />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    template: '%s | Iago Bruno',
    default: 'Iago Bruno | Full-Stack Developer',
  },
  description: "Iago's portfolio",
  metadataBase: new URL('https://iagobruno.is-a.dev'),
}
