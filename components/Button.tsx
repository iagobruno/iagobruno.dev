import { useRef, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import useMount from 'react-use/esm/useMount';
import gsap from 'gsap';

interface Props extends PropsWithChildren {
  href: string;
  target?: '_blank';
  className?: string;
  growOnHover?: boolean;
  [prop: string]: unknown;
}

export default function Button({
  children,
  className,
  growOnHover = true,
  ...props
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useMount(() => {
    const strength = 0.2;
    const btnElement =
      containerRef.current!.querySelector<HTMLElement>('.group\\/button')!;
    const zoneElement =
      containerRef.current!.querySelector<HTMLElement>('.zone')!;
    const btnWidth = btnElement.getBoundingClientRect().width + 4;

    containerRef.current!.style.width = btnWidth + 'px';
    containerRef.current!.style.height =
      btnElement.getBoundingClientRect().height + 'px';
    zoneElement.style.width = btnWidth + 50 + 'px';
    zoneElement.classList.add(
      'absolute',
      'left-2/4',
      'top-2/4',
      '-translate-2/4',
      'rounded-full',
      'aspect-5/3'
      // 'bg-red-500',
    );
    btnElement.classList.add('absolute', 'top-2/4', 'left-2/4');
    btnElement.style.transform = 'translate(-50%, -50%)';
    btnElement.style.width = btnWidth + 'px';

    zoneElement.addEventListener('mousemove', function (e) {
      var rect = zoneElement.getBoundingClientRect();
      var mapX = gsap.utils.mapRange(
        rect.left,
        rect.right,
        -rect.width / 2,
        rect.width / 2,
        e.clientX
      );
      var mapY = gsap.utils.mapRange(
        rect.top,
        rect.bottom,
        -rect.height / 2,
        rect.height / 2,
        e.clientY
      );

      gsap.to(btnElement, {
        transform: `translate(calc(-50% + ${mapX * strength}px), calc(-50% + ${mapY * strength}px))`,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: true,
      });
    });

    zoneElement.addEventListener('mouseleave', function () {
      gsap.to(btnElement, {
        transform: `translate(-50%, -50%)`,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  });

  return (
    <div ref={containerRef} className="relative inline-block">
      <div className="zone inline-block">
        <div className="group/button inline-block">
          <a
            {...props}
            className={cn(
              'inline-block bg-primary text-white! text-sm md:text-base uppercase tracking-wide rounded-full px-6 cursor-pointer no-underline! overflow-hidden transition-all duration-300 [-webkit-tap-highlight-color:transparent] hover:shadow-lg active:scale-95',
              {
                'hover:-rotate-3 hover:scale-110 dark:hover:bg-white dark:hover:!text-black':
                  growOnHover,
              },
              className
            )}
          >
            <div className="h-[2.5rem] md:h-[2.6rem]">
              <div className="transition-transform duration-[350ms] ease-in-out translate-y-0 group-hover/button:-translate-y-2/4">
                <div className="py-[0.57rem] flex items-center gap-1.5">
                  {children}
                </div>
                <div className="py-[0.57rem] flex items-center gap-1.5">
                  {children}
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
