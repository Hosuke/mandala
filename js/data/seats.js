// ─────────────────────────────────────────────────────────────────────────────
// 席位層 · Seats — 一尊可據多席，席繫身份而不等於身份
//
// 不二層（deities.js）記「誰」：每尊一條，兩部同體者一條持兩面。此層記「何處」：
// 胎藏現圖四百一十二席，自《曼荼羅之研究》各院配置圖逐席轉錄（book-taizo-*.js，
// 書據隨席）。有身份錨（canonicalId）之席繫於不二層之尊，一尊數席者以本院之席為正席
// （觀自在居中臺，亦現於釋迦・文殊二院——多席歸一身）；餘席立「席身」——唯有書載尊名，
// 種字待核、三昧耶形未備、粉本鍵預留（尊號＝席號）。壇上以尊名占位，寧缺毋誤：
// 不借同名之種字、不畫通形冒充。他日考據既足，席身升為不二層之尊，席號不改。
//
// 投影之數（無量綱）：配置圖為方（東上南右），壇城為同心放射。以「方周之法」化方為圓——
// 席之切比雪夫半徑 ρ = max(|du|,|dv|) 定其環，方周之位定其角（周長均分於 360°，
// 四邊四隅各守其分：東 90°・南 0°・西 270°・北 180°）。內外之序、鄰席之序皆存；
// 院幅間距為展布，非原畫像素。世界座標之折算在投影層（layout.js）。
// ─────────────────────────────────────────────────────────────────────────────
import { BOOK_SEATS } from './book-catalog.js';
import { byId } from './deities.js';
import { TAIZO_BIJA } from './taizo-bija.js';

// 席身之部屬暫從其院（色與形變之歸宿）；升為不二層之尊時另定
export const COURT_FAMILY = {
  chudai: 'butsu', henchi: 'butsu', jimyo: 'kongo', renge: 'renge', kongoshu: 'kongo',
  shaka: 'butsu', monju: 'butsu', jokaisho: 'butsu', jizo: 'butsu', kokuzo: 'ho',
  soshitsuji: 'renge', gekongobu: 'ten',
};

// 方周之法：配置圖 (u,v)（東上南右，0..1）→ { rho, theta }
//   rho：切比雪夫半徑（0 壇心 … ~0.47 外院）
//   theta：度，0=南（右）、90=東（上）、180=北（左）、270=西（下），逆時針增
export function polarOf(u, v) {
  const du = u - 0.5, dv = 0.5 - v;
  const rho = Math.max(Math.abs(du), Math.abs(dv));
  if (rho < 1e-9) return { rho: 0, theta: 0 };
  const sx = du / rho, sy = dv / rho;
  let p; // 方周之位，0..8（每邊二，自右邊中點逆時針）
  if (Math.abs(sx - 1) < 1e-9) p = sy >= 0 ? sy : 8 + sy;
  else if (Math.abs(sy - 1) < 1e-9) p = 2 - sx;
  else if (Math.abs(sx + 1) < 1e-9) p = 4 - sy;
  else p = 6 + sx;
  return { rho, theta: (p * 45) % 360 };
}

// 右側諸院（金剛手・除蓋障）跨 0°，序以 (-180,180] 之角
const RIGHT_COURTS = new Set(['kongoshu', 'jokaisho']);
export const sortAngle = seat => (RIGHT_COURTS.has(seat.court) ? ((seat.theta + 180) % 360) - 180 : seat.theta);

// 席身之釋：書據頁碼已另列於詳情，故去轉錄之套語，只留該席特有之考語（無則空）
const BOILERPLATE = [
  /依上冊第 ?\d+ 頁配置圖第 ?\d+ 號定名、定相對席次。/g,
  /尊容據第 ?\d+(?:[、–-]\d+)* 頁。/g,
  /未由所引圖文確定之面、臂或姿態留空；名位已據圖表核對。/g,
  /上冊p\d+[東南西北]方位圖第\d+，名表p\d+。/g,
  /形相機助觀察據上冊卷首PDF\d+「[^」]*」；[^。]*。/g,
];
const specificNote = note => BOILERPLATE.reduce((t, re) => t.replace(re, ''), note || '').trim();

const seats = [];
const primaryOf = new Map(); // 尊號 → 正席
for (const book of BOOK_SEATS.t) {
  const { rho, theta } = polarOf(book.u, book.v);
  const canonical = book.canonicalId ? byId[book.canonicalId] : null;
  seats.push({ seatId: book.seatId, court: book.court, name: book.name, rho, theta, book, d: canonical, stub: !canonical, primary: false });
}
// 正席之判：本院之席為正；無本院席者以首見為正
for (const s of seats) {
  if (!s.d) continue;
  const cur = primaryOf.get(s.d.id);
  if (!cur || (s.court === s.d.t.court && cur.court !== s.d.t.court)) primaryOf.set(s.d.id, s);
}
for (const s of primaryOf.values()) s.primary = true;

// 席身：唯尊名，種字待核；尊號＝席號（粉本鍵預留）
const bySeatCourt = {};
for (const s of seats) (bySeatCourt[s.court] ??= []).push(s);
for (const list of Object.values(bySeatCourt)) list.sort((a, b) => sortAngle(a) - sortAngle(b));
export const SEAT_IDENTITIES = [];
for (const [court, list] of Object.entries(bySeatCourt)) {
  list.forEach((s, i) => {
    s.order = i;
    if (s.d) return;
    // 席身之種字：有錄（taizo-bija.js）則現之而標其據，無則待核而列尊名
    const rec = TAIZO_BIJA[s.seatId] || null;
    s.bija = rec;
    s.d = {
      id: s.seatId, family: COURT_FAMILY[court], samaya: null, seatOnly: true, bijaPending: !rec,
      t: { zh: s.name, sk: rec?.sk || '', bija: rec?.bija || '', court, slot: i },
      desc: specificNote(s.book.note),
    };
    s.primary = true;
    SEAT_IDENTITIES.push(s.d);
  });
}

export const TAIZO_SEATS = Object.freeze(seats);
export const seatByKey = new Map(seats.map(s => [s.seatId, s]));
export const seatsOf = court => bySeatCourt[court] || [];
export const primarySeatOf = id => primaryOf.get(id) || (seatByKey.get(id) ?? null);
export const seatIndex = seat => seat.book.source?.figureNumber ?? seat.book.layoutSource?.number ?? (Number(seat.book.key) || seat.order + 1);
