import { useState } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../Icon';
import type { AlertProps, AlertVariant } from './Alert.types';

const variantStyles: Record<AlertVariant, { bg: string; icon: string; iconColor: string }> = {
  info: {
    bg: 'bg-blue-50 border-blue-200',
    icon: 'info',
    iconColor: 'text-blue-500',
  },
  success: {
    bg: 'bg-green-50 border-green-200',
    icon: 'check_circle',
    iconColor: 'text-green-500',
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    icon: 'warning',
    iconColor: 'text-yellow-500',
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    icon: 'error',
    iconColor: 'text-red-500',
  },
};

export function Alert({
  title,
  variant = 'info',
  iconName,
  dismissible = false,
  className,
  children,
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);
  const styles = variantStyles[variant];

  if (dismissed) return null;

  return (
    <div
      role="alert"
      className={cn('flex items-start gap-3 p-4 rounded-lg border', styles.bg, className)}
    >
      <Icon
        name={iconName || styles.icon}
        size="md"
        className={cn('flex-shrink-0', styles.iconColor)}
      />
      <div className="flex-1 min-w-0">
        {title && <p className="font-medium text-text-main">{title}</p>}
        {children && <div className={cn('text-sm text-text-sub', title && 'mt-1')}>{children}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 rounded hover:bg-black/5 transition-colors"
          aria-label="Dismiss"
        >
          <Icon name="close" size="sm" className="text-text-sub" />
        </button>
      )}
    </div>
  );
}

Alert.displayName = 'Alert';
