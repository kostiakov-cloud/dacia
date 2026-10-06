import React from 'react';
import { cn } from '../ui/utils';
import { ModelPicker } from '../ui/molecules/ModelPicker';
import { SiteButton } from '../ui/atoms/SiteButton';
import { models as modelsData } from '../../data/models';

const idx = (models, id, fallback) => {
  const i = models.findIndex((m) => m.id === id);
  return i >= 0 ? i : fallback;
};

/**
 * "Сравните модели DACIA": two model pickers + "compare" button. The arrows cycle through the line-up and
 * skip the model already chosen in the other card, so the same car is never compared with itself.
 * The button links to `compareHref(a, b)` (default `/compare?models=a,b`).
 */
export function CompareModels({
  models = modelsData,
  initial = ['logan-new', 'logan'],
  compareHref = (a, b) => `/compare?models=${a.id},${b.id}`,
  className,
}) {
  const n = models.length;
  const [pick, setPick] = React.useState(() => [idx(models, initial[0], 0), idx(models, initial[1], 1)]);
  const [dir, setDir] = React.useState([1, 1]);

  const move = (slot, step) => {
    setPick((p) => {
      const next = [...p];
      let i = p[slot];
      do {
        i = (i + step + n) % n;
      } while (i === p[1 - slot]);
      next[slot] = i;
      return next;
    });
    setDir((d) => d.map((v, k) => (k === slot ? step : v)));
  };

  const [a, b] = pick.map((i) => models[i]);
  return (
    <section aria-labelledby="compare-title" className={cn('mx-auto max-w-[1280px] px-4 py-12 md:px-8 md:py-16 xl:py-24', className)}>
      <header className="mb-8 text-center md:mb-12">
        <h2 id="compare-title" className="font-block text-hs2 text-dacia-text-secondary md:text-h2">
          Сравните модели DACIA
        </h2>
        <p className="mt-2 text-small text-dacia-text-tertiary md:text-root">Сравните характеристики, размеры и комплектации</p>
      </header>

      <div className="grid grid-cols-2 gap-2 md:gap-4 xl:gap-8">
        <ModelPicker model={a} dir={dir[0]} label="Первая модель" onPrev={() => move(0, -1)} onNext={() => move(0, 1)} />
        <ModelPicker model={b} dir={dir[1]} label="Вторая модель" onPrev={() => move(1, -1)} onNext={() => move(1, 1)} />
      </div>

      <div className="mt-8 flex justify-center md:mt-12">
        <SiteButton href={compareHref(a, b)} variant="solid" size="l" className="max-md:w-full">
          Сравнить модели
        </SiteButton>
      </div>
    </section>
  );
}
