import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '../ui/utils';
import { ModelImage } from '../ui/atoms/ModelImage';
import { SliderControls } from '../ui/molecules/SliderControls';
import { models as modelsData } from '../../data/models';

function Stat({ value, unit, label }) {
  return (
    <div className="rounded-cr2 border border-alpha-d-5 bg-surface-01 px-2 py-4 text-center md:px-3">
      <p className="font-block text-hs5 text-dacia-text-secondary md:text-h5">
        {value}
        {unit && <span className="ml-1 text-small font-medium">{unit}</span>}
      </p>
      <p className="mt-1 text-caption text-dacia-text-tertiary">{label}</p>
    </div>
  );
}

function Slide({ model, index, count, near }) {
  return (
    <div role="group" aria-roledescription="slide" aria-label={`${index + 1} из ${count}`} className="min-w-0 flex-[0_0_100%]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-6 px-4 pt-10 md:px-8 xl:grid-cols-2 xl:gap-16 xl:pt-16">
        <ModelImage
          model={model}
          priority={near}
          sizes="(min-width: 1280px) 600px, (min-width: 768px) 640px, 90vw"
          className="mx-auto w-full max-w-[560px] object-contain xl:max-w-none"
        />

        <div className="flex flex-col items-center text-center xl:items-start xl:text-left">
          {model.isNew && <span className="font-display text-hx6 font-bold uppercase tracking-wider text-dacia-text-secondary">Новый</span>}
          <h2 className="font-display text-hx3 font-bold uppercase tracking-wider text-dacia-text-secondary md:text-hx2">{model.name}</h2>

          {model.hybrid && (
            <span className="mt-3 rounded-cr2 bg-dacia-orange px-2 py-0.5 text-tiny font-medium text-surface-01">Полный гибрид</span>
          )}

          <p className="mt-4 text-root text-dacia-text-tertiary">
            Цена от <span className="font-medium text-dacia-text-secondary">{model.price}</span>
          </p>
          <p className="mt-1 text-small font-light text-dacia-text-tertiary">{model.version}</p>

          {model.eco && (
            <p className="mt-3 flex items-center gap-2 text-small text-dacia-text-secondary">
              Класс экологичности
              <span className="flex size-6 items-center justify-center rounded-cr2 bg-status-success text-small font-medium text-surface-01">{model.eco}</span>
            </p>
          )}

          {model.stats && (
            <div className="mt-6 grid w-full max-w-[480px] grid-cols-3 gap-2 xl:mt-8">
              {model.stats.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>
          )}
        </div>
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
  return (
    <section aria-roledescription="carousel" aria-label="Модели Dacia" className={cn('bg-dacia-light-bg', className)}>
      <div ref={viewport} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {models.map((m, i) => {
            const d = Math.min((i - index + n) % n, (index - i + n) % n);
            return <Slide key={m.id} model={m} index={i} count={n} near={d <= 1} />;
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
