import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { Inter } from 'next/font/google'
import { MobileNav } from '@/components/Nav'
import { Providers } from './providers'
import ProgressBar from 'nextjs-toploader'
import './globals.css'

const interFont = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body className={interFont.className}>
        <Providers>
          <div className="blurred-background !bg-bottom absolute z-[4] min-h-[100svh] w-full top-0 left-0" />

          {children}

          <MobileNav />
          <ProgressBar />
        </Providers>
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
