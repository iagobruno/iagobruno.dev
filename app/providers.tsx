'use client'
import { ThemeProvider } from 'next-themes'
import { useEffect, type PropsWithChildren } from 'react'
import Lenis from 'lenis'

export function Providers({ children }: PropsWithChildren) {

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })
    return () => {
      lenis.destroy()
    }
  }, []);

  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}
