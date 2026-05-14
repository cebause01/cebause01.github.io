/**
 * Removes CSS rule blocks whose selectors include :root[data-theme="light"].
 * Uses brace depth from first "{" after the match (handles } inside strings poorly — fine for this file).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const cssPath = path.join(__dirname, '..', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

const marker = ':root[data-theme="light"]';
let i = 0;
let out = '';

while (i < css.length) {
  const idx = css.indexOf(marker, i);
  if (idx === -1) {
    out += css.slice(i);
    break;
  }
  out += css.slice(i, idx);
  let j = idx;
  while (j < css.length && css[j] !== '{') j++;
  if (j >= css.length) {
    out += css.slice(idx);
    break;
  }
  let depth = 1;
  j++;
  while (j < css.length && depth > 0) {
    const c = css[j];
    if (c === '{') depth++;
    else if (c === '}') depth--;
    j++;
  }
  i = j;
  while (i < css.length && (css[i] === ' ' || css[i] === '\t' || css[i] === '\r' || css[i] === '\n')) i++;
}

fs.writeFileSync(cssPath, out);
console.log('Stripped :root[data-theme="light"] rules from styles.css');
