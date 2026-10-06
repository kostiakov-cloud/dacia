import React from 'react';
import { cn } from '../utils';
import { ModelImage } from '../atoms/ModelImage';

/** Horizontal model row for the mobile menu: photo left, text right. Shows a grey box without `image`. */
export function ModelRow({ id, name, isNew, image, price, version, hybrid, href = '#', className }) {
  return (
    <a href={href} className={cn('flex items-center gap-4 py-4', className)}>
      <div className="flex aspect-[4/3] w-[140px] shrink-0 items-center justify-center rounded-cr2 bg-surface-04">
        <ModelImage model={{ id, name, image }} sizes="140px" className="size-full object-contain" />
      </div>
      <div className="flex min-w-0 flex-col gap-1 text-left">
        {isNew && <span className="font-display text-[11px] font-bold uppercase leading-4 tracking-wider text-dacia-text-secondary">Новый</span>}
        <span className="font-display text-[16px] font-bold uppercase leading-6 tracking-wider text-dacia-text-secondary">{name}</span>
        <span className="text-[14px] font-light leading-6 text-dacia-text-tertiary">
          Цена от <span className="font-medium text-dacia-text-secondary">{price}</span>
        </span>
        <span className="text-[13px] font-light leading-5 text-dacia-text-secondary">{version}</span>
        {hybrid && (
          <span className="flex items-center gap-2 text-[11px] leading-4">
            <span className="font-light text-dacia-text-tertiary">Доступен:</span>
            <span className="rounded-[2px] border border-dacia-orange px-1.5 font-medium text-dacia-orange">Полный гибрид</span>
          </span>
        )}
      </div>
    </a>
  );
}
