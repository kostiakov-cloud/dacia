import React from 'react';
import { Check } from 'lucide-react';
import { PageBand } from '../ui/molecules/PageBand';
import { SiteButton } from '../ui/atoms/SiteButton';
import { reveal } from '../../reveal';

/** Text page: title band, a sticky "on this page" list (xl) and the sections (Heading H5 titles, Light body text, lists, CTA). */
export function ContentPage({ page }) {
  return (
    <>
      <PageBand title={page.title} subtitle={page.subtitle} />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-10 md:px-8 md:py-14 xl:grid-cols-[240px_1fr] xl:gap-16 xl:py-16">
        <nav aria-label="На этой странице" className="hidden xl:block">
          <ul className="sticky top-28 flex flex-col gap-3 border-l border-alpha-d-10 pl-4 text-small">
            {page.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink-13 transition-colors hover:text-dacia-dark-green">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-[800px]">
          {page.sections.map((s) => (
            <section key={s.id} id={s.id} {...reveal()} className="scroll-mt-28 border-b border-alpha-d-5 py-8 first:pt-0 last:border-0 xl:scroll-mt-24">
              <h2 className="font-block text-hs5 text-dacia-text-secondary xl:text-h5">{s.title}</h2>
              {s.paragraphs?.map((t) => (
                <p key={t} className="mt-4 text-root font-light text-ink-13">
                  {t}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 flex flex-col gap-3">
                  {s.list.map((t) => (
                    <li key={t} className="flex gap-3 text-root font-light text-ink-13">
                      <Check size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-dacia-dark-green" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              {s.cta && (
                <SiteButton href={s.cta.href} variant="outline" className="mt-6 max-md:w-full">
                  {s.cta.label}
                </SiteButton>
              )}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
