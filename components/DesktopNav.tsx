'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Portal from './Portal';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';
import { links } from './MobileNav';

export function DesktopNav() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setSticky(window.scrollY > 180);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center md:justify-between">
      <Link href="/" className="shrink-0">
        <img
          src="/IagoBruno.png"
          className="h-[44px] translate-y-1 inline transition-transform active:scale-94"
          alt="Iago Bruno"
        />
      </Link>

      <NavLinksTemplate />
      <Portal>
        <NavLinksTemplate
          className={cn(
            'fixed top-3 left-2/4 -translate-x-2/4 z-50! p-2 pl-6 gap-3.5 shadow-xl dark:shadow-white/5 ring ring-black/6 dark:ring-white/7 transition-transform duration-600 ease-out origin-top not-hover:scale-92',
            sticky ? 'translate-y-0' : '-translate-y-60'
          )}
        />
      </Portal>
    </div>
  );
}

const NavLinksTemplate = ({ className = '' }) => (
  <nav
    className={cn(
      'bg-white/75 dark:bg-neutral-950/75 backdrop-blur-xl rounded-full py-1.5 pl-4.5 pr-1.5 gap-3 items-center hidden md:inline-flex',
      className
    )}
  >
    {links.map((link) => (
      <CustomNavLink
        href={link[1]}
        className={cn('text-[1.1rem] active:scale-94 transition-transform', {
          'bg-primary text-white! rounded-full py-1 px-3 no-underline!':
            link[0] === 'Contato',
        })}
        key={link[0]}
      >
        {link[0]}
      </CustomNavLink>
    ))}
  </nav>
);

const CustomNavLink = ({ href, children, ...props }) => {
  const isHashtagLink = href?.startsWith('/#');
  const onHome =
    typeof window !== 'undefined' && window.location.pathname === '/';
  const Component = isHashtagLink && onHome ? 'a' : Link;
  return (
    <Component href={href} {...props}>
      {children}
    </Component>
  );
};
