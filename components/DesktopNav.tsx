'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Portal from './Portal';
import { HiMiniHome as HomeIcon } from 'react-icons/hi2';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';
import { links } from './MobileNav';

export function DesktopNav() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setSticky(window.scrollY > 200);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center md:justify-between">
      <Link
        href="/"
        className="shrink-0 brightness-106!"
      >
        <img
          src="/logo.png"
          className="h-[1.25rem] inline-block transition-transform active:scale-94"
          fetchPriority="high"
          alt="Iago Bruno"
        />
      </Link>

      <NavLinksTemplate links={links} />
      <Portal>
        <NavLinksTemplate
          links={links.filter((link) => link[0] !== 'Sobre')}
          className={cn(
            'fixed top-3 left-2/4 -translate-x-2/4 z-50! p-2 pl-6 gap-3.5 shadow-xl dark:shadow-white/5 ring ring-black/6 dark:ring-white/7 transition-transform origin-top not-hover:scale-92',
            sticky
              ? 'translate-y-0 ease-out duration-600'
              : '-translate-y-60 ease-linear duration-400',
          )}
          beforeLinks={
            <Link
              href="/"
              className="shrink-0 brightness-106! mr-1"
            >
              <HomeIcon className="size-[1.2em] scale-x-105 text-neutral-800/85 dark:text-white/90" />
            </Link>
          }
        />
      </Portal>
    </div>
  );
}

interface NavLinksTemplateProps {
  links: typeof links;
  className?: string;
  beforeLinks?: React.ReactNode;
  afterLinks?: React.ReactNode;
}

const NavLinksTemplate = ({
  links,
  className = '',
  beforeLinks,
  afterLinks,
}: NavLinksTemplateProps) => (
  <nav
    className={cn(
      'bg-white/75 dark:bg-neutral-950/75 backdrop-blur-xl rounded-full py-1.5 pl-4.5 pr-1.5 gap-3 items-center hidden md:inline-flex',
      className,
    )}
  >
    {beforeLinks}
    {links.map((link) => (
      <CustomNavLink
        href={link[1]}
        className={cn('text-[1.1rem] active:scale-94 transition-transform', {
          'bg-primary text-white! rounded-full py-1 px-3 no-underline!': link[0] === 'Contato',
        })}
        key={link[0]}
      >
        {link[0]}
      </CustomNavLink>
    ))}
    {afterLinks}
  </nav>
);

const CustomNavLink = ({ href, children, ...props }) => {
  const isHashtagLink = href?.startsWith('/#');
  const onHome = typeof window !== 'undefined' && window.location.pathname === '/';
  const Component = isHashtagLink && onHome ? 'a' : Link;
  return (
    <Component
      href={href}
      {...props}
    >
      {children}
    </Component>
  );
};
