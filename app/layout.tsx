import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ProgressBar from 'nextjs-toploader'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="/client.js" />
      </head>
      <body className={inter.className}>
        <div className="blurred-background !bg-bottom absolute z-[4] min-h-[100svh] w-full top-0 left-0" />

        {children}
        <ProgressBar />
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
