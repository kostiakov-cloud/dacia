/**
 * Lists every tr('...') key in src/ and compares it with the Romanian dictionary (src/i18n/ro/*.js).
 *   node scripts/i18n-check.mjs            -> report: missing translations / stale dictionary keys / leftover Russian text outside tr()
 *   node scripts/i18n-check.mjs --keys f   -> writes { file: [keys] } JSON (first file that uses a key wins) to f
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { parse } from '@babel/parser';

const CYR = /[Ѐ-ӿ]/;
const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.jsx?$/.test(e.name)) out.push(p);
  }
  return out;
};

const keys = new Map(); // key -> first file
const leftovers = [];
for (const file of walk('src')) {
  if (/^src\/i18n\/|^src\/Showcase\.jsx$/.test(file)) continue;
  const ast = parse(fs.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['jsx'] });
  const visit = (n, parent, k) => {
    if (!n || typeof n.type !== 'string') return;
    const inTr = parent?.type === 'CallExpression' && parent.callee?.name === 'tr' && k === 'arguments' && parent.arguments[0] === n;
    if (inTr) {
      const v = n.type === 'StringLiteral' ? n.value : n.type === 'TemplateLiteral' && !n.expressions.length ? n.quasis[0].value.cooked : null;
      if (v != null) {
        if (!keys.has(v)) keys.set(v, file);
        return;
      }
    }
    const lit = n.type === 'StringLiteral' ? n.value : n.type === 'JSXText' ? n.value : n.type === 'TemplateLiteral' ? n.quasis.map((q) => q.value.cooked).join('') : null;
    if (lit && CYR.test(lit) && !(parent?.type === 'ObjectProperty' && k === 'key') && !/^(Import|Export)/.test(parent?.type || '')) leftovers.push(`${file}:${n.loc.start.line}  ${lit.trim().slice(0, 70)}`);
    for (const key of Object.keys(n)) {
      if (['loc', 'leadingComments', 'trailingComments', 'innerComments'].includes(key)) continue;
      const v = n[key];
      if (Array.isArray(v)) v.forEach((c) => visit(c, n, key));
      else if (v && typeof v === 'object') visit(v, n, key);
    }
  };
  visit(ast.program, null, null);
}

const kIdx = process.argv.indexOf('--keys');
if (kIdx > 0) {
  const byFile = {};
  for (const [k, f] of keys) (byFile[f] ??= []).push(k);
  fs.writeFileSync(process.argv[kIdx + 1], JSON.stringify(byFile, null, 1));
  console.log(`${keys.size} keys in ${Object.keys(byFile).length} files -> ${process.argv[kIdx + 1]}`);
  process.exit(0);
}

let dict = {};
try {
  dict = (await import(pathToFileURL(path.resolve('src/i18n/ro/index.js')).href)).default;
} catch (e) {
  console.log('no dictionary yet:', e.message.slice(0, 80));
}
const missing = [...keys].filter(([k]) => !(k in dict));
const stale = Object.keys(dict).filter((k) => !keys.has(k));
console.log(`keys: ${keys.size}, translated: ${keys.size - missing.length}, missing: ${missing.length}, stale: ${stale.length}`);
missing.slice(0, 80).forEach(([k, f]) => console.log('  MISSING', f, '|', k.slice(0, 80)));
stale.slice(0, 40).forEach((k) => console.log('  STALE', k.slice(0, 80)));
if (leftovers.length) console.log(`\nRussian text outside tr(): ${leftovers.length}\n` + leftovers.join('\n'));
process.exit(missing.length || leftovers.length ? 1 : 0);
