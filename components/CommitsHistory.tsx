"use client";
import GitHubCalendar from 'react-github-calendar'
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, cloneElement } from "react";
import { FaGithub as GithubIcon } from "react-icons/fa6"
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import format from 'date-fns/format';
import posthog from 'posthog-js';

export default function CommitsHistory() {
  const [totalCount, setTotalCount] = useState(0)
  const { theme, systemTheme } = useTheme()
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current) {
      const scrollElement = wrapperRef.current.querySelector('.react-activity-calendar__scroll-container') as HTMLDivElement
      const scrollLeft = scrollElement.scrollWidth
      scrollElement.scrollTo({ left: scrollLeft })
    }
  }, [totalCount]);
  
  function handleLinkClick() {
    posthog.capture('github_link_click', { location: 'commits_graph' });
  }

  return (
    <div className="w-fit max-w-full mx-auto mt-16 md:mt-22">
      <div className="flex items-center justify-between flex-wrap gap-y-1 gap-x-2 mb-4">
        <h3 className="text-xl font-medium tracking-wider">{totalCount || 'Histórico de'} Commits no GitHub</h3>
        <a href="https://github.com/iagobruno" target="_blank" onClick={handleLinkClick} className="text-sm flex items-center gap-1.5 ml-auto">
          <GithubIcon className="size-4.5" />
          <span>Ver tudo</span>
        </a>
      </div>

      <div className="max-w-full overflow-x-auto" ref={wrapperRef}>
        <GitHubCalendar
          username="iagobruno"
          year="last"
          colorScheme={(theme === 'system' ? systemTheme : theme) === 'dark' ? 'dark' : 'light'}
          theme={{
            light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
            dark: ["#0A0A0A", "#0e4429", "#006d32", "#26a641", "#39d353"],
          }}
          blockSize={13}
          showWeekdayLabels
          hideTotalCount
          labels={{
            months: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            weekdays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            totalCount: '{{count}} contribuições em {{year}}',
            legend: {
              less: 'Menos',
              more: 'Mais',
            },
          }}
          fontSize={12}
          blockMargin={5}
          renderBlock={(block, activity) =>
            cloneElement(block, {
              'data-tooltip-id': 'commit',
              'data-tooltip-content': `${activity.count} commits em ${format(new Date(activity.date+' 00:00:00'), 'dd/MM/yyyy')}`,
              'data-tooltip-place': 'top',
            })
          }
          transformData={contributions => {
            if (!totalCount) setTotalCount(contributions.reduce((acc, curr) => acc + curr.count, 0));
            return contributions;
          }}
        />
        <ReactTooltip id="commit" />
      </div>
    </div>
  )
}
