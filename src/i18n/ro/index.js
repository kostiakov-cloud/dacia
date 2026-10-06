import ui from './ui.js';
import data1 from './data1.js';
import data2 from './data2.js';
import content from './content.js';

/** Romanian dictionary: Russian source string -> Romanian. Loaded only for /ro/... (see src/i18n/index.js). */
export default { ...ui, ...data1, ...data2, ...content };
