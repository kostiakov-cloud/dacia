/**
 * Service tiles. `image` = { src, srcSet } (WebP in public/images/service-<id>-<w>.webp); without it the tile shows a
 * gradient. The current photos are 280px sources: sharp at 1x, a bit soft on 2x screens - drop larger files in
 * (service-<id>-560.webp ...) and extend `photo()` widths to improve it. The description texts are PLACEHOLDERS
 * (only "Проверка шин" is taken from the design mock).
 */
const photo = (id, widths = [280]) => ({
  src: `/images/service-${id}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((w) => `/images/service-${id}-${w}.webp ${w}w`).join(', '),
});

export const services = [
  {
    id: 'oil',
    title: 'Замена масла',
    text: 'Своевременная замена масла и фильтров продлевает срок службы двигателя и сохраняет его мощность.',
    href: '#',
    image: photo('oil'),
  },
  {
    id: 'tires',
    title: 'Проверка шин',
    text: 'Проверим износ и давление в шинах, чтобы обеспечить оптимальное сцепление с дорогой.',
    href: '#',
    image: photo('tires'),
  },
  {
    id: 'ac',
    title: 'Кондиционер',
    text: 'Диагностика и заправка кондиционера, чистка салонного фильтра: комфорт в любую погоду.',
    href: '#',
    image: photo('ac'),
  },
  {
    id: 'brakes',
    title: 'Тормоза',
    text: 'Проверка колодок, дисков и тормозной жидкости: ваша безопасность на дороге.',
    href: '#',
    image: photo('brakes'),
  },
];

export const servicesCta = { label: 'Запись на техобслуживание', href: '#' };
export const servicesButtonLabel = 'Записаться на ТО';
