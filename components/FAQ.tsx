import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './Accordion';

const faqItems = [
  {
    question: 'Quanto custa uma landing page?',
    answer: 'test test test',
  },
  {
    question: 'Quanto custa criar um sistema sob-medida?',
    answer: 'test test test',
  },
  {
    question: 'Quanto tempo leva para construir um sistema?',
    answer: 'test test test',
  },
  {
    question: 'Você atende fora do Ceará?',
    answer:
      'Sim. Atendo empresas do Nordeste e de todo o Brasil de forma remota, com comunicação direta pelo WhatsApp.',
  },
  {
    question: 'Você utiliza IA?',
    answer: 'test test test',
  },
  {
    question: 'Como funciona seu processo de desenvolvimento?',
    answer: 'test test test',
  },
];

export default function FAQ() {
  return (
    <section className="relative z-0 w-full pt-20 pb-6 md:pb-10 px-safe-offset-6 text-center overflow-hidden in-[:active-view-transition]:not-in-[.theme-animation]:relative">
      <div className="max-w-(--max-content-width) mx-auto origin-bottom relative z-1">
        <header className="mb-8 lg:max-w-[700px] mx-auto">
          <div className="text-primary text-base font-medium uppercase text-center tracking-widest mb-2">
            FAQ
          </div>
          <h3 className="text-4xl md:text-5xl/14 font-semibold mb-4">Perguntas Frequentes</h3>
          <p className="sm:text-lg opacity-85">
            Respostas diretas para decidir se faz sentido chamar no WhatsApp agora.
          </p>
        </header>

        <Accordion
          className="mx-auto max-w-2xl text-left"
          type="single"
          collapsible
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer || 'Em breve'}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
