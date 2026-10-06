import React from 'react';
import { cn } from '../utils';
import { ModelImage } from '../atoms/ModelImage';
import { ModelDetails } from './ModelDetails';
import { reveal } from '../../../reveal';

/**
 * Catalogue "list" row: big photo + <ModelDetails>, two equal columns from xl; rows alternate (`reverse` puts the
 * photo on the right). Below xl the photo is on top and everything is centred, like the home slider.
 */
export function ModelFeatureRow({ model, reverse = false, className }) {
  return (
    <article className={cn('mx-auto grid max-w-[1280px] items-center gap-6 px-4 py-8 md:px-8 xl:grid-cols-2 xl:gap-16 xl:py-10', className)}>
      <ModelImage
        model={model}
        sizes="(min-width: 1280px) 600px, (min-width: 768px) 640px, 90vw"
        className={cn('mx-auto w-full max-w-[560px] object-contain xl:max-w-none', reverse && 'xl:order-2')}
        {...reveal(reverse ? 'right' : 'left')}
      />
      <ModelDetails model={model} href={`/models/${model.id}`} variant="list" {...reveal('up', 120)} />
    </article>
  );
}
