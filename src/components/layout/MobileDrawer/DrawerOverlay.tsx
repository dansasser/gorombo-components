import { cn } from '../../../utils/cn';

export interface DrawerOverlayProps {
  /** Whether the overlay is visible */
  isOpen: boolean;
  /** Callback when overlay is clicked */
  onClick: () => void;
  /** Additional CSS classes */
  className?: string;
}

export function DrawerOverlay({ isOpen, onClick, className }: DrawerOverlayProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 bg-black/20 backdrop-blur-sm z-[55]',
        'transition-opacity duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        className
      )}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

DrawerOverlay.displayName = 'DrawerOverlay';
