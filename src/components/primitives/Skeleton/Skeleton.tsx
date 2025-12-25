import { cn } from '../../../utils/cn';
import type { SkeletonProps } from './Skeleton.types';

export function Skeleton({
  width,
  height,
  variant = 'text',
  animation = 'pulse',
  className,
}: SkeletonProps) {
  const variantStyles = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={cn('bg-gray-200', variantStyles[variant], animationStyles[animation], className)}
      style={style}
      aria-hidden="true"
    />
  );
}

Skeleton.displayName = 'Skeleton';
