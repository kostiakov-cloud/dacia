import { tr } from '../i18n';
/**
 * /compare content. The layout follows the dacia.fr comparator (two selectors + side-by-side spec groups); only a thin
 * outline of that page could be read, so the row set below is an assumption. ALL numbers here are PLACEHOLDERS except
 * those that come from data/models.js (price, power, trunk, display, eco class) - replace with real specs.
 */
export const compareIntro = { title: tr('Сравните модели DACIA'), subtitle: tr('Сравните характеристики, размеры и комплектации двух моделей') };

/** Extra specs per model id (the rest is taken from the model itself). */
export const compareSpecs = {
  'logan-new': { fuel: tr('Бензин / LPG'), consumption: tr('5,4 л/100 км'), length: '4 396', width: '1 848', height: '1 517', seats: '5' },
  logan: { fuel: tr('Бензин'), consumption: tr('5,6 л/100 км'), length: '4 396', width: '1 848', height: '1 517', seats: '5' },
  jogger: { fuel: tr('Дизель / гибрид'), consumption: tr('4,9 л/100 км'), length: '4 547', width: '1 848', height: '1 680', seats: '5 / 7' },
  bigster: { fuel: tr('Бензин / гибрид'), consumption: tr('5,8 л/100 км'), length: '4 570', width: '1 813', height: '1 658', seats: '5' },
  'sandero-stepway-new': { fuel: tr('Бензин / LPG'), consumption: tr('5,5 л/100 км'), length: '4 099', width: '1 848', height: '1 535', seats: '5' },
  'sandero-stepway': { fuel: tr('Бензин'), consumption: tr('5,7 л/100 км'), length: '4 099', width: '1 848', height: '1 535', seats: '5' },
  duster: { fuel: tr('Бензин / гибрид'), consumption: tr('5,9 л/100 км'), length: '4 343', width: '1 813', height: '1 658', seats: '5' },
  sandero: { fuel: tr('Бензин / LPG'), consumption: tr('5,2 л/100 км'), length: '4 088', width: '1 848', height: '1 499', seats: '5' },
};

/** Table groups; `get(model, extra)` returns the cell text. */
export const compareGroups = [
  {
    id: 'price',
    title: tr('Цена'),
    rows: [{ label: tr('Цена от'), get: (m) => m.price }],
  },
  {
    id: 'engine',
    title: tr('Двигатель'),
    rows: [
      { label: tr('Топливо'), get: (m, x) => x.fuel },
      { label: tr('Мощность'), get: (m) => m.stats?.[0] && `${m.stats[0].value} ${m.stats[0].unit}` },
      { label: tr('Расход топлива'), get: (m, x) => x.consumption },
      { label: tr('Класс экологичности'), get: (m) => m.eco },
    ],
  },
  {
    id: 'dimensions',
    title: tr('Размеры'),
    rows: [
      { label: tr('Длина, мм'), get: (m, x) => x.length },
      { label: tr('Ширина, мм'), get: (m, x) => x.width },
      { label: tr('Высота, мм'), get: (m, x) => x.height },
      { label: tr('Объём багажника'), get: (m) => m.stats?.[1] && `${m.stats[1].value} ${m.stats[1].unit}` },
      { label: tr('Количество мест'), get: (m, x) => x.seats },
    ],
  },
  {
    id: 'equipment',
    title: tr('Оснащение'),
    rows: [{ label: tr('Мультимедиа, дисплей'), get: (m) => m.stats?.[2]?.value }],
  },
];
