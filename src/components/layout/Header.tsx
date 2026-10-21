import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteContent } from '@/config/siteContent';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex h-16 items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 text-foreground transition-colors hover:text-primary"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-extrabold">
            {siteContent.brand.initials}
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            {siteContent.brand.name}
          </span>
        </a>

        <nav aria-label={siteContent.header.mainNavAriaLabel} className="hidden md:flex items-center gap-6">
          {siteContent.header.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium leading-none text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href={siteContent.header.ctaHref}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 py-2"
          >
            {siteContent.header.ctaLabel}
            <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={handleToggleMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={siteContent.header.mobileMenuAriaLabel}
          className="inline-flex md:hidden items-center justify-center rounded-md p-2 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <nav
          aria-label={siteContent.header.mobileNavAriaLabel}
          className="md:hidden border-b border-border bg-background px-4 pt-3 pb-6 flex flex-col gap-4"
        >
          {siteContent.header.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleCloseMenu}
              className="text-sm font-medium leading-none text-foreground py-2 border-b border-border"
            >
              {item.label}
            </a>
          ))}
          <a
            href={siteContent.header.ctaHref}
            onClick={handleCloseMenu}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-8 py-2 w-full"
          >
            {siteContent.header.ctaLabel}
            <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </nav>
      )}
    </header>
  );
};

