// ─────────────────────────────────────────────────────────────────────────────
// 相之層：一切尊形皆程序所現 —— 月輪、種字、三昧耶形、焰環。
// 不取一張圖片資源；如曼荼羅之本義，相由法生。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';
import { 落筆, 器筆 } from './funpon.js';

const GOLD = '#d8b36a';
const GOLD_DIM = '#a8854a';
const INK = '#0c1020';
const VERMILION = '#c4502f';

const cache = new Map();   // 常駐小紋之藏（label／glow／月輪等，終生不逐）

// 尊紋別藏：Map 之序即近用之序（取則移末）；升幅之後位圖漸巨，
// 逾預算則自首逐舊而 dispose——毋使換相累積至低配 WebGL 失聯。
// 別藏之由：常駐小紋開壇即繫於材質，誤逐即破相，故不與尊紋同柜。
const zunCache = new Map();
let zunBytes = 0;
const ZUN_CAP = 384 * 1024 * 1024;   // 位圖字節之估（GPU 副本同量另計）
const texBytes = t => t.image.width * t.image.height * 4;
function zunGet(key) {
  const t = zunCache.get(key);
  if (t) { zunCache.delete(key); zunCache.set(key, t); }   // 移末誌其近用
  return t;
}
function zunPut(key, tex) {
  zunCache.set(key, tex);
  zunBytes += texBytes(tex);
  for (const [k, t] of zunCache) {
    if (zunBytes <= ZUN_CAP || k === key) break;
    zunCache.delete(k); zunBytes -= texBytes(t); t.dispose();
  }
  return tex;
}

function canvas(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  return c;
}

function hex(color) {
  return '#' + color.toString(16).padStart(6, '0');
}

// ── 三昧耶形圖庫：以 (ctx, s) 繪於原點，s 為半幅 ─────────────────────────────
function strokePath(ctx, pts, close = false) {
  ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  if (close) ctx.closePath();
  ctx.stroke();
}

function drawVajraProng(ctx, s, angle, spread) {
  // 一鈷：自中腰向 angle 方向出鋒，spread 為側鈷張角
  ctx.save();
  ctx.rotate(angle);
  strokePath(ctx, [[0, -s * 0.12], [0, -s * 0.95]]);
  if (spread) {
    for (const dir of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(dir * s * 0.3, -s * 0.1);
      ctx.quadraticCurveTo(dir * s * 0.42, -s * 0.55, 0, -s * 0.95);
      ctx.stroke();
    }
  }
  ctx.restore();
}

const ICONS = {
  vajra1(ctx, s) { drawVajraProng(ctx, s, 0); drawVajraProng(ctx, s, Math.PI); ctx.beginPath(); ctx.arc(0, 0, s * 0.14, 0, 7); ctx.stroke(); },
  vajra3(ctx, s) { drawVajraProng(ctx, s, 0, true); drawVajraProng(ctx, s, Math.PI, true); ctx.beginPath(); ctx.arc(0, 0, s * 0.14, 0, 7); ctx.stroke(); },
  vajra5(ctx, s) {
    ICONS.vajra3(ctx, s);
    for (const a of [0, Math.PI]) {
      ctx.save(); ctx.rotate(a);
      for (const dir of [-1, 1]) {
        ctx.beginPath(); ctx.moveTo(dir * s * 0.5, -s * 0.08);
        ctx.quadraticCurveTo(dir * s * 0.62, -s * 0.5, 0, -s * 0.95); ctx.stroke();
      }
      ctx.restore();
    }
  },
  jewel(ctx, s) {
    ctx.beginPath(); ctx.arc(0, s * 0.15, s * 0.55, Math.PI * 0.85, Math.PI * 0.15);
    ctx.quadraticCurveTo(s * 0.3, -s * 0.5, 0, -s * 0.8);
    ctx.quadraticCurveTo(-s * 0.3, -s * 0.5, -Math.cos(Math.PI * 0.15) * s * 0.55, s * 0.15 + Math.sin(Math.PI * 0.85) * s * 0.55);
    ctx.stroke();
    strokePath(ctx, [[-s * 0.5, s * 0.62], [s * 0.5, s * 0.62]]);
  },
  'jewel-flame'(ctx, s) {
    ICONS.jewel(ctx, s * 0.8);
    for (const a of [-0.9, 0, 0.9]) {
      ctx.save(); ctx.rotate(a);
      ctx.beginPath(); ctx.moveTo(0, -s * 0.62);
      ctx.quadraticCurveTo(s * 0.18, -s * 0.8, 0, -s * 0.98);
      ctx.stroke(); ctx.restore();
    }
  },
  lotus(ctx, s) {
    for (const k of [-2, -1, 0, 1, 2]) {
      ctx.save(); ctx.rotate(k * 0.42);
      ctx.beginPath(); ctx.moveTo(0, s * 0.45);
      ctx.quadraticCurveTo(-s * 0.28, -s * 0.1, 0, -s * 0.7);
      ctx.quadraticCurveTo(s * 0.28, -s * 0.1, 0, s * 0.45);
      ctx.stroke(); ctx.restore();
    }
    strokePath(ctx, [[0, s * 0.45], [0, s * 0.9]]);
  },
  'lotus-bud'(ctx, s) {
    ctx.beginPath(); ctx.moveTo(0, s * 0.5);
    ctx.quadraticCurveTo(-s * 0.5, -s * 0.1, 0, -s * 0.75);
    ctx.quadraticCurveTo(s * 0.5, -s * 0.1, 0, s * 0.5);
    ctx.stroke();
    strokePath(ctx, [[0, s * 0.5], [0, s * 0.92]]);
  },
  karma(ctx, s) { // 羯磨杵：十字三鈷
    for (const a of [0, Math.PI / 2]) {
      ctx.save(); ctx.rotate(a);
      drawVajraProng(ctx, s * 0.95, 0, true); drawVajraProng(ctx, s * 0.95, Math.PI, true);
      ctx.restore();
    }
    ctx.beginPath(); ctx.arc(0, 0, s * 0.13, 0, 7); ctx.stroke();
  },
  sword(ctx, s) {
    strokePath(ctx, [[0, -s * 0.95], [s * 0.13, -s * 0.6], [s * 0.13, s * 0.4], [-s * 0.13, s * 0.4], [-s * 0.13, -s * 0.6]], true);
    strokePath(ctx, [[-s * 0.42, s * 0.4], [s * 0.42, s * 0.4]]);
    strokePath(ctx, [[0, s * 0.4], [0, s * 0.92]]);
  },
  banner(ctx, s) {
    strokePath(ctx, [[-s * 0.1, -s * 0.9], [-s * 0.1, s * 0.9]]);
    strokePath(ctx, [[-s * 0.1, -s * 0.85], [s * 0.6, -s * 0.7], [s * 0.5, -s * 0.45], [-s * 0.1, -s * 0.3]], true);
  },
  hook(ctx, s) {
    strokePath(ctx, [[0, s * 0.9], [0, -s * 0.5]]);
    ctx.beginPath(); ctx.arc(s * 0.22, -s * 0.5, s * 0.24, Math.PI, Math.PI * 2.4); ctx.stroke();
  },
  arrow(ctx, s) {
    strokePath(ctx, [[0, s * 0.9], [0, -s * 0.7]]);
    strokePath(ctx, [[-s * 0.22, -s * 0.4], [0, -s * 0.85], [s * 0.22, -s * 0.4]]);
    strokePath(ctx, [[-s * 0.18, s * 0.72], [0, s * 0.5], [s * 0.18, s * 0.72]]);
  },
  sun(ctx, s) {
    ctx.beginPath(); ctx.arc(0, 0, s * 0.42, 0, 7); ctx.stroke();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      strokePath(ctx, [[Math.cos(a) * s * 0.58, Math.sin(a) * s * 0.58], [Math.cos(a) * s * 0.85, Math.sin(a) * s * 0.85]]);
    }
  },
  moon(ctx, s) {
    ctx.beginPath(); ctx.arc(0, 0, s * 0.6, Math.PI * 0.35, Math.PI * 1.65); ctx.stroke();
    ctx.beginPath(); ctx.arc(s * 0.3, 0, s * 0.45, Math.PI * 0.5, Math.PI * 1.5, true); ctx.stroke();
  },
  smile(ctx, s) { // 笑印：仰月與齒光
    ctx.beginPath(); ctx.arc(0, -s * 0.1, s * 0.6, Math.PI * 0.15, Math.PI * 0.85); ctx.stroke();
    for (const x of [-0.3, 0, 0.3]) strokePath(ctx, [[x * s, s * 0.5], [x * s, s * 0.72]]);
  },
  tongue(ctx, s) { // 舌相／梵篋上之焰舌
    ctx.beginPath(); ctx.moveTo(-s * 0.4, s * 0.3);
    ctx.quadraticCurveTo(0, s * 0.7, s * 0.4, s * 0.3);
    ctx.quadraticCurveTo(s * 0.15, -s * 0.2, 0, -s * 0.75);
    ctx.quadraticCurveTo(-s * 0.15, -s * 0.2, -s * 0.4, s * 0.3);
    ctx.stroke();
  },
  armor(ctx, s) { // 甲冑
    strokePath(ctx, [[-s * 0.55, -s * 0.5], [s * 0.55, -s * 0.5], [s * 0.4, s * 0.6], [0, s * 0.85], [-s * 0.4, s * 0.6]], true);
    strokePath(ctx, [[-s * 0.3, -s * 0.1], [s * 0.3, -s * 0.1]]);
    strokePath(ctx, [[-s * 0.2, s * 0.25], [s * 0.2, s * 0.25]]);
  },
  fang(ctx, s) { // 牙
    for (const dir of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(dir * s * 0.45, -s * 0.6);
      ctx.quadraticCurveTo(dir * s * 0.55, s * 0.2, dir * s * 0.15, s * 0.75);
      ctx.quadraticCurveTo(dir * s * 0.12, s * 0.1, dir * s * 0.45, -s * 0.6);
      ctx.stroke();
    }
  },
  fist(ctx, s) { // 拳印
    ctx.beginPath(); ctx.arc(0, 0, s * 0.5, Math.PI * 1.1, Math.PI * 0.55); ctx.stroke();
    for (const y of [-0.25, 0, 0.25]) strokePath(ctx, [[-s * 0.45, y * s], [s * 0.2, y * s]]);
    strokePath(ctx, [[s * 0.2, -s * 0.4], [s * 0.45, 0], [s * 0.2, s * 0.4]]);
  },
  garland(ctx, s) { // 華鬘
    ctx.beginPath(); ctx.arc(0, -s * 0.1, s * 0.55, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke();
    for (const t of [0.15, 0.5, 0.85]) {
      const a = Math.PI * 0.1 + t * Math.PI * 0.8;
      const x = Math.cos(a) * s * 0.55, y = -s * 0.1 + Math.sin(a) * s * 0.55;
      ctx.beginPath(); ctx.arc(x, y + s * 0.12, s * 0.08, 0, 7); ctx.stroke();
    }
  },
  lute(ctx, s) { // 琵琶
    ctx.beginPath(); ctx.ellipse(0, s * 0.3, s * 0.42, s * 0.5, 0, 0, 7); ctx.stroke();
    strokePath(ctx, [[0, -s * 0.2], [0, -s * 0.9]]);
    strokePath(ctx, [[-s * 0.12, -s * 0.78], [s * 0.12, -s * 0.78]]);
  },
  incense(ctx, s) { // 香爐
    ctx.beginPath(); ctx.arc(0, s * 0.25, s * 0.45, 0, Math.PI); ctx.stroke();
    strokePath(ctx, [[-s * 0.45, s * 0.25], [s * 0.45, s * 0.25]]);
    for (const x of [-0.25, 0.25]) strokePath(ctx, [[x * s, s * 0.68], [x * s, s * 0.45]]);
    ctx.beginPath(); ctx.moveTo(0, s * 0.1);
    ctx.quadraticCurveTo(-s * 0.25, -s * 0.3, 0, -s * 0.55);
    ctx.quadraticCurveTo(s * 0.25, -s * 0.8, 0, -s * 0.95);
    ctx.stroke();
  },
  flower(ctx, s) {
    for (let i = 0; i < 6; i++) {
      ctx.save(); ctx.rotate((i / 6) * Math.PI * 2);
      ctx.beginPath(); ctx.ellipse(0, -s * 0.45, s * 0.18, s * 0.4, 0, 0, 7); ctx.stroke();
      ctx.restore();
    }
    ctx.beginPath(); ctx.arc(0, 0, s * 0.14, 0, 7); ctx.stroke();
  },
  lamp(ctx, s) {
    strokePath(ctx, [[-s * 0.4, s * 0.7], [s * 0.4, s * 0.7]]);
    strokePath(ctx, [[0, s * 0.7], [0, s * 0.3]]);
    ctx.beginPath(); ctx.arc(0, s * 0.18, s * 0.3, Math.PI * 0.05, Math.PI * 0.95); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, s * 0.05);
    ctx.quadraticCurveTo(s * 0.2, -s * 0.35, 0, -s * 0.7);
    ctx.quadraticCurveTo(-s * 0.2, -s * 0.35, 0, s * 0.05);
    ctx.stroke();
  },
  conch(ctx, s) { // 塗香器（以螺貝形代）
    ctx.beginPath(); ctx.arc(0, 0, s * 0.55, Math.PI * 0.2, Math.PI * 1.7); ctx.stroke();
    ctx.beginPath(); ctx.arc(s * 0.08, s * 0.05, s * 0.32, Math.PI * 0.2, Math.PI * 1.6); ctx.stroke();
    ctx.beginPath(); ctx.arc(s * 0.14, s * 0.1, s * 0.12, 0, 7); ctx.stroke();
  },
  rope(ctx, s) { // 羂索
    ctx.beginPath(); ctx.arc(0, 0, s * 0.55, Math.PI * 0.3, Math.PI * 2.15); ctx.stroke();
    strokePath(ctx, [[Math.cos(Math.PI * 0.3) * s * 0.55, Math.sin(Math.PI * 0.3) * s * 0.55], [s * 0.85, s * 0.85]]);
    ctx.beginPath(); ctx.arc(s * 0.55 * Math.cos(Math.PI * 2.15), s * 0.55 * Math.sin(Math.PI * 2.15), s * 0.08, 0, 7); ctx.stroke();
  },
  chain(ctx, s) { // 鎖
    for (let i = -1; i <= 1; i++) {
      ctx.beginPath(); ctx.ellipse(0, i * s * 0.5, s * 0.18, s * 0.32, 0, 0, 7); ctx.stroke();
    }
  },
  bell(ctx, s) { // 金剛鈴
    ctx.beginPath(); ctx.moveTo(-s * 0.45, s * 0.45); ctx.lineTo(s * 0.45, s * 0.45);
    ctx.quadraticCurveTo(s * 0.4, -s * 0.1, s * 0.15, -s * 0.35);
    ctx.lineTo(-s * 0.15, -s * 0.35);
    ctx.quadraticCurveTo(-s * 0.4, -s * 0.1, -s * 0.45, s * 0.45);
    ctx.stroke();
    drawVajraProng(ctx, s * 0.55, 0, true);
    ctx.beginPath(); ctx.arc(0, s * 0.58, s * 0.07, 0, 7); ctx.stroke();
  },
  stupa(ctx, s) { // 率都婆（五輪）
    strokePath(ctx, [[-s * 0.5, s * 0.8], [s * 0.5, s * 0.8], [s * 0.5, s * 0.55], [-s * 0.5, s * 0.55]], true);
    ctx.beginPath(); ctx.arc(0, s * 0.18, s * 0.34, 0, 7); ctx.stroke();
    strokePath(ctx, [[-s * 0.3, -s * 0.16], [s * 0.3, -s * 0.16], [s * 0.18, -s * 0.5], [-s * 0.18, -s * 0.5]], true);
    ctx.beginPath(); ctx.arc(0, -s * 0.62, s * 0.13, Math.PI, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -s * 0.72); ctx.quadraticCurveTo(s * 0.1, -s * 0.85, 0, -s * 0.96);
    ctx.quadraticCurveTo(-s * 0.1, -s * 0.85, 0, -s * 0.72); ctx.stroke();
  },
  'flame-tri'(ctx, s) { // 三角智火
    strokePath(ctx, [[0, -s * 0.7], [s * 0.65, s * 0.5], [-s * 0.65, s * 0.5]], true);
    for (const a of [-0.5, 0, 0.5]) {
      ctx.save(); ctx.rotate(a);
      ctx.beginPath(); ctx.moveTo(0, -s * 0.7);
      ctx.quadraticCurveTo(s * 0.12, -s * 0.85, 0, -s * 0.98); ctx.stroke();
      ctx.restore();
    }
  },
  eye(ctx, s) { // 佛眼
    ctx.beginPath(); ctx.moveTo(-s * 0.75, 0);
    ctx.quadraticCurveTo(0, -s * 0.6, s * 0.75, 0);
    ctx.quadraticCurveTo(0, s * 0.6, -s * 0.75, 0);
    ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, s * 0.2, 0, 7); ctx.stroke();
  },
  vase(ctx, s) { // 賢瓶
    ctx.beginPath(); ctx.moveTo(-s * 0.15, -s * 0.55); ctx.lineTo(-s * 0.25, -s * 0.35);
    ctx.quadraticCurveTo(-s * 0.55, 0, -s * 0.3, s * 0.55);
    ctx.lineTo(s * 0.3, s * 0.55);
    ctx.quadraticCurveTo(s * 0.55, 0, s * 0.25, -s * 0.35);
    ctx.lineTo(s * 0.15, -s * 0.55); ctx.stroke();
    strokePath(ctx, [[-s * 0.22, -s * 0.55], [s * 0.22, -s * 0.55]]);
    ctx.beginPath(); ctx.arc(0, -s * 0.75, s * 0.12, 0, 7); ctx.stroke();
  },
  sutra(ctx, s) { // 梵篋
    strokePath(ctx, [[-s * 0.6, -s * 0.25], [s * 0.6, -s * 0.25], [s * 0.6, s * 0.25], [-s * 0.6, s * 0.25]], true);
    strokePath(ctx, [[-s * 0.6, 0], [s * 0.6, 0]]);
    strokePath(ctx, [[0, -s * 0.25], [0, -s * 0.6]]);
  },
  staff(ctx, s) { // 棒／人頭幢（簡化為棒）
    strokePath(ctx, [[0, s * 0.9], [0, -s * 0.6]]);
    ctx.beginPath(); ctx.arc(0, -s * 0.72, s * 0.16, 0, 7); ctx.stroke();
  },
  needle(ctx, s) {
    strokePath(ctx, [[0, s * 0.85], [0, -s * 0.85]]);
    ctx.beginPath(); ctx.ellipse(0, s * 0.6, s * 0.07, s * 0.13, 0, 0, 7); ctx.stroke();
  },
  horse(ctx, s) { // 馬頭（簡化馬首相）
    ctx.beginPath(); ctx.moveTo(-s * 0.4, s * 0.6);
    ctx.quadraticCurveTo(-s * 0.55, -s * 0.2, 0, -s * 0.65);
    ctx.quadraticCurveTo(s * 0.5, -s * 0.35, s * 0.45, s * 0.05);
    ctx.lineTo(s * 0.1, s * 0.15);
    ctx.stroke();
    strokePath(ctx, [[-s * 0.1, -s * 0.65], [-s * 0.2, -s * 0.95]]);
    strokePath(ctx, [[s * 0.1, -s * 0.6], [s * 0.05, -s * 0.9]]);
  },
  wheel(ctx, s) { // 法輪
    ctx.beginPath(); ctx.arc(0, 0, s * 0.7, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, 0, s * 0.15, 0, 7); ctx.stroke();
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      strokePath(ctx, [[Math.cos(a) * s * 0.15, Math.sin(a) * s * 0.15], [Math.cos(a) * s * 0.7, Math.sin(a) * s * 0.7]]);
    }
  },
  trident(ctx, s) {
    strokePath(ctx, [[0, s * 0.9], [0, -s * 0.4]]);
    strokePath(ctx, [[0, -s * 0.4], [0, -s * 0.9]]);
    for (const dir of [-1, 1]) {
      ctx.beginPath(); ctx.moveTo(0, -s * 0.3);
      ctx.quadraticCurveTo(dir * s * 0.4, -s * 0.45, dir * s * 0.32, -s * 0.9);
      ctx.stroke();
    }
  },
  flame(ctx, s) {
    ctx.beginPath(); ctx.moveTo(0, s * 0.7);
    ctx.quadraticCurveTo(-s * 0.55, s * 0.1, -s * 0.1, -s * 0.3);
    ctx.quadraticCurveTo(s * 0.35, -s * 0.05, 0.0, -s * 0.95);
    ctx.quadraticCurveTo(s * 0.5, -s * 0.1, s * 0.3, s * 0.35);
    ctx.quadraticCurveTo(s * 0.2, s * 0.6, 0, s * 0.7);
    ctx.stroke();
  },
};
ICONS['lotus-blue'] = ICONS.lotus;
ICONS['stupa-small'] = ICONS.stupa;

// ── 大曼荼羅之相：五種儀軌型之略相（程序線描，非寫實）─────────────────────
// type: nyorai 如來 · bosatsu 菩薩 · myoo 明王 · ten 天 · butsumo 佛母
export function deityType(zh) {
  if (zh.includes('明王') || zh.includes('軍荼利')) return 'myoo';
  if (zh.includes('佛母')) return 'butsumo';
  if (zh.includes('如來') || zh.endsWith('佛')) return 'nyorai';
  if (zh.endsWith('天')) return 'ten';
  return 'bosatsu';
}

// 白描尊形：量度取造像之意 —— 坐像連蓮臺約四頭餘，肩闊二頭，趺坐成三角穩基。
// 筆有粗細之序：外輪廓粗筆，內細部細筆；疏朗為上，不取鏤密。
function drawFigure(ctx, R, type, samaya, { chiken = false } = {}) {
  const s = R * 0.0168;                          // 基準尺（隨輪幅自適）
  const W_OUT = R * 0.0285, W_IN = R * 0.0163;   // 外輪廓筆 ≈2.6 · 內細部筆 ≈1.5（於 256px）
  ctx.save();
  ctx.lineWidth = W_OUT;

  // ── 小工具：座標皆以 s 為單位 ──
  const P = (pts, close = false) => strokePath(ctx, pts.map(([x, y]) => [x * s, y * s]), close);
  const A = (x, y, r, a0 = 0, a1 = 7) => {
    ctx.beginPath(); ctx.arc(x * s, y * s, r * s, a0, a1); ctx.stroke();
  };
  const Q = (x0, y0, cx, cy, x1, y1) => {
    ctx.beginPath(); ctx.moveTo(x0 * s, y0 * s);
    ctx.quadraticCurveTo(cx * s, cy * s, x1 * s, y1 * s); ctx.stroke();
  };
  const B = (x0, y0, c1x, c1y, c2x, c2y, x1, y1) => {
    ctx.beginPath(); ctx.moveTo(x0 * s, y0 * s);
    ctx.bezierCurveTo(c1x * s, c1y * s, c2x * s, c2y * s, x1 * s, y1 * s); ctx.stroke();
  };
  const E = (x, y, rx, ry) => {
    ctx.beginPath(); ctx.ellipse(x * s, y * s, rx * s, ry * s, 0, 0, 7); ctx.stroke();
  };
  const thin = (fn) => { ctx.save(); ctx.lineWidth = W_IN; fn(); ctx.restore(); };
  const dim = (a, fn) => { ctx.save(); ctx.globalAlpha *= a; fn(); ctx.restore(); };
  const dot = (x, y, r) => { ctx.beginPath(); ctx.arc(x * s, y * s, r * s, 0, 7); ctx.fill(); };
  const itemAt = (x, y, scale) => {
    if (!samaya || !ICONS[samaya]) return;
    ctx.save(); ctx.translate(x * s, y * s);
    ctx.lineWidth = W_IN;
    ICONS[samaya](ctx, scale * s);
    ctx.restore();
  };

  // 頭光：細雙環
  const halo = (cy, r) => dim(0.6, () => thin(() => { A(0, cy, r); A(0, cy, r * 1.12); }));

  // 寂靜相：垂目慈眉，數筆而成
  const sereneFace = (cy, byakugo = false) => thin(() => {
    A(-3.0, cy - 0.4, 2.7, Math.PI * 1.22, Math.PI * 1.78); // 左眉
    A(3.0, cy - 0.4, 2.7, Math.PI * 1.22, Math.PI * 1.78);  // 右眉
    A(-2.9, cy + 4.2, 3.4, Math.PI * 1.32, Math.PI * 1.68); // 左垂目
    A(2.9, cy + 4.2, 3.4, Math.PI * 1.32, Math.PI * 1.68);  // 右垂目
    P([[0, cy + 1.0], [0, cy + 3.0]]);                       // 鼻樑
    A(0, cy + 3.4, 1.6, Math.PI * 0.28, Math.PI * 0.72);     // 靜口
    if (byakugo) dot(0, cy - 1.2, 0.55);                     // 白毫
  });

  // 忿怒相：立眉怒目，齒間見牙
  const fierceFace = (cy) => thin(() => {
    P([[-4.8, cy - 3.0], [-1.3, cy - 1.4]]); P([[4.8, cy - 3.0], [1.3, cy - 1.4]]); // 立眉
    P([[-4.5, cy + 1.0], [-1.5, cy - 0.2]]); P([[4.5, cy + 1.0], [1.5, cy - 0.2]]); // 怒目
    P([[0, cy + 0.6], [0, cy + 2.6]]);                                              // 鼻樑
    A(0, cy + 6.9, 2.3, Math.PI * 1.3, Math.PI * 1.7);                              // 抿口
    P([[2.1, cy + 5.0], [2.7, cy + 6.8]]); P([[-2.1, cy + 5.0], [-2.7, cy + 6.8]]); // 牙
  });

  // 長耳垂輪（如來福相）
  const longEars = (cy, hr) => thin(() => {
    for (const d of [-1, 1]) {
      Q(d * hr * 0.96, cy - 0.6, d * (hr + 1.3), cy + 3.4, d * hr * 0.8, cy + 6.6);
      A(d * hr * 0.84, cy + 6.4, 0.9);
    }
  });

  // 結跏趺坐：寬穩之三角基
  const lap = (topY, kneeW) => {
    ctx.beginPath();
    ctx.moveTo(-kneeW * s, (topY + 2) * s);
    ctx.quadraticCurveTo(0, (topY - 3.5) * s, kneeW * s, (topY + 2) * s);
    ctx.quadraticCurveTo(kneeW * 0.55 * s, (topY + 7) * s, 0, (topY + 7) * s);
    ctx.quadraticCurveTo(-kneeW * 0.55 * s, (topY + 7) * s, -kneeW * s, (topY + 2) * s);
    ctx.stroke();
    thin(() => Q(6, topY + 0.6, 10, topY + 2.2, 13.5, topY + 0.8)); // 足踵之示
  };

  // 袈裟襞：膝上層疊之裾（自外而內三重嵌套）
  const hemFolds = (topY, n = 3) => thin(() => {
    const spans = [[20.5, topY + 2.6], [15, topY + 0.4], [9.5, topY - 1.8]];
    for (let i = 0; i < n; i++) {
      const [w, y] = spans[i];
      Q(-w, y, 0, y + 3.2, w, y);
    }
  });

  // 蓮臺二重：上仰瓣五、下仰瓣四，底承一線
  const lotusThrone = (topY) => {
    const petal = (px, tipY, baseY, hw) => {
      ctx.beginPath();
      ctx.moveTo((px - hw) * s, baseY * s);
      ctx.quadraticCurveTo((px - hw * 0.45) * s, (tipY - 0.4) * s, px * s, tipY * s);
      ctx.quadraticCurveTo((px + hw * 0.45) * s, (tipY - 0.4) * s, (px + hw) * s, baseY * s);
      ctx.stroke();
    };
    thin(() => {
      for (const dx of [-20, -10, 0, 10, 20]) petal(dx, topY, topY + 5.2, 5.4);
      for (const dx of [-15, -5, 5, 15]) petal(dx, topY + 3.8, topY + 8.6, 5.4);
    });
    P([[-26, topY + 8.6], [26, topY + 8.6]]);
  };

  // 頸與肩臂之外輪廓（坐像共用）：肩闊 sw ≈ 二頭
  const neckShoulders = (chinY, sw) => {
    P([[-2.6, chinY + 0.2], [-2.8, chinY + 2.4]]);
    P([[2.6, chinY + 0.2], [2.8, chinY + 2.4]]);
    for (const d of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(d * 2.8 * s, (chinY + 2.4) * s);
      ctx.bezierCurveTo(d * sw * 0.55 * s, (chinY + 2.0) * s, d * sw * 0.92 * s, (chinY + 3.4) * s, d * sw * s, (chinY + 6) * s); // 肩圓
      ctx.quadraticCurveTo(d * (sw + 3.5) * s, (chinY + 14) * s, d * (sw + 3) * s, (chinY + 21) * s);                              // 上臂外緣
      ctx.stroke();
    }
  };

  // ── 立姿護世（天部）──────────────────────────────────────────────────────
  if (type === 'ten') {
    const hc = -30, hr = 7;
    halo(hc, 10.6);
    A(0, hc, hr);                                          // 頭
    A(0, hc - hr - 1.2, 2.2, Math.PI, 0);                  // 髻
    sereneFace(hc - 0.6);
    P([[-2.2, hc + hr - 0.6], [-2.4, hc + hr + 2]]);       // 頸
    P([[2.2, hc + hr - 0.6], [2.4, hc + hr + 2]]);
    for (const d of [-1, 1]) {                             // 肩→腰之輪廓
      ctx.beginPath();
      ctx.moveTo(d * 2.4 * s, -21 * s);
      ctx.bezierCurveTo(d * 8 * s, -21.5 * s, d * 12 * s, -20.5 * s, d * 13 * s, -18.5 * s);
      ctx.quadraticCurveTo(d * 13.5 * s, -10 * s, d * 10.5 * s, -3 * s);
      ctx.stroke();
    }
    thin(() => {                                           // 肩甲
      A(-12.4, -16.6, 3.1, Math.PI * 0.75, Math.PI * 1.85);
      A(12.4, -16.6, 3.1, Math.PI * 1.15, Math.PI * 2.25);
    });
    thin(() => {                                           // 胸甲魚鱗三列
      for (const [row, xs] of [[-15, [-4.4, 0, 4.4]], [-11.6, [-6.6, -2.2, 2.2, 6.6]], [-8.2, [-4.4, 0, 4.4]]]) {
        for (const x of xs) A(x, row, 2.1, 0.12, Math.PI - 0.12);
      }
    });
    P([[-10.5, -3], [10.5, -3]]);                          // 束帶
    thin(() => P([[-9.8, -1.3], [9.8, -1.3]]));
    for (const d of [-1, 1]) Q(d * 10.5, -2, d * 14, 4, d * 13, 10); // 甲裳外張
    thin(() => {
      Q(-13, 10, 0, 13.4, 13, 10);                         // 裳裾
      P([[-4, -1], [-5, 10.6]]); P([[4, -1], [5, 10.6]]);  // 裳褶
      B(-13, -17.5, -19, -13, -18.5, -7, -14, -4.2);       // 左袖翻飛
    });
    P([[-8, 11], [-8.4, 25]]); P([[-3.6, 11.6], [-4, 25]]); // 左足（直立承重）
    Q(8, 11, 10.6, 17, 9.2, 25); Q(3.6, 11.6, 5.4, 17, 4.8, 25); // 右足（微屈）
    thin(() => {                                           // 雙履
      P([[-9.4, 25], [-10.4, 27.8], [-2.8, 27.8], [-3.2, 25]]);
      P([[3.8, 25], [3, 27.8], [10.6, 27.8], [10, 25]]);
    });
    P([[-15, 28.6], [15, 28.6], [12, 32.6], [-12, 32.6]], true); // 磐石小座
    thin(() => P([[-4.6, 28.6], [-6.4, 32.6]]));
    Q(13, -18.5, 16, -12, 14.6, -4.6);                     // 右臂執器
    thin(() => A(14, -2.4, 1.7));                          // 執手
    itemAt(14, -10, 8);
    ctx.restore();
    return;
  }

  // ── 焰中忿怒（明王）──────────────────────────────────────────────────────
  if (type === 'myoo') {
    const hc = -26, hr = 8, chin = hc + hr;
    dim(0.6, () => thin(() => {                            // 舉身光：偏側生姿之長焰
      const px = (a, r) => Math.sin(a) * r, py = (a, r) => -4 - Math.cos(a) * r;
      const flame = (ang, r0, r1, lean) => {
        const m = r0 + (r1 - r0) * 0.5;
        Q(px(ang, r0), py(ang, r0),
          px(ang + lean * 2.2, m), py(ang + lean * 2.2, m),
          px(ang + lean * 0.5, r1), py(ang + lean * 0.5, r1));
      };
      flame(-1.7, 24, 36, -0.3); flame(-1.18, 25, 41, 0.34);
      flame(-0.62, 26, 44, -0.28); flame(-0.1, 26, 45, 0.36);
      flame(0.38, 26, 44, 0.3); flame(0.95, 25, 42, -0.32); flame(1.62, 24, 37, 0.28);
      // 內焰呼應，使火有層次
      flame(-0.88, 24, 33, 0.3); flame(0.16, 25, 34, -0.28); flame(1.25, 24, 32, 0.3);
    }));
    halo(hc, 12.2);
    thin(() => {                                           // 焰髮上揚
      Q(-4.4, hc - 6.4, -7, hc - 9.4, -5.6, hc - 12.4);
      Q(-1.5, hc - 7.8, -3.2, hc - 10.6, -1.7, hc - 13.6);
      Q(1.5, hc - 7.8, 3.4, hc - 10.2, 2.3, hc - 13.4);
      Q(4.4, hc - 6.4, 7.2, hc - 9, 6.2, hc - 12);
    });
    A(0, hc, hr);
    fierceFace(hc - 0.4);
    neckShoulders(chin, 17);
    thin(() => Q(-9, -11.4, 0, -7.9, 9, -11.4));           // 胸臆之線
    thin(() => Q(18.6, 3, 21, -4.6, 20, -11));             // 右前臂上舉
    thin(() => A(20, -12.2, 2.0, Math.PI * 0.05, Math.PI * 0.95)); // 執掌
    itemAt(20, -19, 6.6);
    thin(() => {                                           // 左手羂索之纏
      Q(-18.6, 3, -15.5, 5.4, -13.4, 6);
      A(-13, 6.2, 2.0);
      A(-13, 6.2, 3.8, Math.PI * 0.3, Math.PI * 1.9);
      Q(-10.2, 8.8, -8.6, 11.6, -10.6, 14.4);
    });
    lap(12, 25);
    hemFolds(12, 2);
    P([[-27.5, 19], [27.5, 19], [23.5, 28], [-25.5, 28]], true); // 磐石：方稜之座
    thin(() => { P([[-10, 19], [-13, 28]]); P([[9, 19], [11.6, 28]]); P([[19, 19], [16.8, 23.8]]); });
    ctx.restore();
    return;
  }

  // ── 坐像三型：如來 · 菩薩 · 佛母 ─────────────────────────────────────────
  const hc = -27, hr = 8, chin = hc + hr;
  halo(hc, 12.8);
  if (type === 'butsumo') {                                // 佛母放光：十六道短芒
    dim(0.5, () => thin(() => {
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2 + Math.PI / 16;
        P([[Math.cos(a) * 15.2, hc + Math.sin(a) * 15.2], [Math.cos(a) * 17.8, hc + Math.sin(a) * 17.8]]);
      }
    }));
  }
  A(0, hc, hr);                                            // 頭
  const soft = type === 'butsumo';
  const sw = soft ? 15 : 16;                               // 肩半闊（佛母稍斂）

  if (type === 'nyorai') {
    A(0, hc - hr + 1, 3.4, Math.PI * 1.04, Math.PI * 1.96); // 肉髻
    thin(() => {                                            // 螺髮之示
      A(-3.4, hc - 4.4, 1.5, Math.PI, 0);
      A(0, hc - 5.2, 1.5, Math.PI, 0);
      A(3.4, hc - 4.4, 1.5, Math.PI, 0);
    });
    sereneFace(hc, true);
    longEars(hc, hr);
    neckShoulders(chin, sw);
    thin(() => {                                            // 通肩袈裟：開胸之領
      Q(-11, -12.6, -4, -8.6, -1, -4.4);
      Q(11, -12.6, 4, -8.6, 1, -4.4);
      Q(13.4, -10.8, 5, -3.6, -2, 1.4);                     // 偏袒之褶
    });
    if (chiken) {                                           // 智拳印（金剛界大日）
      thin(() => {
        Q(-18.4, 2, -10, 0.6, -3.4, -0.6);                  // 左前臂
        Q(18.4, 2, 12.4, -3, 3.2, -7.6);                    // 右前臂上抱
      });
      A(0, -1.6, 3.4);                                      // 左拳當胸
      P([[0, -5], [0, -8]]);                                // 頭指直立
      A(0, -10.8, 2.9);                                     // 右拳握指
      thin(() => {
        P([[-2.2, -2.2], [2.2, -2.2]]); P([[-2, -0.8], [2, -0.8]]); // 指節
        P([[-1.8, -11.2], [1.8, -11.2]]);
      });
    } else {                                                // 法界定印
      thin(() => {
        Q(-18.4, 2, -13, 6.4, -6.4, 8.2);                   // 前臂入膝
        Q(18.4, 2, 13, 6.4, 6.4, 8.2);
        E(0, 8.8, 6.2, 2.3);                                // 下掌
        E(0, 6.9, 4.6, 1.9);                                // 上掌
        A(0, 5.4, 1.1, Math.PI * 0.9, Math.PI * 2.1);       // 拇指相拄
      });
    }
  } else {                                                  // 菩薩 · 佛母
    thin(() => {                                            // 三山寶冠
      Q(-6.6, hc - 4.4, 0, hc - 6, 6.6, hc - 4.4);          // 冠帶
      P([[-6.2, hc - 4.8], [-4.6, hc - 9], [-2.6, hc - 5.4]]);
      P([[-1.9, hc - 5.6], [0, hc - 10.6], [1.9, hc - 5.6]]);
      P([[2.6, hc - 5.4], [4.6, hc - 9], [6.2, hc - 4.8]]);
      A(0, hc - 7.2, 1.2);                                  // 中央寶珠
      A(-8.8, hc - 1.6, 1.7); A(8.8, hc - 1.6, 1.7);        // 雙髻垂鬟
    });
    sereneFace(hc + 0.4, soft);
    neckShoulders(chin, sw);
    thin(() => {                                            // 瓔珞：頸瓔與垂珠
      A(0, -16.2, 5.2, Math.PI * 0.12, Math.PI * 0.88);
      A(0, -15.4, 9.2, Math.PI * 0.28, Math.PI * 0.72);
      A(-5.4, -7.6, 0.8); A(0, -5.6, 0.8); A(5.4, -7.6, 0.8);
    });
    dim(0.8, () => thin(() => {                             // 天衣：左右各一 S 曲
      B(-sw + 1.6, -12, -sw - 9, -5, -sw - 1, 3, -sw - 8, 12);
      B(sw - 1.6, -12, sw + 9, -5, sw + 1, 3, sw + 8, 12);
    }));
    thin(() => {                                            // 臂釧之示
      P([[-sw - 2.6, -2.2], [-sw + 0.4, -2.8]]); P([[sw + 2.6, -2.2], [sw - 0.4, -2.8]]);
    });
    thin(() => {                                            // 左手安膝
      Q(-sw - 2.4, 5, -12, 7, -5.2, 8.6);
      A(-4.6, 8.2, 2.2, Math.PI * 1.05, Math.PI * 2.2);
    });
    thin(() => Q(sw + 3, 5, sw + 4.4, -4, sw + 3.2, -11));  // 右前臂上舉
    thin(() => A(sw + 3.4, -12.2, 2.0, Math.PI * 0.05, Math.PI * 0.95)); // 仰掌
    itemAt(sw + 3.4, -18.4, 5.6);                           // 三昧耶具於肩側
  }

  lap(12, soft ? 24 : 25);
  hemFolds(12, type === 'nyorai' ? 3 : 2);
  lotusThrone(20.6);
  ctx.restore();
}

// 種字繪製：悉曇按幅自適，無悉曇則退羅馬轉寫
// 真心居中：不憑 em-box（textBaseline='middle'），而以墨跡實界（actualBoundingBox）算之。
// 悉曇懸於頭線（śirorekhā），元音符、隨韻點、止聲皆參差，em-box 之中非墨之中；
// 故量其墨界，解出落筆點，使墨之心正坐 (x,y)，無論呼者所設 textBaseline 為何。
function placeCentered(ctx, s, x, y) {
  const prevAlign = ctx.textAlign, prevBaseline = ctx.textBaseline;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  const m = ctx.measureText(s);
  // actualBoundingBox* 皆自落筆點起算之正距：left／ascent 指向原點側。
  const inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
  const inkH = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
  // 落筆於 alphabetic-left；欲令墨心坐 (x,y)，解之：
  const penX = x - inkW / 2 + m.actualBoundingBoxLeft;
  const penY = y - inkH / 2 + m.actualBoundingBoxAscent;
  if (Number.isFinite(penX) && Number.isFinite(penY)) {
    ctx.fillText(s, penX, penY);
  } else {
    // 某器無 actualBoundingBox 度量（或字體退化）→ 退回 em-box 居中，字不至於不畫
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s, x, y);
  }
  ctx.textAlign = prevAlign;
  ctx.textBaseline = prevBaseline;
  return Number.isFinite(inkW) ? inkW : ctx.measureText(s).width;
}

function drawSeed(ctx, sid, bija, baseSize, maxWidth, x, y) {
  if (sid) {
    let fs = baseSize * 1.18;
    ctx.font = `400 ${fs}px "Noto Sans Siddham"`;
    // 以墨界寬（非 em advance）量度，使闊真言得正縮放
    let m = ctx.measureText(sid);
    let inkW = m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
    if (inkW > maxWidth) {
      fs *= maxWidth / inkW;
      ctx.font = `400 ${fs}px "Noto Sans Siddham"`;
    }
    placeCentered(ctx, sid, x, y);
  } else {
    ctx.font = `600 ${baseSize}px "Cormorant Garamond", serif`;
    placeCentered(ctx, bija, x, y);
  }
}

// ── 月輪尊形 ────────────────────────────────────────────────────────────────
// form: bija | samaya | subtle | offer | wrath | wrath-samaya
//     | figure | figure-subtle | figure-offer | figure-wrath
// sid: 悉曇種字（真形）；bija 羅馬轉寫降為輔注
// form 'figure' 為大曼荼羅之尊形；chiken: 智拳印（金剛界大日）
// res: 畫布之幅（預設 256；中尊可付 384 以求精細）
export function deityTexture({ id, zh, bija, sid, samaya, color, form = 'bija', chiken = false, res = 256, persist = false }) {
  // persist：九會回響之屬——開壇一繫於材質、終生不再回柜問津，入常駐之藏免遭誤逐；
  // 主壇節點紋每幀回柜（近用不老），居字節預算柜，逾額逐舊
  const key = `${form}|${id}|${zh}|${bija}|${sid}|${chiken}|${res}`;
  const hit = persist ? cache.get(key) : zunGet(key);
  if (hit) return hit;

  const S = res, k = res / 256, c = canvas(S), ctx = c.getContext('2d');
  const cx = S / 2, cy = S / 2;
  const colHex = hex(color);
  const wrath = form.startsWith('wrath') || form === 'figure-wrath';

  // 外暈（部色光）
  let g = ctx.createRadialGradient(cx, cy, S * 0.18, cx, cy, S * 0.5);
  g.addColorStop(0, colHex + '00');
  g.addColorStop(0.62, colHex + (wrath ? '30' : '22'));
  g.addColorStop(0.85, colHex + '0c');
  g.addColorStop(1, colHex + '00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);

  const R = S * 0.355;

  // 忿怒尊焰環
  if (wrath) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.strokeStyle = '#d4602f';
    ctx.lineWidth = 2.4 * k;
    ctx.globalAlpha = 0.95;
    const n = 14;
    for (let i = 0; i < n; i++) {
      ctx.save();
      ctx.rotate((i / n) * Math.PI * 2 + (i % 2) * 0.1);
      ctx.beginPath();
      ctx.moveTo(0, -R * 1.02);
      ctx.quadraticCurveTo(R * 0.12, -R * 1.16, -R * 0.02, -R * 1.3);
      ctx.stroke();
      ctx.restore();
    }
    ctx.restore();
  }

  // 月輪
  ctx.save();
  ctx.translate(cx, cy);
  g = ctx.createRadialGradient(0, 0, R * 0.1, 0, 0, R);
  if (wrath) {
    g.addColorStop(0, '#2a1410');
    g.addColorStop(0.8, '#1c0d0c');
    g.addColorStop(1, '#140807');
  } else {
    g.addColorStop(0, '#1d2438');
    g.addColorStop(0.75, '#141a2c');
    g.addColorStop(1, '#0e1322');
  }
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.fill();

  // 双环（外金、内部色）
  ctx.lineWidth = 2.6 * k;
  ctx.strokeStyle = wrath ? '#cf6a36' : GOLD;
  ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.stroke();
  ctx.lineWidth = 1.2 * k;
  ctx.strokeStyle = colHex;
  ctx.globalAlpha = 0.9;
  ctx.beginPath(); ctx.arc(0, 0, R * 0.9, 0, 7); ctx.stroke();
  ctx.globalAlpha = 1;

  // 內容
  ctx.strokeStyle = colHex;
  ctx.fillStyle = colHex;
  ctx.lineWidth = 3.2 * k;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const drawIcon = (size) => {
    const fn = ICONS[samaya] || ICONS.vajra1;
    ctx.save();
    ctx.shadowColor = colHex;
    ctx.shadowBlur = 10 * k;
    fn(ctx, size);
    ctx.restore();
  };

  if (form === 'figure' || form.startsWith('figure-')) {
    // 大曼荼羅：尊形之略相（複合會相由此衍生）
    if (form === 'figure-subtle') {
      // 微細會：尊住一鈷杵中——杵以金線明示，毋使隱沒
      ctx.save();
      ctx.globalAlpha = 0.78;
      ctx.lineWidth = 2.2 * k;
      ctx.strokeStyle = GOLD;
      ICONS.vajra1(ctx, R * 0.98);
      ctx.restore();
    }
    ctx.save();
    ctx.shadowColor = colHex;
    // 專筆數百線密，逐筆重暈（7k）則暈積成霧、筆意盡沒——微暈存輝而已
    ctx.shadowBlur = 2 * k;
    if (form === 'figure-subtle') ctx.scale(0.62, 0.62);
    else if (form === 'figure-offer') { ctx.translate(0, -R * 0.07); ctx.scale(0.86, 0.86); }
    // 粉本之閘（適配見 funpon.落筆）：先問粉本庫 vendor/fenben，次壇城自藏十面，
    // 皆無則佔位略相（寧缺毋誤）。id 二格式：主壇「尊|側」，九會「會|尊」（九會皆金剛界之相）。
    const done = (() => {
      const p = id.split('|');
      if (p[1] === 't' || p[1] === 'k') return 落筆(ctx, R, p[0], p[1]);
      if (p.length === 2) return 落筆(ctx, R, p[1], 'k');
      return false;
    })();
    if (!done) { ctx.shadowBlur = 7 * k; drawFigure(ctx, R, deityType(zh), samaya, { chiken }); }
    ctx.restore();
    if (form === 'figure-offer') {
      // 供養會：下捧蓮臺
      ctx.save();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.6 * k;
      ctx.translate(0, R * 0.62);
      ctx.scale(0.5, 0.4);
      ICONS.lotus(ctx, R * 0.6);
      ctx.restore();
    }
  } else if (form === 'samaya' || form === 'wrath-samaya') {
    // 三昧耶之閘：金剛界三十七尊之器有粉本者依粉本落筆；胎藏之器粉本未備、
    // 餘尊無其器——皆守現行示意（寧缺毋誤）。id 二格式同粉本之閘。
    const 器鍵 = (() => {
      const p = id.split('|');
      if (p[1] === 'k') return p[0];
      if (p[1] === 't') return null;
      if (p.length === 2) return p[1];
      return null;
    })();
    let drawn = false;
    if (器鍵) {
      ctx.save();
      ctx.shadowColor = colHex;
      ctx.shadowBlur = 2 * k;   // 器筆三等線，重暈亦沒筆——同尊形之制
      drawn = 器筆(ctx, R, 器鍵);
      ctx.restore();
    }
    if (!drawn) drawIcon(R * 0.62);
  } else if (form === 'subtle') {
    // 微細：種字縮於金剛杵輪廓之中
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.8 * k;
    ICONS.vajra1(ctx, R * 0.95);
    ctx.restore();
    ctx.shadowColor = colHex;
    ctx.shadowBlur = 8 * k;
    // 墨心坐杵之中（(x,y) 即墨界中心，無 -22 之屬的人手微調）
    drawSeed(ctx, sid, bija, R * 0.52, R * 1.05, 0, 0);
  } else {
    // 種字：悉曇為正，羅馬轉寫為注
    ctx.shadowColor = colHex;
    ctx.shadowBlur = 14 * k;
    // 墨心坐輪心，微上偏以與下方羅馬輔注成均衡之縱列
    drawSeed(ctx, sid, bija, R * 0.74, R * 1.3, 0, -R * 0.08);
    if (form !== 'offer' && sid) {
      // 羅馬轉寫輔注（供養形之蓮座居此位，故免注）
      ctx.shadowBlur = 6 * k;
      ctx.globalAlpha = 0.78;
      ctx.font = `italic 600 ${R * 0.26}px "Cormorant Garamond", serif`;
      ctx.fillText(bija, 0, R * 0.58);
      ctx.globalAlpha = 1;
    }
    if (form === 'offer') {
      // 供養：捧蓮之手（下方小蓮座）
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.6 * k;
      ctx.save();
      ctx.translate(0, R * 0.58);
      ctx.scale(0.5, 0.4);
      ICONS.lotus(ctx, R * 0.6);
      ctx.restore();
    }
  }

  // 下緣尊名（小字）
  ctx.shadowBlur = 0;
  ctx.fillStyle = wrath ? '#d8a98a' : '#cdbb96';
  ctx.font = `500 ${S * 0.072}px "LXGW WenKai TC", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.92;
  ctx.fillText(zh, 0, R * 1.27);
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  tex.colorSpace = THREE.SRGBColorSpace;
  if (persist) { cache.set(key, tex); return tex; }
  return zunPut(key, tex);
}

// ── 縱書名牌（院名・會名）───────────────────────────────────────────────────
export function labelTexture(text, { size = 44, color = GOLD_DIM, alpha = 0.95 } = {}) {
  const key = `label|${text}|${size}|${color}`;
  if (cache.has(key)) return cache.get(key);
  const chars = [...text];
  const pad = size * 0.5;
  const w = Math.ceil(size * 1.6), h = Math.ceil(chars.length * size * 1.12 + pad * 2);
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.font = `500 ${size}px "LXGW WenKai TC", serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = color;
  ctx.globalAlpha = alpha;
  ctx.shadowColor = color;
  ctx.shadowBlur = size * 0.18;
  chars.forEach((ch, i) => ctx.fillText(ch, w / 2, pad + (i + 0.5) * size * 1.12));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.userData = { aspect: w / h };
  cache.set(key, tex);
  return tex;
}

// ── 光點（金砂子・彗星・脈動環）─────────────────────────────────────────────
export function glowTexture(color = 0xe9cd8a) {
  const key = `glow|${color}`;
  if (cache.has(key)) return cache.get(key);
  const S = 128, c = canvas(S), ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  g.addColorStop(0, hex(color) + 'ff');
  g.addColorStop(0.25, hex(color) + '88');
  g.addColorStop(1, hex(color) + '00');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

// 心月輪（五相成身觀）：霧中之月與澄明之月
export function moonTexture(clear) {
  const key = `kanmoon|${clear}`;
  if (cache.has(key)) return cache.get(key);
  const S = 512, c = canvas(S), ctx = c.getContext('2d');
  const cx = S / 2, R = S * 0.36;
  if (clear) {
    // 澄明：皎潔之輪，金緣微光
    let g = ctx.createRadialGradient(cx, cx, 0, cx, cx, R);
    g.addColorStop(0, 'rgba(240,238,228,0.95)');
    g.addColorStop(0.72, 'rgba(225,224,210,0.8)');
    g.addColorStop(0.97, 'rgba(214,206,182,0.55)');
    g.addColorStop(1, 'rgba(214,206,182,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(cx, cx, R, 0, 7); ctx.fill();
    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 3;
    ctx.shadowColor = GOLD;
    ctx.shadowBlur = 22;
    ctx.beginPath(); ctx.arc(cx, cx, R, 0, 7); ctx.stroke();
    g = ctx.createRadialGradient(cx, cx, R, cx, cx, R * 1.38);
    g.addColorStop(0, 'rgba(233,205,138,0.3)');
    g.addColorStop(1, 'rgba(233,205,138,0)');
    ctx.shadowBlur = 0;
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
  } else {
    // 霧月：光在霧後，未嘗滅也
    let g = ctx.createRadialGradient(cx, cx, 0, cx, cx, R * 1.35);
    g.addColorStop(0, 'rgba(214,218,224,0.5)');
    g.addColorStop(0.45, 'rgba(190,198,212,0.26)');
    g.addColorStop(0.8, 'rgba(160,170,190,0.09)');
    g.addColorStop(1, 'rgba(160,170,190,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, S, S);
    // 霧之絮
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.random() * R;
      const x = cx + Math.cos(a) * r, y = cx + Math.sin(a) * r;
      const rr = S * (0.05 + Math.random() * 0.1);
      g = ctx.createRadialGradient(x, y, 0, x, y, rr);
      g.addColorStop(0, 'rgba(150,160,180,0.10)');
      g.addColorStop(1, 'rgba(150,160,180,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - rr, y - rr, rr * 2, rr * 2);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

// 觀中五鈷金剛（大相）
export function kanVajraTexture() {
  const key = 'kanvajra';
  if (cache.has(key)) return cache.get(key);
  const S = 512, c = canvas(S), ctx = c.getContext('2d');
  ctx.translate(S / 2, S / 2);
  ctx.strokeStyle = '#e9cd8a';
  ctx.lineWidth = 7;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = '#e9cd8a';
  ctx.shadowBlur = 26;
  ICONS.vajra5(ctx, S * 0.43);
  ctx.shadowBlur = 0;
  ctx.lineWidth = 2.4;
  ctx.strokeStyle = '#fdf6e3';
  ICONS.vajra5(ctx, S * 0.43);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

// 投花之瓣
export function petalTexture() {
  const key = 'petal';
  if (cache.has(key)) return cache.get(key);
  const S = 128, c = canvas(S), ctx = c.getContext('2d');
  ctx.translate(S / 2, S / 2);
  const g = ctx.createLinearGradient(0, S * 0.3, 0, -S * 0.35);
  g.addColorStop(0, 'rgba(216,179,106,0.25)');
  g.addColorStop(0.6, 'rgba(233,205,138,0.75)');
  g.addColorStop(1, 'rgba(244,230,192,0.95)');
  ctx.fillStyle = g;
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 2;
  ctx.shadowColor = GOLD;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(0, S * 0.32);
  ctx.bezierCurveTo(-S * 0.3, S * 0.1, -S * 0.22, -S * 0.22, 0, -S * 0.36);
  ctx.bezierCurveTo(S * 0.22, -S * 0.22, S * 0.3, S * 0.1, 0, S * 0.32);
  ctx.fill();
  ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

// 金質 matcap：立體法器之相質（無光照世界中以此得體感）
export function matcapTexture() {
  const key = 'matcap-gold';
  if (cache.has(key)) return cache.get(key);
  const S = 256, c = canvas(S), ctx = c.getContext('2d');
  let g = ctx.createRadialGradient(S * 0.36, S * 0.32, S * 0.04, S * 0.5, S * 0.5, S * 0.62);
  g.addColorStop(0, '#fdf3d2');
  g.addColorStop(0.28, '#e7c98a');
  g.addColorStop(0.62, '#9a7437');
  g.addColorStop(0.88, '#4d3416');
  g.addColorStop(1, '#241606');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  // 底緣回光（如金屬之反照）
  g = ctx.createRadialGradient(S * 0.62, S * 0.85, S * 0.02, S * 0.62, S * 0.85, S * 0.3);
  g.addColorStop(0, 'rgba(244,222,160,0.5)');
  g.addColorStop(1, 'rgba(244,222,160,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

export function ringTexture(color = '#d8b36a') {
  const key = `ring|${color}`;
  if (cache.has(key)) return cache.get(key);
  const S = 256, c = canvas(S), ctx = c.getContext('2d');
  ctx.strokeStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 14;
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(S / 2, S / 2, S * 0.42, 0, 7); ctx.stroke();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  cache.set(key, tex);
  return tex;
}

export { GOLD, GOLD_DIM, INK, VERMILION };
