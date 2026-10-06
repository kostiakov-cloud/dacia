import React from 'react';
import { Checkbox } from '../atoms/Checkbox';

/** Scrollable consent text + the "I agree" checkbox (+ error). Shared by the forms. `text` = string[] paragraphs. */
export function ConsentBlock({ text = [], checked, onChange, error, name = 'consent', label = 'Я ознакомлен(а) и согласен(сна) с условиями обработки персональных данных.' }) {
  return (
    <>
      <div tabIndex={0} role="region" aria-label="Согласие на обработку персональных данных" className="max-h-36 overflow-y-auto rounded-cr2 border border-alpha-d-5 bg-surface-02 p-4 text-small font-light text-ink-13 focus:outline-none focus-visible:ring-2 focus-visible:ring-dacia-dark-green">
        {text.map((t) => (
          <p key={t} className="mb-2 last:mb-0">
            {t}
          </p>
        ))}
      </div>
      <div className="mt-5">
        <Checkbox name={name} checked={checked} onChange={onChange} error={!!error} label={label} />
        {error && (
          <p role="alert" className="mt-1 text-[12px] font-light leading-[20px] text-[#c10a26]">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
