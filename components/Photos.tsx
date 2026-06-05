'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import { cn } from '@/lib/utils';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/autoplay';
import useIsMobile from '@/hooks/useIsMobile';

const desktopImages = [
  '/images/IMG_5529.JPEG',
  '/images/workstation.jpeg',
  '/images/react-snippet.png',
];
const mobileImages = [
  '/images/IMG_5529.JPEG',
  '/images/workstation.jpeg',
  '/images/react-snippet.png',
  '/images/IMG_6893.JPEG',
  '/images/html-snippet.png',
];

export default function Photos() {
  return (
    <>
      <div className="not-md:hidden w-[45%]">
        {desktopImages.map((src, index) => (
          <img
            src={src}
            key={src}
            className={cn(
              'aspect-1/1 rounded-xl border-[5px] bg-white border-white shadow-xl relative object-cover hover:scale-110 transition-transform duration-500',
              {
                'w-[60%] z-3 ml-4 rounded-2xl hover:-rotate-10': index === 0,
                'w-[50%] z-2 ml-auto -mt-[20%] hover:rotate-10': index === 1,
                'w-[42%] z-1 ml-auto -mt-[15%] -translate-x-[80%] hover:-rotate-10': index === 2,
              },
            )}
          />
        ))}
      </div>

      <Swiper
        effect="cards"
        modules={[EffectCards, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          stopOnLastSlide: false,
          reverseDirection: false,
        }}
        cardsEffect={{
          perSlideOffset: 2.4,
        }}
        speed={500}
        loop
        className="block md:!hidden shrink-0 w-full aspect-16/15 md:w-[40%] xl:w-[45%] not-md:-mt-[32px]"
      >
        {mobileImages.map((src) => (
          <SwiperSlide key={src}>
            <img
              src={src}
              className={'block w-full object-cover object-top aspect-16/15 rounded-lg shadow-lg'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
