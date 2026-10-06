import { tr } from '../i18n';
/**
 * News cards for the home page. `layout` (desktop, 2-column grid, 280px rows):
 *   'text-image' - text + 280px photo on the right;  'text' - text only;  'image' - photo only;
 *   'wide'       - full-width row: 592px media on the left + text (use with `video: true` for the play badge).
 * Below xl every card is a vertical card (photo on top). `show` controls where it appears:
 *   'all' = phones, tablets and desktop;  'md' = tablets and desktop;  'xl' = desktop only (as in the design).
 * `phone: true` additionally shows the card on phones (the mobile design lists 3 news: premiere, EcoRun, IAA).
 * `image` = { src, srcSet } (WebP in public/images) - null shows a gradient placeholder; `imageClass` = object-position for the crop;
 * `videoUrl` (YouTube) turns the card into a video card: a click opens the player instead of the link. Texts of items 2 and 4 are
 * PLACEHOLDERS (lorem ipsum / no copy in the design).
 */
export const news = [
  {
    id: 'premiere-suv',
    layout: 'text-image',
    show: 'all',
    title: tr('Премьера, которая меняет правила игры в сегменте доступных SUV'),
    text: tr('В 2025 году Dacia представляет премьеру даже по меркам мировой автомобильной индустрии: запускает первую в мире систему, которая делает автомобиль ещё доступнее.'),
    href: '/news/premiere-suv',
    image: { src: '/images/news-premiere-600.webp', srcSet: '/images/news-premiere-600.webp 600w' },
    imageClass: 'object-[58%_50%]',
  },
  {
    id: 'new-generation',
    layout: 'text',
    show: 'xl',
    title: tr('Новое поколение Dacia'),
    text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque suscipit tellus interdum lacus id, pellentesque ac turpis massa dictum netus tempus urna felis aliquam sociis. Ut imperdiet semper nostra bibendum tortor eu, molestie justo at quam fermentum, sodales magnis placerat aptent vehicula.',
    href: '/news/new-generation',
    image: null,
  },
  {
    id: 'ecorun',
    layout: 'text-image',
    show: 'xl',
    phone: true,
    title: tr('DACIA — ген. партнер соревнований EcoRun'),
    text: tr('Новая Dacia Duster стала официальным автомобилем соревнований EcoRun, где участники соревнуются в экономичности и бережном отношении к природе.'),
    href: '/news/ecorun',
    image: { src: '/images/news-ecorun-600.webp', srcSet: '/images/news-ecorun-600.webp 600w' },
    imageClass: 'object-[52%_50%]',
  },
  {
    id: 'duster-offroad',
    layout: 'image',
    show: 'xl',
    title: tr('Dacia Duster на бездорожье'),
    text: '',
    href: '/news/duster-offroad',
    image: { src: '/images/news-offroad-800.webp', srcSet: '/images/news-offroad-800.webp 800w, /images/news-offroad-1200.webp 1200w' },
    imageClass: 'object-[62%_50%]',
  },
  {
    id: 'iaa-2021',
    layout: 'wide',
    video: true,
    show: 'md',
    phone: true,
    title: tr('Мировая премьера DACIA на IAA MOBILITY 2021 в Мюнхене'),
    text: tr('Бренд Dacia примет участие в Международном автосалоне в Мюнхене в 2021 году и впервые в мире представит многоцелевую семейную модель на 7 мест.'),
    href: '/news/iaa-2021',
    image: { src: '/images/news-iaa-1192.webp', srcSet: '/images/news-iaa-640.webp 640w, /images/news-iaa-1192.webp 1192w' },
    videoUrl: 'https://www.youtube.com/watch?v=PHZsROeZN7E',
  },
];

export const newsMoreCta = { label: tr('Читать больше новостей'), href: '/news' };
