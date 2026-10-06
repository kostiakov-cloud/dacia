import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '../ui/utils';
import { ReviewCard } from '../ui/molecules/ReviewCard';
import { reviews as reviewsData } from '../../data/reviews';

/**
 * Customer reviews: full-bleed, draggable looping carousel. The centre card is aligned to the page container, so on
 * desktop three cards fill it and the neighbours peek in from both edges; on phones one card + peeking neighbours.
 * Card width 386px (77vw on phones), gap 30px (16px on phones, kept as slide padding so the loop seam is not tighter). Sits on the light band of the services section.
 */
export function Reviews({ items = reviewsData, className }) {
  const [viewport] = useEmblaCarousel({ loop: true, align: 'center', skipSnaps: false });
  return (
    <section aria-roledescription="carousel" aria-label="Отзывы клиентов" className={cn('overflow-hidden bg-surface-03 pb-12 md:pb-16', className)}>
      <div ref={viewport} className="overflow-hidden">
        <div className="flex touch-pan-y items-start">
          {items.map((r, i) => (
            <div
              key={r.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} из ${items.length}`}
              // the gap is slide padding (not flex gap) so it is also kept across the loop seam
              className="min-w-0 flex-[0_0_calc(min(386px,77vw)+16px)] px-2 md:flex-[0_0_416px] md:px-[15px]"
            >
              <ReviewCard {...r} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
