/**
 * i18n core. The site is written in Russian (the source language): every user-facing string in the code is wrapped in
 * `tr('Русский текст')`. For `ro` the string is looked up in the dictionary (src/i18n/ro, loaded before the app starts);
 * a missing key falls back to the Russian text. The language comes from the URL prefix (/ru/..., /ro/...) and is fixed for
 * the lifetime of the page: the switcher does a full navigation to the same page under the other prefix, so module-level
 * data (menus, news, forms ...) can be translated once at import time.
 *
 * Maintenance: `node scripts/i18n-check.mjs` lists tr() keys that have no Romanian translation (and stale dictionary keys).
 */
export const LANGS = ['ru', 'ro'];
export const DEFAULT_LANG = 'ru';
const STORE_KEY = 'dacia-lang';

const PREFIX_RE = /^\/(ru|ro)(?=\/|$)/;

/** '/ro/models/duster' -> 'ro', '/models' -> null */
export const langOf = (pathname) => pathname.match(PREFIX_RE)?.[1] ?? null;
/** '/ro/models/duster' -> '/models/duster', '/ru' -> '/' */
export const stripLang = (pathname) => pathname.replace(PREFIX_RE, '') || '/';

function preferred() {
  try {
    const saved = localStorage.getItem(STORE_KEY);
    if (LANGS.includes(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return (navigator.language || '').toLowerCase().startsWith('ro') ? 'ro' : DEFAULT_LANG;
}

// An address without a language prefix (old link, typed URL) is redirected to the visitor's language before anything renders.
if (typeof window !== 'undefined' && !langOf(window.location.pathname)) {
  const { pathname, search, hash } = window.location;
  window.history.replaceState({}, '', `/${preferred()}${pathname === '/' ? '' : pathname}${search}${hash}`);
}

export const lang = typeof window === 'undefined' ? DEFAULT_LANG : langOf(window.location.pathname);
if (typeof document !== 'undefined') document.documentElement.lang = lang;

/** BCP-47 locale for Intl */
export const locale = lang === 'ro' ? 'ro-RO' : 'ru-RU';

let dictionary = {};

/** Loads the Romanian dictionary (a separate chunk, Russian visitors never download it). Call before importing the app. */
export async function loadDictionary() {
  if (lang === 'ro') dictionary = (await import('./ro/index.js')).default;
}

/** Translate a source (Russian) string. `vars` fills {name} placeholders: tr('Оценка {value} из 5', { value }) */
export const tr = (text, vars) => {
  const out = lang === 'ru' ? text : dictionary[text] ?? text;
  return vars ? out.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m)) : out;
};

/** Prefix an in-site path with a language: withLang('/models', 'ro') -> '/ro/models' */
export const withLang = (path, l = lang) => {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  const rest = stripLang(path.split(/[?#]/)[0]);
  const tail = path.slice(path.split(/[?#]/)[0].length);
  return `/${l}${rest === '/' ? '' : rest}${tail}`;
};

/** Full navigation to the same page in another language (the choice is remembered). */
export function switchLang(next) {
  if (next === lang) return;
  try {
    localStorage.setItem(STORE_KEY, next);
  } catch {
    /* ignore */
  }
  const { pathname, search, hash } = window.location;
  window.location.assign(`/${next}${stripLang(pathname) === '/' ? '' : stripLang(pathname)}${search}${hash}`);
}

/** Language names as shown in the switcher (never translated): short for the header, full for the mobile menu. */
export const langShort = { ro: 'Ro', ru: 'Ру' };
export const langFull = { ro: 'Română', ru: 'Русский' };

/** Number with thousands separated by a thin non-breaking space: 12880 -> '12 880' */
export const formatNumber = (n) => new Intl.NumberFormat(locale).format(n).replace(/[  ]/g, ' ');
