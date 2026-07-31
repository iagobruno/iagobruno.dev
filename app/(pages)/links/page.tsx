'use client';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { LuArrowUpRight as LinkArrow } from 'react-icons/lu';
import posthog from 'posthog-js';

// export const metadata: Metadata = {
//   title: 'Links',
// };

const links = [
  {
    title: 'Portfólio',
    href: 'https://iagobruno.dev',
    // description: 'Meu site pessoal e portfólio',
  },
  {
    title: 'Pequenos projetos e experimentos',
    href: '/labs',
    // description: 'Projetos open-source e contribuições',
    favicon: '/icons/test-tube.png',
  },
  {
    title: 'Meu setup',
    href: '/uses',
    // description: 'Perfil profissional e experiência',
    favicon: '/icons/computer.png',
  },
  {
    title: 'GitHub',
    href: 'https://github.com/iagobruno',
    // description: '',
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/iagobruno',
    // description: '',
  },
  {
    title: 'Currículo',
    href: 'https://drive.google.com/file/d/1J1RBxhNYlWX5MmC5Q-2wUZxIxyFyYRZf/view',
    // description: '',
    favicon: '/icons/document.svg',
  },
  {
    title: 'Instagram',
    href: 'https://instagram.com/iagobruno.dev',
    // description: 'Acompanhe meu dia a dia na programação',
  },
  {
    title: 'WhatsApp',
    href: 'https://wa.me/558897174708',
    // description: 'Entre em contato comigo',
  },
];

export default function LinksPage() {
  function handleLinkClick(name: string, url: string) {
    posthog.capture(`link_click`, {
      location: 'links_page',
      name,
      url,
    });
  }

  return (
    <div className="not-prose max-w-[600px] mx-auto flex flex-col items-center py-26 md:py-22">
      <picture>
        <source
          srcSet="/me.avif"
          type="image/avif"
        />
        <img
          src="/me.jpeg"
          alt="Iago Bruno"
          className="size-50 md:size-50 aspect-1/1 rounded-full border-[5px] bg-white border-white shadow-lg relative z-10 animate-[morph_8s_ease-in-out_infinite] will-change-[border-radius]"
        />
      </picture>

      <div className="mt-4 text-shadow-lg text-center text-black dark:text-white">
        {/* <h1 className="font-semibold text-2xl mt-4">Iago Bruno</h1> */}
        <img
          src="/logo.png"
          className="h-[1.2rem] inline-block dark:invert"
          fetchPriority="high"
          alt="Iago Bruno"
        />
        <p className="mt-1.5">Senior Software Engineerr</p>
        <p className="font-normal text-[0.9rem]/5 opacity-80 mt-2 not-md:max-w-[300px] not-md:mx-auto">
          Estou disponível para novas oportunidades!
        </p>
      </div>

      <div className="w-full flex flex-col gap-3.5 md:gap-5 mt-10 md:mt-12">
        {links.map(({ title, href, description, favicon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick(title, href)}
            className={cn(
              'group flex items-center justify-between gap-4 p-5 rounded-xl',
              'border border-neutral-300/90 dark:border-neutral-800',
              'hover:border-neutral-300 dark:hover:border-neutral-700',
              'bg-neutral-100 dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900',
              'transition-all duration-200 no-underline!',
            )}
          >
            <img
              src={
                favicon ?? `https://www.google.com/s2/favicons?domain=${new URL(href).origin}&sz=32`
              }
              alt={`${title} Favicon`}
              className={cn('size-7 object-contain', {
                'dark:invert': title === 'Currículo',
              })}
            />
            <div className="text-left flex-1">
              <div className="font-medium leading-6 text-neutral-900 dark:text-neutral-100">
                {title}
              </div>
              {description && (
                <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                  {description}
                </div>
              )}
            </div>
            <LinkArrow className="size-5 text-neutral-400 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
