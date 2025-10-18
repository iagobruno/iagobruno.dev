"use client";
import { useRef } from "react";
import Button from "./Button";
import { GoArrowUpRight as ArrowForward } from "react-icons/go";
import { FaGithub as GithubIcon } from "react-icons/fa6"
import type { Project } from "./Projects";

interface CardProps {
  project: Project;
}

export default function ProjectCard({ project }: CardProps) {
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleTransformation (evt: React.PointerEvent<HTMLImageElement>) {
    if (evt.pointerType !== "mouse") return;

    const {
      left,
      top,
      width: w,
      height: h,
    } = evt.currentTarget.getBoundingClientRect();
    const x = evt.clientX - left;
    const y = evt.clientY - top;

    imgWrapperRef.current!.style.setProperty(
      'transform',
      `perspective(1000px) rotateX(${
          (y / h - 0.5) * 25
      }deg) rotateY(${(x / w - 0.5) * -25}deg)`,
    );
    imgRef.current!.style.setProperty(
      'box-shadow',
      `${(x / w - 0.5) * 28}px 10px 20px rgb(var(--shadow-color) / 16%)`
    );
  }

  function handleMouseEnter(evt) {
    if (evt.pointerType !== "mouse") return;

    setTimeout(() => {
      imgWrapperRef.current!.style.setProperty(
        'transition-duration',
        '0s'
      );
      imgRef.current!.style.setProperty(
        'transition-duration',
        '0s'
      );
    }, 400);
  }

  function handleMouseLeave(evt) {
    if (evt.pointerType !== "mouse") return;

    imgWrapperRef.current!.style.removeProperty('transform');
    imgWrapperRef.current!.style.removeProperty('transition-duration');
    imgRef.current!.style.removeProperty('transition-duration');
    imgRef.current!.style.removeProperty('box-shadow');
  }

  return (
    <div
      className="project group/card text-neutral-950 dark:text-neutral-200! flex gap-y-2 gap-x-8 md:items-center flex-col md:odd:flex-row md:even:flex-row-reverse"
    >
      <div
        ref={imgWrapperRef}
        className="project-img-wrapper w-full md:w-[46%] md:min-w-[46%] transition-transform duration-[400ms]"
        onPointerMove={handleTransformation}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={project.image}
          className="object-cover object-top relative z-1 bg-white/20 w-full aspect-16/10 rounded-xl border border-stone-400/40 dark:border-white/5"
          loading="lazy"
        />
      </div>

      <div className="grow md:group-even/card:text-right">
        <div className="font-medium text-[1.65rem]/[2rem]">{project.title}</div>
        <div className="mt-0.5">
          <span className="opacity-90">{project.year}</span>
          {project.current && (
            <>{' '}- <span className="text-primary font-semibold">ATUAL</span></>
          )}
        </div>
        <p
          className="text-base xl:text-[1.1em] opacity-90 my-2 mb-3 md:mb-6 md:w-[80%] md:group-even/card:ml-auto"
          dangerouslySetInnerHTML={{__html: project.description.replaceAll('\n','<br/>')}}
        />
        {project.url && (
          <Button href={project.url} target="_blank" growOnHover className="dark:bg-white/26 !px-4 !rotate-0 md:group-odd/card:origin-left md:group-even/card:origin-right dark:hover:bg-white dark:hover:!text-black">
            {project.url.includes('github.com') && (
              <GithubIcon className="size-4.5 mr-0.5" />
            )}
            Ver {project.url.includes('github.com') ? 'no Github' : 'projeto'}
            <ArrowForward className="size-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
