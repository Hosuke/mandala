// ─────────────────────────────────────────────────────────────────────────────
// 悉曇轉寫：IAST 羅馬轉寫 → 悉曇文字（Unicode Siddham, U+11580–115FF）。
// 種字自數據編譯而出，非逐尊手填；法曼荼羅本以悉曇書之，此其真形。
// 規則：詞首元音用獨立字；輔音叢以怛達點（virama）連書成合體；
//       輔音後之元音作母音記號（a 不標）；詞末孤輔音以 virama 收。
// ─────────────────────────────────────────────────────────────────────────────

const C = (cp) => String.fromCodePoint(cp);

// 獨立元音
const VOWEL_IND = {
  a: C(0x11580), ā: C(0x11581), i: C(0x11582), ī: C(0x11583),
  u: C(0x11584), ū: C(0x11585), ṛ: C(0x11586), ṝ: C(0x11587),
  e: C(0x1158A), ai: C(0x1158B), o: C(0x1158C), au: C(0x1158D),
};
// 母音記號（綴於輔音）
const VOWEL_SIGN = {
  a: '', ā: C(0x115AF), i: C(0x115B0), ī: C(0x115B1),
  u: C(0x115B2), ū: C(0x115B3), ṛ: C(0x115B4), ṝ: C(0x115B5),
  e: C(0x115B8), ai: C(0x115B9), o: C(0x115BA), au: C(0x115BB),
};
// 輔音
const CONS = {
  k: C(0x1158E), kh: C(0x1158F), g: C(0x11590), gh: C(0x11591), ṅ: C(0x11592),
  c: C(0x11593), ch: C(0x11594), j: C(0x11595), jh: C(0x11596), ñ: C(0x11597),
  ṭ: C(0x11598), ṭh: C(0x11599), ḍ: C(0x1159A), ḍh: C(0x1159B), ṇ: C(0x1159C),
  t: C(0x1159D), th: C(0x1159E), d: C(0x1159F), dh: C(0x115A0), n: C(0x115A1),
  p: C(0x115A2), ph: C(0x115A3), b: C(0x115A4), bh: C(0x115A5), m: C(0x115A6),
  y: C(0x115A7), r: C(0x115A8), l: C(0x115A9), v: C(0x115AA),
  ś: C(0x115AB), ṣ: C(0x115AC), s: C(0x115AD), h: C(0x115AE),
};
const ANUSVARA = C(0x115BD); // ṃ
const VISARGA = C(0x115BE);  // ḥ
const VIRAMA = C(0x115BF);   // 怛達點

// 貪婪取詞：長者先試（kh, ai 之類二字位優先）
const TOKENS = [
  ...Object.keys(CONS).filter(k => k.length === 2),
  ...Object.keys(VOWEL_IND).filter(k => k.length === 2),
  ...Object.keys(CONS).filter(k => k.length === 1),
  ...Object.keys(VOWEL_IND).filter(k => k.length === 1),
  'ṃ', 'ḥ',
].sort((a, b) => b.length - a.length);

export function siddham(roman) {
  let i = 0;
  // 歸一化：小寫、ṁ→ṃ（IAST 異寫）；遇不識之符則返空，令呼者退羅馬轉寫
  const src = roman.normalize('NFC').trim().toLowerCase().replace(/ṁ/g, 'ṃ');
  let out = '';
  let pendingCons = []; // 未收元音之輔音叢

  const flushCons = (vowelSign) => {
    if (!pendingCons.length) return;
    out += pendingCons.join(VIRAMA) + (vowelSign ?? VIRAMA);
    pendingCons = [];
  };

  while (i < src.length) {
    let tok = null;
    for (const t of TOKENS) {
      if (src.startsWith(t, i)) { tok = t; break; }
    }
    if (!tok) return ''; // 不識之符：寧缺毋誤

    if (tok in CONS) {
      pendingCons.push(CONS[tok]);
    } else if (tok in VOWEL_IND) {
      if (pendingCons.length) flushCons(VOWEL_SIGN[tok]);
      else out += VOWEL_IND[tok];
    } else if (tok === 'ṃ') {
      flushCons(''); // 詞末輔音帶固有 a
      out += ANUSVARA;
    } else if (tok === 'ḥ') {
      flushCons('');
      out += VISARGA;
    }
    i += tok.length;
  }
  // 詞末孤輔音：以 virama 收（如 trāṭ 之 ṭ）
  if (pendingCons.length) out += pendingCons.join(VIRAMA) + VIRAMA;
  return out;
}
