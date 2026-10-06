import React from 'react';
import { getModelImage } from '../../../data/models';

/**
 * The one way to show a car photo. Takes a model (`model.image`) or just an `id` and reads the shared
 * registry in data/models.js, so replacing a car's PNG updates every place at once.
 * Responsive WebP srcset with transparency; renders nothing when the model has no photo yet.
 */
export function ModelImage({ model, id, alt, sizes = '(min-width: 1280px) 272px, (min-width: 640px) 45vw, 90vw', priority = false, className }) {
  const image = model?.image ?? getModelImage(id ?? model?.id);
  if (!image) return null;
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={alt ?? model?.name ?? ''}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}
