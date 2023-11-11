import Image from 'next/image'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
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
      <Footer />
    </>
  )
}
