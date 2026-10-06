import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../utils';
import { ModelCard } from '../molecules/ModelCard';
import { modelsHref } from '../../../data/navigation';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

/**
 * Models slider for the mega menu: endless loop (the last model is followed by the first, there is no edge) that
 * drifts slowly on its own. It pauses while the pointer is over it or something inside has focus, stays draggable and
 * is static for `prefers-reduced-motion`. `visible` cards per page; arrows, a "2-5 из 8" counter (the window that is
 * currently at the left edge), dots and a "view all" button.
 */
export function ModelCarousel({ items = [], visible = 5, allLabel = 'Смотреть все модели', allHref = modelsHref, speed = 0.5, className }) {
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const plugins = React.useMemo(
    () => (reduce ? [] : [AutoScroll({ speed, startDelay: 900, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })]),
    [reduce, speed]
  );
  const [viewport, embla] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 }, plugins);
  const [start, setStart] = React.useState(0);
  const n = items.length;

  React.useEffect(() => {
    if (!embla) return undefined;
    const onSelect = () => setStart(embla.selectedScrollSnap());
    onSelect();
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => embla.off('select', onSelect).off('reInit', onSelect);
  }, [embla]);

  // Arrows / dots scroll by hand: pause the drift for the move and let it continue once the carousel has settled
  // (unless the pointer is resting on it - then it stays paused until the pointer leaves).
  const manual = React.useCallback(
    (fn) => {
      if (!embla) return;
      const auto = embla.plugins()?.autoScroll;
      auto?.stop();
      fn(embla);
      if (!auto) return;
      const resume = () => {
        embla.off('settle', resume);
        if (!embla.rootNode().matches(':hover')) auto.play();
      };
      embla.on('settle', resume);
    },
    [embla]
  );

  const end = ((start + visible - 1) % n) + 1; // last card of the current window (wraps around)
  const inWindow = (i) => ((i - start + n) % n) < visible;

  return (
    <div className={cn('flex w-full min-w-0 flex-col items-center gap-6', className)}>
      <div ref={viewport} className="w-full overflow-hidden">
        <div className="flex touch-pan-y">
          {items.map((m) => (
            <div key={m.id || m.name + m.price} data-mega-item className="min-w-0 shrink-0 px-2" style={{ flex: `0 0 ${100 / visible}%` }}>
              <ModelCard {...m} href={`/models/${m.id}`} sizes="(min-width: 1280px) 220px, 30vw" />
            </div>
          ))}
        </div>
      </div>

      <div data-mega-item className="flex items-center gap-3 text-[12px] font-medium text-dacia-text-secondary">
        <button type="button" aria-label="Назад" onClick={() => manual((e) => e.scrollPrev())} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green">
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <span className="whitespace-nowrap tabular-nums">{start + 1}-{end} из {n}</span>
        <div className="flex items-center gap-1.5" aria-hidden>
          {items.map((_, i) => (
            <span key={i} className={cn('size-2.5 rounded-full border transition-colors duration-300', inWindow(i) ? 'border-dacia-dark-green' : 'border-alpha-d-10')} />
          ))}
        </div>
        <button type="button" aria-label="Вперёд" onClick={() => manual((e) => e.scrollNext())} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green">
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

      <a
        href={allHref}
        data-mega-item
        className="inline-flex h-10 items-center justify-center rounded-[2px] border border-dacia-dark-green px-6 text-[14px] font-medium leading-6 text-dacia-dark-green transition-colors duration-200 hover:bg-dacia-dark-green hover:text-surface-01 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green focus-visible:ring-offset-2"
      >
        {allLabel}
      </a>
    </div>
  );
}
