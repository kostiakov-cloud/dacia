import React from 'react';
import { cn } from '../utils';
import { SearchIcon } from '../atoms/MenuIcons';

/** Big borderless search field: 24px icon + 20px Light input. Focuses itself on mount. */
export const SearchField = React.forwardRef(({ placeholder = 'Что будем искать?', autoFocus = true, className, ...props }, ref) => {
  const inner = React.useRef(null);
  React.useImperativeHandle(ref, () => inner.current);
  React.useEffect(() => {
    if (autoFocus) inner.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  return (
    <label data-mega-item className={cn('flex items-center gap-4', className)}>
      <SearchIcon size={24} />
      <input
        ref={inner}
        type="search"
        name="q"
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-[20px] font-light leading-8 text-dacia-text-secondary outline-none placeholder:text-ink-12 [&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
    </label>
  );
});
SearchField.displayName = 'SearchField';
