// ─────────────────────────────────────────────────────────────────────────────
// 投影之層：同一規範圖之兩種布局函數。
//   胎藏 —— 同心放射（流出之拓撲，空間的・共時的）：席位環列
//   金剛 —— 九宮序列（轉換之拓撲，時間的・歷時的）
// 形變（不二）即兩投影間之連續插值；缺一面之尊，攝入其部主而隱顯。
// 座標約定：東=+x，南=+z（俯瞰時東右南下），y 為高。
//
// 胎藏之位自席位層（data/seats.js）而來：四百一十二席各持方周之角 θ 與切比雪夫半徑 ρ，
// 此處折為世界座標——r = ρ·尺，角如其角；外金剛部二百三席共一環而交錯內外；
// 席相逼者互推（疏密之律）。院幅間距為展布，非原畫坐標。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';
import { DEITIES, byId, FAMILY_ANCHOR } from './data/deities.js';
import {
  COURTS, PETAL_RADIUS,
  ASSEMBLIES, DESCENT_ORDER, CELL, MOON_R, ATTEND_R,
} from './data/courts.js';
import { TAIZO_SEATS, seatsOf, primarySeatOf } from './data/seats.js';

const D2R = Math.PI / 180;
const onPlane = (angleDeg, r) =>
  new THREE.Vector3(Math.cos(angleDeg * D2R) * r, 0, -Math.sin(angleDeg * D2R) * r);

const SLOT_ANGLE = { C: null, E: 0, NE: 45, N: 90, NW: 135, W: 180, SW: 225, S: 270, SE: 315 };

// ── 胎藏投影：席位環列 ──────────────────────────────────────────────────────
export const SEAT_SCALE = 76;     // ρ 一單位之世界長（外院 ρ≈.44 → r≈33.5，承舊環之尺）
export const OUTER_R = 33.6;      // 外金剛部之環（二百三席，交錯內外）
export const OUTER_ZIGZAG = 1.3;  // 外院交錯之幅
const INNER_R = 10.6;             // 諸院不入八葉之界
const seatPosMap = new Map();

// 席之幅：中尊大相，正席次之，一尊之他席又次，席身（種字待核者）最小
export function seatSize(seat) {
  if (seat.court === 'chudai') return seat.d.t.slot === 'C' ? 5.6 : 3.7;
  if (seat.stub) {
    if (seat.book.observation.kind === 'symbol') return 1.15;
    return seat.court === 'gekongobu' ? 1.25 : 1.4;
  }
  if (!seat.primary) return 2.0;
  return seat.court === 'gekongobu' ? 2.2 : 2.6;
}

function project() {
  for (const s of TAIZO_SEATS) {
    if (s.court === 'chudai') {
      // 八葉依八方之瓣（席位與八葉之瓣同構，取瓣之位而不取圖之點）
      seatPosMap.set(s.seatId, s.d.t.slot === 'C'
        ? new THREE.Vector3(0, 0, 0) : onPlane(SLOT_ANGLE[s.d.t.slot], PETAL_RADIUS));
      continue;
    }
    if (s.court === 'gekongobu') continue;
    seatPosMap.set(s.seatId, onPlane(s.theta, Math.max(INNER_R, s.rho * SEAT_SCALE)));
  }
  // 外金剛部：一環而交錯內外（單環二百三席相逼不可辨，交錯乃疏之——展布之法）
  seatsOf('gekongobu').forEach((s, i) => {
    seatPosMap.set(s.seatId, onPlane(s.theta, OUTER_R + (i % 2 ? OUTER_ZIGZAG : -OUTER_ZIGZAG)));
  });
  relax();
}

// 疏密之律：席相逼者互推（同院異院皆然），十六巡而止；不入八葉之界，不越外環
function relax() {
  const list = TAIZO_SEATS.filter(s => s.court !== 'chudai');
  const pos = list.map(s => seatPosMap.get(s.seatId));
  const size = list.map(seatSize);
  for (let iter = 0; iter < 16; iter++) {
    let moved = 0;
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < i; j++) {
        const a = pos[i], b = pos[j];
        const dx = a.x - b.x, dz = a.z - b.z;
        const d = Math.hypot(dx, dz), min = (size[i] + size[j]) * 0.5 + 0.35;
        if (d >= min) continue;
        const push = (min - Math.max(d, 1e-3)) / 2;
        const ux = d > 1e-3 ? dx / d : 1, uz = d > 1e-3 ? dz / d : 0;
        a.x += ux * push; a.z += uz * push;
        b.x -= ux * push; b.z -= uz * push;
        moved++;
      }
    }
    if (!moved) break;
  }
  for (const p of pos) {
    const r = Math.hypot(p.x, p.z);
    const cap = Math.min(Math.max(r, INNER_R), OUTER_R + OUTER_ZIGZAG + 0.6);
    if (cap !== r && r > 1e-9) { p.x *= cap / r; p.z *= cap / r; }
  }
}
project();

export const seatPosition = seat => seatPosMap.get(seat.seatId) ?? null;

// 一尊之位＝其正席之位（無胎藏面者 null；形變之錨亦由此取）
export function taizoPosition(d) {
  if (!d || !d.t) return null;
  const s = primarySeatOf(d.id);
  return s ? seatPosition(s) : null;
}

// 院之成員：有身份之席（依角序），脈絡所用；院主＝不二層 slot 最小者
export const courtMembers = {};
for (const c of COURTS) courtMembers[c.key] = seatsOf(c.key).filter(s => !s.stub);
const slotRank = s => (typeof s.d.t.slot === 'number' && s.d.t.court === s.court ? s.d.t.slot : 1e6);
export const courtLord = key => courtMembers[key].reduce((m, s) => (slotRank(s) < slotRank(m) ? s : m), courtMembers[key][0]);

// ── 金剛投影（成身會內之位，即形變之終點）───────────────────────────────────
const MOON_CENTER = {
  center: new THREE.Vector3(0, 0, 0),
  east: onPlane(0, MOON_R),
  south: onPlane(270, MOON_R),
  west: onPlane(180, MOON_R),
  north: onPlane(90, MOON_R),
};

export function kongoLocal(d) {
  const k = d.k;
  if (!k || !k.circle) return null;
  if (k.circle in MOON_CENTER) {
    const c = MOON_CENTER[k.circle];
    if (k.slot === 'lord') return c.clone();
    if (k.circle === 'center') {
      // 上冊 p342：金剛、寶、法、羯磨波羅蜜依東、南、西、北四正。
      return c.clone().add(onPlane(-k.slot * 90, ATTEND_R * 1.15));
    }
    // 四佛向壇心；四親近依「前右左背」安列（T0903），非沿圓依序旋轉。
    const toCenter = Math.atan2(c.z, -c.x) / D2R;
    return c.clone().add(onPlane(toCenter + [0, -90, 90, 180][k.slot], ATTEND_R));
  }
  // 八供依東南、西南、西北、東北；四攝依東、南、西、北（T1065）。
  if (k.circle === 'inner') return onPlane(-45 - k.slot * 90, MOON_R * 0.97);
  if (k.circle === 'outer') return onPlane(-45 - k.slot * 90, MOON_R * 1.62);
  if (k.circle === 'gate') return onPlane(-k.slot * 90, MOON_R * 1.78);
  return null;
}

export function cellCenter(assembly) {
  const [col, row] = assembly.grid;
  return new THREE.Vector3((col - 1) * CELL, 0, (row - 1) * CELL);
}
const assemblyByKey = Object.fromEntries(ASSEMBLIES.map(a => [a.key, a]));

// ── 形變目標：每節點之 (posT, posK, hasT, hasK) ──────────────────────────────
export function morphTargets(d) {
  const hasT = !!d.t, hasK = !!(d.k && d.k.circle);
  const anchor = byId[FAMILY_ANCHOR[d.family]];
  const posT = hasT ? taizoPosition(d) : taizoPosition(anchor);
  const posK = hasK ? kongoLocal(d) : kongoLocal(anchor);
  return { posT, posK, hasT, hasK };
}

// ── 九會回響（成身會以外八會之「表示變換」實例）──────────────────────────────
// 同一批節點，於各會以異形重現 —— 變換函子之可見化。
const BASE37 = DEITIES.filter(d => d.k && d.k.circle);

export function assemblyEchoes() {
  const out = [];
  for (const a of ASSEMBLIES) {
    if (a.key === 'jojin') continue; // 成身會由真身（形變節點）充任
    const center = cellCenter(a);
    let nodes;
    if (a.cast === 'rishu') {
      // 理趣十七尊：主尊＋四金剛＋四金剛女＋內四供養＋四攝。
      // 方位據 MIKKYO 21 理趣會明文；半徑為本引擎之拓撲展布。
      nodes = [
        { d: byId.fugen, pos: new THREE.Vector3(0, 0, 0),
          display: { zh: '金剛薩埵', bija: 'hūṃ' } },
        ...['r-yoku', 'r-soku', 'r-ai', 'r-man'].map((id, i) => ({
          d: byId[id], pos: onPlane(-i * 90, MOON_R * 0.85),
        })),
        ...['r-yoku-nyo', 'r-soku-nyo', 'r-ai-nyo', 'r-man-nyo'].map((id, i) => ({
          d: byId[id], pos: onPlane(-45 - i * 90, MOON_R * 0.85),
        })),
        ...['g-ki', 'g-man', 'g-ka', 'g-bu'].map((id, i) => ({
          d: byId[id], pos: onPlane(-45 - i * 90, MOON_R * 1.55),
        })),
        ...['s-ko', 's-saku', 's-sa', 's-rei'].map((id, i) => ({
          d: byId[id], pos: onPlane(-i * 90, MOON_R * 1.55),
        })),
      ];
    } else {
      let cast = BASE37;
      if (a.subset) cast = a.subset.map(id => byId[id]);
      nodes = cast.map(d => {
        let pos;
        if (a.subset && a.subset.length <= 1) pos = new THREE.Vector3(0, 0, 0);
        else if (a.subset) {
          // 四印十三尊：五尊現尊形，四波羅蜜及內四供養現三昧耶形。
          const i = a.subset.indexOf(d.id);
          if (i === 0) pos = new THREE.Vector3(0, 0, 0);
          else if (i <= 4) pos = onPlane(-(i - 1) * 90, MOON_R * 0.95);
          // 下冊 p451：本會四波羅蜜依東南、西南、西北、東北四隅。
          else if (i <= 8) pos = onPlane(-45 - (i - 5) * 90, MOON_R * 0.6);
          else pos = onPlane(-45 - (i - 9) * 90, MOON_R * 1.35);
        } else pos = kongoLocal(d).clone();
        let display = a.key === 'shiin' && a.subset.indexOf(d.id) >= 5 ? { form: 'samaya' } : null;
        if (a.key.startsWith('gozanze') && d.id === 'fugen') {
          // 金剛薩埵之教令輪身
          display = { zh: '降三世明王', sk: 'Trailokyavijaya', bija: 'hūṃ',
            desc: { zh: '金剛薩埵之教令輪身，降伏三世之障。',
              en: 'The wrathful manifestation of Vajrasattva, subduing the obstacles of the three worlds.',
              ja: '金剛薩埵の教令輪身。三世の障りを降伏す。' }, mantra: '' };
        }
        return { d, pos, display };
      });
    }
    for (const n of nodes) {
      n.pos.multiplyScalar(a.scale).add(center);
    }
    out.push({ assembly: a, nodes });
  }
  return out;
}

// ── 邊（流出之脈絡）──────────────────────────────────────────────────────────
// 以 id 對表示，渲染時查當前活動位置 —— 形變中線隨尊行。
export function taizoEdges() {
  const e = [];
  const center = primarySeatOf('center').seatId;
  for (const s of seatsOf('chudai')) if (s.d.id !== 'center') e.push([center, s.seatId]);
  for (const c of COURTS) {
    if (c.key === 'chudai') continue;
    const members = courtMembers[c.key];
    if (!members.length) continue;
    if (c.key === 'gekongobu') {
      // 護世諸天：環列相連，不繫於心 —— 守於周界
      for (let i = 0; i < members.length; i++) {
        e.push([members[i].seatId, members[(i + 1) % members.length].seatId]);
      }
    } else {
      const lord = courtLord(c.key);
      e.push([center, lord.seatId]);
      for (const m of members) if (m !== lord) e.push([lord.seatId, m.seatId]);
    }
  }
  return e;
}

export function kongoEdges() {
  const e = [];
  for (const id of ['east', 'south', 'west', 'north']) e.push(['center', id]);
  for (const d of BASE37) {
    const k = d.k;
    if (k.slot === 'lord' || !(k.circle in MOON_CENTER)) continue;
    e.push([k.circle === 'center' ? 'center' : k.circle, d.id]);
  }
  return e;
}

// ── 九會螺旋（下轉之路）──────────────────────────────────────────────────────
export function spiralCurve() {
  const pts = DESCENT_ORDER.map(key => cellCenter(assemblyByKey[key]).setY(0.4));
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.12);
}

export { COURTS, ASSEMBLIES, assemblyByKey, DESCENT_ORDER, CELL, BASE37, TAIZO_SEATS };
