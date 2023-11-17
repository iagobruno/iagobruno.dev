export default function Header() {
  return (
    <>
      <header className="min-h-[100svh] w-full px-5 py-6 flex flex-col justify-between bg-[url(/blurred-background.webp)] bg-cover bg-center bg-no-repeat text-center md:text-left">
        <div className="grow w-full max-w-[--max-content-width] mx-auto flex flex-col justify-between gap-5">

          <div className="w-full flex items-center justify-center md:justify-between">
            <a href="/">
              <img src="/IagoBruno.png" className="h-[44px] inline" alt="Iago Bruno" />
            </a>

            <nav className="bg-white rounded-full py-2 px-4 gap-3 hidden md:inline-flex">
              <a href="#contact">Contato</a>
              <a href="#about">Sobre mim</a>
              <a href="#projects">Projetos</a>
              <a href="https://github.com/iagobruno">GitHub</a>
            </nav>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 h-full w-full md:flex-row">
            <img src="https://github.com/iagobruno.png" className="rounded-full w-[240px] h-[240px] md:w-[340px] md:h-[340px] border-[5px] border-white shadow-lg animate-[morph_8s_ease-in-out_infinite] order-1 md:order-2" />
            <div className="md:grow order-2 md:order-1 ">
              <h2 className="font-bold text-[2.5rem]/[3rem] md:text-6xl/[4.2rem] mb-5">Programador<br/>JavaScript<br/>Full-Stack</h2>
              <p className="font-medium text-lg text-green-600">Estou disponível para novas oportunidades!</p>
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
