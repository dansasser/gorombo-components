import { cn } from '../../../utils/cn';
import type { BadgeProps, BadgeVariant, BadgeSize } from './Badge.types';

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-primary/10 text-primary border-primary/20',
  secondary: 'bg-secondary/10 text-secondary-dark border-secondary/20',
  accent: 'bg-accent/10 text-accent border-accent/20',
  success: 'bg-green-100 text-green-700 border-green-200',
  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  error: 'bg-red-100 text-red-700 border-red-200',
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

const dotSizeStyles: Record<BadgeSize, string> = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export function Badge({
  variant = 'primary',
  size = 'md',
  icon,
  dot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && <span className={cn('rounded-full bg-current', dotSizeStyles[size])} />}
      {!dot && icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

Badge.displayName = 'Badge';
