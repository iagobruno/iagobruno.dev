import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import Hero from '@/components/Hero'
import { parseStringPromise as parseXML } from 'xml2js'
import getFileLastUpdateDate from '@/lib/getFileLastUpdate'

export default async function Page() {
  const lastUpdate = getFileLastUpdateDate(import.meta.url);
  const topArtists = await getMyTopArtists();

  return (
    <div className="[--max-content-width:800px] px-safe-offset-7">
      <Hero className="px-0" />

      <div className="w-full max-w-(--max-content-width) mx-auto pb-20">
        <header className="pt-6 pb-4 dark:text-white">
          <div className="dark:text-white text-base font-medium uppercase tracking-wider opacity-70 dark:opacity-85 mb-1.5">
            Now
          </div>
          <h3 className="text-3xl/10 md:text-[2.4rem]/11 font-semibold dark:text-white dark:drop-shadow-md max-w-[600px]">
            O que estou fazendo agora?
          </h3>
          <p className="mt-3.5">
            Atualizado em {lastUpdate}
          </p>
        </header>

        <main className={cn([
          'text-lg',
          '[&_p]:my-2 [&_p]:leading-relaxed',
          '[&_h4]:text-2xl [&_h4]:font-semibold [&_h4]:mt-12 [&_h4]:mb-2',
          '[&_blockquote]:border-l-4 [&_blockquote]:border-black/25 [&_blockquote]:dark:border-white/20 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:mt-3 [&_blockquote]:mb-6',
          '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-2 [&_ul]:mb-6',
        ])}>
          <h4>💼 Profissional</h4>
          <p>No momento estou me realocando no mercado enquanto trabalho em um projeto pessoal para lançar nos próximos meses.</p>
          <p>Além disso, venho testando usar mais IA para ser mais produtivo, após constatar que estou ficando para trás em relação a outros devs.</p>

          <h4>🏠 Pessoal</h4>
          <p>Estou voltando a fazer atividades físicas para melhorar meu humor e clareza dos meus pensamentos. Uso o app Fitness da Apple para registrar meus treinos e me manter motivado.</p>
          <p>Frequentemente faço trilhas e gosto de acampar com amigos. Sou um amante da natureza.</p>

          <h4>📚 Estudando</h4>
          <p>No momento estou estudando outras áreas além de programação, como psicologia, marketing e gestão de negócios.</p>
          <p>Tenho revisado meu inglês constantemente para não perder a fluência.</p>
          <p>Também estou tentando melhorar minhas soft skills.</p>

          <h4>📺  Assistindo</h4>
          <p>
            Estou reassistindo alguns filmes que vi quando era mais novo, mas não tinha maturidade para entender todas as nuances do roteiro.
          </p>

          <h4>🎶 Ouvindo</h4>
          <p>
            Artistas que estou ouvindo ultimamente de acordo com meu <a href="https://www.last.fm/user/httpiago" target="_blank">perfil no last.fm</a>:
          </p>
          <ul>
            {topArtists.map(artist => (
              <li>{artist}</li>
            ))}
          </ul>

          <h4>💭 Frase do momento</h4>
          <blockquote>
            "Nenhum vento favorece quem não sabe onde ir."<br/>
            ― Sêneca
          </blockquote>

          <footer className="mt-15 text-[0.92rem] opacity-60 dark:opacity-70">
            A ideia aqui é manter uma página atualizada contando o que estou fazendo ultimamente. <br/>
            Baseado na ideia da <a href="https://nownownow.com/about" target="_blank">página now</a> do Derek Sivers.
          </footer>
        </main>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Agora',
}


async function getMyTopArtists() {
  try {
    const response = await fetch('https://lfm.xiffy.nl/httpiago/topartists?period=1month');
    const xmlString = await response.text();
    const result = await parseXML(xmlString);

    const list = result?.rss?.channel?.[0]?.item ?? [];
    const top5 = list.slice(0, 5).map(item => item.title[0]);
    // console.log('top5', top5)

    return top5;
  } catch (error) {
    return [];
  }
}
