import React from 'react';
import { cn } from '../utils';

/** Column of a mega menu: 14px Medium title + stack of rows (gap 16). */
export function MegaColumn({ title, className, children }) {
  return (
    <div data-mega-item className={cn('flex min-w-0 flex-col gap-6', className)}>
      {title && <h3 className="text-[14px] font-medium leading-6 text-dacia-text-secondary">{title}</h3>}
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

/** Descriptive paragraph (14/28 Light, text-tertiary). */
export function MegaText({ className, children }) {
  return <p className={cn('text-[14px] font-light leading-7 text-dacia-text-tertiary', className)}>{children}</p>;
}

/** News row: 12px date + 16/28 headline. */
export function NewsItem({ date, href = '#', className, children }) {
  return (
    <a href={href} className={cn('group flex flex-col gap-1', className)}>
      <span className="text-[12px] font-light leading-4 text-dacia-text-tertiary">{date}</span>
      <span className="text-[16px] leading-7 text-dacia-text-secondary transition-colors group-hover:text-dacia-dark-green">
        {children}
      </span>
    </a>
  );
}

/** Contact row: 20px icon + text. */
export function ContactRow({ icon: Icon, className, children }) {
  return (
    <div className={cn('flex items-center gap-2 text-[16px] leading-6 text-dacia-text-secondary', className)}>
      {Icon && <Icon size={20} strokeWidth={1.5} className="shrink-0" />}
      <span>{children}</span>
    </div>
  );
}
