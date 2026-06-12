// ─────────────────────────────────────────────────────────────────────────────
// 磬之層：一切音聲程序所現——颂鉢之非諧泛音列、微差拍之搖曳、持誦之底鳴。
// 不取一段採樣；如尊形之於 canvas，音由法生。
// 首次手勢方啟（autoplay 之禮：一觸即鳴）。
// ─────────────────────────────────────────────────────────────────────────────

let actx = null;
let master = null;
let droneGain = null;
let muted = true; // 默為初相，一按即鳴（敬不速之客之耳）

export function initAudio() {
  if (actx) { actx.resume?.(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  actx = new AC();
  master = actx.createGain();
  master.gain.value = muted ? 0 : 0.6;
  master.connect(actx.destination);
  actx.resume?.();
}

export function ready() { return !!actx; }

let suspendTimer = null;
export function setMuted(m) {
  muted = m;
  if (!actx) return;
  clearTimeout(suspendTimer);
  if (!m) actx.resume?.();
  const t = actx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.linearRampToValueAtTime(m ? 0 : 0.6, t + 0.6);
  if (m) {
    // 默後掛起全圖，免空轉耗電；再鳴時復起
    suspendTimer = setTimeout(() => actx?.suspend?.(), 800);
  }
}
export function isMuted() { return muted; }

// 磬一擊：鉢之泛音比約 [1, 2.72, 5.18, 8.05]，基音加微差拍以搖曳
export function strike(baseFreq = 196, { gain = 0.22, dur = 7 } = {}) {
  if (!actx) return;
  const t0 = actx.currentTime;
  const partials = [
    [1.0, 1.0, 1.0],
    [1.0034, 0.6, 1.0],   // 差拍之伴
    [2.72, 0.42, 0.55],
    [5.18, 0.2, 0.38],
    [8.05, 0.08, 0.25],
  ];
  for (const [ratio, amp, durMul] of partials) {
    const o = actx.createOscillator();
    o.type = 'sine';
    o.frequency.value = baseFreq * ratio;
    const g = actx.createGain();
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(gain * amp, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(1e-4, t0 + Math.max(0.5, dur * durMul));
    o.connect(g).connect(master);
    o.start(t0);
    o.stop(t0 + dur + 0.2);
  }
}

// 持誦底鳴：低八度雙音微差，息息相續
export function startDrone() {
  if (!actx || droneGain) return;
  droneGain = actx.createGain();
  droneGain.gain.value = 0;
  droneGain.gain.linearRampToValueAtTime(0.034, actx.currentTime + 6);
  droneGain.connect(master);
  for (const [f, a] of [[98, 1], [98.5, 0.7], [147.2, 0.18]]) {
    const o = actx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    const g = actx.createGain();
    g.gain.value = a;
    o.connect(g).connect(droneGain);
    o.start();
  }
  // 息之起伏
  const lfo = actx.createOscillator();
  lfo.frequency.value = 0.06;
  const lfoGain = actx.createGain();
  lfoGain.gain.value = 0.012;
  lfo.connect(lfoGain).connect(droneGain.gain);
  lfo.start();
}

// 五部之音（宮商角徵羽之意，非嚴格律）
export const FAMILY_FREQ = {
  butsu: 130.8,   // C3
  kongo: 146.8,   // D3
  ho: 164.8,      // E3
  renge: 196.0,   // G3
  katsuma: 220.0, // A3
  ten: 110.0,     // A2
};
