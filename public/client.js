function checkDarkModeIsEnabled() {
  return localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
}

document.documentElement.classList.toggle('dark', checkDarkModeIsEnabled())
