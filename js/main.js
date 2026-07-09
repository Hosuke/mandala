// ─────────────────────────────────────────────────────────────────────────────
// 樞紐：諸層於此合縫。
//   不二層（數據）→ 投影（布局）→ 相（紋理）→ 緣（介面）→ 行（遍歷・入壇）
// 滑尺即理智之際，遍歷即上下二門，入壇即法轉羯磨。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';
import { DEITIES, byId } from './data/deities.js';
import { siddham as siddhamRaw, siddhamPhrase as siddhamPhraseRaw } from './data/siddham.js';

// 悉曇字體未及載入時，種字退羅馬轉寫（canvas 紋理不會隨字體後到而重繪）
let sidFontReady = false;
const siddham = b => (sidFontReady ? siddhamRaw(b) : '');
const sidPhrase = m => (sidFontReady && m ? siddhamPhraseRaw(m) : '');
import {
  COURTS, RING_RADIUS, PETAL_RADIUS, FAMILY_COLOR, FAMILY_ZH, ASSEMBLIES,
} from './data/courts.js';
import {
  morphTargets, assemblyEchoes, taizoEdges, kongoEdges,
  spiralCurve, cellCenter, assemblyByKey, CELL, DESCENT_ORDER,
} from './layout.js';
import {
  uiTable, COURT_EN, ASM_EN, CIRCLE_EN, FAMILY_EN, FORMVAR_EN,
  FORM_I18N, TAIZO_I18N, ASM_I18N, STAGE_I18N, DESC_I18N,
} from './data/i18n.js';
import { deityTexture, labelTexture, glowTexture, ringTexture, petalTexture, matcapTexture } from './textures.js';
import { NEW_DEITIES, SANRINJIN, KODO_LAYOUT, KODO_I18N } from './data/kodo.js';
import { gentenFor, gentenGallery } from './data/genten.js';
import { buildSamaya } from './samaya3d.js';
import { bondCard } from './card.js';
import * as bell from './bell.js';
import { Goso } from './goso.js';

// ── 三語 ────────────────────────────────────────────────────────────────────
let lang = 'zh';
try { lang = localStorage.getItem('mandala-lang') || 'zh'; } catch { /* 私隱模式 */ }
if (!['zh', 'en', 'ja'].includes(lang)) lang = 'zh';
let T = uiTable(lang);
import { stepTweens, tween, smoothstep, damp } from './anim.js';
import { Rig } from './camera.js';
import { Traversal } from './traversal.js';
import { initUI } from './ui.js';

const CIRCLE_ZH = {
  center: '中央月輪', east: '東方月輪', south: '南方月輪',
  west: '西方月輪', north: '北方月輪',
  inner: '內供養位', outer: '外供養位', gate: '四攝・壇門',
};
const FORM_ZH = {
  bija: '種字', samaya: '三昧耶形', subtle: '微細',
  offer: '供養', wrath: '忿怒', 'wrath-samaya': '忿怒三昧耶',
  figure: '尊形', 'figure-subtle': '尊住杵中',
  'figure-offer': '尊捧供養', 'figure-wrath': '忿怒尊形',
};
const courtByKey = Object.fromEntries(COURTS.map(c => [c.key, c]));
const PI = Math.PI;
const EPS = 1e-4;

// 取最短弧之角差，繞至 [-π, π]，使節點走短弧而不繞遠路
const shortAngle = (a, b) => {
  let d = (b - a) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
};

// 釋義之層隨語而轉；壇上之字（尊名・名牌・種字）不譯
const descOf = d => (lang === 'zh' ? d.desc : (DESC_I18N[lang]?.[d.id] ?? d.desc));
const courtName = key => (lang === 'en' ? COURT_EN[key] : courtByKey[key].zh);
const asmName = a => (lang === 'en' ? ASM_EN[a.key] : a.zh);
const circleName = c => (lang === 'en' ? CIRCLE_EN[c] : CIRCLE_ZH[c]);
const famName = f => (lang === 'en' ? FAMILY_EN[f] : FAMILY_ZH[f]);
const formVarName = f => (lang === 'en' ? FORMVAR_EN[f] : FORM_ZH[f]);

const state = {
  lambda: 0, lambdaTarget: 0,
  stand: 0, entered: false,
  focusKey: null, focusRing: null, travDir: null,
  form: 'bija', // 四曼之相：bija 法 · samaya 三昧耶 · figure 大
  kodo: false,  // 羯磨壇（東寺講堂廿一尊）
};

// 講堂所缺四尊（kodoOnly）併入圖：flat 記錄包為 k 面，行狀譯文併入 i18n
const KODO_RECORDS = NEW_DEITIES.map(r => ({
  id: r.id, family: r.family, samaya: r.samaya, kodoOnly: true,
  k: { zh: r.zh, sk: r.sk, bija: r.bija },
  desc: r.desc,
}));
for (const r of NEW_DEITIES) {
  DESC_I18N.en[r.id] = r.descEn;
  DESC_I18N.ja[r.id] = r.descJa;
}
const ALL_DEITIES = [...DEITIES, ...KODO_RECORDS];

const FORMS = [
  { key: 'bija', zh: '法曼荼羅', sub: '種字', desc: '以悉曇種字現諸尊——音聲文字之相。' },
  { key: 'samaya', zh: '三昧耶曼荼羅', sub: '標幟', desc: '以器仗印契現諸尊——本誓之相。' },
  { key: 'figure', zh: '大曼荼羅', sub: '尊形', desc: '以相好身形現諸尊——色身之相。入壇立起，即向羯磨。' },
];

// ── 開壇 ────────────────────────────────────────────────────────────────────
async function boot() {
  const canvas = document.getElementById('gl');
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  } catch {
    document.querySelector('#loading .seed').textContent = '此器不支援 WebGL';
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight);

  await loadFonts();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x070a13);
  scene.fog = new THREE.FogExp2(0x070a13, 0.0042);

  const camera = new THREE.PerspectiveCamera(46, innerWidth / innerHeight, 0.1, 600);
  const rig = new Rig(camera, canvas);

  // ── 地 ──
  scene.add(makeGround());

  // ── 金砂子 ──
  const dust = makeDust();
  scene.add(dust.points);

  // 真身之相：隨 state.form 取紋理（緩生，cache 內恆存）
  function nodeTex(d, side) {
    const a = side === 't' ? d.t : d.k;
    const lord = d.id === 'center' || d.k?.slot === 'lord' || d.t?.court === 'chudai';
    // 尊形／三昧耶乃粉本專筆之相，數百細筆非 256 幅所能容（一指僅合 1.3px），
    // 放大即糊——此二相升幅；種字諸相仍舊（主人指糊之修）
    const fine = state.form === 'samaya' || state.form === 'wrath-samaya' ||
      state.form === 'figure' || state.form.startsWith('figure-');
    return deityTexture({
      id: `${d.id}|${side}`, zh: a.zh, bija: a.bija, sid: siddham(a.bija),
      samaya: d.samaya, color: FAMILY_COLOR[d.family], form: state.form,
      chiken: state.form === 'figure' && d.id === 'center' && side === 'k',
      res: lord ? (fine ? 768 : 384) : (fine ? 512 : 256), // 中尊大相，幅加倍以求精細
    });
  }

  // ── 真身節點（形變之主體）──
  const nodes = [];
  const nodeById = {};
  for (const d of ALL_DEITIES) {
    if (d.rishuOnly) continue;
    const { posT, posK, hasT, hasK } = morphTargets(d);
    const mat = new THREE.MeshBasicMaterial({
      map: nodeTex(d, hasT ? 't' : 'k'), transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    mesh.renderOrder = 4;
    const group = new THREE.Group();
    group.add(mesh);
    scene.add(group);

    const ringT = hasT ? (d.t.court === 'chudai' ? 0 : courtByKey[d.t.court].ring) : 0;
    const kodoXZ = KODO_LAYOUT[d.id];
    let rT = Math.hypot(posT.x, posT.z);
    let thetaT = Math.atan2(posT.z, posT.x);
    let rK = Math.hypot(posK.x, posK.z);
    let thetaK = Math.atan2(posK.z, posK.x);
    if (rT < EPS && rK < EPS) {
      rT = 0;
      rK = 0;
      thetaT = 0;
      thetaK = 0;
    } else if (rT < EPS) {
      rT = 0;
      thetaT = thetaK;
    } else if (rK < EPS) {
      rK = 0;
      thetaK = thetaT;
    }
    const node = {
      d, group, mesh, posT, posK, hasT, hasK, ringT,
      rT, thetaT, rK, thetaK,
      delay: Math.min(ringT * 0.025, 0.1),
      sizeT: sizeOfT(d), sizeK: sizeOfK(d),
      hover: 0, mul: 1, kind: 'node',
      kodoOnly: !!d.kodoOnly,
      kodoPos: kodoXZ ? new THREE.Vector3(kodoXZ[0], 0, kodoXZ[1]) : null,
      obj3d: null, // 立體三昧耶法器（緩鑄）
    };
    mesh.userData.ref = node;
    nodes.push(node);
    nodeById[d.id] = node;
    // 預熱兩面之紋，免中途批量緩生而卡頓
    if (hasT) nodeTex(d, 't');
    if (hasK) nodeTex(d, 'k');
  }

  // ── 九會回響（八會之表示變換）──
  const echoes = [];
  for (const { assembly, nodes: ns } of assemblyEchoes()) {
    const groupMul = { v: 1 };
    for (const { d, pos, display } of ns) {
      const zh = display?.zh ?? d.k.zh;
      const bija = display?.bija ?? d.k.bija;
      const isLord = (d.k && d.k.slot === 'lord') || ns.length === 1 ||
        (assembly.cast === 'rishu' && d.id === 'fugen');
      const tex = deityTexture({
        id: `${assembly.key}|${d.id}`, zh, bija, sid: siddham(bija),
        samaya: d.samaya, color: FAMILY_COLOR[d.family], form: assembly.form,
        // 一印會：唯一大日，智拳之印
        chiken: assembly.key === 'ichiin' && d.id === 'center',
        // 獨尊大格（一印會）幅隨其巨；餘會格小仍舊。
        // persist：回響之紋一繫材質終生不回柜，入常駐藏免遭 LRU 誤逐
        res: ns.length === 1 ? 512 : isLord ? 384 : 256,
        persist: true,
      });
      const mat = new THREE.MeshBasicMaterial({
        map: tex, transparent: true, depthWrite: false, side: THREE.DoubleSide, opacity: 0,
      });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
      mesh.renderOrder = 3;
      const group = new THREE.Group();
      group.position.copy(pos).setY(0.55);
      group.add(mesh);
      scene.add(group);
      const echo = {
        d, group, mesh, assembly, groupMul,
        zh, size: (ns.length === 1 ? 3.8 : 2.5) * assembly.scale * (isLord && ns.length > 1 ? 1.5 : 1),
        hover: 0, kind: 'echo', display,
      };
      mesh.userData.ref = echo;
      echoes.push(echo);
    }
  }
  const echoMulByKey = {};
  for (const e of echoes) echoMulByKey[e.assembly.key] = e.groupMul;

  // ── 兩部莊嚴（環・宮・螺旋・名牌）──
  const taizoDecor = makeTaizoDecor();
  const kongoDecor = makeKongoDecor();
  const kodoDecor = makeKodoDecor();
  scene.add(taizoDecor.group, kongoDecor.group, kodoDecor.group);

  // 立體法器之相質
  const matcap = matcapTexture();

  // ── 脈絡（邊）──
  const edgesT = makeEdges(taizoEdges(), 0xd8b36a);
  const edgesK = makeEdges(kongoEdges(), 0xa8c2ee);
  scene.add(edgesT.lines, edgesK.lines);

  // ── 彗星與脈動環（遍歷之光）──
  const spiral = spiralCurve();
  const comet = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(0xf4e0a8), transparent: true, blending: THREE.AdditiveBlending,
    depthWrite: false, opacity: 0,
  }));
  comet.scale.setScalar(4.2);
  comet.renderOrder = 6;
  scene.add(comet);

  const pulse = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      map: ringTexture(), transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, opacity: 0,
    }),
  );
  pulse.rotation.x = -PI / 2;
  pulse.position.y = 0.35;
  pulse.renderOrder = 2;
  scene.add(pulse);

  // ── 投花得佛 ──
  const petals = [];
  const petalGeo = new THREE.PlaneGeometry(0.85, 0.85); // 共用，免漏
  let bondNode = null;
  let bondSide = null; // 結緣當時之側（t|k），名隨緣定，不隨滑尺改
  let infoNode = null; // 詳情框當前所示之尊；轉相時據此刷新原典圖（相隨形變）
  let tossTimer = null;
  const bondGlow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: glowTexture(0xf4e0a8), transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, opacity: 0,
  }));
  bondGlow.renderOrder = 6;
  scene.add(bondGlow);

  // ── 觀法（五相成身觀）──
  let goso = null;     // 於 ui 之後立（互相成緣）
  let kanTimer = null; // 入坐之延時
  let kanPulse = 0;    // 證金剛身時世界之脈動
  let kanDim = 1;      // 入觀時世界之隱顯
  let kodoMix = 0;     // 羯磨壇之隱顯
  let preheatQueue = [];

  function exitKodo() {
    if (!state.kodo) return;
    state.kodo = false;
    ui.kodoUI(false);
  }

  function exitKan() {
    if (kanTimer) { clearTimeout(kanTimer); kanTimer = null; }
    if (goso?.active) goso.end();
    else if (rig.frozen) {
      rig.frozen = false;
      ui.kanUI(false);
      ui.enterUI(state.entered);
    }
  }

  // 換語之際，凡有狀態之字皆重書
  function applyLang() {
    ui.setLangTable(T, lang);
    ui.setRealm(state.lambda);
    ui.enterUI(state.entered);
    ui.kanUI(!!(goso?.active || kanTimer));
    ui.soundUI(bell.isMuted());
    ui.traversalUI(trav?.active ?? false, state.travDir);
    const fi = FORMS.findIndex(f => f.key === state.form);
    ui.formUI((lang === 'zh' ? FORMS[fi] : FORM_I18N[lang][fi]).sub);
    ui.kodoUI(state.kodo);
    if (ui.gentenOpen()) ui.openGenten(gentenGallery()); // 原典帖若開，題簽隨語重繪
    if (bondNode) {
      const a = bondSide === 't' ? bondNode.d.t : bondNode.d.k;
      ui.setBond(T.bondPrefix(a.zh));
    }
    ui.hideInfo(); // 尊牌之語隨下次點取而換
  }

  // ── 介面 ──
  const ui = initUI({
    onLambda(v, reflect) {
      state.lambdaTarget = v;
      if (reflect) ui.setLambda(v);
      if (trav.active) trav.stop();
    },
    onKan() {
      if (goso.active || kanTimer) { exitKan(); return; }
      cancelToss();
      exitKodo();
      if (trav.active) trav.stop();
      state.lambdaTarget = 1; // 五相成身，金剛界之觀
      ui.setLambda(1);
      if (!state.entered) toggleEnter(true);
      rig.enterAt(new THREE.Vector3(0, 2.3, 7.6)); // 坐於成身會壇心之南，面大日
      rig.frozen = true;
      ui.kanUI(true);
      ui.hideInfo();
      kanTimer = setTimeout(() => {
        kanTimer = null;
        if (rig.frozen) goso.start();
      }, 2300);
    },
    onSpace() { if (goso.active) goso.advance(); },
    onKodo() {
      if (state.kodo) { exitKodo(); return; }
      exitKan();
      if (trav.active) trav.stop();
      state.kodo = true;
      ui.kodoUI(true);
      const k = KODO_I18N[lang] ?? KODO_I18N.zh;
      ui.announce(k.head, k.title, k.text);
      ui.hideCaption(9000);
      if (rig.mode === 'aerial') {
        rig.resetView();
        rig.radius = 64;
      }
      if (bell.ready() && !bell.isMuted()) bell.strike(98, { gain: 0.22, dur: 9 });
    },
    onForm() {
      const i = FORMS.findIndex(f => f.key === state.form);
      const ni = (i + 1) % FORMS.length;
      state.form = FORMS[ni].key;
      // 轉相之後，預熱新相兩面之紋，分攤數幀，使隨後「拖滑尺形變」不卡（主訴所在）。
      // 按：轉相當幀，渲染環仍同步緩生諸尊「當前面」新相之紋——此乃點鈕之一次性微頓，
      // 非連續拖動，故受之；此 queue 之職在預熱「另一面」，令形變流暢。
      preheatQueue = [];
      for (const n of nodes) {
        if (n.hasT) preheatQueue.push([n.d, 't']);
        if (n.hasK) preheatQueue.push([n.d, 'k']);
      }
      const loc = lang === 'zh' ? FORMS[ni] : FORM_I18N[lang][ni];
      ui.formUI(loc.sub);
      ui.announce(T.headForm,
        lang === 'zh' ? `${loc.zh}（${loc.sub}）` : `${loc.zh} (${loc.sub})`, loc.desc);
      ui.hideCaption(5200);
      // 詳情框若開，原典圖隨相而變（法→種字曼荼羅・三昧耶→標幟・大→本尊畫像）。
      if (infoNode && ui.infoOpen()) showInfo(infoNode);
      if (bell.ready() && !bell.isMuted()) bell.strike(174.6, { gain: 0.1, dur: 4 });
    },
    onLang(l) {
      if (l === lang) return;
      lang = l;
      T = uiTable(l);
      try { localStorage.setItem('mandala-lang', l); } catch { /* 私隱模式 */ }
      applyLang();
    },
    onTraverse(dir) {
      exitKan();
      exitKodo();
      if (trav.active && state.travDir === dir) { trav.stop(); return; }
      if (trav.active) trav.stop();
      if (state.entered) toggleEnter(false);
      const realm = state.lambdaTarget < 0.5 ? 'taizo' : 'kongo';
      state.lambdaTarget = realm === 'taizo' ? 0 : 1;
      ui.setLambda(state.lambdaTarget);
      state.travDir = dir;
      trav.start(realm, dir);
      ui.traversalUI(true, dir);
    },
    onEnter() { exitKan(); toggleEnter(!state.entered); },
    onToss() {
      exitKan();
      if (tossTimer) return;
      if (!state.entered) {
        toggleEnter(true);
        tossTimer = setTimeout(() => { tossTimer = null; doToss(); }, 2200);
      } else doToss();
    },
    onCard() { if (bondNode) downloadCard(bondNode); },
    onBondClick() { if (bondNode) showInfo(bondNode); },
    onSound() {
      bell.initAudio();
      if (!bell.ready()) return; // 此器無聲，鈕不妄言
      bell.startDrone();
      bell.setMuted(!bell.isMuted());
      ui.soundUI(bell.isMuted());
      if (!bell.isMuted()) bell.strike(bell.FAMILY_FREQ.butsu, { gain: 0.16, dur: 5 });
    },
    onReset() {
      exitKan();
      exitKodo();
      cancelToss();
      if (trav.active) trav.stop();
      if (state.entered) toggleEnter(false);
      rig.resetView();
      ui.hideInfo();
    },
    onGenten() {
      // 原典帖：獨立陳列之投影對照。純覆於上，不擾壇城之態。
      if (ui.gentenOpen()) { ui.closeGenten(); return; } // closeGenten 內回調 onGentenClose 解閘
      rig.inputBlocked = true; // 閘住相機行步鍵（入壇時尤要）
      rig.keys.clear();        // 撤已按住之行步鍵，免開帖後仍滑行
      ui.openGenten(gentenGallery());
    },
    onGentenClose() { rig.inputBlocked = false; }, // 諸關閉路徑統一解相機閘
    onEscape() {
      if (goso?.active || kanTimer) { exitKan(); return; }
      cancelToss();
      if (state.entered) toggleEnter(false);
      else if (trav.active) trav.stop();
      else ui.hideInfo();
    },
  }, T, lang);

  const trav = new Traversal({
    caption(head, title, text, i, n) {
      // 法語隨語而轉（traversal 持結構，文責在此）
      if (lang !== 'zh') {
        if (trav.realm === 'kongo') {
          const order = trav.dir === 'descent' ? DESCENT_ORDER : [...DESCENT_ORDER].reverse();
          const key = order[i];
          title = asmName(assemblyByKey[key]);
          text = ASM_I18N[lang][key][trav.dir];
        } else {
          const step = TAIZO_I18N[lang][trav.dir][i];
          title = step.title;
          text = step.text;
        }
      }
      ui.caption(trav.dir === 'descent' ? T.headDescent : T.headAscent, title, text, i, n);
      if (bell.ready() && !bell.isMuted()) {
        bell.strike(i % 2 ? 164.8 : 146.8, { gain: 0.1, dur: 4.5 }); // 換會一磬
      }
    },
    focusAssembly(key) {
      state.focusKey = key;
      rig.focusOverride = key
        ? { target: cellCenter(assemblyByKey[key]).clone(), radius: 42, phi: 0.5 }
        : null;
    },
    focusRing(ring) {
      state.focusRing = ring;
      rig.focusOverride = ring != null
        ? { target: new THREE.Vector3(0, 0, 0), radius: 30 + RING_RADIUS[ring] * 1.5, phi: 0.55 }
        : null;
    },
    done() {
      state.travDir = null;
      ui.traversalUI(false);
      ui.hideCaption(3000);
    },
  });

  function cancelToss() {
    if (tossTimer) { clearTimeout(tossTimer); tossTimer = null; }
    // 空中之花亦撤——儀軌既罷，花不再落
    for (const p of petals) {
      scene.remove(p.mesh);
      p.mesh.material.dispose();
    }
    petals.length = 0;
  }

  function doToss() {
    if (!state.entered) return; // 儀軌中途被撤，不擲
    ui.veilFlash(T.veilToss);
    tossTimer = setTimeout(() => {
      tossTimer = null;
      if (!state.entered) return;
      const fwd = new THREE.Vector3();
      camera.getWorldDirection(fwd);
      fwd.y = 0;
      if (fwd.lengthSq() < 1e-6) fwd.set(0, 0, -1);
      fwd.normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), (Math.random() - 0.5) * 1.3);
      const speed = 6.5 + Math.random() * 7.5;
      const mesh = new THREE.Mesh(
        petalGeo,
        new THREE.MeshBasicMaterial({
          map: petalTexture(), transparent: true, depthWrite: false, side: THREE.DoubleSide,
        }),
      );
      mesh.renderOrder = 6;
      mesh.position.copy(camera.position).addScaledVector(fwd, 1.4);
      scene.add(mesh);
      petals.push({
        mesh,
        vel: new THREE.Vector3(fwd.x * speed, 4.2 + Math.random() * 2.6, fwd.z * speed),
        spin: 5 + Math.random() * 4,
      });
    }, 750);
  }

  function resolveBond(pos) {
    let best = null, bd = Infinity;
    for (const n of nodes) {
      if (n.mesh.material.opacity < 0.25) continue;
      const d2 = (n.group.position.x - pos.x) ** 2 + (n.group.position.z - pos.z) ** 2;
      if (d2 < bd) { bd = d2; best = n; }
    }
    if (!best) return;
    bondNode = best;
    bondSide = best.hasT && best.hasK
      ? (effLambda(best) < 0.5 ? 't' : 'k')
      : (best.hasT ? 't' : 'k');
    try {
      localStorage.setItem('mandala-bond', JSON.stringify({ id: best.d.id, side: bondSide }));
    } catch { /* 私隱模式無妨 */ }
    const name = (bondSide === 't' ? best.d.t : best.d.k).zh;
    ui.setBond(T.bondPrefix(name));
    ui.announce(T.headToss, T.tossTitle(name), T.tossText);
    if (bell.ready() && !bell.isMuted()) {
      bell.strike(bell.FAMILY_FREQ[best.d.family] * 2, { gain: 0.2, dur: 6 });
      setTimeout(() => bell.strike(bell.FAMILY_FREQ[best.d.family], { gain: 0.22, dur: 9 }), 380);
    }
    ui.hideCaption(9000);
    showInfo(best);
    if (state.entered) {
      // 轉面其尊
      const g = best.group.position;
      rig.yaw = Math.atan2(-(g.z - rig.fpPos.z), g.x - rig.fpPos.x) - PI / 2;
      rig.pitch = 0.05;
    }
  }

  function downloadCard(node) {
    const { d } = node;
    // 結緣之尊取結緣當時之側；餘者隨當前之界
    const side = node === bondNode && bondSide
      ? bondSide
      : node.hasT && node.hasK
        ? (effLambda(node) < 0.5 ? 't' : 'k')
        : (node.hasT ? 't' : 'k');
    const aspect = side === 't' ? d.t : d.k;
    const url = bondCard({
      sid: siddham(aspect.bija), roman: aspect.bija,
      zh: aspect.zh, sk: aspect.sk,
      familyZh: famName(d.family),
      colorHex: '#' + FAMILY_COLOR[d.family].toString(16).padStart(6, '0'),
      mantra: d.mantra, mantraSid: sidPhrase(d.mantra), desc: descOf(d),
      foot1: T.cardFoot1(T.cardDate(new Date())),
      foot2: T.cardFoot2,
    });
    const a = document.createElement('a');
    a.href = url;
    a.download = T.cardFile(aspect.zh);
    a.click();
  }

  // 復緣（前世所投之花）
  try {
    const saved = localStorage.getItem('mandala-bond');
    if (saved) {
      let id = saved, side = null;
      try { ({ id, side } = JSON.parse(saved)); } catch { /* 舊式裸 id */ }
      const node = nodeById[id];
      if (node) {
        bondNode = node;
        bondSide = side === 'k' && node.hasK ? 'k' : node.hasT ? 't' : 'k';
        ui.setBond(T.bondPrefix((bondSide === 't' ? node.d.t : node.d.k).zh));
      }
    }
  } catch { /* 私隱模式無妨 */ }

  // 觀法之軀（ui 既立，乃造）
  goso = new Goso(scene, camera, {
    stage(idx, s) {
      const loc = lang === 'zh' ? s : { ...s, ...STAGE_I18N[lang][idx] };
      const sid = sidPhrase(s.mantra);
      ui.announce(T.headKan(idx), loc.title,
        `${loc.text}\n${sid ? sid + '\n' : ''}${s.mantra}`);
      if (bell.ready() && !bell.isMuted()) bell.strike(s.freq, { gain: 0.2, dur: 9 });
    },
    flash: () => ui.flash(),
    worldPulse() { kanPulse = 1; },
    closed() {
      rig.frozen = false;
      ui.kanUI(false);
      ui.enterUI(state.entered);
      ui.announce(lang === 'en' ? 'Five-Stage Attainment' : '五相成身觀',
        T.kanExitTitle, T.kanExitText);
      ui.hideCaption(6500);
    },
  });
  applyLang();

  function toggleEnter(on) {
    if (on === state.entered) return;
    if (!on) cancelToss(); // 出壇即罷投
    state.entered = on;
    if (on) {
      if (trav.active) trav.stop();
      rig.enter();
      if (bell.ready() && !bell.isMuted()) bell.strike(98, { gain: 0.3, dur: 11 }); // 入壇之鐘
    } else rig.exit();
    ui.enterUI(on);
    const from = state.stand, to = on ? 1 : 0;
    tween({ dur: 1.8, update: k => { state.stand = from + (to - from) * k; } });
  }

  // ── 拾取 ──
  const ray = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pickables = [...nodes, ...echoes].map(n => n.mesh);
  let hovered = null, downAt = null;

  function pickAt(cx, cy) {
    pointer.set((cx / innerWidth) * 2 - 1, -(cy / innerHeight) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(pickables, false)
      .find(h => h.object.material.opacity > 0.2);
    return hit ? hit.object.userData.ref : null;
  }
  canvas.addEventListener('pointerdown', e => { downAt = [e.clientX, e.clientY]; });
  canvas.addEventListener('pointermove', e => {
    if (goso.active || kanTimer) {
      hovered = null;
      canvas.style.cursor = '';
      ui.tooltip(0, 0, null);
      return;
    }
    hovered = pickAt(e.clientX, e.clientY);
    canvas.style.cursor = hovered ? 'pointer' : '';
    ui.tooltip(e.clientX, e.clientY, hovered ? tooltipName(hovered) : null);
  });
  canvas.addEventListener('pointerup', e => {
    if (!downAt) return;
    const moved = Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]);
    downAt = null;
    if (moved > 6) return;
    if (goso.active) { goso.advance(); return; } // 觀中輕觸即進
    if (kanTimer) return; // 入坐未定，不拾
    const ref = pickAt(e.clientX, e.clientY); // 觸屏無 hover，臨點即求交
    if (ref) showInfo(ref);
  });

  function displayName(ref) {
    if (ref.kind === 'echo') return ref.zh;
    const { d } = ref;
    const eff = effLambda(ref);
    if (ref.hasT && ref.hasK) return eff < 0.5 ? d.t.zh : d.k.zh;
    return ref.hasT ? d.t.zh : d.k.zh;
  }

  function tooltipName(ref) {
    const zh = displayName(ref);
    if (lang !== 'en') return zh;
    // EN：尊名漢字（圖像之一部）綴以梵名
    const sk = ref.kind === 'echo'
      ? (ref.display?.sk ?? ref.d.k?.sk)
      : (ref.hasT && ref.hasK
        ? (effLambda(ref) < 0.5 ? ref.d.t.sk : ref.d.k.sk)
        : (ref.hasT ? ref.d.t.sk : ref.d.k.sk));
    return sk ? `${zh} · ${sk}` : zh;
  }

  function showInfo(ref) {
    infoNode = ref;
    const { d } = ref;
    const color = '#' + FAMILY_COLOR[d.family].toString(16).padStart(6, '0');
    let aspect, loc, gside = 'k';
    if (ref.kind === 'echo') {
      aspect = {
        zh: ref.zh,
        sk: ref.display?.sk ?? d.k.sk,
        bija: ref.display?.bija ?? d.k.bija,
      };
      loc = lang === 'en'
        ? `${T.locK} · ${asmName(ref.assembly)} (${formVarName(ref.assembly.form)})`
        : `${T.locK} · ${ref.assembly.zh}（${formVarName(ref.assembly.form)}）`;
    } else {
      const eff = effLambda(ref);
      const side = ref.hasT && ref.hasK ? (eff < 0.5 ? 't' : 'k') : (ref.hasT ? 't' : 'k');
      gside = side;
      aspect = side === 't' ? d.t : d.k;
      const parts = [];
      if (ref.hasT) parts.push(`${T.locT} · ${courtName(d.t.court)}`);
      if (ref.hasK) {
        parts.push(lang === 'en'
          ? `${T.locK} · ${T.jojin} · ${circleName(d.k.circle) ?? ''}`
          : `${T.locK} · ${T.jojin}${circleName(d.k.circle) ?? ''}`);
      }
      loc = parts.join(lang === 'en' ? '  /  ' : '　／　');
      if (ref.hasT && ref.hasK && d.t.zh !== d.k.zh) {
        loc += `\n${T.dual(d.t.zh, d.k.zh)}`;
      }
    }
    const gform = ref.kind === 'echo' ? ref.assembly.form : state.form;
    const g = gentenFor(d.id, gside, gform);
    const genten = g ? {
      src: g.src,
      title: (g.title[lang] ?? g.title.zh) + (g.note ? '　' + (g.note[lang] ?? g.note.zh) : ''),
      credit: `${lang === 'en' ? 'Source' : '出典'} · ${g.institution} · ${g.license}`,
      href: g.sourceUrl,
    } : null;
    ui.showInfo({
      bija: siddham(aspect.bija) || aspect.bija, bijaRoman: aspect.bija,
      name: aspect.zh, sk: aspect.sk,
      family: famName(d.family), familyColor: color,
      loc, desc: descOf(d), mantra: d.mantra, mantraSid: sidPhrase(d.mantra),
      genten,
    });
    ui.showCardButton(ref === bondNode); // 證卡唯結緣之尊可取
    if (bell.ready() && !bell.isMuted()) {
      bell.strike(bell.FAMILY_FREQ[d.family] * (d.id === 'center' ? 0.75 : 1), { gain: 0.18 });
    }
  }

  // ── 主迴圈 ──
  function effLambda(node) {
    return smoothstep(node.delay, node.delay + 0.8, state.lambda);
  }

  const clock = new THREE.Clock();
  let elapsed = 0;

  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;

    stepTweens(dt);
    state.lambda = damp(state.lambda, state.lambdaTarget, 6.5, dt);
    if (Math.abs(state.lambda - state.lambdaTarget) < 0.004) state.lambda = state.lambdaTarget;
    ui.setRealm(state.lambda);
    trav.update(dt);
    goso.update(dt);
    kanPulse = Math.max(0, kanPulse - dt * 0.3); // 證身之脈漸息
    // 入觀世界漸隱（內觀）；第五相佛身圓滿，世界復明——出定見世界
    kanDim = damp(kanDim, goso.active && goso.stage < 4 ? 0.14 : 1, 2.2, dt);
    kodoMix = damp(kodoMix, state.kodo ? 1 : 0, 2.6, dt);

    const l = state.lambda;
    const stand = state.stand;
    const echoFade = smoothstep(0.55, 1, l);
    const taizoFade = 1 - smoothstep(0, 0.5, l);
    const kongoFade = smoothstep(0.5, 1, l);

    // 分幀預熱：每幀緩生少數紋理，避免單幀卡頓
    if (preheatQueue.length) {
      const batch = preheatQueue.splice(0, 4);
      for (const [d, side] of batch) nodeTex(d, side);
    }

    // 真身
    for (const n of nodes) {
      const eff = effLambda(n);
      // 極座標插值：半徑與角度各自緩進，節點循弧收束／綻放，不對穿壇心
      const r = n.rT + (n.rK - n.rT) * eff;
      const th = n.thetaT + shortAngle(n.thetaT, n.thetaK) * eff;
      let px = Math.cos(th) * r;
      let pz = Math.sin(th) * r;
      if (n.kodoPos) {
        // 講堂成員飛赴壇位（笛卡爾插值，無妨）
        px += (n.kodoPos.x - px) * kodoMix;
        pz += (n.kodoPos.z - pz) * kodoMix;
      }
      n.group.position.set(px, 0.6, pz);
      let opBase = n.hasT && n.hasK ? 1 : (n.hasT ? 1 - eff : eff);
      if (n.kodoOnly) opBase = kodoMix;                      // 缺尊唯於講堂現
      else if (!n.kodoPos) opBase *= 1 - kodoMix;            // 非廿一尊者隱
      else opBase += (1 - opBase) * kodoMix;                 // 壇上成員全顯
      let mul = 1;
      if (state.focusRing != null) mul = n.ringT === state.focusRing ? 1 : 0.2;
      else if (state.focusKey) mul = state.focusKey === 'jojin' ? 1 : 0.22;
      n.mul = damp(n.mul, mul, 6, dt);
      n.hover = damp(n.hover, hovered === n ? 1 : 0, 10, dt);
      n.mesh.material.opacity = opBase * n.mul * kanDim;
      const sideNow = n.hasT && n.hasK ? (eff < 0.5 ? 't' : 'k') : (n.hasT ? 't' : 'k');
      const want = nodeTex(n.d, sideNow);
      if (n.mesh.material.map !== want) n.mesh.material.map = want;
      // 不二之際，兩部同體之錨點微明而脹——結構於中途可見
      const advaya = n.hasT && n.hasK ? Math.max(0, 1 - Math.abs(l - 0.5) * 2.6) : 0;
      const size = (n.sizeT + (n.sizeK - n.sizeT) * eff) * (0.55 + 0.45 * opBase) *
        (1 + 0.13 * n.hover + 0.3 * advaya + 0.2 * kanPulse);
      n.mesh.scale.setScalar(size);
      poseDisc(n, size, stand);

      // 立體三昧耶法器：標幟之相、立於壇中，乃浮現掌前
      const want3d = state.form === 'samaya' && stand > 0.4 &&
        n.mesh.material.opacity > 0.15;
      if (want3d && !n.obj3d) {
        n.obj3d = buildSamaya(n.d.samaya, { matcap, color: FAMILY_COLOR[n.d.family] });
        n.group.add(n.obj3d);
      }
      if (n.obj3d) {
        n.obj3d.visible = want3d;
        if (want3d) {
          n.obj3d.rotation.y += dt * 0.5;
          n.obj3d.scale.setScalar(size * 0.6);
          n.obj3d.position.y = size * 0.62 +
            Math.sin(elapsed * 1.1 + n.delay * 40) * 0.07;
        }
      }
    }

    // 回響
    for (const e of echoes) {
      let mul = 1;
      if (state.focusKey) mul = e.assembly.key === state.focusKey ? 1 : 0.16;
      e.groupMul.v = damp(e.groupMul.v, mul, 6, dt);
      e.hover = damp(e.hover, hovered === e ? 1 : 0, 10, dt);
      e.mesh.material.opacity = echoFade * e.groupMul.v * kanDim * (1 - kodoMix);
      const size = e.size * (1 + 0.13 * e.hover + 0.2 * kanPulse);
      e.mesh.scale.setScalar(size);
      poseDisc(e, size, stand);
    }

    // 莊嚴
    const notKodo = 1 - kodoMix;
    for (const m of taizoDecor.mats) m.m.opacity = m.base * taizoFade * kanDim * notKodo;
    for (const m of kongoDecor.mats) m.m.opacity = m.base * kongoFade * kanDim * notKodo;
    for (const m of kodoDecor.mats) m.m.opacity = m.base * kodoMix * kanDim;
    edgesT.update(nodeById);
    edgesT.lines.material.opacity = 0.15 * taizoFade * kanDim * notKodo;
    edgesK.update(nodeById);
    edgesK.lines.material.opacity = (0.15 + 0.3 * kanPulse) * kongoFade * kanDim * notKodo *
      (state.focusKey && state.focusKey !== 'jojin' ? 0.25 : 1);

    // 彗星（金剛界遍歷）
    const u = trav.cometU?.();
    if (u != null) {
      comet.position.copy(spiral.getPointAt(u)).setY(1.6);
      comet.material.opacity = damp(comet.material.opacity, 0.95, 5, dt);
      comet.scale.setScalar(4.2 + Math.sin(elapsed * 5) * 0.5);
    } else {
      comet.material.opacity = damp(comet.material.opacity, 0, 5, dt);
    }

    // 脈動環（胎藏遍歷）
    if (state.focusRing != null) {
      const r = state.focusRing === 0 ? PETAL_RADIUS + 2.2 : RING_RADIUS[state.focusRing] + 1.2;
      const s = (r / 0.42) * (1 + Math.sin(elapsed * 2.6) * 0.02);
      pulse.scale.set(s, s, 1);
      pulse.material.opacity = damp(pulse.material.opacity, 0.5 + Math.sin(elapsed * 2.6) * 0.18, 6, dt);
    } else {
      pulse.material.opacity = damp(pulse.material.opacity, 0, 6, dt);
    }

    // 花行於空
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.vel.y -= 6.5 * dt; // 緩落，花非石也
      p.mesh.position.addScaledVector(p.vel, dt);
      p.mesh.rotation.x += p.spin * dt;
      p.mesh.rotation.z += p.spin * 0.6 * dt;
      if (p.mesh.position.y <= 0.75) {
        const at = p.mesh.position.clone();
        scene.remove(p.mesh);
        p.mesh.material.dispose();
        petals.splice(i, 1);
        resolveBond(at);
      }
    }
    // 結緣之光
    if (bondNode) {
      bondGlow.position.copy(bondNode.group.position);
      bondGlow.position.y += 0.3;
      bondGlow.material.opacity = (0.3 + Math.sin(elapsed * 2.2) * 0.13) *
        Math.max(0.25, bondNode.mesh.material.opacity);
      bondGlow.scale.setScalar(bondNode.mesh.scale.x * 1.9 + Math.sin(elapsed * 2.2) * 0.4);
    }

    dust.points.material.opacity = 0.45 * Math.max(kanDim, 0.35); // 觀中砂子猶在，如念之餘
    dust.update(dt, elapsed);
    rig.update(dt);
    renderer.render(scene, camera);
  }

  function poseDisc(ref, size, stand) {
    ref.mesh.rotation.x = -PI / 2 * (1 - stand);
    if (stand > 0.01) {
      const g = ref.group.position;
      const yaw = Math.atan2(camera.position.x - g.x, camera.position.z - g.z);
      ref.group.rotation.y = yaw * stand;
      g.y = 0.6 + stand * (size * 0.5);
    } else {
      ref.group.rotation.y = 0;
      ref.group.position.y = ref.kind === 'echo' ? 0.55 : 0.6;
    }
  }

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  });

  frame();
  ui.hideLoading();
}

// ── 尺度 ────────────────────────────────────────────────────────────────────
function sizeOfT(d) {
  if (!d.t) return 2.7;
  if (d.t.slot === 'C') return 5.6;
  if (d.t.court === 'chudai') return 3.7;
  if (d.t.court === 'gekongobu') return 2.4;
  return 2.8;
}
function sizeOfK(d) {
  if (!d.k || !d.k.circle) return 2.7;
  if (d.id === 'center') return 4.6;
  if (d.k.slot === 'lord') return 3.4;
  return 2.5;
}

// ── 地・砂子・莊嚴 ──────────────────────────────────────────────────────────
function makeGround() {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(256, 256, 30, 256, 256, 256);
  g.addColorStop(0, '#151c31');
  g.addColorStop(0.45, '#0e1322');
  g.addColorStop(1, '#070a13');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(
    new THREE.CircleGeometry(150, 72),
    new THREE.MeshBasicMaterial({ map: tex }),
  );
  mesh.rotation.x = -PI / 2;
  mesh.position.y = -0.05;
  mesh.renderOrder = 0;
  return mesh;
}

function makeDust() {
  const N = 700;
  const pos = new Float32Array(N * 3);
  const vel = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const r = Math.sqrt(Math.random()) * 110;
    const a = Math.random() * PI * 2;
    pos[i * 3] = Math.cos(a) * r;
    pos[i * 3 + 1] = Math.random() * 42;
    pos[i * 3 + 2] = Math.sin(a) * r;
    vel[i] = 0.25 + Math.random() * 0.6;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.7, map: glowTexture(0xe9cd8a), transparent: true, opacity: 0.45,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
  points.renderOrder = 5;
  return {
    points,
    update(dt) {
      const p = geo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        p[i * 3 + 1] += vel[i] * dt;
        if (p[i * 3 + 1] > 42) p[i * 3 + 1] = 0;
      }
      geo.attributes.position.needsUpdate = true;
      points.rotation.y += dt * 0.008; // 砂子微旋
    },
  };
}

function circleLine(r, segments = 128) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * r, 0.25, Math.sin(a) * r));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function makeLabelSprite(text, pos, h) {
  const tex = labelTexture(text);
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0, depthWrite: false });
  const sp = new THREE.Sprite(mat);
  const H = h ?? [...text].length * 1.5 + 1;
  sp.scale.set(H * tex.userData.aspect, H, 1);
  sp.position.copy(pos);
  sp.renderOrder = 6;
  return sp;
}

function makeTaizoDecor() {
  const group = new THREE.Group();
  const mats = [];
  const goldLine = (geo, base) => {
    const m = new THREE.LineBasicMaterial({ color: 0xd8b36a, transparent: true, opacity: 0 });
    mats.push({ m, base });
    const line = new THREE.Line(geo, m);
    line.renderOrder = 1;
    group.add(line);
  };
  goldLine(circleLine(PETAL_RADIUS + 2.6), 0.22);
  for (const r of RING_RADIUS.slice(1)) goldLine(circleLine(r), 0.15);
  goldLine(circleLine(RING_RADIUS[4] + 2.8), 0.1);

  const D2R = PI / 180;
  for (const c of COURTS) {
    if (c.key === 'chudai') continue;
    let angle, r;
    if (c.key === 'gekongobu') { angle = 99; r = RING_RADIUS[4] + 3.4; }
    else {
      angle = (c.arc[0] + c.arc[1]) / 2;
      r = RING_RADIUS[c.ring] + 3.2;
    }
    const pos = new THREE.Vector3(Math.cos(angle * D2R) * r, 1.2, -Math.sin(angle * D2R) * r);
    const sp = makeLabelSprite(c.zh, pos);
    mats.push({ m: sp.material, base: 0.8 });
    group.add(sp);
  }
  const title = makeLabelSprite('大悲胎藏生', new THREE.Vector3(-RING_RADIUS[4] - 8, 2, 0));
  mats.push({ m: title.material, base: 0.55 });
  group.add(title);
  return { group, mats };
}

function makeKongoDecor() {
  const group = new THREE.Group();
  const mats = [];
  const H = CELL * 1.5;

  const verts = [];
  for (const k of [-1.5, -0.5, 0.5, 1.5]) {
    verts.push(k * CELL, 0.25, -H, k * CELL, 0.25, H);
    verts.push(-H, 0.25, k * CELL, H, 0.25, k * CELL);
  }
  const gridGeo = new THREE.BufferGeometry();
  gridGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3));
  const gridMat = new THREE.LineBasicMaterial({ color: 0xd8b36a, transparent: true, opacity: 0 });
  mats.push({ m: gridMat, base: 0.16 });
  const grid = new THREE.LineSegments(gridGeo, gridMat);
  grid.renderOrder = 1;
  group.add(grid);

  // 下轉之螺旋
  const tubeMat = new THREE.MeshBasicMaterial({
    color: 0xd8b36a, transparent: true, opacity: 0,
    blending: THREE.AdditiveBlending, depthWrite: false,
  });
  mats.push({ m: tubeMat, base: 0.22 });
  const tube = new THREE.Mesh(new THREE.TubeGeometry(spiralCurve(), 140, 0.14, 6), tubeMat);
  tube.renderOrder = 1;
  group.add(tube);

  for (const a of ASSEMBLIES) {
    const c = cellCenter(a);
    const pos = new THREE.Vector3(c.x - CELL / 2 + 2.4, 1.2, c.z - CELL / 2 + [...a.zh].length * 0.8 + 2.2);
    const sp = makeLabelSprite(a.zh, pos, [...a.zh].length * 1.15 + 0.8);
    mats.push({ m: sp.material, base: 0.85 });
    group.add(sp);
  }
  const title = makeLabelSprite('金剛界九會', new THREE.Vector3(H + 7, 2, 0));
  mats.push({ m: title.material, base: 0.55 });
  group.add(title);
  return { group, mats };
}

// 羯磨壇之莊嚴：壇緣、三輪身五行之線、三柱之銘
function makeKodoDecor() {
  const group = new THREE.Group();
  const mats = [];
  const goldLine = (pts, base) => {
    const m = new THREE.LineBasicMaterial({ color: 0xd8b36a, transparent: true, opacity: 0 });
    mats.push({ m, base });
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), m);
    line.renderOrder = 1;
    group.add(line);
  };
  // 壇之外緣（56×20）
  goldLine([
    new THREE.Vector3(-30, 0.25, -11), new THREE.Vector3(30, 0.25, -11),
    new THREE.Vector3(30, 0.25, 11), new THREE.Vector3(-30, 0.25, 11),
    new THREE.Vector3(-30, 0.25, -11),
  ], 0.2);
  // 三輪身五行：同一智之三現，連為一線
  for (const row of SANRINJIN) {
    const pts = [row.myoo, row.butsu, row.bosatsu]
      .map(id => KODO_LAYOUT[id])
      .map(([x, z]) => new THREE.Vector3(x, 0.3, z));
    goldLine(pts, 0.16);
  }
  // 三柱之銘（壇上之字，恆以漢字）
  const ringNames = KODO_I18N.zh.rings;
  for (const [i, x] of [[0, 0], [1, 18], [2, -18]]) {
    const sp = makeLabelSprite(ringNames[i], new THREE.Vector3(x, 1.4, -14.5));
    mats.push({ m: sp.material, base: 0.8 });
    group.add(sp);
  }
  return { group, mats };
}

function makeEdges(pairs, color) {
  const geo = new THREE.BufferGeometry();
  const arr = new Float32Array(pairs.length * 6);
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false });
  const lines = new THREE.LineSegments(geo, mat);
  lines.renderOrder = 1;
  return {
    lines,
    update(nodeById) {
      for (let i = 0; i < pairs.length; i++) {
        const a = nodeById[pairs[i][0]].group.position;
        const b = nodeById[pairs[i][1]].group.position;
        arr[i * 6] = a.x; arr[i * 6 + 1] = 0.45; arr[i * 6 + 2] = a.z;
        arr[i * 6 + 3] = b.x; arr[i * 6 + 4] = 0.45; arr[i * 6 + 5] = b.z;
      }
      geo.attributes.position.needsUpdate = true;
    },
  };
}

// ── 字 ──────────────────────────────────────────────────────────────────────
async function loadFonts() {
  if (!document.fonts?.load) return;
  // 將全部尊名・院會名・界面字一併請字，免缺字之憾
  const sample = DEITIES.map(d => (d.t?.zh ?? '') + (d.k?.zh ?? '')).join('') +
    COURTS.map(c => c.zh).join('') + ASSEMBLIES.map(a => a.zh).join('') +
    '金胎不二兩部曼荼羅大悲藏界上下轉門入出壇復觀止種字三昧耶微細供養忿怒月輪攝門同體即';
  const sidSample = [...new Set(DEITIES.flatMap(d => [d.t?.bija, d.k?.bija].filter(Boolean)))]
    .map(b => siddhamRaw(b)).join('');
  const wants = [
    document.fonts.load('500 40px "LXGW WenKai TC"', sample),
    document.fonts.load('600 90px "Cormorant Garamond"', 'vaṃ hūṃ trāḥ hrīḥ aḥ āṃ ṛ'),
    document.fonts.load('italic 600 46px "Cormorant Garamond"', 'vaṃ'),
    document.fonts.load('400 90px "Noto Sans Siddham"', sidSample),
  ];
  await Promise.race([
    Promise.all(wants).catch(() => {}),
    new Promise(r => setTimeout(r, 4500)),
  ]);
  sidFontReady = document.fonts.check('400 90px "Noto Sans Siddham"', '\u{11580}');
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  boot();
}
