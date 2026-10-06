import React from 'react';

/**
 * Tiny History-API router (no dependency). Routes are matched by pathname in App.jsx.
 *  - `navigate(to)` pushes a URL, notifies subscribers and scrolls to the top;
 *  - `usePath()` re-renders on navigation / back / forward;
 *  - <RouterLinks /> (mounted once) turns every same-origin <a href="/..."> click into client-side navigation,
 *    so plain anchors in any component work without special <Link> wrappers. A click that something already
 *    handled (`defaultPrevented`), modifier-clicks, `target`, `download` and external URLs are left alone.
 */
export const NAVIGATE_EVENT = 'app:navigate';
const EVENT = NAVIGATE_EVENT;

export function navigate(to, { replace = false } = {}) {
  if (to === window.location.pathname + window.location.search + window.location.hash) return;
  window.history[replace ? 'replaceState' : 'pushState']({}, '', to);
  window.dispatchEvent(new Event(EVENT));
  if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' });
}

const subscribe = (cb) => {
  window.addEventListener('popstate', cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(EVENT, cb);
  };
};

export function usePath() {
  return React.useSyncExternalStore(subscribe, () => window.location.pathname, () => '/');
}

export function RouterLinks() {
  React.useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a || a.target || a.hasAttribute('download')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // hash-only links (anchors, #/showcase) keep the browser's behaviour
      if (url.pathname === window.location.pathname && url.hash) return;
      if (!a.getAttribute('href').startsWith('/')) return;
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}

/**
 * After a client-side navigation to /path#id, scroll to the element once the (possibly lazy) page has rendered it:
 * polls for ~3s. Same-page anchors (<a href="#id">) are handled natively by the browser (smooth, see index.css).
 */
export function useScrollToHash() {
  const key = React.useSyncExternalStore(subscribe, () => window.location.pathname + window.location.hash, () => '/');
  React.useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2 || hash.startsWith('#/')) return undefined;
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 30) {
        clearInterval(timer);
        el?.scrollIntoView({ block: 'start' });
      }
    }, 100);
    return () => clearInterval(timer);
  }, [key]);
}
