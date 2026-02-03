import concatClasses, { ArgumentArray } from 'classnames';
import { twMerge } from 'tailwind-merge';

/**
 * Efficiently merge Tailwind CSS classes without style conflicts.
 * It also suports conditional classes!
 */
export function cn(...classnames: ArgumentArray) {
  return twMerge(concatClasses(classnames));
}

export function checkDarkModeIsEnabled(): boolean {
  return (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
}

export function sleep(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function eventListenerTrigger(event: string, el: HTMLElement) {
  return new Promise((resolve) => {
    el.addEventListener(event, resolve, { once: true });
  });
}

export function loadImage(url: string) {
  return new Promise((resolve: Function, reject: Function) => {
    let img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', () =>
      reject(new Error(`Failed to load image's URL: ${url}`))
    );
    img.src = url;
  });
}

export function selectElementText(element: Element) {
  const selection = window.getSelection();
  const range = document.createRange();

  range.selectNodeContents(element);
  selection?.removeAllRanges();
  selection?.addRange(range);
}

export function showFloatTooltip(
  element: Element,
  text: string,
  duration = 2400
) {
  const tooltip = document.createElement('div');

  tooltip.textContent = text;
  tooltip.className = `absolute z-100 px-3 py-1 text-[1rem]/6.5 text-white bg-black rounded-lg shadow-lg whitespace-nowrap select-none animate-[tooltip-animation_linear_both]`;
  tooltip.style.animationDuration = duration + 'ms';

  document.body.appendChild(tooltip);

  const rect = element.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  const top = rect.top + window.scrollY - tooltipRect.height - 8;
  const left =
    rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;

  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';

  setTimeout(() => {
    // tooltip.remove();
  }, duration);
}
