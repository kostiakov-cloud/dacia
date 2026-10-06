import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import infoIcon from '../../assets/input/info-circle.svg';
import skrollImg from '../../assets/input/skroll.svg';
import scaleImg from '../../assets/input/scale.svg';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * ds/Input — Figma component set OKUX / node 6243:83625.
 *
 * Variants:  Size = S | M | L | XL | XXL
 *            Message = False (input) | True (textarea, `multiline`)
 *            Type = Default | 1 (success)
 *            `borderless` removes the outline (e.g. on dark backgrounds)
 * Toggles:   Show Title / Show Label (`floatingLabel`) / Caption / Metric before & after
 *            (`before` / `after`) / Button (`action`) / Skroll + Scale (textarea).
 *
 * Tokens: text #232d3b, placeholder #697482 (Text Pale Blue/13), caption #707c87, bg #fcfcfd,
 * border rgba(0,0,0,.05), radius 2, success #70c039, button #4e5844.
 */
const sizes = {
  s: {
    title: 'text-[12px] leading-[20px]',
    box: 'h-8',
    area: 'min-h-[94px]',
    field: 'px-3 py-1 gap-2 text-[12px] leading-[20px]',
    px: 'px-3',
    caption: 'leading-[16px]',
    icon: 16,
  },
  m: {
    title: 'text-[12px] leading-[20px]',
    box: 'h-10',
    area: 'min-h-[118px]',
    field: 'px-4 py-2 gap-2 text-[14px] leading-[24px]',
    px: 'px-4',
    caption: 'leading-[16px]',
    icon: 20,
  },
  l: {
    title: 'text-[14px] leading-[24px]',
    box: 'h-12',
    area: 'min-h-[142px]',
    field: 'px-5 py-2 gap-3 text-[16px] leading-[28px]',
    px: 'px-5',
    caption: 'leading-[20px]',
    icon: 20,
  },
  xl: {
    title: 'text-[14px] leading-[24px]',
    box: 'h-14',
    area: 'min-h-[130px]',
    field: 'px-6 py-3 gap-3 text-[14px] leading-[24px]',
    px: 'px-6',
    caption: 'leading-[20px]',
    icon: 20,
  },
  xxl: {
    title: 'text-[14px] leading-[24px]',
    box: 'h-16',
    area: 'min-h-[130px]',
    field: 'px-7 py-4 gap-3 text-[16px] leading-[28px]',
    px: 'px-7',
    caption: 'leading-[20px]',
    icon: 24,
  },
};

const border = {
  default: 'border-black/5 focus-within:border-[#232d3b]',
  success: 'border-[#70c039]',
  error: 'border-[#c10a26]',
};

/** Dark-green button attached to the field (Figma `ds/Button`). `inner` = inset 4px variant. */
function Action({ label, icon: Icon, inner, iconSize, ...rest }) {
  const iconOnly = !label;
  const button = (
    <button
      type="button"
      className={cn(
        'flex shrink-0 items-center justify-center gap-1 bg-[#4e5844] text-[12px] font-medium leading-[20px] text-white',
        'transition-opacity hover:opacity-90 disabled:cursor-not-allowed',
        inner ? 'h-full rounded-[2px]' : 'self-stretch rounded-r-[2px]',
        iconOnly ? 'aspect-square' : 'px-4 py-1.5'
      )}
      {...rest}
    >
      {Icon && <Icon size={inner ? 16 : iconSize} strokeWidth={1.5} />}
      {label}
    </button>
  );
  return inner ? <div className="flex shrink-0 p-1 self-stretch">{button}</div> : button;
}

export const Input = React.forwardRef(({
  size = 'm',
  label,
  info = false,
  floatingLabel = false,
  caption,
  error = false,
  errorMessage,
  success = false,
  multiline = false,
  showScrollbar = true,
  disabled = false,
  borderless = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  before,
  after,
  action,
  className,
  id,
  ...props
}, ref) => {
  const s = sizes[size] || sizes.m;
  const status = error ? 'error' : success ? 'success' : 'default';
  const message = error && errorMessage ? errorMessage : caption;
  const autoId = React.useId();
  const inputId = id || autoId;

  const control = cn(
    'min-w-0 flex-1 bg-transparent font-light text-[#232d3b] outline-none',
    'placeholder:text-ink-13 disabled:cursor-not-allowed'
  );

  const addon = (node, side) => (
    <div
      className={cn(
        'flex min-w-[120px] shrink-0 items-center gap-2 self-stretch bg-[#fcfcfd] text-[14px] font-light leading-[24px] text-ink-13',
        s.px,
        side === 'before' ? 'border-r border-black/[0.02]' : 'border-l border-black/5'
      )}
    >
      {node}
    </div>
  );

  const titleNode = label && (
    <div
      className={cn(
        'flex items-center gap-1',
        floatingLabel && 'absolute left-3 top-0 z-10 -translate-y-1/2 bg-white px-1'
      )}
    >
      <label
        htmlFor={inputId}
        className={cn(
          'whitespace-nowrap font-normal text-[#232d3b]',
          floatingLabel ? 'text-[11px] leading-[16px]' : s.title
        )}
      >
        {label}
      </label>
      {info && <img src={infoIcon} alt="" width={12} height={12} className="shrink-0" />}
    </div>
  );

  return (
    <div className={cn('relative flex w-full flex-col gap-1', className)}>
      {titleNode}

      <div
        className={cn(
          'relative flex overflow-clip rounded-[2px] border bg-[#fcfcfd] transition-colors duration-200',
          multiline ? 'items-stretch' : cn('items-center', s.box),
          borderless ? 'border-0' : border[status],
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        {!multiline && before && addon(before, 'before')}

        <div className={cn('flex min-w-0 flex-1 items-center self-stretch', !multiline && s.field)}>
          {LeftIcon && <LeftIcon size={s.icon} strokeWidth={1.5} className="shrink-0 text-[#333333]" />}
          {multiline ? (
            <textarea
              ref={ref}
              id={inputId}
              disabled={disabled}
              aria-invalid={error || undefined}
              className={cn(control, s.field, s.area, 'resize-y [&::-webkit-resizer]:bg-transparent')}
              {...props}
            />
          ) : (
            <input
              ref={ref}
              id={inputId}
              disabled={disabled}
              aria-invalid={error || undefined}
              className={control}
              {...props}
            />
          )}
          {RightIcon && <RightIcon size={s.icon} strokeWidth={1.5} className="shrink-0 text-[#333333]" />}
        </div>

        {!multiline && after && addon(after, 'after')}
        {!multiline && action && <Action iconSize={s.icon} {...action} />}

        {multiline && showScrollbar && (
          <img
            src={skrollImg}
            alt=""
            width={4}
            height={64}
            className="pointer-events-none absolute right-3 top-[11px]"
          />
        )}
        {multiline && (
          <img
            src={scaleImg}
            alt=""
            width={12}
            height={12}
            className="pointer-events-none absolute bottom-[7px] right-[7px]"
          />
        )}
      </div>

      {message && (
        <p
          className={cn(
            'font-light',
            s.caption,
            error ? 'text-[12px] text-[#c10a26]' : 'text-[11px] text-[#707c87]'
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
