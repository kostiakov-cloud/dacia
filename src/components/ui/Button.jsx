import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Each variant has:
 *   base  — static styles (border, initial bg/text, ring color)
 *   fill  — the before-pseudo fill layer color that slides in from left
 *   hover — text color override on hover (needed for outline → white text)
 */
const variants = {
  primary: {
    base:  'border border-transparent bg-green-800 text-white',
    fill:  'before:bg-green-950',
    hover: '',
  },
  secondary: {
    base:  'border border-transparent bg-green-100 text-green-900',
    fill:  'before:bg-green-200',
    hover: '',
  },
  outlineSubtle: {
    base:  'border border-gray-300 bg-white text-gray-800',
    fill:  'before:bg-gray-100',
    hover: '',
  },
  ghostSubtle: {
    base:  'border border-transparent bg-transparent text-gray-800',
    fill:  'before:bg-gray-100',
    hover: '',
  },
  outlinePrimary: {
    base:  'border border-green-800 bg-white text-green-800',
    fill:  'before:bg-green-800',
    hover: 'hover:text-white',
  },
  ghostPrimary: {
    base:  'border border-transparent bg-transparent text-green-800',
    fill:  'before:bg-green-800/10',
    hover: '',
  },
};

const sizes = {
  xl:  'h-14 px-8 text-lg',
  lg:  'h-12 px-6 text-base',
  md:  'h-10 px-5 text-sm',
  sm:  'h-9  px-4 text-sm',
  xs:  'h-8  px-3 text-xs',
  xxs: 'h-7  px-2 text-xs',
};

const iconButtonSizes = {
  xl:  'h-14 w-14',
  lg:  'h-12 w-12',
  md:  'h-10 w-10',
  sm:  'h-9  w-9',
  xs:  'h-8  w-8',
  xxs: 'h-7  w-7',
};

const iconSizes = {
  xl: 24, lg: 20, md: 18, sm: 16, xs: 14, xxs: 14,
};

export const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'lg',
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  isIconButton = false,
  disabled = false,
  children,
  ...props
}, ref) => {
  const IconSize = iconSizes[size];
  const v = variants[variant];

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        // Layout & stacking
        'group relative overflow-hidden inline-flex items-center justify-center font-medium rounded-[2px]',
        // Scale interactions
        'transition-all duration-200 ease-in-out',
        'hover:scale-[1.02] active:scale-[0.98]',
        // Focus ring
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2',
        // Disabled
        'disabled:opacity-50 disabled:pointer-events-none',
        // Fill pseudo-element — slides in from left on hover
        'before:absolute before:inset-0 before:-z-10',
        'before:-translate-x-full hover:before:translate-x-0',
        'before:transition-transform before:duration-300 before:ease-out',
        // Per-variant styles
        v.base,
        v.fill,
        v.hover,
        // Size
        isIconButton ? iconButtonSizes[size] : sizes[size],
        className
      )}
      {...props}
    >
      {LeftIcon && (
        <span className={cn('flex items-center', !isIconButton && 'mr-2')}>
          <LeftIcon size={IconSize} strokeWidth={2} />
        </span>
      )}

      {!isIconButton && children}

      {RightIcon && (
        <span className={cn(
          'flex items-center',
          'transition-transform duration-200 group-hover:translate-x-1',
          !isIconButton && 'ml-2'
        )}>
          <RightIcon size={IconSize} strokeWidth={2} />
        </span>
      )}
    </button>
  );
});

Button.displayName = 'Button';
