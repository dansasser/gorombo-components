import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';

export interface HeaderActionsProps {
  /** Action buttons/elements */
  children: ReactNode;
  /** Hide on mobile screens (show only on lg and up) */
  hideOnMobile?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function HeaderActions({ children, hideOnMobile = false, className }: HeaderActionsProps) {
  return (
    <div className={cn('flex items-center gap-4', hideOnMobile && 'hidden lg:flex', className)}>
      {children}
    </div>
  );
}

HeaderActions.displayName = 'HeaderActions';
