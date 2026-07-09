import { 運筆 } from '../bi.js';
// 指鏈：根 (x,z) 起向 θ0（0＝向右，π/2＝向下），節長逐節前行，節角[i] 於第 i 節前累加
export function 指鏈(x0, z0, θ0, 節長, 節角 = []) {
    const 列 = [[x0, z0]];
    let x = x0, z = z0, θ = θ0;
    for (let i = 0; i < 節長.length; i++) {
        θ += 節角[i] ?? 0;
        x += Math.cos(θ) * 節長[i];
        z += Math.sin(θ) * 節長[i];
        列.push([x, z]);
    }
    return 列;
}
// 佈：局部點列 → 格網（心 (x,z)、比、鏡＝-1 則左右翻轉，手性隨翻）
export function 佈(列, x, z, 比, 鏡 = 1) {
    return 列.map(([a, b]) => [x + a * 比 * 鏡, z + b * 比]);
}
// 畫指：鏈上雙緣立形。w根/w梢＝全寬（格網單位，呼者自乘比）。
// 主契約：契約線起於根之兩緣（開口，沒入掌郭——端必有著是呼者之責）。
// bi 予之則行蔽法（destination-out 鑿身而後勒線）；畫序須後手先落、前手後落。
export function 畫指(運, 鏈, w根, w梢, 相 = {}, bi) {
    const n = 鏈.length - 1;
    if (n < 1)
        return;
    const { M, Qk, C, S, 細 } = 運;
    // 各段行向
    const dir = [];
    for (let i = 0; i < n; i++)
        dir.push(Math.atan2(鏈[i + 1][1] - 鏈[i][1], 鏈[i + 1][0] - 鏈[i][0]));
    // 各點切向（鄰段角均，繞角安全）與半寬
    const φ = [];
    for (let i = 0; i <= n; i++) {
        const a = dir[Math.max(0, i - 1)], b = dir[Math.min(n - 1, i)];
        φ.push(a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) / 2);
    }
    const 梢w = 相.斂 ? w梢 * 0.82 : w梢;
    const hw = (i) => (w根 + (梢w - w根) * (i / n)) / 2;
    const 左 = [], 右 = [];
    for (let i = 0; i <= n; i++) {
        const nx = Math.cos(φ[i] + Math.PI / 2), nz = Math.sin(φ[i] + Math.PI / 2);
        左.push([鏈[i][0] + nx * hw(i), 鏈[i][1] + nz * hw(i)]);
        右.push([鏈[i][0] - nx * hw(i), 鏈[i][1] - nz * hw(i)]);
    }
    const 腹 = 相.腹 ?? 0.11;
    // 蔽法：先鑿指身，使先落之線於此身中斷——鑿面與勒線同軌（腹凸與梢帽同一幾何）
    if (bi && 相.蔽 !== false) {
        const { ctx, u, Y } = bi;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.moveTo(左[0][0] * u, Y(左[0][1]));
        for (let i = 0; i < n; i++) {
            const nx = Math.cos(dir[i] + Math.PI / 2), nz = Math.sin(dir[i] + Math.PI / 2);
            const 凸 = 腹 * (hw(i) + hw(i + 1));
            ctx.quadraticCurveTo(((左[i][0] + 左[i + 1][0]) / 2 + nx * 凸) * u, Y((左[i][1] + 左[i + 1][1]) / 2 + nz * 凸), 左[i + 1][0] * u, Y(左[i + 1][1]));
        }
        {
            const tx = Math.cos(dir[n - 1]), tz = Math.sin(dir[n - 1]), r = hw(n) * 1.25;
            ctx.bezierCurveTo((左[n][0] + tx * r) * u, Y(左[n][1] + tz * r), (右[n][0] + tx * r) * u, Y(右[n][1] + tz * r), 右[n][0] * u, Y(右[n][1]));
        }
        for (let i = n; i > 0; i--) {
            const nx = Math.cos(dir[i - 1] + Math.PI / 2), nz = Math.sin(dir[i - 1] + Math.PI / 2);
            const 凸 = 腹 * 0.55 * (hw(i) + hw(i - 1));
            ctx.quadraticCurveTo(((右[i][0] + 右[i - 1][0]) / 2 - nx * 凸) * u, Y((右[i][1] + 右[i - 1][1]) / 2 - nz * 凸), 右[i - 1][0] * u, Y(右[i - 1][1]));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
    // 一筆貫氣：左緣（腹凸向外）→ 梢帽（圓收）→ 右緣歸根
    M(左[0][0], 左[0][1]);
    for (let i = 0; i < n; i++) {
        const nx = Math.cos(dir[i] + Math.PI / 2), nz = Math.sin(dir[i] + Math.PI / 2);
        const 凸 = 腹 * (hw(i) + hw(i + 1));
        Qk((左[i][0] + 左[i + 1][0]) / 2 + nx * 凸, (左[i][1] + 左[i + 1][1]) / 2 + nz * 凸, 左[i + 1][0], 左[i + 1][1]);
    }
    {
        const tx = Math.cos(dir[n - 1]), tz = Math.sin(dir[n - 1]), r = hw(n) * 1.25;
        C(左[n][0] + tx * r, 左[n][1] + tz * r, 右[n][0] + tx * r, 右[n][1] + tz * r, 右[n][0], 右[n][1]);
    }
    for (let i = n; i > 0; i--) {
        const nx = Math.cos(dir[i - 1] + Math.PI / 2), nz = Math.sin(dir[i - 1] + Math.PI / 2);
        const 凸 = 腹 * 0.55 * (hw(i) + hw(i - 1));
        Qk((右[i][0] + 右[i - 1][0]) / 2 - nx * 凸, (右[i][1] + 右[i - 1][1]) / 2 - nz * 凸, 右[i - 1][0], 右[i - 1][1]);
    }
    S();
    // 節紋與甲：細筆
    if (相.紋 !== false || 相.甲)
        細(() => {
            if (相.紋 !== false)
                for (let i = 1; i < n; i++) {
                    const tx = Math.cos(φ[i]), tz = Math.sin(φ[i]);
                    const nx = Math.cos(φ[i] + Math.PI / 2), nz = Math.sin(φ[i] + Math.PI / 2);
                    const r = hw(i) * 0.66, 弓 = hw(i) * 0.5;
                    M(鏈[i][0] + nx * r, 鏈[i][1] + nz * r);
                    Qk(鏈[i][0] + tx * 弓, 鏈[i][1] + tz * 弓, 鏈[i][0] - nx * r, 鏈[i][1] - nz * r);
                    S();
                }
            if (相.甲) {
                const tx = Math.cos(dir[n - 1]), tz = Math.sin(dir[n - 1]);
                const nx = Math.cos(dir[n - 1] + Math.PI / 2), nz = Math.sin(dir[n - 1] + Math.PI / 2);
                const bx = 鏈[n][0] - tx * hw(n) * 1.05, bz = 鏈[n][1] - tz * hw(n) * 1.05, r = hw(n) * 0.58;
                M(bx + nx * r, bz + nz * r);
                Qk(bx - tx * hw(n) * 0.42, bz - tz * hw(n) * 0.42, bx - nx * r, bz - nz * r);
                S();
            }
        });
}
// 指寬之度（格網單位，未乘比）：掌廣五指析四指得指身之寬，拇指稍豐
export const 指寬 = { 根: 0.95, 梢: 0.72, 拇根: 1.18, 拇梢: 0.92, 小根: 0.8, 小梢: 0.6 };
// 比可為負：負比＝點旋半周（上式倒為下式之用），弧角隨旋、寬取其絕
export function 手勢(bi, x, z, 比, 鏡 = 1) {
    const 運 = 運筆(bi);
    const 絕 = Math.abs(比);
    const tx = (a) => x + a * 比 * 鏡;
    const tz = (b) => z + b * 比;
    return {
        運,
        w: v => v * 絕,
        M: (a, b) => 運.M(tx(a), tz(b)),
        L: (a, b) => 運.L(tx(a), tz(b)),
        Qk: (ca, cb, a, b) => 運.Qk(tx(ca), tz(cb), tx(a), tz(b)),
        C: (c1a, c1b, c2a, c2b, a, b) => 運.C(tx(c1a), tz(c1b), tx(c2a), tz(c2b), tx(a), tz(b)),
        S: () => 運.S(),
        骨: 運.骨, 衣: 運.衣, 細: 運.細, 逸: 運.逸,
        弧: (a, b, r, a0 = 0, a1 = 7) => {
            const 旋 = 比 < 0 ? Math.PI : 0; // 負比＝半周之旋
            if (鏡 === 1)
                bi.A(tx(a), tz(b), r * 絕, a0 + 旋, a1 + 旋);
            else
                bi.A(tx(a), tz(b), r * 絕, Math.PI - a1 + 旋, Math.PI - a0 + 旋);
        },
        指: (x0, z0, θ0, 節長, 節角) => 佈(指鏈(x0, z0, θ0, 節長, 節角), x, z, 比, 鏡),
        畫: (鏈點, w根, w梢, 相) => 畫指(運, 鏈點, w根 * 絕, w梢 * 絕, 相, bi),
        蔽: 郭 => {
            const { ctx, u, Y } = bi;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            郭.forEach(([a, b], i) => {
                const px = tx(a) * u, py = Y(tz(b));
                if (i)
                    ctx.lineTo(px, py);
                else
                    ctx.moveTo(px, py);
            });
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
    };
}
