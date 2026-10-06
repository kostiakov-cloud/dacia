import React from 'react';
import { stripLang, withLang } from './i18n';

/**
 * Tiny History-API router (no dependency). Routes are matched by pathname in App.jsx.
 *  - every URL carries a language prefix (/ru/..., /ro/...): `navigate()` and links add the current one, `usePath()` returns the path
 *    WITHOUT it, so the route table in App.jsx stays language-free (see src/i18n);
 *  - `navigate(to)` pushes a URL, notifies subscribers and scrolls to the top;
 *  - `usePath()` re-renders on navigation / back / forward;
 *  - <RouterLinks /> (mounted once) turns every same-origin <a href="/..."> click into client-side navigation,
 *    so plain anchors in any component work without special <Link> wrappers. A click that something already
 *    handled (`defaultPrevented`), modifier-clicks, `target`, `download` and external URLs are left alone.
 */
export const NAVIGATE_EVENT = 'app:navigate';
const EVENT = NAVIGATE_EVENT;

export function navigate(to, { replace = false } = {}) {
  to = withLang(to);
  if (to === window.location.pathname + window.location.search + window.location.hash) {
    // same URL: a repeated click on an in-page anchor should still scroll there
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && !id.startsWith('/')) document.getElementById(id)?.scrollIntoView({ block: 'start' });
    return;
  }
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
  return stripLang(React.useSyncExternalStore(subscribe, () => window.location.pathname, () => '/'));
}

/** `/services` -> `/ru/services` for every in-site anchor (so hover / new-tab / copy-link show the real address). Assets (`/x.pdf`) are left alone. */
const needsPrefix = (href) => href && href[0] === '/' && href[1] !== '/' && !/^\/(ru|ro)(\/|$|[?#])/.test(href) && !/\.[a-z0-9]{2,5}([?#]|$)/i.test(href);

function prefixAnchors(root) {
  const list = root.matches?.('a[href]') ? [root] : [];
  root.querySelectorAll?.('a[href^="/"]').forEach((a) => list.push(a));
  list.forEach((a) => {
    const href = a.getAttribute('href');
    if (needsPrefix(href)) a.setAttribute('href', withLang(href));
  });
}

export function RouterLinks() {
  React.useEffect(() => {
    prefixAnchors(document);
    let queued = false;
    const pending = new Set();
    const flush = () => {
      queued = false;
      pending.forEach((n) => n.isConnected && prefixAnchors(n));
      pending.clear();
    };
    const observer = new MutationObserver((records) => {
      records.forEach((r) => pending.add(r.type === 'attributes' ? r.target : null));
      records.forEach((r) => r.addedNodes.forEach((n) => n.nodeType === 1 && pending.add(n)));
      pending.delete(null);
      if (!queued && pending.size) {
        queued = true;
        requestAnimationFrame(flush);
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a || a.target || a.hasAttribute('download')) return;
      const raw = a.getAttribute('href');
      if (!raw.startsWith('/') || raw.startsWith('//')) return; // external, mailto:, tel:, plain #anchors and #/showcase: browser default
      if (!needsPrefix(raw) && !/^\/(ru|ro)(\/|$|[?#])/.test(raw)) return; // asset files
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener('click', onClick);
    };
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
