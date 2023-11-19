export default function Services() {
  return (
    <section
      id="services"
      className="bg-white w-full px-8 py-10 md:py-16 relative z-10 dark:bg-neutral-950"
    >
      <div className="max-w-[--max-content-width] mx-auto">
        <div className="text-sky-600 dark:text-sky-500 text-md font-medium uppercase text-center tracking-wider mb-1">
          Serviços
        </div>
        <h3 className="text-3xl font-semibold text-center mb-12">
          O que eu posso fazer por você
        </h3>

        <div className="flex items-start justify-center gap-10 flex-col md:flex-row md:gap-8">
          <Card
            heading="Desenvolvimento de sites e webapps"
            icon="/icons/development.png"
          >
            Criação servidores, landing pages, aplicativos web altamente
            interativos (Progressive Web Apps), manutenção de sistemas, entre
            outros.
          </Card>
          <Card
            heading="Design de interfaces e prototipação"
            icon="/icons/design.png"
          >
            Posso criar uma interface visual para seu site ou aplicativo que
            melhor atenda as necessidades do seu negócio e público-alvo.
          </Card>
          <Card
            heading="Manutenção e melhoria de sistemas"
            icon="/icons/worker.png"
          >
            Identificar e corrigir problemas, otimização de desempenho, adição
            de novas funções e alterações casuais como freelancer.
          </Card>
        </div>

        <div className="text-center mt-10">
          <a href="#contact" className="uppercase md:text-lg">
            Entrar em contato{' '}
            <span className="inline-block animate-bounce relative top-[3px]">👇</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Card({ icon, heading, children }) {
  return (
    <div className="rounded-lg w-full max-w-[320px] md:w-1/3">
      <img
        src={icon}
        className="block object-contain w-[40px] max-h-[40px] mb-5"
      />
      <div className="font-medium text-xl mb-2.5">{heading}</div>
      <p className="text-md opacity-80">{children}</p>
    </div>
  )
}
