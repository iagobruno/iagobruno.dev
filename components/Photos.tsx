'use client';
import { cn, sleep } from '@/lib/utils';
import ClickToExpandImg from '@/components/ClickToExpandImg';
import useMount from 'react-use/esm/useMount';
import gsap from 'gsap';
import { useRef } from 'react';

const images = ['/images/IMG_5529.JPEG', '/images/workstation.jpeg', '/images/drawings.jpeg'];

export default function Photos() {
  useMount(() => {
    const cards = document.querySelectorAll<HTMLElement>('.desktop-photos');
    const trigger = cards[0].parentElement as HTMLElement;

    cards.forEach((element, index) => {
      gsap.set(element, { rotate: 0, opacity: 0, top: 100 });
      gsap.fromTo(
        element,
        { opacity: 0, rotate: 0, top: 100 },
        {
          opacity: 1,
          top: 0,
          rotate: [-5, 7, -12][index],
          duration: 0.5,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger,
            start: `top 85%`,
            end: 'top 50%',
          },
          onComplete() {
            element.style.removeProperty('transform');
            element.style.removeProperty('translate');
            element.style.removeProperty('rotate');
            element.style.removeProperty('scale');
            element.style.removeProperty('opacity');
            element.style.removeProperty('top');
            element.classList.add('transition-transform', 'duration-500');
          },
        },
      );
    });
  });

  return (
    <>
      {/* Desktop */}
      <div className="not-md:hidden w-[45%]">
        {images.map((src, index) => (
          <ClickToExpandImg key={src}>
            <picture
              className={cn(
                'desktop-photos block rounded-xl border-[5px] bg-white border-white shadow-xl relative object-cover overflow-clip hover:scale-106',
                {
                  'w-[60%] z-3 ml-4 rounded-2xl -rotate-5 hover:!-rotate-10': index === 0,
                  'w-[50%] z-2 ml-auto -mt-[20%] -translate-x-[3%] rotate-7 hover:!rotate-3':
                    index === 1,
                  'w-[42%] z-1 ml-auto -mt-[14%] -translate-x-[80%] -rotate-12 hover:!-rotate-6 object-bottom':
                    index === 2,
                },
              )}
            >
              <source
                srcSet={src.replace(/\.(jpe?g|png|webp)$/i, '.avif')}
                type="image/avif"
              />
              <img
                src={src}
                className="aspect-1/1"
                decoding="async"
              />
            </picture>
          </ClickToExpandImg>
        ))}
      </div>

      {/* Mobile */}
      <div className="block md:!hidden shrink-0 w-full md:w-[40%] xl:w-[45%] grid gap-3 grid-cols-5 grid-rows-[repeat(2,47%)]">
        {images.map((src, index) => (
          <ClickToExpandImg key={src}>
            <picture
              className={cn('block h-full w-full', {
                '[grid-area:1/1/3/4] aspect-square': index === 0,
                '[grid-area:1/4/2/6]': index === 1,
                '[grid-area:2/4/3/6] object-bottom': index === 2,
              })}
            >
              <source
                srcSet={src.replace(/\.(jpe?g|png|webp)$/i, '.avif')}
                type="image/avif"
              />
              <img
                src={src}
                className={cn(
                  'rounded-lg border-[3px] bg-white border-white shadow-xl object-cover h-full w-full',
                )}
                decoding="async"
              />
            </picture>
          </ClickToExpandImg>
        ))}
      </div>
    </>
  );
}
