import React from 'react';
import { cn } from '../utils';

/** Round avatar: photo, or the author's initials on a pale tile when there is none. */
export function Avatar({ src, name = '', size = 48, className }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return src ? (
    <img src={src} alt="" width={size} height={size} loading="lazy" decoding="async" className={cn('shrink-0 rounded-full object-cover', className)} style={{ width: size, height: size }} />
  ) : (
    <span
      aria-hidden
      className={cn('flex shrink-0 items-center justify-center rounded-full bg-surface-08 font-block text-small font-bold text-dacia-text-secondary', className)}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}
