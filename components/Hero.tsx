import { HeroNav } from '@/components/Nav'
import { cn } from '@/lib/utils'

interface HeroProps {
  compact?: boolean,
  className?: string,
}

export default function Hero({ compact = true, className }: HeroProps) {
  return (
    <>
      <header className={cn('w-full px-6 py-7 flex flex-col justify-between text-center md:text-left relative z-10', {
        'min-h-svh blurred-background': !compact
      }, className)}>
        <div className="grow w-full max-w-(--max-content-width) mx-auto flex flex-col justify-between gap-5">

          <HeroNav />

          {compact === false && <>
            <div className="flex flex-col justify-center items-center gap-5 h-full w-full md:flex-row">
              <Photo />

              <div className="md:grow order-2 md:order-1 md:-mt-2.5">
                <div className="font-caveat text-[1.6rem] font-medium text-gray-600 dark:text-gray-100 dark:[text-shadow:0_0_2px_BLACK] flex items-center gap-2">
                  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" className="size-[1em]" />
                  Oi, me chamo Iago
                </div>
                <h2 className="font-bold text-[2.2rem]/[2.8rem] md:text-[3.7rem]/[4.5rem] xl:text-[4.4rem]/[5.6rem] text-wrap dark:text-gray-100 dark:drop-shadow-md">Sou programador<br/>Javascript<br/>Full-Stack</h2>
                {/* <p className="font-medium text-lg/6 text-green-600 dark:text-green-500 mt-5">Estou disponível para novas oportunidades!</p> */}
              </div>
            </div>

            <div className="w-full max-w-(--max-width) mx-auto">
              <a href="#about">Sobre mim <span className="inline-block animate-bounce relative top-[3px]">👇</span></a>
            </div>
          </>}
        </div>
      </header>
    </>
  )
}

function Photo() {
  return (
    <div className="relative order-1 md:order-2">
      <img src="https://github.com/iagobruno.png" className="rounded-full size-[260px] md:size-[340px] xl:size-[420px] border-[5px] bg-white border-white shadow-lg relative z-10 animate-[morph_8s_ease-in-out_infinite] will-change-[border-radius]" />

      <div className="hidden md:block pointer-events-none">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40px" height="40px" className="absolute blur-[0px] -top-3 -right-2 animate-spin [animation-duration:10s]" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="50px" height="50px" className="absolute blur-[0.45px] -bottom-13 right-10 opacity-70 animate-[whale_8s_linear_infinite]"/>
        <div className="absolute top-[52px] -left-[34px] text-xs z-0 flex flex-col dark:text-gray-200">
          <span className="ml-8">{'<body>'}</span>
          <span className="-ml-2">{'<div class="block">'}</span>
          <span className="ml-4">{'<header>'}</span>
          <span className="ml-1.5">{'<img src="">'}</span>
        </div>
      </div>
    </div>
  )
}
