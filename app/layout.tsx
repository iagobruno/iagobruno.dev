import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
        <div className="blurred-background" />
        {children}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Iago Bruno | Full-Stack Developer',
  description: "Iago's portfolio",
  metadataBase: new URL('https://iagobruno.is-a.dev'),
  openGraph: {
    type: "website",
    url: "https://iagobruno.is-a.dev",
    title: "Iago Bruno | Full-Stack Developer",
    description: "Iago's portfolio",
    images: [{
      url: "https://iagobruno.is-a.dev/screenshot.png",
    }],
  }
}
