import React from 'react';
import { ServiceBookingForm } from './ServiceBookingForm';
import { reveal } from '../../reveal';

/** /service-booking: light title band + the booking form. */
export function ServiceBookingPage() {
  return (
    <>
      <section aria-labelledby="booking-title" className="border-b border-alpha-d-3 bg-surface-03">
        <div {...reveal('fade')} className="mx-auto max-w-[1280px] px-4 py-10 text-center md:px-8 md:py-14">
          <h1 id="booking-title" className="font-block text-hs2 text-dacia-text-secondary xl:text-h2">
            Запись на техническое обслуживание
          </h1>
        </div>
      </section>
      <ServiceBookingForm />
    </>
  );
}
