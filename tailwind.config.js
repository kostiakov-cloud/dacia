import fs from 'fs';
import path from 'path';

// Read resolved tokens
const tokensPath = path.resolve(process.cwd(), './src/resolved-tokens.json');
let tokens = {};
if (fs.existsSync(tokensPath)) {
  tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));
}

// Helper to extract values recursively
function extractValues(obj) {
  const result = {};
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if ('value' in obj[key]) {
        // If it's a typography object, we might want to map it to Tailwind format
        if (obj[key].type === 'typography') {
          const v = obj[key].value;
          result[key] = [
            `${v.fontSize}px`, 
            {
              lineHeight: v.lineHeight,
              letterSpacing: v.letterSpacing,
              fontWeight: v.fontWeight
            }
          ];
        } else if (obj[key].type === 'boxShadow') {
          const v = obj[key].value;
          if (Array.isArray(v)) {
            result[key] = v.map(s => `${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(', ');
          } else {
            result[key] = `${v.x}px ${v.y}px ${v.blur}px ${v.spread}px ${v.color}`;
          }
        } else {
          result[key] = obj[key].value;
        }
      } else {
        const nested = extractValues(obj[key]);
        if (Object.keys(nested).length > 0) {
          result[key] = nested;
        }
      }
    }
  }
  return result;
}

// Current Figma export (src/tokens.json, set "OKUX/Light"). The resolved-tokens.json
// above is built from the legacy sets only, so OKUX/Dacia tokens are read directly here.
const okuxPath = path.resolve(process.cwd(), './src/tokens.json');
const okux = fs.existsSync(okuxPath) ? (JSON.parse(fs.readFileSync(okuxPath, 'utf8'))['OKUX/Light'] || {}) : {};
const slug = (s) => s.toLowerCase().replace(/\(.*?\)/g, '').replace(/%/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const hexGroup = (group, keyFn = slug) =>
  Object.fromEntries(
    Object.entries(group || {})
      .filter(([, v]) => v && typeof v.value === 'string' && v.value.startsWith('#'))
      .map(([k, v]) => [keyFn(k), v.value])
  );
// dacia-dark-green, dacia-text-secondary, ... | surface-01..20 (BG Pale Blue) | ink-01..20 (Text Pale Blue) | alpha-d-3 (Transparent/D 3%)
const dacia = hexGroup(okux['Dacia']);
const surface = hexGroup(okux['BG Pale Blue'], (k) => k);
const ink = hexGroup(okux['Text Pale Blue'], (k) => k);
const alpha = hexGroup(okux['Transparent']);
// status colours: status-success (Fresh Lime), status-danger (Crimson), status-warning (Amber)
const tokenHex = (k) => (okux[k] && typeof okux[k].value === 'string' ? okux[k].value : undefined);
const status = { success: tokenHex('Fresh Lime 70C039'), danger: tokenHex('Crimson C10A26'), warning: tokenHex('Amber FF9F43') };

// Type scale from the Figma export (src/tokens.json, OKUX/Light):
//   text-h1…h6   = "Heading"        (Dacia Block Bold)           -> pair with `font-block`
//   text-hs1…hs6 = "Heading Small"  (Dacia Block Bold, smaller)  -> pair with `font-block`
//   text-hx1…hx6 = "Heading Dacia"  (Dacia Block Extended Bold)  -> pair with `font-display`
//   text-tiny/caption/small/root/big = body text (Read, 11/12/14/16/18) - weight via font-light|normal|medium.
const resolveRef = (v) => {
  const m = /^\{(.+)\}$/.exec(String(v));
  if (!m) return v;
  let cur = okux;
  for (const key of m[1].split('.')) cur = cur && cur[key];
  return cur && cur.value !== undefined ? cur.value : v;
};
const typeScale = {};
const headingGroups = { Heading: 'h', 'Heading Small': 'hs', 'Heading Dacia': 'hx' };
for (const [group, prefix] of Object.entries(headingGroups)) {
  for (const [name, tok] of Object.entries(okux[group] || {})) {
    const v = tok.value || {};
    typeScale[`${prefix}${name.replace(/\D/g, '')}`] = [`${resolveRef(v.fontSize)}px`, { lineHeight: `${resolveRef(v.lineHeight)}px`, fontWeight: '700' }];
  }
}
const textStyles = { Tiny: 'tiny', Caption: 'caption', Small: 'small', Root: 'root', Big: 'big' };
for (const [group, key] of Object.entries(textStyles)) {
  const first = Object.values((okux['Text'] || {})[group] || {})[0];
  if (first && first.value) typeScale[key] = [`${resolveRef(first.value.fontSize)}px`, { lineHeight: `${resolveRef(first.value.lineHeight)}px` }];
}

// Corner radii from the Figma export: rounded-cr2 (2px, the site default), cr4, cr8 ... circle, square.
const radii = Object.fromEntries(
  Object.entries(okux['Corner Radius'] || {})
    .filter(([, v]) => v && v.value !== undefined && !String(v.value).startsWith('{'))
    .map(([k, v]) => [k.toLowerCase().replace(/\s+/g, ''), `${v.value}px`])
);

const colors = extractValues(tokens.colors || {});
const bgColors = extractValues(tokens.bg || {});
const fgColors = extractValues(tokens.fg || {});
const accentColors = extractValues(tokens.accent || {});
const spacing = extractValues(tokens.spacing || {});
const borderRadius = extractValues(tokens.borderRadius || {});
const fontFamilies = extractValues(tokens.fontFamilies || {});
const fontSizes = extractValues(tokens.fontSizes || {});
const typography = extractValues(tokens.typography || {});
const boxShadow = extractValues(tokens.boxShadow || {});

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        bg: bgColors,
        fg: fgColors,
        accent: accentColors,
        dacia,
        surface,
        ink,
        alpha,
        status,
      },
      spacing: spacing,
      borderRadius: { ...borderRadius, ...radii },
      // Brand fonts (see @font-face in src/index.css). `sans` = Read (body), `display` = Dacia Block Extended
      // (headlines), `block` = Dacia Block (labels, ".md"). Legacy token families stay available.
      fontFamily: {
        ...fontFamilies,
        sans: ['Read', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['"Dacia Block Extended"', 'Read', 'system-ui', 'sans-serif'],
        block: ['"Dacia Block"', 'Read', 'system-ui', 'sans-serif'],
      },
      fontSize: { ...fontSizes, ...typeScale },
      boxShadow: boxShadow,
    },
  },
  // hover: variants apply only on devices that can hover (no sticky hover on touch screens)
  future: { hoverOnlyWhenSupported: true },
  plugins: [],
}
