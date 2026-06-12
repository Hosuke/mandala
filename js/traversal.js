// ─────────────────────────────────────────────────────────────────────────────
// 遍歷之層：上轉門／下轉門。
// 同一結構，二向可行：下轉者，佛成為世界之路；上轉者，眾生成佛之路。
// 於金剛界行九會之螺旋；於胎藏行諸環之漲落。
// ─────────────────────────────────────────────────────────────────────────────
import { TAIZO_DESCENT, TAIZO_ASCENT, ASSEMBLIES, DESCENT_ORDER } from './data/courts.js';

const STEP_DUR = 4.2;
const assemblyByKey = Object.fromEntries(ASSEMBLIES.map(a => [a.key, a]));

export class Traversal {
  // hooks: { caption(head, title, text, idx, n), focusAssembly(key|null), focusRing(ring|null), done() }
  constructor(hooks) {
    this.hooks = hooks;
    this.active = false;
  }

  start(realm, dir) { // realm: 'taizo'|'kongo'  dir: 'descent'|'ascent'
    this.realm = realm;
    this.dir = dir;
    this.idx = -1;
    this.t = STEP_DUR; // 立即觸發第一步
    this.active = true;
    if (realm === 'kongo') {
      this.steps = (dir === 'descent' ? DESCENT_ORDER : [...DESCENT_ORDER].reverse())
        .map(key => {
          const a = assemblyByKey[key];
          return { key, title: a.zh, text: dir === 'descent' ? a.descent : a.ascent };
        });
    } else {
      this.steps = (dir === 'descent' ? TAIZO_DESCENT : TAIZO_ASCENT)
        .map(s => ({ ring: s.ring, title: s.title, text: s.text }));
    }
  }

  stop() {
    if (!this.active) return;
    this.active = false;
    this.hooks.focusAssembly(null);
    this.hooks.focusRing(null);
    this.hooks.done();
  }

  // 螺旋上彗星之參數位置 0..1（沿下轉方向之曲線）
  cometU() {
    if (!this.active || this.realm !== 'kongo' || this.idx < 0) return null;
    const n = this.steps.length;
    const frac = Math.min(1, this.t / (STEP_DUR * 0.6)); // 每步前段行進
    const at = this.idx + frac - 1;
    const u = Math.max(0, Math.min(1, (this.idx === 0 ? 0 : at) / (n - 1)));
    return this.dir === 'descent' ? u : 1 - u;
  }

  update(dt) {
    if (!this.active) return;
    this.t += dt;
    if (this.t >= STEP_DUR) {
      this.t = 0;
      this.idx += 1;
      if (this.idx >= this.steps.length) {
        // 行盡則住於終點片刻後復觀
        this.active = false;
        this.hooks.focusAssembly(null);
        this.hooks.focusRing(null);
        this.hooks.done();
        return;
      }
      const s = this.steps[this.idx];
      const head = this.dir === 'descent' ? '下轉門' : '上轉門';
      this.hooks.caption(head, s.title, s.text, this.idx, this.steps.length);
      if (this.realm === 'kongo') this.hooks.focusAssembly(s.key);
      else this.hooks.focusRing(s.ring);
    }
  }
}
