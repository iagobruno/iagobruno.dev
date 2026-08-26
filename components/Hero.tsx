'use client';
import { useRef } from 'react';
import useMount from 'react-use/esm/useMount';
import { cn } from '@/lib/utils';
import { LuArrowUpRight as ArrowForward } from 'react-icons/lu';
import { FaWhatsapp as WhatsappIcon } from 'react-icons/fa6';
import posthog from 'posthog-js';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import DesktopNav from '@/components/DesktopNav';
import Aurora from '@/components/Aurora';
import HeroCards from '@/components/HeroCards';
import Button from '@/components/Button';
import { whatsappLink } from '@/components/WhatsappButton';

interface HeroProps {
  compact?: boolean;
  className?: string;
}

export default function Hero({ compact = true, className }: HeroProps) {
  const headerRef = useRef<HTMLElement>(null);

  useMount(async () => {
    headerRef.current!.querySelector<HTMLElement>('& > .invisible')?.classList.remove('invisible');

    gsap.context(() => {
      const splitHeading = SplitText.create('h2.headline', {
        type: 'words, lines',
        linesClass: 'line',
        wordsClass: 'word',
      });
      const headingWords = splitHeading.words.filter(
        (word) => !word.classList.contains('memorable'),
      );
      const splitSub = SplitText.create('.sub-headline', {
        type: 'words, lines',
        linesClass: 'line',
        wordsClass: 'word',
      });

      const memorable = document.querySelector('h2.headline .memorable');
      const word = memorable?.querySelector('& > .word')!;
      // @ts-ignore Unwrap char elements
      if (word) word.replaceWith(...word.childNodes);
      const splitMemorable = SplitText.create(memorable!, {
        type: 'chars',
      });
      gsap.set(splitMemorable.chars, { y: 100 });

      gsap
        .timeline()
        .fromTo(
          '.aurora canvas',
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 3,
          },
        )
        .fromTo(
          '.greeting img',
          { scale: 0 },
          {
            scale: 1,
            duration: 1.6,
            ease: 'power2.inOut',
          },
          '<',
        )
        .fromTo(
          '.greeting > div > div',
          { x: -240, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.6,
            ease: 'power2.inOut',
          },
          '<',
        )
        .from(
          headingWords.concat('h2.headline svg'),
          {
            y: 100,
            scale: 0.9,
            opacity: 0,
            rotate: 37,
            transformOrigin: 'left bottom',
            duration: 1.34,
            ease: 'power3.inOut',
            stagger: 0.06,
            onComplete: () => {
              // unsplit
              setTimeout(splitHeading.revert, 100);
            },
          },
          '<',
        )
        .to(
          splitMemorable.chars,
          {
            keyframes: {
              fontWeight: [700, 800, 700],
              scale: [1, 1.2, 1],
              y: [100, 0, 0],
              rotate: [40, 3, 0],
            },
            transformOrigin: 'left bottom',
            duration: 0.92,
            ease: 'power1.out',
            stagger: 0.05,
          },
          '<+=0.8',
        )
        .from(
          splitSub.words,
          {
            y: 50,
            scale: 0.9,
            opacity: 0,
            duration: 1.34,
            ease: 'power3.inOut',
            stagger: 0.014,
            onComplete: () => splitSub.revert(), // unsplit
          },
          '-=2.3',
        )
        .fromTo(
          '.more-cta',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 2.4,
          },
          '-=0.4',
        );
    }, headerRef.current!);
  });

  function handleCTAClick() {
    posthog.capture('whatsapp_button_clicked', { location: 'hero_cta' });
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        'hero w-full px-safe-offset-6 pt-safe-offset-6 pb-7 flex flex-col justify-between text-center md:text-left relative z-10',
        {
          'min-h-svh': !compact,
        },
        className,
      )}
    >
      {!compact && <Aurora />}

      <div className="grow w-full max-w-(--max-content-width) mx-auto flex flex-col justify-between gap-5 relative z-2 invisible">
        <DesktopNav />

        {compact === false && (
          <>
            <div className="flex flex-col justify-between items-center gap-5 h-full w-full md:flex-row">
              <div className="order-1 md:order-2"></div>

              <div className="md:grow order-2 md:order-1 lg:max-w-[68%] text-center! 2xl:text-left! not-2xl:*:mx-auto not-2xl:mx-auto not-md:-mt-10">
                <div className="greeting flex flex-col md:flex-row items-center not-2xl:justify-center gap-x-3 gap-y-2 mb-4 md:mb-3 text-[1rem] sm:text-[1.1rem]">
                  <picture>
                    <source
                      srcSet="/me.avif"
                      type="image/avif"
                    />
                    <img
                      src="/me.jpeg"
                      fetchPriority="high"
                      className="size-[4rem] md:size-[3em] rounded-full block"
                      alt="Foto de perfil"
                    />
                  </picture>
                  <div className="space-y-0.5 font-inter text-center md:text-left md:tracking-wide overflow-clip text-black">
                    <div className="opacity-80 text-[0.8em] font-medium uppercase [word-spacing:.06em]">
                      Senior Software Engineer
                    </div>
                    <div className="text-[0.69em] uppercase">+10 anos xp</div>
                  </div>
                </div>
                <h2 className="headline font-inters font-bold text-[2.55rem]/[3rem] md:text-[3.7rem]/[4.5rem] xl:text-[4.5rem]/[5.4rem] 2xl:text-[4.5rem]/[5.7rem] text-wrap dark:text-gray-100 dark:drop-shadow-lg [&_.line]:overflow-clip">
                  Crio websites <span className="memorable text-nowrap">memoráveis</span> e produtos
                  digitais,
                  <br />
                  do zero à escala
                  <ArrowForward className="size-[1.1em] inline-block ml-1 not-sm:hidden" />
                </h2>
                <p className="sub-headline text-[0.92rem]/6 md:text-[1.2rem]/8 dark:drop-shadow-md max-w-[660px] mt-2 md:mt-5 [&_.line]:overflow-clip">
                  {/* Nada de layouts sem personalidade e landing pages genéricas.{' '} */}
                  Ajudo empresas a se destacarem com produtos digitais premium, combinando
                  elegância, estratégia e os objetivos do negócio.{` `}
                  <br className="not-md:hidden" />
                  <div className="not-md:hidden">
                    Mais do que bonito, um bom design é lembrado, respeitado e escolhido.
                  </div>
                </p>

                <div className="more-cta mt-4 md:mt-8 flex flex-col md:flex-row items-center justify-center md:justify-start gap-x-4 gap-y-2 w-fit">
                  <Button
                    href={whatsappLink}
                    target="_blank"
                    className="mt-2 text-nowrap"
                    onClick={handleCTAClick}
                  >
                    <WhatsappIcon className="size-[1.4em] mb-0.5" />
                    Solicitar orçamento
                  </Button>
                  <a
                    href="#projects"
                    className="text-[.9em] opacity-90"
                  >
                    Meus projetos
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full max-w-(--max-width) mx-auto"></div>
          </>
        )}
      </div>

      {!compact && <HeroCards />}
    </header>
  );
}
