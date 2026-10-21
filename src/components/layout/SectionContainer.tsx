import React from 'react';

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  as?: 'section' | 'div' | 'main';
  variant?: 'default' | 'muted';
  children: React.ReactNode;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  as: Component = 'section',
  variant = 'default',
  className = '',
  children,
  ...rest
}) => {
  const surfaceClass = variant === 'muted' ? 'bg-muted text-foreground' : 'bg-background text-foreground';

  return (
    <Component
      id={id}
      className={`py-16 md:py-24 border-b border-border ${surfaceClass} ${className}`.trim()}
      {...rest}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {children}
      </div>
    </Component>
  );
};

