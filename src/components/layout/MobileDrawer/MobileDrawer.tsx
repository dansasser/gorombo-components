import { useEffect, useRef } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import { DrawerOverlay } from './DrawerOverlay';
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
  hideOverlay = false,
  header,
  footer,
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

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const sideStyle = sideStyles[side];
  const showDefaultHeader = !header && (title || showClose);

  return (
    <>
      {/* Backdrop */}
      {!hideOverlay && <DrawerOverlay isOpen={isOpen} onClick={onClose} />}

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={title || 'Navigation menu'}
        className={cn(
          'fixed inset-y-0 bg-white shadow-2xl z-[60] flex flex-col',
          'transform transition-transform duration-300 ease-out',
          widthStyles[width],
          sideStyle.position,
          isOpen ? sideStyle.open : sideStyle.transform,
          className
        )}
      >
        {/* Custom Header */}
        {header}

        {/* Default Header */}
        {showDefaultHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {title && <span className="font-bold text-text-main">{title}</span>}
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
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>

        {/* Footer */}
        {footer && <div className="p-4 border-t border-gray-100">{footer}</div>}
      </div>
    </>
  );
}

MobileDrawer.displayName = 'MobileDrawer';
