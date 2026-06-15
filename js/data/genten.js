// ─────────────────────────────────────────────────────────────────────────────
// 原典層 · The Genten (Original-Source) Layer
//
// 逐尊／相部級的歷史原典圖像注冊表。與「不二層」之程序結構並列而不相奪——
// 引擎所現之尊形皆 canvas 程序生成（零圖片資源之鐵律未破）；此層僅為詳情框
// 之「博物館壁牌」：示此尊在歷史絹本中的投影，印證「絹本是投影，非結構」。
//
// 重合之制（本地豐而線上潔）：
//   shippable:true  之圖置於 assets/原典/      —— 隨 gh-pages 上線
//   shippable:false 之參攷圖置於 assets/參攷-local/（.gitignore，永不提交）
//   gentenFor() 一視同仁；檔案缺失則詳情框優雅缺省。
//   故本地跑全集（含 A 階段逐尊參攷），線上僅見 CC0 合法子集。同一條讀取路徑。
//
// 錨定（anchor）：id 對應 deities.js 之尊；side（t/k）與 form（bija/samaya/figure）
// 可選，愈具體者優先。無 id 而 gallery:true 者，僅入「原典帖」陳列，不入詳情框。
//
// 授權：本檔所列 CC0 件皆經 Met Collection API / CMA Open Access API 機讀核實
// （isPublicDomain / share_license_status=CC0），與本項目 CC BY-NC-SA 4.0 相容。
// ─────────────────────────────────────────────────────────────────────────────

export const GENTEN = [
  {
    // 大日 · 種字相之歷史原典（無 side：兩面於 bija 相皆顯此種字曼荼羅；
    // 金剛界中尊於 samaya／figure 相則由下一筆 side:k 之白描卷承當）
    id: 'center', form: 'bija',
    src: 'assets/原典/met-912998-bonji-mandara.jpg',
    title: {
      zh: '梵字曼荼羅（種字・真言宗八祖）',
      en: 'Mandala in Sanskrit with Buddhas, Bodhisattvas, and Eight Patriarchs of the Shingon Sect',
      ja: '梵字曼荼羅（種子・真言八祖）',
    },
    note: {
      zh: '中央悉曇種字大書，旁列諸尊與八祖。即法曼荼羅——以種字為真形之歷史原典。',
      en: 'Great Siddhaṃ seed-syllables at center, deities and patriarchs framing the sides — the Dharma-mandala, a historical original of the seed-syllable form.',
      ja: '中央に悉曇種子を大書し、諸尊と八祖を傍らに列ねる。法曼荼羅——種子を真形とする歴史的原典。',
    },
    institution: 'The Met', date: '13–14C', license: 'CC0',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search/912998',
    shippable: true,
  },
  {
    // 金剛界大日／金剛界諸尊 · 白描月輪之歷史原典
    id: 'center', side: 'k',
    src: 'assets/原典/met-44845-kongokai-hakubyo.jpg',
    title: {
      zh: '金剛界諸尊白描卷（1083）',
      en: 'Scroll of Deities of the Diamond World Mandala (1083)',
      ja: '金剛界諸尊白描卷（1083）',
    },
    note: {
      zh: '諸尊各居月輪、附種字之白描手卷，與本引擎金剛界「月輪尊」之表現同源。',
      en: 'A handscroll of Diamond-World deities, each seated within a moon-disc with seed-syllable — the same iconographic logic as this engine’s moon-disc deities.',
      ja: '諸尊おのおの月輪に坐し種子を添える白描手卷。本引擎の金剛界「月輪尊」と同源の表現。',
    },
    institution: 'The Met', date: '1083', license: 'CC0',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search/44845',
    shippable: true,
  },
  {
    // 金剛界大日 · 尊形相之單裁。form 限定使其僅覆蓋「尊形」相；
    // 種字相仍用梵字曼荼羅，三昧耶相仍可見全卷白描。
    id: 'center', side: 'k', form: 'figure',
    src: 'assets/原典/met-44845-center.jpg',
    title: {
      zh: '金剛界大日如來白描（1083）',
      en: 'Mahāvairocana, Diamond World handscroll detail (1083)',
      ja: '金剛界大日如來白描（1083）',
    },
    note: {
      zh: '自金剛界諸尊白描卷 DP278116 重裁。智拳印、五智寶冠、師子座與下方 vaṃ 種字並見，為金剛界大日之確證。',
      en: 'A detail cropped from DP278116 of the Diamond World handscroll. The wisdom-fist mudrā, five-wisdom crown, lion throne, and vaṃ syllable identify Mahāvairocana.',
      ja: '金剛界諸尊白描卷 DP278116 より重裁。智拳印・五智寶冠・師子座・下方の vaṃ 種子により金剛界大日と確證される。',
    },
    institution: 'The Met', date: '1083', license: 'CC0',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search/44845',
    shippable: true,
  },
  {
    // 金剛護 · Diamond Realm 北方不空成就眷屬之單尊原典。
    id: 'k-gou', side: 'k', form: 'figure',
    src: 'assets/原典/cma-1989.363-k-gou.jpg',
    title: {
      zh: '金剛護菩薩銀像（西藏西部・10世紀）',
      en: 'Bodhisattva Vajraraksha, Western Tibet (c. 900s)',
      ja: '金剛護菩薩銀像（西チベット・10世紀）',
    },
    note: {
      zh: 'CMA 原說明列其為 Diamond Realm（Vajradhātu）諸尊之一，居北方，為不空成就佛之眷屬；與金剛界金剛護（Vajrarakṣa）相應。',
      en: 'CMA identifies the figure as part of the Diamond Realm (Vajradhātu), seated in the northern quadrant as a subsidiary of Amoghasiddhi; this matches Vajrarakṣa.',
      ja: 'CMA 解說は本像を Diamond Realm（Vajradhātu）の一尊、北方に坐す不空成就の眷屬とする。金剛界の金剛護（Vajrarakṣa）に相應する。',
    },
    institution: 'Cleveland Museum of Art', date: 'c. 900s', license: 'CC0',
    sourceUrl: 'https://www.clevelandart.org/art/1989.363',
    shippable: true,
  },

  // ── 原典帖 · 暫不對應引擎尊位，僅入陳列（無 id，gallery:true）─────────────
  {
    gallery: true,
    src: 'assets/原典/met-53164-daishojin.jpg',
    title: {
      zh: '大精進菩薩（兩界佛畫帖之一葉）',
      en: 'Daishōjin Bosatsu, from the Kontai butsugajō album',
      ja: '大精進菩薩（兩界佛畫帖の一葉）',
    },
    note: {
      zh: '一葉之中，尊形（大曼荼羅）、下繪三昧耶形（三昧耶曼荼羅）、種子（法曼荼羅）三相俱現——四曼之義的歷史實證。',
      en: 'In a single leaf: the figure (Mahā-maṇḍala), the samaya emblem drawn below (Samaya-maṇḍala), and the seed-syllable (Dharma-maṇḍala) together — a historical witness to the four-mandala doctrine.',
      ja: '一葉のうちに尊形（大曼荼羅）・下に三昧耶形（三昧耶曼荼羅）・種子（法曼荼羅）の三相を倶現す——四曼の義の歴史的実証。',
    },
    institution: 'The Met', date: '12C', license: 'CC0',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search/53164',
    shippable: true,
  },
  {
    gallery: true,
    src: 'assets/原典/met-45618-gakko.jpg',
    title: {
      zh: '月光菩薩（兩界佛畫帖之一葉）',
      en: 'Gakkō Bosatsu, from the Kontai butsugajō album',
      ja: '月光菩薩（兩界佛畫帖の一葉）',
    },
    note: {
      zh: '同帖之白描設色單尊，存尊形・三昧耶・種子之造像量度。',
      en: 'A single-deity leaf from the same album, preserving the iconometry of figure, samaya, and seed-syllable.',
      ja: '同帖の白描設色單尊。尊形・三昧耶・種子の造像量度を存す。',
    },
    institution: 'The Met', date: '12C', license: 'CC0',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search/45618',
    shippable: true,
  },
  {
    gallery: true,
    src: 'assets/原典/cma-1987.39-ninno-zuzo.jpg',
    title: {
      zh: '仁王經曼荼羅白描圖像稿（圖像・1100s）',
      en: 'Iconographical Sketch (Zuzō) for the Benevolent Kings Sutra Mandala',
      ja: '仁王經曼荼羅圖像（白描・1100s）',
    },
    note: {
      zh: '密教曼荼羅之白描圖像稿（非兩界本尊），存白描筆法與圖像體例之範。',
      en: 'A line-drawing iconographic sketch for an esoteric mandala (not a Two-World principal) — an exemplar of hakubyō brushwork and iconographic convention.',
      ja: '密教曼荼羅の白描圖像稿（兩界本尊にあらず）。白描の筆法と圖像體例の範を存す。',
    },
    institution: 'Cleveland Museum of Art', date: '1100s', license: 'CC0',
    sourceUrl: 'https://www.clevelandart.org/art/1987.39',
    shippable: true,
  },
];

// 取某尊某面某相之最佳原典圖；無則 null。愈具體（side/form 命中愈多）者優先。
export function gentenFor(id, side, form) {
  let best = null, bestScore = -1;
  for (const g of GENTEN) {
    if (g.gallery || g.id !== id) continue;
    if (g.side && g.side !== side) continue;
    if (g.form && g.form !== form) continue;
    const score = (g.side ? 1 : 0) + (g.form ? 1 : 0);
    if (score > bestScore) { best = g; bestScore = score; }
  }
  return best;
}

// 原典帖陳列之全部（含 gallery 與逐尊；之後可供獨立陳列頁用）。
export function gentenGallery() {
  return GENTEN.slice();
}
