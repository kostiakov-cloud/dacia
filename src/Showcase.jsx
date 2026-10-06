import React from 'react';
import { Button } from './components/ui/Button';
import { Input } from "./components/ui/input";
import { Menu, PhoneIcon } from './components/ui/organisms/Menu';
import { MegaMenuPanels, contactPanel, megaNav, searchPanel } from './components/ui/organisms/MegaMenuPanels';
import { Footer } from './components/ui/Footer';
import { MenuItem } from './components/ui/atoms/MenuItem';
import { CheckCircle, ChevronRight, Mail, Search } from 'lucide-react';

const SIZES = ['xl', 'lg', 'md', 'sm', 'xs', 'xxs'];
const VARIANTS = [
  'primary',
  'secondary',
  'ghostSubtle',
  'outlineSubtle',
  'outlinePrimary',
  'ghostPrimary',
];

const INPUT_SIZES = ['s', 'm', 'l', 'xl', 'xxl'];

function MenuDemo(props) {
  return (
    <Menu {...props}>
      <Menu.Logo />
      <Menu.Nav>
        {megaNav.map(({ panel, label }) => (
          <Menu.Item key={panel} panel={panel}>{label}</Menu.Item>
        ))}
        <Menu.Group>
          <Menu.Item panel={contactPanel} trigger="click" icon={<PhoneIcon />}>022 205 860</Menu.Item>
          <Menu.Language />
          <Menu.Search panel={searchPanel} />
        </Menu.Group>
      </Menu.Nav>
      <Menu.Actions>
        <Menu.Cta>Запросить тест-драйв</Menu.Cta>
      </Menu.Actions>
      <MegaMenuPanels />
    </Menu>
  );
}

export default function Showcase() {
  return (
    <>
    <div className="p-10 bg-gray-50 min-h-screen text-gray-900 overflow-auto">
        {/* Menu Showcase */}
      <div className="flex flex-col gap-8 mb-16">
          <h2 className="text-xl font-semibold">Menu — click an item to open its mega menu</h2>
          <p className="text-sm text-gray-500 -mb-4">Static — <code>floating={'{false}'}</code> (64px, white, bottom border)</p>
          <MenuDemo floating={false} />
          <p className="text-sm text-gray-500 -mb-4">Floating — default (sticky, 16px margins, 48px, translucent)</p>
          <div className="min-h-[640px] bg-gradient-to-b from-[#3b4636] to-[#14170f] pt-4 pb-24">
            <MenuDemo />
          </div>
          <div className="flex flex-wrap items-center gap-8 bg-white p-6">
            <MenuItem>Default</MenuItem>
            <MenuItem active>Active</MenuItem>
            <MenuItem variant="title">Menu title</MenuItem>
            <MenuItem chevron>With chevron</MenuItem>
            <MenuItem active chevron="up">Open</MenuItem>
            <MenuItem icon={<PhoneIcon />}>With icon</MenuItem>
            <MenuItem mobile>Mobile</MenuItem>
          </div>
        </div>

      <h1 className="text-3xl font-bold mb-2">Button Component Showcase1</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Hover over the buttons below to see the <code>scale-[1.02]</code> effect, smooth background transition, and the right icon sliding (<code>translate-x-1</code>). Click to see the <code>active:scale-[0.98]</code> press effect.
      </p>
      
      <div className="flex flex-col gap-12 max-w-[1400px]">
        {VARIANTS.map((variant) => (
          <div key={variant} className="flex flex-wrap items-end gap-12">
            
            {/* Standard Buttons */}
            <div className="flex items-end gap-6 flex-wrap">
              {SIZES.map((size) => (
                <Button 
                  key={`btn-${size}`} 
                  variant={variant} 
                  size={size}
                  leftIcon={CheckCircle}
                  rightIcon={ChevronRight}
                >
                  Button
                </Button>
              ))}
            </div>

            {/* Spacer */}
            <div className="w-8 hidden xl:block" />

            {/* Icon Buttons */}
            <div className="flex items-end gap-6 flex-wrap">
              {SIZES.map((size) => (
                <Button 
                  key={`icon-${size}`} 
                  variant={variant} 
                  size={size}
                  leftIcon={CheckCircle}
                  isIconButton
                  aria-label={`${variant} icon button size ${size}`}
                />
              ))}
            </div>
            
          </div>
        ))}

        {/* Disabled State Row Example (Primary) */}
        <div className="flex flex-wrap items-end gap-12 opacity-80 pt-8 border-t border-gray-200 mt-4">
          <div className="w-full mb-[-2rem]"><h2 className="text-xl font-semibold text-gray-500">Disabled State (Primary)</h2></div>
          <div className="flex items-end gap-6 flex-wrap mt-8">
            {SIZES.map((size) => (
              <Button 
                key={`disabled-btn-${size}`} 
                variant="primary" 
                size={size}
                leftIcon={CheckCircle}
                rightIcon={ChevronRight}
                disabled
              >
                Button
              </Button>
            ))}
          </div>
          <div className="w-8 hidden xl:block" />
          <div className="flex items-end gap-6 flex-wrap mt-8">
            {SIZES.map((size) => (
              <Button 
                key={`disabled-icon-${size}`} 
                variant="primary" 
                size={size}
                leftIcon={CheckCircle}
                isIconButton
                disabled
              />
            ))}
          </div>
        </div>

        {/* Input Showcase */}
        <div className="flex flex-col gap-8 pt-8 border-t border-gray-200 mt-4">
          <h2 className="text-xl font-semibold">Input — Shorthand API</h2>
          <p className="text-gray-500 text-sm -mt-4">All props passed directly, auto-renders label/field/caption.</p>

          <div className="grid grid-cols-2 gap-6 max-w-[900px]">
            {INPUT_SIZES.map((size) => (
              <Input key={size} size={size} label={`Title (${size})`} info placeholder="Input text" caption="Field caption here" />
            ))}
            <Input label="With icons" placeholder="Input text" leftIcon={Search} rightIcon={Mail} />
            <Input label="Success" placeholder="Input text" success />
            <Input label="Error" placeholder="Input text" error errorMessage="Error: This field is mandatory" />
            <Input label="Disabled" placeholder="Input text" disabled />
            <Input label="Floating label" floatingLabel placeholder="Input text" />
            <Input label="Metric + button" placeholder="Input text" before={<span>Text</span>} action={{ label: 'Button' }} />
            <Input label="Metric after + icon button" placeholder="Input text" after={<span>Text</span>} action={{ icon: CheckCircle, 'aria-label': 'Confirm' }} />
            <Input label="Inner button" placeholder="Input text" action={{ label: 'Button', inner: true }} />
            <Input size="s" multiline label="Textarea S" placeholder="Input text" />
            <Input size="m" multiline label="Textarea M" placeholder="Input text" />
            <Input size="l" multiline label="Textarea L" placeholder="Input text" />
            <Input size="xxl" multiline label="Textarea XXL" placeholder="Input text" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
