import React from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { siteContent } from '@/config/siteContent';
import { Badge } from '@/components/ui/Badge';
import type { Project } from '@/features/portfolio/schemas/projectSchema';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { portfolio } = siteContent;

  return (
    <article className="rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md overflow-hidden flex flex-col h-full min-w-0">
      <img
        src={project.image_url}
        alt={project.title}
        loading="lazy"
        className="aspect-video w-full object-cover object-top border-b border-border"
      />

      <div className="p-6 flex flex-col gap-3 flex-1 min-w-0">
        <Badge variant="primary" className="self-start max-w-full">
          <TrendingUp className="mr-1.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{project.metric_highlight}</span>
        </Badge>

        <h3
          title={project.title}
          className="text-2xl font-semibold leading-none tracking-tight break-words line-clamp-2"
        >
          {project.title}
        </h3>

        <p className="text-base text-muted-foreground leading-7 break-words line-clamp-4">
          {project.description}
        </p>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between gap-4">
        <ul
          aria-label={portfolio.techStackAriaLabel}
          className="flex flex-wrap items-center gap-2 min-w-0"
        >
          {project.tech_stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        {project.live_url ? (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${portfolio.liveProjectLabel}: ${project.title}`}
            className="inline-flex shrink-0 items-center justify-center rounded-md p-2 text-primary transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
};

