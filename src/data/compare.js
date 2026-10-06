/**
 * /compare content. The layout follows the dacia.fr comparator (two selectors + side-by-side spec groups); only a thin
 * outline of that page could be read, so the row set below is an assumption. ALL numbers here are PLACEHOLDERS except
 * those that come from data/models.js (price, power, trunk, display, eco class) - replace with real specs.
 */
export const compareIntro = { title: 'Сравните модели DACIA', subtitle: 'Сравните характеристики, размеры и комплектации двух моделей' };

/** Extra specs per model id (the rest is taken from the model itself). */
export const compareSpecs = {
  'logan-new': { fuel: 'Бензин / LPG', consumption: '5,4 л/100 км', length: '4 396', width: '1 848', height: '1 517', seats: '5' },
  logan: { fuel: 'Бензин', consumption: '5,6 л/100 км', length: '4 396', width: '1 848', height: '1 517', seats: '5' },
  jogger: { fuel: 'Дизель / гибрид', consumption: '4,9 л/100 км', length: '4 547', width: '1 848', height: '1 680', seats: '5 / 7' },
  bigster: { fuel: 'Бензин / гибрид', consumption: '5,8 л/100 км', length: '4 570', width: '1 813', height: '1 658', seats: '5' },
  'sandero-stepway-new': { fuel: 'Бензин / LPG', consumption: '5,5 л/100 км', length: '4 099', width: '1 848', height: '1 535', seats: '5' },
  'sandero-stepway': { fuel: 'Бензин', consumption: '5,7 л/100 км', length: '4 099', width: '1 848', height: '1 535', seats: '5' },
  duster: { fuel: 'Бензин / гибрид', consumption: '5,9 л/100 км', length: '4 343', width: '1 813', height: '1 658', seats: '5' },
  sandero: { fuel: 'Бензин / LPG', consumption: '5,2 л/100 км', length: '4 088', width: '1 848', height: '1 499', seats: '5' },
};

/** Table groups; `get(model, extra)` returns the cell text. */
export const compareGroups = [
  {
    id: 'price',
    title: 'Цена',
    rows: [{ label: 'Цена от', get: (m) => m.price }],
  },
  {
    id: 'engine',
    title: 'Двигатель',
    rows: [
      { label: 'Топливо', get: (m, x) => x.fuel },
      { label: 'Мощность', get: (m) => m.stats?.[0] && `${m.stats[0].value} ${m.stats[0].unit}` },
      { label: 'Расход топлива', get: (m, x) => x.consumption },
      { label: 'Класс экологичности', get: (m) => m.eco },
    ],
  },
  {
    id: 'dimensions',
    title: 'Размеры',
    rows: [
      { label: 'Длина, мм', get: (m, x) => x.length },
      { label: 'Ширина, мм', get: (m, x) => x.width },
      { label: 'Высота, мм', get: (m, x) => x.height },
      { label: 'Объём багажника', get: (m) => m.stats?.[1] && `${m.stats[1].value} ${m.stats[1].unit}` },
      { label: 'Количество мест', get: (m, x) => x.seats },
    ],
  },
  {
    id: 'equipment',
    title: 'Оснащение',
    rows: [{ label: 'Мультимедиа, дисплей', get: (m) => m.stats?.[2]?.value }],
  },
];
