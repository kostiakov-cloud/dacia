import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merges Tailwind class lists while respecting overrides. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
