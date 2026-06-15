// ─────────────────────────────────────────────────────────────────────────────
// 緣之層：人與壇城相接之介面。題簽、滑尺（不二）、四鈕、法語、尊位牌。
// ─────────────────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

export function initUI(h, T0, langKey0 = 'zh') {
  let T = T0; // 三語標籤表（i18n.uiTable）
  let curLang = langKey0; // 當前語鍵，原典帖取局部化題簽用
  const lambda = $('lambda');
  const caption = $('caption');
  const info = $('info');
  const tooltip = $('tooltip');
  const btnDescent = $('btn-descent');
  const btnAscent = $('btn-ascent');
  const btnEnter = $('btn-enter');
  const btnFold = $('btn-fold');
  const controls = $('controls');

  // 法具欄之收展：記於 localStorage；無所記而屏短（<700）者，初即收之
  let folded = false;
  try {
    const saved = localStorage.getItem('mandala-fold');
    folded = saved !== null ? saved === '1' : window.innerHeight < 700;
  } catch { folded = window.innerHeight < 700; /* 私隱模式 */ }
  const applyFold = () => {
    controls.classList.toggle('folded', folded);
    btnFold.textContent = folded ? T.fold : T.unfold; // 收則示「具」，招人啟之
    btnFold.classList.toggle('lit', folded);
    // 收起者亦絕鍵焦——目不可及，鍵亦不可及
    controls.querySelectorAll('button:not(#btn-fold)').forEach(b => {
      b.tabIndex = folded ? -1 : 0;
      b.setAttribute('aria-hidden', folded ? 'true' : 'false');
    });
  };
  btnFold.addEventListener('click', () => {
    folded = !folded;
    try { localStorage.setItem('mandala-fold', folded ? '1' : '0'); } catch { /* 私隱模式 */ }
    applyFold();
  });
  applyFold();

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
  $('btn-genten').addEventListener('click', () => h.onGenten());
  $('genten-close').addEventListener('click', () => api.closeGenten());
  $('info-close').addEventListener('click', () => api.hideInfo());
  $('info-card').addEventListener('click', () => h.onCard());
  $('bond-line').addEventListener('click', () => h.onBondClick());
  document.querySelectorAll('#langs button').forEach(b =>
    b.addEventListener('click', () => h.onLang(b.dataset.lang)));

  window.addEventListener('keydown', e => {
    // 原典帖開啟時為模態：唯 Esc 關之，其餘快捷鍵吞下，不擾背後壇城
    if (api.gentenOpen()) {
      if (e.code === 'Escape') api.closeGenten();
      return;
    }
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

    showInfo({ bija, bijaRoman, name, sk, family, familyColor, loc, desc, mantra, mantraSid, genten }) {
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
      const fig = $('info-genten');
      if (genten) {
        const img = $('info-genten-img');
        img.onerror = () => fig.classList.add('hidden'); // 缺檔則優雅缺省（本地參攷圖不上線時）
        img.src = genten.src;
        img.alt = genten.title;
        $('info-genten-link').href = genten.href;
        $('info-genten-title').textContent = genten.title;
        const credit = $('info-genten-credit');
        credit.textContent = genten.credit;
        credit.href = genten.href;
        fig.classList.remove('hidden');
      } else {
        fig.classList.add('hidden');
      }
      info.classList.remove('hidden');
    },

    hideInfo() {
      info.classList.add('hidden');
      $('info-card').classList.add('hidden');
    },

    infoOpen() { return !info.classList.contains('hidden'); },

    gentenOpen() { return !$('genten-view').classList.contains('hidden'); },

    openGenten(items) {
      const loc = o => (o ? (o[curLang] ?? o.zh) : '');
      $('genten-h').textContent = T.gentenTitle;
      $('genten-intro').textContent = T.gentenIntro;
      const grid = $('genten-grid');
      grid.textContent = '';
      for (const it of items) {
        const card = document.createElement('figure');
        card.className = 'genten-card';
        const a = document.createElement('a');
        a.href = it.sourceUrl; a.target = '_blank'; a.rel = 'noopener';
        const img = document.createElement('img');
        img.alt = loc(it.title); img.loading = 'lazy'; img.decoding = 'async';
        img.onerror = () => card.remove(); // 缺檔則撤卡（本地參攷圖不上線時）
        img.src = it.src;
        a.appendChild(img);
        const h3 = document.createElement('h3');
        h3.textContent = loc(it.title);
        const p = document.createElement('p');
        p.textContent = loc(it.note);
        const credit = document.createElement('a');
        credit.className = 'genten-credit';
        credit.href = it.sourceUrl; credit.target = '_blank'; credit.rel = 'noopener';
        credit.textContent = `${curLang === 'en' ? 'Source' : '出典'} · ${it.institution} · ${it.license} ↗`;
        card.append(a, h3, p, credit);
        grid.appendChild(card);
      }
      $('genten-view').classList.remove('hidden');
      $('genten-close').focus(); // 焦點移入覆蓋層（aria-modal）
    },

    closeGenten() {
      $('genten-view').classList.add('hidden');
      $('btn-genten').focus(); // 焦點歸於喚起之鈕
      if (h.onGentenClose) h.onGentenClose(); // 凡關閉（鈕／Esc／切換）皆解相機閘
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
      curLang = langKey;
      $('btn-genten').textContent = T.gentenBtn;
      $('btn-genten').title = T.titles.genten;
      // 懸浮提示（title）亦隨語
      const TITLE_IDS = {
        descent: 'btn-descent', ascent: 'btn-ascent', form: 'btn-form',
        enter: 'btn-enter', toss: 'btn-toss', kan: 'btn-kan',
        kodo: 'btn-kodo', sound: 'btn-sound', reset: 'btn-reset',
        fold: 'btn-fold',
      };
      for (const [k, id] of Object.entries(TITLE_IDS)) $(id).title = T.titles[k];
      // 靜物之字
      btnFold.textContent = folded ? T.fold : T.unfold;
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
