import { cn } from '../../../utils/cn';
import type { FooterProps } from './Footer.types';

export function Footer({
  logo,
  brandName,
  tagline,
  links = [],
  social = [],
  copyright,
  className,
}: FooterProps) {
  return (
    <footer
      className={cn(
        'bg-white border-t border-gray-100 pt-16 pb-8',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: Logo/tagline left, links right */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
          {/* Logo and tagline */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              {logo && <div className="w-8 h-8 text-primary">{logo}</div>}
              {brandName && (
                <span className="font-display font-bold text-xl text-text-main">
                  {brandName}
                </span>
              )}
            </div>
            {tagline && (
              <p className="text-text-sub text-sm max-w-xs text-center md:text-left">
                {tagline}
              </p>
            )}
          </div>

          {/* Inline links */}
          {links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-sub hover:text-primary text-sm font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar: Copyright and social */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          {copyright && (
            <p className="text-text-sub text-sm">{copyright}</p>
          )}

          {/* Social links */}
          {social.length > 0 && (
            <div className="flex gap-4">
              {social.map((item) => (
                <a
                  key={item.platform}
                  href={item.href}
                  aria-label={item.platform}
                  className="text-text-sub hover:text-primary transition-colors"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

Footer.displayName = 'Footer';
