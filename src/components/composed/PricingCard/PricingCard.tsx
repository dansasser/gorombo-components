import type { ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { Icon } from '../../primitives/Icon';
import { Button } from '../../primitives/Button';
import type { PricingCardProps } from './PricingCard.types';

export function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  ctaLabel,
  ctaHref,
  featured = false,
  badge,
  className,
  children,
}: PricingCardProps & { children?: ReactNode }) {
  const ctaElement = cta || (ctaLabel ? (
    <Button
      variant={featured ? 'primary' : 'outlined'}
      fullWidth
      onClick={ctaHref ? () => window.location.href = ctaHref : undefined}
    >
      {ctaLabel}
    </Button>
  ) : null);
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-2xl border p-8',
        'transition-all duration-200',
        featured
          ? 'border-primary bg-white shadow-xl scale-105 z-10'
          : 'border-gray-200 bg-white hover:shadow-lg hover:border-gray-300',
        className
      )}
    >
      {/* Featured badge */}
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-white text-sm font-bold px-4 py-1 rounded-full">
            {badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-text-main">{name}</h3>
        {description && (
          <p className="mt-2 text-sm text-text-sub">{description}</p>
        )}
      </div>

      {/* Price */}
      <div className="mt-6 text-center">
        <span className="text-4xl font-bold text-text-main">{price}</span>
        {period && (
          <span className="text-text-sub">{period}</span>
        )}
      </div>

      {/* Features */}
      <ul className="mt-8 flex-1 space-y-3">
        {features.map((feature, index) => (
          <li
            key={index}
            className={cn(
              'flex items-start gap-3',
              !feature.included && 'opacity-50'
            )}
          >
            <Icon
              name={feature.included !== false ? 'check_circle' : 'cancel'}
              size="sm"
              className={cn(
                'flex-shrink-0 mt-0.5',
                feature.included !== false ? 'text-green-500' : 'text-gray-400'
              )}
            />
            <span className="text-sm text-text-main">{feature.text}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {(ctaElement || children) && (
        <div className="mt-8">
          {ctaElement || children}
        </div>
      )}
    </div>
  );
}

PricingCard.displayName = 'PricingCard';
