'use client';
import ProjectCard from './ProjectCard';
import ProjectsMoreSection from './ProjectsMoreSection';
import gsap from 'gsap';
import useMount from 'react-use/esm/useMount';

const projects = [
  {
    image: '/images/danc-print.png',
    title: 'Danc Solutions',
    year: '2025',
    description:
      'Desenvolvi uma landing page focada em apresentar de maneira clara e atrativa os serviços e soluções oferecidos pela software house. \nFeito com Vue, Nuxt e Tailwind',
    url: 'https://dancsolutions.com/',
  },
  {
    image: '/images/aurenpay-print.png',
    title: 'AurenPay',
    year: '2025',
    description:
      'Participei do desenvolvimento da AurenPay, uma plataforma de pagamentos via Pix, sendo responsável pela criação do dashboard para gestão dos pagamentos e da landing page. \nFeito com Laravel, PHP, Vue e Nuxt.',
    // url: 'https://bspay.co/',
  },
  // {
  //   image: '/images/bspay-print.png',
  //   title: 'BS PAY',
  //   year: '2024 – 2025',
  //   description:
  //     'Atuei como desenvolvedor front-end, criando e mantendo interfaces de usuário eficientes e intuitivas utilizando Vue, TypeScript e Tailwind.',
  //   url: 'https://bspay.co/',
  // },
  {
    image: '/images/fabi-bolos-print.png',
    title: 'Bolos da Fabi',
    year: '2023',
    description:
      'Um app de delivery desenvolvido sob medida para uma confeitaria, atendendo a uma necessidade que não era suprida pela plataforma utilizada anteriormente. \nFeito com React, Typescript, Tailwind e Firebase.',
    url: 'https://tulipa-cake.web.app/',
  },
  {
    image: '/images/descontaiv2-print.jpg',
    title: 'Descontaí',
    year: '2019',
    description:
      'Uma plataforma online que reúne cupons de desconto, promoções e ofertas de diversas lojas e serviços. \nFeito com React, Next.JS, Node e Typescript.',
    url: 'https://www.descontai.com/',
  },
  {
    image: '/images/voltsolar-print.jpg',
    title: 'VoltSolar',
    year: '2018',
    description:
      'Um site institucional para uma empresa de energia solar, com foco em apresentar os serviços oferecidos, benefícios da energia solar e diferenciais da empresa de forma clara e moderna.\nFeito com React, Next.JS e Typescript.',
    //url: 'https://iagobruno.github.io/delivery-webapp-demo/',
  },
  {
    image: '/images/point-burguer-print.png',
    title: 'Point Burguer',
    year: '2022',
    description:
      'Um app de delivery para uma hamburgueria que buscava se desvincular das grandes plataformas. \nFeito com React, Typescript e Firebase.',
    url: 'https://pointburguer.web.app/',
  },
  {
    image: '/images/tecbolt-print.jpg',
    title: 'TecBolt',
    year: '2017',
    description:
      'O TecBolt era um portal de notícias curtas no formato consolidado de stories.',
  },
  {
    image: '/images/lembretes-print.jpg',
    title: 'Lembretes App',
    year: '2014',
    description:
      'Ele era um simples aplicativo de lista de tarefas e é meu xodó até hoje, pois foi ao desenvolvê-lo que dei meus primeiros passos a fundo em JavaScript.',
  },
  {
    image: '/images/rede-social-beta-print.jpg',
    title: 'Rede Social Beta',
    year: '2012',
    description:
      'O Rede Social Beta foi meu primeiro grande trabalho, na época o portal recebia uma grande quantidade de visitas e fui encarregado de cuidar do site.',
  },
];

export type Project = (typeof projects)[number];

export default function Projects() {
  useMount(() => {
    const items = gsap.utils.toArray('.project');

    items.forEach((element, i) => {
      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: element,
            start: `top 85%`,
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <section
      id="projects"
      className="bg-white w-full px-safe-offset-8 py-10 md:py-16 relative z-10 dark:bg-neutral-950"
    >
      <div className="max-w-(--max-content-width) mx-auto">
        <div className="text-primary text-base font-medium uppercase text-center tracking-wider mb-1">
          Portfólio
        </div>
        <h3 className="text-3xl md:text-4xl font-semibold text-center mb-8 md:mb-14">
          Meus trabalhos e projetos selecionados
        </h3>

        <div className="space-y-7 md:space-y-12 mx-auto max-w-[1210px]">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <ProjectsMoreSection />
      </div>
    </section>
  );
}
