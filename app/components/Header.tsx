export default function Header() {
  return (
    <>
      <header className="min-h-[100svh] w-full px-5 py-6 flex flex-col justify-between bg-[url(/blurred-background.webp)] bg-cover bg-center bg-no-repeat text-center md:text-left">
        <div className="grow w-full max-w-[--max-content-width] mx-auto flex flex-col justify-between gap-5">

          <div className="w-full flex items-center justify-center md:justify-between">
            <a href="/">
              <img src="/IagoBruno.png" className="h-[44px] inline" alt="Iago Bruno" />
            </a>

            <nav className="bg-white/75 dark:bg-neutral-950/75 backdrop-blur-xl rounded-full py-2 px-4 gap-3 hidden md:inline-flex">
              <a href="#contact">Contato</a>
              <a href="#about">Sobre mim</a>
              <a href="#projects">Projetos</a>
              <a href="https://github.com/iagobruno">GitHub</a>
            </nav>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 h-full w-full md:flex-row">
            <div className="relative order-1 md:order-2">
              <img src="https://github.com/iagobruno.png" className="rounded-full aspect-square w-[260px] md:w-[340px] border-[5px] bg-white border-white shadow-lg relative z-10 animate-[morph_8s_ease-in-out_infinite]" />
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

            <div className="md:grow order-2 md:order-1 ">
              <h2 className="font-bold text-[2.5rem]/[3rem] md:text-[3.7rem]/[4.5rem] [text-wrap:wrap] dark:text-gray-100 dark:drop-shadow-md">Sou programador<br/>Javascript<br/>Full-Stack</h2>
              <p className="font-medium text-lg/6 text-green-600 dark:text-green-500 mt-5">Estou disponível para novas oportunidades!</p>
            </div>
          </div>

          <div className="w-full max-w-[--max-width] mx-auto">
            <a href="#about">Sobre mim <span className="inline-block animate-bounce relative top-[3px]">👇</span></a>
          </div>
        </div>
      </header>
    </>
  )
}
