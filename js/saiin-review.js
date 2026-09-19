// 西院本待審圖：圖本席位獨立於 canonical deity；畫布只收程序筆，不收參照圖片。
import { TAIZO_SEATS } from './data/saiin-taizo.js';
import { KONGO_SEATS } from './data/saiin-kongo.js';
import { MANDALA_EDITION } from './data/edition.js';
import { COURTS, ASSEMBLIES } from './data/courts.js';
import { COURT_EN, ASM_EN } from './data/i18n.js';
import { drawSaiinSeat } from './saiin-drawing.js';

const TEXT = {
  zh: { title: '西院本 · 兩界待審圖', back: '← 金胎不二', notice: '機助判讀與程序尊形草稿，逐席待人工覆核。群像區尚未逐尊展開。',
    t: '胎藏界', k: '金剛界', fit: '全圖', hint: '拖曳移圖 · 滾輪縮放 · 點席查閱', legend: '○ 尊形草稿　◇ 未辨席　▧ 群像區', pending: '待人工覆核',
    detail: '逐席查閱', intro: '點選圖中席位，或由下方名錄檢索。', catalogue: '席位名錄', search: '尊名／席位編號', placeholder: '檢索待審席位', location: '院／會', all: '全部', more: '繼續顯示',
    sourceNote: '以東寺西院曼荼羅為底本。尊名、坐次與筆形各待覆核；草稿不作正式核定。', temple: '東寺館藏', catalogueSource: '文化財編目', imageSource: '參照圖出典',
    seat: '席位編號', state: '身份', place: '院／會', coords: '圖本座標', drawing: '筆形依據', note: '判讀記錄', kind: '可見形態', limbs: '面／臂',
    candidate: '候選尊名', unidentified: '尚未辨尊', group: '群像區', blank: '未辨', empty: '無符合條件的席位。',
    counts: (n, g) => `逐席 ${n} · 群像區 ${g}`, results: (n, g, shown) => `符合：逐席 ${n} · 群像區 ${g}；名錄顯示 ${shown} 項`,
    groupNote: '此為群像區域標記，非逐尊席位。內含尊数、尊名與坐次尚待逐一判讀。', drawingPending: '程序筆形草稿，待人工覆核。', noDrawing: '未辨輪廓標記；尚無尊形判讀。',
    canvasLabel: '待審席位圖。方向鍵移圖，加減鍵縮放，0 鍵復位；可由名錄鍵盤選席。', zoomIn: '放大', zoomOut: '縮小', observations: '機助觀察，非正式儀軌判定',
  },
  en: { title: 'Saiin Mandala · Review Draft', back: '← Ryōbu Mandala', notice: 'Machine-assisted identifications and procedural figure drafts await human review. Group areas have not been resolved into individual seats.',
    t: 'Taizōkai', k: 'Kongōkai', fit: 'Fit', hint: 'Drag to pan · Scroll to zoom · Select a seat', legend: '○ Figure draft　◇ Unidentified　▧ Group area', pending: 'Awaiting human review',
    detail: 'Inspect a seat', intro: 'Select a seat in the diagram or search the catalogue below.', catalogue: 'Seat catalogue', search: 'Name / seat ID', placeholder: 'Search draft seats', location: 'Court / assembly', all: 'All', more: 'Show more',
    sourceNote: 'Based on the Tōji Saiin Mandala. Identities, positions and drawings require separate human review. This draft is not an approved reconstruction.', temple: 'Tōji collection', catalogueSource: 'Cultural property record', imageSource: 'Reference image source',
    seat: 'Seat ID', state: 'Identity', place: 'Location', coords: 'Image position', drawing: 'Drawing basis', note: 'Observation notes', kind: 'Visible form', limbs: 'Heads / arms',
    candidate: 'Candidate name', unidentified: 'Unidentified', group: 'Group area', blank: 'Unidentified', empty: 'No seats match these filters.',
    counts: (n, g) => `${n} individual seats · ${g} group areas`, results: (n, g, shown) => `Matches: ${n} individual seats · ${g} group areas; showing ${shown} entries`,
    groupNote: 'This outline marks a group area, not an individual seat. Its figure count, names and positions still require individual review.', drawingPending: 'Procedural drawing draft, awaiting human review.', noDrawing: 'Unidentified outline marker; no figure interpretation available.',
    canvasLabel: 'Draft seat diagram. Arrow keys pan, plus and minus zoom, 0 fits the diagram. Seats are also keyboard-accessible in the catalogue.', zoomIn: 'Zoom in', zoomOut: 'Zoom out', observations: 'Machine-assisted observation; not an approved iconographic record',
  },
  ja: { title: '西院本 · 両界の確認用草稿', back: '← 金胎不二', notice: '機械による判読とプログラム描画の草稿です。各席の確定には人による確認が必要です。群像区は個々の尊に未分割です。',
    t: '胎蔵界', k: '金剛界', fit: '全図', hint: 'ドラッグで移動 · ホイールで拡大 · 席を選択', legend: '○ 尊形草稿　◇ 未同定　▧ 群像区', pending: '人による確認待ち',
    detail: '席を確認', intro: '図の席を選ぶか、下の目録から検索してください。', catalogue: '席位目録', search: '尊名／席位番号', placeholder: '確認待ちの席を検索', location: '院／会', all: 'すべて', more: 'さらに表示',
    sourceNote: '東寺西院曼荼羅を底本とします。尊名・坐次・描画はそれぞれ確認待ちであり、草稿は確定版ではありません。', temple: '東寺の所蔵品', catalogueSource: '文化財の記録', imageSource: '参照画像の出典',
    seat: '席位番号', state: '同定', place: '院／会', coords: '画像座標', drawing: '描画の根拠', note: '判読記録', kind: '見える形', limbs: '面／臂',
    candidate: '尊名候補', unidentified: '未同定', group: '群像区', blank: '未同定', empty: '条件に合う席がありません。',
    counts: (n, g) => `個別席 ${n} · 群像区 ${g}`, results: (n, g, shown) => `該当：個別席 ${n} · 群像区 ${g}；${shown} 件を表示`,
    groupNote: '群像の範囲を示す印であり、個々の尊の席位ではありません。尊数・尊名・坐次は個別の確認待ちです。', drawingPending: 'プログラムによる描画草稿。人による確認待ち。', noDrawing: '未同定の輪郭標識。尊形は未判読です。',
    canvasLabel: '確認待ちの席位図。方向キーで移動、＋－で拡大縮小、0 で全図。目録からもキーボードで席を選べます。', zoomIn: '拡大', zoomOut: '縮小', observations: '機械による観察。正式な儀軌判定ではありません',
  },
};

const SOURCE = {
  'saiin-taizo-commons': 'https://commons.wikimedia.org/wiki/File:Taizokai.jpg',
  'saiin-kongo-commons': 'https://commons.wikimedia.org/wiki/File:Kongokai.jpg',
};
const IMAGE_RATIO = { t: 3033 / 3445, k: 3125 / 3567 };
const LOCATION_ZH = Object.fromEntries([...COURTS, ...ASSEMBLIES].map(location => [location.key, location.zh]));
const LOCATION_JA = Object.fromEntries(Object.entries(LOCATION_ZH).map(([key, label]) => [key,
  label.replace(/[臺釋虛藏會]/g, char => ({ 臺: '台', 釋: '釈', 虛: '虚', 藏: '蔵', 會: '会' })[char]) ]));
const OBSERVATION_LABELS = {
  zh: { buddha: '佛形', bodhisattva: '菩薩形', wrath: '忿怒形', deva: '天部形', symbol: '標幟', group: '群像', unknown: '未辨', seated: '坐姿', standing: '立姿', reclining: '臥姿' },
  en: { buddha: 'Buddha figure', bodhisattva: 'Bodhisattva figure', wrath: 'Wrathful figure', deva: 'Deva figure', symbol: 'Emblem', group: 'Group', unknown: 'Unidentified', seated: 'Seated', standing: 'Standing', reclining: 'Reclining' },
  ja: { buddha: '仏形', bodhisattva: '菩薩形', wrath: '忿怒形', deva: '天部形', symbol: '標幟', group: '群像', unknown: '未同定', seated: '坐姿', standing: '立姿', reclining: '臥姿' },
};
const ALL = { t: TAIZO_SEATS, k: KONGO_SEATS };
const $ = id => document.getElementById(id);
let lang = 'zh';
try { lang = localStorage.getItem('mandala-lang') || 'zh'; } catch { /* localStorage optional */ }
if (!TEXT[lang]) lang = 'zh';
let realm = new URLSearchParams(location.search).get('realm') === 'k' ? 'k' : 't';
let selected = null, filtered = [], limit = 60;
let zoom = 1, panX = 0, panY = 0, width = 0, height = 0, frameQueued = false;
const drawingNotes = new Map();
const canvas = $('saiin-canvas');
const ctx = canvas.getContext('2d');
const text = () => TEXT[lang];
const groupOf = seat => seat.court || seat.assembly || '';
const locationLabel = key => lang === 'en' ? (COURT_EN[key] || ASM_EN[key] || key) : ((lang === 'ja' ? LOCATION_JA : LOCATION_ZH)[key] || key);
const observationLabel = value => OBSERVATION_LABELS[lang][value] || value;
const isGroup = seat => seat.identityStatus === 'group';
const counts = seats => [seats.filter(s => !isGroup(s)).length, seats.filter(isGroup).length];
const currentLabel = seat => seat.name || text().blank;
const searchText = seat => [seat.name, seat.seatId, seat.canonicalId, groupOf(seat), seat.note].filter(Boolean).join(' ').toLocaleLowerCase();
const baseScale = () => Math.max(1, Math.min((width - 46) / IMAGE_RATIO[realm], height - 76));
const point = seat => ({ x: width / 2 + panX + (seat.u - 0.5) * IMAGE_RATIO[realm] * baseScale() * zoom,
  y: height / 2 + panY + (seat.v - 0.5) * baseScale() * zoom });
const dimensions = seat => ({ w: seat.w * IMAGE_RATIO[realm] * baseScale() * zoom, h: seat.h * baseScale() * zoom });

function requestDraw() {
  if (frameQueued) return;
  frameQueued = true;
  requestAnimationFrame(() => { frameQueued = false; draw(); });
}

function draw() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const scale = baseScale() * zoom, iw = IMAGE_RATIO[realm] * scale;
  const left = width / 2 + panX - iw / 2, top = height / 2 + panY - scale / 2;
  ctx.strokeStyle = '#8e754b'; ctx.lineWidth = 1;
  ctx.fillStyle = '#0b101bcc'; ctx.fillRect(left, top, iw, scale); ctx.strokeRect(left, top, iw, scale);
  // 群像只框出參照圖區域，不用重複的假佛像推算尊数。
  const ordered = [...filtered.filter(isGroup), ...filtered.filter(s => !isGroup(s))];
  for (const seat of ordered) {
    const p = point(seat), size = dimensions(seat);
    if (p.x + size.w / 2 < -15 || p.x - size.w / 2 > width + 15 || p.y + size.h / 2 < -15 || p.y - size.h / 2 > height + 15) continue;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.strokeStyle = '#d8b36a'; ctx.fillStyle = '#d8b36a'; ctx.lineWidth = 1;
    if (isGroup(seat)) {
      ctx.strokeStyle = selected?.seatId === seat.seatId ? '#bee8e2' : '#887458';
      ctx.fillStyle = selected?.seatId === seat.seatId ? '#bee8e216' : '#b29a7010';
      ctx.setLineDash([3, 4]); ctx.fillRect(-size.w / 2, -size.h / 2, size.w, size.h); ctx.strokeRect(-size.w / 2, -size.h / 2, size.w, size.h);
      drawingNotes.set(seat.seatId, { kind: 'group', note: text().groupNote });
    } else {
      const radius = Math.max(1.2, Math.min(size.w, size.h) * 0.48);
      if (radius < 2.4) {
        ctx.globalAlpha = seat.identityStatus === 'unidentified' ? 0.5 : 0.85;
        ctx.beginPath(); ctx.arc(0, 0, Math.max(1, radius * 0.65), 0, Math.PI * 2); ctx.fill();
      } else {
        const result = drawSaiinSeat(ctx, seat, radius);
        if (result) drawingNotes.set(seat.seatId, result);
      }
      if (selected?.seatId === seat.seatId) {
        ctx.strokeStyle = '#bee8e2'; ctx.globalAlpha = 1; ctx.lineWidth = 1.8; ctx.setLineDash([]);
        ctx.beginPath(); ctx.arc(0, 0, radius + 4, 0, Math.PI * 2); ctx.stroke();
      }
    }
    ctx.restore();
  }
  $('zoom-level').textContent = `${Math.round(zoom * 100)}%`;
}

function updateDetail() {
  const t = text();
  $('detail-content').replaceChildren();
  $('detail-state').textContent = t.pending;
  $('detail-title').textContent = selected ? currentLabel(selected) : t.detail;
  $('detail-intro').textContent = selected ? t.observations : t.intro;
  if (!selected) return;
  const s = selected, dl = document.createElement('dl');
  const add = (label, value) => {
    const dt = document.createElement('dt'), dd = document.createElement('dd');
    dt.textContent = label; dd.textContent = value || '—'; dl.append(dt, dd);
  };
  add(t.seat, s.seatId); add(t.state, t[s.identityStatus] || t.unidentified); add(t.place, locationLabel(groupOf(s)));
  add(t.coords, `${(s.u * 100).toFixed(2)}%, ${(s.v * 100).toFixed(2)}%`);
  const observation = s.observation || {};
  const attributes = (observation.attributes || []).map(a => typeof a === 'string' ? a : a?.note || a?.name || a?.kind);
  add(t.kind, [observationLabel(observation.kind), observationLabel(observation.pose), ...attributes].filter(Boolean).join(' · '));
  if (!isGroup(s)) add(t.limbs, `${observation.heads ?? '?'} / ${observation.arms ?? '?'}`);
  const drawing = drawingNotes.get(s.seatId);
  add(t.drawing, isGroup(s) ? t.groupNote : (drawing?.note || (s.identityStatus === 'unidentified' ? t.noDrawing : t.drawingPending)));
  $('detail-content').append(dl);
  if (s.note) {
    const note = document.createElement('p'); note.className = 'seat-note'; note.textContent = s.note; $('detail-content').append(note);
  }
  const links = document.createElement('div'); links.className = 'source-links';
  const source = SOURCE[s.evidence];
  if (source) {
    const a = document.createElement('a'); a.href = source; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.textContent = t.imageSource; links.append(a);
  }
  $('detail-content').append(links);
}

function selectSeat(seat, focus = false) {
  selected = seat;
  if (focus) {
    // 小席由名錄選取後移至中央，保留比例，只在遠景時適度放大。
    zoom = isGroup(seat)
      ? Math.max(1, Math.min(6, 0.7 / Math.max(seat.w * IMAGE_RATIO[realm], seat.h, 0.006)))
      : Math.max(zoom, Math.min(8, 0.13 / Math.max(seat.w, seat.h, 0.006)));
    panX = -(seat.u - 0.5) * IMAGE_RATIO[realm] * baseScale() * zoom;
    panY = -(seat.v - 0.5) * baseScale() * zoom;
  }
  draw(); updateDetail();
  for (const button of $('seat-list').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.seatId === seat.seatId));
}

function updateList() {
  const t = text(), list = $('seat-list'); list.replaceChildren();
  for (const seat of filtered.slice(0, limit)) {
    const button = document.createElement('button'); button.className = 'seat-button'; button.dataset.seatId = seat.seatId;
    button.setAttribute('aria-pressed', String(selected?.seatId === seat.seatId));
    const status = document.createElement('span'); status.className = 'seat-type'; status.textContent = t[seat.identityStatus] || t.unidentified;
    const title = document.createElement('span'); title.textContent = currentLabel(seat);
    const id = document.createElement('span'); id.className = 'seat-id'; id.textContent = seat.seatId;
    button.append(status, title, id); button.addEventListener('click', () => selectSeat(seat, true)); list.append(button);
  }
  const [n, g] = counts(filtered);
  $('result-count').textContent = t.results(n, g, Math.min(limit, filtered.length));
  $('more-seats').hidden = filtered.length <= limit;
  $('canvas-empty').textContent = t.empty; $('canvas-empty').hidden = filtered.length > 0;
}

function applyFilters() {
  const query = $('seat-search').value.trim().toLocaleLowerCase(), group = $('location-filter').value;
  filtered = ALL[realm].filter(s => (!group || groupOf(s) === group) && (!query || searchText(s).includes(query)));
  limit = 60; updateList(); requestDraw();
}

function updateLocations() {
  const select = $('location-filter'), previous = select.value; select.replaceChildren();
  const add = (value, label) => { const option = document.createElement('option'); option.value = value; option.textContent = label; select.append(option); };
  add('', text().all);
  for (const name of new Set(ALL[realm].map(groupOf).filter(Boolean))) add(name, locationLabel(name));
  select.value = [...select.options].some(o => o.value === previous) ? previous : '';
}

function fit() { zoom = 1; panX = 0; panY = 0; requestDraw(); }

function setRealm(next) {
  realm = next; selected = null; $('location-filter').value = ''; $('seat-search').value = '';
  for (const b of document.querySelectorAll('[data-realm]')) b.setAttribute('aria-pressed', String(b.dataset.realm === realm));
  $('diagram-title').textContent = text()[realm]; $('seat-count').textContent = text().counts(...counts(ALL[realm]));
  updateLocations(); applyFilters(); updateDetail(); fit();
  const url = new URL(location.href); url.searchParams.set('realm', realm); history.replaceState(null, '', url);
}

function applyLanguage() {
  const t = text(); document.documentElement.lang = lang === 'zh' ? 'zh-Hant' : lang;
  const content = { 'page-title': t.title, 'back-link': t.back, 'review-notice': t.notice, 'realm-t': t.t, 'realm-k': t.k, 'fit-view': t.fit,
    'interaction-hint': t.hint, legend: t.legend, 'catalogue-title': t.catalogue, 'search-label': t.search, 'location-label': t.location,
    'more-seats': t.more, 'source-note': t.sourceNote, 'edition-source': t.temple, 'catalogue-source': t.catalogueSource };
  for (const [id, value] of Object.entries(content)) $(id).textContent = value;
  document.title = t.title; $('seat-search').placeholder = t.placeholder; canvas.setAttribute('aria-label', t.canvasLabel);
  $('zoom-in').setAttribute('aria-label', t.zoomIn); $('zoom-out').setAttribute('aria-label', t.zoomOut);
  $('diagram-title').textContent = t[realm]; $('seat-count').textContent = t.counts(...counts(ALL[realm]));
  for (const b of document.querySelectorAll('[data-lang]')) b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  updateLocations(); applyFilters(); draw(); updateDetail();
}

function zoomAt(factor, x = width / 2, y = height / 2) {
  const next = Math.max(0.7, Math.min(24, zoom * factor)), ratio = next / zoom;
  panX = x - width / 2 - (x - width / 2 - panX) * ratio;
  panY = y - height / 2 - (y - height / 2 - panY) * ratio;
  zoom = next; requestDraw();
}

function pick(x, y) {
  let found = null, best = Infinity;
  for (const seat of filtered) {
    const p = point(seat), size = dimensions(seat), dx = Math.abs(x - p.x), dy = Math.abs(y - p.y);
    if (dx > Math.max(5, size.w / 2) || dy > Math.max(5, size.h / 2)) continue;
    // 個別席先於涵蓋它的群像區；同級取離中心最近者。
    const score = (isGroup(seat) ? 1e8 : 0) + dx * dx + dy * dy;
    if (score < best) { found = seat; best = score; }
  }
  if (found) selectSeat(found);
}

let drag = null;
canvas.addEventListener('pointerdown', event => {
  if (event.button !== 0) return;
  drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, y: event.clientY, distance: 0 };
  canvas.setPointerCapture(event.pointerId); canvas.classList.add('dragging');
});
canvas.addEventListener('pointermove', event => {
  if (!drag || drag.id !== event.pointerId) return;
  panX += event.clientX - drag.x; panY += event.clientY - drag.y;
  drag.x = event.clientX; drag.y = event.clientY; drag.distance = Math.max(drag.distance, Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY)); requestDraw();
});
canvas.addEventListener('pointerup', event => {
  if (!drag || drag.id !== event.pointerId) return;
  if (drag.distance < 6) { const rect = canvas.getBoundingClientRect(); pick(event.clientX - rect.left, event.clientY - rect.top); }
  drag = null; canvas.classList.remove('dragging');
});
canvas.addEventListener('pointercancel', () => { drag = null; canvas.classList.remove('dragging'); });
canvas.addEventListener('wheel', event => { event.preventDefault(); const rect = canvas.getBoundingClientRect(); zoomAt(Math.exp(-event.deltaY * 0.0015), event.clientX - rect.left, event.clientY - rect.top); }, { passive: false });
canvas.addEventListener('keydown', event => {
  if (['+', '=', '-', '0', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) event.preventDefault();
  if (event.key === '+' || event.key === '=') zoomAt(1.35);
  else if (event.key === '-') zoomAt(1 / 1.35);
  else if (event.key === '0') fit();
  else if (event.key.startsWith('Arrow')) {
    if (event.key === 'ArrowLeft') panX += 35;
    if (event.key === 'ArrowRight') panX -= 35;
    if (event.key === 'ArrowUp') panY += 35;
    if (event.key === 'ArrowDown') panY -= 35;
    requestDraw();
  }
});
$('seat-list').addEventListener('keydown', event => {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
  const buttons = [...$('seat-list').querySelectorAll('button')], at = buttons.indexOf(event.target);
  if (at < 0) return;
  event.preventDefault();
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : Math.max(0, Math.min(buttons.length - 1, at + (event.key === 'ArrowDown' ? 1 : -1)));
  buttons[next]?.focus();
});
for (const b of document.querySelectorAll('[data-realm]')) b.addEventListener('click', () => setRealm(b.dataset.realm));
for (const b of document.querySelectorAll('[data-lang]')) b.addEventListener('click', () => { lang = b.dataset.lang; try { localStorage.setItem('mandala-lang', lang); } catch { /* optional */ } applyLanguage(); });
$('seat-search').addEventListener('input', applyFilters); $('location-filter').addEventListener('change', applyFilters);
$('more-seats').addEventListener('click', () => { limit += 60; updateList(); });
$('zoom-in').addEventListener('click', () => zoomAt(1.4)); $('zoom-out').addEventListener('click', () => zoomAt(1 / 1.4)); $('fit-view').addEventListener('click', fit);
$('edition-source').href = MANDALA_EDITION.templeUrl; $('catalogue-source').href = MANDALA_EDITION.catalogueUrl;
new ResizeObserver(() => {
  const previousScale = baseScale();
  const rect = $('canvas-wrap').getBoundingClientRect(); width = rect.width; height = rect.height;
  // Pan 以螢幕像素保存；視口改尺寸時同率換算，保留圖本上的視心。
  const ratio = baseScale() / previousScale; panX *= ratio; panY *= ratio;
  const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); requestDraw();
}).observe($('canvas-wrap'));
applyLanguage(); setRealm(realm);
