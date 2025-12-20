import { cn } from '../../../utils/cn';
import type { AvatarProps, AvatarSize } from './Avatar.types';

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

export function Avatar({
  src,
  alt = '',
  initials,
  size = 'md',
  shape = 'circle',
  className,
}: AvatarProps) {
  const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden',
        'bg-primary/10 text-primary font-medium',
        sizeStyles[size],
        shapeClass,
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={cn('w-full h-full object-cover', shapeClass)}
        />
      ) : initials ? (
        <span>{initials.slice(0, 2).toUpperCase()}</span>
      ) : (
        <svg
          className="w-1/2 h-1/2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      )}
    </div>
  );
}

Avatar.displayName = 'Avatar';
