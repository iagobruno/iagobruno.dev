"use client";
import { useTheme } from 'next-themes'

type Props = JSX.IntrinsicElements['label']

export default function ThemeToggle(props: Props) {
  const { theme, setTheme } = useTheme()

  function toggle () {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (typeof theme === undefined) return null

  return (
    <label className="inline-flex items-center cursor-pointer gap-1" {...props}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === 'dark'}
        onChange={toggle}
      />
      <span className="text-base">☀️</span>
      <div className="w-11 h-6 relative bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="text-base">🌑</span>
    </label>
  )
}
