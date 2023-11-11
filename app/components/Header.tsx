export default function Header() {
  return (
    <>
      <header style={{'--max-width': '960px'}} className="min-h-screen w-full px-5 py-6 flex flex-col justify-between bg-[url(/blurred-background.webp)] bg-cover bg-center bg-no-repeat text-center md:text-left">
        <div className="grow w-full max-w-[--max-width] mx-auto flex flex-col justify-between gap-5">
          <div className="w-full text-right invisible md:visible">
            <nav className="bg-white rounded-full py-2 px-4 ml-auto inline-flex gap-3">
              <a href="#contact">Contato</a>
              <a href="#about">Sobre mim</a>
              <a href="#projects">Projetos</a>
              <a href="https://github.com/iagobruno">GitHub</a>
            </nav>
          </div>

          <div className="flex flex-col justify-center items-center gap-5 h-full w-full md:flex-row">
            <img src="https://github.com/iagobruno.png" className="rounded-full w-[80px] h-[80px] md:w-[340px] md:h-[340px] border-[5px] border-white shadow-lg md:animate-[morph_8s_ease-in-out_infinite] order-1 md:order-2" />
            <div className="md:grow order-2 md:order-1 ">
              <p className="font-medium text-[1.35rem]">Olá 👋, me chamo Iago Bruno. Sou</p>
              <h2 className="font-bold text-4xl md:text-6xl md:!leading-tight mb-5">Programador<br/>JavaScript<br/>Full-Stack</h2>
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
