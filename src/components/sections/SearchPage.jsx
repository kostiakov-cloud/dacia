import React from 'react';
import { PageBand } from '../ui/molecules/PageBand';
import { SearchField } from '../ui/molecules/SearchField';
import { SearchChip } from '../ui/atoms/SearchChip';
import { search, searchLabels } from '../../lib/search';
import { navigate } from '../../router';
import { searchChips } from '../../data/navigation';
import { tr } from '../../i18n';

/** /search?q=…: framed field + grouped results from the local index (lib/search.js). */
export function SearchPage() {
  const q = new URLSearchParams(window.location.search).get('q') || '';
  const [text, setText] = React.useState(q);
  React.useEffect(() => setText(q), [q]);
  const results = React.useMemo(() => search(q), [q]);
  const groups = Object.keys(searchLabels).map((type) => [type, results.filter((r) => r.type === type)]).filter(([, r]) => r.length);
  return (
    <>
      <PageBand title={tr('Поиск')}>
        <form role="search" onSubmit={(e) => { e.preventDefault(); navigate(`/search?q=${encodeURIComponent(text.trim())}`, { replace: true }); }} className="mx-auto mt-6 max-w-[640px]">
          <SearchField autoFocus={false} value={text} onChange={(e) => setText(e.target.value)} className="h-12 flex-row-reverse justify-between rounded-cr2 border border-alpha-d-10 bg-surface-01 px-4 focus-within:border-dacia-dark-green" />
        </form>
      </PageBand>
      <div className="mx-auto max-w-[800px] px-4 py-10 md:px-8 md:py-14">
        <p className="mb-8 text-center text-root text-ink-13" aria-live="polite">
          {q ? (results.length ? tr('Найдено результатов: {length} по запросу «{q}»', { length: results.length, q }) : tr('По запросу «{q}» ничего не найдено', { q })) : tr('Введите запрос, чтобы найти модель, новость или раздел сайта')}
        </p>
        {groups.map(([type, items]) => (
          <section key={type} className="mb-10 last:mb-0" aria-label={searchLabels[type]}>
            <h2 className="mb-2 border-b border-alpha-d-10 pb-3 font-block text-hs6 text-dacia-text-secondary xl:text-h6">{searchLabels[type]}</h2>
            <ul>
              {items.map((r) => (
                <li key={r.href + r.title} className="border-b border-alpha-d-5">
                  <a href={r.href} className="block py-4 transition-colors hover:text-dacia-dark-green focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green">
                    <span className="text-root font-medium text-dacia-text-secondary">{r.title}</span>
                    {r.text.trim() && <span className="mt-1 line-clamp-2 block text-small font-light text-ink-13">{r.text.trim()}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {!results.length && (
          <div className="flex flex-wrap justify-center gap-1.5">
            {searchChips.map((c) => <SearchChip key={c.label} href={c.href}>{c.label}</SearchChip>)}
          </div>
        )}
      </div>
    </>
  );
}
