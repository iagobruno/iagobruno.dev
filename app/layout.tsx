import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';
import { Inter, Caveat } from 'next/font/google';
import MobileNav from '@/components/MobileNav';
import TailwindBreakpoints from '@/components/TailwindBreakpoints ';
import Scripts from '@/components/Scripts';
import WhatsappButton from '@/components/WhatsappButton';
import { Providers } from './providers';
import ProgressBar from 'nextjs-toploader';
import { ViewTransition } from 'react';
import './globals.css';

const interFont = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-inter',
});

const caveatFont = Caveat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-family-caveat',
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="pt-BR"
      className={`${interFont.variable} ${caveatFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Scripts />
        <meta name="darkreader-lock" />
        <link rel="preload" as="image" href="/images/blurred-background.webp" />
        <link rel="preload" as="image" href="/me.JPEG?v" />
      </head>
      <body>
        <Providers>
          <div className="blurred-background absolute z-4 min-h-svh w-full top-0 left-0 pointer-events-none" />

          <ViewTransition name="page-transition">
            {children}
          </ViewTransition>
          
          <MobileNav />
          <ProgressBar />
        </Providers>

        <WhatsappButton />
        <TailwindBreakpoints />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: '%s | Iago Bruno',
    default: 'Iago Bruno | Full-Stack Developer',
  },
  description: "Iago's portfolio",
  metadataBase: new URL('https://iagobruno.dev'),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    startupImage: '/favicon.png',
  },
  icons: {
    apple: '/me.JPEG',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};
