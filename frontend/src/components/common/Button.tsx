import clsx from 'clsx';
import { cloneElement, isValidElement } from 'react';
import type { ButtonHTMLAttributes, ReactNode, ReactElement } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary',
  secondary:
    'bg-white text-primary border border-primary/30 hover:border-primary focus-visible:outline-primary',
  ghost: 'bg-transparent text-stone-600 hover:text-primary focus-visible:outline-primary',
};

const Button = ({
  children,
  className,
  variant = 'primary',
  leftIcon,
  rightIcon,
  fullWidth,
  asChild,
  ...props
}: ButtonProps) => {
  const classes = clsx(baseStyles, variantStyles[variant], fullWidth && 'w-full', className);

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement, {
      className: clsx(children.props.className, classes),
    });
  }

  return (
    <button className={classes} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};

export default Button;

