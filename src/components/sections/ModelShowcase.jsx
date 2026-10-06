import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '../ui/utils';
import { ModelImage } from '../ui/atoms/ModelImage';
import { ModelDetails } from '../ui/molecules/ModelDetails';
import { SliderControls } from '../ui/molecules/SliderControls';
import { models as modelsData } from '../../data/models';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

function Slide({ model, index, count, near }) {
  return (
    <div role="group" aria-roledescription="slide" aria-label={tr('{n0} из {count}', { n0: index + 1, count })} className="min-w-0 flex-[0_0_100%]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-6 px-4 pt-10 md:px-8 xl:grid-cols-2 xl:gap-16 xl:pt-16">
        <ModelImage
          model={model}
          priority={near}
          sizes="(min-width: 1280px) 600px, (min-width: 768px) 640px, 90vw"
          className="mx-auto w-full max-w-[560px] object-contain xl:max-w-none"
        />

        <ModelDetails model={model} href={`/models/${model.id}`} />
      </div>
    </div>
  );
}

/**
 * Home model slider (full-width light-grey band): one model per slide - photo, name, price, eco class and
 * three spec cards - opens on `initialId` (the design starts on Sandero Stepway), with ‹ 01/08 ◯◯◯ › controls underneath. Photos come from the shared model registry;
 * neighbouring slides are loaded eagerly so swiping never shows an empty frame.
 */
export function ModelShowcase({ models = modelsData, initialId = 'sandero-stepway-new', className }) {
  const start = Math.max(0, models.findIndex((m) => m.id === initialId));
  const [viewport, embla] = useEmblaCarousel({ loop: true, startIndex: start });
  const [index, setIndex] = React.useState(start);

  React.useEffect(() => {
    if (!embla) return undefined;
    const onSelect = () => setIndex(embla.selectedScrollSnap());
    onSelect();
    embla.on('select', onSelect).on('reInit', onSelect);
    return () => embla.off('select', onSelect).off('reInit', onSelect);
  }, [embla]);

  const n = models.length;

  // neighbouring slides load eagerly only once the section is about to be seen (not at page load)
  const sectionRef = React.useRef(null);
  const [nearViewport, setNearViewport] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNearViewport(true), { rootMargin: '800px 0px' });
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);
  return (
    <section ref={sectionRef} aria-roledescription="carousel" aria-label={tr('Модели Dacia')} className={cn('bg-dacia-light-bg', className)}>
      <div ref={viewport} {...reveal()} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {models.map((m, i) => {
            const d = Math.min((i - index + n) % n, (index - i + n) % n);
            return <Slide key={m.id} model={m} index={i} count={n} near={nearViewport && d <= 1} />;
          })}
        </div>
      </div>

      <div className="flex justify-center px-4 pb-10 pt-6 md:pb-12 xl:pb-16">
        <SliderControls
          tone="dark"
          size="l"
          index={index}
          count={n}
          onPrev={() => embla?.scrollPrev()}
          onNext={() => embla?.scrollNext()}
          onDot={(i) => embla?.scrollTo(i)}
        />
      </div>
    </section>
  );
}
