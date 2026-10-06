import React from 'react';
import { AboutFeature } from '../ui/molecules/AboutFeature';
import { TimelineItem } from '../ui/molecules/TimelineItem';
import { aboutFeatures, aboutIntro, aboutTimeline } from '../../data/about';
import { reveal } from '../../reveal';

/** /about: title band, four brand values (photo alternates), then the "Хронология" timeline on a light band. */
export function AboutPage({ intro = aboutIntro, features = aboutFeatures, timeline = aboutTimeline }) {
  return (
    <>
      <section aria-labelledby="about-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-8 md:py-14">
          <h1 id="about-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {intro.title}
          </h1>
          <p className="mx-auto mt-3 max-w-[760px] text-small font-medium text-ink-13 md:text-root">{intro.subtitle}</p>
        </div>
      </section>

      <div className="py-8 md:py-12 xl:py-16">
        {features.map((f, i) => (
          <AboutFeature key={f.id} {...f} reverse={i % 2 === 1} />
        ))}
      </div>

      <section aria-labelledby="timeline-title" className="bg-surface-03">
        <div className="mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16 xl:py-20">
          <header {...reveal()} className="mb-10 text-center md:mb-14">
            <h2 id="timeline-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
              {timeline.title}
            </h2>
            <p className="mt-2 text-small font-medium text-ink-13 md:text-root">{timeline.subtitle}</p>
          </header>
          <ol className="relative mx-auto max-w-[1040px]">
            {/* the line behind the photos */}
            <span aria-hidden className="absolute bottom-0 left-6 top-6 w-px bg-alpha-d-10 md:left-1/2" />
            {timeline.items.map((it, i) => (
              <TimelineItem key={it.year} {...it} flip={i % 2 === 1} />
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
