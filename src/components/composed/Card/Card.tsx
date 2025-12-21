import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import type {
  CardProps,
  CardVariant,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
} from './Card.types';

const variantStyles: Record<CardVariant, string> = {
  elevated: 'bg-white border border-gray-100 shadow-md',
  outlined: 'bg-white border border-gray-200',
  filled: 'bg-background-off border border-transparent',
};

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'elevated', interactive = false, padding = 'md', className, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl',
          variantStyles[variant],
          paddingStyles[padding],
          interactive && [
            'transition-all duration-200 cursor-pointer',
            'hover:shadow-lg hover:border-gray-200',
            'hover:-translate-y-1',
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export function CardHeader({ icon, iconName, title, subtitle, className }: CardHeaderProps) {
  const iconElement = icon || (iconName ? <Icon name={iconName} size="lg" /> : null);

  return (
    <div className={cn('flex items-start gap-4', className)}>
      {iconElement && (
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          {iconElement}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-text-main">{title}</h3>
        {subtitle && <p className="mt-1 text-sm text-text-sub">{subtitle}</p>}
      </div>
    </div>
  );
}

CardHeader.displayName = 'CardHeader';

export function CardBody({ className, children }: CardBodyProps) {
  return <div className={cn('mt-4', className)}>{children}</div>;
}

CardBody.displayName = 'CardBody';

export function CardFooter({ className, children }: CardFooterProps) {
  return <div className={cn('mt-6 pt-4 border-t border-gray-100', className)}>{children}</div>;
}

CardFooter.displayName = 'CardFooter';
