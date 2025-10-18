import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

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
        "inline-block group/button bg-primary text-white! text-sm md:text-base uppercase tracking-wide rounded-full px-6 cursor-pointer no-underline! overflow-hidden transition-all duration-300 [-webkit-tap-highlight-color:transparent] hover:shadow-lg active:scale-95",
        {
          'hover:-rotate-3 hover:scale-110 hover:px-8': growOnHover
        },
        className
      )}
    >
      <div className="h-[2.5rem] md:h-[2.6rem]">
        <div className="transition-transform duration-[350ms] ease-in-out translate-y-0 group-hover/button:-translate-y-2/4">
          <div className="py-[0.57rem] flex items-center gap-1.5">{children}</div>
          <div className="py-[0.57rem] flex items-center gap-1.5">{children}</div>
        </div>
      </div>
    </a>
  )
}
