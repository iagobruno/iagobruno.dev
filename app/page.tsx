import Image from 'next/image'
import Header from './components/Header'
import About from './components/About'
import Footer from './components/Footer'
import type { Metadata } from 'next'

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Footer />
    </>
  )
}

export const metadata: Metadata = {
  title: 'Iago Bruno | Full-Stack Developer',
  description: "Iago's portfolio",
  icons: {
    icon: 'https://github.com/iagobruno.png',
  },
  metadataBase: new URL('https://iagobruno.is-a.dev'),
  openGraph: {
    type: "website",
    url: "https://iagobruno.is-a.dev",
    title: "Iago Bruno | Full-Stack Developer",
    description: "Iago's portfolio",
    images: [{
      url: "https://iagobruno.is-a.dev/printscreen.png",
    }],
  }
}
