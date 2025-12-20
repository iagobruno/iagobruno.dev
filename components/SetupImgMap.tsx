'use client';
import { useRef, type MouseEvent } from 'react';
import { list as devices } from '@/app/(pages)/uses/devices';
import useIsMobile from '@/hooks/useIsMobile';

export default function SetupImgMap() {
  const setupDevices = devices.filter(
    (item) => item.displayOnImgMap && typeof item.position !== 'undefined'
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const currentCaption = useRef<HTMLElement>(null);
  const currentPathLine = useRef<any>(null);
  const isMobile = useIsMobile();

  function handleItemMouseEnter(
    evt: MouseEvent,
    item: (typeof devices)[number]
  ) {
    const caption = document.createElement('div');
    caption.className =
      'caption text-base px-2 absolute -translate-y-2/4 max-w-[200px] w-full transition-opacity duration-400 opacity-0';
    caption.style.top = item.position![0] + '%';
    caption.style[item.position![1] >= 50 ? 'left' : 'right'] =
      'calc(100% + 12px)';
    caption.style.textAlign = item.position![1] >= 50 ? 'left' : 'right';
    caption.innerText = item.name;
    containerRef.current?.append(caption);
    currentCaption.current = caption;

    const pointElement = evt.target;
    // @ts-ignore
    const line = new LeaderLine(pointElement, caption, {
      color: 'white',
      size: 3,
      path: 'straight',
      endPlug: 'behind',
      hide: true,
      showEffectName: 'none',
      animOptions: {
        duration: 0,
      },
    });
    console.log(line);
    currentPathLine.current = line;

    line.show('draw', { duration: 400 });
    setTimeout(() => {
      caption.classList.remove('opacity-0');
    }, 400);
  }

  function handleItemMouseLeave() {
    currentPathLine.current?.remove();
    currentCaption.current?.remove();
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <img
        src="/images/workstation.jpeg"
        className="aspect-800/480 w-full rounded-lg object-cover object-center mt-7"
        alt="Meu mesa de trabalho"
      />

      {!isMobile &&
        setupDevices.map((item) => (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -translate-2/4 p-2 opacity-70 hover:opacity-100 hover:scale-135 transition-all"
            style={{
              top: `${item.position![0]}%`,
              left: `${item.position![1]}%`,
            }}
            onMouseEnter={(evt) => handleItemMouseEnter(evt, item)}
            onMouseLeave={handleItemMouseLeave}
          >
            <div className="relative rounded-full size-1.5 md:size-[0.6rem] bg-white">
              <span className="animate-[point-expand_2.6s_linear_infinite] bg-white/100 rounded-full absolute size-full inset-0 block pointer-events-none" />
            </div>
          </a>
        ))}
    </div>
  );
}
