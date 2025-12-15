import { useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import type { MobileDrawerProps, DrawerSide, DrawerWidth } from './MobileDrawer.types';

const widthStyles: Record<DrawerWidth, string> = {
  sm: 'w-[240px]',
  md: 'w-[280px]',
  lg: 'w-[320px]',
};

const sideStyles: Record<DrawerSide, { position: string; transform: string; open: string }> = {
  left: {
    position: 'left-0',
    transform: '-translate-x-full',
    open: 'translate-x-0',
  },
  right: {
    position: 'right-0',
    transform: 'translate-x-full',
    open: 'translate-x-0',
  },
};

export function MobileDrawer({
  isOpen,
  onClose,
  side = 'left',
  width = 'md',
  title,
  showClose = true,
  className,
  children,
}: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      firstElement?.focus();
    }
  }, [isOpen]);

  const sideStyle = sideStyles[side];

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/20 backdrop-blur-sm z-[55]',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Navigation menu'}
        className={cn(
          'fixed inset-y-0 bg-white shadow-2xl z-[60]',
          'transform transition-transform duration-300 ease-out',
          widthStyles[width],
          sideStyle.position,
          isOpen ? sideStyle.open : sideStyle.transform,
          className
        )}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {title && (
              <span className="font-bold text-text-main">{title}</span>
            )}
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  'p-2 rounded-lg text-text-sub',
                  'hover:bg-background-off hover:text-text-main',
                  'transition-colors',
                  !title && 'ml-auto'
                )}
                aria-label="Close menu"
              >
                <Icon name="close" size="md" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-4 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </>
  );
}

MobileDrawer.displayName = 'MobileDrawer';
