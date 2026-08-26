import { forwardRef, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import useIsMounted from '@/hooks/useIsMounted';
import { cn } from '@/lib/utils';

const cards = [
  '/images/descontai-print.jpg',
  '/images/danc-print.png',
  '/images/voltsolar-print.jpg',
  '/images/safepag-dash.png',
  '/images/filament-print.png',
  // '/images/hero-design.png',
  '/images/aurenpay-print.png',
];

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (element: HTMLElement, slot: Slot, skew: number, index: number = 0) => {
  const t = gsap.set(element, {
    x: slot.x,
    y: 800,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });
  gsap.fromTo(
    element,
    {
      y: t.vars.y,
    },
    {
      y: slot.y,
      duration: 2,
      ease: 'elastic.out(1,0.8)',
      delay: index * 0.16,
    },
  );
};

export default function HeroCards({
  cardDistance = 30,
  verticalDistance = 100,
  delay = 4000,
  skewAmount = 6,
}) {
  const config = {
    ease: 'elastic.out(0.6,0.9)',
    durDrop: 2,
    durMove: 2,
    durReturn: 2,
    promoteOverlap: 0.9,
    returnDelay: 0.05,
  };

  const isMounted = useIsMounted();
  const container = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const children = useMemo(
    () =>
      cards.map((img, i) => (
        <Card
          key={i}
          image={img}
          ref={(ref) => {
            refs.current[i] = ref;
          }}
        />
      )),
    [cards],
  );

  const order = useRef<number[]>(Array.from({ length: children.length }, (_, i) => i));

  useEffect(() => {
    const total = refs.current.length;
    refs.current.forEach((r, i) =>
      placeNow(r!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount, i),
    );

    function swap() {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs.current[front]!;
      const tl = gsap.timeline();

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs.current[idx]!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.current.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`,
        );
      });

      const backSlot = makeSlot(
        refs.current.length - 1,
        cardDistance,
        verticalDistance,
        refs.current.length,
      );
      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return',
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        'return',
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    }

    // swap();
    const intervalRef = window.setInterval(swap, delay);

    return () => {
      clearInterval(intervalRef);
    };
  }, [cardDistance, verticalDistance, delay, skewAmount]);

  return (
    <>
      {/* Mobile */}
      <div className="2xl:hidden absolute z-1 top-full -mt-0 left-0 w-full aspect-16/10 pointer-events-none">
        {cards.map((img, i) => (
          <Card
            key={i}
            image={img}
            className="top-0 left-0 [&_.browser-toolbar]:hidden"
            style={{
              zIndex: 10 - i,
              marginTop: -(22 * i) - 22,
              transform: `scale(${1 - (0.06 * i) - 0.06})`,
              filter: `blur(${0.4 * i}px)`,
            }}
          />
        ))}
      </div>

      {/* Desktop */}
      <div className="not-2xl:hidden absolute z-1 top-2/4 left-2/4 -translate-2/4 h-full w-full max-w-[2000px] max-h-[1800px] pointer-events-none">
        <div
          ref={container}
          className="header-cards h-[45%] max-h-[550px] aspect-16/10 absolute bottom-0 right-0 transform translate-x-[2%] translate-y-[10%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55] transition-opacity duration-1200"
          style={{
            opacity: isMounted ? 1 : 0,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  image: string;
  customClass?: string;
  style?: Record<string, any>;
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, image, style, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={cn(
        `size-full absolute top-1/2 left-1/2 rounded-lg overflow-clip bg-black shadow-xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]`,
        customClass,
        rest.className,
      )}
      style={style}
    >
      <img
        src="/images/safari-toolbar.png"
        fetchPriority="high"
        className="browser-toolbar"
      />
      <picture>
        <source
          srcSet={image.replace(/\.(jpe?g|png|webp)$/i, '.avif')}
          type="image/avif"
        />
        <img
          src={image}
          fetchPriority="high"
          className={cn('size-full object-cover object-top block', {
            'object-left!': image.includes('safepag'),
          })}
        />
      </picture>
    </div>
  ),
);
Card.displayName = 'Card';
