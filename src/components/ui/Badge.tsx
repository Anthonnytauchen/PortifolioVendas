import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'muted';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'muted',
  className = '',
  children,
  ...rest
}) => {
  const variantClass =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground'
      : 'bg-muted text-muted-foreground border border-border';

  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-sm font-medium leading-none ${variantClass} ${className}`.trim()}
      {...rest}
    >
      {children}
    </span>
  );
};

