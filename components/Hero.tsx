import { HeroNav } from '@/components/Nav'
import { cn } from '@/lib/utils'

interface HeroProps {
  compact?: boolean,
  className?: string,
}

export default function Hero({ compact = true, className }: HeroProps) {
  return (
    <>
      <header className={cn('w-full px-6 py-7 not-md:pb-14 flex flex-col justify-between text-center md:text-left relative z-10', {
        'min-h-svh blurred-background': !compact
      }, className)}>
        <div className="grow w-full max-w-(--max-content-width) mx-auto flex flex-col justify-between gap-5">

          <HeroNav />

          {compact === false && <>
            <div className="flex flex-col justify-center items-center gap-5 h-full w-full md:flex-row">
              <Photo />

              <div className="md:grow order-2 md:order-1 md:-mt-2.5">
                <div className="font-caveat text-[1.8rem] font-medium text-gray-600 dark:text-gray-100 dark:[text-shadow:0_0_2px_BLACK] flex items-center justify-center md:justify-start gap-2 mb-1">
                  <img src="https://media.giphy.com/media/hvRJCLFzcasrR4ia7z/giphy.gif" className="size-[1em]" />
                  Oi, me chamo Iago
                </div>
                <h2 className="font-bold text-[2.1rem]/[2.8rem] md:text-[3.7rem]/[4.5rem] xl:text-[4.4rem]/[6rem] text-wrap dark:text-gray-100 dark:drop-shadow-md">
                  Sou programador<br/>
                  Full-Stack<span className="text-neutral-600/40 dark:text-neutral-300/60 scale-135 ml-3.5 md:ml-6.5 font-[arial] leading-0 drop-shadow-none inline-block">&</span><br/>
                  especialista em Front
                </h2>
                <p className="font-medium text-[1.12rem]/6 text-green-600 dark:text-green-500 mt-5 not-md:max-w-[300px] not-md:mx-auto">
                  Estou disponível para novas oportunidades!
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-7.5 px-10 md:px-0">
                  <a href="https://wa.me/558897174708?text=Ol%C3%A1!%20Vim%20do%20seu%20site%20para%20tirar%20algumas%20d%C3%BAvidas%20sobre%20os%20seus%20servi%C3%A7os."><img src="https://img.shields.io/badge/WhatsApp-25D366?style=flat&amp;logo=whatsapp&amp;logoColor=white" alt="WhatsApp"/></a>
                  <a href="https://github.com/iagobruno"><img src="https://img.shields.io/badge/GitHub-242424?style=flat&amp;logo=github&amp;logoColor=white" alt="GitHub"/></a>
                  <a href="https://www.instagram.com/iagobruno.dev"><img src="https://img.shields.io/badge/Instagram-E4405F?style=flat&amp;logo=instagram&amp;logoColor=white" alt="Instagram"/></a>
                  <a href="https://discordapp.com/users/724201631348162592"><img src="https://img.shields.io/badge/Discord-5865F2?style=flat&amp;logo=discord&amp;logoColor=white" alt="Discord"/></a>
                  <a href="https://www.linkedin.com/in/iagobruno-dev"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&amp;logo=logmein&amp;logoColor=white" alt="LinkedIn"/></a>
                </div>
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
      <img src="/me.JPEG" className="rounded-full aspect-1/1 w-[260px] md:w-[340px] xl:w-[420px] border-[5px] md:border-[6px] bg-white border-white shadow-lg relative z-10 animate-[morph_8s_ease-in-out_infinite] will-change-[border-radius]" />

      <div className="hidden md:block pointer-events-none">
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40px" height="40px" className="absolute blur-[0px] -top-2 -right-2 animate-spin [animation-duration:10s]" />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="50px" height="50px" className="absolute blur-[0.45px] -bottom-13 right-10 opacity-70 animate-[whale_8s_linear_infinite]"/>
        <div className="absolute top-[52px] -left-[28px] text-xs z-0 flex flex-col dark:text-gray-200 not-dark:opacity-60">
          <span className="ml-8.5">{'<body>'}</span>
          <span className="-ml-2">{'<div class="card">'}</span>
          <span className="ml-4.5">{'<header>'}</span>
          <span className="ml-1.5">{'<img src="">'}</span>
        </div>
      </div>
    </div>
  )
}
