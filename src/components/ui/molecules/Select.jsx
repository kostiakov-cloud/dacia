import React from 'react';
import { cn } from '../utils';
import { ChevronDownIcon } from '../atoms/SliderChevrons';
import { tr } from '../../../i18n';

/**
 * Native <select> dressed like <Input size="l">: same label, 48px field, fcfcfd fill, 1px black/5 border, 2px corners and a
 * chevron. Native = fully accessible and works with the platform pickers on phones. `placeholder` is the empty option
 * (grey while nothing is chosen). `error` / `errorMessage` like <Input>.
 */
export const Select = React.forwardRef(({ label, placeholder = tr('Выберите'), options = [], optionLabels, error = false, errorMessage, className, id, value, ...props }, ref) => {
  const autoId = React.useId();
  const selectId = id || autoId;
  return (
    <div className={cn('flex w-full flex-col gap-1', className)}>
      {label && (
        <label htmlFor={selectId} className="text-[14px] font-normal leading-[24px] text-[#232d3b]">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          value={value}
          aria-invalid={error || undefined}
          className={cn(
            'h-12 w-full appearance-none rounded-[2px] border bg-[#fcfcfd] pl-5 pr-12 text-[16px] font-light leading-[28px] outline-none transition-colors duration-200',
            'focus:border-[#232d3b] focus-visible:ring-2 focus-visible:ring-dacia-dark-green/30',
            value ? 'text-[#232d3b]' : 'text-ink-13',
            error ? 'border-[#c10a26]' : 'border-black/5'
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {optionLabels?.[o] ?? o}
            </option>
          ))}
        </select>
        <ChevronDownIcon size={24} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#333]" />
      </div>
      {error && errorMessage && <p className="text-[12px] font-light leading-[20px] text-[#c10a26]">{errorMessage}</p>}
    </div>
  );
});
Select.displayName = 'Select';
