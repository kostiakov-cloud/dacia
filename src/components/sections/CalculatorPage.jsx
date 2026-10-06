import React from 'react';
import { PageBand } from '../ui/molecules/PageBand';
import { Select } from '../ui/molecules/Select';
import { SiteButton } from '../ui/atoms/SiteButton';
import { models } from '../../data/models';
import { formatNumber, tr } from '../../i18n';

const fmt = (n) => `${formatNumber(Math.round(n))} €`;
const RATE = 7.9; // % per year, PLACEHOLDER: replace with the partner bank's rate

/** Annuity payment: P * r / (1 - (1 + r)^-n), r = monthly rate. */
export function monthlyPayment(principal, years, ratePct) {
  const n = years * 12;
  const r = ratePct / 100 / 12;
  return r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
}

function Slider({ label, min, max, step, value, onChange, format }) {
  const id = React.useId();
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[14px] text-[#232d3b]">{label}</label>
        <output htmlFor={id} className="text-small font-medium text-dacia-text-secondary">{format(value)}</output>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(+e.target.value)} className="h-6 w-full cursor-pointer accent-dacia-dark-green" />
    </div>
  );
}

/** /financing/calculator: model (sets the price), down payment and term sliders, live monthly payment (placeholder rate). */
export function CalculatorPage() {
  const [id, setId] = React.useState('duster');
  const price = models.find((m) => m.id === id).priceValue;
  const [down, setDown] = React.useState(20);
  const [years, setYears] = React.useState(5);
  const downSum = (price * down) / 100;
  const principal = price - downSum;
  const monthly = monthlyPayment(principal, years, RATE);
  const total = monthly * years * 12;
  return (
    <>
      <PageBand title={tr('Калькулятор финансирования')} subtitle={tr('Оцените ежемесячный платёж. Расчёт ориентировочный и не является предложением банка.')} />
      <div className="mx-auto grid max-w-[1000px] gap-10 px-4 py-10 md:px-8 md:py-14 xl:grid-cols-2 xl:gap-16 xl:py-16">
        <div className="flex flex-col gap-8">
          <Select label={tr('Модель')} value={id} onChange={(e) => setId(e.target.value)} options={models.map((m) => m.id)} optionLabels={Object.fromEntries(models.map((m) => [m.id, `${m.name} · ${m.price}`]))} />
          <Slider label={tr('Первоначальный взнос')} min={0} max={60} step={5} value={down} onChange={setDown} format={(v) => `${v} %`} />
          <Slider label={tr('Срок')} min={1} max={7} step={1} value={years} onChange={setYears} format={(v) => `${v} ${v === 1 ? tr('год') : v < 5 ? tr('года') : tr('лет')}`} />
        </div>
        <section aria-live="polite" aria-label={tr('Результат расчёта')} className="flex flex-col rounded-cr2 border border-alpha-d-10 bg-surface-03 p-6 md:p-8">
          <p className="text-small font-light text-ink-13">{tr('Ежемесячный платёж')}</p>
          <p className="mt-1 font-block text-hs3 text-dacia-text-secondary xl:text-h3">{fmt(monthly)}</p>
          <dl className="mt-6 flex flex-col gap-3 border-t border-alpha-d-10 pt-6 text-small">
            {[[tr('Цена автомобиля'), fmt(price)], [tr('Первоначальный взнос'), `${fmt(downSum)} (${down}%)`], [tr('Сумма кредита'), fmt(principal)], [tr('Срок'), tr('{n0} мес.', { n0: years * 12 })], [tr('Ставка (ориентировочно)'), `${RATE} %`], [tr('Общая выплата'), fmt(total)]].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4"><dt className="font-light text-ink-13">{k}</dt><dd className="text-right font-medium text-dacia-text-secondary">{v}</dd></div>
            ))}
          </dl>
          <SiteButton href={`/offer-request?model=${id}`} className="mt-8 max-md:w-full">{tr('Получить предложение')}</SiteButton>
          <SiteButton href="/financing" variant="outline" className="mt-3 max-md:w-full">{tr('Банки-партнёры')}</SiteButton>
        </section>
      </div>
    </>
  );
}
