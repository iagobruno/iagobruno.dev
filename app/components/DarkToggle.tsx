"use client";
import { useState, useEffect } from 'react'
import useMount from 'react-use/esm/useMount'

export default function DarkToggle() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', enabled)
  }, [enabled])

  useMount(() => {
    setEnabled(checkDarkModeIsEnabled())
  })

  function toggle () {
    localStorage.theme = (enabled ? 'light' : 'dark')
    setEnabled(!enabled)
  }

  return (
    <label className="inline-flex items-center cursor-pointer gap-1 mt-6">
      <input type="checkbox" value="" className="sr-only peer" checked={enabled} onChange={toggle} />
      <span className="text-base">☀️</span>
      <div className="w-11 h-6 relative bg-gray-400 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      <span className="text-base">🌑</span>
    </label>
  )
}

function checkDarkModeIsEnabled(): boolean {
  return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
}

if (typeof window !== 'undefined') {
    document.documentElement.classList.toggle('dark', checkDarkModeIsEnabled())
}
