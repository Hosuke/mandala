// ─────────────────────────────────────────────────────────────────────────────
// 緣之層：人與壇城相接之介面。題簽、滑尺（不二）、四鈕、法語、尊位牌。
// ─────────────────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

export function initUI(h, T0) {
  let T = T0; // 三語標籤表（i18n.uiTable）
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
  $('btn-kodo').addEventListener('click', () => h.onKodo());
  $('btn-sound').addEventListener('click', () => h.onSound());
  $('btn-reset').addEventListener('click', () => h.onReset());
  $('info-close').addEventListener('click', () => api.hideInfo());
  $('info-card').addEventListener('click', () => h.onCard());
  $('bond-line').addEventListener('click', () => h.onBondClick());
  document.querySelectorAll('#langs button').forEach(b =>
    b.addEventListener('click', () => h.onLang(b.dataset.lang)));

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
      const i = l < 1 / 3 ? 0 : l < 2 / 3 ? 1 : 2;
      $('realm-name').textContent = T.realms[i];
      $('realm-sub').textContent = ['GARBHADHĀTU', 'ADVAYA', 'VAJRADHĀTU'][i];
      document.body.classList.toggle('advaya', i === 1);
    },

    caption(head, title, text, idx, n) {
      clearTimeout(captionTimer);
      $('caption-head').textContent = `${head} · ${T.num(idx, n)}`;
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
      btnDescent.textContent = active && dir === 'descent' ? T.stop : T.descent;
      btnAscent.textContent = active && dir === 'ascent' ? T.stop : T.ascent;
      btnDescent.classList.toggle('lit', active && dir === 'descent');
      btnAscent.classList.toggle('lit', active && dir === 'ascent');
    },

    enterUI(entered) {
      btnEnter.textContent = entered ? T.exit : T.enter;
      btnEnter.classList.toggle('lit', entered);
      $('hint').textContent = entered ? T.hintFP : T.hintAerial;
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

    kodoUI(active) { $('btn-kodo').classList.toggle('lit', active); },

    kanUI(active) {
      $('btn-kan').textContent = active ? T.kanExit : T.kan;
      $('btn-kan').classList.toggle('lit', active);
      if (active) $('hint').textContent = T.hintKan;
    },

    flash() {
      const f = $('flash');
      f.classList.add('on');
      setTimeout(() => f.classList.remove('on'), 200);
    },

    soundUI(mutedNow) {
      $('btn-sound').textContent = mutedNow ? T.soundOff : T.soundOn;
      $('btn-sound').classList.toggle('lit', !mutedNow);
    },

    setLangTable(table, langKey) {
      T = table;
      // 懸浮提示（title）亦隨語
      const TITLE_IDS = {
        descent: 'btn-descent', ascent: 'btn-ascent', form: 'btn-form',
        enter: 'btn-enter', toss: 'btn-toss', kan: 'btn-kan',
        kodo: 'btn-kodo', sound: 'btn-sound', reset: 'btn-reset',
      };
      for (const [k, id] of Object.entries(TITLE_IDS)) $(id).title = T.titles[k];
      // 靜物之字
      $('btn-kodo').textContent = T.kodoBtn;
      $('btn-toss').textContent = T.toss;
      $('btn-reset').textContent = T.reset;
      $('info-card').textContent = T.cardBtn;
      const ends = document.querySelectorAll('#slider-wrap .end');
      ends[0].textContent = T.sliderT;
      ends[1].textContent = T.sliderK;
      document.querySelector('.slider-track .mid').textContent = T.sliderMid;
      document.querySelectorAll('#langs button').forEach(b =>
        b.classList.toggle('active', b.dataset.lang === langKey));
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
