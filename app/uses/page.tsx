import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import getFileLastUpdateDate from '@/lib/getFileLastUpdate'
import { tools } from './list'

export default function Page() {
  const lastUpdate = getFileLastUpdateDate(import.meta.url)

  return (
    <div className="[--max-content-width:800px] px-safe-offset-7">
      <Hero className="px-0" />

      <div className="w-full max-w-(--max-content-width) mx-auto pb-20">
        <header className="pt-6 pb-14 dark:text-white">
          <div className="dark:text-white text-base font-medium uppercase tracking-wider opacity-70 dark:opacity-85 mb-1.5">
            Uses
          </div>
          <h3 className="text-2xl/7 md:text-[2.4rem]/11 font-semibold dark:text-white dark:drop-shadow-md max-w-[600px]">
            Ferramentas que uso para trabalhar no dia a dia
          </h3>

          <img
            src="/images/workstation.jpeg"
            className="max-h-[400px] md:max-h-[480px] w-full rounded-lg mt-7 object-cover object-center"
            alt="Meu mesa de trabalho"
          />
        </header>

        <main className="text-lg">
          <div className="divide-y divide-black/25 dark:divide-white/20">
            {tools.map(row => (
              <div className="pt-8 first:pt-0" key={row.section}>
                {row.section && (
                  <strong className="font-semibold text-[1.66rem] mb-3 block">{row.section}</strong>
                )}

                <div className="divide-y divide-black/25 dark:divide-white/20">
                  {row.list.map(section => (
                    <div className="py-8 first:pt-0" key={section}>
                      <strong className="font-semibold text-[1.22rem] mb-1.5 block">{section.category}</strong>

                      <ul className="list-disc list-inside ">
                        {section.list.map(tool => (
                          <li key={tool}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          <footer className="mt-8 opacity-80">
            Atualizado em {lastUpdate}.
            <div className="mt-2 text-sm">Inspirado no projeto <a href="https://uses.tech/" target="_blank">uses.tech</a> de Wes Bos.</div>
          </footer>
        </main>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Uses',
}
