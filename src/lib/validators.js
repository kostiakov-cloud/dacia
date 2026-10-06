import { tr } from '../i18n';
/** Shared form validators (used by the booking and trade-in forms). Each returns an error text or ''. */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^\+?[\d\s()\-]{7,20}$/;
export const vinRe = /^[A-HJ-NPR-Z0-9]{17}$/i;

export const required = (v, msg) => (String(v ?? '').trim() ? '' : msg);
export const email = (v) => (!v.trim() ? tr('Введите электронную почту') : emailRe.test(v.trim()) ? '' : tr('Проверьте адрес электронной почты'));
export const phone = (v) => (!v.trim() ? tr('Введите номер телефона') : phoneRe.test(v.trim()) ? '' : tr('Проверьте номер телефона'));
export const vin = (v) => (!v.trim() ? tr('Укажите номер кузова (VIN)') : vinRe.test(v.trim()) ? '' : tr('VIN состоит из 17 символов (латиница и цифры, без I, O, Q)'));

/** Runs { field: errorText } checks, keeps only the non-empty ones. */
export const collect = (checks) => Object.fromEntries(Object.entries(checks).filter(([, e]) => e));
