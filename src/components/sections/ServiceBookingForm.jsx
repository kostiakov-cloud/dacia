import React from 'react';
import { Input } from '../ui/input';
import { Select } from '../ui/molecules/Select';
import { MultiSelect } from '../ui/molecules/MultiSelect';
import { ConsentBlock } from '../ui/molecules/ConsentBlock';
import { FormSuccess } from '../ui/molecules/FormSuccess';
import * as val from '../../lib/validators';
import { SiteButton } from '../ui/atoms/SiteButton';
import { bookingCommentMax, bookingConsentText, bookingDealers, bookingServiceByKey, bookingServices } from '../../data/booking';
import { reveal } from '../../reveal';

const empty = { dealer: '', lastName: '', firstName: '', email: '', phone: '', model: '', plate: '', vin: '', services: [], comment: '', consent: false };

function validate(v) {
  return val.collect({
    firstName: val.required(v.firstName, 'Введите имя'),
    email: val.email(v.email),
    phone: val.phone(v.phone),
    model: val.required(v.model, 'Укажите модель'),
    plate: val.required(v.plate, 'Укажите регистрационный номер'),
    vin: val.vin(v.vin),
    services: v.services.length ? '' : 'Выберите хотя бы один сервис',
    consent: v.consent ? '' : 'Необходимо согласие на обработку данных',
  });
}

const groupTitle = 'font-block text-hs5 text-dacia-text-secondary xl:text-h5';

/**
 * Service booking form. Validation on submit (and live once a field was wrong); the first invalid field gets focus.
 * Nothing is sent anywhere yet - `onSubmit(values)` is the hook for the backend; the success panel is shown after it.
 */
export function ServiceBookingForm({ onSubmit, className }) {
  const preset = React.useMemo(() => {
    const key = new URLSearchParams(window.location.search).get('service');
    const s = bookingServiceByKey[key];
    return s ? { ...empty, services: [s] } : { ...empty, services: [bookingServices[0]] };
  }, []);
  const [v, setV] = React.useState(preset);
  const [errors, setErrors] = React.useState({});
  const [done, setDone] = React.useState(false);
  const formRef = React.useRef(null);

  const set = (name) => (e) => {
    const value = e && e.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
    setV((p) => {
      const next = { ...p, [name]: value };
      if (errors[name]) setErrors(validate(next)); // re-validate live once the user is fixing it
      return next;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(v);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      const el = formRef.current?.querySelector(`[name="${first}"], [data-field="${first}"]`);
      el?.focus?.();
      el?.scrollIntoView?.({ block: 'center' });
      return;
    }
    onSubmit?.(v);
    setDone(true);
    window.scrollTo({ top: 0 });
  };

  if (done) {
    return <FormSuccess backHref="/services" backLabel="Вернуться к сервисам" />;
  }

  return (
    <form ref={formRef} noValidate onSubmit={submit} aria-label="Запись на техническое обслуживание" className={className}>
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10 px-4 py-10 md:px-8 md:py-14 xl:py-16">
        <div {...reveal()} className="grid gap-4 md:grid-cols-3">
          <Select label="Дилер" name="dealer" placeholder="Выберите дилера" options={bookingDealers} value={v.dealer} onChange={set('dealer')} />
        </div>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>Персональные данные</legend>
          <div className="grid gap-x-4 gap-y-5 md:grid-cols-3">
            <Input size="l" label="Фамилия" name="lastName" autoComplete="family-name" placeholder="Ваша фамилия" value={v.lastName} onChange={set('lastName')} />
            <Input size="l" label="Имя *" name="firstName" autoComplete="given-name" placeholder="Ваше имя" value={v.firstName} onChange={set('firstName')} error={!!errors.firstName} errorMessage={errors.firstName} />
            <span className="hidden md:block" aria-hidden />
            <Input size="l" label="Электронная почта *" name="email" type="email" autoComplete="email" placeholder="example@mail.com" value={v.email} onChange={set('email')} error={!!errors.email} errorMessage={errors.email} />
            <Input size="l" label="Номер телефона *" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+44 7700 900123" value={v.phone} onChange={set('phone')} error={!!errors.phone} errorMessage={errors.phone} />
          </div>
        </fieldset>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>Автомобиль</legend>
          <div className="grid gap-x-4 gap-y-5 md:grid-cols-3">
            <Input size="l" label="Модель *" name="model" placeholder="напр. Dacia Duster" value={v.model} onChange={set('model')} error={!!errors.model} errorMessage={errors.model} />
            <Input size="l" label="Регистрационный номер *" name="plate" autoCapitalize="characters" placeholder="напр. ABC 123" value={v.plate} onChange={set('plate')} error={!!errors.plate} errorMessage={errors.plate} />
            <Input size="l" label="Номер кузова (VIN) *" name="vin" autoCapitalize="characters" maxLength={17} placeholder="напр. UU11234567890ABCD" value={v.vin} onChange={(e) => set('vin')(e.target.value.toUpperCase())} error={!!errors.vin} errorMessage={errors.vin} />
          </div>
        </fieldset>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>Дополнительно</legend>
          <div className="flex flex-col gap-5">
            <div data-field="services" tabIndex={-1} className="outline-none">
              <MultiSelect label="Сервисы *" options={bookingServices} value={v.services} onChange={set('services')} error={!!errors.services} errorMessage={errors.services} />
            </div>
            <div>
              <Input
                size="l"
                multiline
                showScrollbar={false}
                label="Дополнительная информация"
                name="comment"
                maxLength={bookingCommentMax}
                placeholder="Ваш комментарий или пожелания к записи..."
                value={v.comment}
                onChange={set('comment')}
              />
              <p className="mt-1 text-[12px] font-light leading-4 text-ink-13" aria-live="polite">
                {v.comment.length}/{bookingCommentMax}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset {...reveal()} className="m-0 min-w-0 border-0 p-0">
          <legend className={`${groupTitle} mb-5 p-0`}>Валидация</legend>
          <ConsentBlock text={bookingConsentText} checked={v.consent} onChange={set('consent')} error={errors.consent} />
        </fieldset>

        <div {...reveal()}>
          <SiteButton type="submit" variant="solid" size="l" className="max-md:w-full">
            Отправить заявку на ТО
          </SiteButton>
        </div>
      </div>
    </form>
  );
}
