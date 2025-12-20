'use client';
import { ThemeProvider } from 'next-themes';
import { useEffect, type PropsWithChildren } from 'react';
import useMount from 'react-use/esm/useMount';
import Lenis from 'lenis';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

export function Providers({ children }: PropsWithChildren) {
  useMount(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    return () => {
      lenis.destroy();
    };
  });

  useMount(() => {
    if (
      process.env.NODE_ENV != 'development' &&
      !location.href.includes('no-posthog') &&
      process.env.NEXT_PUBLIC_POSTHOG_KEY
    ) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        defaults: '2025-11-30',
      });
    }
  });

  return (
    <ThemeProvider attribute="class">
      <PHProvider client={posthog}>{children}</PHProvider>
    </ThemeProvider>
  );
}
