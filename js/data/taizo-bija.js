// ─────────────────────────────────────────────────────────────────────────────
// 席身種字錄 · Seed syllables for placeholder seats（胎藏現圖）
//
// 不二層（deities.js）之尊各有其種字（從現圖通行本）；席位層（seats.js）之「席身」
// 唯書載尊名，其種字於此逐席補錄：鍵＝席號（seatId），每條帶 sources（title・url・
// quote 逐字引文）與 grade——'cross'（≥2 源交叉）／'single'（單源，壇上標「單源」）。
// 律：查不實者不錄（壇上仍列尊名），不借同名他院之種字，不以主尊之種子充眷屬。
// 來源之階見 docs/參考文獻.md 第四階；本錄由考據代理自網源逐席回查（2026-09-21），
// 主人未印可者皆屬「待核」，不入粉本已核之列。
// 字段：{ bija: IAST, sk?: 梵名 IAST, grade: 'cross'|'single', sources: [{title,url,quote}], note? }
// ─────────────────────────────────────────────────────────────────────────────
export const TAIZO_BIJA = {
  "t:gekongobu:book-east-02": { // 喜面天
    bija: "ro", sk: "Nandīmukha", grade: "single",
    note: "shimma 僅列一種字 ro（與梵名 Nandīmukha 不合，疑為伊舎那天眷屬共用之字）；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「喜面天」（種字）", url: "https://shimma.info/j50/ki/#kimenten", quote: "種字は「रो（ro）」。" },
      { title: "神魔精妖名辞典「喜面天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kimenten", quote: "胎蔵界曼荼羅の外金剛部院の東方（上方）において伊舎那天の側に、同じく眷属である「伊舎那天后（いしゃなてんこう）」や「常酔天（じょうすいてん）」、「器手天（きしゅてん）」、「器手天后（きしゅてんこう）」などとともに配される。" },
    ],
  },
  "t:gekongobu:book-east-03": { // 常醉天
    bija: "sa", sk: "Sadāmatta", grade: "single",
    note: "shimma 列 ro／sa 二說，取與梵名 Sadāmatta 相應之 sa；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「常酔天」（種字）", url: "https://shimma.info/j50/si/#jousuiten", quote: "種字は「रो（ro）」、「स（sa）」。" },
      { title: "神魔精妖名辞典「常酔天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#jousuiten", quote: "胎蔵界曼荼羅の外金剛部院の東方（上方）において伊舎那天の側に、同じく眷属である「伊舎那天后（いしゃなてんこう）」や「喜面天（きめんてん）」、「器手天（きしゅてん）」、「器手天后（きしゅてんこう）」などとともに配される。" },
    ],
  },
  "t:gekongobu:book-east-05": { // 器手天
    bija: "ka", sk: "Karoṭapāṇi", grade: "single",
    note: "shimma 列 ka／ro 二說，取與梵名 Karoṭapāṇi 相應之 ka；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「器手天」（種字）", url: "https://shimma.info/j50/ki/#kisyuten", quote: "種字は「क（ka）」、「रो（ro）」。" },
      { title: "神魔精妖名辞典「器手天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kisyuten", quote: "胎蔵界曼荼羅の外金剛部院の東方（上方）において伊舎那天の側に、同じく眷属である「伊舎那天后（いしゃなてんこう）」や「常酔天（じょうすいてん）」、「喜面天（きめんてん）」などとともに配される。" },
    ],
  },
  "t:gekongobu:book-east-12": { // 惹耶
    bija: "ja", sk: "Jayā", grade: "single",
    note: "shimma 誓耶（惹耶）條明言「胎蔵界曼荼羅の外金剛部院の東方…日天后は同尊」，與書載東方惹耶席相合；列 ja／ka 二說，取與梵名 Jayā 相應之 ja。mikkyo21f 此席作日天后 ādityaparivārā；mikkyo21f 梵名表記作 ādityaparivārā；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「誓耶」（種字）", url: "https://shimma.info/j50/se/#seiya", quote: "種字は「ज（ja）」、「क（ka）」、三昧耶形は棒。" },
      { title: "神魔精妖名辞典「誓耶」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/se/#seiya", quote: "胎蔵界曼荼羅の外金剛部院の東方（上方）で日天の右手側に侍す、「日天后（にってんこう）」は同尊とされる。" },
    ],
  },
  "t:gekongobu:book-east-14": { // 微惹耶
    bija: "vi", sk: "Vijayā", grade: "single",
    note: "shimma 微誓耶條明言胎蔵界外金剛部院東方日天左側；列 ka／vi 二說，取與梵名 Vijayā 相應之 vi；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「微誓耶」（種字）", url: "https://shimma.info/j50/hi/#biseiya", quote: "種字は「क（ka）」、「वि（vi）」、三昧耶形は棒。" },
      { title: "神魔精妖名辞典「微誓耶」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/hi/#biseiya", quote: "胎蔵界曼荼羅の外金剛部院の東方（上方）で日天の左手側に配される（「日天妃（にってんひ）」と呼ばれる）ほか、文殊院にはほかの四姉妹天とともに兄とされる「都牟盧天（とむろてん）」の右手側上隅に配される。" },
    ],
  },
  "t:gekongobu:book-east-20": { // 持國天
    bija: "dhṛ", sk: "Dhṛtarāṣṭra", grade: "single",
    note: "shimma 列 dhṛ／tri 二說，取與梵名 Dhṛtarāṣṭra 相應之 dhṛ；異說 tri；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「持国天」（種字）", url: "https://shimma.info/j50/si/#zikokuten", quote: "種字は「धृ（dhṛ）」、「त्रि（tri）」、三昧耶形は刀。" },
      { title: "神魔精妖名辞典「持国天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#zikokuten", quote: "東方の守護神として、胎蔵界曼荼羅でも外金剛部院の東方（上）中央に配置される。" },
    ],
  },
  "t:gekongobu:book-east-22": { // 昴宿
    bija: "kṛ", sk: "Kṛttikā", grade: "single",
    note: "shimma 列 kṛ／na／ro，取與梵名 Kṛttikā 相應之 kṛ；na・ro 為諸宿通用之異說；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「昴宿」（種字）", url: "https://shimma.info/j50/ho/#bousyuku", quote: "種字は「कृ（kṛ）」、「न（na）」、「रो（ro）」、真言は「唵基栗底莎呵（おんきりていそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「昴宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ho/#bousyuku", quote: "胎蔵界曼荼羅外金剛部院では東方（上側）に配され、像容は右手は手のひらを上にして親指と人差し指以外を曲げて臍下に、左手は赤珠の乗った蓮華を持つ。" },
    ],
  },
  "t:gekongobu:book-east-23": { // 畢宿
    bija: "ro", sk: "Rohiṇī", grade: "single",
    note: "shimma 列 ro／hi／hra，取與梵名 Rohiṇī 相應之 ro；異說 hi・hra；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「畢宿」（種字）", url: "https://shimma.info/j50/hi/#hitusyuku", quote: "種字は「रो（ro）」、「हि（hi）」、「ह्र（hra）」、真言は「唵盧喜尼莎呵（おんろきにそわか）」（T2476）、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「畢宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/hi/#hitusyuku", quote: "胎蔵界曼荼羅外金剛部院では東方（上側）に配され、像容は右手に赤珠の乗った蓮華を持ち、左手は見えない。" },
    ],
  },
  "t:gekongobu:book-east-24": { // 觜宿
    bija: "mṛ", sk: "Mṛgaśiras", grade: "single",
    note: "shimma 列 mṛ／na／ro，取與梵名 Mṛgaśīrā 相應之 mṛ；異說 na・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「觜宿」（種字）", url: "https://shimma.info/j50/si/#sisyuku", quote: "種字は「मृ（mṛ）」、「न（na）」、「रो（ro）」、真言は「唵麋梨伽尸羅莎呵（おんびりかしらそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「觜宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#sisyuku", quote: "胎蔵界曼荼羅外金剛部院では東方（上側）に配され、像容は右手を胸に当て左手に玉の乗った蓮華を持つ。" },
    ],
  },
  "t:gekongobu:book-east-25": { // 參宿
    bija: "a", sk: "Ārdrā", grade: "single",
    note: "shimma 列 a／ro／na，取與梵名 Ārdrā 相應之 a；異說 ro・na；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「参宿」（種字）", url: "https://shimma.info/j50/si/#sinsyuku", quote: "種字は「अ（a）」、「रो（ro）」、「न（na）」、真言は「唵阿陀羅莎呵（おんあだらそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「参宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#sinsyuku", quote: "胎蔵界曼荼羅外金剛部院では東方（上側）に配され、像容は右手を臍上に当て左手に玉の乗った蓮華を持つ。" },
    ],
  },
  "t:gekongobu:book-east-26": { // 鬼宿
    bija: "pu", sk: "Puṣya", grade: "single",
    note: "shimma 列 pu／na／ro，取與梵名 Puṣya 相應之 pu；異說 na・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「鬼宿」（種字）", url: "https://shimma.info/j50/ki/#kisyuku", quote: "種字は「पु（pu）」、「न（na）」、「रो（ro）」、真言は「唵布灑莎呵（おんふしゃそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「鬼宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kisyuku", quote: "胎蔵界曼荼羅外金剛部院では東方（上側）に配され、像容は左手に赤珠を持ち右手は隠れる。" },
    ],
  },
  "t:gekongobu:book-east-27": { // 井宿
    bija: "pu", sk: "Punarvasu", grade: "single",
    note: "shimma 列 pu／na／ro，取與梵名 Punarvasu 相應之 pu；異說 na・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「井宿」（種字）", url: "https://shimma.info/j50/se/#seisyuku", quote: "種字は「पु（pu）」、「न（na）」、「रो（ro）」、真言は「唵補捺伐蘇莎呵（おんほだばそそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「井宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/se/#seisyuku", quote: "胎蔵界曼荼羅外金剛部院では東方（上側）に配され、像容は右手に蓮珠を持つ。" },
    ],
  },
  "t:gekongobu:book-east-28": { // 柳宿
    bija: "a", sk: "Aśleṣā", grade: "single",
    note: "shimma 列 a／na／ro，取與梵名 Aśleṣā 相應之 a；異說 na・ro；mikkyo21f 梵名表記作 āśleṣa；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「柳宿」（種字）", url: "https://shimma.info/j50/ri/#ryuusyuku", quote: "種字は「अ（a）」、「न（na）」、「रो（ro）」、真言は「唵阿失麗沙莎呵（おんあしれいしゃそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「柳宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ri/#ryuusyuku", quote: "胎蔵界曼荼羅外金剛部院では東方（上側）に配され、像容は右手は薬指以外を伸ばし前に手のひらを向け、左手は玉の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-east-29": { // 牛密宮
    bija: "vṛ", sk: "Vṛṣa", grade: "single",
    note: "即十二宮之牛宮。shimma 列「बृ（bṛ）」「वृ（vra）」二說，第二字天城體作 वृ＝vṛ（該站羅馬轉寫誤作 vra），取與梵名 Vṛṣa 相應之 vṛ；異說 bṛ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「牛宮」（種字）", url: "https://shimma.info/j50/ko/#goguu", quote: "種字は「बृ（bṛ）」、「वृ（vra）」、真言は「唵毘利沙波多曳莎呵（おんびりしゃはたえいそわか）」。" },
      { title: "神魔精妖名辞典「牛宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ko/#goguu", quote: "牧畜を司るとされ、胎蔵界曼荼羅外金剛部院では東方（上側）に牛の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-east-30": { // 白羊宮
    bija: "me", sk: "Meṣa", grade: "single",
    note: "即十二宮之羊宮；shimma 僅列 me，與梵名 Meṣa 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「羊宮」（種字）", url: "https://shimma.info/j50/yo/#youguu", quote: "種字は「मे（me）」、真言は「唵迷沙波多曳莎呵（おんめいしゃはたえいそわか）」。" },
      { title: "神魔精妖名辞典「羊宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/yo/#youguu", quote: "規範を司るとされ、胎蔵界曼荼羅外金剛部院では東方（上側）に羊の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-east-31": { // 夫婦宮（男）
    bija: "mi", sk: "Mithuna", grade: "single",
    note: "即十二宮之男女宮（東方分男女二席）；shimma 僅列 mi；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「男女宮」（種字）", url: "https://shimma.info/j50/na/#nannyoguu", quote: "種字は「मि（mi）」、真言は「唵弥陀那波多曳莎呵（おんみだなはたえいそわか）」。" },
      { title: "神魔精妖名辞典「男女宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/na/#nannyoguu", quote: "妊娠を司るとされ、胎蔵界曼荼羅外金剛部院では東方（上側）に夫婦二像の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-east-32": { // 夫婦宮（女）
    bija: "mi", sk: "Mithuna", grade: "single",
    note: "即十二宮之男女宮（東方分男女二席）；shimma 僅列 mi；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「男女宮」（種字）", url: "https://shimma.info/j50/na/#nannyoguu", quote: "種字は「मि（mi）」、真言は「唵弥陀那波多曳莎呵（おんみだなはたえいそわか）」。" },
      { title: "神魔精妖名辞典「男女宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/na/#nannyoguu", quote: "妊娠を司るとされ、胎蔵界曼荼羅外金剛部院では東方（上側）に夫婦二像の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-east-33": { // 彗星
    bija: "ke", sk: "Ketu", grade: "single",
    note: "書載彗星＝計都（f-denshi 242「彗星（計都）」、mikkyo21f 東33 彗星 ketu）。shimma 計都曜條列 ke／ro，取與梵名 Ketu 相應之 ke；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「計都曜」（種字）", url: "https://shimma.info/j50/ke/#keitoyou", quote: "種子は「के（ke）」、「रो（ro）」、真言は「唵嚩日囉計都曩乞殺怛羅邏惹野娑嚩賀（んばざらけいとのうさたららじゃやそわか）」、。" },
      { title: "神魔精妖名辞典「計都曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ke/#keitoyou", quote: "南西を司り、胎蔵界曼荼羅外金剛部院での像容は雲中から上半身が出て、右手は胸に当て左手は上に挙げた姿。" },
    ],
  },
  "t:gekongobu:book-north-13": { // 他化自在天
    bija: "pā", sk: "Paranirmitavaśavartin", grade: "single",
    note: "shimma 他化自在天條明載胎蔵界外金剛部院北方，列 pā／paṃ／ro，取與梵名 Paranirmita… 相應之 pā；異說 paṃ・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「他化自在天」（種字）", url: "https://shimma.info/j50/ta/#takezizaiten", quote: "種字は「पा（pā）」、「पं（paṃ）」、「रो（ro）」、三昧耶形は弓箭。" },
      { title: "神魔精妖名辞典「他化自在天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ta/#takezizaiten", quote: "胎蔵界曼荼羅外金剛部院の北方（左側）に、侍者二人を伴って形で配される。" },
    ],
  },
  "t:gekongobu:book-north-21": { // 摩睺羅迦
    bija: "ma", sk: "Mahoraga", grade: "single",
    note: "shimma 摩睺羅伽條明載胎蔵界外金剛部院，云「種子は「म（ma）」ないし「ग（ga）」」，取與梵名 Mahoraga 相應之 ma；異說 ga。北方三席同名同尊，同取此字；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「摩睺羅伽」（種字）", url: "https://shimma.info/j50/ma/#magoraka", quote: "種子は「म（ma）」ないし「ग（ga）」、印相は普印、真言は「南麼三曼多勃馱喃蘗囉藍蘗羅藍（なうまくさまんだぼだなんぎゃららんぎゃららん）」（諸摩睺羅伽真言・T0848）。" },
      { title: "神魔精妖名辞典「摩睺羅伽」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ma/#magoraka", quote: "胎蔵界曼荼羅の外金剛部院には横笛を吹いたり小鼓をうったりしている姿で配される。" },
    ],
  },
  "t:gekongobu:book-north-22": { // 摩睺羅迦
    bija: "ma", sk: "Mahoraga", grade: "single",
    note: "shimma 摩睺羅伽條明載胎蔵界外金剛部院，云「種子は「म（ma）」ないし「ग（ga）」」，取與梵名 Mahoraga 相應之 ma；異說 ga。北方三席同名同尊，同取此字；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「摩睺羅伽」（種字）", url: "https://shimma.info/j50/ma/#magoraka", quote: "種子は「म（ma）」ないし「ग（ga）」、印相は普印、真言は「南麼三曼多勃馱喃蘗囉藍蘗羅藍（なうまくさまんだぼだなんぎゃららんぎゃららん）」（諸摩睺羅伽真言・T0848）。" },
      { title: "神魔精妖名辞典「摩睺羅伽」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ma/#magoraka", quote: "胎蔵界曼荼羅の外金剛部院には横笛を吹いたり小鼓をうったりしている姿で配される。" },
    ],
  },
  "t:gekongobu:book-north-23": { // 摩睺羅迦
    bija: "ma", sk: "Mahoraga", grade: "single",
    note: "shimma 摩睺羅伽條明載胎蔵界外金剛部院，云「種子は「म（ma）」ないし「ग（ga）」」，取與梵名 Mahoraga 相應之 ma；異說 ga。北方三席同名同尊，同取此字；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「摩睺羅伽」（種字）", url: "https://shimma.info/j50/ma/#magoraka", quote: "種子は「म（ma）」ないし「ग（ga）」、印相は普印、真言は「南麼三曼多勃馱喃蘗囉藍蘗羅藍（なうまくさまんだぼだなんぎゃららんぎゃららん）」（諸摩睺羅伽真言・T0848）。" },
      { title: "神魔精妖名辞典「摩睺羅伽」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ma/#magoraka", quote: "胎蔵界曼荼羅の外金剛部院には横笛を吹いたり小鼓をうったりしている姿で配される。" },
    ],
  },
  "t:gekongobu:book-north-24": { // 緊那羅
    bija: "ki", sk: "Kiṃnara", grade: "single",
    note: "shimma 緊那羅條明載胎蔵界外金剛部院北方（男形・女形），列 ki／kiṃ，取與梵名 Kiṃnara 相應之 ki；異說 kiṃ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「緊那羅」（種字）", url: "https://shimma.info/j50/ki/#kinnara2", quote: "種字は「कि（ki）」、「किं（kiṃ）」、真言は「南麼三曼多勃馱喃訶散難微訶散難（なうまくさまんだぼだなんかさんなんびかさんなん）」（諸緊那羅真言・T0848）。" },
      { title: "神魔精妖名辞典「緊那羅」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kinnara2", quote: "胎蔵界曼荼羅では外金剛部院の北方（左側）に二像〜五像が配置され、男形は立って舞うもの、女形は座って篳篥を吹く、壺の鼓を右手に持ち左手の棒で叩く、大鼓を両手で打つ、などの姿で表される（楽天・歌天との混同が見られる）。" },
    ],
  },
  "t:gekongobu:book-north-25": { // 緊那羅
    bija: "ki", sk: "Kiṃnara", grade: "single",
    note: "shimma 緊那羅條明載胎蔵界外金剛部院北方（男形・女形），列 ki／kiṃ，取與梵名 Kiṃnara 相應之 ki；異說 kiṃ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「緊那羅」（種字）", url: "https://shimma.info/j50/ki/#kinnara2", quote: "種字は「कि（ki）」、「किं（kiṃ）」、真言は「南麼三曼多勃馱喃訶散難微訶散難（なうまくさまんだぼだなんかさんなんびかさんなん）」（諸緊那羅真言・T0848）。" },
      { title: "神魔精妖名辞典「緊那羅」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kinnara2", quote: "胎蔵界曼荼羅では外金剛部院の北方（左側）に二像〜五像が配置され、男形は立って舞うもの、女形は座って篳篥を吹く、壺の鼓を右手に持ち左手の棒で叩く、大鼓を両手で打つ、などの姿で表される（楽天・歌天との混同が見られる）。" },
    ],
  },
  "t:gekongobu:book-north-38": { // 虛宿
    bija: "dha", sk: "Dhaniṣṭhā", grade: "single",
    note: "shimma 列 dha／na／ro，取與梵名 Dhaniṣṭhā 相應之 dha；異說 na・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「虚宿」（種字）", url: "https://shimma.info/j50/ki/#kyosyuku", quote: "種字は「ध（dha）」、「न（na）」、「रो（ro）」、真言は「唵陀儞灑莎呵（おんだにしゃそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「虚宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kyosyuku", quote: "胎蔵界曼荼羅外金剛部院では北方（左側）に配され、像容は右手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-north-39": { // 危宿
    bija: "śa", sk: "Śatabhiṣā", grade: "single",
    note: "shimma 僅列 śa，與梵名 Śatabhiṣā 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「危宿」（種字）", url: "https://shimma.info/j50/ki/#kisyuku3", quote: "種字は「श（śa）」、真言は「唵捨多毘娑莎呵（おんしゃたびしゃそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「危宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kisyuku3", quote: "胎蔵界曼荼羅外金剛部院では北方（左側）に配され、像容は右手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-north-40": { // 室宿
    bija: "bha", sk: "Pūrvabhadrapadā", grade: "single",
    note: "shimma 列 bha／ro，取與梵名 …bhadrapadā 相應之 bha；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「室宿」（種字）", url: "https://shimma.info/j50/si/#situsyuku", quote: "種字は「भ（bha）」、「रो（ro）」、真言は「唵発羅縛迦陀羅跛陀莎呵（おんほつらばかだらばだそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「室宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#situsyuku", quote: "胎蔵界曼荼羅外金剛部院では北方（左側）に配され、像容は右手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-north-41": { // 奎宿
    bija: "re", sk: "Revatī", grade: "single",
    note: "shimma 列 re／ro，取與梵名 Revatī 相應之 re；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「奎宿」（種字）", url: "https://shimma.info/j50/ke/#keisyuku", quote: "種字は「रे（re）」、「रो（ro）」、真言は「唵離婆底莎呵（おんりばていそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「奎宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ke/#keisyuku", quote: "胎蔵界曼荼羅外金剛部院では北方（左側）に配され、像容は両手で赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-north-42": { // 壁宿
    bija: "śa", sk: "Uttarabhadrapadā", grade: "single",
    note: "shimma 列 śa／ro，皆不與梵名 Uttarabhadrapadā 初字相應；取該站首列之 śa，異說 ro——存疑；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「壁宿」（種字）", url: "https://shimma.info/j50/he/#hekisyuku", quote: "種字は「श（śa）」、「रो（ro）」、真言は「唵欝多羅跋陀羅跛莎呵（おんうったらばだらばそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「壁宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/he/#hekisyuku", quote: "胎蔵界曼荼羅外金剛部院では北方（左側）に配され、像容は右手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-north-43": { // 胃宿
    bija: "bha", sk: "Bharaṇī", grade: "single",
    note: "shimma 列 bha／ro，取與梵名 Bharaṇī 相應之 bha；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「胃宿」（種字）", url: "https://shimma.info/j50/i/#isyuku", quote: "種字は「भ（bha）」、「रो（ro）」、真言は「唵婆羅尼莎呵（おんばらにそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「胃宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/i/#isyuku", quote: "胎蔵界曼荼羅外金剛部院では北方（左側）に配され、像容は右手に赤珠の乗った蓮を持ち、左手で蓮の茎を受ける。" },
    ],
  },
  "t:gekongobu:book-north-44": { // 婁宿
    bija: "a", sk: "Aśvinī", grade: "single",
    note: "shimma 列 a／ro，取與梵名 Aśvinī 相應之 a；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「婁宿」（種字）", url: "https://shimma.info/j50/ro/#rousyuku", quote: "種字は「अ（a）」、「रो（ro）」、真言は「唵阿説毘儞莎呵（おんあぜいびにそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「婁宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ro/#rousyuku", quote: "胎蔵界曼荼羅外金剛部院では北方（左側）に配され、像容は右手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-north-45": { // 少女宮
    bija: "ka", sk: "Kanyā", grade: "single",
    note: "即十二宮之女宮；shimma 列 hūṃ／ka，取與梵名 Kanyā 相應之 ka；異說 hūṃ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「女宮」（種字）", url: "https://shimma.info/j50/ni/#nyoguu", quote: "種字は「हूं（hūṃ）」、「क（ka）」、真言は「唵迦惹波多曳莎呵（おんかじゃはたえいそわか）」。" },
      { title: "神魔精妖名辞典「女宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ni/#nyoguu", quote: "妻や婦人を司るとされ、胎蔵界曼荼羅外金剛部院では北方（左側）に少女の姿（場合によっては二人）で描かれる。" },
    ],
  },
  "t:gekongobu:book-north-46": { // 蟹宮
    bija: "ka", sk: "Karkaṭaka", grade: "single",
    note: "shimma 僅列 ka，與梵名 Karkaṭaka 相應；mikkyo21f 梵名表記作 karkaṭāka；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「蟹宮」（種字）", url: "https://shimma.info/j50/ka/#kaiguu", quote: "種字は「क（ka）」、真言は「唵羯囉迦吒迦波多曳莎呵（おんかつらかたかはたえいそわか）」。" },
      { title: "神魔精妖名辞典「蟹宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#kaiguu", quote: "官公庁と弁舌を司るとされ、胎蔵界曼荼羅外金剛部院では北方（左側）に描かれる。" },
    ],
  },
  "t:gekongobu:book-north-47": { // 獅子宮
    bija: "si", sk: "Siṃha", grade: "single",
    note: "即十二宮之師子宮；shimma 列 si／siṃ，取首列 si（與梵名 Siṃha 相應）；異說 siṃ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「師子宮」（種字）", url: "https://shimma.info/j50/si/#sisiguu", quote: "種字は「सि（si）」、「सिं（siṃ）」。" },
      { title: "神魔精妖名辞典「師子宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#sisiguu", quote: "官位や財福を司るとされ、胎蔵界曼荼羅外金剛部院では北方（左側）に獅子の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-north-48": { // 金曜
    bija: "śu", sk: "Śukra", grade: "single",
    note: "shimma 金曜條明載胎蔵界外金剛部院，僅列 śu，與梵名 Śukra 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「金曜」（種字）", url: "https://shimma.info/j50/ki/#kinyou", quote: "種子は「शु（śu）」、真言は「唵戌羯羅誐駄嚩 羅惹野 室里迦里 娑嚩賀（おんしきゅやらぎゃだば あらんじゃや しりぎゃり そわか）」。" },
      { title: "神魔精妖名辞典「金曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kinyou", quote: "西方を司り、胎蔵界曼荼羅外金剛部院での像容は天衣を着け右手は胸に当て左手は指を曲げて挙げ足を交えて坐す。" },
    ],
  },
  "t:gekongobu:book-north-50": { // 毘那夜迦（歡喜天）
    bija: "gaḥ", sk: "Vināyaka", grade: "cross",
    note: "shimma 歓喜天條明言胎蔵界外金剛部院以「毘那夜迦」之名配單身歓喜天，列 gaḥ／hrīḥ，取 gaḥ（Gaṇapati 之初字）；ja.wikipedia 歓喜天亦作 gaḥ（二源相合）；異說 hrīḥ；雙源（shimma＋ja.wikipedia）",
    sources: [
      { title: "神魔精妖名辞典「歓喜天」（種字）", url: "https://shimma.info/j50/ka/#kangiten", quote: "種字は「गः（gaḥ）」、「ह्रीः（hrīḥ）」" },
      { title: "神魔精妖名辞典「歓喜天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#kangiten", quote: "胎蔵界曼荼羅の外金剛部院には「毘那夜迦」の名で単身の歓喜天が配されている。" },
      { title: "歓喜天 - Wikipedia", url: "https://ja.wikipedia.org/wiki/%E6%AD%93%E5%96%9C%E5%A4%A9", quote: "種子字はगः（gaḥ、ギャク）" },
    ],
  },
  "t:gekongobu:book-north-51": { // 摩訶迦羅
    bija: "ma", sk: "Mahākāla", grade: "single",
    note: "shimma 大黒天條明言胎蔵界外金剛部院北方伊舎那天下，僅列種字 ma；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「大黒天」（種字）", url: "https://shimma.info/j50/ta/#daikokuten", quote: "種字は「म（ma）」、印相は普印、三昧耶形は剣、刀、袋（本拠なし）、真言は「唵摩訶迦羅耶莎呵（おんまかからやそわか）」、「唵密止密止舍婆隷多羅羯帝莎呵（おんみしみししゃばれいたらかていそわか）」。" },
      { title: "神魔精妖名辞典「大黒天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ta/#daikokuten", quote: "胎蔵界曼荼羅では外金剛部院の北方（左側）伊舎那天の下に配される。" },
    ],
  },
  "t:gekongobu:book-south-08": { // 賢瓶宮
    bija: "ku", sk: "Kumbha", grade: "single",
    note: "shimma 瓶宮條僅列 ku，與梵名 Kumbha 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「瓶宮」（種字）", url: "https://shimma.info/j50/he/#beiguu", quote: "種字は「कु（ku）」、真言は「唵鳩槃波多曳莎呵（おんくはんはたえいそわか）」。" },
      { title: "神魔精妖名辞典「瓶宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/he/#beiguu", quote: "勝彊（勝つことと強いこと）を司るとされ、胎蔵界曼荼羅外金剛部院では南方（右側）に瓶の形で描かれる。" },
    ],
  },
  "t:gekongobu:book-south-09": { // 摩羯宮
    bija: "ma", sk: "Makara", grade: "single",
    note: "shimma 摩竭宮條僅列 ma；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「摩竭宮」（種字）", url: "https://shimma.info/j50/ma/#makatuguu", quote: "種字は「म（ma）」、真言は「唵摩伽羅波多曳莎呵（おんまからはたえいそわか）」。" },
      { title: "神魔精妖名辞典「摩竭宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ma/#makatuguu", quote: "戦いや諍いを司るとされ、胎蔵界曼荼羅外金剛部院では南方（右側）に「摩竭魚（まかつぎょ）」の形で描かれる。" },
    ],
  },
  "t:gekongobu:book-south-10": { // 雙魚宮
    bija: "mī", sk: "Mīna", grade: "single",
    note: "shimma 魚宮條列 mī／mi 二說，取首列 mī（與梵名 Mīna 長音相應）；異說 mi；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「魚宮」（種字）", url: "https://shimma.info/j50/ki/#gyoguu", quote: "種字は「मी（mī）」、「मि（mi）」、真言は「唵弥那波多曳莎呵（おんみなはたえいそわか）」。" },
      { title: "神魔精妖名辞典「魚宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#gyoguu", quote: "昇進や仕事を司るとされ、胎蔵界曼荼羅外金剛部院では南方（右側）に二匹の魚の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-south-11": { // 羅睺星
    bija: "rā", sk: "Rāhu", grade: "single",
    note: "shimma 羅睺曜條列 rā／ra，取與梵名 Rāhu 相應之 rā；異說 ra；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「羅睺曜」（種字）", url: "https://shimma.info/j50/ra/#ragoyou", quote: "種子は「रा（rā）」、「र（ra）」、真言は「唵羅戸曩阿素羅邏惹野塞摩捨都曩野扇底迦里娑嚩賀（おんらしのうあしららじゃやそましゃしやのうせんけきゃりそわか）」、三昧耶形は宮形。" },
      { title: "神魔精妖名辞典「羅睺曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ra/#ragoyou", quote: "胎蔵界曼荼羅外金剛部院での像容は雲中に忿怒面と両手が浮かんだ姿、あるいは火髪三面忿怒相で頭頂から蛇の首が立ち、胸から下が雲中に没した姿。" },
    ],
  },
  "t:gekongobu:book-south-12": { // 木曜
    bija: "bṛ", sk: "Bṛhaspati", grade: "single",
    note: "shimma 僅列 bṛ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「木曜」（種字）", url: "https://shimma.info/j50/mo/#mokuyou", quote: "種子は「बृ（bṛ）」、真言は「唵婆羅 訶薩鉢 底曩摩比跢嚩曩師 摩攞嚩羅駄寧 娑嚩賀（おんぼら かさんは ちなうまひたばなうし まらばらだねい そわか）」、三昧耶形は瓶口星。" },
      { title: "神魔精妖名辞典「木曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/mo/#mokuyou", quote: "東方を司り、胎蔵界曼荼羅外金剛部院での像容は右手の中指と薬指を曲げて親指で抑え、左手は腰に当てた姿か、猪頭冠を戴き左手に樹皮を持って立つ姿。" },
    ],
  },
  "t:gekongobu:book-south-13": { // 火曜
    bija: "a", sk: "Aṅgāraka", grade: "single",
    note: "shimma 僅列 a；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「火曜」（種字）", url: "https://shimma.info/j50/ka/#kayou", quote: "種子は「अ（a）」、真言は「唵阿誐羅嚕儗野 莎訶（おんあぎゃらろぎや そわか）」、三昧耶形は戟。" },
      { title: "神魔精妖名辞典「火曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#kayou", quote: "南方を司り、胎蔵界曼荼羅外金剛部院での像容は右手は腰に当て、左手は矛を持ち足を交差して坐す。" },
    ],
  },
  "t:gekongobu:book-south-14": { // 星宿
    bija: "ma", sk: "Maghā", grade: "single",
    note: "shimma 列 ma／na／ro，取與梵名 Maghā 相應之 ma；異說 na・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「星宿」（種字）", url: "https://shimma.info/j50/si/#syousyuku", quote: "種字は「म（ma）」、「न（na）」、「रो（ro）」、真言は「唵沙伽莎呵（おんしゃかそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「星宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#syousyuku", quote: "胎蔵界曼荼羅外金剛部院では南方（右側）に配され、像容は右手に赤珠の乗った蓮を持ち、左手は拳にして腰に当てる。" },
    ],
  },
  "t:gekongobu:book-south-15": { // 軫宿
    bija: "ha", sk: "Hastā", grade: "single",
    note: "shimma 列 ha／ro，取與梵名 Hastā 相應之 ha；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「軫宿」（種字）", url: "https://shimma.info/j50/si/#sinsyuku2", quote: "種字は「ह（ha）」、「रो（ro）」、真言は「唵訶莎多莎呵（おんかしゃたそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「軫宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#sinsyuku2", quote: "胎蔵界曼荼羅外金剛部院では南方（右側）に配され、像容は右手は胸に当て、左手は赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-south-16": { // 亢宿
    bija: "sva", sk: "Svātī", grade: "single",
    note: "shimma 列 sva／ro，取與梵名 Svātī 相應之 sva；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「亢宿」（種字）", url: "https://shimma.info/j50/ko/#kousyuku", quote: "種字は「स्व（sva）」、「रो（ro）」、真言は「唵薩婆底娑縛賀（おんさばていそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「亢宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ko/#kousyuku", quote: "胎蔵界曼荼羅外金剛部院では南方（右側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-south-17": { // 張宿
    bija: "mi", sk: "Pūrvaphalgunī", grade: "single",
    note: "shimma 列 mi／ro 二說，皆不與梵名 Pūrvaphalgunī 初字相應；取該站首列之 mi，異說 ro——此席種子存疑；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「張宿」（種字）", url: "https://shimma.info/j50/ti/#tyousyuku", quote: "種字は「मि（mi）」、「रो（ro）」、真言は「唵發魯縛頗勒窶抳莎呵（おんほつろばはろくにそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「張宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ti/#tyousyuku", quote: "胎蔵界曼荼羅外金剛部院では南方（右側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-south-18": { // 翼宿
    bija: "pa", sk: "Uttaraphalgunī", grade: "single",
    note: "shimma 列 pa／pra／ro；pa・pra 疑取 phalgunī 之音，取首列 pa，異說 pra・ro——存疑；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「翼宿」（種字）", url: "https://shimma.info/j50/yo/#yokusyuku", quote: "種字は「प（pa）」、「प्र（pra）」、「रो（ro）」、真言は「唵烏多羅頗勒窶莎呵（おんうたらはろくそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「翼宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/yo/#yokusyuku", quote: "胎蔵界曼荼羅外金剛部院では南方（右側）に配され、像容は左手に珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-south-19": { // 角宿
    bija: "ci", sk: "Citrā", grade: "single",
    note: "shimma 列 ci／ro，取與梵名 Citrā 相應之 ci；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「角宿」（種字）", url: "https://shimma.info/j50/ka/#kakusyuku", quote: "種字は「चि（ci）」、「रो（ro）」、真言は「唵質多羅娑嚩訶（おんしったらそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「角宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#kakusyuku", quote: "胎蔵界曼荼羅外金剛部院では南方（右側）に配され、像容は両手で赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-south-20": { // 氐宿
    bija: "vi", sk: "Viśākhā", grade: "single",
    note: "shimma 列 vi／ro，取與梵名 Viśākhā 相應之 vi；異說 ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「氐宿」（種字）", url: "https://shimma.info/j50/te/#teisyuku", quote: "種字は「वि（vi）」、「रो（ro）」、真言は「唵蘇舍佉娑縛賀（おんそしゃきゃそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「氐宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/te/#teisyuku", quote: "胎蔵界曼荼羅外金剛部院では南方（右側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-south-24": { // 增長天
    bija: "vi", sk: "Virūḍhaka", grade: "single",
    note: "shimma 僅列 vi，與梵名 Virūḍhaka 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「増長天」（種字）", url: "https://shimma.info/j50/so/#zoujouten", quote: "種字は「वि（vi）」、三昧耶形は刀、戟。" },
      { title: "神魔精妖名辞典「増長天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/so/#zoujouten", quote: "南方の守護神として、胎蔵界曼荼羅では外金剛部院の南方（右）中央に配置される。" },
    ],
  },
  "t:gekongobu:book-south-28": { // 阿修羅
    bija: "a", sk: "Asura", grade: "single",
    note: "shimma 阿修羅條明載胎蔵界外金剛部院南方二處，僅列種字 a；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「阿修羅」（種字）", url: "https://shimma.info/j50/a/#asyura", quote: "種字は「अ（a）」、真言は「南麼三曼多勃馱喃囉吒囉吒特𢢺耽沒囉波囉（なうまくさまんだぼだなんらたんらたんとぼうたんばらはら）」（諸阿修羅真言・T0848）、「唵毘摩質多羅阿蘇羅地波多曳莎訶（おんびましたらあそらちはたえいそわか）」。" },
      { title: "神魔精妖名辞典「阿修羅」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/a/#asyura", quote: "胎蔵界曼荼羅では外金剛部院の南方（右側）に二か所に配される。" },
    ],
  },
  "t:gekongobu:book-south-29": { // 阿修羅
    bija: "a", sk: "Asura", grade: "single",
    note: "shimma 阿修羅條明載胎蔵界外金剛部院南方二處，僅列種字 a；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「阿修羅」（種字）", url: "https://shimma.info/j50/a/#asyura", quote: "種字は「अ（a）」、真言は「南麼三曼多勃馱喃囉吒囉吒特𢢺耽沒囉波囉（なうまくさまんだぼだなんらたんらたんとぼうたんばらはら）」（諸阿修羅真言・T0848）、「唵毘摩質多羅阿蘇羅地波多曳莎訶（おんびましたらあそらちはたえいそわか）」。" },
      { title: "神魔精妖名辞典「阿修羅」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/a/#asyura", quote: "胎蔵界曼荼羅では外金剛部院の南方（右側）に二か所に配される。" },
    ],
  },
  "t:gekongobu:book-south-31": { // 黑暗天女
    bija: "ka", sk: "Kālarātrī", grade: "single",
    note: "shimma 黒闇天條列 ka／taṃ，取與梵名 Kālarātrī 相應之 ka；異說 taṃ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「黒闇天」（種字）", url: "https://shimma.info/j50/ko/#kokuanten", quote: "種字は「क（ka）」、「तं（taṃ）」、印相は左手を胎拳にして人差し指と中指を伸ばすもの、あるいは普印、真言は「曩莫三満多 沒駄喃迦攞囉底哩曳娑嚩賀（のうまくさんまんたぼだなんかららていりえいそわか）」" },
      { title: "神魔精妖名辞典「黒闇天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ko/#kokuanten", quote: "胎蔵界曼荼羅の外金剛部院に閻魔の侍尊として描かれる。" },
    ],
  },
  "t:gekongobu:book-south-32": { // 太山府君
    bija: "ci", sk: "Citragupta", grade: "single",
    note: "shimma 泰山府君條種字 ci（與該尊胎蔵席位梵名 Citragupta 相應），但該條本身未言外金剛部院；席位之繫屬據 shimma『大悲胎蔵生曼荼羅』席位表 242 太山府君 Citragupta；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「泰山府君」（種字）", url: "https://shimma.info/j50/ta/#taizanhukun", quote: "種字は「चि（ci）」、三昧耶形は人頭棒。" },
    ],
  },
  "t:gekongobu:book-south-43": { // 荼吉尼
    bija: "ḍa", sk: "Ḍākinī", grade: "cross",
    note: "shimma 荼枳尼天條明言胎蔵界最外院（外金剛部院）南方三組荼枳尼天，種字 ḍa；ja.wikipedia 亦作 ḍa（二源相合）；雙源（shimma＋ja.wikipedia）",
    sources: [
      { title: "神魔精妖名辞典「荼枳尼天」（種字）", url: "https://shimma.info/j50/ta/#dakiniten", quote: "種字は「ड（ḍa）」、三昧耶形は鉢皿、真言は「南麼三曼多勃馱喃訶唎訶（なうまくさまんだぼだなんきりかく）」（諸茶吉尼真言・T0848）。" },
      { title: "神魔精妖名辞典「荼枳尼天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ta/#dakiniten", quote: "こうした死肉を喰らう鬼女としての荼枳尼天は、胎蔵界曼荼羅の最外院（外金剛部院）の南方に描かれる三組の荼枳尼天に見ることができる。" },
      { title: "荼枳尼天 - Wikipedia", url: "https://ja.wikipedia.org/wiki/%E8%8D%BC%E6%9E%B3%E5%B0%BC%E5%A4%A9", quote: "種字は「ダ (ड、ḍa)」である" },
    ],
  },
  "t:gekongobu:book-south-44": { // 荼吉尼
    bija: "ḍa", sk: "Ḍākinī", grade: "cross",
    note: "shimma 荼枳尼天條明言胎蔵界最外院（外金剛部院）南方三組荼枳尼天，種字 ḍa；ja.wikipedia 亦作 ḍa（二源相合）；雙源（shimma＋ja.wikipedia）",
    sources: [
      { title: "神魔精妖名辞典「荼枳尼天」（種字）", url: "https://shimma.info/j50/ta/#dakiniten", quote: "種字は「ड（ḍa）」、三昧耶形は鉢皿、真言は「南麼三曼多勃馱喃訶唎訶（なうまくさまんだぼだなんきりかく）」（諸茶吉尼真言・T0848）。" },
      { title: "神魔精妖名辞典「荼枳尼天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ta/#dakiniten", quote: "こうした死肉を喰らう鬼女としての荼枳尼天は、胎蔵界曼荼羅の最外院（外金剛部院）の南方に描かれる三組の荼枳尼天に見ることができる。" },
      { title: "荼枳尼天 - Wikipedia", url: "https://ja.wikipedia.org/wiki/%E8%8D%BC%E6%9E%B3%E5%B0%BC%E5%A4%A9", quote: "種字は「ダ (ड、ḍa)」である" },
    ],
  },
  "t:gekongobu:book-south-45": { // 荼吉尼
    bija: "ḍa", sk: "Ḍākinī", grade: "cross",
    note: "shimma 荼枳尼天條明言胎蔵界最外院（外金剛部院）南方三組荼枳尼天，種字 ḍa；ja.wikipedia 亦作 ḍa（二源相合）；雙源（shimma＋ja.wikipedia）",
    sources: [
      { title: "神魔精妖名辞典「荼枳尼天」（種字）", url: "https://shimma.info/j50/ta/#dakiniten", quote: "種字は「ड（ḍa）」、三昧耶形は鉢皿、真言は「南麼三曼多勃馱喃訶唎訶（なうまくさまんだぼだなんきりかく）」（諸茶吉尼真言・T0848）。" },
      { title: "神魔精妖名辞典「荼枳尼天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ta/#dakiniten", quote: "こうした死肉を喰らう鬼女としての荼枳尼天は、胎蔵界曼荼羅の最外院（外金剛部院）の南方に描かれる三組の荼枳尼天に見ることができる。" },
      { title: "荼枳尼天 - Wikipedia", url: "https://ja.wikipedia.org/wiki/%E8%8D%BC%E6%9E%B3%E5%B0%BC%E5%A4%A9", quote: "種字は「ダ (ड、ḍa)」である" },
    ],
  },
  "t:gekongobu:book-south-54": { // 阿修羅
    bija: "a", sk: "Asura", grade: "single",
    note: "shimma 阿修羅條明載胎蔵界外金剛部院南方二處，僅列種字 a；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「阿修羅」（種字）", url: "https://shimma.info/j50/a/#asyura", quote: "種字は「अ（a）」、真言は「南麼三曼多勃馱喃囉吒囉吒特𢢺耽沒囉波囉（なうまくさまんだぼだなんらたんらたんとぼうたんばらはら）」（諸阿修羅真言・T0848）、「唵毘摩質多羅阿蘇羅地波多曳莎訶（おんびましたらあそらちはたえいそわか）」。" },
      { title: "神魔精妖名辞典「阿修羅」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/a/#asyura", quote: "胎蔵界曼荼羅では外金剛部院の南方（右側）に二か所に配される。" },
    ],
  },
  "t:gekongobu:book-south-57": { // 迦樓羅
    bija: "ga", sk: "Garuḍa", grade: "single",
    note: "shimma 迦楼羅條明言胎蔵界外金剛部院南方配迦楼羅王・迦楼羅女二尊，列 ga／hūṃ／ro，取與梵名 Garuḍa 相應之 ga；ja.wikipedia 亦作「ガ」（二源相合）；異說 hūṃ・ro；雙源（shimma＋ja.wikipedia）",
    sources: [
      { title: "神魔精妖名辞典「迦楼羅」（種字）", url: "https://shimma.info/j50/ka/#karura", quote: "種字は「ग（ga）」、「हूं（hūṃ）」、「रो（ro）」、印相は両手を親指で組んで残りの指を伸ばして広げる、広げた羽を模したもの、真言は「唵誐樓拏野娑婆呵（おんがろなやそわか）」、三昧耶形は宝螺、篳篥。" },
      { title: "神魔精妖名辞典「迦楼羅」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#karura", quote: "胎蔵界曼荼羅外金剛部院には鳥頭人身の「迦楼羅王（かるらおう）」と「迦楼羅女（かるらにょ）」の二尊が南方（右側）に配される。" },
      { title: "迦楼羅 - Wikipedia", url: "https://ja.wikipedia.org/wiki/%E8%BF%A6%E6%A8%93%E7%BE%85", quote: "種子（種子字）は「ガ」である" },
    ],
  },
  "t:gekongobu:book-south-58": { // 迦樓羅
    bija: "ga", sk: "Garuḍa", grade: "single",
    note: "shimma 迦楼羅條明言胎蔵界外金剛部院南方配迦楼羅王・迦楼羅女二尊，列 ga／hūṃ／ro，取與梵名 Garuḍa 相應之 ga；ja.wikipedia 亦作「ガ」（二源相合）；異說 hūṃ・ro；雙源（shimma＋ja.wikipedia）",
    sources: [
      { title: "神魔精妖名辞典「迦楼羅」（種字）", url: "https://shimma.info/j50/ka/#karura", quote: "種字は「ग（ga）」、「हूं（hūṃ）」、「रो（ro）」、印相は両手を親指で組んで残りの指を伸ばして広げる、広げた羽を模したもの、真言は「唵誐樓拏野娑婆呵（おんがろなやそわか）」、三昧耶形は宝螺、篳篥。" },
      { title: "神魔精妖名辞典「迦楼羅」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#karura", quote: "胎蔵界曼荼羅外金剛部院には鳥頭人身の「迦楼羅王（かるらおう）」と「迦楼羅女（かるらにょ）」の二尊が南方（右側）に配される。" },
      { title: "迦楼羅 - Wikipedia", url: "https://ja.wikipedia.org/wiki/%E8%BF%A6%E6%A8%93%E7%BE%85", quote: "種子（種子字）は「ガ」である" },
    ],
  },
  "t:gekongobu:book-west-04": { // 大自在天
    bija: "ma", sk: "Maheśvara", grade: "single",
    note: "shimma 大自在天條列 ma／ru，取與梵名 Maheśvara 相應之 ma；異說 ru。該條未明言外金剛部院，席位之繫屬據 shimma 席位表 275 大自在 Maheśvara；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「大自在天」（種字）", url: "https://shimma.info/j50/ta/#daizizaiten", quote: "種字は「म（ma）」、「रु（ru）」、三昧耶形は三股戟。" },
    ],
  },
  "t:gekongobu:book-west-07": { // 帝釋女
    bija: "ai", sk: "Indrāṇī", grade: "single",
    note: "shimma 印捺里（帝釈女・帝釈天后）條明言「七母女天のほか胎蔵界曼荼羅の外金剛部院にも配される」，僅列種字 ai（Aindrī 之初字）；該站席位表 278 帝釈女 Śakrānī／Indrāṇī 正繫此條；mikkyo21f 梵名表記作 śakrāṇi；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「印捺里」（種字）", url: "https://shimma.info/j50/i/#indari", quote: "種字は「ऐ（ai）」。" },
      { title: "神魔精妖名辞典「印捺里」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/i/#indari", quote: "七母女天のほか胎蔵界曼荼羅の外金剛部院にも配される。" },
    ],
  },
  "t:gekongobu:book-west-12": { // 水曜
    bija: "bu", sk: "Budha", grade: "single",
    note: "shimma 僅列 bu，與梵名 Budha 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「水曜」（種字）", url: "https://shimma.info/j50/su/#suiyou", quote: "種子は「बु（bu）」、真言は「唵母駄曩乞殺 怛羅 弭曩 契努摩 莎賀（おんぼだのうきっしゃ たら びなう けいどま そか）」。" },
      { title: "神魔精妖名辞典「水曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/su/#suiyou", quote: "北方を司り、胎蔵界曼荼羅外金剛部院での像容は合掌して足を交差させた姿か、左手に瓶、右手に念珠を持ち半跏で蓮華座に坐す。" },
    ],
  },
  "t:gekongobu:book-west-13": { // 土曜
    bija: "śa", sk: "Śani", grade: "single",
    note: "shimma 列 śa／pṛ，取與梵名 Śani 相應之 śa；異說 pṛ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「土曜」（種字）", url: "https://shimma.info/j50/to/#doyou", quote: "種子は「श（śa）」、「पृ（pṛ）」、真言は「唵捨泥殺作 羅曩乞殺 怛羅 跛羅 訶摩曩嚕波野 普瑟底 迦里 莎訶（おんしゃにししゃ らなうきししゃ たら はら かまなうろばや ほしゅち しやり そわか）」、三昧耶形は錫杖。" },
      { title: "神魔精妖名辞典「土曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/to/#doyou", quote: "中方を司り、胎蔵界曼荼羅外金剛部院での像容は鹿皮の裙（くん＝腰衣）を着け右手に杖（仙杖）をもつ上半身が裸の老人の姿。" },
    ],
  },
  "t:gekongobu:book-west-14": { // 月曜
    bija: "ca", sk: "Candra", grade: "single",
    note: "shimma 列 ca／su（ca←Candra、su←Soma），取首列 ca；書載席位梵名一作 Soma，則 su 亦通——異說並存；mikkyo21f 梵名表記作 soma；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「月曜」（種字）", url: "https://shimma.info/j50/ka/#gatuyou", quote: "種子は「च（ca）」、「सु（su）」、真言は「唵戦 怛羅 曩乞灑 怛羅 邏惹野 設底 娑婆賀（おんせん たら なうきっしゃ たら あらんじゃや せんち そわか）」、三昧耶形は兎の乗った半月。" },
      { title: "神魔精妖名辞典「月曜」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#gatuyou", quote: "北西を司り、胎蔵界曼荼羅外金剛部院での像容は羯磨衣を着け右手に兎の乗った半月を乗せ、左手は胸に当て5羽の鳩に足を交えて坐す。" },
    ],
  },
  "t:gekongobu:book-west-15": { // 秤宮
    bija: "tu", sk: "Tulā", grade: "single",
    note: "shimma 列 tu／śa，取與梵名 Tulā 相應之 tu；異說 śa；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「秤宮」（種字）", url: "https://shimma.info/j50/hi/#hyouguu", quote: "種字は「तु（tu）」、「श（śa）」、真言は「唵兜羅波多曳莎呵（おんとらはたえいそわか）」。" },
      { title: "神魔精妖名辞典「秤宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/hi/#hyouguu", quote: "宝庫を司るとされ、胎蔵界曼荼羅外金剛部院では西方（下側）に秤の形ないし秤を持った人の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-west-16": { // 蠍蟲宮
    bija: "vṛ", sk: "Vṛścika", grade: "single",
    note: "即十二宮之蝎宮；shimma 僅列 vṛ；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「蝎宮」（種字）", url: "https://shimma.info/j50/ka/#katuguu", quote: "種字は「वृ（vṛ）」、真言は「唵毘利支迦波多曳莎呵（おんびりしかはたえいそわか）」。" },
      { title: "神魔精妖名辞典「蝎宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ka/#katuguu", quote: "病気や禁忌を司るとされ、胎蔵界曼荼羅外金剛部院では西方（下側）にサソリの形で描かれる。" },
    ],
  },
  "t:gekongobu:book-west-17": { // 弓宮
    bija: "dhaṃ", sk: "Dhanus", grade: "single",
    note: "shimma 列 dhaṃ／dha 二說，取首列 dhaṃ；異說 dha；mikkyo21f 梵名表記作 dhanu；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「弓宮」（種字）", url: "https://shimma.info/j50/ki/#kyuuguu", quote: "種字は「धं（dhaṃ）」、「ध（dha）」、真言は「唵檀莵波多曳莎呵（おんだんとはたえいそわか）」。" },
      { title: "神魔精妖名辞典「弓宮」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kyuuguu", quote: "吉慶や財福を司るとされ、胎蔵界曼荼羅外金剛部院では西方（下側）に弓の形か弓を持つ人の姿で描かれる。" },
    ],
  },
  "t:gekongobu:book-west-18": { // 女宿
    bija: "śra", sk: "Śravaṇā", grade: "single",
    note: "shimma 列 śra／na／ro，取與梵名 Śravaṇā 相應之 śra；異說 na・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「女宿」（種字）", url: "https://shimma.info/j50/si/#josyuku", quote: "種字は「श्र（śra）」、「न（na）」、「रो（ro）」、真言は「唵失羅縛那莎呵（おんしらばなそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「女宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#josyuku", quote: "胎蔵界曼荼羅外金剛部院では西方（下側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-west-19": { // 牛宿
    bija: "a", sk: "Abhijit", grade: "single",
    note: "shimma 僅列 a，與梵名 Abhijit 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「牛宿」（種字）", url: "https://shimma.info/j50/ki/#gyuusyuku", quote: "種字は「अ（a）」、真言は「唵阿訖沙莎呵（おんあきしゃそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「牛宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#gyuusyuku", quote: "胎蔵界曼荼羅外金剛部院では西方（下側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-west-20": { // 斗宿
    bija: "ma", sk: "Uttarāṣāḍhā", grade: "single",
    note: "shimma 列 ma／na／ro，皆不與梵名 Uttarāṣāḍhā 初字相應；取該站首列之 ma，異說 na・ro——存疑；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「斗宿」（種字）", url: "https://shimma.info/j50/to/#tosyuku", quote: "種字は「म（ma）」、「न（na）」、「रो（ro）」、真言は「唵烏多羅阿娑努莎呵（おんうたらあしゃぬそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「斗宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/to/#tosyuku", quote: "胎蔵界曼荼羅外金剛部院では西方（下側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-west-21": { // 尾宿
    bija: "mu", sk: "Mūla", grade: "single",
    note: "shimma 僅列 mu，與梵名 Mūla 相應；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「尾宿」（種字）", url: "https://shimma.info/j50/hi/#bisyuku", quote: "種字は「मु（mu）」、真言は「唵慕羅娑縛賀（おんぼらそわか）」（T2476）、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「尾宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/hi/#bisyuku", quote: "胎蔵界曼荼羅外金剛部院では西方（下側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-west-22": { // 箕宿
    bija: "a", sk: "Pūrvāṣāḍhā", grade: "single",
    note: "shimma 僅列 a（āṣāḍhā 之初字）；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「箕宿」（種字）", url: "https://shimma.info/j50/ki/#kisyuku2", quote: "種字は「अ（a）」、真言は「唵補魯縛跛阿娑努莎呵（おんふろばはあしゃぬそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「箕宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ki/#kisyuku2", quote: "胎蔵界曼荼羅外金剛部院では西方（下側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-west-23": { // 房宿
    bija: "a", sk: "Anurādhā", grade: "single",
    note: "shimma 列 a／na／ro，取與梵名 Anurādhā 相應之 a；異說 na・ro；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「房宿」（種字）", url: "https://shimma.info/j50/ho/#bousyuku2", quote: "種字は「अ（a）」、「न（na）」、「रो（ro）」、真言は「唵阿㝹羅他娑嚩賀（おんあぬらたそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「房宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ho/#bousyuku2", quote: "胎蔵界曼荼羅外金剛部院では西方（下側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-west-24": { // 心宿
    bija: "je", sk: "Jyeṣṭhā", grade: "single",
    note: "shimma 列 je／jye，取與梵名 Jyeṣṭhā 相應之 je；異說 jye；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「心宿」（種字）", url: "https://shimma.info/j50/si/#sinsyuku3", quote: "種字は「जे（je）」、「ज्ये（jye）」、真言は「唵逝瑟吒娑縛賀（おんせいしたそわか）」、三昧耶形は蓮上星。" },
      { title: "神魔精妖名辞典「心宿」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/si/#sinsyuku3", quote: "胎蔵界曼荼羅外金剛部院では西方（下側）に配され、像容は左手に赤珠の乗った蓮を持つ。" },
    ],
  },
  "t:gekongobu:book-west-31": { // 廣目天
    bija: "vi", sk: "Virūpākṣa", grade: "single",
    note: "shimma 広目天（毘楼博叉）條明載胎蔵界外金剛部院西方中央，列 vi／kṣa，取與梵名 Virūpākṣa 相應之 vi；異說 kṣa；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「広目天」（種字）", url: "https://shimma.info/j50/ko/#koumokuten", quote: "種字は「वि（vi）」、「क्ष（kṣa）」、三昧耶形は三股戟、索。" },
      { title: "神魔精妖名辞典「広目天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ko/#koumokuten", quote: "胎蔵界曼荼羅では西方の守護神として外金剛部院の西方（下）中央に配置される。" },
    ],
  },
  "t:gekongobu:book-west-35": { // 那羅延天
    bija: "vi", sk: "Nārāyaṇa", grade: "single",
    note: "shimma 那羅延天條明注「種字は「वि（vi）」（胎蔵界）、「म（ma）」（金剛界）」，胎蔵取 vi；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「那羅延天」（種字）", url: "https://shimma.info/j50/na/#naraenten", quote: "種字は「वि（vi）」（胎蔵界）、「म（ma）」（金剛界）、三昧耶形は輪、八輻鉄輪、印相は左手の人差し指と親指を相捻し輪のようにするもの、真言は「南麼三曼多勃馱喃（なうまくさまんだぼだなん）微瑟儜吠（びしゅだべい）莎訶（そわか）」" },
      { title: "神魔精妖名辞典「那羅延天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/na/#naraenten", quote: "那羅延天としては右面が猪、左面が獅子、中面が菩薩形の三面二臂に青黒い身体、右手に輪宝を持ち「迦楼羅（かるら）」に乗った姿（胎蔵界曼荼羅外金剛部院）、或いは一面二臂で荷葉座に坐した姿（金剛界曼荼羅外金剛部院）で描かれる。" },
    ],
  },
  "t:gekongobu:book-west-37": { // 辯才天
    bija: "sa", sk: "Sarasvatī", grade: "cross",
    note: "shimma 弁財天條列 sa／su，取與梵名 Sarasvatī 相應之 sa；ja.wikipedia 弁才天亦首列 sa（二源相合）。二源皆未專就外金剛部院立說，席位之繫屬據 shimma 席位表 308 弁才天 Sarasvatī；雙源（shimma＋ja.wikipedia）",
    sources: [
      { title: "神魔精妖名辞典「弁財天」（種字）", url: "https://shimma.info/j50/he/#benzaiten", quote: "種字は「स（sa）」、「सु（su）」、三昧耶形は琵琶。" },
      { title: "弁才天 - Wikipedia", url: "https://ja.wikipedia.org/wiki/%E5%BC%81%E6%89%8D%E5%A4%A9", quote: "種字（種子字）はस（ソ、sa）、उ（ウ、u）,ह्रीं（キリーン、hrīṃ）" },
    ],
  },
  "t:gekongobu:book-west-38": { // 鳩摩羅天
    bija: "ku", sk: "Kumāra", grade: "single",
    note: "shimma 鳩摩羅天條明載胎蔵界外金剛部院西方，列 ku／ska，取與梵名 Kumāra 相應之 ku；異說 ska；單源（shimma 神魔精妖名辞典）",
    sources: [
      { title: "神魔精妖名辞典「鳩摩羅天」（種字）", url: "https://shimma.info/j50/ku/#kumaraten", quote: "種字は「कु（ku）」、「स्क（ska）」、三昧耶形は槊、三鈷鈴、印相は左手の五指を垂らし中指を中ほどに置く鈴印、真言は「唵嚩日羅健吒」（倶摩羅天真言・T2400）。" },
      { title: "神魔精妖名辞典「鳩摩羅天」（胎蔵界外金剛部院之席位）", url: "https://shimma.info/j50/ku/#kumaraten", quote: "胎蔵界曼荼羅では外金剛部院の西方（下部）に、金剛界曼荼羅には二十天の一人として東方（下部）に配される。" },
    ],
  },
  "t:henchi:03": { // 大勇猛菩薩
    bija: "ka", sk: "mahāvīra", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「大勇猛菩薩」", url: "https://shimma.info/j50/ta/item_daiyuumyoubosatu.html", quote: "種字は「क（ka）」、密号は「厳迅金剛（ごんじんこんごう）」、三昧耶形は如意宝珠。" },
      { title: "MANDALA DUALISM 諸仏解説：遍知院 6.大勇猛菩薩（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/02.html", quote: "［梵名］ マハーヴィーラ ［梵名表記］ mahāvīra" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」015 遍知院", url: "https://shimma.info/special/taizou.html#015", quote: "大勇猛菩薩 マハーヴィーラ Mahāvīra" },
    ],
  },
  "t:henchi:05": { // 大安樂不空真實菩薩
    bija: "yuḥ", sk: "vajrāmoghasamayasattva", grade: "cross",
    note: "二源。書名「大安樂不空真實菩薩」＝普賢延命菩薩（shimma 意味訳作「大安楽不空真実菩薩」；ja.wikipedia「遍知院」右端作「大安楽不空真実金剛／普賢延命菩薩」；mikkyo21f 遍知院第七位作普賢延命菩薩）。shimma 列種字 yu／yuḥ／aḥ／hūṃ，ja.wikipedia 作 yuḥ，二源共有者為 yuḥ，故取 yuḥ。梵名異說：shimma 付表作 Vajrāmoghas",
    sources: [
      { title: "神魔精妖名辞典「普賢延命菩薩」", url: "https://shimma.info/j50/hu/item_hugenenmeibosatu.html", quote: "種字は「यु（yu）」、「युः（yuḥ）」、「अः（aḥ）」、「हूं（hūṃ）」、三昧耶形は甲冑、五鈷杵、印相は両手を金剛拳にし人差し指を鉤にして互いに組んだもの、真言は「唵縛曰羅喩勢娑縛訶（おんばさらゆせいそわか）」" },
      { title: "MANDALA DUALISM 諸仏解説：遍知院 7.普賢延命菩薩（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/02.html", quote: "［梵名］ サマンタバドラーユス ［梵名表記］ samantabhadrāyus" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」016 遍知院", url: "https://shimma.info/special/taizou.html#016", quote: "大安楽不空金剛三昧耶真実菩薩 ヴァジュラーモーガサマヤタットヴァ Vajrāmoghasamayatattva" },
      { title: "普賢延命菩薩 - Wikipedia（ja）", url: "https://ja.wikipedia.org/wiki/%E6%99%AE%E8%B3%A2%E5%BB%B6%E5%91%BD%E8%8F%A9%E8%96%A9", quote: "種子はヨク（युः 、yuḥ）" },
    ],
  },
  "t:jizo:01": { // 除一切憂冥菩薩
    bija: "daṃ", sk: "sarvaśokatamoghātamati", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 立目「除憂闇菩薩」，意譯含「除一切憂冥菩薩」。種字分注：胎蔵界「दं（daṃ）」「क（ka）」，金剛界 aṃ／āṃ／hūṃ；取胎蔵界首出 daṃ，ka 為同院異說。 梵名出 mikkyo21f《MANDALA DUALISM》地蔵院頁「梵名表記」：sarvaśokatamoghātamati。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）除憂闇菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/si/item_joyuuanbosatu.html", quote: "胎蔵界曼荼羅 では 地蔵院…種字 は「 दं（daṃ） 」、「 क（ka） 」" },
    ],
  },
  "t:jizo:02": { // 不空見菩薩
    bija: "aḥ", sk: "amoghadarśana", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「अः（aḥ）」「क（ka）」而未分兩界，取首出 aḥ；此尊兼列金剛界賢劫十六大菩薩，ka 之歸屬待核。 梵名出 mikkyo21f《MANDALA DUALISM》地蔵院頁「梵名表記」：amoghadarśana。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）不空見菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/hu/item_hukuukenbosatu.html", quote: "胎蔵界曼荼羅 の 地蔵院…種字 は「 अः（aḥ） 」、「 क（ka） 」" },
    ],
  },
  "t:jizo:03": { // 寶印手菩薩（寶掌）
    bija: "phaṃ", sk: "ratnamudrāhasta", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「फं（phaṃ）」「हं（haṃ）」，取首出（與 T0848 寶印手真言「泛」相應）。書載括註「寶掌」；shimma 此尊別名作「寶印掌菩薩」，而「寶掌」亦為寶手・寶處之別名，配名以「寶印手」為準。 梵名出 mikkyo21f《MANDALA DUALISM》地蔵院頁「梵名表記」：ratnamudrāhasta。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）宝印手菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ho/item_houinsyubosatu.html", quote: "胎蔵界曼荼羅 の 地蔵院…種字 は「 फं（phaṃ） 」、「 हं（haṃ） 」" },
    ],
  },
  "t:jizo:06": { // 寶手菩薩
    bija: "ṣaṃ", sk: "ratnapāṇi", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 與 T0848 寶手真言「衫」相應。 梵名出 mikkyo21f《MANDALA DUALISM》地蔵院頁「梵名表記」：ratnapāṇi。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）宝手菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ho/item_housyubosatu.html", quote: "胎蔵界曼荼羅 の 地蔵院…種字 は「 षं（ṣaṃ） 」" },
    ],
  },
  "t:jizo:07": { // 持地菩薩
    bija: "ṅaṃ", sk: "dharaṇidhara", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》地蔵院頁「梵名表記」：dharaṇidhara。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）持地菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/si/item_zizibosatu.html", quote: "胎蔵界曼荼羅 の 地蔵院…種字 は「 ङं（ṅaṃ） 」" },
    ],
  },
  "t:jizo:08": { // 堅固深心菩薩
    bija: "ṇaṃ", sk: "dṛḍhādhyāśaya", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 別名堅固意・堅意菩薩。 梵名出 mikkyo21f《MANDALA DUALISM》地蔵院頁「梵名表記」：dṛḍhādhyāśaya。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）堅固深心菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ke/item_kengozinsinbosatu.html", quote: "胎蔵界曼荼羅 の 地蔵院…種字 は「 णं（ṇaṃ） 」" },
    ],
  },
  "t:jokaisho:02": { // 破惡趣菩薩
    bija: "dhvaṃ", sk: "apāyajaha", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「ध्बं（dhbaṃ）」「ध्वं（dhvaṃ）」「भा（bhā）」，前二為同一音節異寫，取 dhvaṃ（與 T0848 除一切惡趣真言「特懵」相應）；bhā 疑屬金剛界賢劫十六尊之種子。 梵名出 mikkyo21f《MANDALA DUALISM》除蓋障院頁「梵名表記」：apāyajaha。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）除悪趣菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/si/item_joakusyubosatu.html", quote: "胎蔵界曼荼羅 では 除蓋障院…種字 は「 ध्बं（dhbaṃ） 」、「 ध्वं（dhvaṃ） 」、「 भा（bhā） 」" },
    ],
  },
  "t:jokaisho:03": { // 施無畏菩薩
    bija: "ra", sk: "abhayaṃdada", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 標出典《両部曼荼羅私抄》。書載「施無畏」＝ja.wikipedia「設無畏菩薩」。 梵名出 mikkyo21f《MANDALA DUALISM》除蓋障院頁「梵名表記」：abhayaṃdada。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）施無畏菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/se/item_semuibosatu.html", quote: "胎蔵界曼荼羅 の 除蓋障院…種字 は「 र（ra） 」" },
    ],
  },
  "t:jokaisho:04": { // 賢護菩薩
    bija: "ha", sk: "bhadrapāla", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 將種字按兩界分注：胎蔵界作「ह（ha）」「स（sa）」「नं（naṃ）」，金剛界作 pra／pṛ；取胎蔵界首出 ha（與 T0848 除疑怪真言「訶」相應）。胎蔵界此尊即「除疑怪菩薩」。 梵名出 mikkyo21f《MANDALA DUALISM》除蓋障院頁「梵名表記」：bhadrapāla。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）賢護菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ke/item_kengobosatu.html", quote: "胎蔵界曼荼羅 では除疑怪菩薩として 除蓋障院…種字 は「 ह（ha） 」、「 स（sa） 」、「 नं（naṃ） 」" },
    ],
  },
  "t:jokaisho:05": { // 不思議慧菩薩
    bija: "u", sk: "acintyamatidatta", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 別名不思議恵菩薩；與除蓋障菩薩、日光菩薩三尊像容近似，古來位次相混。 梵名出 mikkyo21f《MANDALA DUALISM》除蓋障院頁「梵名表記」：acintyamatidatta。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）不思議恵菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/hu/item_husigiebosatu.html", quote: "胎蔵界曼荼羅 の 除蓋障院…種字 は「 उ（u） 」" },
    ],
  },
  "t:jokaisho:07": { // 慈發生菩薩
    bija: "ṭhaṃ", sk: "maitryabhyudgata", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 別名大慈生・慈生・大慈起菩薩。 梵名出 mikkyo21f《MANDALA DUALISM》除蓋障院頁「梵名表記」：maitryabhyudgata。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）慈発生菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/si/item_zihossyoubosatu.html", quote: "胎蔵界曼荼羅 の 除蓋障院…種字 は「 ठं（ṭhaṃ） 」" },
    ],
  },
  "t:jokaisho:08": { // 除一切熱惱菩薩
    bija: "ī", sk: "sarvadāhapraśamita", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 立目「除熱悩菩薩」，意譯名含「除一切熱悩」「折諸熱悩」，與書載同尊。 梵名出 mikkyo21f《MANDALA DUALISM》除蓋障院頁「梵名表記」：sarvadāhapraśamita。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）除熱悩菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/si/item_jonetunoubosatu.html", quote: "胎蔵界曼荼羅 の 除蓋障院…種字 は「 ई（ī） 」" },
    ],
  },
  "t:kokuzo:02": { // 檀波羅蜜菩薩
    bija: "da", sk: "dānapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 立目「檀那波羅蜜菩薩」。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：dānapāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）檀那波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ta/item_dannaharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 द（da） 」" },
    ],
  },
  "t:kokuzo:03": { // 戒波羅蜜菩薩
    bija: "śī", sk: "śīlapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：śīlapāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）戒波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ka/item_kaiharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 शी（śī） 」" },
    ],
  },
  "t:kokuzo:04": { // 忍辱波羅蜜菩薩
    bija: "kṣaṃ", sk: "kṣāntipāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「क्षं（kṣaṃ）」「वं（vaṃ）」，取首出。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：kṣāntipāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）忍辱波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ni/item_ninnikuharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 क्षं（kṣaṃ） 」、「 वं（vaṃ） 」" },
    ],
  },
  "t:kokuzo:05": { // 精進波羅蜜菩薩
    bija: "vī", sk: "vīryapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「वी（vī）」「वि（vi）」，取首出（長短之異）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：vīryapāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）精進波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/si/item_syouzinharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 वी（vī） 」、「 वि（vi） 」" },
    ],
  },
  "t:kokuzo:06": { // 禪波羅蜜菩薩
    bija: "dhyā", sk: "dhyānapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 立目「禪那波羅蜜菩薩」，並列「ध्या（dhyā）」「हूं（hūṃ）」，取首出。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：dhyānapāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）禅那波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/se/item_zennaharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 ध्या（dhyā） 」、「 हूं（hūṃ） 」" },
    ],
  },
  "t:kokuzo:07": { // 般若（慧）波羅蜜菩薩
    bija: "pra", sk: "prajñāpāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 按院分注：持明院作 dhiḥ／dhī／dhīḥ／jña，虚空蔵院作「प्र（pra）」——本席屬虚空蔵院十波羅蜜之般若，故取 pra，勿用持明院般若菩薩之種子。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：prajñāpāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）般若菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ha/item_hannyabosatu.html", quote: "胎蔵界曼荼羅 では 持明院 の主尊…ほか、 虚空蔵院 にも六波羅蜜の一尊として…配する。…種字 は…「 ज्ञ（jña） 」（持明院）、「 प्र（pra） 」（虚空蔵院）" },
    ],
  },
  "t:kokuzo:08": { // 方便波羅蜜菩薩
    bija: "me", sk: "upāyapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「मे（me）」「मै（mai）」，取首出。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：upāyapāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）方便波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ho/item_houbenharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 मे（me） 」、「 मै（mai） 」" },
    ],
  },
  "t:kokuzo:09": { // 願波羅蜜菩薩
    bija: "saṃ", sk: "praṇidhānapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）願波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ka/item_ganharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 सं（saṃ） 」" },
    ],
  },
  "t:kokuzo:10": { // 力波羅蜜菩薩
    bija: "jaḥ", sk: "balapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「जः（jaḥ）」「ब（ba）」，取首出。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：balapāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）力波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ri/item_rikiharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 जः（jaḥ） 」、「 ब（ba） 」" },
    ],
  },
  "t:kokuzo:11": { // 智波羅蜜菩薩
    bija: "jña", sk: "jñānapāramitā", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：jñānapāramitā。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）智波羅蜜菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ti/item_tiharamitubosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 ज्ञ（jña） 」" },
    ],
  },
  "t:kokuzo:12": { // 共發意轉輪菩薩
    bija: "riṃ", sk: "sahacittotpādadharmacakra", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：sahacittotpādadharmacakra。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）共発意転輪菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ku/item_guhottitenrinbosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 रिं（riṃ） 」" },
    ],
  },
  "t:kokuzo:13": { // 生念處菩薩
    bija: "gaṃ", sk: "smṛtisajātya", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 標出典《両部曼荼羅私抄》；大日經此位作清淨慧菩薩，有同體之說。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：smṛtisajātya。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）生念処菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/si/item_syounenjobosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 गं（gaṃ） 」" },
    ],
  },
  "t:kokuzo:14": { // 忿怒鉤觀音
    bija: "a", sk: "amoghakrodhāṅkuśarājāvalokiteśvara", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 標出典《両部曼荼羅私抄》。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：amoghakrodhāṅkuśarājāvalokiteśvara。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）忿怒鉤観自在菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/hu/item_hunnukoukanzizaibosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 अ（a） 」" },
    ],
  },
  "t:kokuzo:15": { // 不空鉤觀音
    bija: "dhi", sk: "amoghāṅkuśāvalokiteśvara", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 以「धि（dhi）」（両部曼荼羅私抄）為首出，另列「अ（a）」「स（sa）」；取 dhi。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：amoghāṅkuśāvalokiteśvara。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）不空鉤観自在菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/hu/item_hukuukoukanzizaibosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 धि（dhi） 」" },
    ],
  },
  "t:kokuzo:21": { // 無垢逝菩薩
    bija: "haṃ", sk: "vimalagata", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：vimalagata。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）無垢逝菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/mu/item_mukuseibosatu.html", quote: "胎蔵界曼荼羅 虚空蔵院…種字 は「 हं（haṃ） 」" },
    ],
  },
  "t:kokuzo:22": { // 蘇婆呼菩薩
    bija: "hūṃ", sk: "subāhu", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 立目「蘇婆胡菩薩」（呼／胡異寫），作「हूं（hūṃ）」ないし「सु（su）」，取首出。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：subāhu。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）蘇婆胡菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/so/item_sobakobosatu.html", quote: "胎蔵界曼荼羅 虚空蔵院…種字 は「 हूं（hūṃ） 」ないし「 सु（su） 」" },
    ],
  },
  "t:kokuzo:23": { // 金剛針菩薩
    bija: "hūṃ", sk: "vajrasūci", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：vajrasūci。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）金剛針菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ko/item_kongousinbosatu.html", quote: "胎蔵界曼荼羅 虚空蔵院…種字 は「 हूं（hūṃ） 」" },
    ],
  },
  "t:kokuzo:24": { // 蘇悉地羯羅菩薩
    bija: "ji", sk: "susiddhikara", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：susiddhikara。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）蘇悉地羯羅菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/so/item_sosituzikarabosatu.html", quote: "胎蔵界曼荼羅 虚空蔵院…種字 は「 जि（ji） 」" },
    ],
  },
  "t:kokuzo:25": { // 曼荼羅菩薩
    bija: "maṃ", sk: "mahācakra", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「मं（maṃ）」「हूं（hūṃ）」，取首出；此位或以蘇悉地羯羅菩薩代之。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：mahācakra。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）曼荼羅菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ma/item_mandarabosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 मं（maṃ） 」、「 हूं（hūṃ） 」" },
    ],
  },
  "t:kokuzo:26": { // 一百八臂金剛藏王菩薩
    bija: "hūṃ", sk: "aṣṭottaraśatabhujavajradhara", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 立目「金剛蔵王菩薩」，正名一百八臂金剛蔵王菩薩，明與金剛界賢劫十六尊之金剛蔵菩薩相區別。 梵名出 mikkyo21f《MANDALA DUALISM》虚空蔵院頁「梵名表記」：aṣṭottaraśatabhujavajradhara。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）金剛蔵王菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ko/item_kongouzououbosatu.html", quote: "胎蔵界曼荼羅 の 虚空蔵院…種字 は「 हूं（hūṃ） 」" },
    ],
  },
  "t:kongoshu:02": { // 發生金剛部菩薩
    bija: "va", sk: "vajrakulodbhava", grade: "cross",
    note: "種子2源（ja.wikipedia 金剛手院表＋shimma 逐尊頁）一致。梵名 mikkyo21f 原作 vajrakulodbhavabodhisattva，該條自註「以下ボーディサットヴァは略す」，故取 vajrakulodbhava。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "発生金剛部菩薩<br>ほっしょうこんごうぶぼさつ<br>va" },
      { title: "神魔精妖名辞典（shimma.info）: 発生金剛部菩薩", url: "https://shimma.info/j50/ho/item_hossyoukongoububosatu.html", quote: "種字は「व（va）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "1.発生金剛部菩薩 ［読み］ ほっしょうこんごうぶぼさつ ［梵名］ ヴァジュラクロードバヴァボーディサットヴァ ［梵名表記］ vajrakulodbhavabodhisattva" },
    ],
  },
  "t:kongoshu:07": { // 忿怒月黶菩薩
    bija: "hrīḥ", sk: "krodhacandratilaka", grade: "cross",
    note: "種子2源一致。shimma 另載異體 hrīṃ。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "忿怒月黶菩薩<br>ふんぬがってんぼさつ<br>hrīḥ" },
      { title: "神魔精妖名辞典（shimma.info）: 忿怒月黶菩薩", url: "https://shimma.info/j50/hu/item_hunnugattenbosatu.html", quote: "種字は「ह्रीः（hrīḥ）」、「ह्रीं（hrīṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "7.忿怒月黶菩薩 ［読み］ ふんぬがってんぼさつ ［梵名］ クローダチャンドラティラカ ［梵名表記］ krodhacandratilaka" },
    ],
  },
  "t:kongoshu:08": { // 虛空無垢持金剛菩薩
    bija: "hūṃ", sk: "gaganāmalavajradhara", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "虚空無垢持金剛菩薩<br>こくうむくじこんごうぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 虚空無垢持金剛菩薩", url: "https://shimma.info/j50/ko/item_kokuumukuzikongoubosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "8.虚空無垢持金剛菩薩 ［読み］ こくうむくじこんごうぼさつ ［梵名］ ガガナーマラヴァジュラダラ ［梵名表記］ gaganāmalavajradhara" },
    ],
  },
  "t:kongoshu:09": { // 金剛牢持菩薩
    bija: "hūṃ", sk: "śivavajradhara", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "金剛牢持菩薩<br>こんごうろうじぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 金剛牢持菩薩", url: "https://shimma.info/j50/ko/item_kongourouzibosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "9.金剛牢持菩薩 ［読み］ こんごうろうじぼさつ ［梵名］ シヴァヴァジュラダラ ［梵名表記］ śivavajradhara" },
    ],
  },
  "t:kongoshu:10": { // 忿怒持金剛菩薩
    bija: "hūṃ", sk: "vajrāgravajradhara", grade: "cross",
    note: "種子2源一致。ja.wikipedia 表中作「忿怒金剛寺菩薩（ふんぬこんごうじ）」，乃「忿怒持金剛菩薩」之訛；該表21列尊其餘20尊與 f-denshi／mikkyo21f 名位一一相符，故判同尊。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "忿怒金剛寺菩薩<br>ふんぬこんごうじぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 忿怒持金剛菩薩", url: "https://shimma.info/j50/hu/item_hunnuzikongoubosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "10.忿怒持金剛菩薩 ［読み］ ふんぬじこんごうぼさつ ［梵名］ ヴァジュラーグラヴァジュラダラ ［梵名表記］ vajrāgravajradhara" },
    ],
  },
  "t:kongoshu:11": { // 虛空無邊超越菩薩
    bija: "hūṃ", sk: "gaganānantavikrama", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "虚空無辺超越菩薩<br>こくうむへんちょうおつぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 虚空無辺超越菩薩", url: "https://shimma.info/j50/ko/item_kokuumuhentyouotubosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "11.虚空無辺超越菩薩 ［読み］ こくうむへんちょうおつぼさつ ［梵名］ ガガナーナンタヴィクラマ ［梵名表記］ gaganānantavikrama" },
    ],
  },
  "t:kongoshu:12": { // 金剛鎖菩薩
    bija: "vaṃ", sk: "vajraśṛṅkhalā", grade: "single",
    note: "種子2源：ja.wikipedia 作 vaṃ（梵字圖 BonjiVam），shimma 首列 hūṃ、次列「बं（baṃ）（縛住の内証）」。वं／बं 於日本悉曇同讀「バン」，b/v 互通，故取現図院表之 vaṃ，另有 hūṃ 一說並記。梵名 mikkyo21f 作 vajraśṛṅkalā（脫 h），依 shimma「Vajraśṛṅkhalā」正之。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "金剛鎖菩薩<br>こんごうさぼさつ<br>vaṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 金剛鎖菩薩", url: "https://shimma.info/j50/ko/item_kongousabosatu.html", quote: "種字は「हूं（hūṃ）」、「बं（baṃ）」（縛住の内証）" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "12.金剛鏁菩薩 ［読み］ こんごうさぼさつ ［梵名］ ヴァジュラシュリンカラー ［梵名表記］ vajraśṛṅkalā" },
    ],
  },
  "t:kongoshu:13": { // 金剛持菩薩
    bija: "hūṃ", sk: "vajradhara", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "金剛持菩薩<br>こんごうじぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 金剛持菩薩", url: "https://shimma.info/j50/ko/item_kongouzibosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "13.金剛持菩薩 ［読み］ こんごうじぼさつ ［梵名］ ヴァジュラダラ ［梵名表記］ vajradhara" },
    ],
  },
  "t:kongoshu:14": { // 持金剛利菩薩
    bija: "hūṃ", sk: "vajrāgradharaka", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "持金剛利菩薩<br>じこんごうりぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 持金剛利菩薩", url: "https://shimma.info/j50/si/item_zikongouribosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "14.持金剛利菩薩 ［読み］ じこんごうりぼさつ ［梵名］ ヴァジュラーグラダラカ ［梵名表記］ vajrāgradharaka" },
    ],
  },
  "t:kongoshu:15": { // 金剛輪持菩薩
    bija: "strya", sk: "cakravajradhara", grade: "single",
    note: "種子2源指同一梵字 स्त्र्य：ja.wikipedia 羅馬字作「sitrya」（圖名 BonjiSitrya），shimma 作「स्त्र्य（strya）」；IAST 當作 strya，故取 strya 並記 wikipedia 拼法。shimma 另列 ca 一說。梵名 mikkyo21f 作 cakravajra(vajra)dhara，此取 cakravajradhara。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "金剛輪持金剛菩薩<br>こんごうりんじこんごうぼさつ<br>sitrya" },
      { title: "神魔精妖名辞典（shimma.info）: 金剛輪持金剛菩薩", url: "https://shimma.info/j50/ko/item_kongourinzikongoubosatu.html", quote: "種字は「च（ca）」、「स्त्र्य（strya）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "15.金剛輪持（金剛）菩薩 ［読み］ こんごうりんじ（こんごう）ぼさつ ［梵名］ チャクラヴァジュラ（ヴァジュラ）ダラ ［梵名表記］ cakravajra(vajra)dhara" },
    ],
  },
  "t:kongoshu:17": { // 懌悅持金剛菩薩
    bija: "hūṃ", sk: "suratavajradhara", grade: "cross",
    note: "種子2源一致於 hūṃ；shimma 另列 su（與梵名 surata 相應）。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "懌悦持金剛菩薩<br>ちゃくえつじこんごうぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 懌悦持金剛菩薩", url: "https://shimma.info/j50/ti/item_tyakuetuzikongoubosatu.html", quote: "種字は「हूं（hūṃ）」、「सु（su）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "17.懌悦持金剛菩薩 ［読み］ ちゃくえつじこんごうぼさつ ［梵名］ スラタヴァジュラダラ ［梵名表記］ suratavajradhara" },
    ],
  },
  "t:kongoshu:18": { // 金剛牙菩薩
    bija: "hūṃ", sk: "vajradaṃṣṭra", grade: "cross",
    note: "種子2源一致；shimma 明標 hūṃ 為「胎蔵界・金剛界成身会」用，kṣa 標為金剛界三昧耶会用，不取。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "金剛牙菩薩<br>こんごうげぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 金剛牙菩薩", url: "https://shimma.info/j50/ko/item_kongougebosatu.html", quote: "種字は「हूं（hūṃ）」（胎蔵界・金剛界成身会、摧破・恐怖の意）、「क्ष（kṣa）」（金剛界三昧耶会）" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "18.金剛牙菩薩 ［読み］ こんごうげぼさつ ［梵名］ ヴァジュラダンシュトラ ［梵名表記］ vajradaṃṣṭra" },
    ],
  },
  "t:kongoshu:19": { // 離戲論菩薩
    bija: "hūṃ", sk: "niṣprapañcavihāri", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "離戯論菩薩<br>りけろんぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 離戯論菩薩", url: "https://shimma.info/j50/ri/item_rikeronbosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "19.離戯論菩薩 ［読み］ りけろんぼさつ ［梵名］ ニシュプラパンチャヴィハーリ ［梵名表記］ niṣprapañcavihāri" },
    ],
  },
  "t:kongoshu:20": { // 持妙金剛菩薩
    bija: "hūṃ", sk: "suvajradhara", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "持妙金剛菩薩<br>じみょうこんごうぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 持妙金剛菩薩", url: "https://shimma.info/j50/si/item_zimyoukongoubosatu.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "20.持妙金剛菩薩 ［読み］ じみょうこんごうぼさつ ［梵名］ スヴァジュラダラ ［梵名表記］ suvajradhara" },
    ],
  },
  "t:kongoshu:21": { // 大輪金剛菩薩
    bija: "hūṃ", sk: "mahācakravajradhara", grade: "cross",
    note: "種子2源一致於 hūṃ，惟第二源為 shimma「大輪明王」頁（該頁明言「金剛手院に配される大輪金剛菩薩は同体」），非逐尊獨立頁，信度略降；該頁另列 strya。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "大輪金剛菩薩<br>だいりんこんごうぼさつ<br>hūṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 大輪明王", url: "https://shimma.info/j50/ta/item_dairinmyouou.html", quote: "種字は「हूं（hūṃ）」、「स्त्र्य（strya）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "21.大輪金剛菩薩 ［読み］ だいりんこんごうぼさつ ［梵名］ マハーチャクラヴァジュラダラ ［梵名表記］ mahācakravajradhara" },
    ],
  },
  "t:kongoshu:24": { // 金剛軍荼利
    bija: "hūṃ", sk: "vajrakuṇḍalī", grade: "single",
    note: "種子單源（shimma 金剛軍荼利菩薩頁，明指胎蔵界曼荼羅金剛手院・金剛薩埵左下侍尊）；該頁另列異體 huṃ。ja.wikipedia 院表不載此席。書載「金剛軍荼利」＝f-denshi t82／mikkyo21f「金剛軍咤利」，同尊異寫。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）: 金剛軍荼利菩薩", url: "https://shimma.info/j50/ko/item_kongougundaribosatu.html", quote: "種字は「हूं（hūṃ）」、「हुं（huṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "23.金剛軍咤利 ［読み］ こんごうぐんだり ［梵名］ ヴァジュラクンダリー ［梵名表記］ vajrakuṇḍalī" },
    ],
  },
  "t:kongoshu:25": { // 金剛鉤女
    bija: "aḥ", sk: "vajrāṅkuśī", grade: "single",
    note: "種子2源同指「アク」字，惟母音長短有異：ja.wikipedia 作 aḥ（अः，圖名 BonjiAh），shimma 作「आः（āḥ）」並另列 hūṃ；取現図院表之 aḥ，異說並存。此席為侍尊（f-denshi t83），與同院列尊金剛鈎女（t61）同尊，wikipedia 表所載為列尊。",
    sources: [
      { title: "金剛手院 - Wikipedia（胎蔵曼荼羅・金剛手院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E9%87%91%E5%89%9B%E6%89%8B%E9%99%A2", quote: "金剛鈎女菩薩<br>こんごうこうにょぼさつ<br>aḥ" },
      { title: "神魔精妖名辞典（shimma.info）: 金剛鉤女菩薩", url: "https://shimma.info/j50/ko/item_kongoukounyobosatu.html", quote: "種字は「हूं（hūṃ）」、「आः（āḥ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "27.金剛鉤女菩薩 ［読み］ こんごうこうにょぼさつ ［梵名］ ヴァジュラーンクシー ［梵名表記］ vajrāṅkuśī" },
    ],
  },
  "t:kongoshu:27": { // 大力金剛
    bija: "he", sk: "mahābala", grade: "single",
    note: "種子單源（shimma 大力金剛菩薩頁，明指胎蔵界曼荼羅金剛手院・金剛薩埵右下脇侍）。ja.wikipedia 院表不載此席。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）: 大力金剛菩薩", url: "https://shimma.info/j50/ta/item_dairikikongoubosatu.html", quote: "種字は「हे（he）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "26.大力金剛 ［読み］ だいりきこんごう ［梵名］ マハーバラ ［梵名表記］ mahābala" },
    ],
  },
  "t:kongoshu:28": { // 金剛童子
    bija: "hūṃ", sk: "vajrakumāra", grade: "single",
    note: "種子單源（shimma 金剛童子頁，明指胎蔵界曼荼羅金剛手院・金剛鎖菩薩右側侍尊）。ja.wikipedia 院表不載此席。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）: 金剛童子", url: "https://shimma.info/j50/ko/item_kongoudouzi.html", quote: "種字は「हूं（hūṃ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "31.金剛童子 ［読み］ こんごうどうじ ［梵名］ ヴァジュラクマーラ ［梵名表記］ vajrakumāra" },
    ],
  },
  "t:kongoshu:29": { // 孫婆菩薩
    bija: "gṛ", sk: "śumbha", grade: "single",
    note: "種子單源（shimma 孫婆菩薩頁，明指胎蔵界曼荼羅金剛手院・金剛拳菩薩左下脇侍）。梵名 mikkyo21f 作 śumba，依 shimma「Śumbha」正之。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）: 孫婆菩薩", url: "https://shimma.info/j50/so/item_sonbabosatu.html", quote: "種字は「गृ（gṛ）」" },
      { title: "諸仏解説 : 金剛手院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/03.html", quote: "28.孫婆菩薩 ［読み］ そんばぼさつ ［梵名］ シュンバ ［梵名表記］ śumba" },
    ],
  },
  "t:monju:07": { // 寶冠菩薩
    bija: "ka", sk: "ratnakūṭa", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「宝冠菩薩」", url: "https://shimma.info/j50/ho/item_houkanbosatu.html", quote: "種字は「क（ka）」、密号は「荘厳金剛（そうごんこんごう）」、三昧耶形は宝珠、青蓮華上宝冠。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 7.宝冠菩薩（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ ラトナクータ ［梵名表記］ ratnakūṭa" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」134 文殊院", url: "https://shimma.info/special/taizou.html#134", quote: "宝冠菩薩 ラトナクータ Ratnakūṭa" },
    ],
  },
  "t:monju:09": { // 月光菩薩
    bija: "ca", sk: "candraprabha", grade: "single",
    note: "單源。種字列 ca／caṃ 二字，依列序取 ca，caṃ 並存；shimma 明分胎蔵界（密号威徳金剛・三昧耶形青蓮華上半月）與金剛界，此取胎蔵脈。",
    sources: [
      { title: "神魔精妖名辞典「月光菩薩」", url: "https://shimma.info/j50/ka/item_gakkoubosatu.html", quote: "種字は「च（ca）」、「चं（caṃ）」、密号は「威徳金剛（いとくこんごう）」（胎蔵界）、「清涼金剛（しょうりょうこんごう）」、「適悦金剛（てきえつこんごう）」" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 9.月光菩薩（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ チャンドラプラバ ［梵名表記］ candraprabha" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」136 文殊院", url: "https://shimma.info/special/taizou.html#136", quote: "月光菩薩 チャンドラプラバ Candraprabha" },
    ],
  },
  "t:monju:11": { // 瞳母嚕
    bija: "tu", sk: "tumburu", grade: "single",
    note: "單源。同尊確認：shimma 音写漢訳列「瞳牟盧」「噇母嚕」（とむろ），書名「瞳母嚕」同；mikkyo21f／shimma 付表作「瞳母櫓」。種字列 tu／ka 二字，依列序取 tu，ka 為四姉妹天與兄共通字。",
    sources: [
      { title: "神魔精妖名辞典「都牟盧天」", url: "https://shimma.info/j50/to/item_tomuroten.html", quote: "種字は「तु（tu）」、「क（ka）」、三昧耶形は棒。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 13.瞳母櫓（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ トゥンブル ［梵名表記］ tumburu" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」140 文殊院", url: "https://shimma.info/special/taizou.html#140", quote: "瞳母櫓 トゥンブル Tumburu" },
    ],
  },
  "t:monju:12": { // 阿耳多
    bija: "a", sk: "ajitā", grade: "single",
    note: "單源。shimma 音写漢訳列「阿耳多」，同尊。種字列 a／ka 二字，依列序取 a，ka 為共通字。",
    sources: [
      { title: "神魔精妖名辞典「阿爾多」", url: "https://shimma.info/j50/a/item_azita.html", quote: "種字は「अ（a）」、「क（ka）」、三昧耶形は棒。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 11.阿耳多（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ アジター ［梵名表記］ ajitā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」138 文殊院", url: "https://shimma.info/special/taizou.html#138", quote: "阿耳多 アジター Ajitā" },
    ],
  },
  "t:monju:13": { // 阿波羅耳多
    bija: "a", sk: "aparājitā", grade: "single",
    note: "單源。shimma 條名「阿波羅爾多」，書名「阿波羅耳多」同尊（爾／耳異寫）。種字列 a／ka 二字，依列序取 a。",
    sources: [
      { title: "神魔精妖名辞典「阿波羅爾多」", url: "https://shimma.info/j50/a/item_aharazita.html", quote: "種字は「अ（a）」、「क（ka）」、三昧耶形は棒。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 12.阿波羅耳多（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ アパラージター ［梵名表記］ aparājitā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」139 文殊院", url: "https://shimma.info/special/taizou.html#139", quote: "阿波羅耳多 アパラージター Aparājitā" },
    ],
  },
  "t:monju:14": { // 肥者耶
    bija: "ka", sk: "vijayā", grade: "single",
    note: "單源。同尊確認：shimma「微誓耶」音写漢訳列「肥者耶（びしゃや）」。種字來源列作「क（ka）」「वि（vi）」，ka 在前故本欄取 ka；然四姉妹天與兄之例（阿耳多 a・阿波羅耳多 a・者惹耶 ja・瞳母嚕 tu）皆以自名首字為別字、ka 為共通字，則 vi 疑為其別字，二說並存待核。",
    sources: [
      { title: "神魔精妖名辞典「微誓耶」", url: "https://shimma.info/j50/hi/item_biseiya.html", quote: "種字は「क（ka）」、「वि（vi）」、三昧耶形は棒。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 14.肥者耶（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ ヴィジャヤー ［梵名表記］ vijayā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」141 文殊院", url: "https://shimma.info/special/taizou.html#141", quote: "肥者耶 ビジャヤー Vijayā" },
    ],
  },
  "t:monju:15": { // 者惹耶
    bija: "ja", sk: "jayā", grade: "single",
    note: "單源。同尊確認：shimma「誓耶」音写漢訳列「者耶（じゃや）」，條內並明其於文殊院侍都牟盧天右手側下隅；mikkyo21f／shimma 付表文殊院作「者耶」Jayā。書名「者惹耶」為同音異寫。種字列 ja／ka 二字，依列序取 ja。",
    sources: [
      { title: "神魔精妖名辞典「誓耶」", url: "https://shimma.info/j50/se/item_seiya.html", quote: "種字は「ज（ja）」、「क（ka）」、三昧耶形は棒。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 15.者耶（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ ジャヤー ［梵名表記］ jayā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」142 文殊院", url: "https://shimma.info/special/taizou.html#142", quote: "者耶 ジャヤー Jayā" },
    ],
  },
  "t:monju:16": { // 髻設尼童子
    bija: "ki", sk: "keśinī", grade: "single",
    note: "單源。shimma 條內明「髻設尼（けいしに）」為別名。種字列 ki／li／ke 三字，依列序取 ki，餘並存。梵名 shimma 條作 Keśīnī、付表與 mikkyo21f 作 keśinī。",
    sources: [
      { title: "神魔精妖名辞典「計設尼童子」", url: "https://shimma.info/j50/ke/item_keisinidouzi.html", quote: "種字は「कि（ki）」、「लि（li）」、「के（ke）」、三昧耶形は大刀。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 16.髻設尼（童女）（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ ケーシニー ［梵名表記］ keśinī" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」143 文殊院", url: "https://shimma.info/special/taizou.html#143", quote: "髻設尼 ケーシニー Keśinī" },
    ],
  },
  "t:monju:17": { // 優婆髻設尼童子
    bija: "dṛ", sk: "upakeśinī", grade: "single",
    note: "單源。shimma 音写漢訳列「優婆計設尼」「鄔波髻設尼」，與書名「優婆髻設尼」同尊。種字列 dṛ／li／u／lo 四字，依列序取 dṛ，餘並存。",
    sources: [
      { title: "神魔精妖名辞典「烏波計設尼童子」", url: "https://shimma.info/j50/u/item_upakeisinidouzi.html", quote: "種字は「दृ（dṛ）」、「लि（li）」、「उ（u）」、「लो（lo）」、密号は「妙恵金剛（みょうえこんごう）」、三昧耶形は戟。" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 17.鄔波髻設尼（優波髻設尼）（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ ウパケーシニー ［梵名表記］ upakeśinī" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」144 文殊院", url: "https://shimma.info/special/taizou.html#144", quote: "鄔波髻設尼 ウパケーシニー Upakeśinī" },
    ],
  },
  "t:monju:18": { // 質怛羅童子
    bija: "mi", sk: "citrā", grade: "single",
    note: "單源。shimma 音写漢訳列「質怛羅童子」，同尊。種字列 mi／li／mṛ 三字，依列序取 mi，餘並存。",
    sources: [
      { title: "神魔精妖名辞典「質多羅童子」", url: "https://shimma.info/j50/si/item_sittaradouzi.html", quote: "種字は「मि（mi）」、「लि（li）」、「मृ（mṛ）」、密号は「吉祥金剛（きちじょうこんごう）」、三昧耶形は杖、印相は右手を拳にして親指を立てたもの、真言は「南麼三曼多勃馱喃弭履（なうまくさまんだぼだなんみり）」" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 18.質怛羅（童女）（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ チトラー ［梵名表記］ citrā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」145 文殊院", url: "https://shimma.info/special/taizou.html#145", quote: "質怛羅 チトラー Citrā" },
    ],
  },
  "t:monju:19": { // 地慧童子
    bija: "hi", sk: "vasumatī", grade: "single",
    note: "單源。種字列 hi／li／kṛ／hrī 四字，依列序取 hi，餘並存。",
    sources: [
      { title: "神魔精妖名辞典「地慧童子」", url: "https://shimma.info/j50/si/item_ziedouzi.html", quote: "種字は「हि（hi）」、「लि（li）」、「कृ（kṛ）」、「ह्री（hrī）」、密号は「般若金剛（はんにゃこんごう）」" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 19.地慧（童女）（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ ヴァスマティー ［梵名表記］ vasumatī" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」146 文殊院", url: "https://shimma.info/special/taizou.html#146", quote: "地恵 ヴァスマティー Vasumatī" },
    ],
  },
  "t:monju:20": { // 召請童子
    bija: "a", sk: "ākarṣaṇī", grade: "single",
    note: "單源。同尊確認：shimma「請召童子」意味漢訳列「召請童子」「鉤召使者」，書名「召請童子」同。種字列 a／ā 二字，依列序取 a，ā 並存。",
    sources: [
      { title: "神魔精妖名辞典「請召童子」", url: "https://shimma.info/j50/si/item_syoujoudouzi.html", quote: "種字は「अ（a）」「आ（ā）」、密号は「普集金剛（ふしゅうこんごう）」" },
      { title: "MANDALA DUALISM 諸仏解説：文殊院 20.鉤召使者（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/07.html", quote: "［梵名］ アーカルシャニー ［梵名表記］ ākarṣaṇī" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」147 文殊院", url: "https://shimma.info/special/taizou.html#147", quote: "鉤召使者 アーカルシャニー Ākarṣaṇī" },
    ],
  },
  "t:renge:02": { // 蓮華部發生菩薩
    bija: "sa", sk: "padmakulodbhava", grade: "cross",
    note: "種子2源一致。梵名 mikkyo21f 原作 padmakulodbhavabodhisattva，依該頁「ボーディサットヴァは略す」之註取 padmakulodbhava。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "蓮華部発生菩薩<br>れんげぶほっしょうぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 蓮華部発生菩薩", url: "https://shimma.info/j50/re/item_rengebuhossyoubosatu.html", quote: "種字は「स（sa）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "1.蓮華部発生菩薩 ［読み］ れんげぶはっしょうぼさつ ［梵名］ パドマクロードバヴァボーディサットヴァ ［梵名表記］ padmakulodbhavabodhisattva" },
    ],
  },
  "t:renge:06": { // 大明白身菩薩
    bija: "sa", sk: "gaurīmahāvidyā", grade: "cross",
    note: "種子2源一致。與同院別席「白身観自在菩薩」（f-denshi t37，梵名 śvetabhagavatī）為二尊，勿混。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "大明白身菩薩<br>だいみょうびゃくしんぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 大明白身菩薩", url: "https://shimma.info/j50/ta/item_daimyoubyakuinbosatu.html", quote: "種字は「स（sa）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "6.大明白身菩薩 ［読み］ だいみょうびゃくしんぼさつ ［梵名］ ガウリーマハーヴィドヤー ［梵名表記］ gaurīmahāvidyā" },
    ],
  },
  "t:renge:08": { // 大隨求菩薩
    bija: "pra", sk: "mahāpratisarā", grade: "cross",
    note: "種子2源一致於 pra（ja.wikipedia 院表作 pra；shimma 列 aḥ・pra・vaṃ 三說，pra 在其中）。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "大随求菩薩<br>だいずいくぼさつ<br>pra" },
      { title: "神魔精妖名辞典（shimma.info）: 大随求菩薩", url: "https://shimma.info/j50/ta/item_daizuikubosatu.html", quote: "種字は「अः（aḥ）」、「प्र（pra）」、「वं（vaṃ）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "8.大随求菩薩 ［読み］ だいずいぐぼさつ ［梵名］ マハープラティサラー ［梵名表記］ mahāpratisarā" },
    ],
  },
  "t:renge:09": { // 窣堵波大吉祥菩薩
    bija: "sa", sk: "stūpamahāśrī", grade: "cross",
    note: "種子2源一致。f-denshi 作「卒覩波大吉祥菩薩」，同尊異寫。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "窣堵波大吉祥菩薩<br>そとばだいきちじょうぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 窣堵波大吉祥菩薩", url: "https://shimma.info/j50/so/item_sotobadaikitijoubosatu.html", quote: "種字は「स（sa）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "9.窣堵波大吉祥菩薩 ［読み］ そとばだいきちじょうぼさつ ［梵名］ ストゥーパマハーシュリー ［梵名表記］ stūpamahāśrī" },
    ],
  },
  "t:renge:10": { // 耶輸陀羅菩薩
    bija: "ya", sk: "yaśodharā", grade: "cross",
    note: "種子2源一致於 ya（shimma 作「यं（yaṃ）ないし य（ya）」）。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "耶輸陀羅菩薩<br>やしゅだらぼさつ<br>ya" },
      { title: "神魔精妖名辞典（shimma.info）: 耶輸陀羅菩薩", url: "https://shimma.info/j50/ya/item_yasyudarabosatu.html", quote: "種字は「यं（yaṃ）」ないし、「य（ya）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "10.耶輸陀羅菩薩 ［読み］ やしゅだらぼさつ ［梵名］ ヤショーダラー ［梵名表記］ yaśodharā" },
    ],
  },
  "t:renge:11": { // 如意輪觀音
    bija: "hrīḥ", sk: "cintāmaṇi", grade: "cross",
    note: "種子2源一致；shimma 另列 trāḥ。書載「如意輪観音」＝現図蓮華部院之如意輪菩薩（f-denshi t32）。梵名 mikkyo21f 作 cintāmaṇi，shimma 作 Cintāmaṇicakra。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "如意輪菩薩<br>にょいりんぼさつ<br>hrīḥ" },
      { title: "神魔精妖名辞典（shimma.info）: 如意輪観音", url: "https://shimma.info/j50/ni/item_nyoirinkannon.html", quote: "種字は「ह्रीः（hrīḥ）」、「त्राः（trāḥ）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "11.如意輪菩薩 ［読み］ にょいりんぼさつ ［梵名］ チンターマニ ［梵名表記］ cintāmaṇi" },
    ],
  },
  "t:renge:12": { // 大吉祥大明菩薩
    bija: "sa", sk: "mahāśrīmahāvidyā", grade: "cross",
    note: "種子2源一致；shimma 註出典「両部曼荼羅私抄」。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "大吉祥大明菩薩<br>だいきっしょうだいみょうぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 大吉祥大明菩薩", url: "https://shimma.info/j50/ta/item_daikissyoudaimyoubosatu.html", quote: "種字は「स（sa）」（両部曼荼羅私抄）" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "12.大吉祥大明菩薩 ［読み］ だいきちじょうだいみょうぼさつ ［梵名］ マハーシュリーマハーヴィドヤー ［梵名表記］ mahāśrīmahāvidyā" },
    ],
  },
  "t:renge:13": { // 大吉祥明菩薩
    bija: "sa", sk: "śrīmahāvidyā", grade: "cross",
    note: "種子2源一致；shimma 註出典「両部曼荼羅私抄」。f-denshi 作「大吉祥（明）菩薩」。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "大吉祥明菩薩<br>だいきっしょうみょうぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 大吉祥明菩薩", url: "https://shimma.info/j50/ta/item_daikissyoumyoubosatu.html", quote: "種字は「स（sa）」（両部曼荼羅私抄）" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "13.大吉祥明菩薩 ［読み］ だいきちじょうみょうぼさつ ［梵名］ シュリーマハーヴィドヤー ［梵名表記］ śrīmahāvidyā" },
    ],
  },
  "t:renge:14": { // 寂留明菩薩
    bija: "sa", sk: "śivāvahavidyā", grade: "cross",
    note: "種子2源一致；shimma 註出典「両部曼荼羅私抄」。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "寂留明菩薩<br>じゃるみょうぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 寂留明菩薩", url: "https://shimma.info/j50/si/item_jakurumyoubosatu.html", quote: "種字は「स（sa）」（両部曼荼羅私抄）" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "14.寂留明菩薩 ［読み］ じゃくるみょうぼさつ ［梵名］ シヴァーヴァハヴィドヤー ［梵名表記］ śivāvahavidyā" },
    ],
  },
  "t:renge:15": { // 披葉衣觀音
    bija: "sa", sk: "parṇaśavarī", grade: "cross",
    note: "種子2源一致（shimma 另列 hūṃ）。書載「披葉衣観音」＝ja.wikipedia「被葉衣菩薩」＝shimma「葉衣観音」（該頁列「被葉衣菩薩」為別名，並言「胎蔵界曼荼羅の観自在院に描かれる」），判為同尊。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "被葉衣菩薩<br>ひようえぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 葉衣観音", url: "https://shimma.info/j50/yo/item_youekannon.html", quote: "種字は「स（sa）」、「हूं（hūṃ）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "15.披葉衣菩薩 ［読み］ ひようえぼさつ ［梵名］ パルナシャヴァリー ［梵名表記］ parṇaśavarī" },
    ],
  },
  "t:renge:17": { // 豐財菩薩
    bija: "sa", sk: "bhogavatī", grade: "cross",
    note: "種子2源一致；shimma 頁明指観自在院第三列東方第三位。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "豊財菩薩<br>ぶざいぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 豊財菩薩", url: "https://shimma.info/j50/hu/item_buzaibosatu.html", quote: "種字は「स（sa）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "17.豊財菩薩 ［読み］ ぶざいぼさつ ［梵名］ ボーガヴァティー ［梵名表記］ bhogavatī" },
    ],
  },
  "t:renge:18": { // 不空羂索觀音
    bija: "mo", sk: "amoghapāśa", grade: "cross",
    note: "種子2源一致於 mo（shimma 兼列 sa・hūṃ・taṃ）；惟 shimma 不空羂索観音頁未明言胎蔵現図院位，第二源信度略降。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "不空羂索菩薩<br>ふくうけんじゃくぼさつ<br>mo" },
      { title: "神魔精妖名辞典（shimma.info）: 不空羂索観音", url: "https://shimma.info/j50/hu/item_hukuukensakukannon.html", quote: "種字は「मो（mo）」、「स（sa）」、「हूं（hūṃ）」、「तं（taṃ）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "18.不空羂索菩薩 ［読み］ ふくうけんじゃくぼさつ ［梵名］ アモーガパーシャ ［梵名表記］ amoghapāśa" },
    ],
  },
  "t:renge:19": { // 水吉祥菩薩
    bija: "sa", sk: "udakaśrī", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "水吉祥菩薩<br>すいきちじょうぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 水吉祥菩薩", url: "https://shimma.info/j50/su/item_suikitijoubosatu.html", quote: "種字は「स（sa）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "19.水吉祥菩薩 ［読み］ すいきちじょうぼさつ ［梵名］ ウダカシュリー ［梵名表記］ udakaśrī" },
    ],
  },
  "t:renge:20": { // 大吉祥變菩薩
    bija: "sa", sk: "lakṣmīmahāvidyā", grade: "cross",
    note: "種子2源一致。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "大吉祥変菩薩<br>だいきっしょうへんぼさつ<br>sa" },
      { title: "神魔精妖名辞典（shimma.info）: 大吉祥変菩薩", url: "https://shimma.info/j50/ta/item_daikitijouhenbosatu.html", quote: "種字は「स（sa）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "20.大吉祥変菩薩 ［読み］ だいきちじょうへんぼさつ ［梵名］ ラクシュミーマハーヴィドヤー ［梵名表記］ lakṣmīmahāvidyā" },
    ],
  },
  "t:renge:21": { // 白處尊菩薩
    bija: "paṃ", sk: "pāṇḍaravāsinī", grade: "cross",
    note: "種子2源一致（shimma 另列 sa）。shimma 立頁名「白衣観音」，該頁以「白処尊菩薩」為別名並言「胎蔵界曼荼羅の観自在院に描かれる」，判同尊。",
    sources: [
      { title: "蓮華部院 - Wikipedia（胎蔵曼荼羅・蓮華部院＝観自在院 21菩薩表）", url: "https://ja.wikipedia.org/wiki/%E8%93%AE%E8%8F%AF%E9%83%A8%E9%99%A2", quote: "白処尊菩薩<br>びゃくしょそんぼさつ<br>paṃ" },
      { title: "神魔精妖名辞典（shimma.info）: 白衣観音", url: "https://shimma.info/j50/hi/item_byakuekannon.html", quote: "種字は「पं（paṃ）」、「स（sa）」" },
      { title: "諸仏解説 : 蓮華部院 : 胎蔵曼荼羅 : MANDALA DUALISM（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/05.html", quote: "21.白処尊菩薩 ［読み］ びゃくしょそんぼさつ ［梵名］ パーンダラヴァーシニー ［梵名表記］ pāṇḍaravāsinī" },
    ],
  },
  "t:renge:24": { // 蓮華軍荼利
    bija: "ku", sk: "padmakuṇḍalī", grade: "single",
    note: "種子單源（shimma 蓮華軍茶利菩薩頁，明指胎蔵界曼荼羅観自在院・観音菩薩左下弁事之尊）。ja.wikipedia 院表不載此席；mikkyo21f 蓮華部院諸仏解説亦未列此尊，故梵名 padmakuṇḍalī 亦取自 shimma。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）: 蓮華軍茶利菩薩", url: "https://shimma.info/j50/re/item_rengegundaribosatu.html", quote: "種字は「कु（ku）」" },
    ],
  },
  "t:shaka:04": { // 無能勝妃
    bija: "a", sk: "aparājitavidyārājñī", grade: "single",
    note: "單源。shimma 意味漢訳列「無能勝妃」，確為同尊（釈迦院四侍尊）。種字列 a／ti 二字，依來源列序取 a，ti 並存。",
    sources: [
      { title: "神魔精妖名辞典「無能勝明妃」", url: "https://shimma.info/j50/mu/item_munousyoumyouhi.html", quote: "種字は「अ（a）」、「ति（ti）」、密号は「長生金剛（ちょうしょうこんごう）」、真言は「南麼三曼多勃馱喃阿鉢囉爾帝若行底怛抳帝莎訶」（無能勝妃真言・T0848）、三昧耶形は鉞鉤。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 5.無能勝妃（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ アパラージタヴィドヤーラージュ二ー ［梵名表記］ aparājitavidyārājñī" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」093 釈迦院", url: "https://shimma.info/special/taizou.html#093", quote: "無能勝妃 アパラージタヴィドヤーラージュニー Aparājitavidyārājñī" },
    ],
  },
  "t:shaka:06": { // 一切如來寶
    bija: "ta", sk: "sarvatathāgatamaṇi", grade: "single",
    note: "單源。shimma 意味漢訳列「一切如来宝」，同尊。種字列 ta／ka 二字，依列序取 ta，ka 並存。",
    sources: [
      { title: "神魔精妖名辞典「如来宝菩薩」", url: "https://shimma.info/j50/ni/item_nyoraihoubosatu.html", quote: "種字は「त（ta）」、「क（ka）」、密号は「宝相金剛（ほうそうこんごう）」、三昧耶形は蓮華上如意宝珠、仏頂眼。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 6.一切如来宝（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ サルヴァタターガタマニ ［梵名表記］ sarvatathāgatamaṇi" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」094 釈迦院", url: "https://shimma.info/special/taizou.html#094", quote: "一切如来宝 サルヴァタターガタマニ Sarvatathāgatamaṇi" },
    ],
  },
  "t:shaka:08": { // 大轉輪佛頂
    bija: "trūṃ", sk: "mahoṣṇīṣacakravartin", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「大転輪仏頂」", url: "https://shimma.info/j50/ta/item_daitenrinbuttyou.html", quote: "種字は「त्रूं（trūṃ）」、密号は「破魔金剛（はまこんごう）」、印相は八葉蓮華印、真言は「曩莫三滿多沒馱喃吒嚕吽鄔瑟抳灑娑嚩賀」（広生仏頂真言・T0852）、三昧耶形は五鈷杵。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 8.大転輪仏頂（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ マホーシュニーシャチャクラヴァルティン ［梵名表記］ mahoṣṇīṣacakravartin" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」096 釈迦院", url: "https://shimma.info/special/taizou.html#096", quote: "大転輪仏頂 マホシュニーシャチャクラヴァルティン Mahoṣṇīṣacakravartin" },
    ],
  },
  "t:shaka:09": { // 高佛頂
    bija: "ṭrūṃ", sk: "abhyudgatoṣṇīṣa", grade: "single",
    note: "單源。種字列 ṭrūṃ／dhrūṃ 二字，依列序取 ṭrūṃ，dhrūṃ 並存。",
    sources: [
      { title: "神魔精妖名辞典「高仏頂」", url: "https://shimma.info/j50/ko/item_koubuttyou.html", quote: "種字は「ट्रूं（ṭrūṃ）」、「ध्रूं（dhrūṃ）」、印相は五股印、真言は「曩莫三滿多沒馱喃輸嚕吽鄔瑟抳灑娑嚩賀」（発生仏頂真言・T0852）、三昧耶形は開敷蓮華。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 26.高仏頂（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ アビウッドゥガトーシュニーシャ ［梵名表記］ abhyudgatoṣṇīṣa" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」114 釈迦院", url: "https://shimma.info/special/taizou.html#114", quote: "高仏頂 アビユドガトーシュニーシャ Abhyudgatoṣṇīṣa" },
    ],
  },
  "t:shaka:10": { // 無量音聲佛頂
    bija: "hūṃ", sk: "anantasvaraghoṣacakravartin", grade: "single",
    note: "單源。shimma 意味漢訳列「無量音声仏頂」，與書名同尊。",
    sources: [
      { title: "神魔精妖名辞典「無量声仏頂」", url: "https://shimma.info/j50/mu/item_muryousyoubuttyou.html", quote: "種字は「हूं（hūṃ）」、印相は両手を虚心合掌して親指を曲げ人差し指で親指を抑えるもの。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 10.無量声仏頂（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ アナンタスヴァラゴーシャチャクラヴァルティン ［梵名表記］ anantasvaraghoṣacakravartin" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」098 釈迦院", url: "https://shimma.info/special/taizou.html#098", quote: "無量声仏頂 アナンタシュヴァラゴーシャチャクラヴァルティン Anantasvaraghoṣacakravartin" },
    ],
  },
  "t:shaka:11": { // 如來悲菩薩
    bija: "ka", sk: "tathāgatakaruṇā", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「如来悲菩薩」", url: "https://shimma.info/j50/ni/item_nyoraihibosatu.html", quote: "種字は「क（ka）」、密号は「慈化金剛（じけこんごう）」、三昧耶形は合掌、如意宝珠。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 11.如来悲（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタカルナー ［梵名表記］ tathāgatakaruṇā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」099 釈迦院", url: "https://shimma.info/special/taizou.html#099", quote: "如来悲 タターガタカルナー Tathāgatakaruṇā" },
    ],
  },
  "t:shaka:12": { // 如來愍菩薩
    bija: "mre", sk: "tathāgatamreḍitā", grade: "single",
    note: "單源。種字列 mre／yaṃ 二字，依列序取 mre，yaṃ 並存。梵名異說：mikkyo21f 作 tathāgatamṛḍīka。",
    sources: [
      { title: "神魔精妖名辞典「如来愍菩薩」", url: "https://shimma.info/j50/ni/item_nyoraiminbosatu.html", quote: "種字は「म्रे（mre）」、「यं（yaṃ）」、密号は「教令金剛（きょうれいこんごう）」、三昧耶形は宝花、宝珠。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 12.如来愍（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタムリディーカ ［梵名表記］ tathāgatamṛḍīka" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」100 釈迦院", url: "https://shimma.info/special/taizou.html#100", quote: "如来愍 タターガタムレーディター Tathāgatamreḍitā" },
    ],
  },
  "t:shaka:13": { // 如來慈菩薩
    bija: "mai", sk: "tathāgatamaitrī", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「如来慈菩薩」", url: "https://shimma.info/j50/ni/item_nyoraizibosatu.html", quote: "種字は「मै（mai）」、密号は「護念金剛（ごねんこんごう）」、三昧耶形は荷上花、如意宝珠。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 13.如来慈（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタマイトリー ［梵名表記］ tathāgatamaitrī" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」101 釈迦院", url: "https://shimma.info/special/taizou.html#101", quote: "如来慈 タターガタマイトリー Tathāgatamaitrī" },
    ],
  },
  "t:shaka:14": { // 如來爍乞底
    bija: "śa", sk: "tathāgataśakti", grade: "single",
    note: "單源。shimma 音写漢訳列「如来爍乞底」，同尊（爍／鑠異寫）。",
    sources: [
      { title: "神魔精妖名辞典「如来鑠乞底菩薩」", url: "https://shimma.info/j50/ni/item_nyoraisyakitibosatu.html", quote: "種字は「श（śa）」、密号は「衆行金剛（しゅぎょうこんごう）」、三昧耶形は鉾。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 14.如来爍乞底（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタシャクティ ［梵名表記］ tathāgataśakti" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」102 釈迦院", url: "https://shimma.info/special/taizou.html#102", quote: "如来爍乞底 タターガタシャクティ Tathāgataśakti" },
    ],
  },
  "t:shaka:21": { // 如來喜菩薩
    bija: "mu", sk: "tathāgatamuditā", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「如来喜菩薩」", url: "https://shimma.info/j50/ni/item_nyoraikibosatu.html", quote: "種字は「मु（mu）」、密号は「称法金剛（しょうほうこんごう）」、三昧耶形は荷上花、黄蓮花。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 21.如来喜（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタムディター ［梵名表記］ tathāgatamuditā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」109 釈迦院", url: "https://shimma.info/special/taizou.html#109", quote: "如来喜 タターガタムディター Tathāgatamuditā" },
    ],
  },
  "t:shaka:22": { // 如來捨菩薩
    bija: "u", sk: "tathāgatopekṣā", grade: "single",
    note: "單源。種字列 u／pe 二字，依列序取 u，pe 並存。梵名 shimma 作 Tathāgatopekṣa、mikkyo21f 作 tathāgatopekśā，此取通行 tathāgatopekṣā。",
    sources: [
      { title: "神魔精妖名辞典「如来捨菩薩」", url: "https://shimma.info/j50/ni/item_nyoraisyabosatu.html", quote: "種字は「उ（u）」、「पे（pe）」、密号は「平等金剛（びょうどうこんごう）」、三昧耶形は白珠。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 22.如来捨（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガトーペークシャー ［梵名表記］ tathāgatopekśā" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」110 釈迦院", url: "https://shimma.info/special/taizou.html#110", quote: "如来捨 タターガトーペークシャ Tathāgatopekṣa" },
    ],
  },
  "t:shaka:23": { // 白傘蓋佛頂
    bija: "laṃ", sk: "sitātapatroṣṇīṣa", grade: "single",
    note: "單源（胎蔵脈）。異說：ja.wikipedia「白傘蓋仏頂」條作種子 dhrūṃ，然該條通說 Sitātapatrā 獨尊（兼蔵傳 gdugs dkar mo），未指胎蔵曼荼羅釈迦院，依規不採為來源；胎蔵脈 laṃ 與大日經 T0848「南麼三曼多勃馱喃㘕」相合。並陳異說待核。",
    sources: [
      { title: "神魔精妖名辞典「白傘蓋仏頂」", url: "https://shimma.info/j50/hi/item_byakusangaibuttyou.html", quote: "種字は「लं（laṃ）」、印相は左手を開いて伏せ、右手の人差し指を立てて傘と傘の柄を真似るもの、三昧耶形は傘蓋、真言は「南麼三曼多勃馱喃㘕（なうまくさまんだぼだなんらん）」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 23.白傘蓋仏頂（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ シタータパトゥローシュニーシャ ［梵名表記］ sitātapatroṣṇīṣa" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」111 釈迦院", url: "https://shimma.info/special/taizou.html#111", quote: "白傘蓋仏頂 シタータパトローシュニーシャ Sitātapatroṣṇīṣa" },
    ],
  },
  "t:shaka:24": { // 勝佛頂
    bija: "śaṃ", sk: "jayoṣṇīṣacakravartin", grade: "single",
    note: "單源。shimma 意味漢訳列「勝仏頂」，同尊。梵名 shimma 作 Jayoṣṇīṣacakravarti。",
    sources: [
      { title: "神魔精妖名辞典「勝仏頂転輪」", url: "https://shimma.info/j50/si/item_syoubuttyoutenrin.html", quote: "種字は「शं（śaṃ）」、印相は大恵刀印、三昧耶形は剣、真言は「南麼三曼多勃馱喃苫（なうまくさまんだぼだなんせん）」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 24.勝仏頂転輪（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ ジャヨーシュニーシャチャクラヴァルティン ［梵名表記］ jayoṣṇīṣacakravartin" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」112 釈迦院", url: "https://shimma.info/special/taizou.html#112", quote: "勝仏頂転輪 ジャヨーシュニーシャチャクラヴァルティ Jayoṣṇīṣacakravarti" },
    ],
  },
  "t:shaka:25": { // 最勝佛頂
    bija: "siṃ", sk: "vijayoṣṇīṣacakravartin", grade: "single",
    note: "單源。shimma 意味漢訳列「最勝仏頂」，同尊。種字列 siṃ／śī 二字，依列序取 siṃ，śī 並存。",
    sources: [
      { title: "神魔精妖名辞典「最勝仏頂転輪」", url: "https://shimma.info/j50/sa/item_saisyoubuttyoutenrin.html", quote: "種字は「सिं（siṃ）」、「शी（śī）」、印相は転法輪印、三昧耶形は金輪、真言は「南麼三曼多勃馱喃賜（なうまくさまんだぼだなんしり）」（最勝仏頂真言・T0848）、「曩莫三滿多沒馱喃施枲尾惹欲鄔瑟尼灑娑嚩賀」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 25.最勝仏頂転輪（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ ヴィジャヨーシュニーシャチャクラヴァルティン ［梵名表記］ vijayoṣṇīṣacakravartin" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」113 釈迦院", url: "https://shimma.info/special/taizou.html#113", quote: "最勝仏頂転輪 ヴィジャヨーシュニーシャチャクラヴァルティ Vijayoṣṇīṣacakravarti" },
    ],
  },
  "t:shaka:26": { // 光聚佛頂
    bija: "śrūṃ", sk: "tejorāśicakravartin", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「光聚仏頂」", url: "https://shimma.info/j50/ko/item_koujubuttyou.html", quote: "種字は「श्रूं（śrūṃ）」、印相は小指と薬指を手の平の中で合わせ合掌し、中指を人差し指の背に乗せたもの、三昧耶形は仏頂印、真言は「南麼三曼多勃馱喃怛𭌇（なうまくさまんだぼだなんちりん）」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 9.光聚仏頂（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ テージョーラーシチャクラヴァルティン ［梵名表記］ tejorāśicakravartin" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」097 釈迦院", url: "https://shimma.info/special/taizou.html#097", quote: "光聚仏頂 テージョーラーシチャクラヴァルティン Tejorāśicakravartin" },
    ],
  },
  "t:shaka:27": { // 摧碎佛頂
    bija: "hrīṃ", sk: "vikiraṇoṣṇīṣa", grade: "single",
    note: "單源。同尊確認：shimma「除障仏頂」意味漢訳首列「摧砕仏頂（さいさいぶっちょう）」，梵名 Vikiranoṣṇīṣa 與 shimma 付表 115 摧砕仏頂・mikkyo21f 釈迦院 27 摧砕仏頂 同。種字列 hrīṃ／hṛṃ／hrūṃ 三字，依列序取 hrīṃ，餘並存。梵名來源皆作 vikiranoṣṇīṣa（n），此依梵文正寫作 vikiraṇoṣṇīṣa。",
    sources: [
      { title: "神魔精妖名辞典「除障仏頂」", url: "https://shimma.info/j50/si/item_jogaibuttyou.html", quote: "種字は「ह्रीं（hrīṃ）」、「हृं（hṛṃ）」、「ह्रूं（hrūṃ）」、印相は鉤召印、三昧耶形は金剛鉤ないし蓮華鉤、真言は「南麼三曼多勃馱喃訶啉（なうまくさまんだぼだなんかりん）」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 27.摧砕仏頂（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ ヴィキラノーシュニーシャ ［梵名表記］ vikiranoṣṇīṣa" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」115 釈迦院", url: "https://shimma.info/special/taizou.html#115", quote: "摧砕仏頂 ヴィキラノーシュニーシャ Vikiranoṣṇīṣa" },
    ],
  },
  "t:shaka:28": { // 如來舌菩薩
    bija: "ji", sk: "tathāgatajihva", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「如来舌菩薩」", url: "https://shimma.info/j50/ni/item_nyoraizetubosatu.html", quote: "種字は「जि（ji）」、密号は「弁舌金剛（べんぜつこんごう）」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 28.如来舌（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタジフヴァ ［梵名表記］ tathāgatajihva" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」116 釈迦院", url: "https://shimma.info/special/taizou.html#116", quote: "如来舌 タターガタジフヴァ Tathāgatajihva" },
    ],
  },
  "t:shaka:29": { // 如來語菩薩
    bija: "va", sk: "tathāgatavaktra", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「如来語菩薩」", url: "https://shimma.info/j50/ni/item_nyoraigobosatu.html", quote: "種字は「व（va）」、密号は「性空金剛（しょうくうこんごう）」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 29.如来語（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタヴァクトラ ［梵名表記］ tathāgatavaktra" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」117 釈迦院", url: "https://shimma.info/special/taizou.html#117", quote: "如来語 タターガタヴァクトラ Tathāgatavaktra" },
    ],
  },
  "t:shaka:30": { // 如來笑菩薩
    bija: "hā", sk: "tathāgatahāsa", grade: "single",
    note: "單源。種字列 hā／haḥ 二字，依列序取 hā，haḥ 並存。",
    sources: [
      { title: "神魔精妖名辞典「如来笑菩薩」", url: "https://shimma.info/j50/ni/item_nyoraisyoubosatu.html", quote: "種字は「हा（hā）」、「हः（haḥ）」、密号は「歓喜金剛（かんきこんごう）」、「破顔金剛（はがんこんごう）」、三昧耶形は三鈷杵中に歯、開蓮花。" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 30.如来笑（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタハーサ ［梵名表記］ tathāgatahāsa" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」118 釈迦院", url: "https://shimma.info/special/taizou.html#118", quote: "如来笑 タターガタハーサ Tathāgatahāsa" },
    ],
  },
  "t:shaka:31": { // 如來牙菩薩
    bija: "daṃ", sk: "tathāgatadaṃṣṭra", grade: "single",
    note: "單源",
    sources: [
      { title: "神魔精妖名辞典「如来牙菩薩」", url: "https://shimma.info/j50/ni/item_nyoraigebosatu.html", quote: "種字は「दं（daṃ）」、密号は「護法金剛（ごほうこんごう）」、「調伏金剛（ちょうぶくこんごう）」" },
      { title: "MANDALA DUALISM 諸仏解説：釈迦院 31.如来牙（密教21フォーラム）", url: "https://www.mikkyo21f.gr.jp/mandala/mandala_taizoukai_syobutu/06.html", quote: "［梵名］ タターガタダンシュトラ ［梵名表記］ tathāgatadaṃṣṭra" },
      { title: "神魔精妖名辞典 付表「大悲胎蔵生曼荼羅」119 釈迦院", url: "https://shimma.info/special/taizou.html#119", quote: "如来牙 タターガタダムシュトラ Tathāgatadaṃṣṭra" },
    ],
  },
  "t:soshitsuji:01": { // 不空供養寶菩薩
    bija: "oṃ", sk: "amoghapūjāmaṇi", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 梵名出 mikkyo21f《MANDALA DUALISM》蘇悉地院頁「梵名表記」：amoghapūjāmaṇi。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）不空供養宝菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/hu/item_hukuukuyouhoubosatu.html", quote: "胎蔵界曼荼羅 の 蘇悉地院…種字 は「 ओं（oṃ） 」" },
    ],
  },
  "t:soshitsuji:02": { // 孔雀王母
    bija: "ma", sk: "mahāmayūrī", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 立目「孔雀明王」，明言不取忿怒相時稱「孔雀王母菩薩」而配蘇悉地院；種字並列「म（ma）」「यु（yu）」且未按院別區分，取首出，待核。 梵名出 mikkyo21f《MANDALA DUALISM》蘇悉地院頁「梵名表記」：mahāmayūrī。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）孔雀明王（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ku/item_kujakumyouou.html", quote: "胎蔵界曼荼羅 の 蘇悉地院…種字 は「 म（ma） 」、「 यु（yu） 」" },
    ],
  },
  "t:soshitsuji:03": { // 一髻羅剎
    bija: "e", sk: "ekajaṭārākṣasa", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 現図作男形「一髻羅刹王菩薩」。 梵名出 mikkyo21f《MANDALA DUALISM》蘇悉地院頁「梵名表記」：ekajaṭārākṣasa。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）一髻羅刹（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/i/item_ikkeirasetu.html", quote: "胎蔵界曼荼羅 においては男性形としては「一髻羅刹王菩薩」、女性形としては「一髻羅刹女」の名で 蘇悉地院…種字 は「 ए（e） 」" },
    ],
  },
  "t:soshitsuji:05": { // 不空金剛菩薩
    bija: "ja", sk: "amoghavajra", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 原文作「種子は」。並列「ज（ja）」「जः（jaḥ）」「हूं（hūṃ）」，取首出；此尊或與金剛界金剛王菩薩同體，jaḥ／hūṃ 之歸屬待核。 梵名出 mikkyo21f《MANDALA DUALISM》蘇悉地院頁「梵名表記」：amoghavajra。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）不空金剛菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/hu/item_hukuukongoubosatu.html", quote: "胎蔵界曼荼羅 の 蘇悉地院…種子は「 ज（ja） 」、「 जः（jaḥ） 」、「 हूं（hūṃ） 」" },
    ],
  },
  "t:soshitsuji:07": { // 金剛將菩薩
    bija: "na", sk: "vajrasena", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「न（na）」「नः（naḥ）」「नि（ni）」，取首出。 梵名出 mikkyo21f《MANDALA DUALISM》蘇悉地院頁「梵名表記」：vajrasena。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）金剛将菩薩（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ko/item_kongousyoubosatu2.html", quote: "胎蔵界曼荼羅 の 蘇悉地院…種字 は「 न（na） 」、「 नः（naḥ） 」、「 नि（ni） 」" },
    ],
  },
  "t:soshitsuji:08": { // 金剛明王菩薩
    bija: "hūṃ", sk: "vidyottama", grade: "single",
    note: "種子單源（shimma.info，引《両部曼荼羅私抄》等）。 shimma 並列「हूं（hūṃ）」「के（ke）」，取首出。 梵名出 mikkyo21f《MANDALA DUALISM》蘇悉地院頁「梵名表記」：vidyottama。",
    sources: [
      { title: "神魔精妖名辞典（shimma.info）金剛明王（大悲胎蔵生曼荼羅）", url: "https://shimma.info/j50/ko/item_kongoumyouou.html", quote: "胎蔵界曼荼羅 の 蘇悉地院…種字 は「 हूं（hūṃ） 」、「 के（ke） 」" },
    ],
  },
};
