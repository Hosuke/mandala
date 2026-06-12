// 微補間：無依賴之 tween 與緩動
export const tweens = new Set();

export function tween({ dur = 1, ease = easeInOut, update, done }) {
  const tw = { t: 0, dur, ease, update, done };
  tweens.add(tw);
  return tw;
}

export function killTween(tw) { tweens.delete(tw); }

export function stepTweens(dt) {
  for (const tw of [...tweens]) {
    tw.t += dt;
    const k = Math.min(1, tw.t / tw.dur);
    tw.update(tw.ease(k));
    if (k >= 1) {
      tweens.delete(tw);
      tw.done && tw.done();
    }
  }
}

export const easeInOut = t => t * t * (3 - 2 * t);
export const easeOut = t => 1 - (1 - t) ** 3;
export const smoothstep = (a, b, t) => {
  const k = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return k * k * (3 - 2 * k);
};
export const damp = (cur, target, speed, dt) =>
  cur + (target - cur) * (1 - Math.exp(-speed * dt));
