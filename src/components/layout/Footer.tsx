import React from 'react';
import { siteContent } from '@/config/siteContent';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-muted text-foreground">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-12 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-md">
            <span className="text-2xl font-semibold leading-none tracking-tight text-foreground">
              {siteContent.brand.name}
            </span>
            <p className="text-base text-muted-foreground leading-7">
              {siteContent.brand.tagline}
            </p>
          </div>

          <nav aria-label={siteContent.footer.navAriaLabel} className="flex flex-wrap items-center gap-6">
            {siteContent.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium leading-none text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm font-medium leading-none text-muted-foreground">
            {siteContent.footer.copyright}
          </p>
          <p className="text-sm font-medium leading-none text-muted-foreground">
            {siteContent.footer.complianceNote}
          </p>
        </div>
      </div>
    </footer>
  );
};

