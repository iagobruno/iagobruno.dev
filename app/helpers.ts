import concatClasses, { ArgumentArray } from 'classnames'
import { twMerge } from 'tailwind-merge'

/**
 * Efficiently merge Tailwind CSS classes without style conflicts.
 * It also suports conditional classes!
 */
export function cn(...classnames: ArgumentArray) {
  return twMerge(
    concatClasses(classnames)
  )
}

export function sleep(ms = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

export function eventListenerTrigger (event: string, el: HTMLElement) {
  return new Promise(resolve => {
    el.addEventListener(event, resolve, { once: true })
  })
}

export function loadImage(url: string) {
  return new Promise((resolve: Function, reject: Function) => {
    let img = new Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', () => reject(new Error(`Failed to load image's URL: ${url}`)))
    img.src = url
  })
}
