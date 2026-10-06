import React from 'react';

/** Slider chevrons from the design (32px box, 2px square-cap stroke). Colour via `currentColor`. */
const base = { width: 32, height: 32, viewBox: '0 0 32 32', fill: 'none', 'aria-hidden': true };

export const ChevronLeftIcon = ({ size = 32, ...props }) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M18.6641 24L11.9974 16L18.6641 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export const ChevronRightIcon = ({ size = 32, ...props }) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M13.3359 24L20.0026 16L13.3359 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

/** Vertical pair (mobile model picker): up = previous, down = next. */
export const ChevronUpIcon = ({ size = 32, ...props }) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M8 18.6667L16 12.0001L24 18.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export const ChevronDownIcon = ({ size = 32, ...props }) => (
  <svg {...base} width={size} height={size} {...props}>
    <path d="M8 13.3333L16 19.9999L24 13.3333" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);
