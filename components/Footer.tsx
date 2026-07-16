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
import copy from 'copy-to-clipboard';
import { cn, selectElementText, showFloatTooltip, sleep } from '@/lib/utils';
import gsap from 'gsap';
import posthog from 'posthog-js';
import Button from './Button';
import { whatsappLink } from './WhatsappButton';
import GridPattern from './GridPattern';

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:contato@iagobruno.dev',
    Icon: EmailIcon,
    dataPointto: 'mail',
    className: 'size-[1.08em]',
  },
  {
    name: 'WhatsApp',
    href: whatsappLink,
    Icon: WhatsappIcon,
    className: 'size-[1em]',
  },
  // {
  //   name: 'Discord',
  //   href: 'https://discordapp.com/users/724201631348162592',
  //   Icon: DiscordIcon,
  //   dataPointto: 'user',
  //   className: 'size-[1em]',
  // },
  {
    name: 'GitHub',
    href: 'https://github.com/iagobruno',
    Icon: GithubIcon,
    dataPointto: 'name',
    className: 'size-[1em]',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/iagobruno',
    Icon: LinkedinIcon,
    dataPointto: 'name',
    className: 'size-[1em]',
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/iagobruno.dev',
    Icon: InstaIcon,
    dataPointto: 'user',
    className: 'size-[1em]',
  },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useMount(async () => {
    await sleep(200);

    const footerHeight = footerRef.current!.getBoundingClientRect().height + 'px';
    document.querySelector<HTMLElement>('#contact')!.style.height = footerHeight;

    // Efeito scale com scroll
    gsap.fromTo(
      '.footer-content',
      { scale: 0.65, y: 50 },
      {
        scale: 1,
        y: 0,
        // ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '#contact',
          start: `top bottom`,
          end: 'bottom bottom',
          scrub: true,
        },
      },
    );
  });

  function handleLinkClick(name: string) {
    posthog.capture(`${name}_link_clicked`, {
      location: 'footer',
    });
  }

  function handleCTAClick() {
    posthog.capture('whatsapp_button_clicked', { location: 'footer_cta' });
  }

  function handleCopyMail() {
    const mailTextElem = document.querySelector('footer .contact.mail')!;
    copy('contato@iagobruno.dev');
    showFloatTooltip(mailTextElem, 'Copiado ✓');
    selectElementText(mailTextElem);
  }

  return (
    <>
      <footer
        className="fixed z-0 left-0 bottom-0 w-full pt-20 pb-6 md:pb-10 px-safe-offset-6 text-center bg-neutral-200/50 dark:bg-neutral-900/80 overflow-hidden in-[:active-view-transition]:not-in-[.theme-animation]:relative"
        ref={footerRef}
      >
        <div className="footer-content max-w-(--max-content-width) mx-auto origin-bottom relative z-1">
          <header className="mb-8 lg:max-w-[700px] mx-auto">
            <div className="text-primary text-base font-medium uppercase text-center tracking-widest mb-2">
              Contato
            </div>
            <h3 className="text-4xl md:text-5xl/14 font-semibold mb-4">
              Vamos conversar sobre o<br className="not-md:hidden" />
              seu projeto
            </h3>
            <p className="sm:text-lg opacity-85">
              Solicite um orçamento sem compromisso ou tire suas dúvidas.
            </p>
          </header>

          <div className="mb-10 w-full">
            <Button
              href={whatsappLink}
              target="_blank"
              className="text-nowrap"
              onClick={handleCTAClick}
            >
              <WhatsappIcon className="size-[1.4em] mb-0.5" />
              Fazer orçamento
            </Button>
          </div>

          <img
            src="/logo.png"
            className="h-[0.96rem] mt-4 mb-6 inline transition-transform active:scale-94 dark:invert"
            alt="Iago Bruno"
          />

          <div
            className={cn(
              'icons text-[1.52rem] flex gap-y-1 gap-x-[0.9em] justify-center items-center flex-wrap mx-auto mb-6',
              '*:opacity-90 *:text-inherit *:hover:text-primary *:transition-all *:hover:scale-118 *:hover:rotate-15 *:duration-200',
            )}
          >
            {socialLinks.map((link, idx) => {
              const Icon = link.Icon;
              return (
                <a
                  key={link.href + idx}
                  href={link.href}
                  target="_blank"
                  data-pointto={link.dataPointto}
                  onClick={() => handleLinkClick(link.name.toLowerCase())}
                >
                  <Icon className={link.className} />
                </a>
              );
            })}
          </div>

          <div className="mx-auto w-fit flex items-center gap-2 not-sm:flex-col text-stone-600 dark:text-stone-400 text-[0.68rem] opacity-80">
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
                  className="fill-[#444444] dark:fill-[#777]"
                ></path>
              </svg>
              <span>com</span>
              <svg
                viewBox="0 0 18 16"
                width="14"
                height="13"
                className="translate-y-[0.5px]"
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

          <div className="mt-6 scale-90">
            <ThemeToggle />
          </div>
        </div>

        <GridPattern
          strokeDasharray="4 5"
          className="mask-radial-at-top mask-radial-from-0% mask-radial-to-80%"
        />
        <div className="aspect-20/10 w-[25%] z-0 absolute top-full left-2/4 rounded-full blur-3xl bg-white/7 -translate-2/4 pointer-events-none"></div>
      </footer>

      <div className="after:block after:h-[1px] after:w-[94%] after:mx-auto after:blur-[1px] after:[background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,rgba(14,165,233,1)_32.29%,rgba(236,72,153,1)_67.19%,rgba(236,72,153,0)_100%)]  brightness-90 dark:brightness-175 saturate-150" />

      <div
        id="contact"
        className="relative z-0! block w-full pointer-events-none"
      >
        <div className="blur-3xl bg-cyan-600 dark:bg-cyan-500/70 w-[60%] min-w-[200px] aspect-4/3 rounded-full absolute bottom-[100%] left-[35%] -translate-x-2/4" />
        <div className="blur-3xl bg-fuchsia-500 dark:bg-fuchsia-500/70 w-[60%] min-w-[200px] aspect-4/3 rounded-full absolute bottom-[100%] left-[63%] -translate-x-2/4" />
      </div>
    </>
  );
}
