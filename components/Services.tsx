import { cn } from '@/lib/utils'
import Button from './Button'
import type { PropsWithChildren } from 'react'

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white w-full px-8 py-10 md:py-16 relative z-10 dark:bg-neutral-950"
    >
      <div className="max-w-(--max-content-width) mx-auto">
        <div className="text-primary text-base font-medium uppercase text-center tracking-wider mb-1">
          Serviços
        </div>
        <h3 className="text-3xl font-semibold text-center mb-9 md:mb-12">
          O que eu posso fazer por você
        </h3>

        <div className="flex items-start justify-center gap-8 md:gap-10 xl:gap-16 flex-col md:flex-row">
          <Card
            heading="Desenvolvimento de sites e webapps"
            icon="/icons/development.png"
            className="md:[--reveal-start:20%]!"
          >
            Criação servidores, landing pages, aplicativos web altamente
            interativos (Progressive Web Apps), manutenção de sistemas, entre
            outros.
          </Card>
          <Card
            heading="Design de interfaces e prototipação"
            icon="/icons/design.png"
            className="md:[--reveal-start:26%]!"
          >
            Posso criar uma interface visual para seu site ou aplicativo que
            melhor atenda as necessidades do seu negócio e público-alvo.
          </Card>
          <Card
            heading="Manutenção e melhoria de sistemas"
            icon="/icons/worker.png"
            className="md:[--reveal-start:32%]!"
          >
            Identificar e corrigir problemas, otimização de desempenho, adição
            de novas funções e alterações casuais como freelancer.
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
    <div className={cn('rounded-lg w-full max-w-[320px] md:w-1/3 scroll-reveal [--reveal-start:10%] [--reveal-range:10%]', className)}>
      <img
        src={icon}
        className="block object-contain w-[40px] max-h-[40px] mb-3 md:mb-5"
      />
      <div className="font-medium text-xl mb-2.5">{heading}</div>
      <p className="text-md opacity-80">{children}</p>
    </div>
  )
}
