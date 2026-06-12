// ─────────────────────────────────────────────────────────────────────────────
// 結構元數據：胎藏諸院（同心環）· 金剛界九會（九宮）· 上下轉之法語
// ─────────────────────────────────────────────────────────────────────────────

// ══ 胎藏 · 諸院 ══════════════════════════════════════════════════════════════
// ring: 同心環序（0=中台）。arc: [起,訖] 角度（度，0=東=+x，逆時針增）。
// 現圖本為方形諸院，此處取其拓撲（流出之同心結構）作環狀法曼荼羅。
export const COURTS = [
  { key: 'chudai',     zh: '中臺八葉院', ring: 0, arc: null,
    note: '八葉蓮華，胎藏之心。' },
  { key: 'henchi',     zh: '遍知院',     ring: 1, arc: [55, 125],
    note: '諸佛能生之智，三角智火。' },
  { key: 'jimyo',      zh: '持明院',     ring: 1, arc: [235, 305],
    note: '明王所居，折伏之門。' },
  { key: 'renge',      zh: '蓮華部院',   ring: 2, arc: [115, 245],
    note: '觀音眷屬，大悲之翼。' },
  { key: 'kongoshu',   zh: '金剛手院',   ring: 2, arc: [-65, 65],
    note: '薩埵眷屬，大智之翼。' },
  { key: 'shaka',      zh: '釋迦院',     ring: 3, arc: [60, 120],
    note: '變化身所居，化儀之門。' },
  { key: 'monju',      zh: '文殊院',     ring: 3, arc: [10, 50],
    note: '般若童真，五使圍繞。' },
  { key: 'jokaisho',   zh: '除蓋障院',   ring: 3, arc: [-50, -10],
    note: '除蓋障三昧之眷屬。' },
  { key: 'jizo',       zh: '地藏院',     ring: 3, arc: [130, 170],
    note: '地藏九尊，荷負之願。' },
  { key: 'kokuzo',     zh: '虛空藏院',   ring: 3, arc: [190, 230],
    note: '虛空之藏，福智無盡。' },
  { key: 'soshitsuji', zh: '蘇悉地院',   ring: 3, arc: [250, 290],
    note: '妙成就，三部悉地。' },
  { key: 'gekongobu',  zh: '外金剛部院', ring: 4, arc: [0, 360],
    note: '護世諸天，世間悉攝於曼荼羅。' },
];

// 胎藏環半徑（世界單位）
export const RING_RADIUS = [0, 13, 20, 27, 34];
export const PETAL_RADIUS = 6.2; // 八葉

// 胎藏上下轉（環序遍歷）之法語
export const TAIZO_DESCENT = [
  { ring: 0, title: '中臺八葉', text: '大悲胎藏，本源自心。五佛四菩薩，法爾而住。' },
  { ring: 1, title: '遍知・持明', text: '智印初動，明王侍側。悲之將行，智為之先。' },
  { ring: 2, title: '蓮華・金剛', text: '悲智張為兩翼：觀音之蓮，薩埵之杵。' },
  { ring: 3, title: '化他諸院', text: '釋迦垂跡，文殊童行，地藏荷負，虛空藏施。' },
  { ring: 4, title: '外金剛部', text: '乃至天龍鬼神，無一法在曼荼羅外。大悲之化盡矣。' },
];
export const TAIZO_ASCENT = [
  { ring: 4, title: '外金剛部', text: '行者最初所立之地：世間之身，諸天之間。' },
  { ring: 3, title: '化他諸院', text: '依釋迦之教，行文殊之問，發地藏之願。' },
  { ring: 2, title: '蓮華・金剛', text: '修悲如蓮，修智如杵，兩翼漸成。' },
  { ring: 1, title: '遍知・持明', text: '受明王之護，得佛眼之照，將入心臺。' },
  { ring: 0, title: '中臺八葉', text: '八葉開敷，見本不生。汝心即是大日。' },
];

// ══ 金剛界 · 九會 ════════════════════════════════════════════════════════════
// grid: [列,行]，行0=上。下轉門自中央成身會起，順旋而出；上轉門逆之。
// form: 該會之「定形」——九會各有固定表示形態，是其身份之一部，不隨轉相鈕變。
//   依現圖：唯三昧耶會・降三世三昧耶會現標幟，餘會皆現尊形——
//   微細會尊住杵中（figure-subtle）、供養會尊捧蓮臺（figure-offer）、
//   降三世會忿怒尊形（figure-wrath）、一印會智拳印大日。
//   成身會由真身（形變節點）充任，其相隨「轉相」鈕——使用者所參之四曼。
export const ASSEMBLIES = [
  { key: 'jojin',    zh: '成身會',   grid: [1, 1], form: 'bija',   scale: 1.0,
    descent: '法然具足：三十七尊，五智圓明，本有之佛身。',
    ascent: '即身成佛：行者至此，與三十七尊無別。' },
  { key: 'sammaya',  zh: '三昧耶會', grid: [1, 2], form: 'samaya', scale: 0.92,
    descent: '攝身為誓：尊形隱去，唯餘器仗標幟——佛以誓約住世。',
    ascent: '持印起誓：未見佛身，先持其誓。' },
  { key: 'misai',    zh: '微細會',   grid: [0, 2], form: 'figure-subtle', scale: 0.85,
    descent: '入金剛微細：縮於杵中，遍住萬法之內，無物不含佛。',
    ascent: '於微細處見佛：一塵一杵，皆藏全體。' },
  { key: 'kuyo',     zh: '供養會',   grid: [0, 1], form: 'figure-offer', scale: 0.92,
    descent: '互為供養：諸尊各捧香華燈塗，悲智交徹而相養。',
    ascent: '以供養入道：奉一華一燈，即與聖眾交徹。' },
  { key: 'shiin',    zh: '四印會',   grid: [0, 0], form: 'figure', scale: 1.0,
    subset: ['center', 'fugen', 'kokuzo', 'kannon', 'k-gyo',
             'p-kon', 'p-ho', 'p-hou', 'p-katsu'],
    descent: '攝繁為簡：三十七尊收於四印，將歸於一。',
    ascent: '四印初分：一將開為萬，行者始見差別之德。' },
  { key: 'ichiin',   zh: '一印會',   grid: [1, 0], form: 'figure', scale: 1.55,
    subset: ['center'],
    descent: '千尊歸一：唯一大日，智拳之印。多即是一。',
    ascent: '一中見多之始：於唯一處，預感無量。' },
  { key: 'rishu',    zh: '理趣會',   grid: [2, 0], form: 'figure', scale: 0.95,
    cast: 'rishu',
    descent: '煩惱即菩提：欲觸愛慢，皆是金剛薩埵之印。入世最深處。',
    ascent: '即事而真：不避欲塵，於染中起修——上轉之初門。' },
  // 按：降三世會諸尊依現圖大體仍現自相，唯金剛薩埵換現降三世明王（echo 置換），
  // 忿怒會相以焰環赤輪表之——非諸尊皆轉明王形，此其經軌。
  { key: 'gozanze',  zh: '降三世會', grid: [2, 1], form: 'figure-wrath', scale: 0.92,
    descent: '現忿怒身：慈悲之極反為雷霆，摧三界之剛強。',
    ascent: '降伏自心：先摧己之貪瞋癡，足下所踏即我慢。' },
  { key: 'gozanze-s', zh: '降三世三昧耶會', grid: [2, 2], form: 'wrath-samaya', scale: 0.85,
    descent: '垂化之極：忿怒亦隱為符印，散入最暗處。下轉之門盡矣。',
    ascent: '行者初入之門：於器仗符印之間，立最初之誓。' },
];

// 下轉門順序（自成身會出）；上轉門即其逆
export const DESCENT_ORDER = ['jojin', 'sammaya', 'misai', 'kuyo', 'shiin',
                              'ichiin', 'rishu', 'gozanze', 'gozanze-s'];

export const CELL = 30;          // 九宮單元邊長
export const MOON_R = 7.2;       // 成身會五月輪自中心之距
export const ATTEND_R = 2.6;     // 親近尊繞部主之距

// 五部色（紺紙金泥設色）
export const FAMILY_COLOR = {
  butsu:   0xe9cd8a, // 佛部 · 金
  kongo:   0xa8c2ee, // 金剛部 · 月白藍
  ho:      0xe2a85b, // 寶部 · 琥珀
  renge:   0xdd7a5f, // 蓮華部 · 朱
  katsuma: 0x86c4a4, // 羯磨部 · 青磁
  ten:     0x9b8fb8, // 外金剛部 · 藤紫
};
export const FAMILY_ZH = {
  butsu: '佛部', kongo: '金剛部', ho: '寶部',
  renge: '蓮華部', katsuma: '羯磨部', ten: '外金剛部',
};
