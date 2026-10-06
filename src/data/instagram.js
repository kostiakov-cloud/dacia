import { tr } from '../i18n';
/**
 * Instagram block data. Static for now: 4:5 portrait WebP crops live in public/images/instagram/ (`<name>-480.webp`, `<name>-800.webp`); add a row to `items`.
 * `video: true` shows the small play badge in the corner (as on reels in the design). A live feed can replace
 * `instagramPosts` later without touching the components: keep this shape
 *   { id, href (post URL), alt, image: { src, srcSet? } }.
 * Without `image` a tile shows a gradient placeholder.
 */
export const instagramProfile = {
  title: tr('Мы в Instagram'), // visually hidden heading (the strip has no visible title in the design)
  href: '#', // profile URL
};

const photo = (name, widths = [480, 800]) => ({
  src: `/images/instagram/${name}-${widths[widths.length - 1]}.webp`,
  srcSet: widths.map((w) => `/images/instagram/${name}-${w}.webp ${w}w`).join(', '),
});

// Square crops made from the supplied photos (public/images/instagram). `href` = post URL (fill in later).
const items = [
  ['spring-top', tr('Dacia Spring сверху'), [480, 640]],
  ['duster-interior', tr('Салон Dacia Duster')],
  ['striker', tr('Dacia Striker на горной дороге')],
  ['bigster-city', tr('Dacia Bigster в городе')],
  ['duster-sunset', tr('Dacia Duster на закате')],
  ['bigster-lake', tr('Dacia Bigster у озера')],
];

export const instagramPosts = items.map(([name, alt, widths], i) => ({
  id: `ig-${i + 1}`,
  href: '#',
  alt,
  video: false,
  image: photo(name, widths),
}));
