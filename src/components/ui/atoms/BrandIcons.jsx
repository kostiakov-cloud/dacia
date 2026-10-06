import React from 'react';

/** Simplified messenger glyphs (lucide v1 has no brand icons). 20px, currentColor. */
const base = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true };

export const FaceTimeIcon = (props) => (
  <svg {...base} fill="currentColor" {...props}>
    <path d="M4 5h9a3 3 0 0 1 3 3v2.4l4.2-2.8a.8.8 0 0 1 1.3.7v8.4a.8.8 0 0 1-1.3.7L16 13.6V16a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z" />
  </svg>
);
export const TelegramIcon = (props) => (
  <svg {...base} fill="currentColor" {...props}>
    <path d="M21.6 3.4 2.9 10.6c-1.3.5-1.2 1.3-.2 1.6l4.8 1.5 1.8 5.6c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.2-.5-1.8-1.2-1.7ZM8.6 13l9.6-6c.5-.3.9-.1.5.2l-7.8 7.1-.3 3.3-2-4.6Z" />
  </svg>
);
export const ViberIcon = (props) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 4.5c-1.4.9-2 2.4-1.7 4.6.4 2.8 1.8 6.2 4.3 8.7 1.7 1.7 3.8 2.6 5.5 2.8.9.1 1.5-.3 2.2-1l.7-.8c.4-.5.3-.9-.1-1.2l-2-1.3c-.4-.3-.8-.2-1.2.2l-.5.5c-.3.3-.7.3-1.1.1-1.4-.7-2.7-1.9-3.4-3.3-.2-.4-.2-.7.1-1l.5-.5c.4-.4.5-.8.2-1.2L7 5.7c-.4-.6-1.2-.7-2-.2Z" />
    <path d="M14 7.5a3 3 0 0 1 2.5 2.5M13.5 4.5a6 6 0 0 1 6 6" />
  </svg>
);
export const WhatsAppIcon = (props) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.1 3.1l-4.6 1.4Z" />
    <path d="M9 8.6c.2-.5.6-.5 1-.4l.7 1.7c.1.3 0 .5-.2.7l-.5.5c.7 1.4 1.7 2.3 3.1 3l.6-.6c.2-.2.5-.3.8-.1l1.6.8c.3.2.3.6.1 1-.4 1-1.7 1.4-2.8 1.1-3-.9-5-3-5.7-5.4-.2-.8.1-1.5.3-2.3Z" />
  </svg>
);
export const SignalIcon = (props) => (
  <svg {...base} fill="currentColor" {...props}>
    <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="1.2 2.1" strokeLinecap="round" />
    <circle cx="12" cy="12" r="6.2" />
  </svg>
);
