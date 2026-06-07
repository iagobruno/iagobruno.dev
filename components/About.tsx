import Photos from './Photos';
import Age from '@/components/Age';
import { cn } from '@/lib/utils';
import CommitsHistory from './CommitsHistory';
import { FaFileDownload as DownloadIcon } from 'react-icons/fa';

type Skills = Array<{ name: string; icon: string }>;

const skills: Skills = [
  { name: 'NodeJS', icon: 'nodejs.svg' },
  { name: 'TypeScript', icon: 'typescript.svg' },
  { name: 'Laravel', icon: 'laravel.svg' },
  { name: 'PHP', icon: 'php.svg' },
  { name: 'Docker', icon: 'docker.svg' },
  { name: 'React', icon: 'react.svg' },
  { name: 'NextJS', icon: 'nextjs-dark.svg' },
  { name: 'NextJS', icon: 'nextjs-light.svg' },
  { name: 'Vue', icon: 'vuejs.svg' },
  { name: 'Nuxt', icon: 'nuxt.svg' },
  { name: 'GSAP', icon: 'gsap-light.png' },
  { name: 'GSAP', icon: 'gsap-dark.png' },
  { name: 'Tailwind', icon: 'tailwind.svg' },
  { name: 'GraphQL', icon: 'graphql.svg' },
  { name: 'Bun', icon: 'bun.svg' },
  { name: 'MySQL', icon: 'mysql.svg' },
  { name: 'PostgreSQL', icon: 'postgresql.svg' },
  { name: 'MongoDB', icon: 'mongodb.svg' },
  { name: 'Redis', icon: 'redis.svg' },
  { name: 'Figma', icon: 'figma.svg' },
  { name: 'GitHub', icon: 'github-dark.png' },
  { name: 'GitHub', icon: 'github-light.png' },
  { name: 'Git', icon: 'git.svg' },
];

const numbers = [
  { value: '+10', label: 'Anos de experiência' },
  { value: '+15', label: 'Clientes' },
  { value: '+20', label: 'Projetos entregues' },
];

export default function About() {
  return (
    <section className="w-full px-safe-offset-6 py-6 md:py-16 relative z-11 bg-neutral-100 dark:bg-neutral-900">
      <div className="max-w-(--max-content-width) mx-auto">
        <div className="flex flex-col md:flex-row gap-y-10 gap-x-12">
          <Photos />

          <div
            id="about"
            className="flex-1 text-[1.13rem]/[1.82rem] md:text-[1.28rem]/[2.35rem] space-y-5 scroll-mt-13"
          >
            <h3 className="text-primary text-center md:text-left text-base font-medium uppercase tracking-wider scroll-mt-6">
              Sobre
            </h3>

            {/* <div className="flex justify-evenly md:justify-between gap-3 text-[0.9em] mb-10">
              {numbers.map(({ value, label }) => (
                <div
                  className="not-md:text-center"
                  key={label}
                >
                  <strong className="font-medium text-[2em] text-primary/95">{value}</strong>
                  <div className="text-[0.95em]">{label}</div>
                </div>
              ))}
            </div> */}

            <p>
              Tenho <Age /> anos e atualmente moro no Ceará, Brasil. Sou
              apaixonado por programação <strong>há mais de 10 anos</strong> e
              aprendi tudo o que sei sozinho, movido pela curiosidade de saber
              como funciona a web, desde então, venho estudando novas linguagens
              programação e desenvolvendo websites.
            </p>
            <p>
              Tenho vasta experiência com JavaScript e PHP com Laravel para, mas
              estou sempre buscando ampliar meus conhecimentos. Cada projeto é
              uma oportunidade para aprender algo novo, sempre com foco na
              qualidade do produto final.
            </p>
            {/* <p>Você pode conferir minhas outras habilidades abaixo.</p> */}

            <a
              href="https://drive.google.com/file/d/1J1RBxhNYlWX5MmC5Q-2wUZxIxyFyYRZf/view"
              target="_blank"
              className="inline-flex items-center gap-2 p-1 text-[0.825em]/5 text-inherit hover:underline hover:text-primary transition-colors group -ml-1"
            >
              <DownloadIcon className="size-[1.16em] transition-transform group-hover:scale-115 group-hover:-rotate-12" />
              Ver currículo
            </a>

            <div className="font-semibold md:text-[1.3rem] tracking-wide mt-6">
              Minhas habilidades e ferramentas:
            </div>
            <div className="flex flex-row flex-wrap gap-2 md:gap-x-3 mt-5 text-center">
              {skills.map((skill) => (
                <span
                  key={skill.icon}
                  title={skill.name}
                  className={cn({
                    'block dark:hidden': skill.icon.includes('light'),
                    'hidden dark:block': skill.icon.includes('dark'),
                  })}
                >
                  <img
                    src={'/icons/' + skill.icon}
                    className="size-11 md:size-12 object-contain"
                    alt={skill.name + ' Logo'}
                  />
                  <span className="block text-[0.5rem] xl:text-[0.6rem] opacity-70 dark:opacity-52 mt-0">
                    {skill.name}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*<CommitsHistory />*/}
      <div className="block h-3" />
    </section>
  );
}
