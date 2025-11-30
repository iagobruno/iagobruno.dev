'use client';
import type { PropsWithChildren } from 'react';
import Hero from '@/components/Hero';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function PagesLayout({ children }: PropsWithChildren) {
  const maxContentWidth = usePathname() === '/labs' ? '1200px' : '800px';

  return (
    <div
      className="px-safe-offset-7"
      style={{ '--max-content-width': maxContentWidth } as React.CSSProperties}
    >
      <Hero className="px-0" />

      <main
        className={cn(
          'w-full max-w-(--max-content-width) mx-auto pb-20',
          'prose prose-lg dark:prose-invert',
          'prose-headings:font-semibold prose-headings:mt-8 prose-headings:mb-4  prose-h1:text-[1.66rem] md:prose-h1:text-3xl  prose-h2:text-2xl  prose-h3:text-xl prose-h3:mb-2.5',
          'prose-p:my-3 prose-p:text-lg',
          'prose-hr:my-8 prose-hr:border-t-black/25 dark:prose-hr:border-t-white/20',
          'prose-a:no-underline',
          'prose-ul:pl-5 prose-ul:mt-3.5 prose-ul:text-lg  prose-li:my-0.5 prose-li:pl-1',
          'prose-blockquote:border-black/25 prose-blockquote:dark:border-white/20 prose-blockquote:opacity-85'
        )}
      >
        {children}
      </main>
    </div>
  );
}
