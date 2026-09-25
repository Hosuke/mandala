/* ─────────────────────────────────────────────────────────────────────────
   小紅書小工具之適配層（先於 app.js 載入；經典腳本，ES2017 為限）
   主線源碼一行不動：凡容器之約束，皆於此處從外圍收束。
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  // ── 一、運行時補缺（Chrome 61 無者，僅補主線實用者：fromEntries／flat／flatMap）──
  if (!Object.fromEntries) {
    Object.fromEntries = function (entries) {
      var o = {};
      Array.from(entries, function (kv) { o[kv[0]] = kv[1]; });
      return o;
    };
  }
  if (!Array.prototype.flat) {
    Object.defineProperty(Array.prototype, 'flat', {
      configurable: true, writable: true,
      value: function flat(depth) {
        var d = depth === undefined ? 1 : Number(depth) || 0;
        var out = [];
        (function walk(arr, lv) {
          for (var i = 0; i < arr.length; i++) {
            if (!(i in arr)) continue;
            if (Array.isArray(arr[i]) && lv > 0) walk(arr[i], lv - 1);
            else out.push(arr[i]);
          }
        })(this, d);
        return out;
      },
    });
  }

  if (!Array.prototype.flatMap) {
    Object.defineProperty(Array.prototype, 'flatMap', {
      configurable: true, writable: true,
      value: function flatMap(fn, thisArg) {
        var out = [];
        for (var i = 0; i < this.length; i++) {
          if (!(i in this)) continue;
          var r = fn.call(thisArg, this[i], i, this);
          if (Array.isArray(r)) out.push.apply(out, r); else out.push(r);
        }
        return out;
      },
    });
  }

  // ── 二、WebGL 畫素之預算：DPR ≤ 1.5，且繪製緩衝不逾約二百萬像素 ──
  var realDpr = window.devicePixelRatio || 1;
  try {
    Object.defineProperty(window, 'devicePixelRatio', {
      configurable: true,
      get: function () {
        var area = Math.max(1, window.innerWidth * window.innerHeight);
        var byBudget = Math.sqrt(2e6 / area);
        return Math.max(1, Math.min(realDpr, 1.5, byBudget));
      },
    });
  } catch (e) { /* 不可改者，任其原值 */ }

  // ── 三、頁面隱去則停幀：rAF 回呼暫存，復見乃續（主迴圈 dt 已夾於 0.05，無補算之虞）──
  var rawRaf = window.requestAnimationFrame.bind(window);
  var parked = [];
  window.requestAnimationFrame = function (cb) {
    if (document.hidden) { parked.push(cb); return 0; }
    return rawRaf(cb);
  };
  document.addEventListener('visibilitychange', function () {
    if (document.hidden || !parked.length) return;
    var q = parked; parked = [];
    q.forEach(function (cb) { rawRaf(cb); });
  });

  // ── 四、Flex gap 之行為檢測（非語法檢測）──
  function detectFlexGap() {
    var box = document.createElement('div');
    box.style.cssText = 'display:flex;flex-direction:column;row-gap:1px;position:absolute;visibility:hidden';
    box.appendChild(document.createElement('div'));
    box.appendChild(document.createElement('div'));
    document.body.appendChild(box);
    var ok = box.scrollHeight === 1;
    box.parentNode.removeChild(box);
    if (ok) document.documentElement.classList.add('supports-flex-gap');
  }

  // ── 五、容器之禁：外鏈與新窗不行，一律截於捕獲期 ──
  document.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (a.target === '_blank' || /^(https?:)?\/\//i.test(href)) ev.preventDefault();
  }, true);

  // ── 六、結緣之證：容器禁下載，改以相冊／筆記承之 ──
  function miniTool() { return window.xhs && window.xhs.miniTool; }

  function toast(msg) {
    var t = document.getElementById('mt-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'mt-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.className = 'show';
    clearTimeout(toast.timer);
    toast.timer = setTimeout(function () { t.className = ''; }, 2200);
  }

  function showCardSheet(dataUrl, fileName) {
    if (document.getElementById('mt-card-sheet')) return; // 已開，不疊
    var returnFocus = document.activeElement;
    var name = String(fileName || '').replace(/\.png$/i, '');
    var mt = miniTool();
    var canSave = !!(mt && typeof mt.saveImageToPhotosAlbum === 'function');
    var canPost = !!(mt && typeof mt.postNote === 'function');

    var sheet = document.createElement('div');
    sheet.id = 'mt-card-sheet';
    var panel = document.createElement('div');
    panel.className = 'panel';
    var img = document.createElement('img');
    img.src = dataUrl;
    img.alt = name;
    panel.appendChild(img);
    var row = document.createElement('div');
    row.className = 'actions';
    panel.appendChild(row);
    sheet.appendChild(panel);

    // 鍵盤模態：Esc 閉、Tab 困於板內、餘鍵不及背後壇城（捕獲於 document，先於 app 之 window 監聽）
    function onKey(ev) {
      if (ev.key === 'Escape') { ev.preventDefault(); close(); }
      else if (ev.key === 'Tab') {
        var bs = row.querySelectorAll('button');
        var i = Array.prototype.indexOf.call(bs, document.activeElement);
        ev.preventDefault();
        bs[(i + (ev.shiftKey ? bs.length - 1 : 1)) % bs.length].focus();
      }
      ev.stopPropagation();
    }
    document.addEventListener('keydown', onKey, true);
    function close() {
      document.removeEventListener('keydown', onKey, true);
      if (sheet.parentNode) sheet.parentNode.removeChild(sheet);
      if (returnFocus && returnFocus.focus) returnFocus.focus();
    }
    function button(label, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.addEventListener('click', fn);
      row.appendChild(b);
      return b;
    }

    // 大圖先落臨時檔，再交端能力；無 writeTempFile 者直傳 data URI
    function asFile() {
      if (mt && typeof mt.writeTempFile === 'function') {
        return mt.writeTempFile({ data: dataUrl }).then(function (r) { return r.filePath; });
      }
      return Promise.resolve(dataUrl);
    }

    if (canSave) {
      button('存入相冊', function () {
        asFile()
          .then(function (p) { return mt.saveImageToPhotosAlbum({ filePath: p }); })
          .then(function () { toast('已存入相冊'); close(); })
          .catch(function () { toast('未能存入，請許相冊之權後再試'); });
      });
    }
    if (canPost) {
      button('發為筆記', function () {
        asFile()
          .then(function (p) {
            return mt.postNote({
              title: name.slice(0, 20),
              content: '閉目擲花，花落此尊，即與結緣。\n#金胎不二 #曼荼羅',
              pageType: 'photo_publish',
              mediaInfo: { image_resources: [{ url: p }] },
            });
          })
          .then(close)
          .catch(function () { /* 使用者自退發布頁，不擾之 */ });
      });
    }
    if (!canSave && !canPost) {
      var note = document.createElement('p');
      note.textContent = '請於小紅書內開啟，方可存證';
      panel.insertBefore(note, row);
    }
    button('收起', close).className = 'ghost';
    sheet.addEventListener('click', function (ev) { if (ev.target === sheet) close(); });
    document.body.appendChild(sheet);
    row.querySelector('button').focus();
  }

  var rawClick = HTMLAnchorElement.prototype.click;
  HTMLAnchorElement.prototype.click = function () {
    var href = this.getAttribute('href') || '';
    if (this.hasAttribute('download') && /^data:image\//.test(href)) {
      showCardSheet(href, this.getAttribute('download'));
      return;
    }
    if (this.hasAttribute('download')) return; // 他種下載，容器不行
    return rawClick.call(this);
  };

  // ── 七、WebGL context 失而不重建：示輕量之狀，輕觸重入 ──
  function watchContext() {
    var canvas = document.getElementById('gl');
    if (!canvas) return;
    canvas.addEventListener('webglcontextlost', function () {
      if (document.getElementById('mt-lost')) return;
      var d = document.createElement('div');
      d.id = 'mt-lost';
      d.textContent = '壇城暫隱 · 輕觸重入';
      d.addEventListener('click', function () { location.reload(); });
      document.body.appendChild(d);
    }, false);
  }

  // ── 八、原典圖不隨包：詳情框之圖截其 src，免請包內所無之檔 ──
  function muteGenten() {
    var img = document.getElementById('info-genten-img');
    if (!img) return;
    Object.defineProperty(img, 'src', { configurable: true, get: function () { return ''; }, set: function () {} });
  }

  function onReady() { detectFlexGap(); watchContext(); muteGenten(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady);
  else onReady();
})();
