'use client';
import { useState, cloneElement, useEffect, useRef } from 'react';
import { createPortal, flushSync } from 'react-dom';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { IoClose as CloseIcon } from 'react-icons/io5';

export default function ClickToExpandImg({ children }) {
  const [expanded, setExpanded] = useState(false);
  const thumbnailRef = useRef<HTMLImageElement | null>(null);
  const src = children.props.src;

  function handleClick(e: React.MouseEvent<HTMLImageElement>) {
    if (children.props.onClick) children.props.onClick(e);

    const el = e.currentTarget;
    thumbnailRef.current = el;

    flushSync(() => setExpanded(true));

    const img = document.querySelector('.image-fullscreen img') as HTMLElement;
    const overlay = document.querySelector('.image-fullscreen') as HTMLElement;
    if (!img || !overlay) return;

    const rect = el.getBoundingClientRect();
    const to = img.getBoundingClientRect();
    const scaleX = rect.width / to.width;
    const scaleY = rect.height / to.height;
    const dx = rect.left + rect.width / 2 - (to.left + to.width / 2);
    const dy = rect.top + rect.height / 2 - (to.top + to.height / 2);
    const rotation = getRotationDeg(el);

    gsap.fromTo(
      img,
      {
        scaleX,
        scaleY,
        x: dx,
        y: dy,
        rotation,
        transformOrigin: 'center center',
      },
      {
        scaleX: 1,
        scaleY: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.4,
        ease: 'power2.out',
      }
    );
  }

  function handleClose() {
    const overlay = document.querySelector('.image-fullscreen') as HTMLElement;
    const img = overlay.querySelector('img') as HTMLElement;
    if (!overlay || !img || !thumbnailRef.current) {
      return setExpanded(false);
    }

    gsap.killTweensOf(img);
    gsap.killTweensOf(overlay);

    const from = img.getBoundingClientRect();
    const to = thumbnailRef.current.getBoundingClientRect();
    const scaleX = to.width / from.width;
    const scaleY = to.height / from.height;
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);

    gsap.timeline().to(img, {
      scaleX,
      scaleY,
      x: dx,
      y: dy,
      rotation: 0,
      duration: 0.4,
      ease: 'power3.out',
    });

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power4.out',
      onComplete: () => setExpanded(false),
    });
  }

  // Lógica para fehcar o modal
  useEffect(() => {
    if (!expanded) return;
    const initialScrollY = window.scrollY;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') handleClose();
    }
    function onScroll() {
      const distanceToClose = 60;
      if (Math.abs(window.scrollY - initialScrollY) > distanceToClose) {
        handleClose();
      }
    }
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [expanded]);

  return (
    <>
      {cloneElement(children, {
        onClick: handleClick,
        className: cn(children.props.className, 'cursor-zoom-in'),
      })}

      {expanded &&
        createPortal(
          <div
            className="image-fullscreen overscroll-contain fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/90 transition-colors duration-160 starting:bg-transparent"
            onClick={handleClose}
            onPointerMove={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onPointerUp={(e) => e.stopPropagation()}
          >
            <CloseIcon
              className="size-11 text-white absolute top-2 right-2 z-10 p-1.5 cursor-pointer transition-transform active:scale-80"
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            />
            <img
              src={src}
              className="max-h-[86vh] max-w-[92vw] object-cover rounded-md"
            />
          </div>,
          document.body
        )}
    </>
  );
}

function getRotationDeg(el: HTMLElement): number {
  const style = getComputedStyle(el);
  const rotate = style.rotate;
  if (rotate && rotate !== 'none') {
    const match = rotate.match(/([-\d.]+)deg/);
    if (match) return parseFloat(match[1]);
  }
  const transform = style.transform;
  if (transform === 'none') return 0;
  const values = transform.match(/matrix\(([^)]+)\)/)?.[1];
  if (!values) return 0;
  const [a, b] = values.split(',').map(Number);
  return Math.atan2(b, a) * (180 / Math.PI);
}
