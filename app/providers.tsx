'use client';
import { ThemeProvider } from 'next-themes';
import { useEffect, useLayoutEffect, type PropsWithChildren } from 'react';
import useMount from 'react-use/esm/useMount';
import Lenis from 'lenis';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function Providers({ children }: PropsWithChildren) {
  useLayoutEffect(() => {
    // Setup GSAP pluigns
    gsap.registerPlugin(ScrollTrigger, SplitText);

    // Setup Lenis
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Setup PostHog
    if (
      process.env.NODE_ENV != 'development' &&
      !location.href.includes('no-posthog') &&
      !location.href.includes('ngrok') &&
      !location.href.includes('localhost') &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        defaults: '2025-11-30',
      });
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <PHProvider client={posthog}>{children}</PHProvider>
    </ThemeProvider>
  );
}
