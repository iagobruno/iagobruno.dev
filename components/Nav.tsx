'use client';
import { useState, useRef } from 'react'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { CSSTransition } from 'react-transition-group'
import { cn } from '@/lib/utils'

type Links = Array<[title: string, url: string]>

const links: Links = [
  ['Sobre mim', '/#about'],
  ['Projetos', '/#projects'],
  ['Serviços', '/#services'],
  ['Uses', '/uses'],
  ['Contato', '/#contact'],
]

export function HeroNav() {
  return (
    <div className="w-full flex items-center justify-center md:justify-between">
      <Link href="/">
        <img src="/IagoBruno.png" className="h-[44px] inline" alt="Iago Bruno" />
      </Link>

      <nav className="bg-white/75 dark:bg-neutral-950/75 backdrop-blur-xl rounded-full py-1.5 pl-4 pr-1.5 gap-3 items-center hidden md:inline-flex">
        {links.map(link => (
          <Link
            href={link[1]}
            className={cn({
              'bg-primary text-white! rounded-full py-1 px-3 no-underline!': link[0] === 'Contato'
            })}
            key={link[0]}
          >
            {link[0]}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export function MobileNav() {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const navRef = useRef<HTMLDivElement|null>(null)

  function close() {
    setShowMobileNav(false)
  }

  return (
    <div className="z-[unset]!">
      <div
        onClick={() => setShowMobileNav(!showMobileNav)}
        className='md:hidden fixed! z-50 top-2 right-3.5 px-3 py-5 cursor-pointer'
      >
        <div className={cn('hamburger-icon', { 'close-icon': showMobileNav })} />
      </div>


      <CSSTransition
        nodeRef={navRef}
        in={showMobileNav}
        timeout={300}
        classNames={{
          enter: 'visible opacity-0',
          enterActive: 'opacity-100 transition-opacity duration-300',
          enterDone: 'visible opacity-100',
          exitActive: 'opacity-0 transition-opacity duration-300',
          exitDone: 'invisible opacity-0',
        }}
        onEntering={() => navRef.current?.classList.remove('invisible')}
      >
        <nav
          ref={navRef}
          className="invisible fixed z-40 inset-0 flex flex-col items-start gap-12 justify-center p-8 overscroll-contain bg-[linear-gradient(to_right,_var(--nav-bg,white)_20%,_transparent_300%)] dark:[--nav-bg:black]"
          onClick={close}
        >
          <div className={cn('flex flex-col gap-5 text-2xl w-fit *:text-inherit! *:duration-300 *:ease-in-out', {
            '*:-translate-x-[110%]!': !showMobileNav,
            '*:translate-x-0': showMobileNav,
          })}>
            <Link href="/#">Início</Link>
            {links.map((link, index) => (
              <Link
                href={link[1]}
                style={{ 'transitionDelay': (60*index)+'ms' }}
                key={link[0]}
              >
                {link[0]}
              </Link>
            ))}
          </div>

          <ThemeToggle onClick={(e => e.stopPropagation())} />
        </nav>
      </CSSTransition>
    </div>
  )
}
