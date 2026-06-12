// ─────────────────────────────────────────────────────────────────────────────
// 講堂層 · The Kōdō Layer（東寺講堂 · 立體曼荼羅 · 羯磨曼荼羅之證）
//
// 空海以二十一尊重編兩界千餘尊：中壇五智如來（自性輪身），東壇五大菩薩
// （正法輪身），西壇五大明王（教令輪身），四天王鎮四隅，梵釋鎮兩端。
// 三輪身者，同一智之三現——非三尊也，一尊之三用也。
//
// ── 尊位考（據實地配置，諸源相合）──────────────────────────────────────────
// 堂南面，觀者面北：向かって右＝東。考於：
//   · touji-ennichi.com 講堂立体曼荼羅CMAP（配置圖之 image-map 座標，逐尊可驗）
//   · butsuzolink.com/toji/（持国＝東南隅、増長＝西南隅、広目＝北西隅）
//   · toji.or.jp/mandala/ 並 wanderkokuho.com/201-00247/
// 所得：
//   四天王：持國天＝東南隅 · 增長天＝西南隅 · 廣目天＝西北隅 · 多聞天＝東北隅
//     ——即經典護方（持國東・增長南・廣目西・多聞北）各自其方而斜入隅位，
//     諸源於此一致，無相違者。
//   兩端：梵天＝東端（向かって右）· 帝釋天＝西端。CMAP 座標（taishktn x=80 西、
//     bonten x=420 東）與 wanderkokuho「向かって右に梵天、左に帝釈天」相合。
//     按：帝釋於十二天本護東方，講堂乃置於西端——蓋與梵天對舉成雙，
//     非依護方也；又諸像歷代有移座，今從現行配置。
//   五壇之斜：CMAP 明記「五智如來・五菩薩は実際の北西方向を北として、
//     五大明王・天部は実際の北東を北として配置」——故三組五尊皆成斜十字
//     （quincunx），四眷屬居其主之四隅。如來・菩薩二壇曼荼羅北轉向實西北，
//     明王壇北轉向實東北，左右相鏡。本檔座標即依此。
//
// 座標系：east = +x，south = +z，原點＝壇心（大日）。壇約 56（x）× 20（z）。
// ─────────────────────────────────────────────────────────────────────────────

// ══ 本圖所缺之四尊（kodoOnly）══════════════════════════════════════════════
// 三昧耶形考：
//   金剛夜叉＝五鈷鈴（通行本所載其三摩耶形即五鈷鈴，故取 'bell'；
//     或說金剛牙，此從鈴）。種字 hūṃ（ウン），通行。
//   持國天＝刀（'sword'）。種字 dhṛ（ヂリ），通行。
//   增長天＝戟，圖庫無戟，取 'staff'（最近之長柄器仗）。種字 vi（ビ），通行。
//   廣目天＝羂索（'rope'，其手所持，正合）。種字 vi（ビ），通行——
//     與增長天同字，非誤，二天通行種字俱作 vi。
export const NEW_DEITIES = [
  {
    id: 'kongoyasha', family: 'kongo', samaya: 'bell', kodoOnly: true,
    zh: '金剛夜叉明王', sk: 'Vajrayakṣa', bija: 'hūṃ',
    desc: '不空成就之教令輪身。五眼洞照，五鈷鈴驚覺，啖盡一切穢惡而化之為淨。',
    descEn: 'Command wheel-body of Amoghasiddhi. Five-eyed, he startles the world awake with the five-pronged bell, and devours every defilement — what he devours is purified.',
    descJa: '不空成就の教令輪身なり。五眼あまねく照らし、五鈷鈴もて驚覚せしめ、一切の穢悪を啖ひ尽くして浄に化す。',
  },
  {
    id: 'jikoku', family: 'ten', samaya: 'sword', kodoOnly: true,
    zh: '持國天', sk: 'Dhṛtarāṣṭra', bija: 'dhṛ',
    desc: '東方護世，持國土而安生民。講堂立於壇之東南隅。',
    descEn: 'Guardian of the east, upholder of the realm and its people. In the Kōdō he stands at the southeast corner of the dais.',
    descJa: '東方の護世、国土を持して生民を安んず。講堂にては壇の東南の隅に立つ。',
  },
  {
    id: 'zocho', family: 'ten', samaya: 'staff', kodoOnly: true,
    zh: '增長天', sk: 'Virūḍhaka', bija: 'vi',
    desc: '南方護世，令眾生善根增長。講堂立於壇之西南隅。',
    descEn: 'Guardian of the south, who makes the roots of virtue grow. He stands at the southwest corner of the dais.',
    descJa: '南方の護世、衆生の善根をして増長せしむ。壇の西南の隅に立つ。',
  },
  {
    id: 'komoku', family: 'ten', samaya: 'rope', kodoOnly: true,
    zh: '廣目天', sk: 'Virūpākṣa', bija: 'vi',
    desc: '西方護世，淨天眼遍觀世間，羂索繫諸不善。講堂立於壇之西北隅。',
    descEn: 'Guardian of the west: with the pure divine eye he watches the world, and binds the unwholesome with his rope. He stands at the northwest corner of the dais.',
    descJa: '西方の護世、浄天眼もて世間を遍く観、羂索もて不善を繋ぐ。壇の西北の隅に立つ。',
  },
];

// ══ 三輪身之表 ═══════════════════════════════════════════════════════════════
// 自性輪身（butsu·其體）→ 正法輪身（bosatsu·其法）→ 教令輪身（myoo·其令）。
// 五方各一行，同一行即同一智。
export const SANRINJIN = [
  { dir: 'center', butsu: 'center', bosatsu: 'p-kon',  myoo: 'fudo' },
  { dir: 'east',   butsu: 'east',   bosatsu: 'fugen',  myoo: 'gozanze-t' },
  { dir: 'south',  butsu: 'south',  bosatsu: 'kokuzo', myoo: 'gundari' },
  { dir: 'west',   butsu: 'west',   bosatsu: 'kannon', myoo: 'daiitoku' },
  { dir: 'north',  butsu: 'north',  bosatsu: 'k-gyo',  myoo: 'kongoyasha' },
];

// ══ 壇上座標 ═════════════════════════════════════════════════════════════════
// [x, z]：east = +x，south = +z。斜十字間距 ~4.5（對角偏移 4.5/√2 ≈ 3.2）。
// 如來・菩薩二壇：曼荼羅北＝實西北（E→NE, S→SE, W→SW, N→NW）。
// 明王壇：曼荼羅北＝實東北（E→SE, S→SW, W→NW, N→NE）——與東二壇相鏡。
const D = 3.2; // 4.5 / √2

export const KODO_LAYOUT = {
  // ── 中壇 · 五智如來 ──
  center: [0, 0],          // 大日（原點）
  east:   [ D, -D],        // 阿閦 → 實東北
  south:  [ D,  D],        // 寶生 → 實東南
  west:   [-D,  D],        // 阿彌陀 → 實西南
  north:  [-D, -D],        // 不空成就 → 實西北

  // ── 東壇 · 五大菩薩（中心 x=+18）──
  'p-kon': [18, 0],        // 金剛波羅蜜多（壇主）
  fugen:   [18 + D, -D],   // 金剛薩埵（東）→ 實東北
  kokuzo:  [18 + D,  D],   // 金剛寶（南）→ 實東南
  kannon:  [18 - D,  D],   // 金剛法（西）→ 實西南
  'k-gyo': [18 - D, -D],   // 金剛業（北）→ 實西北

  // ── 西壇 · 五大明王（中心 x=−18）──
  fudo:        [-18, 0],       // 不動（壇主）
  'gozanze-t': [-18 + D,  D],  // 降三世（東）→ 實東南
  gundari:     [-18 - D,  D],  // 軍荼利（南）→ 實西南
  daiitoku:    [-18 - D, -D],  // 大威德（西）→ 實西北
  kongoyasha:  [-18 + D, -D],  // 金剛夜叉（北）→ 實東北

  // ── 四隅 · 四天王（考見檔首）──
  jikoku:   [ 26,  8],     // 持國天 · 東南隅
  zocho:    [-26,  8],     // 增長天 · 西南隅
  komoku:   [-26, -8],     // 廣目天 · 西北隅
  bishamon: [ 26, -8],     // 多聞天（毗沙門）· 東北隅

  // ── 兩端 · 梵釋（考見檔首：梵東釋西）──
  bonten:   [ 26, 0],      // 梵天 · 東端
  taishaku: [-26, 0],      // 帝釋天 · 西端
};

// ══ 入講堂之法語（三語）═══════════════════════════════════════════════════════
export const KODO_I18N = {
  zh: {
    button: '講堂',
    head: '羯磨曼荼羅 · 東寺講堂',
    title: '立體曼荼羅：二十一尊',
    text: '空海以二十一尊重編千四百尊。三輪身者，同一智之三現——佛身其體，菩薩其法，明王其令。',
    rings: ['自性輪身', '正法輪身', '教令輪身'],
  },
  en: {
    button: 'Kōdō',
    head: 'Karma-Maṇḍala · Tōji Lecture Hall',
    title: 'The Maṇḍala in the Round: Twenty-One',
    text: 'Kūkai recast fourteen hundred deities as twenty-one. The three wheel-bodies are one wisdom thrice shown — the buddha its essence, the bodhisattva its dharma, the vidyārāja its command.',
    rings: ['Wheel of Self-Nature', 'Wheel of True Dharma', 'Wheel of Command'],
  },
  ja: {
    button: '講堂',
    head: '羯磨曼荼羅 · 東寺講堂',
    title: '立体曼荼羅：二十一尊',
    text: '空海、二十一尊をもて千四百尊を編み直せり。三輪身とは同一智の三現——仏身はその体、菩薩はその法、明王はその令なり。',
    rings: ['自性輪身', '正法輪身', '教令輪身'],
  },
};
