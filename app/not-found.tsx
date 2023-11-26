import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-center space-y-5 dark:drop-shadow-md">
      <h2 className="text-8xl font-bold tracking-widest">404</h2>
      <p className="text-lg">Página não encontrada</p>
      <Link href="/">Página inicial</Link>
    </div>
  )
}

export const metadata = {
  title: 'Página não encontrada',
}
