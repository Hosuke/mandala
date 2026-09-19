import { BOOK_TAIZO_INNER } from './book-taizo-inner.js';
import { BOOK_TAIZO_OUTER } from './book-taizo-outer.js';
import { BOOK_KONGO_SEATS } from './book-kongo.js';

const pageSource = (volume, page) => page ? { volume, page, pdfPage: page + (volume === '上' ? 29 : -347) } : null;
const normalize = seat => ({
  ...seat,
  layoutSource: seat.layoutSource || pageSource(seat.source.positionVolume || seat.source.volume, seat.source.positionPage),
  iconographySource: seat.iconographySource || pageSource(seat.source.iconographyVolume || seat.source.volume, seat.source.iconographyPage),
  figureSource: seat.figureSource || pageSource(seat.source.figureVolume || seat.source.volume, seat.source.figurePage),
  observation: Object.fromEntries(Object.entries({
    color: seat.color, rightHand: seat.rightHand, leftHand: seat.leftHand, mudra: seat.mudra,
    mount: seat.mount, poseDetail: seat.poseDetail, visibleHeads: seat.visibleHeads,
    ...(seat.observation || {}),
  }).filter(([, value]) => value !== undefined)),
});
export const BOOK_SEATS = Object.freeze({
  t: Object.freeze([...BOOK_TAIZO_INNER, ...BOOK_TAIZO_OUTER].map(normalize)),
  k: Object.freeze([...BOOK_KONGO_SEATS].map(normalize)),
});
export const BOOK_BY_SEAT = new Map([...BOOK_SEATS.t, ...BOOK_SEATS.k].map(seat => [seat.seatId, seat]));
const byCanonical = new Map();
for (const seat of [...BOOK_SEATS.t, ...BOOK_SEATS.k]) {
  if (!seat.canonicalId) continue;
  const key = seat.realm === 'k' ? `${seat.assembly}|${seat.canonicalId}` : `${seat.canonicalId}|t`;
  if (!byCanonical.has(key)) byCanonical.set(key, seat);
}
export function bookSeatForTexture(id) {
  return byCanonical.get(id.endsWith('|k') ? `jojin|${id.slice(0, -2)}` : id) || null;
}
export function bookSymbolForTexture(id) {
  const seat = bookSeatForTexture(id);
  if (seat?.observation.kind === 'symbol') return seat;
  if (seat?.realm !== 'k') return null;
  return byCanonical.get(`${seat.assembly === 'gozanze' ? 'gozanze-s' : 'sammaya'}|${seat.canonicalId}`) || null;
}
export function bookCitation(seat) {
  const s = seat?.source;
  if (!s) return '';
  const pages = Array.isArray(s.page) ? s.page.join('、') : s.page;
  return `《曼荼羅之研究》${s.volume}冊，第 ${pages} 頁${s.section ? ` · ${s.section}` : ''}`;
}
