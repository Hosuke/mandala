export const 節之 = (x, z, d = 0) => ({ x, z, d });
// 沿肢取樣：t∈[0,1] 得軸上點（二次曲軸）、該處半徑（含肌腹）、軸向單位向量
export function 沿(l, t) {
    const dx = l.b.x - l.a.x, dz = l.b.z - l.a.z;
    const n0 = Math.hypot(dx, dz) || 1;
    const 弓 = l.弓 ?? 0;
    // 控點：中點沿左法向（-dz,dx）偏弓矢
    const cx = (l.a.x + l.b.x) / 2 + (-dz / n0) * 弓;
    const cz = (l.a.z + l.b.z) / 2 + (dx / n0) * 弓;
    const s = 1 - t;
    const x = s * s * l.a.x + 2 * s * t * cx + t * t * l.b.x;
    const z = s * s * l.a.z + 2 * s * t * cz + t * t * l.b.z;
    const r = l.ra + (l.rb - l.ra) * t + (l.肉 ?? 0) * Math.sin(Math.PI * t);
    const tx = 2 * s * (cx - l.a.x) + 2 * t * (l.b.x - cx);
    const tz = 2 * s * (cz - l.a.z) + 2 * t * (l.b.z - cz);
    const n = Math.hypot(tx, tz) || 1;
    return { x, z, r, ux: tx / n, uz: tz / n };
}
// 肢面點：t 沿軸、s∈[-1,1] 橫越（-1 左緣 +1 右緣，垂軸方向）——衣紋錨點之源
export function 肢面(l, t, s) {
    const p = 沿(l, t);
    return [p.x + -p.uz * p.r * s, p.z + p.ux * p.r * s];
}
// 輪廓：膠囊之兩緣線（限t0..t1段）——肢體外形自體積出（曲軸＋肌腹），
// 逐段折線密取樣，一筆一緣
export function 輪廓(bi, 筆, l, t0 = 0, t1 = 1, 側 = 0) {
    const { M, L, S } = 筆;
    const 畫緣 = (s) => {
        const N = 14;
        const p0 = 肢面(l, t0, s);
        M(p0[0], p0[1]);
        for (let i = 1; i <= N; i++) {
            const p = 肢面(l, t0 + ((t1 - t0) * i) / N, s);
            L(p[0], p[1]);
        }
        S();
    };
    if (側 === 0 || 側 === -1)
        畫緣(-1);
    if (側 === 0 || 側 === 1)
        畫緣(1);
}
// 環褶：繞肢之褶（褶隨體轉）——弧之鼓向由肢之淺深梯度定：
// 近觀者之端，褶弧向遠端鼓（衣紋包裹圓柱之視覺律）。幅=橫越比例（0..1），
// 垂=弧矢高（指），正值向 b 端鼓、負值向 a 端鼓；不給則自淺深推。
export function 環褶(bi, 筆, l, t, 幅 = 0.92, 垂) {
    const { M, Qk, S } = 筆;
    const p = 沿(l, t);
    const e0 = 肢面(l, t, -幅), e1 = 肢面(l, t, 幅);
    const 矢 = 垂 !== undefined ? 垂 : (l.b.d - l.a.d) * 0.35 + p.r * 0.42;
    const cx = p.x + p.ux * 矢, cz = p.z + p.uz * 矢;
    M(e0[0], e0[1]);
    Qk(cx, cz, e1[0], e1[1]);
    S();
}
// 遮擋序：以節深比先後（深小者先畫＝在後，深大者後畫＝在前）
export function 序(...諸) {
    諸.slice().sort((a, b) => a.d - b.d).forEach(x => x.畫());
}
