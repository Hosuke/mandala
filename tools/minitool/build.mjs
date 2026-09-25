#!/usr/bin/env node
/* ─────────────────────────────────────────────────────────────────────────
   小紅書小工具導出：自主線現狀生成離線 zip，主線源碼一行不動。
   用法：node tools/minitool/build.mjs
   產物：dist/minitool/（展開）＋ dist/mandala-minitool.zip（待上傳）
   構建器具（esbuild / acorn / fonttools）皆臨時取用，不入倉、不生 node_modules：
     - npx 取於 npm 快取；fonttools 裝於 ~/.cache/mandala-minitool/venv
   凡主線結構變而錨點不中，即停而報之，不出壞包。
   ───────────────────────────────────────────────────────────────────────── */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const DIST = path.join(ROOT, 'dist');
const OUT = path.join(DIST, 'minitool');
const ZIP = path.join(DIST, 'mandala-minitool.zip');
const SKILL = path.join(ROOT, '.claude/skills/minitool-zip-builder/scripts');
const CACHE = path.join(os.homedir(), '.cache/mandala-minitool');
const ESBUILD = 'esbuild@0.25.10';
const TARGET = 'es2017,chrome61,ios14';

const sh = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { cwd: ROOT, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8', ...opts });
const step = (s) => console.log(`\n▸ ${s}`);
function die(msg) { console.error(`\n✗ ${msg}`); process.exit(1); }

// 錨點替換：必中其數，否則主線已變，停
function swap(src, from, to, label, count = 1) {
  const n = src.split(from).length - 1;
  if (n !== count) die(`錨點「${label}」應中 ${count} 處，實中 ${n} 處——主線已變，請更新 build.mjs`);
  return src.split(from).join(to);
}

if (!fs.existsSync(path.join(SKILL, 'audit_artifact.mjs')) || !fs.existsSync(path.join(SKILL, 'audit_artifact.py')))
  die('缺審計腳本：請先將 minitool-zip-builder skill 解壓至 .claude/skills/\n' +
    '  https://fe-static.xhscdn.com/minitool/20260923133933/minitool-zip-builder-1.7.0.skill');

fs.rmSync(OUT, { recursive: true, force: true });
fs.rmSync(ZIP, { force: true });
fs.mkdirSync(path.join(OUT, 'fonts'), { recursive: true });

const head = sh('git', ['rev-parse', '--short', 'HEAD']).trim();
const banner = `/* 金胎不二 · 兩部曼荼羅引擎（小紅書小工具版，源自 Hosuke/mandala@${head}）` +
  ` CC BY-NC-SA 4.0；three.js MIT，全文附於檔末 */`;

// ── 一、JS：合一為經典腳本，轉譯至 Chrome 61 ──
step('esbuild：js/main.js → app.js（IIFE，' + TARGET + '）');
sh('npx', ['--yes', ESBUILD, 'js/main.js', '--bundle', '--format=iife', `--target=${TARGET}`,
  '--charset=utf8', '--minify', '--legal-comments=eof', `--banner:js=${banner}`,
  `--outfile=${path.join(OUT, 'app.js')}`, '--log-level=warning'], { stdio: 'inherit' });
fs.copyFileSync(path.join(HERE, 'adapter.js'), path.join(OUT, 'adapter.js'));

// three.js 之 MIT 全文附於 app.js 末（容器不收 .txt）
fs.appendFileSync(path.join(OUT, 'app.js'),
  '\n/*! three.js — MIT License\n' + fs.readFileSync(path.join(ROOT, 'vendor/LICENSE-threejs'), 'utf8').replace(/\*\//g, '* /') + '*/\n');

// ── 二、CSS：回退層＋主樣式（去 ttf 字型宣告）＋小工具收束層，同經 esbuild 降級 ──
step('CSS：compat-base + style（去 ttf）+ compat → style.css');
let style = fs.readFileSync(path.join(ROOT, 'css/style.css'), 'utf8');
const ttfFace = style.match(/@font-face\s*\{[^}]*NotoSansSiddham-Regular\.ttf[^}]*\}/);
if (!ttfFace) die('錨點「悉曇 ttf @font-face」不中——主線已變');
style = style.replace(ttfFace[0], '');
const tmpCss = path.join(os.tmpdir(), `mandala-minitool-${process.pid}.css`);
fs.writeFileSync(tmpCss, [
  fs.readFileSync(path.join(HERE, 'compat-base.css'), 'utf8'),
  style,
  fs.readFileSync(path.join(HERE, 'compat.css'), 'utf8'),
].join('\n'));
sh('npx', ['--yes', ESBUILD, tmpCss, `--target=${TARGET}`, '--minify', '--charset=utf8',
  `--outfile=${path.join(OUT, 'style.css')}`, '--log-level=warning'], { stdio: 'inherit' });
fs.rmSync(tmpCss, { force: true });
// 悉曇字型 OFL 全文附於 style.css 末（OFL 第二條：隨字型附版權與許可；容器不收 .txt）
fs.appendFileSync(path.join(OUT, 'style.css'),
  '\n/*! Noto Sans Siddham — SIL Open Font License 1.1\n' +
  fs.readFileSync(path.join(ROOT, 'vendor/fonts/OFL-NotoSansSiddham.txt'), 'utf8').replace(/\*\//g, '* /') + '*/\n');

// ── 三、字型：悉曇 ttf → woff2（容器唯收 woff/woff2）；餘字走系統字 ──
step('字型：NotoSansSiddham ttf → woff2');
const py = path.join(CACHE, 'venv/bin/python');
if (!fs.existsSync(py)) {
  fs.mkdirSync(CACHE, { recursive: true });
  sh('python3', ['-m', 'venv', path.join(CACHE, 'venv')]);
  sh(path.join(CACHE, 'venv/bin/pip'), ['install', '-q', 'fonttools', 'brotli'], { stdio: 'inherit' });
}
sh(py, ['-c', [
  'import sys; from fontTools.ttLib import TTFont',
  'f = TTFont(sys.argv[1]); f.flavor = "woff2"; f.save(sys.argv[2])',
].join('\n'), path.join(ROOT, 'vendor/fonts/NotoSansSiddham-Regular.ttf'),
  path.join(OUT, 'fonts/NotoSansSiddham-Regular.woff2')]);

// ── 四、HTML：自 index.html 變出單頁入口 ──
step('HTML：index.html → 小工具入口');
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
html = swap(html, '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
  '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">',
  'viewport');
html = html.replace(/^\s*<meta (property="og:[^"]+"|name="twitter:[^"]+")[^>]*>\n/gm, '');
html = html.replace(/^\s*<link rel="icon"[^>]*>\n/m, '');
html = html.replace(/^\s*<link rel="preconnect"[^>]*>\n/gm, '');
html = html.replace(/^\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>\n/m, '');
html = swap(html, '<link rel="stylesheet" href="css/style.css">', '<link rel="stylesheet" href="./style.css">', '樣式表');
html = swap(html, '<script type="module" src="js/main.js"></script>',
  '<script src="./adapter.js"></script>\n  <script src="./app.js"></script>', '主腳本');
fs.writeFileSync(path.join(OUT, 'index.html'), html);

// ── 五、自驗：外鏈、內聯腳本、禁用 API、ES2017 語法 ──
step('自驗');
const problems = [];
if (/https?:\/\//.test(html.replace(/<!--[\s\S]*?-->/g, '').replace(/xmlns="http:\/\/www\.w3\.org[^"]*"/g, '')))
  problems.push('index.html 仍有 http(s) 引用');
if (/<script(?![^>]*\bsrc=)[^>]*>/i.test(html)) problems.push('index.html 有內聯 <script>');
if (/\son[a-z]+\s*=\s*"/i.test(html)) problems.push('index.html 有行內事件');
if (/type="module"|<base\s|<iframe|<object|http-equiv="Content-Security-Policy"/i.test(html))
  problems.push('index.html 有 module／base／iframe／object／自建 CSP');
const cssOut = fs.readFileSync(path.join(OUT, 'style.css'), 'utf8');
if (/url\(\s*["']?(https?:)?\/\//.test(cssOut) || /\.ttf/.test(cssOut)) problems.push('style.css 有外部 url 或 ttf');
if (/@import/.test(cssOut)) problems.push('style.css 有 @import');

const scan = {
  'fetch(': /\bfetch\(/, XMLHttpRequest: /XMLHttpRequest/, 'new Worker': /new (Shared)?Worker\(/,
  WebSocket: /new WebSocket\(/, EventSource: /new EventSource\(/, 'eval(': /\beval\(/,
  'new Function': /new Function\(/, 'import(': /\bimport\(/, 'import.meta': /import\.meta/,
  geolocation: /geolocation/, clipboard: /navigator\.clipboard/, requestFullscreen: /requestFullscreen/,
  'window.open': /window\.open\(/, serviceWorker: /serviceWorker/, WebAssembly: /WebAssembly\./,
};
const report = [];
for (const f of ['app.js', 'adapter.js']) {
  const src = fs.readFileSync(path.join(OUT, f), 'utf8');
  for (const [k, re] of Object.entries(scan)) {
    const n = (src.match(new RegExp(re.source, 'g')) || []).length;
    if (n) report.push(`${f}: ${k} ×${n}`);
  }
  try {
    sh('npx', ['--yes', 'acorn@8', '--ecma2017', '--silent', path.join(OUT, f)]);
  } catch { problems.push(`${f} 不過 ES2017 語法解析`); }
}
if (report.length) console.log('  禁用 API 殘留（須逐條判讀是否可達）：\n    ' + report.join('\n    '));
else console.log('  禁用 API：零殘留');

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else files.push(path.relative(OUT, p));
  }
})(OUT);
const allowed = /\.(html|css|js|png|jpe?g|gif|webp|svg|woff2?|json)$/i;
for (const f of files) if (!allowed.test(f)) problems.push(`不許之檔型：${f}`);
if (files.filter(f => f.endsWith('.html')).length !== 1) problems.push('HTML 須唯一');
if (problems.length) die('自驗未過：\n  ' + problems.join('\n  '));
console.log('  結構／CSP／語法：過');

// ── 六、審計（skill 所附腳本）並打包 ──
step('審計產物目錄');
sh('node', [path.join(SKILL, 'audit_artifact.mjs'), OUT], { stdio: 'inherit' });
step('打包');
sh('zip', ['-r', '-X', '-q', ZIP, '.', '-x', '*.DS_Store'], { cwd: OUT });
sh('python3', [path.join(SKILL, 'audit_artifact.py'), ZIP], { stdio: 'inherit' });

const kb = (p) => (fs.statSync(p).size / 1024).toFixed(0) + ' KiB';
console.log(`\n✓ ${path.relative(ROOT, ZIP)}（${kb(ZIP)}）`);
for (const f of files.sort()) console.log(`  ${f.padEnd(40)} ${kb(path.join(OUT, f))}`);
