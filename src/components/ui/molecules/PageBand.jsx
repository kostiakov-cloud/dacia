import React from 'react';
import { reveal } from '../../../reveal';

/** Light title band used by the inner pages: Heading H2 title (+ optional subtitle and `children` under them). */
export function PageBand({ id = 'page-title', title, subtitle, children }) {
  return (
    <section aria-labelledby={id} className="border-b border-alpha-d-3 bg-surface-03">
      <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-8 md:py-14">
        <h1 id={id} className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
          {title}
        </h1>
        {subtitle && <p className="mx-auto mt-3 max-w-[760px] text-small font-medium text-ink-13 md:text-root">{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
