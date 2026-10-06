import manifest from './model-images.json';
import { tr } from '../i18n';

/**
 * Model photos: ONE registry for the whole site. Files come from `assets-src/models/<id>.png` via
 * `npm run images:models` (see scripts/optimize-models.mjs) and are described by model-images.json.
 * To swap a car: overwrite its PNG, run the script - home grid, mega menu, mobile menu and every other
 * section pick the new photo up, because they all read `getModelImage(id)` / <ModelImage />.
 */
export function getModelImage(id) {
  const m = manifest[id];
  if (!m) return undefined;
  const file = (w) => `/images/models/${id}-${w}.webp`;
  const mid = m.widths.includes(800) ? 800 : m.widths[m.widths.length - 1];
  return {
    src: file(mid),
    srcSet: m.widths.map((w) => `${file(w)} ${w}w`).join(', '),
    width: m.width,
    height: m.height,
  };
}

/** Model line-up (static data). `image` is filled from the registry above. */
const base = [
  { id: 'logan-new', name: 'Logan', isNew: true, price: '12 880 €', version: tr('Для версии Essential 1,2 GPL') },
  { id: 'jogger', name: 'Jogger', price: '18 880 €', version: tr('Для версии Expression 1,5 dCi 5L'), hybrid: true },
  { id: 'logan', name: 'Logan', price: '10 980 €', version: tr('Для версии Essential 1,0 TCe') },
  { id: 'bigster', name: 'Bigster', price: '20 500 €', version: tr('Для версии Essential TCe 140 CP'), hybrid: true },
  { id: 'sandero-stepway-new', name: 'Sandero Stepway', isNew: true, price: '16 500 €', version: tr('Для версии Extreme 1,5 dCi') },
  { id: 'duster', name: 'Duster', isNew: true, price: '17 700 €', version: tr('Для Expression 1,3 TCe 150 CP EDC'), hybrid: true },
  { id: 'sandero-stepway', name: 'Sandero Stepway', price: '13 880 €', version: tr('Для версии Expression 1,5 dCi') },
  { id: 'sandero', name: 'Sandero', price: '13 990 €', version: tr('Для версии Essential TCe 100 - 25'), hybrid: true },
];

/**
 * PLACEHOLDER spec data for the home model slider (power / trunk / display / eco class) - replace with real values.
 * Only "sandero-stepway-new" comes from the design mock.
 */
const specs = {
  'logan-new': { eco: 'A', stats: [{ value: '90', unit: tr('л.с.'), label: tr('Мощность') }, { value: '528', unit: tr('л'), label: tr('Багажник') }, { value: '8"', label: tr('Дисплей') }] },
  jogger: { eco: 'A', stats: [{ value: '110', unit: tr('л.с.'), label: tr('Мощность') }, { value: '708', unit: tr('л'), label: tr('Багажник') }, { value: '10"', label: tr('Дисплей') }] },
  logan: { eco: 'B', stats: [{ value: '90', unit: tr('л.с.'), label: tr('Мощность') }, { value: '528', unit: tr('л'), label: tr('Багажник') }, { value: '8"', label: tr('Дисплей') }] },
  bigster: { eco: 'A', stats: [{ value: '140', unit: tr('л.с.'), label: tr('Мощность') }, { value: '667', unit: tr('л'), label: tr('Багажник') }, { value: '10"', label: tr('Дисплей') }] },
  'sandero-stepway-new': { eco: 'A', stats: [{ value: '120', unit: tr('л.с.'), label: tr('Мощность') }, { value: '1 455', unit: tr('л'), label: tr('Багажник') }, { value: '10"', label: tr('Дисплей') }] },
  duster: { eco: 'A', stats: [{ value: '130', unit: tr('л.с.'), label: tr('Мощность') }, { value: '517', unit: tr('л'), label: tr('Багажник') }, { value: '10"', label: tr('Дисплей') }] },
  'sandero-stepway': { eco: 'B', stats: [{ value: '90', unit: tr('л.с.'), label: tr('Мощность') }, { value: '328', unit: tr('л'), label: tr('Багажник') }, { value: '8"', label: tr('Дисплей') }] },
  sandero: { eco: 'B', stats: [{ value: '100', unit: tr('л.с.'), label: tr('Мощность') }, { value: '328', unit: tr('л'), label: tr('Багажник') }, { value: '8"', label: tr('Дисплей') }] },
};

export const models = base.map((m) => ({
  ...m,
  ...specs[m.id],
  priceValue: Number(m.price.replace(/\D/g, '')), // '12 880 €' -> 12880 (catalogue price filter)
  image: getModelImage(m.id),
}));
