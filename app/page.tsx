import Image from 'next/image'
import Header from './components/Header'
import About from './components/About'
import Footer from './components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Iago Bruno | Full-Stack Developer',
  icons: {
    icon: 'https://github.com/iagobruno.png',
  },
}

export default function Home() {
  return (
    <>
      <Header />
      <About />
      <Footer />
    </>
  )
}
