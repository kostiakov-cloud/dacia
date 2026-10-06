import { tr } from '../i18n';
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
    title: tr('Замена масла'),
    text: tr('Своевременная замена масла и фильтров продлевает срок службы двигателя и сохраняет его мощность.'),
    href: '/services#oil',
    bookingHref: '/service-booking?service=oil',
    image: photo('oil'),
  },
  {
    id: 'tires',
    title: tr('Проверка шин'),
    text: tr('Проверим износ и давление в шинах, чтобы обеспечить оптимальное сцепление с дорогой.'),
    href: '/services#tires',
    bookingHref: '/service-booking?service=tires',
    image: photo('tires'),
  },
  {
    id: 'ac',
    title: tr('Кондиционер'),
    text: tr('Диагностика и заправка кондиционера, чистка салонного фильтра: комфорт в любую погоду.'),
    href: '/services#ac',
    bookingHref: '/service-booking?service=ac',
    image: photo('ac'),
  },
  {
    id: 'brakes',
    title: tr('Тормоза'),
    text: tr('Проверка колодок, дисков и тормозной жидкости: ваша безопасность на дороге.'),
    href: '/services#brakes',
    bookingHref: '/service-booking?service=brakes',
    image: photo('brakes'),
  },
];

export const servicesCta = { label: tr('Запись на техобслуживание'), href: '/service-booking' };
export const servicesButtonLabel = tr('Записаться на ТО');
