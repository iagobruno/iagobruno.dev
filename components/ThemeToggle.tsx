'use client';
import { useTheme } from 'next-themes';
import { useRef } from 'react';
import { FiSun as SunIcon, FiMoon as MoonIcon } from 'react-icons/fi';
import { RiComputerLine as ComputerIcon } from 'react-icons/ri';
import { MdPhoneAndroid as PhoneIcon } from 'react-icons/md';
import { cn } from '@/lib/utils';

type Props = JSX.IntrinsicElements['label'];

const modes = ['light', 'dark'] as const;

export default function ThemeToggle(props: Props) {
  const { setTheme, resolvedTheme: theme } = useTheme();
  const elementRef = useRef<HTMLElement>(null);

  if (theme === undefined) return null;

  function toggleTheme(evt: React.MouseEvent<HTMLSpanElement>) {
    evt.stopPropagation();
    evt.preventDefault();
    const mode = theme == 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) setTheme(mode);

    // const rect = elementRef.current?.getBoundingClientRect();
    const rect = evt.currentTarget?.getBoundingClientRect();
    if (rect) {
      const x = (rect.left + rect.right) / 2;
      const y = (rect.top + rect.bottom) / 2;

      document.documentElement.style.setProperty(
        '--x',
        `${(x / window.innerWidth) * 100}%`
      );
      document.documentElement.style.setProperty(
        '--y',
        `${(y / window.innerHeight) * 100}%`
      );
    }

    const animationClass = 'theme-animation';
    document.documentElement.classList.add(animationClass);

    const transition = document.startViewTransition(() => {
      setTheme(mode);
    });
    transition.finished.then(() => {
      document.documentElement.classList.remove(animationClass);
    });
  }

  return (
    <label
      className="border border-black/30 dark:border-white/30 rounded-full inline-flex items-center gap-x-1.5 cursor-pointer p-1"
      {...props}
      ref={elementRef}
      onClick={toggleTheme}
    >
      {modes.map((mode) => (
        <span
          className={cn(
            'rounded-full text-base p-1.5 [&_svg]:pointer-events-none',
            {
              'bg-black/15 dark:bg-white/20': mode === theme,
            }
          )}
          key={mode}
          suppressHydrationWarning
        >
          {mode === 'light' ? (
            <SunIcon className="size-4" />
          ) : mode === 'dark' ? (
            <MoonIcon className="size-4" />
          ) : (
            <>
              <PhoneIcon className="size-4 md:hidden" />
              <ComputerIcon className="size-4 hidden md:block" />
            </>
          )}
        </span>
      ))}
    </label>
  );
}
