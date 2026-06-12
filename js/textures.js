// ─────────────────────────────────────────────────────────────────────────────
// 相之層：一切尊形皆程序所現 —— 月輪、種字、三昧耶形、焰環。
// 不取一張圖片資源；如曼荼羅之本義，相由法生。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';

const GOLD = '#d8b36a';
const GOLD_DIM = '#a8854a';
const INK = '#0c1020';
const VERMILION = '#c4502f';

const cache = new Map();

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

// 種字繪製：悉曇按幅自適，無悉曇則退羅馬轉寫
function drawSeed(ctx, sid, bija, baseSize, maxWidth, x, y) {
  if (sid) {
    let fs = baseSize * 1.18;
    ctx.font = `400 ${fs}px "Noto Sans Siddham"`;
    const w = ctx.measureText(sid).width;
    if (w > maxWidth) {
      fs *= maxWidth / w;
      ctx.font = `400 ${fs}px "Noto Sans Siddham"`;
    }
    ctx.fillText(sid, x, y);
  } else {
    ctx.font = `600 ${baseSize}px "Cormorant Garamond", serif`;
    ctx.fillText(bija, x, y);
  }
}

// ── 月輪尊形 ────────────────────────────────────────────────────────────────
// form: bija | samaya | subtle | offer | wrath | wrath-samaya
// sid: 悉曇種字（真形）；bija 羅馬轉寫降為輔注
export function deityTexture({ id, zh, bija, sid, samaya, color, form = 'bija' }) {
  const key = `${form}|${id}|${zh}|${bija}|${sid}`;
  if (cache.has(key)) return cache.get(key);

  const S = 256, c = canvas(S), ctx = c.getContext('2d');
  const cx = S / 2, cy = S / 2;
  const colHex = hex(color);
  const wrath = form.startsWith('wrath');

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
    ctx.lineWidth = 2.4;
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
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = wrath ? '#cf6a36' : GOLD;
  ctx.beginPath(); ctx.arc(0, 0, R, 0, 7); ctx.stroke();
  ctx.lineWidth = 1.2;
  ctx.strokeStyle = colHex;
  ctx.globalAlpha = 0.9;
  ctx.beginPath(); ctx.arc(0, 0, R * 0.9, 0, 7); ctx.stroke();
  ctx.globalAlpha = 1;

  // 內容
  ctx.strokeStyle = colHex;
  ctx.fillStyle = colHex;
  ctx.lineWidth = 3.2;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  const drawIcon = (size) => {
    const fn = ICONS[samaya] || ICONS.vajra1;
    ctx.save();
    ctx.shadowColor = colHex;
    ctx.shadowBlur = 10;
    fn(ctx, size);
    ctx.restore();
  };

  if (form === 'samaya' || form === 'wrath-samaya') {
    drawIcon(R * 0.62);
  } else if (form === 'subtle') {
    // 微細：種字縮於金剛杵輪廓之中
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.8;
    ICONS.vajra1(ctx, R * 0.95);
    ctx.restore();
    ctx.shadowColor = colHex;
    ctx.shadowBlur = 8;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    drawSeed(ctx, sid, bija, R * 0.52, R * 1.05, 0, R * 0.02);
  } else {
    // 種字：悉曇為正，羅馬轉寫為注
    ctx.shadowColor = colHex;
    ctx.shadowBlur = 14;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    drawSeed(ctx, sid, bija, R * 0.74, R * 1.3, 0, -R * 0.12);
    if (form !== 'offer' && sid) {
      // 羅馬轉寫輔注（供養形之蓮座居此位，故免注）
      ctx.shadowBlur = 6;
      ctx.globalAlpha = 0.78;
      ctx.font = `italic 600 ${R * 0.26}px "Cormorant Garamond", serif`;
      ctx.fillText(bija, 0, R * 0.58);
      ctx.globalAlpha = 1;
    }
    if (form === 'offer') {
      // 供養：捧蓮之手（下方小蓮座）
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1.6;
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
  cache.set(key, tex);
  return tex;
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
