import type { PropsWithChildren } from 'react'
import { cn } from '../helpers'

interface Props extends PropsWithChildren {
  href: string,
  target?: '_blank',
  className?: string,
  growOnHover?: boolean,
  [prop: string]: unknown
}

export default function Button({ children, className, growOnHover = true , ...props }: Props) {
  return (
    <a
      {...props}
      className={cn(
        "inline-block group/button bg-sky-500 !text-white text-sm md:text-base uppercase tracking-wide rounded-full px-6 cursor-pointer !no-underline overflow-hidden transition-all duration-300 [-webkit-tap-highlight-color:transparent]",
        {
          'hover:-rotate-3 hover:scale-[1.06] hover:px-8': growOnHover
        },
        className
      )}
    >
      <div className="h-[2.25rem] md:h-[2.5rem]">
        <div className="transition-transform duration-[350ms] ease-in-out translate-y-0 group-hover/button:-translate-y-2/4">
          <div className="py-2">{children}</div>
          <div className="py-2">{children}</div>
        </div>
      </div>
    </a>
  )
}
