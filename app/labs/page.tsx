import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import LabCard from '@/components/LabCard'
import Button from '@/components/Button'
import { list } from './list'

export default async function Page() {
  return (<>
    <div className="[--max-content-width:900px] px-safe-offset-7 pb-30">
      <Hero className="px-0" />

      <header className="max-w-(--max-content-width) mx-auto pt-6 pb-6 dark:text-white ">
        <div className="dark:text-white text-base font-medium uppercase tracking-wider opacity-70 dark:opacity-85 mb-1.5">
          Labs
        </div>
        <h3 className="text-3xl/10 md:text-[2.4rem]/11 font-semibold dark:text-white dark:drop-shadow-md max-w-[800px]">
          Alguns pequenos projetos e experimentos que fiz ao longo dos anos
        </h3>
        <p className="mt-3.5">
          São testes, brincadeiras e ideias que me ajudaram a explorar novas possibilidades e aprimorar minhas habilidades.
        </p>
      </header>

      <main className="max-w-[calc(var(--max-content-width)+300px)] mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-6">
          {list.map(item => (
            <LabCard
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </main>

      <footer className="text-center max-w-[340px] mx-auto mt-20">
        <div className="opacity-[85%]">E muitos outros pequenos projetos, experimentos e estudo de caso no meu perfil no Github.</div>
        <Button href="https://github.com/iagobruno" className="mt-4">Seguir no GitHub</Button>
      </footer>
    </div>
  </>)
}

export const metadata: Metadata = {
  title: 'Experimentos',
}
