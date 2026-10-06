import { useEffect, useState } from 'react';

/** Live `matchMedia` flag. Reads synchronously on first render, so there is no layout flash. */
export function useMediaQuery(query) {
  const get = () => typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Tailwind-aligned breakpoints. */
export const useIsMd = () => useMediaQuery('(min-width: 768px)');
export const useIsXl = () => useMediaQuery('(min-width: 1280px)');
