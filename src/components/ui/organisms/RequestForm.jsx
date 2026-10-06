import React from 'react';
import { Input } from '../input';
import { Select } from '../molecules/Select';
import { ConsentBlock } from '../molecules/ConsentBlock';
import { FormSuccess } from '../molecules/FormSuccess';
import { SiteButton } from '../atoms/SiteButton';
import * as val from '../../../lib/validators';

const rules = {
  email: (v, f) => (f.required || v.trim() ? val.email(v) : ''),
  tel: (v, f) => (f.required || v.trim() ? val.phone(v) : ''),
  text: (v, f) => (f.required ? val.required(v, f.error || `Заполните поле «${f.label}»`) : ''),
  select: (v, f) => (f.required ? val.required(v, f.error || `Выберите: ${f.label}`) : ''),
  textarea: (v, f) => (f.required ? val.required(v, f.error || `Заполните поле «${f.label}»`) : ''),
};

/**
 * Config-driven request form for the simple "leave a request" pages (contacts, corporate sales ...). Same behaviour as the
 * dedicated forms: validation on submit (live afterwards), focus on the first error, `onSubmit(values)` hook, success panel.
 * fields: [{ name, label, type: text|email|tel|select|textarea, required, placeholder, options?, cols? (grid span at md: 1-3) }]
 */
export function RequestForm({ fields, consentText = [], submitLabel = 'Отправить', successText, successHref = '/', successLabel = 'На главную', onSubmit, columns = 2, className }) {
  const init = Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? '']));
  const [v, setV] = React.useState({ ...init, consent: false });
  const [errors, setErrors] = React.useState({});
  const [done, setDone] = React.useState(false);
  const ref = React.useRef(null);

  const validate = (values) => {
    const e = {};
    fields.forEach((f) => {
      const msg = (rules[f.type] || rules.text)(values[f.name] ?? '', f);
      if (msg) e[f.name] = msg;
    });
    if (!values.consent) e.consent = 'Необходимо согласие на обработку данных';
    return e;
  };

  const set = (name) => (e) => {
    const value = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setV((p) => {
      const next = { ...p, [name]: value };
      if (errors[name]) setErrors(validate(next));
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      const el = ref.current?.querySelector(`[name="${first}"]`);
      el?.focus?.();
      el?.scrollIntoView?.({ block: 'center' });
      return;
    }
    onSubmit?.(v);
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  if (done) return <FormSuccess text={successText} backHref={successHref} backLabel={successLabel} />;

  const span = { 1: '', 2: 'md:col-span-2', 3: 'md:col-span-3' };
  return (
    <form ref={ref} noValidate onSubmit={submit} className={className}>
      <div className={`grid gap-x-4 gap-y-5 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
        {fields.map((f) => {
          const common = { name: f.name, label: f.label + (f.required ? ' *' : ''), value: v[f.name], onChange: set(f.name), error: !!errors[f.name], errorMessage: errors[f.name], placeholder: f.placeholder };
          const w = span[f.cols] ?? '';
          if (f.type === 'select') return <div key={f.name} className={w}><Select {...common} options={f.options} /></div>;
          if (f.type === 'textarea') return <div key={f.name} className={`${w || 'md:col-span-full'}`}><Input size="l" multiline showScrollbar={false} {...common} /></div>;
          return <div key={f.name} className={w}><Input size="l" type={f.type === 'text' ? 'text' : f.type} autoComplete={f.autoComplete} inputMode={f.type === 'tel' ? 'tel' : undefined} {...common} /></div>;
        })}
      </div>
      <div className="mt-8">
        <ConsentBlock text={consentText} checked={v.consent} onChange={set('consent')} error={errors.consent} />
      </div>
      <SiteButton type="submit" variant="solid" size="l" className="mt-8 max-md:w-full">
        {submitLabel}
      </SiteButton>
    </form>
  );
}
