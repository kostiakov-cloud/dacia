/**
 * One-off codemod: wraps every Cyrillic string in src/**\/*.{js,jsx} into tr('...') and adds the import.
 * (JSX text -> {tr('...')}, JSX attributes -> attr={tr('...')}, string / plain template literals -> tr(...)).
 * Property keys, import sources and already wrapped strings are left alone. Templates WITH expressions are only reported.
 *   node scripts/i18n-wrap.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from '@babel/parser';

const DRY = process.argv.includes('--dry');
const CYR = /[Ѐ-ӿ]/;
const SKIP = [/^src\/i18n\//, /^src\/Showcase\.jsx$/, /^src\/main\.jsx$/];

function walkFiles(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkFiles(p, out);
    else if (/\.(jsx?|mjs)$/.test(e.name)) out.push(p);
  }
  return out;
}

const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;
const report = [];
let total = 0;

for (const file of walkFiles('src')) {
  if (SKIP.some((r) => r.test(file))) continue;
  const code = fs.readFileSync(file, 'utf8');
  if (!CYR.test(code)) continue;
  const ast = parse(code, { sourceType: 'module', plugins: ['jsx'] });
  const edits = [];
  let lastImportEnd = 0;

  const visit = (node, parent, key) => {
    if (!node || typeof node.type !== 'string') return;
    if (node.type === 'ImportDeclaration') lastImportEnd = node.end;
    const isTrCall = parent?.type === 'CallExpression' && parent.callee?.name === 'tr';

    if (node.type === 'StringLiteral' && CYR.test(node.value) && !isTrCall) {
      const skip =
        parent.type === 'ImportDeclaration' || parent.type === 'ExportNamedDeclaration' || parent.type === 'ExportAllDeclaration' ||
        ((parent.type === 'ObjectProperty' || parent.type === 'ObjectMethod' || parent.type === 'ClassProperty') && key === 'key' && !parent.computed);
      if (!skip) {
        if (parent.type === 'JSXAttribute') edits.push({ start: node.start, end: node.end, text: `{tr(${q(node.value)})}` });
        else edits.push({ start: node.start, end: node.end, text: `tr(${code.slice(node.start, node.end)})` });
      }
      return;
    }
    if (node.type === 'TemplateLiteral' && node.quasis.some((x) => CYR.test(x.value.cooked || '')) && !isTrCall) {
      if (node.expressions.length === 0) edits.push({ start: node.start, end: node.end, text: `tr(${code.slice(node.start, node.end)})` });
      else {
        // `Оценка ${value} из 5` -> tr('Оценка {value} из 5', { value })
        const names = [];
        const nameOf = (ex, i) => {
          let n = ex.type === 'Identifier' ? ex.name : ex.type === 'MemberExpression' && !ex.computed && ex.property.type === 'Identifier' ? ex.property.name : `n${i}`;
          while (names.includes(n)) n += '_';
          names.push(n);
          return n;
        };
        let text = '';
        const props = [];
        node.quasis.forEach((qu, i) => {
          text += qu.value.cooked;
          if (i < node.expressions.length) {
            const ex = node.expressions[i];
            const n = nameOf(ex, i);
            text += `{${n}}`;
            props.push(n === (ex.name ?? '') ? n : `${n}: ${code.slice(ex.start, ex.end)}`);
          }
        });
        edits.push({ start: node.start, end: node.end, text: `tr(${q(text)}, { ${props.join(', ')} })` });
        return;
      }
    }
    if (node.type === 'JSXText' && CYR.test(node.value)) {
      const raw = code.slice(node.start, node.end);
      const m = raw.match(/^([ \t\r\n]*)([\s\S]*?)([ \t\r\n]*)$/);
      const core = m[2];
      // decode the few entities that occur; keep everything else as written
      const text = core.replace(/[ \t]*\r?\n[ \t\r\n]*/g, ' ').replace(/&nbsp;/g, ' ').replace(/&mdash;/g, '—').replace(/&laquo;/g, '«').replace(/&raquo;/g, '»').replace(/&amp;/g, '&').replace(/&quot;/g, '"');
      edits.push({ start: node.start + m[1].length, end: node.start + m[1].length + core.length, text: `{tr(${q(text)})}` });
      return;
    }
    for (const k of Object.keys(node)) {
      if (k === 'loc' || k === 'leadingComments' || k === 'trailingComments' || k === 'innerComments') continue;
      const v = node[k];
      if (Array.isArray(v)) v.forEach((c) => visit(c, node, k));
      else if (v && typeof v === 'object') visit(v, node, k);
    }
  };
  visit(ast.program, null, null);
  if (!edits.length) continue;

  let out = code;
  edits.sort((a, b) => b.start - a.start).forEach((e) => {
    out = out.slice(0, e.start) + e.text + out.slice(e.end);
  });
  const rel = path.relative(path.dirname(file), 'src/i18n').replace(/\\/g, '/');
  const imp = `\nimport { tr } from '${rel.startsWith('.') ? rel : './' + rel}';`;
  out = out.slice(0, lastImportEnd) + imp + out.slice(lastImportEnd);
  if (lastImportEnd === 0) out = imp.slice(1) + '\n' + out.slice(imp.length);
  total += edits.length;
  console.log(String(edits.length).padStart(4), file);
  if (!DRY) fs.writeFileSync(file, out);
}
console.log('total edits:', total);
console.log(report.join('\n'));
