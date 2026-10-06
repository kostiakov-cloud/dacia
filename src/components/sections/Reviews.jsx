import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { cn } from '../ui/utils';
import { ReviewCard } from '../ui/molecules/ReviewCard';
import { reviews as reviewsData } from '../../data/reviews';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { reveal } from '../../reveal';

/**
 * Customer reviews: full-bleed, draggable looping carousel. The centre card is aligned to the page container, so on
 * desktop three cards fill it and the neighbours peek in from both edges; on phones one card + peeking neighbours.
 * It scrolls on its own, slowly and endlessly (Embla AutoScroll): pauses on hover / focus / while a card is expanded /
 * off screen, and is still draggable; no motion with `prefers-reduced-motion`. Card width 386px (77vw on phones), gap 30px (16px on phones, kept as slide padding so the loop seam is not tighter). Sits on the light band of the services section.
 */
export function Reviews({ items = reviewsData, speed = 0.6, className }) {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const plugins = React.useMemo(
    () => (reduce ? [] : [AutoScroll({ speed, startDelay: 0, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })]),
    [reduce, speed]
  );
  const [viewport, embla] = useEmblaCarousel({ loop: true, align: 'center', dragFree: true }, plugins);
  const sectionRef = React.useRef(null);
  const [expanded, setExpanded] = React.useState(0);

  // Run only while the section is on screen and no card is expanded (so a text being read never moves away).
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);
  const shouldRun = visible && expanded === 0;
  React.useEffect(() => {
    const auto = embla?.plugins()?.autoScroll;
    if (!auto) return undefined;
    const hovered = () => embla.rootNode().matches(':hover');
    if (shouldRun) {
      if (!hovered()) auto.play(); // while the pointer rests on the carousel it stays paused (plugin: stopOnMouseEnter)
      return undefined;
    }
    // Not allowed to run: stop now, and again whenever the plugin restarts itself (after a drag settles, on mouse leave...).
    auto.stop();
    // 'autoScroll:play' fires before the plugin marks itself active, so stop on the next tick
    const keepStopped = () => setTimeout(() => auto.stop(), 0);
    embla.on('autoScroll:play', keepStopped).on('settle', keepStopped);
    return () => embla.off('autoScroll:play', keepStopped).off('settle', keepStopped);
  }, [embla, shouldRun]);


  return (
    <section ref={sectionRef} aria-roledescription="carousel" aria-label="Отзывы клиентов" className={cn('overflow-hidden bg-surface-03 pb-12 md:pb-16', className)}>
      <div ref={viewport} {...reveal()} className="overflow-hidden">
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
              <ReviewCard {...r} onExpandedChange={(open) => setExpanded((n) => n + (open ? 1 : -1))} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
