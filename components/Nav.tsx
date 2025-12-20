'use client';
import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { CSSTransition } from 'react-transition-group';
import { cn } from '@/lib/utils';
import {
  FaInstagram as InstaIcon,
  FaGithub as GithubIcon,
  FaWhatsapp as WhatsappIcon,
  FaLinkedin as LinkedinIcon,
  FaDiscord as DiscordIcon,
} from 'react-icons/fa6';
import { HiOutlineEnvelope as EmailIcon } from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import posthog from 'posthog-js';

type Links = Array<[title: string, url: string]>;
type SocialLinks = Array<[title: string, icon: IconType, url: string]>;

const links: Links = [
  ['Sobre', '/#about'],
  ['Projetos', '/#projects'],
  ['Serviços', '/#services'],
  ['Experimentos', '/labs'],
  ['Agora', '/now'],
  ['Uses', '/uses'],
  ['Contato', '/#contact'],
];

const socialLinks: SocialLinks = [
  ['email', EmailIcon, 'mailto:iagobruno.dev@gmail.com'],
  ['linkedin', LinkedinIcon, 'https://linkedin.com/in/iagobruno-dev'],
  ['discord', DiscordIcon, 'https://discordapp.com/users/724201631348162592'],
  ['github', GithubIcon, 'https://github.com/iagobruno'],
  ['instagram', InstaIcon, 'https://instagram.com/iagobruno.dev'],
];

export function HeroNav() {
  return (
    <div className="w-full flex items-center justify-center md:justify-between">
      <Link href="/" className="shrink-0">
        <img
          src="/IagoBruno.png"
          className="h-[44px] translate-y-1 inline transition-transform active:scale-94"
          alt="Iago Bruno"
        />
      </Link>

      <nav className="bg-white/75 dark:bg-neutral-950/75 backdrop-blur-xl rounded-full py-1.5 pl-4.5 pr-1.5 gap-3 items-center hidden md:inline-flex">
        {links.map((link) => (
          <Link
            href={link[1]}
            className={cn(
              'text-[1.1rem] active:scale-94 transition-transform',
              {
                'bg-primary text-white! rounded-full py-1 px-3 no-underline!':
                  link[0] === 'Contato',
              }
            )}
            key={link[0]}
          >
            {link[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function MobileNav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);

  const showInstallButton = useMemo(() => {
    if (typeof window === 'undefined') return false; // server-side
    return !window.AddToHomeScreenInstance?.isStandAlone(); // mostrar somente se não estiver instalado
  }, []);

  function close() {
    setShowMobileNav(false);
  }

  function install() {
    window.AddToHomeScreenInstance.show('pt');
  }

  function handleIconClick(name: string) {
    posthog.capture(`${name}_link_click`, {
      location: 'mobile_nav',
    });
  }

  return (
    <div className="z-[unset]!">
      <div
        onClick={() => setShowMobileNav(!showMobileNav)}
        className="md:hidden fixed! z-50 top-safe-or-2 right-3.5 px-3 py-5 cursor-pointer"
      >
        <div
          className={cn('hamburger-icon', { 'close-icon': showMobileNav })}
        />
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
          className="invisible fixed z-40 inset-0 flex flex-col items-start gap-11 justify-center p-8 overscroll-contain bg-[linear-gradient(to_right,_var(--nav-bg,white)_20%,_transparent_300%)] dark:[--nav-bg:black]"
          onClick={close}
        >
          <div
            className={cn(
              'flex flex-col gap-4.5 text-[1.38rem] w-fit *:text-inherit! *:duration-300 *:ease-in-out',
              {
                '*:-translate-x-[120%]!': !showMobileNav,
                '*:translate-x-0': showMobileNav,
              }
            )}
          >
            <Link href="/#">Início</Link>
            {links.map((link, index) => (
              <Link
                href={link[1]}
                style={{ transitionDelay: 60 * index + 'ms' }}
                key={link[0]}
              >
                {link[0]}
              </Link>
            ))}
          </div>

          <div
            className={cn(
              'flex items-center gap-5 *:transition-opacity',
              showMobileNav
                ? '*:opacity-100 *:duration-400'
                : '*:opacity-0 *:duration-0'
            )}
          >
            {socialLinks.map(([name, Icon, url], index) => (
              <a
                key={url}
                href={url}
                target="_blank"
                className="text-inherit cursor-pointer"
                style={{
                  transitionDelay: showMobileNav
                    ? 400 + 60 * index + 'ms'
                    : '0ms',
                }}
                onClick={() => handleIconClick(name)}
              >
                <Icon className="!size-7" />
              </a>
            ))}
          </div>

          <div
            className={cn(
              'transition-opacity',
              showMobileNav
                ? 'opacity-100 duration-400 delay-650'
                : 'opacity-0 duration-0'
            )}
          >
            <ThemeToggle onClick={(e) => e.stopPropagation()} />
          </div>

          {/* {showInstallButton && (
            <div onClick={install} className={cn('cursor-pointer flex items-center gap-2.5 uppercase text-lg font-medium transition-opacity',
              showMobileNav ? 'opacity-100 duration-400 delay-600' : 'opacity-0'
            )}>
              <InstallIcon className="size-[1.1em]" />
              Instalar
            </div>
          )} */}
        </nav>
      </CSSTransition>
    </div>
  );
}
