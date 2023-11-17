import { useMemo } from 'react'
import { differenceInYears } from 'date-fns'
import SlideShow from './SlideShow'

export default function About() {
    const age = useMemo(() => {
        return differenceInYears(Date.now(), new Date(1996, 7, 26))
    }, [])

    return (
        <section id="about" className="w-full py-20 px-6 bg-neutral-100">
            <div className="max-w-[--max-content-width] mx-auto">
                <div className="flex flex-col md:flex-row items-start gap-7">
                    <SlideShow />

                    <div className="grow text-lg space-y-5">
                        <h3 className="text-md text-sky-600 font-medium uppercase">Sobre mim</h3>
                        <p>Tenho {age} anos e atualmente moro no Ceará, Brasil. Sou apaixonado por programação há mais de 8 anos e aprendi tudo o que sei sozinho, movido pela curiosidade de saber como funciona a web, desde então, venho estudando novas linguagens programação, desenvolvendo websites e ajudando em projetos open source.</p>
                        <p>JavaScript é a linguagem com a qual tenho mais confiança para trabalhar (tanto no lado cliente quanto no lado servidor) e atualmente estou estudando PHP com Laravel para ampliar meus conhecimentos.
                        <br/>
                        Você pode conferir minhas outras habilidades abaixo.</p>
                    </div>
                </div>
                <div className="font-semibold text-lg mt-8">Minhas habilidades e ferramentas:</div>
                <div className="flex flex-row flex-wrap gap-2 mt-4">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40px" height="40px" title="NodeJS" alt="NodeJS Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40px" height="40px" title="TypeScript" alt="TypeScript Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain-wordmark.svg" width="40px" height="40px" title="Laravel" alt="Laravel Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" width="40px" height="40px" title="Docker" alt="Docker Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40px" height="40px" title="React" alt="ReactJS Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="40px" height="40px" title="Redux" alt="Redux Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg" width="40px" height="40px" title="NextJS" alt="NextJS Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" width="40px" height="40px" title="Vue" alt="Vue Logo"/>
                    <img src="https://user-images.githubusercontent.com/76392681/118611629-b0174280-b7da-11eb-83f2-1d119bd786be.png" width="34px" height="40px" title="Svelte" alt="Svelte Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="40px" height="40px" title="Tailwind CSS" alt="Tailwind Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" width="40px" height="40px" title="GraphQL" alt="GraphQL Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="40px" height="40px" title="Jest" alt="Jest Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" width="40px" height="40px" title="Git" alt="Git Logo"/>
                    <picture>
                        <source srcSet="https://user-images.githubusercontent.com/3369400/139447912-e0f43f33-6d9f-45f8-be46-2df5bbc91289.png#gh-dark-mode-only" media="(prefers-color-scheme: dark)"/>
                        <img src="https://user-images.githubusercontent.com/3369400/139448065-39a229ba-4b06-434b-bc67-616e2ed80c8f.png#gh-light-mode-only" width="40px" height="40px" title="GitHub" alt="GitHub Logo"/>
                    </picture>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="40px" height="40px" title="npm" alt="Node Package Manager Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original-wordmark.svg" width="40px" height="40px" title="HTML" alt="HTML5 Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" width="40px" height="40px" title="CSS" alt="CSS3 Logo"/>
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" width="40px" height="40px" title="SASS" alt="SASS Logo"/>
                </div>
            </div>
        </section>
    )
}
