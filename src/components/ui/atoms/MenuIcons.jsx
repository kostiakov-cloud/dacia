import React from 'react';
import { cn } from '../utils';
import phone from '../../../assets/menu/phone.svg';
import search from '../../../assets/menu/search.svg';

/** Figma icons used by Menu (stroke #333). Phone renders at 24px to match the live design, search at 20px. */
const make = (src, name, defaultSize = 20, defaultClass) => {
  const Icon = ({ size = defaultSize, className, ...props }) => (
    <img src={src} alt="" width={size} height={size} className={cn('shrink-0', defaultClass, className)} {...props} />
  );
  Icon.displayName = name;
  return Icon;
};

export const PhoneIcon = make(phone, 'PhoneIcon', 24, '-mr-0.5');
export const SearchIcon = make(search, 'SearchIcon');
