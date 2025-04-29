import Button from './Button'
import ProjectCard from "./ProjectCard";

const projects = [
  {
    image: '/images/bs-pay-print.png',
    title: 'BS PAY',
    year: '2024 – 2025',
    description: 'Minha função envolveu a criação e manutenção de interfaces de usuário eficientes e intuitivas, utilizando Vue, TypeScript e Tailwind.',
    url: 'https://bspay.co/'
  },
  {
    image: '/images/fabi-bolos-print.png',
    title: 'Bolos da Fabi',
    year: '2023',
    description: 'Um app de delivery feito sob medida para uma confeitaria, atendendo a uma necessidade não suprida pela plataforma que utilizavam anteriormente. \nFeito com React, Typescript, Tailwind e Firebase.',
    url: 'https://tulipa-cake.web.app/'
  },
  {
    image: '/images/point-burguer-print.png',
    title: 'Point Burguer',
    year: '2022',
    description: 'Um app de delivery para uma hamburgueria que buscava se desvincular das grandes plataformas. \nFeito com React, Typescript e Firebase.',
    url: 'https://pointburguer.web.app/'
  },
  {
    image: '/images/saas-demo-print.png',
    title: 'SAAS Demo',
    year: '2022',
    description: 'Uma simples plataforma onde o cliente assina um plano para ter acesso as funções avançadas do sistema. \nFeito com Laravel, Stripe, Tailwind e Docker.',
    url: 'https://github.com/iagobruno/laravel-saas-demo'
  },
  {
    image: '/images/marketplace-print.png',
    title: 'Marketplace Demo',
    year: '2022',
    description: 'Um marketplace onde os usuários podem vender e comprar produtos através da plataforma. \nFeito com Laravel, Stripe, Tailwind e Docker.',
    url: 'https://github.com/iagobruno/laravel-marketplace-demo'
  },
  {
    image: '/images/delivery-app-print.png',
    title: 'Delivery app',
    year: '2021',
    description: 'Um app de delivery onde os clientes podem navegar pelo cardápio e adicionar pratos e complementos à sacola. \nFeito com React.',
    url: 'https://iagobruno.is-a.dev/delivery-webapp-demo'
  },
  {
    image: '/images/descontai-print.png',
    title: 'Descontaí',
    year: '2019',
    description: 'O Descontaí é um site que reúne cupons de desconto e ofertas. \nFeito com React, Next.JS e Typescript.',
    url: 'https://www.descontai.com/'
  },
  {
    image: '/images/tecbolt-print.jpg',
    title: 'TecBolt',
    year: '2017',
    description: 'O TecBolt era um portal de notícias curtas no formato consolidado de stories.',
  },
  {
    image: '/images/lembretes-print.jpg',
    title: 'Lembretes App',
    year: '2014',
    description: 'Ele era um simples aplicativo de lista de tarefas e é meu xodó até hoje, pois foi ao desenvolvê-lo que dei meus primeiros passos a fundo em JavaScript.',
  },
  {
    image: '/images/rede-social-beta-print.jpg',
    title: 'Rede Social Beta',
    year: '2012',
    description: 'O Rede Social Beta foi meu primeiro grande trabalho, na época o portal recebia uma grande quantidade de visitas e fui encarregado de cuidar do site.',
  },
]

export type Project = typeof projects[number];

export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-white w-full px-8 py-10 md:py-16 relative z-10 dark:bg-neutral-950"
    >
      <div className="max-w-(--max-content-width) mx-auto">
        <div className="text-primary text-base font-medium uppercase text-center tracking-wider mb-1">
          Projetos
        </div>
        <h3 className="text-3xl font-semibold text-center mb-8 md:mb-12">
          Meus trabalhos e experimentos
        </h3>

        <div className="space-y-7 md:space-y-12 mx-auto max-w-[1210px]">
          {projects.map(project => (
            <ProjectCard
              key={project.title}
              project={project}
            />
          ))}
        </div>

        <div className="text-center max-w-[340px] mx-auto mt-12">
          <div className="opacity-[85%]">E muitos outros pequenos projetos, experimentos e estudo de caso no meu perfil no Github.</div>
          <Button href="https://github.com/iagobruno" className="mt-4">Seguir no GitHub</Button>
        </div>
      </div>
    </section>
  )
}
