'use client';
import { useState, useRef } from 'react';
import useMount from 'react-use/esm/useMount';
import ThemeToggle from './ThemeToggle';
import {
  FaInstagram as InstaIcon,
  FaGithub as GithubIcon,
  FaWhatsapp as WhatsappIcon,
  FaLinkedin as LinkedinIcon,
  FaDiscord as DiscordIcon,
} from 'react-icons/fa6';
import { HiOutlineEnvelope as EmailIcon } from 'react-icons/hi2';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:iagobruno.dev@gmail.com',
    Icon: EmailIcon,
    dataPointto: 'mail',
    className: 'size-8 md:size-10',
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/558897174708?text=Ol%C3%A1!%20Vim%20do%20seu%20site%20para%20tirar%20algumas%20d%C3%BAvidas%20sobre%20os%20seus%20servi%C3%A7os.',
    Icon: WhatsappIcon,
    className: 'size-7 md:size-9',
  },
  {
    name: 'Discord',
    href: 'https://discordapp.com/users/724201631348162592',
    Icon: DiscordIcon,
    dataPointto: 'user',
    className: 'size-7 md:size-9',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/iagobruno',
    Icon: GithubIcon,
    dataPointto: 'name',
    className: 'size-7 md:size-9',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/iagobruno-dev',
    Icon: LinkedinIcon,
    className: 'size-7 md:size-9',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/iagobruno.dev',
    Icon: InstaIcon,
    dataPointto: 'user',
    className: 'size-7 md:size-9',
  },
];

export default function Footer() {
  const [height, setHeight] = useState('0px');
  const footerRef = useRef<HTMLElement>(null);

  useMount(() => {
    setHeight(footerRef.current!.getBoundingClientRect().height + 'px');
  });

  useMount(() => {
    const icons = document.querySelectorAll<HTMLElement>('[data-pointto]');
    const contact = document.querySelector<HTMLElement>('footer .contact')!;
    const lines = [] as any[];

    for (const icon of Array.from(icons)) {
      const pointToElement = contact.querySelector('#' + icon.dataset.pointto);

      // @ts-ignore
      // const line = new LeaderLine(
      //   icon,
      //   pointToElement,
      //   {
      //     color: 'var(--color-primary)',
      //     size: 4,
      //     path: 'arc',
      //     startSocket: 'top',
      //     endPlug: 'arrow2',
      //     hide: true,
      //     showEffectName: 'none',
      //     animOptions: {
      //       duration: 0,
      //     },
      //   }
      // )
      // lines.push(line)

      icon.addEventListener('mouseover', () => {
        // line.show('draw', { duration: 400 })
        pointToElement?.classList.add('!text-primary');
        pointToElement
          ?.querySelectorAll('.group')
          .forEach((el) => el.classList.remove('text-neutral-500'));
      });
      icon.addEventListener('mouseout', () => {
        // line.hide('draw', { duration: 400 })
        pointToElement?.classList.remove('!text-primary');
        pointToElement
          ?.querySelectorAll('.group')
          .forEach((el) => el.classList.add('text-neutral-500'));
      });
    }
  });

  function handleLinkClick(name: string) {
    posthog.capture(`${name}_link_click`, {
      location: 'footer',
    });
  }

  return (
    <>
      <footer
        className="fixed z-0 left-0 bottom-0 w-full pt-28 pb-18 px-safe-offset-6 text-center bg-neutral-200/50 dark:bg-neutral-900/80 overflow-hidden"
        ref={footerRef}
      >
        <div className="max-w-(--max-content-width) mx-auto">
          <div className="text-4xl md:text-5xl font-semibold mb-10">
            Contato
          </div>

          <div className="contact text-[1.6rem] md:text-4xl text-neutral-400 tracking-wide mt-17.5 mb-16 [&_span]:transition-colors [&_span]:duration-300">
            <WithBracket
              label="E-mail"
              side="bottom"
              id="mail"
            >
              <WithBracket
                label="Username"
                lineClassName="-translate-y-5"
                id="user"
              >
                <WithBracket
                  label="Nome"
                  id="name"
                >
                  iagobruno
                </WithBracket>
                .dev
              </WithBracket>
              @gmail.com
            </WithBracket>
          </div>

          <div className="icons text-lg flex gap-y-1 gap-x-6 md:gap-x-11 justify-center items-center flex-wrap mx-auto mb-14 *:opacity-90 *:text-inherit *:hover:text-primary *:transition-all *:hover:scale-115 *:hover:rotate-15 *:duration-200">
            {socialLinks.map((link, idx) => {
              const Icon = link.Icon;
              return (
                <a
                  key={link.href + idx}
                  href={link.href}
                  data-pointto={link.dataPointto}
                  onClick={() => handleLinkClick(link.name.toLowerCase())}
                >
                  <Icon className={link.className} />
                </a>
              );
            })}
          </div>

          <ThemeToggle />

          <div className="mt-7 mx-auto w-fit flex items-center gap-x-2 gap-y-3 not-sm:flex-col text-stone-600 dark:text-stone-400 text-xs opacity-80">
            <a
              href="https://github.com/iagobruno/iagobruno.dev"
              className="inline-flex items-center gap-1 relative z-10"
              onClick={() => handleLinkClick('repo')}
            >
              <svg
                viewBox="0 0 20 15"
                width="18"
                height="13"
              >
                <path
                  d="M13.197.39l-2.084 2.083 4.862 4.862-4.862 4.862 2.084 2.084 6.251-6.946-6.25-6.946zm-6.946 0L0 7.334l6.251 6.946 2.084-2.084-4.862-4.862 4.862-4.862L6.251.389z"
                  fillRule="nonzero"
                  fill="#444444"
                ></path>
              </svg>
              <span>com</span>
              <svg
                viewBox="0 0 18 16"
                width="14"
                height="13"
              >
                <path
                  d="M15.948 1.39C15.226.513 14.21.07 12.892 0c-1.348 0-2.348.583-3.056 1.39-.709.805-1.084 1.277-1.112 1.388-.028-.11-.389-.583-1.111-1.389C6.89.583 5.988 0 4.557 0 3.237.07 2.209.528 1.5 1.39.778 2.236.417 3.166.389 4.167c0 .722.125 2.111.93 3.709.807 1.597 3.252 4.084 7.405 7.404 4.14-3.32 6.627-5.793 7.418-7.404.792-1.612.917-3.015.917-3.71-.028-1-.389-1.93-1.111-2.806v.028z"
                  fillRule="nonzero"
                  fill="#EF5350"
                ></path>
              </svg>
              <span>por mim mesmo</span>
            </a>
            <span className="not-sm:hidden">•</span>
            <a
              href="https://github.com/iagobruno/iagobruno.dev/releases"
              onClick={() => handleLinkClick('changelog')}
            >
              Changelog
            </a>
          </div>
        </div>
      </footer>

      <div
        id="contact"
        className="relative z-0! block w-full pointer-events-none"
        style={{ height }}
      >
        <div className="blur-3xl bg-cyan-600 dark:bg-cyan-500/70 w-[60%] min-w-[200px] aspect-4/3 rounded-full absolute bottom-[100%] left-[35%] -translate-x-2/4" />
        <div className="blur-3xl bg-fuchsia-500 dark:bg-fuchsia-500/70 w-[60%] min-w-[200px] aspect-4/3 rounded-full absolute bottom-[100%] left-[63%] -translate-x-2/4" />
      </div>
    </>
  );
}

function WithBracket({
  label,
  children,
  side = 'top',
  lineClassName = '',
  id = '',
}) {
  return (
    <span
      id={id}
      className={cn('relative group text-neutral-500')}
    >
      <span
        className={cn(
          'absolute text-current/80 border-t border-current left-0 right-0 opacity-70 pointer-events-none',
          {
            '-top-3': side === 'top',
            '-bottom-3': side === 'bottom',
          },
          lineClassName
        )}
      >
        <span
          className={cn(
            'text-[0.6rem] absolute left-2/4 -translate-x-2/4 bottom-0',
            side === 'top' ? 'bottom-full mb-0.5' : 'top-full mt-0.5'
          )}
        >
          {label}
        </span>
        <span
          className={cn(
            'absolute border-l border-[inherit] h-[6px] left-0',
            side === 'top' ? 'top-0' : 'bottom-0'
          )}
        />
        <span
          className={cn(
            'absolute border-l border-[inherit] h-[6px] right-0',
            side === 'top' ? 'top-0' : 'bottom-0'
          )}
        />
      </span>
      {children}
    </span>
  );
}
