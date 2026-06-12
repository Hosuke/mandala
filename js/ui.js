// ─────────────────────────────────────────────────────────────────────────────
// 緣之層：人與壇城相接之介面。題簽、滑尺（不二）、四鈕、法語、尊位牌。
// ─────────────────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const NUM = '一二三四五六七八九';

export function initUI(h) {
  const lambda = $('lambda');
  const caption = $('caption');
  const info = $('info');
  const tooltip = $('tooltip');
  const btnDescent = $('btn-descent');
  const btnAscent = $('btn-ascent');
  const btnEnter = $('btn-enter');

  lambda.addEventListener('input', () => h.onLambda(lambda.value / 1000));
  btnDescent.addEventListener('click', () => h.onTraverse('descent'));
  btnAscent.addEventListener('click', () => h.onTraverse('ascent'));
  btnEnter.addEventListener('click', () => h.onEnter());
  $('btn-toss').addEventListener('click', () => h.onToss());
  $('btn-kan').addEventListener('click', () => h.onKan());
  $('btn-form').addEventListener('click', () => h.onForm());
  $('btn-sound').addEventListener('click', () => h.onSound());
  $('btn-reset').addEventListener('click', () => h.onReset());
  $('info-close').addEventListener('click', () => api.hideInfo());
  $('info-card').addEventListener('click', () => h.onCard());
  $('bond-line').addEventListener('click', () => h.onBondClick());

  window.addEventListener('keydown', e => {
    if (e.code === 'ArrowLeft') h.onLambda(Math.max(0, lambda.value / 1000 - 0.04), true);
    if (e.code === 'ArrowRight') h.onLambda(Math.min(1, lambda.value / 1000 + 0.04), true);
    if (e.code === 'Escape') h.onEscape();
    if (e.code === 'Space' && h.onSpace) { e.preventDefault(); h.onSpace(); }
  });

  let captionTimer = null;

  const api = {
    setLambda(v) { lambda.value = Math.round(v * 1000); },

    setRealm(l) {
      const [zh, sk] = l < 1 / 3
        ? ['大悲胎藏', 'GARBHADHĀTU']
        : l < 2 / 3
          ? ['不　二', 'ADVAYA']
          : ['金剛界', 'VAJRADHĀTU'];
      $('realm-name').textContent = zh;
      $('realm-sub').textContent = sk;
      document.body.classList.toggle('advaya', l >= 1 / 3 && l < 2 / 3);
    },

    caption(head, title, text, idx, n) {
      clearTimeout(captionTimer);
      $('caption-head').textContent = `${head} · ${NUM[idx]}／${NUM[n - 1]}`;
      $('caption-title').textContent = title;
      $('caption-text').textContent = text;
      caption.classList.remove('hidden');
      caption.classList.remove('pulse');
      void caption.offsetWidth; // 重觸發入場動畫
      caption.classList.add('pulse');
    },

    hideCaption(delay = 0) {
      clearTimeout(captionTimer);
      captionTimer = setTimeout(() => caption.classList.add('hidden'), delay);
    },

    traversalUI(active, dir) {
      btnDescent.textContent = active && dir === 'descent' ? '止' : '下轉';
      btnAscent.textContent = active && dir === 'ascent' ? '止' : '上轉';
      btnDescent.classList.toggle('lit', active && dir === 'descent');
      btnAscent.classList.toggle('lit', active && dir === 'ascent');
    },

    enterUI(entered) {
      btnEnter.textContent = entered ? '出壇' : '入壇';
      btnEnter.classList.toggle('lit', entered);
      $('hint').textContent = entered
        ? '拖曳環顧 · WASD 行於壇中 · Esc 出壇'
        : '拖曳旋觀 · 滾輪遠近 · 點尊得詳';
    },

    showInfo({ bija, bijaRoman, name, sk, family, familyColor, loc, desc, mantra, mantraSid }) {
      $('info-bija').textContent = bija;
      $('info-bija').style.color = familyColor;
      $('info-bija-roman').textContent = bijaRoman && bijaRoman !== bija ? bijaRoman : '';
      $('info-bija-roman').style.color = familyColor;
      $('info-name').textContent = name;
      $('info-sk').textContent = sk || '';
      const fam = $('info-family');
      fam.textContent = family;
      fam.style.borderColor = familyColor;
      fam.style.color = familyColor;
      $('info-loc').textContent = loc;
      $('info-desc').textContent = desc || '';
      const m = $('info-mantra');
      m.textContent = mantra || '';
      m.style.display = mantra ? '' : 'none';
      const ms = $('info-mantra-sid');
      ms.textContent = mantraSid || '';
      ms.style.display = mantraSid ? '' : 'none';
      info.classList.remove('hidden');
    },

    hideInfo() {
      info.classList.add('hidden');
      $('info-card').classList.add('hidden');
    },

    showCardButton(on) { $('info-card').classList.toggle('hidden', !on); },

    setBond(text) {
      const el = $('bond-line');
      el.classList.toggle('hidden', !text);
      if (text) el.textContent = text;
    },

    announce(head, title, text) {
      clearTimeout(captionTimer);
      $('caption-head').textContent = head;
      $('caption-title').textContent = title;
      $('caption-text').textContent = text;
      caption.classList.remove('hidden');
      caption.classList.remove('pulse');
      void caption.offsetWidth;
      caption.classList.add('pulse');
    },

    formUI(sub) { $('btn-form').textContent = sub; },

    kanUI(active) {
      $('btn-kan').textContent = active ? '出觀' : '觀法';
      $('btn-kan').classList.toggle('lit', active);
      if (active) $('hint').textContent = '輕觸以進 · 觀無促令 · Esc 出觀';
    },

    flash() {
      const f = $('flash');
      f.classList.add('on');
      setTimeout(() => f.classList.remove('on'), 200);
    },

    soundUI(mutedNow) {
      $('btn-sound').textContent = mutedNow ? '默' : '音';
      $('btn-sound').classList.toggle('lit', !mutedNow);
    },

    veilFlash(text, ms = 1300) {
      $('veil-text').textContent = text;
      $('veil').classList.add('on');
      setTimeout(() => $('veil').classList.remove('on'), ms);
    },

    tooltip(x, y, text) {
      if (!text) { tooltip.classList.add('hidden'); return; }
      tooltip.textContent = text;
      tooltip.style.left = `${x + 14}px`;
      tooltip.style.top = `${y - 10}px`;
      tooltip.classList.remove('hidden');
    },

    hideLoading() { $('loading').classList.add('done'); },
  };
  return api;
}
