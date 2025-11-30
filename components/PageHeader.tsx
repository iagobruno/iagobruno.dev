import { cn } from '@/lib/utils';

interface Props {
  overline?: string;
  subHeading?: string;
  heading: string;
  className?: string;
}

export default function PageHeader({
  overline,
  subHeading,
  heading,
  className = '',
}: Props) {
  return (
    <header
      className={cn(
        'md:pt-6 pb-4 dark:text-white not-prose max-w-(--max-content-width) mx-auto',
        className
      )}
    >
      {overline && (
        <div className="dark:text-white text-base font-medium uppercase tracking-wider opacity-70 dark:opacity-85 mb-1.5">
          {overline}
        </div>
      )}

      <h3 className="text-3xl/10 md:text-[2.4rem]/11 font-semibold dark:text-white dark:drop-shadow-md max-w-[600px]">
        {heading}
      </h3>

      {subHeading && <p className="text-[1.17rem] mt-3">{subHeading}</p>}
    </header>
  );
}
