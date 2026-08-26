'use client';
import { FaCheck } from 'react-icons/fa6';
import { LuCalendarClock } from 'react-icons/lu';
import { AiOutlineSafety } from 'react-icons/ai';
import { IoStorefrontOutline } from 'react-icons/io5';
import { PiChatsCircle } from 'react-icons/pi';
import { useMount } from 'react-use';
import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const photos = [
  '/images/adv-print.png',
  '/images/psychology-print.png',
  '/images/ecommerce-print.png',
];

export default function Advantages() {
  const glowEffectRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useMount(() => {
    glowEffectRef.current!.style.opacity = '0';

    gsap.fromTo(
      glowEffectRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 3,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: glowEffectRef.current,
          start: 'top 60%',
          once: true,
        },
      },
    );
  });

  useEffect(() => {
    const DISPLAY_DURATION = 5000;
    const FADE_DURATION = 1000;

    const timeout = setTimeout(() => {
      setOpacity(0);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
        setOpacity(1);
      }, FADE_DURATION);
    }, DISPLAY_DURATION);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <section className="w-full px-safe-offset-6 pt-10 pb-12 md:pb-22 relative z-11 bg-white dark:bg-neutral-950 overflow-x-clip">
      <div className="max-w-(--max-content-width) mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-y-10 gap-x-12">
          <div className="order-1 flex-1">
            <div className="text-primary text-base font-medium uppercase tracking-wider mb-1.5">
              Cause impacto
            </div>
            <h2 className="text-left text-[2.2rem]/11 md:text-[2.4rem]/11 font-semibold tracking-[-0.006em]">
              Por que ter um website?
            </h2>
            <p className="text-[.96em]/[1.7rem] opacity-76 mt-3">
              Seu site é a sua vitrine digital, disponível 24 horas por dia, transmitindo
              credibilidade e moldando a primeira impressão que as pessoas têm do seu trabalho antes
              mesmo do primeiro contato.
            </p>

            <div className="space-y-5 md:space-y-8 mt-9">
              {[
                {
                  title: 'Visibilidade 24/7',
                  description:
                    'Diferente de uma loja física, seu site nunca fecha e pode ser acessado em qualquer lugar.',
                  icon: LuCalendarClock,
                },
                {
                  title: 'Credibilidade',
                  description:
                    'Um site bem feito transmite seriedade e profissionalismo. A maioria das pessoas pesquisa online antes de fechar negócio.',
                  icon: AiOutlineSafety,
                },
                {
                  title: 'Vitrine virtual',
                  description:
                    'Apresente visualmente seus produtos e serviços de forma clara e atraente.',
                  icon: IoStorefrontOutline,
                },
                {
                  title: 'Facilite o contato',
                  description: 'Ofereça canais de comunicação direto com seus clientes.',
                  icon: PiChatsCircle,
                },
              ].map(({ title, description, icon: Icon }) => (
                <div
                  key={title}
                  className="space-y-1"
                >
                  <div className="text-[1.2rem] font-medium flex items-center gap-2.5">
                    <Icon className="text-emerald-500 size-[1.3em] mb-0.5" />
                    {title}
                  </div>
                  <p className="text-[0.92rem]/[1.4rem] opacity-60">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-0 md:order-2 md:w-2/4 grid place-items-center relative md:-translate-y-5">
            <div className="relative z-1">
              {/* <img
                src="/images/safari-toolbar.png"
                className="w-full block"
              />  */}
              <picture
                style={{ opacity }}
                className="transition-opacity duration-1000"
              >
                <source
                  srcSet={photos[currentIndex].replace(/\.(jpe?g|png|webp)$/i, '.avif')}
                  type="image/avif"
                />
                <img
                  src={photos[currentIndex]}
                  className="w-full rounded-xl object-contain object-center transition-opacity duration-1000"
                  decoding="async"
                />
              </picture>
            </div>

            <div
              ref={glowEffectRef}
              className="aspect-5/3 bg-primary/50 blur-3xl rounded-full absolute top-2/4 left-2/4 w-full -translate-2/4 scale-100 -rotate-32 animate-[opacity-50_4s_ease-in-out_infinite_alternate]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
