import React from 'react';
import { BottomSheet } from '../molecules/BottomSheet';
import { ContactChannels } from '../molecules/ContactChannels';

/** "Выберите способ связи" as a bottom sheet (phones). Lazy-loaded by <SiteHeader>. */
export default function ContactSheet({ open, onClose }) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Выберите способ связи">
      <ContactChannels hideTitle />
    </BottomSheet>
  );
}
