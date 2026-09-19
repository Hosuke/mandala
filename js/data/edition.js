// 本次完整現圖之目標底本；不表示既有節選或粉本已逐席符合此本。
// 物件編目、圖本坐次、粉本准入是三種不同證據，不互相代核。
// 此檔只存編目文字及出典連結，不載入館藏圖像。
export const SAIIN_EDITION = Object.freeze({
  id: 'toji-saiin',
  name: '東寺西院曼荼羅（傳真言院曼荼羅）',
  catalogueTitle: '絹本著色両界曼荼羅図〈／（伝真言院曼荼羅）〉',
  catalogueId: '201/95',
  catalogueUrl: 'https://kunishitei.bunka.go.jp/heritage/detail/201/95',
  designationNumber: '00092(00)',
  designatedOn: '1953-11-14',
  owner: '宗教法人教王護国寺',
  scrollCount: 2,
  period: '平安時代・9世紀',
  templeUrl: 'https://toji.or.jp/treasure/',
  exhibitionUrl: 'https://www.tnm.jp/modules/r_free_page/index.php?id=1938&lang=ja',
  selectedOn: '2026-09-20',
  // 未取得同本完整逐席核定表；不可把通說 414／1461 當作實物驗收值。
  sourceSeatCounts: Object.freeze({ t: null, k: null }),
  seatMappingStatus: 'pending',
});

// 2026-09-20 用戶改定本書為主要底本。西院照片另存為比較資料。
export const MANDALA_EDITION = Object.freeze({
  id: 'mandala-study-2011',
  name: '《曼荼羅之研究》上下冊',
  author: '栂尾祥雲', editor: '吳信如', publisher: '中國藏學出版社',
  publishedOn: '2011-06', edition: '第 1 版，第 1 次印刷',
  isbn: '978-7-80253-355-4', selectedOn: '2026-09-20',
  catalogueUrl: 'docs/依書校正.md',
  sourceSeatCounts: Object.freeze({ t: 412, k: 1481 }),
  countNote: '按本版逐院／逐會圖表計席；金剛含支輪四大神及其標幟，千佛逐席展開。',
  pageOffsets: Object.freeze({ upper: 29, lower: -347 }),
  seatMappingStatus: 'source-checked',
});
