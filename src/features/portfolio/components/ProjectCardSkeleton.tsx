import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col h-full min-w-0">
      <Skeleton className="aspect-video w-full rounded-none border-b border-border" />

      <div className="p-6 flex flex-col gap-3 flex-1">
        <Skeleton className="h-7 w-40" />
        <Skeleton className="h-6 w-4/5" />
        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>

      <div className="p-6 pt-0 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-7 w-14" />
        </div>
        <Skeleton className="h-9 w-9 shrink-0" />
      </div>
    </div>
  );
};

