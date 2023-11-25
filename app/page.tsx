import Image from 'next/image'
import Header from './components/Header'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Footer from './components/Footer'
import type { Metadata } from 'next'

export default function Home() {
  return (
    <>
      <Header compact={false} />
      <About />
      <Services />
      <Projects />
      <Footer />
    </>
  )
}
