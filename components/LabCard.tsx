import { GoArrowUpRight as ArrowForward } from "react-icons/go";
import { FaGithub as GithubIcon } from "react-icons/fa6"
import { cn } from '@/lib/utils'

export default function LabCard ({ title, description, image, link, repo }) {
  return (
    <article className={cn(
      'group/card',
      'rounded-xl border flex flex-col relative overflow-hidden transition-colors duration-800',
      'border-neutral-200 dark:border-neutral-800',
      'bg-radial-[at_center_70%] from-primary/23 to-white dark:from-[#082838] dark:to-neutral-950 hover:!from-primary/50',
    )}>
      <header className="px-6 pt-4.5 pb-4 flex-1 flex flex-col">
        <h4 className="text-[1.3rem] font-semibold group-hover/card:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm mt-2 opacity-85 flex-1">
          {description}
        </p>

        <div className="flex justify-between -mx-1 mt-3">
          {link && (
            <MiniButton href={link} target="_blank" className="origin-left group-has-[.card-link:hover]/card:bg-primary dark:group-has-[.card-link:hover]/card:bg-white group-has-[.card-link:hover]/card:text-white dark:group-has-[.card-link:hover]/card:text-black group-has-[.card-link:hover]/card:scale-105 group-has-[.card-link:active]/card:!scale-95">Ver demo</MiniButton>
          )}
          {repo && (
            <MiniButton href={repo} target="_blank" className={cn('!z-10 ml-auto origin-right hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-black hover:scale-105 active:!scale-95', {
              'group-has-[.card-link:hover]/card:bg-primary dark:group-has-[.card-link:hover]/card:bg-white group-has-[.card-link:hover]/card:text-white dark:group-has-[.card-link:hover]/card:text-black group-has-[.card-link:hover]/card:scale-105 group-has-[.card-link:active]/card:!scale-95': !link,
            })}>
              <GithubIcon className="size-4" />
            </MiniButton>
          )}
        </div>
      </header>

      <div className="relative aspect-video overflow-hidden border-t border-neutral-800/10 dark:border-neutral-800/60">
        {image && (
          <img src={image} className="object-cover size-full w-full group-hover/card:scale-105 transition-all duration-500" />
        )}
        {!image && (
          <GithubIcon className="size-[40%] opacity-60 absolute top-2/4 left-2/4 -translate-2/4 group-hover/card:scale-112 group-hover/card:-rotate-10 transition-transform" />
        )}
      </div>

      {(link || repo) && (
        <a href={link || repo} target="_blank" className="card-link absolute inset-0 z-5"></a>
      )}

      <div className="absolute inset-x-0 z-10 h-px bottom-0 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover/card:opacity-80 scale-x-70 group-hover/card:scale-x-110 transition-all duration-300" />
    </article>
  )
}

const MiniButton = ({ children, className, href }) => (
  <a className={cn('inline-flex items-center gap-1 rounded-full hover:scale-105 focus:outline-none transition bg-white dark:bg-gray-50/10 text-black dark:text-white shadow-md dark:shadow-lg shadow-black/20 text-xs font-medium pr-3 pl-3.5 py-2 no-underline! relative', className)} href={href} target="_blank">
    {children}
    <ArrowForward className="size-3.5" />
  </a>
)
