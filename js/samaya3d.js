// ─────────────────────────────────────────────────────────────────────────────
// 立體三昧耶形：法器之三維程序造形，於第一人稱中浮現掌前。
// 不取一面模型資源；如 textures.js 之線描，形由法生。
// 每器歸一於 1×1×1 之箱，+Y 為上，共用一 MeshMatcapMaterial。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';

const TAU = Math.PI * 2;

// ── 小工 ────────────────────────────────────────────────────────────────────
const v2 = pts => pts.map(p => new THREE.Vector2(p[0], p[1]));

function lathe(mat, pts, seg = 24) {
  return new THREE.Mesh(new THREE.LatheGeometry(v2(pts), seg), mat);
}

// 曲鈷・曲枝：CatmullRom 管
function tube(mat, pts, r = 0.022, seg = 16) {
  const curve = new THREE.CatmullRomCurve3(pts.map(p => new THREE.Vector3(p[0], p[1], p[2] || 0)));
  return new THREE.Mesh(new THREE.TubeGeometry(curve, seg, r, 6, false), mat);
}

function extrude(mat, shape, depth = 0.04) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: 10 });
  g.translate(0, 0, -depth / 2);
  return new THREE.Mesh(g, mat);
}

function cyl(mat, rTop, rBot, h, seg = 16) {
  return new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg), mat);
}

// 焰舌（如意寶・三角智火共用）
function flameShape(h = 0.3, w = 0.1) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(w, h * 0.4, 0.02, h);
  s.quadraticCurveTo(-w * 0.6, h * 0.42, 0, 0);
  return s;
}

// 蓮瓣（尖橢之片）
function petalShape(w = 0.16, h = 0.4) {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.quadraticCurveTo(w, h * 0.35, 0, h);
  s.quadraticCurveTo(-w, h * 0.35, 0, 0);
  return s;
}

// ── 金剛杵之部件 ────────────────────────────────────────────────────────────
// 中腰：蓮座夾寶珠
function vajraHub(mat, s = 1) {
  const h = lathe(mat, [
    [0, -0.17], [0.07, -0.13], [0.05, -0.07], [0.115, 0],
    [0.05, 0.07], [0.07, 0.13], [0, 0.17],
  ]);
  h.scale.setScalar(s);
  return h;
}

// 一端之鈷：中鈷直立收鋒，側鈷外張而内彎合於鋒前（合 2D 圖之意）
function vajraEnd(mat, side) {
  const g = new THREE.Group();
  g.add(lathe(mat, [[0.045, 0.1], [0.055, 0.22], [0.038, 0.36], [0, 0.5]], 12));
  for (let i = 0; i < side; i++) {
    const p = tube(mat, [
      [0.07, 0.08, 0], [0.16, 0.2, 0], [0.13, 0.36, 0], [0.015, 0.48, 0],
    ]);
    p.rotation.y = (i / side) * TAU + (side === 4 ? Math.PI / 4 : 0);
    g.add(p);
  }
  return g;
}

function vajra(mat, side) {
  const g = new THREE.Group();
  g.add(vajraHub(mat));
  const up = vajraEnd(mat, side);
  const dn = vajraEnd(mat, side);
  dn.rotation.z = Math.PI;
  g.add(up, dn);
  return g;
}

// ── 圖庫 ────────────────────────────────────────────────────────────────────
const BUILDERS = {
  vajra1: mat => vajra(mat, 0),
  vajra3: mat => vajra(mat, 2),
  vajra5: mat => vajra(mat, 4),

  karma(mat) { // 羯磨杵：十字交杵，四頭臥於水平
    const g = new THREE.Group();
    g.add(vajraHub(mat, 1.15));
    const dirs = [
      ['z', -Math.PI / 2], ['z', Math.PI / 2],
      ['x', Math.PI / 2], ['x', -Math.PI / 2],
    ];
    for (const [axis, a] of dirs) {
      const e = vajraEnd(mat, 2);
      e.scale.setScalar(0.85);
      e.rotation[axis] = a;
      g.add(e);
    }
    return g;
  },

  bell(mat) { // 金剛鈴：鈴身之上承杵柄
    const g = new THREE.Group();
    g.add(lathe(mat, [
      [0, -0.42], [0.33, -0.42], [0.35, -0.37], [0.29, -0.2],
      [0.23, -0.02], [0.15, 0.1], [0.12, 0.16], [0, 0.18],
    ]));
    g.add(lathe(mat, [[0.05, 0.16], [0.09, 0.21], [0.05, 0.26], [0.05, 0.3]], 16));
    const hub = vajraHub(mat, 0.55);
    hub.position.y = 0.38;
    const end = vajraEnd(mat, 2);
    end.scale.setScalar(0.55);
    end.position.y = 0.38;
    g.add(hub, end);
    // 鈴舌
    const tongue = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mat);
    tongue.position.y = -0.4;
    g.add(tongue);
    return g;
  },

  sword(mat) { // 利劍：鋒上，鍔・柄・首
    const g = new THREE.Group();
    const blade = new THREE.Shape();
    blade.moveTo(0, 0.55);
    blade.lineTo(0.06, 0.32);
    blade.lineTo(0.06, -0.25);
    blade.lineTo(-0.06, -0.25);
    blade.lineTo(-0.06, 0.32);
    blade.closePath();
    g.add(extrude(mat, blade, 0.03));
    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.045, 0.07), mat);
    guard.position.y = -0.27;
    const grip = cyl(mat, 0.035, 0.04, 0.22, 10);
    grip.position.y = -0.4;
    const pommel = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 8), mat);
    pommel.position.y = -0.53;
    g.add(guard, grip, pommel);
    return g;
  },

  jewel(mat) { // 如意寶珠：圓底收尖
    const g = new THREE.Group();
    g.add(lathe(mat, [
      [0, -0.42], [0.2, -0.38], [0.3, -0.16], [0.25, 0.08], [0.11, 0.32], [0, 0.45],
    ]));
    return g;
  },

  'jewel-flame'(mat) { // 焰光寶珠
    const g = new THREE.Group();
    const j = BUILDERS.jewel(mat);
    j.scale.setScalar(0.82);
    g.add(j);
    for (const a of [-0.85, 0, 0.85]) {
      const f = extrude(mat, flameShape(0.3, 0.1), 0.025);
      f.position.set(Math.sin(a) * 0.34, 0.22 + Math.cos(a) * 0.14, 0);
      f.rotation.z = -a;
      g.add(f);
    }
    return g;
  },

  lotus(mat) { // 開敷蓮華：八葉二重，中有蓮台
    const g = new THREE.Group();
    const pod = cyl(mat, 0.14, 0.1, 0.09, 16);
    g.add(pod);
    for (let ring = 0; ring < 2; ring++) {
      const n = 8, tilt = ring ? -0.6 : -1.05, sc = ring ? 0.78 : 1;
      for (let i = 0; i < n; i++) {
        const hold = new THREE.Group();
        hold.rotation.y = (i / n) * TAU + ring * (Math.PI / n);
        const p = extrude(mat, petalShape(0.15, 0.42), 0.02);
        p.position.set(0, -0.02, 0.1);
        p.rotation.x = tilt;
        p.scale.setScalar(sc);
        hold.add(p);
        g.add(hold);
      }
    }
    const stem = cyl(mat, 0.02, 0.025, 0.4, 8);
    stem.position.y = -0.24;
    g.add(stem);
    return g;
  },

  'lotus-bud'(mat) { // 未敷蓮華
    const g = new THREE.Group();
    g.add(lathe(mat, [
      [0, -0.08], [0.15, -0.02], [0.2, 0.14], [0.1, 0.32], [0, 0.42],
    ], 18));
    for (let i = 0; i < 4; i++) { // 萼
      const hold = new THREE.Group();
      hold.rotation.y = (i / 4) * TAU;
      const p = extrude(mat, petalShape(0.1, 0.3), 0.018);
      p.position.set(0, -0.06, 0.12);
      p.rotation.x = -0.35;
      hold.add(p);
      g.add(hold);
    }
    const stem = cyl(mat, 0.02, 0.026, 0.45, 8);
    stem.position.y = -0.3;
    g.add(stem);
    return g;
  },

  wheel(mat) { // 法輪：輪・轂・八輻，面向行者
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.035, 10, 36), mat));
    const hub = cyl(mat, 0.09, 0.09, 0.08, 16);
    hub.rotation.x = Math.PI / 2;
    g.add(hub);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU;
      const sp = cyl(mat, 0.018, 0.028, 0.36, 6);
      sp.position.set(Math.cos(a) * 0.24, Math.sin(a) * 0.24, 0);
      sp.rotation.z = a - Math.PI / 2;
      g.add(sp);
    }
    return g;
  },

  stupa(mat) { // 五輪塔：地方・水圓・火三角・風半月・空團形
    const g = new THREE.Group();
    const earth = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.26, 0.32), mat);
    earth.position.y = -0.36;
    const water = new THREE.Mesh(new THREE.SphereGeometry(0.16, 18, 14), mat);
    water.position.y = -0.07;
    const fire = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.2, 4), mat);
    fire.position.y = 0.17;
    fire.rotation.y = Math.PI / 4;
    const wind = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 8, 0, TAU, 0, Math.PI / 2), mat,
    );
    wind.position.y = 0.27;
    const sky = BUILDERS.jewel(mat);
    sky.scale.setScalar(0.32);
    sky.position.y = 0.47;
    g.add(earth, water, fire, wind, sky);
    return g;
  },

  banner(mat) { // 幢幡：竿頭出旗
    const g = new THREE.Group();
    const pole = cyl(mat, 0.016, 0.02, 1.0, 8);
    pole.position.x = -0.2;
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.04, 10, 8), mat);
    finial.position.set(-0.2, 0.52, 0);
    const flag = new THREE.Shape();
    flag.moveTo(0, 0.46);
    flag.lineTo(0.44, 0.36);
    flag.lineTo(0.36, 0.2);
    flag.lineTo(0, 0.1);
    flag.closePath();
    const f = extrude(mat, flag, 0.02);
    f.position.x = -0.2;
    g.add(pole, finial, f);
    return g;
  },

  hook(mat) { // 鉤：直柄上彎
    const g = new THREE.Group();
    const shaft = cyl(mat, 0.02, 0.024, 0.9, 8);
    shaft.position.y = 0;
    const arc = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.022, 6, 20, Math.PI * 1.4), mat);
    arc.position.set(0.14, 0.45, 0);
    arc.rotation.z = Math.PI;
    const tip = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 6), mat);
    const ta = Math.PI + Math.PI * 1.4;
    tip.position.set(0.14 + Math.cos(ta) * 0.14, 0.45 + Math.sin(ta) * 0.14, 0);
    g.add(shaft, arc, tip);
    return g;
  },

  vase(mat) { // 賢瓶：豐肩細頸，口上承珠
    const g = new THREE.Group();
    g.add(lathe(mat, [
      [0, -0.45], [0.19, -0.43], [0.29, -0.24], [0.27, -0.04],
      [0.16, 0.12], [0.1, 0.2], [0.14, 0.27], [0.14, 0.3], [0.06, 0.31],
    ]));
    const pearl = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), mat);
    pearl.position.y = 0.39;
    g.add(pearl);
    return g;
  },

  'flame-tri'(mat) { // 三角智火：三角壇形上出焰
    const g = new THREE.Group();
    const tri = new THREE.Shape();
    tri.moveTo(0, 0.4);
    tri.lineTo(0.42, -0.32);
    tri.lineTo(-0.42, -0.32);
    tri.closePath();
    g.add(extrude(mat, tri, 0.06));
    for (const a of [-0.5, 0, 0.5]) {
      const f = extrude(mat, flameShape(0.28, 0.09), 0.025);
      f.position.set(Math.sin(a) * 0.16, 0.36, 0);
      f.rotation.z = -a;
      g.add(f);
    }
    return g;
  },

  trident(mat) { // 三叉戟
    const g = new THREE.Group();
    const shaft = cyl(mat, 0.02, 0.026, 1.0, 8);
    shaft.position.y = -0.18;
    const bar = cyl(mat, 0.022, 0.022, 0.4, 8);
    bar.rotation.z = Math.PI / 2;
    bar.position.y = 0.32;
    const mid = lathe(mat, [[0.035, 0.32], [0.045, 0.5], [0, 0.78]], 10);
    g.add(shaft, bar, mid);
    for (const dir of [-1, 1]) {
      g.add(tube(mat, [
        [dir * 0.18, 0.32, 0], [dir * 0.26, 0.48, 0], [dir * 0.22, 0.64, 0], [dir * 0.18, 0.78, 0],
      ], 0.02));
    }
    return g;
  },

  staff(mat) { // 棒：長柄頂珠
    const g = new THREE.Group();
    const shaft = cyl(mat, 0.022, 0.028, 1.1, 10);
    shaft.position.y = -0.1;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.016, 6, 14), mat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.48;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 10), mat);
    head.position.y = 0.62;
    g.add(shaft, ring, head);
    return g;
  },

  sun(mat) { // 日輪：圓盤放光
    const g = new THREE.Group();
    const disc = cyl(mat, 0.4, 0.4, 0.05, 28);
    disc.rotation.x = Math.PI / 2;
    g.add(disc);
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * TAU;
      const ray = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.18, 6), mat);
      ray.position.set(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0);
      ray.rotation.z = a - Math.PI / 2;
      g.add(ray);
    }
    return g;
  },

  moon(mat) { // 月輪：仰月之鉤
    // 兩圓相交為弦月：外圓 r0.45，内圓 (0.18,0) r0.38
    const ix = 0.2514, iy = 0.373; // 交點
    const a1 = Math.atan2(iy, ix);
    const b1 = Math.atan2(iy, ix - 0.18);
    const s = new THREE.Shape();
    s.absarc(0, 0, 0.45, a1, TAU - a1, false);
    s.absarc(0.18, 0, 0.38, -b1, b1, true);
    const g = new THREE.Group();
    g.add(extrude(mat, s, 0.06));
    return g;
  },

  sutra(mat) { // 梵篋：經帙束帶
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.26, 0.42), mat));
    const band = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.3, 0.46), mat);
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 8), mat);
    knot.position.y = 0.18;
    g.add(band, knot);
    return g;
  },

  // ── 以下十二器依粉本 dist/型制.json 放樣（2026-07-09 型制十二條）──────────
  // 型制座標 z 向下正、徑＝全寬；此處 y=-z、r=徑/2，比例一依其層，歸一交 buildSamaya。

  smile(mat) { // 笑杵（k-sho）：二支三鈷杵平行橫疊，軸距3.5——非旋成體，勿旋
    const g = new THREE.Group();
    for (const dy of [1.6, -1.9]) {          // 軸心 z=∓1.6/+1.9（微不對稱依型制）
      const v = vajra(mat, 2);
      v.scale.setScalar(0.85);
      v.rotation.z = Math.PI / 2;
      v.position.y = dy === 1.6 ? 0.29 : -0.34;  // 以杵長6.1為1歸一之距
      g.add(v);
    }
    return g;
  },

  armor(mat) { // 甲冑（k-gou）：領口U・胸甲殼・腰收札紋・裾張中垂弧，薄殼
    const g = new THREE.Group();
    const s = new THREE.Shape();               // 半寬序列依型制層：2.3/2.7/2.3/1.9
    s.moveTo(-0.75, 2.35);                     // 領左
    s.quadraticCurveTo(0, 1.95, 0.75, 2.35);   // U形領
    s.lineTo(2.3, 2.15);                       // 肩線
    s.quadraticCurveTo(2.75, 1.6, 2.7, 0.9);   // 胸甲上段外張
    s.quadraticCurveTo(2.55, -0.4, 2.3, -1.3); // 腰收
    s.lineTo(1.9, -2.6);                       // 裾張內斂
    s.quadraticCurveTo(0, -3.05, -1.9, -2.6);  // 下緣中垂弧
    s.lineTo(-2.3, -1.3);
    s.quadraticCurveTo(-2.55, -0.4, -2.7, 0.9);
    s.quadraticCurveTo(-2.75, 1.6, -2.3, 2.15);
    s.closePath();
    g.add(extrude(mat, s, 0.32));
    for (const y of [0.9, -0.2, -1.3]) {       // 札三段之界
      const rib = new THREE.Mesh(new THREE.BoxGeometry(4.4 - Math.abs(y) * 0.5, 0.1, 0.4), mat);
      rib.position.set(0, y, 0);
      g.add(rib);
    }
    const mid = new THREE.Mesh(new THREE.BoxGeometry(0.1, 4.6, 0.38), mat); // 中線豎一道
    mid.position.y = -0.25;
    g.add(mid);
    return g;
  },

  garland(mat) { // 華鬘（g-man）：正圓環面＋綴珠十顆＋垂帶二條——勿借 wheel（輪有輻此無）
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.35, 12, 40), mat));
    for (let i = 0; i < 10; i++) {             // 珠鏈沿環交錯
      const a = (i / 10) * TAU;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), mat);
      bead.position.set(Math.cos(a) * 2.5, Math.sin(a) * 2.5, i % 2 ? 0.28 : -0.28);
      g.add(bead);
    }
    for (const d of [-1, 1]) {                 // 垂帶自環底左右各一，微S擺
      g.add(tube(mat, [
        [d * 0.55, -2.7, 0], [d * 0.8, -3.4, 0.1], [d * 0.5, -4.4, -0.06], [d * 0.75, -5.4, 0],
      ], 0.13, 12));
    }
    return g;
  },

  lute(mat) { // 箜篌（g-ka）：弓形豎箜篌——彎管響胴＋直棹＋弦五道，皆非旋成
    const g = new THREE.Group();
    g.add(tube(mat, [                          // 響胴：弧自(-2.6,2.6)經(-2.4,0.2)至(0.2,-2.6)（型制xz→xy翻）
      [-2.6, -2.6, 0], [-2.55, -1.2, 0], [-2.4, -0.2, 0], [-1.6, 1.5, 0], [0.2, 2.6, 0],
    ], 0.5, 24));
    const zhao = tube(mat, [[0.2, 2.6, 0], [2.8, 1.6, 0]], 0.15, 8);  // 棹：胴首直出
    g.add(zhao);
    for (let i = 0; i < 5; i++) {              // 弦五道：胴身與棹間平行斜張（弦數〔闕〕姑五）
      const t = i / 4;
      const a = [0.55 + t * 1.85, 2.32 - t * 0.72, 0];   // 沿棹
      const b = [-2.52 + t * 2.2, -1.0 - t * 1.35, 0];   // 沿胴下段
      g.add(tube(mat, [a, b], 0.035, 4));
    }
    return g;
  },

  incense(mat) { // 寶香爐（g-ko）：火舎形坐爐——鈕珠・穹蓋・爐腹・三足，全旋
    const g = new THREE.Group();
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.35, 12, 10), mat);
    knob.position.y = 1.85;
    g.add(knob);
    g.add(lathe(mat, [[1.9, 0.5], [1.5, 1.1], [0.45, 1.7]], 24));      // 穹蓋
    g.add(lathe(mat, [                                                  // 爐腹：口緣微斂碗
      [0, -1.85], [1.1, -1.7], [1.75, -1.1], [2.05, -0.2], [2.0, 0.2], [2.1, 0.3],
    ], 24));
    for (let i = 0; i < 3; i++) {                                       // 三足外張
      const a = (i / 3) * TAU + Math.PI / 6;
      const leg = cyl(mat, 0.11, 0.13, 1.05, 8);
      leg.position.set(Math.cos(a) * 1.4, -2.2, Math.sin(a) * 1.4);
      leg.rotation.z = Math.cos(a) * -0.18;
      leg.rotation.x = Math.sin(a) * 0.18;
      g.add(leg);
    }
    return g;
  },

  lamp(mat) { // 寶燈（g-to）：焰・盞・柱・座盤（扁鼓）
    const g = new THREE.Group();
    for (const a of [-0.7, 0, 0.7]) {          // 一莖三舌之焰（面片）
      const f = extrude(mat, flameShape(1.9, 0.6), 0.1);
      f.position.set(Math.sin(a) * 0.5, 0.55, 0);
      f.rotation.z = -a * 0.8;
      g.add(f);
    }
    g.add(lathe(mat, [[0.2, -0.95], [0.5, -0.5], [1.3, 0.28], [1.35, 0.4], [0, 0.35]], 20)); // 盞
    const pillar = cyl(mat, 0.2, 0.28, 1.15, 10);
    pillar.position.y = -1.52;
    g.add(pillar);
    g.add(lathe(mat, [[0, -2.75], [0.9, -2.62], [1.0, -2.37], [0.9, -2.12], [0, -2.0]], 20)); // 座盤扁鼓
    return g;
  },

  rope(mat) { // 羂索（s-saku）：橢環繩管＋交結＋垂端二（端珠）——引入之索
    const g = new THREE.Group();
    const pts = [];
    for (let i = 0; i <= 40; i++) {            // 橢環 2.7×2.4，心上移0.24
      const a = (i / 40) * TAU;
      pts.push([Math.cos(a) * 2.7, 0.24 + Math.sin(a) * 2.4, 0]);
    }
    g.add(tube(mat, pts, 0.175, 48));
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), mat); // 交結
    knot.position.y = -2.65;
    g.add(knot);
    for (const d of [-1, 1]) {                 // 垂端二，端珠 r0.22
      g.add(tube(mat, [[d * 0.12, -2.8, 0], [d * 0.38, -3.6, 0.05], [d * 0.3, -4.35, 0]], 0.14, 8));
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), mat);
      bead.position.set(d * 0.3, -4.4, 0);
      g.add(bead);
    }
    return g;
  },

  chain(mat) { // 金剛鎖（s-sa）：兩端豎三鈷、中鏈三環相扣——縛住之鎖（㋐式）
    const g = new THREE.Group();
    for (const [yc, flip] of [[3.05, 0], [-3.25, Math.PI]]) {
      const v = vajra(mat, 2);
      v.scale.setScalar(0.55 * 3.7);           // 比0.55（vajra 高1 → 3.7 局部單位）
      v.position.y = yc;
      v.rotation.z = flip;
      g.add(v);
    }
    [1.1, -0.1, -1.3].forEach((yc, i) => {     // 環各≈1.05×1.3 相扣，縱橫交替
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.1, 8, 18), mat);
      ring.scale.y = 1.24;
      ring.position.y = yc;
      ring.rotation.y = i % 2 ? Math.PI / 2 : 0;
      g.add(ring);
    });
    return g;
  },

  fang(mat) { // 二利牙（k-ge）：新月二牙鼓外鋒內顧・側半三鈷爪・橫獨鈷杵座
    const g = new THREE.Group();
    for (const d of [-1, 1]) {
      const ix = 0.34, iy = 1.62;              // 新月板：外弧r1.8內弧r1.55之交
      const a1 = Math.atan2(iy, ix);
      const b1 = Math.atan2(iy, ix - 0.5);
      const s = new THREE.Shape();
      s.absarc(0, 0, 1.8, a1, TAU - a1, false);
      s.absarc(0.5, 0, 1.55, -b1, b1, true);
      const m = extrude(mat, s, 0.15);
      m.position.set(d * 1.45, 0.1, 0);
      m.rotation.z = d > 0 ? Math.PI : 0;      // 弧鼓向外、鋒上微內顧
      m.rotation.z += d * -0.12;
      g.add(m);
      g.add(tube(mat, [                        // 側半三鈷爪
        [d * 2.75, -0.3, 0], [d * 3.4, 0.5, 0], [d * 3.1, 1.4, 0], [d * 2.8, 1.75, 0],
      ], 0.12, 10));
    }
    const base = vajra(mat, 0);                // 橫獨鈷杵座（軸心 z=+2.2）
    base.scale.setScalar(3.4);
    base.rotation.z = Math.PI / 2;
    base.position.y = -2.2;
    g.add(base);
    return g;
  },

  conch(mat) { // 塗香器（g-zu）：有蓋香盒——鈕・扁穹蓋・圓底盒身，全旋
    const g = new THREE.Group();
    const knob = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), mat);
    knob.position.y = 1.15;
    g.add(knob);
    g.add(lathe(mat, [[1.7, 0.1], [1.75, 0.15], [1.5, 0.55], [0.5, 1.0]], 22));  // 蓋（緣一線）
    g.add(lathe(mat, [                                                            // 盒身圓底收
      [0, -1.85], [0.9, -1.7], [1.5, -1.2], [1.72, -0.55], [1.7, -0.1],
    ], 22));
    return g;
  },

  flower(mat) { // 盛華器（g-ke）：淺盤盛滿花——「盛」字要緊非空盤
    const g = new THREE.Group();
    g.add(lathe(mat, [                          // 盤：口緣內一弧示唇
      [0, -1.95], [1.0, -1.9], [1.4, -1.6], [2.2, -0.9], [2.45, -0.42], [2.6, -0.3],
    ], 24));
    const foot = cyl(mat, 1.1, 1.15, 0.3, 16);  // 圈足
    foot.position.y = -2.1;
    g.add(foot);
    [[-1.3, 0.62], [0, 0.72], [1.3, 0.62]].forEach(([x, r]) => {  // 盛華三簇五瓣周張
      const head = new THREE.Mesh(new THREE.SphereGeometry(r * 0.62, 10, 8), mat);
      head.position.set(x, 0.55, 0);
      g.add(head);
      for (let i = 0; i < 5; i++) {
        const hold = new THREE.Group();
        hold.position.set(x, 0.55, 0);
        hold.rotation.y = (i / 5) * TAU;
        const p = extrude(mat, petalShape(r * 0.42, r * 1.05), 0.03);
        p.position.set(0, -r * 0.25, r * 0.42);
        p.rotation.x = -0.85;
        hold.add(p);
        g.add(hold);
      }
    });
    return g;
  },

  fist(mat) { // 金剛縛（k-ken）：手形雕塑非幾何體（型制注）——暫依其議獨鈷橫置，真手模候後
    const v = vajra(mat, 0);
    v.rotation.z = Math.PI / 2;
    const g = new THREE.Group();
    g.add(v);
    return g;
  },
};

// 餘鍵歸於近形之器（型制十二條已放樣為專形：smile/armor/garland/lute/
// incense/lamp/rope/chain/fang/conch/flower/fist 自此除名，2026-07-09）
const ALIAS = {
  'lotus-blue': 'lotus',
  'stupa-small': 'stupa',
  flame: 'flame-tri',
  arrow: 'sword',
  needle: 'sword',
  tongue: 'flame-tri',
  eye: 'sun',
  horse: 'trident',
};

export const SAMAYA3D_KEYS = Object.keys(BUILDERS);

// 立體三昧耶形：歸一於 1×1×1，置中原點，+Y 上。matcap 可缺（純色亦成相）。
export function buildSamaya(key, { matcap = null, color = 0xd8b36a } = {}) {
  const k = BUILDERS[key] ? key : (BUILDERS[ALIAS[key]] ? ALIAS[key] : 'vajra1');
  const mat = new THREE.MeshMatcapMaterial({ matcap, color });
  const raw = BUILDERS[k](mat);

  const box = new THREE.Box3().setFromObject(raw);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const s = 1 / Math.max(size.x, size.y, size.z, 1e-6);
  raw.scale.setScalar(s);
  raw.position.copy(center).multiplyScalar(-s);

  const group = new THREE.Group();
  group.add(raw);
  return group;
}
