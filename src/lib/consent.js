/**
 * Cookie consent storage. One JSON value in localStorage: { v, ts, categories: { functional: true, marketing, preferences,
 * measurement, other, social } }. `functional` is always on. Reads / writes never throw (private mode, blocked storage).
 * Other code can ask for the choice with getConsent() / hasConsent('marketing') and react to 'app:consent-change'.
 */
export const CONSENT_KEY = 'dacia-cookie-consent';
export const CONSENT_EVENT = 'app:consent-change';
export const OPEN_CONSENT_EVENT = 'app:open-consent';

export const consentCategories = [
  { id: 'functional', label: 'Функция', locked: true },
  { id: 'marketing', label: 'Маркетинг' },
  { id: 'preferences', label: 'Предпочтения' },
  { id: 'measurement', label: 'Измерение' },
  { id: 'other', label: 'Другие' },
  { id: 'social', label: 'Соцсети' },
];

export function getConsent() {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveConsent(categories) {
  const value = { v: 1, ts: Date.now(), categories: { ...categories, functional: true } };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable: the choice then only lives until reload */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  return value;
}

export const hasConsent = (id) => id === 'functional' || Boolean(getConsent()?.categories?.[id]);

/** Opens the settings dialog again (footer "Cookies" link, the round button bottom-left). */
export const openConsentSettings = () => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
