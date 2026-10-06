import React from 'react';
import { ModelImage } from '../atoms/ModelImage';
import { SiteButton } from '../atoms/SiteButton';
import { Select } from './Select';

/** One side of the comparator header: model picker, photo, name, price and the two actions. */
export function CompareCard({ model, options, onChange, label, side }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <Select
        label={label}
        placeholder="Выберите модель"
        options={options.map((o) => o.value)}
        value={model.id}
        onChange={(e) => onChange(e.target.value)}
        optionLabels={Object.fromEntries(options.map((o) => [o.value, o.label]))}
        className="max-w-[280px]"
        data-side={side}
      />
      <div className="mt-4 flex aspect-[3/2] w-full max-w-[320px] items-center justify-center">
        <ModelImage model={model} sizes="(min-width: 1280px) 320px, 45vw" className="max-h-full max-w-full object-contain" />
      </div>
      <p className="mt-2 flex h-5 items-end whitespace-nowrap font-display text-hx6 font-bold uppercase tracking-wider text-dacia-text-secondary">{model.isNew && 'Новый'}</p>
      <h2 className="font-display text-hx5 font-bold uppercase tracking-wider text-dacia-text-secondary">{model.name}</h2>
      <p className="mt-2 text-small font-light text-ink-13">
        Цена от <span className="font-medium text-dacia-text-secondary">{model.price}</span>
      </p>
      <p className="max-w-[260px] text-caption font-light text-dacia-text-secondary">{model.version}</p>
      <div className="mt-4 flex w-full max-w-[280px] flex-col gap-2">
        <SiteButton href="/models" variant="outline" size="m">
          Подробнее
        </SiteButton>
        <SiteButton href="/offer-request" variant="solid" size="m" className="max-md:px-2 max-md:text-[13px]">
          Предложение
        </SiteButton>
      </div>
    </div>
  );
}
