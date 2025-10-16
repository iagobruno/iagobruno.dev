'use client';
import { cn } from '@/lib/utils'
import Button from './Button'
import type { PropsWithChildren } from 'react'
import useMount from 'react-use/esm/useMount'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

export default function Services() {

  useMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray('.service-card')
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    cards.forEach((element, i) => {
      const startPercent = 85
      const dynamicStartPercent = Math.max(0, startPercent - i * 10); // 85%, 75%, 65%, ...

      element.style.opacity = 0;
      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: `top ${isMobile ? startPercent : dynamicStartPercent}%`,
            end: 'top 50%',
            scrub: true,
          },
        }
      )
    })
  })

  return (
    <section
      id="services"
      className="bg-white w-full px-safe-offset-10 py-10 md:py-16 relative z-10 dark:bg-neutral-950"
    >
      <div className="max-w-(--max-content-width) mx-auto">
        <div className="text-primary text-base font-medium uppercase text-center tracking-wider mb-1">
          Serviços
        </div>
        <h3 className="text-3xl md:text-4xl font-semibold text-center mb-10 md:mb-14 mx-4">
          O que posso fazer por você
        </h3>

        <div className="flex items-center md:items-start justify-center gap-8 md:gap-10 xl:gap-16 flex-col md:flex-row">
          <Card
            heading="Desenvolvimento de plataformas e SaaS"
            icon="/icons/building.png"
            className=""
          >
            Criação de plataformas digitais, aplicativos web que se comportam como apps nativos e soluções de Software as a Service.
          </Card>
          <Card
            heading="Design de interfaces e prototipação"
            icon="/icons/design.png"
            className=""
          >
            Posso criar uma interface visual para seu site ou aplicativo que
            melhor atenda as necessidades do seu negócio e público-alvo.
          </Card>
          <Card
            heading="Criação de websites e landing pages"
            icon="/icons/website.png"
            className=""
          >
            Desenvolvo sites institucionais e landing pages otimizadas para conversão, responsividade e SEO.
          </Card>
        </div>

        <div className="text-center mt-10">
          <Button href="#contact" className="mt-4">
            Entrar em contato
          </Button>
        </div>
      </div>
    </section>
  )
}

interface CardProps extends PropsWithChildren {
  icon: string,
  heading: string,
  className?: string,
}

function Card({ icon, heading, children, className }: CardProps) {
  return (
    <div className={cn('service-card rounded-lg w-full max-w-[400px] md:w-1/3', className)}>
      <img
        src={icon}
        className="block object-contain w-[40px] max-h-[40px] mb-3 md:mb-5"
      />
      <div className="font-medium text-xl mb-2.5">{heading}</div>
      <p className="text-md opacity-80">{children}</p>
    </div>
  )
}
