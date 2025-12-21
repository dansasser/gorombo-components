import { cn } from '../../../utils/cn';
import type { SpacerProps } from './Spacer.types';

const presets: Record<string, string> = {
  sm: '1rem',
  md: '2rem',
  lg: '3rem',
  xl: '4rem',
};

function getSize(value: string | number | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  if (value in presets) return presets[value];
  return value;
}

export function Spacer({ y, x, className }: SpacerProps) {
  const height = getSize(y);
  const width = getSize(x);

  return (
    <div className={cn('flex-shrink-0', className)} style={{ height, width }} aria-hidden="true" />
  );
}

Spacer.displayName = 'Spacer';
