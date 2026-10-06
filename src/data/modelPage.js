import { formatNumber, tr } from '../i18n';
/**
 * /models/:id extras. ALL PLACEHOLDER: trims, equipment and the intro text are made up for the layout (prices derive
 * from the model's own price). Specs table reuses data/compare.js.
 */
const priceNum = (m) => m.priceValue;
const fmt = (n) => `${formatNumber(n)} €`;

export const trimsFor = (m) => [
  { id: 'essential', name: 'Essential', price: fmt(priceNum(m)), items: [tr('Кондиционер'), tr('Электростеклоподъёмники'), tr('Круиз-контроль с ограничителем'), tr('Мультимедиа 8"')] },
  { id: 'expression', name: 'Expression', price: fmt(priceNum(m) + 1500), items: [tr('Всё из Essential'), tr('Климат-контроль'), tr('Камера заднего вида'), tr('Легкосплавные диски 16"')] },
  { id: 'extreme', name: 'Extreme', price: fmt(priceNum(m) + 2900), items: [tr('Всё из Expression'), tr('Мультимедиа 10" с навигацией'), tr('Бесключевой доступ'), tr('Светодиодные фары')] },
];

export const modelIntro = (m) =>
  tr('{name} — надёжный, просторный и простой в использовании автомобиль по честной цене. Подберите комплектацию, сравните с другими моделями и запишитесь на тест-драйв.', { name: m.name });

export const modelHighlights = [
  { title: tr('Надёжность'), text: tr('3 года гарантии или 100 000 км пробега.') },
  { title: tr('Простор'), text: tr('Просторный салон и вместительный багажник в своём классе.') },
  { title: tr('Экономичность'), text: tr('Низкий расход и недорогое обслуживание.') },
];
