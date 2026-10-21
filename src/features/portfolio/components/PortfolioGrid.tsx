import React from 'react';
import { siteContent } from '@/config/siteContent';
import { useProjects } from '@/features/portfolio/hooks/useProjects';
import { ProjectCard } from '@/features/portfolio/components/ProjectCard';
import { ProjectCardSkeleton } from '@/features/portfolio/components/ProjectCardSkeleton';

const SKELETON_COUNT = 3;
const GRID_CLASSES = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6';

export const PortfolioGrid: React.FC = () => {
  const { portfolio } = siteContent;
  const { projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div
        role="status"
        aria-busy="true"
        aria-label={portfolio.loadingAriaLabel}
        className={GRID_CLASSES}
      >
        {Array.from({ length: SKELETON_COUNT }, (_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="text-sm font-medium text-destructive">
        {portfolio.errorState}
      </p>
    );
  }

  if (projects.length === 0) {
    return <p className="text-base text-muted-foreground leading-7">{portfolio.emptyState}</p>;
  }

  return (
    <div className={GRID_CLASSES}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

