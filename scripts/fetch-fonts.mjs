import { mkdir, writeFile } from 'node:fs/promises';
const fontDir = new URL('../public/fonts/', import.meta.url);
await mkdir(fontDir, { recursive: true });
const cssUrl = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700;750;800;900&family=Instrument+Serif:ital@0;1&display=swap';
const response = await fetch(cssUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36' }, signal: AbortSignal.timeout(30000) });
if (!response.ok) throw new Error(`Font stylesheet returned ${response.status}`);
const css = await response.text();
const latinDeclarations = [...css.matchAll(/\/\* latin \*\/\s*(@font-face\s*\{[^}]+\})/g)].map(match => match[1]);
const latin = latinDeclarations.length ? latinDeclarations : [...css.matchAll(/@font-face\s*\{[^}]+\}/g)].map(match => match[0]);
if (!latin.length) throw new Error('No Latin font declarations found');
const urls = new Map();
let output = '';
for (const declaration of latin) {
  const url = declaration.match(/url\(([^)]+)\)/)?.[1];
  if (!url) continue;
  let filename = urls.get(url);
  if (!filename) {
    filename = `font-${urls.size + 1}.${url.endsWith('.ttf') ? 'ttf' : 'woff2'}`;
    const font = await fetch(url, { signal: AbortSignal.timeout(30000) });
    if (!font.ok) throw new Error(`Font file returned ${font.status}`);
    await writeFile(new URL(filename, fontDir), Buffer.from(await font.arrayBuffer()));
    urls.set(url, filename);
  }
  output += declaration.replace(url, `/fonts/${filename}`) + '\n';
}
await writeFile(new URL('fonts.css', fontDir), output);
console.log(`Saved ${urls.size} self-hosted font files`);
