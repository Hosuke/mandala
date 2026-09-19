// 依書現圖／西院初錄：席位獨立於 canonical deity；畫布只收程序筆，不收參照圖片。
import { TAIZO_SEATS } from './data/saiin-taizo.js';
import { KONGO_SEATS } from './data/saiin-kongo.js';
import { MANDALA_EDITION, SAIIN_EDITION } from './data/edition.js';
import { BOOK_SEATS, bookCitation } from './data/book-catalog.js';
import { BOOK_KONGO_ORNAMENTS } from './data/book-kongo.js';
import { drawBookSeat, drawBookAttribute } from './book-drawing.js';
import { COURTS, ASSEMBLIES } from './data/courts.js';
import { COURT_EN, ASM_EN } from './data/i18n.js';
import { drawSaiinSeat } from './saiin-drawing.js';

const bookMode = document.body.dataset.edition === 'book';

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
Object.assign(OBSERVATION_LABELS.zh, { monk: '僧相', flying: '飛行', 'half-body': '半身承托' });
Object.assign(OBSERVATION_LABELS.en, { monk: 'Monastic figure', flying: 'Flying', 'half-body': 'Supporting half-figure' });
Object.assign(OBSERVATION_LABELS.ja, { monk: '僧形', flying: '飛行', 'half-body': '半身で支える像' });
const BOOK_TEXT = {
  zh: { title: '金胎不二 · 兩界現圖', back: '形變演示 →', notice: '依《曼荼羅之研究》上下冊校正。點選尊位可查尊名、形相與書頁出典。',
    pending: '書據已核對', 'text-attested': '書載名位', legend: '尊形 · 標幟 · 點選查出典',
    sourceNote: '栂尾祥雲原著、吳信如主編《曼荼羅之研究》，中國藏學出版社，2011 年 6 月。各席保留書據；程序造像的正式核定仍由人工。',
    temple: '校正記錄', catalogueSource: '西院照片初錄', coords: '圖式位置', observations: '依所列書頁校對；同名異院、異會分席記錄。',
    drawingPending: '依本席書載形相繪製。', partialDrawing: '僅繪已明部分；面臂或姿態缺項見下方記錄。', noDrawing: '本席先列書載名號；現有書圖未能確辨尊容。',
    placeholder: '檢索尊名、院會或書頁', counts: n => `書式席位 ${n}`, results: (n, g, shown) => `符合 ${n} 席；顯示 ${shown} 項`,
    source: '書頁出典', pdf: 'PDF 頁', right: '尊之右手', left: '尊之左手', mudra: '印相', color: '身色', mount: '乘座', alternative: '書內異說',
    drawing: '程序造像', detail: '逐尊查閱', catalogue: '諸尊名錄', intro: '點選圖中尊位，或依院會、尊名檢索。',
  },
  en: { title: 'Ryōbu Mandala · Sourced Diagram', back: 'Morphing study →', notice: 'Revised against The Study of Mandalas, Chinese edition, 2011. Select a seat for its identity, form and book references.',
    pending: 'Book references checked', 'text-attested': 'Book-attested', legend: 'Figures · Emblems · Select for sources',
    sourceNote: 'Toganoo Shōun, edited by Wu Xinru, The Study of Mandalas, China Tibetology Press, June 2011. Per-seat sources are recorded; procedural drawings retain a separate human iconographic approval stage.',
    temple: 'Revision record', catalogueSource: 'Saiin photo inventory', coords: 'Diagram position', observations: 'Checked against the cited pages. Repeated deities retain distinct seats.',
    drawingPending: 'Procedural drawing from the cited attributes.', partialDrawing: 'Only established features are drawn; unresolved anatomy is recorded below.', noDrawing: 'Book-attested name; the available plates do not resolve the figure.',
    placeholder: 'Search names, locations or pages', counts: n => `${n} book-diagram seats`, results: (n, g, shown) => `${n} matches; showing ${shown}`,
    source: 'Book reference', pdf: 'PDF page', right: 'Deity’s right', left: 'Deity’s left', mudra: 'Gesture', color: 'Body colour', mount: 'Mount', alternative: 'Source variants',
    drawing: 'Drawing', detail: 'Inspect a deity', catalogue: 'Deity catalogue', intro: 'Select a seat or search by name or assembly.',
  },
  ja: { title: '金胎不二 · 両界現図', back: '形変の展示 →', notice: '『曼荼羅之研究』上下巻（2011年中国語版）により校正。尊位を選ぶと尊名・形相・出典頁を確認できます。',
    pending: '書籍の根拠を照合済み', 'text-attested': '書載の名位', legend: '尊形 · 標幟 · 選択して出典を確認',
    sourceNote: '栂尾祥雲原著・呉信如主編『曼荼羅之研究』、中国蔵学出版社、2011年6月。各席に書籍の根拠を記録。描画の正式な図像学的確定は別途、人が行います。',
    temple: '校正記録', catalogueSource: '西院写真の初録', coords: '図式の位置', observations: '記載の書籍頁と照合。同名でも院・会が違う尊は別席として記録。',
    drawingPending: '本席の記述に基づく描画。', partialDrawing: '確認できた形のみ描画。面臂・姿態の未詳箇所は下記に記録。', noDrawing: '書載の尊名を表示。手元の図版では尊容を確定できません。',
    placeholder: '尊名・院会・書籍頁を検索', counts: n => `書式の席位 ${n}`, results: (n, g, shown) => `該当 ${n} 席；${shown} 件表示`,
    source: '書籍の出典', pdf: 'PDF頁', right: '尊の右手', left: '尊の左手', mudra: '印相', color: '身色', mount: '乗座', alternative: '書内の異説',
    drawing: '描画', detail: '諸尊を確認', catalogue: '諸尊目録', intro: '尊位を選ぶか、院会・尊名で検索してください。',
  },
};
if (bookMode) for (const lang of Object.keys(TEXT)) Object.assign(TEXT[lang], BOOK_TEXT[lang]);
const ALL = bookMode ? BOOK_SEATS : { t: TAIZO_SEATS, k: KONGO_SEATS };
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
const searchText = seat => [seat.name, seat.seatId, seat.canonicalId, groupOf(seat), seat.note, bookMode && bookCitation(seat)].filter(Boolean).join(' ').toLocaleLowerCase();
const baseScale = () => Math.max(1, Math.min((width - 46) / IMAGE_RATIO[realm], height - 76));
const point = seat => ({ x: width / 2 + panX + (seat.u - 0.5) * IMAGE_RATIO[realm] * baseScale() * zoom,
  y: height / 2 + panY + (seat.v - 0.5) * baseScale() * zoom });
const dimensions = seat => ({ w: seat.w * IMAGE_RATIO[realm] * baseScale() * zoom, h: seat.h * baseScale() * zoom });

function drawBookFrame(left, top, iw, scale) {
  ctx.save(); ctx.strokeStyle = '#a385493d'; ctx.fillStyle = '#cdb683'; ctx.lineWidth = .8;
  const groups = new Map();
  for (const s of ALL[realm]) {
    const key = groupOf(s); if (key === 'gekongobu') continue;
    if (!groups.has(key)) groups.set(key, []); groups.get(key).push(s);
  }
  for (const [key, seats] of groups) {
    let l, r, t, b;
    if (realm === 'k') {
      const a = ASSEMBLIES.find(a => a.key === key); if (!a) continue;
      l = a.grid[0] / 3 + .008; r = (a.grid[0] + 1) / 3 - .008;
      t = a.grid[1] / 3 + .008; b = (a.grid[1] + 1) / 3 - .008;
    } else {
      l = Math.min(...seats.map(s => s.u - s.w / 2)) - .006;
      r = Math.max(...seats.map(s => s.u + s.w / 2)) + .006;
      t = Math.min(...seats.map(s => s.v - s.h / 2)) - .006;
      b = Math.max(...seats.map(s => s.v + s.h / 2)) + .006;
    }
    ctx.strokeRect(left + l * iw, top + t * scale, (r - l) * iw, (b - t) * scale);
    ctx.font = `${Math.max(9, Math.min(13, 10 * zoom))}px serif`; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText(locationLabel(key), left + l * iw + 5, top + t * scale + 3);
  }
  if (realm === 'k') for (const ornament of BOOK_KONGO_ORNAMENTS) {
    ctx.save(); ctx.translate(left + ornament.u * iw, top + ornament.v * scale);
    drawBookAttribute(ctx, ornament.attributes[0], 0, 0, scale * .009);
    ctx.restore();
  }
  ctx.font = '11px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  const dirs = realm === 't' ? ['東', '南', '西', '北'] : ['西', '北', '東', '南'];
  [[left + iw / 2, top - 13], [left + iw + 13, top + scale / 2], [left + iw / 2, top + scale + 13], [left - 13, top + scale / 2]].forEach(([x, y], i) => ctx.fillText(dirs[i], x, y));
  ctx.restore();
}

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
  if (bookMode) drawBookFrame(left, top, iw, scale);
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
        const result = bookMode ? drawBookSeat(ctx, seat, radius * 1.15) : drawSaiinSeat(ctx, seat, radius);
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
  const visibleHeads = observation.visibleHeads ? (lang === 'en' ? `${observation.visibleHeads} visible` : lang === 'ja' ? `可視 ${observation.visibleHeads}` : `可見 ${observation.visibleHeads}`) : '?';
  if (!isGroup(s)) add(t.limbs, `${observation.heads ?? visibleHeads} / ${observation.arms ?? '?'}`);
  const drawing = drawingNotes.get(s.seatId);
  add(t.drawing, bookMode ? (drawing?.kind === 'name' ? t.noDrawing : drawing?.kind === 'partial' ? t.partialDrawing : t.drawingPending) : (isGroup(s) ? t.groupNote : (drawing?.note || (s.identityStatus === 'unidentified' ? t.noDrawing : t.drawingPending))));
  if (bookMode) {
    add(t.source, bookCitation(s));
    if (s.source?.pdfPage) add(t.pdf, String(s.source.pdfPage));
    const referenceText = source => source ? `${source.volume || s.source.volume} · ${source.page ? `p${source.page}` : source.plate || ''} · PDF ${source.pdfPage ?? '—'}` : '';
    if (s.layoutSource) add(lang === 'en' ? 'Position source' : lang === 'ja' ? '坐次の出典' : '坐次書據', referenceText(s.layoutSource));
    if (s.iconographySource) add(lang === 'en' ? 'Form source' : lang === 'ja' ? '形相の出典' : '形相書據', referenceText(s.iconographySource));
    if (s.figureSource) add(lang === 'en' ? 'Figure plate' : lang === 'ja' ? '尊容図' : '尊容圖頁', referenceText(s.figureSource));
    const plates = [...new Set([...(s.visualSources || []), ...(s.additionalIconographySources || [])].map(referenceText))];
    if (plates.length) add(lang === 'en' ? 'Colour plates' : lang === 'ja' ? '巻頭図版' : '卷首圖版', plates.join('；'));
    for (const [key, label] of [['rightHand', t.right], ['leftHand', t.left], ['mudra', t.mudra], ['color', t.color], ['mount', t.mount]]) if (observation[key]) add(label, String(observation[key]));
    if (s.alternativeNames) add(t.alternative, Array.isArray(s.alternativeNames) ? s.alternativeNames.join('、') : String(s.alternativeNames));
  }
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
  if (bookMode) {
    const preview = document.createElement('canvas'); preview.width = 440; preview.height = 400; preview.className = 'figure-preview';
    preview.setAttribute('aria-label', s.name); const pc = preview.getContext('2d'); pc.translate(220, 190);
    drawBookSeat(pc, s, 165); $('detail-content').prepend(preview);
  }
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
  if (matchMedia('(min-width: 801px)').matches) document.querySelector('.review-panel').scrollTop = 0;
  for (const button of $('seat-list').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.seatId === seat.seatId));
}

function updateList() {
  const t = text(), list = $('seat-list'); list.replaceChildren();
  for (const seat of filtered.slice(0, limit)) {
    const button = document.createElement('button'); button.className = 'seat-button'; button.dataset.seatId = seat.seatId;
    button.setAttribute('aria-pressed', String(selected?.seatId === seat.seatId));
    const status = document.createElement('span'); status.className = 'seat-type'; status.textContent = t[seat.identityStatus] || t.unidentified;
    const title = document.createElement('span'); title.textContent = currentLabel(seat);
    const id = document.createElement('span'); id.className = 'seat-id'; id.textContent = bookMode ? bookCitation(seat) : seat.seatId;
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
  if (matchMedia('(min-width: 801px)').matches) document.querySelector('.review-panel').scrollTop = 0;
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
$('edition-source').href = bookMode ? MANDALA_EDITION.catalogueUrl : SAIIN_EDITION.templeUrl;
$('catalogue-source').href = bookMode ? 'saiin.html' : SAIIN_EDITION.catalogueUrl;
if (bookMode) $('back-link').href = 'engine.html';
new ResizeObserver(() => {
  const previousScale = baseScale();
  const rect = $('canvas-wrap').getBoundingClientRect(); width = rect.width; height = rect.height;
  // Pan 以螢幕像素保存；視口改尺寸時同率換算，保留圖本上的視心。
  const ratio = baseScale() / previousScale; panX *= ratio; panY *= ratio;
  const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr); draw();
}).observe($('canvas-wrap'));
applyLanguage(); setRealm(realm);
