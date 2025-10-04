'use client'
import { ThemeProvider } from 'next-themes'
import { useEffect, type PropsWithChildren } from 'react'
import useMount from 'react-use/esm/useMount'
import Lenis from 'lenis'

export function Providers({ children }: PropsWithChildren) {

  useMount(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })
    return () => {
      lenis.destroy()
    }
  });

  return (
    <ThemeProvider attribute="class">
      {children}
    </ThemeProvider>
  )
}
