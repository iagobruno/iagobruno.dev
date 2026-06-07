'use client';
import { DesktopNav } from '@/components/DesktopNav';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import useMount from 'react-use/esm/useMount';
import { useRef } from 'react';

interface HeroProps {
  compact?: boolean;
  className?: string;
}

const socialLinks = [
  {
    name: 'WhatsApp',
    href: 'https://wa.me/558897174708?text=Ol%C3%A1!%20Vim%20do%20seu%20site%20para%20tirar%20algumas%20d%C3%BAvidas%20sobre%20os%20seus%20servi%C3%A7os.',
    badge:
      'https://img.shields.io/badge/WhatsApp-25D366?style=flat&logo=whatsapp&logoColor=white',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/iagobruno',
    badge:
      'https://img.shields.io/badge/GitHub-242424?style=flat&logo=github&logoColor=white',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/iagobruno.dev',
    badge:
      'https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white',
  },
  {
    name: 'Discord',
    href: 'https://discordapp.com/users/724201631348162592',
    badge:
      'https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/iagobruno',
    badge:
      'https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=logmein&logoColor=white',
  },
];

export default function Hero({ compact = true, className }: HeroProps) {
  const headerRef = useRef<HTMLElement>(null);

  useMount(async () => {
    headerRef
      .current!.querySelector<HTMLElement>('& > .invisible')
      ?.classList.remove('invisible');

    gsap.context(() => {
      const split = SplitText.create('h2.headline', {
        type: 'words, lines',
        linesClass: 'line',
        wordsClass: 'word',
      });

      const greeting =
        headerRef.current!.querySelector<HTMLElement>('.greeting');
      greeting!.style.removeProperty('width');

      gsap
        .timeline()
        .fromTo(
          greeting,
          { width: 0 },
          {
            width: greeting!.getBoundingClientRect().width + 5,
            duration: 1.3,
            ease: 'power2.inOut',
          }
        )
        .from(
          split.words,
          {
            y: 100,
            opacity: 0,
            duration: 1.3,
            ease: 'power3.inOut',
            stagger: 0.08,
            onComplete: () => split.revert(), // unsplit
          },
          '<'
        )
        .fromTo(
          '.profile-photo',
          {
            scale: 0,
            filter: 'blur(10px)',
          },
          {
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.3,
            ease: 'power4',
          },
          '<0.5'
        )
        .fromTo(
          '.profile-photo .decorations > *',
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.3,
            stagger: 0.25,
          },
          '<0.2'
        )
        .fromTo(
          '.sub-heading',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.3,
          },
          '-=1.2'
        )
        .fromTo(
          '.social-links a',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1.3,
            stagger: 0.06,
          },
          '-=1.1'
        )
        .fromTo(
          '.more-cta',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2.55,
          },
          '<0.9'
        );
    }, headerRef.current!);
  });

  function handleLinkClick(name: string) {
    posthog.capture(`${name}_link_click`, {
      location: 'header',
    });
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'hero w-full px-safe-offset-6 pt-safe-offset-6 pb-7 flex flex-col justify-between text-center md:text-left relative z-10',
        {
          'min-h-svh blurred-background': !compact,
        },
        className
      )}
    >
      <div className="grow w-full max-w-(--max-content-width) mx-auto flex flex-col justify-between gap-5 invisible">
        <DesktopNav />

        {compact === false && (
          <>
            <div className="flex flex-col justify-center items-center gap-5 h-full w-full md:flex-row">
              <Photo />

              <div className="md:grow order-2 md:order-1 md:-mt-2.5">
                <div className="greeting font-caveat text-[1.8rem] font-medium text-gray-600 dark:text-gray-100 dark:[text-shadow:0_0_2px_BLACK] flex items-center justify-start gap-2 mb-1 w-fit not-md:mx-auto text-left text-nowrap overflow-clip">
                  <img
                    src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif"
                    className="size-[1em]"
                  />
                  Oi, me chamo Iago
                </div>
                <h2 className="headline font-bold text-[2.1rem]/[2.8rem] md:text-[3.7rem]/[4.5rem] xl:text-[4.4rem]/[6rem] text-wrap dark:text-gray-100 dark:drop-shadow-md [&_.line]:overflow-clip">
                  Sou programador
                  <br />
                  Full-Stack
                  <span className="text-neutral-600/40 dark:text-neutral-300/60 scale-135 ml-3.5 md:ml-6.5 font-[arial] leading-0 drop-shadow-none inline-block">
                    &
                  </span>
                  <br />
                  especialista em Front
                </h2>
                <p className="sub-heading font-medium text-[1.12rem]/6 text-green-600 dark:text-green-500 mt-5 not-md:max-w-[300px] not-md:mx-auto">
                  Estou disponível para novas oportunidades!
                </p>
                <div className="social-links flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-7.5 px-10 md:px-0">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      onClick={() => handleLinkClick(link.name.toLowerCase())}
                    >
                      <img src={link.badge} alt={link.name} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full max-w-(--max-width) mx-auto more-cta">
              <a href="#about">
                Sobre mim{' '}
                <span className="inline-block animate-bounce relative top-[3px]">
                  👇
                </span>
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function Photo() {
  return (
    <div className="profile-photo relative order-1 md:order-2">
      <img
        src="/me.JPEG?v"
        className="rounded-full aspect-1/1 w-[260px] md:w-[340px] xl:w-[420px] border-[5px] md:border-[6px] bg-white border-white shadow-lg relative z-10 animate-[morph_8s_ease-in-out_infinite] will-change-[border-radius]"
        alt="Foto de perfil"
      />

      <div className="hidden md:block pointer-events-none decorations">
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          width="40px"
          height="40px"
          className="absolute blur-[0px] -top-2 -right-2 animate-spin [animation-duration:10s]"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
          width="50px"
          height="50px"
          className="absolute blur-[0.45px] -bottom-13 right-10 opacity-70 animate-[whale_8s_linear_infinite]"
        />
        <div className="absolute top-[52px] -left-[28px] text-xs z-0 flex flex-col text-black/60 dark:text-gray-200">
          <span className="ml-8.5">{'<body>'}</span>
          <span className="-ml-2">{'<div class="card">'}</span>
          <span className="ml-4.5">{'<header>'}</span>
          <span className="ml-1.5">{'<img src="">'}</span>
        </div>
      </div>
    </div>
  );
}
