'use client';
import { cn } from '@/lib/utils';
import Button from './Button';
import type { PropsWithChildren } from 'react';
import useMount from 'react-use/esm/useMount';
import { AiOutlinePlus as PlusIcon } from 'react-icons/ai';
import gsap from 'gsap';

const services = [
  {
    heading: 'Plataformas que rodam em escala',
    icon: '/icons/building.png',
    description:
      'Criação de plataformas digitais, aplicativos web que se comportam como apps nativos e soluções de Software as a Service sob medida.',
  },
  {
    heading: 'Automações e integração',
    icon: '/icons/design.png',
    description:
      'Automações para reduzir tarefas manuais, otimizar processos, organizar atendimento e acelerar a rotina da empresa.',
  },
  {
    heading: 'Landing pages e sites institucionais com estética premium',
    icon: '/icons/website.png',
    description:
      'Desenvolvo sites institucionais e landing pages elegantes otimizadas para conversão, responsividade e SEO.',
  },
  {
    heading: 'Web apps que se comportam como aplicativos nativos',
    icon: '/icons/pwa.svg',
    description:
      'Crio sites que funcionam offline, enviam notificações e podem ser instalados na tela de início.',
  },
  {
    heading: 'Sistemas que funcionam em tempo real com WebSockets',
    icon: '/icons/lightning.png',
    description:
      'Comunicação em real time para chat, transmissão ao vivo de eventos, notificações e dashboards com sincronização instantânea e baixa latência.',
  },
  {
    heading: 'Software as a Service',
    icon: '/icons/saas.png',
    description:
      'Desenvolvimento de soluções SaaS completas com arquitetura multi-tenant, integração de pagamentos, autenticação, deploy contínuo, prontos para produção.',
  },
];

export default function Services() {
  useMount(() => {
    const section = document.querySelector<HTMLElement>('#services')!;
    const cards = section.querySelectorAll<HTMLElement>('.service-card__content');

    gsap.fromTo(
      cards,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: `top 60%`,
          end: 'top 50%',
        },
      },
    );
  });

  return (
    <section
      id="services"
      className="w-full px-safe-offset-9 py-10 md:py-16 relative z-10 [--section-bg:var(--color-white)] dark:[--section-bg:var(--color-neutral-950)] bg-(--section-bg)"
    >
      <div className="max-w-(--max-content-width) mx-auto">
        <header className="mb-10 md:mb-14 text-center mx-4">
          <div className="text-primary text-base font-medium uppercase tracking-widest mb-1">
            Serviços
          </div>
          <h3 className="text-3xl md:text-[2.6rem] font-semibold mb-3">O que eu construo</h3>
          <p className="text-base opacity-85">
            Desenvolvo soluções digitais completas, do conceito ao deploy.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-10 md:gap-px md:bg-black/12 md:dark:bg-white/6">
          {services.map((service) => (
            <Card
              key={service.heading}
              heading={service.heading}
              icon={service.icon}
            >
              {service.description}
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button
            href="#contact"
            className="mt-4"
          >
            Entrar em contato
          </Button>
        </div>
      </div>
    </section>
  );
}

interface CardProps extends PropsWithChildren {
  icon: string;
  heading: string;
  className?: string;
}

function Card({ icon, heading, children, className }: CardProps) {
  return (
    <div
      className={cn(
        'service-card relative bg-(--section-bg) w-full',
        'md:px-10 md:[&:nth-child(-n+3)]:pb-9 md:[&:nth-last-child(-n+3)]:pt-9',
        className,
      )}
    >
      <div className="service-card__content h-full flex flex-col md:items-center md:text-center md:justify-center">
        <img
          src={icon}
          className={cn('block object-contain size-[45px] mb-3 md:mb-5', {
            'scale-125 not-md:translate-x-1': icon?.endsWith('pwa.svg'),
          })}
          fetchPriority="low"
          decoding="async"
        />
        <div className="font-medium text-[1.35rem] mb-1 md:mb-3">{heading}</div>
        <p className="text-base opacity-75">{children}</p>
      </div>
      <PlusIcon className="text-black/15 dark:text-white/9 bg-(--section-bg) -translate-1/2 size-8 p-1 absolute top-0 left-0 not-[.service-card:nth-last-child(-n+2)_&]:hidden not-md:hidden" />
    </div>
  );
}
