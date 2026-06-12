// ─────────────────────────────────────────────────────────────────────────────
// 投影之層：同一規範圖之兩種布局函數。
//   胎藏 —— 同心放射（流出之拓撲，空間的・共時的）
//   金剛 —— 九宮序列（轉換之拓撲，時間的・歷時的）
// 形變（不二）即兩投影間之連續插值；缺一面之尊，攝入其部主而隱顯。
// 座標約定：東=+x，南=+z（俯瞰時東右南下），y 為高。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';
import { DEITIES, byId, FAMILY_ANCHOR } from './data/deities.js';
import {
  COURTS, RING_RADIUS, PETAL_RADIUS,
  ASSEMBLIES, DESCENT_ORDER, CELL, MOON_R, ATTEND_R,
} from './data/courts.js';

const D2R = Math.PI / 180;
const onPlane = (angleDeg, r) =>
  new THREE.Vector3(Math.cos(angleDeg * D2R) * r, 0, -Math.sin(angleDeg * D2R) * r);

const SLOT_ANGLE = { C: null, E: 0, NE: 45, N: 90, NW: 135, W: 180, SW: 225, S: 270, SE: 315 };

const courtByKey = Object.fromEntries(COURTS.map(c => [c.key, c]));
const courtMembers = {};
for (const d of DEITIES) {
  if (!d.t || d.t.court === 'chudai') continue;
  (courtMembers[d.t.court] ??= []).push(d);
}
for (const list of Object.values(courtMembers)) list.sort((a, b) => a.t.slot - b.t.slot);

// ── 胎藏投影 ────────────────────────────────────────────────────────────────
export function taizoPosition(d) {
  if (!d.t) return null;
  if (d.t.court === 'chudai') {
    if (d.t.slot === 'C') return new THREE.Vector3(0, 0, 0);
    return onPlane(SLOT_ANGLE[d.t.slot], PETAL_RADIUS);
  }
  const court = courtByKey[d.t.court];
  const members = courtMembers[d.t.court];
  const i = members.indexOf(d), n = members.length;
  const r = RING_RADIUS[court.ring];
  if (court.key === 'gekongobu') {
    return onPlane(90 - (i / n) * 360, r); // 自北起順時針環列
  }
  const [a0, a1] = court.arc;
  return onPlane(a0 + ((i + 0.5) / n) * (a1 - a0), r);
}

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
      // 四波羅蜜：繞大日之四斜位
      return c.clone().add(onPlane(45 + k.slot * 90, ATTEND_R * 1.15));
    }
    // 四親近：繞部主，首位面向中央
    const toCenter = Math.atan2(c.z, -c.x) / D2R + 180; // 指向壇心之角
    return c.clone().add(onPlane(toCenter + k.slot * 90, ATTEND_R));
  }
  if (k.circle === 'inner') return onPlane(45 + k.slot * 90, MOON_R * 0.97);
  if (k.circle === 'outer') return onPlane(45 + k.slot * 90, MOON_R * 1.62);
  if (k.circle === 'gate') return onPlane(k.slot * 90, MOON_R * 1.78);
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
      // 理趣會：金剛薩埵為主，欲觸愛慢居四斜，四攝守門
      nodes = [
        { d: byId.fugen, pos: new THREE.Vector3(0, 0, 0),
          display: { zh: '金剛薩埵', bija: 'hūṃ' } },
        ...['r-yoku', 'r-soku', 'r-ai', 'r-man'].map((id, i) => ({
          d: byId[id], pos: onPlane(45 + i * 90, MOON_R * 0.85),
        })),
        ...['s-ko', 's-saku', 's-sa', 's-rei'].map((id, i) => ({
          d: byId[id], pos: onPlane(i * 90, MOON_R * 1.55),
        })),
      ];
    } else {
      let cast = BASE37;
      if (a.subset) cast = a.subset.map(id => byId[id]);
      nodes = cast.map(d => {
        let pos;
        if (a.subset && a.subset.length <= 1) pos = new THREE.Vector3(0, 0, 0);
        else if (a.subset) {
          // 四印會：大日居中，四尊四方，四波羅蜜四斜
          const i = a.subset.indexOf(d.id);
          if (i === 0) pos = new THREE.Vector3(0, 0, 0);
          else if (i <= 4) pos = onPlane((i - 1) * 90, MOON_R * 0.95);
          else pos = onPlane(45 + (i - 5) * 90, MOON_R * 0.6);
        } else pos = kongoLocal(d).clone();
        let display = null;
        if (a.key.startsWith('gozanze') && d.id === 'fugen') {
          // 金剛薩埵之教令輪身
          display = { zh: '降三世明王', sk: 'Trailokyavijaya', bija: 'hūṃ' };
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
  const petals = DEITIES.filter(d => d.t && d.t.court === 'chudai' && d.t.slot !== 'C');
  for (const p of petals) e.push(['center', p.id]);
  for (const c of COURTS) {
    if (c.key === 'chudai') continue;
    const members = courtMembers[c.key] || [];
    if (!members.length) continue;
    if (c.key === 'gekongobu') {
      // 護世諸天：環列相連，不繫於心 —— 守於周界
      for (let i = 0; i < members.length; i++) {
        e.push([members[i].id, members[(i + 1) % members.length].id]);
      }
    } else {
      e.push(['center', members[0].id]);
      for (let i = 1; i < members.length; i++) e.push([members[0].id, members[i].id]);
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

export { COURTS, courtMembers, ASSEMBLIES, assemblyByKey, DESCENT_ORDER, CELL, BASE37 };
