// 東寺西院本・金剛界：機助讀圖的席位草稿（2026-09-20），全筆待人工覆核。
// 圖像基準：File:Kongokai.jpg，3125×3567；已與 TNM 2019 官方同本圖交叉。
// 像心以原圖像素量取；小月輪的等距座標是圖像行列的近似，不是經文坐次。
// 候選名依既有三十七尊／理趣結構對照，非從模糊小像讀出名號。
// 觀圖方位：金剛上西、下東、左南、右北；不可套胎藏上東的方位。
// 交叉文字：https://www.mikkyo21f.gr.jp/mandala/mandala_kongoukai/05.html（東＝下）。
// 千佛帶只列可重尋的四個區域；不生成 1000 個假坐標、不套千佛經序。
import { byId } from './deities.js';

const W = 3125, H = 3567;
const seats = [];
const ASM = {
  jojin: '成身會', sammaya: '三昧耶會', misai: '微細會', kuyo: '供養會',
  shiin: '四印會', ichiin: '一印會', rishu: '理趣會',
  gozanze: '降三世會', 'gozanze-s': '降三世三昧耶會',
};
const SOURCE = 'https://commons.wikimedia.org/wiki/File:Kongokai.jpg';
const CANDIDATE_NOTE = '位置取原圖月輪中心近似；尊名依通行院會結構作候選，印相、持物及西院本逐尊身份尚待覆核。';
const body = (kind = 'bodhisattva', arms = 2) => ({ kind, heads: 1, arms, pose: 'seated', attributes: [] });
const symbol = (attributes = []) => ({ kind: 'symbol', heads: null, arms: null, pose: 'unknown', attributes });
const unknown = () => ({ kind: 'unknown', heads: null, arms: null, pose: 'unknown', attributes: [] });

function add(assembly, key, x, y, width, height, options = {}) {
  const id = options.canonicalId ?? null;
  const name = options.name ?? byId[id]?.k?.zh ?? '未辨尊';
  seats.push({
    seatId: `k:${assembly}:${key}`, realm: 'k', side: 'k', assembly,
    name, canonicalId: id, u: x / W, v: y / H, w: width / W, h: height / H,
    observation: options.observation ?? unknown(),
    identityStatus: options.identityStatus ?? (id ? 'candidate' : 'unidentified'),
    positionStatus: 'draft', reviewStatus: 'pending',
    evidence: 'saiin-kongo-commons', sourceUrl: SOURCE,
    form: options.form ?? 'figure',
    note: options.note ?? CANDIDATE_NOTE,
    ...options,
  });
}

// 每會各自量取中心、月輪距及圈外帶；不把原引擎的圓周坐標當作圖版坐標。
const PANELS = [
  { key: 'jojin', cx: 1565, cy: 1790, dx: 222, dy: 214, rx: 73, ry: 72,
    ring: [1187, 1374, 1945, 2225], outer: [1125, 1280, 2000, 2310] },
  { key: 'kuyo', cx: 590, cy: 1800, dx: 219, dy: 215, rx: 73, ry: 73,
    ring: [210, 1390, 970, 2230], outer: [125, 1278, 1030, 2325] },
  { key: 'gozanze', cx: 2537, cy: 1785, dx: 219, dy: 215, rx: 73, ry: 72,
    ring: [2163, 1380, 2915, 2220], outer: [2085, 1270, 2992, 2310] },
  { key: 'misai', cx: 595, cy: 2930, dx: 220, dy: 215, rx: 73, ry: 72,
    ring: [215, 2520, 970, 3350], outer: [125, 2418, 1030, 3450] },
  { key: 'sammaya', cx: 1573, cy: 2913, dx: 220, dy: 216, rx: 73, ry: 70,
    ring: [1195, 2500, 1942, 3335], outer: [1110, 2400, 2010, 3440] },
  { key: 'gozanze-s', cx: 2546, cy: 2910, dx: 220, dy: 215, rx: 71, ry: 70,
    ring: [2160, 2490, 2930, 3330], outer: [2090, 2398, 3000, 3435] },
];
const MOONS = [
  { key: 'center', ids: ['center', 'p-kon', 'p-ho', 'p-hou', 'p-katsu'], offset: [0, 0] },
  { key: 'east', ids: ['east', 'fugen', 'k-o', 'k-ai', 'k-ki'], offset: [0, 1] },
  { key: 'south', ids: ['south', 'kokuzo', 'k-ko', 'k-do', 'k-sho'], offset: [-1, 0] },
  { key: 'west', ids: ['west', 'kannon', 'monju', 'miroku', 'k-go'], offset: [0, -1] },
  { key: 'north', ids: ['north', 'k-gyo', 'k-gou', 'k-ge', 'k-ken'], offset: [1, 0] },
];
const DIRECTIONS = ['上', '左', '下', '右'];
const CORNERS = ['左上', '左下', '右下', '右上'];
const INNER = ['g-ki', 'g-man', 'g-ka', 'g-bu'];
const OUTER = ['g-ko', 'g-ke', 'g-to', 'g-zu'];
const GATES = ['s-ko', 's-saku', 's-sa', 's-rei'];
const cornerPoints = ([l, t, r, b]) => [[l, t], [l, b], [r, b], [r, t]];
const ritualCorners = bounds => { const c = cornerPoints(bounds); return [c[1], c[0], c[3], c[2]]; }; // 東南、西南、西北、東北
const edgePoint = ([l, t, r, b], edge, fraction) => [
  [l + (r - l) * fraction, t], [l, t + (b - t) * fraction],
  [l + (r - l) * fraction, b], [r, t + (b - t) * fraction],
][edge];

for (const p of PANELS) {
  const samaya = p.key === 'sammaya' || p.key === 'gozanze-s';
  const form = samaya ? 'samaya' : 'figure';
  // 降三世會雖見像身，褪損小像不足逐數面臂；不可按其它會一律推二臂坐相。
  const panelBody = (...args) => p.key === 'gozanze' ? unknown() : body(...args);
  for (const m of MOONS) {
    const [mx, my] = [p.cx + m.offset[0] * p.dx, p.cy + m.offset[1] * p.dy];
    // 中月輪四波羅蜜在原圖呈四正；此與節選引擎保留的斜位不同。
    const offsets = m.key === 'center' ? [[0, 0], [0, 1], [-1, 0], [0, -1], [1, 0]]
      : m.key === 'east' ? [[0, 0], [0, -1], [1, 0], [-1, 0], [0, 1]]
      : m.key === 'south' ? [[0, 0], [1, 0], [0, 1], [0, -1], [-1, 0]]
      : m.key === 'west' ? [[0, 0], [0, 1], [-1, 0], [1, 0], [0, -1]]
      : [[0, 0], [-1, 0], [0, -1], [0, 1], [1, 0]];
    m.ids.forEach((id, i) => {
      const gozanze = p.key.startsWith('gozanze') && id === 'fugen';
      add(p.key, `${m.key}-${i}`, mx + offsets[i][0] * p.rx, my + offsets[i][1] * p.ry, 62, 73, {
        canonicalId: gozanze ? null : id,
        ...(gozanze ? { name: '降三世明王（候選）', identityStatus: 'candidate' } : {}),
        observation: samaya ? symbol() : gozanze ? unknown() : panelBody(i === 0 ? 'buddha' : 'bodhisattva'),
        form,
        note: gozanze ? '此為通行降三世會薩埵的置換候選位；本圖小像的多面、多臂細節未辨清，未借用靜相薩埵筆。' : CANDIDATE_NOTE,
      });
    });
  }
  const diagonals = ritualCorners([p.cx - 198, p.cy - 184, p.cx + 198, p.cy + 184]);
  diagonals.forEach(([x, y], i) => add(p.key, `inner-offering-${i}`, x, y, 90, 110, {
    canonicalId: INNER[i], observation: samaya ? symbol() : panelBody(), form,
  }));
  ritualCorners(p.ring).forEach(([x, y], i) => add(p.key, `outer-offering-${i}`, x, y, 69, 85, {
    canonicalId: OUTER[i], observation: samaya ? symbol() : panelBody(), form,
  }));
  for (let edge = 0; edge < 4; edge++) {
    const [gx, gy] = edgePoint(p.ring, edge, .5);
    add(p.key, `gate-${edge}`, gx, gy, 72, 86, {
      canonicalId: GATES[[2, 1, 0, 3][edge]], observation: samaya ? symbol() : panelBody(), form,
    });
    if (p.key !== 'jojin') {
      // 周帶每邊七月輪（兩角、正中與四間位）；角與中門已上列。
      [.165, .335, .665, .835].forEach((f, i) => {
        const [x, y] = edgePoint(p.ring, edge, f);
        add(p.key, `inner-border-${edge}-${i}`, x, y, 68, 82, {
          name: `${ASM[p.key]}內周尊・${DIRECTIONS[edge]}${i + 1}（未辨名）`,
          observation: samaya ? symbol() : panelBody(), form,
          note: '原圖周帶可見獨立月輪；常說對應賢劫十六菩薩，但此席名號未逐一辨定。降三世小像面臂與坐立未明，僅標位；不由名錄次序配名。',
        });
      });
    }
    // 最外帶人物與火焰器形間列；本清單逐人身／對應主標幟記位，伴置圖案不重計。
    [.10, .30, .50, .70, .90].forEach((f, i) => {
      const [x, y] = edgePoint(p.outer, edge, f);
      add(p.key, `outer-border-${edge}-${i}`, x, y, 58, 72, {
        name: `${ASM[p.key]}外周尊・${DIRECTIONS[edge]}${i + 1}（未辨名）`,
        observation: samaya ? symbol() : unknown(), form,
        note: '圖版最外周的護世群像／標幟位置近似；個別獸首、面臂與持物未辨，未套用通用天人像。旁列器形暫併此位置，不另算尊數。',
      });
    });
  }
  if (p.key === 'jojin') {
    cornerPoints([p.cx - 264, p.cy - 310, p.cx + 264, p.cy + 315]).forEach(([x, y], i) => {
      add(p.key, `great-corner-${i}`, x, y, 105, 126, {
        name: `成身會四隅尊・${CORNERS[i]}（未辨名）`, observation: unknown(),
        note: '大圓外、千佛帶內之四隅可見特殊形像；可對照四大神組，個別身份及人獸形細節未定，不畫成一般菩薩。',
      });
    });
    const bands = [
      ['top', '上', 1565, 1380, 790, 78], ['bottom', '下', 1565, 2211, 790, 78],
      ['left', '左', 1190, 1800, 78, 745], ['right', '右', 1947, 1800, 78, 745],
    ];
    for (const [key, label, x, y, w, h] of bands) add(p.key, `thousand-${key}`, x, y, w, h, {
      name: `賢劫千佛帶・${label}（未逐尊展開）`, identityStatus: 'group', memberCount: null,
      observation: { kind: 'group', heads: null, arms: null, pose: 'unknown', attributes: [] },
      note: '圖上密集小像的群帶可定位；此解析度尚不足以可靠逐尊分席、辨名。此框是一個待核區域，不是一尊，亦不宣稱其中有250個已定位席。',
    });
  }
  if (p.key === 'gozanze') {
    [[2420, 1695], [2418, 1890], [2650, 1889], [2649, 1701]].forEach(([x, y], i) => {
      add(p.key, `central-corner-${i}`, x, y, 40, 42, {
        name: `降三世會中央隅位・${CORNERS[i]}（待辨）`, observation: unknown(),
        note: '中央方框的四隅小形；是否各為獨立尊位及其身份尚待原尺寸圖覆核，先列疑點，不憑通說77尊填名。',
      });
    });
  }
}

// 四印會：五大月輪人身、八火焰標幟；坐次分別取圖，不沿用主會的相別。
const shiinFigures = [
  ['center', 585, 660, 230, 255], ['kannon', 585, 404, 210, 232],
  ['kokuzo', 326, 654, 215, 247], ['fugen', 585, 941, 210, 232],
  ['k-gyo', 857, 651, 212, 245],
];
for (const [id, x, y, w, h] of shiinFigures) add('shiin', id, x, y, w, h, {
  canonicalId: id, observation: body('bodhisattva'),
});
const shiinSymbols = [
  ['p-ho', 368, 451], ['p-kon', 371, 901], ['p-katsu', 790, 901], ['p-hou', 790, 451],
  ['g-man', 260, 304], ['g-ki', 268, 1075], ['g-bu', 943, 1070], ['g-ka', 941, 302],
];
for (const [id, x, y] of shiinSymbols) add('shiin', id, x, y, 116, 150, {
  canonicalId: id, observation: symbol(['flame']), form: 'samaya',
  note: '圖版此處為火焰包圍的器形，非人身；僅描可見焰形，中央器物及候選尊名待覆核。',
});

// 一印會的周邊花葉屬莊嚴，此處僅列中央可辨大尊。
add('ichiin', 'center', 1558, 682, 505, 555, {
  canonicalId: 'center', observation: body('bodhisattva'),
  note: '原圖上中格單一巨大冠飾坐尊，雙手當胸；候選大日智拳印，細指相仍待核。',
});

const rishu = [
  ['fugen', 2525, 665], ['r-ai', 2525, 418], ['r-soku', 2310, 666],
  ['r-yoku', 2525, 907], ['r-man', 2740, 666],
  ['r-soku-nyo', 2310, 418], ['r-yoku-nyo', 2310, 909],
  ['r-man-nyo', 2740, 909], ['r-ai-nyo', 2740, 418],
];
for (const [id, x, y] of rishu) add('rishu', id, x, y, 163, 205, {
  canonicalId: id, observation: body('bodhisattva'),
  note: '理趣會內九大月輪的三行三列位置；欲觸愛慢與四女名號依通行方位暫配，未從衣色推定性別或種字。',
});
ritualCorners([2150, 257, 2910, 1086]).forEach(([x, y], i) => add('rishu', `offering-${i}`, x, y, 63, 79, {
  canonicalId: INNER[i], observation: unknown(),
  note: '理趣會花葉邊框四角的小月輪；四供養為候選，細尊形不能在此解析度判定。',
}));
for (let edge = 0; edge < 4; edge++) {
  const [x, y] = edgePoint([2150, 257, 2910, 1086], edge, .5);
  add('rishu', `gate-${edge}`, x, y, 63, 79, {
    canonicalId: GATES[[2, 1, 0, 3][edge]], observation: unknown(),
    note: '理趣會花葉邊框四邊中央小月輪；四攝為候選，未借成身會畫筆宣稱本幅已核。',
  });
}

export const KONGO_SEATS = seats;
