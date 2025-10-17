"use client";
import { useTheme } from 'next-themes'
import { FiSun as SunIcon, FiMoon as MoonIcon } from "react-icons/fi"
import { RiComputerLine as ComputerIcon } from "react-icons/ri"
import { MdPhoneAndroid as PhoneIcon } from "react-icons/md"
import { cn } from '@/lib/utils'

type Props = JSX.IntrinsicElements['label']

const modes = ['light', 'system', 'dark'] as const

export default function ThemeToggle(props: Props) {
  const { theme, setTheme } = useTheme()

  if (theme === undefined) return null

  function changeTheme(mode) {
    if (!document.startViewTransition) setTheme(mode);
    document.startViewTransition(() => setTheme(mode));
  }

  return (
    <label className="border border-black/30 dark:border-white/30 rounded-full inline-flex items-center gap-x-1 cursor-pointer p-1" {...props}>
      {modes.map(mode => (
        <span
          className={cn('rounded-full text-base p-1.5', {
            'bg-black/15 dark:bg-white/20': mode === theme,
          })}
          onClick={() => changeTheme(mode)}
          key={mode}
          suppressHydrationWarning
        >
          {mode === 'light' ? <SunIcon className="size-4" />
          : mode === 'dark' ? <MoonIcon className="size-4" />
          : <>
            <PhoneIcon className="size-4 md:hidden" />
            <ComputerIcon className="size-4 hidden md:block" />
          </>
          }
        </span>
      ))}
    </label>
  )
}
