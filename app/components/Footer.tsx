"use client";
import { useState, useRef } from 'react'
import useMount from 'react-use/esm/useMount'
import DarkToggle from './DarkToggle'

export default function Footer () {
  const [height, setHeight] = useState('0px')
  const footerRef = useRef<HTMLElement>(null)

  useMount(() => {
    setHeight(footerRef.current!.getBoundingClientRect().height+'px')
  })

  return (
    <>
      <footer className="fixed left-0 bottom-0 w-full pt-28 pb-16 px-6 text-center bg-neutral-200/50 dark:bg-neutral-900/80 overflow-hidden" ref={footerRef}>
        <div className="max-w-[--max-content-width] mx-auto">
          <div className="text-4xl font-semibold mb-5">Contato</div>
          <div className="text-lg flex gap-x-5 gap-y-1 justify-center items-center flex-wrap mx-auto">
            <a href="mailto:iagobruno.dev@gmail.com">Email</a>
            <a href="https://wa.me/558897174798">WhatsApp</a>
            <a href="https://github.com/iagobruno">GitHub</a>
            <a href="https://instagram.com/iagotico">Instagram</a>
            <a href="https://www.linkedin.com/in/iagobruno">LinkedIn</a>
          </div>

          <DarkToggle />

          <a href="https://github.com/iagobruno/iagobruno.github.io" className="w-fit flex items-center mx-auto mt-6 gap-1 text-stone-600 dark:text-stone-400 text-sm opacity-80 relative z-10">
            <svg viewBox="0 0 20 15" width="18" height="13"><path d="M13.197.39l-2.084 2.083 4.862 4.862-4.862 4.862 2.084 2.084 6.251-6.946-6.25-6.946zm-6.946 0L0 7.334l6.251 6.946 2.084-2.084-4.862-4.862 4.862-4.862L6.251.389z" fillRule="nonzero" fill="#444444"></path></svg>
            <span>com</span>
            <svg viewBox="0 0 18 16" width="14" height="13"><path d="M15.948 1.39C15.226.513 14.21.07 12.892 0c-1.348 0-2.348.583-3.056 1.39-.709.805-1.084 1.277-1.112 1.388-.028-.11-.389-.583-1.111-1.389C6.89.583 5.988 0 4.557 0 3.237.07 2.209.528 1.5 1.39.778 2.236.417 3.166.389 4.167c0 .722.125 2.111.93 3.709.807 1.597 3.252 4.084 7.405 7.404 4.14-3.32 6.627-5.793 7.418-7.404.792-1.612.917-3.015.917-3.71-.028-1-.389-1.93-1.111-2.806v.028z" fillRule="nonzero" fill="#EF5350"></path></svg>
            <span>por mim mesmo</span>
          </a>
        </div>
      </footer>

      <div id="contact" className="relative block w-full pointer-events-none" style={{ height }}>
        <div className="blur-3xl bg-cyan-600 dark:bg-cyan-500/70 w-[60%] min-w-[200px] aspect-[4/3] rounded-full absolute bottom-[100%] left-[35%] -translate-x-2/4" />
        <div className="blur-3xl bg-fuchsia-500 dark:bg-fuchsia-500/70 w-[60%] min-w-[200px] aspect-[4/3] rounded-full absolute bottom-[100%] left-[63%] -translate-x-2/4" />
      </div>
    </>
  )
}
