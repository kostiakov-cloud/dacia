import React from 'react';
import { Input } from '../ui/input';
import { ConsentBlock } from '../ui/molecules/ConsentBlock';
import { FormSuccess } from '../ui/molecules/FormSuccess';
import { SiteButton } from '../ui/atoms/SiteButton';
import { testDriveCommentMax, testDriveConsentText } from '../../data/testDrive';
import * as val from '../../lib/validators';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

const empty = { name: '', phone: '', email: '', comment: '', consent: false };

// e-mail is optional here (as in the design: no asterisk) - but when typed it must be valid
const validate = (v) =>
  val.collect({
    name: val.required(v.name, tr('Введите имя')),
    phone: val.phone(v.phone),
    email: v.email.trim() ? val.email(v.email) : '',
    consent: v.consent ? '' : tr('Необходимо согласие на обработку данных'),
  });

const groupTitle = 'font-block text-hs5 text-dacia-text-secondary xl:text-h5';

/** Test-drive request form (validation on submit, `onSubmit` hook, success panel - same as the other forms). */
export function TestDriveForm({ onSubmit }) {
  const [v, setV] = React.useState(empty);
  const [errors, setErrors] = React.useState({});
  const [done, setDone] = React.useState(false);
  const formRef = React.useRef(null);

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
      const el = formRef.current?.querySelector(`[name="${first}"]`);
      el?.focus?.();
      el?.scrollIntoView?.({ block: 'center' });
      return;
    }
    onSubmit?.(v);
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  if (done) return <FormSuccess text={tr('Мы свяжемся с вами, чтобы согласовать удобное время тест-драйва.')} backHref="/models" backLabel={tr('Смотреть модели')} />;

  return (
    <form ref={formRef} noValidate onSubmit={submit} aria-label={tr('Заявка на тест-драйв')}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-10 md:px-8 md:py-14 xl:py-16">
        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>{tr('Персональные данные')}</legend>
          <div className="grid gap-x-4 gap-y-5 md:grid-cols-3">
            <Input size="l" label={tr('Имя *')} name="name" autoComplete="name" placeholder={tr('Ваше имя (фамилия и отчество опционально)')} value={v.name} onChange={set('name')} error={!!errors.name} errorMessage={errors.name} />
            <Input size="l" label={tr('Номер телефона *')} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+44 7700 900123" value={v.phone} onChange={set('phone')} error={!!errors.phone} errorMessage={errors.phone} />
            <Input size="l" label={tr('Электронная почта')} name="email" type="email" autoComplete="email" placeholder="example@mail.com" value={v.email} onChange={set('email')} error={!!errors.email} errorMessage={errors.email} />
          </div>
          <div className="mt-5">
            <Input size="l" multiline showScrollbar={false} label={tr('Дополнительная информация')} name="comment" maxLength={testDriveCommentMax} placeholder={tr('Ваш комментарий или пожелания к записи...')} value={v.comment} onChange={set('comment')} />
            <p className="mt-1 text-[12px] font-light leading-4 text-ink-13" aria-live="polite">
              {v.comment.length}/{testDriveCommentMax}
            </p>
          </div>
        </fieldset>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>{tr('Валидация')}</legend>
          <ConsentBlock text={testDriveConsentText} checked={v.consent} onChange={set('consent')} error={errors.consent} />
        </fieldset>

        <div {...reveal()}>
          <SiteButton type="submit" variant="solid" size="l" className="max-md:w-full">
            {tr('Отправить заявку на тест-драйв')}
          </SiteButton>
        </div>
      </div>
    </form>
  );
}
