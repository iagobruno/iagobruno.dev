import type { Metadata } from 'next'
import Hero from '@/components/Hero'

type Tools = Array<[category: string, list: Array<string>]>

const tools: Tools = [
  ['Hardware', ['Notebook Acer Aspire 315 i3, 8GB RAM', 'Monitor SuperFrame de 24”', 'Monitor LG de 24”', 'Teclado Redragon switch brown', 'iPhone 11']],
  ['Programas e ferramentas', ['Visual Studio Code', 'Chrome', 'Windows Terminal', 'Insomnia / Postman', 'Figma', 'WSL (Windows Subsystem for Linux)', 'Docker', 'GitHub', 'GitHub Copilot',]],
  ['Banco de dados', ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase Cloud Storage',]],
  ['Tecnologias', ['JavaScript', 'TypeScript', 'NodeJS', 'PHP', 'Laravel', 'NextJS', 'Vite', 'React', 'Vue', 'Svelte', 'Tailwind CSS', 'SASS', 'Yarn', 'PNPM', 'Jest / Mocha / Pest',]]
]

export default function Uses() {
  return (
    <div className="[--max-content-width:800px] px-8">
      <Hero className="px-0" />

      <div className="w-full max-w-[--max-content-width] mx-auto">
        <header className="pt-6 pb-14">
          <div className="dark:text-white text-base font-medium uppercase tracking-wider opacity-70 dark:opacity-80 mb-2">
            Uses
          </div>
          <h3 className="text-2xl/7 md:text-4xl/10 font-semibold dark:text-white dark:drop-shadow-md max-w-[600px]">
            Ferramentas que uso para trabalhar no dia a dia
          </h3>

          <img
            src="/workstation.jpeg"
            className="max-h-[420px] w-full rounded-lg mt-7 object-cover object-center"
            alt="Meu mesa de trabalho"
          />
        </header>

        <main className="text-lg space-y-7 divide-y divide-white/20 pb-20">
          {tools.map(row => (
            <div className="first:pt-0 pt-7" key={row[0]}>
              <strong className="font-semibold text-[1.18rem] mb-1.5 block">{row[0]}</strong>
              <ul className="list-disc list-inside">
                {row[1].map(tool => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          ))}
        </main>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Uses',
}
