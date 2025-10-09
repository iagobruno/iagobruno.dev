import SlideShow from './SlideShow'
import Age from '@/components/Age'
import { cn } from '@/lib/utils'
import CommitsHistory from "./CommitsHistory";

type Skills = Array<{ name: string, icon: string }>

const skills: Skills = [
  { name: 'NodeJS', icon: 'nodejs.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'Laravel', icon: 'laravel.svg' },
  { name: 'PHP', icon: 'php.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'React', icon: 'react.svg' },
  { name: 'NextJS', icon: 'nextjs-dark.svg' },
  { name: 'NextJS', icon: 'nextjs-light.svg' },
  { name: 'Vue', icon: 'vuejs.svg' },
  { name: 'Nuxt', icon: 'nuxt.svg' },
  { name: 'GraphQL', icon: 'graphql.svg' },
  { name: 'Tailwind', icon: 'tailwind.svg' },
  { name: 'Bun', icon: 'bun.svg' },
  { name: 'MySQL', icon: 'mysql.svg' },
  { name: 'PostgreSQL', icon: 'postgresql.svg' },
  { name: 'MongoDB', icon: 'mongodb.svg' },
  { name: 'Redis', icon: 'redis.svg' },
  { name: 'Figma', icon: 'figma.svg' },
  { name: 'GitHub', icon: 'github-dark.png' },
  { name: 'GitHub', icon: 'github-light.png' },
  { name: 'Git', icon: 'git.svg' },
]

export default function About() {
  return (
    <section className="w-full px-safe-offset-6 pb-10 md:py-16 relative z-11 bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-(--max-content-width) mx-auto">
        <div className="flex flex-col md:flex-row gap-10">

          <div className="not-md:hidden w-[45%]">
            <Photo src="/images/IMG_5529.JPEG" className="w-[60%] z-3 ml-4 rounded-2xl hover:-rotate-10" />
            <Photo src="/images/workstation.jpeg" className="w-[50%] z-2 ml-auto -mt-[20%] hover:rotate-10" />
            <Photo src="/images/react-snippet.png" className="w-[42%] z-1 ml-auto -mt-[15%] -translate-x-[80%] hover:-rotate-10" />
          </div>
          <SlideShow />

          <div className="flex-1 md:text-[1.25rem]/[2.2rem] space-y-5">
            <h3 id="about" className="text-primary text-center md:text-left text-base font-medium uppercase tracking-wider [scroll-margin-top:1.5rem]">Sobre</h3>

            <p>Tenho <Age/> anos e atualmente moro no Ceará, Brasil. Sou apaixonado por programação <strong>há mais de 10 anos</strong> e aprendi tudo o que sei sozinho, movido pela curiosidade de saber como funciona a web, desde então, venho estudando novas linguagens programação, desenvolvendo websites e ajudando em projetos open source.</p>
            <p>Tenho vasta experiência com JavaScript e com PHP utilizando Laravel, mas estou sempre buscando ampliar meus conhecimentos. Cada projeto é uma oportunidade para aprender algo novo, sempre com foco na qualidade do produto final.</p>
            {/* <p>Você pode conferir minhas outras habilidades abaixo.</p> */}

            <div className="font-semibold md:text-[1.3rem] tracking-wide mt-10">Minhas habilidades e ferramentas:</div>
            <div className="flex flex-row flex-wrap gap-x-2 gap-y-3 md:gap-x-3 mt-5 text-center">
              {skills.map(skill => (
                <span
                  key={skill.icon}
                  title={skill.name}
                  className={cn({
                    'block dark:hidden': skill.icon.includes('light'),
                    'hidden dark:block': skill.icon.includes('dark'),
                  })}
                >
                  <img
                    src={'/icons/' + skill.icon}
                    className="size-11 md:size-12 object-contain"
                    alt={skill.name + ' Logo'}
                  />
                  <span className="block text-[0.5rem] xl:text-[0.6rem] opacity-70 dark:opacity-52 mt-1">{skill.name}</span>
                </span>
              ))}
            </div>

          </div>
        </div>

      </div>

      <CommitsHistory />
    </section>
  )
}

function Photo({ src, className }) {
  return (
    <img
      src={src}
      className={cn(
        'aspect-1/1 rounded-xl border-[5px] bg-white border-white shadow-xl relative object-cover hover:scale-110 transition-transform duration-500',
        className
      )}
    />
  )
}
