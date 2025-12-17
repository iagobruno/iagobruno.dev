"use client";
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import posthog from 'posthog-js';

export default function ProjectsMoreSection({ className = '' }) {
  return (
    <div className={cn(`text-center max-w-[340px] mx-auto mt-12`, className)}>
      <div className="opacity-[85%]">
        E muitos outros pequenos projetos, experimentos e estudo de caso no meu
        perfil no Github.
      </div>
      <Button
        href="https://github.com/iagobruno"
        className="mt-4"
        onClick={() => posthog.capture('github_link_click')}
      >
        Seguir no GitHub
      </Button>
    </div>
  );
}
