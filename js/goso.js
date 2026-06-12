// ─────────────────────────────────────────────────────────────────────────────
// 觀法之層：五相成身觀（金剛頂經）。
// 行者坐於成身會壇心，於自心前觀心月輪——
//   通達菩提心（霧中之月）→ 修菩提心（月輪澄明）→ 成金剛心（月中現杵）
//   → 證金剛身（杵廣大遍滿，貫行者而過）→ 佛身圓滿（月輪含攝法界，入我我入）。
// 引擎至此非「可走之結構」，而為「可修之法器」。輕觸以進，不限其久——觀無促令。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';
import { moonTexture, kanVajraTexture } from './textures.js';
import { damp } from './anim.js';

const NUM = ['一', '二', '三', '四', '五'];

export const STAGES = [
  {
    title: '通達菩提心',
    text: '諦觀自心，如霧中之月。月在霧後，光未嘗滅。',
    mantra: 'oṃ citta-prativedhaṃ karomi',
    freq: 130.8,
  },
  {
    title: '修菩提心',
    text: '霧散月明，圓滿皎潔。此心本來清淨，不假外求。',
    mantra: 'oṃ bodhicittam utpādayāmi',
    freq: 146.8,
  },
  {
    title: '成金剛心',
    text: '月中現五鈷金剛，堅固不壞。悲智於此凝為一杵。',
    mantra: 'oṃ tiṣṭha vajra',
    freq: 164.8,
  },
  {
    title: '證金剛身',
    text: '杵漸廣大，遍滿法界。身即金剛，金剛即身。',
    mantra: "oṃ vajrātmako 'haṃ",
    freq: 196.0,
  },
  {
    title: '佛身圓滿',
    text: '諸佛如是，我亦如是。入我我入，即身成佛。',
    mantra: "oṃ yathā sarva-tathāgatas tathā 'haṃ",
    freq: 261.6,
  },
];

export class Goso {
  // hooks: { stage(idx, s), flash(), worldPulse(), closed() }
  constructor(scene, camera, hooks) {
    this.camera = camera;
    this.hooks = hooks;
    this.active = false;
    this.stage = -1;
    this.t = 0;
    this.flashed = false;

    this.group = new THREE.Group();
    this.group.visible = false;
    scene.add(this.group);

    const plane = (tex, size) => new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({
        map: tex, transparent: true, opacity: 0,
        depthWrite: false, depthTest: false, side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      }),
    );
    this.hazy = plane(moonTexture(false), 2.4);
    this.clear = plane(moonTexture(true), 1.8);
    this.group.add(this.hazy, this.clear);

    // 五鈷：兩面交叉，旋之似有體
    this.vajraGroup = new THREE.Group();
    this.vajraA = plane(kanVajraTexture(), 1.05);
    this.vajraB = plane(kanVajraTexture(), 1.05);
    this.vajraB.rotation.y = Math.PI / 2;
    this.vajraGroup.add(this.vajraA, this.vajraB);
    this.group.add(this.vajraGroup);

    for (const m of [this.hazy, this.clear, this.vajraA, this.vajraB]) m.renderOrder = 8;
  }

  start() {
    this.active = true;
    this.stage = 0;
    this.t = 0;
    this.flashed = false;
    this.group.visible = true;
    // 滌前觀之殘相
    for (const m of [this.hazy, this.clear, this.vajraA, this.vajraB]) m.material.opacity = 0;
    this.vajraGroup.scale.setScalar(1);
    this.vajraGroup.rotation.y = 0;
    this.hazy.scale.setScalar(2.4);
    this.clear.scale.setScalar(1.8);
    this.group.scale.setScalar(1);
    this.hooks.stage(0, STAGES[0]);
  }

  advance() {
    if (!this.active) return;
    if (this.stage >= STAGES.length - 1) { this.end(); return; }
    this.stage += 1;
    this.t = 0;
    this.hooks.stage(this.stage, STAGES[this.stage]);
  }

  end() {
    if (!this.active) return;
    this.active = false;
    this.stage = -1;
    this.group.visible = false;
    this.hooks.closed();
  }

  update(dt) {
    if (!this.active) return;
    this.t += dt;
    const s = this.stage, t = this.t;

    // 心月隨行者之視，懸於胸前
    const fwd = new THREE.Vector3();
    this.camera.getWorldDirection(fwd);
    const target = this.camera.position.clone().addScaledVector(fwd, 2.7);
    target.y -= 0.25;
    this.group.position.x = damp(this.group.position.x, target.x, 5, dt);
    this.group.position.y = damp(this.group.position.y, target.y, 5, dt);
    this.group.position.z = damp(this.group.position.z, target.z, 5, dt);
    this.group.quaternion.copy(this.camera.quaternion);

    const breathe = 1 + Math.sin(t * 0.9) * 0.012; // 息

    // 霧月：唯第一相
    this.hazy.material.opacity = damp(
      this.hazy.material.opacity, s === 0 ? 0.5 : 0, s === 0 ? 1.2 : 2.4, dt,
    );
    this.hazy.scale.setScalar(2.4 * breathe);
    this.hazy.rotation.z += dt * 0.02;

    // 澄月：第二相起；第五相廣含法界而隱
    let clearOp = s >= 1 ? 0.95 : 0;
    let clearScale = (s >= 1 ? 1.12 : 1) * breathe;
    if (s === 4) {
      const k = Math.min(1, t / 7);
      const ease = k * k * (3 - 2 * k);
      clearScale = (1.12 + ease * 24) * breathe;
      clearOp = 0.95 * Math.max(0, 1 - k * 1.55); // 化光宜速，出定見世界
    }
    this.clear.material.opacity = damp(this.clear.material.opacity, clearOp, 1.4, dt);
    this.clear.scale.setScalar(clearScale);

    // 金剛：第三相現，第四相廣大貫身而過
    let vajraOp = s === 2 ? 0.95 : 0;
    if (s === 3) {
      const k = Math.min(1, t / 5.5);
      const ease = k * k * (3 - 2 * k);
      this.vajraGroup.scale.setScalar(1 + ease * 9);
      vajraOp = 0.95 * (1 - Math.max(0, (k - 0.72) / 0.28));
      if (!this.flashed && k > 0.78) {
        this.flashed = true;
        this.hooks.flash();
        this.hooks.worldPulse();
      }
    } else if (s !== 2) {
      this.vajraGroup.scale.setScalar(1);
    }
    this.vajraA.material.opacity = this.vajraB.material.opacity =
      damp(this.vajraA.material.opacity, vajraOp, 1.6, dt);
    this.vajraGroup.rotation.y += dt * 0.45;
  }
}

export function stageHead(idx) {
  return `五相成身觀 · 第${NUM[idx]}相`;
}
