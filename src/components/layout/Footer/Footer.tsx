import { cn } from '../../../utils/cn';
import { Container } from '../../primitives/Container';
import type { FooterProps } from './Footer.types';

export function Footer({
  logo,
  sections = [],
  social = [],
  copyright,
  background = 'light',
  className,
  children,
}: FooterProps) {
  const isDark = background === 'dark';

  return (
    <footer
      className={cn(
        'border-t pt-16 pb-8',
        isDark
          ? 'bg-background-dark border-white/10 text-white'
          : 'bg-background-light border-gray-100 text-text-main',
        className
      )}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo and description */}
          {logo && (
            <div className="md:col-span-1">
              {logo}
            </div>
          )}

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4
                className={cn(
                  'font-bold mb-4',
                  isDark ? 'text-white' : 'text-text-main'
                )}
              >
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        'text-sm transition-colors',
                        isDark
                          ? 'text-gray-400 hover:text-white'
                          : 'text-text-sub hover:text-primary'
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional content */}
        {children}

        {/* Bottom bar */}
        <div
          className={cn(
            'mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4',
            isDark ? 'border-white/10' : 'border-gray-100'
          )}
        >
          {/* Copyright */}
          {copyright && (
            <p
              className={cn(
                'text-sm',
                isDark ? 'text-gray-400' : 'text-text-sub'
              )}
            >
              {copyright}
            </p>
          )}

          {/* Social links */}
          {social.length > 0 && (
            <div className="flex items-center gap-4">
              {social.map((item) => (
                <a
                  key={item.platform}
                  href={item.href}
                  aria-label={item.platform}
                  className={cn(
                    'p-2 rounded-lg transition-colors',
                    isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/10'
                      : 'text-text-sub hover:text-primary hover:bg-background-off'
                  )}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}

Footer.displayName = 'Footer';
