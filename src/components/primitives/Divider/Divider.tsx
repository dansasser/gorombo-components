import { cn } from '../../../utils/cn';
import type { DividerProps } from './Divider.types';

export function Divider({
  orientation = 'horizontal',
  variant = 'solid',
  spacing = 'md',
  className,
}: DividerProps) {
  const spacingStyles = {
    sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
  };

  const variantStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  return (
    <hr
      className={cn(
        'border-gray-200',
        variantStyles[variant],
        spacingStyles[spacing],
        orientation === 'horizontal' ? 'border-t w-full' : 'border-l h-full',
        className
      )}
    />
  );
}

Divider.displayName = 'Divider';
