/**
 * /models/:id extras. ALL PLACEHOLDER: trims, equipment and the intro text are made up for the layout (prices derive
 * from the model's own price). Specs table reuses data/compare.js.
 */
const priceNum = (m) => m.priceValue;
const fmt = (n) => `${new Intl.NumberFormat('ru-RU').format(n).replace(/ /g, ' ')} €`;

export const trimsFor = (m) => [
  { id: 'essential', name: 'Essential', price: fmt(priceNum(m)), items: ['Кондиционер', 'Электростеклоподъёмники', 'Круиз-контроль с ограничителем', 'Мультимедиа 8"'] },
  { id: 'expression', name: 'Expression', price: fmt(priceNum(m) + 1500), items: ['Всё из Essential', 'Климат-контроль', 'Камера заднего вида', 'Легкосплавные диски 16"'] },
  { id: 'extreme', name: 'Extreme', price: fmt(priceNum(m) + 2900), items: ['Всё из Expression', 'Мультимедиа 10" с навигацией', 'Бесключевой доступ', 'Светодиодные фары'] },
];

export const modelIntro = (m) =>
  `${m.name} — надёжный, просторный и простой в использовании автомобиль по честной цене. Подберите комплектацию, сравните с другими моделями и запишитесь на тест-драйв.`;

export const modelHighlights = [
  { title: 'Надёжность', text: '3 года гарантии или 100 000 км пробега.' },
  { title: 'Простор', text: 'Просторный салон и вместительный багажник в своём классе.' },
  { title: 'Экономичность', text: 'Низкий расход и недорогое обслуживание.' },
];
