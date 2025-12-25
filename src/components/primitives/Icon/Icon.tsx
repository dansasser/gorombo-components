import { cn } from '../../../utils/cn';
import type { IconProps, IconSize } from './Icon.types';

const sizeStyles: Record<IconSize, string> = {
  sm: 'text-base', // 16px
  md: 'text-xl', // 20px
  lg: 'text-2xl', // 24px
  xl: 'text-3xl', // 30px
};

const sizePixels: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 30,
};

export function Icon({
  name,
  size = 'md',
  weight = 400,
  fill = false,
  className,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: IconProps) {
  const isDecorative = !ariaLabel;

  return (
    <span
      className={cn(
        'material-symbols-outlined inline-flex items-center justify-center',
        sizeStyles[size],
        className
      )}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${sizePixels[size]}`,
      }}
      role={isDecorative ? 'presentation' : 'img'}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? isDecorative}
    >
      {name}
    </span>
  );
}

Icon.displayName = 'Icon';
