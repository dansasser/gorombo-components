import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import type { ButtonProps, ButtonVariant, ButtonSize } from './Button.types';

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary hover:bg-primary-dark text-white',
  secondary: 'bg-background-off hover:bg-gray-200 text-text-main border border-gray-200',
  accent: 'bg-accent hover:bg-accent-hover text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-text-main',
  outlined: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg font-bold',
          'transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
        ) : (
          <>
            {icon && iconPosition === 'left' && icon}
            {children}
            {icon && iconPosition === 'right' && icon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
