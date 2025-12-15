import { cn } from '../../../utils/cn';
import type { ContainerProps, ContainerMaxWidth, ContainerPadding } from './Container.types';

const maxWidthStyles: Record<ContainerMaxWidth, string> = {
  sm: 'max-w-sm',       // 384px
  md: 'max-w-md',       // 448px
  lg: 'max-w-lg',       // 512px
  xl: 'max-w-xl',       // 576px
  '2xl': 'max-w-2xl',   // 672px
  '7xl': 'max-w-7xl',   // 1280px
  full: 'max-w-full',
};

const paddingStyles: Record<ContainerPadding, string> = {
  none: '',
  sm: 'px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-6 sm:px-8 lg:px-12',
};

export function Container({
  maxWidth = '7xl',
  padding = 'md',
  centered = true,
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component
      className={cn(
        'w-full',
        maxWidthStyles[maxWidth],
        paddingStyles[padding],
        centered && 'mx-auto',
        className
      )}
    >
      {children}
    </Component>
  );
}

Container.displayName = 'Container';
