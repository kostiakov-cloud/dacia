import React from 'react';
import { Input } from '../ui/input';
import { Select } from '../ui/molecules/Select';
import { ConsentBlock } from '../ui/molecules/ConsentBlock';
import { FormSuccess } from '../ui/molecules/FormSuccess';
import { SiteButton } from '../ui/atoms/SiteButton';
import { offerRequestCommentMax, offerRequestConsentText, offerRequestModelByKey, offerRequestModels } from '../../data/offerRequest';
import * as val from '../../lib/validators';
import { reveal } from '../../reveal';
import { tr } from '../../i18n';

const empty = { model: '', lastName: '', firstName: '', email: '', phone: '', comment: '', consent: false };

const validate = (v) =>
  val.collect({
    model: val.required(v.model, tr('Выберите модель')),
    firstName: val.required(v.firstName, tr('Введите имя')),
    email: val.email(v.email),
    phone: val.phone(v.phone),
    consent: v.consent ? '' : tr('Необходимо согласие на обработку данных'),
  });

const groupTitle = 'font-block text-hs5 text-dacia-text-secondary xl:text-h5';

/** "Get an offer" form: same behaviour as the booking / trade-in forms (validation on submit, `onSubmit` hook, success panel). */
export function OfferRequestForm({ onSubmit }) {
  const preset = React.useMemo(() => {
    const m = offerRequestModelByKey[new URLSearchParams(window.location.search).get('model')];
    return m ? { ...empty, model: m } : empty;
  }, []);
  const [v, setV] = React.useState(preset);
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

  if (done) return <FormSuccess text={tr('Мы подготовим предложение и свяжемся с вами в ближайшее время.')} backHref="/offers" backLabel={tr('Все предложения')} />;

  return (
    <form ref={formRef} noValidate onSubmit={submit} aria-label={tr('Заявка на предложение')}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-10 md:px-8 md:py-14 xl:py-16">
        <div {...reveal()} className="grid gap-4 md:grid-cols-3">
          <Select label={tr('Модель *')} name="model" placeholder={tr('Выберите модель')} options={offerRequestModels} value={v.model} onChange={set('model')} error={!!errors.model} errorMessage={errors.model} />
        </div>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>{tr('Персональные данные')}</legend>
          <div className="grid gap-x-4 gap-y-5 md:grid-cols-3">
            <Input size="l" label={tr('Фамилия')} name="lastName" autoComplete="family-name" placeholder={tr('Ваша фамилия')} value={v.lastName} onChange={set('lastName')} />
            <Input size="l" label={tr('Имя *')} name="firstName" autoComplete="given-name" placeholder={tr('Ваше имя')} value={v.firstName} onChange={set('firstName')} error={!!errors.firstName} errorMessage={errors.firstName} />
            <span className="hidden md:block" aria-hidden />
            <Input size="l" label={tr('Электронная почта *')} name="email" type="email" autoComplete="email" placeholder="example@mail.com" value={v.email} onChange={set('email')} error={!!errors.email} errorMessage={errors.email} />
            <Input size="l" label={tr('Номер телефона *')} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+44 7700 900123" value={v.phone} onChange={set('phone')} error={!!errors.phone} errorMessage={errors.phone} />
          </div>
        </fieldset>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>{tr('Дополнительно')}</legend>
          <Input size="l" multiline showScrollbar={false} label={tr('Дополнительная информация')} name="comment" maxLength={offerRequestCommentMax} placeholder={tr('Ваш комментарий или пожелания к записи...')} value={v.comment} onChange={set('comment')} />
          <p className="mt-1 text-[12px] font-light leading-4 text-ink-13" aria-live="polite">
            {v.comment.length}/{offerRequestCommentMax}
          </p>
        </fieldset>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>{tr('Юридическая информация')}</legend>
          <ConsentBlock text={offerRequestConsentText} checked={v.consent} onChange={set('consent')} error={errors.consent} />
        </fieldset>

        <div {...reveal()}>
          <SiteButton type="submit" variant="solid" size="l" className="max-md:w-full">
            {tr('Получить предложение')}
          </SiteButton>
        </div>
      </div>
    </form>
  );
}
