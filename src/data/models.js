import manifest from './model-images.json';

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
  { id: 'logan-new', name: 'Logan', isNew: true, price: '12 880 €', version: 'Для версии Essential 1,2 GPL' },
  { id: 'jogger', name: 'Jogger', price: '18 880 €', version: 'Для версии Expression 1,5 dCi 5L', hybrid: true },
  { id: 'logan', name: 'Logan', price: '10 980 €', version: 'Для версии Essential 1,0 TCe' },
  { id: 'bigster', name: 'Bigster', price: '20 500 €', version: 'Для версии Essential TCe 140 CP', hybrid: true },
  { id: 'sandero-stepway-new', name: 'Sandero Stepway', isNew: true, price: '16 500 €', version: 'Для версии Extreme 1,5 dCi' },
  { id: 'duster', name: 'Duster', isNew: true, price: '17 700 €', version: 'Для Expression 1,3 TCe 150 CP EDC', hybrid: true },
  { id: 'sandero-stepway', name: 'Sandero Stepway', price: '13 880 €', version: 'Для версии Expression 1,5 dCi' },
  { id: 'sandero', name: 'Sandero', price: '13 990 €', version: 'Для версии Essential TCe 100 - 25', hybrid: true },
];

/**
 * PLACEHOLDER spec data for the home model slider (power / trunk / display / eco class) - replace with real values.
 * Only "sandero-stepway-new" comes from the design mock.
 */
const specs = {
  'logan-new': { eco: 'A', stats: [{ value: '90', unit: 'л.с.', label: 'Мощность' }, { value: '528', unit: 'л', label: 'Багажник' }, { value: '8"', label: 'Дисплей' }] },
  jogger: { eco: 'A', stats: [{ value: '110', unit: 'л.с.', label: 'Мощность' }, { value: '708', unit: 'л', label: 'Багажник' }, { value: '10"', label: 'Дисплей' }] },
  logan: { eco: 'B', stats: [{ value: '90', unit: 'л.с.', label: 'Мощность' }, { value: '528', unit: 'л', label: 'Багажник' }, { value: '8"', label: 'Дисплей' }] },
  bigster: { eco: 'A', stats: [{ value: '140', unit: 'л.с.', label: 'Мощность' }, { value: '667', unit: 'л', label: 'Багажник' }, { value: '10"', label: 'Дисплей' }] },
  'sandero-stepway-new': { eco: 'A', stats: [{ value: '120', unit: 'л.с.', label: 'Мощность' }, { value: '1 455', unit: 'л', label: 'Багажник' }, { value: '10"', label: 'Дисплей' }] },
  duster: { eco: 'A', stats: [{ value: '130', unit: 'л.с.', label: 'Мощность' }, { value: '517', unit: 'л', label: 'Багажник' }, { value: '10"', label: 'Дисплей' }] },
  'sandero-stepway': { eco: 'B', stats: [{ value: '90', unit: 'л.с.', label: 'Мощность' }, { value: '328', unit: 'л', label: 'Багажник' }, { value: '8"', label: 'Дисплей' }] },
  sandero: { eco: 'B', stats: [{ value: '100', unit: 'л.с.', label: 'Мощность' }, { value: '328', unit: 'л', label: 'Багажник' }, { value: '8"', label: 'Дисплей' }] },
};

export const models = base.map((m) => ({
  ...m,
  ...specs[m.id],
  priceValue: Number(m.price.replace(/\D/g, '')), // '12 880 €' -> 12880 (catalogue price filter)
  image: getModelImage(m.id),
}));
