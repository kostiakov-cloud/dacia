import React from 'react';
import { cn } from '../utils';
import { SearchField } from './SearchField';
import { SearchChip } from '../atoms/SearchChip';
import { searchChips } from '../../../data/navigation';
import { navigate } from '../../../router';

/**
 * Search field + quick-search chips. Desktop: borderless field in the mega panel.
 * Mobile (`bordered`): framed field (dark-green frame on focus) with centred chips.
 * Submitting opens /search?q=… (`onSubmitted` lets a host, e.g. the mobile menu, close itself).
 */
export function SearchBlock({ bordered = false, chips = searchChips, autoFocus = true, onSubmitted, className }) {
  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new FormData(e.currentTarget).get('q')?.toString().trim();
        if (!q) return;
        onSubmitted?.();
        navigate(`/search?q=${encodeURIComponent(q)}`);
      }}
      className={cn('mx-auto flex w-fit min-w-[min(802px,100%)] max-w-full flex-col gap-8', bordered && 'w-full min-w-0 gap-4', className)}
    >
      <SearchField
        autoFocus={autoFocus}
        className={bordered ? 'h-12 flex-row-reverse justify-between rounded-[2px] border border-alpha-d-10 bg-surface-01 px-4 focus-within:border-dacia-dark-green' : undefined}
      />
      <div className={cn('flex flex-wrap gap-1.5', bordered && 'justify-center')}>
        {chips.map((c) => (
          <SearchChip key={c.label} href={c.href}>
            {c.label}
          </SearchChip>
        ))}
      </div>
    </form>
  );
}
