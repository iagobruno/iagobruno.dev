'use client';
import { useRef, useEffect, useState, useMemo, useId } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface CurvedLoopProps {
  marqueeText?: string;
  className?: string;
  curveAmount?: number;
}

export default function CurvedMarquee({
  marqueeText = '✦ Vamos tirar sua ideia do papel',
  curveAmount = -205,
  className,
}: CurvedLoopProps) {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (
      (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0'
    );
  }, [marqueeText]);

  const measureRef = useRef<SVGTextElement | null>(null);
  const textPathRef = useRef<SVGTextPathElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [spacing, setSpacing] = useState(0);
  const uid = useId();
  const pathId = `curve-${uid}`;
  const pathD = `M-100,40 Q500,${40 + curveAmount} 1540,40`;

  const stRef = useRef<ScrollTrigger | null>(null);

  const textLength = spacing;
  const totalText = textLength
    ? Array(Math.ceil(1800 / textLength) + 2)
        .fill(text)
        .join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    if (measureRef.current)
      setSpacing(measureRef.current.getComputedTextLength());
  }, [text, className]);

  useEffect(() => {
    if (!spacing || !ready) return;
    const el = textPathRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const xOffset = 250;
      const tween = gsap.fromTo(
        el,
        { attr: { startOffset: -spacing - xOffset + 'px' } },
        {
          attr: { startOffset: -xOffset + 'px' },
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 3,
          },
        }
      );
      const st = tween.scrollTrigger;
      if (st) stRef.current = st;
    });

    return () => ctx.revert();
  }, [spacing, ready]);

  return (
    <div
      ref={containerRef}
      className="w-full overflow-clip pt-5 bg-white dark:bg-neutral-950 select-none"
    >
      <svg
        className="select-none w-full overflow-visible block aspect-[100/12] text-[4.2rem] md:text-[3rem] font-bold uppercase tracking-wide md:tracking-wider leading-none translate-y-[56%]"
        style={{
          visibility: ready ? 'visible' : 'hidden',
        }}
        viewBox="0 0 1440 120"
      >
        <text
          ref={measureRef}
          xmlSpace="preserve"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>
        <defs>
          <path
            ref={pathRef}
            id={pathId}
            d={pathD}
            fill="none"
            stroke="transparent"
          />
        </defs>
        {ready && (
          <>
            <path
              d={pathD}
              fill="none"
              strokeLinecap="round"
              className="-translate-y-6 md:-translate-y-5 stroke-black/92 dark:stroke-white stroke-[130px] md:stroke-[80px]"
            />
            <text
              xmlSpace="preserve"
              className={`fill-white dark:fill-black ${className ?? ''}`}
            >
              <textPath
                ref={textPathRef}
                href={`#${pathId}`}
                startOffset={-spacing + 'px'}
                xmlSpace="preserve"
              >
                {totalText}
              </textPath>
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
