import SlideShow from './SlideShow'
import Age from '@/components/Age'
import { cn } from '@/lib/utils'

type Skills = Array<{ name: string, icon: string }>

const skills: Skills = [
  { name: 'NodeJS', icon: 'nodejs.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'Laravel', icon: 'laravel.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'React', icon: 'react.svg' },
  { name: 'Redux', icon: 'redux.svg' },
  { name: 'NextJS', icon: 'nextjs-dark.svg' },
  { name: 'NextJS', icon: 'nextjs-light.svg' },
  { name: 'Vue', icon: 'vuejs.svg' },
  { name: 'Svelte', icon: 'svelte.png' },
  { name: 'GraphQL', icon: 'graphql.svg' },
  { name: 'TDD', icon: 'jest.svg' },
  { name: 'Tailwind', icon: 'tailwind.svg' },
  { name: 'SASS', icon: 'sass.svg' },
  { name: 'GitHub', icon: 'github-dark.png' },
  { name: 'GitHub', icon: 'github-light.png' },
  { name: 'Git', icon: 'git.svg' },
  { name: 'NPM', icon: 'npm.svg' },
  { name: 'HTML5', icon: 'html5.svg' },
  { name: 'CSS3', icon: 'css3.svg' },
]

export default function About() {
  return (
    <section className="w-full px-6 py-10 md:py-16 relative z-10 bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-[--max-content-width] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <SlideShow />

          <div className="grow md:text-lg space-y-5">
            <h3 id="about" className="text-sky-600 dark:text-sky-500 text-center md:text-left text-base font-medium uppercase tracking-wider [scroll-margin-top:1.5rem]">Sobre</h3>

            <p>Tenho <Age/> anos e atualmente moro no Ceará, Brasil. Sou apaixonado por programação há mais de 8 anos e aprendi tudo o que sei sozinho, movido pela curiosidade de saber como funciona a web, desde então, venho estudando novas linguagens programação, desenvolvendo websites e ajudando em projetos open source.</p>
            <p>JavaScript é a linguagem com a qual tenho mais confiança para trabalhar (tanto no lado cliente quanto no lado servidor) e atualmente estou estudando PHP com Laravel para ampliar meus conhecimentos.
            <br/>
            Você pode conferir minhas outras habilidades abaixo.</p>
          </div>
        </div>

        <div className="font-semibold text-lg mt-8">Minhas habilidades e ferramentas:</div>
        <div className="flex flex-row flex-wrap gap-2 md:gap-3 mt-5 text-center max-w-[800px]">
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
                className="h-[43px] w-[43px] object-contain"
                alt={skill.name + ' Logo'}
              />
              <span className="block text-[0.5rem] opacity-70 dark:opacity-50 mt-1">{skill.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
