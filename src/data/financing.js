/**
 * /financing partners. Phone numbers are FICTIONAL French numbers (ARCEP's reserved fiction ranges 01 99 00 xx xx / 06 39 98 xx xx), e-mails
 * use the fictional .md pattern - replace with real ones. `image` = the partner logo { src, alt } (public/images/partners);
 * `logo` = { text, sub, tone } is an optional text fallback when there is no image. `bleed: true` stretches the picture
 * over the whole tile (no padding top / bottom / left); logos are square (or on a square canvas) so nothing is cropped.
 */
export const financingIntro = { title: 'Финансирование' };

export const financingPartners = [
  {
    id: 'bnp-paribas',
    name: 'BNP Paribas',
    phones: ['+33 1 99 00 12 34', '+33 1 99 00 12 35'],
    fax: '+33 1 99 00 12 36',
    email: 'contact@bnpparibas.md',
    link: { label: 'Калькулятор финансирования', href: '/financing/calculator' },
    image: { src: '/images/partners/bnp-placeholder.jpg', alt: 'BNP Paribas' }, // placeholder picture until the real logo is added
    bleed: true,
  },
  {
    id: 'credit-agricole',
    name: 'Crédit Agricole',
    phones: ['+33 1 99 00 45 67', '+33 6 39 98 45 68'],
    fax: '+33 1 99 00 45 69',
    email: 'contact@creditagricole.md',
    link: { label: 'Информация', href: '/contacts' },
    image: { src: '/images/partners/credit-agricole-v3.jpg', alt: 'Crédit Agricole' },
    bleed: true,
  },
  {
    id: 'societe-generale',
    name: 'Société Générale',
    phones: ['+33 1 99 00 78 90'],
    fax: '+33 1 99 00 78 91',
    email: 'contact@societegenerale.md',
    link: { label: 'Калькулятор финансирования', href: '/financing/calculator' },
    image: { src: '/images/partners/societe-generale-v2.jpg', alt: 'Société Générale' },
    bleed: true,
  },
  {
    id: 'groupe-bpce',
    name: 'Groupe BPCE',
    phones: ['+33 1 99 00 24 68'],
    fax: '+33 1 99 00 24 69, +33 1 99 00 24 70',
    email: 'contact@groupebpce.md',
    link: { label: 'Калькулятор финансирования', href: '/financing/calculator' },
    image: { src: '/images/partners/bpce-placeholder.png', alt: 'Groupe BPCE' },
    bleed: true, // placeholder picture until the real logo is added
  },
];
