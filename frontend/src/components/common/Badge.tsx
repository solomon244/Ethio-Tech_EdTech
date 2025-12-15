import clsx from 'clsx';
import type { ReactNode, HTMLAttributes } from 'react';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'secondary';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'bg-primary/10 text-primary',
  warning: 'bg-accent/10 text-accent',
  danger: 'bg-danger/10 text-danger',
  info: 'bg-stone-100 text-stone-700',
  secondary: 'bg-stone-100 text-stone-700',
};

const Badge = ({ children, variant = 'info', className, ...rest }: BadgeProps) => {
  return (
    <span
      className={clsx(
        'rounded-full px-3 py-1 text-xs font-semibold uppercase',
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export default Badge;

