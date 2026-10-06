import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../utils';

/** 5-star rating: filled dark stars + pale unfilled ones. */
export function Stars({ value = 5, size = 14, className }) {
  return (
    <span role="img" aria-label={`Оценка ${value} из 5`} className={cn('inline-flex gap-0.5', className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          fill="currentColor"
          className={i < value ? 'text-dacia-text-secondary' : 'text-surface-09'}
          aria-hidden
        />
      ))}
    </span>
  );
}
