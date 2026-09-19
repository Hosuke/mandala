// 西院本待審席位：圖像觀察草圖與粉本參照形。此層不授予任何核定狀態。
// 不載圖、不讀 genten、不借跨界同名筆；未知者只畫空位標記。
import { 落筆, 器筆 } from './funpon.js';
import { byId } from './data/deities.js';
import { 白描 } from '../vendor/fenben/dist/baimiao.js';
import { 依號 } from '../vendor/fenben/dist/yigui.js';

// 兩鍵在隨附牒中皆「筆=true、信=待核、上壇=false」。不得只憑依號有面便
// 呼叫白描：不存在的專筆會退通形。本白名單應隨公開牒校驗，勿自動擴張。
const DRAFT_PENS = new Set(['miroku|t', 'k-go|k']);
const GOLD = '#c8a76c';

function line(ctx, points, close = false) {
  ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  if (close) ctx.closePath();
  ctx.stroke();
}

function oval(ctx, x, y, rx, ry) {
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();
}

function marker(ctx) {
  // 開口四角表示尚待讀圖；不以人身輪廓充數。
  for (const x of [-1, 1]) for (const y of [-1, 1]) {
    line(ctx, [[x * .13, y * .25], [x * .25, y * .25], [x * .25, y * .13]]);
  }
  line(ctx, [[-.025, 0], [.025, 0]]);
}

function attributeNames(attributes) {
  if (!Array.isArray(attributes)) return new Set();
  const aliases = { '五鈷杵': 'vajra5', '三鈷杵': 'vajra3', '蓮': 'lotus', '蓮華': 'lotus', '蓮花': 'lotus' };
  return new Set(attributes.map(a => typeof a === 'string' ? a : a?.kind || a?.name)
    .filter(a => typeof a === 'string').map(a => aliases[a] || a.toLowerCase()));
}

function symbolSketch(ctx, attributes) {
  const a = attributeNames(attributes);
  const has = (...names) => names.some(name => a.has(name));
  let drawn = false;
  if (has('triangle', '三角', '三角形')) {
    line(ctx, [[0, -.43], [-.4, .29], [.4, .29]], true);
    drawn = true;
  }
  if (has('lotus', '蓮', '蓮華', '蓮花')) {
    for (const x of [-.25, 0, .25]) {
      ctx.beginPath();
      ctx.moveTo(0, .29);
      ctx.quadraticCurveTo(x - .23, .03, x, -.27);
      ctx.quadraticCurveTo(x + .23, .03, 0, .29);
      ctx.stroke();
    }
    drawn = true;
  }
  if (has('vajra', 'vajra3', 'vajra5', '金剛杵', '杵')) {
    // 只示杵形軸與兩端，不猜鈷數。
    line(ctx, [[0, -.19], [0, .19]]);
    oval(ctx, 0, 0, .055, .10);
    for (const y of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(0, y * .19);
      ctx.quadraticCurveTo(-.17, y * .31, 0, y * .48);
      ctx.quadraticCurveTo(.17, y * .31, 0, y * .19);
      ctx.stroke();
    }
    drawn = true;
  }
  if (has('flame', '火焰', '焰', '火炎')) {
    for (const x of [-.42, 0, .42]) {
      ctx.beginPath();
      ctx.moveTo(x - .10, .48);
      ctx.bezierCurveTo(x - .26, .15, x + .12, .12, x + .03, -.36);
      ctx.bezierCurveTo(x + .24, -.07, x + .12, .20, x + .10, .48);
      ctx.stroke();
    }
    drawn = true;
  }
  return drawn;
}

function bodySketch(ctx, observation) {
  const { heads, arms, pose } = observation;
  // 未能讀出的數目不推定為一面二臂；數目過大亦不截斷後冒充完整像。
  if (!Number.isInteger(heads) || heads < 1 || heads > 32 ||
      !Number.isInteger(arms) || arms < 0 || arms > 64 ||
      !['seated', 'standing'].includes(pose)) return false;

  // 輪廓僅為計數／姿態筆記：面列與臂位採均分示意，非原圖坐標或印契。
  const rows = Math.ceil(heads / 5), headR = Math.min(.105, .29 / rows);
  let remaining = heads;
  for (let row = 0; row < rows; row++) {
    const count = Math.min(5, remaining);
    for (let col = 0; col < count; col++) {
      oval(ctx, (col - (count - 1) / 2) * headR * 2.25,
        -.27 - row * headR * 2.15, headR, headR * 1.15);
    }
    remaining -= count;
  }
  line(ctx, [[-.07, -.13], [-.20, -.08], [-.15, .20], [.15, .20], [.20, -.08], [.07, -.13]]);
  for (let arm = 0; arm < arms; arm++) {
    const side = arm % 2 === 0 ? -1 : 1;
    const rank = Math.floor(arm / 2), onSide = Math.ceil((arms - (side === 1 ? 1 : 0)) / 2);
    const angle = onSide < 2 ? .24 : -.80 + rank / (onSide - 1) * 1.65;
    const endX = side * (.22 + Math.cos(angle) * .30);
    const endY = -.03 + Math.sin(angle) * .34;
    line(ctx, [[side * .19, -.06], [side * .32, (endY - .03) / 2], [endX, endY]]);
  }
  if (pose === 'seated') {
    line(ctx, [[-.15, .20], [-.38, .37], [-.40, .47], [0, .51], [.40, .47], [.38, .37], [.15, .20]]);
    line(ctx, [[-.32, .41], [0, .45], [.32, .41]]);
  } else {
    line(ctx, [[-.15, .20], [-.12, .40], [-.15, .65], [-.25, .67]]);
    line(ctx, [[.15, .20], [.12, .40], [.15, .65], [.25, .67]]);
  }
  return true;
}

function compatible(face, observation) {
  if (!face) return false;
  // 一般粉本雖非本幅描摹，亦不借用與已讀面臂數／立坐直接相反者。
  if (Number.isInteger(observation.heads) && face.面臂?.面 !== observation.heads) return false;
  if (Number.isInteger(observation.arms) && face.面臂?.臂 !== observation.arms) return false;
  if (observation.pose === 'standing' && !/立像|立相/.test(face.座 || '')) return false;
  if (observation.pose === 'seated' && /立像|立相/.test(face.座 || '')) return false;
  return true;
}

/**
 * 原點在席位中心；radius 為席位半徑。回值只供待審圖說明，絕非核定標記。
 * unknown 觀察、缺數目或缺坐立資料不補猜；種字亦不由此產生。
 */
export function drawSaiinSeat(ctx, seat, radius) {
  if (!Number.isFinite(radius) || radius <= 0) {
    return { kind: 'unknown', note: '席位尺寸無效，未落筆。' };
  }
  const observation = seat?.observation;
  const unknown = note => ({ kind: 'unknown', note });
  if (observation?.kind === 'group') {
    return unknown('群像尚未逐尊判讀；僅由圖面標出群像區域，不推算尊數或逐尊像容。');
  }
  ctx.save();
  try {
    ctx.strokeStyle = GOLD;
    ctx.fillStyle = GOLD;
    ctx.lineWidth = Math.max(.6, radius * .019);
    ctx.lineCap = 'round';
    if (!observation || observation.kind === 'unknown') {
      ctx.scale(radius, radius);
      ctx.lineWidth /= radius;
      marker(ctx);
      return unknown('尊形尚未讀出；僅標席位，不推定面臂、姿態或印契。');
    }

    const side = seat.side || seat.realm;
    const canonicalId = typeof seat.canonicalId === 'string' ? seat.canonicalId : null;
    const isFigure = !seat.form || seat.form === 'figure';
    // 只有明確讀出、且與候選尊標幟鍵相合者才借器筆；「似有物」不算辨明。
    if (seat.form === 'samaya' && observation.kind === 'symbol' && side === 'k' &&
        canonicalId && attributeNames(observation.attributes).has(byId[canonicalId]?.samaya) &&
        器筆(ctx, radius, canonicalId)) {
      return { kind: 'reference', note: '依已辨標幟借既有器筆參照；西院本的細節、坐次與尊名仍待人工覆核。' };
    }
    if (isFigure && ['buddha', 'bodhisattva', 'wrath'].includes(observation.kind) &&
        (side === 't' || side === 'k')) {
      const face = canonicalId && 依號[canonicalId]?.[side];
      if (compatible(face, observation) && 落筆(ctx, radius, canonicalId, side)) {
        return { kind: 'reference', note: '既有同界專筆參照形；西院本的尊名、坐次與像容仍待人工覆核。' };
      }
      const key = seat.draftDrawingKey || (canonicalId ? `${canonicalId}|${side}` : null);
      if (DRAFT_PENS.has(key)) {
        const [id, keySide] = key.split('|');
        const draftFace = 依號[id]?.[keySide];
        if (keySide === side && (!canonicalId || id === canonicalId) && compatible(draftFace, observation)) {
          白描(ctx, radius, draftFace, key);
          const issue = key === 'miroku|t' ? '瓶蓮與左手印相有異說' : '右手持鈴或如來舌有異說';
          return { kind: 'draft', note: `既有待核專筆：${issue}；非西院本核定像，須人工覆核。` };
        }
      }
    }

    ctx.scale(radius, radius);
    ctx.lineWidth /= radius;
    if (observation.kind === 'symbol' || seat.form === 'samaya') {
      if (symbolSketch(ctx, observation.attributes)) {
        return { kind: 'draft', note: '依可見屬性作符號草圖；細節、鈷數與尊名尚待覆核。' };
      }
      marker(ctx);
      return unknown('符號形制未明；僅標席位，不代填持物或種字。');
    }
    if (isFigure && ['buddha', 'bodhisattva', 'wrath'].includes(observation.kind) && bodySketch(ctx, observation)) {
      return { kind: 'draft', note: '依觀察面臂數及坐立作姿態草圖；面列與臂位均為計數示意，未畫印契、持物或宗教定形。' };
    }
    marker(ctx);
    return unknown('面臂數、坐立或圖像形式未明；暫留席位，待讀圖覆核。');
  } finally {
    ctx.restore();
  }
}
