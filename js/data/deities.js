// ─────────────────────────────────────────────────────────────────────────────
// 不二層 · The Advaya Layer
//
// 單一規範圖數據。每尊一條記錄；胎藏（t）與金剛界（k）只是同一節點的兩個面。
// 一條記錄同時持有 t 與 k 者，即兩部同體之尊（金胎不二的錨點）：
//   寶幢=阿閦 · 開敷華王=寶生 · 無量壽=阿彌陀 · 天鼓雷音=不空成就
//   普賢=金剛薩埵 · 觀自在=金剛法 · 文殊=金剛利 · 虛空藏=金剛寶 · 彌勒=金剛因
// 僅有一面者，於形變（不二滑動）中攝入其部主而隱顯。
//
// 尊位依現圖系，院屬諸尊有所省略；種字（bīja）從通行本，諸傳承間或有異說。
// 本引擎所現為法曼荼羅（種字）與三昧耶曼荼羅（標幟）之間，入壇則向羯磨曼荼羅。
// ─────────────────────────────────────────────────────────────────────────────

// family: butsu 佛部 · kongo 金剛部 · ho 寶部 · renge 蓮華部 · katsuma 羯磨部 · ten 外金剛部(天)
// t: { zh, sk, bija, court, slot }   k: { zh, sk, bija, circle, slot }
// samaya: 三昧耶形鍵（見 textures.js 圖庫）

export const DEITIES = [

  // ═══ 兩部同體 · 五佛 ═══════════════════════════════════════════════════════
  {
    id: 'center', family: 'butsu', samaya: 'stupa',
    t: { zh: '大日如來', sk: 'Mahāvairocana', bija: 'a', court: 'chudai', slot: 'C' },
    k: { zh: '大日如來', sk: 'Mahāvairocana', bija: 'vaṃ', circle: 'center', slot: 'lord' },
    mantra: 'a vi ra hūṃ khaṃ ／ oṃ vajradhātu vaṃ',
    desc: '法界體性智。理智之源，兩部唯一不動之心點。',
  },
  {
    id: 'east', family: 'kongo', samaya: 'vajra5',
    t: { zh: '寶幢如來', sk: 'Ratnaketu', bija: 'raṃ', court: 'chudai', slot: 'E' },
    k: { zh: '阿閦如來', sk: 'Akṣobhya', bija: 'hūṃ', circle: 'east', slot: 'lord' },
    desc: '大圓鏡智。東方發菩提心，立幢不動。',
  },
  {
    id: 'south', family: 'ho', samaya: 'jewel',
    t: { zh: '開敷華王如來', sk: 'Saṃkusumitarāja', bija: 'vāṃ', court: 'chudai', slot: 'S' },
    k: { zh: '寶生如來', sk: 'Ratnasaṃbhava', bija: 'trāḥ', circle: 'south', slot: 'lord' },
    desc: '平等性智。南方萬行開敷，福智圓滿。',
  },
  {
    id: 'west', family: 'renge', samaya: 'lotus',
    t: { zh: '無量壽如來', sk: 'Amitāyus', bija: 'saṃ', court: 'chudai', slot: 'W' },
    k: { zh: '阿彌陀如來', sk: 'Amitābha', bija: 'hrīḥ', circle: 'west', slot: 'lord' },
    mantra: 'oṃ amṛta-teje hara hūṃ',
    desc: '妙觀察智。西方說法斷疑，蓮華清淨。',
  },
  {
    id: 'north', family: 'katsuma', samaya: 'karma',
    t: { zh: '天鼓雷音如來', sk: 'Divyadundubhi­megha­nirghoṣa', bija: 'haṃ', court: 'chudai', slot: 'N' },
    k: { zh: '不空成就如來', sk: 'Amoghasiddhi', bija: 'aḥ', circle: 'north', slot: 'lord' },
    desc: '成所作智。北方涅槃妙用，如天鼓不擊自鳴。',
  },

  // ═══ 兩部同體 · 八葉四菩薩 ↔ 十六大菩薩之四 ═══════════════════════════════
  {
    id: 'fugen', family: 'kongo', samaya: 'vajra5',
    t: { zh: '普賢菩薩', sk: 'Samantabhadra', bija: 'aṃ', court: 'chudai', slot: 'SE' },
    k: { zh: '金剛薩埵', sk: 'Vajrasattva', bija: 'hūṃ', circle: 'east', slot: 0 },
    mantra: 'oṃ vajrasattva aḥ',
    desc: '普賢即金剛薩埵：大行之願，堅固不壞之心。',
  },
  {
    id: 'kannon', family: 'renge', samaya: 'lotus',
    t: { zh: '觀自在菩薩', sk: 'Avalokiteśvara', bija: 'sa', court: 'chudai', slot: 'NW' },
    k: { zh: '金剛法菩薩', sk: 'Vajradharma', bija: 'hrīḥ', circle: 'west', slot: 0 },
    desc: '觀音即金剛法：大悲觀照，即是清淨法門。',
  },
  {
    id: 'monju', family: 'kongo', samaya: 'sword',
    t: { zh: '文殊師利菩薩', sk: 'Mañjuśrī', bija: 'maṃ', court: 'chudai', slot: 'SW' },
    k: { zh: '金剛利菩薩', sk: 'Vajratīkṣṇa', bija: 'dhaṃ', circle: 'west', slot: 1 },
    desc: '文殊即金剛利：般若之劍，斷一切戲論。',
  },
  {
    // samaya 從 banner 校為 wheel：金剛因（纔發心轉法輪）三昧耶形為八輻輪；
    // 幢乃金剛幢（k-do）之幟，hetu/ketu 之混也。考據對抗校驗通過（2026-06）。
    id: 'miroku', family: 'butsu', samaya: 'wheel',
    t: { zh: '彌勒菩薩', sk: 'Maitreya', bija: 'yu', court: 'chudai', slot: 'NE' },
    k: { zh: '金剛因菩薩', sk: 'Vajrahetu', bija: 'maṃ', circle: 'west', slot: 2 },
    desc: '彌勒即金剛因：當來之果，已在因中轉法輪。',
  },
  {
    id: 'kokuzo', family: 'ho', samaya: 'jewel',
    t: { zh: '虛空藏菩薩', sk: 'Ākāśagarbha', bija: 'trāḥ', court: 'kokuzo', slot: 0 },
    k: { zh: '金剛寶菩薩', sk: 'Vajraratna', bija: 'oṃ', circle: 'south', slot: 0 },
    desc: '虛空藏即金剛寶：福智如虛空，無盡之藏。',
  },

  // ═══ 金剛界 · 十六大菩薩之餘十二 ════════════════════════════════════════════
  { id: 'k-o',    family: 'kongo', samaya: 'hook',
    k: { zh: '金剛王菩薩', sk: 'Vajrarāja', bija: 'jaḥ', circle: 'east', slot: 1 },
    desc: '鉤召一切眾生，入不退轉。' },
  { id: 'k-ai',   family: 'kongo', samaya: 'arrow',
    k: { zh: '金剛愛菩薩', sk: 'Vajrarāga', bija: 'hoḥ', circle: 'east', slot: 2 },
    desc: '以悲箭射厭離心，染而不染。' },
  { id: 'k-ki',   family: 'kongo', samaya: 'vajra3',
    k: { zh: '金剛喜菩薩', sk: 'Vajrasādhu', bija: 'saḥ', circle: 'east', slot: 3 },
    desc: '善哉善哉，慶一切眾生本有之德。' },
  { id: 'k-ko',   family: 'ho', samaya: 'sun',
    k: { zh: '金剛光菩薩', sk: 'Vajrateja', bija: 'āṃ', circle: 'south', slot: 1 },
    desc: '智光如日，破無明暗。' },
  { id: 'k-do',   family: 'ho', samaya: 'banner',
    k: { zh: '金剛幢菩薩', sk: 'Vajraketu', bija: 'trāṃ', circle: 'south', slot: 2 },
    desc: '建滿願之幢，雨一切寶。' },
  { id: 'k-sho',  family: 'ho', samaya: 'smile',
    k: { zh: '金剛笑菩薩', sk: 'Vajrahāsa', bija: 'haḥ', circle: 'south', slot: 3 },
    desc: '破顏微笑，諸佛歡喜之印。' },
  { id: 'k-go',   family: 'renge', samaya: 'tongue',
    k: { zh: '金剛語菩薩', sk: 'Vajrabhāṣa', bija: 'raṃ', circle: 'west', slot: 3 },
    desc: '六十四種梵音，言說即真言。' },
  { id: 'k-gyo',  family: 'katsuma', samaya: 'karma',
    k: { zh: '金剛業菩薩', sk: 'Vajrakarma', bija: 'kaṃ', circle: 'north', slot: 0 },
    desc: '一切所作皆成佛事。' },
  { id: 'k-gou',  family: 'katsuma', samaya: 'armor',
    k: { zh: '金剛護菩薩', sk: 'Vajrarakṣa', bija: 'haṃ', circle: 'north', slot: 1 },
    desc: '被大誓莊嚴之甲冑。' },
  { id: 'k-ge',   family: 'katsuma', samaya: 'fang',
    k: { zh: '金剛牙菩薩', sk: 'Vajrayakṣa', bija: 'hūṃ', circle: 'north', slot: 2 },
    desc: '現大牙摧伏，護而能威。' },
  { id: 'k-ken',  family: 'katsuma', samaya: 'fist',
    t: { zh: '金剛拳菩薩', sk: 'Vajrasandhi', bija: 'vaṃ', court: 'kongoshu', slot: 4 },
    k: { zh: '金剛拳菩薩', sk: 'Vajrasandhi', bija: 'vaṃ', circle: 'north', slot: 3 },
    desc: '三密合成，握固成就之印。兩部同名同體。' },

  // ═══ 金剛界 · 四波羅蜜菩薩（圍繞大日）═══════════════════════════════════════
  { id: 'p-kon', family: 'kongo', samaya: 'vajra5',
    k: { zh: '金剛波羅蜜', sk: 'Vajrapāramitā', bija: 'hūṃ', circle: 'center', slot: 0 },
    desc: '四佛供養大日：堅固之度。' },
  { id: 'p-ho',  family: 'ho', samaya: 'jewel',
    k: { zh: '寶波羅蜜', sk: 'Ratnapāramitā', bija: 'trāḥ', circle: 'center', slot: 1 },
    desc: '四佛供養大日：富饒之度。' },
  { id: 'p-hou', family: 'renge', samaya: 'lotus',
    k: { zh: '法波羅蜜', sk: 'Dharmapāramitā', bija: 'hrīḥ', circle: 'center', slot: 2 },
    desc: '四佛供養大日：清淨之度。' },
  { id: 'p-katsu', family: 'katsuma', samaya: 'karma',
    k: { zh: '業波羅蜜', sk: 'Karmapāramitā', bija: 'aḥ', circle: 'center', slot: 3 },
    desc: '四佛供養大日：作業之度。' },

  // ═══ 金剛界 · 內外八供養 ═══════════════════════════════════════════════════
  { id: 'g-ki',  family: 'kongo', samaya: 'vajra3',
    k: { zh: '金剛嬉菩薩', sk: 'Vajralāsyā', bija: 'haḥ', circle: 'inner', slot: 0 },
    desc: '內供養：嬉戲之悅。' },
  { id: 'g-man', family: 'ho', samaya: 'garland',
    k: { zh: '金剛鬘菩薩', sk: 'Vajramālā', bija: 'trāṭ', circle: 'inner', slot: 1 },
    desc: '內供養：華鬘之嚴。' },
  { id: 'g-ka',  family: 'renge', samaya: 'lute',
    k: { zh: '金剛歌菩薩', sk: 'Vajragītā', bija: 'gīḥ', circle: 'inner', slot: 2 },
    desc: '內供養：歌詠之妙。' },
  { id: 'g-bu',  family: 'katsuma', samaya: 'vajra3',
    k: { zh: '金剛舞菩薩', sk: 'Vajranṛtyā', bija: 'kṛṭ', circle: 'inner', slot: 3 },
    desc: '內供養：旋舞之儀。' },
  { id: 'g-ko',  family: 'kongo', samaya: 'incense',
    k: { zh: '金剛香菩薩', sk: 'Vajradhūpā', bija: 'aḥ', circle: 'outer', slot: 0 },
    desc: '外供養：燒香遍法界。' },
  { id: 'g-ke',  family: 'ho', samaya: 'flower',
    k: { zh: '金剛華菩薩', sk: 'Vajrapuṣpā', bija: 'oṃ', circle: 'outer', slot: 1 },
    desc: '外供養：散華雨繽紛。' },
  { id: 'g-to',  family: 'renge', samaya: 'lamp',
    k: { zh: '金剛燈菩薩', sk: 'Vajrālokā', bija: 'dīḥ', circle: 'outer', slot: 2 },
    desc: '外供養：燈明照幽冥。' },
  { id: 'g-zu',  family: 'katsuma', samaya: 'conch',
    k: { zh: '金剛塗菩薩', sk: 'Vajragandhā', bija: 'gaḥ', circle: 'outer', slot: 3 },
    desc: '外供養：塗香淨身心。' },

  // ═══ 金剛界 · 四攝菩薩（四門）═══════════════════════════════════════════════
  { id: 's-ko',  family: 'kongo', samaya: 'hook',
    k: { zh: '金剛鉤菩薩', sk: 'Vajrāṅkuśa', bija: 'jaḥ', circle: 'gate', slot: 0 },
    desc: '四攝：鉤之，引入壇城。' },
  { id: 's-saku', family: 'kongo', samaya: 'rope',
    k: { zh: '金剛索菩薩', sk: 'Vajrapāśa', bija: 'hūṃ', circle: 'gate', slot: 1 },
    desc: '四攝：索之，繫於菩提。' },
  { id: 's-sa',  family: 'kongo', samaya: 'chain',
    k: { zh: '金剛鎖菩薩', sk: 'Vajrasphoṭa', bija: 'vaṃ', circle: 'gate', slot: 2 },
    desc: '四攝：鎖之，令不退失。' },
  { id: 's-rei', family: 'kongo', samaya: 'bell',
    k: { zh: '金剛鈴菩薩', sk: 'Vajrāveśa', bija: 'hoḥ', circle: 'gate', slot: 3 },
    desc: '四攝：鈴之，歡喜遍入。' },

  // ═══ 理趣會專屬 · 四金剛（欲觸愛慢，唯現於理趣會）═══════════════════════════
  { id: 'r-yoku', family: 'kongo', samaya: 'arrow', rishuOnly: true,
    k: { zh: '欲金剛', sk: 'Iṣṭavajra', bija: 'hūṃ' },
    desc: '理趣：大欲清淨，箭離弦而即空。' },
  { id: 'r-soku', family: 'kongo', samaya: 'vajra3', rishuOnly: true,
    k: { zh: '觸金剛', sk: 'Kelikilavajra', bija: 'hūṃ' },
    desc: '理趣：觸之本然，抱持而不縛。' },
  { id: 'r-ai', family: 'kongo', samaya: 'banner', rishuOnly: true,
    k: { zh: '愛金剛', sk: 'Rāgavajra', bija: 'hūṃ' },
    desc: '理趣：愛縛即解脫，摩竭幢高舉。' },
  { id: 'r-man', family: 'kongo', samaya: 'fist', rishuOnly: true,
    k: { zh: '慢金剛', sk: 'Mānavajra', bija: 'hūṃ' },
    desc: '理趣：大慢即大我，傲然而禮萬物。' },

  // ═══ 胎藏 · 遍知院 ═════════════════════════════════════════════════════════
  { id: 'henchi', family: 'butsu', samaya: 'flame-tri',
    t: { zh: '一切如來智印', sk: 'Sarvatathāgata-jñānamudrā', bija: 'aṃ', court: 'henchi', slot: 0 },
    desc: '三角智火之印，諸佛能生之智。' },
  { id: 'butsugen', family: 'butsu', samaya: 'eye',
    t: { zh: '佛眼佛母', sk: 'Buddhalocanā', bija: 'ga', court: 'henchi', slot: 1 },
    desc: '能生諸佛之眼，遍知之母。' },
  { id: 'shichikutei', family: 'butsu', samaya: 'vase',
    t: { zh: '七俱胝佛母', sk: 'Cundī', bija: 'bu', court: 'henchi', slot: 2 },
    desc: '准提，七千萬佛所共說之母。' },

  // ═══ 胎藏 · 持明院 ═════════════════════════════════════════════════════════
  { id: 'hannya', family: 'butsu', samaya: 'sutra',
    t: { zh: '般若菩薩', sk: 'Prajñāpāramitā', bija: 'jña', court: 'jimyo', slot: 0 },
    desc: '般若波羅蜜之尊形，諸明之母。' },
  { id: 'fudo', family: 'kongo', samaya: 'sword',
    t: { zh: '不動明王', sk: 'Acalanātha', bija: 'hāṃ', court: 'jimyo', slot: 1 },
    mantra: 'namaḥ samanta-vajrāṇāṃ hāṃ',
    desc: '大日之教令輪身，慧刀羂索，坐磐石而不動。' },
  { id: 'gozanze-t', family: 'kongo', samaya: 'vajra5',
    t: { zh: '降三世明王', sk: 'Trailokyavijaya', bija: 'hūṃ', court: 'jimyo', slot: 2 },
    desc: '降伏三界貪瞋癡，足踏大自在天。' },
  { id: 'daiitoku', family: 'kongo', samaya: 'staff',
    t: { zh: '大威德明王', sk: 'Yamāntaka', bija: 'hrīḥ', court: 'jimyo', slot: 3 },
    desc: '六足尊，摧閻魔之死主。' },

  // ═══ 胎藏 · 蓮華部院（觀音院）═══════════════════════════════════════════════
  { id: 'sho-kannon', family: 'renge', samaya: 'lotus',
    t: { zh: '聖觀自在', sk: 'Ārya-Avalokiteśvara', bija: 'sa', court: 'renge', slot: 0 },
    desc: '蓮華部主，未敷之蓮持於手。' },
  { id: 'tara', family: 'renge', samaya: 'lotus-blue',
    t: { zh: '多羅菩薩', sk: 'Tārā', bija: 'taṃ', court: 'renge', slot: 1 },
    desc: '觀音悲淚所生之度母。' },
  { id: 'bikuchi', family: 'renge', samaya: 'vase',
    t: { zh: '毗俱胝菩薩', sk: 'Bhṛkuṭī', bija: 'bhṛ', court: 'renge', slot: 2 },
    desc: '顰眉所生，折伏難化。' },
  { id: 'seishi', family: 'renge', samaya: 'lotus-bud',
    t: { zh: '大勢至菩薩', sk: 'Mahāsthāmaprāpta', bija: 'saṃ', court: 'renge', slot: 3 },
    desc: '智慧之光普照，得大勢力。' },
  { id: 'bato', family: 'renge', samaya: 'horse',
    t: { zh: '馬頭觀音', sk: 'Hayagrīva', bija: 'haṃ', court: 'renge', slot: 4 },
    desc: '蓮華部之忿怒，如馬食草啖盡煩惱。' },
  { id: 'byakue', family: 'renge', samaya: 'lotus',
    t: { zh: '白衣觀音', sk: 'Pāṇḍaravāsinī', bija: 'paṃ', court: 'renge', slot: 5 },
    desc: '住白蓮中，蓮華部之部母。' },

  // ═══ 胎藏 · 金剛手院 ═══════════════════════════════════════════════════════
  { id: 'kongosatta-t', family: 'kongo', samaya: 'vajra5',
    t: { zh: '金剛薩埵', sk: 'Vajrasattva', bija: 'vaṃ', court: 'kongoshu', slot: 0 },
    desc: '金剛部主。與八葉普賢同體異位，此其在用之身。' },
  { id: 'mamaki', family: 'kongo', samaya: 'vajra3',
    t: { zh: '忙莽雞金剛母', sk: 'Māmakī', bija: 'maṃ', court: 'kongoshu', slot: 1 },
    desc: '金剛部之部母，多眷屬之母。' },
  { id: 'kongoshin', family: 'kongo', samaya: 'needle',
    t: { zh: '金剛針菩薩', sk: 'Vajrasūcī', bija: 'sūṃ', court: 'kongoshu', slot: 2 },
    desc: '一針徹萬法，無不通達。' },
  { id: 'kongoko-nyo', family: 'kongo', samaya: 'hook',
    t: { zh: '金剛鉤女', sk: 'Vajrāṅkuśī', bija: 'aḥ', court: 'kongoshu', slot: 3 },
    desc: '鉤召之女使，攝諸難化。' },

  // ═══ 胎藏 · 釋迦院 ═════════════════════════════════════════════════════════
  { id: 'shaka', family: 'butsu', samaya: 'wheel',
    t: { zh: '釋迦牟尼佛', sk: 'Śākyamuni', bija: 'bhaḥ', court: 'shaka', slot: 0 },
    desc: '大日之變化身，於閻浮提轉法輪者。' },
  { id: 'gozo', family: 'butsu', samaya: 'flame-tri',
    t: { zh: '如來毫相菩薩', sk: 'Tathāgatorṇā', bija: 'aṃ', court: 'shaka', slot: 1 },
    desc: '眉間白毫一相，所放即遍照。' },
  { id: 'munosho', family: 'kongo', samaya: 'staff',
    t: { zh: '無能勝明王', sk: 'Aparājita', bija: 'dhriṃ', court: 'shaka', slot: 2 },
    desc: '釋迦之教令輪身，魔軍無能勝者。' },

  // ═══ 胎藏 · 文殊院 ═════════════════════════════════════════════════════════
  { id: 'gokei-monju', family: 'butsu', samaya: 'sword',
    t: { zh: '五髻文殊', sk: 'Mañjuśrī-kumārabhūta', bija: 'maṃ', court: 'monju', slot: 0 },
    desc: '童真五髻，五智未分之相。與八葉文殊同體異位。' },
  { id: 'komo', family: 'butsu', samaya: 'rope',
    t: { zh: '光網童子', sk: 'Jālinīprabha', bija: 'jaṃ', court: 'monju', slot: 1 },
    desc: '文殊使者，光明為網。' },
  { id: 'mukuko', family: 'butsu', samaya: 'lotus-bud',
    t: { zh: '無垢光童子', sk: 'Vimalaprabha', bija: 'hāṃ', court: 'monju', slot: 2 },
    desc: '文殊使者，無垢之光。' },

  // ═══ 胎藏 · 除蓋障院 · 地藏院 · 虛空藏院 · 蘇悉地院 ══════════════════════════
  { id: 'jokaisho', family: 'butsu', samaya: 'jewel-flame',
    t: { zh: '除蓋障菩薩', sk: 'Sarvanīvaraṇaviṣkambhin', bija: 'aḥ', court: 'jokaisho', slot: 0 },
    desc: '除一切煩惱之蓋障，如珠出濁水。' },
  { id: 'himin', family: 'butsu', samaya: 'jewel',
    t: { zh: '悲愍菩薩', sk: 'Karuṇāmṛḍita', bija: 'yaṃ', court: 'jokaisho', slot: 1 },
    desc: '悲愍慧者，手作除障之印。' },
  { id: 'jizo', family: 'butsu', samaya: 'jewel-flame',
    t: { zh: '地藏菩薩', sk: 'Kṣitigarbha', bija: 'ha', court: 'jizo', slot: 0 },
    desc: '大地之藏，荷負末世眾生。' },
  { id: 'hosho-bo', family: 'butsu', samaya: 'jewel',
    t: { zh: '寶處菩薩', sk: 'Ratnākara', bija: 'daṃ', court: 'jizo', slot: 1 },
    desc: '寶之所出處，地中伏藏。' },
  { id: 'senju', family: 'renge', samaya: 'lotus',
    t: { zh: '千手千眼觀自在', sk: 'Sahasrabhuja', bija: 'hrīḥ', court: 'kokuzo', slot: 1 },
    desc: '千臂千眼，大悲之極致。現圖置於虛空藏院。' },
  { id: 'juichimen', family: 'renge', samaya: 'vase',
    t: { zh: '十一面觀自在', sk: 'Ekādaśamukha', bija: 'ka', court: 'soshitsuji', slot: 0 },
    desc: '十一面照十一品無明。' },
  { id: 'gundari', family: 'kongo', samaya: 'vajra3',
    t: { zh: '金剛軍荼利', sk: 'Kuṇḍalī', bija: 'hūṃ', court: 'soshitsuji', slot: 1 },
    desc: '甘露軍荼利，蛇瓔忿怒，辟除諸障。' },

  // ═══ 胎藏 · 外金剛部院（十二天為代表）═══════════════════════════════════════
  { id: 'taishaku', family: 'ten', samaya: 'vajra1',
    t: { zh: '帝釋天', sk: 'Indra', bija: 'ī', court: 'gekongobu', slot: 0 },
    desc: '東方護世，忉利之主。' },
  { id: 'katen', family: 'ten', samaya: 'flame',
    t: { zh: '火天', sk: 'Agni', bija: 'a', court: 'gekongobu', slot: 1 },
    desc: '東南，護摩之口，諸天之口。' },
  { id: 'emma', family: 'ten', samaya: 'staff',
    t: { zh: '焰摩天', sk: 'Yama', bija: 'vai', court: 'gekongobu', slot: 2 },
    desc: '南方，死王，人頭幢為印。' },
  { id: 'rasetsu', family: 'ten', samaya: 'sword',
    t: { zh: '羅剎天', sk: 'Rākṣasa', bija: 'rakṣa', court: 'gekongobu', slot: 3 },
    desc: '西南，啖食之主，攝諸羅剎。' },
  { id: 'suiten', family: 'ten', samaya: 'rope',
    t: { zh: '水天', sk: 'Varuṇa', bija: 'va', court: 'gekongobu', slot: 4 },
    desc: '西方，龍索之主，水之天。' },
  { id: 'futen', family: 'ten', samaya: 'banner',
    t: { zh: '風天', sk: 'Vāyu', bija: 'vā', court: 'gekongobu', slot: 5 },
    desc: '西北，風幢之天，行之所依。' },
  { id: 'bishamon', family: 'ten', samaya: 'stupa-small',
    t: { zh: '毗沙門天', sk: 'Vaiśravaṇa', bija: 'vai', court: 'gekongobu', slot: 6 },
    desc: '北方，多聞，掌中寶塔。' },
  { id: 'ishana', family: 'ten', samaya: 'trident',
    t: { zh: '伊舍那天', sk: 'Īśāna', bija: 'i', court: 'gekongobu', slot: 7 },
    desc: '東北，大自在之忿怒，三戟為印。' },
  { id: 'bonten', family: 'ten', samaya: 'lotus',
    t: { zh: '梵天', sk: 'Brahmā', bija: 'pra', court: 'gekongobu', slot: 8 },
    desc: '上方，四面之祖，娑婆之主。' },
  { id: 'jiten', family: 'ten', samaya: 'vase',
    t: { zh: '地天', sk: 'Pṛthivī', bija: 'pṛ', court: 'gekongobu', slot: 9 },
    desc: '下方，能持之地，證成道之天。' },
  { id: 'nitten', family: 'ten', samaya: 'sun',
    t: { zh: '日天', sk: 'Sūrya', bija: 'sū', court: 'gekongobu', slot: 10 },
    desc: '日輪之天，晝之照。' },
  { id: 'gatten', family: 'ten', samaya: 'moon',
    t: { zh: '月天', sk: 'Candra', bija: 'caṃ', court: 'gekongobu', slot: 11 },
    desc: '月輪之天，夜之涼。' },
];

// ── 部族锚点：仅有一面之尊，于形变中摄入部主 ────────────────────────────────
// family → 在缺失一侧用作汇入点的节点 id
export const FAMILY_ANCHOR = {
  butsu: 'center',
  kongo: 'east',
  ho: 'south',
  renge: 'west',
  katsuma: 'north',
  ten: 'center', // 外金刚部诸天摄归大日（最外护世，本源所化）
};

export const byId = Object.fromEntries(DEITIES.map(d => [d.id, d]));
