// ─────────────────────────────────────────────────────────────────────────────
// 樞紐：諸層於此合縫。
//   不二層（數據）→ 投影（布局）→ 相（紋理）→ 緣（介面）→ 行（遍歷・入壇）
// 滑尺即理智之際，遍歷即上下二門，入壇即法轉羯磨。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';
import { DEITIES, byId } from './data/deities.js';
import { siddham as siddhamRaw } from './data/siddham.js';

// 悉曇字體未及載入時，種字退羅馬轉寫（canvas 紋理不會隨字體後到而重繪）
let sidFontReady = false;
const siddham = b => (sidFontReady ? siddhamRaw(b) : '');
import {
  COURTS, RING_RADIUS, PETAL_RADIUS, FAMILY_COLOR, FAMILY_ZH, ASSEMBLIES,
} from './data/courts.js';
import {
  morphTargets, assemblyEchoes, taizoEdges, kongoEdges,
  spiralCurve, cellCenter, assemblyByKey, CELL,
} from './layout.js';
import { deityTexture, labelTexture, glowTexture, ringTexture } from './textures.js';
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
};
const courtByKey = Object.fromEntries(COURTS.map(c => [c.key, c]));
const PI = Math.PI;

const state = {
  lambda: 0, lambdaTarget: 0,
  stand: 0, entered: false,
  focusKey: null, focusRing: null, travDir: null,
};

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

  // ── 真身節點（形變之主體）──
  const nodes = [];
  const nodeById = {};
  for (const d of DEITIES) {
    if (d.rishuOnly) continue;
    const { posT, posK, hasT, hasK } = morphTargets(d);
    const color = FAMILY_COLOR[d.family];
    const texT = hasT ? deityTexture({ id: d.id + '|t', zh: d.t.zh, bija: d.t.bija, sid: siddham(d.t.bija), samaya: d.samaya, color, form: 'bija' }) : null;
    const texK = hasK ? deityTexture({ id: d.id + '|k', zh: d.k.zh, bija: d.k.bija, sid: siddham(d.k.bija), samaya: d.samaya, color, form: 'bija' }) : null;
    const mat = new THREE.MeshBasicMaterial({
      map: texT || texK, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), mat);
    mesh.renderOrder = 4;
    const group = new THREE.Group();
    group.add(mesh);
    scene.add(group);

    const ringT = hasT ? (d.t.court === 'chudai' ? 0 : courtByKey[d.t.court].ring) : 0;
    const node = {
      d, group, mesh, posT, posK, hasT, hasK, texT, texK, ringT,
      delay: ringT * 0.045,
      sizeT: sizeOfT(d), sizeK: sizeOfK(d),
      hover: 0, mul: 1, kind: 'node',
    };
    mesh.userData.ref = node;
    nodes.push(node);
    nodeById[d.id] = node;
  }

  // ── 九會回響（八會之表示變換）──
  const echoes = [];
  for (const { assembly, nodes: ns } of assemblyEchoes()) {
    const groupMul = { v: 1 };
    for (const { d, pos, display } of ns) {
      const zh = display?.zh ?? d.k.zh;
      const bija = display?.bija ?? d.k.bija;
      const tex = deityTexture({
        id: `${assembly.key}|${d.id}`, zh, bija, sid: siddham(bija),
        samaya: d.samaya, color: FAMILY_COLOR[d.family], form: assembly.form,
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
      const isLord = (d.k && d.k.slot === 'lord') || ns.length === 1 ||
        (assembly.cast === 'rishu' && d.id === 'fugen');
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
  scene.add(taizoDecor.group, kongoDecor.group);

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

  // ── 介面 ──
  const ui = initUI({
    onLambda(v, reflect) {
      state.lambdaTarget = v;
      if (reflect) ui.setLambda(v);
      if (trav.active) trav.stop();
    },
    onTraverse(dir) {
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
    onEnter() { toggleEnter(!state.entered); },
    onReset() {
      if (trav.active) trav.stop();
      if (state.entered) toggleEnter(false);
      rig.resetView();
      ui.hideInfo();
    },
    onEscape() {
      if (state.entered) toggleEnter(false);
      else if (trav.active) trav.stop();
      else ui.hideInfo();
    },
  });
  ui.enterUI(false);
  ui.setRealm(0);

  const trav = new Traversal({
    caption: (head, title, text, i, n) => ui.caption(head, title, text, i, n),
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

  function toggleEnter(on) {
    if (on === state.entered) return;
    state.entered = on;
    if (on) {
      if (trav.active) trav.stop();
      rig.enter();
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
    hovered = pickAt(e.clientX, e.clientY);
    canvas.style.cursor = hovered ? 'pointer' : '';
    ui.tooltip(e.clientX, e.clientY, hovered ? displayName(hovered) : null);
  });
  canvas.addEventListener('pointerup', e => {
    if (!downAt) return;
    const moved = Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]);
    downAt = null;
    if (moved > 6) return;
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

  function showInfo(ref) {
    const { d } = ref;
    const color = '#' + FAMILY_COLOR[d.family].toString(16).padStart(6, '0');
    let aspect, loc;
    if (ref.kind === 'echo') {
      aspect = {
        zh: ref.zh,
        sk: ref.display?.sk ?? d.k.sk,
        bija: ref.display?.bija ?? d.k.bija,
      };
      loc = `金剛界 · ${ref.assembly.zh}（${FORM_ZH[ref.assembly.form]}）`;
    } else {
      const eff = effLambda(ref);
      const side = ref.hasT && ref.hasK ? (eff < 0.5 ? 't' : 'k') : (ref.hasT ? 't' : 'k');
      aspect = side === 't' ? d.t : d.k;
      const parts = [];
      if (ref.hasT) parts.push(`胎藏 · ${courtByKey[d.t.court].zh}`);
      if (ref.hasK) parts.push(`金剛界 · 成身會${CIRCLE_ZH[d.k.circle] ?? ''}`);
      loc = parts.join('　／　');
      if (ref.hasT && ref.hasK && d.t.zh !== d.k.zh) {
        loc += `\n兩部同體：${d.t.zh} 即 ${d.k.zh}`;
      }
    }
    ui.showInfo({
      bija: siddham(aspect.bija) || aspect.bija, bijaRoman: aspect.bija,
      name: aspect.zh, sk: aspect.sk,
      family: FAMILY_ZH[d.family], familyColor: color,
      loc, desc: d.desc, mantra: d.mantra,
    });
  }

  // ── 主迴圈 ──
  function effLambda(node) {
    return smoothstep(node.delay, node.delay + 0.82, state.lambda);
  }

  const clock = new THREE.Clock();
  let elapsed = 0;

  function frame() {
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    elapsed += dt;

    stepTweens(dt);
    state.lambda = damp(state.lambda, state.lambdaTarget, 4.2, dt);
    ui.setRealm(state.lambda);
    trav.update(dt);

    const l = state.lambda;
    const stand = state.stand;
    const echoFade = smoothstep(0.55, 1, l);
    const taizoFade = 1 - smoothstep(0, 0.5, l);
    const kongoFade = smoothstep(0.5, 1, l);

    // 真身
    for (const n of nodes) {
      const eff = effLambda(n);
      n.group.position.set(
        n.posT.x + (n.posK.x - n.posT.x) * eff,
        0.6,
        n.posT.z + (n.posK.z - n.posT.z) * eff,
      );
      const opBase = n.hasT && n.hasK ? 1 : (n.hasT ? 1 - eff : eff);
      let mul = 1;
      if (state.focusRing != null) mul = n.ringT === state.focusRing ? 1 : 0.2;
      else if (state.focusKey) mul = state.focusKey === 'jojin' ? 1 : 0.22;
      n.mul = damp(n.mul, mul, 6, dt);
      n.hover = damp(n.hover, hovered === n ? 1 : 0, 10, dt);
      n.mesh.material.opacity = opBase * n.mul;
      if (n.hasT && n.hasK && n.texT !== n.texK) {
        const want = eff < 0.5 ? n.texT : n.texK;
        if (n.mesh.material.map !== want) n.mesh.material.map = want;
      }
      // 不二之際，兩部同體之錨點微明而脹——結構於中途可見
      const advaya = n.hasT && n.hasK ? Math.max(0, 1 - Math.abs(l - 0.5) * 2.6) : 0;
      const size = (n.sizeT + (n.sizeK - n.sizeT) * eff) * (0.55 + 0.45 * opBase) *
        (1 + 0.13 * n.hover + 0.3 * advaya);
      n.mesh.scale.setScalar(size);
      poseDisc(n, size, stand);
    }

    // 回響
    for (const e of echoes) {
      let mul = 1;
      if (state.focusKey) mul = e.assembly.key === state.focusKey ? 1 : 0.16;
      e.groupMul.v = damp(e.groupMul.v, mul, 6, dt);
      e.hover = damp(e.hover, hovered === e ? 1 : 0, 10, dt);
      e.mesh.material.opacity = echoFade * e.groupMul.v;
      const size = e.size * (1 + 0.13 * e.hover);
      e.mesh.scale.setScalar(size);
      poseDisc(e, size, stand);
    }

    // 莊嚴
    for (const m of taizoDecor.mats) m.m.opacity = m.base * taizoFade;
    for (const m of kongoDecor.mats) m.m.opacity = m.base * kongoFade;
    edgesT.update(nodeById);
    edgesT.lines.material.opacity = 0.15 * taizoFade;
    edgesK.update(nodeById);
    edgesK.lines.material.opacity = 0.15 * kongoFade *
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
