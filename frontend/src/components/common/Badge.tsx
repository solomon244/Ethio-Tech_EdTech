import clsx from 'clsx';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info';
}

const variantStyles = {
  success: 'bg-primary/10 text-primary',
  warning: 'bg-accent/10 text-accent',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-stone-100 text-stone-700',
};

const Badge = ({ children, variant = 'info' }: BadgeProps) => {
  return (
    <span className={clsx('rounded-full px-3 py-1 text-xs font-semibold uppercase', variantStyles[variant])}>
      {children}
    </span>
  );
};

export default Badge;

