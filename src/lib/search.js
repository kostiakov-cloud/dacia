import { navigation } from '../data/navigation';
import { models } from '../data/models';
import { articles } from '../data/articles';
import { faqGroups } from '../data/faq';
import { contentPages } from '../data/content';
import { dealers } from '../data/dealers';
import { tr } from '../i18n';

/**
 * Client-side search index over the site's own data: models, news, FAQ, text pages, dealers and navigation links.
 * Each entry = { type, title, text, href }. Matching is case-insensitive; every word of the query must occur.
 */
const sectionLabel = { models: tr('Модели'), article: tr('Новости'), faq: tr('Вопросы'), page: tr('Страницы'), dealer: tr('Дилеры'), link: tr('Разделы') };

function build() {
  const out = [];
  models.forEach((m) => out.push({ type: 'models', title: m.name, text: `${m.version} ${m.price}`, href: `/models/${m.id}` }));
  articles.forEach((a) => out.push({ type: 'article', title: a.title, text: a.excerpt || '', href: `/news/${a.slug}` }));
  faqGroups.forEach((g) => g.items.forEach((it) => out.push({ type: 'faq', title: it.q, text: typeof it.a === 'string' ? it.a : '', href: '/faq' })));
  Object.entries(contentPages).forEach(([href, p]) => out.push({ type: 'page', title: p.title, text: `${p.subtitle || ''} ${(p.sections || []).map((s) => `${s.title} ${(s.paragraphs || []).join(' ')}`).join(' ')}`, href }));
  dealers.forEach((d) => out.push({ type: 'dealer', title: d.name, text: `${d.city} ${d.address}`, href: `/dealers#${d.id}` }));
  const seen = new Set();
  navigation.forEach((n) => n.sections?.forEach((s) => s.links?.forEach((l) => {
    if (l.href && !seen.has(l.href + l.label)) { seen.add(l.href + l.label); out.push({ type: 'link', title: l.label, text: n.label, href: l.href }); }
  })));
  return out;
}

let index;
export const searchLabels = sectionLabel;

export function search(query) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  index ??= build();
  return index
    .map((e) => {
      const t = e.title.toLowerCase();
      const all = `${t} ${e.text.toLowerCase()}`;
      if (!words.every((w) => all.includes(w))) return null;
      return { ...e, score: words.reduce((s, w) => s + (t.includes(w) ? 2 : 1), 0) };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
}
