import React from 'react';
import { SiteHeader } from './SiteHeader';
import { Footer } from '../Footer';
import { ScrollToTop } from '../molecules/ScrollToTop';

/**
 * Shared page frame: header + <main> + footer + scroll-to-top. Every page renders inside it.
 * `current` = id of the nav item to highlight (e.g. 'models').
 */
export function SiteLayout({ current, children }) {
  return (
    <div className="min-h-screen bg-surface-01 font-sans text-dacia-text-secondary">
      <SiteHeader current={current} />
      <main id="main">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
