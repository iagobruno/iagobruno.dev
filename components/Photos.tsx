'use client';
import { cn } from '@/lib/utils';
import ClickToExpandImg from '@/components/ClickToExpandImg';

const images = ['/images/IMG_5529.JPEG', '/images/workstation.jpeg', '/images/drawings.jpeg'];

export default function Photos() {
  return (
    <>
      {/* Desktop */}
      <div className="not-md:hidden w-[45%]">
        {images.map((src, index) => (
          <ClickToExpandImg key={src}>
            <picture>
              <source
                srcSet={src.replace(/\.(jpe?g|png|webp)$/i, '.avif')}
                type="image/avif"
              />
              <img
                src={src}
                className={cn(
                  'aspect-1/1 rounded-xl border-[5px] bg-white border-white shadow-xl relative object-cover hover:scale-106 transition-transform duration-500',
                  {
                    'w-[60%] z-3 ml-4 rounded-2xl -rotate-5 hover:-rotate-10': index === 0,
                    'w-[50%] z-2 ml-auto -mt-[20%] -translate-x-[3%] rotate-7 hover:rotate-3':
                      index === 1,
                    'w-[42%] z-1 ml-auto -mt-[14%] -translate-x-[80%] -rotate-12 hover:-rotate-6 object-bottom':
                      index === 2,
                  },
                )}
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
              className={cn('h-full w-full', {
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
