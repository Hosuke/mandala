// ─────────────────────────────────────────────────────────────────────────────
// 行者之眼：俯瞰（觀畫）與入壇（在場）兩種模式，以阻尼滑行相接。
// 俯瞰即見法曼荼羅；入壇，諸尊立起，法轉為羯磨——畫成為空間。
// ─────────────────────────────────────────────────────────────────────────────
import * as THREE from '../vendor/three.module.js';
import { damp } from './anim.js';

const UP = new THREE.Vector3(0, 1, 0);

export class Rig {
  constructor(camera, dom) {
    this.camera = camera;
    this.dom = dom;
    this.mode = 'aerial'; // aerial | fp

    // 俯瞰球座標
    this.theta = Math.PI * 1.5; // 自南方望北
    this.phi = 0.62;            // 自天頂之傾角
    this.radius = 86;
    this.target = new THREE.Vector3(0, 0, 0);

    // 遍歷時的聚焦覆寫
    this.focusOverride = null; // { target, radius, phi }

    // 入壇
    this.fpPos = new THREE.Vector3(0, 2.4, 6.5);
    this.yaw = Math.PI;  // 面北望大日
    this.pitch = -0.06;
    this.keys = new Set();

    // 平滑現值
    this.eye = new THREE.Vector3(0, 90, 60);
    this.look = new THREE.Vector3(0, 0, 0);

    this.idleTime = 0;
    this.glideSpeed = 2.4;

    this._bind();
  }

  _bind() {
    const el = this.dom;
    let dragging = false, px = 0, py = 0;
    el.addEventListener('pointerdown', e => {
      dragging = true; px = e.clientX; py = e.clientY;
      el.setPointerCapture(e.pointerId);
      this.idleTime = 0;
    });
    el.addEventListener('pointermove', e => {
      if (!dragging) return;
      const dx = (e.clientX - px) / el.clientWidth;
      const dy = (e.clientY - py) / el.clientHeight;
      px = e.clientX; py = e.clientY;
      this.idleTime = 0;
      if (this.mode === 'aerial') {
        this.theta -= dx * 3.2;
        this.phi = THREE.MathUtils.clamp(this.phi - dy * 2.2, 0.12, 1.18);
      } else {
        this.yaw -= dx * 3.4;
        this.pitch = THREE.MathUtils.clamp(this.pitch - dy * 2.2, -1.2, 1.2);
      }
    });
    const release = () => { dragging = false; };
    el.addEventListener('pointerup', release);
    el.addEventListener('pointercancel', release);
    el.addEventListener('lostpointercapture', release);
    el.addEventListener('wheel', e => {
      e.preventDefault();
      this.idleTime = 0;
      if (this.mode === 'aerial') {
        this.radius = THREE.MathUtils.clamp(this.radius * (1 + e.deltaY * 0.0011), 26, 150);
      }
    }, { passive: false });
    window.addEventListener('keydown', e => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) this.keys.add(e.code);
    });
    window.addEventListener('keyup', e => this.keys.delete(e.code));
  }

  enter() {
    this.mode = 'fp';
    // 立於南與東南兩葉之間的空當，面向壇心
    const a = 292.5 * Math.PI / 180, r = 10.2;
    this.fpPos.set(Math.cos(a) * r, 2.5, -Math.sin(a) * r);
    this.yaw = Math.atan2(this.fpPos.z / r, -this.fpPos.x / r) - Math.PI / 2;
    this.pitch = 0.04;
  }

  exit() {
    this.mode = 'aerial';
    this.phi = 0.62;
    this.radius = 86;
    this.target.set(0, 0, 0);
  }

  resetView() {
    this.theta = Math.PI * 1.5;
    this.phi = 0.62;
    this.radius = 86;
    this.target.set(0, 0, 0);
  }

  update(dt) {
    let dEye, dLook;
    if (this.mode === 'aerial') {
      this.idleTime += dt;
      if (this.idleTime > 5 && !this.focusOverride) this.theta += dt * 0.018; // 靜時壇城微轉
      const f = this.focusOverride;
      const target = f ? f.target : this.target;
      const radius = f ? f.radius : this.radius;
      const phi = f ? (f.phi ?? this.phi) : this.phi;
      dEye = new THREE.Vector3(
        target.x + radius * Math.sin(phi) * Math.cos(this.theta),
        target.y + radius * Math.cos(phi),
        target.z - radius * Math.sin(phi) * Math.sin(this.theta),
      );
      dLook = target;
    } else {
      // 入壇行步
      const speed = 7.5;
      const fwd = new THREE.Vector3(Math.cos(this.yaw + Math.PI / 2), 0, -Math.sin(this.yaw + Math.PI / 2));
      const right = new THREE.Vector3(-fwd.z, 0, fwd.x);
      const v = new THREE.Vector3();
      if (this.keys.has('KeyW')) v.add(fwd);
      if (this.keys.has('KeyS')) v.sub(fwd);
      if (this.keys.has('KeyD')) v.add(right);
      if (this.keys.has('KeyA')) v.sub(right);
      if (v.lengthSq()) {
        v.normalize().multiplyScalar(speed * dt);
        this.fpPos.add(v);
        const r = Math.hypot(this.fpPos.x, this.fpPos.z);
        if (r > 40) { this.fpPos.x *= 40 / r; this.fpPos.z *= 40 / r; }
      }
      dEye = this.fpPos;
      const dir = new THREE.Vector3(
        Math.cos(this.pitch) * Math.cos(this.yaw + Math.PI / 2),
        Math.sin(this.pitch),
        -Math.cos(this.pitch) * Math.sin(this.yaw + Math.PI / 2),
      );
      dLook = dEye.clone().add(dir.multiplyScalar(10));
    }

    const s = this.glideSpeed;
    this.eye.x = damp(this.eye.x, dEye.x, s, dt);
    this.eye.y = damp(this.eye.y, dEye.y, s, dt);
    this.eye.z = damp(this.eye.z, dEye.z, s, dt);
    this.look.x = damp(this.look.x, dLook.x, s * 1.3, dt);
    this.look.y = damp(this.look.y, dLook.y, s * 1.3, dt);
    this.look.z = damp(this.look.z, dLook.z, s * 1.3, dt);

    this.camera.position.copy(this.eye);
    this.camera.up.copy(UP);
    this.camera.lookAt(this.look);
  }
}
