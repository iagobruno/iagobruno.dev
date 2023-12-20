import Image from 'next/image'
import Header from '@/components/Header'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export default function Home() {
  return (
    <>
      <Header compact={false} />
      <About />
      <Services />
      <div className="bg-white dark:bg-neutral-950 after:block after:h-[2px] after:w-[94%] after:mx-auto after:blur-[1px] after:[background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,rgba(14,165,233,1)_32.29%,rgba(236,72,153,1)_67.19%,rgba(236,72,153,0)_100%)]" />
      <Projects />
      <Footer />
    </>
  )
}
