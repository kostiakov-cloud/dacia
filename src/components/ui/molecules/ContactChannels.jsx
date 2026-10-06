import React from 'react';
import { Phone } from 'lucide-react';
import { cn } from '../utils';
import { ChannelButton } from './ChannelButton';
import { FaceTimeIcon, SignalIcon, TelegramIcon, ViberIcon, WhatsAppIcon } from '../atoms/BrandIcons';
import { contactChannels, phone } from '../../../data/navigation';
import { tr } from '../../../i18n';

const CallIcon = (props) => <Phone size={20} strokeWidth={1.75} {...props} />;
const icons = { FaceTime: FaceTimeIcon, Telegram: TelegramIcon, Viber: ViberIcon, WhatsApp: WhatsAppIcon, Signal: SignalIcon };

/**
 * "Выберите способ связи": centred title + messenger buttons. Used by the desktop mega panel
 * (row of 160px buttons) and the mobile bottom sheet (`hideTitle`, full-width stack).
 * `call` adds a first «Позвонить» button (tel: link, regular mobile call) - passed by the phone-only sheets.
 */
export function ContactChannels({ title = tr('Выберите способ связи'), hideTitle = false, call = false, channels = contactChannels, className }) {
  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      {!hideTitle && (
        <h2 data-mega-item className="font-block text-h6 text-dacia-text-secondary">
          {title}
        </h2>
      )}
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:flex-wrap md:justify-center">
        {call && (
          <ChannelButton icon={CallIcon} href={phone.href}>
            {tr('Позвонить')}
          </ChannelButton>
        )}
        {channels.map((name) => (
          <ChannelButton key={name} icon={icons[name]}>
            {name}
          </ChannelButton>
        ))}
      </div>
    </div>
  );
}
