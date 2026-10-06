import React from 'react';
import { CompareCard } from '../ui/molecules/CompareCard';
import { models as modelsData } from '../../data/models';
import { compareGroups, compareIntro, compareSpecs } from '../../data/compare';
import { reveal } from '../../reveal';

const labelOf = (m) => `${m.isNew ? 'Новый ' : ''}${m.name}${m.version ? ` (${m.version.replace(/^Для версии /, '')})` : ''}`;

/**
 * /compare?models=<idA>,<idB>: two model cards on top (each with a picker), then the spec groups side by side
 * (label centred above its two values, rows on alternating tints). Picking a model keeps the URL in sync
 * (history.replaceState), so a comparison can be shared. The same model can never be on both sides.
 */
export function ComparePage({ models = modelsData }) {
  const ids = models.map((m) => m.id);
  const fromUrl = () => {
    const q = (new URLSearchParams(window.location.search).get('models') || '').split(',');
    const a = ids.includes(q[0]) ? q[0] : ids[0];
    const b = ids.includes(q[1]) && q[1] !== a ? q[1] : ids.find((i) => i !== a);
    return [a, b];
  };
  const [pair, setPair] = React.useState(fromUrl);

  const set = (slot) => (id) => {
    if (!id) return;
    setPair((p) => {
      const next = [...p];
      next[slot] = id;
      if (next[0] === next[1]) next[1 - slot] = p[slot]; // swap instead of showing the same car twice
      window.history.replaceState({}, '', `/compare?models=${next.join(',')}`);
      return next;
    });
  };

  const [left, right] = pair.map((id) => models.find((m) => m.id === id));
  const options = (other) => models.filter((m) => m.id !== other).map((m) => ({ value: m.id, label: labelOf(m) }));
  const x = (m) => compareSpecs[m.id] || {};

  return (
    <>
      <section aria-labelledby="compare-page-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-8 md:py-14">
          <h1 id="compare-page-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            {compareIntro.title}
          </h1>
          <p className="mx-auto mt-3 max-w-[760px] text-small font-medium text-ink-13 md:text-root">{compareIntro.subtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-[1100px] px-4 py-10 md:px-8 md:py-14">
        <div {...reveal()} className="grid grid-cols-2 gap-4 md:gap-10">
          <CompareCard model={left} label="Первая модель" side="left" options={options(right.id)} onChange={set(0)} />
          <CompareCard model={right} label="Вторая модель" side="right" options={options(left.id)} onChange={set(1)} />
        </div>

        <div className="mt-12 md:mt-16" aria-live="polite">
          {compareGroups.map((g) => (
            <section key={g.id} aria-labelledby={`cmp-${g.id}`} {...reveal()} className="mb-8 last:mb-0 md:mb-10">
              <h2 id={`cmp-${g.id}`} className="border-b border-alpha-d-10 pb-3 text-center font-block text-hs5 text-dacia-text-secondary xl:text-h5">
                {g.title}
              </h2>
              <dl>
                {g.rows.map((r, i) => (
                  <div key={r.label} className={i % 2 === 0 ? 'bg-surface-03' : ''}>
                    <dt className="px-2 pt-3 text-center text-caption font-light text-ink-13">{r.label}</dt>
                    <dd className="grid grid-cols-2 gap-4 px-2 pb-3 text-center text-root font-medium text-dacia-text-secondary md:gap-10">
                      <span>{r.get(left, x(left)) || '—'}</span>
                      <span>{r.get(right, x(right)) || '—'}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
