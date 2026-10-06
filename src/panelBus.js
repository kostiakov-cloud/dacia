/**
 * Lets any component open a panel of the site header (the mega-menu panels: 'contact', 'search', 'models' ...).
 *   openPanel('contact')  ->  the same "Выберите способ связи" panel as the phone number in the header
 * Desktop / tablet: the header's <Menu> listens and opens the panel under the bar (with the blurred backdrop).
 * Phones: <SiteHeader> shows the same content as a bottom sheet.
 */
export const OPEN_PANEL_EVENT = 'app:open-panel';

export function openPanel(id) {
  window.dispatchEvent(new CustomEvent(OPEN_PANEL_EVENT, { detail: { id } }));
}
